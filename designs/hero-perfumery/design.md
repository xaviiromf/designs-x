---
title: Forcing shed formula lens
section: hero
subject: Aske Perfumery, a two-person perfume studio in Leeds (fictional), launching Forcing Shed, an eau de parfum about Yorkshire forced rhubarb, with a 2 ml sample by post for £4.
aesthetic: A candlelit forcing shed bled off the edge of a page the yellow of forced rhubarb leaves, read through a circle of the perfumer's blotter paper; one flared variable sans used as material.
mode: light
fonts:
  - Commissioner (Google Fonts, variable wght 100-900 with the FLAR and VOLM axes)
js: Forces the stalks up on load and opens a formula lens on the rhubarb accord, moves the lens with the pointer or to the material picked in the list, grows it over the whole frame on request, scrubs time on skin (0 min to 8 h) through the drydown so each stalk shrinks to its residue, reveals the sample vial, eases anchor jumps, validates the sample form with a computed post day and discount code, and opens the allergen dialog; nothing posts to a server.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [hero, perfume, fragrance, launch, sample-offer, data-as-visual, scroll-scrub, svg, sticky, form, dialog, detailed]
use_when:
  - A product whose composition is a measured list (a perfume formula, a blend, a recipe, a mix of grains or fibres) and that list changes over time in a way people care about.
  - A launch hero that sells a low-commitment trial (a sample, a tester, a trial pack) and has room for a short form.
  - A brand that can stand behind its numbers, because the drawing is the data.
avoid_when:
  - The composition is secret or vague. Stalks drawn to made-up numbers are decoration pretending to be data.
  - There is no time story. Without the drydown the shed is only a bar chart in costume.
  - The page must be short or skimmable on a phone; the section is about 3.5 viewports tall by design.
---

## Why it works

**The bold idea: a formula lens held up to the shed.** The hero picture is a dark forcing shed with fourteen forced-rhubarb stalks, and each stalk is one material of the real formula, drawn to its parts per thousand (Iso E Super 220 is the tallest, cis-3-hexenol 8 a stub; the list sums to exactly 1000). Behind it sits a second drawing with the same geometry: the perfumer's formula sheet, blotter white, with outlined bars, a 0-250 parts scale and labels. A circle of that sheet (a lens with a primrose rim) shows through the shed, so wherever it sits, the bar under it lines up exactly with the stalk it replaces. The picture becomes measurable without leaving the picture. On load the stalks force up out of the soil in order of their share and the lens irises open on the rhubarb accord with its tag ("Rhubarb accord, 150"); a mouse carries the lens, and picking a material in the list glides it there. "Show the formula" grows the same lens until the sheet covers the frame.

**What supports it: the shed burns down.** Scrolling through "How it wears" runs time on skin from 0 min to 8 h. Every stalk shrinks to its residue at its own evaporation time (hexenol is down to a sliver by 10 minutes, the rhubarb accord drops to a quarter by 3 hours, the musk and woods stay near full), the readout counts the time, the candle glow sinks and the current step turns carmine. On the sheet the outline stays (the formula) and only the blush fill shrinks (what is left on your skin), so the lens reads formula against residue at any point of the scroll.

**Not a repeat of the collection's other lenses.** CU4 appears in cta-vineyard-harvest, contact-brand-agency, contact-expedition-outfitter, gallery-botanical-illustration and footer-architecture-biennale. Here the hidden layer is data registered to the drawing (a chart whose bars sit exactly on the stalks), not a photo, a blueprint or decoration, and the lens also changes over time with the drydown. The parts of the vineyard lens that would read as a copy are avoided: no ring icon, a lens that opens to full frame instead of a separate panel, and the tag hangs under the lens as its caption.

- **Two layers, one geometry.** The shed and the formula sheet are separate inline SVGs with the same 600x700 viewBox, x positions and lean, stacked in the frame; the sheet is clipped with `clip-path: circle(var(--lr) at var(--lx) var(--ly))` and a radial-gradient rim follows the same variables. The candle glow leans a little towards the lens (30% of its offset), so the frame has one pointer response, not two.
- **Reading without a pointer.** The fourteen formula rows are real buttons (`aria-pressed`, `aria-controls` the frame). Hover, focus or tap lights that stalk, dims the others, moves the lens to it and hangs the tag under the lens; a click pins it. On touch, tapping a stalk pins it too, but the rows are the primary touch path (each stalk's hit area is about 17px wide at 390px). The full formula is always plain text in the list, so the drawing is `role="img"` with a short label and the sheet is `aria-hidden`.
- **The shed carries the page.** On desktop the shed column runs from column 6 to the right edge of the viewport, square on the bleed side and rounded on the inner corners, and stays sticky while the formula and drydown pass on the left. Below 992px the frame sits straight after the headline (CSS `order`), so the load and the lens are on the first screen, and it sticks to the top at 38svh with a 24px primrose fade under it while the rows and steps pass beneath.
- **Commissioner as material.** One family. The display uses weight 760, FLAR 100 (flared, engraved-label terminals) and VOLM 100; headings FLAR 60; body and controls FLAR 0. Not used anywhere else in the collection.
- **Palette from the shed, five colours.** `--primrose` #EEEBC0 is the pale yellow of rhubarb leaves grown in the dark (not cream, which would be default 1); `--shed` #2A1820 is a rhubarb-crown aubergine; `--stalk` #B8183F the carmine of the stalk (5.3:1 on primrose; underlines, fills, the tag, focus rules, errors); `--blush` #F1A7B6 only for stalk highlights, the candle glow, sheet residue and the vial liquid; `--blotter` #FCFBF6 for the lens and sheet, the confirmation and the dialog. The candle glow is a primrose-to-blush radial, not gold.
- **Specific copy.** The headline is one plain sentence about the smell. The offer, price, credit window, post days and allergens are all concrete. The confirmation computes the next Tuesday or Friday after today, the price for the chosen set, and a SHED- code valid for 60 days.

**Reasoned defaults and collection notes.**
- Default 1 (cream with a serif and terracotta): the ground is primrose, measured off forced-rhubarb leaves, the type is a flared sans and the accent is carmine.
- Default 2 (near-black with one accent): the dark appears only as a framed object (the shed and the vial) and as ink on a light page. `--shed` #2A1820 sits near footer-record-label's #2E1219; it is kept because here it is ink and a framed room, not a page ground. Do not drift it redder.
- Default 3 (broadsheet rules): the formula rows have no rules. The only lines are the parts bars (data) and the time axis beside the drydown (a real sequence).
- Default 5 (template chrome): no eyebrows, no middle dots, no arrows, no monospace; tabular figures in the same family.
- Pink highlighter sweeps under text belong to testimonials-mountain-hotel, so rows here signal with the bar filling carmine, the bar thickening and the name gaining weight.
- In-page nav is hidden under 640px on purpose: it is a hero, the sections follow directly, and the header button still reaches the sample form. No hamburger menu.

## Do not touch

- **The data.** Row `data-parts` sum to 1000; `data-evap` (minutes) and `data-floor` (fraction left at 8 h) drive the drydown; stalk heights are `parts x 2.1` viewBox units above the ground line at y 660, and the sheet's 0-250 scale uses the same factor. If you change a number, redraw the stalk and the bar together (they were generated from the same table) and rerun `#selftest`.
- **The time mapping.** The four steps sit at scroll progress 0, 1/3, 2/3 and 1 = 0 min, 20 min, 2 h and 8 h (piecewise linear, `minutesAt` and its inverse `progressAt`). The scrub starts when the steps list reaches 60% of the viewport (70% on narrow screens) and ends when the last step does. Each step after the first keeps `--step-h` of height so the labels line up with those thresholds, and the time axis is exactly three steps long.
- **The two SVG layers must stay aligned:** same viewBox, `preserveAspectRatio="xMidYMax meet"`, same x and `rotate()` per stalk. Boards and soil run past the viewBox so a wide frame never shows their ends.
- **The lens rests on the rhubarb accord** (`PARK` in the script) and returns there, or to the pinned material, when the pointer leaves. Its radius is 18% of the frame width, clamped 56-150px; its centre sits just above the top of the measured bar so the label and scale show.
- **Sheet labels are 13px at any frame size** (`--lab-size` is set from the frame's scale), and when stalks sit closer than 30px apart (phones and tablets) the sheet shows only the parts numbers and hides its title; the names stay in the row list.
- **Accessibility:** rows are buttons with visible focus (2px ink outline) that light the stalk and move the lens on focus, and carry `scroll-margin-top` so a focused row never hides under the sticky header or shed; the toggle changes its own label ("Show the formula" / "Show the shed"), so it carries no `aria-pressed`, and the hidden label is `aria-hidden`; the readout and tag are `aria-hidden` because the steps and rows say the same thing; the toggle's focus ring is primrose with an aubergine halo so it shows on the dark shed and the light sheet; text fields show focus with a 2px ink outline plus the carmine rule; errors use `aria-invalid` and `aria-describedby`, a polite status line announces how many fields need fixing, focus moves to the first invalid field and the form never shakes; the dialog is a native modal that closes on Escape, the backdrop or "Back to the sample" and returns focus to its opener.
- **No dead ends:** every anchor targets an existing id and moves focus there; the form handles `submit` in script and swaps in a confirmation with "Change my request" (values kept); the mailto opens with `target="_blank" rel="noopener"`.
- **Progressive enhancement:** without JavaScript, or if the CDN fails, everything is visible, the toggle and readout are hidden, and the list carries the formula. Hidden start states (headline lines, stalks below the soil, the closed lens, the bars, the vial) are set by the script only.

## Adapting

Map the brand onto the `:root` tokens first. The dark frame colour (`--shed`) doubles as ink, so pick a dark that reads as both. Keep the five-colour discipline: one light ground, one dark, one accent, one tint for light and liquid, one paper white.

For another product, keep the structure (a measured list drawn as an object, a time story that scrubs it, a trial offer). Regenerate the stalks from the new table: x positions about 36 units apart from x 92, lean at most 3 degrees and smaller for tall items so neighbours never cross. Up to about 16 items fit at 600 units wide; beyond that the phone layout loses legibility. Write each step as something true at that time, and set `STEP_MIN` to the times the steps name.

To change the offer, edit the radio values, the confirmation sentence and the price map in the submit handler. The post days are Tuesday and Friday in `nextPostDay`. Validation is a UK postcode regex; replace it for other countries.

**Retiming or removing motion.** Durations and eases live in the tokens (`--dur-*`, `--ease-*`) for CSS and inline in the script for GSAP; the script uses `expo.out` for arrivals, `expo.inOut` for wipes and `none` for the scrub. To drop a moment, delete its block inside `mm.add(...)`: the load timeline, the bars (`.pbar i`), the drydown (`dd` and its ScrollTrigger), the vial, or the pointer-carried lens (`if (fine)`). The page stays complete without any of them. Never remove the reduced-motion branch or the `html.js` guard.

| Token | Role |
|---|---|
| `--primrose` | Page ground, leaf caps, labels on dark (13.8:1 against `--shed`) |
| `--shed` | Ink, the shed and vial frames, primary buttons, readout and toggle |
| `--stalk` | Carmine: underline rule, button fill, lit bar, the tag, current step, errors, input focus rule (5.3:1 on primrose) |
| `--blush` | Stalk tops, candle glow, residue fill on the sheet, vial liquid |
| `--bleed` | Distance from the content edge to the viewport edge; the shed column extends by it |
| `--blotter` | Lens and formula sheet, tag text, checked option, confirmation, dialog |
| `--ink-2` | Secondary text, a mix of shed and primrose (6.6:1) |
| `--soil` | Shed floor and vial shelf, a mix of shed and blush |
| `--focus-light` / `--focus-dark` | Focus outline on light (shed) and on dark (primrose) |
| `--font` | Commissioner with Avenir Next, Segoe UI and system fallbacks |
| `--axes-display` / `--axes-head` / `--axes-name` / `--axes-plain` | FLAR and VOLM settings by role (100/100, 60/0, 50/0, 0/0) |
| `--fs-xs` to `--fs-display` | Type scale: 13, 15, 17, 22 px, lede clamp, h2 clamp(28-40px), H1 clamp(40-76px) |
| `--lh-tight` / `--lh-body` | Display leading .98, body 1.6 |
| `--s-1` to `--s-10` | Spacing 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px |
| `--gutter` / `--col-gap` | Side padding clamp(16px, 4vw, 64px); grid gap |
| `--header-h` | Header height, also the sticky offset for the shed and anchors on desktop |
| `--step-h` | Height of each drydown step: sets the scrub length and the time axis |
| `--r-pill` / `--r-option` / `--r-frame` | Buttons (vial caps), radio options, frames and dialog |
| `--ease-out` / `--ease-swap` / `--ease-btn` / `--ease-spring` | expo.out, label swap, button fill, press release |
| `--dur-fast` / `--dur-mid` / `--dur-slow` | .22s labels, .45s tag glide and rules, .6s underline |

## Motion

Everything runs inside one `gsap.matchMedia` (motion, reduce, fine, wide). Lenis and ScrollTrigger share the GSAP ticker (`autoRaf: false`, `lagSmoothing(0)`); cleanup removes the tick, restores lag smoothing and destroys Lenis. Only transform, opacity, clip-path and filter animate, plus the catalogue's `grid-template-rows` error reveal and a font-weight change on the lit row. The native cursor is never hidden. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Stalks force up out of the soil, shortest share first; glow rises .25 to 1 | Load sequence on the object (LD-style, no media zoom) | `document.fonts.ready` (600 ms cap) | 1.1s expo.out each, stagger .05 by parts; glow 1.6s power2.out | Static |
| Headline lines rise out of their masks, split reverted after | TX1 (the only text effect) | Load, +0.1s | 1s expo.out, stagger .08 | Visible, not split |
| Wordmark, nav and header button rise 6px from .4 opacity | LD8 | Load, +0.3s | 0.5s expo.out, stagger .08 | Static |
| **The lens irises open on the rhubarb accord**, tag fades in under it | CU4 (the signature) | Load, +1.2s, once the stalks land | 0.8s expo.out | Open and parked |
| Lens follows the pointer; glow leans 30% towards it | CU4 | Pointer over the shed, fine pointers only | quickTo 0.5s power3.out; back to the pinned or parked stalk 0.6s expo.out on leave | Off; the lens jumps |
| Row or stalk lights: others dim, lens and tag glide to it, bar fills carmine and thickens, name gains weight | HV7 with the lens as the response | Hover, focus, tap; click pins | Dim .25s; lens .6s expo.out; bar .4s; weight .3s | Instant |
| "Show the formula" grows the lens over the whole frame, and back | CU4 radius to the frame diagonal | Toggle click | 0.7s in, 0.6s out, expo.inOut | Instant |
| Parts bars draw from the left | SC16 | Formula list at 85% of the viewport, once | 0.9s expo.out, stagger .04 | Static |
| The shed burns down: stalks and sheet residue shrink to their 8 h floor at each material's evaporation time, glow sinks, readout counts, time axis fills, current step turns carmine | Scrubbed timeline (SC11 family) with SC16 axis | Steps list 60% to last step 60% (70% narrow), `scrub: true` | Mapped to time on skin, power1.out per material, none for the glow and axis | Full stalks, readout hidden, steps static |
| Vial frame fades in, the liquid fills from the bottom turning carmine to blush, the tag swings | MD1 family (fill instead of a frame wipe) | `#sample` at 85%, once | Frame 0.5s; liquid 1.2s expo.out; tag 0.6s back.out(1.4) | Full vial, static |
| Anchors glide, then focus moves; nav marks the section in view | NV6 | Click on any in-page link | min(1.3, .65 + distance/4000) s | Native jump plus focus |
| Toggle label swaps in a masked slot, width reserved | MI2 | Toggle click | 0.35s | Instant |
| Buttons: carmine fill enters and leaves by the edge the pointer crossed | HV4 | Pointer enter and leave; full on focus | 0.4s in, 0.28s out | Colour change |
| Press and release on buttons, toggle, rows, options | MI1 | `:active` | 0.12s press, 0.4s spring release | No scale |
| Hero button vial fills | MI-style clip | Hover, focus, `:active` | 0.5s expo.out | Full vial, static |
| Perfumer's underline: a 1px carmine rule grows from the centre | HV2 variant | Hover, focus, `:active`, `aria-current` | 0.6s expo.out | Static on hover |
| Radio tick draws, border turns carmine | MI3 / MI4 | Checked | 0.3s | Instant |
| Floating labels, rule sweep on focus, rule thickens on hover, errors reveal | MI4 | Focus, value, submit | 0.22s labels, 0.45s rule, 0.25s errors | Instant |
| Confirmation wipes down in place; "Change my request" wipes it back | Clip wipe | Valid submit; button | 0.7s expo.out in, 0.5s out | Instant swap, focus moves |
| Allergen dialog rises from 12px and .98 | CD7 | Button | 0.45s in, 0.3s out; Lenis stopped while open | Fade only |

Hover effects apply everywhere except devices whose primary pointer is coarse (touch), where the `:active` state carries the response.
