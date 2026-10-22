---
title: Career on one axis
section: portfolio
subject: Personal portfolio of Renata Oyarzún, a fictional independent full-stack developer in Concepción, Chile, who maintains two open-source libraries (pliego and ascensor) and takes freelance contracts.
aesthetic: A developer's own handwriting on lilac-grey paper. Recursive's casual axis for the voice, its linear axis for the data, its mono axis only for real install commands; plum-black ink, two library colours told apart by line style, and one solid red reserved for client work.
mode: light
fonts:
  - Recursive, variable wght 300-1000, CASL 0-1, MONO 0-1 (Google Fonts). CASL 1 / 800 for the name and headings, CASL 0 / 400-600 for body, readout and axis ticks, MONO 1 only inside install-command <code>
js: One script reads DATA and CONTACT at its top, draws the shared-axis timeline as inline SVG with a keyboard and pointer cursor plus a data table, builds the contact and social links (with a prefilled brief in the email and WhatsApp links), and copies install commands with a select-the-text fallback; nothing is sent anywhere.
tags: [portfolio, personal, developer, freelance, open-source, chart, timeline, inline-svg, interactive, slider, contact-links, social-links, whatsapp, light, variable-font]
use_when:
  - One person (or a small studio) wants a portfolio whose evidence is a time series (downloads, sales, clients, publications, followers, anything counted per period).
  - Two or three kinds of activity run in parallel and the point is that they feed each other (open source and client work, teaching and research, commissions and exhibitions).
  - The owner needs to edit figures and contact links without touching layout.
avoid_when:
  - There are no honest figures, or fewer than about eight periods of them. The figure would look empty or invented.
  - The portfolio is mainly visual work (photography, illustration). A gallery serves it better than a chart.
  - The page must be dark, or needs a contact form that submits to a server.
---

## Why it works

**The bold idea: one shared time axis for the whole career.** A single figure stacks three tracks on the same quarterly x-axis, 2021 Q1 to 2026 Q3: weekly downloads of both libraries as two lines with release tags pinned on them, issues closed as bars, and client contracts as solid red spans. One cursor scrubs all three at once (hover, drag, tap, arrow keys, Earlier/Later buttons) and rewrites one plain sentence above the plot: "2024 Q2. pliego had 41,200 weekly downloads and ascensor 9,800. 63 issues closed. Released pliego 3.0. Working with Vinoteca Itata." The story it tells without a word of selling: client work and open source run side by side and feed each other. Releases and issue spikes land inside contracts, because client work pays for the features, and each case says which release it produced ("The async stock checks became pliego 3.0."), so the case copy and the readout confirm each other.

- **The figure is the first screen.** From 1100px the name and lede sit in a narrow left column and the whole figure in the right one, so all three tracks are visible at 1440x1000 with the name. On phones the intro is one name, one paragraph and one button, and the downloads track starts above 900px. There is no icon row in the header; the contact block at the end is the single home for networks.
- **It opens on the latest release** (2025 Q4 in the sample), not on the last quarter, so the first sentence a visitor reads shows everything the readout can say: downloads, issues, a release and a client. The hint under the plot says so ("opening at pliego 4.0, the latest release"). Both are computed from DATA. There is no ambient motion.

- **One family, three voices.** Recursive's casual axis (CASL 1, 800) is the personal voice for the name and headings, a developer's handwriting rather than a terminal. Linear (CASL 0) carries body, readout and ticks with tabular figures. The mono axis appears only where there is real code (`npm i pliego`). No other face in the collection does this.
- **Not the developer default.** No near-black terminal, no green contribution heatmap, no KPI row of stars and downloads under the name. Numbers appear only inside the figure, its sentence and its table.
- **Series are told apart three ways.** pliego is a solid 2.5px spruce line, ascensor a dashed ochre line, and both carry their name at the line end. Colour is never the only cue. Each library entry carries the same line as a 24px swatch before its name and its latest weekly downloads from DATA, so the list points back to the figure. Contracts are the one solid fill in the figure, in `--contract` red with their name in paper inside the span (or in ink below the track when the span is too short, in as many lanes as needed so labels never overlap). The active contract gets a 2.5px ink outline. Red is the page's only warm colour: buttons, links and focus are ink, so nothing competes with client work, and each "Show on the timeline" button carries a 10px red square pointing at its span.
- **Even track rhythm.** Every track title sits 44px below the previous baseline, and both the downloads and issues tracks show a 0 label and a top label with a gridline.
- **Every number lives in DATA and is reachable three ways:** by eye on the plot, by the readout and the slider's `aria-valuetext`, and by the table in "Read the figures as a table". The heading ("Five years on one timeline"), the quarter range and opening release in the hint, the library download facts, the case dates ("2022 Q1 to 2023 Q2") and the table totals are all computed from DATA, so edits never leave stale copy.
- **Circular, with no dead ends.** "Show on the timeline" on a case moves the cursor to that contract's first quarter and focuses the plot; the client name in the readout is a link back to the case. "Send me a brief" is an anchor to the contact heading (`tabindex="-1"`, so focus lands there). Every outbound link opens in a new tab, and the email link opens with three questions ready (what you need built, when it should start, budget range). "Copy" (in the install line) falls back to selecting the command and saying "press Ctrl+C" when the clipboard is blocked, as it is in a cross-origin iframe.
- **Quiet everywhere else.** Intro, libraries, cases and contact are plain type on paper separated by space. No cards, shadows, rules between entries, eyebrows, arrows, status dots or scroll animations. Only the figure's Earlier/Later controls are outlined buttons; "Copy" sits inside the install line and "Show on the timeline" is an underlined text button. From 1000px the libraries column is sticky beside the longer cases column. The only motion is the cursor answering input (120ms, none under reduced motion).
- **Cut at critique:** a green "available" dot before the availability line, an underline on the active release tag, rounded corners on the contract spans, a left-gutter track-label layout that switched to stacked labels on phones (labels now sit above each track at every width, one layout instead of two), the brief form with its compose-and-send flow (two other portfolios use it; here the contact links carry the prefilled brief), a row of outlined icon buttons under the name (the linktree pattern), outlined "Copy install command" and "Show on the timeline" buttons, a plum action colour, hatched contract spans (they read as disabled next to the lines), and a caption paragraph above the figure.

Contrast against paper `#EEECF2`: ink `#2A2131` 13.2:1, heather `#5E566A` 5.9:1, spruce `#1D6B4F` 5.5:1, ochre `#8F5E00` 4.75:1, contract `#B0342A` 5.3:1, paper text on contract 5.3:1, paper text on the ink button 13.2:1. All pass AA as text and 3:1 as marks; issue bars are drawn at full heather (5.9:1), the active one in ink. The disabled Earlier/Later button keeps full ink text and switches to a dashed border, since it still answers with a status line.

## Do not touch

- **One axis, one cursor.** Do not split the figure into separate line, bar and Gantt charts or put it in cards. The point is that the three tracks share the x-axis and move together.
- **The readout stays at `--text-lg`**, as a caption above the plot. It is never a headline. Its height is reserved for the longest sentence at the current width, so the plot never jumps under a dragging finger.
- **Copy that comes from DATA stays computed:** the career span in the heading, the quarter range, case dates, readout, `aria-valuetext`, table and totals. Do not type them into the HTML.
- **Accessibility wiring.** The plot is one focusable `role="slider"` (aria-valuemin/max/now, `aria-valuetext` = the sentence); the SVG is `aria-hidden`; the visible readout is not `aria-live` (the slider announces it). Keys: Left/Right one quarter, PageUp/PageDown four, Home/End. Earlier/Later use `aria-disabled` at the ends and say why in a status line instead of going dead. Focus is a 2px ink outline at 4px offset. The table sits in a focusable, labelled region so keyboard users can scroll it on phones.
- **Series identity by line style plus end labels**, never colour alone. Contracts are the only solid fill and the only warm colour; do not give buttons or links a second accent that competes with them.
- **The figure shares the first screen with the name.** Do not add a header icon row, stats or a caption paragraph above it.
- **No server, no dead links.** No `href="#"`, no relative links, no form `action`. External links keep `target="_blank" rel="noopener"` and the visually hidden "(opens in a new tab)".
- **Mono only for real code.** Do not spread `--voice-code` to labels or numbers.

## Adapting

1. **Figures.** Edit `DATA` at the top of the script, one row per period, oldest first. Every key other than `q`, `issues`, `release` and `client` is a series (its own line); rename `pliego` and `ascensor` to your own series, or add a third (it gets a dotted heather line). `null` means "not out yet": the line starts later and the sentence says so. `release` is optional and must start with the series name ("pliego 3.0"); separate several with commas. `client` repeats on consecutive rows to form one span. Scales round up to a nice maximum, so changing numbers never needs layout changes. An empty `DATA` shows "No figures yet" and hides the controls. A malformed row (no `q`, or a non-number in `issues` or a library column) shows which row to fix instead of a blank plot; negative issue counts are drawn as 0. Periods need not be quarters (use "2025 H1" or "March"), but the year ticks look for a leading year and a `Q1` suffix; change that test in `draw()` for other periods.
2. **Cases.** Each `<article class="case">` needs `id="case-" + slug(client)`, the client name lowercased with accents and punctuation turned into hyphens ("Centro Médico Andalué" becomes `case-centro-medico-andalue`). Its dates and its "Show on the timeline" button come from DATA; with no matching rows the button hides. Each case ends its "what I built" line with the release it produced, so it agrees with the figure; keep that link if your data has one. Keep each case to problem, what you built, and one measurable result.
3. **Contact and social links.** Edit `CONTACT`. Delete a line to remove that link from the contact list. Known keys are `whatsapp` (the number with country code; spaces and a plus are stripped), `email`, `github`, `linkedin`, `instagram` (handles, or a full `https://` URL, which is used as is). Add any other network as one line with a full URL, e.g. `mastodon: 'https://mastodon.social/@renata'`: it gets its key as label and a generic link icon. A value that is not `https://` is skipped with one console warning. The sentence above the list is generated from the keys present (it only promises email or WhatsApp when they exist), and with no links at all the contact block and the "Send me a brief" button both hide. The prefilled email subject, body and WhatsApp text live in `BRIEF`; the icons are inline SVG paths in `NETWORKS`. The "pliego on GitHub" and "ascensor on GitHub" repo links are content, not driven by `CONTACT`; edit them in the HTML.
4. **Tokens.** Map the brand onto the `:root` colours keeping their roles: a light ground, one dark ink, one secondary grey, two series colours that each pass 4.5:1 on the ground (they are also used as text), and one action colour. If you replace Recursive, pick a variable family with a distinct casual or display voice and a real monospace companion, and keep tabular figures in the plot.
5. **A real backend later.** Load DATA from your analytics instead of hardcoding it: fetch JSON with the same row shape, then call `mount(rows)` (it rebuilds the heading, plot, table and case dates). The npm registry downloads API and the GitHub issues search API can produce the two series and the issue counts per quarter at build time. If you want a contact form, put it in the contact block, handle `submit` with `preventDefault` and `fetch` to your endpoint, and show the result in place; never post the form directly.
6. **Self-test.** Open the page with `#selftest` and the console prints `SELFTEST PASS` or the failures: keys, the boundary note, every case link, every contract label visible at 360px, the readout for every row, run merging, the computed span and library facts, the contact rules, and the bad-row and empty-DATA states. Every assertion is computed from the current `DATA` and `CONTACT`, so it still passes after the owner edits them. `scripts/check-flows.mjs` runs it.
8. **Headings.** The name is an `h2` because the host page supplies the `h1`; sections are `h3`, entries `h4`. On a standalone page, promote each level by one.
7. **Stack translation.** In React or Svelte, keep `DATA` and `CONTACT` as plain modules, derive runs, scales and the sentence from them, keep the cursor index as the only state, and redraw the SVG at a width measured with a ResizeObserver rather than scaling a viewBox, so ticks and labels keep their size.

Plot geometry in the script (the 40px tick column, 72px for end labels, track heights 230/72/32px, 170/56/28px below 600px, the 44px gap between a baseline and the next track title, stroke widths and dash patterns) is literal on purpose: it is drawing and depends on the label size.

| Token | Role |
|---|---|
| `--paper` | Page ground, text on the primary button and inside contract spans |
| `--ink` | Text, links, focus ring, primary button, x-axis, cursor, active bar, active contract outline |
| `--heather` | Secondary text, tick labels, baselines, issue bars |
| `--spruce` | First series: solid line, its release tags and end label |
| `--ochre` | Second series: dashed line, its release tags and end label |
| `--contract` | Client contract spans and the square on "Show on the timeline" |
| `--grid` | Top-of-scale gridlines on the downloads and issues tracks (heather at 22%) |
| `--line` | Outline of the Earlier/Later buttons |
| `--font-display`, `--font-text`, `--font-code` | Recursive with fallbacks per voice |
| `--voice-display`, `--voice-text`, `--voice-code` | Variation settings: CASL 1, CASL 0, MONO 1 |
| `--text-xs` | 13px: axis ticks and track titles |
| `--text-sm` | 15px: meta lines, status messages, table |
| `--text-base` | 17px: body |
| `--text-lg` | 22px: lede and readout sentence (the readout never goes larger) |
| `--text-xl` | 28px: section headings |
| `--text-2xl` | 40 to 68px fluid: the name |
| `--lead-body`, `--lead-head`, `--lead-name` | 1.55, 1.1, 1.0 |
| `--measure` | 64ch body measure |
| `--space-1` to `--space-9` | 4, 8, 12, 16, 24, 32, 48, 64, 96px |
| `--gutter` | 16px, 24px from 768px, 48px from 1100px |
| `--max` | 1200px content width |
| `--radius` | 6px on the three filled or outlined buttons only |
| `--tap` | 44px minimum height for buttons, text buttons, repo links and contact links |
| `--cursor-ease` | 120ms cursor move (off under reduced motion) |
