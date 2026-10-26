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

`patches/README.md` documents how to reconstruct the final entry to a normal unified diff.

## Adventure Code V1 automated evidence
`tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**.

Verified:
- four blueprint IDs are stable,
- each blueprint carries narrator premise/foreshadow/payoff metadata,
- each blueprint uses its curated world route,
- identical seed produces identical decorated dungeon JSON,
- 128 repeated seed checks preserve blueprint/type/route determinism,
- GLASS_HEART locks GLASSNØKKEL + KRYSTALLHJERTET,
- WITCH_CAT locks HEKSEKATTEN rescue content,
- CRYSTAL_MACHINE locks red/blue/yellow crystals + KRYSTALLMASKINEN,
- ZOMBIE_DELIVERY locks its curated truth + three curated clues,
- MH1 version tag, exact layout seed and blueprint ID are wired into the reproducibility contract,
- copy/open code UI and full spoiler plan are wired.

## Regression after Adventure Code patch
All existing runtime QA passes after the patch:
- Thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

The Rescue QA wiring check was updated to recognize the new seeded `pickRng(rescue.clues||RESCUE_CLUES,rng)` implementation as equivalent target-specific clue selection.

## Still manual / not certified
- real iPad -> mobile Adventure Code copy/paste flow,
- same-map visual comparison on two physical devices,
- novice-DM usefulness of the full spoiler plan,
- narrative quality of all four initial blueprints,
- mobile layout of long code and spoiler plan,
- browser/mobile interaction remains not automated in this execution environment.

## Quality gate before adding blueprints
Do not add more Adventure Blueprints until all four initial stories have been manually played and notes are recorded. A blueprint that is technically valid but narratively weak fails the gate.

## Repository verification
Repository-health remains open. Before the next release checkpoint, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.

## V0.12.4 acceptance gate
For each of the seven pending item/key entities: stable resolver path, correct 64x64 / 32x32 RGBA item asset sizes, transparent 0/255 alpha, no embedded text/UI, recognizable thumbnail, no unintended schema/gameplay change, repo verification pass, and synchronized project memory.
