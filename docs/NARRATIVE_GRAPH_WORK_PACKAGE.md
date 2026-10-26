# Narrative Graph V1 Work Package

Status: **WP-NG0 COMPLETE; WP-NG1 BLOCKED ON UX5A PHYSICAL GREEN**

## Purpose
Replace bare critical-object placement with a validated narrative graph and curated storylet system, beginning only with `CRYSTAL_MACHINE`.

A new locked principle from UX5A applies to all work packages: **resource availability enables an action; it does not silently perform the action.** The child proposes/chooses what to do. UI and narrator expose affordances without automatically applying the obvious solution.

## Branch policy
- Current UX5A runtime branch remains `ux5/searchable-rooms-encounter-tracks`.
- This document/spec work lives on `narrative/story-graph-v1-prep` only.
- Do not implement runtime code on prep branch.
- After UX5A physical green: merge UX5A to `main`, verify `main`, then create real implementation branch `narrative/story-graph-v1` from merged head.
- Do not blindly merge prep branch after later UX5A runtime commits. Carry approved documentation onto implementation branch from new merged `main` head.

## WP-NG0 - freeze architecture and baseline - COMPLETE
Deliverables completed:
- `START_HERE.md`
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
- synchronized handoff/status/test/playtest docs.

Exit criteria met:
- human-curated vs procedural responsibility explicit,
- UX5B deferred until Narrative Graph V1 proves coherent critical stories,
- Crystal Machine acceptance explicit,
- automated and manual/editorial evidence separated,
- temporal causality explicit,
- resource/prerequisite state separated from explicit child action completion,
- no Narrative Graph runtime code on prep branch.

## WP-NG1 - graph data model + validator - NEXT AFTER DEVICE GATE
Implement data structures and validation only.

Required:
- `StoryGraph`,
- `StoryNode`,
- resource dependency edges,
- knowledge reveal state,
- dramatic phase state (`INTRO`, `QUEST_ACTIVE`, `RETURN`, `CLIMAX`, `AFTERMATH`),
- per-node/storylet phase windows and expiry rules,
- storylet IDs/roles,
- explicit per-node `completion` semantics,
- graph validator.

Model rule:
- `requires[]` says when a node is actionable,
- `completion` says what transition makes it complete,
- action-bearing nodes may not auto-complete solely because `requires[]` are true.

Validator must reject:
- missing setup/signal for critical node,
- dependency cycles,
- unavailable pre-gate requirement,
- critical dependency on optional UX5A find,
- required hidden item without fail-forward clue path,
- guardian with no authored non-combat route,
- quest knowledge exposed before reveal,
- complication/antagonist whose first valid activation is after objective it obstructs has resolved,
- unresolved pre-resolution beat active after expiry,
- ambient story text referring to unfinished objective after completion,
- action-bearing critical node with no explicit completion transition,
- action node whose completion is implicitly equivalent to `all required resources are owned/known` when fiction requires a child choice,
- UI/materialization contract that would auto-apply an obvious possessed resource rather than expose it as an affordance.

No UI change required for NG1 itself.

## WP-NG2 - Storylet Matrix engine
Implement hard compatibility filtering and deterministic seeded selection.

Start only with:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

Initial editorial target:
- 3 approved `SEARCH_SECRET`,
- 3 approved `NPC_FAVOR`,
- 3 approved `GUARDIAN`.

Nine strong storylets are better than fifty weak templates.

Every storylet declares:
- what enables it,
- how it is signalled,
- authored approach families,
- explicit completion rule,
- valid phases/expiry,
- payoff.

Authored approaches are affordances, not a closed answer list.

## WP-NG3 - Crystal Machine graph planner
Replace legacy three-room bare `DEL` plan for `CRYSTAL_MACHINE` only.

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

Colors may rotate if copy remains coherent. Other blueprints remain on legacy planner during experiment.

Critical agency rule:
- acquiring all three crystals makes `ASSEMBLE` actionable,
- it must **not** set `MACHINE_ASSEMBLED`, open gate or skip return/assembly automatically.

## WP-NG4 - room materialization + narrator knowledge
Materialize selected storylets into real rooms/events.

Required:
- quest reveal occurs in fiction,
- Forteller view distinguishes truth vs player knowledge,
- NPC dependency points to actual generated resource/room,
- guardian resource visibly tied to guardian,
- required search has clue + fail-forward,
- action affordances become visible only when fiction/knowledge supports them,
- possessing relevant item/resource never silently performs an action,
- narrator may give graded/open hints without turning approaches into a closed answer list,
- assembly requires deliberate child/narrator interaction rather than inventory auto-completion,
- objective resolution expires obsolete quest complications immediately,
- post-resolution encounters are neutral ambient or explicitly authored climax/aftermath beats.

## WP-NG5 - automated graph generation QA
Generate at least 1000 `CRYSTAL_MACHINE` adventures across layout/adventure seeds and all supported lengths where valid.

Check at minimum:
- valid acyclic graph,
- critical nodes reachable in correct phase,
- all dependencies generated,
- three acquisition families by default,
- no optional-find dependency,
- no story gate bypass,
- resource possession does not auto-complete separate action nodes,
- all three crystals owned while `ASSEMBLE` remains pending until explicit completion event,
- no stale complication can first appear after target objective resolved,
- objective completion expires dependent pre-resolution complications,
- separately authored climax/aftermath may reuse character only with new role/purpose,
- same Adventure Code reconstructs same critical graph,
- deterministic seeded storylet selection,
- save/re-enrichment idempotence where applicable,
- existing UX4/UX5A regressions stay green.

Passing 1000 structural cases does not prove narrative quality.

## WP-NG6 - real browser interaction QA
Use Chromium interaction smoke to test at least:
- requirement reveal,
- no premature UI knowledge,
- signalled search + fail-forward,
- NPC favor dependency/completion,
- guardian non-combat completion,
- all crystals acquired,
- all crystals owned but assembly still pending,
- deliberate return/assembly through explicit action,
- gate opens only after assembly,
- relevant possessed resources appear as choices/affordances without auto-use,
- quest complication available before resolution disappears/transforms immediately after resolution,
- no obsolete antagonist appears by later navigation.

## WP-NG7 - manual editorial playtest
Manually play 10-20 generated Crystal Machine adventures before converting another blueprint.

Record:
- goal clarity,
- causal coherence,
- temporal coherence,
- whether UI/narrator preserves child choice instead of solving obvious actions automatically,
- repeated patterns,
- absurd combinations,
- narrator burden,
- child-led solution quality,
- whether each crystal felt earned differently,
- whether return/assembly paid off setup,
- whether any encounter felt too early, too late or obsolete.

If repeated narrative problems remain, improve matrix/storylets first. Do not compensate by adding more random content.

## WP-NG8 - decision gate
Only after NG7:
- accept architecture,
- revise architecture,
- or abandon it in favor of more hand-authored full scenarios.

If accepted, port one blueprint at a time. Current candidate order remains `GLASS_HEART`, `WITCH_CAT`, `ZOMBIE_DELIVERY`, subject to evidence.

## UX5B relationship
UX5B is deferred. It should later consume Narrative Graph rather than infer story logic from loosely placed rooms.

That lets it show actual relevant resources, known vs unknown facts, real dependencies and map-supported non-combat options while still leaving the child to choose the action.

## Stop conditions
Stop and reassess if:
- storylet compatibility rules become more complex than authoring a small full scenario bank,
- manual playtest still requires narrator to invent causal links frequently,
- procedural variation repeatedly harms setup/payoff or dramatic ordering,
- graph generation becomes valid only by reducing stories to generic interchangeable text,
- UI increasingly auto-solves interactions because the graph knows the intended answer.

The system exists to improve story quality and child-led play, not to preserve procedural generation at all costs.
