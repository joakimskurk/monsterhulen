#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from PIL import Image

EXPECTED_TILE = 32
EXPECTED_ATLAS = (512, 512)


def fail(msg):
    print(f"FAIL: {msg}")
    return 1


def main(manifest_path):
    manifest_path = Path(manifest_path)
    root = manifest_path.parent.parent if manifest_path.parent.name == 'visual' else manifest_path.parent
    data = json.loads(manifest_path.read_text(encoding='utf-8'))

    if data.get('tileSize') != EXPECTED_TILE:
        return fail(f"tileSize must be {EXPECTED_TILE}")
    atlas = data.get('atlas') or {}
    if (atlas.get('width'), atlas.get('height')) != EXPECTED_ATLAS:
        return fail(f"atlas must be {EXPECTED_ATLAS[0]}x{EXPECTED_ATLAS[1]}")
    if atlas.get('cell') != EXPECTED_TILE:
        return fail(f"atlas cell must be {EXPECTED_TILE}")

    seen_ids = set()
    seen_slots = set()
    errors = []

    for entry in data.get('assets', []):
        aid = entry.get('id')
        if not aid or aid in seen_ids:
            errors.append(f"duplicate/missing id: {aid}")
            continue
        seen_ids.add(aid)

        if (entry.get('width'), entry.get('height')) != (EXPECTED_TILE, EXPECTED_TILE):
            errors.append(f"{aid}: manifest box must be 32x32")

        slot = entry.get('atlas') or {}
        pos = (slot.get('col'), slot.get('row'))
        if None in pos:
            errors.append(f"{aid}: atlas slot missing")
        elif pos in seen_slots:
            errors.append(f"{aid}: atlas slot {pos} reused")
        else:
            seen_slots.add(pos)

        p = root / entry.get('file', '')
        if not p.exists():
            errors.append(f"{aid}: source file missing: {p}")
            continue

        try:
            im = Image.open(p).convert('RGBA')
        except Exception as exc:
            errors.append(f"{aid}: cannot open: {exc}")
            continue

        if im.size != (EXPECTED_TILE, EXPECTED_TILE):
            errors.append(f"{aid}: PNG is {im.size}, expected 32x32")

        alpha = im.getchannel('A')
        if entry.get('kind') != 'floor' and alpha.getextrema() == (255, 255):
            errors.append(f"{aid}: overlay/icon has no transparent pixels")

        if entry.get('kind') == 'floor':
            # floor tiles should fill the cell; transparent holes are allowed only by explicit future contract.
            if alpha.getextrema()[0] < 250:
                errors.append(f"{aid}: floor contains transparent pixels")

    if errors:
        for e in errors:
            print('FAIL:', e)
        print(f"\n{len(errors)} error(s)")
        return 1

    print(f"PASS: {len(seen_ids)} assets satisfy Tileset Contract V2")
    return 0


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('usage: validate_tileset_v2.py <manifest.json>')
        raise SystemExit(2)
    raise SystemExit(main(sys.argv[1]))
