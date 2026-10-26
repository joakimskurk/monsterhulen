# UX5A physical device findings - 2026-10-26

Status: **YELLOW - PATCH 13 IMPLEMENTED, BROWSER + PHYSICAL RETEST REQUIRED**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`

Do not merge UX5A to `main` yet.

## Finding 1 - ready locked door was effectively skipped
Original playtest showed `GLASSNØKKEL` gate could unlock + traverse in one tap. Patch 10 split opening/traversal; continued review showed automatic key use still removed child choice.

## Finding 2 - random mystery puzzle was not fictionally connected
`DEN HVISKENDE VEGGEN` + unrelated `STEINTRINNENE` showed a generic `MYSTISK` encounter should not receive a random puzzle simply because a puzzle bank exists.

Patch 13 now makes ambient puzzle attachment opt-in/contextual. Legacy/authored puzzles still use narrator help, but puzzle solving does not automatically feed generic progress.

## Finding 3 - app should present lock, not auto-apply solution
Patch 11:
- keyed door tap only says locked,
- no auto key use/unlock/traversal,
- protected scenario key has explicit `BRUK`,
- matching key use opens/removes key but does not traverse,
- later tap traverses,
- narrator may give open backpack hint.

## Finding 4 - one physical place appeared to have two names
Patch 12 makes room name the single visible location identity while keeping zone metadata internal.

## Finding 5 - `ANNEN LØSNING` four-box track had no meaning/payoff
Observed with `REGNBUENETTET`:
- four boxes had no authored four-step sequence,
- Forteller could reasonably think four separate actions had to be invented,
- net did not actually block travel,
- completing progress changed nothing,
- therefore scene had no clear functional payoff.

Patch 13 `v0.12.3_playtest_encounter_purpose_contract_ux5a.patch` replaces generic duration with a purpose contract:
- generated non-treasure encounters declare `purpose`, `stakes`, `resolvedWhen`, `payoff`,
- generic 3/4-box progress removed,
- progress only for authored `progressStages`,
- narrator explicitly gets `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`,
- traps block onward travel while active but allow retreat,
- resolution actually frees onward travel,
- random ambient mystery puzzles are no longer automatic.

### `REGNBUENETTET` expected physical behavior
1. Enter from a previous room.
2. Net is a concrete obstacle.
3. Onward travel is blocked while active.
4. Retreat remains possible.
5. Child proposes how to get through/free themselves/make trap safe.
6. Physical die only if that particular attempt is uncertain.
7. One genuinely sufficient plan may solve it; no four filler tasks.
8. Press `HINDRINGEN ER LØST` only once fiction satisfies displayed solve condition.
9. Net resolves and onward travel becomes available.

## Automated verification after patch 13
Runtime SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

Automated evidence:
- encounter-purpose **4337/0**,
- single-location **19/0**,
- targeted device **27/0**,
- search/encounter **2295/0**,
- Adventure Code **405/0**,
- UX4 progression **1797/0**,
- combined content **5809/0**,
- 11 scripts **0 syntax errors**.

Encounter-purpose QA executes real runtime `move()` in a three-room harness and proves active trap blocks forward, retreat works, resolved/absent trap allows forward.

Historical Chromium results do not certify patches 11-13. Fresh current browser QA remains pending due browser/localStorage harness problem. Physical retest required.

## Exact next physical action
Use patch-13 build:
1. test a trap, preferably `REGNBUENETTET`,
2. verify no generic four-box progress,
3. judge whether purpose/solve/payoff guidance is immediately clear,
4. verify forward blocked before solve and retreat works,
5. let child invent plan; roll only if uncertain,
6. resolve when fiction genuinely supports it,
7. verify onward path now works.

Continue checking single-location identity, explicit key use, room search, backpack behavior, combat and Adventure Code.

If physical gate is green, follow merge transition in `START_HERE.md`. Otherwise keep patching UX5A; Narrative Graph runtime remains blocked.
