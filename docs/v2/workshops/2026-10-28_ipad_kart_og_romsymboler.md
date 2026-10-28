# Workshop: iPaden uten retningsknapper, med romsymboler og stor sekk (2026-10-28)

**Status:** SIMULERT WORKSHOP, som de andre i denne mappen. Deltakerne er roller Claude har simulert, ikke ekte personer. Avgjørelsene er forslag til eieren og står i `DECISIONS.md`. Der eieren selv har bestemt, er det avgjort på forhånd. Workshopen tar bare stilling til hvordan det skal gjøres.

**Bakgrunn:** Eieren har bestemt dette etter playtest:

- **E1:** «Vi trenger ikke nord sør øst vest, og SE DEG RUNDT kan byttes ut med forstørrelsesglass-knapp.»
- **E2:** «Vi må også ha indikatorer på at ett rom er utforsket eller ikke, om det er noen der (quest) osv. Det kommer grafikk for dette senere.»
- **E3:** «Når vi plukker opp noe kan item dukke opp ganske stort, og sekken er … en faktisk like stor sekk ved siden av, og ikke under. Når man slipper item over sekken, animeres det at den forsvinner ned bak sekken (og blir litt mindre underveis).»
- **Fra før:** iPaden er liggende, én skjerm uten scrolling, tekst først med plassholder-bilder. Alt som skal genereres, har en egen post i `content/assets.json`.

## Deltakere (simulert)

| Rolle | Ser etter |
|---|---|
| **Eier og forteller** | At barnet kan spille selv, og at kartet ligner originalen. |
| **Barnehagelærer** (5–7 år) | Hva en femåring forstår uten å lese, og store mål å treffe. |
| **Spilldesigner** | At symbolene hjelper uten å røpe løsninger. |
| **Systemutvikler** | At ingenting hemmelig sendes til iPaden, og at det tåler at grafikken kommer senere. |

## Økt 1: Gå uten retningsknapper (E1)

**Spilldesigner:** Kartet er allerede trykkbart. Naborom bak en åpen dør har blå ramme, og «?» står i tåka bak hver dør. Da blir kartet styringen, slik det var i originalen.

**Barnehagelærer:** Da må målene være store. En femåring treffer en flis på 30 piksler dårlig. Uten retningsknappene får kartet hele venstre halvdel og mer.

**Systemutvikler:** Et trykk hvor som helst i et naborom går dit, ikke bare på midten. «?» er hele flisa bak døra. Et rom hun ikke kan gå til, gjør ingenting. Det kommer ingen feilmelding.

**Eier:** Og lupa?

**Barnehagelærer:** En stor rund knapp med 🔍, alltid på samme sted, nede i høyre hjørne av rompanelet. Teksten «SE DEG RUNDT» står under i liten skrift, til den voksne og til barnet som leser.

> **Avgjørelse K1:** Retningsknappene fjernes. Hun går ved å trykke på rommet på kartet: hele rommet er trykkflaten, i tillegg til «?» i tåka. Kartet får mer plass. «SE DEG RUNDT» blir en stor rund lupe-knapp 🔍 med en liten tekst under.

## Økt 2: Symboler på rommene (E2)

**Spilldesigner:** Hva skal symbolene si? Det må være noe barnet allerede vet eller kan se, og aldri det hun ikke har funnet.

**Systemutvikler:** Da er regelen enkel. Symboler vises bare på rom hun har vært i. Ukjente rom er tåke med «?» eller 🔒 ved døra, som nå. Gjemte ting røpes aldri. Derfor viser lupe-symbolet om hun *har sett seg rundt* der, ikke om det *er noe* der.

**Barnehagelærer:** Bruk få symboler. Det viktigste er hvem som er der, for det husker barn. Vis figurens eget bilde på rommet, altså frosken der frosken er.

**Eier:** Og når rommet er ferdig?

**Spilldesigner:** En liten hake. Da ser hun hva som gjenstår.

Symbolene, i den rekkefølgen de vises (høyst to per rom):

| Symbol | Betyr | Når |
|---|---|---|
| Figurens bilde | Noen er her og trenger noe | En figur i rommet som ikke er ferdig |
| ✨ | Noe ligger her som du kan ta | En ting som ligger åpent og ikke er tatt |
| 🔍 | Du har ikke sett deg rundt her | Besøkt, men lupa er ikke brukt |
| ✓ | Ferdig | Besøkt, sett seg rundt, ingen figur eller ting igjen |
| ★ | Du er her | Som før |

**Systemutvikler:** Symbolene kommer fra spillervisningen og bygges fra det som allerede er synlig der. Leak-testen må vise at et rom med noe gjemt og et tomt rom ser likt ut før lupa er brukt.

> **Avgjørelse K2:** Rom hun har vært i, får høyst to symboler: figurens bilde (noen trenger noe), ✨ (noe å ta), 🔍 (ikke sett seg rundt) eller ✓ (ferdig). Ukjente rom er tåke som før. Symbolene røper aldri noe gjemt. Hvert symbol er en post i `content/assets.json` (`ui:room-*`), med emoji som plassholder til grafikken kommer.

## Økt 3: Funnet-popupen (E3)

**Barnehagelærer:** Tingen og sekken skal være like store og stå side om side. Da forstår hun «dra den bort dit» uten ord.

**Spilldesigner:** Når hun slipper, synker tingen ned bak sekken og blir mindre. Sekken hopper litt, og så lukkes popupen. Slipper hun utenfor, glir tingen tilbake.

**Systemutvikler:** Et trykk på sekken gjør det samme, for den som ikke drar. Sekken er et bilde (`ui:backpack`), med emoji som plassholder.

> **Avgjørelse K3:** Funnet-popupen viser tingen stor til venstre og en like stor sekk til høyre. Når tingen slippes over sekken, eller sekken trykkes, glir tingen ned bak sekken og krymper (0,6 s), sekken hopper, og popupen lukkes. Sluppet utenfor glir tingen tilbake.

## Etterpå

Alle tre er laget i `prototype/child.*`, `player-view.mjs` og `map-view.mjs`. Leak-testen dekker K2.
