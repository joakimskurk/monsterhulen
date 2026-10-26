# MONSTERHULEN - TESTING

## Verification levels
Never conflate:
- implemented,
- static/source verified,
- automated runtime tests passed,
- browser tested,
- physical device tested,
- editorial/manual narrative quality accepted.

A structurally perfect system can still fail narrative/DM/child experience.

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

Latest:
- patch 10 device findings hotfix,
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance.

## Automated evidence after patch 14 - GREEN
Executed against reconstructed patch-14 runtime:
- explicit-improvisation QA: **20 PASS / 0 FAIL**
- encounter-purpose QA: **4337 PASS / 0 FAIL**
- authored-mysteries-only QA: **3075 PASS / 0 FAIL**
- single-location QA: **19 PASS / 0 FAIL**
- targeted device QA: **27 PASS / 0 FAIL**
- searchable-room/encounter QA: **2328 PASS / 0 FAIL**
- Adventure Code: **405 PASS / 0 FAIL**
- UX4 progression: **1797 PASS / 0 FAIL**
- combined content regression: **5830 PASS / 0 FAIL**
- 11 inline scripts: **0 syntax errors**

Patch-14 behavioral reconstruction SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

These are behavioral reconstruction artifacts, not byte-identical release-baseline claims.

## Current browser evidence
Historical only:
- broad Chromium UX5A smoke **23/0**,
- patch-10 focused Chromium smoke **15/0**.

These do not certify patches 11-14. Fresh local Chromium previously hit a browser/localStorage harness failure before interaction QA. No current browser-green claim.

## Required physical-device gate before UX5A merge
On actual iPad/mobile verify at minimum:
1. `BOKA SOM SKRIVER TILBAKE` narrator panel makes intentional improv vs authored content obvious,
2. improv prompt is useful/bounded and does not create mandatory state,
3. `REGNBUENETTET` has no generic progress boxes,
4. narrator understands purpose/solve/payoff,
5. active trap blocks onward and allows retreat; resolution frees route,
6. ambient mysteries do not receive disconnected random puzzles,
7. each room has one clear visible name,
8. explicit story-key flow remains child-driven,
9. `SE DEG RUNDT` feels exploratory rather than compulsory,
10. hidden-find fail-forward/full-backpack flow works by touch,
11. 3-heart normal / 4-heart SPENNING combat controls remain usable,
12. final heart/non-combat resolution controls understandable,
13. representative legacy active-combat save if possible,
14. Adventure Code copy/paste still works.

Do not merge UX5A or implement Narrative Graph runtime until this gate is green.

---

# Narrative Graph V1 future verification contract
Canonical prep docs:
- `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/INTERACTION_SHELLS_V1.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`

## NG1 validator tests
Must reject:
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
For critical resource plans verify:
- at least one reachable provider before consumption,
- nested provider dependencies reachable,
- no circular provider chain,
- no provider hidden behind target gate,
- optional providers may vary without breaking guaranteed route,
- thematic room-find reservation deterministic when critical,
- genuinely optional room finds may vary,
- merchant critical offer has obtainable price/trade or fail-forward alternate,
- low social roll never permanently removes all critical acquisition paths.

Reference cases:
- `SUMPTROLLET requires FOOD`,
- `BROTROLLET` chosen request variant binds provider plan before map materialization.

## Subject/role/outcome tests
Verify:
- only approved subject/role combinations selected,
- subject ID stable and separate from Storylet ID,
- outcome is compatible with role,
- critical outcome tracked and world effect applied,
- subject repetition penalty does not affect hard validity,
- ambient subject cannot silently become critical without authored Storylet.

## Interaction-shell / popup tests
Canonical spec: prep `docs/INTERACTION_SHELLS_V1.md`.

### SLOT_GATE / ASSEMBLY reference
Automated:
- slots hidden until knowledge reveal,
- owning resources does not auto-place,
- explicit `PLACE_RESOURCE` required,
- wrong item not consumed,
- correct placement updates target/inventory atomically,
- partial placement persists through save/reload,
- full slots do not skip separate activation if Storylet requires it,
- completing activation applies exact gate/machine world effect,
- repeated same action ID cannot duplicate resource/effect once idempotency layer is implemented,
- undo restores both target and inventory atomically when undo layer exists.

Browser/touch:
- popup readable on iPad/mobile,
- open/close/reopen preserves state,
- placement understandable,
- accidental double tap safe,
- partial state visually clear,
- child can still propose unlisted solution instead of being trapped in popup flow.

### Player-data isolation
Test that player-visible shell/state payload never contains:
- narrator-only answer,
- hidden provider location,
- future phase state,
- unrevealed slot identity,
- narrator improv guardrails,
- secret map/story facts.

## DM semantic-control tests
When NG4 begins, verify DM can understand/control scene without raw state edits:
- purpose,
- requirement,
- provider context,
- possible authored outcomes,
- resolvedWhen,
- world effect,
- authored vs improv boundary.

Semantic actions:
- `GODTA LØSNING` applies canonical world effects,
- `FORHANDLE / USIKKERT FORSØK` opens physical die flow only when DM chooses uncertainty,
- low negotiation result follows authored fail-forward,
- `START KAMP` unavailable when `combatAllowed=false`,
- `START KAMP` does not auto-appear as child-facing recommended answer,
- authored outcome controls cannot create impossible/untracked state.

## Optional combat tests
- no combat auto-start based on subject category,
- DM explicit start required,
- physical dice only,
- non-combat route remains valid for critical guardians where required,
- combat can resolve through surrender/retreat/distraction/friendship/etc.,
- no required kill semantics,
- child-friendly presentation reviewed physically/editorially.

## Typed transition / action tests
Once transition boundary is implemented:
- preconditions validated before effects,
- failed action has no partial mutation,
- composite effect atomic,
- action ID stable,
- duplicate action request idempotent where applicable,
- save/reload does not replay committed effect,
- deterministic Adventure Code rebuild reconstructs initial graph requirements/provider plan,
- session progress remains save-state responsibility.

## NG5 structural volume
Generate >=1000 `CRYSTAL_MACHINE` adventures across seeds/lengths.

Check:
- graph validity,
- provider validity,
- knowledge timing,
- acquisition-family diversity,
- crystals can all be owned while assembly remains pending,
- slot state does not auto-fill,
- gate remains closed until authored assembly/activation,
- no stale complication,
- deterministic reconstruction,
- world effects/payoff consistency,
- existing UX regressions remain green.

1000/0 does **not** prove narrative quality.

## NG6 browser/touch QA
Test real interaction:
- quest reveal before slot knowledge,
- provider acquisition,
- NPC favor,
- guardian non-combat,
- merchant/social bargain if selected,
- deliberate slot placement,
- partial assembly,
- return/activation/gate,
- DM accepts alternate solution,
- optional combat if selected,
- no narrator-data leak.

## NG7 manual editorial/family playtest
10-20 generated Crystal Machine adventures.

Record:
- goal clarity,
- causal/temporal coherence,
- provider naturalness,
- DM cognitive load,
- child agency/free solutions,
- whether interaction shells feel tangible/supportive vs overly videogame-like,
- repetition,
- payoff quality,
- whether narrator repairs missing logic.

## NG8 decision gate
Accept / revise / abandon architecture.

Do not convert another blueprint before this gate.

---

# Future DM Control Surface verification
If NG accepted, full DM Control Surface V1 should test:
- scene summary understandable by novice DM,
- player-view preview accurate,
- action history complete enough for user-facing undo,
- undo of movement, resolve, item placement/use, recorded die face and encounter transition,
- undo cannot duplicate rewards/items/payoffs,
- corrected state remains save-compatible.

# Future Multiscreen / Shared Session verification
Only after canonical action/state model is stable.

Minimum later tests:
- DM host authoritative,
- touch player client on iPad,
- display-only external screen,
- same-Wi-Fi join via simple flow,
- reconnect after refresh/network drop,
- duplicate requests do not duplicate effects,
- narrator-only data never transmitted/rendered to player surface,
- DM player-view preview correct,
- undo re-syncs all clients,
- save/reload mid-session,
- physical family playtest without network administration burden.

# Repository verification
Repository-health remains open. Before release checkpoint is called locked, full active source/assets/tests must reconstruct without chat or external release ZIP.
