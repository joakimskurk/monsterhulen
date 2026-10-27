# Monsterhulen — Visual Details V1.1

Status: **VISUAL PREP ONLY — presentation prototype, not active runtime**
Updated: 2026-10-27
Branch target: `visual/visual-system-v1-prep`

## Purpose
V1.1 turns the broad Visual System V1 direction into a more explicit tabletop interaction language without changing story logic.

The key principle is:

**visual state may explain what the app already knows, but may never perform the child's action or reveal hidden story truth.**

## 1. Map interaction: inspect != move
A map tap selects a room for inspection only.

Canonical visual states:
- `current`: hero is physically here,
- `selected`: player is looking at this room in the information panel,
- `visited`: room has been visited,
- `reachable`: canonical movement state currently allows travel,
- `locked`: known room/connection exists but cannot currently be traversed,
- `blocked`: connection exists but an active obstacle blocks it,
- `unknown`: topology/content has not been revealed.

Hard rule:
- selecting a room cannot move the hero,
- explicit travel action is separate,
- a locked/blocked/unknown room may be inspectable only to the degree canonical player knowledge allows,
- unknown room art/text must remain generic and leak no hidden subject, reward, route or requirement.

This distinction is important for child agency and prevents the illustrated map from becoming an accidental autopilot UI.

## 2. Connection language
The future node-map renderer may distinguish connection state visually:
- open: ordinary warm stone/wood path,
- locked: muted path with lock treatment,
- blocked: interrupted/red-brown obstacle treatment,
- unknown: faint/obscured treatment only when the connection itself is already player-known; fully hidden topology remains absent.

The legend explains state but never explains the solution.

## 3. Current vs selected room
Current room gets the strongest warm highlight.
Selected-but-not-current room gets a cooler inspection outline.

The side panel explicitly says either:
- `DU ER HER`, or
- `VALGT PÅ KARTET` / `KIKKER PÅ KARTET`.

This prevents a child or narrator from confusing visual inspection with canonical location.

## 4. Room panel hierarchy
Recommended order:
1. location state (`DU ER HER` / selected),
2. one canonical room title,
3. room art,
4. short room description,
5. sensory/signalling chips,
6. encounter/subject card if player-visible,
7. travel availability/action.

Sensory chips such as `LYSENDE SOPPER`, `LYD AV VANN`, or `RUNER I VEGGEN` are observations only. They must not become hidden answers or closed solution lists.

Room artwork remains presentation-only and may not invent exits, keys, creatures, treasure, sockets or story-critical resources.

## 5. Encounter card
Player encounter card shows only useful visible fiction:
- subject name if known,
- portrait/art,
- observable behaviour,
- simple mood/state such as `VENNLIG`, `AVVENTENDE`, `MYSTISK`.

It does not display a list of correct solutions.

## 6. Backpack detail layer
Backpack may explain item affordances without turning them into generic bonuses or auto-actions.

Examples:
- key: may fit a lock when child explicitly tries it,
- rope: supports climbing/securing/pulling plans,
- lantern: provides light and creative possibilities,
- critical crystal: important resource, but possession does not equal placement.

Hard rules:
- no global `USE` button that silently solves context,
- no critical item auto-consumption,
- critical marker is informational only after player knows the item's importance.

## 7. Quest/progress display
Small story-progress indicators are allowed only for authored known state.

Reference in V1.1 prototype:
- three crystal silhouettes after the Crystal Machine requirement has been revealed,
- found crystal may light up,
- unrevealed requirements must not appear before knowledge reveal.

This is not a generic quest checklist system.

## 8. Narrator / Forteller hierarchy
Narrator overlay now visually separates:
- `HVA ER SKREVET?`
- `HVA KAN JEG IMPROVISERE?`
- `NÅR ER DET LØST?`
- `TERNING?`

Semantic controls shown only when applicable:
- `GODTA LØSNING`,
- `USIKKERT FORSØK`,
- `START KAMP` only when the selected Storylet permits combat.

The prototype does not implement canonical Narrative Graph transitions; these are presentation examples for the future DM surface.

## 9. Runtime detail layer
`runtime-detail-v1_1.css` is an additive presentation-only layer intended to load after `runtime-skin-v1.css`.

It adds:
- compact brand subtitle,
- clearer map guidance,
- room/section labels,
- exploration/encounter/narrator labels,
- improved narrator contrast,
- inventory/hero hierarchy,
- stronger touch affordances,
- mobile tab treatment,
- reduced-motion support.

Important correction from visual inspection:
- do **not** add current/visited icons to every `.tile`, because one physical runtime room can span multiple tiles;
- current state remains a room-area highlight instead of repeated per-cell markers.

## 10. Mobile behaviour
At <=720px:
- one principal surface is visible at a time,
- tabs: `KART`, `ROM`, `RYGGSEKK`, `FORTELLER`,
- tab switching is explicit,
- touch controls >=48 CSS px,
- no horizontal overflow,
- narrator/backpack open as bottom sheets.

The prototype uses working tab behaviour rather than visual-only fake tabs.

## 11. Accessibility / robustness
V1.1 includes:
- `:focus-visible` keyboard treatment,
- >=48px major actions,
- `aria-live` on selected room details,
- text labels alongside icons,
- `prefers-reduced-motion` handling,
- no reliance on color alone for locked/current/unknown distinctions.

## 12. What V1.1 deliberately does not do
- no Narrative Graph runtime,
- no production map replacement,
- no save-schema change,
- no new content subjects,
- no automatic item use,
- no hidden-topology reveal,
- no digital dice,
- no merge into UX5A before physical gate.

## Verification checkpoint
Machine/static:
- `QA_VISUAL_DETAILS_V1_1.js`: **30 PASS / 0 FAIL**.

Chromium node-map/detail prototype:
- **20 PASS / 0 FAIL**.

Chromium exact patch-15 runtime + Visual V1 + V1.1 detail CSS:
- **13 PASS / 0 FAIL**.

Runtime browser harness still uses in-memory localStorage because of the existing CDP/container limitation; native persistence/clipboard remain physical-device items.
