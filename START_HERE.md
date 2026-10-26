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
7. `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
8. `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`

## Current active work
UX5A patch 15 physical iPad/mobile retest before merge.

Latest runtime patches:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance,
- patch 15 removes the remaining player-visible zone-name leak from `room.desc`.

## Patch 15 checkpoint
The 2026-10-27 full gate review found that patch 12 had removed the separate area badge but the player room description still exposed `${zone.name}. ${room.name}.`.

Patch 15 changes the visible description to `${room.name}.` while keeping `zoneName` internal for deterministic generation/tone.

The current patch-15 candidate has now been reconstructed from the indexed current source and machine-tested.

Automated evidence on patch 15:
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

Patch-15 reconstructed candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

A fresh headless Chromium interaction smoke is also green **22/0** using the exact patch-15 HTML. Because this container denies native localStorage for the injected `about:blank` harness, the smoke used an in-memory localStorage shim. Therefore browser DOM/click/mobile-view interactions are fresh-current, but native persistence and real clipboard behavior are still not certified.

**Remaining merge gate is physical iPad/mobile testing of the same patch-15 candidate, plus native persistence/clipboard behavior on real target browser.**

Do not merge UX5A until the physical gate is green.

Do not implement Narrative Graph runtime, full DM Control Surface, UX5B or Multiscreen while this gate remains open.

## Latest architecture direction captured in prep
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
- combat is optional DM-started capability (`combatAllowed`), not monster default,
- DM needs semantic controls instead of raw state editing,
- planned popups/interaction shells make actions tangible but never auto-use owned solutions.

## Planned popup reference
For a gate/machine requiring three colored stones:
- story reveals the three sockets first,
- child taps target,
- popup shows three slots,
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

## Content editorial continuation
Reviewed through `BROTROLLET`.

Next subject if continuing review: **DEN LEVENDE RUSTNINGEN**.

Do not expand Adventure Blueprint bank.

## Exact sequencing
While UX5A physical test is open:
- physical-test patch 15 on iPad/mobile,
- patch UX5A defects only on this branch,
- content review may continue as documentation,
- architecture prep remains documentation-only.

When user reports physical UX5A GREEN:
1. record physical evidence,
2. confirm final relevant automated/browser evidence,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start WP-NG1.
