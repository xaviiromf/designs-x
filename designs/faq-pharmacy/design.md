---
title: What people ask at the counter
section: faq
subject: Questions and answers for Wharf Lane Pharmacy, a fictional independent NHS community pharmacy in Ashwell Bridge, England, covering prescriptions, vaccines and home delivery.
aesthetic: A dispensing label on the dispensary bench. Each open answer is a white die-cut label on cool blue bench laminate, with amber medicine-bottle glass as the only accent and Inclusive Sans throughout.
mode: light
fonts:
  - Inclusive Sans 400, 500, 600 (Google Fonts, variable wght 300..700)
js: none
libraries: []
tags: [faq, pharmacy, health, nhs, details-summary, css-only, accordion, light]
use_when:
  - An FAQ for a service whose answers each apply to a specific group of people and carry a few hard facts (how long, how much, what to bring).
  - Health, civic, council or utility services with an older or anxious audience, where plain type, large targets and a visible phone number matter more than flair.
  - The page must work with no JavaScript at all.
  - 8 to 20 questions in 2 to 4 groups, with answers of one to three short paragraphs.
avoid_when:
  - Answers are long articles with headings, tables or images. A label holds a few paragraphs, not a document.
  - Readers need several answers open at once to compare them. `name="faq"` keeps one open at a time.
  - Questions need deep links that open a specific answer. Fragments do not open a closed `<details>` in every browser, so this design links only to group headings.
  - A brand that must feel playful or dark.
---

## Why it works

**The one bold idea: every answer is a dispensing label.** Open a question and its answer appears as a white label with a 6px die-cut radius on the blue bench, smoothed on left to right the way a pharmacist's thumb presses a label onto a box. Its anatomy is a real pharmacy label's, but each part carries true information instead of decoration:

- **The patient slot becomes "For:".** It says who the answer applies to, and each one is distinct: "For: adults paying in England", "For: anyone aged 1 or over with one of seven conditions", "For: anyone not home when the driver calls". A reader can see in one line whether to read on.
- **A rule, the answer, a rule, then the facts.** The bottom row is a `<dl>` of Takes, Costs and Bring, and only the facts that are true for that question appear. Some labels have two, some one, four have none. The pharmacy-name header and "Keep out of reach of children" footer were left off, because they would repeat on all 13 labels and say nothing.
- **One label at a time, like one label printer.** Every `<details>` shares `name="faq"`, so the native exclusive accordion closes the open answer when another opens. No script is involved.
- **Motion answers the click and nothing else.** The label is revealed with `clip-path: inset(0 100% 0 0)` to `inset(0)` over 0.36s. Closing is instant and native, which reads like peeling the label off. The plus loses its vertical bar and turns amber.

Supporting decisions:

- **Mirrored layout.** Most FAQ sections put the heading on the left and questions on the right. Here the heading, intro, topic index and questions run down columns 1 to 7, and the counter block (phone, email, hours, address) sits on the right in columns 9 to 12 like the dispensary hatch. From 1000px wide and 760px tall it is sticky, because the phone number staying in view is the real escape route for someone whose question is not listed. At 390px it comes straight after the intro, so the phone number is on the first screen, before the list.
- **Palette from the dispensary, not the green cross.** Pharmacy green is the cliché, and the collection already has many greens. `--bench` #DCE5F0 is the cool blue laminate of a dispensing bench. `--amber` #7F4209 is the brown glass of a medicine bottle and is the only accent: open indicators, focus rings, link hover and the `:target` bar, never body text. Text is `--thermal` #2A292D, the dark of thermal print, chosen rather than a tinted #111. **This is not default 1:** the ground is cool blue, not cream; there is no serif display; amber is a dark bottle brown, not terracotta. **It is not the seed-library blotter either:** features-seed-library's #D6E0E6 is a greyer paper blue under a manila card and printer's blue ink, and this bench was moved to #DCE5F0 (and the rules to #B0BCCB) so neither ground nor rule sits within a visible ΔE of seed-library or cta-tide-forecast.
- **Inclusive Sans for the audience.** It was drawn for accessibility, with clearly different I, l and 1 and an unambiguous zero, which matters on doses, ages and quantities ("16 to 18", "11 in 12 months", "01632"). One family only: H2 at 600, questions at 500, body at 400, the For line and fact keys at 600 in the small step. Inclusive Sans has no `tnum` feature (measured in Chromium: '1111' is 73px and '0000' is 100px at 40px, with or without `tabular-nums`), so the opening hours put each time in a fixed-width cell, right-aligned for the closing time, instead of faking a mono face.
- **Structure is information.** Each rule between rows marks one question. Topic counts appear once, in the index, where they help choose ("Prescriptions 5"); screen readers hear "5 questions". The Pharmacy First conditions are a real list, so they are a `<ul>` with their ages. There are no eyebrows, no capitals, no arrows and no shadows; the only rounded corner is the label's die cut.
- **No dead ends without JavaScript.** There is no form: booking is a phone call, so the `tel:` link is the action. Index links go to the three group headings and each group ends with "Back to topics". The two NHS links, the phone and the email open with `target="_blank" rel="noopener"`.

Contrast, measured with the WCAG formula:

| Pair | Ratio |
|---|---|
| `--thermal` on `--bench` | 11.36:1 |
| `--thermal` on `--bench-deep` (hovered row) | 9.91:1 |
| `--thermal` on `--label` | 14.45:1 |
| `--amber` on `--bench` | 6.15:1 |
| `--amber` on `--bench-deep` | 5.36:1 |
| `--amber` on `--label` | 7.82:1 |
| `--rule` on `--bench` / `--label` | 1.51:1 / 1.93:1 (decorative dividers only; the indicator ring is `--thermal`, 11.36:1) |

## Motion

Tier: simple. CSS only, no JavaScript. Every transition and animation sits inside `@media (prefers-reduced-motion: no-preference)`. Ambient motion: none. The one question that is open in the markup (Q2, so the label is visible on arrival) plays its 0.36s apply once on load; that is the only motion nobody asked for.

| # | Element | Technique (research/motion-techniques.md) | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| 1 | Question row | Plain background tint (HV7 sibling dimming rejected) | `:hover` inside `(hover: hover)` | `--bench` to `--bench-deep`, 0.2s ease-out; ring fills `--thermal` | Same tint, no transition |
| 2 | Indicator ring | MI1 press and release, ring only | `summary:active` | scale .9 over 0.12s ease-out, release 0.35s `cubic-bezier(.34,1.56,.64,1)` | Ring border turns amber, no scale |
| 3 | Answer label (signature) | CD6 adapted: native `<details name="faq">` plus a clip-path apply | Click, Enter or Space on the summary | `clip-path: inset(0 100% 0 0)` to `inset(0)`, 0.36s `cubic-bezier(.2,.7,.2,1)`; plus to minus via `scaleX(0)` on the bar, 0.2s; close is instant | `animation: none`, label shows at once |
| 4 | Every link and summary | Focus ring, not a motion technique | `:focus-visible` | 3px `--amber` outline, offset 3px (inset on summaries), instant | Unchanged |
| 5 | Topic index links | HV2 directional underline sweep | `:hover`, `:focus-visible` | 0.08em underline enters from the left and leaves to the right, 0.4s `cubic-bezier(.35,0,0,1)`; text turns amber | Underline shown statically; touch shows a persistent 1px underline |
| 6 | Index and "Back to topics" jumps | NV6, CSS part only | Click | `scroll-behavior: smooth`, `scroll-margin-top: 24px`; targets carry `tabindex="-1"` | `scroll-behavior: auto` (jump) |
| 7 | Group heading landed on | `:target` confirmation, related to SC16 | `h3:target` | 4px amber bar, `scaleY(0)` to `1` from the top, 0.35s `cubic-bezier(.2,.7,.2,1)`; stays while the hash is set | Bar shown statically |
| 8 | Links in answers, phone, email, back links | HV2 variant that keeps the underline | `:hover`, `:focus-visible` | Persistent 1px underline thickens to 2px and turns amber, 0.2s | No transition |

There are no scroll-driven effects, no reveals on enter and no sticky choreography. The sticky counter block is layout.

## Do not touch

- The label anatomy: For line, rule, answer, rule, facts `<dl>`. Each For line must be true and distinct, and a fact row appears only when the fact is true for that question. Do not add a pharmacy header or a warning footer to every label.
- `name="faq"` on every `<details>`. One label at a time is part of the idea, and it is what lets the page stay script-free.
- The apply animates `clip-path` only. Do not animate height (`::details-content`, `interpolate-size`): that is Chromium-only, animates layout and would double the signature. Close stays instant.
- No links into closed answers. A fragment does not open a closed `<details>` in every browser, so such a link would be a dead end. Link to the group headings.
- The summary holds only the question and the `aria-hidden` indicator. No headings or links inside a summary.
- The counter block comes before the question list in the DOM, so the phone number is on the first screen at phone widths. Sticky only from 1000px wide and 760px tall, so it never traps content taller than the window.
- `--amber` is never body text, and links in running text keep their underline, because colour must not be the only cue.
- Summaries stay at least 48px tall. The audience skews older.

## Adapting

Change the six colour tokens first, then rewrite the questions. Keep a cool, quiet ground and one dark accent that passes 4.5:1 on the ground, on the hover tint and on the label; re-measure all three.

Copy: questions in sentence case, answered in the second person from behind the counter. A label works up to about three short paragraphs or a short list. Write the For line first; if you cannot say who an answer is for, the question probably needs splitting. Fact keys can change with the subject (a library might use Loan, Fine, Bring), but keep them to three and keep the order the same on every label. Group headings need an `id` and `tabindex="-1"`, a count in the index and a "Back to topics" link.

Layout: the questions column holds 7 of 12 columns from 1000px. Long questions wrap under themselves with the indicator staying on the right. More than four groups will wrap the topic index onto two lines, which is fine.

Retiming or removing motion: `--apply` sets the label's duration; delete the `details[open] > .label` rule to show labels at once. Remove the `open` attribute from Q2 to have no motion at all on load. Hover, press and underline timings live in the single `prefers-reduced-motion: no-preference` block at the end of the stylesheet; deleting that block leaves a fully working, static design.

| Token | Role |
|---|---|
| `--bench` | Page ground: dispensary bench laminate |
| `--bench-deep` | Hovered question row |
| `--rule` | Row dividers and the rules inside the label (non-text only) |
| `--label` | The answer label stock |
| `--thermal` | All text, the indicator ring |
| `--amber` | Open indicator, focus ring, link hover, `:target` bar |
| `--font` | Inclusive Sans, the only family |
| `--step--1` to `--step-4` | Type scale, ratio 1.25 from 17px |
| `--s1` to `--s9` | Spacing scale, 4px base |
| `--radius-label` | Die-cut corner of the label, the only rounded rectangle |
| `--radius-ring` | Indicator ring |
| `--rule-w` | Width of every rule |
| `--apply` | Duration of the label apply |
| `--ease-out`, `--ease-back` | Reveal easing and the overshoot on press release |
