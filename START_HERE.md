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
3. `visual/ASSET_SIZE_STANDARD_V2.md` — binding production sizes
4. `visual/asset-size-standard-v2.json`
5. `visual/TILESET_CONTRACT_V2.md`
6. `visual/EMPTY_ROOMS_ASSET_BATCH_V2.md`
7. `visual/EMPTY_ROOMS_RUNTIME_PROOF_V2.md`
8. `visual/tileset-manifest-v2.json`
9. `visual/empty-rooms-assets-v2.sha256.json`
10. `tools/generate_empty_rooms_v2.py`
11. `visual/empty-rooms-runtime-v2.css`
12. `visual/empty-rooms-runtime-v2.js`
13. `tests/QA_EMPTY_ROOMS_ASSET_BATCH_V2.js`
14. `tests/QA_EMPTY_ROOMS_RUNTIME_INTEGRATION_V2.js`
15. V1.x docs only as historical mistakes/lessons.

## Current checkpoint — Empty Rooms V2 implemented in exact patch-15 DOM
The structural kit is now both generated and applied to the real Monsterhulen map.

Canonical pipeline:

**runtime grid -> exact source box -> deterministic structural asset -> validation -> runtime composition**

Current structural bank:
- 9 neutral 32x32 floor tiles,
- 4 straight 32x32 transparent walls,
- 4 outer/convex 32x32 transparent corners,
- 4 inner/concave 32x32 transparent corners.

Total: **21 structural assets**.

Explicitly excluded:
- doors/connections,
- items,
- heroes,
- NPCs/monsters,
- furniture/traps/treasure,
- room-content art.

## Binding geometry
- runtime grid: 13 x 13,
- logical cell: 32 x 32 px,
- structural wall depth: 6 px,
- full map at 1x: 416 x 416 px,
- runtime atlas: 512 x 512, 16 x 16 slots,
- nearest-neighbour / integer scaling only.

Do not invent new production sizes. Extend `ASSET_SIZE_STANDARD_V2` + JSON + regression test first if a genuinely new visual role needs another box.

## Runtime proof implementation
`visual/empty-rooms-runtime-v2.js` reads only canonical rendered map geometry:
- `.tile`,
- `.joinN/.joinE/.joinS/.joinW`,
- `.fog`.

It does not change the dungeon generator or story state.

For each visible cell it:
1. assigns one deterministic neutral floor variant + legal rotation,
2. adds wall overlays where the same physical room stops,
3. adds convex corners on exterior edge intersections,
4. adds concave corners using cardinal + diagonal join geometry,
5. leaves existing runtime controls/markers above the structural layers.

The presentation re-applies through a `MutationObserver` after canonical map rerenders.

## Verification
Structural asset batch:
- binary/geometry: **21 / 21 PASS**,
- repo contract: **19 PASS / 0 FAIL**,
- clean regeneration: **21 / 21 PNGs byte-identical**.

Runtime integration:
- `QA_EMPTY_ROOMS_RUNTIME_INTEGRATION_V2.js`: **14 PASS / 0 FAIL**,
- fresh Chromium exact patch-15 + V2: **15 PASS / 0 FAIL**.

Browser proof confirms actual PNGs load at natural 32x32, tiles render at exact 32 CSS px, multi-cell join geometry is used, normal `?` exploration still works, and the layer survives canonical rerenders on tablet/mobile without page-level horizontal overflow.

CDP still uses an in-memory localStorage shim; native persistence/clipboard and physical touch remain outside this visual proof.

## Important implementation lessons
Two intermediate failures were caught and rejected:
- relative PNG paths do not work in the standalone `setDocumentContent` harness; the inspection HTML must embed its binary assets,
- retaining the old responsive map box creates dead black space even when cells are 32px; the V2 proof sizes the map box from actual columns/rows x 32.

Do not use those failed intermediate screenshots as evidence.

## Exact next safe visual action
Editorially inspect the **actual patch-15 room-only implementation**.

If accepted, next asset scope is only:
- passage/opening overlays,
- door overlays,
- locked/blocked connection variants,
all using the already locked 32x32 / centred 20px opening contract.

Do not produce items, heroes, NPCs, monsters or room contents yet.

When physical UX5A becomes GREEN, return to runtime branch sequencing first. Visual integration remains a separate controlled package after runtime merge.
