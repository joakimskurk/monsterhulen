# Narrative Graph V1 Work Package

Status: **WP-NG0 SPEC UPDATED; WP-NG1 BLOCKED ON UX5A PHYSICAL GREEN**
Updated: 2026-10-26

## Purpose
Replace bare critical placement with validated Narrative Graph + curated Storylets, beginning only with `CRYSTAL_MACHINE`.

This work package now includes the architecture lessons from:
- explicit story-key use,
- single location identity,
- `REGNBUENETTET` purpose/payoff failure,
- `BOKA SOM SKRIVER TILBAKE` authored-vs-improv ambiguity,
- subject/role editorial review,
- resource provider planning,
- merchant/trade/social bargain routes,
- optional DM-started combat,
- planned interaction shells/popups,
- future undo/shared-session action model.

## Branch policy
- active UX5A runtime: `ux5/searchable-rooms-encounter-tracks`,
- prep/docs only: `narrative/story-graph-v1-prep`,
- do not implement runtime on prep branch,
- after physical UX5A green: merge UX5A to `main`, verify, create `narrative/story-graph-v1` from merged main, carry approved docs,
- do not blindly merge prep branch over newer runtime.

## Locked architecture model

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal state,
- dramatic phases/expiry,
- interaction shell,
- typed state transition.

Principles:
- resource availability enables action; it does not perform action,
- child proposes/chooses what to do,
- interactive content requires purpose/stakes/resolvedWhen/payoff/world effects,
- progress exists only as authored meaningful stages,
- puzzles/mechanics require authored contextual purpose,
- intentional narrator improv is explicitly scoped,
- critical state never depends on untracked improv,
- critical resources have validated reachable provider routes,
- combat is optional capability, not monster default,
- popup/UI presents explicit state but never owns hidden logic.

## WP-NG0 - architecture/spec freeze - COMPLETE / UPDATED
Canonical prep docs now include:
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`
- `docs/INTERACTION_SHELLS_V1.md`
- `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`
- `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`

No Narrative Graph runtime code exists on prep branch.

## WP-NG1 - graph + transition data model + validator
**NEXT AFTER UX5A DEVICE GATE**

Implement data structures/validation only. No polished UI.

Required model concepts:
- `StoryGraph`,
- `StoryNode`,
- stable `subjectId` separate from `storyletId`,
- resource dependency edges,
- provider plans and nested provider dependencies,
- knowledge reveal state,
- dramatic phases,
- explicit completion/action state,
- purpose/stakes/resolvedWhen/payoff/worldEffects,
- outcomes,
- optional semantic progress stages,
- narrator improv contract,
- `interactionShell` declaration,
- `combatAllowed`,
- typed action/state transition boundary.

Conceptual typed transition fields:

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

NG1 does not need full persistent undo UI, but new runtime mechanics must have one canonical transition boundary.

### NG1 validator must reject
- missing setup/signal,
- dependency cycles,
- unavailable pre-gate requirement,
- critical provider behind consuming gate,
- nested provider cycle/unreachable provider,
- critical dependency on lucky optional spawn,
- critical acquisition depending only on one mandatory persuasion roll,
- merchant price/trade requirement with no source/fail-forward,
- required hidden item without clue/fail-forward,
- guardian with no required non-combat route,
- knowledge exposed before reveal,
- stale complication after objective/phase,
- action-bearing node without explicit completion,
- action completion equal to “requirements owned” when child action is required,
- auto-application of possessed resource,
- missing purpose/stakes/resolvedWhen/payoff,
- payoff without matching world effect,
- generic progress count/filler stage,
- unrelated puzzle/mechanic,
- missing narrator-improv contract where payload intentionally open,
- critical state dependent on narrator invented fact,
- incompatible subject/role,
- interaction shell revealing unrevealed requirement,
- interaction shell exposing undeclared critical action,
- critical slot/gate auto-filled from inventory.

## WP-NG2 - Storylet Matrix + provider engine
Implement hard compatibility filtering and deterministic selection.

Initial Storylet families remain intentionally small.

Core starting play families:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

Provider families:
- `ROOM_FIND`,
- `MERCHANT_PURCHASE`,
- `TRADE`,
- `SOCIAL_BARGAIN`,
- `NPC_REWARD`,
- `PUZZLE_REWARD`,
- `SEARCH_SECRET`,
- explicit starting/owned resource.

Storylet declares:
- subject/role compatibility,
- setup/signal,
- purpose/stakes,
- requirements/provider constraints,
- approaches,
- explicit completion,
- outcomes/world effects,
- timing,
- fail-forward,
- optional combat capability,
- interaction shell,
- narrator-improv bounds if relevant.

Few strong Storylets beat many weak templates.

## WP-NG3 - Crystal Machine graph planner
Replace legacy bare three-room `DEL` plan for `CRYSTAL_MACHINE` only.

Required graph:

`SETUP -> QUEST_REVEAL -> {RED, BLUE, YELLOW acquisition branches} -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Default acquisition mix:
- one signalled `SEARCH_SECRET`,
- one `NPC_FAVOR` with real provider/dependency,
- one `GUARDIAN` with non-combat possibility.

Colors may rotate if copy remains coherent.

All crystals acquired makes `ASSEMBLE` actionable, not complete.

Planner must bind provider plans before room materialization and validate them.

## WP-NG4 - runtime materialization + narrator knowledge + minimal DM controls + interaction shells
This is first runtime UI/materialization package.

Required:
- quest reveal occurs in fiction before knowledge-dependent UI,
- narrator distinguishes truth vs player knowledge,
- NPC dependency points to real resource/provider/room,
- guardian resource tied visibly to guardian,
- required search has clue + fail-forward,
- resources never auto-perform actions,
- obsolete complications expire,
- post-resolution reuse requires new authored role,
- world effects make payoff true.

### Minimal DM semantic controls in NG4
Enough to playtest graph without raw state editing:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- authored vs improv distinction,
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- `START KAMP` only when allowed,
- authored outcome application.

### Interaction shells in NG4
Implement only those needed by Crystal Machine reference plus selected Storylets.

Mandatory reference shell:
- `SLOT_GATE / ASSEMBLY` for three crystals.

Behavior:
- sockets revealed only after knowledge reveal,
- child places items explicitly,
- wrong item not consumed,
- partial placement persists,
- full placement follows authored completion/activation rule,
- no auto-fill from inventory.

Additional shell only if required by chosen reference Storylets:
- NPC favor/dialogue,
- search/inspect,
- optional combat,
- merchant/trade if selected.

Do not build a generic popup framework far beyond reference needs in NG4.

## WP-NG5 - automated graph/state QA
Generate >=1000 `CRYSTAL_MACHINE` adventures across seeds/lengths.

Check:
- valid acyclic graph,
- correct phases,
- all critical dependencies/providers generated,
- no provider behind consuming gate,
- no circular provider chains,
- no critical single-roll softlocks,
- default acquisition diversity,
- no optional-find accidental critical dependency,
- no gate bypass,
- possession does not auto-complete actions,
- all crystals can be owned while assembly pending,
- no stale complication,
- deterministic Adventure Code reconstruction,
- purpose/stakes/resolution/payoff complete,
- world effects realizable/applied,
- no generic progress,
- no unrelated puzzle attachment,
- interaction shell reveal respects knowledge,
- wrong slot item not consumed,
- partial assembly save/reload persists,
- full slots do not skip authored activation step,
- repeated action ID does not duplicate effect when idempotency contract is implemented,
- existing UX regressions remain green.

1000/0 does not prove narrative quality.

## WP-NG6 - real browser/touch interaction QA
Test:
- no premature requirement knowledge,
- signalled search/fail-forward,
- provider acquisition,
- NPC favor completion/payoff,
- guardian non-combat completion,
- optional combat entry/exit if selected,
- crystals acquired but assembly pending,
- slot popup open/close/reopen,
- explicit placement,
- partial placement,
- deliberate activation,
- gate only after completion,
- alternate child solution accepted by DM without raw edits,
- merchant/social bargain if reference plan includes it,
- narrator semantic guidance,
- no narrator-only leakage to player shell,
- touch usability on target form factor.

## WP-NG7 - manual editorial/family playtest
Manually play 10-20 generated Crystal Machine adventures.

Record:
- goal clarity,
- causal/temporal coherence,
- provider routes feel natural rather than contrived,
- each scene purpose clear,
- payoff visible/satisfying,
- narrator burden,
- child choice/free solutions,
- whether popup makes action tangible or too videogamey,
- repeated subjects/roles/providers,
- whether each crystal feels earned differently,
- whether return/assembly pays off setup,
- any early/late/obsolete content,
- any place DM still repairs missing logic.

If problems persist, improve matrix/storylets before adding volume.

## WP-NG8 - architecture gate
After NG7: **accept / revise / abandon**.

Do not convert another blueprint before NG8.

## After NG8 if accepted
Recommended order based on current evidence:
1. **DM Control Surface V1** - polish semantic controls, player preview, action history and undo foundation.
2. **UX5B** - map-aware solution/dependency UI using real graph state.
3. Convert additional blueprints one at a time, each editorially reviewed.
4. **Multiscreen / Shared Session V1** after action/state model is stable enough for authoritative sync/reconnect/undo.

This order supersedes the earlier assumption that UX5B necessarily precedes DM control polish. DM comprehension is now a core product need.

## Content editorial track while runtime is blocked
Content review may continue as documentation only while UX5A physical testing is open.

Current reviewed subjects end at `BROTROLLET`.

Next subject: `DEN LEVENDE RUSTNINGEN`.

See `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`.

Do not expand Adventure Blueprint bank.

## Open-source policy
No dependency adopted at this checkpoint.

Study candidates documented in `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`:
- boardgame.io - reducer/log/undo patterns,
- Colyseus - authoritative sync/reconnect patterns,
- rot.js - roguelike algorithms,
- Epoch Mapper - structured events/quests/standalone interaction ideas.

Any adoption requires later ADR/spike and must not destabilize current runtime.

## Stop conditions
Stop/reassess if:
- compatibility/provider rules become more complex than a small curated scenario bank,
- narrator repeatedly repairs causality,
- variation harms setup/payoff/timing,
- interaction shells reveal closed answers,
- UI starts auto-solving because graph knows the answer,
- sync/undo architecture begins dictating story design,
- world state cannot express promised stakes/payoff.

The system exists to improve coherent child-led tabletop play, not preserve procedural generation at all costs.
