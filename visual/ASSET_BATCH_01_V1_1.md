# Monsterhulen — Asset Batch 01 V1.1

Status: **PRODUCTION BRIEF ONLY — no production runtime integration**
Updated: 2026-10-27

Purpose: the smallest useful art batch that can prove style, crop, readability, performance and state-safety before a larger asset bank is produced.

## Batch acceptance rule
Do not continue to Batch 02 merely because these images look attractive.

Batch 01 must first be inserted into the visual-prep prototype and checked at:
- tablet landscape,
- narrow tablet / portrait-like width,
- 390x844 mobile,
- node size,
- room-hero size,
- dark/light surroundings,
- current/selected overlays.

## A. Room families
Each room family gets a **node master** and may later get a **hero-room master** after node style is accepted.

### 1. `CAVE_GENERIC`
Role: neutral fallback.

Must show:
- readable cave silhouette,
- warm local light source or soft ambient glow,
- stone/moss texture,
- no obvious special encounter.

Must not show:
- door implying a connection,
- key,
- treasure chest,
- NPC/monster,
- puzzle rune that implies a solution,
- crystal socket.

This is the most important knowledge-safe fallback.

### 2. `START`
Role: welcoming beginning.

Must feel:
- safe,
- warm,
- clearly like an entry/starting chamber.

Allowed:
- warm lanterns/torches,
- simple entry architecture,
- neutral packs/crates as decoration if they do not imply loot.

Avoid showing a specific locked/unlocked exit state unless the canonical room art variant explicitly requires it.

### 3. `BRIDGE`
Role: strong spatial identity.

Must show:
- a bridge as room-defining environment,
- obvious depth/chasm/water below,
- child-friendly readable geometry.

Must not encode:
- whether crossing is currently safe,
- whether bridge is blocked,
- a required rope/item,
- a monster unless this is a separate state-specific variant.

### 4. `MUSHROOM`
Role: playful magical environment.

Must show:
- large stylized mushrooms,
- warm/cool bioluminescent accents,
- whimsical rather than psychedelic/scary.

Must not imply:
- mushrooms are edible,
- a potion effect,
- a hidden puzzle answer,
- a specific NPC.

### 5. `UNDERGROUND_LAKE`
Role: calm large-space contrast.

Must show:
- clearly readable underground water,
- cave scale,
- optional neutral dock/rock shelf only if it does not imply a route.

Must not show:
- a boat unless canonical presence is guaranteed for that art variant,
- hidden shore/secret exit,
- treasure visible under water,
- required creature.

## B. Representative subject portrait
First portrait should use an already-stable, friendly subject identity.

Preferred proof subject:
`NPC_OWL_LIBRARIAN`

Reason:
- distinctive silhouette,
- tests feathers/face/props rather than another generic cave monster,
- friendly and clearly child-readable,
- already has a stable entity identity.

Portrait brief:
- square,
- large expressive eyes/face,
- book/library identity readable,
- no readable text on book,
- simple cave/library-neutral background,
- no critical clue or item in hand unless universally part of identity.

## C. Inventory proof set
Four isolated assets:
- key,
- rope,
- lantern,
- generic non-story crystal presentation sample.

Important:
- the generic crystal is an art-style proof only and must not be registered as a `CRYSTAL_MACHINE` critical resource merely because it looks crystalline,
- no rarity borders baked into images,
- transparent/simple backgrounds,
- readable at 64 CSS px.

## D. Required crops
For every approved room-node master test:
- irregular node mask crop,
- square crop,
- 4:3 crop.

Do not regenerate a different composition for every crop until the base style is proven. Test whether one master composition survives responsive cropping.

## E. Lighting rule
Every scene should have one primary readable light hierarchy:
1. local warm or magical focal light,
2. darker cave frame,
3. restrained secondary accents.

Avoid uniform brightness. Map nodes need silhouettes at small size.

## F. Detail-density rule
At node size, the player should understand the room family in about one second.

If the image needs zooming to understand what room it is, it is too detailed.

Hero-room art may carry more detail but still needs a clear focal area.

## G. Browser acceptance
Before Batch 02:
- no stretched images,
- no important crop loss,
- no text baked into images,
- node label remains more readable than decorative detail,
- current/selected CSS treatment remains visible over every image,
- image does not obscure lock/block/state icons,
- mobile room panel remains usable without excessive scroll,
- loading/compression cost measured,
- no hidden story information introduced.

## H. What Batch 01 does not include
- Crystal Machine phase art,
- finale-specific story art,
- complete monster/NPC bank,
- hero bank regeneration,
- trap/puzzle solution illustrations,
- hidden door art,
- story-key-specific art,
- additional blueprint visuals.

Those wait until this proof batch is accepted and, for story-state assets, until canonical state can drive the correct variant.
