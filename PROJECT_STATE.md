# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-23
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **Repository health repair, then V0.12.4 remaining narrator/start equipment + scenario keys (7 assets)**

## What works
- Product name is Monsterhulen.
- Save schema is state 12.
- Canonical storage key is `monsterhulen_v120`; `eventyrkryper_v100` is the first legacy migration key.
- Physical Dice Result UX, 36-puzzle layer, rescue targets, NPC/friend/pet content, treasure/secret affordances and 12 lasting TING rewards are implemented in the V0.12.3 release baseline.
- 13 selectable start items, 10 active heroes and all 20 active monster families have runtime art in the V0.12.3 release baseline.

## Repository reality right now
- `main` currently contains project/status manifests but **does not yet contain the full V0.12.3 runtime source and assets**.
- This contradicts older status text that called the repo complete. Treat that older claim as superseded.
- The repository repair is therefore the current blocking work package before further implementation.

## Incomplete after repository repair
Asset Batch 9 has 7 remaining item entities:
- `ITEM_WITCH_BROOM`
- `ITEM_SHOVEL`
- `SCENARIO_KEY_BONE`
- `SCENARIO_KEY_RUST`
- `SCENARIO_KEY_GLASS`
- `SCENARIO_KEY_FEATHER`
- `SCENARIO_KEY_ROOT`

Later roadmap batches remain: collection-part families + abilities, traps + mysteries, scenario goals/altars/finale, plus pending character art for NPC/friend/pet/rescue groups.

## Known bugs / blockers
- Current blocker: GitHub `main` must be made self-contained before code/art work continues.
- Full current browser/mobile interaction QA has not been rerun for V0.12.3.
- No known gameplay blocker is documented for V0.12.4.

## Verification status
- Historical V0.12.3 automated results exist in the release test report and must be imported with the source baseline.
- Current GitHub tree verification on 2026-10-23 showed only the small project/status set, not full runtime.
- Browser/mobile interaction: not rerun for V0.12.3.
- Physical device testing: not certified for V0.12.3.

## Do not regress
- Child proposes actions; the app must not become a closed action menu.
- No digital die roller. Physical 1D6; relevant `EKSTRA GOD PÅ` gives physical 2D6, use highest.
- Items/friends/pets are narrative affordances, not +1/bonus-die mechanics.
- Base hero identity, selected trait and equipped item remain independent.
- Stable entity IDs and save compatibility must be preserved.
- Do not rename internal Eventyr*/HulerCharacterSystem APIs merely for product naming cleanup.

## Exact next action
Complete the repository health baseline by importing the canonical V0.12.3 runtime/source/spec/test snapshot into GitHub and verifying that a new chat can reconstruct it. Then start V0.12.4 by auditing and producing the seven pending item/key assets.
