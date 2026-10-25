---
title: Architecture biennale footer drawn as a section through street level
section: footer
subject: The footer of Below Grade, the 6th Trieste Biennale of Architecture (fictional), an exhibition about foundations, soil, water and the infrastructure under cities, held from 22 May to 21 November 2027 in five venues in the old port, two of them underground. The footer shows how deep each venue is, takes a ticket reservation and gives press a contact to copy.
aesthetic: An architect's section drawing and a geotechnical borehole log pinned to a wall of buff Aurisina limestone, the Karst stone of Trieste's port. A street-level datum, ± level marks, 45° clay hatch for cut ground, a dashed water table, and pale stone sheets for the plan, the ticket stubs and the detail panel.
mode: light
fonts:
  - Titillium Web (Google Fonts, 400/600/700/900)
js: Runs the load sequence and the scrubbed wordmark, the venue tablist with its plan highlight and detail crossfade, the excavation toggle on the plan, ticket selection with a live total, date validation that names closed venues, the visitor stepper, an in-place reservation with a reference derived from the date and count, copy-to-clipboard confirmations, eased anchors and the access dialog. Nothing is sent anywhere.
libraries: [GSAP 3.15.0 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [footer, architecture, exhibition, biennale, section-drawing, wordmark, tickets, tablist, site-plan, press, gsap, lenis, scroll, light]
use_when:
  - An event, museum or building project spread over several sites, where depth, level or height is part of the story (underground venues, floors, terraces, a dig).
  - A footer that has to carry real jobs (where to go, how to book, who to call) and end the page with one strong brand moment.
  - Architecture, engineering, geology, infrastructure or heritage subjects whose own drawings can supply the visual language.
avoid_when:
  - Brands with no spatial story. Without real levels, the datum line and the level marks are decoration.
  - Pages that already end on a large cropped wordmark (cta-indie-game) or that run another scroll-scrubbed type effect nearby.
  - Dark or saturated brands. The quiet stone palette relies on one ink, one clay and one water colour.
---

## Why it works

**The one bold idea: the name rises through street level.** The last thing on the page is "Below Grade", set as one SVG `<text>` 112vw wide, starting at -4vw, so both ends crop off the page. A ±0.00 street-level datum cuts it. Above the line the letters are solid flysch ink. Below it they are drawn as a section cut, with a flysch outline and a clay 45° hatch on a darker sandstone band, and a dashed groundwater line marked "▽ −3.20 water table" runs through them. As the reader reaches the page end, the word rises as one block through the datum. Ink appears exactly where the letters cross street level. At rest about two thirds of the cap height stands above grade, and the hatched rest stays in the ground, cropped by the page end. On phones the same `<text>` is set as two lines, "Below" over "Grade", each fitted to 112vw; both start underground, "Below" surfaces first and the datum then cuts "Grade". The exhibition's name *is* the exhibition's subject: the part of a building you never see.

- **The page is a section drawing.** Every line is a level. The venue rows are floor levels, ordered by real height (+1.80, +0.60, ±0.00, −6.40, −14.20), with a level-mark triangle and the figure right-aligned at the end of each row, the way level marks sit at the end of a section line. The bold rule between the Old Customs Hall and the Salt Cistern is street level, the same ±0.00 datum that cuts the wordmark. The list order and the figures are the information.
- **The plan repeats the idea quietly.** The site plan is a hairline drawing on a sheet. "Show what's below grade" excavates it from the street edge down (a clip-path wipe) to the sandstone layer with the rail tunnel, the cistern vaults and the pile grid under Magazzino 4. Hovering a venue row fills its footprint with clay. Hovering a footprint dims the other rows. List and plan are one instrument.
- **Drawings pinned to Karst stone.** The ground is buff Aurisina limestone (#BCAF93), the stone of Trieste's quays, not the pale green-grey or cream most of the collection uses. Below grade the same hue steps down to a sandstone flysch (#9C9075): the wordmark's ground band and the plan's underground layer. A pale stone sheet (#E2D3B2) appears only on the things you handle: the plan, the detail panel, the ticket stubs and the dialog. The ink is a brown flysch (#2B2515). Clay comes in two strengths: a dark ochre (#5B3A06) wherever it is text or sits under text (the Reserve fill, the error mark, the focused date line), and a lighter clay (#7E5410) for the hatch and the active footprint only. Groundwater (#15434E, the Timavo under the Karst) appears only on the water table and the sea hatch.
- **One Italian grotesk.** Titillium Web is the only family, and no other design in the collection uses it. It was drawn as a teaching project at the Accademia di Belle Arti di Urbino, an Italian academic grotesk for an Italian architecture event. 900 for the wordmark (tracking -0.03em), 700 for headings, 600 for venue names, levels and labels, 400 for body. Its figures are tabular by default ('1111' and '0000' both measure 38.09px at 17px), so levels, prices, dates and the visitor count line up without a monospace.
- **Honest flows.** Nothing pretends to send email. A reservation shows a reference built from the date and the visitor count (BG + MMDD + four digits from a small hash), says you pay at the desk, and offers "Copy reference" and "Change reservation" (which brings the form back with every value kept). The date helper names the venues closed on the chosen day ("On Tuesdays Molo IV and the rail tunnel are closed."). The confirmation agrees in type and number ("Season pass for 1 visitor, valid from Saturday 12 June to Sunday 21 November 2027.").
- **No dead ends.** The tabs, toggle, stepper, form, copy buttons and dialog all resolve in the page. Anchors go only to #visit, #venues, #tickets and #press. The mail and phone links open with `target="_blank" rel="noopener"`. There are no social links to invented profiles and no external images. The plan and the wordmark are inline SVG.

### Deviations from the approved plan

- **Palette.** The art director moved the first build's grey-green family to Karst stone. Nearest neighbour of each token across every `:root` in `designs/*/index.html` (ΔE76, 2026-10-24): `--stone` 6.1, `--below` 10.3, `--sheet` 5.4, `--flysch` 6.4, `--marl` 7.0, `--ochre` 10.8, `--clay` 10.3, `--groundwater` 5.8. The suggested #C0B39C ground had gained a neighbour at 3.3, so the ground is #BCAF93.
- **Titillium Web, not Geologica**, which two other designs had also planned.
- **No pointer lens.** CU4 is already used by five designs. The toggle digs the plan with a clip-path wipe instead.
- **Two-line wordmark on phones.** A single 112vw line has a 55px cap height at 390px. Below 600px "Below" sits over "Grade", each fitted to 112vw, both start underground and the rise is about 210px.
- **An explicit scroll run.** `.mark-run` is the mark's height plus 24svh (64svh on phones), at least 50svh, so the scroll is about three times the rise instead of six and never reads as dead scrolling. `#selftest` logs `SCRUB END` against `MAX SCROLL` and errors if they differ (equal at 360, 390, 600, 1024 and 1440px).
- **The index and imprint ride on the word.** `.end-nav` is sticky with `top: 100svh − mark − --nav-h − 48px` (`--nav-h` measured in `fit()`), so it settles 48px above the cap line. The last frame reads content, links, then the name; any empty stone sits above the links.
- **The ground band stops short of the letters' feet** (28% of the cap height, at least 34px for its labels), so the page end crops the hatch.
- **No `aria-pressed` on the toggle.** Its accessible name already changes.
- **Two extra date rules.** A two-day ticket cannot start on a Sunday, and every venue is closed on Mondays.

## Do not touch

- **One `<text>`, two clips, one transform.** Both `<use>` elements point at `#word`, which holds two `<tspan>`s ("Below", " Grade"). The clip paths (`#clip-above`, `#clip-below`) split at the datum and sit on untransformed groups. Only the source `<text>` moves. If you move a `<use>` or a group instead, the hatch-to-ink change leaves the datum.
- **The fit.** `fit()` measures the word in the loaded face and sets `font-size` so its natural length fills the 1068-unit slot, then fixes `textLength`. Below 600px it fits each `<tspan>` on its own line instead and moves the datum down to make room for "Below". It sets `--dat` (datum, in viewBox units) and `--band-u` (ground band) on `.mark-run`, the viewBox, the clip rects and the rise distance. It runs again after `document.fonts.ready` and on resize, and rescales the hatch pattern and the outline so they stay about 7px and 1.25px on screen. The rest position keeps 64% of the cap height above the datum, and the band is shorter than the letters' feet, so the page end crops them.
- **The run ends at the page end.** Nothing may follow `.end` inside `<body>` in normal flow (the dialog is closed and the live region sits inside the footer). Anything after it would make the rise finish before the bottom. `#selftest` checks this.
- **The datum is shared.** The list's street-level rule, the wordmark's datum and the plan's underground layer are one idea. Do not add a second bold move.
- **The ARIA structure.** The venue list is a vertical `role="tablist"` with roving tabindex, arrow, Home and End keys, and five `role="tabpanel"` elements stacked in one grid cell, so the detail panel never changes height. The datum row inside the tablist is `role="none"` and `aria-hidden`. The plan is `role="img"`, labelled by its caption. Its footprints are a pointer shortcut for the tablist (hover dims, click selects); they stay out of the Tab order because the tablist already gives keyboard and touch users the same selection.
- **Hidden states exist only under `html.js`**, and the reduced-motion media query cancels them. If the CDN is blocked, the script removes `js`. Everything shows, and the tabs, toggle, form, copy and dialog still work in plain JavaScript.
- **Contrast.** Flysch is 7.0:1 on stone, 10.3:1 on the sheet and 4.8:1 on the band below grade (the hatched outline and the band labels). Marl is 5.0:1 on stone and 7.3:1 on the sheet. Ochre is 4.7:1 on stone and 6.9:1 on the sheet, and sheet text on ochre is 6.9:1. Groundwater is 3.4:1 on the band and 7.3:1 on the sheet. The clay hatch (2.1:1 on the band) is texture: the ink outline carries the letter. Never use `--clay` for text. Keep these ratios if you re-colour. HV7 dimming takes the other rows and index links to 0.45 opacity, below AA, only while a mouse rests on a sibling; the hovered item stays at full contrast and the dim is gone the moment the pointer leaves. Keyboard focus never dims, because focus is a sustained state.
- **Overflow.** `.mark` uses `overflow: clip`, so the 112vw word never makes the page scroll sideways.

## Adapting

1. **Find your levels.** The design only works when the content has real heights or depths. Replace the five venue rows with your sites, ordered by level, and keep the datum row where ground level falls in your list. Update the level figures, the five `.vpanel` panels and the footprints in `.plan-top` (one `.site` per row, same order, matching `data-v`).
2. **Redraw the plan.** It is a 400×300 viewBox in three stacked SVGs: the street layer, the underground layer revealed by the toggle, and the footprints on top. Keep the footprints as plain rects or paths so DrawSVG can draw them, and give each an `.ov` overlay of the same shape. The underground layer is painted in `--below`, the same ground as the wordmark's band.
3. **Replace the name.** Change the two `<tspan>`s in `#word` (the second starts with a space) and the wordmark's `aria-label`. `fit()` sizes the whole name to the 1068-unit slot on one line, and each word to the slot on phones. Two words of 4 to 8 characters work best. Keep the rest fraction (`0.36 * CAP` below grade). If your face has different metrics, set `CAP` and `ASC` to its cap-height and ascender-to-em ratios.
4. **Tickets and rules.** `PRICE`, `NOUN` (singular and plural) and `OPEN` (the venues with shorter weeks, as day numbers) drive the button label, the helper line, the confirmation and validation. `FIRST` and `LAST` bound the dates, which must match the input's `min` and `max`. Load the page with `#selftest` to check every date, label and sentence rule in the console.
5. **Retime or remove motion.** CSS durations are `--d-press`, `--d-fast`, `--d-mid`, `--d` and `--d-wipe`, and the sweeps use `--ease-sweep`. The load timeline lists its times in one block in the script. To lengthen or shorten the rise, change the `24svh` and `50svh` (and the phone `64svh`) in the `.mark-run` rules; the scrub follows. To change how far the word travels, change `rise` in `fit()`. To remove the load sequence, delete the `load` timeline and its ScrollTrigger, and the `html.js` hidden-state rules. To remove the signature scrub, delete the `gsap.fromTo(word, ...)` call and set `.mark-run` to `height: auto; min-height: 0`; the word stays at rest. To drop the HV4 entry edge, delete the fine-pointer `mm.add` block; fills then always enter from the left. To drop Lenis, delete its four setup lines and the cleanup. Anchors then fall back to a native jump with focus.
6. **Re-colour by role.** Keep one ink for text, the datum and focus; a ground, a darker step of the same hue for below grade, and a pale sheet of the same hue for handled things; one clay in two strengths (dark for text and fills under text, light for hatch only); and one water colour for water only. Check the ratios listed under Do not touch.

| Token | Role |
|---|---|
| `--stone` | Page ground: Aurisina limestone, the wall the drawings are pinned to; also the ticket punch hole, which shows the wall through the stub |
| `--below` | Ground below grade: the wordmark's band and the plan's underground layer |
| `--sheet` | Plan, detail panel, ticket stubs, dialog, stepper disc, toggle fill; text on ink and ochre |
| `--flysch` | Ink: text, wordmark above grade, datum, outlines, focus ring, Reserve button |
| `--marl` | Secondary text, floor rules, captions, perforations |
| `--ochre` | Clay as text or under text: Reserve fill, error mark, focused date line |
| `--clay` | Lighter clay, never text: hatch below grade, active footprint |
| `--groundwater` | Water-table line and sea hatch only |
| `--tint` | Ink at 9% over the sheet: the stub fill |
| `--backdrop` | Dialog backdrop |
| `--font` | Titillium Web with fallbacks |
| `--fs-s` ... `--fs-xl` | Type scale, 1.25 from 17px: 14, 17, 21, 26.5, clamp(36px, 1.4rem + 3vw, 56px) |
| `--lh-*`, `--w-*`, `--track-head` | Leading (body 1.5, lead 1.4, headings 1.05), weights (400, 600, 700, 900), heading tracking |
| `--s1` ... `--s10` | Spacing, 4 to 128px |
| `--max`, `--gap`, `--gutter`, `--band-gap` | 12-column grid: 1360px max, 24px gap (16px under 600px), clamp(16px, 4vw, 56px) gutter, 96px between bands (64px on mobile) |
| `--rule`, `--datum` | Floor-rule and datum thickness (1px, 2px) |
| `--perf-y` | Height of the ticket perforation and its side notches |
| `--d-press`, `--d-fast`, `--d-mid`, `--d`, `--d-wipe` | Durations: 0.12s, 0.25s, 0.35s, 0.4s, 0.8s |
| `--ease-out`, `--ease-sweep`, `--ease-draw`, `--ease-punch` | The four eases: expo.out (CSS and GSAP), the sweep curve (CSS), power2.inOut and back.out(2.5) (GSAP, documented here) |
| `--u`, `--dat`, `--band-u`, `--above`, `--band` (on `.mark-run`) | One wordmark viewBox unit (0.1vw); the datum and the ground band in units (set by `fit()`); the same two in px |
| `--nav-h` (on `.end`) | Height of the index and imprint, measured by `fit()`, so the sticky links settle 48px above the word |
| `--from`, `--fill`, `--pb` | HV4 entry edge (set on pointerenter), HV4 fill colour per button, extra tap padding under an HV2 rule |

## Motion

The four eases: **`expo.out`** for entrances, wipes, label swaps and rolls (CSS `--ease-out`). **`cubic-bezier(.35, 0, 0, 1)`** for the HV2 underline sweeps and HV4 fills (CSS `--ease-sweep`). **`power2.inOut`** for DrawSVG only. **`back.out(2.5)`** for the ticket punch only. Lenis 1.3.26 runs with `lerp: 0.1` and `autoRaf: false`, driven by `gsap.ticker`, with `lenis.on('scroll', ScrollTrigger.update)` and `lagSmoothing(0)`. The effects are built inside `gsap.matchMedia`: one context for motion and reduce, one for fine pointers. Under reduced motion there is no Lenis, scrolling is native, CSS transitions are zeroed, the scroll run collapses to the mark's own height, and every element is in its final state. The wordmark sits at rest. Only transform, opacity, clip-path and SVG stroke (DrawSVG) animate. Colour changes are instant swaps. Among the footers this one owns HV2 underline sweeps, HV4 entry-edge fills, HV7 dimming (venue list and bottom index only), CD9 crossfades and CD10 copy confirmations; it uses no text rolls (HV1) and no footer uncover (SC8).

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| "Visit Below Grade" rises line by line | TX1 | Load timeline, t0. It plays when #visit's top reaches 85%, after `document.fonts.ready` or 1.2s | yPercent 105 to 0 in SplitText line masks, 0.9s expo.out, stagger 0.08 | Static |
| Lead fades in | (opacity only) | Load, t0.15 | 0.6s expo.out | Visible |
| Floor rules draw | SC16 | Load, t0.30 | scaleX 0 to 1 from the left, 0.7s expo.out, stagger 0.05, top row first | Drawn |
| Venue names rise; keys pop; levels and descriptions fade | TX1 | Load, t0.40 | Names yPercent 100 to 0 in per-row masks, 0.6s expo.out, stagger 0.05 | Static |
| Street-level datum draws, then its label | SC16 | Load, t0.45 (label t0.75) | 0.9s expo.out; label 0.3s | Drawn |
| Detail panel fades in | (opacity only) | Load, t0.90 | 0.4s expo.out | Visible |
| Plan quay, then footprints A to E, then keys | DrawSVG (SC16 family) | The plan's top at 80% of the viewport. In view at load (desktop) it waits until load t0.70, after the rows have landed; on phones it plays on arrival | Quay 0.8s, footprints 0.9s stagger 0.08, power2.inOut; keys 0.4s; the selected footprint fill appears with the keys | Drawn |
| Plan caption and toggle | (opacity only) | Plan timeline, t0.75 | 0.4s expo.out | Visible |
| Ticket perforations draw | SC16 | Stubs at 85% of the viewport, once | scaleX 0 to 1, 0.7s expo.out, stagger 0.06 | Drawn |
| Wordmark datum draws, then its two labels | SC16 | Scrub, while the line itself is on screen: from the datum entering the viewport bottom to 20% above it; each label fades in from 40px after its line | scaleX 0 to 1 from the left, ease none; labels opacity 0 to 1. The labels have no knockout box, only a `--below` text halo, so the hatch runs up to the letters | Drawn |
| **The name rises through grade** | TX11 | Scrub on `.mark-run`, `top bottom` to `bottom bottom` (the page end) | Desktop: y from +58% of the cap height (at least 80px) to 0. Phones: from both lines underground (about 210px) to 0. Ease none, `scrub: true`, Lenis-smoothed | At rest, no run |
| Eased anchors | NV6 | Venues, Tickets, Press, Back to the top | `lenis.scrollTo`, offset -16, duration min(1.3, 0.65 + distance / 4000); then focus moves to the target | Native jump, then focus |
| Venue rows: neighbours dim | HV7 | Hover (mouse) on a row or on its plan footprint | Others to 0.45 opacity, 0.35s | Instant |
| Venue key fills with the sheet; footprint fills clay | HV7 companion | Hover (mouse), focus-visible | Sheet disc inside the ink ring, scale 0 to 1, 0.25s (the selected key is solid ink, so hovered and selected differ); footprint overlay opacity to 0.35, 0.25s | Instant |
| Venue detail crossfade | CD9 | Click, tap, Enter, Space, arrows, Home, End | Old opacity to 0, y -4, 0.15s; new from y 4, 0.25s expo.out, in one grid cell | Instant |
| Excavation wipe and label swap | MI2 + clip-path wipe | Toggle click | Underground layer clip-path inset(0 0 100% 0) to inset(0), 0.8s expo.out, reversed on close; label slides through a mask, 0.35s, width reserved | Instant |
| Reserve, the toggle and the ticket stubs fill | HV4 | Hover (fine pointer), focus-visible, :active | A fill layer scales in from the edge the pointer entered (0.4s) and out through the edge it left (0.25s): ochre under Reserve, the sheet under the toggle, an ink tint inside the notched stub. Keyboard focus fills from the left | Instant fill |
| Press | MI1 | :active on buttons, stubs and text buttons | Scale 0.97 (stubs 0.98, stepper 0.92) in 0.12s, release 0.4s | Instant |
| Ticket punch | MI3 | Choosing a ticket | 12px hole on the perforation at the left notch, with a marl hairline edge, scale 0 to 1, 0.35s back.out(2.5); the 2px ink ring marks the choice | No pop |
| Date line | MI4 | Hover, focus | Underline scaleY 1 to 2, 0.25s; ochre on focus (instant colour) | Instant |
| Date error | MI4 | Invalid submit | Reserved slot, clip-path inset(0 0 100% 0) to inset(0), 0.25s; `aria-invalid`, `aria-describedby`; focus to the field | Instant |
| Stepper buttons | MI1 | Hover, focus-visible, :active | Sheet disc scale 0 to 1, 0.25s; press 0.92 in 0.12s, release 0.35s | Instant |
| Visitor count and Reserve label roll | TR1 | Count or type change | Old value to yPercent ∓100, new from ±100 inside a mask, 0.3s expo.out, in the direction of change | Instant swap |
| Form to confirmation and back | CD9 | Submit, Change reservation | Out 0.15s, in 0.3s expo.out with y 4 to 0; focus moves to the heading, or back to the selected stub | Instant |
| Copied confirmation | CD10 | Copy address, Copy reference | Reserved slot beside the button (they wrap together): autoAlpha 0 to 1, y 6 to 0, 0.25s; hold 1.2s; out 0.3s; `aria-live` says "Press address copied" or "Reference copied". On failure the text is selected and the slot reads "Selected, press Ctrl+C" for 3s | Shows and hides without fading |
| Links and text buttons | HV2 | Hover (fine pointer), focus-visible | A 1px rule always shows; a 2px rule sweeps in from the left (scaleX, origin left) and leaves to the right (origin right), 0.4s; the bottom index also dims its siblings to 0.45 on hover | Rule appears without sweeping |
| Access dialog | CD7 | Access and step-free routes; Close, Escape, backdrop | Open: autoAlpha 0 to 1, y 12 to 0, scale 0.98 to 1, 0.45s expo.out; close 0.3s; `lenis.stop()` while open; focus returns to the link. Bottom sheet under 600px | Fade only (0.2s) |

The event, venues, people, addresses, phone number and prices are fictional. The `.example` domain is reserved and resolves nowhere.
