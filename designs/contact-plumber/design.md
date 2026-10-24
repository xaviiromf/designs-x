---
title: Brunton & Hay call-out
section: contact
subject: The contact block of Brunton & Hay, a fictional two-van plumbing and heating firm in Leith, Edinburgh, covering EH1 to EH17.
aesthetic: Van-door signwriting on porcelain. White Gabarito lettered on one solid cold-tap blue panel, a plain white form beside it, and hot-tap red kept only for "act now". The colours follow the trade's hot and cold tap code.
mode: light
fonts:
  - Gabarito 400, 500, 700, 800 (Google Fonts), the only family
js: Validates the call-out form per field (on blur once touched, live once in error, all on submit), swaps the under-sink joint drawing to the chosen urgency, opens the emergency panel for "Now" (CSS :has with a class fallback), and replaces the form in place with a call-back confirmation whose time is computed from the local clock. Nothing is sent. runSelfTest() runs on #selftest.
libraries: []
tags: [contact, form, validation, call-back, plumbing, local-business, joint, inline-svg, emergency, light]
use_when:
  - A local trade or emergency service (plumber, electrician, locksmith, glazier, boiler engineer) where some people need the phone right now and others can wait for a call-back.
  - The enquiry has a real severity scale and the answer changes what the person should do next.
  - The business covers a fixed area that can be checked from a postcode or ZIP.
avoid_when:
  - There is no phone line or no urgent case. Then the red emergency route and the severity picture have nothing to say, so use a plain contact form.
  - The brand already owns a different single strong colour. The full-height blue panel is the design's one colour field and would fight it.
  - Enquiries need attachments, account sign-in or multi-step booking. This is one short form with nothing sent.
---

## Why it works

**The bold idea: the joint under the sink.** The first question, "How urgent is it?", is four real radio buttons beside one inline-SVG drawing of the same compression joint, the one under every kitchen sink. Each answer draws that joint in a state anyone can read at a glance, with no plumbing knowledge:

- With no answer, it is a bare steel outline with no water, which reads as "not told us yet".
- Whenever suits: a dry joint, wrapped in blue PTFE tape.
- This week: a single bead of water forming under the nut.
- Today: a steady drip into a washing-up bowl, drawn as static drops.
- Now: a split pipe spraying, with the spray in hot-tap red.

The states are four `<g>` layers in one viewBox. The chosen layer fades in over 0.25s and the outgoing one fades out over 0.15s. There are no loops and no animated drips. The drawing is `aria-hidden`, because the radios, with visible titles and example lines, carry the meaning. The picture only repeats the answer.

- **Why not a gauge or dial.** The first plan was a boiler pressure gauge whose needle overshot into a red zone. It was rejected for two reasons. First, a needle that overshoots and settles is already the signature of crud-vet-clinic (a spring scale) and features-mixing-plugin (a VU meter), and a third needle dial would make the collection look like one studio. Second, it was semantically backwards: on a real boiler gauge the red zone means over-pressure, yet the "Today" example says "boiler pressure under 1 bar", so a boiler owner would read the needle the wrong way. The joint shows leaks, which is what is actually wrong.
- **The blue van panel is the one strong colour field.** The whole "ring us" column (heading, lede and the three direct channels) sits on a full-height panel of cold-tap blue `#1A5A9E`, lettered in white Gabarito like the side of a van. That is what Gabarito was chosen for, and it puts the phone number on the van door. The rest of the page and the form are plain porcelain white. On the panel, links are white with a white underline, separators are 1px white at 35%, and focus is a 3px white ring with a 1px slate inner edge, never blue on blue. White on the blue is 7.0:1. The panel replaced a cool grey-green page (`#EEF2F1`) that sat in the same band as portfolio-sports-physio, story-solar-coop and most other contact plans.
- **Hot and cold have jobs.** Blue is the ordinary action colour: links, the submit button, focus, the chosen urgency row and the PTFE tape. Red means act now and nothing else: the "Now" row, the spray, the emergency panel, field errors and the red line on the result. Red never sits on the blue panel and is never decorative.
- **It sorts people quickly.** "Now" opens a red panel in place, directly under the radios and before any field, so the "Call 0131 496 0418 now" button is the next Tab stop after the radio group. It also gives one useful instruction while they wait (turn the stopcock clockwise). On phones the blue panel comes first, so the tel: link is reached before any input. A postcode outside EH1 to EH17 does not end the flow. It routes the person to a call, where the firm will recommend someone nearer.
- **The confirmation is honest about time.** Call-backs run every day from 7am to 9pm, while the phone line is 24 hours. With "Any time" the result says "within the hour" between 7am and 8pm, "from 7am tomorrow" after 8pm, and "from 7am today" before 7am. A chosen slot that has already ended rolls to tomorrow ("tomorrow afternoon, between 12 and 5" after 5pm). The firm is assumed to do call-backs on Sundays too. If the business doesn't, change `callbackWhen`. runSelfTest covers these cases, plus the phone, postcode and area validators.
- **Validation tells people how to fix it.** Labels are static, above each field, with steel hints under them. Floating labels were dropped because they hide the hint and shrink the label while you type. Errors appear on blur once a field has been touched, then update live as you type, and every field is checked on submit. Each error sets `aria-invalid`, joins `aria-describedby` and opens below the field through a grid-rows reveal, with a small warning mark so the error doesn't rely on colour alone. An invalid submit focuses the first problem and says how many remain ("4 things to fix before we can call you"). Nothing shakes. The result is built with `textContent` only.
- **The verbs match.** "Request a call-back" leads to "Call-back requested". "Call 0131 496 0418 now" opens the dialler. "Change my request" brings the form back with every value kept, and "Send another request" resets it.
- **The defaults it avoids (reasoned).** The one big number is the 27px phone number. It is a working tel: link, not a stat, it has no gradient, and the H2 stays larger. There are no eyebrows and no "24/7" pill, the captions are informative sentence case, there are no middle dots and no arrows after links. The channels are plain rows, not icon cards. There are no shadows, and radii vary by role (4px fields, 8px buttons, 2px panel). There are no scroll reveals and no load sequence.
- **Fictional on purpose.** Numbers come from Ofcom's drama ranges (0131 496 0xxx, 07700 900xxx), the email domain is invented, and nothing claims a real registration or accreditation.

## Do not touch

- The radios are the control and the joint is only a picture of the answer. Keep the drawing `aria-hidden` and never make it clickable on its own.
- The emergency panel's DOM position, straight after the urgency fieldset, so its call button is the first Tab stop after the radios.
- Red only for act-now and errors, and never on the blue panel.
- Channels before the form at narrow widths.
- The out-of-area error that routes to a call, and the clock-aware call-back line.
- `novalidate` is added by JS only, so the native `required`, `minlength` and `pattern` attributes still guard the form without JS.
- Keep the `:has()` rule and the `.is-now` class rule as separate rules. In a single selector list, a browser without `:has` would drop both.
- The radio list comes from `querySelectorAll('input[name=urgency]')`, not `form.elements.urgency`, because the fieldset's id `urgency` would join that list.

## Motion

Simple tier: no libraries, no load sequence, no scroll motion and no ambient loop. A single `prefers-reduced-motion: reduce` block sets every transition and animation to 0.01ms, so each item lands in its final state at once.

| Item | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Panel links (phone, email, map) | HV2 underline sweep, enters left and leaves right | hover, focus | background-size 0.4s cubic-bezier(.35,0,0,1) | static underline; always shown under `(hover: none)` |
| Lede tel link | HV2 replacing a resting underline | hover | 0.4s | stays underlined |
| Urgency row | tint, 4px leading bar, dot scale 0 to 1 | hover, check | 0.15s ease-out | instant |
| Joint drawing | layer crossfade | radio change | in 0.25s, out 0.15s | instant swap |
| Emergency panel | MI4 grid-template-rows 0fr to 1fr plus opacity | "Now" checked or unchecked | open 0.25s, close 0.2s | instant |
| Submit and call buttons | HV4 rising fill from the bottom, MI1 press | hover, active | fill 0.3s in and 0.22s out; press scale .97 in 0.12s, release 0.35s with overshoot | colour only, no scale |
| Field focus and errors | border and inset ring; MI4 grid-rows error reveal | focus, validation | 0.15s; errors open 0.2s and close 0.15s | instant |
| Result panel | opacity fade, no slide | valid submit | 0.25s | instant |
| Result text buttons | HV2 sweep, MI1 press .98 | hover, focus, active | 0.4s, 0.12s | static underline |

## Adapting

Change the `:root` tokens first. `--c-cold` must keep at least 4.5:1 with white, because the whole panel is lettered in white. `--c-hot` must pass 4.5:1 on white for the error text and with white text on the emergency panel. Keep one cold and one hot colour even when the brand isn't a plumber: one for ordinary actions and one for "act now".

Redraw the joint for the trade. Keep four states of one object on a real severity scale and add no water or sparks until there is a problem: for example a fuse box (fine, warm socket, tripping, smoke) or a lock (sticking, stiff, broken key, locked out). Edit `MSG`, `LABEL`, the option copy, `inArea` (the service area) and `SLOTS` and `callbackWhen` (opening hours). Phone validation is UK-only (`ukPhone`), so replace it for other countries.

Longer channel captions wrap within the 5/12 column. At 640 to 1039px the channels sit three across, so keep each caption under about 35 characters. To retime motion, change `--t-fast`, `--t-mid` and `--t-sweep`. To remove it, delete the transitions on `.lk`, `.btn::before` and `.joint .layer`. Everything still works without them.

| Token | Role |
|---|---|
| `--c-porcelain` | Page and form ground, input fill, text on blue and red |
| `--c-slate` | Ink, headings, inner edge of the focus ring on the panel |
| `--c-steel` | Hints, example lines, input borders, the bare joint outline |
| `--c-cold` | The van panel, links, submit, focus, chosen urgency, PTFE tape, drips |
| `--c-cold-deep` | Submit hover fill only |
| `--c-hot` | "Now" row, spray, emergency panel, errors |
| `--c-rule` | Section border and result divider (never a control border) |
| `--c-on-cold-rule` | Separators between channels on the blue panel |
| `--ff-sans` | Gabarito, the only family |
| `--fs-xs` to `--fs-h` | 1.25 scale on a 17px base; `--fs-h` is the H2 and the result heading |
| `--sp-1` to `--sp-9` | 4px-based spacing |
| `--r-field`, `--r-btn`, `--r-panel` | 4px fields, 8px buttons, 2px panels |
| `--t-fast`, `--t-mid`, `--t-sweep` | 0.15s, 0.25s and 0.4s transition timings |
| `--joint` | Joint drawing width: 152px, 112px under 640px |
