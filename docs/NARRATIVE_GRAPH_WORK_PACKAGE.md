# Narrative Graph V1 Work Package

Status: **WP-NG0 SPEC UPDATED; WP-NG1 BLOCKED ON UX5A PHYSICAL GREEN**

## Purpose
Replace bare critical placement with validated Narrative Graph + curated Storylets, beginning only with `CRYSTAL_MACHINE`.

Locked principles inherited from UX5A:
- resource availability enables an action; it does not perform the action,
- child proposes/chooses what to do,
- interactive content requires `purpose`, `stakes`, `resolvedWhen`, `payoff` and coherent world effects,
- progress exists only as authored meaningful stages, never generic duration boxes,
- a promised obstacle/payoff must be reflected in actual world state,
- puzzles/mechanics require authored contextual purpose.

## Branch policy
- active UX5A runtime: `ux5/searchable-rooms-encounter-tracks`,
- prep/docs only: `narrative/story-graph-v1-prep`,
- do not implement runtime on prep branch,
- after physical UX5A green: merge UX5A to `main`, verify, then create `narrative/story-graph-v1` from merged main and carry approved docs,
- do not blindly merge prep branch over newer runtime.

## WP-NG0 - architecture/spec freeze - COMPLETE / UPDATED BY UX5A FINDINGS
Documentation exists and now incorporates:
- causal structure,
- temporal phases/expiry,
- resource-vs-action separation,
- child agency,
- single clear location identity,
- encounter/storylet purpose contract from `REGNBUENETTET` physical finding,
- authored-progress-only rule,
- world-effect/payoff consistency.

No Narrative Graph runtime code exists on prep branch.

## WP-NG1 - graph data model + validator - NEXT AFTER DEVICE GATE
Implement data structures and validation only.

Required model:
- `StoryGraph`,
- `StoryNode`,
- resource dependency edges,
- knowledge reveal state,
- dramatic phases (`INTRO`, `QUEST_ACTIVE`, `RETURN`, `CLIMAX`, `AFTERMATH`),
- per-node phase windows/expiry,
- stable storylet IDs/roles,
- explicit `completion`,
- `purpose`,
- `stakes`,
- `resolvedWhen`,
- `payoff`,
- `worldEffects[]`,
- optional semantic `progressStages[]`,
- graph validator.

Model rules:
- `requires[]` says when node is actionable,
- `completion`/`resolvedWhen` says what transition makes it complete,
- action-bearing nodes do not auto-complete from requirements,
- `progressStages[]` exists only if each stage is an authored changed fictional state,
- `worldEffects[]` must make the promised payoff true.

Validator must reject:
- missing setup/signal for critical node,
- dependency cycles,
- unavailable pre-gate requirement,
- critical dependency on optional UX5A find,
- required hidden item without fail-forward clue path,
- guardian with no non-combat route,
- knowledge exposed before reveal,
- stale complication after its objective/phase,
- obsolete ambient objective text,
- action-bearing node without explicit completion transition,
- action completion equivalent to “requirements now owned/known” when fiction requires child choice,
- auto-application of an obvious possessed resource,
- interactive node missing purpose/stakes/resolvedWhen/payoff,
- promised payoff with no matching world effect,
- blocking obstacle with no safe retreat/fail-forward topology policy,
- generic progress count without authored named stages,
- filler progress stage that does not change fictional state,
- puzzle/mechanic with no authored contextual relationship to Storylet.

No UI change required for NG1.

## WP-NG2 - Storylet Matrix engine
Implement hard compatibility filtering and deterministic selection.

Start only with:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

Initial target: 3 approved of each. Nine strong Storylets beat fifty weak templates.

Every Storylet declares:
- what enables it,
- setup/signal,
- purpose/stakes,
- authored approaches,
- explicit completion/resolvedWhen,
- valid phases/expiry,
- payoff + world effects,
- optional meaningful progress stages.

Approaches are affordances, not closed answers.

## WP-NG3 - Crystal Machine graph planner
Replace legacy bare three-room `DEL` plan for `CRYSTAL_MACHINE` only.

Required graph:
- setup/reveal,
- three parallel acquisition branches,
- return,
- assemble,
- gate,
- climax.

Default seeded family mix: one search, one NPC favor, one guardian. Colors may rotate if copy remains coherent. Other blueprints remain legacy during experiment.

Agency rule: all crystals acquired makes `ASSEMBLE` actionable; it must not set `MACHINE_ASSEMBLED` or open gate automatically.

Purpose rule: each acquisition branch must answer why the scene exists, what is at stake, how it resolves, and what observable state changes after the crystal is gained.

## WP-NG4 - room materialization + narrator knowledge
Required:
- quest reveal occurs in fiction,
- narrator distinguishes truth vs player knowledge,
- NPC dependency points to real resource/room,
- guardian resource visibly tied to guardian,
- required search has clue + fail-forward,
- action affordances appear only when supported,
- relevant resources never auto-perform actions,
- narrator exposes graded/open hints,
- narrator can understand purpose/stakes/resolution/payoff without reverse-engineering mechanics,
- world effects implement promised payoff,
- deliberate assembly,
- obsolete complications expire immediately,
- post-resolution reuse requires new authored role.

## WP-NG5 - automated graph generation QA
Generate >=1000 `CRYSTAL_MACHINE` adventures across seeds/lengths.

Check at minimum:
- valid acyclic graph,
- critical nodes reachable in correct phase,
- all dependencies generated,
- default three acquisition families,
- no optional-find critical dependency,
- no gate bypass,
- resource possession does not auto-complete action nodes,
- all crystals can be owned while assembly remains pending,
- no stale complication after objective resolution,
- same Adventure Code reconstructs same graph,
- deterministic selection,
- all interactive critical nodes have purpose/stakes/resolvedWhen/payoff,
- all promised world effects are realizable and applied on completion,
- no generic progress count without authored stages,
- no unrelated puzzle/mechanic attachment,
- save/re-enrichment idempotence where applicable,
- existing UX regressions remain green.

1000/0 does not prove story quality.

## WP-NG6 - real browser interaction QA
Test:
- requirement reveal/no premature knowledge,
- signalled search + fail-forward,
- NPC favor dependency/completion/payoff,
- guardian non-combat completion/payoff,
- crystals acquired but assembly pending,
- deliberate return/assembly,
- gate only after assembly,
- resources shown as affordances without auto-use,
- complication expiry,
- interactive obstacle world effect before and after resolution where used,
- narrator purpose/solve/payoff guidance.

## WP-NG7 - manual editorial playtest
Manually play 10-20 generated Crystal Machine adventures.

Record:
- goal clarity,
- causal and temporal coherence,
- whether each scene has an understandable purpose,
- whether resolution causes a satisfying/visible change,
- narrator burden,
- child choice/free solutions,
- repeated patterns/absurd combinations,
- whether each crystal feels earned differently,
- whether return/assembly pays off setup,
- any early/late/obsolete content,
- any mechanics that ask narrator to invent filler.

If problems persist, improve matrix/storylets before adding random content.

## WP-NG8 - decision gate
After NG7: accept, revise or abandon architecture. If accepted, port one blueprint at a time. Do not port before this gate.

## UX5B relationship
UX5B is deferred and should later consume Narrative Graph so it can show actual resources, known/unknown facts, dependencies and map-supported non-combat options while leaving child choice open.

## Stop conditions
Stop/reassess if:
- compatibility rules become more complex than a small full scenario bank,
- narrator must frequently invent causal links or filler steps,
- variation repeatedly harms setup/payoff/timing,
- validity requires generic interchangeable text,
- UI increasingly auto-solves because graph knows answer,
- mechanics promise stakes/payoff that world state cannot actually express.

The system exists to improve story quality and child-led play, not preserve procedural generation at all costs.
