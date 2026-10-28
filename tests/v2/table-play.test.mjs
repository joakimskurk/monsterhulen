// Plays generated runs through the DM page's table rules (prototype/table.mjs), the way a DM does at
// the table: take what lies there, accept what the child gives (one need at a time when there are
// several), let friends help, make recipes. After every action the backpack must be exactly right.
// A second pass resolves everything with GI LIKEVEL and must also finish.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import { playerView } from '../../prototype/player-view.mjs';
import * as table from '../../prototype/table.mjs';

const content = loadContent();
const SEEDS = Number(process.env.TABLE_SEEDS || 25);
const GOALS = ['goal', 'exit', 'deliver', 'target'];
let runs = 0, actions = 0, stepwise = 0;

const count = (list) => list.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
const sameBag = (a, b) => JSON.stringify([...count(a)].sort()) === JSON.stringify([...count(b)].sort());

// What the backpack must look like after `node` is resolved (or one need is met), from the run alone.
function expectedAfter(t, node, needIndexes, before) {
  const bag = before.slice();
  for (const i of needIndexes) {
    const need = node.needs[i];
    if (!need.provider) continue;
    const p = table.nodeById(t, need.provider);
    if (p.kind === 'companion' || need.via === 'tool') continue;
    if (p.item.consumable || need.via === 'fill' || need.via === 'ingredient') bag.splice(bag.indexOf(p.item.name), 1);
  }
  const finished = needIndexes.length === table.openNeeds(t, node).length;
  if (finished && node.item && !['target', 'goal', 'exit'].includes(node.kind)) bag.push(node.item.name);
  return bag;
}

// One accepted action, as the DM page does it: GIVE / FRIEND go through acceptThing, the rest through resolve.
// `byButton`: the DM presses «Denne er på plass» for the need instead of accepting it from the iPad.
function act(t, node, need, where, { byButton = false } = {}) {
  const before = t.state.inventory.slice();
  const i = node.needs.indexOf(need);
  const several = need && !['recipe', 'source', 'item'].includes(node.kind) && table.openNeeds(t, node).length > 1;
  const expected = expectedAfter(t, node, need ? [i] : table.openNeeds(t, node), before);
  const p = need?.provider && table.nodeById(t, need.provider);
  if (!need || ['recipe', 'source', 'item'].includes(node.kind)) table.resolve(t, node);
  else if (byButton && several) table.markNeed(t, node, i);
  else if (p.kind === 'companion') table.acceptThing(t, node.id, { friend: p.card.name });
  else table.acceptThing(t, node.id, { given: p.item.name });
  actions++;
  const name = node.card.name || node.item?.name;
  assert.ok(sameBag(t.state.inventory, expected), `${where}: backpack after ${name} is [${t.state.inventory}], expected [${expected}]`);
  if (several) {
    stepwise++;
    assert.ok(!table.isDone(t, node.id), `${where}: ${name} resolved after only one of several needs`);
    assert.ok(table.metOf(t, node).includes(i), `${where}: need ${i} of ${name} not recorded`);
    const text = playerView(t.run, { ...t.state, runCode: 'X' }).room.things.find((th) => th.id === node.id)?.text || '';
    if (node.room === t.state.here) assert.match(text, /\d av \d er på plass/, `${where}: iPad shows no progress for ${name}`);
  }
  // A second tap from the iPad must change nothing once the node is done.
  if (table.isDone(t, node.id)) {
    const snapshot = JSON.stringify(t.state);
    table.acceptThing(t, node.id, p ? (p.kind === 'companion' ? { friend: p.card.name } : { given: p.item.name }) : {});
    assert.equal(JSON.stringify(t.state), snapshot, `${where}: second tap on the iPad for ${name} changed the state`);
    table.resolve(t, node);
    assert.equal(JSON.stringify(t.state), snapshot, `${where}: second press on the DM button for ${name} changed the state`);
  }
}

// A need is ready when its provider is done and what it gave is still there (or the friend has joined).
function ready(t, node, need) {
  if (need.local) return true;
  const p = table.nodeById(t, need.provider);
  if (!table.isDone(t, p.id)) return false;
  return p.kind === 'companion' ? t.state.companions.includes(p.card.name) : t.state.inventory.includes(p.item.name);
}

function playByTheRules(run, where, { byButton }) {
  const t = { content, run, state: table.freshState(run) };
  for (let guard = 0; guard < 300; guard++) {
    let progress = false;
    const rooms = table.reach(t);
    for (const node of run.nodes) {
      if (table.isDone(t, node.id) || (node.room !== null && !rooms.has(node.room))) continue;
      if (node.room !== null) table.goTo(t, node.room);
      if (node.kind === 'item') { act(t, node, null, where); progress = true; continue; }
      const open = table.openNeeds(t, node).map((i) => node.needs[i]);
      if (!open.every((need) => ready(t, node, need))) continue;
      // Recipes ("Lag den") and sources ("Hentet") are one press on the DM page, whatever they need.
      if (!open.length || ['recipe', 'source'].includes(node.kind)) { act(t, node, null, where); progress = true; continue; }
      for (const need of open) act(t, node, need, where, { byButton });
      assert.ok(table.isDone(t, node.id), `${where}: ${node.card.name} not done after all needs were met`);
      progress = true;
    }
    if (!progress) break;
  }
  const stuck = run.nodes.filter((n) => !table.isDone(t, n.id)).map((n) => n.card.name);
  assert.deepEqual(stuck, [], `${where}: not finished by the table rules: ${stuck.join(', ')}`);
  const goal = run.nodes.find((n) => GOALS.includes(n.kind));
  if (goal.kind === 'deliver') assert.ok(t.state.inventory.includes(goal.item.name), `${where}: the thing to deliver is not in the backpack`);
  if (goal.kind === 'target') assert.ok(t.state.companions.includes(goal.card.name), `${where}: the rescued one is not following`);
  assert.ok(table.reach(t).has(run.map.start), `${where}: cannot get back to the entrance`);
}

// GI LIKEVEL on everything, in an order the map allows: the DM can always finish a run.
function playByOverride(run, where) {
  const t = { content, run, state: table.freshState(run) };
  for (let guard = 0; guard < 300 && run.nodes.some((n) => !table.isDone(t, n.id)); guard++) {
    const rooms = table.reach(t);
    for (const node of run.nodes) if (!table.isDone(t, node.id) && (node.room === null || rooms.has(node.room))) table.resolve(t, node, { improvised: true });
  }
  assert.ok(run.nodes.every((n) => table.isDone(t, n.id)), `${where}: GI LIKEVEL could not finish the run`);
  assert.ok(t.state.log.some((l) => l.includes('(Forteller bestemte)')), `${where}: override not logged`);
}

for (const missionId of missionIds(content)) {
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= SEEDS; seed++) {
      const { run } = acceptedRun(content, missionId, seed, length);
      const where = `${missionId}/${length}/${seed}`;
      // Odd seeds: needs accepted from the iPad. Even seeds: the DM presses «Denne er på plass».
      playByTheRules(run, where, { byButton: seed % 2 === 0 });
      playByOverride(run, where);
      runs++;
    }
  }
}
assert.ok(stepwise > 0, 'no node with several needs was played step by step');
console.log(`table play test: ${runs} runs, ${actions} actions (${stepwise} one need at a time), backpack exact, GI LIKEVEL finishes, OK`);
