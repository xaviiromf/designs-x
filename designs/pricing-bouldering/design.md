---
title: Tape on the wall
section: pricing
subject: Membership plans (day pass, 10-visit card, monthly) for Brickfield Bouldering, a fictional neighbourhood bouldering gym.
aesthetic: Indoor climbing gym signage. Slate-grey painted plywood, Sharpie ink and hand-torn coloured route-setting tape, laid out like the circuit chart by the front desk.
mode: light
fonts:
  - Archivo, variable wdth 62-125 and wght 100-900 (Google Fonts)
  - Permanent Marker (Google Fonts), plan names on the tape only
js: Opens a native <dialog> checkout from each buy button (focus moves into it and returns to the button on close), handles its form with preventDefault and shows an in-dialog confirmation with a Back to prices button.
tags: [pricing, rows, sport, climbing, gym, handwritten, tape, colour-coded, membership, dialog]
use_when:
  - A small physical venue or club (climbing or bouldering gym, dance studio, makerspace, pool) sells two to four plans that differ by how often you come.
  - Each plan can honestly be compared on one number, such as cost per visit or per session.
  - The brand is local, hands-on and informal, and a handwritten label fits its world.
avoid_when:
  - More than four plans, or a feature matrix with many yes/no cells. Use a comparison table instead.
  - SaaS tiers, finance, healthcare or legal pricing, where marker tape reads as unserious.
  - You need a monthly/annual toggle or a highlighted recommended plan.
---

## Why it works

**The bold idea: each plan name is handwritten in marker on a hand-torn, crooked strip of route-setting tape.** In a bouldering gym, setters tag the start hold of every new problem with coloured tape and a marker, and tape colour tells you which circuit a problem belongs to. Here colour means plan, so the three rows read like the circuit chart pinned by the front desk: yellow, green, pink, ordered from least to most commitment. Anyone who has climbed indoors recognises it at once, and anyone who has not still sees three clearly separated, colour-coded choices.

- **Tape torn to fit the word.** Each strip is `width: max-content` plus its own tail (`--tail`: 22, 38, 28px), so the three strips have different lengths, as a setter tears them. The left end is cut square (tape comes off the roll clean); the right end is a mostly diagonal tear with two or three small irregular steps, drawn by a per-row `clip-path` (`--tear`), so no two tears match. Each strip has its own rotation (`--r`: -2.1deg, 1.6deg, -1.7deg), enough to look stuck on by hand.
- **Rows, not cards.** On desktop `.inner` defines one grid, and the header, `.plans` and every `<article class="plan">` are `subgrid`s of it. Price, details and buttons line up vertically across plans, and the lede starts on the same line as the details column. There are no boxes, borders or rules: the tape strips are the row markers and 48px of plain wall (`--bolt`) separates rows.
- **Honest comparison, in one place.** Each price block has the same three lines: the figure (`£13`, `£110`, `£52`, tabular), what it buys (`a day`, `for 10 visits`, `a month`) in pencil, and the cost per visit in ink 600 (`£13 a visit`, `£11 a visit`, `About £4 a visit at 3 sessions a week`). Read down the column and you are comparing the same thing. The lede gives the decision rule the numbers support: more than four visits a month and monthly is cheaper.
- **No "most popular" badge.** The monthly plan is not raised or highlighted; one detail line states the fact instead ("Three sessions a week is how most of our regulars climb").
- **Quiet around the loud thing.** The tape is the only rotated, coloured or handwritten element, and the strongest colour on the page. The h2 is Archivo 700 at 108% width, clamp(30px, 3.6vw, 44px), with `text-wrap: balance`. Buttons are a 2px ink outline on the wall that fills with ink on hover and focus, so the three stacked full-width buttons on phones do not outweigh the tape. Prices keep Archivo 800 at 125% width (sports and gear signage), because the price is the content.
- **Slate painted wall, not cream or app grey.** `--wall` #C5CCD3 is a cool slate grey like painted plywood. It is mid-light, so the saturated tape colours pop by hue and chroma, while ink stays at 10.1:1.
- **First-timers find the induction.** The free safety induction sits in the day pass details, where someone new will look, not in the fine print.
- **Phone: the tape bleeds off the left edge.** A negative margin equal to the gutter pushes each strip to the screen edge, as if wrapped round the edge of the wall. The strips stay max-content, so the torn right end stays inside the gutter. Buttons go full width.
- **Baselines (from 1100px).** Each row uses `align-items: baseline`, so the marker text, the price figure, the first detail line and the button label share a baseline. The tape is aligned before rotation, so its baseline drifts by a few pixels on purpose.
- **Cut at critique:** a faint T-nut hole dot grid on a 48px pitch (it read as a generic dot-grid background and competed with the prices), and a woven "gaffer sheen" gradient on the tape (invisible on screenshots, so it encoded nothing). The 48px bolt pitch survives as the row gap and padding rhythm.

## Do not touch

- **The tape stays the only expressive element.** Do not use Permanent Marker for the h2, prices or buttons, do not rotate anything else, and do not use the tape colours anywhere except their tape. Colour here is information (one colour per plan), never decoration. Do not make the h2 heavier or wider, or the buttons solid by default; both outshout the tape.
- **Tape sized to its word.** Never give the strips a shared fixed width or `justify-self: stretch`; equal strips read as table cells or label chips.
- **One colour per plan, ordered from least to most commitment.** Do not add a "recommended" highlight; do not reorder rows by price.
- **The plan name is the `<h3>` and lives inside the tape.** It must remain real text so screen readers read it as the heading. Each `<article>` is `aria-labelledby` that h3.
- **Rows, not cards.** No borders, backgrounds, radii or shadows on rows. No hairline rules between them. The only radius in the design is the button's `--radius`.
- **The shared subgrid.** `.inner` defines the columns; the header, `.plans` and each `.plan` are `grid-template-columns: subgrid`. Replacing them with separate grids breaks the alignment between the lede, the plans and each other.
- **The per-visit line in every price block.** Same position, same wording pattern. It is the question people actually ask at the desk.
- **Ink on tape contrast.** Ink on yellow is 10.1:1, on green 6.5:1, on pink 6.6:1. If you change a tape colour, keep ink-on-tape at 4.5:1 or above; mid greens and pinks drop below quickly.
- **Phone bleed.** The tape's negative left margin must equal `--gutter`, and its padding-left must add the gutter back, or text will touch the screen edge or the page will scroll sideways. `.wall` has `overflow-x: clip` only to trim the rotated corners; check `document.documentElement.scrollWidth <= innerWidth` after changes rather than trusting the clip.
- **The checkout dialog.** The buy controls are real `<button>`s that open the single shared `<dialog id="checkout">` via `showModal()`; keep it native so focus trapping, Escape and focus return to the opener come for free. The form must keep `preventDefault` (this page is shown in an iframe on GitHub Pages where any POST returns 405). On submit, focus moves to the confirmation heading, and "Back to prices" closes the dialog. The dialog has no radius, no tape colours and no shadow; it only borrows ink, wall and the button style. `margin: auto` on `.checkout` is required because of the global `margin: 0` reset.
- **No motion.** Tape is not animated on. The only state change is the button filling with ink on hover and on keyboard focus (transition disabled under `prefers-reduced-motion`). Focus also shows a 3px ink outline at 3px offset (`--focus-w`).
- **`role="list"` on `.details`.** `list-style: none` makes Safari/VoiceOver drop list semantics; the role restores them.

## Adapting

1. **Tokens first.** Set `--wall` to the venue's real wall or floor colour (keep it a mid-light neutral so the tape can pop; never pure white). Set `--ink` to a dark that passes 4.5:1 on the wall and on all three tapes. Set `--tape-1..3` to the venue's real circuit or zone colours.
2. **Copy.** Plan names must be short (one to two words, about 13 characters) to fit the strip in marker, and should share a grammatical form (all nouns: "Day pass", "10-visit card", "Monthly"). Keep the price figure short (£ and up to three digits). The unit says what the price buys ("a day", "for 10 visits", "a month"). The per-visit line always comes next and always says cost per visit or session. Details are two to four short plain sentences. Buttons name the exact action ("Buy a 10-visit card"), no arrows. The lede should state the decision rule your numbers support.
3. **More or fewer plans.** Two to four rows work. For a fourth, add a `--tape-4` token and `.plan:nth-child(4) .tape { --c: var(--tape-4); --r: 1.9deg; --tail: 30px; --tear: polygon(...); }` with its own tear (square left end, diagonal right end with two or three irregular steps). Alternate the rotation sign between neighbours and keep it between 1.5 and 2.5deg.
4. **Breakpoints.** Below 900px: stacked rows (tape, price, details, button). 900-1099px: three columns; tape and price span two rows so the button sits right under the details. 1100px and up: four columns, buttons left-aligned at the start of the last (max-content) track. If your longest button label is longer than about 30 characters, raise the 1100px breakpoint. From 600px to 899px the single column leaves wall to the right; that is intended (the chart reads top to bottom).
5. **Checkout.** The buy buttons open an in-page dialog that collects an email and confirms (nothing is sent anywhere). To go live, replace the submit handler's confirmation with a call to your booking or payment endpoint (still with `preventDefault`), or turn the buttons into `<a href="https://..." target="_blank" rel="noopener">` links to your hosted checkout and delete the dialog and script. Plan name, price and per-visit text in the dialog are read from the plan row, so no copy is duplicated.
6. **Another handwritten source.** For a different venue the "tape" can become another real labelling material from that world (a masking-tape label on a pool lane board, chalk on a slate), but keep exactly one such element per row and keep the rest quiet.
7. **Stack translation.** In React or Vue, map plans to `<article class="plan">` from data with `{ name, colour, price, unit, perVisit, details[], cta, href, rotate, tail, tear }`; set the tape's `--c`, `--r`, `--tail` and `--tear` as inline custom properties instead of `nth-child` if order may change.
8. **Fonts.** Both families load from Google Fonts with fallbacks (Helvetica Neue/Arial; Marker Felt/Comic Sans/cursive). The fallbacks have no width axis, so `font-stretch` is ignored and the h2, prices and buttons render narrower if Archivo fails to load. Nothing breaks.

| Token | Role |
|---|---|
| `--wall` | Page and section background: slate-grey painted plywood. Button text colour on hover and focus. |
| `--ink` | Headings, prices, per-visit line, body, marker text on tape, button outline and hover fill, focus ring. |
| `--pencil` | Price units and fine print (6.0:1 on the wall). |
| `--tape-1` | Yellow tape: first, lowest-commitment plan (day pass). |
| `--tape-2` | Green tape: middle plan (10-visit card). |
| `--tape-3` | Pink tape: highest-commitment plan (monthly). |
| `--font-sans` | Archivo: everything except the plan names. Uses `font-stretch` 100-125%. |
| `--font-marker` | Permanent Marker: plan names on the tape only. |
| `--fs-fine` | 14px fine print. |
| `--fs-button` | 16px button label, Archivo 650 at 110% width. |
| `--fs-body` | 17px body, details, price units and per-visit line. |
| `--fs-lede` | 20px lede. |
| `--fs-tape-sm` | 26px marker text below 900px. |
| `--fs-tape` | 30px marker text from 900px. |
| `--fs-h2` | clamp(30px, 3.6vw, 44px) section heading, 108% width, 700 weight. |
| `--fs-price` | clamp(40px, 4.4vw, 53px) price figures, 125% width, 800 weight. |
| `--s-1` ... `--s-9` | Spacing steps 4, 8, 12, 16, 24, 32, 48, 72, 96px. |
| `--bolt` | 48px bolt pitch: gap between rows and before the fine print. |
| `--gutter` | Side gutter: 16px on phones, 48px from 900px. Also the tape's left bleed on phones. |
| `--pad-y` | Section top and bottom padding: 48px on phones, 96px from 900px. The section has no min-height. |
| `--max` | 1200px max content width. |
| `--radius` | 4px button radius, the only radius in the design. |
| `--border-w` | 2px button outline. |
| `--focus-w` | 3px focus outline width and offset. |
| `--c`, `--r`, `--tail`, `--tear` | Per-row tape colour, rotation, right-end padding and torn-end `clip-path`, set on `.plan:nth-child(n) .tape`. |
