# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Branch: `narrative/story-graph-v1-prep`
Status: **PREP / DOCUMENTATION ONLY**
Active runtime branch: `ux5/searchable-rooms-encounter-tracks`
Current runtime work item: **UX5A patch 14 physical iPad/mobile retest before merge**
Next runtime architecture after green UX5A: **Narrative Graph V1, starting only with `CRYSTAL_MACHINE`**

## Do not implement from prep yet
UX5A is not physically green/merged. Narrative Graph runtime, full DM Control Surface, UX5B and Multiscreen remain blocked.

When UX5A becomes green:
1. record physical evidence,
2. rerun/confirm relevant automated + current browser QA,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start WP-NG1.

## Current product direction
Monsterhulen prioritizes coherent child-led tabletop stories over procedural volume.

Binding principles:
- child proposes actions,
- app does not silently apply owned solutions,
- one physical room has one visible identity,
- encounter mechanics need purpose/stakes/resolution/payoff/world effects,
- no generic filler progress,
- puzzles need authored contextual role,
- narrator improv is explicit/scoped,
- critical state never depends on untracked improv,
- physical dice report uncertainty only,
- stable IDs/save compatibility remain binding,
- critical story uses `SETUP -> SIGNAL -> ACTION -> PAYOFF`.

## Consolidated new architecture
Canonical latest plan:
`docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`

Target chain:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- dramatic phases/expiry,
- interaction shell/popup,
- typed validated state transitions,
- later action history/undo/shared-session sync.

### Subject/role separation
A recognizable subject may support several pre-authored compatible roles without arbitrary random mixing.

Reference subjects from review:
- Pannekakezombien,
- Den bortkomne zombien,
- Skjelettdanseren,
- Skjelettvakten,
- Sumptrollet,
- Brotrollet,
- Boka som skriver tilbake.

Candidate sibling subjects such as Den snakkende dukken / Det levende bildet are editorial candidates only, not active-bank additions.

### Resource provider system
Requirements and acquisition routes are separate graph concepts.

Initial providers:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- explicit allowed starting/owned resource.

Optional resources may be genuinely random when thematic.

Critical resource requires at least one reserved, validator-proven reachable route before consumption. It can still look like a natural random find to the player.

Merchant may accept concrete coins/valuables/trade goods/favors rather than requiring a large abstract currency economy.

Social bargain:
- child speaks/acts first,
- DM triggers physical die only when genuinely uncertain,
- low result fails forward,
- no critical single-roll softlock.

### Alternative child solutions
Authored approaches are affordances, not closed answers.

DM needs semantic acceptance (`GODTA LØSNING`) or uncertainty flow, applying canonical Storylet world effects rather than manually editing flags.

### Optional combat
Combat is a Storylet capability:
- only if `combatAllowed`,
- child may propose,
- DM explicitly starts,
- critical guardians normally retain non-combat route,
- child-friendly/non-graphic,
- surrender/retreat/distraction/friendship/escape are valid endings.

## Planned interaction shells/popups
Canonical spec:
`docs/INTERACTION_SHELLS_V1.md`

Initial shell families:
- slot gate / assembly,
- locked object / explicit item use,
- NPC favor/dialogue,
- merchant/trade,
- puzzle,
- combat,
- reward choice,
- search/inspect.

Reference three-color gate:
- reveal sockets first,
- child taps target,
- three slots shown,
- owned items never auto-fill,
- explicit placement one item at a time,
- wrong item not consumed,
- partial placement persists,
- full placement resolves or enables authored activation,
- world effect opens/activates target,
- future undo restores target + inventory atomically.

Interaction shell presents state; Storylet defines story logic.

## DM Control Surface direction
DM should see:
- what scene is,
- what it requires,
- where requirement can be obtained,
- what can happen,
- when resolved,
- what changes after,
- what is authored vs improvisable.

Semantic controls:
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- physical die recording,
- `START KAMP` where allowed,
- authored outcome application,
- player-view preview,
- later action history + undo.

NG4 must provide a minimal usable semantic DM layer for Narrative Graph testing. Full DM Control Surface V1 polish should follow NG8 if architecture accepted, currently before UX5B.

## Canonical action/state direction
Narrative Graph, DM controls, undo and future shared session should converge on typed validated transitions with stable action IDs.

This supports:
- safe undo,
- idempotency,
- reconnect,
- deterministic tests,
- fewer ad-hoc mutations.

NG1 defines the boundary; full history/undo comes later.

## Future Multiscreen / Shared Session V1
Recorded, not active:
- DM always hosts authoritative state,
- detached player view can be touch client or display-only,
- LAN/same-Wi-Fi first,
- short code/QR join,
- client requests actions; host validates/applies/broadcasts,
- reconnect/idempotency,
- no narrator-only leakage,
- DM player-view preview,
- undo/action history re-sync corrected state.

Adventure Code remains offline reconstruction/sharing, not live sync.

## Open-source survey
Canonical note:
`docs/OPEN_SOURCE_SURVEY_2026-10-26.md`

No dependency adopted.

Study-only candidates:
- boardgame.io for state reducer/log/undo patterns,
- Colyseus for authoritative sync/reconnect,
- rot.js for roguelike algorithms,
- Epoch Mapper for structured event/quest/interaction/standalone ideas.

No framework should be imported before a later explicit ADR/spike.

## Current UX5A evidence
Patch 14 automated evidence remains:
- explicit-improv **20/0**
- encounter-purpose **4337/0**
- authored-mysteries-only **3075/0**
- single-location **19/0**
- targeted device **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- 11 inline scripts **0 syntax errors**

Fresh current browser QA remains pending. Physical iPad/mobile retest remains required. Historical browser results do not certify patches 11-14.

## Narrative Graph work packages
- NG0: specs/docs - complete/updated on prep.
- NG1: graph + provider + typed transition model/validator.
- NG2: Storylet Matrix/provider engine.
- NG3: Crystal Machine planner.
- NG4: room materialization + narrator knowledge + minimal DM controls + required interaction shells.
- NG5: >=1000 automated graph/state cases.
- NG6: real browser/touch QA.
- NG7: 10-20 manual editorial/family playtests.
- NG8: accept/revise/abandon gate.

No second blueprint before NG8.

If accepted, current preferred later order:
1. DM Control Surface V1 polish + action history/undo foundation,
2. UX5B,
3. additional blueprints one at a time,
4. Multiscreen / Shared Session V1 when state model stable.

## Content review continuation
Canonical handoff:
`docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`

Reviewed through `BROTROLLET`.

Next subject in fresh chat: **DEN LEVENDE RUSTNINGEN**.

Do not expand Adventure Blueprint bank during review.

Active blueprint bank remains:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

## Repository health
Still open. Complete runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone. Do not call a release checkpoint locked until this is closed.

## Exact next action
While UX5A physical test is open:
- continue physical patch-14 retest,
- fix UX5A defects only on runtime branch,
- editorial subject/role/provider/outcome review may continue as docs,
- do not implement Narrative Graph runtime,
- do not implement full DM Control Surface, UX5B or Multiscreen.
