# Visual Roadmap V1

Status: **parallel visual prep only while UX5A physical gate is open**.

## V0 — complete on prep branch
- visual tokens,
- visual system rules,
- Asset Contract 2.4.0 extension rules,
- responsive layout contract,
- CSS-only skin for current UX5A DOM,
- interactive node-map vertical slice,
- static QA 14/0,
- Chromium node-map prototype 10/10,
- Chromium exact patch-15 DOM + skin 13/13.

## V1 — only after UX5A physical GREEN + merge
Integrate the safe skin first, without changing generator/state semantics.

Gate:
- automated gameplay regressions still green,
- current browser flows green,
- physical iPad/mobile readability/touch green.

## V2 — room-art production
Create presentation-only room assets by family. Do not bake text/state into art. Bind art deterministically to presentation tags, not story prerequisites.

## V3 — node-map renderer experiment
Replace only the presentation layer while canonical room IDs, connections, fog/reveal, lock/block/secret state and movement validation stay authoritative.

Must pass renderer parity before replacing current map.

## V4 — interaction-shell polish
Only when Narrative Graph reaches the package that actually implements shells. Visuals may present canonical actions; they never own hidden story logic.

## Explicit non-goals while UX5A is open
- no runtime merge,
- no Narrative Graph implementation,
- no UX5B,
- no Multiscreen,
- no new blueprint,
- no expansion of subject bank,
- no visual asset that implies unavailable story truth.
