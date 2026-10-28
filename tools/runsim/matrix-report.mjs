// Writes docs/v2/MATRISE.md: every figure and obstacle, what it wants (with the sign the DM can say),
// and every thing, recipe or source that fits it, after the matrix review (lib/fits.mjs). Also what is
// rejected and why. For the owner to read through: does each line make sense to a five-year-old?
// Run: npm run matrix
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadContent, REPO_ROOT } from '../lib/content.mjs';
import { rejectedFor } from '../lib/fits.mjs';

const c = loadContent();
const label = (tag) => c.tagById.get(tag)?.label || tag;
const things = [
  ...c.items.map((i) => ({ id: i.id, name: i.persistent ? `${i.name} (Helteboka)` : i.name, tags: i.tags })),
  ...c.recipes.map((r) => ({ id: r.id, name: `${r.output.name} (lages av ${r.inputs.map((id) => c.items.find((i) => i.id === id)?.name.toLowerCase()).join(' + ')})`, tags: r.output.tags || [] })),
  ...c.sources.map((s) => ({ id: s.id, name: `${s.name} (kilde${s.requires ? `, trenger ${label(s.requires)}` : ''})`, tags: [s.gives] })),
];
const HOW = { SORT: 'vil ha', BYTTE: 'bytter mot', GJORE: 'trenger hjelp', SVAK: 'svak mot', LØS: 'løses med' };
const lines = ['# Matrisen: hvem kan løses med hva', '',
  'Generert av `npm run matrix` (`tools/runsim/matrix-report.mjs`). Ikke rediger for hånd.',
  'Hver linje er én figur eller felle, hva den vil ha eller er svak mot, og alt i spillet som løser den. Spørsmålet for hver linje: **ville en femåring skjønt det hvis Forteller sier tegnet?**',
  'Ting som har riktig egenskap, men ikke gir mening akkurat her, er avvist på kortet (`rejects`), med en grunn.', ''];
let pairs = 0;
for (const card of [...c.figures, ...c.obstacles]) {
  const wants = [
    ...(card.wants || []).flatMap((w) => [...(w.tags || []), ...(w.accepts || []), ...(w.needs || [])].map((tag) => ({ how: HOW[w.type], task: w.task, tag, sign: w.sign }))),
    ...(card.weakness || []).map((w) => ({ how: HOW.SVAK, tag: w.tag, sign: w.sign })),
    ...(card.solvedBy || []).map((w) => ({ how: HOW.LØS, tag: w.tag, sign: w.sign })),
  ];
  if (!wants.length) continue;
  lines.push(`## ${card.name}`, '', `*${card.intro}*`, '');
  for (const w of wants) {
    const fit = things.filter((t) => t.tags.includes(w.tag) && !rejectedFor(card, w.tag, t.id));
    const no = (card.rejects || []).filter((r) => r.tag === w.tag);
    pairs += fit.length;
    lines.push(`- **${w.how} ${label(w.tag)}**${w.task ? ` («${w.task}»)` : ''}. Tegn: «${w.sign || '–'}»`);
    lines.push(`  - Løses med: ${fit.length ? fit.map((t) => t.name).join(', ') : '**ingenting** (Forteller avgjør)'}`);
    for (const r of no) lines.push(`  - Avvist: ${r.items.map((id) => things.find((t) => t.id === id)?.name || id).join(', ')}. ${r.why}`);
  }
  lines.push('');
}
lines.splice(5, 0, `${pairs} par i alt.`, '');
writeFileSync(join(REPO_ROOT, 'docs', 'v2', 'MATRISE.md'), lines.join('\n'));
console.log(`docs/v2/MATRISE.md: ${pairs} pairs`);
