# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-27
Active gameplay/runtime branch: `ux5/searchable-rooms-encounter-tracks`
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Current work item: **UX5A patch 15 physical iPad/mobile certification before merge**
Architecture prep branch: `narrative/story-graph-v1-prep`
Visual prep branch: `visual/visual-system-v1-prep` — **PARKED**
Next runtime architecture after green UX5A: **Narrative Graph V1, starting only with `CRYSTAL_MACHINE`**

## Workstream priority
The project has explicitly returned to **gameplay/runtime** work.

Visual production is paused. Do not continue Structural Map V3, generate more visual assets, or integrate visual-prep work unless the user explicitly reopens the visual workstream.

Canonical gameplay-return handoff:
`docs/GAMEPLAY_RETURN_HANDOFF_2026-10-27.md`

## Current UX5A gate
UX5A remains open only because target-device physical testing is not yet green.

Patch 15 fixes the remaining player-visible zone-name leak in `room.desc`, so the canonical visible identity is the room name while zone metadata remains internal.

Exact reconstructed patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Current machine/browser evidence:
- single-location QA: **21/0**
- explicit improv QA: **20/0**
- authored mysteries only: **5136/0**
- encounter purpose: **4337/0**
- device findings: **27/0**
- searchable rooms/encounter tracks: **2328/0**
- Adventure Code: **405/0**
- UX4 progression: **1797/0**
- content regression: **5830/0**
- focused patch-15 runtime gate: **6844/0**
- fresh Chromium interaction smoke: **22/0**
- physical iPad/mobile gate: **OPEN**

Chromium caveat: the harness uses injected document content plus an in-memory localStorage shim, so native persistence, clipboard/paste and real touch ergonomics remain physical checks.

See:
- `docs/UX5A_GATE_REVIEW_2026-10-27.md`
- `docs/UX5A_BROWSER_QA_2026-10-27.md`

## Required physical-device gate
On the exact patch-15 build verify:
1. `BOKA SOM SKRIVER TILBAKE` clearly distinguishes authored content from intentional narrator improv.
2. Improv prompt is useful/bounded and cannot create mandatory state.
3. `REGNBUENETTET` has no generic filler progress.
4. Narrator understands purpose/solve/payoff.
5. Active trap blocks onward and allows retreat; resolution frees route.
6. Ambient mysteries stay coherent and do not get disconnected random puzzles.
7. Each room has one clear visible place identity.
8. Explicit story-key flow stays child-driven.
9. `SE DEG RUNDT` feels exploratory rather than compulsory.
10. Hidden-find fail-forward/full-backpack flow works by touch.
11. 3-heart normal / 4-heart `SPENNING` combat controls remain usable.
12. Final-heart/non-combat resolution controls are understandable.
13. Representative legacy active-combat save if possible.
14. Native save/reload + Adventure Code copy/paste work on target browser/device.

## Hard sequencing boundary
Do not skip UX5A because physical testing is unavailable.

While the gate is open:
- patch only confirmed UX5A/runtime defects on this branch,
- preserve stable IDs and save compatibility,
- repo-health/provenance and QA/harness improvements may continue if gameplay semantics do not change,
- do not implement Narrative Graph runtime,
- do not implement UX5B,
- do not implement Multiscreen/Shared Session,
- do not expand content/blueprint bank,
- do not integrate visual-prep work.

## Exact transition after physical UX5A GREEN
1. Record physical evidence.
2. Confirm final automated/browser evidence.
3. Merge UX5A to `main`.
4. Verify `main`.
5. Create fresh `narrative/story-graph-v1` from merged `main`.
6. Carry approved prep docs/specs.
7. Start WP-NG1.

No NG1 runtime before this sequence is complete.

## Narrative/gameplay prep — COMPLETE FOR CURRENT BANK
The complete existing content bank has been editorially reviewed on `narrative/story-graph-v1-prep`:
- MONSTERS
- PEOPLE
- FRIENDS
- TRAPS
- MYSTERIES
- TREASURES

The nine current `CRYSTAL_MACHINE` Storylet candidates were audited/revised and cross-bank Storylet Matrix/provider constraints were consolidated.

There is **no next subject to review**. Do not expand the bank.

Active blueprint bank remains:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

## Narrative Graph direction after gate
Target chain:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal
- dramatic phase/expiry
- interaction shells
- typed canonical transitions
- later action history/undo/shared-session sync

Sequence after merge:
- NG1 graph/provider/typed transition model + validator
- NG2 Storylet Matrix/provider engine
- NG3 Crystal Machine planner
- NG4 materialization + narrator knowledge + minimal DM controls + required shells
- NG5 >=1000 automated graph/state cases
- NG6 browser/touch QA
- NG7 10–20 manual editorial/family playtests
- NG8 accept/revise/abandon

No second blueprint before NG8.

## Visual work — PARKED WITH CLEAN RESTART POINT
Visual V1/V2 experiments are retained only as history/lessons.

The V2 art direction was manually rejected despite green structural/browser QA. Structural Map V3 corrected the production contract around perceptual quality (`ROOM FIRST, GRID SECOND`) but **V3 Gate A has not been started and is now paused**.

If visual work is explicitly reopened later, restart from:
- `visual/STRUCTURAL_MAP_V3_PRODUCTION_CONTRACT.md`
- `visual/structural-map-v3-acceptance.json`
- `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`

Do not resume from V1/V2 asset generation.

## Repository health — OPEN
The runtime branch still lacks ordinary repo copies of the exact active `index.html` and full assets. The tested patch-15 candidate remains reconstructed rather than fully byte-reconstructable from ordinary repository files.

A previous large binary snapshot attempt through the GitHub connector was hash-checked, found unsafe due to transport corruption/truncation, and removed. No failed snapshot artifact is valid.

Do not claim repository provenance is closed until exact runtime/source/assets are committed through a byte-safe path and verified from repository bytes.

## Exact next action
**Physical-test the exact patch-15 candidate on iPad/mobile using the 14-point gate.**

If anything fails, patch UX5A only and rerun affected machine/browser tests.

If physical testing is unavailable, do not jump to later gameplay packages; limit work to repo-health/provenance or QA/harness improvements that do not change later runtime semantics.
