// The child's iPad must never receive DM-only information.
// For many generated runs, with every room visited but nothing solved, the player view must not contain:
// signs, solution/provider wording, DM-only keys, or the names of hidden items.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { playerView } from '../../prototype/player-view.mjs';

const content = loadContent();
const FORBIDDEN_KEYS = ['needs', 'provider', 'sign', 'consumer', 'sourceType', 'gate', 'zone', 'weakness', 'wants', 'ability', 'gives', 'hidden'];
let views = 0;

for (const mission of content.missions) {
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= 40; seed++) {
      const { run } = acceptedRun(content, mission.id, seed, length);
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
console.log(`player-view leak test: ${views} views checked, OK`);
