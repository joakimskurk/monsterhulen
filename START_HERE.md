# START HERE - MONSTERHULEN

Updated: 2026-10-27
Active branch: `ux5/searchable-rooms-encounter-tracks`

## Read this first in a new chat
Repository is permanent source of truth. Do not reconstruct current state from old chat if repo differs.

Read in this order on this branch:
1. `PROJECT_STATE.md`
2. `ROADMAP.md`
3. `DECISIONS.md`
4. `TESTING.md`
5. `PLAYTEST_FINDINGS.md`
6. `patches/README.md`
7. `docs/UX5A_GATE_REVIEW_2026-10-27.md`
8. `docs/UX5A_BROWSER_QA_2026-10-27.md`

Then read architecture prep on branch `narrative/story-graph-v1-prep`:
1. `START_HERE.md`
2. `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`
3. `docs/NARRATIVE_GRAPH_V1.md`
4. `docs/STORYLET_MATRIX_V1.md`
5. `docs/INTERACTION_SHELLS_V1.md`
6. `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`
7. category review docs listed by prep `START_HERE.md`
8. `docs/CRYSTAL_STORYLET_BANK_V1.md`
9. `docs/CRYSTAL_STORYLET_AUDIT_2026-10-27.md`
10. `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`

Visual prep now also exists on branch `visual/visual-system-v1-prep`. Read that branch's `START_HERE.md` only when working on presentation/visual-system tasks. It is prep-only and must not be merged wholesale into active runtime/main before UX5A physical green.

## Current active work
UX5A patch 15 physical iPad/mobile retest before merge.

Latest runtime patches:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance,
- patch 15 removes remaining player-visible zone-name leak from `room.desc`.

## Patch 15 checkpoint
The current patch-15 candidate has been reconstructed from indexed current source and machine-tested.

Automated evidence:
- single location **21/0**
- explicit improv **20/0**
- authored mysteries only **5136/0**
- encounter purpose **4337/0**
- device findings **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 progression **1797/0**
- content regression **5830/0**
- focused patch-15 runtime gate **6844/0**
- 11 inline scripts **0 syntax errors**

Fresh headless Chromium interaction smoke on exact patch-15 HTML: **22/0**.

Harness caveat: browser smoke uses an in-memory localStorage shim because container Chromium denies native localStorage for the injected page.

**Remaining merge gate is physical iPad/mobile testing of the same patch-15 candidate, including native persistence and Adventure Code clipboard/paste.**

Do not merge UX5A until physical gate is green.

Do not implement Narrative Graph runtime, full DM Control Surface, UX5B or Multiscreen while this gate remains open.

## Architecture direction captured in prep
Target chain:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- phases/expiry,
- interaction shell/popup,
- typed state transitions,
- later action history/undo/shared-session sync.

Important consequences:
- same recognizable subject may have several curated roles/outcomes,
- critical resource needs at least one guaranteed reachable provider route,
- optional room finds may be genuinely random when thematic,
- merchant/trade/social bargain are provider families,
- child speaks/acts first; DM triggers dice only if uncertain,
- no critical single-roll persuasion softlock,
- combat is optional Storylet-specific capability, not MONSTER default,
- planned popups make actions tangible but never auto-use owned solutions.

## Editorial-prep checkpoint
The complete existing content bank has now been editorially reviewed on `narrative/story-graph-v1-prep`:
- MONSTERS,
- PEOPLE,
- FRIENDS,
- TRAPS,
- MYSTERIES,
- TREASURES.

The Storylet Matrix and durable decisions were updated with findings including:
- mechanic/solution-family anti-repetition,
- provider truth cannot come from noun/theme matching,
- incidental loot != planned critical provider,
- knowledge reveal cannot invent topology,
- ambient improv cannot carry critical state,
- phase/expiry for friendly clues/deliveries,
- sparse Storylet-specific combat,
- explicit resource transfer/use/placement.

The nine Crystal Machine Storylet candidates were audited and revised in-place. No subjects or blueprints were added.

**There is no next subject to review. Do not expand the bank.**

## Visual-prep checkpoint
Branch: `visual/visual-system-v1-prep`.

Prepared without changing the exact UX5A candidate:
- Visual System V1 tokens/rules,
- Asset Contract 2.4.0 extension rules,
- responsive tablet/mobile layout contract,
- CSS-only skin targeting current patch-15 DOM,
- separate interactive node-map vertical slice,
- staged integration plan.

Verification on that prep branch:
- static visual QA **14/0**,
- Chromium node-map prototype **10/0**,
- exact patch-15 DOM + visual skin **13/0**.

The visual work does **not** close the UX5A physical gate. Do not merge the visual branch wholesale. After UX5A is green/merged, carry visual changes selectively and verify them as a separate package.

## Planned popup reference
For a gate/machine requiring three colored resources:
- story reveals sockets first,
- child taps target,
- popup shows slots,
- inventory possession does not auto-fill,
- child explicitly places items,
- wrong item is not consumed,
- partial placement persists,
- full placement resolves or enables authored activation,
- world effect opens/activates target,
- later undo restores target + inventory atomically.

Detailed spec lives on prep branch in `docs/INTERACTION_SHELLS_V1.md`.

## Open-source survey result
No dependency adopted. Study-only: boardgame.io, Colyseus, rot.js, Epoch Mapper.

## Exact sequencing
While UX5A physical test is open:
- physical-test patch 15 on iPad/mobile,
- patch UX5A defects only on this branch,
- repo-health/provenance work may continue if it does not change gameplay,
- architecture/content prep remains documentation-only,
- visual work may continue only on `visual/visual-system-v1-prep` as non-runtime prep,
- do not integrate the visual skin or node renderer into active UX5A before physical green,
- do not expand content bank.

When user reports physical UX5A GREEN:
1. record physical evidence,
2. confirm final relevant automated/browser evidence,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start WP-NG1.
