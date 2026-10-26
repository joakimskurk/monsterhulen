# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Last fully runtime-verified playtest layer: **UX4 progression gates + secret-door discovery**
Current work item: **UX5A searchable rooms + encounter state candidate; runtime QA pending, repository-health repair still open**

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume. Story-critical elements are curated as Adventure Blueprints. Seeded variation is allowed only where it cannot break the story.

A finale must be earned, not merely discovered. Secret doors are hidden discoveries and may not bypass story progression.

Physical dice record uncertainty. A die result never automatically finishes a normal encounter.

## Active playtest patch chain
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`
4. `patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
5. `patches/v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`
6. **candidate:** `patches/v0.12.3_playtest_search_progress_ux5a.patch.gz.b64`

`patches/README.md` documents reconstruction of compressed patch files.

## UX5A candidate
The UX5A patch adds the first explicit encounter-state layer without changing state schema 12:

- all rooms can be deliberately investigated without revealing in advance whether loot exists,
- a standard 13-room adventure deterministically places two optional curated room finds,
- room finds reuse the curated treasure/affordance bank and are never scenario prerequisites,
- critical rooms, start/finale rooms and rooms already containing ambient treasure are excluded from hidden room-find placement,
- uncertain hidden-item search records the real physical D6 face,
- 1-2 is fail-forward and gives a stronger search cue without revealing the item,
- 3-6 reveals the optional find,
- a full backpack never destroys a revealed find; it remains in the room,
- new untouched monster encounters use 3 hearts, or 4 in `SPENNING`,
- generated non-treasure encounters use an explicit 3-step progress track, or 4 in `SPENNING`,
- physical encounter dice only record the outcome/consequence; they do not advance or remove the encounter,
- narrator explicitly records `+ FREMGANG` after a meaningful step,
- a genuinely decisive plan can be marked `LØST MED GOD IDÉ`,
- zero monster hearts resolves the encounter through explicit combat state,
- migration upgrades untouched legacy monsters but does not heal an already-started legacy fight.

## UX5A verification status
Verified now:
- `tests/QA_SEARCH_PROGRESS_UX5A.js` parses with `node --check`,
- isolated algorithm test passes for deterministic optional-find placement, 3/4-step progress and legacy-combat preservation,
- UX5A unified patch round-trips byte-identically through gzip/base64,
- patch SHA-256 (uncompressed): `454c0d2f9114ea1029717b3a283fe8729a481b3721c287bf1207d86b7f02ae8f`,
- encoded artifact SHA-256: `a93972a2a99b2a37e6c52ded68160892cb585a8d798a520341452712ebd64e81`.

Not yet verified:
- full UX5A runtime QA against a reconstructed UX4 `index.html`,
- full existing regression suite after UX5A,
- browser/iPad interaction.

Do not call UX5A locked until those runtime checks pass.

## UX4 remains verified
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
- narrator mode should show actual non-combat solutions supported by this exact map,
- include useful items, NPCs, rooms, companions and already-discovered resources,
- distinguish resources already possessed from resources that exist elsewhere,
- track attempted/failed approaches where useful,
- never turn suggestions into a closed solution list,
- preserve `FRITT KAST` and genuinely novel child solutions.

Do not begin UX5B before UX5A runtime QA is green.

## Repository reality
`main` contains durable project memory, QA and reconstructable playtest patches, but repository-health is still not fully closed. The full active runtime/source/assets baseline is not yet present as ordinary directly usable project files.

A complete `Monsterhulen_PLAYTEST_UX4_PROGRESSION.html` and ZIP are known to exist in the project Library, but the current connector cannot materialize their raw bytes into this execution environment. That does not satisfy the repository-health gate.

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
- A lucky physical die result never auto-finishes a normal encounter.

## Exact next action
Reconstruct/apply the six-patch chain to the canonical V0.12.3 runtime, run `tests/QA_SEARCH_PROGRESS_UX5A.js` plus the full existing regression suite, then manually smoke-test room search, full-backpack behavior, 3/4-heart combat and non-combat progress. Only after those checks are green may UX5A be marked verified and UX5B begin.
