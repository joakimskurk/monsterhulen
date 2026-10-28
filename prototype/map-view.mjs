// Draws the cave as the owner's original does (V0.12.3, docs/reference/original-v0.12.3/): a grid of
// tiles, each room cell with a floor tile, stone walls where the room ends, corners, and door tiles
// where the doors are; everything else is fog. The tiles are the original's own
// (assets/tileset/v3-map/). Shared by the DM page and the iPad.
//
// model = {
//   bounds: { minX, minY, maxX, maxY },                     the grid to draw; outside rooms is fog
//   rooms:  [{ id, x, y, w, h, look: 'here' | 'visited' | 'open' | 'closed', canGo, label, corner }],
//   doors:  [{ x, y, dir: 'n'|'e'|'s'|'w', kind: 'open' | 'locked' | 'unlocked' | 'passage' | 'secret' }],
//   probes: [{ x, y, room, locked }],                        «?» or 🔒 in the fog beyond an exit
// }
const ROOT = '/assets/tileset/v3-map/';
const FLOORS = 9;
const SIDE = { n: 'N', e: 'E', s: 'S', w: 'W' };
// Door kinds in the model -> the original's connection tiles.
const DOOR_TILE = { open: 'door_open', unlocked: 'door_open', locked: 'door_locked', passage: 'passage_open', secret: 'passage_open' };

const STYLE = `
.cave-wrap { container-type: inline-size; width: 100%; }
/* The map fills the width it is given: square tiles of an equal share, text scaled with them. */
.cave-grid { --cell: calc((100cqw - 18px) / var(--cols)); display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 0; background: #070b10; padding: 6px; border: 3px solid #07050d; border-radius: 6px; image-rendering: pixelated; box-sizing: border-box; width: 100%; }
.cave-tile { position: relative; aspect-ratio: 1; background: #070b10; overflow: hidden; }
.cave-tile img { position: absolute; inset: 0; width: 100%; height: 100%; image-rendering: pixelated; pointer-events: none; }
.cave-tile.closed img { filter: brightness(.45) saturate(.6); }
/* Frames sit above the tile images (a plain inset shadow would be hidden under them). */
.cave-tile.here::after, .cave-tile.go::after { content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.cave-tile.here::after { box-shadow: inset 0 0 0 3px #ffd95c; }
.cave-tile.go { cursor: pointer; }
.cave-tile.go::after { box-shadow: inset 0 0 0 2px rgba(99, 242, 255, .75); }
.cave-tile .mark, .cave-tile .corner { z-index: 3; }
.cave-tile .mark { position: absolute; inset: 0; display: grid; place-items: center; font: 700 calc(var(--cell) * .6)/1 'Courier New', monospace; color: #ffd95c; text-shadow: 2px 2px 0 #07050d; pointer-events: none; }
.cave-tile .corner { position: absolute; left: 3px; top: 1px; font: 700 max(10px, calc(var(--cell) * .3)) 'Courier New', monospace; color: #fff9e8; text-shadow: 1px 1px 0 #07050d; pointer-events: none; }
.cave-tile .secret { position: absolute; inset: 2px; border: 2px dashed #ff73b8; pointer-events: none; }
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
      for (const s of ['N', 'E', 'S', 'W']) if (!join[s] && !doors[s]) tile.append(img(`wall-${s}.png`));
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
      for (const [s, d] of Object.entries(doors)) {
        tile.append(img(`connection-${DOOR_TILE[d.kind]}-${s}.png`));
        if (d.kind === 'secret') tile.append(span('secret', ''));
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

// Door tiles for the rooms that are drawn: a door sits on the cell of each drawn room it belongs to.
export function doorsFor(edges, drawn, kindOf) {
  const opp = { n: 's', e: 'w', s: 'n', w: 'e' };
  const out = [];
  for (const e of edges) {
    const kind = kindOf(e);
    if (!kind) continue;
    if (drawn.has(e.a)) out.push({ x: e.aCell.x, y: e.aCell.y, dir: e.aDir, kind });
    if (drawn.has(e.b)) out.push({ x: e.bCell.x, y: e.bCell.y, dir: opp[e.aDir], kind });
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
