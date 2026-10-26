# Narrative Graph V1

Status: **DESIGN LOCK CANDIDATE - prep only, no runtime implementation yet**
Branch: `narrative/story-graph-v1-prep`

## Why this exists
Live playtest exposed several versions of the same architecture failure:
- `CRYSTAL_MACHINE`: three required parts can be structurally reachable yet feel like unrelated pickups,
- `SKYGGEHEKSA`: an individually valid complication can arrive after its dramatic purpose is gone,
- keyed door: a valid dependency can be auto-applied instead of preserving the child's choice,
- `REGNBUENETTET`: a mechanically interactive encounter can have no meaningful obstacle, solve condition or payoff,
- `BOKA SOM SKRIVER TILBAKE`: intentionally open narrator creativity can look like missing hidden app content when the handoff is not explicit.

Narrative Graph V1 replaces the mental model `scenario -> place required objects/events` with:

`blueprint -> narrative functions -> compatible storylets -> map placement -> player knowledge -> child action -> world change/payoff`

The map remains procedural. Critical story causality does not. Possessing a resource enables an action; it does not perform the action. A node being mechanically present is not enough; it needs a reason to exist in the fiction. Narrator creativity is allowed, but the boundary between tracked story logic and intentional improvisation must be explicit.

## Core rule
Every story-critical objective must satisfy:

**SETUP -> SIGNAL -> ACTION -> PAYOFF**

Every interactive critical node/storylet must also answer:
- **PURPOSE** - why this scene exists,
- **STAKES** - what is affected while unresolved,
- **RESOLVED WHEN** - what fictional state counts as completion,
- **PAYOFF / WORLD EFFECT** - what changes after completion.

No required object, clue, NPC task, guardian, puzzle, obstacle or gate may exist only as an unexplained event marker or arbitrary progress counter.

`ACTION` is real state. `requires[]` becoming true does not imply the child performed the action.

Examples:
- owns `GLASSNØKKEL` -> key use becomes possible; door does not open,
- owns all three crystals -> `ASSEMBLE` becomes possible; machine is not assembled,
- understands guardian motive -> new approaches become possible; guardian does not auto-resolve.

Story-critical beats also have valid dramatic time windows. A complication may not first activate after the objective it exists to affect is already resolved unless separately authored with a new later role.

## Core concepts

### StoryGraph
Directed graph of story-critical beats for one generated adventure.

Minimum fields:
- `graphVersion`
- `blueprintId`
- `nodes[]`
- `edges[]`
- `knowledge[]`
- `resources[]`
- `gate`
- `payoff`
- `phase`

### Dramatic phase
Initial phases:
- `INTRO`
- `QUEST_ACTIVE`
- `RETURN`
- `CLIMAX`
- `AFTERMATH`

A node/storylet may declare:
- `validPhases[]`
- `activatesAfter[]`
- `expiresAfter[]`

### StoryNode
A required or optional narrative beat.

Minimum fields:
- stable `id`
- `role`
- `critical`
- `storyletId`
- `roomId`
- `provides[]`
- `requires[]`
- `reveals[]`
- `state`
- `completion`
- `purpose`
- `stakes`
- `resolvedWhen`
- `payoff`
- `worldEffects[]`
- `validPhases[]`
- optional `expiresAfter[]`
- optional `progressStages[]`
- optional `narratorImprov`

`completion` is the explicit state transition that completes the node. Action-bearing nodes may not complete merely because requirements became available.

`progressStages[]` is optional and semantic. It may exist only when author can name actual meaningful intermediate state changes. A generic number such as “3 steps because normal / 4 because exciting” is invalid.

`narratorImprov`, when present, is a bounded authoring contract for intentionally open details. Minimum conceptual fields:
- `prompt`: what Forteller is invited to invent,
- `allowedScope`: e.g. atmosphere, optional hint, side discovery, cosmetic motive/detail,
- `forbiddenScope`: tracked prerequisites, mandatory resources, completion state, world effects unless separately authored,
- `hiddenAnswer: false` for truly open details.

The narrator view must expose this handoff. The child-facing fiction need not reveal the meta distinction.

Initial roles:
- `SETUP`
- `QUEST_REVEAL`
- `ACQUIRE`
- `NPC_FAVOR`
- `GUARDIAN`
- `SEARCH_SECRET`
- `PUZZLE_REWARD`
- `ENVIRONMENT`
- `FOLLOW_CLUE`
- `COMPLICATION`
- `RETURN`
- `ASSEMBLE`
- `GATE`
- `CLIMAX`
- `AFTERMATH`

### Storylet
Curated small narrative module that declares compatibility, signals, approaches, completion semantics, timing and world effect.

A storylet is not a full adventure. Humans curate storylets; generator combines only compatible ones.

### Resource
A thing/state the graph can require/provide, e.g. `CRYSTAL_RED`, `NPC_FAVOR_COMPLETE`, `GUARDIAN_RESOLVED`.

Resource availability and action completion are separate. Owning `CRYSTAL_RED` can satisfy a requirement for `ASSEMBLE`; it cannot complete `ASSEMBLE`.

### Knowledge
Truth and player knowledge are separate. UI/narrator may expose only facts whose reveal condition has happened.

## Encounter/storylet purpose contract
The UX5A `REGNBUENETTET` finding is an architecture invariant, not a local trap special case.

For any Storylet/node that creates an interactive scene:
- `purpose` describes its dramatic/gameplay function,
- `stakes` describes what is currently constrained, threatened, offered or changed,
- `resolvedWhen` describes fictional state that qualifies as completion,
- `payoff` describes narrated result,
- `worldEffects[]` describes actual state transition used by game world.

A claimed obstacle must actually constrain relevant world state. A claimed payoff must actually become true in state. A blocking net may prevent onward movement while allowing retreat; resolving it removes that block.

A puzzle must have an authored relationship to its Storylet. “This node is MYSTISK, therefore choose any puzzle” is invalid.

Progress tracking is optional. If `progressStages[]` is absent, one sufficiently strong child plan may complete node if it satisfies `resolvedWhen`. If stages exist, each names an authored meaningful fictional transition; narrator is never asked to invent filler steps.

## Explicit narrator-improvisation contract
The UX5A `BOKA SOM SKRIVER TILBAKE` finding establishes a second architecture invariant: **intentional openness is valid, ambiguous authorship responsibility is not.**

A Storylet may deliberately leave a detail for Forteller to invent. When it does:
- this openness is authored and declared, not inferred from missing payload,
- narrator view states that no hidden app answer/larger predetermined plan exists for the open detail,
- narrator receives a scene-specific prompt and guardrails,
- optional improvised detail may reuse established story facts for flavor or a non-critical hint,
- child-facing presentation remains immersive,
- no critical prerequisite, required resource, completion rule, phase transition or promised world effect may depend on an untracked improvised fact.

Example: an ambient writing book may let Forteller invent its sentence. A critical clue book that must reveal `CRYSTAL_BLUE_LOCATION` cannot simply say “Forteller invents a clue”; the required clue payload/reveal state must be authored and tracked. Forteller may still improvise wording/color around that tracked fact.

## Hard invariants
1. Every critical node has an earlier setup/signal path.
2. Every critical resource is obtainable before the gate requiring it.
3. Generic UX5A optional finds never satisfy story-critical graph requirements.
4. Critical hidden/search node has discoverable clue + fail-forward.
5. Critical NPC task requirements exist and are reachable.
6. Guardian has at least one authored non-combat resolution family.
7. Required puzzle is thematically/causally connected and exposes narrator hint/answer guidance.
8. Three-part collect defaults to distinct play families unless blueprint explicitly permits repetition.
9. Critical storylets generate before ambient content.
10. Hidden shortcuts never bypass unmet story gates.
11. Physical dice report uncertainty only; lucky roll cannot replace unmet graph requirement.
12. Free-form child solutions remain valid; authored approaches are affordances, not a closed list.
13. Every critical obstacle/antagonist/complication has a valid dramatic time window.
14. Objective completion expires/transforms dependent obsolete pre-resolution beats.
15. Later reuse of a character requires explicitly authored later purpose.
16. Ambient selection respects current phase/resolved story state.
17. Resource availability is not action completion.
18. Interactive critical node/storylet has `purpose`, `stakes`, `resolvedWhen`, `payoff`, coherent `worldEffects[]`.
19. `worldEffects[]` must make promised payoff true; resolving node may not be UI-only bookkeeping.
20. `progressStages[]`, if present, contains authored meaningful fictional stages. Generic default counts are invalid.
21. A Storylet may not receive random puzzle/mini-mechanic without authored contextual role.
22. Authored blocking obstacle has non-softlocking topology/state policy: safe retreat or explicit escape/fail-forward.
23. Intentionally open narrator content declares a `narratorImprov`-style contract; missing payload must not masquerade as a hidden authored answer.
24. Critical requirements/completion/payoff/world effects may not depend on untracked narrator improvisation.
25. If an improvised detail is allowed to reference tracked story facts, those facts must already be known/valid; improvisation may phrase or color them but not invent contradictory state.

## Generation pipeline
1. Select Adventure Blueprint.
2. Expand into narrative functions/phases.
3. Select compatible Storylets.
4. Validate resources, action completion, purpose contract, narrator-improv boundaries and phase windows before map placement.
5. Allocate suitable rooms.
6. Materialize storylet events, world effects and narrator metadata.
7. Create knowledge reveal rules.
8. Add gate/climax.
9. Run graph validation including stale-event, resource-vs-action, purpose/payoff, authored-progress and improv-boundary checks.
10. Add ambient encounters/optional secrets/search finds only after critical graph is valid.
11. Filter ambient content against phase/resolved flags.
12. Run world/map validation including bypass, temporal ordering and promised world effects.

## Interaction/materialization rule
When a node becomes actionable, UI exposes fictional situation and relevant affordances without performing action.

Examples:
- locked door + owned key -> show locked door; child may choose key,
- owned crystals -> show sockets; child chooses placement/activation,
- guardian motive known -> child acts on knowledge; no auto-resolution,
- NPC requirement fulfilled -> return/interact for acknowledgement/reward unless explicitly authored otherwise,
- blocking environment -> actually block authored path/state while unresolved; resolution releases it,
- intentionally open ambient mystery -> child sees mystery; narrator sees explicit bounded improv prompt and knows there is no hidden answer.

Narrator view should expose purpose/stakes/resolvedWhen/payoff in human language and explicitly label narrator-improvisation where authored.

Hints should progress from open prompt (`HVA VIL DU GJØRE?`) to affordance-level hints before naming an intended solution.

## Failure policy
Generation fails/retries if hard invariants cannot be satisfied. It must not silently:
- degrade critical Storylet to bare pickup,
- leave obsolete complication active,
- auto-complete child action from prerequisites,
- attach unrelated puzzle,
- add generic filler progress,
- claim a world-state payoff without applying it,
- imply a hidden authored answer when content is actually intentionally improvised,
- delegate critical causal logic to untracked narrator improvisation.

## Reference example: CRYSTAL_MACHINE
Target graph:
`SETUP -> QUEST_REVEAL -> {RED, BLUE, YELLOW acquisition branches} -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Reference acquisition diversity:
- one `SEARCH_SECRET`
- one `NPC_FAVOR`
- one `GUARDIAN`

All three crystals owned makes `ASSEMBLE` available, not complete. Deliberate assembly provides `MACHINE_ASSEMBLED`, which enables gate.

Each acquisition Storylet states why scene exists, what is at stake, what completion looks like and what changes when crystal is acquired.

Bounded improv may color NPC dialogue, guardian personality or incidental details, but the actual crystal dependency, clue/reveal, completion and reward transfer remain tracked.

If antagonist interferes with collection, beat occurs during active collection and expires/changes purpose after assembly.

## Human vs procedural responsibility
Humans curate:
- premises/motives/clues,
- purpose/stakes/resolution/payoff,
- world effects,
- meaningful progress stages,
- compatibility/timing,
- alternative approaches,
- narrator-improv prompts/guardrails where intentionally open,
- nonsensical combination bans.

Generator may decide:
- which compatible Storylet variant,
- eligible room placement,
- safe ordering among parallel branches,
- cosmetic allowed variation,
- ambient side content outside critical nodes.

Forteller may improvise only within explicit authored open spaces. Forteller is not responsible for repairing missing critical causality.

If coherent purpose/payoff cannot survive procedural combination without many special cases, prefer more hand-authored scenario skeletons.

## Implementation gate
Do not implement Narrative Graph runtime until UX5A physical device gate is green and UX5A is merged to `main`. This prep branch remains architecture/spec/test-design only.
