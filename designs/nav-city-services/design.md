---
title: Task-grid services menu
section: nav
subject: Header and services mega-menu for Ollerby City Council (fictional), an English city council whose residents come to do one thing (find a bin day, pay Council Tax, report a pothole, apply for a parking permit) and leave.
aesthetic: Municipal street signage in the city's sable and argent. A slate-navy band with white type, an enamel street-name plate as the wordmark, a cool enamel-white page and panel, the mulberry tincture of the arms on the four verb heads only, and the civic yellow focus of public-sector sites.
mode: light
fonts:
  - Source Sans 3 400/500/600/700 (Google Fonts, variable), for everything except the verb heads. The long-standing public-sector UI face (the US Web Design System default), with a tailed l, open apertures for weak readers and tabular figures for fees
  - Lexend 600 (Google Fonts, one weight), only for the four verb heads (Check, Report, Apply, Pay), so the signature has its own voice
js: Upgrades the topic links to disclosure buttons and runs the services mega-menu (hover intent, click, full keyboard, Escape and outside-click close), the mobile menu sheet, the hide-on-scroll header and an in-page service search; nothing is sent anywhere.
libraries: []
tags: [nav, header, mega-menu, civic, council, government, services, hover-intent, keyboard, hide-on-scroll, search, plate, light, simple]
use_when:
  - Public services, utilities, universities, hospitals or any organisation whose visitors arrive with a task, not to browse.
  - Five to seven topics that each hold several tasks, where the tasks fall into the same few verbs (check, report, apply, pay).
  - The menu has to be fully usable by keyboard, touch and screen readers, and still work as plain section links without JavaScript.
avoid_when:
  - Brands that sell a mood (fashion, hospitality, culture). The band and the task grid read as administration.
  - Fewer than three topics, or topics whose links do not share verbs. Without the shared columns the grid is just a dropdown.
  - Sites whose topic labels add up to more than about 950px at 16px. Raise the 1080px breakpoint first.
---

## Why it works

**The one bold idea: the task grid.** Every services panel uses the same four verb columns in the same place: Check, Report, Apply, Pay. Each verb is set in Lexend 600 at 1.25rem in murrey under a 3px murrey rule; they are the only type in that face and colour, and the strongest type in the panel. When the pointer (or ArrowLeft/Right) moves from "Bins and recycling" to "Council Tax" with the panel open, the panel does not close, move or resize. The verb heads hold still and only the task rows under them fade in (140ms, opacity only, no travel). "Pay" is in the same spot for every topic, so a resident learns where to look once. The page body repeats the same four verbs under every topic, on the same column tracks as the panel (1.15fr and four 1fr columns, 32px gap), so at 1440px "Pay" sits at the same x in the menu and on the page, and the grid holds from the menu to the content. Below 1080px the verbs stack in the same order.

- **One source of copy.** The panels are built by the script from the page body. Each `h3` carries its id (the anchor), `data-detail` (the one-line detail under the menu link) and `data-keywords` (what search matches). The menu and the page can never disagree, and every menu link goes to a real heading.
- **Links first, buttons after.** Without JavaScript the topic triggers are `<a href="#s-bins">` section links and the panels do not exist, so the top bar still works. The script swaps each link for a `<button aria-expanded aria-controls>` (the disclosure pattern, not `role=menu`).
- **The street-name plate.** The wordmark is an enamel plate: enamel white, a 6px radius, and a 2px sable border inset 3px from the edge, as on a real street sign. On hover the border thickens to 3px. It is the only rounded object larger than a control (radii follow hierarchy: plate 6px, field and buttons 4px, band and panel square).
- **Sable and argent, murrey for the verbs.** The city arms give the palette: sable (`--ink` #1C2B39, a chosen slate-navy, not #111) for the band, the plate border, text and the search button, and argent (`--paper` #F4F7F6) for page, panel and plate. The arms' mulberry tincture (`--murrey` #6B2440) is used for one thing only: the verb heads and their 3px rules, in the panel and in the body. Without it the page was a navy band, one sans and a yellow focus, the generic public-sector house look, and the one bold idea was set in the same colour and face as everything else. nav-fashion-label uses mulberry as a whole menu surface; here it is a type colour on four words, so the two do not read alike. `--signal` #FFD84A is kept for focus and the anchor landing bar. Teal and green were avoided (vet, clinic, research lab and camper sit there).
- **Square bands and rules, on purpose.** Square panel, rules and a single text sans lean towards the broadsheet and public-sector defaults, so each is tied to a meaning: the only rules that carry weight are the 3px murrey bars, and they mean "a verb starts"; the panel and the open tab are square because the tab joins the panel edge flush. No hairline grid, no column dividers, no further ornament.
- **The open tab joins the panel.** On the ink band a bar under the trigger would vanish, so the open trigger cell turns enamel white and sits flush on the panel, like a tab. Nothing else in the band changes.
- **Fixed panel height.** Every topic body gets the same `min-height` (the tallest topic, measured on load, font load and resize). Switching topics never resizes the band, which is what lets the verb heads stay still. The intro column is a flex column with "All ... services" pinned to its foot, so shorter topics end on a deliberate floor line rather than blank enamel. Task labels are kept short ("Order a replacement bin", "Pay for garden waste") so the tallest topic stays low.
- **Information, not promises.** Every task paragraph in the body is complete on its own: the fact, the fee, the deadline, and where to act (the Civic Centre or a phone number). Nothing says "enter your postcode" for a form that is not there.
- **Hover intent that forgives.** 80ms of hover before a closed panel opens, immediate switching while one is open, 180ms of grace before it closes after the pointer leaves the header. The panel starts at the nav row's bottom edge and the triggers fill the row, so there is no gap to cross.
- **Civic focus.** Focus is a signal-yellow fill plus a 3px ink bar, the GOV.UK vernacular. Yellow alone is 1.28:1 on the page, so it is never used alone: ink on signal is 10.44:1. In the band, yellow on ink is 10.44:1 itself, so the plate and the search button use a signal outline there.
- **Honest outcomes.** No sign-in button (a fake form would collect credentials for nothing). Search runs on the page; the "N services match" count is computed from the `data-keywords` hits at runtime, never written in, and Clear search empties it. Loading `#selftest` asserts every task heading has a menu link, every link has a target, every panel has four verbs and the permit count is honest. Phone numbers are `tel:` links in the Ofcom drama range (0161 496 0xxx).
- **Contrast, measured:** white on the ink band 14.44, ink on paper (text, open tab) 13.40, murrey on paper (verb heads) 9.98, murrey on the row tint 8.78, slate on paper 6.75, slate on the row tint 5.94, ink on the row tint 11.79, ink on signal 10.44, signal on ink 10.44, paper on the pressed search button 11.99, ink on the landing tint 11.87. Stone (1.45 on paper) is only used for rules. In the band the ink search button gets a white 2px border so its shape reads against the ink.
- **Cut at critique:** decorative screw heads on the plate, mulberry as a band or button colour (it stays on the verb heads only), a sliding indicator under the topics, a "most requested this week" counter per panel, a section spy (it would clash with `aria-expanded` on the triggers), a pulsing out-of-hours dot and a roadworks ticker. The rule above the contact block went (rules here mean "a verb starts"), and last, the hairlines between task links in the phone sheet: only the topic rows keep a rule.

## Motion

Simple tier: CSS transitions and one vanilla script, no libraries, no load sequence and no ambient motion (the one allowed ambient slot is left empty). Transitions live in `@media (prefers-reduced-motion: no-preference)`; a separate `reduce` block keeps only short opacity fades for the panel and scrim, and every other change is instant with the same end state. Hover styles sit inside `(hover: hover) and (pointer: fine)`; touch ignores hover (`pointerType !== 'mouse'`) and works by tap.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Topic triggers | NV3 | hover (80ms intent), click, Enter/Space, ArrowDown, ArrowLeft/Right/Home/End | underline colour 120ms; chevron rotate 180ms cubic-bezier(.2,.8,.2,1); open tab instant | instant |
| Panel open / close | NV3 | open from closed; pointer leaves header for 180ms, Escape, focus leaves header, scrim click | open opacity + translateY(-6px to 0) 200ms cubic-bezier(.2,.8,.2,1); close 140ms ease-in | opacity only, 120ms |
| Topic switch while open (signature) | NV3, height tween replaced by fixed min-height | another trigger while open | task rows and intro fade in 140ms linear; panel box and verb heads static | instant swap |
| Scrim | NV3 support | click or keyboard open at once; a hover open only after 300ms with the pointer still on the header, so passing over the nav never dims the page | ink 28%, 200ms | 120ms fade |
| Task links, "All ... services", result links | HV2 (static variant) | hover, :active | row tint 120ms; underline 1px to 2px | instant |
| Anchor landing | NV6 without spy | any in-page link | `scroll-behavior: smooth`; focus moves to the target h3 (`preventScroll`); 6px signal bar, tint fades 1.6s ease-out | instant jump, static tint |
| Header hide on scroll | NV5 (native scroll, rAF) | down > 8px past 160px / up > 8px | translateY(-100%) 320ms cubic-bezier(.16,1,.3,1); never while a panel or the sheet is open or focus is in the header | instant |
| Wordmark plate | CSS state | hover, focus | inset border 2px to 3px, 120ms; focus: signal outline plus ink ring | instant |
| Utility links, Back to the top | HV2 static | hover, focus | underline thickness 1px to 2px, 120ms | instant |
| Search field | MI4 | focus; empty submit | signal outline instant; message opens via grid rows 0fr to 1fr, 200ms; `aria-invalid`, focus stays | instant |
| Search and Clear search buttons | MI1 | hover, press | colour 120ms; press scale .97 in 100ms, release 300ms cubic-bezier(.34,1.56,.64,1) | colour only |
| Menu button (under 1080px) | NV1 simplified | click, Escape | bars to X 180ms; label swaps Menu/Close; sheet opacity + translateY(-8px) 220ms, close 150ms; main and footer inert, page scroll locked, focus to search | instant |
| Topic accordions in the sheet | CD6 | click | grid rows 0fr to 1fr, 280ms open / 200ms close cubic-bezier(.625,.05,0,1); one open at a time; closed bodies inert | instant |

Verified at build in headless Chromium: a 100ms pass over a trigger never turns the scrim on, a dwell does; hover opens the panel, switching topics keeps every verb head at the same y, ArrowDown focuses the first task, Escape closes and returns focus to the trigger, focus leaving the header closes the panel, the header hides on wheel down and returns on wheel up, Tab from the last link of an open panel opens the next topic (keyboard focus on a trigger switches the panel, as the arrow keys do); with the phone sheet open the skip link, main and footer are inert, and opening the sheet while the header is sliding back in no longer squashes it (the header drops its transform while the sheet is open). In the body at 1440px the verb heads sit at x 409, 637, 865 and 1092, the same as in the panel. `#selftest` logs SELFTEST PASS, and `check-flows.mjs` passes (60 clicks, 1 form, 2 external).

## Do not touch

- The verb order (Check, Report, Apply, Pay) and its column positions are the same in every topic and in the page body. A topic with no task for a verb still shows the head.
- The verb heads must not move on a topic switch. Keep the fixed `--panel-min` and the stacked absolute bodies. Do not tween height.
- The intent timings: 80ms to open from closed, immediate switch while open, 180ms close grace.
- Focus is a signal fill plus a 3px ink bar (or an ink ring around the signal outline on buttons and the field). Never yellow alone.
- The open trigger is a white tab joined to the white panel. A coloured bar on the band disappears.
- Murrey and Lexend belong to the verb heads only. Spreading them to the band, buttons or headings dilutes the signature.
- The body topics use the panel's column tracks at 1080px and up. Change one and you must change the other.
- `runSelfTest()` ships in the script but runs only when the URL hash is `#selftest`. Keep it while adapting (it catches a menu link without a body target); remove it, and its `location.hash` check, before production if you prefer.
- Triggers stay authored as section links and are upgraded by the script. Panel lists are labelled by their verb (`aria-labelledby`); there are no headings in the header, so the body's h1, h2, h3 order stays correct.

## Adapting

Change the `:root` tokens first. `--ink` is the organisation's dark: it fills the band, borders the plate and sets the text, so white on it and it on `--paper` must both reach 7:1. `--murrey` is the organisation's colour, used only for the verb heads and their rules; it must reach 7:1 on `--paper` (and on `--tint`, which sits beside it on hover). `--font-verb` is the verb-head face; keep it distinct from `--font` and load one weight. `--signal` stays a light, saturated focus colour that `--ink` reads on at 7:1 or better. The verbs can change per organisation (for a university: Find, Apply, Book, Pay) but must be identical across topics. Add a topic by adding a `<li data-topic="x">` with a section link and a body `section#s-x` with four `.verb-row`s; the panel is built from it. Labels wider than about 950px in total need the 1080px breakpoint raised (search `1080px` and `1079.98px`, and `desktop` in the script). Below 1240px the panel intro moves above the verb columns.

Retiming: every duration is a token (`--t-quick`, `--t-open`, `--t-close`, `--t-hide`) or sits in the `prefers-reduced-motion: no-preference` block; delete that block to remove motion entirely. The 80ms and 180ms intent delays are in the script's `pointerenter` and `pointerleave` handlers. To drop hide-on-scroll, delete the scroll listener.

| Token | Role |
|---|---|
| `--paper` | Page, panel, open tab, wordmark plate, mobile sheet |
| `--ink` | Header band, plate border, text, search button, focus bar and ring |
| `--murrey` | Verb heads and their 3px rules, in the panel, the phone sheet and the body; nothing else |
| `--signal` | Focus fill and the anchor landing bar only |
| `--slate` | Secondary text, input borders |
| `--stone` | Rules (decorative), base of `--tint` |
| `--on-band` | Type on the band |
| `--tint`, `--land`, `--ink-press`, `--scrim` | Row hover tint, landing tint, pressed search button, page scrim |
| `--font` | Source Sans 3 with system fallbacks |
| `--font-verb` | Lexend 600, verb heads only |
| `--fs-mark`, `--fs-mark-sub` | Wordmark lines (the sub line is the only text under 14px) |
| `--fs-sm` to `--fs-xl` | 1.25 type scale from 16px, 17px body |
| `--sp-1` to `--sp-9` | 4px-based spacing |
| `--container`, `--gutter` | Content width and page edge |
| `--util-h`, `--nav-h`, `--bar-h` | Utility row, nav row, phone bar heights |
| `--header-h` | Measured header height for `scroll-margin-top` |
| `--r-plate`, `--r-control` | 6px plate, 4px field and buttons; bands and panel are square |
| `--t-quick`, `--t-open`, `--t-close`, `--t-hide`, `--ease-out`, `--ease-hide` | Durations and easings |
