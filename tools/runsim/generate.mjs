// Chain-first run generator (docs/v2/SYSTEM_DESIGN_V2.md §4).
// 1. map with obstacle gates -> zones
// 2. for every gate, pick a blocker and build its dependency chain backwards
// 3. every provider is placed in a zone <= the zone of what it serves
// 4. alternatives and ambient figures are added afterwards and never relied on
// The playthrough automaton (playthrough.mjs) decides whether the run is accepted.
import { makeRng } from './rng.mjs';
import { generateMap, LENGTHS } from './map.mjs';
import { figureNeeds, isCarryTag } from '../lib/content-core.mjs';
import { resolveMission } from './theme.mjs';

const BASE_WEIGHT = { LIGGER: 1.6, GJEMT: 1.2, HANDEL: 2.2, BELONNING: 2.2, VENN: 2.2, MILJO: 2.2, OPPSKRIFT: 1.6 };

export function generateRun(content, { missionId, seed, length = 'VANLIG' }) {
  const rng = makeRng(`${missionId}|${length}|${seed}`);
  const shape = LENGTHS[length];
  const mission = resolveMission(content, missionId, seed);
  if (!mission) throw new Error(`unknown mission ${missionId}`);
  const map = generateMap(rng, shape);
  // A mission may fix its zones (`route`); otherwise a route is drawn from the seed.
  const routes = content.themes.routes;
  const route = mission.route || rng.pick(routes);
  map.rooms.forEach((r) => { r.zoneName = route[Math.min(r.zone, route.length - 1)]; });
  nameRooms(content.places, map);

  const ctx = {
    content, rng, map, mission, length,
    budget: shape.budget,
    nodes: [],
    usedFigures: new Set(), usedObstacles: new Set(), usedItems: new Set(),
    usedSourceTypes: new Map(), usedRecipe: false,
    occupied: new Set([map.start, map.end]),
  };

  const run = { seed, length, mission, map, nodes: ctx.nodes, gates: {}, goal: null, alternatives: [], ambient: [] };
  const lastGate = shape.gates;

  for (let g = 1; g <= lastGate; g++) {
    const room = map.gateRoom[g];
    ctx.occupied.add(room);
    let gateNode;
    // A chest holds the treasure in the innermost room; it is not a gate, so the last gate is a normal blocker.
    if (g === lastGate && mission.type === 'FINN' && !mission.goal.lock.inGoal) gateNode = makeLock(ctx, room, g);
    else if (g === lastGate && mission.type === 'SAMLE') gateNode = makeMachine(ctx, room, g);
    else gateNode = makeBlocker(ctx, room, g);
    if (!gateNode) return { ok: false, reason: `no blocker for gate ${g}` };
    run.gates[g] = gateNode.id;
  }

  run.goal = makeGoal(ctx, lastGate);
  if (!run.goal) return { ok: false, reason: 'goal could not be built' };
  if (ctx.failed) return { ok: false, reason: ctx.failed };
  // Nobody in the cave may want what the treasure is (no music wanted where the treasure is a music box).
  const clash = (mission.goal?.tags || []).find((tag) => ctx.nodes.some((n) => n.needs.some((x) => x.tag === tag)));
  if (clash) return { ok: false, reason: `the treasure is ${clash}, which the cave wants` };

  addAlternatives(ctx, run);
  addAmbient(ctx, run);
  return { ok: true, run };
}

// Room names and mood from the owner's original (content/places.json): rooms in a zone take its names
// in order of distance from the start, with a number when the names run out; the start is STARTPORTEN.
function nameRooms(places, map) {
  const used = {};
  const order = map.rooms.slice().sort((a, b) => map.distance[map.start][a.id] - map.distance[map.start][b.id] || a.id - b.id);
  for (const r of order) {
    const zone = places.zones[r.zoneName];
    r.tone = zone.tone;
    if (r.id === map.start) { r.name = places.start; continue; }
    const i = used[r.zoneName] = (used[r.zoneName] ?? -1) + 1;
    r.name = zone.rooms[i % zone.rooms.length] + (i >= zone.rooms.length ? ` ${Math.floor(i / zone.rooms.length) + 1}` : '');
  }
}

// ---------- nodes ----------

function addNode(ctx, node) {
  node.id = `n${ctx.nodes.length + 1}`;
  ctx.nodes.push(node);
  if (node.room !== undefined && node.room !== null) ctx.occupied.add(node.room);
  return node;
}

function chooseRoom(ctx, maxZone, nearRoom, { preferFar = true } = {}) {
  const free = ctx.map.rooms.filter((r) => r.zone <= maxZone && !ctx.occupied.has(r.id));
  if (!free.length) return null;
  if (nearRoom === undefined || nearRoom === null) return ctx.rng.pick(free);
  const scored = free.map((r) => [r, ctx.map.distance[nearRoom][r.id] + ctx.rng() * 1.5]).sort((a, b) => (preferFar ? b[1] - a[1] : a[1] - b[1]));
  return scored[Math.floor(ctx.rng() * Math.max(1, Math.ceil(scored.length / 2)))][0];
}

const zoneOf = (ctx, roomId) => ctx.map.rooms[roomId].zone;

// ---------- gate builders ----------

function makeBlocker(ctx, room, gate) {
  const { content, rng } = ctx;
  const figures = content.figures.filter((f) => (f.roles || []).includes('blocker') && !ctx.usedFigures.has(f.id) && figureNeeds(f).some((n) => isCarryTag(content, n.tag)));
  const obstacles = content.obstacles.filter((o) => !ctx.usedObstacles.has(o.id) && o.solvedBy.some((s) => isCarryTag(content, s.tag)));
  const pool = rng.shuffle([...figures.map((f) => ['figure', f]), ...obstacles.map((o) => ['obstacle', o])]);
  for (const [kind, card] of pool) {
    const needs = kind === 'figure'
      ? figureNeeds(card).filter((n) => isCarryTag(content, n.tag))
      : card.solvedBy.filter((s) => isCarryTag(content, s.tag)).map((s) => ({ via: 'solvedBy', tag: s.tag, sign: s.sign }));
    const need = rng.pick(needs);
    const node = addNode(ctx, { kind: 'blocker', cardKind: kind, card, room, zone: zoneOf(ctx, room), gate, needs: [] });
    const provider = provideTag(ctx, need.tag, node, 0);
    if (!provider) { ctx.nodes.pop(); continue; }
    node.needs.push({ tag: need.tag, via: need.via, sign: need.sign || signFor(card, need.tag), provider: provider.id });
    if (kind === 'figure') ctx.usedFigures.add(card.id); else ctx.usedObstacles.add(card.id);
    return node;
  }
  return null;
}

// The door to the treasure. Four kinds of opener (workshop decision A1):
// KEY and MAGIC are one specific thing, RHYME is 2–3 lines found separately, TAG is anything with a tag.
function makeLock(ctx, room, gate) {
  const lock = ctx.mission.goal.lock;
  const opener = lock.opener || { kind: 'KEY', item: lock.key, icon: lock.keyIcon, sign: `${lock.name} har et lite nøkkelhull.` };
  const node = addNode(ctx, { kind: 'lock', opener: opener.kind, card: { name: lock.name, intro: lock.intro, icon: lock.icon }, room, zone: zoneOf(ctx, room), gate, needs: [] });
  return addOpenerNeeds(ctx, node, opener) ? node : null;
}

// Adds what the opener needs to `node` (a door at a gate, or the chest that is the goal). False if it cannot be provided.
function addOpenerNeeds(ctx, node, opener) {
  if (opener.kind === 'KEY' || opener.kind === 'MAGIC') {
    const provider = provideSpecific(ctx, { specificId: 'KEY', name: opener.item, icon: opener.icon || ctx.content.generic('key'), tags: [], consumable: true }, node, 0);
    if (!provider) return false;
    node.needs.push({ specific: 'KEY', name: opener.item, provider: provider.id, sign: opener.sign });
    return true;
  }
  if (opener.kind === 'RHYME') {
    // Short runs show the first line over the door; otherwise all three lines must be found (decision A5).
    const shown = ctx.length === 'KORT' ? 1 : 0;
    node.rhyme = { lines: opener.lines, shown };
    const doorSign = shown
      ? `Over ${opener.door} står første linje: ${opener.lines[0]} … Resten er visket bort.`
      : `Over ${opener.door} er det risset tre linjer, men bokstavene er visket bort.`;
    for (let i = shown; i < opener.lines.length; i++) {
      const line = { specificId: `RHYME:${i + 1}`, name: `Regle-linje ${i + 1}: «${opener.lines[i]}»`, icon: ctx.content.generic('rhyme-line'), found: `Noen har risset en linje i veggen: «${opener.lines[i]}»`, tags: [], consumable: true };
      const provider = provideSpecific(ctx, line, node, 0);
      if (!provider) return false;
      node.needs.push({ specific: line.specificId, name: line.name, via: 'rhyme', provider: provider.id, sign: i === shown ? doorSign : `Linje ${i + 1} mangler i innskriften.` });
    }
    return true;
  }
  const provider = provideTag(ctx, opener.tag, node, 0);
  if (!provider) return false;
  node.needs.push({ tag: opener.tag, via: 'element', provider: provider.id, sign: opener.sign });
  return true;
}

function makeMachine(ctx, room, gate) {
  const { rng, mission } = ctx;
  const node = addNode(ctx, { kind: 'machine', card: { name: mission.goal.name, icon: mission.goal.icon }, room, zone: zoneOf(ctx, room), gate, needs: [] });
  const part = mission.goal.part;
  if (part && !addThemeNeed(ctx, node, { part: part.name, icon: part.icon, sign: part.sign }, 'part')) return null;
  const tags = rng.shuffle(mission.goal.pool).slice(0, mission.goal.count - (part ? 1 : 0));
  for (const tag of tags) {
    const provider = provideTag(ctx, tag, node, 0);
    if (!provider) return null;
    const socket = mission.goal.socket || 'Ett av festene';
    node.needs.push({ tag, via: 'socket', provider: provider.id, sign: `${socket} lyser og venter på ${phraseOf(ctx, tag)}.` });
  }
  return node;
}

function makeGoal(ctx, lastGate) {
  const { mission, map, rng } = ctx;
  const endZone = lastGate;
  if (mission.type === 'FINN') {
    const lock = mission.goal.lock;
    // The treasure is a thing, never a figure that asks for something (owner, playtest 2026-10-28):
    // behind a door it just lies there; in a chest, the chest is what she opens.
    const treasure = { name: mission.goal.name, icon: mission.goal.icon, about: mission.goal.about };
    if (!lock.inGoal) return addNode(ctx, { kind: 'goal', treasure, card: { name: mission.goal.name, icon: mission.goal.icon }, room: map.end, zone: endZone, needs: [] });
    const node = addNode(ctx, { kind: 'goal', treasure, opener: lock.opener.kind, card: { name: lock.name, intro: `${lock.intro} Inni ligger ${mission.goal.about}.`, icon: lock.icon || mission.goal.icon }, room: map.end, zone: endZone, needs: [] });
    return addOpenerNeeds(ctx, node, lock.opener) ? node : null;
  }
  if (mission.type === 'KOM_UT') {
    const node = addNode(ctx, { kind: 'exit', card: { name: mission.goal.name, icon: mission.goal.icon }, room: map.end, zone: endZone, needs: [] });
    return !mission.goal.need || addThemeNeed(ctx, node, mission.goal.need, 'exit') ? node : null;
  }
  if (mission.type === 'SAMLE') return addNode(ctx, { kind: 'exit', card: { name: `Rommet bak ${mission.goal.name.toLowerCase()}`, icon: ctx.content.generic('door') }, room: map.end, zone: endZone, needs: [] });
  if (mission.type === 'LEVER') {
    const node = addNode(ctx, { kind: 'deliver', card: { name: mission.goal.name, icon: mission.goal.icon }, room: map.end, zone: endZone, needs: [], deliverTo: map.start });
    node.item = { specificId: 'DELIVERY', name: mission.goal.item, icon: mission.goal.itemIcon || ctx.content.generic('lost-thing'), tags: [], consumable: true };
    if (mission.goal.need && !addThemeNeed(ctx, node, mission.goal.need, 'guard')) return null;
    return node;
  }
  if (mission.type === 'REDD') {
    const node = addNode(ctx, { kind: 'target', card: { name: mission.goal.name, icon: mission.goal.icon }, room: map.end, zone: endZone, needs: [] });
    // First get it loose (if its problem says so), then calm it.
    if (mission.goal.free && !addThemeNeed(ctx, node, mission.goal.free, 'free')) return null;
    const tag = rng.pick(mission.goal.calm);
    const provider = provideTag(ctx, tag, node, 0);
    if (!provider) return null;
    const sign = mission.goal.calmSigns?.[tag] || `${mission.goal.name} slapper av når den kjenner ${phraseOf(ctx, tag)}.`;
    node.needs.push({ tag, via: 'calm', provider: provider.id, sign });
    return node;
  }
  return null;
}

// Ready-written phrase for a tag in running text («venter på å bli reparert»), from vocabulary.json.
const phraseOf = (ctx, tag) => ctx.content.tagById.get(tag).phrase || ctx.content.tagById.get(tag).label;

// A need that comes from a theme part (decision A9): a tag ({ tag, sign }) or one specific part ({ part, sign }).
function addThemeNeed(ctx, node, need, via) {
  if (need.part) {
    const provider = provideSpecific(ctx, { specificId: 'PART', name: need.part, icon: need.icon || ctx.content.generic('part'), tags: [], consumable: true }, node, 0);
    if (!provider) return false;
    node.needs.push({ specific: 'PART', name: need.part, via, provider: provider.id, sign: need.sign });
    return true;
  }
  const provider = provideTag(ctx, need.tag, node, 0);
  if (!provider) return false;
  node.needs.push({ tag: need.tag, via, provider: provider.id, sign: need.sign });
  return true;
}

function signFor(card, tag) {
  const w = (card.weakness || []).find((x) => x.tag === tag) || (card.solvedBy || []).find((x) => x.tag === tag);
  return w?.sign || null;
}

// ---------- providers ----------

function itemsWithTag(ctx, tag, { containerOnly = false } = {}) {
  return ctx.content.items.filter((i) => !i.persistent && i.tags.includes(tag) && !ctx.usedItems.has(i.id) && (!containerOnly || i.container));
}

function sourceTypeWeight(ctx, type) {
  const used = ctx.usedSourceTypes.get(type) || 0;
  return BASE_WEIGHT[type] * Math.pow(0.2, used);
}

function markType(ctx, type) { ctx.usedSourceTypes.set(type, (ctx.usedSourceTypes.get(type) || 0) + 1); }

// Returns a placed provider node for `tag`, serving `consumer`, placed in zone <= consumer.zone.
function provideTag(ctx, tag, consumer, depth, { containerOnly = false } = {}) {
  // Never "to get wind you need wind": a tag cannot be needed again inside its own chain.
  ctx.inProgress ||= new Set();
  if (ctx.inProgress.has(tag)) return null;
  ctx.inProgress.add(tag);
  try { return provideTagInner(ctx, tag, consumer, depth, { containerOnly }); } finally { ctx.inProgress.delete(tag); }
}

function provideTagInner(ctx, tag, consumer, depth, { containerOnly }) {
  const { content, rng } = ctx;
  const maxZone = consumer.zone;
  const nestedOk = ctx.budget > 0 && depth < 4;
  const options = [];

  const items = itemsWithTag(ctx, tag, { containerOnly });
  if (items.length) { options.push('LIGGER'); options.push('GJEMT'); }
  if (nestedOk && !containerOnly) {
    if (content.figures.some((f) => isUsableTrader(ctx, f, tag))) options.push('HANDEL');
    if (content.figures.some((f) => isUsableQuest(ctx, f, tag))) options.push('BELONNING');
    if (!ctx.usedRecipe && content.recipes.some((r) => r.output.tags.includes(tag) && r.inputs.every((id) => !ctx.usedItems.has(id)))) options.push('OPPSKRIFT');
  }
  if (containerOnly && nestedOk && content.figures.some((f) => isUsableTrader(ctx, f, tag, true))) options.push('HANDEL');
  if (!containerOnly) {
    if (content.figures.some((f) => isUsableCompanion(ctx, f, tag, nestedOk))) options.push('VENN');
    if (content.sources.some((s) => s.gives === tag && (s.requires === null || nestedOk))) options.push('MILJO');
  }

  const order = [];
  // Variety rule 1, strict for direct links: a trade is never paid for with another trade, etc.
  const remaining = new Set(options.filter((t) => t !== consumer.sourceType));
  while (remaining.size) {
    const t = rng.weighted([...remaining].map((x) => [x, sourceTypeWeight(ctx, x)]));
    order.push(t); remaining.delete(t);
  }
  for (const type of order) {
    const snapshot = { nodes: ctx.nodes.length, budget: ctx.budget, occupied: new Set(ctx.occupied), usedFigures: new Set(ctx.usedFigures), usedItems: new Set(ctx.usedItems), usedRecipe: ctx.usedRecipe, usedSourceTypes: new Map(ctx.usedSourceTypes) };
    const node = buildProvider(ctx, type, tag, consumer, maxZone, depth, { containerOnly });
    if (node) return node;
    Object.assign(ctx, { budget: snapshot.budget, occupied: snapshot.occupied, usedFigures: snapshot.usedFigures, usedItems: snapshot.usedItems, usedRecipe: snapshot.usedRecipe, usedSourceTypes: snapshot.usedSourceTypes });
    ctx.nodes.length = snapshot.nodes;
  }
  return null;
}

function isUsableTrader(ctx, f, tag, containerOnly = false) {
  return (f.roles || []).includes('trader') && !ctx.usedFigures.has(f.id) && (f.gives?.sells || []).includes(tag)
    && itemsWithTag(ctx, tag, { containerOnly }).length > 0
    && (f.wants || []).some((w) => w.type === 'BYTTE' && w.accepts.some((t) => isCarryTag(ctx.content, t)));
}
function isUsableQuest(ctx, f, tag) {
  return (f.roles || []).includes('quest') && !ctx.usedFigures.has(f.id) && (f.gives?.rewards || []).includes(tag) && itemsWithTag(ctx, tag).length > 0;
}
function isUsableCompanion(ctx, f, tag, nestedOk) {
  if (!(f.roles || []).includes('companion') || ctx.usedFigures.has(f.id) || !(f.gives?.ability || []).includes(tag)) return false;
  return nestedOk || hasLocalNeed(ctx, f);
}
function hasLocalNeed(ctx, f) {
  return (f.wants || []).some((w) => ['VITE', 'KAMP'].includes(w.type)
    || (w.type === 'GJORE' && !(w.needs || []).some((t) => isCarryTag(ctx.content, t)))
    || (w.type === 'SORT' && w.tags.every((t) => !isCarryTag(ctx.content, t))));
}

function buildProvider(ctx, type, tag, consumer, maxZone, depth, { containerOnly }) {
  const { content, rng } = ctx;
  const nearRoom = consumer.room;

  if (type === 'LIGGER' || type === 'GJEMT') {
    const item = rng.pick(itemsWithTag(ctx, tag, { containerOnly }));
    const room = chooseRoom(ctx, maxZone, nearRoom);
    if (!item || !room) return null;
    ctx.usedItems.add(item.id); markType(ctx, type);
    return addNode(ctx, { kind: 'item', sourceType: type, hidden: type === 'GJEMT', card: item, item: itemInstance(item), provides: tag, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
  }

  if (type === 'HANDEL') {
    const trader = rng.pick(content.figures.filter((f) => isUsableTrader(ctx, f, tag, containerOnly)));
    const room = trader && chooseRoom(ctx, maxZone, nearRoom);
    if (!trader || !room) return null;
    const stock = rng.pick(itemsWithTag(ctx, tag, { containerOnly }));
    ctx.usedFigures.add(trader.id); ctx.usedItems.add(stock.id); ctx.budget -= 1; markType(ctx, type);
    const node = addNode(ctx, { kind: 'trader', sourceType: type, card: trader, item: itemInstance(stock), provides: tag, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
    const payTags = trader.wants.find((w) => w.type === 'BYTTE').accepts.filter((t) => isCarryTag(content, t) && t !== tag);
    for (const payTag of rng.shuffle(payTags)) {
      const pay = provideTag(ctx, payTag, node, depth + 1);
      if (pay) { node.needs.push({ tag: payTag, via: 'trade', provider: pay.id, sign: trader.wants.find((w) => w.type === 'BYTTE').sign }); return node; }
    }
    return null;
  }

  if (type === 'BELONNING') {
    const quests = content.figures.filter((f) => isUsableQuest(ctx, f, tag));
    const quest = quests.length && pickQuest(ctx, quests);
    const room = quest && chooseRoom(ctx, maxZone, nearRoom);
    if (!quest || !room) return null;
    const reward = rng.pick(itemsWithTag(ctx, tag));
    ctx.usedFigures.add(quest.id); ctx.usedItems.add(reward.id); ctx.budget -= 1; markType(ctx, type);
    const node = addNode(ctx, { kind: 'quest', sourceType: type, card: quest, item: itemInstance(reward), provides: tag, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
    return resolveFigureWant(ctx, node, quest, depth) ? node : null;
  }

  if (type === 'VENN') {
    const nestedOk = ctx.budget > 0 && depth < 4;
    const friend = rng.pick(content.figures.filter((f) => isUsableCompanion(ctx, f, tag, nestedOk)));
    const room = friend && chooseRoom(ctx, maxZone, nearRoom);
    if (!friend || !room) return null;
    ctx.usedFigures.add(friend.id); markType(ctx, type);
    const node = addNode(ctx, { kind: 'companion', sourceType: type, card: friend, ability: friend.gives.ability, provides: tag, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
    return resolveFigureWant(ctx, node, friend, depth) ? node : null;
  }

  if (type === 'MILJO') {
    const zoneName = ctx.map.rooms[nearRoom]?.zoneName;
    const candidates = content.sources.filter((s) => s.gives === tag && (s.requires === null || ctx.budget > 0));
    if (!candidates.length) return null;
    const source = rng.weighted(candidates.map((s) => [s, (s.zones || []).includes(zoneName) ? 3 : 1]));
    const room = chooseRoom(ctx, maxZone, nearRoom);
    if (!room) return null;
    markType(ctx, type);
    const filled = { specificId: null, name: source.requires === 'BEHOLDER' ? `beholder med ${content.tagById.get(tag).label}` : `${content.tagById.get(tag).label} fra ${source.name.toLowerCase()}`, icon: source.requires === 'BEHOLDER' ? content.tagById.get(tag).icon : source.icon, tags: [tag], consumable: true };
    const node = addNode(ctx, { kind: 'source', sourceType: type, card: source, item: filled, provides: tag, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
    if (source.requires) {
      ctx.budget -= 1;
      const tool = provideTag(ctx, source.requires, node, depth + 1, { containerOnly: source.requires === 'BEHOLDER' });
      if (!tool) return null;
      node.needs.push({ tag: source.requires, via: source.requires === 'BEHOLDER' ? 'fill' : 'tool', provider: tool.id, sign: source.sign });
    }
    return node;
  }

  if (type === 'OPPSKRIFT') {
    const recipe = rng.pick(content.recipes.filter((r) => r.output.tags.includes(tag) && r.inputs.every((id) => !ctx.usedItems.has(id))));
    if (!recipe) return null;
    ctx.usedRecipe = true; ctx.budget -= 1; markType(ctx, type);
    const node = addNode(ctx, { kind: 'recipe', sourceType: type, card: recipe, item: { specificId: null, name: recipe.output.name, icon: recipe.output.icon, tags: recipe.output.tags, consumable: recipe.output.consumable }, provides: tag, consumer: consumer.id, room: null, zone: consumer.zone, needs: [] });
    for (const id of recipe.inputs) {
      const item = content.itemById.get(id);
      const ingredient = provideSpecific(ctx, { ...itemInstance(item), specificId: id }, node, depth + 1, { onlyPlaced: true });
      if (!ingredient) return null;
      ctx.usedItems.add(id);
      node.needs.push({ specific: id, name: item.name, via: 'ingredient', provider: ingredient.id, sign: recipe.hint });
    }
    return node;
  }
  return null;
}

// A specific item (a key, a lost page, a recipe ingredient): lying, hidden, or given by a quest figure.
function provideSpecific(ctx, item, consumer, depth, { onlyPlaced = false } = {}) {
  const { content, rng } = ctx;
  const options = ['LIGGER', 'GJEMT'];
  if (!onlyPlaced && ctx.budget > 0) options.push('BELONNING');
  for (const type of rng.shuffle(options).sort((a, b) => sourceTypeWeight(ctx, b) - sourceTypeWeight(ctx, a))) {
    if (type === 'BELONNING') {
      const quests = content.figures.filter((f) => (f.roles || []).includes('quest') && !ctx.usedFigures.has(f.id));
      const quest = quests.length && pickQuest(ctx, quests);
      const room = quest && chooseRoom(ctx, consumer.zone, consumer.room);
      if (!quest || !room) continue;
      const snapshot = { nodes: ctx.nodes.length, budget: ctx.budget, occupied: new Set(ctx.occupied), usedFigures: new Set(ctx.usedFigures), usedItems: new Set(ctx.usedItems) };
      ctx.usedFigures.add(quest.id); ctx.budget -= 1; markType(ctx, 'BELONNING');
      const node = addNode(ctx, { kind: 'quest', sourceType: 'BELONNING', card: quest, item, provides: item.specificId, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
      if (resolveFigureWant(ctx, node, quest, depth)) return node;
      Object.assign(ctx, { budget: snapshot.budget, occupied: snapshot.occupied, usedFigures: snapshot.usedFigures, usedItems: snapshot.usedItems });
      ctx.nodes.length = snapshot.nodes;
      continue;
    }
    const room = chooseRoom(ctx, consumer.zone, consumer.room);
    if (!room) continue;
    markType(ctx, type);
    return addNode(ctx, { kind: 'item', sourceType: type, hidden: type === 'GJEMT', card: { name: item.name }, item, provides: item.specificId, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
  }
  return null;
}

// What a quest figure or companion wants before it helps. Prefer a chain if budget allows.
function resolveFigureWant(ctx, node, figure, depth) {
  const { content, rng } = ctx;
  const nestedOk = ctx.budget > 0 && depth < 4;
  const wants = rng.shuffle(figure.wants || []);
  const chainable = wants.filter((w) => isChainableWant(content, w));
  if (nestedOk) {
    for (const w of chainable) {
      if (w.type === 'MISTET') {
        const lost = provideSpecific(ctx, { specificId: `LOST:${figure.id}`, name: w.what, icon: ctx.content.generic('lost-thing'), tags: [], consumable: true }, node, depth + 1, { onlyPlaced: true });
        if (lost) { node.needs.push({ specific: `LOST:${figure.id}`, name: w.what, via: 'lost', provider: lost.id, sign: w.sign }); return true; }
        continue;
      }
      const tags = wantTags(w).filter((t) => isCarryTag(content, t));
      for (const t of rng.shuffle(tags)) {
        const p = provideTag(ctx, t, node, depth + 1);
        if (p) { node.needs.push({ tag: t, via: { SORT: 'wants', BYTTE: 'trade', GJORE: 'task' }[w.type], provider: p.id, task: w.task, sign: w.sign }); return true; }
      }
    }
  }
  const local = wants.find((w) => !chainable.includes(w));
  if (local) { node.needs.push({ local: true, via: w2via(local), task: local.task || (local.tags || []).map((t) => content.tagById.get(t).label).join(' / '), sign: local.sign }); return true; }
  return false;
}
const wantTags = (w) => ({ SORT: w.tags, BYTTE: w.accepts, GJORE: w.needs }[w.type] || []);
// A want that can be met with something carried, so it can start a sub-chain.
function isChainableWant(content, w) {
  return w.type === 'MISTET' || wantTags(w).some((t) => isCarryTag(content, t));
}
// Quest figures whose want can become a sub-chain make richer runs; prefer them while budget allows.
function pickQuest(ctx, quests) {
  const rich = ctx.budget > 0;
  return ctx.rng.weighted(quests.map((f) => [f, rich && (f.wants || []).some((w) => isChainableWant(ctx.content, w)) ? 3 : 1]));
}
const w2via = (w) => ({ VITE: 'vite', KAMP: 'kamp', GJORE: 'gjore', SORT: 'handling' }[w.type] || 'lokal');

function itemInstance(item) {
  return { specificId: null, cardId: item.id, name: item.name, icon: item.icon, tags: item.tags, consumable: item.consumable !== false };
}

// ---------- extras (never used by the automaton) ----------

function addAlternatives(ctx, run) {
  const { content, rng } = ctx;
  for (const node of ctx.nodes.filter((n) => n.kind === 'blocker')) {
    const card = node.card;
    const tags = node.cardKind === 'figure' ? figureNeeds(card).map((n) => n.tag) : card.solvedBy.map((s) => s.tag);
    const carry = tags.filter((t) => isCarryTag(content, t));
    const tag = rng.pick(carry);
    const item = tag && rng.pick(itemsWithTag(ctx, tag));
    const room = item && chooseRoom(ctx, node.zone, node.room);
    if (!item || !room) continue;
    ctx.usedItems.add(item.id);
    ctx.occupied.add(room.id);
    run.alternatives.push({ for: node.id, tag, item: item.name, icon: item.icon, room: room.id, zone: room.zone });
  }
}

function addAmbient(ctx, run) {
  const { content, rng } = ctx;
  const free = ctx.map.rooms.filter((r) => !ctx.occupied.has(r.id));
  // Not someone who wants what the treasure is (see the clash check in generateRun).
  const avoid = new Set(ctx.mission.goal?.tags || []);
  const wantsTreasure = (f) => [...(f.wants || []).flatMap((w) => [...(w.tags || []), ...(w.accepts || []), ...(w.needs || [])]), ...(f.weakness || []).map((w) => w.tag)].some((tag) => avoid.has(tag));
  const figures = rng.shuffle(content.figures.filter((f) => !ctx.usedFigures.has(f.id) && !wantsTreasure(f)));
  for (const room of free) {
    if (rng() < 0.55 && figures.length) run.ambient.push({ room: room.id, zone: room.zone, figure: figures.pop() });
  }
}
