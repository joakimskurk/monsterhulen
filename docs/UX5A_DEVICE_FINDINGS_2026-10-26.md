# UX5A physical device findings - 2026-10-26

Status: **YELLOW - FOLLOW-UP PATCH IMPLEMENTED, BROWSER + PHYSICAL RETEST REQUIRED**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`

Do not merge UX5A to `main` yet.

## Finding 1 - ready locked door was effectively skipped
Observed during live playtest:
- a locked story door was shown,
- hero already had `GLASSNØKKEL`,
- tapping forward both unlocked and moved through it,
- key still appeared unused afterwards.

Patch 10 initially changed this to open-first/traverse-second and consumed/archived the key. That fixed the one-tap bypass, but continued review exposed a deeper interaction problem; see finding 3.

## Finding 2 - mystery puzzle was not fictionally connected or DM-clear
Observed example:
- encounter `DEN HVISKENDE VEGGEN`,
- puzzle `STEINTRINNENE`,
- narrator could infer the answer but not why the puzzle belonged to the mystery or what solving it should do.

Patch 10:
- frames puzzle as a clue produced by the current mystery,
- adds collapsed `FORTELLERHJELP`,
- says to let child think without a die roll,
- provides hint and narrator-only answer,
- `PUZZLET ER LØST` gives exactly +1 progress,
- free-form solutions and `LØST MED GOD IDÉ` remain valid.

## Finding 3 - app should present the lock, not auto-apply the solution
Continued physical-review judgement:
- even patch-10 two-step behavior still used the correct key automatically when the child tapped the locked door,
- this removes an important child decision,
- desired play is to notice the locked door, think of a solution and deliberately choose an item/action,
- if child is stuck, narrator may give an open hint such as `KANSKJE DU HAR NOE I SEKKEN?` without naming the answer.

This is a product-principle issue: **the app should expose the problem and preserve room for the child's idea before applying a known solution.**

### Follow-up fix - patch 11
Runtime patch:
`patches/v0.12.3_playtest_explicit_story_key_use_ux5a.patch`

Behavior:
- tapping a locked keyed door only reports `DØREN ER LÅST`,
- tap does not unlock, traverse or consume key,
- first discovery logs only that a locked door was found,
- current scenario key remains protected from `BRUK OPP / LEGG FRA`,
- scenario key has explicit `BRUK`,
- `BRUK` performs special key action only when hero is beside matching locked story door,
- successful use removes key, explains it remains in lock and opens door,
- successful key use does not traverse,
- later door/map tap traverses,
- Forteller may suggest `KANSKJE DU HAR NOE I SEKKEN?` if help is needed but should not immediately give the solution.

Non-key progression gates retain existing open-first/traverse-later behavior when their authored prerequisite is explicitly satisfied.

## Verification after patch 11
Patch 11 SHA-256:
`276711322f02586f481214011a85a236476d22a524c98c7e96a82c9d1533decf`

Fresh text reconstruction through patch 11:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

The runtime hash is a behavioral reconstruction artifact, not a byte-identical release-baseline claim.

Automated evidence:
- targeted device QA: **27 PASS / 0 FAIL**,
- searchable-room/encounter QA: **2216 PASS / 0 FAIL**,
- Adventure Code: **405 PASS / 0 FAIL**,
- UX4 progression: **1797 PASS / 0 FAIL**,
- combined content regression: **5960 PASS / 0 FAIL**,
- 11 inline JavaScript blocks: **0 syntax errors**.

Patch-10 focused Chromium was **15 PASS / 0 FAIL**, but the key-door expectation is superseded. Patch 11 therefore needs fresh browser interaction smoke; old 15/0 is not proof of the new key flow.

## Exact next physical action
On patch-11 build, test `GLASS_HEART`:
1. obtain `GLASSNØKKEL`,
2. approach matching locked story door,
3. tap door: it must stay locked and only communicate that it is locked,
4. give child time to suggest a solution,
5. if genuinely stuck, narrator may say something open like `KANSKJE DU HAR NOE I SEKKEN?`,
6. open backpack and verify `GLASSNØKKEL` is important but has `BRUK`,
7. press `BRUK`: door opens, key leaves backpack with fiction feedback, hero remains in same room,
8. tap now-open door: only now may hero traverse.

Also retest a `MYSTISK` puzzle encounter: narrator should understand what to read, what child is trying to solve, where hint/fasit are, and that solving gives one progress step.

If these and the rest of UX5A smoke are green, follow the exact merge transition in `START_HERE.md`. Otherwise keep patching UX5A; Narrative Graph runtime remains blocked.
