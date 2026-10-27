# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-27
STATUS: **GAMEPLAY/RUNTIME ACTIVE + UX5A PATCH 15 MACHINE/BROWSER GREEN + PHYSICAL IPAD/MOBILE GATE OPEN + VISUAL WORK PARKED + REPOSITORY HEALTH OPEN**

> `PROJECT_STATE.md` is canonical handoff. New gameplay chats should start with `START_HERE.md` on `ux5/searchable-rooms-encounter-tracks`.

## BASELINE
- Product: Monsterhulen
- Release baseline: V0.12.3 Lasting Thing Identity Pass
- State schema: 12
- Storage: `monsterhulen_v120`
- Active runtime branch: `ux5/searchable-rooms-encounter-tracks`
- Narrative prep branch: `narrative/story-graph-v1-prep`
- Visual prep branch: `visual/visual-system-v1-prep` — **PARKED**
- UX5A is not merged to `main`.

## CURRENT RUNTIME CANDIDATE
Current patch chain ends at **patch 15**.

Patch 15 removes the remaining player-visible zone-name prefix from `room.desc`, preserving the room name as the single visible place identity while keeping zone metadata internal.

Exact reconstructed patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

## CURRENT VERIFICATION
Automated/runtime evidence:
- single-location QA: **21/0**
- explicit-improv QA: **20/0**
- authored-mysteries-only QA: **5136/0**
- encounter-purpose QA: **4337/0**
- device findings QA: **27/0**
- searchable rooms/encounter tracks: **2328/0**
- Adventure Code: **405/0**
- UX4 progression: **1797/0**
- content regression: **5830/0**
- focused patch-15 runtime gate: **6844/0**
- inline JavaScript syntax: **0 errors**

Fresh Chromium interaction smoke on exact patch-15 HTML: **22/0**.

Harness caveat: Chromium proof uses injected document content plus an in-memory localStorage shim. Native persistence, clipboard/paste and physical touch are not certified by this harness.

## ACTIVE GATE
Physical iPad/mobile certification is the only remaining UX5A merge gate.

Canonical checklist:
`docs/UX5A_GATE_REVIEW_2026-10-27.md`

Browser evidence:
`docs/UX5A_BROWSER_QA_2026-10-27.md`

Do not merge UX5A until physical gate is green.

## WORKSTREAM PRIORITY
The project has explicitly returned to **gameplay/runtime**.

Visual work is paused. Do not continue Structural Map V3 or visual asset production unless the user explicitly reopens that workstream.

Gameplay-return handoff:
`docs/GAMEPLAY_RETURN_HANDOFF_2026-10-27.md`

## CONTENT / NARRATIVE PREP
The complete existing content bank has already been editorially reviewed:
- MONSTERS
- PEOPLE
- FRIENDS
- TRAPS
- MYSTERIES
- TREASURES

The nine current `CRYSTAL_MACHINE` Storylet candidates were audited/revised.

There is **no next subject review**. Do not expand the bank.

After UX5A physical green + merge, Narrative Graph V1 comes before UX5B and starts only with `CRYSTAL_MACHINE`.

## VISUAL PREP — PARKED
The V2 structural art direction was manually rejected despite green technical QA. Structural Map V3 introduced a stronger perceptual contract but V3 Gate A has not been implemented and is now paused.

If visual work is reopened later, restart from V3 Gate A, not V1/V2 asset production.

## GITHUB / REPOSITORY HEALTH
Repository health remains open. The exact active runtime/source/assets are not yet fully byte-reconstructable from ordinary repo files.

Do not claim provenance is closed until exact source/runtime/assets are committed through a byte-safe path and verified from repository bytes.

## EXACT NEXT
1. Physical-test the exact patch-15 candidate on iPad/mobile using the 14-point gate.
2. If anything fails, patch UX5A only and rerun affected machine/browser tests.
3. If physical GREEN: record evidence, confirm regressions, merge UX5A to `main`, verify `main`, create fresh `narrative/story-graph-v1`, carry approved prep docs, start NG1.
4. Do not start Narrative Graph runtime, UX5B or Multiscreen before the gate/merge sequence is complete.
5. Keep visual work parked unless explicitly reopened.
