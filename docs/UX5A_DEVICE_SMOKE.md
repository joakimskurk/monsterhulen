# UX5A - physical iPad/mobile smoke

Status: required before UX5A merge and before Narrative Graph runtime work starts.

Use the latest reconstructed UX5A build through patch 13 (`v0.12.3_playtest_encounter_purpose_contract_ux5a.patch`). Do not replace production yet.

## 1. Encounter purpose / blocking trap
Play until you meet a generated trap, preferably `REGNBUENETTET`.

Pass if:
- there is no generic `ANNEN LØSNING` 3/4-box track,
- narrator can immediately understand `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`,
- the trap actually blocks onward travel while active,
- retreat to the previous room remains possible,
- the child can invent a plan rather than choose from a closed solution list,
- physical die is used only if that particular plan has an uncertain outcome,
- one genuinely sufficient plan may solve the obstacle; narrator is not expected to invent filler steps,
- after `HINDRINGEN ER LØST`, the trap is gone/resolved and onward travel actually works.

Fail if the scene can be ignored despite claiming to be an obstacle, if resolution changes nothing, or if narrator has to invent arbitrary repeated tasks.

## 2. Explicit locked-door / story-key flow
Use `GLASS_HEART` and obtain `GLASSNØKKEL`.

Pass if:
- tapping locked door only communicates locked state,
- tap does not unlock/traverse/consume key,
- app does not announce key as answer,
- child gets chance to propose action,
- narrator can optionally use open hint `KANSKJE DU HAR NOE I SEKKEN?`,
- key is important/protected but exposes `BRUK`,
- `BRUK` beside matching door opens/removes key with fiction feedback,
- key use does not move hero,
- later tap traverses.

## 3. Ambient mystery / puzzle relationship
Play newly generated `MYSTISK` ambient encounters.

Pass if:
- no unrelated random puzzle is automatically pasted onto the scene,
- mystery can be investigated or left alone unless it has an authored reason to block something,
- any puzzle that does appear because it is explicitly authored is fictionally connected,
- thinking/answering does not require die,
- puzzle solve does not automatically add generic progress; fiction decides what it changed.

## 4. Single location identity
Move through several rooms.

Pass if each physical room has one clear player-facing place name. Internal zone/biome labels must not look like a second competing location name.

## 5. Generic room investigation
Start a VANLIG adventure and move through several rooms.

Pass if:
- every room can be investigated,
- app does not reveal which rooms contain hidden finds before investigation,
- `SE DEG RUNDT` feels exploratory rather than compulsory.

## 6. Empty room
Investigate a room without a hidden find.

Pass if no meaningless die is requested and play continues naturally.

## 7. Hidden find + fail-forward
At a hidden-find room, register low physical D6 twice.

Pass if first 1-2 strengthens clue without reveal, repeated low reveals optional find/fails forward, and no softlock occurs.

## 8. Full backpack
Fill backpack to six and try to take a revealed room find.

Pass if app reports full backpack and find remains available in room.

## 9. Dice/state separation
In generated encounter, roll/register physical result.

Pass if exact die face is recorded and it does not automatically remove HP or resolve the whole encounter. Dice describe uncertainty of the current attempt, not generic scene duration.

## 10. Combat
Let child explicitly choose combat with monster.

Pass if:
- ordinary monster uses 3 hearts,
- `SPENNING` monster uses 4,
- final explicit heart removal ends combat,
- touch targets are comfortable.

## 11. Non-combat resolution clarity
Across PERSON/VENN/MYSTISK/MONSTER-without-combat/FELLE scenes, judge the role-specific resolve action.

Pass if:
- narrator knows what “solved/finished” means from `resolvedWhen`,
- one decisive plan can be enough when appropriate,
- any staged progress shown corresponds to authored named fictional stages rather than blank boxes,
- payoff described by narrator matches what actually changes in game/world state.

## 12. Adventure Code
Recheck copy/paste reconstruction on intended two-device flow.

Pass if same adventure plan reconstructs and interaction remains understandable on both screens.

## 13. Whole-play judgement
Play a longer stretch without checklist focus.

Record:
- whether every encounter has an understandable reason to exist,
- whether resolving scenes produces noticeable consequences/payoffs,
- whether narrator ever feels forced to invent logic or filler actions,
- whether app presents problems before applying solutions,
- whether child naturally invents actions/checks items,
- whether room investigation feels voluntary,
- what child naturally taps,
- any cramped/unclear mobile layout,
- any content that is too early, too late, disconnected or mechanically pointless.

Treat these as architecture/story-coherence findings first, not merely copy polish.

## Optional legacy-save check
If representative old save with active 2-heart fight is available, confirm actual remaining hearts are preserved rather than healed.

## Result
- GREEN: record physical evidence, verify regressions, merge UX5A to `main`, verify, create `narrative/story-graph-v1`, carry approved prep docs, start `WP-NG1`.
- YELLOW: fix concrete UX5A issue, rerun relevant tests/browser if available, retest device.
- RED: revise interaction model before merge.

Do not start UX5B. Narrative Graph V1 comes first after UX5A gate.
