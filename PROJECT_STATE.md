# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A patch 13 encounter-purpose follow-up + physical iPad/mobile retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction now locked
Monsterhulen prioritizes coherent, memorable adventures over combinatorial volume.

The child proposes actions. The app presents problems, signals, constraints and affordances, but does not silently perform a known solution. One physical place has one visible canonical room name.

An encounter must have an authored fictional function before mechanics are attached. Generated non-treasure encounters require:
- `purpose`,
- `stakes`,
- `resolvedWhen`,
- `payoff`.

A progress track is permitted only for explicit authored `progressStages`. Generic 3/4-box duration is forbidden. Resolving an obstacle must change usable world state. Puzzles require contextual purpose and may not be randomly attached merely because an encounter is `MYSTISK`.

Physical dice report uncertainty about a current attempt. A die result never substitutes for an unmet prerequisite or automatically resolves a whole encounter.

Critical story contract remains **SETUP -> SIGNAL -> ACTION -> PAYOFF**.

## UX5A current runtime state
Canonical patch order is on the runtime branch in `patches/README.md`.

Latest layers:
- patch 10: initial device findings,
- patch 11: explicit story-key use,
- patch 12: single visible location identity,
- patch 13: encounter purpose contract.

Patch 13 responds to physical play with `REGNBUENETTET`, where four generic `ANNEN LØSNING` boxes had no authored meaning and solving them changed nothing.

Current runtime behavior:
- no generic ambient progress boxes,
- progress only for authored stages,
- narrator receives `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`,
- traps block onward travel while active but allow retreat,
- resolving a trap actually restores onward movement,
- `REGNBUENETTET` is the reference obstacle,
- ambient mystery puzzles are opt-in instead of automatic,
- puzzle solving does not feed generic progress automatically.

## UX5A verification after patch 13
Automated evidence:
- encounter-purpose QA: **4337 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2295 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5809 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-13 behavioral reconstruction SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch-13 SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

The content-regression count decreased intentionally because ambient random mystery puzzles are no longer generated. These hashes are behavioral reconstruction artifacts, not release-baseline byte claims.

Fresh current browser QA remains pending; historical Chromium results do not certify patches 11-13. Physical iPad/mobile retest remains required.

## Physical UX5A gate now
At minimum verify:
1. trap scene has no generic four-box progress,
2. narrator understands purpose/solve/payoff without knowing system internals,
3. active trap blocks onward travel and allows retreat,
4. one sufficient child plan may solve it,
5. resolving it actually opens onward travel,
6. ambient mysteries do not surface disconnected random puzzles,
7. single-location identity remains clear,
8. explicit-key flow remains child-driven,
9. remaining UX5A device smoke is green.

Do not merge UX5A until this physical gate is green.

## Narrative architecture implication
`CRYSTAL_MACHINE` showed causal weakness, `SKYGGEHEKSA` showed temporal invalidity, and `REGNBUENETTET` showed purpose/payoff failure at encounter scale.

Narrative Graph V1 must therefore model not only dependencies/knowledge/phases but also the semantic role of interactive beats. Storylets/encounter-like nodes need explicit purpose, stakes, resolution condition and payoff/world effect. Progress is authored semantics, not a default counter.

## CRYSTAL_MACHINE reference experiment
Target:
`SETUP -> QUEST_REVEAL -> three parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Default mix:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

The machine reveals missing sockets before UI assumes knowledge. Assembly is deliberate, not automatic inventory completion.

Do not convert another blueprint until the experiment passes structural/browser/manual editorial gates.

## UX5B is deferred
UX5B is not next. It should later consume explicit Narrative Graph state.

## Repository health
Repository-health remains open. Complete runtime/source/assets are not yet directly reconstructable byte-identically from ordinary repo files.

## Exact next action
While physical UX5A playtest continues:
- fix UX5A defects only on `ux5/searchable-rooms-encounter-tracks`,
- physically retest patch-13 candidate,
- keep Narrative Graph work documentation-only here,
- do not merge UX5A,
- do not implement Narrative Graph runtime,
- do not start UX5B.

When user reports UX5A physical GREEN:
1. record physical pass,
2. rerun/confirm relevant regressions,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged `main`,
6. carry approved prep docs over,
7. start `WP-NG1` graph data model + validator.
