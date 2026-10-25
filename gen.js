// Ton histoire — a prompt becomes a short choice story, written by Haiku with the player's own API key (typed once on this
// phone, sent only to api.anthropic.com). No DOM here: index.html does the screen. GEN.make(prompt, key) -> steps for STORIES.gen.
// Haiku and nothing bigger (Justin's rule for his key): if a story comes out badly, fix GEN.SYSTEM or build(), never the model.

window.GEN = (() => {
  const MODEL = 'claude-haiku-4-5';
  // each decor and who is standing in it (the player, justin, is always there: his lines only come as choices)
  const SCENE_CAST = { terrasse: ['melissa', 'candy', 'ruby'], maison: ['ruby', 'james'], salon: ['isa', 'amare', 'james'] };
  const POSES = ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'];
  const SYSTEM = `You write a short interactive mini-story for a phone game: dialogue only, shown one line at a time over a picture of the characters, with 3-4 choices. The player plays "justin". Write every line, button and title in the same language as the player's idea: an idea written in English gets an English story, an idea written in French gets a French story. Natural spoken language, never an imitation of an accent.

Reply with ONE JSON object and nothing else, shaped exactly like this:
{"title": "2-4 words",
 "scene": "terrasse" | "maison" | "salon",
 "steps": [ {"who": "<character id>", "pose": "<pose>", "to": "<who they talk to>", "text": "<one spoken line>"}, {"hush": true}, ..., {"choice": [ {"t": "the button, 27 characters max", "say": "what justin actually says", "tone": "one word", "then": [ {"who","pose","to","text"}, ... ]}, {...}, {...} ]}, ... ],
 "next": ["what happens next, bullet 1", "bullet 2", ...]}

Decors and who is in them besides justin: terrasse = melissa, candy, ruby (a café terrace) · maison = ruby, james (inside a house) · salon = isa, amare, james (a living room). Pick the decor that fits the idea and only use its characters (ruby and melissa are elves, candy is a feline woman, amare is a lion-man).
Poses: listen, surprised, thinking, explaining, angry, holding (holding = restrained, arms crossed). Use them lightly and subtly, not every line. "to" = the character spoken to (or "justin"): people look at who they talk to.

STRUCTURE: the start of a story, built on the first three steps of the story circle. Write only these three, in order, never the middle of a film:
1. STATUS QUO: who justin and the others are in their normal life, one ordinary moment that shows their relationships and what each wants (3-6 lines, one choice may come inside it). Nothing has happened yet. No thriller, no threat, no secret in the first lines.
2. WANT: someone wants something specific, and what it would cost is clear (4-8 lines, then a choice).
3. UNFAMILIAR SITUATION: a new situation enters that challenges what they believe (the offer, the visitor, the news), delivered in steps with reactions between the pieces; it ends on a hook, with a last choice that commits justin to going in (6-10 lines).
About 18-26 spoken lines in all (counting one branch of each choice), 2-3 choices (3 options each, 2-4 lines per branch). Each choice must push the story forward. The lines that follow a choice are shared by every option, so they must hold whatever the player picked; the branches themselves must really differ in how the others react. In "steps", justin only speaks inside a choice. Never write justin's name in a line, no stage directions, no narration. Then STOP: do not play the rest.
"next" = the rest of the story as 4-6 short bullets (one act, always), for the steps you did not write: adapt, get what they want, pay a price, return, changed. Specific to these characters and to what you set up, not generic ("Ruby gets the money and learns who paid", not "they face consequences").

PACE: packed to the max. This matters most. Every line must earn its place with one of: curiosity, humour, a payoff, relatability, stakes, a surprise. A line that only carries information, greets, repeats or explains is cut. Lines are short: 4-12 words, 70 characters at most. People answer with a word, a question, a joke, a half-sentence, not a paragraph.
  Before: STRANGER: "Bring your friends." BROOKE: "Justin?" STRANGER: "And the girl." BROOKE: "What's Cam got to do with—" STRANGER: "Tell them it's a party. Nothing else." (five lines to move one piece of information)
  After: the same thing in 2-3 lines where each one adds something (a reaction, a joke, a new question), never a line that only passes information.

TECHNIQUES (the author's own, apply them silently):
1. Show, don't tell. Never a line that explains a relationship or a feeling ("fifteen years of friendship and you still fight over the bill"). Show it in how they talk: the friends tease each other, interrupt, finish each other's sentences, let a joke carry the truth.
2. A new piece of information is a piece of curiosity, delivered in steps and reacted to between the pieces: "I've got a job for you." / "Huh?" / "Five thousand cash, one night." Never two pieces of information in a row without the other person reacting. An offer or a revelation is a conversation, not an info dump: the other asks questions ("Doing what?", "What's the catch?"), jokes, pushes back.
3. A character has one personality: you know who speaks without the name in front. Their state shows in how they talk (a drunk hesitates and restarts: "Man... I think... I think..."; a nervous one jokes too much).
4. Do not decide a desire too early. "He's funny", "still deciding", "ask me when you're sober" open a door and give justin a move; "I don't like him" or "I'm ignoring him" close it.
5. A big moment has an entrance: a look, a gesture or a silence opens it, you never jump into it cold. After a revelation or a sentence that hurts, use {"hush": true} as its own step: a silence, no line, the picture of whoever takes the hit holds. Use it 3-4 times in the whole story at the right moments, never as filler.
6. A character's real motive must be understood by the end, planted by the wound someone presses, and echoed later (a sentence that hurt comes back).
7. Conflict, goal and stakes in every scene; people want something from each other and it costs.

CLARITY (the three mistakes a player cannot forgive). The player knows nothing you know. If they have to reread, you lost them.

A. ONE NEW THING AT A TIME. In the first 8 lines, at most one new fact and one new name per two lines. Introduce a person by who they are to the others before what they did. A fact comes in only when a line before it made the player ask for it.
  Bad (opening): ISA: "You came alone? Good. Because I think I'm in trouble." AMARE: "Isa, you can't just—" ISA: "Someone has my photos." AMARE: "You're not paying them." ISA: "They want me to steal from the gallery." (a threat, photos, blackmail, a gallery, a deadline, in 8 lines)
  Good: ISA: "Dinner's at eight. Don't be late again." AMARE: "I was late once." ISA: "Twice. Since Tuesday." JAMES: "He's counting." (three people, one fact: justin is always late; the player knows the room)
  Then each new thing gets its own lines, with a reaction between: ISA: "Someone sent me a message." / JAMES: "Sent what?" / ISA: "A photo. Of the gallery." / AMARE: "Which gallery?"

B. NO PRONOUN WITHOUT A PERSON. "he", "him", "she", "they", "it", "that guy", "about him" are only allowed when the player has already seen who it is, in the last 3 lines. The first time someone absent comes up, give a name AND one thing that identifies them.
  Bad: AMARE: "It's about him." (who?)
  Good: AMARE: "It's about Marc. The guy from the gallery." Then later "him" is fine: JAMES: "What does he want?"
Same for things: not "the thing", "that situation", "what happened"; say what.
  Bad: ISA: "They know about it." Good: ISA: "They know about the photos."

C. EVERY LINE ANSWERS THE LINE BEFORE IT. A line must react to what was just said (answer it, dodge it, joke about it, push back) or ask the question the player is asking. Never drop a quotable movie line that nothing set up. If a line sounds like a trailer ("They know everything.", "That's not a threat, that's a promise.", "You have no idea what you're dealing with."), replace it with what a real person would say about THIS situation.
  Bad: JAMES: "Pay up, or else." ISA: "That's not a threat, that's a promise."
  Good: JAMES: "Pay up, or else." ISA: "Or else what?" JAMES: "...I didn't think that far." (it's funny, it's about this scene, the player follows)
Quick test before you reply: read only the first 8 lines as if you knew nothing. Is there a "he/they/it" with no one behind it, a name introduced with no reason, a line that answers nothing? Rewrite it.

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
    const sc = SCENE_CAST[j.scene] ? j.scene : 'maison', cast = SCENE_CAST[sc];
    if (!Array.isArray(j.steps)) throw new Error('"steps" must be a list.');
    let last = null;
    let turns = 0;
    const line = (s, ok) => {
      if (s && s.hush === true) return last ? [{ hush: 1500 }] : [];   // a silence: the shot holds, no bubble
      if (!s || !ok.includes(s.who) || !clip(s.text, 200)) return [];
      // the camera cuts on whoever speaks: mostly a single, a two-shot every third change
      let out = [];
      if (last !== s.who) out = [last && ++turns % 3 === 0 ? cam('two', last, s.who) : cam('one', s.who)];
      const to = ok.includes(s.to) && s.to !== s.who ? { to: s.to } : last && last !== s.who ? { to: last } : undefined;
      last = s.who;
      return [...out, say(s.who, POSES.includes(s.pose) ? s.pose : 'listen', clip(s.text, 160), to)];
    };
    const steps = [], saysN = { n: 0 }, choices = { n: 0 };
    for (const s of j.steps) {
      if (s && Array.isArray(s.choice)) {
        const prev = last && last !== 'justin' ? last : undefined;   // who justin answers
        const opts = s.choice.map((o) => {
          const full = clip(o && o.t, 200), then = [], pre = prev;
          if (!full || !o || !Array.isArray(o.then)) return null;
          const t = shorten(full);
          last = null;
          then.push(cam('one', 'justin'), say('justin', 'explaining', clip(o.say, 160) || full, pre ? { to: pre } : undefined)); last = 'justin';
          for (const l of o.then) then.push(...line(l, [...cast, 'justin']));
          return then.length > 2 ? { t, intent: clip(o.tone, 20), then } : null;
        }).filter(Boolean);
        if (opts.length >= 2) { steps.push({ choice: opts.slice(0, 3) }); choices.n++; last = null; }
      } else { const l = line(s, cast); steps.push(...l); saysN.n += l.some((x) => x.say) ? 1 : 0; }
    }
    if (saysN.n < 8) throw new Error('At least 8 spoken lines outside the choices (about 18-26 in all), from the characters of the decor you picked.');
    if (choices.n < 2) throw new Error('There must be 2 or 3 "choice" steps spread through the three steps, each with 3 options and a "then" list.');    return [
      scene(sc, Object.fromEntries([...cast, 'justin'].map((id) => [id, 'listen']))),
      cam('wide'), { fade: 'in', ms: 700 },
      ...steps,
      { fade: 'out', ms: 800 },
      { end: { kicker: 'Ton histoire · la suite', title: clip(j.title, 40) || 'Ton histoire', lede: ahead(j), art: null } },
    ];
  }

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
        build(got.json);   // the structure first: a broken story gets the retry
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
    const lines = (list, ind) => { for (const s of list) if (s.say) out.push(ind + name(s.say) + ' : ' + s.text); };
    for (const s of steps) {
      if (s.say) lines([s], '');
      else if (s.choice) { out.push(''); s.choice.forEach((o, i) => { out.push('CHOIX ' + (i + 1) + ' : ' + o.t); lines(o.then.slice(1), '    '); }); out.push(''); }
      else if (s.end) out.push('', 'LA SUITE :', s.end.lede);
    }
    return out.join(nl).trim();
  }

  // Haiku 4.5 list price per million tokens (USD) and a rough USD -> CAD rate: a cost to the cent, not an invoice
  const PRICE = { in: 1, out: 5, cad: 1.4 };
  const cost = (u) => (u.in * PRICE.in + u.out * PRICE.out) / 1e6 * PRICE.cad;

  return { cost, text, TODO, MODEL, SYSTEM, SHORTEN, build, make, ask };
})();
