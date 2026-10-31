// Playthrough automaton (docs/v2/SYSTEM_DESIGN_V2.md §4.2).
// Plays a generated run like a sensible child would, using only guaranteed providers:
// no alternatives, no ambient figures, no DM override, no lucky dice.
// A provider bound to one consumer is never spent on another.
// Returns { ok, steps[], reason }.
import { rejectedFor } from '../lib/fits.mjs';
import { reachable } from './map.mjs';

export function playthrough(run) {
  const { map, nodes } = run;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const openGates = new Set();
  const done = new Set();
  const inventory = [];          // { ...item, boundTo }
  const abilities = new Set();   // companion abilities, never used up
  const steps = [];
  let follower = false;

  const reach = () => reachable(map, { openGates });
  const fits = (it, consumer) => it.boundTo === consumer.id || it.boundTo === null;

  // Finds an inventory slot (or ability) for every need of `node`, never using one item twice.
  // Spends consumables only if all needs can be met.
  const takeAll = (node) => {
    const reserved = new Set();
    const spend = [];
    for (const need of node.needs) {
      if (need.local) continue;
      const match = (it, i) => !reserved.has(i) && fits(it, node)
        && (need.specific ? it.specificId === need.specific : it.tags.includes(need.tag) && !rejectedFor(node.card, need.tag, it.cardId));
      // Prefer the item that was planned for this consumer.
      let i = inventory.findIndex((it, j) => match(it, j) && it.boundTo === node.id);
      if (i < 0) i = inventory.findIndex(match);
      if (i >= 0) {
        reserved.add(i);
        if (need.specific || (need.via !== 'tool' && inventory[i].consumable)) spend.push(i);
        continue;
      }
      if (!need.specific && need.via !== 'fill' && abilities.has(need.tag)) continue;
      return false;
    }
    spend.sort((a, b) => b - a).forEach((i) => inventory.splice(i, 1));
    return true;
  };
  const give = (node) => inventory.push({ ...node.item, boundTo: node.consumer ?? null });

  for (let guard = 0; guard < 500; guard++) {
    let progress = false;
    const rooms = reach();
    for (const node of nodes) {
      if (done.has(node.id)) continue;
      const here = node.room === null || rooms.has(node.room);
      if (!here) continue;
      switch (node.kind) {
        case 'item':
          give(node); done.add(node.id); progress = true;
          steps.push(`Rom ${node.room}: ${node.hidden ? 'fant gjemt' : 'tok'} ${node.item.name}`);
          break;
        case 'recipe':
        case 'source':
        case 'trader':
        case 'quest':
          if (takeAll(node)) {
            give(node); done.add(node.id); progress = true;
            steps.push(`${label(node)} → ${node.item.name}`);
          }
          break;
        case 'companion':
          if (takeAll(node)) {
            node.ability.forEach((a) => abilities.add(a)); done.add(node.id); progress = true;
            steps.push(`${node.card.name} ble med (kan: ${node.ability.join(', ')})`);
          }
          break;
        case 'blocker':
        case 'lock':
        case 'machine':
          if (takeAll(node)) {
            openGates.add(node.gate); done.add(node.id); progress = true;
            steps.push(`${node.card.name} er løst → sone ${node.gate} åpen`);
          }
          break;
        case 'target':
          if (takeAll(node)) { follower = true; done.add(node.id); progress = true; steps.push(`${node.card.name} er rolig og følger med`); }
          break;
        case 'goal':
        case 'exit':
          // A chest goal has needs (its opener); a plain goal has none.
          if (takeAll(node)) { done.add(node.id); progress = true; steps.push(`Nådde ${node.card.name}`); }
          break;
        case 'deliver':
          // The place may need something first (a high nest, a deep well).
          if (takeAll(node)) { inventory.push({ ...node.item, boundTo: null }); done.add(node.id); progress = true; steps.push(`Fant ${node.item.name}`); }
          break;
        default:
          throw new Error(`unknown node kind ${node.kind}`);
      }
    }
    if (!progress) break;
  }

  const goal = nodes.find((n) => ['goal', 'exit', 'deliver', 'target'].includes(n.kind));
  const backHome = reach().has(map.start);
  let ok = done.has(goal.id);
  if (goal.kind === 'target') ok = ok && follower && backHome;
  if (goal.kind === 'deliver') ok = ok && inventory.some((it) => it.specificId === 'DELIVERY') && backHome;
  if (ok && goal.kind !== 'exit' && goal.kind !== 'goal') steps.push('Tilbake ved inngangen');
  const stuck = nodes.filter((n) => !done.has(n.id)).map((n) => `${n.id}:${label(n)}`);
  return { ok, steps, reason: ok ? null : `stuck: ${stuck.join(', ')}` };
}

// With every secret door and loop open but all gates closed, nothing beyond zone 0 may be reachable.
export function bypassCheck(run) {
  const rooms = reachable(run.map, { secrets: true });
  const leaked = [...rooms].filter((id) => run.map.rooms[id].zone > 0);
  return { ok: leaked.length === 0, leaked };
}

export function label(node) {
  const where = node.room === null ? '' : ` (rom ${node.room})`;
  const name = node.kind === 'recipe' ? `Laget av ${node.needs.map((n) => n.name).join(' + ')}` : node.card.name;
  return `${name}${where}`;
}
