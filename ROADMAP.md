# MONSTERHULEN - ROADMAP

DATO: 2026-10-27
STATUS: V0.12.3 BASELINE + UX5A PATCH 15 IMPLEMENTED/SOURCE-VERIFIED + EXACT-CANDIDATE REGRESSION/BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREP UPDATED

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
Patch chain now includes:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract + authored-progress-only + real trap blocking + no random ambient puzzle attachment,
- patch 14 explicit narrator improvisation,
- patch 15 remove remaining zone-name leak from player-visible `room.desc`.

### Why patch 15 exists
A full checklist/source review on 2026-10-27 found that the room banner used the canonical room name, but the visible description still began with `${zone.name}. ${room.name}.`. That violated the already-locked rule that zone names are internal metadata and a physical place has one visible identity.

Patch 15 changes only the player-facing description prefix to `${room.name}.` and retains zone metadata internally.

The single-location QA now covers this exact case.

### Verification state
Patch 14 automated evidence remains:
- explicit-improv **20/0**
- encounter-purpose **4337/0**
- authored-mysteries-only **3075/0**
- single-location **19/0** under old coverage
- targeted device **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- 11 scripts **0 syntax errors**

Patch 15:
- implemented: **YES**,
- source/static verified: **YES**,
- updated QA syntax: **YES**,
- exact reconstructed automated regression: **PENDING**,
- fresh current browser QA: **PENDING**,
- physical target-device retest: **PENDING**.

Do not use patch-14 pass counts as patch-15 certification.

Detailed gate review:
`docs/UX5A_GATE_REVIEW_2026-10-27.md`

**Do not merge UX5A until patch-15 machine/browser regression and physical gate are green.**

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

## RESOURCE PROVIDER SYSTEM
Requirement and acquisition route are separate graph concepts.

Initial provider families:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- `STARTING_OR_OWNED_RESOURCE` when blueprint explicitly permits.

Critical resources need at least one reserved, reachable, non-circular route before consumption and may not depend permanently on one uncertain roll.

## CHILD AGENCY / DM SEMANTICS
Authored approaches are affordances, not a closed answer list.

Future graph-aware DM controls include:
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- physical die recording,
- `START KAMP` only where allowed,
- authored outcome/world-effect application.

DM should not hand-edit raw flags/inventory/map.

Combat is an optional Storylet capability, never automatic from monster/vakt identity.

## INTERACTION SHELLS
Initial shell families:
- `SLOT_GATE / ASSEMBLY`
- `LOCKED_OBJECT`
- `NPC_DIALOGUE_FAVOR`
- `MERCHANT_TRADE`
- `PUZZLE`
- `COMBAT`
- `REWARD_CHOICE`
- `SEARCH_INSPECT`

Reference rule: owning a solution never performs the action.

Three-color gate/machine reference:
1. reveal sockets first,
2. child taps target,
3. popup shows known slots,
4. owned items never auto-fill,
5. child places explicitly,
6. wrong item not consumed,
7. partial placement persists,
8. full placement resolves or enables authored activation,
9. world effect changes target,
10. future undo restores target + inventory atomically.

## CANONICAL ACTION/STATE DIRECTION
Narrative Graph, DM controls, undo and future Shared Session converge on typed validated transitions with stable action IDs.

Conceptual fields:
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

## UPDATED PLAYTEST / ARCHITECTURE SEQUENCE
1. Kartnavigasjon.
2. FRITT KAST + narrator freedom + item-use semantics.
3. DM-guide + physical D6 input.
4. Adventure Code + curated blueprints.
5. UX4 hard finale progression + secret doors.
6. **UX5A room investigation + encounter/world state + physical findings. CURRENT.**
7. **Narrative Graph V1** only after UX5A green.
8. If NG accepted: **DM Control Surface V1** polish + action history/undo foundation.
9. **UX5B** consuming accepted graph state.
10. Convert additional blueprints one at a time after NG8/editorial gate.
11. **Multiscreen / Shared Session V1** once action/state model is stable.

## NARRATIVE GRAPH V1 WORK PACKAGES
- NG0 specs/docs - complete/updated on prep.
- NG1 graph + provider + typed transition model/validator.
- NG2 Storylet Matrix/provider engine.
- NG3 Crystal Machine planner.
- NG4 runtime materialization + narrator knowledge + minimal DM controls + required interaction shells.
- NG5 >=1000 automated graph/state cases.
- NG6 real browser/touch QA.
- NG7 10-20 manual editorial/family playtests.
- NG8 accept/revise/abandon.

No second blueprint before NG8.

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

Next subject: **DEN LEVENDE RUSTNINGEN**.

## REPOSITORY HEALTH
Still open. Full active runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone. Do not call release checkpoint locked until this is closed.

## EXACT NEXT
1. Reconstruct the exact current patch-14 candidate and apply patch 15.
2. Run updated single-location QA + relevant full regressions.
3. Run fresh current browser interaction QA on that exact patch-15 candidate.
4. Run the 14-point physical iPad/mobile gate in `docs/UX5A_GATE_REVIEW_2026-10-27.md`.
5. Fix UX5A defects only if anything fails.
6. When all gates are green: document evidence -> merge UX5A to `main` -> verify `main` -> create `narrative/story-graph-v1` -> carry approved prep docs -> start NG1.
