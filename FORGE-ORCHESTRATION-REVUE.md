# FORGE · orchestration — the review (24/11)

Justin asked: look again at what was built, find the incoherences and the disengagement, check that it really works, dig to
the exact cause, fix at the core (not quick patches), criticize the work and `FORGE-ORCHESTRATION-REPONSE.md`, and show it on
real movies/shows. Long-term items: `FORGE-LONG-TERME.md`. Code: `orch.js`. Tests: `essais/creer/orch-regress.js` (invariants),
`essais/creer/film.js` (the full test, filmed).

## 1. Does it really work? Measured, not assumed

I wrote a **screenwriter audit**: it reads every story (25 test stories + 60 random draws = 85) and counts what a viewer would
feel as broken. Before this review → after:

| What a viewer would see | Before | After |
|---|---|---|
| The culprit says « tais-toi » after the truth is already public / Justin « chooses the truth » everyone knows | 19 + 4 / 85 | 0 |
| A proof vanishes and we never learn who did it (Ruby's scarf) | 28 | ~0 |
| Someone is accused by the room and never cleared | 29 | 0 |
| A question given to the audience never answered (« Que vient faire Amare ? ») | 45 | 0 |
| A deadline announced that never comes | 34 | 0 |
| Empty raise lines (« Ruby confie une chose jamais dite ») | 48 | 0 |
| The main antagonist does nothing for 2+ middle episodes | 40 | 17 (rest: a rival's plan runs out; a hidden culprit hides) |

The previous « verified » in the REPONSE was true and misleading: my checks verified **structure** (every field filled, every
crime answered), not **meaning** (a promise kept, a coherent order of knowledge). 30 % of the climaxes were incoherent and no
test saw it.

**The full test, filmed** (`essais/creer/film.js`): Créer v2 → episode 1 **played in the real player** (110 s) → ▶ La suite
→ the black screens until « Fin ». No key in this environment, so the episode's dialogue and staging were written by me from the
exact prompts Haiku would get (`ORCH.epPrompt()` — the passive prompt — then the staging prompt); faces are the base poses. It
plays without an error. Not tested: what Haiku itself writes from that prompt.

## 2. The problems, with their exact causes

**A. Open loops were text, not state.** The 8 fields of a moment were filled, but nothing *read* most of them: « ensuite :
Amare voudra se venger » was a sentence, not an obligation. So the engine could promise and forget: the scarf's hidden hand,
the accused Melissa, « Que vient faire Amare ? », the clock, Amare's grudge. Root cause: the old engine had threads (`fils`) that
owned their closing; the orchestrator, built around actions, dropped that ownership.
→ **Fixed at the core: loops are state.** A moment *opens* a loop (a question, a suspicion, a hidden hand, a debt, a clock, a
deadline, an accusation, a seed, a key) and a later moment the audience sees *closes* it. `settle()` closes what is left at the
right place with the right line. The test fails if one loop is open at the end. 🧭 shows « ⤷ ouvre / ✓ ferme » on every moment.

**B. Knowledge had two levels: hidden, or everyone.** So « Justin knows, alone » could not exist, and the climax broke: the
truth went public *then* Ruby said « si tu tiens à moi, tu te tais », and Justin « chose the truth » everyone already knew.
Root cause: the destination's prerequisite « Justin knows the truth » was implemented as « the public reveal comes first ».
→ **Fixed: who knows what, and what is public** (`knows`, `learn`, `goPublic`). When the truth is a side of the choice, it
reaches Justin **alone** before the choice; the room learns it **from what he chooses** (he tells everything → it clears the
accused and settles the debts; he keeps silent → « On accuse toujours Melissa, à la place du vrai coupable »). A cornered culprit
can only ask for silence while it is secret; once public, they beg or run.

**C. Clues had one channel: the search.** Your criticism is right, and it was deeper than wording: the engine could only produce
detective stories. → see § 3.

**D. Forces only answered Justin.** An antagonist whose interest Justin's attempts did not touch disappeared (James in *The
Dark Knight* test: one threat, then silence for 3 episodes). → **Fixed: a force with a plan of its own** (a threat, a rival,
someone who leaves, the one off screen) acts every round, and **Justin's next attempt is caused by it** (the world acts, he
answers). A force never repeats itself; when its plan runs out it waits for the crisis (the 17 remaining « absences »).

**E. Raises were templates detached from facts.** « Ruby confie une chose jamais dite à personne » carries nothing. → **Fixed:
a confidence says something true about the person** from the story's facts: what they owe and to whom (« Isa confie ce que ça
coûte : elle doit payer le passeur avant l'aube pour faire traverser son frère »), who threatens them (« Ruby avoue avoir peur
d'Amare. Vraiment peur. »), what they dream of, whom they protect. Without a fact: an image (« Ruby reste après la fermeture,
rien que pour Justin »), never an abstraction.

**F. Conflicting systems.** Viewing a story in Créer v2 *wrote* the character's climax decision into the state the old engine
reads (a read that writes). → **Fixed: one source**: forge.js asks `ORCH.pickOf()` (the character's decision) when the author
has not tapped one; nothing is written; a test checks both engines agree. Other coexistences are intentional and documented:
the old Créer (player choices) and the orchestrator (passive) share the world model, not their episodes.

**G. Smaller things the read-through found**: the plan told Haiku only the actor was present (after the body is found, only
Justin could speak) → everyone in the room is present; the soon-to-die James « wanted to get out of it » → his real want; a dead
figure « knew where Justin slept »; a known killer was « investigated » (« où était chacun cette nuit-là ? »); « Ce n'était qu'une
menace » after he killed → the threat loop is answered by what he did; Justin confided his love *to* the person he loves; the
inner pull came from the one he hunts; « que Amare » / « regard'Isa » (elision); two hour-clues colliding; a last slide with 7
sentences at once (now: never more than 3 on screen); a slide showing one face for a moment that names three.

## 3. The logic chain of a clue (your « isn't that stupid? »)

Yes: « a clue is found by someone searching, or created by the cover » described only detective stories. How it works in real
stories, and what each one shows:

- **Vertigo** (1958). Scottie saw Carlotta's necklace in the portrait (act 1: *the key*, planted to him and to us). Judy keeps
  it and wears it because she wants to be loved as herself (*the trace persists because of a desire*). It surfaces **on a date**,
  as he fastens it before dinner (*an encounter in another line*: love, not investigation). He was not doubting her (*the
  noticer is not searching*). His belief about her turns over in a second, and what he does next comes from what he wants (he
  takes her back to the tower).
- **Breaking Bad**, « Gliding Over All ». Hank read « W.W. » in Gale's notebook a season earlier and joked « Walter White? »
  (*the key*). Walt keeps Gale's *Leaves of Grass* inscribed « To my other favorite W.W. » out of pride (*the trace, kept by a
  flaw*). Hank finds it **on the toilet at a family barbecue** (*encounter, domestic*). Then: Walt notices the book is gone →
  « tread lightly » (*the culprit senses that the other knows: reciprocal awareness*).
- **Mystic River**. Celeste sees blood on Dave's hands at home (not investigating), *misreads* it, and from fear tells Jimmy →
  Jimmy kills an innocent. A clue changes a belief, **not necessarily toward the truth**, and the noticer acts from their desire.

The chain: **a trace exists because someone wanted something** × **a prepared mind holds the key** (planted earlier) × **they
meet in a scene of another line** → **a belief changes** → **the noticer acts from their own desire** (hides it, tests,
confronts, tells the wrong person) → **the culprit senses it** → consequence.

**Built now (« encounter » channel)**, used when Justin loves the culprit (`KEY` in orch.js, premier jet): the key is planted
early (« La montre de James s'est arrêtée à minuit dix. Justin est seul à l'avoir vue, et ne le dit à personne. »); later, in a
love scene, the culprit says the thing only the key makes readable (« Ruby, tout contre Justin : « Depuis minuit dix, je
n'arrive plus à fermer l'œil. » »); Justin knows, alone, and keeps silent because he loves her; the hidden hands come back as
lines (« Personne n'a vu Ruby au comptoir après minuit. « Arrête de chercher. Pour nous. » : Ruby se protégeait. »); Ruby senses
it and destroys the only proof; Justin's silence gets Melissa accused; « Si tu tiens à moi, tu te tais » is now coherent; his
choice decides what the room learns. The search channel remains for a culprit Justin doesn't love.
**Not built**: a wrong belief from a clue (Mystic River), a noticer who is not Justin, a physical tell from who they are (*Knives
Out*: Marta vomits when she lies), a third party with their own agenda, the midpoint switch from mystery to suspense
(Vertigo's letter). In `FORGE-LONG-TERME.md`.

## 4. « relire », what it was

It meant « re-read »: the moments the audience should now see differently after a reveal. It only existed as a list in 🧭 — the
viewer never saw it. Now it is **shown**: the reveal brings back the hidden hands as short lines (the alibi that was false, who
pushed the false lead, who made the proof disappear, what « arrête de chercher » really meant). On screen it is *The Usual
Suspects'* last minute: the coffee cup, « Kobayashi », everything returns.

## 5. Your remarks, one by one

- **Phase B, many kinds of intrigue, not only murder.** Honest answer: the *structure* is generic (facts, who knows, keys,
  traces, loops, channels), but the *data* exists only for murder, theft, betrayal, disappearance, secrets (12 kinds), objects
  and hidden links. Heist, con, identity, political plot, and the inverted detective (the culprit is the protagonist) need their
  own data. Listed.
- **Phase C, « the searcher » — only detective?** No: a force answers *anything* that touches its interest (a love toward the
  culprit gets « Arrête de chercher. Pour nous. »), and now acts on its own plan. *Joker* (2019) is the test I would use next:
  the world acts (therapy cut, Murray mocks him, Wayne rejects him), Arthur answers, escalating; the detectives climb a ladder
  *against the protagonist* (the audience knows: irony). Built: the world acting first. Missing: Justin as the culprit, and his
  answers as escalation. Listed.
- **The inner force is not always a flaw.** Right. *Casablanca*: Rick's opposition is a wound (Ilsa left him) and a code (« I
  stick my neck out for nobody »), not a flaw. Built now: **the pull** — the side he loves holds him back during the story, not
  only at the climax (« Justin s'apprête à aller vers Isa. Melissa l'appelle. Il reste. » · « Justin va parler. Il croise le
  regard de Ruby. Il se tait. »): that is ethic against bond. Wound, code, fear and false belief as inner forces: listed.
- **Phase F, Ruby and the scarf.** You were right, and it was cause A: the cover opened a question nobody owned. Fixed at the
  core (loops + echoes), not on that story.
- **Before/after**: yes, the scene gives the context; the plan now tells the writer who is in the room and what each one wants,
  so James can be warm before « sans faute ».
- **Q1 both sides should cost.** Agreed; today only the side he lets go has a price (*The Godfather*: Michael wins the family
  and loses Kay and himself). Listed.
- **Q2 keep the slides as they are.** Kept.
- **Q3 a circle per act and one for the whole piece.** Built in its first form: every moment carries its step in its act's
  circle and in the whole movie's (2 acts: act 1 = steps 1–4 of the big one, act 2 = 5–8); act 2 starts mid-circle (what changed,
  then its event); some loops close in their act, a threat whose author acts again in act 2 is carried to it (« Amare n'en a pas
  fini »). Per-thread scope as data: listed.
- **Q6 simpler subplots.** Listed (a small circle: want → try → result, for one or two secondary characters).
- **🎲 odd combinations.** Fixed at the source (draw and Haiku baseline): the one who *knows* a blood tie is never the one in
  love; the lover who does *not* know stays possible (*Oldboy*, Luke and Leia), as you asked.
- **« Did not see episode 1 in visual »**: right, this was the systemic part; the filmed test now shows episode 1 played.

## 6. Criticism of my own work

- **Good**: the order of construction (truth → drive → destination → audience → opening → moments → episodes) held. None of the
  fixes changed the architecture; they turned text into state. The opening recipe as a step of construction, and the separation
  truth / experience, were right.
- **Bad**: I declared the 8-field moment « the data structure » while most fields were decoration. I called the work verified
  on structural checks. I wrote the clue theory from detective stories. I let a viewing screen write into the author's state.
- **Neutral, to watch**: the stories are coherent and specific now, but they read like a precise summary, not like a writer —
  that is the slides' nature (you chose to keep them) and Haiku's job in episode 1. The decision rule (« he overcomes his flaw »)
  makes every Justin a positive arc: variety will need tragedy and both-sides-cost (listed).
