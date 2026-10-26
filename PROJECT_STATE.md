# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Active runtime branch: `ux5/searchable-rooms-encounter-tracks`
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **UX5A patch 14 physical iPad/mobile retest before merge**
Prep branch: `narrative/story-graph-v1-prep`
Next architecture after green UX5A: **Narrative Graph V1, starting only with `CRYSTAL_MACHINE`**

## Current gate
UX5A patch 14 is automated green but not freshly browser-certified and not physically green yet.

Do not merge UX5A or implement Narrative Graph runtime until physical gate is green.

While gate is open:
- patch UX5A defects only on this branch,
- editorial content review may continue as documentation,
- do not implement full DM Control Surface, UX5B or Multiscreen.

## Runtime patch chain
Latest layers:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance.

Patch 14 reference: `BOKA SOM SKRIVER TILBAKE` tells narrator that missing message is intentional improv, `INGEN SKJULT FASIT`, and optional improv cannot create mandatory story state.

## Automated evidence after patch 14
- explicit-improv **20/0**
- encounter-purpose **4337/0**
- authored-mysteries-only **3075/0**
- single-location **19/0**
- targeted device **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- 11 scripts **0 syntax errors**

Patch-14 behavioral reconstruction SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

These are behavioral reconstruction artifacts, not byte-identical release provenance.

Historical Chromium results do not certify patches 11-14. Fresh current browser QA remains pending.

## Physical UX5A gate
At minimum verify:
1. `BOKA SOM SKRIVER TILBAKE` clearly communicates authored-vs-improv responsibility,
2. improv prompt helps without creating hidden mandatory state,
3. `REGNBUENETTET` has real obstacle/payoff behavior and no generic boxes,
4. active trap blocks forward and allows retreat; resolution opens route,
5. ambient mysteries have no disconnected random puzzles,
6. one visible room identity remains clear,
7. explicit key flow remains child-driven,
8. search/full-backpack/combat/device ergonomics remain green,
9. Adventure Code flow remains usable.

## Binding product direction
- story quality beats combinatorial volume,
- child proposes actions; app does not silently apply owned solutions,
- one physical room has one visible identity,
- interactive mechanics require purpose/stakes/resolution/payoff/world effects,
- no generic filler progress,
- puzzles need authored contextual role,
- narrator improvisation is explicit/scoped,
- critical state never depends on untracked improv,
- physical dice report uncertainty only,
- stable IDs/save compatibility remain binding,
- critical story uses `SETUP -> SIGNAL -> ACTION -> PAYOFF`.

## Consolidated next architecture
Detailed canonical plan is on prep branch:
`docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`

Target chain:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- dramatic phase/expiry,
- interaction shell/popup,
- typed validated state transition,
- later action history/undo/shared-session sync.

### Subject != role
Recognizable subjects are reusable identities, not fixed mechanics.

Reviewed examples:
- Pannekakezombien,
- Den bortkomne zombien,
- Skjelettdanseren,
- Skjelettvakten,
- Sumptrollet,
- Brotrollet,
- Boka som skriver tilbake.

Candidate sibling subjects such as Den snakkende dukken / Det levende bildet are editorial candidates only, not active-bank additions.

### Outcomes vary by authored Storylet
Possible families include:
- unblock route,
- grant optional item,
- grant critical resource,
- reveal clue/location/puzzle rule,
- become friend,
- open gate,
- change relationship state.

Pannekakezombien may block a door in one Storylet, give an item in another, or reveal information elsewhere. Critical outcomes are explicit/tracked.

## Resource provider system
Requirement and acquisition route are separate graph concepts.

Initial providers:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- explicit allowed starting/owned resource.

Optional resources may be genuinely variable when thematic.

Critical resources require at least one reserved, validator-proven reachable provider before consumption. A critical room-find may still look incidental/random to player, but story cannot depend on lucky spawn.

Merchant model:
- concrete coins/valuables/trade goods/favors preferred over large abstract numerical economy,
- merchant may also be clue/favor/recurring NPC,
- critical merchant price/trade dependency must itself be reachable or fail-forward/alternate provider exists.

Social bargain:
- child describes what they say/do first,
- DM triggers `FORHANDLE / USIKKERT FORSØK` only when outcome is genuinely uncertain,
- physical D6 / trait-enabled 2D6,
- low result fail-forwards,
- no critical resource permanently locked behind one persuasion roll.

Reference: if `SUMPTROLLET` requires `FOOD`, provider plan is bound/validated before troll gate. `BROTROLLET` may randomize among authored requested-object variants, but selected request fixes dependency/provider before map materialization.

## Alternative child solutions
Authored approaches are affordances, not closed answers.

DM needs semantic `GODTA LØSNING` / uncertainty flow applying the same canonical Storylet world effects. DM should not hand-edit raw flags/inventory/map.

## Optional combat
Skjelettvakten establishes combat as optional Storylet capability:
- no automatic combat from monster/vakt/guardian identity,
- child may propose fighting,
- DM explicitly starts only if `combatAllowed`,
- critical guardians normally retain non-combat route,
- child-friendly/non-graphic presentation,
- surrender/retreat/distraction/friendship/escape can resolve encounter.

## Planned interaction shells / popups
Canonical spec on prep branch:
`docs/INTERACTION_SHELLS_V1.md`

Initial shells:
- `SLOT_GATE / ASSEMBLY`
- `LOCKED_OBJECT`
- `NPC_DIALOGUE_FAVOR`
- `MERCHANT_TRADE`
- `PUZZLE`
- `COMBAT`
- `REWARD_CHOICE`
- `SEARCH_INSPECT`

Shell is presentation + typed action submission; Storylet owns hidden logic.

### Three-color gate reference
For red/blue/yellow stones:
- story reveals sockets before shell shows them,
- child taps target,
- popup shows three slots,
- owned stones never auto-fill,
- child explicitly places items,
- wrong item is not consumed,
- partial placement persists,
- full placement resolves or enables authored activation,
- world effect opens/activates target,
- future undo restores target + inventory atomically.

This directly generalizes the existing “possessing solution != performing action” rule.

## DM Control Surface direction
DM pane should show:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- `HVA ER SKREVET?`
- `HVA KAN JEG IMPROVISERE?`

Semantic controls:
- `GODTA LØSNING`
- `FORHANDLE / USIKKERT FORSØK`
- physical die recording
- `START KAMP` where allowed
- authored outcome application
- merchant/trade context
- player-view preview
- later action history + `ANGRE SISTE HANDLING`

NG4 must include a minimal semantic DM layer sufficient to test Narrative Graph. Full DM Control Surface V1 polish is planned after NG8 if accepted and currently before UX5B.

## Canonical action/state direction
Narrative Graph, DM controls, undo and future shared sessions should converge on typed validated state transitions with stable action IDs.

Conceptual fields:
`actionId`, `sequence`, `actor`, `type`, `targetId`, `payload`, `preconditions[]`, `effects[]`, `undoPolicy`, `resultRevision`.

Benefits:
- safe undo,
- idempotency,
- reconnect,
- deterministic tests,
- fewer ad-hoc mutations.

## Future Multiscreen / Shared Session V1
Recorded only, not active:
- DM always starts/hosts authoritative state,
- detached player view can be touch client or display-only,
- same-Wi-Fi/LAN-first join via short code/QR,
- client requests actions; host validates/applies/broadcasts,
- reconnect/idempotency,
- narrator-only data never leaks,
- DM player-view preview,
- action history + undo re-sync corrected state.

Adventure Code remains offline reconstruction/sharing, not live sync.

## Open-source survey
Canonical prep note:
`docs/OPEN_SOURCE_SURVEY_2026-10-26.md`

No dependency adopted.

Study-only candidates:
- boardgame.io for reducer/log/undo/state patterns,
- Colyseus for authoritative sync/reconnect,
- rot.js for roguelike algorithms,
- Epoch Mapper for structured events/quests/interaction/standalone patterns.

Do not import a generic dungeon/game framework before a later explicit ADR/spike.

## Updated future sequence after UX5A
1. Narrative Graph V1 / NG0-NG8.
2. If accepted: DM Control Surface V1 polish + action history/undo foundation.
3. UX5B consuming accepted graph state.
4. Additional blueprints one at a time after editorial gates.
5. Multiscreen / Shared Session V1 once action/state model is stable.

This supersedes earlier assumption that UX5B automatically precedes DM control polish.

## Narrative Graph work packages
- NG0 specs/docs - complete/updated on prep.
- NG1 graph + provider + typed transition model/validator.
- NG2 Storylet Matrix/provider engine.
- NG3 Crystal Machine planner.
- NG4 room materialization + narrator knowledge + minimal DM controls + required interaction shells.
- NG5 >=1000 automated graph/state cases.
- NG6 real browser/touch QA.
- NG7 10-20 manual editorial/family playtests.
- NG8 accept/revise/abandon.

No second blueprint before NG8.

## Content review continuation
Canonical prep handoff:
`docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`

Reviewed through `BROTROLLET`.

Next subject: **DEN LEVENDE RUSTNINGEN**.

Do not expand Adventure Blueprint bank.

Active blueprint bank remains:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

## Repository health
Still open. Complete runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone.

## Exact next action
While UX5A physical testing is open:
- continue patch-14 physical retest,
- patch UX5A defects only,
- continue editorial review as documentation if desired,
- keep Narrative Graph runtime blocked,
- do not implement full DM Control Surface, UX5B or Multiscreen.

When UX5A is physical GREEN:
1. record physical evidence,
2. confirm relevant automated + fresh browser regression,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start NG1.
