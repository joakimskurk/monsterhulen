// What the child's iPad may see. Built only from an allow-list of fields:
// never needs, signs, providers, solutions, hidden items, zones ahead or the DM template.
import { doorsFor, doorKind, caveBounds } from './map-view.mjs';

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
  const visited = new Set(state.visited);
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
    // A source (a well, a flower meadow): fill something there, or just take from it (owner's playtest:
    // the well was on the DM's screen only, so the water could not be found).
    if (n.kind === 'source') { things.push({ id: n.id, kind: 'source', fill: n.needs.length > 0, name: n.card.name, icon: iconOf(n.card.name), text: n.card.intro || '' }); continue; }
    // The deep round: reaching the way out and picking up what is to be delivered waited for the DM.
    if (n.kind === 'exit' && !n.needs.length) { things.push({ id: n.id, kind: 'exit', name: n.card.name, icon: iconOf(n.card.name), text: n.card.intro || 'Her er veien videre!' }); continue; }
    if (n.kind === 'deliver' && !n.needs.length) { things.push({ id: n.id, kind: 'item', name: n.item.name, icon: n.item.icon || iconOf(n.card.name), text: `Her er ${n.item.name.toLowerCase()}!` }); continue; }
    if (n.treasure && !n.needs.length) { things.push({ id: n.id, kind: 'item', name: n.treasure.name, icon: iconOf(n.treasure.name), text: `Her ligger ${n.treasure.about}!` }); continue; }
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
    // Fog of war as in the original (map-view.mjs): only rooms she has been in are drawn; everything
    // else is fog, with «?» (or 🔒) just beyond the doors of the room she is in. Secret doors and the
    // shape of unexplored rooms are never sent.
    cave: {
      bounds: caveBounds(map.rooms),
      rooms: map.rooms.filter((r) => visited.has(r.id)).map((r) => ({
        id: r.id, x: r.x, y: r.y, w: r.w, h: r.h, label: r.name,
        look: r.id === here ? 'here' : 'visited',
        // Only a neighbour behind an open door: no jumping across the cave.
        canGo: map.edges.some((e) => !e.secret && (e.gate === null || openGates.has(e.gate)) && ((e.a === here && e.b === r.id) || (e.b === here && e.a === r.id))),
      })),
      doors: doorsFor(map.edges, visited, doorKind(state, map.edges), map.distance[map.start]),
      probes: map.edges.filter((e) => !e.secret && (e.a === here || e.b === here) && !visited.has(e.a === here ? e.b : e.a)).map((e) => {
        const other = e.a === here ? e.b : e.a;
        const cell = e.a === here ? e.bCell : e.aCell;
        return { x: cell.x, y: cell.y, room: other, locked: e.gate !== null && !openGates.has(e.gate) };
      }),
    },
    // The doors of the room she is in, by direction, for the big direction buttons (as in the original).
    // Secret doors are never listed.
    exits: map.edges.filter((e) => !e.secret && (e.a === here || e.b === here)).map((e) => ({
      dir: e.a === here ? e.aDir : { n: 's', e: 'w', s: 'n', w: 'e' }[e.aDir],
      room: e.a === here ? e.b : e.a,
      locked: e.gate !== null && !openGates.has(e.gate),
    })),
    room: { id: here, title: map.rooms[here].name || `Rom ${here}`, place: map.rooms[here].zoneName, things },
    inventory: state.inventory.slice(),
    // Something she can make now: every part of it is in the backpack (never before, so nothing is told early).
    recipes: run.nodes.filter((n) => n.kind === 'recipe' && !done.has(n.id) && n.needs.every((x) => state.inventory.includes(run.nodes.find((p) => p.id === x.provider)?.item?.name)))
      .map((n) => ({ id: n.id, name: n.item.name, icon: n.item.icon || '✨' })),
    companions: state.companions.slice(),
    say: state.say || null,
    // The die: only that she should roll, never why the DM asked.
    roll: state.roll ? { id: state.roll.id, text: state.roll.text } : null,
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
