# CRYSTAL_MACHINE Reference Scenario V1

Status: reference acceptance target for Narrative Graph V1. This is not a single fixed adventure script; it is the quality bar the generator must be able to reproduce structurally.

## Premise
An old crystal machine is sealed behind a story gate. The machine visibly lacks three colored crystals: red, blue and yellow.

The child should understand the objective from the fiction before the UI expects them to act on it.

## Beat 1 - reveal the requirement
The first meaningful encounter with the gate/machine must describe the missing parts in-world.

Reference narration:

> I steinen er det tre små tomme fester. Rundt det ene gløder en rød ring, rundt det andre en blå og rundt det tredje en gul.

Narrator guidance:
- describe what is visible,
- do not immediately tell the child the solution,
- allow the child to infer that three matching objects are missing,
- after this reveal, the quest tracker may show red/blue/yellow crystal as known targets.

Before this reveal, the UI must not behave as if the child already knows the exact three-part requirement.

## Beat 2 - hidden crystal
One crystal is acquired through `SEARCH_SECRET`.

Required qualities:
- the room contains a concrete sign before the child searches,
- the sign is related to the crystal color/material,
- the crystal name is not leaked before discovery,
- uncertain search may use physical D6,
- one low result strengthens the clue,
- repeated low searching fail-forwards and cannot softlock the critical item.

Reference fiction:
- colored light flashes through a crack,
- small matching shards lie nearby,
- touching the wall makes the light move.

## Beat 3 - NPC crystal
One crystal is acquired through `NPC_FAVOR`.

Required qualities:
- the NPC visibly has, wears, guards or knows how to reach the crystal,
- the NPC has a concrete reason not to simply hand it over immediately,
- the favor refers to a real reachable dependency generated into the map,
- the favor is short enough to feel like a branch inside the adventure, not a second full campaign,
- helping the NPC causes an explicit payoff and transfers the crystal.

Reference structure:
1. Meet NPC with crystal.
2. NPC explains a small problem.
3. A linked room/resource is revealed.
4. Child solves the problem in any plausible way.
5. NPC gives crystal with a reason.

The dependency may not be the same crystal, may not be behind the final gate and may not rely on a random optional UX5A find.

## Beat 4 - guardian crystal
One crystal is acquired through `GUARDIAN`.

Required qualities:
- the crystal is visibly connected to the creature/guardian,
- the creature has a motive, not merely hit points,
- at least one non-combat affordance is authored,
- free-form child solutions remain valid,
- combat appears only if the child chooses combat or fiction naturally escalates there.

Reference guardian:
A creature contains or protects the glowing crystal and reacts strongly to light, music, food, play, fear, friendship or another concrete motive. The child can use that motive to change the situation.

## Beat 5 - return and assemble
After all three crystals are acquired:
- the graph marks the gate requirement as satisfied,
- returning to the machine should matter,
- the child should get to place/activate the parts in fiction,
- the app must not silently auto-complete the assembly just because inventory contains all three.

Reference narration:

> De tre tomme festene lyser i de samme fargene som krystallene dere bærer.

The child may decide which crystal goes in first unless order is an authored puzzle.

## Beat 6 - payoff
Once assembled:
- machine reacts clearly,
- gate/path opens,
- the story acknowledges the three different things the child did to get here,
- climax becomes reachable only now.

## Knowledge states
Suggested states:
- `CRYSTAL_REQUIREMENT_UNKNOWN`
- `CRYSTAL_REQUIREMENT_REVEALED`
- `RED_KNOWN / RED_FOUND`
- `BLUE_KNOWN / BLUE_FOUND`
- `YELLOW_KNOWN / YELLOW_FOUND`
- `ALL_CRYSTALS_FOUND`
- `MACHINE_ASSEMBLED`

A resource may be discoverable before the main reveal, but the narrator/UI must then describe it as an interesting object rather than retroactively pretending the child already knew its purpose.

## Structural acceptance
Automated generation must prove:
- all three acquisition nodes are reachable before the gate,
- all dependencies of each acquisition node are also reachable before the gate,
- no required resource depends on generic optional search loot,
- no acquisition branch depends on itself or another later branch in a cycle,
- at least three acquisition families are used by default,
- each critical node has setup/signal/action/payoff metadata,
- the gate is impossible to satisfy without the three actual resources,
- secret paths cannot bypass the gate,
- Adventure Code reconstruction produces the same critical graph.

## Editorial acceptance
Automated tests are necessary but insufficient. Before this architecture is copied to the other blueprints, manually play at least 10 generated Crystal Machine adventures and judge:
- was the goal understood from the fiction,
- did each crystal feel like a small story rather than loot,
- did the three branches feel meaningfully different,
- did the narrator know what to say and what mattered,
- were there obvious free-form child solutions,
- did returning to the machine feel like a payoff,
- did any combination feel absurd even though it was structurally valid.

Any recurrent absurd combination must be fixed through storylet compatibility/editorial rules, not patched with ad-hoc narrator improvisation.