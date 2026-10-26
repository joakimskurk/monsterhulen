# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX findings from live child/DM playtest plus UX5A candidate. Candidate behavior is not locked until runtime/manual playtest.

## 1. Encounters are too ambiguous for the DM
Observed:
- It is not always clear whether the app's listed consequences are mandatory, suggestions, or whether the DM should invent consequences freely.
- The child may propose actions that are not represented by the generated encounter.
- Items can feel like they are "used up" even when they should remain available narratively.
- A DM may want to know important later dependencies, clues and scenario keys before improvising away something useful.
- A novice DM may meet a named figure such as SOPPPRINSEN and still not understand whether the figure is friendly, hostile or why a die roll is relevant.

Implemented and runtime-verified before UX5A:
- `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
  - Encounter and climax consequences are narrator suggestions, not fixed outcomes.
  - `FRITT KAST` supports any uncertain action the child invents.
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

## 6. Rooms need a reason to be investigated
Lost-chat UX5 finding:
- entering a room should sometimes reward curiosity beyond the visible event,
- useful items should be discoverable through play, not simply dumped into inventory,
- searching must not create hidden mandatory keys or expose in advance that a room contains loot.

UX5A candidate:
- every room offers an explicit investigation action,
- standard 13-room adventures hide two deterministic curated optional finds,
- find rooms exclude start/finale, critical rooms and rooms already holding ambient treasure,
- only a room with an actual hidden find asks for a physical search roll after the child chooses to investigate,
- 1-2 gives a stronger clue and permits another approach,
- 3-6 reveals the item,
- full backpack leaves the revealed find in place.

Manual questions:
- does searching feel like discovery or like a button that must be pressed in every room?
- should some obvious child-described searches simply work without a die?
- is two hidden finds right for a normal-length adventure?

## 7. Encounters need state, not one-roll victories
Lost-chat UX5 finding:
- monster hearts were too small/underdeveloped,
- non-combat approaches had prose but little durable state,
- a single lucky result could feel as if it ended a whole encounter.

UX5A candidate:
- normal fresh monsters: 3 hearts,
- `SPENNING`: 4 hearts,
- generated non-treasure encounters: 3 progress steps, or 4 in `SPENNING`,
- physical die result only records the consequence,
- narrator explicitly marks `+ FREMGANG` when an action genuinely changes the situation,
- `LØST MED GOD IDÉ` exists for plans that naturally solve the whole problem,
- old generic generated-encounter `MØTET ER FERDIG` shortcut is removed,
- combat resolves when explicit heart state reaches zero.

Manual questions:
- do 3-4 steps create satisfying escalation, or too much bookkeeping for a five-year-old?
- should some encounter families have bespoke progress beats later?
- is direct smart resolution obvious enough to the narrator without becoming a second generic “skip” button?

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

UX5A candidate:
- QA syntax check PASS,
- isolated search/progress/migration model PASS,
- compressed patch round-trip PASS,
- full reconstructed-runtime QA pending.

## Priority
Finish UX5A runtime verification and manual smoke test before beginning UX5B. Then build the narrator solution graph from actual map resources rather than generic suggestion text. Do not add more blueprints yet.
