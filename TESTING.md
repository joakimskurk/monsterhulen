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
6. **UX5A candidate:** `patches/v0.12.3_playtest_search_progress_ux5a.patch.gz.b64`

`patches/README.md` documents reconstruction of compressed patches.

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

## UX5A search / encounter-state candidate
`tests/QA_SEARCH_PROGRESS_UX5A.js` has been authored.

Static/isolated verification completed in the authoring environment:
- QA file: `node --check` PASS,
- deterministic optional-find planning model PASS,
- untouched legacy monster normalization to 3 hearts PASS,
- active legacy combat preservation PASS,
- `SPENNING` normalization to 4 hearts / 4 progress steps PASS,
- compressed patch byte round-trip PASS,
- uncompressed patch SHA-256: `454c0d2f9114ea1029717b3a283fe8729a481b3721c287bf1207d86b7f02ae8f`,
- encoded artifact SHA-256: `a93972a2a99b2a37e6c52ded68160892cb585a8d798a520341452712ebd64e81`.

The committed QA is designed to verify across all four blueprints and 64 seeds each:
- two optional hidden room finds in a standard 13-room adventure,
- no find in start/finale/critical/ambient-treasure rooms,
- finds come from the curated treasure bank and never match progression requirements,
- generated non-treasure encounters start at 0 and use 3-4 progress steps,
- fresh monsters start full at 3-4 hearts,
- room search uses six physical D6 faces,
- 1-2 search is fail-forward and does not reveal loot,
- 3-6 can reveal loot,
- full inventory preserves a discovered find,
- encounter die registration cannot mutate progress or resolve/remove the encounter,
- generated encounters no longer expose the old generic `MØTET ER FERDIG` shortcut,
- zero monster hearts resolve only through explicit combat handling,
- save schema remains 12.

**Not yet claimed:** automated UX5A runtime PASS. The repo still lacks the canonical runtime baseline as ordinary files, and the Library-held UX4 HTML/ZIP cannot currently be raw-materialized by this connector. The QA must be run after the six-patch chain is reconstructed.

## Full regression after UX4
Last fully executed regression remains:
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

Do not relabel this as “after UX5A” until the candidate patch is applied and the full suite is rerun.

## Required UX5A runtime/manual gate
Before UX5B:
1. reconstruct canonical V0.12.3 + patches 1-6,
2. run `node tests/QA_SEARCH_PROGRESS_UX5A.js <reconstructed-root>`,
3. rerun Adventure Code + UX4 + all existing content QA,
4. syntax-check all inline scripts,
5. browser smoke-test one empty room search, one successful hidden find and one 1-2 retry,
6. verify full backpack leaves the item visibly in the room,
7. verify normal monster shows 3 hearts and `SPENNING` monster 4,
8. verify physical 5/6 alone does not remove an encounter,
9. verify `+ FREMGANG`, `LØST MED GOD IDÉ` and combat-zero each resolve through their intended explicit path,
10. verify an old save with active 2-heart combat does not gain hearts.

## Still manual / not certified
- real iPad play through UX4/UX5A,
- whether search feels exploratory rather than repetitive,
- whether 3-4 progress steps are enough structure without becoming bookkeeping,
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
