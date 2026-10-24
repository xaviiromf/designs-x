---
title: Run-out groove footer
section: footer
subject: The site footer of Marram Records, a fictional independent vinyl label in Leith, Edinburgh (folk, drone and field recordings from around the Firth of Forth, pressed in runs of 300), sitting under the release page for MRM 041, Ailsa Grieve's "Haar Songs".
aesthetic: The end of a record side. An oxblood sleeve-board ground, a 12-inch LP drawn at true proportions with a working tonearm, dead-wax etchings and centre-label print, and the newest release's sea-glass colourway as the only bright colour.
mode: dark
fonts:
  - Radio Canada, variable wdth 75-100 and wght 300-700 (Google Fonts). The only text family. Wordmark at wdth 75 / 700, headings at wdth 87.5 / 600, body at wdth 100 / 400, catalogue numbers and durations at wdth 75 / 600 with tabular figures.
  - Reenie Beanie (Google Fonts). Only for the two hand-scratched etchings in the record's dead wax.
js: Scrubs the record's run-out with scroll (the label turns 720 degrees while the tonearm swings along its pivot arc and the lead-out spiral draws under the stylus), plays one needle drop at the page end (a 33 1/3 rpm spin-down, the locked groove and etchings drawing in, a pluck of the string divider), opens one native release dialog from the release rows, handles the release-emails form in place with a way back, bends the string divider toward the pointer, and scrolls back to the top with focus.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [footer, record-label, vinyl, music, tonearm, svg, scroll-scrub, footer-uncover, dialog, newsletter, dark, oxblood, gsap, lenis]
use_when:
  - The brand makes or sells something that has a physical end state you can draw truthfully (a record side, a reel, a print run, a tide table), so the end of the page can mean the end of the thing.
  - A small label, shop or publisher that wants the footer to carry its latest releases, a shop address, a demos or submissions policy and a release mailing list.
  - Pages long enough to scroll into the footer. The run-out needs at least 80vh of scroll between the record entering and the page end.
avoid_when:
  - Pages with no scroll, or a footer that is visible on load. The uncover and the run-out have nothing to play.
  - Brands with no turning or tracking object. Without the record this is a dark footer with a list.
  - Large sitemaps. The release list takes four rows; a twenty-link index will bury it.
  - Pages that already run a scroll-scrubbed object above. Two scrubs in a row compete.
---

## Why it works

**The bold idea: the page ends the way a record side ends.** The footer is one 12-inch LP drawn at true proportions in the viewBox (disc radius R = 1000): music grooves out to 0.52R, the wide-pitch lead-out spiral from 0.52R to 0.40R, the locked groove at 0.38R, the dead wax holding the etchings, a paper centre label at 0.333R and the spindle hole at 0.024R. A tonearm pivots in from the upper right. At the top of the page its stylus sits in the last music groove, while the stand-in above shows B5 of the tracklist. Scrolling plays out the side. The label and etchings turn 720 degrees, the arm swings inward along its real pivot arc, and the lead-out spiral draws exactly under the needle. The spiral is computed from the arm's geometry: at progress p the stylus radius is r(p), its screen angle is alpha (from the law of cosines in the pivot, centre and stylus triangle), and the groove point is drawn at (r, alpha minus the disc's turn). The groove therefore always runs under the needle. A self-test (`#selftest` in the URL) checks this and the arithmetic below.

- **One needle drop per arrival.** When the scrub reaches the page end, the stylus drops into the locked groove and a single sequence plays. The record turns once more, spinning down from 33 1/3 rpm: +360 degrees over 3.6s with `power2.out`, which starts at 2 x 360 / 3.6 = 200 degrees per second, exactly 33 1/3 rpm. The locked groove draws in 1.8s, one revolution at that speed. The two etchings, "MRM-041-B1" and "haar lifts by noon", scratch in through masks along their arcs, and the string divider takes one small pluck, the thump of the stylus landing. Everything comes to rest upright, so the centre label is readable at the scroll's resting point. It re-arms only after scrolling back above 90%, so it never becomes an ambient loop.
- **Truth to the object.** The sheen is a fixed conic highlight. It does not turn with the disc, because real light stays still while a record turns, so rotation reads only through the label print and the etchings. The grooves are a rotation-invariant repeating radial gradient. The centre label is flat paper with type only, with no hub and no spokes, which keeps it apart from contact-recording-studio's tape reel. The disc is only 1.08:1 against oxblood, so a 1px wax rim at 35% plus the sheen hold its edge.
- **Colour comes from the label's own objects.** The ground is oxblood (#2E1219), the label's house sleeve board. It is a chosen colour, not tinted black plus one accent (default 2). Near-black appears only on the disc, where it is the material. The stand-in page end is MRM 041's printed inner sleeve in sea-glass (#7FA79A) with vinyl ink (7.0:1). An earlier plan used a kraft dust sleeve, but that hex sat on top of process-timber-frame's green oak and nav-bakery's kraft. The release's own colourway is more specific: it is the sleeve this record ships in. The hype sticker is printed in the same colourway, a pale sea-glass (#A8D5C4, 10.7:1 on oxblood). It has exactly four jobs: the pre-order sticker, the Join fill (with an oxblood label), the stylus tip and the focus ring. There is no yellow anywhere.
- **Rows are sleeves.** Each release row ends in a 48px square sleeve holding a disc in that pressing's real vinyl colour (`--v` per row: sea-glass, black, smoke, oxblood marble). On hover or keyboard focus the disc slides 46% out of the sleeve and turns 120 degrees, and the other rows dim. On touch the disc peeks 18% at rest, so the cue is never hover-only. A row opens one native dialog with flat CSS sleeve art (title set like the wordmark), the format, the pressing details, the price and a mailto action.
- **Quiet type, one loud object.** Radio Canada is a broadcaster's face, which suits a label that lives on radio sessions. Its width axis does the hierarchy: the condensed wdth 75 for the wordmark and the catalogue numbers, 87.5 for headings and 100 for reading. Catalogue numbers and durations use tabular figures. These were verified in Chromium: '1111' and '0000' both measure 200px at 100px. The wordmark stays modest at step-3, and there is no giant bleeding brand name. Like footer-type-foundry, the design has no h1: the stub and the footer use h2s.
- **Rules mark real rows only.** The tracklist rows, the release rows, the string divider and the bottom-bar rule. No eyebrows, no middle dots, no monospace, no arrows. External links carry a hidden "(opens in a new tab)".
- **No dead ends.** Phone and email links are real `tel:` and `mailto:` destinations that open in a new tab. The phone number (0131 496 0412) is in Ofcom's drama range. Invented social profiles and a map link to a fictional address were removed, because they would land on someone else's page or on nothing. The shop gives written directions instead. The form never posts.

Review against the defaults, with the revisions made:

- R1: The stand-in started as pale paper (the warm-cream default), then became kraft. Kraft collided with two collection palettes, so it is now MRM 041's printed inner sleeve in its own sea-glass colourway. Pale paper survives only as text colour on oxblood and as the dialog surface.
- R2: The black ground with a yellow accent became oxblood plus a sea-glass sticker colour with four fixed roles.
- R3: There is no giant full-bleed wordmark. The record is the bold element.
- R4: Release meta is set in separate cells and commas. Catalogue numbers use the condensed width, not monospace.
- R5: The needle does not circle the locked groove forever. One spin-down plays per arrival.
- R6: A cursor-following sleeve preview became an in-row sleeve with a touch peek. Rows never fade in. Only their rules draw.
- R7: One ease family, `expo.out`, with two physical exceptions: the string's `elastic.out(1, .2)` and the turntable's `power2.out`.
- R8: DrawSVG animates stroke-dash and CU6 animates one path's `d`. See Do not touch.
- R9: Rotated text is readable at rest. The scrub ends at 720 degrees and the drop at +360. The legal line is also printed in the bottom bar.
- R10: The sheen stays fixed while the disc turns.
- R11: The uncover offset is in px (-0.35 x viewport height), because the phone footer is about 2,700px tall and -40% would push it far out of place.
- R12: The elapsed-time counter on the stub and a magnetic button were cut.

Deviations from the approved plan, and why:

- **The run-out starts when the tonearm's pivot enters the viewport,** not the record's top edge. That is 0.2 of the disc above the record box. The visitor sees the stylus in its starting groove before the side begins to play. At 1440x900 the run-out spans 957px of scroll (more than the 80vh it needs). At 390x844 it spans 2,304px.
- **The label prints "33 1/3", not the U+2153 glyph.** None of Radio Canada's Google Fonts subsets includes U+2153, so it would render in a fallback face.
- **The release rows switch to the five-column layout from a 760px container,** not 600px. Between those widths the title column shrank to about 120px and titles broke onto two lines. Below 760px the rows stay stacked, with the sleeve on the right.
- **Removed accessory: the wordmark and lede entrance (LD8) in the load sequence.** The uncover holds them under the inner sleeve's edge whenever the footer is on screen at load, so the entrance played where nobody could see it. The uncover already brings them in.
- **`preview.png` is taken at the page end after the needle drop,** with the label upright. At scroll 0 the screen is mostly the stand-in sleeve.

## Do not touch

- **The geometry is one system.** `PIVOT`, `ARM`, `R_MUSIC`, `R_RUNOUT`, `R_LOCK` and `TURNS` in the script, the locked-groove path, the etching arcs and the label radii in the SVG, and the 52% band in `.disc`'s gradient all assume R = 1000. If you change one, the spiral no longer runs under the stylus. Run `#selftest` after any change.
- **`TURNS` stays a multiple of 360, and the drop stays +360,** so the label rests upright at the page end.
- **The spin-down arithmetic.** `power2.out` over 3.6s starts at 200 degrees per second (33 1/3 rpm), and the locked groove draws in 1.8s (one revolution). Change both or neither.
- **The sheen never rotates with the disc.** Only the pointer tilt (at most 10 degrees) moves it.
- **Two paint-only exceptions to "transform, opacity, clip-path and filters only".** DrawSVG animates `stroke-dashoffset` on the spiral, the locked groove and the two etching masks. CU6 animates one path's `d` attribute. Each is a paint-only change on a single SVG node with no layout reads per frame. The spiral's points and the string's width are computed once per resize, never per frame. Do not extend this to other properties.
- **Triggers are measured on layout, not on transformed boxes.** The uncover transforms `.footer__inner`, so the run-out and the release rules use `offsetTop` positions (unaffected by transforms), and `ScrollTrigger.refresh()` runs after fonts load.
- **Hidden start states exist only under `html.js`,** which the script adds only when GSAP, its plugins and Lenis all loaded. The dialog, the form, the back-to-top link and the record's final pose are bound before that check, so a blocked CDN leaves a complete, working, static footer.
- **Accessibility.** The record is `role="img"` with an `aria-label` naming the etchings, and its printed text sits inside it. The release rows are real buttons with full `aria-label`s and `aria-haspopup="dialog"`. The dialog is a native `showModal()`: Escape, the backdrop and Close all close it, focus returns to the row, and Lenis is stopped while it is open. The HV1 copy is a pseudo-element with empty alt text (`content: attr(data-text) / ""`), so it is never read twice. The error message has a reserved slot, `aria-invalid` and `aria-describedby`, and focus returns to the field. The confirmation takes focus (`tabindex="-1"`). The focus ring is `--sticker` on oxblood, `--vinyl` on the sea-glass stub and `--oxblood` in the dialog. The native cursor is never hidden.

## Motion

House ease: `expo.out` in GSAP and `--ease: cubic-bezier(.16, 1, .3, 1)` in CSS. Scrubs use `ease: 'none'`. The only exceptions are `elastic.out(1, .2)` for the string release and `power2.out` for the spin-down. Everything is built inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `sheet` (max-width 599px) conditions. Lenis runs with `lerp: .1`, `autoRaf: false` on `gsap.ticker`, `lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`. The cleanup removes the tick, restores lag smoothing, destroys Lenis, flattens the string and leaves the record in its final pose. Reduced motion means native scroll, no Lenis, and every element in its final state.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Stub title and subline rise | TX1 | `document.fonts.ready` (1.5s cap), t0 | Masked lines (padded .1em for descenders), yPercent 110 to 0, 1.0s expo.out, stagger .08 | Static |
| Tracklist rules draw | SC16 | Load, t0.15 | scaleX 0 to 1 from the left, 0.9s expo.out, stagger .07 | Static |
| Track rows rise | TX1 | Load, t0.30 | Each row inside its own clip, yPercent 110 to 0, 0.8s expo.out, stagger .07 | Static |
| Side length line | Fade | Load, t0.90 | autoAlpha 0 to 1, 0.4s | Visible |
| Inner sleeve slides off the footer | SC8 | Footer, `clamp(top bottom)` to `clamp(top top)`, scrubbed | `.footer__inner` y from -0.35 x viewport height to 0; the veil goes from .5 to 0 over the first 70% | Static footer, no veil |
| The side plays out (signature) | Custom scrub + DrawSVG | From the tonearm pivot entering the viewport to the page end, scrubbed | Label and etchings rotate 0 to 720 degrees; the arm rotates to put the stylus at 0.52R to 0.40R; the spiral draws `0%` to the stylus's arc length | Final pose: spiral drawn, arm in the locked groove, label upright |
| Needle drop | Custom + DrawSVG + CU6 | Scrub progress above .995, once; re-arms below .9 | Arm drops to 0.38R, 0.3s expo.out; stylus tip scale 1 to 1.35 to 1, 0.3s; spin +360, 3.6s power2.out; locked groove draws in 1.8s linear from t0.2; etchings draw in 1.4s power1.inOut from t0.2 and t0.55; string pluck +6px then 1.6s elastic.out(1, .2) | None; final state shown |
| Lift on the way back up | Custom | Progress below .9 | Drop killed; disc to the nearest upright, arm back to the lead-out, groove and etchings undraw, 0.4s expo.out | None |
| Release-row rules draw | SC16 | List top at 90% of the viewport, once | scaleX 0 to 1 from the left, 1.0s expo.out, stagger .08 | Static |
| Release rows | Sleeve slide + HV7 + MI1 | Hover (fine), focus-visible, press | Disc translateX 0 to 46% and rotate 120 degrees, 0.6s; back 0.35s; other rows to opacity .5 in 0.3s; press scale .985 in .12s, release .45s; touch: disc peeks 18% at rest | Static 18% peek, instant dimming |
| Release dialog | CD7 | Row click; Close, Escape or backdrop | Panel autoAlpha 0 to 1, y 12 to 0, scale .98 to 1, 0.45s expo.out; under 600px a full-height sheet, yPercent 100 to 0; the sleeve's disc slides out 0 to 38%, 0.8s, delay .15; closing is the same tween reversed in 0.3s | Fade .15s, disc shown out |
| Links, Close, Use a different address, Back to the top | HV1 + MI1 | Hover and focus-visible (fine pointers), press | Two-copy label roll, 0.45s `--ease`; static 1px wax underline; press scale .985 | No roll; underline 1px to 2px |
| Reserve and Join buttons | HV1 + instant fill + MI1 | Hover, focus-visible, press | Label roll 0.45s; fill inverts at once (oxblood in the dialog, sea-glass sticker for Join) | Instant colour change |
| Join confirmation | MI2 + TX1 | Valid submit | Label swaps "Join the list" to "Joined" in a mask, 0.35s; fields fade out 0.3s; confirmation lines rise 0.8s expo.out, stagger .08; focus moves to the confirmation | Instant swap |
| Back to the form | Fade | Use a different address | Form fades in over 0.45s, address kept, focus in the field | Instant |
| Email field | MI4 | Hover, focus, invalid submit | Rule wax to paper in .25s; a paper rule draws scaleX 0 to 1 in .45s on focus; the error reveals in a reserved slot with clip-path inset(0 0 100% 0) to inset(0) plus opacity, .25s | Instant |
| Checkbox | MI4 | change | Tick stroke-dashoffset 1 to 0, 0.3s; box border to paper on hover | Instant |
| String divider | CU6 | Pointer within ±48px of the line (fine pointers) | Control point follows (x, clamp(dy x 2, ±32)), bending the curve at most 16px, 0.2s with overwrite; release 2s elastic.out(1, .2); rebuilt on resize | Straight line |
| Vinyl sheen tilt | HV12 | Pointer over the footer (fine pointers) | Fixed sheen rotates by nx x 10 degrees, quickTo 0.8s power3.out; back to 0 on leave | Static sheen |
| Back to the top | Lenis scroll | Click | `lenis.scrollTo('#top')` over min(1.3s, 0.65s + distance / 4000), then focus `#top`; the run-out unwinds on the way up | Native jump plus focus |

## Adapting

1. **The stand-in stub is page content above. Replace it with yours.** `#top` lives on the stub (`tabindex="-1"`). When you delete the stub, re-point "Back to the top" to your page's top id, and give that element `tabindex="-1"` so it can take focus. Keep at least 80vh of scroll between the record entering and the page end, or 720 degrees will snap. If your page is short, give the content above a `min-height` of 100svh.
2. **Map the brand onto the tokens, keeping the roles.** `--oxblood` is the ground. `--paper` is primary text, the centre label and the dialog. `--wax` is secondary text, etchings, rules and the arm. `--sticker` has four jobs only: the pre-order sticker, the Join fill, the stylus tip and the focus ring. `--seaglass` and `--seaglass-ink` belong to the stand-in. Recheck contrast: wax needs at least 4.5:1 on the ground and the disc.
3. **Releases.** Rows and their dialog data live in two places: the buttons (`data-release`, `--v`, `aria-label`) and the `REL` object in the script (format, pressing, price, about, status, action, mail subject). Keep about four rows. More than six turns the record column into a gap. For a marbled vinyl, set `--v2` to a conic gradient. The label print (title, catalogue number, side, speed) and the etchings are SVG text inside `#spin`. Keep the etchings to about 18 characters, so they fit their arcs.
4. **Copy.** Shop, demos and emails hold two or three short paragraphs each. The email confirmation names the address and the next release.
5. **Retime or remove motion.** CSS transitions read the `--t-*` tokens and `--ease`. GSAP durations are literals in the script, next to comments that give the arithmetic. To retime the spin-down, change 3.6 and 1.8 together (1.8 = 360 / 200). To remove the uncover, delete the SC8 timeline. To remove the needle drop, delete `arrival()`: the scrub still ends in the lead-out. To remove the string, delete `.string` and the CU6 handlers. Use a plain rule instead. To drop the signature altogether, keep the record static in its final pose (`pose(1, 1)`). The footer still works.
6. **In a framework,** render the markup statically and port the script as one effect. Bind the dialog, form and back-to-top outside the motion code, and return the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--oxblood` | Footer ground, the label's house sleeve board; dialog ink; label print |
| `--vinyl` | The disc only; stub ink (7.0:1 on sea-glass); stub focus ring |
| `--paper` | Primary text on oxblood (14.0:1), centre label, dialog surface |
| `--wax` | Secondary text (6.3:1 on oxblood, 6.9:1 on vinyl), etchings, rules, the arm |
| `--sticker` | Pale sea-glass hype sticker (10.7:1 on oxblood): pre-order, Join fill, stylus tip, focus ring |
| `--seaglass`, `--seaglass-ink` | MRM 041's printed inner sleeve (the stand-in) and its secondary ink (4.95:1) |
| `--dialog-ink-2` | Secondary text on paper (5.6:1) |
| `--gloss`, `--groove`, `--rim`, `--rule`, `--board` | Disc bands, groove ridges, the disc's 35% wax rim, row rules, sleeve board in the rows |
| `--focus` | Focus ring colour, redefined per surface |
| `--font-text`, `--font-etch` | Radio Canada and Reenie Beanie, with fallbacks |
| `--wdth-mark`, `--wght-mark`, `--wdth-head`, `--wght-head`, `--wdth-cat`, `--wght-cat` | Axis presets: wordmark 75/700, headings 87.5/600, catalogue numbers 75/600 |
| `--step--1` ... `--step-4` | Type scale, ratio 1.25 (13px to clamp(40px, ..., 72px)) |
| `--lh-body`, `--lh-tight`, `--lh-head` | Leading |
| `--s-1` ... `--s-10` | Spacing on a 4px base, 4 to 128 |
| `--gutter`, `--col-gap`, `--max`, `--measure` | 16px to 48px gutter, column gap, 1360px container, 62ch measure |
| `--disc` | Record diameter: clamp(420px, 40vw, 620px) from 992px, min(150vw, 600px) below |
| `--sleeve`, `--thumb`, `--r-ui` | Row sleeve size, the inner sleeve's thumb cut-out, 3px radius for buttons and inputs |
| `--ease`, `--t-*` | The house curve and the CSS transition durations |
