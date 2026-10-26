# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX/story findings. UX5A physical device retest remains open. Narrative Graph V1 is next only after UX5A is physically green and merged.

## 1. Encounters are too ambiguous for the DM
Observed:
- consequences can look mandatory rather than suggestions,
- child actions may not match generated options,
- items can feel consumed when they should remain narratively available,
- novice DM may not understand a figure's role or when dice are relevant.

Implemented over successive UX layers:
- `FRITT KAST`,
- ordinary `BRUK` does not consume items,
- beginner narrator guidance,
- six physical D6 faces record exact die input,
- patch 13 adds explicit purpose/stakes/resolution/payoff semantics,
- patch 14 explicitly labels intentional narrator-improvisation.

Still open: eventual narrator mode should use actual graph/map-supported context after Narrative Graph V1.

## 2. Map navigation is not child-intuitive enough
Observed: children try to tap the map before arrow controls.

Implemented: map-primary navigation with tappable `?`, locks and known adjacent rooms; arrows remain fallback.

## 3. Dice input should look like a physical die
Implemented: six D6 faces with pips; exact physical face stored; no digital RNG.

## 4. Finale could be reached too early
UX4 fixed structural progression with explicit story gates, reachable prerequisites and no secret-path/die bypass.

Later playtest showed that a valid prerequisite may still be narratively weak; see findings 8 and 11.

## 5. Secret doors need discovery play
Implemented: clue -> optional investigation -> physical D6 only when uncertain -> stronger low-result clue -> discovery. Secrets cannot bypass story gates.

## 6. Rooms need a reason to be investigated without becoming loot detectors
UX5A:
- every room initially offers `SE DEG RUNDT`,
- UI does not reveal which rooms contain optional finds,
- KORT/VANLIG/STORT target 1/2/3 deterministic optional finds,
- finds avoid critical rooms,
- first low search strengthens clue, repeated low fails forward,
- full backpack preserves revealed find,
- generic finds never become story prerequisites.

Manual question remains whether `SE DEG RUNDT` feels voluntary rather than compulsory.

## 7. Encounters need durable consequences, not generic duration
Initial UX5A response to one-roll victories was to give generated non-treasure encounters a generic 3/4-step progress track. Physical play later showed the model was too abstract.

Patch 13 supersedes the generic progress assumption:
- monster combat keeps explicit 3/4 hearts only after the child chooses combat,
- non-combat encounters resolve through an authored fictional condition,
- progress UI exists only if content has explicit authored `progressStages`,
- one genuinely sufficient plan may solve a simple encounter directly,
- dice determine uncertainty of an attempted action, not encounter duration.

## 8. Critical prerequisites are structurally valid but narratively disconnected
Observed in `CRYSTAL_MACHINE`: three required crystals could be isolated `DEL` pickups with no clear fictional requirement reveal, setup or payoff.

Decision: Narrative Graph V1 + curated Storylet Matrix. Initial reference mix: `SEARCH_SECRET`, `NPC_FAVOR`, `GUARDIAN`, followed by deliberate return/assembly.

## 9. Physical device finding: ready story gate felt cosmetic
Observed: hero with `GLASSNØKKEL` could tap a gate and both unlock + traverse; key looked unused.

Patch 10 initially changed this to open-first/traverse-second. Continued review found that even this let the app choose the solution automatically. See finding 12.

## 10. Physical device finding: random puzzle can be logically valid but fictionally irrelevant
Observed example: `DEN HVISKENDE VEGGEN` + unrelated-looking `STEINTRINNENE` puzzle.

Patch 13 establishes the deeper rule:
- ambient random puzzles are opt-in, not automatic,
- puzzle requires an authored contextual role,
- thinking/answering needs no die,
- solving a puzzle does not award generic progress,
- fiction decides what the clue changes.

## 11. Story complication can arrive after its dramatic purpose is gone
Observed: `SKYGGEHEKSA`, meant to make the main task harder, could appear only after the task was already complete.

Narrative Graph V1 therefore requires explicit phases/expiry and separately authored later roles.

## 12. Possessing the solution must not make the app choose the action
Observed: patch 10 still auto-used `GLASSNØKKEL` when the locked door was tapped.

Patch 11:
- keyed locked-door tap only says `DØREN ER LÅST`,
- no auto unlock/traverse/key consumption,
- scenario key remains protected but has explicit `BRUK`,
- matching key use opens but does not traverse,
- Forteller may give an open backpack hint if needed.

General rule: app presents obstacles and affordances before applying possessed solutions.

## 13. Player-facing rooms had two competing names
Observed: room name plus zone/area name made one physical place feel like two places.

Patch 12:
- room name is the single visible location identity,
- separate `OMRÅDE` identity removed,
- narrator/current-room/resume presentation uses room name,
- internal `zoneName` remains for deterministic generation/tone.

## 14. `ANNEN LØSNING` progress boxes had no fictional meaning
Observed with `REGNBUENETTET`:
- four empty boxes looked like Forteller had to invent four separate tasks,
- the net did not actually prevent travel,
- completing the track changed nothing.

Patch 13 changes the model:
- every generated non-treasure encounter declares `purpose`, `stakes`, `resolvedWhen`, `payoff`,
- generic 3/4 boxes are removed,
- progress renders only for authored `progressStages`,
- narrator answers `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`,
- traps are real forward obstacles while active but allow retreat,
- resolving trap frees the route,
- ambient `MYSTISK` puzzles are not attached randomly.

`REGNBUENETTET` reference flow: obstacle -> child's plan -> die only if uncertain -> `HINDRINGEN ER LØST` when fiction supports it -> route becomes available.

## 15. Intentional improvisation looked like missing hidden content
Observed during continued physical play with `BOKA SOM SKRIVER TILBAKE`:
- the book says it is trying to tell the party something,
- the three repeated words imply there may be an authored message,
- the app did not actually contain that message or a larger plan,
- Forteller therefore could not tell whether they were expected to discover app-authored content or invent the answer.

User judgement clarified the intended design: **improvisation is completely acceptable, but it must be explicit in Forteller-delen.**

This is importantly different from missing story logic. Ambient content may deliberately hand creative authorship to Forteller; the app must simply be honest about that handoff.

### Patch 14 - explicit narrator improvisation
`patches/v0.12.3_playtest_explicit_improv_guidance_ux5a.patch`:
- gives intentionally open ambient mysteries a per-scene `improvisePrompt`,
- labels them internally `VALGFRITT IMPROVISASJONSMYSTERIUM`,
- narrator panel shows `FORTELLER-IMPROVISASJON`,
- explicitly says `INGEN SKJULT FASIT`,
- explicitly says there is no larger predetermined plan for the missing detail,
- tells Forteller what to invent for that particular mystery,
- encourages reuse of already established adventure details where useful,
- allows atmosphere, optional hints and side discoveries,
- forbids invented content from becoming a new mandatory story key or contradicting known app state,
- keeps the child-facing fiction immersive; the meta distinction is narrator-only.

For `BOKA SOM SKRIVER TILBAKE`, Forteller now invents what the repeated three words become. There is intentionally no hidden sentence in the app.

## Verification after finding 15
Patch-14 reconstructed runtime automated evidence:
- explicit-improvisation QA: **20 / 0**,
- encounter-purpose QA: **4337 / 0**,
- authored-mysteries-only QA: **3075 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2328 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- content regression: **5830 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-14 runtime SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

Fresh browser certification remains open. Physical retest is required; automated green does not prove that the narrator handoff feels natural in play.

## Priority now
1. Physically retest patch-14 build, especially `BOKA SOM SKRIVER TILBAKE`: can Forteller immediately tell what is authored vs what they are invited to invent?
2. Verify the improv framing helps without breaking immersion or creating a new closed answer list.
3. Continue `REGNBUENETTET` obstacle/payoff test and remaining UX5A device smoke.
4. Run fresh browser interaction QA when the local Chromium harness is usable.
5. If physical gate is green, record evidence and merge UX5A to `main`.
6. Create real `narrative/story-graph-v1` from merged `main` and start `WP-NG1`.
7. Do not start UX5B or add blueprints first.
