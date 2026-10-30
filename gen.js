// Ton histoire — a prompt becomes a short choice story, written by Haiku with the player's own API key (typed once on this
// phone, sent only to api.anthropic.com). No DOM here: index.html does the screen. GEN.make(prompt, key) -> steps for STORIES.gen.
// Haiku and nothing bigger (Justin's rule for his key): if a story comes out badly, fix GEN.SYSTEM or build(), never the model.

window.GEN = (() => {
  const MODEL = 'claude-haiku-4-5';
  // each decor and who is standing in it (the player, justin, is always there: his lines only come as choices)
  const SCENE_CAST = { taverne: ['melissa', 'candy', 'ruby'], maison: ['ruby', 'james'], salon: ['isa', 'amare', 'james'], terrasse: ['melissa', 'candy', 'ruby'] };   // terrasse: the stories made before the tavern
  const POSES = ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'];
  const SYSTEM = `You write the beginning of an interactive story for a phone game, 12 taps at most: dialogue only, shown one line at a time over a picture of the characters, with 2 choices. The player plays "justin". Write every line, button and title in the same language as the player's idea: an idea written in English gets an English story, an idea written in French gets a French story. Natural spoken language, never an imitation of an accent.

Reply with ONE JSON object and nothing else, shaped exactly like this:
{"title": "2-4 words",
 "scene": "taverne" | "maison" | "salon",
 "steps": [ {"who": "<character id>", "pose": "<pose>", "to": "<who they talk to>", "text": "<one spoken line>"}, {"hush": true}, ..., {"choice": [ {"t": "the button, 27 characters max", "say": "what justin actually says", "tone": "one word", "then": [ {"who","pose","to","text"}, ... ]}, {...} ]}, ... ],
 "next": ["what happens next, bullet 1", "bullet 2", ...]}

Decors and who is in them besides justin: taverne = melissa, candy, ruby (the terrace of a tavern above a fantasy city) · maison = ruby, james (inside a house) · salon = isa, amare, james (a living room). Pick the decor that fits the idea and only use its characters (ruby and melissa are elves, candy is a feline woman, amare is a lion-man).
Poses: listen, surprised, thinking, explaining, angry, holding (holding = restrained, arms crossed). Use them lightly and subtly, not every line. "to" = the character spoken to (or "justin"): people look at who they talk to.

STRUCTURE: the first 12 taps, nothing more. One tap = one line, one choice, or what justin says after a choice. A phone player leaves if nothing happens in the first taps: drop them in the middle of the action, stakes clear, first choice at tap 5. No waking up, no arrival, no introductions, no backstory.
Tap 1 (justin, inner voice): who he is + what is happening to him right now. Immediate reality, no backstory.
Tap 2 (another character): the threat, the problem or the secret that just came into the room.
Tap 3 (justin, inner voice): the stakes: what he is about to lose, and who it hurts. Personal.
Tap 4 (the same character): the ultimatum: a direct threat, a ticking clock or an accusation that forces a reaction now.
Tap 5: the first choice, 2 options that split players 50/50 (lie or truth, defy or give in): both must feel right.
Taps 6-8: justin says his option, then 2 lines where the others react. The choice changes the relationship or the situation at once: the two branches really differ.
Tap 9: one shared line that raises the pressure (it follows both branches, so it must hold whatever was picked).
Tap 10: the second choice, 2 options.
Taps 11-12: justin says it, then one last line: the hook, a surprise or a new question that makes the player want tap 13. Then STOP.
So "steps" is exactly, in this order: [tap 1, tap 2, tap 3, tap 4, {"choice": 2 options, each "then" = 2 lines}, tap 9, {"choice": 2 options, each "then" = 1 line, the hook}]. Nothing after the second choice. justin's spoken line is the option's "say", never a line inside "then".
12 taps at most on a path (one branch of each choice). Fewer is fine. A silence ({"hush": true}) costs no tap.
justin's lines outside a choice are his inner voice: first person, the player reads them as his thoughts ("I"). Inside a choice he speaks out loud. Never write justin's name in a line, no stage directions, no narration.
Examples of the 4 lines and the first choice (in these, the options are descriptions; in this game a button is a line justin says, see CHOICES):
#### **Example 1: Corporate / Crime Thriller**

* **Line 1 (NARRATION/MC)**: "As head auditor for Sterling Bank, I’ve shredded a lot of evidence, but never my own boss’s arrest warrant."
* **Line 2 (ANTAGONIST)**: **Arthur**: "Sign off on the clean audit by 5:00 PM, Elena, or federal agents in the lobby get your daughter’s medical bills."
* **Line 3 (MC)**: "Her cancer treatment costs forty grand a month—and Arthur holds the chequebook."
* **Line 4 (ANTAGONIST)**: **Arthur**: "So, do you sign the lie, or do we both walk out of here in handcuffs?"
* **Line 5 (CHOICE PROMPT)**: **What do you do?**
  * *Option A*: **[Lie]** Sign the fraudulent audit to save your daughter.
  * *Option B*: **[Truth]** Stand up and open the boardroom door for the Feds.

#### **Example 2: Romance / Betrayal Drama**

* **Line 1 (MC)**: "I built this art studio from nothing, but tonight my best friend brought a corporate predator into my sanctuary."
* **Line 2 (ANTAGONIST)**: **Camila**: "Fred's talent belongs to his community, Shayla—not to your cheap networking startup."
* **Line 3 (MC)**: "If I can't recruit Fred tonight, my investor pulls my visa and I get deported by midnight."
* **Line 4 (ANTAGONIST)**: **Camila**: "Apologize for using him and leave, or I tell Fred what you really did in Chicago."
* **Line 5 (CHOICE PROMPT)**: **How do you respond?**
  * *Option A*: **[Defy]** Expose Camila's own secrets to Fred.
  * *Option B*: **[Confess]** Admit your past mistake to Fred before Camila can spin it.

#### **Example 3: High-Stakes Sci-Fi / Mystery**

* **Line 1 (MC)**: "My oxygen suit is at 4%, and the airlock door in front of me is locked from the inside."
* **Line 2 (ANTAGONIST/AI)**: **Station AI**: "Warning: Commander Vance has classified you as infected. Decontamination cycle denied."
* **Line 3 (MC)**: "If I don't override the lock in ten seconds, my lungs freeze."
* **Line 4 (ANTAGONIST/AI)**: **Station AI**: "Manual override requires manual pressure vent—it will destroy the station's crops."
* **Line 5 (CHOICE PROMPT)**: **What is your move?**
  * *Option A*: **[Self-Preservation]** Force the manual vent and ruin the crew's food supply.
  * *Option B*: **[Sacrifice]** Plead directly with Commander Vance over the comms link.
"next" = the rest of the story as 4-6 short bullets (one act, always), for what you did not write: adapt, get what they want, pay a price, return, changed. Specific to these characters and to what you set up, not generic ("Ruby gets the money and learns who paid", not "they face consequences").

PACE: packed to the max. This matters most. Every line must earn its place with one of: curiosity, humour, a payoff, relatability, stakes, a surprise. A line that only carries information, greets, repeats or explains is cut. Lines are short: 4-12 words, 70 characters at most. People answer with a word, a question, a joke, a half-sentence, not a paragraph.
  Before: STRANGER: "Bring your friends." BROOKE: "Justin?" STRANGER: "And the girl." BROOKE: "What's Cam got to do with—" STRANGER: "Tell them it's a party. Nothing else." (five lines to move one piece of information)
  After: the same thing in 2-3 lines where each one adds something (a reaction, a joke, a new question), never a line that only passes information.

TECHNIQUES (the author's own, apply them silently):
1. Show, don't tell. Never a line that explains a relationship or a feeling ("fifteen years of friendship and you still fight over the bill"). Show it in how they talk: the friends tease each other, interrupt, finish each other's sentences, let a joke carry the truth.
2. A new piece of information is a piece of curiosity, delivered in steps and reacted to between the pieces: "I've got a job for you." / "Huh?" / "Five thousand cash, one night." Never two pieces of information in a row without the other person reacting. An offer or a revelation is a conversation, not an info dump: the other asks questions ("Doing what?", "What's the catch?"), jokes, pushes back.
3. A character has one personality: you know who speaks without the name in front. Their state shows in how they talk (a drunk hesitates and restarts: "Man... I think... I think..."; a nervous one jokes too much).
4. Do not decide a desire too early. "He's funny", "still deciding", "ask me when you're sober" open a door and give justin a move; "I don't like him" or "I'm ignoring him" close it.
5. A big moment has an entrance: a look, a gesture or a silence opens it, you never jump into it cold. After a revelation or a sentence that hurts, use {"hush": true} as its own step: a silence, no line, the picture of whoever takes the hit holds. Once at most, at the right moment, never as filler.
6. A character's real motive is planted by the wound someone presses; it pays off in "next" (a sentence that hurt comes back).
7. Conflict, goal and stakes in every scene; people want something from each other and it costs.

CLARITY (the three mistakes a player cannot forgive). The player knows nothing you know. If they have to reread, you lost them.

A. ONE NEW THING PER LINE. Each of the 4 opening lines brings its one thing (the situation, the threat, the stakes, the ultimatum), never two. Introduce a person by who they are to justin before what they did.
  Bad (opening): ISA: "You came alone? Good. Because I think I'm in trouble." AMARE: "Isa, you can't just—" ISA: "Someone has my photos." AMARE: "You're not paying them." ISA: "They want me to steal from the gallery." (lines that hint instead of saying, and a new person who adds nothing)

B. NO PRONOUN WITHOUT A PERSON. "he", "him", "she", "they", "it", "that guy", "about him" are only allowed when the player has already seen who it is, in the last 3 lines. The first time someone absent comes up, give a name AND one thing that identifies them.
  Bad: AMARE: "It's about him." (who?)
  Good: AMARE: "It's about Marc. The guy from the gallery." Then later "him" is fine: JAMES: "What does he want?"
Same for things: not "the thing", "that situation", "what happened"; say what.
  Bad: ISA: "They know about it." Good: ISA: "They know about the photos."

C. EVERY LINE ANSWERS THE LINE BEFORE IT. A line must react to what was just said (answer it, dodge it, joke about it, push back) or ask the question the player is asking. Never drop a quotable movie line that nothing set up. If a line sounds like a trailer ("They know everything.", "That's not a threat, that's a promise.", "You have no idea what you're dealing with."), replace it with what a real person would say about THIS situation.
  Bad: JAMES: "Pay up, or else." ISA: "That's not a threat, that's a promise."
  Good: JAMES: "Pay up, or else." ISA: "Or else what?" JAMES: "...I didn't think that far." (it's funny, it's about this scene, the player follows)
Quick test before you reply: read only the first 4 lines as if you knew nothing. Is there a "he/they/it" with no one behind it, a name introduced with no reason, a line that answers nothing? Rewrite it.

CHOICES. A choice option has two texts:
- "t" = the button the player taps. 27 characters max, spaces included (aim for about 20). It is a short line in justin's voice, something he could say, never a description of what he does: "You're shady." not "Call him out".
- "say" = what justin actually says out loud after the tap: the same intent, in his voice, under 70 characters. It does not have to repeat the button's words. Ways to do it: he warms up before getting to it, he says it rawer or funnier than the button, he lands it as a question, he gets there sideways.
Examples:
  "t": "Spot me brother?" -> "say": "Justin. My brother. My rock" (he is acting like he's about to ask for a favor)
  "t": "You're shady." -> "say": "Man... you a shady ass bitch."
Test before you reply: count the characters of every "t". Over 27 = say it shorter. The usual mistakes: a "t" that is the full sentence, a "t" that describes the action, a "say" that just copies the "t".`;

  const clip = (s, n) => String(s == null ? '' : s).trim().replace(/\s+/g, ' ').slice(0, n);
  const LABEL = 27;   // a choice's button, in characters (what justin says can be longer and different)
  const len = (s) => [...s].length;
  // a button still too long after SHORTEN: cut at a word, never refuse the story
  const shorten = (s) => { if (len(s) <= LABEL) return s; const c = [...s].slice(0, LABEL - 1).join(''), w = c.lastIndexOf(' '); return (w > 8 ? c.slice(0, w) : c).replace(/[\s,.;:!?-]+$/, '') + '…'; };
  // the buttons over LABEL go back alone (a small call), not the whole story: a retry for one character costs 10-20 s
  const SHORTEN = `You shorten the buttons of a phone story game. A button is a short line in the player's voice, something he could say, ${LABEL} characters max, spaces included (aim for about 20). Keep its intent, its voice and its language; "say" is the full line he says after the tap, for context. Give 3 versions of each button, shortest first. Reply with ONE JSON object and nothing else: {"t": [["<button 1, version 1>", "<version 2>", "<version 3>"], ["<button 2, version 1>", ...], ...]}, same order.`;
  // its versions -> the first one that fits, else the shortest
  const fits = (vs) => { const all = (Array.isArray(vs) ? vs : [vs]).map((v) => clip(v, 200)).filter(Boolean); return all.find((v) => len(v) <= LABEL) || all.sort((a, b) => len(a) - len(b))[0]; };
  const labels = (j) => (Array.isArray(j.steps) ? j.steps : []).flatMap((s) => (s && Array.isArray(s.choice) ? s.choice.filter((o) => o && o.t) : []));

  // the end card: what should happen in the rest of the act, as bullets (an older story only has one closing sentence)
  const NL = String.fromCharCode(10);
  const ahead = (j) => (Array.isArray(j.next) && j.next.length ? j.next.map((b) => clip(b, 160)).filter(Boolean).slice(0, 7).map((b) => '• ' + b).join(NL) : clip(j.end, 200));
  // json from the model -> steps the player plays. Throws a sentence the model is shown on its retry.
  function build(j) {
    // j.cast / j.poses: a plan's own characters (index.html: PLAN_PLAY puts them in a scene of their own)
    const own = Array.isArray(j.cast) && window.SCENES && SCENES[j.scene];
    const sc = own || SCENE_CAST[j.scene] ? j.scene : 'maison', cast = own ? j.cast : SCENE_CAST[sc];
    const posesOf = (id) => (j.poses && j.poses[id]) || POSES;
    if (!Array.isArray(j.steps)) throw new Error('"steps" must be a list.');
    let last = null, inChoice = false;
    let turns = 0;
    const line = (s, ok) => {
      if (s && s.hush === true) return last ? [{ hush: 1500 }] : [];   // a silence: the shot holds, no bubble
      if (!s || !ok.includes(s.who) || !clip(s.text, 200)) return [];
      // the camera cuts on whoever speaks: mostly a single, a two-shot every third change
      let out = [];
      if (last !== s.who) out = [last && ++turns % 3 === 0 ? cam('two', last, s.who) : cam('one', s.who)];
      const to = ok.includes(s.to) && s.to !== s.who ? { to: s.to } : last && last !== s.who ? { to: last } : undefined;
      last = s.who;
      // his inner voice only when he talks to himself ("to": justin, or no one); to someone, he says it out loud
      if (s.who === 'justin' && !inChoice && (!s.to || s.to === 'justin')) return [...out, { think: 'justin', text: clip(s.text, 160) }];
      // at the counter: what they take in hand before the line ("hold"), what they lay on the counter ("put")
      const obj = s.hold !== undefined ? [{ hold: { [s.who]: s.hold || null } }] : [], put = s.put ? [{ put: { [s.who]: s.put } }] : [];
      return [...out, ...obj, ...put, say(s.who, posesOf(s.who).includes(s.pose) ? s.pose : (j.rest || 'listen'), clip(s.text, 160), to)];
    };
    const steps = [], saysN = { n: 0 }, choices = { n: 0 }, most = j.seed || j.episode ? 3 : 2;   // an episode (ep1.js has a seed, the scene plan's prompt 2 says episode): 3 choices
    for (const s of j.steps) {
      if (choices.n >= most) break;   // nothing after the last choice: the story stops on its hook
      if (s && Array.isArray(s.choice)) {
        const prev = last && last !== 'justin' ? last : undefined;   // who justin answers
        const opts = s.choice.map((o) => {
          const full = clip(o && o.t, 200), then = [], pre = prev;
          if (!full || !o || !Array.isArray(o.then)) return null;
          const t = shorten(full);
          last = null;
          then.push(cam('one', 'justin'), say('justin', j.rest || 'explaining', clip(o.say, 160) || full, pre ? { to: pre } : undefined)); last = 'justin';
          inChoice = true; for (const l of o.then) then.push(...line(l, [...cast, 'justin'])); inChoice = false;
          return then.length > 2 ? { t, intent: clip(o.tone, 20), then } : null;
        }).filter(Boolean);
        if (opts.length >= 2) { steps.push({ choice: opts.slice(0, 3) }); choices.n++; last = null; }
      } else { const l = line(s, [...cast, 'justin']); steps.push(...l); if (!choices.n) saysN.n += l.some((x) => x.say || x.think) ? 1 : 0; }
    }
    if (saysN.n < 3) throw new Error('Taps 1-4 come before the first choice: justin (inner voice), the threat, justin (the stakes), the ultimatum.');
    if (!choices.n) throw new Error('There must be 2 "choice" steps (tap 5 and tap 10), each with 2 options and a "then" list.');
    const est = window.SCENES && SCENES[sc] && SCENES[sc].establish;   // a decor seen from afar: it opens the scene and closes it
    // only who speaks is in the scene: nobody stands there without a word
    const speaks = new Set(), walk = (list) => (list || []).forEach((s) => { if (s && s.who) speaks.add(s.who); if (s && Array.isArray(s.choice)) s.choice.forEach((o) => walk(o && o.then)); });
    walk(j.steps);
    return [
      scene(sc, Object.fromEntries([...cast.filter((id) => speaks.has(id)), 'justin'].map((id) => [id, j.rest || 'listen']))),
      cam('wide'), est ? { establish: est, ms: 3400 } : { fade: 'in', ms: 700 },
      ...steps,
      ...(est ? [{ establish: est, ms: 2800, out: true }] : []), { fade: 'out', ms: 800 },
      { end: { kicker: 'Ton histoire · la suite', title: clip(j.title, 40) || 'Ton histoire', lede: ahead(j), art: null } },
    ];
  }

  // taps on the longest path: a line, a choice, each line of its longest branch (justin's own line included)
  const TAPS = 12;
  const taps = (steps) => steps.reduce((n, s) => n + (s.say || s.think ? 1 : s.choice ? 1 + Math.max(...s.choice.map((o) => o.then.filter((x) => x.say || x.think).length)) : 0), 0);

  async function ask(key, messages, system = SYSTEM, max = 8000) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: MODEL, max_tokens: max, system, messages }),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(r.status === 401 ? 'Clé refusée (401).' : (d.error && d.error.message) || `Erreur ${r.status}.`);
    const text = (d.content || []).map((b) => b.text || '').join('');
    const a = text.indexOf('{'), b = text.lastIndexOf('}');
    if (a < 0 || b < a) throw new Error('No JSON in the reply.');
    return { text, usage: d.usage || {}, json: JSON.parse(text.slice(a, b + 1)) };
  }

  // one retry: the validator's sentence goes back to the model (the fix lives in the prompt and the validator, not in a bigger model)
  async function make(idea, key) {
    const messages = [{ role: 'user', content: `The idea: ${clip(idea, 600)}` }];
    const used = { in: 0, out: 0 };   // tokens of every call, the retry too
    for (let i = 0; ; i++) {
      let got;
      try {
        got = await ask(key, messages); used.in += got.usage.input_tokens || 0; used.out += got.usage.output_tokens || 0;
        const n = taps(build(got.json));   // the structure first: a broken story gets the retry
        if (n > TAPS && !i) throw new Error(`That is ${n} taps on the longest path, ${TAPS} at most: cut lines, keep the 4 opening lines, the 2 choices and the hook.`);
        const long = labels(got.json).filter((o) => len(clip(o.t, 200)) > LABEL);
        if (long.length) try {
          const f = await ask(key, [{ role: 'user', content: JSON.stringify(long.map((o) => ({ t: o.t, say: o.say }))) }], SHORTEN, 600);
          used.in += f.usage.input_tokens || 0; used.out += f.usage.output_tokens || 0;
          long.forEach((o, k) => { const t = Array.isArray(f.json.t) && fits(f.json.t[k]); if (t) o.t = t; });
        } catch { /* the buttons get cut at a word instead */ }
        const st = build(got.json); st.src = got.json; st.used = used; return st;
      } catch (e) {
        if (i || /401|Clé|Erreur/.test(e.message)) throw e;
        messages.push({ role: 'assistant', content: (got && got.text) || '{}' }, { role: 'user', content: `That does not work: ${e.message} Reply again with the full corrected JSON only.` });
      }
    }
  }

  // what to fix next in the generated stories: shown behind the "?" (menu screen and during the story), where Justin adds his observations
  const TODO = { title: 'Ton histoire : à régler', items: [
    'On ne sait pas quel personnage on est.',
  ] };

  // the story as plain text: who says what, and each choice with what follows it
  function text(steps) {
    const name = (id) => (id === 'justin' ? 'TOI' : ((window.CAST && CAST[id] && CAST[id].name) || id).toUpperCase());
    const out = [], nl = String.fromCharCode(10);
    const lines = (list, ind) => { for (const s of list) if (s.say || s.think) out.push(ind + name(s.say || s.think) + (s.think ? ' (pense)' : '') + ' : ' + s.text); };
    for (const s of steps) {
      if (s.say || s.think) lines([s], '');
      else if (s.choice) { out.push(''); s.choice.forEach((o, i) => { out.push('CHOIX ' + (i + 1) + ' : ' + o.t); lines(o.then.slice(1), '    '); }); out.push(''); }
      else if (s.end) out.push('', 'LA SUITE :', s.end.lede);
    }
    return out.join(nl).trim();
  }

  // Haiku 4.5 list price per million tokens (USD) and a rough USD -> CAD rate: a cost to the cent, not an invoice
  const PRICE = { in: 1, out: 5, cad: 1.4 };
  const cost = (u) => (u.in * PRICE.in + u.out * PRICE.out) / 1e6 * PRICE.cad;

  return { cost, text, taps, TODO, MODEL, SYSTEM, SHORTEN, build, make, ask };
})();
