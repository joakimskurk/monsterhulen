# START HERE - MONSTERHULEN

Updated: 2026-10-27
Status: **V2 DIRECTION DECIDED · UX5A PHYSICAL GATE OPEN · RUNTIME SOURCE NOT YET IN REPO · VISUAL PARKED**

Repository `joakimskurk/monsterhulen` is the permanent source of truth. If chat, memory or an older document disagrees with this repository, the repository wins. Status lives in **one** place: `PROJECT_STATE.md`.

## What Monsterhulen is (V2)
A kids' roguelike for a DM and a child. Each run is assembled from figures, obstacles, items, sources and companions that connect through shared tags (wants / weakness / gives). Every run is proven solvable by an automated playthrough. The DM can always resolve or improvise, and the app records what became true. Play uses two devices: the DM device and the child's iPad. Physical dice, typed in by the DM.

## Read in this order
1. `PROJECT_STATE.md` - where things stand right now.
2. `docs/v2/SYSTEM_DESIGN_V2.md` - canonical design.
3. `ROADMAP.md` - milestones M0-M6.
4. `DECISIONS.md` - newest first (2026-10-27 = V2).
5. `docs/v2/CONTENT_MATRIX_V2.md` - content draft and gaps.
6. `TESTING.md` - verification levels and current evidence.
6b. `content/README.md` and `tools/runsim/README.md` - V2 card data and the generator prototype. Run `npm run check`.
7. Only if working on UX5A: `docs/UX5A_GATE_REVIEW_2026-10-27.md`, `patches/README.md`.

Background (history, not instructions): `docs/reviews/`.

## Branches
| Branch | Role |
|---|---|
| `ux5/searchable-rooms-encounter-tracks` | current runtime candidate (UX5A, patch 15). Physical gate open. |
| `design/v2-system` | V2 design docs (this change). Merge into the active branch / `main` after owner review. |
| `main` | behind; becomes canonical after UX5A merge (M1). |
| `narrative/story-graph-v1-prep` | **superseded** as architecture. Its subject reviews are V2 source material. Do not implement Narrative Graph. |
| `visual/visual-system-v1-prep` | parked. |
| `repo-*-baseline-v0.12.3` | historical; their bundles are incomplete and cannot restore the runtime. |

## Hard rules
- Do not implement Narrative Graph V1.
- Do not start M3/M4 runtime work before M2 (one state + typed actions).
- Do not add patch files; once `index.html` is in the repo, work in ordinary commits.
- Do not claim tests pass unless they were run from repository bytes.
- Keep stable IDs and save compatibility (`monsterhulen_v120`, state 12).
- Update `PROJECT_STATE.md` (only) when status changes. Add durable choices to `DECISIONS.md`.
