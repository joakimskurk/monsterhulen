# UX5A physical device findings - 2026-10-26

Status: **YELLOW - FOLLOW-UP PATCH IMPLEMENTED, BROWSER + PHYSICAL RETEST REQUIRED**
Branch: `ux5/searchable-rooms-encounter-tracks`

Do not merge UX5A to `main` yet.

## Finding 1 - ready locked door was effectively skipped

Observed during live playtest:
- a locked story door was shown,
- the hero already had `GLASSNØKKEL`,
- tapping forward both unlocked the door and moved through it in the same interaction,
- the key still appeared unused in inventory afterwards.

This made the progression gate feel cosmetic even though the underlying prerequisite logic was correct.

### First fix - patch 10
`patches/v0.12.3_playtest_device_findings_hotfix_ux5a.patch` changed the interaction so the first tap opened the door without traversal, consumed/archived the key, and a second tap traversed.

That fixed the accidental one-tap bypass, but continued review exposed a deeper interaction problem; see finding 3.

## Finding 2 - mystery puzzle was not fictionally connected or DM-clear

Observed example:
- encounter: `DEN HVISKENDE VEGGEN`,
- generated puzzle: `STEINTRINNENE`,
- prompt: `1, 2, 3, 4. HVILKEN STEIN TRÅR DERE PÅ ETTER 3?`

The mathematical answer is simply `4`, but the UI did not explain why the stepping-stone puzzle belonged to the whispering wall or what the narrator should do after the child answered. A novice DM should not have to infer this.

### Fix - patch 10
The device-findings hotfix:
- frames the generated puzzle as a clue produced by the current mystery,
- adds a visible collapsed `FORTELLERHJELP` section,
- explicitly says to read the question aloud and let the child think without a die roll,
- provides hint and narrator-only answer,
- renames the action to `PUZZLET ER LØST`,
- solving the puzzle gives exactly `+1 FREMGANG`, because solving the clue is itself a meaningful change in the encounter,
- if that final progress step completes the encounter, normal encounter resolution is used.

Free-form solutions and `LØST MED GOD IDÉ` remain valid. The puzzle is one possible path, not the only correct solution.

## Finding 3 - the app should present the lock, not auto-apply the solution

Continued physical-review judgement:
- even the patch-10 two-step behavior still used the correct key automatically when the child tapped the locked door,
- this removes an important child decision,
- the better play pattern is for the child to notice the locked door, think of a solution, and deliberately choose an item/action,
- if the child is stuck, the narrator may give an open hint such as `KANSKJE DU HAR NOE I SEKKEN?` without naming the answer.

This is a product-principle issue, not cosmetic polish: **the app should expose the problem and preserve room for the child's idea before applying a known solution.**

### Follow-up fix - patch 11
`patches/v0.12.3_playtest_explicit_story_key_use_ux5a.patch` changes keyed story doors as follows:
- tapping a locked keyed door only reports `DØREN ER LÅST`,
- the tap does not unlock, traverse or consume the key,
- first discovery logs only that a locked door was found; it does not reveal which item solves it,
- the current scenario key remains protected from `BRUK OPP / LEGG FRA`,
- the scenario key now has an explicit `BRUK` button in the backpack,
- `BRUK` only performs the special key action when the hero is beside the matching locked story door,
- successful explicit use removes the key, explains that it remains in the lock, and opens the door,
- successful key use still does **not** traverse,
- a later door/map tap traverses the already-open door,
- Forteller guidance may suggest `KANSKJE DU HAR NOE I SEKKEN?` if help is needed, but does not tell the child to use the key automatically.

Non-key progression gates retain their existing open-first / traverse-later behavior when their authored prerequisite is satisfied.

## Verification after patch 11

Patch 11 SHA-256:

`276711322f02586f481214011a85a236476d22a524c98c7e96a82c9d1533decf`

Fresh text reconstruction through patch 11 in the current work session:

`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

This runtime hash is a behavioral reconstruction artifact, not a byte-identical release-baseline claim.

Automated evidence against that reconstruction:
- targeted `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**,
- searchable-room/encounter QA: **2216 PASS / 0 FAIL**,
- Adventure Code: **405 PASS / 0 FAIL**,
- UX4 progression: **1797 PASS / 0 FAIL**,
- combined content regression: **5960 PASS / 0 FAIL**,
- 11 inline JavaScript blocks: **0 syntax errors**.

The earlier patch-10 Chromium smoke was **15 PASS / 0 FAIL**, but its key-door expectation is superseded. Patch 11 therefore still requires a fresh browser interaction smoke; do not reuse the old 15/0 as evidence for the new key flow.

## Exact next physical action

On the new patch-11 build, test `GLASS_HEART` on iPad/mobile:
1. obtain `GLASSNØKKEL`,
2. approach the matching locked story door,
3. tap the door: it must stay locked and only communicate that it is locked,
4. give the child room to suggest a solution; do not prompt immediately,
5. if genuinely stuck, narrator may say something open like `KANSKJE DU HAR NOE I SEKKEN?`,
6. open the backpack and verify `GLASSNØKKEL` is marked important but has `BRUK`,
7. press `BRUK` on the key: the door must open, the key must leave the backpack with clear fiction feedback, and the hero must remain in the same room,
8. tap the now-open door: only now may the hero traverse.

Also retest a `MYSTISK` puzzle encounter: the narrator should understand what to read, what the child is trying to solve, where hint/fasit are, and that solving it gives one progress step.

If these are green and the rest of the UX5A device smoke remains green, record evidence and follow the merge transition in `START_HERE.md`. Otherwise keep patching UX5A; Narrative Graph runtime remains blocked.
