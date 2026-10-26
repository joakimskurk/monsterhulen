# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A patch 14 explicit narrator-improvisation follow-up + physical iPad/mobile retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction now locked
Monsterhulen prioritizes coherent, memorable adventures over combinatorial volume.

The child proposes actions. The app presents problems, signals, constraints and affordances, but does not silently perform a known solution. One physical place has one visible canonical room name.

An encounter must have an authored fictional function before mechanics are attached. Generated non-treasure encounters require `purpose`, `stakes`, `resolvedWhen`, `payoff`. Progress is allowed only for authored `progressStages`; generic duration boxes are forbidden. Resolving an obstacle changes usable world state. Puzzles require contextual purpose.

Intentional narrator improvisation is a valid authored mode. When a scene deliberately leaves a detail open, Forteller must be told explicitly that there is no hidden app answer/larger predetermined plan for that detail, what to invent, and what boundaries apply. Optional improv may add atmosphere, optional hints or side discoveries; it may not create new mandatory story state or contradict tracked facts.

A memorable **subject** and its **Storylet role** are separate. `BOKA SOM SKRIVER TILBAKE` may support several pre-authored compatible roles across adventures: open mystery/improv, NPC-like dialogue, tracked clue, puzzle/gate carrier or item/reward wrapper. Compatible magical subjects such as a talking doll or living portrait may use the same model. This is curated reuse, not arbitrary combinatorial mixing: critical roles remain tracked, subject/Storylet identities remain separate/stable, and repeated use of the same recognizable subject should be penalized when alternatives exist.

Physical dice report uncertainty about a current attempt. A die result never substitutes for an unmet prerequisite or automatically resolves a whole encounter.

Critical story contract remains **SETUP -> SIGNAL -> ACTION -> PAYOFF**.

## UX5A current runtime state
Canonical patch order is on runtime branch in `patches/README.md`.

Latest layers:
- patch 10: initial device findings,
- patch 11: explicit story-key use,
- patch 12: single visible location identity,
- patch 13: encounter purpose contract,
- patch 14: explicit narrator improvisation.

Patch 13 responds to `REGNBUENETTET`: no generic ambient progress, purpose/solve/payoff guidance, real trap blocking with retreat, actual route release, no random ambient puzzle attachment.

Patch 14 responds to `BOKA SOM SKRIVER TILBAKE`: the scene intentionally has no predetermined hidden message, so narrator mode now labels it as `FORTELLER-IMPROVISASJON`, says `INGEN SKJULT FASIT`, says no larger predetermined plan exists for the missing detail, and provides a bounded per-scene prompt. Player-facing fiction remains immersive.

## UX5A verification after patch 14
Automated evidence:
- explicit-improvisation QA: **20 / 0**,
- encounter-purpose QA: **4337 / 0**,
- authored-mysteries-only QA: **3075 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2328 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5830 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-14 behavioral reconstruction SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

These are behavioral reconstruction artifacts, not release-baseline byte claims.

Fresh current browser QA remains pending; historical Chromium results do not certify patches 11-14. Physical iPad/mobile retest remains required.

## Physical UX5A gate now
At minimum verify:
1. `BOKA SOM SKRIVER TILBAKE` makes narrator responsibility obvious: missing message = intentional improv, not hidden app content,
2. improv prompt helps without becoming a closed answer and clearly protects mandatory story state,
3. trap scene has no generic four-box progress,
4. narrator understands purpose/solve/payoff without system internals,
5. active trap blocks onward travel and allows retreat; resolution opens route,
6. ambient mysteries do not surface disconnected random puzzles,
7. single-location identity remains clear,
8. explicit-key flow remains child-driven,
9. remaining UX5A device smoke is green.

Do not merge UX5A until this physical gate is green.

## Narrative architecture implication
`CRYSTAL_MACHINE` showed causal weakness, `SKYGGEHEKSA` temporal invalidity, `REGNBUENETTET` purpose/payoff failure, and `BOKA SOM SKRIVER TILBAKE` both the need for an explicit boundary between authored/tracked story logic and intentional narrator creativity and the usefulness of separating subject identity from narrative role.

Narrative Graph V1 must therefore model dependencies/knowledge/phases plus purpose/stakes/resolution/payoff/world effect. Storylets may declare bounded narrator-improvisation, but critical causal state, prerequisites, completion and payoff cannot depend on an untracked improvised fact. Subject/role pairing must be explicitly compatible rather than randomly interchangeable.

## CRYSTAL_MACHINE reference experiment
Target:
`SETUP -> QUEST_REVEAL -> three parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Default mix:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

Machine reveals missing sockets before UI assumes knowledge. Assembly is deliberate, not automatic inventory completion.

Do not convert another blueprint until experiment passes structural/browser/manual editorial gates.

## UX5B is deferred
UX5B is not next. It should later consume explicit Narrative Graph state.

## Repository health
Repository-health remains open. Complete runtime/source/assets are not yet directly reconstructable byte-identically from ordinary repo files.

## Exact next action
While physical UX5A playtest continues:
- fix UX5A defects only on `ux5/searchable-rooms-encounter-tracks`,
- physically retest patch-14 candidate,
- continue editorial review of current encounter subjects/roles before expanding the content bank,
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
