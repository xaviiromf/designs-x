---
title: The house curve
section: portfolio
subject: Lucía Ferrón (fictional), a freelance 3D and motion designer in Montevideo who joins studio and agency teams for product films, title sequences, idents and social loops, and wants producers to book her.
aesthetic: The clay render. A neutral studio cyclorama, untextured clay-grey material, a 3D package's graph editor, and the red, green and blue of the X/Y/Z gizmo as the only colours.
mode: light
fonts:
  - Science Gothic, variable wdth 50-200 and wght 100-900 (Google Fonts), display, headings, buttons, nav, readouts, chart ticks and the cubic-bezier string
  - Host Grotesk, variable wght 300-800 (Google Fonts), body, intro, captions, dialog text, form labels and errors
js: "Runs a working graph editor whose bezier handles, presets and ranges rewrite the page's one easing curve (the --ease token and a GSAP CustomEase), renders a hand-rolled projected clay cube and five generated canvas loops on gsap.ticker, builds two accessible SVG charts and the work cards from one data array, validates the booking form into a mailto or WhatsApp draft, and drives the load sequence, scroll moments, menu, dialog and eased anchors with GSAP and Lenis."
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip, CustomEase, DrawSVGPlugin), Lenis 1.3.26]
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

**The one bold idea: the hero is a working graph editor, and its curve is the page's only ease.** A clay cube sits in a small 3D viewport next to an f-curve. Drag either bezier handle (pointer or touch), pick a preset (Ease out, Linear, Overshoot, Anticipate) or use the four labelled ranges, and the cube re-times along the green axis while a blue playhead sweeps the graph. The curve you leave is written to `--ease` (every CSS hover, focus and swap transition) and into a single CustomEase that every GSAP tween reads (menu, dialog, charts, form result, headline rise, anchor scrolls). The caption says so, and the footer repeats the live readout: "Every move on this page used cubic-bezier(...)". A motion designer's portfolio proves its craft by handing the visitor the craft.

- **The clay render is the subject's own studio.** The page is a neutral cyclorama (`--cyc` #E0E2E1, slightly cool, not cream), objects are untextured clay (`--clay`), text is a blue-graphite ink. The only hues are the gizmo's: red, green and blue mean X, Y and Z in every 3D package, so they become the three pipeline stages in the charts (look development, animation, render and comp), always with direct labels. Green is graphics only; text is never coloured. Panels have 1px edges like 3D-app panes and no shadows; the only gradients are the canvas shading of clay objects.
- **Real 3D vernacular, hand-rolled.** The viewport is a projected cube with 8 vertices, back-face culling, a painter's sort and Lambert shading, on a grid floor with the red X and green Y axes, start and end footprints, and a corner gizmo that turns with the camera. No three.js; the five card loops (grounds pouring into a cup, blocks stacking into a C and toppling, contour lines rippling like a shoreline, an exploded sole, three spheres bouncing with squash and stretch) are plain 2D canvas on the same clock. No external images anywhere.
- **Two families with clear jobs.** Science Gothic descends from Bank Gothic, the lettering of film title cards, which fits someone who cuts title sequences; its width axis does the work: 118 for the display, 108 for H2, 100 for buttons and nav, 68 for readouts and ticks (narrow channel-box lettering with tabular figures, instead of a monospace). Host Grotesk carries reading text at 1.0625rem/1.55, because Science Gothic is too wide for 64ch.
- **Structure is information.** The section rules mark section boundaries and the "How I work" rows; the charts' row rules separate jobs. The stages run left to right in pipeline order and are named, so there are no numbered markers. Card meta is a small definition list on separate lines, not a dotted string.
- **The data is honest and checked.** One `PROJECTS` array drives the five cards, the dialog and both charts. Two claims in the copy (look development plus render beats animation only on product films and titles; liquid and particle jobs cost five to eight times more render per finished second than the mean of the rest) are asserted with `console.assert` against that array, so editing the data without the copy shows up in the console.
- **The reel is a plain grid on purpose.** The editor is the one bold idea, so the work is set in the 12-column grid with asymmetric spans (7+5, 5+7, then 8 offset to the right) at 992px and up, and as a native scroll-snap row of 80vw cards below that. There is no pinned horizontal track and no cursor follower; each card plays its loop on hover or focus (and while 60% in view on touch), underlines its title and presses.
- **The rest is quiet and useful.** Charts have tables, legends, keyboard rows and a live readout. The form validates in place and drafts the request for email or WhatsApp; nothing is sent until the visitor picks a channel. Contact rows come from one `CONTACT` object.

Review decisions, for the record: the background moved from a faintly warm grey to the cool cyclorama grey to stay clear of Default 1; the readouts use Science Gothic at wdth 68 with tabular figures rather than a monospace, the card meta is a definition list rather than a dotted string and the contact rows carry a glyph rather than an arrow (Default 5); TX1 runs only on the hero H1 and its bookend, the "Book a slot" H2, and no section fades in (Default 8); no hover lift on cards. The gizmo green was moved from #3D8530 to #4A9539 because the palette validator measured red to green at ΔE 3.3 for deuteranopes; the new green passes at 8.1 and, being under 3:1 on the background, is used only on marks that also have labels and a table.

## Do not touch

- **One curve, two consumers.** `--ease` (CSS) and the `house` ease (GSAP) must always be the same cubic-bezier, written together in `renderCurve()`. `house` is a wrapper over one CustomEase instance updated with `setData`, because `setData` builds a new ease function and tweens created earlier would otherwise keep the old curve. Scale, clip-path, opacity and size use the clamped variants (`houseLo`, `--ease-lo`) so Anticipate never produces a negative scale or inset; scroll and counters use `houseClamp`.
- **Handle clamps.** Time stays within 0..1 (so the CSS cubic-bezier stays valid), value within -0.4..1.4 (so the graph can draw it).
- **Gizmo colour roles.** Red, green and blue mean the three stages, in that order, and only with a direct label next to them. Blue also means focus, selection, handles and playhead. Do not add a fourth hue.
- **The cube honours the curve.** It moves once on load, once after each curve change (250ms after the last drag, preset or range input) and loops only after Play. Under reduced motion it never moves: onion-skin ghosts at t = 0.2, 0.4, 0.6 and 0.8, matched by dots on the curve, show the same timing still.
- **No content behind hover.** Card titles, clients, years and runtimes are always visible; chart values are in the readout and the tables.
- Hidden first-paint states live only under `html.js:not(.booted)` (and the headline under `html.js:not(.split)`) inside a no-preference media query; if the CDN fails, `html.js` is removed and the page is complete and static, with a working editor, charts at their final state and frame 0 of every loop.

## Adapting

Change the `:root` tokens first. Keep the three accent hues distinct for colour-blind readers (run a palette validator; the adjacent stages need a deuteranopia ΔE of at least 8) and keep `--ink` at AA on both `--cyc` and `--clay`. For a different discipline, the editor can stay if the work is about timing (animation, UI motion, sound design); otherwise replace the hero with that discipline's own working tool rather than decorating this one.

Content: edit `CONTACT` (remove a key to hide a row; add a network as one line in `NETWORKS` with a label, a URL builder and a glyph) and `PROJECTS` (title, client, year, kind, runtime, seconds, render hours, an optional `sim`, days per stage, and for featured items a brief, part, studio, director and scene). If you change the data, update the two claims in the timing copy or the assertions will fail. A new card loop is a function in `SCENES` taking `(context, width, height, seconds)`; frame 0 is the poster, so make it a readable still.

Layout: five cards fit the 7+5, 5+7, 8 rhythm; for four, drop the last row; for six, repeat the first two rows. Long titles wrap under the frame. The charts take up to about eight rows before they need scrolling or grouping.

Motion: durations for CSS live in the `--d-*` tokens; GSAP durations are inline in `intro()`, the chart `play*` functions and the menu and dialog functions, each next to its technique. To remove a scroll moment, delete its `ScrollTrigger.create` or `fromTo` line in the `matchMedia` callback; everything renders at its final state without it. To remove the load sequence, delete the call to `intro()` and the `html.js:not(.booted)` rules. To retime the whole page, change the default curve in `C` and the `--ease` token together.

| Token | Role |
|---|---|
| `--cyc` | Page background, the cyclorama; text on ink fills |
| `--clay` | Clay material: viewport floor, card frames, result panel, default button fill, range tracks |
| `--ink` | Text, button fill on hover, keyframes, onion dots |
| `--ink-2` | Secondary text (on `--cyc` only) |
| `--axis-x` | Look development stage, error markers |
| `--axis-y` | Animation stage, the f-curve (graphics only) |
| `--axis-z` | Render and comp stage, focus ring, selection, handles, playhead, underlines |
| `--edge`, `--edge-2`, `--edge-3`, `--grid`, `--scrim` | Panel edges, rules, input borders, chart grid, dialog backdrop |
| `--f-display`, `--f-text` | Science Gothic, Host Grotesk |
| `--w-display`, `--w-h2`, `--w-ui`, `--w-data` | Science Gothic width axis: 118, 108, 100, 68 |
| `--t-xs` to `--t-2xl`, `--t-display` | Type scale, major third from 17px; display clamps to keep the H1 on two lines at 1440 |
| `--s-1` to `--s-10`, `--gutter`, `--max`, `--col-gap`, `--hdr-h` | Spacing, 16/32/48px gutters, 1440px content, 12 columns, header height |
| `--r-panel`, `--r-card`, `--r-input`, `--r-pill`, `--r-bar` | Radii by hierarchy: editor and dialog, card frames, inputs and radio cards, buttons |
| `--ease`, `--ease-lo` | The live house curve and its clamped twin (rewritten by the editor) |
| `--d-press` to `--d-in` | CSS durations: press, thumb, halo, out, swap, underline, in |

## Motion

Detailed tier. GSAP 3.15.0 (ScrollTrigger, SplitText, Flip, CustomEase, DrawSVGPlugin) and Lenis 1.3.26 from jsDelivr, pinned as in `research/motion-techniques.md` section 3; Observer and ScrambleTextPlugin are not loaded. Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`; the viewport and the card loops use the same ticker and sleep when off screen or not playing. Everything time-based is inside `gsap.matchMedia` with `motion`, `reduce` and `fine` conditions; cleanup removes the ticker callback, restores lag smoothing and destroys Lenis. Lenis stops while the mobile menu or the project dialog is open. Under reduced motion there is no Lenis, every element is at its final state, CSS transitions take 0.01s, hovers change colour only, Play is hidden and the editor shows onion skins. The native cursor is never hidden. Every tween's ease is the house curve unless noted.

Load sequence (nothing blocks input; the handles are draggable from first paint and a drag finishes the intro):

| When | What | Technique | Timing | Reduced |
|---|---|---|---|---|
| 0.00s | Editor panel opens from an inset crop | LD7 | clip-path inset(6% 8% round 14px) to 0, scale .96 to 1, 1.4s `houseLo` | Final |
| 0.10s | Hero H1 lines rise out of their masks, after fonts load | TX1 | yPercent 110 to 0, 1.0s, stagger .08; autoSplit re-splits on resize | No split |
| 0.30s | Wordmark, nav and "Book a slot" settle (visible, dimmed, from first paint) | LD8 | y 6 to 0, opacity .4 to 1, .5s, stagger .06 | Final |
| 0.45s | Intro and hero CTAs settle | LD8 | y 8 to 0, opacity .4 to 1, .6s | Final |
| 0.60s | F-curve draws; keyframe diamonds pop; handle lines draw; handle dots grow | DrawSVG, LD8 | .9s; diamonds .4s stagger .1; lines .4s; dots .4s `houseLo` | Final |
| 1.30s | Signature: the cube's first move, playhead sweeping the graph | Subject | 1.6s move on the curve, .6s hold | Onion skin |

Scroll:

| What | Technique | Trigger and timing | Reduced |
|---|---|---|---|
| Section boundary rules and the "How I work" row rules draw from the left | SC16 | `top 90%`, once, .8s `houseLo` | Static |
| "Where the days go": row rules draw, then each row's three segments grow from their own left edge in pipeline order; totals count up from 85% | SC16, animated chart, SC13 | `top 75%`, once; rules .8s; segments .7s `houseLo`, +.12s per stage, +.06s per row; totals 1.1s | Final |
| "Render hours per finished second": stems draw, heads grow after their stem, values count up | Animated chart, SC13 | `top 75%`, once; stems .8s stagger .05; heads .4s | Final |
| "Book a slot" H2 lines rise, the bookend to the hero | TX1 | `clamp(top 85%)`, once, 1.0s | No split |
| Header leaves on the way down past 120px, returns on the first scroll up; never while the menu is open or focus is inside | NV5 | .4s `var(--ease)` | Instant |
| Nav marks the section in the reading band | NV6 spy | IntersectionObserver `-40% 0px -55% 0px` | Same |

Every interactive item:

| Item | Hover (fine) | Focus | Press, change | Touch | Reduced |
|---|---|---|---|---|---|
| Skip link | - | Slides in, .3s | Anchor | - | Instant |
| Wordmark | HV1 two-copy roll, 16ms per character, .45s | Same plus ring | MI1; eased scroll to top | Press only | Colour to blue |
| Nav and menu links, "See the work", "Edit the request", "Back to top", contact handles | HV2 blue underline in from the left, out to the right, .4s | Same plus ring | NV6 `lenis.scrollTo`, duration `min(1.3, .65 + d/4000)`, clamped curve, then focus the section | Persistent underline on current and on contact links | Static underline, jump |
| Primary and outline buttons | HV4 ink fill from the side the pointer entered, label to `--cyc`; .45s in, .3s out | Fill plus ring | MI1 scale .97, .12s down, .4s release | Press only | Colour only |
| Menu button (under 768px) | HV4 | Ring | MI2 Menu/Close swap .35s; NV1 one timeline: circle clip from the button, 150vmax, .7s `houseLo`, links rise stagger .06; closes at timeScale 1.4; page inert, Escape closes, focus returns | This is the touch nav | Instant |
| Viewport | CU3 camera orbit from the pointer over the hero, yaw ±6°, pitch ±3°, quickTo 1s | - | - | One-finger horizontal drag orbits, settles back .8s | Fixed camera |
| Bezier handles | Scale 1.3 and halo, .25s | (Keyboard uses the ranges) | Pointer capture, 44px hit area; path, handle lines, readout, ranges, `--ease` and CustomEase update on the next tick; replay 250ms after release | Same drag | Drag works, onion skin redraws |
| Preset radios | Label to blue | NV4 indicator follows focus | Indicator slides .4s; handles tween to the preset .5s on the previous curve | Indicator follows selection | Jump |
| Four ranges | Thumb scale 1.25, .2s | Same plus ring | Filled track via `--p`; live readouts | Native | No scale |
| "Copy as CSS", "Copy address" | HV4 outline | Ring | CD10 clipboard, MI2 swap to "Copied" for 1.6s, live region; fallback selects the text | Same | Swap without slide |
| Play/Pause | HV4 outline | Ring | MI2 swap; Play loops the move until Pause | Same | Hidden |
| Work cards (5 buttons) | HV10: loop plays from frame 0, tint fades .3s; title underline | Same as hover plus ring | MI1 scale .985; opens the dialog | Plays while 60% in view; tap opens | Frame 0 only |
| Project dialog | - | Native focus trap | CD7 clip-path from the bottom plus y 12, .5s `houseLo`, backdrop fade .3s; "Next project" TR1 title swap and body crossfade .35s; Escape, Close or backdrop click close; focus returns to the card | Full-screen sheet | Instant, loop paused with "Play loop" |
| Chart rows (8 per chart, one tab stop, arrows move) | HV7 others dim to .45; inline values (chart 1); head scale 1.4 (chart 2) | Same plus row outline | Readout line, live | Tap selects | No transition |
| Legend buttons | Other stages dim to .2 | Same | Click pins the highlight (aria-pressed); MI1 | Tap toggles | No transition |
| Days / Share of job | - | NV4 indicator | Segments tween x and scaleX .6s; tick labels TR1 crossfade .3s | Same | Instant |
| "Show the numbers as a table" | - | Ring | CD6 via `::details-content` and `interpolate-size`, .4s, marker turns 90°; Lenis and ScrollTrigger refresh after | Same | Instant |
| Text fields | Border to ink | Blue bar grows from the left .35s, label to blue, ring | MI4 errors: `aria-invalid`, message revealed with grid rows .25s, red marker bar, focus to the first invalid field | Same | Instant |
| Kind-of-work radio cards | Border to ink | Ring | MI3 badge pops .6 to 1, .25s, blue outline | Same | No pop |
| Form submit | - | - | Flip on the panel .5s plus .3s crossfade to "Request drafted for ..."; focus to that heading | Same | Instant |
| Contact rows | HV7 siblings dim to .5, glyph turns 8°, handle underline | Mirrored with `:focus-within` | External links in a new tab | Persistent underline | Dimming kept, no turn |

Removed during review (the accessory): HV5 magnetic pull on the three primary buttons. It stacked a second hover response on buttons that already fill from the entry edge and press, and it competed with the handles as the page's pointer-driven idea.

Deviations from the motion plan, with reasons: Play/Pause swaps its visible label (and so its accessible name) instead of also setting `aria-pressed`, since a name that changes plus a pressed state reads twice. CD6 animates `<details>` through `::details-content` with `interpolate-size: allow-keywords` instead of a `grid-template-rows` wrapper, which keeps the native element. Chart segments animate a transform on 1px-wide SVG rects, so their ends are square rather than 2px rounded.

Verified in Chromium on 2026-10-23: `CustomEase.setData` returns a new ease function and an existing tween keeps the old one, hence the `house` wrapper; Science Gothic renders at wdth 68 and 118 with lowercase and the accents in "Lucía Ferrón", and with `tabular-nums` its figures line up; CSS `cubic-bezier()` accepts y values outside 0..1 in transitions, and `--ease-lo` covers the properties that must not go negative.
