// Draws the cave as the owner's original does (V0.12.3, docs/reference/original-v0.12.3/): a grid of
// tiles, each room cell with a floor tile, stone walls where the room ends, corners, and door tiles
// where the doors are; everything else is fog. The tiles are the original's own
// (assets/tileset/v3-map/). Shared by the DM page and the iPad.
//
// model = {
//   bounds: { minX, minY, maxX, maxY },                     the grid to draw; outside rooms is fog
//   rooms:  [{ id, x, y, w, h, look: 'here' | 'visited' | 'unexplored', canGo, label, corner }],
//   doors:  [{ x, y, dir: 'n'|'e'|'s'|'w', kind: 'open' | 'locked' | 'loop' | 'secret', draw }],   see doorsFor
//   probes: [{ x, y, room, locked }],                        «?» or 🔒 in the fog beyond an exit
// }
const ROOT = '/assets/tileset/v3-map/';
const FLOORS = 9;
const SIDE = { n: 'N', e: 'E', s: 'S', w: 'W' };

const STYLE = `
.cave-wrap { container-type: inline-size; width: 100%; }
/* The map fills the width it is given: square tiles of an equal share, text scaled with them. */
.cave-grid { --cell: calc((100cqw - 18px) / var(--cols)); display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 0; background: #070b10; padding: 6px; border: 3px solid #07050d; border-radius: 6px; image-rendering: pixelated; box-sizing: border-box; width: 100%; }
.cave-tile { position: relative; aspect-ratio: 1; background: #070b10; }
.cave-tile img { position: absolute; inset: 0; width: 100%; height: 100%; image-rendering: pixelated; pointer-events: none; }
/* DM only: rooms she has not been in are faint (what can be explored); the child gets fog instead. */
.cave-tile.unexplored img, .cave-tile.unexplored .door { opacity: .3; }
/* One frame around the whole room (not one per tile): yellow where she is, light blue where she can go
   back to. The frame sits above the tile images. */
.cave-tile .frame { position: absolute; inset: 0; pointer-events: none; z-index: 2; border: 0 solid transparent; }
.cave-tile.here .frame { border-color: #ffd95c; }
.cave-tile.go { cursor: pointer; }
.cave-tile.go .frame { border-color: rgba(99, 242, 255, .8); }
.cave-tile .mark, .cave-tile .corner { z-index: 3; }
.cave-tile .mark { position: absolute; inset: 0; display: grid; place-items: center; font: 700 calc(var(--cell) * .6)/1 'Courier New', monospace; color: #ffd95c; text-shadow: 2px 2px 0 #07050d; pointer-events: none; }
.cave-tile .corner { position: absolute; left: 3px; top: 1px; font: 700 max(10px, calc(var(--cell) * .3)) 'Courier New', monospace; color: #fff9e8; text-shadow: 1px 1px 0 #07050d; pointer-events: none; }
/* A door is an opening through the wall: the walls stay, and floor stones are laid across both walls
   (each wall is 6 of 32 pixels) where the door is, so you see a passage of the same stones as the floor.
   Drawn once, centred on the boundary. Open: just the opening with dark edges; locked: a wooden door in
   the opening with a lock; extra passage: the opening with stone edges; secret (DM only): dashed pink. */
.cave-tile .door { position: absolute; z-index: 4; pointer-events: none; box-sizing: border-box; --t: calc(var(--cell) * .42); --edge: max(2px, calc(var(--cell) * .05));
  background: url('/assets/tileset/v3-map/floors-1.png') center / var(--cell) var(--cell); image-rendering: pixelated; }
.cave-tile .door.dir-e, .cave-tile .door.dir-w { top: 25%; height: 50%; width: var(--t); }
.cave-tile .door.dir-n, .cave-tile .door.dir-s { left: 25%; width: 50%; height: var(--t); }
.cave-tile .door.dir-e { right: calc(var(--t) / -2); } .cave-tile .door.dir-w { left: calc(var(--t) / -2); }
.cave-tile .door.dir-s { bottom: calc(var(--t) / -2); } .cave-tile .door.dir-n { top: calc(var(--t) / -2); }
.cave-tile .door.dir-e, .cave-tile .door.dir-w { border-top: var(--edge) solid #1a1426; border-bottom: var(--edge) solid #1a1426; }
.cave-tile .door.dir-n, .cave-tile .door.dir-s { border-left: var(--edge) solid #1a1426; border-right: var(--edge) solid #1a1426; }
.cave-tile .door.loop { border-color: #6f7690 !important; }
/* Every open door has a door leaf, swung open: hinged at one end of the opening and turned into the
   room farther from the entrance (into = 'out' across the boundary, 'in' back into this room). */
.cave-tile .door .leaf { position: absolute; background: #8a5a2b; border: 1px solid #3b2210; box-shadow: inset 0 0 0 1px #a8743d; --len: calc(var(--cell) * .4); --thick: max(3px, calc(var(--cell) * .09)); }
.cave-tile .door.dir-e .leaf, .cave-tile .door.dir-w .leaf { top: 0; height: var(--thick); width: var(--len); }
.cave-tile .door.dir-n .leaf, .cave-tile .door.dir-s .leaf { left: 0; width: var(--thick); height: var(--len); }
.cave-tile .door.dir-e .leaf.out, .cave-tile .door.dir-w .leaf.in { left: 50%; }
.cave-tile .door.dir-e .leaf.in, .cave-tile .door.dir-w .leaf.out { right: 50%; }
.cave-tile .door.dir-s .leaf.out, .cave-tile .door.dir-n .leaf.in { top: 50%; }
.cave-tile .door.dir-s .leaf.in, .cave-tile .door.dir-n .leaf.out { bottom: 50%; }
.cave-tile .door.locked { background: #8a5a2b; border: 2px solid #3b2210 !important; box-shadow: inset 0 0 0 2px #a8743d; }
.cave-tile .door.locked::after { content: ''; position: absolute; left: 50%; top: 50%; width: 30%; height: 30%; min-width: 5px; min-height: 5px; transform: translate(-50%, -50%); background: #ffd95c; border: 1px solid #3b2210; }
.cave-tile .door.secret { opacity: .55; border: 2px dashed #ff73b8 !important; }
/* «?» beyond an exit: a yellow square as in the original; a locked door is red. */
.cave-probe { width: 72%; height: 72%; margin: 14%; min-height: 0 !important; padding: 0 !important; border: 3px solid #07050d; border-radius: 3px; background: #ffd95c; color: #271b00; box-shadow: 2px 2px 0 #07050d; font: 800 calc(var(--cell) * .5)/1 'Courier New', monospace !important; cursor: pointer; }
.cave-probe.locked { background: #ff7a7a; cursor: default; }
`;
function ensureStyle() {
  if (document.getElementById('cave-style')) return;
  const s = document.createElement('style');
  s.id = 'cave-style';
  s.textContent = STYLE;
  document.head.append(s);
}
const img = (file, rot) => {
  const i = document.createElement('img');
  i.src = ROOT + file;
  i.alt = '';
  if (rot) i.style.transform = `rotate(${rot}deg)`;
  return i;
};
const span = (cls, text) => { const s = document.createElement('span'); s.className = cls; s.textContent = text; return s; };

// `maxWidth`: the largest the map may grow (it always fills the width it is given up to that).
export function caveGrid(model, { maxWidth = null, onRoom = null } = {}) {
  ensureStyle();
  const { minX, minY, maxX, maxY } = model.bounds;
  const wrap = document.createElement('div');
  wrap.className = 'cave-wrap';
  if (maxWidth) wrap.style.maxWidth = `${maxWidth}px`;
  const grid = document.createElement('div');
  grid.className = 'cave-grid';
  grid.style.setProperty('--cols', String(maxX - minX + 1));
  wrap.append(grid);
  grid.setAttribute('role', 'img');
  grid.setAttribute('aria-label', 'Kart over hulen');

  const roomAt = (x, y) => model.rooms.find((r) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h);
  const probeAt = (x, y) => (model.probes || []).find((p) => p.x === x && p.y === y);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const tile = document.createElement('div');
      tile.className = 'cave-tile';
      const r = roomAt(x, y);
      if (!r) {
        // Fog. Beyond an exit of the room the child is in: «?» to explore, 🔒 if the door is locked.
        const p = probeAt(x, y);
        if (p) {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = `cave-probe${p.locked ? ' locked' : ''}`;
          b.textContent = p.locked ? '🔒' : '?';
          b.setAttribute('aria-label', p.locked ? 'Låst dør' : 'Utforsk');
          if (!p.locked && onRoom) b.addEventListener('click', () => onRoom(p.room));
          tile.append(b);
        }
        grid.append(tile);
        continue;
      }
      tile.classList.add('room', r.look);
      if (r.canGo) tile.classList.add('go');
      tile.title = r.label || '';

      // Floor: one of the variants, fixed by position and rotated, as in the original.
      const seed = Math.abs(((x + 17) * 73856093) ^ ((y + 31) * 19349663));
      tile.append(img(`floors-${(seed % FLOORS) + 1}.png`, (Math.abs(seed >>> 3) % 4) * 90));

      const join = { N: roomAt(x, y - 1) === r, E: roomAt(x + 1, y) === r, S: roomAt(x, y + 1) === r, W: roomAt(x - 1, y) === r };
      const doors = Object.fromEntries(model.doors.filter((d) => d.x === x && d.y === y).map((d) => [SIDE[d.dir], d]));
      // Walls stay where the room ends, also at doors: the door is cut through them (see .door).
      for (const s of ['N', 'E', 'S', 'W']) if (!join[s]) tile.append(img(`wall-${s}.png`));
      if (!join.N && !join.W) tile.append(img('outer-NW.png'));
      if (!join.N && !join.E) tile.append(img('outer-NE.png'));
      if (!join.S && !join.E) tile.append(img('outer-SE.png'));
      if (!join.S && !join.W) tile.append(img('outer-SW.png'));
      // Inner corners only where a room is not a plain rectangle (kept for other room shapes).
      const diag = (dx, dy) => roomAt(x + dx, y + dy) === r;
      if (join.N && join.W && !diag(-1, -1)) tile.append(img('inner-NW.png'));
      if (join.N && join.E && !diag(1, -1)) tile.append(img('inner-NE.png'));
      if (join.S && join.E && !diag(1, 1)) tile.append(img('inner-SE.png'));
      if (join.S && join.W && !diag(-1, 1)) tile.append(img('inner-SW.png'));
      for (const d of Object.values(doors)) {
        if (!d.draw) continue;
        const door = span(`door ${d.kind} dir-${d.dir}`, '');
        if (d.kind === 'open' || d.kind === 'loop') door.append(span(`leaf ${d.into}`, ''));
        tile.append(door);
      }

      // The frame: a border only on the sides where the room ends.
      if (r.look === 'here' || r.canGo) {
        const f = span('frame', '');
        const w = r.look === 'here' ? '3px' : '2px';
        if (!join.N) f.style.borderTopWidth = w;
        if (!join.E) f.style.borderRightWidth = w;
        if (!join.S) f.style.borderBottomWidth = w;
        if (!join.W) f.style.borderLeftWidth = w;
        tile.append(f);
      }
      // A star in the middle cell where the child is; the room number in the corner for the DM.
      const midX = r.x + Math.floor((r.w - 1) / 2), midY = r.y + Math.floor((r.h - 1) / 2);
      if (x === midX && y === midY && r.look === 'here') tile.append(span('mark', '★'));
      if (x === r.x && y === r.y && r.corner) tile.append(span('corner', r.corner));
      if (onRoom) tile.addEventListener('click', () => onRoom(r.id));
      grid.append(tile);
    }
  }
  return wrap;
}

// Doors for the rooms that are drawn: one entry per drawn room side, and the door itself is drawn once
// (`draw`), as an opening across the boundary between the two rooms. An open door's leaf turns into the
// room farther from the entrance (`into`: 'out' across the boundary, 'in' into the room it is drawn from).
// kindOf(edge) -> 'open' | 'locked' | 'loop' | 'secret' | null (not drawn); depth = distance from the entrance.
export function doorsFor(edges, drawn, kindOf, depth = {}) {
  const opp = { n: 's', e: 'w', s: 'n', w: 'e' };
  const out = [];
  for (const e of edges) {
    const kind = kindOf(e);
    if (!kind) continue;
    const farIsB = (depth[e.b] ?? 0) >= (depth[e.a] ?? 0);
    if (drawn.has(e.a)) out.push({ x: e.aCell.x, y: e.aCell.y, dir: e.aDir, kind, draw: true, into: farIsB ? 'out' : 'in' });
    if (drawn.has(e.b)) out.push({ x: e.bCell.x, y: e.bCell.y, dir: opp[e.aDir], kind, draw: !drawn.has(e.a), into: farIsB ? 'in' : 'out' });
  }
  return out;
}

// The grid to draw: all rooms of the cave with one cell of fog around (the original does the same).
export function caveBounds(rooms) {
  return {
    minX: Math.min(...rooms.map((r) => r.x)) - 1, minY: Math.min(...rooms.map((r) => r.y)) - 1,
    maxX: Math.max(...rooms.map((r) => r.x + r.w - 1)) + 1, maxY: Math.max(...rooms.map((r) => r.y + r.h - 1)) + 1,
  };
}
