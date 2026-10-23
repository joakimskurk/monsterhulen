# MONSTERHULEN - TESTING

## Verification levels
Never conflate these states:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested

## Current V0.12.3 release evidence
The completed V0.12.3 release reported:
- Lasting thing: 67 PASS / 0 FAIL
- Treasure: 121 / 0
- Puzzle: 4665 / 0
- NPC: 4935 / 0
- Friend: 4104 / 0
- Pet: 6069 / 0
- Rescue: 5070 / 0
- 11 JavaScript blocks, 0 syntax errors

This is historical release evidence. It is not a claim that the current GitHub `main` can rerun all those tests yet, because the full runtime/test snapshot is still being repaired into the repository.

## Repository verification
For the repaired baseline, the repository must verify at minimum:
- required project-memory files exist,
- canonical runtime/source files are present or reconstructable from the repository alone,
- `monsterhulen_v120` and `eventyrkryper_v100` migration markers are preserved,
- inline JavaScript syntax passes when Node is available,
- runtime asset archive/content hashes match the canonical manifest,
- current bank counts remain 13 start items, 8 narrator items and 5 scenario keys.

## Browser/mobile status
V0.12.3 browser/mobile interaction QA was **not rerun**. Do not describe V0.12.3 as browser-certified or physical-device-certified until that testing actually happens.

## V0.12.4 acceptance gate
For each of the seven pending item/key entities:
- stable resolver ID/path unchanged,
- large is exactly 64x64 RGBA,
- thumbnail is exactly 32x32 RGBA,
- transparent background,
- alpha only 0/255,
- no embedded text/UI frame,
- recognizable silhouette at thumbnail size,
- no gameplay/schema change,
- repository verification passes,
- Asset Manifest / Project State / Roadmap / Changelog are synchronized.
