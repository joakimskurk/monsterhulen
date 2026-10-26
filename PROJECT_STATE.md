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
- Repository-health repair therefore remains an open technical gate, but it no longer blocks manual UX playtesting because every code delta is preserved as a GitHub patch against the canonical V0.12.3 baseline.

## Active playtest implementation
Patch order against canonical V0.12.3:
1. `patches/v0.12.3_playtest_map_navigation.patch`
2. `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`

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
- scenario-critical items remain protected.

## Verification status for active UX patches
- 11 inline JS blocks: 0 syntax errors.
- targeted map navigation logic: 3/3 PASS.
- existing `move()` function is byte-identical to V0.12.3.
- FRITT KAST uses existing physical dice bands and no digital RNG.
- inventory handler inspection confirms only explicit drop/consume removes an item.
- real browser/mobile interaction is **not automated/certified** in the current execution environment and requires manual playtest.

## Still open from playtest
- determine whether the new map interaction is intuitive enough for a five-year-old,
- determine whether FRITT KAST and consequence wording make narrator freedom clear,
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
Manual-playtest the UX1 build. Record concrete child/DM findings in `PLAYTEST_FINDINGS.md`. If the map/free-roll/inventory model holds up, implement the expanded DM plan plus a versioned adventure-code design before locking V0.12.4 content. Continue repository-health repair in parallel and close it before the next release checkpoint.
