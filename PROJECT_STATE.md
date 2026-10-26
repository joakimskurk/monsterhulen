# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A patch 14 physical iPad/mobile retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Current product direction
Monsterhulen prioritizes coherent, memorable adventures over combinatorial volume.

Binding rules:
- child proposes actions; app does not silently apply known solutions,
- one physical room has one visible canonical name,
- encounter mechanics require `purpose`, `stakes`, `resolvedWhen`, `payoff` and real world effects,
- generic filler progress is forbidden,
- puzzles require authored contextual purpose,
- intentional narrator improvisation is explicitly labelled/scoped,
- critical state cannot depend on untracked improv,
- physical dice report uncertainty and do not replace unmet prerequisites,
- stable IDs/save compatibility remain binding,
- critical story uses `SETUP -> SIGNAL -> ACTION -> PAYOFF`.

## New encounter/story architecture from editorial review
The content review now establishes the intended model:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> CHILD ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

### Subject vs role
Recognizable subjects are reusable identities, not fixed mechanics. Examples: Pannekakezombien, Den bortkomne zombien, Skjelettdanseren, Skjelettvakten, Sumptrollet, Brotrollet, Boka som skriver tilbake.

A subject may support several **pre-authored compatible** roles such as `BLOCK_PATH`, `NPC_FAVOR`, `TRADE`, `GUARDIAN`, `CLUE_SOURCE`, `PUZZLE_CARRIER`, `ITEM_HOLDER`, `OPTIONAL_IMPROV`, `RESCUE`, `PAYOFF_CHARACTER`.

This is curated reuse, not arbitrary combinatorial mixing. Subject ID and Storylet ID remain separate/stable.

### Outcomes
A subject can produce different authored outcomes in different Storylets, for example:
- unblock route,
- grant optional item,
- grant critical resource,
- reveal clue/location/puzzle rule,
- become friend,
- open gate,
- change relationship state.

Pannekakezombien may therefore block a door in one adventure, give an item in another, or reveal information elsewhere. The outcome must be explicit and tracked if critical.

### Resource Provider system
Requirements no longer imply one hardcoded item placement. They are satisfied through compatible provider routes.

Initial providers:
- `ROOM_FIND`,
- `MERCHANT_PURCHASE`,
- `TRADE`,
- `SOCIAL_BARGAIN`,
- `NPC_REWARD`,
- `PUZZLE_REWARD`,
- `SEARCH_SECRET`,
- explicitly allowed starting/owned resource.

Food/items may appear seeded/semi-random in rooms when thematically plausible. Optional resources can be genuinely random. If a resource is critical, at least one provider route must be reserved and validator-proven reachable before the consuming Storylet. It may still *look* like a natural random find to the player.

Merchant provider rules:
- seller may take concrete coins, treasures, trade goods, favor or other authored value,
- prefer fiction-rich concrete values over large abstract currency unless later design needs otherwise,
- merchant can also be clue/favor/recurring NPC,
- if merchant is critical provider, price/trade dependency must itself be reachable or another fail-forward/provider must exist.

Social bargaining:
- child describes what they say/do first,
- DM may trigger `FORHANDLE / USIKKERT FORSØK` only if outcome is actually uncertain,
- use physical D6 / trait-enabled physical 2D6,
- low results fail forward to higher price, small favor, alternative trade or another route,
- no critical resource may be permanently lost behind one persuasion roll.

Reference rule: if `SUMPTROLLET` requires `FOOD`, generation binds a provider plan before placement and validates at least one reachable route before the troll gate. `BROTROLLET` may randomize among authored wanted-object variants, but the chosen request fixes its dependency and provider needs before map materialization.

### Alternative child solutions
Authored approaches are affordances, not a closed answer list. DM will need a semantic action such as `GODTA LØSNING` / `OPPGAVEN ER LØST` to accept a plausible unlisted solution while applying the Storylet's normal authored world effects. DM should not edit raw flags/inventory/map by hand.

### Optional combat module
Skjelettvakten establishes combat as an optional resolution module:
- monster/vakt/guardian does not automatically mean combat,
- child may propose fighting,
- DM explicitly starts combat only for Storylets with `combatAllowed`,
- critical guardians normally retain a non-combat route,
- presentation is child-friendly/non-graphic,
- combat may resolve through surrender, retreat, distraction, friendship etc., not a required kill state.

## DM Control Surface V1 - future package with NG4 prerequisites
Roadmap now includes a dedicated DM control surface. It should show in human language:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`

It should support:
- authored state vs narrator-improv distinction,
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- merchant/trade information,
- `START KAMP` only where allowed,
- authored outcome controls,
- player-view preview,
- action history and later undo.

NG4 must already materialize the necessary narrator/DM metadata, provider information and safe state transitions even though the polished control surface comes later.

## Future Multiscreen / Shared Session V1
Recorded future capability, not current implementation work:
- DM always starts and owns authoritative live state,
- player view can detach to touch client or display-only screen,
- same-Wi-Fi/LAN-first join via simple code/QR,
- client requests actions; host validates/broadcasts state,
- reconnect is idempotent,
- narrator-only data never leaks,
- DM sees player-view preview/status,
- `ANGRE SISTE HANDLING` uses reversible action/event history or snapshots and re-syncs corrected state,
- Adventure Code remains offline reconstruction/sharing, not live sync.

Do not implement this before the story/world action model is stable.

## Active UX5A runtime
Patch order remains canonical in `patches/README.md`.

Latest patches:
- patch 11 explicit story-key use,
- patch 12 single visible location identity,
- patch 13 encounter purpose contract,
- patch 14 explicit narrator improvisation.

Patch 14 reference behavior: `BOKA SOM SKRIVER TILBAKE` narrator view explicitly says the missing message is intentional Forteller-improv, there is `INGEN SKJULT FASIT`, and optional improv cannot create mandatory story state.

## UX5A automated verification after patch 14
- explicit-improvisation QA: **20 / 0**,
- encounter-purpose QA: **4337 / 0**,
- authored-mysteries-only QA: **3075 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2328 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5830 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-14 behavioral reconstruction SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

These are behavioral reconstruction artifacts, not byte-identical release provenance.

Fresh current browser QA remains pending. Historical Chromium results do not certify patches 11-14. Physical iPad/mobile retest remains required.

## Physical UX5A gate
At minimum verify:
1. `BOKA SOM SKRIVER TILBAKE` clearly communicates authored-vs-improv responsibility,
2. improv prompt is useful without inventing mandatory story state,
3. `REGNBUENETTET` has real obstacle/payoff behavior and no generic boxes,
4. active trap blocks forward and allows retreat; resolution opens route,
5. ambient mysteries have no disconnected random puzzles,
6. one visible room identity remains clear,
7. explicit key flow remains child-driven,
8. search/full-backpack/combat/device ergonomics remain green.

Do not merge UX5A until this gate is green.

## Narrative Graph V1 implications
NG1/NG2 must model and validate:
- subject/role compatibility,
- resources and provider families,
- reachable provider chains before critical requirements,
- no circular provider dependencies,
- no critical single-roll softlocks,
- explicit outcomes/world effects,
- optional combat capability,
- action completion separate from prerequisite availability,
- narrator-improv separate from tracked critical state.

NG4 must expose enough semantic metadata for DM to understand and resolve scenes without reverse-engineering generator logic.

`CRYSTAL_MACHINE` remains the first and only blueprint conversion before NG8 acceptance.

## UX5B / repository health
UX5B remains deferred until Narrative Graph V1 is proven.

Repository-health remains open: complete byte-identical runtime/source/assets are not yet reconstructable from ordinary repo files.

## Exact next action
While physical UX5A testing is open:
- patch UX5A defects only,
- continue patch-14 physical playtest,
- continue editorial subject/role/provider/outcome review,
- keep Narrative Graph runtime blocked,
- do not implement DM Control Surface, UX5B or Multiscreen yet.

When UX5A is physical GREEN:
1. record physical evidence,
2. confirm relevant automated/browser regression,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged `main`,
6. carry approved prep docs,
7. start NG1 graph data model + validator.
