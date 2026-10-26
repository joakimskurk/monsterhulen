# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-27
Active runtime branch: `ux5/searchable-rooms-encounter-tracks`
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **UX5A patch 15 verification + physical iPad/mobile retest before merge**
Prep branch: `narrative/story-graph-v1-prep`
Next architecture after green UX5A: **Narrative Graph V1, starting only with `CRYSTAL_MACHINE`**

## Current gate
UX5A remains open.

Patch 14 was automated green, but the 2026-10-27 gate review found one remaining violation of the existing “one visible location identity” rule: the player-visible room description still began with `${zone.name}. ${room.name}.` even though the separate area badge had been removed.

Patch 15 is now committed:
`patches/v0.12.3_playtest_room_description_location_identity_ux5a.patch`

It changes the player-facing description to start with `${room.name}.` while retaining `zoneName` internally for generation/tone.

`tests/QA_SINGLE_LOCATION_NAME_UX5A.js` now explicitly rejects the old zone-prefixed description and requires the canonical room-name-only prefix.

Patch 15 status:
- implemented as patch: **YES**,
- source/static review: **YES**,
- updated QA syntax: **YES**,
- full reconstructed automated regression: **PENDING**,
- fresh current browser interaction QA: **PENDING**,
- physical iPad/mobile retest: **PENDING**.

Do not merge UX5A or implement Narrative Graph runtime until this gate is green.

## Why full patch-15 runtime/browser verification is still open
The Project/Library search index exposes the current patch-14 source and was sufficient to inspect the exact current behavior. In this session, however, the available file materialization path returned an older backing representation rather than the exact indexed current candidate.

Therefore:
- do not run/claim current browser certification against the stale materialized export,
- do not claim a new automated patch-15 pass count yet,
- reconstruct/apply patch 15 against the exact current candidate before final regression/browser certification.

This is a tooling/provenance limitation, not evidence that patch 15 is broken.

## Runtime patch chain
Latest layers:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance,
- patch 15 room-description location-identity completion.

Patch 15 addresses a test-coverage gap in patch 12; it does not change the underlying product decision.

## Automated evidence through patch 14
Against the previously reconstructed patch-14 runtime:
- explicit-improv **20/0**
- encounter-purpose **4337/0**
- authored-mysteries-only **3075/0**
- single-location **19/0** under the old coverage
- targeted device **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- 11 scripts **0 syntax errors**

Patch-14 behavioral reconstruction SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 patch SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

Patch-15 patch SHA-256:
`f8cd1e6c746541961ebf9308e62763d58a27ae705bee42886d56c082ceb620a5`

Updated single-location QA source SHA-256:
`c84bf6b16841c6795e589f49c08cf6287fa403aa08d2a8d77662e679d51d20d1`

These reconstruction hashes are behavioral/source artifacts, not byte-identical release provenance.

## Current UX5A gate review - source-level findings
The 2026-10-27 review walked the physical checklist against the indexed current source.

### 1. `BOKA SOM SKRIVER TILBAKE`
Source supports the intended contract:
- explicit `FORTELLER-IMPROVISASJON`,
- explicit `INGEN SKJULT FASIT`,
- concrete per-scene “FINN PÅ” prompt,
- states no larger predetermined hidden plan exists,
- may add atmosphere/optional hint/side discovery,
- may not create mandatory story key or contradict tracked state.

Physical/editorial question still open: is this immediately understandable/useful to a real narrator during play?

### 2. `REGNBUENETTET` / trap semantics
Source supports:
- no generic progress boxes unless authored `progressStages` exist,
- `FELLE` purpose/stakes/resolvedWhen/payoff contract,
- `blocksForward=true`,
- onward movement blocked while active,
- retreat to previous room allowed,
- resolving the trap removes the event and frees route.

Physical question still open: does this feel clear and natural by touch/in play?

### 3. Ambient mystery puzzles
Source only attaches a random mystery puzzle when a mystery explicitly has `useRandomPuzzle===true`. Current ambient mystery entries inspected do not opt in.

### 4. One visible location identity
Gate review found the remaining `room.desc` leak. Patch 15 fixes it. Must be retested after reconstruction.

### 5. Explicit story-key flow
Source supports child-driven key use:
- tapping a keyed locked connection only says `DØREN ER LÅST`,
- ownership does not unlock/traverse,
- explicit key use calls `tryUseStoryKey`,
- matching key opens the door and removes/anchors the key,
- movement remains a separate later action.

### 6. Room search / full backpack
Source supports:
- `SE DEG RUNDT` does not reveal whether loot exists,
- first low uncertain search strengthens clue,
- repeated low fails forward and reveals,
- revealed find remains in room when backpack is full,
- generic search find remains optional and never a story key.

Physical question still open: does search feel exploratory rather than compulsory, and are touch controls clear?

### 7. Combat
Source supports:
- normal generated monster = 3 hearts,
- `SPENNING` generated monster = 4 hearts,
- combat starts only after `BARNET VELGER KAMP`,
- non-combat resolution remains available,
- heart decrement is ignored until combat has started,
- migration logic avoids healing an already-started legacy encounter when normalizing old heart scale.

Physical question still open: touch usability and final-heart/non-combat comprehension.

### 8. Adventure Code
Source supports `MH1` encode/decode, copy with prompt fallback, paste/open narrator flow, and prior automated regression was **405/0**.

Actual browser/device copy/paste remains open.

## Required physical-device gate before UX5A merge
On actual iPad/mobile verify at minimum:
1. `BOKA SOM SKRIVER TILBAKE` narrator panel makes intentional improv vs authored content obvious,
2. improv prompt is useful/bounded and does not create mandatory state,
3. `REGNBUENETTET` has no generic progress boxes,
4. narrator understands purpose/solve/payoff,
5. active trap blocks onward and allows retreat; resolution frees route,
6. ambient mysteries do not receive disconnected random puzzles,
7. each room has one clear visible place identity after patch 15,
8. explicit story-key flow remains child-driven,
9. `SE DEG RUNDT` feels exploratory rather than compulsory,
10. hidden-find fail-forward/full-backpack flow works by touch,
11. 3-heart normal / 4-heart `SPENNING` combat controls remain usable,
12. final-heart/non-combat resolution controls are understandable,
13. representative legacy active-combat save if possible,
14. Adventure Code copy/paste still works.

## Binding product direction
- story quality beats combinatorial volume,
- child proposes actions; app does not silently apply owned solutions,
- one physical room has one visible identity,
- interactive mechanics require purpose/stakes/resolution/payoff/world effects,
- no generic filler progress,
- puzzles need authored contextual role,
- narrator improvisation is explicit/scoped,
- critical state never depends on untracked improv,
- physical dice report uncertainty only,
- stable IDs/save compatibility remain binding,
- critical story uses `SETUP -> SIGNAL -> ACTION -> PAYOFF`.

## Consolidated next architecture
Detailed canonical plan is on prep branch:
`docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`

Target chain:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- dramatic phase/expiry,
- interaction shell/popup,
- typed validated state transition,
- later action history/undo/shared-session sync.

Narrative Graph work remains blocked until UX5A is physically green and merged.

## Narrative Graph sequence after green UX5A
- NG0 specs/docs - complete/updated on prep.
- NG1 graph + provider + typed transition model/validator.
- NG2 Storylet Matrix/provider engine.
- NG3 Crystal Machine planner.
- NG4 room materialization + narrator knowledge + minimal DM controls + required interaction shells.
- NG5 >=1000 automated graph/state cases.
- NG6 real browser/touch QA.
- NG7 10-20 manual editorial/family playtests.
- NG8 accept/revise/abandon.

No second blueprint before NG8.

If accepted, current preferred later order:
1. DM Control Surface V1 polish + action history/undo foundation,
2. UX5B,
3. additional blueprints one at a time,
4. Multiscreen / Shared Session V1 when state model is stable.

## Content review continuation
Canonical prep handoff:
`docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`

Reviewed through `BROTROLLET`.

Next subject: **DEN LEVENDE RUSTNINGEN**.

Do not expand Adventure Blueprint bank.

Active blueprint bank remains:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

## Repository health
Still open. Complete runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone.

## Exact next action
1. Reconstruct the exact patch-14 current candidate from a trustworthy current source and apply patch 15.
2. Run updated single-location QA + relevant full regression.
3. Run fresh browser interaction QA against that exact patch-15 candidate.
4. Physically test the same patch-15 candidate on iPad/mobile using the 14-point gate above.
5. Patch UX5A defects only if anything fails.
6. Only when patch-15 regression + browser + physical gate are green: record evidence, merge UX5A to `main`, verify `main`, create `narrative/story-graph-v1`, carry approved prep docs, and start NG1.
