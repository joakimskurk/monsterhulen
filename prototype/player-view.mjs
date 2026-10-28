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

export function playerView(run, state) {
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
  const things = [];
  for (const n of run.nodes) {
    if (n.room !== here || done.has(n.id)) continue;
    if (n.kind === 'item') { if (!n.hidden) things.push({ id: n.id, kind: 'item', name: n.item.name, text: n.item.found || `Her ligger ${n.item.name.toLowerCase()}.` }); continue; }
    if (FIGURE_KINDS.has(n.kind)) things.push({ id: n.id, kind: 'figure', name: n.card.name, text: n.card.intro || '' });
  }
  for (const a of run.alternatives) if (a.room === here && !done.has(`alt:${a.room}`)) things.push({ id: `alt:${a.room}`, kind: 'item', name: a.item, text: `Her ligger ${a.item.toLowerCase()}.` });
  for (const a of run.ambient) if (a.room === here && !done.has(`amb:${a.room}`)) things.push({ id: `amb:${a.room}`, kind: 'figure', name: a.figure.name, text: a.figure.intro || '' });

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
    log: state.log.slice(-3).map((l) => l.replace(' (Forteller bestemte)', '')),
  };
}
