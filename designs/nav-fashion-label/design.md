---
title: Pinked lining menu
section: nav
subject: Hilván (fictional), an independent womenswear and menswear label in Cerro Alegre, Valparaíso, that cuts small numbered runs from end-of-roll Chilean cloth, sells through atelier fittings and four stockists, and mends what it makes free for life.
aesthetic: The coat itself, with outer cloth outside and lining inside. The page is mid-grey wool flannel and the menu is the mulberry lining, opening with a pinking-shear edge. Josefin Sans fashion-plate lettering and a text serif.
mode: light
fonts:
  - Josefin Sans (Google Fonts, variable wght 300-700)
  - Petrona (Google Fonts, variable wght 400-600)
js: Opens and closes the full-screen menu as one reversible timeline with a pinked clip-path edge (Lenis stopped, page inert, focus in and back, Escape), hides the header while reading down, marks the section in view, eases in-page anchors and moves focus, cuts in the collection chips, presets the fitting form's garment from a row, and validates the fitting form with an in-place confirmation behind a curtain. Nothing posts to a server.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [nav, header, full-screen-menu, fashion, apparel, hide-on-scroll, section-spy, gsap, lenis, form]
use_when:
  - A small fashion, tailoring or textile brand whose site is one long page and whose menu can carry a moment of brand theatre.
  - The product has a hidden inside that matters (a lining, a reverse side, a back room), so the menu can turn the page inside out.
  - The header must stay light while reading. It hides on the way down, comes back on the way up and marks the section you are in.
avoid_when:
  - The site has deep navigation (dozens of pages, mega-menus). Five big items is the limit of this panel.
  - People open the menu many times per visit. Use a shorter timeline or a plain overlay, because a 1.4 s open and a 0.9 s close get tiring.
  - The brand already has a strong dark theme. The lining only surprises because the page never shows that colour in bulk.
---

## Why it works

**The bold idea is that the menu turns the coat inside out.** The page is the coat's outer cloth: a mid-grey flannel ground (`--flannel` #B4B8B0) with ink type. Pressing Menu drops a mulberry panel from the top of the screen, and its leading edge is a pinked zigzag, the edge pinking shears leave on cloth. The edge is a clip-path polygon built in px, so every tooth is 28 px wide and 14 px deep on a phone and on a 1600 px screen. The vertex count is fixed for each width (one point every 14 px). The wordmark and toggle switch from ink to paper on the frame where the edge passes the header's mid-height, and the header links and button are covered at the same moment. Five destinations then rise from their baselines with a 4° tilt that straightens. A single paper tooth taken from the same edge marks the section you are reading. Closing runs the same timeline backwards at 1.5x, so the zigzag travels back up. Everything else on the page stays quiet so this one moment carries.

- **The pinked edge appears once more, and it carries data.** The six cloth swatches under the hero and the chips in the collection rows have pinked edges on all four sides (two nested CSS masks: top and bottom on the outer box, left and right on the inner). Each swatch is labelled with its cloth and the metres left on the roll. In the collection, each chip is cut in once with a quarter-size tooth (7 x 3.5 px) wiping in the reading direction, just after the row rules draw.
- **Structure is information.** The six row rules separate real garments. The columns are metres per piece, the number made and the CLP price, and they sit on the page grid, so the cloth column lines up with every section's text column (columns 5 to 11). Metres and made counts are the label's real story: scarcity comes from cloth, not marketing. The made counts add up to the 122 in the intro.
- **The header behaves like a well-made garment.** It is transparent over the hero and picks up a flannel layer and a 1 px rule past 40 px. It hides while reading down past twice its height and returns on the first scroll up. It never hides while the menu is open or keyboard focus is inside it. On desktop a static 2 px ink line marks the current section under Run 07, Atelier or Repairs. It does not travel.
- **Two clearly distinct families.** Josefin Sans (1920s geometric, fashion-plate lettering) sets the wordmark, header, menu, headings, buttons and labels, and never goes below 15 px because its x-height is small. Petrona sets body text and all figures with `tabular-nums lining-nums` (its tnum works and its default figures are lining). Neither family is used anywhere else in the collection.
- **Palette from the coat, six colours.** `--flannel` is the outer cloth and a mid-value ground, which no other design in the collection uses. `--flannel-dark` is for rules, `--ink` #1E2130 for text and buttons (7.9:1 on flannel), and `--ink-soft` #363A45 for secondary text (5.6:1). `--paper` #E6E8E3 is the fitting sheet and the text on the lining (10:1). `--lining` #5B1F3A is mulberry and appears only as the menu panel, the button fill on hover (a flash of lining when you touch the cloth) and error text on paper.
- **Specific copy.** Garment names, cloths, metres per piece, made counts and prices in Chilean pesos. Fittings run Thursday to Saturday, repairs are free for life and the next run is cut on 14 November. Buttons say what happens, and the action keeps its name: Request fitting, Requested, Fitting requested.

**Reasoned defaults and collection notes.**
- Default 1 (cream with a serif and a warm accent): the ground is a cool mid-grey flannel and the display face is a geometric sans. There is no warm accent, and the only colour is the lining.
- Default 2 (near-black with one accent): the only dark surface is the menu, and it is mulberry, because the lining is the meaning.
- Default 3 (broadsheet rules): only the collection list has rules, buttons and chips are 999 px pills like size-tag eyelets, and there are no dense columns.
- Default 5 (template chrome): no eyebrows, no middle dots and no arrows. Mobile row meta joins with a comma, and figures use the text serif, not a monospace.
- Default 8 (fade-up on every section): only the hero H1 rises, on load. Sections otherwise appear as they are, and the collection reveals only its rules and chips.
- Kept clear of process-bespoke-tailor (tape measure, chalk yellow, basting stitches, pattern card), gallery-classic-cars (a chip card that follows the pointer), nav-yacht-builder (a travelling indicator) and nav-concert-hall (a button fill from the entry edge).
- The address and the street map link are to Calle Templeman in Cerro Alegre. The label and the four stockists (Almacén Retazo, Ojal Sur, La Pretina, Casa Forro) are invented. Map links open an OpenStreetMap search for the street or the city, never for a business.

## Do not touch

- **The tooth is in px.** `edge()` places one vertex every `TW / 2` = 14 px across the viewport and moves the front by `p * (vh + 28) - 14`, with odd vertices 14 px lower. Do not switch it to percentages, because teeth would grow coarse on wide screens and fine on phones. `#selftest` checks the tooth size, the fixed vertex count, fully hidden at p = 0, fully covered at p = 1 and full width at 360, 390, 1440 and 1600 px. The clip-path is cleared when the panel is fully open.
- **The header flip is synced to the edge,** not a colour transition. The `on-lining` class switches in the timeline's `onUpdate` when the edge passes the header's mid-height, so it also works in reverse. Header links and the button become `visibility: hidden` at that frame, so they are covered and not focusable.
- **One timeline.** Open is `tl.timeScale(1).play()` and close is `tl.timeScale(1.5).reverse()`. Rapid toggles only flip direction. `onReverseComplete` hides the panel, removes `inert` from main, the footer and the skip link, restarts Lenis and then runs the pending anchor if a menu item was clicked.
- **Accessibility:** the toggle has `aria-expanded` and `aria-controls="menu"`, and its visible label and accessible name both swap between Menu and Close. On open, focus goes to the current item (or the first one). On close, focus returns to the toggle. Escape closes the menu. The keyboard is never trapped, because the panel follows the toggle in tab order and nothing else is focusable. Focus rings are 2 px ink on flannel and paper and 2 px paper on the lining. Hover dimming is mirrored by `:focus-visible`, and hover wins when both are present. Effects that need a hover (sibling dimming, the row sweep, chip scaling, the menu nudge, the underline sweep and the sheen) are gated by `(hover: hover) and (pointer: fine)`. Underlines are persistent on touch and under reduced motion.
- **Hover-free reading:** every row shows its cloth chip and cloth name. Nothing depends on hover.
- **Form:** validation is in script (`novalidate`). Errors set `aria-invalid` and `aria-describedby` (only while invalid) and reveal on a reserved line with a clip-path. Focus goes to the first invalid field, and nothing shakes. The confirmation keeps the form's height so the page does not jump under the curtain. Request another fitting resets the form and returns focus to Your name.
- **Progressive enhancement:** with no JavaScript, `@media (scripting: none)` turns the menu into a static lining-coloured block of links under a paper header and hides the toggle. If the CDN fails, the `js` class is never added, nothing waits to be revealed, and the same menu toggles instantly with the same inert, focus and colour handling. Hidden load states exist only under `html.js` and only with `prefers-reduced-motion: no-preference`.
- **No dead ends:** every in-page link targets an existing id and moves focus there. Rows and Book a repair preset the Garment select. Map and mailto links open in a new tab with `rel="noopener"`.

## Adapting

Map the brand onto the `:root` tokens first. Keep the inside-outside logic: one mid or light outer colour for the page (`--flannel`), and one strong inner colour (`--lining`) used in bulk only by the menu. If the brand's inner colour already appears across the page, the menu loses its surprise. Recheck contrast: `--ink` and `--ink-soft` on `--flannel`, and `--paper` on `--lining`.

The menu fits five items at `--fs-menu`, which is capped by viewport height (`11.5vh`) so short laptop screens still fit. With more items, lower the cap or move secondary links to the side column. Longer item names wrap inside their masks, and the rise still works per item.

For another product, keep a cut edge that comes from the subject (perforation for a stamp printer, a torn deckle for a paper mill, a serrated edge for a bakery) and build it the same way: a fixed tooth size in px and a vertex count set by width. Swap the cloth swatches for the product's materials. Each swatch is a `.pk` span with an inner `<i>` that carries a CSS background.

The collection rows use the page's 12-column grid: name in columns 1 to 4, cloth in 5 to 7, then metres, made, price and Try on. Below 900 px they stack into three lines with the chip on the left.

**Retiming or removing motion.** CSS durations and eases are tokens (`--dur-*`, `--ease-out`, `--ease-inout`). GSAP timings are inline in the script, which uses `expo.out` for arrivals and `expo.inOut` for wipes. To drop a moment, delete its block inside `mm.add(...)`: the load sequence (`if (!root.classList.contains('loaded'))`), the row rules and chip cut (`rt`), the menu timeline (`tl`, after which the menu toggles instantly through the same `openMenu` and `closeMenu`), or the lining sheen (`if (fine)`). To shorten the menu, scale the four positions (0, .45, .6, .65) and durations together. Keep close at 1.3x to 1.5x of open. Never remove the reduced-motion branch or the `html.js` guard.

| Token | Role |
|---|---|
| `--flannel` | Page ground (the outer cloth), header layer when scrolled |
| `--flannel-dark` | Row rules, header rule, footer rule |
| `--ink` | Text, buttons, row sweep, field focus rule, focus ring on light grounds |
| `--ink-soft` | Secondary text, resting field rules, day-chip outlines |
| `--paper` | Fitting sheet, text and focus ring on the lining, the current-item tooth |
| `--lining` | Menu panel, button fill on hover and focus, error text and rules |
| `--band` | Ink tint that wipes across the Garment select when a row presets it |
| `--cloth-*` | Six cloth colours, used only by swatches and chips |
| `--font-ui` / `--font-text` | Josefin Sans (display and UI, 15 px minimum) / Petrona (reading and figures) |
| `--fs-xs` to `--fs-menu` | 15 px labels, 17 px body, 21 px lead and garment names, H2 clamp(28-38px), H1 clamp(44-96px), menu clamp(40px, 11.5vh, 116px) |
| `--sp-1` to `--sp-9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112 px |
| `--gutter` / `--col-gap` | Side margins clamp(16px, 4vw, 56px) / 24 px column gap |
| `--header-h` | 68 px (60 px under 600 px), also the anchor offset |
| `--tooth-w` / `--tooth-h` | The signature tooth, 28 x 14 px (the script's `TW` and `TD` must match) |
| `--swatch-tooth` / `--chip-tooth` / `--chip` | Pinked tooth on hero swatches (10 px) and chips (7 px), chip size 36 px |
| `--r-pill` | Buttons and day chips (size-tag eyelets); everything else is square |
| `--ease-out` / `--ease-inout` | expo.out and expo.inOut equivalents for CSS |
| `--dur-press` / `--dur-release` | MI1 press 0.12 s and release 0.4 s |
| `--dur-hover` / `--dur-fill` / `--dur-dim` / `--dur-sweep` / `--dur-row` / `--dur-swap` / `--dur-header` | 0.25 s field hover, 0.3 s lining fill, 0.35 s dimming, 0.4 s underline, 0.5 s row sweep, 0.45 s label swap, 0.45 s header hide |

## Motion

Everything runs inside one `gsap.matchMedia` with three conditions: motion `(prefers-reduced-motion: no-preference)`, reduce, and fine `(hover: hover) and (pointer: fine)`. Lenis and ScrollTrigger share the GSAP ticker (`autoRaf: false`, `lagSmoothing(0)`). Listeners use one `AbortController`. The cleanup aborts it, removes the tick, restores `lagSmoothing(500, 33)`, destroys Lenis and kills the menu timeline. SplitText and ScrollTriggers revert through matchMedia, and the load sequence runs once (`html.loaded`). Only transform, opacity and clip-path animate. The native cursor is never hidden. Technique ids refer to `research/motion-techniques.md`.

There are three deliberate departures from the plan. The section spy uses an IntersectionObserver (`-45% 0px -55% 0px`) instead of one ScrollTrigger per section. The header reads native scroll events in every mode, since Lenis writes real scroll positions. Both then keep working if the CDN fails. The `wide` condition was dropped because nothing uses it after the hero scrub was cut, and a width condition would rebuild Lenis and replay the load on every resize across it.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Wordmark letters rise in their masks | LD8 + TX1 (chars) | `document.fonts.ready`, capped at 1.2 s, +0.1 s | 0.7 s expo.out, stagger .035 | Visible, not split |
| Header links, Book a fitting and Menu settle from 6 px (clickable throughout) | LD8 | Load, +0.3 s | 0.5 s expo.out, stagger .06 | Static |
| Hero H1 rises line by line in masks padded 0.1 em | TX1 (lines) | Load, +0.25 s | 1.0 s expo.out, stagger .08, from 125% | Plain text |
| Header hides reading down and returns on the first scroll up; flannel layer and rule past 40 px | NV5 | Scroll direction past 2x header height | 0.45 s `--ease-out`; layer 0.3 s | Same states, instant |
| Section in view gets `aria-current`: a static ink line on desktop, a paper tooth in the menu | NV6 spy | Section crosses 45% of the viewport | Instant | Same |
| Collection row rules draw from the left | SC16 | List top at 85%, once | 0.9 s expo.out, stagger .07 | Static |
| Each chip is cut in with a 7 x 3.5 px pinked edge | Clip wipe (MD family), the signature's echo | Same trigger, +0.2 s | 0.5 s expo.out, stagger .07 | Whole |
| In-page anchors glide, then focus moves to the section | NV6 | Click on any `#` link | min(1.3, .65 + distance/4000) s | Native jump plus focus |
| **Menu: pinked edge falls, header turns to paper as it passes, items rise with a 4° tilt, tooth draws, side column settles; reverse at 1.5x** | NV1 + lenis.stop | Menu or Close, Escape, menu item | Edge 0.8 s expo.inOut; items from .45 s, 0.7 s expo.out, stagger .06; tooth .6 s; side .65 s, stagger .05 | Instant show and hide, same inert, focus and colours |
| Toggle label swaps Menu and Close in one cell; bars spread 3 px on hover, cross into an X when open | MI2 | Click; hover or focus | 0.45 s `--ease-inout`; bars 0.3 s | Instant |
| The lining catches the light where the pointer is | HV12 (pointer-driven sheen) | Pointer move over the open menu, fine pointers only | quickTo 0.9 s expo.out | Off (static glow) |
| Menu items: siblings dim, the item nudges right | HV7 | Hover, focus | 0.35 s dim, 0.4 s nudge | Dimming kept, no nudge |
| Header links: siblings dim | HV7 | Hover, focus | 0.35 s | Kept |
| Wordmark, hero link, map, repair, side, stockist and footer links: underline sweeps in from the left and out to the right | HV2 | Hover, focus | 0.4 s `--ease-out` | Persistent underline |
| Buttons: ink fill turns to lining, then press and release | Colour swap (opacity layer) + MI1 | Hover, focus; `:active` | 0.3 s; 0.12 s press, 0.4 s release | Instant swap, no press |
| Rows: other rows dim, an ink line sweeps along the bottom rule from the side the pointer entered, the chip scales to 1.15 | HV7 + sweep | Hover, focus; `:active` tints the row | 0.35 s dim, 0.5 s sweep | Dimming kept, instant |
| Garment select: an ink band wipes across after a row or Book a repair presets it | Clip wipe | After the anchor glide | 0.45 s in, 0.45 s out, expo.inOut | Value set, no wipe |
| Fields: ink layer on hover, ink rule draws from the left on focus, errors reveal on a reserved line | MI4 | Hover, focus, invalid submit | 0.25 s, 0.4 s, 0.3 s | Instant |
| Day chips: ink fill scales from the centre, label turns paper | MI3-style + MI1 | Checked; `:active` | 0.3 s | Instant fill |
| Request fitting swaps to Requested, an ink curtain covers the sheet, the confirmation is swapped in and uncovered; Request another fitting runs it back | MI2 + NV7 curtain | Valid submit; button | 0.45 s swap, then 0.6 s + 0.6 s expo.inOut | Instant swap, focus moves |
| Skip link slides in | | Focus | 0.3 s `--ease-out` | Instant |

Effects that need a hover run only for fine pointers. On touch, `:active` press states and persistent underlines carry the response, and the menu is the same timeline.
