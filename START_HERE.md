# START HERE - MONSTERHULEN

Updated: 2026-10-26
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
UX5A patch 14 physical iPad/mobile retest before merge.

Latest runtime patches:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance.

Patch 14 automated tests are green. Fresh current browser QA and physical device retest remain open.

**Do not merge UX5A until physical gate is green.**

Do not implement Narrative Graph runtime, full DM Control Surface, UX5B or Multiscreen while this gate remains open.

## Latest architecture direction captured in prep
The content/editorial review now points to:

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

## Future shared session direction
Recorded only, not active:
- DM always starts/hosts authoritative state,
- detached player view can be touch or display-only,
- same-Wi-Fi/LAN-first join by short code/QR,
- host validates player action requests and broadcasts state,
- reconnect/idempotency,
- no narrator-only data leakage,
- DM player-view preview,
- action history + undo foundation.

## Open-source survey result
No dependency adopted.

Study-only references on prep branch:
- boardgame.io,
- Colyseus,
- rot.js,
- Epoch Mapper.

Do not import a dungeon/game framework while current state/story architecture is unsettled.

## Content editorial continuation
Review has progressed through:
- Pannekakezombien,
- Den bortkomne zombien,
- Skjelettdanseren,
- Skjelettvakten,
- Sumptrollet,
- Brotrollet.

Next subject if continuing review in a new chat:

**DEN LEVENDE RUSTNINGEN**

Do not expand Adventure Blueprint bank.

## Exact sequencing
While UX5A physical test is open:
- test/fix UX5A only on this branch,
- content review may continue as documentation,
- architecture prep remains documentation-only.

When user reports physical UX5A GREEN:
1. record physical evidence,
2. rerun/confirm relevant automated + fresh browser tests,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start WP-NG1.
