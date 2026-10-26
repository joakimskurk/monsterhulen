# CRYSTAL_MACHINE Reference Scenario V1

Status: reference acceptance target for Narrative Graph V1. This is not a single fixed adventure script; it is the quality bar the generator must be able to reproduce structurally.

## Premise
An old crystal machine is sealed behind a story gate. The machine visibly lacks three colored crystals: red, blue and yellow.

The child should understand the objective from the fiction before the UI expects them to act on it.

A resource being known or owned only makes an action possible. It does not mean the app performs the action. The child remains the one who decides what to try.

## Beat 1 - reveal the requirement
The first meaningful encounter with gate/machine must describe missing parts in-world.

Reference narration:
> I steinen er det tre små tomme fester. Rundt det ene gløder en rød ring, rundt det andre en blå og rundt det tredje en gul.

Narrator guidance:
- describe what is visible,
- do not immediately tell child the solution,
- allow child to infer that three matching objects are missing,
- after reveal, quest tracker may show red/blue/yellow crystal as known targets.

Before reveal, UI must not behave as if child already knows exact requirement.

## Beat 2 - hidden crystal
One crystal is acquired through `SEARCH_SECRET`.

Required qualities:
- concrete sign before child searches,
- sign related to crystal color/material,
- crystal name not leaked before discovery,
- uncertain search may use physical D6,
- first low strengthens clue,
- repeated low fails forward,
- discovery still requires an explicit search/take interaction; merely entering room does not silently add crystal.

Reference fiction:
- colored light flashes through a crack,
- matching shards lie nearby,
- touching wall makes light move.

## Beat 3 - NPC crystal
One crystal is acquired through `NPC_FAVOR`.

Required qualities:
- NPC visibly has/wears/guards/knows how to reach crystal,
- concrete reason not to hand it over immediately,
- favor refers to real reachable dependency,
- favor short enough to be branch, not second campaign,
- helping NPC causes explicit payoff and transfer.

Reference structure:
1. Meet NPC with crystal.
2. NPC explains small problem.
3. Linked room/resource is revealed.
4. Child solves problem in any plausible way.
5. Child returns/interacts as fiction requires.
6. NPC explicitly gives crystal with a reason.

Completing the dependency does not silently teleport reward into inventory unless a specific storylet explicitly authors such a payoff.

## Beat 4 - guardian crystal
One crystal is acquired through `GUARDIAN`.

Required qualities:
- crystal visibly connected to guardian,
- creature has motive, not merely hit points,
- at least one non-combat affordance authored,
- free-form child solutions remain valid,
- combat only if child chooses it or fiction naturally escalates,
- learning guardian's motive does not auto-resolve it; child acts on that knowledge.

Reference guardian:
A creature contains or protects the glowing crystal and reacts strongly to light, music, food, play, fear, friendship or another concrete motive. The child can use that motive to change the situation.

## Beat 5 - return and assemble
After all three crystals are acquired:
- graph marks all acquisition requirements satisfied,
- `ASSEMBLE` becomes actionable but remains incomplete,
- returning to machine matters,
- child gets to place/activate parts in fiction,
- app must not silently auto-complete assembly just because inventory contains all three.

Reference narration:
> De tre tomme festene lyser i de samme fargene som krystallene dere bærer.

The child may decide which crystal goes in first unless order is an authored puzzle.

This is the reference example for the project-wide agency rule: **availability is not action**.

## Beat 6 - payoff
Only after explicit assembly:
- machine reacts clearly,
- `MACHINE_ASSEMBLED` becomes true,
- gate/path opens,
- story acknowledges the different things child did,
- climax becomes reachable.

## Knowledge/action states
Suggested states:
- `CRYSTAL_REQUIREMENT_UNKNOWN`
- `CRYSTAL_REQUIREMENT_REVEALED`
- `RED_KNOWN / RED_FOUND`
- `BLUE_KNOWN / BLUE_FOUND`
- `YELLOW_KNOWN / YELLOW_FOUND`
- `ALL_CRYSTALS_FOUND`
- `ASSEMBLY_AVAILABLE`
- `MACHINE_ASSEMBLED`

`ALL_CRYSTALS_FOUND` and `MACHINE_ASSEMBLED` must remain distinct.

A resource may be discoverable before main reveal, but narrator/UI then describes it as an interesting object rather than pretending child already knew its purpose.

## Hinting rule
When child is stuck, guidance should normally escalate gradually:
1. restate visible fiction,
2. ask what child wants to try,
3. point to a category of affordance (`KANSKJE NOE DERE HAR KAN HJELPE?`),
4. only become more explicit when actually needed.

Do not immediately convert authored knowledge into a closed answer button.

## Structural acceptance
Automated generation must prove:
- all three acquisition nodes reachable before gate,
- all dependencies reachable before gate,
- no required resource depends on generic optional search loot,
- no acquisition branch cycles,
- at least three acquisition families by default,
- each critical node has setup/signal/action/payoff metadata,
- action-bearing nodes have explicit completion semantics,
- all crystals owned does not auto-complete `ASSEMBLE`,
- gate impossible to satisfy before explicit assembly,
- secret paths cannot bypass gate,
- Adventure Code reconstruction produces same critical graph.

## Editorial acceptance
Before architecture is copied to other blueprints, manually play at least 10 generated Crystal Machine adventures and judge:
- was goal understood from fiction,
- did each crystal feel like a small story rather than loot,
- did branches feel meaningfully different,
- did narrator know what to say and what mattered,
- were there obvious free-form child solutions,
- did UI leave child room to choose actions rather than auto-solving known dependencies,
- did returning/assembly feel like payoff,
- did any combination feel absurd despite structural validity.

Any recurrent absurd combination must be fixed through storylet compatibility/editorial rules, not ad-hoc narrator repair.
