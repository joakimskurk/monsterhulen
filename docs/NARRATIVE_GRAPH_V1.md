# Narrative Graph V1

Status: **DESIGN LOCK CANDIDATE - prep only, no runtime implementation yet**
Branch: `narrative/story-graph-v1-prep`

## Why this exists
Live playtest of `CRYSTAL_MACHINE` exposed a structural problem: the current generator can place three required parts safely, but it does not guarantee that those parts belong to meaningful, causally connected scenes. `planCollect()` currently chooses three reachable rooms and places one `DEL` event in each. Those rooms are then treated as story-critical and excluded from normal ambient encounter generation. The result is structurally valid but can feel like three unrelated pickups.

A second live playtest exposed the temporal version of the same problem: an antagonist/complication (`SKYGGEHEKSA`) that was supposed to make the objective harder could still be encountered after the objective had already been completed. The content was individually valid, but dramatically obsolete.

Narrative Graph V1 replaces the mental model `scenario -> place required objects` with:

`blueprint -> narrative functions -> compatible storylets -> map placement -> player knowledge -> payoff`

The map remains procedural. Critical story causality does not.

## Core rule
Every story-critical objective must satisfy:

**SETUP -> SIGNAL -> ACTION -> PAYOFF**

No required object, clue, NPC task, guardian or gate may exist only as an unexplained event marker.

Story-critical beats also have a valid dramatic time window. A complication may not first activate after the objective it exists to obstruct has already been resolved unless it is explicitly authored as `AFTERMATH`.

## Core concepts

### StoryGraph
A directed graph of story-critical beats for one generated adventure. It describes causality and prerequisites, not exact prose layout.

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
The graph has an explicit current dramatic phase. Initial phases:
- `INTRO`
- `QUEST_ACTIVE`
- `RETURN`
- `CLIMAX`
- `AFTERMATH`

A node or storylet may declare:
- `validPhases[]`
- `activatesAfter[]`
- `expiresAfter[]`

This prevents logically stale encounters. Example: an antagonist whose function is to hinder crystal collection can be valid during `QUEST_ACTIVE`, but expires once all crystals are assembled. If that antagonist is meant to return later, that must be a separately authored `AFTERMATH` or `CLIMAX` beat with new purpose and payoff.

### StoryNode
A required or optional narrative beat.

Minimum fields:
- stable `id`
- `role`
- `critical` boolean
- `storyletId`
- `roomId`
- `provides[]`
- `requires[]`
- `reveals[]`
- `state`
- `validPhases[]`
- optional `expiresAfter[]`

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
A curated small narrative module that knows what it can provide, what it requires, how it signals itself, what approaches it supports, when in the story it is valid and what state transition completes it.

A storylet is not a full adventure. Humans curate storylets. The generator combines only compatible storylets.

### Resource
A story-critical or optional thing the graph can require or provide.

Examples:
- `CRYSTAL_RED`
- `CRYSTAL_BLUE`
- `CRYSTAL_YELLOW`
- `NPC_FAVOR_COMPLETE`
- `GUARDIAN_RESOLVED`
- `DOOR_REVEALED`
- `MYSTERY_CLUE_2`

### Knowledge
Truth and player knowledge are separate.

A fact may be true in the graph before the child knows it. Example:
- truth: the machine needs red, blue and yellow crystals
- known before reveal: none
- known after seeing the machine: all three colors

The UI and narrator guidance may only expose facts whose reveal condition has happened.

## Hard invariants
1. Every critical node has at least one earlier setup or signal path.
2. Every critical resource is obtainable before the gate that requires it.
3. Generic UX5A optional room finds can never satisfy story-critical graph requirements.
4. A critical hidden/search node must have an explicit discoverable clue and fail-forward completion path.
5. A critical NPC task must point to requirements that actually exist in the generated map.
6. A guardian storylet must define at least one non-combat resolution family. Combat may remain possible when fiction supports it.
7. A puzzle required for progression must be thematically connected to the current storylet and must expose narrator hint/answer guidance.
8. The generator may not reuse the same acquisition family for all required parts when three or more parts exist unless the blueprint explicitly permits it.
9. For a three-part collect blueprint, default diversity target is three distinct play families.
10. Critical storylets are generated before ambient content. Ambient content must route around them, not overwrite them.
11. Hidden shortcuts and optional secrets may never bypass an unmet story gate.
12. Physical dice still report uncertainty only. A lucky roll cannot replace an unmet graph requirement.
13. Free-form child solutions remain valid. Storylet approaches are affordances, never a closed answer list.
14. Every story-critical obstacle, antagonist and complication has an explicit dramatic validity window. It may not first activate after the objective it exists to obstruct is already resolved.
15. Completing a critical objective expires or transforms dependent unresolved complications. They must not remain as contextless leftover encounters.
16. Post-resolution appearances are allowed only when explicitly authored as `CLIMAX` or `AFTERMATH` with a new narrative purpose. A stale pre-resolution encounter may never simply spill into the post-resolution phase.
17. Ambient encounter selection must also respect current phase and resolved story flags when its prose references a critical objective.

## Generation pipeline
1. Select curated Adventure Blueprint.
2. Expand blueprint into required narrative functions and dramatic phases.
3. Select compatible storylets from the Storylet Matrix.
4. Validate resource dependencies and phase windows before touching the map.
5. Allocate suitable pre-gate rooms for each critical node.
6. Materialize storylet-specific events and narrator metadata into those rooms.
7. Create player-knowledge reveal rules.
8. Add gate and climax.
9. Run structural graph validation, including stale-event/phase validation.
10. Only then add ambient encounters, optional secrets and UX5A searchable-room finds.
11. Filter ambient content against current phase and critical resolution flags.
12. Run world/map validation again, including bypass and temporal-order checks.

## Failure policy
Generation fails and retries with a new layout/storylet combination if any hard invariant cannot be satisfied. It must not silently degrade a critical storylet into a bare pickup or leave an obsolete complication active after its purpose has disappeared.

## Reference example: CRYSTAL_MACHINE
Target graph:

`SETUP -> QUEST_REVEAL -> {RED, BLUE, YELLOW acquisition branches} -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Reference acquisition diversity:
- one `SEARCH_SECRET`
- one `NPC_FAVOR`
- one `GUARDIAN`

The three exact colors may rotate between these functions by seed if all authored text remains coherent.

If a recurring antagonist is used to interfere with crystal collection, that beat must occur while the collection quest is active. Once the crystals are assembled, that specific complication expires. A later return by the same character would require a separately authored climax/aftermath storylet with a new reason to be there.

## Human vs procedural responsibility
Humans must curate:
- storylet premises
- motives
- clues
- payoff prose
- compatibility tags
- phase/expiry rules
- child-appropriate alternative approaches
- what combinations are narratively nonsensical

The generator may decide:
- which compatible storylet variant is used
- which eligible room hosts it
- safe ordering among parallel branches
- cosmetic names/details allowed by the storylet
- ambient side content outside critical nodes

This is intentionally a hybrid system. Pure combinatorial generation is not considered sufficient for guaranteed story quality.

## Implementation gate
Do not implement Narrative Graph runtime code until UX5A physical device gate is green and UX5A has been merged to `main`. This prep branch may contain only architecture/spec/test-design documents.