# START HERE - MONSTERHULEN VISUAL PREP

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE RUNTIME**

Repository `joakimskurk/monsterhulen` is source of truth.

## Branch boundary
Active runtime remains `ux5/searchable-rooms-encounter-tracks`.
UX5A patch 15 is still waiting for physical iPad/mobile certification and must not be merged to `main` yet.

Visual work on this branch may not change gameplay/state semantics and must not be merged wholesale into runtime/main. Narrative Graph runtime, UX5B, Multiscreen and content-bank expansion remain blocked.

## Read in this order
1. `PROJECT_STATE.md`
2. runtime branch `START_HERE.md` + runtime gate/status files
3. `visual/ASSET_SIZE_STANDARD_V2.md` — **binding size source of truth for all new asset production**
4. `visual/asset-size-standard-v2.json` — machine-readable mirror
5. `visual/TILESET_CONTRACT_V2.md`
6. `visual/EMPTY_ROOMS_ASSET_BATCH_V2.md`
7. `visual/tileset-manifest-v2.json`
8. `visual/empty-rooms-assets-v2.sha256.json`
9. `tools/generate_empty_rooms_v2.py`
10. `tests/QA_EMPTY_ROOMS_ASSET_BATCH_V2.js`
11. `tools/validate_tileset_v2.py`
12. `tools/pack_tileset_v2.py`
13. `visual/VISUAL_DIRECTION_V1_2.md`
14. V1.x docs only as historical context for mistakes to avoid
15. architecture prep on `narrative/story-graph-v1-prep` only when story-system context is needed.

## Current checkpoint — Empty Rooms Asset Batch V2
The sheet-first production method is abandoned.

Canonical pipeline:

**runtime grid -> exact source box -> isolated structural sprite -> validation -> deterministic atlas**

Verified runtime facts:
- map grid is 13 x 13 cells,
- rooms may span multiple joined cells,
- logical V2 art cell is 32 x 32 px,
- full map at 1x is 416 x 416 CSS px,
- map should pan/clip/focus rather than fractionally stretch the tile grid.

The first structural room kit is now produced and validated.

Produced:
- 9 neutral 32x32 floor stone variants,
- 4 straight 32x32 wall overlays,
- 4 outer/convex 32x32 corner overlays,
- 4 inner/concave 32x32 corner overlays.

Total: **21 structural assets**.

Nothing else is included:
- no doors/connections,
- no items,
- no heroes,
- no NPCs/monsters,
- no furniture/treasure/traps,
- no room-content art,
- no current/selected/fog art.

## Binding size rules
`visual/ASSET_SIZE_STANDARD_V2.md` and `visual/asset-size-standard-v2.json` define all canonical production boxes.

Current structural rules:
- floor / wall / corner / connection canvas: **32 x 32 px**,
- structural wall depth: **6 px**,
- future door/opening span: **20 px** centred in a 32 px cell,
- runtime atlas: **512 x 512**, 16 x 16 slots of 32 px,
- nearest-neighbour rendering,
- no fractional tile scaling.

Do not invent a new asset size during production. If a genuinely new visual role needs a different box, update the size standard + JSON + regression test first.

## Empty-room batch provenance
The PNGs are deterministically reproducible from repo text source:

`tools/generate_empty_rooms_v2.py`

A separate reproduction run matched **21/21 PNG files byte-for-byte**.

Expected hashes:
`visual/empty-rooms-assets-v2.sha256.json`

Produced manifest:
`visual/tileset-manifest-v2.json`

This batch therefore does not depend on unsafe binary transport through the GitHub connector.

## Verification
Local binary/geometry production validator:
- **21 / 21 structural assets PASS**.

Repo contract regression:
- `node tests/QA_EMPTY_ROOMS_ASSET_BATCH_V2.js`
- **19 PASS / 0 FAIL**.

Manual nearest-neighbour visual review performed on:
- 9 x 4 floor rotation matrix,
- transparent wall/corner sheet,
- 1x1 room,
- 4x3 room,
- L-shaped room,
- irregular room,
- synthetic 13x13 empty-room map.

The initial floor attempt was rejected by validation for excessive edge variance and replaced before this checkpoint. Do not restore the rejected brick-strip floor variant.

## Layer model
1. fog/background = CSS/runtime state
2. floor tile
3. wall/corner overlay
4. connection/door overlay
5. hero/marker/content sprite
6. current/selected/reachable/focus = CSS/runtime state

This supports 1x1, rectangular, L-shaped and irregular multi-cell rooms from one reusable structural asset bank.

## Hard rules
- no checkerboard/matte background baked into sprites,
- no manual production crop coordinates,
- no stretched sheet bitmap as UI chrome,
- no environment/story meaning inferred from tone,
- no current/selected state baked into art,
- no characters/items/furniture in structural room tiles,
- no content-bank expansion,
- no changes to runtime gameplay/state.

## Historical visual attempts
V1.3/V1.4 are retained as lessons only. Do not continue their sheet-extraction workflow.

Retained lessons:
- structural/browser QA does not prove visual quality,
- multi-cell rooms must read as one room,
- art cannot invent topology/content/state,
- generated sheets are not reliable production crop sources,
- stretched bitmap chrome fails.

## Exact next safe visual action
Editorially inspect the empty-room structural kit.

If accepted, the next asset package may add **connections/openings/doors only** using the already locked 32x32 canvas and centred 20px opening contract.

Do not create items, heroes, NPCs, monsters or room contents yet.

When physical UX5A becomes GREEN, return to runtime branch sequencing first. Visual integration remains a separate controlled package after runtime merge.
