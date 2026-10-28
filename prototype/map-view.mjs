// Draws the cave as in the owner's original: rooms of different sizes on a grid, doors in the walls,
// fog over what is not explored yet. Shared by the DM page and the iPad, so both see the same cave.
//
// model = {
//   rooms: [{ id, x, y, w, h, label, tone, look: 'here' | 'visited' | 'fog' | 'closed' | 'open', canGo, corner }],
//   doors: [{ aCell, bCell, dir, kind: 'open' | 'locked' | 'unlocked' | 'secret' }],
// }
const NS = 'http://www.w3.org/2000/svg';
const mk = (tag, attrs = {}, text) => {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v !== undefined && v !== null) n.setAttribute(k, v);
  if (text !== undefined) n.textContent = text;
  return n;
};

// Palette from the original (V0.12.3): deep purple floor, pixel-dark walls, warm marks.
const FLOOR = { LYS: '#6b4ab0', MØRK: '#3f2c72', RAR: '#7b3f91', BLANDET: '#56408a' };
const COLORS = { wall: '#07050d', fog: '#1d1533', closed: '#2a2045', text: '#fff9e8', muted: '#c5b9ff', here: '#ffd95c', go: '#63f2ff', gate: '#ff7a7a', gateOpen: '#7dff9a', door: '#c5b9ff', secret: '#ff73b8' };

// Fits a room name into its width: smaller text first, then shortened with … (the full name is in
// the room's tooltip and in the room title).
function fitLabel(label, width) {
  const size = Math.max(8, Math.min(13, (width - 8) / Math.max(4, label.length * 0.62)));
  const fits = Math.floor((width - 8) / (size * 0.62));
  return { size, text: label.length > fits ? `${label.slice(0, Math.max(1, fits - 1))}…` : label };
}

export function caveSvg(model, { cell = 44, onRoom = null } = {}) {
  const xs = model.rooms.flatMap((r) => [r.x, r.x + r.w]);
  const ys = model.rooms.flatMap((r) => [r.y, r.y + r.h]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const pad = cell * 0.35;
  const W = (maxX - minX) * cell + 2 * pad, H = (maxY - minY) * cell + 2 * pad;
  const px = (x) => (x - minX) * cell + pad, py = (y) => (y - minY) * cell + pad;
  const svg = mk('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, class: 'cave', role: 'img', 'aria-label': 'Kart over hulen' });
  svg.style.maxWidth = '100%';
  svg.style.height = 'auto';

  for (const r of model.rooms) {
    const g = mk('g', { class: `cave-room ${r.look}${r.canGo ? ' go' : ''}`, role: onRoom ? 'button' : null, 'aria-label': `${r.label}` });
    const fill = r.look === 'fog' ? COLORS.fog : r.look === 'closed' ? COLORS.closed : FLOOR[r.tone] || FLOOR.BLANDET;
    const stroke = r.look === 'here' ? COLORS.here : r.canGo ? COLORS.go : COLORS.wall;
    g.append(mk('rect', { x: px(r.x) + 3, y: py(r.y) + 3, width: r.w * cell - 6, height: r.h * cell - 6, rx: 4, fill, stroke, 'stroke-width': r.look === 'here' || r.canGo ? 4 : 3 }));
    const cx = px(r.x) + (r.w * cell) / 2, cy = py(r.y) + (r.h * cell) / 2;
    if (r.look === 'here') g.append(mk('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', 'font-size': 18, fill: COLORS.here }, '★'));
    const label = r.label || '';
    const fit = r.look === 'fog' ? { size: 18, text: label } : fitLabel(label, r.w * cell);
    g.append(mk('title', {}, label));
    g.append(mk('text', { x: cx, y: r.look === 'here' ? cy + 14 : cy + 4, 'text-anchor': 'middle', 'font-size': fit.size, 'font-family': 'Courier New, monospace', 'font-weight': 700, fill: r.look === 'fog' ? COLORS.muted : COLORS.text }, fit.text));
    if (r.corner) g.append(mk('text', { x: px(r.x) + 8, y: py(r.y) + 15, 'font-size': 10, 'font-family': 'Courier New, monospace', fill: COLORS.muted }, r.corner));
    if (onRoom) { g.style.cursor = 'pointer'; g.addEventListener('click', () => onRoom(r.id)); }
    svg.append(g);
  }

  // Doors sit on the wall between the two cells they join, bridging the gap between the rooms.
  for (const d of model.doors) {
    const a = d.aCell;
    const vertical = d.dir === 'e' || d.dir === 'w';
    const wx = d.dir === 'e' ? px(a.x + 1) : d.dir === 'w' ? px(a.x) : px(a.x) + cell / 2;
    const wy = d.dir === 's' ? py(a.y + 1) : d.dir === 'n' ? py(a.y) : py(a.y) + cell / 2;
    const [w, h] = vertical ? [12, cell * 0.42] : [cell * 0.42, 12];
    const color = { open: COLORS.door, locked: COLORS.gate, unlocked: COLORS.gateOpen, secret: 'none' }[d.kind];
    svg.append(mk('rect', { x: wx - w / 2, y: wy - h / 2, width: w, height: h, fill: color, stroke: d.kind === 'secret' ? COLORS.secret : COLORS.wall, 'stroke-width': 2, 'stroke-dasharray': d.kind === 'secret' ? '3 3' : null }));
    if (d.kind === 'locked') svg.append(mk('text', { x: wx, y: wy + 5, 'text-anchor': 'middle', 'font-size': 13 }, '🔒'));
  }
  return svg;
}
