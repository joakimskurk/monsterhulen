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
5. `visual/ASSET_CONTRACT_VISUAL_V1.md`
6. `visual/RESPONSIVE_LAYOUT_V1.md`
7. `visual/VISUAL_ROADMAP_V1.md`
8. `visual/INTEGRATION_PLAN_V1.md`
9. `visual/VISUAL_QA_2026-10-27.md`
10. `prototypes/visual-system-v1/index.html`
11. architecture prep on `narrative/story-graph-v1-prep` only when story-system context is needed.

## Current visual checkpoint
Implemented as prep:
- reusable visual tokens,
- CSS-only skin that targets the exact current UX5A DOM,
- interactive node-map vertical-slice prototype,
- extension rules for existing runtime Asset Contract `2.4.0`,
- responsive tablet/mobile contract,
- staged integration plan.

Verification:
- `tests/QA_VISUAL_SYSTEM_V1.js`: **14/0**,
- Chromium node-map prototype: **10/0**,
- exact patch-15 DOM + visual skin: **13/0**.

The runtime-skin test used the exact reconstructed patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Known browser-harness caveat remains: injected CDP document uses in-memory localStorage, so native persistence/clipboard are not certified.

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
- refine visual docs/prototype,
- prepare presentation-only asset specifications,
- produce room/character/item art against stable IDs,
- browser-test prep artifacts,
- provenance/repo-health work that does not alter gameplay.

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

Visual V1 integration is then a separate controlled change: apply the safe skin first, verify parity, and only later evaluate the node-map renderer.
