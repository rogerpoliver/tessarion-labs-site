## ADDED Requirements

### Requirement: Hero
The hero SHALL state what Tessarion Labs is in one sentence, followed by at most two supporting sentences, and SHALL offer exactly one primary action. The primary action SHALL be the only Kiln fill in the viewport.

#### Scenario: Positioning is first
- **WHEN** the page loads
- **THEN** the first heading states the studio's positioning, and no marketing preamble precedes it

#### Scenario: One primary action
- **WHEN** the hero is rendered
- **THEN** exactly one element carries the Kiln fill, and any secondary action is the outlined variant

### Requirement: Studio section
The site SHALL carry a section describing what the studio is, who it works with, and what it is not. It SHALL name at least one trade-off the studio accepts, rather than listing only strengths.

#### Scenario: What we are not
- **WHEN** a reader reaches the studio section
- **THEN** it states plainly that the studio is not an agency renting hours, not a consultancy that leaves slides behind, and not an AI startup

#### Scenario: Claims are specific
- **WHEN** the studio section is reviewed against the banned-word list
- **THEN** no banned word appears, and every claim about capacity or output is a number or a named artifact, not an adjective

### Requirement: Facts strip
The studio section SHALL carry a short strip of verifiable facts — team size, location and timezone, and shipped products — set in mono type.

#### Scenario: Facts are checkable
- **WHEN** the facts strip is rendered
- **THEN** each entry is a value a reader could verify from a public source, and no entry is a superlative
