---
title: Saltmarsh Road rota board
section: team
subject: The staff of Saltmarsh Road Community Clinic, a fictional neighbourhood clinic with 14 mostly part-time people, shown so patients know who is in on which day.
aesthetic: The reception rota board made public. A wipe-clean board on plaster-pink corridor paint, aubergine chart ink, and a fluoro-lime highlighter that marks the chosen day and is drawn down its column row by row.
mode: light
fonts:
  - Ysabeau Infant (Google Fonts, variable wght 300..700, roman only), the only family
js: none
libraries: []
tags: [team, rota, schedule, healthcare, css-only, has-selector, popover, sticky-header, highlighter, accessible]
use_when:
  - A team whose members work on different days, and the question people actually have is "who is in when".
  - Clinics, practices, libraries, advice centres, community services with part-time staff and a phone booking line.
  - You need a team section with no JavaScript at all.
avoid_when:
  - Everyone works the same hours; the day columns would carry no information.
  - Portrait photography is the point (a studio, an agency).
  - More than about 25 people: the board gets long and the row-by-row draw takes too long to read as a single gesture.
---

## Why it works

- **The one bold idea: the picker is the column-header row.** The seven radios (All week, Mon to Sat) sit on the same grid template as every person row, so each day label is exactly above its hours. Choosing a day slides a lime highlighter cap to that label, then fills that column in row by row from the top of the board down, like a highlighter drawn down a staff rota, with a slightly darker felt-tip end on the last row. The brief's "sticky note" became this highlighter cap, because the board is a wipe-clean rota and a highlighter is what reception would mark it with. It answers the real patient question, "if I come in on Thursday, who can I ask for?", with no script: radios, `:has()` and transform transitions with a per-row `--i` delay.
- **A pen moving down the rota, not a flash.** Each hours cell has a lime `::before` at `scaleY(0)` from the top; the chosen day's cells go to `scaleY(1)` over 0.22s, each row 45ms after the one above (`--i` is set inline, 0 to 13). An earlier single full-height stroke drew the visible part of a 1,665px board in about 120ms and read as a flash, and on phones it ran under names and group headings. From 700px the fills reach through the row padding and rule, so each discipline group reads as one continuous mark; on phones the lime sits only in the hours cells. The day's sentence sits directly under the picker, so the answer is on screen the moment the day is picked.
- **Off rows are told in text as well as colour.** People who are not in on the chosen day go from ink to mauve-grey pencil (6.4:1 on the board), their tile turns from filled to outline, and a line reads "Off Thursday". That line is reserved in every row (empty on All week), so picking a day never shifts the board. Opacity dimming was rejected because it drops text to about 3:1.
- **A sentence per day that a patient can act on.** Right under the picker, the line changes to that day's practical detail (late clinic until 8 pm, baby clinic drop-in, Saturday walk-in). It replaced a "9 of 14 in" counter, which was a stat-tile reflex.
- **Portraits are typographic.** Initials tiles in ink, no discipline colour coding (the group headings already carry the discipline), `aria-hidden` because the name sits next to them.
- **One card, the popover.** Each name is a `<button popovertarget>` that opens a native popover card (`role="group"`, an h3): what to ask that person about, the days in words, languages, "Call to book with Dr Okafor" (tel:; "Call and ask for Bev" for the front desk) and "Back to the team". The card is deliberately non-modal: with no JavaScript there is no focus trap or inert page, so it has no scrim and does not claim to be a dialog; it floats on a shadow and the page stays usable behind it. Escape and Back return focus to the name; a click outside closes it natively (focus then goes to the page, which needs script to change). Under 700px the card is a bottom sheet. The whole name-and-role block is the tap target (a stretched `::after` on the button), so the target is at least 44px tall on phones.
- **The header earns the right column.** From 1024px the intro uses the board's `--cols`: title and lede on the left, and the booking line, a key to the hours ("1–8 means 1 pm to 8 pm; a dot means not in") and the interpreter note in the 25.5rem track above the day columns. The day labels are drawn as tabs with a lime stub, like an uncapped pen, so they read as tappable before anyone touches them; the legend says "Pick a day to see who is in" in ink.
- **Ysabeau Infant for every reader.** Its single-storey a and g were drawn for early readers, which suits a clinic whose patients have every level of literacy and many first languages. Weights: 300 for the intro, 400 for body and cells, 500 for names, day labels and group headings, 600 for the H2 and initials, 700 for the chosen day label. Figures are set with `lining-nums` so the times read as a grid. Font check (2026-10-24): `grep -ril ysabeau designs/*/design.md` finds only story-mechanical-watch, which uses the sibling Ysabeau Office for body and readouts, not Ysabeau Infant. Lexend (nav-city-services, crud-gradebook), Readex Pro and Inclusive Sans (faq-pharmacy, crud-gradebook mentions) were ruled out because other designs already use them for the same reading-ease reason. Ysabeau Infant renders cleanly at the 14px cell size, so the Inclusive Sans fallback was not needed.
- **Plaster pink, aubergine, raspberry and lime.** The first palette (grey-green, slate, teal, yellow) matched team-research-lab and team-rowing-club. This one is warm corridor plaster with a lime highlighter, a pairing no other team design uses. Contrast, measured: ink #2A1F33 is 15.3:1 on the board, 12.2:1 on the wall and 12.1:1 on lime; pencil #66596B is 6.4:1, 5.1:1 and 5.1:1; raspberry #8E1F4C is 8.4:1 on the board and 6.7:1 on the wall, so the 2px focus ring clears 3:1 on both grounds; board text on the raspberry call button is 8.4:1, and on the ink hover fill 15.3:1. Lime and its felt-tip end are fill only.
- **Names are not reused.** Dr Piotr Zieliński, Bernadette Quigley and Kavitha Sundaram replace names that collided with the theatre and rowing team designs (a Wilk is already in team-rowing-club).

## Motion

Tier: simple. HTML and CSS only, no JavaScript. Ambient motion: none; the one allowed ambient slot is left empty. Every transform or opacity transition sits inside `@media (prefers-reduced-motion: no-preference)`.

| # | Element | Technique (research/motion-techniques.md) | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| 1 | Highlighter cap on the day labels | NV4 sliding indicator, CSS version (`translate: calc(var(--n) * 100%) 0; scale: 1 var(--on)`) | Click or tap a day label, or arrow keys in the radio group | translate and scale 0.4s `--ease-out`. Back to All week the cap drops in place (scale 0.15s ease-in) and only then moves home, unseen | Jumps, no travel |
| 2 | Column fill (signature) | SC16 rule and mark draw-in, as a per-cell fill with a per-row delay | Same radio change | Each chosen-day cell `::before` scaleY 0 to 1 from the top, 0.22s `--ease-pen`, delay `calc(.12s + var(--i) * 45ms)` (the cap moves first); the last row lands at about 0.9s. Clearing: 0.15s ease-in, no delay | Shown at once, no draw |
| 3 | Off-day rows | State change, not motion | Same radio change | color, border-color, background-color 0.25s ease on name, role, tile and about text; the reserved "Off …" line fills by `content` | Instant |
| 4 | Day sentence | TR1 caption swap, CSS version: seven spans stacked in one grid cell | Same radio change | In: opacity and translateY(.5em) 0.45s `--ease-sheet`, 0.1s delay; out 0.15s | Instant swap |
| 5 | Name buttons, header phone link | HV2 directional underline sweep over a resting underline | `:hover` (fine pointer), `:focus-visible` | A 1px light-raspberry underline is always there (so links are not colour-only); on hover a 0.1em raspberry line enters from the left and leaves to the right, 0.4s `cubic-bezier(.35,0,0,1)` | The 1px underline at rest; hover and focus show the full line at once |
| 6 | Person cards | CD7 dialog open, CSS version: `[popover]` with `@starting-style` and `allow-discrete` (non-modal, no scrim) | Click a name | Open 0.4s `--ease-sheet` from translateY(12px) scale(.98) and opacity 0; close 0.2s ease-in. Under 700px a bottom sheet rising from translateY(24px) | Opacity only, 0.15s |
| 7 | "Call to book with …" | HV4 button fill from the entry edge, CSS-only | `:hover` (fine pointer), `:active` on touch | Ink fill scaleX 0.35s `--ease-out` in from the left, 0.25s out to the right | Colour swap only |
| 8 | Day labels, call and back buttons | MI1 press and release | `:active` | scale(.96) over 0.12s, release 0.35s `cubic-bezier(.34,1.56,.64,1)` | No scale |

`--ease-pen` (`cubic-bezier(.3,.15,.25,1)`) keeps the pen speed even through each cell; the stagger (`--stagger`, 45ms) carries the downward travel, so the column visibly fills from the top rather than appearing at once.

There are no scroll-driven effects and no reveals on enter. The picker row is `position: sticky` so the day headers stay above the rows while scrolling; that is layout. `html { scroll-padding-top: 7.5rem }` keeps keyboard focus clear of it (the picker is about 92px tall).

## Do not touch

- The picker, the intro (from 1024px) and every `.row` share `--cols`, and the day sub-grid is `repeat(6, minmax(0, 1fr))` in the picker and the rows. That shared template is what keeps each label over its hours and each fill in its column.
- The fill is per row with an `--i` delay; never one full-height element (it reads as a flash and runs under text on phones).
- The "Off …" line keeps its `min-height` so picking a day never shifts the board.
- Off rows use colour plus the "Off …" text plus the outlined tile. Never opacity.
- Each hours cell carries visually hidden text ("Thursday 1 pm to 8 pm", "Wednesday, not in") with the visible "1–8" `aria-hidden`. That is the reliable screen-reader path; the `aria-live` sentence swap is a bonus that some readers ignore when only CSS visibility changes.
- The hours in the cells, the `off-*` classes on each row, the "In on …" sentence in each card and the day sentences all come from one table (Saturday's walk-in names Dr Reyes and Joel, with Danny on the desk). Change them together. Dr Haidari's days (Mon, Tue, Thu) all overlap Dr Okafor's, because she supervises him.
- The board starts on All week, so all content is visible with no interaction.
- No `<form>`: this tier has no JavaScript, so booking goes through the tel: links.
- Every `tel:` link has `target="_blank" rel="noopener"`.

## Adapting

Change the tokens, then the people. Each row needs `style="--i:n"` (its order on the board, from 0), one `off-<day>` class per day the person is not in, six `<li>` cells (add `class="in"` to working days), and a matching popover card with the same id as the button's `popovertarget`. The day CSS near the end of the style sheet has one selector per day in each of its lists. A five-day board deletes the Sat label, cell and selectors, changes `repeat(6, …)` to `repeat(5, …)`, the cap width from `100% / 6` to `100% / 5`, and the desktop day track (`25.5rem` = 6 × 4.25rem). Longer names wrap in the who column; keep board roles short (the card carries the full role). To retime the fill change the 0.22s, `--ease-pen` or `--stagger` (keep the last row under about 1s); to remove motion entirely, delete the `prefers-reduced-motion: no-preference` block, and the board still works as a pure state switch.

| Token | Role |
|---|---|
| `--c-wall` | Page background, the corridor plaster |
| `--c-board` | Board and card surface, tile initials |
| `--c-ink` | Text, filled tiles, the call-button hover fill |
| `--c-pencil` | Secondary text and people not in that day |
| `--c-accent` | Links, focus ring, the call button |
| `--c-mark` | The highlighter cap and column fill (fill only) |
| `--c-tip` | The felt-tip end on the last row's fill (fill only) |
| `--c-stub` | The lime tab stub under each unselected day label |
| `--c-line` | The resting 1px underline on names and the phone link |
| `--c-rule` | Row separators only |
| `--shadow-card` | Popover card shadow (no scrim) |
| `--f-sans` | Ysabeau Infant, the only family |
| `--fs-xs` … `--fs-xl` | Type scale: cells, roles, body, intro, names, H2 |
| `--s1` … `--s9` | Spacing scale on a 4px base |
| `--r-mark`, `--r-tile`, `--r-card` | Radii by role: highlighter, portrait tile, card (the call button is a pill) |
| `--cols` | The shared grid template, redefined at 700px and 1024px |
| `--tile` | Portrait tile size |
| `--row-pad` | Row padding; the fills reach through it |
| `--ease-out`, `--ease-sheet`, `--ease-press`, `--ease-pen`, `--stagger` | Motion timing |
