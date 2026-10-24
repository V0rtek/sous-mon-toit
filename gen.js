// Ton histoire — a prompt becomes a short choice story, written by Haiku with the player's own API key (typed once on this
// phone, sent only to api.anthropic.com). No DOM here: index.html does the screen. GEN.make(prompt, key) -> steps for STORIES.gen.
// Haiku and nothing bigger (Justin's rule for his key): if a story comes out badly, fix GEN.SYSTEM or build(), never the model.

window.GEN = (() => {
  const MODEL = 'claude-haiku-4-5';
  // each decor and who is standing in it (the player, justin, is always there: his lines only come as choices)
  const SCENE_CAST = { terrasse: ['melissa', 'candy', 'ruby'], maison: ['ruby', 'james'], salon: ['isa', 'amare', 'james'] };
  const POSES = ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'];
  const SYSTEM = `You write a very short interactive story for a phone game: dialogue only, shown one line at a time over a picture of the characters. The player plays "justin". Write in the language of the player's idea.

Reply with ONE JSON object and nothing else, shaped exactly like this:
{"title": "2-4 words",
 "scene": "terrasse" | "maison" | "salon",
 "steps": [ {"who": "<character id>", "pose": "<pose>", "text": "<one spoken line>"}, ..., {"choice": [ {"t": "what justin says (short)", "tone": "one word", "then": [ {"who","pose","text"}, ... ]}, {...}, {...} ]}, ... ],
 "end": "one closing sentence"}

Decors and who is in them besides justin: terrasse = melissa, candy, ruby (a café terrace) · maison = ruby, james (inside a house) · salon = isa, amare, james (a living room). Pick the decor that fits the idea and only use its characters (ruby and melissa are elves, candy is a feline woman, amare is a lion-man).
Poses: listen, surprised, thinking, explaining, angry, holding (holding = restrained, arms crossed). Use them lightly, not every line.

Structure: 4-5 lines to set up a want or a tension, then a choice (3 options, 2-3 lines each branch), then 2-3 lines, then a second choice (3 options, 2 lines each branch), then 2 lines, then "end". The branches must really differ in how the others react. Lines are short, spoken, human: under 90 characters, no stage directions, no narration, never write justin's name. In "steps", justin only speaks inside a choice's "t".`;

  const clip = (s, n) => String(s == null ? '' : s).trim().replace(/\s+/g, ' ').slice(0, n);

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
          const t = clip(o && o.t, 80), then = [];
          if (!t || !o || !Array.isArray(o.then)) return null;
          last = null;
          then.push(cam('one', 'justin'), say('justin', 'explaining', t)); last = 'justin';
          for (const l of o.then) then.push(...line(l, [...cast, 'justin']));
          return then.length > 2 ? { t, intent: clip(o.tone, 20), then } : null;
        }).filter(Boolean);
        if (opts.length >= 2) { steps.push({ choice: opts.slice(0, 3) }); choices.n++; last = null; }
      } else { const l = line(s, cast); steps.push(...l); saysN.n += l.length ? 1 : 0; }
    }
    if (saysN.n < 3) throw new Error('There must be at least 3 spoken lines outside the choices, from the characters of the decor you picked.');
    if (!choices.n) throw new Error('There must be at least one "choice" step with 2-3 options, each with a "then" list.');
    return [
      scene(sc, Object.fromEntries([...cast, 'justin'].map((id) => [id, 'listen']))),
      cam('wide'), { fade: 'in', ms: 700 },
      ...steps,
      { fade: 'out', ms: 800 },
      { end: { kicker: 'Ton histoire', title: clip(j.title, 40) || 'Ton histoire', lede: clip(j.end, 200), art: null } },
    ];
  }

  async function ask(key, messages) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: MODEL, max_tokens: 3000, system: SYSTEM, messages }),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(r.status === 401 ? 'Clé refusée (401).' : (d.error && d.error.message) || `Erreur ${r.status}.`);
    const text = (d.content || []).map((b) => b.text || '').join('');
    const a = text.indexOf('{'), b = text.lastIndexOf('}');
    if (a < 0 || b < a) throw new Error('No JSON in the reply.');
    return { text, json: JSON.parse(text.slice(a, b + 1)) };
  }

  // one retry: the validator's sentence goes back to the model (the fix lives in the prompt and the validator, not in a bigger model)
  async function make(idea, key) {
    const messages = [{ role: 'user', content: `The idea: ${clip(idea, 600)}` }];
    for (let i = 0; ; i++) {
      let got;
      try { got = await ask(key, messages); return build(got.json); } catch (e) {
        if (i || /401|Clé|Erreur/.test(e.message)) throw e;
        messages.push({ role: 'assistant', content: (got && got.text) || '{}' }, { role: 'user', content: `That does not work: ${e.message} Reply again with the full corrected JSON only.` });
      }
    }
  }

  return { MODEL, SYSTEM, build, make, ask };
})();
