# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-26
STATUS: V0.12.3 + UX5A AUTOMATED/BROWSER VERIFIED + DEVICE GATE ÅPEN + REPOSITORY HEALTH ÅPEN

> `PROJECT_STATE.md` er den kanoniske korte handoff-filen. Denne filen beholdes som kompatibilitets-/oversiktsfil.

## BASELINE
- Produkt: Monsterhulen
- Release-baseline: V0.12.3 Lasting Thing Identity Pass
- State schema: 12
- Storage: `monsterhulen_v120`
- Asset Contract: 2.4.0
- Aktiv branch: `ux5/searchable-rooms-encounter-tracks`
- Aktiv kandidat: UX5A Searchable Rooms + Encounter State
- Automatisert runtime + Chromium: verifisert
- Fysisk iPad/mobile: pending

## UX5A KANDIDAT
- alle rom kan undersøkes uten å avsløre loot på forhånd,
- KORT/VANLIG/STORT målretter 1/2/3 kuraterte valgfrie skjulte funn,
- fysisk D6 brukes ved usikkert søk,
- første 1-2 gir hint; gjentatt lavt resultat fail-forwarder og avslører funnet,
- full sekk sletter aldri funnet,
- normale monster: 3 hjerter, `SPENNING` 4,
- andre genererte encounters: 3 fremgangssteg, `SPENNING` 4,
- terningresultat auto-løser aldri encounter og endrer ikke HP/fremgang,
- eksplisitt `+ FREMGANG`, siste hjerte eller `LØST MED GOD IDÉ` styrer løsning.

## VERIFISERING
Kjørt mot rekonstruert aktiv UX5A-runtime:
- UX5A search/encounter QA: **2216 / 0**
- Adventure Code: **405 / 0**
- UX4 progression/secret-door: **1797 / 0**
- ny varig content regression: **5960 / 0**
- 11 inline scriptblokker: **0 syntaksfeil**
- Chromium UX5A smoke: **23 / 0**

Chromium-smoken dekker blant annet tomt rom, skjult funn uten forhåndslekkasje, dobbelt lavt søk, full sekk, fysisk 6 uten state-endring, full fremgang, smart løsning, 4-hjertes `SPENNING`-kamp, slutt på siste hjerte og 3-hjertes normalmonster.

Historisk V0.12.3 release-evidens beholdes separat:
- Lasting thing: 67 / 0
- Treasure: 121 / 0
- Puzzle: 4665 / 0
- NPC: 4935 / 0
- Friend: 4104 / 0
- Pet: 6069 / 0
- Rescue: 5070 / 0

## GITHUB REALITY
`joakimskurk/monsterhulen` er permanent source of truth, men repository-health-gaten er ikke lukket før komplett runtime/source/assets kan rekonstrueres direkte fra repoet.

Library-kilden kan nå materialiseres som tekst og brukes til å rekonstruere/teste UX5A, men den er ikke byte-identisk med den opprinnelige V0.12.3-manifest-hashen. Komplett asset-tree mangler fortsatt som ordinære repo-filer.

Rekonstruert UX5A runtime SHA-256:
`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

## NESTE
1. fysisk smoke-test UX5A på iPad/mobile,
2. vurder om `SE DEG RUNDT` føles som utforsking og ikke tvungen knapp,
3. vurder om 3-4 encounter-steg føles bra for barn,
4. hvis grønt: merge UX5A til `main`,
5. start deretter UX5B kartbevisst løsningsgraf,
6. fortsett Repository Health før neste release checkpoint.
