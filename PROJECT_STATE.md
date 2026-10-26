# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **UX4 progression gates + secret-door discovery playtest, while repository-health repair remains open**

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume. Story-critical elements are curated as Adventure Blueprints. Seeded variation is allowed only where it cannot break the story.

A finale must be earned, not merely discovered. Secret doors are hidden discoveries and may not bypass story progression.

## Active playtest patch chain
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
4. `patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
5. `patches/v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`

`patches/README.md` documents reconstruction of compressed patch files.

## UX4 implemented for manual playtest
- all four curated blueprints now use the structural cut-edge as a hard progression gate,
- the finale side of the map is unreachable before the blueprint prerequisite is satisfied,
- prerequisite rooms are forced to remain on the reachable side of the gate,
- discovered hidden shortcuts/secret doors are validated as potential bypasses and rejected if they cross the progression gate,
- `GLASS_HEART` requires its scenario key,
- `WITCH_CAT` requires its curated rescue clue before the final route opens,
- `CRYSTAL_MACHINE` requires all three crystals,
- `ZOMBIE_DELIVERY` requires all three clues,
- narrator plan shows the finale gate, requirement and what is still missing,
- a high die result cannot unlock or skip an unmet story gate,
- secret doors are no longer opened by one button press,
- secret-door discovery uses the six physical D6 faces: low result gives a stronger clue and keeps the door hidden; successful result reveals it,
- secret doors remain optional exploration and cannot become a required hidden key.

## Earlier active UX retained
- map is primary navigation with tappable unknown exits, locks and known adjacent rooms,
- FRITT KAST supports arbitrary child actions without digital RNG,
- generated consequences are narrator suggestions,
- `BRUK` no longer consumes ordinary inventory,
- novice-DM encounter guidance explains role and when not to roll,
- six visual D6 faces record the actual physical result,
- Adventure Code V1 (`MH1`) reconstructs the same curated adventure and exact successful layout seed on a second device offline.

## Initial Adventure Blueprint bank
Only four are active:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Do not expand this bank until all four have been manually played and judged narratively strong.

## Automated verification for UX4
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 / 0**.
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 / 0**.
- Thing: 67 / 0.
- Treasure: 121 / 0.
- Puzzle: 4665 / 0.
- NPC: 4935 / 0.
- Friend: 4104 / 0.
- Pet: 6069 / 0.
- Rescue: 5070 / 0.
- 11 inline JavaScript blocks: 0 syntax errors.

## Manual verification still required
- verify the finale cannot be reached early on actual iPad play,
- verify each blueprint prerequisite feels meaningful rather than arbitrary,
- verify secret-door search feels understandable and fun,
- verify iPad -> phone Adventure Code still reconstructs the same map/critical plan,
- play all four blueprints through for story coherence,
- continue improving narrator help so it shows map-supported non-combat approaches for important encounters.

## Repository reality
`main` contains durable project memory, QA and reconstructable playtest patches, but repository-health is still not fully closed. The full active runtime/source/assets baseline is not yet present as ordinary directly usable project files. Do not call the next release checkpoint locked until that gate is closed.

## Do not regress
- Child proposes actions.
- No digital die roller.
- Relevant EKSTRA GOD PÅ is the only source of 2D6.
- Items/friends/pets are affordances, not numeric bonuses.
- Stable IDs and save compatibility remain important.
- Story quality beats procedural quantity.
- Finale gates are story prerequisites, not dice difficulty checks.
- Secret paths never bypass story-critical progression.

## Exact next action
Manual-playtest UX4. Focus first on whether the early-final problem is gone and whether the required middle objective feels narratively earned. Record weaknesses per blueprint. In the next encounter-system pass, expose actual map-supported non-combat solutions and useful cross-room resources in narrator mode. Continue repository-health repair in parallel and close it before the next release checkpoint.
