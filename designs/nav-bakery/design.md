---
title: Bread-clip menu
section: nav
subject: Header and menu for Bramling Street Bakery (fictional), a two-oven neighbourhood bakery at 12 Bramling Street, Sheffield, that answers what regulars ask: are you open, what is out of the oven, and how do I order ahead.
aesthetic: A paper bread bag and its plastic clip. Bag-brown kraft for the header and menu, a straight bag fold where it ends, greaseproof white for the page, warm flexo-print black for every word, and one green die-cut bread clip as the menu toggle.
mode: light
fonts:
  - Podkova 700/800 (Google Fonts), stamped-bag lettering for the wordmark, the clip label, menu names and section headings
  - Karla 400/600 (Google Fonts), body, hints, the hours line and table, buttons and prices (tabular figures)
js: Closes the menu when a link is chosen or Escape is pressed.
libraries: []
tags: [nav, header, menu, details-summary, sticky, hide-on-scroll, bakery, food, local-business, kraft, light, simple, css-first]
use_when:
  - A small local business (bakery, café, deli, florist, butcher, bike shop) whose visitors come for hours, what is in stock and how to order.
  - Five or fewer places in the menu, each worth a one-line hint (an hour, a cut-off, an address).
  - The project wants a CSS-first menu that still works with the script removed.
avoid_when:
  - More than about six menu items, or nested sub-menus. The panel is one row on desktop and one column on phones.
  - Brands with no paper-and-packaging material to borrow, where a bread clip would be a joke without a referent.
  - Dark themes. The fold and the clip's die line are tuned for a mid-brown on a light page.
---

## Why it works

**The one bold idea: the menu toggle is a bread-bag clip.** The `<summary>` is a green die-cut plastic tag drawn as one inline SVG path (rounded rectangle, a round hole, and a V slot cut in from the bottom edge into the hole), outlined with a 2px ink die line and printed "Menu" in Podkova 800 the way a real clip carries its bake date. Opening the menu unclips it: the clip lifts 3px and tilts -9deg about its hole, the printed word swaps from "Menu" to "Close" inside the clip's print band (two words in a clipped window, sliding up), and the kraft panel opens downward from the bar's fold like a bag mouth (a `clip-path` reveal on `::details-content`). Nothing else in the header moves.

- **The menu answers the three questions before you click.** Each of the five places carries a hint that is real information: "Tuesday to Sunday from 7:30", "Out of the oven at 7:15 and 11:00", "By 4pm the day before", "12 Bramling Street, S11". The places are not a sequence, so they are not numbered.
- **CSS does the menu; the script only tidies up.** `<details>`/`<summary>` give the open state, keyboard toggling and the expanded announcement for free. The one inline script closes the menu when a link is chosen (so the open panel never covers the destination) and on Escape (focus returns to the clip). Without it, everything still works: the menu stays open, and the destination lands under it.
- **A straight bag fold, not a pinked edge.** The header ends with a 1px darker crease (`--kraft-crease`) and a 2px lit fold under it (`--kraft-fold`), as a folded bag top does. The panel repeats it. It marks where the header ends over the page when the header is stuck.
- **Hide on scroll in CSS.** `html { container-type: scroll-state }` and `@container scroll-state(scrolled: bottom)` slide the header away while reading down; the first scroll up brings it back. It never hides while the menu is open (`:has(.nav[open])`) or focus is inside the header (`:focus-within`). Browsers without scroll-state queries keep a plain sticky header.
- **Menu-board prices.** Item names join prices with dotted leaders (the leader is the item-to-price relation, not decoration), and prices are Karla 600 tabular lining figures so the pence align. Podkova has no `tnum` feature: at build, "1111" and "0000" in Podkova 600 measured 79.0px and 96.3px with `tabular-nums` on and off, while Karla measured 96.0px and 96.0px with it on. So prices are set in Karla.
- **Ordering without a fake form.** With no form handling, order ahead goes through three real channels: phone (`tel:`), WhatsApp with a prefilled message, and email with a prefilled subject and body, all `target="_blank" rel="noopener"`. A note says nothing is sent from the page.
- **One radius on one object.** The clip's 6px corners are the only rounded thing. Everything else is square, unshadowed and left aligned on one edge; prices are the only right-aligned text.
- **Palette checked against the collection.** Bag brown `#B9906A`, warm flexo black `#201C1A` and bread-clip green `#3E9E5A` sit away from the kraft, navy and yellow trios elsewhere in the collection. Contrast: ink on kraft 5.84, ink on paper 15.70, ink on clip 5.02, `--ink-soft` on paper 7.19 (`--ink-soft` is never used on kraft). The clip on kraft is only 1.16, so the clip's boundary is the 2px ink die line (5.84). Paper on the ink "Order ahead" button 15.70.
- **Cut at critique:** a zigzag bag-cut edge (another design's signature), a "You jumped here" current mark (never seen once the menu closes on navigation), a fixed-height scroll-padding workaround for the open panel (broke with text zoom), a steam wisp and an "oven on" dot (ambient motion competing with the clip), and finally the panel's own phone line, which repeated the Call row in Order ahead.

## Motion

Simple tier: CSS transitions and one small script, no libraries, no ambient motion. Every transition is inside `@media (prefers-reduced-motion: no-preference)`; under reduce, every state change is instant and the end states are identical. Hover styles sit inside `(hover: hover) and (pointer: fine)` and are mirrored on `:focus-visible`; on touch (`hover: none`) the HV2 underlines are drawn permanently.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Clip hover preview | custom, transform-origin at the hole | hover or focus-visible while closed | rotate -3deg, 0.3s cubic-bezier(.35,0,0,1) | none |
| Clip unclips | custom | open | translateY(-3px) rotate(-9deg), 0.45s cubic-bezier(.34,1.4,.64,1); close 0.3s | instant |
| Menu / Close swap inside the clip | MI2 | open / close | 0.35s open, 0.25s close, cubic-bezier(.65,0,.35,1) | instant |
| Panel opens like a bag mouth | CD6 adapted (clip-path on `::details-content`, `content-visibility` allow-discrete) | open / close | inset(0 0 100% 0) to inset(0), 0.4s open, 0.28s close, cubic-bezier(.625,.05,0,1) | instant |
| Menu names, hours line, inline links, order channels, Back to the top | HV2 | hover, focus-visible | 0.4s cubic-bezier(.35,0,0,1); .09em on menu names, .07em elsewhere | static underline on hover |
| Order ahead button | MI1 + colour | hover, focus, press | colour 0.18s ease-out; press scale .97 in 0.08s, release 0.25s spring | colour only |
| Order channel rows | MI1 | press | scale .98, 0.08s in, 0.25s release | none |
| Skip link | focus reveal | keyboard focus | translateY(-120%) to 0, 0.2s | instant |
| Header hides and returns | NV5 in CSS (scroll-state container query) | scroll down / up | translateY(-100% - 8px), 0.4s cubic-bezier(.16,1,.3,1) | instant toggle |
| Anchor jumps | NV6 lite (`scroll-behavior: smooth`, `scroll-padding-top`) | any in-page link | browser smooth scroll; sections have `tabindex="-1"` so focus follows | instant jump |

Verified at build in Chromium 154: the scroll-state query hides the header on wheel down (translateY -81px at 1440) and shows it on wheel up; `::details-content` animates `clip-path` (sampled at 97%, 41%, then fully open); choosing a menu link closes the menu and focuses the section; Escape closes and focuses the summary. The hover preview could not be captured headless (it reports `hover: none`).

## Do not touch

- The clip is the only bold object and the only radius. Do not add icons, a logo stamp, a badge or a second coloured element to the bar.
- The clip pivots about its hole (`transform-origin: 46px 32px`). Moving the origin makes it swing like a door instead of unclipping.
- The open state is slower than the close (0.45s against 0.3s). Keep the asymmetry.
- The panel is positioned absolutely (`::details-content` at `top: 100%` of the header) so opening it never reflows the page. Do not animate height.
- The hidden word in the clip is `aria-hidden`; the summary's accessible name is the visually hidden "Menu", plus the native expanded state. Do not let screen readers read "Menu Close".
- `--ink-soft` is for text on `--paper` only (2.7:1 on kraft).
- Hide-on-scroll must keep both guards: never while the menu is open, never while focus is inside the header.

## Adapting

Change the `:root` tokens first. `--kraft`, `--kraft-crease` and `--kraft-fold` are the bag (keep the crease darker and the fold lighter than the bag); `--clip` is the one object colour; `--ink` must reach 4.5:1 on `--kraft`, `--paper` and `--clip`. For another trade, swap the clip for that trade's own fastener or tag (a florist's ribbon tag, a butcher's ticket, a bike shop's valve cap) and keep the mechanics: a pivot point, a printed label that swaps, and a panel that opens from the bar's edge.

Copy: five places with a one-line hint each. Longer names wrap in the desktop row; past about 14 characters, shorten the name and put the detail in the hint. The phone panel scrolls inside itself (`max-height: calc(100dvh - var(--bar-h))`). The header hours line moves into the page body below 1040px, and the Order ahead button leaves the bar below 640px (it stays in the menu).

Retiming: all durations and easings are in the transitions under `prefers-reduced-motion: no-preference`; delete that media block to remove motion entirely. To drop hide-on-scroll, delete the `@supports (container-type: scroll-state)` block. Without the script, the menu stays open after a link is chosen; if your stack has a router, close the `<details>` on route change instead.

| Token | Role |
|---|---|
| `--kraft` | Header bar and menu panel |
| `--kraft-crease` | 1px fold line under the bar and the panel |
| `--kraft-fold` | 2px lit edge under the crease |
| `--paper` | Page body |
| `--ink` | All text, Order ahead fill, focus rings, the clip's die line |
| `--ink-press` | Order ahead hover and focus fill |
| `--ink-soft` | Secondary text on paper |
| `--clip` | The bread clip only |
| `--rule` | Table and section rules on paper |
| `--f-stamp`, `--f-text` | Podkova (lettering), Karla (text and prices) |
| `--t-1` to `--t3` | Major-third type scale from 17px |
| `--s1` to `--s9` | 4px-based spacing |
| `--gutter`, `--max`, `--bar-h` | Page edge, content width, bar height (scroll padding uses it) |
| `--radius-clip` | The clip's corner radius (drawn into its path) |
