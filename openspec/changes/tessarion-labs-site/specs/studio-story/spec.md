## ADDED Requirements

### Requirement: Hero
The hero SHALL state what Tessarion Labs is in one sentence, followed by at most two supporting sentences, and SHALL offer exactly one primary action. The primary action SHALL be the only Kiln fill in the viewport.

#### Scenario: Positioning is first
- **WHEN** the page loads
- **THEN** the first heading states what the work is, and no marketing preamble precedes it

#### Scenario: The lead says what this is not
- **WHEN** the hero lead is read
- **THEN** it states that Tessarion Labs is not a company, and names it as what two people call the software they build together

#### Scenario: One primary action
- **WHEN** the hero is rendered
- **THEN** exactly one element carries the Kiln fill, and any secondary action is the outlined variant

### Requirement: Tessarion Labs is a name, not a company
The site SHALL describe Tessarion Labs as a name two people put on their own work, and SHALL NOT describe it as a company, an agency, a studio selling engagements, or anything with staff, an office or a service to sell. Copy SHALL NOT imply capacity, availability or a commercial relationship that does not exist.

#### Scenario: No commercial claim
- **WHEN** the studio section is read end to end
- **THEN** it states there is no office, no payroll and nothing to sell, and it makes no offer of work for hire

#### Scenario: The second person is not a prospect
- **WHEN** copy addresses the reader
- **THEN** it addresses someone reading about the work, not a buyer being qualified

#### Scenario: It diverges from the brand document, deliberately
- **WHEN** this requirement is compared against `brand-guidelines.md` section 1, which positions Tessarion Labs as a software product studio selling to founders and CTOs
- **THEN** this requirement wins for this site, and the divergence is recorded in `design.md` as an upstream correction the brand repository still owes

### Requirement: Studio section
The site SHALL carry a section describing what Tessarion Labs is, why it exists, and what it is for. It SHALL name at least one trade-off the two of them accept, rather than listing only strengths.

#### Scenario: Why the apparatus exists
- **WHEN** a reader asks why a two-person side project has a brand, written specs and a design system
- **THEN** the section answers it in its own copy: they would rather build one product properly than five in a hurry

#### Scenario: The trade-off is capacity
- **WHEN** the callout is read
- **THEN** it states that two people and the hours left over is the entire capacity, that one product moves at a time, and that this is why both products are still in development

#### Scenario: Claims are specific
- **WHEN** the studio section is reviewed against the banned-word list
- **THEN** no banned word appears, and every claim about capacity or output is a number or a named artifact, not an adjective

### Requirement: Facts strip
The studio section SHALL carry a short strip of verifiable facts — how many people, location and timezone, products in development, and what the operation does not have — set in mono type.

#### Scenario: Facts are checkable
- **WHEN** the facts strip is rendered
- **THEN** each entry is a value a reader could verify from a public source, and no entry is a superlative
