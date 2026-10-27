# Monsterhulen — Asset Batch 01 V1.2

Status: **VISUAL PREP ONLY — supersedes the V1.1 batch placement assumptions**

Purpose: prove that authored art can add warmth and wonder **inside the existing Monsterhulen runtime surfaces** without turning the concept art into a layout template.

## Placement rule
Batch 01 does **not** create illustrated map nodes.

The generated runtime map remains canonical and visually abstract/state-driven.

Art is tested only in three existing presentation roles:
1. current-room sceneplate,
2. entity/encounter portrait,
3. inventory item icon.

## A. Current-room sceneplates
Target placement: inside the existing current-room information surface, near the room description/visible encounter content.

Format:
- landscape 16:9 master,
- safe center crop for narrow/mobile presentation,
- no baked-in text,
- no frame/UI chrome in the art,
- no exits/locks/keys/resources/characters unless canonical state explicitly supplies them.

Proof families:
- `CAVE_GENERIC`
- `MUSHROOM`
- `UNDERGROUND_LAKE`

### CAVE_GENERIC
Mood only: cool cave depth, warm local light, child-safe mystery.
Must not show a unique clue, chest, doorway, creature, crystal socket or other implied state.

### MUSHROOM
May show oversized magical mushrooms and ambient spores/glow.
Must not imply a puzzle answer, collectible mushroom or required resource.

### UNDERGROUND_LAKE
May show dark water, cave reflections and safe shoreline atmosphere.
Must not imply a boat, bridge, hidden tunnel or creature unless state provides it.

## B. Entity proof portrait
Stable entity ID:
- `NPC_OWL_LIBRARIAN`

Target placement: existing entity/encounter presentation.

Format:
- 1:1 square,
- clear silhouette at small size,
- neutral/friendly pose,
- no speech bubble or baked-in story text,
- no critical item in hand unless that item is part of canonical current state.

Goal: prove style continuity between friendly NPC art and the darker cave shell.

## C. Inventory proof icons
Target placement: existing backpack slots.

Transparent square icons:
- key,
- rope,
- lantern,
- generic non-story crystal.

Rules:
- strong silhouette,
- readable at 48–72 CSS px,
- no numeric bonus language,
- no glow that falsely implies story-critical status,
- critical/known importance is UI state added by the browser, not baked into the illustration.

## D. What this batch explicitly excludes
- map-room diorama art,
- finale-gate art,
- Crystal Machine socket UI,
- authored clues,
- story keys,
- hidden doors,
- treasure scenes,
- combat poses,
- full hero bank,
- full content bank.

## Browser acceptance gate
Before any larger art production:
1. sceneplate fits current room card on tablet,
2. mobile crop remains readable,
3. no art creates false topology/state,
4. portrait remains legible at encounter-card size,
5. item icons remain legible in existing inventory slots,
6. image loading does not materially disrupt interaction/performance,
7. fallback without art remains fully usable,
8. narrator/player text remains DOM text, never baked into assets.

Only after this batch is manually accepted should the art bank expand.
