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
3. `visual/ASSET_SIZE_STANDARD_V2.md`
4. `visual/asset-size-standard-v2.json`
5. `visual/TILESET_CONTRACT_V2.md`
6. `visual/EMPTY_ROOMS_ASSET_BATCH_V2.md`
7. `visual/EMPTY_ROOMS_RUNTIME_PROOF_V2.md`
8. `visual/CONNECTION_ASSET_BATCH_V2.md`
9. `visual/CONNECTION_RUNTIME_PROOF_V2.md`
10. `visual/tileset-manifest-v2.json`
11. `visual/connection-manifest-v2.json`
12. room + connection hash registries
13. `tools/generate_empty_rooms_v2.py`
14. `tools/generate_connections_v2.py`
15. `tools/build_tileset_manifest_v2.py`
16. room + connection QA tests
17. V1.x docs only as historical mistakes/lessons.

## Current checkpoint — empty dungeon renderer V2
The grid-first production pipeline is now proven in the exact patch-15 DOM.

Canonical pipeline:

**runtime grid -> exact isolated source asset -> deterministic validation -> runtime composition**

Current V2 map bank:
- 9 floor tiles,
- 4 straight room walls,
- 4 outer corners,
- 4 inner corners,
- 4 open passages,
- 4 open doors,
- 4 locked doors,
- 4 blocked-route overlays.

Total: **37 structural/map-connection assets**.

Still excluded:
- items,
- heroes,
- NPCs/monsters,
- furniture/traps/treasure art,
- room-content illustration.

## Binding geometry
- runtime grid: 13 x 13,
- logical cell: 32 x 32 px,
- wall depth: 6 px,
- connection opening: 20 px centred,
- map at 1x: 416 x 416 px,
- atlas: 512 x 512 / 16 x 16 slots,
- nearest-neighbour / integer scaling only.

Do not invent new sizes. Extend `ASSET_SIZE_STANDARD_V2` + JSON + regression test first.

## Connection mapping
Runtime DOM is authoritative:
- ordinary traversable connection -> open door,
- known shortcut/secret -> open passage,
- `.locked` -> locked door,
- current direction with canonical `×` movement control -> abstract blocked-route X.

No separate `closed but unlocked` state is invented because patch 15 does not expose one.

The integration reads rendered DOM only; it does not call gameplay `move()` or mutate hidden game state.

## Verification
Empty-room bank:
- **21/21 binary PASS**
- **19/0 repo contract**
- **14/0 room runtime static**
- **15/0 room runtime Chromium**

Connection bank:
- **16/16 binary PASS**
- **18/0 connection asset contract**
- **17/0 connection runtime static**
- **17/0 fresh Chromium**
- clean generation reproduced **16/16 byte-identically**.

Combined room + connection allocation: **37 unique atlas slots**.

Browser evidence includes legal runtime encounters with both a real locked story connection and a real `blocksForward` route.

CDP still uses an in-memory localStorage shim; native persistence/clipboard and physical touch remain outside this visual proof.

## Hard rules
- no manually cropped generated sheets,
- no fractional tile scaling,
- no stretched bitmap UI chrome,
- no art-invented topology or story state,
- no content assets until structural map is accepted,
- current/selected/reachable/fog remain runtime/CSS state.

## Exact next safe visual action
Editorially inspect the combined empty-dungeon renderer: floors, room borders and canonical connections.

If accepted, refine only the existing map-state presentation (`fog`, `unknown`, `current`, `reachable`) using CSS/runtime state. Do not start items, heroes or monsters yet.

When physical UX5A becomes GREEN, return to runtime branch sequencing first. Visual integration remains a separate selective package after runtime merge.
