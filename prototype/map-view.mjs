// Draws the cave as the owner's concept art does (docs/v2/concept/, 2026-10-31): rooms of chunky
// slate-blue stone blocks around a brown dirt floor, torches on the walls, doors as openings in the
// wall with a wooden leaf, and the unknown as dark rock. Everything is CSS (an SVG ring of stones as a
// border image, a dirt pattern for the floor), so no image file is needed until the real tileset comes
// (content/assets.json, ui:*). Shared by the DM page and the iPad.
//
// model = {
//   bounds: { minX, minY, maxX, maxY },                     the grid to draw; outside rooms is fog
//   rooms:  [{ id, x, y, w, h, look: 'here' | 'visited' | 'unexplored', canGo, label, corner }],
//   doors:  [{ x, y, dir: 'n'|'e'|'s'|'w', kind: 'open' | 'closed' | 'locked' | 'loop' | 'secret', draw }],   see doorsFor
//   probes: [{ x, y, room, locked }],                        «?» or 🔒 in the fog beyond an exit
// }

// A ring of rounded stones, 96 × 96 with 32 px sides, cut as a border image (the middle is not drawn).
const STONES = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
<rect width='96' height='96' fill='#171a22'/>
<g stroke='#11141a' stroke-width='1.5'>
<rect x='2' y='2' width='28' height='28' rx='9' fill='#4d566b'/><rect x='66' y='2' width='28' height='28' rx='9' fill='#525c72'/>
<rect x='2' y='66' width='28' height='28' rx='9' fill='#48516a'/><rect x='66' y='66' width='28' height='28' rx='9' fill='#4d566b'/>
<rect x='33' y='2' width='13' height='28' rx='6' fill='#56617a'/><rect x='49' y='2' width='14' height='28' rx='6' fill='#454e62'/>
<rect x='33' y='66' width='14' height='28' rx='6' fill='#454e62'/><rect x='50' y='66' width='13' height='28' rx='6' fill='#56617a'/>
<rect x='2' y='33' width='28' height='13' rx='6' fill='#56617a'/><rect x='2' y='49' width='28' height='14' rx='6' fill='#454e62'/>
<rect x='66' y='33' width='28' height='14' rx='6' fill='#454e62'/><rect x='66' y='50' width='28' height='13' rx='6' fill='#56617a'/>
</g>
<g fill='#6d7891' opacity='.55'>
<rect x='6' y='5' width='14' height='6' rx='3'/><rect x='70' y='5' width='14' height='6' rx='3'/><rect x='6' y='69' width='14' height='6' rx='3'/><rect x='70' y='69' width='14' height='6' rx='3'/>
<rect x='36' y='5' width='7' height='5' rx='2'/><rect x='52' y='5' width='8' height='5' rx='2'/><rect x='36' y='69' width='8' height='5' rx='2'/><rect x='53' y='69' width='7' height='5' rx='2'/>
<rect x='5' y='36' width='8' height='5' rx='2'/><rect x='5' y='52' width='8' height='5' rx='2'/><rect x='69' y='36' width='8' height='5' rx='2'/><rect x='69' y='53' width='8' height='5' rx='2'/>
</g>
<g fill='#5f8a4a' opacity='.7'><circle cx='27' cy='27' r='2.5'/><circle cx='70' cy='9' r='2'/><circle cx='9' cy='70' r='2'/></g>
</svg>`)}`;
// Brown dirt with a few pebbles, one tile per cell.
const DIRT = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
<rect width='64' height='64' fill='#6b5238'/>
<g fill='#5c4530'><ellipse cx='12' cy='18' rx='5' ry='3'/><ellipse cx='44' cy='40' rx='6' ry='3.5'/><ellipse cx='30' cy='56' rx='3' ry='2'/><ellipse cx='54' cy='10' rx='3' ry='2'/></g>
<g fill='#7d6346'><ellipse cx='26' cy='30' rx='3' ry='2'/><ellipse cx='8' cy='46' rx='2.5' ry='1.5'/><ellipse cx='50' cy='24' rx='2' ry='1.5'/></g>
<g fill='#8a7052'><circle cx='40' cy='12' r='1.6'/><circle cx='18' cy='60' r='1.4'/><circle cx='58' cy='50' r='1.4'/></g>
</svg>`)}`;
// Dark rock for the unknown.
const ROCK = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='r'><feTurbulence type='fractalNoise' baseFrequency='0.06' numOctaves='4' seed='7' stitchTiles='stitch'/><feColorMatrix values='0.22 0 0 0 0.05  0.24 0 0 0 0.055  0.30 0 0 0 0.075  0 0 0 0 1'/></filter><rect width='240' height='240' filter='url(#r)'/></svg>`)}`;

const STYLE = `
.cave-wrap { container-type: inline-size; width: 100%; position: relative; z-index: 0; isolation: isolate; }
/* The map fills the width it is given: square cells of an equal share, everything scaled with them.
   Every tile is placed by hand on the grid, so a room's wall (one element over the whole room) can sit on top. */
.cave-grid { --cell: calc((100cqw - 18px) / var(--cols)); --wall: calc(var(--cell) * .3); display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); gap: 0; padding: 6px; border: 3px solid #0e1014; border-radius: 4px; box-sizing: border-box; width: 100%; overflow: hidden;
  background: linear-gradient(rgba(2, 3, 5, .82), rgba(2, 3, 5, .82)), url("${ROCK}") #0b0d12;
  box-shadow: inset 0 0 0 2px #e8b93a, inset 0 0 0 3px #8a6414, inset 0 0 60px rgba(0, 0, 0, .8); }
.cave-tile { position: relative; aspect-ratio: 1; }
/* The floor: brown dirt. The room she is in is lit; the rooms she has been in lie in half-dark. */
.cave-tile.room { background: url("${DIRT}") center / var(--cell) var(--cell); image-rendering: pixelated; filter: brightness(.7) saturate(.85); }
.cave-tile.here { filter: none; }
/* The wall: one ring of stone blocks around the whole room, over the floor. */
.cave-wall { position: relative; z-index: 2; pointer-events: none; box-sizing: border-box; border: var(--wall) solid transparent; border-image: url("${STONES}") 32 / var(--wall) round; filter: brightness(.72); }
.cave-wall.here { filter: none; }
.cave-wall.here { box-shadow: 0 0 0 max(2px, calc(var(--cell) * .05)) #e8b93a; }
.cave-wall.go { box-shadow: 0 0 0 max(2px, calc(var(--cell) * .04)) rgba(255, 224, 138, .75); }
/* Torches on the top wall (emoji as placeholder, content/assets.json ui:torch), with a glow. */
.cave-wall .flame { position: absolute; top: calc(var(--wall) * -1); width: calc(var(--cell) * .3); height: calc(var(--cell) * .3); font-size: calc(var(--cell) * .24); line-height: 1; display: grid; place-items: center; text-shadow: 0 0 calc(var(--cell) * .12) rgba(255, 170, 60, .9); animation: cave-flicker 1.6s ease-in-out infinite alternate; }
.cave-wall .flame::before { content: ''; position: absolute; inset: -60%; border-radius: 50%; background: radial-gradient(circle, rgba(255, 170, 60, .45), transparent 70%); z-index: -1; }
.cave-wall .flame.l { left: 0; } .cave-wall .flame.r { right: 0; }
/* DM only: rooms she has not been in are faint (what can be explored); the child gets fog instead. */
.cave-tile.unexplored, .cave-wall.unexplored, .cave-tile.unexplored .door { opacity: .3; }
/* Torchlight: a warm glow over the room she is in, reaching into the rock. */
.cave-tile .torch { position: absolute; z-index: 3; pointer-events: none; left: calc(var(--cell) * var(--rw) / 2); top: calc(var(--cell) * var(--rh) / 2); width: calc(var(--cell) * (max(var(--rw), var(--rh)) + 2.6)); height: calc(var(--cell) * (max(var(--rw), var(--rh)) + 2.6)); transform: translate(-50%, -50%); border-radius: 50%; mix-blend-mode: screen; opacity: .9;
  background: radial-gradient(circle, rgba(255, 180, 80, .5) 0%, rgba(255, 140, 50, .28) 32%, rgba(255, 110, 40, .1) 52%, transparent 68%); animation: cave-flicker 2.8s ease-in-out infinite alternate; }
@keyframes cave-flicker { from { opacity: .8; } to { opacity: 1; } }
.cave-tile.go { cursor: pointer; }
.cave-tile .mark, .cave-tile .corner { z-index: 6; }
.cave-tile .mark { position: absolute; inset: 0; display: grid; place-items: center; font: 700 calc(var(--cell) * .6)/1 'Courier New', monospace; color: #ffd95c; text-shadow: 2px 2px 0 #07050d; pointer-events: none; }
.cave-tile .corner { position: absolute; left: calc(var(--wall) + 2px); top: var(--wall); font: 700 max(10px, calc(var(--cell) * .3)) 'Courier New', monospace; color: #fff9e8; text-shadow: 1px 1px 0 #07050d; pointer-events: none; }
/* A door is an opening cut through the wall, centred on the boundary, of the same dirt as the floor,
   with a wooden leaf (below). Extra passage: stone edges; secret (DM only): dashed pink, no leaf. */
.cave-tile .door { position: absolute; z-index: 4; pointer-events: none; box-sizing: border-box; --t: calc(var(--wall) * 2.2); --edge: max(2px, calc(var(--cell) * .04));
  background: url("${DIRT}") center / var(--cell) var(--cell) #6b5238; image-rendering: pixelated; }
.cave-tile .door.dir-e, .cave-tile .door.dir-w { top: 25%; height: 50%; width: var(--t); border-top: var(--edge) solid #171a22; border-bottom: var(--edge) solid #171a22; }
.cave-tile .door.dir-n, .cave-tile .door.dir-s { left: 25%; width: 50%; height: var(--t); border-left: var(--edge) solid #171a22; border-right: var(--edge) solid #171a22; }
.cave-tile .door.dir-e { right: calc(var(--t) / -2); } .cave-tile .door.dir-w { left: calc(var(--t) / -2); }
.cave-tile .door.dir-s { bottom: calc(var(--t) / -2); } .cave-tile .door.dir-n { top: calc(var(--t) / -2); }
.cave-tile .door.loop { border-color: #8a94ad !important; }
/* Every door has a wooden leaf of planks. Closed: lying across the opening, centred on the boundary
   (locked: with a padlock on it). Open: turned 90 degrees on its hinge into the room farther from the
   entrance (into = 'out' across the boundary, 'in' back into this room). A door the child has just walked
   through swings open (.swing); the room behind it fades in (.fresh). */
.cave-tile .door .leaf { position: absolute; background: repeating-linear-gradient(90deg, #8a5a2b 0 28%, #6b4421 28% 33%); border: 1px solid #2b1a0c; box-shadow: inset 0 0 0 1px #a8743d; box-sizing: border-box; --thick: max(4px, calc(var(--cell) * .14)); --rot: 0deg; transform: rotate(var(--rot)); }
.cave-tile .door.dir-n .leaf, .cave-tile .door.dir-s .leaf { background: repeating-linear-gradient(0deg, #8a5a2b 0 28%, #6b4421 28% 33%); }
.cave-tile .door.dir-e .leaf, .cave-tile .door.dir-w .leaf { top: 0; height: 100%; left: calc(50% - var(--thick) / 2); width: var(--thick); transform-origin: 50% 0; }
.cave-tile .door.dir-n .leaf, .cave-tile .door.dir-s .leaf { left: 0; width: 100%; top: calc(50% - var(--thick) / 2); height: var(--thick); transform-origin: 0 50%; }
.cave-tile .door.open.dir-e .leaf.out, .cave-tile .door.open.dir-w .leaf.in, .cave-tile .door.open.dir-n .leaf.out, .cave-tile .door.open.dir-s .leaf.in,
.cave-tile .door.loop.dir-e .leaf.out, .cave-tile .door.loop.dir-w .leaf.in, .cave-tile .door.loop.dir-n .leaf.out, .cave-tile .door.loop.dir-s .leaf.in { --rot: -90deg; }
.cave-tile .door.open.dir-e .leaf.in, .cave-tile .door.open.dir-w .leaf.out, .cave-tile .door.open.dir-n .leaf.in, .cave-tile .door.open.dir-s .leaf.out,
.cave-tile .door.loop.dir-e .leaf.in, .cave-tile .door.loop.dir-w .leaf.out, .cave-tile .door.loop.dir-n .leaf.in, .cave-tile .door.loop.dir-s .leaf.out { --rot: 90deg; }
.cave-tile .door .leaf.swing { animation: cave-swing .5s ease-out both; }
@keyframes cave-swing { from { transform: rotate(0deg); } to { transform: rotate(var(--rot)); } }
.cave-tile .door.locked .leaf::after { content: '🔒'; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: calc(var(--cell) * .22); line-height: 1; }
.cave-tile.fresh, .cave-wall.fresh { animation: cave-fade .8s ease-out var(--delay, .35s) both; }
@keyframes cave-fade { from { opacity: var(--from, 0); } to { opacity: 1; } }
.cave-tile .door.secret { opacity: .55; border: 2px dashed #ff73b8 !important; }
/* Room symbols on the child's map (workshop K2; owner: in the middle): a box over the whole room
   (--rw × --rh cells), the symbols centred in it at --s cells each, as gold-framed tiles like the icons
   in the concept art. */
.cave-tile .marks { position: absolute; left: 0; top: 0; width: calc(100% * var(--rw)); height: calc(100% * var(--rh)); z-index: 5; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: calc(var(--cell) * .04); pointer-events: none; }
.cave-tile .mk { width: calc(var(--cell) * var(--s) * .92); height: calc(var(--cell) * var(--s) * .92); display: grid; place-items: center; border-radius: 4px; background: #1d2129; border: max(1px, calc(var(--cell) * .03)) solid #e8b93a; box-shadow: 0 0 0 1px #0e1014, inset 0 0 0 1px #8a6414; font-size: calc(var(--cell) * var(--s) * .55); line-height: 1; box-sizing: border-box; }
.cave-tile .mk img { width: 82%; height: 82%; object-fit: contain; image-rendering: pixelated; }
.cave-tile .mk-here { border-width: max(2px, calc(var(--cell) * .05)); border-color: #ffe08a; color: #ffe08a; font-weight: 800; }
.cave-tile .mk-looked { border-color: #7fe0a0; color: #7fe0a0; font-weight: 800; }
.cave-tile .mk-look { border-color: #8fa0c0; }
/* «?» beyond an exit: a gold-framed tile as in the concept art; a locked door is red. */
.cave-probe { width: 72%; height: 72%; margin: 14%; min-height: 0 !important; padding: 0 !important; border: 3px solid #0e1014 !important; border-radius: 4px; background: linear-gradient(#3a4150, #252a34) !important; color: #ffe08a !important; box-shadow: inset 0 0 0 2px #e8b93a, inset 0 0 0 3px #8a6414 !important; font: 800 calc(var(--cell) * .5)/1 'Courier New', monospace !important; cursor: pointer; text-shadow: 1px 1px 0 #0e1014 !important; }
.cave-probe.locked { background: linear-gradient(#5a2a2a, #3a1a1a) !important; cursor: default; }
`;
function ensureStyle() {
  if (document.getElementById('cave-style')) return;
  const s = document.createElement('style');
  s.id = 'cave-style';
  s.textContent = STYLE;
  document.head.append(s);
}
const span = (cls, text) => { const s = document.createElement('span'); s.className = cls; s.textContent = text; return s; };

// What each screen showed before, so a door the child just walked through swings open and the room
// behind it fades in, once. Keyed by `memo` (screen + run code); the first render animates nothing.
// A render during an animation continues it (negative delay) instead of starting it again.
const memory = new Map();
const SWING_MS = 1200;

// `maxWidth`: the largest the map may grow (it always fills the width it is given up to that).
export function caveGrid(model, { maxWidth = null, onRoom = null, memo = null } = {}) {
  ensureStyle();
  const now = Date.now();
  const before = memo ? memory.get(memo) : null;
  const seen = { doors: new Map(), rooms: new Map() };
  if (memo) memory.set(memo, seen);
  // Since when this was shown, or null if it is new now (nothing is new on the first render).
  const since = (map, key, first) => (before ? (before[map].has(key) ? before[map].get(key) : null) : first);
  const remember = (map, key, t) => { seen[map].set(key, t); return t; };
  const { minX, minY, maxX, maxY } = model.bounds;
  const wrap = document.createElement('div');
  wrap.className = 'cave-wrap';
  if (maxWidth) wrap.style.maxWidth = `${maxWidth}px`;
  const grid = document.createElement('div');
  grid.className = 'cave-grid';
  grid.style.setProperty('--cols', String(maxX - minX + 1));
  wrap.style.setProperty('--aspect', String((maxX - minX + 1) / (maxY - minY + 1))); // for a screen that fits it to a height
  wrap.append(grid);
  grid.setAttribute('role', 'img');
  grid.setAttribute('aria-label', 'Kart over hulen');

  const roomAt = (x, y) => model.rooms.find((r) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h);
  const probeAt = (x, y) => (model.probes || []).find((p) => p.x === x && p.y === y);
  // The room's fade-in, shared by its floor tiles and its wall: how long it has been shown.
  const freshness = (r) => {
    if (r.look === 'unexplored') { (seen.wasFaint ||= new Set()).add(r.id); return null; }
    const t = remember('rooms', r.id, since('rooms', r.id, 0) ?? now);
    return now - t < SWING_MS ? { from: before?.wasFaint?.has(r.id) ? '.3' : '0', delay: `${0.35 - (now - t) / 1000}s` } : null;
  };
  const fresh = new Map(model.rooms.map((r) => [r.id, freshness(r)]));
  const markFresh = (node, f) => { if (!f) return; node.classList.add('fresh'); node.style.setProperty('--from', f.from); node.style.setProperty('--delay', f.delay); };

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const tile = document.createElement('div');
      tile.className = 'cave-tile';
      tile.dataset.x = x; tile.dataset.y = y; // where a walk animates through (child.mjs)
      tile.style.gridColumn = String(x - minX + 1); tile.style.gridRow = String(y - minY + 1);
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
      markFresh(tile, fresh.get(r.id));
      if (r.canGo) tile.classList.add('go');
      tile.title = r.label || '';

      const doors = model.doors.filter((d) => d.x === x && d.y === y);
      for (const d of doors) {
        if (!d.draw) continue;
        const door = span(`door ${d.kind} dir-${d.dir}`, '');
        if (d.kind !== 'secret') {
          const leaf = span(`leaf ${d.into}`, '');
          if (d.kind === 'open' || d.kind === 'loop') {
            const key = `${d.x},${d.y},${d.dir}`;
            const t = remember('doors', key, since('doors', key, 0) ?? now);
            if (now - t < SWING_MS) { leaf.classList.add('swing'); leaf.style.animationDelay = `${-(now - t) / 1000}s`; }
          }
          door.append(leaf);
        }
        tile.append(door);
      }

      // Torchlight over the room she is in: one glow, centred on the room, from its first cell.
      if (r.look === 'here' && x === r.x && y === r.y) {
        const t = span('torch', '');
        t.style.setProperty('--rw', r.w); t.style.setProperty('--rh', r.h);
        tile.append(t);
      }
      // A star in the middle cell where the child is; the room number in the corner for the DM.
      const midX = r.x + Math.floor((r.w - 1) / 2), midY = r.y + Math.floor((r.h - 1) / 2);
      if (x === midX && y === midY && r.look === 'here' && !r.marks) tile.append(span('mark', '★'));
      if (x === r.x && y === r.y && r.corner) tile.append(span('corner', r.corner));
      // Symbols (child's map only, owner: in the middle): the player first, then the room's
      // own symbols, in a box over the whole room, sized so they always fit, also in a 1×1 room.
      if (r.marks && x === r.x && y === r.y) {
        const items = [...(r.look === 'here' ? [{ kind: 'here', icon: model.player || '★', label: 'Her er du' }] : []), ...r.marks];
        // Rows that give the biggest symbols: n symbols in `rows` rows across a w × h room (in cells).
        let best = 0;
        for (let rows = 1; rows <= Math.max(1, r.h * 2); rows++) best = Math.max(best, Math.min(0.62, (0.9 * r.w) / Math.ceil(items.length / rows), (0.9 * r.h) / rows));
        const box = span('marks', '');
        box.style.setProperty('--rw', r.w); box.style.setProperty('--rh', r.h); box.style.setProperty('--s', best.toFixed(3));
        for (const m of items) {
          const b = span(`mk mk-${m.kind}`, '');
          b.title = m.label || '';
          if (String(m.icon).startsWith('assets/')) b.append(Object.assign(document.createElement('img'), { src: `/${m.icon}`, alt: '' })); else b.textContent = m.icon;
          box.append(b);
        }
        tile.append(box);
      }
      if (onRoom) tile.addEventListener('click', () => onRoom(r.id));
      grid.append(tile);
    }
  }
  // The walls: one ring of stone blocks per room, over its floor tiles, with torches on the top wall.
  for (const r of model.rooms) {
    const wall = document.createElement('div');
    wall.className = `cave-wall ${r.look}${r.canGo ? ' go' : ''}`;
    wall.style.gridColumn = `${r.x - minX + 1} / span ${r.w}`; wall.style.gridRow = `${r.y - minY + 1} / span ${r.h}`;
    markFresh(wall, fresh.get(r.id));
    if (r.look !== 'unexplored') { wall.append(span('flame l', '🔥')); if (r.w > 1) wall.append(span('flame r', '🔥')); }
    grid.append(wall);
  }
  return wrap;
}

// Doors for the rooms that are drawn: one entry per drawn room side, and the door itself is drawn once
// (`draw`), as an opening across the boundary between the two rooms. An open door's leaf turns into the
// room farther from the entrance (`into`: 'out' across the boundary, 'in' into the room it is drawn from).
// What a door looks like now: locked until its gate is open, closed until the child has walked through
// it, then open (a leaf swung into the room farther in). Secret doors: `secret` (DM) or null (child).
export function doorKind(state, edges, { secret = null } = {}) {
  const openGates = new Set(state.openGates);
  const passed = new Set(state.passed || []);
  return (e) => (e.secret ? secret : e.gate !== null && !openGates.has(e.gate) ? 'locked'
    : !passed.has(edges.indexOf(e)) ? 'closed' : e.loop ? 'loop' : 'open');
}

// kindOf(edge) -> 'open' | 'closed' | 'locked' | 'loop' | 'secret' | null (not drawn); depth = distance from the entrance.
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

// ---------- walking far (owner, 2026-10-28: tap a room far away, and the avatar walks the way) ----------
// Only through what the child's map shows: rooms she has been in, and doors that are not locked (secret
// doors are never in the child's map). Pure, so tests/v2/walk.test.mjs checks it.
const STEP = { n: [0, -1], e: [1, 0], s: [0, 1], w: [-1, 0] };
const WALKABLE = new Set(['open', 'loop', 'closed']);
function roomAtIn(cave, x, y) { return cave.rooms.find((r) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h); }

// The door between two neighbouring rooms, on room a's side: { x, y, dir }, or null.
export function doorBetween(cave, a, b) {
  for (const d of cave.doors) {
    if (!WALKABLE.has(d.kind)) continue;
    const here = roomAtIn(cave, d.x, d.y), there = roomAtIn(cave, d.x + STEP[d.dir][0], d.y + STEP[d.dir][1]);
    if (here?.id === a && there?.id === b) return d;
  }
  return null;
}

// The shortest way from room `from` to room `to`, as the rooms to walk into (not `from`), or null.
export function walkPath(cave, from, to) {
  if (from === to) return [];
  const prev = new Map([[from, null]]), queue = [from];
  while (queue.length) {
    const r = queue.shift();
    for (const d of cave.doors) {
      if (!WALKABLE.has(d.kind)) continue;
      const here = roomAtIn(cave, d.x, d.y), there = roomAtIn(cave, d.x + STEP[d.dir][0], d.y + STEP[d.dir][1]);
      if (here?.id !== r || !there || prev.has(there.id)) continue;
      prev.set(there.id, r);
      if (there.id === to) { const path = []; for (let x = to; x !== from; x = prev.get(x)) path.unshift(x); return path; }
      queue.push(there.id);
    }
  }
  return null;
}
