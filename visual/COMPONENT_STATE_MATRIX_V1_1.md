# Monsterhulen — Component State Matrix V1.1

Status: **VISUAL PREP ONLY**
Updated: 2026-10-27

Purpose: give every recurring UI state one stable visual meaning. The renderer may express canonical state; it may not infer or create state.

## 1. Map room node

| Canonical state | Visual treatment | Text/icon cue | Interaction |
| --- | --- | --- | --- |
| `current` | strongest warm gold outline/glow | `DU ER HER` in room panel; optional single room-level star | inspect current room | 
| `selected && !current` | cool cyan inspection outline | `KIKKER PÅ KARTET` / `VALGT PÅ KARTET` | inspect only |
| `visited` | normal/saturated room presentation | check/visited cue only at room-node level | inspect |
| `reachable` | subtle green affordance | `GÅ HIT` only after selection | explicit travel action |
| `locked` | muted art + lock cue | `LÅST`; do not name solution unless known | inspect known facts, no travel |
| `blocked` | normal room, blocked connection treatment | obstacle state if player-known | no travel through blocked edge |
| `unknown` | generic obscured node or absent node according to knowledge | `UKJENT` only if existence is known | no hidden detail |

Hard rules:
- `selected` never changes `current`.
- One physical room gets one room-level current marker; never one marker per underlying grid cell.
- A hidden room/edge that is not known to the player is absent, not shown as a tantalising mystery node.
- State differences use shape/icon/text in addition to color.

## 2. Map connection

| State | Treatment | Must not imply |
| --- | --- | --- |
| open | warm stone/wood path | that travel is safe unless state says so |
| locked | lock pattern / muted path | which key or solution works unless revealed |
| blocked | visibly interrupted/obstructed path | that obstacle is solved by a specific item |
| known-secret | special revealed path treatment | undiscovered secrets |
| unknown | absent, or faint only when existence itself is known | hidden topology |
| retreat | same canonical edge, no special magic shortcut styling | a new route that does not exist |

## 3. Primary actions

### `FORTSETT`
- green,
- large,
- only means continue/advance in the current UI context,
- must not silently perform a story solution.

### `SE DEG RUNDT`
- warm orange,
- exploration action,
- communicates optional curiosity rather than mandatory checklist work.

### `RYGGSEKK`
- blue,
- opens inventory/affordance view,
- does not auto-use an item.

### `FORTELLER`
- purple,
- visually subordinate to player actions but always discoverable,
- >=48 CSS px target.

### Disabled action
- lower contrast + no raised shadow,
- text must explain state (`LÅST`, `IKKE TILGJENGELIG`, etc.),
- disabled style must not be the only explanation.

## 4. Inventory slot

| State | Treatment |
| --- | --- |
| empty | quiet recessed slot |
| occupied | brighter card + item art + name |
| critical-known | small `VIKTIG`/story marker only after relevance is known |
| target-bound | visually separated from backpack if item has been explicitly placed/committed |
| unavailable/consumed | absent from inventory; canonical history/state owns why |

No generic attack/defense/stat badge is added to ordinary items.

## 5. Encounter card

Player card may show:
- known subject identity,
- portrait,
- visible behaviour,
- simple observable mood,
- visible consequence/state.

Player card may not show:
- `resolvedWhen` as a recipe,
- hidden requirements,
- narrator-only clue truth,
- provider graph,
- all valid solution families.

Suggested observable mood vocabulary is small and non-mechanical:
- `VENNLIG`
- `ROLIG`
- `NYSGJERRIG`
- `MYSTISK`
- `AVVENTENDE`
- `UROLIG`

Avoid turning mood into a hidden numerical disposition meter.

## 6. Story-progress indicator

Allowed only when the underlying requirement is already revealed.

Good:
- three visible crystal sockets after the machine reveals three missing crystals,
- light up a crystal when the player has knowingly acquired it.

Bad:
- silhouettes for unrevealed requirements,
- generic `2/5 QUEST ITEMS`,
- progress bars for story beats without fictional meaning.

## 7. Forteller surface

Four stable information blocks:
1. `HVA ER SKREVET?`
2. `HVA KAN JEG IMPROVISERE?`
3. `NÅR ER DET LØST?`
4. `TERNING?`

Semantic action family:
- `GODTA LØSNING`
- `USIKKERT FORSØK`
- `START KAMP` only when `combatAllowed`
- later authored outcome actions from Narrative Graph

Never expose raw state flags as the normal play surface.

## 8. Search state

| Search state | Visual language |
| --- | --- |
| not searched | quiet optional `SE DEG RUNDT` affordance |
| clue strengthened | visible observation becomes clearer, not a generic progress bar |
| find revealed | concrete find card/visual |
| backpack full | find remains in world; show clear non-destructive message |
| taken | item leaves world presentation and appears in inventory |

## 9. Combat state

Combat visuals appear only after combat is explicitly started.

- normal combatant: canonical 3-heart presentation,
- `SPENNING`: canonical 4-heart presentation,
- no combat UI merely because subject is a monster,
- non-combat resolve remains available when authored,
- final-heart resolution must communicate outcome, not graphic injury/death.

## 10. Feedback/motion
Use short physical-feeling feedback:
- press depth on buttons,
- soft glow for current/selected state,
- brief reveal emphasis,
- no constant bouncing/pulsing on every interactive element.

Respect `prefers-reduced-motion`.

## 11. Priority rule
When a visual state conflicts with story truth, **story truth wins and the visual must become quieter or more generic**.

A beautiful but misleading node, icon, portrait or illustration is a bug.
