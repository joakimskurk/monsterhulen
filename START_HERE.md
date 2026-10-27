# START HERE - MONSTERHULEN

Updated: 2026-10-27
Active gameplay/runtime branch: `ux5/searchable-rooms-encounter-tracks`
Status: **GAMEPLAY/RUNTIME ACTIVE — VISUAL WORK PARKED — UX5A PHYSICAL GATE OPEN**

Repository `joakimskurk/monsterhulen` is permanent source of truth. Do not reconstruct current state from chat if repo differs.

## Read this first in a new gameplay chat
Read in this order on `ux5/searchable-rooms-encounter-tracks`:
1. `PROJECT_STATE.md`
2. `docs/GAMEPLAY_RETURN_HANDOFF_2026-10-27.md`
3. `ROADMAP.md`
4. `DECISIONS.md`
5. `TESTING.md`
6. `PLAYTEST_FINDINGS.md`
7. `patches/README.md`
8. `docs/UX5A_GATE_REVIEW_2026-10-27.md`
9. `docs/UX5A_BROWSER_QA_2026-10-27.md`

Only after the UX5A physical gate is green and merged should runtime implementation continue into Narrative Graph V1.

## Current active work
UX5A patch 15 physical iPad/mobile certification before merge.

Current runtime candidate:
- baseline: V0.12.3
- latest UX5A patch: patch 15
- exact reconstructed candidate SHA-256: `f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Current evidence:
- focused patch-15 automated gate: **6844 PASS / 0 FAIL**
- fresh Chromium interaction smoke: **22 PASS / 0 FAIL**
- target-device physical gate: **OPEN**

The browser harness uses an in-memory localStorage shim, so native persistence, clipboard/paste and physical touch are not certified by Chromium smoke.

## Runtime patch chain
- patch 11 — explicit story-key use
- patch 12 — one visible location identity
- patch 13 — encounter purpose/world-effect contract
- patch 14 — explicit narrator-improvisation guidance
- patch 15 — remove remaining zone-name leak from player-visible room description

## Hard sequencing rule
Do not skip UX5A because physical testing is temporarily unavailable.

While the physical gate remains open:
- patch only confirmed UX5A/runtime defects on this branch,
- preserve save compatibility/stable IDs,
- repo-health/provenance and QA/harness work may continue if gameplay semantics are unchanged,
- do not implement Narrative Graph runtime,
- do not implement UX5B,
- do not implement Multiscreen/Shared Session,
- do not expand the content/blueprint bank,
- do not merge visual-prep work into runtime/main.

## Exact transition after physical UX5A GREEN
1. Record physical evidence.
2. Confirm final relevant automated/browser evidence.
3. Merge `ux5/searchable-rooms-encounter-tracks` to `main`.
4. Verify `main`.
5. Create fresh `narrative/story-graph-v1` from merged `main`.
6. Carry only approved prep docs/specs from `narrative/story-graph-v1-prep`.
7. Start WP-NG1.

Do not start NG1 before this sequence is complete.

## Narrative/gameplay prep
Prep branch: `narrative/story-graph-v1-prep`.

The complete existing content bank has been editorially reviewed:
- MONSTERS
- PEOPLE
- FRIENDS
- TRAPS
- MYSTERIES
- TREASURES

The nine current `CRYSTAL_MACHINE` Storylet candidates were audited/revised and Storylet Matrix/provider rules were consolidated.

There is **no next subject review**. Do not expand the bank.

When the runtime gate is cleared, the intended architecture remains:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Narrative Graph V1 begins only with `CRYSTAL_MACHINE`.

## Visual work — PARKED
Visual branch: `visual/visual-system-v1-prep`.

Visual work is intentionally paused while the project returns to gameplay.

Do not continue visual asset production, Structural Map V3 or visual integration unless the user explicitly reopens that workstream.

If reopened later, the valid visual restart point is Structural Map V3 Gate A, not V1/V2 mass production. Read that branch's `START_HERE.md` and V3 contract at that time.

V2 technical experiments remain historical evidence only; the V2 art direction was manually rejected.

## Repository health
Repository provenance remains open. The exact active runtime/source/assets are not yet fully byte-reconstructable from ordinary GitHub files alone.

Do not claim repo-health is closed until exact source/runtime/assets are committed through a byte-safe path and verified from repository bytes.
