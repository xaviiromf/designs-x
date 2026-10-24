---
title: Ashgrove wedding enquiry
section: contact
subject: The wedding enquiry section of Ashgrove Flower Farm, a fictional two-acre grower-florist in the Usk valley, Monmouthshire, where Nia Pritchard grows, cuts and arranges every stem for about twenty weddings a year.
aesthetic: Grower-florist's cutting list. Fresh-stem yellow-green paper, one foliage-green panel, cornflower blue for actions, and botanical Latin in italic as on a grower's label.
mode: light
fonts:
  - Young Serif 400 (Google Fonts), the section heading, panel heading and result heading only
  - Figtree variable 300 to 900 with true italic (Google Fonts), body, labels and controls at 400, 500 and 600, italic 400 only for Latin binomials
js: Validates the enquiry form field by field, fills the 'In the field' panel from the chosen date and colour leaning, and shows the finished enquiry in place with a prefilled email link. runSelfTest() runs on #selftest.
libraries: []
tags: [contact, form, validation, enquiry, wedding, florist, seasonal, in-page-result, mailto, light, serif]
use_when:
  - A service whose availability depends on the date (seasonal produce, tides, events, a growing calendar) and showing what that date means is the persuasion.
  - The business wants a useful first enquiry (date, place, needs, budget) rather than a booking.
  - The person should send the enquiry from their own email, with nothing pretending to be sent.
avoid_when:
  - A generic contact page with no date-dependent offer. The panel would have nothing to say.
  - Businesses that need file uploads, accounts or payment in the first step.
  - A brand whose one strong colour field is already used elsewhere on the page. The green panel is the only bold element here.
---

## Why it works

**The bold idea: the form talks back with the season.** Picking a wedding date fills a deep foliage-green panel with the seven flowers Nia will actually be cutting that week: "In the field, mid-June 2027", then sweet pea, peony, cornflower, love-in-a-mist and the rest, each with a colour-family swatch and its Latin name in italic, plus a one-line note for the month ("Peak month. Peonies end mid-June as sweet peas begin."). Choosing a colour leaning then marks which of those flowers suit it. Matching rows keep a filled swatch and full-strength text, the rest switch to a hollow swatch and a softer colour that still passes AA, and a count line says it in words: "2 of 7 suit blues and purples." A November to March date flips the panel to "In the store" with the dried flowers and evergreens, because the farm does not cut fresh in winter. The couple sees what's possible before they write, which is the real job of a grower-florist's enquiry form.

- **Real data is the persuasion.** The seasonal table (April to October fresh, November to March from the store) is a plain JS object, seven flowers a month, each with a common name, a binomial and a colour family. Cultivar names stay in roman inside the common name ("Peony 'Sarah Bernhardt'"), and only the binomial is italic, as botanical convention requires.
- **Edge cases say something useful.** If none of the week's flowers suit the leaning, every row goes hollow and the line reads "None of this week's flowers are sunny yellows and orange. Nia will suggest dried stems or a bought-in bunch." It never says "0 of 7" on its own. A date in the past, more than three years out, or one the browser can't parse shows "Pick a date in the next three years and this lists what's in flower." instead of a month. "Whatever's best on the day" keeps every row full and says "Nia picks whatever is at its best that morning."
- **Colour is never the only signal.** Matching rows differ by filled versus hollow swatch and by the count sentence. Errors have text and a small warning mark. The chosen colour chip has a doubled ink border as well as a tint.
- **The paper is yellow-green, not cream.** `#ECEFD8` has G above R and B well below both, so it reads as fresh stems and tissue, not the warm cream (`#F4F1EA`, R above G) of default 1. Young Serif is a soft, low-contrast serif rather than a high-contrast display face, and the accent is cornflower blue, a British summer cut flower, with no terracotta anywhere. The ground was moved from a cooler `#EEF2EB` because that sat too close to footer-botanic-garden and cta-vineyard-harvest.
- **Honest wording.** The button says "Review enquiry" and the line beside it says "Nothing is sent yet. You'll see your enquiry first." The result says "send it from your own email", and "Email it to Nia" opens a mailto: with the subject ("Wedding flowers, 14 June 2027, Llansantffraed Court, Abergavenny") and the whole enquiry as the body. "Edit enquiry" brings the form back with every value kept.
- **Quiet form craft.** Labels sit above fields and never float, since date inputs always show their format. Inputs are 48px tall at 17px so iOS does not zoom. There are no cards and no shadows, and radii follow role: 6px fields and buttons, pill chips that read as flower tags, a nearly square 3px panel like a slate label. One rule in the whole section separates "talk to Nia directly" from "send the details".
- **Layout.** At 960px and up the form is a 7fr/5fr grid and the panel sits in the right column, sticky at 24px, directly under the channel list. On phones the same DOM puts the panel inline right under the date field, so the answer appears where the question was asked.
- **Defaults avoided (reasoned).** No eyebrow, no accented headline word (the draft's italic cornflower "flowering" was reverted), no caps, no mono, no arrows on links, no reveal-on-scroll, no ambient loop (a "drifting petals" idle loop was cut). The empty panel is real text, so nothing depends on JS to appear.

## Do not touch

- The date to panel link and its DOM position straight after the date field.
- Labels above fields, never floating.
- AA on both panel states: full rows in paper (8.7:1 on `--field`), non-matching rows in `--field-soft` (5.06:1). Do not "dim" with opacity.
- The hollow swatch plus count sentence, so matching never relies on colour alone, and the empty-match sentence.
- The honest wording: "Review enquiry", "Nothing is sent yet", "Email it to Nia", "Edit enquiry".
- `[hidden] { display: none !important; }`. The form is `display: grid`, which would otherwise override the `hidden` attribute and leave the form visible under the result.
- The panel's `key` is the month note: changing the day within a month re-marks rows without replaying the rise, and a new month replaces the list.

## Motion

Simple tier: no libraries, no load sequence, no scroll motion and no ambient loop. The panel is `position: sticky` from 960px, with no scroll listeners. One `prefers-reduced-motion: reduce` block sets every transition and animation to 0.01ms and drops the row rise and button press, so everything lands in its final state.

| Item | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Channel links, "Edit enquiry" | HV2 directional underline sweep, in from left, out to right; ink to cornflower | hover (fine pointer), focus-visible | background-size 0.4s `--ease-std`, colour 0.2s | colour only; the 1px resting underline always shows |
| Text inputs, select, textarea | MI4 border and 3px cornflower ring; ink border on hover | focus, hover | 0.15s `--ease-out` | instant |
| Field and group errors | MI4 grid-template-rows 0fr to 1fr reveal, rust text with a mark | submit, then blur or change | 0.22s `--ease-out` | instant |
| Checkboxes | MI4 tick drawn by stroke-dashoffset 1 to 0 | check | 0.25s `--ease-out` | tick appears at once |
| Colour chips | selected state: doubled ink border and 6% ink tint | check | 0.15s | instant |
| Panel rows on a new month | TR1 caption swap: old list out at once, new rows rise 6px with opacity, staggered | date input or change | 0.42s `--ease-out`, 35ms per row, all seven land under 0.65s | instant, no translate |
| Panel rows on colour change | HV7 sibling dimming adapted to a choice: text to `--field-soft`, swatch filled to hollow | colour change | 0.3s ease | instant |
| "Review enquiry", "Email it to Nia" | MI1 press and release; darker cornflower on hover | active, hover | press scale .97 in 0.12s, release 0.35s `--ease-spring`; colour 0.2s | colour only, no scale |
| Form to result | opacity fade, no slide; heading focused and scrolled into view | valid submit | 0.25s; smooth scroll only when motion is allowed | instant, `auto` scroll |

The MI3 selection badge pop on the chips was built and then removed as the one accessory too many: its width change nudged the other chips sideways, and the doubled border already marks the choice.

## Adapting

Change the `:root` tokens first. `--paper` must keep `--wire` at 3:1 or better (control borders) and `--cornflower` at 4.5:1 or better. `--field` must keep paper text at 4.5:1 and `--field-soft` at 4.5:1 too, because non-matching rows are real text. Bloom swatches are content colours, ringed with ink on paper and with paper on the panel so that white and berry both stay visible.

Replace `SEASON` (keyed by month index 0 to 11, a note plus seven rows) and `STORE` (the off-season list) with the client's real calendar. Families live in `FAMILY` and `fam()`. Seven rows keeps the panel under the form's height on desktop; up to about nine still works. For a business without an off-season, delete `STORE` and fill all twelve months. Edit `MSG` for error copy and the mailto address in two places (the channel link and the `send` href).

To retime motion, change the durations in the `.lk`, `.err`, `.rows li.is-new` and `.btn` rules, or the three `--ease-*` tokens. To remove it, delete the `animation` on `.rows li.is-new` and the transitions on `.lk`, `.err` and `.rows li`. Everything still works and reads the same without them.

| Token | Role |
|---|---|
| `--paper` | Page ground, text on the panel and on buttons |
| `--ink` | Text, checked checkbox fill, chosen chip border |
| `--ink-soft` | Help text, channel labels, result labels, optional markers |
| `--field` | The season panel |
| `--field-soft` | Latin names and non-matching rows on the panel |
| `--cornflower` | Buttons, link sweep, focus ring |
| `--cornflower-dark` | Button hover and focus fill |
| `--rust` | Errors only |
| `--wire` | Control borders and the one band rule |
| `--bloom-*` | Six colour-family swatches |
| `--font-display`, `--font-text` | Young Serif, Figtree |
| `--step--1` to `--step-4`, `--step-label` | 1.25 scale on a 17px body; `--step-4` is the H2 |
| `--s1` to `--s9`, `--gutter`, `--max` | 4px-based spacing, side gutter, 1240px max width |
| `--r-field`, `--r-chip`, `--r-panel` | 6px fields and buttons, pill chips, 3px panel |
| `--ease-out`, `--ease-std`, `--ease-spring` | Motion curves |
