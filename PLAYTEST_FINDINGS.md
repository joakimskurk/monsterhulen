# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX findings from live child/DM playtest plus UX5A automated/browser verification. Physical target-device judgement remains open.

## 1. Encounters are too ambiguous for the DM
Observed:
- It is not always clear whether the app's listed consequences are mandatory, suggestions, or whether the DM should invent consequences freely.
- The child may propose actions that are not represented by the generated encounter.
- Items can feel like they are "used up" even when they should remain available narratively.
- A DM may want to know important later dependencies, clues and scenario keys before improvising away something useful.
- A novice DM may meet a named figure and still not understand whether it is friendly, hostile or why a die roll is relevant.

Implemented and verified before UX5A:
- `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
  - Encounter and climax consequences are narrator suggestions, not fixed outcomes.
  - `FRITT KAST` supports uncertain actions the child invents.
  - Inventory `BRUK` no longer removes an item.
  - `BRUK OPP / LEGG FRA` is explicit removal.
- `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
  - VENN/PERSON/MONSTER roles are explained more clearly.
  - Narrator panel contains a beginner guide for when not to roll.
  - Six visual D6 faces record the exact physical result.

Still open:
- narrator mode should derive actual map-supported non-combat solutions and useful cross-room resources for important encounters. This is UX5B after the physical UX5A gate.

## 2. Map navigation is not child-intuitive enough
Observed:
- Arrow controls are not the first thing a child tries.
- The immediate instinct is to tap directly on the map where the next room should be.

Implemented in `patches/v0.12.3_playtest_map_navigation.patch`:
- map is primary navigation,
- reachable unexplored exits show tappable `?`,
- locked exits show lock state,
- revealed adjacent rooms are tappable,
- arrows remain fallback.

## 3. Dice input should look like a physical die
Observed:
- abstract outcome buttons do not feel like recording a physical roll.

Implemented in `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`:
- six D6 faces with pips,
- exact die face stored,
- internal low/mid/high compatibility retained,
- animation is feedback only, never digital RNG.

## 4. Finale could be reached too early
Observed in UX3:
- final encounter could be reached almost immediately,
- a high roll then ended the adventure before the story had developed.

Implemented in UX4:
- every current blueprint has a hard structural progression gate,
- finale side is unreachable before its prerequisite,
- prerequisites stay on the reachable side,
- hidden shortcuts/secret doors cannot bypass the gate,
- narrator mode shows what is missing,
- high rolls cannot skip an unmet story gate.

Manual question still open: do prerequisites feel narratively meaningful enough, or should some become fuller NPC quests/puzzles?

## 5. Secret doors need discovery play
Implemented in UX4:
- hidden connection is invisible until discovered,
- child gets an in-fiction clue and chooses how to investigate,
- uncertain search uses physical D6 input,
- low result gives a stronger clue but keeps the door hidden,
- successful result reveals the door,
- secret doors are optional and cannot bypass story progression.

Target-device question remains: is the search flow fun and obvious on iPad/mobile?

## 6. Rooms need a reason to be investigated without becoming loot detectors
UX5 finding:
- entering a room should sometimes reward curiosity beyond the visible event,
- useful items should be discoverable through play, not dumped into inventory,
- UI must not tell the child in advance which room contains something,
- searching must not create hidden mandatory keys.

UX5A implementation:
- every room gets the same initial `UNDERSØK ROMMET / SE DEG RUNDT` affordance,
- investigation happens before the UI reveals whether a hidden find exists,
- KORT/VANLIG/STORT target 1/2/3 deterministic curated optional finds,
- find placement excludes start/finale, story-critical rooms and rooms already containing ambient treasure,
- empty rooms record investigation without forcing a die roll,
- hidden-find rooms reveal only that something may be hidden after investigation,
- uncertain search uses six physical D6 faces,
- first 1-2 gives a stronger clue; repeated low search fail-forwards and cannot permanently hide the optional find,
- full backpack leaves the revealed find in place.

Automated/browser evidence:
- UX5A QA verifies deterministic placement, state persistence, fail-forward and full inventory invariants,
- Chromium verified empty-room search, no item-name leak, six die faces, first low hint, second low reveal and full-backpack preservation through actual app controls.

Manual questions still open:
- does `SE DEG RUNDT` feel inviting or like a button that must be pressed in every room?
- should obvious child-described searches bypass the die more often?
- are 1/2/3 optional finds the right density for KORT/VANLIG/STORT?

## 7. Encounters need durable state, not one-roll victories
UX5 finding:
- monster hearts were too small/underdeveloped,
- non-combat approaches had prose but little durable state,
- a single lucky result could feel as if it ended a whole encounter.

UX5A implementation:
- normal fresh monsters: 3 hearts,
- `SPENNING`: 4 hearts,
- generated non-treasure encounters: 3 progress steps, or 4 in `SPENNING`,
- physical die result only records die face + consequence suggestion,
- narrator explicitly marks `+ FREMGANG` when an action genuinely changes the situation,
- filling the progress track resolves the encounter,
- monster hearts appear only after the child chooses combat; final explicit heart removal resolves combat,
- `LØST MED GOD IDÉ` is the explicit narrator action for a genuinely decisive free-form solution,
- an active legacy fight retains its remaining hearts during migration instead of being healed.

Automated/browser evidence:
- physical 6 was recorded in Chromium without changing HP or progress,
- full explicit progress resolved the encounter,
- `LØST MED GOD IDÉ` resolved through its own path,
- a `SPENNING` monster rendered 4 hearts and combat ended on the final explicit heart,
- a manually added normal monster in a `PUSTEROM` generated/rendered 3 hearts.

Manual questions still open:
- do 3-4 steps create satisfying escalation, or too much bookkeeping for young children?
- should some encounter families later get bespoke progress beats rather than a generic track?
- is `LØST MED GOD IDÉ` clear enough to invite creativity without becoming a generic skip button?

## Verification now
UX5A reconstructed runtime:
- UX5A search/encounter QA: **2216 / 0**.
- Adventure Code: **405 / 0**.
- UX4 progression/secret-door QA: **1797 / 0**.
- durable combined content regression: **5960 / 0**.
- 11 inline JavaScript blocks: **0 syntax errors**.
- Chromium UX5A smoke: **23 / 0**.

Reconstructed runtime SHA-256:
`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

The behavioral reconstruction reproduces historical UX4 test evidence exactly. Byte-identical V0.12.3 baseline provenance and complete assets remain a repository-health issue.

## Priority
Physical iPad/mobile UX5A smoke is now the immediate gate. If it is green, merge UX5A and begin UX5B map-aware solution graph. Do not add more blueprints yet. Continue repository-health repair in parallel.
