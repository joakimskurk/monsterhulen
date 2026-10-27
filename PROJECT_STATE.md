# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Visual V1.4 corrected asset integration — automated/browser green, manual screenshot reviewed, editorial refinement still open**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green. Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Canonical visual direction
Concept art is mood/material reference only. The actual Monsterhulen runtime/grid/interaction model is the design substrate.

## V1.3 is visually rejected
V1.3 was a useful technical proof but failed manual product review despite green structural/browser checks.

Failures observed in its screenshots:
- tiny dungeon cluster inside oversized dead map surface,
- current highlight repeated per cell,
- stretched sheet crops used as button/panel chrome,
- generic scene art invented room contents,
- tone metadata incorrectly implied environment art,
- weak mobile composition and overlay risk.

Do not use V1.3 as the current visual implementation target.

## Visual V1.4 — current implementation
Repo files:
- `visual/runtime-assets-v1_4.css`
- `visual/runtime-assets-v1_4.js`
- `visual/asset-manifest-v1_4.json`
- `visual/VISUAL_IMPLEMENTATION_V1_4_2026-10-27.md`
- `tests/QA_VISUAL_ASSET_IMPLEMENTATION_V1_4.js`

### Integration rule
Sheet art is used as discrete sprites and repeatable textures. Panels/buttons/layout/state are CSS/DOM components.

### Map
- canonical generated topology remains unchanged,
- focused scrollable viewport follows current room,
- centering reads actual CSS padding,
- physical multi-cell room gets one exterior current outline,
- fog is quiet/dark,
- neutral stone textures only for tone styling,
- `?`, lock and already-visible encounter markers use split sprites,
- no static/diorama dungeon replaces runtime grid.

### Room art
Generic scene art is disabled. Scene art may appear only when visible current-room name/description safely selects an explicit family such as mushroom or water.

### Hero/items
Stable hero IDs are mapped only to recognizable matching sprites. Inventory assets are visual replacements inside existing slots and never auto-use/consume items.

### Mobile
Explicit surfaces:
- KART
- ROM
- SEKK
- FORTELLER

Navigation stays in document flow and does not cover canonical controls.

## V1.4 asset package
Current tested package contains **31 PNG assets** under local `assets/v14/`.

Hash/size list committed as:
`visual/asset-manifest-v1_4.json`

Binary PNGs are not committed through the GitHub connector because earlier binary transport was proven non-byte-safe. The tested local ZIP remains binary source for this checkpoint.

## Verification
Static V1.4 contract:
- **20 PASS / 0 FAIL**.

Chromium exact patch-15 + V1.4:
- **24 PASS / 0 FAIL**.

Manual tablet/mobile screenshot review was performed after final map-centering, scene-safety and mobile-navigation corrections.

This means V1.4 fixes the identified V1.3 defects. It does **not** mean the final visual product is editorially complete; visual quality still requires human judgement.

Harness caveat: CDP runtime uses in-memory localStorage. Native persistence/clipboard and physical touch remain outside this visual certification.

## Tested local deliverables
Standalone corrected HTML SHA-256:
`80d411f80bc199d488766dd54329757c2e18204dde63b1fa0ea4d017c2559b82`

Corrected split-asset ZIP SHA-256:
`78a695421189b3c07ef689c3d14343f6ee500c9d7fe07bacab0b049044d4e48b`

Tablet capture SHA-256:
`4f01a08117f88d1ef6bac96f714e60afc47574f758b3616e1ff050b479b03e07`

Mobile capture SHA-256:
`dc6d0bd87a57c1e666690b8e82afa672af52fc814c1b869c1c6716d3ee6ce9e8`

V1.4 manifest SHA-256:
`a0f23ca68cafa104e550fd0d2f7445708a73e1e9e86ca0da0cdc9c7c074cf34a`

## Stable IDs / state constraints
Existing Asset Contract 2.4.0 remains authoritative. No parallel IDs. No visual hook may move the hero, mutate story state, reveal hidden topology, auto-use inventory or invent story facts.

## Exact next safe visual work
Continue only from V1.4:
1. manual/editorial review of corrected build,
2. refine weak crops/sprites rather than adding broad new visual systems,
3. expand art in controlled batches against real runtime surfaces,
4. rerun static + browser + screenshot review each batch,
5. keep runtime/main untouched until UX5A physical gate is green.

When physical UX5A becomes GREEN, return to runtime sequencing first. Visual integration remains a later selective package, not a wholesale branch merge.
