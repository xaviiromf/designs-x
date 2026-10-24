---
title: Architecture biennale footer drawn as a section through street level
section: footer
subject: The footer of Below Grade, the 6th Trieste Biennale of Architecture (fictional), an exhibition about foundations, soil, water and the infrastructure under cities, held from 22 May to 21 November 2027 in five venues in the old port, two of them underground. The footer shows how deep each venue is, takes a ticket reservation and gives press a contact to copy.
aesthetic: An architect's section drawing and a geotechnical borehole log pinned to a board-marked concrete wall. A street-level datum, ± level marks, 45° hatch for cut ground, a dashed water table, and sheets of limestone-grey paper for the plan, the ticket stubs and the detail panel.
mode: light
fonts:
  - Titillium Web (Google Fonts, 400, 600, 700, 900). The only family. 900 for the wordmark (tracking -0.03em), 700 for headings, 600 for venue names, levels and labels, 400 for body. Its figures are tabular by default ('1111' and '0000' both measure 38.09px at 17px), so levels, prices, dates and the visitor count line up without a monospace.
js: Runs the load sequence and the scrubbed wordmark, the venue tablist with its plan highlight and detail crossfade, the excavation toggle on the plan, ticket selection with a live total, date validation that names closed venues, the visitor stepper, an in-place reservation with a reference derived from the date and count, copy-to-clipboard confirmations, eased anchors and the access dialog. Nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [footer, architecture, exhibition, biennale, section-drawing, wordmark, tickets, tablist, site-plan, press, gsap, lenis, scroll, light]
use_when:
  - An event, museum or building project spread over several sites, where depth, level or height is part of the story (underground venues, floors, terraces, a dig).
  - A footer that has to carry real jobs (where to go, how to book, who to call) and end the page with one strong brand moment.
  - Architecture, engineering, geology, infrastructure or heritage subjects whose own drawings can supply the visual language.
avoid_when:
  - Brands with no spatial story. Without real levels, the datum line and the level marks are decoration.
  - Pages that already end on a large cropped wordmark (cta-indie-game) or that run another scroll-scrubbed type effect nearby.
  - Dark or saturated brands. The quiet grey palette relies on one ink, one clay and one water blue.
---

## Why it works

**The one bold idea: the name rises through street level.** The last thing on the page is "Below Grade", set as one SVG `<text>` 112vw wide, starting at -4vw, so both ends crop off the page. A ±0.00 street-level datum cuts it. Above the line the letters are solid flysch ink. Below it they are drawn as a section cut, with a flysch outline and an ochre 45° hatch on a darker ground band, and a dashed groundwater-blue line marked "▽ −3.20 water table" runs through them. As the reader reaches the page end, the word rises as one solid block through the datum. Ink appears exactly where the letters cross street level. At rest about two thirds of the cap height stands above grade, and the hatched rest stays in the ground, cropped by the page end. The exhibition's name *is* the exhibition's subject: the part of a building you never see.

- **The page is a section drawing.** Every line is a level. The venue rows are floor levels, ordered by real height (+1.80, +0.60, ±0.00, −6.40, −14.20), with a level-mark triangle and the figure right-aligned at the end of each row, the way level marks sit at the end of a section line. The bold rule between the Old Customs Hall and the Salt Cistern is street level, the same ±0.00 datum that cuts the wordmark. The list order and the figures are the information.
- **The plan repeats the idea quietly.** The site plan is a hairline drawing on a sheet. "Show what's below grade" excavates it from the street edge down (a clip-path wipe) to reveal the rail tunnel, the cistern vaults and the pile grid under Magazzino 4. Hovering a venue row highlights its footprint and redraws its outline. Hovering a footprint dims the other rows. List and plan are one instrument.
- **Drawings pinned to concrete.** The ground is a mid-value board-marked concrete (#B8BCB6), not the pale green-grey most of the collection uses. The limestone sheet colour (#E6E8E1) appears only on the things you handle: the plan, the detail panel, the ticket stubs and the dialog. Ochre is cut clay (the hatch, the active footprint, the punched price, the Reserve hover). Groundwater blue appears only on the water table and the sea hatch.
- **Honest flows.** Nothing pretends to send email. A reservation shows a reference built from the date and the visitor count (BG + MMDD + four digits from a small hash), says you pay at the desk, and offers "Copy reference" and "Change reservation" (which brings the form back with every value kept). The date helper names the venues closed on the chosen day ("On Tuesdays Molo IV and the rail tunnel are closed."). The confirmation agrees in type and number ("Season pass for 1 visitor, valid from Saturday 12 June to Sunday 21 November 2027.").
- **No dead ends.** The tabs, toggle, stepper, form, copy buttons and dialog all resolve in the page. Anchors go only to #visit, #venues, #tickets and #press. The mail and phone links open with `target="_blank" rel="noopener"`. There are no social links to invented profiles and no external images. The plan and the wordmark are inline SVG.

Deviations from the approved plan, and why:

- **The art director's changes are applied.** Titillium Web replaces Geologica, which three other designs already use. The ground is concrete, with the sheet colour kept for handled surfaces. The pointer lens is cut. The toggle is the only way underground, by excavation wipe. HV2 sweeps and HV4 fills are replaced by HV7 dimming, instant underline-thickness changes and instant fills. The eases are limited to three.
- **The scrub runs on the ground band, not the whole wordmark block.** The datum is only on screen during the last band-height of scroll (about 62px at 1440). Scrubbing over the whole block meant three quarters of the crossing happened below the fold. The ScrollTrigger now starts when the ground band is one band-height below the viewport and ends at the page end. The letter tops surface first, and the crossing happens in view.
- **The datum label hangs under the line.** Above the line, its knockout box covered the solid "B". Under the line it sits in the ground band (knocked out in `--below`), so the solid word stays whole.
- **The toggle has no `aria-pressed`.** Its accessible name changes ("Show what's below grade" / "Back to street level"), and a button whose name changes must not also report a pressed state.
- **`gsap.matchMedia` uses only `motion` and `reduce`.** Every fine-pointer effect is CSS under `(hover: hover)` or a `pointerType === 'mouse'` check, and no effect depends on width, so extra conditions would only replay the load sequence on resize.
- **The press block has no top rule.** Rules here only mean floor levels and ticket perforations. A rule over the press block would mean neither.
- **An extra date rule.** A two-day ticket cannot start on a Sunday, because its second day would be a Monday.
- **Removed accessory: the hatch icon on the toggle.** The label already says what the button does, and a second small hatch competed with the wordmark's.

## Do not touch

- **One `<text>`, two clips, one transform.** Both `<use>` elements point at `#word`. The clip paths (`#clip-above`, `#clip-below`) split at y = 125, the datum, and sit on untransformed groups. Only the source `<text>` moves. If you move a `<use>` or a group instead, the hatch-to-ink change leaves the datum.
- **The fit.** `fit()` measures the word in the loaded face and sets `font-size` so its natural length fills the 1068-unit slot, then fixes `textLength`. It runs again after `document.fonts.ready` and on resize. It also rescales the hatch pattern and the outline so they stay about 7px and 1.25px on screen. The rest position (`y`) keeps 64% of the cap height above the datum.
- **The datum is shared.** The list's street-level rule, the wordmark's datum and the plan's underground layer are one idea. Do not add a second bold move.
- **The ARIA structure.** The venue list is a vertical `role="tablist"` with roving tabindex, arrow, Home and End keys, and five `role="tabpanel"` elements stacked in one grid cell, so the detail panel never changes height. The datum row inside the tablist is `role="none"` and `aria-hidden`. The plan is `role="img"`, labelled by its caption.
- **Hidden states exist only under `html.js`**, and the reduced-motion media query cancels them. If the CDN is blocked, the script removes `js`. Everything shows, and the tabs, toggle, form, copy and dialog still work in plain JavaScript.
- **Contrast.** Flysch is 7.7:1 on concrete and 12.1:1 on the sheet. Marl is 5.2:1 on concrete. Ochre is 5.4:1 on the sheet, and sheet text on ochre is 5.4:1. The hatch outline is 5.7:1 on the ground band, and the water table is 3.1:1 on it. Keep these if you re-colour.
- **Overflow.** `.mark` uses `overflow: clip`, so the 112vw word never makes the page scroll sideways.

## Motion

The three eases: **`expo.out`** for entrances, fills, wipes, label swaps and rolls (CSS `--ease-out`). **`power2.inOut`** for DrawSVG only. **`back.out(2.5)`** for the ticket punch only. Lenis 1.3.26 runs with `lerp: 0.1` and `autoRaf: false`, driven by `gsap.ticker`, with `lenis.on('scroll', ScrollTrigger.update)` and `lagSmoothing(0)`. Everything is built inside `gsap.matchMedia` (motion, reduce). Under reduced motion there is no Lenis, scrolling is native, CSS transitions are zeroed, and every element is in its final state. The wordmark sits at rest. Only transform, opacity, clip-path and SVG stroke (DrawSVG) animate. Colour changes are instant swaps.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| "Visit Below Grade" rises line by line | TX1 | Load timeline, t0. It plays when #visit's top reaches 85%, after `document.fonts.ready` or 1.2s | yPercent 105 to 0 in SplitText line masks, 0.9s expo.out, stagger 0.08 | Static |
| Lead fades in | (opacity only) | Load, t0.15 | 0.6s expo.out | Visible |
| Floor rules draw | SC16 | Load, t0.30 | scaleX 0 to 1 from the left, 0.7s expo.out, stagger 0.05, top row first | Drawn |
| Venue names rise; levels and descriptions fade | TX1 | Load, t0.40 | Names yPercent 100 to 0 in per-row masks, 0.6s expo.out, stagger 0.05 | Static |
| Street-level datum draws, then its label | SC16 | Load, t0.45 (label t0.75) | 0.9s expo.out; label 0.3s | Drawn |
| Plan quay, then footprints A to E, then keys | DrawSVG (SC16 family) | Load, t0.55 / t0.85 / t1.1 | Quay 0.8s, footprints 0.9s stagger 0.08, power2.inOut; keys 0.4s; the selected footprint fill appears with the keys | Drawn |
| Plan caption and toggle | (opacity only) | Load, t1.3 | 0.4s expo.out | Visible |
| Ticket perforations draw | SC16 | Stubs at 85% of the viewport, once | scaleX 0 to 1, 0.7s expo.out, stagger 0.06 | Drawn |
| **The name rises through grade** | TX11 | Scrub from the ground band one band-height below the viewport to the page end | y from +58% of cap height to 0, ease none, `scrub: true`, Lenis-smoothed | At rest |
| Eased anchors | NV6 | Venues, Tickets, Press, Back to the top | `lenis.scrollTo`, offset -16, duration min(1.3, 0.65 + distance / 4000); then focus moves to the target | Native jump, then focus |
| Venue rows: neighbours dim | HV7 | Hover (fine pointer), focus-visible, hovering a plan footprint | Others to 0.45 opacity, 0.35s | Instant |
| Venue key fills ochre; footprint overlay and outline redraw | HV7 companion + DrawSVG | Same | Disc scale 0 to 1, 0.25s; overlay opacity to 0.35, 0.25s; outline 0 to 100%, 0.5s power2.inOut | Instant, no redraw |
| Venue detail crossfade | CD9 | Click, tap, Enter, Space, arrows, Home, End | Old opacity to 0, y -4, 0.15s; new from y 4, 0.25s expo.out, in one grid cell | Instant |
| Excavation wipe and label swap | MI2 + clip-path wipe | Toggle click | Underground layer clip-path inset(0 0 100% 0) to inset(0), 0.8s expo.out, reversed on close; label slides through a mask, 0.35s, width reserved | Instant |
| Ticket stubs: dimming, punch, press | HV7 + MI3 + MI1 | Hover and focus-visible (dim); change (punch); :active (press) | Others to 0.45; 12px punch scale 0 to 1, 0.35s back.out(2.5); price turns ochre instantly; scale 0.98 | Dimming instant, no pop |
| Date line | MI4 | Hover, focus | Underline scaleY 1 to 2, 0.25s; ochre on focus (instant colour) | Instant |
| Date error | MI4 | Invalid submit | Reserved slot, clip-path inset(0 0 100% 0) to inset(0), 0.25s; `aria-invalid`, `aria-describedby`; focus to the field | Instant |
| Stepper buttons | MI1 | Hover, focus-visible, :active | Disc scale 0 to 1, 0.25s; press 0.92 in 0.12s, release 0.35s | Instant |
| Visitor count and Reserve label roll | TR1 | Count or type change | Old value to yPercent ∓100, new from ±100 inside a mask, 0.3s expo.out, in the direction of change | Instant swap |
| Reserve button | MI1 | Hover, focus-visible, :active | Instant ochre fill; scale 0.97 in 0.12s, release 0.4s | Fill only |
| Form to confirmation and back | CD9 | Submit, Change reservation | Out 0.15s, in 0.3s expo.out with y 4 to 0; focus moves to the heading, or back to the selected stub | Instant |
| Copied confirmation | CD10 | Copy address, Copy reference | Reserved slot: autoAlpha 0 to 1, y 6 to 0, 0.25s; hold 1.2s; out 0.3s; `aria-live` says "Press address copied" or "Reference copied". On failure the text is selected and the slot reads "Selected, press Ctrl+C" for 3s | Appears without moving |
| Links and text buttons | HV7 + underline | Hover (fine pointer), focus-visible | Siblings dim to 0.45 (index row, press block); underline 1px to 2px, instant | Same, instant |
| Access dialog | CD7 | Access and step-free routes; Close, Escape, backdrop | Open: autoAlpha 0 to 1, y 12 to 0, scale 0.98 to 1, 0.45s expo.out; close 0.3s; `lenis.stop()` while open; focus returns to the link. Bottom sheet under 600px | Fade only (0.2s) |

## Adapting

1. **Find your levels.** The design only works when the content has real heights or depths. Replace the five venue rows with your sites, ordered by level, and keep the datum row where ground level falls in your list. Update the level figures, the five `.vpanel` panels and the footprints in `.plan-top` (one `.site` per row, same order, matching `data-v`).
2. **Redraw the plan.** It is a 400×300 viewBox in three stacked SVGs: the street layer, the underground layer revealed by the toggle, and the footprints on top. Keep the footprints as plain rects or paths so DrawSVG can draw them, and give each an `.ov` overlay of the same shape.
3. **Replace the name.** Change the `#word` text and the wordmark's `aria-label`. `fit()` sizes any word to the 1068-unit slot. Words of 8 to 14 characters crop best. Keep the datum (y 125) and the rest fraction (`0.36 * CAP` below grade). If your face has a different cap height, set `CAP` to its cap-height-to-em ratio.
4. **Tickets and rules.** `PRICE`, `NOUN` (singular and plural) and `OPEN` (the venues with shorter weeks, as day numbers) drive the button label, the helper line, the confirmation and validation. `FIRST` and `LAST` bound the dates, which must match the input's `min` and `max`. Load the page with `#selftest` to check every date, label and sentence rule in the console.
5. **Retime or remove motion.** CSS durations are `--d-press`, `--d-fast`, `--d-mid`, `--d` and `--d-wipe`. The load timeline lists its times in one block in the script. To remove the load sequence, delete the `load` timeline and its ScrollTrigger, and the `html.js` hidden-state rules. To remove the signature scrub, delete the `gsap.fromTo(word, ...)` call, and the word stays at rest. To drop Lenis, delete its four setup lines and the cleanup. Anchors then fall back to a native jump with focus.
6. **Re-colour by role.** Keep one ink for text, the datum and focus, one clay for cut material and the active state, and one water colour for water only. Check the ratios listed under Do not touch.

| Token | Role |
|---|---|
| `--concrete` | Page ground, the wall the drawings are pinned to |
| `--below` | Ground band below the datum in the wordmark |
| `--sheet` | Plan, detail panel, ticket stubs, dialog; text on ink and ochre |
| `--sheet-2` | Underground layer of the plan, stepper hover disc |
| `--flysch` | Ink: text, wordmark above grade, datum, outlines, focus ring, Reserve button |
| `--marl` | Secondary text, floor rules, captions, perforations |
| `--ochre` | Hatch below grade, active footprint and key, selected price, Reserve hover, error mark |
| `--groundwater` | Water-table line and sea hatch only |
| `--backdrop` | Dialog backdrop |
| `--font` | Titillium Web with fallbacks |
| `--fs-s` ... `--fs-xl` | Type scale, 1.25 from 17px: 14, 17, 21, 26.5, clamp(36px, 1.4rem + 3vw, 56px) |
| `--lh-*`, `--w-*`, `--track-head` | Leading (body 1.5, lead 1.4, headings 1.05), weights (400, 600, 700, 900), heading tracking |
| `--s1` ... `--s10` | Spacing, 4 to 128px |
| `--max`, `--gap`, `--gutter`, `--band-gap` | 12-column grid: 1360px max, 24px gap (16px under 600px), clamp(16px, 4vw, 56px) gutter, 96px between bands (64px on mobile) |
| `--rule`, `--datum` | Floor-rule and datum thickness (1px, 2px) |
| `--perf-y` | Height of the ticket perforation and its side notches |
| `--d-press`, `--d-fast`, `--d-mid`, `--d`, `--d-wipe` | Durations: 0.12s, 0.25s, 0.35s, 0.4s, 0.8s |
| `--ease-out`, `--ease-draw`, `--ease-punch` | The three eases: expo.out (CSS and GSAP), power2.inOut and back.out(2.5) (GSAP, documented here) |
| `--u`, `--above`, `--band` (on `.mark`) | One wordmark viewBox unit (0.1vw), the height above the datum, the ground band shown below it |

The event, venues, people, addresses, phone number and prices are fictional. The `.example` domain is reserved and resolves nowhere.
