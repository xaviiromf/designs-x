---
title: Seed checkout card
section: features
subject: Ashby Seed Library, a free community seed library in a public library that lends heirloom seeds to local gardeners and asks for saved seed back at harvest.
aesthetic: Library supplies on a seed-testing bench. A manila index-ruled checkout card with rubber band-dater stamps, laid on blue germination blotter paper.
mode: light
fonts:
  - Libre Franklin 400/500/600/700 (Google Fonts)
  - Barlow Condensed 600 (Google Fonts), only inside stamp impressions
js: Opens and closes the variety catalogue dialog from the lede button (native dialog showModal, closes on button, Escape or backdrop click).
tags: [library, lending, loop, index-card, stamp, ruled, scroll-driven, civic, gardening]
use_when:
  - The features are stages of a real loop or lifecycle (borrow, use, return; order, ship, renew) and you want to show who acts at each stage.
  - A civic, library, lending, rental or membership service whose own paperwork is a recognisable artefact.
  - You have four or fewer primary features with one or two short sentences each, plus up to three secondary ones.
avoid_when:
  - The features are parallel capabilities with no order. The card's rows imply a sequence.
  - More than five primary features. The card gets long and the ruled-baseline system becomes a chore to read.
  - Dark mode or a brand that must feel high-tech. The idea depends on paper, ink and multiply blending.
---

## Why it works

**The one bold idea: the feature list is a filled-in checkout card.** One manila card with index-blue rulings and a red header rule is made out to one specific lot (Cherokee Trail of Tears pole bean, lot 26-031, saved by Ruth Okafor). Its rows run Borrowed, Sown, Grown, Returned, which is the real season, and each row's Remarks cell holds one feature written about this lot: Sown carries the lot's germination test (9 of 10 sprouted in March), Grown says what these pole beans need. The test result appears once, in the gardener's row, not in the header. The card is the object that *is* the borrow-and-return loop, so the form explains the service before you read a word.

- **Ink only where the library acts.** Rubber date stamps sit only on Borrowed (violet, MAR 21 2026) and Returned (red, SEP 30 2026), the two moments the desk handles. Both are date-only, as a band dater prints; ink colour and row say which event it is. Sown and Grown are the gardener's rows and carry text only (their Desk cells hold a visually hidden "No stamp" so screen readers do not announce blank cells). The structure encodes who records what, and the six-month gap between the two dates is visible. (The Borrowed date is MAR 21, not the plan's MAR 14, on the art director's instruction, because 14 was already the date in four other designs.)
- **Two ink layers on the card.** The pre-printed form (the title, field labels, column heads) is in the printer's blue `--print`, a darkened `--rule`. What was filled in (field values at weight 500, stage names, remarks) is in `--ink`. That split is what makes it read as a card someone filled in rather than a styled table.
- **Text sits on the rulings.** Every line on the card is 28px (`--pitch`), and the blue rulings are a repeating gradient at the same pitch, offset by `--rule-y` so each line falls just under the baseline. Mixed sizes keep the 28px pitch because the smaller labels (13px) and larger stage names (21px) are inline spans with `line-height: 1` inside a 17px/28px line, so they share the line's baseline without growing it. Row separation is one blank ruled line (`padding-bottom: var(--pitch)`); only the Stage/Remarks/Desk column dividers are borders. The red header rule sits `--header-drop` (3px) lower than a blue ruling would, so the title's descenders clear it, as on a printed index card.
- **Grounded palette.** The page is the pale blue blotter paper seed labs germinate seeds on (`--blotter`), not cream. The card is library manila, the text a chosen green-black. Stamp violet appears only in the Borrowed impression (the link and focus ring are `--ink`, so violet keeps meaning "the desk stamped this"). Brick red appears in exactly two places: the header rule and the Returned stamp.
- **Library type.** Libre Franklin follows Franklin Gothic, the face of American library signage and supply catalogues, and sets everything people read. Barlow Condensed appears only inside stamps because band daters print a narrow gothic. That is also the only place uppercase appears, because a dater literally prints "MAR 21 2026".
- **Stamps look inked, not drawn.** No frames: a band dater prints only the date line, at 28px in Barlow Condensed. Each stamp uses `mix-blend-mode: multiply` so the rulings show through, a slight rotation (-4deg and +2.5deg), the inline SVG filter `#ink` (fine turbulence displaces the glyph edges by 2.5px, a low-frequency turbulence knocks out patches of ink), and a CSS `mask-image` gradient that thins the ink toward one end (`--ink-dir`, opposite on each stamp), as when a dater is pressed at a slight angle. The violet is saturated (#4B2FA0) so it still reads violet after multiply. They sit in the Desk column and overlap its divider by 8px, the way a hurried stamp does.
- **Quiet around the card.** The heading (two plain sentences, 30 to 40px at weight 600, one sentence per line on desktop), intro, one link and three secondary features are plain left-aligned text with no boxes, icons or numbers, so the card stays the loudest thing on the page. At 1100px and wider the left column holds all of this text: the lede at the top and the secondary features as a single 34ch column at the bottom, so the two columns balance and the card stands alone on the right. Below 1100px the secondary features follow the card, aligned to its left edge (a two-column title-plus-paragraph list from 600px). Never a three-up features row.
- **One motion.** Stamps press on (scale 1.18 to 1, fading in) as each one scrolls into view, using `animation-timeline: view()` inside `@supports` and `prefers-reduced-motion: no-preference`. Elsewhere they are simply there. There are no hover effects. The catalogue dialog opens without animation.
- **Honest copy.** The Returned row says a failed crop is still returned and recorded, which takes the fear out of "bring seeds back".

Reasoned exceptions to the collection's defaults: uppercase exists only inside stamp impressions (Default 5), because the dater prints it. The index rulings are not broadsheet hairlines (Default 3). They live only inside the card and carry the text baselines.

## Do not touch

- **The pitch system.** `--pitch` (28px) must equal the card's line-height, every vertical padding inside the card must be a multiple of it, and labels and stage names must stay inline with `line-height: 1`. A 12px margin or a block-level label will push every following line off its ruling.
- **`--rule-y`.** It is tuned to Libre Franklin's baseline at 17px/28px (21px). If you change the font or size, re-check at 2x zoom that glyphs sit just on the lines. If Google Fonts fails to load, the fallback stack (Franklin Gothic, Helvetica, Arial) shifts glyphs 1 to 2px off the rulings; self-host Libre Franklin where that matters.
- **Stamps on Borrowed and Returned only.** Adding stamps to every row turns information into decoration.
- **One card, one shadow, one rotation (`--card-tilt`, -0.6deg, 600px and wider).** Nothing else on the section is a box or has a shadow. Rotation is 0 on phones so edges never clip.
- **Stamp accessibility.** Each stamp is `role="img"` with a full-date `aria-label`, and its visible text is `aria-hidden`. The table keeps explicit ARIA roles because the phone layout sets it to `display: block/grid`, which can strip table semantics (they are redundant but harmless at desktop widths).
- **Headings.** The section starts at h2; the host page supplies the h1. The card's printed title "Ashby Seed Library" is an h3, and the secondary features are h3s after it.
- **The catalogue button.** "Browse all 214 varieties" is a real `<button>` that opens a native `<dialog id="catalogue">` (a short card-file list on `--manila`). It is the only interactive element besides the dialog's close button; both have a 3px `--ink` focus ring. The dialog closes with its button, Escape or a click on the backdrop, and focus returns to the opener (native behaviour). It is the one transient exception to "nothing else is a box". Never swap it for a link to a path that does not exist.
- **The filter is defined once** in a zero-size inline SVG at the top of `<body>`. Stamps reference `url(#ink)`, so the id must stay unique on the page.
- **Reduced motion.** The animation lives entirely inside the `prefers-reduced-motion: no-preference` and `@supports` blocks, and the static state is the finished stamp.

## Adapting

Change the `:root` tokens first, then the copy. To send the catalogue button to a real catalogue, replace it with an `<a href="..." target="_blank" rel="noopener">` and delete the dialog and script, but only when that URL exists. Keep the artefact if the product has one: a rental agreement, a tool-library tag or a membership card can take the card's place with the same rows-plus-stamps logic. Stamp only the events the organisation records.

- **Copy.** Keep four rows of one to three sentences each, written about the one lot on the card. Remarks run about 48ch at desktop, so a row of five lines is the practical maximum. Header fields should be specific (a real lot, a person) and short enough not to leave one-word orphans on a phone; wrap logical phrases in `.nw` (nowrap) spans. Stamp text is a date only, so it fits the 8.5rem Desk column.
- **Layout.** At 1100px and wider the lede (row 1) and secondary list (row 2, aligned to the bottom) take columns 1 to 5; the card spans both rows in columns 6 to 12 (max 760px). Below 1100px everything stacks: lede, card, secondary list. Below 600px each table row becomes a grid: stage name and stamp share the first line (the stamp scaled to 0.85), remarks below, and column heads become visually hidden.
- **Catalogue dialog.** Edit the `<li>` rows (name, then drawer and saving note) and the count in the footer line; the dialog scrolls when the list outgrows the viewport.
- **Fields grid.** The header field grid's second column starts at `9rem + --s-3`, which matches where the Remarks text begins. If you change the Stage column width (`col.stage`), change both.

| Token | Role |
|---|---|
| `--blotter` | Page background (germination blotter blue) |
| `--manila` | Card stock |
| `--ink` | All text |
| `--ink-soft` | Secondary feature body |
| `--print` | The card's pre-printed layer: title, field labels, column heads (5.4:1 on manila) |
| `--rule` | Card rulings and column dividers (decorative) |
| `--violet` | Borrowed stamp only |
| `--red` | Card header rule and Returned stamp, nowhere else |
| `--shadow-ink` | Shadow colour, derived from `--ink` |
| `--card-shadow` | The single shadow on the card |
| `--radius-card` | 6px die-cut corners of the card |
| `--card-tilt` | The card's -0.6deg rotation (600px and wider) |
| `--font-text` | Libre Franklin and fallbacks, all reading text |
| `--font-stamp` | Barlow Condensed and fallbacks, stamps only |
| `--t-xs` | 13px printed labels (Variety, Lot, Stage) |
| `--t-sm` | 15px secondary feature body |
| `--t-base` | 17px body, card text, secondary feature titles (h3, weight 600) |
| `--t-md` | 21px stage names |
| `--t-stamp` | 28px stamp text |
| `--t-xl` | Fluid h2, 30 to 40px |
| `--pitch` | 28px card line-height and ruling interval |
| `--rule-y` | Offset of each ruling inside its band, tuned to the baseline |
| `--header-drop` | Extra drop of the red header rule below the title baseline |
| `--s-1` ... `--s-9` | Spacing scale, 4 to 112px |
| `--gutter` | Side gutter, 16px to 48px |
| `--container` | 1200px max content width |
