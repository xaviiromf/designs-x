---
title: Planisphere time picker
section: hero
subject: Night-tour bookings for Tolar Observatory, a public dark-sky observatory 12 km outside San Pedro de Atacama, Chile (fictional).
aesthetic: An astronomer's red-light night mode with a working planisphere, the rotating star wheel sold in every observatory gift shop.
mode: dark
fonts:
  - Atkinson Hyperlegible Next (Google Fonts, variable 200-800 with italics)
js: none
tags: [astronomy, booking, tourism, planisphere, svg, has-selector, single-hue, dark, no-js]
use_when:
  - A booking or choice where each option changes what the visitor will get, and an instrument from the subject's world can show that change.
  - Night-time, outdoor or low-light use where a page must not dazzle (observatories, night tours, theatre or ship's bridge tools).
  - A hero whose one job is "pick a slot and book it", with three to five slots.
avoid_when:
  - Daytime products or brands that need more than one hue; the single red is the whole point.
  - More than about five options, or options that do not map to a position on a dial.
  - Content where the drawing would carry information that the text does not repeat.
---

## Why it works

**The bold idea: the planisphere is the time picker.** The three tour start times are native radio buttons. Choosing one turns the star wheel behind a fixed horizon window, 15 degrees per hour, so the heavy "14 Nov" tick on the disk rim lines up with 9, 11 or 1 am on the jacket's hour scale, exactly as you set a real planisphere. The chosen hour's tick lights up at the same weight as the date tick, so the two read as one line across the rim. The window then shows the sky that tour gets. Below 1024px the cropped wheel is sticky at the top of the screen, so the turn happens in view while the visitor taps through the options. It answers the booking question (which tour, which sky) with the object visitors already know from the gift shop. It needs no JavaScript: `.hero:has(#t2300:checked) .disk { --turn: 30deg }` plus a transform transition.

**It is a real instrument, not a decorative star field.** Everything in the SVG was computed for latitude 22.9 S on 14 November 2026 (LST 23.06 h at 21:00, UTC-3):
- The disk is a Lambert azimuthal equal-area projection centred on the south celestial pole, reaching dec +68 at r = 244 (viewBox 640, centre 320). Equal-area instead of equidistant gives the Magellanic Clouds, Canopus and Achernar, which crowd the pole, about 40% more room.
- Star angle on the disk is `15 * (23.06 - RA)` degrees clockwise from up; time turns the disk clockwise, as the southern sky does.
- The window is the true horizon: for every azimuth, altitude 0 converted to declination and hour angle and projected. That is why it is lopsided (it reaches the rim in the north and only 64 units below the pole in the south). Do not "fix" it into an ellipse.
- The Milky Way is the galactic equator (J2000 rotation), drawn as a lightly blurred stroke (stdDeviation 3, opacity .2) clipped to the star field, so it reads as a band and never washes over the date ring. At 11 pm it hugs the horizon, which is correct for that sidereal time.
- Labels are pre-rotated by -30 degrees so they read level at the default 11 pm setting and tilt at most 30 degrees either way. A label whose star or text would cross the horizon at a tour time is hidden whole (`.off21`, `.off23`, `.off01`, measured in Chromium at 360-1440px), so the jacket never cuts a word in half.
- Copy and drawing agree: both Clouds are circumpolar at this latitude (LMC tops out near 44 degrees, SMC near 40, always in the south), so the line under the legend says they stay up all night and the options do not repeat them. Each sky note says only what that slot gets: the Milky Way core setting and the Moon at 9 pm, Sirius rising (about 22:10) and moonset at 11 pm, full dark with Orion 40-55 degrees up at 1 am. The Moon is named in the text only, because a planisphere never prints moving bodies. The chart uses LMC and SMC, the same abbreviations the copy defines.

**Red light only, for a working reason.** Astronomers use dim red light because the eye's rods barely respond to it, so it does not spoil dark adaptation. This page is the "night mode" of an astronomy app: one hue around 5-10 degrees, no accent, no white. Visitors open it on the platform. Because full-luminance red tops out near 5.6:1, hierarchy comes from size, weight and space, not tone, so there is one text colour (`--lamp`) and no "dim" text tone. The button is an outline, not a lit slab: the largest light-emitting area on a night-vision page would contradict its own premise, and a filled red block on the dark is exactly default 2.

**This is a reasoned exception to default 2** (near-black page with a vermilion accent). The dark is a visibly oxblood `#22090A`, not a tinted near-black, and red is not an accent on it: it is the only light source, used for every text, line and star. If you add a second hue or a white, you have rebuilt the default and lost the reason.

**Type chosen for dim red light.** Atkinson Hyperlegible Next (Braille Institute) has open apertures, distinct letterforms and no hairlines that vanish at low luminance. Its zero is always slashed (the font has no alternate: its only GSUB features are aalt, case, ccmp, frac, locl, ordn, pnum, sups, tnum), and rows of slashed zeros read as a terminal face. So times use the 12-hour form found on English planispheres ("9 pm", "11 pm", "1 am", "Midnight" on the scale), which keeps zeros out of the display figures; the zeros left in prose (11:40, 38.000) are ordinary digits in a sentence. Weight is the main hierarchy tool, so it is spent sparingly: 700 for the headline, wordmark, legend, tour times, the button and the "14 Nov" date; 400 for everything else, including seat counts, the header link and compass words. Italic only for the constellation name on the chart (star-atlas convention). Tabular figures for times, seat counts and price; no monospace.

**Each option says what you will see.** The sky note is printed under every time, always visible. The drawing never carries information alone, so the SVG is a single `role="img"` with a short label.

**Motion only when you choose.** The wheel turns 900 ms because a visitor picked a time. Nothing twinkles or drifts.

## Do not touch

- **The rotation mapping.** 9 pm = 0deg, 11 pm = 30deg, 1 am = 60deg, 15 degrees per hour, clockwise, `transform-origin: 320px 320px`. The 14 Nov tick sits at -45deg on the disk (r 244-276) and the hour `t` (24-hour) sits at `15 * (t - 24)` deg on the jacket, its tour tick at r 277-293; change one and the date stops pointing at the chosen hour. Radio ids and values stay in 24-hour form (`t2100`, `t2300`, `t0100`).
- **The horizon window and star positions.** They are computed, not drawn. If you change the site latitude, date or times, recompute (formulas above) rather than nudging shapes.
- **Draw order:** disk group (fill, rings, Milky Way, stars, labels, date rim), then the jacket path (`fill-rule: evenodd`, outer circle r=244 with the window cut out), then the static hour scale and compass words. If you move a label, change the font size or add a tour time, re-measure which labels cross the horizon and update the `.offNN` classes.
- **One hue.** No `--rule` or `--lamp-low` text, ever (graphics only). All text is `--lamp`: 5.65:1 on `--night`, 5.2:1 on `--disk` for chart labels. The button is a 2px `--lamp` outline with `--lamp` text on `--night`; do not fill it.
- **Chart label sizes are in SVG user units**, set through `--fs-chart` so they never render below about 12px: 17 at 1280px and up, 20 at 1024-1279px (wheel about 471px), 24 below 600px (about 13px on a 358px wheel). Month names are 13 units. Below 600px only Canopus, Sirius, Achernar, LMC, SMC, 14 Nov, the hour scale and East/West show (`.x`, `.mon`, `.ns` are hidden); East and West stay because the sky notes rely on them. Rings and ticks use `vector-effect: non-scaling-stroke` so they stay 1px at any size.
- **Below 1024px the wheel is cropped** to its top 400 of 640 units (just under the horizon's lowest point at 369 and the South label), with no border; the fieldset's first divider closes it. It is `position: sticky; top: 0` on the page background, so it stays in view while the options are tapped. On desktop it is a full circle, sticky, with the top of its hour scale set on the h1 cap height.
- **Accessibility:** native radios in a fieldset with legend, described by the line that says the wheel turns with the choice (`aria-describedby`); the checked row gets a 1px `--lamp` outline at `--radius` 6px (the only rounded rectangle; the radio dots are circles) and a filled dot; keyboard focus shows a 2px `--lamp` outline 3px off the whole row; `prefers-reduced-motion` removes the turn and label fades; a `forced-colors` rule repaints the custom radio in CanvasText and Highlight. Each radio's accessible name is its whole row (time, seats, sky note): verbose, but the sky is the point of the choice.
- **Placeholders:** "Find my booking" (`href="#"`) and the form (`action="#"`, GET with `tour=2100|2300|0100`) have no real targets. Wire them to the booking system when reusing.
- All text flush left on one edge; no centred text, no all caps, sentence case.

## Adapting

Change the `:root` tokens first. For a different red-light subject (a night safari, a ship's bridge, a sleep clinic) keep the single hue and recheck contrast: `--lamp` must stay at least 4.5:1 on both `--night` and `--disk`. Deeper reds than about `#E8402E` fail AA for body text on a dark this saturated.

For another observatory: recompute the SVG for its latitude, date and LST (the original was built with a short Python script: equal-area polar projection, `alt = 0` horizon per azimuth, galactic-to-equatorial rotation, about 45 bright stars to magnitude 2.9). In the northern hemisphere, centre on the north pole, put East on the right of the window and turn the disk counterclockwise (negative `--turn`). Keep label count near eight on desktop and six on phones.

Copy: keep the headline a true, specific statement about tonight's sky (it was rewritten because "overhead" was false at this latitude). Each option needs a time, a seat count and one sentence of what only that slot gets; things visible all night belong in the line under the legend. Up to five options fit; each extra hour adds 15 degrees, so keep the total turn under about 90 degrees or labels go sideways. Longer sky notes simply wrap under the time; the seat count stays right-aligned in tabular figures.

| Token | Role |
|---|---|
| `--night` | Page background and the planisphere jacket (`#22090A`, visibly oxblood) |
| `--disk` | Star wheel fill, seen through the window and on the date rim |
| `--rule` | Declination rings, ticks, option dividers, jacket edges. Decorative only |
| `--lamp-low` | Faint stars, Milky Way, Magellanic Cloud glows, Orion figure, idle tour ticks. Graphics only |
| `--lamp` | All text, bright stars, chart labels, the chosen tour tick, focus outlines, button outline (5.65:1 on night, 5.2:1 on disk) |
| `--font` | Atkinson Hyperlegible Next with Atkinson Hyperlegible, Verdana and system fallbacks |
| `--fs-h1` | Headline, clamp(2.25rem, 3.8vw, 3.5rem), 700, line-height 1.04 |
| `--fs-time` | Tour times in the options, 24px, 700, tabular |
| `--fs-body` | Body, lead, sky notes, price, button: 18px for dim-light reading |
| `--fs-small` | Red-light note, 15px |
| `--fs-chart` | Chart label size in SVG user units: 17, overridden to 20 at 1024-1279px and 24 below 600px |
| `--fs-chart-mon` | Month names on the date ring, 13 units |
| `--s1` to `--s8` | Spacing scale 4, 8, 12, 16, 24, 32, 48, 72 px |
| `--gutter` | Side padding, clamp(16px, 4vw, 64px) |
| `--measure` | Line length for lead, price, pickup and note, 34em |
| `--col-intro` | Desktop text column, 37rem |
| `--wheel-max` / `--wheel` / `--wheel-w` | Wheel size cap 640px; width below 1024px, min(100%, 640px); desktop column, min(46vw, 640px) |
| `--radio` | Custom radio diameter, 20px (dot is half) |
| `--radius` | 6px on the checked or focused option, the only rounded rectangle |
| `--focus` / `--focus-gap` | Focus outline width 2px and offset 3px |
| `--turn-time` | Wheel turn duration, 900ms (removed under reduced motion) |
