# MONSTERHULEN - TESTING

## Verification levels
Never conflate these states:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested

## Current V0.12.3 release evidence
Historical release evidence remains:
- Lasting thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

## Active playtest patch chain
Against canonical V0.12.3:
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
4. `patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
5. `patches/v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`

`patches/README.md` documents reconstruction of compressed patches.

## Adventure Code V1 automated evidence
`tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**.

The QA now follows the same deterministic layout retry rule as runtime. A layout can be rejected when hidden extras would bypass a progression gate; the exact successful layout seed remains part of the Adventure Code contract.

Verified:
- four blueprint IDs stable,
- narrator premise/foreshadow/payoff metadata present,
- curated routes stable,
- same adventure seed selects the same valid decorated dungeon and route through deterministic retry,
- blueprint/type coherence preserved,
- exact successful layout seed and blueprint ID remain wired into MH1,
- two-device code UI and narrator spoiler plan remain wired.

## UX4 progression / secret-door evidence
`tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**.

Across all four blueprints and 64 adventure seeds each, verified:
- explicit progression gate exists,
- gate starts locked,
- final side is unreachable while the gate edge is blocked,
- all prerequisite rooms remain reachable before the gate,
- every blueprint carries an explicit prerequisite contract,
- hidden shortcuts and secret doors are included as potential bypasses and cannot route around the gate,
- secret doors use physical die-face input for uncertain discovery,
- low secret-door result keeps the door hidden and gives fail-forward information,
- successful discovery reveals the hidden connection,
- narrator text states that a high roll cannot skip the story gate.

## Full regression after UX4
- Thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- Adventure Code 405 / 0
- Progression / secret door 1797 / 0
- 11 inline JavaScript blocks, 0 syntax errors

## Still manual / not certified
- real iPad play through the new hard gate,
- whether each prerequisite feels narratively earned rather than mechanical,
- secret-door search clarity and fun on target device,
- real iPad -> mobile Adventure Code copy/paste flow,
- same-map visual comparison on two physical devices,
- novice-DM usefulness of the narrator plan,
- narrative quality of all four initial blueprints,
- mobile layout,
- browser/mobile interaction remains not automated in this execution environment.

## Quality gate before adding blueprints
Do not add more Adventure Blueprints until all four initial stories have been manually played. A blueprint that is technically valid but narratively weak fails the gate. In particular, a middle prerequisite may need promotion into an NPC quest or puzzle if a simple find feels too thin.

## Repository verification
Repository-health remains open. Before the next release checkpoint, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.

## V0.12.4 acceptance gate
For each of the seven pending item/key entities: stable resolver path, correct 64x64 / 32x32 RGBA item asset sizes, transparent 0/255 alpha, no embedded text/UI, recognizable thumbnail, no unintended schema/gameplay change, repo verification pass, and synchronized project memory.
