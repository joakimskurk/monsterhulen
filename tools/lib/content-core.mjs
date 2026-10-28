// Pure content helpers shared by Node tools and the browser prototype (no file system access).

// raw: { vocabulary, figures, obstacles, items, sources, recipes, missions } as parsed from content/*.json
export function buildContent(raw) {
  const content = { ...raw };
  content.tagById = new Map(raw.vocabulary.tags.map((t) => [t.id, t]));
  content.itemById = new Map(raw.items.map((i) => [i.id, i]));
  content.figureById = new Map(raw.figures.map((f) => [f.id, f]));
  attachPlaceholders(content);
  return content;
}

// Pictures live in content/assets.json (everything that is to be generated, one entry each).
// Each card gets `icon` when content is loaded: the image file once it is approved, otherwise the
// placeholder. Views show an image when `icon` is a path under assets/.
function attachPlaceholders(content) {
  content.assetByKey = new Map((content.assets || []).map((a) => [a.key, a]));
  const ph = (key) => { const a = content.assetByKey.get(key); return a?.status === 'approved' ? a.file : a?.placeholder; };
  content.generic = (name) => ph(`generic:${name}`);
  content.ui = (name) => ph(`ui:${name}`);
  for (const [list, kind] of [[content.items, 'item'], [content.figures, 'figure'], [content.obstacles, 'obstacle'], [content.sources, 'source'], [content.vocabulary.tags, 'tag']]) {
    for (const card of list) card.icon = ph(`${kind}:${card.id}`);
  }
  for (const r of content.recipes) r.output.icon = ph(`recipe:${r.id}`);
  for (const m of content.missions) {
    m.goal.icon = ph(`mission:${m.id}`);
    m.goal.itemIcon = ph(`mission:${m.id}:item`);
    if (m.goal.lock) { m.goal.lock.icon = ph(`mission:${m.id}:lock`); m.goal.lock.keyIcon = ph(`mission:${m.id}:key`); }
  }
  const t = content.themes;
  if (!t) return;
  for (const [kind, list] of Object.entries({ treasure: t.FINN.treasures, lock: t.FINN.locks, key: t.FINN.keys, magic: t.FINN.magic, creature: t.REDD.creatures, device: t.SAMLE.devices, owner: t.LEVER.owners, thing: t.LEVER.things, place: t.LEVER.places, exit: t.KOM_UT.exits })) {
    for (const part of list) part.icon = ph(`theme:${kind}:${part.id}`);
  }
  for (const d of t.SAMLE.devices) if (d.part) d.part.icon = ph(`theme:device-part:${d.id}`);
  for (const e of t.KOM_UT.exits) if (e.need?.part) e.need.icon = ph(`theme:exit-part:${e.id}`);
}

export const CONTENT_FILES = {
  vocabulary: ['vocabulary.json', null],
  figures: ['figures.json', 'figures'],
  obstacles: ['obstacles.json', 'obstacles'],
  items: ['items.json', 'items'],
  sources: ['sources.json', 'sources'],
  recipes: ['recipes.json', 'recipes'],
  missions: ['missions.json', 'missions'],
  themes: ['themes.json', null],
  assets: ['assets.json', 'assets'],
  places: ['places.json', null],
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
