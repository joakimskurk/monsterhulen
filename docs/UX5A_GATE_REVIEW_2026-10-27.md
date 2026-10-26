# UX5A gate review - 2026-10-27

Status: **PATCH 15 MACHINE GREEN + CHROMIUM INTERACTION 22/0 + PHYSICAL RETEST OPEN**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`

Purpose: walk the entire UX5A merge gate, close everything that can be established from source/runtime/browser automation, and leave only claims that genuinely require target-device/human evidence.

## Exact candidate under test
The current indexed patch-14 source was reconstructed using line-segmented Project/Library materialization. Patch 15 applied cleanly.

Patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

## Machine verification - GREEN
- single location **21/0**
- explicit improv **20/0**
- authored mysteries only **5136/0**
- encounter purpose **4337/0**
- device findings **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 progression **1797/0**
- content regression **5830/0**
- focused patch-15 runtime gate **6844/0**
- 11 inline scripts **0 syntax errors**

The previously documented `QA_AUTHORED_MYSTERIES_ONLY_UX5A.js` was missing from the repository tree and has now been restored. Current result is 5136/0; the old 3075/0 remains historical evidence only.

## Fresh Chromium interaction QA - 22/0
Exact patch-15 HTML was injected into headless Chromium via DevTools because this container prevented Chromium from navigating to the local candidate through localhost or `file://`.

The injected `about:blank` origin denies native localStorage, so the harness supplied a minimal in-memory localStorage shim before loading the unchanged app HTML.

This browser smoke is valid for DOM/click/mobile-view behavior, but does not certify native persistence or clipboard.

See `docs/UX5A_BROWSER_QA_2026-10-27.md`.

---

## Gate item 1 - Boka som skriver tilbake: authored vs improv responsibility
**MACHINE GREEN; PHYSICAL COMPREHENSION REQUIRED**

Verified:
- `FORTELLER-IMPROVISASJON`,
- `INGEN SKJULT FASIT`,
- no larger predetermined hidden plan,
- concrete per-scene prompt,
- book remains optional/non-blocking.

Physical question: does a real narrator understand this immediately during play?

## Gate item 2 - improv bounded / no mandatory state
**MACHINE GREEN; PHYSICAL/EDITORIAL CLARITY REQUIRED**

Verified guardrails allow atmosphere/optional hint/side discovery but forbid mandatory story keys or contradiction of tracked state.

## Gate item 3 - Regnbuenettet has no generic progress boxes
**MACHINE GREEN**

Verified by encounter-purpose + focused runtime tests. `REGNBUENETTET` has no arbitrary 3/4 filler track.

## Gate item 4 - narrator purpose / solve / payoff
**MACHINE GREEN; PHYSICAL COMPREHENSION REQUIRED**

Verified current narrator semantics expose `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`.

## Gate item 5 - active trap blocks onward, retreat works, resolution frees route
**MACHINE GREEN; BROWSER INTERACTION GREEN; PHYSICAL REQUIRED**

Real `move()` behavioral test proves active trap blocks forward, allows retreat, and clear state allows forward movement. Browser smoke confirms trap resolve interaction and no stale blocker controls after resolution.

## Gate item 6 - ambient mysteries do not receive disconnected random puzzles
**MACHINE GREEN**

Restored dedicated test samples 1024 mysteries and covers all six current subjects. No random puzzle attachment without explicit opt-in.

## Gate item 7 - one clear visible room identity
**FOUND DEFECT -> PATCH 15 -> MACHINE GREEN -> BROWSER GREEN -> PHYSICAL REQUIRED**

Original remaining defect:
`room.desc=${zone.name}. ${room.name}. ...`

Patch 15 changes player-visible description to start with `${room.name}.` while retaining `zoneName` internally.

Verified:
- single-location **21/0**,
- focused runtime test,
- browser smoke rendered e.g. `ROM: STARTPORTEN` + `STARTPORTEN. ...` with no second area badge.

## Gate item 8 - explicit story-key flow child-driven
**MACHINE GREEN; PHYSICAL REQUIRED**

Verified locked-door tap only reports locked; key possession does not auto-use/unlock/traverse; explicit key use opens; movement remains separate.

## Gate item 9 - `SE DEG RUNDT` feels exploratory rather than compulsory
**MACHINE/BROWSER FLOW GREEN; PHYSICAL JUDGEMENT REQUIRED**

Browser smoke confirms control renders and transitions correctly. Whether children feel compelled to use it in every room remains a physical UX question.

## Gate item 10 - hidden-find fail-forward / full backpack by touch
**MACHINE GREEN; PHYSICAL TOUCH REQUIRED**

Verified first low strengthens clue, repeated low reveals, full backpack preserves find. Touch feel remains open.

## Gate item 11 - 3-heart normal / 4-heart SPENNING combat controls
**MACHINE GREEN; BROWSER INTERACTION GREEN; PHYSICAL TOUCH REQUIRED**

Verified 3/4 heart scale. Browser smoke started combat explicitly and rendered 3-heart combat state.

## Gate item 12 - final heart / non-combat resolution understandable
**MACHINE/BROWSER CONTROL AVAILABILITY GREEN; PHYSICAL COMPREHENSION REQUIRED**

Browser smoke confirms explicit combat choice and non-combat resolve coexist. Human comprehension remains open.

## Gate item 13 - representative legacy active-combat save
**MACHINE MIGRATION GREEN; PHYSICAL SAVE SMOKE IF AVAILABLE**

Search/encounter regression verifies old active fights normalize max hearts without healing lost hearts.

## Gate item 14 - Adventure Code copy/paste / persistence
**AUTOMATED 405/0; BROWSER RENDER GREEN; NATIVE DEVICE BEHAVIOR REQUIRED**

Adventure Code generation/rendering is green. Current Chromium harness does not certify native clipboard or native localStorage persistence.

Target device must test:
- save/reload/resume,
- code copy,
- paste/open narrator flow.

---

## Patch 15 artifacts
Patch:
`patches/v0.12.3_playtest_room_description_location_identity_ux5a.patch`

Patch SHA-256:
`f8cd1e6c746541961ebf9308e62763d58a27ae705bee42886d56c082ceb620a5`

Updated location QA:
`tests/QA_SINGLE_LOCATION_NAME_UX5A.js`

Restored mystery QA:
`tests/QA_AUTHORED_MYSTERIES_ONLY_UX5A.js`

Focused runtime QA:
`tests/QA_PATCH15_GATE_RUNTIME.js`

## Exact remaining human gate
On the exact patch-15 build, actual iPad/mobile must verify:
1. Boka narrator responsibility is obvious,
2. improv wording is useful/bounded,
3. Regnbuenettet has no filler boxes,
4. narrator understands purpose/solve/payoff,
5. trap blocking/retreat/resolve feels clear by touch,
6. ambient mysteries remain coherent in play,
7. one visible location identity feels clear,
8. key use feels child-driven,
9. `SE DEG RUNDT` feels optional/exploratory,
10. hidden-find/full-backpack flow is usable by touch,
11. 3/4-heart combat controls are usable,
12. final-heart/non-combat resolution is understandable,
13. representative legacy active-combat save if available,
14. native save/reload + Adventure Code copy/paste work.

If any physical finding fails, patch UX5A only and repeat affected tests.

If physical gate is green, follow `START_HERE.md`: record evidence -> confirm final regression -> merge UX5A to `main` -> verify `main` -> create `narrative/story-graph-v1` -> carry approved prep docs -> start NG1.

Narrative Graph runtime, full DM Control Surface, UX5B and Multiscreen remain blocked until then.
