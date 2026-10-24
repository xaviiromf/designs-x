---
title: Box-label search
section: faq
subject: The FAQ for Tallis Removals (fictional), a house-removals firm in Bristol with three-person crews, 3.5-tonne Luton vans and a storage warehouse in Avonmouth, for people two to six weeks before a move.
aesthetic: A moving box. One piece of double-wall kraft board with its flute showing at the cut edge, a printed "this way up" mark, and whatever you search written on it in marker, on a cool off-white page set in a condensed van-livery sans.
mode: light
fonts:
  - Mona Sans, variable wdth 75-100 and wght 400-700 (Google Fonts). Everything printed. H2 at wdth 75 / 700, group headings and the label heading at wdth 87.5 / 600, questions at 100 / 600, body and answers at 100 / 400, small print at 500.
  - Kalam 400 and 700 (Google Fonts). Hand-lettering, used only for the text typed into the search field and its placeholder.
js: One inline script filters the 24 answers live as you type (AND matching on every word over question, answer and synonym keywords, ignoring case and diacritics), marks the matched words, shows a one-line excerpt for answers that match only in their body, updates the group counts, the tally and the empty state, runs the APG disclosure toggles, and makes cross-links and hashes clear a hiding filter before opening and focusing their target.
libraries: []
tags: [faq, search, filter, accordion, disclosure, removals, moving, local-business, kraft, handwriting, light, simple]
use_when:
  - A service business whose FAQ is long enough (15 to 40 questions) that people search for one worry rather than read it all.
  - Questions fall into a few groups with a natural order, such as the stages of a booking, a trip or a move.
  - The brand has a physical object to borrow for the one search panel: a label, a ticket, a tag, a docket.
avoid_when:
  - Fewer than about ten questions. Search is the bold element, and it is pointless on a short list.
  - Brands where handwriting would read as unserious (banking, medical, legal).
  - Dark themes. The kraft board and the highlighter marks are tuned for a light page.
---

## Why it works

**The one bold idea: the search is the label on a moving box.** Top right sits a single piece of kraft board, turned -0.6deg like a label stuck on a box (flat under 600px). It has the double-wall flute showing along its top cut edge (two CSS radial-gradient rows of arcs between two liner lines) and the ISO "this way up" double arrow printed in ink in its corner. On it, printed in Mona Sans, is "Search our answers", and under that, a ruled ink line where whatever you type appears in Kalam marker, the way you write the contents on the side of a box. A printed tally below reads "Showing 3 of 24 answers". Nothing else on the page is kraft, and nothing else is handwritten.

- **Search answers the worry. Browsing is the fallback.** As you type, the list folds down to the matching questions. Matched words sit on static highlighter marks. An answer that matches only in its body shows a one-line excerpt under its question, so you see why it matched without opening a wall of panels. Matching needs every typed word, ignores case and accents, and also checks a `data-keywords` list of synonyms per item ("cost" finds the price question, "cancelling" finds cancel, "keyboard" finds piano). Group counts in the group row and in each group heading update live, and a group with no matches disappears.
- **The question indicator comes from the label.** Each question ends in a single arrow taken from the handling mark. It points down when the answer is closed and turns up when it is open, so the list speaks the same vocabulary as the label instead of using a generic plus.
- **Groups follow the order of a move**: Booking and quotes, Packing, Moving day, After the move. Document order carries the sequence, so nothing is numbered.
- **Empty is a direction, not a dead end.** "Nothing in our answers mentions "hot tub"" is followed by a shorter-word hint, office hours, a Clear search button and the phone and email links.
- **Cross-links that cannot fail.** Four answers link to another answer (completion to storage and to parking suspensions, boxes to collecting empties, breakages to claims). If the current search hides the target, the search clears first, then the target opens, scrolls into view and its button takes focus. A `#q-...` hash in the URL does the same on load.
- **Works without JavaScript.** The search field and the "Often asked" buttons are rendered only under `html.js`, because without a script they would be dead controls. Without JS the label keeps its printed heading and says "All 24 answers are open below", every panel is open (only `html.js .panel:not(.open)` collapses), and the group links are plain anchors.
- **Accessible structure.** `section[aria-labelledby]` with an h2; `form[role=search]` with a visible `label for` and `aria-describedby` pointing to the tally (`aria-live="polite"`); the group row is `nav[aria-label="Question groups"]`; group h3s carry ids and `tabindex="-1"`; each question is `h4 > button[aria-expanded][aria-controls]` (APG), so heading navigation lists every question; panels are `role=region` with `aria-labelledby` and get `inert` when closed. Enter in the field moves focus to the first visible question, or to the empty-state heading.
- **Palette checked for collisions.** Paper `#EFEDF0` is a cool, slightly violet off-white, not cream. Kraft `#BFA57F` with edge `#9C7E4E` is moving-box board, about ΔE 5 from nav-bakery's bag. Ink `#1E2A3F` is about 12.4:1 on paper and 6.11:1 on kraft; ink-soft `#4F5B6C` is 5.92:1 on paper and is never used on kraft; highlighter `#F4E04D` sits only behind search matches and behind cross-links on hover, with ink above 10:1.
- **Default 1 reasoned.** Kraft is warm, so it is held to one panel on a cool page, with a sans and no clay accent. Rows with 1px rules, but a single 68ch column with generous row padding, not newspaper columns.
- **Counts.** Mona Sans's tabular figures switch to a slashed zero and a serifed one, which reads as monospace data chrome. Counts use the default figures instead, right-aligned in fixed 2ch spans so changing digits do not move the text.
- **Font changed from the plan.** The plan's Instrument Sans was taken, and its replacement, Radio Canada, turned out to be in four designs already (process-brewery, footer-record-label, portfolio-wildlife-photographer, crud-vet-clinic). Mona Sans keeps the same width roles and is unused in the collection. Google serves it at the condensed, semi-condensed and normal widths (75, 87.5 and 100), which are exactly the three roles.
- **Cut at critique:** a packing-tape strip across the label, a highlighter sweep that replayed on every keystroke, auto-opening every match, colour-coded room stickers per group, a sticky left rail (every FAQ in the batch had one; the counts already sit in the group row and the headings), an all-caps "CONTENTS" print, a section spy, an "Open all" button, a debounced announcement for the tally and, last, the heavy 2px ink rule above the list, which competed with the label.

## Motion

Simple tier: CSS transitions and one small script, no libraries. No page-load sequence, no scroll-driven moments, and ambient motion is used 0 of the 1 allowed times. One house ease for everything: `--ease: cubic-bezier(.16,1,.3,1)` (expo out). Every transition is inside `@media (prefers-reduced-motion: no-preference)`; outside it the end states show with no movement. Hover sweeps only run under `(hover: hover) and (pointer: fine)`; on touch the underlines are drawn permanently.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Ink rule under the search field thickens 2px to 3px | MI4 lite (scaleY on `::after`) | focus | 0.2s | instant |
| Filter, marks, excerpts, counts and tally | CD5, instant variant (no Flip without GSAP; a sweep on every key flickers) | input | none, rerendered per keystroke | identical |
| Clear and Clear search buttons | MI1 | press | scale .96 in 0.12s, release 0.35s | colour and underline only |
| "Often asked" buttons (5) | HV2 + MI1 | hover, focus-visible, press | underline in from the left, out to the right, 0.35s | static underline |
| Group links with live counts (4) | HV2, NV6 lite (`scroll-behavior: smooth`) | hover, focus-visible, click | 0.35s sweep; smooth scroll to the group h3, which takes focus | static underline, instant jump |
| Question buttons (24) | HV2 on the question text | hover, focus-visible | 0.35s | static underline |
| Answer panels | CD6 (`grid-template-rows` 0fr to 1fr, `inert` when closed) | click, Enter, Space | open 0.45s, close 0.3s | instant |
| Arrow indicator turns from down to up | custom | open / close | rotate 180deg, 0.3s | instant |
| Cross-links in answers (4) | HV2 marker variant (40% highlighter band) | hover, focus-visible | 0.35s; always underlined | band shown without a sweep |
| Phone and email links | HV2 | hover, focus-visible | 0.35s | static underline |
| Focus ring | none | keyboard focus | 3px ink outline at 3px offset, never animated | same |

Verified at build in Chromium: opening "How do you work out the price?" samples the panel at 85px (60ms), 133px (120ms) and 159px (250ms, settled), with the arrow rotating through the same frames; text stays readable throughout because the panel clips rather than fades. Load and wheel-scroll contact sheets show no movement, as intended. The hover sweeps could not be captured headless (it reports `hover: none`).

## Do not touch

- The label is the only kraft object and the only hand-lettering. Kalam is for the typed query and the placeholder, never for answers or headings.
- Marks stay static. Do not animate highlights per keystroke.
- Panels stay open without JS: only `html.js .panel:not(.open)` collapses them. The search field and "Often asked" buttons stay behind `html.js`.
- Keep `inert` on closed panels and the h4 > button structure; a `<details>` swap loses heading navigation.
- The excerpt sits outside the button, under the h4, so it never changes the button's accessible name.
- `--ink-soft` is for text on paper only.
- Opening is slower than closing (0.45s against 0.3s). Keep the asymmetry.

## Adapting

Change the `:root` tokens first. `--kraft` and `--kraft-edge` are the board (ink must stay above 4.5:1 on `--kraft`); `--mark` is the highlighter and must keep ink above 7:1; `--paper` must stay cool so the board reads as one object. For another trade, swap the board for that trade's own label (a luggage tag, a delivery docket, a seed packet) and keep the mechanics: printed heading, ruled line, hand-lettered query, printed tally.

Copy: each item is an `li.item` with an id, a `data-keywords` synonym list and one answer of 40 to 90 words. Group counts, the tally total and the empty state are computed by the script, so adding or removing items needs no other change except the initial "6" counts and "24" in the static HTML and the no-JS line. Questions wrap freely; the arrow stays top-aligned in a 24px column. Cross-links are plain `href="#item-id"` anchors; the script handles hidden targets.

Retiming: all durations and the ease are tokens (`--dur-fast`, `--dur`, `--dur-open`, `--dur-close`, `--ease`); delete the `prefers-reduced-motion: no-preference` block to remove motion entirely.

| Token | Role |
|---|---|
| `--paper` | Page background |
| `--ink` | All text, rules (via `--rule`), focus rings, the handling mark and arrows |
| `--ink-soft` | Counts, excerpts, small print on paper |
| `--kraft` | The search label only |
| `--kraft-edge` | Label border, bottom edge and the corrugation flute |
| `--mark` | Search-match highlights and the cross-link hover band |
| `--rule`, `--tint` | 22% ink rules between questions; 5% ink press tint on question rows |
| `--font-print`, `--font-hand` | Mona Sans for everything printed; Kalam for the typed query |
| `--step--1` to `--step-3`, `--step-hand` | 1.25 scale from a 17px body; fluid H2 and hand size |
| `--s1` to `--s9`, `--gutter`, `--max` | 4px-based spacing, page edge (16/32/48px), 1240px content width |
| `--radius-board`, `--radius-btn` | 3px label corners, 2px button corners; nothing else is rounded |
| `--dur-fast`, `--dur`, `--dur-open`, `--dur-close`, `--ease` | Press, hover sweep, panel open, panel close; the one house ease |
