---
title: Merriton Marathon entries
section: cta
subject: The fictional Merriton Marathon opening entries for its race on Sunday 18 April 2027 (16,000 places, first come first served, entries close Monday 30 November 2026).
aesthetic: Race-day kit. Tyvek bib white, asphalt ink, the painted blue racing line that marks the shortest route on a marathon road, and hi-vis vest yellow-green kept for the wave you pick. One condensed grotesque used at bib-number weight.
mode: light
fonts:
  - Pathway Extreme (Google Fonts, variable opsz 8-12, wdth 75-100, wght 100-900), the only family
js: Fits the MERRITON wordmark to the measure and runs a stride bulge through its letters (load sprint, scroll position, scroll speed and pointer), draws the course line as you scroll, counts the days to the closing date, validates the entry form with inline errors, swaps the price for club members, opens the entry rules dialog and swaps the form for a bib-card confirmation with a way back. No request is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [cta, sign-up, sport, running, marathon, event, form, validation, dialog, gsap, lenis, variable-font, light, kinetic-type]
use_when:
  - A dated mass-participation event opening registration (marathons, sportives, open-water swims, obstacle races) where the event name can carry the page.
  - The sign-up needs a short form with one meaningful choice (a start wave, a distance, a category) and a confirmation that feels like the real artefact.
  - The route or format has a true sequence with real distances that can be drawn to scale.
avoid_when:
  - The name is long (more than about ten letters) or two words. The fitted one-line wordmark becomes too short to read as a headline.
  - The brand is quiet or institutional. The giant moving wordmark is loud by design.
  - Sign-up needs payment, accounts or file uploads. This is a reserve-then-pay flow with nothing sent.
---

## Why it works

**The one bold idea: the wordmark runs.** MERRITON is set as one line at bib weight (wdth 75, wght 900, tracked -0.025em) and fitted exactly to the measure. A stride bulge moves through it: the letter under the bulge stretches wider and squashes shorter, and the other letters give up width, so the word always fills the margins exactly. On load the bulge leaves the start line like the first wave, accelerates through the word, crosses the N and leaves, and the word and the top-bar facts are revealed behind it. After that, scroll position moves it from M to N (the course), scroll speed lengthens the stride, and a fine pointer pulls it to the letter under the cursor. On phones the wordmark is a sticky running header, so it runs the course while the reader works down to "Reserve my place". At rest the lockup is flat, so a still frame, the reduced-motion page and the preview are the same clean wordmark.

- **Built from transforms only.** Each letter is a block with a cached natural width `w_i`. The stretch is a gaussian around a fractional letter index `c` (sigma 1.1 letters), `r_i = 1 + A * g_i`, normalised by `k = W / sum(w_i * r_i)` so that `sum(w_i * s_i) = W`. Each letter gets `translateX(sum over j<i of w_j * (s_j - 1))`, `scaleX(s_i)` and `scaleY(clamp(1 / sqrt(s_i), .72, 1))` from its bottom-left corner, so the word stands on its baseline. The amplitude is capped in closed form so that no letter ever exceeds `scaleX 2`, which keeps every frame readable. `stretch()` is a pure function, and `#selftest` sweeps `c` from -1 to 8.5 and `A` from 0 to 3 to assert that the word always sums to the measure and never passes 2.
- **Squash and stretch, not the width axis.** PRINCIPLES limits motion to transform, opacity, clip-path and filters, so `font-variation-settings` is never animated. The wdth axis sets only the static widths (75 wordmark, 87.5 headings and data, 100 text). The moving letters are a deliberate squash-and-stretch of the bib-weight glyphs.
- **The course is drawn to scale.** The five posts are flex items whose grow factor is the distance to the next post (5, 16.1, 13.9, 7.195), so the gaps are true to the course. The painted line is the column's rule. On wide screens the column stretches to the form, and its bottom is nudged so the 42.195 km finish tick sits level with the submit button: the finish line is the button. After submitting it lines up with "Change my details" instead.
- **Colour has race meaning.** Course blue (#0E7CC2, road-paint cyan) is graphics only: the line, the ticks, link and focus underlines, the bar inside buttons. It is 4.2:1 on tyvek, so it is never text and never a button fill. Primary buttons are asphalt with tyvek text (14.1:1). Hi-vis (#D6F23A) appears only on the selected wave row and the bib stripe, always with asphalt text (11.9:1). Because hi-vis on tyvek is 1.19:1, the selected row also gets a 3px asphalt bar and an asphalt wave disc, so selection never relies on colour. Flag red (#A51C30, 7.0:1) is for errors only.
- **One family, by width.** Wordmark wdth 75/900. H2 wdth 87.5/700 at -0.01em. H3 and button labels wdth 100/700. Body wdth 100/400 at 17px. Km figures, field labels, paces and start times wdth 87.5/600 with tabular figures. There is no monospace, no all-caps label (the wordmark is the only caps), no eyebrow and no middle-dot meta string.
- **Errors never move anything.** Each field reserves its hint-and-error line. The error text is already in the line, hidden, so the reserved height fits it. It is revealed with a clip-path wipe while the hint fades, the field's underline turns flag red, `aria-invalid` and `aria-describedby` are set, and focus goes to the first invalid field. Nothing alerts or shakes.
- **The confirmation is the artefact.** A Tyvek bib card with four pin holes, the hi-vis wave stripe, the bib number in the wordmark's cut and the start time. It is pinned at -1deg. Bib numbers come in equal, non-overlapping blocks of 3,200 for a 16,000 field (A 1001, B 4201, C 7401, D 10601, E 13801), plus a hash of the name. Nothing is sent anywhere; the payment link in the copy is part of the fiction.
- **One left edge.** On wide screens the date and countdown stack on column 7, the same edge as the lede and the form below them.
- **No dead ends.** "Enter now" goes to #enter and focuses the form heading (on phones the scroll clears the sticky wordmark). "Open the entry rules" opens a native dialog that returns focus to its opener. "Ask about charity places" is a mailto: with `target="_blank" rel="noopener"`. "Change my details" brings the form back with the values kept. "Back to the start" goes to #top and focuses the H2.

## Do not touch

- **The normalisation.** The bulge must always satisfy `sum(w_i * s_i) = W` with the cap at `scaleX 2`, and the transform origin must stay at the bottom left. Change `stretch()` only with `#selftest` passing. Never move letters with flex-grow, width or margins: that is layout animation.
- **Widths are measured, not guessed.** `fit()` clears the transforms, measures every letter and sets the font size so the natural word equals the measure. It runs on font load and resize. The CSS fallback `calc(100cqi / 5.17)` is the ratio measured at build, so the word fits even without JS.
- **Proportional posts.** The `--km` value on each post is the distance to the next post. The finish post has no grow factor. The phone column has a 52rem minimum so the 5 km gap can still hold its text.
- **The sticky phone header.** Under 600px `.mark-wrap` is `position: sticky; top: 0` with a tyvek background, and the scroll mapping runs over the whole section, from its top to the moment the submit button's bottom reaches the viewport bottom. Anchor scrolls on phones subtract the header height so targets are never hidden under it. Wider screens keep the wordmark in flow and map `c` from `clamp(top bottom)` to `center top`, so the N is reached while most of the word is still visible.
- **The ticker sleeps.** The wordmark loop runs on `gsap.ticker` only while the wordmark is on screen, skips DOM writes when nothing changed, and reads ScrollTrigger velocity (not Lenis), so native touch scroll gets the stride too.
- **Accessibility.** The wordmark letters are `aria-hidden` with an sr-only "Merriton Marathon", and they ignore the pointer (the glyph boxes overhang the top bar). Wave rows are real radios inside labels, so arrow keys work. Every field, row, checkbox, link and button has a visible focus state: a 3px asphalt outline, plus the course underline on fields. Hidden prices carry `aria-hidden`. Headings that receive focus have `tabindex="-1"`.
- **Headings.** The section starts at h2 and expects the page's h1 above it; the dialog has its own h2.
- **The wordmark has no keyboard equivalent on purpose.** It is `aria-hidden` decoration with sr-only text. The pointer pull and the tap are extras; the scroll-driven bulge is its non-pointer equivalent, and making it focusable would add a tab stop that does nothing.
- **Rebuilds keep your place.** When a matchMedia condition flips (width 600 or 992, reduced motion, pointer type), ScrollTrigger's revert scrolls to 0. The callback reads the old position (still current, because scroll events fire on the next frame) and restores it after the rebuild refresh. It also clears the inline clip-paths, bar opacities and letter transforms the reverted load timeline leaves, and stops a fresh Lenis if the rules dialog is open.
- **Test hooks.** `#selftest` (or `runSelfTest()`) logs SELFTEST PASS or FAIL to the console. It changes nothing on the page and is safe to strip when porting.
- **Required attributes with `novalidate`.** Names, email, date of birth, the five wave radios and the rules checkbox are `required` so automated fills (and `scripts/check-flows.mjs`) complete the form, while the script does the validating. The date field's `min="1920-01-01"` and `max="2009-04-18"` match the age rule.

## Motion

House easing: `expo.out` for entrances and state changes, `power3.out` for pointer following, `none` for scrubs. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer, width 992). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, feeds `ScrollTrigger.update`, stops while the rules dialog is open, and is destroyed in the cleanup. Hidden start states exist only under `html.js` (added only when the libraries loaded) and only with `prefers-reduced-motion: no-preference`. The page-load sequence waits for the wordmark font (capped at 1s) so the letters are measured before they move. Under reduced motion there is no Lenis, every final state shows, the wordmark is a flat lockup and every CSS duration token is 0s.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Start gun: the bulge sprints out, crosses the N and leaves | TX7 (signature) | Load, t.1 | `c` -1 to 10 over 1.2s power1.in; `A = 1.6 * clamp((9.5 - c) / 2)` so the stride lets go only past the N; clip-path right edge rides the bulge centre and opens fully once `c > 7.5` | Flat lockup |
| Top-bar facts appear in the wake of the wave | LD8, tied to TX7 | The reveal edge passing each item's left edge | opacity ramps 0 to 1 over 120px of edge travel, set from the sprint's onUpdate | Static |
| Intro (H2 and lede) wipes in behind the pack | Clip-path wipe (MD1 without the image) | Load, t.9 | inset(0 100% 0 0) to 0, .9s expo.out | Visible |
| Course and form arrive once the pack has passed | Opacity only | Load, t1.15 | opacity 0 to 1, .5s, no rise | Visible |
| Bulge follows the course | TX7 scrubbed | Wide: ScrollTrigger on the wordmark, clamp(top bottom) to center top. Phones: the section top to the submit button reaching the viewport bottom, under the sticky wordmark | `c = -1 + p * 9.5`, no scrub ease | Flat lockup |
| Stride lengthens with scroll speed | SC10 | ScrollTrigger velocity, ticker only while on screen | `A* = min(abs(v) * .0008, 1.35)`, approached by `1 - .9^(dt/16.67)` per frame, decays to 0, capped at scaleX 2 | No loop |
| Pointer pulls the bulge | TX7 + CU-style follow | Fine pointer over the wordmark | `c` via quickTo .45s power3.out, `A` .6; leave hands back over .6s expo.out | Off |
| Tap sends the bulge (touch) | TX7 | pointerdown on the wordmark | blend in .3s, hold .2s, out .8s expo.out, `A` .9 | Off |
| Course line paints, ticks pass | SC16 (scrubbed rule draw) | One ScrollTrigger per segment, tick to tick, at 65% of the viewport (75% on phones, lower if the page ends first) | scaleY 0 to 1, ease none, scrub; a passed tick fills blue and its km figure goes from kerb to asphalt in .3s | Drawn, all passed |
| Enter now, Reserve my place | HV5 magnetic | Fine pointer | quickTo x and y .5s power3.out, up to 5px, label counter-shift 1.5px, no tilt; leave eases home | Off |
| Every button | MI1 press + HV4-style bar | :active; hover (hover-capable devices only) and focus-visible | scale .97 in .12s, back .4s expo.out; 3px course bar grows from the left .35s, leaves to the right; asphalt lightens .2s | Colour change only |
| Text links and the rules button | HV2 | Hover, focus-visible, :active | 2px course underline sweeps in from the left .35s expo.out and out to the right over a 1px resting line | Shown instantly |
| Text fields | MI4 | Focus, value, submit | Label floats translateY(-.62em) scale(.8) .22s; 2px course underline scaleX .3s; error wipe .25s | Instant |
| Wave rows | HV3-style tint wipe + MI3 | Hover, focus-visible, :active, :checked | 8% course tint scaleX .35s; selected fill hi-vis, asphalt bar scaleY, disc pops scale .6 to 1 in .3s | Instant |
| Rules checkbox | MI4 tick | :checked | Box fills asphalt, tick draws stroke-dashoffset 1 to 0 in .3s | Instant |
| Price swap £68 / £58 | MI2 | Club field gets a value | Masked yPercent -100 / 100 to 0, .3s expo.out | Instant |
| Rules dialog | CD7 | Open the entry rules | Panel opacity 0, scale .98 to rest .35s expo.out; backdrop .3s; Lenis stopped | Instant |
| Confirmation | Clip-path reveal | Valid submit | Form fades .25s; bib clip-path inset(0 0 100% 0) to 0 and rotate 0 to -1deg, .7s expo.out; Lenis scrolls to the heading | Instant swap, bib at -1deg |

Every `:hover` rule sits inside `@media (hover: hover)`, so a tap on a phone never leaves a button lit or a wave row tinted; `:focus-visible` and `:active` stay outside it. Short colour state changes (button fill .2s, field and checkbox borders .15s, the error underline, passed ticks and km figures .3s, the selected row fill) are a deliberate exception to "transform, opacity, clip-path and filters only": they are single-property state changes on small elements, never scrubbed or looped, and an overlay per element would add markup for no visible gain.

Deviations from the original score, on purpose: the sprint uses power1.in on `c` from -1 to 10 with the amplitude derived from `c`, because on expo.out it crossed all eight letters in about 0.2s, and an earlier power3.out version parked a stretched N on screen for most of a second. The wave now accelerates off the start, crosses the N and leaves the word. The top-bar facts are revealed by the reveal edge rather than a stock staggered rise, and the course and form wait until the pack has passed, so the eye reads the headline first. The resting amplitude is 0 instead of .25, because a resting bulge made the M look misprinted in a still frame. Passed km figures turn asphalt rather than course blue, because blue is only 4.2:1 at 14px. The floating label moves -.62em rather than -1.25em, because it floats inside the field box rather than above it.

## Adapting

1. Map the brand onto the colour tokens and keep the roles: one line colour for graphics only (`--course`), one ink that also fills buttons (`--asphalt`), one high-visibility selection fill that always carries ink text and an extra non-colour cue (`--marshal`), and one error colour (`--flag`). Re-check `--kerb` and `--flag` at 4.5:1 on the ground.
2. Replace the wordmark letters in `.mark`, one `<span>` per letter, and update the sr-only line. Then measure the new ratio (word width divided by font size at wdth 75) and put it in `--t-mark`; `fit()` does the rest at runtime. The scroll mapping `c = -1 + p * (n + 1.5)`, the sprint's end value (`n + 2`), its amplitude release point (`n + 1.5`) and the full-reveal threshold (`n - .5`) assume eight letters, so change 9.5, 10 and 7.5 for other lengths.
3. Replace the posts. Each post's `--km` is the distance to the next one, and the finish post has none. Keep three to six posts; more crowds the phone column.
4. Replace waves, prices and dates in the markup and in `BASE`, `closeLine()` and the `dob` rule. The bib blocks must not overlap: block size times waves equals the field size.
5. Retime or remove motion. CSS durations are the `--d-*` tokens and `--ease-out`. The load sequence is the `tl` timeline (to drop the sprint, replace the proxy tween with `.call(startLive, null, .1)` and set the bar items to opacity 1, and the word appears whole). Velocity strength and cap are in `frame()` (`.0008`, `1.35`). Remove the pointer pull by deleting the `if (fine)` and `else` blocks after `indexAt`. Remove the course paint by deleting the S3 block; the CSS start states live under `html.js` and go with it. Remove the magnet by deleting `data-magnet`.
6. In a framework, render the letters, posts and wave rows from data, keep `stretch()` pure, and port the script as one effect that returns the matchMedia cleanup.

| Token | Role |
|---|---|
| `--tyvek` | Ground, bib card, text on asphalt buttons, pin holes |
| `--asphalt` | Ink, primary button fill, focus ring, selected row bar and wave disc, checkbox fill |
| `--asphalt-lift` | Hovered and focused button fill (9.6:1 with tyvek) |
| `--kerb` | Secondary text, hints, field borders, unpassed km figures (5.6:1) |
| `--course` | Painted course line, passed ticks, link and field underlines, button bar, dialog bullets (graphics only) |
| `--marshal` | Selected wave row fill and bib stripe, with asphalt text |
| `--flag` | Error text, invalid field border and underline (7.0:1) |
| `--road`, `--rule`, `--tint`, `--veil` | Unpainted road, row and bib edges, hovered row tint, dialog backdrop (all mixed from the tokens above) |
| `--font` | Pathway Extreme with system-ui fallback |
| `--w-mark`, `--w-h2`, `--w-data`, `--w-text` | Width axis roles: 75, 87.5, 87.5, 100 |
| `--t-xs`, `--t-body`, `--t-h3`, `--t-h2`, `--t-bib` | Type scale: 14, 17, 26.6, 34 to 58, 56 to 96 |
| `--t-mark`, `--mark-track` | Wordmark fallback fit (100cqi / 5.17) and its tracking |
| `--lh-body`, `--lh-name` | Body leading and the shared first line of a km post |
| `--s1` ... `--s9` | Spacing, 4 to 96. A few component dimensions stay literal (field height 3.5rem, the 22px checkbox, 13px ticks, the 2rem wave disc, 8px pin holes), because they size one control rather than space the layout |
| `--gutter`, `--measure`, `--km-col` | Side gutter (16 to 56), content width (max 1360), km figure column |
| `--radius`, `--radius-bib` | 4px for fields, rows, buttons and dialog; 10px for the bib only |
| `--ease-out`, `--d-*` | expo.out curve and every CSS duration (all 0s under reduced motion) |
