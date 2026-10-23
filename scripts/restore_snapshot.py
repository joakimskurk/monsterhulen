#!/usr/bin/env python3
from pathlib import Path
import base64, hashlib, json, tarfile, tempfile
ROOT=Path(__file__).resolve().parents[1]
SNAP=ROOT/'snapshot'
def restore(manifest):
    m=json.loads((SNAP/manifest).read_text())
    encoded=''.join((SNAP/p).read_text(encoding='ascii').strip() for p in m['parts'])
    data=base64.b85decode(encoded.encode('ascii'))
    if len(data)!=m['bytes'] or hashlib.sha256(data).hexdigest()!=m['sha256']:
        raise SystemExit(f'Archive verification failed: {m["archive"]}')
    with tempfile.NamedTemporaryFile(suffix='.tar.gz') as tmp:
        tmp.write(data); tmp.flush()
        with tarfile.open(tmp.name,'r:gz') as tf: tf.extractall(ROOT)
    print('restored',m['archive'])
restore('source_docs_v0.12.3.tar.gz.manifest.json')
restore('runtime_entities_v0.12.3.tar.gz.manifest.json')
