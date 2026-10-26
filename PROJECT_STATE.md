# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **Adventure Code V1 + quality-first curated blueprint playtest, while repository-health repair remains open**

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume. Story-critical elements are curated as Adventure Blueprints. Seeded variation is allowed only where it cannot break the story.

## Active playtest patch chain
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
4. `patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64`

`patches/README.md` documents how the compressed Adventure Code patch reconstructs to a normal unified diff.

## UX implemented for playtest
- map is primary navigation with tappable unknown exits, locks and known adjacent rooms,
- FRITT KAST supports arbitrary child actions without digital RNG,
- generated consequences are narrator suggestions,
- `BRUK` no longer consumes ordinary inventory,
- novice-DM encounter guidance explains role and when not to roll,
- six visual D6 faces record the actual physical result,
- Adventure Code V1 (`MH1`) can be copied from the child device and pasted into a second device,
- narrator device reconstructs the same blueprint, exact successful layout seed and critical plan offline,
- narrator view includes premise, foreshadowing, payoff guidance, critical plan and all-room spoilers.

## Initial Adventure Blueprint bank
Only four are active:
- `GLASS_HEART`: Glassnøkkelen og Krystallhjertet, curated crystal route.
- `WITCH_CAT`: Heksekatten som forsvant, Soppskogen -> Gravplassen -> Heksetårnet.
- `CRYSTAL_MACHINE`: red/blue/yellow crystals -> Krystallmaskinen.
- `ZOMBIE_DELIVERY`: mystery where the zombie is returning, not stealing, with three curated clues.

Do not expand this bank until all four have been manually played and judged narratively strong.

## Automated verification for UX3
- `tests/QA_ADVENTURE_CODE_V1.js`: Adventure Code V1 405 / 0.
- Thing: 67 / 0.
- Treasure: 121 / 0.
- Puzzle: 4665 / 0.
- NPC: 4935 / 0.
- Friend: 4104 / 0.
- Pet: 6069 / 0.
- Rescue: 5070 / 0.
- 11 inline JavaScript blocks: 0 syntax errors.

## Manual verification still required
- child map behavior on target iPad,
- novice-DM comprehension,
- six die-face touch layout,
- copy code on iPad -> paste on phone -> compare same map/critical plan,
- play through each of the four blueprints for story coherence.

## Repository reality
`main` contains durable project memory and reconstructable playtest patches, but repository-health is still not fully closed. The full active runtime/source/assets baseline is not yet present as ordinary directly usable project files. Do not call the next release checkpoint locked until that gate is closed.

## Do not regress
- Child proposes actions.
- No digital die roller.
- Relevant EKSTRA GOD PÅ is the only source of 2D6.
- Items/friends/pets are affordances, not numeric bonuses.
- Stable IDs and save compatibility remain important.
- Story quality beats procedural quantity.

## Exact next action
Manual-playtest UX3 on two devices. Start each of the four initial blueprints across repeated adventures, compare child iPad and narrator phone using the Adventure Code, and record narrative weaknesses in `PLAYTEST_FINDINGS.md`. Fix weak blueprints before adding any new story combinations. Continue repo-health repair in parallel and close it before the next release checkpoint.
