# MONSTERHULEN - ROADMAP

DATO: 2026-10-22
STATUS: KANONISK ETTER V0.12.2

## LÅSTE PRODUKTPRINSIPPER

- Monsterhulen er den samme mystiske hulen, men den er litt annerledes hver gang man går inn.
- Barnet foreslår handlingen; appen skal ikke bli en meny over lovlige handlinger.
- Fysiske D6 brukes på bordet. Appen ruller ikke digitale terninger.
- Ingen kast når noe er lett/ufarlig og planen åpenbart virker.
- Usikkert utfall: fysisk 1D6.
- Relevant `EKSTRA GOD PÅ`: fysisk 2D6, bruk høyeste.
- Appen registrerer bare `1-2`, `3-4`, `5-6`.
- Puzzle/gjetning krever ikke terning; bare eventuell usikker gjennomføring etterpå.
- Ting, venner og kjæledyr åpner muligheter, men gir ikke ekstra terning.
- Skatter/funn er situasjonsverktøy og historieobjekter, aldri skjulte obligatoriske nøkler.

## FERDIG

- V0.11.0 Character System V2 / 10 aktive helter
- V0.11.1 start-item art Batch A
- V0.11.2-V0.11.4 monster content/art, 20 familier / 40 varianter
- V0.11.5 12 standard-NPC-er
- V0.11.6 6 ambient venner + 10 varige venner
- V0.11.7 10 varige kjæledyr
- V0.11.8 5 redningsmål
- V0.11.9 Physical Dice Result UX
- V0.12.0 Puzzle / Logic Content Layer, 36 maler
- V0.12.1 Treasure + Secret Affordance Pass, 14 funn
- V0.12.2 Monsterhulen product rename + bakoverkompatibel storage-key migrering + lokal GitHub-baseline-QA

## REPO-GATE

Før repoet kalles deploybart må aktiv `index.html` og 116 runtime-assets være faktisk importert. Roadmap/status/migreringsspesifikasjon ligger allerede på `main`. Lokal V0.12.2 er den verifiserte runtimebaselinen frem til bulk-importen er fullført.

## NESTE INNHOLD

1. **12 varige TING-belønninger**
   - audit mot startutstyr og 14 midlertidige funn,
   - hver ting skal ha egen fortellingsaffordance,
   - ingen +1, ingen bonusdie, ingen obligatoriske nøkler.
2. **Resterende start-/fortellerutstyr + scenario-nøkler**
3. **Samledel-familier + EVNER**
4. **Feller + mysterier**
5. **Scenario-mål / samlingssteder / finale**

## KUNSTSPOR

Sluttkunst for NPC-er, venner, kjæledyr og redningsmål kan fortsette parallelt. Manglende kunst bruker resolver-fallback og skal ikke blokkere runtime/content.
