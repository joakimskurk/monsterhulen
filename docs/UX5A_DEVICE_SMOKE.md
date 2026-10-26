# UX5A - physical iPad/mobile smoke

Status: required before UX5A merge and before Narrative Graph runtime work starts.

Use the latest reconstructed UX5A build through patch 14 (`v0.12.3_playtest_explicit_improv_guidance_ux5a.patch`). Do not replace production yet.

## 1. Explicit narrator improvisation
Play until you meet an intentionally open ambient mystery, preferably `BOKA SOM SKRIVER TILBAKE`.

Pass if:
- the child-facing scene remains an in-world mystery,
- Forteller view clearly says `FORTELLER-IMPROVISASJON`,
- Forteller view clearly says there is `INGEN SKJULT FASIT` and no larger predetermined app plan for the missing detail,
- Forteller receives a concrete prompt for what to invent,
- the prompt feels like useful creative support rather than a new closed answer list,
- the invented detail can be atmosphere, a small side discovery or an optional hint,
- it is clear that Forteller must not invent a new mandatory story key or contradict tracked app state.

Fail if narrator still wonders whether the app is hiding a real answer, or if the app silently expects narrator to invent critical story logic.

## 2. Encounter purpose / blocking trap
Play until you meet a generated trap, preferably `REGNBUENETTET`.

Pass if:
- there is no generic `ANNEN LØSNING` 3/4-box track,
- narrator can immediately understand `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`,
- trap actually blocks onward travel while active,
- retreat to previous room remains possible,
- child can invent a plan rather than choose from a closed solution list,
- physical die is used only if that plan has an uncertain outcome,
- one genuinely sufficient plan may solve the obstacle,
- after `HINDRINGEN ER LØST`, onward travel actually works.

## 3. Explicit locked-door / story-key flow
Use `GLASS_HEART` and obtain `GLASSNØKKEL`.

Pass if:
- tapping locked door only communicates locked state,
- tap does not unlock/traverse/consume key,
- app does not announce key as answer,
- child gets chance to propose action,
- narrator may optionally use open hint `KANSKJE DU HAR NOE I SEKKEN?`,
- key is important/protected but exposes `BRUK`,
- `BRUK` beside matching door opens/removes key with fiction feedback,
- key use does not move hero,
- later tap traverses.

## 4. Ambient mystery / puzzle relationship
Play newly generated `MYSTISK` ambient encounters.

Pass if:
- no unrelated random puzzle is automatically pasted onto scene,
- mystery can be investigated or left alone unless it has authored reason to block something,
- any puzzle that appears because it is explicitly authored is fictionally connected,
- thinking/answering does not require die,
- puzzle solve does not automatically add generic progress,
- intentionally open details are visibly scoped as narrator improvisation rather than implied hidden answers.

## 5. Single location identity
Move through several rooms.

Pass if each physical room has one clear player-facing place name. Internal zone/biome labels must not look like a second competing location name.

## 6. Generic room investigation
Start a VANLIG adventure and move through several rooms.

Pass if:
- every room can be investigated,
- app does not reveal which rooms contain hidden finds before investigation,
- `SE DEG RUNDT` feels exploratory rather than compulsory.

## 7. Empty room
Investigate a room without hidden find.

Pass if no meaningless die is requested and play continues naturally.

## 8. Hidden find + fail-forward
At a hidden-find room, register low physical D6 twice.

Pass if first 1-2 strengthens clue without reveal, repeated low reveals optional find/fails forward, and no softlock occurs.

## 9. Full backpack
Fill backpack to six and try to take revealed room find.

Pass if app reports full backpack and find remains available in room.

## 10. Dice/state separation
In generated encounter, roll/register physical result.

Pass if exact die face is recorded and it does not automatically remove HP or resolve whole encounter. Dice describe uncertainty of current attempt, not generic scene duration.

## 11. Combat
Let child explicitly choose combat with monster.

Pass if:
- ordinary monster uses 3 hearts,
- `SPENNING` monster uses 4,
- final explicit heart removal ends combat,
- touch targets are comfortable.

## 12. Non-combat resolution clarity
Across PERSON/VENN/MYSTISK/MONSTER-without-combat/FELLE scenes, judge role-specific resolve action.

Pass if:
- narrator knows what solved/finished means from `resolvedWhen`,
- one decisive plan can be enough when appropriate,
- staged progress, if shown, corresponds to authored named fictional stages,
- payoff described by narrator matches actual game/world-state change,
- any narrator-created detail is clearly marked as intentional improvisation rather than missing state.

## 13. Adventure Code
Recheck copy/paste reconstruction on intended two-device flow.

Pass if same adventure plan reconstructs and interaction remains understandable on both screens.

## 14. Whole-play judgement
Play a longer stretch without checklist focus.

Record:
- whether narrator always knows which facts are authored/tracked and which details are intentionally theirs to invent,
- whether every encounter has understandable reason to exist,
- whether resolving scenes produces noticeable consequences/payoffs,
- whether narrator ever feels forced to invent missing causal logic or filler actions,
- whether app presents problems before applying solutions,
- whether child naturally invents actions/checks items,
- whether room investigation feels voluntary,
- what child naturally taps,
- any cramped/unclear mobile layout,
- any content too early, too late, disconnected or mechanically pointless.

Treat these as architecture/story-coherence findings first, not merely copy polish.

## Optional legacy-save check
If representative old save with active 2-heart fight is available, confirm actual remaining hearts are preserved rather than healed.

## Result
- GREEN: record physical evidence, verify regressions, merge UX5A to `main`, verify, create `narrative/story-graph-v1`, carry approved prep docs, start `WP-NG1`.
- YELLOW: fix concrete UX5A issue, rerun relevant tests/browser if available, retest device.
- RED: revise interaction model before merge.

Do not start UX5B. Narrative Graph V1 comes first after UX5A gate.
