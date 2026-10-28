// Chain-first run generator (docs/v2/SYSTEM_DESIGN_V2.md §4).
// 1. map with obstacle gates -> zones
// 2. for every gate, pick a blocker and build its dependency chain backwards
// 3. every provider is placed in a zone <= the zone of what it serves
// 4. alternatives and ambient figures are added afterwards and never relied on
// The playthrough automaton (playthrough.mjs) decides whether the run is accepted.
import { makeRng } from './rng.mjs';
import { generateMap, LENGTHS } from './map.mjs';
import { figureNeeds, isCarryTag } from '../lib/content-core.mjs';

const ROUTES = [
  ['SOPPSKOGEN', 'GRAVPLASSEN', 'HEKSETÅRNET', 'HEKSETÅRNET'],
  ['LANTERNEHAGEN', 'TÅKESUMPEN', 'ZOMBIESLOTTET', 'ZOMBIESLOTTET'],
  ['MÅNESKOGEN', 'KRYSTALLGROTTEN', 'BEINKATAKOMBENE', 'BEINKATAKOMBENE'],
  ['REGNBUEDALEN', 'SKYGGEGANGENE', 'KLOKKETÅRNET', 'KLOKKETÅRNET'],
];
const ROUTE_FOR = { WITCH_CAT: 0, ZOMBIE_DELIVERY: 1, GLASS_HEART: 2, CRYSTAL_MACHINE: 3 };

const BASE_WEIGHT = { LIGGER: 2, GJEMT: 1.5, HANDEL: 2.2, BELONNING: 2.2, VENN: 2.2, MILJO: 2.2, OPPSKRIFT: 1 };

export function generateRun(content, { missionId, seed, length = 'VANLIG' }) {
  const rng = makeRng(`${missionId}|${length}|${seed}`);
  const shape = LENGTHS[length];
  const mission = content.missions.find((m) => m.id === missionId);
  if (!mission) throw new Error(`unknown mission ${missionId}`);
  const map = generateMap(rng, shape);
  const route = ROUTES[ROUTE_FOR[mission.id] ?? Math.floor(rng() * ROUTES.length)];
  map.rooms.forEach((r) => { r.zoneName = route[Math.min(r.zone, route.length - 1)]; });

  const ctx = {
    content, rng, map, mission,
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
    if (g === lastGate && mission.type === 'FINN') gateNode = makeLock(ctx, room, g);
    else if (g === lastGate && mission.type === 'SAMLE') gateNode = makeMachine(ctx, room, g);
    else gateNode = makeBlocker(ctx, room, g);
    if (!gateNode) return { ok: false, reason: `no blocker for gate ${g}` };
    run.gates[g] = gateNode.id;
  }

  run.goal = makeGoal(ctx, lastGate);
  if (!run.goal) return { ok: false, reason: 'goal could not be built' };
  if (ctx.failed) return { ok: false, reason: ctx.failed };

  addAlternatives(ctx, run);
  addAmbient(ctx, run);
  return { ok: true, run };
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

function makeLock(ctx, room, gate) {
  const lock = ctx.mission.goal.lock;
  const node = addNode(ctx, { kind: 'lock', card: { name: lock.name }, room, zone: zoneOf(ctx, room), gate, needs: [] });
  const key = { specificId: 'KEY', name: lock.key, tags: [], consumable: true };
  const provider = provideSpecific(ctx, key, node, 0);
  if (!provider) return null;
  node.needs.push({ specific: 'KEY', name: lock.key, provider: provider.id, sign: `${lock.name} har et lite nøkkelhull.` });
  return node;
}

function makeMachine(ctx, room, gate) {
  const { rng, mission } = ctx;
  const node = addNode(ctx, { kind: 'machine', card: { name: mission.goal.name }, room, zone: zoneOf(ctx, room), gate, needs: [] });
  const tags = rng.shuffle(mission.goal.pool).slice(0, mission.goal.count);
  for (const tag of tags) {
    const provider = provideTag(ctx, tag, node, 0);
    if (!provider) return null;
    node.needs.push({ tag, via: 'socket', provider: provider.id, sign: `Ett av festene lyser og venter på ${ctx.content.tagById.get(tag).label}.` });
  }
  return node;
}

function makeGoal(ctx, lastGate) {
  const { mission, map, rng } = ctx;
  const endZone = lastGate;
  if (mission.type === 'FINN') return addNode(ctx, { kind: 'goal', card: { name: mission.goal.name }, room: map.end, zone: endZone, needs: [] });
  if (mission.type === 'KOM_UT') return addNode(ctx, { kind: 'exit', card: { name: mission.goal.name }, room: map.end, zone: endZone, needs: [] });
  if (mission.type === 'SAMLE') return addNode(ctx, { kind: 'exit', card: { name: `Rommet bak ${mission.goal.name.toLowerCase()}` }, room: map.end, zone: endZone, needs: [] });
  if (mission.type === 'LEVER') {
    const node = addNode(ctx, { kind: 'deliver', card: { name: mission.goal.name }, room: map.end, zone: endZone, needs: [], deliverTo: map.start });
    node.item = { specificId: 'DELIVERY', name: 'den mistede tingen zombien skal levere', tags: [], consumable: true };
    return node;
  }
  if (mission.type === 'REDD') {
    const node = addNode(ctx, { kind: 'target', card: { name: mission.goal.name }, room: map.end, zone: endZone, needs: [] });
    const tag = rng.pick(mission.goal.calm);
    const provider = provideTag(ctx, tag, node, 0);
    if (!provider) return null;
    node.needs.push({ tag, via: 'calm', provider: provider.id, sign: `${mission.goal.name} slapper av når den kjenner ${ctx.content.tagById.get(tag).label}.` });
    return node;
  }
  return null;
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
      if (pay) { node.needs.push({ tag: payTag, via: 'trade', provider: pay.id }); return node; }
    }
    return null;
  }

  if (type === 'BELONNING') {
    const quest = rng.pick(content.figures.filter((f) => isUsableQuest(ctx, f, tag)));
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
    const filled = { specificId: null, name: source.requires === 'BEHOLDER' ? `beholder med ${content.tagById.get(tag).label}` : `${content.tagById.get(tag).label} fra ${source.name.toLowerCase()}`, tags: [tag], consumable: true };
    const node = addNode(ctx, { kind: 'source', sourceType: type, card: source, item: filled, provides: tag, consumer: consumer.id, room: room.id, zone: room.zone, needs: [] });
    if (source.requires) {
      ctx.budget -= 1;
      const tool = provideTag(ctx, source.requires, node, depth + 1, { containerOnly: source.requires === 'BEHOLDER' });
      if (!tool) return null;
      node.needs.push({ tag: source.requires, via: source.requires === 'BEHOLDER' ? 'fill' : 'tool', provider: tool.id });
    }
    return node;
  }

  if (type === 'OPPSKRIFT') {
    const recipe = rng.pick(content.recipes.filter((r) => r.output.tags.includes(tag) && r.inputs.every((id) => !ctx.usedItems.has(id))));
    if (!recipe) return null;
    ctx.usedRecipe = true; ctx.budget -= 1; markType(ctx, type);
    const node = addNode(ctx, { kind: 'recipe', sourceType: type, card: recipe, item: { specificId: null, name: recipe.output.name, tags: recipe.output.tags, consumable: recipe.output.consumable }, provides: tag, consumer: consumer.id, room: null, zone: consumer.zone, needs: [] });
    for (const id of recipe.inputs) {
      const item = content.itemById.get(id);
      const ingredient = provideSpecific(ctx, { ...itemInstance(item), specificId: id }, node, depth + 1, { onlyPlaced: true });
      if (!ingredient) return null;
      ctx.usedItems.add(id);
      node.needs.push({ specific: id, name: item.name, via: 'ingredient', provider: ingredient.id });
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
      const quest = quests.length && rng.pick(quests);
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
  const chainable = wants.filter((w) => (w.type === 'MISTET')
    || (w.type === 'SORT' && w.tags.some((t) => isCarryTag(content, t)))
    || (w.type === 'GJORE' && (w.needs || []).some((t) => isCarryTag(content, t))));
  if (nestedOk) {
    for (const w of chainable) {
      if (w.type === 'MISTET') {
        const lost = provideSpecific(ctx, { specificId: `LOST:${figure.id}`, name: w.what, tags: [], consumable: true }, node, depth + 1, { onlyPlaced: true });
        if (lost) { node.needs.push({ specific: `LOST:${figure.id}`, name: w.what, via: 'lost', provider: lost.id }); return true; }
        continue;
      }
      const tags = (w.type === 'SORT' ? w.tags : w.needs).filter((t) => isCarryTag(content, t));
      for (const t of rng.shuffle(tags)) {
        const p = provideTag(ctx, t, node, depth + 1);
        if (p) { node.needs.push({ tag: t, via: w.type === 'SORT' ? 'wants' : 'task', provider: p.id, task: w.task }); return true; }
      }
    }
  }
  const local = wants.find((w) => !chainable.includes(w));
  if (local) { node.needs.push({ local: true, via: w2via(local), task: local.task || (local.tags || []).map((t) => content.tagById.get(t).label).join(' / ') }); return true; }
  return false;
}
const w2via = (w) => ({ VITE: 'vite', KAMP: 'kamp', GJORE: 'gjore', SORT: 'handling' }[w.type] || 'lokal');

function itemInstance(item) {
  return { specificId: null, cardId: item.id, name: item.name, tags: item.tags, consumable: item.consumable !== false };
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
    run.alternatives.push({ for: node.id, tag, item: item.name, room: room.id, zone: room.zone });
  }
}

function addAmbient(ctx, run) {
  const { content, rng } = ctx;
  const free = ctx.map.rooms.filter((r) => !ctx.occupied.has(r.id));
  const figures = rng.shuffle(content.figures.filter((f) => !ctx.usedFigures.has(f.id)));
  for (const room of free) {
    if (rng() < 0.55 && figures.length) run.ambient.push({ room: room.id, zone: room.zone, figure: figures.pop() });
  }
}
