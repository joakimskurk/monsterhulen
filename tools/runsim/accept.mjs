// Generate until the playthrough and bypass check both accept, like the real generator would.
import { generateRun } from './generate.mjs';
import { playthrough, bypassCheck } from './playthrough.mjs';

export const MAX_ATTEMPTS = 40;

export function acceptedRun(content, missionId, seed, length) {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const g = generateRun(content, { missionId, seed: `${seed}#${attempt}`, length });
    if (!g.ok) continue;
    const result = playthrough(g.run);
    const bypass = bypassCheck(g.run);
    if (result.ok && bypass.ok) return { run: g.run, result, attempts: attempt + 1 };
  }
  return null;
}
