## ADDED Requirements

### Requirement: Two people
The site SHALL present Roger Oliveira and Alice Ribeiro as the two people whose work Tessarion Labs is the name for. Each SHALL have a photo, a name, a role line, a bio, and outbound links.

#### Scenario: Both cards render
- **WHEN** the people section is rendered
- **THEN** two cards appear, each with a photo gallery, a name, a role line, a bio of at most 80 words, and at least one outbound link

#### Scenario: Cards are equal
- **WHEN** the two cards are compared
- **THEN** they use the same card treatment, the same gallery size and the same field order, so neither is visually senior to the other. An unequal number of photos does not change the layout

### Requirement: Photo gallery
Each person SHALL have a gallery of their own photos rather than a single portrait. Photos SHALL be served locally from `public/people/`, in a 4:5 portrait box, with explicit width and height and a descriptive `alt` attribute in the document's language.

#### Scenario: The gallery works without JavaScript
- **WHEN** the page is loaded with JavaScript disabled
- **THEN** every photo is in the DOM and the track is horizontally scrollable and swipeable, because it is a scroll-snap list and not a scripted slider

#### Scenario: Step buttons are an enhancement
- **WHEN** JavaScript runs
- **THEN** a previous button, a next button and a position counter appear; without it they stay hidden rather than rendering inert

#### Scenario: Nothing advances on its own
- **WHEN** the gallery is left alone
- **THEN** it does not auto-advance, because a carousel that moves by itself is one nobody can finish reading

#### Scenario: The counter follows a swipe
- **WHEN** a reader swipes or arrow-key scrolls the track without touching a button
- **THEN** the counter and the disabled state of the buttons update to match where the track actually is

#### Scenario: The ends are stated, not wrapped
- **WHEN** the gallery is on the first or last photo
- **THEN** the corresponding step button is disabled rather than wrapping around

#### Scenario: Motion respects the preference
- **WHEN** `prefers-reduced-motion: reduce` is set and a step button is pressed
- **THEN** the track jumps to the photo instead of smooth-scrolling

#### Scenario: No layout shift
- **WHEN** a photo has not yet loaded
- **THEN** its box is already reserved at the final aspect ratio, so no content moves when it arrives

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

#### Scenario: Both people link to GitHub and LinkedIn
- **WHEN** the two cards are rendered
- **THEN** each carries a GitHub link and a LinkedIn link, and the LinkedIn URLs are stripped of tracking parameters
