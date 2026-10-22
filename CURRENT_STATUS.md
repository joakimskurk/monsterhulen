# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-22
STATUS: V0.12.2 GITHUB BASELINE / PRODUCT RENAME PASS

## KANONISK PROSJEKT

GitHub-repo: `joakimskurk/monsterhulen`, branch `main`.

V0.12.2 bygger direkte på V0.12.1 Treasure + Secret Affordance Pass. Runtime-innhold, entity-ID-er, encounter-banker, puzzlebank, D6-regler og Asset Contract er uendret.

## PRODUKTNAVN

Synlig navn er nå **MONSTERHULEN**.

Tagline: **Hver gang du går inn i hulen, er den litt annerledes. Hvert eventyr blir helt sitt eget.**

## SAVE / KOMPATIBILITET

- State schema: 12
- Ny storage key: `monsterhulen_v120`
- Første legacy key: `eventyrkryper_v100`
- Eksisterende saves migreres ved load og skrives til ny key.
- Legacy key slettes ikke automatisk ved migrering.
- Full reset rydder både ny og gamle keys.

## QA V0.12.2

- Treasure runtime: PASS
- Puzzle runtime: PASS
- NPC runtime: PASS
- Friend runtime: PASS
- Pet runtime: PASS
- Rescue runtime: PASS
- 11 JavaScript-blokker: 0 syntaksfeil
- Runtime-assets i lokal releasebaseline: 116

## GITHUB-IMPORTSTATUS

Roadmap/status/migreringsdokumentasjon ligger på `main`. Den komplette runtimepakken er verifisert lokalt, men `index.html` og de 116 binære runtime-assets er ennå ikke bulk-importert til repoet. Repoet skal derfor ikke omtales som deploybart før denne importen faktisk er fullført.

## NESTE INNHOLDSSTEG

Audit og differensiering av de **12 varige TING-belønningene i Helteboka** mot startutstyr og de 14 midlertidige funnene.
