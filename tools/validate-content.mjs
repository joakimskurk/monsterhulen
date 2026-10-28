#!/usr/bin/env node
// Validates content/*.json against the V2 card format (content/README.md)
// and prints tag coverage: who needs a tag vs. who can provide it.
// Exit code 1 on errors. Warnings do not fail.
import { loadContent, isCarryTag } from './lib/content.mjs';

const c = loadContent();
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const tagOk = (where, tag) => { if (!c.tagById.has(tag)) err(where, `unknown tag ${tag}`); };
const wantTypes = new Set(c.vocabulary.wantTypes.map((w) => w.id));
const roles = new Set(Object.keys(c.vocabulary.roles));
const combats = new Set(Object.keys(c.vocabulary.combat));
const dispositions = new Set(c.vocabulary.dispositions);
const zones = new Set(c.vocabulary.zones);

// Unique ids across all card types.
const seen = new Map();
for (const [kind, list] of Object.entries({ figure: c.figures, obstacle: c.obstacles, item: c.items, source: c.sources, recipe: c.recipes, mission: c.missions })) {
  for (const card of list) {
    if (!card.id) { err(kind, 'card without id'); continue; }
    if (seen.has(card.id)) err(card.id, `duplicate id (also a ${seen.get(card.id)})`);
    seen.set(card.id, kind);
  }
}

for (const f of c.figures) {
  const at = `figure ${f.id}`;
  if (!f.name) err(at, 'missing name');
  if (!dispositions.has(f.disposition)) err(at, `bad disposition ${f.disposition}`);
  if (!combats.has(f.combat)) err(at, `bad combat ${f.combat}`);
  for (const r of f.roles || []) if (!roles.has(r)) err(at, `bad role ${r}`);
  const g = f.gives || {};
  for (const w of f.wants || []) {
    if (!wantTypes.has(w.type)) err(at, `bad want type ${w.type}`);
    if (w.type === 'SORT') { if (!w.tags?.length) err(at, 'SORT without tags'); (w.tags || []).forEach((t) => tagOk(at, t)); }
    if (w.type === 'BYTTE') { if (!w.accepts?.length) err(at, 'BYTTE without accepts'); (w.accepts || []).forEach((t) => tagOk(at, t)); }
    if (w.type === 'MISTET' && !w.what) err(at, 'MISTET without what');
    if (['GJORE', 'VITE', 'KAMP'].includes(w.type) && !w.task) err(at, `${w.type} without task`);
    (w.needs || []).forEach((t) => tagOk(at, t));
    if (!w.sign) err(at, `want ${w.type} without sign (hint step 1)`);
  }
  for (const w of f.weakness || []) {
    tagOk(at, w.tag);
    if (!w.sign) err(at, `weakness ${w.tag} without sign`);
    if (!w.result) err(at, `weakness ${w.tag} without result`);
  }
  for (const key of ['rewards', 'sells', 'ability']) (g[key] || []).forEach((t) => tagOk(at, t));
  const has = (r) => (f.roles || []).includes(r);
  if (has('trader') && !(f.wants || []).some((w) => w.type === 'BYTTE')) err(at, 'trader without BYTTE want');
  if (has('trader') && !(g.sells || []).length) err(at, 'trader without sells');
  if (has('companion') && !(g.ability || []).length) err(at, 'companion without ability');
  if (has('quest') && !(g.rewards || []).length && !(g.ability || []).length) err(at, 'quest without rewards or ability');
  if (has('blocker') && !g.opens) err(at, 'blocker without gives.opens');
  if (has('blocker') && !(f.wants || []).length && !(f.weakness || []).length) err(at, 'blocker with no way to resolve it');
  if (f.combat === 'strong' && !(f.weakness || []).length) err(at, 'combat strong requires a weakness');
  if (!f.intro) warn(at, 'missing intro');
}

for (const o of c.obstacles) {
  const at = `obstacle ${o.id}`;
  if (!o.solvedBy?.length) err(at, 'no solvedBy');
  for (const s of o.solvedBy || []) { tagOk(at, s.tag); if (!s.sign) err(at, `solvedBy ${s.tag} without sign`); }
}

for (const i of c.items) {
  const at = `item ${i.id}`;
  if (!i.tags?.length) err(at, 'no tags');
  (i.tags || []).forEach((t) => tagOk(at, t));
  for (const t of i.tags || []) if (!isCarryTag(c, t)) err(at, `item carries non-carry tag ${t}`);
  if (i.container && !(i.tags || []).includes('BEHOLDER')) err(at, 'container must have BEHOLDER tag');
}

for (const s of c.sources) {
  const at = `source ${s.id}`;
  tagOk(at, s.gives);
  if (s.requires !== null && s.requires !== undefined) { tagOk(at, s.requires); if (!s.sign) err(at, 'requires a tool but has no sign'); }
  for (const z of s.zones || []) if (!zones.has(z)) err(at, `unknown zone ${z}`);
}

for (const r of c.recipes) {
  const at = `recipe ${r.id}`;
  for (const id of r.inputs || []) if (!c.itemById.has(id)) err(at, `unknown input item ${id}`);
  (r.output?.tags || []).forEach((t) => tagOk(at, t));
  if (!r.hint) err(at, 'missing hint');
}

for (const m of c.missions) {
  const at = `mission ${m.id}`;
  if (!['FINN', 'REDD', 'SAMLE', 'LEVER', 'KOM_UT'].includes(m.type)) err(at, `bad type ${m.type}`);
  (m.goal?.calm || []).forEach((t) => tagOk(at, t));
  (m.goal?.pool || []).forEach((t) => tagOk(at, t));
  for (const z of m.route || []) if (!zones.has(z)) err(at, `unknown zone ${z}`);
  if (m.route && m.route.length !== 4) err(at, 'route needs 4 zones (start, gate 1, gate 2, gate 3+)');
  if (m.type === 'FINN' && !(m.goal?.lock?.name && m.goal?.lock?.key)) err(at, 'FINN needs goal.lock.name and goal.lock.key');
  if (m.type === 'REDD' && !(m.goal?.calm || []).length) err(at, 'REDD needs goal.calm');
  if (m.type === 'SAMLE' && !((m.goal?.pool || []).length >= (m.goal?.count || 0) && m.goal?.count > 0)) err(at, 'SAMLE needs goal.count <= pool size');
  if (m.type === 'LEVER' && !m.goal?.item) err(at, 'LEVER needs goal.item');
  if (!m.intro) err(at, 'missing intro');
}

for (const tag of c.vocabulary.tags) if (tag.carry && !tag.phrase) err(`tag ${tag.id}`, 'carry tag needs a phrase for signs');

// Themes for composed missions (content/themes.json, workshop 2026-10-28).
{
  const t = c.themes;
  const at = 'themes';
  const routeOk = (r, where) => { if (r.length !== 4) err(where, 'route needs 4 zones'); r.forEach((z) => { if (!zones.has(z)) err(where, `unknown zone ${z}`); }); };
  (t.routes || []).forEach((r, i) => routeOk(r, `${at} route ${i}`));
  if (!(t.routes || []).length) err(at, 'no routes');
  const F = t.FINN;
  for (const l of F.locks) {
    if (!l.def || !l.short || !['bak', 'i'].includes(l.prep)) err(`${at} lock ${l.id}`, 'needs def, short and prep bak/i');
    for (const o of l.openers) if (!['KEY', 'MAGIC', 'RHYME', 'TAG'].includes(o)) err(`${at} lock ${l.id}`, `bad opener ${o}`);
    if (l.openers.includes('TAG')) { if (!l.tag?.sign || !l.tag?.intro) err(`${at} lock ${l.id}`, 'TAG opener needs tag.sign and tag.intro'); else tagOk(`${at} lock ${l.id}`, l.tag.tag); if (l.tag && !c.tagById.get(l.tag.tag)?.carry) err(`${at} lock ${l.id}`, 'TAG opener must be a carry tag'); }
  }
  for (const k of F.keys) { if (!k.hole) err(`${at} key ${k.id}`, 'missing hole sign'); (k.zones || []).forEach((z) => { if (!zones.has(z)) err(`${at} key ${k.id}`, `unknown zone ${z}`); }); }
  for (const m of F.magic) { if (!m.shape) err(`${at} magic ${m.id}`, 'missing shape'); (m.zones || []).forEach((z) => { if (!zones.has(z)) err(`${at} magic ${m.id}`, `unknown zone ${z}`); }); }
  for (const r of F.rhymes) if (r.lines?.length !== 3) err(`${at} rhyme ${r.id}`, 'a rhyme has exactly 3 lines');
  for (const kind of ['KEY', 'MAGIC', 'RHYME', 'TAG']) if (!F.titles[kind]?.length) err(at, `no titles for ${kind}`);
  // A goal need from a part (decision A9): a carry tag or one named part, always with a sign.
  const needOk = (where, need) => {
    if (!need.sign) err(where, 'need without sign');
    if (need.part) return;
    tagOk(where, need.tag);
    if (!c.tagById.get(need.tag)?.carry) err(where, `need ${need.tag} must be a carry tag`);
  };
  for (const cr of t.REDD.creatures) {
    const where = `${at} creature ${cr.id}`;
    if (!['den', 'det'].includes(cr.pron)) err(where, 'pron must be den/det');
    for (const tag of cr.calm) { tagOk(where, tag); if (!t.calmSigns[tag]) err(where, `no calmSign for ${tag}`); }
    for (const p of cr.problems) {
      if (!p.text) err(where, 'problem without text');
      if (p.free) { needOk(`${where} "${p.text}"`, p.free); if (cr.calm.includes(p.free.tag)) err(where, `free tag ${p.free.tag} is also a calm tag`); }
    }
  }
  for (const d of t.SAMLE.devices) {
    const where = `${at} device ${d.id}`;
    if (d.pool.length < 3) err(where, 'pool needs at least 3 tags');
    d.pool.forEach((tag) => tagOk(where, tag));
    if (!d.socket) err(where, 'missing socket');
    if (!d.titles?.length) err(where, 'missing titles');
    if (d.part && !(d.part.name && d.part.sign)) err(where, 'part needs name and sign');
  }
  for (const p of t.LEVER.places) if (p.guard) needOk(`${at} place ${p.id}`, p.guard);
  for (const e of t.KOM_UT.exits) { if (!e.titles?.length) err(`${at} exit ${e.id}`, 'missing titles'); if (e.need) needOk(`${at} exit ${e.id}`, e.need); }
  const things = new Set(t.LEVER.things.map((x) => x.id));
  for (const o of t.LEVER.owners) for (const id of o.things) if (!things.has(id)) err(`${at} owner ${o.id}`, `unknown thing ${id}`);
  for (const th of t.LEVER.things) if (!['den', 'det', 'dem'].includes(th.pron)) err(`${at} thing ${th.id}`, 'pron must be den/det/dem');
  for (const p of t.LEVER.places) if (!p.where) err(`${at} place ${p.id}`, 'missing where');
}

// Coverage: for each carry tag, count consumers and providers.
const coverage = new Map(c.vocabulary.tags.filter((t) => t.carry).map((t) => [t.id, { need: 0, items: 0, sources: 0, sells: 0, rewards: 0, ability: 0, recipes: 0 }]));
const bump = (tag, key) => { if (coverage.has(tag)) coverage.get(tag)[key] += 1; };
for (const f of c.figures) {
  for (const w of f.wants || []) [...(w.tags || []), ...(w.accepts || []), ...(w.needs || [])].forEach((t) => bump(t, 'need'));
  for (const w of f.weakness || []) bump(w.tag, 'need');
  for (const t of f.gives?.sells || []) bump(t, 'sells');
  for (const t of f.gives?.rewards || []) bump(t, 'rewards');
  for (const t of f.gives?.ability || []) bump(t, 'ability');
}
for (const o of c.obstacles) for (const s of o.solvedBy) bump(s.tag, 'need');
for (const i of c.items) if (!i.persistent) for (const t of i.tags) bump(t, 'items');
for (const s of c.sources) bump(s.gives, 'sources');
for (const r of c.recipes) for (const t of r.output.tags) bump(t, 'recipes');
for (const [tag, n] of coverage) {
  const provide = n.items + n.sources + n.sells + n.rewards + n.ability + n.recipes;
  if (n.need > 0 && provide === 0) err(`tag ${tag}`, `needed ${n.need}x but nothing provides it`);
  else if (n.need > 0 && n.items + n.sources === 0) warn(`tag ${tag}`, 'only figures provide it (no item or source)');
}

const counts = `figures ${c.figures.length}, obstacles ${c.obstacles.length}, items ${c.items.length} (${c.items.filter((i) => i.persistent).length} persistent), sources ${c.sources.length}, recipes ${c.recipes.length}, missions ${c.missions.length}`;
console.log(`Content: ${counts}\n`);
console.log('Tag coverage (need | items sources sells rewards ability recipes):');
for (const [tag, n] of coverage) console.log(`  ${tag.padEnd(11)} ${String(n.need).padStart(3)} | ${[n.items, n.sources, n.sells, n.rewards, n.ability, n.recipes].map((x) => String(x).padStart(3)).join(' ')}`);
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ${warnings.join('\n  ')}`);
if (errors.length) { console.log(`\nErrors (${errors.length}):\n  ${errors.join('\n  ')}`); process.exit(1); }
console.log('\nOK: content is valid.');
