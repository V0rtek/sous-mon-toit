// Ton histoire · Épisode 1: one self-contained prompt for a basic model (Justin pastes it, with his idea at the end, into any chat).
// Two parts split by ---: first the seed (the whole story's DNA: who wants what, what can't coexist, the milestones of steps 2-5,
// each one hanging on a choice, never decided in advance), then episode 1 written with the techniques of Infos · Techniques.
// The reply is the same JSON as gen.js (GEN.build plays it), plus "seed"; an episode has 3 choices instead of 2.
// If an episode comes out badly, fix this prompt, never the model.

window.EP1 = (() => {
  const PROMPT = `You write episode 1 of an interactive story for a phone game: dialogue only, shown one line at a time over a picture of the characters, with choices. The player plays "justin". Write every line, button and title in the same language as the player's idea (an idea in French gets a French story). Natural spoken language.

You work in two parts, in this order. Part 1 is the seed of the whole story. Part 2 is episode 1, written from the seed. Both go in ONE JSON object (shape at the end). Reply with that JSON and nothing else.

---

PART 1 · THE SEED

Before writing a single line, build what makes every future conflict and turning point inevitable. Everything later in the story must grow out of something in the seed. The seed decides what COULD happen, never what WILL happen: every milestone hangs on a choice of the player, with two possible outcomes.

The seed contains:
1. "premise": the situation in one sentence: who justin is, what is happening to him, what he can lose.
2. "cast": every character on screen (only the characters of the decor you pick, see DECORS). For each one:
   - "is": who they are TO JUSTIN (his sister, his ex, his boss), never just a job.
   - "wants": one concrete desire, something you could film ("wants James to leave town", not "wants to be happy").
   - "wound": what hurts them and makes them do it. Hidden from the player at the start.
   - "secret": what they hide from justin. It will come out later.
   - "voice": how they talk, in a few words (jokes when nervous, short sentences, swears).
3. "offscreen": 1 or 2 people who never appear but matter (the antagonist can be one), each with a name and what identifies them ("Marc, the gallery owner who holds the photos").
4. "collision": two desires from the cast that cannot both be satisfied. This is the engine of the story.
5. "question": the deep question the story argues about (loyalty or freedom? does a liar deserve a second chance?). Never answered in episode 1.
6. "milestones": exactly 4, in order, one per step of the story:
   - step 2, Escalation + Complication: the situation gets harder to resolve (stakes rise, a complication, a near-success).
   - step 3, Revelation + Recontextualization: a secret or a hidden motive from the cast comes out and changes what the player believed ("wait, I misunderstood everything").
   - step 4, Crisis + Maximum suspense: an impossible choice, a clock, a threat or a sacrifice: max stakes, uncertain outcome.
   - step 5, Payoff: the central question is answered and the choices show their consequences.
   Each milestone has "what" (what happens, specific to these people), "hinges_on" (the choice the player will face) and "if_a" / "if_b" (the two outcomes, both interesting, neither one "correct").
7. "planted": the 3 to 5 things episode 1 must plant so the milestones pay off later (a line, a lie, a look, a name, an object). Each one names the milestone it prepares.

---

PART 2 · EPISODE 1

Episode 1 is step 1 of the story: Investment + Anticipation. The player must care about the characters and want to see what happens. Nothing is resolved. Use the seed: plant everything in "planted", show the "collision" starting, never reveal a "secret" or a "wound" outright (hint at it).

STRUCTURE (a path = the lines a player sees with one option of each choice; 24 taps at most on a path):
- Taps 1-4: the hook. Tap 1 (justin, inner voice): who he is and what is happening to him right now, no backstory. Tap 2 (another character): the problem or the secret that just came into the room. Tap 3 (justin, inner voice): what he is about to lose, and who it hurts. Tap 4 (the same character): an ultimatum, a clock or an accusation that forces a reaction now.
- Choice 1 (tap 5), then its branch: justin's line + 2 to 3 lines where the others react. The two branches really differ.
- The middle (6 to 8 shared lines): make us love the people and the bond between them, expose desires, start the collision (techniques 1 to 5 below).
- Choice 2: a relational choice between two people (technique 6), then its branch (2 to 3 lines).
- 1 or 2 shared lines that raise the pressure.
- Choice 3: the hardest of the episode, each side made attractive or painful to lose (technique 6). Its branch: justin's line + 1 to 2 lines, the last one is the hook: a surprise or a question that opens milestone 1. Then STOP.
Shared lines come after a choice and are seen by both branches: they must hold whatever was picked.

TECHNIQUES (the author's own; apply them silently, never name them):
1. Character engagingness. Show a character in action with the others, never describe them. Ways: camaraderie (in-jokes, teasing, finishing each other's sentences); a shared memory where each one has their own version ("I loved that dog." / "I hated her, she was so loud." / "You cried so much when it happened."); a character tells a short story of their own; a community win (they make a group win, not just themselves); tries to do good (they try to do better and it is not settled yet); one unexpected detail that makes them truer.
2. Relationship engagingness. Make us love the bond, not only each person: a shared past, a gesture of care, what one would lose without the other.
3. Expose desire. Show clearly what each main character wants, in their own words or acts. When two characters want the same thing (Cam wants J / B wants J), that is the collision: show it early, it is strong.
4. Direct confession or threat. Once in the episode, someone says out loud what they feel or will do, no subtext: "I don't think I could survive someone taking Cam away from me."
5. Curiosity. Open loops the player wants closed: an unfinished sentence, a name nobody explains yet, an offscreen antagonist who wants something. Each piece of information comes in steps, and someone reacts between the pieces ("I've got a job for you." / "Huh?" / "Five thousand cash, one night.").
6. Make a choice hard. Each side of a choice has its own technique so the player truly hesitates:
   - stakes by relationship: the side is a person the player is attached to ("Cam invite u over");
   - character positioning: a character takes a side, so the player knows who they will disappoint ("I'm with J on this");
   - tease the choice before it comes ("You can't run forever, on me to pick");
   - personal win against a person: money, status, a title on one side, someone we love on the other;
   - painful consequences, shown concretely: sickness, pain, losing the house, working non-stop.
   Example: "Keep Jamie?" Keep: he made the soccer team win, he is trying to do better. Drop: the team hates him. Both sides feel right.
7. A big moment has an entrance: a look or a silence. After a line that hurts, add {"hush": true} as its own step (once at most).

CLARITY (the mistakes a player cannot forgive; the player knows nothing you know):
A. One new thing per line.
B. No "he", "she", "they", "it", "that guy" unless the player saw who it is in the last 3 lines. The first time someone absent comes up: a name AND what identifies them ("Marc. The guy from the gallery.").
C. Every line answers the line before it (answers, dodges, jokes, pushes back). No trailer lines ("They know everything.", "You have no idea what you're dealing with.").
D. Lines are short: 4 to 12 words, 70 characters at most. People answer with a word, a question, a joke, a half-sentence.
E. No line that only carries information, greets, repeats or explains a feeling. Show it in how they talk.

JUSTIN. Outside a choice, justin's lines are his inner voice, first person ("I"). Inside a choice he speaks out loud. Never write his name in a line, no stage directions, no narration.

CHOICES. Each option has:
- "t": the button, a short line in justin's voice, 27 characters max with spaces (aim for 20). Something he says, never a description: "You're shady." not "Call him out".
- "say": what justin actually says after the tap, same intent, under 70 characters, not a copy of "t" (rawer, funnier, a question, he gets there sideways).
- "tone": one word.
- "then": the branch, the lines after justin speaks (never justin's spoken line again).

DECORS (pick one; only its characters speak, besides justin): "terrasse" = melissa, candy, ruby (a café terrace) · "maison" = ruby, james (inside a house) · "salon" = isa, amare, james (a living room). ruby and melissa are elves, candy is a feline woman, amare is a lion-man. Use these ids in "who" and "to"; in the lines they are called by these names (Ruby, James...).
Poses: listen, surprised, thinking, explaining, angry, holding (holding = restrained, arms crossed). Lightly, not every line. "to" = who they talk to (or "justin").

THE JSON (exactly this shape, "seed" first):
{"seed": {"premise": "...", "cast": [{"id": "ruby", "is": "...", "wants": "...", "wound": "...", "secret": "...", "voice": "..."}], "offscreen": [{"name": "...", "is": "..."}], "collision": "...", "question": "...",
  "milestones": [{"step": 2, "what": "...", "hinges_on": "...", "if_a": "...", "if_b": "..."}, {"step": 3, ...}, {"step": 4, ...}, {"step": 5, ...}],
  "planted": [{"what": "...", "for_step": 2}]},
 "title": "2-4 words",
 "scene": "terrasse" | "maison" | "salon",
 "steps": [ {"who": "<id>", "pose": "<pose>", "to": "<id>", "text": "<one line>"}, {"hush": true}, ..., {"choice": [ {"t": "...", "say": "...", "tone": "...", "then": [ {"who", "pose", "to", "text"}, ... ]}, {...} ]}, ... ],
 "next": ["4 short bullets: what can happen next, one per milestone, each with its 'if' ('If justin protects Ruby, James leaves with the money')"]}

CHECK BEFORE YOU REPLY:
- Every item of "planted" is in a line of the episode.
- No secret or wound is said outright.
- Exactly 3 choices, 2 options each, and nothing after the third choice's branch.
- Count the taps on the longest path: 24 at most.
- Count the characters of every "t": 27 at most.
- Read the first 4 lines as if you knew nothing: no pronoun without a person, no line that answers nothing.`;

  return { PROMPT };
})();
