---
title: About me page for a pinball technician, played on a small table
section: about
subject: "The personal front end of Marisol Vega, a fictional pinball and arcade technician in Guadalajara who repairs electromechanical and early solid-state machines for collectors, bars and one museum, travels with a tool roll and a multimeter, and runs a monthly repair night for beginners."
aesthetic: "A backglass painted hot magenta. Wells of darker magenta hold a low-resolution playfield, amber score displays and a chart of lamps; eleven lamp hues each light one kind of thing; everything is set in one pixel monospace and moves in hard cuts on a clock."
mode: dark
fonts:
  - "Departure Mono (pinned jsDelivr package @proj-airi/font-departure-mono@0.17.0, SIL Open Font License). The only family, one weight, on its 11px grid: 13.75px small, 16.5px body, 22px lede, 33px headings and score displays, 44/55/66px for the headline and the five-digit display, 88px (110px from 1024px) for the initial on the spinner. Falls back to the system monospace."
js: "Runs a fixed 30 fps pinball simulation the pointer leans and a click flips, rolls a ball along a fixed path through five drop targets as a pinned scene is scrolled, draws a lamp chart from DATA and contact links from CONTACT, drives a spinner toy, a lamp-matrix wordmark, bonus lamps, the enquiry form with its match-number confirmation and the tool-roll dialog; every flow also works with the libraries blocked."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [about, personal, pinball, arcade, technician, canvas, simulation, pinned-scroll, chart, form, dialog, monospace, departure-mono, vivid, dark, gsap, lenis]
use_when:
  - "A personal page for someone whose trade has its own machinery (repair, instruments, vehicles, print) and who can stand a loud, playful page that still answers who, what now, how they got here and how to reach them."
  - "The person has a handful of true figures and five clear chapters; the bumpers, the drop targets and the lamp chart each need real numbers to mean anything."
  - "The page is the whole site, with room for one long scroll and a visitor who will play with it for a minute."
avoid_when:
  - "Corporate or team pages; the table, the spinner and the match number are one person's voice."
  - "Brands that need a calm or light surface, or more than a few paragraphs of prose; the pixel monospace is tiring in long text."
  - "Pages that already carry a canvas game or a pinned scene nearby; two simulations on one screen fight for the same attention."
---

## Why it works

**The one bold idea: you meet her by playing one of her machines.** The first screen is a small pinball table, 112 by 152 playfield pixels, with one ball, five bumpers, two slingshots, two flippers and a drain. It runs a real, if tiny, simulation at a fixed 30 frames a second. The pointer does what a player's hip does: it leans the table, so gravity pulls toward the side of the window the pointer is on. A click, a tap or Space fires both flippers. Each bumper is one true figure about her work, and when the ball hits it the bumper lights in its hue for 0.3 s and the amber score display above the table cuts to that figure. The headline says pinball machines should be played, not stored, and the page makes the visitor do it before they have read the lede.

Everything else on the page is quieter and is made of the same parts: a ball, lamps, drop targets, a score display, a wire.

- **Eleven hues, eleven jobs, and three tones of one ground.** The ground is hot magenta (`--ground` #A3126E), with a darker well (`--well`) for anything recessed (the playfield, displays, the backglass, fields, chapter cards) and a lighter plate (`--plate`) for anything raised (walls, the spinner, the dialog's plates). Text is one neutral (`--white`), with `--blush` for secondary text, outlines and unlit lamps. Then the lamps: yellow `--start` is the primary action, focus and the ball's highlight; cyan, lime, orange, violet and mint (`--bumper-a` to `--bumper-e`) are bumpers 1 to 5 and chapters 1 to 5, the same five hues in the table, the story lane, the index, the chapter cards and the wordmark's columns; red, sky and peach (`--coil`, `--switch`, `--rubber`) are the three kinds of fault in the chart and appear nowhere else; amber `--score` is every character on a score display and nothing else; coral `--fault` is form errors only (machine faults have their own three hues). A hue is never text on the ground, so the page does not turn into confetti: hues are lamps, bars and cells, and they sit on a well wherever they would fall under 3:1 on the ground (red is 3.65:1 on the well and is only ever drawn there).
- **One typeface as a voice, not a costume.** Departure Mono is drawn on an 11px grid, so every size is a multiple or a clean fraction of 11 and every spacing step is the 11px cell or half of it. There is no bold: emphasis is size, inversion (the picked year, the pressed rollover button), a lamp, or position. There are no prompts, no fake logs and no ASCII art. The score displays are the only place the face plays a part, and they are real figures.
- **The structure is a game of pinball.** Top: the table. Now: three lines. The story so far: the ball again, this time rolled by scroll along a fixed path, dropping one target per chapter. By the numbers: a backglass of lamps, one lamp per machine. A toy: a spinner. Things I use: six tools. Say hello: a form that ends with a match number, the last thing a pinball machine does before the game is over. Sign-off: her name in lamps, running its attract mode.
- **A scroll marker that is a bonus ladder.** Five bonus lamps and a "Ball 1 of 3" plate are fixed at the lower left edge (a row along the top on phones). One lamp lights for each part of the page reached (Now, the story, the numbers, the spinner and tools, hello), and the plate counts the three thirds of the page. It works without the libraries.
- **Data is in two constants.** `DATA` holds machines repaired per year and fault kind; the chart, its year buttons, the five-digit display, the readout and the table are built from it. `CONTACT` holds the links; delete a line to remove one. `FACTS` (the five bumpers) and `SPIN` (the spinner's twelve facts) sit beside them.
- **Flows.** "Ask about a repair" goes to the form (the press is shown for 0.16 s before the page moves). "See my tool roll" and "Open the whole tool roll" open a native dialog, closable by Close, Escape or a press that starts and ends on the backdrop, with focus returned to the opener and Lenis stopped while it is open. The form validates in JavaScript on submit with messages that say how to fix the problem, reserves two lines for each error so nothing shifts, moves focus to the first bad field and clears an error as soon as the value is valid. Nothing is sent. The confirmation shows a reference, the match number, then "You win a reply." with the entered values, and "Change this" brings the form back with everything kept.
- **Semantics.** One `section` labelled by the `h2`, nested `section`s with `h3`s, chapter and tool names as `h4`s, a `dl` for Now, an `ol` of chapters, a `footer` for the sign-off. The playfield is a real `button`, so Space and Enter fire the flippers and the arrow keys lean the table. The canvases are `aria-hidden` and each has a text alternative: the five bumper figures are a visually hidden list, the chart has a live readout and a "Read the figures as a table" disclosure, the story is five cards that stay in the accessibility tree while only one is shown, and the wordmark is repeated as text under it. The selector is four radios in a `fieldset`; the rocker is a checkbox with `role="switch"`.
- **What is different from its relatives.** `testimonials-capsule-club` settles a pile of capsules and `hero-racing-arcade` steers a road; neither has a ball with gravity, collisions and flippers. `story-speedrun-marathon` scrubs a side-scrolling run; this is a top-down path with a loop, a ramp and targets that drop. `contact-hackerspace` lights blips that a ring crosses; here lamps light because a simulated ball hit them.

Deviations from the brief, and why:

- **The table hint is one short line.** At 1280 by 600 a two-line hint under the table was cut by the window edge, so the visible hint is "Move to lean the table. Click to flip." and the keyboard instructions are in the button's accessible name.
- **A one-way gate and a kicking arch were added to the table.** Without them a ball leaning right fell back into the plunger lane and never reached a bumper. The arch at the top of the lane now throws the ball left, and a gate lets it out of the lane and never back in.
- **A five-pip tilt bob at the foot of the table shows which way it leans,** so the pointer's effect can be seen even when the ball is in the air.
- **The ghost of the last pick is an outline in place plus its level carried across** as a dotted line to the picked column, because an outline three columns away was hard to compare by eye. The last pick's year button also keeps a dashed frame.
- **The rotary selector is four radios,** not a `select`: all four positions are on the rail and the pointer jumps between them. It defaults to "Not sure", so it never needs an error.
- **On phones the story lane scales by 1, 1.5 or 2** so the pinned frame (title, lane and index, one card with its text at body size) fits the window: `lane.fit()` gives the lane what is left after 396px for the bonus row, the title and the card; under 610px of height, and with reduced motion, the scene is not pinned and all five cards are on the page.
- **The bonus lamps are neutral white.** The brief gave them no hue, and every hue already has a job.

## Do not touch

- **The simulation's clock.** `table.step()` is one frame at 30 per second, run from `gsap.ticker` through an accumulator with three collision sub-steps per frame. Gravity, the lean, speeds and the lit time (`--d-lamp`, 9 frames) are all per frame. Do not tie it to the display's refresh rate, and do not smooth the drawing: positions are rounded to whole playfield pixels.
- **Whole-number scales.** The three low-resolution canvases are drawn at 112 by 152, 96 by 176 and 154 by 140 pixels and shown at `--S`, `--LS` and `--CS` CSS pixels per pixel with `image-rendering: pixelated`. The script picks those from the window (2 to 4; the lane may use 1, 1.5 or 2 on phones). The chart's scale is also capped by the window's height (`floor((innerHeight - 154) / 140)`), so the whole backglass, its pick and its ghost fit one screen: 4 at 1440 by 900, 3 at 1366 by 650 and 1280 by 600. Free scaling blurs every edge.
- **The first screen budget.** At 1366 by 650 and 1280 by 600 the display (66px), the table (456px at scale 3) and the one-line hint must fit under `--top-pad`. `table.fit()` subtracts 88px plus the padding; if you add anything above the table, subtract it there too.
- **Hues keep their jobs.** `--score` only on score displays; `--coil`, `--switch`, `--rubber` only in the chart and its legend, and only on a well; the five bumper hues only for bumper or chapter n; `--start` only for the primary action, focus and the ball's highlight; `--fault` only for form errors. Text is `--white` or `--blush`, and `--blush` never sits on `--plate` (3.29:1).
- **Stepped corners live on inner spans** (`.nt` on `.sock`, `.face`, `.inner`), never on the `a` or `button`, so the 2px yellow focus outline is never clipped. The start button's lamp ring and bat and the rollover's wire and lamp are inside the button, so the outline wraps them too.
- **The path and its thresholds.** The lane's path is built once from lines and arcs, one point per pixel of travel; `K` (0.10, 0.28, 0.46, 0.64, 0.82) is the scroll progress at which each target drops and the same numbers place the ball on each target through `MAP`. Change them together or the ball and the cards drift apart.
- **Sleeping loops.** The table's ticker runs only while the top is on screen and someone has moved, clicked, tapped or typed in the last 20 s; after that the ball is parked on the plunger at its next drain (or lifted off after 29 s) and the ticker is removed. The wordmark's ticker exists only while a lamp is lit. The lane and the chart have no loop at all. There is no CSS loop on the page.
- **Hidden states exist only under `html.js:not(.go)`** and are undone under reduced motion. With the CDN blocked the `js` class is never added: the table shows a composed still that lights the next bumper on each press, the lane shows the ball home with every target down, the wordmark is lit, and the form, dialog, chart, spinner and bonus lamps all work.
- **Press holds.** Every `.btn` keeps `.is-down` for at least `--d-press` (0.16 s) from `pointerdown`, and the in-page link waits that long before the page moves, so a tap still shows the face sink and the bat kick.

## Motion

House rule: hard cuts on a clock. Nothing eases. GSAP is used for timing (`timeline().set()` and `.call()` at fixed times, `steps(6)` for the reels), ScrollTrigger for the scene's progress and the wordmark's first view, and Lenis for wheel smoothing on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling). The load sequence waits for `document.fonts.load('16px "Departure Mono"')` raced with 1.5 s, and for a visible page. Only transform, opacity, visibility, clip and canvas pixels change over time; colours switch in one cut. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer, pinnable window) and its cleanup removes listeners, tickers, delayed calls, ScrollTriggers and Lenis, and restores the stills.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| The playfield | Canvas simulation: circle against circles and segments, three sub-steps per frame, three-position flippers that throw a ball caught in their sweep | Runs while the top is on screen and there was input in the last 20 s | 30 fps fixed; gravity 0.085 px per frame squared; a bumper stays lit 0.3 s (`--d-lamp`); the ball is re-served 14 frames after a drain | A still: the ball beside bumper 2, lit, its figure on the display. Each press lights the next bumper and shows its figure |
| Leaning the table (pointer) | The lean is `floor(clientX / innerWidth x 5) - 2`, five steps, added to gravity as 0.02 px per frame squared per step; a five-pip tilt bob shows it | `pointermove` over the top (fine pointers) | Instant | Off |
| Leaning (touch, keyboard) | Touch: the left, middle or right third of the table. Keyboard: Left and Right arrows with the table focused, Up or Down to level | `touchstart`, `keydown` | Instant | Off |
| Flippers | Both bats step rest, level, up, hold five frames, and back | Click, tap, Space or Enter on the table | 2 frames up, 5 held, 2 down | The press lights the next bumper instead |
| Lamp test | `table.test()` lights bumpers 1 to 5 one at a time, then all five twice; the display cuts from blank to her name on the first all-on | Load (font ready, page visible), from 0.15 s | 0.12 s each (`--d-test`), then on 0.2 s, off 0.15 s, on 0.2 s (`--d-test-all`) | None: the still |
| Headline, score reels | Each wrapped line sits in a one-line window (`overflow: clip`) and steps down from two lines above, `yPercent` -200 to 0 with `steps(6)`; lines one after another | Load, from 0.3 s | 6 steps of 0.07 s (`--d-reel`) per line | Visible |
| Copy cuts in | `visibility` set on the name line, lede, buttons and hint, one after another | After the last reel | 0.08 s apart (`--d-cut`) | Visible |
| First ball | The ball is served from the plunger | 0.1 s after the last cut | Launch at 5.15 to 5.55 px per frame | None |
| The story so far | CSS `position: sticky` frame, 100svh, for 3.2 window heights (`--pin-len`); one ScrollTrigger maps progress to a point on the path (2px steps) and redraws the lane | Scroll, when the window is at least 1024 by 560 or, narrower, 610 tall | Scrubbed; reversible | Not pinned: the ball is home, every target is down, all five cards are listed |
| Drop targets | A target the ball has just passed shows its half-down frame, then its empty slot; its card and index lamp cut in. Scrolling back stands it up again | Progress crossing 0.10, 0.28, 0.46, 0.64, 0.82 | Half-down for 0.07 s (`--d-drop`) | All down |
| Bonus lamps | Class toggles from a `scroll` listener: lamps lit = parts whose top is above 60% of the window; the plate shows `floor(scrollY / max x 3) + 1` | Scroll, resize | Instant | The same |
| Chart pick | Canvas redraw: the pick's marker, a hollow outline round the last pick's column and its level as a dotted line; the five digits change in one cut | Click or tap on a column or year button; Left, Right, Home, End on the years | Instant | The same |
| Spinner | A GSAP timeline of `set()` calls: each flip is four frames (scaleY 0.5, 0.08 with the face changing, 0.5, 1); one mark fills per flip; the fact cuts in at the end | Flick (flips = 3 + speed in px per ms x 6, 3 to 12), tap or Enter (6 flips) | First flip 0.1 s (`--d-flip`), each next one 1.2 times longer (`--flip-slow`) | Instant: the marks fill, the face and the fact change |
| Spinner drag | The plate's scaleY steps 1, 0.8, 0.6, 0.4 with the drag distance (14px per step) | `pointermove` while pressed | Instant | The same |
| Start button, hover | CSS: the lit ring layer's opacity runs off, on, off, on in `steps(1)` and stays on | Hover, `:focus-visible` | 4 x 0.09 s (`--d-blink`) | Lit at once |
| Start button, press | The face moves down 3px onto its skirt; the bat shows its level frame, then its raised frame, held | `pointerdown`, Space or Enter; held at least 0.16 s (`--d-press`) | 0.06 s per bat frame (`--d-kick`) | Face down, bat raised, at once |
| Rollover button, hover | The wire moves 11px down into the face and loses its legs; the lane lamp fills white; the border turns white | Hover, `:focus-visible` | Instant | The same |
| Rollover button, press | The lamp cuts to yellow and the face inverts (white ground, magenta label) | `pointerdown`, Space or Enter; held at least 0.16 s | Instant | The same |
| Text link, the wireform | CSS keyframes on `::after`: a 4px ball crosses the wire in whole 4px steps (`steps(var(--n))`, the script sets `--n` and `--tx` from the link's width), passes the end, drops 4 and 8px and is gone; the wire turns white | Hover, `:focus-visible`; on touch a 0.5 s `.is-tap` class | 0.3 s roll (`--d-roll`) plus 0.08 s fall (`--d-fall`) | The wire turns white; no ball |
| Text field, credits | The two-digit display is rewritten on every `input` (00 to 99, or two dashes when invalid); the coin-slot lamp fills yellow on `:focus-within` | Typing, focus | Instant | The same |
| Rotary selector | The pointer (a stepped wedge) is shown on the checked position, which becomes a well | `change` | Instant | The same |
| Rocker switch | The pressed half swaps and the lamp fills | `change` | Instant | The same |
| Dialog, drop targets | Five plates start at `yPercent` 100; each goes to 50, then 0, left to right; the copy cuts in (opacity 0 to 1 in one set) on the full bank. Closing runs right to left and then closes the dialog | Open buttons; Close, Escape, backdrop | 0.05 s per step (`--d-plate`), 0.55 s in all | Instant |
| Success, the match | The two digits cut through three other values and stop on the reference's last two; the knocker block jumps 22px and lands; the reply cuts in | Valid submit | 0.16 s per value (`--d-match`), knocker up 0.1 s (`--d-knock`) | Final number and reply at once |
| Wordmark, pointer | Canvas: lamps of the name within three cells of the pointer are set to lit in their column's chapter hue; every third 35 ms step they go one step out (solid, ring, outline, hollow) | `pointermove` (fine), `touchstart` and `touchmove` (drag) | 35 ms steps (`--d-sweep`), one step out per 105 ms | The name is lit and still |
| Wordmark, attract | One diagonal of lamps is lit per step, left to right, and goes out behind itself | First view (top at 80% of the window), and the "Attract mode" button | 49 steps of 35 ms | The button switches all the lamps on or off |

## Lineage

| Effect | Descends from | What changed |
|---|---|---|
| Pointer engine, the playfield | Capsule pile settling (`testimonials-capsule-club`); road steered by the pointer (`hero-racing-arcade`); radar blips that light when crossed (`contact-hackerspace`) | A simulation with one ball: gravity, bounces, kicking bumpers and flippers. The pointer does not steer or light anything; it leans the table, and lamps light only when the ball hits them |
| Headline, score reels | Key roll (`features-cyberdeck-kit`); headline lines landing like slabs (`portfolio-isometric-artist`) | Whole lines roll down through a one-line window in six thirds of a line, from two lines above, one line after another. No letter or key moves alone and nothing lands from below |
| Load, lamp test | LED self-test (`features-cyberdeck-kit`); blocks read in order (`crud-memory-card`) | The test runs on the playfield's own five bumpers, one by one and then all together twice, and ends by serving a ball |
| Pinned scene, one long shot | Scroll plays a side-scrolling run with gantries (`story-speedrun-marathon`, `hero-racing-arcade`); block assembly (`features-cyberdeck-kit`) | Top-down, on a fixed path with an arch, a loop and a ramp. Nothing is assembled: targets drop as the ball passes and stand up again when scroll reverses |
| Scroll marker, bonus lamps | Block gauge that docks (`crud-memory-card`); you-are-here strip (`nav-game-museum`) | Lamps that accumulate, one per part reached, with a plate that counts thirds of the page. Nothing docks and no marker travels |
| Chart, lamp columns | Stacked stepped bars (`portfolio-disk-archivist`); damage-ghost health bars (`team-fighting-game`) | One lamp per machine, two to a row; the total is on a five-digit display that changes in one cut; the ghost is the last pick, not lost health |
| Toy, the spinner | Crank with four detents (`testimonials-capsule-club`); tally marks (`crud-cartridge-stall`) | A free spin with no detents: 3 to 12 flips set by the flick's speed, each slower than the last, one slot filled per flip |
| Text link, the wireform | Read head that travels and parks (`portfolio-disk-archivist`); specks flying off (`footer-cartridge-publisher`) | One ball rolls the whole wire in 4px steps, passes its end and falls. It never parks and nothing flies off |
| Start button | The double ring (`faq-hint-hotline`); LED chase (`features-cyberdeck-kit`) | A lamp ring that blinks twice and stays lit, a face that sinks onto its skirt and a flipper bat beside the button that kicks up for the press |
| Rollover button | Hook switches (`faq-hint-hotline`); return flap (`testimonials-capsule-club`) | One wire across the top edge that is pressed flat on hover, with a lane lamp above it that cuts to yellow on press |
| Text field, credits | Checksum pips (`portfolio-disk-archivist`); write-protect tab (`crud-memory-card`) | A two-digit count of what has been typed, and a coin-slot lamp for focus. Nothing is computed from the text and nothing slides |
| Choice controls | Slide switch and DIP switch (`features-cyberdeck-kit`); channel buttons | A rail with four detents and a pointer that jumps; a rocker with a lamp |
| Dialog, drop targets | Four channel strips (`portfolio-chiptune-composer`); ribbon unfold (`features-cyberdeck-kit`) | Five plates that rise from the bottom edge in two steps each, left to right, and drop in reverse; the copy waits for the full bank |
| Success, the match | Parity pip settling (`portfolio-disk-archivist`); handshake (`portfolio-security-researcher`) | A two-digit number that cuts through three values and stops on the reference's last digits, and a knocker that jumps once |
| Wordmark, MARISOL in lamps | Dust wordmark blown by the pointer (`footer-cartridge-publisher`); lamps coming on in zones (`crud-cartridge-stall`) | A fixed lamp matrix: nothing is displaced. Lamps near the pointer light in their column's chapter hue and go out in three steps; one diagonal sweep is the attract mode |

## Adapting

1. **Find the machine.** The page only works if the person's trade has an object the visitor can operate. Keep the table's parts and rename the five bumpers in `FACTS` (a zero-padded figure and one line each), or replace the table with another small simulation that keeps the same contract: `step()`, `render()`, `still()`, `fit()`, `onHit`, `onDrain`.
2. **Map the colours, keeping the jobs.** Change `--ground`, then derive `--well` (darker), `--pit` (darker still) and `--plate` (lighter) from the same hue. Recheck `--white` and `--blush` against all three. Keep one hue for the primary action and focus, five for the chapters, three for the chart's categories, one for displays and one for errors, and recompute every ratio in the `:root` comments. Any hue under 3:1 on the ground must only be drawn on a well.
3. **Replace the copy.** The headline is three lines at 66px in a 772px column (about 18 characters a line); the lede is four lines. Now takes three `dt`/`dd` pairs. The story takes exactly five chapters of about 140 characters (five targets, five hues, five thresholds in `K`). Things I use takes an even number of rows. The spinner takes any number of facts in `SPIN`.
4. **Replace the data.** Edit `DATA.years` (rows of year and three counts), `DATA.kinds` (three names; their keys are colour tokens) and `DATA.unit`. The chart sizes itself from the largest total, two lamps to a row. Edit `CONTACT`. The match number comes from a hash of the name and email, so it needs nothing.
5. **Replace the name.** `WORD` in the wordmark module, with a 5 by 7 glyph for each letter in `GLYPH`. The matrix is `letters x 6 - 1` columns wide plus a one-cell margin, and the cell is the content width divided by that, so a long name gets small lamps; above nine letters, stack two rows.
6. **Retime or remove.** Every duration is a `--d-*` token read by CSS or by the script. To remove the pin, delete the `pinnable` branch and the `.pin` rules: the static list is already complete. To remove the simulation's idle parking, raise `--idle`. To drop the load sequence, add `go` to the root at once and call `begin()`.
7. **In a framework,** render the markup statically, run the plain-JS half of the script once on mount, and return the `gsap.matchMedia` cleanup from the effect.

| Token | Role |
|---|---|
| `--ground`, `--well`, `--pit`, `--plate` | The magenta ground and its three tones: page, recessed surfaces, the inside of a well, raised plates |
| `--white`, `--blush` | Text, wires and bats (6.82:1 on ground, 10.84:1 on well); secondary text, outlines and hollow lamps (4.69:1, 7.45:1) |
| `--scrim` | The well at 90% over the page, behind the dialog |
| `--start` | Yellow: the primary action, focus rings and focus lamps, the ball's highlight (5.64:1 on ground) |
| `--bumper-a` ... `--bumper-e` | Cyan, lime, orange, violet, mint: bumper n and chapter n, in the table, the lane, the index, the cards and the wordmark |
| `--coil`, `--switch`, `--rubber` | Red, sky, peach: the three fault kinds in the chart and its legend, on the well only |
| `--score` | Amber: every character on a score display (6.35:1 on well) |
| `--fault` | Coral: form errors (4.62:1 on ground) |
| `--font` | Departure Mono, then the system monospace |
| `--t-small` ... `--t-display`, `--t-plate` | Type scale on the 11px grid: 13.75 (labels, captions, table heads, hints only), 16.5 (every running paragraph and every figure in the table), 22, 33 (section headings), 44/55/66 (by breakpoint), 88/110 (the spinner's initial, by breakpoint) |
| `--lh-small` ... `--lh-display` | Line heights in multiples of 5.5px: 22, 27.5, 33, 38.5, display plus 11 |
| `--cell`, `--s1` ... `--s8` | The 11px cell and the spacing scale, 5.5 to 132 |
| `--notch`, `--tap`, `--hit` | Stepped corner (4px), button and field height (48px), minimum target (44px) |
| `--gutter`, `--max-w`, `--top-pad`, `--bar` | Side gutter (16, 22, 88 by breakpoint), content width (1320px), top padding (33 to 66px with the window's height), the bonus row on phones (33px) |
| `--S`, `--LS`, `--CS` | CSS pixels per canvas pixel for the table, the story lane and the chart; set by the script |
| `--pin-len` | Scroll length of the pinned story, in window heights (3.2) |
| `--d-lamp`, `--d-test`, `--d-test-all`, `--d-reel`, `--d-cut` | The table's lit time and the load sequence |
| `--d-blink`, `--d-press`, `--d-kick` | The start button's ring, the minimum press hold, one frame of the bat |
| `--d-roll`, `--d-fall` | The ball on a link's wire, and off its end |
| `--d-drop`, `--d-plate` | A drop target's half-down frame; one step of a dialog plate |
| `--d-flip`, `--flip-slow` | The spinner's first flip and how much longer each next one is |
| `--d-match`, `--d-knock` | One value of the match number; the knocker in the air |
| `--d-sweep` | One step of the wordmark's clock (attract sweep and, every third step, the decay) |
| `--idle` | Seconds without input before the ball is parked and the table sleeps |
