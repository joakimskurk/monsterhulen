# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-27
Active runtime branch: `ux5/searchable-rooms-encounter-tracks`
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **UX5A patch 15 physical iPad/mobile retest before merge**
Prep branch: `narrative/story-graph-v1-prep`
Next architecture after green UX5A: **Narrative Graph V1, starting only with `CRYSTAL_MACHINE`**

## Current gate
UX5A remains open only because the target-device physical gate is not yet green.

The 2026-10-27 full checklist review found one remaining violation of the existing “one visible location identity” rule: the player-visible room description still began with `${zone.name}. ${room.name}.` even after the separate area badge had been removed.

Patch 15 is committed:
`patches/v0.12.3_playtest_room_description_location_identity_ux5a.patch`

It changes the player-facing description to start with `${room.name}.` while retaining `zoneName` internally for generation/tone.

`tests/QA_SINGLE_LOCATION_NAME_UX5A.js` now explicitly rejects the old zone-prefixed description and requires the canonical room-name-only prefix.

## Patch-15 machine verification - GREEN
The exact current indexed patch-14 source was reconstructed by line-segmented Project/Library materialization, patch 15 applied cleanly, and the following tests were run against the resulting candidate:

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

Patch-15 patch SHA-256:
`f8cd1e6c746541961ebf9308e62763d58a27ae705bee42886d56c082ceb620a5`

Updated single-location QA source SHA-256:
`c84bf6b16841c6795e589f49c08cf6287fa403aa08d2a8d77662e679d51d20d1`

Restored authored-mysteries-only QA source SHA-256:
`29c48341a73260b0906c8d50db3416fe7a27fcea543f2cc60429ef71e15de255`

The previously documented `QA_AUTHORED_MYSTERIES_ONLY_UX5A.js` was missing from the repository tree. It has now been restored with current coverage and passes **5136/0**. The old historical 3075/0 remains historical evidence only.

## Fresh browser interaction QA - GREEN WITH HARNESS CAVEAT
Fresh headless Chromium interaction smoke on the exact patch-15 HTML: **22/0**.

Covered actual browser DOM/click behavior for:
- setup/start,
- patch-15 room identity,
- room search transition,
- Adventure Code rendering,
- DM overlay,
- trap resolve control,
- movement,
- retreat-preserving trap state,
- explicit combat choice,
- non-combat resolve,
- combat hearts/state,
- 390x844 mobile viewport and mobile tabs.

Container limitation: Chromium could not load the local candidate through localhost or `file://`, and injected `about:blank` denies native localStorage. The exact HTML was injected through DevTools and the harness supplied only an in-memory localStorage shim.

Therefore:
- browser interaction/DOM/mobile-view smoke: **GREEN**,
- native localStorage persistence/resume: **NOT CERTIFIED BY THIS HARNESS**,
- real clipboard/prompt copy/paste: **NOT CERTIFIED BY THIS HARNESS**,
- target-device touch/usability: **PENDING**.

See:
- `docs/UX5A_GATE_REVIEW_2026-10-27.md`
- `docs/UX5A_BROWSER_QA_2026-10-27.md`

## Runtime patch chain
Latest layers:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance,
- patch 15 room-description location-identity completion.

## Current source/runtime conclusions
### Boka som skriver tilbake
Verified:
- `FORTELLER-IMPROVISASJON`,
- `INGEN SKJULT FASIT`,
- no hidden larger predetermined plan,
- concrete per-scene prompt,
- no mandatory story-key invention or tracked-state contradiction.

Physical/editorial question remains whether this is immediately useful to a real narrator.

### Regnbuenettet / trap semantics
Verified:
- no generic progress boxes without authored stages,
- purpose/stakes/resolvedWhen/payoff,
- `blocksForward=true`,
- onward block + retreat semantics in real `move()` test,
- resolution frees route.

### Ambient mysteries
Verified no random puzzle attachment unless explicitly opted in. Restored dedicated QA covers all six current mystery subjects over deterministic samples.

### One visible location identity
Patch 15 fixes remaining room-description zone leak. Automated 21/0 + focused runtime coverage + browser smoke are green.

### Explicit story-key flow
Verified ownership does not unlock/traverse. Explicit key use opens; traversal remains separate.

### Room search / full backpack
Verified first low strengthens clue, repeated low fails forward, and full backpack preserves revealed find. Physical touch feel remains open.

### Combat
Verified normal generated monster = 3 hearts, `SPENNING` = 4; explicit combat start; non-combat route remains; legacy active combat migration does not heal lost hearts.

### Adventure Code
Automated **405/0** and browser code rendering green. Native clipboard/paste on target device remains open.

## Required physical-device gate before UX5A merge
On the exact patch-15 build, actual iPad/mobile must verify:
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
14. native save/reload + Adventure Code copy/paste work on target browser/device.

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
Canonical prep plan:
`docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`

Target chain:
`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers: knowledge/reveal, phases/expiry, interaction shell, typed transitions, later action history/undo/shared-session sync.

Narrative Graph runtime remains blocked until UX5A is physically green and merged.

## Narrative Graph sequence after green UX5A
- NG0 specs/docs complete on prep.
- NG1 graph + provider + typed transition model/validator.
- NG2 Storylet Matrix/provider engine.
- NG3 Crystal Machine planner.
- NG4 materialization + narrator knowledge + minimal DM controls + required shells.
- NG5 >=1000 automated graph/state cases.
- NG6 real browser/touch QA.
- NG7 10-20 manual editorial/family playtests.
- NG8 accept/revise/abandon.

No second blueprint before NG8.

## Content review continuation
Reviewed through `BROTROLLET`. Next: **DEN LEVENDE RUSTNINGEN**. Do not expand Adventure Blueprint bank.

Active blueprint bank remains:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

## Repository health
Still open. Complete runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone.

## Exact next action
**Physical-test this exact patch-15 candidate on iPad/mobile using the 14-point gate.**

If anything fails, patch UX5A only and rerun affected machine/browser tests.

When physical UX5A is GREEN:
1. record physical evidence,
2. confirm final automated/browser evidence,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1`,
6. carry approved prep docs,
7. start NG1.
