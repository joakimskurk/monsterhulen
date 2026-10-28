# Workshop: sammensatte oppdrag (2026-10-28)

**Status:** SIMULERT WORKSHOP. Eieren ba om at viktige avgjørelser drøftes som en workshop med nøkkelpersoner. Deltakerne under er roller Claude har simulert. Ingen av dem er ekte personer. Det eieren selv har sagt, er sitert eller referert fra samtalen. Alt annet er Claudes vurdering i deltakernes stemme. Avgjørelsene er forslag til eieren og står i `DECISIONS.md` merket 2026-10-28.

**Spørsmålet fra eieren:** Faste oppdragsnavn gjør at det kan føles repetitivt. Eieren ønsker variasjoner: glassnøkkel, gullnøkkel, beinnøkkel, forskjellige magiske gjenstander, eller en regle («tenk mellon fra LOTR»).

## Deltakere (simulert)

| Rolle | Ser etter |
|---|---|
| **Eier og forteller** (forelder, spiller med en 5-åring) | Variasjon, at forteller kan improvisere, at det fungerer ved bordet med to skjermer |
| **Barnehagelærer** (5–7 år) | Hva et barn forstår, husker og synes er gøy. Lese- og språknivå |
| **Spilldesigner** (roguelikes) | Variasjon som merkes, ikke bare ser annerledes ut. Rytme i et løp |
| **Barnebokforfatter** (norsk) | Navn, grammatikk, regler som rimer og er gode å si høyt |
| **Systemutvikler** | At alt fortsatt bevises løsbart, at koden er reproduserbar (samme kode = samme løp på begge skjermer) |

## Økt 1: Hva skal varieres?

**Eier:** Det er navnet vi møter først. Står det «Glassnøkkelen og krystallhjertet» tre ganger på rad, føles det likt, uansett hva som skjer inni.

**Spilldesigner:** Enig, men pass på at variasjonen ikke bare er kosmetisk. Bytter vi «glass» med «gull» og alt annet er likt, merker barnet det etter to runder. Variasjonen må også endre *hva man gjør*. En nøkkel er å finne én ting. En regle er å samle biter og si dem høyt. En melodi er å skaffe noe som lager lyd. Det er tre forskjellige opplevelser.

**Barnehagelærer:** Og regla er gull for denne alderen. Femåringer elsker å si noe høyt som virker, særlig hvis det rimer og de kan det utenat etterpå. Det er en mestringsopplevelse som ikke krever lesing: forteller leser linjen, barnet gjentar.

**Forfatter:** Da må reglene være ekte regler: korte linjer, tydelig rim, rytme som kan klappes. Og originale. Vi låner idéen fra «Speak, friend, and enter», men skriver våre egne.

**Systemutvikler:** Mekanisk er nøkkel og magisk gjenstand det samme: én bestemt ting som må fram til døra. Det har vi allerede. Regla er flere bestemte ting, som ingrediensene i en oppskrift. Også det har vi. Melodi er et merke (MUSIKK), som maskinens fester. Ingen ny type kjede trengs.

**Uenighet:** Spilldesigneren ville ha «gjør en handling» (bank tre ganger) som egen åpner. Barnehagelæreren mente det blir for tynt som *hovedport*, siden det løses på stedet uten å lete. **Avgjort:** handling brukes ikke som åpner for målet. Den kan komme senere som en del av en regle.

> **Avgjørelse A1:** FINN-oppdrag får fire slags åpnere med ulik spillopplevelse: **nøkkel** (finn én ting), **magisk gjenstand** (finn én ting som passer i en form i døra), **regle** (samle 2–3 linjer og si dem høyt), **element** (skaff noe med et bestemt merke, f.eks. musikk, lys eller varme).

## Økt 2: Ferdige oppdrag eller deler?

**Eier:** Jeg vil ikke ha skrevne eventyr så hardt. Det skal settes sammen.

**Spilldesigner:** Deler, med regler for hva som passer sammen. Hvert oppdrag blir: *type × mål × det som stenger × det som åpner × rute gjennom hulen*. Allerede med fem skatter, seks dører og fire åpnere med materialer får vi hundrevis av kombinasjoner, før kjeden inni i det hele tatt er generert.

**Forfatter:** Men ikke la koden bøye norsk. «Beinnøkkelen», «isporten», «gullkista»: bestemt form, kjønn og sammensetning blir feil hvis vi limer ord. Lagre hver form ferdig skrevet i dataene.

**Systemutvikler:** Og koden (seed) må bestemme temaet alene, ikke forsøksnummeret. Generatoren prøver flere ganger med `seed#0`, `seed#1` … til automaten godkjenner. Temaet må være likt i alle forsøk, ellers endrer tittelen seg når det første forsøket feiler. Temaet må også være likt på DM-skjermen og iPaden, så det avledes av koden.

**Eier:** De gamle eventyrene vil jeg gjerne beholde. Barnet kjenner dem.

**Spilldesigner:** Behold dem som «klassikere»: de fire fra V1 og «Ut på andre siden». De ti faste oppdragene vi la til tidligere i dag, bør bli deler i stedet. Ellers har vi to systemer for det samme.

> **Avgjørelse A2:** Oppdrag settes sammen av deler i `content/themes.json`. Hver form av hvert ord er skrevet ferdig (ubestemt, bestemt, genitiv der det trengs). Temaet avledes av oppdragstype og kode, ikke av forsøk eller lengde. Samme kode gir samme tema på alle enheter.
>
> **Avgjørelse A3:** De fem eksisterende oppdragene (de fire fra V1 og «Ut på andre siden») beholdes som klassikere med fast tema. De ti faste oppdragene fra tidligere i dag fjernes. Innholdet deres (spilledåse, stjernekart, drage, ugleunge, fontene, gruvetog, postsnegle, trollbamse, slottstrapp, båt) blir deler.

## Økt 3: Hva passer sammen?

**Forfatter:** En beinnøkkel hører hjemme i katakombene, en isnøkkel i krystallgrotten. Hvis materialet passer stedet, føles det som en verden, ikke en tilfeldighet.

**Spilldesigner:** Men ikke lås det helt. En gullnøkkel i soppskogen er også fint, det er en overraskelse. Vekting, ikke forbud.

**Systemutvikler:** Da trekkes ruten (sonene) først, så vektes materialet etter sonene i ruten. Døra bestemmer hvilke åpnere den tar: en kiste har ingen innskrift å lese en regle mot, så kister tar nøkkel og magisk gjenstand. Steindøra tar alt.

**Barnehagelærer:** Tegnet ved døra må fortelle barnet hva slags åpner det er. Nøkkelhull, en fordypning formet som en måne, innskrift med linjer som mangler, små hull som på en fløyte. Det er første trinn i hjelpestigen.

> **Avgjørelse A4:** Materialer har stedstilhørighet og vektes etter ruten (×3 når et sted i ruten passer). Hver dør lister hvilke åpnere den tar. Hver åpner har et eget tegn ved døra.

## Økt 4: Regla

**Forfatter:** Tre linjer, samme rim på alle tre, høyst åtte stavelser. Det er lett å huske, og siste linje sier alltid hva som skal skje («lukk deg opp»).

**Barnehagelærer:** På kort løp holder det med to biter å finne. Da kan første linje stå over døra, så barnet vet hva det leter etter.

**Spilldesigner:** På vanlig og stort løp: alle tre linjene må finnes. Bitene skal komme fra ulike kilder: én står risset i en vegg, én kan en figur, én får man som takk. Generatoren gjør det allerede når den velger kilder.

**Eier:** Hva om hun ikke husker regla ved døra?

**Barnehagelærer:** Da leser forteller den, og hun sier den etter. Det er ikke en hukommelsestest. Det er et ritual.

**Systemutvikler:** Linjene kan barnet se på iPaden når de er funnet. De er barnets egne funn, ikke hemmeligheter. Det som ikke må lekke, er linjer barnet *ikke* har funnet ennå. Lekkasjetesten dekker det, fordi en linje er en ting med et navn.

> **Avgjørelse A5:** En regle har tre rimende linjer. Kort løp: første linje står over døra, to må finnes. Vanlig og stort løp: alle tre må finnes. Hver linje er en egen bestemt ting, så den bevises og plasseres som nøkler og ingredienser. Ved døra sier barnet regla, eventuelt etter forteller.

## Økt 5: Ikke gjenta seg

**Eier:** Hvis «Overrask meg» gir Krystallhjertet to ganger på rad, er det like ille.

**Systemutvikler:** Forteller-enheten husker temaene i de siste løpene. «Overrask meg» og «Nytt løp» prøver nye koder til både mål og åpner er forskjellige fra de tre siste. Det endrer ikke reproduserbarheten: koden som til slutt velges, gir alltid samme løp.

> **Avgjørelse A6:** Forteller-enheten husker temaene i de siste løpene og unngår samme mål og samme åpner som de tre siste ved «Overrask meg» og «Nytt løp».

## Økt 6: De andre oppdragstypene

**Spilldesigner:** Samme prinsipp, men med deler som endrer noe i spillet:
- **Redd noen:** *hvem* bestemmer hva som roer den (en drage vil ha varme eller lys, en revunge mat eller latter).
- **Få noe i gang:** *maskinen* bestemmer hvilke merker festene kan be om.
- **Lever noe hjem:** *tingen* og *eieren* gir historien. Mekanikken er lik.
- **Kom deg ut:** *utgangen* gir målet et bilde (båt, trapp, ballong).

**Barnehagelærer:** Tegnet for «roe ned» bør være noe barnet ser: «den snuser sultent», ikke «den slapper av når den kjenner mat».

> **Avgjørelse A7:** Alle fem typene får deler. Hva som roer en figur, og hvilke merker en maskin tar, følger av delen som er trukket. Tegnet for å roe en figur skrives per merke som noe barnet kan se.

## Økt 7 (etter første bygging): Kister og tekst ved døra

Denne økten kom etter at de første sammensatte løpene var generert og spilt gjennom i prototypen.

**Spilldesigner:** «I gullkista ligger krystallhjertet», men i løpet var det kista som sperret veien inn til det innerste rommet. En kiste stenger ikke en gang. Det bryter bildet.

**Systemutvikler:** Vi kan la kista stå i målrommet med skatten i seg. Da blir den siste porten et vanlig hinder, og målet selv trenger åpneren. Automaten kan behandle målet som alt annet som trenger noe, så beviset står seg.

**Forfatter:** Og teksten på døra må handle om døra. «Et sted i hulen finnes gullnøkkelen» passer i introen, men ikke på kortet når barnet står med nøkkelen i hånda. På kortet: «Kista er låst.»

**Forfatter:** Reglene må heller ikke nevne «døra», «porten» eller «muren» når de kan sies ved en portal eller en glassdør. Gjør dem nøytrale.

> **Avgjørelse A8:** Kister (`prep: "i"`) står i målrommet og er selve målet; den siste porten blir et vanlig hinder. Teksten på dør- og kistekortet beskriver bare låsen. Reglene nevner ikke hva slags dør de åpner.

**Systemutvikler (funn under testen):** Når to Forteller-faner er åpne i samme nettleser, deler de øktkode. Den gamle fanen fjernet barnets trykk fordi den trodde de gjaldt noe som allerede var gjort i dens eget løp. Rettet slik: hver forespørsel bærer koden for løpet, og den nyeste fanen tar over barnets skjerm. Den eldre fanen sier ifra og slutter å sende.

## Økt 8: De andre oppdragstypene

Eieren ba om å utvide REDD, SAMLE, LEVER og KOM UT, som etter første runde hadde 6–28 titler mot 188 for FINN.

**Spilldesigner:** Samme regel som for FINN: flere navn alene hjelper lite. Hver type trenger deler som av og til krever noe annet av barnet. Akkurat nå er målet på disse typene enten «gå dit» (KOM UT, LEVER) eller «gi én ting» (REDD). Det er der variasjonen mangler.

**Systemutvikler:** Vi har allerede mekanikken. En kiste er et mål som trenger noe. Den samme ideen kan brukes på alle mål: utgangen, stedet tingen ligger, figuren som skal reddes. Et behov kan være et merke (lys, høyde, grave) eller en bestemt del (et tannhjul, en åre). Automaten beviser det som før.

**Barnehagelærer:** Da må det henge sammen med det barnet ser. Sitter ugleungen høyt oppe, trenger vi å nå høyt. Har kattungen krøpet inn i et rør, trenger vi å gripe langt. Barnet skjønner det fordi det er det samme det selv ville tenkt.

**Eier:** Kan vi gjøre det for mye? Hun er fem.

**Barnehagelærer:** Ja. Ikke alle deler skal ha et ekstra behov. Halvparten bør være «bare» det gamle: finn den, gi den noe godt, ta den med hjem. Variasjonen er at det *noen ganger* er mer.

**Spilldesigner:** For REDD: først løs figuren, så ro den. To steg i fast rekkefølge er lett å forklare: «Den sitter fast. Hva trenger vi for å få den løs?»

**Forfatter:** For SAMLE: en maskin som mangler en del, er en god historie. «Gruvetoget mangler det lille tannhjulet.» Det er noe annet å lete etter enn «noe med varme».

**Forfatter:** For KOM UT: ballongen er tom og trenger luft. Ønskebrønnen tar én mynt. Ørnen er sulten. Hver utgang får en grunn.

**Spilldesigner:** For LEVER: stedet tingen ligger på kan by på noe. Reiret er høyt oppe, skjæra holder fast på tingen og vil ha noe som glitrer, brønnen er dyp.

**Systemutvikler:** Et merke kan ikke trengs i sin egen kjede. For REDD betyr det at det som løser figuren, ikke kan være det samme som det som roer den. Det sjekker validatoren.

**Uenighet:** Spilldesigneren ville ha et ekstra behov på alle mål ved stort løp. Barnehagelæreren mente det gjør lengre løp tyngre, ikke bedre, og at lengden allerede gir flere hindre. **Avgjort:** behovet hører til delen, ikke til lengden. Hvis korte løp blir for tunge i automaten (flere forsøk enn i dag), tas spørsmålet opp igjen.

> **Avgjørelse A9:** Alle målene kan ha et behov som kommer fra delen som er trukket:
> - REDD: figurens problem kan kreve at den løses først (høyde, gripe, grave, lys, varme), deretter ro den.
> - SAMLE: maskinen kan mangle en bestemt del. Da trengs én del og to merker i stedet for tre merker.
> - LEVER: stedet kan kreve noe (lys, høyde, gripe, grave, noe som glitrer til skjæra).
> - KOM UT: utgangen kan kreve noe (luft, en mynt, mat, reparasjon, lys, glitter, en åre).
>
> Omtrent halvparten av delene har ikke noe slikt behov. Det som løser, kan aldri være det samme som det som roer.

**Etter bygging (målt, ikke simulert):**
- **Korte løp ble ikke for tunge.** Med et ekstra behov tar et kort løp i snitt 0,5–1,5 flere steg, og det lengste korte løpet er like langt som før (7–8 steg).
- **Andelen deler med ekstra behov ble for høy i første utkast** (64 % for LEVER, 78 % for KOM UT). Rettet til 45–60 % med flere deler uten behov.
- **Forteller må kunne godta ett behov om gangen.** Ellers kan Forteller bare velge mellom «Det virker!», som løser alt, og «Ikke ennå», som avviser noe som virket. Nå markeres hvert behov for seg, og iPaden viser «1 av 2 er på plass», men ikke hvilke som gjenstår.
- **Tegnene bruker en ferdig frase per merke** («venter på å bli reparert», ikke «venter på reparere»). Det følger av A2.

## Ikke avgjort (tas med til eieren)

- Om regla skal kunne brukes i andre oppdrag enn FINN, for eksempel som det som roer en figur.
- Om barnet skal få se hele regla på iPaden når den er samlet (en «reglebok» i Helteboka).
- Hvor mange linjer en regle har på stort løp for eldre barn.
- Regla kommer i omtrent hvert sjette sammensatte FINN-løp (bare noen dører tar regle). Skal den vektes opp?
- Titler etter økt 8: FINN 189, LEVER 35, REDD 22, KOM UT 22, SAMLE 20. Til gjengjeld har de andre typene fått deler som av og til krever noe nytt. Om flere navn trengs, avgjøres etter spilletest.
