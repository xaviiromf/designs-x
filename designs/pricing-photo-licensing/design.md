---
title: Plates held to the light
section: pricing
subject: Licence tiers for Pyne & Daughters Plate Archive, Bristol (fictional), 182,400 glass and film negatives from a commercial and press studio, 1889 to 1968, licensed to picture editors and rights managers at publishers.
aesthetic: The archive's darkroom and the daylight it lets in. Black Solander-box buckram with a violet cast, glass negatives standing in a rack, sepia positives, a paper sleeve with a thumb cut and a blind stamp, set entirely in an English book face.
mode: dark
fonts:
  - Baskervville (Google Fonts)
js: Opens and develops the licence plates in the rack, dims the recent-licences ledger around the row in focus, prefills and validates the request form, shows an in-page confirmation with a sequential reference, opens the terms dialog, and runs the load sequence, two scroll moments and smooth anchors with GSAP and Lenis.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [pricing, licensing, photo-archive, publishing, dark, gsap, lenis, expanding-rows, svg, dialog, form]
use_when:
  - Per-use licensing where each tier is a different use of the same item (inside page, cover, all editions, an annual account), and the difference is easier to show than to list.
  - An archive, library or catalogue whose items have IDs that buyers quote back (plate numbers, catalogue numbers, accession numbers).
  - A few tiers (three to five) and a request flow that ends in a quote rather than a checkout.
avoid_when:
  - More than five tiers. The rack's closed strips get too narrow to carry a name and a price.
  - Monthly SaaS plans or feature matrices. There is no object to hold to the light.
  - Catalogues whose images cannot be shown, even as drawings. The develop moment is the point.
  - Brands that need a light page. The negative-to-positive turn depends on a dark ground.
---

## Why it works

**The one bold idea: holding a plate to the light.** The four licences are four glass negatives standing in a rack. Hovering a plate (after a 120ms intent delay), focusing it or tapping it opens it in the rack, and its picture develops from a smoky negative into a sepia-toned positive. The develop is one GSAP `filter` tween in three keyframes over `--dev` (1.1s): the negative bleaches in the light to `--flare-neg` (0.35 of `--dev`, `power2.in`), flips while washed out to `--flare-pos` (0.15, linear), then its density builds to `--pos` like a print in the tray (0.6, `power2.out`). A straight tween from `--neg` to `--pos` fails because at `invert(.5)` every tone collapses to the same flat grey for a moment; passing through the flare hides the flip and reads as a plate held up to a window. `--neg` is `invert(1) sepia(0) saturate(.5) contrast(1.25) brightness(.55)`: a negative of these mostly dark scenes is mostly clear glass, which reads dark against the box, so closed plates are smoky glass with silver highlights and the developed plate is the brightest thing in the rack. `--pos` is `invert(0) sepia(.55) saturate(1) contrast(1) brightness(1)`. Its terms appear beside it, and the plate that closes re-inverts over 0.6s. Each plate keeps one develop tween by reference and kills it before starting the next, so a quick sweep across the rack always leaves every closed plate a negative (`gsap.killTweensOf` does not reach a keyframed tween, so it is not used for this). The flare midpoints are kept dim: the brightest moment sits near `--silver`, not paper white, so a sweep never reads as a camera flash; the spill of `--lightbox` behind the glass carries the light. The load sequence ends with the first plate (Inside page) opening and developing, so a visitor sees the idea before touching anything. Development happens only here. The ledger thumbnails and the request sleeve show positives that are already developed, so they support the moment and never repeat it.

- **One plate is always open on wide screens.** Leaving the rack does not collapse it, so the terms you were reading stay put. Closed plates always show their name (vertical, along the plate's edge, like the label on a stored negative) and their price at the foot. Nothing is hover-only.
- **The rack moves only transforms, clip-path and filter.** Every plate is laid out at its open width (`--o`), absolutely positioned. A closed plate is clipped to a strip with `clip-path: inset(0 Rpx 0 0)` and moved to its stacked position with `x`; the open plate's clip opens to `inset(0)`, which reveals its terms from the left. The picture inside a closed strip is shifted so the strip shows its centre. Text never reflows during the swap, because each panel's width is fixed and the terms (`contain: layout paint`) fade in only after the width has settled. The closing plate's terms and caption vanish at once (no fade-out), so the incoming plate never slides over half-faded text. The clip is a plain rectangle (no `round`) so it stays cheap while it animates; the plate keeps its 3px glass radius from `border-radius`.
- **The filter is cheap to animate.** It sits on `.emul`, a layer that holds only the drawing (`will-change: filter`), never on a panel with text. The grain is a static data-URI noise tile inside that layer, so it is rasterised once with the drawing and never re-blended per frame. Drawings render at 600px wide or less.
- **The palette is the darkroom and its light.** The ground is black Solander-box buckram with a violet cast (`--buckram` #29222A), a chosen dark, not a tinted near-black. Text is a cool silver-gelatin white (`--gelatin`), not cream. The one state colour is daylight through a window (`--daylight` #A8CFEE), literally the light you hold a plate to, and it marks only focus, the selected licence, the nav indicator and the field focus rule. Prices are text-coloured. Colour on the page comes from the sepia prints (`--toner` and the `--img-*` tones, image-only).
- **Why a serif, and why Baskervville.** The buyers are picture editors and rights managers at publishers; Baskerville is the English book face of their trade, cut in Birmingham, up the road from Bristol, in the 1750s. Baskervville (ANRT's variable revival, wght 400-700 with italic) carries the h2 and section headings at 600, the licence names and labels at 500, 18px body at 400 with 1.6 leading, which a serif body needs, and italic for form errors and the stamp monogram. It is the only family, so the page reads as one printed object. Figures were checked in the served Google build by rendering `1111` and `0000` at 48px: by default they are old-style and proportional (58.8px against 94.1px); with `font-variant-numeric: tabular-nums lining-nums` (the `--figures` token) both are 107.5px and lining. So fees, plate numbers, print runs, the request reference and the clause numbers use `--figures`, and running text (1889, 1968, 182,400) keeps the old-style figures that suit a book face.
- **The decision rule is in the lede, not a badge.** "If you will license more than 80 inside-page images a year, the publisher account costs less" (80 x £85 = £6,800). No "most popular" label.
- **The ledger shows what similar uses cost.** Six real-feeling licences, each a two-line record (title, then publisher and print run) with a rule between records, no vertical rules, fees right-aligned in tabular figures. Each row is one link: it fills in the plate number and licence, drops the old plate back into the sleeve, raises the new one, and glides to the form with focus in "Title and publisher".
- **The request ends on the page.** The form has no `action`; the script validates (print run is optional for the publisher account, which has no single edition), shows errors inline in reserved lines (no layout jump) and moves focus to the first invalid field. On success the fields are replaced in place by "Request PD-26-0418 sent" (0419 on the next request in the same session), a summary of what was entered, the email that was entered, "Edit request" and "Back to licences", and a blind stamp lands on the sleeve.
- **Honest copy.** The copyright paragraph says what the fee pays for (the scan, the research and permission to reproduce the archive's copy). "Not included" names training AI models. The hint under the button says what sending does: the archivist pulls the plate from cold storage.
- **The drawings are tonal, not clip-art.** Six inline SVG symbols, each built from three to five tonal planes, a horizon, one figure group and a light source, with a vignette and static grain: coal barges and a steam crane at Avonside Wharf (1911), a tram leaving the Brislington depot at night (1923), a wedding on the Clifton steps (1934), stemmers at long tables in a bonded warehouse (1938), snow on Park Street below the university tower (1947), and a diver on the lido's top board (1958). The publisher account's plate is a contact sheet of all six. They are reused through `<use>` in the rack, the row thumbnails, the ledger and the sleeve.

## Do not touch

- **One plate always open on wide screens; development only on open.** No scroll-driven development, no developing thumbnails, no ambient loop.
- **Closed plates show name and price.** Do not move either into a hover state.
- **Daylight is state only.** Never use `--daylight` for prices, links or decoration.
- **Fixed-width panel content.** The terms panel width (`--tw`) and the open width (`--o`) are computed once per resize. Do not animate `width`, `grid-template-columns` or `height` to open a plate; keep the transform-and-clip rack.
- **The filter lives on `.emul` only,** a layer with the drawing and its grain and no text.
- **Focus opens a plate** (wide screens) and closed panels are `inert`, so Tab goes button, its "Request this licence", next button. Known and accepted: Shift+Tab walks the plate buttons only (focusing a button closes the plate behind it, so its link is inert by then); every link is still reached going forward.
- **Real radios, a native `<dialog>`, a real submit button.** Enter submits from any field. The dialog stops Lenis while open, its body has `data-lenis-prevent`, Escape and the backdrop close it, and focus returns to "Read the full licence terms".
- **Text alternatives.** Each exposed drawing has `role="img"` and an `aria-label` that starts "Drawing of plate 1911/0417, ..." and ends with the year, except the publisher-account contact sheet ("Drawing of a contact sheet of six plates ..., 1911 to 1958"); the sleeve's label is rewritten when the plate changes. The thumbnails inside the plate buttons and ledger rows are `aria-hidden` because the button or row text already names the plate. The rack's visible captions are `aria-hidden` because they repeat the drawing's label.
- **No shadows anywhere.** Plates get a 1px highlight on the top edge (light through glass), the stamp's relief is two offset strokes, and the 3px radius belongs to glass only (plates, thumbnails, the sleeve's plate). Everything else is square, except the licence radios, which are round so they read as one choice and not as checkboxes.
- **No eyebrows, middle dots or arrows.** Ledger meta uses commas and its own line.

## Adapting

1. **Tokens first.** Change the colour tokens on `:root`, keeping `--silver` at 6:1 or better on both `--buckram` and `--board` (it is 7.2:1 and 6.1:1 here) and `--daylight` distinct from `--gelatin` so focus and selection read. The image tones (`--toner`, `--img-black` to `--img-paper`) set the print colour; keep them warm, because a warm positive inverts to the cool negative the idea needs.
2. **Tiers.** Each `<article class="plate">` holds a button (name, fee, unit), the drawing, a caption and a terms panel with a "Request this licence" link carrying `data-tier`. The rack expects four plates (its geometry is three closed strips plus one open plate); for three or five, change the `3 *` factors in `geom()` and check the closed width range (`--closed-min`, `--closed-max`) still fits a name and a price. Add a matching radio (`value` equal to `data-tier`, `data-label` for the summary).
3. **Items and images.** Replace the symbols in the sprite and the `PLATES` table in the script (plate number, symbol id, short title, drawing description). Ledger rows carry `data-plate` and `data-tier`. Real photographs can replace the drawings: put an `<img>` inside `.emul` (and the thumbnails), keep it at 600px wide or less, and the develop filter works unchanged.
4. **Copy length.** Terms panels hold three items of up to about 85 characters at 1080px, the narrowest rack (measured: no overflow on any plate from 1080 to 1600px). Below 1080px the rack switches to rows, because between 992 and 1080px the terms panel would be about 240px wide and clip its own button. Longer terms need a taller `--rack-h`. Licence names longer than about 20 characters crowd the vertical edge label.
5. **Layout.** At 992px and wider the header bar is sticky. At 1080px and wider the rack stands horizontally (HV9). From 900px the ledger is a six-column grid; from 768px the sleeve is sticky beside the form. From 600 to 1079px the rack is a list of rows with the open plate's drawing and terms side by side; under 600px they stack. Every width from 360 to 1600 has no horizontal scroll.
6. **Retiming motion.** Durations and easings are `:root` tokens that the script reads: `--open` (rack swap, 0.7s), `--dev` (develop, 1.1s), `--redev` (re-invert, 0.6s), `--intent` (hover intent, 120ms), `--t-ind` (nav indicator, 0.4s), `--t-in`/`--t-out` (terms fade), `--t-press`/`--t-release` (button press). To remove an effect: delete the S1 block (ledger rules) or the S2 tween (sleeve rise) inside `mm.add`; delete the `if (first) { ... }` block to drop the load sequence (then plate 1 starts open and developed); set `--dev` and `--redev` to `0s` to keep the rack but drop the development (do not, unless the design changes its idea).
7. **Composing into a page.** The title bar and nav sit inside the section here, so the design has no `banner` landmark of its own. In a full page, move the bar into the site-level `<header>` and keep the nav's section spy pointed at these ids.
8. **Contacts.** Replace `licensing@pyneanddaughters.example` and `0117 496 0723` (an Ofcom drama number) in the success panel and the dialog footer. To send requests to a real endpoint, `fetch` from the submit handler and show the confirmation on success; never give the form an `action`.

| Token | Role |
|---|---|
| `--buckram` | Ground |
| `--board` | Raised surfaces: header bar, plates, sleeve, dialog |
| `--gelatin` | Primary text, prices, filled button |
| `--silver` | Secondary text, rules, closed-plate labels |
| `--daylight` | State only: focus, selected licence, nav indicator, field focus rule |
| `--toner`, `--img-black` to `--img-paper` | Image tones, never text |
| `--rule`, `--glass-hi`, `--scrim` | Derived: hairlines, the glass highlight, the dialog backdrop |
| `--sleeve`, `--fold` | The paper sleeve's front (gelatin label 5.1:1 on it) and its fold line |
| `--grain` | Static noise tile inside the drawings |
| `--font` | Baskervville and fallbacks |
| `--fs-xs` to `--fs-xxl` | Type scale: 14, 16, 18 (body), 24, 36-60 (open price, section headings), 44-88 (h2) |
| `--figures` | `tabular-nums lining-nums` for fees, plate numbers and references |
| `--s1` to `--s9`, `--gutter`, `--max` | Spacing scale, page gutter, content width |
| `--thumb`, `--ctl-h`, `--lh-snug` | Thumbnail size, text field height, the snug line-height for captions, hints and options |
| `--rack-h`, `--rack-gap`, `--edge`, `--foot`, `--closed-min`, `--closed-max` | Rack geometry |
| `--r-glass` | The only radius, glass only |
| `--neg`, `--pos` | The two ends of the develop filter |
| `--flare-neg`, `--flare-pos` | The bleached midpoints of the develop, kept near `--silver` in brightness. Do not touch: part of the develop |
| `--lightbox` | The light that spills round the open plate while it develops (opacity only) |
| `--ease-*`, `--open`, `--dev`, `--redev`, `--intent`, `--t-*` | Motion timing |

## Motion

Detailed tier. GSAP 3.15.0 (ScrollTrigger, SplitText) and Lenis 1.3.26 from jsDelivr, loaded with `defer` so the inline script can set `html.js` before first paint; the Lenis CSS is inlined. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`) and every anchor goes through `lenis.scrollTo` with focus moved to the target. Everything sits inside `gsap.matchMedia` with `motion`, `reduce`, `fine` (`(hover: hover) and (pointer: fine)`) and `wide` (`(min-width: 1080px)`, the rack; the sticky bar is CSS at 992px). Hover-intent and resize listeners are registered with an `AbortController` that the cleanup aborts; the cleanup also kills and clears the rack's tweens, removes the ticker callback, restores `lagSmoothing(500, 33)` and destroys Lenis. Hidden initial states exist only under `html.js` inside `prefers-reduced-motion: no-preference`, and are released by an `html.shown` class when the load sequence ends or the context changes. If the CDN is blocked, the `js` class is removed, all plates show open and the form and dialog still work. The native cursor is never hidden. House easing: `expo.out` for entrances and opens, `power2.inOut` for development and swaps, `none` for scrubs, `power2.out` for drains and exits; no back or bounce curves.

Under reduced motion there is no Lenis and no split heading; everything is in its final state with plate 1 open and developed; plate swaps, development, the nav indicator, the dialog (opens and closes instantly), field and error reveals are instant or colour-only; the sleeve plate rests out of its sleeve; the stamp appears without scaling.

Page load (about 1.9s; nothing gates input, no preloader):

| When | What | Technique | Timing | Reduced |
|---|---|---|---|---|
| 0.00 s | Wordmark and nav links rise 6px and fade in; the indicator fades in at 0.25 s | LD8 | 0.4 s `expo.out`, stagger 0.06 | No entrance |
| on fonts ready | h2 lines rise from their masks (1.2 s fallback shows it unsplit) | TX1 | 1.0 s `expo.out`, stagger 0.08 | Visible, no split |
| 0.35 s | Lede fades in place | Fade, no travel | 0.6 s | Visible |
| 0.40 s | The rack rail draws from the left | SC16 | 0.9 s `expo.out` | Static |
| 0.50 s | Plates (rows under 1080px) are set into the rack, closed, as negatives; under 1080px row 1's drawing arrives with them, in place as a negative | Clip-path reveal `inset(0 0 100% 0)` to `inset(0)` with y -16 to 0 | 0.7 s `expo.out`, stagger 0.05 | In place |
| about 1.2 s | Signature: plate 1 opens and develops (under 1080px row 1's drawing, already there as a negative, develops while its caption and terms reveal from the top) | HV9 with transforms + three-step develop | open 0.7 s `expo.out`, develop 1.1 s (bleach, flip, build), terms fade 0.35 s after a 0.12 s delay | Open and developed |

Scroll:

| What | Technique | Trigger and timing | Reduced |
|---|---|---|---|
| Ledger rules draw from the left; the records are readable from the start (no text reveal) | SC16 | `top 88%`, once; rules 0.9 s `expo.out` stagger 0.06 | Static |
| The chosen plate rises out of its paper sleeve | SC2 / SC11 style scrub | `#request`, `clamp(top 85%)` to `top 35%`, `yPercent` 42 to 0, `ease: none`, `scrub: true`, all widths | Plate out |
| The nav marks the section in the reading band and its indicator travels there | NV6 + NV4 | IntersectionObserver `-40% 0px -55% 0px`; 0.4 s `power2.inOut` | Indicator jumps |

The "Every licence includes" strip has no motion on purpose.

Every interactive item:

| Item | Hover (fine pointers) | Focus | Press / click | Touch | Reduced |
|---|---|---|---|---|---|
| Nav links (3) | NV4: one 2px daylight bar slides and resizes under the link (x and scaleX, positioned from bounding rects, because the load leaves a transform on each `li`), 0.4 s `power2.inOut`, returns to the current link on leave | Same as hover, plus a 2px daylight outline | NV6: `lenis.scrollTo` with no extra offset (Lenis reads the target's `scroll-margin-top` and the sticky bar's `scroll-padding-top`, so eased and reduced-motion landings match), the hash is written with `history.replaceState`, modified clicks open normally, duration `min(1.3, 0.65 + distance / 4000)`, then focus the section heading | Bar sits under the current section; tap scrolls the same way | Bar jumps; immediate scroll |
| Plate buttons (4) | Closed: the edge label goes silver to gelatin (0.2 s); after 120 ms of intent the plate opens (HV9) and develops | Opens immediately; 2px daylight outline inside the plate | Opens; on phones toggles the row | Rows: tap toggles; the tapped row keeps its place (an open row above it closes at once, one below clips out over 0.22 s); panel content reveals with clip-path from the top plus opacity (0.5 s); if the terms end below the fold, the row's header glides near the top (0.8 s `expo.out`) so the drawing develops in view; then `lenis.resize()` and `ScrollTrigger.refresh()` | Instant open, filter set without a tween |
| "Request this licence" (4) | HV4: gelatin fill sweeps in from the side the pointer entered (0.4 s in, 0.3 s out, `expo.out`), label flips to buckram | Fill shown plus outline | MI1 scale 0.97 over 0.12 s, release 0.45 s; selects the licence (MI3 tick), glides to the form, focus in "Plate numbers" | MI1 only | Colour change only |
| Ledger rows (6) | HV7: other rows dim to silver and their thumbnails to 50% (0.3 s); the row's rule brightens | Row outline, same dimming | Fills plate and licence, drops the sleeve plate (0.4 s `power2.out`) and raises the new one (0.6 s `expo.out`), glides to the form, focus in "Title and publisher" | `:active` board tint, same prefill | Instant dimming, instant swap |
| "Read the full licence terms", mailto, tel, "Back to licences" | HV2: underline sweeps in from the left and out to the right over a resting hairline, 0.45 s `cubic-bezier(.35,0,0,1)`, 0.07 em | Sweep shown plus outline | Terms: CD7 dialog, autoAlpha, y 12 and scale 0.98 to 1 over 0.45 s `expo.out`, focus on the dialog title, close 0.3 s `power2.out` (a second Escape during the close is ignored), `lenis.stop()` while open | Persistent underline, 8px extra padding on coarse pointers; the dialog is a full-width sheet under 600px | Static underline; dialog instant |
| "Close terms", Escape, backdrop | HV4 fill | Outline | MI1; animated close, focus back to the link | MI1 | Instant close |
| Text, number and select fields | MI4: bottom rule silver to gelatin (0.2 s) | A 2px daylight rule scales in from the left (0.3 s `expo.out`) and the label turns gelatin; this underline is the focus indicator (9.4:1, no outline ring, kept deliberately to match the ruled-ledger fields); in forced-colours mode, where the bar is dropped, fields get a 2px `Highlight` outline | Typing a known plate number swaps the sleeve plate after 300 ms | Same | Instant |
| Errors | | Focus moves to the first invalid field | Message reveals in its reserved line with clip-path (0.25 s); `aria-invalid` and `aria-describedby`; each message is `aria-live="polite"`, so every error is announced, not only the focused one | Same | Instant |
| Licence radios (4) | Border silver to gelatin (0.2 s) | 2px daylight ring | MI3: daylight double rule, the round radio's 6px daylight dot (a punched-hole mark) pops (scale 0.6 to 1, 0.3 s `expo.out`) | Same | No pop |
| "Send licence request" | HV4: board fill sweeps in, label flips to gelatin | Fill plus outline | MI1; success replaces the fields, focus on the heading, the blind stamp lands on the sleeve (scale 1.25 to 1, autoAlpha, 0.5 s `expo.out`) | MI1 | Static stamp |
| "Edit request" | HV4 + MI1 | Outline | Restores the filled form, focus in "Plate numbers" | MI1 | Colour only |

Pointer-driven effects are the plates' hover intent and the HV4 entry edge. A cursor-following ledger preview, a hold-to-confirm button and a glare on the open plate were cut so the develop moment stays the only bold motion.
