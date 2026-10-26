# MONSTERHULEN - TESTING

## Verification levels
Never conflate these states:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested

## Historical V0.12.3 release evidence
- Lasting thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

These historical counts remain release evidence. The durable combined regression added during UX5A is listed separately below.

## Active UX5A branch patch chain
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
4. `patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
5. `patches/v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`
6. `patches/v0.12.3_playtest_searchable_rooms_encounter_engine_ux5a.patch`
7. `patches/v0.12.3_playtest_encounter_narrator_ux5a.patch`
8. `patches/v0.12.3_playtest_searchable_rooms_encounter_ui_ux5a.patch`
9. `patches/v0.12.3_playtest_searchable_rooms_encounter_render_ux5a.patch`

`patches/README.md` documents order and reconstruction.

## UX5A automated evidence - GREEN
Executed against the reconstructed active UX5A runtime:

- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**.
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**.
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**.
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**.
- 11 inline JavaScript blocks: **0 syntax errors**.

Reconstructed runtime SHA-256:
`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

### UX5A search/encounter QA covers
- every room gets generic investigation state so hidden-find rooms are not pre-spoiled,
- deterministic optional hidden finds for all four blueprints,
- target find counts 1/2/3 for KORT/VANLIG/STORT when enough eligible rooms exist,
- hidden finds avoid start/finale/story-critical/ambient-treasure rooms,
- search state survives re-enrichment,
- empty-room investigation survives re-enrichment,
- first low result gives information but does not reveal the item,
- repeated low search fail-forwards and cannot softlock the find,
- full inventory leaves a revealed find untouched,
- fresh monsters use 3-4 hearts,
- generated non-treasure encounters use 3-4 progress steps starting at 0,
- active legacy combat is not healed during migration,
- untouched legacy monster upgrades to the new full scale,
- physical encounter die registration cannot mutate progress or hearts,
- full explicit progress resolves the encounter,
- zero explicit monster hearts resolves combat,
- `LØST MED GOD IDÉ` remains a narrator-controlled direct solution,
- save schema remains 12.

### Durable combined content regression
`tests/QA_CONTENT_REGRESSION.js` was added because the older content QA existed only as historical execution evidence rather than durable repo scripts.

It verifies:
- character trait/start-item build matrix,
- all 36 puzzle templates at all three age bands,
- 20 monster families / two variants each,
- NPC/friend/trap/mystery/treasure content bank integrity,
- generated encounter validation across tones and beats,
- reward offers across histories/scenario contexts,
- entity resolver integrity for scenario and narrator content,
- all four Adventure Blueprints across KORT/VANLIG/STORT and all puzzle age bands,
- generator, scenario, world, encounter and climax validators,
- companion placement with owned friend + pet.

## Chromium browser evidence - GREEN
A real headless Chromium DOM/render smoke was executed against deterministic adventure seed `10` (`CRYSTAL_MACHINE`). Result: **23 PASS / 0 FAIL**.

Verified through actual app controls:
1. app starts and generic room investigation renders,
2. empty-room investigation does not imply hidden loot,
3. map navigation reaches a deterministic hidden-find room,
4. hidden item name is not visible before investigation,
5. search presents six physical D6 faces,
6. first physical 1 gives hint only,
7. second physical 1 reveals the find,
8. backpack can be filled through narrator item controls,
9. full backpack leaves the revealed find in the room,
10. physical 6 is stored exactly and changes neither HP nor progress,
11. final explicit `+ FREMGANG` removes/resolves the encounter,
12. `LØST MED GOD IDÉ` resolves through its own path,
13. `SPENNING` monster starts combat with 4 hearts,
14. final explicit heart removal ends combat,
15. a manually added normal monster in a `PUSTEROM` has 3 hearts and renders them.

## Reconstruction / provenance note
The indexed Library `index.html` could be materialized as text and already contained playtest layers 1-2. Repo patches 3-9 were applied sequentially. Adventure Code and UX4 compressed patches were recovered from Git blobs and decoded.

The resulting behavior reproduces the historical Adventure Code and UX4 test counts exactly. However, the Library text representation is not byte-identical to the original V0.12.3 manifest hash. This is a repository-health/provenance issue, not a currently observed runtime behavior failure.

## Required physical-device gate before UX5B / merge
Still required:
1. smoke-test on actual iPad/mobile,
2. confirm `SE DEG RUNDT` feels exploratory rather than mandatory,
3. confirm 3-4 progress steps do not feel like excessive bookkeeping,
4. verify hidden-find first-low / repeated-low interaction by touch,
5. verify full-backpack behavior by touch,
6. verify 3-heart normal and 4-heart `SPENNING` combat layout/tap targets,
7. verify final `+ FREMGANG`, final heart and `LØST MED GOD IDÉ` interaction cost,
8. if possible, load a representative old save with an active 2-heart fight and confirm remaining HP is preserved,
9. recheck Adventure Code iPad -> mobile copy/paste flow.

## Still manual / not certified
- whether each blueprint prerequisite feels narratively earned rather than mechanical,
- secret-door search clarity and fun on target device,
- novice-DM usefulness of the narrator plan,
- narrative quality of all four initial blueprints,
- mobile layout and touch ergonomics.

## Repository verification
Repository-health remains open. Before the next release checkpoint, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.

## V0.12.4 acceptance gate
For each of the seven pending item/key entities: stable resolver path, correct 64x64 / 32x32 RGBA item asset sizes, transparent 0/255 alpha, no embedded text/UI, recognizable thumbnail, no unintended schema/gameplay change, repo verification pass, and synchronized project memory.
