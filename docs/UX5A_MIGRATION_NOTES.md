# UX5A migration notes

`migrateState()` calls encounter enrichment when an existing save is loaded. UX5A must therefore be idempotent.

Required behavior:
- existing `room.search` state is preserved on reload; search attempts, reveal state and taken state must not reset,
- searchable rooms are planned only when the dungeon has no UX5A search state yet,
- existing generated monster encounters from older saves are normalized from legacy 1–2 heart scales to the new 3–4 heart scale while preserving already-recorded damage count,
- existing non-treasure encounters receive a progress track only when they do not already have one,
- no state schema bump is needed because the new fields are optional nested runtime fields and state version 12 remains backward compatible.
