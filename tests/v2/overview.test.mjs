// The DM's overview of a run (prototype/overview.mjs): every thing the child can get is listed with
// where it is and how, the figure it is planned for is among what it fits, every extra thing fits the
// blocker it was laid out for, and no text has gaps.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { acceptedRun } from '../../tools/runsim/accept.mjs';
import { missionIds } from '../../tools/runsim/theme.mjs';
import { caveOverview } from '../../prototype/overview.mjs';
import { freshState } from '../../prototype/table.mjs';

const content = loadContent();
let runs = 0, things = 0;
for (const missionId of missionIds(content)) {
  for (const length of ['KORT', 'VANLIG', 'STORT']) {
    for (let seed = 1; seed <= 20; seed++) {
      const { run } = acceptedRun(content, missionId, seed, length);
      const o = caveOverview(content, run, freshState(run));
      const where = `${missionId}/${length}/${seed}`;
      assert.ok(!/undefined|null|NaN/.test(JSON.stringify(o.things.map((t) => [t.name, t.how, t.fits]))), `${where}: a gap in the text`);
      for (const n of run.nodes.filter((x) => x.item && x.consumer && ['item', 'trader', 'quest', 'source', 'recipe'].includes(x.kind))) {
        // Two sources can give a thing with the same name («beholder med kulde»): look at all of them.
        const same = o.things.filter((x) => x.name === n.item.name);
        assert.ok(same.length, `${where}: ${n.item.name} missing from the overview`);
        const consumer = run.nodes.find((x) => x.id === n.consumer);
        const name = consumer.card?.name || consumer.item?.name;
        assert.ok(same.some((t) => t.fits.some((f) => f.figure === name && f.planned)), `${where}: ${n.item.name} not shown as fitting ${name}`);
      }
      for (const a of run.alternatives) {
        const t = o.things.find((x) => x.name === a.item);
        const blocker = run.nodes.find((x) => x.id === a.for).card.name;
        assert.ok(t && t.fits.some((f) => f.figure === blocker), `${where}: extra ${a.item} not shown as fitting ${blocker}`);
      }
      for (const f of o.figures) assert.ok(f.name && (f.room || f.room === null), `${where}: figure without name`);
      runs++; things += o.things.length;
    }
  }
}
console.log(`overview test: ${runs} runs, ${things} things listed with where, how and who they fit, OK`);
