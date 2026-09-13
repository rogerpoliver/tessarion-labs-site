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

### Requirement: A bio is a person, not a résumé
Each bio SHALL name at most one professional result and SHALL spend the rest of its words on who that person is. Every professional claim SHALL be verifiable from the public record; every personal detail SHALL come from the person it describes. A bio SHALL NOT list technologies for their own sake.

#### Scenario: One credential, then a person
- **WHEN** a bio is read
- **THEN** at most one measured professional outcome appears, and the sentences after it describe how that person works and what they are like

#### Scenario: No technology inventory
- **WHEN** a bio is checked
- **THEN** it does not contain a list of tools, frameworks or techniques included only to signal competence — the stack belongs on the product cards

#### Scenario: The closing line is a person, not a title
- **WHEN** a bio's last sentence is read
- **THEN** it says something true about the person that a job description could not — and the two cards read as two people rather than two CVs

#### Scenario: Roger's bio
- **WHEN** Roger's bio is rendered
- **THEN** it names his years in production and the HR module result, then how he actually works — years in Neovim on the keyboard alone, early to AI, now developing by speaking to a model and arguing with it about once a day — and it closes on him being grumpy and the softest heart in the apartment

#### Scenario: Roger's bio carries no pipeline inventory
- **WHEN** Roger's bio is checked
- **THEN** it does not list LLM extraction pipelines, agentic workflows or MCP tooling. That sentence was a résumé line and it is removed

#### Scenario: Alice's bio
- **WHEN** Alice's bio is rendered
- **THEN** it names the management, design and social-media work she came from, the degree she is studying, and that she is the reason a pile of ideas becomes a scope, an order and a date — then crochet through whole K-dramas, metal shows, and being the only reason either of them leaves the apartment. It closes on her playing everything for a joke, this bio included, and it does not inflate her seniority

#### Scenario: No stale employer
- **WHEN** either bio is rendered
- **THEN** it names no employer either person has left

### Requirement: The division of labour is stated
The family section SHALL open with a lead naming how the two of them split the work: Roger generates the ideas, Alice decides which one ships and in what order. It SHALL state this as a fact about how the work happens, not as a compliment to either person. The same lead SHALL close by stating that the other three are cats.

#### Scenario: The split is legible before the bios
- **WHEN** a reader reaches the people section
- **THEN** the lead tells them who starts things and who finishes them, before either card is read

#### Scenario: Neither half is the senior one
- **WHEN** the lead is read
- **THEN** it describes two halves of one job, and does not rank them

### Requirement: The couple, outside the work
The family section SHALL carry one short paragraph about what the two of them do when nothing is shipping, placed between the person cards and the cats. It SHALL be specific — named activities, not adjectives — and it SHALL NOT be a card, because it bridges two groups rather than being a third one.

#### Scenario: The paragraph is concrete
- **WHEN** the paragraph is read
- **THEN** it names actual things they do — Brazil by motorcycle, rock and metal shows, sushi and coffee — rather than describing them as adventurous or curious

#### Scenario: Position carries the meaning
- **WHEN** the family section is read top to bottom
- **THEN** the order is the two of them, then the two of them together, then the cats, which is the order the household happens in

### Requirement: Outbound links
Each person's links SHALL point at their real GitHub profile, and LinkedIn where one exists. Outbound links SHALL carry `rel="noopener noreferrer"` and SHALL be announced with the destination in their accessible name.

#### Scenario: Link is announced by destination
- **WHEN** a screen reader reaches a person's GitHub link
- **THEN** it announces the person's name and the destination, not the bare word "GitHub" repeated across cards

#### Scenario: Both people link to GitHub and LinkedIn
- **WHEN** the two cards are rendered
- **THEN** each carries a GitHub link and a LinkedIn link, and the LinkedIn URLs are stripped of tracking parameters
