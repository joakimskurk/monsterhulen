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

UX5A is deliberately split into four patches so engine/migration, narrator guidance, UI helpers, and render/state handlers have independent failure boundaries.

### Historical patch-format note

Some earlier playtest patch files contain abbreviated `@@` separator hunks rather than a completely conventional unified-diff header on every block. The current verified reconstruction therefore used exact text/context application where necessary instead of assuming every historical patch can be fed blindly to GNU `patch`.

The four UX5A split patches were also previously structurally verified against a realistic reconstruction with no rejected changes and `git diff --check` clean.

## UX5A patch hashes

SHA-256 of the four plain UX5A patch files:

- engine: `49d7fb0ab1558caea18a3a2b4cb720efde21a79ba269bec33d82f684c7e3a48f`
- narrator: `bb86a8a1bd59fc3191058e38f022d2ecf1ba54cfac9a7b476c74964740c03ade`
- UI helpers: `87bccb1376d57621168416669287489857baeabf178f803411b5c680c410ee02`
- render/state: `fc28ab10cfae898c62e384fa4b32d1d6a19aece98b80bacf239607488674ecfa`

## UX5A runtime verification - GREEN

The indexed Library playtest `index.html` was materialized as text. It already contained patch layers 1-2. Patches 3-9 were then reconstructed from the repo and applied in order.

Reconstructed UX5A runtime SHA-256:

`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

Automated verification against that runtime:

- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**
- 11 inline JavaScript blocks: **0 syntax errors**
- Chromium UX5A interaction smoke: **23 PASS / 0 FAIL**

The Chromium smoke covers generic room investigation, hidden-find non-spoiling, repeated-low fail-forward, full-backpack preservation, exact physical-die recording, dice/state separation, progress resolution, direct smart-solution resolution, 3-heart normal monsters, 4-heart `SPENNING` combat and zero-heart combat resolution.

## Remaining gate

UX5A is automated/runtime/browser verified, but it is **not merged to `main` yet**. Physical iPad/mobile playtest remains required to judge touch ergonomics, whether `SE DEG RUNDT` feels exploratory rather than mandatory, and whether 3-4 encounter steps feel satisfying rather than like bookkeeping.

Repository-health also remains open: the Library text representation is not byte-proven identical to the original V0.12.3 release manifest and the full runtime asset tree is not yet present as ordinary repo files. This provenance issue must be closed before the next release checkpoint is called locked.
