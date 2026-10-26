# Playtest patches

Active patches are applied in order against the V0.12.3 playtest baseline.

## Compressed historical patches

The two larger historical patches are stored as gzip + base64 because the GitHub connector handles that representation more reliably:

- `v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
- `v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`

To reconstruct a normal patch on macOS/Linux:

```bash
base64 -d FILE.patch.gz.b64 | gunzip > FILE.patch
```

Python, platform independent:

```python
from pathlib import Path
import base64, gzip
p = Path('patches/FILE.patch.gz.b64')
out = Path('patches/FILE.patch')
out.write_bytes(gzip.decompress(base64.b64decode(p.read_bytes())))
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

UX5A is deliberately split so engine/migration, narrator guidance, UI helpers and render/state handlers have independent failure boundaries. Patch 10 addressed first device findings. Patch 11 preserves child agency at keyed gates. Patch 12 removes the separate visible area badge and zone identity from narrator/status surfaces. Patch 13 replaces generic encounter duration with authored purpose/solve/payoff semantics. Patch 14 keeps narrator improvisation as a valid play mode but makes it explicit and bounded instead of looking like missing hidden content.

Patch 15 closes a test-coverage gap found during the 2026-10-27 gate review: even after patch 12, the player-visible `room.desc` still began with `${zone.name}. ${room.name}.`, so a room could still present two competing place identities. Patch 15 changes only the player description prefix to `${room.name}.` while retaining `zoneName` internally for deterministic generation/tone. `tests/QA_SINGLE_LOCATION_NAME_UX5A.js` now checks this exact leak.

### Historical patch-format note

Some earlier playtest patch files contain abbreviated `@@` separator hunks rather than a completely conventional unified-diff header on every block. Verified reconstruction therefore uses exact text/context application where necessary instead of assuming every historical patch can be fed blindly to GNU `patch`.

Patches 10-15 are normal unified diffs against the preceding verified reconstructed layer.

## UX5A patch hashes

SHA-256 of the plain UX5A patch files already verified before patch 15:

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

The updated single-location QA source prepared with patch 15 has SHA-256:
`c84bf6b16841c6795e589f49c08cf6287fa403aa08d2a8d77662e679d51d20d1`

## UX5A runtime verification

The indexed Library playtest source can be inspected and the patch-14 behavior is visible there. The original release-byte provenance remains separate repository-health debt.

Historical behavioral reconstruction hashes:
- pre-device-finding UX5A: `289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`
- after patch 10: `fc1bf19ba8a95ccc25b7735a7da0cbc2f52187a37f0fdb357f043695377d72ca`
- through patch 11: `038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`
- through patch 12: `79bea4f4b608c34ac6189aec6fcadbcd09978814625e94dc74e3654a58d9cd42`
- through patch 13: `e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`
- through patch 14: `7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Do **not** treat these reconstruction hashes as byte-identical release baselines. The Library text representation is not byte-proven identical to the original V0.12.3 manifest.

### Automated verification after patch 14

Against the reconstructed patch-14 runtime:

- `tests/QA_EXPLICIT_IMPROV_GUIDANCE_UX5A.js`: **20 PASS / 0 FAIL**
- `tests/QA_ENCOUNTER_PURPOSE_UX5A.js`: **4337 PASS / 0 FAIL**
- `tests/QA_AUTHORED_MYSTERIES_ONLY_UX5A.js`: **3075 PASS / 0 FAIL**
- `tests/QA_SINGLE_LOCATION_NAME_UX5A.js`: **19 PASS / 0 FAIL** under the old coverage
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2328 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5830 PASS / 0 FAIL**
- all 11 inline JavaScript blocks: **0 syntax errors**

Patch 14 specifically verifies:
- intentionally open ambient mysteries carry narrator improvisation prompts,
- `BOKA SOM SKRIVER TILBAKE` is an optional improvisation mystery, not a story gate,
- narrator view prominently says there is no hidden answer and no larger predetermined plan for the missing detail,
- narrator receives a concrete per-scene prompt for what to invent,
- guardrails prevent improvisation from creating a new mandatory story key or contradicting tracked state,
- the child-facing fiction remains an in-world mystery rather than showing implementation/meta text.

Patch 13 coverage remains active: purpose/stakes/resolution/payoff, authored-progress-only, real trap blocking/retreat/release, and no random ambient puzzle attachment.

### Patch 15 verification status

At this checkpoint:
- source inspection found the exact remaining zone-name leak,
- patch 15 is committed to the runtime branch,
- `QA_SINGLE_LOCATION_NAME_UX5A.js` has two new assertions covering `room.desc`,
- the updated QA file passes JavaScript syntax checking,
- full patch-15 reconstruction/regression has **not** been rerun yet,
- no patch-15 automated pass count is claimed,
- no fresh patch-15 browser-green claim is made.

Reason: the Project/Library search index exposes the current patch-14 source, but the available materialization path in this session returns an older backing representation rather than the exact indexed current candidate. Running browser/full-regression against that stale export would not certify patch 15.

### Browser evidence

Earlier Chromium evidence remains historical regression evidence only:
- broad pre-patch-11 UX5A: **23 / 0**,
- patch-10 focused smoke: **15 / 0**.

Fresh browser interaction QA for the current patch-15 candidate is still pending. Do not use an older Library materialization to certify the current candidate.

## Remaining gate

UX5A is **not merged to `main`**. Before merge:
1. reconstruct/apply patch 15 against the exact current candidate and rerun relevant automated regression,
2. physically retest the patch-15 build on iPad/mobile,
3. verify `BOKA SOM SKRIVER TILBAKE` clearly tells Forteller that the missing message is theirs to invent and not a hidden app plan,
4. verify the improvisation scope/guardrails are understandable without reducing child freedom,
5. verify `REGNBUENETTET` purpose/block/retreat/payoff semantics remain clear,
6. verify the room description now exposes only the room identity, not the internal zone name,
7. verify explicit key use, room search, backpack behavior, combat and Adventure Code,
8. run fresh browser interaction QA on the exact current candidate,
9. classify/fix any new findings before merge.

Narrative Graph runtime remains blocked until UX5A is physically green and merged. UX5B remains deferred until Narrative Graph V1 is proven.

Repository-health also remains open: the Library text representation is not byte-proven identical to the original V0.12.3 release manifest and the full runtime asset tree is not yet present as ordinary repo files.
