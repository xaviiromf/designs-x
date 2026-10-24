---
title: Which doors your fob opens
section: pricing
subject: Membership plans (hot desk, fixed desk, studios for 2, 4 and 6) and hourly meeting rooms at Ropewalk Works, a fictional coworking space in a converted 1790s ropewalk, 96 m long.
aesthetic: Architect's floor plan of a limewashed industrial building, brown Stockholm-tar ink, plastic key-fob tags with paper inserts, and one card-reader 'access granted' green.
mode: light
fonts:
  - Zilla Slab 700 (Google Fonts), display, plan names, prices, wordmark
  - Chivo 400, 500, 700 (Google Fonts), everything else
js: Drives the fob-flood floor plan, billing and headcount toggles with Flip reflow and price counts, room booking dialog and trial-day form, with Lenis smooth scroll.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3.26]
tags: [pricing, coworking, floor-plan, access, key-fob, membership, headcount, billing-toggle, flip, sticky, dialog, booking, form, gsap, lenis]
use_when:
  - A place sells access to physical spaces (coworking, makerspace, studios, members' club, storage, gym zones) and plans differ by which rooms and hours they unlock.
  - Price depends on headcount or seats, and some plans stop fitting as the team grows.
  - There is a real floor plan to draw: rooms off a corridor or along one axis.
  - The page can afford a scripted, choreographed section (detailed tier).
avoid_when:
  - Plans differ by features, quotas or seats in software, with nothing spatial to show. Use a comparison table.
  - The building is a tangle of floors and wings that does not reduce to one simple plan.
  - You need a single static pricing card or a page that must work without JavaScript beyond basic reading.
  - Brands that need several accent colours; this design spends its only colour on 'open'.
---

## Why it works

**The bold idea: the floor plan is the price list's consequence.** Hover or focus a plan's key-fob tag and the building answers: rooms that plan opens fill with card-reader green from their own door, ranked by walking distance from the front door at the west end of the Walk. Choose it and the fob is read at the front door: a band with a tar leading edge runs east along the Walk, and each room the new plan adds opens as the band passes its door. Members of a coworking space buy access, not features, so the page shows access: which doors, and when (a week of day columns under the plan, 00 to 24 down each day, fills in the same pass).

- **A diff, not a light show.** When the preview changes, rooms both plans open stay lit; rooms only the old plan opened drain back to their door (0.25s expo.inOut); rooms only the new plan opens fill from theirs (0.5s expo.out, 0.045s per rank). Sweeping the pointer across five tags never flickers the building, and the change itself is the information. The caption says the same thing in words while previewing: "Fixed desk adds the Quiet Bay and lockers, and opens at any hour." A "Chosen: Hot desk" line with the green badge sits above the caption, so the committed plan is always named next to the building.
- **Commit is a pour, preview is a diff.** On Choose, the Walk is re-swept from the front door to the east wall (0.6s power2.inOut). `data-pos` is the door's position in metres along the 96 m Walk, and each added room starts its fill (0.55s expo.inOut, so the pour is visible) at the moment the band's edge reaches that door; a room the preview already lit closes first and reopens as the band passes. The hours start when the band reaches the east wall.
- **One colour, one meaning.** Green #50D47E means 'your fob opens this door'. It appears only in plan fills, the hours bars and the chosen badge in the tag's ring hole. Buttons, pills, focus rings and text are tar. Locked rooms are tar hatch, bookable meeting rooms are green-and-limewash stripes, open rooms are solid green, so the key never relies on colour alone.
- **Tags are the real object.** Each plan is a tar plastic key tag with a punched 18px ring hole (a CSS mask, so the page shows through) and a paper insert. All five share one material; plans are told apart by name, contents and the drawn brass key that hangs on the ring of the three studio tags, which do open their own room with a key. Radii follow role: walls 0, tag 22px, window 10px, buttons 6px, pills round. No shadows.
- **Headcount reorders the shelf.** "Desks needed" re-sorts the tags by monthly total for that many people and moves studios that are too small behind a "Too small for 3 of you" divider (its grid track exists only when something is too small). A too-small tag's plastic greys out, while its paper insert keeps full-contrast text; the disabled button reads "Seats 2" and is labelled "Studio for 2, seats 2: too small for 3 of you". Per-person plans multiply; studios show the price per head. Yearly is 90% to the penny with the yearly bill stated. The price block is the price with "a month" beside it, one billing line, and a per-person line only when it says something (more than one person, or a studio).
- **The plan stays where you are.** On screens at least 1200px wide and 880px tall the plan is sticky above the tags, so every control shows its consequence in the building. It sticks with its title and legend scrolled off (`top: calc(-1 * var(--plan-cut))`), so what stays is the floor, the chosen line, the caption and the hours. Measured at 1440x900: stuck plan 293px, the five tags from 309 to 849px with ring holes, names and Choose buttons all visible. `html { scroll-padding-top }` equals the stuck height, so keyboard focus and anchors never land under the plan. Between 992px and the stage (1366x768 laptops, tablets) the plan is not sticky, so each tag has "See its doors on the plan" and the plan has "Back to plans". Scrolling into the meeting-room list switches the plan to what a booking opens: the extra rooms drain, the four meeting rooms get an inset tar ring and their hourly price.
- **Phones swipe fobs.** Below 992px the tags are a horizontal snap rail (each about 82vw, the next one peeking) with the plan directly under it, capped at 36vh so the snapped tag and the whole building share an 844px screen. The snapped tag previews on the plan with the same diff flood (an IntersectionObserver on the rail, threshold 0.6), so swiping is the touch equivalent of hover; Choose commits.
- **The plan transposes on phones.** It is a CSS grid of divs (24 tracks along the length, 3 across). Each room carries `--at` (its span along the building) and `data-side` (north, Walk, south). Desktop places `--at` on columns; under 992px the same markup places it on rows, west end on top. Door side is four multipliers per room (`--t --r --b --l`) redefined per breakpoint, and the fill's `clip-path` inset is computed from them and `--fill`, so every room always fills from the wall its door is in: north rooms from the bottom on desktop and from the right on phones, south rooms from the top and from the left, the Walk from the west and from the top. Door glyphs (a leaf and its quarter swing) move with the same rule, and stay at the same end of each room along the Walk (north doors at the west end, south doors at the east end), which is what `data-pos` measures.
- **Quiet around it.** Cool limewash ground, Zilla Slab 700 for display and prices (tabular figures via `tnum`, verified on the served build: proportional 1111/0000 measure 64.6/92.2px at 40px, with `tnum` both 96px), Chivo for everything else (its figures are tabular by default). No eyebrows, no all-caps, no 'most popular'.
- **Copy is specific.** Prices include VAT; meeting rooms are named after knots; the Ofcom drama number on a `tel:` link; results are computed from the inputs ("Reef is booked for Friday 23 October, 10:00 to 13:00."), with weekdays from `Intl.DateTimeFormat('en-GB')` on local dates.
- **Cut at critique:** a pointer sheen on the tag plastic (it competed with the preview flood, which is the real hover answer), the price count on entrance (a static price counting up is a gimmick; numbers now count only when desks, billing or booking length change them), a persistent focus ring on the chosen tag (badge plus "Chosen" already say it; the tag ring now answers hover and `:focus-visible` only), the green rule on form results (green is reserved for 'open'), sibling dimming on the meeting-room rows (it dropped live prices below AA and said nothing; the room's outline on the plan and the 'Book Reef' roll are the answer), and the 'See its doors' links on phones (the rail puts the plan under the tags instead).

## Motion

All JS motion lives in `gsap.matchMedia` with `motion`, `reduce`, `fine` (hover and fine pointer), `wide` (992px) and `stage` (1200 x 880px). Ease family: expo.out (`--ease-out`) for responses and entrances, expo.inOut (`--ease-inout`) for reflows and drains, back.out(2) only for the badge. Lenis runs on `gsap.ticker` (`autoRaf: false`) and is stopped while the dialog is open.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Heading lines rise from their own masks | TX1 | load, after `document.fonts.ready` (hard start 1s) | 1.0s, stagger 0.08 | static heading, no split |
| Wordmark, nav links, staffed line | LD8 | load | y 6 to 0 + fade, 0.4s, stagger 0.06, at 0.1s | none |
| Plan walls drawn west to east, room by room | SC16-style clip draw | load (wide) or plan enters at top 75% (narrow, top to bottom), once per page view | 0.7s per room, 0.035s per 4 m column, at 0.3s | static |
| Desk and billing pills open from the checked option | NV4 | load | 0.4s CSS clip-path transition, at 0.55s | static |
| First flood of the chosen plan | SIG, TR3 | load at 0.8s (wide) or plan enter (narrow) | 0.5s per room, 0.045s per rank; Walk 0.9s | colour shown |
| Plan preview (diff flood, hours, caption) | SIG, TR3, TR1 | tag hover (160ms intent) or keyboard focus; on phones the snapped rail tag; leave the tags to revert | drain 0.25s, fill 0.5s expo.out, 0.045s per rank; hours 0.6s, stagger 0.03; caption 0.15s out / 0.35s in | instant swap, caption text changes |
| Commit pour | SIG wavefront | Choose | band 0.6s power2.inOut along the Walk; each added room fills 0.55s expo.inOut when the band reaches its door; hours after 0.6s | instant swap |
| Narrow plan catches up | S4 | plan scrolls back into view after an off-screen change | diff from the last state shown | instant |
| Sticky plan switches to meeting rooms | S2 | `#rooms` reaches 60% (stage only) | drains 0.25s, rings and rates 0.5s, 0.06s per room | same state, instant |
| Rules above room rows draw in | SC16 | list at top 88%, once | 1.0s, stagger 0.08 | static |
| Headcount reflow | CD5 Flip | desks radio change | 0.8s expo.inOut, stagger 0.02, translate only; too-small tags grey their plastic (0.3s) and pass behind | instant |
| Price and per-person counts | SC13 logic | desks, billing, booking length change | 0.8s expo.out, snapped to the penny | final value |
| Billing line swap | MI2 | billing change | 0.35s | instant |
| Pill follows hover, focus and selection | NV4 | pointer, focus-visible, change | 0.4s clip-path (transform-free, label colours flip exactly at the pill edge) | jumps |
| Tag ring | clip-path circle from the ring hole | tag hover or focus-within | 0.3s | instant |
| Choose, submit and dialog buttons | HV4, MI1 | pointer enters (fill from that edge, leaves by the exit edge), focus fills from the left; press | 0.45s in, 0.3s out; press 0.97 for 0.12s, release 0.4s | colour change only |
| Choose label and badge | MI2, MI3 | choose | 0.35s swap; badge scale 0.6 to 1, 0.25s back.out(2) | no pop |
| Top-bar, 'See its doors', 'Back to plans' links | HV2, NV6 | hover, focus; click glides via `lenis.scrollTo` (0.65s + distance/4000, max 1.3s), then focuses the target; section spy sets `aria-current` | 0.45s underline | static underline, immediate scroll |
| Room follower over the plan | CU1 | fine pointer over the plan (wide); text rolls in the direction of travel | follow 0.35s, roll 0.3s | none |
| Room rows roll 'Book Reef' and outline the room on the sticky plan | HV1 | hover or focus-visible | 0.4s | no roll |
| Booking dialog | CD7 | row click; scales out of the clicked row; bottom sheet below 600px | 0.45s in, 0.3s out; backdrop 0.3s | instant |
| Form fields and errors | MI4 | focus draws the bottom rule; errors reveal by clip-path from the top plus opacity in a reserved line | 0.35s / 0.25s | instant |
| Form result swaps | TR1 | valid submit; 'Book another time' and 'Change the booking' swap back and refocus | 0.15s out, 0.35s in | instant |

Touch: below 992px swiping the rail previews (the touch equivalent of hover) and Choose commits; on wide touch screens outside the stage, 'See its doors on the plan' shows a tag's doors and 'Back to plans' returns (and clears that view). No follower, persistent underlines, `:active` press. Load order is safe: the libraries are `defer`red so the inline script sets `html.intro` (first-frame states) before first paint; GSAP takes those states over on `DOMContentLoaded`. If the libraries are missing at `DOMContentLoaded` (blocked or failed), `html.js` is removed and the page shows its finished state. If they are only slow, a 2s timer shows the finished state and `html.js` stays. Either way every control, the dialog and both forms keep working with instant state changes.

## Do not touch

- **Green means open, and nothing else is green.** No green buttons, links, rules, focus rings or success banners. If you add a state, give it a pattern as well as a colour.
- **The flood is a diff and fills from doors.** Never drain and refill the whole building, never fill from an arbitrary edge, never loop it as an ambient demo. Keep walking-distance order (`data-pos` is the door's position in metres along the 96 m Walk). Preview is a diff; only a commit re-sweeps the Walk.
- **Walls above fills.** Partitions are `.room::after` at `z-index: 2` inside `.floor { isolation: isolate }`, and the outer wall is its own element; outlines on rooms get half-covered by neighbouring fills.
- **Tags keep one size during Flip.** Equal `minmax(0, 1fr)` tracks, plus a fixed divider track only when a studio is too small (`--cols`), `align-items: stretch` in the one-row layout, `.tag__desc` reserving three lines from 640px. Animating scale or width makes text wobble.
- **Hidden states only in the first frame.** `html.intro` and `html.js` hide only what the load sequence animates; everything is real text and real controls (radios in fieldsets, buttons with `aria-pressed`, native `<dialog>`, `aria-live` caption).
- **The sticky threshold and the cut.** The plan is sticky only at 1200 x 880px and up, where a full row of tags fits under the stuck plan. Lower it and the Choose buttons fall off the bottom of the screen. `--plan-cut` and `--plan-h` are measured by a ResizeObserver; keep `scroll-padding-top` tied to `--plan-h`.
- **Contrast:** tar #3A2A1E is 12.0:1 on limewash and 12.7:1 on paper; weathered tar #5A4C41 is 7.2:1 and 7.6:1; tar on the access green is 7.2:1. Room labels on green and stripes stay tar; meeting-room labels sit on a limewash chip. Never dim text with opacity: too-small tags grey their plastic only.
- **Dates are local.** `parseDay()` builds `new Date(y, m - 1, d)`; never `new Date('2026-11-03')`, which is UTC and shifts the weekday west of Greenwich.

## Adapting

1. **Tokens first.** Change `--c-ground` (the building's wall finish), `--c-ink` (a chosen dark that is not near-black) and `--c-ink-2`, then `--c-access` to the colour your access system really uses for 'open', keeping ink on it at 7:1 or better. `--c-paper`, `--c-hatch` and `--c-scrim` derive from them. Swap `--ff-display` and `--ff-body`; check the display face has `tnum`.
2. **Your building.** Rooms are `.room` divs inside `.floor` with `--at: start / span n` along a 24-track length, `data-side` n, w or s, `data-pos` (door position in metres along the Walk, for flood order and the commit wave), `data-name`, optional `data-seats`, and `room--meet` for bookable rooms. Keep spans per side summing to 24. A building with two corridors needs a second Walk row; doors then belong to whichever corridor they open onto.
3. **Your plans.** Edit `PLANS` (per-person `pp` in pence, or a fixed `price` with `seats`), `SHARED`, `MEET`, `RATE`, `KIT` and `HOURS` in the script, and the matching tag markup. Captions and diff sentences are generated from that data. Three to six tags fit the one-row layout from 1200px; more need the three-column layout.
4. **Copy.** Plan names short (about 12 characters), one-sentence descriptions of three lines or fewer, an 'Opens' line written from the member's side, hours as people say them.
5. **Retime or remove motion.** Durations are `:root` tokens. The script reads `--d-fill`, `--d-drain`, `--d-step`, `--d-hours`, `--d-flip`, `--d-count`, `--d-swap` and `--d-intent`; `--d-press`, `--d-fast`, `--d-ring`, `--d-pill` and `--d-sweep` are used only by CSS transitions. The commit wave's 0.6s and 0.55s live in the motion layer. To drop an effect, delete its block in the motion layer: the `fx` object holds instant defaults for every effect (`count`, `caption`, `flood`, `reflow`, `badge`, `swap`, `dialogIn`, `dialogOut`, `scrollTo`), so removing a motion override never breaks a flow. Removing GSAP and Lenis entirely leaves a working page with CSS transitions only.
6. **Stack translation.** Keep the state (`S`), the pure functions (`quote`, `order`, `caption`, `diffCaption`) and the effect layer separate; in React, run the GSAP layer in a `useGSAP` hook with `gsap.matchMedia` and call the same `fx` functions from effects. Run `#selftest` (pricing, order, captions, local weekdays) after changes.

| Token | Role |
|---|---|
| `--c-ground` | Limewash: page, unlit rooms, stripe gaps, label chips, text on tar |
| `--c-ink` | Stockholm tar: text, walls, tag plastic, buttons, pills, focus ring |
| `--c-ink-2` | Weathered tar: descriptions, legends, field labels at rest |
| `--c-access` | Card-reader green: open rooms, bookable stripes, hours, chosen badges, the commit band (mixed 35% with ground) |
| `--c-paper` | Tag window, fields, dialog (ground mixed 60% with white) |
| `--c-hatch` | Locked-room hatch and empty hours (ink at 22%) |
| `--c-scrim` | Dialog backdrop (ink at 55%) |
| `--ff-display` | Zilla Slab: heading, wordmark, plan and room names, prices |
| `--ff-body` | Chivo: everything else |
| `--fs-xs` to `--fs-xl` | 13, 15, 17, 22, 30px steps (major third from 17px) |
| `--fs-price` | clamp(36px, 1.6vw + 17.6px, 48px) tag prices |
| `--fs-display` | clamp(44px, 5.2vw + 16px, 84px) heading |
| `--sp-1` to `--sp-9` | 4, 8, 12, 16, 24, 32, 48, 72, 104px |
| `--gutter`, `--max`, `--col-gap`, `--div-w` | Side gutter, 1320px measure, 24px grid gap, divider track |
| `--r-tag`, `--r-window`, `--r-btn`, `--r-pill`, `--hole` | Radii by role and the ring-hole size |
| `--wall`, `--part` | Outer wall 3px, partitions 1.5px |
| `--ease-out`, `--ease-inout` | expo.out and expo.inOut as cubic-bezier |
| `--d-*` | Durations listed in Adapting step 5 |
| `--plan-cut`, `--plan-h` | Set by the script: how much of the sticky plan scrolls off (title and legend), and the stuck height used by `scroll-padding-top` |
