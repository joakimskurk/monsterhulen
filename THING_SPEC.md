# MONSTERHULEN - VARIGE TING V0.12.3

## PRINSIPP
Varige TING i Helteboka er ikke tallbonuser, bedre versjoner av startutstyr eller skjulte nøkler. De er varige fysiske idéverktøy som åpner bestemte typer fortellingsmuligheter.

Hver ting har stabil `id`, navn/beskrivelse, unik `role`, eksplisitt `limit` og minst to kuraterte encounter-hooks.

## DE 12 ROLLENE
1. `THING_FOLDING_SHOVEL` FOLDESPADEN - små hull, renner og underlag.
2. `THING_KNOTLESS_ROPE` TAUET SOM ALDRI FLOKER SEG - ledelinje gjennom trange/kronglete steder, ikke sterkere enn vanlig tau.
3. `THING_POCKET_MIRROR` LOMMESPEILET - plasserbar refleks og underside, ikke et bedre vanlig speil.
4. `THING_BUBBLE_BOTTLE` BOBLEFLASKA - bære/skjerme én liten ting i en seig boble.
5. `THING_POCKET_UMBRELLA` LOMMEPARAPLYEN - lite tak, skjerming og fangflate for lette ting.
6. `THING_STAR_SCOPE` STJERNEKIKKERTEN - lyspunkter, retning og mønster, ikke generell forstørrelse.
7. `THING_CHALK_CASE` KRITTETUIET - fargekode, grupper og rekkefølge, ikke bare mer kritt.
8. `THING_GRABBER_CLAW` GRIPEKLOA - fjernmanipulere småting.
9. `THING_MAGNET_STONE` MAGNETSTEINEN - teste og trekke små jernting.
10. `THING_FOLDING_LADDER` FOLDESTIGEN - kort stabil høyde, rampe eller bro.
11. `THING_REPAIR_KIT` LAPPESETTET - myke materialer, remmer og tråd, ikke maskinverktøy.
12. `THING_WINDUP_MOUSE` OPPTREKKSMUSA - distraksjon og ufarlig testrute.

## KOMPATIBILITET
Reward-ID-ene er uendret. Ved `normalizeHero()` oppdateres eksisterende lagrede TING-belønninger med kanonisk navn/beskrivelse fra dagens pool når ID-en er kjent. Andre rewards beholdes.

Save schema forblir state 12 under `monsterhulen_v120`, med `eventyrkryper_v100` som første legacy key.
