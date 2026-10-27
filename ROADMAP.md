# MONSTERHULEN - ROADMAP

DATO: 2026-10-27
STATUS: **V2-RETNING BESLUTTET (systemisk roguelike for barn) · UX5A PATCH 15 MASKIN/BROWSER GRØNN, FYSISK GATE ÅPEN · RUNTIME-KILDE IKKE I REPO · VISUAL PARKERT**

Kanonisk design: `docs/v2/SYSTEM_DESIGN_V2.md`. Innhold: `docs/v2/CONTENT_MATRIX_V2.md`. Beslutninger: `DECISIONS.md` (2026-10-27).

## LÅSTE PRODUKTPRINSIPPER
- Fysisk terning. Appen ruller aldri. Terning bare ved usikkerhet.
- Barnet foreslår. Appen viser muligheter, ikke fasit.
- Å ha noe er ikke å bruke det.
- Fail-forward.
- Ett synlig navn per rom.
- Ting og venner er muligheter, ikke tallbonuser.
- Alt kobles gjennom merker (vil ha / svakhet / gir).
- Hvert løp er bevist løsbart ved automatisk gjennomspilling.
- Forteller kan alltid løse. Appen registrerer hva som ble sant.
- To enheter: Forteller-enhet + barnets iPad.
- Stabile ID-er og lagringskompatibilitet.
- GitHub er permanent source of truth, inkludert runtime-kilden.

## MILEPÆLER
Hver milepæl har en **spillbar exit**: noe som kan spilles og vurderes ved bordet, ikke bare grønne tester. Arbeidet innenfor en milepæl deles i små pakker.

### M0 - Kjørbart repo
- `index.html` + runtime-assets inn som vanlige filer. Hash verifisert mot patch-15-kandidat `f8e9998f…`.
- GitHub Pages: spillbar URL.
- Én kommando kjører alle tester fra repoet.
- Én statusfil (`PROJECT_STATE.md`). Andre statusfiler peker dit.
- **Exit:** hvem som helst kan åpne appen fra repoet og kjøre testene.

### M1 - Lukk UX5A
- **G-tech** (voksen, ca. 15 min): lagring/reload, Adventure Code kopier/lim inn, touch.
- **G-play** (én familieøkt): de 14 punktene i `docs/UX5A_GATE_REVIEW_2026-10-27.md`, sortert i *blokkerer* og *noteres*.
- Sjekk først kjent mistanke: story-nøkkel ved full sekk (`addQuestItem` avviser ved 6 ting, dør krever BRUK fra sekken). Se `docs/reviews/2026-10-27_claude_repo_audit.md` F3.
- Merge til `main`.
- **Exit:** UX5A merget, `main` er kanonisk runtime.

### M2 - Runtime-kjerne
- Én state + `apply(state, action)` + seks effekttyper for alle eksisterende handlinger, med uendret oppførsel.
- Gjennomspillingstester (skriptede løp) erstatter strengsøk-testene.
- DM-overstyring: LØS, GI LIKEVEL, ANGRE.
- **Exit:** dagens spill oppfører seg som før, og angre virker.

### M3 - Generator V2: matrise + kjede + gjennomspilling
- Kortformat (figur, hinder, ting, kilde, oppskrift, oppdrag) + vokabular.
- Eksisterende innhold konvertert (utkast i `CONTENT_MATRIX_V2.md`).
- Kjedegenerator baklengs fra mål, soner, plassering, butikklager.
- Gjennomspillingsautomat + snarvei-sjekk over ≥1000 seeds per oppdragstype.
- Forteller-kort og løpsoversikt fra kjeden.
- Minimum nytt innhold for svakheter og kilder (vann, lys, musikk, beholdere).
- **Exit:** 5 løp spilt ved bordet uten rekkefølgefeil og uten at Forteller måtte reparere logikk.

### M4 - To enheter
- Spillervisning (iPad fullskjerm) + Forteller som vert + relé (Firebase Realtime Database).
- Filtrert spiller-payload, `actionId`, gjenoppkobling, enhet alene uten nett.
- **Exit:** en hel økt spilt med Forteller-enhet + iPad.

### M5 - Løp og Helteboka
- Oppdragskort (FINN, REDD, LEVER, SAMLE, KOM UT; dagens 4 eventyr som temakort).
- Tilbaketrekking i stedet for tap, venner som blir med, oppsummering etter løpet, opplåsing.
- **Exit:** barnet vil spille et nytt løp, og Helteboka viser hva hun har gjort.

### M6 - Mer innhold
- Ting (mål +25–30), figurer med svakhet, vennlige figurer med evner, figurer som vil konkurrere, kjæledyr.
- Hver ny kortbatch spilles før neste.

## IKKE NÅ
- Narrative Graph V1 runtime (erstattet, se `DECISIONS.md` 2026-10-27).
- Visual production (parkert; restart fra Structural Map V3 Gate A hvis gjenåpnet).
- Generell undo-historikk utover ANGRE siste handling.
- Flere enn én spillerenhet.

## AVHENGIGHETER
M0 → M1 → M2 → (M3 og M4 kan gå parallelt, M3 først anbefalt) → M5 → M6.

M2 er forutsetning for både M3 og M4 fordi gjennomspillingsautomaten, overstyring og synkronisering alle bruker samme `apply`.

## EXACT NEXT
1. Eier legger `index.html` + assets i repoet (M0). Claude kan hjelpe med hash-sjekk og commit når filene ligger lokalt.
2. Eier henter ønsker fra den opprinnelige ChatGPT-samtalen inn i repoet (`docs/v2/OWNER_WISHES.md`), så de kan vurderes mot V2.
3. Eier justerer vokabularet og innholdsutkastet i `docs/v2/CONTENT_MATRIX_V2.md`.
