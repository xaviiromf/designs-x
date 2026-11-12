---
title: Security researcher portfolio with a grid-routed trace
section: portfolio
subject: "The portfolio of Inés Kowalczyk, a fictional independent security researcher in Valencia who has reported 124 vulnerabilities since 2019 through coordinated disclosure and bug-bounty programmes, and who takes one-to-four-week contracts testing web applications and payment terminals."
aesthetic: A network diagram on moss. A 16px grid of faint lines and lichen nodes lies behind everything; the visitor's path is drawn on it as one white-hot lime line that only runs along grid lines and turns at right angles. Four severity hues appear only for severity, and the text blocks sit on the ground like hosts the line runs under.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so its modules are square tiles like the grid. Used at 700 for the h2 and for the two endpoint labels (You, Inés) in the handshake.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, at 400 for body, 600 for buttons, h3, h4 and labels, 700 for chips and readout names; tabular-nums in the charts, tables, dates, readouts and the key fingerprint.
js: "Runs the trace (a head that follows the pointer, a drag, a tap or keyboard focus one grid cell at a time and leaves a 48-cell line), draws two interactive charts from DATA, lifts the write-up embargo with scroll, builds the contact links from CONTACT, and runs the write-up dialog, the fingerprint copy and the in-page enquiry form (nothing is sent)."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [portfolio, security, research, disclosure, charts, svg, canvas, trace, grid, dialog, form, dark, gsap, lenis]
use_when:
  - A person or small practice whose work is measured in counted records (findings, incidents, fixes, audits) and whose clients want to see how many, how serious and how fast.
  - The page needs two or more honest, operable charts with tables behind them, plus a short enquiry form.
  - The brand has a network, wiring or routing idea that the visitor's own path can stand for.
avoid_when:
  - There is no data to chart. The severity hues and the charts carry the page; without them it is a grid with a line.
  - Light or editorial brands. The moss ground, the lime trace and the pixel display face are loud by design.
  - Pages that already run another pointer or canvas effect. Two things following the hand fight each other.
---

## Why it works

**The one bold idea: the visitor is a packet on the network.** A 16px grid lies behind the whole section. A head follows the visitor, but only along grid lines: it moves one cell per step, horizontally or vertically, turns at right angles (the longer axis first), and leaves a solid 3px line that keeps the last 48 cells and loses them from the tail in whole cells. Corners are square joints because every cell is drawn as an overlapping solid bar. When the pointer rests for 0.18s the head parks and the line shortens to nothing, then the loop sleeps. Content blocks are obstacles, not covers. When the pointer, a tap or focus lands inside a block (the headline and lede, each panel, each write-up row, the footer), the head's target becomes the nearest cell on that block's outline: its rectangle pushed out 6px to the grid lines, with blocks closer than two cells merged into one. The head wall-follows to get there: a step into a block turns to the other axis, or slides along the block's edge toward its nearer corner, keeping that slide until the way ahead opens. So the line hugs whatever is being pointed at and travels along block edges and lanes. Blocks sit on the moss ground and the line is drawn under them, so it never crosses words. The layout leaves the grid open: 64px lanes between blocks, at least 128px page gutters at 1440 (content is 1184px), a 96px gap between the two top columns, 128px open bands between the major parts, chart B and the write-up rows capped at 1008px, and the rows staggered left and right so the lane zigzags down the list. The head is a 9px square, larger than the 3px line.

- **Different from the nearest ledger entries.** nav-game-museum walks a marker along a breadth-first path to a chosen room and leaves footprints; this head never searches, it routes greedily in L-shapes toward wherever the visitor is, and what it leaves is a fixed-length line, not marks. features-cyberdeck-kit sends many short pulses away from the pointer along a fixed PCB network; here there is one head, one line, the whole grid is the network, and it comes toward the visitor. cta-indie-game lights cells under the pointer; here nothing lights, a line is routed.
- **The load teaches the trace.** The headline is visible from the first frame. The head enters from the left edge on the grid row under the headline, runs right past the primary button, turns down, turns back along the button's top edge (two turns), and when it reaches the button's top-left corner the lede and both buttons cut in. It then runs once around the button and parks at its top-left corner. The whole run is 1.05s. The loop stays drawn around "Ask about a test" until the visitor's first pointer, touch or focus input, so the first screen shows the mechanic at rest.
- **Colour has one job per hue.** Moss `#1B3A10` is the ground (a yellow-green, not PCB green), with a darker moss for field wells and the scrim and a lighter moss for grid lines. Paper is text. Lichen is the muted layer: secondary text, rules, the resting grid nodes and the redaction bars. The four severity hues appear only for their severity, in the charts, the chips and the row marks. Trace lime is the visitor's path and nothing else: the line, focus rings, the picked bar or mark, and the primary button (the path's destination). Errors have no hue of their own, because errors are not findings: a hatched paper bar and paper text.
- **Two charts, both honest and operable, from one DATA list.** Every finding is one line of `DATA.findings` (date, severity, days to fix, vendor, title). Chart A stacks one square per finding by year, two squares per row, critical at the base, so the bar tops step. The four series toggles are `aria-pressed` buttons; a series switched off is drawn hollow rather than removed, so the year totals never jump. Years are a radio group: pointer, tap, or arrow keys, Home and End. Chart B places one square per finding by report quarter (32 columns) and fix-time band (0 to 7, 8 to 30, 31 to 90, 91 or more, still open, which is set apart at the top); the paper tick across each year is the median days to fix, placed within its band. Picking a square, or moving with the arrow keys (left and right by date, up and down by band), names the finding and its dates in a live readout. Both charts have a table behind "Read the figures as a table".
- **The embargo is the scroll moment.** Each write-up's title and summary line start covered by lichen bars, one per word, drawn as pseudo-elements so the words stay in the DOM and readable to assistive tech. As the row crosses the middle of the viewport its lifecycle chip steps through reported, triaged, fixed and disclosed, each with its date and a pip count, and on disclosed the bars are cut away one word at a time, left to right. It is a function of scroll position, so scrolling back re-covers. Without the motion layer nothing is ever covered.
- **Copy from the client's side.** The h2 says what she does and for whom. The write-ups are one-paragraph summaries with dates and outcomes and no exploit detail; the vendors are invented and described ("a regional transit operator"). The form asks for a work address and says why, because she checks that the company owns the system before testing.
- **Semantics.** A `<section>` with `aria-labelledby` on the h2 (the host page owns the h1), a `<nav>` with four anchors, `<article>` panels with h3, write-up titles as h4, a native `<dialog>` whose title is an h2, `dl` for dates, `fieldset`/`legend` for the choice, `<details>` for the tables. The trace canvas and the chart SVGs are `aria-hidden`; the year buttons, the readouts and the tables carry the information.

Deviations from the brief, and why:

- **The grid itself is CSS, the trace is canvas.** The grid is static, so it is three hard-stop background layers on the section (1px lighter-moss lines, a 2px lichen node at each crossing); it is visible before any script runs and costs nothing to scroll. The canvas draws only the head and its line. The grid lines are offset half a cell from the section origin so that nodes never sit on the edge of a text block.
- **Blocks are obstacles.** In a first build the head followed the pointer straight under opaque panels, and the line was hidden most of the time. The target now moves to the block's outline and the head wall-follows around blocks. This is a cheap greedy router, not a pathfinder, so in a tight pocket it can stop one cell short and wait for the next input.
- **Keyboard focus inside a block** runs the head to the block's outline beside the control and parks it there, because a loop around a control inside a block would be hidden under it. Controls in open grid (the hero buttons, the nav links) still get the run once around their rectangle.
- **The opening loop stays drawn until the first input.** The brief has the head park at the button after the load. The 48-cell line around the button is kept at rest (the loop is asleep) until the visitor first moves, taps or tabs, so the first screen shows the trace. Every later rest retracts the line as specified.
- **Under reduced motion and with the CDN blocked, the canvas shows a composed still frame**: the end of the opening run, the line around the primary button with the head at its top-left corner.

## Do not touch

- **One cell for everything.** `--cell` (16px) sets the CSS grid, the canvas routing, the half-cell grid offset and the spacing scale. The canvas reads it at size time; change it in one place only and the line leaves the grid lines.
- **The line is bars, not strokes.** Each cell of the trail is a `fillRect` from node to node, `--line` (3px) thick, offset by half the line width. Overlapping bars make the square joints. The head is a 9px square. Do not switch to `stroke()` with round caps or joins, and do not add alpha or blending.
- **The router keeps its axis.** `advance()` picks the longer axis, keeps to it until that delta is zero or changes sign, then takes the other axis. That rule is what makes every route an L. A per-step "nearest axis" choice turns it into a staircase. Once it is sliding along an obstacle it must keep sliding; letting it fall back to the other axis makes it oscillate.
- **The lanes are the signature's stage.** `--lane`, `--slab`, `--max-w` and `--s9` keep at least a third of the first screen as open grid. Widening the blocks hides the line again. The obstacle list is the `BLOCKS` selector in the trace module; add any new opaque block to it.
- **The canvas is parked in section coordinates.** It is viewport height plus 160px either side and is translated to the current scroll position at every draw, so a resting drawing scrolls with the page and the loop can sleep. Do not make it `position: fixed`.
- **Text blocks sit on the ground.** `.g`, `.panel` and `.wu` have a moss background. Remove it and the line crosses words.
- **Corners on inner spans.** The packet faces carry the stepped `clip-path`; `.btn` itself never does, so its focus outline (offset 8px, clear of the 4px open gaps) is never clipped. The cut lines `--a` and `--b` are set in whole pixels by the script; percentage cuts leave hairline seams.
- **Severity hues only for severity.** Do not reuse a severity hue for a state, a link or a highlight; do not use `--trace` for anything the visitor did not do.
- **Hidden states only under `html.js:not(.go)`**, and only for the lede and the actions; the redaction class `.r` is added only by the motion branch. With the CDN blocked no class is added, and the charts, write-ups, dialog, copy button and form all work in plain JavaScript.
- **Accessibility.** The two charts are operable by pointer, touch and keyboard, with live readouts and tables. Fields use the double wall in trace lime as their focus indicator (2px outer, 2px inner); every other control has a 2px trace outline. Errors are announced on reserved lines, with `aria-invalid` and `aria-describedby`, and focus moves to the first bad field. The confirmation heading takes focus. Every target is at least 44px in one dimension.

## Motion

House stepping: everything moves in whole cells, whole pixels or `steps()`. The trace advances one 16px cell per step; buttons open in `steps(2, jump-start)`; dialog bands move in `steps(3)`; everything else is a hard cut with a delay. Only transform, clip-path, visibility and canvas pixels change; colour changes are instant. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer). Lenis runs on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The opening waits for the fonts (a 1.5s race) and a visible page. The trace loop is on the ticker only while the head moves or the line retracts; an IntersectionObserver stops it off screen. Press and tap holds are plain JavaScript and CSS, so they also work without the libraries; under reduced motion every transition is 0s.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| The trace follows the pointer | Canvas, grid router with obstacles (signature) | pointermove (mouse and pen); also scroll under a still pointer | A target inside a block moves to the nearest cell of its outline; the head wall-follows around blocks. One cell per step at 60 + 5 x (cells behind) per second, capped at 720; keeps the last 48 cells; parks at the pointer's cell; after 0.18s at rest the tail retracts at 60 cells/s, then the loop sleeps | Still frame, no motion |
| Touch: drag | Same router | touchmove beyond 10px | The head follows the finger's cell as above | Still frame |
| Touch: tap | Same router | touchend without a drag | The head routes from where it is to the tap in one L-shaped run (longer axis first) | Still frame |
| Keyboard focus | Same router, scripted waypoints | focusin with :focus-visible after a Tab, arrow, Home or End key | A control in open grid: runs to its top-left grid corner (rectangle pushed out 6px to the nearest lines), once around it, parks at the top-left. A control inside a block: runs to the block's outline beside it and parks | Off |
| Head off screen | Re-entry | Any new target while the head is more than 2 cells outside the viewport | The head re-enters from the left edge on the target's row | Off |
| Opening run | Scripted trace (load) | Fonts ready and page visible; skipped if the page opens scrolled past one screen | 1.05s total at a fixed rate: from the left edge along the row under the h2, down, back along the button's top edge, once around "Ask about a test"; the line then stays until the first input | Still frame of the loop |
| Lede and buttons cut in | visibility hard cut | The head reaches the primary button's top-left corner (about halfway through the run) | Instant | Visible |
| Embargo lifts | ScrollTrigger per write-up row, discrete states | Row top from 80% to 30% of the viewport | Chip: reported below 15% progress, triaged to 30%, fixed to 45%, disclosed after; then one redaction bar cut per word, left to right, over 45% to 90% progress; scrolling back re-covers | Nothing covered; chip shows disclosed |
| Button hover: packets | Three clipped copies of the face, transform | Hover (hover-capable devices), focus-visible | The outer segments move 4px out in `steps(2, jump-start)` over 0.12s: gaps of 2px, then 4px; back the same way | Instant 4px gaps |
| Button press: sent | transform with transition delays | pointerdown, Enter or Space | Each segment jumps 4px right, 0.04s apart (0, 0.04, 0.08s); held while pressed and for at least 0.16s from the press; all return together. Touch also opens the gaps | Instant jump and return, same hold |
| Text link: endpoints | Two 4px pseudo-element nodes, visibility | Hover, focus-visible; touch press | Underline 1px to 2px and the left node at once, the right node 0.05s later; off together. A touch holds for 0.2s | Both at once |
| Field: double wall | Hard-stop gradient walls, visibility | Focus | Outer wall turns trace lime and a second wall cuts in 4px inside it, instantly | Same |
| Field: breach | Repeating gradients | Invalid submit | The outer wall becomes paper dashes, 8px on and 6px off, static; a hatched paper bar and the message fill the reserved line | Same |
| Dialog: reassembled | GSAP xPercent with `steps(3)` | Read the write-up; Close, Escape or a backdrop press to close | Title, body and actions bands each travel in from alternating sides (left, right, left) in three whole steps of a third of their width, 0.18s each, 0.06s apart; they leave the same way in reverse order. Lenis stops while open | Instant |
| Next write-up | Hard cut | Next write-up button | The dialog content is replaced instantly | Same |
| Success: handshake | visibility hard cuts | Valid submit | The request, acknowledgement and confirmation arrows cut in 0.22s apart, then "Message queued", the echoed details and "Write another" | All shown at once |
| Chart picks and toggles | Hard state change | Click, tap, arrow keys | A picked bar or mark gets a 2px trace outline; a toggled-off series becomes hollow | Same |
| Fingerprint copy | Label swap | Copy fingerprint | The button reads "Copied" and a note confirms for 2.4s | Same |

## Adapting

1. **Find the route.** The trace only belongs where the visitor's path means something: a network, wiring, delivery, a route. Keep the head routing on the grid and the line under the content.
2. **Map the colours onto the tokens, keeping their jobs.** `--moss` and its two variants are ground, `--page` is text, `--lichen` is everything muted, the four severity tokens are one category each, and `--trace` is only what the visitor does. If your categories are not severities, rename the four tokens and keep one hue per category.
3. **Replace the data.** Edit `DATA`: `asOf`, the `years` range, `vendors`, `kinds` and one line per finding in `findings` (`date severity days vendor kind`, `-` for still open, `wN` to point at write-up N). The charts, tables, totals and the "124" in the lede are derived from it. `runSelfTest()` (open the page with `#selftest`) checks that every write-up matches its finding and that the dates are in order.
4. **Replace the contact.** Edit `CONTACT`: delete a line to remove a link; known keys are email, signal, mastodon, github, whatsapp, instagram, itch and fingerprint; any other key with a full URL becomes a link.
5. **Copy.** The h2 is about 65 characters on three lines in the left column. Write-up titles stay under about 50 characters, the summary line under about 100, and the dialog text one paragraph without technical detail.
6. **Retime or remove motion.** Every duration is a `--d-*` token; the trace's length and base rate are `--trace-len` and `--trace-rate`. The embargo thresholds (15, 30, 45 and 90% of the row's travel) and the trigger range (80% to 30%) are literals in the motion branch. To remove the embargo, delete the `rows` block. To remove the opening run, delete the load block and add `go` directly. To remove the trace entirely, delete the canvas, the trace module and its handlers; the grid stays and the page still reads.
7. **In a framework,** render the markup statically, build the charts and lists from props, and port the motion branch as one effect that returns the `gsap.matchMedia` cleanup (it removes listeners, ticker functions, observers, ScrollTriggers and Lenis, and restores the uncovered write-ups).

| Token | Role |
|---|---|
| `--moss` | Ground: page, panels, text blocks, button and dialog faces (paper 11.3:1, lichen 6.4:1 on it) |
| `--moss-deep` | Field wells and the dialog scrim (`--scrim` is it at 90%) |
| `--moss-hi` | Grid lines on the page and gridlines in the charts (1.40:1; decorative) |
| `--page` | Text, the median tick, error marks and dashes, endpoint nodes, checked choice |
| `--lichen` | Secondary text, rules, outline-button rims, resting grid nodes, redaction bars |
| `--critical`, `--high`, `--medium`, `--low` | One severity each, only in charts, chips and row marks (5.1, 6.5, 9.7 and 8.5:1 on moss; moss text on them at the same ratios) |
| `--trace` | The trace line and head, focus rings and field walls, picked bar and mark, the primary button (11.2:1) |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet at ELSH 2, ELGR 1 and Host Grotesk, with fallbacks |
| `--t-small` ... `--t-h2`, `--t-ep` | Type scale: 14, 17, 20, 20, 26, clamp(44px, 4.4vw + 8px, 76px), and 30 for the handshake endpoints; smaller on phones |
| `--lh-body`, `--lh-lede` | 1.5 and 1.45 |
| `--cell` | The grid: 16px |
| `--s1` ... `--s9` | Spacing on the cell: 4, 8, 16, 24, 32, 48, 64, 96, 128 (96 on phones) |
| `--max-w`, `--slab`, `--lane` | Content width 1184px (74 cells; the rest is open gutter), widest full-row block 1008px, open lane between blocks 64px (48px on phones) |
| `--notch`, `--gap`, `--line` | Stepped corner (4px), packet gap and jump (4px), trace line width (3px) |
| `--tap`, `--hit` | Primary button and field height (48px), every other target (44px) |
| `--trace-len`, `--trace-rate` | Cells of line kept (48) and the base speed (60 cells/s) |
| `--d-*` | gap 0.12s, sent 0.04s, hold 0.16s, node 0.05s, tap 0.2s, park 0.18s, load 1.05s, band 0.18s, band-gap 0.06s, arrow 0.22s, copied 2.4s |
