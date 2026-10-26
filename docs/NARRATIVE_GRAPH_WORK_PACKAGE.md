# Narrative Graph V1 Work Package

Status: **WP-NG0 COMPLETE; WP-NG1 BLOCKED ON UX5A PHYSICAL GREEN**

## Purpose
Replace bare critical-object placement with a validated narrative graph and curated storylet system, beginning only with `CRYSTAL_MACHINE`.

## Branch policy
- Current UX5A runtime branch remains `ux5/searchable-rooms-encounter-tracks`.
- This document/spec work lives on `narrative/story-graph-v1-prep` only.
- Do not implement runtime code on the prep branch.
- After UX5A physical green: merge UX5A to `main`, verify `main`, then create the real implementation branch from that merged head, suggested name `narrative/story-graph-v1`.
- Do not blindly merge the prep branch after later UX5A runtime commits. Carry the approved documentation onto the implementation branch from the new merged `main` head.

## WP-NG0 - freeze architecture and baseline - COMPLETE
Deliverables completed:
- `START_HERE.md`
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
- synchronized `PROJECT_STATE.md`, `CURRENT_STATUS.md`, `ROADMAP.md`, `DECISIONS.md`, `TESTING.md`, `PLAYTEST_FINDINGS.md`

Exit criteria met:
- human-curated vs procedural responsibility is explicit,
- UX5B is explicitly deferred until Narrative Graph V1 proves coherent critical stories,
- Crystal Machine reference acceptance is explicit,
- automated and manual/editorial evidence are separate gates,
- temporal causality is explicit: complications/antagonists have valid phases and cannot appear after the objective they exist to hinder is already resolved unless separately authored as climax/aftermath,
- no runtime code has changed on this prep branch.

## WP-NG1 - graph data model + validator - NEXT AFTER DEVICE GATE
Implement data structures and validation only.

Required:
- `StoryGraph`
- `StoryNode`
- resource dependency edges
- knowledge reveal state
- dramatic phase state (`INTRO`, `QUEST_ACTIVE`, `RETURN`, `CLIMAX`, `AFTERMATH`)
- per-node/storylet phase windows and expiry rules
- storylet IDs/roles
- graph validator

Validator must reject:
- missing setup/signal for critical node,
- dependency cycles,
- unavailable pre-gate requirement,
- critical dependency on optional UX5A find,
- required hidden item without fail-forward clue path,
- guardian with no authored non-combat route,
- quest knowledge exposed before reveal,
- complication/antagonist whose first valid activation is after the objective it is defined to obstruct has already resolved,
- unresolved pre-resolution story beat that remains active after its expiry flag,
- ambient story text that references an unresolved objective after that objective has been completed.

No UI change required for this subpackage.

## WP-NG2 - Storylet Matrix engine
Implement hard compatibility filtering and deterministic seeded selection.

Start with only the storylet families needed for the Crystal Machine reference:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`

Do not build a huge content library yet.

Initial editorial target:
- 3 approved `SEARCH_SECRET` variants,
- 3 approved `NPC_FAVOR` variants,
- 3 approved `GUARDIAN` variants.

Nine strong storylets are better than fifty weak templates.

Every storylet must also declare when it is valid and when it expires. Reusing the same character later is allowed only through a separately authored storylet with a new dramatic function.

## WP-NG3 - Crystal Machine graph planner
Replace the current three-room bare `DEL` plan for `CRYSTAL_MACHINE` only.

Required graph:
- setup/reveal,
- three parallel acquisition branches,
- return,
- assemble,
- gate,
- climax.

Default seeded family mix:
- one search,
- one NPC favor,
- one guardian.

Colors may rotate between acquisition families if all storylet copy remains coherent.

Other blueprints remain on legacy planner during this experiment.

## WP-NG4 - room materialization + narrator knowledge
Materialize selected storylets into real rooms/events.

Required:
- quest reveal occurs in fiction,
- Forteller view knows what is true vs what players know,
- NPC dependency points to actual generated resource/room,
- guardian resource is visibly tied to the guardian,
- required search has clue + fail-forward,
- assembly requires a deliberate child/narrator interaction rather than inventory auto-completion,
- resolving/assembling the objective expires obsolete quest complications immediately,
- post-resolution encounters are either neutral ambient content or explicitly authored `CLIMAX`/`AFTERMATH` beats.

## WP-NG5 - automated graph generation QA
Generate at least 1000 `CRYSTAL_MACHINE` adventures across layout/adventure seeds and all supported lengths where valid.

Check at minimum:
- valid acyclic graph,
- critical nodes reachable in correct phase,
- all dependencies generated,
- three acquisition families by default,
- no optional-find dependency,
- no story gate bypass,
- no stale complication can first appear after its target objective is resolved,
- objective completion expires all dependent pre-resolution complications,
- separately authored climax/aftermath beats may legally reuse a character only with a new role/purpose,
- same Adventure Code reconstructs same critical graph,
- deterministic seeded storylet selection,
- save/re-enrichment idempotence where applicable,
- existing UX4/UX5A regressions stay green.

Passing 1000 structural cases does not prove narrative quality.

## WP-NG6 - real browser interaction QA
Use Chromium interaction smoke to test at least:
- requirement reveal,
- hidden-search fail-forward,
- NPC favor dependency/completion,
- guardian non-combat completion,
- all crystals acquired,
- deliberate assembly,
- gate open only after assembly,
- no premature UI knowledge,
- a quest complication available before resolution is gone or transformed immediately after resolution,
- no obsolete antagonist encounter appears by later navigation.

## WP-NG7 - manual editorial playtest
Manually play 10-20 generated Crystal Machine adventures before converting another blueprint.

Record for each:
- goal clarity,
- causal coherence,
- temporal coherence,
- repeated patterns,
- absurd combinations,
- narrator burden,
- child-led solution quality,
- whether each crystal felt earned differently,
- whether return/assembly paid off setup,
- whether any encounter felt too early, too late or obsolete after the story had moved on.

If repeated narrative problems remain, improve matrix/storylets first. Do not compensate by adding more random content.

## WP-NG8 - decision gate
Only after NG7:
- accept architecture,
- revise architecture,
- or abandon it in favor of more hand-authored full scenarios.

If accepted, port one blueprint at a time:
1. `GLASS_HEART`
2. `WITCH_CAT`
3. `ZOMBIE_DELIVERY`

Order may be reconsidered after Crystal Machine evidence.

## UX5B relationship
The old planned UX5B map-aware solution graph is deferred. It should later consume the Narrative Graph rather than infer story logic from loosely placed rooms after the fact.

That makes UX5B simpler and more reliable because it can show:
- actual relevant resources,
- known vs unknown resources,
- real NPC/guardian dependencies,
- attempted approaches,
- map-supported non-combat options.

## Stop conditions
Stop implementation and reassess if:
- storylet compatibility rules become more complex than authoring a small full scenario bank,
- manual playtest still requires the narrator to invent causal links frequently,
- procedural variation repeatedly harms setup/payoff or dramatic ordering,
- graph generation becomes valid only by reducing stories to generic interchangeable text.

The system exists to improve story quality, not to preserve procedural generation at all costs.