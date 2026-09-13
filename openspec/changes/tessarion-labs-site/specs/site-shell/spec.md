## ADDED Requirements

### Requirement: Single-page document
The site SHALL be one HTML document served at the root path, with every section reachable from that document. There SHALL be no client-side router and no second page.

#### Scenario: Every section is present on first load
- **WHEN** a visitor loads the root URL
- **THEN** the hero, about, people, crew, products and contact sections are all present in the delivered HTML, with no section rendered by a later fetch

#### Scenario: JavaScript is unavailable
- **WHEN** a visitor loads the page with JavaScript disabled
- **THEN** all content and all links are readable and operable, and only the theme control is absent

### Requirement: Header
The header SHALL carry the Tessarion Labs horizontal lockup linking to the top of the page, in-page navigation to the about, people, products and contact sections, and the theme control. The lockup SHALL appear once in the header and once in the footer, and never twice in one viewport.

#### Scenario: Lockup renders in the current theme
- **WHEN** the resolved theme is dark
- **THEN** the header renders `lockup-horizontal-inverted.svg`; in light it renders `lockup-horizontal.svg`

#### Scenario: Navigation moves focus, not just scroll
- **WHEN** a keyboard user activates a navigation link
- **THEN** the browser scrolls to the target section and focus lands inside that section, so the next Tab continues from there

#### Scenario: Skip link
- **WHEN** a keyboard user presses Tab on a freshly loaded page
- **THEN** the first focusable element is a visible "Skip to content" link that moves focus to the main landmark

### Requirement: Theme control
The site SHALL offer a three-state theme control — system, light, dark. The choice SHALL persist in `localStorage` and SHALL be applied before first paint so no flash of the wrong theme occurs.

#### Scenario: Default is system
- **WHEN** a visitor with no stored preference loads the page
- **THEN** the theme follows `prefers-color-scheme` and the control reports "system"

#### Scenario: Explicit choice wins and persists
- **WHEN** a visitor selects light or dark
- **THEN** `data-theme` is set on the root element, the choice is written to `localStorage`, and it is restored on the next visit regardless of the OS setting

#### Scenario: No flash on load
- **WHEN** a visitor with a stored dark preference loads the page on a light OS
- **THEN** the first painted frame is already dark, because the stored value is applied by a blocking inline script in the document head

#### Scenario: System changes while open
- **WHEN** the OS theme changes and the control is set to "system"
- **THEN** the page follows the change without a reload

### Requirement: Layout and type scale
Layout SHALL use a single content column capped so body copy never exceeds 66 characters, with section rhythm built from the `--tl-space-*` scale. Type SHALL follow the brand type scale: Inter Tight for display and headings down to H3, Inter for body, JetBrains Mono for eyebrows, captions and data.

#### Scenario: Measure is capped
- **WHEN** the viewport is wider than the content column
- **THEN** paragraphs stop at 66ch and do not stretch to the viewport width

#### Scenario: Fonts fail to load
- **WHEN** the web fonts are unavailable
- **THEN** the page falls back to the system stack declared in the token file and remains legible, with no invisible text during loading

### Requirement: Document metadata
The document SHALL declare a title, a description, canonical URL, Open Graph and Twitter card tags, `lang="en"`, a theme-color for light and dark, and the brand favicon.

#### Scenario: Shared link renders a card
- **WHEN** the URL is pasted into a chat client that reads Open Graph tags
- **THEN** the preview shows the name, the one-line description and a 1200x630 share image, and the description does not describe a company

### Requirement: Landmarks
The page SHALL use one `<header>`, one `<main>`, one `<footer>` and a `<nav>`, and each content section SHALL be a `<section>` with an accessible name from its own heading.

#### Scenario: Screen reader lists sections
- **WHEN** a screen reader user lists landmarks and headings
- **THEN** every section is announced by its own heading text, and heading levels descend without skipping
