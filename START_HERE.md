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
4. `visual/INTEGRATION_PLAN_V1_2.md`
5. `visual/ASSET_BATCH_01_V1_2.md`
6. `visual/VISUAL_QA_V1_2_2026-10-27.md`
7. `visual/VISUAL_SYSTEM_V1.md`
8. `visual/VISUAL_DETAILS_V1_1.md` — retain interaction/state lessons, not layout target
9. `visual/COMPONENT_STATE_MATRIX_V1_1.md`
10. `visual/ASSET_CONTRACT_VISUAL_V1.md`
11. `visual/ART_PRODUCTION_SPEC_V1_1.md`
12. `visual/UI_SYMBOLS_V1_1.md`
13. `visual/RESPONSIVE_LAYOUT_V1.md`
14. architecture prep on `narrative/story-graph-v1-prep` only when story-system context is needed.

## Current checkpoint — Visual V1.2 direction correction
User review identified that V1/V1.1 had become too literal an interpretation of the generated concept images.

Binding correction:

**Concept images are mood/material references, not composition/layout templates.**

Monsterhulen's actual UX5A runtime remains the design substrate.

Keep from concept art:
- warm torchlight against cool cave darkness,
- friendly saturated fantasy accents,
- tactile depth/material cues,
- child-safe wonder,
- richer entity/item/room illustration where canonical state supports it.

Do NOT copy:
- fixed diorama-node map composition,
- parchment as the default gameplay shell,
- concept-image top navigation/bottom HUD composition,
- ornamental banner/logo structure,
- crystal-machine imagery as generic product identity,
- decorative art that invents story facts.

## Current V1.2 implementation proof
Prepared on this branch only:
- `visual/runtime-skin-v1_2.css` — runtime-first cave/stone presentation layer,
- `tests/QA_VISUAL_DIRECTION_V1_2.js`,
- `visual/VISUAL_QA_V1_2_2026-10-27.md`,
- `visual/INTEGRATION_PLAN_V1_2.md`,
- `visual/ASSET_BATCH_01_V1_2.md`.

Verification:
- V1.2 static direction QA **16/0**,
- exact patch-15 + V1.2 Chromium interaction/layout QA **14/0**.

Exact runtime candidate used by browser check:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

CDP runtime harness still uses in-memory localStorage. Native persistence/clipboard and physical touch remain outside this certification.

## V1.1 status
V1.1 is not deleted because it contains useful interaction decisions:
- selected != current,
- map inspection != travel,
- explicit action remains separate,
- hidden-state protection,
- inventory affordance != auto-use,
- narrator authored/improv/state separation,
- multi-cell room warning,
- component-state matrix and symbol work.

However, the V1.1 illustrated node-map composition is **not the target UI**.

## New asset rule
`visual/ASSET_BATCH_01_V1_2.md` supersedes V1.1 batch placement assumptions.

First art proof is limited to existing runtime surfaces:
- current-room sceneplate,
- existing entity/encounter portrait,
- existing inventory item icons.

No illustrated map nodes in Batch 01.
The generated runtime map remains canonical and state-driven.

## When physical UX5A becomes GREEN
Return to the runtime branch and follow its transition sequence exactly: record evidence -> confirm regressions -> merge UX5A to `main` -> verify `main` -> create `narrative/story-graph-v1` -> carry approved prep -> start NG1.

Visual integration remains a separate controlled package after that. Carry V1.2 changes selectively; do not merge this branch wholesale.
