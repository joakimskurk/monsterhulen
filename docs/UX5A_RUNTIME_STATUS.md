# UX5A runtime status

Status: IMPLEMENTED AS BRANCH CANDIDATE; FULL RUNTIME QA PENDING.
Branch: `ux5/searchable-rooms-encounter-tracks`.
Do not merge to `main` yet.

## Implemented
- all-room investigation without pre-spoiling hidden-find rooms,
- deterministic 2/3/4 optional hidden-find targets for KORT/VANLIG/STORT,
- physical-D6 hidden-find search with repeated-low fail-forward behavior,
- full-backpack preservation of revealed finds,
- 3/4-heart monster scale after combat is chosen,
- 3/4-step non-combat progress tracks,
- explicit resolution from full progress, zero combat hearts, or `LØST MED GOD IDÉ`,
- encounter dice separated from heart/progress mutation,
- idempotent search-state re-enrichment,
- legacy migration that upgrades untouched monsters but does not heal an active old fight,
- dedicated UX5A QA covering these invariants.

## Patch structure
UX5A is four ordered patches after UX4: engine/migration, narrator, UI helpers, render/state. See `patches/README.md`.

## Verified
- sequential GNU `patch` application against a realistic source reconstruction: no rejected hunks,
- `git diff --check`: pass,
- patch chain rechecked after the non-spoilery investigation pass and legacy-combat migration fix.

## Not verified yet
- UX5A QA against the canonical reconstructed runtime,
- full regression suite after UX5A,
- browser/iPad interaction.

## Blocker
The canonical runtime is available only as indexed Library content in this execution context; raw materialization is unavailable. Repository-health therefore blocks honest runtime certification from this chat.

## Exact next action
Make the canonical runtime available as raw files, apply patches 1-9, run UX5A + UX4 + Adventure Code + content QA, then perform the manual iPad smoke test. UX5B starts only after that gate is green.
