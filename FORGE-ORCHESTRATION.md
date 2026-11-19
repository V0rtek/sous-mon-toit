# FORGE · orchestration : texte à traiter (stocké tel quel, 19/11)

> **À traiter par Claude avec le modèle le plus fort et l'effort le plus haut. PAS sur Sonnet, PAS en effort medium.**
> Chaque ligne de ce texte compte et doit être adressée, réfléchie et solutionnée (surtout les questions de la section 4).
> Le texte ci-dessous est gardé comme il est (collé par Justin, ne pas reformuler).

---

Ok its a lot of text, what's coming next here I can't adress now I want u to stock it. It is the most important chat we could have ever (adressing this text) and will allow to show users something. Remind me of that on sous-mon-toit over Écrire section. Obvious section.

kEEP TEXT LIKE IT IS

The prompt to assess this :
- Do not let me adress this on a sonnet model and with medium effort. High model/effort
- Every single lines of this text matters and must be adressed and given reflexion and solutionned. (questions of section 4)
-
-----
-----
Now my goal is to get a input from user (any type for now (only characters actors and their desire/personality? text?) just pick what is the simplest, can be.

And then the output should be an engaging 2 minutes of story (visual) and then its just a black screen with with text telling what happens next, (title = current episode ("Episode 2")) and then u click to read the rest of the story, it just tells literally what happens in compacted and fast way (~2-5 slides per episodes) until the end.
Only in a tavern always (premade environments with multiple images/angles, the necessary)
Only a few characters. And maybe only standing chars with the base poses.

Measurement of success :

* It is understood
* It is engaging (in the way that the recipe targets)


Minimum user-showable product.
---------------------------------------------------------
Later in convo, I focused on Story Engine (majorly important) :
------------------------------------------------------------------------------
The question is mostly how are we going to do step 4. Story engine may generate something uncompatible since it already fills up episode 1 with lot of stuff?
Should every scene have a recipe? (obviously not same recipes as first ep).
The real hard part is orchestrtating a system (bro there is so much stuff to think about, future, you always forget things and go for shortcuts, things that makes sense, changes, I feel like I dont know to make u aware...). When I said start to finish I was talking about the story engine part (step 3-4).

Actually reflect on FORGE engine. On what the engine does.

The intended output :

* A real movie or TV show (acts) that makes sense long term
* Where things that happens are intentional (not stupid random) for the story to be good
* Lead to climax.
* That can take on a complex plot or mystery and maintain it long term while uncovering/progressing in a way that makes sense from audience perspective (that doesnt see the backend and experience this in a linear way)
* That has no fillers/useless bs.


maybe u gotta ask open (or not) questions, suggest (clear and concise) then ask for criticism

For part 5, ignore what u said, ignore visual. For now just characters that can have 6 base poses and background in tavern.
---------------------------------------------------------
You're right. I misunderstood the hard part.

I treated the opening recipe as something added to a finished story. That is not sufficient for FORGE. By the time FORGE has built the moments and cut them into episodes, it has already made important decisions about what the audience sees, when they see it, and what they care about.

**The recipe must participate in the construction of the story, not decorate the result afterward.**

And there's a second important correction: I wouldn't build three separate story generators, or force every scene to follow one of the three opening recipes.

I think we need to design the orchestration of FORGE: how it decides what happens, when it happens, why it happens, and what the audience is allowed to understand at each point.

Let's start with what FORGE actually does.

# **1. What FORGE is really responsible for**

Based on your guide, FORGE is already doing much more than generating a plot.

It has several distinct responsibilities:

1. **Establishing reality:** What actually happened? Who did what, why, and what does each character know?
2. **Establishing motivations:** What does everybody want?
3. **Finding conflict:** Which desires cannot coexist?
4. **Finding the dramatic engine:** Which conflicts are important enough to sustain a story?
5. **Creating progression:** How do those conflicts become increasingly difficult?
6. **Managing information:** What does the audience know, suspect, misunderstand and eventually discover?
7. **Orchestrating events:** Which moment causes another? Which moment changes the meaning of something earlier?
8. **Creating a climax:** How do the storylines converge into a consequential choice?
9. **Resolving the story:** What changes permanently because of what happened?

This is already the intended architecture in `forge.js` and `fils.js`.&#x20;

Texte collé(5).txt



I want to emphasize something: these responsibilities are not interchangeable.

For example:

- Knowing that Melissa killed the loan shark is **reality**.
- Melissa wanting to protect Isa is **motivation**.
- Justin wanting Isa while Melissa also wants Isa is **conflict**.
- The audience wondering who killed the loan shark is an **audience question**.
- Melissa leaving a trace at the crime scene is an **event or clue**.
- The audience discovering the truth in Episode 3 is an **information reveal**.

A good story requires these things to be coordinated.

A list of individually interesting moments isn't enough.

# **2. The real problem with the current architecture**

Let's follow what actually happens in FORGE.

**A. The ingredients**

`S`: characters, desires, traits, relationships, events, secrets, objects, etc.

**B. What is true?**

`truth()`: fixes motives, culprits, suspects, what objects contain and the underlying reality.

**C. What makes a story?**

`desires()` → `conflictsOf()` → `plotlinesOf()` → `climaxOf()`.

This establishes what people want, why they conflict, and what the protagonist will eventually have to choose.

**D. What happens?**

`buildAct()` creates the sequence of moments. It develops different plotlines, creates clues, raises stakes and connects developments.

**E. When does it happen?**

`episodes()` cuts the sequence into episodes, generally around 24 dialogue lines, preserving important moments and placing choices at the ends.

**F. How is it presented?**

`planOf()` turns an episode into a plan. Haiku writes the dialogue.

This is the actual architecture described in the guide.&#x20;

Texte collé(5).txt



Now, look at D and E.

`buildAct()` already generates the story's sequence. `episodes()` then determines where the episodes end.

Your problem is that **neither operation currently has a dedicated understanding of what the first two minutes must accomplish as an audience experience.**

The first event might open the act. The protagonist's desires start advancing. Other conflicts appear. Questions and clues get introduced. Secondary characters have their moments.

Each individual element may be reasonable.

But the combination can be terrible as an opening.

Your example demonstrates this.

In Episode 1, we simultaneously have:

- A hidden letter.
- A dangerous place.
- Justin's romantic desire.
- A debt and a deadline.
- A photograph.
- A murder.
- A suspect question.
- Competing romantic interests.
- Isa's past with the victim.
- A clue about Isa.
- A clue about Melissa.
- Public humiliation.
- A choice.

That's a lot of different audience responsibilities in two minutes.

The problem isn't necessarily that any of these moments is bad.

The problem is that FORGE is trying to advance too many things without first establishing a hierarchy of importance for the opening.

**I would not solve this by making Episode 1 shorter and deleting whatever doesn't fit. I would solve it by changing how FORGE allocates its story material in the first place.**

# **3. The distinction we need: three different levels of orchestration**

I think some of our confusion comes from using the same concept for different levels of storytelling.

Here's how I'd separate them.

LEVEL 1 · STORY

**What is the entire story about?**

Justin wants something. Other people have incompatible desires. There is an underlying reality, a central conflict, a chain of events and an eventual climax.

Example: Justin wants Isa, but pursuing her puts his life at risk.

LEVEL 2 · ACT / EPISODE

**What changes during this portion of the story?**

An act has a larger dramatic progression and climax. An episode has its own immediate progression, development and ending.

Example: Justin discovers Isa knows something about the murder, and his relationship with Melissa starts to deteriorate.

LEVEL 3 · SCENE / MOMENT

**What happens right now?**

Someone wants something in this particular interaction. Someone or something resists. A character acts. Something changes.

Example: Justin tries to speak privately with Isa. Melissa interrupts. Isa chooses to leave with Melissa.

## **Should every scene have a recipe?**

**No. Every scene needs a dramatic purpose, but it does not need one of the three opening recipes.**

I'd make a clear distinction:

| Concept             | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| Opening recipe      | Why should the audience become interested in the story? |
| Act progression     | How does the larger conflict evolve?                    |
| Episode progression | What changes during this episode?                       |
| Scene objective     | What does someone want right now?                       |
| Moment technique    | How do we communicate that change effectively?          |

For example, a scene can:

- Establish a relationship.
- Reveal information.
- Make an existing desire more difficult.
- Show a failed attempt.
- Introduce a consequence.
- Reverse what the audience believes.
- Force a character to act.
- Pay off an earlier clue.

These are different jobs, not different opening recipes.

A mystery opening might contain several later scenes that are entirely about romance, character conflict or action. Those scenes don't need to become mystery openings themselves.

There is one possible extension: an act that starts a new major storyline might need its own *entry strategy*. But I would not automatically impose the same three recipes on every act, let alone every scene.

# **4. How I would actually orchestrate FORGE**

This is the architecture I would work toward.

The most important change is that FORGE should have two separate representations of the story:

**The truth of the story:** what actually happens in the fictional world.

**The experience of the story:** what the audience sees, understands, suspects and feels, in chronological order.

Your existing `truth()`, `registre()` and `fils.js` already move toward this separation. But they don't yet solve it completely.&#x20;

Texte collé(5).txt



Here's the full proposed sequence.

## **Phase A — Understand the ingredients**

Input: user description.

Build the structured information:

- Who exists?
- What does each character want?
- What are their relationships?
- What personality traits influence their actions?
- What events, secrets and objects are involved?

Output: a structured world, not a screenplay.

## **Phase B — Establish the truth**

This is what `truth()` is for.

Determine:

- What actually happened?
- Who caused it?
- Why?
- Who knows?
- Who doesn't know?
- What is being hidden?
- What concrete evidence exists?
- What connects these facts?

For a complex mystery, this must be established before the story is written.

For instance, the murderer, motive, witness, clue and false suspect should be coherent before FORGE decides when the audience discovers them.

You shouldn't be deciding the culprit in Episode 3 because you need a surprise.

The surprise is in the audience's discovery of a truth that already exists.

## **Phase C — Establish the dramatic engine**

This is where your existing desire/conflict/plotline/climax system comes in.

Determine:

- What does Justin fundamentally want?
- What prevents him from getting it?
- Which characters actively oppose or complicate his desires?
- Which other desires intersect with his?
- What is the central conflict?
- What is the eventual choice?
- What does each possible outcome cost?

But I'd add another responsibility here:

**Establish how the opposition acts.**

Having a character who wants to hide a secret is not enough.

What does that character actually do to protect it?

What are their attempts? What happens when those attempts fail? How do they react to the protagonist getting closer?

Your guide explicitly identifies the antagonist's coordinated strategy as unfinished. This is important: a plot should not feel like obstacles are randomly appearing. They should be actions from characters pursuing their own interests.&#x20;

Texte collé(5).txt



## **Phase D — Design the destination**

Before constructing the story's sequence, establish the climax and its prerequisites.

For example:

**Climax:** Justin must choose between protecting his life and protecting Isa.

Now ask:

- What must happen to force this choice?
- What must Justin know?
- What must he misunderstand?
- What must the opposing character do?
- What relationships must change?
- What clues must exist?
- What must the audience discover before the choice?
- What must remain hidden until later?

This is important because it gives every earlier event a reason to exist.

The climax isn't just the last dramatic moment. It is the destination that the earlier story is constructing.

The engine already selects a choice and calculates some consequences. I'd extend this backward-planning responsibility, rather than discard its existing climax logic.

## **Phase E — Design the audience's journey**

This is where the mystery, seeds and reveals should be orchestrated.

Take the same truth:

Melissa killed the loan shark to protect Isa.

There are two different timelines:

**The fictional truth**

1. Melissa discovers that the loan shark threatens Isa.
2. Melissa decides to kill him.
3. Isa witnesses part of what happened.
4. Melissa hides her involvement.

**The audience's experience**

1. The loan shark is found dead.
2. Different characters react suspiciously.
3. The audience learns Isa was connected to him.
4. A clue implicates someone else.
5. The false theory breaks.
6. The audience discovers Melissa's motive and involvement.
7. Earlier moments take on a different meaning.

Notice that these are two different sequences of information.

The audience must experience the second sequence without access to the first.

For that, every important secret needs an explicit disclosure plan:

- What is the truth?
- Who knows it?
- What does the audience initially know?
- What can the audience reasonably suspect?
- What evidence is visible?
- What theories are encouraged?
- What breaks those theories?
- When is the answer revealed?
- Which earlier moments change meaning?

Your existing thread system has moves such as `open`, `clue`, `false lead`, `answer` and `all returns`. That's a useful foundation.

But the guide also acknowledges that audience beliefs that flip are not yet implemented, some graph links remain templates, and the audience isn't itself represented as a node in the facts graph. Those are real gaps for the ambitious mystery-generating capability you describe.&#x20;

Texte collé(5).txt



## **Phase F — Construct the actual story sequence**

Now that the engine knows:

- The truth.
- The character motivations.
- The opposition's strategy.
- The climax.
- The audience's information journey.

It can construct the chain of moments.

I'd make every significant moment answer:

1. What causes this?
2. Who takes the action?
3. What does that character want?
4. What changes because of it?
5. Which storyline does it advance?
6. What does the audience learn or believe?
7. What becomes possible or impossible afterward?

For example:

**Moment:** Melissa destroys a piece of evidence.

- Cause: Justin starts investigating the murder.
- Actor: Melissa.
- Desire: Protect her secret.
- Action: Destroys the evidence.
- World change: Evidence disappears.
- Audience change: Melissa's behaviour becomes suspicious.
- Plot effect: Justin's investigation becomes harder.
- Future consequence: A different clue becomes more important.

That's an intentional moment.

Compare it to:

"Melissa looks nervous."

That can be a perfectly good line or reaction, but by itself it doesn't explain a meaningful development in the story.

I would also enforce a simple principle:

**A moment must either change something, or make the audience understand something important differently.**

If it does neither, it probably doesn't belong.

## **Phase G — Allocate the story into acts and episodes**

Only now should FORGE determine how to distribute the moments.

This is where the existing `episodes()` logic needs more dramatic information.

It shouldn't simply ask:

"How many lines fit in this episode?"

It should also know:

- What must already have happened?
- What must the audience know?
- What is the episode's main progression?
- What is its local turning point?
- What question should remain open?
- What must be saved for a later payoff?
- What does this episode's ending change?

For the first episode, it has an additional restriction: the two-minute opening and its selected recipe.

For later episodes, the same three recipes are not required. They have their own local progression and reason to continue.

# **5. Where the three recipes actually belong**

Now we can answer the original question precisely.

I'd introduce an operation called `openingDesign()`.

It would happen **after FORGE knows the truth, characters' desires, conflicts and climax, but before&#x20;**`buildAct()`**&#x20;constructs the sequence of story moments.**

That's the important insertion point.

**The revised FORGE flow**

**1. Ingredients**

User's input → structured story state `S`

**2. Reality**

`truth()` → what actually happened and why

**3. Dramatic engine**

Desires → conflicts → plotlines → climax → costs

NEW

**4. Opening design**

Evaluate the actual story.

Select one recipe.

Select its primary desire, question or opportunity.

Establish what the audience must experience during the opening.

**5. Long-term story orchestration**

Establish the causal progression, information reveals, character strategies and necessary developments.

**6. Story sequencing**

`buildAct()` → construct and order moments, respecting the opening design.

**7. Episode allocation**

`episodes()` → divide the complete story without losing prerequisites or important developments.

**8. Episode plans and writing**

`planOf()` → dialogue generation and, eventually, presentation.

This is a conceptual architecture, not a claim that every operation needs to be a new function.

### **How does&#x20;**`openingDesign()`**&#x20;choose a recipe?**

It shouldn't simply ask Haiku:

"Which of these three recipes sounds best?"

It should examine what the story actually supports.

For example:

| Recipe      | What FORGE must find                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| Dilemma     | Two incompatible desires, meaningful relationships and consequences that can be established early          |
| Mystery     | A concrete unexplained fact, an available clue, a question worth following and an answer worth withholding |
| Opportunity | A desirable objective, an immediate opportunity and a genuine obstacle                                     |

Then it selects the strongest naturally supported opening.

It should also identify the specific material that supports that opening.

For example:

**Selected: Mystery**

Illustrative output

Underlying story: Melissa killed the loan shark to protect Isa.

**Primary audience question**

Who killed the loan shark?

**First hook**

The loan shark is found dead.

**What makes it personal?**

Isa had a past with the victim.

**Available clue**

Isa reacts strangely when the murder is mentioned.

**What must remain unknown?**

Melissa's involvement and motive.

The recipe doesn't invent a murder. It organizes the way the audience encounters a murder that already belongs to the story.

If the story has no credible mystery, FORGE shouldn't manufacture a random murder just to satisfy the mystery recipe.

### **The crucial part: opening budget**

This is the other change I consider necessary.

The opening should have a reserved budget that FORGE understands *before* distributing its moments into episodes.

Imagine a story with 40 potential moments.

The opening may need only six of them.

Those six should establish its chosen engagement mechanism and create a reason to continue.

The other 34 are not deleted. They remain in the complete story and are allocated later according to their prerequisites and dramatic value.

This also means the opening recipe can influence which moments are selected and prioritized, without changing the underlying truth.

I would introduce a distinction between:

- **Must happen early:** prerequisites for understanding the story or the opening's payoff.
- **Should happen early:** particularly valuable character investment, clues or dramatic developments.
- **Can happen later:** developments that don't need to be exposed immediately.
- **Must happen later:** revelations and events whose prerequisites have not yet been established.

This is a better approach than asking `episodes()` to fill 24 lines and then remove the least useful things.

And one more important detail: the opening doesn't have to contain the entire story's conflict. It needs to make the audience interested in the larger conflict. The complete dramatic progression can take much longer.

# **6. What FORGE still needs to become the engine you're describing**

I want to be honest about the difference between the current engine and your intended product.

The current engine already has a strong foundation:

| Capability                            | Current state according to the guide              |
| ------------------------------------- | ------------------------------------------------- |
| Character desires and conflicts       | Implemented                                       |
| Selecting a central choice            | Implemented                                       |
| Establishing hidden truth and motives | Implemented                                       |
| Interweaving plotlines                | Implemented                                       |
| Consequences and state changes        | Partially implemented, with substantial work done |
| Seeds and payoffs                     | Implemented at plan level                         |
| Mystery clues and false leads         | Partially implemented                             |
| Character-driven actions              | Implemented in part                               |
| Coordinated antagonist strategy       | Not done                                          |
| General facts-graph integration       | Partial                                           |
| Audience beliefs that change          | Not implemented                                   |
| Facts created during a story          | Not implemented                                   |
| Arbitrary full branching              | Not implemented                                   |

These limitations are documented in the guide, especially §§7.5–7.8 and §16.&#x20;

Texte collé(5).txt

Texte collé(5).txt



I see four particularly important areas of work.

**1. Causality and character agency**

Events need to arise from what people want and what they do.

Melissa shouldn't merely be assigned a suspicious moment. She should take an action because she wants to protect Isa. That action should provoke another character's action, which changes the situation.

The engine needs to construct chains of intentional behaviour.

**2. Audience knowledge**

A mystery can't just be a secret with a reveal date.

FORGE needs to track what the audience knows, what it suspects, what theories it currently has, what evidence supports those theories and what makes them change.

Character knowledge and audience knowledge must be distinct.

**3. Dramatic progression**

The engine must know when a storyline has genuinely developed.

Showing that Justin wants Isa, then showing that Justin wants Isa again, isn't progression.

Something has to change: his chances, his understanding, his relationship, the obstacle or the cost.

**4. Selection and elimination**

The engine needs to decide which developments deserve screen time.

A story with 15 potentially interesting things shouldn't automatically show all 15.

Every included moment should justify its place through causality, character, information, conflict or payoff.

This is where your no-filler requirement becomes a real engineering requirement rather than just a writing instruction.

# **7. One thing we must settle: what does an act mean?**

I noticed a structural mismatch in the existing system.

Your guide describes:

- `S.acts`: currently one or two acts.
- An act: a larger dramatic progression with a climax.
- An episode: an automatically cut portion of roughly 24 dialogue lines.
- A moment: one individual story development.

But this isn't necessarily the same as a proper movie or television structure.

And your desired product introduces another distinction: the first two-minute playable opening versus the remainder of the story.

I would explicitly separate these concepts:

| Level             | Meaning                                          |
| ----------------- | ------------------------------------------------ |
| Complete story    | The entire movie or TV storyline                 |
| Act               | A major progression in the complete story        |
| Episode / section | A portion of the story presented to the audience |
| Scene             | A continuous dramatic situation                  |
| Moment            | One meaningful development inside a scene        |

The two-minute playable opening could be the first scene, or several short scenes. It doesn't have to determine the structure of the complete story.

I would avoid implementing more episode logic until this hierarchy is clear.

# **8. My proposed model, in one sentence**

**FORGE should first design a coherent fictional reality and its characters' intentions, then construct a causal story toward a climax, while separately orchestrating the audience's discovery of that story, and finally organize the result into acts, episodes and scenes.**

The three recipes are a tool for designing the audience's initial entry into that experience.

They are not the story engine.

## **Let's challenge this before coding**

I don't want to give you another giant implementation brief based on assumptions you haven't approved.

There is one foundational question I'd like to settle first.

**When you say you want a real movie or TV show, which structure are we actually trying to generate?**

**A. One complete movie-like story**

A single continuous story, with several traditional acts, one major climax and a complete ending. Episode 1 is just the two-minute playable opening; the rest is read in compact sections.

**B. A TV-style series**

A larger storyline divided into actual episodes. Each episode has its own dramatic progression and ending, while also advancing the season-long storyline.

My initial recommendation is **A** for the MVP. It is a more manageable first test of whether FORGE can produce an intentionally constructed, coherent story with a satisfying ending.

But I particularly want your criticism of the orchestration model above. Is the separation between fictional truth, character-driven causality, audience knowledge and story sequencing how you envision FORGE working? Or am I still missing a fundamental responsibility of the engine?
--------------------------------------------------------
MY feedback on this :
---------------------------------------------------------
No choices made by player btw. Only passive consumption for now. CHoices made by chars.

A good story requires these things to be coordinated :
{
For example:
- Knowing that Melissa killed the loan shark is reality.
- Melissa wanting to protect Isa is motivation.
- Justin wanting Isa while Melissa also wants Isa is conflict.
- The audience wondering who killed the loan shark is an audience question.
- Melissa leaving a trace at the crime scene is an event or clue.
- The audience discovering the truth in Episode 3 is an information reveal.
}



for each do u have clear vision on how to do :
{
LEVEL 1 · STORY
What is the entire story about?
Justin wants something. Other people have incompatible desires. There is an underlying reality, a central conflict, a chain of events and an eventual climax.
Example: Justin wants Isa, but pursuing her puts his life at risk.

LEVEL 2 · ACT / EPISODE
What changes during this portion of the story?
An act has a larger dramatic progression and climax. An episode has its own immediate progression, development and ending.
Example: Justin discovers Isa knows something about the murder, and his relationship with Melissa starts to deteriorate.

LEVEL 3 · SCENE / MOMENT
What happens right now?
Someone wants something in this particular interaction. Someone or something resists. A character acts. Something changes.
Example: Justin tries to speak privately with Isa. Melissa interrupts. Isa chooses to leave with Melissa.
}



An act must have its strategy (episodes doing what):
{
Concept	Purpose
Opening recipe	Why should the audience become interested in the story?
Act progression	How does the larger conflict evolve?
Episode progression	What changes during this episode?
Scene objective	What does someone want right now?
Moment technique	How do we communicate that change effectively?

For example, a scene can:
- Establish a relationship.
- Reveal information.
- Make an existing desire more difficult.
- Show a failed attempt.
- Introduce a consequence.
- Reverse what the audience believes.
- Force a character to act.
- Pay off an earlier clue.
These are different jobs, can have multiple at once
}



yes: Establish how the opposition acts. (it doesnt have to literally be an antagonist, opposition can be internal pattern, can be anything opposing)



Section 4 is banger. I want you to adress every single line there.


This is banger :
Moment: Melissa destroys a piece of evidence.
- Cause: Justin starts investigating the murder.
- Actor: Melissa.
- Desire: Protect her secret.
- Action: Destroys the evidence.
- World change: Evidence disappears.
- Audience change: Melissa's behaviour becomes suspicious.
- Plot effect: Justin's investigation becomes harder.
- Future consequence: A different clue becomes more important.
That's an intentional moment.
Compare it to:
"Melissa looks nervous."
That can be a perfectly good line or reaction, but by itself it doesn't explain a meaningful development in the story.



YES:
1. Causality and character agency
Events need to arise from what people want and what they do.
Melissa shouldn't merely be assigned a suspicious moment. She should take an action because she wants to protect Isa. That action should provoke another character's action, which changes the situation.
The engine needs to construct chains of intentional behaviour.

2. Audience knowledge
A mystery can't just be a secret with a reveal date.
FORGE needs to track what the audience knows, what it suspects, what theories it currently has, what evidence supports those theories and what makes them change.


we will decide according to how we find solutions for section 4:
- section 7 isnt that important. act is like story circle
- to contest but would say Lets aim for 1-3 act movie.
