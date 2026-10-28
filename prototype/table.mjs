// Table rules for the DM page: what happens when the DM accepts, resolves or meets a need.
// No DOM and no storage, so the same code runs in the browser and in tests/v2/table-play.test.mjs.
// Every function takes `t = { content, run, state }` and changes `t.state` in place.
import { reachable } from '../tools/runsim/map.mjs';
import { rejectedFor } from '../tools/lib/fits.mjs';

export function freshState(run) {
  return { here: run.map.start, visited: [run.map.start], done: [], openGates: [], passed: [], inventory: [], companions: [], log: ['Eventyret begynner ved inngangen.'] };
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
  if (card?.persistent) return false; // a lasting TING from the hero book is never used up
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
// True if a thing with this name has the tag and the figure does not reject it (lib/fits.mjs).
function tagFits(t, node, tag, name) {
  if (!tag || !tagsOfName(t, name).includes(tag)) return false;
  const id = t.run.nodes.find((n) => n.item?.name === name)?.item?.cardId || t.content.items.find((i) => i.name === name)?.id;
  return !rejectedFor(node.card, tag, id);
}

// Which open need a given thing or friend answers. Falls back to the first open need: the DM already said it works.
export function needFor(t, node, { given, friend }) {
  const open = openNeeds(t, node);
  const fits = (i) => {
    const need = node.needs[i];
    const p = need.provider && nodeById(t, need.provider);
    if (given) return p?.item?.name === given || tagFits(t, node, need.tag, given);
    if (friend) { const f = t.run.nodes.find((n) => n.kind === 'companion' && n.card.name === friend); return !!(need.tag && f?.ability.includes(need.tag)); }
    return false;
  };
  // The need it was planned for comes first: a torch planned for warmth must not use up the light
  // socket, which the light rod was planned for (deep round: the machine could not be finished).
  const planned = open.find((i) => { const p = node.needs[i].provider && nodeById(t, node.needs[i].provider); return given ? p?.item?.name === given : friend && p?.card?.name === friend; });
  return planned ?? open.find(fits) ?? open[0];
}

// `handedOver`: the child already gave the thing from the iPad (acceptThing removed it).
export function markNeed(t, node, i, { improvised = false, handedOver = false } = {}) {
  if (isDone(t, node.id) || metOf(t, node).includes(i)) return;
  if (!handedOver) spendNeed(t, node.needs[i]);
  t.state.needsMet = { ...(t.state.needsMet || {}), [node.id]: [...metOf(t, node), i] };
  if (!openNeeds(t, node).length) { resolve(t, node, { improvised }); return; }
  const need = node.needs[i];
  log(t, `${node.card.name}: ${need.local ? need.task : need.specific ? need.name : label(t, need.tag)} er på plass. ${openNeeds(t, node).length} igjen.${improvised ? ' (Forteller bestemte)' : ''}`);
}

// True if the `name` in the backpack is the planned answer to an open need somewhere other than `id`,
// and there is no spare one. Giving it where it was planned always uses it up.
function stillPlanned(t, name, id) {
  const plannedIn = (n) => openNeeds(t, n).filter((i) => {
    const p = nodeById(t, n.needs[i].provider);
    return p?.item?.name === name && isDone(t, p.id); // already in her hands, not one still to come
  }).length;
  const here = nodeById(t, id);
  if (here && plannedIn(here)) return false;
  const elsewhere = t.run.nodes.filter((n) => n.id !== id && !isDone(t, n.id)).reduce((sum, n) => sum + plannedIn(n), 0);
  return elsewhere > 0 && elsewhere >= t.state.inventory.filter((x) => x === name).length;
}

// A task to act out (a riddle, a race, being quiet): she says she has done it on the iPad, and the DM
// says yes. Never on its own: the DM saw it done at the table.
export function taskDone(t, id) {
  if (isDone(t, id)) return;
  if (id.startsWith('amb:')) { acceptThing(t, id); return; }
  const node = nodeById(t, id);
  node.needs.forEach((need, i) => { if (need.local && !metOf(t, node).includes(i)) markNeed(t, node, i, { handedOver: true }); });
  if (!isDone(t, id) && !openNeeds(t, node).length) resolve(t, node);
}

// A request from the iPad the DM said yes to: take a thing, give a thing, or let a friend help.
export function acceptThing(t, id, { given, friend } = {}) {
  if (isDone(t, id)) return;
  if (given) {
    const i = t.state.inventory.indexOf(given);
    // Never stranded (owner's playtest, the matrix check): a thing that fits here, but is still
    // planned for someone else, is lent and given back, so the one it was meant for can still get it.
    // Filled at a source or made into something: the container or ingredient goes into it.
    const into = !id.startsWith('alt:') && !id.startsWith('amb:') && ['source', 'recipe'].includes(nodeById(t, id)?.kind);
    if (i >= 0 && consumableByName(t, given) && !into && stillPlanned(t, given, id)) log(t, `${thingName(t, id)} får låne ${given.toLowerCase()} og gir den tilbake.`);
    else if (i >= 0 && (consumableByName(t, given) || into)) t.state.inventory.splice(i, 1);
  }
  if (id.startsWith('alt:')) {
    const a = t.run.alternatives.find((x) => `alt:${x.room}` === id);
    t.state.inventory.push(a.item); t.state.done.push(id); log(t, `Tok ${a.item}.`); return;
  }
  if (id.startsWith('amb:')) { t.state.done.push(id); log(t, `${thingName(t, id)} er fornøyd.`); return; }
  const node = nodeById(t, id);
  // What the child gave or which friend helped always counts as one need, already handed over.
  // Resolving straight away would spend the planned item again: two of a kind would both disappear.
  // When a friend helps, nothing from the backpack is used at all.
  if (openNeeds(t, node).length && (given || friend || openNeeds(t, node).length > 1)) {
    markNeed(t, node, needFor(t, node, { given, friend }), { handedOver: !!(given || friend) });
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
  else if (node.payoff) { state.say = `${node.payoff} 🎉`; log(t, `${node.card.name} virker! 🎉${note}`); }
  else if (node.treasure) { state.say = `Du fant ${node.treasure.name.toLowerCase()}! 🎉`; log(t, `Du fant ${node.treasure.name.toLowerCase()}! 🎉${note}`); }
  else if (['goal', 'exit'].includes(node.kind)) { state.say = `Du klarte det! ${node.card.name}! 🎉`; log(t, `Du kom fram til ${node.card.name.toLowerCase()}! 🎉${note}`); }
  else if (node.kind === 'deliver') { state.inventory.push(node.item.name); log(t, `Du fant ${node.item.name.toLowerCase()}.${note}`); }
  else if (node.item) { state.inventory.push(node.item.name); log(t, `${node.kind === 'item' ? 'Tok' : 'Fikk'} ${node.item.name}${node.kind === 'item' ? '' : ` (${node.card.name})`}.${note}`); }
  state.done.push(node.id);
}

// Moving only works into reachable rooms; otherwise the DM just looks at the room.
export function goTo(t, roomId) {
  const { state } = t;
  state.selected = roomId;
  if (!reach(t).has(roomId)) return;
  // The door she walks through opens and stays open (owner: «dører åpner ikke før man går inn»).
  const from = state.here;
  const door = t.run.map.edges.findIndex((e) => (e.a === from && e.b === roomId) || (e.b === from && e.a === roomId));
  if (door >= 0) { state.passed = state.passed || []; if (!state.passed.includes(door)) state.passed.push(door); }
  state.here = roomId;
  if (!state.visited.includes(roomId)) { state.visited.push(roomId); log(t, `Gikk inn i rom ${roomId}.`); }
}

// ---------- end of the run (workshop B1) ----------

const GOAL_KINDS = ['goal', 'exit', 'deliver', 'target'];
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);

// Done when the goal is reached; rescuing and delivering also means being back at the entrance.
export function isFinished(t) {
  const goal = t.run.nodes.find((n) => GOAL_KINDS.includes(n.kind));
  if (!isDone(t, goal.id)) return false;
  return !['target', 'deliver'].includes(goal.kind) || t.state.here === t.run.map.start;
}

// What the child did, for both screens. Short sentences; never anything about GI LIKEVEL.
export function summary(t) {
  const { run, state } = t;
  const goal = run.nodes.find((n) => GOAL_KINDS.includes(n.kind));
  const headline = {
    FINN: `Du fant ${lower(goal.card.name)}!`,
    REDD: `Du reddet ${lower(goal.card.name)}!`,
    LEVER: `Du brakte ${goal.item?.name} hjem!`,
    SAMLE: `Du fikk ${lower(goal.card.name)} i gang!`,
    KOM_UT: `Du fant veien ut: ${lower(goal.card.name)}!`,
  }[run.mission.type];
  const done = run.nodes.filter((n) => isDone(t, n.id));
  // The one who gave the quest says thank you at the end (it is the end of the story they started).
  const brought = state.brought || {};
  return {
    title: run.mission.name,
    headline: run.mission.payoff ? `${headline} ${run.mission.payoff}` : headline,
    helped: done.filter((n) => ['blocker', 'quest', 'trader'].includes(n.kind) && n.cardKind !== 'obstacle').map((n) => n.card.name),
    passed: done.filter((n) => n.cardKind === 'obstacle' || n.kind === 'lock' || n.kind === 'machine').map((n) => n.card.name),
    friends: done.filter((n) => n.kind === 'companion' && n.card.name !== brought.friend?.name).map((n) => ({ name: n.card.name, ability: n.ability })),
    found: done.filter((n) => n.kind === 'item').map((n) => n.item.name),
    rooms: state.visited.length,
  };
}

// ---------- bringing things from the hero book (workshop B4) ----------
// At most one friend and one TING. The run is proven without them; they are an extra way.
export function bring(t, { friend = null, ting = null }) {
  const { state } = t;
  state.brought = { ...(state.brought || {}) };
  if (friend && !state.brought.friend) { state.brought.friend = friend; state.companions.push(friend.name); log(t, `${friend.name} ble med fra Helteboka.`); }
  if (ting && !state.brought.ting) { state.brought.ting = ting; state.inventory.push(ting.name); log(t, `${ting.name} ble med fra Helteboka.`); }
}

// What was brought along that fits a need (same tag), for the DM card.
export function broughtFits(t, need) {
  const b = t.state.brought || {};
  if (!need.tag) return [];
  const card = t.run.nodes.find((n) => n.needs.includes(need))?.card;
  return [b.friend && b.friend.ability.includes(need.tag) ? b.friend.name : null, b.ting && b.ting.tags.includes(need.tag) && !rejectedFor(card, need.tag, b.ting.id) ? b.ting.name : null].filter(Boolean);
}

// ---------- what the child may do without the DM (owner, 2026-10-28) ----------
// Only what obviously works happens by itself; anything uncertain or creative still goes to the DM.

// True if the thing she gives (or the friend who helps) clearly answers an open need of this figure:
// the planned item, an item with a fitting tag, or a friend whose ability fits. Never for free encounters.
export function fits(t, id, { given, friend } = {}) {
  if (id.startsWith('alt:') || id.startsWith('amb:')) return false;
  const node = nodeById(t, id);
  if (!node || isDone(t, id)) return false;
  return openNeeds(t, node).some((i) => {
    const need = node.needs[i];
    const p = need.provider && nodeById(t, need.provider);
    if (given) return p?.item?.name === given || tagFits(t, node, need.tag, given) || (!!need.tag && t.state.brought?.ting?.name === given && t.state.brought.ting.tags.includes(need.tag) && !rejectedFor(node.card, need.tag, t.state.brought.ting.id));
    if (friend) {
      const f = t.run.nodes.find((n) => n.kind === 'companion' && n.card.name === friend);
      const ability = f?.ability || (t.state.brought?.friend?.name === friend ? t.state.brought.friend.ability : []);
      return !!need.tag && ability.includes(need.tag);
    }
    return false;
  });
}

// ---------- the die (as in the owner's original V0.12.3) ----------
// A physical D6 on the table; the child taps the same face on the iPad. 1–2 low, 3–4 mid, 5–6 high.
export const bandFor = (value) => (value <= 2 ? 'low' : value <= 4 ? 'mid' : 'high');
export const DICE_HINTS = {
  low: 'Noe går skeivt eller koster litt, men historien fortsetter. Vis gjerne en ny mulighet i det som gikk galt.',
  mid: 'Det virker, men med en liten kostnad, forsinkelse, lyd, valg eller ny komplikasjon.',
  high: 'Det virker skikkelig bra. Gi gjerne en liten ekstra fordel, nyttig informasjon eller en fin detalj.',
};

// Every roll gets a number never used before in this run, so the iPad can tell a new roll from one it
// already answered (restarting from 1 after each roll made the second search show no die).
const nextRollId = (t) => (t.state.rollCount = (t.state.rollCount || 0) + 1);
const hiddenHere = (t, room) => t.run.nodes.filter((n) => n.kind === 'item' && n.hidden && n.room === room && !isDone(t, n.id));

// ✓ on the child's map: she is done looking here, because she found what was hidden or there was
// nothing. Not after a low roll, which says «noe er gjemt her, prøv igjen» (owner: the ✓ came too early
// or too late); the 🔍 stays until she has found it.
export function markLooked(t, room) { t.state.looked = [...new Set([...(t.state.looked || []), room])]; }

// «SE DEG RUNDT»: if something is hidden here, the iPad asks for the die; otherwise she just looks.
export function search(t, room = t.state.here) {
  if (hiddenHere(t, room).length) {
    t.state.roll = { id: nextRollId(t), kind: 'search', room, text: 'Kast terningen for å lete!' };
    log(t, `Du leter i ${t.run.map.rooms[room].name}. Kast terningen!`);
    return true;
  }
  log(t, 'Du ser deg rundt, men finner ingenting.');
  markLooked(t, room);
  return false;
}

// The DM asks for a roll for something uncertain (a fight, a daring idea). The DM decides what happens.
export function askRoll(t, reason) {
  t.state.roll = { id: nextRollId(t), kind: 'dm', text: 'Kast terningen!', reason };
}

// The face she rolled. Searching is fail-forward as in the original: 3–6 finds it; 1–2 gives a clearer
// hint the first time, and the second try finds it anyway. A DM roll is recorded with a suggestion.
export function rolled(t, value) {
  const roll = t.state.roll;
  if (!roll || !(value >= 1 && value <= 6)) return null;
  const band = bandFor(value);
  t.state.roll = null;
  t.state.lastRoll = { value, band, reason: roll.reason || (roll.kind === 'search' ? 'leting' : '') };
  if (roll.kind === 'search') {
    t.state.searchTries = { ...(t.state.searchTries || {}), [roll.room]: ((t.state.searchTries || {})[roll.room] || 0) + 1 };
    const found = band !== 'low' || t.state.searchTries[roll.room] >= 2;
    if (found) { const n = hiddenHere(t, roll.room)[0]; t.state.say = null; if (n) resolve(t, n); if (!hiddenHere(t, roll.room).length) markLooked(t, roll.room); return { band, found: true }; }
    log(t, `Terningen viste ${value}. Du finner ingenting ennå, men noe er gjemt her. Prøv igjen!`);
    t.state.say = 'Noe er gjemt her … Prøv å se deg rundt én gang til!';
    return { band, found: false };
  }
  log(t, `Terningen viste ${value}${roll.reason ? ` (${roll.reason})` : ''}.`);
  return { band };
}
