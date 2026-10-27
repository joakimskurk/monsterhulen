# START HERE - MONSTERHULEN VISUAL PREP

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **PARKED — DO NOT CONTINUE VISUAL WORK UNLESS EXPLICITLY REOPENED**

Repository `joakimskurk/monsterhulen` is source of truth.

## Workstream status
The project has returned to gameplay/runtime work on:
`ux5/searchable-rooms-encounter-tracks`

This visual branch is intentionally paused. Do not generate more assets, start Structural Map V3 Gate A, or integrate visual code into runtime/main unless the user explicitly reopens the visual workstream.

For active continuation, switch to the gameplay branch and read:
1. `START_HERE.md`
2. `PROJECT_STATE.md`
3. `docs/GAMEPLAY_RETURN_HANDOFF_2026-10-27.md`

## Visual state preserved for later
The V2 engineering approach proved useful, but the V2 structural art direction was manually rejected.

Retained engineering lessons:
- 13 x 13 logical runtime grid
- 32 x 32 logical source cell
- isolated source assets
- deterministic manifests/hashes
- transparent overlays
- stable IDs
- runtime state/topology is authoritative
- integer nearest-neighbour scaling only

Do not treat V1/V2 art as approved production art.

## Current valid visual restart point
If visual work is explicitly reopened later, read in this order:
1. `visual/STRUCTURAL_MAP_V3_PRODUCTION_CONTRACT.md`
2. `visual/structural-map-v3-acceptance.json`
3. `tests/QA_STRUCTURAL_MAP_V3_CONTRACT.js`
4. `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`
5. V2 docs only as technical history/lessons

Structural Map V3 principle:

**ROOM FIRST, GRID SECOND.**

The next visual action would be **V3 Gate A only**:
- one quiet floor language
- one coherent perimeter language
- synthetic 1x1 and 4x3 empty-room proof at 2x display
- manual screenshot acceptance before any expansion

Do not mass-produce floors/walls/connections before Gate A is visually accepted.

## V3 contract status
V3 contract regression: **26 PASS / 0 FAIL**.

Important V3 perceptual rules already captured:
- 32 x 32 is source resolution, not default display size
- preferred map presentation is 2x where practical
- floor tile edges must visually disappear
- room perimeter must dominate the underlying grid
- connections belong to shared boundaries
- one state signal per fact
- automated green cannot replace manual visual approval

## Runtime boundary
UX5A patch 15 remains physically unverified on target iPad/mobile.

Do not merge this visual branch wholesale into runtime/main. Do not use visual work to bypass the UX5A gate.

## Resume condition
Only resume this branch when the user explicitly asks to return to visual work.

Until then, the authoritative continuation point is gameplay/runtime branch `ux5/searchable-rooms-encounter-tracks`.
