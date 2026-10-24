---
title: Task-grid services menu
section: nav
subject: Header and services mega-menu for Ollerby City Council (fictional), an English city council whose residents come to do one thing (find a bin day, pay Council Tax, report a pothole, apply for a parking permit) and leave.
aesthetic: A plain public-service header. A solid band in the heraldic green of the city arms with white type, a white page and panel, and the civic yellow focus that public-sector sites use.
mode: light
fonts:
  - Inclusive Sans 400/500/600/700 (Google Fonts), the only family. It was drawn for legibility and inclusion, and a council site has to work for every resident, weak readers included
js: Upgrades the topic links to disclosure buttons and runs the services mega-menu (hover intent, click, full keyboard, Escape and outside-click close), the mobile menu sheet, the hide-on-scroll header and an in-page service search; nothing is sent anywhere.
libraries: []
tags: [nav, header, mega-menu, civic, council, government, services, hover-intent, keyboard, hide-on-scroll, search, light, simple]
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

**The one bold idea: the task grid.** Every services panel uses the same four verb columns in the same place: Check, Report, Apply, Pay. Each verb is set in Inclusive Sans 600 at 1.25rem in the arms' green under a 3px green rule, and the verbs are the strongest type in the panel. When the pointer (or ArrowLeft/Right) moves from "Bins and recycling" to "Council Tax" with the panel open, the panel does not close, move or resize. The verb heads hold still and only the task rows under them fade in (140ms, opacity only, no travel). "Pay" is in the same spot for every topic, so a resident learns where to look once. The page body repeats the same four verbs under every topic, so the grid holds from the menu to the content.

- **One source of copy.** The panels are built by the script from the page body. Each `h3` carries its id (the anchor), `data-detail` (the one-line detail under the menu link) and `data-keywords` (what search matches). The menu and the page can never disagree, and every menu link goes to a real heading.
- **Links first, buttons after.** Without JavaScript the topic triggers are `<a href="#s-bins">` section links and the panels do not exist, so the top bar still works. The script swaps each link for a `<button aria-expanded aria-controls>` (the disclosure pattern, not `role=menu`).
- **The open tab joins the panel.** On a dark band a coloured bar under the trigger would vanish, so the open trigger cell turns white, its label turns green, and it sits flush on the white panel, like a tab. Nothing else in the band changes.
- **Fixed panel height.** Every topic body gets the same `min-height` (the tallest topic, measured on load, font load and resize). Switching topics never resizes the band, which is what lets the verb heads stay still.
- **Hover intent that forgives.** 80ms of hover before a closed panel opens, immediate switching while one is open, 180ms of grace before it closes after the pointer leaves the header. The panel starts at the nav row's bottom edge and the triggers fill the row, so there is no gap to cross.
- **Civic focus.** Focus is a signal-yellow fill plus a 3px ink bar, the GOV.UK vernacular. Yellow alone is 1.38:1 on white, so it is never used alone: ink on signal is 10.4:1.
- **Honest outcomes.** No sign-in button (a fake form would collect credentials for nothing). Search runs on the page and says how many services match, with a Clear search button. Phone numbers are `tel:` links in the Ofcom drama range (0161 496 0xxx).
- **Contrast, measured:** white on green band 8.26, green on white (verb heads, open tab) 8.26, ink on white 14.44, slate on white 7.27, slate on the row tint 6.28, ink on signal 10.44, white on the ink search button 14.44, ink on the landing tint 12.36. Stone (1.57 on white) is only used for rules. The ink search button meets the white input; against the band its edge is 1.75, so its label carries it, not its outline.
- **Cut at critique:** an enamel street-name plate as the wordmark (another design owns enamel signage), a sliding indicator under the topics, a "most requested this week" counter per panel, a section spy (it would clash with `aria-expanded` on the triggers), a pulsing out-of-hours dot and a roadworks ticker. Last, the rule above the contact block went: rules here mean "a verb starts", and that one meant nothing.

## Motion

Simple tier: CSS transitions and one vanilla script, no libraries, no load sequence and no ambient motion (the one allowed ambient slot is left empty). Transitions live in `@media (prefers-reduced-motion: no-preference)`; a separate `reduce` block keeps only short opacity fades for the panel and scrim, and every other change is instant with the same end state. Hover styles sit inside `(hover: hover) and (pointer: fine)`; touch ignores hover (`pointerType !== 'mouse'`) and works by tap.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Topic triggers | NV3 | hover (80ms intent), click, Enter/Space, ArrowDown, ArrowLeft/Right/Home/End | underline colour 120ms; chevron rotate 180ms cubic-bezier(.2,.8,.2,1); open tab instant | instant |
| Panel open / close | NV3 | open from closed; pointer leaves header for 180ms, Escape, focus leaves header, scrim click | open opacity + translateY(-6px to 0) 200ms cubic-bezier(.2,.8,.2,1); close 140ms ease-in | opacity only, 120ms |
| Topic switch while open (signature) | NV3, height tween replaced by fixed min-height | another trigger while open | task rows and intro fade in 140ms linear; panel box and verb heads static | instant swap |
| Scrim | NV3 support | panel or sheet open | ink 28%, 200ms | 120ms fade |
| Task links, "All ... services", result links | HV2 (static variant) | hover, :active | row tint 120ms; underline 1px to 2px | instant |
| Anchor landing | NV6 without spy | any in-page link | `scroll-behavior: smooth`; focus moves to the target h3 (`preventScroll`); 6px signal bar, tint fades 1.6s ease-out | instant jump, static tint |
| Header hide on scroll | NV5 (native scroll, rAF) | down > 8px past 160px / up > 8px | translateY(-100%) 320ms cubic-bezier(.16,1,.3,1); never while a panel or the sheet is open or focus is in the header | instant |
| Wordmark, utility links, Back to the top | HV2 static | hover, focus | underline thickness and colour 120ms | instant |
| Search field | MI4 | focus; empty submit | signal outline instant; message opens via grid rows 0fr to 1fr, 200ms; `aria-invalid`, focus stays | instant |
| Search and Clear search buttons | MI1 | hover, press | colour 120ms; press scale .97 in 100ms, release 300ms cubic-bezier(.34,1.56,.64,1) | colour only |
| Menu button (under 1080px) | NV1 simplified | click, Escape | bars to X 180ms; label swaps Menu/Close; sheet opacity + translateY(-8px) 220ms, close 150ms; main and footer inert, page scroll locked, focus to search | instant |
| Topic accordions in the sheet | CD6 | click | grid rows 0fr to 1fr, 280ms open / 200ms close cubic-bezier(.625,.05,0,1); one open at a time; closed bodies inert | instant |

Verified at build in headless Chromium: hover opens the panel, switching topics keeps every verb head at the same y, ArrowDown focuses the first task, Escape closes and returns focus to the trigger, focus leaving the header closes the panel, the header hides on wheel down and returns on wheel up, and `check-flows.mjs` passes (60 clicks, 1 form).

## Do not touch

- The verb order (Check, Report, Apply, Pay) and its column positions are the same in every topic and in the page body. A topic with no task for a verb still shows the head.
- The verb heads must not move on a topic switch. Keep the fixed `--panel-min` and the stacked absolute bodies. Do not tween height.
- The intent timings: 80ms to open from closed, immediate switch while open, 180ms close grace.
- Focus is a signal fill plus a 3px ink bar (or an ink ring around the signal outline on buttons and the field). Never yellow alone.
- The open trigger is a white tab joined to the white panel. A coloured bar on the band disappears.
- Triggers stay authored as section links and are upgraded by the script. Panel lists are labelled by their verb (`aria-labelledby`); there are no headings in the header, so the body's h1, h2, h3 order stays correct.

## Adapting

Change the `:root` tokens first. `--vert` is the organisation colour: it fills the band and draws the verb rules and heads, so white on it and it on white must both reach 4.5:1. `--signal` stays a light, saturated focus colour that `--ink` reads on at 7:1 or better. The verbs can change per organisation (for a university: Find, Apply, Book, Pay) but must be identical across topics. Add a topic by adding a `<li data-topic="x">` with a section link and a body `section#s-x` with four `.verb-row`s; the panel is built from it. Labels wider than about 950px in total need the 1080px breakpoint raised (search `1080px` and `1079.98px`, and `desktop` in the script). Below 1240px the panel intro moves above the verb columns.

Retiming: every duration is a token (`--t-quick`, `--t-open`, `--t-close`, `--t-hide`) or sits in the `prefers-reduced-motion: no-preference` block; delete that block to remove motion entirely. The 80ms and 180ms intent delays are in the script's `pointerenter` and `pointerleave` handlers. To drop hide-on-scroll, delete the scroll listener.

| Token | Role |
|---|---|
| `--vert` | Header band, verb rules and heads, open tab label |
| `--paper` | Page, panel, open tab, mobile sheet |
| `--ink` | Text, search button, focus bar and ring |
| `--signal` | Focus fill and the anchor landing bar only |
| `--slate` | Secondary text, input borders |
| `--stone` | Rules (decorative), base of `--tint` |
| `--on-band` | Type on the band |
| `--tint`, `--land`, `--ink-press`, `--scrim` | Row hover tint, landing tint, pressed search button, page scrim |
| `--font` | Inclusive Sans with system fallbacks |
| `--fs-mark`, `--fs-mark-sub` | Wordmark lines (the sub line is the only text under 14px) |
| `--fs-sm` to `--fs-xl` | 1.25 type scale from 16px, 17px body |
| `--sp-1` to `--sp-9` | 4px-based spacing |
| `--container`, `--gutter` | Content width and page edge |
| `--util-h`, `--nav-h`, `--bar-h` | Utility row, nav row, phone bar heights |
| `--header-h` | Measured header height for `scroll-margin-top` |
| `--r-control` | 4px radius of the field and buttons; bands and panel are square |
| `--t-quick`, `--t-open`, `--t-close`, `--t-hide`, `--ease-out`, `--ease-hide` | Durations and easings |
