#!/usr/bin/env node
// Local server for the table prototype: static files + a tiny two-device relay.
// The DM page is authoritative. It publishes a *filtered* player view; the child's iPad
// only sends requests (with a unique actionId) that the DM accepts or declines.
// Same shape as the planned internet relay (DECISIONS.md 2026-10-27), but in memory on the home network.
//
//   node tools/server.mjs          only this computer (127.0.0.1)
//   node tools/server.mjs --lan    also reachable from an iPad on the same Wi-Fi
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
import { join, normalize, extname } from 'node:path';
import { REPO_ROOT } from './lib/content.mjs';

const PORT = 8765;
const LAN = process.argv.includes('--lan');
const HOST = LAN ? '0.0.0.0' : '127.0.0.1';
const TYPES = { '.html': 'text/html; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const ALLOWED_DIRS = ['prototype', 'tools', 'content', 'assets'];

const sessions = new Map();
function session(code) {
  if (!sessions.has(code)) sessions.set(code, { player: null, playerClients: new Set(), dmClients: new Set(), pending: [], seen: new Set() });
  return sessions.get(code);
}
const send = (res, event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

function lanUrls() {
  const out = [];
  for (const list of Object.values(networkInterfaces())) for (const n of list || []) if (n.family === 'IPv4' && !n.internal) out.push(`http://${n.address}:${PORT}`);
  return out;
}

async function body(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 512_000) throw new Error('too large'); }
  return JSON.parse(raw || '{}');
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const api = url.pathname.match(/^\/api\/([A-Z0-9]{4,8})\/(player-stream|dm-stream|player|request|ack)$/);
    if (url.pathname === '/api/info') {
      res.writeHead(200, { 'content-type': TYPES['.json'] });
      return res.end(JSON.stringify({ lan: LAN, urls: LAN ? lanUrls() : [`http://127.0.0.1:${PORT}`] }));
    }
    if (api) {
      const [, code, route] = api;
      const s = session(code);
      if (route.endsWith('-stream')) {
        res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
        const clients = route === 'player-stream' ? s.playerClients : s.dmClients;
        clients.add(res);
        if (route === 'player-stream' && s.player) send(res, 'view', s.player);
        if (route === 'dm-stream') for (const r of s.pending) send(res, 'request', r);
        const ping = setInterval(() => res.write(': ping\n\n'), 20000);
        req.on('close', () => { clearInterval(ping); clients.delete(res); });
        return;
      }
      if (req.method !== 'POST') { res.writeHead(405); return res.end(); }
      const data = await body(req);
      if (route === 'player') {
        s.player = data;
        for (const c of s.playerClients) send(c, 'view', data);
      } else if (route === 'request') {
        // Idempotent: a double tap or a retry after reconnect is delivered once.
        if (typeof data.actionId === 'string' && !s.seen.has(data.actionId)) {
          s.seen.add(data.actionId);
          s.pending.push(data);
          for (const c of s.dmClients) send(c, 'request', data);
        }
      } else if (route === 'ack') {
        s.pending = s.pending.filter((r) => r.actionId !== data.actionId);
        for (const c of s.dmClients) send(c, 'ack', { actionId: data.actionId });
      }
      res.writeHead(204, { 'cache-control': 'no-store' });
      return res.end();
    }

    // Static files, limited to the folders the prototype needs.
    let path = decodeURIComponent(url.pathname);
    if (path === '/' || path === '/prototype') path = '/prototype/index.html';
    if (path.endsWith('/')) path += 'index.html';
    const rel = normalize(path).replace(/^([/\\])+/, '');
    if (rel.includes('..') || !ALLOWED_DIRS.includes(rel.split(/[/\\]/)[0])) { res.writeHead(404); return res.end('not found'); }
    const file = await readFile(join(REPO_ROOT, rel));
    res.writeHead(200, { 'content-type': TYPES[extname(rel)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(file);
  } catch (err) {
    res.writeHead(err.code === 'ENOENT' ? 404 : 500);
    res.end(err.code === 'ENOENT' ? 'not found' : 'error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Monsterhulen bordprototype: http://127.0.0.1:${PORT}/prototype/`);
  if (LAN) for (const u of lanUrls()) console.log(`  På iPad (samme Wi-Fi): ${u}/prototype/child.html`);
  else console.log('  Start med --lan for å koble til en iPad på samme Wi-Fi.');
});
