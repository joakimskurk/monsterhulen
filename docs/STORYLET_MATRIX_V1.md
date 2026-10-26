# Storylet Matrix V1

Status: **DESIGN LOCK CANDIDATE - prep only**
Updated: 2026-10-26

## Purpose
The Storylet Matrix defines which curated narrative modules may satisfy which story functions. It prevents individually valid content from combining into incoherent critical story.

The matrix separates:
- subject identity from narrative role,
- prerequisite availability from child action completion,
- requirements from the provider routes that can satisfy them,
- authored state from narrator improvisation,
- scene presence from meaningful purpose/payoff,
- optional combat capability from monster identity,
- story logic from the interaction shell used to present the action.

Target model:

`SUBJECT -> ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Presentation layer:

`INTERACTION SHELL -> TYPED ACTION -> VALIDATED STATE TRANSITION`

## Storylet contract
Each interactive Storylet declares at least:

```text
id
subjectId
role
provides[]
requires[]
subjectTags[]
forbiddenTags[]
roomNeeds[]
setup
signal
purpose
stakes
narratorGoal
approachFamilies[]
failForward
completionRule
resolvedWhen
outcomes[]
payoff
worldEffects[]
knowledgeReveals[]
criticalSafe
interactionShell
```

Optional fields include:

```text
providerFamilies[]
resourceRequests[]
merchantStock[]
tradeAccepts[]
socialBargain
combatAllowed
interactionConfig
allowedActionTypes[]
progressStages[]
narratorImprov
npcRole
monsterFamilyAllow[]
monsterFamilyDeny[]
itemHooks[]
puzzleTags[]
toneAllow[]
zoneAllow[]
minAgeBand
maxAgeBand
consumesResource
openHint
strongerHint
```

`subjectId` is stable presentation identity. `id` is Storylet logic/role identity.

`requires[]` makes action/beat possible. It never silently performs child action.

`outcomes[]` and `worldEffects[]` state what completion actually changes. Critical outcomes are tracked.

`interactionShell` declares presentation/action family only. It may not smuggle in hidden requirements or completion logic absent from Storylet fields.

`interactionConfig` may define authored visible slots/prompts/controls, but visibility is still gated by `knowledgeReveals[]`.

`allowedActionTypes[]` constrains semantic runtime actions that this Storylet can accept.

`progressStages[]` is allowed only for named meaningful fictional state changes; no generic 3/4 duration.

`narratorImprov` explicitly declares open narrator-owned detail. Critical requirements/completion/outcomes/world effects cannot depend on untracked improv.

## Subject / role compatibility
Subjects are reusable fictional wrappers, not fixed mechanics.

Reference examples:
- `PANNEKAKEZOMBIEN`: `BLOCK_PATH`, `ITEM_HOLDER`, `CLUE_SOURCE`, `TRADE`/food-favor variants.
- `BORTKOMNE_ZOMBIEN`: help/follow-clue/NPC/payoff variants.
- `SKJELETTDANSEREN`: music/social/clue variants.
- `SKJELETTVAKTEN`: guardian/gatekeeper variants plus optional combat capability.
- `SUMPTROLLET`: gatekeeper/favor/trade variants requiring food or another authored resource.
- `BROTROLLET`: variable authored wanted-object requests.
- `BOKA_SOM_SKRIVER_TILBAKE`: open improv, NPC-like dialogue, clue, puzzle/gate, item/reward variants.

Hard rules:
- generator chooses only pre-authored compatible subject + role pairings,
- ambient presentation cannot accidentally become critical logic,
- subject/role repetition is scored separately,
- critical role payload/outcome remains tracked regardless of presentation skin,
- candidate subjects such as `DEN_SNAKKENDE_DUKKEN` / `DET_LEVENDE_BILDET` are not active-bank content until editorially approved.

## Resource requirement / provider contract
A required resource/state and the way it can be obtained are separate graph objects.

Initial provider families:

| Provider family | Meaning | Critical-safe requirement |
| --- | --- | --- |
| `ROOM_FIND` | item appears in a thematically suitable room | if critical, placement is reserved/reachable rather than lucky spawn |
| `MERCHANT_PURCHASE` | seller offers item for authored value | price/value dependency reachable or alternate route exists |
| `TRADE` | exchange concrete item/category | no circular request; trade item obtainable first |
| `SOCIAL_BARGAIN` | child negotiates for gift/loan/discount | not sole critical route behind one roll; fail-forward required |
| `NPC_REWARD` | help/favor yields resource | task dependency reachable; reward explicit |
| `PUZZLE_REWARD` | contextual puzzle yields resource | puzzle causally fits Storylet; hint/fail-forward appropriate |
| `SEARCH_SECRET` | signalled hidden resource | clue + fail-forward; not one lucky search roll |
| `STARTING_OR_OWNED_RESOURCE` | already available | only when blueprint explicitly allows it |

### Thematic room finds
Ordinary food/items may appear seeded or semi-random when room/zone/scene tags make sense. Optional resources may be truly variable.

For a critical requirement, `ROOM_FIND` may still feel incidental, but generation reserves at least one valid placement before the consuming gate.

### Merchant providers
Merchant is a Storylet/provider role, not necessarily a separate economy subsystem.

Merchant may accept:
- concrete coins,
- treasure/valuable objects,
- trade goods,
- a favor,
- another authored resource.

Prefer concrete fiction-rich value over large generic currency totals until proven useful.

### Social bargaining
Flow:
1. child says what they try/say,
2. DM decides whether outcome is uncertain,
3. only then may DM trigger physical D6 / applicable physical 2D6,
4. result affects the negotiation attempt,
5. low result fails forward to higher price, small favor, alternative trade, partial benefit or another route.

A critical resource may never be permanently unavailable because one persuasion roll failed.

### Critical provider invariant
For every critical `requires[]` resource/state:
1. at least one guaranteed reachable provider route exists before consumption,
2. provider is not behind the gate the resource must open,
3. nested provider dependencies are reachable,
4. no circular chain exists,
5. success does not depend on one mandatory uncertain roll,
6. at least one route survives fail-forward outcomes,
7. optional secondary providers may add flexibility/replay variation.

Reference:

`SUMPTROLLET requires FOOD`
-> choose provider plan before map placement
-> e.g. reserved thematic `ROOM_FIND: HONNINGKJEKS` plus optional merchant/social route
-> validate reachability
-> only then materialize troll gate.

`BROTROLLET` may randomize among authored wanted-object variants, but chosen request fixes `requires[]` + provider constraints before materialization.

## Outcomes
Initial outcome families:
- `UNBLOCK_PATH`
- `GRANT_OPTIONAL_ITEM`
- `GRANT_CRITICAL_RESOURCE`
- `REVEAL_CLUE`
- `REVEAL_PUZZLE_ANSWER_OR_RULE`
- `REVEAL_LOCATION`
- `BECOME_FRIEND`
- `OPEN_GATE`
- `SET_RELATIONSHIP_STATE`
- `ENABLE_ACTION`
- `ADVANCE_PHASE`

Storylets may offer a small authored set of outcomes where fiction supports genuine variation. DM chooses only among authored state transitions, not raw debug edits.

## Interaction shell contract
Canonical UI design: `docs/INTERACTION_SHELLS_V1.md`.

Initial shell types:
- `SLOT_GATE`
- `ASSEMBLY`
- `LOCKED_OBJECT`
- `NPC_DIALOGUE_FAVOR`
- `MERCHANT_TRADE`
- `PUZZLE`
- `COMBAT`
- `REWARD_CHOICE`
- `SEARCH_INSPECT`

Hard rules:
- shell exposes only current player knowledge,
- shell does not auto-apply owned resources,
- shell submits typed actions to canonical state layer,
- wrong resource is not silently consumed,
- partial interaction state can persist when fiction supports it,
- completion behavior follows Storylet `completionRule`, not UI convenience,
- narrator-only metadata never appears in player payload.

### Slot/assembly reference
For a three-color gate/machine:
- three socket requirements become visible only after reveal,
- owned stones do not auto-fill,
- child places each item explicitly,
- placed resource becomes target-bound state according to Storylet semantics,
- partial placement persists,
- full slots either complete or enable separate activation as authored,
- undo must restore inventory + target atomically.

This is the canonical reference for `CRYSTAL_MACHINE` assembly.

## Allowed action semantics
Storylets can whitelist semantic action types such as:
- `PLACE_RESOURCE`
- `USE_ITEM`
- `ACCEPT_SOLUTION`
- `START_UNCERTAIN_ATTEMPT`
- `RECORD_DIE_FACE`
- `BUY_ITEM`
- `TRADE_ITEM`
- `START_COMBAT`
- `RESOLVE_COMBAT`
- `GRANT_REWARD`
- `REVEAL_CLUE`
- `OPEN_GATE`

The runtime validates preconditions and applies authored effects. UI controls never directly patch raw graph fields.

## Alternative child solutions / DM resolution
Authored approaches are possibilities, not answer buttons.

If child invents a plausible unlisted solution satisfying `resolvedWhen`, DM may explicitly accept it. Engine applies the same authored outcome/world effects.

If uncertainty genuinely exists, DM may trigger physical die flow.

DM should never hand-edit inventory, graph flags or map state for legitimate free-form play.

## Optional combat capability
Combat is a Storylet capability, not subject category.

- `combatAllowed=true` permits DM to start combat when fiction/child choice supports it.
- Monster/vakt/guardian does not auto-start combat.
- Child may propose fighting; DM invokes `START KAMP`.
- Critical guardians normally include non-combat authored approach.
- Presentation child-friendly/non-graphic.
- Resolutions may include surrender, retreat, distraction, friendship, escape, etc.

## Purpose / world-effect rule
Every interactive Storylet answers:
- Why is this here?
- What is constrained/threatened/offered now?
- What fictional state counts as resolved?
- What changes after success?
- Does game state implement that change?

Blocking Storylet actually blocks relevant state and has safe retreat/fail-forward. Claimed reward is actually granted/revealed. Puzzle belongs to Storylet.

## Narrator-improvisation rule
If a Storylet intentionally leaves detail open:
- narrator UI says there is no hidden answer for that detail,
- prompt says what may be invented,
- allowed scope can add atmosphere/optional side discovery/optional hint using valid facts,
- forbidden scope includes mandatory resources, graph completion, critical location choice, phase changes or promised world effects unless separately tracked.

For critical Storylets, tracked payload wins. Narrator may improvise wording around a known critical clue, not invent required destination/state.

## Hard rejection examples
Reject before map materialization if:
- subject/role pairing incompatible,
- interactive Storylet lacks purpose/stakes/resolution/payoff,
- promised payoff has no world effect,
- required resource has no provider plan,
- critical provider unreachable or after consuming gate,
- provider dependency cycle exists,
- merchant requires value with no reachable source,
- critical acquisition depends solely on one persuasion roll,
- required hidden object lacks clue/fail-forward,
- NPC favor asks for unavailable item,
- guardian lacks required non-combat route,
- puzzle lacks thematic/causal relation,
- action-bearing Storylet completes because requirements are merely owned,
- possessed item auto-applied,
- generic progress count without meaningful stages,
- blocking Storylet can softlock without retreat/fail-forward,
- prose implies hidden app answer but no payload/improv contract,
- critical state depends on narrator-invented fact,
- repeated subject exists only to inflate variation,
- interaction shell reveals knowledge before reveal,
- interaction shell can mutate critical state through an action type not declared by Storylet,
- critical slot/resource placement is auto-filled from inventory,
- partial/undo semantics would duplicate or destroy a critical resource.

## Matrix scoring
After hard filtering, score valid choices by:
1. play-family diversity,
2. provider/acquisition diversity,
3. thematic fit,
4. contrast with adjacent beats,
5. room/map fit,
6. age-band fit,
7. interaction variety without gimmick overload,
8. recent role repetition penalty,
9. recent subject repetition penalty.

Invalid combinations are rejected, never scored into validity.

## CRYSTAL_MACHINE reference
Required resources:
- `CRYSTAL_RED`
- `CRYSTAL_BLUE`
- `CRYSTAL_YELLOW`

Initial acquisition families:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`

All crystals owned makes `ASSEMBLE` available, not complete.

`ASSEMBLE` uses explicit slot/assembly interaction. Child deliberately places/activates crystals, producing tracked `MACHINE_ASSEMBLED` before gate/climax.

Each branch must have explicit provider reachability, purpose, solve condition, payoff and world effect.

## DM materialization requirements
NG4/narrator layer must expose enough metadata for novice DM to understand:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- `HVA ER SKREVET?`
- `HVA KAN JEG IMPROVISERE?`

It must provide safe semantic actions for accepted alternate solution, negotiation uncertainty, optional combat and authored outcomes without raw graph/debug editing.

## Storylet authoring quality bar
A critical Storylet is not accepted because schema validates. It must answer:
- Why is this thing here?
- What is at stake now?
- How does child notice what matters?
- What does subject want/do?
- What can child reasonably try?
- If resource required, how can it actually be obtained earlier?
- Are provider routes thematic/non-circular?
- Does critical social roll fail forward?
- What completes beat?
- What changes on success?
- Does world state reflect it?
- Which interaction shell, if any, makes the action tangible without revealing answer?
- Can narrator understand it without inventing missing logic?
- Is narrator-owned improv explicitly scoped?
- Is subject compatible with role?
- Does UI leave room for unlisted plausible child solution?

If answers are weak, Storylet remains editorially unapproved even if structural tests are green.
