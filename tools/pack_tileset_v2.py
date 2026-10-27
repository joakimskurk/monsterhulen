#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from PIL import Image


def main(manifest_path, out_path):
    manifest_path = Path(manifest_path)
    out_path = Path(out_path)
    root = manifest_path.parent.parent if manifest_path.parent.name == 'visual' else manifest_path.parent
    data = json.loads(manifest_path.read_text(encoding='utf-8'))
    atlas_spec = data['atlas']
    cell = atlas_spec['cell']
    atlas = Image.new('RGBA', (atlas_spec['width'], atlas_spec['height']), (0, 0, 0, 0))

    ordered = sorted(
        data.get('assets', []),
        key=lambda e: (e['atlas']['row'], e['atlas']['col'], e['id'])
    )

    for entry in ordered:
        source = root / entry['file']
        im = Image.open(source).convert('RGBA')
        if im.size != (cell, cell):
            raise ValueError(f"{entry['id']} is {im.size}, expected {cell}x{cell}")
        x = entry['atlas']['col'] * cell
        y = entry['atlas']['row'] * cell
        if x + cell > atlas.width or y + cell > atlas.height:
            raise ValueError(f"{entry['id']} atlas slot is outside output bounds")
        atlas.alpha_composite(im, (x, y))

    out_path.parent.mkdir(parents=True, exist_ok=True)
    atlas.save(out_path, optimize=False)
    print(f"WROTE {out_path} ({atlas.width}x{atlas.height}) with {len(ordered)} assets")


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('usage: pack_tileset_v2.py <manifest.json> <atlas.png>')
        raise SystemExit(2)
    main(sys.argv[1], sys.argv[2])
