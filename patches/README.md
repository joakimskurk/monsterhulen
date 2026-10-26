# Playtest patches

Active patches are applied in order against the V0.12.3 playtest baseline.

## Compressed historical patches
The two larger historical patches are stored as gzip + base64:
- `v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
- `v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`

Reconstruct with:
```bash
base64 -d FILE.patch.gz.b64 | gunzip > FILE.patch
```

## Active patch order on the UX5A branch
1. `v0.12.3_playtest_map_navigation.patch`
2. `v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `v0.12.3_playtest_dm_guide_dice_faces.patch`
4. reconstructed `v0.12.3_playtest_adventure_code_v1.patch`
5. reconstructed `v0.12.3_playtest_progression_gates_secret_doors.patch`
6. `v0.12.3_playtest_searchable_rooms_encounter_engine_ux5a.patch`
7. `v0.12.3_playtest_encounter_narrator_ux5a.patch`
8. `v0.12.3_playtest_searchable_rooms_encounter_ui_ux5a.patch`
9. `v0.12.3_playtest_searchable_rooms_encounter_render_ux5a.patch`
10. `v0.12.3_playtest_device_findings_hotfix_ux5a.patch`
11. `v0.12.3_playtest_explicit_story_key_use_ux5a.patch`
12. `v0.12.3_playtest_single_location_name_ux5a.patch`
13. `v0.12.3_playtest_encounter_purpose_contract_ux5a.patch`
14. `v0.12.3_playtest_explicit_improv_guidance_ux5a.patch`
15. `v0.12.3_playtest_room_description_location_identity_ux5a.patch`

UX5A is deliberately split so engine/migration, narrator guidance, UI helpers and render/state handlers have independent failure boundaries.

Patch 10 addressed first device findings. Patch 11 preserves child agency at keyed gates. Patch 12 removed the separate visible area identity from banner/narrator/status surfaces. Patch 13 replaced generic encounter duration with authored purpose/solve/payoff semantics. Patch 14 made intentional narrator improvisation explicit and bounded.

Patch 15 closes the remaining patch-12 coverage gap discovered on 2026-10-27: player-visible `room.desc` still began with `${zone.name}. ${room.name}.`. Patch 15 changes it to `${room.name}.` while retaining `zoneName` internally for generation/tone.

### Historical patch-format note
Some earlier patch files contain abbreviated `@@` separator hunks. Verified reconstruction therefore uses exact text/context application where necessary. Patches 10-15 are normal unified diffs against the preceding verified layer.

## UX5A patch hashes
- engine: `49d7fb0ab1558caea18a3a2b4cb720efde21a79ba269bec33d82f684c7e3a48f`
- narrator: `bb86a8a1bd59fc3191058e38f022d2ecf1ba54cfac9a7b476c74964740c03ade`
- UI helpers: `87bccb1376d57621168416669287489857baeabf178f803411b5c680c410ee02`
- render/state: `fc28ab10cfae898c62e384fa4b32d1d6a19aece98b80bacf239607488674ecfa`
- device-findings hotfix: `1dd09c98a37234c418b60fd522808b28b23ce86f9054fc7d88b752d9deb55177`
- explicit story-key use: `276711322f02586f481214011a85a236476d22a524c98c7e96a82c9d1533decf`
- single visible location identity: `0cd1e2b43f9e1add7d53bf188ed9688ca0694be4d45b35dda941fb3c18ca7f58`
- encounter purpose contract: `74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`
- explicit narrator improvisation: `123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`
- room-description location identity patch: `f8cd1e6c746541961ebf9308e62763d58a27ae705bee42886d56c082ceb620a5`

Updated single-location QA source SHA-256:
`c84bf6b16841c6795e589f49c08cf6287fa403aa08d2a8d77662e679d51d20d1`

Restored authored-mysteries-only QA source SHA-256:
`29c48341a73260b0906c8d50db3416fe7a27fcea543f2cc60429ef71e15de255`

## Reconstruction / provenance
Historical behavioral reconstruction hashes through patch 14:
- pre-device-finding UX5A: `289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`
- after patch 10: `fc1bf19ba8a95ccc25b7735a7da0cbc2f52187a37f0fdb357f043695377d72ca`
- through patch 11: `038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`
- through patch 12: `79bea4f4b608c34ac6189aec6fcadbcd09978814625e94dc74e3654a58d9cd42`
- through patch 13: `e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`
- through patch 14: `7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

These are behavioral reconstruction artifacts, not byte-identical release baselines.

On 2026-10-27, line-segmented Project/Library materialization was used to reconstruct the exact current indexed patch-14 source available in the project. Patch 15 applied cleanly to that source.

Patch-15 reconstructed candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not confuse this with byte-identical original-release provenance; repository-health remains open.

## Automated verification on patch 15 - GREEN
- `tests/QA_SINGLE_LOCATION_NAME_UX5A.js`: **21 / 0**
- `tests/QA_EXPLICIT_IMPROV_GUIDANCE_UX5A.js`: **20 / 0**
- `tests/QA_AUTHORED_MYSTERIES_ONLY_UX5A.js`: **5136 / 0**
- `tests/QA_ENCOUNTER_PURPOSE_UX5A.js`: **4337 / 0**
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 / 0**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2328 / 0**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 / 0**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 / 0**
- `tests/QA_CONTENT_REGRESSION.js`: **5830 / 0**
- `tests/QA_PATCH15_GATE_RUNTIME.js`: **6844 / 0**
- all 11 inline JavaScript blocks: **0 syntax errors**

The previously documented `QA_AUTHORED_MYSTERIES_ONLY_UX5A.js` was missing from the repository at the start of the 2026-10-27 checkpoint. It has been restored; the current test count is 5136/0. The older 3075/0 number is historical evidence only.

## Browser evidence
Historical:
- broad pre-patch-11 Chromium: **23 / 0**
- patch-10 focused Chromium: **15 / 0**

Current patch 15:
- headless Chromium interaction smoke: **22 / 0**

The current smoke loaded the exact patch-15 HTML through DevTools document injection and used an in-memory localStorage shim because the container blocked Chromium local navigation/native localStorage on the injected origin. It certifies current DOM/click/mobile-view interactions, not native persistence or clipboard.

See `docs/UX5A_BROWSER_QA_2026-10-27.md`.

## Remaining gate
UX5A is **not merged to `main`**.

Machine regression and current Chromium interaction smoke are green. Remaining gate is physical iPad/mobile testing of the same patch-15 candidate, including native persistence/clipboard behavior and human/touch comprehension.

Use `docs/UX5A_GATE_REVIEW_2026-10-27.md`.

Narrative Graph runtime remains blocked until UX5A is physically green and merged. UX5B remains deferred until Narrative Graph V1 is proven.

Repository-health remains open: full source/assets are not yet byte-reconstructable from ordinary repo files alone.
