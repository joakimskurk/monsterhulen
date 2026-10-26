# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-26
STATUS: UX5A PATCH 11 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED + REPOSITORY HEALTH ÅPEN

> `PROJECT_STATE.md` er kanonisk handoff. `START_HERE.md` peker til riktig leserekkefølge.

## BASELINE
- Produkt: Monsterhulen
- Release-baseline: V0.12.3 Lasting Thing Identity Pass
- State schema: 12
- Storage: `monsterhulen_v120`
- Aktiv runtime-branch: `ux5/searchable-rooms-encounter-tracks`
- Prep-branch: `narrative/story-graph-v1-prep`
- UX5A er ikke merget til `main`.

## LATEST UX5A CONTRACT
Patch 11 on runtime branch changes keyed story doors:
- door tap only establishes `DØREN ER LÅST`,
- correct key is not auto-used,
- scenario key is protected but exposes explicit `BRUK`,
- child/narrator deliberately chooses key use,
- successful key use opens and removes/archives key but does not traverse,
- later tap traverses,
- narrator may optionally hint `KANSKJE DU HAR NOE I SEKKEN?`.

Durable principle: **having a solution available is not the same as choosing the action**. The app should expose problems and affordances without silently deciding for the child.

## VERIFICATION AFTER PATCH 11
- targeted device QA: **27 / 0**
- UX5A search/encounter: **2216 / 0**
- Adventure Code: **405 / 0**
- UX4 progression: **1797 / 0**
- combined content regression: **5960 / 0**
- 11 inline scripts: **0 syntax errors**

Fresh behavioral reconstruction SHA-256:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

Patch 10 had Chromium 15/0, but its key expectation is superseded. Patch 11 needs fresh browser interaction QA and physical iPad/mobile retest.

## NEXT ARCHITECTURE
After physical UX5A green + merge to `main`: **Narrative Graph V1** before UX5B.

Reference only `CRYSTAL_MACHINE` first: visible requirement reveal, `SEARCH_SECRET`, `NPC_FAVOR`, `GUARDIAN`, deliberate return/assembly, gate only after assembly, explicit dramatic phases/expiry.

The new agency rule also applies here: resource possession must not silently complete an action beat. Owning all crystals is not equivalent to choosing to assemble them.

## GITHUB / REPOSITORY HEALTH
GitHub is permanent source of truth. Complete byte-identical runtime/source/assets baseline remains unresolved, so repository-health is open.

## EXACT NEXT
1. browser-test patch 11 when real-browser harness is available,
2. physically test explicit key flow + puzzle flow + rest of UX5A smoke,
3. classify new findings as UX/story-coherence/architecture before patching,
4. if physical GREEN: document evidence, regress, merge UX5A, verify `main`, create `narrative/story-graph-v1`, carry approved prep docs, start `WP-NG1`,
5. do not start UX5B first.
