## ADDED Requirements

### Requirement: Two people
The site SHALL present Roger Oliveira and Alice Ribeiro as the two engineers who run the studio. Each SHALL have a photo, a name, a role line, a bio, and outbound links.

#### Scenario: Both cards render
- **WHEN** the people section is rendered
- **THEN** two cards appear, each with a photo, a name, a role line, a bio of at most 80 words, and at least one outbound link

#### Scenario: Cards are equal
- **WHEN** the two cards are compared
- **THEN** they use the same card treatment, the same photo size and the same field order, so neither is visually senior to the other

### Requirement: Photos
Each person's photo SHALL be their own GitHub profile photo, served locally from `public/people/`, square, with an explicit width and height and a descriptive `alt` attribute.

#### Scenario: No layout shift
- **WHEN** a photo has not yet loaded
- **THEN** its box is already reserved at the final size, so no content moves when it arrives

#### Scenario: Photos are not hotlinked
- **WHEN** the page loads
- **THEN** no image request leaves the site's own origin

### Requirement: Bios are drawn from the public record
Each bio SHALL be written from what that person has actually shipped or holds, and SHALL NOT claim a title, an employer or an outcome the person does not have.

#### Scenario: Roger's bio
- **WHEN** Roger's bio is rendered
- **THEN** it names his years of production experience, his current contract engineering work for a US company, his AI and LLM engineering work, and the HR module modernization result, and it names the languages and platforms he ships in

#### Scenario: Alice's bio
- **WHEN** Alice's bio is rendered
- **THEN** it describes her as a developer working in web technologies, names the stack she works in and the degree she is studying, and does not inflate her seniority

### Requirement: Outbound links
Each person's links SHALL point at their real GitHub profile, and LinkedIn where one exists. Outbound links SHALL carry `rel="noopener noreferrer"` and SHALL be announced with the destination in their accessible name.

#### Scenario: Link is announced by destination
- **WHEN** a screen reader reaches a person's GitHub link
- **THEN** it announces the person's name and the destination, not the bare word "GitHub" repeated across cards
