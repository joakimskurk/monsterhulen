# START HERE - MONSTERHULEN VISUAL PREP

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE RUNTIME**

Repository `joakimskurk/monsterhulen` remains source of truth.

## Important branch boundary
This branch was created from UX5A runtime HEAD `b84ebe410679773e6833bf06fcd75bca449a5b89` only to prepare visual design while the physical iPad/mobile gate is unavailable.

Active runtime remains:
`ux5/searchable-rooms-encounter-tracks`

UX5A patch 15 is still not physically green and must not be merged to `main` yet.

Do not implement Narrative Graph runtime, UX5B, Multiscreen, new blueprints or content-bank expansion from this branch.

## Read in this order
1. `PROJECT_STATE.md`
2. runtime branch `ux5/searchable-rooms-encounter-tracks` -> `START_HERE.md`
3. runtime branch -> `PROJECT_STATE.md`, `ROADMAP.md`, `DECISIONS.md`, `TESTING.md`, `PLAYTEST_FINDINGS.md`
4. `visual/VISUAL_SYSTEM_V1.md`
5. `visual/VISUAL_DETAILS_V1_1.md`
6. `visual/COMPONENT_STATE_MATRIX_V1_1.md`
7. `visual/ASSET_CONTRACT_VISUAL_V1.md`
8. `visual/ART_PRODUCTION_SPEC_V1_1.md`
9. `visual/UI_SYMBOLS_V1_1.md`
10. `visual/RESPONSIVE_LAYOUT_V1.md`
11. `visual/VISUAL_ROADMAP_V1.md`
12. `visual/INTEGRATION_PLAN_V1.md`
13. `visual/VISUAL_QA_2026-10-27.md`
14. `visual/VISUAL_QA_V1_1_2026-10-27.md`
15. `prototypes/visual-system-v1_1/index.html`
16. architecture prep on `narrative/story-graph-v1-prep` only when story-system context is needed.

## Current visual checkpoint — V1.1
Implemented as prep:
- reusable visual tokens,
- CSS-only V1 skin targeting the exact current UX5A DOM,
- additive V1.1 runtime detail layer,
- interactive modular node-map/detail prototype,
- current-vs-selected map semantics,
- explicit travel separate from map inspection,
- locked/blocked/unknown visual language,
- room panel + sensory signalling hierarchy,
- encounter-card state,
- backpack affordance sheet,
- Forteller authored/improv/resolve/die hierarchy,
- conditional combat presentation,
- component-state matrix,
- production art specification,
- 14-symbol functional SVG sprite,
- extension rules for existing runtime Asset Contract `2.4.0`,
- responsive tablet/mobile contract,
- staged integration plan.

Verification:
- `tests/QA_VISUAL_SYSTEM_V1.js`: **14/0**,
- V1 Chromium node-map prototype: **10/0**,
- exact patch-15 DOM + V1 skin: **13/0**,
- `tests/QA_VISUAL_DETAILS_V1_1.js`: **32/0**,
- V1.1 Chromium node-map/detail prototype: **20/0**,
- exact patch-15 DOM + V1 skin + V1.1 detail layer: **13/0**,
- `tests/QA_VISUAL_SYMBOLS_V1_1.js`: **8/0**.

The runtime tests use the exact reconstructed patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Known browser-harness caveat remains: injected CDP document uses in-memory localStorage, so native persistence/clipboard are not certified.

## V1.1 interaction decisions
- map selection is inspection only; it never moves the hero,
- explicit `GÅ HIT` is a separate action when canonical state says room is reachable,
- `current` and `selected` have distinct visual treatments,
- hidden topology/content may not leak through art,
- a physical room gets one room-level current treatment, not one marker per underlying grid cell,
- story progress may appear only after the requirement is known,
- backpack explains affordances without auto-use,
- `START KAMP` is conditional, never a generic monster control,
- Forteller clearly separates authored truth from allowed improvisation.

## Visual principles now binding for this prep
- concept art is reference, not flattened UI,
- text/buttons/state remain real DOM,
- no UI text baked into room art,
- stable entity IDs from Asset Contract 2.4.0 remain authoritative,
- room art is presentation, not story truth,
- decorative art may not invent exits, keys, NPCs, clues, gates or resources,
- one visible room identity remains binding,
- child action remains explicit; owned resources do not auto-apply,
- hidden graph information may not leak through art,
- primary touch target >=48 CSS px,
- player surface stays simpler than narrator surface.

## Safe next visual work while UX5A is still open
Allowed:
- refine V1.1 visual docs/prototype,
- produce a **small** presentation-only asset batch against `ART_PRODUCTION_SPEC_V1_1.md`,
- browser-test crop/readability/performance of those assets in the prep prototype,
- provenance/repo-health work that does not alter gameplay.

Do not mass-produce the full art bank yet. Start with generic cave + START + BRIDGE + MUSHROOM + UNDERGROUND_LAKE, one representative subject portrait and a few inventory objects; revise the contract after actual browser inspection.

Blocked:
- integrating the skin into active UX5A runtime,
- replacing the production map renderer,
- Narrative Graph runtime,
- UX5B,
- Multiscreen,
- content/blueprint expansion.

## When physical UX5A becomes GREEN
Follow the runtime branch transition sequence exactly:
1. record physical evidence,
2. confirm final automated/browser evidence,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved architecture prep docs,
7. start NG1.

Visual V1/V1.1 integration is then a separate controlled change: apply the safe CSS layers first, verify functional parity, and only later evaluate the node-map renderer and production art.
