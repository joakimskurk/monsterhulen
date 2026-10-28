# Bordprototype V2

Status: **PROTOTYPE FOR PLAYTEST** (2026-10-28). Ikke den ekte appen.

En enkel Forteller-side som lar deg spille et løp fra V2-generatoren ved bordet med fysisk terning, *før* noe bygges inn i appen. Den bruker nøyaktig samme generator og gjennomspillingsautomat som `tools/runsim/`. Hvert løp den viser er derfor bevist løsbart.

## Start

**Én skjerm** (bare Forteller):

```bash
npm run prototype
```

Åpne <http://127.0.0.1:8765/prototype/>.

**To skjermer** (Forteller + barnets iPad på samme Wi-Fi):

```bash
npm run prototype:lan
```

1. Åpne Forteller-siden på maskinen: <http://127.0.0.1:8765/prototype/>.
2. Øverst står **Barnets skjerm** med en kode (f.eks. `VJFF`) og en lenke. Åpne lenken i Safari på iPaden. Legg den gjerne til på Hjem-skjermen for fullskjerm.
3. Barnet trykker. Du får forespørselen i boksen **Fra iPaden** og godtar eller sier «Ikke ennå».

`prototype:lan` gjør prototypen synlig for andre enheter på hjemmenettet. Bruk den bare på et nett du stoler på.

### Hva barnet kan gjøre på iPaden
- trykke på et rom på kartet for å gå dit (hun ser bare rom hun har vært i og naborommene),
- **SE DEG RUNDT** (du ser om noe er gjemt og kaster terning ved behov),
- **TA** en ting som ligger synlig,
- **GI NOE** til en figur, eller **BE EN VENN HJELPE**.

Barnet ser aldri tegn, løsninger, gjemte ting eller Forteller-tekst. Det sjekkes automatisk av `npm run test:leak`. Trykk **Vis på iPad** ved et tegn for å vise det som en boble på skjermen hennes. Mens en forespørsel venter, er knappene hennes låst, så dobbeltrykk ikke gir dobbel effekt.

## Slik spiller du
1. Velg oppdrag og lengde. Koden (seed) bestemmer løpet. Samme kode gir samme løp, også på en annen enhet.
2. Trykk på et rom på kartet når barnet går dit. Grå rom ligger bak et hinder som ikke er løst.
3. Romkortet viser det du leser høyt, hva figuren vil, tegnet og hjelpestigen, og hvor den garanterte løsningen ligger.
4. Barnet foreslår. Kast terning bare når utfallet er usikkert. Trykk:
   - **Ta / Byttet / Ble med / Løst …** når det skjer i fortellingen,
   - **GI LIKEVEL** når du vil la henne lykkes uansett (logges som Forteller-valg).
5. Sekken, vennene og loggen oppdateres. Løpet lagres i nettleseren og kan fortsettes.
6. **Hele kjeden** nederst viser Forteller-malen: hele løsningen på én gang.

## Hva vi vil lære av en økt
Noter etter økten (gjerne i `docs/v2/PLAYTEST_V2.md`):
- Forsto barnet hva figurene ville ha, ut fra tegnene?
- Føltes kjedene som eventyr eller som henting?
- Hvor ofte trengte du hjelpestigen, og hvor ofte GI LIKEVEL?
- Brukte barnet venner eller ting på uventede måter?
- Hvor lang var økten, og hvor mange rom?

## Begrensninger
- Kartet er abstrakt (rom og streker), ikke appens grafikk.
- To skjermer går over hjemmenettet via en lokal relé i `tools/server.mjs`. Appen skal bruke et internett-relé (Firebase, se `DECISIONS.md`), men protokollen er den samme: filtrert spillervisning, forespørsler med unik ID, og Forteller godtar.
- Teksten på kortene er utkast fra `content/`.
