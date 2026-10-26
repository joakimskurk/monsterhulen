# UX5A - physical iPad/mobile smoke

Status: required before UX5A merge and before Narrative Graph runtime work starts.

Use the latest reconstructed UX5A build through patch 11 (`v0.12.3_playtest_explicit_story_key_use_ux5a.patch`) as `index.html` together with the existing V0.12.3 / UX4 `assets/` tree. Do not replace production yet.

## 1. Explicit locked-door / story-key flow
Use `GLASS_HEART` and obtain `GLASSNØKKEL` before approaching the story gate.

Pass if:
- tapping the locked door only communicates that the door is locked,
- the tap does not unlock, traverse or consume the key,
- the app does not announce that the key in the backpack is the answer,
- the child gets a real chance to propose what to do,
- if needed, the narrator can give an open hint such as `KANSKJE DU HAR NOE I SEKKEN?`,
- `GLASSNØKKEL` is marked important in the backpack but exposes `BRUK`,
- pressing `BRUK` beside the matching door opens it and removes/archives the key with clear fiction feedback,
- pressing `BRUK` does not move the hero,
- only a later tap on the open door traverses.

Fail if possessing the correct key makes the door solve itself.

## 2. Mystery puzzle narrator flow
Play a `MYSTISK` encounter containing a puzzle.

Pass if:
- the puzzle feels framed as part of the current mystery rather than unrelated trivia,
- `FORTELLERHJELP` makes it obvious what to read aloud,
- hint and narrator-only answer are easy to find,
- the child is not asked to roll merely for solving the puzzle,
- `PUZZLET ER LØST` adds exactly one meaningful progress step,
- free-form solutions remain available.

## 3. Generic room investigation
Start a VANLIG adventure and move through several rooms.

Pass if:
- every room can be investigated,
- the app does not reveal in advance which rooms contain hidden finds,
- `SE DEG RUNDT` feels like an invitation to explore rather than a compulsory button.

## 4. Empty room
Investigate a room without a hidden find.

Pass if:
- no meaningless die roll is requested,
- the result feels natural and play can continue immediately.

## 5. Hidden find + fail-forward
Reach a room where investigation suggests something may be hidden. Roll physical D6 and register a low result twice.

Pass if:
- the first 1-2 gives a stronger clue without revealing the item,
- another low result keeps play moving and reveals the optional find,
- the search cannot softlock.

## 6. Full backpack
Fill the backpack to six items and try to take a revealed room find.

Pass if:
- the app reports that the backpack is full,
- the revealed find stays in the room and can be collected later.

## 7. Dice/state separation
In a generated encounter, note hearts/progress, roll physical 6 and register 6.

Pass if:
- the exact die face is recorded,
- hearts are unchanged,
- progress is unchanged,
- the encounter is not automatically completed.

## 8. Non-combat progress
Use `+ FREMGANG` only when the child's action actually changes the situation.

Pass if:
- ordinary encounter uses 3 steps and `SPENNING` uses 4,
- the final explicit progress step resolves the encounter,
- `LØST MED GOD IDÉ` can directly resolve a genuinely decisive free-form solution,
- the track feels useful rather than like bookkeeping.

## 9. Combat
Let the child explicitly choose combat with a monster.

Pass if:
- ordinary monster uses 3 hearts,
- `SPENNING` monster uses 4 hearts,
- the final explicit heart removal ends combat,
- touch targets are comfortable on the target device.

## 10. Adventure Code
Recheck copy/paste reconstruction on the intended two-device flow.

Pass if the same adventure plan reconstructs and the interaction remains understandable on both screens.

## 11. Whole-play judgement
Play a longer stretch without focusing on the checklist.

Record:
- whether the app presents problems before applying solutions,
- whether the child naturally checks inventory/items without being told a closed answer,
- whether `SE DEG RUNDT` feels voluntary,
- whether 3-4 encounter steps feel right for the target age,
- whether narrator controls interrupt storytelling,
- what the child naturally tries to tap,
- any cramped or unclear iPad/mobile layout,
- any event that is logically valid but narratively too early, too late or disconnected.

Treat new findings as possible architecture/story-coherence problems first, not merely copy polish.

## Optional legacy-save check
If a representative old save with an active 2-heart fight is available, load it and confirm the fight keeps its actual remaining heart count rather than being healed during migration.

## Result
- GREEN: record physical evidence, verify relevant regressions, merge UX5A to `main`, verify `main`, create `narrative/story-graph-v1` from the merged head, carry approved prep docs, then start `WP-NG1`.
- YELLOW: make concrete UX5A fixes, rerun relevant automated/browser regression, retest device.
- RED: revise the interaction model before merge.

Do not start UX5B. Narrative Graph V1 comes first after the UX5A gate.
