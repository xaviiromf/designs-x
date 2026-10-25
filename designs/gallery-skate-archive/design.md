---
title: Parts, 1994 to 2008
section: gallery
subject: The index of video parts held by Kerb Tapes, a fictional volunteer archive that digitises skate videos filmed in and around Leeds between 1994 and 2008.
aesthetic: A VCR waiting on its no-signal blue screen, with camcorder tapes playing on it. The blue is the page, the painted kerb's double yellow line marks interaction, kerb-wax off-white carries the text, and a heavy, wide italic is set as a 90s video title card. Every picture is generated camcorder footage with its true burn-in.
mode: dark
fonts:
  - Zalando Sans (Google Fonts)
js: One script draws every picture as generated canvas footage, runs a drifting tape shelf you can throw, plays frames on hover, focus or centre, and runs a searchable, filterable index with a native-dialog tape sheet; nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, Observer, Flip), Lenis 1.3.26]
tags: [gallery, detailed, video, skateboarding, archive, media-index, canvas, generated-art, hover-to-play, infinite-strip, drag, scroll-snap, filter, search, dialog, dark, gsap, lenis, variable-font]
use_when:
  - A collection of short video items (parts, clips, episodes, reels) where a few seconds of motion say more than a still.
  - Items have real metadata worth searching and sorting (people, titles, places, years, runtimes), and each one deserves a detail view.
  - The source material has a recognisable machine look (camcorder, film, CCTV, broadcast) that can carry the identity.
avoid_when:
  - The items are photographs or documents with no motion. Use a still gallery instead.
  - There are more than about 40 items. The shelf loop becomes too long to scan, and the index wants pagination.
  - The page must stay still. The shelf drifts on desktop (with a Stop the shelf button) and frames play when pointed at, tabbed to or centred; moving footage is the point.
  - The brand cannot live on a saturated blue ground. Remapping `--bluescreen` to a neutral dark loses the VCR, and the design becomes a generic dark gallery.
---

## Why it works

**The bold idea: the tape shelf, a loop of camcorder screens on a VCR's blue screen.** The page ground is the deepened no-signal blue of a VCR with no tape in (#1E2FA8), so the twelve viewfinder frames read as tapes playing on a machine that is waiting for you. On desktop the shelf is a full-bleed loop that drifts left. Grab it and throw it: it carries momentum and lands on a whole frame, like a tape dropping into its slot. While it moves fast, every frame goes into VCR search mode: a FF or REW burn-in, the timecode racing at the shelf's speed, two or three noise bands, and the picture sheared with the speed (up to 6 degrees). It eases back to PLAY as the shelf settles. The lean comes from the machine, not from tilting cards. Point at a frame, tab to it, or centre it on a phone, and it plays a 4-second generated shot: the rider rolls into the spot, lands the part's first trick and rolls out, while the follow-cam pans with the pointer (CU3). The burn-in is true to the data. A PAL timecode starts at that part's tape in-point plus the trick's time and counts at 25 fps. VHS-C and Hi8 tapes add their uppercase date stamp. Both VX1000 tapes show the black fisheye corners and a bowed horizon. The 2008 HVX200 tape is letterboxed to 16:9. Everything else on the page is quiet and serves the shelf.

- **One function draws every picture.** `drawFrame(ctx, part, t, pan, osd, search)` draws the shelf posters, the 72px row thumbnails and the dialog stage, so a poster is always frame 0 of its own clip. The shot is framed as a filmer would: the scene at 1.5x, held between the rider and the spot, with the distant city on its own slower, flatter layer and a near-black kerb edge (bollards at the rail) crossing the bottom of the frame faster than the camera, for depth. The rider is drawn at 1.6x against the spot, which makes a ledge about knee height. The trick is read from its name, so the drawing never contradicts the caption: grinds throw sparks, slides turn the board across the rail, flips and shove-its smear the board over its last two positions, carves stay on the bank and lean about 25 degrees, rock to fakie and the invert hold at the coping and go back the way they came (the invert swings over a hand plant), a wallride climbs a wall that appears at the top of the bank, and anything else is an air. Night parts drop back behind the filmer's light, and the station handrail sits under two sodium lamps.
- **One canvas plays at a time**, on GSAP's ticker. The shelf loop redraws only the frames on screen, and only while it searches. Canvases are sized by a ResizeObserver with the device pixel ratio capped at 2. Film grain (MD4) appears only on footage that is playing. Scanlines are drawn into the frame, never over the page.
- **The shelf is handled, not scrolled.** On a fine pointer the twelve frames are followed by a hidden copy (aria-hidden, out of the tab order), and x wraps over one copy, so the loop never jumps. The drift (18 px a second) eases to a stop while the pointer is over the shelf, while a frame has keyboard focus, while the sheet is open, while the shelf is off screen and after Stop the shelf (WCAG 2.2.2). Back and Forward move by one whole frame, and a tabbed-to frame glides fully into view. A sideways trackpad swipe moves the shelf and settles it on a frame. A drag of 6px or more never opens a part. On touch and under reduced motion it is a native scroll-snap row with no copy and no drift; on touch the frame that settles in the middle plays once and rests on its poster. The first time the shelf scrolls into view after the load, the leading frame plays once, so desktop visitors see that frames play before they point at one.
- **The page load is a tape loading.** A tracking band rolls down the head and reveals it under a PLAY readout. Then each visible frame's window opens on the VCR's menu blue with PLAY, and a two-frame tracking band cuts it to its footage, 0.06 seconds apart.
- **The tape sheet is a real player.** A native `<dialog>` holds the blue screen and a PLAY readout for 0.3 seconds, then cuts to the footage. Under the stage, a 3px tape track fills in kerb yellow as the clip plays, with a tick at each trick, and a native range on top seeks it; its value text is the tape timecode and the trick. Play and Pause swap labels in place (MI2). The trick list seeks the clip and follows playback with `aria-current`, and the "Now" caption swaps under its mask (TR1). Previous part and Next part walk the current filtered and sorted order and wrap at the ends. They cut with the same tracking band as the load, throttled to the band's 0.35 seconds. The panel is pinned to the top of the viewport, so a part with a longer camera line never shifts it. Focus always lands on Close when it opens.
- **The running time is information, not decoration.** The counter (SC11) reports how much of the listed footage sits above the centre line of the screen: "Running time so far 17:42 of 42:11". It is a column on the left when wide and a sticky bar with a ruled lower edge on phones. It is text, so it also runs under reduced motion, and it re-measures after every filter, sort or search.
- **Two jobs, two colours.** Kerb yellow (#F2C318, 6.2:1 on the ground) is interaction and "you are here": focus rings, the double yellow line that sweeps under a hovered or focused link, row, trick or frame caption (HV2, drawn as the two borders of one pseudo-element and swept with scaleX), the button fill (HV4), the checked-terrain pill (NV4), the tape track, the current trick's bar and the counter. Machine state is the blue itself: the ground, the stage before the footage, the darker tracking band. Links also carry a plain 1px wax line at rest, so they never rely on colour alone. Control borders are wax at 62%: 3.5:1 on the raised blue and 4.1:1 on the ground.
- **One family, set by its axes.** Zalando Sans is variable on wdth 75 to 125 and wght 200 to 900, roman and italic. Its italic at wdth 125 / 900, with a hard 0.06em black offset shadow at 60%, is the title card, and only the title. Names step down to wdth 112 / 800, body to 100 / 400, meta to 87.5 / 450 and the counter to 75 / 800. The canvas burn-in is wdth 87.5 / 600, set as `semi-condensed 600`, which measures narrower than the normal width, so the axis applies. Tabular figures were checked in Chromium on 2026-10-24: at 40px, "1111" and "0000" are both 94.41px wide at wdth 87.5 / 450 and both 87.38px at wdth 75 / 800 (proportional: 62.73px and 93.13px). Tabular figures are set only on elements that hold figures, because the face's tnum also widens the space. Canvas text cannot switch on tnum, so the burn-in draws each character in a fixed cell the width of a zero, as a camcorder does.
- **Structure is information.** Rows are not numbered, because the index is not a sequence. The only numbers are years, runtimes and timecodes, and all are true. Radii follow the object: a 14px camcorder LCD for frames, 4px for thumbnails, 6px for controls, pills for chips, 18px for the dialog and none for rows.
- **A section, not a page.** The title is an h2 and the index heading an h3; the host page owns the h1.

### Revisions against the collection's defaults

- **Palette.** Blue-grey tarmac (#23262B) with kerb yellow joined an eight-design cluster of blue-grey grounds with an amber or yellow accent, and was almost identical to crud-warehouse-bins. The VCR blue screen became the ground and the VCR menu blue (#2A3CC0) the raised surface. Wax is 8.3:1 on the ground and 6.7:1 on the raised blue. Secondary text was lightened to #CFCBBE (6.4:1 and 5.2:1). No other design has a saturated blue ground.
- **Font.** Mona Sans was already in eight plans. Zalando Sans has the same axes and no other user in the collection.
- **The loop came back, the tilt did not.** A still, clamped shelf with arrow buttons read as a default carousel, so the drifting loop and the throw returned. Cards that lean with speed repeat testimonials-surf-school and team-restaurant-kitchen, so the speed shows as VCR search mode drawn inside each frame instead.
- **No cursor preview, no dimming.** A preview card that followed the pointer over the index rows, with sibling dimming, repeated gallery-classic-cars. Rows carry an inline poster thumbnail at every width, the double yellow line and the focus ring.
- **No text effect.** The masked line rise on the title and index heading opened every other detailed gallery. The tracking band alone reveals the title, and the index heading is static.
- **Uppercase lives only in the machine's own readouts:** inside the canvas burn-in and the two SVG readouts (the load's PLAY and the empty state's STOP). Every UI label is sentence case. There is no monospace.
- **No hover lift, no batched fade-ups, no decorative shadows or gradients on the page.** The footage and the tracking-band scanlines draw their own (the night light and sodium lamps in the canvas, scanline stripes in the band).
- **Only transform, opacity and clip-path animate.** Colour changes under a fill or on a checked chip are timed steps, not fades. The film grain is an inline SVG noise texture (white, not a palette colour), and the select chevron is a mask filled with `--wax`.
- **The empty state is the VCR's STOP**, drawn in wax above plain text, since the blue screen is the page.
- **Accessory removed last:** the browser's own search-cancel cross inside the field. It was a second, differently drawn way to do what Clear search already does.

## Do not touch

- `drawFrame` must stay the single source of every picture, including search mode. A separate poster image would drift from frame 0.
- The burn-in rules come from `TAPES`: `date` for VHS-C and Hi8, `fisheye` for the VX1000, `letterbox` for the HVX200. Timecodes are `pal((inS + trick.at + t) * 25)`. Keep them true to the data.
- `kindOf` must know every trick in the data. A trick it does not know is drawn as an air, and the picture then contradicts the caption. `runSelfTest()` asserts each kind.
- Only one canvas plays at a time (`play()` halts the previous one), and nothing plays or drifts off screen, while the dialog is open, or under reduced motion unless the person presses Play.
- The drift runs longer than 5 seconds, so Stop the shelf must stay visible whenever the shelf drifts.
- The loop's x wraps over (-half, 0], so at rest the real twelve are on screen and the hidden copy only fills the trailing edge. Throws, Back, Forward and swipes all snap to whole frames.
- The phone autoplay and the first-view play run once (4 seconds) and return to the poster. If either loops, the page needs a pause control there too.
- Yellow is interaction and position only. Do not use it for headings, body text or decoration.
- The ground must stay a saturated blue. A neutral dark turns the frames back into ordinary thumbnails.
- The tracking band is the only transition device: at load (head and frames), then between parts. Keep the throttle in `partStep`.
- A drag of 6px or more is not a click (`dragMinimum: 6` and the capture-phase click guard). Without it, every throw opens a part.
- `[hidden]` is `!important` everywhere except index rows, so that Flip can show leaving rows while they fade. The lending note is part of the Flip so nothing overlaps during a reflow.
- Hidden start states exist only under `html.js`. The class is removed if GSAP, ScrollTrigger, Observer, Flip or Lenis fail to load. Without them, posters, search, filters, sorting, the sheet, the seek range and Play all still work, with the player on `requestAnimationFrame`; the shelf is a native scroll row, frames stay on their posters until opened, and the counter is hidden.

## Adapting

Replace `TAPES`, `FILMERS` and `PARTS` at the top of the script. A part needs a skater, tape, spot, `obstacle`, `sky`, `runtime` (m:ss), tape in-point `in` (hh:mm:ss), a `date` for date-stamp formats, and tricks as `'m:ss Name'`. The comment above the data explains how to swap in real media: set `poster` (image URL) and `clip` (muted mp4 URL), render `<img>` and `<video muted loop playsinline preload="none">` in place of the canvas, and call `video.play()` and `video.pause()` where `play()` and `halt()` start and stop the canvas. Search mode then becomes a CSS skew and `playbackRate` on the video. Update the asserts in `runSelfTest()` when the data changes.

For another subject, keep the idea that the thumbnail is a real machine screen and the page is that machine's idle state. Change the art sub-palette, `drawSpot`, `drawNear` and `drawRider` for the scene, and the burn-in in `drawFrame` for the device (a CCTV timestamp, a film edge code, a broadcast bug). Map the brand onto the core colour tokens, keeping one colour for interaction and one for machine state.

Copy: names up to about 20 characters fit one caption line. Spots up to about 24 characters fit the index column at 1440px. Trick names can be any length, because the caption wraps.

Retiming and removing motion:

- **Load sequence:** offsets are in the intro timeline (band 0 to 0.7s, PLAY readout fades at 0.35s, wordmark and lede at 0.75s, frame windows from 0.9s with a 0.06s stagger and the cut 0.25s into each, captions from 1.1s, shelf controls at 1.25s). Durations are `--d-band` and `--d-window`. To drop the sequence, set `seen = true` before the `mm.add` call; everything is then shown at once.
- **Shots:** `--shot` sets the seconds per trick shot. The rider's line through each spot is in `route()`; the framing is `Z` (scene zoom) and `RS` (rider scale).
- **Shelf:** `--drift` is the drift in px per second, `--d-throw` the momentum after a drag (the throw distance is `velocityX * .3`, snapped to a frame), `--d-nudge` the Back and Forward move, `--d-search` how long search mode takes to ease back to PLAY. `SEARCH_V` (300 px/s) is the speed where search mode starts. Delete the `if (fine)` block to leave a plain scroll-snap row everywhere (then also delete the Stop the shelf button).
- **First-view play:** delete the `ScrollTrigger.create` with `start: 'top 80%'`.
- **Hover, press, sweep, fill and swap** timings are the `--d-*` tokens with `--ease-out` and `--ease-in-out` (expo.out and expo.inOut, which the script uses by name).
- **Reduced motion** is its own `gsap.matchMedia` branch: final states, native scroll, a native shelf row, posters only, an opacity-only dialog, instant reflow and caption swaps, and the clip plays only after a press on Play. The seek range and the counter keep working.

| Token | Role |
|---|---|
| `--bluescreen` | Page ground (the VCR's no-signal blue); text on yellow fills; the stage before footage |
| `--menu` | Raised surfaces: inputs, buttons, the dialog panel, the screen behind a frame, a shelf frame while its tape loads |
| `--tracking` | The tracking band at load and between parts |
| `--scan-light`, `--scan-dark` | The tracking band's bright and dark scanlines |
| `--wax` | Text, drawn lines, the night rider, the readouts, the select chevron, the seek head |
| `--concrete` | Secondary text (6.4:1 on the ground, 5.2:1 on `--menu`) |
| `--kerb` | Interaction and position: focus rings, double yellow lines, button fills, the checked pill, the tape track, the current trick, the counter |
| `--title-shadow` | The title card's hard offset shadow (black at 60%) |
| `--seam`, `--seam-strong` | Row separators and the phone counter's edge; control and chip borders, the resting link line and the empty tape track (3.5:1 on `--menu`) |
| `--veil` | Dialog backdrop |
| `--art-day` to `--art-ground`, `--art-asphalt`, `--art-black` | Footage palette, read only by the canvas |
| `--font` | Zalando Sans |
| `--wdth-title`, `--wdth-name`, `--wdth-body`, `--wdth-meta`, `--wdth-counter` | Width axis per role (125, 112, 100, 87.5, 75) |
| `--step--1` to `--step-3`, `--step-body`, `--step-count`, `--step-display` | Type scale (major third on 16px; body at 17px; the wide counter; the title card, capped at 5.25rem so the shelf leads) |
| `--step-readout`, `--step-burn` | The SVG readouts' type size; the canvas burn-in size in footage units |
| `--lh-body`, `--lh-display` | 1.55 and 0.9 |
| `--space-1` to `--space-10`, `--gutter`, `--max` | 4px spacing scale, side gutter, 1440px content width |
| `--r-frame`, `--r-thumb`, `--r-control`, `--r-chip`, `--r-dialog` | Radii by object (the load's window clip reads `--r-frame`) |
| `--frame-w`, `--frame-gap`, `--thumb-w` | Shelf frame width (260 to 460px, 78vw on phones), gap, row thumbnail |
| `--dy-w`, `--dy-gap` | Double yellow line thickness and gap |
| `--ring` | 2px yellow focus ring |
| `--ease-out`, `--ease-in-out` | expo.out and expo.inOut |
| `--d-*` | Durations for press, release, sweep, fill, leave, hover, the colour step under a fill, swap, pill, band, window, throw, search, nudge, flip, open, close, blue hold, wipe, caption |
| `--drift` | Shelf drift, px per second |
| `--shot` | Seconds per generated trick shot |

## Motion

Technique ids refer to `research/motion-techniques.md`. Everything runs in one `gsap.matchMedia` with `motion`, `reduce` and `fine` conditions, and one expo ease family. Lenis is driven from `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`), and so are the canvas player and the shelf loop. Lenis stops while the tape sheet is open. Cleanup aborts every listener, removes the shelf's copy and ticker callback, kills the Observer and tweens, disconnects the observers, destroys Lenis and redraws every canvas at frame 0.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| VCR PLAY readout at the head's top left | LD3 support | Load, t=0 | Fades out 0.35 to 0.6s | Not shown |
| Tracking band rolls down the head and reveals it, title included | LD3 (clip-path on the head) | Load, after fonts or 1.2s, skipped on repeat visits in a session | 0 to 0.7s, expo.inOut | Not shown |
| Wordmark, skip link and lede appear | Opacity only | Load, t=0.75 | 0.5s expo.out | Shown |
| Each visible frame loads its tape: window opens on blue with PLAY, a two-frame tracking band cuts to the footage, then captions | LD7 + LD3 | Load, t=0.9 (cut at +0.25s, captions t=1.1) | Window 1.0s expo.out, stagger 0.06; band 0.08s | Shown |
| Shelf controls appear | Opacity only | Load, t=1.25 | 0.5s expo.out | Shown |
| Shelf drifts left in a loop | CD3 | Ambient, once the load ends (fine pointers) | 18 px/s, eases in and out over about 0.3s; pauses on pointer, focus, sheet, off screen, Stop the shelf | Native row, no drift |
| Leading frame plays its opening shot once | Scroll moment (first view) | Shelf top reaches 80% of the viewport, once, after the load | One 4s shot | None |
| Running time so far | SC11 (scrubbed text) | Scroll through the list | Live; re-measured after every reflow | Same (text, not movement) |
| Nothing plays or drifts off screen | Anti-pattern 11 fix | ScrollTrigger toggle on the shelf | Immediate | n/a |
| Frame rolls its opening shot, PLAY readout fades in, grain steps, caption gets the double yellow line | HV10 (generated), MD4, HV2 | Hover (fine pointer) or keyboard focus, and again when focus returns from the sheet; on touch, the frame centred by the scroller plays once | Loops 4s while hovered or focused; 0.3s readout; grain 0.8s steps(4); line 0.45s | Poster only; ring and line on focus |
| Follow-cam pans with the pointer | CU3 | Pointer move over a playing frame | quickTo 0.6s expo.out, up to 6% of scene width | Off |
| Drag and throw the shelf | CD3 (loop, momentum snapped to a whole frame) | Pointer drag of 6px or more (fine pointers); native cursor grab and grabbing; sideways trackpad swipe | Follows the pointer; momentum 1.0s expo.out | Native scroll-snap row |
| Search mode on every frame on screen | VCR FF/REW (in place of CD3's tilt) | Shelf speed above 300 px/s | In over 0.1s; shear up to 6 degrees with speed; back to PLAY over 0.4s | Never (no drift or throw) |
| Back and Forward one part | Tween to the next whole frame (loop); native smooth `scrollBy` with snap (touch) | Click | 0.6s expo.inOut | Instant jump |
| Stop the shelf and Run the shelf | MI2 + HV4 + MI1 | Click | 0.35s label swap; drift eases out | Hidden (nothing drifts) |
| Frame press | MI1 | Press | 0.97 in 0.12s, release 0.45s expo.out | No scale |
| Skip link, Clear search, mail link, trick rows | HV2 (double yellow, scaleX) + MI1 | Hover, focus (plus a ring), press; on touch the double line is always shown | 0.45s sweep in from the left, out to the right | Static line |
| Search, Back, Forward, Stop, Play, Close, Previous, Next | HV4 + MI1 | Hover (fill from the entry edge), focus (fill from the left plus a ring), press | Fill 0.35s in, 0.25s out; label colour steps at 0.06s | Colour swap |
| Skip to the index | Lenis `scrollTo` | Click | 1.2s expo.inOut, then focus moves to the index heading | Instant jump |
| Search field and Sort select | Border and label colour step | Hover, focus | Instant | Instant |
| Checked terrain pill slides to the new chip | NV4 (x and scaleX) | Change | 0.5s expo.out; label colour steps at 0.12s | Jumps |
| Index reflow | CD5 Flip (leavers fade first, newcomers after the movers are mostly home; the lending note rides along) | Search (150ms debounce), submit, terrain, sort, clear | 0.5s expo.out, stagger 0.015; leave 0.15s; enter after 0.175s | Instant |
| STOP empty state | Opacity | No matches | 0.25s | Instant |
| Index row hover | HV2 inside the row + MI1 (0.99) | Hover, focus (plus a ring), press | 0.45s | Static double line |
| Tape sheet opens | CD7, then a 0.3s blue-screen hold and one cut to the footage | Frame or row | Panel 0.45s expo.out from y 12 and 0.98; backdrop 0.3s; closes 0.3s expo.inOut | Opacity 0.2s; poster until Play |
| Tape track fills; seek | Transform scaleX; native range | Playback; drag or arrow keys on the range | Live | Same (a plain control) |
| Play and Pause label | MI2 | Click | 0.35s expo.out, width reserved | Instant |
| Now caption | TR1 | Playback reaches a new trick, or a trick is chosen | Out 0.2s expo.in, in 0.4s expo.out | Instant |
| Trick list seeks the clip | Seek | Click | Immediate | Immediate (does not start playback) |
| Cut between parts | LD3 band reused as a wipe | Previous or Next part | 0.35s (expo.in to cover, expo.out to reveal), throttled to one per wipe | Instant swap |
