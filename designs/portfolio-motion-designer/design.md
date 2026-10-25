---
title: The house curve
section: portfolio
subject: Lucía Ferrón (fictional), a freelance 3D and motion designer in Montevideo who joins studio and agency teams for product films, title sequences, idents and social loops, and wants producers to book her.
aesthetic: The clay render. A neutral studio cyclorama, untextured clay-grey material, a 3D package's graph editor, and the red, green and blue of the X/Y/Z gizmo as the only colours.
mode: light
fonts:
  - Science Gothic, variable wdth 50-200 and wght 100-900 (Google Fonts), H1, H2, wordmark and nav
  - Rethink Sans, variable wght 400-800 (Google Fonts), body, buttons, form, captions, dialog text, readouts, chart ticks and the cubic-bezier string, with tabular figures
js: "Runs a working graph editor whose bezier handles, presets and ranges rewrite the page's one easing curve (the --ease token and a GSAP CustomEase), renders a hand-rolled projected clay cube and five generated canvas loops on gsap.ticker, builds two accessible SVG charts and the work cards from one data array, validates the booking form into a mailto or WhatsApp draft, and drives the load sequence, scroll moments, menu, dialog and eased anchors with GSAP and Lenis."
libraries: [GSAP 3.15.0 (ScrollTrigger, SplitText, Flip, CustomEase, DrawSVGPlugin), Lenis 1.3.26]
tags: [portfolio, motion-design, 3d, graph-editor, bezier, easing, canvas, charts, booking-form, gsap, lenis, light]
use_when:
  - A motion, animation or 3D person whose craft is timing, where letting the visitor change the timing is the most honest demo.
  - A portfolio for buyers who decide by schedule and cost (producers, studios): it shows how long jobs take, not only how they look.
  - Work that can be represented by generated loops or diagrams instead of photos or video files.
avoid_when:
  - A photographer, illustrator or anyone whose work must be seen as real images; the clay loops would stand in for the actual work.
  - Brands that need a dark or saturated palette; the design depends on a neutral grey studio with three gizmo colours.
  - More than about eight projects in the charts, or more than three pipeline stages (the gizmo has three axes).
---

## Why it works

**The one bold idea: the hero is a working graph editor, and its curve is the page's only ease.** A clay cube sits in a small 3D viewport next to an f-curve. Drag either bezier handle (pointer or touch), pick a preset (Ease out, Linear, Overshoot, Anticipate) or use the four labelled ranges, and the cube re-times along the green axis while a blue playhead sweeps the graph. The curve you leave is written to `--ease` (every CSS hover, focus and swap transition) and into a single CustomEase that every GSAP tween reads (menu, dialog, charts, form result, headline rise, anchor scrolls, camera orbit, the Costa and Suela card loops); exits play it backwards in time (`houseRev`). The caption says so, and the footer repeats the live readout: "Every transition on this page used cubic-bezier(...)". Lenis wheel smoothing and the physical loops (falling grounds, the shoreline, the bouncing spheres) stay outside that claim, which is why the footer says transition, not move. While a handle or range is held, the cube rests at the end and onion-skin ghosts spread and bunch with the curve, so the change is visible at once; on release they fade and the move replays. The selected cube is outlined in Z blue as in a 3D app, the end pose is a faint wireframe box (an overshoot visibly passes it), and on landing the end keyframe pops and the wireframe flashes blue. A motion designer's portfolio proves its craft by handing the visitor the craft.

- **The clay render is the subject's own studio.** The page is a studio cyclorama grey (`--cyc` #D8DBDB, cool, not cream), objects are untextured clay (`--clay` #BDC2C2), text is a blue-graphite ink (#1E2229, 11.5:1). The gizmo hues are a pinker X red (#B8244A), a green (#4A9539) and the lighter, cyan-leaning Z blue of 3D apps (#1C6CC0, 3.8:1, used for focus, handles and selection, never for text). The only hues are the gizmo's: red, green and blue mean X, Y and Z in every 3D package, so they become the three pipeline stages in the charts (look development, animation, render and comp), always with direct labels. Green is graphics only; text is never coloured. Panels have 1px edges like 3D-app panes and no shadows; the only gradients are the canvas shading of clay objects.
- **Real 3D vernacular, hand-rolled.** The viewport is a projected cube with 8 vertices, back-face culling, a painter's sort and Lambert shading, on a grid floor with the red X and green Y axes, start and end footprints, and a corner gizmo that turns with the camera. No three.js; the five card loops (grounds pouring into a cup, blocks stacking into a C and toppling, contour lines rippling like a shoreline, an exploded sole, three spheres bouncing with squash and stretch) are plain 2D canvas on the same clock. No external images anywhere.
- **Two families with clear jobs.** Science Gothic's squared Bank Gothic lineage reads as a 3D application's splash screen and as title-sequence lettering, which is this designer's trade, so it sets only the display layer: the H1 at wdth 118, H2s at 108, the wordmark and the nav at 100-108. Rethink Sans does everything else (body at 1.0625rem/1.55, buttons, form, captions, dialog text, readouts, chart ticks and the cubic-bezier string). Its figures are tabular (measured: "1111" and "0000" both 96.00px at 40px with `tabular-nums`), so readouts do not jitter while a handle moves, and no monospace is needed.
- **Buttons are 6px rectangles**, like the buttons in Blender and Cinema 4D, not SaaS pills. Primary buttons are ink at rest so the booking action is the strongest element; their hover fill is clay with an ink label. Outline buttons fill with ink. The one fully rounded element is the preset control, whose indicator slides between the presets.
- **Structure is information.** Rules appear only where they separate data: the "How I work" rows and the chart rows, both drawn from the left on enter. Sections are separated by space alone, and the footer rule is static. The stages run left to right in pipeline order and are named, so there are no numbered markers. Card meta is a small definition list on separate lines, not a dotted string.
- **The data is honest and checked.** One `PROJECTS` array drives the five cards, the dialog and both charts. Two claims in the copy (look development plus render beats animation only on product films and titles; liquid and particle jobs cost five to eight times more render per finished second than the mean of the rest) are asserted with `console.assert` against that array, so editing the data without the copy shows up in the console.
- **The reel is a native scroll-snap row at every width, on purpose.** The editor is the one bold idea, so the work does not get a pinned horizontal track or a cursor follower. Cards are `min(80vw, 420px)` wide and bleed off the right edge of the viewport, which says "there is more" by itself. A 2px ruler above the row fills with how much of it has been seen (its scaleX follows `scrollLeft`), and Previous and Next move exactly one card. One card plays at a time at every width: while the reel is 60% in view, the first card fully inside it plays; hover or focus hands the loop to that card, and leaving hands it back. Each card also underlines its title and presses.
- **The rest is quiet and useful.** Charts have tables, legends, keyboard rows and a live readout. The form validates in place and drafts the request for email or WhatsApp; nothing is sent until the visitor picks a channel. Contact rows come from one `CONTACT` object.

Review decisions, for the record: the background is a cool cyclorama grey, darkened to #D8DBDB so it is not a near-copy of another design's ground, to stay clear of Default 1; the readouts use Rethink Sans with tabular figures rather than a monospace, the card meta is a definition list rather than a dotted string and the contact rows carry a glyph rather than an arrow (Default 5); TX1 runs only on the hero H1 and its bookend, the "Book a slot" H2, and no section fades in (Default 8); no hover lift on cards; buttons are 6px, not pills (Default 4). The art director cut the pinned SC4 reel and the CU1 "Open" cursor follower: both were second bold ideas next to the editor, and the follower only decorated. The palette validator (dataviz skill) passes the three stage colours on #D8DBDB: red to green ΔE 8.2 for deuteranopes, blue to green 26.0 for normal vision. Green is 2.67:1 against the background, so it is graphics only, always with direct labels, a legend, the readout and a table. A darker green (#3D8530) would clear 3:1 but falls to ΔE 3.7 from the red for deuteranopes, so separation won.

## Do not touch

- **One curve, two consumers.** `--ease` (CSS) and the `house` ease (GSAP) must always be the same cubic-bezier, written together in `renderCurve()`. `house` is a wrapper over one CustomEase instance updated with `setData`, because `setData` builds a new ease function and tweens created earlier would otherwise keep the old curve. Scale, clip-path, opacity and size use the clamped variants (`houseLo`, `--ease-lo`) so Anticipate never produces a negative scale or inset; scroll and counters use `houseClamp`.
- **Handle clamps.** Time stays within 0..1 (so the CSS cubic-bezier stays valid), value within -0.4..1.6 (the graph draws -0.45..1.65). Every preset sits inside them, including the standard Overshoot (.34, 1.56, .64, 1), and the ranges can reach every preset.
- **Gizmo colour roles.** Red, green and blue mean the three stages, in that order, and only with a direct label next to them. Blue also means focus, selection, handles and playhead. Do not add a fourth hue.
- **The cube honours the curve.** It moves once when the graph is first 60% in view (at 0.6s on wide screens; on phones it waits until the visitor scrolls to it), once after each curve change (250ms after release) and loops only after Play. Only Play and Pause change the button label. Under reduced motion, and while a handle or range is held, onion-skin ghosts at t = 0.2, 0.4, 0.6 and 0.8, matched by dots on the curve, show the same timing still.
- **No content behind hover.** Card titles, clients, years and runtimes are always visible; chart values are in the readout and the tables.
- Hidden first-paint states live only under `html.js:not(.booted)` (and the headline under `html.js:not(.split)`) inside a no-preference media query; if the CDN fails, `html.js` is removed and the page is complete and static, with a working editor, charts at their final state and frame 0 of every loop.

## Adapting

Change the `:root` tokens first. Keep the three accent hues distinct for colour-blind readers (run a palette validator; the adjacent stages need a deuteranopia ΔE of at least 8) and keep `--ink` at AA on both `--cyc` and `--clay`. For a different discipline, the editor can stay if the work is about timing (animation, UI motion, sound design); otherwise replace the hero with that discipline's own working tool rather than decorating this one.

Content: edit `CONTACT` (remove a key to hide a row; keep at least one of `email` or `whatsapp`, because they are how the drafted request is sent. With neither, the result offers "Copy the request" instead, and with no keys at all the "Or reach me directly" column hides; add a network as one line in `NETWORKS` with a label, a URL builder and a glyph) and `PROJECTS` (title, client, year, kind, runtime, seconds, render hours, an optional `sim`, days per stage, and for featured items a brief, part, studio, director and scene). If you change the data, update the two claims in the timing copy or the assertions will fail. A new card loop is a function in `SCENES` taking `(context, width, height, seconds)`; frame 0 is the poster, so make it a readable still.

Layout: the reel takes any number of cards; with fewer than three at 1440 it no longer overflows, the ruler fills and both buttons disable, so switch to a grid at that point. Long titles wrap under the frame. The charts take up to about eight rows before they need scrolling or grouping.

Motion: durations for CSS live in the `--d-*` tokens; GSAP durations are inline in `intro()`, the chart `play*` functions and the menu and dialog functions, each next to its technique. To remove a scroll moment, delete its `ScrollTrigger.create` or `fromTo` line in the `matchMedia` callback; everything renders at its final state without it. To remove the load sequence, delete the call to `intro()` and the `html.js:not(.booted)` rules. To retime the whole page, change the default curve in `C` and the `--ease` token together.

| Token | Role |
|---|---|
| `--cyc` | Page background, the cyclorama; text on ink fills |
| `--clay` | Clay material: viewport floor, card frames, result panel, mobile menu, primary button hover fill, range tracks |
| `--ink` | Text, primary button fill at rest, outline button fill on hover, keyframes, onion dots |
| `--ink-2` | Secondary text (on `--cyc` only) |
| `--axis-x` | Look development stage, error markers |
| `--axis-y` | Animation stage, the f-curve (graphics only) |
| `--axis-z` | Render and comp stage, focus ring, selection, handles, playhead, underlines |
| `--edge`, `--edge-2`, `--edge-3`, `--grid`, `--scrim` | Panel edges, rules, input borders, chart grid, dialog backdrop |
| `--f-display`, `--f-text` | Science Gothic (H1, H2, wordmark, nav), Rethink Sans (everything else) |
| `--w-display`, `--w-h2`, `--w-ui` | Science Gothic width axis: 118 (100 under 600px), 108, 100 |
| `--t-xs` to `--t-2xl`, `--t-display` | Type scale, major third from 17px; display clamps to keep the H1 on two lines at 1440 |
| `--s-1` to `--s-10`, `--gutter`, `--max`, `--col-gap`, `--hdr-h` | Spacing, 16/32/48px gutters, 1440px content, 12 columns, header height |
| `--r-panel`, `--r-card`, `--r-input`, `--r-btn`, `--r-ind`, `--r-bar` | Radii by hierarchy: editor and dialog 14px, card frames 10px, inputs and radio cards 6px, buttons 6px, the preset control 999px, bars 2px |
| `--ease`, `--ease-lo` | The live house curve and its clamped twin (rewritten by the editor) |
| `--d-press` to `--d-in` | CSS durations: press, thumb, halo, out, swap, underline, in |

## Motion

Detailed tier. GSAP 3.15.0 (ScrollTrigger, SplitText, Flip, CustomEase, DrawSVGPlugin) and Lenis 1.3.26 from jsDelivr, pinned as in `research/motion-techniques.md` section 3; Observer and ScrambleTextPlugin are not loaded. Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`; the viewport and the card loops use the same ticker and sleep when off screen or not playing. Everything time-based is inside `gsap.matchMedia` with `motion`, `reduce` and `fine` conditions; cleanup removes the ticker callback, restores lag smoothing and destroys Lenis. Lenis stops while the mobile menu or the project dialog is open. Under reduced motion there is no Lenis, every element is at its final state, CSS transitions take 0.01s, hovers change colour only, Play is hidden and the editor shows onion skins. The native cursor is never hidden. Every tween's ease is the house curve unless noted.

Load sequence (nothing blocks input; the handles are draggable from first paint and a drag finishes the intro):

| When | What | Technique | Timing | Reduced |
|---|---|---|---|---|
| 0.00s | Editor panel opens from an inset crop | LD7 | clip-path inset(6% 8% round 14px) to 0, scale .96 to 1, 1.4s `houseLo` | Final |
| 0.10s | Hero H1 lines rise out of their masks, after fonts load | TX1 | yPercent 130 to 0 inside padded line masks, 1.0s, stagger .08; autoSplit re-splits on resize | No split |
| 0.30s | Wordmark, nav and "Book a slot" settle (visible, dimmed, from first paint) | LD8 | y 6 to 0, opacity .4 to 1, .5s, stagger .06 | Final |
| 0.45s | Intro and hero CTAs settle | LD8 | y 8 to 0, opacity .4 to 1, .6s | Final |
| 0.60s, or when the graph is 60% in view on stacked layouts (under 1100px) | F-curve draws; keyframe diamonds pop; handle lines draw; handle dots grow | DrawSVG, LD8 | .9s; diamonds .4s stagger .1; lines .4s; dots .4s `houseLo` | Final |
| 1.30s | Signature: the cube's first move, playhead sweeping the graph; on landing the end keyframe pops 1.35 and back (.35s) and the end wireframe flashes blue (.4s) | Subject | 1.6s move on the curve, .6s hold | Onion skin |

Scroll:

| What | Technique | Trigger and timing | Reduced |
|---|---|---|---|
| The "How I work" row rules draw from the left | SC16 | `top 90%`, once, .8s `houseLo` | Static |
| "Where the days go": row rules draw, then each row's three segments grow from their own left edge in pipeline order; totals count up from 85% | SC16, animated chart, SC13 | `top 75%`, once; rules .8s; segments .7s `houseLo`, +.12s per stage, +.06s per row; totals 1.1s | Final |
| "Render hours per finished second": stems draw, heads grow after their stem, values count up | Animated chart, SC13 | `top 75%`, once; stems .8s stagger .05; heads .4s | Final |
| "Book a slot" H2 lines rise, the bookend to the hero | TX1 | `clamp(top 85%)`, once, 1.0s | No split |
| Header leaves on the way down past 120px, returns on the first scroll up; never while the menu is open or focus is inside | NV5 | .4s `var(--ease)` | Instant |
| Nav marks the section in the reading band | NV6 spy | IntersectionObserver `-40% 0px -55% 0px` | Same |
| Reel ruler fills with the share of the row seen | CD1 (progress) | Follows the row's own `scrollLeft` directly, no easing | Same |

Every interactive item:

| Item | Hover (fine) | Focus | Press, change | Touch | Reduced |
|---|---|---|---|---|---|
| Skip link | - | Slides in, .3s | Anchor | - | Instant |
| Wordmark | HV1 two-copy roll, 16ms per character, .45s | Same plus ring | MI1; eased scroll to top | Press only | Blue underline, no roll |
| Nav and menu links (Work, Timing, How I work; "Book a slot" is the one way to #contact), "See the work", "Edit the request", "Back to top", contact handles | HV2 blue underline in from the left, out to the right, .4s | Same plus ring | NV6 `lenis.scrollTo`, duration `min(1.3, .65 + d/4000)`, clamped curve, then focus the section | Persistent underline on current and on contact links | Static underline, jump |
| Primary and outline buttons | HV4 ink fill from the side the pointer entered, label to `--cyc`; .45s in, .3s out | Fill plus ring | MI1 scale .97, .12s down, .4s release | Press only | Colour only |
| Menu button (under 768px) | HV4 | Ring | MI2 Menu/Close swap .35s; NV1 one timeline: circle clip from the button, 150vmax, .7s `houseLo`, links, "Book a slot" and the live curve readout with its own "Copy as CSS" (pinned to the bottom) rise stagger .06; closes at timeScale 1.4; page inert and scroll-locked, Escape closes, focus returns | This is the touch nav | Instant |
| Reel Previous, Next | HV4 outline | Fill plus ring | CD1: tween `scrollLeft` one card, .7s on the clamped curve, snap off during the tween; `aria-disabled` at the ends (keeps focus) | Native swipe with snap; buttons too | Jump |
| Viewport | CU3 camera orbit from the pointer over the hero, yaw ±6°, pitch ±3°, quickTo 1s on `house` | - | - | One-finger horizontal drag orbits, settles back .8s | Fixed camera |
| Bezier handles | Scale 1.3 and halo, .25s | (Keyboard uses the ranges) | Pointer capture, 44px hit area; path, handle lines, readout, ranges, `--ease` and CustomEase update on the next tick; while held the cube rests at the end with onion-skin ghosts and the playhead hides (also while a range thumb is held); ghosts fade .25s and the move replays 250ms after release | Same drag | Drag works, onion skin redraws |
| Preset radios | Faint ink tint behind the label | NV4 indicator follows focus | Indicator slides .4s; handles tween to the preset .5s on the previous curve | Indicator follows selection | Jump |
| Four ranges | Thumb scale 1.25, .2s | Same plus ring | Filled track via `--p`; live readouts | Native | No scale |
| "Copy as CSS", "Copy address" | HV4 outline | Ring | CD10 clipboard, MI2 swap to "Copied" for 1.6s, live region; fallback selects the text | Same | Swap without slide |
| Play/Pause | HV4 outline | Ring | MI2 swap; Play loops the move until Pause; automatic one-shot replays leave the label alone | Same | Hidden |
| Work cards (5 buttons) | HV10: the hovered card takes the one playing loop from frame 0, tint fades .3s, title underline; leaving hands it back to the first card fully in the reel | Same as hover plus ring | MI1 scale .985; opens the dialog | The first card fully in the reel plays while the reel is 60% in view; tap opens | Frame 0 only |
| Project dialog | - | Focus starts on the title; native focus trap | CD7 clip-path from the bottom plus y 12, .5s `houseLo`, backdrop fade .3s; close fades on `houseRev` .25s; "Next project" TR1 title swap and body crossfade (out .18s `houseRev`, in .35s); Escape, Close or backdrop click close; focus returns to the card; page scroll-locked by CSS even without Lenis | Full-screen sheet | Instant, loop paused with "Play loop" |
| Chart rows (8 per chart, one tab stop, arrows, Home and End move) | HV7 others dim to .45; inline values (chart 1); head scale 1.4 (chart 2) | Same plus row outline | Readout line, live | Tap selects | No transition |
| Legend buttons | Other stages dim to .2 | Same | Click pins the highlight (aria-pressed); MI1 | Tap toggles | No transition |
| Days / Share of job | - | NV4 indicator | Segments tween x and scaleX .6s; tick labels TR1 crossfade .3s | Same | Instant |
| "Show the numbers as a table" | - | Ring | CD6 via `::details-content` and `interpolate-size`, .4s, marker turns 90°; Lenis and ScrollTrigger refresh after | Same | Instant |
| Text fields | Border to ink | Blue bar grows from the left .35s, ring (the label stays ink: the Z blue is 3.8:1, too low for small text) | MI4 errors: `aria-invalid`, message revealed with grid rows .25s, red marker bar, focus to the first invalid field, and a summary of every error in the live region; the start date must be a Monday from 11 January 2027 | Same | Instant |
| Kind-of-work radio cards | Border to ink | Ring | MI3 badge pops .6 to 1, .25s, blue outline | Same | No pop |
| Form submit | - | - | Flip on the panel .5s plus .3s crossfade to "Request drafted for ..."; focus to that heading. The send links carry a plain mailto/wa.me default from load and get the drafted text on submit | Same | Instant |
| Contact rows | HV7 siblings dim to .5, handle underline | Mirrored with `:focus-within` | External links in a new tab | Persistent underline | Dimming kept |

Removed during review (the accessories): HV5 magnetic pull on the three primary buttons, which stacked a second hover response on buttons that already fill from the entry edge and press, and competed with the handles as the page's pointer-driven idea; and, in the last pass, the 8° turn of the contact glyphs, a third response on rows that already dim their siblings and underline the handle.

Deviations from the motion plan, with reasons: Play/Pause swaps its visible label (and so its accessible name) instead of also setting `aria-pressed`, since a name that changes plus a pressed state reads twice. CD6 animates `<details>` through `::details-content` with `interpolate-size: allow-keywords` instead of a `grid-template-rows` wrapper, which keeps the native element. Chart segments animate a transform on 1px-wide SVG rects, so their ends are square rather than 2px rounded.

Builder checks, run in Chromium on 2026-10-24:

- **CustomEase `setData` and tweens already built.** `setData` alone does not reach a tween that captured the old ease function, so every tween names `'house'`, a registered wrapper that calls the one CustomEase instance at each frame. Check: a paused tween built on `'house'` before switching the preset to Linear reads 0.500 at progress 0.5 afterwards, so the enter tweens can be built up front and do not need to be built lazily.
- **CSS `cubic-bezier()` with y outside 0..1.** `CSS.supports` accepts `cubic-bezier(0.60, -0.28, 0.73, 0.05)` and a transition using `var(--ease)` computes to it. Transforms and colours accept the undershoot; scale, clip-path, opacity and background-size transitions use `--ease-lo`, the same curve with y clamped to 0..1.
- **The houseLo clamp under Anticipate.** With Anticipate, `house(0.1)` is -0.043 and `houseLo(0.1)` is 0.000, so no scale, inset or opacity goes negative.
- **Type.** Rethink Sans figures with `tabular-nums` measure the same for "1111" and "0000" (96.00px at 40px). Science Gothic renders at wdth 118 with the accents in "Lucía Ferrón". The SplitText line masks on Science Gothic clipped its tall glyph tops and descenders, so each mask gets .14em of padding (given back with negative margins) and the lines start at yPercent 130; checked at 390px after autoSplit.
- **Reel and Lenis.** The row carries `data-lenis-prevent-horizontal`, so horizontal swipes and trackpad gestures scroll it natively while a vertical wheel over it still scrolls the page through Lenis.
