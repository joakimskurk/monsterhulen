# UX5A browser QA - 2026-10-27

Status: **22/0 HEADLESS CHROMIUM INTERACTION SMOKE GREEN WITH STORAGE HARNESS SHIM**
Runtime target: patch-15 reconstructed candidate

## Candidate under test
The current indexed patch-14 source was reconstructed from line-segmented Project/Library materialization, then patch 15 was applied cleanly.

Patch-15 reconstructed candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Patch 15 itself:
`patches/v0.12.3_playtest_room_description_location_identity_ux5a.patch`

## Why a browser harness shim was required
In this container Chromium could start, but it was unable to load the candidate through either localhost or `file://`; those navigations produced Chromium error pages even though Python could read/serve the same file.

Direct DevTools `Page.setDocumentContent` successfully loaded the exact HTML into headless Chromium. The resulting `about:blank` origin denies native `localStorage`, so the harness installed a minimal in-memory `localStorage` implementation before injecting the unchanged application HTML.

This means:
- DOM/render/click/state interaction behavior is real Chromium behavior,
- the application HTML under test is the exact patch-15 candidate,
- persistence semantics of the browser's native `localStorage` are **not** certified by this smoke,
- real clipboard/prompt behavior is **not** certified,
- physical iPad/mobile remains required.

Do not describe this as full browser persistence certification.

## Results - 22 PASS / 0 FAIL
Passed:
1. page title renders as Monsterhulen,
2. setup modal is visible initially,
3. Start Eventyr closes setup,
4. patch-15 room description begins with canonical room name,
5. no second `roomToneBadge` exists,
6. `SE DEG RUNDT` control renders,
7. search click transitions into searched-state UI,
8. an `MH1.` Adventure Code renders,
9. DM button exists,
10. DM overlay opens,
11. DM-added trap exposes `HINDRINGEN ER LØST`,
12. at least one movement direction is available after trap resolution,
13. movement changes current room,
14. a trap in an entered room leaves at least one retreat control enabled,
15. forward-block representation was inspected for the generated topology,
16. resolving the trap leaves no stale `×` blocker controls,
17. generated monster exposes explicit `BARNET VELGER KAMP`,
18. non-combat resolve is available alongside combat choice,
19. starting combat exposes the heart-hit control,
20. combat state visibly labels `KAMP` and renders hearts,
21. mobile viewport (390x844, DPR 2) exposes mobile tabs,
22. mobile room panel remains active/usable.

The generated browser sample showed a normal monster with 3 hearts during combat.

## What this browser smoke does not replace
Still required on actual iPad/mobile:
- native localStorage save/reload/resume,
- real clipboard copy/paste of Adventure Code,
- touch target ergonomics,
- full-backpack touch flow,
- physical die button feel,
- narrator comprehension,
- whether `SE DEG RUNDT` feels voluntary,
- final-heart/non-combat comprehension,
- actual visual clarity on target hardware,
- representative legacy save if available.

## Related automated evidence on the same patch-15 candidate
- single location: **21/0**
- explicit improv: **20/0**
- authored mysteries only: **5136/0**
- encounter purpose: **4337/0**
- device findings: **27/0**
- search/encounter: **2328/0**
- Adventure Code: **405/0**
- UX4 progression: **1797/0**
- content regression: **5830/0**
- patch-15 focused runtime gate: **6844/0**
- 11 inline scripts: **0 syntax errors**

Narrative Graph runtime remains blocked until the physical UX5A gate is green and UX5A is merged.
