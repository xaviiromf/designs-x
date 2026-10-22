---
title: Grocery stock and shelf tickets
section: crud
subject: Larch Street Grocer, a fictional neighbourhood supermarket, keeping its stock counts, shelf prices and use-by dates.
aesthetic: Fluorescent shop-floor grey with plain interface type, where every price is printed as a real UK shelf-edge ticket clipped onto a blue plastic shelf rail.
mode: light
fonts:
  - Big Shoulders Display 800 (Google Fonts), shelf-ticket prices only
  - Golos Text 400, 500, 600 (Google Fonts), everything else, including the H2
js: A records manager kept in sessionStorage (in-memory fallback) that creates, lists, sorts, searches, filters, edits and deletes products with typed validation, reprints a live shelf ticket on every keystroke, offers a persistent undo after delete, and runs an assert-based self-test when the URL hash is selftest; nothing navigates away or posts to a server.
tags: [crud, inventory, grocery, retail, stock, price-list, form-validation, session-storage, dialog, table, light]
use_when:
  - Stock lists, price lists and retail back-office screens where each record has a price, a quantity and maybe a date.
  - Any typed record list with money and dates that professionals edit all day and need to scan fast.
  - A shop, market stall, pharmacy or café that wants the list to look like its own shelf, not an admin template.
avoid_when:
  - The records have no prices or quantities. The ticket is the whole idea; without money it is decoration.
  - The data must persist or be shared between people. This keeps everything in one browser tab.
  - Large datasets (more than a few hundred rows). There is no pagination or virtualised list.
---

## Why it works

**The bold idea is that the form prints the shelf ticket.** Every price on the page is drawn as a UK shelf-edge ticket: a white label clipped between the lips of a blue shelf rail, the price in Big Shoulders Display 800 with the pence raised and smaller (£1⁶⁰), and prices under a pound printed as "85p", as real tickets do. Under the price sits the unit price that UK law requires ("72.5p per litre", "£6.25 per kg"). A yellow "Low: 3 left" or "Out of stock" tab clips on top when stock is at or under the reorder level. A red use-by sticker is slapped across the corner at -4deg when a perishable item is within 2 days of its date or past it. The add/edit form has a live ticket beside it that reprints on every keystroke, using the same parsers as validation, so an empty or invalid price prints grey dashes, never NaN. In edit mode a changed price prints "Was ~~£1.45~~" above the new one, the old price struck through in the ticket face, as real shelf tickets do. The same ticket appears small in the table's price column, each row on its own strip of rail and all at one width as on a shelf edge, and large in the preview and the details dialog. Big Shoulders is used for nothing else, so the eye learns one shape for money. A shopkeeper recognises it on sight.

- **Stock first.** The list comes straight after the tally sentence, so the first screen shows the tickets; "Add a product" in the header jumps to the form below the list (edit scrolls there too). Reset sample data sits by the totals at the bottom.
- **Everything else is quiet.** Golos Text on white and fluorescent grey, 1px rules, one semantic table. The H2 is Golos 600 at 2rem, smaller than the detail ticket's price. No KPI tiles: one generated tally sentence ("24 products across 6 aisles, worth £861.54 at shelf price. 5 are running low...") plus counts on the filter toggles that act on them. No row cards, no zebra stripes, no shadows.
- **Colour means state.** Blue is a material, the plastic shelf rail, and the one action colour (filled buttons, focus ring); a green rail was tried and dropped because next to yellow and red it read as a traffic-light "OK" state. Yellow means running low or just changed (the row highlight after add, save and undo). Red means use-by, errors, and the confirm buttons for delete and reset; row Delete is a plain ink text button so 24 rows don't drown the 3 real use-by stickers. Product-name buttons and in-page links are underlined in ink, so the rail colour stays on tickets and buttons.
- **Money is exact.** Prices are stored as integer pence; line values and totals are integer sums. Unit prices are computed in tenths of a penny with integer half-up rounding: 145p for 2 l is exactly 72.5p per litre (one decimal shown under £1), 99p for 400 ml is 247.5p per litre, shown as £2.48.
- **Strict, friendly parsers.** The price parser accepts "1.45", "£1.45", " 1,45 " and "2"; it rejects 0, negatives, "1.005" ("Prices stop at the penny: use 2 decimal places at most."), "1.2.3", text and anything over £9,999.99. Stock counts must be whole ("Count whole units, like 12."). Perishable products need a use-by date. The SKU is upper-cased and must be unique, ignoring the record being edited.
- **Built for speed and the keyboard.** The form is `novalidate` and handles `submit` itself: on error every bad field gets `aria-invalid`, an inline message tied by `aria-describedby`, focus moves to the first one, and the live region names them. After a good add the form clears, focus returns to Product name and a "Show in list" anchor points to `#row-<id>`. Every row is rendered even when search hides it, so the anchor always resolves; if the new row is hidden, the status says so and offers "Clear search and show it" instead. The status line clears on the next submit. A half-typed use-by date (the input's `badInput`) is an error, never silently dropped. Escape cancels edit, closes dialogs and dismisses undo; focus returns to the button that started each action. Dialogs close on a backdrop click only, never on a click that lands on their own padding.
- **Delete is safe.** A native confirm dialog says what leaves ("Its 72 units (£104.40 at shelf price) leave the stock list.") with Keep it focused. The undo bar has no timeout, sticks to the bottom of the section, and puts the record back at its old index. Deletions stack: undo again restores the one before. If a deleted product's SKU has since been reused, undo refuses and names the product now holding it, so the list never holds a duplicate SKU. Stored rows are shape-checked on load; corrupt rows are dropped.
- **Responsive without losing the table.** Above 800px it is a sortable table with `aria-sort` on headers. Below 800px (the table needs about 780px) rows become a two-column grid, text left and ticket right, with one compact Edit beside the name (Delete lives in the details dialog, which the name opens) and a "Sort by" select replacing the hidden headers. Below 640px the filters become a three-column grid with short labels ("Low 5", "Use-by 3") while `aria-label` keeps the full name, and SKU and Aisle stack so the aisle names never truncate; and `role="table"`, `row`, `rowgroup`, `columnheader` and `cell` set explicitly so screen readers keep the table. Every touch target is at least 44px; no horizontal scroll from 360px to 1600px.
- **Typefaces.** Big Shoulders' condensed gothic figures echo shelf-ticket and price-gun signage. Golos Text is a sturdy interface sans made for public-service forms. Golos has a working `tnum` feature (checked in Chromium: "1111" and "0000" measure the same width with `tabular-nums`), so figure columns align.
- **Palette.** Neutral fluorescent floor `#F0F0EE` (not cream, not tinted), price-gun black `#1E1D1F` (14.7:1), secondary `#55585C` (6.3:1), shelf-channel blue `#1D4F91` (8.1:1 under white text; as a focus ring 7.1:1 on the floor and 8.1:1 on white), UK "reduced" yellow `#FFD43B` that always carries ink text (11.8:1), use-by red `#C4122F` (6.0:1 on white). The blue is darker and greyer than the grid blue of cta-bird-count, and the ink is a neutral black, not navy.

## Do not touch

- Integer-pence storage and integer sums. Never store or add prices as floats.
- The ticket anatomy: raised pence (or "85p" under a pound), the unit price line, the rail lips level with the ticket's borders, one fixed width for row tickets, the yellow low tab, the rotated red use-by sticker hanging below the lip (never over the unit price), and the struck-through "Was" price in edit mode. It is the only decorated thing on the page and Big Shoulders appears nowhere else; do not repeat the rail on headers or section rules.
- The live preview using the same `validate()` as submit, so preview and saved record can never disagree.
- The undo bar with no timeout. A timed undo fails keyboard and screen-reader users.
- The explicit ARIA table roles and the "Sort by" select in the narrow layout, and every row being rendered (hidden, not removed) so `#row-<id>` anchors resolve.
- Focus return after every dialog, edit, save, delete and undo, and the single polite live region.
- The `runSelfTest()` cases, including the 72.5p and 247.5p rounding ties. Add to them when you change a parser.
- The undo stack and its SKU-clash refusal.

## Adapting

**Data and config.** Everything domain-specific is at the top of the script:

- `CURRENCY` and `LOCALE` drive every price, count and date format (`Intl`). `MINOR` is the suffix for sub-unit prices ("p"; use "c" for cents). The currency symbol in the price field is read from the formatter.
- `AISLES` is the choice list for the aisle field (aisle n is `AISLES[n-1]`); `PACK_UNITS` is the pack-unit list. If you add a unit, add its "per" text and scale in `unitPrice()`.
- `SOON_DAYS` sets the use-by warning window; `MAX_PENCE`, `MAX_QTY`, `MAX_REORDER`, `MAX_PACK` set the field limits.
- `SEED` holds the sample rows as `[product, sku, aisle, pence, packSize, packUnit, qty, reorderAt, perishable, useByDaysFromToday]`. Dates are relative to today so the low, soon and past flags always show. Keep at least one row in each flag state.
- `STORE_KEY` is the sessionStorage key; bump its version suffix when the record shape changes.
- To add a field: add the input with its label, hint and `err-<field>` paragraph, add it to `FIELDS` and `FIELD_NAMES`, parse it in `validate()`, show it in `rowHtml()` and the details `facts`, and add a self-test case.

**Connecting a real backend.** All mutations go through `addRecord`, `updateRecord`, `removeRecord` and `restoreRecord`, followed by `save()`, and all reads start from `load()`. Replace `load()` with a fetch of the list, and make each submit/delete/undo handler `await` a POST/PATCH/DELETE (sending integer pence) before calling the local function and `render()`. Keep `validate()` on the client for instant feedback and repeat the same rules on the server. Undo becomes a re-create (or an un-delete flag) on the server. Add pagination before the list passes a few hundred rows.

**Copy.** Replace the shop name and intro. The tally sentence, counts and totals are generated; keep the shop's own words for objects (shelf price, use-by, reorder at, stock value) rather than "records" or "items".

| Token | Role |
|---|---|
| `--floor` | Page ground, table header band: neutral fluorescent shop floor |
| `--ticket` | Shelf tickets, inputs, table body, dialogs, undo bar |
| `--ink` | Text, prices, heavy 2px rules, pressed filter fill |
| `--ink-soft` | Hints, column headers, SKU on tickets, underline of product names |
| `--rail` | Shelf rail lips under tickets, filled action buttons, focus ring, checkbox accent |
| `--rail-dark` | Hover on filled buttons |
| `--reduced` | Low-stock tab and just-changed row highlight (always with ink text) |
| `--useby` | Use-by sticker, use-by dates in the list, errors, the confirm-delete and confirm-reset buttons |
| `--useby-dark` | Hover on those confirm buttons |
| `--on-accent` | Text on rail blue and use-by red (white) |
| `--line` | 1px table and aisle-subtotal rules, ticket edge |
| `--edge` | Input and secondary-button borders (4.2:1 on white) |
| `--backdrop` | Dialog backdrop |
| `--font-price` | Big Shoulders Display: ticket prices only |
| `--font-ui` | Golos Text: everything else |
| `--t-2xs` … `--t-xl` | UI type scale (row-ticket unit price and stickers, hints, table meta, body, H3, large) |
| `--t-h2` | Section heading (Golos 600) |
| `--t-price-row`, `--t-price-detail` | Ticket price size in the table, and in the live preview and details dialog. The "Was" price is 0.4 of it |
| `--lh-body`, `--lh-table`, `--lh-price`, `--track-price` | Leading for body, table and tickets; ticket tracking |
| `--s-1` … `--s-8` | Spacing scale, 4px to 64px |
| `--r-ticket`, `--r-control` | Ticket and control radii (2px, 3px) |
| `--target` | Minimum touch-target height (44px) |
| `--target-sm` | 36px: desktop-only exception for row Edit/Delete and column-header sort buttons, where a pointer is assumed; below 800px rows use `--target` |
| `--max` | Section max width (1200px) |
| `--flash` | Duration of the yellow highlight after add, save and undo |
| `CURRENCY`, `LOCALE`, `MINOR` | Money and date formatting (JS) |
| `AISLES`, `PACK_UNITS` | Choice lists for aisle and pack unit (JS) |

Skipped on purpose: pagination, CSV import/export, printing tickets, keyboard shortcuts beyond Enter and Escape.
