---
title: Parts, 1994 to 2008
section: gallery
subject: The index of video parts held by Kerb Tapes, a fictional volunteer archive that digitises skate videos filmed in and around Leeds between 1994 and 2008.
aesthetic: A camcorder tape shelf on a Leeds street. Blue-grey tarmac, kerb-wax off-white and a VCR's no-signal blue, with a heavy Kanit italic set as a 90s video title card. Every picture is generated camcorder footage with its true burn-in.
mode: dark
fonts:
  - Kanit 400, 500, 700, 900 italic (Google Fonts)
js: Draws every frame from the PARTS data as generated camcorder footage with a true burn-in, plays the hovered, focused or centred part on a scroll-snap tape shelf, runs a searchable, filterable and sortable index with Flip reflow, and opens a native-dialog tape sheet whose trick list seeks the clip; nothing is sent anywhere. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3.26]
tags: [gallery, detailed, video, skateboarding, archive, media-index, canvas, generated-art, hover-to-play, scroll-snap, filter, search, dialog, dark, gsap, lenis]
use_when:
  - A collection of short video items (parts, clips, episodes, reels) where seeing a few seconds of motion says more than a still.
  - Items have real metadata worth searching and sorting (people, titles, places, years, runtimes), and each one deserves a detail view.
  - The source material has a recognisable machine look (camcorder, film, CCTV, broadcast) that can carry the identity.
avoid_when:
  - The items are photographs or documents with no motion. Use a still gallery instead.
  - There are more than about 40 items. The shelf becomes a long horizontal scroll, and the index wants pagination.
  - The page must stay still. Frames play only when a person points at them, tabs to them or centres them on a phone, and the load sequence can be cut, but moving footage is the point.
---

## Why it works

**The bold idea: each frame is a camcorder screen that rolls its opening trick.** The shelf holds twelve 4:3 viewfinder frames, one for each part. Point at a frame, tab to it, or centre it on a phone, and it plays a 4-second generated shot. The rider rolls into the spot, lands the part's first trick and rolls out, while the follow-cam pans with the pointer (CU3). The burn-in is true to the data. A PAL timecode starts at that part's tape in-point plus the trick's time and counts at 25 fps. VHS-C and Hi8 tapes add their uppercase date stamp. Both VX1000 tapes show the black fisheye corners and a bowed horizon. The 2008 HVX200 tape is letterboxed to 16:9. Everything else on the page is quiet and serves the shelf.

- **One function draws every picture.** `drawFrame(ctx, part, t, pan)` draws the strip posters, the 72px row thumbnails and the dialog stage, so a poster is always frame 0 of its own clip. The scene is built from the part's obstacle (ledge, rail, stairs, gap, bank, bowl) and its sky (day, dusk, overcast, night, sodium), with wax line work over flat tones. The rider is seven strokes plus a board. The trick is read from its name: grinds throw three sparks, slides turn the board across the rail, flips spin it on its long axis, shove-its and 180s spin it flat, and anything else is an air. Night parts drop back behind the filmer's light, and the station handrail sits under two sodium lamps.
- **One canvas animates at a time**, on GSAP's ticker. Canvases are sized by a ResizeObserver with the device pixel ratio capped at 2. Film grain (MD4) only appears on footage that is playing, and it only steps when motion is allowed. Scanlines are drawn into the frame.
- **The shelf teaches itself.** The first time it scrolls into view, the leading frame plays its opening shot once and returns to its poster, so desktop visitors learn that frames play before they point at one. On phones the middle frame plays once each time it settles, which stays under 5 seconds and needs no pause control (WCAG 2.2.2). After Back or Forward, the part now first on the shelf plays once.
- **The tape sheet is a real player.** It is a native `<dialog>` that holds the blue screen and a PLAY readout for 0.3 seconds, then cuts to the footage. Play and Pause swap labels in place (MI2). The trick list seeks the clip and follows playback with `aria-current`, and the "Now" caption swaps under its mask (TR1). Previous and Next work through the current filtered and sorted order and wrap at the ends. They cut between parts with the same tracking band as the page load, throttled to the band's 0.35 seconds, so there are never more than about three cuts a second.
- **Two accents with separate jobs.** Kerb yellow (#F2C318) is only ever the UK double yellow line that sweeps under a hovered or focused link, row or trick (HV2). VCR blue (#2340E8) is machine state: the title card's hard shadow, the tracking band and the no-signal empty state. Focus rings and the checked-terrain pill are wax.
- **One family, by weight.** Kanit's heavy italic reads as 90s skate graphics. 900 italic with a 0.06em hard blue shadow sets the title card, and only the title. 700 sets names and the index heading, 400 sets body, meta and runtimes, and 500 sets the canvas burn-in. Kanit has no tabular figures (`1111` is about half the width of `0000`), so runtimes and trick times sit in fixed 1ch cells, and the canvas draws the timecode one character at a time at a fixed advance.
- **Structure is information.** Rows are not numbered, because the index is not a sequence. The only numbers are years, runtimes and timecodes, and all are true. Radii follow the object: a 14px camcorder LCD for frames, 4px for thumbnails, 6px for controls, pills for chips, 18px for the dialog and none for rows.

### Revisions against the collection's defaults

- **R1 (palette).** The first draft was a near-black #121417 with one kerb-yellow accent, which is default 2 in another hue. The ground became blue-grey tarmac #23262B. Then, because tarmac plus yellow already appears in crud-warehouse-bins (#1B242C with #F2C230), features-mixing-plugin and gallery-street-food-market, the yellow was demoted to the double-line hover and focus mark only. It is a non-text mark and never text, fills or rings. VCR blue keeps machine state.
- **R2.** Uppercase appears only inside the canvas, as the camera's own burn-in. Every UI label is sentence case. There is no monospace.
- **R3.** Rows were first numbered 01 to 12. The numbers were removed.
- **R4.** There are no batched fade-ups on scroll and no hover lift anywhere.
- **R5 (one ambient loop, then none).** A planned infinite drifting strip with drag, throw and velocity tilt duplicated testimonials-surf-school and team-restaurant-kitchen (CD3), and was cut along with its pause button. The shelf is now a still, native scroll-snap row. Nothing moves unless a person points, tabs, centres or presses.
- **R6.** A cursor preview follower on the index rows repeated gallery-classic-cars, and sibling dimming did too. Both were cut. Rows get the double underline and an inline poster thumbnail at every width.
- **R7 (one text effect).** TX1 masked line rise appears once, on the title under the tracking band. Scrambled timecodes and a second TX1 on the index heading were cut.
- **R8.** The title-card shadow is on the h2 only.
- **R9.** The planned 1.5-second blue-screen hold became a 0.7-second tracking band that reveals the head as it passes. It waits for fonts for at most 1.2 seconds and is skipped on repeat visits in the same session.
- **R10.** Hover-to-play has focus parity (play on focus) and a touch equivalent (play when centred). Names are always visible.
- **R11.** There are no shadows or gradients on media.
- **R12.** A "Relive the golden era" hero and a big "42 minutes" stat were replaced by the plain title and a results line that reports runtime as information.
- **Cut late:** a scroll-scrubbed "Running time so far" counter (motion for its own sake), and lit windows in the night skylines, which read as sparks next to the real grind sparks. This was the accessory removed last.

## Do not touch

- `drawFrame` must stay the single source of every picture. A separate poster image would drift from frame 0.
- The burn-in rules come from `TAPES`: `date` for VHS-C and Hi8, `fisheye` for the VX1000, `letterbox` for the HVX200. Timecodes are `pal((inPoint + trick.at + t) * 25)`. Keep them true to the data.
- Only one canvas plays at a time (`play()` halts the previous one), and nothing plays off screen, while the dialog is open, or under reduced motion unless the person presses Play.
- The phone autoplay plays once (4 seconds) and returns to the poster. If it is made to loop, it needs a pause control.
- Yellow is the double line only. Do not use it for focus rings, fills or text.
- The tracking band is the only transition device: once at load, then between parts. Keep the throttle in `partStep`.
- `[hidden]` is `!important` everywhere except index rows, so that Flip can show leaving rows while they fade. The lending note is part of the Flip so nothing overlaps during a reflow.
- Hidden start states exist only under `html.js`. The class is removed if GSAP, ScrollTrigger, SplitText, Flip or Lenis fail to load. Without them, posters, search, filters, the sheet and Play all still work through `requestAnimationFrame`.
- The title is split while visible, and its lines rise from 125% so they clear the mask's padding for the shadow. Hiding the h2 before the split lets a later autoSplit restore the hidden state.

## Adapting

Replace `TAPES`, `FILMERS` and `PARTS` at the top of the script. A part needs a name, tape, spot, `obstacle`, `sky`, `runtime` (m:ss), tape in-point `in` (hh:mm:ss), an optional `date` for date-stamp formats, and tricks as `'m:ss Name'`. The comment above the data explains how to swap in real posters and muted clips. Render `<img>` and `<video muted loop playsinline preload="none">` in place of the canvas, and call `play()` and `pause()` where `playFrame()` and `halt()` start and stop the canvas.

For another subject, keep the idea that the thumbnail is a real machine screen. Change the art sub-palette, `drawSpot` and `drawRider` for the scene, and change the burn-in in `drawFrame` for the device (a CCTV timestamp, a film edge code, a broadcast bug). Map the brand onto the core colour tokens. Keep one accent for interaction marks and one for machine state.

Copy: names up to about 20 characters fit one caption line. Spots up to about 24 characters fit the index column at 1440px. Trick names can be any length, because the caption wraps.

Retiming and removing motion:

- **Load sequence:** the offsets are in the intro timeline (band 0 to 0.7s, title from 0.35s, wordmark and lede at 0.75s, frames from 0.9s with a 0.06s stagger). Durations are the `--d-band`, `--d-rise` and `--d-window` tokens. To drop the sequence, set `seen = true` before the `mm.add` call. Everything is then shown at once, and the shelf still teaches on first view.
- **Shots:** `--shot` sets the seconds per trick shot. The rider's line through each spot is in `route()`.
- **Hover, press, sweep, fill and swap** timings are the `--d-*` tokens with `--ease-out` and `--ease-in-out` (expo.out and expo.inOut, which the script uses by name).
- **Remove the teach-on-enter:** delete the second `ScrollTrigger.create`. **Remove the post-nudge play:** delete `fx.nudged`.
- **Reduced motion** is its own `gsap.matchMedia` branch. It gives final states, native scroll, posters only, an opacity-only dialog, instant reflow and caption swaps, and the clip plays only after a press on Play.

| Token | Role |
|---|---|
| `--asphalt` | Page ground; text on wax fills |
| `--grip` | Inputs, buttons, dialog panel |
| `--wax` | Text, drawn lines, focus rings, button fills, the checked-terrain pill, the night rider |
| `--concrete` | Secondary text (5.9:1 on asphalt) |
| `--kerb` | The double yellow lines only |
| `--bluescreen` | Title shadow, tracking band, empty state, the stage before footage |
| `--seam`, `--seam-strong` | Row separators; control and chip borders at rest |
| `--veil` | Dialog backdrop |
| `--art-day` to `--art-ground`, `--art-black` | Footage palette, read only by the canvas |
| `--font` | Kanit |
| `--step--1` to `--step-3`, `--step-display` | Type scale (major third on 16px; body at `--step-body`, 17px) |
| `--lh-body`, `--lh-display` | 1.55 and 0.88 |
| `--space-1` to `--space-10`, `--gutter`, `--max` | 4px spacing scale, side gutter, 1440px content width |
| `--r-frame`, `--r-thumb`, `--r-control`, `--r-chip`, `--r-dialog` | Radii by object |
| `--frame-w`, `--frame-gap`, `--thumb-w` | Shelf frame width (78vw on phones), gap, row thumbnail |
| `--dy-w`, `--dy-gap` | Double yellow line thickness and gap |
| `--ring` | 2px wax focus ring |
| `--ease-out`, `--ease-in-out` | expo.out and expo.inOut |
| `--d-*` | Durations for press, release, sweep, fill, leave, hover, swap, pill, band, rise, window, flip, open, close, blue hold, wipe, caption |
| `--shot` | Seconds per generated trick shot |

## Motion

Technique ids refer to `research/motion-techniques.md`. Everything runs in one `gsap.matchMedia` with `motion`, `reduce` and `fine` conditions. Lenis is driven from `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`), and so is the canvas player.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| VCR PLAY readout at the head's top left | LD3 support | Load, t=0 | Fades out 0.35 to 0.6s | Not shown |
| Blue tracking band rolls down the head and reveals it | LD3 (clip-path on the head) | Load, after fonts or 1.2s, skipped on repeat visits in a session | 0 to 0.7s, expo.inOut | Not shown |
| Title lines rise out of their masks | TX1 | Load, t=0.35 | 1.0s expo.out, stagger 0.08, from 125% | Static, no split |
| Wordmark, skip link and lede appear | Opacity only | Load, t=0.75 | 0.5s expo.out | Shown |
| Visible frames open from an inset window | LD7 | Load, t=0.9 | 1.0s expo.out, stagger 0.06 | Shown |
| Leading frame plays its opening shot once | Signature, scroll moment | Shelf top reaches 80% of the viewport, once, after the load | 4s shot | None |
| Nothing plays off screen | Anti-pattern 11 fix | ScrollTrigger toggle on the shelf | Immediate | n/a |
| Frame rolls its opening shot, PLAY readout fades in, grain steps | HV10 (generated), MD4 | Hover (fine pointer) or keyboard focus; on phones, the frame centred by the scroller (IntersectionObserver at 0.75) plays once | Loops 4s while hovered or focused; 0.3s readout; grain 0.8s steps(4) | Poster only; outline on focus |
| Follow-cam pans with the pointer | CU3 | Pointer move over a playing frame | quickTo 0.6s expo.out, up to 6% of scene width | Off |
| Back and Forward one part | Native smooth `scrollBy` with snap; then the leading frame plays once (fine pointers) | Click | Browser smooth scroll; play after 0.6s | Instant jump, no play |
| Frame press | MI1 | Press | 0.97 in 0.12s, release 0.45s expo.out | No scale |
| Skip link, Clear search, mail link, trick rows | HV2 (double yellow) + MI1 | Hover, focus (plus a wax ring), press; on touch the link underline is always shown | 0.45s sweep in from the left, out to the right | Static double line |
| Search, Back, Forward, Play, Close, Previous, Next | HV4 + MI1 | Hover (fill from the entry edge), focus (fill from the left plus a ring), press | Fill 0.35s in, 0.25s out | Colour swap |
| Skip to the index | Lenis `scrollTo` | Click | 1.2s expo.inOut, then focus moves to the index heading | Instant jump |
| Search field and Sort select | Border and label colour | Hover, focus | 0.2s | Instant |
| Checked terrain pill slides to the new chip | NV4 (x and scaleX, then the real width at rest) | Change | 0.5s expo.out | Jumps |
| Index reflow | CD5 Flip (leavers fade first, newcomers after the movers pass; the lending note rides along) | Search (150ms debounce), submit, terrain, sort, clear | 0.7s expo.inOut, stagger 0.015 | Instant |
| Blue-screen empty state | Opacity | No matches | 0.25s | Instant |
| Index row hover | HV2 across the full row + MI1 (0.99) | Hover, focus (plus a ring), press | 0.45s | Static double line |
| Tape sheet opens | CD7, then a 0.3s blue-screen hold and one cut to the footage | Frame or row | Panel 0.45s expo.out from y 12 and 0.98; backdrop 0.3s; closes 0.3s expo.inOut | Opacity 0.2s; poster until Play |
| Play and Pause label | MI2 | Click | 0.35s expo.out, width reserved | Instant |
| Now caption | TR1 | Playback reaches a new trick, or a trick is chosen | Out 0.2s expo.in, in 0.4s expo.out | Instant |
| Trick list seeks the clip | Seek | Click | Immediate | Immediate (does not start playback) |
| Cut between parts | LD3 band reused as a wipe | Previous or Next part | 0.35s (expo.in to cover, expo.out to reveal), throttled to one per wipe | Instant swap |
