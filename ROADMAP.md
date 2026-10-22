# MONSTERHULEN - ROADMAP

DATO: 2026-10-22
STATUS: KANONISK ETTER V0.12.1

## LÅSTE PRODUKTPRINSIPPER
- Barnet foreslår handlingen; appen skal ikke bli en meny over lovlige handlinger.
- Fysiske D6 brukes på bordet. Appen skal ikke rulle digitale terninger.
- Ingen kast når noe er lett/ufarlig og planen åpenbart virker.
- Usikkert utfall: fysisk 1D6.
- Relevant `EKSTRA GOD PÅ`: fysisk 2D6, bruk høyeste.
- Appen registrerer bare resultatbåndet: `1-2`, `3-4`, `5-6`.
- Registrering av kastet avslutter aldri scenen automatisk.
- Valg/gjetning/puzzle trenger ikke terning i seg selv; risikabel gjennomføring etterpå kan gjøre det.
- Ting, venner og kjæledyr åpner muligheter, men gir ikke ekstra terning.
- Puzzle skal være en del av eventyrverdenen, ikke en separat skolemodus.
- Skatter/funn er situasjonsverktøy og historieobjekter, aldri skjulte obligatoriske nøkler.

## RELEASE-LØP
### Ferdig
- V0.11.0 - Character System V2 / 10 aktive helter.
- V0.11.1 - start-item art Batch A.
- V0.11.2-V0.11.4 - monster content/art, 20 aktive familier / 40 varianter.
- V0.11.5 - 12 standard-NPC-er, encounter pass + resolver scaffolding.
- V0.11.6 - 6 ambient venner + 10 varige venner, encounter/persistence pass.
- V0.11.7 - 10 varige kjæledyr, signature/context pass.
- V0.11.8 - 5 redningsmål, target-specific clue/rescue/return pass.
- V0.11.9 - Physical Dice Result UX.
- V0.12.0 - Puzzle / Logic Content Layer: 36 maler, 9 kategorier, tre presentasjonsnivåer.
- V0.12.1 - Skatter + hemmelige funn, 14: 8 ambient skatter + 6 hemmelige funn, unike affordance-roller, konkrete item-hooks og inventory-popup-guide.
- 2026-10-22 - Produktnavn låst til **Monsterhulen** og GitHub-repo `joakimskurk/monsterhulen` etablert som prosjektets GitHub-hjem.

## NESTE
1. **Varige ting - 12**
   - audit mot de 14 midlertidige funnene og startutstyr,
   - tydelig permanent identitet uten å bli +1-system,
   - hver ting skal åpne en ny type fortellingsmulighet.
2. **Resterende start-/fortellerutstyr + scenario-nøkler - 7 gjenstående**
3. **Samledel-familier + evner - 15**
4. **Feller + mysterier - 12**
   - base-entityene skal fortsatt kunne bære puzzle-laget uten at puzzle-ID blir art-ID.
5. **Scenario-mål / samlingssteder / finale - 10**

## KUNSTSPOR
Sluttkunst for NPC-er, venner, kjæledyr og redningsmål er parallelt arbeid. Manglende kunst bruker resolver-fallback og skal aldri blokkere content/runtime-utvikling. V0.12.1 legger ikke til nye art-assets; de 14 find-entityene var allerede i resolveren.

## QA-SPOR
Full browser/mobile QA står fortsatt som egen gate når browsermiljøet er stabilt. Node/runtime-regresjoner kjøres for hvert content-pass.
