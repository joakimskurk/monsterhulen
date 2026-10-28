// Helteboka: what the child keeps between runs (docs/v2/workshops/2026-10-28_helteboka.md).
// Pure functions on a plain object; the DM page stores it, the iPad only shows it (workshop B6).
import { makeRng } from '../tools/runsim/rng.mjs';

export function emptyBook() {
  return { runs: [], friends: [], ting: [], memories: [] };
}

// Two lasting TING the child does not have yet, the same for the same run code (workshop B3).
export function tingOffer(book, content, code) {
  const owned = new Set(book.ting.map((x) => x.id));
  const free = content.items.filter((i) => i.persistent && !owned.has(i.id));
  return makeRng(`ting|${code}`).shuffle(free).slice(0, 2).map((i) => ({ id: i.id, name: i.name, tags: i.tags }));
}

// Writes a finished run into the book. Recording the same run twice changes nothing.
export function recordRun(book, { code, summary, ting = null, date = null }) {
  if (book.runs.some((r) => r.code === code)) return book;
  const friends = book.friends.slice();
  for (const f of summary.friends) if (!friends.some((x) => x.name === f.name)) friends.push(f);
  const owned = book.ting.slice();
  if (ting && !owned.some((x) => x.id === ting.id)) owned.push(ting);
  return {
    runs: [...book.runs, { code, title: summary.title, date }],
    friends,
    ting: owned,
    memories: [...book.memories, summary.headline].slice(-30),
  };
}

// A backup file read back in. Throws a short Norwegian message the DM page can show; never returns a
// half-valid book, so a broken file cannot overwrite the real one.
export function parseBook(text, content) {
  let data;
  try { data = JSON.parse(text); } catch { throw new Error('Filen er ikke en Heltebok (ikke gyldig JSON).'); }
  const book = data?.helteboka ?? data;
  const list = (k) => { if (!Array.isArray(book?.[k])) throw new Error(`Filen mangler «${k}».`); return book[k]; };
  const runs = list('runs'), friends = list('friends'), ting = list('ting'), memories = list('memories');
  const lasting = new Map(content.items.filter((i) => i.persistent).map((i) => [i.id, i]));
  for (const r of runs) if (typeof r?.code !== 'string') throw new Error('Et løp i filen mangler kode.');
  for (const f of friends) if (typeof f?.name !== 'string' || !Array.isArray(f.ability)) throw new Error('En venn i filen mangler navn eller evne.');
  for (const x of ting) if (!lasting.has(x?.id)) throw new Error(`Ukjent TING i filen: ${x?.id}.`);
  if (!memories.every((m) => typeof m === 'string')) throw new Error('Et minne i filen er ikke tekst.');
  // Names and tags of TING come from the item cards, not from the file.
  return { runs, friends, ting: ting.map((x) => ({ id: x.id, name: lasting.get(x.id).name, tags: lasting.get(x.id).tags })), memories };
}

// The backup file: the book plus what it is, so a future version can read it.
export function bookFile(book, date) {
  return JSON.stringify({ format: 'monsterhulen-helteboka', version: 1, saved: date, helteboka: book }, null, 2);
}
