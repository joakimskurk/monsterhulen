#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
import json, hashlib, sys
root=Path(sys.argv[1])
manifest=json.loads((root/'visual/connection-manifest-v2.json').read_text(encoding='utf-8'))
hashes=json.loads((root/'visual/connection-assets-v2.sha256.json').read_text(encoding='utf-8'))
errors=[]
if len(manifest.get('assets',[]))!=16:errors.append(f"expected 16 assets, got {len(manifest.get('assets',[]))}")
ids=set();slots=set()
for e in manifest.get('assets',[]):
    aid=e['id'];p=root/e['file'];slot=(e['atlas']['row'],e['atlas']['col'])
    if aid in ids:errors.append(f'duplicate id {aid}')
    if slot in slots:errors.append(f'duplicate slot {slot}')
    ids.add(aid);slots.add(slot)
    if not p.exists():errors.append(f'{aid}: missing');continue
    sha=hashlib.sha256(p.read_bytes()).hexdigest();rec=hashes.get(aid,{})
    if rec.get('sha256')!=sha:errors.append(f'{aid}: sha mismatch')
    im=Image.open(p).convert('RGBA')
    if im.size!=(32,32):errors.append(f'{aid}: size {im.size}')
    alpha=set(im.getchannel('A').getdata())
    if not alpha.issubset({0,255}) or 0 not in alpha or 255 not in alpha:errors.append(f'{aid}: alpha not hard transparent/opaque')
    o=e['orientation'];state=e['state'];px=im.load()
    if o in 'NS':
        band=range(0,6) if o=='N' else range(26,32);opening=[px[x,y][3] for y in band for x in range(6,26)]
    else:
        band=range(0,6) if o=='W' else range(26,32);opening=[px[x,y][3] for x in band for y in range(6,26)]
    if state=='door_locked':
        if any(a==0 for a in opening):errors.append(f'{aid}: locked door must occupy full 20px opening band')
    elif not any(a==0 for a in opening):errors.append(f'{aid}: traversable/blocked marker variant needs transparent threshold pixels')
if set(hashes)!=ids:errors.append('hash registry does not exactly cover manifest IDs')
if errors:
    for e in errors:print('FAIL',e)
    raise SystemExit(1)
print(f'PASS {len(ids)}/16 connection assets')
