# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Last automated/browser-verified playtest layer: **UX5A searchable rooms + encounter state**
Current work item: **UX5A physical iPad/mobile playtest + repository-health repair before merge; UX5B remains next**

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

## UX5A implemented on branch
### Room investigation
- Every generated room gets an investigation state, so the UI does **not** identify loot rooms in advance.
- `SE DEG RUNDT` is available before the app reveals whether a hidden find exists.
- Optional hidden finds are deterministic and use the curated treasure/affordance bank.
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
- `LØST MED GOD IDÉ` is the explicit route for a genuinely decisive free-form solution.
- Physical encounter dice only record the exact die face and consequence suggestion; they never mutate hearts/progress themselves.

### Save compatibility
State schema remains 12. Re-enrichment is idempotent:
- room investigation/find state is retained,
- untouched legacy monsters can be upgraded to the new full 3/4-heart scale,
- an already-started legacy fight keeps its actual remaining hearts and is not healed,
- old generated non-treasure encounters receive a progress track when missing.

## UX5A verification status
Automated/runtime/browser verification is green on the reconstructed playtest runtime:
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 / 0**.
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 / 0**.
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 / 0**.
- `tests/QA_CONTENT_REGRESSION.js`: **5960 / 0**.
- 11 inline JavaScript blocks: **0 syntax errors**.
- Chromium UX5A smoke: **23 / 0**.

Chromium smoke verified empty-room investigation, hidden-find non-spoiling, repeated-low fail-forward, full-backpack preservation, exact physical die recording, dice/state separation, full progress resolution, direct smart-solution resolution, 4-heart `SPENNING` combat, zero-heart combat resolution and a 3-heart normal monster added in a `PUSTEROM`.

Reconstructed UX5A runtime SHA-256:
`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

Important distinction: the Library-materialized source is behaviorally verified but is not byte-proven identical to the original V0.12.3 manifest baseline. Repository-health / baseline provenance therefore remains open.

## Initial Adventure Blueprint bank
Only four are active:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Do not expand this bank until all four have been manually played and judged narratively strong.

## UX5B after UX5A device gate
The next encounter pass is the map-aware solution graph:
- narrator mode should show actual non-combat possibilities supported by this exact map,
- include useful possessed items plus discoverable NPCs, rooms, companions and other map resources,
- distinguish resources already possessed from resources that exist elsewhere,
- track attempted/failed approaches where useful,
- never turn suggestions into a closed solution list,
- preserve `FRITT KAST` and genuinely novel child solutions.

Do not begin UX5B until the physical iPad/mobile UX5A smoke has been recorded.

## Repository reality
Repository-health is still open. The complete active runtime/source/assets baseline is not present as ordinary directly usable files on `main`.

The indexed Library `index.html` can now be materialized as text and the active UX5A runtime can be reconstructed and tested. However, the original V0.12.3 release byte hash cannot be reproduced from that indexed text representation, and the complete runtime asset tree is still absent from normal repo files. Do not call the next release checkpoint locked until repository-health is closed.

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
Physically playtest UX5A on iPad/mobile. Focus on whether `SE DEG RUNDT` feels exploratory rather than mandatory and whether 3-4 encounter steps feel satisfying rather than like bookkeeping. Also verify the full-backpack and 3/4-heart flows on the target device. Record findings. If the device gate is green, merge UX5A to `main` and begin UX5B. Continue repository-health repair in parallel.
