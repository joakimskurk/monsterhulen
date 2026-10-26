# MONSTERHULEN - TESTING

## Verification levels
Never conflate:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested
- editorial/manual narrative quality accepted

A structurally perfect Narrative Graph can still fail editorial quality.

## Historical V0.12.3 release evidence
- Lasting thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

## UX5A evidence before patch 11
Broad automated/browser verification before the latest explicit-key correction:
- searchable-room/encounter QA: **2216 / 0**
- Adventure Code: **405 / 0**
- UX4 progression: **1797 / 0**
- combined content regression: **5960 / 0**
- 11 inline scripts: **0 syntax errors**
- Chromium broad UX5A smoke: **23 / 0**
- patch-10 focused Chromium smoke: **15 / 0**

Patch 10 fixed puzzle narrator clarity and changed a ready gate to open-before-traverse, but continued review showed that a keyed gate still auto-applied the possessed key.

## Patch 11 - explicit story-key use
Runtime patch on `ux5/searchable-rooms-encounter-tracks`:
`patches/v0.12.3_playtest_explicit_story_key_use_ux5a.patch`

Required behavior:
- tapping keyed locked door only establishes `DØREN ER LÅST`,
- no auto key use, unlock, traversal or key removal,
- scenario key remains protected but has explicit `BRUK`,
- `BRUK` only opens an adjacent matching keyed story door,
- successful key use removes/archives key with explicit fiction,
- key use opens but does not traverse,
- narrator may optionally hint `KANSKJE DU HAR NOE I SEKKEN?` without naming a closed solution.

Automated evidence against fresh patch-11 reconstruction:
- targeted device QA: **27 PASS / 0 FAIL**
- searchable-room/encounter QA: **2216 PASS / 0 FAIL**
- Adventure Code: **405 PASS / 0 FAIL**
- UX4 progression: **1797 PASS / 0 FAIL**
- combined content regression: **5960 PASS / 0 FAIL**
- 11 inline scripts: **0 syntax errors**

Fresh behavioral reconstruction SHA-256:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

This hash is not a byte-identical release-baseline claim. Repository-health/provenance remains open.

### Browser status after patch 11
The old patch-10 focused Chromium result **15 / 0** does not certify the new key interaction because its expectation is intentionally superseded.

Fresh patch-11 browser interaction QA remains **pending**. In the current execution environment, local Chromium could not load the local test runtime and ended at `chrome-error://chromewebdata/`; this is a harness limitation, not evidence of an application failure.

### Physical device gate before UX5A merge
Still required on actual iPad/mobile:
1. door tap remains locked even when `GLASSNØKKEL` is owned,
2. app does not reveal key as answer,
3. child gets room to propose what to do,
4. key is protected but exposes explicit `BRUK`,
5. key use opens/removes key without moving hero,
6. later tap traverses,
7. embedded puzzle narrator help is immediately understandable and solve gives exactly one progress,
8. `SE DEG RUNDT` feels exploratory rather than mandatory,
9. 3-4 progress steps do not feel like excessive bookkeeping,
10. hidden-find fail-forward/full-backpack flows work by touch,
11. combat tap targets and resolution flows are comfortable,
12. Adventure Code flow still works,
13. if possible, representative legacy active-combat save remains correct.

Do not merge UX5A or implement Narrative Graph runtime until this gate is green.

## Narrative Graph V1 future verification contract
Canonical implementation plan: `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

### Level 1 - schema/static
Must prove StoryGraph/StoryNode schema, stable storylet IDs, explicit resource/knowledge edges and setup/signal/action/payoff metadata.

### Level 2 - graph validator
Must reject cycles, unavailable requirements, optional-find critical dependencies, hidden critical nodes without clue/fail-forward, guardians without non-combat routes, premature knowledge, stale complications and obsolete ambient story text.

The same child-agency principle applies to future graph materialization: knowing the intended solution must not force the UI to apply it automatically. Storylets expose affordances; the child chooses what to try.

### Level 3 - generated structural QA
Generate at least **1000** valid `CRYSTAL_MACHINE` adventures across supported seeds/lengths. Check reachability, acquisition diversity, dependency validity, gate integrity, determinism, temporal expiry and existing regressions.

**1000/0 does not prove story quality.**

### Level 4 - real browser interaction QA
Exercise requirement reveal, knowledge state, critical search fail-forward, NPC favor, guardian non-combat completion, deliberate assembly, gate ordering and expiry of obsolete complications.

### Level 5 - manual editorial gate
Manually play **10-20 generated CRYSTAL_MACHINE adventures** and judge goal clarity, causal/temporal coherence, narrator burden, free child solutions, branch variety and payoff.

### Level 6 - architecture decision gate
Accept, revise or abandon Narrative Graph V1. Do not port other blueprints before this gate.

## UX5B testing relationship
UX5B is deferred until Narrative Graph V1 is accepted and should consume explicit graph/knowledge/resource state.

## Repository verification
Repository-health remains open. Before the next release checkpoint is called locked, the repo must reconstruct full active source/assets/tests without chat or external release ZIP.
