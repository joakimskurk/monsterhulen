// Pure content helpers shared by Node tools and the browser prototype (no file system access).

// raw: { vocabulary, figures, obstacles, items, sources, recipes, missions } as parsed from content/*.json
export function buildContent(raw) {
  const content = { ...raw };
  content.tagById = new Map(raw.vocabulary.tags.map((t) => [t.id, t]));
  content.itemById = new Map(raw.items.map((i) => [i.id, i]));
  content.figureById = new Map(raw.figures.map((f) => [f.id, f]));
  return content;
}

export const CONTENT_FILES = {
  vocabulary: ['vocabulary.json', null],
  figures: ['figures.json', 'figures'],
  obstacles: ['obstacles.json', 'obstacles'],
  items: ['items.json', 'items'],
  sources: ['sources.json', 'sources'],
  recipes: ['recipes.json', 'recipes'],
  missions: ['missions.json', 'missions'],
};

export const isCarryTag = (content, tag) => content.tagById.get(tag)?.carry === true;

// Tags a figure can be resolved with (wants that take items + weaknesses), split by how.
export function figureNeeds(figure) {
  const out = [];
  for (const w of figure.wants || []) {
    if (w.type === 'SORT') for (const tag of w.tags) out.push({ via: 'wants', tag, sign: w.sign });
    if (w.type === 'BYTTE') for (const tag of w.accepts) out.push({ via: 'trade', tag, sign: w.sign });
    if (w.type === 'GJORE') for (const tag of w.needs || []) out.push({ via: 'task', tag, sign: w.sign });
  }
  for (const w of figure.weakness || []) out.push({ via: 'weakness', tag: w.tag, sign: w.sign, result: w.result });
  return out;
}
