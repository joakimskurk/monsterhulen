# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Tileset Contract V2 — grid-first structural asset rebuild**

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
- `visual/TILESET_CONTRACT_V2.md`
- `visual/tileset-manifest-v2.template.json`
- `tools/validate_tileset_v2.py`
- `tools/pack_tileset_v2.py`

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

Target structural wall thickness: about 6 logical pixels from the relevant cell edge.

Directional wall art is authored per orientation to avoid rotating lighting/shading unnaturally.

## Geometry rule
For every cell in one physical room:
- draw an edge only where that cardinal neighbour is not the same room,
- draw convex corners where two exterior edges meet,
- draw concave corners where cardinal neighbours exist but the shared diagonal does not.

This supports irregular/L-shaped rooms without bespoke room images.

## Source/atlas boundary
Individual normalized PNG files are canonical source assets.

Runtime atlas is deterministic build output:
- 512 x 512 RGBA,
- 16 x 16 slots,
- 32 x 32 per slot,
- stable manifest coordinates,
- transparent unused slots,
- no grid guides or text in production atlas.

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
Do not ask image generation for a final perfectly sliced atlas.

For each production asset:
1. generate one isolated sprite/segment,
2. use true transparent background when applicable,
3. no label/frame/neighbour assets,
4. normalize to its exact box,
5. pixel-quantize/clean alpha,
6. validate at 1x/2x/4x nearest-neighbour,
7. reject/regenerate weak assets rather than compensating with manual crop hacks.

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
