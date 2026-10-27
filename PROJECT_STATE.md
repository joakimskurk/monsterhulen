# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Tileset V2 empty-dungeon renderer — rooms + canonical connections implemented and browser green; editorial review pending**

## Runtime gate unchanged
UX5A patch 15 still waits for physical iPad/mobile certification.

Exact patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green. Do not implement Narrative Graph runtime, UX5B or Multiscreen here.

## Canonical V2 production method
The old sheet-first extraction path is abandoned.

**grid first -> exact source box -> isolated deterministic asset -> validation -> runtime composition**

Binding sources:
- `visual/ASSET_SIZE_STANDARD_V2.md`
- `visual/asset-size-standard-v2.json`
- `visual/TILESET_CONTRACT_V2.md`

Locked geometry:
- 13 x 13 runtime grid,
- 32 x 32 logical cell,
- 416 x 416 map at 1x,
- 6 px structural wall depth,
- 20 px centred connection opening,
- 512 x 512 atlas / 16 x 16 slots,
- nearest-neighbour integer scaling only.

## Current structural bank — 37 assets
### Empty rooms — 21
- 9 neutral floors,
- 4 straight walls,
- 4 outer corners,
- 4 inner corners.

### Connections — 16
- 4 `PASSAGE_OPEN`,
- 4 `DOOR_OPEN`,
- 4 `DOOR_LOCKED`,
- 4 `ROUTE_BLOCKED`.

No items, heroes, NPCs, monsters, furniture, trap illustrations, treasure or room-content art are part of this bank.

## Connection state contract
Connection art is driven only by canonical runtime DOM:
- ordinary traversable door -> `door_open`,
- known `.shortcut` / `.secret` -> `passage_open`,
- `.locked` -> `door_locked`,
- current movement control beginning with `×` -> `route_blocked`.

Locked takes precedence over blocked. `route_blocked` uses an abstract X so the art does not invent the physical cause.

Patch 15 has no separate closed-but-unlocked state, so V2 does not invent one.

## Deterministic provenance
Room generator:
`tools/generate_empty_rooms_v2.py`

Connection generator:
`tools/generate_connections_v2.py`

Connection validator:
`tools/validate_connections_v2.py`

Batch manifests/hashes:
- `visual/tileset-manifest-v2.json`
- `visual/empty-rooms-assets-v2.sha256.json`
- `visual/connection-manifest-v2.json`
- `visual/connection-assets-v2.sha256.json`

`tools/build_tileset_manifest_v2.py` merges batch manifests and rejects duplicate IDs/atlas slots before full packing.

Clean reproduction:
- rooms: 21/21 byte-identical,
- connections: 16/16 byte-identical.

## Verification
Room structural bank:
- 21/21 binary/geometry PASS,
- 19/0 static batch QA.

Connection structural bank:
- 16/16 binary/geometry PASS,
- 18/0 static batch QA.

Runtime static:
- room-only: 14/0,
- room + connections: 17/0.

Fresh Chromium exact patch-15 + V2 connections:
- **17 PASS / 0 FAIL**.

Browser proof covers exact 32px assets, canonical door DOM mapping, legal exploration/rerenders, tablet/mobile overflow and presentation mapping for locked/blocked states. Separate legal UI runs reached a real locked story connection and a real `blocksForward` route.

CDP harness caveat remains: in-memory localStorage, so native persistence/clipboard and physical touch are not certified.

## Runtime implementation files
- `visual/tileset-connections-v2.css`
- `visual/tileset-connections-v2.js`
- `tests/QA_CONNECTION_ASSET_BATCH_V2.js`
- `tests/QA_CONNECTION_RUNTIME_INTEGRATION_V2.js`
- `visual/CONNECTION_ASSET_BATCH_V2.md`
- `visual/CONNECTION_RUNTIME_PROOF_V2.md`

The visual layer does not call gameplay `move()`, does not mutate dungeon state and does not replace the generator.

## Current boundary
The empty dungeon structural renderer is now complete enough for editorial review:

`floor -> border/corners -> canonical connection -> runtime fog/interaction state`

Do not create content assets yet.

## Exact next safe action
Review the combined empty-dungeon renderer visually. If accepted, refine only existing map-state presentation (`fog`, `unknown`, `current`, `reachable`) in CSS/runtime state before opening actor/item/monster production.

When physical UX5A becomes GREEN, return to runtime sequencing first. Visual integration remains a selective package after runtime merge.
