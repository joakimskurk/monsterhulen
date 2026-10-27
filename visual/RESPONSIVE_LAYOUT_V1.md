# Responsive Layout V1

Status: visual prep.

## Tablet landscape — primary target
Target working canvas: roughly 1024x768 through modern iPad landscape sizes.

Layout:
- top chrome: compact brand + global actions,
- main: map 58–62%, current-room panel 38–42%,
- bottom HUD: hero + hearts | inventory | 3 large semantic actions,
- Forteller entry visible but visually subordinate to child actions.

Map and room panel should fit without page-level horizontal scrolling.

## Small tablet / large mobile landscape
At <=980px CSS width:
- main becomes one-column if the right panel would become too narrow,
- room panel follows map,
- HUD wraps actions to their own row,
- touch targets stay >=48px.

## Portrait mobile
At <=720px:
- one main surface at a time is preferred,
- tabs: `KART`, `ROM`, `RYGGSEKK`, `FORTELLER`,
- room text remains readable before optional art detail,
- inventory scrolls horizontally or uses 3-column grid,
- no interaction requires hover,
- map selection must remain possible with thumb-scale targets.

The current UX5A mobile panel system remains authoritative until a post-gate renderer intentionally replaces it.

## Text scaling
Do not use image text. Browser text must survive at least 200% zoom without loss of core actions.

Recommended minimums:
- body: 15–16px on story panels,
- labels: 11–12px only for secondary metadata,
- buttons: 13–16px depending on width,
- room title: 24px+ tablet, 20px+ mobile.

## Safe areas
Respect `env(safe-area-inset-*)` for iPad/iPhone browser chrome and standalone/PWA use.

## Orientation
Do not lock orientation in V1. Landscape is visually preferred for shared tabletop play, but portrait must remain functional.
