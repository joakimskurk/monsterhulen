// Composed missions (docs/v2/workshops/2026-10-28_sammensatte_oppdrag.md).
// A composed mission is built from parts in content/themes.json. The theme depends only on the
// mission type and the code (seed) the DM sees, never on the generation attempt or run length,
// so the same code shows the same title on every device and in every retry.
import { makeRng } from './rng.mjs';

export const COMPOSED = { NY_FINN: 'FINN', NY_REDD: 'REDD', NY_SAMLE: 'SAMLE', NY_LEVER: 'LEVER', NY_KOM_UT: 'KOM_UT' };
export const isComposed = (missionId) => missionId in COMPOSED;

// All mission ids: composed ones first, then the fixed classics from missions.json.
export function missionIds(content) {
  return [...Object.keys(COMPOSED), ...content.missions.map((m) => m.id)];
}

// The code without the attempt suffix the generator adds ("17#3" -> "17").
export const baseSeed = (seed) => String(seed).split('#')[0];

export function resolveMission(content, missionId, seed) {
  if (isComposed(missionId)) return composeMission(content, missionId, baseSeed(seed));
  return content.missions.find((m) => m.id === missionId) || null;
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const fill = (template, values) => cap(template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? `{${k}}`));

// Weight ×3 for parts that belong to a zone on the route: a bone key in the catacombs.
function pickForRoute(rng, parts, route) {
  return rng.weighted(parts.map((p) => [p, (p.zones || []).some((z) => route.includes(z)) ? 3 : 1]));
}

export function composeMission(content, missionId, seed) {
  const type = COMPOSED[missionId];
  const t = content.themes;
  const rng = makeRng(`theme|${missionId}|${seed}`);
  const route = rng.pick(t.routes);
  const base = { id: missionId, type, composed: true, route };
  if (type === 'FINN') return composeFinn(rng, t.FINN, base, route);
  if (type === 'REDD') return composeRedd(rng, t, base);
  if (type === 'SAMLE') return composeSamle(rng, t.SAMLE, base);
  if (type === 'LEVER') return composeLever(rng, t.LEVER, base);
  return composeKomUt(rng, t.KOM_UT, base);
}

function composeFinn(rng, f, base, route) {
  const treasure = rng.pick(f.treasures);
  const lock = rng.pick(f.locks);
  const kind = rng.pick(lock.openers);
  const values = { treasure: treasure.def, Treasure: cap(treasure.def), lock: lock.def, prep: lock.prep };
  const where = `${cap(lock.prep)} ${lock.def} ligger ${treasure.about}.`;
  let opener, intro, themeOpener;
  // What the door or chest itself says, shown on its card. The mission intro may add where to look.
  let lockIntro;
  if (kind === 'KEY') {
    const key = pickForRoute(rng, f.keys, route);
    values.Key = cap(key.def);
    opener = { kind, item: cap(key.def), icon: key.icon, sign: `${cap(lock.def)} har et lite nøkkelhull. ${key.hole}` };
    intro = `${where} Et sted i hulen finnes ${key.def}.`;
    lockIntro = `${cap(lock.short)} er låst.`;
    themeOpener = `KEY:${key.id}`;
  } else if (kind === 'MAGIC') {
    const magic = pickForRoute(rng, f.magic, route);
    values.Magic = cap(magic.def);
    opener = { kind, item: cap(magic.def), icon: magic.icon, sign: `Midt på ${lock.def} er det en fordypning ${magic.shape}.` };
    lockIntro = `${cap(lock.short)} åpnes bare med ${magic.def}.`;
    intro = `${where} ${lockIntro}`;
    themeOpener = `MAGIC:${magic.id}`;
  } else if (kind === 'RHYME') {
    const rhyme = rng.pick(f.rhymes);
    opener = { kind, lines: rhyme.lines, door: lock.def };
    lockIntro = `${cap(lock.short)} åpnes bare for den som kan den gamle regla.`;
    intro = `${where} ${lockIntro}`;
    themeOpener = `RHYME:${rhyme.id}`;
  } else {
    opener = { kind, tag: lock.tag.tag, sign: lock.tag.sign };
    lockIntro = `${cap(lock.short)} ${lock.tag.intro}`;
    intro = `${where} ${lockIntro}`;
    themeOpener = `TAG:${lock.tag.tag}`;
  }
  return {
    ...base,
    name: fill(rng.pick(f.titles[kind]), values),
    intro,
    goal: { name: cap(treasure.def), icon: treasure.icon, lock: { name: cap(lock.def), icon: lock.icon, intro: lockIntro, inGoal: lock.prep === 'i', opener } },
    theme: { goal: treasure.id, opener: themeOpener },
  };
}

function composeRedd(rng, t, base) {
  const c = rng.pick(t.REDD.creatures);
  const problem = rng.pick(c.problems);
  const who = cap(c.def);
  return {
    ...base,
    name: `${who} ${problem.text}`,
    intro: `${who} ${problem.text}, er langt inne i hulen. Finn ${c.pron} og få ${c.pron} trygt hjem.`,
    // `free`: what gets it loose before it can be calmed (decision A9). Never the same tag as a calm tag.
    goal: { name: who, icon: c.icon, free: problem.free || null, calm: c.calm, calmSigns: Object.fromEntries(c.calm.map((tag) => [tag, t.calmSigns[tag].replace('{who}', who)])) },
    theme: { goal: c.id, opener: problem.text },
  };
}

function composeSamle(rng, s, base) {
  const d = rng.pick(s.devices);
  return {
    ...base,
    name: rng.pick(d.titles),
    intro: d.intro,
    // A missing part replaces one of the three sockets.
    goal: { name: cap(d.def), icon: d.icon, count: 3, pool: d.pool, socket: d.socket, part: d.part || null },
    theme: { goal: d.id, opener: d.id },
  };
}

function composeLever(rng, l, base) {
  const owner = rng.pick(l.owners);
  const thingId = rng.pick(owner.things);
  const thing = l.things.find((x) => x.id === thingId);
  const place = rng.pick(l.places);
  const values = { OwnerGen: cap(owner.gen), base: thing.base, Def: cap(thing.def) };
  return {
    ...base,
    name: fill(rng.pick(l.titles), values),
    intro: `${cap(owner.def)} venter ved inngangen. ${cap(owner.gen)} ${thing.base} ligger ${place.where} langt inne i hulen. Hent ${thing.pron} og bring ${thing.pron} hjem.`,
    goal: { name: cap(place.def), icon: place.icon, itemIcon: thing.icon, item: `${thing.def} til ${owner.def}`, deliver: `${thing.def} til ${owner.def} ved inngangen`, need: place.guard || null },
    theme: { goal: `${owner.id}:${thing.id}`, opener: place.id },
  };
}

function composeKomUt(rng, k, base) {
  const exit = rng.pick(k.exits);
  return { ...base, name: rng.pick(exit.titles), intro: exit.intro, goal: { name: cap(exit.def), icon: exit.icon, need: exit.need || null }, theme: { goal: exit.id, opener: exit.id } };
}

// What "Overrask meg" should avoid repeating: the goal and the opener of a mission.
export function themeKey(mission) {
  return mission.theme || { goal: mission.id, opener: mission.id };
}
