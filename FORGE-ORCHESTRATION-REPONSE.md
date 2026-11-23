# FORGE · orchestration — the answer (23/11)

Answers `FORGE-ORCHESTRATION.md` (kept as it is), line by line, with what was built. Code: `orch.js` (new), small changes in
`forge.js`, `plan.js`, `mise.js`, `creer2.js`. Test: `essais/creer/orch-regress.js`. French notes for the next sessions:
`CREER.md` § « L'orchestration ».

**How to see it**
- **Créer v2** › 🎲 (or a sentence → Haiku) › step 2: the recipe and the audience's question are shown, **📖 Lire toute
  l'histoire** reads the whole movie as the viewer will (episode 1 as text, then each episode on a black screen, one
  sentence per tap, until « Fin »). No key needed.
- With keys: **⚡ Épisode 1** now writes the *opening* (passive: no player choice) → images → **▶ Jouer** → at the end
  **▶ La suite** opens the black screens (Épisode 2 → the end).
- **Old Créer** › **🧭 Orchestration** copies the whole construction to read as a screenwriter (truth, forces, destination,
  audience journey, every moment with its 8 fields, every episode with what the audience knows / suspects / wonders).

**Verified**: 26 test stories + 100 random draws: every moment has an actor, a cause and a change; nobody dead acts; every
hidden crime is answered after ≥ 2 real clues and its culprit is never named before; every climax prerequisite is in
place; opening ≤ 8 moments; other episodes 1–5 slides; the old engine's regression still passes. I read about ten stories
in full as a screenwriter and fixed what read wrong (see § 9).
**Not verified**: no Haiku output read (no key in this environment) — the opening prompt is new and untested on the real model.

---

## 0. Your feedback, applied

| You said | What it became |
|---|---|
| No choices made by the player. Passive. Choices made by characters. | The orchestrator has no player choice anywhere. **Justin decides the climax from who he is** (`decide()`): he overcomes his flaw (takes the side his flaw pushes him away from); between two loves/loyalties his traits decide; **a reveal can flip it** (the person on one side turns out to betray him / work for his enemy / be his blood). That decision is written into the state so act 2 is built on it (unless the author pinned one by hand). Every other choice is a character's: the culprit pushes a false lead, lies, destroys a proof; the rival claims, undermines, sets a deadline; the accused fights back. Episode 1's prompt is passive (`plan.passive` → `prompt2`). |
| A good story requires these things to be coordinated (reality, motivation, conflict, audience question, clue, reveal) — for each, do you have a clear vision at story / act-episode / scene level? | Yes, see § 1 (a 6 × 3 table, each cell = where it lives in the code). |
| An act must have its strategy (episodes doing what); a scene can have several jobs at once. | An act = a story circle (8 steps); every moment carries its step; episodes are parts of the circle; every moment carries its jobs (several). § 2. |
| Establish how the opposition acts (it can be internal, anything). | Forces: **a person**, **Justin's own flaw**, **the world** (the clock, someone off screen). Each has ordered moves, each one an answer to what Justin just did. § 3 Phase C. |
| Section 4: address every line. | § 3, every line. |
| The "intentional moment" example. | It is the data structure. Every moment has: cause · actor · desire · action · world change · audience change · plot effect · future consequence. § 3 Phase F. |
| Causality & agency; audience knowledge. | Built (first form). § 5. |
| Section 7 isn't that important; act = story circle; aim for a 1–3 act movie. | 1 and 2 acts work. 3 does not yet (§ 8, question 3). |

---

## 1. The six things to coordinate, at three levels

Melissa / the loan shark from your example, mapped on our test story `T2_meurtre` (Ruby killed James because James was going
to tell that she betrayed him).

| | Level 1 · the story | Level 2 · act / episode | Level 3 · scene / moment |
|---|---|---|---|
| **Reality** (Ruby killed James) | `facts` (Phase B): what happened, who, why (the motive comes from one of the culprit's desires), who knows, the false lead, the traces it left. Fixed before any moment. | An act only reveals the facts due in that act; a fact held for act 2 keeps its *why* out of act 1 (« who » in act 1, « why » in act 2). | A moment can only show a trace of a fact (a clue), never invent one. The culprit is named only in the reveal moment. |
| **Motivation** (protect, hide…) | Desires (`desires()` in forge.js), traits (7 numbers). | Each force has its desire; each act re-reads the desires on the changed world (act 2). | Every moment has an **actor** and the **desire he acts from right now** (`m.desire`). |
| **Conflict** (two want the same thing) | Conflicts → forces against Justin, each with a strategy. | The rounds of an act: Justin pushes a line → the force whose interest it touches answers. | « Someone wants, someone resists, someone acts, something changes »: attempt → move → reaction. |
| **Audience question** (who killed?) | The opening recipe picks the primary question. | The ledger: at the end of each episode, what the audience knows / suspects / wonders / believed wrongly / alone knows. | A moment's `aud` changes: ❓ opens · 💡 learns · 🤨 suspects · ✖ a theory breaks · ✅ answered · 🙈 irony · 🔄 re-read. |
| **Event / clue** (a trace) | Traces per crime (`TRACE`): a motive clue, the proof someone saw, the culprit's lie, the slip that gives them away. | The ladder spreads them over the rounds (never two clues in the same beat; ≥ 2 before the answer). | A clue is *found by someone who is searching* (an action), or *created by the culprit's cover* (the proof vanishes → only two names left). |
| **Reveal** (the audience learns in ep. 3) | Each secret has a mode: mystery / twist / irony / motive. | Due before the climax when the choice needs it (Phase D); else held for later. | The reveal moment lists which earlier moments change meaning (« relire #5, #11, #17 »). |

---

## 2. An act's strategy, and a scene's jobs

**An act = a story circle** (`CIRCLE` in orch.js), each moment tagged with its step:

1 Toi (the world, who we love) · 2 Le besoin (what he wants, said out loud) · 3 Il y va (the event) · 4 Il cherche (attempts,
opposition, clues) · 5 Il trouve (something real) · 6 Il paie (it costs; a belief turns over) · 7 Le retour (the truth, the
forced choice, his decision) · 8 Il a changé (the price, for good).

**Episodes doing what**: episode 1 = steps 1–3 (the opening recipe), then one episode per search round, then « il trouve +
il paie », then « le retour », then « il a changé ». Each episode records: what changes, its turn (last moment), what stays
open, what the audience believes.

**Your 5-level table** is now data:

| Concept | Where |
|---|---|
| Opening recipe | `opening.r` (mystery / dilemma / opportunity), with its scores and why |
| Act progression | the circle steps of the act's moments, and the act's destination (`dest`) |
| Episode progression | `episode.changes`, `episode.turn`, `episode.aud` |
| Scene objective | `moment.actor` + `moment.desire` (what he wants right now) |
| Moment technique | `moment.tech` (from the catalogue: « La preuve disparaît », « Le coupable désigne », « Il force la main »…) |

**Scene jobs, several at once**: `moment.jobs` among 🤝 establish a relationship · 🔎 reveal information · ⛰️ make a desire
harder · ↘️ a failed attempt · ↪️ a consequence · 🔄 reverse what the audience believes · ⏳ force someone to act · 🎯 pay off
a clue (· 🎯 désir: show what someone wants). E.g. the culprit destroying the proof = ⛰️ + 🔎.

---

## 3. Section 4, line by line

> The most important change is that FORGE should have two separate representations of the story: the truth / the experience.

Done. `facts` (the truth: never shown as such) and `W.M` + the ledger (the experience: what the audience sees, in order, and
what it understands after each moment). They are separate objects; the moments point to facts (`m.fact`), never the reverse.

> Your existing truth(), registre() and fils.js already move toward this separation. But they don't yet solve it completely.

`truth()` is reused (motive, false lead). The old `registre()` stays for the old Créer; the orchestrator has its own ledger
that also tracks **suspicions and wrong beliefs**, which the registre did not.

### Phase A — Understand the ingredients
> Input: user description.

Unchanged and kept simple: one sentence → Haiku picks from the lists (Créer v2 step 1), or 🎲. The simplest input that works
(your « just pick what is the simplest »): characters + what they want + one hidden thing is enough; the engine finds the rest.

> Who exists? What does each character want? Relationships? Personality traits? Events, secrets and objects?

All in `S`: cast, pillars + flaw → **7 traits in numbers** (they decide actions), wants, relations, infos (secrets, masks,
past, objects), events (with hidden culprits), the facts graph (figures off screen, things, links).

> Output: a structured world, not a screenplay.

Yes. Phase A outputs `S`; nothing is written until Phase F.

### Phase B — Establish the truth
> What actually happened? Who caused it? Why?

`factsOf()`: one fact per hidden crime, disappearance, secret, object, hidden link: `truth` (« Ruby a tué James (James allait
dire la vérité : Ruby a trahi James) »), `by` (who), `mot` (the motive, drawn from one of the culprit's desires, chosen by
their traits).

> Who knows? Who doesn't know? What is being hidden?

`knowers` (the culprit, + witnesses from the graph's « saw » links); everyone else does not; `hidden: true` = hidden from the
audience. Knowledge also changes during the story (`W.knows`: after a reveal, everyone present knows).

> What concrete evidence exists?

`TRACE` (premier jet): for each crime kind, a motive clue (« la bourse est pleine : ce n'est pas un vol »), a proof someone
can see (« un foulard taché au fond de l'écurie »), the culprit's alibi (a lie), what is left when the proof vanishes
(« seuls Ruby et Melissa y sont descendus »), the slip that gives them away (« Ruby parle de l'heure exacte du crime.
Personne ne l'avait dite »). For secrets: `SEED` (two signs and a proof per secret). Objects tied to a theft (a ring → its
empty box).

> What connects these facts?

The motive ties the crime to a desire and, through the graph, to a promise or a debt (J1: Amare stole the ferryman's purse
to keep his promise to Isa, who must pay the crossing before dawn). An object holds a piece of a crime (James's letter names
Ruby). A hidden link ties two people.

> For a complex mystery, this must be established before the story is written. The murderer, motive, witness, clue and false suspect should be coherent before FORGE decides when the audience discovers them.

Yes: all of it is computed before the first moment. The order is enforced in `build()`.

> You shouldn't be deciding the culprit in Episode 3 because you need a surprise. The surprise is in the audience's discovery of a truth that already exists.

Exactly how it works: the reveal moment only *reads* `fact.truth`; it cannot change it.

### Phase C — Establish the dramatic engine
> What does Justin fundamentally want? What prevents him from getting it?

His climax pair (two desires that cannot both win) and the forces that oppose each one (🧭 « LE MOTEUR »).

> Which characters actively oppose or complicate his desires? Which other desires intersect with his? What is the central conflict?

`forcesOf()` turns every conflict touching Justin into a force (rival, ouster, threat, leaver, keeper, culprit). One person
can be two forces (Amare in T1: the rival for Ruby *and* the thief). The central conflict = the climax pair.

> What is the eventual choice? What does each possible outcome cost?

The choice = the climax pair. Its cost = `fateFor()` (concrete and irreversible: « Melissa meurt ; Amare ne bluffait pas »,
« Ruby part, et ne reviendra pas », « le secret de Justin éclate devant tous »). Both outcomes are computed; the one Justin
leaves becomes the price.

> Establish how the opposition acts. Having a character who wants to hide a secret is not enough. What does that character actually do to protect it?

Each force has **moves** (`g.move`, `g.lie`, `g.cover`, `g.theory`), chosen by their traits:
- a culprit: pushes the false lead (it is *their* action: « Ruby rappelle à tous qu'Amare ne supportait pas James »), lies
  when asked, makes the proof disappear (sly) or silences the witness (violent), turns the room against the one who
  accuses; cornered: threatens (violent), « si tu tiens à moi, tu te tais » (when Justin loves them), « dis-le, et je dis le
  tien » (when Justin has a secret), or runs;
- a rival: claims the person in front of everyone, undermines Justin (sly) or humiliates him (proud), sets a deadline, forces
  the choice; a rival who wants Justin himself kisses him in front of the one he loves;
- a threat: breaks something to show it is serious, closes the exit, holds both people and makes Justin choose;
- the one who wants to leave: prepares, sets the hour, leaves.

> What are their attempts? What happens when those attempts fail?

Moves are in order and escalate: when one fails (the false lead is cleared), the next one is worse (the proof is destroyed →
it narrows to two). When everything fails (the reveal), the culprit's last move is the one that forces the climax.

> How do they react to the protagonist getting closer?

A move is always **caused by** Justin's (or the searcher's) last step: he interrogates → the culprit lies; someone saw the
proof, he goes down to get it → the culprit makes it disappear; he confesses his love to the culprit → « Arrête de chercher.
Pour nous. ». The cause is stored (`m.cause`) and shown (« ← #14 »).

> A plot should not feel like obstacles are randomly appearing. They should be actions from characters pursuing their own interests.

Every obstacle has an actor and their desire. The only actor-less force is the clock (time), which you allowed (« opposition
can be anything »).

> (Your addition) Opposition doesn't have to literally be an antagonist: an internal pattern, anything.

`inner` force = Justin's flaw (`FLAW`, premier jet): it makes him fail once (« Face à Amare, Justin baisse les yeux et
recule »), then at the worst moment, at someone's expense (« Justin hésite encore. Toute la salle accuse Melissa. »); at the
climax he overcomes it (« Cette fois, Justin ne recule pas »). World forces: the clock, the one off screen looking for him
(« Le passeur a fait demander où dort Justin »).

### Phase D — Design the destination
> Before constructing the sequence, establish the climax and its prerequisites.

`dest` is computed before any moment: the pair, Justin's decision, its price, and a list of prerequisites; after
construction each prerequisite says where it is satisfied (« ✓ … (#23) ») or that it is missing (« ✗ »). The test fails if
one is missing.

> What must happen to force this choice?

The forcer's last move (the threat, the cornered culprit, the rival's deadline, or the clock), placed right before the choice.

> What must Justin know?

If a side is the truth: the reveal comes before the choice (prerequisite). If a side is a person who betrays him: the
betrayal comes out before, and it flips his choice.

> What must he misunderstand?

The false lead (he and the audience suspect the wrong person until it breaks), then the narrowing to two (one of them is
someone he loves: « Toute la salle accuse Melissa »).

> What must the opposing character do?

Its moves in order, the last one forcing the choice (above).

> What relationships must change?

The price changes one for good (dies / leaves / never forgives); a reveal can end a desire (blood ends a romance; a
betrayal ends a protection), and act 2 is built on the changed world (who is dead, who turned).

> What clues must exist? What must the audience discover before the choice? What must remain hidden until later?

≥ 2 real clues before each answer (prerequisite); the truths the choice depends on are revealed before it; facts of a later
act stay out (listed as « Gardé pour plus tard »), and a motive held for act 2 keeps act 1's answer to « who ».

> This gives every earlier event a reason to exist. The climax is the destination the earlier story is constructing.

Yes, in one honest sense: the construction *pulls* toward the prerequisites (it adds what is missing: if the person the
choice will cost has not been seen in the act, they get a moment before it — otherwise « the price costs nothing »). What is
not done: choosing the *climax pair itself* from what makes the best destination (it still comes from `climaxOf`). § 8.

> The engine already selects a choice and calculates some consequences. Extend this backward-planning responsibility.

Extended: prerequisites + the decision + the price + what the next act stands on. Kept `climaxOf` and `fateFor`.

### Phase E — Design the audience's journey
> Two timelines: the fictional truth / the audience's experience.

The truth is the facts (+ the motive, the traces); the experience is the moments. Your exact 7-step audience sequence is what
the mystery ladder produces: the body is found → reactions (the accused fights back, which makes him look guiltier) → the
victim's past → a clue implicates someone else → the false theory breaks → the culprit and motive → earlier moments re-read.

> Every important secret needs an explicit disclosure plan: what is the truth / who knows it / what the audience initially knows / can reasonably suspect / what evidence is visible / what theories are encouraged / what breaks them / when it is revealed / which earlier moments change meaning.

Per secret: `truth`, `knowers`, **mode** (mystery: the audience asks; twist: it does not know there is a question, seeds then
reveal; irony: the audience knows and fears the moment the others learn; motive: comes out with its crime), the visible
traces, the encouraged theory (the false lead, pushed by the culprit), what breaks it (an alibi proven by someone), when
(the act's crisis, before the choice when needed), and the re-read list on the reveal (« relire #5, #11, #17 »: the theory
push, the lie, the cover).

> The thread system (open, clue, false lead, answer, all returns) is a useful foundation.

Kept for the old Créer. The orchestrator uses its own, smaller set tied to actions (theory / lie / clue / cover / clear /
reveal) because each step must have an actor.

> Gaps: audience beliefs that flip; some graph links are templates; the audience is not a node.

- **Beliefs that flip**: now tracked (`ledger`): « Il soupçonne : Amare (et Amare vient de menacer Ruby) » → « Il a soupçonné à
  tort : Amare » → « Il soupçonne : Ruby ou Melissa » → answered. And a revealed betrayal flips Justin's choice.
- **Templates**: the moments are concrete (names, places, objects), from databases. They are still the engine's sentences,
  not a writer's (§ 8).
- **The audience as a node**: not in the graph; it is a parallel ledger. Works for now.

### Phase F — Construct the actual story sequence
> Every significant moment answers: what causes this / who acts / what that character wants / what changes / which storyline / what the audience learns or believes / what becomes possible or impossible.

Fields of every moment: `cause` · `actor` · `desire` · `action` · `world` · `aud` · `plot` · `next` (+ `jobs`, `circle`,
`tech`). 🧭 prints them all.

> Moment: Melissa destroys a piece of evidence. Cause / actor / desire / action / world change / audience change / plot effect / future consequence.

Generated as is (`g.cover`), from T2:
- **Cause**: #21 Justin goes down to the stable to look for what Amare saw.
- **Actor / desire**: Ruby, wants her crime hidden.
- **Action**: makes the scarf disappear.
- **World change**: the scarf no longer exists; only two names left: Ruby and Melissa.
- **Audience change**: 🤨 Ruby or Melissa (mystery mode: the audience sees the result, not the hand).
- **Plot effect**: the proof slips away, it narrows.
- **Future consequence**: another clue becomes the only hope (here: James's letter, planted in episode 1).

> « Melissa looks nervous » can be a good line but doesn't explain a meaningful development.

Such things exist only as a second job riding in a moment that changes something (a seed: « Ruby change de sujet dès qu'on
parle du passé de James »), never as a moment of their own.

> A moment must either change something, or make the audience understand something important differently. If it does neither, it doesn't belong.

Enforced: a moment with no world change and no audience change fails the test; reactions are only generated when they change
something (a blow, an accusation — not a kiss).

### Phase G — Allocate into acts and episodes
> Only now distribute the moments. Not « how many lines fit ».

Moments are built first, then cut by their circle step (`allocate()`), never by a line count (except: a part over 5 slides
is split, a part under 2 joins the next).

> What must already have happened? What must the audience know?

Guaranteed by construction order + the prerequisites; the ledger gives, per episode, what the audience knows at its end.

> What is the episode's main progression? Its local turning point? What question remains open? What is saved for later? What does its ending change?

`episode.changes`, `episode.turn` (its last moment, chosen to be a turn: a lie, a cover, a force, a reveal), `aud.wonders`,
the facts still hidden, and the world changes of its last moment.

> For the first episode, the two-minute opening and its recipe. For later episodes, the three recipes are not required.

Yes: recipes only shape episode 1. Later episodes are parts of the circle.

---

## 4. Section 5 — where the recipes belong (`openingOf()`)

- **Inserted after** truth, desires, conflicts, climax (Phases B–D) and **before** the moments are built. The recipe's spine
  is the start of the construction, not a filter on it.
- **Chosen from what the story supports**, not by asking Haiku: each recipe is scored on your table's conditions and the
  scores are shown (« +3 un crime au coupable caché, +1 c'est personnel pour quelqu'un de présent, +1 une fausse piste toute
  trouvée (Amare), +1 il ouvre l'histoire »). A story with no hidden fact scores 0 for mystery: **no murder is invented**.
- **Its material** is output like your illustrative block: the audience's question, the hook, what makes it personal, the
  clue (or the obstacle), what must remain unknown.
- **The spines** (premier jet, 7 slots ≈ 21 lines ≈ 2 minutes):
  - 🔎 mystery: his want · someone we will lose, alive (and the false lead's public grudge) · the event · it matters to
    someone · the culprit pushes a theory · a real clue · turn: « C'est l'un d'eux. »
  - ⚖️ dilemma: want A · bond B · the event that ties them · the pressure · A weighs more · B weighs more · turn: the deadline.
  - 🚪 opportunity: want · the chance · the obstacle · he tries · it fails (his flaw) · the cost rises · turn: the obstacle's next move.
- **Opening budget**: the opening only carries the seeds of *its* question (e.g. the culprit's motive); every other secret is
  planted in round 1 (« Can happen later »). Reveals are « must happen later » by construction.
- **J1, your validated scene, now comes out of the engine alone**: « Isa doit payer le passeur avant l'aube pour faire traverser
  son frère. Amare, à Isa : « Je t'ai promis. Tu l'auras à temps. » … La bourse du passeur a disparu du coffre. Isa : « Pas
  de bourse, pas de bateau. » ».

---

## 5. Section 6 — the four areas

1. **Causality and agency** — built: every moment has an actor acting from a desire, caused by a previous moment; forces
   answer what Justin does; the one a move hits answers from their traits (the accused grabs the accuser by the collar);
   events of an act come « soudain » but their consequences are chains.
2. **Audience knowledge** — built (ledger), distinct from character knowledge (`W.knows`): knows / suspects (with the evidence)
   / wonders / believed wrongly / irony (only the audience knows).
3. **Dramatic progression** — each side of the choice climbs 1 → 2 → 3 (never the same level twice), each mystery climbs a
   ladder that only goes forward, the flaw fails twice then is overcome. Not measured yet as « chances / understanding /
   relationship / obstacle / cost » separately.
4. **Selection and elimination** — the engine only builds what the destination and the audience journey need; a moment that
   changes nothing is not built. Others' plotlines appear only through what they *do* to Justin's lines (a subplot that
   doesn't touch him doesn't exist: your rule 26).

---

## 6. Before / after on the same story (`T2_meurtre`)

**Before (episode 1 of the old engine)**: Ruby enters · Justin cares for Melissa · a seed · a letter seen · we get attached to
James · Amare and James clash · a past · the murder · theories · « Melissa est menacé·e » · a deadline · another seed · a look
· a player choice. 13 audience responsibilities, most of them assigned, none of them an action with a reason.

**After (episode 1 of the orchestrator, mystery recipe, 7 moments)**:
1. Justin, à Amare : « Quand Ruby rit, j'oublie où je suis. » (+ Ruby change de sujet dès qu'on parle du passé de James.)
2. James promet à Justin de lui payer sa dette demain, « sans faute ». (+ Amare et James se disputent, devant tous. Une lettre de James pour Melissa : on la voit, personne ne l'ouvre.)
3. On retrouve le corps de James dans l'écurie.
4. Justin : « Je trouverai qui a fait ça. »
5. Ruby rappelle à tous qu'Amare ne supportait pas James. Les regards se tournent vers Amare.
6. Justin vide les poches de James : la bourse est pleine. Ce n'est pas un vol. Quelqu'un en voulait à James.
7. Personne n'est entré, personne n'est sorti cette nuit. C'est l'un d'eux.

**The rest, as slides**: Ruby embrasse Justin : « Arrête de chercher. Pour nous. » · Amare attrape Ruby par le col · Ruby jure
avoir servi au comptoir · Amare est lavé (le veilleur l'a vu) · Amare a vu un foulard taché · le foulard disparaît : seuls Ruby
et Melissa y sont descendus · Justin hésite encore : toute la salle accuse Melissa · Melissa ouvre enfin la lettre de James :
« méfiez-vous de Ruby » · Ruby ne nie pas · « Si tu tiens à moi, tu te tais » · Justin choisit la vérité · Ruby ne lui
pardonnera pas · la place de Ruby reste vide.

---

## 7. Measurement of success (« it is understood · it is engaging »)

Not built, proposed: show 5 people the 📖 reading (no key needed) and ask, after episode 1: « What is the question? » (the
answer should be the recipe's question = understood) and « Do you want the rest? »; then time each tap in the slides (a slide
read in under a second was skipped = not engaging). One line in the slides player can log the taps.

---

## 8. What is not solved (honestly)

- **The words are the engine's.** Concrete (names, objects, places), coherent across episodes, but they read like a good
  summary, not like a writer. Episode 1 is written by Haiku from the plan; the slides are not (no AI). A « polish the slides »
  prompt (same facts, better sentences) is the obvious next step — your call (question 2).
- **No real Haiku output read** for the new passive prompt.
- **3 acts**: the world after an act is only computed for act 1 → act 2 (`actState`). A 3rd act needs that chain generalized.
- **The climax pair still comes from `climaxOf`**; the destination is planned backward from it, but the pair is not chosen
  for being the best destination.
- **The truth has no timeline of its own** (what happened before the story, in order: Melissa learns of the threat → decides →
  Isa sees part of it…). Facts are static; their order is implied by the motive. Needed for richer mysteries.
- **Others' storylines** don't get their own small circles; they live through their actions on Justin's lines.
- **Data is a first draft** (premier jet): traces, seeds, flaws, moves, reasons, opening spines, the decision rule.
- **The 🎲 can draw odd combinations** (Justin loves Isa *and* is her parent); the orchestrator now ends that romance when it
  comes out, but the draw itself should not make it.

---

## 9. Questions for you (and criticism welcome)

1. **Justin's choice at the climax**: he overcomes his flaw and takes the costly side; a revealed betrayal or blood flips it.
   OK as the rule? Do you also want stories where he *fails* (tragedy), and when?
2. **Slides**: keep the engine's sentences (exact, a bit flat), or an AI pass that rewrites them with the same facts (better,
   needs a key)?
3. **« 1–3 acts »**: is an act a full circle *with its own climax and price* (then a 3-act movie = 3 prices, each world built
   on the last), or is the movie one circle cut in 3 (setup / confrontation / resolution)? I built the first.
4. **The three opening spines** (§ 4): do they match your recipes? The mystery one ends on « C'est l'un d'eux » every time —
   want variations?
5. **Which data do we review first**, together, one at a time: the traces of a crime, the culprit's moves, the flaw's
   failures, or the reasons Justin gives?
6. **Others' storylines**: should a secondary character get a small circle of their own (want → try → fail → change), or stay
   as forces and reactions?

The construction itself — truth → drive and opposition → destination → audience journey → opening → moments → episodes — is
the model you described in § 8 of the text, with your corrections. If something in it is still the wrong responsibility,
that's the part to criticize first.
