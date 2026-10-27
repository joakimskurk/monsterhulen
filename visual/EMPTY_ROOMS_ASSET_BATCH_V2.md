# Monsterhulen — Empty Rooms Asset Batch V2

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **STRUCTURAL ROOM ASSETS GENERATED + VALIDATED — NO CONTENT ASSETS**

## Scope
This checkpoint implements the first production batch under:
- `visual/ASSET_SIZE_STANDARD_V2.md`
- `visual/TILESET_CONTRACT_V2.md`

It contains **empty-room structure only**.

Explicitly excluded:
- doors/connections,
- items,
- heroes,
- NPCs,
- monsters,
- encounters,
- furniture,
- traps,
- treasure,
- scene/room-content illustration,
- current/selected/reachable/fog state art.

## Produced assets
Exactly **21 normalized 32x32 PNG source assets**:

### Floors — 9
- `MAP_FLOOR_STONE_01` ... `MAP_FLOOR_STONE_09`

Properties:
- full-cell opaque RGBA,
- semantic-neutral cool dungeon stone,
- no environment/story motifs,
- `rotationSafe:true`,
- deterministic variation only in stone values/chips.

### Straight room-border overlays — 4
- `MAP_WALL_N_01`
- `MAP_WALL_E_01`
- `MAP_WALL_S_01`
- `MAP_WALL_W_01`

Properties:
- true transparent RGBA,
- hard alpha only,
- exact 6 px structural band on the corresponding cell edge,
- authored per orientation,
- `rotationSafe:false`.

### Outer/convex corners — 4
- `MAP_CORNER_OUTER_NW_01`
- `MAP_CORNER_OUTER_NE_01`
- `MAP_CORNER_OUTER_SE_01`
- `MAP_CORNER_OUTER_SW_01`

### Inner/concave corners — 4
- `MAP_CORNER_INNER_NW_01`
- `MAP_CORNER_INNER_NE_01`
- `MAP_CORNER_INNER_SE_01`
- `MAP_CORNER_INNER_SW_01`

All corner assets are transparent 32x32 overlays aligned to the same 6 px wall system.

## Reproducibility
The binary PNG files are deterministically generated from repo text source:

`tools/generate_empty_rooms_v2.py`

A separate reproduction run generated all **21/21 PNG files byte-identically** to the accepted local batch.

Expected SHA-256 values are committed in:

`visual/empty-rooms-assets-v2.sha256.json`

The produced manifest is committed in:

`visual/tileset-manifest-v2.json`

The generator and committed manifest are byte-synchronized; a clean generation writes the same manifest bytes as the repo copy.

This closes the binary-provenance problem for this structural batch: the source PNGs do not need to be transported through the GitHub connector to be reproducible.

## Validation
### Binary/geometry validator
Local production validation: **21 / 21 structural assets PASS**.

Checks performed:
- exact 32x32 dimensions,
- floors fully opaque RGBA,
- walls/corners contain true transparent background,
- structural overlays use alpha 0/255 only,
- straight walls stay inside exact 6 px edge bands,
- inner corners stay inside declared corner footprints,
- 21 unique stable IDs,
- 21 unique atlas slots,
- deterministic 512x512 atlas assembly.

The first floor pass was rejected because one variant had too much boundary-value variance. The floor construction was changed before the accepted batch. Do not restore the rejected brick-strip variant.

### Repo contract regression
`node tests/QA_EMPTY_ROOMS_ASSET_BATCH_V2.js`

Result: **19 PASS / 0 FAIL**.

Coverage includes:
- 32 px tile contract,
- 13x13 grid,
- 512/32 atlas contract,
- exact 9/4/4/4 asset counts,
- unique IDs and slots,
- `semantic:false`,
- floor-only rotation permission,
- hash coverage for all 21 files,
- deterministic generator seeds,
- no doors/actors/items,
- no semantic environment motifs.

## Manual visual inspection
The accepted batch was manually reviewed at nearest-neighbour scale in:
- a 9 x 4 floor-rotation matrix,
- transparent border/corner contact sheet,
- 1x1 room,
- 4x3 rectangular room,
- L-shaped room,
- irregular joined room,
- synthetic 13x13 map containing several empty room shapes.

The room geometry composes without bespoke room images or hand-crop offsets.

This is **structural acceptance**, not final art-direction approval. Further palette/detail refinement may still happen, but must preserve the same IDs, boxes, anchors and geometry contract.

## Deterministic runtime atlas
Build output:
- 512 x 512 RGBA,
- 16 x 16 slots,
- 32 x 32 per slot,
- first 9 slots on row 0 = floor variants,
- row 1 slots 0..11 = walls + outer corners + inner corners,
- all unused slots transparent.

Atlas remains generated output. Individual normalized PNGs remain canonical source assets.

## Local tested deliverable hashes
Asset package ZIP:
`cca6d3f701ed9580263970a7a478a46e0825677346ec534238241d6887b2ed3c`

Runtime atlas:
`9aba59f16c52cf6fbfdf01e69d127243b1f8fbca923360db1f6e8636e2225dbd`

Empty-room contact preview:
`590a00c49bbf0977b7bc7fe49703683842259dd7722ac82280eaea431e57701a`

Synthetic 13x13 empty-room preview:
`1db236951abc5d2a11c45c846fb23975a0651a1f9869e8a2429fed7d069d238c`

Generator source:
`c6b2c1516842f60827e2e6a213bfe713ada2fd5004b51b64f8cb04ca157f81c3`

## Next production boundary
Do not create content assets yet.

Next visual step is editorial review of this structural room kit. If accepted, the next V2 production package may add **connection/opening/door overlays only** using the already locked 32x32 / 20px opening contract.

Items, heroes, NPCs and monsters remain out of scope until the empty-room map system is accepted.
