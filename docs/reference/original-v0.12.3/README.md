# Original: Monsterhulen V0.12.3 (siste ChatGPT-iterasjon)

Status: **REFERANSE, IKKE RUNTIME.** Lagt inn uendret 2026-10-28 på eierens ønske.

| | |
|---|---|
| Fil | `Monsterhulen_CONNECTIONS_V2_IMPLEMENTED.html` |
| SHA-256 | `3ca61d5cb668a889c85c3397a5f69d208086d4923c322a6512d962863a03c7fb` |
| Størrelse | 378 949 byte, 3 641 linjer, én selvstendig HTML-fil |
| Kilde | Eieren, via Telegram, 2026-10-28. Siste versjon før prosjektet ble flyttet fra ChatGPT til Claude. |
| Versjon i fila | «MONSTERHULEN V0.12.3 PLAYTEST UX3 · ADVENTURE CODE V1 · STATE 12 · ASSET CONTRACT 2.4.0» |

## Hva den er brukt til

Den er malen for kartet i V2. Kartet består av rom i ulike størrelser på et rutenett, med dører på delt vegg og én dør per side. Romnavn og stemning per sone kommer også herfra. Se `tools/runsim/map.mjs`, `content/places.json` og `DECISIONS.md` (2026-10-28).

Relevante steder i fila:

| Linjer | Innhold |
|---|---|
| ca. 465–745 | «EVENTYRKRYPER V0.4 PROCEDURAL DUNGEON CORE»: rutenett, romformer, dører på delt vegg, låst dør og nøkkel |
| ca. 748–960 | «WORLD PLANNER»: soner, romnavn og stemning, snarveier og hemmelige vegger |
| ca. 3040–3090 | Kartet tegnet som felt, med dører, tåke og «?» ved utgangene |
| ca. 2955–2980 | Popup for ting og figurer |

## Forholdet til M0 (`index.html`)

Dette er **ikke** patch-15-kandidaten som `ROADMAP.md` (M0) venter på. Sjekksummen er en annen: kandidaten har `f8e9998f…`, og denne fila har `3ca61d5c…`. Fila er en egen variant av V0.12.3 («CONNECTIONS V2»). Om den skal bli runtime, eller bare stå som referanse ved siden av kandidaten, er eierens valg. Til da endres den ikke.
