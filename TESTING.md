# MONSTERHULEN - TESTING

## Verification levels
Never conflate these states:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested

## Current V0.12.3 release evidence
The completed V0.12.3 release reported:
- Lasting thing: 67 PASS / 0 FAIL
- Treasure: 121 / 0
- Puzzle: 4665 / 0
- NPC: 4935 / 0
- Friend: 4104 / 0
- Pet: 6069 / 0
- Rescue: 5070 / 0
- 11 JavaScript blocks, 0 syntax errors

This is historical release evidence. It is not a claim that the current GitHub `main` can rerun all those tests yet, because the full runtime/test snapshot is still being repaired into the repository.

## Active playtest UX patch verification
The current manual-test build is V0.12.3 plus these sequential patches:
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`

Verified in the working build:
- 11 inline JavaScript blocks, 0 syntax errors.
- Existing Thing, Treasure, Puzzle, NPC, Friend, Pet and Rescue runtime QA still pass with no new failures.
- Map navigation targeted logic: 3/3 PASS.
  - open unexplored exit renders `?` and routes to the correct existing move direction,
  - locked exit renders lock state and routes through the same existing move direction,
  - revealed adjacent room is directly tappable and routes through the same existing move direction.
- Existing `move()` function is unchanged from V0.12.3.
- FRITT KAST contains no digital RNG.
- Inventory `BRUK` does not remove the item.
- Only the explicit `BRUK OPP / LEGG FRA` handler removes an ordinary bag item.
- Encounter/climax consequences are labelled as suggestions, not narrator mandates.
- Dice input presents six visual D6 faces with pips.
- Exact `diceValue` is recorded; the existing compatibility mapping remains 1-2 -> low, 3-4 -> mid, 5-6 -> high.
- The die animation is only visual feedback after the user selects the physical result; the app does not generate a result.
- VENN/PERSON/MONSTER narrator guidance is present, including explicit beginner instructions for when a roll is unnecessary.

Not verified yet:
- automated real-browser interaction, because this execution environment blocks Chromium navigation to both localhost and `file://`,
- manual mobile/tablet layout of the six die faces and new narrator guide,
- live child/DM comprehension of `?`, lock state, FRITT KAST, revised inventory buttons, narrator guide and die-face input.

## Repository verification
For the repaired baseline, the repository must verify at minimum:
- required project-memory files exist,
- canonical runtime/source files are present or reconstructable from the repository alone,
- `monsterhulen_v120` and `eventyrkryper_v100` migration markers are preserved,
- inline JavaScript syntax passes when Node is available,
- runtime asset archive/content hashes match the canonical manifest,
- current bank counts remain 13 start items, 8 narrator items and 5 scenario keys.

## Browser/mobile status
V0.12.3 browser/mobile interaction QA was **not rerun**. Do not describe V0.12.3 or the active UX patches as browser-certified or physical-device-certified until that testing actually happens.

## V0.12.4 acceptance gate
For each of the seven pending item/key entities:
- stable resolver ID/path unchanged,
- large is exactly 64x64 RGBA,
- thumbnail is exactly 32x32 RGBA,
- transparent background,
- alpha only 0/255,
- no embedded text/UI frame,
- recognizable silhouette at thumbnail size,
- no gameplay/schema change,
- repository verification passes,
- Asset Manifest / Project State / Roadmap / Changelog are synchronized.
