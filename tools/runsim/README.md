# runsim – prototype av V2-generatoren

Status: **DESIGNPROTOTYPE** (2026-10-28). Frittstående. Ikke koblet til `index.html`.

Prototypen beviser to ting før noe bygges inn i appen:
1. at *kjede først, soner, gjennomspilling* (`docs/v2/SYSTEM_DESIGN_V2.md` §4) gir løp der rekkefølgen alltid er riktig,
2. at innholdet i `content/` kombineres til løp som er *strukturelt* forskjellige.

## Kommandoer

```bash
npm run sim -- --mission GLASS_HEART --seed 12 --length VANLIG
```

Ett løp skrevet ut som Forteller-mal: kjeden per hinder, tegn, rom for rom og gjennomspillingen.

```bash
npm run sim:batch
```

1000 seeds for hvert oppdrag × lengde, med godkjenningsgrad, antall forskjellige kjedeformer og fordeling av kildetyper.

```bash
npm run sim:selftest
```

Saboterer godkjente løp og sjekker at automaten oppdager det.

## Filer

| Fil | Rolle |
|---|---|
| `map.mjs` | abstrakt kart: rom, ryggrad fra start til mål, hinderkanter (gates) som deler hulen i soner, greiner, løkker og en hemmelig dør innen samme sone |
| `generate.mjs` | kjedegenerator: velger hinder per gate, bygger avhengigheter baklengs, plasserer etter soner, legger til alternativer og frie møter |
| `playthrough.mjs` | gjennomspillingsautomat + snarvei-sjekk |
| `report.mjs` | Forteller-mal og kjedeform (`chainSignature`) |
| `cli.mjs` | kommandolinje, batch og selvtest |

## Regler generatoren følger

- Hvert hinder (blocker, lås, maskin) får ett **garantert** behov, med en kjede baklengs.
- **Kildetyper:** LIGGER, GJEMT, HANDEL, BELONNING, VENN, MILJO (med beholder/verktøy) og OPPSKRIFT. En type som allerede er brukt i løpet, får lavere vekt.
- Hver figur og hver ting brukes maks én gang som garantert løsning.
- En kilde plasseres i en sone ≤ sonen til det den hjelper. Hele kjeden ligger dermed foran hinderet øverst i kjeden.
- **Et merke kan aldri trengs inne i sin egen kjede.** «For å få vind trenger du vind» er forbudt. Selvtesten fant dette.
- Antall ledd begrenses av lengden (KORT 2, VANLIG 4, STORT 6).
- To ledd som henger direkte sammen, kan ikke ha samme kildetype (ingen handel betalt med handel).
- Alternativer og frie møter legges ut *etterpå* og brukes aldri av automaten.

## Hva automaten gjør

Den spiller som et fornuftig barn: går til alle rom den når, tar ting, finner gjemte ting (fail-forward garanterer dem), fyller beholdere, lager oppskrifter, gir figurer det de vil ha, får venner og åpner hindre. Den bruker aldri en ting som er tiltenkt noe annet, og to behov kan ikke dele samme ting. Løpet godkjennes bare hvis oppdraget fullføres. **Snarvei-sjekken** åpner alle hemmelige dører og løkker med hindrene lukket. Ingenting bortenfor sone 0 får da være nåbart.

## Resultater 2026-10-28

- **15 000 løp** (5 oppdrag × KORT/VANLIG/STORT × 1000 seeds): alle godkjent, gjennomsnittlig 1,0–2,4 forsøk per løp.
- **Selvtest:** 4 260 sabotasjer, 0 uoppdaget:
  - en garantert kilde flyttet bak hinderet kjeden er for,
  - en garantert kilde fjernet,
  - en hemmelig dør fra sone 0 inn i siste sone.

  Selvtesten saboterer bare kilder som er eneste vei, sjekket oppover hele kjeden. Mange kilder har reserve (en venn med samme evne), og løpet er da riktig nok fortsatt løsbart.
- **Variasjon** (antall forskjellige kjedeformer uten navn per 1000 løp): KORT 23–328, VANLIG 173–967, STORT 582–996. Vanligste form: under 9 % på VANLIG og STORT, men opptil 40 % på KORT (GLASS_HEART har bare låsen som hinder).

## Hva prototypen IKKE beviser

- At løpene er **morsomme** eller forståelige for et barn. Det krever spill ved bordet.
- At kortene og tegnene er gode. Teksten er utkast.
- Ekte kartgeometri, bilder og visning. Kartet her er abstrakt.
- Lagring, Adventure Code-format og to enheter.

## Funn som påvirker designet

1. **Returturer kommer gratis.** En kilde kan ligge dypere enn figuren den hjelper (men foran hinderet øverst i kjeden). Det gir naturlige «gå inn, hent, gå tilbake»-turer. Generatoren kan gjøre dette med vilje.
2. **Venner gir reserve.** En venn med en evne løser ofte mer enn den var plassert for. Det gjør løpene robuste og gir barnet frihet. Forteller-malen bør vise det.
3. **«Ligger åpent / gjemt» er 45–50 % av kildene.** Det er enkelt for små barn, men kan føles som mye henting. Det er mest strukturelt: hver kjede ender i en ting, og når budsjettet er brukt, er bare enkle kilder igjen. Vektene ble senket litt 2026-10-28 (LIGGER 2 → 1,6, GJEMT 1,5 → 1,2). Videre justering bør vente på spilletest.
4. **Oppskrifter brukes lite** (1–4 %), fordi det fantes bare tre. Med ni oppskrifter og vekt 1,6 er de 5–8 % (2026-10-28), og det er flere kjedeformer.
5. **Seks figurer ble aldri brukt som garantert løsning.** Årsakene var innholdsfeil (en evne ingen trengte, en figur som ville ha det den selv ga, blokkere uten bærbar løsning). Rettet 2026-10-28, se `docs/v2/CONTENT_MATRIX_V2.md` §7b. Nå brukes alle 66.
6. **Halvparten av behovene manglet tegn.** Bare svakheter og hinder hadde tegn; ønsker, handel, kilder og oppskrifter hadde ingen. Nå har alle et tegn, og validatoren krever det.
