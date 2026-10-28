// Table rules for the DM page: what happens when the DM accepts, resolves or meets a need.
// No DOM and no storage, so the same code runs in the browser and in tests/v2/table-play.test.mjs.
// Every function takes `t = { content, run, state }` and changes `t.state` in place.
import { reachable } from '../tools/runsim/map.mjs';

export function freshState(run) {
  return { here: run.map.start, visited: [run.map.start], done: [], openGates: [], inventory: [], companions: [], log: ['Eventyret begynner ved inngangen.'] };
}

const log = (t, text) => t.state.log.push(text);
export const label = (t, tag) => t.content.tagById.get(tag)?.label || tag;
export const nodeById = (t, id) => t.run.nodes.find((n) => n.id === id);
export const isDone = (t, key) => t.state.done.includes(key);
export const reach = (t) => reachable(t.run.map, { openGates: new Set(t.state.openGates) });

// Whether giving this thing uses it up. Things made or filled in this run (a recipe, a bucket of water)
// are not item cards, so the run is asked first.
export function consumableByName(t, name) {
  const fromRun = t.run.nodes.find((n) => n.item?.name === name)?.item;
  if (fromRun) return fromRun.consumable !== false;
  const card = t.content.items.find((i) => i.name === name);
  return card ? card.consumable !== false : true;
}

export function thingName(t, id) {
  if (id.startsWith('alt:')) return t.run.alternatives.find((a) => `alt:${a.room}` === id)?.item;
  if (id.startsWith('amb:')) return t.run.ambient.find((a) => `amb:${a.room}` === id)?.figure.name;
  const n = nodeById(t, id);
  return n?.kind === 'item' ? n.item.name : n?.card.name;
}

// ---------- needs one at a time ----------
// A goal or machine with several needs (free the dragon, then calm it; three sockets) can be met
// step by step. Met needs are stored per node; the node resolves when the last one is met.
export const metOf = (t, node) => t.state.needsMet?.[node.id] || [];
export const openNeeds = (t, node) => node.needs.map((n, i) => i).filter((i) => !node.needs[i].local && !metOf(t, node).includes(i));

// Tags of something in the backpack, looked up by name in this run and in the item cards.
function tagsOfName(t, name) {
  const fromRun = t.run.nodes.find((n) => n.item?.name === name)?.item?.tags;
  return fromRun || t.content.items.find((i) => i.name === name)?.tags || [];
}

// Which open need a given thing or friend answers. Falls back to the first open need: the DM already said it works.
export function needFor(t, node, { given, friend }) {
  const open = openNeeds(t, node);
  const fits = (i) => {
    const need = node.needs[i];
    const p = need.provider && nodeById(t, need.provider);
    if (given) return p?.item?.name === given || (need.tag && tagsOfName(t, given).includes(need.tag));
    if (friend) { const f = t.run.nodes.find((n) => n.kind === 'companion' && n.card.name === friend); return !!(need.tag && f?.ability.includes(need.tag)); }
    return false;
  };
  return open.find(fits) ?? open[0];
}

// `handedOver`: the child already gave the thing from the iPad (acceptThing removed it).
export function markNeed(t, node, i, { improvised = false, handedOver = false } = {}) {
  if (isDone(t, node.id) || metOf(t, node).includes(i)) return;
  if (!handedOver) spendNeed(t, node.needs[i]);
  t.state.needsMet = { ...(t.state.needsMet || {}), [node.id]: [...metOf(t, node), i] };
  if (!openNeeds(t, node).length) { resolve(t, node, { improvised }); return; }
  const need = node.needs[i];
  log(t, `${node.card.name}: ${need.specific ? need.name : label(t, need.tag)} er på plass. ${openNeeds(t, node).length} igjen.${improvised ? ' (Forteller bestemte)' : ''}`);
}

// A request from the iPad the DM said yes to: take a thing, give a thing, or let a friend help.
export function acceptThing(t, id, { given, friend } = {}) {
  if (isDone(t, id)) return;
  if (given) {
    const i = t.state.inventory.indexOf(given);
    if (i >= 0 && consumableByName(t, given)) t.state.inventory.splice(i, 1);
  }
  if (id.startsWith('alt:')) {
    const a = t.run.alternatives.find((x) => `alt:${x.room}` === id);
    t.state.inventory.push(a.item); t.state.done.push(id); log(t, `Tok ${a.item}.`); return;
  }
  if (id.startsWith('amb:')) { t.state.done.push(id); log(t, `${thingName(t, id)} er fornøyd.`); return; }
  const node = nodeById(t, id);
  // What the child gave or which friend helped always counts as one need, already handed over.
  // Resolving straight away would spend the planned item again: two of a kind would both disappear.
  if (openNeeds(t, node).length && (given || friend || openNeeds(t, node).length > 1)) {
    markNeed(t, node, needFor(t, node, { given, friend }), { handedOver: !!given });
    return;
  }
  resolve(t, node);
}

// ---------- actions ----------

function spendFor(t, node) {
  node.needs.forEach((need, index) => { if (!metOf(t, node).includes(index)) spendNeed(t, need); }); // met earlier: already handed over
}

// Removes what one need used up. Ingredients always go into what is made; a filled container is emptied.
function spendNeed(t, need) {
  if (!need.provider) return;
  const p = nodeById(t, need.provider);
  if (p?.kind === 'companion' || need.via === 'tool') return;
  const i = t.state.inventory.indexOf(p?.item?.name);
  if (i >= 0 && (p.item.consumable || need.via === 'fill' || need.via === 'ingredient')) t.state.inventory.splice(i, 1);
}

export function resolve(t, node, { improvised = false } = {}) {
  if (!node || isDone(t, node.id)) return; // a second tap on the iPad must not give twice
  const { state } = t;
  const note = improvised ? ' (Forteller bestemte)' : '';
  spendFor(t, node);
  if (['blocker', 'lock', 'machine'].includes(node.kind)) { state.openGates.push(node.gate); log(t, `${node.card.name} er løst – veien videre er åpen.${note}`); }
  else if (node.kind === 'companion') { state.companions.push(node.card.name); log(t, `${node.card.name} ble med!${note}`); }
  else if (node.kind === 'target') { state.companions.push(node.card.name); state.say = `${node.card.name} følger med deg. Ta den trygt med hjem!`; log(t, `${node.card.name} er rolig og følger med hjem.${note}`); }
  else if (['goal', 'exit'].includes(node.kind)) { state.say = `Du klarte det! ${node.card.name}! 🎉`; log(t, `Dere nådde ${node.card.name}! 🎉${note}`); }
  else if (node.kind === 'deliver') { state.inventory.push(node.item.name); log(t, `Fant ${node.item.name}.${note}`); }
  else if (node.item) { state.inventory.push(node.item.name); log(t, `${node.kind === 'item' ? 'Tok' : 'Fikk'} ${node.item.name}${node.kind === 'item' ? '' : ` (${node.card.name})`}.${note}`); }
  state.done.push(node.id);
}

// Moving only works into reachable rooms; otherwise the DM just looks at the room.
export function goTo(t, roomId) {
  const { state } = t;
  state.selected = roomId;
  if (!reach(t).has(roomId)) return;
  state.here = roomId;
  if (!state.visited.includes(roomId)) { state.visited.push(roomId); log(t, `Gikk inn i rom ${roomId}.`); }
}
