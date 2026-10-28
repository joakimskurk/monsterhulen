// The child's iPad: shows the filtered player view and sends requests to the DM.
// It never changes the game itself; the DM device accepts or declines every request.
const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, ...kids) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'onclick') node.addEventListener('click', v);
    else if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid !== null && kid !== undefined && kid !== false) node.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  return node;
};

let code = new URLSearchParams(location.hash.slice(1)).get('k');
let view = null;
let waiting = false; // one request at a time; cleared when the DM sends a new view

function status(text) { $('#status').textContent = text; }

async function request(type, payload) {
  if (waiting) return;
  waiting = true;
  document.body.classList.add('waiting');
  const actionId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  status('Sendt til Forteller …');
  try {
    await fetch(`/api/${code}/request`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ actionId, runCode: view.runCode, type, ...payload }) });
  } catch {
    status('Fikk ikke kontakt. Prøv igjen.');
    waiting = false;
    document.body.classList.remove('waiting');
  }
}

function connect() {
  $('#join').hidden = true;
  $('#game').hidden = false;
  status('Kobler til …');
  const source = new EventSource(`/api/${code}/player-stream`);
  source.addEventListener('view', (e) => { view = JSON.parse(e.data); waiting = false; document.body.classList.remove('waiting'); status(''); render(); });
  source.onerror = () => status('Mistet kontakten. Prøver igjen …');
}

function pick(title, options, onPick) {
  const dialog = $('#pick');
  $('#pickTitle').textContent = title;
  $('#pickList').replaceChildren(...(options.length ? options.map((o) => el('button', { onclick: () => { dialog.close(); onPick(o); } }, o.label)) : [el('p', { class: 'empty' }, 'Ingenting ennå.')]));
  dialog.showModal();
}

function render() {
  const v = view;
  $('#mission').textContent = v.mission.name;
  const say = $('#say');
  say.hidden = !v.say;
  say.textContent = v.say || '';
  $('#roomTitle').textContent = v.room.title.toUpperCase();
  $('#place').textContent = v.room.place;
  $('#things').replaceChildren(...(v.room.things.length ? v.room.things.map((t) => el('div', { class: 'thing' },
    el('h3', {}, t.name.toUpperCase()),
    t.text ? el('p', {}, t.text) : null,
    el('div', { class: 'actions' },
      t.kind === 'item'
        ? el('button', { onclick: () => request('TAKE', { thing: t.id, name: t.name }) }, 'TA')
        : [
            el('button', { onclick: () => pick(`GI NOE TIL ${t.name.toUpperCase()}`, v.inventory.map((name) => ({ label: name, name })), (o) => request('GIVE', { item: o.name, thing: t.id, name: t.name })) }, 'GI NOE'),
            v.companions.length ? el('button', { class: 'ghost', onclick: () => pick('HVEM SKAL HJELPE?', v.companions.map((name) => ({ label: name, name })), (o) => request('FRIEND', { friend: o.name, thing: t.id, name: t.name })) }, 'BE EN VENN HJELPE') : null,
          ],
    ))) : [el('p', {}, 'Det ser tomt ut her …')]));
  $('#inventory').replaceChildren(...(v.inventory.length ? v.inventory.map((n) => el('span', { class: 'chip' }, el('button', { class: 'ghost' }, n))) : [el('span', { class: 'empty' }, 'Tom')]));
  $('#companions').replaceChildren(...(v.companions.length ? v.companions.map((n) => el('span', {}, el('button', { class: 'ghost' }, n))) : [el('span', { class: 'empty' }, 'Ingen ennå')]));
  renderMap(v);
}

function renderMap(v) {
  const ns = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs) => { const n = document.createElementNS(ns, tag); for (const [k, val] of Object.entries(attrs)) n.setAttribute(k, val); return n; };
  const svg = mk('svg', { width: v.width, height: v.height, viewBox: `0 0 ${v.width} ${v.height}` });
  const at = Object.fromEntries(v.rooms.map((r) => [r.id, r]));
  for (const e of v.edges) svg.append(mk('line', { x1: at[e.a].x, y1: at[e.a].y, x2: at[e.b].x, y2: at[e.b].y, stroke: e.locked ? 'var(--gate)' : 'var(--line)', 'stroke-width': e.locked ? 7 : 4 }));
  for (const r of v.rooms) {
    const g = mk('g', { class: `room-node${r.canGo ? ' go' : ''}`, role: 'button', 'aria-label': `Rom ${r.label}` });
    g.append(mk('circle', { cx: r.x, cy: r.y, r: 26, fill: r.visited ? 'var(--zone0)' : 'var(--line)', stroke: r.id === v.here ? 'var(--here)' : 'transparent', 'stroke-width': 6 }));
    const t = mk('text', { x: r.x, y: r.y + 6, 'text-anchor': 'middle' });
    t.textContent = r.visited ? r.label : '?';
    g.append(t);
    if (r.canGo) g.addEventListener('click', () => request('MOVE', { room: r.id }));
    svg.append(g);
  }
  $('#map').replaceChildren(svg);
}

$('#search').addEventListener('click', () => view && request('SEARCH', { room: view.here }));
$('#pickCancel').addEventListener('click', () => $('#pick').close());
$('#joinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  code = $('#code').value.trim().toUpperCase();
  if (!code) return;
  location.hash = `k=${code}`;
  connect();
});
if (code) connect(); else $('#join').hidden = false;
