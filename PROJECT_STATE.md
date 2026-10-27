# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARKED**
Active gameplay/runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`

## Current direction
Visual work is intentionally paused. The project has returned to gameplay/runtime.

Do not:
- start Structural Map V3 Gate A,
- generate more visual assets,
- integrate visual prep into runtime/main,
- reopen V1/V2 asset production,
unless the user explicitly reopens the visual workstream.

For active project continuation use:
`ux5/searchable-rooms-encounter-tracks`

Canonical handoff there:
`docs/GAMEPLAY_RETURN_HANDOFF_2026-10-27.md`

## Last visual verdict
V2 engineering was technically useful but its structural art direction was manually rejected.

What remains valid:
- 13 x 13 runtime grid
- 32 x 32 logical source cell
- multi-cell room geometry from canonical joins
- isolated source assets
- deterministic generation/manifests/hashes
- stable IDs
- transparent overlays
- runtime DOM/state as authority
- nearest-neighbour integer scaling

What is rejected as visual direction:
- V2 floor look
- V2 wall/perimeter look
- V2 connection look
- V2 tiny-map presentation

## Preserved restart point
If visual work is reopened later, restart from Structural Map V3, not V1/V2.

Canonical files:
- `visual/STRUCTURAL_MAP_V3_PRODUCTION_CONTRACT.md`
- `visual/structural-map-v3-acceptance.json`
- `tests/QA_STRUCTURAL_MAP_V3_CONTRACT.js`
- `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`

V3 contract QA: **26 PASS / 0 FAIL**.

Core V3 principle:
**ROOM FIRST, GRID SECOND.**

V3 Gate A has **not** been implemented. The next visual task, if later reopened, is only to prove one coherent 4x3 empty room at 2x display before expanding the bank.

## Runtime gate still governs project sequencing
UX5A patch 15 remains physically unverified on target iPad/mobile.

Do not use visual work to bypass the gameplay gate. Do not merge this branch wholesale into runtime/main.

## Resume condition
Visual work resumes only on explicit user instruction. Until then this branch is a parked reference branch.
