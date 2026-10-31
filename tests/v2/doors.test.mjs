// Doors on the map (prototype/map-view.mjs doorKind, table.mjs goTo): every passage has a door that is
// closed until the child walks through it (owner: «dører åpner ikke før man går inn»), then stays open
// with its leaf in the room farther from the entrance. Locked doors stay locked; secret doors never reach
// the child.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import { playerView } from '../../prototype/player-view.mjs';
import * as table from '../../prototype/table.mjs';

const content = loadContent();
const kindAt = (v, e, room) => v.cave.doors.find((d) => d.draw && ((room === e.a && d.x === e.aCell.x && d.y === e.aCell.y && d.dir === e.aDir) || (room === e.b && d.x === e.bCell.x && d.y === e.bCell.y)))?.kind;
let walks = 0;
for (const missionId of missionIds(content)) {
  for (let seed = 1; seed <= 20; seed++) {
    const { run } = acceptedRun(content, missionId, seed, 'VANLIG');
    const where = `${missionId}/${seed}`;
    const { map } = run;
    const t = { content, run, state: table.freshState(run) };
    let v = playerView(run, t.state);
    for (const d of v.cave.doors) assert.ok(['closed', 'locked'].includes(d.kind), `${where}: a door is ${d.kind} before anyone walked through it`);
    assert.ok(!v.cave.doors.some((d) => d.kind === 'secret'), `${where}: a secret door reached the child`);
    // Walk through every open door from the entrance, one at a time, and back.
    for (const [i, e] of map.edges.entries()) {
      if (e.secret || e.gate !== null || (e.a !== map.start && e.b !== map.start)) continue;
      const other = e.a === map.start ? e.b : e.a;
      table.goTo(t, other);
      assert.ok(t.state.passed.includes(i), `${where}: walking through door ${i} did not open it`);
      v = playerView(run, t.state);
      assert.equal(kindAt(v, e, map.start), e.loop ? 'loop' : 'open', `${where}: door ${i} not shown open after walking through it`);
      const into = v.cave.doors.find((d) => d.draw && d.kind === (e.loop ? 'loop' : 'open'))?.into;
      assert.ok(['in', 'out'].includes(into), `${where}: open door ${i} has no leaf direction`);
      table.goTo(t, map.start);
      walks++;
    }
  }
}
assert.ok(walks > 0);
console.log(`doors test: ${walks} walks, every door closed until walked through, then open; no secret door to the child, OK`);
