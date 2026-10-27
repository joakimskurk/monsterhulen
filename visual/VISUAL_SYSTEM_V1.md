# Monsterhulen Visual System V1

Status: **VISUAL PREP ONLY — no UX5A runtime integration before physical gate is green**

## Goal
Translate the approved visual direction into a real web UI system without turning concept art into a flattened screenshot. The browser owns text, controls, accessibility, responsive layout and state. Art assets provide illustration only.

## Non-negotiables
- preserve current gameplay/state semantics and stable IDs,
- no text baked into art assets,
- no state encoded only by color,
- minimum primary touch target 48x48 CSS px,
- child-facing player UI stays simpler than narrator UI,
- one visible room identity per physical room,
- owned items do not auto-apply solutions,
- unknown/hidden graph information must not leak through decorative art,
- current UX5A patch-15 runtime remains frozen until physical gate passes.

## Visual language
The world is a warm underground storybook: dark blue cave space, amber torchlight, parchment for readable story surfaces, wood/stone for chrome, and saturated crystals only as accents.

### Core colors
The runtime Asset Contract 2.4.0 palette remains compatible. Visual V1 adds semantic aliases rather than replacing stable asset metadata.

- cave/night: `#0c1421`, `#17263a`, `#263e57`
- parchment: `#f2d9aa`, highlight `#fff0c9`
- wood: `#5b321e`, dark `#2f1a13`
- torch/gold: `#f2b33c`, `#ffd76a`
- action green: `#4e9b36`
- search orange: `#d87527`
- inventory blue: `#347db3`
- narrator purple: `#7249ab`
- danger/combat red: `#d94b43`

### Typography
No remote font dependency in V1.
- display/room titles: Georgia/serif fallback,
- UI/buttons/body: Trebuchet MS/Arial/system fallback,
- body text should use normal mixed case in future visual integration even when legacy runtime content is uppercase.

### Surfaces
- cave/map canvas: dark, low-contrast texture,
- story/room panel: parchment,
- top chrome: carved wood/stone feeling,
- narrator panel: dark violet/night surface,
- inventory slots: individual tactile wells,
- active room: gold outline + glow, never glow alone.

## Information hierarchy
Tablet/desktop:
1. map/world state,
2. current room story,
3. current encounter/affordance,
4. hero + inventory,
5. primary child actions,
6. narrator entry.

Player-facing room title appears once as the canonical physical place identity. Internal zone/tone stays visual metadata only.

## Button families
- `PRIMARY_CONTINUE`: green, forward/progression when actually available,
- `SEARCH_INSPECT`: orange, exploratory action,
- `INVENTORY`: blue,
- `NARRATOR`: purple,
- `DANGER/RESET`: red and separated from primary play actions,
- directional/fallback movement: brown/stone, subordinate to semantic interaction.

Buttons must retain text labels; icons are supplemental.

## Map strategy
Two stages are intentionally separated.

### Stage A — safe runtime skin
`visual/runtime-skin-v1.css` restyles the exact UX5A patch-15 DOM without changing generator/state/action logic. The existing 13x13 room-cell map remains structurally unchanged.

### Stage B — post-gate node-map renderer
After UX5A is physically green and merged, a renderer experiment may present each generated room as an illustrated room node while keeping the same canonical room IDs/connections/lock/secret/block state underneath.

A room illustration is presentation. It may not create an exit, key, NPC, clue or interaction absent from state.

## Room art families
Initial presentation families, not new story entities:
- `START`
- `CAVE_GENERIC`
- `BRIDGE`
- `MUSHROOM`
- `UNDERGROUND_LAKE`
- `MINE`
- `GUARDIAN`
- `TREASURE`
- `PUZZLE`
- `TRAP`
- `FINALE_GATE`
- `CRYSTAL_CAVERN`

A generated room can choose an art family by deterministic presentation tags. Art family is not the room's stable identity.

## Entity art
Reuse Asset Contract 2.4.0 stable entity IDs. V1 must not invent parallel IDs for heroes, monsters, NPCs, traps, mysteries, treasures or rewards.

Examples already canonical:
- `NPC_OWL_LIBRARIAN`
- `MONSTER_TRADER_CRAB`
- `MONSTER_STONE_GOLEM`
- `TRAP_RAINBOW_NET`
- `MYSTERY_WRITING_BOOK`
- `TREASURE_GLASS_MARBLE`
- `CHAR_HERO_14` etc.

## Accessibility / readability
- 48px target minimum for primary touch interactions,
- never require hover,
- text remains DOM text,
- decorative imagery gets empty alt; entity imagery gets canonical label,
- active/locked/blocked states combine shape/icon/text with color,
- narrator-only state stays outside player payload,
- reduced-motion mode should disable glow pulses/large transitions when implemented.

## Prototype artifacts
- `visual/tokens-v1.css`: reusable design tokens,
- `visual/runtime-skin-v1.css`: safe CSS-only skin for current UX5A DOM,
- `prototypes/visual-system-v1/index.html`: interactive future-layout vertical slice.

The prototype is not production runtime and does not prove touch usability or narrative quality.
