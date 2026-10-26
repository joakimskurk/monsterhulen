# Narrative Graph V1

Status: **DESIGN LOCK CANDIDATE - prep only, no runtime implementation yet**
Branch: `narrative/story-graph-v1-prep`
Updated: 2026-10-26

## Implementation gate
Do not implement Narrative Graph runtime until UX5A physical device gate is green and UX5A is merged to `main`.

The active runtime branch remains `ux5/searchable-rooms-encounter-tracks`.

After green UX5A:
1. merge to `main`,
2. verify `main`,
3. create `narrative/story-graph-v1` from merged main,
4. carry approved prep docs,
5. start WP-NG1.

## Why this exists
Playtest/editorial review exposed one architecture problem at multiple scales:
- `CRYSTAL_MACHINE`: reachable parts can still be causally disconnected,
- `SKYGGEHEKSA`: content can arrive after its dramatic purpose expired,
- keyed door: owning solution can wrongly auto-perform child action,
- `REGNBUENETTET`: mechanics can exist without real stakes/payoff,
- `BOKA SOM SKRIVER TILBAKE`: intentional improvisation can look like missing hidden content,
- zombie/skjelett/troll review: a memorable subject needs multiple curated roles/outcomes without becoming random soup,
- `SUMPTROLLET`/`BROTROLLET`: required resources need validated provider routes before the encounter,
- DM needs semantic scene control rather than reverse-engineering generator intent,
- some actions need tangible player interaction shells/popups rather than abstract buttons.

Narrative Graph V1 replaces:

`scenario -> place required objects/events`

with:

`BLUEPRINT -> NARRATIVE FUNCTIONS -> SUBJECT + STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> MAP/KNOWLEDGE -> CHILD ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting runtime layer:

`INTERACTION SHELL -> VALIDATED ACTION -> STATE TRANSITION`

## Core story rules
Every story-critical objective must satisfy:

**SETUP -> SIGNAL -> ACTION -> PAYOFF**

Every interactive critical node/storylet must answer:
- `PURPOSE`
- `STAKES`
- `RESOLVED WHEN`
- `PAYOFF`
- `WORLD EFFECTS`

A prerequisite becoming true does not mean the child acted.

Examples:
- owns `GLASSNØKKEL` -> key use possible; door remains locked,
- owns three crystals -> assembly possible; machine remains unassembled,
- owns food -> feeding troll possible; troll remains unresolved,
- knows guardian motive -> new approaches possible; guardian remains unresolved.

## Dramatic phases
Initial phases:
- `INTRO`
- `QUEST_ACTIVE`
- `RETURN`
- `CLIMAX`
- `AFTERMATH`

Nodes/storylets may declare:
- `validPhases[]`
- `activatesAfter[]`
- `expiresAfter[]`

A complication may not first appear after the objective it exists to affect is complete unless a separately authored later role exists.

## StoryGraph
Directed critical-story graph for one generated adventure.

Conceptual minimum fields:

```text
graphVersion
blueprintId
nodes[]
edges[]
knowledge[]
resources[]
providerPlans[]
gate
payoff
phase
```

## StoryNode
Conceptual fields:

```text
id
role
critical
storyletId
subjectId
roomId
provides[]
requires[]
providerPlanIds[]
reveals[]
state
completion
purpose
stakes
resolvedWhen
outcomes[]
payoff
worldEffects[]
validPhases[]
expiresAfter[]?
progressStages[]?
narratorImprov?
interactionShell?
combatAllowed?
```

`requires[]` controls actionability, not completion.

`outcomes[]` are authored allowed resolution results. `worldEffects[]` make those outcomes real in canonical state.

`progressStages[]` is optional and may contain only meaningful fictional changes.

`narratorImprov` explicitly declares bounded open detail. Critical state cannot depend on untracked improvisation.

`interactionShell` selects a presentation/action shell for state already defined by the Storylet. It never defines hidden story logic itself.

## Subject vs Storylet role
`subjectId` is recognizable fictional identity. `storyletId` is logic/role identity.

Examples of subjects:
- `PANNEKAKEZOMBIEN`
- `BORTKOMNE_ZOMBIEN`
- `SKJELETTVAKTEN`
- `SUMPTROLLET`
- `BROTROLLET`
- `BOKA_SOM_SKRIVER_TILBAKE`

Examples of roles:
- `BLOCK_PATH`
- `NPC_FAVOR`
- `TRADE`
- `GUARDIAN`
- `CLUE_SOURCE`
- `PUZZLE_CARRIER`
- `ITEM_HOLDER`
- `OPTIONAL_IMPROV`
- `RESCUE`
- `FOLLOW_CLUE`
- `RETURN`
- `ASSEMBLE`
- `GATE`
- `COMPLICATION`
- `CLIMAX`

Generator selects only explicitly compatible subject/role pairings.

A subject may have several curated Storylets, but presentation skin can never silently change critical logic.

## Resources and provider plans
A `Resource` is a tracked item/state such as:
- `FOOD`,
- `CRYSTAL_RED`,
- `TRADE_VALUE_X`,
- `NPC_FAVOR_COMPLETE`,
- `GUARDIAN_RESOLVED`.

Requirement and acquisition route are separate.

Initial provider families:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- `STARTING_OR_OWNED_RESOURCE` when explicitly allowed.

### Critical provider invariant
For every critical required resource/state:
1. at least one provider route exists before consumption,
2. provider is reachable without passing the consuming gate,
3. nested provider requirements are themselves reachable,
4. provider graph is acyclic,
5. no single mandatory uncertain roll can permanently remove all routes,
6. at least one route survives fail-forward outcomes.

A critical `ROOM_FIND` may look random to the child, but placement is reserved/validated. Optional finds may be genuinely random.

### Merchant/social bargain
Merchant is a provider Storylet, not automatically a numerical economy.

Concrete valuables/trade/favor are preferred over large abstract currency unless later playtest proves otherwise.

Social bargain flow:
- child proposes what to say/do,
- DM decides whether uncertainty exists,
- physical die only if uncertain,
- low result fails forward,
- critical resource cannot be permanently locked behind one persuasion roll.

## Knowledge
Truth and player knowledge are separate.

Player-facing UI and interaction shells may expose only facts whose reveal conditions are satisfied.

Example: a three-color gate must not show red/blue/yellow slot requirements before the fiction has revealed those requirements.

## Purpose / world-effect contract
Every interactive Storylet/node declares:
- why it exists,
- what is affected now,
- what fictional state resolves it,
- what narrated payoff follows,
- what state effects make payoff true.

A claimed path blocker must actually block the authored path/state. Resolution must release it.

A puzzle must belong causally/thematically to the Storylet.

No generic 3/4 progress duration.

## Explicit narrator improvisation
Intentional openness is valid. Ambiguous responsibility is not.

If narrator owns an open detail:
- Storylet explicitly declares it,
- narrator UI says there is no hidden answer for that detail,
- prompt says what may be invented,
- guardrails protect tracked state,
- player fiction remains immersive.

Critical prerequisites/resources/completion/outcomes/world effects remain authored/tracked.

## Alternative child solutions
Authored approaches are affordances, not answer buttons.

A plausible unlisted child solution may be accepted by DM.

If certain: DM can `GODTA LØSNING`.

If genuinely uncertain: DM may trigger physical die flow.

Accepted resolution applies canonical Storylet outcome/world effects. DM does not edit raw graph flags.

## Optional combat capability
Combat is a Storylet capability, not monster identity.

- `combatAllowed=true` required,
- no automatic combat entry,
- child may propose fighting,
- DM explicitly starts combat,
- critical guardians normally retain non-combat route,
- presentation child-friendly/non-graphic,
- valid endings include surrender/retreat/distraction/friendship/escape,
- no required kill semantics.

## Interaction shells
Canonical design lives in `docs/INTERACTION_SHELLS_V1.md`.

Initial families:
- `SLOT_GATE` / `ASSEMBLY`
- `LOCKED_OBJECT`
- `NPC_DIALOGUE_FAVOR`
- `MERCHANT_TRADE`
- `PUZZLE`
- `COMBAT`
- `REWARD_CHOICE`
- `SEARCH_INSPECT`

Shells present known state and submit typed actions. They do not infer or mutate hidden logic directly.

### Three-slot reference
For red/blue/yellow stones:
- reveal first,
- target tap opens three slots,
- owned stones stay in inventory until explicitly placed,
- placement is one action per item,
- wrong item not consumed,
- partial state persists,
- full placement either resolves or enables separate activation according to Storylet,
- undo reverses inventory + target state atomically.

Possession never auto-fills slots.

## Canonical action/state transition boundary
Narrative Graph, DM controls, undo and future shared session should use one transition model.

Conceptual event/action fields:

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

Example action types:
- `MOVE_ROOM`
- `PLACE_RESOURCE`
- `USE_ITEM`
- `ACCEPT_SOLUTION`
- `START_UNCERTAIN_ATTEMPT`
- `RECORD_DIE_FACE`
- `START_COMBAT`
- `RESOLVE_COMBAT`
- `BUY_ITEM`
- `TRADE_ITEM`
- `GRANT_REWARD`
- `REVEAL_CLUE`
- `OPEN_GATE`

NG1 should define enough of this boundary to stop new features bypassing canonical transitions. Full action history/undo can mature later.

## Hard invariants
1. Every critical node has earlier setup/signal path.
2. Every critical resource has a reachable provider before consumption.
3. Provider dependencies are acyclic and not behind consuming gate.
4. Critical progression cannot depend on a single mandatory uncertain roll.
5. Generic optional UX5A find never becomes hidden critical requirement unless promoted through an explicit guaranteed provider Storylet.
6. Required hidden/search content has clue + fail-forward.
7. Critical NPC favor dependencies exist and are reachable.
8. Guardian normally has authored non-combat route.
9. Required puzzle is causally connected and has narrator help.
10. Three-part collect defaults to different play/provider families unless blueprint overrides.
11. Critical story generates/validates before ambient content.
12. Secret shortcuts never bypass unmet gates.
13. Physical dice report uncertainty only; they do not create missing prerequisites.
14. Child free-form solutions remain valid.
15. Critical beat has valid dramatic timing/expiry.
16. Resource availability is not action completion.
17. Interactive node has purpose/stakes/resolvedWhen/payoff/worldEffects.
18. Promised payoff is implemented in world state.
19. Generic progress counts are invalid.
20. Random unrelated puzzle/mechanic attachment is invalid.
21. Blocking obstacle cannot softlock without retreat/fail-forward.
22. Open narrator content has explicit improv contract.
23. Critical state never depends on untracked improv.
24. Subject/role pairing is explicitly compatible.
25. Repeated subject/role is penalized unless repetition is meaningful.
26. Interaction shell never leaks unrevealed knowledge.
27. Possession never auto-fills/auto-uses an action-bearing slot/gate.
28. Typed action is validated before state effect.
29. Repeated action ID must not duplicate critical effect once idempotency is implemented.
30. Undoable composite actions restore all affected resource/world state atomically.

## Generation pipeline
1. Select Adventure Blueprint.
2. Expand narrative functions/phases.
3. Select compatible subject + Storylets.
4. Bind requirements and provider plans.
5. Validate provider graph, phases, knowledge, purpose/payoff and improv boundaries.
6. Allocate suitable rooms.
7. Materialize Storylets, provider events, knowledge reveals and world effects.
8. Materialize interaction shell declarations and semantic DM metadata.
9. Add gate/climax.
10. Run full graph/world validation.
11. Add ambient encounters/optional finds only after critical graph is valid.
12. Filter ambient content against phase/resolved state.

## Reference: CRYSTAL_MACHINE
Target:

`SETUP -> QUEST_REVEAL -> {RED, BLUE, YELLOW acquisitions} -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Reference acquisition diversity:
- one `SEARCH_SECRET`,
- one `NPC_FAVOR`,
- one `GUARDIAN`.

All crystals owned makes `ASSEMBLE` available, not complete.

Assembly uses `SLOT_GATE/ASSEMBLY` shell:
- three sockets known only after reveal,
- child places crystals deliberately,
- partial placement persists,
- activation/gate state follows authored completion rule.

Bounded improv may color dialogue but cannot determine crystal existence/location/completion.

## DM materialization
Narrator/DM view must expose in human language:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- authored vs improv boundary.

Safe semantic controls include accepted solution, uncertainty/die, negotiation, optional combat and authored outcome application.

## Failure policy
Generation fails/retries rather than silently:
- creating unavailable requirement,
- creating circular provider chain,
- relying on lucky critical loot,
- relying on one mandatory social roll,
- auto-completing action from owned resource,
- attaching unrelated puzzle,
- adding filler progress,
- claiming payoff without state effect,
- leaking hidden answer through shell,
- delegating critical causality to narrator improv.

## Human vs procedural responsibility
Humans curate:
- subject identity/personality,
- compatible roles,
- purpose/stakes/resolution/payoff,
- requirements/provider compatibility,
- outcomes/world effects,
- puzzles/clues,
- combat capability,
- interaction-shell semantics,
- narrator-improv bounds,
- timing and nonsense bans.

Generator may choose:
- compatible Storylet variant,
- provider plan among valid routes,
- eligible placement,
- safe ordering among parallel branches,
- cosmetic allowed variation,
- ambient content after critical validation.

Forteller improvises only within explicit authored open spaces and interprets plausible child actions. Forteller is not responsible for fixing missing causal logic.

## Related canonical docs
- `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/INTERACTION_SHELLS_V1.md`
- `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
- `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`

If procedural coherence requires growing special-case rules faster than a curated scenario bank would, prefer more hand-authored scenario skeletons.
