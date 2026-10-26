# MONSTERHULEN - TESTING

## Verification levels
Never conflate:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested
- editorial/manual narrative quality accepted

Structural green never proves narrative quality.

## Historical V0.12.3 release evidence
- Lasting thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

## Current UX5A runtime candidate - patch 13
Canonical runtime patch order is on `ux5/searchable-rooms-encounter-tracks` in `patches/README.md`.

Latest layers:
- patch 11 explicit story-key use,
- patch 12 single visible location identity,
- patch 13 encounter purpose contract.

Patch 13 removes generic ambient 3/4 progress and requires purpose/stakes/resolvedWhen/payoff. Progress exists only for authored stages. Traps can be real forward obstacles with retreat and payoff. Ambient random mystery puzzles are disabled unless explicitly authored/opted in.

Automated runtime evidence after patch 13:
- encounter-purpose QA: **4337 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2295 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5809 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-13 runtime reconstruction SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch-13 SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

The content pass count decreased intentionally because ambient random mystery puzzles no longer generate, so fewer puzzle assertions execute.

The encounter-purpose regression executes the actual runtime `move()` function in a three-room harness and proves: active trap blocks forward movement, retreat works, clear/resolved trap allows forward movement.

## Browser status
Historical Chromium evidence:
- broad pre-patch-11: **23 / 0**,
- patch-10 focused: **15 / 0**.

These do not certify patches 11-13. Fresh browser interaction QA remains pending because the current local browser/localStorage harness failed before current interaction testing. Do not claim browser green.

## Physical UX5A gate
Still required on target iPad/mobile:
1. `REGNBUENETTET`/trap has no generic four-box progress,
2. narrator immediately understands purpose, solve condition and payoff,
3. trap blocks onward travel but permits retreat,
4. one genuinely sufficient child plan may solve it,
5. resolution actually restores onward travel,
6. new ambient mysteries do not surface unrelated random puzzles,
7. one clear location name remains,
8. explicit key use remains child-driven,
9. generic room search/backpack/combat/device ergonomics remain green,
10. Adventure Code remains usable.

Do not merge UX5A or implement Narrative Graph runtime until physical gate is green.

## Narrative Graph V1 future verification contract
Canonical implementation plan: `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

### Level 1 - schema/static
Must prove StoryGraph/StoryNode schema, stable storylet IDs, resource/knowledge edges, setup/signal/action/payoff and encounter/storylet purpose semantics.

### Level 2 - validator
Must reject cycles, unavailable requirements, optional-find critical dependencies, hidden critical nodes without clue/fail-forward, guardians without non-combat routes, premature knowledge, stale complications, obsolete ambient story text, and interactive nodes missing purpose/stakes/resolution/payoff where applicable.

Progress may exist only as authored semantic stages; generic duration counts are invalid.

### Level 3 - generated structural QA
Generate at least **1000** valid `CRYSTAL_MACHINE` adventures. Check reachability, acquisition diversity, dependency validity, gate integrity, determinism, temporal expiry, purpose/payoff completeness and existing regressions.

**1000/0 does not prove story quality.**

### Level 4 - real browser interaction QA
Exercise requirement reveal, knowledge state, critical search fail-forward, NPC favor, guardian non-combat completion, deliberate assembly, gate ordering, expiry and observable payoff/world-state changes.

### Level 5 - manual editorial gate
Manually play **10-20 generated CRYSTAL_MACHINE adventures** and judge goal clarity, causal/temporal coherence, encounter purpose, narrator burden, free child solutions, branch variety and payoff.

### Level 6 - architecture decision gate
Accept, revise or abandon Narrative Graph V1. Do not port other blueprints before this gate.

## UX5B relationship
UX5B is deferred until Narrative Graph V1 is accepted and should consume explicit graph/knowledge/resource state.

## Repository verification
Repository-health remains open. Before the next release checkpoint is called locked, repo must reconstruct full active source/assets/tests without chat or external release ZIP.
