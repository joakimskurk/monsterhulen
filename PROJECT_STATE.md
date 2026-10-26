# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A patch 14 physical iPad/mobile retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction
Monsterhulen prioritizes coherent, memorable adventures over combinatorial volume. Child agency, explicit fictional purpose, real world effects, physical dice only for uncertainty, stable IDs/save compatibility and `SETUP -> SIGNAL -> ACTION -> PAYOFF` remain binding.

Intentional narrator improvisation is allowed only when explicitly scoped; critical state cannot depend on untracked improv. Subject identity is separate from Storylet role so recognizable figures can support several compatible authored functions without arbitrary mixing.

## New architecture captured from content review
The current target model is:

`SUBJECT -> ROLE -> REQUIREMENTS + PROVIDERS -> CHILD ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Examples driving this:
- Pannekakezombien / Den bortkomne zombien can block, grant item, reveal clue or provide other authored outcomes depending on Storylet,
- Skjelettdanseren can remain social/music-focused while still having different authored outcomes,
- Skjelettvakten establishes optional DM-started combat for compatible scenes,
- Sumptrollet establishes resource requirements with earlier provider guarantees,
- Brotrollet establishes variable authored requests whose selected dependency must be satisfied earlier.

## Resource Provider system
Initial provider families:
- `ROOM_FIND`,
- `MERCHANT_PURCHASE`,
- `TRADE`,
- `SOCIAL_BARGAIN`,
- `NPC_REWARD`,
- `PUZZLE_REWARD`,
- `SEARCH_SECRET`,
- explicitly allowed starting/owned resource.

Optional food/items may appear seeded/random in thematically suitable rooms. Critical resources may *look* naturally/randomly placed to the player, but at least one provider route must be reserved and validator-proven reachable before the consuming Storylet.

Merchant model:
- concrete coins, treasures, trade goods, favors or authored values are preferred over a large abstract currency system,
- merchants can also carry clue/favor/recurring-character roles,
- if merchant is a critical provider, its price/trade dependency must be reachable or another fail-forward/provider must exist.

Social bargain:
- child describes the argument first,
- DM triggers physical dice only if negotiation outcome is genuinely uncertain,
- trait-enabled 2D6 remains normal physical rule,
- low result fails forward to another price/favor/trade/route,
- no critical resource can be permanently locked behind one persuasion roll.

Critical provider invariant: every critical requirement has at least one guaranteed reachable acquisition route before it is needed, with no circular dependencies or gate-behind-itself placement.

## DM semantic controls
A plausible unlisted child solution can be accepted explicitly by DM while applying the same authored Storylet world effects. DM should not edit raw flags/inventory/map by hand.

Future DM Control Surface needs:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- merchant/trade info,
- `START KAMP` only when compatible,
- authored outcomes,
- player-view preview,
- action history/undo later.

NG4 must materialize the semantic metadata/provider hints/state transitions needed for this even before full UI polish.

## Optional combat module
Combat is not the default meaning of monster/vakt/guardian. Child may propose fighting; DM explicitly starts combat only for Storylets marked `combatAllowed`. Critical guardians normally retain at least one non-combat route. Combat presentation is child-friendly/non-graphic and can resolve via surrender, retreat, distraction, friendship etc.

## Future Multiscreen / Shared Session V1
Recorded roadmap capability, not active implementation:
- DM starts and owns authoritative live state,
- detached player view supports touch client/display-only,
- local Wi-Fi/LAN-first join via simple code/QR,
- player requests actions; host validates/broadcasts state,
- reconnect is idempotent,
- narrator-only data never leaks,
- DM sees player-view preview,
- undo uses reversible action/event history/snapshots and syncs corrected state,
- Adventure Code remains offline reconstruction/sharing, not live sync.

## UX5A runtime remains the gate
Latest runtime patches remain 11 explicit key, 12 single location, 13 encounter purpose, 14 explicit narrator improvisation.

Automated patch-14 evidence remains:
- explicit-improv **20/0**,
- encounter-purpose **4337/0**,
- authored-mysteries-only **3075/0**,
- single-location **19/0**,
- device **27/0**,
- search/encounter **2328/0**,
- Adventure Code **405/0**,
- UX4 **1797/0**,
- content **5830/0**,
- 11 scripts **0 syntax errors**.

Fresh browser QA and physical iPad/mobile retest remain open. UX5A is not merged.

## Narrative Graph V1 requirements added
NG1/NG2 must validate/model:
- subject/role compatibility,
- resource requirements and provider families,
- reachable provider chains before critical requirements,
- no circular provider dependencies,
- no critical single-roll softlocks,
- explicit outcomes/world effects,
- optional combat capability,
- prerequisite availability separate from child action completion,
- narrator-improv separate from tracked state.

`CRYSTAL_MACHINE` remains the only first conversion before NG8 acceptance.

## Sequencing
While UX5A is physically open:
- runtime fixes stay on `ux5/searchable-rooms-encounter-tracks`,
- continue editorial subject/role/provider/outcome review,
- prep stays documentation-only,
- do not implement Narrative Graph, DM Control Surface, UX5B or Multiscreen yet.

When UX5A is physical GREEN: record evidence -> regress -> merge to `main` -> verify -> create real `narrative/story-graph-v1` -> carry approved prep docs -> start NG1.

## Repository health
Byte-identical baseline/runtime asset reconstruction from ordinary repo files remains open debt.
