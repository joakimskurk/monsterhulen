// The child's iPad must never receive DM-only information.
// For many generated runs, with every room visited but nothing solved, the player view must not contain:
// signs, solution/provider wording, DM-only keys, or the names of hidden items.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { playerView } from '../../prototype/player-view.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';

const content = loadContent();
const FORBIDDEN_KEYS = ['needs', 'provider', 'sign', 'consumer', 'sourceType', 'gate', 'zone', 'weakness', 'wants', 'ability', 'gives', 'hidden'];
let views = 0;

for (const missionId of missionIds(content)) {
  const mission = { id: missionId };
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= 40; seed++) {
      const { run } = acceptedRun(content, missionId, seed, length);
      const signs = run.nodes.flatMap((n) => n.needs.map((need) => need.sign).filter(Boolean));
      const hiddenNames = run.nodes.filter((n) => n.kind === 'item' && n.hidden).map((n) => n.item.name);
      const hiddenIds = run.nodes.filter((n) => n.kind === 'item' && n.hidden).map((n) => n.id);
      for (const room of run.map.rooms) {
        const state = { here: room.id, visited: run.map.rooms.map((r) => r.id), done: [], openGates: [], inventory: [], companions: [], log: ['Start (Forteller bestemte)'], runCode: 'X' };
        const view = playerView(run, state);
        const json = JSON.stringify(view);
        views++;
        for (const s of signs) assert.ok(!json.includes(s), `sign leaked in ${mission.id}/${length}/${seed} room ${room.id}: ${s}`);
        // Structural: a hidden item must never show up as a thing, in the backpack or in the log.
        // (A plain word search gives false alarms: figure intros and the mission title use ordinary nouns like "lykt".)
        const shown = [...view.room.things.map((th) => th.id), ...view.room.things.filter((th) => th.kind === 'item').map((th) => th.name), ...view.inventory, ...view.log];
        for (const id of hiddenIds) assert.ok(!view.room.things.some((th) => th.id === id), `hidden item node leaked: ${id}`);
        for (const h of hiddenNames) assert.ok(!shown.some((s) => s === h || s.toLowerCase().includes(h.toLowerCase())), `hidden item leaked: ${h}`);
        for (const k of FORBIDDEN_KEYS) assert.ok(!json.includes(`"${k}"`), `DM key "${k}" leaked`);
        assert.ok(!/Garantert|Forteller bestemte|GI LIKEVEL/.test(json), 'DM wording leaked');
      }
    }
  }
}
// Every thing, item and friend the child sees has a picture (workshop C1): the child may not read yet.
let pictured = 0;
for (const missionId of missionIds(content)) {
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= 20; seed++) {
      const { run } = acceptedRun(content, missionId, seed, length);
      const inventory = run.nodes.filter((n) => n.item).map((n) => n.item.name);
      const companions = run.nodes.filter((n) => ['companion', 'target'].includes(n.kind)).map((n) => n.card.name);
      for (const room of run.map.rooms) {
        const view = playerView(run, { here: room.id, visited: run.map.rooms.map((r) => r.id), done: [], openGates: [], inventory, companions, log: [], runCode: 'X' });
        for (const th of view.room.things) assert.ok(th.icon && th.icon !== '❔', `${missionId}/${length}/${seed}: no picture for ${th.name}`);
        for (const [name, icon] of Object.entries(view.icons)) assert.ok(icon !== '❔', `${missionId}/${length}/${seed}: no picture for ${name} in the backpack`);
        pictured++;
      }
    }
  }
}
// Fog of war (as in the original): walking a path from the start, the iPad gets only the rooms she has
// been in, doors only on those rooms, «?» only beyond the doors of the room she is in, and never a
// secret door.
let fogged = 0;
for (const missionId of missionIds(content)) {
  for (let seed = 1; seed <= 20; seed++) {
    const { run } = acceptedRun(content, missionId, seed, 'VANLIG');
    const { map } = run;
    const secretCells = new Set(map.edges.filter((e) => e.secret).flatMap((e) => [`${e.aCell.x},${e.aCell.y},${e.aDir}`, `${e.bCell.x},${e.bCell.y}`]));
    const visited = [map.start];
    for (const step of [...map.rooms.map((r) => r.id).filter((id) => map.rooms[id].zone === 0)].slice(0, 5)) {
      if (!visited.includes(step)) visited.push(step);
      const here = step;
      const view = playerView(run, { here, visited: visited.slice(), done: [], openGates: [], inventory: [], companions: [], log: [], runCode: 'X' });
      const cave = view.cave;
      const where = `${missionId}/${seed} at ${here}`;
      assert.deepEqual(cave.rooms.map((r) => r.id).sort(), visited.slice().sort(), `${where}: rooms not visited were sent`);
      for (const d of cave.doors) assert.ok(cave.rooms.some((r) => d.x >= r.x && d.x < r.x + r.w && d.y >= r.y && d.y < r.y + r.h), `${where}: door outside a visited room`);
      for (const d of cave.doors) assert.ok(!secretCells.has(`${d.x},${d.y},${d.dir}`), `${where}: secret door sent`);
      for (const p of cave.probes) {
        const e = map.edges.find((x) => !x.secret && ((x.a === here && x.b === p.room) || (x.b === here && x.a === p.room)));
        assert.ok(e && !visited.includes(p.room), `${where}: «?» not beyond a door of the current room`);
      }
      assert.ok(!JSON.stringify(cave).includes('secret'), `${where}: the word secret in the cave`);
      fogged++;
    }
  }
}
console.log(`player-view leak test: ${views} views checked, OK; ${pictured} views with a picture for everything; fog of war holds in ${fogged} views`);
