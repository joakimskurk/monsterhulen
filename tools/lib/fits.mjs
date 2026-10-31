// The matrix review (owner, 2026-10-28: «løsningen på tannpinen til en krokodille var å gi den en fjær»).
// A thing fits a figure when it has the tag the figure wants, unless the figure's card rejects that
// thing for that tag: it has the tag, but it makes no sense there (a cat does not eat apples).
// `id` is the card id of the thing: an item, a recipe or a source. Shared by the generator, the
// playthrough automaton, the DM page's table rules and its overview, so all of them agree.
export function rejectedFor(card, tag, id) {
  return !!id && (card?.rejects || []).some((r) => r.tag === tag && r.items.includes(id));
}
