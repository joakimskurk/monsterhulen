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
3. `visual/STRUCTURAL_MAP_V3_PRODUCTION_CONTRACT.md` — **current binding structural-map production contract**
4. `visual/structural-map-v3-acceptance.json` — machine-readable V3 constraints/acceptance
5. `tests/QA_STRUCTURAL_MAP_V3_CONTRACT.js`
6. `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md` — why V2 art was rejected
7. `visual/ASSET_SIZE_STANDARD_V2.md` — retained engineering/history only where V3 does not supersede it
8. `visual/TILESET_CONTRACT_V2.md` — retained grid/source/manifest engineering rules only
9. V2 asset/runtime proof docs as historical technical evidence
10. V1.x docs only as earlier mistakes/lessons.

## Current checkpoint — Structural Map V3 contract reset
The V2 output proved that exact dimensions and green structural QA are not enough.

The new binding principle is:

**VISUAL/PERCEPTUAL ACCEPTANCE FIRST, THEN SCALE PRODUCTION.**

V3 keeps the useful engineering model:
- 13 x 13 logical runtime grid,
- 32 x 32 logical source cell,
- stable IDs,
- isolated source assets,
- deterministic manifests/hashes,
- transparent overlays,
- canonical runtime state/topology,
- nearest-neighbour integer scaling only.

But V3 supersedes V2 visual assumptions that produced weak output.

## Binding V3 perceptual rules
### Presentation
- preferred map display = **2x**, so one 32px source cell renders at **64 CSS px**,
- tablet/mobile must pan/focus rather than fit-all shrink below 2x,
- with at least 3 revealed rooms, explored geometry should normally occupy about **55–85%** of the map viewport in at least one axis,
- dead background must not dominate.

### Floor
- 32 x 32 source,
- **4 px quiet edge zone** on all four sides,
- strongest detail restricted to x/y 4..27,
- no edge frame or full-edge grout/seam,
- room surface must read before tile grid.

### Perimeter
- V3 target wall depth = **8 logical px**,
- same-room joins render no wall,
- inner wall edge may vary by max 2 px,
- room silhouette must be continuous and stronger than floor detail.

### Connections
- source may remain 32 x 32 for atlas compatibility,
- runtime anchor is **shared-boundary midpoint**, never one-cell interior,
- V3 aperture = **18 logical px**,
- passage/door must visibly interrupt the room perimeter,
- lock belongs on the actual affected doorway,
- blocked state spans the threshold,
- one visible state signal per fact.

These V3 values supersede the historical V2 6px wall / 20px opening values for new Structural Map V3 art.

## Mandatory production gates
Do not mass-produce the bank.

### Gate A — prove one room
Produce only enough art to prove:
- one quiet floor,
- one strong perimeter language,
- 1x1 and 4x3 rooms at 2x display.

If a 4x3 room still reads as a grid of cells, reject and revise.

### Gate B — full room geometry
Only after Gate A manual acceptance:
- floor variants,
- N/E/S/W perimeter,
- convex/concave corners,
- rectangle/L/concave synthetic tests.

### Gate C — one connection
Only after Gate B:
- one open passage centred on a shared boundary.

### Gate D — connection family
Only after Gate C:
- open door,
- locked door,
- blocked threshold,
- orientation variants.

### Gate E — real runtime
Only after synthetic acceptance:
- exact patch-15 runtime proof,
- tablet 2x screenshot,
- mobile focused/pannable 2x screenshot,
- explicit manual visual acceptance.

## Manual acceptance is mandatory
Automated green is never sufficient.

Every accepted V3 structural screenshot must pass all relevant questions in `structural-map-v3-acceptance.json`, including:
- room reads before grid,
- tile seams are not obvious,
- room outline is continuous,
- same-room joins are invisible,
- connections sit on the shared boundary,
- lock is attached to the actual door,
- blocked signal spans the threshold,
- dungeon has visual authority in the panel,
- mobile uses focus/pan rather than fit-all shrinking.

Any `NO` rejects the batch.

## Current production boundary
Still no:
- items,
- heroes,
- NPCs/monsters,
- furniture/traps/treasure art,
- room-content illustration.

Do not polish map-state icons or produce content until Structural Map V3 Gate E is accepted.

## Exact next safe visual action
Start **Gate A only**.

Do not regenerate 9 floors or the whole connection family.

The next visual artifact must prove one thing:

> A multi-cell empty room looks like one coherent dungeon room before the underlying grid is noticed.

When physical UX5A becomes GREEN, return to runtime branch sequencing first. Visual integration remains a separate selective package after runtime merge.
