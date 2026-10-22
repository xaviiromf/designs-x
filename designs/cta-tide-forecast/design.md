---
title: Water at the slip
section: cta
subject: Free-trial call to action for Neap, a fictional tide and swell forecast app for small-boat sailors who launch from a slipway.
aesthetic: Chartplotter night mode. ECDIS night palette (dim deep-water blue, intertidal green, buff ink, chart magenta) with Admiralty chart lettering, where water is sloping type and land is upright.
mode: dark
fonts:
  - Spectral, italic 400/500 and upright 400/600 (Google Fonts)
js: Computes a 72-hour harmonic tide curve for a fictional slipway, draws it as an SVG plot at the measured width, and rewrites the headline with the next daylight window that has enough water and a swell under the limit, for the depth set on a slider. The trial button opens a native dialog with an email form handled in JS (nothing is submitted), which swaps to an in-place confirmation and closes back to the forecast.
tags: [cta, free-trial, interactive, data-viz, svg, tide, sailing, marine, chart, dark, serif, italic]
use_when:
  - The product answers one concrete question with data, and a live sample answer is the best argument for signing up (forecasts, availability, schedules, conditions).
  - The audience can read a simple time-series plot and cares about a threshold ("enough water", "enough snow", "under budget").
  - A dark, low-glare look fits the product's world (marine, aviation, night use, instruments).
avoid_when:
  - The product has no single numeric question to answer, or the data would have to be faked to look impressive.
  - The page needs a light theme or a warm, lifestyle tone.
  - You cannot accept a script on the page. Without JS it falls back to a static sentence, and most of the point is lost.
---

## Why it works

**The bold idea: the headline is computed.** "There’s water at Gull Point slip on Saturday from 08:45 to 14:35." is not a slogan. It is a reading taken from the tide model drawn right underneath it, against the depth the visitor sets on one slider. The window it names is the only full-magenta mark on the plot, and its two edges carry the same two times on the axis, so the sentence and the chart visibly agree and move together. The section does the product's one job (when can I launch and get back, in daylight?) and puts the trial button directly under the answer.

- **Every mark is data.** Daylight bands (sunrise to sunset per day) are a dim buff wash, light rather than water. Night stays the ground colour. The green band runs from chart datum (CD) up to your depth: "too shallow for you", like the drying-height green on a chart, at 35% so day and night read through it. The dashed buff line is your depth, and it carries its own number in the y-axis column. Magenta fills between the curve and your line inside daylight runs of 90 minutes or more with a swell under 1 m: the hours you can go. A run with the water but too much swell is drawn as a buff outline, and that day's swell line turns buff ("too rough" where there is room). No legend: each colour borrows a meaning sailors already know from charts.
- **The headline names the next usable window**, not the longest. Friday has the water but 1.3 m of swell, so it is outlined and skipped, and the reader can see why. Saturday is next. The swell lines under each day are part of the model (`SWELL`, `MAX_SWELL`), so "reads the tide, swell and daylight" in the body is true of the demo.
- **Magenta means go.** On charts, magenta marks what matters (lights, routes, cautions). Here it is used for exactly two things: the sailable windows and the button that gets you more of them. The named window is full-strength magenta, the same pigment as the button; later windows are 45%, so one mark is clearly "the answer". Button text is `--night-water` on magenta, about 6:1.
- **One family, two voices, by chart convention.** Admiralty charts letter water features in sloping type and land features in upright type, in one family. Spectral italic carries everything about water: the headline, heights ("2 m", "CD", your depth), the window times, the slider readout and the swell lines. Spectral upright carries land and interface: the control label, day names, body, terms and button. The italic headline is a rule, not an accent on one word.
- **Not the cream-and-serif default, inverted.** Buff ink on a dim blue-green ground is the ECDIS night palette, where the paper chart's buff land and dark water are kept and dimmed for night vision. The buff is a greenish #DCD9B0, closer to chartplotter night text than to cream, the ground is a hued deep water rather than black, and there is no warm accent: the only saturated colour is chart magenta.
- **A real curve, not a sine wave.** Height is chart datum plus four harmonic constituents: M2 and S2 (in phase at Saturday 11:30, so springs fall on Saturday), M4 (quick flood, slow ebb, typical of shallow estuaries) and K1 (alternate high waters are unequal). Low waters dip just below CD, as they do at springs. The fictional place name makes sure nobody mistakes it for a real prediction.
- **Honest rounding.** Window starts are rounded up and ends rounded down to 5 minutes, so the headline is never optimistic. Windows shorter than 90 minutes are dropped.
- **No hand-typed times.** The static `<h2>`, the SVG `aria-label` and the `<noscript>` sentence are generated from the model for 1.2 m. `console.assert` checks on load that they still match, and also checks the interval finder: all-day windows at -1 m, none at 9 m or at the slider's top (2.4 m), every window edge at or above the depth, only Friday marked rough at 1.2 m, and no daylight water at 2.5 m or more (the peak is 2.49 m).
- **The place name never splits.** `SITE` joins "Gull Point slip" with non-breaking spaces, and so do the static copies, so the rag falls as "There’s water at / Gull Point slip on Saturday / from 08:45 to 14:35." at 1440px, and it never breaks inside the name at any width.
- **One left edge.** From 900px the plot origin (the left end of the CD line) lines up with the headline's left edge, and the y-axis labels hang 40px into the gutter (`--hang`). The slider readout and the trial button end on the plot's right edge (the end of Sunday). On phones the plot bleeds to both screen edges so the 72 hours get every pixel, and the labels take a 40px column inside it, so the origin sits 24px in from the text edge there.
- **Quiet everywhere else.** No eyebrow, stats row, icons, gradient, shadow or card. The button's 6px is the only radius. The only motion is the plot redrawing as the slider moves.
- **Empty state is direction.** At 2.4 m the headline becomes "No daylight window with 2.4 m at Gull Point slip this weekend." and a line under the slider says "Lower the depth, or check next weekend."
- **Cut at critique:** gridlines and labels at 1 m and 3 m (noise inside the green band; the 3 m line boxed the plot in), the planned 120ms fill transition (an instant redraw reads better while dragging), and sunrise and sunset labels on the daylight bands (they would compete with the window times in the same row; the warmer daylight tint does that job).

## Do not touch

- **The headline must come from the model.** If you change the site, constituents, sun times, swell or default depth, regenerate the static `<h2>`, the `aria-label` and the `<noscript>` text from `headline(1.2)` and `describe(1.2)` (the model block between `// --- model` and `// --- end model` runs in Node as is; write non-breaking spaces as `&nbsp;` in the HTML). The asserts log in the console if you forget.
- **The named window is marked.** Full magenta plus its two times on the axis. If the headline and the plot stop pointing at the same mark, the bold idea is gone.
- **Colour meanings.** Magenta only for windows, their edge ticks and the trial button. Green only for "below your depth". The daylight wash only for daylight. Buff outline only for "water but too rough". Do not add a hover colour, link colour or highlight that reuses them.
- **Italic means water, upright means land and interface.** No exceptions in either direction.
- **`--night-water` stays a dark, greenish deep-water blue.** Do not swap it for #111 or a saturated navy. It must stay clearly darker and greener than a smalt or royal blue.
- **The plot origin is the single left edge** from 900px, and the button's right edge is the plot's right edge. Keep `--hang` equal to the space the y-labels need (they include your depth, "2.4 m"), and keep it at 0 when the gutter is narrower than that.
- **Accessibility details.** The headline text updates instantly as the slider moves, but screen readers hear it from a separate `role="status"` line 600ms after the slider rests, with the empty-state direction appended, so each 0.1 m step is not announced. The slider has a visible `<label>` and `aria-valuetext` in metres. The readout is `aria-hidden` (the slider announces its value). The SVG is `role="img"` and its `aria-label` lists every shaded and outlined window and is updated on change. Focus is a 2px buff outline at 3px offset. The SVG stays `hidden` until the script runs, and `<noscript>` gives the same sentence.
- **The SVG is redrawn at the measured width** with a `ResizeObserver`, not stretched with `viewBox`, so labels never distort and the page never scrolls sideways.
- **The trial button never leaves the page.** It is a `<button>` that opens a native `<dialog>` (`showModal`): focus moves to the email field, is trapped, Escape or "Back to the forecast" or a click on the backdrop closes it, and focus returns to the button. The form uses `preventDefault`, validates with `checkValidity`, and swaps to a confirmation whose heading takes focus. Do not turn it back into `href="#"` or a form `action`: on a static host that is a dead end (POST returns 405). Magenta stays on the trial and submit buttons only; the dialog adds no other colour and no radius except on controls.
- **The 90-minute minimum, the swell limit and inward rounding.** They are what make the answer safe to act on.

## Adapting

1. **Tokens first.** Keep the roles of the six colours even if you change their values. The background must stay dark and dim. Daylight must be a little lighter and warmer than the ground, "too shallow" (`--drying`) a different hue, and the "go" colour the only saturated colour on the page, passing 4.5:1 with `--night-water` text on it. The three opacity tokens set how strongly the drying band, the later windows and the gridline show.
2. **Another site or another product.** In the model block, change `SITE`, `SUN` (sunrise and sunset in minutes after local midnight, one pair per day), `SWELL` and `MAX_SWELL`, `Z0`, `HW` and `CONSTITUENTS`. For another domain the same structure works: a curve over 72 hours, day and night bands, a threshold slider, a second condition that can rule a window out, and "go" fill where the curve is on the right side of the threshold (snow depth at a pass with wind as the veto, river level for a put-in with rain as the veto). Keep a fictional or clearly sample location.
3. **Copy.** The headline must stay one sentence that names a place, a day and two times, about 60 to 70 characters, so it sets in three lines at 22ch. Keep the place name joined with non-breaking spaces. The control label says what the number is in the user's terms. The body is one sentence about what the product does, and it must only claim inputs the demo uses. The terms are one sentence about price and card, 20px below the body. The button names the exact action and length ("Start 14-day free trial"), with no arrow. It opens the in-page trial dialog; to send real sign-ups, replace the body of the `submit` handler with a `fetch` to your endpoint (keep `preventDefault` and the in-place confirmation), or point the button at your sign-up URL with `target="_blank" rel="noopener"`. The dialog copy (title, one sentence, email label, confirmation) must say the same thing as the button.
4. **Slider range.** Pick a range so that the bottom gives long windows and the top reaches the empty state. Here it is 0.4 to 2.4 m; the highest daylight water is 2.49 m and no window of 90 minutes reaches 2.4 m (both asserted).
5. **Layout.** Two breakpoints. From 600px the plot is 320px tall (280px below), the section gets the larger padding, the plot stops bleeding, and the body and button share a row (the button is full width and 52px tall below 600px). From 900px the headline (7 parts) and the control (4 parts) share a row with one twelfth between them, bottom-aligned, and the y labels hang into the gutter. The plot has three label rows under it: the named window's times, the day names, and the swell. In the script, day names shorten to "Fri", "Sat", "Sun" below a 500px plot, and swell lines drop the direction below 750px.
6. **Context.** The section starts at an `<h2>`: it is meant to sit under the page's `<h1>`.
7. **Stack translation.** In React or Svelte, keep the model as plain functions, derive `headline`, `describe` and `windows` from the slider state, and render the SVG from that state at a width measured with a resize observer. Server-render the default headline from the same functions so the no-JS text and the hydrated text cannot drift apart.

The plot's own geometry in the script (the 40px label column, the 72px of label rows, stroke widths, the 6/4 dash, the 16px label-collision distance and the 500/750px label thresholds) is literal on purpose: it is drawing, not brand, and it depends on the label font size.

| Token | Role |
|---|---|
| `--night-water` | Page and section ground, night hours on the plot, button text |
| `--daylight` | Daylight bands behind the curve (buff at about 9% over the ground) |
| `--drying` | Band from chart datum up to your depth |
| `--buff` | Primary text, tide curve, dashed depth line and its label, rough-window outline and swell line, slider thumb, focus ring, button hover |
| `--sea-grey` | Terms, axis labels, day names, swell lines, window times, CD line and 2 m gridline, slider track |
| `--magenta` | Sailable windows, the named window's edge ticks, and the trial button. Nothing else. |
| `--o-drying` | 0.35: the drying band, so day and night show through |
| `--o-window` | 0.45: windows other than the one the headline names |
| `--o-grid` | 0.4: the 2 m gridline |
| `--font` | Spectral with old-style serif fallbacks. Italic for water, upright for land and interface. |
| `--step--1` | 14px: day names, swell lines, window times |
| `--step-0` | 18px: body, terms, control label, button, empty-state hint |
| `--step-1` | 24px: slider readout (italic 500) |
| `--step-3` | 36 to 60px fluid: the computed headline (italic 400) |
| `--plot-label` | 15px: "2 m", "CD" and your depth on the plot (italic) |
| `--lead-head`, `--lead-ui`, `--lead-body` | Line-heights 1.08, 1.3, 1.55 |
| `--measure-head`, `--measure` | 22ch headline, 60ch body |
| `--s1` to `--s7` | Spacing, about 1.618 steps: 4, 8, 12, 20, 32, 52, 84px |
| `--gutter` | Side padding, 16px on phones up to 64px |
| `--max` | Content width, 1200px |
| `--hang` | How far the y-axis labels hang into the gutter (40px from 900px, else 0) |
| `--plot-h` | Plot height: 280px on phones, 320px from 600px |
| `--tap`, `--track`, `--thumb` | Slider hit height 44px, track 2px, thumb 22px |
| `--btn-h` | Button minimum height, 52px |
| `--readout-w` | Readout minimum width, so the slider never shifts |
| `--focus-w`, `--focus-off` | Focus outline 2px at 3px offset |
| `--radius` | 6px: the buttons and the dialog's email field. The dialog itself is square. |
