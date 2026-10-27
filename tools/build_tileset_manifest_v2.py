#!/usr/bin/env python3
from pathlib import Path
import json, sys
root=Path(sys.argv[1])
room=json.loads((root/'visual/tileset-manifest-v2.json').read_text(encoding='utf-8'))
conn=json.loads((root/'visual/connection-manifest-v2.json').read_text(encoding='utf-8'))
assets=room['assets']+conn['assets']
ids=[a['id'] for a in assets];slots=[(a['atlas']['row'],a['atlas']['col']) for a in assets]
if len(ids)!=len(set(ids)):raise SystemExit('duplicate asset id')
if len(slots)!=len(set(slots)):raise SystemExit('duplicate atlas slot')
out={'contract':'Monsterhulen Tileset Contract V2','tileSize':room['tileSize'],'mapGrid':room['mapGrid'],'atlas':room['atlas'],'assets':sorted(assets,key=lambda a:(a['atlas']['row'],a['atlas']['col'],a['id']))}
p=root/'visual/tileset-manifest-v2.full.json';p.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(f'WROTE {p} with {len(assets)} assets')
