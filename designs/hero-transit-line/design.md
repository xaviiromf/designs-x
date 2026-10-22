---
title: Transit line strip map
section: hero
subject: Calder Metro, the transit authority of a fictional mid-size city, announcing that its new light-rail Line 5 opens on Saturday 28 November 2026.
aesthetic: In-car strip map and platform-column signage, enamel white with one line colour, set in a highway-sign typeface.
mode: light
fonts:
  - Overpass (Google Fonts, weights 400, 500, 700, 800)
js: Opens two native dialogs (plan a trip, opening weekend timetable) and fills them from the station list in the markup; submitting the planner shows the journey time in place.
tags: [transit, wayfinding, diagram, public-sector, launch, accessibility, dialog]
use_when:
  - Announcing a route, line, itinerary or any real ordered sequence of places where position and time matter.
  - Public-service or civic launches where legibility and plain facts beat imagery.
  - The audience's question is "does this serve me?", and the answer is a list of stops.
avoid_when:
  - The content is not a real sequence (features, benefits, pricing tiers). The line would be decoration.
  - More than about 14 stops, or names longer than about 22 characters. The rotated labels stop fitting.
  - A brand that needs photography or emotional storytelling in the hero.
---

## Why it works

**The one bold idea: the hero is the line diagram.** Where a generic hero puts a photo and a stats row, this one draws the strip map you read above a tram door. A plum bar runs the full content width and grows with the viewport (10px on small screens, 16px at 1440). It has a tick for each station, white rings with navy outlines where you can change lines, station names on a 45-degree slope (19px, growing to 24px), and the minutes from Central under each stop. Every fact a stats row would carry lives on the line instead. The journey time is the last number ("24 min"), the station count is the diagram, and the interchanges are the coloured chips. The headline is capped at 52px so the bar and its labels are the largest mass on the page.

- **It is a real `<ol>`.** The stations are a sequence, so they are marked up as one (with `role="list"`, because `list-style: none` makes Safari drop list semantics). Each `li` reads as "Central Station, change for Line 1 and Line 2, 0 minutes from Central" to a screen reader, and the visible diagram is pure CSS on top of that list. With CSS off it is still a correct timetable.
- **Spacing is time.** Stops are spaced by running time (2 or 3 minutes between neighbours), so the gap between ticks is true, and the minutes underneath read as a correct scale rather than a broken one.
- **Colour is information.** Plum means Line 5: the bar, ticks and the "5" roundel, and nothing else. The button is navy so the first plum the eye meets is the line. Blue and amber appear only on the interchange chips at Central Station and Northgate College, because those are real changes.
- **Overpass for wayfinding.** Overpass is the open interpretation of Highway Gothic, the US road-sign face. It gives the authority a public-signage voice without a DIN or Helvetica cliché. One family and four weights: 800 for the headline, 700 for termini, the brand and the button, 500 for station names, minutes and the free-weekend note, and 400 for body. Minutes use tabular figures so the phone's timetable column lines up.
- **Composition.** From 1100px the headline takes columns 1 to 7 and the copy columns 8 to 12, top-aligned, so there is no dead corner and the tall middle labels rise beside the headline. Below that the copy stacks above the map.
- **The line has two real ends.** It starts at the "5" roundel, with a short run of bar before Central's ring so the line identity and the first station are not one clot of circles. It ends in a T-bar at Kestrel Hill that crosses the bar on both sides, the classic terminus mark.
- **One motion moment.** On load the bar draws once, linearly, from the roundel to Kestrel Hill over 1.4s. Each station's tick, label, chips and minutes fade in when the bar reaches it: the delay is `--draw × minutes / 24` (`--m` on each `li`), which matches because stops are spaced by minutes. On phones, where rows are evenly spaced, the delay uses the stop index (`--i`) instead. Nothing else moves. Reduced motion shows everything at once.
- **The phone layout is the platform column.** Below 760px the same list becomes a vertical diagram: a "Minutes from Central" column header, minutes right-aligned in a left column, a thin vertical plum bar with ticks pointing right, then the name and its chips. Rows are at least 44px tall. It stays a 10px stroke, never a filled column. The copy is short enough that the roundel and the first three stations sit above the fold on an 844px-tall phone.

## Do not touch

- **The `<ol>` markup and the hidden text.** The `.vh` spans ("minutes from Central", ", change for Line 1 and Line 2") are the text alternative for the drawing. The chips, ticks, the "5" roundel and the visible " min" unit are `aria-hidden`. The figure is named by its figcaption, which is visually hidden from 760px up (the "24 min" unit labels the numbers there) and shown as the column header on phones.
- **Colour discipline.** Do not use the interchange colours anywhere except their chips, do not put plum on the button, and do not add a second accent. If you add a station, add a chip only if it is a real interchange.
- **Tick geometry (desktop).** The grid is `2fr 2fr 2fr 3fr 2fr 2fr 3fr 2fr 3fr 3fr 0`: one track per gap, sized by its running time in minutes, so every tick sits on a column's start edge and the 11th, zero-width column is the end of the line. The bar runs from the roundel's centre to `right: var(--tail)`, which is the terminus tick's centre line. Minutes centre on the tick with `translateX(-50%)`; chips start under the ring with `translateX(-chip/2)` and run right. Station names rotate `--rot` (-45deg) about their bottom-left corner with `left: 0.1em`, which puts the rotated baseline (not the box corner) on the tick. Change the font and you may need to nudge that offset.
- **`--label-h` and `--tail`.** They are multiples of `--t-name` and reserve room above the bar for the longest rotated name ("St Brigid's Hospital") and right of the last tick for "Kestrel Hill". If you shrink them, labels collide with the copy above or overflow the page.
- **The 760px switch.** The horizontal map was checked at 768, 1024, 1100 and 1440. At 768 a 2-minute gap is about 44px, roughly 31px perpendicular between 45-degree labels against a 24px line box, so names at 19px do not collide. Below 760 it becomes vertical. Do not shrink names below 15px to keep it horizontal on narrower screens. The breakpoint is written twice (`min-width: 760px`, `max-width: 759px`) because media queries cannot read custom properties.
- **Left alignment.** The header, h1, button, "5" roundel and the phone caption share one left edge. Nothing is centred.
- **Dialogs.** The two buttons open native `<dialog>` elements via `showModal()`, so focus moves into the dialog, stays trapped, Esc closes it and focus returns to the button that opened it. Every dialog has a "Back to Line 5" button and a button to the other dialog, so there is no dead end. The planner is a form handled with `preventDefault`; nothing is sent to a server. Do not turn the buttons back into links to paths that do not exist.
- **Termini.** Kestrel Hill ends in a T-bar (`[data-terminus] .stop.tick`), Central starts at an interchange ring after the roundel, and both names are weight 700.

## Adapting

1. Map the brand onto the tokens. `--line5` becomes the colour of the line being announced (keep white text on it at 4.5:1 or better for the roundel numeral). `--line1` and `--line2` become the colours of the lines that really connect. If a connecting line colour is light, set its chip text to `--ink`, as the amber chip does. `--ink` also fills the button.
2. Replace the stations. Write one grid track per gap between neighbours, sized by its running time (`2fr` for 2 minutes), then a final `0`. Set `--m` on each `li` to its cumulative minutes and change the `/ 24` in the delay to your end-to-end time; renumber `--i` and change `/ 10` to your stop count minus one. With 6 to 14 stops this layout holds. If one gap is much shorter than the rest (under about 1.5 minutes at this width), its labels will collide: give it a minimum track (`minmax(2.75rem, 1fr)`) and accept a slightly untrue scale, or go vertical at a wider breakpoint. With fewer than about 6 stops, consider dropping the rotation and setting names horizontally.
3. If your longest name is longer than "St Brigid's Hospital" (20 characters), raise the `--label-h` multiplier. If your last station name is longer than "Kestrel Hill", raise the `--tail` multiplier.
4. The minutes can be any cumulative measure (minutes, kilometres, fare zones). Change the visible unit on the last stop and the figcaption to say exactly what they are.
5. Copy: the headline says what opens and when; keep the date on one line from 760px up. The lede gives what the map cannot show (frequency, hours, accessibility) and does not repeat stations or journey time. The note gives the opening offer. Button labels say exactly what happens.
6. Actions: "Plan a trip" and "See the timetable" open in-page dialogs that read the station names and minutes from the `<ol>`, so editing the list updates both. The first train time (`first`, 5:30 am) is in the script. To use a real journey planner or timetable instead, replace the buttons with `<a href="https://..." target="_blank" rel="noopener">` and delete the dialogs and script.
7. Fonts: if the Google Fonts request fails, the fallbacks have different metrics, so the rotated-label offset (`left: 0.1em`) may be slightly off. `--label-h` and `--tail` carry some slack for this. Self-host Overpass in production.
8. In a component framework, render the stations from an array of `{ name, minutes, interchanges[], terminus }` and generate the grid tracks from the minute differences. Keep the markup flat (`li > .stop + .name + .xfer + .min`) so both the horizontal and vertical CSS keep working.

| Token | Role |
|---|---|
| `--paper` | Page background, the ring fill and the focus-ring gap. A cool enamel white. |
| `--ink` | Signal navy: headline, body, station names, ring outline, button fill, focus ring, amber chip numeral. |
| `--ink-soft` | Timetable grey: minutes and the caption only. |
| `--line5` | The announced line's colour: bar, ticks and "5" roundel. Nothing else. |
| `--line1`, `--line2` | Colours of the connecting lines, used only on interchange chips. |
| `--on-line` | Text on the line colours and the button (white). |
| `--font` | Overpass with Highway Gothic, Atkinson Hyperlegible and system-ui fallbacks. |
| `--t-xs` … `--t-l` | Type scale: caption and chips (14px), header and minutes (16px), body (19px), wide station names (24px). |
| `--t-xl` | Headline, 40 to 52px. |
| `--t-name` | Station names, 19px growing to 24px on the horizontal map. |
| `--lh-tight`, `--lh-body`, `--lh-name` | Line heights for headline, body and station names. |
| `--measure` | Max width of the lede and note (34em, about 65 characters). |
| `--nudge` | Optical offset for Overpass numerals inside circles. |
| `--s-1` … `--s-9` | Spacing scale, 4px to 96px. |
| `--gutter`, `--max` | Side gutter (16 to 64px) and the 1280px content width. |
| `--radius`, `--focus-w` | Button radius (4px, signage rounded rectangle) and focus ring width (3px). |
| `--bar`, `--tick`, `--tick-w` | Line thickness (10 to 16px), how far a tick stands off the bar (14 to 18px) and its width. The terminus T-bar is `--bar + 2 × --tick`. |
| `--ring`, `--ring-border` | Interchange ring size (22 to 28px) and outline width (3px). Also the width of the vertical bar's column on phones. |
| `--bullet`, `--chip`, `--chip-gap` | The line roundel (28 to 36px), the interchange chips (22px) and the gap between chips. |
| `--rot` | Station name angle (-45deg). |
| `--label-h`, `--tail` | Space reserved above the bar and right of the last tick for rotated names, as multiples of `--t-name`. |
| `--min-col`, `--row` | Phone layout: width of the minutes column and minimum row height (44px). |
| `--ring-border` (dialog) | Also the outline width of the planner's select boxes. |
| `--draw`, `--fade` | Bar draw duration and each station's fade-in duration. |
