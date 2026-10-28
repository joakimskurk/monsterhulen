// Helteboka (prototype/herobook.mjs): what the child keeps between runs.
import assert from 'node:assert/strict';
import { loadContent } from '../../tools/lib/content.mjs';
import { emptyBook, tingOffer, recordRun, parseBook, bookFile } from '../../prototype/herobook.mjs';

const content = loadContent();
const lasting = content.items.filter((i) => i.persistent);
const run = (n, friends = []) => ({ code: `NY_FINN-KORT-${n}`, summary: { title: `Løp ${n}`, headline: `Du fant noe nr. ${n}!`, friends } });

let book = emptyBook();
assert.deepEqual(tingOffer(book, content, 'X'), tingOffer(book, content, 'X'), 'same code must give the same offer');

// Choose the first offered TING every time: 12 runs give all 12, then nothing more is offered.
for (let n = 1; n <= lasting.length; n++) {
  const offer = tingOffer(book, content, `code-${n}`);
  assert.equal(offer.length, Math.min(2, lasting.length - book.ting.length), `run ${n}: offer size`);
  assert.equal(new Set(offer.map((o) => o.id)).size, offer.length, `run ${n}: offer repeats a TING`);
  for (const o of offer) assert.ok(!book.ting.some((x) => x.id === o.id), `run ${n}: offered a TING already owned`);
  book = recordRun(book, { ...run(n, [{ name: 'Lysbillen', ability: ['LYS'] }]), ting: offer[0] });
}
assert.equal(book.ting.length, lasting.length, 'all lasting TING collected');
assert.deepEqual(tingOffer(book, content, 'more'), [], 'nothing left to offer');
assert.equal(book.friends.length, 1, 'the same friend is kept once');

// Recording the same run twice changes nothing.
const again = recordRun(book, { ...run(1, [{ name: 'Ny venn', ability: ['MAT'] }]) });
assert.equal(again, book, 'a run recorded twice must not change the book');

// Memories keep the latest 30.
for (let n = 100; n < 140; n++) book = recordRun(book, run(n));
assert.equal(book.memories.length, 30);
assert.equal(book.memories.at(-1), 'Du fant noe nr. 139!');
// A backup file round-trips, and broken files are refused with a message instead of half a book.
assert.deepEqual(parseBook(bookFile(book, '2026-10-28'), content), book, 'backup does not round-trip');
for (const [bad, why] of [['ikke json', 'JSON'], ['{}', 'runs'], [JSON.stringify({ ...book, ting: [{ id: 'FINNES_IKKE' }] }), 'Ukjent TING'], [JSON.stringify({ ...book, friends: [{ name: 'X' }] }), 'venn']]) {
  assert.throws(() => parseBook(bad, content), (e) => e.message.includes(why), `broken file not refused: ${why}`);
}
console.log(`herobook test: ${lasting.length} TING collected without repeats, friends kept once, double recording ignored, backup round-trips, broken files refused, OK`);
