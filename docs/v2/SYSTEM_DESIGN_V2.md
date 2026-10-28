# Monsterhulen V2 – systemdesign

Status: **KANONISK RETNING – DESIGN, IKKE IMPLEMENTERT**
Dato: 2026-10-27
Erstatter retningen i `narrative/story-graph-v1-prep` (Narrative Graph V1). Se `DECISIONS.md` 2026-10-27.

Bakgrunn og analyse som førte hit ligger i `docs/reviews/2026-10-27_*`.

---

## 0. Visjon

> **En barnevennlig roguelike for Forteller og barn. Hulen settes sammen på nytt hver gang av figurer, ting, venner og steder som passer sammen. Eventyret går alltid an å fullføre, og Forteller kan alltid improvisere.**

Et løp tar 15–45 minutter. Barnet utforsker, møter figurer som vil noe, finner, kjøper eller lager det som trengs, og kommer hjem med nye venner og ting i Helteboka.

Variasjonen kommer fra **kombinasjoner av gode byggeklosser**, ikke fra skrevne historier og ikke fra tilfeldighet.

---

## 1. Prinsipper

**Beholdes fra V1 (bevist i playtest):**
1. Fysisk terning. Appen ruller aldri. Terning bare ved usikkert utfall.
2. Barnet foreslår handlingen. Appen viser muligheter, aldri en lukket fasitliste.
3. Å ha noe er ikke det samme som å bruke det. Nøkkelen sitter ikke i døra før barnet setter den der.
4. Fail-forward. Et dårlig kast gir et nytt spor eller en pris, aldri en blindvei.
5. Ett synlig navn per rom.
6. Ting og venner gir muligheter, ikke tallbonuser.
7. Lagring og stabile ID-er brytes ikke.

**Nye i V2:**

8. **Alt henger sammen gjennom merker.** Figurer vil ha merker, er svake mot merker og gir merker. Ting har merker. Steder gir merker. Ingen kobling skrives som et par.
9. **Hvert løp er bevist løsbart.** Generatoren lager avhengighetskjeden først, plasserer etter soner og spiller gjennom løpet automatisk før det godtas.
10. **Forteller bestemmer alltid, og appen registrerer hva som ble sant.** LØS og GI LIKEVEL virker på alt. Improvisasjon bestemmer *hvordan*, appen husker *hva*.
11. **Én garantert vei, mange mulige.** Generatoren garanterer én løsning. Alt annet med riktig merke virker også, og det samme gjør barnets egne idéer.
12. **To skjermer.** Forteller-enheten eier spillet. Barnets iPad viser bare det barnet skal se.

---

## 2. Løpet

```
OPPDRAG  →  HULEN  →  ROM FOR ROM  →  MÅLET  →  HJEM  →  HELTEBOKA
(kort)      (kart med    (figur / hinder /    (oppdragets     (tilbake    (venner, ting,
            soner og     ting / kilde /        avslutning)     til start   minner, nye
            hindre)      tomt)                                  eller ut)   soner låses opp)
```

**Oppdragskort** (mål for løpet) er en liten bunke som utvides over tid:

| Oppdrag | Hva som kreves for å fullføre |
|---|---|
| FINN | en bestemt ting dypt inne |
| REDD | en figur som sitter fast. Den følger deg hjem |
| LEVER | ta noe fra A til B (ofte en figur som ønsker seg noe) |
| SAMLE | 3 ting med ulike merker til en maskin eller gryte |
| KOM UT | finn veien gjennom til den andre utgangen |

Dagens fire eventyr (GLASS_HEART, WITCH_CAT, CRYSTAL_MACHINE, ZOMBIE_DELIVERY) blir oppdragskort med fast tema. Premiss og tekst beholdes. Hver type har nå tre tema (15 oppdrag, `content/missions.json`). Et nytt tema er bare data; kjeden bygges uansett fra matrisen.

**Lengde:** KORT (5–7 rom, kjede 1–2 ledd), VANLIG (9–13 rom, 2–3 ledd), STORT (15–17 rom, 3–4 ledd). Kjedens dybde styres også av barnets alder.

**Tap:** Man taper aldri helt. Går helten tom for hjerter eller mot, trekker hun seg tilbake og tar med det hun har funnet. Løpet kan fortsettes eller avsluttes.

---

## 3. Matrisen

Matrisen er ikke en tabell over hva som passer med hva. Den er **et felles språk** som hvert kort bruker for å beskrive seg selv. Kobling skjer når et merke ett sted passer med det samme merket et annet sted.

Nytt innhold blir dermed lineært arbeid. Et nytt monster med svakhet VANN virker straks med alle vannkilder, bøtter og vannvenner som finnes.

### 3.1 Merker (vokabular, utkast ≈ 26)

| Familie | Merker |
|---|---|
| Elementer | **VANN**, **ILD**, **KULDE**, **LUFT**, **JORD** |
| Sanser | **LYS**, **MØRKE**, **MUSIKK**, **STILLHET**, **DUFT** |
| Omsorg | **MAT**, **VARME**, **MYK**, **SØVN** |
| Verdi | **GLITTER**, **MYNT**, **HISTORIE** (ting med en fortelling) |
| Verktøy | **BEHOLDER**, **TAU/HØYDE**, **GRIPE**, **GRAVE**, **REPARASJON**, **METALL** |
| Sosialt | **LATTER**, **ROS**, **MOT** |

Merkene er *ting barn forstår*: vann slukker ild, lys skremmer mørke, mat gjør sultne glade. Vokabularet skal holdes lite. Nytt merke legges bare til når flere kort trenger det.

### 3.2 Korttyper

| Kort | Hva det er | Viktigste felt |
|---|---|---|
| **FIGUR** | alle vesener: monstre, folk, venner, kjæledyr (én felles bank) | holdning, tilstand, *vil ha*, *svakhet*, *gir*, *evne* (hvis venn), kan sperre / selge / sloss |
| **HINDER** | feller og miljø (nett, lava, tåke, stinkgass) | tilstand, *løses av*, tegn |
| **TING** | alt man kan bære | merker, brukes opp?, kan fylles?, pris |
| **KILDE** | noe i et rom som gir et merke (brønn, bekk, ildsted, blomstereng, vindsprekk) | gir merke, krever (ofte BEHOLDER) |
| **OPPSKRIFT** | A + B → C | to inn-merker/ting, ett ut |
| **OPPDRAG** | målet for løpet | krav, premiss, tekst |

**Én felles figurbank** (endring fra V1, der MONSTER / PERSON / VENN var egne typer): Holdning (**vennlig / nøytral / fiendtlig**) er et felt, ikke en kategori. Samme figur kan være selger i ett løp og hinder i et annet. Det er V1-ideen «subject ≠ role» i enkel form.

### 3.3 Tre måter en figur eller et hinder kan trenge noe

| Kobling | Betydning | Eksempel | Hva skjer |
|---|---|---|---|
| **VIL HA** (sosialt) | figuren blir fornøyd hvis den *får* noe | trollet vil ha GLITTER | gaven overføres, figuren endrer holdning |
| **SVAKHET** (fysisk) | noe *virker på* figuren eller hinderet | lavamonsteret: VANN, KULDE | tilstand endres (lava → stein), kamp kan vinnes |
| **NØKKEL** (bestemt) | bare én bestemt ting virker | glassdøra: GLASSNØKKELEN | sjeldent; brukes for oppdragets hovedlås |

Hver av disse har et **tegn**: en setning som lar barnet *ane* løsningen. For eksempel: «Lavamonsteret freser og krymper når det drypper fra taket.» Tegnet er det første trinnet i hjelpestigen og grunnlaget for at barnet kan finne løsningen selv.

### 3.4 Syv måter å skaffe et merke på (kildetypene er spillvariasjonen)

| Kildetype | Spilles som | Eksempel for VANN |
|---|---|---|
| **LIGGER** | gå og ta | en vannflaske i et rom |
| **GJEMT** | lete (søk, terning, fail-forward) | en lekk vannsekk bak en stein |
| **HANDEL** | kjøpe eller bytte hos en figur | Revehandleren selger bøtte for GLITTER |
| **BELØNNING** | gjøre noe for en figur, få noe tilbake (ny kjede) | Goblinkokken gir vann når gryta er reddet |
| **VENN-EVNE** | få en venn som kan gjøre det, flere ganger | Vannsprutfrosken blir med hvis den får MAT |
| **MILJØ + BEHOLDER** | hente med noe | brønn i et rom + bøtte = VANN |
| **OPPSKRIFT** | kombinere | snøball + varme = vann (sjeldent) |

**Når kildetype gir ekte variasjon:** Den må endre *hva barnet gjør* (lete, handle, hjelpe, få en venn, fylle) eller *hvor hun må gå* (her, et annet sted, frem og tilbake). To kjeder med samme kildetype og samme rekkevidde er samme oppdrag. Generatoren skal unngå det (se 3.8).

### 3.5 Eksempel: Lavamonsteret

**Kort:**
```
FIGUR  Lavamonsteret
  holdning:  fiendtlig (ikke ondt: det er for varmt til å la noen komme nær)
  tilstand:  GLØDENDE
  sperrer:   ja (står i en gang)
  kamp:      ja – men uten svakhet kan det ikke vinnes
  svakhet:   VANN → blir til en stein du kan gå over  (tegn: «det freser når det drypper»)
             KULDE → stivner og blir sakte           (tegn: «det krymper ved den kalde veggen»)
  vil ha:    –  (eventuelt VARME til ungen sin: alternativ vennlig vei)
  gir:       vei videre; varm stein (ILD/VARME-ting) når det er avkjølt
```

**Tre forskjellige løp fra samme kort:**

| Løp | Garantert kjede (generert) | Spillet blir |
|---|---|---|
| A | **VENN-EVNE:** Vannsprutfrosken sitter i en annen grein → vil ha MAT → honningkjeks ligger åpent i sone 0 | finne mat, få en venn, venn sprayer monsteret |
| B | **MILJØ + BEHOLDER:** brønn i rom 4 + bøtte hos Revehandleren → vil bytte GLITTER → glassperle gjemt (søk) | lete, handle, hente vann, bære det tilbake |
| C | **KULDE, LIGGER bak hinder:** iskrystall i Isgrotten bak Regnbuenettet | komme forbi nett, ta, bruke |

**Kampen:** Barnet kan velge å sloss. Uten VANN eller KULDE går kampen *fail-forward*: «Det er for varmt! Du må trekke deg tilbake, men du ser at monsteret freser der det drypper fra taket.» Kampen ble dermed et *spor*, ikke et tap. Med en svakhet kan kampen vinnes: én sprut gjør monsteret til stein.

**Forteller-kortet viser:**
> **Lavamonsteret** sperrer gangen. **Svakhet:** VANN, KULDE.
> **Garantert:** bøtte hos Revehandleren (rom 6, vil ha GLITTER) + brønn (rom 4).
> **Også i hulen:** Vannsprutfrosken (rom 9, vil ha MAT).
> **Hint:** 1) det drypper og freser · 2) «Hva slukker ild?» · 3) LØS / GI LIKEVEL.

### 3.6 Eksempel: Prompemonsteret

```
FIGUR  Prompemonsteret
  holdning:  nøytral (det skammer seg)
  tilstand:  STINKER – fyller rommet med gass, rommet videre kan ikke passeres
  svakhet:   DUFT → gassen blir god lukt          (tegn: «blomstene i hjørnet visner ikke»)
             LUFT → gassen blåser bort             (tegn: «det trekker fra en sprekk»)
  vil ha:    MAT uten bønner (vennlig vei: det blir lettet og takknemlig)
  gir:       rommet blir trygt; blir kanskje venn (evne: LATTER)
```

Mulige kjeder:
- **OPPSKRIFT:** tom flaske + duftblomst → duftspray.
- **HANDEL:** spray hos Goblinkokken, som vil ha hjelp med gryta.
- **VENN-EVNE:** Bobleprømperen blåser LUFT.
- **MILJØ:** åpne en vindsprekk med GRAVE (foldespaden).

### 3.7 Kamp i matrisen

- Figurer med `kamp: ja` kan sloss hvis barnet vil. Hjertene beholdes (3, eller 4 ved SPENNING).
- **Svakhet gjør kamp vinnbar.** Uten svakhet kan figurer merket «for sterk» ikke slås. Kampen gir da et tegn og fail-forward.
- **Figurer som *vil* sloss** har ønsket **KAMP**. Det kan også oppfylles av en **konkurranse**: kappløp, bryting, stirrekonkurranse, gåter. Barnet velger kamp eller lek.
- **Kamp ender aldri med død.** Den ender med at figuren gir seg, flykter, blir stein, blir venn eller sovner.

### 3.8 Variasjonsregler (hele regelsettet)

1. **Ulike kildetyper i samme kjede.** Ikke HANDEL → HANDEL → HANDEL.
2. **Samme figur maks én gang per løp. Samme ting som løsning maks én gang.**
3. **Kjededybde etter alder og lengde** (1–4 ledd).
4. **Hvert hinder i kjeden har et tegn.** Ingen løsning uten at barnet kan ane den.
5. **Maks én oppskrift per kjede** for 5–7 år (oppskrifter er vanskeligst å forstå).
6. **Et merke kan ikke trengs inne i sin egen kjede** (funnet av prototypen).

Unntak skrives som korte par-regler, bare når de trengs:
- **forbud:** «ikke mat spøkelser»,
- **spesialreaksjon:** «Prompemonsteret + Rød fjær → det ler seg ferdig».

---

## 4. Generering og rekkefølge

Dette er kjernen i V2. Problemet i V1 var at ting ble plassert uten å vite hva de avhenger av. Derfor kunne en figur havne bak døra den skulle åpne.

### 4.1 Pipeline

```
1. Trekk oppdrag + lengde + sonerute (soner har kilde-utvalg: Tåkesumpen har vann, Heksetårnet urter …)
2. Lag KJEDEN baklengs fra målet:
     mål krever X → velg hvordan X skaffes (kildetype) → hvis kilden krever Y → fortsett
     (dybde og variasjonsregler fra §3.8)
3. Lag kart-kandidat og finn hinderkanter (cut-edges) → del i SONER 0..N
4. Plasser etter regelen: alt som trengs for å åpne sone N ligger i sone < N.
     Hent-mål legges helst i en annen grein enn giveren (gir en tur).
5. Fyll butikker: selgerens lager = det kjeden trenger + 2 tilfeldige ting.
6. Legg ut 0–2 ALTERNATIVE kilder for hvert hinder (myke veier), og ambient-figurer og ting.
7. GJENNOMSPILLING (automat) – godkjenn eller forkast og prøv nytt seed.
8. SNARVEI-SJEKK: alle hemmelige dører og snarveier åpne + hindre lukket → målet skal IKKE nås.
9. Lagre: seed + versjon = Adventure Code (samme løp på en annen enhet).
```

### 4.2 Gjennomspillingsautomaten

```
tilstand: rom nådd = sone 0 fra start, sekk = tom, venner = ingen
gjenta til ingenting endrer seg:
  ta alle LIGGER-ting i nådde rom
  GJEMT-ting regnes som funnet (fail-forward garanterer det)
  fyll BEHOLDER ved nådde KILDER
  lag OPPSKRIFTER du har ingredienser til
  for hver figur i nådde rom:
     vil ha / bytte / svakhet oppfylt av sekk eller venn-evne → anvend
     (trekk ting fra sekken hvis de brukes opp; venn-evner brukes ikke opp)
     → figuren gir / flytter seg / blir venn / åpner kant
  åpne kanter → nye rom nådd
GODKJENT  ⇔  oppdraget er fullført
```

Automaten bruker **bare garanterte kilder**: ingen alternative, ingen ambient, ingen DM-overstyring, ingen flaks. Derfor er løpet alltid mulig uten at Forteller må redde det, og alt annet gjør det bare lettere.

Den samme automaten kjøres i testene over minst 1000 seeds per oppdragstype. Dette er V2s viktigste test. Den erstatter de fleste strukturtestene fra V1.

### 4.2b Prototype og funn (2026-10-28)

Prototypen ligger i `tools/runsim/` (se README der). Den har gitt fire endringer i designet:

1. **Plasseringsregelen er «foran hinderet øverst i kjeden»,** ikke «foran figuren den hjelper». En kilde kan ligge dypere enn figuren den hjelper og gir da en naturlig returtur.
2. **Et merke kan ikke trengs i sin egen kjede** («for å få vind trenger du vind»). Ny variasjonsregel 6.
3. **Venners evner gir reserve.** De løser ofte mer enn det de var plassert for. Forteller-malen bør vise det.
4. **Selvtesten må sabotere bare eneste kilde, sjekket oppover hele kjeden.** Ellers rapporterer den falske feil.

### 4.3 Hva automaten fanger

- figur eller ting bak hinderet den skal åpne,
- ting som trengs to ganger, men brukes opp,
- bytte som tar fra deg noe du trenger senere,
- kjeder i ring,
- rom som ikke kan nås,
- hemmelig dør eller snarvei som omgår et hinder (snarvei-sjekken).

---

## 5. Forteller

### 5.1 Forteller-kortet (malen)

For hvert rom og hver figur viser Forteller-enheten:
1. **Hva er det:** navn, holdning, hva den vil eller hva den er svak mot.
2. **Tegnet:** det barnet kan legge merke til.
3. **Garantert løsning:** hvor den ligger i kartet (rom og kjede).
4. **Andre ting som virker:** alternativer i hulen + alt med riktig merke.
5. **Hjelpestige:** tegn → tydelig hint → LØS / GI LIKEVEL.

I tillegg en **løpsoversikt**: hele kjeden som en liten liste, så Forteller kan fortelle sammenhengen («trollet vil ha noe som glitrer – revehandleren har en perle»).

### 5.2 Overstyring (alltid tilgjengelig)

| Knapp | Effekt |
|---|---|
| **LØS** | figur eller hinder løses. Forteller velger utfall (vennlig, flytter seg, blir stein …) |
| **GI LIKEVEL** | barnet får tingen eller merket det trenger, med en improvisert grunn |
| **KORT NED** | fjern et ledd i kjeden eller et krav fra oppdraget |
| **LEGG TIL** | ny figur, ting eller kilde i rommet (som i dag) |
| **ANGRE** | siste handling (krever typed actions, §7) |

Alt registreres som vanlige handlinger. State er alltid sann.

---

## 6. To enheter

Besluttet 2026-10-27. Se `DECISIONS.md`.

| Barnets iPad (fullskjerm nettleser) | Forteller-enheten |
|---|---|
| kart: trykk for å gå | alt barnet ser + Forteller-kort og løpsoversikt |
| rom: bilde, navn, én setning | terning (Forteller taster inn barnets fysiske kast) |
| SE DEG RUNDT, TA | LØS, GI LIKEVEL, KORT NED, LEGG TIL, ANGRE |
| sekk: velg ting → GI / BRUK på figur, slot eller kilde | kamp: start, hjerter |
| venner: be om hjelp (evne) | |
| aldri Forteller-tekst, fasit eller kjede | |

**Teknikk:**
- Forteller-enheten har autoritativ state.
- iPaden sender *forespørsler* med unik `actionId`. Forteller-enheten validerer, anvender og publiserer *filtrert* spillervisning.
- **Relé:** Firebase Realtime Database (`sessions/{kode}/player`, `…/requests`, `…/meta`), anonym innlogging, tilgang bare til egen øktkode, økter slettes etter 24 t.
- **Paring:** kort kode eller QR.
- **Uten nett:** Forteller-enheten fortsetter alene.
- **Alternativ:** Supabase Realtime.

---

## 7. Runtime-arkitektur

```
STATE
  run:      oppdrag, seed, versjon, sone-status
  map:      rom (features/kilder), kanter (åpen/lukket/skjult), soner
  figures:  id, rom, holdning, tilstand, oppfylt?, følger?
  items:    i rom / i sekk / i figur / i slot
  hero:     hjerter/mot, egenskap, sekk (6 plasser)
  facts:    hva barnet vet (tegn sett, butikker kjent)
  log:      handlinger (for angre og Helteboka)

ACTIONS (typed, validert, én vei inn)
  MOVE · SEARCH · TAKE · GIVE(item→figur) · USE(item→hinder/slot/kilde) · FILL · COMBINE
  ASK_COMPANION · START_COMBAT · HIT · RECORD_DIE · CHOOSE
  DM: RESOLVE(outcome) · GRANT · SHORTEN · ADD · UNDO

EFFECTS (6 typer)
  REVEAL · OPEN/CLOSE kant · TRANSFER ting · DISPOSITION figur · MOVE figur · RESOLVE
```

`apply(state, action) → {state, effects}` er den eneste måten state endres på. Alt annet bygger på den: UI, to enheter, angre og gjennomspillingsautomaten (som bruker samme `apply`). I dag muterer click-handlere state direkte. Dette er derfor den første store refaktoreringen.

**Lagring:** state 12 / `monsterhulen_v120` beholdes og migreres. V2-løp får nytt schema-felt `runVersion`. Gamle lagrede V1-eventyr kan spilles ferdig eller avsluttes.

---

## 8. Helteboka og progresjon mellom løp

- **Venner** som ble med i et løp kan tas med i neste (maks 1–2 per løp), med evnene sine.
- **Varige TING** (de 12) tjenes inn og gir nye merker til rådighet.
- **Minner:** hva barnet gjorde. Brukes i gjensyn og i «hva du gjorde i dag»-oppsummeringen.
- **Nye soner, figurer og oppdragskort** låses opp etter hvert. Variasjonen vokser med erfaringen.
- Ingen tallbonuser (prinsipp 6).

---

## 9. Fra V1 til V2

| V1 | V2 |
|---|---|
| 4 blueprints med fast struktur (FOUND_ALL) | oppdragskort + genererte kjeder |
| Narrative Graph, faser, storylet-roller | kjede + soner + gjennomspilling |
| Storylet Matrix (~70 felt, regler A–L, 13 scoringskriterier) | merker + kort (~10 felt) + 5 variasjonsregler |
| 8 provider-familier | 7 kildetyper som *er* spillvariasjonen |
| MONSTER / PERSON / VENN som typer | én figurbank med holdning |
| ambient uten konsekvens (type-boilerplate) | alt kan inngå som alternative veier |
| «kritisk state kan ikke avhenge av improvisasjon» | Forteller kan alltid løse; appen registrerer |
| én enhet | Forteller + barnets iPad |
| patch-kjede over ukjent baseline | vanlige commits på kilde i repo |
| tellende strukturtester | gjennomspillingsautomat over 1000+ seeds + oppførselstester |

**Beholdes uendret:** fysisk terning, søk med fail-forward, hemmelige dører, feller som sperrer med retrett, eksplisitt nøkkelbruk, én stedsidentitet, Adventure Code, Helteboka, lagringsmigrering, figurtekstene og gjennomgangene i `narrative/story-graph-v1-prep`. Gjennomgangene er råmaterialet til kortene.

---

## 10. Åpne spørsmål

1. **Ønsker fra den opprinnelige ChatGPT-samtalen:** Mange ønsker ligger bare i ChatGPT-minnet. De må hentes inn i repoet (lim inn eller eksporter), så de kan vurderes mot dette designet.
2. **Helter:** Hvor mange heltetyper finnes i `HulerCharacterSystem` i dag, og skal egenskapene deres bli merker (for eksempel MODIG = MOT)?
3. **Kjæledyr:** egen korttype, eller venner med en fast plass i Helteboka?
4. **Mynter:** egen valuta (MYNT) eller bare bytte? Designet støtter begge. Anbefaling: bytte først, mynter som en ting blant andre.
5. **Flere ønsker per figur:** anbefalt ja (vil ha MAT *eller* MUSIKK).
6. **Selgere med oppdrag først:** anbefalt «av og til», styrt av generatoren.

---

## 11. Milepæler

Se `ROADMAP.md`. Kort: kilde i repo → lukk UX5A → runtime-kjerne → generator V2 med matrise og gjennomspilling → to enheter → løp og Helteboka → mer innhold.
