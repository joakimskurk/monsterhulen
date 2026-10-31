# Workshop: heltevalg på iPaden (2026-10-31)

**Status:** SIMULERT WORKSHOP, som de andre i denne mappen. Deltakerne er roller Claude har simulert, ikke ekte personer. Avgjørelsene er forslag til eieren og står i `DECISIONS.md`.

**Bakgrunn:** Eieren: «Ja, vi skal ha heltevalg – det har vært i siden hele tiden.» Originalen (V0.12.3, `docs/reference/original-v0.12.3/`) har `HulerCharacterSystem`: helten har et navn, et utseende (ti å velge mellom: menneske, panda, liten drage, mus, ugle, slange, katt, skogsalv, heks og trollmann), én egenskap helten er «ekstra god på» (STERK, SMIDIG, SKARP, OPPFINNSOM, GOD MED ANDRE, MODIG eller MAGISK) og én startting. Egenskapen virker slik: passer den til det barnet prøver, kaster hun to terninger og bruker den høyeste. Starttingen gir ingen ekstra terning. Konseptbildene (`docs/v2/concept/`) viser de ti heltene i helfigur, og et banner med åtte portretter (heks, trollmann, alv, fe, dverg, katteridder, muserøver, liten drake). Eieren: navn og utseende stemmer ikke sikkert helt, men det er en god pekepinn.

V2 har i dag ingen helt: stjerna på kartet er plassholder for spilleren, og Helteboka har venner, TING og minner, men ingen eier.

## Deltakere (simulert)

| Rolle | Ser etter |
|---|---|
| **Eier og forteller** | At helten fra originalen kommer tilbake, og at valget er barnets. |
| **Barnehagelærer** (5–7 år) | Et valg hun kan ta selv, uten å lese. Eierskap: «det er meg». |
| **Spilldesigner** | At helten betyr noe i spillet uten å ødelegge at hvert løp er bevist løsbart. |
| **Systemutvikler** | Hvor helten bor, hvem som får endre den, og at det testes. |

## Økt 1: Hva er en helt i V2?

**Spilldesigner:** Tre deler i originalen: utseende, egenskap, startting. Utseendet er det viktigste for et barn. Egenskapen er en fin regel for Forteller. Starttingen overlapper med det V2 allerede har: før løpet pakker hun én venn og én TING fra Helteboka, og alt hun tar med er en ekstra vei, aldri noe løpet trenger.

**Barnehagelærer:** Hun velger med bilder. Ti figurer på én skjerm går fint når de er store. Egenskapene må også være bilder, med en kort setning hun kjenner igjen: «Jeg er sterk», «Jeg er modig», «Jeg kan magi». Den voksne leser.

**Eier:** Og navnet?

**Barnehagelærer:** Hun kan ikke skrive. Hun sier navnet, og den voksne skriver det. Uten navn heter helten det figuren heter: «Panda».

> **Avgjørelse H1:** Helten er **utseende + én egenskap + navn**. Barnet velger utseende og egenskap på iPaden, med bilder. Navnet skriver Forteller på sin side (valgfritt; uten navn heter helten det figuren heter). Ingen startting: pakkingen før løpet dekker det.

## Økt 2: Hva gjør egenskapen?

**Spilldesigner:** Som i originalen: når Forteller ber om et terningkast og det barnet prøver passer egenskapen, kaster hun to terninger og bruker den høyeste. Det er Fortellers avgjørelse ved bordet, ikke noe appen regner på.

**Systemutvikler:** Da rører det ikke generatoren, og hvert løp er bevist løsbart som før. Terningkortet hos Forteller får én linje: «Helten er ekstra god på MODIG: passer det, kast to terninger og bruk den høyeste.» iPaden viser bare at hun skal kaste, som nå.

**Eier:** Skal egenskapen bli et merke, slik `SYSTEM_DESIGN_V2.md` spør om (MODIG = MOT)?

**Spilldesigner:** Ikke nå. Da blir helten en nøkkel som løser figurer, og det må inn i matrisen og automaten. Først se om to-terninger-regelen er nok ved bordet.

> **Avgjørelse H2:** Egenskapen er en regel for Forteller: passer den, to terninger og den høyeste teller. Den vises på terningkortet hos Forteller. Den er ikke et merke og rører ikke generatoren. Tas opp igjen etter spilletest.

## Økt 3: Hvor bor helten, og hvor vises den?

**Systemutvikler:** Helten bor i Helteboka, som vennene og TINGene (`prototype/herobook.mjs`). Én helt per bok. Boka bor hos Forteller, og iPaden endrer den aldri selv (B6). Men valget av helt er barnets, som BRING og PICK_TING: Forteller-siden godtar det av seg selv og viser det i loggen. Forteller kan bytte helt på fanen Helteboka; da spør iPaden igjen. Vennene og TINGene beholdes.

**Barnehagelærer:** Hun må se helten sin hele tiden. Øverst på iPaden, med bilde og navn. På kartet er det helten som går, ikke en stjerne. Og på slutten: «DU KLARTE DET, LUNA!»

**Spilldesigner:** Og første gang iPaden kobler seg til, før pakkingen: «HVEM ER DU?»

> **Avgjørelse H3:** Helten bor i Helteboka (`book.hero`), én per bok. Valget sendes fra iPaden som HERO og godtas av Forteller-siden av seg selv. Forteller kan gi navn og bytte helt på fanen Helteboka. Helten vises øverst på iPaden (bilde og navn; trykk viser egenskapen), som spillerens merke på kartet, i sluttskjermen og hos Forteller.

## Økt 4: Innholdet

**Systemutvikler:** `content/heroes.json`: heltene og egenskapene. De ti fra originalen kan velges. De fem fra banneret som originalen ikke lot en velge (alv, fe, dverg, katteridder, muserøver) ligger i filen med `selectable: false`, så eieren kan slå dem på. Hver helt og hver egenskap får en post i `assets.json` (`hero:*` som portrett, `trait:*` som pixel-ikon), med emoji som plassholder.

> **Avgjørelse H4:** `content/heroes.json` med 15 helter (10 valgbare) og 7 egenskaper. Hver har en post i `content/assets.json`. Heltens bilde brukes både på kortet, øverst på iPaden og som merke på kartet.

## Etter workshopen

Laget i `herobook.mjs`, `player-view.mjs`, `app.mjs`, `child.*` og innholdet. `tests/v2/herobook.test.mjs` dekker helten i boka. `npm run check` er grønn.
