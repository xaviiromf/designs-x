---
title: Saltmarsh Road rota board
section: team
subject: The staff of Saltmarsh Road Community Clinic, a fictional neighbourhood clinic with 14 mostly part-time people, shown so patients know who is in on which day.
aesthetic: The reception rota board made public. A wipe-clean board on lilac-grey corridor paint, with a yellow sticky note that marks the chosen day and highlights its column top to bottom.
mode: light
fonts:
  - Noto Sans 400, 500, 600 (Google Fonts, variable wght 400..600), the only family
js: none
libraries: []
tags: [team, rota, schedule, healthcare, css-only, has-selector, popover, sticky-header, accessible]
use_when:
  - A team whose members work on different days, and the question people actually have is "who is in when".
  - Clinics, practices, libraries, advice centres, community services with part-time staff and a phone booking line.
  - You need a team section with no JavaScript at all.
avoid_when:
  - Everyone works the same hours; the day columns would carry no information.
  - Portrait photography is the point (a studio, an agency).
  - More than about 25 people: the board gets long and the column draw-down stagger stops reading as one gesture.
---

## Why it works

- **The one bold idea: the picker is the column-header row.** The seven radios (All week, Mon to Sat) sit on the same grid template as every person row, so each day label is exactly above its hours. Choosing a day slides a yellow sticky note to that label, then fills the column below it from the top of the board down, row by row (`--i` per row times a 22ms stagger), like a highlighter drawn down a staff rota. It answers the real patient question, "if I come in on Thursday, who can I ask for?", with no script: radios, `:has()` and transform transitions.
- **Off rows are told in text as well as colour.** People who are not in on the chosen day go from ink to pencil grey (still 6.6:1 on the board), their tile turns from filled to outline, and a line reads "Not in on Thursday". Opacity dimming was rejected because it drops text to about 3:1. "Not in" replaces "Off", which patients can read as "off sick".
- **A sentence per day that a patient can act on.** Under the board, the line changes to that day's practical detail (late clinic until 8 pm, baby clinic drop-in, Saturday walk-in). It replaced a "9 of 14 in" counter, which was a stat-tile reflex.
- **Portraits are typographic.** Initials tiles in ink, no discipline colour coding (the group headings already carry the discipline), `aria-hidden` because the name sits next to them.
- **One card, the popover.** Each name is a `<button popovertarget>` that opens a native popover card: what to ask that person about, the days in words, languages, the reception number as text, "Call reception and ask for Dr Okafor" (tel:) and "Back to the team". Escape, light dismiss and focus return are native. Under 700px the card is a bottom sheet.
- **Noto Sans for names from everywhere.** The plan named Lexend and the art director then named Inclusive Sans, but both are already the only family in other designs in the collection (nav-city-services, faq-pharmacy and crud-gradebook use Inclusive Sans; Lexend and Readex Pro are taken too). Noto Sans is unused in the collection, is plain and very legible at small sizes, and was built to cover every script, which suits a clinic whose staff and patients speak Igbo, Polish, Dari, Tamil, Yoruba, Arabic and Mandarin. Intro at 400 (not 300, too thin for weak readers), names and group headings at 500, H2 at 600.
- **Violet and yellow on lilac-grey.** The palette avoids the grey-green ground plus teal plus yellow used by several other designs; the violet-yellow complement is this design's own.

## Motion

Tier: simple. HTML and CSS only, no JavaScript. Ambient motion: none; the one allowed ambient slot is left empty. Every transform or opacity transition sits inside `@media (prefers-reduced-motion: no-preference)`.

| # | Element | Technique (research/motion-techniques.md) | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| 1 | Sticky note on the day labels | NV4 sliding indicator, CSS version (`translateX(var(--n) * 100%) scaleY(var(--on))`) | Click or tap a day label, or arrow keys in the radio group | transform 0.4s `--ease-out`; rests at `scaleY(0)` on All week | Jumps, no travel |
| 2 | Column draw-down (signature) | SC16 rule and mark draw-in adapted to a cell fill, plus TR3 ripple-by-distance stagger | Same radio change | Each cell `::before` `scaleY(0)` to `1` from the top, 0.32s `--ease-out`, delay `.1s + var(--i) * 22ms`; clearing 0.15s ease-in, no delay | Instant, no stagger |
| 3 | Off-day rows | State change, not motion | Same radio change | color, border-color, background-color 0.25s ease; "Not in on …" line toggles by display | Instant |
| 4 | Day sentence | TR1 caption swap, CSS version: seven spans stacked in one grid cell | Same radio change | In: opacity and translateY(.5em) 0.45s `--ease-sheet`, 0.1s delay; out 0.15s | Instant swap |
| 5 | Name buttons, header phone link | HV2 directional underline sweep | `:hover` (fine pointer), `:focus-visible` | 0.07em underline enters from the left, leaves to the right, 0.4s `cubic-bezier(.35,0,0,1)` | Underline shown statically; touch shows a persistent underline |
| 6 | Person cards | CD7 dialog open, CSS version: `[popover]` with `@starting-style` and `allow-discrete` | Click a name | Open 0.4s `--ease-sheet` from translateY(12px) scale(.98) and opacity 0; backdrop fades in 0.3s; close 0.2s ease-in. Under 700px a bottom sheet rising from translateY(24px) | Opacity only, 0.15s |
| 7 | "Call reception and ask for …" | HV4 button fill from the entry edge, CSS-only | `:hover` (fine pointer), `:active` on touch | Ink fill scaleX 0.35s `--ease-out` in from the left, 0.25s out to the right | Colour swap only |
| 8 | Day labels, call and back buttons | MI1 press and release | `:active` | scale(.96) over 0.12s, release 0.35s `cubic-bezier(.34,1.56,.64,1)` | No scale |

There are no scroll-driven effects and no reveals on enter. The picker row is `position: sticky` so the day headers stay above the rows while scrolling; that is layout.

## Do not touch

- The picker and every `.row` share `--cols`, and the day sub-grid is `repeat(6, minmax(0, 1fr))` in both. If the two drift apart the labels stop sitting over their hours, which is the whole idea.
- Off rows use colour plus the "Not in on …" text plus the outlined tile. Never opacity.
- Each hours cell carries visually hidden text ("Thursday 1 pm to 8 pm", "Wednesday, not in") with the visible "1–8" `aria-hidden`. That is the reliable screen-reader path; the `aria-live` sentence swap is a bonus that some readers ignore when only CSS visibility changes. The legend's hidden "(changes the board below)" warns that the board updates.
- The hours in the cells, the `off-*` classes on each row, the "In on …" sentence in each card and the day sentences all come from one table. Change them together.
- The board starts on All week, so all content is visible with no interaction.
- No `<form>`: this tier has no JavaScript, so booking goes through the tel: links.
- Every `tel:` link has `target="_blank" rel="noopener"`, and the card says the number in text, because every link dials the same reception line.

## Adapting

Change the tokens, then the people. Each row needs `--i` (0 to n-1, in DOM order), one `off-<day>` class per day the person is not in, six `<li>` cells (add `class="in"` to working days), and a matching popover card with the same id as the button's `popovertarget`. The day CSS block near the end of the style sheet repeats once per day; a five-day board deletes the Sat label, cell and rule, and changes `repeat(6, …)` to `repeat(5, …)` and the desktop day track (`25.5rem` = 6 × 4.25rem). Longer names wrap in the who column; long roles are fine. To retime the draw-down change `--stagger` (keep the total under about 0.6s); to remove motion entirely, delete the `prefers-reduced-motion: no-preference` block and the board still works as a pure state switch.

| Token | Role |
|---|---|
| `--c-wall` | Page background, the corridor paint |
| `--c-board` | Board and card surface, tile initials |
| `--c-ink` | Text, filled tiles, the call-button hover fill |
| `--c-pencil` | Secondary text and people not in that day |
| `--c-accent` | Links, focus ring, the call button |
| `--c-note` | The sticky note and column fill |
| `--c-rule` | Row separators only |
| `--c-scrim` | Popover backdrop |
| `--f-sans` | Noto Sans, the only family |
| `--fs-xs` … `--fs-xl` | Type scale: cells, roles, body, intro, names, H2 |
| `--s1` … `--s9` | Spacing scale on a 4px base |
| `--r-note`, `--r-tile`, `--r-card` | Radii by role: note, portrait tile, card (the call button is a pill) |
| `--cols` | The shared grid template, redefined at 700px and 1024px |
| `--tile` | Portrait tile size |
| `--ease-out`, `--ease-sheet`, `--ease-press`, `--stagger` | Motion timing |
