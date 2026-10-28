// The matrix check (owner, after «Spilledåsen og den glemte regla»): across every mission, length and
// many codes, can a thing that obviously fits the wrong figure leave the child stuck?
// - A planned thing given to another figure it fits (same tag) is lent and given back, so the one it
//   was meant for can still get it (table.mjs acceptThing / stillPlanned). The same for a figure
//   wandering about (ambient), if the DM says yes.
// - Everything she has to use is on her screen in its room, and a source can be filled from the iPad.
// - A composed mission's treasure is never something the cave wants (generate.mjs, the clash check).
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import * as table from '../../prototype/table.mjs';
import { playerView } from '../../prototype/player-view.mjs';
import { rejectedFor } from '../../tools/lib/fits.mjs';

const content = loadContent();
const FIGURES = new Set(['blocker', 'trader', 'quest', 'companion', 'target', 'lock', 'machine', 'goal', 'exit', 'deliver']);
let runs = 0, wrongGifts = 0, ambientGifts = 0, visible = 0, fills = 0, givers = 0;
for (const missionId of missionIds(content)) {
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= 25; seed++) {
      const { run } = acceptedRun(content, missionId, seed, length);
      const where = `${missionId}/${length}/${seed} «${run.mission.name}»`;
      runs++;
      for (const tag of run.mission.goal?.tags || []) assert.ok(!run.nodes.some((n) => n.needs.some((x) => x.tag === tag)), `${where}: the cave wants ${tag}, which the treasure is`);
      // Someone the DM's text says waits at the entrance is on the child's screen there (owner's playtest
      // «Fløyta som ble borte»: the DM read about a little ghost the child could not see).
      if (/venter ved inngangen/.test(run.mission.intro) || run.mission.giver) {
        const at = playerView(run, table.freshState(run)).room.things.find((x) => x.kind === 'giver');
        assert.ok(at && at.text.length > 10, `${where}: the one waiting at the entrance is not on the child's screen`);
        givers++;
      }
      // The matrix review: no planned solution is one the figure rejects (a feather for a toothache).
      for (const n of run.nodes) for (const need of n.needs.filter((x) => x.tag && x.provider)) {
        const p = run.nodes.find((x) => x.id === need.provider);
        assert.ok(!rejectedFor(n.card, need.tag, p.item?.cardId || p.card?.id), `${where}: ${p.item?.name || p.card?.name} is planned for ${n.card?.name}, which rejects it`);
      }
      // Everything she has to use is on her screen in its room (owner's playtest: the well was not).
      // Hidden things are found by searching instead.
      for (const n of run.nodes.filter((x) => x.room !== null && x.room !== undefined && !(x.kind === 'item' && x.hidden))) {
        const t = { content, run, state: table.freshState(run) };
        t.state.here = n.room;
        assert.ok(playerView(run, t.state).room.things.some((x) => x.id === n.id), `${where}: ${n.card?.name || n.item?.name} (${n.kind}) in room ${n.room} is not on the child's screen`);
        visible++;
      }
      // A source filled from the iPad: the container goes in, the filled thing comes out.
      for (const src of run.nodes.filter((x) => x.kind === 'source' && x.needs.length)) {
        const t = { content, run, state: table.freshState(run) };
        const p = table.nodeById(t, src.needs[0].provider);
        if (!p?.item) continue; // a friend helps there instead
        table.resolve(t, p);
        const container = p.item.name;
        if (!t.state.inventory.includes(container)) continue;
        assert.ok(table.fits(t, src.id, { given: container }), `${where}: ${container} does not fit ${src.card.name}`);
        table.acceptThing(t, src.id, { given: container });
        assert.ok(t.state.inventory.includes(src.item.name) && !t.state.inventory.includes(container), `${where}: filling ${container} at ${src.card.name} left [${t.state.inventory}]`);
        fills++;
      }
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
assert.ok(wrongGifts > 0 && visible > 0 && fills > 0);
console.log(`matrix test: ${runs} runs, ${givers} with the quest giver at the entrance, ${visible} things and figures all on the child's screen, ${fills} sources filled from the iPad, ${wrongGifts} gifts to a wrong figure that fits and ${ambientGifts} to wandering figures; the planned thing always comes back, OK`);
