# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-28
**This is the single status file.** Other files link here instead of repeating status.

## Right now
- **Direction:** V2, a systemic kids' roguelike. See `docs/v2/SYSTEM_DESIGN_V2.md` and `DECISIONS.md` 2026-10-27.
- **Current milestone:** M0, runnable repo (`ROADMAP.md`).
- **Runtime baseline:** V0.12.3 + UX5A patch chain through patch 15, on `ux5/searchable-rooms-encounter-tracks`. Not merged to `main`.

## V2 design spike (2026-10-28) – deliberate deviation from milestone order
M3 work started early as a **standalone prototype** that does not touch the runtime. Reason: generation order is the owner's main concern and could be proven without `index.html`.
- `content/`: V2 card data, draft 1 (66 figures, 9 obstacles, 49 items, 11 sources, 3 recipes, 5 missions). `npm run validate:content` is green.
- `tools/runsim/`: chain-first generator + playthrough automaton + DM template (`tools/runsim/README.md`).
- Evidence (run from repository bytes): 15 000 runs accepted (5 missions × 3 lengths × 1000 seeds); selftest 4 258 sabotages, 0 missed. `npm run check` reproduces a smaller version.
- `prototype/`: table prototype page for playing a generated run with physical dice (`npm run prototype`, see `prototype/README.md`). Browser-tested on desktop and phone width; a full GLASS_HEART run was played through.
- Not proven: fun, child comprehension, card text quality, real map geometry, integration with the app.

## Runtime candidate (unchanged since 2026-10-27 morning)
- Reconstructed patch-15 candidate SHA-256: `f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`.
- **The candidate is not in the repository.** It was reconstructed outside GitHub. All baseline bundles on `repo-*-v0.12.3` branches are incomplete. For example, `repo-baseline-v0.12.3` lists 18 source parts but contains 15, and none of the thumbnail parts.
- Consequence: tests in `tests/` cannot currently be run from repository bytes.

## Verification (see `TESTING.md` for levels)
- **Reported** automated results for patch 15 (run outside repo): focused gate 6844/0, plus suite (see `TESTING.md`). Not reproducible from repo yet.
- Headless Chromium interaction smoke (reported): 22/0, with in-memory localStorage shim.
- Physical iPad/mobile gate: **OPEN**.
- Known suspicion to check before the physical gate: a story key may be lost if found with a full backpack. Audit F3 in `docs/reviews/2026-10-27_claude_repo_audit.md`.

## What works (V0.12.3 + UX5A)
Map navigation by tap, physical-die entry, searchable rooms with fail-forward, progression gate before finale, secret doors, explicit key use, traps that block forward and allow retreat, optional DM-started combat (3/4 hearts), Adventure Code `MH1`, Helteboka with lasting things, save migration.

## What does not exist yet (needed for V2)
In the app: trade/buying, fetch quests with rewards, figures that give items, followers with abilities, DM override actions (LØS / GI LIKEVEL / ANGRE), two-device play. Tag vocabulary, chain generator and playthrough automaton exist only as the standalone prototype (`content/`, `tools/runsim/`).

## Next actions
0. Owner: play one or two runs at the table with the prototype (`prototype/README.md`) and note what the child understood. Also read a few generated DM templates (`npm run sim -- --mission CRYSTAL_MACHINE --seed 3`) and correct `content/` where figures, wants or weaknesses feel wrong.
1. Owner: put `index.html` + runtime assets into the repo (M0).
2. Owner: bring wishes from the original ChatGPT conversation into `docs/v2/OWNER_WISHES.md`.
3. Owner: review `docs/v2/CONTENT_MATRIX_V2.md` (vocabulary, weaknesses, open questions).
4. Then: close UX5A (M1) using G-tech + G-play.

## Do not regress
Stable IDs, save key `monsterhulen_v120` / state 12, physical-dice-only, explicit key use, one visible room name, trap retreat.
