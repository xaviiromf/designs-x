---
title: Iris through the full stop
section: hero
subject: Programme launch and pass sales for the 11th Aldermouth Documentary Festival, nine days of documentaries in a small English harbour town (fictional).
aesthetic: The projection booth and cutting room before the print is laced: academy-leader grey, a carbon booth dark, projector-screen white and a red chinagraph pencil.
mode: dark
fonts:
  - Red Hat Display (Google Fonts, variable, 700-800 loaded)
  - Red Hat Text (Google Fonts, variable, 400-500 loaded)
js: Lifts a leader-card curtain, pins the hero so the title flies past its own full stop as it opens into an iris onto the programme, runs a scroll-driven footage counter, draws pencil marks on hover, and drives the mobile menu, the synopsis and pass dialogs and the pass reservation (validation, live total, in-dialog confirmation).
libraries: [GSAP 3.15 (ScrollTrigger, DrawSVGPlugin), Lenis 1.3.26]
tags: [film-festival, documentary, cinema, iris, scroll-pin, fly-through, typographic-hero, dark, dialog, form, gsap, lenis, detailed]
use_when:
  - A launch where one short statement is the brand and the page can afford one bounded scroll moment to move from that statement into the content (festivals, film or photo programmes, publishers, archives).
  - The headline ends in a full stop and the display face has a truly round one.
  - The visitor needs to reach a list (programme, line-up, catalogue) and buy from it without leaving the page.
avoid_when:
  - Pages where the first screen must show the product itself, or where a pinned stretch of scroll would get in the way of repeat visitors (dashboards, account pages).
  - Headlines without a closing full stop, or display faces with square or oval dots.
  - Brands that cannot carry red as anything but an alert colour.
---

## Why it works

**The bold idea: the full stop opens like an iris.** The headline is the festival's statement, "Nothing here is made up." When the reader scrolls, the title flies toward them around its own full stop. The full stop hollows into a ring and opens as an iris, the oldest transition in film grammar, onto the programme waiting inside it. The scene frame (the heading and the first two screenings) is offset so the opening-night time, 19:30, sits exactly on the full stop's centre: the first thing the ring shows is that time, then the row around it, then the heading. From .6 the frame slides and settles into place, and at .94 a red pencil ellipse draws round 19:30, so the projector iris hands over to the programmer's grease-pencil circle. As the aperture opens, projector masking fades in over the title (not under it), so the giant glyphs outside dim to grey and never merge with the white ring, while the inside starts a step lighter (`--lit`) and settles to booth as the heading comes to rest. The title is fully readable when the pin starts and "The programme" is fully readable when it ends, and a skip link, the header link and "Browse the programme" all land at the end of the pin with focus on that heading. Everything else on the page supports this one moment.

**The geometry is measured, not guessed.** The iris centre is the full stop's ink, not its box. The script renders "." at 400px on a canvas and reads the pixels (coverage-weighted centre, widest row, tallest column), because canvas text metrics are quantised to 1/64 em. Placed against a zero-size baseline marker before the glyph, that gives the dot's true centre and radius at any size. While the title scales 1 to 24 about that point (exponentially, `s = 24 ** t^1.3`, so every scroll step grows it by a similar factor: visible from the first wheel tick, a slight acceleration, no lurch at the end; a polynomial curve on a linear scale read as a dead start then a jump), the hole radius is `r(t) = max(rStop * s(t), r_iris(t))`, so the scaled dot never shows as a solid disc around the ring. The ring layer is the same circle plus a width that grows from 2px at the dot to 5px at full size, in screen white, under the hole layer, so it ends as a lens edge rather than a hairline. Stacking, bottom to top: the title layer (title and hero text, then the masking overlay, then the grain), the ring, the scene (lit layer, then the frame). The title is hidden outright at .9 as a safety only; by then every glyph has left the frame. `#selftest` asserts the invariant at 50 progress points, the end scale, no dead start (scale above 1.5 by .3) and no lurch (under x1.1 per 1/50 of the pin). The page-load grow (scale .8 to 1) runs about the same point, so the load is a quiet preview of the fly-through on the same axis.

**Red Hat Display, because its full stop is a true circle.** Checked in headless Chromium on 2026-10-22: at weight 800 the "." has a 162 x 162 px ink box at 1000px (fill ratio .787, against .785 for a perfect circle), and 64.79 x 64.93 px at 400px by coverage. Its centre sits .125em right of the pen origin and .072em above the baseline, radius .081em. Red Hat Display carries the title, headings, film titles and prices; Red Hat Text (a separate optical design for small sizes) carries body, credits, the counter and the form. Screening times are set in Red Hat Display 700 so a pencil ellipse round them reads as a hand mark. Tabular figures were checked on both: "1111" and "0000" each measure 240px at 100px.

**The world is the cutting room and the projection booth.** Four materials carry the page, and there are no images:
- The academy-leader card is the curtain: grey, with the slate "Aldermouth Documentary Festival / Programme 2027" and a red pencil line, lifted after a third of a second. The first plan had a yellow leader card; the art direction dropped golden yellow (the collection's most repeated accent) and chose academy grey, so grey is deliberate and the html first paint matches it.
- The red chinagraph pencil is how a programmer marks film. It circles opening night as the iris closes its hand-off, circles the five-film pass on scroll, circles each screening time and underlines "Synopsis" on row hover, underlines links and draws the focus ring. It never colours a heading.
- The lower-third name bar that identifies real people in a documentary is the credit on every programme row, and it is also the button: buttons are square bars, and on hover or keyboard focus a grey lower third wipes in from the left under a red pencil tick.
- The flatbed's footage counter: a small screen-white 35mm feet+frames readout (`0142+07`, 16 frames a foot) on a booth box at bottom centre, counting one frame per 4px of scroll. It reads the title sequence: it fades once you scroll 40px past the pin (or half the hero without one), and it is hidden under 760px, where it would sit on reading text. It replaces an earlier SMPTE timecode that duplicated gallery-skate-archive's burn-in.

**The palette is chosen, and the red is restricted (a reasoned exception to default 2).** The dark is `#1E1D24`, a carbon booth lifted toward violet-grey, not a tinted near-black. `--mask` `#15141A` is darker still, but it is never a page background: it is projector masking, faded to 72% over the title only while the iris opens, so the aperture reads as the lit picture. `--lit` `#2C2B35` is the aperture's first light, faded to booth by the end of the pin. Leader grey `#A6A4AD` is a working surface (bars, curtain, secondary text), not a tint. The red `#EC5A43` is the colour of a real red grease pencil and appears only as hand marks, the curtain mark, the five-film note and focus rings. Together with the large grey lower-third bars and the grey curtain, the page carries two materials beside the dark, not one accent on black. Contrast: screen on booth 15.05:1, leader on lit (the aperture while it opens) 5.67:1, screen on deck 12.94:1, leader on booth 6.79:1, leader on deck 5.84:1, booth on leader (bars, button hover) 6.79:1, booth on screen (primary button) 15.05:1, screen on booth (primary button hover bar, an inverted lower third, and the counter box) 15.05:1, screen on mask 16.49:1, leader on mask 7.44:1, red note text on booth 4.86:1, red focus ring on deck 4.18:1 (non-text, needs 3:1).

**Restraint everywhere else.** One text effect (the title grows on load about its full stop), no batched section reveals, no hover lift on rows, no cursor follower, no magnetic buttons. Grain lives only in the title layer and steps only while the pin is moving, so it reads as the projected print during the fly-through and never sits on programme, pass or venue text. Square corners and spaced rows come from lower thirds and leader cards; there are no hairline rules and no card grid.

## Do not touch

- **The iris invariant and its order.** The dot hollows to a ring first (0 to .08, title still at scale 1), then the title scales exponentially to `S_MAX` (24) by .9 while `r = max(rStop * s, r_iris)`. The scale uses a 2D transform (`force3D: false`), so the glyphs are repainted at size rather than stretched from a bitmap, and the stage's `overflow: clip` bounds the paint. Change the curve and keep the `max`, then run `#selftest`.
- **Measure the ink, not the box.** The `.bl` marker sits immediately before the "." inside `.stop`; offsets are summed with `offsetLeft/offsetTop` up to `.stage`, so they ignore transforms. Do not use `getBoundingClientRect` there. Before the web font is ready (the load grow), the ink uses the measured Red Hat Display values in `INK`; change them with the face.
- **The ends of the pin are readable.** The title grows during page load (not under the scrub), so it is complete at scroll 0. The scene frame (heading and the first two rows) is visible inside the iris from the first pixel and settles from 1.12 to 1 at .6 to .95, then holds. Anchors into the pin go to `st.end + 1`, never to the element's top, and so do deep links on load: `history.scrollRestoration` is `manual` and the hash is placed after the `load` event (the browser's own fragment scroll would land mid-pin). `#selftest` checks that `#programme` lands past the pin end.
- **The scene is one composed frame.** Pinned, `.frame` is a grid of at least `100svh`: heading in the upper half, the first two screenings at the foot. `measure()` offsets it (at its 1.12 start scale) so the centre of the first `.film__time` sits on the full stop's centre; `render()` eases the offset and scale out between .6 and .95. The first row (`.film--lead`) has its ellipse drawn by the pin, not by hover. If the content is taller than the viewport (360 x 640), the stage grows instead of clipping it. The other four rows follow the stage in normal flow.
- **The hero fits in one viewport.** `--fs-title` uses `svh`, and under 700px tall the hero tightens and drops the scroll cue, so the title, lede and buttons fit from 360 x 640 up (measured with CDP emulation at a true 360px: the title's top sits 39px below the header). The stage is clipped while pinned, so anything taller would be hidden until the pin ends.
- **Red only on pencil marks, the curtain mark and focus.** Body text never goes red except the five-film note, which is the programmer's handwriting and passes AA on booth only. The wordmark has no pencil line. On touch, links carry a 1px leader-grey underline and show the red line only while pressed or focused.
- **Button bars are a second copy of the label.** The script appends an `aria-hidden` `.btn__bar` holding a clone of `.btn__label`; when you change a label at run time, update both (`setLabel`).
- **Accessibility details.** The film row button is stretched over the row with `::after` and named "Synopsis of <film>"; focus draws the ring on the whole row. Native `<dialog>` with Escape and backdrop close, focus returned to the opener; the pass dialog focuses the chosen pass. Errors use `aria-invalid`, `aria-describedby` and a revealed message, never colour alone. The menu panel is `inert` when closed and `main` is `inert` while it is open; the header sits outside `main`, so Menu/Close stays operable. Nothing invisible takes focus: the hero text is `inert` once it has clipped out (pin progress above .12), and tabbing into the scene before the iris has opened jumps to the pin end, where that control is visible. The pass dialog's accessible name follows its content (`pass-title`, then `done-title`). The quantity stepper uses `aria-disabled` at its limits, so focus never moves and a held key cannot reverse. The counter, curtain and cue are `aria-hidden`, and the cue only shows in the motion branch (it describes the pinned iris). Dialogs animate `opacity`, never `visibility` (`autoAlpha`), because a hidden dialog drops the focus placed inside it.
- **No-JS and blocked-CDN paths.** The curtain lifts by CSS on its own after .6s. If the script arrives while that lift is running, the load reveals are chained onto it, re-hiding only what the card still covers; they are skipped only once the card has cleared. With the page script but no CDN, the dialogs, menu and form work without animation. Hidden states are only set once the script adds `.is-pinned`; without JS the page is a static layout and the pass and synopsis buttons need JS.

## Adapting

Start with the `:root` tokens. Keep the dark a chosen colour and keep the accent a material from the subject (a pencil, a stamp, a marker), restricted to hand marks and focus; re-check every pair in the contrast list above.

To use another face, its full stop must be round: open `#selftest` (it fails if the "." ink box is not square within 1px at 400px) and look at the ring at a few scroll positions. Heavier weights make a bigger iris origin. Keep the headline short enough for two lines at `12.4vw` on desktop (about 12 characters per line) and three at `19vw` below 992px.

Copy: one true, short statement ending in a full stop; a one-sentence lede with the dates and numbers; a programme opener of one heading and one sentence, followed in the scene by the first two programme rows. Programme rows take a when line, a title, a credit bar, a venue and a synopsis (in a hidden `<p>` read by the dialog). Prices and names live in `PRICE` and `NAME` in the script; the reference format and confirmation text are in the submit handler, and the reservation is held in the page only.

Retiming or removing effects:
- **Pin length:** `end: wide ? '+=180%' : '+=120%'`. Shorter than about 100% makes the fly-through feel like a jump.
- **Curtain:** delete `.curtain` and its CSS, and the `takeOver`/`late` branches; the title still grows on load. To change the hold, change the `.35` start and the CSS fallback delay (.6s, also in `remaining`).
- **Grain:** delete `.grain` (one element and one keyframe). **Counter:** delete `.tc` and its lines in `onScroll`. **Masking:** delete `.iris-mask`, `.iris-lit` and their tweens.
- **The whole signature:** remove the `document.fonts.ready` block. The page then behaves exactly like the reduced-motion layout, with the opener in normal flow under the hero.
- CSS durations and easings are tokens (`--dur-*`, `--ease-*`); GSAP durations sit next to their tweens in the one script.

| Token | Role |
|---|---|
| `--booth` | Page background, iris interior, text on bars and the primary button (`#1E1D24`) |
| `--deck` | Menu panel and dialogs, one step up from the booth |
| `--mask` | Projector masking, faded in over the title while the iris opens; never a page background (`#15141A`) |
| `--lit` | The aperture's first light inside the iris, faded to booth by the pin's end (`#2C2B35`) |
| `--leader` | Academy-leader grey: secondary text, credit bars, button hover bar, curtain card, html background before the curtain lifts |
| `--screen` | Projector-screen white: text, iris ring, primary button |
| `--pencil` | Red chinagraph: pencil marks, link underlines, button tick, curtain mark, focus ring, five-film note |
| `--font-display` / `--font-text` | Red Hat Display for title, headings, film titles, prices; Red Hat Text for everything else |
| `--fs-title` | `clamp(3.5rem, min(12.4vw, 21svh), 13rem)`, 800, line-height .86; `min(19vw, 15svh)` below 992px |
| `--fs-h2`, `--fs-film`, `--fs-price`, `--fs-lede`, `--fs-body`, `--fs-small`, `--fs-tc` | Type scale: headings, film titles, prices, lede, body, credits, footage counter |
| `--s-1` to `--s-9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112 px |
| `--gutter` | Side padding, `clamp(1rem, 4vw, 3.5rem)` |
| `--header-h` | Fixed header height, also the top padding of the pinned scene frame |
| `--measure`, `--measure-lede` | 60ch body, 34ch lede |
| `--ease-out`, `--ease-wipe`, `--ease-swap`, `--ease-release` | expo.out, expo.inOut, the label-swap curve, the press-release overshoot |
| `--dur-hover`, `--dur-tick`, `--dur-press`, `--dur-release`, `--dur-swap`, `--dur-field`, `--dur-err`, `--dur-header` | CSS interaction timings |
| `--ring-w`, `--ring-w-max` | Width of the iris ring beyond the hole: 2px at the dot, growing to 5px at full size |
| `--focus-w`, `--focus-off` | Focus ring 2px, offset 3px |
| `--grain-o` | Grain opacity (.07) |
| `--tick`, `--noise` | Mask images for the pencil tick and the grain tile (coloured by tokens through `mask`) |

## Motion

Ease family: expo throughout (`expo.out` entrances, `expo.inOut` wipes). Scrubbed tweens use `none`, with one documented exception: the fly-through scale (exponential, `24 ** t^1.3`) and the iris radius (`power2.in`) are curved inside the scrubbed timeline so the fly-past accelerates steadily. Everything runs inside `gsap.matchMedia` (motion, reduce, fine pointer, 992px); Lenis runs on `gsap.ticker` with `autoRaf: false` and stops while the menu or a dialog is open. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion / touch |
|---|---|---|---|---|
| Leader-card curtain lifts, slate leads it | LD3 | Page load (first visit in the session; CSS lifts it alone after .6s if the script is late or blocked, and a late script chains the reveals onto that lift) | Hold .35s, `yPercent -100` 1.1s expo.inOut, slate `yPercent -60` | Removed / same |
| Title grows toward the reader about its full stop, words fade in | TX8 (load half) | Load, .75s | Whole title scale .8 to 1 about the stop, 1.2s expo.out; word opacity .5s, stagger .08 | Final state / same |
| Lede, button row, then scroll cue, revealed as blocks | MD1 (inset only) | Load, 1.15s, 1.23s and 1.5s | `clip-path` inset from the bottom, .8s expo.out | Final state / same |
| Header items arrive | LD8 | Load, 1.3s | `y -8`, .6s expo.out, stagger .05 | Final state / same |
| Footage counter appears | LD8 | Load, 1.5s | fade .4s | Visible / same |
| Fly-through and iris (signature) | TX8 + clip-path circle | Scroll, pinned 180% from 992px, 120% below | Buttons clip and fade to .4 over 0-.06, hero text clips .03-.12; ring 0-.08; scale 1 to 24 .08-.9 (exponential); iris .08-.92; masking over the title 0 to .72 over .25-.75; lit aperture fades .6-.95; ring 2 to 5px; title hidden at .9 (safety); scene frame slides from time-on-the-dot and settles 1.12 to 1 over .6-.95; pencil ellipse round opening night .94-.99; hold | No pin, scene in normal flow / same scrub, shorter pin |
| Grain steps while the pin moves | MD4 | Pin progress between 0 and 1 | `.8s steps(1)`, 4 positions | Static / same |
| Footage counter | SC11 (readout) | Every scroll event | `round(y / 4)` frames as feet+frames, 16 a foot; fades .3s past the title sequence | Still updates (a readout) / hidden under 760px |
| Pencil circle round the five-film pass | SC16 | Scroll, row top reaches 70% | DrawSVG `0% 0%` to `0% 100%`, .7s power2.inOut, drawn once and never rewound | Drawn / same |
| Header hides reading down, returns reading up | NV5 | Scroll past 120px | .4s expo.out | Instant / same |
| Eased anchors with focus | NV6 | Header, menu, skip link, "Browse the programme" | `min(1.3, .65 + distance / 4000)`s; programme goes to the pin end | Instant jump plus focus / same |
| Mobile menu panel and Menu/Close label | NV1 + MI2 | Menu button, Escape, link | Panel clip .75s expo.inOut, links `yPercent 100` stagger .06; close reversed at 1.4x; label .35s | Instant / this is the touch menu |
| Buttons: lower-third wipe under a pencil tick, press | Lower-third variant of HV4 + MI1 | Hover, focus-visible, `:active` | Tick .2s, bar .35s expo.out (leader bar on outline buttons, an inverted booth bar inside the white border on solid ones); press scale .96 in .12s, release .4s overshoot | Instant colour change, no scale / `:active` bar and press |
| Wordmark dims | House | Hover, focus-visible, `:active` | Colour to leader, .35s; press scale .97 | Instant / press |
| Links: hand-drawn red underline that leaves forward | HV11 (line) | Hover and focus-visible on fine pointers | DrawSVG in .45s, out to `100% 100%` .35s | Static underline on hover and focus / 1px grey underline, red line while pressed or focused |
| Film rows: pencil ellipse round the time, pencil underline under "Synopsis", title nudges | HV11 + MI1 | Hover or focus-visible on the row | Ellipse and underline .45s in, .35s out forward; title `x .25em` .5s; press scale .985 | Marks static, colour only / "Synopsis" always shown, marks shown while the row is pressed, press |
| Synopsis and pass dialogs | CD7 | Open and close | In .45s expo.out (`y 16`, scale .98), out .28s; anchored 10svh from the top from 600px so errors and the confirmation change the height downward only; full-screen sheet under 600px `yPercent 100` .5s | Opacity .15s / sheet |
| Pass picker circles the chosen price | MI3 variant (CSS dashoffset) | Radio change | .4s | Instant / same |
| Name and email rules, errors | MI4 | Focus, invalid submit | Red rule `scaleX` .3s; message `grid-template-rows` .25s; focus to first invalid field | Instant / same |
| Quantity digit roll | MI2 + MI1 | Minus and plus buttons (`aria-disabled` at 1 and 6) | `yPercent ±70` to 0, .3s expo.out | Instant / same |
| Concession tick draws | MI4 | Checkbox | `stroke-dashoffset` .3s | Instant / same |
| Confirmation replaces the form | MD1 | Valid submit | `clip-path` inset .5s expo.out | Instant / same |
| Skip link slides in | House (no catalogue id) | Keyboard focus | `translateY` .35s | Instant / keyboard only |

Removed during review: the cursor follower (its labels only repeated visible text), magnetic buttons, and finally the idle nudge on the scroll cue (the cue is now still and fades with the hero text), so the only ambient motion on the page is the grain during the pin.
