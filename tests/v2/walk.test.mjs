// Walking far (owner, 2026-10-28): she taps a room she has been in, and the avatar walks the shortest
// way there, room by room. The way may only use what her map shows: rooms she has been in, doors that
// are not locked, never a secret door; and every step must be one the DM page lets her take by herself.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import { playerView } from '../../prototype/player-view.mjs';
import { walkPath } from '../../prototype/map-view.mjs';
import * as table from '../../prototype/table.mjs';

const content = loadContent();
let walks = 0, steps = 0, refused = 0;
for (const missionId of missionIds(content)) {
  for (let seed = 1; seed <= 15; seed++) {
    const { run } = acceptedRun(content, missionId, seed, 'VANLIG');
    const where = `${missionId}/${seed}`;
    const { map } = run;
    // She has been in about half the rooms she can reach, with the first gate open half the time.
    const openGates = seed % 2 ? [1] : [];
    const t = { content, run, state: { ...table.freshState(run), openGates } };
    const reachable = [...table.reach(t)];
    const visited = reachable.filter((r, i) => r === map.start || i % 2 === 0 || (seed + r) % 3 === 0);
    const state = { ...t.state, visited, passed: map.edges.map((e, i) => i) };
    const cave = playerView(run, { ...state, here: map.start }).cave;
    const known = new Set(visited);
    // The real distances through the rooms she knows (breadth first over the real map), to compare.
    const dist = new Map([[map.start, 0]]), q = [map.start];
    while (q.length) { const r = q.shift(); for (const e of map.edges) { if (e.secret || (e.gate !== null && !openGates.includes(e.gate))) continue; const o = e.a === r ? e.b : e.b === r ? e.a : null; if (o !== null && known.has(o) && !dist.has(o)) { dist.set(o, dist.get(r) + 1); q.push(o); } } }
    for (const to of map.rooms.map((r) => r.id)) {
      const path = walkPath(cave, map.start, to);
      if (!known.has(to)) { assert.equal(path, null, `${where}: a way into room ${to}, which she has not been in`); refused++; continue; }
      if (path === null) { assert.ok(!dist.has(to), `${where}: no way to ${to}, but there is one through rooms she knows`); refused++; continue; }
      let at = map.start;
      for (const r of path) {
        assert.ok(known.has(r), `${where}: the way to ${to} goes through room ${r}, which she has not been in`);
        const e = map.edges.find((x) => (x.a === at && x.b === r) || (x.b === at && x.a === r));
        assert.ok(e && !e.secret && (e.gate === null || openGates.includes(e.gate)), `${where}: the way to ${to} goes from ${at} to ${r} through a locked, secret or missing door`);
        at = r; steps++;
      }
      assert.equal(at, to);
      assert.equal(path.length, dist.get(to), `${where}: the way to ${to} is not the shortest`);
      walks++;
    }
  }
}
assert.ok(walks > 0 && steps > walks);
console.log(`walk test: ${walks} walks (${steps} steps) only through rooms she knows and doors that are open to her, always the shortest; ${refused} rooms rightly out of reach, OK`);
