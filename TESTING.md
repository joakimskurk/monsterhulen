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
- patch 14: `v0.12.3_playtest_explicit_improv_guidance_ux5a.patch`

Patch 13 exists because physical play showed that generic `ANNEN LØSNING` 3/4-box tracks could ask the narrator to invent meaningless filler while resolution changed nothing in the world.

Patch 14 exists because `BOKA SOM SKRIVER TILBAKE` sounded as if it had a hidden authored message, while in reality the missing message was intentionally open to narrator improvisation. Improvisation is accepted; unmarked narrator responsibility is not.

## Automated evidence after patch 14 - GREEN
Executed against the reconstructed patch-14 runtime:
- `tests/QA_EXPLICIT_IMPROV_GUIDANCE_UX5A.js`: **20 PASS / 0 FAIL**
- `tests/QA_ENCOUNTER_PURPOSE_UX5A.js`: **4337 PASS / 0 FAIL**
- `tests/QA_AUTHORED_MYSTERIES_ONLY_UX5A.js`: **3075 PASS / 0 FAIL**
- `tests/QA_SINGLE_LOCATION_NAME_UX5A.js`: **19 PASS / 0 FAIL**
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2328 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5830 PASS / 0 FAIL**
- 11 inline JavaScript blocks: **0 syntax errors**

Patch-14 behavioral reconstruction SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

These hashes are behavioral reconstruction artifacts, not byte-identical release-baseline claims.

### Explicit-improvisation QA covers
- all active ambient `MYSTISK` templates declare an explicit narrator improvisation prompt when their missing payload is intentionally open,
- `BOKA SOM SKRIVER TILBAKE` can be generated,
- it is labelled internally as `VALGFRITT IMPROVISASJONSMYSTERIUM`,
- it remains non-blocking and is not a story gate,
- narrator summary prominently shows `FORTELLER-IMPROVISASJON`,
- narrator summary says `INGEN SKJULT FASIT`,
- narrator summary explicitly says there is no larger predetermined plan for the missing detail,
- the book-specific prompt tells Forteller what to invent,
- guardrails forbid turning the invented message into a new mandatory story key,
- generated encounter state carries the authored improvisation prompt.

### Encounter-purpose QA still covers
Across hundreds of generated encounters:
- non-treasure encounters have `purpose`, `stakes`, `resolvedWhen`, `payoff`,
- generic blank progress is absent,
- progress may exist only as explicit authored `progressStages`,
- traps declare a real forward-blocking role,
- other ambient encounter families do not become generic movement gates,
- ambient mysteries do not receive random unrelated puzzles,
- `REGNBUENETTET` has explicit obstacle/solve/payoff semantics and no arbitrary 3/4-box track.

The regression extracts and executes real runtime `move()` in a three-room harness and verifies active trap -> onward blocked, retreat allowed, resolved/absent trap -> onward available.

### Search/encounter QA now covers
- generic investigation without pre-spoiling find rooms,
- deterministic optional finds and fail-forward,
- full-backpack preservation,
- 3/4-heart monster combat,
- encounter purpose contract,
- authored-progress-only rule,
- traps as real obstacles,
- no random ambient mystery puzzle,
- legacy active combat is not healed,
- physical encounter dice cannot mutate HP/progress automatically,
- save schema remains 12.

### Device/key QA still covers
- explicit keyed-door flow from patch 11,
- scenario key protection + explicit `BRUK`,
- puzzle help for authored/legacy puzzles,
- puzzle solving does not feed a generic progress meter after patch 13.

### Single-location QA covers
- room name is the single visible player location identity,
- internal zone data remains available to deterministic generation.

## Browser evidence
Historical evidence before the latest interaction changes:
- broad Chromium UX5A smoke: **23 PASS / 0 FAIL**,
- patch-10 focused Chromium smoke: **15 PASS / 0 FAIL**.

Those results do not certify patches 11-14. A fresh local Chromium attempt previously hit a browser/localStorage harness error before interaction QA could run. No current browser-green claim is made. This is a harness limitation, not evidence of an application failure.

## Required physical-device gate before UX5A merge
On actual iPad/mobile verify:
1. `BOKA SOM SKRIVER TILBAKE` narrator panel makes it obvious that the missing message is intentionally improvised and there is no hidden larger app plan,
2. the improvisation prompt is useful and bounded rather than a hidden writing burden,
3. improvised content remains optional and does not appear to create mandatory story state,
4. `REGNBUENETTET`/trap has no generic four-box `ANNEN LØSNING` track,
5. narrator purpose panel makes clear why encounter exists, when solved and what changes,
6. active trap blocks onward travel but allows retreat; resolution frees route,
7. newly generated ambient mysteries do not surface disconnected random puzzles,
8. each room has one clear visible location name,
9. `GLASS_HEART` explicit key-use flow remains natural,
10. `SE DEG RUNDT` feels exploratory rather than mandatory,
11. hidden-find fail-forward/full-backpack flows work by touch,
12. 3-heart normal / 4-heart `SPENNING` combat controls are comfortable,
13. final heart and non-combat resolution controls are understandable,
14. if possible, representative legacy active-combat save behaves correctly,
15. Adventure Code copy/paste flow still works.

Do not merge UX5A or implement Narrative Graph runtime until this gate is green.

## Narrative Graph V1 future verification contract
Canonical plan lives on `narrative/story-graph-v1-prep` in `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

It must separately prove:
- schema/static validity,
- causal/resource/knowledge/phase validator rejection cases,
- storylet/node purpose + stakes + resolution + payoff completeness,
- no generic progress mechanic without authored stages,
- intentionally open narrator details are explicitly declared as improvisation,
- critical prerequisites/completion/payoff do not depend on untracked improvised facts,
- >=1000 generated `CRYSTAL_MACHINE` structural cases,
- real browser interaction,
- 10-20 manual editorial generated-adventure reviews,
- final accept/revise/abandon architecture gate.

Structural green never proves narrative quality.

## UX5B relationship
UX5B is deferred until Narrative Graph V1 is accepted. It should consume explicit graph/knowledge/resource state instead of inferring story logic from loose room events.

## Repository verification
Repository-health remains open. Before the next release checkpoint is called locked, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.
