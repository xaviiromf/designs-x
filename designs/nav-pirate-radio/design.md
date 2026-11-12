---
title: Community radio navigation as a tuner dial
section: nav
subject: "Static Harbour 87.9, a community radio station in Marseille that began in 1987 as a pirate transmitter on a trawler and now broadcasts chiptune, city pop and late-night talk from a shipping container. The site navigation is its tuner: six destinations sit at frequencies on the dial."
aesthetic: "The back-lit scale of an old receiver, switched off: tarnished brass ground, a darker brass window, a lighter brass scale plate with ivory numerals and ticks, one hot-orange needle, a red on-air lamp, and three programme hues used only for programme kinds."
mode: dark
fonts:
  - Handjet (Google Fonts, variable). Display only, always at ELSH 2 and ELGR 1 so the modules are square. The station's name (the first h2), section h2s, the scale numerals, the frequency readout, phone frequencies and the dialog titles.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, 400 for body, 600 for station names, buttons, labels and terms; tabular-nums on times, frequencies and figures.
js: A plain-JS tuner (pointer, touch drag, keys and scroll all set one detent value from which the needle, lock lamp, display plate and signal meter are drawn), an on-air readout computed from SCHEDULE and Marseille time, two native dialogs and a request form; GSAP adds the detent motor, the band scan, scroll scrubbing, the tuning eye and the dialog frame.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [nav, header, radio, tuner, dial, needle, sticky, scroll, dialog, form, brass, dark, gsap, lenis]
use_when:
  - A site with five to eight destinations that can honestly be laid along one axis (frequencies, dates, stops, chapters), and a subject that has a physical tuner, scale or gauge.
  - A long single page where the visitor benefits from always seeing where they are and how far the next part is.
  - Brands with a hardware or broadcast past that can carry a large, present header.
avoid_when:
  - "More than about eight destinations, or labels longer than two words: the stations crowd the scale."
  - Pages that need most of a short screen for content; the dial is a large sticky header by design.
  - Subjects with no scale or axis to stand for. Then the dial is decoration and a plain list is better.
---

## Why it works

**The one bold idea: the navigation is the tuner.** Every part of the site sits at a frequency on a wide 87 to 108 MHz scale, and there is one needle. Everything the dial shows is computed from a single integer, the detent (0.1 MHz) the needle sits on: within 3 detents (0.3 MHz) of a station it locks, snapping to the station's exact frequency, the lock lamp lights in needle orange, the display plate cuts to the station's name and the five signal bars rise to full. Anywhere else the lamp is off, the plate says "Between stations" and the meter drops to two bars within 0.8 MHz of a station, or one bar further away. There is no noise or static of any kind: tuning is shown by position, lock and level only. The pointer, a finger, the keyboard and the scroll position all just set that number.

- **Scroll tunes the radio.** The page below is six anchored sections, each about a screen tall. As a section's heading reaches the lock line (the header's height plus 64px, 48px on phones, so the frequency label above the heading stays visible), its station locks and its link takes `aria-current="location"`. Between two headings the needle holds for the first 30% of the distance and then travels in whole detents to the next frequency, passing "Between stations" and one or two bars, and locks again near the end. Clicking a station scrolls there with Lenis, and the needle visibly travels with the page. The end of the page is lengthened by exactly what the last heading needs to reach the lock line, so Contact always locks.
- **Nearest designs in the ledger.** `nav-game-museum` also makes the menu a map, but its marker walks a breadth-first path over a floor plan; here there is one axis, one needle and a lock rule, with no path finding and no footprints. `contact-hackerspace` is also a radio-like instrument, but it pings rings over a chart; nothing here radiates, sweeps or decays.
- **Colour has jobs.** Brass (`#3D2C08`) is the ground in three tones of the same hue: the page, the darker window and scrim, the lighter scale plate. Ivory is text, numerals and major ticks. Felt is secondary text, minor ticks, rules, outlines and the spike. Cyan, pink and lilac mean music, talk and archive and appear only on programme things: the day strip under the scale, the schedule chips, the show chips and the legend. Needle orange is the visitor's attention: the needle, the lock lamp, focus rings and the field antenna. On-air red means live and nothing else: the header lamp (lit only while a live programme is on; archive hours show it hollow and say "From the archive") and the Listen live button. Errors use a hatched ivory bar and ivory text, never red.
- **Structure from the subject.** The header is a receiver: a bar with the call sign, the on-air lamp and Listen live, and under it the dial window with the readout row (lock lamp, display plate, frequency in MHz, signal meter, hint, legend) and the lit scale plate. Station names hang from the scale under their own frequencies on short hangers. On phones the scale is reduced to the six stations at even spacing (the needle maps piecewise between them), the names move into the plate and the Stations dialog, and the frequencies themselves are the links.
- **The strip under the scale is today's programmes.** The three programme bands are drawn from `SCHEDULE` as a 6px strip, 00:00 at the left edge and 24:00 at the right, with a legend reading "Today: Music, Talk, Archive". It is aria-hidden; the Schedule section is its text alternative.
- **Real content, computed.** `SCHEDULE` drives the header lamp and text, both now/next readouts, the schedule list (with an "on now" marker read out to screen readers), the strip and the request confirmation's "read out on the next talk programme". Times use Europe/Paris through `Intl`, falling back to the visitor's clock. The page repaints once at the next change of programme (a single timeout, no loop).
- **Type.** Handjet with square modules is the voice of the dial: the call sign, the numerals, the readout and the section headings. Everything that is read is Host Grotesk with tabular figures.
- **Flows.** Listen live opens a dialog with now and next, a note that the stream opens in the visitor's own player with a link to the station's Mastodon for the address, and "Request a track" (name, track, artist, optional dedication up to 140 characters). Validation is in JavaScript with specific messages, `aria-invalid`, `aria-describedby`, a reserved two-line error area, focus on the first bad field, and errors that clear as soon as the value is valid. Success echoes the track, artist, name and dedication, says when it will be read out, focuses the confirmation heading and offers "Request another" (the name is kept). The phone-only Stations dialog lists all six destinations with one line each.
- **Semantics.** `<header aria-labelledby>` with the call sign as the first `h2`, `<nav aria-label="Stations">` holding real links, `aria-current="location"` on the current station (and in the Stations dialog), each section an `aria-labelledby` section whose `h2` takes focus (`tabindex="-1"`) after a station is chosen. Both dialogs are native `showModal()` with `h2` titles, Close, Escape and backdrop close, focus return, `data-lenis-prevent`, internal scrolling and `settle()` for a forced close.

Deviations from the brief, and why:

- **The band scan covers the whole band, then wraps.** The brief asks for a scan from 87.0 up to the current station with each name cutting in as the needle passes it. At the top of the page the current station is 87.9, so a scan that stopped there would never pass the other five names and they would stay hidden. The needle therefore scans 87.0 to 108.0 in 1s (names cutting in as it passes), wraps to 87.0 like a receiver's seek, and runs up to the current station at the same rate. For 87.9 that is 1.04s in all; for a deeper section it is up to about 1.9s. During the scan the lock rule is suspended (the plate says "Scanning the band") so the lamp does not blink six times in a second; it locks once, at the end.
- **Keyboard tuning is faster than the return.** The return after the pointer leaves runs at 40 detents a second as briefed. A Tab or arrow press between stations runs at least that fast and never takes longer than 0.35s, so the needle keeps up with the keys.
- **The plate says "Scanning the band" during the load scan**, an extra copy state alongside the station name and "Between stations".

## Do not touch

- **One number drives the dial.** `D.raw` (detents of 0.1 MHz, 870 to 1080) is the only state; `render()` derives needle position, lock, plate, MHz and meter from it and writes the DOM only when the whole-pixel x or the lock changes. Do not animate the needle with a tween: it must move a whole detent at a time.
- **The lock rule.** `--lock-zone` 3 detents. Inside it the shown frequency is the station's own, so the needle snaps. Wider zones make the dial feel sticky; narrower ones make the lock hard to find by hand.
- **Whole pixels.** Every tick, numeral, station and needle position is rounded in `layout()` from the track width; the ticks are crisp SVG rects. A resize redraws them.
- **The lock line.** `--lock-gap` plus the header's measured height; it also sets every heading's `scroll-margin-top` (through `--lock`) and the end padding of the page. If you change one, the scroll locks and the anchor jumps disagree.
- **The header is the dial.** It is sticky and opaque brass, and its height is measured into `--head-h`, which also sizes each section to one screen under it. Keep sections roughly that tall or the scroll travel becomes too short to see.
- **Pixel corners live on pseudo-elements, `.face` and `.inner`,** never on a link or button, so focus outlines are never clipped. The dial window and plates clip only their `::before` backgrounds.
- **Hidden states exist only under `html.js:not(.go)`** (station links at opacity 0, the needle hidden) and the scan sets the same states inline before `.go` is added. With the CDN blocked the `js` class is never added, and the dial still tunes by pointer, touch, keys and scroll, instantly.
- **Colours keep their jobs.** On-air red only on the lamp and Listen live; needle orange only on the needle, lock lamp, focus and antenna; programme hues only on programme things.

## Motion

House stepping: everything moves in whole detents, whole pixels and hard cuts; nothing eases except the scroll itself (Lenis lerp 0.1, and a cubic in-out on scrolled navigation). Everything is built inside `gsap.matchMedia` (motion, reduce, fine). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The load waits for fonts (Handjet 700 and 600, 1.5s timeout) and a visible page. The tuning motor is on the ticker only while the needle travels; there is no other loop, and the header is always on screen. Only transform, opacity, visibility and clip-path change; colour changes are instant.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Band scan | Detent motor (ticker) | Load, fonts ready and page visible, once | 87.0 to 108.0 at 210 detents per `--d-band` (1s), names cut to opacity 1 as the needle passes; wrap to 87.0; same rate up to the current station; then lock | None: needle on the current station, names visible |
| Needle follows the pointer | Direct, in detents | pointermove over the scale (mouse and pen); over a name it sits on that station | Instant, whole detents, lock within 0.3 MHz | Same (direct manipulation) |
| Needle returns home | Detent motor | pointerleave of the scale | `--rate-return` 40 detents a second toward the scroll position | Instant |
| Click a locked station | Lenis scrollTo | click on the plate while locked, or on a name | `--d-scroll-min` 0.7s to `--d-scroll-max` 1.8s (distance / 2400px), cubic in-out; a needle already on the station holds there; focus to the section heading on landing | Instant jump, focus moves |
| Touch: drag to tune | Pointer capture after 6px | pointerdown + horizontal move on the scale (`touch-action: pan-y`) | Direct; on release a locked needle navigates, otherwise it returns home | Same, return instant |
| Touch: tap a station | Link click through the tuner | tap on a frequency or name | Scrolls as above; the needle travels with the page | Instant |
| Keyboard tuning | Detent motor | Tab focus on a station; Left/Right move focus station to station; Enter navigates | At least 40 detents a second, at most `--d-key` 0.35s per move; focus leaving the nav returns home at 40 a second | Instant |
| Scroll tuning | ScrollTrigger (start 0, end max) onUpdate | Every scroll frame | Hold for `--hold` 30% of the way between headings, then linear in detents to the next station; locks near the heading; `aria-current` switches at the lock line | Needle on the current station only, no travel between |
| Tuning eye | Stepped attribute (`data-eye`) | pointerenter (not touch), focus-visible | Gap 18 to 12, 6, 2px, `--d-eye` 60ms a step; opens back in `--d-eye-out` 40ms steps | Gap 2px at once on hover/focus |
| Button press, locked | Class held from pointerdown / Enter / Space | Press | Gap 0, face inverted (ink and ground swap) for at least `--d-press` 140ms | Same |
| Text link, the gap closes | clip-path transition, steps(2) | Hover, focus-visible; touch press held `--d-tap` 200ms | Each half of the underline stops 6px short (12px gap); 6 to 3 to 0px in `--d-link` 100ms; line turns ivory | Instant |
| Field antenna | visibility transitions with stepped delays | focus / blur of an input or textarea | Three pixel segments (3, 2, 1px thick, 6px rise each, 45 degrees) appear one per `--d-ant` 50ms; retract in reverse | All at once |
| Error | Reserved line | Invalid submit | Hatched ivory bar and message cut in; focus to the first bad field | Same |
| Dialog frame on | `data-f` steps (delayedCall) | Listen live, Stations | Top, right, bottom, left at `--d-frame` 50ms apart, then ground and content cut in together at 200ms | Instant |
| Dialog frame off | `data-f` steps | Close, Escape, backdrop, a station link in the menu | Ground and content off, then left, bottom, right, top at `--d-frame-off` 30ms apart, then close | Instant |
| Success, spiked | Stepped transform | Valid submit | The slip appears above the spike tip, then drops 36px three times, `--d-drop` 90ms a step (-108, -72, -36, 0), pierced from the second frame, resting on two slips | Resting slip |

## Adapting

1. **Choose the axis.** List your destinations with a value on one scale (frequency, date, kilometre). Put each as `<a class="st" href="#id" data-f="...">` in `.stations`, in order, and give each section an `h2.h2` with `tabindex="-1"`. `LO` and `HI` in the script are the ends of the scale in detents; the numerals in `layout()` are every 2 units (20 detents).
2. **Map the brand onto the tokens, keeping the jobs.** One ground hue in three tones (`--brass`, `--brass-deep`, `--brass-plate`), one text hue, one secondary/rule hue, one attention hue for the needle and focus, one live hue for the single primary action, and one hue per kind of content. Recompute contrast for each against its ground.
3. **Edit `SCHEDULE`.** Every readout, the strip, the schedule list and the request timing follow. Change the time zone in `clock()`.
4. **Tune the feel.** `--lock-zone` (lock width), `--rate-return` (how fast the needle goes home), `--hold` (how long a section keeps its station while scrolling), `--lock-gap` (where headings lock), `--d-band` (scan speed).
5. **Phones.** Below 720px the compact dial spaces the stations evenly; keep labels short enough to fit six frequencies in 328px, or move to five.
6. **Remove motion.** Delete the motion branch and the dial still tunes instantly by pointer, touch, keys and scroll; the dialogs and form work.
7. **In a framework,** keep the tuner as plain state (`D.raw`, `D.mode`) with a pure `render()`, and port the motion branch as one effect that returns the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--brass`, `--brass-deep`, `--brass-plate` | Ground in three tones: page and panels; window, scrim and ink on lit faces; scale plate, display plate, slips |
| `--ivory` | Text, numerals, major ticks, lit meter bars (12.1:1 on brass, 9.8:1 on plate) |
| `--felt` | Secondary text, minor ticks, rules, outlines, hangers, the spike (7.7:1 / 6.2:1) |
| `--music`, `--talk`, `--archive` | Programme kinds only: strip, chips, legend (9.0, 6.9, 7.4:1 on brass) |
| `--needle` | Needle, lock lamp, focus rings, field antenna (5.7:1 on brass, 4.6:1 on plate) |
| `--on-air` | The on-air lamp and Listen live (5.3:1 on brass; brass-deep ink on it 6.6:1) |
| `--scrim`, `--hatch` | Dialog backdrop; the hatched ivory error bar |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-small` ... `--t-h2`, `--t-num`, `--t-mhz`, `--t-call` | Type scale: 14, 17, 20, 24; numerals 30, readout 34, call sign clamp(30px, 3.2vw, 46px), section h2 clamp(46px, 6vw, 88px) |
| `--lh-body`, `--lh-lede` | 1.55 and 1.45 |
| `--cell`, `--s1` ... `--s8` | 8px cell; spacing 4 to 96 |
| `--notch`, `--notch-l`, `--tap`, `--hit` | Stepped corners 4px and 8px; button and field height 48px; minimum target 44px |
| `--max-w`, `--bar-h`, `--track-h` | Content width 1360px; header bar 72px (60px on short screens, 56px on phones); scale track 128px (64px on phones) |
| `--lock-gap`, `--eye-w`, `--eye-gap` | Lock line below the header 64px (48px on phones); tuning-eye block 7px and rest gap 18px (6px and 16px on phones) |
| `--lock-zone`, `--rate-return`, `--hold` | Tuning: 3 detents, 40 detents a second, 0.3 |
| `--d-*` | Durations: band 1s, key 0.35s, eye 60ms and 40ms, press 140ms, tap 200ms, link 100ms, antenna 50ms, frame 50ms and 30ms, drop 90ms, scroll 0.7s to 1.8s |
