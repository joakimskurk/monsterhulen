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
let runs = 0, actions = 0, stepwise = 0, tingRuns = 0, tingGiven = 0, altRuns = 0, altUsed = 0, friendRuns = 0, friendHelped = 0;
// A friend from the hero book: a companion figure with its ability, as recordRun stores it.
const FRIENDS = content.figures.filter((f) => (f.roles || []).includes('companion')).map((f) => ({ name: f.name, ability: f.gives.ability }));
const LASTING = content.items.filter((i) => i.persistent).map((i) => ({ id: i.id, name: i.name, tags: i.tags }));

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
// `withTing`: the child gives the lasting TING brought from the hero book; it is never used up,
// and the item planned for this need stays in the backpack.
function act(t, node, need, where, { byButton = false, withTing = null } = {}) {
  const before = t.state.inventory.slice();
  const i = node.needs.indexOf(need);
  const several = need && !['recipe', 'source', 'item'].includes(node.kind) && table.openNeeds(t, node).length > 1;
  const finishes = !need || table.openNeeds(t, node).length === 1;
  const expected = withTing
    ? [...before, ...(finishes && node.item && !['target', 'goal', 'exit'].includes(node.kind) ? [node.item.name] : [])]
    : expectedAfter(t, node, need ? [i] : table.openNeeds(t, node), before);
  const p = need?.provider && table.nodeById(t, need.provider);
  if (withTing) table.acceptThing(t, node.id, { given: withTing });
  else if (!need || ['recipe', 'source', 'item'].includes(node.kind)) table.resolve(t, node);
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

// The extra things a run lays out (run.alternatives) are taken when reachable and given to the blocker
// they are for as soon as it is reachable, before its planned solution. The planned items stay unused.
function useExtras(t, rooms, where) {
  let progress = false;
  for (const a of t.run.alternatives) {
    const key = `alt:${a.room}`;
    if (!table.isDone(t, key) && rooms.has(a.room)) {
      table.goTo(t, a.room);
      const before = t.state.inventory.slice();
      table.acceptThing(t, key);
      assert.ok(sameBag(t.state.inventory, [...before, a.item]), `${where}: taking the extra ${a.item}`);
      progress = true;
    }
    const blocker = table.nodeById(t, a.for);
    if (table.isDone(t, key) && !table.isDone(t, blocker.id) && rooms.has(blocker.room) && t.state.inventory.includes(a.item)) {
      table.goTo(t, blocker.room);
      const before = t.state.inventory.slice();
      const expected = before.slice();
      if (table.consumableByName(t, a.item)) expected.splice(expected.indexOf(a.item), 1);
      table.acceptThing(t, blocker.id, { given: a.item });
      actions++; altUsed++;
      assert.ok(table.isDone(t, blocker.id), `${where}: ${blocker.card.name} not solved by the extra ${a.item}`);
      assert.ok(sameBag(t.state.inventory, expected), `${where}: backpack after giving the extra ${a.item} is [${t.state.inventory}], expected [${expected}]`);
      progress = true;
    }
  }
  return progress;
}

// A brought friend helps with a need that fits its ability. Nothing in the backpack is used up.
function helpWithFriend(t, node, need, friend, where) {
  const before = t.state.inventory.slice();
  const finishes = table.openNeeds(t, node).length === 1;
  const gained = finishes && node.item && !['target', 'goal', 'exit'].includes(node.kind) ? [node.item.name] : [];
  table.acceptThing(t, node.id, { friend: friend.name });
  actions++;
  const name = node.card.name || node.item?.name;
  assert.ok(sameBag(t.state.inventory, [...before, ...gained]), `${where}: backpack after ${friend.name} helped ${name} is [${t.state.inventory}], expected [${[...before, ...gained]}]`);
  assert.ok(table.metOf(t, node).includes(node.needs.indexOf(need)) || table.isDone(t, node.id), `${where}: ${friend.name}'s help with ${name} not recorded`);
}

// A need is ready when its provider is done and what it gave is still there (or the friend has joined).
function ready(t, node, need) {
  if (need.local) return true;
  const p = table.nodeById(t, need.provider);
  if (!table.isDone(t, p.id)) return false;
  return p.kind === 'companion' ? t.state.companions.includes(p.card.name) : t.state.inventory.includes(p.item.name);
}

function playByTheRules(run, where, { byButton, ting = null, friend = null, useAlternatives = false }) {
  const t = { content, run, state: table.freshState(run) };
  if (ting || friend) table.bring(t, { ting, friend });
  let tingUsed = 0;
  for (let guard = 0; guard < 300; guard++) {
    let progress = false;
    const rooms = table.reach(t);
    // «Alt annet som passer, virker også»: take the extra things that lie around and use them first.
    if (useAlternatives) progress = useExtras(t, rooms, where) || progress;
    for (const node of run.nodes) {
      if (table.isDone(t, node.id) || (node.room !== null && !rooms.has(node.room))) continue;
      if (node.room !== null) table.goTo(t, node.room);
      if (node.kind === 'item') { act(t, node, null, where); progress = true; continue; }
      const open = table.openNeeds(t, node).map((i) => node.needs[i]);
      if (!open.every((need) => ready(t, node, need))) continue;
      // Recipes ("Lag den") and sources ("Hentet") are one press on the DM page, whatever they need.
      if (!open.length || ['recipe', 'source'].includes(node.kind)) { act(t, node, null, where); progress = true; continue; }
      for (const need of open) {
        const fits = ting && table.broughtFits(t, need).includes(ting.name) && !['recipe', 'source'].includes(node.kind);
        if (fits) tingUsed++;
        if (!fits && friend && table.broughtFits(t, need).includes(friend.name) && !['recipe', 'source'].includes(node.kind) && !table.isDone(t, node.id)) {
          friendHelped++;
          helpWithFriend(t, node, need, friend, where);
          continue;
        }
        if (table.isDone(t, node.id)) continue;
        act(t, node, need, where, { byButton, withTing: fits ? ting.name : null });
      }
      assert.ok(table.isDone(t, node.id), `${where}: ${node.card.name} not done after all needs were met`);
      progress = true;
    }
    if (!progress) break;
  }
  const stuck = run.nodes.filter((n) => !table.isDone(t, n.id)).map((n) => n.card.name);
  assert.deepEqual(stuck, [], `${where}: not finished by the table rules: ${stuck.join(', ')}`);
  const goal = run.nodes.find((n) => GOALS.includes(n.kind));
  // The end of the run (workshop B1): rescuing and delivering also means coming home.
  if (['target', 'deliver'].includes(goal.kind) && t.state.here !== run.map.start) assert.ok(!table.isFinished(t), `${where}: finished before coming home`);
  table.goTo(t, run.map.start);
  assert.ok(table.isFinished(t), `${where}: not finished at the entrance with the goal done`);
  const s = table.summary(t);
  const text = JSON.stringify(s);
  assert.ok(s.headline && !/undefined|null/.test(s.headline), `${where}: bad headline ${s.headline}`);
  assert.ok(!/LIKEVEL|Forteller|Garantert/.test(text), `${where}: DM wording in the summary`);
  for (const f of s.friends) assert.ok(t.state.companions.includes(f.name) && f.ability.length, `${where}: friend ${f.name} in summary but not with us`);
  if (ting) {
    assert.ok(t.state.inventory.includes(ting.name), `${where}: the lasting TING ${ting.name} was used up`);
    tingRuns++; tingGiven += tingUsed;
  }
  if (friend) assert.ok(t.state.companions.includes(friend.name), `${where}: the brought friend left`);
  if (useAlternatives) altRuns++;
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
      // Again with a lasting TING brought along (workshop B4): it may be given where it fits, and stays.
      playByTheRules(run, `${where} +TING`, { byButton: seed % 2 === 1, ting: LASTING[seed % LASTING.length] });
      // Again using the extra things that lie around (when the run has any).
      if (run.alternatives.length) playByTheRules(run, `${where} +EKSTRA`, { byButton: false, useAlternatives: true });
      // Again with a friend from the hero book who fits some need in this run (workshop B4).
      const needTags = new Set(run.nodes.flatMap((n) => n.needs.map((x) => x.tag)).filter(Boolean));
      const usedNames = new Set(run.nodes.map((n) => n.card?.name));
      const friend = FRIENDS.filter((f) => !usedNames.has(f.name) && f.ability.some((a) => needTags.has(a)))[seed % 3];
      if (friend) { friendRuns++; playByTheRules(run, `${where} +VENN`, { byButton: false, friend }); }
      playByOverride(run, where);
      runs++;
    }
  }
}
assert.ok(stepwise > 0, 'no node with several needs was played step by step');
assert.ok(tingGiven > 0, 'a brought TING was never given where it fits');
assert.ok(altUsed > 0, 'no extra thing was ever used');
assert.ok(friendHelped > 0, 'a brought friend never helped');
console.log(`table play test: ${runs} runs (+${tingRuns} with a brought TING, given ${tingGiven} times; +${altRuns} using ${altUsed} extra things; +${friendRuns} with a brought friend, helped ${friendHelped} times), ${actions} actions (${stepwise} one need at a time), backpack exact, end and summary right, GI LIKEVEL finishes, OK`);
