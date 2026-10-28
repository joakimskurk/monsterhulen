// The matrix check (owner, after «Spilledåsen og den glemte regla»): across every mission, length and
// many codes, can a thing that obviously fits the wrong figure leave the child stuck?
// - A planned thing given to another figure it fits (same tag) is lent and given back, so the one it
//   was meant for can still get it (table.mjs acceptThing / stillPlanned). The same for a figure
//   wandering about (ambient), if the DM says yes.
// - A composed mission's treasure is never something the cave wants (generate.mjs, the clash check).
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import * as table from '../../prototype/table.mjs';

const content = loadContent();
const FIGURES = new Set(['blocker', 'trader', 'quest', 'companion', 'target', 'lock', 'machine', 'goal', 'exit', 'deliver']);
let runs = 0, wrongGifts = 0, ambientGifts = 0;
for (const missionId of missionIds(content)) {
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= 25; seed++) {
      const { run } = acceptedRun(content, missionId, seed, length);
      const where = `${missionId}/${length}/${seed} «${run.mission.name}»`;
      runs++;
      for (const tag of run.mission.goal?.tags || []) assert.ok(!run.nodes.some((n) => n.needs.some((x) => x.tag === tag)), `${where}: the cave wants ${tag}, which the treasure is`);
      for (const provider of run.nodes.filter((n) => n.item)) {
        const name = provider.item.name;
        for (const consumer of run.nodes.filter((n) => n.needs.some((x) => x.provider === provider.id))) {
          const fresh = () => { const t = { content, run, state: table.freshState(run) }; table.resolve(t, provider); return t; };
          if (!fresh().state.inventory.includes(name)) continue; // not something she carries (a filled bucket is made at the source)
          // Every other figure it obviously fits: give it there, then it must still reach the planned one.
          for (const wrong of run.nodes.filter((n) => FIGURES.has(n.kind) && n !== consumer)) {
            const t = fresh();
            if (!table.fits(t, wrong.id, { given: name })) continue;
            table.acceptThing(t, wrong.id, { given: name });
            assert.ok(t.state.inventory.includes(name), `${where}: ${name} given to ${wrong.card.name} is gone, but ${consumer.card?.name || consumer.item?.name} needs it`);
            if (FIGURES.has(consumer.kind)) assert.ok(table.fits(t, consumer.id, { given: name }), `${where}: ${name} no longer fits ${consumer.card.name}`);
            wrongGifts++;
          }
          for (const a of run.ambient) {
            const t = fresh();
            table.acceptThing(t, `amb:${a.room}`, { given: name });
            assert.ok(t.state.inventory.includes(name), `${where}: ${name} given to ${a.figure.name} (wandering) is gone`);
            ambientGifts++;
          }
        }
      }
    }
  }
}
assert.ok(wrongGifts > 0);
console.log(`matrix test: ${runs} runs, ${wrongGifts} gifts to a wrong figure that fits and ${ambientGifts} to wandering figures; the planned thing always comes back, OK`);
