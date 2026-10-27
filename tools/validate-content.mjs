#!/usr/bin/env node
// Validates content/*.json against the V2 card format (content/README.md)
// and prints tag coverage: who needs a tag vs. who can provide it.
// Exit code 1 on errors. Warnings do not fail.
import { loadContent, isCarryTag } from './lib/content.mjs';

const c = loadContent();
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const tagOk = (where, tag) => { if (!c.tagById.has(tag)) err(where, `unknown tag ${tag}`); };
const wantTypes = new Set(c.vocabulary.wantTypes.map((w) => w.id));
const roles = new Set(Object.keys(c.vocabulary.roles));
const combats = new Set(Object.keys(c.vocabulary.combat));
const dispositions = new Set(c.vocabulary.dispositions);
const zones = new Set(c.vocabulary.zones);

// Unique ids across all card types.
const seen = new Map();
for (const [kind, list] of Object.entries({ figure: c.figures, obstacle: c.obstacles, item: c.items, source: c.sources, recipe: c.recipes, mission: c.missions })) {
  for (const card of list) {
    if (!card.id) { err(kind, 'card without id'); continue; }
    if (seen.has(card.id)) err(card.id, `duplicate id (also a ${seen.get(card.id)})`);
    seen.set(card.id, kind);
  }
}

for (const f of c.figures) {
  const at = `figure ${f.id}`;
  if (!f.name) err(at, 'missing name');
  if (!dispositions.has(f.disposition)) err(at, `bad disposition ${f.disposition}`);
  if (!combats.has(f.combat)) err(at, `bad combat ${f.combat}`);
  for (const r of f.roles || []) if (!roles.has(r)) err(at, `bad role ${r}`);
  const g = f.gives || {};
  for (const w of f.wants || []) {
    if (!wantTypes.has(w.type)) err(at, `bad want type ${w.type}`);
    if (w.type === 'SORT') { if (!w.tags?.length) err(at, 'SORT without tags'); (w.tags || []).forEach((t) => tagOk(at, t)); }
    if (w.type === 'BYTTE') { if (!w.accepts?.length) err(at, 'BYTTE without accepts'); (w.accepts || []).forEach((t) => tagOk(at, t)); }
    if (w.type === 'MISTET' && !w.what) err(at, 'MISTET without what');
    if (['GJORE', 'VITE', 'KAMP'].includes(w.type) && !w.task) err(at, `${w.type} without task`);
    (w.needs || []).forEach((t) => tagOk(at, t));
  }
  for (const w of f.weakness || []) {
    tagOk(at, w.tag);
    if (!w.sign) err(at, `weakness ${w.tag} without sign`);
    if (!w.result) err(at, `weakness ${w.tag} without result`);
  }
  for (const key of ['rewards', 'sells', 'ability']) (g[key] || []).forEach((t) => tagOk(at, t));
  const has = (r) => (f.roles || []).includes(r);
  if (has('trader') && !(f.wants || []).some((w) => w.type === 'BYTTE')) err(at, 'trader without BYTTE want');
  if (has('trader') && !(g.sells || []).length) err(at, 'trader without sells');
  if (has('companion') && !(g.ability || []).length) err(at, 'companion without ability');
  if (has('quest') && !(g.rewards || []).length && !(g.ability || []).length) err(at, 'quest without rewards or ability');
  if (has('blocker') && !g.opens) err(at, 'blocker without gives.opens');
  if (has('blocker') && !(f.wants || []).length && !(f.weakness || []).length) err(at, 'blocker with no way to resolve it');
  if (f.combat === 'strong' && !(f.weakness || []).length) err(at, 'combat strong requires a weakness');
  if (!f.intro) warn(at, 'missing intro');
}

for (const o of c.obstacles) {
  const at = `obstacle ${o.id}`;
  if (!o.solvedBy?.length) err(at, 'no solvedBy');
  for (const s of o.solvedBy || []) { tagOk(at, s.tag); if (!s.sign) err(at, `solvedBy ${s.tag} without sign`); }
}

for (const i of c.items) {
  const at = `item ${i.id}`;
  if (!i.tags?.length) err(at, 'no tags');
  (i.tags || []).forEach((t) => tagOk(at, t));
  for (const t of i.tags || []) if (!isCarryTag(c, t)) err(at, `item carries non-carry tag ${t}`);
  if (i.container && !(i.tags || []).includes('BEHOLDER')) err(at, 'container must have BEHOLDER tag');
}

for (const s of c.sources) {
  const at = `source ${s.id}`;
  tagOk(at, s.gives);
  if (s.requires !== null && s.requires !== undefined) tagOk(at, s.requires);
  for (const z of s.zones || []) if (!zones.has(z)) err(at, `unknown zone ${z}`);
}

for (const r of c.recipes) {
  const at = `recipe ${r.id}`;
  for (const id of r.inputs || []) if (!c.itemById.has(id)) err(at, `unknown input item ${id}`);
  (r.output?.tags || []).forEach((t) => tagOk(at, t));
}

for (const m of c.missions) {
  const at = `mission ${m.id}`;
  if (!['FINN', 'REDD', 'SAMLE', 'LEVER', 'KOM_UT'].includes(m.type)) err(at, `bad type ${m.type}`);
  (m.goal?.calm || []).forEach((t) => tagOk(at, t));
  (m.goal?.pool || []).forEach((t) => tagOk(at, t));
}

// Coverage: for each carry tag, count consumers and providers.
const coverage = new Map(c.vocabulary.tags.filter((t) => t.carry).map((t) => [t.id, { need: 0, items: 0, sources: 0, sells: 0, rewards: 0, ability: 0, recipes: 0 }]));
const bump = (tag, key) => { if (coverage.has(tag)) coverage.get(tag)[key] += 1; };
for (const f of c.figures) {
  for (const w of f.wants || []) [...(w.tags || []), ...(w.accepts || []), ...(w.needs || [])].forEach((t) => bump(t, 'need'));
  for (const w of f.weakness || []) bump(w.tag, 'need');
  for (const t of f.gives?.sells || []) bump(t, 'sells');
  for (const t of f.gives?.rewards || []) bump(t, 'rewards');
  for (const t of f.gives?.ability || []) bump(t, 'ability');
}
for (const o of c.obstacles) for (const s of o.solvedBy) bump(s.tag, 'need');
for (const i of c.items) if (!i.persistent) for (const t of i.tags) bump(t, 'items');
for (const s of c.sources) bump(s.gives, 'sources');
for (const r of c.recipes) for (const t of r.output.tags) bump(t, 'recipes');
for (const [tag, n] of coverage) {
  const provide = n.items + n.sources + n.sells + n.rewards + n.ability + n.recipes;
  if (n.need > 0 && provide === 0) err(`tag ${tag}`, `needed ${n.need}x but nothing provides it`);
  else if (n.need > 0 && n.items + n.sources === 0) warn(`tag ${tag}`, 'only figures provide it (no item or source)');
}

const counts = `figures ${c.figures.length}, obstacles ${c.obstacles.length}, items ${c.items.length} (${c.items.filter((i) => i.persistent).length} persistent), sources ${c.sources.length}, recipes ${c.recipes.length}, missions ${c.missions.length}`;
console.log(`Content: ${counts}\n`);
console.log('Tag coverage (need | items sources sells rewards ability recipes):');
for (const [tag, n] of coverage) console.log(`  ${tag.padEnd(11)} ${String(n.need).padStart(3)} | ${[n.items, n.sources, n.sells, n.rewards, n.ability, n.recipes].map((x) => String(x).padStart(3)).join(' ')}`);
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ${warnings.join('\n  ')}`);
if (errors.length) { console.log(`\nErrors (${errors.length}):\n  ${errors.join('\n  ')}`); process.exit(1); }
console.log('\nOK: content is valid.');
