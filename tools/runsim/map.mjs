// Cave map: rooms of different sizes on a grid, doors on shared walls (one door per room side).
// The layout follows the owner's original generator (Monsterhulen V0.12.3, "EVENTYRKRYPER V0.4
// PROCEDURAL DUNGEON CORE"): rooms grow outward from the start room as a tree, each new room is a
// rectangle placed against a free wall of an existing room, with a door somewhere on the shared wall.
//
// On top of that the V2 generator needs: a spine from start to the farthest room, obstacle doors
// ("gates") on the spine that split the cave into zones 0..G, and a few extra doors inside one zone
// (open loops and one secret door). In a tree every gate is a cut edge, so the zones cannot be
// bypassed; extra doors only ever join rooms of the same zone.

export const LENGTHS = {
  KORT:   { rooms: 7,  gates: 1, budget: 2 },
  VANLIG: { rooms: 12, gates: 2, budget: 4 },
  STORT:  { rooms: 16, gates: 3, budget: 6 },
};

export const DIRS = {
  n: { dx: 0, dy: -1, opp: 's' },
  e: { dx: 1, dy: 0, opp: 'w' },
  s: { dx: 0, dy: 1, opp: 'n' },
  w: { dx: -1, dy: 0, opp: 'e' },
};
// Room sizes in cells, as in the original (small rooms are more common).
const SHAPES = [[1, 1], [1, 1], [1, 2], [2, 1], [1, 2], [2, 1], [2, 2], [1, 3], [3, 1], [2, 3], [3, 2]];

const overlaps = (c, rooms) => rooms.some((r) => c.x < r.x + r.w && c.x + c.w > r.x && c.y < r.y + r.h && c.y + c.h > r.y);

// Cell pairs on the wall that room a shares with room b in direction dir (a -> b).
export function sharedWall(a, b, dir) {
  const pairs = [];
  if (dir === 'e' && b.x === a.x + a.w) for (let y = Math.max(a.y, b.y); y <= Math.min(a.y + a.h - 1, b.y + b.h - 1); y++) pairs.push({ aCell: { x: a.x + a.w - 1, y }, bCell: { x: b.x, y } });
  if (dir === 'w' && b.x + b.w === a.x) for (let y = Math.max(a.y, b.y); y <= Math.min(a.y + a.h - 1, b.y + b.h - 1); y++) pairs.push({ aCell: { x: a.x, y }, bCell: { x: b.x + b.w - 1, y } });
  if (dir === 's' && b.y === a.y + a.h) for (let x = Math.max(a.x, b.x); x <= Math.min(a.x + a.w - 1, b.x + b.w - 1); x++) pairs.push({ aCell: { x, y: a.y + a.h - 1 }, bCell: { x, y: b.y } });
  if (dir === 'n' && b.y + b.h === a.y) for (let x = Math.max(a.x, b.x); x <= Math.min(a.x + a.w - 1, b.x + b.w - 1); x++) pairs.push({ aCell: { x, y: a.y }, bCell: { x, y: b.y + b.h - 1 } });
  return pairs;
}

const usedDirs = (id, edges) => new Set(edges.flatMap((e) => (e.a === id ? [e.aDir] : e.b === id ? [e.bDir] : [])));
const degree = (id, edges) => edges.filter((e) => e.a === id || e.b === id).length;

function candidatesFor(parent, dir, w, h, rng) {
  const out = [];
  if (dir === 'e' || dir === 'w') for (let y = parent.y - h + 1; y <= parent.y + parent.h - 1; y++) out.push({ x: dir === 'e' ? parent.x + parent.w : parent.x - w, y, w, h });
  else for (let x = parent.x - w + 1; x <= parent.x + parent.w - 1; x++) out.push({ x, y: dir === 's' ? parent.y + parent.h : parent.y - h, w, h });
  return rng.shuffle(out);
}

// Grows a tree of rectangular rooms from the start room. Returns null if it gets stuck.
function growTree(rng, rooms, size) {
  const list = [{ id: 0, x: Math.floor(size / 2) - 1, y: Math.floor(size / 2) - 1, w: 2, h: 2 }];
  const edges = [];
  for (let guard = 0; list.length < rooms && guard < 1200; guard++) {
    const open = list.filter((r) => degree(r.id, edges) < 3 && usedDirs(r.id, edges).size < 4);
    if (!open.length) return null;
    // Extend outward often, but also branch from older rooms (as the original does).
    const depth = bfs(list, edges, 0);
    const ordered = open.slice().sort((a, b) => (depth[b.id] || 0) - (depth[a.id] || 0));
    const roll = rng();
    const pool = roll < 0.48 ? ordered.slice(0, Math.max(1, Math.ceil(ordered.length * 0.4))) : roll < 0.82 ? open : ordered.slice(Math.floor(ordered.length * 0.35));
    const parent = rng.pick(pool.length ? pool : open);
    const used = usedDirs(parent.id, edges);
    let placed = null;
    for (const dir of rng.shuffle(['n', 'e', 's', 'w'].filter((d) => !used.has(d)))) {
      for (const [w, h] of rng.shuffle(SHAPES)) {
        for (const c of candidatesFor(parent, dir, w, h, rng)) {
          if (c.x < 0 || c.y < 0 || c.x + c.w > size || c.y + c.h > size || overlaps(c, list)) continue;
          const pairs = sharedWall(parent, c, dir);
          if (!pairs.length) continue;
          placed = { room: { id: list.length, ...c }, dir, door: rng.pick(pairs) };
          break;
        }
        if (placed) break;
      }
      if (placed) break;
    }
    if (!placed) continue;
    list.push(placed.room);
    edges.push({ a: parent.id, b: placed.room.id, gate: null, secret: false, aDir: placed.dir, bDir: DIRS[placed.dir].opp, aCell: placed.door.aCell, bCell: placed.door.bCell });
  }
  return list.length === rooms ? { list, edges } : null;
}

function bfs(list, edges, from) {
  const dist = { [from]: 0 }, queue = [from];
  while (queue.length) {
    const u = queue.shift();
    for (const e of edges) {
      const v = e.a === u ? e.b : e.b === u ? e.a : null;
      if (v !== null && dist[v] === undefined) { dist[v] = dist[u] + 1; queue.push(v); }
    }
  }
  return dist;
}

// Gates on spine edges: gate k on the edge spine[p-1] -> spine[p]. Never at the entrance (p >= 2),
// and the goal room stays beyond the last gate. Among all placements, prefer a large first zone
// (that is where the chains need room: most of a short cave, half of a normal one) and no tiny
// zones in between; the last zone may be just the goal room. The previous abstract map gave the
// first zone the same share.
function chooseGates(list, edges, spine, gates, rng) {
  const positions = [];
  for (let p = 2; p <= spine.length - 1; p++) positions.push(p);
  const combos = [];
  const pick = (from, chosen) => {
    if (chosen.length === gates) { combos.push(chosen.slice()); return; }
    for (let i = from; i < positions.length; i++) { chosen.push(positions[i]); pick(i + 1, chosen); chosen.pop(); }
  };
  pick(0, []);
  let best = null;
  for (const combo of combos) {
    const gateEdges = combo.map((p) => edges.find((e) => (e.a === spine[p - 1] && e.b === spine[p]) || (e.b === spine[p - 1] && e.a === spine[p])));
    const zone = zonesFor(list, edges, gateEdges);
    const sizes = Array.from({ length: gates + 1 }, (_, z) => list.filter((r) => zone[r.id] === z).length);
    if (sizes.some((s) => s === 0)) continue;
    const target = list.length * ([0, 0.8, 0.55, 0.45][gates] ?? 0.45);
    const score = -Math.abs(sizes[0] - target) - sizes.slice(1, -1).filter((s) => s < 2).length * 2 + rng() * 0.5;
    if (!best || score > best.score) best = { score, combo, gateEdges, zone, sizes };
  }
  return best;
}

// Zone of each room = number of gate doors crossed on the way from the start (unique in a tree).
function zonesFor(list, edges, gateEdges) {
  const zone = { 0: 0 }, queue = [0];
  while (queue.length) {
    const u = queue.shift();
    for (const e of edges) {
      const v = e.a === u ? e.b : e.b === u ? e.a : null;
      if (v === null || zone[v] !== undefined) continue;
      zone[v] = zone[u] + (gateEdges.includes(e) ? 1 : 0);
      queue.push(v);
    }
  }
  return zone;
}

// Extra doors between rooms of the same zone that share a wall, with a free side on both rooms
// and some distance between them (so the door is a real shortcut, as in the original).
function extraDoorCandidates(list, edges, zone) {
  const out = [];
  for (const a of list) for (const b of list) {
    if (a.id >= b.id || zone[a.id] !== zone[b.id]) continue;
    if (edges.some((e) => (e.a === a.id && e.b === b.id) || (e.a === b.id && e.b === a.id))) continue;
    for (const dir of ['n', 'e', 's', 'w']) {
      const pairs = sharedWall(a, b, dir);
      if (!pairs.length) continue;
      if (usedDirs(a.id, edges).has(dir) || usedDirs(b.id, edges).has(DIRS[dir].opp)) continue;
      if ((bfs(list, edges, a.id)[b.id] ?? 0) < 3) continue;
      out.push({ a, b, dir, door: pairs[Math.floor(pairs.length / 2)] });
    }
  }
  return out;
}

export function generateMap(rng, { rooms, gates }) {
  const size = rooms <= 7 ? 11 : rooms <= 12 ? 13 : 15;
  for (let attempt = 0; attempt < 200; attempt++) {
    const tree = growTree(rng, rooms, size);
    if (!tree) continue;
    const { list, edges } = tree;
    if (list.filter((r) => degree(r.id, edges) >= 3).length < (rooms >= 12 ? 2 : 1)) continue; // some branching

    // Spine: the path from the start to the farthest room.
    const dist = bfs(list, edges, 0);
    const end = Number(Object.entries(dist).sort((x, y) => y[1] - x[1] || x[0] - y[0])[0][0]);
    const spine = [end];
    while (spine[0] !== 0) {
      const cur = spine[0];
      const prev = edges.map((e) => (e.a === cur ? e.b : e.b === cur ? e.a : null)).find((v) => v !== null && dist[v] === dist[cur] - 1);
      spine.unshift(prev);
    }
    if (spine.length < gates + 2) continue;
    const chosen = chooseGates(list, edges, spine, gates, rng);
    if (!chosen) continue;
    chosen.gateEdges.forEach((e, k) => { e.gate = k + 1; });

    // Extra doors inside one zone: open loops, then one secret door.
    for (let i = 0; i < Math.floor(rooms / 6); i++) {
      const c = extraDoorCandidates(list, edges, chosen.zone);
      if (!c.length) break;
      const x = rng.pick(c);
      edges.push({ a: x.a.id, b: x.b.id, gate: null, secret: false, loop: true, aDir: x.dir, bDir: DIRS[x.dir].opp, aCell: x.door.aCell, bCell: x.door.bCell });
    }
    {
      const c = extraDoorCandidates(list, edges, chosen.zone);
      if (c.length) {
        const x = rng.pick(c);
        edges.push({ a: x.a.id, b: x.b.id, gate: null, secret: true, aDir: x.dir, bDir: DIRS[x.dir].opp, aCell: x.door.aCell, bCell: x.door.bCell });
      }
    }

    const spineSet = new Set(spine);
    const roomList = list.map((r) => ({ id: r.id, x: r.x, y: r.y, w: r.w, h: r.h, zone: chosen.zone[r.id], spine: spineSet.has(r.id) }));
    const map = { rooms: roomList, edges, start: 0, end, gates, gateRoom: {}, size };
    // The blocker of gate k stands in the spine room just before the gate door.
    chosen.combo.forEach((p, k) => { map.gateRoom[k + 1] = spine[p - 1]; });
    map.distance = allDistances(map);
    return map;
  }
  throw new Error('could not lay out a cave map');
}

export function neighbours(map, id, { openGates = new Set(), secrets = false, allGates = false } = {}) {
  const out = [];
  for (const e of map.edges) {
    if (e.secret && !secrets) continue;
    if (e.gate !== null && !allGates && !openGates.has(e.gate)) continue;
    if (e.a === id) out.push(e.b);
    else if (e.b === id) out.push(e.a);
  }
  return out;
}

export function reachable(map, options) {
  const seen = new Set([map.start]);
  const queue = [map.start];
  while (queue.length) {
    const id = queue.shift();
    for (const n of neighbours(map, id, options)) if (!seen.has(n)) { seen.add(n); queue.push(n); }
  }
  return seen;
}

function allDistances(map) {
  const dist = {};
  for (const r of map.rooms) {
    const d = { [r.id]: 0 };
    const queue = [r.id];
    while (queue.length) {
      const id = queue.shift();
      for (const n of neighbours(map, id, { allGates: true })) if (d[n] === undefined) { d[n] = d[id] + 1; queue.push(n); }
    }
    dist[r.id] = d;
  }
  return dist;
}
