// The child's iPad: shows the filtered player view and sends requests to the DM.
// It never changes the game itself; the DM device accepts or declines every request.
import { caveGrid } from './map-view.mjs';
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

// The code from the link, or the last one used: opened from the home screen, the app has no code in its link.
const CODE_KEY = 'monsterhulen-barn:kode';
let code = new URLSearchParams(location.hash.slice(1)).get('k');
let fromStore = false;
try { if (code) localStorage.setItem(CODE_KEY, code); else { code = localStorage.getItem(CODE_KEY); fromStore = !!code; } } catch { /* private mode */ }
let view = null;
let waiting = false; // one request at a time; cleared when the DM sends a new view
let seenNews = -1;    // the newest news line already shown, so a new one can stand out
let knownItems = null; // backpack names from the previous view, to mark what is new

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
  // An old code from last time that no DM is using any more: ask for the new one.
  if (fromStore) setTimeout(() => { if (!view) { source.close(); $('#game').hidden = true; $('#join').hidden = false; $('#code').value = code; } }, 6000);
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
  // What just happened, so a taken or given thing never passes silently.
  const news = $('#news');
  news.hidden = !v.news || v.news.kind === 'item';
  if (v.news && v.news.kind !== 'item') {
    news.textContent = v.news.text;
    news.classList.toggle('fresh', v.news.id > seenNews);
    seenNews = Math.max(seenNews, v.news.id);
  }
  $('#place').textContent = v.room.place;
  $('#things').classList.toggle('many', v.room.things.length >= 3);
  $('#things').replaceChildren(...(v.room.things.length ? v.room.things.map((t) => el('div', { class: 'thing' },
    // Text first (owner, 2026-10-28); the picture is a small placeholder until assets are generated.
    el('h3', {}, pic(t.icon || '❔'), ' ', t.name.toUpperCase(), speaker(`${t.name}. ${t.text || ''}`)),
    t.text ? el('p', {}, t.text) : null,
    el('div', { class: 'actions' },
      t.kind === 'item' || (t.kind === 'source' && !t.fill)
        ? el('button', { onclick: () => request('TAKE', { thing: t.id, name: t.name }) }, t.kind === 'source' ? 'HENT' : 'TA')
        : t.kind === 'exit'
          ? el('button', { onclick: () => request('TAKE', { thing: t.id, name: t.name }) }, 'KOM FRAM 🎉')
        : t.kind === 'source'
          ? el('button', { onclick: () => pick(`HVA VIL DU FYLLE VED ${t.name.toUpperCase()}?`, v.inventory.map((name) => ({ label: name, name })), (o) => request('GIVE', { item: o.name, thing: t.id, name: t.name })) }, 'FYLL NOE')
          : [
            el('button', { onclick: () => pick(`GI NOE TIL ${t.name.toUpperCase()}`, v.inventory.map((name) => ({ label: name, name })), (o) => request('GIVE', { item: o.name, thing: t.id, name: t.name })) }, 'GI NOE'),
            v.companions.length ? el('button', { class: 'ghost', onclick: () => pick('HVEM SKAL HJELPE?', v.companions.map((name) => ({ label: name, name })), (o) => request('FRIEND', { friend: o.name, thing: t.id, name: t.name })) }, 'BE EN VENN HJELPE') : null,
          ],
    ))) : [el('p', {}, 'Det ser tomt ut her …')]));
  const fresh = new Set(knownItems ? v.inventory.filter((n) => !knownItems.includes(n)) : []);
  knownItems = v.inventory.slice();
  for (const name of fresh) showFound(v, name);
  $('#inventory').replaceChildren(...(v.inventory.length ? v.inventory.map((n) => {
    const c = chip(v, n, voice ? () => speak(n) : null);
    if (fresh.has(n)) c.classList.add('new');
    return c;
  }) : [el('span', { class: 'empty' }, 'Tom')]));
  // Something she can make now: a button next to the backpack.
  $('#inventory').append(...(v.recipes || []).map((r) => el('button', { class: 'make', onclick: () => request('MAKE', { thing: r.id, name: r.name }) }, '✨ LAG ', r.name.toUpperCase())));
  $('#companions').replaceChildren(...(v.companions.length ? v.companions.map((n) => chip(v, n, voice ? () => speak(n) : null)) : [el('span', { class: 'empty' }, 'Ingen ennå')]));
  renderMap(v);
  renderEnd(v);
  renderDie(v);
  renderBook(v);
}

// ---------- the die: she rolls a real D6 and taps the same face ----------
const PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
let sentRoll = null;
function renderDie(v) {
  const box = $('#dieBox');
  box.hidden = !v.roll || v.roll.id === sentRoll;
  if (box.hidden) return;
  $('#dieText').textContent = (v.roll.text || '').toUpperCase();
  $('#dieFaces').replaceChildren(...[1, 2, 3, 4, 5, 6].map((value) => {
    const face = el('button', { class: 'die-face', 'aria-label': `Terningside med ${value} prikker`, onclick: () => { sentRoll = v.roll.id; box.hidden = true; request('ROLL', { value, rollId: v.roll.id }); } });
    for (let cell = 1; cell <= 9; cell++) face.append(el('span', { class: PIPS[value].includes(cell) ? 'pip' : 'nopip' }));
    return face;
  }));
}

// ---------- a new thing: show it big, and let her drag it into the backpack ----------
// Only presentation: the thing is already in the backpack (the DM accepted it). The popup makes the
// moment visible; dropping it on the backpack (or tapping the backpack) puts the picture away.
const foundQueue = [];
function showFound(v, name) {
  foundQueue.push({ name, icon: icon(v, name), text: v.news?.kind === 'item' ? v.news.text : `Du fant ${name.toLowerCase()}!` });
  if (foundQueue.length === 1) openFound();
}
function openFound() {
  const f = foundQueue[0];
  if (!f) return;
  $('#foundText').textContent = f.text.toUpperCase();
  $('#foundName').textContent = f.name.toUpperCase();
  const thing = $('#foundThing');
  thing.replaceChildren(String(f.icon).startsWith('assets/') ? el('img', { src: `/${f.icon}`, alt: '' }) : el('span', {}, f.icon));
  thing.style.transform = '';
  thing.classList.remove('into');
  $('#found').hidden = false;
}
function closeFound() {
  $('#found').hidden = true;
  foundQueue.shift();
  document.querySelector('#inventory')?.closest('.panel')?.classList.add('bag-pop');
  setTimeout(() => document.querySelector('#inventory')?.closest('.panel')?.classList.remove('bag-pop'), 700);
  if (foundQueue.length) setTimeout(openFound, 250);
}
(() => {
  const thing = $('#foundThing'), bag = $('#foundBag');
  let start = null;
  thing.addEventListener('pointerdown', (e) => { start = { x: e.clientX, y: e.clientY }; thing.setPointerCapture(e.pointerId); thing.classList.add('dragging'); });
  const overBag = (e) => { const b = bag.getBoundingClientRect(); return e.clientX >= b.left - 20 && e.clientX <= b.right + 20 && e.clientY >= b.top - 20 && e.clientY <= b.bottom + 20; };
  // Into the backpack: the thing slides to the middle of it and a little down, behind it, getting
  // smaller as it goes (workshop K3); then the backpack hops and the popup closes.
  let going = false;
  const intoBag = () => {
    if (going) return;
    going = true;
    const t = thing.getBoundingClientRect(), b = bag.getBoundingClientRect();
    const now = new DOMMatrix(getComputedStyle(thing).transform === 'none' ? undefined : getComputedStyle(thing).transform);
    const dx = now.m41 + (b.left + b.width / 2) - (t.left + t.width / 2), dy = now.m42 + (b.top + b.height * 0.62) - (t.top + t.height / 2);
    thing.classList.add('into');
    thing.style.transform = `translate(${dx}px, ${dy}px) scale(.35)`;
    setTimeout(() => { bag.classList.add('gulp'); }, 420);
    setTimeout(() => { bag.classList.remove('gulp', 'hot'); going = false; closeFound(); }, 900);
  };
  thing.addEventListener('pointermove', (e) => { if (start) { thing.style.transform = `translate(${e.clientX - start.x}px, ${e.clientY - start.y}px)`; bag.classList.toggle('hot', overBag(e)); } });
  thing.addEventListener('pointerup', (e) => {
    if (!start) return;
    start = null;
    thing.classList.remove('dragging');
    if (overBag(e)) intoBag();
    else { bag.classList.remove('hot'); thing.style.transition = 'transform .3s ease-out'; thing.style.transform = ''; setTimeout(() => { thing.style.transition = ''; }, 320); }
  });
  bag.addEventListener('click', intoBag);
})();

// The end of the run: what she did, and one of two lasting TING to choose (workshop B1, B3).
function renderEnd(v) {
  const box = $('#end');
  $('#endLayer').hidden = !v.end;
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
  $('#packLayer').hidden = !v.pack;
  if (v.pack) {
    pack.replaceChildren(el('h2', {}, 'TA MED FRA HELTEBOKA'), el('p', {}, 'Du kan ta med én venn og én ting.'),
      el('div', { class: 'chips' },
        ...v.pack.friends.filter((n) => !v.companions.includes(n)).map((n) => chip(v, n, () => request('BRING', { kind: 'friend', name: n }))),
        ...v.pack.ting.filter((n) => !v.inventory.includes(n)).map((n) => chip(v, n, () => request('BRING', { kind: 'ting', name: n })))));
  }
  // The hero book behind a button at the top, so it never takes room from the game.
  const book = $('#book');
  const empty = !v.book || (!v.book.friends.length && !v.book.ting.length);
  $('#bookBtn').hidden = empty;
  if (empty) { $('#bookLayer').hidden = true; return; }
  book.replaceChildren(el('h2', {}, `HELTEBOKA · ${v.book.runs} LØP`),
    el('div', { class: 'chips' }, ...v.book.friends.map((n) => el('span', { class: 'sticker' }, pic(icon(v, n)), ' ', n)), ...v.book.ting.map((n) => el('span', { class: 'sticker ting' }, pic(icon(v, n)), ' ', n))));
}

function renderMap(v) {
  // The iPad's own symbols: pictures once they are made (content/assets.json, ui:*).
  const uiPic = (value) => (String(value).startsWith('assets/') ? el('img', { src: `/${value}`, alt: '' }) : value);
  $('#lupeIcon').replaceChildren(uiPic(v.ui?.magnifier || '🔍'));
  $('#bagIcon').replaceChildren(uiPic(v.ui?.backpack || '🎒'));
  // The cave as in the original: rooms and doors, fog over the unknown (prototype/map-view.mjs).
  const canGo = (id) => v.cave.rooms.some((r) => r.id === id && r.canGo) || v.cave.probes.some((p) => p.room === id && !p.locked);
  $('#map').replaceChildren(caveGrid(v.cave, { memo: `child:${v.runCode}`, onRoom: (id) => { if (canGo(id)) request('MOVE', { room: id }); } }));
}

$('#search').addEventListener('click', () => view && request('SEARCH', { room: view.here }));
$('#pickCancel').addEventListener('click', () => $('#pick').close());
$('#bookBtn').addEventListener('click', () => { $('#bookLayer').hidden = false; });
$('#bookClose').addEventListener('click', () => { $('#bookLayer').hidden = true; });
$('#joinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  code = $('#code').value.trim().toUpperCase();
  if (!code) return;
  location.hash = `k=${code}`;
  try { localStorage.setItem(CODE_KEY, code); } catch { /* private mode */ }
  connect();
});
if (code) connect(); else $('#join').hidden = false;
