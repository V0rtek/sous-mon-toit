// Ton histoire — a prompt becomes a short choice story, written by Haiku with the player's own API key (typed once on this
// phone, sent only to api.anthropic.com). No DOM here: index.html does the screen. GEN.make(prompt, key) -> steps for STORIES.gen.
// Haiku and nothing bigger (Justin's rule for his key): if a story comes out badly, fix GEN.SYSTEM or build(), never the model.

window.GEN = (() => {
  const MODEL = 'claude-haiku-4-5';
  // each decor and who is standing in it (the player, justin, is always there: his lines only come as choices)
  const SCENE_CAST = { terrasse: ['melissa', 'candy', 'ruby'], maison: ['ruby', 'james'], salon: ['isa', 'amare', 'james'] };
  const POSES = ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'];
  const SYSTEM = `You write a very short interactive story for a phone game: dialogue only, shown one line at a time over a picture of the characters. The player plays "justin". Write every line, button and title in the same language as the player's idea: an idea written in English gets an English story, an idea written in French gets a French story.

Reply with ONE JSON object and nothing else, shaped exactly like this:
{"title": "2-4 words",
 "scene": "terrasse" | "maison" | "salon",
 "steps": [ {"who": "<character id>", "pose": "<pose>", "text": "<one spoken line>"}, ..., {"choice": [ {"t": "the button, 27 characters max", "say": "what justin actually says", "tone": "one word", "then": [ {"who","pose","text"}, ... ]}, {...}, {...} ]}, ... ],
 "end": "one closing sentence"}

Decors and who is in them besides justin: terrasse = melissa, candy, ruby (a café terrace) · maison = ruby, james (inside a house) · salon = isa, amare, james (a living room). Pick the decor that fits the idea and only use its characters (ruby and melissa are elves, candy is a feline woman, amare is a lion-man).
Poses: listen, surprised, thinking, explaining, angry, holding (holding = restrained, arms crossed). Use them lightly, not every line.

Structure: 4-5 lines to set up a want or a tension, then a choice (3 options, 2-3 lines each branch), then 2-3 lines, then a second choice (3 options, 2 lines each branch), then 2 lines, then "end". The branches must really differ in how the others react. Lines are short, spoken, human: under 90 characters, no stage directions, no narration, never write justin's name. In "steps", justin only speaks inside a choice.

A choice option has two texts:
- "t" = the button the player taps. 27 characters max, spaces included (aim for about 20). It is a short line in justin's voice, something he could say, never a description of what he does: "You're shady." not "Call him out".
- "say" = what justin actually says out loud after the tap: the same intent, in his voice, under 90 characters. It does not have to repeat the button's words. Ways to do it: he warms up before getting to it, he says it rawer or funnier than the button, he lands it as a question, he gets there sideways.
Examples:
  "t": "Spot me, brother?" -> "say": "Bro. My brother. My rock." (he is acting like he's about to ask for a favor)
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

  // json from the model -> steps the player plays. Throws a sentence the model is shown on its retry.
  function build(j) {
    const sc = SCENE_CAST[j.scene] ? j.scene : 'maison', cast = SCENE_CAST[sc];
    if (!Array.isArray(j.steps)) throw new Error('"steps" must be a list.');
    let last = null;
    const line = (s, ok) => {
      if (!s || !ok.includes(s.who) || !clip(s.text, 200)) return [];
      const out = last === s.who ? [] : [cam('one', s.who)]; last = s.who;
      return [...out, say(s.who, POSES.includes(s.pose) ? s.pose : 'listen', clip(s.text, 160))];
    };
    const steps = [], saysN = { n: 0 }, choices = { n: 0 };
    for (const s of j.steps) {
      if (s && Array.isArray(s.choice)) {
        const opts = s.choice.map((o) => {
          const full = clip(o && o.t, 200), then = [];
          if (!full || !o || !Array.isArray(o.then)) return null;
          const t = shorten(full);
          last = null;
          then.push(cam('one', 'justin'), say('justin', 'explaining', clip(o.say, 160) || full)); last = 'justin';
          for (const l of o.then) then.push(...line(l, [...cast, 'justin']));
          return then.length > 2 ? { t, intent: clip(o.tone, 20), then } : null;
        }).filter(Boolean);
        if (opts.length >= 2) { steps.push({ choice: opts.slice(0, 3) }); choices.n++; last = null; }
      } else { const l = line(s, cast); steps.push(...l); saysN.n += l.length ? 1 : 0; }
    }
    if (saysN.n < 3) throw new Error('There must be at least 3 spoken lines outside the choices, from the characters of the decor you picked.');
    if (!choices.n) throw new Error('There must be at least one "choice" step with 2-3 options, each with a "then" list.');    return [
      scene(sc, Object.fromEntries([...cast, 'justin'].map((id) => [id, 'listen']))),
      cam('wide'), { fade: 'in', ms: 700 },
      ...steps,
      { fade: 'out', ms: 800 },
      { end: { kicker: 'Ton histoire', title: clip(j.title, 40) || 'Ton histoire', lede: clip(j.end, 200), art: null } },
    ];
  }

  async function ask(key, messages, system = SYSTEM, max = 3000) {
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
      else if (s.end) out.push('', 'FIN : ' + s.end.lede);
    }
    return out.join(nl).trim();
  }

  // Haiku 4.5 list price per million tokens (USD) and a rough USD -> CAD rate: a cost to the cent, not an invoice
  const PRICE = { in: 1, out: 5, cad: 1.4 };
  const cost = (u) => (u.in * PRICE.in + u.out * PRICE.out) / 1e6 * PRICE.cad;

  return { cost, text, TODO, MODEL, SYSTEM, SHORTEN, build, make, ask };
})();
