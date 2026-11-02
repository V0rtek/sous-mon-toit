// ---- Écrire · Créer (02/11): the PLOT of an act, by taps, almost no text (the scenes are Plan de scène's job). Three
// layers: WHAT (the place, who, their pillar and flaw, what each one wants and from whom, their relations, the infos the
// AI invents: a secret, a shared past...), HOW (1. the engine: the inciting incident, the conflicts of desire it finds by
// itself, why it's hard; 2. the plot techniques), OUTPUT (the events of the 5 episodes, worked out here from the rest:
// the newcomer's 🗣️ → ⏰ → 💥, the choices). Then ▶ = Haiku writes the act, the plan of episode 1 and its story, and it
// plays (act.js); 📋 = the act's prompt. Each episode's plan prompt gets its own events. 🧍 = the pose sheets. Kept here ----
window.FORGE = (() => {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cap = (s) => String(s || '?').charAt(0).toUpperCase() + String(s || '?').slice(1);
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch { /* private window */ } return null; };
  const sprite = (id) => (id === 'isa' && typeof ISA_LOOKS !== 'undefined' ? ISA_LOOKS[0].sprite : (window.CAST && CAST[id] && CAST[id].sprite) || id);
  // who can be cast: every character of the game (CAST) whose sheet has the 6 base poses (Banque › the base sheet:
  // listen, surprised, thinking, explaining, angry, holding), whatever the place; one per picture (rocco is amare's)
  const NOT_CAST = ['justin', 'kai', 'leo', 'twin', 'lily2', 'redtest'];
  const POOL = () => { const need = (window.IMPORT && IMPORT.KINDS.base.poses) || ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'], seen = new Set();
    return Object.keys(window.CAST || {}).filter((id) => { const sp = sprite(id), S = window.SPRITES && SPRITES[sp];
      if (NOT_CAST.includes(id) || seen.has(sp) || !S || !need.every((p) => S.poses[p])) return false; seen.add(sp); return true; }); };
  const nameOf = (id) => (window.CAST && CAST[id] && CAST[id].name) || cap(id);
  const pose = (id) => { const S = window.SPRITES && SPRITES[sprite(id)]; return S ? (S.poses.listen ? 'listen' : Object.keys(S.poses)[0]) : null; };
  const img = (id) => { const p = pose(id); return p ? `chars/${sprite(id)}/${p}.webp` : ''; };
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
  const PFR = { chef: 'Respect, charisme : on le suit.', charmeur: 'Désir : on le regarde, il le sait.', dangereux: 'Peur : la salle se tait quand il entre.',
    genie: 'Compétence : il rend facile ce qui est dur.', clown: 'Chaleur : il fait rire, et ça cache autre chose.', mysterieux: 'Mystère : on ne sait pas ce qu’il veut.',
    outsider: 'Empathie : il veut très fort, tout est contre lui.', protecteur: 'Loyauté : il paie pour un autre.' };
  PILLARS.forEach((p) => { p.d = `${p.e} ${p.n} · ${p.ex}\n${PFR[p.id]}\n💥 Son entrée : ${p.sur}.\n1er tap = son pilier, 2e = le mélange.`; });
  const P = Object.fromEntries(PILLARS.map((p) => [p.id, p]));
  // a flaw: the crack that makes the pillar human (the Mentalist: charmer + genius, but a coward when danger comes)
  const FLAWS = [
    { id: 'lache', e: '🐔', n: 'Lâche', d: 'Culotté et sûr de lui, jusqu’au vrai danger : là, il se cache (le Mentalist).', en: 'bold and sure of themselves, until real danger comes: then a coward' },
    { id: 'vice', e: '🍷', n: 'Un vice', d: 'Boire, jouer : un vice qui lui coûte au pire moment.', en: 'a vice they cannot stop (drink, gambling) that costs them at the worst moment' },
    { id: 'colere', e: '🌋', n: 'Colère', d: 'Il explose au pire moment.', en: 'a temper that breaks at the worst moment' },
    { id: 'menteur', e: '🎭', n: 'Menteur', d: 'Il ment par réflexe, même quand la vérité l’aiderait.', en: 'lies by reflex, even when the truth would help' },
    { id: 'orgueil', e: '🦚', n: 'Orgueil', d: 'Trop fier pour demander de l’aide ou s’excuser.', en: 'too proud to ask for help or say sorry' },
  ];
  const F = Object.fromEntries(FLAWS.map((f) => [f.id, f]));

  // ---- the decors of the act (act.js DECORS): only the place; anyone can be there ----
  const DECORS = [{ id: 'taverne', e: '🍺', n: 'Taverne', d: 'La terrasse d’une taverne au-dessus d’une ville fantasy' }, { id: 'maison', e: '🏠', n: 'Maison', d: 'L’intérieur d’une maison' },
    { id: 'salon', e: '🛋️', n: 'Salon', d: 'Un salon' }];

  // ---- WHAT: what each one wants (t = toward whom), their relations, the infos the AI invents ----
  const WANTS = [
    { id: 'love', e: '❤️', n: 'Séduire', t: 1, d: 'Veut une romance avec quelqu’un.', en: (t) => `wants a romance with ${t}` },
    { id: 'protect', e: '🛡️', n: 'Protéger', t: 1, d: 'Veut protéger quelqu’un, quoi qu’il en coûte.', en: (t) => `wants to protect ${t}` },
    { id: 'find', e: '🔦', n: 'Retrouver', t: 1, d: 'Veut retrouver quelqu’un.', en: (t) => `wants to find ${t} back` },
    { id: 'oust', e: '😤', n: 'Évincer', t: 1, d: 'Veut se débarrasser de quelqu’un.', en: (t) => `wants to get rid of ${t}` },
    { id: 'win', e: '🏆', n: 'Être reconnu', d: 'Veut être reconnu, gagner sa place.', en: () => 'wants to be recognized, to win their place' },
    { id: 'free', e: '🕊️', n: 'Partir', d: 'Veut partir, être libre.', en: () => 'wants to leave and be free' },
    { id: 'hide', e: '🤫', n: 'Cacher', d: 'Veut que personne ne sache une chose (son secret).', en: () => 'wants nobody to find out their secret' },
  ];
  const W = Object.fromEntries(WANTS.map((w) => [w.id, w]));
  const RELS = [
    { id: '', e: '·', n: 'Rien', en: '' }, { id: 'crush', e: '❤️', n: 'Attirance', en: 'drawn to each other (unsaid)', good: 1 },
    { id: 'couple', e: '💍', n: 'En couple', en: 'a couple', good: 1 }, { id: 'ex', e: '💔', n: 'Ex', en: 'exes' },
    { id: 'friend', e: '🤝', n: 'Amis', en: 'close friends', good: 1 }, { id: 'family', e: '👪', n: 'Famille', en: 'family (pick the bond that fits)', good: 1 },
    { id: 'rival', e: '⚔️', n: 'Rivaux', en: 'rivals' }, { id: 'mentor', e: '🧭', n: 'Mentor', en: 'mentor and student', good: 1 },
  ];
  const R = Object.fromEntries(RELS.map((r) => [r.id, r]));
  const INFOS = [
    { id: 'secret', e: '🤫', n: 'Un secret', who: 1, d: 'Un secret que l’IA invente, qui explique un geste étrange de ce perso. Sort en épisode 3.', en: (x) => `${x} has a secret (invent it: it explains something odd ${x} does; it comes out in episode 3)` },
    { id: 'mask', e: '🎭', n: 'Faux visage', who: 1, d: 'Ce perso n’est pas ce qu’il montre. L’IA invente ce qu’il cache.', en: (x) => `${x} is not who they seem (invent what they hide)` },
    { id: 'past', e: '🕰️', n: 'Un passé', d: 'Un passé commun (une phrase) entre deux persos liés, que l’IA invente.', en: () => 'a shared past between two of them, in one sentence (invent it)' },
    { id: 'object', e: '📦', n: 'Un objet', d: 'Un objet, une lettre, une porte : quelqu’un sait ce qu’il y a dedans et ne dit rien.', en: () => 'a mystery object, letter or door: someone knows what is inside and will not tell' },
  ];

  // ---- HOW 1, the engine: the inciting incident, why it's hard (some only make sense with what's chosen) ----
  const INC = [
    { id: 'shift', e: '⚡', n: 'Arrive, tout change', enter: 1, d: 'Quelqu’un arrive et change l’équilibre. On le présente en 3 temps.', en: (x) => `${x} arrives, and their arrival shifts everything` },
    { id: 'arrive', e: '🚪', n: 'Débarque', enter: 1, d: 'Quelqu’un avec un enjeu attaché débarque sans prévenir. On le présente en 3 temps.', en: (x) => `${x} shows up without warning, with something at stake attached to them` },
    { id: 'gone', e: '👻', n: 'Disparaît', d: 'On le voit dans les premières répliques, puis il n’est plus là.', en: (x) => `${x} disappears: on screen in the first lines, then gone` },
  ];
  const HARD = [
    { id: 'liked', e: '😇', n: 'Tout le monde l’adore', d: 'L’obstacle de Justin, tout le monde le trouve génial : Justin est seul contre lui.', en: 'everyone thinks the one against justin is a great person: justin is alone against them', need: 'Il faut quelqu’un contre Justin (un désir qui croise le sien).' },
    { id: 'danger', e: '🌲', n: 'Lieu dangereux', d: 'Il faut passer par un endroit dangereux (une forêt la nuit).', en: 'to get there, justin must go through a dangerous place of this world', need: 'Il faut retrouver quelqu’un, partir, ou une disparition.' },
    { id: 'clock', e: '⏳', n: 'Horloge', d: 'Une limite de temps : avant demain, avant qu’il parte.', en: 'a clock: it must be settled before a precise moment' },
    { id: 'gag', e: '🤐', n: 'Le secret bloque', d: 'Dire le secret réglerait tout, mais coûterait trop.', en: 'telling the secret would settle everything, but would cost too much', need: 'Il faut un 🤫 secret dans les infos.' },
  ];
  // ---- HOW 2, the plot techniques (🧭 plot, or 🧭🎬 placed by the plot, played by the scene: techniques.js TECH_LVL) ----
  const TECHS = [
    { id: 'sexy', e: '🔥', n: 'Attirance', lv: '🧭🎬', d: 'Persos hot, regards qui durent, double sens, dès la 1re ligne.', en: 'Attraction from the first line: hot characters, looks that last, flirty double meanings, the others noticing them.' },
    { id: 'where', e: '🔍', n: 'Où ?', lv: '🧭🎬', d: 'Où est X ? Quelqu’un devrait être là et n’y est pas.', en: 'Where is someone? A person who should be there is not; the question lasts.' },
    { id: 'who', e: '👤', n: 'Qui ?', lv: '🧭🎬', d: 'Qui est X ? On parle de lui sans le voir, on annonce qu’on va le rencontrer.', en: 'Who is someone? The others talk about a person we do not see yet (a precise promise), and say we will meet them soon.' },
    { id: 'what', e: '📦', n: 'Quoi ?', lv: '🧭🎬', d: 'Qu’y a-t-il dans X ? Quelqu’un sait et ne dit rien.', en: 'What is inside? An object, a room or a letter someone knows about and will not tell.' },
    { id: 'plant', e: '🌱', n: 'Planter, payer', lv: '🧭', d: 'Un détail anodin tôt, qui retourne tout plus tard (le nom de sa mère).', en: 'Plant a harmless detail early that turns everything around later.' },
    { id: 'twist', e: '🔄', n: 'Twist', lv: '🧭', d: 'Une révélation qui change ce qu’on croyait sur quelqu’un.', en: 'A reveal that changes what the player believed about someone.' },
    { id: 'stakes', e: '📈', n: 'L’enjeu monte', lv: '🧭🎬', d: 'Ce qui peut être perdu grandit à chaque épisode.', en: 'What can be lost grows every episode.' },
  ];
  const by = (list, id) => list.find((x) => x.id === id) || list[0];

  // ---- the state, kept on this phone ----
  const KEY = 'smt-forge2';
  const BASE = () => ({ decor: 'taverne', cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['charmeur', 'genie'], ruby: ['mysterieux'], amare: ['chef', 'charmeur'], melissa: ['protecteur'] },
    flaw: { justin: 'lache' }, want: { justin: { v: 'love', t: 'ruby' }, amare: { v: 'love', t: 'ruby' } }, rel: { 'amare|ruby': 'couple', 'justin|melissa': 'friend' },
    info: { secret: 'amare' }, inc: { k: 'shift', who: 'amare' }, hard: { liked: 1 }, tech: { sexy: 1, who: 1, plant: 1, twist: 1 } });
  let S = (() => { try { const s = JSON.parse(ls(KEY)); if (s && Array.isArray(s.cast)) return { ...BASE(), ...s }; } catch { /* none yet */ } return BASE(); })();
  const save = () => ls(KEY, JSON.stringify(S));
  let el = null, msg = '';

  const J = 'justin';
  const people = () => [J, ...S.cast];
  const nm = (id) => (id === J ? 'Justin' : nameOf(id)), en = (id) => (id === J ? 'justin' : nameOf(id));
  const pillarsOf = (id) => (S.pil[id] || []).filter((p) => P[p]);
  const tag = (id) => { const ps = pillarsOf(id); return ps.length ? ps.map((p) => `${P[p].e} ${P[p].n}`).join(' + ') + (S.flaw[id] ? ` · ${F[S.flaw[id]].e}` : '') : ''; };
  const pk = (a, b) => [a, b].sort().join('|');
  const rel = (a, b) => S.rel[pk(a, b)] || '';
  const live = (id) => id === J || S.cast.includes(id);
  const wantOf = (id) => { const w = S.want[id]; return w && W[w.v] && (!W[w.v].t || live(w.t)) ? w : null; };
  const incWho = () => (live(S.inc.who) && S.inc.who !== J ? S.inc.who : S.cast[0]);
  const mini = (id) => `<span class="fMini">${face(id)}</span>`;

  // ---- the conflicts of desire, found from what each one wants and their relations ----
  function conflicts() {
    const out = [], ps = people(), seen = new Set();
    const add = (a, b, e, fr, en2) => { const k = pk(a, b) + e; if (seen.has(k)) return; seen.add(k); out.push({ a, b, e, fr, en: en2 }); };
    for (const a of ps) for (const b of ps) {
      if (a === b) continue;
      const wa = wantOf(a), wb = wantOf(b);
      if (wa && wb && wa.t && wa.t === wb.t && wa.t !== a && wa.t !== b && ['love', 'protect', 'find'].includes(wa.v) && wa.v === wb.v) add(a, b, '⚔️', `${nm(a)} et ${nm(b)} veulent ${nm(wa.t)}`, `${en(a)} and ${en(b)} both ${W[wa.v].en(en(wa.t)).replace('wants', 'want')}`);
      if (wa && wa.v === 'love' && wb && wb.v === 'protect' && wb.t === wa.t) add(a, b, '🛡️', `${nm(b)} protège ${nm(wa.t)} de ${nm(a)}`, `${en(b)} protects ${en(wa.t)} from ${en(a)}`);
      if (wa && wa.v === 'oust' && wa.t === b) add(a, b, '😤', `${nm(a)} veut évincer ${nm(b)}`, `${en(a)} wants to get rid of ${en(b)}`);
      if (wa && wa.v === 'love' && wa.t !== b && rel(wa.t, b) === 'couple') add(a, b, '💍', `${nm(wa.t)} est déjà avec ${nm(b)}`, `${en(a)} wants ${en(wa.t)}, who is already with ${en(b)}`);
      if (wa && wa.v === 'love' && wa.t === b && wb && wb.v === 'love' && wb.t !== a) add(a, b, '💘', `${nm(b)} en veut un autre`, `${en(a)} loves ${en(b)}, who wants ${en(wb.t)}`);
      if (wa && wa.v === 'free' && wb && ['love', 'protect'].includes(wb.v) && wb.t === a) add(a, b, '🕊️', `${nm(b)} veut garder ${nm(a)}`, `${en(a)} wants to leave; ${en(b)} wants to keep them`);
      if (wa && wa.v === 'find' && wa.t === b && wb && ['free', 'hide'].includes(wb.v)) add(a, b, '🔦', `${nm(b)} ne veut pas être trouvé`, `${en(a)} wants to find ${en(b)}, who does not want to be found`);
      if (wa && wa.v === 'win' && wb && wb.v === 'win' && a < b) add(a, b, '🏆', `${nm(a)} et ${nm(b)} veulent la même place`, `${en(a)} and ${en(b)} want the same place`);
      if (rel(a, b) === 'rival' && a < b) add(a, b, '⚔️', `${nm(a)} et ${nm(b)} sont rivaux`, `${en(a)} and ${en(b)} are rivals`);
    }
    return out;
  }
  // the roles the arc needs (act.js: A asks, B is hurt, episode 4 = A or B): Justin's target, who's against him, who he'd lose
  function roles() {
    const jw = wantOf(J), cs = conflicts().filter((c) => c.a === J || c.b === J), x = incWho();
    const target = (jw && jw.t) || (S.inc.k === 'gone' ? x : S.cast.find((id) => id !== x) || x);
    const against = cs.map((c) => (c.a === J ? c.b : c.a)).find((id) => id !== target) || (target !== x ? x : null);
    const dear = S.cast.find((id) => id !== target && id !== against && (R[rel(J, id)] || {}).good) || null;
    return { target, against, dear, a: target, b: dear || against || S.cast.find((id) => id !== target) || target };
  }
  const hardOk = (h) => (h === 'liked' ? !!roles().against : h === 'danger' ? S.inc.k === 'gone' || people().some((id) => { const w = wantOf(id); return w && ['find', 'free'].includes(w.v); }) : h === 'gag' ? !!(S.info.secret && live(S.info.secret)) : true);

  // ---- OUTPUT: the events of the 5 episodes, worked out from WHAT and HOW. { e, fr (here), en (the prompts) } ----
  function events() {
    const r = roles(), x = incWho(), inc = by(INC, S.inc.k), pX = P[pillarsOf(x)[0]], jw = wantOf(J), cs = conflicts(), t = (id) => S.tech[id];
    const sec = S.info.secret && live(S.info.secret) ? S.info.secret : null, mask = S.info.mask && live(S.info.mask) ? S.info.mask : null;
    const H = (id) => S.hard[id] && hardOk(id);
    const E = [[], [], [], [], []], put = (n, e, fr, en2) => E[n].push({ e, fr, en: en2 });
    const hooks = TECHS.filter((h) => ['sexy', 'where', 'who', 'what'].includes(h.id) && t(h.id));
    if (hooks.length) put(0, hooks.map((h) => h.e).join(''), 'Les premières secondes', `The first seconds, the most value at once: ${hooks.map((h) => h.en).join(' ')}`);
    if (inc.enter) {
      put(0, '🗣️', `On parle de ${nm(x)}`, `${en(x)} is not there yet: ${pX ? pX.exp : 'the others talk about them, a precise promise'}.`);
      put(0, '⏰', `${nm(x)} arrive bientôt`, `Someone announces ${en(x)} arrives soon.`);
      put(0, '💥', `${nm(x)} : ${pX ? pX.sur.toLowerCase() : 'sa surprise'}`, `INCITING INCIDENT: ${inc.en(en(x))}. ${en(x)} appears and proves their pillar${pX ? `: ${pX.surEn}` : ''}.`);
    } else put(0, '👻', `${nm(x)} disparaît`, `INCITING INCIDENT: ${inc.en(en(x))}.`);
    const jWant = jw || { v: S.inc.k === 'gone' ? 'find' : 'love', t: r.target };
    put(0, W[jWant.v].e, `Justin veut ${W[jWant.v].t ? `${W[jWant.v].n.toLowerCase()} ${nm(jWant.t)}` : W[jWant.v].n.toLowerCase()}`, `justin says out loud what he wants: he ${W[jWant.v].en(en(jWant.t))}.`);
    if (cs[0]) put(0, cs[0].e, cs[0].fr, `The conflict shows: ${cs[0].en}.`);
    if (t('plant') || sec || mask) put(0, '🌱', 'Un détail planté', 'Plant a harmless detail in a line, passing for something else.');
    put(0, '⚖️', 'Choix 1', 'The main choice of the episode: two outcomes, each with big consequences on a bond.');
    for (const c of cs.slice(1)) put(1, c.e, c.fr, `Another conflict of desire comes in: ${c.en}.`);
    if (H('liked') && r.against) put(1, '😇', `Tout le monde adore ${nm(r.against)}`, `Everyone thinks ${en(r.against)} is great: justin is alone against them.`);
    if (H('danger')) put(1, '🌲', 'Le lieu dangereux', 'To get there, justin must go through a dangerous place of this world.');
    put(1, '↘️', 'L’effort facile rate', 'justin tries the easy way; it backfires and makes things worse.');
    if (t('plant') || sec) put(1, '🌱', 'Un 2e détail', 'Plant a second detail.');
    if (H('gag')) put(1, '🤐', 'Le secret bloque', `Telling ${en(sec)}'s secret would settle everything, but costs too much.`);
    if (t('stakes')) put(1, '📈', 'L’enjeu monte', 'What can be lost grows.');
    put(1, '⚖️', 'Choix 2', 'The main choice of the episode.');
    if (sec) put(2, '🤫', `Le secret de ${nm(sec)} sort`, `${en(sec)}'s secret comes out.`);
    if (mask) put(2, '🎭', `${nm(mask)} tombe le masque`, `${en(mask)} is not who they seemed: it comes out.`);
    if (t('twist') || sec || mask) put(2, '🔄', 'On revoit tout', 'What the player believed is turned around; the planted details now make sense.');
    put(2, '⚖️', 'Choix 3', 'The main choice of the episode.');
    if (H('clock')) put(3, '⏳', 'L’horloge', 'The clock: it must be decided now.');
    put(3, '⚖️', `${nm(r.a)} ou ${nm(r.b)}`, `The impossible choice: ${en(r.a)} or ${en(r.b)}, each side painful to lose.`);
    put(4, '💔', 'Ce que ça coûte', 'What the choice cost, shown (one version per side).');
    put(4, '❔', 'Ce qui reste ouvert', 'What stays open for the next act.');
    return E;
  }

  // ---- the seed: what the act's prompt and every episode's plan prompt carry (act.js) ----
  function seed() {
    const r = roles(), x = incWho(), cs = conflicts();
    const who = (id) => { const ps = pillarsOf(id), f = S.flaw[id] && F[S.flaw[id]], w = wantOf(id);
      return `- ${id === J ? 'justin (the player)' : `${en(id)} (id "${id}")`}: ${ps.length ? ps.map((p, i) => (i ? `mixed with ${P[p].en}` : P[p].en)).join(', ') : 'free'}${f ? `; flaw: ${f.en}` : ''}${w ? `; ${W[w.v].en(en(w.t))}` : ''}.`; };
    const rels = Object.entries(S.rel).filter(([k, v]) => v && k.split('|').every(live)).map(([k, v]) => `- ${k.split('|').map(en).join(' and ')}: ${R[v].en}`);
    const infos = INFOS.filter((i) => S.info[i.id] && (!i.who || live(S.info[i.id]))).map((i) => `- ${i.en(en(S.info[i.id]))}`);
    const hard = HARD.filter((h) => S.hard[h.id] && hardOk(h.id)).map((h) => `- ${h.en}`);
    const techs = TECHS.filter((h) => S.tech[h.id]).map((h) => `- ${h.en}`);
    const E = events(), epText = E.map((list) => list.map((ev) => `- ${ev.en}`).join('\n'));
    const text = [`THE CHARACTERS (their pillar: what we follow them for; it shows in how they talk and act; their want):`, ...people().map(who),
      ...(rels.length ? ['THEIR RELATIONS:', ...rels] : []), ...(infos.length ? ['INFOS TO INVENT:', ...infos] : []),
      `THE INCITING INCIDENT: ${by(INC, S.inc.k).en(en(x))}.`,
      ...(cs.length ? ['THE CONFLICTS OF DESIRE (the story is these wants colliding):', ...cs.map((c) => `- ${c.en}`)] : []),
      ...(hard.length ? ['WHY IT IS HARD:', ...hard] : []), ...(techs.length ? ['PLOT TECHNIQUES:', ...techs] : []),
      `In the arc: A = ${en(r.a)}, B = ${en(r.b)}; the episode 4 choice is ${en(r.a)} or ${en(r.b)}. Other characters may appear when the events need them.`].join('\n');
    const all = E.map((list, i) => `Episode ${i + 1}:\n${epText[i]}`).join('\n');
    return { decor: S.decor, a: r.a, b: r.b, text, ep1: `THE EVENTS, EPISODE BY EPISODE (place them):\n${all}`, eps: epText, forge: JSON.parse(JSON.stringify(S)) };
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

  // ---- 🎲 everything drawn: a place, 2 to 4 people, wants that collide, relations, the rest ----
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const coin = (p) => Math.random() < p;
  function dice() {
    const pool = [...POOL()].sort(() => Math.random() - 0.5), cast = pool.slice(0, Math.min(pool.length, 2 + Math.floor(Math.random() * 2)));
    const [T, O, C] = cast, pl = () => { const a = pick(PILLARS).id; if (coin(0.5)) return [a]; let b; do b = pick(PILLARS).id; while (b === a); return [a, b]; };
    const k = pick(INC).id, want = {}, rl = {};
    if (k === 'gone') { want[J] = { v: 'find', t: T }; if (O) want[O] = coin(0.5) ? { v: 'protect', t: T } : { v: 'oust', t: J }; if (coin(0.5)) want[T] = { v: 'free' }; }
    else { want[J] = { v: 'love', t: T }; if (O) { want[O] = { v: 'love', t: T }; if (coin(0.5)) rl[pk(O, T)] = 'couple'; } }
    if (C) rl[pk(J, C)] = pick(['friend', 'family', 'mentor']);
    S = { decor: pick(DECORS).id, cast, pil: Object.fromEntries([J, ...cast].map((id) => [id, pl()])), flaw: { [J]: coin(0.6) ? pick(FLAWS).id : null }, want, rel: rl,
      info: coin(0.6) ? { secret: pick(cast) } : {}, inc: { k, who: k === 'gone' ? T : O || T }, hard: { liked: coin(0.5) ? 1 : 0, clock: coin(0.4) ? 1 : 0, danger: 1, gag: 1 },
      tech: { sexy: 1, [k === 'gone' ? 'where' : 'who']: 1, plant: coin(0.6) ? 1 : 0, twist: 1, stakes: coin(0.5) ? 1 : 0 } };
  }

  // ---- the screen ----
  const chip = (attrs, e, n, on, c, tip, off) => `<button type="button" class="fChip${on ? ' on' : ''}${off ? ' off' : ''}" ${attrs}${c ? ` style="--c:${c}"` : ''}${tip ? ` data-tip="${esc(tip)}"` : ''}><span>${e}</span><small>${esc(n)}</small></button>`;
  const row = (icon, inner, tip) => `<section class="fRow"><i class="fI"${tip ? ` data-tip="${esc(tip)}"` : ''}>${icon}</i><div class="fChips">${inner}</div></section>`;
  const layer = (k, name, tip) => `<h3 class="fL" data-tip="${esc(tip)}"><i>${k}</i>${name}</h3>`;
  const facePick = (attr, cur, ids, c) => `<span class="fSub">${ids.map((id) => `<button type="button" class="fFace sm${id === cur ? ' on' : ''}" ${attr}="${id}" style="--c:${c}" data-tip="${esc(nm(id))}">${face(id)}</button>`).join('')}</span>`;
  function person(id) {
    const ps = pillarsOf(id), c = (P[ps[0]] || { c: '#3a3a3c' }).c, w = S.want[id] || {}, wv = W[w.v];
    return `<section class="fWho" style="--c:${c}">${face(id)}<div class="fWhoR"><b>${id === J ? '🎮 Justin' : esc(nm(id))}<em>${esc(tag(id))}</em></b>`
      + `<div class="fPs">${PILLARS.map((p) => { const k = ps.indexOf(p.id); return `<button type="button" class="fP${k === 0 ? ' on' : k === 1 ? ' mix' : ''}" style="--c:${p.c}" data-pil="${id}:${p.id}" data-tip="${esc(p.d)}">${p.e}</button>`; }).join('')}</div>`
      + `<div class="fPs fFl">${FLAWS.map((f) => `<button type="button" class="fP fl${S.flaw[id] === f.id ? ' on' : ''}" data-flaw="${id}:${f.id}" data-tip="${esc(`${f.e} ${f.n} (faille)\n${f.d}`)}">${f.e}</button>`).join('')}</div>`
      + `<div class="fPs fWant"><i class="fWi" data-tip="Ce qu’il veut (et de qui). Des désirs qui se croisent = l’histoire">🎯</i>${WANTS.map((x) => `<button type="button" class="fP${w.v === x.id ? ' on' : ''}" style="--c:#ff375f" data-want="${id}:${x.id}" data-tip="${esc(`${x.e} ${x.n}\n${x.d}`)}">${x.e}</button>`).join('')}</div>`
      + (wv && wv.t ? `<div class="fPs">${people().filter((o) => o !== id).map((o) => `<button type="button" class="fFace sm${w.t === o ? ' on' : ''}" style="--c:#ff375f" data-wt="${id}:${o}" data-tip="${esc(`${wv.n} ${nm(o)}`)}">${face(o)}</button>`).join('')}</div>` : '')
      + '</div></section>';
  }
  function relRows() {
    const ps = people(), out = [];
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
      const r = R[rel(ps[i], ps[j])] || RELS[0];
      out.push(`<button type="button" class="fRel${r.id ? ' on' : ''}" data-rel="${pk(ps[i], ps[j])}" data-tip="${esc(`${nm(ps[i])} et ${nm(ps[j])} : ${r.n}\nUn tap = le lien suivant (${RELS.slice(1).map((x) => x.e).join(' ')})`)}">${mini(ps[i])}<b>${r.e}</b>${mini(ps[j])}</button>`);
    }
    return out.join('');
  }
  function render() {
    if (!el) return;
    const inc = by(INC, S.inc.k), x = incWho(), cs = conflicts(), E = events(), hasKey = !!ls('smt-key');
    el.innerHTML = `<div class="fTop"><b>⚡ Créer</b><button type="button" class="fDice" data-x="dice" aria-label="Au hasard" data-tip="Tout au hasard">🎲</button></div>`
      // WHAT
      + layer('1', 'Quoi', 'Le lieu, les persos, ce qu’ils veulent, leurs liens, les infos')
      + row('📍', DECORS.map((o) => chip(`data-decor="${o.id}"`, o.e, o.n, o.id === S.decor, '#8e8e93', o.d)).join(''), 'Le lieu')
      + row('👥', POOL().map((id) => { const k = S.cast.indexOf(id); return `<button type="button" class="fFace${k >= 0 ? ' on' : ''}" data-cast="${id}" data-tip="${esc(nm(id))}">${face(id)}<small>${esc(nm(id))}</small></button>`; }).join(''), 'Qui est dans l’histoire avec Justin (tous ceux qui ont la feuille de base)')
      + people().map(person).join('')
      + (S.cast.length ? row('🔗', relRows(), 'Leurs liens : un tap change le lien') : '')
      + row('🗂️', INFOS.map((i) => chip(`data-info="${i.id}"`, i.e, i.n, !!S.info[i.id], '#64d2ff', `${i.d}\nL’IA l’invente.`)).join('')
        + INFOS.filter((i) => i.who && S.info[i.id]).map((i) => `<span class="fTag">${i.e}</span>${facePick('data-infowho', S.info[i.id], S.cast, '#64d2ff').replace(/data-infowho="/g, `data-infowho="${i.id}:`)}`).join(''), 'Les infos que l’IA invente (rien à taper)')
      // HOW
      + layer('2', 'Comment', '1. Le moteur : ce qui lance et bloque l’histoire. 2. Les techniques de plot.')
      + row('💥', INC.map((o) => chip(`data-inc="${o.id}"`, o.e, o.n, o.id === S.inc.k, '#ff453a', o.d)).join('') + facePick('data-incwho', x, S.cast, '#ff453a'), 'Le déclencheur, et qui')
      + `<section class="fConf" data-tip="Les conflits de désir, trouvés à partir de ce que chacun veut et de leurs liens">${cs.length ? cs.map((c) => `<div>${mini(c.a)}<b>${c.e}</b>${mini(c.b)}<span class="fCt">${esc(c.fr)}</span></div>`).join('') : '<div class="none">⚠️ <span class="fCt">Pas de conflit : donne des 🎯 qui se croisent</span></div>'}</section>`
      + row('🧱', HARD.map((h) => { const ok = hardOk(h.id); return chip(`data-hard="${h.id}"`, h.e, h.n, ok && !!S.hard[h.id], '#bf5af2', ok ? h.d : `${h.d}\n${h.need}`, !ok); }).join(''), 'Pourquoi c’est dur (plusieurs à la fois)')
      + row('🧭', TECHS.map((h) => chip(`data-tech="${h.id}"`, h.e, h.n, !!S.tech[h.id], '#ffd60a', `${h.lv} ${h.d}`)).join(''), 'Les techniques de plot (🧭 plot · 🧭🎬 le plot les place, la scène les joue)')
      // OUTPUT
      + layer('3', 'Ce qui arrive', 'Les événements des 5 épisodes, tirés du reste. Ils vont dans le prompt de chaque épisode.')
      + `<section class="fOut">${E.map((list, i) => `<div class="fEp"><i>${i + 1}</i><div>${list.map((ev) => `<span><b>${ev.e}</b>${esc(ev.fr)}</span>`).join('')}</div></div>`).join('')}</section>`
      + `<section class="fGo">${hasKey ? '' : '<input type="text" class="secret" autocomplete="off" autocapitalize="off" spellcheck="false" data-key="1" placeholder="Clé API (sk-ant-…)">'}`
      + '<button type="button" class="go" data-x="play" data-tip="Haiku écrit l’acte, le plan de l’épisode 1 et l’histoire, puis ça joue">▶ Jouer</button><button type="button" data-x="copy" data-tip="Copie le prompt de l’acte pour un chat ; la réponse se colle dans Acte › Générer › 1">📋 Prompt</button><button type="button" data-x="acte" data-tip="Ouvre l’acte : ses 5 épisodes, les plans">Acte ›</button></section>'
      + `<p class="pMsg fMsg">${esc(msg)}</p>`
      + `<h3 class="fH">🧍 Prompts des pose sheets</h3>`
      + people().map((id) => { const src = img(id), ps = pillarsOf(id);
        return `<section class="fSheet" style="--c:${(P[ps[0]] || { c: '#3a3a3c' }).c}"><div class="fPic">${src ? `<img src="${src}" alt="">` : ''}<i>1</i></div>`
          + `<div class="fSheetR"><b>${esc(nm(id))}<em>${esc(tag(id))}</em></b>`
          + `<div class="fBtns"><button type="button" data-pose="${id}" data-tip="Copie le prompt : ses 6 expressions, à la façon de son archétype">📋 Prompt</button>${src ? `<button type="button" data-cimg="${src}" data-tip="Copie son image (l’image 1), à coller dans ChatGPT avant le prompt">🖼️ Image</button><a href="${src}" download="${sprite(id)}.webp" data-tip="Télécharge son image">⬇</a>` : ''}</div></div></section>`; }).join('');
  }
  const copy = (text, then) => (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { msg = then; render(); }, () => { msg = 'Copie impossible'; render(); });
  // an image into the clipboard, as png (ChatGPT takes a paste); where it can't, it opens to save it
  async function copyImg(src, btn) {
    try {
      const im = new Image(); im.src = src; await im.decode();
      const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0);
      const blob = await new Promise((ok) => c.toBlob(ok, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      const was = btn.textContent; btn.textContent = '✓ Copiée'; setTimeout(() => (btn.textContent = was), 1400);
    } catch { window.open(src, '_blank'); }
  }
  function onClick(e) {
    const t = e.target.closest('button'); if (!t || !el.contains(t)) return;   // ⬇ is a link: it downloads by itself
    e.stopPropagation();
    const d = t.dataset; msg = '';
    if (d.decor) S.decor = d.decor;
    else if (d.cast) { const k = S.cast.indexOf(d.cast); if (k >= 0) S.cast.splice(k, 1); else S.cast.push(d.cast); }
    else if (d.pil) { const [id, p] = d.pil.split(':'), a = (S.pil[id] = pillarsOf(id)), k = a.indexOf(p); if (k >= 0) a.splice(k, 1); else { if (a.length >= 2) a.pop(); a.push(p); } }
    else if (d.flaw) { const [id, f] = d.flaw.split(':'); S.flaw[id] = S.flaw[id] === f ? null : f; }
    else if (d.want) { const [id, v] = d.want.split(':'), cur = S.want[id];
      if (cur && cur.v === v) delete S.want[id]; else S.want[id] = { v, t: W[v].t ? (cur && cur.t && cur.t !== id && live(cur.t) ? cur.t : people().find((o) => o !== id)) : null }; }
    else if (d.wt) { const [id, o] = d.wt.split(':'); if (S.want[id]) S.want[id].t = o; }
    else if (d.rel) { const k = RELS.findIndex((r) => r.id === (S.rel[d.rel] || '')); S.rel[d.rel] = RELS[(k + 1) % RELS.length].id; }
    else if (d.info) { const i = INFOS.find((x) => x.id === d.info); S.info[d.info] = S.info[d.info] ? null : i.who ? S.cast[0] || null : 1; }
    else if (d.infowho) { const [k, id] = d.infowho.split(':'); S.info[k] = id; }
    else if (d.inc) S.inc.k = d.inc;
    else if (d.incwho) S.inc.who = d.incwho;
    else if (d.hard) { if (!hardOk(d.hard)) return; S.hard[d.hard] = S.hard[d.hard] ? 0 : 1; }
    else if (d.tech) S.tech[d.tech] = S.tech[d.tech] ? 0 : 1;
    else if (d.pose) { save(); return copy(sheet(d.pose), `🧍 ${nm(d.pose)} : prompt copié. Dans ChatGPT : l’image + le prompt.`); }
    else if (d.cimg) return copyImg(d.cimg, t);
    else if (d.x === 'dice') dice();
    else if (d.x === 'copy') { if (!S.cast.length) { msg = '👥 ?'; return render(); } const s = seed(); ls('smt-act-seed', JSON.stringify(s)); save();
      return copy(ACT.promptSeed(s), '📋 Copié · la réponse se colle dans Acte › Générer › 1'); }
    else if (d.x === 'acte') { save(); return window.FORGE_TO_ACT && FORGE_TO_ACT(); }
    else if (d.x === 'play') return play(t);
    save(); const y = el.closest('#forge') ? el.closest('#forge').scrollTop : 0; render(); if (el.closest('#forge')) el.closest('#forge').scrollTop = y;
  }
  async function play(btn) {
    if (!S.cast.length) { msg = '👥 ?'; return render(); }
    const inp = el.querySelector('[data-key]'); if (inp && /^sk-ant-/.test(inp.value.trim())) { ls('smt-key', inp.value.trim()); }
    const key = ls('smt-key'); if (!key) { if (inp) inp.focus(); return; }
    save(); btn.disabled = true;
    const tell = (t) => { const m = el.querySelector('.fMsg'); if (m) m.textContent = t; };
    try { if (window.COUNTER) COUNTER.on = false; const u = await ACT.auto(key, { n: 1, newAct: true, seed: seed() }, tell); if (window.GEN_USED) GEN_USED(u); msg = ''; }
    catch (err) { msg = err.message || 'Ça n’a pas marché.'; btn.disabled = false; render(); }
  }
  // ---- details: hover (a mouse), or hold a finger half a second (a phone; that tap then does nothing) ----
  let tipEl = null, holdT = 0, held = false;
  const tipShow = (t) => { const s = t && t.dataset.tip; if (!s) return tipHide();
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'fTip'; document.body.appendChild(tipEl); }
    tipEl.textContent = s; tipEl.hidden = false; const r = t.getBoundingClientRect(), w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    tipEl.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
    tipEl.style.top = (r.top - h - 8 > 8 ? r.top - h - 8 : r.bottom + 8) + 'px'; };
  const tipHide = () => { if (tipEl) tipEl.hidden = true; };
  function mount(root) {
    el = root; root.onclick = (e) => { if (held) { held = false; e.stopPropagation(); return; } tipHide(); onClick(e); }; msg = ''; render();
    root.onmouseover = (e) => { if (e.pointerType === 'touch') return; const t = e.target.closest('[data-tip]'); if (t && el.contains(t)) tipShow(t); else tipHide(); };
    root.onmouseleave = tipHide;
    root.onpointerdown = (e) => { if (e.pointerType !== 'touch') return; held = false; clearTimeout(holdT); const t = e.target.closest('[data-tip]');
      if (t) holdT = setTimeout(() => { held = true; tipShow(t); }, 450); };
    root.onpointerup = root.onpointercancel = () => { clearTimeout(holdT); if (held) setTimeout(tipHide, 1800); };
    root.oncontextmenu = (e) => { if (e.target.closest('[data-tip]')) e.preventDefault(); };
    const sc = root.closest('#forge'); if (sc) sc.onscroll = tipHide;
  }
  return { mount, PILLARS, FLAWS, sheet, seed, events, conflicts };
})();
