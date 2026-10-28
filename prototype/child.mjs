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

// Read aloud with the device's own Norwegian voice, only when the child asks (workshop C2).
// No Norwegian voice on the device: no button.
let voice = null;
function findVoice() {
  if (!('speechSynthesis' in window)) return;
  const voices = speechSynthesis.getVoices();
  voice = voices.find((v) => /^(nb|no|nn)(-|_|$)/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { findVoice(); speechSynthesis.addEventListener('voiceschanged', () => { findVoice(); if (view) render(); }); }
function speak(text) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice; u.lang = voice.lang; u.rate = 0.9;
  speechSynthesis.speak(u);
}
const speaker = (text) => (voice ? el('button', { class: 'speak ghost', 'aria-label': 'Les høyt', onclick: () => speak(text) }, '🔊') : null);
const icon = (v, name) => v.icons?.[name] || '❔';
// An approved image (a path under assets/) or the placeholder (content/assets.json).
const pic = (value) => (String(value).startsWith('assets/') ? el('img', { class: 'thumb', src: `/${value}`, alt: '' }) : el('span', { class: 'icon' }, value));
const chip = (v, name, onclick) => el('button', { class: 'ghost chipbtn', ...(onclick ? { onclick } : {}) }, pic(icon(v, name)), ' ', name);

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
  say.replaceChildren(...[v.say || '', v.say ? speaker(v.say) : null].filter(Boolean));
  $('#roomTitle').textContent = v.room.title.toUpperCase();
  $('#place').textContent = v.room.place;
  $('#things').replaceChildren(...(v.room.things.length ? v.room.things.map((t) => el('div', { class: 'thing' },
    // Text first (owner, 2026-10-28); the picture is a small placeholder until assets are generated.
    el('h3', {}, pic(t.icon || '❔'), ' ', t.name.toUpperCase(), speaker(`${t.name}. ${t.text || ''}`)),
    t.text ? el('p', {}, t.text) : null,
    el('div', { class: 'actions' },
      t.kind === 'item'
        ? el('button', { onclick: () => request('TAKE', { thing: t.id, name: t.name }) }, 'TA')
        : [
            el('button', { onclick: () => pick(`GI NOE TIL ${t.name.toUpperCase()}`, v.inventory.map((name) => ({ label: name, name })), (o) => request('GIVE', { item: o.name, thing: t.id, name: t.name })) }, 'GI NOE'),
            v.companions.length ? el('button', { class: 'ghost', onclick: () => pick('HVEM SKAL HJELPE?', v.companions.map((name) => ({ label: name, name })), (o) => request('FRIEND', { friend: o.name, thing: t.id, name: t.name })) }, 'BE EN VENN HJELPE') : null,
          ],
    ))) : [el('p', {}, 'Det ser tomt ut her …')]));
  $('#inventory').replaceChildren(...(v.inventory.length ? v.inventory.map((n) => chip(v, n, voice ? () => speak(n) : null)) : [el('span', { class: 'empty' }, 'Tom')]));
  $('#companions').replaceChildren(...(v.companions.length ? v.companions.map((n) => chip(v, n, voice ? () => speak(n) : null)) : [el('span', { class: 'empty' }, 'Ingen ennå')]));
  renderMap(v);
  renderEnd(v);
  renderBook(v);
}

// The end of the run: what she did, and one of two lasting TING to choose (workshop B1, B3).
function renderEnd(v) {
  const box = $('#end');
  box.hidden = !v.end;
  if (!v.end) return;
  const e = v.end;
  const line = (title, items) => (items.length ? el('p', {}, el('b', {}, `${title}: `), items.join(', ')) : null);
  const pictures = (names) => names;
  box.replaceChildren(...[el('h1', {}, 'DU KLARTE DET! 🎉'), el('p', { class: 'headline' }, e.headline, speaker(e.headline)),
    line('DU HJALP', pictures(e.helped)), line('NYE VENNER', pictures(e.friends.map((f) => f.name))), line('DU FANT', pictures(e.found)),
    e.chosen ? el('p', { class: 'headline' }, `${e.chosen} er din nå!`)
      : e.offer.length ? el('div', {}, el('h2', {}, 'VELG EN TING TIL HELTEBOKA'),
        el('div', { class: 'chips' }, ...e.offer.map((o) => el('button', { class: 'big', onclick: () => request('PICK_TING', { id: o.id, name: o.name }) }, pic(icon(v, o.name)), ' ', o.name.toUpperCase())))) : null].filter(Boolean));
}

// Packing before the run, and the hero book itself (workshop B4).
function renderBook(v) {
  const pack = $('#pack');
  pack.hidden = !v.pack;
  if (v.pack) {
    pack.replaceChildren(el('h2', {}, 'TA MED FRA HELTEBOKA'), el('p', {}, 'Du kan ta med én venn og én ting.'),
      el('div', { class: 'chips' },
        ...v.pack.friends.filter((n) => !v.companions.includes(n)).map((n) => chip(v, n, () => request('BRING', { kind: 'friend', name: n }))),
        ...v.pack.ting.filter((n) => !v.inventory.includes(n)).map((n) => chip(v, n, () => request('BRING', { kind: 'ting', name: n })))));
  }
  const book = $('#book');
  book.hidden = !v.book || (!v.book.friends.length && !v.book.ting.length);
  if (book.hidden) return;
  book.replaceChildren(el('h2', {}, `HELTEBOKA · ${v.book.runs} LØP`),
    el('div', { class: 'chips' }, ...v.book.friends.map((n) => el('span', { class: 'sticker' }, pic(icon(v, n)), ' ', n)), ...v.book.ting.map((n) => el('span', { class: 'sticker ting' }, pic(icon(v, n)), ' ', n))));
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
