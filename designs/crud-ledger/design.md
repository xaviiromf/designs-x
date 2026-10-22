---
title: Analysis pad general journal
section: crud
subject: The general journal that Hollis & Pryce, a two-partner UK accounting practice, keeps for its client Fenwick Joinery Ltd while closing the September 2026 books.
aesthetic: A pale green analysis pad on screen, with printed green ruling, blue-black ledger ink, red ink kept for differences, and the bookkeeper's single and double footing rules.
mode: light
fonts:
  - IBM Plex Sans Condensed 400, 500, 600 (Google Fonts)
  - Besley 500, 700 (Google Fonts)
js: Runs a journal-line CRUD with typed fields (integer entry no., date, chart-of-accounts choice, text, debit and credit parsed into integer pence, VAT choice, reconciled boolean), validation, a details view, edit and cancel, delete with a native confirm dialog and untimed undo, sorting, search, period and account filters, a running balance, and footing totals that stay in view and draw the double rule only when the period balances. Data lives in sessionStorage with an in-memory fallback, a reset and an empty journal action, and runSelfTest() runs at #selftest.
tags: [crud, accounting, bookkeeping, journal, table, form, double-entry, money, vat, ledger]
use_when:
  - Professionals post many typed records in a row and one derived total decides whether the work is right (debits and credits, stock in and out, timesheets against a budget).
  - The domain has a paper form or pad that users already trust, and the screen can borrow its ruling and footing.
  - Money must be exact, and you need a worked example of integer-pence parsing, half-up VAT and en-GB formatting.
avoid_when:
  - The records have no meaningful total, or the user mostly browses rather than enters. The footing would be decoration.
  - A dark, glanceable monitoring view (the pad is daytime desk work, made to print or screen-share).
  - The product needs a multi-page admin with navigation. This is one section with one table and one slip.
---

## Why it works

**The bold idea is that the double rule is the proof.** Bookkeepers foot a column with a single rule above the total and a double rule beneath it, and they draw the double rule only when the books agree. Here the period totals sit in the table foot, under their own Debit and Credit columns, and the double rule is drawn under each column separately only when total debits equal total credits, compared as integers in pence. If you post, edit or delete a line that unbalances the period, the second rule disappears. In its place, right under the totals and right-aligned to the Credit column, a red Besley sentence states the gap and who owes it: "Out of balance by 200.00. Entry 52 needs a credit of 200.00." (or "a debit of"), with a "Finish entry 52" button under it. That button opens the slip at every width, prefilled with the entry number, its date and the balancing amount on the opposite side. When the books agree again, the rules draw in from left to right (scaleX, 240ms, instant under reduced motion) and the same place reads "Balanced. 18 of 29 lines reconciled." That is the only animation, and the only red apart from form errors. An empty period proves nothing, so it shows "No lines in September 2026 yet." and no rule.

- **The sample opens mid-close.** Entry 52, a 200.00 payment on account to Morland Timber, is posted on the debit side only, as a bookkeeper would leave it before finding the bank line. The first view (and the preview) shows the bold idea at work: no second rule, the red sentence, the "Finish entry 52" button, a red bar on entry 52, and a slip already prefilled with the 200.00 credit. Choosing 1000 Bank current account and posting draws the double rule.
- **The proof stays in view.** From 720px the table foot is `position: sticky; bottom: 0` inside the journal column, so the totals and the state sentence sit at the bottom of the screen while the slip is being used at the top. The status bar is also sticky, and the footing rests on top of it (`--bar-h`, measured with a ResizeObserver). Below 720px only the state line sticks, at `--t-l`, so the footing does not fill the phone screen.

- **The pad is the visual system.** The page and table ground is analysis-pad green `--pad`. Each row's 1px bottom border is the pad's own ruling (`--rule`, 2:1, never used for text or control borders). A double vertical rule separates the Debit and Credit money columns, as on a printed pad. There are no cards, shadows or gradients. The slip is the one raised surface, set apart by its paper colour and a 1px pencil border.
- **Journal grouping, the way it is written by hand.** When sorted by date or by number, the lines of one entry group together. The entry number and date appear only on the first line, a full-width rule runs between entries and none within, debits come first, and each credit is indented 1.5em and prefixed "To ", the traditional journal narration. Sorting by account, debit or credit turns grouping off, and every line then shows its own number and date.
- **Red has two meanings only.** It means "this field is wrong" (inline errors with a 3px red bar) or "the books do not balance" (the footing sentence, "Out by 200.00" under an entry number, and a 3px red bar on that entry's rows). Credits stay in ink and the auditor's ticks are ink.
- **Totals stay honest.** The footing totals the whole selected period and ignores search and the account filter. When lines are hidden, a quiet line says so: "Showing 7 of 28 lines. Totals cover all of September 2026."
- **Money never touches float arithmetic.** `parseMoney` trims the input and strips a leading "£". Commas and spaces are accepted only as real thousands groups (`1,240.50`, `1 240.50`), so a decimal comma such as `1,50` is an error, never 150.00. It then matches digits with up to two decimals (`5.` and `.5` are fine) and builds pence from the digit strings. Three decimals are rejected with "Pence go to two places", not rounded: the only rounding is the VAT element. VAT is `Math.floor((pence * rate + 50) / 100)`, half up to the penny, so the 0.63 hinge screws line shows 0.13 VAT in its details. On blur, a valid amount is reformatted (1240.5 becomes 1,240.50).
- **One entry, one period.** A line must be dated in the same month as the rest of its entry ("Entry 70 is in September 2026. Date this line in that month, or use a new entry number."), so a balanced entry can never leave two months out of balance. Dates run from 2000 to 2099.
- **Fast entry beats ceremony.** At 1200px and up, the voucher slip sits beside the journal and is always open. After a line is posted, it keeps the entry number, date and VAT rate. If the entry is still out, the opposite amount is prefilled with the difference and a hint says so. Focus returns to Account. Below 1200px the same slip opens above the journal from "New line", "Finish entry N" or a row's view button, closes with Close or Escape, and returns focus to the button that opened it. Typed work is never dropped silently: opening another line, Close or Escape while the form has unsaved changes asks "Discard your changes?" first, with "Keep editing" as the safe choice.
- **Typography from the trade.** IBM began as a maker of tabulating machines for bookkeeping. Plex Sans Condensed fits seven columns, and its figures are tabular in the Google build: we measured the digits 0 and 1 at equal widths in Chromium, so no Fontsource fallback is needed. Every figure uses `tabular-nums lining-nums` and is right aligned. Besley, a Clarendon revival like the slab on ledger spines and commercial stationery, is used only for the heading, the slip and dialog titles, the empty state and the footing sentence.
- **Running balance without accounting theory.** When the Account filter shows one account and the sort is Date, a Balance column appears. It shows the cumulative debit minus credit in date order across all periods, with "Dr" or "Cr" suffixes and no minus signs. The account hint says what it shows. The seed opens with an August cash sale, so the bank ends September at 4,432.39 Dr, as a real bank account would.
- **Words follow the work.** Post line / posted, Save changes / saved, Delete line / deleted, Undo / restored, Reset sample data / reset. Delete dialogs state the consequence ("Entry 41 will be out of balance by 3,600.00."). The confirm button is ink-filled, red is not used, and "Keep line" has focus by default.
- **The slip is a line cut from the pad.** The Debit and Credit inputs are right-aligned with tabular figures and split by the same 3px double green rule as the table's money columns.
- **Abbreviations are spelled out once.** VAT cells read "Ex" and "O/S" with an `abbr` title, and a key line under the table says "VAT: Ex exempt, O/S outside the scope. Rec. reconciled." for touch and keyboard users.
- **Reasoned defaults.** The table is ruled and the controls are nearly square (default 3). That is a choice: the rules are the pad's green ruling and encode rows, entries and money columns, there is no dense column text, and controls keep a 3px radius. The light mode follows from daytime desk work beside printed bank statements, and from printing or screen-sharing the journal with a client.

- **No dead ends.** The file has no `<a href>` at all. Every control is a button that acts in place. The slip form and the search form both call `preventDefault`. Dialogs are native `<dialog>` with `showModal` and return focus. Delete, reset and empty all leave an untimed status bar with Undo and Dismiss, and nothing navigates or posts, so the GitHub Pages iframe never sees a 405 or a 404.

## Do not touch

- The balance test: integer pence, `dr - cr === 0`, over every line in the period whatever the search or account filter. The double rule renders only in that state, and the red sentence replaces it otherwise.
- Red (`--red`) stays reserved for imbalance and validation errors. Do not use it for credits, delete buttons or decoration.
- `--rule` is decorative ruling only. Field borders use `--pencil`, which passes the 3:1 minimum for UI components. Text never uses `--rule`.
- Money parsing and VAT rounding: no `parseFloat`, no `* 100` on a float. Keep `parseMoney`, `vatOf` and `fmt` together, and keep the self-test green.
- Journal grouping, credit indentation with "To ", and debits before credits within an entry.
- Accessibility: one polite live region (`#status`) carries every outcome, and the Undo button sits outside it. Tick toggles are `<button aria-pressed>` with a label naming the entry and account. Sortable headers are `<th aria-sort>` with a button inside. The form has `novalidate`, each field's error is linked by `aria-describedby`, and focus moves to the first invalid field. Visible focus is 2px ink, offset 2px. Phone targets are at least 44px, the Reconciled checkbox row included. Long unbroken text wraps (`overflow-wrap: anywhere`) in rows, details and the empty state, so an 80-character word never scrolls the page.
- The status bar is `position: sticky; bottom: 0` inside the journal column, never `fixed`, so the section composes with others. The sticky footing sits on top of it via `--bar-h`.
- The footing's single rule is a 1px cell background, not `border-top`: collapsed table borders do not move with a sticky `tfoot`.
- The No. column is a fixed 5rem and "Out by" wraps inside it, so the table does not shift when an entry goes in or out of balance.

## Adapting

1. **Tokens first.** Change the six colour tokens to the paper your users know (a buff cash book, a white ledger with blue ruling). Keep the roles: ground, slip, ruling at about 2:1, ink, pencil at 4.5:1 or more, and one alert colour.
2. **Chart and VAT.** The chart of accounts is the `ACCOUNTS` object (code: name), and VAT rates are the `VAT` object (key: label, short label, rate; leave out `rate` for exempt and outside-the-scope). Both selects and every label are built from them.
3. **Seed rows.** `SEED` is a list of entries: `[entry no., ISO date, [[account, description, debit pence, credit pence, vat key, reconciled 1/0], ...]]`. Every entry here balances within its own month except entry 52, which is left half-posted on purpose so the sample opens out of balance by 200.00. Remove it to open balanced. The September sample is 28 lines (18 reconciled); the whole sample is 34 lines across August and September. The footing sentence, reconciled count, totals and reset message are all computed from it, so nothing else needs editing, but `runSelfTest` asserts the 200.00 opening gap. Bump the sessionStorage `KEY` (`crud-ledger:v1`) when the shape changes.
4. **Field schema.** `validateLine` holds every field rule and message. Add a field by adding a form control with an error `<p id>`, a rule and message there, an entry in `FIELDS`, and a cell in `rowHTML` and `renderDetails`.
5. **Copy.** Swap the client name and practice in the lede and the empty-state line. Keep the verbs paired as listed above, and keep "All amounts in pounds sterling" (or your currency) stated once rather than on every figure. To change locale, swap the `Intl` formats and the date helpers.
6. **Connecting a real backend later.** All writes go through `addLine`, `updateLine`, `deleteLine` and `save()`, and the page reads once through `load()`. Replace `load()` with a fetch of the period's lines, and make the three CRUD helpers call your API (POST, PATCH, DELETE) before re-rendering. Undo becomes a re-create or restore call. Keep the money as integer pence on the wire, and keep a visible error in the status bar when a request fails.
7. **Layout.** Journal and slip sit side by side from 1200px (slip 360px wide, sticky). From 720 to 1199 it is one column with a "New line" button and a slip that opens on demand. Below 720 the table becomes a ruled list: the header turns into a "Sort by" row of the same buttons, each line is two rows (account and amount, then description and VAT under the amount), credit lines are indented as a whole, Debit and Credit merge into one amount with a Dr or Cr suffix, "Out by" sits at the right of the entry header, and the footing stacks with labels.

| Token | Role |
|---|---|
| `--pad` | Page and table ground: the green analysis pad |
| `--slip` | Voucher slip, input fill, viewed row, status bar, dialog |
| `--rule` | Printed ruling: row lines, entry separators, the double money-column rule. Decorative only |
| `--ink` | Text, figures, ticks, primary buttons, focus ring, footing rules, viewed-row bar |
| `--pencil` | Descriptions, hints, column headers, field and slip borders |
| `--red` | Imbalance (footing sentence, "Out by", entry bar) and validation errors only |
| `--f-ui` | IBM Plex Sans Condensed: all UI, table, form and figures |
| `--f-head` | Besley: heading, slip and dialog titles, empty state, footing sentence |
| `--t-xs` … `--t-xxl` | Type scale, ratio 1.25 from 16px (12.8, 16, 20, 25), plus one off-scale 15px step `--t-s` for table text and labels; `--t-xxl` is the clamped h2 |
| `--s-1` … `--s-8` | 4-based spacing: 4, 8, 12, 16, 24, 32, 48, 64 |
| `--row` | Ledger row pitch (40px) |
| `--gutter`, `--max`, `--slip-w` | Side gutter (16px, 32px from 720), container max 1440, slip width 360 |
| `--radius`, `--slip-radius` | 3px controls, 4px slip, dialog and status bar |
