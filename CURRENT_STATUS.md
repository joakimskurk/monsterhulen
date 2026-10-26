# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-26
STATUS: V0.12.3 + UX5A CANDIDATE + REPOSITORY HEALTH ÅPEN

> `PROJECT_STATE.md` er den kanoniske korte handoff-filen. Denne filen beholdes som kompatibilitets-/oversiktsfil.

## BASELINE
- Produkt: Monsterhulen
- Release-baseline: V0.12.3 Lasting Thing Identity Pass
- State schema: 12
- Storage: `monsterhulen_v120`
- Asset Contract: 2.4.0
- Siste fullt runtime-verifiserte UX-lag: UX4
- Aktiv kandidat: UX5A Searchable Rooms + Encounter State

## UX5A KANDIDAT
- alle rom kan undersøkes uten å avsløre loot på forhånd,
- standard 13-roms eventyr får to kuraterte valgfrie skjulte funn,
- fysisk D6 brukes ved usikkert søk,
- 1-2 gir fail-forward-hint; 3-6 avslører funn,
- full sekk sletter aldri funnet,
- nye monster: 3 hjerter, `SPENNING` 4,
- andre genererte encounters: 3 fremgangssteg, `SPENNING` 4,
- terningresultat auto-løser aldri encounter,
- eksplisitt `+ FREMGANG` eller `LØST MED GOD IDÉ` styrer ikke-kamp-løsning.

Patch/QA er skrevet og statisk/isolert verifisert. Full runtime-QA er fortsatt pending.

## GITHUB REALITY
`joakimskurk/monsterhulen` er permanent source of truth, men repository-health-gaten er ikke lukket før den komplette runtime/source/assets-snapshoten kan rekonstrueres direkte fra repoet.

En komplett UX4 HTML/ZIP finnes i prosjekt-Library, men kan ikke raw-materialiseres via tilgjengelig connector i denne kjøringen. Derfor må repoet fortsatt bære eksplisitt at UX5A runtime-QA ikke er utført.

## VERIFISERING
Siste fullt utførte regresjon er UX4:
- Lasting thing: 67 / 0
- Treasure: 121 / 0
- Puzzle: 4665 / 0
- NPC: 4935 / 0
- Friend: 4104 / 0
- Pet: 6069 / 0
- Rescue: 5070 / 0
- Adventure Code: 405 / 0
- UX4 progression/secret-door: 1797 / 0
- 11 scriptblokker, 0 syntaksfeil

UX5A:
- QA JS syntax: PASS
- isolated algorithm test: PASS
- patch gzip/base64 round-trip: PASS
- full runtime QA: PENDING

## NESTE
1. rekonstruer/apply patch chain 1-6 mot kanonisk V0.12.3,
2. kjør UX5A + full regresjon,
3. smoke-test på iPad,
4. først deretter start UX5B kartbevisst løsningsgraf,
5. lukk Repository Health før neste release checkpoint.
