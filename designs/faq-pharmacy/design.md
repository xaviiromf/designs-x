---
title: What people ask at the counter
section: faq
subject: Questions and answers for Wharf Lane Pharmacy, a fictional independent NHS community pharmacy in Ashwell Bridge, England, covering prescriptions, vaccines and home delivery.
aesthetic: A dispensing label on the dispensary bench. Each open answer is a white die-cut label on cool blue bench laminate, with amber medicine-bottle glass as the only accent and Inclusive Sans throughout.
mode: light
fonts:
  - Inclusive Sans 400, 500, 600 (Google Fonts, variable wght 300..700)
js: One click listener keeps a tapped question where it was on screen when the exclusive accordion closes a taller label above it; without JavaScript every question still opens and closes natively.
libraries: []
tags: [faq, pharmacy, health, nhs, details-summary, accordion, light]
use_when:
  - An FAQ for a service whose answers each apply to a specific group of people and carry a few hard facts (how long, how much, what to bring).
  - Health, civic, council or utility services with an older or anxious audience, where plain type, large targets and a visible phone number matter more than flair.
  - The page must work with JavaScript off. The one small script only keeps the tapped row in place.
  - 8 to 20 questions in 2 to 4 groups, with answers of one to three short paragraphs.
avoid_when:
  - Answers are long articles with headings, tables or images. A label holds a few paragraphs, not a document.
  - Readers need several answers open at once to compare them. `name="faq"` keeps one open at a time.
  - Questions need deep links that open a specific answer. Fragments do not open a closed `<details>` in every browser, so this design links only to group headings.
  - A brand that must feel playful or dark.
---

## Why it works

**The one bold idea: every answer is a dispensing label.** Open a question and its answer appears as a white label with a 6px die-cut radius on the blue bench, fed out line by line from the top, the way a thermal label printer prints it. Its anatomy is a real pharmacy label's, but each part carries true information instead of decoration:

- **The patient slot becomes "For:".** It says who the answer applies to, and each one is distinct: "For: adults paying in England", "For: anyone aged 1 or over with one of seven conditions", "For: anyone not home when the driver calls". The prepayment certificate prices are figures, £32.05 for 3 months and £114.50 for 12 months, read from nhs.uk on 2026-10-24, re-checked unchanged on 2026-10-25, and dated "from April 2024" in the copy; re-check them before reuse. The per-item charge could not be read from any nhs.uk page that day, so the copy says "the NHS charge for each item, set each April" rather than print an unverified figure. A reader can see in one line whether to read on.
- **A rule, the answer, a rule, then the facts.** The bottom row is a `<dl>` of Takes, Costs and Bring, laid out as one strip of cells divided by rules, like the fixed strip at the foot of a printed label (each `dt` and `dd` pair sits in a `<div>`; below 480px the cells stack as key and value rows). Only the facts that are true for that question appear, always in that order: four labels have two, four have one, five have none. Facts are hard figures or things to bring; a fact that only repeats the answer was cut. The pharmacy-name header and "Keep out of reach of children" footer were left off, because they would repeat on all 13 labels and say nothing.
- **One label at a time, like one label printer.** Every `<details>` shares `name="faq"`, so the native exclusive accordion closes the open answer when another opens. On a phone that closing label can be taller than the screen, which would throw the question you tapped off the top; one click listener measures the tapped row before the toggle and scrolls by the difference in the next frame, so the row stays under your finger and the label prints in view. Without JavaScript the accordion still works.
- **Motion answers the click and nothing else.** The label is revealed with `clip-path: inset(0 0 100% 0)` to `inset(0)` over 0.48s in `steps(8, end)`, so it arrives in hard bands like a printer head advancing. Closing is instant and native, which reads like tearing the label off. The indicator is a bare plus; when open it loses its vertical bar and sits in a filled amber square with the label's 6px die cut, so the open marker echoes the label it opened.

Supporting decisions:

- **One left-aligned column, no rail.** Heading, intro, topic index, then the three groups at 62ch. A sticky rail beside an accordion had become the template of this section, so it was dropped. The phone number is the escape route, so it sits in the intro sentence ("ring 01632 960 418") and again in the counter block, with hours and address. From 1000px the counter block sits in a second column (`minmax(16rem, 1fr)`, so it never drops under 16rem and the page never scrolls sideways) in the first row, its foot level with the topic index, so the number is visible on arrival; the questions then run on alone below. It is never sticky. At phone widths it follows the list. The phone, email and intro phone links are at least 44px tall for touch.
- **Palette from the dispensary, not the green cross.** Pharmacy green is the cliché, and the collection already has many greens. `--bench` #DCE5F0 is the cool blue laminate of a dispensing bench. `--amber` #7F4209 is the brown glass of a medicine bottle and is the only accent: open indicators, focus rings, link hover and the `:target` bar, never body text. Text is `--thermal` #2A292D, the dark of thermal print, chosen rather than a tinted #111. **This is not default 1:** the ground is cool blue, not cream; there is no serif display; amber is a dark bottle brown, not terracotta. **It is not the seed-library blotter either:** features-seed-library's #D6E0E6 is a greyer paper blue under a manila card and printer's blue ink, and this bench was moved to #DCE5F0 (and the rules to #B0BCCB) so neither ground nor rule sits within a visible ΔE of seed-library or cta-tide-forecast.
- **Inclusive Sans for the audience.** Readex Pro was the first choice, but its Latin is Lexend's skeleton and Lexend already carries three other designs in the collection, so this would have been a fourth. Inclusive Sans keeps the reading-ease reason: it was drawn for accessibility, with clearly different I, l and 1 and an unambiguous zero, which matters on doses, ages and quantities ("16 to 18", "11 in 12 months", "01632"). One family only: H2 at 600, questions at 500, body at 400, the For line and fact keys at 600 in the body size, so the line that tells you whether to read on is as large as the answer and weight carries the hierarchy. Inclusive Sans has no `tnum` feature (measured in Chromium: '1111' is 73px and '0000' is 100px at 40px, with or without `tabular-nums`), so the opening hours put each time in a fixed-width cell, right-aligned for the closing time, instead of faking a mono face.
- **Structure is information.** Each rule between rows marks one question. Topic counts appear once, in the index, where they help choose ("Prescriptions 5"); screen readers hear "5 questions". The Pharmacy First conditions are a real list, so they are a `<ul>` with their ages. There are no eyebrows, no capitals, no arrows and no shadows; the only rounded corner is the label's die cut, repeated on the open indicator. A circled plus was the stock accordion affordance, so it was dropped for a bare plus. List dashes are 2px bars placed on whole pixels so every row renders at the same weight.
- **No dead ends.** There is no form: booking is a phone call, so the `tel:` link is the action. Index links go to the three group headings and each group ends with "Back to topics"; the topic index shows the same amber `:target` bar as the headings, so a Back jump shows where it landed. The section sits in `<main>`. The two NHS links, the phone and the email open with `target="_blank" rel="noopener"`.

Contrast, measured with the WCAG formula:

| Pair | Ratio |
|---|---|
| `--thermal` on `--bench` | 11.36:1 |
| `--thermal` on `--bench-deep` (hovered row) | 9.91:1 |
| `--thermal` on `--label` | 14.45:1 |
| `--amber` on `--bench` | 6.15:1 |
| `--amber` on `--bench-deep` | 5.36:1 |
| `--amber` on `--label` | 7.82:1 |
| `--rule` on `--bench` / `--label` | 1.51:1 / 1.93:1 (decorative dividers only; the closed indicator is `--thermal`, 11.36:1) |
| `--label` on `--amber` (open indicator) | 7.82:1 |

## Motion

Tier: simple. HTML and CSS, plus one plain click listener that only holds the tapped row in place (it moves nothing visibly; see the signature row). Every transition and animation sits inside `@media (prefers-reduced-motion: no-preference)`. Ambient motion: none. The one question that is open in the markup (Q2, so the label is visible on arrival) prints its label once on load (0.48s); that is the only motion nobody asked for.

| # | Element | Technique (research/motion-techniques.md) | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| 1 | Question row | Plain background tint (HV7 sibling dimming rejected) | `:hover` inside `(hover: hover)` | `--bench` to `--bench-deep`, 0.2s ease-out; the indicator square fills `--thermal` | Same tint, no transition |
| 2 | Indicator | MI1 press and release, indicator only | `summary:active` | scale .9 over 0.12s ease-out, release 0.35s `cubic-bezier(.34,1.56,.64,1)` | Plus turns amber, no scale |
| 3 | Answer label (signature) | CD6 adapted: native `<details name="faq">` plus a stepped clip-path feed | Click, Enter or Space on the summary | `clip-path: inset(0 0 100% 0)` to `inset(0)`, 0.48s `steps(8, end)`, fill both; plus to minus by collapsing the vertical bar, 0.2s `cubic-bezier(.2,.7,.2,1)`; close is instant. A click listener records the tapped summary's top and, in the next animation frame, `scrollBy`s the difference with `behavior: 'instant'`, so a taller label closing above never pushes the question off screen. The native marker is removed (`list-style: none` and `summary::-webkit-details-marker { display: none }`) so only the CSS indicator shows | `animation: none`, label shows at once |
| 4 | Every link and summary | Focus ring, not a motion technique | `:focus-visible` | 3px `--amber` outline, offset 3px (inset on summaries), instant | Unchanged |
| 5 | Topic index links | HV2 directional underline sweep | `:hover`, `:focus-visible` | 0.08em underline enters from the left and leaves to the right, 0.4s `cubic-bezier(.35,0,0,1)`; text turns amber | Underline shown statically; touch shows a persistent 1px underline |
| 6 | Index and "Back to topics" jumps | NV6, CSS part only | Click | `scroll-behavior: smooth`, `scroll-margin-top: 24px`; targets carry `tabindex="-1"` | `scroll-behavior: auto` (jump) |
| 7 | Group heading landed on | `:target` confirmation, related to SC16 | `h3:target` | 4px amber bar, `scaleY(0)` to `1` from the top, 0.35s `cubic-bezier(.2,.7,.2,1)`; stays while the hash is set | Bar shown statically |
| 8 | Links in answers, intro phone, phone, email, back links | HV2 variant that keeps the underline | `:hover`, `:focus-visible` | Persistent 1px underline thickens to 2px and turns amber, 0.2s | No transition |
| 9 | Phone and email in the counter block | MI1 press and release | `:active` | scale .97 over 0.12s, release 0.35s `cubic-bezier(.34,1.56,.64,1)` | Colour only |

There are no scroll-driven effects, no reveals on enter and nothing sticky.

## Do not touch

- The label anatomy: For line, rule, answer, rule, facts `<dl>`. Each For line must be true and distinct, and a fact row appears only when the fact is true for that question. Do not add a pharmacy header or a warning footer to every label.
- `name="faq"` on every `<details>`. One label at a time is part of the idea. Keep the click listener with it: without it, tapping below an open label on a phone throws the tapped question off screen.
- The feed animates `clip-path` only, in steps. Do not animate height (`::details-content`, `interpolate-size`): that is Chromium-only, animates layout and would double the signature. Close stays instant.
- No links into closed answers. A fragment does not open a closed `<details>` in every browser, so such a link would be a dead end. Link to the group headings.
- The summary holds only the question and the `aria-hidden` indicator. No headings or links inside a summary.
- The phone number appears twice: in the intro sentence and in the counter block (level with the topic index on desktop, after the list on phones). Do not make the counter block sticky to "fix" the distance; the intro link is the fix.
- `--amber` is never body text, and links in running text keep their underline, because colour must not be the only cue.
- Summaries stay at least 48px tall. The audience skews older.

## Adapting

Change the six colour tokens first, then rewrite the questions. Keep a cool, quiet ground and one dark accent that passes 4.5:1 on the ground, on the hover tint and on the label; re-measure all three.

Copy: questions in sentence case, answered in the second person from behind the counter. A label works up to about three short paragraphs or a short list. Write the For line first; if you cannot say who an answer is for, the question probably needs splitting. Fact keys can change with the subject (a library might use Loan, Fine, Bring), but keep them to three and keep the order the same on every label. Group headings need an `id` and `tabindex="-1"`, a count in the index and a "Back to topics" link.

Layout: the questions column is capped at 46rem; from 1000px the counter block takes a column of at least 16rem to its right, in the first row, its foot level with the topic index. Long questions wrap under themselves with the indicator staying on the right. More than four groups will wrap the topic index onto two lines, which is fine.

Retiming or removing motion: `--feed` and `--feed-steps` set the label's duration and how many bands it prints in (more steps reads smoother and less like a printer); delete the `details[open] > .label` rule to show labels at once. Remove the `open` attribute from Q2 to have no motion at all on load. Hover, press and underline timings live in the single `prefers-reduced-motion: no-preference` block at the end of the stylesheet; deleting that block leaves a fully working, static design.

| Token | Role |
|---|---|
| `--bench` | Page ground: dispensary bench laminate |
| `--bench-deep` | Hovered question row |
| `--rule` | Row dividers and the rules inside the label (non-text only) |
| `--label` | The answer label stock |
| `--thermal` | All text, the closed indicator |
| `--amber` | Open indicator square, focus ring, link hover, `:target` bars |
| `--font` | Inclusive Sans, the only family |
| `--step--1` to `--step-4` | Type scale, ratio 1.25 from 17px |
| `--s1` to `--s9` | Spacing scale, 4px base |
| `--radius-label` | Die-cut corner of the label, repeated on the indicator square |
| `--rule-w` | Width of every rule |
| `--feed` | Duration of the label feed |
| `--feed-steps` | Number of print bands in the feed |
| `--ease-out`, `--ease-back` | Reveal easing and the overshoot on press release |
