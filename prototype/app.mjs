// Table prototype: lets a DM play a generated V2 run with physical dice, using the same
// generator and playthrough automaton as tools/runsim. State lives in localStorage per run code.
import { buildContent, CONTENT_FILES } from '../tools/lib/content-core.mjs';
import { acceptedRun } from '../tools/runsim/accept.mjs';
import { reachable } from '../tools/runsim/map.mjs';
import { dmTemplate } from '../tools/runsim/report.mjs';
import { COMPOSED, isComposed, resolveMission, themeKey } from '../tools/runsim/theme.mjs';
import { playerView, layoutMap } from './player-view.mjs';

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

function freshState(run) {
  return { here: run.map.start, visited: [run.map.start], done: [], openGates: [], inventory: [], companions: [], log: ['Eventyret begynner ved inngangen.'] };
}
function save() { try { localStorage.setItem(storageKey(current.code), JSON.stringify(state)); } catch { /* private mode: play without saving */ } }
function load(run) {
  try { const s = JSON.parse(localStorage.getItem(storageKey(current.code))); if (s) return s; } catch { /* ignore */ }
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
  $('#reset').addEventListener('click', () => { if (confirm('Starte dette løpet på nytt?')) { state = freshState(current.run); save(); render(); } });
  await connectRelay();
  generate();
}

// ---------- two screens ----------

async function connectRelay() {
  try {
    const info = await (await fetch('/api/info')).json();
    relay = true;
    const urls = info.urls.map((u) => `${u}/prototype/child.html#k=${SESSION}`);
    $('#pair').hidden = false;
    $('#pair').replaceChildren(
      el('h2', {}, 'Barnets skjerm'),
      el('p', {}, 'Kode: ', el('b', { class: 'code' }, SESSION)),
      info.lan
        ? el('p', { class: 'hint' }, 'Åpne på iPaden (samme Wi-Fi): ', ...urls.map((u) => el('a', { href: u, target: '_blank' }, u)))
        : el('p', { class: 'hint' }, 'Kjør «npm run prototype:lan» for å koble til en iPad. Test på denne maskinen: ', el('a', { href: urls[0], target: '_blank' }, 'åpne barnets skjerm')),
      el('button', { class: 'ghost small', onclick: () => { state.say = null; save(); render(); } }, 'Fjern tekst på iPaden'),
    );
    const source = new EventSource(`/api/${SESSION}/dm-stream`);
    // Only requests for the run on this page. Another DM page on the same session code (a second tab, an old
    // window) must neither show nor settle them, or it would swallow the child's taps.
    source.addEventListener('request', (e) => { const r = JSON.parse(e.data); if (!active || r.runCode !== current?.code) return; if (!requests.some((x) => x.actionId === r.actionId)) { requests.push(r); renderRequests(); } });
    source.addEventListener('ack', (e) => { const { actionId } = JSON.parse(e.data); requests = requests.filter((x) => x.actionId !== actionId); renderRequests(); });
  } catch {
    relay = false; // served by a plain static server: one screen only
  }
}

function publish() {
  if (!relay || !current || !active) return;
  const view = playerView(current.run, { ...state, runCode: current.code });
  fetch(`/api/${SESSION}/player`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(view) }).catch(() => {});
}

function ack(r) {
  requests = requests.filter((x) => x.actionId !== r.actionId);
  renderRequests();
  if (relay) fetch(`/api/${SESSION}/ack`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ actionId: r.actionId }) }).catch(() => {});
}

function consumableByName(name) {
  const card = content.items.find((i) => i.name === name);
  return card ? card.consumable !== false : true;
}

function thingName(id) {
  if (id.startsWith('alt:')) return current.run.alternatives.find((a) => `alt:${a.room}` === id)?.item;
  if (id.startsWith('amb:')) return current.run.ambient.find((a) => `amb:${a.room}` === id)?.figure.name;
  const n = nodeById(id);
  return n?.kind === 'item' ? n.item.name : n?.card.name;
}

// ---------- needs one at a time ----------
// A goal or machine with several needs (free the dragon, then calm it; three sockets) can be met
// step by step. Met needs are stored per node; the node resolves when the last one is met.
const metOf = (node) => state.needsMet?.[node.id] || [];
const openNeeds = (node) => node.needs.map((n, i) => i).filter((i) => !node.needs[i].local && !metOf(node).includes(i));

// Tags of something in the backpack, looked up by name in this run and in the item cards.
function tagsOfName(name) {
  const fromRun = current.run.nodes.find((n) => n.item?.name === name)?.item?.tags;
  return fromRun || content.items.find((i) => i.name === name)?.tags || [];
}

// Which open need a given thing or friend answers. Falls back to the first open need: the DM already said it works.
function needFor(node, { given, friend }) {
  const open = openNeeds(node);
  const fits = (i) => {
    const need = node.needs[i];
    const p = need.provider && nodeById(need.provider);
    if (given) return p?.item?.name === given || (need.tag && tagsOfName(given).includes(need.tag));
    if (friend) { const f = current.run.nodes.find((n) => n.kind === 'companion' && n.card.name === friend); return !!(need.tag && f?.ability.includes(need.tag)); }
    return false;
  };
  return open.find(fits) ?? open[0];
}

// `handedOver`: the child already gave the thing from the iPad (acceptThing removed it).
function markNeed(node, i, { improvised = false, handedOver = false } = {}) {
  if (isDone(node.id) || metOf(node).includes(i)) return;
  if (!handedOver) spendNeed(node.needs[i]);
  state.needsMet = { ...(state.needsMet || {}), [node.id]: [...metOf(node), i] };
  if (!openNeeds(node).length) { resolve(node, { improvised }); return; }
  const need = node.needs[i];
  const left = openNeeds(node).length;
  log(`${node.card.name}: ${need.specific ? need.name : label(need.tag)} er på plass. ${left} igjen.${improvised ? ' (Forteller bestemte)' : ''}`);
  save(); render();
}

function acceptThing(id, { given, friend } = {}) {
  if (isDone(id)) { render(); return; }
  if (given) {
    const i = state.inventory.indexOf(given);
    if (i >= 0 && consumableByName(given)) state.inventory.splice(i, 1);
  }
  if (id.startsWith('alt:')) {
    const a = current.run.alternatives.find((x) => `alt:${x.room}` === id);
    state.inventory.push(a.item); state.done.push(id); log(`Tok ${a.item}.`); save(); render(); return;
  }
  if (id.startsWith('amb:')) { state.done.push(id); log(`${thingName(id)} er fornøyd.`); save(); render(); return; }
  const node = nodeById(id);
  if (openNeeds(node).length > 1) { markNeed(node, needFor(node, { given, friend }), { handedOver: !!given }); return; }
  resolve(node);
}

function renderRequests() {
  // Requests about something already handled (double taps) are settled silently.
  for (const r of requests.filter((x) => x.thing && isDone(x.thing))) ack(r);
  const box = $('#requests');
  box.hidden = requests.length === 0;
  box.replaceChildren(el('h2', {}, 'Fra iPaden'), ...requests.map((r) => {
    const no = el('button', { class: 'ghost', onclick: () => { log(r.type === 'MOVE' ? 'Ikke dit ennå.' : `${r.name || 'Det'}: ikke helt ennå.`); save(); render(); ack(r); } }, 'Ikke ennå');
    if (r.type === 'MOVE') {
      const ok = reach().has(r.room);
      return el('div', { class: 'card' }, el('p', {}, `Hun vil gå til rom ${r.room}.`),
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
        el('div', { class: 'actions' }, ...hidden.map((n) => el('button', { onclick: () => { resolve(n); ack(r); } }, `Fant: ${n.item.name}`)),
          el('button', { class: 'ghost', onclick: () => { log('Hun så seg rundt.'); save(); render(); ack(r); } }, hidden.length ? 'Ikke ennå' : 'OK')));
    }
    if (r.type === 'GIVE' || r.type === 'FRIEND') {
      const text = r.type === 'GIVE' ? `Hun vil gi ${r.item} til ${r.name}.` : `Hun vil at ${r.friend} skal hjelpe med ${r.name}.`;
      return el('div', { class: 'card' }, el('p', {}, text),
        el('p', { class: 'hint' }, 'Passer det med det figuren vil ha eller er svak mot? Kast terning bare hvis det er usikkert.'),
        el('div', { class: 'actions' }, el('button', { onclick: () => { acceptThing(r.thing, r.type === 'GIVE' ? { given: r.item } : { friend: r.friend }); ack(r); } }, 'Det virker!'), no));
    }
    return el('div', { class: 'card' }, el('p', {}, JSON.stringify(r)), el('div', { class: 'actions' }, no));
  }));
}

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

const nodeById = (id) => current.run.nodes.find((n) => n.id === id);
const isDone = (key) => state.done.includes(key);
const reach = () => reachable(current.run.map, { openGates: new Set(state.openGates) });

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

// ---------- actions ----------

function spendFor(node) {
  node.needs.forEach((need, index) => { if (!metOf(node).includes(index)) spendNeed(need); }); // met earlier: already handed over
}

// Removes what one need used up. Ingredients always go into what is made; a filled container is emptied.
function spendNeed(need) {
  if (!need.provider) return;
  const p = nodeById(need.provider);
  if (p?.kind === 'companion' || need.via === 'tool') return;
  const i = state.inventory.indexOf(p?.item?.name);
  if (i >= 0 && (p.item.consumable || need.via === 'fill' || need.via === 'ingredient')) state.inventory.splice(i, 1);
}

function resolve(node, { improvised = false } = {}) {
  if (!node || isDone(node.id)) return; // a second tap on the iPad must not give twice
  const note = improvised ? ' (Forteller bestemte)' : '';
  spendFor(node);
  if (['blocker', 'lock', 'machine'].includes(node.kind)) { state.openGates.push(node.gate); log(`${node.card.name} er løst – veien videre er åpen.${note}`); }
  else if (node.kind === 'companion') { state.companions.push(node.card.name); log(`${node.card.name} ble med!${note}`); }
  else if (node.kind === 'target') { state.companions.push(node.card.name); state.say = `${node.card.name} følger med deg. Ta den trygt med hjem!`; log(`${node.card.name} er rolig og følger med hjem.${note}`); }
  else if (['goal', 'exit'].includes(node.kind)) { state.say = `Du klarte det! ${node.card.name}! 🎉`; log(`Dere nådde ${node.card.name}! 🎉${note}`); }
  else if (node.kind === 'deliver') { state.inventory.push(node.item.name); log(`Fant ${node.item.name}.${note}`); }
  else if (node.item) { state.inventory.push(node.item.name); log(`${node.kind === 'item' ? 'Tok' : 'Fikk'} ${node.item.name}${node.kind === 'item' ? '' : ` (${node.card.name})`}.${note}`); }
  state.done.push(node.id);
  save(); render();
}

function goTo(roomId) {
  if (!reach().has(roomId)) { state.selected = roomId; render(); return; }
  state.here = roomId;
  state.selected = roomId;
  if (!state.visited.includes(roomId)) { state.visited.push(roomId); log(`Gikk inn i rom ${roomId}.`); }
  save(); render();
}

// ---------- render ----------

function render() {
  const { run } = current;
  $('#intro').replaceChildren(
    el('h2', {}, run.mission.name),
    el('p', { class: 'read' }, run.mission.intro),
    el('p', { class: 'hint' }, `Kode: ${current.code} · ${run.map.rooms.length} rom · soner: ${[...new Set(run.map.rooms.map((r) => r.zoneName))].join(' → ')}`),
  );
  renderMap();
  renderRoom(state.selected ?? state.here);
  renderInventory();
  $('#log').replaceChildren(...state.log.slice().reverse().map((t) => el('li', {}, t)));
  $('#template').textContent = dmTemplate(content, run, current.result);
  renderRequests();
  publish();
}

function renderMap() {
  const { map } = current.run;
  const open = reach();
  const { pos, width, height } = layoutMap(map);
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', width); svg.setAttribute('height', height); svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const mk = (tag, attrs) => { const n = document.createElementNS(ns, tag); for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v); return n; };
  for (const e of map.edges) {
    const a = pos[e.a], b = pos[e.b];
    const gateOpen = e.gate !== null && state.openGates.includes(e.gate);
    const stroke = e.gate !== null ? (gateOpen ? 'var(--open)' : 'var(--gate)') : 'var(--line)';
    svg.append(mk('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke, 'stroke-width': e.gate !== null ? 6 : 3, 'stroke-dasharray': e.secret ? '4 6' : '' }));
  }
  for (const r of map.rooms) {
    const p = pos[r.id];
    const g = mk('g', { class: 'room-node', role: 'button', 'aria-label': `Rom ${r.id}` });
    const reachable = open.has(r.id);
    const fill = reachable ? `var(--zone${Math.min(r.zone, 3)})` : 'var(--line)';
    const stroke = r.id === state.here ? 'var(--here)' : r.id === state.selected ? 'var(--accent)' : 'transparent';
    g.append(mk('circle', { cx: p.x, cy: p.y, r: 24, fill, stroke, 'stroke-width': 5 }));
    const t = mk('text', { x: p.x, y: p.y + 5, 'text-anchor': 'middle' });
    t.textContent = r.id === map.start ? 'Start' : r.id === map.end ? 'Mål' : String(r.id);
    g.append(t);
    if (state.visited.includes(r.id)) g.append(mk('circle', { cx: p.x + 17, cy: p.y - 17, r: 5, fill: 'var(--accent)' }));
    g.addEventListener('click', () => goTo(r.id));
    svg.append(g);
  }
  $('#map').replaceChildren(svg);
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
  );
}

function ladder(node) {
  const first = node.needs[openNeeds(node)[0]];
  if (!first) return null;
  const clearer = first.via === 'rhyme'
    ? '«Resten av regla må finnes et sted. Kanskje noen i hulen kan den, eller den står skrevet på en vegg?»'
    : first.specific ? `«Har du ${first.name.toLowerCase()}? Kanskje i sekken, eller et annet sted i hulen?»`
      : `«Har du noe som er ${label(first.tag)}? Kanskje i sekken, eller et annet sted i hulen?»`;
  return el('ol', { class: 'ladder' },
    el('li', {}, first.sign ? `Beskriv tegnet: «${first.sign}»` : 'Beskriv det barnet ser og spør hva hun vil gjøre.'),
    el('li', {}, `Tydeligere: ${clearer}`),
    el('li', {}, 'Fortsatt fast? Bruk LØS eller GI LIKEVEL.'),
  );
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
  const title = roomId === run.map.start ? 'Inngangen' : roomId === run.map.end ? 'Det innerste rommet' : `Rom ${roomId}`;
  const parts = [
    el('h2', {}, `${title} · ${room.zoneName.toLowerCase()}`),
    !reachableNow ? el('p', { class: 'hint' }, 'Dette rommet ligger bak et hinder som ikke er løst ennå. (Du ser det fordi du er Forteller.)') : null,
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
