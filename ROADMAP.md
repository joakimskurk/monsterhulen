# MONSTERHULEN - ROADMAP

DATO: 2026-10-27
STATUS: **GAMEPLAY/RUNTIME ACTIVE + UX5A PATCH 15 MACHINE/BROWSER GREEN + PHYSICAL IPAD/MOBILE GATE OPEN + VISUAL WORK PARKED**

## LÅSTE PRODUKTPRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter og tolker, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Encounter-mekanikk krever `purpose`, `stakes`, `resolvedWhen`, `payoff` og reelle world effects.
- Ingen generiske fremgangsruter uten skrevne meningsfulle steg.
- Puzzles må ha skrevet funksjon i scenen.
- Forteller-improvisasjon er eksplisitt og scopet; critical story-state kan ikke avhenge av untracked improv.
- Subject, Storylet-role, requirements, provider routes, outcomes og interaction shell er separate lag.
- Kritisk historie bruker `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Story-critical beats har timing/expiry.
- Fysisk terning brukes ved reell usikkerhet; appen ruller aldri digitalt.
- Terningresultat erstatter aldri unmet prerequisite.
- Ting/venner/kjæledyr er affordances, ikke tallbonuser.
- Stable IDs/save compatibility beholdes.
- GitHub er permanent source of truth.

## CURRENT ACTIVE GATE — UX5A
Active branch: `ux5/searchable-rooms-encounter-tracks`.

Patch chain ends at patch 15:
- patch 11 — explicit story-key use
- patch 12 — one visible location identity
- patch 13 — encounter purpose/world-effect contract
- patch 14 — explicit narrator improvisation
- patch 15 — remove remaining zone-name leak from player-visible `room.desc`

Exact reconstructed patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Current evidence:
- focused patch-15 automated gate: **6844/0**
- fresh Chromium interaction smoke: **22/0**
- target-device physical gate: **OPEN**

Canonical physical checklist:
`docs/UX5A_GATE_REVIEW_2026-10-27.md`

Do not merge UX5A until physical iPad/mobile gate is green.

## CURRENT WORKSTREAM PRIORITY
The project has returned to **gameplay/runtime**.

Visual work on `visual/visual-system-v1-prep` is **PARKED**. Do not continue Structural Map V3 or asset production unless the user explicitly reopens that workstream.

Gameplay-return handoff:
`docs/GAMEPLAY_RETURN_HANDOFF_2026-10-27.md`

## HARD SEQUENCING BOUNDARY
While UX5A physical gate is open:
- patch only confirmed UX5A defects on the UX5A branch,
- preserve stable IDs/save compatibility,
- repo-health/provenance and QA/harness improvements are allowed if gameplay semantics remain unchanged,
- do not implement Narrative Graph runtime,
- do not implement full DM Control Surface,
- do not implement UX5B,
- do not implement Multiscreen/Shared Session,
- do not expand the blueprint/content bank,
- do not integrate visual-prep work into runtime/main.

If physical playtest is unavailable, do not skip ahead to a later runtime package.

## EXACT TRANSITION AFTER UX5A PHYSICAL GREEN
1. Record physical evidence.
2. Confirm final relevant automated/browser evidence.
3. Merge `ux5/searchable-rooms-encounter-tracks` to `main`.
4. Verify `main`.
5. Create fresh `narrative/story-graph-v1` from merged `main`.
6. Carry only approved prep docs/specs from `narrative/story-graph-v1-prep`.
7. Start WP-NG1.

## CANONICAL NEXT ARCHITECTURE
Narrative Graph prep lives on `narrative/story-graph-v1-prep`.

Target model:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal
- dramatic phase/expiry
- interaction shell/popup
- typed canonical state transition
- later action history/undo/shared-session sync

## NARRATIVE GRAPH V1 WORK PACKAGES
- NG0 specs/docs — complete/updated on prep
- NG1 graph + provider + typed transition model/validator
- NG2 Storylet Matrix/provider engine
- NG3 Crystal Machine planner
- NG4 runtime materialization + narrator knowledge + minimal DM controls + required shells
- NG5 >=1000 automated graph/state cases
- NG6 real browser/touch QA
- NG7 10–20 manual editorial/family playtests
- NG8 accept/revise/abandon

No second blueprint before NG8.

## CONTENT / EDITORIAL PREP — COMPLETE FOR CURRENT BANK
The full existing bank is reviewed:
- MONSTERS
- PEOPLE
- FRIENDS
- TRAPS
- MYSTERIES
- TREASURES

The nine current `CRYSTAL_MACHINE` Storylet candidates were audited/revised and the Storylet Matrix/provider constraints were consolidated.

**There is no next subject review. Do not expand the bank.**

Current blueprint bank remains only:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

## VISUAL TRACK — PARKED
The V2 structural art direction was manually rejected despite green technical QA. Structural Map V3 introduced a better perceptual contract but V3 production has not started and is paused.

If visual work is reopened later, restart from V3 Gate A only:
- `visual/STRUCTURAL_MAP_V3_PRODUCTION_CONTRACT.md`
- `visual/structural-map-v3-acceptance.json`
- `visual/TILESET_V2_VISUAL_REVIEW_2026-10-27.md`

Do not resume from V1/V2 mass asset production.

## REPOSITORY HEALTH
Still open. Full active runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone.

## EXACT NEXT
**Physical-test the exact patch-15 candidate on iPad/mobile.**

If it fails, patch UX5A only and rerun affected tests.

If it is green, follow the exact 7-step transition above and only then start Narrative Graph V1 runtime work.
