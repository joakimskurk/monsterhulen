// The die and what the child may do by herself (prototype/table.mjs):
// - searching a room with something hidden asks for the die; 3–6 finds it, 1–2 gives a hint the first
//   time and finds it on the second try (fail-forward, as in the original); an empty room asks nothing;
// - «it obviously fits» is true for the planned item and false for a thing that fits no open need.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import * as table from '../../prototype/table.mjs';

const content = loadContent();
let searches = 0, fitChecks = 0;
for (const missionId of missionIds(content)) {
  for (let seed = 1; seed <= 20; seed++) {
    const { run } = acceptedRun(content, missionId, seed, 'VANLIG');
    const where = `${missionId}/${seed}`;
    for (const n of run.nodes.filter((x) => x.kind === 'item' && x.hidden)) {
      for (const [first, second, foundAt] of [[1, 2, 2], [5, null, 1], [3, null, 1]]) {
        const t = { content, run, state: table.freshState(run) };
        t.state.here = n.room;
        assert.equal(table.search(t), true, `${where}: no die asked for in a room with something hidden`);
        assert.equal(t.state.roll.kind, 'search');
        const r1 = table.rolled(t, first);
        assert.equal(r1.found, foundAt === 1, `${where}: roll ${first} found=${r1.found}`);
        assert.equal(t.state.roll, null, `${where}: the die is still asked for after a roll`);
        if (foundAt === 2) {
          assert.ok(!t.state.inventory.includes(n.item.name), `${where}: found on a low first roll`);
          const firstId = t.state.lastRoll && t.state.rollCount;
          table.search(t);
          assert.ok(t.state.roll.id > firstId, `${where}: the second roll reused the first roll's number`);
          assert.equal(table.rolled(t, second).found, true, `${where}: not found on the second try`);
        }
        assert.ok(t.state.inventory.includes(n.item.name) && table.isDone(t, n.id), `${where}: ${n.item.name} not in the backpack after it was found`);
        searches++;
      }
    }
    // An empty room: no die.
    const empty = run.map.rooms.find((r) => !run.nodes.some((n) => n.kind === 'item' && n.hidden && n.room === r.id));
    const t0 = { content, run, state: table.freshState(run) };
    t0.state.here = empty.id;
    assert.equal(table.search(t0), false, `${where}: a die asked for in a room with nothing hidden`);
    assert.equal(t0.state.roll ?? null, null);

    // «Obviously fits»: the planned item fits; a thing with none of the open need tags does not.
    const t = { content, run, state: table.freshState(run) };
    for (const node of run.nodes.filter((x) => x.needs.some((need) => need.provider))) {
      for (const need of node.needs.filter((x) => x.provider)) {
        const p = run.nodes.find((x) => x.id === need.provider);
        if (p.kind === 'companion') assert.ok(table.fits(t, node.id, { friend: p.card.name }), `${where}: ${p.card.name} does not fit ${node.card.name}`);
        else assert.ok(table.fits(t, node.id, { given: p.item.name }), `${where}: ${p.item.name} does not fit ${node.card?.name}`);
        fitChecks++;
      }
      const tags = new Set(node.needs.map((x) => x.tag).filter(Boolean));
      const planned = new Set(node.needs.map((x) => run.nodes.find((y) => y.id === x.provider)?.item?.name).filter(Boolean));
      const stranger = content.items.find((i) => !i.persistent && !planned.has(i.name) && !i.tags.some((g) => tags.has(g)) && !run.nodes.some((y) => y.item?.name === i.name));
      if (stranger) { assert.equal(table.fits(t, node.id, { given: stranger.name }), false, `${where}: ${stranger.name} wrongly fits ${node.card?.name}`); fitChecks++; }
    }
  }
}
assert.ok(searches > 0 && fitChecks > 0);
console.log(`dice test: ${searches} searches (fail-forward on 1–2), empty rooms ask no die, ${fitChecks} «obviously fits» checks, OK`);
