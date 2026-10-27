// Renders a generated run as the DM template (Forteller-mal): the guaranteed chain per gate,
// the signs to use as hints, alternatives, and the room list.
import { label } from './playthrough.mjs';

const TYPE_TEXT = {
  LIGGER: 'ligger åpent', GJEMT: 'ligger gjemt (søk, fail-forward)', HANDEL: 'kan byttes til seg hos',
  BELONNING: 'får man som takk fra', VENN: 'kan gjøres av vennen', MILJO: 'kan hentes ved', OPPSKRIFT: 'kan lages',
};

export function dmTemplate(content, run, result) {
  const { map, mission } = run;
  const byId = new Map(run.nodes.map((n) => [n.id, n]));
  const tag = (t) => content.tagById.get(t)?.label || t;
  const lines = [];
  const zones = [...new Set(map.rooms.map((r) => `${r.zone}:${r.zoneName}`))].sort();

  lines.push(`OPPDRAG: ${mission.name} (${mission.type}) · seed ${run.seed} · ${run.length} · ${map.rooms.length} rom`);
  lines.push(`SONER: ${zones.map((z) => z.replace(':', ' ')).join(' · ')}`);
  lines.push(mission.intro);
  lines.push('');
  lines.push('KJEDEN (garantert vei; alt annet som passer, virker også)');

  const describe = (node, depth) => {
    const pad = '   '.repeat(depth);
    const room = node.room === null ? '' : ` [rom ${node.room}, sone ${node.zone}]`;
    if (depth === 0) {
      const gate = node.gate ? ` – sperrer veien inn til sone ${node.gate}` : '';
      lines.push(`${pad}• ${node.card.name}${room}${gate}`);
    } else {
      const how = TYPE_TEXT[node.sourceType] || '';
      const what = node.kind === 'companion' ? `${node.card.name} (kan: ${node.ability.map(tag).join(', ')})` : node.item?.name;
      const who = ['trader', 'quest', 'source'].includes(node.kind) ? ` ${node.card.name}` : '';
      lines.push(`${pad}↳ ${what}: ${how}${who}${room}`);
    }
    for (const need of node.needs) {
      const needText = need.local
        ? `vil: ${need.task} (løses der og da)`
        : need.specific ? `trenger: ${need.name}` : `trenger: ${tag(need.tag)}${need.via === 'weakness' ? ' (svakhet)' : need.via === 'trade' ? ' (som betaling)' : need.via === 'fill' ? ' (å fylle i)' : need.via === 'tool' ? ' (verktøy)' : ''}`;
      lines.push(`${pad}   ${needText}${need.sign ? `  · Tegn: «${need.sign}»` : ''}`);
      if (need.provider) describe(byId.get(need.provider), depth + 1);
    }
  };
  for (const gate of Object.keys(run.gates).map(Number).sort((a, b) => a - b)) describe(byId.get(run.gates[gate]), 0);
  const goal = run.nodes.find((n) => ['goal', 'exit', 'deliver', 'target'].includes(n.kind));
  describe(goal, 0);

  if (run.alternatives.length) {
    lines.push('');
    lines.push('OGSÅ I HULEN (ikke nødvendig, men virker):');
    for (const alt of run.alternatives) lines.push(`   ${alt.item} [rom ${alt.room}] virker på ${byId.get(alt.for).card.name} (${tag(alt.tag)})`);
  }

  lines.push('');
  lines.push('ROM FOR ROM');
  for (const r of map.rooms) {
    const here = run.nodes.filter((n) => n.room === r.id).map((n) => (n.hidden ? `${n.item.name} (gjemt)` : n.kind === 'item' ? n.item.name : n.card.name));
    const amb = run.ambient.filter((a) => a.room === r.id).map((a) => `${a.figure.name} (fritt møte)`);
    const alt = run.alternatives.filter((a) => a.room === r.id).map((a) => a.item);
    const tagText = r.id === map.start ? ' START' : r.id === map.end ? ' MÅL' : '';
    lines.push(`   rom ${String(r.id).padStart(2)} sone ${r.zone}${tagText}: ${[...here, ...alt, ...amb].join(', ') || '–'}`);
  }

  lines.push('');
  lines.push(`GJENNOMSPILLING: ${result.ok ? 'OK' : 'FEILET'} (${result.steps.length} steg)`);
  result.steps.forEach((s, i) => lines.push(`   ${String(i + 1).padStart(2)}. ${s}`));
  if (!result.ok) lines.push(`   ${result.reason}`);
  return lines.join('\n');
}

// Chain shape without names: which source types serve which gate. Used to measure real variety.
export function chainSignature(run) {
  const byId = new Map(run.nodes.map((n) => [n.id, n]));
  const walk = (node) => {
    const kids = node.needs.filter((n) => n.provider).map((n) => walk(byId.get(n.provider)));
    const me = node.sourceType || node.kind;
    return kids.length ? `${me}(${kids.join('+')})` : me;
  };
  return Object.keys(run.gates).sort().map((g) => walk(byId.get(run.gates[g]))).join(' | ');
}

export { label };
