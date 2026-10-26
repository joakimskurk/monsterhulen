# Playtest patches

Active patches are applied in order against the canonical V0.12.3 baseline.

## Compressed patches

The two larger historical patches are stored as gzip + base64 because the GitHub connector handles that representation more reliably:

- `v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
- `v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`

To reconstruct a normal unified diff on macOS/Linux:

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

Apply the standard unified diffs sequentially with a normal `patch` implementation. UX5A was deliberately split into four patches so engine/migration, narrator guidance, UI helpers, and render/state handlers have independent failure boundaries.

## UX5A candidate verification

The four UX5A patch files were applied sequentially in order to a realistic source reconstruction using GNU `patch`; there were **no rejected hunks**, and `git diff --check` passed on the resulting tree. This is structural patch verification only, not full runtime certification.

SHA-256 of the four plain UX5A patch files:

- engine: `39df432794054082b6e5c5cbfc713dab5810f4085c0ead72d9634bf990c6533e`
- narrator: `3018a00397b9ece7b379136d0a29a4da902457fd857e1b3f5dda6fbf12a228eb`
- UI helpers: `b9b2d5a89a01a5b133c8d5347d22740fa877c7ec21a33394fc636a40f913e6ec`
- render/state: `9b3e1ab495d3d6d00e54153daff7dc68e78188bb63b53928ab9f05b72ed15738`

Full UX5A runtime QA remains **PENDING** until the canonical V0.12.3 runtime can be reconstructed as raw files, patches 1–9 can be applied to it, and the complete Node QA suite can be executed. Do not merge UX5A to `main` before that gate is green.
