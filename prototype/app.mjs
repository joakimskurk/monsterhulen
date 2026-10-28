// Table prototype: lets a DM play a generated V2 run with physical dice, using the same
// generator and playthrough automaton as tools/runsim. State lives in localStorage per run code.
import { buildContent, CONTENT_FILES } from '../tools/lib/content-core.mjs';
import { acceptedRun } from '../tools/runsim/accept.mjs';
import { dmTemplate } from '../tools/runsim/report.mjs';
import { COMPOSED, isComposed, resolveMission, themeKey } from '../tools/runsim/theme.mjs';
import { playerView } from './player-view.mjs';
import { caveGrid, doorsFor, doorKind, caveBounds } from './map-view.mjs';
import * as table from './table.mjs';
import { emptyBook, tingOffer, recordRun, parseBook, bookFile } from './herobook.mjs';
import { caveOverview } from './overview.mjs';

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

let content;
let current;   // { code, run, result }
let state;     // per-run play state, persisted
let requests = [];   // from the child's iPad, not persisted
let relay = false;   // true when served by tools/server.mjs (two screens possible)

// Short code the iPad uses to join. Stable per DM browser so a reload keeps the pairing.
const SESSION = (() => {
  const key = 'monsterhulen-bord:session';
  try { const s = localStorage.getItem(key); if (s) return s; } catch { /* ignore */ }
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const code = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  try { localStorage.setItem(key, code); } catch { /* ignore */ }
  return code;
})();

// Tabs in one browser share the session code. The newest DM tab takes over the child's screen;
// an older tab stops publishing and handling requests, so two tabs never fight over the iPad.
let active = true;
(() => {
  const id = Math.random().toString(36).slice(2);
  try {
    const channel = new BroadcastChannel('monsterhulen-bord');
    channel.onmessage = (e) => {
      if (e.data?.type !== 'hello' || e.data.id === id || !active) return;
      active = false;
      document.body.prepend(el('section', { class: 'panel takeover' }, el('b', {}, 'Barnets skjerm styres nå fra en annen fane. '), 'Last inn denne siden på nytt for å ta over.'));
    };
    channel.postMessage({ type: 'hello', id });
  } catch { /* no BroadcastChannel: single tab assumed */ }
})();

async function loadContent() {
  const raw = {};
  for (const [key, [file, field]] of Object.entries(CONTENT_FILES)) {
    const json = await (await fetch(`../content/${file}`)).json();
    raw[key] = field ? json[field] : json;
  }
  return buildContent(raw);
}

const label = (tag) => content.tagById.get(tag)?.label || tag;
const storageKey = (code) => `monsterhulen-bord:${code}`;

function save() { try { localStorage.setItem(storageKey(current.code), JSON.stringify(state)); } catch { /* private mode: play without saving */ } }
function load(run) {
  try {
    const s = JSON.parse(localStorage.getItem(storageKey(current.code)));
    // Saved before doors were remembered: count a door between two visited rooms as walked through.
    if (s && !s.passed) s.passed = run.map.edges.flatMap((e, i) => (!e.secret && s.visited.includes(e.a) && s.visited.includes(e.b) ? [i] : []));
    if (s) return s;
  } catch { /* ignore */ }
  return freshState(run);
}
function log(text) { state.log.push(text); }

// ---------- setup ----------

async function start() {
  content = await loadContent();
  const TYPE_NAMES = { FINN: 'Finn skatten', REDD: 'Redd noen', SAMLE: 'Få noe i gang', LEVER: 'Lever noe hjem', KOM_UT: 'Kom deg ut' };
  const fresh = el('optgroup', { label: 'Nytt hver gang' });
  for (const [id, type] of Object.entries(COMPOSED)) fresh.append(el('option', { value: id }, TYPE_NAMES[type]));
  const classics = el('optgroup', { label: 'Klassikere' });
  for (const m of content.missions) classics.append(el('option', { value: m.id }, m.name));
  $('#mission').append(fresh, classics);
  const params = new URLSearchParams(location.hash.slice(1));
  if (params.get('m')) $('#mission').value = params.get('m');
  if (params.get('l')) $('#length').value = params.get('l');
  $('#seed').value = params.get('s') || String(1 + Math.floor(Math.random() * 9999));
  $('#setup').addEventListener('submit', (e) => { e.preventDefault(); generate(); });
  $('#newRun').addEventListener('click', () => { $('#seed').value = freshSeed($('#mission').value); generate(); });
  // A composed mission of another type than the current one, with a theme not seen recently.
  $('#surprise').addEventListener('click', () => {
    const others = Object.keys(COMPOSED).filter((id) => id !== $('#mission').value);
    const missionId = others[Math.floor(Math.random() * others.length)];
    $('#mission').value = missionId;
    $('#seed').value = freshSeed(missionId);
    generate();
  });
  // Tabs at the bottom: one body at a time.
  for (const tab of document.querySelectorAll('.tab')) {
    tab.addEventListener('click', () => {
      for (const t of document.querySelectorAll('.tab')) t.classList.toggle('active', t === tab);
      for (const b of document.querySelectorAll('.tab-body')) b.hidden = b.dataset.body !== tab.dataset.tab;
    });
  }
  $('#ipadStatus').textContent = 'Én skjerm';
  $('#reset').addEventListener('click', () => { if (confirm('Starte dette løpet på nytt?')) { state = freshState(current.run); save(); render(); } });
  await connectRelay();
  generate();
}

// ---------- two screens ----------

// What the child may do by herself, without waiting for the DM (owner, 2026-10-28: less freezing).
// Only what obviously works; anything uncertain or creative still comes to the DM. All on by default,
// each can be turned off; remembered on this device.
const SELF = {
  move: 'går gjennom åpne dører',
  take: 'tar ting som ligger',
  give: 'gir en ting eller ber en venn når det åpenbart passer',
  search: 'leter med terningen',
};
const selfKey = (k) => `monsterhulen-bord:self:${k}`;
const bySelf = (k) => { try { return localStorage.getItem(selfKey(k)) !== 'off' && (k !== 'move' || localStorage.getItem('monsterhulen-bord:freeMove') !== 'off'); } catch { return true; } };
const setSelf = (k, on) => { try { localStorage.setItem(selfKey(k), on ? 'on' : 'off'); if (k === 'move') localStorage.removeItem('monsterhulen-bord:freeMove'); } catch { /* ignore */ } };
// True if `to` is next to where the child is, through a door that is not secret and not locked.
function throughOpenDoor(to) {
  const openGates = new Set(state.openGates);
  return current.run.map.edges.some((e) => !e.secret && (e.gate === null || openGates.has(e.gate))
    && ((e.a === state.here && e.b === to) || (e.b === state.here && e.a === to)));
}

// Requests that need no DM decision: walking through an open door, taking what lies there, giving what
// obviously fits, searching with the die, the die itself, and the hero book choices. True if handled.
function handleBySelf(r) {
  const T0 = T();
  if (r.type === 'ROLL') { if (state.roll && state.roll.id === r.rollId) { table.rolled(T0, Number(r.value)); save(); render(); } return true; }
  if (r.type === 'MOVE' && bySelf('move') && throughOpenDoor(r.room)) { goTo(r.room); return true; }
  if (r.type === 'TAKE' && bySelf('take') && !r.thing.startsWith('amb:')) { const n = nodeById(r.thing); if (r.thing.startsWith('alt:') || (n?.kind === 'item' && !n.hidden)) { acceptThing(r.thing); return true; } }
  if ((r.type === 'GIVE' || r.type === 'FRIEND') && bySelf('give') && table.fits(T0, r.thing, r.type === 'GIVE' ? { given: r.item } : { friend: r.friend })) {
    acceptThing(r.thing, r.type === 'GIVE' ? { given: r.item } : { friend: r.friend });
    return true;
  }
  if (r.type === 'SEARCH' && bySelf('search')) { table.search(T0, r.room); save(); render(); return true; }
  // The hero book: bringing along and choosing a TING are the child's own choices.
  if (r.type === 'BRING' && canPack()) {
    const book = loadBook();
    table.bring(T0, { friend: r.kind === 'friend' ? book.friends.find((f) => f.name === r.name) : null, ting: r.kind === 'ting' ? book.ting.find((x) => x.name === r.name) : null });
    save(); render(); return true;
  }
  if (r.type === 'PICK_TING' && !state.chosenTing) { const pick = offer().find((c) => c.id === r.id); if (pick) { chooseTing(pick); return true; } }
  return false;
}

async function connectRelay() {
  try {
    const info = await (await fetch('/api/info')).json();
    relay = true;
    const urls = info.urls.map((u) => `${u}/prototype/child.html#k=${SESSION}`);
    $('#pair').hidden = false;
    $('#ipadStatus').textContent = `iPad-kode ${SESSION}`;
    $('#pair').replaceChildren(
      el('h2', {}, 'Barnets skjerm'),
      el('p', {}, 'Kode: ', el('b', { class: 'code' }, SESSION)),
      info.lan
        ? el('p', { class: 'hint' }, 'Åpne på iPaden (samme Wi-Fi): ', ...urls.map((u) => el('a', { href: u, target: '_blank' }, u)))
        : el('p', { class: 'hint' }, 'Kjør «npm run prototype:lan» for å koble til en iPad. Test på denne maskinen: ', el('a', { href: urls[0], target: '_blank' }, 'åpne barnets skjerm')),
      el('button', { class: 'ghost small', onclick: () => { state.say = null; save(); render(); } }, 'Fjern tekst på iPaden'),
      el('h3', {}, 'Barnet gjør selv, uten å vente på deg'),
      ...Object.entries(SELF).map(([k, text]) => el('label', { class: 'check' }, (() => {
        const box = el('input', { type: 'checkbox' });
        box.checked = bySelf(k);
        box.addEventListener('change', () => setSelf(k, box.checked));
        return box;
      })(), ` Barnet ${text}`)),
      el('p', { class: 'hint' }, 'Alt som ikke åpenbart passer, kommer fortsatt til deg under «Fra iPaden». Du ser alt i loggen.'),
    );
    const source = new EventSource(`/api/${SESSION}/dm-stream`);
    // Only requests for the run on this page. Another DM page on the same session code (a second tab, an old
    // window) must neither show nor settle them, or it would swallow the child's taps.
    source.addEventListener('request', (e) => {
      const r = JSON.parse(e.data);
      if (!active || r.runCode !== current?.code) return;
      if (handleBySelf(r)) { ack(r); return; }
      if (!requests.some((x) => x.actionId === r.actionId)) { requests.push(r); renderRequests(); }
    });
    source.addEventListener('ack', (e) => { const { actionId } = JSON.parse(e.data); requests = requests.filter((x) => x.actionId !== actionId); renderRequests(); });
  } catch {
    relay = false; // served by a plain static server: one screen only
  }
}

function publish() {
  if (!relay || !current || !active) return;
  const book = loadBook();
  const finished = table.isFinished(T());
  const view = playerView(current.run, { ...state, runCode: current.code }, {
    end: finished ? { ...table.summary(T()), offer: book.runs.some((r) => r.code === current.code) ? [] : offer(), chosen: state.chosenTing?.name || null } : null,
    book: { friends: book.friends.map((f) => f.name), ting: book.ting.map((x) => x.name), runs: book.runs.length },
    pack: canPack() ? { friends: book.friends.map((f) => f.name), ting: book.ting.map((x) => x.name) } : null,
    // Pictures for what comes from the hero book (not part of this run).
    icons: Object.fromEntries([
      ...book.friends.map((f) => [f.name, content.figures.find((x) => x.name === f.name)?.icon]),
      ...book.ting.map((x) => [x.name, content.items.find((i) => i.id === x.id)?.icon]),
    ].filter(([, icon]) => icon)),
  });
  fetch(`/api/${SESSION}/player`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(view) }).catch(() => {});
}

function ack(r) {
  requests = requests.filter((x) => x.actionId !== r.actionId);
  renderRequests();
  if (relay) fetch(`/api/${SESSION}/ack`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ actionId: r.actionId }) }).catch(() => {});
}

// ---------- table rules (prototype/table.mjs, shared with tests/v2/table-play.test.mjs) ----------
// Every action changes the state through table.mjs, then this page saves and redraws.
const T = () => ({ content, run: current.run, state });
const act = (fn) => (...args) => { fn(T(), ...args); save(); render(); };
const freshState = table.freshState;
const metOf = (node) => table.metOf(T(), node);
const openNeeds = (node) => table.openNeeds(T(), node);
const markNeed = act(table.markNeed);
const acceptThing = act(table.acceptThing);
const resolve = act(table.resolve);
const goTo = act(table.goTo);

function renderRequests() {
  // Requests about something already handled (double taps) are settled silently.
  for (const r of requests.filter((x) => x.thing && isDone(x.thing))) ack(r);
  const box = $('#requests');
  box.hidden = requests.length === 0;
  box.replaceChildren(el('h2', {}, 'Fra iPaden'), ...requests.map((r) => {
    const no = el('button', { class: 'ghost', onclick: () => { log(r.type === 'MOVE' ? 'Ikke dit ennå.' : `${r.name || 'Det'}: ikke helt ennå.`); save(); render(); ack(r); } }, 'Ikke ennå');
    if (r.type === 'MOVE') {
      const ok = reach().has(r.room);
      return el('div', { class: 'card' }, el('p', {}, `Hun vil gå til ${current.run.map.rooms[r.room]?.name || `rom ${r.room}`} (rom ${r.room}).`),
        el('div', { class: 'actions' }, ok ? el('button', { onclick: () => { goTo(r.room); ack(r); } }, 'Gå dit') : el('p', { class: 'hint' }, 'Bak et hinder.'), no));
    }
    if (r.type === 'TAKE') {
      return el('div', { class: 'card' }, el('p', {}, `Hun vil ta ${r.name}.`),
        el('div', { class: 'actions' }, el('button', { onclick: () => { acceptThing(r.thing); ack(r); } }, 'Ja'), no));
    }
    if (r.type === 'SEARCH') {
      const hidden = current.run.nodes.filter((n) => n.room === r.room && n.kind === 'item' && n.hidden && !isDone(n.id));
      return el('div', { class: 'card' }, el('p', {}, `Hun ser seg rundt i rom ${r.room}.`),
        el('p', { class: 'hint' }, hidden.length ? 'Noe er gjemt her. Kast terning hvis det er usikkert: 1–2 gir et tydeligere spor, prøver hun igjen finner hun det.' : 'Ingenting gjemt her. Beskriv noe fint eller rart hun legger merke til.'),
        el('div', { class: 'actions' }, hidden.length ? el('button', { onclick: () => { table.search(T(), r.room); save(); render(); ack(r); } }, 'La henne kaste terningen') : null,
          ...hidden.map((n) => el('button', { class: 'ghost', onclick: () => { resolve(n); ack(r); } }, `Fant: ${n.item.name}`)),
          el('button', { class: 'ghost', onclick: () => { log('Hun så seg rundt.'); save(); render(); ack(r); } }, hidden.length ? 'Ikke ennå' : 'OK')));
    }
    if (r.type === 'GIVE' || r.type === 'FRIEND') {
      const text = r.type === 'GIVE' ? `Hun vil gi ${r.item} til ${r.name}.` : `Hun vil at ${r.friend} skal hjelpe med ${r.name}.`;
      return el('div', { class: 'card' }, el('p', {}, text),
        el('p', { class: 'hint' }, 'Passer det med det figuren vil ha eller er svak mot? Kast terning bare hvis det er usikkert.'),
        el('div', { class: 'actions' }, el('button', { onclick: () => { acceptThing(r.thing, r.type === 'GIVE' ? { given: r.item } : { friend: r.friend }); ack(r); } }, 'Det virker!'), no));
    }
    if (r.type === 'BRING') {
      const book = loadBook();
      const friend = r.kind === 'friend' ? book.friends.find((f) => f.name === r.name) : null;
      const ting = r.kind === 'ting' ? book.ting.find((x) => x.name === r.name) : null;
      return el('div', { class: 'card' }, el('p', {}, `Hun vil ta med ${r.name}.`),
        el('div', { class: 'actions' }, el('button', { onclick: () => { if (canPack()) { table.bring(T(), { friend, ting }); save(); render(); } ack(r); } }, 'Ja'), no));
    }
    if (r.type === 'PICK_TING') {
      const pick = offer().find((c) => c.id === r.id);
      return el('div', { class: 'card' }, el('p', {}, `Hun velger ${r.name} til Helteboka.`),
        el('div', { class: 'actions' }, el('button', { onclick: () => { if (pick && !state.chosenTing) chooseTing(pick); ack(r); } }, 'Ja'), no));
    }
    return el('div', { class: 'card' }, el('p', {}, JSON.stringify(r)), el('div', { class: 'actions' }, no));
  }));
}

// Helteboka lives on the DM device in the prototype (workshop B6). The iPad only shows it.
const BOOK_KEY = 'monsterhulen-bord:helteboka';
function loadBook() { try { return JSON.parse(localStorage.getItem(BOOK_KEY)) || emptyBook(); } catch { return emptyBook(); } }
function saveBook(book) { try { localStorage.setItem(BOOK_KEY, JSON.stringify(book)); } catch { /* ignore */ } }

// Themes of recent runs on this DM device (decision A6). The code itself stays fully reproducible;
// only the choice of a new code skips themes that were just played.
const HISTORY_KEY = 'monsterhulen-bord:history';
function history() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; } }
function remember(code, mission) {
  const list = history();
  if (list[list.length - 1]?.code === code) return;
  list.push({ code, ...themeKey(mission) });
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(-10))); } catch { /* ignore */ }
}
function freshSeed(missionId) {
  const recent = history().slice(-3);
  let seed;
  for (let tries = 0; tries < 40; tries++) {
    seed = String(1 + Math.floor(Math.random() * 9999));
    if (!isComposed(missionId)) break;
    const t = themeKey(resolveMission(content, missionId, seed));
    if (!recent.some((r) => r.goal === t.goal || r.opener === t.opener)) break;
  }
  return seed;
}

function generate() {
  const missionId = $('#mission').value, length = $('#length').value, seed = $('#seed').value.trim() || '1';
  const accepted = acceptedRun(content, missionId, seed, length);
  if (!accepted) { $('#intro').replaceChildren(el('p', {}, 'Fant ikke et gyldig løp for denne koden. Prøv en annen.')); return; }
  const code = `${missionId}-${length}-${seed}`;
  remember(code, accepted.run.mission);
  current = { code, ...accepted };
  requests = requests.filter((r) => r.runCode === code);
  location.hash = `m=${missionId}&l=${length}&s=${seed}`;
  state = load(accepted.run);
  render();
}

// ---------- derived ----------

const nodeById = (id) => table.nodeById(T(), id);
const isDone = (key) => table.isDone(T(), key);
const reach = () => table.reach(T());

function providerText(id) {
  const p = nodeById(id);
  if (!p) return '';
  const where = p.room === null ? 'lages av to ting' : `rom ${p.room}`;
  const what = p.kind === 'companion' ? `${p.card.name} (venn)` : p.item?.name || p.card.name;
  const how = { LIGGER: 'ligger i', GJEMT: 'gjemt i', HANDEL: `bytt hos ${p.card.name},`, BELONNING: `takk fra ${p.card.name},`, VENN: 'venn i', MILJO: `hent ved ${p.card.name},`, OPPSKRIFT: '' }[p.sourceType] || '';
  return `${what}: ${how} ${where}`;
}

function wantsText(card) {
  return (card.wants || []).map((w) => {
    if (w.type === 'SORT') return `vil ha ${w.tags.map(label).join(' eller ')}`;
    if (w.type === 'BYTTE') return `vil bytte mot ${w.accepts.map(label).join(' / ')}`;
    if (w.type === 'MISTET') return `har mistet ${w.what}`;
    return w.task;
  }).filter(Boolean);
}

// ---------- render ----------

function render() {
  const { run } = current;
  $('#intro').replaceChildren(
    el('h2', {}, run.mission.name),
    el('p', { class: 'read' }, run.mission.intro),
    el('p', { class: 'hint' }, `Kode ${current.code} · ${run.map.rooms.length} rom · ${[...new Set(run.map.rooms.map((r) => r.zoneName))].join(' → ').toLowerCase()} · barnet er i ${run.map.rooms[state.here].name}`),
  );
  renderOverview();
  renderDice();
  renderMap();
  renderRoom(state.selected ?? state.here);
  renderInventory();
  $('#log').replaceChildren(...state.log.slice(-12).reverse().map((t) => el('li', {}, t)));
  $('#template').textContent = dmTemplate(content, run, current.result);
  renderFinish();
  renderPack();
  renderHeroBook();
  renderRequests();
  publish();
}

// ---------- end of the run and Helteboka (workshop B1–B6) ----------

// Packing is possible before the child has moved, until the DM closes it or one friend and one TING are along.
const canPack = () => state.visited.length === 1 && !state.brought?.done && !(state.brought?.friend && state.brought?.ting)
  && (loadBook().friends.length || loadBook().ting.length);
const offer = () => tingOffer(loadBook(), content, current.code);
const chooseTing = (t) => { state.chosenTing = t; log(`Valgte ${t.name} til Helteboka.`); save(); render(); };

function renderPack() {
  const box = $('#pack');
  box.hidden = !canPack();
  if (box.hidden) return;
  const book = loadBook();
  const friendSel = el('select', {}, el('option', { value: '' }, 'Ingen venn'), ...book.friends.map((f, i) => el('option', { value: String(i) }, f.name)));
  const tingSel = el('select', {}, el('option', { value: '' }, 'Ingen TING'), ...book.ting.map((x, i) => el('option', { value: String(i) }, x.name)));
  box.replaceChildren(el('h2', {}, 'Pakk sekken'),
    el('p', { class: 'hint' }, 'Barnet kan ta med én venn og én TING fra Helteboka. Løpet kan løses uten. Det som tas med, er en ekstra vei.'),
    el('div', { class: 'actions' }, friendSel, tingSel,
      el('button', { onclick: () => { table.bring(T(), { friend: book.friends[friendSel.value] || null, ting: book.ting[tingSel.value] || null }); state.brought.done = true; save(); render(); } }, 'Ta med'),
      el('button', { class: 'ghost', onclick: () => { state.brought = { ...(state.brought || {}), done: true }; save(); render(); } }, 'Ingenting i dag')));
}

// The book itself, with a backup: it lives in this browser only, so clearing site data would lose it.
function renderHeroBook() {
  const book = loadBook();
  const today = new Date().toISOString().slice(0, 10);
  const save = () => {
    const link = el('a', { href: URL.createObjectURL(new Blob([bookFile(book, today)], { type: 'application/json' })), download: `helteboka-${today}.json` });
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const input = el('input', { type: 'file', accept: 'application/json,.json', hidden: '' });
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    try {
      const next = parseBook(await file.text(), content);
      if (!confirm(`Erstatte Helteboka (${book.runs.length} løp) med kopien (${next.runs.length} løp)?`)) return;
      saveBook(next); render();
    } catch (e) { alert(e.message); }
  });
  $('#herobook').replaceChildren(...[el('h2', {}, `Helteboka · ${book.runs.length} løp`),
    el('p', {}, el('b', {}, 'Venner: '), book.friends.map((f) => f.name).join(', ') || '–'),
    el('p', {}, el('b', {}, `TING (${book.ting.length} av 12): `), book.ting.map((x) => x.name).join(', ') || '–'),
    book.memories.length ? el('p', { class: 'hint' }, `Sist: ${book.memories.slice(-3).reverse().join(' · ')}`) : null,
    el('p', { class: 'hint' }, 'Helteboka ligger bare i denne nettleseren. Lagre en kopi av og til.'),
    el('div', { class: 'actions' }, el('button', { class: 'ghost', onclick: save }, 'Lagre kopi'), el('button', { class: 'ghost', onclick: () => input.click() }, 'Hent kopi'), input),
  ].filter(Boolean));
}

function renderFinish() {
  const box = $('#finish');
  box.hidden = !table.isFinished(T());
  if (box.hidden) return;
  const s = table.summary(T());
  const choices = offer();
  const book = loadBook();
  const recorded = book.runs.some((r) => r.code === current.code);
  const list = (title, items) => (items.length ? el('p', {}, el('b', {}, `${title}: `), items.join(', ')) : null);
  box.replaceChildren(...[el('h2', {}, 'Løpet er ferdig! 🎉'),
    el('p', { class: 'read' }, s.headline),
    list('Hjalp', s.helped), list('Kom forbi', s.passed), list('Nye venner', s.friends.map((f) => f.name)), list('Fant', s.found),
    el('p', {}, `${s.rooms} rom utforsket.`),
    recorded ? el('p', { class: 'hint' }, `Skrevet i Helteboka ✓ · ${book.runs.length} løp, ${book.friends.length} venner, ${book.ting.length} av 12 TING.`)
      : el('div', {},
        choices.length ? el('p', {}, el('b', {}, 'Barnet velger én TING: '), state.chosenTing ? state.chosenTing.name : 'ikke valgt ennå') : null,
        !state.chosenTing && choices.length ? el('div', { class: 'actions' }, ...choices.map((c) => el('button', { class: 'ghost', onclick: () => chooseTing(c) }, c.name))) : null,
        el('div', { class: 'actions' }, el('button', { ...(state.chosenTing || !choices.length ? {} : { class: 'ghost' }), onclick: () => {
          saveBook(recordRun(loadBook(), { code: current.code, summary: s, ting: state.chosenTing || null, date: new Date().toISOString().slice(0, 10) }));
          log('Skrevet i Helteboka.'); save(); render();
        } }, 'Skriv i Helteboka')))].filter(Boolean));
}

// A click on a neighbouring room behind an open door walks there; any other room is only selected, so
// the DM can read about it without the child jumping across the cave.
function clickRoom(id) {
  if (throughOpenDoor(id)) { goTo(id); return; }
  state.selected = id;
  save(); render();
}

function renderMap() {
  // The whole cave for the DM, drawn with the original's tiles: every room with its number, every
  // door including secret ones, and the rooms behind a closed gate darker (prototype/map-view.mjs).
  const { map } = current.run;
  const open = reach();
  $('#map').replaceChildren(caveGrid({
    bounds: caveBounds(map.rooms),
    // Rooms she has not been in are faint: the DM sees what can be explored, the child sees fog.
    rooms: map.rooms.map((r) => ({
      id: r.id, x: r.x, y: r.y, w: r.w, h: r.h, label: `${r.id} · ${r.name}`, corner: String(r.id),
      look: r.id === state.here ? 'here' : state.visited.includes(r.id) ? 'visited' : 'unexplored',
      canGo: throughOpenDoor(r.id),
    })),
    doors: doorsFor(map.edges, new Set(map.rooms.map((r) => r.id)), doorKind(state, map.edges, { secret: 'secret' }), map.distance[map.start]),
    probes: [],
  }, { maxWidth: 760, onRoom: clickRoom, memo: `dm:${current.code}` }));
}

function needBlock(node, need, i) {
  const what = need.local ? need.task : need.specific ? need.name : label(need.tag);
  const via = { weakness: ' (svakhet)', trade: ' (som betaling)', fill: ' (å fylle i)', tool: ' (verktøy)', free: ' (for å få den løs)', guard: ' (for å komme til)', part: ' (del som mangler)' }[need.via] || '';
  const met = metOf(node).includes(i);
  const several = node.needs.filter((n) => !n.local).length > 1;
  return el('div', { class: `need${met ? ' met' : ''}` },
    el('div', {}, el('b', {}, need.local ? 'Vil: ' : 'Trenger: '), what + via,
      met ? el('b', {}, ' · på plass ✓') : several && !isDone(node.id) && !need.local ? el('button', { class: 'small ghost', onclick: () => markNeed(node, i) }, 'Denne er på plass') : null),
    need.sign ? el('div', {}, el('b', {}, 'Tegn: '), `«${need.sign}»`, relay ? el('button', { class: 'small ghost', onclick: () => { state.say = need.sign; save(); render(); } }, 'Vis på iPad') : null) : null,
    need.provider ? el('div', { class: 'sure' }, `Garantert: ${providerText(need.provider)}`) : null,
    ...table.broughtFits(T(), need).map((name) => el('div', { class: 'sure' }, `Passer også: ${name} (tatt med fra Helteboka)`)),
  );
}

function ladder(node) {
  const first = node.needs[openNeeds(node)[0]];
  if (!first) return null;
  const clearer = first.via === 'rhyme'
    ? '«Resten av regla må finnes et sted. Kanskje noen i hulen kan den, eller den står skrevet på en vegg?»'
    : first.specific ? `«Har du ${first.name.toLowerCase()}? Kanskje i sekken, eller et annet sted i hulen?»`
      : `«Har du noe som er ${label(first.tag)}? Kanskje i sekken, eller et annet sted i hulen?»`;
  // Folded away: the sign is already on the card; open it when she is stuck.
  return el('details', { class: 'ladder-box' }, el('summary', {}, 'Hjelpestige'),
    el('ol', { class: 'ladder' },
      el('li', {}, first.sign ? `Beskriv tegnet: «${first.sign}»` : 'Beskriv det barnet ser og spør hva hun vil gjøre.'),
      el('li', {}, `Tydeligere: ${clearer}`),
      el('li', {}, 'Fortsatt fast? Bruk LØS eller GI LIKEVEL.'),
    ));
}

const KIND = { blocker: 'Hinder', lock: 'Låst dør', machine: 'Maskin', trader: 'Bytter', quest: 'Trenger hjelp', companion: 'Mulig venn', source: 'Kilde', item: 'Ting', target: 'Den dere skal redde', goal: 'Målet', exit: 'Målet', deliver: 'Det som skal leveres' };
const OPENED = { KEY: 'Låst opp', MAGIC: 'Satt på plass – den åpnes', RHYME: 'Regla er sagt – den åpnes', TAG: 'Det virker – den åpnes' };
const ACTION = { item: 'Ta', trader: 'Byttet', quest: 'Hjulpet – fikk takk', companion: 'Ble med', source: 'Hentet', blocker: 'Løst', lock: 'Låst opp', machine: 'Maskinen våkner', target: 'Rolig – følger med', goal: 'Funnet!', exit: 'Kom fram!', deliver: 'Plukket opp' };

function nodeCard(node) {
  const done = isDone(node.id);
  const card = node.card;
  const intro = card.intro || (node.kind === 'item' ? `${node.hidden ? 'Gjemt her: ' : 'Her ligger: '}${node.item.name}.` : card.name);
  const gives = node.item && !['item', 'deliver'].includes(node.kind) ? `Gir: ${node.item.name}` : node.kind === 'companion' ? `Kan som venn: ${node.ability.map(label).join(', ')}` : node.gate ? 'Åpner veien videre' : null;
  return el('div', { class: `card${done ? ' done' : ''}` },
    el('div', { class: 'kind' }, KIND[node.kind] || node.kind),
    el('h3', {}, node.kind === 'item' ? node.item.name : card.name),
    el('p', { class: 'read' }, intro),
    node.rhyme ? el('div', { class: 'need' },
      el('div', {}, el('b', {}, 'Regla: '), node.rhyme.lines.join(' ')),
      el('p', { class: 'hint' }, node.rhyme.shown ? 'Første linje står over døra. Les den høyt når barnet kommer hit.' : 'Ingen linjer står over døra. Alle tre må finnes.'),
      el('p', { class: 'hint' }, 'Ved døra sier barnet regla høyt, gjerne etter deg. Det er et ritual, ikke en hukommelsestest.'),
      relay ? el('button', { class: 'small ghost', onclick: () => { state.say = node.rhyme.lines.join(' '); save(); render(); } }, 'Vis regla på iPad') : null) : null,
    node.hidden ? el('p', { class: 'hint' }, 'Søk: terning bare hvis det er usikkert. 1–2 gir et tydeligere spor, ikke funn ennå. Prøver hun igjen, finner hun det.') : null,
    node.cardKind !== 'obstacle' && card.wants ? el('p', {}, el('b', {}, 'Figuren: '), wantsText(card).join(' · ') || '–') : null,
    ...node.needs.map((need, i) => needBlock(node, need, i)),
    gives ? el('p', {}, el('b', {}, gives)) : null,
    !done ? ladder(node) : null,
    done ? el('p', { class: 'hint' }, 'Ferdig.') : el('div', { class: 'actions' },
      el('button', { onclick: () => resolve(node) }, (node.kind === 'lock' && OPENED[node.opener]) || ACTION[node.kind] || 'Ferdig'),
      node.needs.some((n) => !n.local) ? el('button', { class: 'ghost', onclick: () => resolve(node, { improvised: true }) }, 'GI LIKEVEL') : null,
    ),
  );
}

function renderRoom(roomId) {
  const { run } = current;
  const room = run.map.rooms[roomId];
  const reachableNow = reach().has(roomId);
  const nodes = run.nodes.filter((n) => n.room === roomId);
  const alts = run.alternatives.filter((a) => a.room === roomId);
  const ambient = run.ambient.filter((a) => a.room === roomId);
  const title = `${room.name} · rom ${roomId}${roomId === run.map.end ? ' · målet' : ''}`;
  const parts = [
    el('h2', {}, `${title} · ${room.zoneName.toLowerCase()}`),
    !reachableNow ? el('p', { class: 'hint' }, 'Dette rommet ligger bak et hinder som ikke er løst ennå. (Du ser det fordi du er Forteller.)') : null,
    roomId !== state.here && reachableNow && !throughOpenDoor(roomId)
      ? el('p', { class: 'hint' }, 'Ikke rett ved siden av der barnet er. ', el('button', { class: 'small ghost', onclick: () => goTo(roomId) }, 'Flytt barnet hit likevel'))
      : null,
    ...nodes.map(nodeCard),
    ...alts.map((a) => {
      const key = `alt:${a.room}`;
      return el('div', { class: `card${isDone(key) ? ' done' : ''}` },
        el('div', { class: 'kind' }, 'Ting (ekstra)'), el('h3', {}, a.item),
        el('p', {}, `Virker også på ${nodeById(a.for).card.name} (${label(a.tag)}).`),
        isDone(key) ? null : el('div', { class: 'actions' }, el('button', { onclick: () => { state.inventory.push(a.item); state.done.push(key); log(`Tok ${a.item}.`); save(); render(); } }, 'Ta')));
    }),
    ...ambient.map((a) => {
      const key = `amb:${a.room}`;
      const f = a.figure;
      return el('div', { class: `card${isDone(key) ? ' done' : ''}` },
        el('div', { class: 'kind' }, 'Fritt møte'), el('h3', {}, f.name), el('p', { class: 'read' }, f.intro),
        el('p', {}, el('b', {}, 'Figuren: '), wantsText(f).join(' · ') || '–'),
        ...(f.weakness || []).map((w) => el('p', {}, el('b', {}, `Svak mot ${label(w.tag)}: `), `«${w.sign}»`)),
        el('p', { class: 'hint' }, 'Ikke nødvendig for oppdraget. Improviser fritt, men ikke gjør det til en ny nøkkel.'),
        isDone(key) ? null : el('div', { class: 'actions' }, el('button', { onclick: () => { state.done.push(key); log(`Møtte ${f.name}.`); save(); render(); } }, 'Ferdig')));
    }),
  ];
  if (!nodes.length && !alts.length && !ambient.length) parts.push(el('p', { class: 'read' }, 'Rommet er tomt. Beskriv stemningen, eller la barnet se seg rundt.'));
  $('#room').replaceChildren(...parts.filter(Boolean));
}

// ---------- everything in the cave (prototype/overview.mjs) ----------
// Things in the side panel: what she can find, where, and who wants it, so the DM can plant hints early.
// Figures in the tab below: what each wants and which things in the cave fit.
const STATUS = { 'i sekken': 'i sekken', brukt: 'brukt', 'ikke funnet': '' };
function renderOverview() {
  const o = caveOverview(content, current.run, state);
  const where = (r) => (r ? `${r.name} (rom ${r.id})` : '');
  $('#things').replaceChildren(...(o.things.length ? o.things.map((t) => el('li', { class: `thing-row ${t.status === 'brukt' ? 'used' : ''}` },
    el('div', { class: 'thing-top' },
      el('span', { class: 'icon' }, t.icon || '❔'), el('b', {}, t.name),
      t.status !== 'ikke funnet' ? el('span', { class: 'badge' }, STATUS[t.status]) : null),
    el('div', { class: 'hint' }, [where(t.room), t.how].filter(Boolean).join(' · ')),
    t.fits.length ? el('div', { class: 'fits' }, ...t.fits.map((f) => el('span', { class: `fit${f.planned ? ' planned' : ''}`, title: f.planned ? 'Tenkt løsning' : 'Passer også' }, `${f.figure} ${f.how} ${f.tag}`))) : null,
  )) : [el('li', { class: 'hint' }, 'Ingen ting i dette løpet.')]));
  $('#figures').replaceChildren(el('table', { class: 'figures' },
    el('thead', {}, el('tr', {}, el('th', {}, 'Figur'), el('th', {}, 'Hvor'), el('th', {}, 'Vil ha / svak mot'), el('th', {}, 'Ting i hulen som passer'))),
    el('tbody', {}, ...o.figures.map((f) => el('tr', { class: f.done ? 'used' : '' },
      el('td', {}, el('span', { class: 'icon' }, f.icon || ''), ' ', el('b', {}, f.name), f.ambient ? el('span', { class: 'hint' }, ' (fritt møte)') : null),
      el('td', {}, where(f.room)),
      el('td', {}, [...f.wantLabels, ...f.tasks].join(', ') || '–'),
      el('td', {}, f.fitting.join(', ') || '–'),
    )))));
}

// ---------- the die ----------
// The child rolls a real D6 and taps the face on the iPad. The DM can ask for a roll at any time, or
// tap the face here (one screen, or when she says it out loud). Suggestions as in the original.
const FACE = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };
const BAND = { low: '1–2', mid: '3–4', high: '5–6' };
function renderDice() {
  const roll = state.roll, last = state.lastRoll;
  const faces = el('div', { class: 'dice' }, ...[1, 2, 3, 4, 5, 6].map((v) => el('button', { class: 'die', title: String(v), onclick: () => {
    if (!state.roll) table.askRoll(T(), 'Forteller');
    table.rolled(T(), v); save(); render();
  } }, FACE[v])));
  $('#dice').replaceChildren(...[
    el('h2', {}, 'Terning'),
    roll ? el('p', { class: 'hint' }, roll.kind === 'search' ? 'Venter på at hun kaster for å lete …' : `Venter på at hun kaster${roll.reason ? ` (${roll.reason})` : ''} …`) : null,
    roll ? el('button', { class: 'small ghost', onclick: () => { state.roll = null; save(); render(); } }, 'Avbryt kastet') : null,
    !roll ? el('div', { class: 'actions' },
      el('button', { class: 'small', onclick: () => { table.askRoll(T(), 'usikkert'); save(); render(); } }, 'Be henne kaste'),
    ) : null,
    el('p', { class: 'hint' }, 'Eller trykk siden hun fikk:'), faces,
    last ? el('div', { class: `last-roll ${last.band}` },
      el('span', { class: 'face' }, FACE[last.value]),
      el('div', {}, el('b', {}, `${last.value} (${BAND[last.band]})${last.reason ? ` · ${last.reason}` : ''}`),
        el('p', { class: 'hint' }, last.reason === 'leting' ? (last.band === 'low' ? 'Ikke funnet ennå: et tydeligere hint. Neste forsøk finner det.' : 'Funnet!') : table.DICE_HINTS[last.band]))) : null,
  ].filter(Boolean));
}

function renderInventory() {
  $('#inventory').replaceChildren(...(state.inventory.length ? state.inventory.map((name, i) => el('li', {}, name,
    el('button', { class: 'small ghost', onclick: () => { state.inventory.splice(i, 1); log(`Brukte opp eller la fra seg ${name}.`); save(); render(); } }, 'Fjern'))) : [el('li', { class: 'hint' }, 'Tom')]));
  $('#companions').replaceChildren(...(state.companions.length ? state.companions.map((n) => el('li', {}, n)) : [el('li', { class: 'hint' }, 'Ingen ennå')]));
  // Recipes: offer to craft when both ingredients are in the backpack.
  const recipes = current.run.nodes.filter((n) => n.kind === 'recipe' && !isDone(n.id));
  $('#crafting').replaceChildren(...recipes.map((r) => {
    const ready = r.needs.every((need) => state.inventory.includes(nodeById(need.provider)?.item?.name));
    return el('div', { class: 'card' }, el('div', { class: 'kind' }, 'Kan lages'), el('h3', {}, r.item.name),
      el('p', {}, `Av: ${r.needs.map((n) => n.name).join(' + ')}`), r.card.hint ? el('p', { class: 'read' }, r.card.hint) : null,
      el('div', { class: 'actions' }, el('button', { onclick: () => resolve(r), ...(ready ? {} : { class: 'ghost' }) }, ready ? 'Lag den' : 'Lag likevel')));
  }));
}

start();
