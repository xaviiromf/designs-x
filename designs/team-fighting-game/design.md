---
title: Fighting-game team character select
section: team
subject: Kestrel Row, a fighting-game team from Valparaíso with six players, one coach and one analyst, introducing its eight people, showing five sets from 2026 and taking requests for a coaching set.
aesthetic: An arcade character-select screen on a wine-dark cabinet. Eight procedural pixel portraits in a 4x2 grid, a red player-one cursor, a red-against-blue versus band, lime health bars and yellow round calls, set in a display face built from square modules.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, set at ELSH 2 and ELGR 1 so the modules are square. Used for the H2 at 700, the selected handle, the set scores and "Set requested" at 800, and the diegetic calls (SET 1, GO, VS, the versus names) at 800 to 900.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything you read, at 400 for body and 600 for buttons, h3, slot names, links and definition values, with tabular-nums for scores, years and dates.
js: Builds eight 20x20 portrait sprites from feature data and makes their pupils follow the pointer, touch or keyboard focus, runs the roster as a roving-tabindex grid with an impact slam on selection, drives a sticky versus band from scroll, drains the result bars, and validates the coaching form with an in-place confirmation (nothing is sent).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [team, esports, fighting-game, arcade, pixel-art, character-select, canvas, portraits, eye-tracking, form, dark, gsap, lenis]
use_when:
  - A team of about six to ten people where each person has a handle, a role and a few comparable facts, and the audience knows game interfaces.
  - Esports teams, game studios, speedrunning or tabletop groups, where picking a person is more natural than reading a wall of cards.
  - The team page also has to carry recent results and one contact action, and there is no photography.
avoid_when:
  - Teams that need real photographs (clinics, law firms, anyone whose face is the trust signal). The portraits are drawings and say so.
  - More than about twelve people. The grid stops being a select screen and the pointer signature gets noisy.
  - Light, quiet or corporate brands. Seven saturated hues on wine are loud by design.
  - Pages that already run a pointer effect or a pinned scroll scene directly above or below.
---

## Why it works

**The one bold idea: the team page is a character-select screen, and all eight portraits watch you.** Eight pixel portraits sit in a 4x2 grid. A red player-one cursor (four corner brackets and a blinking "1P" tag) jumps to whichever slot the pointer or the keyboard focus is on. Picking a slot locks it, and that person slams into the large panel: the content cuts in from the left in three frames, the sprite turns white for one frame, the stage shakes for four, and the stat pips fill one per frame. Wherever the pointer is in the section, every portrait's pupils step among nine positions to look at it. Everything else on the page is quieter and uses the same small vocabulary: brackets, frames, hard cuts.

- **The portraits are data, not images.** Each face is a 20x20 sprite built at load from a small feature record (skin tone, hair shape and colour, glasses, headset, cap, beard, earrings, shirt). The colours come from the `:root` tokens, and a one-pixel ink outline is added around the silhouette so every skin and hair tone reads on the same booth colour. The eyes are left clear in the sprite and painted per frame: a 3x2 white with a one-pixel pupil that sits in one of three columns and is the top pixel, both pixels (straight ahead) or the bottom pixel. That gives the 3x3 set of gazes without bug eyes. The same sprite is shown at 3x to 6x in the grid and 5x to 12x in the panel, always at a whole multiple, so pixels stay square.
- **Seven hues, one job each.** Red (`--p1`) is player one, which means the visitor and the visitor's side: the cursor, the locked slot, the primary button, the focused field, the chosen level, Kestrel Row in the versus band and in results. Blue (`--p2`) is the other side: "the bracket", opponent names, the secondary button. Yellow (`--call`) is the announcer: SET 1, GO, VS and the focus ring. Lime (`--hp`) is health and appears only in the result bars. Orange (`--hit`) is damage: the ghost behind a draining bar, the clash sparks, the block-stun flash and error text. Magenta (`--staff`) marks the two people who do not compete: the coach and analyst tag, their slot corner and their shirts. Bone and mist are the two neutrals for text. The ground is a chosen wine (#2B0F1E), not a tinted black.
- **The grid is a real control.** Slots are `<button>`s with `aria-pressed`; the grid is one tab stop with roving tabindex; arrow keys move (wrapping in a row, toggling between the two rows), Home and End jump, Enter or Space locks. The panel is an `aria-live="polite"` region, so a screen reader hears the new person. Hover moves only the cursor; the panel changes on click or Enter, so nothing is read out by accident.
- **Results are bars, with the score as text.** Each of the five sets shows both sides' health: one minus games lost over three. The loser's bar is empty. When a row enters view both bars drain from full in steps, an orange ghost trails the lime and catches up, and the empty bar blinks twice. "Kestrel Row 3 to 1 Salt Circuit" stays as real text for everyone.
- **The versus band earns the roster.** Between the intro and the roster a red side ("Kestrel Row") and a blue side ("the bracket") close along a ten-step stair seam as the visitor scrolls, meet with a two-frame spark burst and a VS, hold, and part over the roster. The cursor lands on the first slot and the captain slams in as they open.
- **Words.** Handles are Valparaíso things (a pelican, a hill, a sea lion, a trolleybus, coastal fog, a funicular, a lighthouse, a spreadsheet). Games are named by genre only. The coaching form says what a set is, what it costs and what happens next; errors say what to type.
- **No dead ends.** The two intro buttons anchor to the form and the results. Each person has one external channel link (Twitch or YouTube) and the form copy has one Discord link; all open in a new tab with `rel="noopener"` and a visually hidden "(opens in a new tab)". The form validates in place and moves focus to the first field that needs fixing. The confirmation names the chosen person and the address, lists the next three steps, and "Request another set" brings the form back with the name, address and level kept and focus in the select.

**Arcade series.** This design belongs to the arcade series, which shares Handjet and Host Grotesk with cta-indie-game on purpose, at the owner's request. It differs from cta-indie-game in almost everything else: a wine ground and seven working hues instead of navy with two accents; hard-edged tiles with lock-on brackets instead of pixel-notched tiles; portraits that look at the pointer instead of a lattice that lights under it; a versus clash on scroll instead of a rising wordmark; no grain, no dialog, no SplitText.

**New to the collection:** portraits whose pupils track the pointer in nine quantised positions (with blink and idle bob); a toggled player-one bracket cursor; the impact slam (three-frame cut-in, one-frame white sprite, four-frame shake, pip fill); the versus clash with a stair seam and spark burst; damage-ghost health bars; a round call as the load moment; lock-on brackets with hit-stop and recoil on buttons; the three-hit underline; the "1P" field tag and block-stun error flash; stepped-pip radios; a nodding confirmation portrait.

Deviations from the brief, and why:

- **The cursor lands and the first person slams in when the versus sides part, not straight after GO.** The roster is below the fold at load, behind the versus band, so a slam at load would play unseen. At GO the buttons' brackets appear and the intro takes a four-frame shake; the landing waits for the reveal.
- **The versus band is a CSS sticky layer, not a GSAP pin.** The band sticks for one viewport height while the roster scrolls up underneath it, so the sides can part over the real roster. The sides close during the band's approach, meet as it sticks (half way through the 200vh range), hold for a fifth of the range and then part. The visible result matches a pin; there is no pin spacer to manage.
- **Hover moves the cursor only.** A hover preview that also swapped the panel made the live region speak on every pass of the mouse. Click, tap, Enter or Space selects.
- **Brackets rest 9px outside the button, not 8px,** so the three steps are whole pixels (9, 6, 3, 0).
- **The confirmation portrait nods three times and stops.** A looping nod next to text the visitor is reading was a distraction.
- **Stat pips are bone, not a hue.** They are not health, damage or a side, so they take the neutral.

## Do not touch

- **Portrait tones never become interface colours, and interface hues never become decoration.** `--skin-*`, `--hair-*`, `--gear`, `--ink` and `--booth` are read by the sprite builder and the booth only. If a hue appears, it must mean its job (see the token table).
- **The eyes stay clear in the sprite.** Hair, glasses, caps and headsets must not cover x 6-8 and 11-13 on rows 8-9, because `paint()` draws the whites, lids and pupils there on every change. A new accessory that crosses the eyes will be overpainted.
- **Sprites are shown at whole multiples of 20px.** `.booth canvas` uses `round(down, 100%, 20px)` and `--big` is 240, 160 or 100. A fractional scale gives uneven pixels.
- **The cursor is toggled, never tweened.** `.is-cur` moves between slots in one frame. A sliding cursor is a different effect (and one the collection already has).
- **Selection is separate from the cursor.** The cursor shows where you are; `aria-pressed="true"` and the red name bar show who is locked. Keep both, and keep the grid as one tab stop.
- **The versus names are never shown cut.** While a side is still sliding, its name stays hidden; it appears whole, by hard cut, once the side covers it and the band has risen enough for it to be on screen (`fit()` in the script measures this from the seam step that crosses the label). Only the stepped colour wedges peek into the first screen. Do not let the names ride in with the sides.
- **The versus band needs the roster directly after it, inside `.arena`.** The band is sticky within `.arena` and overlays the roster for the rest of the roster's height with `pointer-events: none`. Do not give an ancestor `overflow: hidden` (it breaks sticky; the section uses `overflow-x: clip`). The script scrolls past the clash when keyboard focus enters the roster, so focus never sits under the closed sides; keep that handler if you keep the band.
- **Hidden states exist only under `html.js:not(.go)` or under `.is-wait`, which the motion branch adds and removes.** With the CDN blocked neither class is ever set: everything is visible and the roster, arrow keys and form work in plain JavaScript. Under reduced motion `.go` is added at once.
- **Motion is in frames.** Timings are multiples of `--d-frame` set with `steps()` or instant `set` calls. Do not replace them with eased tweens; the page should feel like a machine with a frame rate.
- **Health means one thing.** A bar's length is 1 minus games lost over games needed. If the set length changes, change `--f` on each `.bar` and the sentence under the heading together.
- **Accessibility.** Slot canvases are `aria-hidden` and the visible handle is the button's name, with the role added in hidden text; the large portrait and the confirmation portrait are `role="img"` with the handle in the label. The versus band and round call are `aria-hidden`. The form uses `novalidate`, its own messages, `aria-invalid` and `aria-describedby`; the error lines are reserved so nothing shifts. The level radios are native inputs laid over their labels, so arrow keys work. Every target is at least 44px. Text contrast is in the token comments.

## Motion

House easing: none. Everything moves in frames. One frame is `--d-frame` (0.06s); positions change with `gsap.set` at frame times or with `steps(n)` eases, and colours and visibility change by hard cut. Everything is built inside `gsap.matchMedia` (no-preference, reduce, fine pointer). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, and `lenis.on('scroll', ScrollTrigger.update)`. The round call waits for the fonts (`document.fonts.ready` plus a Handjet load, 1.5s timeout) and for a visible tab. No loop runs per frame: eye tracking is event-driven, blink and bob are timers, and both stop when the roster is off screen (IntersectionObserver). Only transform, opacity, filter and canvas pixels animate.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Round call | A fixed band across the middle of the viewport, shown by class changes only | Load (fonts ready, tab visible, section at the top) | SET 1 as a thin bar for 1.5 frames, then the full yellow band for 0.45s; GO inverted and 1.35x for 1.5 frames, then settled for 0.36s; cut | No call |
| Brackets arrive, intro shake | Class cut, then four `set` frames | On GO | Button brackets appear and blink once (0.12s); intro x +2, -2, +2, -2, 0, one frame each | Brackets visible, no shake |
| Versus clash | CSS sticky band; one scrubbed ScrollTrigger sets both sides' translateX, snapped to 24px | Scroll, from the band entering the viewport to one band height after it sticks | Sides close during the approach, meet as the band sticks, hold for 20% of the range, part over the last 30%. Each name is counter-moved so it stays in place, and is shown by hard cut only while its side covers all of it and the whole name is on screen | Static banner with the sides met, no stick |
| Spark burst and VS | Two box-shadow spark sets and an inverted VS, switched by class | The sides meeting (either scroll direction) | Frame A plus inverted VS for 1.5 frames, frame B for 1.5 frames, then VS alone | VS shown, no sparks |
| First landing | Cursor class plus the impact slam | First time the sides are 45% open | See impact slam | Captain shown from the start |
| Eye tracking (pointer signature) | Canvas repaint of the eyes only, when a portrait's quantised gaze changes | pointermove on the section (fine pointers); recomputed on scroll | Eight directions by angle, straight ahead within 0.55 of a portrait's width; instant | Eyes straight ahead |
| Eye tracking, touch | Same | pointerdown: they look at the last touch point | Instant | Eyes straight ahead |
| Eye tracking, keyboard | Same | focusin with :focus-visible: they look at the focused control | Instant | Eyes straight ahead |
| Blink | Two extra eye frames (half lid, shut) | Timer, a random person every 0.7 to 2.5s, only while the roster is in view | 70ms half, 100ms shut | None |
| Idle bob | The locked person's head drops 1px and returns (second sprite) | Interval while the roster is in view | Every 0.52s | None |
| Player-one cursor | `.is-cur` toggled between slots; the "1P" tag cuts between two solid frames, wine on red and wine on bone (a red layer behind the text at opacity 1 / 0) | Hover (mouse and pen), focus; returns to the locked slot when both leave. Touch: lands on the tapped slot | Instant jump; tag blink 0.8s steps, paused off screen | Instant jump, tag steady |
| Impact slam | `set` frames on the panel content, a filter class on the sprite, `set` frames on the stage | Click, tap, Enter or Space on a slot | Content x -48, -16, 0 (frames 0-2); sprite white for frame 2; stage +2/-2, -2/+2, +2/+2, -2/-2 (frames 3-6); pips on one per frame from frame 7 | Instant swap, pips set |
| Lock-on brackets | Four corner elements, CSS transform with `steps(3)`, then a one-off opacity blink; label and fill colours swap by cut | Hover, :focus-visible; touch gets it on pointerdown for 0.5s | 9px to 0 in 0.15s, blink 0.12s; reverse on leave | Brackets on the corners at once |
| Hit-stop and recoil | `filter: invert(1)` held, then two `set` frames on y | pointerdown (all pointers), Enter or Space | Inverted and frozen for 0.08s, then y -2, +1, 0, one frame each. Without the motion layer, :active inverts | Colour swap only |
| Three-hit underline | Three segments with staggered zero-duration opacity transitions; the third is scaleY 1.5 for one frame | Hover, :focus-visible, :active (touch) | Hits at 0, 0.06 and 0.12s; clears at once on leave | All three at once |
| Result bars | scaleX with `steps()` on the lime bar and the orange ghost; opacity `set` frames for the blink | Each row at top 82%, once | Lime drains from 0.15s over 0.5s (3, 6 or 9 steps); ghost follows 0.35s later over 0.4s in 4 steps; an empty bar blinks twice, 0.1s per frame | Final lengths |
| Field focus | "1P" tag and a red left edge, both by cut | focus-within (pointer, touch and keyboard alike) | Instant | Same |
| Block stun | Orange overlay, opacity keyframes with `steps(1)` | Invalid submit, on each field that fails | Two flashes in 0.32s; message appears at once; focus moves to the first failing field | Message and orange border, no flash |
| Level pips | Native radios; `:has()` fills every step up to the checked one | change (click, tap, arrow keys) | Instant | Same |
| Confirmation | Hard swap; sprite white for one frame; head drops 1px and returns | Valid submit | Three nods, 0.16s per frame, starting 0.2s after the swap; focus moves to "Set requested" | Instant swap, still portrait |
| Back to the form | Hard swap | Request another set | Instant; name, address and level kept, select cleared and focused | Same |

## Adapting

1. **Replace the people.** Edit the `P` array in the script: handle, name, role, the three definition values, three stats out of five (`st`, with `sk` for custom labels), a two-sentence bio, a channel (`Twitch` or `YouTube`, or add to `LINK`) and the feature record `f`. Then update the eight slot buttons (handle and hidden role), the static first-person panel markup, and the `<select>` options, whose values are indexes into `P`. Eight people fill a 4x2 grid; for six or ten change `repeat(4, ...)` and the arrow-key arithmetic in the grid's `keydown` handler (it assumes rows of four and two rows).
2. **Draw new faces.** `f` takes `skin` (1-5), `hair: [shape, colour]` (shapes: crop, short, long, bob, afro, bun, curtains; colours 1-5), and optional `specs`, `set` (headset), `cap` (a colour token name), `beard`, `ring` (earrings), `shirt` and `trim` (token names), `mouth` (smile, small, grin). To add a hairstyle, add a list of `[x, y, w, h]` rectangles to `HAIR`; keep clear of the eye cells. Check each face at 3x and at 12x.
3. **Map the colours, keeping the jobs.** Your brand's primary goes on `--p1` only if it can stand for "you". The opposing colour goes on `--p2`. Keep a separate colour each for calls, health, damage and staff, or drop a job and its uses together. Text on filled colours is `--wine`; check each fill against it (4.5:1) and each coloured text against `--wine` and `--panel`.
4. **Copy.** The H2 is two lines at 108px (about 30 characters). Handles are one word, up to about nine characters, or the slot name truncates on phones. Results take five rows; each needs an event, one sentence of outcome and place, two names, a score and two `--f` values. The versus names are short (two words each); change them in the `.vs-side` spans.
5. **Retime or remove motion.** Frame length and the main durations are the `--d-*` tokens. To remove the versus scene, delete `.versus` and the "Versus clash" block, and call `fill(sel)` directly (the landing then never waits). To keep the banner but not the scroll scene, remove only the `html.fx .versus` rules and that block. To remove the round call, delete `.call` and the load timeline and add `.go` at once. To stop eye tracking, delete the "Eye tracking" block; portraits stay drawn, looking ahead. The slam, bars and buttons are independent of each other.
6. **Fonts.** If Handjet fails the display text falls back to Arial Narrow; nothing is measured from the font. Any display face built from modules on a grid works; keep the modules square.
7. **In a framework,** render the markup statically, keep the plain-JS part (sprites, roster, seam, form) as one mount effect, and port the motion part as a second effect that returns the `gsap.matchMedia` cleanup (it removes listeners and timers, kills timelines, destroys Lenis and restores every class and inline transform).

| Token | Role |
|---|---|
| `--wine` | Page ground; text on every filled colour; field and bar grounds |
| `--panel` | Raised tiles: the selected-person panel, slot name bars, the form; row rules in results |
| `--booth` | Backdrop behind every portrait; the rule in the confirmation (decorative) |
| `--ink` | Sprite outlines, pupils, shut eyes, glasses; never text |
| `--bone` | Text (16.1:1 on wine, 14.3:1 on panel); lock-on brackets, lit stat pips, eye whites, teeth |
| `--mist` | Secondary text, control outlines, resting link dashes, empty pips (9.4:1 on wine, 8.3:1 on panel) |
| `--p1` | Player one and our side: cursor, locked slot, primary button, field focus, level pips, link hits, "Kestrel Row" (5.4:1 on wine, 4.8:1 on panel; wine on it 5.4:1) |
| `--p2` | The other side: opponent names, "the bracket", secondary button (6.3:1 on wine, 5.6:1 on panel; wine on it 6.3:1) |
| `--call` | Round calls (SET 1, GO, VS) and the focus ring (13.6:1 with wine) |
| `--hp` | Health in the result bars only |
| `--hit` | Damage: bar ghost, sparks, block-stun flash, error text and error borders (8.5:1 on wine, 7.5:1 on panel) |
| `--staff` | Coach and analyst: role tag, slot corner, shirts (wine on it 6.1:1) |
| `--skin-1` ... `--skin-5`, `--hair-1` ... `--hair-5`, `--gear` | Portrait tones, read by the sprite builder only |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2`, `--t-handle`, `--t-score` | Type scale: 13, 17, 22.5, 30, the handle at clamp(56px, 6.2vw, 88px), scores at 56px (40px on phones), H2 at clamp(48px, 7.4vw, 108px) |
| `--lh-body`, `--lh-lede` | Line heights: 1.55 and 1.45 |
| `--cell`, `--s1` ... `--s8` | The 12px cell (8px on phones) and the spacing scale in half and whole cells |
| `--tap` | Button and field height, 48px |
| `--big` | Large portrait size: 240, 160 or 100px, always a multiple of 20 |
| `--max-w` | Content width, 1296px |
| `--d-frame` | One frame: slam, shakes, pips, recoil, sparks (0.06s) |
| `--d-lock`, `--d-hitstop`, `--d-hit`, `--d-stun` | Bracket contraction, hit-stop hold, one underline hit, the two-flash block stun |
| `--d-p1`, `--d-bob`, `--d-call` | The 1P tag blink cycle, the idle bob interval, how long SET 1 holds |
| `--d-drain`, `--d-ghost-lag`, `--d-ghost` | Health bar drain, how far the ghost trails, the ghost catching up |
