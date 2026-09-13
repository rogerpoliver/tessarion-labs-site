## ADDED Requirements

### Requirement: Two people
The site SHALL present Roger Oliveira and Alice Ribeiro as the two people whose work Tessarion Labs is the name for. Each SHALL have a photo, a name, a role line, a bio, and outbound links.

#### Scenario: Both cards render
- **WHEN** the people section is rendered
- **THEN** two cards appear, each with a photo gallery, a name, a role line, a bio, and at least one outbound link

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

### Requirement: Bio length
A bio SHALL be at most 80 words in the English source. A translation MAY exceed that by up to 20% where the language is denser, and no further. The budget is set in English because counting words across languages measures the language, not the length of the thought.

#### Scenario: Measured per locale
- **WHEN** the three built documents are measured
- **THEN** each English bio is at most 80 words and each translated bio is at most 96

### Requirement: Bios are drawn from the public record
Each bio SHALL be written from what that person has actually shipped or holds, and SHALL NOT claim a title, an employer or an outcome the person does not have. Each SHALL close by naming what that person is in this pair, so the two cards read as halves of one job rather than two résumés.

#### Scenario: Roger's bio
- **WHEN** Roger's bio is rendered
- **THEN** it names his years of production experience, the HR module modernization result, his current AI engineering work contracted from Brazil for a US company, and the languages he writes — and it closes by saying that everything on this site started as something he wanted to exist

#### Scenario: Alice's bio
- **WHEN** Alice's bio is rendered
- **THEN** it names the management, design and social-media work she came from, the stack she works in, the degree she is studying, and what she owns on Taimu, and it does not inflate her seniority

#### Scenario: No stale employer
- **WHEN** either bio is rendered
- **THEN** it names no employer either person has left

### Requirement: The division of labour is stated
The people section SHALL open with a lead naming how the two of them split the work: Roger generates the ideas, Alice decides which one ships and in what order. It SHALL state this as a fact about how the work happens, not as a compliment to either person.

#### Scenario: The split is legible before the bios
- **WHEN** a reader reaches the people section
- **THEN** the lead tells them who starts things and who finishes them, before either card is read

#### Scenario: Neither half is the senior one
- **WHEN** the lead is read
- **THEN** it describes two halves of one job, and does not rank them

### Requirement: Outbound links
Each person's links SHALL point at their real GitHub profile, and LinkedIn where one exists. Outbound links SHALL carry `rel="noopener noreferrer"` and SHALL be announced with the destination in their accessible name.

#### Scenario: Link is announced by destination
- **WHEN** a screen reader reaches a person's GitHub link
- **THEN** it announces the person's name and the destination, not the bare word "GitHub" repeated across cards

#### Scenario: Both people link to GitHub and LinkedIn
- **WHEN** the two cards are rendered
- **THEN** each carries a GitHub link and a LinkedIn link, and the LinkedIn URLs are stripped of tracking parameters
