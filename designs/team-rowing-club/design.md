---
title: Halden Weir crews and coaches
section: team
subject: The crews and coaches of Halden Weir Rowing Club, a fictional club boating from the Skerton boathouse on the River Lune in Lancaster, for the 2026-27 season.
aesthetic: A boathouse crew sheet drawn to scale. Each boat is seen from above with the club's racing-green-and-primrose blades as the rowers' portraits, on a concrete-slipway ground, lettered in one variable family whose width axis does the signwriting.
mode: light
fonts:
  - Anek Latin (Google Fonts, variable wdth 75-125 and wght 100-800), the only family
js: A squad picker re-racks the boathouse; the chosen boat glides into the top berth with a vanilla FLIP (transform only) while the others fade out, and a live line says what is shown.
libraries: []
tags: [team, rowing, sport, club, drawing, to-scale, filter, flip, light]
use_when:
  - A sports club, crew or squad where who sits where is real information (rowing, dragon boat, canoe, relay order, a bobsleigh team).
  - Parents, new members or visiting teams need to find a person, their position and their coach quickly.
  - A small roster (up to about 30 people) in a handful of boats or units.
avoid_when:
  - The team has no positions or order. The boat drawing then encodes nothing and becomes decoration.
  - The roster needs photographs, bios or long role descriptions; there is no room for them beside a seat.
  - Rosters above roughly 40 people or more than six or seven boats; the squad picker stops being enough and the page wants search or paging.
---

## Why it works

**The bold idea: every crew drawn as it sits in its boat, to scale.** Each crew is a hull seen from above, bow first, with seat numbers painted inside it. Every rower's portrait is their own oar blade (club racing green with a primrose tip band, their initials painted on it in paper) at the end of a loom on the side that seat is actually rigged. The drawing carries true information:

- **Sides are real.** In sweep boats odd seats are on bow side and even seats on stroke side, so blades and names alternate. In the junior quad each sculler has a blade on both sides and the names sit on bow side. Coxes sit in the stern with a disc and no blade. Coaches ride in the launch line under their boat.
- **Boats are to scale.** One `--pitch` token sets the seat spacing for every hull, so the eight is visibly about twice as long as the coxed fours and more than twice the coxless four. Boats are left-aligned at the bow so their lengths compare.
- **The drawing stays true on phones.** Below 960px the hull turns vertical with the bow at the top. Seen from above travelling up, bow side (starboard) is on the right, so odd seats move right and even seats left. It is the same markup with a second grid template: each `li` is a subgrid of the crew `ol`, and every part names its track (`nb`, `bb`, `hull`, `bs`, `ns`) through a `--t` custom property used as `grid-row` on desktop and `grid-column` on phones.
- **Rowing's own seat names.** Bow, 2 seat to 7 seat, Stroke, Cox, never 01/02. Crew order is a real sequence and the DOM follows it bow to stern, so a screen reader hears the crew in boating order. The hull, the seat numbers and the blades are `aria-hidden`; the names and seat labels carry the content.
- **Picking a squad re-racks the boathouse.** Five buttons (All squads, Senior men, Senior women, Juniors, Adaptive) in a labelled group, with `aria-pressed` on the current one. The chosen boat takes the top berth (`order: -2` in the flex-column `.rack`) and glides there with a vanilla FLIP on transform only, while the others fade out and are then set `hidden`. "All squads" slides it back to its berth as the rest fade in. A polite live line says what is shown ("Showing the senior women's four. 1 of 4 crews."). On phones, where the eight alone is over 600px of vertical hull, this is how a parent gets straight to their child's boat. The squad H3s, the button labels and the live line use the same words. "On the bank" stays visible for every squad.
- **Works without the script.** The picker is rendered `hidden` and the script unhides it, so with no JS every crew is on the page in boat order and nothing is a dead control.
- **Typography by width, not caps.** Anek Latin is the only family. Squad headings (Senior men's eight, Junior J16 quad...) are sentence case at wdth 112 / 650, which gives the signwritten feel without tracked caps. Rower and coach names are wdth 82 / 560 so "Kacper Wiśniewski" fits beside a 64px seat on a 360px screen. The served Google build exposes the variable wdth axis (`font-stretch: 75% 125%`) and lining figures, so no fallback was needed.
- **Headings name the squad, not the boat.** Readers scan for their squad, so it is the H3; the boat's own name (the Margaret Tyson, the Lily Bank...) sits in the class line as "Boating in the Margaret Tyson, an eight (8+)." This keeps boat names from reading as people on a page full of people.
- **Club colours as the identity.** Racing-green `#1F4A36` blades with a primrose `#EFE38A` tip band, warm graphite ink `#2A2624`, warm grey ink-soft `#5E5853`, on a neutral concrete-slipway ground `#E2E1DD` with paper `#FAF9F7` hull decks. Green appears only on the blades, the pressed squad button and the link sweep, so the page reads as a riverside club without echoing team-research-lab's grey-green ground. Not default 1 (no cream, no serif, no terracotta) and not default 2 (light ground).
- **Defaults avoided.** No cards, shadows or round photo avatars in a grid (default 4). No eyebrow above the H2, no middle-dot meta strings (two plain sentences instead), no tracked caps (default 5). No load sequence, no scroll reveals, no ambient loop.
- **A section, not a page.** It starts at an H2 and assumes the host page supplies the H1. Crew lists and the bank list carry `role="list"` because Safari drops list semantics under `list-style: none`; "On the bank" is its own labelled section.

Contrast, checked: ink on slipway 11.5:1, ink on paper 14.2:1, ink-soft on slipway 5.4:1 and on paper 6.7:1, paper initials on green and paper on the pressed button 9.5:1, green on slipway 7.7:1. Primrose is a fill only (7.7:1 against the green blade as a non-text band; it matches the slipway in luminance, so the ink rule between band and blade carries the edge) and never sits behind text.

## Do not touch

- One shared `--pitch` for every hull. Per-boat spacing breaks the scale comparison.
- Odd seats on bow side and even seats on stroke side, and the swap (bow side on top on desktop, on the right on phones). Swapping it the other way makes the drawing wrong for anyone who rows.
- Bow-to-stern DOM order and the seat labels as text.
- The squad picker: each button's `data-squad` must match one `article.boat[data-squad]`; "All squads" is the way back. The picker stays `hidden` in the markup so no-JS readers see every crew. Animate transform and opacity only.
- One column of `--pitch` per seat on desktop (`.crew li { grid-template-columns: var(--pitch) }`), with names overflowing to the right of it. An auto column lets the name widen the seat and pushes every blade off its seat number, so boats stop comparing to scale.
- Blade initials in `--paper` on `--blade` and clear of the primrose tip band. `--tip` never carries text.
- The PR3 Mix4+ crew is two men and two women (Steve Cartwright, Owain Pritchard; Bethan Garnett, Rachel Dowthwaite) plus a cox. Keep it legal when you change names.

## Motion

Simple tier: no libraries, one vanilla script, no load sequence, no scroll motion and no ambient loop. The re-rack glide is the only motion that is not a hover or press. House ease is `cubic-bezier(.16,1,.3,1)`. A `prefers-reduced-motion: reduce` block removes every transition and the press scale, and the script skips `animate()` and just reorders.

| Item | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Squad re-rack (signature) | CD5 FLIP, vanilla `element.animate()`: measure every visible boat, set the new order and state, re-measure, play `translateY(first - last)` to none. Leaving boats fade 1 to 0 then get `hidden`; entering boats fade 0 to 1. A new click cancels running animations, so input never locks | click on a squad button | glide 600ms house ease; leave 200ms; enter 280ms after 60ms | instant reorder, no transform or fade |
| Squad buttons | MI1 press and release; pressed state fills green with weight 500 to 650 (two cues); hover border ink-soft to ink | :active (tap feedback on touch), hover (pointer: fine) | scale .96 in 120ms, release 350ms `cubic-bezier(.34,1.56,.64,1)`; colours 160ms | no scale, colours change instantly |
| All links (8 mailto) | HV2 directional underline sweep: green band .12em in from the left, out to the right, over a resting 45% underline | hover (pointer: fine), :focus-visible | 400ms | band shown without sweeping |

Focus is a 2px ink outline at 3px offset on every button and link, instant. Interactive items: 5 squad buttons (in-page result, with All squads as the way back) and 8 `mailto:` links (four launch coaches, three people on the bank, and the learn-to-row line, which is its own link to Sunita with a subject) on the reserved `.example` domain, all with `target="_blank" rel="noopener"`. `check-flows` expects 5 clicks, 0 forms, 8 external.

Removed accessory: a hover that thickened a rower's loom from 1.5px to 3px. It revealed nothing and was a second response on non-interactive items.

## Adapting

Map the brand onto the colour tokens first: `--blade` becomes the club's blade colour and `--tip` its second colour. Keep the initials colour at 4.5:1 or better on the blade colour. For another water sport, keep the hull and seat logic and redraw the blade shape (`.blade::before` clip-path, drawn tip-up and rotated per side). For a canoe or dragon boat, use `data-side=both` where paddlers switch sides.

Each crew is an `article.boat` with a `data-squad` matching one picker button, holding an `ol.crew` of `li` in bow-to-stern order with `data-side` (`bow`, `stroke`, `both`, `cox`). A sweep seat has one `.blade.b` or `.blade.s`; a sculler has both. Set `data-rig="sculling"` on the `ol` for sculling boats so desktop names keep to one pitch. A new boat needs an article and one more button in the picker; the live line counts boats itself. Names longer than about 14 characters wrap to two lines on phones, which the 64px pitch accommodates.

To retime motion, edit the durations in the script's `animate()` calls and on `a` and `.chips button`. To remove the glide, delete the animate calls; the reorder still works. The 760px and 960px breakpoints are literal because media queries cannot read custom properties; between them the vertical crew is centred.

| Token | Role |
|---|---|
| `--slipway` | Concrete slipway page ground |
| `--paper` | Hull deck, initials on blades and discs |
| `--ink` | Text, hull outline, looms, coach and cox discs, focus ring |
| `--ink-soft` | Seat labels, class lines, picker label and live line |
| `--blade` | Blade colour, pressed squad button, link sweep |
| `--tip` | Primrose tip band of the blades (fill only) |
| `--font` | Anek Latin, the only family |
| `--wdth-display`, `--wdth-name`, `--wdth-initials` | 112% for headings, 82% for people's names, 90% for blade and disc initials |
| `--step--1` to `--step-3` | Major third scale from 17px (step -1 is 13.6px, used by seat labels and every initial); `--step-3` is the fluid H2 |
| `--s-1` to `--s-9` | Spacing scale, 4px to 112px |
| `--gutter`, `--container` | 16px side gutter (32px from 760px), 1200px max width |
| `--pitch` | Seat spacing shared by every hull: 64px rows on phones, 80-112px columns on desktop |
| `--deck` | Tapered bow and stern decks |
| `--hull-h` | Hull beam |
| `--bl-along`, `--bl-across` | Blade length and width |
| `--loom`, `--rigger` | Visible oar between blade and hull, and its line width |
| `--disc`, `--cox-disc` | Coach disc size; cox disc, sized to sit inside the hull beam |
| `--tip-share` | Primrose band as a share of blade length |
| `--initials-nudge` | Offset of the initials away from the tip band |
| `--chip-h` | Squad button height (touch target) |
| `--ease`, `--ease-release` | House ease and the press-release overshoot |
