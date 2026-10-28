// Everything in this run at a glance, for the DM: every thing (where it is, how the child gets it,
// whether she has it, and who in the cave wants it), and every figure (what it wants and which things
// in the cave fit). Lets the DM plant hints early: «the troll loves honey cookies» before she finds one.
// Pure: no DOM, so tests/v2/overview.test.mjs checks it.

const FIGURE_KINDS = new Set(['blocker', 'trader', 'quest', 'companion', 'target', 'lock', 'machine', 'goal', 'exit', 'deliver']);

export function caveOverview(content, run, state) {
  const label = (tag) => content.tagById.get(tag)?.label || tag;
  const roomOf = (id) => (id === null || id === undefined ? null : { id, name: run.map.rooms[id].name, zone: run.map.rooms[id].zone });
  const byId = new Map(run.nodes.map((n) => [n.id, n]));
  const done = new Set(state.done);

  // Who in the cave could use a thing with these tags, and how.
  const figures = [];
  for (const n of run.nodes) {
    if (!FIGURE_KINDS.has(n.kind)) continue;
    const card = n.card || {};
    const wants = [], weak = [];
    for (const w of card.wants || []) {
      if (w.type === 'SORT') wants.push(...w.tags.map((t) => ({ tag: t, how: 'vil ha' })));
      if (w.type === 'BYTTE') wants.push(...w.accepts.map((t) => ({ tag: t, how: 'bytter mot' })));
      if (w.type === 'GJORE') wants.push(...(w.needs || []).map((t) => ({ tag: t, how: 'trenger' })));
    }
    for (const w of card.weakness || []) weak.push({ tag: w.tag, how: 'svak mot' });
    for (const s of card.solvedBy || []) weak.push({ tag: s.tag, how: 'løses med' });
    // What this node needs in this run (its planned solution), also for doors, machines and goals.
    for (const need of n.needs) if (need.tag && !wants.concat(weak).some((x) => x.tag === need.tag)) wants.push({ tag: need.tag, how: 'trenger' });
    const tasks = (card.wants || []).filter((w) => ['VITE', 'KAMP', 'MISTET'].includes(w.type) || (w.type === 'GJORE' && !(w.needs || []).length)).map((w) => w.task || w.what);
    figures.push({
      id: n.id, name: card.name || n.item?.name, icon: card.icon, room: roomOf(n.room), done: done.has(n.id),
      uses: [...wants, ...weak], tasks,
      planned: n.needs.filter((x) => x.provider).map((x) => byId.get(x.provider)).map((p) => (p.kind === 'companion' ? `${p.card.name} (venn)` : p.item?.name)).filter(Boolean),
    });
  }
  for (const a of run.ambient) {
    const f = a.figure;
    const uses = [];
    for (const w of f.wants || []) {
      if (w.type === 'SORT') uses.push(...w.tags.map((t) => ({ tag: t, how: 'vil ha' })));
      if (w.type === 'BYTTE') uses.push(...w.accepts.map((t) => ({ tag: t, how: 'bytter mot' })));
      if (w.type === 'GJORE') uses.push(...(w.needs || []).map((t) => ({ tag: t, how: 'trenger' })));
    }
    for (const w of f.weakness || []) uses.push({ tag: w.tag, how: 'svak mot' });
    figures.push({ id: `amb:${a.room}`, name: f.name, icon: f.icon, room: roomOf(a.room), done: done.has(`amb:${a.room}`), uses, tasks: [], planned: [], ambient: true });
  }

  // Every thing the child can get in this run, and how.
  const things = [];
  const how = (n) => {
    if (n.kind === 'item') return n.hidden ? 'gjemt (se deg rundt)' : 'ligger åpent';
    if (n.kind === 'trader') return `bytt hos ${n.card.name}`;
    if (n.kind === 'quest') return `takk fra ${n.card.name}`;
    if (n.kind === 'source') return `hent ved ${n.card.name}`;
    if (n.kind === 'recipe') return `lages av ${n.needs.map((x) => x.name.toLowerCase()).join(' + ')}`;
    return null;
  };
  const have = (name) => state.inventory.includes(name);
  for (const n of run.nodes) {
    if (!n.item || !how(n)) continue;
    things.push({ name: n.item.name, icon: n.item.icon, room: roomOf(n.room), how: how(n), tags: n.item.tags || [], status: have(n.item.name) ? 'i sekken' : done.has(n.id) ? 'brukt' : 'ikke funnet', plannedFor: byId.get(n.consumer)?.card?.name || byId.get(n.consumer)?.item?.name || null });
  }
  for (const a of run.alternatives) {
    const card = content.items.find((i) => i.name === a.item);
    things.push({ name: a.item, icon: a.icon, room: roomOf(a.room), how: 'ligger åpent (ekstra)', tags: card?.tags || [a.tag], status: have(a.item) ? 'i sekken' : done.has(`alt:${a.room}`) ? 'brukt' : 'ikke funnet', plannedFor: null });
  }
  for (const t of [state.brought?.ting].filter(Boolean)) things.push({ name: t.name, icon: content.items.find((i) => i.id === t.id)?.icon, room: null, how: 'tatt med fra Helteboka', tags: t.tags, status: 'i sekken', plannedFor: null });

  // Join them: for each thing, who can use it; for each figure, which things fit.
  // A key, a rhyme line or a part has no tag: it fits what it is planned for.
  for (const t of things) {
    t.fits = figures.filter((f) => !f.done).flatMap((f) => f.uses.filter((u) => t.tags.includes(u.tag)).slice(0, 1).map((u) => ({ figure: f.name, how: u.how, tag: label(u.tag), planned: f.name === t.plannedFor })));
    if (t.plannedFor && !t.fits.some((x) => x.planned)) t.fits.unshift({ figure: t.plannedFor, how: 'trenger', tag: t.name.toLowerCase(), planned: true });
    t.tagLabels = t.tags.map(label);
  }
  for (const f of figures) {
    f.wantLabels = f.uses.map((u) => `${u.how} ${label(u.tag)}`);
    f.fitting = things.filter((t) => t.status !== 'brukt' && (t.plannedFor === f.name || f.uses.some((u) => t.tags.includes(u.tag)))).map((t) => t.name);
  }
  const order = (r) => (r ? run.map.distance[run.map.start][r.id] : 999);
  things.sort((a, b) => order(a.room) - order(b.room) || a.name.localeCompare(b.name, 'nb'));
  figures.sort((a, b) => order(a.room) - order(b.room) || a.name.localeCompare(b.name, 'nb'));
  return { things, figures };
}
