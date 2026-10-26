# Playtest patches

Active patches are applied in order against the canonical V0.12.3 baseline.

Current compressed patches:

- `v0.12.3_playtest_adventure_code_v1.patch.gz.b64`
- `v0.12.3_playtest_progression_gates_secret_doors.patch.gz.b64`
- `v0.12.3_playtest_search_progress_ux5a.patch.gz.b64` **(candidate; runtime QA pending)**

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

The compressed representation exists only because the GitHub connector handles it more reliably. Each file is still a byte-reconstructable standard unified diff.

Patch order currently is:

1. `v0.12.3_playtest_map_navigation.patch`
2. `v0.12.3_playtest_dm_free_roll_inventory.patch`
3. `v0.12.3_playtest_dm_guide_dice_faces.patch`
4. reconstructed `v0.12.3_playtest_adventure_code_v1.patch`
5. reconstructed `v0.12.3_playtest_progression_gates_secret_doors.patch`
6. reconstructed `v0.12.3_playtest_search_progress_ux5a.patch`

UX5A patch verification:
- uncompressed SHA-256: `454c0d2f9114ea1029717b3a283fe8729a481b3721c287bf1207d86b7f02ae8f`
- encoded `.gz.b64` SHA-256: `a93972a2a99b2a37e6c52ded68160892cb585a8d798a520341452712ebd64e81`
- byte round-trip through gzip/base64: PASS
- full runtime application/regression: PENDING until the canonical runtime baseline is available in the repo or otherwise raw-materializable.
