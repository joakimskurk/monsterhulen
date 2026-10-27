# Monsterhulen — Connection Asset Batch V2

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **STRUCTURAL CONNECTION ASSETS GENERATED + VALIDATED — NO CONTENT ASSETS**

## Scope
This batch extends Empty Rooms V2 with connection/opening visuals only.

Produced exactly **16 normalized 32x32 PNGs**:
- `MAP_PASSAGE_OPEN_N/E/S/W_01`
- `MAP_DOOR_OPEN_N/E/S/W_01`
- `MAP_DOOR_LOCKED_N/E/S/W_01`
- `MAP_ROUTE_BLOCKED_N/E/S/W_01`

Explicitly excluded: items, heroes, NPCs, monsters, furniture, treasure, room-content art and physical trap illustrations.

## Binding geometry
Inherited from `ASSET_SIZE_STANDARD_V2`:
- canvas **32 x 32 RGBA**,
- structural wall depth **6 px**,
- connection opening **20 px**, centred (`6..25`),
- hard structural alpha 0/255,
- no fractional scaling,
- four authored orientations; `rotationSafe:false`.

## State meaning
`PASSAGE_OPEN` is used for a known traversable shortcut/secret passage.

`DOOR_OPEN` is the default visual for an ordinary traversable runtime connection. Patch 15 does not expose a separate `closed but unlocked` state, so V2 does not invent one.

`DOOR_LOCKED` is used only when the canonical door DOM has `.locked`.

`ROUTE_BLOCKED` is used only when patch 15 already exposes `× NORD/ØST/SØR/VEST` because an active `blocksForward` encounter prevents progress. The art is an abstract X over an otherwise open threshold, so it does not invent whether the cause is a net, bones, mechanism or anything else.

Locked state takes precedence over blocked state on the same edge.

## Atlas allocation
Connection batch owns atlas row **2**, columns **0..15**:
- 0..3 passage open N/E/S/W,
- 4..7 door open N/E/S/W,
- 8..11 door locked N/E/S/W,
- 12..15 route blocked N/E/S/W.

Room-only assets remain on rows 0..1. Combined room + connection kit therefore occupies **37 unique slots**.

`tools/build_tileset_manifest_v2.py` merges the two batch manifests and rejects duplicate IDs or slots before full atlas packing.

## Deterministic provenance
Generator: `tools/generate_connections_v2.py`

Manifest: `visual/connection-manifest-v2.json`

Expected hashes: `visual/connection-assets-v2.sha256.json`

Validator: `tools/validate_connections_v2.py`

A clean second generation reproduced **16 / 16 PNGs byte-for-byte**.

## Verification
Binary/geometry validator: **16 / 16 PASS**.

Static repo contract `tests/QA_CONNECTION_ASSET_BATCH_V2.js`: **18 PASS / 0 FAIL**.

Coverage includes exact four states x four directions, 32px canvases, 20px opening contract, hard transparency, unique IDs/slots, row-2 ownership, exact hash coverage and no content-asset categories.

Combined room + connection atlas proof:
- **37 unique assets / 37 unique slots**,
- 512x512 RGBA,
- local atlas SHA-256 `93e2a9caae7f58b580771610a571a06d5fdd42d102af4b8b0586ba4030bbadfd`.

## Runtime boundary
These assets do not change gameplay/state. Runtime mapping is documented separately in `CONNECTION_RUNTIME_PROOF_V2.md`.
