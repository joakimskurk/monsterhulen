# START HERE - MONSTERHULEN VISUAL PREP

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE RUNTIME**

Repository `joakimskurk/monsterhulen` is source of truth.

## Branch boundary
This branch was created from UX5A runtime HEAD `b84ebe410679773e6833bf06fcd75bca449a5b89` for presentation work while physical iPad/mobile testing is unavailable.

Active runtime remains `ux5/searchable-rooms-encounter-tracks`.
UX5A patch 15 is still not physically green and must not be merged to `main` yet.

Do not implement Narrative Graph runtime, UX5B, Multiscreen, new blueprints or content-bank expansion here. Do not merge this branch wholesale into runtime/main.

## Read in this order
1. `PROJECT_STATE.md`
2. runtime `START_HERE.md` + runtime gate/status files
3. `visual/VISUAL_DIRECTION_V1_2.md`
4. `visual/VISUAL_IMPLEMENTATION_V1_3_2026-10-27.md`
5. `visual/runtime-assets-v1_3.css`
6. `visual/runtime-assets-v1_3.js`
7. `visual/asset-manifest-v1_3.json`
8. `tests/QA_VISUAL_ASSET_IMPLEMENTATION_V1_3.js`
9. `visual/INTEGRATION_PLAN_V1_2.md`
10. `visual/ASSET_BATCH_01_V1_2.md`
11. `visual/ASSET_BATCH_01_RESULTS_2026-10-27.md`
12. `visual/VISUAL_QA_V1_2_2026-10-27.md`
13. `visual/VISUAL_DETAILS_V1_1.md` — retain interaction/state lessons, not layout target
14. `visual/COMPONENT_STATE_MATRIX_V1_1.md`
15. `visual/ASSET_CONTRACT_VISUAL_V1.md`
16. `visual/ART_PRODUCTION_SPEC_V1_1.md`
17. `visual/UI_SYMBOLS_V1_1.md`
18. architecture prep on `narrative/story-graph-v1-prep` only when story-system context is needed.

## Current checkpoint — Visual V1.3 asset-sheet implementation
The latest visual work is no longer a mockup. A generated 16-bit/pixel-art sheet has been split into reusable web assets and applied to the exact patch-15 interface while preserving the canonical runtime DOM/state model.

Implemented presentation layers:
- pixel panel/frame asset via CSS `border-image`,
- green/blue/orange/purple atlas button backgrounds while labels remain real DOM text,
- atlas-derived stone textures on the canonical generated map,
- atlas `?` and lock map-state sprites,
- current-room highlight remains canonical,
- presentation-only current-room sceneplates,
- sheet sprites mapped to matching stable hero IDs,
- key/rope/lantern/crystal art inside existing backpack slots,
- square/pixel geometry instead of rounded dashboard cards.

The generated runtime map remains authoritative. No static/pre-authored diorama map replaces the grid.

## V1.3 verification
Exact base runtime candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Static V1.3 asset/state contract:
- **15 PASS / 0 FAIL**.

Chromium exact patch-15 + V1.3:
- **17 PASS / 0 FAIL**.

Verified browser behaviour includes:
- adventure starts,
- canonical generated map remains,
- current-room highlight remains,
- one canonical room identity remains,
- sceneplate renders,
- atlas frame/button assets render,
- search and Forteller remain functional,
- narrator overlay opens,
- tablet/mobile have no horizontal overflow,
- mobile tabs remain,
- narrator touch target remains >=48 CSS px.

V1.3 local split package contains **29 PNG assets** under `assets/v13/`. Exact asset hashes/sizes are recorded in `visual/asset-manifest-v1_3.json`.

Tested local artifact hashes:
- standalone HTML `fe270477f4030ebcd76339c7c95d4e489085aa6630b93fa1658af8a2fcc373f4`
- split-asset ZIP `183bfcce70e9b3af315e09a2c7318fbbffe3f455f8caca97bd2c2dac7d6797da`
- tablet capture `a7e9c13811eb7058f00dabb8b72b55dc2d887ab3d996e4b2fb02a3712b25fb77`
- mobile capture `99ce259116fd72906eb672daa4121c40fd00a1739945294a70826415f4c87fdb`

CDP runtime harness still uses in-memory localStorage. Native persistence/clipboard and physical touch remain outside this visual certification.

## V1.2 direction remains binding
**Concept images are mood/material references, not composition/layout templates.**

Keep:
- warm torchlight against cool cave darkness,
- friendly saturated fantasy accents,
- tactile depth/material cues,
- child-safe wonder,
- richer entity/item/room illustration where canonical state supports it.

Do NOT copy:
- fixed diorama-node map composition,
- parchment as default gameplay shell,
- concept-image navigation/HUD composition,
- ornamental banner structure,
- art-defined topology or hidden story facts.

## V1.1 status
V1.1 is retained only for useful interaction decisions:
- selected != current,
- map inspection != travel,
- explicit action remains separate,
- hidden-state protection,
- inventory affordance != auto-use,
- narrator authored/improv/state separation,
- multi-cell room warning,
- component-state matrix and symbol work.

The V1.1 illustrated node-map composition is **not the target UI**.

## Binary provenance limitation
The V1.3 CSS/JS/manifest/tests/spec are committed to GitHub. The exact split PNG binaries are not committed through the connector because earlier large binary/base64 transport was proven non-byte-safe.

The local V1.3 ZIP is the tested binary package for this checkpoint. Do not claim repository binary provenance is closed until a byte-safe upload path exists and repository copies are hash-verified.

## Exact next safe visual work
Continue from the implemented V1.3 system, not from mockups:
1. editorially inspect the actual V1.3 build,
2. refine atlas crops/sprites that are visually weak,
3. expand only matching hero/entity/item/room assets in controlled batches,
4. keep all story/state semantics in the existing runtime,
5. rerun static + browser QA after each implementation batch.

Do not mass-produce map-room dioramas or integrate visual work into active UX5A before physical green.

## When physical UX5A becomes GREEN
Return to the runtime branch and follow its transition sequence exactly: record evidence -> confirm regressions -> merge UX5A to `main` -> verify `main` -> create `narrative/story-graph-v1` -> carry approved prep -> start NG1.

Visual integration remains a separate controlled package after that. Carry V1.3 changes selectively; do not merge this branch wholesale.
