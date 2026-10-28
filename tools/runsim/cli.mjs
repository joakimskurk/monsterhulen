#!/usr/bin/env node
// Prototype of the V2 run generator + playthrough automaton.
//
//   node tools/runsim/cli.mjs --mission GLASS_HEART --seed 7 --length VANLIG   one run as a DM template
//   node tools/runsim/cli.mjs --batch 1000                                      all missions x lengths, statistics
//   node tools/runsim/cli.mjs --selftest                                        proves the automaton rejects broken runs
import { loadContent } from '../lib/content.mjs';
import { acceptedRun as acceptFor } from './accept.mjs';
import { playthrough, bypassCheck } from './playthrough.mjs';
import { dmTemplate, chainSignature } from './report.mjs';
import { LENGTHS } from './map.mjs';
import { missionIds } from './theme.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1]?.startsWith('--') || all[i + 1] === undefined ? true : all[i + 1]] : null)).filter(Boolean));
const content = loadContent();
const acceptedRun = (missionId, seed, length) => acceptFor(content, missionId, seed, length);

if (args.selftest) {
  selftest();
} else if (args.batch) {
  batch(Number(args.batch));
} else {
  const mission = args.mission || 'GLASS_HEART';
  const length = args.length || 'VANLIG';
  const accepted = acceptedRun(mission, args.seed || 1, length);
  if (!accepted) { console.log('Ingen gyldig run funnet.'); process.exit(1); }
  console.log(dmTemplate(content, accepted.run, accepted.result));
  console.log(`\n(godkjent etter ${accepted.attempts} forsøk · kjedeform: ${chainSignature(accepted.run)})`);
}

function batch(n) {
  let allOk = true;
  for (const missionId of missionIds(content)) {
    for (const length of Object.keys(LENGTHS)) {
      const shapes = new Map();
      const figures = new Map();
      const types = new Map();
      let failed = 0;
      let attempts = 0;
      for (let seed = 1; seed <= n; seed++) {
        const a = acceptedRun(missionId, seed, length);
        if (!a) { failed++; continue; }
        attempts += a.attempts;
        const sig = chainSignature(a.run);
        shapes.set(sig, (shapes.get(sig) || 0) + 1);
        for (const node of a.run.nodes) {
          if (node.card?.id && node.cardKind !== 'obstacle' && ['blocker', 'trader', 'quest', 'companion'].includes(node.kind)) figures.set(node.card.id, (figures.get(node.card.id) || 0) + 1);
          if (node.sourceType) types.set(node.sourceType, (types.get(node.sourceType) || 0) + 1);
        }
      }
      const okRuns = n - failed;
      if (failed) allOk = false;
      const topShare = okRuns ? Math.max(...shapes.values()) / okRuns : 0;
      const totalTypes = [...types.values()].reduce((a, b) => a + b, 0) || 1;
      console.log(`${missionId.padEnd(16)} ${length.padEnd(6)} ok ${String(okRuns).padStart(4)}/${n}  forsøk/run ${(attempts / Math.max(1, okRuns)).toFixed(2)}  kjedeformer ${String(shapes.size).padStart(4)}  vanligste ${(topShare * 100).toFixed(1)}%  figurer brukt ${figures.size}`);
      console.log(`${''.padEnd(24)} kildetyper: ${[...types.entries()].sort((a, b) => b[1] - a[1]).map(([t, c]) => `${t} ${Math.round((100 * c) / totalTypes)}%`).join(', ')}`);
    }
  }
  if (!allOk) process.exit(1);
}

// Breaks accepted runs on purpose and checks that the automaton or bypass check catches it.
function selftest() {
  let checked = 0;
  const misses = [];
  for (let seed = 1; seed <= 300; seed++) {
    for (const missionId of missionIds(content)) {
      const mission = { id: missionId };
      const a = acceptedRun(missionId, seed, 'VANLIG');
      if (!a) continue;
      const run = a.run;

      // 1. Move a provider behind the gate its chain is for -> must fail.
      const movable = run.nodes.filter((n) => n.room !== null && n.consumer && rootGate(run, n) !== null && isOnlySource(run, n));
      if (movable.length) {
        const node = movable[seed % movable.length];
        const target = run.map.rooms.find((r) => r.zone >= rootGate(run, node) && r.id !== run.map.end);
        if (target) {
          const original = node.room;
          node.room = target.id;
          checked++;
          if (playthrough(run).ok) misses.push(`${mission.id}/${seed}: provider ${node.id} moved behind its gate was not caught`);
          node.room = original;
        }
      }

      // 2. Add a secret door from zone 0 into the last zone -> bypass check must fail.
      const from = run.map.rooms.find((r) => r.zone === 0);
      const to = run.map.rooms.find((r) => r.zone === run.map.gates);
      run.map.edges.push({ a: from.id, b: to.id, gate: null, secret: true });
      checked++;
      if (bypassCheck(run).ok) misses.push(`${mission.id}/${seed}: cross-zone secret door was not caught`);
      run.map.edges.pop();

      // 3. Remove one provider entirely -> must fail.
      const victim = run.nodes.find((n) => n.consumer && isOnlySource(run, n));
      if (victim) {
        const idx = run.nodes.indexOf(victim);
        run.nodes.splice(idx, 1);
        checked++;
        if (playthrough(run).ok) misses.push(`${mission.id}/${seed}: removed provider ${victim.id} was not caught`);
        run.nodes.splice(idx, 0, victim);
      }
    }
  }
  console.log(`Selftest: ${checked} sabotages, ${misses.length} not caught.`);
  misses.slice(0, 15).forEach((m) => console.log(`  ${m}`));
  if (misses.length) process.exit(1);
}

// True if no other node in the run provides what this node provides. Sabotaging a redundant
// provider (e.g. a second companion with the same ability) correctly leaves the run solvable.
// Checked on every link up the chain: the bucket is irrelevant if a friend can make the light it was for.
function isOnlySource(run, node) {
  const gives = (n) => (n.kind === 'companion' ? n.ability : n.item?.specificId ? [n.item.specificId] : n.item?.tags || []);
  const subtree = (n) => {
    const ids = new Set([n.id]);
    for (const need of n.needs) if (need.provider) for (const id of subtree(run.nodes.find((x) => x.id === need.provider))) ids.add(id);
    return ids;
  };
  for (let link = node; link?.consumer; link = run.nodes.find((n) => n.id === link.consumer)) {
    const inside = subtree(link);
    const mine = new Set(gives(link));
    if (run.nodes.some((other) => !inside.has(other.id) && other.consumer && gives(other).some((t) => mine.has(t)))) return false;
  }
  return true;
}

// The gate at the top of a provider's chain. Everything in the chain must be reachable before it.
// A provider may sit deeper than its direct consumer (that just means a return trip), but never
// behind this gate. Returns null for chains that end at the goal rather than a gate.
function rootGate(run, node) {
  let current = node;
  while (current.consumer) current = run.nodes.find((n) => n.id === current.consumer);
  return current.gate ?? null;
}
