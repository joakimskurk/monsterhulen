# START HERE - MONSTERHULEN VISUAL PREP

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE RUNTIME**

Repository `joakimskurk/monsterhulen` is source of truth.

## Branch boundary
Active runtime remains `ux5/searchable-rooms-encounter-tracks`.
UX5A patch 15 is still waiting for physical iPad/mobile certification and must not be merged to `main` yet.

Visual work on this branch may not change gameplay/state semantics and must not be merged wholesale into runtime/main. Narrative Graph runtime, UX5B, Multiscreen and content-bank expansion remain blocked.

## Read in this order
1. `PROJECT_STATE.md`
2. runtime branch `START_HERE.md` + runtime gate/status files
3. `visual/VISUAL_DIRECTION_V1_2.md`
4. `visual/VISUAL_IMPLEMENTATION_V1_4_2026-10-27.md`
5. `visual/runtime-assets-v1_4.css`
6. `visual/runtime-assets-v1_4.js`
7. `visual/asset-manifest-v1_4.json`
8. `tests/QA_VISUAL_ASSET_IMPLEMENTATION_V1_4.js`
9. `visual/VISUAL_IMPLEMENTATION_V1_3_2026-10-27.md` only as historical/rejected implementation context
10. V1.1/V1.2 interaction/asset contract docs when needed
11. architecture prep on `narrative/story-graph-v1-prep` only when story-system context is needed.

## Current checkpoint — Visual V1.4 corrected asset integration
V1.3 was structurally green but **failed manual visual review**. Do not continue its integration method.

Canonical correction:

**Use generated sheet art as discrete sprites/repeatable textures. Build panels, buttons, layout, focus and state as browser/CSS components.**

V1.4 now:
- keeps the canonical generated runtime grid,
- focuses/pans the map around the current room instead of showing a huge dead surface,
- treats a multi-cell physical room as one current-room outline,
- removes stretched sheet bitmaps from panel/button chrome,
- uses split icons/sprites for map state, hero, inventory and controls,
- uses neutral stone for tone styling; tone metadata does not invent moss/water environments,
- suppresses generic scene art unless visible current-room text safely identifies a scene family,
- gives mobile explicit `KART / ROM / SEKK / FORTELLER` surfaces in normal document flow,
- preserves DOM text, canonical movement, inventory/state logic and stable IDs.

Exact base runtime candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

## V1.4 verification
Static asset/state contract:
- **20 PASS / 0 FAIL**.

Chromium exact patch-15 + V1.4:
- **24 PASS / 0 FAIL**.

Manual screenshot review was also performed after the final map-centering/mobile-navigation corrections. Structural green alone is not accepted as visual quality evidence.

Harness caveat: CDP-injected runtime uses an in-memory localStorage shim. Native persistence, clipboard and physical touch remain outside this certification.

## V1.3 status
V1.3 is retained only as historical evidence. Its screenshots exposed real design failures despite **15/0 static + 17/0 Chromium**.

Do not reintroduce:
- stretched full-sheet button/panel crops,
- per-cell current-room borders,
- generic decorative scene art that invents state,
- tone-to-environment assumptions,
- long mobile all-surfaces-at-once layout.

## Binary provenance limitation
V1.4 CSS/JS/spec/test/manifest are in GitHub. Exact PNG binaries remain in the tested local ZIP because prior connector binary/base64 transport was proven non-byte-safe.

Do not claim repository byte-provenance is closed until a byte-safe upload path exists and repository copies are hash-verified.

## Exact next safe visual work
Continue from V1.4 only:
1. inspect the corrected product visually,
2. refine weak sprites/crops in controlled batches,
3. expand only assets that map cleanly to existing runtime surfaces/stable IDs,
4. keep map topology and story state canonical,
5. require both automated/browser evidence and manual screenshot review after each visual batch.

When physical UX5A becomes GREEN, return to the runtime branch transition sequence first. Visual integration remains a separate controlled package after runtime merge.
