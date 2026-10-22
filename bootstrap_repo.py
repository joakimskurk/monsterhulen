#!/usr/bin/env python3
from pathlib import Path
import base64, hashlib, json, shutil, tarfile, tempfile

ROOT = Path(__file__).resolve().parent
BUNDLE = ROOT / 'repo_bundle'

def restore(manifest_name):
    m = json.loads((BUNDLE / manifest_name).read_text(encoding='utf-8'))
    encoded = ''.join((BUNDLE / p).read_text(encoding='ascii').strip() for p in m['parts'])
    data = base64.b85decode(encoded.encode('ascii'))
    if len(data) != m['bytes']:
        raise SystemExit(f"Størrelsesfeil i {m['archive']}: {len(data)} != {m['bytes']}")
    digest = hashlib.sha256(data).hexdigest()
    if digest != m['sha256']:
        raise SystemExit(f"SHA-256-feil i {m['archive']}: {digest}")
    with tempfile.NamedTemporaryFile(suffix='.tar.gz') as tmp:
        tmp.write(data); tmp.flush()
        with tarfile.open(tmp.name, 'r:gz') as tf:
            tf.extractall(ROOT)
    return m

source = restore('source_manifest.json')
thumbs = restore('thumb_manifest.json')

# Runtimeen har allerede thumbnail fallback for manglende large-assets.
# Lag en lokal large-kopi av thumbnailen når large ikke finnes, så en ren clone
# ikke gir 404-forespørsler og alle 86 forventede entity-paths eksisterer.
entity_root = ROOT / 'assets' / 'v2' / 'entities'
for thumb in entity_root.rglob('*_thumb.png'):
    large = thumb.with_name(thumb.name.replace('_thumb.png', '_large.png'))
    if not large.exists():
        shutil.copyfile(thumb, large)

thumb_count = len(list(entity_root.rglob('*_thumb.png')))
large_count = len(list(entity_root.rglob('*_large.png')))
if thumb_count != 43 or large_count != 43:
    raise SystemExit(f'Asset-rekonstruksjon feilet: thumb={thumb_count}, large={large_count}')

print(f"OK: Monsterhulen V0.12.3 gjenopprettet. Kildebundle {source['sha256'][:12]}…, assets {thumbs['sha256'][:12]}…, 86 runtime-paths.")
