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
3. `visual/VISUAL_SYSTEM_V1.md`
4. `visual/VISUAL_DETAILS_V1_1.md`
5. `visual/COMPONENT_STATE_MATRIX_V1_1.md`
6. `visual/ASSET_CONTRACT_VISUAL_V1.md`
7. `visual/ART_PRODUCTION_SPEC_V1_1.md`
8. `visual/ASSET_BATCH_01_V1_1.md`
9. `visual/UI_SYMBOLS_V1_1.md`
10. `visual/RESPONSIVE_LAYOUT_V1.md`
11. `visual/VISUAL_ROADMAP_V1.md`
12. `visual/INTEGRATION_PLAN_V1.md`
13. `visual/VISUAL_QA_2026-10-27.md`
14. `visual/VISUAL_QA_V1_1_2026-10-27.md`
15. `prototypes/visual-system-v1_1/index.html`
16. architecture prep on `narrative/story-graph-v1-prep` only when story-system context is needed.

## Current checkpoint — Visual V1.1
Prepared without changing gameplay:
- V1 visual tokens and CSS skin for the exact UX5A DOM,
- additive V1.1 runtime detail CSS,
- modular interactive node-map/detail prototype,
- current vs selected room semantics,
- explicit travel separate from map inspection,
- locked/blocked/unknown map language,
- room-panel and encounter hierarchy,
- backpack affordance sheet with no auto-use,
- Forteller authored/improv/resolve/die hierarchy,
- conditional combat presentation,
- component-state matrix,
- production art specification,
- controlled Asset Batch 01 brief,
- 14-symbol functional SVG sprite,
- Asset Contract 2.4.0 compatibility rules,
- responsive tablet/mobile contract,
- staged integration plan.

Verification:
- V1 static QA **14/0**
- V1 Chromium prototype **10/0**
- exact patch-15 + V1 skin **13/0**
- V1.1 static detail QA **32/0**
- V1.1 Chromium prototype **20/0**
- exact patch-15 + V1 + V1.1 detail layer **13/0**
- SVG symbol QA **8/0**

Exact runtime candidate used by runtime browser checks:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

CDP runtime harness still uses in-memory localStorage. Native persistence/clipboard and physical touch remain outside this certification.

## Binding V1.1 rules
- map selection only inspects; it never moves the hero,
- explicit `GÅ HIT` is separate and canonical-state-gated,
- `current` and `selected` are visually distinct,
- hidden topology/content does not leak through map or art,
- a physical room gets one room-level current treatment, never repeated per grid cell,
- story progress appears only after its requirement is player-known,
- inventory explains possibilities but does not apply solutions,
- `START KAMP` is conditional, not a generic monster control,
- Forteller distinguishes authored truth from improv scope,
- text/buttons/state remain real DOM,
- no UI text is baked into world art,
- existing stable entity IDs remain authoritative,
- room art is presentation, not story truth,
- primary touch target >=48 CSS px.

## Exact next safe visual package
`visual/ASSET_BATCH_01_V1_1.md`

Only produce/test this small proof batch before expanding:
- `CAVE_GENERIC`
- `START`
- `BRIDGE`
- `MUSHROOM`
- `UNDERGROUND_LAKE`
- one `NPC_OWL_LIBRARIAN` proof portrait
- key, rope, lantern and generic non-story crystal art proofs

Integrate those assets into the **visual-prep prototype only**, then browser-test crop, readability, performance, mobile layout and hidden-state safety. Do not mass-produce the full art bank before this proof batch is accepted.

## When physical UX5A becomes GREEN
Return to the runtime branch and follow its transition sequence exactly: record evidence -> confirm regressions -> merge UX5A to `main` -> verify `main` -> create `narrative/story-graph-v1` -> carry approved prep -> start NG1.

Visual integration remains a separate controlled package after that: safe CSS layers first, functional parity verification, then node renderer/art only if still justified.
