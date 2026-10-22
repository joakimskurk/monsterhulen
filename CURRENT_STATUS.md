# CURRENT STATUS

CURRENT PRODUCT: MONSTERHULEN
PREVIOUS WORKING NAME: HULER OG DRAGER
CURRENT RELEASE: V0.12.1
STATE VERSION: 12
STORAGE KEY: eventyrkryper_v100
CANONICAL APP: index.html
CANONICAL ART SPEC: ART_BIBLE.md V1.4
CANONICAL ASSET CONTRACT: ASSET_CONTRACT.md V2.4.0
CANONICAL CONTENT SPEC: CONTENT_BIBLE.md V1.9
CANONICAL PUZZLE SPEC: PUZZLE_SPEC.md V0.12.0
CANONICAL FIND SPEC: FIND_SPEC.md V0.12.1
CANONICAL ROADMAP: ROADMAP.md
GITHUB: joakimskurk/monsterhulen

## PRODUCT FRAME
**Monsterhulen**: Hver gang du går inn i hulen, er den litt annerledes. Hvert eventyr blir helt sitt eget.

GitHub-repoet `joakimskurk/monsterhulen` er fra 2026-10-22 prosjektets GitHub-hjem. Runtime-koden i V0.12.1 bruker fortsatt enkelte eldre interne navn/storage-identifikatorer; disse skal ikke endres uten en eksplisitt kompatibilitets-/rename-pass.

## V0.12.1 STATUS
V0.12.1 er Treasure + Secret Affordance Pass.

- Banken er fortsatt nøyaktig 14 funn: 8 vanlige skatter + 6 hemmelige funn.
- Alle 14 har stabil `entityId`, unikt navn og unik primær affordance-rolle.
- De seks hemmelige funnene har konkret fysisk intro + forteller-guide.
- Alle 14 kan oppdages av eksisterende item-hook-system når de faktisk passer en scene.
- Hvert hemmelig funn har minst to konkrete encounter-hooks.
- `GLASSKULE` og `RAVKULE` er eksplisitt differensiert: tung/rulling/linse vs lett/flyt/statisk elektrisitet.
- Sekkens entity-popup kan vise en kort generell bruksguide uten å legge løsningsliste på barnets romkort.
- Ingen av funnene er obligatoriske scenario-nøkler eller gir bonus/ekstra terning.
- State er fortsatt 12. Storage key er fortsatt `eventyrkryper_v100`.
- Asset Contract er fortsatt 2.4.0.
- 116/116 eksisterende assetfiler er byte-identiske med V0.12.0.

## NEXT
1. Varige ting - 12.
2. Resterende start-/fortellerutstyr + scenario-nøkler - 7.
3. Samledel-familier + evner - 15.
4. Feller + mysterier - 12.
5. Scenario-mål / samlingssteder / finale - 10.
6. Sluttkunst for pending character-batcher kan gå parallelt.
