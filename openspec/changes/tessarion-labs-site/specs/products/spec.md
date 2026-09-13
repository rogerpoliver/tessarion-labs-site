## ADDED Requirements

### Requirement: Product cards
The site SHALL carry one card for Taimu and one for Mascada. Each card SHALL show the product mark, the product name, a one-line description, the stack it is built on, its current state, and the endorsement line.

#### Scenario: Taimu card
- **WHEN** the Taimu card is rendered
- **THEN** it describes Taimu as time tracking for independent contractors, running as a macOS menu-bar app, storing data as local JSON with no server and no third-party account, built on Tauri, React and Rust

#### Scenario: Mascada card
- **WHEN** the Mascada card is rendered
- **THEN** it describes Mascada as personal finance, built as a Rust API with a TypeScript web client and an agent-facing Claude Code skill

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
