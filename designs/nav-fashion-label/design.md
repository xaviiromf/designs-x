---
title: Pinked lining menu
section: nav
subject: Hilván (fictional), an independent womenswear and menswear label in Valdivia, Chile, that cuts small numbered runs from end-of-roll Chilean cloth, sells through atelier fittings and four stockists, and mends what it makes free for life.
aesthetic: The coat itself, outer cloth outside and lining inside. The page is grey wool flannel with a paper pattern piece laid on it, and the menu is the mulberry lining, opening with a pinking-shear edge. Josefin Sans fashion-plate lettering over a text serif.
mode: light
fonts:
  - Josefin Sans (Google Fonts, variable wght 300-700) for the wordmark, header, menu, headings, buttons and labels
  - Petrona (Google Fonts, variable wght 400-600) for body text, garment notes and every figure, set with tabular-nums lining-nums
js: Opens and closes the full-screen menu as one reversible timeline with a pinked clip-path edge (Lenis stopped, page inert, focus in and back, Escape; a chosen item jumps the page under the lining before it lifts), moves a chalk marker to the current, hovered or focused item, hides the header while reading down (never during a glide you started), marks the section in view, eases in-page anchors and moves focus, runs the load sequence and the row-rule draw, presets the fitting form's garment from a row, and validates the fitting form with an in-place confirmation behind a curtain. Nothing posts to a server.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [nav, header, full-screen-menu, fashion, apparel, hide-on-scroll, section-spy, gsap, lenis, form]
use_when:
  - A small fashion, tailoring or textile brand whose site is one long page and whose menu can carry a moment of brand theatre.
  - The product has a hidden inside that matters (a lining, a reverse side, a back room), so the menu can turn the page inside out.
  - The header must stay light while reading. It hides on the way down, comes back on the way up and marks the section you are in.
avoid_when:
  - The site has deep navigation (dozens of pages, mega-menus). Five big items is the limit of this panel.
  - People open the menu many times per visit. A 1.4 s open and a 0.9 s close get tiring; use a shorter timeline or a plain overlay.
  - The brand already uses a strong dark colour across the page. The lining only surprises because the page never shows it in bulk.
---

## Why it works

**The bold idea is that the menu turns the coat inside out.** The page is the coat's outer cloth: a grey wool-flannel ground (`--flannel` #B4B8B0) with ink type. Pressing Menu drops a mulberry panel from the top of the screen. Its leading edge is a pinked zigzag, the edge pinking shears leave on cloth. The edge is a clip-path polygon built in px, so every tooth is 28 px wide and 14 px deep on a 360 px phone and on a 1600 px screen, and the vertex count is fixed for each width (one point every 14 px). The wordmark and toggle switch from ink to paper on the frame where the edge passes the header's mid-height, and the header links and button are covered at the same moment. While it moves, the lining has thickness: two drop-shadow filters on its wrapper follow the clipped teeth, a 3 px dark lip and a soft shadow on the page, and they are dropped once the clip clears. The five destinations then rise from their baselines with a 4° tilt that straightens, and a yellow tailor's-chalk stroke (slightly uneven, grained, tilted 4°) draws in beside the section you are reading with a clip, so its texture never stretches. Closing runs the same timeline backwards at 1.5x, so the zigzag travels back up. Choosing an item moves the page to that section while the lining still covers it, so the lifting lining reveals the destination: the reveal is the arrival. Everything else on the page stays quiet so this one moment carries.

- **The pinked edge appears once more, in the collection.** Each row carries a 36 px cloth chip with pinked edges on all four sides (two nested CSS masks: top and bottom on the outer box, left and right on the inner) and the cloth name in text. It is always visible, so nothing about the cloth depends on hover.
- **The cutting table sets the hero.** A static inline-SVG pattern piece for the Faro coat front (paper `--paper` on flannel) carries real drafting marks: notches, buttonhole marks, a pocket line, the centre-front line and a grainline arrow, with "Faro coat, front. Cut 2 in self." written on the piece. It is laid down once, at the end of the load: it drops 14 px with a 2.5° turn, settles flat, and its shadow closes as it lands.
- **Structure is information.** Seven rules run between and around the six garments, the last closing the list. The columns are metres per piece, the number made and the price, and they sit on the page grid, so the cloth column lines up with every section's text column (columns 5 to 11). Metres and made counts are the label's real story: scarcity comes from cloth, not marketing. The made counts add up to the 122 in the intro, and prices are Chilean pesos with CLP stated once.
- **The header behaves like a well-made garment.** It is transparent over the hero and picks up a flannel layer and a 1 px rule past 40 px. It hides while reading down past twice its height and returns on the first scroll up. It never hides while the menu is open, while focus is inside it, or during an anchor glide you started from it. On desktop a static 2 px ink line marks the current section under Run 07, Atelier or Repairs. It does not travel.
- **Two clearly distinct families.** Josefin Sans (a 1920s fashion-plate geometric) sets the display and UI and never goes below 15 px, because its x-height is small. Petrona sets reading text and every figure. Checked in headless Chromium on 2026-10-24: Josefin Sans has no tabular figures ('1111' measures 131.6 px and '0000' 249.2 px), while Petrona does (217.6 px each). So prices, metres and made counts are always Petrona with `tabular-nums lining-nums`.
- **Palette from the coat.** `--flannel` is the outer cloth, a mid-value ground. `--ink` #1E2130 is for text and buttons (7.9:1 on flannel) and `--ink-soft` #363A45 for secondary text (5.6:1). `--paper` #E6E8E3 is used only for the pattern piece, the fitting sheet, the focus offset and the text on the lining (10:1 on mulberry). `--lining` #5B1F3A appears only as the menu panel. `--chalk` #F2D04B appears only on the lining: the marker, the side-link underlines and the focus ring (8.2:1).
- **Specific copy.** Garment names from places around Valdivia (Faro, Calle-Calle, Niebla, Corral, Isla Teja, Muelle), cloths, metres per piece, made counts and prices. Fittings run Thursday to Saturday, repairs are free for life and the next run is cut on 14 November. Buttons say what happens, and the action keeps its name: Request fitting, Requested, Fitting requested.

**Reasoned defaults and collection notes.**
- Default 1 (cream with a serif and a warm accent): the ground is a cool grey flannel and the display face is a geometric sans. There is no warm accent; the only strong colour is the lining.
- Default 2 (near-black with one accent): the only dark surface is the menu, and it is mulberry, because the lining is the meaning.
- Default 3 (broadsheet rules): only the collection list has rules. Buttons and day chips are 999 px pills, like size-tag eyelets, and there are no dense columns.
- Default 5 (template chrome): no eyebrows, middle dots or arrows. Mobile row meta joins with a comma, and figures use the text serif, not a monospace.
- Default 8 (fade-up on every section): only the hero H1 rises, on load. Sections otherwise appear as they are, and the collection reveals only its rules.
- Kept clear of process-bespoke-tailor (tape measure, basting stitches, a pattern bundle drawn with DrawSVG), gallery-classic-cars (a chip card that follows the pointer), nav-yacht-builder (a travelling indicator and the HV4 fill from the entry edge), contact-brand-agency (ultramarine), faq-language-school (Valparaíso) and features-mixing-plugin (Jost with Source Serif 4). Petrona is also story-oyster-farm's only family; here it is paired with Josefin.
- After the collection, Atelier and Repairs share one row on the text column (columns 5 to 8 and 9 to 12, Repairs a beat lower), so the lower page does not repeat the same heading-left, text-right block four times. Stockists and the fitting sheet keep that block.
- The atelier address is a real street (General Lagos, Valdivia). The label and the four stockists (Paños del Puerto, Almacén Lastarria, Tienda Sur, Casa Brava) are invented, so their map links open a Google Maps search for the city or neighbourhood, never for a business.

## Do not touch

- **The tooth is in px.** `edge()` places one vertex every `TW / 2` = 14 px across the viewport and moves the front by `p * (vh + 28) - 14`, with odd vertices 14 px lower. Do not switch it to percentages, because teeth would grow coarse on wide screens and fine on phones. `#selftest` checks `edge()` for widths 360, 390, 1440 and 1600: the tooth size, the fixed vertex count, fully hidden at p = 0, fully covered at p = 1 and full width. It checks the formula, not a rendered layout, and it does not cover the day radios or the form flow. The clip-path is cleared when the panel is fully open.
- **The header flip is synced to the edge,** not a colour transition. The `on-lining` class switches in the timeline's `onUpdate` when the edge passes the header's mid-height, so it also works in reverse. The wordmark has no resting colour transition for this reason (its hover transition lives on `:hover`). Header links and the button become `visibility: hidden` at that frame, so they are covered and not focusable. On the way back up the flannel layer appears with no fade (`is-uncovering`), so the header is never bare over the page.
- **One timeline.** Open is `tl.timeScale(1).play()` and close is `tl.timeScale(1.5).reverse()`. Rapid toggles only flip direction. `onReverseComplete` hides the panel, removes `inert` from main, the footer and the skip link, restarts Lenis and then focuses the chosen section. Menu items jump under the lining, then the lining lifts: the click scrolls the page instantly (`lenis.scrollTo(top, { immediate: true, force: true })`) while the panel still covers it and updates the header's scroll baseline, so the header stays. Do not go back to closing first and gliding after, which ends the reveal on the wrong page. While the menu is inert, the character rolls have no transition, so a hovered item settles at once instead of rolling while it falls.
- **Chalk only on the lining.** The marker, the side-link underlines and the focus ring there are chalk; nothing on the flannel page is yellow. The Garment-select wipe is therefore an ink tint (`--band`), not chalk.
- **Accessibility:** the toggle has `aria-expanded` and `aria-controls="menu"`, and its visible label and accessible name both swap between Menu and Close. On open, focus and the chalk marker go to the current item, or the first one when the hero is in view. On close, focus returns to the toggle at once, also when an item was chosen (the page is still inert then); the chosen section takes focus when the lining has lifted. Escape closes the menu. The keyboard is never trapped, because the panel follows the toggle in tab order and nothing behind it is focusable. Focus is a 2 px ink ring with a 2 px paper offset on light grounds and a 2 px chalk ring on the lining. Rolled labels keep their text in an sr-only copy; the split characters are `aria-hidden`. Hover dimming is mirrored by `:focus-visible`, and hover wins when both are present. Dimming stops at `--dim` (.78), so dimmed ink stays 4.9:1 on flannel and paper 6.6:1 on the lining, and secondary ink-soft text turns ink while dimmed (`--soft`) so it keeps AA. The cloth chips dim further, since they are decorative. On touch the menu side links get 44 px targets. Effects that need a hover (rolls, sibling dimming, the row sweep, chip scaling, underline sweeps) are gated by `(hover: hover) and (pointer: fine)`. Underlines are persistent on touch and under reduced motion.
- **Form:** validation is in script (`novalidate`). Errors set `aria-invalid` and `aria-describedby` (only while invalid) and reveal on a reserved line with a clip-path. Focus goes to the first invalid field, and nothing shakes. The confirmation keeps the form's height so the page does not jump under the curtain. Request another fitting resets the form and returns focus to Your name.
- **Progressive enhancement:** with no JavaScript, `@media (scripting: none)` turns the menu into a static lining-coloured block of links under a paper header and hides the toggle. If the CDN fails, the `js` class is never added, nothing waits to be revealed, and the same menu toggles instantly with the same inert, focus, chalk and colour handling. Hidden load states exist only under `html.js` and only with `prefers-reduced-motion: no-preference`.
- **No dead ends:** every in-page link targets an existing id and moves focus there. Rows and Book a repair preset the Garment select. Map and mailto links open in a new tab with `rel="noopener"`, and each says so to screen readers ('opens map in a new tab', 'opens your email app').

## Adapting

Map the brand onto the `:root` tokens first. Keep the inside-outside logic: one mid or light outer colour for the page (`--flannel`), and one strong inner colour (`--lining`) used only by the menu, with one accent (`--chalk`) that lives only on that inner colour. If the inner colour already appears across the page, the menu loses its surprise. Recheck contrast: `--ink` and `--ink-soft` on `--flannel`, `--paper` and `--chalk` on `--lining`.

The menu fits five items at `--fs-menu`, which is capped by viewport height (`11.5vh`) so short laptop screens still fit. Under 600 px it is larger than the hero H1 (`clamp(44px, min(12.5vw, 8.5vh), 64px)`), the items hold the upper field and the atelier block sits at the foot of the lining like a sewn-in label; five items and that block fit a 360 x 640 phone without scrolling. With more items, lower the cap or move secondary links to the side column. Longer item names wrap between words, and each word's characters roll together.

For another product, keep a cut edge that comes from the subject (perforation for a stamp printer, a torn deckle for a paper mill, a serrated edge for a bakery) and build it the same way: a fixed tooth size in px and a vertex count set by width. Swap the pattern piece for a drawing from the product's own workbench, and the cloth chips for its materials. Each chip is a `.chip` span with an inner `<i>` that carries a CSS background.

The collection rows use the page's 12-column grid: name in columns 1 to 4, cloth in 5 to 7, then metres, made, price and Try on. Below 900 px they stack into three lines with the chip on the left.

**Retiming or removing motion.** CSS durations and eases are tokens (`--dur-*`, `--step-roll*`, `--ease-out`, `--ease-inout`). GSAP timings are inline in the script, which uses `expo.out` for arrivals and `expo.inOut` for wipes. To drop a moment, delete its block inside `mm.add(...)`: the load sequence (`if (!root.classList.contains('loaded'))`), the row rules (`rows`), the menu timeline (`tl`, after which the menu toggles instantly through the same `openMenu` and `closeMenu`), or the lining sheen (`if (fine)`). The lining's thickness is the `.menu-wrap` filter; delete that rule to drop it. To drop the character rolls, remove the `data-roll` attributes. To shorten the menu, scale the four positions (0, .45, .6, .65) and durations together, and keep close at 1.3x to 1.5x of open. Never remove the reduced-motion branch or the `html.js` guard.

| Token | Role |
|---|---|
| `--flannel` | Page ground (the outer cloth), header layer when scrolled |
| `--flannel-dark` | Row rules, header rule, footer rule |
| `--ink` | Text, buttons, row sweep, field rules, error text, focus ring on light grounds, curtain |
| `--ink-soft` | Secondary text, resting field rules, day-chip outlines, centre-front line |
| `--paper` | Pattern piece, fitting sheet, focus offset, text on the lining, button fill on hover |
| `--lining` | Menu panel only |
| `--chalk` | Marker, side-link underlines and focus ring, on the lining only |
| `--band` | Ink tint that wipes across the Garment select when a row presets it |
| `--wm-hover` | Wordmark hover colour (redefined on the lining) |
| `--dim` | Opacity of siblings dimmed by hover or focus (.78, the AA floor for ink on flannel) |
| `--cloth-*` | Six cloth colours, used only by the row chips |
| `--font-ui` / `--font-text` | Josefin Sans (display and UI, 15 px minimum) / Petrona (reading and figures) |
| `--fs-xs` to `--fs-menu` | 15 px labels, body clamp(17-19 px) with paragraphs capped at 31em (75 characters or fewer), 21 px lead and garment names, H2 clamp(28-38 px), H1 clamp(44-96 px), menu clamp(40 px, 11.5vh, 116 px), clamp(44-64 px) on phones |
| `--sp-1` to `--sp-9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112 px |
| `--gutter` / `--col-gap` | Side margins clamp(16px, 4vw, 56px) / 24 px column gap |
| `--header-h` | 68 px (60 px under 600 px), also the anchor offset |
| `--tooth-w` / `--tooth-h` | The signature tooth, 28 x 14 px (the script's `TW` and `TD` must match) |
| `--chip` / `--chip-tooth` | Row chip size 36 px and its pinked tooth 7 px |
| `--r-pill` | Buttons and day chips (size-tag eyelets); everything else is square |
| `--ease-out` / `--ease-inout` | expo.out and expo.inOut equivalents for CSS |
| `--dur-press` / `--dur-release` | MI1 press 0.12 s and release 0.4 s |
| `--dur-roll` / `--step-roll`, `--dur-roll-m` / `--step-roll-m` | HV1 roll 0.45 s with a 14 ms step per character (header, Try on); 0.5 s with 16 ms in the menu |
| `--dur-hover` / `--dur-dim` / `--dur-sweep` / `--dur-row` / `--dur-swap` / `--dur-header` | 0.25 s field and wordmark hover, 0.35 s dimming, 0.4 s underline, 0.5 s row sweep, 0.45 s label swap, 0.45 s header hide |

## Motion

Everything runs inside one `gsap.matchMedia` with three conditions: motion `(prefers-reduced-motion: no-preference)`, reduce, and fine `(hover: hover) and (pointer: fine)`. Lenis and ScrollTrigger share the GSAP ticker (`autoRaf: false`, `lagSmoothing(0)`). Motion listeners use one `AbortController`. The cleanup aborts it, removes the tick, restores `lagSmoothing(500, 33)`, destroys Lenis and kills the menu timeline. SplitText and ScrollTriggers revert through matchMedia, and the load sequence runs once (`html.loaded`). Only transform, opacity, clip-path and filter animate. The native cursor is never hidden. Technique ids refer to `research/motion-techniques.md`.

Deliberate departures from the plan: the section spy uses an IntersectionObserver (`-45% 0px -55% 0px`) instead of one ScrollTrigger per section, and the header reads native scroll events in every mode (Lenis writes real scroll positions), so both keep working if the CDN fails. The `wide` condition is not used, since nothing needs it after the hero scrub was cut. Menu items start at `yPercent: 130` and H1 lines at 125 rather than 105 and 110, because Josefin's glyphs overflow their line box upward and would show as slivers at the mask edge.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Wordmark letters rise in their masks | LD8 + TX1 (chars) | `document.fonts.ready` (Josefin's latin file preloaded), capped at 0.4 s, +0.1 s | 0.7 s expo.out, stagger .035 | Visible, not split |
| Header links, Book a fitting and Menu settle from 6 px (clickable throughout) | LD8 | Load, +0.3 s | 0.5 s expo.out, stagger .06 | Static |
| Hero H1 rises line by line in masks padded 0.1 em; lead and CTAs never wait | TX1 (lines) | Load, +0.25 s | 1.0 s expo.out, stagger .08 | Plain text |
| The pattern piece is laid down: drops 14 px with a 2.5° turn and settles flat while its drop shadow closes | Opacity, transform and filter | Load, +1.0 s (sequence ends at 1.8 s) | 0.8 s expo.out | Visible |
| Header hides reading down and returns on the first scroll up; flannel layer and rule past 40 px | NV5 | Scroll direction past 2x header height | 0.45 s `--ease-out`; layer 0.3 s, none when the lining uncovers it | Same states, instant |
| Section in view gets `aria-current`: a static ink line on desktop, the chalk marker in the menu | NV6 spy | Section crosses 45% of the viewport | Instant | Same |
| Collection rules (seven, between and around the six rows) draw from the left; row text is never hidden | SC16 | List top at 85%, once | 0.9 s expo.out, stagger .07 | Static |
| In-page anchors glide, then focus moves to the section; the header stays during the glide | NV6 | Click on any `#` link outside the menu | min(1.3, .65 + distance/4000) s | Native jump plus focus |
| **Menu: pinked edge falls with a drop-shadow lip, header turns to paper as it passes, items rise with a 4° tilt, chalk draws in with a clip, side column settles; reverse at 1.5x. A menu item jumps the page under the lining, then the lining lifts to reveal it** | NV1 + lenis.stop | Menu or Close, Escape, menu item | Edge 0.8 s expo.inOut; items from .45 s, 0.7 s expo.out, stagger .06; chalk .6 s, 0.4 s; side .65 s, stagger .05; destination reached in about 0.9 s | Instant show and hide, no shadow, same jump, inert, focus, chalk and colours |
| Chalk marker is wiped off the old item and drawn in at the hovered or focused one, and returns to the current one | Clip draw (inside the menu only) | Pointer over, focus in; pointer leave, focus out | 0.18 s out, 0.35 s in, expo | Jumps |
| Toggle label swaps Menu and Close in one cell; bars spread 3 px on hover, cross into an X when open | MI2 + MI1 | Click; hover or focus; `:active` | 0.45 s `--ease-inout`; bars 0.3 s | Instant |
| Header links, menu items and Try on roll character by character | HV1 (per-character wave) | Hover (fine pointers), focus | 0.45 s, 14 ms step; menu 0.5 s, 16 ms step | Underline (header, Try on) or dimming (menu), no roll |
| Menu items, collection rows and stockist rows dim their siblings | HV7 | Hover, `:focus-visible` | 0.35 s to .78 opacity (chips .5 more) | Kept |
| The lining catches the light where the pointer is | HV12 (pointer-driven sheen) | Pointer move over the open menu, fine pointers only | quickTo 0.9 s expo.out | Off; also off on touch, where nothing would move it |
| Hero link, map, repair, side, stockist and footer links: underline sweeps in from the left and out to the right (chalk on the lining) | HV2 | Hover, focus | 0.4 s `--ease-out` | Persistent underline |
| Buttons swap ink and paper, then press and release | Instant colour swap + MI1 | Hover, focus; `:active` | Instant; 0.12 s press, 0.4 s release | Swap, no press |
| Wordmark changes colour; presses on touch | Colour + MI1 | Hover, focus; `:active` | 0.25 s; 0.12 s / 0.4 s | Instant |
| Rows: an ink line sweeps along the bottom rule from the side the pointer entered, the chip scales to 1.15 | Direction-aware sweep | Hover, focus; `:active` tints the row and presses | 0.5 s `--ease-out` | Dimming kept, instant |
| Garment select: an ink band wipes across after a row or Book a repair presets it | Clip wipe | After the anchor glide, or when the lining has lifted | 0.45 s in, 0.45 s out, expo.inOut | Value set, no wipe |
| Fields: ink layer on hover, ink rule draws from the left on focus, errors reveal on a reserved line | MI4 | Hover, focus, invalid submit | 0.25 s, 0.4 s, 0.3 s | Instant |
| Day chips: ink fill scales from the centre, label turns paper | MI3-style + MI1 | Checked; `:active` | 0.3 s | Instant fill |
| Request fitting swaps to Requested, an ink curtain covers the sheet, the confirmation is swapped in and uncovered; Request another fitting runs it back | MI2 + NV7 curtain | Valid submit; button | 0.45 s swap, then 0.6 s + 0.6 s expo.inOut | Instant swap, focus moves |
| Skip link slides in | | Focus | 0.3 s `--ease-out` | Instant |

Effects that need a hover run only for fine pointers. On touch, `:active` press states and persistent underlines carry the response, the always-visible chips carry the cloth, and the menu is the same timeline.
