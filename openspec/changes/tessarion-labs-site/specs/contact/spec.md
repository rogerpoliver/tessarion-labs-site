## ADDED Requirements

### Requirement: Contact section
The site SHALL carry a contact section stating how to start a conversation, with a `mailto:` link as the primary action. There SHALL be no form, no third-party embed and no tracking script.

#### Scenario: Contact is one action
- **WHEN** a reader reaches the contact section
- **THEN** there is one email address, presented as a link, and one sentence saying who should write

#### Scenario: No response-time promise
- **WHEN** the contact copy is read
- **THEN** it does not promise a reply within a fixed number of business days, because there is no payroll behind that promise

#### Scenario: No third-party request
- **WHEN** the page is loaded with a network log open
- **THEN** every request goes to the site's own origin, and no cookie is set

### Requirement: Footer
The footer SHALL carry the horizontal lockup, the studio's location and timezone, the contact address, links to the studio's GitHub, and a copyright line.

#### Scenario: Lockup appears once in the footer
- **WHEN** the footer is rendered
- **THEN** the lockup appears exactly once, in the build matching the current theme

#### Scenario: Copyright year is not stale
- **WHEN** the footer renders in a later calendar year
- **THEN** the year shown is the current year, computed at runtime, with a static fallback in the markup for the no-JavaScript case
