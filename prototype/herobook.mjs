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
