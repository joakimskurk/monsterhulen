# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Structural Map V3 reset — V2 technical contract retained, V2 art direction rejected after manual screenshot review**

## Runtime gate unchanged
UX5A patch 15 still waits for physical iPad/mobile certification.

Exact patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green. Do not implement Narrative Graph runtime, UX5B or Multiscreen here.

## Current editorial verdict
The V2 engineering model works, but the current structural artwork/presentation is **visually rejected**.

Do not continue from the current floor/wall/door art as if it were approved.

Canonical review:
`visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`

## What remains canonical
- 13 x 13 runtime grid,
- 32 x 32 logical source-cell contract,
- multi-cell room geometry from canonical joins,
- separate floor / border / connection layers,
- deterministic source generation and manifests,
- stable IDs,
- transparent overlays,
- nearest-neighbour integer scaling,
- runtime DOM/state as authority,
- no visual invention of hidden topology/story state.

32x32 is source resolution. It does not force 32 CSS px presentation.

## Why current V2 visuals failed
1. Dungeon occupies too little of the map surface and reads like a minimap/debug widget.
2. Floor art emphasizes cell boundaries, so physical rooms look tiled into compartments.
3. Wall language reads as a per-cell cage rather than a strong outer room silhouette.
4. Door/passages are composed as one-cell symbols instead of shared-boundary architecture.
5. `DOOR_OPEN` reads as loose planks; `PASSAGE_OPEN` is too weak.
6. Lock presentation can detach from the exact affected doorway.
7. Blocked X is too small at current scale.
8. Large `?` markers dominate the tiny structural map.
9. Mobile remains functional but spatially weak because the dungeon is shrunk rather than presented in a focused/pannable integer-scale viewport.

## V2 evidence remains useful engineering history
Current V2 structural bank:
- 21 room assets,
- 16 connection assets,
- 37 total allocated map assets.

Verification already achieved:
- empty rooms: 21/21 binary, 19/0 static, 14/0 runtime static, 15/0 Chromium,
- connections: 16/16 binary, 18/0 static, 17/0 runtime static, 17/0 Chromium,
- clean deterministic reproduction for both batches,
- real runtime examples reached a locked connection and a blocksForward route.

These results prove technical composition/state mapping only. They do **not** constitute visual approval.

## Current production boundary
Do not start:
- heroes,
- NPCs/monsters,
- items,
- furniture,
- treasure/trap illustration,
- room-content illustration,
- decorative scene art.

Do not spend time polishing fog/current/reachable state until the base room silhouette is visually strong.

## Structural Map V3 goal
Reuse the technical contract but redesign perception:

**ROOM FIRST, GRID SECOND.**

Required direction:
- quieter floor with no obvious tile seams,
- stronger outer perimeter that makes multi-cell rooms read as one shape,
- connections centred on the shared boundary between rooms/cells,
- one state signal per fact,
- tablet test at 2x integer display where space permits,
- mobile focused/pannable 2x viewport rather than fit-all shrinking,
- rooms + connections only.

## Acceptance gate for V3
V3 does not advance on automated green alone.

Required before more asset categories:
1. structural/source validation,
2. real runtime Chromium test,
3. tablet screenshot review,
4. mobile screenshot review,
5. explicit manual visual acceptance that rooms read as rooms and connections read as architecture.

## Exact next safe action
Prototype the V3 structural room system only. Do not create content assets.

When physical UX5A becomes GREEN, return to runtime sequencing first. Visual integration remains a selective package after runtime merge.
