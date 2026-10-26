# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A PATCH 13 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter/presenterer affordances, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Et encounter får mekanikk først når det har tydelig `purpose`, `stakes`, `resolvedWhen` og `payoff`.
- Generiske 3/4-ruters fremgangsspor uten skrevne steg er ikke tillatt.
- Hindringer må faktisk påvirke verden; løsning må gi observerbar endring.
- Puzzles må ha en skrevet rolle i scenen, ikke kobles tilfeldig på `MYSTISK`.
- Kritisk historie bygges fra Adventure Blueprints og etter UX5A fra Narrative Graph + kuraterte Storylets.
- Kritiske mål bruker `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Kritiske beats har dramatisk timing/expiry.
- Finaler må opptjenes gjennom story prerequisites.
- Fysisk terning brukes kun ved reell usikkerhet; appen ruller aldri digitalt.
- Terningresultat alene løser aldri et helt encounter eller unmet prerequisite.
- Ting/venner/kjæledyr er affordances, ikke tallbonuser.
- GitHub er permanent source of truth.

## PLAYTEST- OG ARKITEKTURREKKEFØLGE
1. Kartnavigasjon.
2. FRITT KAST + narrator freedom + item-use semantics.
3. DM-guide + fysisk D6-input.
4. Adventure Code + kuraterte blueprints.
5. **UX4:** hard finale-progresjon + hemmelige dører.
6. **UX5A:** romundersøkelse + encounter/world state + device findings.
7. **Narrative Graph V1:** causal/timed critical story + Storylet Matrix. Start kun med `CRYSTAL_MACHINE` etter grønn UX5A-device gate.
8. **UX5B:** kartbevisst løsningsgraf, utsatt til Narrative Graph V1 er bevist.

## UX5A acceptance og gate
Device/UX-funn:
1. key gate kunne unlock + traverse i ett trykk,
2. random mystery puzzle kunne være fictionally disconnected,
3. patch-10 auto-brukte fortsatt key og tok barnets løsningsvalg,
4. room + zone ga ett sted to identiteter,
5. `REGNBUENETTET` viste at generisk fire-ruters progress kunne være uten mening, konsekvens og payoff.

Patch 11: eksplisitt key use.

Patch 12: én synlig location identity.

Patch 13: encounter-purpose contract:
- purpose/stakes/resolvedWhen/payoff på generated non-treasure encounters,
- generic `ANNEN LØSNING` removed,
- progress kun for authored `progressStages`,
- traps kan faktisk blokkere ferdsel fremover men tillater retrett,
- løsning frigjør faktisk veien,
- ambient random mystery puzzles krever eksplisitt authored opt-in,
- puzzle solve gir ikke automatisk generic progress.

Automated after patch 13:
- encounter-purpose **4337/0**,
- single-location **19/0**,
- device **27/0**,
- search/encounter **2295/0**,
- Adventure Code **405/0**,
- UX4 **1797/0**,
- content **5809/0**,
- scripts **0 syntax errors**.

Fresh current browser QA og fysisk retest er fortsatt pending.

Før UX5A kan merges:
- trap-flow må føles logisk fysisk: hinder -> child plan -> evt. uncertainty -> solve -> faktisk world change,
- narrator må forstå scene purpose uten intern systemkunnskap,
- single-location og explicit-key må fortsatt være gode,
- ambient mysteries må ikke få disconnected puzzles,
- resten av device smoke må være grønn.

## Narrative Graph V1 - hvorfor før UX5B
Tre funn peker på samme arkitekturbehov:
- `CRYSTAL_MACHINE`: causal disconnect,
- `SKYGGEHEKSA`: temporal invalidity,
- `REGNBUENETTET`: interactive beat without purpose/payoff.

Target architecture:
- Adventure Blueprint = overordnet premiss/struktur,
- Narrative Graph = beats/resources/prerequisites/knowledge/phases/payoff,
- Storylet Matrix = curated hard compatibility,
- interactive Storylets/nodes declare purpose/stakes/resolvedWhen/payoff/world effect,
- progress is authored semantics, never default counter,
- validated critical story before ambient content.

Reference `CRYSTAL_MACHINE`:
- machine reveals three colored missing sockets,
- `SEARCH_SECRET` with clue + fail-forward,
- `NPC_FAVOR` with reachable dependency,
- `GUARDIAN` with motive + non-combat route,
- deliberate return/assembly,
- gate/climax only after assembly.

Work packages:
- NG0 architecture/spec freeze - documentation exists; patch-13 purpose contract must be folded into specs before runtime,
- NG1 graph data model + validator,
- NG2 Storylet Matrix,
- NG3 Crystal Machine planner,
- NG4 room materialization + knowledge,
- NG5 >=1000 structural cases,
- NG6 browser QA,
- NG7 10-20 manual editorial playtests,
- NG8 accept/revise/abandon.

Do not convert another blueprint before NG8.

## Adventure Blueprint bank
Only `GLASS_HEART`, `WITCH_CAT`, `CRYSTAL_MACHINE`, `ZOMBIE_DELIVERY`. Do not expand now.

## REPOSITORY HEALTH GATE
Behavioral reconstruction works, but original V0.12.3 is not byte-reproduced from Library representation and complete runtime asset tree is not ordinary repo state.

## EXACT NEXT
While physical UX5A is open:
- patch only UX5A defects on runtime branch,
- physically test patch-13 candidate,
- Narrative Graph prep remains documentation-only,
- do not merge UX5A,
- do not implement Narrative Graph runtime,
- do not start UX5B.

When UX5A is physical GREEN:
1. document evidence,
2. rerun/confirm automated + browser regression,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start WP-NG1.
