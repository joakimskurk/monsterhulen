# MONSTERHULEN - TESTING

## Verification levels
Never conflate these states:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested
- editorial/manual narrative quality accepted

A structurally perfect system can still fail the last category.

## Historical V0.12.3 release evidence
- Lasting thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

## Active UX5A patch chain
Canonical order: `patches/README.md`.

Latest additions:
- patch 10: `v0.12.3_playtest_device_findings_hotfix_ux5a.patch`
- patch 11: `v0.12.3_playtest_explicit_story_key_use_ux5a.patch`
- patch 12: `v0.12.3_playtest_single_location_name_ux5a.patch`
- patch 13: `v0.12.3_playtest_encounter_purpose_contract_ux5a.patch`

Patch 13 exists because physical play showed that generic `ANNEN LØSNING` 3/4-box tracks could ask the narrator to invent meaningless filler while resolution changed nothing in the world.

## Automated evidence after patch 13 - GREEN
Executed against the reconstructed patch-13 runtime:
- `tests/QA_ENCOUNTER_PURPOSE_UX5A.js`: **4337 PASS / 0 FAIL**
- `tests/QA_SINGLE_LOCATION_NAME_UX5A.js`: **19 PASS / 0 FAIL**
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2295 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5809 PASS / 0 FAIL**
- 11 inline JavaScript blocks: **0 syntax errors**

Patch-13 behavioral reconstruction SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch-13 SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

The content-regression count is intentionally lower than patch 12 because ambient `MYSTISK` encounters no longer generate random puzzles, so fewer generated-puzzle assertions execute. This is an expected behavior change, not lost coverage elsewhere.

### Encounter-purpose QA covers
Across hundreds of generated encounters:
- non-treasure encounters have `purpose`, `stakes`, `resolvedWhen`, `payoff`,
- generic blank progress is absent,
- progress may exist only as explicit authored `progressStages`,
- traps declare a real forward-blocking role,
- other ambient encounter families do not become generic movement gates,
- ambient mysteries do not receive random unrelated puzzles,
- `REGNBUENETTET` can be generated and has explicit obstacle/solve/payoff semantics,
- `REGNBUENETTET` has no arbitrary 3/4-box track,
- UI has no generic `ANNEN LØSNING` track,
- narrator explicitly says not to invent filler steps.

The regression also extracts and executes the real runtime `move()` function in a three-room harness and verifies:
1. an active trap blocks movement onward,
2. retreat to the previous room remains possible,
3. once the blocking encounter is absent/resolved, movement onward works again.

### Search/encounter QA now covers
- generic investigation without pre-spoiling find rooms,
- deterministic optional finds and fail-forward,
- full-backpack preservation,
- 3/4-heart monster combat,
- encounter purpose contract across generated active blueprints,
- authored-progress-only rule,
- traps as real obstacles,
- no random ambient mystery puzzle,
- legacy active combat is not healed,
- physical encounter dice cannot mutate HP/progress automatically,
- save schema remains 12.

### Device/key QA now covers
- explicit keyed-door flow from patch 11,
- scenario key protection + explicit `BRUK`,
- puzzle help remains available for any authored/legacy puzzle,
- puzzle solving does not feed a generic progress meter after patch 13.

### Single-location QA covers
- room name is the single visible player location identity,
- internal zone data remains available to deterministic generation.

## Browser evidence
Historical evidence before the latest interaction changes:
- broad Chromium UX5A smoke: **23 PASS / 0 FAIL**,
- patch-10 focused Chromium smoke: **15 PASS / 0 FAIL**.

Those results do not certify patches 11-13. A fresh local Chromium attempt previously hit a browser/localStorage harness error before interaction QA could run. No current browser-green claim is made. This is a harness limitation, not evidence of an application failure.

## Required physical-device gate before UX5A merge
On actual iPad/mobile verify:
1. `REGNBUENETTET`/trap has no generic four-box `ANNEN LØSNING` track,
2. narrator purpose panel makes it clear why the encounter exists, when it is solved and what changes,
3. active trap blocks onward travel but allows retreat,
4. one genuinely sufficient child plan can solve the obstacle; narrator is not forced to invent four actions,
5. after `HINDRINGEN ER LØST`, onward route is actually available,
6. newly generated ambient mysteries do not surface disconnected random puzzles,
7. each room has one clear visible location name,
8. `GLASS_HEART` explicit key-use flow remains natural,
9. `SE DEG RUNDT` feels exploratory rather than mandatory,
10. hidden-find fail-forward/full-backpack flows work by touch,
11. 3-heart normal / 4-heart `SPENNING` combat controls are comfortable,
12. final heart and non-combat resolution controls are understandable,
13. if possible, representative legacy active-combat save behaves correctly,
14. Adventure Code copy/paste flow still works.

Do not merge UX5A or implement Narrative Graph runtime until this gate is green.

## Narrative Graph V1 future verification contract
Canonical plan lives on `narrative/story-graph-v1-prep` in `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

It must separately prove:
- schema/static validity,
- causal/resource/knowledge/phase validator rejection cases,
- storylet/node purpose + stakes + resolution + payoff completeness,
- no generic progress mechanic without authored stages,
- >=1000 generated `CRYSTAL_MACHINE` structural cases,
- real browser interaction,
- 10-20 manual editorial generated-adventure reviews,
- final accept/revise/abandon architecture gate.

Structural green never proves narrative quality.

## UX5B relationship
UX5B is deferred until Narrative Graph V1 is accepted. It should consume explicit graph/knowledge/resource state instead of inferring story logic from loose room events.

## Repository verification
Repository-health remains open. Before the next release checkpoint is called locked, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.
