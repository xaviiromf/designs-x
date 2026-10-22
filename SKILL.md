---
name: designs-x
description: Curated, original front-end section designs (hero, features, pricing, testimonials, process, cta, footer, portfolio, crud) as self-contained HTML/CSS with design notes. Use when building or restyling a landing page, marketing section, portfolio page or CRUD records screen and you want a distinctive, non-templated starting point to adapt to the project's brand and stack.
---

# Using designs-x

1. Read `PRINCIPLES.md` once. It defines the taste and the defaults to avoid.
2. List candidates: every `designs/*/design.md` has frontmatter with `section`, `subject`, `aesthetic`, `mode`, `use_when` and `avoid_when`. Filter by `section`, then choose by `use_when`/`avoid_when` against the target project.
3. Open the chosen `designs/<slug>/index.html`. All tokens are CSS custom properties on `:root`.
4. Follow the design's `## Adapting` section: map the target brand to the tokens, replace copy with real content, keep **Do not touch** items intact.
5. Translate to the target stack last. Keep the one bold idea described in **Why it works**.

Never copy the sample copy into a real project. Never mix two designs' bold ideas in one section.
