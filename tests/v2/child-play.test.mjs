// The deep round (owner, 2026-10-28): every run played only through the child's iPad. It sees only the
// player view, does only what the iPad offers, and the table handles only what it would handle by
// itself: walking, taking, filling, giving what fits, a friend who fits, searching with the die. When
// nothing more can be done, the DM may only say yes to a task the iPad showed her (OPPGAVE, GJORT);
// anything else the DM would have to do is a failure, counted by kind. A run that the DM
// cannot finish with the steps allowed is a failure.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import { playerView } from '../../prototype/player-view.mjs';
import * as table from '../../prototype/table.mjs';
import { stuckHint } from '../../prototype/stuck.mjs';

const content = loadContent();
const SEEDS = Number(process.env.SEEDS || 25);
// The DM steps that belong to the DM by design: saying yes to a task she was shown and says she did.
const DM_OK = new Set(['task']);
const dmSteps = {}, stuck = [];
let runs = 0, childActions = 0, nudges = 0;

function play(content, run, where) {
  const t = { content, run, state: table.freshState(run) };
  const dm = (kind, node) => { dmSteps[kind] = (dmSteps[kind] || 0) + 1; table.resolve(t, node); };
  const neighbours = (room) => playerView(run, { ...t.state, here: room }).exits.filter((x) => !x.locked).map((x) => x.room);
  const walkTo = (to) => { // breadth first over the doors she can see, one MOVE at a time
    const prev = new Map([[t.state.here, null]]), queue = [t.state.here];
    while (queue.length) { const r = queue.shift(); for (const n of neighbours(r)) if (!prev.has(n)) { prev.set(n, r); queue.push(n); } }
    if (!prev.has(to)) return false;
    const path = []; for (let r = to; r !== t.state.here; r = prev.get(r)) path.unshift(r);
    for (const r of path) table.goTo(t, r);
    return true;
  };
  const reachable = () => { const seen = new Set([t.state.here]), q = [t.state.here]; while (q.length) for (const n of neighbours(q.shift())) if (!seen.has(n)) { seen.add(n); q.push(n); } return [...seen]; };
  // Everything she can do in the room she is in. True if anything changed.
  const actHere = () => {
    let did = false;
    for (let guard = 0; guard < 30; guard++) {
      const v = playerView(run, t.state);
      let acted = false;
      for (const thing of v.room.things) {
        if (thing.kind === 'item' || thing.kind === 'exit' || (thing.kind === 'source' && !thing.fill)) {
          const n = table.nodeById(t, thing.id);
          if (thing.id.startsWith('alt:') || n?.kind === 'item') table.acceptThing(t, thing.id); else table.resolve(t, n);
          acted = true; break;
        }
        const given = v.inventory.find((name) => table.fits(t, thing.id, { given: name }));
        if (given) { table.acceptThing(t, thing.id, { given }); acted = true; break; }
        const friend = v.companions.find((name) => table.fits(t, thing.id, { friend: name }));
        if (friend) { table.acceptThing(t, thing.id, { friend }); acted = true; break; }
      }
      const make = v.recipes[0];
      if (!acted && make) { table.resolve(t, table.nodeById(t, make.id)); acted = true; }
      if (!acted) break;
      childActions++; did = true;
    }
    return did;
  };
  for (let round = 0; round < 60 && !table.isFinished(t); round++) {
    let progress = false;
    for (const room of reachable()) { walkTo(room); if (actHere()) progress = true; if (table.isFinished(t)) return t; }
    if (progress) continue;
    // Nothing more she can do by herself: back to the entrance if that finishes it.
    walkTo(run.map.start);
    if (table.isFinished(t)) return t;
    // A real child does not search every room by habit. She looks around when the iPad nudges her
    // (prototype/stuck.mjs), in the rooms her map shows with 🔍. The nudge must always lead on.
    const hint = stuckHint(t);
    assert.ok(hint, `${where}: nothing more she can do, but the iPad does not see that she is stuck`);
    if (hint.kind === 'search') {
      assert.ok(playerView(run, t.state, { nudge: hint.child }).nudge, `${where}: stuck with something hidden, but no nudge on the iPad`);
      nudges++;
      let found = false;
      const marked = playerView(run, t.state).cave.rooms.filter((r) => r.marks.some((m) => m.kind === 'look')).map((r) => r.id);
      for (const room of reachable().filter((r) => marked.includes(r))) {
        walkTo(room);
        if (table.search(t)) { table.rolled(t, 1); table.search(t); table.rolled(t, 1); found = true; break; } // even two low rolls find it
      }
      assert.ok(found, `${where}: the nudge said look around, but no room with 🔍 had anything`);
      continue;
    }
    const open = run.nodes.filter((n) => !table.isDone(t, n.id) && (n.room === null || reachable().includes(n.room)));
    const recipe = open.find((n) => n.kind === 'recipe' && n.needs.every((x) => t.state.inventory.includes(table.nodeById(t, x.provider)?.item?.name)));
    if (recipe) { dm('recipe', recipe); continue; }
    // A task she can see on the iPad («OPPGAVE …», GJORT): she does it at the table, the DM says yes.
    // The only DM step allowed, and only for a task she was shown.
    const taskRoom = reachable().find((r) => playerView(run, { ...t.state, here: r }).room.things.some((x) => x.task && !x.id.startsWith('amb:')));
    if (taskRoom !== undefined) {
      walkTo(taskRoom);
      const thing = playerView(run, t.state).room.things.find((x) => x.task && !x.id.startsWith('amb:'));
      dmSteps.task = (dmSteps.task || 0) + 1;
      table.taskDone(t, thing.id);
      continue;
    }
    const none = open.find((n) => n.room !== null && !n.needs.length && n.kind !== 'item');
    if (none) { walkTo(none.room); dm(`no need: ${none.kind}`, none); continue; }
    stuck.push(`${where}: stuck in room ${t.state.here}; open: ${open.map((n) => `${n.card?.name || n.item?.name} (${n.kind}, needs ${n.needs.map((x) => x.tag || x.name || x.task).join('/')})`).join('; ')}; backpack [${t.state.inventory}]`);
    return t;
  }
  return t;
}

for (const missionId of missionIds(content)) {
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= SEEDS; seed++) {
      const { run } = acceptedRun(content, missionId, seed, length);
      const where = `${missionId}/${length}/${seed} «${run.mission.name}»`;
      runs++;
      const t = play(content, run, where);
      if (!table.isFinished(t) && !stuck.some((s) => s.startsWith(where))) stuck.push(`${where}: not finished after many rounds`);
    }
  }
}
const extra = Object.keys(dmSteps).filter((k) => !DM_OK.has(k));
if (process.env.VERBOSE || stuck.length || extra.length) { console.log('DM steps:', JSON.stringify(dmSteps)); for (const s of stuck.slice(0, 15)) console.log('  STUCK', s); console.log(`  ${stuck.length} stuck of ${runs}`); }
assert.equal(stuck.length, 0, `${stuck.length} runs could not be finished from the iPad`);
assert.deepEqual(extra, [], `DM steps that should not be needed: ${extra.join(', ')}`);
console.log(`child play test: ${runs} runs played only through the iPad, ${childActions} things she did herself, ${nudges} times stuck with something hidden and nudged to look around (it always led on), DM only for ${JSON.stringify(dmSteps)}, OK`);
