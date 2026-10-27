# MONSTERHULEN - TESTING

Updated: 2026-10-27

> V2 note (2026-10-27): the primary future structural test is the playthrough automaton over >=1000 seeds (`docs/v2/SYSTEM_DESIGN_V2.md` §4). Results below were produced outside the repository and are not reproducible from repo bytes until `index.html` is committed (M0).

## V2 prototype evidence (2026-10-28, run from repository bytes)
| Check | Command | Result | Proves | Does not prove |
|---|---|---|---|---|
| Content format | `npm run validate:content` | OK | ids, tag references, role consistency, signs on weaknesses, every needed tag has a provider | that the classification is right |
| Playthrough batch | `npm run sim:batch` | 15 000 / 15 000 accepted | chain-first generation yields solvable runs in correct order on the abstract map | fun, comprehension, real map geometry |
| Sabotage selftest | `npm run sim:selftest` | 4 258 sabotages, 0 missed | the automaton rejects runs with a misplaced or missing sole provider, and cross-zone secret doors | robustness to sabotage types not tested |

## Verification levels
Never conflate:
- implemented,
- static/source verified,
- automated runtime tests passed,
- browser tested,
- physical device tested,
- editorial/manual narrative quality accepted.

Structural green never proves narrative quality.

## Current UX5A runtime candidate
Runtime branch: `ux5/searchable-rooms-encounter-tracks`.

Patch chain currently ends at patch 15:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance,
- patch 15 remaining room-description location-identity leak.

Patch-15 reconstructed candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

## Patch-15 automated verification - GREEN
Run against the same reconstructed patch-15 candidate:

- `QA_SINGLE_LOCATION_NAME_UX5A.js`: **21 PASS / 0 FAIL**
- `QA_EXPLICIT_IMPROV_GUIDANCE_UX5A.js`: **20 PASS / 0 FAIL**
- `QA_AUTHORED_MYSTERIES_ONLY_UX5A.js`: **5136 PASS / 0 FAIL**
- `QA_ENCOUNTER_PURPOSE_UX5A.js`: **4337 PASS / 0 FAIL**
- `QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2328 PASS / 0 FAIL**
- `QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `QA_CONTENT_REGRESSION.js`: **5830 PASS / 0 FAIL**
- `QA_PATCH15_GATE_RUNTIME.js`: **6844 PASS / 0 FAIL**
- 11 inline JavaScript blocks: **0 syntax errors**

### Restored test coverage
The status docs previously referenced `tests/QA_AUTHORED_MYSTERIES_ONLY_UX5A.js`, but that file was absent from the repository tree at the start of this checkpoint. It has now been restored.

The restored test verifies:
- all six current mystery subjects carry explicit improv contracts,
- current ambient mystery bank has no random-puzzle opt-in,
- runtime requires explicit `useRandomPuzzle===true`,
- 1024 deterministic mystery samples validate,
- no sampled ambient mystery receives a random puzzle,
- mysteries stay optional/non-blocking,
- all six current mystery subjects appear in the deterministic sample.

Result: **5136/0**.

The prior historical `3075/0` number remains historical evidence and is not presented as the current restored test count.

### Patch-15 focused runtime test
`QA_PATCH15_GATE_RUNTIME.js` executes the engine/world/encounter modules over:
- 200 generated 13-room worlds,
- 500 direct mystery samples,
- 500 direct trap samples.

It covers:
- room description starts with canonical room name,
- zone name is not the visible description prefix,
- encounter validation,
- trap blocking contract,
- no filler progress,
- `REGNBUENETTET`,
- no random ambient mystery puzzles,
- `BOKA SOM SKRIVER TILBAKE` explicit improv/non-blocking semantics,
- normal 3-heart / `SPENNING` 4-heart monster scale.

Result: **6844/0**.

## Fresh browser interaction QA - 22/0 GREEN WITH STORAGE-HARNESS CAVEAT
Exact patch-15 HTML was loaded into headless Chromium through DevTools `Page.setDocumentContent` because this container's Chromium process could not navigate to the local candidate through localhost or `file://`.

The injected `about:blank` document denies native localStorage, so the harness supplied a minimal in-memory localStorage implementation. Application HTML itself was unchanged.

Passed browser interactions:
- setup/start,
- patch-15 room identity,
- no second area badge,
- room-search transition,
- Adventure Code rendering,
- DM overlay,
- trap resolve UI,
- movement,
- retreat-preserving trap state,
- stale blocker clearing after resolution,
- explicit combat start,
- non-combat resolution available alongside combat,
- combat heart UI,
- 390x844 mobile viewport/tabs.

Result: **22 PASS / 0 FAIL**.

See `docs/UX5A_BROWSER_QA_2026-10-27.md`.

This does **not** certify:
- native localStorage persistence/resume,
- native clipboard/prompt copy-paste,
- target-device touch ergonomics,
- narrator comprehension.

Those remain physical/target-browser gate items.

## Current physical-device gate - OPEN
On the exact patch-15 build, actual iPad/mobile must verify:
1. `BOKA SOM SKRIVER TILBAKE` makes intentional improv vs authored content obvious,
2. improv prompt is useful/bounded and does not create mandatory state,
3. `REGNBUENETTET` has no generic progress boxes,
4. narrator understands purpose/solve/payoff,
5. active trap blocks onward and allows retreat; resolution frees route,
6. ambient mysteries do not receive disconnected random puzzles,
7. each room has one clear visible identity including the patch-15 description,
8. explicit story-key flow remains child-driven,
9. `SE DEG RUNDT` feels exploratory rather than compulsory,
10. hidden-find fail-forward/full-backpack flow works by touch,
11. 3-heart normal / 4-heart `SPENNING` combat controls remain usable,
12. final-heart/non-combat resolution controls are understandable,
13. representative legacy active-combat save if possible,
14. native save/reload + Adventure Code copy/paste work on target browser/device.

Detailed review: `docs/UX5A_GATE_REVIEW_2026-10-27.md`.

Do not merge UX5A or implement Narrative Graph runtime until this physical gate is green.

---

# Narrative Graph V1 future verification contract
Canonical prep docs:
- `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/INTERACTION_SHELLS_V1.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`

## NG1 validator must reject
- missing setup/signal,
- unavailable critical requirement,
- provider behind consuming gate,
- provider dependency cycle,
- critical dependency on lucky optional spawn,
- merchant price/trade dependency with no reachable source,
- critical acquisition relying only on one mandatory persuasion roll,
- required hidden resource without clue/fail-forward,
- guardian without required non-combat route,
- premature knowledge reveal,
- stale/expired complication,
- action completion caused merely by owning requirement,
- auto-use of possessed solution,
- missing purpose/stakes/resolvedWhen/payoff,
- payoff with no coherent world effect,
- generic progress count/filler stages,
- unrelated puzzle/mechanic,
- missing narrator-improv contract for intentionally open payload,
- critical state depending on untracked narrator invention,
- incompatible subject/role,
- interaction shell revealing unrevealed requirement,
- interaction shell allowing undeclared critical state mutation,
- critical slot/gate auto-filled from inventory.

## Provider-system tests
Critical provider plans must prove reachability, acyclicity, pre-gate availability and fail-forward survival. `SUMPTROLLET requires FOOD` and `BROTROLLET` selected-request provider binding remain reference cases.

## Interaction-shell tests
`SLOT_GATE / ASSEMBLY` must prove reveal-before-slots, no auto-placement, explicit `PLACE_RESOURCE`, no wrong-item consumption, atomic target/inventory update, persistent partial placement, authored activation, idempotence and later atomic undo.

Player payload must never leak narrator-only answer/provider/future phase/unrevealed slot/improv guardrails/secret facts.

## NG5-NG8
- NG5: >=1000 `CRYSTAL_MACHINE` graph/state cases. Structural green does not prove narrative quality.
- NG6: real browser/touch graph interaction QA.
- NG7: 10-20 manual editorial/family playtests.
- NG8: accept/revise/abandon. No second blueprint before NG8.

# Repository verification
Repository-health remains open. Full active source/assets/tests must eventually reconstruct without chat or external release ZIP.
