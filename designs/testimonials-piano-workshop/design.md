---
title: The pianos we gave back
section: testimonials
subject: A piano tuning and restoration workshop, with words from a concert pianist, a primary school and a family who brought instruments in.
aesthetic: Inside the piano case. Green bushing cloth, felt white and plate gold, set in a late-19th-century scientific "Modern" serif, with each quote beside a measured 88-key tuning record.
mode: dark
fonts:
  - Old Standard TT 400, 400 italic, 700 (Google Fonts)
js: none
tags: [testimonials, data-chart, inline-svg, before-after, serif, dark, craft, music]
use_when:
  - The service changes something you can measure, and each customer's result can be shown as their own before and after record.
  - Testimonials should read as evidence rather than praise, for skilled trades, restoration, calibration, repair or tuning.
  - There are three to five testimonials, each with a few facts about the job (object, work done, duration, a key measurement).
avoid_when:
  - The results cannot be measured, or you would have to invent the chart data. The chart only works when every mark is real.
  - You need many short quotes, a logo wall or star ratings.
  - The page needs a light, airy feel, or the brand already owns a dark green field.
---

## Why it works

**The bold idea: each testimonial comes with its instrument's tuning record.** Beside every quote is a chart of all 88 keys in cents from true pitch. Felt-pink dots show the scattered, flat readings taken the day the piano arrived. A single plate-gold line shows the stretch-tuning curve it left with, slightly flat in the bass, true at A4 and sharp in the treble. The x-axis is a small drawn keyboard, 52 white keys and 36 black, so the axis is itself a piano, sitting directly on the plot floor, and every dot sits exactly over its own key. Keys that made no sound are marked on that keyboard itself. The before and after is measured data, not a claim, and the quote sits next to it.

- **All three charts share one y scale, from +40 to −100 cents,** with gridlines and ticks every 30 cents down to −90, so the empty lower band reads as measured space, not padding. That shared scale is the comparison. The concert pianist's Steinway sits just under the zero line, the school's Yamaha sits around −35, and the 1908 Blüthner sinks near −62 with six dead keys. The empty band under the first chart is information: that piano was close. Do not rescale per chart.
- **Dead keys are drawn on the keyboard, not hidden.** A key that made no sound has no measurement, so the key itself is marked: a white key becomes an empty slot outlined in arrival pink, a black key turns pink. Keys never overlap, so adjacent dead keys stay countable at any width (an earlier row of × marks smudged together on phones). The direct label "6 keys made no sound" sits just above the keyboard, left-aligned at the first dead key. This is true to the data: the school's three dead bass keys match "three new bass strings" in its record.
- **Direct labels, no legend.** "as it left" and "as it arrived" sit on their series; each chart's "as it arrived" is placed from that chart's own arrival data, just clear of the dots. The intro explains pink and gold once in words and sets a tiny inline sample of each real mark (three scattered dots, a short rising gold line) beside the words. That sample is the header's one subject-specific mark: it ties the prose to the chart and keeps the header from reading as any premium-craft serif title.
- **Colour means one thing.** Felt pink is only the arrival series: its dots, its dead keys and its two labels. Axis text (ticks, "true pitch", A0, C8), dl terms and role lines use `--felt-dim` (#A9B3A6, felt seen through the green cloth, 6.1:1 on `--cloth`), so nothing beside the chart looks like part of the arrival data. The varying series leads: dots are 6px, while the gold reference curve, identical in every chart, is a 1.5px line.
- **Inside the case.** Ground is the green bushing cloth sold by piano supply houses alongside the more familiar red; red was set aside because another section in this collection already owns a dark-red field (`--cloth` #1C3527, `--cloth-deep` #142A1E for the chart well). It is a yellow-leaning bottle green, deliberately not teal, and is not the red or black lacquer you would expect. Felt white is the key tops, ebony is only the black keys, and plate gold (the bronze paint on the iron frame) appears only on the "as it left" curve and the A4 tick. Gold means "in tune", so it is never used as chrome, and the focus ring uses felt white instead.
- **One family.** Old Standard TT revives the "Modern" faces of late-19th-century scientific and music printing, from the decades most restored instruments were built in. Quotes use 400 roman, names use 700, and labels are sentence case: dl terms, roles and the series names in 400 italic, axis text (ticks, true pitch, A0/A4/C8) in 400 roman, because Old Standard's italic hairlines break up at small sizes on dark ground. Chart text is 14.4px (`--t-xs`) for the same reason. Figures are lining and tabular, so 437.8 Hz and 440.0 Hz line up digit for digit without a monospace face.
- **People first.** The quote is the largest text in each row (27.6px at desktop, leading 1.32 from 768px, 1.45 on phones, `text-wrap: pretty` against widows) and sits unboxed on the cloth. From 960px the left column holds the person and the job facts (quote, name, then the dl 48px below), and the right holds only the record, so the two columns end at about the same height. Below 960px the order is quote, chart, facts. The chart well is the only panel, because it holds data. Rows are separated by 72px of space and no rules.
- **Typographic care.** From 768px the opening quote mark hangs into the margin (`text-indent: -0.42em`); on phones it does not hang, because the 16px gutter would clip it. `text-box-trim` trims the quote's first line to cap height so it lines up with the top of the chart well. This is progressive enhancement: Firefox does not support it yet, so there the first line sits a few pixels below the well's top and nothing else changes. dl values sit on one column (`--term-w`: 9em from 768px, 8em on phones) and every row keeps the same two-column rhythm at every width.
- **No script, no motion.** Both states are drawn at once, so there is nothing to toggle or animate.

### How the chart is built (static inline SVG)

- The keyboard is two symbols, `#whites` and `#blacks` (both `viewBox="0 0 880 60"`), placed in each chart's `.keys` svg as `<use href="#whites"/>`, that chart's dead white keys, `<use href="#blacks"/>`, then its dead black keys, so a marked white key never covers its black neighbours. White key width is 880/52. A black key is 10 units wide and centred on the boundary between two white keys. Fills are set with `#whites .w` / `#blacks .b`: rules must match inside the symbol, because a selector like `.keys .w` cannot reach into the `<use>` shadow tree. Dead-key rects (`.dk`, `.dk.dkb` for black keys) sit outside the symbols and are styled normally. On phones (below 600px) the keyboard is drawn 28px tall (`--keys-h`, `preserveAspectRatio="none"`) so the keys keep a piano proportion instead of becoming a barcode.
- The plot SVG uses `viewBox="0 -40 880 140"` with `preserveAspectRatio="none"`, so y equals minus cents and the plot can take a fixed CSS height (`--plot-h`) at any width without becoming a sliver on phones. Every stroke has `vector-effect: non-scaling-stroke`. Each dot is a zero-length subpath (`M x y h0`) with a round cap, so the dots stay round however the plot stretches. All 88 dots are a single `<path>`.
- Dot x is the centre of that key on the drawn keyboard, not a uniform 10-unit grid, so dots line up with the keys.
- Text in the chart (ticks, series labels, the dead-key note, A0/A4/C8) is HTML, absolutely positioned in percentages computed from the same scale. This keeps it at a readable 14.4px at every width, while SVG text would shrink to about 6px on a phone. The text is `aria-hidden`. The plot `<svg role="img">` carries an `aria-label` that summarises the arrival offset, the dead keys and the curve it left on, and the dl gives the readable facts.
- Data came from a throwaway generator: a Railsback-style stretch, −20c at A0 rising to 0 at A4 (exponent 2.4) and up to +30c at C8 (exponent 2.1), plus small noise for the gold line. Arrival is the offset at A4, plus 0.45 × stretch, a regional sag, Gaussian scatter and a few unison outliers. "A4 as it arrived" in the dl matches the data exactly: −8.7c is 437.8 Hz, −35c is 431.2 Hz and −61.7c is 424.6 Hz (440·2^(c/1200)).

## Do not touch

- **The tuning record is the design.** Do not replace it with stars, avatars, big quotation-mark glyphs or before/after stat numbers. Do not add a toggle or animation between the two states.
- **The shared y scale** across all charts, the zero line at higher opacity than the gridlines, and dead keys marked on the keyboard itself.
- **The keyboard as x-axis**, the dots aligned to their real keys, and the gold tick under A4 (key 49). Never reuse the keyboard as a decorative border.
- **Gold only where the piano is in tune**: the "as it left" curve, its label, its inline sample in the intro and the A4 tick. Do not use it for headings, rules, focus or hover.
- **Pink only for the arrival series.** Do not reuse `--felt-pink` for terms, roles or axis text; that is what `--felt-dim` is for.
- **One family**, italic sentence-case labels, no all caps, no letterspacing, and no monospace for figures.
- **The quote is the largest text in the row.** Keep it unboxed. The chart well is the only panel, with a 2px radius and no shadow.
- **Only facts that vary go in the dl.** The departure pitch (440.0 Hz) is the chart's zero line and the gold A4 tick, so there is no "A4 on leaving" row and no arrow between two Hz figures.
- Accessibility: nothing on the page is focusable; the `:focus-visible` rule is a safety net for adapted content such as a link inside a quote. Keep `role="img"` with a written `aria-label` on each plot SVG, keep `aria-hidden` on the keyboard and the HTML labels, and keep the dl as the readable data.
- No dead ends: the section has no links, buttons or forms, so nothing can lead to a missing page or a failed POST. If you add a link (for example "book a tuning"), point it to an anchor that exists in your page or to a `mailto:`/`tel:` link with `target="_blank" rel="noopener"`; never `href="#"`.

## Adapting

1. **Tokens first.** Change the colours on `:root`. The ground must still read as a material inside the object and pass AA: felt is 10.9:1, gold 6.3:1, pink 6.1:1 and felt-dim 6.1:1 on `--cloth`, and all three are higher on `--cloth-deep`. Keep the arrival and departure colours distinct in hue *and* in mark shape (dots vs. a line), so the chart still reads in greyscale.
2. **Other measurable trades.** The structure ports to anything with a per-unit before and after along a natural axis. Examples: a wheel alignment across four corners, a guitar setup across 22 frets, or a building's heat loss across rooms. Swap the keyboard symbol for that axis drawn as the thing itself, and keep one accent for the "after" state.
3. **Data.** Regenerate dots and the curve from real measurements. Keep y as minus the value inside the viewBox, and recompute the HTML label percentages as `(top − value) / span × 100`. If a series runs past the range, widen the range for every chart, not just one. Place each "as it arrived" label from that chart's own arrival values near the right end, clear of the dots at 360px and 1440px. Mark dead keys by adding `.dk` rects after the matching `<use>` in that chart's `.keys` svg.
4. **Copy.** Quotes run about 160 to 210 characters, so they fill five or six lines at desktop. Much shorter quotes leave a tall empty column beside the record, so consider giving the quote more columns then. Each dl takes four rows. Keep terms short enough for the term column (8em on phones, 9em from 768px); a longer term wraps under itself.
5. **Layout.** From 960px each entry is a 12-column row: quote and dl in columns 1 to 5, record in 7 to 12 spanning both rows (`grid-template-rows: auto 1fr`). Below that they stack: quote, chart, dl. The dl keeps term and value side by side at every width.

| Token | Role |
|---|---|
| `--cloth` | Section and page ground (green bushing cloth) |
| `--cloth-deep` | Chart well, the only panel |
| `--felt` | Body text, quotes, white keys, zero line, focus ring |
| `--gold` | "As it left" curve, its label, its intro sample and the A4 tick only |
| `--felt-pink` | "As it arrived" only: dots, dead-key marks, their two labels |
| `--felt-dim` | Axis ticks, "true pitch", A0/C8, dl terms, role lines |
| `--ebony` | Black keys only |
| `--font` | Old Standard TT with schoolbook and Georgia fallbacks |
| `--t-xs` | 14.4px: all chart text |
| `--t-s` | 16px: body, dl, role lines |
| `--t-m` | 19.2px: intro, names, quotes on phones |
| `--t-l` | 23px: quotes from 768px |
| `--t-xl` | 27.6px: quotes from 1200px |
| `--t-xxl` | H2 only, clamp(33px, 4.2vw, 48px) |
| `--s-1` … `--s-9` | Spacing: 4, 8, 12, 16, 24, 32, 48, 72, 112 |
| `--gutter` | Side gutter: 16px on phones, 32px from 768px |
| `--plot-h` | Plot height: 168px on phones, 200px from 768px |
| `--keys-h` | Keyboard height: 28px below 600px, `auto` (880:60) above |
| `--measure` | 32em line length for quotes and intro |
| `--term-w` | dl term column: 8em on phones, 9em from 768px |
| `--radius` | 2px, the chart well only |

Literals left on purpose: breakpoints (600, 768, 960, 1200px; custom properties cannot drive media queries), the 1200px container, the header's 36rem cap, the 2em tick column, the 0.09 and 0.28 grid opacities, the A4 position (54.81%, the centre of key 49 on the drawn keyboard), the focus outline and the small offsets of the A4 tick. Each is tied to the drawing or the grid rather than to the brand.
