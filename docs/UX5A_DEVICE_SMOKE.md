# UX5A - physical iPad/mobile smoke

Status: required before UX5A merge and before UX5B starts.

Use the verified `Monsterhulen_PLAYTEST_UX5A.html` as `index.html` together with the existing V0.12.3 / UX4 `assets/` tree. Do not replace production yet.

## 1. Generic room investigation
Start a VANLIG adventure and move through several rooms.

Pass if:
- every room can be investigated,
- the app does not reveal in advance which rooms contain hidden finds,
- `SE DEG RUNDT` feels like an invitation to explore rather than a compulsory button.

## 2. Empty room
Investigate a room without a hidden find.

Pass if:
- no meaningless die roll is requested,
- the result feels natural and play can continue immediately.

## 3. Hidden find + fail-forward
Reach a room where investigation suggests something may be hidden. Roll physical D6 and register a low result twice.

Pass if:
- the first 1-2 gives a stronger clue without revealing the item,
- another low result keeps play moving and reveals the optional find,
- the search cannot softlock.

## 4. Full backpack
Fill the backpack to six items and try to take a revealed room find.

Pass if:
- the app reports that the backpack is full,
- the revealed find stays in the room and can be collected later.

## 5. Dice/state separation
In a generated encounter, note hearts/progress, roll physical 6 and register 6.

Pass if:
- the exact die face is recorded,
- hearts are unchanged,
- progress is unchanged,
- the encounter is not automatically completed.

## 6. Non-combat progress
Use `+ FREMGANG` only when the child's action actually changes the situation.

Pass if:
- ordinary encounter uses 3 steps and `SPENNING` uses 4,
- the final explicit progress step resolves the encounter,
- `LØST MED GOD IDÉ` can directly resolve a genuinely decisive free-form solution,
- the track feels useful rather than like bookkeeping.

## 7. Combat
Let the child explicitly choose combat with a monster.

Pass if:
- ordinary monster uses 3 hearts,
- `SPENNING` monster uses 4 hearts,
- the final explicit heart removal ends combat,
- touch targets are comfortable on the target device.

## 8. Whole-play judgement
Play a longer stretch without focusing on the checklist.

Record:
- whether `SE DEG RUNDT` feels voluntary,
- whether 3-4 encounter steps feel right for the target age,
- whether narrator controls interrupt storytelling,
- what the child naturally tries to tap,
- any cramped or unclear iPad/mobile layout.

## Result
- GREEN: merge UX5A and start UX5B.
- YELLOW: make small concrete UX fixes, rerun automated/browser regression, retest device.
- RED: revise the interaction model before UX5B.

## Optional legacy-save check
If a representative old save with an active 2-heart fight is available, load it and confirm the fight keeps its actual remaining heart count rather than being healed during migration.
