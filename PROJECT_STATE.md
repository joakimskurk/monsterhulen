# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **Active playtest UX pass while repository-health repair remains open**

## What works
- Product name is Monsterhulen.
- Save schema is state 12.
- Canonical storage key is `monsterhulen_v120`; `eventyrkryper_v100` is the first legacy migration key.
- Physical Dice Result UX, 36-puzzle layer, rescue targets, NPC/friend/pet content, treasure/secret affordances and 12 lasting TING rewards are implemented in the V0.12.3 release baseline.
- 13 selectable start items, 10 active heroes and all 20 active monster families have runtime art in the V0.12.3 release baseline.

## Repository reality right now
- `main` contains durable project memory, playtest findings and reconstructable patch files for the active UX changes.
- `main` still does **not** contain the complete V0.12.3 runtime/source/assets snapshot as ordinary directly usable project files.
- Repository-health repair remains an open technical gate, but it does not block manual UX playtesting because every active code delta is preserved as a GitHub patch against the canonical V0.12.3 baseline.

## Active playtest implementation
Patch order against canonical V0.12.3:
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `patches/v0.12.3_playtest_dm_guide_dice_faces.patch`

Implemented for manual test:
- map is primary navigation surface,
- reachable unexplored exit shows tappable `?`,
- locked exit shows lock state,
- revealed adjacent room is tappable,
- old direction arrows remain fallback,
- FRITT KAST exists in narrator panel for arbitrary child actions,
- generated encounter/climax consequences are explicitly suggestions, not fixed outcomes,
- `BRUK` no longer consumes/removes ordinary bag items,
- `BRUK OPP / LEGG FRA` is the explicit removal action,
- scenario-critical items remain protected,
- VENN/PERSON/MONSTER encounters now explain what kind of scene the DM is looking at and when a roll is unnecessary,
- narrator panel includes a five-step beginner storytelling guide,
- dice input now uses six visual D6 faces with pips instead of range/outcome labels,
- exact die face is recorded while the existing low/mid/high consequence bands remain internal compatibility logic,
- die feedback is a short animation after selection only; the app still never rolls digitally.

## Verification status for active UX patches
- 11 inline JS blocks: 0 syntax errors.
- existing Thing, Treasure, Puzzle, NPC, Friend, Pet and Rescue runtime QA pass with no new failures.
- targeted map navigation logic: 3/3 PASS.
- existing `move()` function remains unchanged from V0.12.3.
- FRITT KAST contains no digital RNG.
- inventory handler inspection confirms only explicit drop/consume removes an item.
- die-face mapping is 1-2 -> low, 3-4 -> mid, 5-6 -> high internally; UI exposes six individual faces.
- real browser/mobile interaction is **not automated/certified** in the current execution environment and requires manual playtest.

## Still open from playtest
- determine whether the new map interaction is intuitive enough for a five-year-old,
- determine whether FRITT KAST and consequence wording make narrator freedom clear,
- determine whether the new beginner encounter guidance is sufficient for a novice DM,
- determine whether six die-face buttons are clear and comfortable on the target tablet/mobile layout,
- expand DM adventure plan/spoiler overview,
- design a versioned deterministic adventure code/seed contract for a second DM device.

## Incomplete content after UX/repo gates
Asset Batch 9 has 7 remaining item entities:
- `ITEM_WITCH_BROOM`
- `ITEM_SHOVEL`
- `SCENARIO_KEY_BONE`
- `SCENARIO_KEY_RUST`
- `SCENARIO_KEY_GLASS`
- `SCENARIO_KEY_FEATHER`
- `SCENARIO_KEY_ROOT`

Later roadmap batches remain: collection-part families + abilities, traps + mysteries, scenario goals/altars/finale, plus pending character art for NPC/friend/pet/rescue groups.

## Known blockers
- Repository-health baseline is not yet fully closed.
- Browser/mobile interaction QA must be performed manually for the active UX build.

## Do not regress
- Child proposes actions; the app must not become a closed action menu.
- No digital die roller. Physical 1D6; relevant `EKSTRA GOD PÅ` gives physical 2D6, use highest.
- Items/friends/pets are narrative affordances, not +1/bonus-die mechanics.
- Base hero identity, selected trait and equipped item remain independent.
- Stable entity IDs and save compatibility must be preserved.
- Do not rename internal Eventyr*/HulerCharacterSystem APIs merely for product naming cleanup.

## Exact next action
Manual-playtest the UX2 build, especially SOPPPRINSEN/other VENN encounters and the six die-face input. Record concrete child/DM findings in `PLAYTEST_FINDINGS.md`. If the novice-DM guidance and die-face interaction hold up, proceed to the expanded DM adventure plan and versioned adventure-code design before locking V0.12.4 content. Continue repository-health repair in parallel and close it before the next release checkpoint.
