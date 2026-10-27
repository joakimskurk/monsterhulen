# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Empty Rooms Asset Batch V2 — generated, structurally validated, editorial acceptance pending**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green. Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Visual production direction
V1.x sheet-first extraction is no longer the production method.

Canonical V2 pipeline:

**grid first -> exact isolated source sprite -> normalization -> validation -> deterministic atlas**

Large generated presentation sheets are not production sources.

## Verified geometry and locked sizes
Current runtime:
- `MAP_W=13`,
- `MAP_H=13`,
- multi-cell physical rooms.

Binding V2 sizes:
- logical tile: **32 x 32 px**,
- full map at 1x: **416 x 416 CSS px**,
- floor: 32x32 full-cell RGBA,
- wall: 32x32 transparent overlay, exact 6px structural depth,
- outer corner: 32x32 transparent overlay, 6px participating edges,
- inner corner: 32x32 transparent overlay, 6px participating edges,
- future connection/door: 32x32 transparent overlay, centred 20px opening,
- runtime atlas: **512 x 512**, 16x16 slots of 32 px,
- nearest-neighbour / integer scaling only.

Canonical sources:
- `visual/ASSET_SIZE_STANDARD_V2.md`
- `visual/asset-size-standard-v2.json`
- `visual/TILESET_CONTRACT_V2.md`

Do not improvise new asset dimensions. Extend the size standard + JSON + regression test first if a new visual role is genuinely needed.

## Empty Rooms Asset Batch V2 — current output
The structural empty-room kit now contains exactly **21 assets**:

### Floor — 9
`MAP_FLOOR_STONE_01` ... `MAP_FLOOR_STONE_09`

- 32x32,
- fully opaque RGBA,
- cool neutral dungeon stone,
- semantic-neutral,
- rotation-safe.

### Straight walls — 4
- `MAP_WALL_N_01`
- `MAP_WALL_E_01`
- `MAP_WALL_S_01`
- `MAP_WALL_W_01`

### Outer/convex corners — 4
- NW / NE / SE / SW

### Inner/concave corners — 4
- NW / NE / SE / SW

Walls/corners:
- true transparent RGBA,
- hard alpha 0/255,
- exact geometry-aligned overlays,
- directional assets are not rotation-safe.

## Deliberately not produced yet
- doors/openings/connections,
- items,
- heroes,
- NPCs,
- monsters,
- encounters,
- traps,
- furniture,
- treasure,
- room-content illustrations,
- current/selected/reachable/fog sprites.

Current/selected/reachable/fog remain runtime/CSS state.

## Deterministic provenance
Generator committed:
`tools/generate_empty_rooms_v2.py`

Produced manifest:
`visual/tileset-manifest-v2.json`

Expected PNG SHA-256 values:
`visual/empty-rooms-assets-v2.sha256.json`

A separate clean generation reproduced all **21/21 PNG files byte-for-byte**.

For this structural batch, GitHub text source can therefore reproduce the binary assets without relying on connector binary upload.

## Verification
### Local binary/geometry validation
Result: **21 / 21 PASS**.

Checks include:
- exact 32x32 dimensions,
- floor opacity,
- overlay transparency,
- hard structural alpha,
- exact 6px straight-wall bands,
- inner-corner footprint bounds,
- unique IDs,
- unique atlas slots,
- deterministic 512x512 atlas assembly.

The first attempted floor pattern was rejected because a boundary differed too much. The accepted batch uses a rotation-safe square-stone construction instead.

### Repo regression
`node tests/QA_EMPTY_ROOMS_ASSET_BATCH_V2.js`

Result: **19 PASS / 0 FAIL**.

### Manual structural visual review
Reviewed at nearest-neighbour scale:
- all 9 floors in 0/90/180/270 rotation matrix,
- wall/corner transparency contact sheet,
- 1x1 room,
- 4x3 rectangle,
- L-shaped room,
- irregular joined room,
- synthetic 13x13 map with multiple empty room shapes.

This proves structural composition, not final artistic polish. Palette/detail refinement may happen later only if stable IDs, dimensions, anchors and geometry remain intact.

## Layer architecture
1. fog/background — runtime/CSS,
2. floor — V2 source tile,
3. wall/corner — V2 transparent overlay,
4. connection — later V2 overlay,
5. content marker — later,
6. interaction state — runtime/CSS.

## Canonical batch documentation
- `visual/EMPTY_ROOMS_ASSET_BATCH_V2.md`
- `visual/tileset-manifest-v2.json`
- `visual/empty-rooms-assets-v2.sha256.json`
- `tools/generate_empty_rooms_v2.py`
- `tests/QA_EMPTY_ROOMS_ASSET_BATCH_V2.js`

## Exact next safe action
Editorially inspect the empty-room structural kit.

If accepted, produce **connection/opening/door overlays only** using the locked 32x32 canvas + 20px opening specification.

Do not produce items, heroes, NPCs, monsters or room contents yet.

When physical UX5A becomes GREEN, return to runtime sequencing first. Visual integration remains a separate selective package after runtime merge.
