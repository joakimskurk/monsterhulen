# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Empty Rooms V2 — implemented in exact patch-15 map DOM, static/browser green, editorial review pending**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green. Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Canonical visual production method
The old sheet-first extraction path is abandoned.

Current V2 pipeline:

**grid first -> exact isolated source asset -> normalization/validation -> deterministic source bank -> runtime composition**

Large generated sheets are not production sources.

## Binding size/geometry contract
Canonical sources:
- `visual/ASSET_SIZE_STANDARD_V2.md`
- `visual/asset-size-standard-v2.json`
- `visual/TILESET_CONTRACT_V2.md`

Locked values:
- map grid: 13 x 13,
- logical map cell: 32 x 32 px,
- full map at 1x: 416 x 416 px,
- structural wall depth: 6 px,
- future connection opening: 20 px centred inside a 32 px cell,
- atlas: 512 x 512, 16 x 16 slots of 32 px,
- nearest-neighbour / integer scaling only.

New production sizes may not be improvised. Extend the size standard + JSON + regression test first.

## Empty Rooms structural bank
Exactly **21 room-only assets**:

### Floor — 9
`MAP_FLOOR_STONE_01` ... `MAP_FLOOR_STONE_09`

- 32 x 32,
- fully opaque RGBA,
- neutral dungeon stone,
- semantic-neutral,
- rotation-safe.

### Straight walls — 4
- N / E / S / W,
- 32 x 32 transparent overlays,
- exact 6 px structural edge band.

### Outer corners — 4
- NW / NE / SE / SW,
- 32 x 32 transparent overlays.

### Inner corners — 4
- NW / NE / SE / SW,
- 32 x 32 transparent overlays.

No doors, actors, items, furniture, traps, treasure or room-content art exist in this V2 structural bank.

## Deterministic provenance
Text source in repo can reproduce the exact PNG bank:
- `tools/generate_empty_rooms_v2.py`
- `visual/tileset-manifest-v2.json`
- `visual/empty-rooms-assets-v2.sha256.json`

Clean regeneration reproduced **21 / 21 PNGs byte-identically**.

Structural QA:
- local binary/geometry: **21 / 21 PASS**,
- `tests/QA_EMPTY_ROOMS_ASSET_BATCH_V2.js`: **19 PASS / 0 FAIL**.

## Runtime integration proof
Implementation files:
- `visual/empty-rooms-runtime-v2.css`
- `visual/empty-rooms-runtime-v2.js`
- `tests/QA_EMPTY_ROOMS_RUNTIME_INTEGRATION_V2.js`
- `visual/EMPTY_ROOMS_RUNTIME_PROOF_V2.md`

The integration reads canonical patch-15 DOM geometry only:
- `.tile`,
- `.joinN/.joinE/.joinS/.joinW`,
- `.fog`.

It does not call gameplay `move()`, directly mutate state, or replace the dungeon generator.

For each visible room cell it composes:
1. one deterministic floor tile,
2. straight exterior walls,
3. convex corners,
4. concave corners derived from cardinal + diagonal joins.

Existing runtime controls/markers remain above this room-only structural layer.

The layer re-applies after normal map rerenders using a `MutationObserver`.

## Runtime proof verification
Static integration contract:
- **14 PASS / 0 FAIL**.

Fresh Chromium exact patch-15 + V2:
- **15 PASS / 0 FAIL**.

Verified:
- exact 32px PNGs load (`naturalWidth=32`),
- exact 32 CSS px tile boxes,
- real multi-cell join geometry,
- wall/corner overlays present,
- normal `?` exploration still functions,
- room assets reapply after canonical map rerenders,
- tablet and mobile have no document-level horizontal overflow.

Representative screenshots used only legal map exploration to reveal several rooms; no debug state mutation created fake geometry.

Harness caveat: CDP uses an in-memory localStorage shim. Native persistence/clipboard and physical touch are not certified by this visual proof.

## Rejected intermediate integration states
Two issues were found and fixed before acceptance:
1. relative asset URLs inside a `setDocumentContent` standalone harness produced unloaded PNGs (`naturalWidth=0`),
2. keeping the old responsive map box produced dead black space despite 32px cells.

Accepted standalone inspection build embeds the 21 PNGs; the split package uses ordinary relative paths. The map box is sized from actual columns/rows x 32 and scrolls/pans on small surfaces rather than fractionally scaling tiles.

## Current boundary
This checkpoint proves **room-only structural composition** inside the actual Monsterhulen map.

It does not prove final art-direction approval and it does not change active UX5A runtime or `main`.

## Exact next safe action
User/editorial review of the exact V2 room-only patch-15 implementation.

If accepted, produce only connection assets next:
- open passage,
- door,
- locked/blocked connection variants,
using the already locked 32 x 32 canvas and 20 px centred opening contract.

Do not create items, heroes, NPCs, monsters or room-content art yet.

When physical UX5A becomes GREEN, return to runtime sequencing first. Visual integration remains a separate selective package after runtime merge.
