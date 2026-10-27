# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Runtime baseline used to create this branch: `b84ebe410679773e6833bf06fcd75bca449a5b89`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Visual V1.3 asset-sheet implementation — static/browser green, physical/editorial integration review pending**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green.
Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Canonical visual direction — V1.2
**Concept images are mood/material references, not composition references.**

The actual Monsterhulen runtime remains the visual substrate. Keep warm torchlight, cool cave darkness, saturated fantasy accents and tactile pixel materials; do not copy fixed diorama maps, default parchment dashboard composition, concept HUD structure or art-defined story facts.

## Visual V1.3 — IMPLEMENTED ASSET-SHEET LAYER
V1.3 is the first checkpoint where generated pixel-art sheets are split into reusable assets and actually applied to the exact patch-15 web interface. This is not a layout mockup.

Repo implementation files:
- `visual/runtime-assets-v1_3.css`
- `visual/runtime-assets-v1_3.js`
- `visual/asset-manifest-v1_3.json`
- `visual/VISUAL_IMPLEMENTATION_V1_3_2026-10-27.md`
- `tests/QA_VISUAL_ASSET_IMPLEMENTATION_V1_3.js`

Implemented presentation:
- pixel-art frame via `border-image`,
- square/pixel geometry,
- atlas-derived semantic control backgrounds while DOM owns text/states,
- atlas stone textures on canonical runtime map cells,
- canonical current-room highlight,
- atlas `?` and lock sprites on map probes,
- transparent room hit-targets so button chrome does not cover the map,
- current-room sceneplates selected only from visible current-room text,
- sheet sprites mapped only to matching stable hero IDs,
- key/rope/lantern/crystal visuals inside existing inventory slots.

No authored/static dungeon map replaces runtime topology. No visual hook auto-uses items, moves the hero or mutates story state.

## V1.3 split asset package
The exact local test package contains **29 PNG assets** under `assets/v13/`:
- 4 semantic button backgrounds,
- 8 matching hero sprites,
- 4 inventory sprites,
- 4 map-state sprites,
- 3 room sceneplates,
- 5 map tile textures,
- 1 pixel UI-frame asset.

Hash/size provenance is recorded in `visual/asset-manifest-v1_3.json`.

## V1.3 verification — GREEN WITH EXISTING HARNESS CAVEAT
Static asset/state contract:
- **15 PASS / 0 FAIL**.

Chromium exact patch-15 + V1.3:
- **17 PASS / 0 FAIL**.

Verified browser behaviour:
- adventure starts,
- canonical generated map remains,
- current room remains highlighted,
- one canonical room identity remains,
- room sceneplate renders,
- atlas panel/frame and semantic button skins render,
- search and Forteller remain functional,
- narrator overlay opens,
- square/pixel geometry is active,
- tablet/mobile have no horizontal overflow,
- mobile tabs remain,
- mobile sceneplate remains within viewport,
- narrator target remains >=48 CSS px.

Static contract additionally proves:
- no gameplay `move()` call introduced,
- no direct runtime state mutation introduced,
- scene art reads only visible current-room text,
- every manifest entry has SHA-256 provenance.

Harness caveat: CDP-injected runtime still uses in-memory localStorage. Native persistence/clipboard and physical touch remain outside this certification.

## Tested V1.3 local deliverables
Standalone asset-integrated HTML SHA-256:
`fe270477f4030ebcd76339c7c95d4e489085aa6630b93fa1658af8a2fcc373f4`

Split-asset package ZIP SHA-256:
`183bfcce70e9b3af315e09a2c7318fbbffe3f455f8caca97bd2c2dac7d6797da`

Latest tablet capture SHA-256:
`b557cc3caddeaa256f0e98aeb1b68ede07dbcd6309519ff3eb45f715397c4bd2`

Latest mobile capture SHA-256:
`ed702e16a20000933897ff647d605a656ea08ad5cf7e7dcf7bdd5201e414d862`

Local asset manifest SHA-256:
`bcb0e49f603635b497d1456bf29398639a3c7f8f4e37f06863b8e0830abb6723`

## Binary provenance limitation
CSS/JS/spec/tests/manifest are committed to GitHub. The exact PNG binaries are not committed through the GitHub connector because earlier binary/base64 transport was proven non-byte-safe. The local split-package ZIP is the exact tested binary source for this checkpoint.

Do not claim repository byte-provenance is closed until a byte-safe binary upload path exists and repository copies are hash-verified.

## V1.1 retained only as interaction research
Useful decisions remain: selected != current, map inspection != movement, explicit action, hidden-state protection, inventory affordance != auto-use, narrator authored/improv separation, conditional combat presentation, multi-cell room warning and component-state rules. The V1.1 node-map composition is not production direction.

## Stable IDs / asset contract
Existing runtime Asset Contract 2.4.0 remains authoritative. No parallel entity IDs. Unmatched hero/entity assets retain runtime fallback rather than receiving a false visual identity.

## Binding visual constraints
- runtime interaction model and generated topology remain canonical,
- browser owns text and interactive controls,
- one visible place identity per room,
- art cannot invent exits, locks, keys, NPCs, clues, resources or rewards,
- no hidden-knowledge leak,
- no auto-use of possessed resources,
- primary touch target >=48 CSS px,
- physical/editorial review remains necessary even when browser QA is green.

## Architecture/content state
The existing content bank is already editorially reviewed on `narrative/story-graph-v1-prep`; the nine `CRYSTAL_MACHINE` candidates are audited/revised. Do not expand the content bank while current gates are open. Narrative Graph runtime remains blocked until UX5A is physically green and merged.

## Exact next safe visual work
Continue from V1.3 implementation, not from new UI mockups:
1. inspect/refine weak sheet crops and sprite matches,
2. expand assets in controlled batches against existing runtime surfaces,
3. add only correct stable-ID mappings,
4. keep map topology/state generated by runtime,
5. rerun V1.3 static and browser QA after each batch,
6. keep runtime/main untouched until UX5A physical gate is green.

When physical UX5A becomes GREEN, return to the runtime transition sequence first. Visual integration remains a separate controlled package and must be carried selectively, not merged wholesale.
