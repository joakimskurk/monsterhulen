# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-23
STATUS: V0.12.3 + REPOSITORY HEALTH BASELINE PÅGÅR

> `PROJECT_STATE.md` er nå den kanoniske korte handoff-filen. Denne filen beholdes som kompatibilitets-/oversiktsfil.

## BASELINE
- Produkt: Monsterhulen
- Release-baseline: V0.12.3 Lasting Thing Identity Pass
- State schema: 12
- Storage: `monsterhulen_v120`
- Første legacy key: `eventyrkryper_v100`
- Asset Contract: 2.4.0

## IMPLEMENTERT I V0.12.3-BASELINEN
- fysisk dice result UX
- 36 puzzles
- NPC/friend/pet/rescue-lag
- 14 treasure/secret finds
- 12 varige TING med unike affordances
- 13 start items, 8 narrator items og 5 scenario keys i innholdsbankene

## GITHUB REALITY
`joakimskurk/monsterhulen` er permanent source of truth, men repository-health-gaten er ikke lukket før den komplette V0.12.3 runtime/source-snapshoten er importert eller rekonstruerbar direkte fra repoet og `scripts/verify_repo.py` er verifisert mot repo-innholdet.

Repo-memory er etablert:
- `PROJECT_STATE.md`
- `ROADMAP.md`
- `DECISIONS.md`
- `TESTING.md`
- `ChatGPT_GitHub_Project_Workflow.md`

## VERIFISERING
Historisk V0.12.3 release evidence:
- Lasting thing: 67 / 0
- Treasure: 121 / 0
- Puzzle: 4665 / 0
- NPC: 4935 / 0
- Friend: 4104 / 0
- Pet: 6069 / 0
- Rescue: 5070 / 0
- 11 scriptblokker, 0 syntaksfeil

Full browser/mobile interaction QA ble ikke rerunnet for V0.12.3. Ingen fysisk-device-sertifisering er gjort.

## NESTE
1. lukk Repository Health Baseline,
2. deretter V0.12.4 med de 7 gjenstående start-/fortellerutstyr/scenario-key entityene.
