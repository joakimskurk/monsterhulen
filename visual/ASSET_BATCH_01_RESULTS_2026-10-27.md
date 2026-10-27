# Monsterhulen — Asset Batch 01 results

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE RUNTIME**

## Scope
Asset Batch 01 V1.2 has been produced and integrated into a standalone exact patch-15 visual inspection product.

The generated map remains canonical/state-driven. No illustrated map nodes were introduced.

Produced proof assets:
- `CAVE_GENERIC` current-room sceneplate
- `MUSHROOM` current-room sceneplate
- `UNDERGROUND_LAKE` current-room sceneplate
- `NPC_OWL_LIBRARIAN` large + thumbnail portrait
- key inventory icon
- rope inventory icon
- lantern inventory icon
- generic non-story crystal inventory icon

## Placement
The proof product uses these assets only in existing/approved presentation roles:
- current-room sceneplate above the current room description
- entity/encounter portrait when the owl librarian is present
- item art inside existing backpack slots

No art controls movement, topology, lock state, quest completion or item use.

## 16-bit interface correction
The integrated proof also reduces rounded UI treatment to a square/pixel-corner shell for cards, buttons, map, badges, inventory slots and overlays.

This is presentation-only and preserves the patch-15 interaction/state model.

## Browser QA
Standalone product proof: **12 PASS / 0 FAIL**.

Verified:
- patch-15 adventure still starts
- current-room sceneplate exists
- sceneplate is embedded and does not require external asset loading
- generated map remains intact
- primary gameplay cards use square/pixel-style corners
- desktop has no horizontal overflow
- four item-art mappings render in proof slots
- item art is embedded
- sceneplate switches to mushroom family from visible room text
- owl portrait hook works
- 390x844 mobile has no horizontal overflow
- mobile sceneplate remains readable

Browser harness caveat remains the same as earlier visual prep: physical iPad/mobile usability, native persistence and native clipboard are not certified by this proof.

## Local artifact hashes
Standalone integrated product HTML:
`23f7437fd05e7fc21220876697c98beeadd62949e0a7031122235c45992bbe61`

Asset-package ZIP:
`2775a23c8edbd679b1dd84769efe93f33c60280a22e4eae96cf8d8e07a9f9ad3`

Tablet capture:
`40b23cb311706bba0f01283b08a3848d7ea0b0b5f1499b7b3b8e47ecc4aeeadb`

Mobile capture:
`4b474df2cedaf431091cbbd8854c3669bcf8a9f319a4913f7ea78a3761c33fd6`

Asset contact sheet:
`a6320d3f148b2b185c514963184035de8072a74c3e45df93f6c6e52c0ef20c54`

## Provenance limitation
The binary assets are not committed to GitHub yet because the repository connector previously proved unsafe for large binary/base64 transport. The text spec, QA evidence and hashes are committed; local deliverables remain the tested binary source for this checkpoint.

Do not claim repository byte-provenance is closed until a byte-safe binary upload path exists and repository copies are hash-verified.

## Editorial status
This proves the asset pipeline and placements technically. It does **not** prove the visual assets are finally accepted editorially or physically on target devices.

Before mass-producing the full art bank, inspect this proof as an actual Monsterhulen interface and confirm:
- sceneplates feel atmospheric rather than state-defining
- item icons remain readable without looking like generic stat bonuses
- portrait style fits the game shell
- 16-bit pixel-corner treatment is the desired density/harshness level

## Runtime boundary
Active UX5A runtime remains unchanged. This asset proof is not merged to runtime or `main`.
