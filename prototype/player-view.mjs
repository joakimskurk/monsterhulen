// What the child's iPad may see. Built only from an allow-list of fields:
// never needs, signs, providers, solutions, hidden items, zones ahead or the DM template.
import { reachable } from '../tools/runsim/map.mjs';

const FIGURE_KINDS = new Set(['blocker', 'trader', 'quest', 'companion', 'target', 'lock', 'machine', 'goal', 'exit', 'deliver']);

// Column layout: x = distance from start, y = order within that distance. Shared by both screens.
export function layoutMap(map) {
  const depth = map.distance[map.start];
  const columns = new Map();
  for (const r of map.rooms) { const d = depth[r.id]; if (!columns.has(d)) columns.set(d, []); columns.get(d).push(r.id); }
  const pos = {};
  const colW = 92, rowH = 74;
  let maxRows = 1;
  for (const [d, ids] of columns) { ids.forEach((id, i) => { pos[id] = { x: 46 + d * colW, y: 40 + i * rowH }; }); maxRows = Math.max(maxRows, ids.length); }
  return { pos, width: 92 + Math.max(...columns.keys()) * colW, height: 80 + (maxRows - 1) * rowH };
}

// `extra`: the end of the run, the hero book and packing, prepared by the DM page (child-facing only).
export function playerView(run, state, extra = {}) {
  const { map } = run;
  const openGates = new Set(state.openGates);
  const reach = reachable(map, { openGates });
  const visited = new Set(state.visited);
  // Known rooms: visited ones and their direct neighbours (not through secret doors).
  const known = new Set(visited);
  for (const e of map.edges) {
    if (e.secret) continue;
    if (visited.has(e.a)) known.add(e.b);
    if (visited.has(e.b)) known.add(e.a);
  }
  const done = new Set(state.done);
  const { pos, width, height } = layoutMap(map);

  const here = state.here;
  // Pictures for everything the child sees (workshop C1). The run knows its own things and figures;
  // what comes from outside the run (the hero book) is passed in by the DM page as `extra.icons`.
  const icons = new Map();
  for (const n of run.nodes) { if (n.item?.icon) icons.set(n.item.name, n.item.icon); if (n.card?.icon) icons.set(n.card.name, n.card.icon); }
  for (const a of run.alternatives) icons.set(a.item, a.icon);
  for (const a of run.ambient) icons.set(a.figure.name, a.figure.icon);
  const iconOf = (name) => icons.get(name) || extra.icons?.[name] || '❔';
  const things = [];
  for (const n of run.nodes) {
    if (n.room !== here || done.has(n.id)) continue;
    if (n.kind === 'item') { if (!n.hidden) things.push({ id: n.id, kind: 'item', name: n.item.name, icon: iconOf(n.item.name), text: n.item.found || `Her ligger ${n.item.name.toLowerCase()}.` }); continue; }
    if (FIGURE_KINDS.has(n.kind)) {
      // Progress on several needs, as a count only (never which ones are left).
      const total = n.needs.filter((x) => !x.local).length;
      const met = (state.needsMet?.[n.id] || []).length;
      const progress = total > 1 && met > 0 ? ` (${met} av ${total} er på plass)` : '';
      things.push({ id: n.id, kind: 'figure', name: n.card.name, icon: iconOf(n.card.name), text: `${n.card.intro || ''}${progress}`.trim() });
    }
  }
  for (const a of run.alternatives) if (a.room === here && !done.has(`alt:${a.room}`)) things.push({ id: `alt:${a.room}`, kind: 'item', name: a.item, icon: iconOf(a.item), text: `Her ligger ${a.item.toLowerCase()}.` });
  for (const a of run.ambient) if (a.room === here && !done.has(`amb:${a.room}`)) things.push({ id: `amb:${a.room}`, kind: 'figure', name: a.figure.name, icon: iconOf(a.figure.name), text: a.figure.intro || '' });

  return {
    v: 1,
    runCode: state.runCode,
    mission: { name: run.mission.name, intro: run.mission.intro },
    here,
    width, height,
    rooms: map.rooms.filter((r) => known.has(r.id)).map((r) => ({
      id: r.id, x: pos[r.id].x, y: pos[r.id].y,
      label: r.id === map.start ? 'Start' : r.id === map.end && visited.has(r.id) ? 'Mål' : String(r.id),
      visited: visited.has(r.id), canGo: reach.has(r.id) && r.id !== here,
    })),
    edges: map.edges.filter((e) => !e.secret && known.has(e.a) && known.has(e.b)).map((e) => ({ a: e.a, b: e.b, locked: e.gate !== null && !openGates.has(e.gate) })),
    room: { id: here, title: here === map.start ? 'Inngangen' : `Rom ${here}`, place: map.rooms[here].zoneName, things },
    inventory: state.inventory.slice(),
    companions: state.companions.slice(),
    say: state.say || null,
    end: extra.end || null,
    // name -> picture for the backpack, friends, the end screen and the hero book
    icons: Object.fromEntries([...state.inventory, ...state.companions, ...(extra.book?.friends || []), ...(extra.book?.ting || []),
      ...(extra.end ? [...extra.end.helped, ...extra.end.found, ...extra.end.friends.map((f) => f.name), ...extra.end.offer.map((o) => o.name)] : [])].map((n) => [n, iconOf(n)])),
    book: extra.book || null,
    pack: extra.pack || null,
    log: state.log.slice(-3).map((l) => l.replace(' (Forteller bestemte)', '')),
  };
}
