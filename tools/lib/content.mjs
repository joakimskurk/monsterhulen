// Loads Monsterhulen V2 content cards from content/*.json (Node) and builds lookup indexes.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildContent, CONTENT_FILES } from './content-core.mjs';

export { isCarryTag, figureNeeds } from './content-core.mjs';

export const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function loadContent(root = REPO_ROOT) {
  const raw = {};
  for (const [key, [file, field]] of Object.entries(CONTENT_FILES)) {
    const json = JSON.parse(readFileSync(join(root, 'content', file), 'utf8'));
    raw[key] = field ? json[field] : json;
  }
  return buildContent(raw);
}
