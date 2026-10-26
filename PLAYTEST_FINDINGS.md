# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX findings from live child/DM playtest plus UX5A candidate. Candidate behavior is not locked until runtime/manual playtest.

## 1. Encounters are too ambiguous for the DM
Observed:
- It is not always clear whether the app's listed consequences are mandatory, suggestions, or whether the DM should invent consequences freely.
- The child may propose actions that are not represented by the generated encounter.
- Items can feel like they are "used up" even when they should remain available narratively.
- A DM may want to know important later dependencies, clues and scenario keys before improvising away something useful.
- A novice DM may meet a named figure and still not understand whether it is friendly, hostile or why a die roll is relevant.

Implemented and runtime-verified before UX5A:
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
- narrator mode should derive actual map-supported non-combat solutions and useful cross-room resources for important encounters,
- UX5A encounter-state must be runtime/manual tested before that solution graph is built.

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

Implemented in UX4 via `patches/v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`:
- every current blueprint has a hard structural progression gate,
- the finale side is unreachable before its prerequisite is satisfied,
- prerequisites are kept on the reachable side,
- hidden shortcuts and secret doors are tested as potential bypasses and rejected if they cross the gate,
- narrator mode shows what gates the finale and what is still missing,
- high rolls cannot skip an unmet gate.

Manual question still open: do these prerequisites feel narratively meaningful enough, or should some be upgraded into fuller NPC quests/puzzles rather than simple finds?

## 5. Secret doors need discovery play
Observed:
- a secret door should not be a free extra map exit or a one-button reveal.

Implemented in UX4:
- hidden connection is invisible until discovered,
- child gets an in-fiction clue and chooses how to investigate,
- uncertain search uses the normal physical D6 input,
- low result gives a stronger clue but keeps the door hidden,
- successful result reveals the door,
- secret doors are optional and cannot bypass a story-critical progression gate.

## 6. Rooms need a reason to be investigated without becoming loot detectors
UX5 finding:
- entering a room should sometimes reward curiosity beyond the visible event,
- useful items should be discoverable through play, not simply dumped into inventory,
- the UI must not tell the child in advance which room contains something,
- searching must not create hidden mandatory keys.

UX5A branch candidate:
- every generated room gets the same initial `UNDERSØK ROMMET / SE DEG RUNDT` affordance,
- the first investigation action happens before the UI reveals whether a hidden find exists,
- KORT/VANLIG/STORT target 2/3/4 deterministic curated optional finds,
- actual find placement excludes start/finale, story-critical rooms and rooms already containing ambient treasure,
- an empty room simply records that it was investigated; it does not ask for a meaningless die roll,
- a room with a hidden find reveals that something may be hidden only after the child chooses to investigate,
- uncertain hidden-item search uses the six physical D6 faces,
- first 1-2 gives a stronger clue; repeated low searching fail-forwards and cannot permanently hide the optional find,
- full backpack leaves the revealed find in place.

Manual questions:
- does the generic `SE DEG RUNDT` action feel inviting or like a button that must be pressed in every room?
- should obvious child-described searches bypass the die entirely more often?
- are 2/3/4 optional finds the right density for KORT/VANLIG/STORT?

## 7. Encounters need durable state, not one-roll victories
UX5 finding:
- monster hearts were too small/underdeveloped,
- non-combat approaches had prose but little durable state,
- a single lucky result could feel as if it ended a whole encounter.

UX5A branch candidate:
- normal fresh monsters: 3 hearts,
- `SPENNING`: 4 hearts,
- generated non-treasure encounters: 3 progress steps, or 4 in `SPENNING`,
- physical die result only records the die face and consequence suggestion,
- narrator explicitly marks `+ FREMGANG` when an action genuinely changes the situation,
- filling the progress track resolves the encounter,
- monster hearts appear only after the child chooses combat; the final explicit heart removal resolves combat,
- `LØST MED GOD IDÉ` is the explicit narrator action for a genuinely decisive free-form solution,
- an active legacy fight retains its remaining hearts during migration instead of being healed.

Manual questions:
- do 3-4 steps create satisfying escalation, or too much bookkeeping for young children?
- should some encounter families later get bespoke progress beats rather than a generic track?
- is `LØST MED GOD IDÉ` clear enough that it invites genuine creativity without becoming a generic skip button?

## Verification so far
Last fully executed runtime regression remains UX4:
- 11 inline JavaScript blocks: 0 syntax errors.
- Thing 67 / 0.
- Treasure 121 / 0.
- Puzzle 4665 / 0.
- NPC 4935 / 0.
- Friend 4104 / 0.
- Pet 6069 / 0.
- Rescue 5070 / 0.
- Adventure Code 405 / 0.
- UX4 progression/secret-door QA 1797 / 0.

UX5A branch candidate:
- four split unified patches apply sequentially to a realistic source reconstruction with no rejects,
- patched reconstruction passes `git diff --check`,
- UX5A QA has been authored/updated for the final candidate behavior,
- full canonical-runtime QA and browser/iPad smoke test remain pending.

## Priority
Finish UX5A runtime verification and manual smoke test before beginning UX5B. Then build the narrator solution graph from actual map resources rather than generic suggestion text. Do not add more blueprints yet.
