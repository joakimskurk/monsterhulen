# Monsterhulen — UI Symbols V1.1

Status: visual prep only.

`ui-symbols-v1_1.svg` is a small monochrome SVG symbol sprite for functional UI. It deliberately contains no world/story art and no embedded text.

Included IDs:
- `mh-map`
- `mh-eye`
- `mh-backpack`
- `mh-narrator`
- `mh-lock`
- `mh-blocked`
- `mh-current`
- `mh-visited`
- `mh-travel`
- `mh-clue`
- `mh-trade`
- `mh-friend`
- `mh-guardian`
- `mh-reward`

Usage pattern:

```html
<svg class="mh-icon" aria-hidden="true">
  <use href="visual/ui-symbols-v1_1.svg#mh-eye"></use>
</svg>
<span>SE DEG RUNDT</span>
```

Rules:
- icons supplement visible labels for primary actions;
- do not use icon-only controls unless the action is universally clear and has an accessible name;
- state icons never reveal hidden state;
- `mh-current` belongs at room level, never on every underlying grid cell;
- `mh-lock` communicates known locked state, not the solution;
- use CSS `color` when the sprite is embedded/used in a context that supports `currentColor`;
- keep a minimum 24px drawn icon inside >=48px interactive targets.
