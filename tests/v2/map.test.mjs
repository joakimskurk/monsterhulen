// The cave map (tools/runsim/map.mjs): rooms of different sizes on a grid, doors on shared walls.
// Checks the original generator's rules (no overlap, inside the grid, doors on a shared wall,
// opposite directions, one door per room side, connected) and the V2 rules (gates on the spine
// split the cave into zones, extra doors stay inside one zone, every zone has rooms).
import assert from 'node:assert/strict';
import { makeRng } from '../../tools/runsim/rng.mjs';
import { generateMap, LENGTHS, DIRS, sharedWall, reachable } from '../../tools/runsim/map.mjs';

let maps = 0;
const sizes = new Map();
for (const [length, shape] of Object.entries(LENGTHS)) {
  for (let seed = 1; seed <= 300; seed++) {
    const map = generateMap(makeRng(`map|${length}|${seed}`), shape);
    const where = `${length}/${seed}`;
    const byId = new Map(map.rooms.map((r) => [r.id, r]));
    assert.equal(map.rooms.length, shape.rooms, `${where}: room count`);

    const cells = new Map();
    for (const r of map.rooms) {
      assert.ok(r.x >= 0 && r.y >= 0 && r.x + r.w <= map.size && r.y + r.h <= map.size, `${where}: room ${r.id} outside the grid`);
      for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) {
        assert.ok(!cells.has(`${x},${y}`), `${where}: rooms ${r.id} and ${cells.get(`${x},${y}`)} overlap`);
        cells.set(`${x},${y}`, r.id);
      }
      sizes.set(`${r.w}x${r.h}`, (sizes.get(`${r.w}x${r.h}`) || 0) + 1);
    }

    const sides = new Set();
    for (const e of map.edges) {
      const a = byId.get(e.a), b = byId.get(e.b);
      assert.equal(DIRS[e.aDir].opp, e.bDir, `${where}: door ${e.a}-${e.b} directions not opposite`);
      assert.ok(sharedWall(a, b, e.aDir).some((p) => p.aCell.x === e.aCell.x && p.aCell.y === e.aCell.y && p.bCell.x === e.bCell.x && p.bCell.y === e.bCell.y), `${where}: door ${e.a}-${e.b} not on a shared wall`);
      for (const side of [`${e.a}:${e.aDir}`, `${e.b}:${e.bDir}`]) { assert.ok(!sides.has(side), `${where}: two doors on side ${side}`); sides.add(side); }
      if (e.gate === null) assert.equal(a.zone, b.zone, `${where}: extra door ${e.a}-${e.b} joins two zones`);
      else assert.equal(b.zone + a.zone, 2 * Math.min(a.zone, b.zone) + 1, `${where}: gate ${e.gate} does not separate neighbouring zones`);
    }

    // With every door open the whole cave is connected; with gates closed (secret doors open) only zone 0 is.
    assert.equal(reachable(map, { allGates: true, secrets: true }).size, shape.rooms, `${where}: cave not connected`);
    const closed = reachable(map, { secrets: true });
    for (const r of map.rooms) assert.equal(closed.has(r.id), r.zone === 0, `${where}: room ${r.id} (zone ${r.zone}) reachable=${closed.has(r.id)} with gates closed`);

    for (let z = 0; z <= shape.gates; z++) assert.ok(map.rooms.some((r) => r.zone === z), `${where}: zone ${z} is empty`);
    assert.equal(byId.get(map.end).zone, shape.gates, `${where}: goal room not in the last zone`);
    for (let g = 1; g <= shape.gates; g++) {
      assert.notEqual(map.gateRoom[g], map.start, `${where}: gate ${g} blocker in the entrance`);
      assert.equal(byId.get(map.gateRoom[g]).zone, g - 1, `${where}: gate ${g} blocker not just before the gate`);
    }
    maps++;
  }
}
const shapes = [...sizes.keys()].sort();
assert.ok(shapes.length >= 8, `too few room sizes: ${shapes}`);
console.log(`map test: ${maps} maps, room sizes ${shapes.join(' ')}, doors on shared walls, zones sealed by gates, OK`);
