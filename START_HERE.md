# START HERE - MONSTERHULEN VISUAL PREP

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE RUNTIME**

Repository `joakimskurk/monsterhulen` is source of truth.

## Branch boundary
Active runtime remains `ux5/searchable-rooms-encounter-tracks`.
UX5A patch 15 is still waiting for physical iPad/mobile certification and must not be merged to `main` yet.

Visual work here may not change gameplay/state semantics. Do not merge this branch wholesale into runtime/main. Narrative Graph runtime, UX5B, Multiscreen and content-bank expansion remain blocked.

## Read in this order
1. `PROJECT_STATE.md`
2. runtime branch `START_HERE.md` + runtime gate/status files
3. `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md` — **current editorial verdict**
4. `visual/ASSET_SIZE_STANDARD_V2.md`
5. `visual/asset-size-standard-v2.json`
6. `visual/TILESET_CONTRACT_V2.md`
7. `visual/EMPTY_ROOMS_ASSET_BATCH_V2.md`
8. `visual/EMPTY_ROOMS_RUNTIME_PROOF_V2.md`
9. `visual/CONNECTION_ASSET_BATCH_V2.md`
10. `visual/CONNECTION_RUNTIME_PROOF_V2.md`
11. V1.x docs only as historical mistakes/lessons.

## Current checkpoint — V2 technical contract retained, current art direction rejected
The grid-first engineering model is useful and remains canonical:

**runtime grid -> exact isolated source asset -> deterministic validation -> runtime composition**

The current V2 visual assets are **not approved art direction**. Manual screenshot review rejected the combined room/connection look even though structural/browser QA was green.

Retain:
- 13 x 13 logical runtime grid,
- 32 x 32 logical source cell,
- individual normalized source assets,
- deterministic generator/manifest/hash pipeline,
- true transparency for overlays,
- canonical runtime geometry/state mapping,
- nearest-neighbour integer scaling only,
- stable IDs.

Do not treat the present floor/wall/door artwork as production-approved.

## Why current V2 visuals were rejected
- the dungeon is visually too small relative to the map panel,
- floors emphasize individual cells instead of one physical room,
- walls read as a grid/cage rather than a strong room silhouette,
- connections look like symbols inside one cell rather than architecture on a shared boundary,
- open-door art reads as loose planks,
- passage art is too subtle,
- locked state can appear duplicated/detached from the actual threshold,
- blocked-route X is too small at the current map scale,
- unknown-room markers overpower the structural map,
- mobile preserves function but not spatial presence.

Canonical review: `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`.

## Binding geometry still retained
- logical cell: 32 x 32 px,
- wall anchor system: 6 px technical starting point,
- connection opening coordinates: 20 px centred,
- atlas: 512 x 512 / 16 x 16 slots,
- integer display scaling only.

Important: 32x32 is **source resolution**, not a requirement that the map render at 32 CSS px. The next structural prototype should deliberately test integer 2x display where space permits.

## Current production boundary
Still no:
- items,
- heroes,
- NPCs/monsters,
- furniture/traps/treasure art,
- room-content illustration.

Do not move on to actor/content production just because V2 structural tests are green.

## Exact next safe visual action
Build **Structural Map V3** on the same technical grid contract:
1. redesign floor family so cell edges disappear visually,
2. redesign room perimeter so room silhouette dominates the grid,
3. redesign doors/passages as shared-boundary architecture,
4. test 2x integer presentation on tablet,
5. test focused/pannable 2x presentation on mobile,
6. keep the prototype empty: rooms + connections only,
7. require manual screenshot approval before any state-polish or content assets.

When physical UX5A becomes GREEN, return to runtime branch sequencing first. Visual integration remains a separate selective package after runtime merge.
