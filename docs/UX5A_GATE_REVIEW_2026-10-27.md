# UX5A gate review - 2026-10-27

Status: **PATCH 15 IMPLEMENTED; EXACT-CANDIDATE REGRESSION + BROWSER + PHYSICAL RETEST OPEN**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`

Purpose: walk the entire UX5A merge gate against the current indexed patch-14 source, close everything that can be established from source, record one discovered defect, and leave only claims that genuinely require exact runtime/browser/physical evidence.

## Verification vocabulary
- **SOURCE VERIFIED**: current indexed source directly supports the behavior.
- **AUTOMATED GREEN THROUGH P14**: previously reconstructed patch-14 test evidence exists.
- **PATCH 15 PENDING REGRESSION**: new patch exists but has not been run against an exact reconstructed current candidate in this session.
- **PHYSICAL REQUIRED**: usability/comprehension/touch feel cannot be certified from source.

## Tooling/provenance limitation encountered
The Project/Library search index exposes the current patch-14 source, including patch-14 strings and behavior. The available materialization path in this session returns an older backing representation instead of the exact indexed current candidate.

Therefore no fresh current-browser or full patch-15 runtime claim is made from the stale export.

This limitation is separate from repository-health debt: the full release/runtime asset tree is still not byte-reconstructable from ordinary repo files alone.

---

## Gate item 1 - Boka som skriver tilbake: authored vs improv responsibility
**SOURCE VERIFIED; PHYSICAL REQUIRED**

Current source includes:
- `FORTELLER-IMPROVISASJON`,
- `INGEN SKJULT FASIT`,
- explicit statement that no larger predetermined plan exists for the open detail,
- a concrete per-scene improv prompt.

`BOKA SOM SKRIVER TILBAKE` specifically tells Forteller that there is no predetermined message in the app and suggests how to invent one.

Physical question: does a real narrator understand this immediately during play without needing to reverse-engineer the app?

## Gate item 2 - improv is bounded and cannot create mandatory state
**SOURCE VERIFIED; PHYSICAL/EDITORIAL REQUIRED FOR CLARITY**

Source guardrails allow atmosphere, optional hint and side discovery, but forbid:
- new mandatory story key,
- contradiction of known app state,
- pretending the app has hidden authored causality that does not exist.

Physical question: is the wording useful rather than overly technical or restrictive?

## Gate item 3 - Regnbuenettet has no generic progress boxes
**SOURCE VERIFIED; AUTOMATED GREEN THROUGH P14**

`encounterProgressHtml()` renders only when authored `progressStages` contains at least two stages. `REGNBUENETTET` has no such stages.

Expected result: no arbitrary 3/4 filler track.

## Gate item 4 - narrator understands purpose / solve / payoff
**SOURCE VERIFIED; PHYSICAL REQUIRED FOR COMPREHENSION**

Generated non-treasure encounters expose:
- `HVA ER GREIA?`,
- `NÅR ER DET LØST?`,
- `HVA ENDRES DA?`.

For traps the contract states that the obstacle blocks onward travel, gives a fictional completion condition, and promises route release.

## Gate item 5 - active trap blocks onward, retreat works, resolution frees route
**SOURCE VERIFIED; AUTOMATED GREEN THROUGH P14; PHYSICAL REQUIRED**

Source behavior:
- `FELLE` gets `blocksForward=true`,
- movement checks `blockingForwardEncounter`,
- target other than `previousRoomId` is blocked,
- previous room remains reachable as retreat,
- resolving the trap removes its event,
- route is then free.

Physical test should verify this feels obvious on map/touch controls.

## Gate item 6 - ambient mysteries do not receive disconnected random puzzles
**SOURCE VERIFIED; AUTOMATED GREEN THROUGH P14**

Random puzzle attachment requires explicit `t.useRandomPuzzle===true`. Current inspected ambient mystery entries do not opt in.

No generic category-based random puzzle attachment remains.

## Gate item 7 - one clear visible room identity
**FAILED SOURCE REVIEW -> PATCH 15 IMPLEMENTED -> PENDING REGRESSION/PHYSICAL**

Discovered defect:
- room banner used canonical `r.name`,
- but player-visible `room.desc` still started with `${zone.name}. ${room.name}.`.

This meant patch 12 removed the separate area badge but did not fully keep zone identity internal.

Patch 15:
`patches/v0.12.3_playtest_room_description_location_identity_ux5a.patch`

Changes:
```text
room.desc=`${zone.name}. ${room.name}. `+
```
to:
```text
room.desc=`${room.name}. `+
```

Zone metadata remains intact internally.

`tests/QA_SINGLE_LOCATION_NAME_UX5A.js` now rejects the old prefix and requires the new one.

Do not claim the old **19/0** result certifies patch 15; those assertions were not present then.

## Gate item 8 - explicit story-key flow remains child-driven
**SOURCE VERIFIED; AUTOMATED GREEN THROUGH P14; PHYSICAL REQUIRED**

A keyed locked-door tap:
- only reports `DØREN ER LÅST`,
- does not auto-use key,
- does not unlock,
- does not traverse.

Explicit story-key use calls `tryUseStoryKey`, opens the lock, and still leaves traversal as a separate action.

## Gate item 9 - `SE DEG RUNDT` feels exploratory rather than compulsory
**SOURCE SUPPORTS INTENT; PHYSICAL REQUIRED**

Source:
- every searchable room offers the action without revealing whether loot exists,
- generic finds are explicitly optional,
- rooms with no find can simply be investigated and left.

Whether children feel compelled to tap it in every room is a physical UX judgement and remains open.

## Gate item 10 - hidden-find fail-forward / full backpack by touch
**SOURCE VERIFIED; AUTOMATED GREEN THROUGH P14; PHYSICAL TOUCH REQUIRED**

Source:
- first low uncertain search gives stronger hint,
- repeated low reveals find,
- full backpack returns `RYGGSEKKEN ER FULL` before marking find taken,
- revealed find remains in room.

Physical test must verify die buttons, take action and full-bag feedback are clear by touch.

## Gate item 11 - 3-heart normal / 4-heart SPENNING combat controls
**SOURCE VERIFIED; AUTOMATED GREEN THROUGH P14; PHYSICAL TOUCH REQUIRED**

`difficultyFor(room,'MONSTER')` returns:
- 4 for `SPENNING`,
- 3 otherwise.

Combat state becomes active only after explicit `BARNET VELGER KAMP` or an existing already-damaged legacy fight.

## Gate item 12 - final heart / non-combat resolution understandable
**SOURCE VERIFIED; PHYSICAL REQUIRED**

Before combat the UI offers `BARNET VELGER KAMP` plus non-combat encounter resolution. During combat hearts are explicit. Non-combat resolution remains a separate route.

Comprehension cannot be certified from source alone.

## Gate item 13 - representative legacy active-combat save
**SOURCE VERIFIED FOR MIGRATION RULE; TARGETED RUNTIME/PHYSICAL IF POSSIBLE**

Migration/enrichment logic recognizes an already-started fight when:
- `combatStarted===true`, or
- old `hp < oldMax`.

When normalizing old monsters to the current 3/4-heart target, it keeps current lost-heart state rather than healing a started fight to full.

A real legacy save smoke remains desirable if available.

## Gate item 14 - Adventure Code copy/paste
**SOURCE VERIFIED; AUTOMATED GREEN THROUGH P14; BROWSER/PHYSICAL REQUIRED**

Source contains:
- `MH1` encode/decode,
- deterministic adventure payload with layout seed + blueprint,
- clipboard write with prompt fallback,
- paste/open narrator flow.

Prior automated result: **405/0**.

Actual clipboard/prompt behavior must be tested on the exact current browser/device candidate.

---

## Patch 15 artifacts
Patch:
`patches/v0.12.3_playtest_room_description_location_identity_ux5a.patch`

Patch SHA-256:
`f8cd1e6c746541961ebf9308e62763d58a27ae705bee42886d56c082ceb620a5`

Updated QA:
`tests/QA_SINGLE_LOCATION_NAME_UX5A.js`

Prepared QA source SHA-256:
`c84bf6b16841c6795e589f49c08cf6287fa403aa08d2a8d77662e679d51d20d1`

QA syntax was checked locally before commit. Full runtime pass count is intentionally not claimed yet.

## Exact next machine gate
1. Obtain/reconstruct exact current patch-14 candidate from a trustworthy current source.
2. Apply patch 15.
3. Run updated single-location QA.
4. Run relevant automated regressions, including encounter-purpose, authored mysteries, device findings, search/encounter, Adventure Code, UX4 and content regression.
5. Run fresh browser interaction QA on that exact patch-15 candidate.

## Exact next human gate
Run the 14 physical checks above on the same patch-15 candidate on iPad/mobile.

If any physical finding fails, patch UX5A only and repeat affected tests.

If machine + browser + physical gates are all green, follow `START_HERE.md` transition exactly: record evidence -> merge UX5A to `main` -> verify `main` -> create `narrative/story-graph-v1` -> carry approved prep docs -> start NG1.

Narrative Graph runtime, full DM Control Surface, UX5B and Multiscreen remain blocked until then.
