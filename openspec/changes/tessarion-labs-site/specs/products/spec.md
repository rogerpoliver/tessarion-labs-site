## ADDED Requirements

### Requirement: Product cards
The site SHALL carry one card for Taimu and one for Mascada. Each card SHALL show the product mark, the product name, a one-line description, prose explaining why the product exists, the stack it is built on, its current state, and the endorsement line.

### Requirement: The prose sells the idea, the badges carry the facts
A product's paragraphs SHALL explain the problem the product exists for and what it is like to use, and SHALL NOT be a feature list. The exact facts — the stack and the current state — SHALL live in the badges, where a reader who wants them can find them without the prose becoming a specification.

#### Scenario: The first line is the idea, not the category
- **WHEN** a product's lead line is read
- **THEN** it states what the product gives the reader — `The hours you actually worked`, `Where the money actually went` — rather than naming a software category

#### Scenario: The problem comes before the mechanism
- **WHEN** a product's first paragraph is read
- **THEN** it opens on the reader's situation and only then says what the product does about it

#### Scenario: Facts are not duplicated in prose
- **WHEN** the prose and the badges are compared
- **THEN** the stack and the release state appear in the badges and are not restated as a sentence

#### Scenario: Taimu card
- **WHEN** the Taimu card is rendered
- **THEN** it says that billing by the hour means the hours have to be right and that remembering them is the part that fails, that Taimu keeps the record from the menu bar, and that nothing leaves the machine — the file is JSON on the reader's own disk and will still open in ten years

#### Scenario: Mascada card
- **WHEN** the Mascada card is rendered
- **THEN** it says that someone opens a finance app already worried and that the answer to that is precision rather than encouragement, that Mascada shows a negative balance as a negative balance, and that an agent can read and write the same ledger through a Claude Code skill

#### Scenario: State is honest
- **WHEN** a product is not publicly available
- **THEN** its card says so in plain words rather than offering a download link that does not exist

### Requirement: Product accent
Each product card SHALL carry its own accent hue — Taimu cyan `#00A6C4`, Mascada green `#0E9464` — scoped to that card, applied only to the product's own mark and accent affordances, and never to body text.

#### Scenario: Accent is scoped
- **WHEN** the products section is rendered
- **THEN** each product's accent is declared on that card's own element, does not leak to the rest of the page, and does not replace the page's Kiln element

#### Scenario: Accent is never text
- **WHEN** a product accent is used
- **THEN** it appears as a fill or a rule, and any accent-coloured text uses that product's 700 text step — Taimu `#0A5F75`, Mascada `#08603F`

### Requirement: Endorsement
Each product card SHALL carry the string `A Tessarion Labs product`, exactly once, verbatim. The product mark and the parent mark SHALL NOT be locked side by side at the same size.

#### Scenario: Endorsement string is exact
- **WHEN** the endorsement is rendered
- **THEN** the string is `A Tessarion Labs product`, and never `Tessarion Taimu` or `Tessarion Labs Mascada`
