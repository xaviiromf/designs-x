---
title: Museum floor-plan navigation
section: nav
subject: The site navigation of The Coin Door, a fictional museum of arcade and home video games in the 1911 Gerland tram depot in Lyon, with six rooms on one floor. Visitors use it to find a room, check today's hours, search the collection and hold tickets.
aesthetic: A bronze museum plaque gone green. Verdigris ground, plaque-white wall lines and text, a grey-green patina for everything at rest, and six room hues that only ever mean their room. The menu is the building's tile floor plan, and an 8x8 pixel visitor walks it.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, always at ELSH 2 and ELGR 1 so its modules are square tiles. The wordmark at 700, the h2s (welcome, rooms, dialogs) at 700, the big room numerals and the ticket count on the pass at 800.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, at 400 for body, 600 for links, room names and map labels, 700 for tickets, tabular figures for hours, prices, counts and the booking number. The stamp's day is drawn from Host Grotesk 800 into canvas pixels.
js: Draws the 28x14 tile plan in SVG, walks a pixel visitor to a room's door by breadth-first search one tile every 30ms, lights rooms for the pointer, focus, touch and a live collection search, steps a header minimap with the scroll, cuts the header's second row at 80px, and runs the load cut-in, ticket presses, swing-gate dialogs and a stamped booking pass (nothing is sent).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [nav, header, menu, museum, floor-plan, map, pathfinding, pixel, minimap, search, dialog, booking, tickets, dark, gsap, lenis]
use_when:
  - A place with rooms, halls, stands or zones (a museum, a venue, a campus, a trade fair) whose navigation can honestly be its floor plan.
  - A site where the sections are destinations a visitor will physically walk to, and showing the way is part of the answer.
  - A header that has to carry hours, a search and one primary action (tickets, booking) as well as the section links.
avoid_when:
  - The sections have no spatial relation to each other. A plan of a building that does not exist is decoration.
  - More than about eight destinations. The plan and the six-hue palette stop reading past that.
  - Pages that already have a large pointer effect near the top. The walking visitor is the page's one moving idea.
---

## Why it works

**The one bold idea: the menu is the floor plan, and it walks you there.** The Coin Door has six rooms on one floor, so its navigation is the building. Pointing at a room name (or tabbing to it, or tapping it) opens the plan under the header, and an 8x8 pixel visitor leaves the way in and walks to that room's door along the corridor, by the shortest route on the tile grid (breadth-first search, four directions, around the depot's three columns), one whole tile every 30ms. Each tile it leaves keeps a footprint dot until it arrives, and the destination's floor tiles switch from hollow patina outlines to solid squares of the room's hue. Sweep the pointer across the six names and the visitor turns round mid-corridor each time, which is exactly the information a museum visitor wants: where is it from here. The map and the list are two views of one nav: the rooms on the map are links too, and the readout under the map always names the room, its note and a "Go to" link.

- **Different from the nearest designs in the ledger.** `story-speedrun-marathon` moves a runner through a level driven by scroll, and `cta-indie-game` lights cells under the pointer. Here nothing follows the pointer and nothing is scrubbed: a discrete choice (a room) produces a computed route on a real plan, walked at a fixed tile rate, and it stops. The minimap is a second, much smaller reduction of the same idea, driven by scroll in whole cells.
- **Colour has jobs, and the room hues are the point.** Seven hues: the verdigris family (ground `--verdigris`, the darker `--deep` for the plan plate, corridor, field wells and ink, the lighter `--wall` for hover and label plates, and `--patina` for everything secondary and at rest) and the six room hues, each used only for its room on the map and the minimap, its nav marker and its section's heading tick. `--plaque` is the museum's own ink: text, wall lines, the visitor, footprints, the focus ring and ticket paper. The one exception that is not an exception: the date stamp is Arcade-hall yellow because the ticket desk stands in the Arcade hall, and the copy says so. Errors get no hue of their own (the brief's option to merge two rooms was not taken), so an error is a plaque hatched bar and plaque text, and the field's walls turn plaque.
- **Every button is an admission ticket.** Main part and stub, the perforation one fifth from the right end, stepped pixel corners. Plaque paper for the primary action (Buy tickets, Hold these tickets), patina stock for the rest (Floor plan, Close, Change this booking). The hover tears the stub away along the perforation; the press punches a hole through it.
- **Structure from the building.** Rooms are rectangles of tiles with one door each onto one corridor, as in the depot; the Handheld corridor is the long inspection pit down the east side. Walls are 4px plaque lines through tile centres (2px on small plans, 1px thicker when a tile is an odd number of pixels so lines stay on whole pixels). Room labels sit on a plain first row so text never sits on a lit tile. Tiles are a whole number of pixels (`round(down, 100cqw / 28, 1px)`), and the visitor is drawn at a whole pixel size (3px on desktop tiles, 2px on phones).
- **Type.** Handjet's square modules echo the floor tiles in the wordmark, the h2s and the big room numerals. Host Grotesk does all the reading, with tabular figures for hours and prices.
- **The header carries the practical things.** Row one: wordmark, minimap, collection search, Floor plan, Buy tickets. Row two: the claim and today's real hours, computed from the visitor's date (closed on Mondays, late on Thursdays). Row three: the six room links. After 80px of scroll row two is cut away, and it is back at the top. On narrow screens: wordmark, Floor plan and Buy tickets, the claim, and the minimap as a full-width strip; the plan and the search live in a native dialog.
- **Search is plain filtering.** Each room carries a list of what it holds (pinball, cartridge, CRT, manual, coffee). Typing two letters or more lights every matching room on the map and in the list and says which, in a polite live region ("2 rooms have "crt": Console gallery, Workshop."); Enter sends the visitor to the first match.
- **Flows with no dead ends.** Plan your visit is a native dialog with date (today to six months ahead, not on Mondays, 25 December or 1 January), tickets (a whole number from 1 to 8; groups are sent to an email address) and the booking name. Each field validates on submit with a message that says how to fix it, a reserved error line, `aria-invalid` and `aria-describedby`, and focus on the first bad field; errors clear as soon as the value is valid. The pass echoes the count, the full date, the name, a booking number and the price, and "Change this booking" brings the form back with every value kept.
- **Semantics.** The section is the `<header>`, labelled by a visually hidden `h2` (the first heading in the document; the host page owns the `h1`). It contains `<nav aria-label="Rooms">`; the plan is a second `<nav aria-label="Floor plan">` with an ordered list of the rooms and the SVG plan, whose room links are `tabindex="-1"` so keyboard users get one tab stop per room in the list. The current room link takes `aria-current="location"`. Going to a room scrolls to its section and moves focus to its `h2` (`tabindex="-1"`).

Deviations from the brief, and why:

- **The header is fixed, not sticky.** The brief's hard cut of the second row would make a sticky header jump the page by 36px; a fixed header over a body padding of the full header height removes the row without moving anything below it.
- **The stub "tips down" by translation, not rotation.** It drops 2px as a whole (1px at the first step), so its edges stay on whole pixels.
- **On narrow screens the load cut-in plays on the minimap's six room cells,** because the room links are inside the menu dialog there. It is the same effect on the same six rooms.
- **The six room hues were kept; no merge.** So errors are the plaque hatched bar and text, as the brief allows.

## Do not touch

- **The grid is the truth.** `ROOMS` (box and door), `HALLS`, `PILLARS` and `WAY_IN` build one `Uint8Array`; walls, corridor dots, room floors, labels and the route all come from it. Move a door in one place only and the visitor walks through a wall.
- **The walk is whole tiles on a fixed clock.** `--d-tile` (30ms) is read by the ticker, which steps at most one tile per 30ms and is only on the ticker while the path is not empty. Do not tween the marker between tiles or ease the walk.
- **Tiles and sprite pixels are whole pixels.** `--tile` is rounded to 1px, the wall width follows the tile's parity, and `measure()` picks the visitor's scale so a sprite pixel is an integer. `measure()` reads the layout width (computed style), not the drawn width, because a dialog mid-swing is narrower on screen.
- **Room labels keep their plain first row** (two rows for the Handheld corridor). Putting tiles under the label puts plaque text on a lit hue.
- **One plan, two homes.** `home()` moves the same `#plan` and `#search` nodes between the desktop panel and the phone dialog on the 1024px breakpoint. Do not duplicate them: the listeners, the lit state and the visitor's position live on those nodes.
- **Corners on inner spans.** Tickets put `clip-path` on `.tk-m`, `.tk-l` and `.tk-s`, never on the `<button>`, which has 6px of right and 4px of bottom padding so the torn stub stays inside the focus ring.
- **Hidden states only under `html.js:not(.go)`**, undone under reduced motion. With the CDN blocked the class is never added: the panel, the search, both dialogs, the form and the stamp all work in plain JavaScript, and the visitor jumps instead of walking.
- **Accessibility.** Plaque focus ring, 2px, offset 3px (inset on the header links and list rows). Every target is at least 44px (tickets 48px). Hover is never required: focus and the first tap do what the pointer does. The panel closes on Escape, on a press outside, when focus leaves the header, and 300ms after the pointer leaves it unless it was opened with the Floor plan button. Lenis is stopped while the panel or a dialog is open, and both scroll inside themselves on short viewports.

## Motion

House stepping: whole tiles, whole pixels and held frames. CSS transitions use `steps(2, jump-start)` (tear, doorway) or `steps(2, end)` (pin), GSAP timelines are made of `.set` and `.call` at fixed frame times, and the walk runs on `gsap.ticker`. Everything is built inside `gsap.matchMedia` (motion, reduce). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The load waits for the fonts (Handjet 700 and Host Grotesk 600, 1.5s timeout) and for a visible page. Colour changes (lit rooms, hover plates, the error walls) are instant. The largest flash is one 130x52px room swatch for 80ms, one room at a time.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| The visitor walks to a room (signature) | BFS route, ticker steps the SVG `transform` one tile at a time, two sprite frames alternating | Pointer enters a header link, list row or map room; keyboard focus on a header link or list row (Tab or arrow keys); first tap on touch; search submit | 30ms per tile (`--d-tile`), at most one tile per frame; redirects mid-walk from the tile it stands on | Visitor jumps to the door |
| Footprints | A 0.25-tile plaque square on every tile left behind | Each step | Cleared on arrival | None (jump) |
| Destination lights | Room tiles switch from patina outline to solid hue; list row plate and number square switch | Same as the walk, and every search match | Instant | Instant |
| Panel opens and closes | `hidden` toggled (hard cut) | Header link hover or focus, Floor plan button, search focus; closes on Escape, press outside, focus leaving, 300ms after pointer leaves (`--d-grace`) | Instant | Instant |
| You are here (minimap) | `--at` custom property drives `translateX` by whole cells; sprite frame swaps each cell; the cell above the marker fills with the room hue | ScrollTrigger per room section, top 40% to bottom 40% | 70ms per cell (`--d-cell`) | Jumps |
| `aria-current` and the current-link bar | Attribute and a 4px plaque bar | Same triggers | Instant | Instant |
| Header loses its second row | `.is-slim` sets the row to 0 and hides the claim | ScrollTrigger: scroll above 80px | Hard cut, both ways | Same (native scroll) |
| Load: room links cut in | Each `li` made visible, its swatch `clip-path: inset(0)` for one frame, then back to the marker square | Fonts ready and page visible | 0.1s, then 60ms apart (`--d-cut`), swatch 80ms (`--d-swatch`); narrow screens: the minimap's room cells | All visible |
| Ticket hover: the stub tears | `transform: translate(4px, 2px)` on the stub | Hover (hover devices), focus-visible, touch press | `steps(2, jump-start)` over 120ms: 2px across and 1px down, then 4px and 2px (`--d-tear`) | Instant |
| Ticket press: punched | A 10px hole shows the ground through the stub; main part inverts (deep on paper colour) | pointerdown, Enter or Space; `:active` without the script | Held at least 140ms from the press (`--d-punch`) | Same (state change) |
| Text links: the pin drops | Pixel pin `translateY(-6px)` to 0; solid patina underline swaps to a dotted plaque route | Hover, focus-visible; on touch, pointerdown held 200ms (`--d-pin-hold`) | `steps(2, end)` over 120ms: 6px, 3px, 0 (`--d-pin`) | Pin and route shown at once |
| Fields: a doorway opens | Evenodd `clip-path` opens a gap in the 4px left wall; the wall turns plaque | Focus | `steps(2, jump-start)` over 120ms: 6px then 12px (`--d-door`) | Gap shown at once |
| Field label plate | Plate cuts from inside the field to above it | Focus, or a value in the field | Hard cut | Same |
| Dialog: swing gate in | GSAP `.set` frames of `rotationY` and `skewY`, hinged on the left edge, no perspective | showModal from Buy tickets or Floor plan (narrow) | 67.5, 45, 22.5 degrees, then 0, 70ms per frame (`--d-gate`) | Instant |
| Dialog: swing gate out | Same, three frames | Close, Escape, backdrop press, Go to a room | 30, 60, 90 degrees, 70ms each, then `close()`; a forced close is settled | Instant |
| Success: stamped | Canvas pixel stamp: hollow outline frame, then solid ink with the day knocked out of the band, at -14 degrees | Valid booking submit | Outline, then solid 160ms later (`--d-ink`); focus to the pass heading | Solid stamp at once |
| Search lights rooms | Plain filtering | Each input | Instant | Instant |

## Adapting

1. **Draw your building.** Edit `ROOMS` (id, number, name, note, `box` as [c0, r0, c1, r1], `door` as [c, r], and `keys` for search), `HALLS`, `PILLARS` and `WAY_IN`, keeping `COLS` by `ROWS` near 2:1. Every room needs a door tile in its wall that touches a hall tile. Check by pointing at each room: if a route is empty, the door does not reach the corridor.
2. **Map the colours onto the tokens, keeping their jobs.** One hue per room, and only for that room (`[data-room]` sets `--hue`). Keep the neutrals as one family of your ground plus a plaque ink and a patina for rest. If you need more than six rooms, group rooms into zones and give the zone the hue.
3. **Copy.** One short note per room (about 45 characters), the claim line, and real hours in the `#today` block. Room names longer than the room's tile width need the two-line label (`two`) or a wider box.
4. **Sizes.** `--tile-max` caps the plan (24px, 20px on short desktop windows); `--list-w` is the narrowest room list. Labels switch to numbers below 22px tiles. The header heights are `--bar-h`, `--claim-h` and `--row3`, and the body padding is their sum.
5. **Retime or remove motion.** All durations are `--d-*` tokens. To remove the walk, make `fx.walk` call `jumpTo`; the lit room and the readout still work. To remove the minimap stepping, call `setMini` directly in `setCurrent`.
6. **In a framework,** render the header, panel and dialogs statically, build the SVG plan once in an effect, and keep the `gsap.matchMedia` cleanup (it removes the walk ticker, kills the minimap timeline, destroys Lenis and restores visibility).

| Token | Role |
|---|---|
| `--verdigris` | Ground: page, header, room floors at rest (plaque text 9.5:1) |
| `--deep` | Plan plate, corridor, field wells, dialog surface, scrim base, ink on paper and lit rooms |
| `--wall` | Hover and label plates, the lit list row, the booking pass (decorative, 1.14:1 on ground) |
| `--plaque` | Text, wall lines, visitor, footprints, focus ring, ticket paper, errors (9.5:1 ground, 12.5:1 deep, 8.3:1 wall) |
| `--patina` | Secondary text, rules, field walls, unlit rooms, second ticket stock (6.1:1 ground, 8.0:1 deep, 5.3:1 wall) |
| `--arcade` ... `--cafe` | The six rooms, one hue each; deep text on them 6.1:1 or more; `--arcade` also inks the desk stamp |
| `--scrim` | Dialog backdrop, deep verdigris at 0.88 |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk, with fallbacks |
| `--t-small` ... `--t-num`, `--lh-body` | Type: 13, 15, 17, 21, 24 px; wordmark 32; dialog title 44; room h2 clamp(40px, 4.6vw, 64px); welcome h2 clamp(44px, 5.8vw, 84px) capped at 11vh; numerals clamp(120px, 15vw, 224px) |
| `--cell`, `--s1` ... `--s9`, `--gutter`, `--max-w` | Spacing on an 8px cell: 4 to 128; 32px gutter (16 on phones); 1376px content |
| `--tap`, `--hit`, `--notch`, `--mark` | 48px tickets and fields, 44px links and rows, 4px stepped corner, 12px room marker |
| `--sprite`, `--sprite-l`, `--tile-max`, `--list-w` | Visitor at 16px and 24px, largest plan tile, narrowest room list |
| `--bar-h`, `--claim-h`, `--row3`, `--hd-full`, `--hd-slim` | Header rows and the full and slim header heights |
| `--d-tile`, `--d-cell` | Walk per tile (30ms), minimap per cell (70ms) |
| `--d-cut`, `--d-swatch` | Load stagger (60ms), swatch frame (80ms) |
| `--d-tear`, `--d-punch`, `--d-pin`, `--d-pin-hold`, `--d-door` | Ticket tear (120ms), shortest punch (140ms), pin drop (120ms), touch pin hold (200ms), doorway (120ms) |
| `--d-gate`, `--d-ink`, `--d-grace` | Gate frame (70ms), stamp outline frame (160ms), plan close delay (300ms) |
