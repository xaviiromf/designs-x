---
title: "VJ and live-visuals artist: about me"
section: about
subject: "Nia Adeyemi-Koch, a fictional VJ born in Lagos and based in Leipzig, who plays generative pixel visuals at club nights and festivals from two laptops, a video mixer and a pad bank. The page is her whole personal front end: who she is, what she plays this season, how she got here, her nights by year, her pad bank, her kit, a booking form with a rider, and a wordmark visitors paint."
aesthetic: "A vivid ultramarine wall, the colour of a projector beam on an empty club wall, with ten saturated layer hues from her rig. Everything is set in one pixel monospace on an 11px grid: stepped rectangles, LED cells, step grids, 1-bit patterns, hard cuts."
mode: dark
fonts:
  - "Departure Mono (pinned npm package @proj-airi/font-departure-mono@0.17.0 on jsDelivr, SIL Open Font License). The only family, Regular only: the 44, 55 or 66px headline, the 33px part headings, 22px ledes and h4s, 16.5px body, 13.75px labels, 11px decorative marks. Emphasis comes from colour, inversion, size and position, never weight."
js: "Runs a low-resolution feedback tunnel aimed by the pointer, a test-card load and a registration headline, a pinned 16-step set list scrubbed by scroll, a page-wide crossfader, an LED meter with a peak-hold cap, a 16-pad bank that layers dithered 1-bit patterns, a paintable NIA wordmark, a validated booking form with an encore, and a rider dialog that switches on as a video wall."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [about, portfolio, vj, live-visuals, club, festival, canvas, pixel, sequencer, chart, toy, form, dialog, pinned, vivid, departure-mono, gsap, lenis]
use_when:
  - "A personal page for a performer or maker whose work is a live, layered signal: VJs, lighting designers, live coders, synth players."
  - "The person needs both a showreel feeling and plain booking logistics (a rider, a date, a kind of event) on one page."
  - "You want an anthology of interaction in one coherent visual language, with every hue tied to a real layer of the person's work."
avoid_when:
  - "Quiet, editorial or text-heavy profiles: ten vivid hues and a pixel face are loud by design."
  - "People who would be harmed by motion-heavy pages in front of their audience, or brands that cannot carry a saturated ground."
  - "Pages that already have another pointer canvas or pinned scene nearby; two signatures fight."
---

## Why it works

**The one bold idea: the page is her rig.** A VJ's set is layers: a trigger, four drum layers that drive the patterns, kinds of night, and whatever is live on the wall right now. The page is built from exactly those layers. Each of the ten hues is one layer and appears only on that layer's things, and the places where all ten mix (the tunnel, the test card, its legend and the wordmark) are the programme output, the picture the room sees.

- **The signature is a tunnel you aim.** The top canvas is video feedback reduced to its geometry: nested stepped rectangles between the frame and a vanishing point, each ring the next layer hue. The vanishing point follows the pointer in whole canvas pixels (3 px per frame, at 20 fps), pointer speed adds rings (one per 110 css px travelled, up to 16) and pushes them outward like feedback, and stillness thins them back to five, one every 90 ms, after which the loop sleeps. On desktop the top part starts at a normal 44px top padding and the screen is as tall as `min(80cqw, 100svh - 190px)`, so the tunnel fills the first screen beside the copy. It is not a road, not a starfield and not a colour cycle: the colours ride on the rings, and the only thing that moves is the geometry you aimed.
- **Ten hues, ten jobs.** Strobe yellow is the trigger: the primary action and focus rings, nothing else. Kick, snare, hat and bass are chapters 1 to 4 of the story and rows A to D of the pad bank, because those are the drum layers her patterns answer to. Lead violet is chapter 5. Club red, festival mint and installation peach are the three kinds of night, used in the chart, in the channel buttons of the form and in the visitor's initials. Live magenta is what is live now: the Now markers, the on-stage lamp and the clip that grows under a text field as you type. Fault red-orange is errors only. Text is one light neutral (`--white`), with `--haze` for secondary text; large areas stay on the ground and its well and plate tones, so ten hues never become confetti.
- **Running text is always body size.** Every paragraph (intros, chapter cards, kit descriptions, hints, the colophon) is 16.5px; 13.75px is kept for labels, captions, table cells, the legend and error lines. Part headings are 33px (22px on phones, where 33px would overflow a 360px screen).
- **The grid is the type.** Departure Mono is drawn on an 11px grid, so every size is a multiple of 11 (or 13.75 for small text), every line height a multiple of 5.5, and the spacing scale sits on an 11px cell. Columns are measured in `ch`: the field clip is exactly as wide as the typed text, the Now list and the kit list align in character columns, and the chart's year labels drop to two digits on phones rather than shrink.
- **Eight parts, each with one job.** Top (claim, two asks, the tunnel), Now (three lines in a `dl`), the set list (pinned), By the numbers (the meter), the pad bank (the toy), Things I use (six rows with text links), Say hello (contact from `CONTACT`, the booking form, the rider), and the sign-off wordmark. A crossfader at the right edge (a top strip under 1024 px) shows where you are in all of it.
- **Different from its nearest neighbours.** `hero-racing-arcade` also steers a raster with the pointer, but its road recedes to a horizon; this is a closed tunnel of rectangles with a free 2D aim. `portfolio-chiptune-composer` has a playhead over a pattern, but it is a row playhead running down a tracker at tempo; here a column playhead walks a 16-step grid only under scroll, and chapter cards cut in beside a grid that never moves. `faq-handheld-clinic` dithers everything into view; here dithering is used only inside the pad screen, as the transition between two patterns. `cta-indie-game` lights cells under the pointer that decay; the NIA wall keeps every colour it is given.
- **Flows are honest.** The form validates in place with specific messages, moves focus to the first bad field, echoes every value back in the confirmation and keeps the values for "Change this". Nothing is sent, and the confirmation says so. The rider dialog is a native `showModal()` with Close, Escape and backdrop, and focus returns to whichever of the three openers asked for it.
- **Semantics.** The whole page is one `section` labelled by the `h2` claim; each part is a `section` with its own `h3`; the dialog title is an `h2`. The tunnel is a focusable group described by a text readout of its aim and ring count, the meter is a `role="slider"` with `aria-valuetext` and a table disclosure, the pads are `aria-pressed` buttons with `aria-keyshortcuts` and a readout of what is on screen, and the switch is a checkbox with `role="switch"`.

Deviations from the brief, and why:

- **The encore waits for the pad bank to be seen.** The form sits two parts below the pad bank, so a chase played at submit time would always happen off screen. The confirmation says the pad bank plays the encore and links to it; the chase and the initials play the first time the bank is at least 35% in view after a successful submit (at once if it already is).
- **The pinned set list needs room.** It pins only where there is space for grid and card together (at least 1024x520, or 620 px tall under 1024 px wide). On shorter windows, with reduced motion and without the libraries, the grid shows every lane and the five chapters are listed in full.
- **The headline is three short lines** ("Light / you can / dance to.") so it never wraps differently at 360, 1280 or 1600 px and the registration copies always sit on whole lines; "played live" moved into the lede.

## Do not touch

- **One hue, one layer.** Do not use a chapter hue for anything outside its lane, card and pad row, or a kind-of-night hue outside the chart, the channel button and the initials. Strobe is only the primary action and focus; if you add a third button kind, give it a neutral.
- **The 11px grid.** Display sizes are 44, 55 or 66 px by breakpoint, never a free clamp. The field clip relies on the input and the clip sharing one font size, so `1ch` is the same in both; change one and the clip no longer matches the text.
- **Stepped corners live on inner spans** (`.face`, `.inner`), never on the `<a>` or `<button>`, so focus outlines are never clipped. The channel buttons and switch carry their focus outline on the label (`:has(input:focus-visible)`) for the same reason.
- **Whole-pixel canvases.** The tunnel picks an integer scale (3, 4 or 5) and sizes its canvas to `floor(box / scale)`; the pad screen is 48x48 shown at 5x (4x on phones); the meter and wordmark draw in whole css pixels times the device ratio. Do not let any of them stretch to a fractional scale.
- **Loops sleep.** The tunnel is the only ticker loop, it runs on `gsap.ticker` at 20 fps only while rings move or the aim is still walking, and an IntersectionObserver stops it off screen. Every other motion is a short chain of timers that ends.
- **Hidden states exist only under `html.js:not(.go)`** (the claim, the tunnel canvas, the legend) and are undone for reduced motion. With the CDN blocked, the `js` class is never added and every part, flow, chart, toy and the wordmark still work in plain JavaScript; the tunnel snaps to the aim instead of animating.
- **The sequencer cell is the stage.** `--sc` sets the step cells at 44, 33 or 22 px by breakpoint so the pinned grid fills the screen beside its card and still fits at 1366x650; the playhead width is computed from the same tracks, so change `--sc` and `--gap` together.
- **The pin is CSS sticky**, not a ScrollTrigger pin: `.pin .story-track` is 100svh plus 360svh and the stage sticks under the phone strip. ScrollTrigger only reads progress, so Lenis and native touch scroll behave the same.

## Motion

House stepping: every visible change is a hard cut or a `steps()` sequence at a counted frame (`--d-frame` 60 ms). No eased tween moves anything larger than a few pixels. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`, anchors offset by the phone strip); touch keeps native scrolling. The load waits for `document.fonts.load('16px "Departure Mono"')` raced with 1.5 s, and for a visible page. `gsap.matchMedia` conditions: motion, reduce, and room for the pin. Cleanup kills the trigger, removes the ticker functions, disconnects the observer and destroys Lenis.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Test card | Ten full-height bars in the layer hues cut in left to right inside the tunnel frame, then in one frame become the ten-swatch legend and the tunnel's first frame | Load (fonts ready, page visible, tunnel on screen) | One bar per 60 ms (`--d-bar`), collapse at 660 ms | Legend and tunnel shown |
| Headline registration | Each line appears as three copies (kick, hat, bass) offset vertically 6 px, then 3 px, then one white line | Load, from 660 ms | 70 ms per step (`--d-reg`), lines 90 ms apart (`--d-reg-gap`); ends at 980 ms | White lines |
| Feedback tunnel | Canvas rings between frame and vanishing point; aim walks 3 px per frame; speed adds rings (1 per 110 px, max 16) and outward zoom (decays x0.8 per frame); still for 160 ms (`--d-still`) thins one ring per 90 ms (`--d-thin`) to five, then sleeps | Mouse or pen move; touch: drag (`touch-action: none` on the screen); keyboard: focus the tunnel, arrows move the aim 8 canvas px and add rings | 20 fps (`--d-tunnel` 50 ms) on the shared ticker; off screen it sleeps | Aim snaps, five rings, no loop |
| Crossfader | A fader cap in eleven detents over the whole page; lamp A shows the part at the reading line (a third down), lamp B the next part (dark at the end) | Scroll (rAF-throttled) | Hard jumps, no tween | Same (it is an indicator) |
| Set list | Pinned 16-step grid of square cells on the 11px grid (44 px from 1400x760, 33 px from 1200 wide or on shorter screens, 22 px from 1024, fluid below), the chapter card beside it on desktop and under it on phones; a column playhead moves in whole steps; lit steps under it fire (white core); the chapter card whose block the playhead enters cuts in with `clip-path` steps(4) | Scroll, 360svh while pinned | Card cut-in 160 ms (`--d-card`) | Not pinned; all lanes and all cards listed |
| LED meter cap | Columns span the content width as a matrix of 6x6 px LED cells on an 8 px pitch; the peak-hold cap (a white row of cells) jumps two cells and falls one cell per 90 ms | Pointer over a new year; tap; arrows, Home, End when focused | 2 x 90 ms (`--d-cap`) | Readout and selection change, cap stays on the column |
| Pad layering | The new 1-bit pattern replaces the old through four 4x4 ordered-dither thresholds; a second row layers its hue over the first, two layers at most | Pointer or tap on a pad; keys 1234, QWER, ASDF, ZXCV with the bank focused | 4 x 70 ms (`--d-dither`) | Final pattern at once |
| Pad press | Pad face drops 3 px | pointerdown, Enter, Space, the bank keys | Held at least 140 ms (`--d-hold`) | Same |
| Primary button hover (blackout) | Diagonal strobe stripes step across the face (a third, two thirds, full), then a solid strobe face with ink label | Hover; focus-visible; on touch after the tap | 4 x 60 ms, `steps(1, end)` keyframes | Solid face at once |
| Primary button press | The face cuts to the well; only the strobe outline and label stay lit | pointerdown, Enter, Space | Held at least 140 ms | Same |
| Secondary button hover (fader cap) | A cap travels the slot along the bottom edge in three detents | Hover; focus-visible; on touch for 700 ms after the tap (`--d-hot`) | 180 ms `steps(3, end)` | Cap at the end at once |
| Secondary button press | The cap drops 3 px into the slot, the slot lights | pointerdown, Enter, Space | Held at least 140 ms | Same |
| Text link (meter) | The flat underline becomes a row of 4 px bars in five stepped heights, risen from the baseline in two frames (half height, full) | Hover; focus-visible; on touch for 700 ms after the tap | 2 x 60 ms | Bars at full height at once |
| Text field (clip) | A timeline with a tick every 2ch appears under the field; a live clip block exactly as long as the text, with its length at its end; fault colour when invalid | Focus; input | Timeline appears in 3 steps of 60 ms | Instant |
| Channel buttons and switch | Chosen channel solid in its hue, others hollow; switch jumps between Off (dark slot) and On (lit slot) | Click, tap, arrows, Space | Instant | Instant |
| Rider dialog (video wall) | Six tiles switch on in snake order (left to right, then right to left; down the column on phones): one frame of bare plate, then content; off in reverse | Read the rider (three openers); Close, Escape, backdrop | 45 ms per tile (`--d-tile`) | Instant open and close |
| Success (encore) | Diagonal chase across the 16 pads, then the visitor's initials as large pixel letters in the hue of the chosen kind of night | Valid submit, played when the pad bank is in view | 7 diagonals x 80 ms (`--d-chase`) | Initials at once |
| Wordmark painting | Every cell the pointer crosses (path walked cell by cell) advances one hue and stays | Mouse or pen move; touch: drag; keyboard: Repaint | Instant per cell | Same |
| Repaint | The whole word advances one hue, one diagonal at a time | Repaint button | One diagonal per 50 ms (`--d-paint`) | All at once |
| Clear the wall | Hard cut back to unpainted | Clear the wall button | Instant | Instant |

## Lineage

| Effect | Descends from | What changed |
|---|---|---|
| Pointer engine: feedback tunnel | `hero-racing-arcade` road steered by the pointer; `process-convoy-night` vanishing point; `gallery-demoparty` colour cycling | A closed tunnel of stepped rectangles with a free 2D aim instead of a road to a horizon or stars; hue rides on rings that move outward with speed; rest is a fixed five-ring still |
| Headline: registration | `pricing-net-cafe` RGB split; `hero-racing-arcade` speed streak | Three drum-layer copies offset vertically, in three hard steps, once at load; no pointer, no horizontal shift |
| Load: test card | `gallery-demoparty` decrunch stripes; `nav-game-museum` swatches collapsing to markers | Ten bars in the page's own layer hues, only inside the tunnel frame, each appearing once, collapsing in one frame into a legend that stays |
| Pinned scene: the set list | `portfolio-chiptune-composer` tracker playhead and order list; `story-speedrun-marathon` scroll plays a run | Column playhead on a still 16-step grid with one block per chapter; cards cut in beside it; no tempo, no camera |
| Scroll marker: crossfader | `nav-pirate-radio` needle in detents; `nav-game-museum` minimap strip | A mixer fader cap with eleven detents over the whole page, plus two channel lamps for the part above and below |
| Chart: LED meter with peak hold | `portfolio-chiptune-composer` level meters; `portfolio-isometric-artist` stacked floors | Stacked LED columns of 6 px cells by kind; picking lifts only a white peak cap that falls back one cell per 90 ms |
| Toy: the pad bank | `faq-hint-hotline` two-tone keypad; `faq-handheld-clinic` ordered dithering | Pads stay lit and layer two hues of 1-bit patterns; dithering is the replacement between patterns, not a reveal |
| Primary button: blackout | `hero-racing-arcade` checker wipe; face inversions across the ledger | Diagonal strobe stripes stepping across to solid; the press is a blackout to the well with only the outline lit |
| Secondary button: fader cap | `features-cyberdeck-kit` DIP switch; `nav-pirate-radio` tuning eye | A cap on a slot along the bottom edge that travels in three detents and drops 3 px on press |
| Text link: the meter | `hero-racing-arcade` tachometer strip; `portfolio-chiptune-composer` square-wave underline | Five bar heights rising from the baseline in two frames; nothing travels left to right |
| Text field: the clip | `portfolio-isometric-artist` ruler with marker; `contact-privacy-helpdesk` ciphertext strip | A timeline with 2ch ticks and a clip block as wide as the text in whole characters, with its length; fault colour when invalid |
| Choice control: channel buttons and blackout switch | `features-cyberdeck-kit` jumper; slide switches | Lit channel buttons in their chart hue (solid when chosen, hollow otherwise); a two-position switch whose off state is a dark slot |
| Dialog: the video wall | `nav-pirate-radio` frame sides switching on; `portfolio-chiptune-composer` four channel strips | Six content tiles in a 3x2 wall that switch on in snake order with a one-frame plate, and off in reverse |
| Success: encore | `process-convoy-night` constellation of initials; `portfolio-chiptune-composer` fanfare | The toy plays a diagonal chase, then shows the visitor's initials in their kind-of-night hue on the pad screen |
| Wordmark: NIA in cells | `cta-indie-game` cells lit under the pointer; `gallery-demoparty` colour cycling | Cells keep their colour (painting, not a wake), each crossing advances one hue; Repaint walks diagonals; Clear is a hard cut |

## Adapting

1. **Name the layers first.** List the person's real layers (tools, channels, kinds of work, states) and give each one hue. Keep ten or more for this layout; if two hues could swap places, one has no job.
2. **Map the tokens.** Replace `--ground`, `--well` and `--plate` with one saturated ground and its darker and lighter tones; keep `--ink` a much darker version of the ground for text on lit hue faces and check it at 4.5:1 on the darkest hue that carries text. Re-run the contrast of every hue against the ground and write it beside the token.
3. **Edit `DATA` and `CONTACT`.** `DATA.years` drives the meter, its readout, totals and table (`unit` is nights per LED cell); `CONTACT` builds the links (delete a line to remove one; any other key with a full URL becomes a link).
4. **Rewrite the set list.** Five cards in `.chapters`, and `LANES` in the script: each lane's hue, start year, its block of steps (`from`, `to`) and lit steps. The blocks must cover 0 to 15 without overlap.
5. **Rename the pads and patterns** in `PATS` (a name and an `(x, y) => bit` function on a 48x48 grid) and the keys in `KEYS`.
6. **Change the wordmark** in `GLYPH` (5x7 letters, 1 for a cell) and `COLS`; keep one empty cell around the word.
7. **Retime** with the `--d-*` tokens; the script reads them all. To remove the pin, drop the `room` branch; the set list then reads as a list. To remove the tunnel loop, leave `tv.hook` null: it then snaps to the aim.

| Token | Role |
|---|---|
| `--ground`, `--well`, `--plate`, `--ink` | Ultramarine ground; wells (canvases, fields, unlit LEDs, the blackout face); raised plates (primary face, tunnel frame, tile switch-on frame); text on lit hue faces |
| `--white`, `--haze` | Text (9.49:1); secondary text, resting outlines, unpainted wordmark cells (6.29:1) |
| `--scrim` | Dialog backdrop, the well at 90% |
| `--strobe` | Primary action and focus rings (8.60:1) |
| `--kick`, `--snare`, `--hat`, `--bass` | Chapters 1 to 4 and pad rows A to D (3.08, 4.30, 8.37, 6.70:1; non-text where under 4.5) |
| `--lead` | Chapter 5 (4.33:1, non-text) |
| `--club`, `--festival`, `--install` | Kinds of night: chart, channel buttons, initials (3.07, 7.87, 6.63:1) |
| `--live` | Now markers, on-stage lamp, field clip (3.88:1, non-text) |
| `--fault` | Errors only (4.71:1 on ground, 6.48:1 on well) |
| `--font` | Departure Mono with system monospace fallbacks |
| `--t-mark` ... `--t-display`, `--lh-*`, `--measure` | Type on the 11px grid: 11 (marks), 13.75, 16.5, 22, 33 (22 on phones), display 44/55/66; line heights in 5.5 px steps; 62ch measure |
| `--cell`, `--s1` ... `--s8`, `--gutter`, `--max-w` | 11px cell; spacing 5.5 to 132; gutter 22/33/44; 1320px content |
| `--sc` (on `.seq`) | Set list step cell: fluid under 1024px, 22, 33 or 44px on desktop |
| `--fader-w`, `--strip-h` | Room for the crossfader: 66px at the right edge from 1024px, or a 33px top strip below |
| `--tap`, `--hit`, `--notch` | 48px buttons and fields, 44px text targets, 4px stepped corner |
| `--d-*` | Every duration: frame 60, hold 140, hot 700, bar 60, reg 70, reg-gap 90, tunnel 50, thin 90, still 160, cap 90, dither 70, chase 80, tile 45, paint 50, card 160 (ms) |
