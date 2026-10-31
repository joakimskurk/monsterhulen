// Is the child stuck? (owner's playtest NY_KOM_UT-VANLIG-6747: the first link of the chain was a coin
// hidden in a room, nothing on the iPad said so, and the way on looked impossible.)
// Stuck: she has been in every room she can reach and has nothing on the iPad she can use there: no
// thing to take, no source, no way out, nothing in the backpack or a friend that fits anyone, nothing
// to make. Then the iPad gets a nudge that says no more than her map already shows (look around in the
// rooms with 🔍; or the task someone showed), and the DM gets the exact answer. Pure, so tests use it.
import { playerView } from './player-view.mjs';
import * as table from './table.mjs';

export function stuckHint(t) {
  const { run, state } = t;
  if (table.isFinished(t)) return null;
  const reachable = [...table.reach(t)];
  // Somewhere she has not been yet, behind a door that is open to her: she can still explore.
  if (reachable.some((r) => !state.visited.includes(r))) return null;
  const views = reachable.map((room) => playerView(run, { ...state, here: room }));
  const v0 = views[0];
  if (v0.recipes.length) return null;
  for (const v of views) {
    for (const thing of v.room.things) {
      if (['item', 'exit'].includes(thing.kind) || (thing.kind === 'source' && !thing.fill)) return null;
      if (v.inventory.some((name) => table.fits(t, thing.id, { given: name })) || v.companions.some((name) => table.fits(t, thing.id, { friend: name }))) return null;
    }
  }
  // Something to find by looking around (only in a room she has not finished looking in).
  const hidden = run.nodes.filter((n) => n.kind === 'item' && n.hidden && !table.isDone(t, n.id) && reachable.includes(n.room));
  if (hidden.length) {
    const rooms = [...new Set(hidden.map((n) => n.room))];
    return {
      kind: 'search',
      child: 'Kanskje noe er gjemt et sted? Se deg rundt med lupa i rommene med 🔍.',
      dm: `Barnet står fast. ${hidden.map((n) => `${n.item.name} er gjemt i ${run.map.rooms[n.room].name} (rom ${n.room})`).join(', ')}. Gi gjerne et hint om hvor.`,
      rooms,
    };
  }
  const task = views.flatMap((v) => v.room.things.filter((x) => x.task).map((x) => ({ room: v.here, ...x })))[0];
  if (task) {
    return { kind: 'task', child: `${task.name} trenger hjelp: ${task.task}. Klarer du det?`, dm: `Barnet står fast. ${task.name} (rom ${task.room}) har en oppgave: «${task.task}». Spill den ut sammen.` };
  }
  return { kind: 'dm', child: null, dm: 'Barnet står fast, og ingenting på iPaden kan hjelpe. Bruk GI LIKEVEL der det gir mening.' };
}
