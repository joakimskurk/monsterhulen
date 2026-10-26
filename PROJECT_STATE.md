# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Last fully runtime-verified playtest layer: **UX4 progression gates + secret-door discovery**
Current work item: **UX5A searchable rooms + encounter state candidate on `ux5/searchable-rooms-encounter-tracks`; full runtime QA pending**

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume. Story-critical elements are curated as Adventure Blueprints. Seeded variation is allowed only where it cannot break the story.

A finale must be earned, not merely discovered. Secret doors are hidden discoveries and may not bypass story progression.

Physical dice report uncertainty. A die result never automatically finishes a normal encounter, advances encounter progress or removes a monster heart.

## Active playtest patch chain on the UX5A branch
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
4. `patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
5. `patches/v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`
6. `patches/v0.12.3_playtest_searchable_rooms_encounter_engine_ux5a.patch`
7. `patches/v0.12.3_playtest_encounter_narrator_ux5a.patch`
8. `patches/v0.12.3_playtest_searchable_rooms_encounter_ui_ux5a.patch`
9. `patches/v0.12.3_playtest_searchable_rooms_encounter_render_ux5a.patch`

`patches/README.md` is the canonical patch-order/reconstruction note.

## UX5A candidate implemented on branch
### Room investigation
- Every generated room gets an investigation state, so the UI does **not** identify loot rooms in advance.
- `SE DEG RUNDT` is available before the app reveals whether the room contains a hidden find.
- Optional hidden finds are deterministic for a reconstructed adventure and use the existing curated treasure/affordance bank.
- Target find counts are 1 for KORT, 2 for VANLIG and 3 for STORT when enough eligible rooms exist.
- Hidden finds are never placed in start/finale/story-critical/ambient-treasure rooms.
- If an investigation discovers signs of a hidden find, uncertain searching uses the six physical D6 faces already used elsewhere.
- First 1-2 gives a stronger clue without revealing the find; a second low attempt fails forward and reveals it rather than creating a softlock.
- A revealed find remains in the room when the backpack is full.
- Hidden room finds are optional affordances and may never become scenario prerequisites.

### Encounter state
- Fresh normal monsters use 3 hearts; `SPENNING` monsters use 4.
- Generated non-treasure encounters use 3 progress steps; `SPENNING` uses 4.
- `+ FREMGANG` is a narrator action used only after the fiction actually changes.
- Filling the progress track explicitly resolves the encounter.
- Monster hearts appear only after the child chooses combat; reaching zero through the explicit heart control resolves combat.
- `LØST MED GOD IDÉ` remains the explicit escape hatch for a genuinely decisive free-form solution.
- Physical encounter dice only record the exact die face and consequence suggestion; they never mutate hearts/progress themselves.

### Save compatibility
State schema remains 12. Re-enrichment is designed to be idempotent:
- room investigation/find state is retained,
- untouched legacy monsters can be upgraded to the new full 3/4-heart scale,
- an already-started legacy fight keeps its actual remaining hearts and is not healed,
- old generated non-treasure encounters receive a progress track when missing.

## UX5A verification status
Verified now:
- the four UX5A unified diffs apply sequentially to a realistic source reconstruction with GNU `patch` and no rejected hunks,
- `git diff --check` passes on that reconstructed result,
- the obsolete monolithic UX5A candidate was removed so there is one branch source of truth,
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js` has been updated to cover all-room investigation, deterministic find placement, idempotent re-enrichment, legacy-combat migration, 3/4-step encounter state and dice/state separation.

Not yet verified:
- the UX5A QA has **not** been executed against the canonical reconstructed runtime,
- full existing regression has not been rerun after UX5A,
- browser/iPad interaction has not been tested.

Do not call UX5A locked or merge it to `main` until those gates pass.

## UX4 remains the last fully verified layer
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

## Initial Adventure Blueprint bank
Only four are active:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Do not expand this bank until all four have been manually played and judged narratively strong.

## UX5B after UX5A is verified
The next encounter pass is the map-aware solution graph:
- narrator mode should show actual non-combat possibilities supported by this exact map,
- include useful possessed items plus discoverable NPCs, rooms, companions and other map resources,
- distinguish resources already possessed from resources that exist elsewhere,
- track attempted/failed approaches where useful,
- never turn suggestions into a closed solution list,
- preserve `FRITT KAST` and genuinely novel child solutions.

Do not begin UX5B before UX5A runtime QA is green.

## Repository reality
Repository-health is still open. The complete active runtime/source/assets baseline is not present as ordinary directly usable files on `main`. A V0.12.3/UX playtest `index.html` is recoverable as indexed Library text, but the current connector cannot raw-materialize it into the execution environment. This prevents honest full runtime QA of the new patch chain from this chat.

## Do not regress
- Child proposes actions.
- No digital die roller.
- Relevant EKSTRA GOD PÅ is the only source of 2D6.
- Items/friends/pets are affordances, not numeric bonuses.
- Stable IDs and save compatibility remain important.
- Story quality beats procedural quantity.
- Finale gates are story prerequisites, not dice difficulty checks.
- Secret paths never bypass story-critical progression.
- Optional room finds never become hidden mandatory keys.
- The UI must not reveal which rooms contain optional finds before investigation.
- A lucky physical die result never auto-finishes a normal encounter.

## Exact next action
Obtain/reconstruct the canonical V0.12.3 runtime as raw files, apply patches 1-9, then run `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`, Adventure Code, UX4 progression QA and the full existing content regression. After that, manually smoke-test the search flow, full-backpack behavior, 3/4-heart combat and 3/4-step non-combat progress on iPad. Only then merge UX5A and begin UX5B.
