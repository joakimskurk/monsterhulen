// Abstract cave map for the prototype: rooms, edges, and a spine from start to end
// with obstacle edges ("gates") that split the cave into zones 0..G.
// Branches hang off the spine; extra loops and secret doors stay inside one zone.
// This stands in for the real generator in index.html, which has geometry and art.

export const LENGTHS = {
  KORT:   { rooms: 7,  gates: 1, budget: 2 },
  VANLIG: { rooms: 12, gates: 2, budget: 4 },
  STORT:  { rooms: 16, gates: 3, budget: 6 },
};

export function generateMap(rng, { rooms, gates }) {
  const spineLength = Math.max(gates * 2 + 2, Math.round(rooms * 0.45));
  const roomList = [];
  const edges = [];
  const addEdge = (a, b, extra = {}) => edges.push({ a, b, gate: null, secret: false, ...extra });

  // Gate k sits on the spine edge (gatePos[k]-1 -> gatePos[k]).
  const gatePos = [];
  for (let k = 1; k <= gates; k++) gatePos.push(Math.max(1, Math.round((k * (spineLength - 1)) / (gates + 1)) + (k === gates ? 1 : 0)));
  for (let k = 1; k < gatePos.length; k++) if (gatePos[k] <= gatePos[k - 1]) gatePos[k] = gatePos[k - 1] + 1;
  const zoneOfSpine = (j) => gatePos.filter((p) => p <= j).length;

  for (let j = 0; j < spineLength; j++) {
    roomList.push({ id: j, zone: zoneOfSpine(j), spine: true });
    if (j > 0) {
      const gateIndex = gatePos.indexOf(j);
      addEdge(j - 1, j, gateIndex >= 0 ? { gate: gateIndex + 1 } : {});
    }
  }

  // Branch rooms: earlier zones get more rooms so providers have somewhere to live.
  const degree = (id) => edges.filter((e) => e.a === id || e.b === id).length;
  while (roomList.length < rooms) {
    const parents = roomList.filter((r) => degree(r.id) < 4 && r.id !== spineLength - 1);
    const parent = rng.weighted(parents.map((r) => [r, r.zone === 0 ? 3 : r.zone === 1 ? 2 : 1]));
    const id = roomList.length;
    roomList.push({ id, zone: parent.zone, spine: false });
    addEdge(parent.id, id);
  }

  const adjacent = (a, b) => edges.some((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));
  const sameZonePairs = () => {
    const pairs = [];
    for (const x of roomList) for (const y of roomList) if (x.id < y.id && x.zone === y.zone && !adjacent(x.id, y.id)) pairs.push([x.id, y.id]);
    return pairs;
  };
  for (let i = 0; i < Math.floor(rooms / 6); i++) { const p = sameZonePairs(); if (p.length) { const [a, b] = rng.pick(p); addEdge(a, b, { loop: true }); } }
  { const p = sameZonePairs(); if (p.length) { const [a, b] = rng.pick(p); addEdge(a, b, { secret: true }); } }

  const map = { rooms: roomList, edges, start: 0, end: spineLength - 1, gates, gateRoom: {} };
  // The blocker of gate k stands in the spine room just before the gate.
  gatePos.forEach((p, k) => { map.gateRoom[k + 1] = p - 1; });
  map.distance = allDistances(map);
  return map;
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
