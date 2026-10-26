# Playtest patches

Active patches are applied in order against the canonical V0.12.3 baseline.

Adventure Code V1 is stored as:

`v0.12.3_playtest_adventure_code_v1.patch.gz.b64`

To reconstruct the normal unified diff on macOS/Linux:

```bash
base64 -d v0.12.3_playtest_adventure_code_v1.patch.gz.b64 | gunzip > v0.12.3_playtest_adventure_code_v1.patch
```

Python, platform independent:

```python
from pathlib import Path
import base64, gzip
p = Path('patches/v0.12.3_playtest_adventure_code_v1.patch.gz.b64')
out = Path('patches/v0.12.3_playtest_adventure_code_v1.patch')
out.write_bytes(gzip.decompress(base64.b64decode(p.read_bytes())))
```

The compressed representation exists only because the GitHub connector handles it more reliably. It is still a byte-reconstructable standard unified diff.
