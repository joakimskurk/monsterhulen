# Storylet Matrix V1

Status: **DESIGN LOCK CANDIDATE - prep only**

## Purpose
The Storylet Matrix defines which small curated narrative modules may satisfy which story functions. It prevents the generator from combining individually valid content into an incoherent critical story.

The matrix is a compatibility contract, not just a tag list.

## Storylet contract
Each storylet must declare at least:

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
narratorGoal
clue
approachFamilies[]
failForward
payoff
knowledgeReveals[]
criticalSafe
```

Optional:
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

## Initial acquisition families

| Family | What it does | Must require | Must provide | Critical-safe rule |
| --- | --- | --- | --- | --- |
| `VISIBLE_FIND` | obvious discovery | authored scene | target resource | only for deliberately simple beats, never three times in one collect quest |
| `SEARCH_SECRET` | resource is hidden but signalled | clue + searchable location + fail-forward | target resource | required search can never rely on one successful die roll |
| `NPC_FAVOR` | NPC has or controls resource | NPC motive + concrete favor target | target resource after favor | favor dependency must exist and be reachable |
| `GUARDIAN` | creature controls access | creature motive + at least one non-combat affordance | target resource/access | combat cannot be the only authored route |
| `PUZZLE_REWARD` | coherent puzzle reveals resource | puzzle tied to fiction + narrator hint/answer | target resource | puzzle cannot be unrelated generic trivia pasted into scene |
| `ENVIRONMENT` | spatial/physical obstacle | concrete room feature | target resource/access | must support multiple plausible child plans where possible |
| `TRADE` | character exchanges resource | desired resource/condition | target resource | requested trade object must be obtainable before this node |
| `RESCUE_REWARD` | helping someone yields resource | rescue target + rescue problem | target resource | rescue cannot require the reward itself |
| `FOLLOW_CLUE` | clue chain leads to resource | prior clue and destination | next clue/resource | chain must progress and terminate, never loop |

## Default diversity rule
For a `COLLECT` graph with three required parts, select three distinct acquisition families whenever the blueprint does not explicitly override this.

Preferred first reference mix:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`

Avoid by default:
- three bare pickups
- three guardians
- three puzzles
- three searches
- three NPC fetch quests

The goal is variety in **play mode**, not merely different nouns.

## Compatibility dimensions

### Subject type
Examples:
- `CRYSTAL`
- `KEY`
- `CLUE`
- `LOST_PERSON`
- `MAGIC_OBJECT`
- `MACHINE_PART`
- `RUNE`

### Narrative role
Examples:
- `ACQUIRE`
- `REVEAL`
- `HELP`
- `GUARD`
- `DECODE`
- `RETURN`

### Room affordance
Examples:
- `DEAD_END_OK`
- `NEEDS_ADJACENT_ROOM`
- `NEEDS_SEARCHABLE_PROP`
- `NEEDS_NPC_SPACE`
- `NEEDS_MONSTER_SPACE`
- `NEEDS_WATER`
- `NEEDS_ALTAR`

### Tone
Examples:
- `LYS`
- `MØRK`
- `BLANDET`
- `RAR`

A storylet may permit several tones but should provide coherent authored variants where tone materially changes the scene.

## Hard rejection examples
Reject before map materialization if:
- an NPC favor asks for an item that no earlier node provides,
- a trade asks for the same resource it is supposed to reward,
- a guardian has only `KAMP` as authored approach,
- a required hidden object has no visible/audible clue,
- a puzzle template has no thematic relation to the storylet,
- a storylet requires water but no eligible room can support water presentation,
- a clue points to a room behind the gate it is required to open,
- a generated branch depends on an optional UX5A hidden find,
- a child must know a fact before the graph has revealed it.

## Matrix scoring
After hard compatibility filtering, score valid storylets by:
1. play-family diversity,
2. thematic fit to blueprint,
3. contrast with adjacent critical beats,
4. room/map fit,
5. age-band fit,
6. recent repetition penalty within the same adventure.

Do not score invalid combinations into validity. Hard constraints always win.

## CRYSTAL_MACHINE reference matrix
Required resources:
- `CRYSTAL_RED`
- `CRYSTAL_BLUE`
- `CRYSTAL_YELLOW`

Allowed acquisition families for V1:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`
- `PUZZLE_REWARD`
- `ENVIRONMENT`

Reference acceptance generation must be able to produce a variant equivalent in structure to:
- one crystal hidden behind a signalled search,
- one crystal controlled by an NPC with a small concrete favor,
- one crystal controlled by a guardian creature with non-combat possibilities.

The exact color-to-family assignment may rotate if authored copy remains coherent.

## Storylet authoring quality bar
A critical storylet is not accepted merely because it passes schema validation. It must answer:
- Why is this thing here?
- How can the child notice what matters?
- What does the character/creature want?
- What can the child reasonably try?
- What changes when the child succeeds?
- Can the narrator understand the scene without inventing missing logic?

If those answers are weak, the storylet remains editorially unapproved even if code validation passes.