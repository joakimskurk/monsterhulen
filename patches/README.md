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

UX5A is deliberately split so engine/migration, narrator guidance, UI helpers and render/state handlers have independent failure boundaries. Patch 10 addressed the first device findings. Patch 11 preserves child agency at keyed gates. Patch 12 removes the confusing second visible location identity while preserving internal zone metadata.

### Historical patch-format note

Some earlier playtest patch files contain abbreviated `@@` separator hunks rather than a completely conventional unified-diff header on every block. Verified reconstruction therefore uses exact text/context application where necessary instead of assuming every historical patch can be fed blindly to GNU `patch`.

Patches 10-12 are normal unified diffs against the preceding verified reconstructed layer.

## UX5A patch hashes

SHA-256 of the plain UX5A patch files:

- engine: `49d7fb0ab1558caea18a3a2b4cb720efde21a79ba269bec33d82f684c7e3a48f`
- narrator: `bb86a8a1bd59fc3191058e38f022d2ecf1ba54cfac9a7b476c74964740c03ade`
- UI helpers: `87bccb1376d57621168416669287489857baeabf178f803411b5c680c410ee02`
- render/state: `fc28ab10cfae898c62e384fa4b32d1d6a19aece98b80bacf239607488674ecfa`
- device-findings hotfix: `1dd09c98a37234c418b60fd522808b28b23ce86f9054fc7d88b752d9deb55177`
- explicit story-key use: `276711322f02586f481214011a85a236476d22a524c98c7e96a82c9d1533decf`
- single visible location identity: `0cd1e2b43f9e1add7d53bf188ed9688ca0694be4d45b35dda941fb3c18ca7f58`

## UX5A runtime verification

The indexed Library playtest `index.html` can be materialized as text and the patch chain reconstructed behaviorally. The original release-byte provenance remains separate repository-health debt.

Pre-device-finding reconstructed UX5A runtime SHA-256:

`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

After patch 10, the previously recorded hotfixed reconstructed runtime SHA-256 was:

`fc1bf19ba8a95ccc25b7735a7da0cbc2f52187a37f0fdb357f043695377d72ca`

Fresh text reconstruction through patch 11 produced:

`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

Fresh text reconstruction through patch 12 produced:

`79bea4f4b608c34ac6189aec6fcadbcd09978814625e94dc74e3654a58d9cd42`

Do **not** treat these reconstruction hashes as byte-identical release baselines. The Library text representation is not byte-proven identical to the original V0.12.3 manifest.

### Automated verification after patch 12

Against the reconstructed patch-12 runtime:

- `tests/QA_SINGLE_LOCATION_NAME_UX5A.js`: **19 PASS / 0 FAIL**
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**
- all 11 inline JavaScript blocks: **0 syntax errors**

Patch 12 targeted QA verifies that room name is the single visible place identity while internal zone metadata remains available to deterministic generation.

### Browser evidence

Earlier Chromium evidence remains historical regression evidence only:
- broad pre-patch-11 UX5A: **23 / 0**,
- patch-10 focused smoke: **15 / 0**.

A fresh local Chromium attempt on the current build hit a browser/localStorage harness error before interaction QA could run. No browser-green claim is made for patches 11-12.

## Remaining gate

UX5A is **not merged to `main`**. Before merge:
1. physically retest patch-12 build on iPad/mobile,
2. verify one clear location name, explicit key use, puzzle narrator flow and remaining device smoke,
3. run fresh browser interaction QA when the harness is usable,
4. classify/fix any new findings before merge.

Narrative Graph runtime remains blocked until UX5A is physically green and merged. UX5B remains deferred until Narrative Graph V1 is proven.

Repository-health also remains open: the Library text representation is not byte-proven identical to the original V0.12.3 release manifest and the full runtime asset tree is not yet present as ordinary repo files.
