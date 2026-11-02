// ---- Écrire · Créer (02/11): the whole story in one screen, by taps, almost no text. Who (each one with a pillar, two
// can mix, and a flaw), the inciting incident -> the quest it starts -> the conflict in the way, the first seconds. The
// newcomer's entrance (3 steps) comes from his pillar. Then ▶ = Haiku writes the act, the plan of episode 1 and its
// story, and it plays (act.js); 📋 = the act's prompt, to paste in a chat (its answer goes in Acte › Générer, the seed
// follows). 🧍 on a person = the prompt of a pose sheet with the 6 faces of HIS archetype (the chef's sadness doesn't
// show: he's just serious). Kept on this phone ----
window.FORGE = (() => {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cap = (s) => String(s || '?').charAt(0).toUpperCase() + String(s || '?').slice(1);
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch { /* private window */ } return null; };
  const sprite = (id) => (id === 'isa' && typeof ISA_LOOKS !== 'undefined' ? ISA_LOOKS[0].sprite : id);
  const pose = (id) => { const S = window.SPRITES && SPRITES[sprite(id)]; return S ? (S.poses.listen ? 'listen' : Object.keys(S.poses)[0]) : null; };
  const face = (id) => { const p = pose(id); return `<span class="pFace">${p ? `<img src="chars/${sprite(id)}/${p}.webp" alt="">` : ''}</span>`; };

  // ---- the 8 pillars (what we follow a character for), mixable: the 1st tap = his pillar, the 2nd = the one mixed in.
  // ex = a character who is it; sur = his surprise when he appears (the proof); exp = how the others make us wait for him;
  // faces = his 6 expressions, HIS way (neutral, joy, anger, sadness, fear, his signature) ----
  const PILLARS = [
    { id: 'chef', e: '👑', c: '#ffd60a', n: 'Le chef', ex: 'Markus · Detroit', sur: 'Coincé devant tous, il reprend le contrôle',
      en: 'the leader (respect, charisma): people follow them; they take control of impossible situations',
      surEn: 'cornered in front of everyone, in an impossible situation, they calmly take back control of the room',
      exp: 'others say they have never lost control of a room, and lower their voice when they talk about them',
      faces: ['Listening: still, upright, chin level, calm eyes that weigh the other person.', 'Joy: a short, contained half-smile and a slight nod, nothing more.',
        'Anger: cold and steady, a direct stare, jaw set, no shouting, one hand flat and still.', 'Sadness: it does NOT show: just serious, eyes a little lower, mouth closed, back straight.',
        'Fear: barely visible, one breath held, sharp eyes, already thinking.', 'Signature, taking control: one hand raised at chest height, palm down, calming a room, looking straight ahead.'] },
    { id: 'charmeur', e: '💋', c: '#ff375f', n: 'Le charmeur', ex: 'Flynn Rider · Raiponce', sur: 'Désarme l’hostile d’un mot',
      en: 'the charmer (desire): everyone looks at them, and they know it; a flirty double meaning in every other line',
      surEn: 'someone hostile walks up to them, and one line later that person is smiling',
      exp: 'others warn each other not to fall for them, and one already has',
      faces: ['Listening: weight on one leg, head slightly tilted, a lazy interested smile.', 'Joy: a wide, easy, confident grin, eyes half closed.',
        'Anger: the charm drops at once: no smile, a cool flat stare.', 'Sadness: hidden behind a smile that stops before the eyes.',
        'Fear: a nervous laugh, one hand at the back of the neck.', 'Signature, the look: a slow look up from under the lashes, a knowing smirk, one eyebrow up.'] },
    { id: 'dangereux', e: '🔪', c: '#ff453a', n: 'Le dangereux', ex: 'Joker', sur: 'Ne fait rien. La salle plie',
      en: 'the dangerous one (fear): the room goes quiet when they come in; calm, unpredictable',
      surEn: 'they do nothing at all, say one quiet line, and the whole room gives in',
      exp: 'others lower their voice and tell what happened to the last person who crossed them',
      faces: ['Listening: perfectly still, a faint smile that does not reach the eyes.', 'Joy: a too-wide smile, head tilted, unsettling.',
        'Anger: the smile grows, eyes wide open and fixed, very calm.', 'Sadness: a blank, empty face, eyes somewhere else.',
        'Fear: never: amused instead, a short laugh through the nose.', 'Signature: a slow head tilt, staring right into the camera, hands relaxed.'] },
    { id: 'genie', e: '🧠', c: '#64d2ff', n: 'Le génie', ex: 'Le Professeur · Casa de papel', sur: 'Règle en 10 s ce qui bloquait tout',
      en: 'the genius (competence): they make what is hard look easy; always one step ahead',
      surEn: 'in ten seconds they solve what had everyone stuck, as if it were obvious',
      exp: 'others say they solved what nobody could, and that they always have a plan',
      faces: ['Listening: eyes narrowed, analysing, one finger at the temple.', 'Joy: a small satisfied smile to themselves, looking down.',
        'Anger: a tired, disappointed sigh, eyes closed, pinching the bridge of the nose.', 'Sadness: looks away and fixes a sleeve, says nothing.',
        'Fear: freezes, eyes moving fast, calculating.', 'Signature, explaining: one finger up, a calm and certain look, as if it were obvious.'] },
    { id: 'clown', e: '🤡', c: '#ff9f0a', n: 'Le clown', ex: 'Naruto', sur: 'Fait rire pour couvrir la douleur d’un autre',
      en: 'the clown (warmth): loud, funny, everyone loves them, and the jokes hide something',
      surEn: 'they make the whole room laugh to cover someone else\'s pain, and only the player sees why',
      exp: 'others laugh just remembering their last stunt, then someone says it is not as funny as it looks',
      faces: ['Listening: restless, leaning in, eyes bright, ready to jump in.', 'Joy: a huge open grin, eyes squeezed shut, arms open.',
        'Anger: loud, shouting, fists up.', 'Sadness: a smile that cracks, shining eyes, still trying to joke.',
        'Fear: comically scared, shoulders up, both hands up.', 'Signature: a thumbs up and a cocky grin, chin up, determined.'] },
    { id: 'mysterieux', e: '🌑', c: '#bf5af2', n: 'Le mystérieux', ex: 'Sasuke', sur: 'Répond à côté, et dit juste',
      en: 'the mysterious one (mystery): nobody knows what they want; few words, never explained',
      surEn: 'they answer beside the question, and it turns out to be exactly right',
      exp: 'nobody agrees on who they really are or where they come from',
      faces: ['Listening: arms crossed, eyes half closed, looking past the other person.', 'Joy: the faintest corner of a smile, quickly gone.',
        'Anger: a cold, sharp glare over the shoulder.', 'Sadness: eyes closed, head slightly down, still.',
        'Fear: none shown: eyes narrow, the body ready to move.', 'Signature: turning away, three-quarter back view, looking over the shoulder.'] },
    { id: 'outsider', e: '🥊', c: '#30d158', n: 'L’outsider', ex: 'Rocky', sur: 'Se plante, et on refuse de le lâcher',
      en: 'the underdog (empathy): wants something very badly, everything is against them',
      surEn: 'they fail in front of everyone, get back up, and nobody wants to give up on them',
      exp: 'others say they have no chance, and that they came anyway',
      faces: ['Listening: hopeful, eyes wide, a little hunched.', 'Joy: a shy, disbelieving, huge smile, hands on the chest.',
        'Anger: frustrated, fists tight, eyes wet, leaning forward.', 'Sadness: it shows: wet eyes, lips pressed, holding it in.',
        'Fear: shoulders up, half a step back, chin still up.', 'Signature: a determined fist at chest height, jaw set, shining eyes.'] },
    { id: 'protecteur', e: '🛡️', c: '#0a84ff', n: 'Le protecteur', ex: 'Sam · Le Seigneur des anneaux', sur: 'Prend le coup à la place d’un autre',
      en: 'the protector (loyalty): pays for someone else, always between them and the danger',
      surEn: 'they take the blow (a blame, a threat, a punch) in place of someone else, without a word',
      exp: 'someone says they owe them their life',
      faces: ['Listening: open and warm, leaning slightly toward the other person.', 'Joy: a soft, warm, proud smile.',
        'Anger: fierce, stepping forward, one arm out as if shielding someone behind.', 'Sadness: tired, heavy shoulders, one hand rubbing the face.',
        'Fear: fear for someone else: eyes searching, one hand reaching out.', 'Signature: standing firm, one arm out to the side, shielding someone off-frame.'] },
  ];
  const P = Object.fromEntries(PILLARS.map((p) => [p.id, p]));
  // a flaw: the crack that makes the pillar human (the Mentalist: charmer + genius, but a coward when danger comes)
  const FLAWS = [
    { id: 'lache', e: '🐔', n: 'Lâche', en: 'bold and sure of themselves, until real danger comes: then a coward' },
    { id: 'vice', e: '🍷', n: 'Un vice', en: 'a vice they cannot stop (drink, gambling) that costs them at the worst moment' },
    { id: 'colere', e: '🌋', n: 'Colère', en: 'a temper that breaks at the worst moment' },
    { id: 'menteur', e: '🎭', n: 'Menteur', en: 'lies by reflex, even when the truth would help' },
    { id: 'orgueil', e: '🦚', n: 'Orgueil', en: 'too proud to ask for help or say sorry' },
  ];
  const F = Object.fromEntries(FLAWS.map((f) => [f.id, f]));

  // ---- the decors of the act (act.js DECORS) and who lives there ----
  const DECORS = [{ id: 'taverne', e: '🍺', n: 'Taverne', who: ['melissa', 'candy', 'ruby'] }, { id: 'maison', e: '🏠', n: 'Maison', who: ['ruby', 'james'] },
    { id: 'salon', e: '🛋️', n: 'Salon', who: ['isa', 'amare', 'james'] }];
  const D = Object.fromEntries(DECORS.map((d) => [d.id, d]));

  // ---- inciting incident -> quest -> conflict. X = the one the incident is about, Y = the other one ----
  const INC = [
    { id: 'shift', e: '⚡', n: 'Arrive, tout change', q: 'rival', en: (X) => `${X} arrives, and their arrival shifts everything for justin`, enter: true },
    { id: 'arrive', e: '🚪', n: 'Débarque sans prévenir', q: 'love', en: (X) => `${X} shows up without warning, with something at stake attached to them`, enter: true },
    { id: 'gone', e: '👻', n: 'Disparaît', q: 'find', en: (X) => `${X} disappears: on screen in the first lines, then gone`, enter: false },
  ];
  const QUEST = [
    { id: 'rival', e: '😤', n: 'Chasser le rival', c: 'liked', en: (X, Y) => `get rid of ${X}, the rival who flirts with ${Y}, the one justin loves` },
    { id: 'love', e: '❤️', n: 'Séduire', c: 'taken', en: (X) => `start a romance with ${X}` },
    { id: 'find', e: '🔦', n: 'Retrouver', c: 'danger', en: (X) => `find ${X} back` },
  ];
  const CONF = [
    { id: 'liked', e: '😇', n: 'Tout le monde l’adore', en: (X) => `everyone thinks ${X} is a great person: justin is alone against them` },
    { id: 'taken', e: '💍', n: 'Déjà pris', en: (X, Y, love) => `${love} already has someone else` },
    { id: 'danger', e: '🌲', n: 'Lieu dangereux', en: () => 'to get there, justin must go through a dangerous place of this world' },
  ];
  // the first seconds: give everything at once
  const HOOKS = [
    { id: 'sexy', e: '🔥', n: 'Attirance', en: () => 'Attraction from the first line: hot characters, a look that lasts too long, a flirty double meaning, the others noticing them.' },
    { id: 'where', e: '🔍', n: 'Où ?', en: (X, gone) => (gone ? `Where is ${X}? Their seat is empty, nobody says where they went; the question lasts.` : 'Where is someone? A person who should be there is not; the question lasts.') },
    { id: 'who', e: '👤', n: 'Qui ?', en: (X, gone, enter) => (enter ? `Who is ${X}? The others talk about them before we see them (a precise promise), and say we will meet them soon.` : 'Who is someone? The others talk about a person we do not see, and say we will meet them soon.') },
    { id: 'what', e: '📦', n: 'Quoi ?', en: () => 'What is in it? An object, a room or a letter someone knows the content of and will not tell.' },
    { id: 'stakes', e: '⏳', n: 'Enjeu', en: () => 'Big stakes coming: someone is stressed right before going on stage (walking in, opening a door); we feel the weight before the action.' },
  ];
  const by = (list, id) => list.find((x) => x.id === id) || list[0];

  // ---- the state, kept on this phone ----
  const KEY = 'smt-forge';
  const BASE = () => ({ decor: 'maison', cast: ['ruby', 'james'], pil: { justin: ['charmeur', 'genie'], ruby: ['mysterieux'], james: ['chef'] }, flaw: { justin: 'lache' },
    inc: 'gone', who: 0, quest: 'find', conf: 'danger', hooks: { sexy: 1, where: 1, stakes: 1 } });
  let S = (() => { try { const s = JSON.parse(ls(KEY)); if (s && s.decor && Array.isArray(s.cast)) return { ...BASE(), ...s }; } catch { /* none yet */ } return BASE(); })();
  const save = () => ls(KEY, JSON.stringify(S));
  let el = null, msg = '';

  const people = () => ['justin', ...S.cast];
  const X = () => S.cast[S.who] || S.cast[0], Y = () => S.cast[1 - S.who] || S.cast[1];
  const pillarsOf = (id) => (S.pil[id] || []).filter((p) => P[p]);
  const tag = (id) => { const ps = pillarsOf(id); return ps.length ? ps.map((p) => `${P[p].e} ${P[p].n}`).join(' + ') + (S.flaw[id] ? ` · ${F[S.flaw[id]].e}` : '') : ''; };

  // ---- the seed: what the act's prompt and every episode's plan prompt carry (act.js) ----
  function seed() {
    const x = cap(X()), y = cap(Y()), inc = by(INC, S.inc), q = by(QUEST, S.quest), love = S.quest === 'rival' ? y : x;
    const who = (id) => { const ps = pillarsOf(id), f = S.flaw[id] && F[S.flaw[id]];
      return `- ${id === 'justin' ? 'justin (the player)' : cap(id)}: ${ps.length ? ps.map((p, i) => (i ? `mixed with ${P[p].en}` : P[p].en)).join(', ') : 'free'}${f ? `; flaw: ${f.en}` : ''}. It shows in how they talk and act, every line.`; };
    const pX = P[pillarsOf(X())[0]];
    const text = [`THE CHARACTERS AND THEIR PILLAR (what we follow them for):`, ...people().map(who),
      `THE INCITING INCIDENT (episode 1, it starts the quest): ${inc.en(x)}.`,
      `THE QUEST (what justin goes after): ${q.en(x, y)}.`,
      `THE CONFLICT (what stands in the way): ${by(CONF, S.conf).en(x, y, love)}.`,
      `Fit it in the arc: A's request is about the quest, and giving it hurts B.`].join('\n');
    const hooks = HOOKS.filter((h) => S.hooks[h.id]).map((h) => `- ${h.en(x, S.inc === 'gone', inc.enter)}`);
    const intro = inc.enter && pX ? `INTRODUCE ${x.toUpperCase()} IN 3 STEPS (Présenter un perso): 1. ${x} is not there yet: ${pX.exp}. 2. Someone announces ${x} arrives soon. 3. ${x} appears and proves their pillar: ${pX.surEn}.` : '';
    const ep1 = [...(hooks.length ? ['THE FIRST SECONDS (the most value in the least time, at least two of these in the first lines):', ...hooks] : []), intro].filter(Boolean).join('\n');
    return { decor: S.decor, a: X(), b: Y(), text, ep1, forge: JSON.parse(JSON.stringify(S)) };
  }

  // ---- 🧍 a pose sheet of this character's archetype: his 6 faces, his way (bank.js: the same format as the base sheet) ----
  function sheet(id) {
    const ps = pillarsOf(id), main = P[ps[0]] || P.chef, mix = P[ps[1]];
    const cells = main.faces.slice(0, 4).concat((mix || main).faces.slice(4, 6));
    return `Create a character pose sheet of THIS EXACT character, full body. Image 1 is the reference: it is the character AND the art style. Copy both exactly: face, hair, body, outfit, colors, line, shading. Nothing added, nothing removed.

WHO THEY ARE: ${main.en}${mix ? `, mixed with ${mix.en}` : ''}. Every cell shows an emotion THE WAY THIS ARCHETYPE SHOWS IT, not the generic way: two different archetypes must not look alike.

Format: portrait image, 2:3. An invisible grid of 6 equal cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.

Background: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green.

In every cell: the same character, full body from head to feet, centered, same size, feet at the same height, with a clear margin of green on all sides. No text, no labels, no props.

Angle, the same in all 6 cells: three-quarter view, turned slightly toward the right, like image 1. Camera at chest height.

Row 1, left to right:
1. ${cells[0]}
2. ${cells[1]}
3. ${cells[2]}

Row 2, left to right:
4. ${cells[3]}
5. ${cells[4]}
6. ${cells[5]}

The face says what they feel; the mouth is open only where a cell says so. Keep it natural, like the reference.`;
  }

  // ---- 🎲 everything drawn: a decor, two of its people, pillars, the chain ----
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  function dice() {
    const d = pick(DECORS), w = [...d.who].sort(() => Math.random() - 0.5).slice(0, 2), inc = pick(INC), q = Math.random() < 0.7 ? inc.q : pick(QUEST).id;
    const pl = () => { const a = pick(PILLARS).id; if (Math.random() < 0.5) return [a]; let b; do b = pick(PILLARS).id; while (b === a); return [a, b]; };
    S = { decor: d.id, cast: w, pil: { justin: pl(), [w[0]]: pl(), [w[1]]: pl() }, flaw: { justin: Math.random() < 0.6 ? pick(FLAWS).id : null }, inc: inc.id, who: Math.round(Math.random()),
      quest: q, conf: Math.random() < 0.7 ? by(QUEST, q).c : pick(CONF).id, hooks: { sexy: 1, [inc.id === 'gone' ? 'where' : 'who']: 1, stakes: Math.random() < 0.6 ? 1 : 0, what: Math.random() < 0.3 ? 1 : 0 } };
  }

  // ---- the screen ----
  const chip = (attrs, e, n, on, c) => `<button type="button" class="fChip${on ? ' on' : ''}" ${attrs}${c ? ` style="--c:${c}"` : ''}><span>${e}</span><small>${esc(n)}</small></button>`;
  const row = (icon, inner) => `<section class="fRow"><i class="fI">${icon}</i><div class="fChips">${inner}</div></section>`;
  function person(id) {
    const ps = pillarsOf(id), c = (P[ps[0]] || { c: '#3a3a3c' }).c;
    return `<section class="fWho" style="--c:${c}">${face(id)}<div class="fWhoR"><b>${id === 'justin' ? '🎮 Justin' : cap(id)}<em>${esc(tag(id))}</em></b>`
      + `<div class="fPs">${PILLARS.map((p) => { const k = ps.indexOf(p.id); return `<button type="button" class="fP${k === 0 ? ' on' : k === 1 ? ' mix' : ''}" style="--c:${p.c}" data-pil="${id}:${p.id}" title="${esc(p.n)} · ${esc(p.ex)}">${p.e}</button>`; }).join('')}</div>`
      + `<div class="fPs fFl">${FLAWS.map((f) => `<button type="button" class="fP fl${S.flaw[id] === f.id ? ' on' : ''}" data-flaw="${id}:${f.id}" title="${esc(f.n)}">${f.e}</button>`).join('')}`
      + `<button type="button" class="fPose" data-pose="${id}" title="Prompt de sa feuille de poses">🧍</button></div></div></section>`;
  }
  function render() {
    if (!el) return;
    const d = D[S.decor] || DECORS[0], inc = by(INC, S.inc), x = X(), pX = P[pillarsOf(x)[0]], hasKey = !!ls('smt-key');
    el.innerHTML = `<div class="fTop"><b>⚡ Créer</b><button type="button" class="fDice" data-x="dice" aria-label="Au hasard">🎲</button></div>`
      + row('📍', DECORS.map((o) => chip(`data-decor="${o.id}"`, o.e, o.n, o.id === S.decor, '#8e8e93')).join(''))
      + row('👥', d.who.map((id) => { const k = S.cast.indexOf(id); return `<button type="button" class="fFace${k >= 0 ? ' on' : ''}" data-cast="${id}">${face(id)}${k >= 0 ? `<i>${'AB'[k]}</i>` : ''}<small>${cap(id)}</small></button>`; }).join(''))
      + people().map(person).join('')
      + row('💥', INC.map((o) => chip(`data-inc="${o.id}"`, o.e, o.n, o.id === S.inc, '#ff453a')).join('')
        + `<span class="fSub">${S.cast.map((id, i) => `<button type="button" class="fFace sm${i === S.who ? ' on' : ''}" data-who="${i}">${face(id)}</button>`).join('')}</span>`)
      + row('🎯', QUEST.map((o) => chip(`data-quest="${o.id}"`, o.e, o.n, o.id === S.quest, '#ff9f0a')).join(''))
      + row('⚔️', CONF.map((o) => chip(`data-conf="${o.id}"`, o.e, o.n, o.id === S.conf, '#bf5af2')).join(''))
      + row('⏱️', HOOKS.map((o) => chip(`data-hook="${o.id}"`, o.e, o.n, !!S.hooks[o.id], '#ffd60a')).join(''))
      + (inc.enter && pX ? `<section class="fIntro" style="--c:${pX.c}">${face(x)}<span class="fSt">🗣️</span><span class="fSt">⏰</span><span class="fSt">💥</span><b>${esc(pX.sur)}</b></section>` : '')
      + `<section class="fGo">${hasKey ? '' : '<input type="password" data-key="1" placeholder="Clé API (sk-ant-…)" autocomplete="off">'}`
      + '<button type="button" class="go" data-x="play">▶ Jouer</button><button type="button" data-x="copy">📋 Prompt</button><button type="button" data-x="acte">Acte ›</button></section>'
      + `<p class="pMsg fMsg">${esc(msg)}</p>`;
  }
  const copy = (text, then) => (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { msg = then; render(); }, () => { msg = 'Copie impossible'; render(); });
  function onClick(e) {
    const t = e.target.closest('button'); if (!t || !el.contains(t)) return;
    e.stopPropagation();
    const d = t.dataset; msg = '';
    if (d.decor) { S.decor = d.decor; const w = D[d.decor].who; S.cast = S.cast.filter((id) => w.includes(id)); for (const id of w) if (S.cast.length < 2 && !S.cast.includes(id)) S.cast.push(id); }
    else if (d.cast) { const k = S.cast.indexOf(d.cast); if (k >= 0) S.cast.splice(k, 1); else { if (S.cast.length >= 2) S.cast.shift(); S.cast.push(d.cast); } if (S.who >= S.cast.length) S.who = 0; }
    else if (d.pil) { const [id, p] = d.pil.split(':'), a = (S.pil[id] = pillarsOf(id)), k = a.indexOf(p); if (k >= 0) a.splice(k, 1); else { if (a.length >= 2) a.pop(); a.push(p); } }
    else if (d.flaw) { const [id, f] = d.flaw.split(':'); S.flaw[id] = S.flaw[id] === f ? null : f; }
    else if (d.pose) { save(); return copy(sheet(d.pose), `🧍 ${cap(d.pose)} copié · image 1 = chars/${sprite(d.pose)}/${pose(d.pose) || 'listen'}.webp`); }
    else if (d.inc) { S.inc = d.inc; S.quest = by(INC, d.inc).q; S.conf = by(QUEST, S.quest).c; S.hooks.where = d.inc === 'gone' ? 1 : 0; S.hooks.who = d.inc === 'gone' ? 0 : 1; }
    else if (d.who) S.who = +d.who;
    else if (d.quest) { S.quest = d.quest; S.conf = by(QUEST, d.quest).c; }
    else if (d.conf) S.conf = d.conf;
    else if (d.hook) S.hooks[d.hook] = S.hooks[d.hook] ? 0 : 1;
    else if (d.x === 'dice') dice();
    else if (d.x === 'copy') { if (S.cast.length < 2) { msg = '👥 ×2'; return render(); } const s = seed(); ls('smt-act-seed', JSON.stringify(s)); save();
      return copy(ACT.promptSeed(s), '📋 Copié · la réponse se colle dans Acte › Générer › 1'); }
    else if (d.x === 'acte') { save(); return window.FORGE_TO_ACT && FORGE_TO_ACT(); }
    else if (d.x === 'play') return play(t);
    save(); render();
  }
  async function play(btn) {
    if (S.cast.length < 2) { msg = '👥 ×2'; return render(); }
    const inp = el.querySelector('[data-key]'); if (inp && inp.value.trim()) ls('smt-key', inp.value.trim());
    const key = ls('smt-key'); if (!key) { if (inp) inp.focus(); return; }
    save(); btn.disabled = true;
    const tell = (t) => { const m = el.querySelector('.fMsg'); if (m) m.textContent = t; };
    try { if (window.COUNTER) COUNTER.on = false; const u = await ACT.auto(key, { n: 1, newAct: true, seed: seed() }, tell); if (window.GEN_USED) GEN_USED(u); msg = ''; }
    catch (err) { msg = err.message || 'Ça n’a pas marché.'; btn.disabled = false; render(); }
  }
  function mount(root) { el = root; root.onclick = onClick; msg = ''; render(); }
  return { mount, PILLARS, FLAWS, sheet, seed };
})();
