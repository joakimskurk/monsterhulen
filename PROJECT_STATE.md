# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-28
**This is the single status file.** Other files link here instead of repeating status.

## Right now
- **Direction:** V2, a systemic kids' roguelike. See `docs/v2/SYSTEM_DESIGN_V2.md` and `DECISIONS.md` 2026-10-27.
- **Current milestone:** M0, runnable repo (`ROADMAP.md`).
- **Runtime baseline:** V0.12.3 + UX5A patch chain through patch 15, on `ux5/searchable-rooms-encounter-tracks`. Not merged to `main`.

## V2 design spike (2026-10-28) – deliberate deviation from milestone order
M3 work started early as a **standalone prototype** that does not touch the runtime. Reason: generation order is the owner's main concern and could be proven without `index.html`.
- `content/`: V2 card data, draft 1 (66 figures, 9 obstacles, 50 items, 11 sources, 9 recipes; 5 classic missions plus composed missions from `content/themes.json`, one per mission type, with a new theme for every code: see `DECISIONS.md` 2026-10-28). `npm run validate:content` is green. Every want, tool-requiring source and recipe has a sign, so hint step 1 is never empty (enforced by the validator). Changes to six never-used figures: `docs/v2/CONTENT_MATRIX_V2.md` §7b.
- `tools/runsim/`: chain-first generator + playthrough automaton + DM template (`tools/runsim/README.md`).
- Evidence (run from repository bytes, rerun 2026-10-28 after the content changes): 30 000 runs accepted (10 missions: 5 composed + 5 classic, × 3 lengths × 1000 seeds; for composed missions every seed is also a new theme); selftest 7 659 sabotages, 0 missed (fewer sabotage chances on the grid maps); all 66 figures appear as guaranteed solutions. `npm run check` reproduces a smaller version.
- `prototype/`: table prototype for playing a generated run with physical dice, now with **two screens** (DM page + child's iPad page over the home network, `npm run prototype:lan`, see `prototype/README.md`). Browser-tested: a full GLASS_HEART run on one screen, and a full WITCH_CAT run on two screens (move, search, take, trade, solve obstacle, calm target, double taps). Not yet tested on a real iPad.
- `tests/v2/player-view-leak.test.mjs`: 14 000 child views checked; no signs, solutions or DM wording leak, and hidden items never appear as things, in the backpack or in the log (structural check, mutation-tested).
- `tests/v2/table-play.test.mjs` (in `npm run check`): plays runs through the DM page's table rules (`prototype/table.mjs`, shared with the page) as a DM would: accepting what the child gives, one need at a time, the DM button, recipes, double taps. The backpack must be exact after every action, and GI LIKEVEL must always finish. 750 runs in `check`; 9 000 runs (300 seeds) green once. Mutation-tested: 7 of 7 known bug types caught. It found two older bugs, both fixed: things made in a run were used up when given even if they last, and giving something could spend two of a kind.
- **M5 in the prototype (2026-10-28):** end of run with a summary on both screens, Helteboka (friends, 12 lasting TING chosen one per run, memories) and bringing one friend and one TING into the next run. Decisions B1–B6 in `DECISIONS.md`; tested by `tests/v2/herobook.test.mjs` and the table play test, and played through on two screens in the browser. Not tested with a child.
- **Before the first table session (2026-10-28):** the table test now also plays every run with the extra things that lie around and with a brought friend. It found that a friend's help used up the planned item from the backpack (fixed). Helteboka has a backup (**Lagre kopi** / **Hent kopi**; broken files are refused). Session sheet: `docs/v2/PLAYTEST_V2.md`.
- **iPad text first; assets in their own file (owner, 2026-10-28):** the iPad shows text, with a small placeholder picture before names. Everything to be generated is listed in `content/assets.json` (283 entries, all placeholders, one target file each); content cards carry no picture fields, and the validator requires one asset per card. The speaker button stays for now.
- **Image pipeline ready, no images yet (2026-10-28):** shared style `content/art-style.json`, a subject per asset, `npm run assets:orders` for AI image orders, sidecar per image, status placeholder → generated → approved, approved images shown on the iPad. Walked through end to end with a hand-made test image (validator cases and iPad display), then removed. Workflow: `content/README.md` «Assets».
- **Map like the original (2026-10-28, from the first table session):** the owner found the abstract circles hard to playtest and shared the original (`Monsterhulen_CONNECTIONS_V2_IMPLEMENTED.html`, V0.12.3, not in the repo). `tools/runsim/map.mjs` now lays out rooms of different sizes on a grid with doors on shared walls, following that generator, with V2's spine, gates and zones on top; room names and mood from the original are in `content/places.json`. Both screens draw rooms and doors (`prototype/map-view.mjs`), the iPad with fog. New `tests/v2/map.test.mjs`. Also from the session: a thing the child gets pops up big, and she drags it into the backpack.
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
