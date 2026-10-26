# MONSTERHULEN - TESTING

Updated: 2026-10-27

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
- patch 14 explicit narrator-improvisation guidance,
- patch 15 remaining room-description location-identity leak.

## Automated evidence through patch 14 - GREEN AT THAT LAYER
Executed against the previously reconstructed patch-14 runtime:
- explicit-improvisation QA: **20 PASS / 0 FAIL**
- encounter-purpose QA: **4337 PASS / 0 FAIL**
- authored-mysteries-only QA: **3075 PASS / 0 FAIL**
- single-location QA: **19 PASS / 0 FAIL** under the old coverage
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

## Patch 15 - current verification status
During the 2026-10-27 gate review, indexed current source showed:

```text
room.desc=`${zone.name}. ${room.name}. `+
```

while `renderMeta()` displayed both:
- `ROM: ${r.name}`
- `r.desc`

This meant the internal zone name was still player-visible and the “one visible location identity” rule was not fully satisfied.

Patch 15 changes the description prefix to:

```text
room.desc=`${room.name}. `+
```

while retaining `room.zoneName` internally.

Test coverage was strengthened in `tests/QA_SINGLE_LOCATION_NAME_UX5A.js` to:
- reject the old zone-prefixed `room.desc`,
- require the room-name-only prefix.

Verification level now:
- patch written/committed: **PASS**,
- source/static review of intended change: **PASS**,
- updated QA JavaScript syntax: **PASS**,
- full automated runtime regression after patch 15: **NOT RUN / PENDING**,
- current browser interaction QA: **PENDING**,
- physical device: **PENDING**.

Do not carry the old 19/0 single-location result forward as patch-15 certification. The old test did not cover `room.desc`.

### Current tooling/provenance limitation
Project/Library search can inspect the indexed current patch-14 source. In this session the available materialization path returns an older backing representation, so it is not safe to certify patch 15 by running a browser or full regression against that stale export.

Required next machine step is to reconstruct the exact current candidate from a trustworthy current source, apply patches through 15, and rerun tests there.

## Current source-level checklist review
The indexed current source supports the following before patch 15:

### Boka som skriver tilbake
Source contains:
- `FORTELLER-IMPROVISASJON`,
- `INGEN SKJULT FASIT`,
- explicit statement that no larger predetermined hidden plan exists,
- a concrete per-scene improvise prompt,
- guardrails forbidding new mandatory story keys or contradiction of tracked state.

This is source-verified. Real narrator comprehension remains physical/editorial.

### Regnbuenettet / trap behavior
Source contains:
- `FELLE` contract with purpose/stakes/resolvedWhen/payoff,
- `blocksForward=true`,
- no generic progress UI without authored `progressStages`,
- forward block while active,
- retreat to previous room remains allowed,
- resolving removes trap event and route becomes free.

This is source-verified. Physical clarity remains open.

### Ambient mystery puzzles
Random puzzle attachment requires explicit `useRandomPuzzle===true`. No inspected ambient mystery entry opts in. Source-level behavior matches patch-13 intent.

### Explicit key flow
A keyed locked door tap only reports locked and returns. Key possession alone does not unlock or traverse. Explicit key use opens the door; movement is separate.

### Search/full backpack
- search UI does not reveal loot in advance,
- first low result gives stronger clue,
- repeated low fails forward,
- full backpack leaves revealed find in room.

### Combat
- normal generated monster target = 3 hearts,
- `SPENNING` = 4 hearts,
- combat begins only after explicit child choice,
- non-combat resolution remains visible,
- legacy active fight normalization preserves already-lost hearts instead of healing to new max.

### Adventure Code
`MH1` encode/decode + copy/paste narrator flow exists in source. Prior automated regression: **405/0**. Browser/device copy/paste remains open.

## Current browser evidence
Historical only:
- broad Chromium UX5A smoke **23/0**,
- patch-10 focused Chromium smoke **15/0**.

These do not certify patches 11-15. No current browser-green claim.

## Required physical-device gate before UX5A merge
On the exact patch-15 build, actual iPad/mobile must verify at minimum:
1. `BOKA SOM SKRIVER TILBAKE` makes intentional improv vs authored content obvious,
2. improv prompt is useful/bounded and does not create mandatory state,
3. `REGNBUENETTET` has no generic progress boxes,
4. narrator understands purpose/solve/payoff,
5. active trap blocks onward and allows retreat; resolution frees route,
6. ambient mysteries do not receive disconnected random puzzles,
7. each room has one clear visible identity, including the description after patch 15,
8. explicit story-key flow remains child-driven,
9. `SE DEG RUNDT` feels exploratory rather than compulsory,
10. hidden-find fail-forward/full-backpack flow works by touch,
11. 3-heart normal / 4-heart `SPENNING` combat controls remain usable,
12. final-heart/non-combat resolution controls are understandable,
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
- `BROTROLLET` selected request binds provider plan before map materialization.

## Interaction-shell / popup tests
### SLOT_GATE / ASSEMBLY automated
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

### Browser/touch
- popup readable on iPad/mobile,
- open/close/reopen preserves state,
- placement understandable,
- accidental double tap safe,
- partial state visually clear,
- child can still propose unlisted solution instead of being trapped in popup flow.

### Player-data isolation
Player-visible shell/state must not contain:
- narrator-only answer,
- hidden provider location,
- future phase state,
- unrevealed slot identity,
- narrator improv guardrails,
- secret map/story facts.

## DM semantic-control tests
When NG4 begins verify DM can understand/control scene without raw state edits:
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

## NG5 structural volume
Generate >=1000 `CRYSTAL_MACHINE` adventures across seeds/lengths and verify graph/provider/knowledge/slot/world-effect/save/idempotence invariants. **1000/0 does not prove narrative quality.**

## NG6 browser/touch QA
Test real graph interactions and no narrator-data leakage.

## NG7 manual editorial/family playtest
10-20 generated Crystal Machine adventures; judge goal clarity, causal/temporal coherence, provider naturalness, DM burden, child agency, popup feel, repetition and payoff quality.

## NG8 decision gate
Accept / revise / abandon architecture. Do not convert another blueprint before this gate.

# Repository verification
Repository-health remains open. Before a release checkpoint is called locked, full active source/assets/tests must reconstruct without chat or external release ZIP.
