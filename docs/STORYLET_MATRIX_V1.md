# Storylet Matrix V1

Status: **DESIGN LOCK CANDIDATE - prep only**

## Purpose
The Storylet Matrix defines which curated narrative modules may satisfy which story functions. It prevents individually valid content from combining into incoherent critical story.

The matrix separates:
- subject identity from narrative role,
- prerequisite availability from child action completion,
- requirements from the provider routes that can satisfy them,
- authored state from narrator improvisation,
- scene presence from meaningful purpose/payoff,
- optional combat capability from monster identity.

Target model:

`SUBJECT -> ROLE -> REQUIREMENTS + PROVIDERS -> CHILD ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

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
```

Optional fields include:

```text
providerFamilies[]
resourceRequests[]
merchantStock[]
tradeAccepts[]
socialBargain
combatAllowed
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

`subjectId` is stable presentation identity. `id` is the Storylet logic/role identity. The same subject may support several compatible authored Storylets.

`requires[]` makes an action/beat possible. It never silently performs the child action.

`outcomes[]` and `worldEffects[]` state what completion actually changes. Critical outcomes are tracked; optional outcomes are still explicit enough for DM to understand.

`progressStages[]` is allowed only for named meaningful fictional state changes; no generic 3/4 duration.

`narratorImprov` explicitly declares open narrator-owned detail. Critical requirements/completion/outcomes/world effects cannot depend on untracked improv.

## Subject / role compatibility
Subjects are reusable fictional wrappers, not fixed mechanics.

Reference examples:
- `PANNEKAKEZOMBIEN` may support `BLOCK_PATH`, `ITEM_HOLDER`, `CLUE_SOURCE`, `TRADE` or similar authored roles.
- `BORTKOMNE_ZOMBIEN` may support help/follow-clue/NPC/payoff roles.
- `SKJELETTDANSEREN` may support music/social/clue roles.
- `SKJELETTVAKTEN` may support guardian/gatekeeper roles and optional combat capability.
- `SUMPTROLLET` may support gatekeeper/favor/trade roles requiring food or other authored resources.
- `BROTROLLET` may support variable authored desired-object requests.
- `BOKA_SOM_SKRIVER_TILBAKE` may support open improv, NPC-like dialogue, clue, puzzle/gate or item/reward roles.

Hard rules:
- generator chooses only pre-authored compatible subject + role pairings,
- ambient presentation cannot accidentally become critical logic,
- subject/role repetition is scored separately,
- critical role payload/outcome remains tracked regardless of presentation skin.

## Resource requirement / provider contract
A required resource/state and the way it can be obtained are separate graph objects.

Initial provider families:

| Provider family | Meaning | Critical-safe requirement |
| --- | --- | --- |
| `ROOM_FIND` | item appears in a thematically suitable room | if critical, placement is reserved/reachable rather than lucky spawn |
| `MERCHANT_PURCHASE` | seller offers item for authored value | price/value dependency must be reachable or alternate route exists |
| `TRADE` | exchange a concrete item/category | no circular request; trade item obtainable first |
| `SOCIAL_BARGAIN` | child negotiates for gift/loan/discount | cannot be sole critical route behind one roll; fail-forward required |
| `NPC_REWARD` | help/favor yields resource | task dependency reachable; reward explicit |
| `PUZZLE_REWARD` | authored contextual puzzle yields resource | puzzle causally fits Storylet; hint/fail-forward appropriate |
| `SEARCH_SECRET` | signalled hidden resource | clue + fail-forward; not one lucky search roll |
| `STARTING_OR_OWNED_RESOURCE` | already available | only when blueprint explicitly allows it |

### Thematic room finds
Ordinary food/items may appear seeded or semi-random when room/zone/scene tags make sense. Optional resources may be truly variable.

For a critical requirement, a `ROOM_FIND` may still feel incidental to the player, but generation must reserve at least one valid placement before the consuming gate. “Maybe the randomizer happens to spawn food” is invalid critical design.

### Merchant providers
Merchant is a Storylet/provider role, not necessarily a separate economy subsystem.

A merchant may accept:
- concrete coins,
- treasure/valuable objects,
- trade goods,
- a favor,
- another authored resource.

Prefer concrete fiction-rich value over large generic currency totals until there is a proven need for a numerical economy.

Merchant subjects may simultaneously carry dialogue/clue/favor/recurring-character semantics when explicitly authored.

### Social bargaining
`socialBargain` defines an optional negotiation affordance.

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
3. nested provider dependencies are themselves reachable,
4. no circular chain exists,
5. success does not depend on one mandatory uncertain roll,
6. optional secondary providers may add flexibility and replay variation.

Reference:

`SUMPTROLLET requires FOOD`
-> choose provider plan before map placement
-> e.g. reserved thematic `ROOM_FIND: HONNINGKJEKS` and optional `MERCHANT_PURCHASE: EPLE`
-> validate provider reachability
-> only then materialize troll gate.

`BROTROLLET` may randomize which authored object category it wants, but the selected request fixes `requires[]` and provider constraints before materialization.

## Outcomes
Initial outcome families include:
- `UNBLOCK_PATH`
- `GRANT_OPTIONAL_ITEM`
- `GRANT_CRITICAL_RESOURCE`
- `REVEAL_CLUE`
- `REVEAL_PUZZLE_ANSWER_OR_RULE`
- `REVEAL_LOCATION`
- `BECOME_FRIEND`
- `OPEN_GATE`
- `SET_RELATIONSHIP_STATE`

Storylets may offer a small authored set of outcomes when fiction supports genuine variation. DM controls choose only between those authored state transitions; they are not debug edits.

## Alternative child solutions / DM resolution
Authored approaches are possibilities, not answer buttons.

If the child invents a plausible unlisted solution that satisfies `resolvedWhen`, DM may explicitly accept it. The engine then applies the same authored outcome/world effects as the Storylet's normal resolution path.

DM should never need to hand-edit inventory, graph flags or map state to reward legitimate free-form play.

## Optional combat capability
Combat is a Storylet capability, not a subject category.

- `combatAllowed=true` permits DM to start a combat module when fiction/child choice supports it.
- A monster/vakt/guardian does not auto-start combat.
- Child may propose fighting; DM explicitly invokes `START KAMP`.
- Critical guardians normally include at least one non-combat authored approach.
- Combat presentation remains child-friendly/non-graphic.
- Valid resolutions can include surrender, retreat, distraction, friendship, escape or other authored state; no required kill semantics.

## Purpose / world-effect rule
Every interactive Storylet answers:
- Why is this here?
- What is constrained/threatened/offered now?
- What fictional state counts as resolved?
- What changes after success?
- Does game state implement that change?

A blocking Storylet must actually block relevant world state and provide safe retreat/fail-forward. A claimed reward must actually be granted/revealed. A puzzle must belong to the Storylet rather than being randomly pasted on.

## Narrator-improvisation rule
If a Storylet intentionally leaves detail open:
- narrator UI says there is no hidden answer for that detail,
- prompt tells Forteller what may be invented,
- allowed scope can add atmosphere/optional side discovery/optional hint using already valid facts,
- forbidden scope includes mandatory resources, graph completion, critical location choice, phase changes or promised world effects unless separately tracked.

For critical Storylets, tracked payload wins. Narrator may improvise wording around a known critical clue, not invent the clue's required destination.

## Hard rejection examples
Reject before map materialization if:
- subject/role pairing is incompatible,
- interactive Storylet lacks purpose/stakes/resolution/payoff,
- promised payoff has no world effect,
- required resource has no provider plan,
- critical provider is unreachable or appears only after consuming gate,
- provider dependency forms a cycle,
- merchant requires currency/item/favor with no reachable source,
- critical acquisition depends solely on one persuasion roll,
- required hidden object has no clue/fail-forward,
- NPC favor asks for unavailable item,
- guardian has no allowed non-combat route when blueprint requires one,
- puzzle lacks thematic/causal relation,
- action-bearing Storylet completes merely because requirements are owned,
- possessed item is auto-applied,
- generic progress count exists without meaningful stages,
- blocking Storylet can softlock without retreat/fail-forward,
- prose implies hidden app answer but no payload/improv contract exists,
- critical state depends on narrator-invented fact,
- repeated subject exists only to inflate variation count.

## Matrix scoring
After hard filtering, score valid choices by:
1. play-family diversity,
2. provider/acquisition diversity,
3. thematic fit,
4. contrast with adjacent beats,
5. room/map fit,
6. age-band fit,
7. recent role repetition penalty,
8. recent subject repetition penalty.

Invalid combinations are rejected, never “scored into validity.”

## CRYSTAL_MACHINE reference
Required resources:
- `CRYSTAL_RED`
- `CRYSTAL_BLUE`
- `CRYSTAL_YELLOW`

Initial reference acquisition families remain:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`

All three crystals owned makes `ASSEMBLE` available, not complete. Child deliberately assembles/activates machine, producing tracked `MACHINE_ASSEMBLED` before gate/climax.

Each branch must have explicit provider/dependency reachability, purpose, solve condition, payoff and world effect. Bounded narrator-improv may color dialogue but may not determine crystal existence/location/completion.

## DM materialization requirements
NG4/narrator layer must expose enough metadata for a novice DM to understand:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`

It must also provide safe semantic actions for accepted alternative solution, negotiation uncertainty, optional combat and authored outcomes without exposing raw graph/debug state.

## Storylet authoring quality bar
A critical Storylet is not accepted because schema validates. It must answer:
- Why is this thing here?
- What is at stake now?
- How does child notice what matters?
- What does subject want/do?
- What can child reasonably try?
- If a resource is required, how can it actually be obtained earlier?
- Are provider routes thematic and non-circular?
- Does any critical social roll fail forward?
- What completes the beat?
- What changes on success?
- Does world state reflect it?
- Can narrator understand it without inventing missing logic?
- Is narrator-owned improv explicitly scoped?
- Is subject compatible with role?
- Does UI leave room for an unlisted plausible child solution?

If answers are weak, Storylet remains editorially unapproved even if structural tests are green.
