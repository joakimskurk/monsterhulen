# UX5A physical device findings - 2026-10-26

Status: **YELLOW - PATCH 13 IMPLEMENTED, BROWSER + PHYSICAL RETEST REQUIRED**
Branch: `ux5/searchable-rooms-encounter-tracks`

Do not merge UX5A to `main` yet.

## Finding 1 - ready locked door was effectively skipped
Observed: hero with `GLASSNØKKEL` could tap a locked story gate and unlock + traverse in one interaction.

Patch 10 split opening from traversal. Continued review then showed that even automatic opening used the child's solution for them; see finding 3.

## Finding 2 - mystery puzzle was not fictionally connected or DM-clear
Observed example: `DEN HVISKENDE VEGGEN` received an unrelated-looking generated `STEINTRINNENE` math/sequence puzzle.

Patch 10 added narrator help, but patch 13 addresses the deeper cause: ambient `MYSTISK` encounters no longer receive a random puzzle by default. A puzzle must be explicitly authored/opted into a scene where it has a role. Legacy/authored puzzles still explain that thinking needs no die, and solving the puzzle no longer feeds a generic progress meter automatically.

## Finding 3 - the app should present the lock, not auto-apply the solution
Patch 11 `v0.12.3_playtest_explicit_story_key_use_ux5a.patch`:
- locked keyed door tap only reports `DØREN ER LÅST`,
- no auto unlock/traversal/key consumption,
- scenario key remains protected but exposes explicit `BRUK`,
- matching adjacent key use opens/removes key but does not traverse,
- later tap traverses,
- narrator may give an open backpack hint without naming the answer.

Durable rule: obstacle first, child action second.

## Finding 4 - one physical place appeared to have two names
Room name + zone/area name competed as location identity.

Patch 12 `v0.12.3_playtest_single_location_name_ux5a.patch` makes room name the single visible location identity while preserving zone metadata internally.

## Finding 5 - `ANNEN LØSNING` four-box track had no clear meaning or payoff
Observed with `REGNBUENETTET` during continued physical play:
- four boxes appeared under `ANNEN LØSNING`,
- it was unclear whether Forteller was expected to invent four separate child actions,
- the net did not actually block anything,
- completing the generic track gave no meaningful reward or world-state change,
- therefore there was no clear reason for the scene to exist.

This is not a copy problem. It exposed a flawed generic encounter model.

### Fix - patch 13
`patches/v0.12.3_playtest_encounter_purpose_contract_ux5a.patch` replaces generic duration with a purpose contract.

Every generated non-treasure encounter now declares:
- `purpose` - what the scene is doing,
- `stakes` - what is affected while unresolved,
- `resolvedWhen` - when the fiction actually counts it as solved,
- `payoff` - what changes after resolution.

Additional rules:
- no generic 3/4-box `ANNEN LØSNING` track,
- progress UI only exists for explicitly authored `progressStages`,
- narrator is explicitly told not to invent filler steps,
- traps block travel onward while active but allow retreat,
- resolving a trap removes it and actually frees onward travel,
- resolution labels describe the role (`HINDRINGEN ER LØST`, `MYSTERIET ER LØST`, `LØST UTEN KAMP`),
- ambient random mystery puzzles are opt-in rather than automatic.

### `REGNBUENETTET` expected physical behavior
1. Enter the room from a previous room.
2. The net is presented as a concrete obstacle.
3. Travel onward from that room is blocked while the net is active.
4. Retreat to the room you came from remains possible; the encounter must not softlock the adventure.
5. Ask the child what they want to do. Do not require a fixed list of approaches.
6. If the proposed action obviously works, let it work. If its outcome is genuinely uncertain, use the normal physical die rule.
7. A single sufficiently strong plan may solve the net. Forteller does **not** need to invent four separate tasks.
8. Only once the fiction satisfies the displayed `NÅR ER DET LØST?` condition, press `HINDRINGEN ER LØST`.
9. The net disappears/resolves, the payoff is logged, and onward travel becomes available.

The desired child-level fiction can be “vi sitter fast / veien er sperret; hvordan kommer vi oss løs eller gjennom?” The precise plan remains open to imagination.

## Automated verification after patch 13
Behavioral reconstructed runtime SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

Automated evidence:
- encounter-purpose QA: **4337 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2295 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5809 / 0**,
- 11 inline scripts: **0 syntax errors**.

The encounter-purpose regression executes the actual runtime `move()` implementation in a three-room harness and verifies block onward / allow retreat / allow onward after resolution.

The earlier Chromium 23/0 and patch-10 15/0 results are historical only. Fresh browser interaction QA for patches 11-13 remains pending due the current local browser/localStorage harness problem. No browser-green claim is made.

## Exact next physical action
Use the patch-13 candidate and test a trap encounter, preferably `REGNBUENETTET` when encountered naturally:
1. confirm there is no generic four-box `ANNEN LØSNING`,
2. read the narrator contract and judge whether `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?` make the scene understandable immediately,
3. attempt to move onward before solving: it should be blocked,
4. attempt to retreat: it should work,
5. let the child invent a plan and use dice only if the particular attempt is uncertain,
6. resolve the obstacle when the fiction genuinely supports it,
7. confirm onward travel now works and the resolution feels like it caused something real.

Also continue checking single-location identity, explicit story-key use, generic room search, backpack behavior, combat controls and Adventure Code.

If the physical gate is green, record evidence and follow the merge transition. Otherwise keep patching UX5A. Narrative Graph runtime remains blocked.
