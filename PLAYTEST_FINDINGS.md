# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX findings from live child/DM playtest. These are not locked until manually playtested.

## 1. Encounters are too ambiguous for the DM
Observed:
- It is not always clear whether the app's listed consequences are mandatory, suggestions, or whether the DM should invent consequences freely.
- The child may propose actions that are not represented by the generated encounter.
- Items can feel like they are "used up" even when they should remain available narratively.
- A DM may want to know important later dependencies, clues and scenario keys before improvising away something useful.
- A novice DM may meet a named figure such as SOPPPRINSEN and still not understand whether the figure is friendly, hostile or why a die roll is relevant.

Implemented for playtest:
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
- consequences should increasingly change encounter state rather than merely provide prose.

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
- `GLASS_HEART` requires the Glass Key,
- `WITCH_CAT` requires the rescue clue,
- `CRYSTAL_MACHINE` requires all three crystals,
- `ZOMBIE_DELIVERY` requires all three clues,
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

## Verification so far
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
- Browser/mobile interaction is not automated in this environment. Manual child/DM playtest is required before lock.

## Priority
Manual-playtest UX4 before adding more blueprints or locking more content. The next encounter-system improvement should expose real map-supported alternative solutions and cross-room resources to the DM.
