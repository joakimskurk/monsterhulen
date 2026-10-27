// Loads Monsterhulen V2 content cards from content/*.json and builds lookup indexes.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

function readJson(root, name) {
  return JSON.parse(readFileSync(join(root, 'content', name), 'utf8'));
}

export function loadContent(root = REPO_ROOT) {
  const vocabulary = readJson(root, 'vocabulary.json');
  const content = {
    vocabulary,
    figures: readJson(root, 'figures.json').figures,
    obstacles: readJson(root, 'obstacles.json').obstacles,
    items: readJson(root, 'items.json').items,
    sources: readJson(root, 'sources.json').sources,
    recipes: readJson(root, 'recipes.json').recipes,
    missions: readJson(root, 'missions.json').missions,
  };
  content.tagById = new Map(vocabulary.tags.map((t) => [t.id, t]));
  content.itemById = new Map(content.items.map((i) => [i.id, i]));
  content.figureById = new Map(content.figures.map((f) => [f.id, f]));
  return content;
}

export const isCarryTag = (content, tag) => content.tagById.get(tag)?.carry === true;

// Tags a figure can be resolved with (wants that take items + weaknesses), split by how.
export function figureNeeds(figure) {
  const out = [];
  for (const w of figure.wants || []) {
    if (w.type === 'SORT') for (const tag of w.tags) out.push({ via: 'wants', tag });
    if (w.type === 'BYTTE') for (const tag of w.accepts) out.push({ via: 'trade', tag });
    if (w.type === 'GJORE') for (const tag of w.needs || []) out.push({ via: 'task', tag });
  }
  for (const w of figure.weakness || []) out.push({ via: 'weakness', tag: w.tag, sign: w.sign, result: w.result });
  return out;
}
