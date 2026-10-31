# Workshop: slutten av løpet og Helteboka (2026-10-28)

**Status:** SIMULERT WORKSHOP, som `2026-10-28_sammensatte_oppdrag.md`. Deltakerne er roller Claude har simulert, ikke ekte personer. Det eieren selv har sagt, er referert fra samtalen. Avgjørelsene er forslag til eieren og står i `DECISIONS.md`.

**Bakgrunn:** M5 i `ROADMAP.md` har denne exiten: *barnet vil spille et nytt løp, og Helteboka viser hva hun har gjort.* `SYSTEM_DESIGN_V2.md` §8 har et utkast (venner kan tas med, 12 varige TING, minner, opplåsing, ingen tallbonuser). Bordprototypen har i dag ingen slutt: når målet er nådd, står loggen der.

## Deltakere (simulert)

| Rolle | Ser etter |
|---|---|
| **Eier og forteller** | Variasjon hver gang. At det føles som en historie som fortsetter. At det fungerer ved bordet. |
| **Barnehagelærer** (5–7 år) | Avslutning, mestring, eierskap. Valg barnet faktisk kan ta. |
| **Spilldesigner** (roguelikes) | Progresjon som ikke ødelegger utfordringen. Lyst til «én gang til». |
| **Barnebokforfatter** | Oppsummeringen som en liten fortelling, ikke en tabell. |
| **Systemutvikler** | At hvert løp fortsatt er bevist løsbart. Hvor dataene bor. |

## Økt 1: Når er løpet ferdig, og hva skjer da?

**Barnehagelærer:** Femåringer trenger en tydelig slutt. Ikke bare at loggen stopper. «Du klarte det!», så en kort oppsummering de kan peke på: hvem de hjalp, hvem som ble med, hva de fant.

**Forfatter:** Skriv den som setninger: «Du hjalp Lavamonsteret med vann.» Ikke «Blokkerer løst: 3». Og aldri noe om at Forteller hjalp til. Hvis Forteller trykket GI LIKEVEL, så klarte barnet det likevel.

**Systemutvikler:** «Ferdig» betyr at målet er nådd. For REDD og LEVER betyr det også å være tilbake ved inngangen, slik automaten allerede krever.

> **Avgjørelse B1:** Løpet er ferdig når målet er nådd, og for REDD og LEVER når barnet også er tilbake ved inngangen. Da vises en oppsummering på begge skjermer: målet, hvem barnet hjalp, hvem som ble med, hva barnet fant og hvor mange rom det utforsket. Den skrives som korte setninger. Det står aldri noe om GI LIKEVEL.

## Økt 2: Hva tar barnet med seg?

**Spilldesigner:** Det klassiske i roguelikes er at noe blir igjen etter hvert løp. Her finnes det to ting som passer: vennene og de varige TINGene.

**Eier:** Venner som blir med, er det hun husker best.

**Barnehagelærer:** Da skal vennene havne i Helteboka av seg selv. Det skal ikke koste noe.

**Spilldesigner:** TINGene bør være et valg. Etter hvert løp får barnet velge én av to TING det ikke har. Valget er belønningen. To alternativer går fort, og barnet eier valget.

**Barnehagelærer:** To er riktig antall for femåringer. Tre eller flere blir lett vanskelig.

> **Avgjørelse B2:** Vennene som ble med i løpet, skrives automatisk inn i Helteboka.
>
> **Avgjørelse B3:** Etter hvert ferdige løp velger barnet én av to varige TING det ikke har fra før. Det finnes 12, så det tar minst 12 løp å samle alle.

## Økt 3: Ødelegger det utfordringen?

**Spilldesigner:** Det er her det kan gå galt. Har barnet Foldestigen i hvert løp, er alle «nå høyt»-behov løst før de begynner.

**Systemutvikler:** Og automaten vet ikke hva barnet har med seg. Det må den heller ikke vite. Løpet bevises fortsatt løsbart *uten* det som tas med. Det som tas med, blir bare en ekstra vei, som alternativene i dag.

**Spilldesigner:** Da må det begrenses: høyst én venn og én TING per løp. Barnet velger før løpet, som å pakke sekken. Det er et fint ritual, og det gjør valget viktig: «Tror du vi trenger stigen eller lommespeilet i dag?»

**Barnehagelærer:** Og hvis det man tok med passer, er det mestring: «Jeg tok med riktig ting!» Passer det ikke, går det likevel, for løpet kan alltid løses uten.

**Eier:** Kan jeg se hva det passer til?

**Systemutvikler:** Ja. Forteller-kortet viser «Passer også: Foldestigen (tatt med)» ved de behovene der merket stemmer.

> **Avgjørelse B4:** Før et løp kan barnet ta med høyst én venn og én TING fra Helteboka. Generatoren tar ikke hensyn til det, så løpet er fortsatt bevist løsbart uten. Det som tas med, er en ekstra vei. Forteller ser hvor det passer.

## Økt 4: Opplåsing

**Spilldesigner:** Opplåsing gir mål: nye soner, nye figurer, nye oppdragstyper.

**Eier:** Men jeg vil ha variasjon fra første løp.

**Barnehagelærer:** Og hun er fem. Hun bryr seg om vennene og tingene sine, ikke om at Klokketårnet er låst.

**Spilldesigner:** Greit. Da er samlingen progresjonen: venner, TING og minner. Opplåsing kan komme senere hvis det trengs.

> **Avgjørelse B5:** Ingen opplåsing nå. Progresjonen er det barnet samler. Tas opp igjen etter spilletest.

## Økt 5: Hvor bor Helteboka?

**Systemutvikler:** I prototypen bor den på Forteller-enheten, i nettleseren. I appen skal den bo sammen med økten (Firebase, `DECISIONS.md` 2026-10-27), så den ikke forsvinner om nettleseren tømmes. iPaden får se den, men eier den ikke.

**Eier:** Hva med søsken?

**Systemutvikler:** Én bok per barn er riktig på sikt. Prototypen har én bok. Det tas med som åpent spørsmål.

> **Avgjørelse B6:** I prototypen lagres Helteboka på Forteller-enheten. iPaden viser den, men endrer den aldri selv. Barnets valg av TING og hva som tas med, er forespørsler Forteller godtar, som alt annet.

## Ikke avgjort (tas med til eieren)

- Én Heltebok per barn (søsken)?
- Skal venner som er med i Helteboka, kunne dukke opp igjen i hulen som gjensyn?
- Skal tilbaketrekking (tom for mot) ha en egen knapp, eller er det Forteller som forteller det, som i dag?
