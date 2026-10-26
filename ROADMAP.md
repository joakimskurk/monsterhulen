# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A PATCH 14 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREP UPDATED

## LÅSTE PRODUKTPRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter og tolker, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Encounter-mekanikk krever `purpose`, `stakes`, `resolvedWhen`, `payoff` og reelle world effects.
- Ingen generiske fremgangsruter uten skrevne meningsfulle steg.
- Puzzles må ha skrevet funksjon i scenen.
- Forteller-improvisasjon er lov, men må være eksplisitt merket/scopet.
- Critical story-state kan ikke avhenge av untracked improvisasjon.
- Subject, Storylet-role, requirements, provider routes, outcomes og interaction shell er separate lag.
- Kritisk historie bygges fra Adventure Blueprint + Narrative Graph + kuraterte Storylets.
- Kritiske mål bruker `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Story-critical beats har timing/expiry.
- Fysisk terning brukes ved reell usikkerhet; appen ruller aldri digitalt.
- Terningresultat erstatter aldri unmet prerequisite.
- Ting/venner/kjæledyr er affordances, ikke tallbonuser.
- Stable IDs/save compatibility beholdes.
- GitHub er permanent source of truth.

## CURRENT ACTIVE GATE - UX5A
Patch 11: explicit story-key use.
Patch 12: one visible location identity.
Patch 13: encounter purpose/world-effect contract + authored-progress-only + real trap blocking + no random ambient puzzle attachment.
Patch 14: explicit narrator improvisation.

Automated patch-14 evidence:
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

Fresh current browser QA and physical target-device retest remain pending.

**Do not merge UX5A until physical gate is green.**

While UX5A is open:
- patch UX5A defects only on this branch,
- content/editorial review may continue as documentation,
- do not implement Narrative Graph runtime,
- do not implement full DM Control Surface, UX5B or Multiscreen.

## CANONICAL NEXT ARCHITECTURE
Detailed prep lives on `narrative/story-graph-v1-prep`.

Read:
- `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/INTERACTION_SHELLS_V1.md`
- `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
- `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`

Target model:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- dramatic phase/expiry,
- interaction shell/popup,
- typed canonical state transition,
- later action history/undo/shared-session sync.

## SUBJECT / ROLE / OUTCOME
A recognizable subject is presentation/identity, not one fixed mechanic.

Examples from review:
- Pannekakezombien may block route, grant item, reveal clue or puzzle-rule in different authored Storylets.
- Den bortkomne zombien uses same architecture with route/help/follow-clue fiction.
- Skjelettdanseren can keep music/social identity with varied authored outcomes.
- Skjelettvakten is reference for optional DM-started combat.
- Sumptrollet is reference for resource requirement + provider planning.
- Brotrollet is reference for variable authored request whose provider must exist earlier.
- Boka som skriver tilbake is reference for same subject supporting explicit improv, NPC-like conversation, tracked clue, puzzle/gate or item/reward roles.

Candidate sibling subjects such as Den snakkende dukken / Det levende bildet are editorial candidates only, not active-bank additions yet.

## RESOURCE PROVIDER-SYSTEM
A requirement and the way it is obtained are separate graph concepts.

Initial provider families:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- `STARTING_OR_OWNED_RESOURCE` when blueprint explicitly permits.

### Optional resources
May be genuinely variable/random when placement is thematically plausible.

### Critical resources
At least one provider route must be:
- reserved,
- reachable before requirement,
- not behind the gate it enables,
- non-circular,
- not permanently dependent on one uncertain roll.

A critical room-find may *look* random/natural to player, but graph reserves it.

### Merchant / trade
Merchant is a provider Storylet, not automatically a large economy system.

Prefer concrete values:
- coins,
- treasures/valuables,
- trade goods,
- favors,
- other authored resources.

Merchant may also be clue/favor/recurring NPC.

### Social bargain
Child says what they try first. DM triggers `FORHANDLE / USIKKERT FORSØK` only if actual uncertainty exists.

Physical D6 / trait-enabled 2D6 remains binding.

Low result fail-forwards to e.g. higher price, small favor, alternate trade, partial benefit or another route.

No critical resource may be permanently locked behind one persuasion roll.

## ALTERNATIVE CHILD SOLUTIONS
Authored approaches are affordances, not a closed answer list.

DM should be able to:
- `GODTA LØSNING` when child plan plausibly satisfies `resolvedWhen`,
- trigger physical die only for genuine uncertainty,
- apply canonical authored outcomes/world effects,
- avoid raw flag/inventory/map editing.

## OPTIONAL COMBAT MODULE
- Combat is capability, not default monster/vakt behavior.
- Requires `combatAllowed=true`.
- Child may propose fighting; DM explicitly starts with `START KAMP`.
- Critical guardians normally retain non-combat route.
- Child-friendly/non-graphic presentation.
- Surrender, retreat, distraction, friendship, escape etc. are valid endings; kill-state not required.

## PLANLAGTE INTERACTION SHELLS / POPUPS
Detailed spec on prep branch: `docs/INTERACTION_SHELLS_V1.md`.

Initial shell families:
- `SLOT_GATE / ASSEMBLY`
- `LOCKED_OBJECT`
- `NPC_DIALOGUE_FAVOR`
- `MERCHANT_TRADE`
- `PUZZLE`
- `COMBAT`
- `REWARD_CHOICE`
- `SEARCH_INSPECT`

Shell presents explicit state + submits action; Storylet contains actual logic.

### Three-color gate reference
Example: door/machine needs red, blue and yellow stones.

Flow:
1. story reveals sockets first,
2. child taps target,
3. popup shows three slots,
4. owned items never auto-fill,
5. child explicitly places items,
6. wrong item is not consumed,
7. partial placement persists,
8. full placement either resolves or enables authored `AKTIVER/ÅPNE`,
9. world effect changes gate/machine state,
10. future undo restores target + inventory atomically.

Player UI must not reveal unrevealed/narrator-only requirements.

## DM CONTROL SURFACE V1
DM pane should explain generator intent in human language.

Minimum:
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

NG4 must include a minimal semantic DM layer sufficient to playtest Narrative Graph.

## CANONICAL ACTION/STATE DIRECTION
Narrative Graph, DM controls, undo and future Shared Session should converge on typed validated transitions with stable action IDs.

Conceptual action fields:

```text
actionId
sequence
actor
type
targetId
payload
preconditions[]
effects[]
undoPolicy
resultRevision
```

Benefits:
- safe undo,
- idempotency,
- reconnect,
- deterministic tests,
- fewer ad-hoc state mutations.

## MULTISCREEN / SHARED SESSION V1
Future package only.

### Detached player view
- separate browser/device,
- touch-client or display-only,
- no narrator-only data leakage,
- DM sees player-view preview/status.

### DM Host / Player Client
- DM always starts/hosts authoritative state,
- child joins on same Wi-Fi/LAN via simple code/QR,
- player requests actions,
- host validates/applies/broadcasts,
- reconnect restores current state,
- stable action IDs prevent duplicates.

### Undo
`ANGRE SISTE HANDLING` uses reversible transitions/snapshots and re-syncs corrected state.

Adventure Code remains offline reconstruction/sharing, not live sync.

## OPEN-SOURCE SURVEY
No dependency adopted now.

Study-only candidates documented on prep branch:
- `boardgame.io` - state transition/log/undo/phases/multiplayer patterns,
- `Colyseus` - authoritative state/reconnect patterns,
- `rot.js` - roguelike generation/pathfinding/RNG reference,
- `Epoch Mapper` - structured event/quest/interaction/standalone dungeon reference.

Any future adoption requires explicit ADR/spike. Do not import a generic dungeon framework while current state/story architecture is unsettled.

## UPDATED PLAYTEST / ARCHITECTURE SEQUENCE
1. Kartnavigasjon.
2. FRITT KAST + narrator freedom + item-use semantics.
3. DM-guide + physical D6 input.
4. Adventure Code + curated blueprints.
5. **UX4:** hard finale progression + secret doors.
6. **UX5A:** room investigation + encounter/world state + physical findings. **CURRENT.**
7. **Narrative Graph V1:** causal/timed critical story + Storylet Matrix + providers + minimal semantic DM controls + required interaction shells.
8. **DM Control Surface V1:** polish semantic DM control + player preview + action history/undo foundation, if NG accepted.
9. **UX5B:** map-aware dependency/solution UI consuming accepted graph state.
10. Convert additional blueprints one at a time after NG8/editorial gate.
11. **Multiscreen / Shared Session V1:** DM-hosted detached player view + LAN sync + undo when action/state model is stable.

This ordering supersedes the earlier assumption that UX5B automatically precedes DM control. DM comprehension is now core product behavior.

## NARRATIVE GRAPH V1 WORK PACKAGES
### NG0 - docs/spec
Complete/updated on prep.

### NG1 - graph + provider + typed transition model / validator
No polished UI.

### NG2 - Storylet Matrix + provider engine
Subject/role/provider/outcome compatibility + deterministic selection.

### NG3 - Crystal Machine planner
Only blueprint conversion before NG8.

### NG4 - runtime materialization + narrator knowledge + minimal DM controls + required interaction shells
Includes explicit three-slot assembly reference.

### NG5 - >=1000 automated graph/state cases
Provider reachability, slot state, no auto-use, world effects, save/idempotence.

### NG6 - real browser/touch QA
Popup/slot/DM controls + no narrator-data leakage.

### NG7 - 10-20 manual editorial/family playtests
Narrative quality, DM burden, child agency, provider naturalness, popup feel.

### NG8 - accept/revise/abandon architecture gate
Do not convert another blueprint before NG8.

## ADVENTURE BLUEPRINT BANK
Only:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Do not expand now.

## CONTENT REVIEW TRACK
Reviewed through:
- Pannekakezombien
- Den bortkomne zombien
- Skjelettdanseren
- Skjelettvakten
- Sumptrollet
- Brotrollet

Next subject in a fresh chat: **DEN LEVENDE RUSTNINGEN**.

Detailed handoff on prep branch: `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`.

## REPOSITORY HEALTH
Still open. Full active runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone. Do not call release checkpoint locked until this is closed.

## EXACT NEXT
While physical UX5A is open:
- continue patch-14 physical retest,
- patch UX5A defects only on this branch,
- editorial review may continue as documentation,
- keep Narrative Graph runtime blocked,
- do not implement full DM Control Surface, UX5B or Multiscreen.

When UX5A is physical GREEN:
1. record physical evidence,
2. confirm automated + fresh browser regression,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1`,
6. carry approved prep docs,
7. start NG1.
