# Storylet Matrix V1

Status: **DESIGN LOCK CANDIDATE - prep only**

## Purpose
The Storylet Matrix defines which curated narrative modules may satisfy which story functions. It prevents individually valid content from combining into incoherent critical story.

The matrix is a compatibility and **meaning** contract. It separates:
- what enables an action from the child actually choosing it,
- a scene being present from the scene having a meaningful function,
- a UI counter from authored fictional progress,
- tracked authored story logic from intentionally open narrator improvisation.

## Storylet contract
Each Storylet must declare at least:

```text
id
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
clue
approachFamilies[]
failForward
completionRule
resolvedWhen
payoff
worldEffects[]
knowledgeReveals[]
criticalSafe
```

`requires[]` enables the beat. `completionRule`/`resolvedWhen` says what explicit fictional/state transition completes it. Satisfying requirements must not silently complete an action-bearing beat.

`payoff` is what narrator/player should experience after completion. `worldEffects[]` is the actual game-state change that makes that payoff true.

Optional:
- `progressStages[]`
- `narratorImprov`
- `npcRole`
- `monsterFamilyAllow[]`
- `monsterFamilyDeny[]`
- `itemHooks[]`
- `puzzleTags[]`
- `toneAllow[]`
- `zoneAllow[]`
- `minAgeBand`
- `maxAgeBand`
- `consumesResource`
- `openHint`
- `strongerHint`

`progressStages[]` is allowed only when each stage names a real meaningful fictional change. There is no default “normal = 3 / exciting = 4” storylet duration.

`narratorImprov`, when present, declares an intentionally open narrator detail. It must state what Forteller is invited to invent, what scope is allowed, and what is forbidden. The narrator view must state that there is no hidden app answer for the open detail. Critical requirements/completion/payoff/world effects may not depend on an untracked improvised fact.

Hints should normally progress from open prompt to affordance-level hint rather than immediately exposing a closed answer.

## Initial acquisition families

| Family | What it does | Must require | Must provide | Critical-safe rule |
| --- | --- | --- | --- | --- |
| `VISIBLE_FIND` | obvious discovery | authored scene + explicit take/receive action | target resource | only for deliberately simple beats, never three times in one collect quest |
| `SEARCH_SECRET` | resource hidden but signalled | clue + searchable location + fail-forward | target resource | required search cannot rely on one lucky die roll |
| `NPC_FAVOR` | NPC controls resource | motive + concrete reachable favor | target resource after explicit acknowledgement | dependency exists/reachable; payoff changes relationship/resource state |
| `GUARDIAN` | creature controls access | motive + non-combat affordance | resource/access after resolution | combat cannot be only authored route |
| `PUZZLE_REWARD` | coherent puzzle reveals resource | puzzle causally tied to fiction + narrator hint/answer | target resource | unrelated generic puzzle is rejected |
| `ENVIRONMENT` | spatial/physical obstacle | concrete room feature | resource/access | must state what is blocked/at stake and what changes after resolution |
| `TRADE` | exchange | obtainable desired condition/resource | target resource after explicit exchange | no circular requirement |
| `RESCUE_REWARD` | helping someone yields resource | rescue problem | target resource after explicit payoff | rescue cannot require reward itself |
| `FOLLOW_CLUE` | clue chain | prior clue + destination | next clue/resource | chain progresses/terminates, never loops |

## Default diversity rule
For three required parts, choose three distinct acquisition families unless blueprint explicitly overrides. Preferred reference mix:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`

Avoid three bare pickups/guardians/puzzles/searches/fetch quests by default. Goal is variety in play mode, not nouns.

## Compatibility dimensions
### Subject type
Examples: `CRYSTAL`, `KEY`, `CLUE`, `LOST_PERSON`, `MAGIC_OBJECT`, `MACHINE_PART`, `RUNE`.

### Narrative role
Examples: `ACQUIRE`, `REVEAL`, `HELP`, `GUARD`, `DECODE`, `RETURN`.

### Room affordance
Examples: `DEAD_END_OK`, `NEEDS_ADJACENT_ROOM`, `NEEDS_SEARCHABLE_PROP`, `NEEDS_NPC_SPACE`, `NEEDS_MONSTER_SPACE`, `NEEDS_WATER`, `NEEDS_ALTAR`.

### Tone
Examples: `LYS`, `MØRK`, `BLANDET`, `RAR`.

## Purpose/world-effect rule
The `REGNBUENETTET` UX5A finding is a hard authoring lesson: “interesting text + buttons” is not a complete scene.

Every interactive Storylet must answer:
- Why is this here?
- What does it prevent, threaten, offer or change **now**?
- What fictional condition means problem/opportunity is resolved?
- What changes after success?
- Does game state actually implement that change?

For `ENVIRONMENT`, a Storylet claiming to block a path must actually produce a map/world block while unresolved and corresponding release effect on completion. It must also have fail-forward/retreat policy so it cannot softlock.

For `PUZZLE_REWARD`, puzzle must be caused by or meaningfully embedded in Storylet. Selecting arbitrary puzzle because category/type matches is invalid.

## Narrator-improvisation rule
The `BOKA SOM SKRIVER TILBAKE` UX5A finding establishes that **improvisation itself is not the problem; invisible responsibility is.**

A Storylet may intentionally include open details for Forteller. If it does:
- `narratorImprov` declares that openness,
- narrator UI says there is no hidden answer/larger predetermined plan for that detail,
- prompt tells Forteller what can be invented,
- allowed scope can include atmosphere, cosmetic detail, optional side discovery or optional hint that reuses already-valid facts,
- forbidden scope includes new mandatory resources, prerequisites, completion state, phase changes and promised world effects unless separately authored/tracked,
- player-facing fiction remains immersive and need not expose meta implementation language.

For critical Storylets, tracked payload always wins. Example: if the Storylet must reveal `CRYSTAL_BLUE_LOCATION`, that reveal must be authored/tracked; Forteller may improvise the book's wording around that fact, not invent which location is required.

## Hard rejection examples
Reject before map materialization if:
- NPC favor asks for item no earlier node provides,
- trade asks for same resource it rewards,
- guardian has only combat route,
- required hidden object has no clue,
- puzzle lacks thematic/causal relation to Storylet,
- Storylet requires unsupported room affordance,
- clue points behind gate it must open,
- branch depends on optional UX5A hidden find,
- player must know fact before reveal,
- action-bearing Storylet lacks explicit completion rule,
- completion equals “all requirements owned/known” when fiction calls for child action,
- possessed obvious item is auto-applied,
- interactive Storylet lacks `purpose`, `stakes`, `resolvedWhen` or `payoff`,
- promised payoff has no coherent `worldEffects[]`,
- Storylet has generic progress count with no named `progressStages[]`,
- progress stage is merely filler/repetition rather than changed fictional state,
- blocking Storylet can softlock without retreat/fail-forward,
- random puzzle/mechanic is attached without authored contextual role,
- prose implies a hidden authored answer but payload is absent and no explicit narrator-improv contract exists,
- critical state depends on a narrator-invented fact that is not represented in graph state.

## Agency / affordance rule
Authored approaches are possibilities, not answer buttons.

Examples:
- owned key + locked door -> key usable; door stays locked until chosen,
- NPC favor fulfilled -> child still returns/interacts unless remote completion explicitly authored,
- guardian motive discovered -> new plan becomes possible; no auto-resolve,
- crystals owned -> `ASSEMBLE` becomes actionable; machine not assembled.

## Matrix scoring
After hard filtering, score valid Storylets by:
1. play-family diversity,
2. thematic fit,
3. contrast with adjacent beats,
4. room/map fit,
5. age-band fit,
6. recent repetition penalty.

Do not score invalid combinations into validity.

## CRYSTAL_MACHINE reference matrix
Required resources:
- `CRYSTAL_RED`
- `CRYSTAL_BLUE`
- `CRYSTAL_YELLOW`

Allowed V1 families:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`
- `PUZZLE_REWARD`
- `ENVIRONMENT`

Reference acceptance must produce one signalled search, one NPC favor with real dependency and one guardian with non-combat possibility. Exact color assignment may rotate if copy remains coherent.

All crystals owned enables separate `ASSEMBLE`; it does not auto-complete assembly.

Each chosen acquisition Storylet must have a distinct comprehensible purpose and observable payoff, not merely a different method label.

Bounded narrator-improv may color dialogue, descriptions or optional side details, but it cannot determine whether a crystal exists, where a required clue points, whether a favor is complete or whether the gate can open.

## Storylet authoring quality bar
A critical Storylet is not accepted because schema validates. It must answer:
- Why is this thing here?
- What is at stake now?
- How can child notice what matters?
- What does character/creature/world want or do?
- What can child reasonably try?
- What explicit state transition completes beat?
- What changes when child succeeds?
- Does world state actually reflect that change?
- Can narrator understand scene without inventing missing logic or filler steps?
- If narrator is invited to invent a detail, is that responsibility explicitly labelled and safely scoped?
- Does UI leave room for an unlisted plausible child solution?

If answers are weak, Storylet remains editorially unapproved even if code is green.
