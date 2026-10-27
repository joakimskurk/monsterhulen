# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Tileset Contract V2 — grid-first structural asset rebuild with locked production sizes**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green. Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Why visual work restarted from scratch
V1.3 and V1.4 proved useful interaction/integration lessons, but the asset-production method was still too imprecise. Large generated sheets were visually appealing but did not provide reliable production crops, exact grid alignment or predictable reusable segments.

The current production direction is therefore V2:

**grid first -> isolated transparent source sprites -> normalization -> validation -> deterministic atlas build**

Large generated presentation sheets are not production sources.

## Verified runtime geometry
Current patch-15 runtime uses:
- `MAP_W=13`,
- `MAP_H=13`,
- multi-cell rooms joined by directional adjacency,
- responsive `.map` columns in the current UI.

V2 visual contract decouples source art from fractional responsive scaling:
- logical tile: **32 x 32 px**,
- full 13 x 13 map at 1x: **416 x 416 CSS px**,
- fixed logical tile grid inside a focus/pan viewport,
- nearest-neighbour / pixelated rendering,
- integer zoom only if zoom is later required.

## Canonical V2 docs/tools
Read/use these for all further asset work:
- `visual/ASSET_SIZE_STANDARD_V2.md` — **binding human-readable size standard**
- `visual/asset-size-standard-v2.json` — **machine-readable size standard**
- `visual/TILESET_CONTRACT_V2.md`
- `visual/tileset-manifest-v2.template.json`
- `tests/QA_ASSET_SIZE_STANDARD_V2.js`
- `tools/validate_tileset_v2.py`
- `tools/pack_tileset_v2.py`

If a new asset role needs a size that is not defined here, do not improvise a dimension. Update the size standard + JSON + regression test first.

## Locked production size matrix
### Structural map
- floor tile: **32 x 32**, full-cell art
- straight wall: **32 x 32** transparent overlay, **6 px** structural depth
- outer corner: **32 x 32** transparent overlay, **6 px** on both edges
- inner corner: **32 x 32** transparent overlay, **6 px** on participating interior edges
- connection/door: **32 x 32** transparent overlay, centred **20 px** opening span / **6 px** inset

### Map actors/markers
- hero/NPC/monster: **32 x 32 canvas**, visible max **24 x 28**, baseline **y=30**
- generic question/lock/encounter marker: **32 x 32 canvas**, visible max **24 x 24** centred
- small item marker: **32 x 32 canvas**, visible max **22 x 22** centred
- effect frame: **32 x 32 canvas**, visible max **32 x 32**

### UI
- generic UI icon: **24 x 24 canvas**, visible max **20 x 20**
- standard icon display: **24 x 24 CSS px**
- large icon display: **32 x 32 CSS px**
- optional repeatable UI corner/edge ornament: **16 x 16**, never stretched
- full button/panel bitmap backgrounds: **not allowed**; use CSS/DOM

### Existing Asset Contract 2.4.0 compatibility
- character: 64 x 64 thumbnail / 128 x 128 large
- item: 32 x 32 thumbnail / 64 x 64 large
- scene: 64 x 48 thumbnail / 192 x 128 large
- symbolic: 32 x 32 thumbnail / 64 x 64 large

Map sprites and entity portraits are different visual roles tied to the same stable entity ID. The 32x32 tileset does not replace canonical portrait sizes.

## Runtime atlas
- **512 x 512 RGBA**
- **16 x 16 slots**
- **32 x 32 per slot**
- **0 px runtime gutter**
- unused slots transparent
- slot coordinates come from manifest
- atlas is build output, never a hand-cropped source

## Layer architecture
Map presentation is composed in layers:
1. fog/background — runtime/CSS state,
2. floor — 32x32 base tile,
3. room border — transparent edge/corner overlay,
4. connection — optional door/open/locked/block overlay,
5. marker — hero/NPC/encounter/item sprite,
6. interaction state — current/selected/reachable/focus from runtime/CSS.

Current/selected/fog are never baked into structural art.

## First production batch
Content inside rooms is intentionally postponed.

### Floor
Nine neutral stone variants:
- `MAP_FLOOR_STONE_01` ... `MAP_FLOOR_STONE_09`

Rules:
- 32x32,
- full-cell base art,
- semantic-neutral,
- no moss/water/lava/runes/blood/items/footprints/clue-like cracks,
- rotation-safe.

Nine variants x 4 rotations can yield up to 36 visual combinations while preserving identical meaning.

### Borders
Transparent 32x32 overlays:
- four straight wall orientations,
- four outer/convex corners,
- four inner/concave corners.

Target structural wall thickness is exactly **6 logical pixels** from the relevant cell edge.

Directional wall art is authored per orientation to avoid rotating lighting/shading unnaturally.

## Geometry rule
For every cell in one physical room:
- draw an edge only where that cardinal neighbour is not the same room,
- draw convex corners where two exterior edges meet,
- draw concave corners where cardinal neighbours exist but the shared diagonal does not.

This supports irregular/L-shaped rooms without bespoke room images.

## Source/atlas boundary
Individual normalized PNG files are canonical source assets.

Runtime atlas is deterministic build output. Never generate a large art sheet and manually crop production sprites from it.

## Transparency
Required true RGBA transparency:
- walls/corners,
- connections,
- characters,
- markers,
- items,
- UI icons,
- effects.

Floor PNGs remain RGBA but intentionally fill the complete cell and may be fully opaque.

## Generation rule
For each production asset:
1. generate one isolated sprite/segment,
2. use true transparent background when applicable,
3. no label/frame/neighbour assets,
4. normalize to the exact box from `ASSET_SIZE_STANDARD_V2`,
5. enforce safe box/baseline/edge anchor,
6. pixel-quantize/clean alpha,
7. validate at 1x/2x/4x nearest-neighbour,
8. reject/regenerate weak assets rather than compensating with crop hacks.

Preferred image-generation working master for isolated square assets is **1024 x 1024 RGBA**, but this master is not a runtime/source size. The normalized contracted PNG is the canonical source asset.

## Historical V1.x status
V1.3/V1.4 remain historical/research context only.

Retain lessons:
- manual screenshot review is mandatory,
- multi-cell rooms must read as one room,
- art cannot invent state/topology,
- sheet crops cannot be stretched as panel/button chrome,
- generic environment art cannot be inferred from abstract tone,
- mobile navigation must not cover controls.

Do not continue the old sheet-first asset extraction workflow.

## Exact next safe action
Generate and normalize the nine neutral floor tiles only. Validate seamless mixing/rotation and render synthetic room shapes from them. Proceed to wall/corner segments only after the floor batch is visually accepted.

When physical UX5A becomes GREEN, return to runtime sequencing first. Visual integration remains a separate selective package after runtime merge.
