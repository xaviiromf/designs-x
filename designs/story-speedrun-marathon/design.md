---
title: Speedrun marathon scroll story
section: story
subject: Softlock Week, a seven-day charity speedrun marathon in Gothenburg that raises money for the city's children's hospital fund, told through one run (Lanternfall any% by mossgiant, estimate 11:40, four splits) and ending in a submission form for 2027 and Saturday's schedule.
aesthetic: Retro platformer broadcast. A plum night ground, a low-resolution side-scrolling stage scaled up in hard pixels, a split timer beside it, brick-tile buttons and gems, with six hues that each mean one thing on the timer or the stage.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so the modules are square. Used at 700 for the H2, the main timer, the calls over the stage, the dialog title, the +1 and the A and B on the controller.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything you read, at 400 for body and 600 for buttons, h3, split names and labels, with tabular figures for every time.
js: "Draws an original side-scrolling level on a low-resolution canvas and scrubs one run through it with the scroll position (runner, ghost, splits and timer, in both directions), lights a controller diagram from the visitor's own pointer, touch and keys, and runs the load build-in, the brick buttons, the schedule dialog and the in-page run submission (nothing is sent)."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [story, scroll, speedrun, charity, marathon, game, pixel, canvas, platformer, timer, splits, sticky, form, dialog, dark, gsap, lenis, arcade-series]
use_when:
  - A story that is a sequence with a clock or a measurable position (a run, a race, a route, a launch, a shift), where scroll progress can honestly be the position.
  - Events, communities or products from games culture that need to explain how something works step by step before asking for a sign-up.
  - The page has two asks at the end, one form and one piece of reference information that fits a dialog.
avoid_when:
  - The story has no single line of progress. The stage would have nothing true to scrub.
  - Light, corporate or editorial brands. The plum ground, brick buttons and pixel stage are loud on purpose.
  - Pages that already pin a canvas or a video to scroll. Two scrubbed stages on one page compete.
  - Long chapters. Each chapter is two or three sentences because it is read in the space under a pinned stage.
---

## Why it works

**The one bold idea: scrolling plays the run.** A pinned stage shows an original side-scrolling level at about 432 by 156 level pixels, scaled up three times in hard pixels across the full content width. The scroll position is the runner's position. Scroll down and a small hooded figure with a lantern runs, jumps the gaps, hops the crates and clips through a wall; the split timer beside the stage advances and fills in its four splits; scroll back and all of it rewinds. Nothing on the stage runs on a clock. Every frame is a function of the scroll position, so the visitor is the one playing, at their own speed, in both directions. Everything else on the page is quiet and supports that.

This design belongs to the **arcade series**, which shares Handjet and Host Grotesk with cta-indie-game on purpose, at the owner's request. It differs from cta-indie-game in four ways. The ground is plum, not harbour navy, and the palette has six working hues instead of two accents. The canvas is a game stage with a camera, not a lattice behind the content. The pointer never draws on the page; it is only reported back on a controller diagram. And there is no wordmark, grain, fill-from-entry button or dialog that opens from its button: none of the reference's effects are reused.

- **The story and the stage cannot drift apart.** Each chapter owns a stretch of the level (`CHAPTER_X`). The script measures where each chapter heading crosses a reading line under the stage and maps scroll progress to level position through exactly those points. The same thresholds turn the chapter's gem gold. So "The skip" turns gold as the runner reaches the bell stair, on any screen size.
- **Each chapter is shown, not only told.** The estimate: the timer starts at 0:00.0 beside "Estimate 11:40". The splits: lantern posts mark the splits; passing one cuts its time and delta into the timer and raises a pennant in the split's colour. The skip: a staircase of slabs climbs the wall, with two gems on it that the runner never collects, because the runner jumps into the corner under the ledge and passes through the wall, drawn as a checker dither while inside it. The incentive: from the door on, the runner wears a blindfold and the call reads BLINDFOLD ON. Time: the lantern lights the beacon and the timer stops at 11:31.2 in gold.
- **Colour is the timer's language, and the page uses the same one.** Plum `#27143A` is the ground and a darker `#1B0E2B` is the stage sky and every inset surface. Cream is text and the runner. Mist is secondary text and outlines. Brick orange is the ground you run on and the primary button, which is drawn as one of those bricks. Gold means best-ever: gold splits, gems, the current chapter, the final time, and the focus ring. Green is ahead of pace. Red is behind pace and form errors. Cyan is light: links, lantern light, water, lit inputs. Lilac is only the ghost, the runner's personal best, and its key in the timer. No hue is used as decoration, and meaning never rests on colour alone: deltas carry a sign, the gold split carries a gem and hidden text, a resting gem is hollow and a current one solid.
- **The ghost makes the deltas visible.** The lilac runner is the personal best. It is drawn 6 level pixels ahead or behind for every second of delta, interpolated between splits, so it leads after the red split, falls behind after the gold one, and is 34 pixels back at the beacon.
- **The timer is real text.** Four split names with times and deltas in an ordered list, and a main timer in Handjet whose seven characters sit in fixed cells so the figures never shift while scrubbed. A visually hidden line gives the run time at the last split, and is not announced on every frame.
- **The input display turns pointer movement into a readout, not an effect.** A controller diagram in the timer panel lights the d-pad in the direction the pointer is moving (eight directions), button A on a press or tap, and the same for arrow keys, Space and Enter. It says "Your inputs". It is the way a speedrun broadcast shows the runner's hands, pointed at the visitor.
- **The load teaches the vocabulary.** The level is placed column by column, the runner drops in and squashes, the timer shows 0:00.0, and then the heading and copy cut in hard. Before reading a word the visitor has seen tiles, the runner and the timer.
- **Two asks, in order.** "Submit a run for 2027" is the brick button and jumps to the form; "See Saturday's schedule" is the outlined brick and opens the dialog. Both appear again after the run. The form validates in place with specific messages, and the confirmation lists the run as a schedule row with a gold marker, the runner standing on the row.
- **No dead ends.** The form never submits to a server. "Submit another run" brings it back with the handle and address kept. The dialog closes with Close, Escape or a backdrop click and returns focus to whichever button opened it. The two external links (Twitch, Discord) open in a new tab with `rel="noopener"` and a visually hidden "(opens in a new tab)".
- **Semantics.** A `section` labelled by its `h2` (the host page owns `h1`), five `article` chapters with `h3`, an `ol` of splits, a real `table` in the dialog and in the confirmation. The canvas, the calls over it and the controller are `aria-hidden`: the chapters and the timer carry the story.

**New to the collection** (none of these existed before): a scroll-scrubbed side-scrolling runner with a game camera, a ghost and a split timer; the input display driven by the pointer's direction; the tile build-in load; the brick bump with a gem and "+1"; the press crack; the gem-trail underline; the menu-selector field cursor with an error buzz; the pause-menu dialog with a checker-dither backdrop; the victory hop on success.

Deviations from the brief, and why:

- **The run starts slightly before the stage pins.** The scroll range begins when the first chapter's heading is on the reading line, about 40% of the space under the stage before the pin. Otherwise the first chapter would get a shorter stretch of scrolling than the others.
- **The victory hop also plays on a small runner standing on the confirmation row.** The form sits below the run, so the stage is usually off screen when a run is submitted. The stage runner still hops; the row runner is the one people see.
- **The input display runs without the libraries and under reduced motion.** It is a state, not an animation, so it lives in the plain script. Reduced motion only drops its one dithered decay frame.
- **Viewports under 560px tall are not pinned.** A landscape phone has no room under a pinned stage, so it gets the composed still and normal text, with the button and field effects kept.

## Do not touch

- **The stage is a function of scroll, never of time.** `update(progress)` sets the level position and redraws once. There is no ticker loop, no idle animation, no easing on the runner. Water notches and the run cycle step by camera position and distance. Add a time-based animation and rewinding stops being exact.
- **Whole pixels only.** The canvas is `W x VH` level pixels shown at an integer scale `S` (3 from 1100px of content width, otherwise 2) with `image-rendering: pixelated`, and its CSS size is set to exactly `W * S`. The camera and both background layers are rounded to whole pixels. Do not stretch the canvas with a percentage width once the script has sized it.
- **Thresholds come from the DOM.** `ths` is measured in `onRefresh` from each chapter heading's position against the reading line (`READ`, 40% down the space under the stage), and both the gem and the level mapping use it. Do not replace it with fixed fifths.
- **The route is data.** `PATH` (jump nodes), `GAPS`, `SLABS`, `CRATES`, `POSTS`, `GEMS`, `SPLITS` and `CHAPTER_X` describe one level. If a split's `x` moves, its lantern post in `POSTS` moves with it. Jumps must still clear what they cross: the runner is 12 pixels wide and 16 tall.
- **The level is original.** A hooded figure with a lantern, ruins, lantern posts, gems, crates, water, a beacon. Do not add anything that reads as an existing platformer (question blocks, pipes, flagpoles, mushrooms, coins).
- **Colour jobs.** Gold is best-ever and focus; green and red are pace (red also errors); cyan is light; lilac is the ghost. Do not use them for decoration. The canvas reads every colour from the tokens.
- **Hard cuts.** The current chapter's gem, the splits, the calls, the dialog and the form swap are instant state changes or 2 to 4 frame steps. No fades, no dimming of the other chapters, no eased tweens.
- **The pinned frame.** `.frame` is a sticky layer one viewport high; its upper part (`--top-h`, measured by the script) is opaque and the chapters scroll up behind it. `--ch-k` sets how far apart the chapters are. The last chapter is shorter so it is still in view when the frame releases.
- **Pixel corners live on `.face` and `.inner`,** never on the `a` or `button`, so focus rings are not clipped. The bottom edge is the rim's padding (`--edge`), and a press moves `.inner` 2px into it.
- **Progressive enhancement.** `html.js` exists only when all three libraries loaded; hidden states exist only under `html.js:not(.go)`. Without the libraries the stage shows the composed still, the timer shows the finished run, and the form, the dialog and the input display still work.
- **Accessibility.** Fields use `novalidate` with their own messages, `aria-invalid` and `aria-describedby`; the error line is reserved so nothing shifts; focus moves to the first invalid field, and to the confirmation heading on success. Keys light the controller but their default behaviour is never prevented. The native cursor is never hidden. Targets are at least 44px.

## Motion

House easing: none. Motion is stepped: `steps(n)` or keyframes held with `steps(1)`, one frame is 80ms (`--frame`), moves are whole pixels, and state changes are hard cuts. The only tweens are the linear build counter and the stepped drop at load. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer, viewport height 560, width 960) and the cleanup kills the ScrollTrigger and tweens, removes listeners and injected nodes, destroys Lenis and restores the still. Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, with `lenis.on('scroll', ScrollTrigger.update)`, and is stopped while the dialog is open. The opening waits for the fonts (`document.fonts.ready` plus a Handjet load, 1.5s timeout) and a visible tab. Only transform, opacity, clip-path, visibility and canvas pixels change. The stage redraws only when the scroll position changes and skips drawing while off screen (IntersectionObserver).

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Tile build-in | Canvas: tile columns placed left to right; the newest column is drawn one tile above its place and lands when the next appears | Load (fonts ready, tab visible, stage on screen) | 0.7s linear counter over the visible columns (about 28 on desktop) | Level already built |
| Runner drops in | Canvas: the sprite falls 64 level pixels in 4 steps, then a 2-frame squash (squashed, wide stance, standing) | After the build | 4 frames + 2 frames at 80ms | Runner in the still |
| Timer, heading and copy cut in | `visibility` switched, no opacity | After the landing | Timer panel, then h2, lede, buttons, chapters, one frame apart | Visible from the start |
| Scroll plays the run (signature) | ScrollTrigger progress mapped through the chapter thresholds to a level x; canvas redraw with a three-layer game camera in whole pixels (hills 0.2, ruins 0.5, tiles 1), runner at 30% of the width, 4-frame run cycle stepped every 7 level pixels, scripted jump arcs, the ledge clip drawn as a checker dither, lantern posts lit and gems collected by position | Scroll, from the first heading on the reading line to the frame's release; touch scrolls natively, keyboard scrolling works the same | Scrubbed, both directions | No pin; one composed still (runner mid-jump at the ledge), native scroll |
| Ghost | Canvas: the lilac dithered runner drawn at 6 level pixels per second of delta, on the same route | Same scroll | Scrubbed | Shown in the still |
| Main timer | Text in seven fixed cells, piecewise-linear time between split posts, 0:00.0 to 11:31.2; coloured by pace after each split, gold at the end | Same scroll | Scrubbed, both directions | 11:31.2 |
| Split cuts in | The row's delta and time are set, then the row blinks (off, on, off, on with `steps(1)`) | Runner passes a split post scrolling forward; scrolling back blanks it instantly | 0.32s | All four final values |
| Calls over the stage | Text swapped (READY, GO, GOLD SPLIT, CLIP: 38 S SAVED, BLINDFOLD ON, TIME 11:31.2) | Level position | Hard cut | None shown |
| Current chapter | Hollow gem becomes a solid gold gem | Heading crosses the reading line | Hard cut, no dimming of the others | All gems resting |
| Input display | D-pad arm lit for the pointer's movement direction quantised to 8 (two arms on a diagonal); button A on a press. Releases through one checker-dither frame | Pointer movement and press anywhere in the section. Touch: swipe direction and tap. Keyboard: arrow keys, Space (A) and Enter (B), never prevented | Held 120ms after the last movement, then one 80ms decay frame | Still lights; no decay frame |
| Brick bump | The brick hops 4px up, 2px, then settles (`steps(1)` keyframes); a gem and "+1" pop from its top edge and rise 8px per step, then cut out; the face lightens | Hover (fine pointers), once per hover. Keyboard: focus-visible. Touch: pointerdown | Hop 0.16s; gem 0.4s in 4 steps | Colour change only |
| Brick press | The face drops 2px into its bottom edge; a pixel crack appears in 2 frames (short, then long) | pointerdown, Space or Enter held; release restores | 0.16s | Face drops, no crack |
| Gem-trail underline | A row of 3px squares in mist; a gold row over it is uncovered one square per step (`steps(n)`, n counted per link), and covered again right to left | Hover, focus-visible, `:active` on touch | 0.3s each way | Instant |
| Field focus | A stepped selector triangle appears before the label and blinks in 2 frames; the border turns gold | Focus (pointer, touch or keyboard) | 0.56s loop, only while focused | Triangle shown, no blink |
| Field error | Border and triangle turn red, the triangle buzzes 4px left, 4px right, back; a specific message fills the reserved line | Invalid submit; clears as soon as the value is valid | 0.16s | Instant, no buzz |
| Schedule dialog (pause menu) | Backdrop is a 50% checker of the ground colour, cut in; the panel scales 0.96, 0.98, 1 in steps. Lenis stopped; closes with a hard cut and returns focus | Either "See Saturday's schedule" button; Close, Escape or backdrop | 0.16s | Instant |
| Success | The form is replaced by "Run submitted" and a schedule row with a gold marker; the runner does a 3-frame victory hop (crouch, up 8 with the lantern raised, up 4) on the stage and on the row | Valid submit | Hard cut, then 3 frames | Instant; the row runner stands with the lantern raised |
| Back to the form | Swap | "Submit another run" | Hard cut; handle and address kept, focus in Game | Same |

## Adapting

1. **Find your line of progress.** The stage only works if scroll can be a real position: a run, a route, a build pipeline, a tasting flight. Decide what moves, what the fixed checkpoints are (here: four splits) and what is being compared (here: the personal best). If there is no comparison, delete the ghost (`GHOST_PX` and its `drawImage`).
2. **Rewrite the level as data.** Chapters own stretches of the level through `CHAPTER_X`. Checkpoints are `SPLITS` (x, time, delta, colour key) and need a matching entry in `POSTS`. The route is `PATH`: `[x, height, arc]` nodes, where arc 0 is a run and a number is the height of the jump to the next node. Keep each chapter's stretch between 300 and 470 level pixels so the runner's speed stays even. The still frame is `STILL_X`.
3. **Redraw the sprite.** `BODY` and `LEGS` are rows of characters (c cloak, d shade, k face, e eye), 12 wide. Four leg frames make the run cycle, `j` is the jump, `q` the squash. Tiles are drawn once in `load()`. Stay original: no shapes borrowed from an existing game.
4. **Map the colours onto the tokens, keeping their jobs.** Change the hues, not the meanings. Check every text colour against `--plum` and `--sky` (the ratios are in the token comments) and the button ink against `--brick` and `--brick-lite`.
5. **Copy.** The H2 is two short lines. Each chapter is an h3 of one to three words and two or three sentences (about 250 characters): it must fit under the stage. Calls over the stage are short uppercase in-game text. The timer panel takes four to six rows; with more, reduce `--t-clock`.
6. **Retime or remove motion.** `--frame` is the frame length and every `--d-*` token is a whole number of frames. `--ch-k` is the scroll length per chapter (1.2 on desktop, 0.85 below 960px). `READ` in the script is the reading line. To remove the load build-in, delete the timeline and add `go` at once. To remove the input display, delete `.inputs` and its block in the script. To remove the pin, never add the `pin` class: the page then reads like the reduced-motion version.
7. **The form.** Rules are one function per field in `RULES`, each returning a specific message or an empty string. The confirmation's cells are filled from the same values.
8. **In a framework,** render the markup statically, run the plain part of the script once on mount, and port the motion layer as one effect that returns the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--plum` | Page ground; ink on brick buttons (5.9:1 on brick, 8.4:1 on the hovered brick); the checker backdrop |
| `--sky` | Stage sky, timer panel, fields, dialog panel, controller cells |
| `--hill`, `--ruin` | Far hills and mid ruins on the stage; `--ruin` also crates, table rules and the outline button's hover fill (decorative) |
| `--cream` | Text (15.2:1 on plum, 16.6:1 on sky), the runner |
| `--mist` | Secondary text, outlines, resting gems and underline squares, waiting splits (9.2:1, 10.0:1 on sky) |
| `--brick`, `--brick-dark`, `--brick-lite` | Ground tiles and the primary button: face, lower course and bottom edge, cap row and hover |
| `--gold` | Best-ever: gold splits, gems, current chapter, final time; the focus ring and the field selector (11.8:1) |
| `--green` | Ahead of pace (10.0:1) |
| `--red` | Behind pace, form errors (5.7:1, 6.2:1 on sky) |
| `--cyan` | Light: links, lantern light, water surface, lit inputs (10.1:1) |
| `--water` | Water body under the gaps (decorative) |
| `--lilac` | The ghost and its key in the timer, nothing else |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2`, `--t-clock`, `--t-call` | Type scale: 14, 17, 21, 28, clamp(52px, 7vw, 104px); the timer at 72px; calls at clamp(22px, 2.6vw, 38px). Smaller under 600px |
| `--cell`, `--s1` ... `--s8` | The 8px cell and the spacing steps built from it (4 to 96) |
| `--notch`, `--edge`, `--tap` | Pixel-corner step (4px), a brick's bottom edge (4px), button and field height (48px) |
| `--max-w`, `--gutter` | Content width (1296px) and side padding |
| `--frame` | One frame, 80ms; the script reads it for the load and the hop |
| `--d-build`, `--d-bump`, `--d-pop`, `--d-crack`, `--d-trail`, `--d-sel`, `--d-buzz`, `--d-blink`, `--d-dlg` | Durations of the build-in, brick bump, gem pop, press crack, underline, selector blink, error buzz, split blink and dialog |
| `--d-hold`, `--d-decay` | Input display: hold after the last movement (120ms) and the decay frame (80ms) |
| `--ch-k` | Scroll length of one chapter while pinned, as a multiple of the space under the stage |
| `--top-h` | Set by the script: the height of the pinned frame's opaque part |
