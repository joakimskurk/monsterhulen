#!/usr/bin/env node
// Image orders for an AI image provider, one JSON object per line (JSONL).
//
//   node tools/assets/orders.mjs                    all assets that still have status "placeholder"
//   node tools/assets/orders.mjs --kind figure      only one kind (figure, item, theme, ...)
//   node tools/assets/orders.mjs --key figure:LAVAMONSTERET
//   node tools/assets/orders.mjs --out orders.jsonl
//
// Each line has the full prompt (shared style + framing for the kind + the subject), what to avoid,
// size and background, and the file the image belongs in. After generating, save the image at `file`
// and write the sidecar next to it (see content/README.md), then set the asset's status to "generated".
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadContent, REPO_ROOT } from '../lib/content.mjs';
import { composeOrder, kindOf } from '../lib/asset-prompt.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1]] : null)).filter(Boolean));
const content = loadContent();
const style = JSON.parse(readFileSync(join(REPO_ROOT, 'content', 'art-style.json'), 'utf8'));

const chosen = content.assets.filter((a) => (args.key ? a.key === args.key : a.status === 'placeholder' && (!args.kind || kindOf(a) === args.kind)));
const lines = chosen.map((a) => JSON.stringify(composeOrder(style, a)));
if (args.out) { writeFileSync(args.out, `${lines.join('\n')}\n`); console.log(`${lines.length} orders written to ${args.out}`); }
else console.log(lines.join('\n'));
