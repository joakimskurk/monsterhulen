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
  - Encounter and climax consequences are explicitly labelled as narrator suggestions, not fixed outcomes.
  - `FRITT KAST` is available for any uncertain action the child invents.
  - FRITT KAST keeps the physical dice rule: easy/safe just works, uncertain = 1D6, relevant EKSTRA GOD PÅ = 2D6 highest.
  - Inventory `BRUK` no longer removes an item.
  - `BRUK OPP / LEGG FRA` is the explicit removal action for ordinary bag items.
  - Scenario-critical items remain protected from removal.
- `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
  - VENN encounters are explicitly labelled as friendly figures, not enemies.
  - PERSON encounters are described as people with their own goals, not automatically good or bad.
  - MONSTER means creature/obstacle, not automatically evil.
  - Narrator panel now contains a five-step beginner guide for how to tell the scene and when not to roll.
  - Talking, greeting or offering help to a friendly figure does not itself require a roll.

Still to design/test:
- Expanded DM adventure plan/spoiler overview with important dependencies, clues, keys and useful callbacks.
- Deterministic adventure code/seed contract so a second device can reconstruct the same DM plan.

## 2. Map navigation is not child-intuitive enough
Observed:
- Arrow controls are not the first thing a child tries.
- The immediate instinct is to tap directly on the map where the next room should be.

Implemented for playtest in `patches/v0.12.3_playtest_map_navigation.patch`:
- The map is now the primary navigation surface.
- Reachable unexplored exits show a tappable `?` on the fog cell immediately beyond the door.
- Locked exits show a tappable lock state instead of `?`.
- Revealed adjacent rooms are tappable directly on the map.
- Non-adjacent rooms are not made tappable.
- Existing direction arrows remain as secondary fallback controls.
- Existing `move()` logic is unchanged, so keys, locks, scenario progression and save behavior still use the known code path.

## 3. Dice input should look like a physical die
Observed:
- `OI!`, `DET GÅR`, `KJEMPEBRA` and range buttons feel like abstract game-state controls instead of recording the die that was actually rolled.
- The desired interaction is to tap the same physical die face that was rolled.

Implemented for playtest in `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`:
- Encounter, climax and FRITT KAST now show six square D6 faces with pips.
- The user taps the exact face rolled: one through six, represented visually by pips rather than visible numeric labels.
- A short stamp/bounce animation plays before the consequence appears. This is feedback only; the app still never rolls digitally.
- Exact `diceValue` is stored for the scene while the existing low/mid/high consequence bands remain the internal compatibility model.
- Consequence preview uses die-face glyphs instead of visible `1-2 / 3-4 / 5-6` labels.

## 4. Finale can be reached too early
Observed in UX3:
- A generated route allowed the player to reach the final encounter almost immediately.
- A high roll then resolved the finale and ended the adventure before the story had developed.
- A curated finale is not sufficient if map adjacency allows it to be entered before the middle objective has been completed.

Required correction before Adventure Code V1 can lock:
- Every blueprint must define an explicit finale progression gate.
- The final room/encounter may be visible early, but it must be blocked until the required story condition is satisfied.
- The prerequisite may be a scenario key, NPC quest, puzzle, collected parts, clue/truth chain, rescue or other explicit story flag.
- The prerequisite must be reachable without passing through the finale.
- A high die result must never bypass an unmet finale gate.
- The narrator view must show what gates the finale, where/how to earn it, and which map-supported alternatives can help.
- Important encounters should expose multiple supported routes, including at least one non-combat route for story-critical finales.
- Failure should alter the situation and available approaches, not softlock the adventure.

This is now a blocker for UX3 acceptance, not an optional polish item.

## Verification so far
- 11 inline JavaScript blocks: 0 syntax errors.
- Existing Thing, Treasure, Puzzle, NPC, Friend, Pet and Rescue runtime QA still pass with no new failures.
- Targeted map navigation logic: 3/3 PASS (`?`, lock, known adjacent room all route to the expected existing move direction).
- Existing `move()` function remains unchanged from V0.12.3.
- FRITT KAST contains no digital die/RNG.
- Dice-face mapping remains internally 1-2 -> low, 3-4 -> mid, 5-6 -> high while the UI presents six individual faces.
- `BRUK` handler does not splice/remove inventory; only the explicit drop/consume handler does.
- Browser/mobile interaction is NOT certified by automation in this environment. Manual child/DM playtest is required before lock.

## Priority
These UX and progression changes take priority over locking additional content/art. Repository-health remains an independent technical gate, but all playtest implementations and critical findings are stored in GitHub so they are not chat-only.
