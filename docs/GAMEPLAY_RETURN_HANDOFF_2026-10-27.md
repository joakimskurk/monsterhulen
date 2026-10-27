# Monsterhulen — Gameplay Return Handoff

Updated: 2026-10-27
Authoritative gameplay branch: `ux5/searchable-rooms-encounter-tracks`
Status: **GAMEPLAY/RUNTIME IS THE ACTIVE WORKSTREAM AGAIN**

## Purpose
Visual production is intentionally paused. The project returns to gameplay/runtime work.

This does **not** remove the current UX5A gate. The active runtime package is still UX5A patch 15, and it must still be physically tested on target iPad/mobile before merge.

## Active runtime state
Branch: `ux5/searchable-rooms-encounter-tracks`

Current candidate:
- V0.12.3 / UX5A patch 15
- exact reconstructed candidate SHA-256: `f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Machine/browser evidence remains green:
- patch-15 focused automated gate: **6844/0**
- fresh Chromium interaction smoke: **22/0**
- physical target-device gate: **OPEN**

Canonical physical checklist:
`docs/UX5A_GATE_REVIEW_2026-10-27.md`

Browser evidence:
`docs/UX5A_BROWSER_QA_2026-10-27.md`

## What "back to gameplay" means now
The gameplay/runtime branch is once again the primary branch for project continuation.

Until UX5A physical green:
- fix only confirmed UX5A/runtime defects on the UX5A branch,
- preserve patch-15 candidate/test evidence,
- do not start Narrative Graph runtime,
- do not start UX5B,
- do not start Multiscreen/Shared Session,
- do not merge visual-prep work into runtime/main,
- do not expand the content/blueprint bank.

If physical testing is unavailable, do not skip the gate by implementing a later runtime package. Safe work is limited to repo-health/provenance, QA/harness improvements and documentation that do not change later gameplay packages.

## Exact transition after physical UX5A GREEN
1. Record physical test evidence in repo.
2. Confirm final relevant automated/browser evidence.
3. Merge `ux5/searchable-rooms-encounter-tracks` to `main`.
4. Verify `main`.
5. Create fresh `narrative/story-graph-v1` from merged `main`.
6. Carry only approved prep docs/specs from `narrative/story-graph-v1-prep`.
7. Start WP-NG1.

Do not start NG1 before steps 1–6 are complete.

## Narrative/gameplay prep already complete
Branch: `narrative/story-graph-v1-prep`

The existing content bank has been editorially reviewed across:
- MONSTERS,
- PEOPLE,
- FRIENDS,
- TRAPS,
- MYSTERIES,
- TREASURES.

There is no next subject review. Do not expand the bank.

The nine current `CRYSTAL_MACHINE` Storylet candidates were audited/revised, and the Storylet Matrix/provider rules were consolidated. This remains prep only until the runtime gate is cleared.

## Visual work — PARKED
Branch: `visual/visual-system-v1-prep`

Visual work is intentionally paused by project direction as of 2026-10-27.

Do not continue Structural Map V3, generate more visual assets, or integrate visual-prep code unless the user explicitly reopens the visual workstream.

Retained visual handoff if reopened later:
- V2 engineering pipeline was useful but V2 art direction was manually rejected.
- Structural Map V3 contract is the current visual restart point.
- Canonical principle: **ROOM FIRST, GRID SECOND**.
- Start at **V3 Gate A only**, not mass asset production.
- Manual screenshot acceptance is mandatory before expansion.

Canonical visual restart files:
- `visual/STRUCTURAL_MAP_V3_PRODUCTION_CONTRACT.md`
- `visual/structural-map-v3-acceptance.json`
- `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`

V2/V1.x visual attempts remain historical evidence/lessons, not approved production art.

## Repository health
Repository health remains open: the exact active runtime HTML/assets are still not fully byte-reconstructable from ordinary GitHub files alone.

Do not claim provenance is closed until a byte-safe source/runtime/assets package is committed and verified from repository bytes.

## New-chat rule
A new chat continuing gameplay should start on `ux5/searchable-rooms-encounter-tracks`, read `START_HERE.md`, and follow its read order. Do not start from the visual branch.
