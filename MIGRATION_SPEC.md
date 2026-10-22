# MONSTERHULEN - PRODUCT / SAVE MIGRATION SPEC V0.12.2

## MÅL

Flytte det synlige produktet fra Huler og Drager / tidligere Eventyrkryper til **Monsterhulen** uten å miste eksisterende lokale saves.

## LÅST STRATEGI

- Synlig navn i aktiv UI er `MONSTERHULEN`.
- Ny kanonisk lagringsnøkkel er `monsterhulen_v120`.
- Save-schema forblir state 12. Navnebyttet er ikke en gameplay/schema-migrering.
- `eventyrkryper_v100` er første legacy-nøkkel i migreringskjeden, etterfulgt av eldre nøkler.
- Ved oppstart leses ny Monsterhulen-nøkkel først. Hvis den mangler, leses legacy-nøklene.
- Gyldig legacy-save normaliseres med eksisterende migreringslogikk og skrives til `monsterhulen_v120`.
- Legacy-nøkkelen slettes ikke automatisk. Dette gjør migreringen reversibel og minimerer risiko for datatap.
- Full reset fjerner både ny nøkkel og legacy-nøklene.

## IKKE OMDØPT I DENNE PASSEN

Interne JavaScript-API-er som `EventyrGenerator`, `EventyrWorld`, `EventyrEncounters`, `EventyrProgression` og `HulerCharacterSystem` beholdes. De er ikke synlige for spilleren, og rename ville skape unødvendig regresjonsrisiko uten produktgevinst.

Historiske handoff- og testrapporter beholder navnene de hadde da de ble skrevet.
