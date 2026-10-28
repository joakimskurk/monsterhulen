# Bordprototype V2

Status: **PROTOTYPE FOR PLAYTEST** (2026-10-28). Ikke den ekte appen.

En enkel Forteller-side som lar deg spille et løp fra V2-generatoren ved bordet med fysisk terning, *før* noe bygges inn i appen. Den bruker nøyaktig samme generator og gjennomspillingsautomat som `tools/runsim/`. Hvert løp den viser er derfor bevist løsbart.

## Start

```bash
npm run prototype
```

Åpne deretter <http://127.0.0.1:8765/prototype/> i nettleseren.

For å bruke den på iPad på samme nett: start med `python3 -m http.server 8765` (uten `--bind`) og åpne `http://<maskinens-ip>:8765/prototype/`.

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
- Én skjerm. Ingen barnevisning ennå (det er M4).
- Teksten på kortene er utkast fra `content/`.
