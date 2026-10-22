---
title: Hire book
section: crud
subject: A general records manager where the person first defines their own columns and types, then logs records against them, shown with the hire book of Hartwell Tool Hire, a fictional tool-hire counter, and meant for any small business (clinics, workshops, schools, rentals).
aesthetic: Green-bar continuous stationery. The form is printed in one deep green, the entries are written through blue carbon, rows run in pale green bands of three, and the totals sit under a single rule closed by a double rule. Schibsted Grotesk for the printed form, Courier Prime for what a person typed.
mode: light
fonts:
  - Schibsted Grotesk 400, 600 and 700 (Google Fonts), the printed form (heading, labels, buttons, column names, spec keys, messages)
  - Courier Prime 400 and 700 (Google Fonts), typed values only (table cells, text typed into inputs, the totals line)
js: Builds the form, table, totals and phone list from an editable column schema; validates and parses typed values (text, whole number, decimal, date, yes or no, choice), converts values when a column changes type, keeps records and a 10-step undo stack in sessionStorage with an in-memory fallback, and runs an assert self-test when the URL hash is selftest.
tags: [crud, records, schema-editor, table, form, validation, undo, session-storage, green-bar, ledger, tool-hire, dialog]
use_when:
  - Small businesses whose records do not fit a fixed form (a hire counter, a stockroom, a staff register), and the person needs to add, rename or retype columns themselves (a clinic's appointments, a school's loan register, a rental fleet, a workshop job book).
  - A records tool that should feel like the counter's own paperwork rather than an admin template.
  - Up to a few hundred records and about 4 to 10 columns.
avoid_when:
  - Fixed-schema products, where a hand-built form with domain-specific layout and validation will serve better.
  - Datasets of thousands of rows. There is no pagination or virtualisation, and undo snapshots copy the whole state.
  - Multi-user editing, relations between record types, or file attachments.
---

## Why it works

**The bold idea: the table header is the schema editor.** Above the column names runs a spec line of solid carbon-blue key caps, one per column, each with a glyph in Courier Prime over its type in plain words ("Aa / Text", "123 / Whole number", "1.00 / Decimal, 2 places", "31 / Date", "✓ / Yes or no", "≡ / Choice of 3"). Keys sit on their column's edge, right aligned over number columns. Pressing one opens that column's sheet to rename it, change its type, set places or options, mark it required or totalled, move it, or remove it. The last header cell is "Add column", the same key shape in a dashed carbon outline, and the new column appears at the right edge. You define the record by editing the header you are reading, and the form, the totals line, the search, the sort and the phone layout all rebuild from that header. That is what makes one sample convince a clinic or a school on sight, and the lede says so in one sentence: there is no separate settings screen to imagine.

- **The material is continuous stationery.** Records people work on all day were printed on green-bar paper: pale paper (`--paper`), a pale green band (`--bar`) on rows 1 to 3 of every 6 so the eye can run across a wide row, and the form printed in one deep green (`--print`). Every typed value is carbon blue (`--carbon`), so the header keys are the only blue on the printed part of the page and read as something you write on. Every row is one line of a fixed height (`--row`), so the bands stay even: text cells and the record name truncate at `--clip` with an ellipsis, and the full value is in a `title` and in the record sheet. There are no cards and no shadows.
- **Two voices.** Schibsted Grotesk prints the form and asks; Courier Prime answers with what a person typed, in cells and inside inputs, so typing looks like filling the form. Labels are never monospace, which keeps this from being the "mono for small data labels" default. Monospace with fixed places also lines decimals up on the point in right-aligned columns at no cost.
- **Rules mean something.** The 2px green rule under the column names separates what a column is from what is in it. A 1px green rule sits above the totals and a double rule closes them, the bookkeeper's footing. A 1px green rule down the left of the last column marks the right edge of the form, which stays put (sticky) while a wide schema scrolls under it, so "Add column" is visible at every width. There is nothing else.
- **The totals line is the report.** Under the rows it shows, per column: the sum (whole numbers and decimals with Total on), "earliest 23 Oct 2026" for dates, "10 of 14 yes" for yes or no, and choice counts in option order, one per line like a printed sub-total. It covers the rows shown, so a search becomes a quick report. There are no KPI cards. The record count and a quiet "Reset sample data" sit under the double rule.
- **Typed values, typed parsing.** Whole numbers accept a sign and comma grouping only in valid groups of three ("1,042" yes, "1,04" and "12.5" no). Decimals round half away from zero with exponent shifting, so "1.005" at 2 places is 1.01, and a live output says "Saved as 18.56 (rounded to 2 places)". Values whose shifted form passes `Number.MAX_SAFE_INTEGER` are rejected as too large instead of silently losing cents. Totals are summed as scaled integers and divided once, so 0.1 + 0.2 shows 0.30. Dates are ISO strings shown with `en-GB`, day `numeric` and `timeZone: 'UTC'` ("2 Nov 2026", "24 Oct 2026"), so they never shift a day. Sorting is type-aware, and blanks always sort last.
- **Error copy is generated from the column**, so it stays right after a rename: "Enter the tool.", "Asset no needs a whole number, like 1042.", "Day rate ($) needs a number, like 18.50.", "Asset no is too large.", "Pick a condition.", "Due back needs a full date.", "Keep Tool under 120 characters.". Each error sits under its field (aria-describedby, aria-invalid, a 2px strike edge), focus moves to the first one, and the form says "2 fields need fixing." A flagged field clears or updates its error as soon as it is corrected, and the count follows.
- **Type changes are explicit and undoable.** Before saving, the column sheet says how many values will be cleared ("13 values in Hirer can't become whole numbers and will be cleared."). Conversion rules: anything to Text gives its plain text (dates as ISO, yes or no as "Yes"/"No", a choice as its label); Text to Whole number or Decimal parses with the same grouping rules; Decimal to Whole number keeps whole values only; fewer decimal places round half away from zero; to Date accepts ISO only; to Yes or no accepts yes, no, true, false, 1 and 0 (any case); to Choice keeps values matching an option. Switching Text to Choice prefills the options with the column's distinct values when there are 12 or fewer, and otherwise warns that the values will be cleared.
- **Records open, they do not carry buttons.** Each row's name opens the record sheet, which holds Edit record, Delete record and Close. There is no Edit/Delete column, so the right edge of the table is not a stack of red links. Delete asks for confirmation with focus on Keep record.
- **Undo is persistent and untimed.** Every add, edit, delete, column save, column removal and reset pushes a snapshot onto a 10-step stack, saved with the records for the tab's session. "Undo last change" appears in the toolbar while the stack has anything on it, beside the latest outcome ("Deleted Makita 18V hammer drill."), which stays until the next action replaces it. Ctrl/Cmd+Z works when focus is not in a text field or dialog. The toast sits in the toolbar row and takes no space when empty.
- **One motion that answers a person.** When a column is added or its type or places change, a carbon-blue fill wipes down its cells once (600ms, staggered 30ms per row). Under reduced motion the column gets a static 2px carbon outline for 2s instead. A saved or restored row keeps a faint carbon wash for 2s. Nothing else moves.
- **Phones keep the idea in view.** Below 700px the same `<table>` becomes banded records (name, then a two-up grid of label over value from `data-label`), the totals move to a "Totals for 14 shown" box under the search closed by the same double rule, and the spec keys become an always-visible, horizontally scrolling "Columns" strip directly above the records, rendered by the same `specKey()`.
- **Circular flow.** There are no links at all. Every control is a button, an input or a native dialog. All three forms (record, column, delete confirm) handle submit in JS with preventDefault and end in a closed dialog, an outcome message and focus on a defined successor. The empty-state button opens New record.

Contrast, measured with the WCAG formula:

| Pair | Ratio |
|---|---|
| `--print` #1F5A3A on `--paper` #FAFBF6 | 7.82:1 |
| `--print` on `--bar` #DDEFD9 | 6.75:1 |
| `--carbon` #2F3F9E on `--paper` (and `--paper` on `--carbon`, the keys) | 8.68:1 |
| `--carbon` on `--bar` | 7.49:1 |
| `--hint` #4A524C on `--paper` | 7.76:1 |
| `--hint` on `--bar` | 6.69:1 |
| `--strike` #B3261E on `--paper` | 6.29:1 |
| `--strike` on `--bar` | 5.42:1 |
| `--print` or `--carbon` on `--field` #FFFFFF | 8.13:1, 9.03:1 |
| White on `--print` (primary button), white on `--strike` | 8.13:1, 6.54:1 |
| `--carbon`, `--print`, `--hint` on `--wash` #E2E4EB (saved row) | 7.11:1, 6.40:1, 6.35:1 |
| `--carbon` or `--print` on `--wash-strong` #C1C6DD (sweep start, 600ms) | 5.33:1, 4.80:1 |

## Do not touch

- **The schema lives in the header.** Keep the carbon key caps above the column names and "Add column" as the last header cell. Do not move schema editing into a sidebar or a settings page. The phone "Columns" strip is rendered by the same `specKey()` function and stays visible.
- **Everything renders from `state.fields`.** The form, table, totals, search, sort select and phone layout must keep reading the schema. Never hardcode a sample column in UI code or in messages.
- **The first column names the record.** It is the row's open button, the dialog title, the outcome text and the phone card heading. Do not add per-row Edit/Delete buttons back.
- **The parsers and the totals.** Keep the grouping regexes, exponent-shift rounding with its safe-integer limit, scaled-integer sums and UTC date formatting. Never use `parseFloat` or `toFixed` to parse or round input (`toFixed` only prints a Number that is already rounded).
- **Two voices, two inks.** Courier Prime and `--carbon` are only for typed values and the keys you press to write the schema. Labels, buttons and column names stay in Schibsted Grotesk and `--print`.
- **Even bands.** Bands of three need one row height: keep `white-space: nowrap`, `--row` and the `--clip` truncation on desktop rows.
- **The untimed outcome message, the persistent undo button and focus on Keep record** in the delete confirm. Do not add an auto-hide timer or focus the destructive button.
- **The table region** (`role="region"`, labelled, `tabindex="0"`, `overflow-x: auto`) and the sticky last column, so a wide schema scrolls inside it, "Add column" stays visible and the page never scrolls sideways. Long unbroken values wrap (`overflow-wrap: anywhere`) on phones, in the record sheet and in the outcome message.
- **The 700px breakpoint**, below which rows become banded records with `td::before { content: attr(data-label) }`, the header and footer are hidden, and the totals box, Columns strip and Sort select appear.
- **runSelfTest()** must keep passing. Open the file with `#selftest` appended to the URL and look for "SELFTEST PASS" in the console.
- **Hit areas.** Spec keys, column-name sort buttons and text buttons are 36px (32px for text buttons) on fine pointers and 44px under `pointer: coarse`, as are table rows.

## Adapting

Everything specific to Hartwell Tool Hire is at the top of the script:

- `SEED_FIELDS`: the starting schema. Each field is `{ id, name, type, required }` where type is `text`, `int`, `dec`, `date`, `bool` or `choice`; decimals add `places` (0 to 4), choices add `options` (2 to 12), and whole numbers and decimals add `total: true` to appear in the totals line. The first field names the record.
- `SEED_ROWS`: sample rows as arrays in field order. Use stored types: strings, integer Numbers, decimals already rounded to their places, ISO `YYYY-MM-DD` dates, `true`/`false`, and option labels. Use `null` for blanks and keep at least one row with blanks so empty cells are visible. Include awkward decimals.
- `STORE_KEY`: change it whenever the seed or stored shape changes, so old sessions do not load. `MAX_TEXT` caps text values.
- `TYPES`: the plain type names, glyphs and one-line hints shown in the spec keys and the column sheet.
- Copy: the H2, lede, "Search hires", the region label "Hire records" and the empty-state sentence are in the HTML and `render()`. A clinic would say "Appointments: day book", "Search appointments", "No appointments logged yet."

Two ready-made schemas for other desks (add matching `SEED_ROWS`):

```js
// A stockroom count
const SEED_FIELDS = [
  { id: 'f1', name: 'Item', type: 'text', required: true },
  { id: 'f2', name: 'SKU', type: 'int', required: true },
  { id: 'f3', name: 'Unit cost ($)', type: 'dec', places: 2, required: true, total: true },
  { id: 'f4', name: 'Best before', type: 'date', required: false },
  { id: 'f5', name: 'On shelf', type: 'bool', required: false },
  { id: 'f6', name: 'Aisle', type: 'choice', options: ['Chilled', 'Dry goods', 'Frozen', 'Produce'], required: true },
];
// A staff register
const SEED_FIELDS = [
  { id: 'f1', name: 'Name', type: 'text', required: true },
  { id: 'f2', name: 'Staff no', type: 'int', required: true },
  { id: 'f3', name: 'Start date', type: 'date', required: true },
  { id: 'f4', name: 'Hours a week', type: 'dec', places: 1, required: true, total: true },
  { id: 'f5', name: 'Right to work checked', type: 'bool', required: false },
  { id: 'f6', name: 'Team', type: 'choice', options: ['Front desk', 'Workshop', 'Deliveries', 'Office'], required: true },
];
```

The self-test uses the seed's field ids `f1` to `f7` and their types. If you change the seed, update the record values in `runSelfTest()` to match.

**A real backend.** The book operations are pure functions on `{ state, undo }`: `addRecord`, `updateRecord`, `deleteRecord`, `saveColumn`, `removeColumn`, `resetBook` and `undoBook`, with `loadState`/`saveState` as the only storage calls. Keep the parsers and conversion on the client for instant validation. Then send each operation to the server (POST, PATCH and DELETE records by `id`; PUT the schema, or PATCH one field with its conversion), re-render from the response, and replace the snapshot undo with per-operation inverses or soft deletes with a restore endpoint. Type changes should run the same `convertValue` rules server-side in one transaction. On GitHub Pages there is no server, which is why this version stays in sessionStorage.

| Token | Role |
|---|---|
| `--paper` | Page and dialog ground |
| `--bar` | The green band on rows 1 to 3 of every 6, and record-sheet row rules |
| `--print` | The printed form: heading, labels, column names, rules, primary button |
| `--carbon` | Typed values, input text, spec keys, focus ring, column sweep |
| `--hint` | Hints, counts, "Not filled in", disabled controls |
| `--strike` | Errors and destructive actions only |
| `--field` | White inputs and button hover |
| `--wash`, `--wash-strong` | Saved-row highlight; start of the column sweep |
| `--veil` | Dialog backdrop |
| `--font-form`, `--font-typed` | Schibsted Grotesk (printed) and Courier Prime (typed), with fallbacks |
| `--fs-xs` … `--fs-xxl` | Major-third type scale on a 16px base; the H2 uses a clamp |
| `--lh-tight`, `--lh-body`, `--lh-typed` | Leading for the H2, the form and typed values |
| `--s1` … `--s8` | 4px-based spacing scale |
| `--gutter`, `--measure`, `--hit` | Side padding (48, 24, 16px by width), lede measure, 44px touch target |
| `--row`, `--clip` | One printed line (36px, 44px on touch) and the text truncation width (22ch, 30ch from 1280px) |
| `--band-rows` | Documents the band of 3; the selectors use `6n+1` to `6n+3` |
| `--r-control`, `--r-sheet` | 3px for inputs and buttons, 6px for dialogs; the table has none |
| `--rule` | The 2px rule under the column names |
| `--focus` | 3px carbon outline, offset 2px |
| `--dur-sweep` | Length of the column sweep |
