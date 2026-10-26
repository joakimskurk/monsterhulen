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

UX5A is deliberately split so engine/migration, narrator guidance, UI helpers and render/state handlers have independent failure boundaries. Patch 10 addressed the first device findings. Patch 11 preserves child agency at keyed gates. Patch 12 removes the confusing second visible location identity. Patch 13 removes the generic 3/4-box encounter-duration model and requires ambient encounters to have a concrete fictional purpose, solve condition and payoff.

### Historical patch-format note

Some earlier playtest patch files contain abbreviated `@@` separator hunks rather than a completely conventional unified-diff header on every block. Verified reconstruction therefore uses exact text/context application where necessary instead of assuming every historical patch can be fed blindly to GNU `patch`.

Patches 10-13 are normal unified diffs against the preceding verified reconstructed layer.

## UX5A patch hashes

SHA-256 of the plain UX5A patch files:

- engine: `49d7fb0ab1558caea18a3a2b4cb720efde21a79ba269bec33d82f684c7e3a48f`
- narrator: `bb86a8a1bd59fc3191058e38f022d2ecf1ba54cfac9a7b476c74964740c03ade`
- UI helpers: `87bccb1376d57621168416669287489857baeabf178f803411b5c680c410ee02`
- render/state: `fc28ab10cfae898c62e384fa4b32d1d6a19aece98b80bacf239607488674ecfa`
- device-findings hotfix: `1dd09c98a37234c418b60fd522808b28b23ce86f9054fc7d88b752d9deb55177`
- explicit story-key use: `276711322f02586f481214011a85a236476d22a524c98c7e96a82c9d1533decf`
- single visible location identity: `0cd1e2b43f9e1add7d53bf188ed9688ca0694be4d45b35dda941fb3c18ca7f58`
- encounter purpose contract: `74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

## UX5A runtime verification

The indexed Library playtest `index.html` can be materialized as text and the patch chain reconstructed behaviorally. The original release-byte provenance remains separate repository-health debt.

Historical behavioral reconstruction hashes:
- pre-device-finding UX5A: `289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`
- after patch 10: `fc1bf19ba8a95ccc25b7735a7da0cbc2f52187a37f0fdb357f043695377d72ca`
- through patch 11: `038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`
- through patch 12: `79bea4f4b608c34ac6189aec6fcadbcd09978814625e94dc74e3654a58d9cd42`
- through patch 13: `e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Do **not** treat these reconstruction hashes as byte-identical release baselines. The Library text representation is not byte-proven identical to the original V0.12.3 manifest.

### Automated verification after patch 13

Against the reconstructed patch-13 runtime:

- `tests/QA_ENCOUNTER_PURPOSE_UX5A.js`: **4337 PASS / 0 FAIL**
- `tests/QA_SINGLE_LOCATION_NAME_UX5A.js`: **19 PASS / 0 FAIL**
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2295 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5809 PASS / 0 FAIL**
- all 11 inline JavaScript blocks: **0 syntax errors**

The content-regression count is lower than patch 12 by design because ambient `MYSTISK` encounters no longer receive random unrelated puzzles; fewer generated-puzzle assertions therefore execute.

Patch 13 specifically verifies:
- every generated non-treasure encounter has `purpose`, `stakes`, `resolvedWhen` and `payoff`,
- a progress track may exist only when authored `progressStages` exist,
- the generic `ANNEN LØSNING` 3/4-box UI is gone,
- traps are real forward obstacles while active but allow retreat,
- resolving/removing the trap restores forward travel,
- `REGNBUENETTET` has an explicit obstacle/solve/payoff contract and no arbitrary progress boxes,
- ambient mystery puzzles are opt-in instead of automatically attached,
- the real `move()` implementation is executed in a three-room regression harness to verify block/retreat/release semantics.

### Browser evidence

Earlier Chromium evidence remains historical regression evidence only:
- broad pre-patch-11 UX5A: **23 / 0**,
- patch-10 focused smoke: **15 / 0**.

Fresh browser interaction QA for the current patch-13 candidate is still pending. The local Chromium harness previously hit a browser/localStorage error before current interaction QA could run. No browser-green claim is made for patches 11-13.

## Remaining gate

UX5A is **not merged to `main`**. Before merge:
1. physically retest the patch-13 build on iPad/mobile,
2. verify encounter-purpose clarity, especially `REGNBUENETTET` blocking forward travel, allowing retreat and opening the route after resolution,
3. verify one clear location name and explicit key use,
4. verify ambient mysteries no longer present disconnected random puzzles,
5. continue the remaining device smoke,
6. run fresh browser interaction QA when the harness is usable,
7. classify/fix any new findings before merge.

Narrative Graph runtime remains blocked until UX5A is physically green and merged. UX5B remains deferred until Narrative Graph V1 is proven.

Repository-health also remains open: the Library text representation is not byte-proven identical to the original V0.12.3 release manifest and the full runtime asset tree is not yet present as ordinary repo files.
