# UX5A physical device findings - 2026-10-26

Status: **YELLOW - HOTFIX IMPLEMENTED, PHYSICAL RETEST REQUIRED**
Branch: `ux5/searchable-rooms-encounter-tracks`

Do not merge UX5A to `main` yet.

## Finding 1 - ready locked door was effectively skipped

Observed during live playtest:
- a locked story door was shown,
- the hero already had `GLASSNØKKEL`,
- tapping forward both unlocked the door and moved through it in the same interaction,
- the key still appeared unused in inventory afterwards.

This made the progression gate feel cosmetic even though the underlying prerequisite logic was correct.

### Fix
`patches/v0.12.3_playtest_device_findings_hotfix_ux5a.patch` changes the interaction contract:
- first tap on a ready locked story gate opens it but does **not** move the hero,
- the child therefore gets an explicit door-opening beat,
- a scenario key is removed from the backpack when used,
- the log explains that the key remains in the lock,
- a second tap moves through the now-open door,
- an unmet prerequisite still blocks movement exactly as before.

## Finding 2 - mystery puzzle was not fictionally connected or DM-clear

Observed example:
- encounter: `DEN HVISKENDE VEGGEN`,
- generated puzzle: `STEINTRINNENE`,
- prompt: `1, 2, 3, 4. HVILKEN STEIN TRÅR DERE PÅ ETTER 3?`

The mathematical answer is simply `4`, but the UI did not explain why the stepping-stone puzzle belonged to the whispering wall or what the narrator should do after the child answered. A novice DM should not have to infer this.

### Fix
The same hotfix now:
- frames the generated puzzle as a clue produced by the current mystery,
- adds a visible collapsed `FORTELLERHJELP` section to the puzzle card,
- explicitly says to read the question aloud and let the child think without a die roll,
- provides hint and narrator-only answer,
- renames the action to `PUZZLET ER LØST`,
- solving the puzzle automatically gives exactly `+1 FREMGANG`, because solving the clue is itself a meaningful change in the encounter,
- if that final progress step completes the encounter, normal encounter resolution is used.

Free-form solutions and `LØST MED GOD IDÉ` remain valid. The puzzle is one possible path, not the only correct solution.

## Verification
Hotfixed reconstructed runtime SHA-256:

`fc1bf19ba8a95ccc25b7735a7da0cbc2f52187a37f0fdb357f043695377d72ca`

Hotfix patch SHA-256:

`1dd09c98a37234c418b60fd522808b28b23ce86f9054fc7d88b752d9deb55177`

Targeted Node regression `tests/QA_DEVICE_FINDINGS_UX5A.js`:
- **19 PASS / 0 FAIL**
- includes all 11 inline JavaScript blocks with 0 syntax errors.

Real Chromium interaction smoke:
- **15 PASS / 0 FAIL**
- verified mystery narrator help renders,
- verified puzzle solve advances from 0 to 1 progress,
- verified deterministic `GLASS_HEART` gate,
- verified first lock tap opens without traversal,
- verified used key leaves inventory with explicit fiction log,
- verified second tap traverses the opened gate.

## Exact next action
Retest these two interactions on the physical iPad/mobile build:
1. approach the `GLASS_HEART` story gate with `GLASSNØKKEL`; first tap must only open it and consume/archive the key, second tap may traverse,
2. play a `MYSTISK` encounter with a puzzle; the narrator should understand what to read, what the child is trying to solve, where hint/fasit are, and that solving it gives one progress step.

If these are green and the rest of the UX5A device smoke remains green, UX5A may be merged to `main`. Otherwise keep patching this branch.
