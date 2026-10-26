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

UX5A is deliberately split into four primary implementation patches so engine/migration, narrator guidance, UI helpers, and render/state handlers have independent failure boundaries. Patch 10 addressed the first physical device findings. Patch 11 is a follow-up interaction correction from continued physical review: a locked key door must present a problem before the app applies the solution.

### Historical patch-format note

Some earlier playtest patch files contain abbreviated `@@` separator hunks rather than a completely conventional unified-diff header on every block. Verified reconstruction therefore uses exact text/context application where necessary instead of assuming every historical patch can be fed blindly to GNU `patch`.

Patches 10 and 11 are normal unified diffs against the preceding verified reconstructed layer.

## UX5A patch hashes

SHA-256 of the plain UX5A patch files:

- engine: `49d7fb0ab1558caea18a3a2b4cb720efde21a79ba269bec33d82f684c7e3a48f`
- narrator: `bb86a8a1bd59fc3191058e38f022d2ecf1ba54cfac9a7b476c74964740c03ade`
- UI helpers: `87bccb1376d57621168416669287489857baeabf178f803411b5c680c410ee02`
- render/state: `fc28ab10cfae898c62e384fa4b32d1d6a19aece98b80bacf239607488674ecfa`
- device-findings hotfix: `1dd09c98a37234c418b60fd522808b28b23ce86f9054fc7d88b752d9deb55177`
- explicit story-key use: `276711322f02586f481214011a85a236476d22a524c98c7e96a82c9d1533decf`

## UX5A runtime verification

The indexed Library playtest `index.html` can be materialized as text and the patch chain reconstructed behaviorally. The original release-byte provenance remains separate repository-health debt.

Pre-device-finding reconstructed UX5A runtime SHA-256:

`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

After patch 10, the previously recorded hotfixed reconstructed runtime SHA-256 was:

`fc1bf19ba8a95ccc25b7735a7da0cbc2f52187a37f0fdb357f043695377d72ca`

A fresh text reconstruction through patch 11 in the current work session produced SHA-256:

`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

Do **not** treat that last hash as a byte-identical release baseline. The Library text representation is not byte-proven identical to the original V0.12.3 manifest; it is a behavioral reconstruction artifact.

### Automated verification after patch 11

Against the reconstructed patch-11 runtime:

- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**
- all 11 inline JavaScript blocks: **0 syntax errors**

Patch 11 targeted QA verifies:
- tapping a keyed locked door does not unlock, traverse or consume the key,
- the child receives only the locked-door state,
- the scenario key remains protected but exposes an explicit `BRUK` action,
- `BRUK` opens only an adjacent matching story-key gate,
- successful key use removes the key with explicit fiction and does not traverse,
- the narrator may optionally hint `KANSKJE DU HAR NOE I SEKKEN?` without naming the solution.

### Browser evidence

The earlier focused Chromium smoke for patch 10 was **15 PASS / 0 FAIL**, but its key-door expectation is now superseded by patch 11. A new real-browser interaction smoke for the explicit-key flow is therefore still required. Do not count the old 15/0 as browser proof of patch 11.

## Remaining gate

UX5A is **not merged to `main`**. Before merge:
1. browser-test patch 11 when a real browser harness is available,
2. physically retest the explicit key-door flow and puzzle narrator flow on iPad/mobile,
3. continue the rest of the UX5A device smoke,
4. classify any new findings before merge.

Narrative Graph runtime remains blocked until UX5A is physically green and merged. UX5B remains deferred until Narrative Graph V1 is proven.

Repository-health also remains open: the Library text representation is not byte-proven identical to the original V0.12.3 release manifest and the full runtime asset tree is not yet present as ordinary repo files.
