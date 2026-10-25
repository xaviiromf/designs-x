# Implementation plan: motion tier and new sections

Source: `research/motion-techniques.md`, built from 60 sampled entries (57 distinct sites; 3 more are added during build to reach 60).

## Scope

- 27 **detailed** designs, three for each existing section (hero, features, pricing, testimonials, process, cta, footer, portfolio, crud).
- 6 **new sections** (nav, story, gallery, faq, contact, team), each with 2 **simple** and 3 **detailed** designs: 30 designs.
- 57 designs in total, taking the collection from 19 to 76.

## Tiers and labels

| Tier | Runtime | Catalogue label |
|---|---|---|
| Simple | HTML and CSS, plain JavaScript only where needed | none, or *uses javascript* underlined orange |
| Detailed | GSAP 3.15 (ScrollTrigger, SplitText and other plugins as needed) + Lenis 1.3.26 from jsDelivr, pinned | *uses javascript* underlined red |

The label is derived from `design.md`: a non-empty `libraries` list means red; `js: none` means no label; anything else means orange.

## Pipeline per design

1. Plan: tokens, layout, the signature moment, and a motion score mapping every interactive item to a technique from the catalogue.
2. Art direction across the whole collection: no repeated typefaces, palettes or signature devices.
3. Build: one self-contained `index.html` and `design.md`.
4. Review by three independent agents: taste, quality audit, motion and function (frame captures with `scripts/motion.mjs`, flows with `scripts/check-flows.mjs`).
5. Fix and verify, up to two rounds, then `preview.png`.
6. Collection QA: flow tests over all 76 designs, site build, requirements critic, deploy.

## Designs

| Slug | Section | Tier | Mode | Subject | Techniques |
|---|---|---|---|---|---|
| `hero-velodrome` | hero | detailed | dark | Event night bookings for an indoor track-cycling velodrome hosting a six-day race. | LD1 lap-counter preloader, TX1, SC10 velocity coupling, HV5 |
| `hero-perfumery` | hero | detailed | light | An independent perfumery launching one new scent with a sample-vial offer. | LD6, TX3, CU4 lens reveal, MD1 |
| `hero-doc-festival` | hero | detailed | dark | A documentary film festival announcing its programme and pass sales. | LD3 curtain hand-off, TX8 fly-through title, CU1 cursor states, MD4 grain |
| `features-ebike` | features | detailed | light | An urban cargo e-bike maker presenting the features of its new model. | SC3 pinned chapters, SC12 scrubbed drawn sequence, HV6 |
| `features-mixing-plugin` | features | detailed | light | A small company selling a mixing-console audio plugin for music producers. | SC5 word illumination, HV12 meter-glass glare, CD9 tabs crossfade, MI6 (signature: a peak meter lines up on Test, holds 0.6 s, then falls) |
| `features-coffee-roaster` | features | detailed | light | A specialty coffee roaster explaining what its subscription includes. | SC4 horizontal track, SC2 framed parallax, HV12 sheen |
| `pricing-coworking` | pricing | detailed | light | Membership plans for a coworking space with desks, studios and meeting rooms. | NV4 sliding indicator billing toggle, CD5 Flip reflow, HV4, SC13 |
| `pricing-ski-pass` | pricing | detailed | any | Lift-pass options for a mid-size ski resort (day, week, season, family). | TR4 threshold switcher, TX6 rotating word slot, MI3, HV5 |
| `pricing-photo-licensing` | pricing | detailed | dark | Licence tiers for a historical photo archive that licenses images to publishers. | CU2 list preview follows cursor, HV9 expanding rows, CD8 hold to confirm |
| `testimonials-surf-school` | testimonials | detailed | light | A surf school collecting words from beginners, families and returning surfers. | CD3 infinite drag strip with velocity tilt, TX2, CU1 |
| `testimonials-mountain-hotel` | testimonials | detailed | light | A small mountain hotel showing entries from its guest book. | SC6 stacked sticky cards, TX5 highlighter (justify it), MD1 |
| `testimonials-youth-orchestra` | testimonials | detailed | dark | A youth orchestra sharing words from players, parents and patrons. | CD2 stepped focus carousel, TR2 auto-advance with timer, SC9 colour handoff |
| `process-brewery` | process | detailed | dark | A craft brewery showing how one beer goes from grain to can. | SC3 pinned chapters, SC16 rule draw-in (DrawSVG), SC11 progress variable |
| `process-bespoke-tailor` | process | detailed | light | A bespoke tailor explaining the fittings from first measure to final suit. | SC4 horizontal track, MD2 frame to full bleed, HV11 drawn ornament |
| `process-smallsat` | process | detailed | dark | A small-satellite integrator explaining the path from booking to launch. | SC15 stepped snap (handle with care), TX4 scramble short labels, SC17 pixel-cell cover |
| `cta-city-marathon` | cta | detailed | light | A city marathon opening registration for next spring's race. | TX7 type as material, SC10, HV5, MI4 |
| `cta-vineyard-harvest` | cta | detailed | light | A family vineyard inviting volunteers to its harvest weekend. | TR3 planting and path walk, SC16 rules, CD7 circles, MI3 (signature: your share walked as a serpentine path through the planting plan; CU4, TX9 and CD8 dropped) |
| `cta-indie-game` | cta | detailed | dark | An indie game studio asking players to wishlist and try the demo. | TX11 bleeding wordmark, CU5 grid ripple, MI1, MD4 |
| `footer-record-label` | footer | detailed | dark | The footer of an independent vinyl record label. | SC8 footer uncover, HV1 text roll, CU6 elastic string divider |
| `footer-botanic-garden` | footer | detailed | light | The footer of a city botanic garden with opening hours and memberships. | SC8, HV2 underline sweep, SC16 |
| `footer-architecture-biennale` | footer | detailed | light | The footer of an architecture biennale with venues, tickets and press. | TX11, HV7 sibling dimming, CD10 copy with confirmation |
| `portfolio-wildlife-photographer` | portfolio | detailed | dark | Personal portfolio of a wildlife photographer with expedition stats. | CU2, MD1, CD5 Flip filter, animated charts |
| `portfolio-motion-designer` | portfolio | detailed | light | Personal portfolio of a 3D and motion designer taking studio work. | HV10 hover-to-play (generated canvas), SC4, TX1, animated charts |
| `portfolio-sports-physio` | portfolio | detailed | any | Professional portfolio of a sports physiotherapy practice with recovery outcomes. | SC13 count-up, NV6 section spy, TR1 caption swap, animated charts |
| `crud-vet-clinic` | crud | detailed | light | Patient and appointment records for a small veterinary clinic. | CD5 Flip reorder, CD7 dialog open, CD8 hold to delete, MI3, MI4 |
| `crud-warehouse-bins` | crud | detailed | dark | Bin and pallet inventory for a regional warehouse. | CD4 draggable items between bins, CD5, MI1, NV4 |
| `crud-gradebook` | crud | detailed | light | A teacher's gradebook for classes, students and assessments. | CD6 accordion, MI4, TR3 ripple, SC13 averages |
| `nav-bakery` | nav | simple | light | Header and menu for a neighbourhood bakery (hours, menu, order ahead). | CSS only: details/summary menu, HV2 in CSS |
| `nav-city-services` | nav | simple | light | Header with a services mega-menu for a city council website. | vanilla: NV3 mega-menu with hover intent and full keyboard support |
| `nav-fashion-label` | nav | detailed | any | Header and full-screen menu for an independent fashion label. | NV1 full-screen reversible timeline, HV1, MI2, lenis.stop |
| `nav-concert-hall` | nav | detailed | light | Header and mega-menu for a concert hall's season site. | NV3 hover intent, MD5 list-synced media swap, NV5 hide-on-scroll |
| `nav-yacht-builder` | nav | detailed | light | Header for a sailing-yacht builder with section navigation. | NV2 morphing pill, NV4 sliding indicator, NV6 section spy |
| `story-solar-coop` | story | simple | light | A community solar cooperative explaining how a shared roof array pays members. | vanilla: CSS sticky stage + JS progress (SC3 without libraries) |
| `story-oyster-farm` | story | simple | light | An oyster farm telling one oyster's three years from seed to plate. | CSS scroll-driven animations (animation-timeline) with a static fallback, no JS |
| `story-mechanical-watch` | story | detailed | dark | A watchmaker's product tour of one hand-wound mechanical movement. | SC3, SC12 exploded-view sequence drawn in SVG/canvas, TX1 |
| `story-glacier-research` | story | detailed | light | A glacier research station showing forty years of retreat. | SC9 colour handoff, SC5, SC2, TR4 |
| `story-cargo-sailing` | story | detailed | any | A wind-powered cargo shipping line following one crossing. | SC4 horizontal track, SC17 pixel-cell cover, SC10 |
| `gallery-zine-fair` | gallery | simple | light | A zine fair's gallery of this year's exhibitors' covers. | vanilla: CSS grid + native dialog lightbox with keyboard nav |
| `gallery-street-food-market` | gallery | simple | any | A street food market's gallery of its stalls, filterable by cuisine. | vanilla: filter chips, no animation library |
| `gallery-classic-cars` | gallery | detailed | dark | A classic-car restorer's index of restored cars. | CU2 list preview follows cursor, CD5 Flip filter, HV7 |
| `gallery-botanical-illustration` | gallery | detailed | light | A botanical illustrator's archive of plates. | CD2 stepped focus carousel, MD1, TR1 |
| `gallery-skate-archive` | gallery | detailed | dark | A skateboarding video archive's index of parts. | CD3 infinite strip with drag, HV10 hover-to-play (generated), MD4 |
| `faq-pharmacy` | faq | simple | light | Questions for a community pharmacy (prescriptions, vaccines, delivery). | CSS only: details/summary, no JS |
| `faq-moving-company` | faq | simple | light | Questions for a home moving company, with a search box. | vanilla: live search filter over questions |
| `faq-camper-rental` | faq | detailed | any | Questions for a camper-van rental company. | CD6 accordion real height, NV6 section spy, MI2 |
| `faq-language-school` | faq | detailed | light | Questions for a language school's immersion courses. | TX1, CD6, CU1, TX6 |
| `faq-esports-arena` | faq | detailed | dark | Questions for an esports arena's tournament weekend. | TX4 scramble labels, CD6, SC17 |
| `contact-plumber` | contact | simple | light | Contact and call-out request for a local plumbing business. | vanilla: form validation and in-page confirmation (signature: an under-sink compression joint drawn in five urgency states, water growing out of the fitting; the boiler pressure gauge was dropped) |
| `contact-wedding-florist` | contact | simple | light | Enquiry form for a wedding florist. | CSS-first with minimal vanilla JS for the in-page result |
| `contact-recording-studio` | contact | detailed | dark | Booking enquiries for a recording studio. | MI4, HV5, CD8 hold to send, MI6 |
| `contact-expedition-outfitter` | contact | detailed | any | Trip-planning enquiry for a polar expedition outfitter. | TR4 multi-step, MI3, CU4 |
| `contact-brand-agency` | contact | detailed | light | New-business contact for a small brand-identity agency. | CD10 copy email, TX6, HV1 |
| `team-community-clinic` | team | simple | light | The team of a community health clinic. | CSS only, no JS |
| `team-rowing-club` | team | simple | light | Coaches and crews of a rowing club, filterable by squad. | vanilla: filter with no library |
| `team-restaurant-kitchen` | team | detailed | dark | The kitchen brigade of a seasonal restaurant. | CD3 drag strip, HV10 hover-to-play (generated), TX2 |
| `team-theatre-company` | team | detailed | any | The ensemble of a touring theatre company. | CU2, TR3 ripple by distance, HV7 |
| `team-research-lab` | team | detailed | light | The members of a university marine-biology research lab. | CD5 Flip filter, SC6, TX3 |
