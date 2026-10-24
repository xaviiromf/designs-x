---
title: Concert hall platform-plan mega-menu
section: nav
subject: Season-site header for Kestle Hall (fictional), a 1,480-seat shoebox concert hall on Harbour Quay, Port Ardley, in its hundredth season (2026-27, 41 of 64 concerts still to play), with two mega-menus, a season ruler and a reservation form below.
aesthetic: The auditorium with the house lights down. Unlit seat velvet for the ground, cool platform light for the text, lit velvet rose as the one colour, and the stage manager's platform plan as the drawing.
mode: dark
fonts:
  - Brygada 1918 (Google Fonts, variable wght 400-700 with italics), for the wordmark, hero H1, section and month headings, and composer and work titles; italic only for named works
  - Red Hat Text (Google Fonts, variable wght 300-700), for nav labels, buttons, body, captions, the plan legend and the form; dates and times at 600 with tabular figures
js: Opens two hover-intent mega-menus (a phone sheet with accordions below 992px), reseats a 168-dot platform plan for whichever concert is pointed at, focused or tapped, labels the section under the pointer, hides the header while reading down, scrubs a season ruler, marks the section in view, eases in-page links and moves focus, and validates a seat reservation with an in-page confirmation.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [nav, header, mega-menu, hover-intent, hide-on-scroll, section-spy, svg, data-driven, concert-hall, music, venue, booking, form, dark, gsap, lenis, detailed]
use_when:
  - A venue or ensemble selling a season, where each date puts a different number and arrangement of people on stage (concert halls, orchestras, opera and dance companies, theatres with a cast list).
  - The site needs a mega-menu that previews something real for each item, not decoration, and a header that stays out of the way on long listing pages.
  - About eight featured items in the menu, each with a date and a title.
avoid_when:
  - The offer has no physical arrangement worth drawing. The plan would turn into an ornament.
  - More than about ten featured items, or items without dates. The list and the fixed panel height are sized for eight dated rows.
  - Light, bright brands. The palette and the "house lights down" load depend on a dark ground.
---

## Why it works

**The one bold idea: the What's on menu redraws the platform for the concert you point at.** Next to the eight featured concerts sits the stage manager's plan of Kestle Hall: the rectangular platform, three straight riser bands, the podium, the organ console, five rows of choir seats behind it and the stage door in the left wing. One pool of 168 dots keeps its identity. When the active concert changes, players who stay walk from their old chairs to their new ones (0.7s, staggered outward from the podium), players who are not needed walk off through the stage door, newcomers walk in through it, and the chorus fills the choir seats from the front row, centre out. The Halcyon Quartet (4), Port Ardley Baroque (19), Music for 18 Musicians (18), Peter and the Wolf (35), Mahler 6 (108) and the Brahms Requiem with chorus (168) read as different sizes before you read a word. Everything else on the page is quiet so this can be the moment.

- **The plan is honest data.** Each concert is a list of sections in one `PLATFORM` array (label, family, chair positions) and every count in the caption comes from it. The Mahler has 16 first violins, two harps, celesta and seven percussionists for the cowbells and the hammer; Peter and the Wolf's bird, duck, cat and Grandfather sit in the front row of the woodwind; the Requiem's organist sits at the console and the two soloists by the podium. Strings sit on arcs round the podium because real string sections curve; wind, brass and percussion sit in straight rows on the risers, so it reads as a plan, not a fan. `#selftest` asserts that every concert's dot count equals its caption, that the legend adds up, that no two chairs in a concert are closer than 10 units (it caught the first draft's neighbouring sections touching at their edges), that every row points at a concert in the list, and that the Requiem uses all 168 dots.
- **Nothing is hover-only.** The caption under the plan carries the date, the title, a sentence and a legend with every family's count (strings filled platform-white, woodwind white rings, brass filled velvet, percussion and keyboards velvet rings, voices filled rose-grey). Keyboard focus on a row reseats the plan and announces the caption (`aria-live` is set to polite only for focus and tap, off for pointer sweeps). On touch and on any `(hover: none)` device each row has a Platform button with `aria-pressed`; tapping the drawing shows the same section label as the pointer readout. The SVG itself is `aria-hidden` because the caption says everything it shows.
- **Fine pointers get a readout.** Over the drawing, the section nearest the pointer stays lit, the rest drop to 45% fill and stroke opacity, and a small label ("First violins, 16", "Kestle Hall Chorus, 90") follows the pointer with `gsap.quickTo`. The native cursor stays. The nearest-dot search runs once per animation frame against cached chair positions, never against the DOM.
- **A plan that keeps up with the pointer.** Sweeping down the list would restart the walk eight times, so a row becomes active only after 70ms of intent and the previous walk is killed before the next starts. The list and the caption change at the same moment from one `setActive(i)`.
- **The menus are calm.** Both mega panels share one fixed height (480px; 520px between 992 and 1059px, where three titles wrap) and one backing layer, so switching from What's on to Visit crossfades content and nothing animates height. Hover opens after 80ms, or instantly if the other panel is open; leaving trigger and panel starts a 140ms close that is cancelled if the pointer comes back; an invisible bridge covers the ruler between trigger and panel. Click, Enter and Space toggle; ArrowDown opens and focuses the first row; Escape closes and returns focus; an outside click, the scrim or focus leaving closes. The page scrim is the house at 55%, "house lights down" behind the panel. Lenis stops on every open path and starts on every close path, with `html.menu-open` as the overflow fallback when Lenis is off. Menus are disclosure buttons and panels, not `role="menu"`.
- **The season ruler is the header's one moving mark.** Under the nav, a hairline runs from 1 September to the end of June with a tick on the first of each month and a velvet dot for where you are reading. Through the season list the dot scrubs month by month; the month at the reading line gets `aria-current` and turns platform-white. The reading line sits at 30% of the viewport, so a month you jump to from the ruler is the month the ruler marks (at 60%, as first planned, jumping to April marked May).
- **Hide-on-scroll with guards.** The header slides away while reading down past 120px and returns on the first scroll up. It never hides while a menu is open, while keyboard focus is inside it, or during an anchor glide and the 600ms after it. At the very top its backdrop disappears; elsewhere it is the house at 94% with a 10px blur.
- **The form knows the hall.** Choir seats are £9 except when the chorus sits in them. Choosing Messiah, the Requiem or the Ninth disables the Choir seats radio with the reason in text ("The chorus sits in the choir seats for this concert"), moves a choir selection to the circle and updates the total. The seat count and the total line ("2 circle seats, £48") roll in place; a Reserve link in the season list preselects its concert and lands focus on the concert select. Errors appear inline under each field with `aria-invalid`, and focus moves to the first one. The confirmation covers the form with a velvet-edged panel, focus moves to "Reserved", and "Reserve more seats" brings the form back with its values. Nothing is sent.
- **Type from the programme book.** Brygada 1918 sets composers in 600 and works in 400, with italics only for named works (*A German Requiem*, *Messiah*, *La mer*), never for generic titles (Symphony No. 6), as concert programmes do. Dates are Red Hat Text 600 with tabular figures; measured in Chromium at 100px, "1111" and "0000" are both 240px with `tabular-nums` (141 and 271px without), so the date column aligns without a monospace. Red Hat Text replaced Instrument Sans, which seven other designs already use; its one other use in the collection is hero-doc-festival's body text, paired there with Red Hat Display.
- **Palette checked against the collection.** House `#2E1423` (unlit velvet, rose-black, no violet), balcony `#3B2230` one step lighter in the same hue, platform light `#E1ECEF` (cool, not cream), programme rose-grey `#C09AA6`, velvet `#D46A7E`. Nearest collection colours by CIEDE2000: house 4.3 (hero-perfumery `--shed`, footer-record-label `--oxblood`), balcony 4.7, programme 5.2, velvet 8.6, platform light 3.1 (a text white; whites crowd). It moved off testimonials-youth-orchestra's violet-and-cream pairing. Contrast: platform light on house 14.06 and on balcony 11.97; programme on house 6.78 and on balcony 5.77; house text on velvet 4.97 and on the lit velvet hover 6.68; velvet error text on house 4.97. Velvet on balcony is 4.23, so velvet is used there only for marks (row bar, dots, legend), never small text. Sibling dimming in the menus is done by colour (programme, 5.77) rather than opacity, so dimmed rows stay AA.
- **Cut at critique:** the travelling NV4 bar under the nav (another nav design's signature; `aria-current` is now a static 2px velvet underline), the load-time wordmark and H1 reveals and SplitText with them, the fill-from-edge button hover and the masked Menu/Close swap (both used elsewhere), the month-rule draw-ins (the month rules are static; motion is spent on the plan), a header hairline that doubled the ruler line, a "See all 64 concerts" link on a page that lists the highlights (now "See the season by month"), and finally the hall's four-fact list, which repeated its own paragraph.

## Motion

Detailed tier: GSAP 3.15 with ScrollTrigger, and Lenis 1.3.26 on GSAP's ticker (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`), all inside one `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` conditions and a cleanup that removes the ticker, restores lag smoothing and destroys Lenis. Menus, the reseat (instant), the spy, anchors and the form are plain JavaScript and work if the CDN fails; GSAP only animates. Hidden start states exist only under `html.js:not(.loaded)`, and `js` is added only when the libraries loaded. Under `prefers-reduced-motion: reduce` every CSS transition is removed, Lenis is not created, scrolling is native, and every state below is set instantly.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| House lights go down | LD8 adapted | page load | platform light at 18% over the page, opacity 1 to 0, 1.2s power2.out | no overlay |
| Season ruler draws | SC16 | page load | hairline scaleX 0 to 1 from the left, 0.9s expo.out at 0.15s; month labels opacity and y 4px, 0.45s, stagger 0.04 from 0.25s; marker scale 0 to 1, 0.4s expo.out at 0.8s (phones: ticks static, line and marker only) | static |
| Header hides and returns | NV5 | Lenis scroll direction; a passive scroll listener with a 6px dead-zone when Lenis is off | translateY(-100%) 0.45s cubic-bezier(.16,1,.3,1); backdrop opacity 0.35s at the top | instant toggle |
| Ruler marker scrubs | SC11 adapted | one ScrollTrigger per month, start `top 30%`, end `bottom 30%`, mapped through the month boundaries | scrub, ease none, xPercent on a full-width runner (no measuring) | snaps to the month start from an IntersectionObserver |
| Section spy | NV6 | IntersectionObserver, rootMargin `-40% 0px -55% 0px` | static 2px velvet underline on the current item | same |
| Eased anchors | NV6 | every in-page link | `lenis.scrollTo`, duration min(1.3, 0.65 + distance / 4000), offset by the header, then focus the heading, row or field | immediate jump, same focus |
| Mega panels | NV3 | mouse: 80ms intent (instant when switching), 140ms close; click, Enter, Space, ArrowDown | panel and backing opacity and y -6 to 0, 0.28s; close 0.18s; switch crossfade 0.25s; chevron 180deg 0.3s; scrim 0.25s | instant |
| Rows and the reseat (signature) | MD5 with TR3-style distance stagger | mouse enter or focus after 70ms; Platform button tap | stayers 0.7s expo.out, delay 0 to 0.3s by distance from the podium; leavers to the stage door 0.35s power2.in, then fade 0.12s; entrants from the door 0.7s expo.out; family colour 0.4s; row bar scaleY 0.3s; sibling rows to programme colour 0.3s | dots set in place, row states instant |
| Caption swap | TR1 | active concert changes | out yPercent -100 0.12s power2.in, in from 100% 0.3s expo.out, stagger 0.04, killed on the next change | instant text |
| Plan readout | CU1 adapted (label only, native cursor kept) | pointermove over the drawing (mouse); tap on touch | nearest section lit, others at 45% in 0.25s; label follows with quickTo 0.35s power2.out, 14px from the pointer | label snaps |
| Phone sheet | NV1 | Menu button | clip-path inset(0 0 100% 0) to inset(0) 0.7s expo.inOut, then rows yPercent 100 to 0, 0.5s expo.out, stagger 0.05; reverse at timeScale 1.4 | instant |
| Sheet accordions | CD6 | What's on, Visit | grid-template-rows 0fr to 1fr 0.45s; plus turns to minus 0.3s | instant |
| Text links | HV2 | hover, focus-visible | 0.07em underline in from the left, out to the right, 0.4s cubic-bezier(.35,0,0,1) | underline appears without the sweep; touch: always underlined |
| Visit list | HV7 | hover, focus-visible | sibling titles to programme colour 0.3s | instant |
| Velvet buttons | MI1 + lit layer | hover, focus, press | lighter velvet layer opacity 0.25s; press scale 0.97 in 0.12s, release 0.45s | colour only |
| Month labels | custom | hover, focus-visible | label to platform light, tick scaleY 2, 0.25s | instant |
| Skip link | focus reveal | keyboard focus | translateY from -110% 0.2s | instant |
| Fields | MI4 | focus; submit | velvet rule scaleX 0.3s from the left (0.6s when arriving from a Reserve link); errors grid-template-rows 0.25s; focus to the first invalid field | instant |
| Seat count and total | MI2-style roll | stepper, area or concert change | old value up, new in from below, 0.3s cubic-bezier(.65,0,0,1) | instant |
| Area radios | MI3 adapted | change | velvet dot scale 0 to 1, 0.3s expo.out, no bounce | instant |
| Confirmation | NV1-style clip wipe | valid submit; Reserve more seats | clip-path inset(100% 0 0 0) to inset(0) 0.6s expo.inOut, content fades in 0.25s; reverse 0.45s | instant, focus still moves |

Checked at build in Chromium (`--blink-settings` for a fine pointer, since headless reports `hover: none`): the panel opens on hover and stays open across the ruler; a quartet-to-Requiem change shows 164 dots streaming in from the stage door and the chorus filling front to back; the readout labels "Pianos, 4" and "First violins, 16"; the header hides on wheel down and returns on wheel up; Enter, ArrowDown, Tab, Escape and the phone sheet's Escape behave as described; with the CDN removed, menus, reseat, spy, anchors and the form still work. `scripts/motion.mjs`'s hover sheet shows the page bottom because its `scrollTo(0, 0)` lands while Lenis is still easing the last wheel step.

## Do not touch

- One pool of 168 dots that keep their identity. Creating dots per concert, or crossfading two drawings, loses the walk on and off, which is the whole idea.
- `setActive(i)` is the only way the active concert changes, with the 70ms intent and kill-before-start. Driving the plan from hover and the caption from focus separately makes them disagree.
- The caption must keep every family count and the legend. Without it the plan becomes hover-only content.
- Both panels keep one fixed height and one backing layer. Animating height between them causes layout thrash and a jumping scrim edge.
- `lock()` is the only place that stops and starts Lenis; every open and close path goes through it.
- The reading line at 30%: moving it makes the ruler mark the wrong month after a jump.
- Dimming by colour, not opacity, in both panels; velvet never as small text on balcony.
- The choir-seats rule for choral concerts, and the `#selftest` assertions that cover it.
- Hidden start states only under `html.js:not(.loaded)`.

## Adapting

Change the `:root` tokens first. `--house` is the ground and the plan sheet, `--balcony` every raised surface; keep them in one hue, one step apart. `--wash` must reach 4.5:1 on both, and `--programme` too, because dimmed rows use it. `--velvet` is the only colour: keep house text on it at 4.5:1, and keep it off small text on `--balcony`.

For another venue, redraw the static plan in the SVG (platform outline, risers, podium, door, the `CHOIR` grid) in the same 640 x 400 units, then rewrite `PLATFORM`: one entry per featured row, in row order, each a list of `S(label, family, points)` sections built with `arc()` for curved sections and `row()` for straight ones, with `n` and `say` matching the count. Run `#selftest`; it fails on overlapping chairs, wrong totals or a row pointing at a missing concert. Set `POOL` to the largest concert. A theatre can use the same mechanics with a cast on a stage plan; a dance company with dancers on a marked floor. Keep eight or so rows; titles longer than about 34 characters wrap at 1060px and below.

Copy: dates as "Thu 12 Nov" in the menu and "Thu 12 Nov, 19:30" in the list; composer, then work, with italics only for named works. The form's prices live in `PRICE`, and choral concerts carry `data-chorus` on their option.

Retiming: every CSS transition uses the duration tokens (`--d-press` 0.12s to `--d3` 0.6s) and easing tokens (`--ease-out`, `--ease-wipe`, `--ease-fade`, `--ease-sweep`, `--ease-roll`); the walk, caption and load timings are in the script (`setActive`, `setCaption`, the load timeline inside `mm.add`). To drop the load sequence, delete that timeline and add `loaded` to `<html>` straight away. To drop smooth scrolling, remove Lenis from the `mm.add` branch; anchors fall back to native smooth scrolling. To remove motion entirely, remove the library tags: everything still works, instantly.

| Token | Role |
|---|---|
| `--house` | Page ground, drawing sheet, box-office card in the Visit panel, text on velvet |
| `--balcony` | Mega panels, phone sheet, form fields, readout label, confirmation panel |
| `--wash` | Text, string players, woodwind rings, focus rings |
| `--programme` | Secondary text, dimmed rows, past months, singers, field rules |
| `--velvet` | Button fill, row bar, ruler marker, current underline, brass and percussion marks, errors on house |
| `--velvet-lit` | Button hover and focus layer (velvet with 28% platform light) |
| `--rule` | Month rules, plan lines, ticks, empty choir seats |
| `--scrim` | House at 55% behind an open mega panel |
| `--lights` | The house-lights overlay at load |
| `--font-serif` / `--font-sans` | Brygada 1918 / Red Hat Text |
| `--fs-xs` to `--fs-display` | Type scale, ratio 1.25 on 16px; display is a clamp |
| `--sp-1` to `--sp-10`, `--gutter`, `--max` | Spacing on a 4px base, page gutter and width |
| `--bar-h`, `--ruler-h`, `--label-h` | Header bar, season ruler and nav label heights (60px and 14px below 992px) |
| `--panel-h`, `--plan-w` | Fixed mega panel height and plan width |
| `--ease-*`, `--d-press` to `--d3` | Easing curves and transition durations (0.12s press to 0.6s wipe) |
