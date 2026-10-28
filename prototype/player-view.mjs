// What the child's iPad may see. Built only from an allow-list of fields:
// never needs, signs, providers, solutions, hidden items, zones ahead or the DM template.
import { reachable } from '../tools/runsim/map.mjs';

const FIGURE_KINDS = new Set(['blocker', 'trader', 'quest', 'companion', 'target', 'lock', 'machine', 'goal', 'exit', 'deliver']);

// The latest thing that happened, said to the child: «Du fant Sølvskje!» rather than the DM's log line.
// Walking into a room is not news; the room itself shows that.
function latestNews(log) {
  for (let i = log.length - 1; i >= 0; i--) {
    const line = log[i].replace(' (Forteller bestemte)', '');
    if (/^(Gikk inn i rom|Eventyret begynner)/.test(line)) continue;
    const took = line.match(/^Tok (.+)\.$/);
    const got = line.match(/^Fikk (.+) \((.+)\)\.$/);
    const text = took ? `Du fant ${took[1].toLowerCase()}!` : got ? `Du fikk ${got[1].toLowerCase()} av ${got[2].toLowerCase()}!` : line;
    // Getting a thing is shown as a popup on the iPad (drag it into the backpack), not as a line.
    return { id: i, text, kind: took || got ? 'item' : 'event' };
  }
  return null;
}

export function playerView(run, state, extra = {}) {
  const { map } = run;
  const openGates = new Set(state.openGates);
  const reach = reachable(map, { openGates });
  const visited = new Set(state.visited);
  // Known rooms: visited ones and their direct neighbours (not through secret doors).
  const known = new Set(visited);
  for (const e of map.edges) {
    if (e.secret) continue;
    if (visited.has(e.a)) known.add(e.b);
    if (visited.has(e.b)) known.add(e.a);
  }
  const done = new Set(state.done);

  const here = state.here;
  // Pictures for everything the child sees (workshop C1). The run knows its own things and figures;
  // what comes from outside the run (the hero book) is passed in by the DM page as `extra.icons`.
  const icons = new Map();
  for (const n of run.nodes) { if (n.item?.icon) icons.set(n.item.name, n.item.icon); if (n.card?.icon) icons.set(n.card.name, n.card.icon); }
  for (const a of run.alternatives) icons.set(a.item, a.icon);
  for (const a of run.ambient) icons.set(a.figure.name, a.figure.icon);
  const iconOf = (name) => icons.get(name) || extra.icons?.[name] || '❔';
  const things = [];
  for (const n of run.nodes) {
    if (n.room !== here || done.has(n.id)) continue;
    if (n.kind === 'item') { if (!n.hidden) things.push({ id: n.id, kind: 'item', name: n.item.name, icon: iconOf(n.item.name), text: n.item.found || `Her ligger ${n.item.name.toLowerCase()}.` }); continue; }
    if (FIGURE_KINDS.has(n.kind)) {
      // Progress on several needs, as a count only (never which ones are left).
      const total = n.needs.filter((x) => !x.local).length;
      const met = (state.needsMet?.[n.id] || []).length;
      const progress = total > 1 && met > 0 ? ` (${met} av ${total} er på plass)` : '';
      things.push({ id: n.id, kind: 'figure', name: n.card.name, icon: iconOf(n.card.name), text: `${n.card.intro || ''}${progress}`.trim() });
    }
  }
  for (const a of run.alternatives) if (a.room === here && !done.has(`alt:${a.room}`)) things.push({ id: `alt:${a.room}`, kind: 'item', name: a.item, icon: iconOf(a.item), text: `Her ligger ${a.item.toLowerCase()}.` });
  for (const a of run.ambient) if (a.room === here && !done.has(`amb:${a.room}`)) things.push({ id: `amb:${a.room}`, kind: 'figure', name: a.figure.name, icon: iconOf(a.figure.name), text: a.figure.intro || '' });

  return {
    v: 1,
    runCode: state.runCode,
    mission: { name: run.mission.name, intro: run.mission.intro },
    here,
    // The cave as the child knows it (map-view.mjs): rooms she has been in, with their names, and the
    // rooms next to them in fog. Secret doors and what lies beyond the known rooms are never sent.
    cave: {
      rooms: map.rooms.filter((r) => known.has(r.id)).map((r) => ({
        id: r.id, x: r.x, y: r.y, w: r.w, h: r.h,
        look: r.id === here ? 'here' : visited.has(r.id) ? 'visited' : 'fog',
        tone: visited.has(r.id) ? r.tone : null,
        label: visited.has(r.id) ? r.name : '?',
        canGo: reach.has(r.id) && r.id !== here,
      })),
      doors: map.edges.filter((e) => !e.secret && known.has(e.a) && known.has(e.b)).map((e) => ({
        aCell: e.aCell, bCell: e.bCell, dir: e.aDir, kind: e.gate === null ? 'open' : openGates.has(e.gate) ? 'unlocked' : 'locked',
      })),
    },
    room: { id: here, title: map.rooms[here].name || `Rom ${here}`, place: map.rooms[here].zoneName, things },
    inventory: state.inventory.slice(),
    companions: state.companions.slice(),
    say: state.say || null,
    end: extra.end || null,
    // name -> picture for the backpack, friends, the end screen and the hero book
    icons: Object.fromEntries([...state.inventory, ...state.companions, ...(extra.book?.friends || []), ...(extra.book?.ting || []),
      ...(extra.end ? [...extra.end.helped, ...extra.end.found, ...extra.end.friends.map((f) => f.name), ...extra.end.offer.map((o) => o.name)] : [])].map((n) => [n, iconOf(n)])),
    book: extra.book || null,
    pack: extra.pack || null,
    log: state.log.slice(-3).map((l) => l.replace(' (Forteller bestemte)', '')),
    news: latestNews(state.log),
  };
}
