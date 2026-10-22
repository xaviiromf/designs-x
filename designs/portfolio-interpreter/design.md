---
title: Decalage stack
section: portfolio
subject: Professional portfolio of Ines Saavedra Lagos, a fictional certified conference interpreter in Santiago de Chile (Spanish A, English B, Portuguese C), hired by event organisers, ministries, mining and health companies, unions and banks.
aesthetic: A booth window onto a béton-brut conference hall. Board-marked concrete grey, graphite ink and one red mic tally light; a text serif for speech, a semi-condensed sans for console legends.
mode: light
fonts:
  - Piazzolla (Google Fonts)
  - Saira (Google Fonts)
js: One script reads CONTACT, LANGS, HOURS, YEARS and CALENDAR at its top and builds the contact links, a one-time word-by-word hero sequence, two keyboard-navigable inline-SVG charts with data tables, a pickable availability calendar that fills the enquiry, and a drafted email with mailto and WhatsApp send links, and sends nothing.
tags: [portfolio, professional, interpreter, languages, chart, bar-chart, stacked-columns, inline-svg, calendar, availability, enquiry-form, contact-links, social-links, whatsapp, light, serif, multilingual]
use_when:
  - A freelance professional sells their time by the day and the buyer's first question is "are you free on these dates?" (interpreters, translators, sound engineers, locum doctors, event photographers, mountain guides).
  - The work has a natural unit worth charting honestly (directions, specialties, routes) plus a yearly volume split two ways (on site and remote, solo and team).
  - The page is multilingual or about language, and real lang attributes matter.
avoid_when:
  - The portfolio is visual work. There is no gallery here and adding one would fight the type-led hero.
  - The owner cannot publish real figures; the two charts must agree with each other or the page loses its credibility.
  - Bookings must be confirmed instantly. The calendar is a static picture of availability; it does not reserve anything.
---

## Why it works

**The bold idea: the decalage stack.** The section opens on one real conference sentence shown three times, as a delegate's receiver would carry it: the floor speaker in Portuguese, Ines's own Spanish booth on channel 1, and the English booth on channel 2 taking relay from her. Each line is set large in Piazzolla and stepped one `--lag` further right, with a timecode in the gutter (0.0 s, +2.2 s, +4.1 s), so the typography itself draws the lag between speaker and interpreter (the décalage). The floor line is roman and the booth lines italic, because interpreted speech is a different voice. Each `<p>` carries its real `lang`. The red tally dot sits only on channel 1: hers. On load the words arrive one by one, each line starting after its own lag (real lag scaled by 0.22, so the whole sequence ends in about 2.1 s). The text is in the HTML before any script runs; without JS or under reduced motion the stack is simply there.

- **Every device is interpreting vernacular that encodes something true.** Channel numbers, timecodes, A/B/C language classes, relay, "into Spanish" groupings, booth against remote, booked against held. Nothing is decoration.
- **Direction is the unit of an interpreter's work.** The hours chart is grouped by the language she works into, labelled in words ("English into Spanish", which reads well aloud, not "EN → ES"), and the missing direction is stated: "Into Portuguese: not offered. Portuguese is a passive language." Buyers who need Portuguese output learn it before they write.
- **The two charts agree.** 976 days at about 4.5 hours of own microphone time is 4,420 hours, the sum of the hours chart. An adopter who edits one should keep the other consistent.
- **One hue.** Red is a tally light: the ch 1 dot and booked days, nothing else. Bars are graphite, encoded by position. Remote days are an ink diagonal hatch with an ink outline, held days a dashed ink outline, and 2026 a dashed "to date" frame, so no state depends on colour.
- **Value labels are always visible; hover and focus add the rest.** Bars end in their hours and columns carry their total, so the charts read without interaction. Hover or keyboard focus draws a 2px outline and shows what is not already on screen, in the chart itself: events and share at the right end of the bar's label row ("212 events, 48% of all hours"), or the on-site/remote split above the columns ("2020: 22 on site, 71 remote (76%)"). The full sentence also goes to a visually hidden live region for screen readers. Bar labels read "From English" under the "Into Spanish" group, so the direction is never said twice. Each chart has a visible "Figures as a table" with a real `<table>`.
- **The form has a real job.** Picking days in the calendar fills "Event dates" (text the visitor typed there is kept and the day is appended), picking days while the draft is open updates the draft, the enquiry becomes a drafted email shown as To / Subject / Body, and the two send links open the visitor's own email app or WhatsApp with that text. The page never pretends to send anything, and "Edit enquiry" returns to the form with every value kept.
- **Clear hierarchy.** The name is `--fs-3`, section headings `--fs-2`, and item titles (assignments, the draft) `--fs-1` in weight 620, so the log reads as one section with entries. The role line states the modes and languages once; the figcaption is the only text that explains the stack, and the two buttons follow it directly.
- **No containers.** Charts, the assignment log and the calendar sit on the concrete, separated by space and a single rule where content changes. White appears only where something is writable: inputs, calendar cells, the drafted email.
- **Two Argentine families with separate jobs.** Piazzolla (Huerta Tipográfica; opsz 8-30, roman and italic) speaks: the name, the stack lines (opsz 30, wght 420, floor roman, booths italic), headings, body, assignment notes and the drafted email. Saira (Omnibus-Type, Buenos Aires; set at wdth 87.5) labels the console: channel tags, timecodes, chart labels and values, calendar, form and buttons. Tabular lining figures confirmed in Chromium (1111 and 0000 measure the same width).
- **Concrete, not cream.** The ground is the béton-brut grey of the CEPAL building in Santiago, where a Santiago interpreter actually works. It keeps the page out of the pale grey-green and warm-cream clusters.

Contrast, measured: graphite `#23262A` on concrete 10.6:1, on white 15.2:1; secondary `#4F5257` on concrete 5.4:1, on white 7.8:1; tally `#B3202E` on concrete 4.6:1, on white 6.6:1; white on graphite 15.2:1. `--rule` `#ADAAA4` (1.6:1) is decorative only and never bounds a control.

Defaults considered and rejected: a "4,420 hours interpreted" big-number hero (the total lives in the chart note); a dark "booth at night" look with one accent; KPI cards, a language donut and a contact sidebar in rounded white cards; three categorical language colours; tracked all-caps channel labels and monospace timecodes; middle-dot meta strings; assignment cards with hover lift; a "Download CV" button (there is no file to point to, so it would be a dead end). The italic on assignment notes was removed late: italic is reserved for interpreted speech.

## Do not touch

- The stack's three lines, their order, their `lang` attributes, roman floor and italic booths, the `--n` step and the timecodes. The tally dot stays on channel 1 only. On phones the tag and timecode move above each line, and the whole block keeps its `--n × --lag` indent so wrapped lines keep the step.
- From 640px each stack line is sized from the width it really has (`.stack` is a size container; `.say` uses `(100cqi - --tag-w - --sp-5 - --lag) / 22`), so the three lines stay one row each and parallel down to about 768px. 22 is the Spanish line's width in em: with a longer sentence, raise the divisor. The channel tags are `--fs-1` in ink at that width (timecode in `--ink-2`), large enough to read the lag; the relay note is a second line of the ch 2 tag, not a line under the text.
- One load animation only, under about 2.5 s, opacity only, off under `prefers-reduced-motion`. Word spans are never `aria-hidden` and never split inside a word.
- Red means live or booked. Do not use it for links, buttons, hover or highlights. Error text is the only other place it appears.
- The "not offered" sentence for a C-class language with no rows. Do not hide a missing direction.
- One Tab stop per chart (roving tabindex), arrows and Home/End to move, Escape to leave; calendar arrows move by day and week and skip booked days.
- No form `action`, no `href="#"`, no relative links. Every external link, including the static no-JS email fallback, opens with `target="_blank" rel="noopener"` and says "opens in a new tab" in its accessible name.
- If `CONTACT` has neither `email` nor `whatsapp`, the form is replaced by a plain "not taking enquiries" note: a draft with no way to send it would be a dead end.
- Contact links keep a visible text label at every width (a two-column grid of 44px links on phones).

## Adapting

**Contact and social links.** Edit `CONTACT` at the top of the script. Delete a key to hide that link; the send buttons in the drafted email also disappear for a missing `email` or `whatsapp`. To add a network, add one line whose value is a full https URL, e.g. `mastodon: 'https://mastodon.social/@ines'`; it renders with a generic link icon and the key as its label. For a known network with its own icon, add an entry to `NETWORKS` with `label`, `url: v => ...` and an inline SVG `icon` path on a 24×24 viewBox. `whatsapp` is the number with country code; spaces, `+` and dashes are stripped. Profile networks accept a username or a full https URL. A key that is neither a known network nor a full https URL is skipped with a `console.warn`.

**Chart data.** `LANGS` lists the languages with their AIIC class (A, B, C). `HOURS` has one row per direction (`from`, `to`, `hours`, `events`); rows are grouped under the target language automatically, and a C-class language with no rows produces the "not offered" sentence. `YEARS` has one row per year (`onsite`, `remote`, optional `toDate: true` for the current year). The notes, the hidden sentences, the tables all derive from these arrays. The direction checkboxes in the form derive from `LANGS` (every pair into a non-C language), so emptying `HOURS` never blocks the enquiry. Empty arrays show "No hours logged yet. Add rows to HOURS at the top of the script." and all-zero rows draw empty bars, with no console errors. For another profession, rename the groupings in copy (specialties instead of directions, solo and team instead of on site and remote) and keep the structure.

**Availability.** `CALENDAR.weeks` sets how many weeks to show from this Monday (local time; at the weekend it starts next Monday). `booked` and `held` take numbers, counted as open weekdays from today so the demo never goes stale or lands on a past day, or real `'YYYY-MM-DD'` strings. For production, replace the arrays with your own dates.

**Connecting a real backend later.** The submit handler already reads every field (name, email, whatsapp, dates, directions, mode, message) after validation and before building the draft. To send it, gather those values into one object and `fetch` it as JSON to your endpoint (a form service, a serverless function, a CRM) inside the handler, keep `preventDefault`, show the same confirmation on success, and show an inline error with the mailto and WhatsApp links as a fallback on failure. Availability can be loaded the same way: fetch booked and held dates as ISO strings into `CALENDAR` before the calendar renders (for example from a shared calendar's free/busy feed).

**Brand.** Change the colour tokens first, keeping one hue for "live" and everything else in ink. Piazzolla can be replaced by another text serif with an italic and an optical-size axis; Saira by any semi-condensed sans with tabular figures. With a much longer sentence in the stack, reduce `--fs-4` rather than the `--lag` step.

| Token | Role |
|---|---|
| `--concrete` | Page ground |
| `--ink` | Text, bars and columns, remote hatch and outline, buttons, chosen days, focus ring |
| `--ink-2` | Secondary text, input and free-day borders, chart direct labels |
| `--tally` | Ch 1 tally dot, booked days, error text |
| `--white` | Inputs, calendar cells, the drafted email, text on the primary button |
| `--rule` | Decorative dividers, table rules and the frame of booked calendar days (not controls) |
| `--font-text` | Piazzolla with serif fallbacks |
| `--font-ui` | Saira with condensed sans fallbacks |
| `--ui-width` | 87.5% width for Saira, the console-legend voice |
| `--root-size` | 106.25%: a 17px base |
| `--fs-0` | 13.8px: labels, chart text, phone-width channel tags |
| `--fs-1` | 18px: body, form, item titles, channel tags from 640px |
| `--fs-2` | 23.4px: section headings |
| `--fs-3` | 30.8px: the name |
| `--fs-4` | 25.5 to 44.6px fluid: the decalage lines (capped by the container fit from 640px) |
| `--lh-body`, `--lh-stack`, `--lh-label` | 1.55, 1.15, 1.3 |
| `--measure` | 62ch body measure |
| `--sp-1` to `--sp-9` | 4, 8, 12, 16, 24, 32, 48, 72, 112px |
| `--lag` | One indent step of the stack, 12 to 56px fluid |
| `--tag-w` | Gutter for channel tag and timecode from 640px |
| `--max`, `--side`, `--gap` | 1200px content, 16px side gutter (32px from 640px), 24px column gap |
| `--target` | 44px minimum for links, buttons, inputs, checkboxes |
| `--radius` | 2px on inputs, buttons, calendar cells and the drafted email only |
| `--lag-scale`, `--word-step`, `--word-fade` | Load sequence: real lag × 0.22s, 80ms per word, 320ms fade |
