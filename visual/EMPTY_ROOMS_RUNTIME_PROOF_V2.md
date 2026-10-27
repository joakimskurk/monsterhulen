# Monsterhulen — Empty Rooms Runtime Proof V2

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — EXACT PATCH-15 INSPECTION BUILD, NOT ACTIVE RUNTIME**

## Purpose
This checkpoint tests the accepted Empty Rooms V2 structural kit inside the real patch-15 map DOM.

It does not add any new gameplay/state logic and it does not add content assets.

Integrated assets are limited to:
- 9 floor tiles,
- 4 straight walls,
- 4 outer corners,
- 4 inner corners.

Explicitly not integrated in this checkpoint:
- doors/connections,
- items,
- heroes,
- NPCs/monsters,
- furniture,
- traps/treasure,
- room-content illustration.

## Base
Exact patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

## Repo implementation files
- `visual/empty-rooms-runtime-v2.css`
- `visual/empty-rooms-runtime-v2.js`
- `tests/QA_EMPTY_ROOMS_RUNTIME_INTEGRATION_V2.js`

Binary room assets remain reproducible from:
- `tools/generate_empty_rooms_v2.py`
- `visual/tileset-manifest-v2.json`
- `visual/empty-rooms-assets-v2.sha256.json`

## Integration model
The canonical runtime still creates the map and owns all room topology/state.

The V2 presentation layer reads the existing DOM geometry only:
- `.tile`
- `.joinN`
- `.joinE`
- `.joinS`
- `.joinW`
- `.fog`

For every visible canonical map cell:
1. choose one deterministic neutral floor variant + allowed rotation,
2. draw straight wall overlays wherever the same physical room does not continue,
3. draw convex corners where two exterior edges meet,
4. draw concave corners from cardinal + diagonal join geometry,
5. keep existing runtime buttons/markers/content above the structural layers.

The layer uses a `MutationObserver` because patch-15 rebuilds the map DOM after normal gameplay actions. The presentation is therefore reapplied after canonical rerenders instead of changing the generator.

## Fixed grid behaviour
V2 forces the inspection map to the binding production dimensions:
- each cell: exactly 32 x 32 CSS px,
- nearest-neighbour / pixelated rendering,
- map box: exact visible-map columns x 32 and rows x 32,
- small surfaces pan/scroll through `.mapWrap`,
- tiles are not fractionally scaled to fit the page.

This is a visual-proof rule only on the prep branch. Active UX5A runtime remains unchanged.

## Static integration QA
`node tests/QA_EMPTY_ROOMS_RUNTIME_INTEGRATION_V2.js`

Result: **14 PASS / 0 FAIL**.

Checks include:
- 32x32 tile box,
- explicit pixelated rendering,
- independent floor / structural layers,
- only floor + wall/corner asset categories,
- room geometry derived from canonical join classes,
- both outer + inner corners wired,
- reapplication after canonical rerender,
- no gameplay `move()` call,
- no direct runtime state mutation,
- map size derived from 32px cells,
- pan/scroll rather than fractional scaling.

## Fresh Chromium QA
Exact standalone patch-15 + V2 inspection build: **15 PASS / 0 FAIL**.

Verified:
- V2 layer applies,
- canonical runtime map renders,
- visible room cells exist,
- every visible cell receives exactly one floor tile,
- wall/corner overlays render,
- floor PNG loads with `naturalWidth=32`,
- structural PNG loads with `naturalWidth=32`,
- tile width = 32 CSS px,
- tile height = 32 CSS px,
- actual multi-cell join geometry is observed,
- tablet document has no horizontal overflow,
- normal map exploration still works,
- V2 layer survives canonical map rerenders,
- floor layers reapply after exploration,
- mobile document has no horizontal overflow.

For the representative screenshot only, normal `?` exploration actions were used to reveal several rooms. No debug mutation of story/map state was used to fabricate room geometry.

Harness caveat remains: the CDP browser test uses an in-memory localStorage shim. Native persistence/clipboard and physical touch are not certified by this checkpoint.

## Manual screenshot review
The final tablet/mobile screenshots were manually reviewed after the asset-loading and exact-map-sizing fixes.

Important caught failures during implementation:
1. first standalone build left asset paths relative, so CDP `setDocumentContent` loaded no PNG data (`naturalWidth=0`); the standalone build was rebuilt with embedded PNG data and re-tested,
2. the initial map box retained the old responsive width, producing dead black space; V2 now sizes the map box from actual map rows/columns x 32.

These failed intermediate screenshots are not accepted evidence.

## Tested local deliverables
Standalone embedded inspection HTML SHA-256:
`411f8f4fadc681ed062b86909f603e36b640044c1f3e750eeb8fc12bf2a99a06`

Split implementation ZIP SHA-256:
`addb84f658efac2a1fbd292aca6c7927f070c71d888b63de2aeefa32c62c6a3d`

Representative tablet capture SHA-256:
`9d8edf86cad7d1cf42ff5a9f9784fa84e1cf050faa819c951163965b8add08d0`

Representative mobile capture SHA-256:
`0d00e5a65cccd3840a4db045517134d9da279a39f601a6572137a65af5517dc2`

## Boundary
This proves that the Empty Rooms V2 structural kit can be composed on the actual Monsterhulen map grid.

It does **not** mean the art direction is finally approved, and it does not merge these changes into `ux5/searchable-rooms-encounter-tracks` or `main`.

Next step remains visual/editorial inspection of this exact room-only implementation. If accepted, the next asset package may add connection/opening/door overlays only. Content assets remain out of scope.
