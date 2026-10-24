---
title: Halden Weir crews and coaches
section: team
subject: The crews and coaches of Halden Weir Rowing Club, a fictional club boating from the Skerton boathouse on the River Lune in Lancaster, filterable by squad.
aesthetic: A boathouse crew sheet drawn to scale. Each boat is seen from above with its green-and-white club blades as the rowers' portraits, on Lune sandstone, lettered in one variable family whose width axis does the signwriting.
mode: light
fonts:
  - Anek Latin (Google Fonts, variable wdth 75-125 and wght 100-800), the only family
js: none
libraries: []
tags: [team, rowing, sport, club, filter, css-has, radios, drawing, to-scale, light]
use_when:
  - A sports club, crew or squad where who sits where is real information (rowing, dragon boat, canoe, relay order, a bobsleigh team).
  - Parents, new members or visiting teams need to find a person, their position and their coach quickly.
  - A small roster (up to about 30 people) split into a few squads that people filter between.
avoid_when:
  - The team has no positions or order. The boat drawing then encodes nothing and becomes decoration.
  - The roster needs photographs, bios or long role descriptions; there is no room for them beside a seat.
  - Rosters above roughly 40 people or many squads; the chips and the drawings stop scaling.
---

## Why it works

**The bold idea: every crew drawn as it sits in its boat, to scale.** Each squad is a hull seen from above, bow first, with seat numbers painted inside it. Every rower's portrait is their own oar blade (club green with a white tip band, their initials painted on it) at the end of a loom on the side that seat is actually rigged. The drawing carries true information:

- **Sides are real.** In sweep boats odd seats are on bow side and even seats on stroke side, so blades and names alternate. In the junior quad each sculler has a blade on both sides and the names sit on bow side. Coxes sit in the stern with a disc and no blade. Coaches ride in the launch line under their boat.
- **Boats are to scale.** One `--pitch` token sets the seat spacing for every hull, so the eight is visibly twice the length of the fours. Boats are left-aligned at the bow so their lengths compare.
- **The drawing stays true on phones.** Below 960px the hull turns vertical with the bow at the top. Seen from above travelling up, bow side (starboard) is on the right, so odd seats move right and even seats left. It is the same markup with a second grid template: each `li` is a subgrid of the crew `ol`, and every part names its track (`nb`, `bb`, `hull`, `bs`, `ns`) through a `--t` custom property used as `grid-row` on desktop and `grid-column` on phones.
- **Rowing's own seat names.** Bow, 2 seat to 7 seat, Stroke, Cox, never 01/02. Crew order is a real sequence and the DOM follows it bow to stern, so a screen reader hears the crew in boating order. The hull, the seat numbers and the blades are `aria-hidden`; the names and seat labels carry the content.
- **Typography by width, not caps.** Anek Latin is the only family and the only one in the collection. Boat names (Margaret Tyson, Annie Wilkinson...) are sentence case at wdth 112 / 650, which gives the signwritten feel without tracked caps. Rower and coach names are wdth 82 / 560 so "Kacper Olszewski" fits beside a 64px seat on a 360px screen. The served Google build exposes the variable wdth axis (`font-stretch: 75% 125%`) and lining figures, so no fallback was needed.
- **Lune sandstone, not mist or cream.** The page is `#E6E1D9`, a warm grey taken from the local sandstone. A pale grey-green was rejected because it duplicated team-research-lab and several other sections. It is not default 1: there is no serif display and no terracotta, and the only accent is the club's blade green.
- **The filter is pure CSS.** The squad chips are real radios in a fieldset. `.team:has(#sq-men:checked) .boat:not([data-squad=men]) {display:none}` does the filtering, and the status line is five stacked spans in one grid cell shown by the same `:has` rules, so there is no script at all. The checked chip changes fill and weight (500 to 650), so state never rests on colour alone. "All squads" is the way back.
- **Defaults avoided.** No cards, shadows or round photo avatars in a grid (default 4). No eyebrow above the H2, no middle-dot meta strings (two plain sentences instead), no tracked caps (default 5). The one rule is the sticky bar's bottom edge. No load sequence, no scroll reveals, no ambient loop.

## Do not touch

- One shared `--pitch` for every hull. Per-boat spacing breaks the scale comparison.
- Odd seats on bow side and even seats on stroke side, and the swap (bow side on top on desktop, on the right on phones). Swapping it the other way makes the drawing wrong for anyone who rows.
- Bow-to-stern DOM order and the seat labels as text.
- CSS-only filtering. If browsers without `:has` matter, add a script that toggles a class, but keep the radios as the control.
- Blade initials in `--paper` on `--weir-green` (6.3:1) and away from the white tip band.
- Ink at full strength for names. Do not dim neighbours on hover; ink below full strength on sandstone fails AA.

## Motion

Simple tier: no libraries, no script, no load sequence, no scroll motion and no ambient loop. House ease is `cubic-bezier(.16,1,.3,1)`. The filter changes instantly; the drawing is the identity, not the transition. A `prefers-reduced-motion: reduce` block removes every transition.

| Item | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Squad chips | border ink-soft to ink | hover (pointer: fine only) | 160ms | instant |
| Squad chips | MI1 press and release | :active | scale .96 in 120ms, release 350ms `cubic-bezier(.34,1.56,.64,1)` | no scale |
| Checked chip | fill to weir green, weight 500 to 650 | radio checked | 160ms on colour | instant |
| Rower pair | loom thickens from 1.5px to 3px in ink | hover on a seat (pointer: fine only) | 300ms | instant |
| Links | HV2 directional underline sweep, green band .12em, in from the left and out to the right, over a resting 45% underline | hover, :focus-visible | 400ms | band shown without sweeping |
| Sticky squad bar | static `position: sticky` | scroll | none | same |

Focus is a 2px ink outline at 3px offset on chips and links, instant.

## Adapting

Map the brand onto the colour tokens first: `--weir-green` becomes the club's blade colour and `--blade-tip` its second colour. Keep the initials colour at 4.5:1 or better on the blade colour. For another water sport, keep the hull and seat logic and redraw the blade shape (`.blade::before` clip-path, drawn tip-up and rotated per side). For a canoe or dragon boat, use `data-side=both` where paddlers switch sides.

Each crew is an `ol.crew` of `li` in bow-to-stern order with `data-side` (`bow`, `stroke`, `both`, `cox`). A sweep seat has one `.blade.b` or `.blade.s`; a sculler has both. Set `data-rig="sculling"` on the `ol` for sculling boats so desktop names keep to one pitch. A new squad needs a radio, a `data-squad` on its article, a filter line, and a status span with its `:has` line. Chip counts and status lines are written by hand. Names longer than about 18 characters wrap to two lines on phones, which the 64px pitch accommodates.

To retime motion, edit the durations in `.chip`, `.blade::after` and `a`. To remove it, delete those transitions; every state still works.

| Token | Role |
|---|---|
| `--mist` | Lune sandstone page ground |
| `--paper` | Hull deck, sticky bar, chips at rest, initials on blades and discs |
| `--ink` | Text, hull outline, looms, coach and cox discs, focus ring |
| `--ink-soft` | Seat labels, class lines, chip counts, status line, sticky bar rule |
| `--weir-green` | Blade colour, checked chip, link sweep |
| `--blade-tip` | White tip band of the blades |
| `--font` | Anek Latin, the only family |
| `--wdth-display`, `--wdth-name` | 112% for headings and boat names, 82% for people's names |
| `--step--1` to `--step-3` | Major third scale from 17px; `--step-3` is the fluid H2 |
| `--s-1` to `--s-9` | Spacing scale, 4px to 112px |
| `--gutter`, `--container` | 16px side gutter (32px from 760px), 1200px max width |
| `--pitch` | Seat spacing shared by every hull: 64px rows on phones, 80-112px columns on desktop |
| `--deck` | Tapered bow and stern decks |
| `--hull-h` | Hull beam |
| `--bl-along`, `--bl-across` | Blade length and width |
| `--loom`, `--rigger` | Visible oar between blade and hull, and its line width |
| `--disc` | Coach disc size |
| `--ease`, `--ease-release` | House ease and the press-release overshoot |
