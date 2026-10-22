---
title: Payroll tabs
section: crud
subject: A staff records manager for the two-person HR team at Corvo Coffee Roasters, a fictional roaster with 14 people in four departments.
aesthetic: A hanging-file drawer. Cool neutral ground, graphite ink, clear plastic folder tabs tinted by department, a white drawer sheet of ruled records, and one pressboard-green file pulled out of the drawer. Public Sans, the US Web Design System face, for the vernacular of government and HR forms.
mode: light
fonts:
  - Public Sans (Google Fonts)
js: Session-only CRUD for typed staff records with a sortable, searchable list, an open-file panel, validated create and edit, undoable delete and reset, payroll tabs that re-flow on every change, and runSelfTest() on #selftest.
tags: [crud, records, hr, people, payroll, table, form, validation, undo, filter, session-storage, admin]
use_when:
  - People keep a list of records all day and one number per group (payroll, budget, hours, stock value) matters more than any single record.
  - The records fall into a handful of groups (departments, teams, sites, clients) that people filter by, and the size of each group is worth seeing at a glance.
  - Small-business back-office tools such as staff lists, contractor rosters, volunteer registers and client accounts.
avoid_when:
  - More than about six groups, or groups whose totals differ by more than about 20 to 1. The tabs stop fitting, or the small ones collapse to their label width and stop encoding the share.
  - There is no meaningful sum per group. Then the tabs are just a filter bar, so use a plain one.
  - Thousands of rows, server paging or multi-user editing. This keeps everything in one array in the browser tab.
---

## Why it works

**The bold idea: the payroll tabs.** Along the top edge of the records drawer sits a row of clear plastic hanging-folder tabs, one per department. Each tab's width is that department's share of annual payroll for people on staff (`flex-grow` is the department's payroll in dollars, on a zero basis). Each tab prints its name, its monthly payroll as the largest figure, and its headcount on staff, so the width and the biggest number say the same thing. The tabs are the summary chart and the department filter in one control, so the page needs no KPI cards and no sidebar. Every create, edit, delete, undo and reset changes the numbers, so the tabs re-flow over 300ms (instantly under reduced motion) and every action visibly changes the shape of the company. "All departments" stands apart: untinted, with one line, and a gap in the rail after it.

- **The material is a filing drawer, not a ledger.** Each tab is drawn as the real object: a plastic body clipped to a tab silhouette with angled sides (`clip-path` on two pseudo-element layers, so the ink outline follows the angle and the focus ring is never clipped), tinted with the department colour, holding a flush white label insert. The pressed tab is pulled 6px taller, turns white with a 4px department band, and breaks through the 2px ink rail into the white sheet below, so it visibly owns the records under it, as in a real tab control. Search, Add person, the list and the footer all sit on that sheet, so they act on the drawer they sit in. The open file beside it is the only dark surface on the page: pressboard folder green with white text and white inputs. Its small tab repeats the department band, and with no file open the slot is a dashed outline of the same folder, the place a file will land.
- **Below 1280px the tabs stack down the drawer.** Each department becomes a full-width tab row (same angled silhouette and tint) with name, monthly payroll and headcount on one line, and a 6px bar in the department colour along its bottom edge whose length is the department's share of the company total (`--rel`). All departments has no bar; it is the 100%. Labels never wrap, small shares are never clamped, and at 390px the chart takes about 230px so the first record is above the fold of a phone.
- **Every structural device encodes data.** Tab width and bar length are payroll share. The tint and band are the department, and the department name is always printed beside them, so colour is never the only cue. The white pressed tab is the filter in use. A 4px folder-green edge on a row means that person's file is open. People who have left are in muted text, because they are excluded from the tabs and totals. A red left rule on a field means it is invalid. The new-row edge flashes in the department colour for 1.2s once (on the row header cell in the table, on the whole row in the phone list), and under reduced motion it becomes a static outline.
- **Numbers are typed values, never strings.** Salary is stored as integer cents. `parseMoney` strips currency symbols and spaces, accepts commas only as thousands separators in groups of three, then one run of digits and an optional dot with digits, and rounds half-up on the string (`1.005` becomes `101` cents with no float drift). European input such as `52.400,50` or `1,5` is rejected with a message that says what format is expected, never silently misread. Hours must match `/^\d+$/` and fall from 1 to 60, so 37.5 is rejected. Totals, averages, monthly payroll and the hourly equivalent use exact integer half-up division (`rdiv`). Sorting uses the typed value (cents, ISO date, on staff first), not the display string. All figures are Public Sans tabular lining numerals, right-aligned in columns.
- **The copy is computed from what is shown.** The lede ("12 people on staff in four departments"), the tab figures and the footer sentence are generated from the data. The footer follows the filter: with All departments it reads "12 on staff, 2 left. Annual payroll $530,957.35. Average salary $44,246.45."; with a tab pressed it leads with the department ("Cafés: 5 on staff, 1 left. Annual payroll $176,501.15. …"), and with a search it names the query, so the sentence always describes the rows above it.
- **One family, used like a form.** Public Sans was drawn for the US Web Design System, the vernacular of benefit forms and HR paperwork. Weight does the work of a second face: 700 for the H2 and the person's name in the file, 600 for tab names, tab totals, labels and headers.
- **The verbs match through the flow.** Add person, Add to records, "Added Ana Ruiz to Cafés." Edit record, Save changes, "Saved changes to Ana Ruiz." Delete record, "Deleted Ana Ruiz.", Undo delete, "Restored Ana Ruiz." Reset sample data, "Sample data restored.", Undo reset. One boolean has one name: "On staff" or "Left" in the list, the file, the checkbox, the tabs, the caption and the footer.
- **Safe by default and fast for experts.** The delete confirm is inline in the file, so the record stays visible, and focus lands on Keep record. The toast is not timed (WCAG 2.2.1). It stays until it is dismissed or the next change replaces it, and one snapshot mechanism undoes both delete and reset. It lives at the bottom of the sheet, so it never covers the open file or its form, and it hides while the phone file sheet is open. Leaving a form with unsaved changes (clicking another name, Add person or Reset) asks "Discard your changes to Ana Ruiz?" with Keep editing focused. "/" jumps to search. Escape keeps editing, then cancels an edit, then closes the confirm, then closes the file, in that order, and focus returns to the control that opened it.
- **Validation tells people how to fix it.** Validation runs on submit, then per field on blur. Each invalid field gets `aria-invalid` (on the radios themselves for Contract, with the message on the fieldset), a linked message (`aria-describedby`) and a red rule. Too-long text says so ("Use 80 characters or fewer"), and the `maxlength` attributes match the validators. A summary at the top ("3 fields need attention") takes focus, with the folder's white focus ring, and links to each field with in-page anchors.
- **Stored data is checked, not trusted.** On load every stored row must pass the same validators as the form, with unique ids below the sequence. Anything else (an old schema, tampering, a bad import) falls back to the sample data instead of crashing.
- **The 390 layout stays a drawer.** The tabs keep their silhouette, tint and share bar. The sheet runs edge to edge so the list text lines up with the 16px gutter, and the 4px open-file edge sits in the gutter. Rows are ruled, not cards, on a fixed three-column grid (name and salary; role, department chip and status), so chips line up down the list. The column headers become a "Sort by" select. Below 1024px the file is a full-height sheet with Back to list and an 8px department band on top, exposed as a modal dialog (`role="dialog"`, `aria-modal`) with the heading, lede and the whole drawer `inert` behind it. Close file only appears at 1024px and up, in the file head.
- **Long content wraps, never scrolls.** The table uses `table-layout: fixed` with columns sized to their longest value, so filtering changes rows and never shakes the grid. Names, roles, emails and messages break with `overflow-wrap: anywhere`, so an 80-character name or a 60-character role causes no horizontal scroll from 360px to 1600px.
- **The defaults it avoids (reasoned).** No cream ground and no serif: the ground is cool #F4F5F2 and the ink is graphite. There are no box-shadows anywhere. Tab-top radius describes a tab; controls get a 3px radius. Rows are 48px, ruled because a staff list is a ruled register, not because of a broadsheet reflex, and the type is never dense. There are no all-caps codes, no monospace data labels and no KPI cards; the tabs are drawn as folder tabs, not as cards with a coloured stripe.
- **No dead ends.** The only `href`s are the error-summary anchors to field ids that exist, and `mailto:` links in the file (`target="_blank" rel="noopener"`). The form has no `action`, and its submit handler calls `preventDefault`. Every button leads to an in-page state with a way back (Close file, Back to list, Cancel, Keep record, Keep editing, Dismiss).

## Do not touch

- **Tab width = payroll share for people on staff.** Keep `flex: var(--grow) 1 0` with `--grow` set from the department's on-staff cents, and `--rel` as the share of the company total (never of the largest department) for the stacked bars. Keep people who have left out of both. Do not give the tabs equal widths, sort them by size, or turn them into a separate chart. The filter and the chart must stay one control. `min-width: max-content` keeps labels readable in the horizontal row. If a small department is clamped by it, the share is understated, which is why the brief excludes extreme ratios.
- **Money in integer cents** and `parseMoney`'s string rounding and comma-group rule. Never parse money with `parseFloat` or round with `toFixed`. Hours stay integers.
- **One dark surface.** Only the open file (`--folder`) is dark. Do not tint the page, the rows or the tabs with it.
- **Department colour is never the only cue.** Every tint, band and bar sits next to the printed department name. Each department colour is at least 3:1 against its own tint (and its hover tint) and at least 4.9:1 on white.
- **The untimed toast inside the sheet** and **focus on Keep record**. Do not add an auto-hide timer, move the toast over the file, or move the default focus to the destructive button.
- **Accessibility wiring:** sort buttons sit inside `<th>` with `aria-sort`. Table, row and cell roles are explicit, so the phone list (where the table elements are `display: block` and `grid`) keeps its table semantics. The tabs are buttons with `aria-pressed` in a group labelled by the caption. There is one polite live region for adds, saves, deletes, restores, filter counts and sorts, and every announcement cancels a pending search count. Name buttons are real `<button>`s. Focus is a 3px ink outline, white on the dark file (including the error summary) and on the toast.
- **The breakpoints** 1400 (Role and Hours columns fold away; role goes under the name), 1280 (tabs stack into rows with share bars; file panel 320px), 1100 (Contract column), 1024 (file becomes a sheet; shared with the script's `matchMedia`) and 760 (table becomes a list). Change the CSS and `SHEET` together.
- **runSelfTest()** must keep passing. Open the file with `#selftest` and look for "SELFTEST PASS" in the console.

## Adapting

Everything specific to Corvo lives at the top of the script:

- `CONFIG`: locale, currency (one ISO code, used by every `Intl.NumberFormat`), company name for the lede, and the sessionStorage key. Change the key whenever the record shape changes, so old sessions do not load.
- `DEPTS`: the groups (`id`, `name`). Add a matching `--dept-<id>` token on `:root` for each, and check it is at least 3:1 on its own tint. Four groups fit the horizontal tab row at 1280; five or six need about 1440, or move the stacking breakpoint up (stacked tabs take any number).
- `CONTRACTS`: the choice values for the radio group.
- `SEED`: sample rows as `[name, role, email, dept, contract, hours, salaryCents, start, active]`. Use realistic names and amounts with some cents, and include at least one person who has left so "Left" and the exclusion from totals are visible. The self-test asserts the seed is 14 rows with 12 on staff, so update that line if you change the seed.
- `FIELDS`: one validator per field, returning `{ ok: value }` or `{ err: message }`, shared by create, edit, the stored-row check (`rowOk`) and the self-test. To add a field, add it here, to `FIELD_LABELS`, to `ERR_KEYS`, to the form markup (input plus `<p class="err" id="f-<key>-err">`), to `readForm`, to `openForm`'s prefill, and to `fillFile` (and to the table if it belongs in the list).

**Another domain.** The tab metric is whatever sums per group: budget per project, hours per team, stock value per aisle. Change `totals()` and the tab figures in `render()`. Keep the metric additive and non-negative.

**A real backend.** The store is five functions: `load`, `save`, `createRecord`, `updateRecord`, `deleteRecord` (plus `restoreSnapshot` for undo). Replace their bodies with `fetch` calls (GET the list, then POST, PATCH and DELETE by `id`), keep the integer-cents contract on the wire, and re-render after each response. Undo then becomes a re-POST of the deleted record, or a soft delete with a restore endpoint. On GitHub Pages there is no server, which is why this version stays in sessionStorage.

| Token | Role |
|---|---|
| `--paper` | Page ground, cool neutral |
| `--insert` | The white drawer sheet, tab inserts, the pressed tab, chips, inputs, error slips |
| `--ink`, `--ink-hover` | Graphite text, primary button, drawer rail and tab outlines; its hover |
| `--focus` | Focus ring colour (ink; set to `--insert` on the file and the toast) |
| `--muted` | Secondary text and the rows of people who have left |
| `--rule` | Row rules, plain grey |
| `--control-edge` | Input and chip outlines and the empty file slot (3.3:1 on paper, 3.6:1 on white) |
| `--plastic`, `--plastic-hover` | Clear tab plastic (All departments uses it untinted); its hover |
| `--tint` | How much department colour tints the tab plastic (20%, 26% on hover) |
| `--folder`, `--folder-text`, `--folder-muted` | The pulled-out file, the one dark surface |
| `--folder-hover`, `--folder-paper-hover`, `--folder-rule` | Button hovers and dividers on the file |
| `--error`, `--error-hover` | Error text and rules, delete button only; its hover |
| `--dept-roastery`, `--dept-cafes`, `--dept-wholesale`, `--dept-office`, `--dept-all` | Department tints, bands, share bars, chips, the file tab and the new-row flash (`--dept-all` is ink) |
| `--font-text` | Public Sans with system fallbacks |
| `--step--1` … `--step-4`, `--step-table` | Type scale (1.25 ratio; `--step-table` is 15px for table body and labels) |
| `--lh-body`, `--lh-tight` | Body leading (1.5) and heading leading (1.05) |
| `--space-1` … `--space-8` | Spacing scale, 4 to 64px |
| `--radius-tab`, `--radius-control` | Tab tops (folder and drawer tabs); 3px on controls, chips, the toast and the slot |
| `--slant` | The angled sides of a plastic tab (10px, 6px on stacked tabs) |
| `--row-h` | Minimum row height (48px) |
| `--max`, `--gutter`, `--sheet-pad`, `--panel-w` | Section width, side gutter (16px below 760), sheet padding, file panel width (340 to 400px, 320px below 1280) |
| `--reflow` | Tab re-flow duration (0 under reduced motion) |
