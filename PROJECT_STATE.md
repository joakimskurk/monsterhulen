# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-27
Branch: `narrative/story-graph-v1-prep`
Status: **PREP / DOCUMENTATION ONLY**
Active runtime branch: `ux5/searchable-rooms-encounter-tracks`
Current runtime work item: **UX5A patch 15 physical iPad/mobile retest before merge**
Next runtime architecture after green UX5A: **Narrative Graph V1, starting only with `CRYSTAL_MACHINE`**

## Do not implement from prep yet
UX5A patch 15 is machine/browser green but not physically green/merged. Narrative Graph runtime, full DM Control Surface, UX5B and Multiscreen remain blocked.

When UX5A becomes green:
1. record physical evidence,
2. confirm final relevant automated/browser evidence,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start WP-NG1.

## Current UX5A evidence
Runtime branch currently records patch-15 evidence:
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
- fresh headless Chromium interaction smoke **22/0**, with in-memory localStorage harness caveat.

Still physically required on target browser/device:
- iPad/mobile touch/usability/comprehension,
- native save/reload/resume,
- real Adventure Code clipboard/paste.

Do not merge before this gate is green.

## Binding product direction
Monsterhulen prioritizes coherent child-led tabletop stories over procedural volume.

- child proposes actions,
- app does not silently apply owned solutions,
- one physical room has one visible identity,
- encounter mechanics need purpose/stakes/resolution/payoff/world effects,
- no generic filler progress,
- puzzles need authored contextual role,
- narrator improv is explicit/scoped,
- critical state never depends on untracked improv,
- physical dice report uncertainty only,
- stable IDs/save compatibility remain binding,
- critical story uses `SETUP -> SIGNAL -> ACTION -> PAYOFF`.

## Canonical architecture
Latest consolidated plan:
`docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`

Target chain:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- dramatic phases/expiry,
- interaction shell/popup,
- typed validated state transitions,
- later action history/undo/shared-session sync.

## Full existing-content editorial review - COMPLETE
On 2026-10-27 the existing content categories were reviewed without expanding them:
- MONSTERS,
- PEOPLE,
- FRIENDS,
- TRAPS,
- MYSTERIES,
- TREASURES.

Canonical detailed docs:
- `docs/MONSTER_SUBJECT_REVIEW_V1.md`
- `docs/PEOPLE_SUBJECT_REVIEW_V1.md`
- `docs/FRIEND_SUBJECT_REVIEW_V1.md`
- `docs/TRAP_SUBJECT_REVIEW_V1.md`
- `docs/MYSTERY_SUBJECT_REVIEW_V1.md`
- `docs/TREASURE_AFFORDANCE_REVIEW_V1.md`

Canonical handoff:
`docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`

No new subjects were added. No Adventure Blueprint was added.

### Durable findings now integrated into Storylet Matrix
`docs/STORYLET_MATRIX_V1.md` now includes:
- mechanic/solution-family anti-repetition,
- provider truth cannot be inferred from noun/theme matching,
- incidental optional loot != planned critical provider,
- critical trade cannot consume the only still-required unique resource,
- knowledge reveal cannot create graph topology/truth,
- critical puzzle/mystery needs authored truth/rule/cause,
- ambient `truthMode=IMPROV` cannot carry critical state,
- phase/expiry applies to friendly clue/delivery content,
- MONSTER category does not imply combat,
- item use/transfer/consumption/placement is explicit typed action,
- critical environmental blocker needs scene affordance or validated resource provider,
- repeated use of same prop/affordance is also a repetition dimension.

Durable decision is recorded in `DECISIONS.md`.

## CRYSTAL_MACHINE storylet prep - AUDITED AND REVISED
`CRYSTAL_MACHINE` remains the only blueprint target before NG8.

Nine initial candidates remain:
- 3 `SEARCH_SECRET`,
- 3 `NPC_FAVOR`,
- 3 `GUARDIAN`.

Audit:
`docs/CRYSTAL_STORYLET_AUDIT_2026-10-27.md`

Canonical revised bank:
`docs/CRYSTAL_STORYLET_BANK_V1.md`

Audit result before revisions:
- approve as-is: 1,
- approve with revisions: 8,
- reject: 0.

The revisions have now been incorporated into the canonical bank.

Important locked constraints:
- machine requirement reveal occurs before three acquisition branches,
- branches remain reachable in any order,
- generic UX5A loot cannot satisfy machine crystals by accident,
- Krystallslimet/Glasskule are not machine-crystal providers by naming/theme,
- secondary favor dependencies are real graph nodes/features,
- trade cannot consume another branch’s unique critical resource,
- Light Slime initial candidate uses `combatAllowed=false`,
- Trader Crab initial candidate uses `combatAllowed=false`,
- Golem may allow optional combat but noncombat remains primary,
- Search Reflection + Light Slime is rejected for initial selection due mechanic overlap,
- Search Light Crack + Light Slime receives strong repetition penalty.

Controlled first manual baseline when runtime work eventually reaches that point:
- `CRYSTAL_SEARCH_CHIME`
- `CRYSTAL_NPC_OWL_PAGE`
- `CRYSTAL_GUARDIAN_LIGHT_SLIME`

This is a controlled editorial baseline, not a new blueprint.

## Provider system
Requirements and acquisition routes are separate graph concepts.

Initial providers:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- explicit allowed starting/owned resource.

Optional resources may be genuinely random when thematic. Critical resource needs at least one reserved validator-proven reachable route before consumption.

Child speaks/acts first in social play; DM triggers physical die only when genuinely uncertain; low result fails forward; no critical single-roll softlock.

## Alternative child solutions
Authored approaches are affordances, not closed answers.

DM needs semantic acceptance (`GODTA LØSNING`) or uncertainty flow, applying canonical Storylet world effects rather than manually editing flags.

## Optional combat
Combat is Storylet-specific:
- only if `combatAllowed`,
- child may propose,
- DM explicitly starts,
- critical guardians normally retain non-combat route,
- child-friendly/non-graphic,
- surrender/retreat/distraction/friendship/escape are valid endings.

Full-bank review reinforced: **MONSTER category never implies combat**.

## Interaction shells
Canonical spec:
`docs/INTERACTION_SHELLS_V1.md`

Initial families:
- slot gate / assembly,
- locked object / explicit item use,
- NPC favor/dialogue,
- merchant/trade,
- puzzle,
- combat,
- reward choice,
- search/inspect.

Reference three-color machine:
- reveal sockets first,
- child taps target,
- owned items never auto-fill,
- explicit placement,
- wrong item not consumed,
- partial placement persists,
- authored activation/world effect,
- later undo restores target + inventory atomically.

## DM Control Surface direction
DM should see purpose, requirement, provider, uncertainty, solve condition, outcome and authored-vs-improv boundary.

Semantic controls eventually include:
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- physical die recording,
- `START KAMP` where allowed,
- authored outcome application,
- player-view preview,
- later action history + undo.

NG4 provides only the minimal semantic layer required to test Narrative Graph. Full polish comes after NG8 if accepted.

## Future shared session
Recorded only, not active:
- DM-hosted authoritative state,
- LAN/same-Wi-Fi first,
- player touch/display clients,
- typed validated actions,
- reconnect/idempotency,
- no narrator-only leakage,
- action history/undo foundation.

Adventure Code remains offline reconstruction/sharing, not live sync.

## Narrative Graph packages
- NG0: specs/docs - complete and further refined.
- NG1: graph + provider + typed transition model/validator.
- NG2: Storylet Matrix/provider engine using only small audited Crystal bank.
- NG3: Crystal Machine planner.
- NG4: materialization + narrator knowledge + minimal DM controls + required shells.
- NG5: >=1000 automated graph/state cases.
- NG6: browser/touch QA.
- NG7: 10-20 manual editorial/family playtests.
- NG8: accept/revise/abandon.

No second blueprint before NG8.

## Content-review continuation
The existing bank review is **complete**. Do not continue by inventing or adding more subjects.

Next content work after Narrative Graph runtime is unblocked is to use the audited Crystal Storylets as the small NG2 bank and manually judge resulting story quality.

Active blueprint bank remains unchanged:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

## Repository health
Still open. Complete runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone. Do not call a release checkpoint locked until this is closed.

## Exact next action while physical playtest is unavailable
Allowed:
- improve current UX5A repository health/provenance without changing gameplay,
- documentation/spec refinement that does not implement later runtime packages,
- keep audited content constraints synchronized.

Blocked:
- Narrative Graph runtime,
- full DM Control Surface runtime,
- UX5B,
- Multiscreen,
- content/blueprint expansion.
