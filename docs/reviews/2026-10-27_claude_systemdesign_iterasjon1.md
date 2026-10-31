# Monsterhulen – systemdesign for sammenhengende og forskjellige eventyr

Dato: 2026-10-27 · Modell: Claude Opus 5.5 · Kun analyse og design. Repoet er ikke endret.
Bygger på: [Monsterhulen_audit_2026-10-27.md](Monsterhulen_audit_2026-10-27.md).

**Kilder**

Aktiv branch `ux5/searchable-rooms-encounter-tracks`:
- patcher, særlig `adventure_code_v1` (blueprints, `planLock` / `planRescue` / `planCollect` / `planMystery`),
- `progression_gates_secret_doors` (`gateRequirement`, cut-edge),
- `encounter_purpose_contract`.

`narrative/story-graph-v1-prep`:
- `NARRATIVE_GRAPH_V1`, `STORYLET_MATRIX_V1`,
- `CRYSTAL_STORYLET_BANK_V1`, `CRYSTAL_STORYLET_AUDIT`,
- `ENCOUNTER_STORY_SYSTEM_PLAN_V1` §3.

**Kunnskapsnivå:**
- **CONFIRMED** = står i kode eller docs.
- **DESIGN OPINION** = mitt forslag.
- **PLAYTEST REQUIRED** = må prøves med barn.

---

## Kortversjon

1. **I dag er eventyrene strukturelt like.** *(CONFIRMED)* Alle fire blueprints kompileres til samme form:
   - `chooseSpreadRooms(N)`,
   - legg N «ting» i spredte rom,
   - `gateRequirement:{kind:'FOUND_ALL'}` på en cut-edge,
   - finale.

   LOCK = finn 1. RESCUE = finn 1 spor + redning. COLLECT = finn 3. MYSTERY = finn 3 spor. Typen endrer substantivet, ikke spillet.
2. **Kartet lages først, og historien «helles» utover det.** *(CONFIRMED)* `generateDungeon` → `decorateDungeon`. Rom velges etter spredning, ikke etter historiens behov.
3. **Narrative Graph V1 forbedrer innsiden av hver henting, men ikke eventyrets form.** *(CONFIRMED / DESIGN OPINION)* Crystal Machine er fortsatt «hent 3 → monter». Prep-arbeidet handler nesten bare om ett blueprint og om hvordan én ressurs skaffes.
4. **Storylet Matrix måler repetisjon på feil dimensjon.** *(DESIGN OPINION)* Tagger som `LIGHT_REDIRECT` og `FOOD_HUNGER` er *fiksjonsmotiver*. To storylets med ulike familier kan spilles identisk. Uglebibliotekaren («NPC_FAVOR») er strukturelt «søk etter noe i et annet rom og kom tilbake».
5. **Forslaget:** Legg til ett lag som mangler, **Adventure Shape**: en liten forfattet beat-graf som bestemmer eventyrets spillform og kartkrav. Slå samtidig sammen Narrative Graph, Matrix og Provider Planner til noe mindre:
   - storylets beskrevet med en **spillsignatur** (verb, ukjent, rekkevidde),
   - et skille mellom **harde behov** (få, garanterte) og **myke affordances** (mange, valgfrie ruter),
   - 6 typer world effects,
   - «ekko» som lar tidligere handlinger endre senere scener.
6. **Minste eksperiment:** Spill Crystal Machine som GATHER og Glass Heart som KEY CHAIN *på papir oppå dagens app*. Bruk DM-panelets «LEGG TIL I ROMMET» og ett beat-ark per eventyr. Mål om barna opplever eventyrene som forskjellige før noe kodes. Det bryter ikke UX5A-gaten og kan kombineres med G-play.

---

## 0. Diagnose: bygger vi ett system eller flere ved siden av hverandre?

| Del | Påvirker i dag … | Påvirkes av … | Kobling |
|---|---|---|---|
| Kartgenerator | alt (rom, gate-kant, nøkkel-/målrom velges av generatoren: `d.lockConnectionId`, `d.keyRoomId`, `d.goalRoomId`) | ingenting fra historien | **enveis** |
| Blueprint | tekst (premise / plant / payoff), hvilke substantiv | kartet (spredte rom) | svak |
| Gate | finalen (FOUND_ALL) | funnlisten | ok, men én type |
| Ambiente møter | stemning; feller sperrer | tone / beat / type | **løsrevet**: utfall påvirker ingenting senere |
| Søk | valgfrie ting | ingenting | løsrevet fra story (bevisst) |
| Inventory / ting | «affordances», hints | funn | svak: ting brukes sjelden i kritisk sti |
| Venner / kjæledyr | Helteboka, hints | møter | svak i eventyret |
| Terning | forslagstekst | – | ingen state-effekt i møter |
| Kamp | fjerner møte | barnets valg | isolert |
| Puzzle | ingenting (etter patch 13) | – | isolert |
| Forteller-info | – | type-boilerplate | lite eventyrspesifikk |

**Konklusjon** *(DESIGN OPINION, godt støttet)*: Monsterhulen er i dag **et kart med en hentekjede og et sett parallelle stemningssystemer**. Delene eksisterer side om side, men gir sjelden input til hverandre.

Systemet trenger ikke flere deler. Det trenger **noen få koblingspunkter**:
1. formen styrer kartet,
2. utfall produserer tokens,
3. tokens åpner alternative ruter og endrer senere scener.

---

## 1. System map (anbefalt)

```
            ┌──────────────────────── AUTHORED ────────────────────────┐
            │                                                          │
  SHAPE LIBRARY (≈5)        BLUEPRINT (identitet)        BEAT BANK (storylets)
  slot-graf + kartkrav  ◄── velger shape, låser hook,    kort med signatur,
  + variasjonsregler        sannhet, klimaks, payoff,    needs/affords, outcomes,
                            harde tokens, ekko           varianter (skins/motiv)
            │                        │                          │
            └──────────────┬─────────┴──────────────┬───────────┘
                           ▼                        ▼
                   ASSEMBLER (deterministisk fra seed / Adventure Code)
                   1. fyll åpne slots med beats som matcher signatur
                   2. generer kartkandidater → velg en som oppfyller kartkravene
                   3. plasser slots i rom etter rolle (hub / blindvei / bak hinder)
                   4. plasser ambient etter at kritisk sti er gyldig
                   5. valider ~8 invarianter
                           │
                           ▼
                   ADVENTURE INSTANCE (= «narrative graph» som data)
                           │
                           ▼
   RUNTIME: state = rom · kanter · figurer · ressurser · fakta · beat-status
            handlinger → 6 effekttyper (REVEAL · OPEN/CLOSE · TRANSFER ·
            DISPOSITION · MOVE · RESOLVE)    ← GODTA LØSNING (Forteller)
                           │
                           ▼
   VISNINGER: Forteller-kort (avledet av beat + state) · barnevisning · kart
```

Det viktigste skiftet: **«Narrative Graph» er ikke en egen motor, men resultatet av å fylle en shape.** Provider-planlegging og phase/expiry blir egenskaper ved shapen, ikke egne subsystemer.

---

## 2. Gameplay primitives

### 2.1 Hva barnet faktisk gjør ved bordet

Jeg har gått gjennom listen din (FIND, SEARCH, DISCOVER, TALK, BARGAIN, TRADE, DELIVER, USE, PLACE, ASSEMBLE, UNLOCK, SNEAK/AVOID, SOLVE, PROTECT, RESCUE, ESCORT, CHOOSE, FIGHT, RETURN) og alt innhold i banken. Uten navn og tekst blir det **seks verb og to tilstander**.

**Seks spillerverb:**

| Verb | Hva barnet gjør | Dekker i dag | Terning? | Shell? |
|---|---|---|---|---|
| **UTFORSKE** | går, velger vei, åpner nye rom | kartnavigasjon | nei | kartet |
| **LEGGE MERKE TIL** | ser / lytter / leter etter noe som er der | search, hidden find, secret door, SEARCH_SECRET, «discover», clue | ja, hvis usikkert | SØK |
| **SNAKKE** | spør, overtaler, forhandler, blir venner | NPC, social bargain, merchant-prat, guardian med vilje | ja, hvis usikkert | nei (Forteller) |
| **GI / BRUKE** | gir, plasserer, bytter, mater, låser opp med ting | deliver, use, place, assemble, unlock, trade, feed, buy | nei | GI (slots / bytte) |
| **KOMME FORBI** | klatrer, sniker, lurer, kjemper, tåler | traps, sneak/avoid, fight, guardian uten vilje | ja | KAMP (valgfritt modus) |
| **TENKE UT** | løser, resonnerer, danner en teori | puzzle, mystery-teori | aldri | PUZZLE (bare forfattede) |

**To tilstander** (ikke verb, men forhold som endrer hvordan de andre verbene spilles):
- **FØLGER**: noen er med deg (redning, eskorte, ny venn, kjæledyr). Gjør RETURN meningsfylt og gir nye affordances.
- **VALGT**: barnet har tatt et valg som låser en gren (mangler i dag).

Pluss ett verb som **mangler** og bør inn:

| **VELGE** | forplikter seg mellom to gode ting | finnes ikke | nei | VALG-kort |

### 2.2 Hva som egentlig er samme mekanikk

- **PLACE / ASSEMBLE / UNLOCK / DELIVER / TRADE / FEED / BUY = GI/BRUKE.** Runtime er én overføring: `TRANSFER(ressurs → mål)`. Forskjellen ligger i målet: et slot, en person, en dør. Trade er to overføringer atomisk.
- **FIND / SEARCH / DISCOVER / SECRET DOOR = LEGGE MERKE TIL.** Forskjellen er bare *hva* som avsløres: ting, kant eller faktum.
- **BARGAIN / MERCHANT / NPC_REWARD / FAVOR = SNAKKE om et ØNSKE.** Personen har noe og vil ha noe. Prisen kan være en ting, en tjeneste, informasjon eller overtalelse. Merchant er bare en person hvis ønske kan oppfylles på flere måter.
- **FIGHT / SNEAK / AVOID / TRAP = KOMME FORBI.** Kamp er en modus med hjerter, ikke et eget verb.
- **RESCUE = KOMME FORBI/SNAKKE + FØLGER. ESCORT/PROTECT = FØLGER + UTFORSKE.** Det er ikke egne mekanikker.
- **RETURN er ikke et verb.** Det er en *kartform* som oppstår når et behov og målet ligger på samme sted (se §8).

### 2.3 Hva som bør være shells og hva som bare er storylet-semantikk

Det trengs bare fire–fem shells:
- **SØK** (finnes),
- **GI** (slots eller bytte; dekker ASSEMBLY, SLOT_GATE, MERCHANT_TRADE og LOCKED_OBJECT),
- **KAMP** (finnes),
- **VALG** (nytt),
- **PUZZLE** (bare forfattede).

`NPC_DIALOGUE_FAVOR`, `REWARD_CHOICE` og `SEARCH_INSPECT` som egne shells er overflødige. SNAKKE skal *ikke* ha shell. Det er Fortellers domene, og en dialog-shell ville lukket fasitlisten.

---

## 3. Storylet Matrix redesign

### 3.1 Problemet med dagens matrise

Dagens matrise er 70+ felt per storylet pluss regler A–L og 13 scoringskriterier. Den svarer på «*kan* denne kombineres?», men har ikke en kompakt beskrivelse av «*hvordan spilles* den?». Derfor kan den ikke oppdage falsk variasjon. Familietaggene er fiksjonsmotiver, ikke spillform.

### 3.2 Spillsignaturen: tre akser som avgjør hvordan en scene spilles

| Akse | Verdier | Spørsmålet den svarer på |
|---|---|---|
| **Verb** | UTFORSKE · MERKE · SNAKKE · GI · FORBI · TENKE · VELGE | Hva gjør barnet mest? |
| **Ukjent** | HVOR · HVA · HVORFOR · HVORDAN · – | Hva må barnet finne ut? |
| **Rekkevidde** | HER (løses i rommet) · ÆREND (krever et annet rom) · TILBAKE (løses ved å vende tilbake) · RUTE (endrer kartet) | Hvordan beveger barnet seg? |

Pluss to «hvem»-felt:
- **Holder:** TING · MILJØ · NOEN. Bare NOEN kan forhandles med.
- **Motiv** (kosmetisk): lys, lyd, mat, musikk … Brukes bare til å unngå samme rekvisitt eller sans to ganger.

### 3.3 Storylet-kortet (minimum)

```
id, subject, variants[ {motif, tekst, romkrav} ]       ← skins
signature: {verb, unknown, reach, holder}
slotRoles: [HOOK|GATHER|HINDER|VRI|VALG|KLIMAKS|PAYOFF|AMBIENT]
needs:    [hardt token]      (bare hvis shapen sier det er hardt)
affords:  [tags som hjelper] (myke: MAT, LYS, MUSIKK, VENN_*, …)
resolvedWhen: én setning fiksjon
outcomes: [ {id, label, effects[]} ]   (1–3)
echo:     [ {ifToken, endring} ]       (valgfri)
forteller: {åpning, vil, hint1, hint2, improv?}
combat: true/false
```

Det er rundt 15 felt mot dagens ~70. Alt annet (`validPhases`, `expiresAfter`, `providerFamilies`, `criticalSafe`, `truthMode` …) flyttes til shapen eller faller bort (se §9).

### 3.4 Regler for variasjon (erstatter A–L og 13 scoringskriterier)

1. **Ingen to kritiske beats i samme eventyr har samme (verb, rekkevidde).**
2. **Minst tre forskjellige verb blant de kritiske beatsene.**
3. **Samme motiv eller rekvisitt maks én gang** (dekker LIGHT_REDIRECT-problemet og regel L).
4. **Samme subject maks én gang.**

Det er hele scoringsmodellen. Den svarer direkte på spørsmålet ditt:

> **Kan matrisen hindre at tre encounters blir samme gameplay med forskjellige navn?** Ja, hvis den sammenligner *signaturer* og ikke navn, roller eller fiksjonsfamilier. Regel 1 gjør det umulig å fylle tre slots med tre skins av samme beat.

### 3.5 Matrisen som strukturverktøy

Matrisen styrer ikke strukturen alene. Den svarer på «hvilke beats kan fylle *dette slotet*?». Strukturen ligger i shapen (§4–5), som sier hvilke signaturer slotet tillater. Matrise × shape gir kontrollert struktur. Matrisen alene gir bare kompatibel suppe.

---

## 4. Adventure differentiation model

### 4.1 Hva som faktisk gjør to eventyr forskjellige

Forskjell i *spill* kommer fra fem ting. Tekst, tema og monstre bidrar ikke:

1. **Avhengighetsform:** parallell (samle), lineær (kjede), progressiv kunnskap (spor), ett stort hinder med flere løsninger, eller teori → konfrontasjon.
2. **Hva som er ukjent:** hvor, hva, hvorfor, hvordan.
3. **Bevegelsesmønster:** stjerne fra hub, dypere og dypere, frem og tilbake, ut og hjem med følger.
4. **Hvem målet holdes av:** ting (ta), miljø (komme forbi), noen (forholde seg til).
5. **Valg og konsekvens:** finnes det et punkt der barnet forplikter seg og slutten endres?

### 4.2 Shape-biblioteket (≈5 former; nok for lang tid)

| Shape | Avhengighetsform | Typisk rytme | Kartkrav | Klimaks |
|---|---|---|---|---|
| **SAMLE** (gather) | 3 parallelle grener → konvergens | utforske → 3 ulike verb → tilbake → GI (slots) | **hub** med ≥3 greiner; målet *i* huben | GI + aktivering |
| **KJEDE** (key chain) | A åpner B åpner C | se målet → hinder → ærend → åpne rute → tilbake → bruke | **dybde**; mellomgate inne i førgate-sonen; snarvei som åpnes innenfra | BRUKE på det man så først |
| **SPOR** (trail) | hvert funn avslører hvor neste er | merke → tolke → følge → (målet flytter seg) → roe → hjem med følger | lang sti med **forgreininger**; mål dypt; returvei | SNAKKE/FORBI + FØLGER hjem |
| **HINDER** (blocker) | ett stort hinder, flere mulige løsninger rundt i kartet | møte hinderet → utforske for idéer → velge løsning → løse | hinderet tidlig og sentralt; 2–3 løsningskilder i **ulike greiner** | den valgte løsningen; slutten farges av valget |
| **MYSTERIUM** | bevis → teori → konfrontasjon → valg | merke → tenke → snakke → velge → levere | spor i **blindveier**; konfrontasjon midt i | SNAKKE + VELGE |

Hver shape er en liten forfattet graf med 5–8 slots. Slotene sier hvilke signaturer som er lov. Eksempel for SAMLE: GATHER-slotene krever tre *ulike* verb.

### 4.3 Hvor shapen skal ligge

**I Blueprint, som et valg fra et lite bibliotek.**
- Ikke i Narrative Graph: grafen er resultatet.
- Ikke i Matrix: den kjenner bare enkeltbeats.
- Ikke som et fritt eget lag som generatoren velger tilfeldig: da mister blueprinten identiteten sin.

Shapes er gjenbrukbare. To blueprints kan dele shape og føles forskjellige på innhold, men det er bevisst «samme type eventyr». Ulike shapes føles forskjellige på struktur.

Svar på spørsmålet ditt: *eget lag (Shape Library), eid og valgt av Blueprint.*

---

## 5. Blueprint responsibilities

**Blueprint bestemmer (authored, låst):**
- Identitet: tittel, premiss, sannhet (hva som egentlig skjer).
- **Shape** (én fra biblioteket).
- **Hook**-beat og **klimaks**-beat, skrevet konkret (ikke trukket fra banken).
- **Payoff** og eventuelle ekko-linjer i slutten som refererer til hva barnet gjorde.
- **Harde tokens**: det eventyret *må* ha. Typisk 1–3, for eksempel `KRYSTALL_RØD/BLÅ/GUL` eller `GLASSNØKKEL`.
- Hvilke slots som er låst, og hvilke som er åpne (fra banken, med tillatte signaturer).
- Tone og rute (soner).

**Blueprint bestemmer IKKE:**
- konkrete rom eller kartlayout,
- hvilken skin eller variant et åpent slot får,
- ambiente møter,
- valgfrie funn,
- farger og andre kosmetiske parametre,
- *hvordan* barnet løser noe.

---

## 6. Narrative Graph responsibilities

Som **instans-data** (ikke egen motor) kontrollerer grafen:

1. **Harde avhengigheter:** hvilke tokens hvert beat krever, og at hvert hardt token har en garantert kilde *før* forbrukeren (den eneste provider-garantien som trengs).
2. **Rekkefølge og faser:** fasen er bare slot-posisjon i shapen. En komplikasjon festet til «mellom HOOK og KLIMAKS i gren B» kan ikke dukke opp etter at gren B er løst. SKYGGEHEKSA-problemet løses dermed av strukturen, uten egen expiry-motor.
3. **Kunnskap:** hvilke fakta som er avslørt. Shells og barnevisning viser bare avslørte fakta.
4. **Beat-status:** venter / aktiv / løst(utfall).
5. **Tokens produsert av utfall**, inkludert myke tokens fra ambiente møter (VENN_X, VET_Y, HAR_MAT).

Grafen kontrollerer **ikke** *hvordan* barnet løser et beat. Det eies av `resolvedWhen` og Forteller (§10).

---

## 7. Procedural variation boundaries

**Authored (identitet, låst):**
- shape (avhengighetsform),
- hook, sannhet, store avsløringer,
- klimaks, payoff,
- harde tokens,
- antall kritiske beats,
- viktige pacing-beats (for eksempel «tilbake til maskinen»),
- ekko i slutten.

**Kontrollert variasjon (generatoren):**

| Kan varieres | Innenfor |
|---|---|
| hvilket beat fyller et åpent slot | tillatte signaturer for slotet + regler §3.4 |
| skin / motiv / subject | beatets varianter; ingen repetisjon |
| farger og kosmetiske parametre | beatets parametre |
| rekkefølgen på parallelle grener | alltid fri (barnet velger) |
| rom og kart | shapens kartkrav |
| myke løsningskilder (mat, musikk, venn) | 1–3 per hinder, plassert i ulike greiner |
| ambiente møter | etter kritisk sti; antall per lengde; må produsere et token eller en stemning |
| belønningsform | fra beatets outcome-liste |
| komplikasjon | 0–1 per eventyr, fra shapens komplikasjonsslot |

**Aldri variert:** hva som er sant, hva som kreves for finalen, og at payoff kommer etter barnets handling.

Grensen i én setning: **Generatoren velger *hvilke* scener og *hvor*. Blueprinten bestemmer *hvorfor* og *hva det betyr*.**

---

## 8. Map/story integration

### 8.1 I dag
Kart → velg gate-kant, nøkkelrom og målrom → `chooseSpreadRooms` → historie. Historien kan ikke be om en hub, en blindvei eller en returvei.

### 8.2 Forslag: shape → kartkrav → velg kart → plasser slots etter rolle

Minimum kart-vokabular (seks begreper; nok for alle fem shapes):

| Krav | Betyr | Brukes av |
|---|---|---|
| `GATE(a,b)` | cut-edge mellom sone a og b | alle (finnes) |
| `HUB(slot)` | slot i rom med ≥3 utganger nær start | SAMLE |
| `BLINDVEI(slot)` | slot i bladnode | gjemte ting, spor (oppdagelse føles ekte) |
| `BAK(slot, hinder)` | slot bare nåbart etter at hinderet er løst | KJEDE |
| `DYP(slot, n)` | minst n rom fra start | finaler, spor-mål |
| `ULIKE_GREINER(slotA, slotB, …)` | slots i forskjellige greiner fra hub/start | SAMLE, HINDER-løsninger |

`RETURN` og `snarvei` utledes:
- Hvis et beat ligger i et allerede besøkt rom og krever noe fra et annet rom, oppstår returen.
- En snarvei kan være et *world effect* (`OPEN` fra innsiden) etter et løst beat. Det belønner retur uten å gjøre den kjedelig.

### 8.3 Implementering uten ny kartalgoritme

Generatoren prøver allerede inntil 80 layouts (`build()` i content-testen). Gjør det samme som **generate-and-test**: generer kandidater, sjekk shapens krav med BFS (finnes allerede), og velg første som passer. Deretter plasseres slots etter rolle. Ny kartlogikk trengs først hvis treffraten blir for lav.

### 8.4 Kartet påvirker spillet (motsatt retning)

- Antall greiner fra hub bestemmer om SAMLE føles som en stjerne.
- Avstanden mellom ærend og giver bestemmer om en tjeneste føles som en tur eller bare et steg.
- Hindre på kanter (felle, troll, bro) gjør *kartet* til puzzle: «hvordan kommer vi dit?»

---

## 9. Simplification opportunities

| I dag (prep) | Forslag | Hvorfor |
|---|---|---|
| 8 provider-familier | **3 kilder**: PLASSERT (eventuelt gjemt) · HOLDT AV NOEN (ønske) · MEKANISME (miljø gir etter en endring) | merchant / trade / bargain / reward / favor er samme mønster med ulik pris |
| provider-planner for alle krav | garanti **bare for harde tokens** (1–3 per eventyr); alt annet er myke affordances | de fleste krav (troll vil ha mat) er ikke historiens identitet. Ethvert troverdig forslag kan fungere |
| phase/expiry-motor (`validPhases`, `activatesAfter`, `expiresAfter`) | slot-posisjon i shape + én regel: ambient som refererer et løst mål genereres ikke | samme effekt, ingen motor |
| Matrix-familier A–L + 13 scoringskriterier | signatur + 4 regler (§3.4) + motiv-tag | måler spillform direkte |
| ~70 storylet-felt | ~15 (§3.3) | forfattbart |
| 11 outcome-familier | 6 effekttyper | se §10.2 |
| 8 interaction shells | 4–5 | §2.3 |
| 30 hard invariants / 23 avvisninger | **8 invarianter** (under) | resten er dekket av shape-konstruksjon eller er forfattersjekkliste |
| `purpose/stakes/resolvedWhen/payoff` som type-boilerplate | `resolvedWhen` + outcomes per beat; «purpose» = slot-rollen | se audit F4 |
| Narrative Graph som egen planleggingsmotor | instansdata fra Assembler | §1 |

**De 8 invariantene som faktisk må valideres:**
1. Hvert hardt token har en garantert kilde som er nåbar før forbrukeren, uten å passere gaten det åpner.
2. Ingen rute (heller ikke hemmelig eller snarvei) omgår en uoppfylt gate.
3. Gjemte harde tokens har signal + fail-forward.
4. Å eie noe utfører aldri en handling (GI er alltid eksplisitt).
5. Hvert kritisk beat har minst én vei uten kamp og uten krav om bestemt terningkast.
6. Hvert outcome har minst én effekt i state.
7. Improvisert innhold produserer aldri et hardt token.
8. Shells viser bare avslørte fakta.

---

## 10. Konsekvenser og barnets frie handlinger

### 10.1 Modellen: systemet sier *hva som må bli sant*, ikke *hvordan*

Hvert beat har:
- **`resolvedWhen`**: én fiksjonssetning, for eksempel «golemen slipper dere til skålen».
- **outcomes**: 1–3 forfattede resultater med effekter. For golemen: `TRÅDTE_TIL_SIDE` (OPEN tilgang) eller `BLE_VENN` (DISPOSITION = venn, + `TRÅDTE_TIL_SIDE`).
- **affords**: tags som *hjelper* («VIS_KRYSTALL», «MUSIKK», «STYRKE»). De er hint og forslag, aldri en fasitliste.

Forteller vurderer om barnets idé oppfyller `resolvedWhen`. Hvis ja: **GODTA LØSNING → velg outcome.** Hvis usikkert: kast. Lavt kast gir fail-forward og et nytt forsøk. Høyt kast betyr at forsøket lykkes, *ikke* at hele beatet er løst.

**Harde behov** er de eneste stedene der barnet *må* bruke noe bestemt. De er få og står i blueprinten (krystallene i maskinen, nøkkelen i døra). Alt annet kan løses med en troverdig idé. Det er dette som gjør at systemet både holder sammen og er åpent:

> **Harde behov holder historien sammen. Myke affordances og GODTA LØSNING holder leken åpen.**

### 10.2 World effects: seks typer er nok

| Effekt | Eksempel |
|---|---|
| `REVEAL(fakta / kant / ting)` | spor kjent, hemmelig dør synlig, ting synlig |
| `OPEN/CLOSE(kant)` | bro åpnes, felle sperrer, snarvei åpnes innenfra |
| `TRANSFER(ressurs, fra, til)` | ting til sekk, krystall i slot, bytte |
| `DISPOSITION(figur, venn/nøytral/sint/borte/følger)` | trollet blir venn, katten følger med |
| `MOVE(figur, rom)` | katten flykter ett rom innover, NPC venter ved hub |
| `RESOLVE(beat, outcome)` | beat ferdig, token produsert |

Konsekvenser som «merchant endrer tilbud» eller «en senere storylet endrer seg» trenger ikke nye typer. De er **ekko**: et senere beat har `echo: {ifToken: TROLL_VENN, endring: 'trollet dukker opp i finalen og holder døra'}`. Et ekko er en tekst og eventuelt én ekstra affordance, ikke ny logikk. Maks 2–3 per eventyr.

### 10.3 Koblingen som mangler i dag: valgfritt spill mater kritisk spill

Ambiente møter produserer **myke tokens** (VENN_SKJELETTDANSER, HAR_MAT, VET_OM_HEMMELIG_GANG). Kritiske hindre lister de samme tagene i `affords`. Konsekvensen: det barnet gjør på sidelinjen blir en *ekstra vei* gjennom hovedhistorien, men aldri en *nødvendig* vei.

Det løser audit-funn F4 (ambient uten stakes) systemisk, uten å bryte provider-garantien. Dette er etter mitt syn den viktigste enkeltgrepet for å få Monsterhulen til å spille som ett system. *(DESIGN OPINION; PLAYTEST REQUIRED for effekt.)*

Regel B/C i dagens matrise forbyr dette i utgangspunktet («optional loot never satisfies critical»). Forslaget er konsistent med intensjonen deres: optional tokens **legger til** ruter og **erstatter** aldri den garanterte.

---

## 11. Repetition risks (falsk variasjon)

### 11.1 Crystal-banken uten navn

| Storylet | Signatur (verb · ukjent · rekkevidde · holder) |
|---|---|
| LYSET I SPREKKEN | MERKE · HVOR · HER · ting |
| KRYSTALLKLANGEN | MERKE · HVOR · HER · ting |
| FARGEN SOM IKKE HØRER HJEMME | MERKE · HVOR · HER · ting |
| UGLEBIBLIOTEKAREN | SNAKKE→MERKE→GI · HVOR · ÆREND+TILBAKE · noen |
| DVERGSMEDEN | SNAKKE→MERKE→GI · HVOR · ÆREND+TILBAKE · noen |
| ALVEKARTOGRAFEN | SNAKKE→MERKE→fortelle · HVA · ÆREND+TILBAKE · noen |
| LYSSLIMET | FORBI (lokke) · HVORDAN · HER · miljø/vesen |
| BYTTEKRABBEN | GI (bytte) · HVA · HER eller ÆREND · noen |
| STEINGOLEMMEN | SNAKKE/VISE · HVORDAN · HER · noen |

**9 storylets ≈ 5 distinkte beats.** De tre SEARCH er én beat med tre sanseskins. Det er fint, men det er ikke variasjon i spill. Ugle og smed er identiske. Kartografen er nesten det. Bare GUARDIAN-gruppen har tre virkelig forskjellige spill.

**Konsekvens:** Én Crystal Machine-instans kan ha god variasjon (en søk, et ærend, en vokter). Men to Crystal Machine-økter med ulike trekk føles svært like. Og fordi alle fire blueprints er FOUND_ALL-henting, føles også *de* like.

### 11.2 Andre steder med falsk variasjon

- **Blueprint-nivå:** LOCK / RESCUE / COLLECT / MYSTERY = hent N → gate. *(CONFIRMED)*
- **Provider-nivå:** MERCHANT_PURCHASE med mynter fra rom = ROOM_FIND + GI. TRADE med en ting fra et rom = det samme. En provider-type gir bare ekte variasjon når den endrer **rekkevidde** (krever den en tur?), **verb** (snakke vs. lete) eller **kostnad** (må barnet gi bort noe det liker?). Ellers er det samme henteoppdrag med en annen etikett.
- **Matrix-familier:** FOOD_HUNGER (troll, krokodille, plante) = GI · HVA · HER · noen. PERMISSION_PROOF (vakt, rustning, golem) = SNAKKE/VISE · HVORDAN · HER · noen. Fiksjonen er forskjellig, men spillet er det samme. Det er greit for ambient, men ikke greit som to kritiske beats i samme eventyr.
- **Søk:** room search, hidden find, secret door og SEARCH_SECRET er alle MERKE · HVOR · HER. To av dem i samme kritiske sti er repetisjon.

### 11.3 Når providers gir ekte variasjon

Ekte variasjon kommer når kilden:
1. **tvinger en tur** (ærend/retur) som ellers ikke ville skjedd,
2. **flytter verbet** (snakke i stedet for lete),
3. **koster noe** (gi bort vennens gave, et VALG), eller
4. **endrer verden** (trollet blir venn og dukker opp igjen).

Hvis ingen av disse gjelder, er det samme fetch med en annen leverandør.

---

## 12. Worked examples (eksisterende blueprints)

### 12.1 I dag (CONFIRMED fra `planLock` / `planRescue` / `planCollect` / `planMystery`)

| Blueprint | Struktur i kode |
|---|---|
| GLASS_HEART | nøkkel i `d.keyRoomId` → FOUND_ALL[nøkkel] → finale |
| WITCH_CAT | spor i `helperRoomId` → redning i `goalRoomId` → katten må til start |
| CRYSTAL_MACHINE | 3 deler i `chooseSpreadRooms(3)` → FOUND_ALL[3] → finale |
| ZOMBIE_DELIVERY | 3 spor i `chooseSpreadRooms(3)` → FOUND_ALL[3] → finale |

Alle har samme form: *gå rundt, plukk opp, åpne*. WITCH_CAT har allerede kimen til noe annet (katten må hjem), og bør utnytte den.

### 12.2 CRYSTAL_MACHINE → **SAMLE**

```
HOOK  (hub)        MASKINEN · MERKE·HVA·HER        → REVEAL slots (3 farger)
  ├─ GREN A (blindvei)  KRYSTALLKLANGEN · MERKE·HVOR·HER        → TRANSFER rød
  ├─ GREN B             UGLEBIBLIOTEKAREN · SNAKKE·HVOR·ÆREND   → MOVE side, TRANSFER blå
  │                     (siden ligger i en annen grein → tur)
  └─ GREN C             LYSSLIMET · FORBI(lokke)·HVORDAN·HER    → DISPOSITION, TRANSFER gul
                        (rettet: golem ga to SNAKKE-beats og brøt regel 2 i §3.4; golem er reserve)
TILBAKE (hub)      MONTERE · GI (slots) · HER                → OPEN gate-kant
KLIMAKS            bak gaten
ECHO               slim=VENN → lyser opp finalen; uglas bok forklarer maskinen i payoff
```

- **Kart:** `HUB(hook)`, `ULIKE_GREINER(A,B,C)`, `BLINDVEI(A)`, sidens rom ≠ uglas rom.
- **Rytme:** utforske → lytte → snakke → ærend → overtale → tilbake → plassere.
- **Identitet:** *«Vi samlet ting til en maskin og fikk den til å virke.»*

### 12.3 GLASS_HEART → **KJEDE**

```
HOOK (nær start)   GLASSDØRA: hjertet synlig bak glass · MERKE·HVA·HER → REVEAL mål, døra låst
HINDER 1           BROTROLLET sperrer broa · SNAKKE/GI·HVA·HER
                   ønske: forfattet variant (f.eks. «noe som glitrer»)
                   myke affords: GLITRER, MUSIKK, VENN_*  → OPEN bro-kant  (kartet endres!)
  └ ærend          ønsket ting ligger BAK en felle (REGNBUENETTET · FORBI·HVORDAN·HER)
                   eller i en hemmelig nisje (MERKE·HVOR·HER)
BAK broa           GLASSNØKKELEN (hardt token) · i blindvei · MERKE
SNARVEI            fra nøkkelrommet åpnes en dør tilbake mot start (OPEN fra innsiden)
TILBAKE            GLASSDØRA · GI (nøkkel) · HER → OPEN → KLIMAKS
ECHO               troll=VENN → holder døra / hjelper i klimaks
```

- **Kart:** `DYP(nøkkel, ≥4)`, `BAK(nøkkel, broa)`, glassdøra nær start, snarvei fra nøkkelsonen til start.
- **Rytme:** se målet → stoppes → finne det trollet vil ha → komme forbi felle → bro åpnes → nøkkel → snarvei hjem → åpne.
- **Identitet:** *«Vi så skatten med en gang, men måtte løse ting i riktig rekkefølge for å komme dit.»*

**Strukturell kontrast mot CRYSTAL_MACHINE:**

| | CRYSTAL_MACHINE (SAMLE) | GLASS_HEART (KJEDE) |
|---|---|---|
| Avhengighet | parallell | lineær |
| Bevegelse | stjerne fra hub | dypere, så snarvei hjem |
| Kartendring | ingen før gaten | bro åpnes, snarvei åpnes |
| Hva er ukjent | hvor krystallene er | hvordan komme forbi |
| Klimaks-verb | plassere 3 | bruke 1 |

Begge eventyrene bruker de samme verbene, de samme 6 effektene og de samme shellsene (SØK, GI), men de spilles forskjellig.

### 12.4 WITCH_CAT → **SPOR** (kort)

```
HOOK         katteblått gnistspor ved start · MERKE        → REVEAL retning
SPOR 1..3    hår → bjellelyd → poteavtrykk; hvert spor avslører HVOR neste er (REVEAL rom)
VRI          første gang katten sees: MOVE katten ett rom dypere (den er redd)
KLIMAKS      katten fast høyt oppe · SNAKKE/FORBI · ikke kamp
             affords: MAT, MYKT, MUSIKK, VENN_*            → DISPOSITION følger
HJEM         FØLGER-tilstand gjennom kartet til start (finnes i kode i dag)
ECHO         en venn fra ambient møte hjelper på hjemveien; heksa takker i payoff
```

Identitet: *jakt og tillit*. Kunnskap driver navigasjonen, og hjemturen er en del av eventyret.

### 12.5 ZOMBIE_DELIVERY → **MYSTERIUM** (kort)

Sporene finnes allerede som forfattet tekst (våte fotspor begge veier, bukett, pil mot start).

- Gaten er ikke FOUND_ALL. Den er **«møtt zombien»**. Sporene endrer hva Forteller-kortet foreslår (kunnskap → dialogforslag).
- **VALG** ved konfrontasjon: lytte eller jage.
  - **Lytte:** ærend der barnet leverer tingen tilbake sammen med zombien (FØLGER) → varm slutt.
  - **Jage:** zombien flykter, og tingen ligger igjen → kortere, ok slutt (fail-forward).
- Identitet: *forstå før du dømmer*. Klimaks er sosialt.

---

## 13. Recommended architecture

**Fem byggesteiner, to forfatter-flater:**

1. **Beat Bank** (forfattet): storylet-kort med signatur, needs/affords, outcomes→effekter, ekko og varianter.
2. **Shape Library** (forfattet, ~5): slot-graf, tillatte signaturer per slot, kartkrav, komplikasjonsslot.
3. **Blueprint** (forfattet): identitet, valgt shape, låste hook/klimaks/payoff, harde tokens, ekko.
4. **Assembler** (kode, deterministisk): fyll slots → velg kart (generate-and-test) → plasser → ambient → 8 invarianter → Adventure Code reproduserer.
5. **Runtime** (kode): én state, typed actions (MOVE, INSPECT, GIVE, ATTEMPT+DIE, ACCEPT_SOLUTION(outcome), CHOOSE, COMBAT_*), 6 effekttyper. Forteller-kort *avledes* av beat + state.

**Sammenlignet med dagens NG-plan:**
- **Behold:** subject≠rolle, availability≠action, truth≠knowledge, typed transitions, SLOT/GI-shell, fail-forward, eksplisitt improv.
- **Erstatt:** Narrative Graph-planner + Storylet Matrix-scoring + Provider Planner + phase-motor med **Shape + signatur + harde/myke behov**.
- **Legg til:** Shape Library, myke tokens fra ambient, ekko, VALG.

**Hvorfor dette er nok** *(DESIGN OPINION)*: Med 5 shapes × 3–5 åpne slots × beats med ulike signaturer kan hvert blueprint varieres meningsfullt innad, og blueprints med ulik shape spilles forskjellig. Nytt eventyr betyr ny blueprint (tekst + shape-valg + 2–3 låste beats), ikke nye regler. Ny type eventyr betyr ny shape. Det er sjeldent og bevisst.

**Når dagens tyngre maskineri faktisk trengs:** Hvis prosjektet senere vil ha *mange* blueprints med lange avhengighetskjeder generert automatisk, blir provider-planning og fasevalidering relevant. Det er ikke dagens behov, og prosjektets egen stoppregel peker samme vei.

---

## 14. Recommended next experiment

**Minste prototype som kan bevise eller avkrefte modellen: «Shape på papir».** Ingen kodeendring, så det respekterer UX5A-gaten.

1. **Skriv to beat-ark** (én side hver):
   - CRYSTAL_MACHINE som SAMLE (§12.2),
   - GLASS_HEART som KJEDE (§12.3).

   Bruk eksisterende subjects (Krystallklangen, Uglebibliotekaren, Steingolemmen, Brotrollet, Regnbuenettet). Hvert beat har bare fire linjer: *hva er det · resolvedWhen · outcomes · ekko*.
2. **Spill dem i dagens app:**
   - La appen lage kartet med riktig blueprint.
   - Forteller plasserer beats manuelt via DM-panelets «LEGG TIL I ROMMET» og arket (hub / grein / bak hinder vurderes ved bordet).
   - Kartendringer (bro, snarvei) håndteres muntlig.
3. **Én økt per eventyr, gjerne samme barn.** Mål:
   - **Gjenfortelling:** «Hva gjorde du i dag?» Beskriver barnet *forskjellige typer handlinger* i de to øktene, eller bare forskjellige ting?
   - **Verbtelling:** Forteller noterer hvilke av de 6 verbene som skjedde.
   - **Bevegelse:** antall returturer og om snarveien eller broa føltes som en hendelse.
   - **Ekko:** reagerte barnet når trollet eller golemen dukket opp igjen?
   - **Myke ruter:** brukte barnet noe fra et sidemøte til å løse et hinder?
   - **Forteller-reparasjon:** hvor ofte måtte Forteller finne på manglende logikk?
4. **Beslutning:**
   - Hvis barnet opplever øktene som forskjellige og ekko og myke ruter brukes: kod Shape + beat-kort for SAMLE først (audit-WP-CM1, nå som første shape), deretter KJEDE.
   - Hvis forskjellen ikke merkes: shape-laget gir ikke verdi. Da er innholdskvalitet per beat viktigere enn struktur, og det er også et svar verdt å ha.

**Kostnad:** én kveld å skrive arkene, to spilleøkter. Kan kombineres med G-play-delen av UX5A-gaten.

**Hva eksperimentet *ikke* tester:** kartgenerering etter krav. Det håndteres manuelt i forsøket og testes først når shape-laget er bevist verdt det.

---

## 15. Revisjon etter samtale (2026-10-27)

Produktavklaringer fra eier:
1. **Forteller skal alltid kunne velge og improvisere,** også når barnet ikke klarer en utfordring.
2. **Eventyrene skal være litt forskjellige hver gang,** og 4 eventyr er for lite. Store endringer er greit.
3. **To enheter samtidig:** Forteller på én enhet, barnet i fullskjerm-nettleser på iPad og trykker selv. Fysisk terning ved siden av, og Forteller taster inn resultatet.

### 15.1 Forteller overstyrer alltid, men overstyringen registreres

Dette erstatter skillet «harde behov kan ikke omgås»:

- **Generatoren** garanterer at harde tokens finnes og kan nås. Det er gulvet.
- **Forteller** kan alltid løse hvilket som helst beat, også et hardt et. «LØS (FORTELLER)» lar Forteller velge et forfattet utfall. For harde tokens gir «GI LIKEVEL» tokenet med en improvisert grunn. Appen spør ikke hvorfor, men registrerer *at* det skjedde. Da er state alltid sann, selv om fortellingen ble improvisert.
- **Prinsippet endres** fra «critical state never depends on untracked improv» til **«improvisasjon bestemmer *hvordan*; appen registrerer *hva som ble sant*»**. Det er strengere på state-sannhet og løsere på fiksjon.
- **«Kort ned» per eventyr:** Forteller kan fjerne en gren (3 krystaller blir 2) eller hoppe over et hinder. Det gir tilpasset vanskelighet uten egne vanskelighetsregler.
- **Hjelpestige per beat** på Forteller-skjermen: hint 1 (i fiksjonen) → hint 2 (tydeligere) → «løs likevel». Det dekker «hun skjønner ikke 1 av 3 utfordringer».

### 15.2 Flere eventyr: mål 10 blueprints over 5 shapes

En ny blueprint er én side med premiss, valgt shape, låst hook/klimaks/payoff og 2–3 åpne slots. Den bruker eksisterende subjects. Forslag i tillegg til dagens fire:

| Blueprint | Shape | Kjerne | Subjects (eksisterende) |
|---|---|---|---|
| BROA OVER TÅKESUMPEN | HINDER | Sumptrollet sperrer broa. Tre mulige løsninger i ulike greiner; valget farger slutten | Sumptrollet, Skjelettdanseren, Muldvarpgraveren, mat-funn |
| BYTTEKRABBENS MARKED | KJEDE (bytt deg oppover) | Hvert bytte gir det neste ønsket, og til slutt får du det du trenger | Byttekrabben, Revehandleren, Samlerkrabben, Brotrollet |
| PANNEKAKEFESTEN | SAMLE | Pannekakezombien mangler tre ingredienser, hentet med tre ulike verb | Pannekakezombien, Dvergsmeden, en vokter |
| SPØKELSET SOM IKKE FANT HJEM | SPOR + FØLGER | Følg spor dypt inn, og ta spøkelset trygt hjem gjennom endret kart | Tåkespøkelset, Den svarte katten, Sneglebudet |
| KLOKKETÅRNET STOPPET | KJEDE | Reparasjon i riktig rekkefølge; hvert steg åpner neste del av tårnet | Dvergsmeden, Steingolemen, Takgargoilen |
| SOVEHULEN | MYSTERIUM | Alle i hulen sovner. Finn årsaken og velg hvordan dere vekker dem | Sovesoppen, Gjespesoppen, Boka som skriver tilbake |

Alle forslagene bruker subjects fra de eksisterende reviewene, men innholdet krever redigering før bruk.

**Variasjon hver gang** kommer fra tre nivåer:
- hvilken blueprint (10),
- hvilke beats fyller de åpne slotsene (2–3 per blueprint),
- kart og ambient.

Med 10 blueprints og 2–3 åpne slots blir to økter i praksis aldri like, uten at noe blir tilfeldig.

### 15.3 To enheter er en kjernekrav, ikke en fremtidig plattformpakke

Dette endrer rekkefølgen i roadmapen. `DECISIONS.md` (2026-10-26) beskriver allerede riktig modell: Forteller er vert med autoritativ state, og spilleren er klient. Den er bare plassert for sent. Det er eiers beslutning å flytte den. Repoet er ikke endret.

**Minimum to-enhetsmodus:**

| Barnets iPad (fullskjerm) | Forteller-enheten |
|---|---|
| kart: trykk for å gå | alt barnet ser, og i tillegg Forteller-kort |
| rom: bilde, navn, én setning | terning-inntasting (barnet kaster fysisk) |
| SE DEG RUNDT, TA | LØS / GI LIKEVEL / hint-stige / kort ned |
| sekk: velg ting → GI til mål (slots) | legg til, overstyr, angre |
| VALG-kort når Forteller åpner et | starte og avslutte kamp, hjerter |
| ingen Forteller-tekst, ingen fasit | |

**Teknikk:**
- Én autoritativ state hos Forteller.
- Barnets iPad sender *forespørsler* (MOVE, SEARCH, TAKE, GIVE, CHOOSE). Forteller-enheten validerer, anvender og sender filtrert state tilbake.
- Det krever runtime-kjernen fra §13 (typed actions + `apply(state, action)`). Den er nå en forutsetning for både shapes og to enheter.
- **Transport (BESLUTTET 2026-10-27: relé over internett er greit, internett er alltid tilgjengelig):**
  - **Anbefaling: Firebase Realtime Database.**
    - Den fungerer fra en statisk side (GitHub Pages) uten egen server, og den fungerer i iPad Safari.
    - Reconnect og «siste state» er innebygd: databasen *er* siste kjente state.
  - **Datamodell:**
    - `sessions/{kode}/player`: Forteller skriver *filtrert* spiller-state.
    - `sessions/{kode}/requests`: iPaden legger forespørsler med unik `actionId`. Forteller-enheten leser dem, validerer, anvender og sletter.
    - `sessions/{kode}/meta`: versjon og tidspunkt.
    - Forteller-state blir aldri lastet opp, bare spillervisningen.
  - **Paring:** Forteller starter økt og får en kort kode eller QR. iPaden åpner `…/?spill=KODE` i fullskjerm.
  - **Tilgang:** anonym innlogging + regler som bare gir tilgang til egen øktkode. Økter slettes etter for eksempel 24 timer. Ingen persondata, bare spillstate.
  - **Robusthet:**
    - Doble trykk og reconnect skal ikke gi dobbel effekt (`actionId`, slik `DECISIONS` allerede krever).
    - Faller nettet ut, fortsetter Forteller-enheten alene i dagens én-enhetsmodus.
    - Adventure Code er fortsatt offline-backup.
  - **Alternativ:** Supabase Realtime har samme modell. Velg det hvis du heller vil unngå Google-konto.
  - Lokal server på hjemmenettet er forkastet for nå.
- **Sikkerhet for fasit:** spillerens payload bygges av en egen filterfunksjon. Forteller-felt sendes aldri. Det løser også audit-funn F11 (to publikum, én skjerm).

### 15.4 Revidert rekkefølge (forslag)

0. **Nå, uten kode:** papireksperimentet (§14) på én enhet. Det tester shapes uavhengig av to-enhetsarbeidet.
1. **F1:** runtime inn i repoet + GitHub Pages.
2. **UX5A:** lukk gaten som G-tech + G-play og merge. Eier kan vurdere om enkelte punkter blir irrelevante med to enheter.
3. **Runtime-kjerne:** én state + typed actions for eksisterende handlinger. Ren refaktor, samme oppførsel.
4. **To-enhets-MVP:** spillervisning på iPad + Forteller-vert + relé.
5. **Shape + beat-kort:** CRYSTAL_MACHINE (SAMLE) og GLASS_HEART (KJEDE), med LØS / GI LIKEVEL / hint-stige / kort ned.
6. **Flere blueprints:** én om gangen, hver testet i spill, mot ~10.

Narrative Graph V1 som generell motor (NG1–NG5) erstattes av punkt 3 og 5.
