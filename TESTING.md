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

## Active UX5A branch patch chain
Against canonical V0.12.3:
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
4. `patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
5. `patches/v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`
6. `patches/v0.12.3_playtest_searchable_rooms_encounter_engine_ux5a.patch`
7. `patches/v0.12.3_playtest_encounter_narrator_ux5a.patch`
8. `patches/v0.12.3_playtest_searchable_rooms_encounter_ui_ux5a.patch`
9. `patches/v0.12.3_playtest_searchable_rooms_encounter_render_ux5a.patch`

`patches/README.md` documents order, reconstruction and current SHA-256 values.

## Adventure Code V1 automated evidence
`tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**.

The QA follows the same deterministic layout retry rule as runtime. A layout can be rejected when hidden extras would bypass a progression gate; the exact successful layout seed remains part of the Adventure Code contract.

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

## UX5A candidate test asset
`tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js` is authored on `ux5/searchable-rooms-encounter-tracks`.

It is designed to verify:
- every room has a generic investigation state so loot rooms are not pre-spoiled,
- deterministic optional hidden-find placement for all four blueprints,
- minimum hidden-find counts 2/3/4 for KORT/VANLIG/STORT,
- hidden finds avoid start/finale/story-critical/ambient-treasure rooms,
- hidden-find/search state survives re-enrichment,
- empty-room investigation state survives re-enrichment,
- first low search result does not reveal the item while repeated low search remains fail-forward,
- full inventory leaves a revealed room find untouched,
- fresh monsters use 3-4 hearts,
- generated non-treasure encounters use 3-4 progress steps starting at 0,
- an active legacy 2-heart fight is upgraded without restoring lost hearts,
- an untouched legacy monster is upgraded to the new full scale,
- physical encounter die registration cannot mutate progress or hearts,
- full explicit progress resolves the encounter,
- zero explicit monster hearts resolves combat,
- `LØST MED GOD IDÉ` remains an explicit narrator-controlled direct solution,
- save schema remains 12.

### UX5A verification completed in this branch session
- Four UX5A unified diffs were applied sequentially to a realistic source reconstruction using GNU `patch` with **no rejected hunks**.
- `git diff --check` passed on the reconstructed patched source.
- The final UX5A patch chain was rechecked after the non-spoilery search change and after the active-legacy-combat migration fix.
- The obsolete monolithic UX5A candidate patch was removed.

### UX5A verification not yet completed
Do **not** claim UX5A automated runtime PASS yet. The canonical full V0.12.3/UX4 runtime is not available in this execution environment as raw files, so the new QA and full regressions have not been executed against the real reconstructed app.

The last fully executed runtime regression remains UX4:
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

## Required UX5A runtime/manual gate
Before UX5B or merge to `main`:
1. reconstruct canonical V0.12.3 + patches 1-9 as raw files,
2. run `node tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js <reconstructed-root>`,
3. rerun Adventure Code + UX4 + all existing content QA,
4. syntax-check all inline scripts,
5. browser smoke-test generic room investigation in both an empty room and a find room,
6. test first low hidden-find roll and repeated-low fail-forward reveal,
7. verify full backpack leaves a revealed find in the room,
8. verify normal monster shows 3 hearts and `SPENNING` monster 4 after combat is chosen,
9. verify a physical 5/6 alone changes neither hearts nor progress,
10. verify final `+ FREMGANG`, final `- HJERTE`, and `LØST MED GOD IDÉ` each resolve through their intended explicit path,
11. verify an old save with active 2-heart combat keeps its current remaining heart count,
12. smoke-test on iPad/mobile for interaction cost and layout.

## Still manual / not certified
- whether room investigation feels exploratory rather than like a mandatory button in every room,
- whether 3-4 progress steps create satisfying escalation without too much bookkeeping,
- whether each blueprint prerequisite feels narratively earned rather than mechanical,
- secret-door search clarity and fun on target device,
- real iPad -> mobile Adventure Code copy/paste flow,
- novice-DM usefulness of the narrator plan,
- narrative quality of all four initial blueprints,
- mobile layout.

## Repository verification
Repository-health remains open. Before the next release checkpoint, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.

## V0.12.4 acceptance gate
For each of the seven pending item/key entities: stable resolver path, correct 64x64 / 32x32 RGBA item asset sizes, transparent 0/255 alpha, no embedded text/UI, recognizable thumbnail, no unintended schema/gameplay change, repo verification pass, and synchronized project memory.
