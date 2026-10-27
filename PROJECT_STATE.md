# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Structural Map V3 Gate A — prove one coherent multi-cell room before rebuilding the bank**

## Runtime gate unchanged
UX5A patch 15 still waits for physical iPad/mobile certification.

Exact patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green. Do not implement Narrative Graph runtime, UX5B or Multiscreen here.

## Current editorial verdict
The V2 engineering model was useful, but the V2 room/connection artwork and presentation were visually rejected.

The root cause was not only bad execution. The production rules over-weighted exact dimensions/alpha/IDs and under-specified perceptual quality.

Canonical failure review:
`visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`

## Current binding V3 contract
Use these before any new structural-map production:
- `visual/STRUCTURAL_MAP_V3_PRODUCTION_CONTRACT.md`
- `visual/structural-map-v3-acceptance.json`
- `tests/QA_STRUCTURAL_MAP_V3_CONTRACT.js`

Contract QA: **26 PASS / 0 FAIL**.

V3 supersedes V2 visual assumptions where they conflict.

## Engineering rules retained
- 13 x 13 runtime grid,
- 32 x 32 logical source cell,
- multi-cell room geometry from canonical joins,
- isolated source PNGs,
- deterministic generators/manifests/hashes,
- stable IDs,
- transparent overlays,
- canonical runtime state/topology,
- nearest-neighbour integer scaling,
- no art invention of hidden story/topology state.

## V3 visual rules now binding
### Presentation
- preferred display scale: **2x**,
- one logical cell = **64 CSS px** at preferred scale,
- no fit-all shrinking below 2x,
- tablet/mobile use pan/focus viewports,
- with >=3 revealed rooms, explored geometry should normally occupy **55–85%** of viewport in at least one axis.

### Floor
- 32 x 32 source,
- 4 px quiet perimeter zone,
- strongest detail restricted to interior x/y 4..27,
- no edge frame/full-edge grout,
- multi-cell room surface must visually merge.

### Perimeter
- V3 wall depth target: **8 px**,
- same-room joins render no wall,
- max 2 px inner-edge irregularity,
- room silhouette must dominate floor/cell structure.

### Connections
- source remains compatible with 32 x 32 atlas slots,
- runtime anchor is **shared-boundary midpoint**,
- V3 clear aperture: **18 px**,
- door/passage interrupts the perimeter wall,
- lock attaches to actual doorway,
- blocked state spans threshold,
- one signal per fact.

Historical V2 values of 6px wall depth and 20px opening are not binding for new V3 art.

## Production gates
### Gate A — current gate
Produce only enough art to prove a coherent room:
- 1 quiet floor asset,
- one perimeter language,
- required corners,
- synthetic 1x1 and 4x3 room at 2x.

**Acceptance question:** Does the 4x3 room read as one physical room before the 32px grid is noticed?

If NO: reject and revise. Do not expand the asset bank.

### Gate B — full room geometry
Only after Gate A manual acceptance:
- floor variants,
- all wall orientations,
- convex/concave corners,
- rectangle/L/concave shapes.

### Gate C — one shared-boundary connection
Only after Gate B:
- one open passage anchored to the shared boundary.

### Gate D — connection family
Only after Gate C:
- open door,
- locked door,
- blocked threshold,
- orientations.

### Gate E — runtime proof
Only after synthetic acceptance:
- exact patch-15 integration,
- tablet 2x screenshot,
- mobile focused/pannable 2x screenshot,
- explicit manual visual approval.

## Required manual acceptance
Automated green cannot approve V3 art.

All applicable questions in `structural-map-v3-acceptance.json` must be YES, including:
- room reads before grid,
- seams are not obvious,
- continuous room outline,
- same-room joins invisible,
- connection on shared boundary,
- door reads as architecture,
- lock attached to door,
- blocked threshold legible,
- map has visual authority,
- dead space subordinate,
- mobile uses focus/pan instead of fit-all shrinking.

## Current production boundary
Do not produce:
- items,
- heroes,
- NPCs/monsters,
- furniture,
- treasure/trap art,
- room-content illustration,
- state-icon polish.

## Exact next safe action
Structural Map V3 **Gate A only**.

Do not regenerate the full V2 bank.

The next artifact must prove a single 4x3 empty room can look like one coherent 16-bit dungeon room using the retained 32px logical grid.

When physical UX5A becomes GREEN, return to runtime sequencing first. Visual integration remains a selective package after runtime merge.
