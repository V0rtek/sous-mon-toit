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
  // the infos: picked from this list, never typed and never invented (02/11). x, y = the people in it (a tap on a face
  // = the next one). k: secret (comes out in episode 3), mask (falls in episode 3), past (told early), object (seen early,
  // opened in episode 3)
  const INFO_K = [{ id: 'secret', e: '🤫', n: 'Secret', d: 'Ce qu’un perso cache. Sort en épisode 3.' }, { id: 'mask', e: '🎭', n: 'Faux visage', d: 'Il n’est pas ce qu’il montre. Tombe en épisode 3.' },
    { id: 'past', e: '🕰️', n: 'Passé', d: 'Ce qui s’est passé entre eux. Raconté tôt.' }, { id: 'object', e: '📦', n: 'Objet', d: 'Un objet qu’on voit tôt, qu’on ouvre en épisode 3.' }];
  const INFOS = [
    { k: 'secret', id: 'sibling', e: '🧬', s: 2, fr: (x, y) => `${x} est de la famille de ${y}, en cachette`, en: (x, y) => `${x} is ${y}'s hidden sibling (or close family); ${y} does not know` },
    { k: 'secret', id: 'parent', e: '👶', s: 2, fr: (x, y) => `${x} est le parent de ${y}`, en: (x, y) => `${x} is ${y}'s parent, and ${y} does not know` },
    { k: 'secret', id: 'betray', e: '🗡️', s: 2, fr: (x, y) => `${x} a trahi ${y}`, en: (x, y) => `${x} betrayed ${y} in the past, and ${y} does not know` },
    { k: 'secret', id: 'crush', e: '💌', s: 2, fr: (x, y) => `${x} aime ${y} en secret`, en: (x, y) => `${x} is secretly in love with ${y}` },
    { k: 'secret', id: 'cause', e: '🔥', s: 2, fr: (x, y) => `${x} a causé ce que ${y} a perdu`, en: (x, y) => `${x} caused what ${y} lost most, and hides it` },
    { k: 'secret', id: 'leaving', e: '🧳', s: 1, fr: (x) => `${x} part bientôt, sans le dire`, en: (x) => `${x} is leaving soon and has told no one` },
    { k: 'secret', id: 'sick', e: '🩺', s: 1, fr: (x) => `${x} est malade`, en: (x) => `${x} is sick and hides it` },
    { k: 'mask', id: 'villain', e: '🦹', s: 1, fr: (x) => `${x} est celui qu’on cherche`, en: (x) => `${x} is the very one everyone is looking for (a name planted early gives it away later)` },
    { k: 'mask', id: 'spy', e: '🕵️', s: 2, fr: (x, y) => `${x} travaille pour ${y}`, en: (x, y) => `${x} secretly works for ${y}` },
    { k: 'mask', id: 'pretend', e: '🎭', s: 2, fr: (x, y) => `${x} fait semblant d’aimer ${y}`, en: (x, y) => `${x} only pretends to care for ${y}` },
    { k: 'mask', id: 'name', e: '🪪', s: 1, fr: (x) => `${x} ment sur son nom`, en: (x) => `${x} lies about their name and where they come from` },
    { k: 'mask', id: 'royal', e: '👑', s: 1, fr: (x) => `${x} est de sang royal`, en: (x) => `${x} is of royal blood and hides it` },
    { k: 'past', id: 'exes', e: '💔', s: 2, fr: (x, y) => `${x} et ${y} ont été ensemble`, en: (x, y) => `${x} and ${y} were together once` },
    { k: 'past', id: 'saved', e: '🦸', s: 2, fr: (x, y) => `${x} a sauvé ${y}`, en: (x, y) => `${x} once saved ${y}'s life` },
    { k: 'past', id: 'grew', e: '🏡', s: 2, fr: (x, y) => `${x} et ${y} ont grandi ensemble`, en: (x, y) => `${x} and ${y} grew up together` },
    { k: 'past', id: 'fight', e: '🥊', s: 2, fr: (x, y) => `${x} et ${y} ne se parlent plus`, en: (x, y) => `${x} and ${y} fell out and have not spoken since` },
    { k: 'past', id: 'promise', e: '🤞', s: 2, fr: (x, y) => `${x} a fait une promesse à ${y}`, en: (x, y) => `${x} once made ${y} a promise, still binding` },
    { k: 'object', id: 'letter', e: '✉️', s: 2, fr: (x, y) => `Une lettre de ${x} pour ${y}`, en: (x, y) => `a sealed letter from ${x} to ${y}` },
    { k: 'object', id: 'ring', e: '💍', s: 1, fr: (x) => `La bague de ${x}`, en: (x) => `${x}'s ring, that they never take off` },
    { k: 'object', id: 'key', e: '🗝️', s: 1, fr: (x) => `La clé de ${x}`, en: (x) => `${x}'s key, to a door nobody opens` },
    { k: 'object', id: 'photo', e: '🖼️', s: 2, fr: (x, y) => `Une photo de ${x} avec ${y}`, en: (x, y) => `an old photo of ${x} with ${y}` },
    { k: 'object', id: 'map', e: '🗺️', s: 1, fr: (x) => `La carte de ${x}`, en: (x) => `${x}'s map, of a place nobody goes` },
  ];
  const IN = Object.fromEntries(INFOS.map((i) => [i.id, i]));

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
  const by = (list, id) => list.find((x) => x.id === id) || list[0];

  // ---- the techniques: HOW an event is done, concretely (a tap on the event = the next way). [name, goal of Plan de
  // scène, fr(c), en(c)]; c = the people of the moment: x (who arrives or goes), t (who Justin wants), a (who is against
  // him), d (who he'd lose), s (who has the secret), i (the info), o (the conflict), w (what Justin wants) ----
  const PEXP = { chef: 'il n’a jamais perdu le contrôle d’une salle', charmeur: 'on se prévient de ne pas tomber pour lui', dangereux: 'on raconte ce qui est arrivé au dernier qui l’a croisé',
    genie: 'il a réglé ce que personne ne pouvait', clown: 'on rit rien qu’à repenser à son dernier coup', mysterieux: 'personne ne sait d’où il vient',
    outsider: 'il n’a aucune chance, et il vient quand même', protecteur: 'quelqu’un lui doit la vie' };
  const de = (n) => (/^[aeiouyhéèêà]/i.test(n) ? 'd’' : 'de ') + n;   // « d’Amare », « de Ruby »
  const TQ = {
    hook: [['Entrée qui fait taire', 'char', (c) => `${c.t} entre, la salle se tait`, (c) => `${c.tE} walks in and the whole room goes quiet; everyone notices them`],
      ['Place vide', 'info', () => 'Une place vide, une chope encore pleine', () => 'an empty seat, a mug still full: someone who should be here is not'],
      ['Un nom chuchoté', 'info', () => 'On baisse la voix : « Il arrive ce soir. »', () => 'people lower their voice about someone who arrives tonight'],
      ['Lettre cachée', 'info', () => 'Une lettre cachée sans être lue : « Pas ici. »', () => 'someone hides a letter without reading it: "Not here."'],
      ['Avant d’entrer', 'stakes', () => 'Quelqu’un tremble avant d’entrer : « Deux minutes. »', () => 'someone is shaking right before walking in: "Two minutes."'],
      ['Taquinerie de trop', 'rel', (c) => `Justin et ${c.t} : une taquinerie qui dure trop`, (c) => `justin and ${c.tE}: a tease that lasts a beat too long; both notice`]],
    want: [['Aveu à un proche', 'desire', (c) => `Justin avoue à ${c.d} : ${c.w}. ${c.d} en doute`, (c) => `justin admits to ${c.dE} what he wants (${c.wE}); ${c.dE} doubts it with a joke`],
      ['Phrase pas finie', 'desire', (c) => `Justin commence à le dire à ${c.t}, ne finit pas, se sauve`, (c) => `justin starts telling ${c.tE} (${c.wE}), does not finish, finds an excuse to leave`],
      ['Dit en face', 'desire', (c) => `Justin le dit en face à ${c.t} : ${c.w}`, (c) => `justin says it plainly to ${c.tE}'s face (${c.wE})`]],
    expect: [['Sa réputation', 'info', (c) => `On parle ${de(c.x)} : ${c.px ? PEXP[c.px] : 'une promesse précise'}`, (c) => `${c.xE} is not there yet: ${c.pxEn || 'the others make a precise promise about them'}`],
      ['Voix basse', 'info', (c) => `On baisse la voix quand on parle ${de(c.x)}`, (c) => `everyone lowers their voice when ${c.xE} comes up`],
      ['Une règle à cause de lui', 'info', (c) => `Une règle que tous suivent à cause ${de(c.x)}`, (c) => `a rule everyone follows because of ${c.xE}`],
      ['Ce que son absence a changé', 'info', (c) => `Ce que l’absence ${de(c.x)} a changé`, (c) => `what ${c.xE}'s absence has changed, said by someone who minds`]],
    tease: [['Dans cinq minutes', 'stakes', (c) => `« ${c.x} sera là dans cinq minutes. » Tous se recoiffent`, (c) => `"${c.xE} will be here in five minutes." Everyone straightens up`],
      ['On court prévenir', 'stakes', (c) => `Quelqu’un part en courant prévenir que ${c.x} arrive`, (c) => `someone runs off to warn that ${c.xE} is coming`],
      ['Une heure précise', 'stakes', (c) => `« À minuit, ${c.x} sera là. »`, (c) => `"At midnight, ${c.xE} will be here."`]],
    enter: PILLARS.map((p) => [p.sur, 'char', (c) => `${c.x} : ${p.sur.charAt(0).toLowerCase() + p.sur.slice(1)}`, (c) => `${c.xE} appears and proves they are ${p.en.split(' (')[0]}: ${p.surEn}`]),
    gone: [['Sort et ne revient pas', 'info', (c) => `${c.x} sort « deux minutes » et ne revient pas`, (c) => `${c.xE} steps out "for two minutes" and never comes back`],
      ['Ses affaires sont encore là', 'info', (c) => `La cape ${de(c.x)} sur sa chaise, ${c.x} n’est plus là`, (c) => `${c.xE}'s cloak is still on the chair; ${c.xE} is gone`],
      ['Un mot à moitié écrit', 'info', (c) => `${c.x} laisse un mot à moitié écrit`, (c) => `${c.xE} left a note, half written`]],
    conflict: [['Prise de position', 'stakes', (c) => `${c.o} : quelqu’un prend position devant tous`, (c) => `${c.oE}; someone takes a side in front of everyone`],
      ['Menace « si tu…, je… »', 'stakes', (c) => `${c.o} : « Si tu…, je… »`, (c) => `${c.oE}; a threat: "if you..., I..."`],
      ['Même phrase, fins opposées', 'char', (c) => `${c.o} : même début de phrase, fins opposées`, (c) => `${c.oE}; the two start the same sentence and end it the opposite way`],
      ['Aveu qui fait mal', 'stakes', (c) => `${c.o} : un aveu qui fait mal`, (c) => `${c.oE}; a confession that hurts`]],
    past: [['Souvenir à deux versions', 'rel', (c) => `${c.i} : un souvenir, deux versions`, (c) => `${c.iE}: they remember it together, each with their own version`],
      ['Dit en passant', 'rel', (c) => `${c.i} : dit en une ligne, en passant`, (c) => `${c.iE}: said in one line, in passing`],
      ['Blague à eux', 'rel', (c) => `${c.i} : une blague que seuls eux comprennent`, (c) => `${c.iE}: a joke only they understand`]],
    seen: [['Caché sans un regard', 'info', (c) => `${c.i} : caché sans être regardé`, (c) => `${c.iE}: hidden away without a look`],
      ['Main retirée', 'info', (c) => `${c.i} : on tend la main, l’autre le retire`, (c) => `${c.iE}: someone reaches for it, the other pulls it back`],
      ['Personne n’y touche', 'info', (c) => `${c.i} : posé là, personne n’y touche`, (c) => `${c.iE}: it lies there, nobody touches it`]],
    plant: [['Un nom en passant', 'callback', () => 'Un nom dit en passant', (c) => `a name said in passing (later it gives away: ${c.iE})`],
      ['Habitude qui passe pour une blague', 'callback', (c) => `Une habitude ${de(c.s)} qui passe pour une blague`, (c) => `a habit of ${c.sE} that passes for a joke (later it means: ${c.iE})`],
      ['Surnom d’enfance', 'callback', () => 'Un surnom d’enfance, dit en riant', (c) => `a childhood nickname, said laughing (later it means: ${c.iE})`],
      ['Question esquivée', 'callback', (c) => `Une question à ${c.s}, esquivée`, (c) => `a question to ${c.sE}, dodged with a joke (the answer is: ${c.iE})`]],
    liked: [['Il paie la tournée', 'stakes', (c) => `${c.a} paie la tournée à tout le monde`, (c) => `${c.aE} buys everyone a round; the whole room loves them`],
      ['Il sauve quelqu’un', 'stakes', (c) => `${c.a} sauve quelqu’un devant tous`, (c) => `${c.aE} saves someone in front of everyone`],
      ['Même un proche le défend', 'stakes', (c) => `Même ${c.d} défend ${c.a}`, (c) => `even ${c.dE} takes ${c.aE}'s side`]],
    danger: [['Le dernier qui y est allé', 'stakes', () => 'On raconte ce qui est arrivé au dernier qui y est allé', () => 'someone tells what happened to the last one who went there'],
      ['Personne n’y va', 'stakes', () => '« Personne n’y va la nuit. » Justin doit y aller', () => '"Nobody goes there at night." justin has to']],
    easy: [['Petit mensonge démasqué', 'stakes', (c) => `Un petit mensonge, démasqué devant ${c.t}`, (c) => `a small lie, exposed in front of ${c.tE}`],
      ['Gagner du temps', 'stakes', (c) => `Justin gagne du temps ; ${c.t} l’apprend par un autre`, (c) => `justin buys time; ${c.tE} hears it from someone else`],
      ['Promettre aux deux', 'stakes', () => 'Justin promet aux deux, ça éclate', () => 'justin promises both sides; it blows up']],
    gag: [['Il va le dire, et se tait', 'stakes', (c) => `Justin ouvre la bouche, se tait quand ${c.s} entre`, (c) => `justin is about to tell, and stops when ${c.sE} walks in`],
      ['Secret contre secret', 'stakes', (c) => `${c.s} : « Dis-le, et je dis le tien. »`, (c) => `${c.sE}: "Tell them, and I tell yours."`]],
    reveal: [['Question banale', 'info', (c) => `Une question banale ; la réponse : ${c.i}`, (c) => `a harmless question; the answer is it (${c.iE}); silence, nobody explains`],
      ['Crié devant tous', 'info', (c) => `${c.i} : crié en colère, devant tous`, (c) => `${c.iE}: shouted in anger, in front of everyone`],
      ['Demande qui révèle', 'info', (c) => `${c.i} : sort dans une demande`, (c) => `${c.iE}: it comes out inside a demand`],
      ['Pris sur le fait', 'info', (c) => `${c.i} : quelqu’un le surprend`, (c) => `${c.iE}: someone catches it happening`]],
    open: [['Ouvert devant tous', 'info', (c) => `${c.i} : ouvert devant tous`, (c) => `${c.iE}: opened in front of everyone`],
      ['Lu par la mauvaise personne', 'info', (c) => `${c.i} : lu à voix haute par la mauvaise personne`, (c) => `${c.iE}: read out loud by the wrong person`]],
    twist: [['Silence', 'callback', () => 'Silence. Personne n’explique', () => 'silence; nobody explains; the player connects it'],
      ['Les détails reviennent', 'callback', () => 'Les détails plantés reviennent, un par un', () => 'the planted details come back, one by one'],
      ['La scène d’après paie', 'callback', () => 'La scène d’après en paie le prix', () => 'the next scene pays the price']],
    clock: [['À l’aube', 'stakes', (c) => `« À l’aube, ${c.t} part. »`, (c) => `"At dawn, ${c.tE} leaves."`], ['Il reste une heure', 'stakes', () => '« Il reste une heure. »', () => '"One hour left."']],
    pick: [['Le même moment', '', (c) => `${c.t} ou ${c.d} : les deux veulent le même moment`, (c) => `${c.tE} or ${c.dE}: both ask for the same moment`],
      ['Menace juste avant', '', (c) => `${c.t} ou ${c.d} : une menace juste avant`, (c) => `${c.tE} or ${c.dE}: a threat right before ("If you go with them, I'm gone")`],
      ['Aveu juste avant', '', (c) => `${c.t} ou ${c.d} : un aveu juste avant`, (c) => `${c.tE} or ${c.dE}: a vulnerable confession right before`]],
    choice: [['Deux issues lues avant', '', () => 'Choix : deux issues qui changent un lien', () => 'two outcomes the player reads before tapping, each changes a bond'],
      ['Menace juste avant', '', () => 'Choix : « Si tu…, je… » juste avant', () => 'right before: "if you..., I..."'],
      ['Aveu juste avant', '', () => 'Choix : un aveu juste avant', () => 'right before: a vulnerable confession']],
    cost: [['Chaise vide', 'rel', (c) => `Une chaise vide, là où l’autre s’asseyait`, () => 'an empty chair where the one he lost used to sit'],
      ['Un mot laissé', 'rel', () => 'Un mot laissé pour Justin', () => 'a note left for justin'], ['Ne le regarde plus', 'rel', () => 'Quelqu’un ne le regarde plus', () => 'someone does not look at him anymore']],
    end: [['Qui, quand, où', 'info', () => 'Une dernière ligne : qui, quand, où', () => 'a last line that announces who, when, where'], ['Nouvelle question', 'info', () => 'Une nouvelle question, sans réponse', () => 'a new question, unanswered']],
  };

  // ---- 📖 the example (03/11, « scarcity »): ONE story, concrete end to end, to see the whole chain work. Amare stole
  // Melissa's mother's ring to ask Ruby to marry him; his lie « chez ma mère, elle est malade » (Melissa: « il ne parle
  // jamais de sa famille »), the jasmine on his boots, the ring on Ruby's finger. Each beat's words: txt[id] = [fr, en];
  // each choice's options: opt[id]. Episode 1 is also written line by line (EX_EP1) and plays as it is ----
  const PRESET = () => ({ decor: 'taverne', cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['charmeur', 'genie'], ruby: ['mysterieux'], amare: ['chef', 'charmeur'], melissa: ['protecteur'] },
    flaw: { justin: 'lache' }, want: { justin: { v: 'love', t: 'ruby' }, amare: { v: 'love', t: 'ruby' } }, rel: { 'amare|ruby': 'couple', 'justin|melissa': 'friend' }, infos: [],
    ev: [{ k: 'arrive', x: 'amare' }, { k: 'theft', x: 'amare', v: 'melissa', s: null, h: 1 }], hard: { liked: 1 }, tq: { inc: 3 }, picked: {}, ex: 1,
    txt: {
      hook1: ['Ruby entre sur la terrasse. Les conversations s’arrêtent ; Justin oublie la chope qu’il essuyait.', 'Ruby walks onto the terrace. Talk stops; justin forgets the mug he was drying.'],
      hook2: ['Melissa, qui arrose le jasmin sous sa fenêtre, baisse la voix : « Amare rentre ce soir. »', 'Melissa, watering the jasmine under her window, lowers her voice: "Amare is back tonight."'],
      d1: ['Justin, à Melissa : « Un jour je lui dis. Ruby me regarde comme si j’étais pas juste le barman. » Melissa : « Tu dis ça chaque été. »', 'justin to Melissa: "One day I tell her. Ruby looks at me like I\'m not just the barman." Melissa: "You say that every summer."'],
      expect: ['On parle d’Amare : il a sauvé le port cet hiver, personne ne lui a jamais dit non.', 'They talk about Amare: he saved the harbour this winter, nobody has ever told him no.'],
      incq: ['Melissa, plus bas : « Sa chambre était vide, hier soir. Il était où ? » Personne ne sait.', 'Melissa, lower: "His room was empty last night. Where was he?" Nobody knows.'],
      tease: ['Une cloche au portail : « Il monte ! » Ruby replace ses cheveux.', 'A bell at the gate: "He\'s coming up!" Ruby fixes her hair.'],
      inct: ['Chacun sa théorie : une dette, une autre femme. Melissa : « Il parle jamais de sa famille. Jamais. »', 'Everyone has a theory: a debt, another woman. Melissa: "He never talks about his family. Never."'],
      inc: ['Amare entre, salué comme un héros. Melissa : « T’étais où, hier soir ? » Silence. Amare : « Chez ma mère. Elle est malade. » On lui pardonne tout. C’est faux.', 'Amare walks in, greeted like a hero. Melissa: "Where were you last night?" Silence. Amare: "At my mother\'s. She\'s sick." Everyone forgives him. It is a lie.'],
      m2: ['Amare embrasse Ruby devant Justin : « Justin a toujours eu un faible pour ce qui n’est pas à lui. » Rires.', 'Amare kisses Ruby in front of justin: "justin always had a thing for what isn\'t his." Laughter.'],
      liked: ['Toute la terrasse rit avec lui ; même Melissa lui sert sa meilleure bouteille.', 'The whole terrace laughs with him; even Melissa pours him her best bottle.'],
      m3: ['Ruby, en passant derrière le comptoir, frôle la main de Justin : « Tu m’as manqué, toi. »', 'Ruby, passing behind the counter, brushes justin\'s hand: "I missed you."'],
      ch1b: ['Melissa, débordée, la salle pleine pour Amare : « Reste, ce soir. J’ai besoin de toi. »', 'Melissa, swamped, the room full for Amare: "Stay tonight. I need you."'],
      // episode 2: the theft, its theories, what Amare lets slip (a promise), why it matters, the doubt about his answer
      ev4: ['Soudain, un cri : la bague de la mère de Melissa a disparu de sa chambre.', 'Suddenly, a scream: Melissa\'s mother\'s ring is gone from her room.'],
      th0: ['Chacun son coupable : « Un client d’hier. » « Un marin de passage. » Personne ne regarde Amare.', 'Everyone has a culprit: "A customer from last night." "A sailor passing through." Nobody looks at Amare.'],
      m5: ['Amare garde la main de Ruby dans la sienne. Elle ne la retire pas.', 'Amare keeps Ruby\'s hand in his. She does not pull it away.'],
      clue0: ['Ruby, pour rire : « Il est rentré à trois heures. Il sentait le jasmin. »', 'Ruby, laughing: "He came home at three. He smelled of jasmine."'],
      pr0: ['Amare, à Ruby, devant tous : « Bientôt, je te demande quelque chose. »', 'Amare to Ruby, in front of everyone: "Soon I\'ll ask you something."'],
      m6: ['Justin, à Melissa : « On va la retrouver. Je te le promets. »', 'justin to Melissa: "We\'ll find it. I promise."'],
      incd: ['Justin, à part : « Chez sa mère ? Melissa dit qu’il n’en parle jamais. »', 'justin, aside: "His mother\'s? Melissa says he never talks about her."'],
      m7: ['Ruby se met devant Amare : « Tu l’accuses de quoi, exactement, Justin ? »', 'Ruby steps in front of Amare: "Accusing him of what, exactly, justin?"'],
      p8: ['Pendant ce temps, Amare glisse quelque chose dans sa poche quand Melissa passe.', 'Meanwhile, Amare slips something into his pocket as Melissa walks by.'],
      p9: ['Melissa, les yeux rouges : « C’était tout ce qui me restait d’elle. Je trouverai qui. »', 'Melissa, red-eyed: "It was all I had left of her. I\'ll find who."'],
      m10: ['Justin comprend : s’il accuse Amare, Ruby le déteste ; s’il se tait, Melissa reste seule.', 'justin sees it: if he accuses Amare, Ruby hates him; if he stays quiet, Melissa is alone.'],
      ch2a: ['Justin remarque de la terre et des pétales de jasmin sur les bottes d’Amare.', 'justin notices soil and jasmine petals on Amare\'s boots.'],
      ch2b: ['Melissa : « Toi, au moins, t’es de mon côté. Hein ? »', 'Melissa: "You, at least, are on my side. Right?"'],
      // episode 3: the easy way fails, the answer slips away twice, the outsider theory dies, a clue, the promise comes closer
      m11: ['Justin, à Ruby : « J’ai rien contre lui. » Ruby : « Menteur. Je t’ai entendu. »', 'justin to Ruby: "I\'ve got nothing against him." Ruby: "Liar. I heard you."'],
      m12: ['Justin insiste ; Amare balaie : « Cherche plutôt du côté des clients d’hier. »', 'justin insists; Amare brushes it off: "Look at yesterday\'s customers instead."'],
      na0: ['Melissa : « Le portail était fermé hier soir. De l’intérieur. » Plus personne ne parle des clients.', 'Melissa: "The gate was locked last night. From the inside." Nobody mentions the customers anymore.'],
      pn0: ['Amare, à Ruby : « Ce soir, sur la terrasse. Mets ta plus belle robe. »', 'Amare to Ruby: "Tonight, on the terrace. Wear your best dress."'],
      m13: ['Melissa trouve l’écrin vide sous l’escalier qui monte chez Amare.', 'Melissa finds the empty ring box under the stairs to Amare\'s room.'],
      're:Q:in': ['Ruby, à Amare : « Et ta mère, elle va mieux ? » Amare : « Mieux. » Il regarde ailleurs.', 'Ruby to Amare: "And your mother, is she better?" Amare: "Better." He looks away.'],
      p14: ['Melissa fouille les chambres une à une ; celle d’Amare reste fermée.', 'Melissa searches the rooms one by one; Amare\'s stays locked.'],
      p15: ['Ruby bloque la porte d’Amare : « Personne ne fouille chez lui. »', 'Ruby blocks Amare\'s door: "Nobody searches his room."'],
      m16: ['Amare, à Ruby, tout bas : « Toi, tu sais qui je suis. Les laisse pas me salir. »', 'Amare to Ruby, low: "You know who I am. Don\'t let them drag me down."'],
      ch3a: ['Ruby, seule avec Justin : « Si tu me demandais de partir avec toi… je dirais peut-être oui. »', 'Ruby, alone with justin: "If you asked me to leave with you... I might say yes."'],
      ch3b: ['Melissa : « Ce soir j’entre chez lui. J’ai besoin que tu sois là. »', 'Melissa: "Tonight I go into his room. I need you there."'],
      who0: ['Sur la terrasse, Amare s’agenouille devant Ruby et ouvre la main : la bague de la mère de Melissa. Melissa la reconnaît.', 'On the terrace, Amare kneels before Ruby and opens his hand: Melissa\'s mother\'s ring. Melissa recognizes it.'],
      twist: ['Tout revient : « chez ma mère », le jasmin, la chambre fermée. Personne n’explique.', 'It all comes back: "at my mother\'s", the jasmine, the locked room. Nobody explains.'],
      picka: ['Si Justin prend la main de Ruby maintenant, Melissa affronte Amare seule.', 'If justin takes Ruby\'s hand now, Melissa faces Amare alone.'],
      pickb: ['S’il se range près de Melissa, Ruby dit oui à Amare, la bague volée au doigt.', 'If he stands by Melissa, Ruby says yes to Amare, the stolen ring on her finger.'],
      cost: ['Une chaise vide au comptoir, là où l’autre s’asseyait.', 'An empty stool at the counter, where the other one used to sit.'],
      end: ['« Demain, au port, à l’aube. On règle ça. »', '"Tomorrow, at the harbour, at dawn. We settle this."'],
    },
    opt: {
      ch1: [['La suivre dehors', 'Au clair de lune, Ruby attend qu’il parle ; Melissa sert seule la salle d’Amare, et Amare les a vus', 'under the moon Ruby waits for him to speak; Melissa serves Amare\'s crowd alone, and Amare saw them'], ['Rester avec Melissa', 'Il tient le comptoir avec elle ; Ruby rentre sans un regard pour lui', 'he holds the counter with her; Ruby goes in without a look at him']],
      ch2: [['Accuser Amare devant tous', 'La terrasse défend Amare, Justin passe pour un jaloux ; seule Melissa le croit', 'the terrace defends Amare, justin looks jealous; only Melissa believes him'], ['Rester avec Melissa', 'Il la serre contre lui ; Amare s’éclipse, tranquille', 'he holds her; Amare slips away, calm']],
      ch3: [['Partir avec Ruby', 'Ils descendent vers le port ; Melissa entre seule chez Amare', 'they go down to the harbour; Melissa enters Amare\'s room alone'], ['Aller avec Melissa', 'Ruby attend au port, puis remonte vers Amare', 'Ruby waits at the harbour, then goes back up to Amare']],
    } });
  // episode 1 of the example, written line by line (what Haiku should reach from its plan): plays as it is
  const EX_EP1 = { episode: 1, title: 'Le voleur de la taverne · épisode 1', scene: 'taverne', steps: [
    { who: 'ruby', pose: 'listen', to: 'justin', text: 'Tu essuies cette chope depuis que je suis entrée.' },
    { who: 'justin', pose: 'surprised', to: 'ruby', text: 'Elle était… très sale.' },
    { who: 'melissa', pose: 'thinking', to: 'justin', text: 'Amare rentre ce soir.' },
    { who: 'justin', pose: 'explaining', to: 'melissa', text: 'Un jour je lui dis. Elle me regarde comme si j’étais pas juste le barman.' },
    { who: 'melissa', pose: 'listen', to: 'justin', text: 'Tu dis ça chaque été.' },
    { who: 'melissa', pose: 'explaining', to: 'justin', text: 'Toute la ville l’attend. Il a sauvé le port cet hiver.' },
    { who: 'justin', pose: 'thinking', to: 'melissa', text: 'Et personne lui a jamais dit non.' },
    { who: 'melissa', pose: 'thinking', to: 'justin', text: 'Sa chambre était vide, hier soir. Il était où ?' },
    { who: 'ruby', pose: 'surprised', to: 'melissa', text: 'Il monte. Je l’entends.' },
    { who: 'justin', pose: 'thinking', to: 'melissa', text: 'Une dette. Une autre femme.' },
    { who: 'melissa', pose: 'holding', to: 'justin', text: 'Il parle jamais de sa famille. Jamais.' },
    { hush: true },
    { who: 'amare', pose: 'explaining', to: 'ruby', text: 'Vous m’attendiez ?' },
    { who: 'melissa', pose: 'angry', to: 'amare', text: 'T’étais où, hier soir ?' },
    { who: 'amare', pose: 'listen', to: 'melissa', text: 'Chez ma mère. Elle est malade.' },
    { who: 'ruby', pose: 'surprised', to: 'amare', text: 'Oh, Amare…' },
    { who: 'amare', pose: 'explaining', to: 'justin', text: 'Justin a toujours eu un faible pour ce qui est pas à lui.' },
    { who: 'melissa', pose: 'holding', to: 'amare', text: 'La meilleure bouteille. Pour le héros du port.' },
    { who: 'ruby', pose: 'listen', to: 'justin', text: 'Tu m’as manqué, toi.' },
    { who: 'melissa', pose: 'holding', to: 'justin', text: 'Reste, ce soir. J’ai besoin de toi.' },
    { choice: [
      { t: 'La suivre dehors', say: 'Ruby. Attends.', tone: 'audacieux', then: [
        { who: 'ruby', pose: 'listen', to: 'justin', text: 'Alors ? Tu voulais me dire quelque chose ?' },
        { who: 'amare', pose: 'angry', to: 'justin', text: 'Je t’ai vu.' }] },
      { t: 'Rester avec Melissa', say: 'Je reste. Passe-moi les chopes.', tone: 'loyal', then: [
        { who: 'melissa', pose: 'listen', to: 'justin', text: 'Merci.' },
        { who: 'ruby', pose: 'thinking', to: 'justin', text: '… Bonne nuit, Justin.' }] }] },
    { who: 'melissa', pose: 'surprised', to: 'justin', text: 'Justin… la bague de ma mère. Elle est plus dans ma chambre.' },
  ], next: ['Si tu l’as suivie : Amare t’a vu avec Ruby, et Melissa découvre que la bague de sa mère a disparu.', 'Si tu es resté avec Melissa : Ruby t’en veut, et Melissa découvre que la bague de sa mère a disparu.'] };

  // ---- the state, kept on this phone ----
  const KEY = 'smt-forge2';
  const BASE = () => ({ decor: 'taverne', cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['charmeur', 'genie'], ruby: ['mysterieux'], amare: ['chef', 'charmeur'], melissa: ['protecteur'] },
    flaw: { justin: 'lache' }, want: { justin: { v: 'love', t: 'ruby' }, amare: { v: 'love', t: 'ruby' } }, rel: { 'amare|ruby': 'couple', 'justin|melissa': 'friend' },
    infos: [{ id: 'villain', x: 'amare' }, { id: 'exes', x: 'justin', y: 'ruby' }], inc: { k: 'shift', who: 'amare' }, hard: { liked: 1 }, tq: {}, picked: {}, ev: [{ k: 'arrive', x: 'amare' }] });
  let S = (() => { try { const s = JSON.parse(ls(KEY)); if (s && Array.isArray(s.cast)) { if (!Array.isArray(s.infos)) s.infos = []; if (!s.tq) s.tq = {}; if (!s.picked) s.picked = {}; if (!Array.isArray(s.ev)) s.ev = s.inc ? [{ k: s.inc.k === 'gone' ? 'gone' : 'arrive', x: s.inc.who }] : []; return { ...BASE(), ...s }; } } catch { /* none yet */ } return BASE(); })();
  const save = () => ls(KEY, JSON.stringify(S));
  let el = null, msg = '', openK = null, braid = false, sbAct = true; const sbOpen = new Set();
  const LANE = ['#ff375f', '#0a84ff', '#30d158', '#bf5af2', '#ff9f0a', '#64d2ff'];

  const J = 'justin';
  // ---- the threads' clock (15/11): CUR_ACT = the act being worked out (9 = the whole story); NOW = the moment of the
  // schedule being built (which events have happened, who is dead or gone); vary = a stable draw (S.seed: 🎲 changes it) ----
  let CUR_ACT = 9, NOW = null, AUTO = null;
  const ACTS = () => (S.acts === 2 ? 2 : 1);
  const actOf = (x) => Math.min(ACTS(), x.a || 1);
  const hsh = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
  const vary = (key, n) => (n ? hsh(`${S.seed || 1}|${key}`) % n : 0);
  const people = () => [J, ...S.cast];
  const nm = (id) => (id === J ? 'Justin' : nameOf(id)), en = (id) => (id === J ? 'justin' : nameOf(id));
  const pillarsOf = (id) => (S.pil[id] || []).filter((p) => P[p]);
  const tag = (id) => { const ps = pillarsOf(id); return ps.length ? ps.map((p) => `${P[p].e} ${P[p].n}`).join(' + ') + (S.flaw[id] ? ` · ${F[S.flaw[id]].e}` : '') : ''; };
  const pk = (a, b) => [a, b].sort().join('|');
  const rel = (a, b) => S.rel[pk(a, b)] || '';
  const live = (id) => id === J || S.cast.includes(id);
  const wantOf = (id) => { const w = S.want[id]; return w && W[w.v] && (!W[w.v].t || live(w.t)) ? w : null; };
  // the infos in play: their people still in the story
  const infos = () => (S.infos || []).filter((i) => IN[i.id] && live(i.x) && (IN[i.id].s < 2 || live(i.y)));
  const infoFr = (i) => { const g = graph().say.get(i); return g ? g[0] : IN[i.id].fr(nm(i.x), nm(i.y)); }, infoEn = (i) => { const g = graph().say.get(i); return g ? g[1] : IN[i.id].en(en(i.x), en(i.y)); };
  const kinds = (k) => infos().filter((i) => IN[i.id].k === k);
  const mini = (id) => `<span class="fMini">${face(id)}</span>`;

  // ==== THE STORY ENGINE (03/11): desires → conflicts → plotlines → a braid of beats → episodes → the climax ====
  // A DESIRE { id, who, k, t (whom), s (1 basic, 2 a bond, 3 chosen / a flaw / an event / an info), src }: every character
  // has the basic ones (stay alive, respect); a bond gives « protect » (a couple, a crush: « romance »); what you give
  // him (🎯), his flaw, the events and the infos give the rest. A CONFLICT = two desires that can't both win. A PLOTLINE
  // = a strong desire with its conflicts: Justin's are the main lines, the others' run « meanwhile ». The CLIMAX = a
  // choice between two of Justin's desires (« Ruby ou la liberté ? »). Raise stakes always strengthens a desire that exists
  const idOf = (name) => people().find((p) => nm(p) === name || en(p) === name) || null;   // a name back to its character
  const DK = {
    alive: { e: '🫀', n: 'rester en vie', en: 'stay alive', lab: () => 'sa vie', labE: () => 'his life', act: () => 'Se mettre à l’abri', actE: () => 'get to safety',
      hurt: (w) => `${w} se met en danger`, hurtE: (w) => `${w} is in danger`, raise: (w) => `La menace se rapproche ${de(w)}`, raiseE: (w) => `the threat closes in on ${w}`,
      show: (w) => `${w} a peur pour sa vie`, showE: (w) => `${w} fears for their life` },
    respect: { e: '👑', n: 'le respect', en: 'respect', lab: () => 'son honneur', labE: () => 'his pride', act: () => 'Sauver la face', actE: () => 'save face',
      hurt: (w) => `${w} perd la face devant tous`, hurtE: (w) => `${w} loses face in front of everyone`, raise: (w) => `On rit ${de(w)} devant tous`, raiseE: (w) => `people laugh at ${w} in front of everyone`,
      show: (w) => `${w} veut qu’on le respecte`, showE: (w) => `${w} wants to be respected` },
    protect: { e: '🛡️', t: 1, n: 'protéger', en: 'protect', lab: (t) => t, labE: (t) => t, act: (t) => `Protéger ${t}`, actE: (t) => `protect ${t}`,
      hurt: (w, t) => (lifeAtStake(idOf(t)) ? `${t} se retrouve seul·e, en danger` : `${w} lâche ${t}, qui comptait sur lui`), hurtE: (w, t) => (lifeAtStake(idOf(t)) ? `${t} is left alone, in danger` : `${w} lets ${t} down`),
      raise: (w, t) => (lifeAtStake(idOf(t)) ? `${t} est menacé·e, et ${w} le voit` : `${t} compte sur ${w}, et le lui dit`), raiseE: (w, t) => (lifeAtStake(idOf(t)) ? `${t} is threatened, and ${w} sees it` : `${t} counts on ${w}, and says so`),
      show: (w, t) => `${w} prend soin ${de(t)}`, showE: (w, t) => `${w} takes care of ${t}` },
    love: { e: '❤️', t: 1, n: 'une romance avec', en: 'a romance with', lab: (t) => t, labE: (t) => t, act: (t) => `Aller vers ${t}`, actE: (t) => `go to ${t}`,
      hurt: (w, t) => `${t} s’éloigne ${de(w)}`, hurtE: (w, t) => `${t} drifts away from ${w}`, raise: (w, t) => `${w} et ${t} : un regard qui dure trop`, raiseE: (w, t) => `${w} and ${t}: a look that lasts too long`,
      show: (w, t) => `${w} veut ${t}`, showE: (w, t) => `${w} wants ${t}` },
    free: { e: '🕊️', n: 'être libre', en: 'be free', lab: () => 'la liberté', labE: () => 'freedom', act: () => 'Partir', actE: () => 'leave',
      hurt: (w) => `${w} reste coincé ici`, hurtE: (w) => `${w} is stuck here`, raise: (w) => `La porte se referme sur ${w}`, raiseE: (w) => `the way out closes on ${w}`,
      show: (w) => `${w} rêve de partir`, showE: (w) => `${w} dreams of leaving` },
    find: { e: '🔦', t: 1, n: 'retrouver', en: 'find', lab: (t) => t, labE: (t) => t, act: (t) => `Partir chercher ${t}`, actE: (t) => `go look for ${t}`,
      hurt: (w, t) => `La piste ${de(t)} se perd`, hurtE: (w, t) => `the trail of ${t} goes cold`, raise: (w, t) => `Un signe ${de(t)}, puis plus rien`, raiseE: (w, t) => `a sign of ${t}, then nothing`,
      show: (w, t) => `${w} veut retrouver ${t}`, showE: (w, t) => `${w} wants to find ${t}` },
    oust: { e: '😤', t: 1, n: 'écarter', en: 'get rid of', lab: (t) => `écarter ${t}`, labE: (t) => `getting rid of ${t}`, act: (t) => `Écarter ${t}`, actE: (t) => `push ${t} aside`,
      hurt: (w, t) => `${t} prend toute la place`, hurtE: (w, t) => `${t} takes over`, raise: (w, t) => `${w} s’en prend à ${t} devant tous`, raiseE: (w, t) => `${w} goes after ${t} in front of everyone`,
      show: (w, t) => `${w} ne supporte pas ${t}`, showE: (w, t) => `${w} can't stand ${t}` },
    justice: { e: '⚖️', t: 1, n: 'la vérité sur', en: 'the truth about', lab: () => 'la vérité', labE: () => 'the truth', act: (t) => (t === 'le coupable' ? 'Chercher le coupable' : `Dénoncer ${t}`), actE: (t) => (t === 'the culprit' ? 'look for the culprit' : `expose ${t}`),
      hurt: (w, t) => (t === 'le coupable' ? 'Le coupable court toujours' : `${t} s’en tire`), hurtE: (w, t) => (t === 'the culprit' ? 'the culprit is still out there' : `${t} gets away with it`), raise: (w, t) => `Un indice de plus contre ${t}`, raiseE: (w, t) => `one more clue against ${t}`,
      show: (w, t) => `${w} veut savoir la vérité (${t})`, showE: (w, t) => `${w} wants the truth (${t})` },
    hide: { e: '🤫', n: 'garder son secret', en: 'keep a secret', lab: () => 'son secret', labE: () => 'his secret', act: () => 'Garder le secret', actE: () => 'keep the secret',
      hurt: (w) => `Le secret ${de(w)} est près de sortir`, hurtE: (w) => `${w}'s secret is about to come out`, raise: (w) => `Quelqu’un s’approche du secret ${de(w)}`, raiseE: (w) => `someone gets close to ${w}'s secret`,
      show: (w) => `${w} cache quelque chose`, showE: (w) => `${w} is hiding something` },
    win: { e: '🏆', n: 'être reconnu', en: 'be recognized', lab: () => 'sa chance', labE: () => 'his chance', act: () => 'Tenter sa chance', actE: () => 'take the chance',
      hurt: (w) => `${w} rate sa chance`, hurtE: (w) => `${w} misses the chance`, raise: (w) => `La chance ${de(w)} approche`, raiseE: (w) => `${w}'s chance comes closer`,
      show: (w) => `${w} veut sa place`, showE: (w) => `${w} wants their place` },
  };
  // the big events that start or feed plotlines: x = who arrives, goes, did it or threatens; v = the victim (off screen if
  // none); s = who looks for the culprit; h = the culprit is hidden (a whodunit: revealed in the crisis)
  const EVK = [
    { id: 'arrive', e: '⚡', n: 'Arrive', d: 'Quelqu’un arrive, et ça change tout. Présenté en 3 temps s’il ouvre l’histoire.', slots: ['x'] },
    { id: 'gone', e: '👻', n: 'Disparaît', d: 'Quelqu’un disparaît : ceux qui l’aiment veulent le retrouver.', slots: ['x'] },
    { id: 'murder', e: '🗡️', n: 'Un meurtre', d: 'Quelqu’un est tué. Le coupable veut se cacher ; ceux qui aimaient la victime veulent la vérité ; un tueur est parmi eux.', slots: ['v', 'x', 's'], crime: 1 },
    { id: 'theft', e: '💰', n: 'Un vol', d: 'Quelqu’un a été volé. Le voleur se cache ; la victime veut la vérité.', slots: ['v', 'x', 's'], crime: 1 },
    { id: 'betray', e: '🐍', n: 'Une trahison', d: 'Quelqu’un a été trahi. Le traître se cache ; le trahi veut la vérité.', slots: ['v', 'x', 's'], crime: 1 },
    { id: 'threat', e: '☠️', n: 'Une menace de mort', d: 'Quelqu’un menace la vie d’un autre : sa vie, et ceux qui le protègent, sont en jeu.', slots: ['v', 'x'] },
    { id: 'revenge', e: '🔥', n: 'Une revanche', d: 'Quelqu’un veut faire payer un autre (celui qui l’a démasqué, humilié, quitté) : il veut l’écarter, et ceux qui tiennent à lui s’interposent.', slots: ['v', 'x'] },
  ];
  const EK = Object.fromEntries(EVK.map((x) => [x.id, x]));
  // act 2 with no event of its own: the one act 1 exposed (or the one against Justin) strikes back. « Le besoin reste, la
  // cible change » : a killer or a dangerous one threatens a life, anyone else wants to make someone pay
  const autoEv = () => { if (ACTS() < 2 || (S.ev || []).some((e) => EK[e.k] && (e.a || 1) === 2 && live(e.x))) return null;
    const AS0 = actState(), arc = AS0.arcs.find((r) => ['vengeance', 'rancune'].includes(r.mode) && live(r.who) && live(r.x) && !AS0.gone.includes(r.who) && !AS0.kill.includes(r.who));
    if (arc) { const tv = traitsOf(arc.who, 2), k0 = tv.violence >= 3 && tv.ruse < 2 ? 'threat' : 'revenge';   // a violent one threatens a life; a cunning one makes him pay
      if (!AUTO || AUTO.x !== arc.who || AUTO.v !== arc.x || AUTO.k !== k0) AUTO = { k: k0, x: arc.who, v: arc.x, a: 2, auto: 1, s: null, h: 0 }; return AUTO; }
    const out2 = (p) => AS0.gone.includes(p) || AS0.kill.includes(p) || AS0.arcs.some((r) => r.who === p && ['deuil', 'fuite'].includes(r.mode));
    const th = (S.ev || []).find((e) => ['threat', 'revenge'].includes(e.k) && (e.a || 1) === 1 && live(e.x) && e.x !== J && !out2(e.x));
    if (th) { const v0 = th.v && live(th.v) && !out2(th.v) ? th.v : J, k1 = traitsOf(th.x, 2).violence >= 3 ? 'threat' : 'revenge';
      if (!AUTO || AUTO.x !== th.x || AUTO.v !== v0 || AUTO.k !== k1) AUTO = { k: k1, x: th.x, v: v0, a: 2, auto: 1, s: null, h: 0 }; return AUTO; }
    const cr = (S.ev || []).find((e) => EK[e.k] && EK[e.k].crime && live(e.x) && e.x !== J && (e.a || 1) === 1 && !out2(e.x));
    const x = cr ? cr.x : (() => { const sv = CUR_ACT; CUR_ACT = 1; try { return roles().against; } finally { CUR_ACT = sv; } })();
    if (!x || out2(x)) return null;
    const v = cr ? [cr.s, cr.v, J].find((p) => p && live(p) && p !== x && !(cr.k === 'murder' && p === cr.v)) : J;
    const k = (cr && cr.k === 'murder') || traitsOf(x, 2).violence >= 3 ? 'threat' : 'revenge';
    if (!AUTO || AUTO.x !== x || AUTO.v !== v || AUTO.k !== k) AUTO = { k, x, v, a: 2, auto: 1, s: null, h: 0 };
    return AUTO; };
  let AUTO_BUSY = false;
  const evsAll = () => { const L = (S.ev || []).filter((e) => EK[e.k] && live(e.x)); if (AUTO_BUSY) return L; AUTO_BUSY = true; try { const a = autoEv(); return a ? [...L, a] : L; } finally { AUTO_BUSY = false; } };
  const evs = () => evsAll().filter((e) => actOf(e) <= CUR_ACT);
  const happened = (e) => !NOW || NOW.hap.has(e);
  // ---- THE FACTS, TIED (17/11), STORED (le graphe): a few concrete things the elements of the plot point to, so nothing
  // floats. In the state: S.figs (people off screen: { id: 'A', r: FILS.FIGS index } the one the story needs, or { id, c,
  // by } one added from FILS.FOLK / FIGS), S.things ({ id: has | need | debt, f: 'A', r } the figure's, or { id, c, by }
  // from FILS.THINGS), S.moments (the past, FILS.MOMENTS), S.places (FILS.PLACES), S.links ([{ a, k, b, both?, by? }]:
  // p:<id> a person · f:<id> off screen · t:<id> a thing · i:<n> an info · e:<n> an event · m:<id> a moment of the past ·
  // l:<id> a place · d:<who>:<kind>:<whom> a desire; k = FILS.LINK). weave() draws only what something needs (a crime
  // nobody on stage suffered, « the one they look for », a promise) and keeps what was chosen; the author adds the rest
  // (by: 1). graph() READS: say = an info's words with its ties; facts = sentences [fr, en]; more = the links added ----
  const tied = () => { const L = (S.infos || []).map((i, k) => [i, k]).filter(([i]) => IN[i.id] && live(i.x) && (IN[i.id].s < 2 || live(i.y)));
    return { P: L.find(([i]) => i.id === 'promise'), V: L.find(([i]) => i.id === 'villain'), C: (S.ev || []).map((e, k) => [e, k]).find(([e]) => EK[e.k] && EK[e.k].crime && live(e.x) && !(e.v && live(e.v))) }; };
  // who can a secret be hidden from (a tap on « caché à » / « par peur de »): someone alive, not the one it is about, not one who knows it
  const hideTo = (V, knows) => people().filter((p) => p !== V.x && !knows.includes(p));
  const catOf = (t, c) => (t === 'f' ? [...FILS.FOLK, ...FILS.FIGS.map((R) => [R.k, R.e, R.n, R.nE])] : FILS.CAT[t]).find((x) => x[0] === c);
  // does a ref point to something that is there (the hand-made lists: those given)
  const there = (r, H) => { const t = r[0], v = r.slice(2), list = { f: H.figs, t: H.things, m: H.moments, l: H.places }[t];
    if (t === 'p') return live(v); if (list) return list.some((x) => x.id === v);
    if (t === 'i') { const i = (S.infos || [])[+v]; return !!i && !!IN[i.id] && live(i.x) && (IN[i.id].s < 2 || live(i.y)); }
    if (t === 'e') { const e = (S.ev || [])[+v]; return !!e && !!EK[e.k] && live(e.x); }
    if (t === 'd') { const [w, k, o] = v.split(':'); return !!DK[k] && live(w) && (!o || live(o)); } return false; };
  function weave() {
    const FG = window.FILS && FILS.FIGS; if (!FG) return;
    const { P, V, C } = tied(), old = S.links || [], auto = old.filter((l) => !l.by), was = (a, k, ok = () => true) => auto.find((l) => l.a === a && l.k === k && ok(l.b));
    const figs = [], things = [], links = [], link = (a, k, b) => links.push({ a, k, b });
    const th = (r) => { if (!things.some((t) => t.id === r)) { things.push({ id: r, f: 'A', r }); if (r !== 'has') link(`t:${r}`, 'toward', 'f:A'); } return `t:${r}`; };
    if (P || V || C) {
      const n = FG.length, oa = (S.figs || []).find((f) => f.id === 'A' || (f.id == null && f.r != null)), r0 = oa ? oa.r : S.tq.fig ?? vary('fig', n); figs.push({ id: 'A', r: ((r0 % n) + n) % n });
      const pi = P && `i:${P[1]}`, vi = V && `i:${V[1]}`, w = P && was(pi, 'holds');
      // a promise holds what Y owes the figure (the passage to pay before dawn) or, second draw, the secret of the one he looks for
      const quiet = !!(P && V && V[0].x !== P[0].x && (w ? w.b === vi : (S.tq.prom || 0) % 2 === 1));
      if (P) { if (quiet) link(pi, 'holds', vi); else { const t = th('need'); link(pi, 'holds', t); link(`p:${P[0].y}`, 'owes', t); } }
      if (V) { const t = th('debt'), knows = quiet ? [P[0].y, P[0].x] : [], can = hideTo(V[0], knows), ok = (b) => can.includes(b.slice(2));
        link(vi, 'holds', t); link(`p:${V[0].x}`, 'owes', t); if (quiet) link(vi, 'hidden', 'f:A');
        // hidden from the one he wants (afraid of losing them), unless that one knows
        const t0 = (wantOf(V[0].x) || {}).t, h0 = was(vi, 'hidden', (b) => b[0] === 'p' && ok(b)), h = h0 ? h0.b : t0 && can.includes(t0) ? `p:${t0}` : null;
        if (h) { link(vi, 'hidden', h); const f0 = was(vi, 'fear', ok); link(vi, 'fear', f0 ? f0.b : h); }
        for (const k of knows) link(vi, 'known', `p:${k}`); }
      if (C) { const ci = `e:${C[1]}`; if (C[0].k === 'theft') { const t = th('has'); link('f:A', 'has', t); link(ci, 'takes', t); } else link(ci, 'takes', 'f:A');
        if (C[0].k === 'theft' && P && !quiet && P[0].x === C[0].x) link(ci, 'for', pi); }
    }
    // what the author added: kept while both ends are there; what nothing points to anymore goes
    const H = { figs: [...figs, ...(S.figs || []).filter((x) => x.by)], things: [...things, ...(S.things || []).filter((x) => x.by)], moments: S.moments || [], places: S.places || [] };
    const hand = old.filter((l) => l.by && FILS.LINK[l.k] && there(l.a, H) && there(l.b, H)), used = new Set(hand.flatMap((l) => [l.a, l.b])), kept = (t, L2) => L2.filter((x) => used.has(`${t}:${x.id}`));
    const nx = { figs: [...figs, ...kept('f', H.figs.filter((x) => x.by))], things: [...things, ...kept('t', H.things.filter((x) => x.by))], moments: kept('m', H.moments), places: kept('l', H.places), links: [...links, ...hand] };
    if (JSON.stringify(nx) !== JSON.stringify({ figs: S.figs || [], things: S.things || [], moments: S.moments || [], places: S.places || [], links: old })) { Object.assign(S, nx); save(); }
  }
  // an info or an event gone: the links that point to it go, the others keep pointing to the same element
  const unref = (t, k) => { S.links = (S.links || []).filter((l) => l.a !== `${t}:${k}` && l.b !== `${t}:${k}`)
    .map((l) => { const f = (r) => (r && r[0] === t && +r.slice(2) > k ? `${t}:${+r.slice(2) - 1}` : r); return { ...l, a: f(l.a), b: f(l.b) }; }); };
  // an end of a link in words, never through graph() (evFr would loop): [fr, en]
  const EVN = { arrive: ['l’arrivée', 'the arrival'], gone: ['la disparition', 'the disappearance'], murder: ['le meurtre', 'the murder'], theft: ['le vol', 'the theft'], betray: ['la trahison', 'the betrayal'], threat: ['la menace', 'the threat'], revenge: ['la revanche', 'the revenge'] };
  const nodeTxt = (r) => { const t = r[0], v = r.slice(2);
    if (t === 'p') return [nm(v), en(v)];
    if (t === 'f') { const x = (S.figs || []).find((f) => f.id === v); if (x && x.id === 'A') return [FILS.FIGS[x.r].n, FILS.FIGS[x.r].nE]; const c = x && catOf('f', x.c); return c ? [c[2], c[3]] : ['?', '?']; }
    if (t === 't') { const x = (S.things || []).find((f) => f.id === v); if (!x) return ['?', '?']; if (!x.by) { const T2 = FILS.FIGS[(S.figs.find((f) => f.id === x.f) || { r: 0 }).r].t[x.r]; return [T2[1], T2[2]]; } const c = catOf('t', x.c); return [c[2], c[3]]; }
    if (t === 'm' || t === 'l') { const x = (t === 'm' ? S.moments : S.places).find((f) => f.id === v), c = x && catOf(t, x.c); return c ? [c[2], c[3]] : ['?', '?']; }
    if (t === 'i') { const i = S.infos[+v]; return [IN[i.id].fr(nm(i.x), nm(i.y)), IN[i.id].en(en(i.x), en(i.y))]; }
    if (t === 'd') { const [w, k, o] = v.split(':'); return [`${nm(w)} veut ${DK[k].n}${o ? ' ' + nm(o) : ''}`, `${en(w)} wants ${DK[k].en}${o ? ' ' + en(o) : ''}`]; }
    const e = S.ev[+v], N2 = EVN[e.k] || [e.k, e.k]; if (EK[e.k] && EK[e.k].crime) return e.v && live(e.v) ? [`${N2[0]} ${de(nm(e.v))}`, `${N2[1]} of ${en(e.v)}`] : N2;
    return [`${N2[0]} ${de(nm(e.x))}`, `${en(e.x)}'s ${N2[1].replace(/^the /, '')}`]; };
  // a link in words: « Isa et Amare : du même sang » · « une dette de jeu, née d’une partie de cartes » · « Amare se sert d’Isa »
  const linkTxt = (l) => { const K3 = FILS.LINK[l.k], A = nodeTxt(l.a), B = nodeTxt(l.b), two = l.both || K3.dir === 2;
    if (two && K3.pair) return [`${cap(A[0])} et ${B[0]} : ${K3.pair[0]}`, `${A[1]} and ${B[1]} ${K3.pair[1]}`, l.sh === 'h'];
    return [`${cap(A[0])}${l.a[0] === 'p' || l.a[0] === 'f' ? ' ' : ', '}${FILS.glue(K3.fr, B[0])}${two ? ' (et l’inverse)' : ''}`, `${A[1]} ${K3.en} ${B[1]}${two ? ' (and the other way around)' : ''}`, l.sh === 'h']; };
  function graph() {
    const G = { fig: null, say: new Map(), facts: [], more: [], need: null, prom: null, vil: null, cr: null, keeps: false }; weave();
    const FG = window.FILS && FILS.FIGS; if (!FG) return G;
    // what the author added, for the plan and the AI: each one off screen, then each link
    for (const f of (S.figs || []).filter((x) => x.by)) { const T2 = nodeTxt(`f:${f.id}`); G.more.push([`${cap(T2[0])} n’est pas à l’écran : on en parle`, `${T2[1]} has no picture: never on screen, never speaks; the others talk about them`]); }
    for (const l of (S.links || []).filter((x) => x.by)) G.more.push(linkTxt(l));
    const A0 = (S.figs || []).find((f) => f.id === 'A'); if (!A0) return G;
    const R = FG[A0.r], L = (S.links || []).filter((l) => !l.by), inf = (r) => S.infos[+r.slice(2)], pid = (r) => r.slice(2), from = (a, k) => L.filter((l) => l.a === a && l.k === k);
    const hv = L.find((l) => l.k === 'holds' && l.b === 't:debt'), hp = L.find((l) => l.k === 'holds' && l.a[0] === 'i' && (l.b === 't:need' || l.b[0] === 'i'));
    const tk = L.find((l) => l.k === 'takes' && l.a[0] === 'e'), prom = hp ? inf(hp.a) : null, vil = hv ? inf(hv.a) : null, cr = tk ? S.ev[+tk.a.slice(2)] : null, quiet = !!hp && hp.b[0] === 'i';
    G.fig = R; G.cr = cr;
    if (prom && quiet) { G.prom = prom; const v2 = inf(hp.b); G.say.set(prom, [`${nm(prom.x)} a promis à ${nm(prom.y)} de ne jamais dire ${R.dat} qui est ${nm(v2.x)}`, `${en(prom.x)} promised ${en(prom.y)} never to tell ${R.nE} who ${en(v2.x)} is`]); }
    else if (prom) { G.prom = prom; G.need = pid(L.find((l) => l.k === 'owes' && l.b === hp.b).a);
      G.say.set(prom, [`${nm(prom.x)} a promis à ${nm(prom.y)} de s’en charger : ${R.need(nm(G.need))}`, `${en(prom.x)} promised ${en(prom.y)} to take care of it: ${R.needE(en(G.need))}`]); }
    if (prom) G.facts.push(G.say.get(prom));
    if (vil) { G.vil = vil; const hid = from(hv.a, 'hidden').map((l) => l.b).filter((b) => b[0] === 'p').map(pid)[0], fe = (from(hv.a, 'fear')[0] || {}).b, fear = fe && pid(fe), knows = from(hv.a, 'known').map((l) => pid(l.b));
      if (hid) G.hid = hid;
      G.say.set(vil, [`${nm(vil.x)} est celui que ${R.n} cherche, pour ${R.wanted}`, `${en(vil.x)} is the one ${R.nE} is looking for, over ${R.wantedE}`]);
      G.facts.push([G.say.get(vil)[0] + (hid ? ` ; ${nm(vil.x)} le cache à ${nm(hid)}, par peur ${fear && fear !== hid ? `de la réaction ${de(nm(fear))}` : 'de sa réaction'}` : '') + (knows.length ? ` ; ${knows.map(nm).join(' et ')} le savent, ${nm(vil.x)} l’ignore` : ''),
        G.say.get(vil)[1] + (hid ? `; ${en(vil.x)} hides it from ${en(hid)}, afraid of how ${fear && fear !== hid ? en(fear) : 'they'} would take it` : '') + (knows.length ? `; ${knows.map(en).join(' and ')} know, ${en(vil.x)} has no idea they do` : '')]); }
    if (cr) { G.keeps = !!G.need && from(tk.a, 'for').some((l) => l.b === hp.a);
      if (cr.k === 'theft') G.facts.push([`${nm(cr.x)} a volé ${R.thingOf}${G.keeps ? `, pour tenir sa promesse à ${nm(G.need)}` : ''} (${R.lost})`, `${en(cr.x)} stole ${R.thingOfE}${G.keeps ? `, to keep the promise made to ${en(G.need)}` : ''} (${R.lostE})`]); }
    G.facts.unshift([`${cap(R.n)} n’est pas à l’écran : on entend parler de lui`, `${R.nE} has no picture: never on screen, never speaks; the others talk about him`]);
    return G;
  }
  // a link's end as the screen shows it: a face or an icon, and its words
  const nodeOf = (r) => { const t = r[0], v = r.slice(2), fr = nodeTxt(r)[0];
    if (t === 'p') return { h: mini(v), fr };
    if (t === 'f') { const x = S.figs.find((f) => f.id === v); return { h: `<b>${x.id === 'A' ? FILS.FIGS[x.r].e : catOf('f', x.c)[1]}</b>${x.by ? `<small>${esc(fr)}</small>` : ''}`, fr }; }
    if (t === 't') { const x = S.things.find((f) => f.id === v); return { h: `<b>${x.by ? catOf('t', x.c)[1] : FILS.FIGS[S.figs.find((f) => f.id === x.f).r].t[x.r][0]}</b><small>${esc(fr)}</small>`, fr }; }
    if (t === 'm' || t === 'l') { const x = (t === 'm' ? S.moments : S.places).find((f) => f.id === v); return { h: `<b>${catOf(t, x.c)[1]}</b><small>${esc(fr)}</small>`, fr }; }
    if (t === 'i') { const i = S.infos[+v]; return { h: `<b>${IN[i.id].e}</b>${mini(i.x)}${IN[i.id].s > 1 ? mini(i.y) : ''}`, fr }; }
    if (t === 'd') { const [w, k, o] = v.split(':'); return { h: `<b>${DK[k].e}</b>${mini(w)}${o ? mini(o) : ''}`, fr }; }
    const e = S.ev[+v]; return { h: `<b>${EK[e.k].e}</b>${mini(e.x)}`, fr }; };
  // what a tap can put at the other end of a link the story drew (the author's own: any end of the right type)
  const altsOf = (l) => { const { P, V } = tied();
    if (l.by) { const all = nodesNow().filter((r) => r !== l.a && FILS.LINK[l.k].b.includes(FILS.END[r[0]])); return all.length > 1 ? [all[(all.indexOf(l.b) + 1) % all.length]] : []; }
    if (l.k === 'holds' && P && l.a === `i:${P[1]}` && V && V[0].x !== P[0].x) return [l.b[0] === 'i' ? 't:need' : `i:${V[1]}`];
    if (['hidden', 'fear'].includes(l.k) && l.b[0] === 'p' && V) { const knows = (S.links || []).filter((x) => x.a === l.a && x.k === 'known' && !x.by).map((x) => x.b.slice(2)), can = hideTo(V[0], knows);
      return can.length > 1 ? [`p:${can[(can.indexOf(l.b.slice(2)) + 1) % can.length]}`] : []; }
    return []; };
  // every end there is now: the people, those off screen, the things, the infos, the events, the past, the places, the desires that matter
  let DESN = [];   // the desires (set by render: desires() can't be called from graph())
  const nodesNow = () => [...people().map((p) => `p:${p}`), ...(S.figs || []).map((f) => `f:${f.id}`), ...(S.things || []).map((x) => `t:${x.id}`),
    ...infos().map((i) => `i:${S.infos.indexOf(i)}`), ...(S.ev || []).map((e, k) => (EK[e.k] && live(e.x) ? `e:${k}` : null)).filter(Boolean),
    ...(S.moments || []).map((x) => `m:${x.id}`), ...(S.places || []).map((x) => `l:${x.id}`), ...DESN];
  // a new end from the lists (f t m l): its id; then the link, by the author
  const addNode = (t, c) => { const id = String((S.nid = (S.nid || 0) + 1)), key = { f: 'figs', t: 'things', m: 'moments', l: 'places' }[t]; (S[key] = S[key] || []).push({ id, c, by: 1 }); return `${t}:${id}`; };
  const addLink = (a, k, b) => { if (!a || !b || a === b || (S.links || []).some((l) => l.a === a && l.k === k && l.b === b)) return false; (S.links = S.links || []).push({ a, k, b, by: 1 }); return true; };
  // ---- 🎲 (17/11): what a link must do to be worth it: tie people ON STAGE to what is already there (an event, a desire,
  // each other), so that it changes how we see them. MOVES = the story moves, each with its sense: « du même sang » between
  // two people when one of them wants or can't stand the other (Justin's example), a witness of a crime who kept quiet
  // (never the culprit, never the victim; better if they care for the culprit), a past with the victim (someone who is
  // not the culprit: a false lead), a debt and where it was born, an old betrayal, a life once saved. Then only, a chain
  // grows from a thing, a moment of the past or a place (the debt → born of what → where → with whom) ----
  const moves = () => { const ST2 = story(), D = ST2.D, cast = S.cast.filter(live), out = [], hasL = (a, k, b) => (S.links || []).some((l) => l.k === k && ((l.a === a && l.b === b) || (l.a === b && l.b === a)));
    const wants = (w, t, ks) => D.some((d) => d.who === w && d.t === t && ks.includes(d.k)), jLoves = (t) => wants(J, t, ['love']);
    // never between two who were or are together (a couple, exes, an old romance): only a love that never happened
    const were = (a, b) => ['couple', 'ex', 'crush', 'family'].includes(rel(a, b)) || infos().some((i) => ['exes', 'crush', 'sibling', 'parent'].includes(i.id) && [i.x, i.y].includes(a) && [i.x, i.y].includes(b));
    for (const a of cast) for (const b of cast) if (a < b && !hasL(`p:${a}`, 'family', `p:${b}`) && !jLoves(a) && !jLoves(b) && !were(a, b)) {
      const w = (wants(a, b, ['love']) || wants(b, a, ['love']) ? 4 : 0) + (wants(a, b, ['oust']) || wants(b, a, ['oust']) ? 3 : 0); if (w) out.push({ w, go: () => [{ a: `p:${a}`, k: 'family', b: `p:${b}`, sh: 'h', kn: traitsOf(a).ruse >= 2 ? [a] : [] }] }); }
    (S.ev || []).forEach((e, k) => { if (!EK[e.k] || !EK[e.k].crime || !live(e.x) || (e.a || 1) > 1) return;
      for (const w of cast) if (w !== e.x && w !== e.v && !hasL(`p:${w}`, 'saw', `e:${k}`)) out.push({ w: (wants(w, e.x, ['love', 'protect']) ? 5 : 2) * (1 + (traitsOf(w).loyaute + traitsOf(w).peur) / 3), go: () => [{ a: `p:${w}`, k: 'saw', b: `e:${k}`, sh: 'h', kn: [w] }] });
      const vic = e.v && live(e.v) ? `p:${e.v}` : (S.figs || []).some((f) => f.id === 'A') && graph().cr === e ? 'f:A' : null;
      if (vic) for (const w of [J, ...cast]) if (w !== e.x && `p:${w}` !== vic && !hasL(`p:${w}`, 'past', vic)) out.push({ w: 2, go: () => [{ a: `p:${w}`, k: 'past', b: vic }] }); });
    if (!(S.links || []).some((l) => l.by && l.k === 'owes')) for (const a of [J, ...cast]) for (const b of [J, ...cast]) if (a !== b) {
      const w = (wants(b, a, ['oust']) || wants(a, b, ['oust']) ? 3 : 1) * (1 + traitsOf(a).audace / 2) * (S.flaw[a] === 'vice' ? 3 : 1);   // a gambler owes
      out.push({ w, go: () => { const t = addNode('t', 'dette'), m = addNode('m', ['cartes', 'duel', 'fete', 'naufrage'][Math.floor(Math.random() * 4)]), l = addNode('l', ['tripot', 'quai', 'arriere', 'cave'][Math.floor(Math.random() * 4)]);
        return [{ a: `p:${a}`, k: 'owes', b: t }, { a: t, k: 'toward', b: `p:${b}` }, { a: t, k: 'born', b: m }, { a: m, k: 'where', b: l }]; } }); }
    for (const a of cast) for (const b of [J, ...cast]) if (a !== b && (wants(b, a, ['love', 'protect']) || wants(a, b, ['love', 'protect'])) && !hasL(`p:${a}`, 'betrayed', `p:${b}`)) out.push({ w: 1 + traitsOf(a).ruse, go: () => [{ a: `p:${a}`, k: 'betrayed', b: `p:${b}`, sh: 'h', kn: [a] }] });
    for (const a of [J, ...cast]) for (const b of [J, ...cast]) if (a !== b && !hasL(`p:${a}`, 'saved', `p:${b}`) && D.some((d) => d.who === a && d.t === b && d.k === 'protect')) out.push({ w: (1 + traitsOf(a).audace) / 2, go: () => [{ a: `p:${a}`, k: 'saved', b: `p:${b}` }] });
    return out; };
  const growChain = () => { const N = nodesNow(), deg = (r) => (S.links || []).filter((l) => l.a === r || l.b === r).length, G2 = FILS.GROW, rnd = (n) => Math.floor(Math.random() * n);
    const tries = N.filter((r) => 'tml'.includes(r[0])).flatMap((r) => G2.filter((g) => g.on === FILS.END[r[0]]).map((g) => ({ r, g })));
    for (let n = 0; n < 40 && tries.length; n++) { const { r, g } = tries.splice(rnd(tries.length), 1)[0];
      let o; if (g.to.startsWith('new:')) { const t = g.to.slice(4), C2 = FILS.CAT[t].filter((c) => (!g.only || g.only.includes(c[0])) && !(S[{ f: 'figs', t: 'things', m: 'moments', l: 'places' }[t]] || []).some((x) => x.c === c[0])); if (!C2.length) continue; o = [t, C2[rnd(C2.length)][0]]; }
      else { const c = N.filter((x) => x !== r && g.to.includes(FILS.END[x[0]]) && x[0] !== 'f' && x[0] !== 'd' && !(x[0] === 'e' && (S.ev[+x.slice(2)].a || 1) > 1) && !(S.links || []).some((l) => l.k === g.k && ((l.a === r && l.b === x) || (l.a === x && l.b === r)))); if (!c.length) continue; o = c[rnd(c.length)]; }
      const b = Array.isArray(o) ? addNode(...o) : o, [x, y] = g.rev ? [b, r] : [r, b], K3 = FILS.LINK[g.k];
      if (deg(r) > 3 || !K3.a.includes(FILS.END[x[0]]) || !K3.b.includes(FILS.END[y[0]])) continue;
      if (addLink(x, g.k, y)) return S.links.length - 1; }
    return null; };
  const grow = () => { const M = moves(); let t = M.reduce((s2, m) => s2 + m.w, 0) * Math.random();
    for (const m of M) { t -= m.w; if (t > 0) continue; const n0 = (S.links || []).length; for (const l of m.go()) { (S.links = S.links || []).push({ ...l, by: 1 }); if (!l.kn || !l.kn.length) delete S.links[S.links.length - 1].kn; } return S.links.length > n0 ? n0 : null; }
    return growChain(); };
  const figOf = (e) => { const G = graph(); return G.fig && G.cr === e ? G.fig : null; };
  const vName = (e) => (e.v && live(e.v) ? nm(e.v) : figOf(e) ? figOf(e).n : 'quelqu’un'), vNameE = (e) => (e.v && live(e.v) ? en(e.v) : figOf(e) ? figOf(e).nE : 'someone');
  const ge = (id) => (id === J ? '' : '·e');   // Justin is « il »; the others' gender is not known
  const evFr = (e) => ({ arrive: `${nm(e.x)} arrive`, gone: `${nm(e.x)} disparaît`, murder: `${cap(vName(e))} est retrouvé${ge(e.v)} mort${ge(e.v)}`, theft: `${cap(vName(e))} s’est fait voler${figOf(e) ? ' ' + figOf(e).thing : ''}`,
    betray: `${cap(vName(e))} a été trahi${ge(e.v)}`, threat: `${nm(e.x)} menace ${vName(e)} de mort`, revenge: `${nm(e.x)} veut faire payer ${vName(e)}` }[e.k]);
  const evEnT = (e) => ({ arrive: `${en(e.x)} arrives`, gone: `${en(e.x)} disappears`, murder: `${vNameE(e)} is found dead`, theft: `${vNameE(e)} has been robbed${figOf(e) ? ' of ' + figOf(e).thingE : ''}`,
    betray: `${vNameE(e)} has been betrayed`, threat: `${en(e.x)} threatens to kill ${vNameE(e)}`, revenge: `${en(e.x)} wants to make ${vNameE(e)} pay` }[e.k]);
  // a culprit not yet revealed is « le coupable »
  let SHOWN = null;   // while the episodes are worked out: the culprits already shown to everyone (their name can be said)
  const hiddenCulprit = (id) => !(SHOWN && SHOWN.has(id)) && evs().some((e) => EK[e.k].crime && e.h && e.x === id);
  const tName = (d) => (d.t ? (d.k === 'justice' && hiddenCulprit(d.t) ? 'le coupable' : nm(d.t)) : ''), tNameE = (d) => (d.t ? (d.k === 'justice' && hiddenCulprit(d.t) ? 'the culprit' : en(d.t)) : '');
  const dFr = (d) => `${nm(d.who)} : ${DK[d.k].n}${d.t ? ' ' + tName(d) : ''}`, dEn = (d) => `${en(d.who)}: ${DK[d.k].en}${d.t ? ' ' + tNameE(d) : ''}`;
  const dSay = (d) => `${nm(d.who)} veut ${DK[d.k].n}${d.t ? ' ' + tName(d) : ''}`, dSayE = (d) => `${en(d.who)} wants ${DK[d.k].en}${d.t ? ' ' + tNameE(d) : ''}`;
  const lab = (d) => DK[d.k].lab(tName(d)), labE = (d) => DK[d.k].labE(tNameE(d));
  // who a murder kills, who an event takes away: the dead want nothing anymore, and nothing can be asked of them
  const deadIds = () => [...evs().filter((e) => e.k === 'murder' && e.v && live(e.v)).map((e) => e.v), ...(CUR_ACT === 2 ? [...actState().kill, ...actState().gone] : [])];
  function desires() {
    const D = [], ps = people();
    const add = (who, k, t, s, src, from) => { if (!live(who) || (t && (!live(t) || t === who))) return null; const id = `${who}:${k}${t ? ':' + t : ''}`;
      const o = D.find((d) => d.id === id); if (o) { if (s > o.s) { o.s = s; o.src = src; o.from = from || null; } return o; } const d = { id, who, k, t: t || null, s, src, from: from || null }; D.push(d); return d; };
    const note = (d, i) => { if (d && !d.info) d.info = i; return d; };   // the info a desire comes from (its past rides there; it can be a motive)
    for (const p of ps) { add(p, 'alive', null, 1, 'base'); add(p, 'respect', null, 1, 'base'); }
    for (const [key, r] of Object.entries(S.rel)) { const [a, b] = key.split('|'); if (!r || !live(a) || !live(b)) continue;
      if (['friend', 'family', 'mentor', 'couple'].includes(r)) { add(a, 'protect', b, 2, 'lien'); add(b, 'protect', a, 2, 'lien'); }
      if (['couple', 'crush'].includes(r)) { add(a, 'love', b, 2, 'lien'); add(b, 'love', a, 2, 'lien'); }
      if (r === 'rival') { add(a, 'oust', b, 2, 'lien'); add(b, 'oust', a, 2, 'lien'); } }
    for (const p of ps) { const w = wantOf(p); if (w) add(p, w.v, w.t, 3, 'choisi'); }
    for (const p of ps) { const f = S.flaw[p]; if (f === 'lache') add(p, 'alive', null, 2, 'faille'); if (f === 'orgueil') add(p, 'respect', null, 2, 'faille'); if (f === 'menteur') add(p, 'hide', null, 2, 'faille'); }
    for (const i of [...kinds('secret'), ...kinds('mask')]) note(add(i.x, 'hide', null, 3, 'info'), i);
    // what an info makes: an ex who comes back hasn't turned the page; a saved life is a debt; a fight wants to win; a
    // promise binds; a secret crush is a desire
    const comes = evs().filter((e) => e.k === 'arrive').map((e) => e.x);
    for (const i of infos()) {
      if (i.id === 'exes') { const back = comes.includes(i.y) ? i.y : comes.includes(i.x) ? i.x : i.y; note(add(back, 'love', back === i.x ? i.y : i.x, 2, 'info'), i); }
      if (i.id === 'saved') note(add(i.y, 'protect', i.x, 2, 'info'), i);
      if (i.id === 'fight') { note(add(i.x, 'oust', i.y, 2, 'info'), i); note(add(i.y, 'oust', i.x, 2, 'info'), i); }
      if (i.id === 'promise') note(add(i.x, 'protect', i.y, 2, 'info'), i);
      if (i.id === 'crush') note(add(i.x, 'love', i.y, 3, 'info'), i);
    }
    for (const e of evs()) {
      const near = (v) => D.filter((d) => ['protect', 'love'].includes(d.k) && d.t === v).map((d) => d.who);
      if (e.k === 'gone') { add(e.x, 'free', null, 2, 'événement', e); for (const p of near(e.x)) add(p, 'find', e.x, 3, 'événement', e); }
      if (EK[e.k].crime) { add(e.x, 'hide', null, 3, 'événement', e);
        const seekers = [...new Set([...(e.s && live(e.s) ? [e.s] : []), ...(e.v && live(e.v) ? [...(e.k === 'murder' ? [] : [e.v]), ...near(e.v)] : [])])].filter((p) => p !== e.x);
        for (const p of seekers) add(p, 'justice', e.x, 3, 'événement', e); if (e.k === 'murder') { add(e.x, 'alive', null, 3, 'événement', e); if (e.h) for (const p of ps) if (p !== e.x) add(p, 'alive', null, 2, 'événement', e); } }
      if (e.k === 'threat' && e.v && live(e.v)) { add(e.v, 'alive', null, 3, 'événement', e); add(e.x, 'oust', e.v, 3, 'événement', e); for (const p of near(e.v)) add(p, 'protect', e.v, 3, 'événement', e); }
      if (e.k === 'revenge' && e.v && live(e.v)) { add(e.x, 'oust', e.v, 3, 'événement', e); add(e.v, 'respect', null, 2, 'événement', e); for (const p of near(e.v)) add(p, 'protect', e.v, 3, 'événement', e); }
    }
    // someone searched for: the search starts when he disappears, even if it was chosen before
    for (const d of D) if (d.k === 'find' && !d.from) { const g = evs().find((e) => e.k === 'gone' && e.x === d.t); if (g) d.from = g; }
    // act 2 stands on what act 1 changed: desires born (a bascule, a betrayal, a disgrace) and desires over
    if (CUR_ACT === 2) { const AS = actState(); for (const a of AS.adds) add(a.who, a.k, a.t, 3, a.src);
      for (let k = D.length - 1; k >= 0; k--) if (AS.ends.some((x) => x.who === D[k].who && x.k === D[k].k && x.t === D[k].t)) D.splice(k, 1); }
    // the dead: their own desires stop with them (they only feed who looked guilty); a desire about them is over too
    const dead = deadIds();
    for (const d of D) { if (dead.includes(d.who)) d.dead = 1; else if (d.t && dead.includes(d.t) && ['protect', 'love', 'oust', 'find'].includes(d.k)) d.late = 1; }
    // a secret that came out in an act before this one is not kept anymore
    if (CUR_ACT !== 9) for (let k = D.length - 1; k >= 0; k--) if (D[k].k === 'hide' && D[k].info && iAct(D[k].info) < CUR_ACT) D.splice(k, 1);
    // a link the audience knows (or that came out in an act before this one) ends what it forbids: « du même sang » ends their romance
    const EN = (window.FILS && FILS.ENDS) || {}, ends = (S.links || []).filter((l) => l.by && EN[l.k] && l.a[0] === 'p' && l.b[0] === 'p' && (l.sh !== 'h' || (CUR_ACT !== 9 && CUR_ACT > (ACTS() === 2 && l.at === 2 ? 2 : 1))));
    if (ends.length) for (let k = D.length - 1; k >= 0; k--) { const d = D[k]; if (d.t && ends.some((l) => EN[l.k].includes(d.k) && [l.a, l.b].includes(`p:${d.who}`) && [l.a, l.b].includes(`p:${d.t}`))) D.splice(k, 1); }
    return D;
  }
  // a life is at stake: in the whole act (the engine works out conflicts with it) / right now in the schedule (lifeNow)
  const shownNow = (id) => (SHOWN && SHOWN.has(id)) || (NOW && NOW.shown && NOW.shown.has(id));
  const lifeIn = (L, who) => L.some((e) => (e.k === 'murder' && ((e.h && !shownNow(e.x) && !(CUR_ACT < 9 && actOf(e) < CUR_ACT)) || who === e.x)) || (e.k === 'threat' && (who == null || e.v === who))) || (!!S.hard.danger && (who == null || who === J));
  const lifeAtStake = (who) => lifeIn(evs(), who), lifeNow = (who) => lifeIn(evs().filter(happened), who);
  // two desires about the same person are one side of a choice (find Ruby / love Ruby / protect Ruby): never « Ruby ou Ruby ? »
  const SIDE = ['love', 'protect', 'find'], sameSide = (a, b) => !!a.t && a.t === b.t && SIDE.includes(a.k) && SIDE.includes(b.k);
  // Justin pulled two ways: two of his strong desires that can't both win
  const pulls = (a, b) => !sameSide(a, b) && ((a.k === 'free' && ['love', 'protect'].includes(b.k)) || (a.k === 'justice' && ['love', 'protect'].includes(b.k) && b.t === a.t)
    || (a.k === 'alive' && lifeAtStake(a.who) && (['justice', 'find'].includes(b.k) || (['protect', 'love'].includes(b.k) && lifeAtStake(b.t)) || (b.k === 'free' && S.hard.danger))) || (a.k === 'love' && b.k === 'protect' && a.t !== b.t && rel(a.t, b.t) === 'rival')
    // he wants X, but helping Y means hurting who X protects (Melissa hunts the thief, Ruby protects him)
    || (a.k === 'love' && b.k === 'protect' && a.t !== b.t && evs().some((e) => EK[e.k].crime && (e.s === b.t || e.v === b.t) && (rel(e.x, a.t) === 'couple' || wantOf(a.t)?.t === e.x || (S.want[e.x] || {}).t === a.t)))
    // someone searched for, someone left behind
    || (a.k === 'find' && ['protect', 'love'].includes(b.k) && a.t !== b.t));
  const goneIds = () => evs().filter((e) => e.k === 'gone').map((e) => e.x);
  function conflictsOf(D0) {
    const gone = goneIds();
    const D = D0.filter((d) => !d.dead && !d.late && (!gone.includes(d.who) || ['free', 'hide'].includes(d.k)));
    const C = [], same = (c) => C.some((x) => (x.da === c.da && x.db === c.db) || (x.da === c.db && x.db === c.da) || (x.e === c.e && x.e !== '⇄' && pk(x.a, x.b) === pk(c.a, c.b)));
    const add = (da, db, e, fr, en2) => { const c = { da, db, a: da.who, b: db.who, e, fr, en: en2 }; if (da !== db && !same(c)) C.push(c); };
    for (const a of D) for (const b of D) { if (a === b) continue;
      if (a.k === 'love' && b.k === 'love' && a.t === b.t && a.who !== b.who && a.who < b.who) add(a, b, '⚔️', `${nm(a.who)} et ${nm(b.who)} veulent ${nm(a.t)}`, `${en(a.who)} and ${en(b.who)} both want ${en(a.t)}`);
      if (a.k === 'love' && b.k === 'love' && b.who === a.t && b.t !== a.who && !D.some((x) => x.k === 'love' && x.who === a.t && x.t === a.who) && !D.some((x) => x.k === 'love' && x.t === a.t && x.who === b.t)) add(a, b, '💘', `${nm(a.who)} veut ${nm(a.t)}, qui en veut un·e autre`, `${en(a.who)} wants ${en(a.t)}, who wants ${en(b.t)}`);
      if (a.k === 'love' && rel(a.t, b.who) === 'couple' && b.k === 'love' && b.t === a.t && b.who !== a.who) add(a, b, '💍', `${nm(a.t)} est avec ${nm(b.who)}`, `${en(a.t)} is with ${en(b.who)}`);
      if (a.k === 'protect' && ['oust', 'justice'].includes(b.k) && b.t === a.t && b.who !== a.who) add(a, b, '🛡️', `${nm(a.who)} protège ${nm(a.t)} contre ${nm(b.who)}`, `${en(a.who)} protects ${en(a.t)} from ${en(b.who)}`);
      if (a.k === 'oust' && b.k === 'respect' && b.who === a.t && !evs().some((e) => e.k === 'threat' && e.x === a.who && e.v === a.t)) add(a, b, '😤', `${nm(a.who)} veut écarter ${nm(a.t)}`, `${en(a.who)} wants to push ${en(a.t)} aside`);
      if (a.k === 'free' && !gone.includes(a.who) && ['protect', 'love'].includes(b.k) && b.t === a.who) add(a, b, '🕊️', `${nm(a.who)} veut partir ; ${nm(b.who)} veut l’en empêcher`, `${en(a.who)} wants to leave; ${en(b.who)} wants to keep them`);
      if (a.k === 'find' && ['free', 'hide'].includes(b.k) && b.who === a.t) add(a, b, '🔦', `${nm(a.who)} cherche ${nm(a.t)}, qui ne veut pas être trouvé·e`, `${en(a.who)} looks for ${en(a.t)}, who does not want to be found`);
      if (a.k === 'justice' && b.k === 'hide' && b.who === a.t) add(a, b, '🔍', `${nm(a.who)} veut la vérité ; ${hiddenCulprit(a.t) ? 'le coupable' : nm(a.t)} se cache`, `${en(a.who)} wants the truth; ${hiddenCulprit(a.t) ? 'the culprit' : en(a.t)} hides`);
      if (a.k === 'alive' && a.s >= 3 && b.k === 'oust' && b.t === a.who && evs().some((e) => e.k === 'threat' && e.x === b.who)) add(a, b, '☠️', `${nm(b.who)} menace ${nm(a.who)}`, `${en(b.who)} threatens ${en(a.who)}`);
      if (a.k === 'win' && b.k === 'win' && a.who < b.who) add(a, b, '🏆', `${nm(a.who)} et ${nm(b.who)} veulent la même place`, `${en(a.who)} and ${en(b.who)} want the same place`);
    }
    const jd = D.filter((d) => d.who === J && d.s >= 2);
    for (const a of jd) for (const b of jd) if (a !== b && pulls(a, b)) add(a, b, '⇄', `Justin, déchiré : ${lab(a)} ou ${lab(b)} ?`, `justin, torn: ${labE(a)} or ${labE(b)}?`);
    return C;
  }
  // the plotlines: a strong desire and its conflicts (one line per conflict pair: the other side doesn't get its own)
  function plotlinesOf(D, C) {
    const out = [], used = new Set();
    const strong = D.filter((d) => d.s >= 2 && d.src !== 'faille' && !d.dead && !d.late).sort((a, b) => (b.who === J) - (a.who === J) || b.s - a.s || (b.src === 'choisi') - (a.src === 'choisi'));
    for (const d of strong) { const cs = C.filter((c) => (c.da === d || c.db === d) && !used.has(c)); if (!cs.length) continue;
      cs.forEach((c) => used.add(c)); out.push({ id: d.id, d, cs, main: d.who === J }); }
    return out;
  }
  // the climax: two of Justin's desires (picked, else the ones that pull him apart, else his two main lines). Among the
  // pairs that pull him apart, the one the hidden truth will force wins (the truth, or the one who did it: that is where
  // the threads meet). Act 2 takes another pair than act 1 when there is one (« le besoin reste, la cible change »)
  const pairKey = (a, b) => [a && a.id, b && b.id].sort().join('+');
  function climaxOf(D, C, PL, a = 1) {
    const jd = D.filter((d) => d.who === J && !d.dead && !d.late), pickd = a === 2 ? S.climax2 : S.climax;
    if (pickd) { const x = jd.find((d) => d.id === pickd[0]), y = jd.find((d) => d.id === pickd[1]); if (x && y && x !== y) return [x, y]; }
    const avoid = a === 2 ? pairKey(...storyAt(1).X) : '', culprits = evs().filter((e) => EK[e.k].crime && e.h).map((e) => e.x);
    const own = (d) => (d.src === 'faille' ? 0 : d.src === 'choisi' ? 3 : 2), knot = (c) => ([c.da, c.db].some((d) => d.k === 'justice') && [c.da, c.db].some((d) => ['love', 'protect'].includes(d.k) && culprits.includes(d.t)) ? 3 : 0);
    const inners = C.filter((c) => c.e === '⇄').sort((x, y) => own(y.da) + own(y.db) + knot(y) - own(x.da) - own(x.db) - knot(x)), inner = inners.find((c) => pairKey(c.da, c.db) !== avoid) || inners[0];
    if (inner && (!avoid || pairKey(inner.da, inner.db) !== avoid)) return [inner.da, inner.db];
    if (avoid) { const born = jd.filter((d) => d.s >= 2 && ((d.from && actOf(d.from) === 2) || evs().some((e) => actOf(e) === 2 && e.v && e.v === d.t))).sort((x, y) => y.s - x.s)[0];
      const price = (d) => (d.k === 'alive' && lifeAtStake(J) ? 3 : d.k === 'respect' ? 2.5 : 0) + d.s / 10;
      const oth = born && jd.filter((d) => d !== born && !sameSide(d, born) && pairKey(d, born) !== avoid && !(d.k === 'alive' && !lifeAtStake(J))).sort((x, y) => price(y) - price(x))[0];
      if (born && oth) return [born, oth]; if (inner) return [inner.da, inner.db]; }
    const mains = PL.filter((p) => p.main).map((p) => p.d);
    if (mains.length >= 2 && !sameSide(mains[0], mains[1])) return [mains[0], mains[1]];
    const first = mains[0] || jd.slice().sort((x, y) => y.s - x.s)[0];
    const other = jd.filter((d) => d !== first && !(first && sameSide(d, first)) && !(d.k === 'alive' && !lifeAtStake(d.who))).sort((x, y) => (y.k === 'protect') - (x.k === 'protect') || y.s - x.s)[0];
    return [first, other];
  }
  // the story of an act (its events and the ones before); the whole story = the last act's, with act 1's climax (X) and act 2's (X2)
  const storyAt = (a) => { const keep = CUR_ACT; CUR_ACT = a; try { const D = desires(), C = conflictsOf(D), PL = plotlinesOf(D, C); return { D, C, PL, X: climaxOf(D, C, PL, a) }; } finally { CUR_ACT = keep; } };
  const story = () => { if (ACTS() < 2) return storyAt(1); const s1 = storyAt(1), s2 = storyAt(2), same = (d) => d && s2.D.find((x) => x.id === d.id); return { ...s2, X: s1.X.map(same), X2: s2.X }; };
  // ---- THE WORLD, CHANGED (18/11): what act 1 leaves behind for good, and what act 2 is built on. The climax's lost side
  // has its fate (FILS.FATE: when a life is at stake the one he did not choose dies; else they leave, or turn away); what
  // came out changes how people stand (a betrayal: no more love, they want to make him pay); someone who loses who they
  // loved and blames someone BASCULES: their desire turns to revenge, their pillar to FILS.BASCULE (their voice changes).
  // The dimensions (Justin's grid): vie · rel (relations) · su (what is known) · statut · désirs · arcs ----
  // who they are, in numbers (0-3): base 1 + pillars (the second counts half) + flaw; in act 2, plus what act 1 did to them
  const traitsOf = (id, a = 1) => { const T0 = window.FILS && FILS.TRAITS; if (!T0) return {}; const o = Object.fromEntries(Object.keys(T0).map((k) => [k, 1]));
    const addT = (m, w = 1) => { for (const [k, v] of Object.entries(m || {})) o[k] += v * w; };
    pillarsOf(id).forEach((p, i) => addT(FILS.PTRAITS[p], i ? 0.5 : 1)); addT(FILS.FTRAITS[S.flaw[id]]);
    if (a >= 2) for (const r of actState().arcs.filter((x) => x.who === id)) addT(r.dt);
    for (const k of Object.keys(o)) o[k] = Math.max(0, Math.min(3, Math.round(o[k]))); return o; };
  const traitTxt = (o, min = 2) => Object.entries(o).filter(([, v]) => v >= min).sort((x, y) => y[1] - x[1]).map(([k, v]) => [`${FILS.TRAITS[k][0]} ${FILS.TRAITS[k][1]} (${v})`, `${FILS.TRAITS[k][2]} (${v}/3)`]);
  // the one who forces the choice: who threatens, else who seeks revenge, in this act or before
  const forcer = (a) => { const e = (S.ev || []).find((x) => ['threat', 'revenge'].includes(x.k) && (x.a || 1) <= a && live(x.x) && x.x !== J); return e ? e.x : null; };
  // the fate of a desire Justin gives up at the climax of act a: { kind, t, fr, en }
  const fateFor = (lost, a) => { const F = window.FILS && FILS.FATE; if (!F || !lost) return null; const t = lost.t, ev2 = (S.ev || []).filter((e) => EK[e.k] && (e.a || 1) > a), later = (p) => ev2.some((e) => [e.x, e.v, e.s].includes(p));
    let kind, x = null;
    if (['love', 'protect', 'find'].includes(lost.k) && t && t !== J) {
      // a death needs someone to give it: the one who forces the choice, else a murderer still free
      const cares = (p) => storyAt(1).D.some((d) => d.who === p && d.t === t && ['love', 'protect'].includes(d.k));   // nobody kills the one they love to force a choice
      const fo = forcer(a), mu = (S.ev || []).find((e) => e.k === 'murder' && (e.a || 1) <= a && live(e.x) && e.x !== t && e.x !== J && !cares(e.x));
      x = fo && fo !== t && !cares(fo) ? fo : mu ? mu.x : null;
      if (x && traitsOf(x, a).violence < 2) x = null;   // a threat from someone who does not act on it was a bluff
      // the one let down answers from who they are: fear or pride make them leave, a grudge makes them turn, loyalty makes them stay, hurt
      const tt = traitsOf(t, a);
      kind = lost.k === 'find' ? 'find' : x && !later(t) ? 'kill' : !later(t) && (tt.peur >= 2 || (tt.fierte >= 2 && tt.rancune < 2)) ? 'gone' : tt.rancune >= 2 ? 'turn' : tt.loyaute >= 2 ? 'hurt'
        : !later(t) && lost.k === 'love' ? 'gone' : 'turn'; }
    else kind = F[lost.k] ? lost.k : 'respect';
    const W1 = [nm(J), t ? nm(t) : '', x ? nm(x) : ''], WE = [en(J), t ? en(t) : '', x ? en(x) : '']; return { kind, t, x, fr: F[kind][0](...W1), en: F[kind][1](...WE) }; };
  // why someone wants to make another pay (a revenge, a threat): a death of someone they loved, blamed on the culprit, or on
  // Justin when he gave that one up at the climax. { v (the dead), why } or null
  const blameFor = (x, v) => { if (actState().arcs.some((r) => r.who === x && ['deuil', 'fuite'].includes(r.mode))) return null; const st = storyAt(Math.min(2, ACTS())), loved = (t) => !actState().ends.some((z) => z.who === x && z.t === t) && (st.D.some((d) => d.who === x && d.t === t && ['love', 'protect'].includes(d.k)) || storyAt(1).D.some((d) => d.who === x && d.t === t && ['love', 'protect'].includes(d.k)));
    const AS = actState(), m = (S.ev || []).find((e) => e.k === 'murder' && e.v && live(e.v) && e.v !== x && loved(e.v) && (e.x === v || (v === J && AS.fate && AS.fate.t === e.v)));
    if (m) return { v: m.v, why: m.x === v ? 'tué' : 'abandonné' };
    const k = AS.kill.find((t) => t !== x && loved(t)); if (k && v === J) return { v: k, why: 'choix' }; const g = AS.gone.find((t) => t !== x && loved(t)); if (g && v === J) return { v: g, why: 'parti' };
    if (AS.fate && AS.fate.kind === 'turn' && AS.fate.t === x && v === J) return { v: x, why: 'lâché' };
    const cr = (S.ev || []).find((e) => EK[e.k] && EK[e.k].crime && e.h && (e.a || 1) === 1 && e.x === x && live(e.x)); return cr ? { v: cr.v && live(cr.v) ? cr.v : null, why: 'démasqué', cr } : null; };
  let AST = null, AST_BUSY = false;
  function actState() {
    const E = { kill: [], gone: [], ch: [], adds: [], ends: [], arcs: [], fate: null, other: null, pick: 0, X: null };
    if (ACTS() < 2 || !window.FILS || !FILS.FATE) return E;
    const sig = JSON.stringify([S.cast, S.pil, S.want, S.rel, S.infos, S.ev, S.links, (S.picked || {}).pick, S.acts, S.climax, S.seed, S.hard, S.flaw]);
    if (AST && AST.sig === sig) return AST.E; if (AST_BUSY) return E;
    AST_BUSY = true; const sv = CUR_ACT;
    try { CUR_ACT = 1; const st = storyAt(1), [ca, cb] = st.X, k = (S.picked || {}).pick === 1 ? 1 : 0, D = st.D;
      const ch = (dim, fr, en2) => E.ch.push({ dim, fr, en: en2 });
      const near = (t) => [...new Set(D.filter((d) => ['love', 'protect'].includes(d.k) && d.t === t && d.who !== t && !d.dead && !E.ends.some((x) => x.who === d.who && x.k === d.k && x.t === t)).map((d) => d.who))];
      if (ca && cb) { const lost = k ? ca : cb, won = k ? cb : ca, f = fateFor(lost, 1); E.X = [ca, cb]; E.pick = k; E.fate = f; E.won = [lab(won), labE(won)]; E.other = fateFor(won, 1);
        if (f.kind === 'kill') E.kill.push(f.t); if (f.kind === 'gone' || f.kind === 'find') E.gone.push(f.t);
        if (f.kind === 'turn') { E.ends.push({ who: f.t, k: 'love', t: J }, { who: f.t, k: 'protect', t: J });
          if (traitsOf(f.t, 1).rancune >= 2) { E.adds.push({ who: f.t, k: 'oust', t: J, src: 'rancune' });
            E.arcs.push({ who: f.t, v: f.t, x: J, why: 'lâché', mode: 'rancune', dt: FILS.GRUDGE_T, fr: `${nm(f.t)} : rancune. Justin l’a lâché·e au pire moment`, en: `${en(f.t)} turns bitter: justin gave them up when it mattered` }); } }
        if (f.kind === 'hurt') { E.ends.push({ who: f.t, k: 'love', t: J }); ch('rel', `${cap(f.fr)} (Justin a choisi : ${lab(won)})`, f.en); }
        if (f.kind === 'respect') E.adds.push({ who: J, k: 'respect', t: null, src: 'déshonoré' }); if (f.kind === 'alive') E.adds.push({ who: J, k: 'alive', t: null, src: 'blessé' });
        if (f.kind !== 'hurt') ch({ kill: 'vie', gone: 'vie', find: 'vie', turn: 'rel', respect: 'statut', alive: 'statut', hide: 'statut' }[f.kind] || 'désirs', `${cap(f.fr)} (Justin a choisi : ${lab(won)})`, `${f.en} (justin chose ${labE(won)})`); }
      // what came out in act 1 changes how people stand
      for (const i of infos()) { if (iAct(i) !== 1 || !['secret', 'mask'].includes(IN[i.id].k)) continue; ch('su', `Tout le monde sait : ${IN[i.id].fr(nm(i.x), nm(i.y))}`, `everyone knows now: ${IN[i.id].en(en(i.x), en(i.y))}`);
        if (['betray', 'pretend', 'cause'].includes(i.id) && i.y && live(i.y) && i.y !== i.x) { E.ends.push({ who: i.y, k: 'love', t: i.x }, { who: i.y, k: 'protect', t: i.x }); if (i.y !== J) E.adds.push({ who: i.y, k: 'oust', t: i.x, src: 'trahi' });
          ch('rel', `${nm(i.y)} ne fait plus confiance à ${nm(i.x)}`, `${en(i.y)} no longer trusts ${en(i.x)}`); }
        if (['villain', 'name', 'spy', 'royal'].includes(i.id)) ch('statut', `${nm(i.x)} : démasqué·e`, `${en(i.x)}: unmasked`); }
      for (const l of (S.links || []).filter((x2) => x2.by && x2.sh === 'h' && x2.at !== 2 && x2.a[0] === 'p' && x2.b[0] === 'p' && FILS.LINK[x2.k])) { const a2 = l.a.slice(2), b2 = l.b.slice(2); if (!live(a2) || !live(b2)) continue;
        ch('su', `Tout le monde sait : ${linkTxt(l)[0]}`, `everyone knows now: ${linkTxt(l)[1]}`);
        if (['betrayed', 'liesto', 'uses'].includes(l.k)) { E.ends.push({ who: b2, k: 'love', t: a2 }, { who: b2, k: 'protect', t: a2 }); if (b2 !== J) E.adds.push({ who: b2, k: 'oust', t: a2, src: 'trahi' }); ch('rel', `${nm(b2)} ne fait plus confiance à ${nm(a2)}`, `${en(b2)} no longer trusts ${en(a2)}`); } }
      for (const e of (S.ev || []).filter((e2) => EK[e2.k] && EK[e2.k].crime && e2.h && (e2.a || 1) === 1 && live(e2.x))) ch('statut', `${nm(e.x)} : démasqué·e (${EVN[e.k][0]})`, `${en(e.x)}: exposed (${EVN[e.k][1]})`);
      // the dead of act 1 (a murder, the climax), and whoever loved them blames someone: the bascule
      const deaths = [...(S.ev || []).filter((e) => e.k === 'murder' && (e.a || 1) === 1 && e.v && live(e.v)).map((e) => [e.v, e.x, 'meurtre']), ...E.kill.map((t) => [t, J, 'choix']), ...E.gone.map((t) => [t, J, 'parti'])];
      for (const [v, x, why] of deaths) { if (why === 'meurtre') ch('vie', `${nm(v)} est mort·e`, `${en(v)} is dead`);
        for (const b of near(v)) { if (b === J || b === x || (why === 'choix' && E.fate && b === E.fate.x) || E.kill.includes(b) || E.gone.includes(b) || !live(b)) continue;
          // who they are decides what the loss makes of them: revenge, grief, or running away
          const tb = traitsOf(b, 1), sc = { vengeance: tb.rancune + tb.violence + tb.fierte / 2, deuil: tb.loyaute + (2 - tb.rancune), fuite: tb.peur * 2 }, mode = ['vengeance', 'deuil', 'fuite'].reduce((m, k2) => (sc[k2] > sc[m] ? k2 : m), 'vengeance');
          const loss = why === 'parti' ? ['le départ', 'leaving'] : ['la mort', 'death'], lossP = `${loss[0]} ${de(nm(v))}`;
          if (mode === 'deuil') { E.arcs.push({ who: b, v, x, why, mode, dt: { audace: -1, peur: 1 }, fr: `${nm(b)} : en deuil depuis ${lossP} ; ne se bat plus, se tait`, en: `${en(b)} grieves since ${en(v)}'s ${loss[1]}: no fight left, says little` }); ch('désirs', `${nm(b)} porte son deuil`, `${en(b)} grieves`); continue; }
          if (mode === 'fuite') { if (!(S.ev || []).some((e) => (e.a || 1) > 1 && [e.x, e.v, e.s].includes(b))) E.gone.push(b);
            E.arcs.push({ who: b, v, x, why, mode, dt: { peur: 1 }, fr: `${nm(b)} : depuis ${lossP}, s’en va ; ne veut plus rien savoir`, en: `${en(b)} leaves after ${en(v)}'s ${loss[1]}` }); ch('vie', `${nm(b)} s’en va`, `${en(b)} leaves`); continue; }
          E.adds.push({ who: b, k: 'oust', t: x, src: 'bascule' }); E.ends.push({ who: b, k: 'protect', t: x }, { who: b, k: 'love', t: x });
          const was = pillarsOf(b).map((p) => P[p].n).join(' + '), B2 = P[FILS.BASCULE];
          E.arcs.push({ who: b, v, x, why, mode, dt: FILS.BASCULE_T, fr: `${nm(b)} : ${was} → ${B2.n}. Depuis ${loss[0]} ${de(nm(v))}, tient ${nm(x)} pour responsable${why !== 'meurtre' ? ' (Justin a choisi l’autre côté)' : ''}`,
            en: `${en(b)} breaks: since ${en(v)}'s ${loss[1]} they blame ${en(x)}${why !== 'meurtre' ? ' (justin chose the other side)' : ''}, and it shows in how they talk` });
          ch('désirs', `${nm(b)} veut faire payer ${nm(x)}`, `${en(b)} wants to make ${en(x)} pay`); } }
    } finally { CUR_ACT = sv; AST_BUSY = false; }
    AST = { sig, E }; return E; }
  const conflicts = () => story().C;
  const incWho = () => { const e = evs()[0]; return e ? e.x : S.cast[0]; };
  // the people the act's prompt and the old views still ask for: who Justin wants, who's against him, who he'd lose
  function roles(st) {
    const { C, X } = st || storyAt(Math.min(CUR_ACT, 1) || 1), [ca, cb] = X, tgt = [ca, cb].find((d) => d && d.t) || null;
    const adv = (c) => (c.e === '💘' && c.b === J ? 0 : ['⚔️', '💍', '😤', '☠️', '🛡️', '🔍', '🏆'].includes(c.e) ? 2 : 1);
    const target = tgt ? tgt.t : S.cast[0], vs = C.filter((c) => (c.a === J || c.b === J) && adv(c)).sort((x, y) => adv(y) - adv(x)).map((c) => (c.a === J ? c.b : c.a)).find((id) => id !== J && id !== target) || null;
    const dear = [ca, cb].map((d) => d && d.k === 'protect' && d.t).find(Boolean) || S.cast.find((id) => id !== target && id !== vs && (R[rel(J, id)] || {}).good) || null;
    return { target, against: vs, dear, a: target, b: [dear, vs, ...S.cast].find((id) => id && id !== target) || target };
  }
  const hardOk = (h) => (h === 'liked' ? !!roles().against : h === 'danger' ? desires().some((d) => ['find', 'free', 'alive'].includes(d.k) && d.s >= 2) : h === 'gag' ? kinds('secret').length > 0 : true);

  // ---- THE TRUTH (15/11): what really happened, fixed before the first beat. Why each event happened (its motive, from
  // what the one who did it wants: it ties the crime to a desire, to a promise he lets slip, to how it comes out); who
  // looks guilty besides him (a false lead that holds); what each object holds. What is hidden is planted from it ----
  const motiveOf = (e, k, D) => { const M = window.FILS && FILS.MOTIVE[e.k];
    { const vict = e.v && live(e.v) ? e.v : null, mk2 = (fr, en2) => ({ d: null, f: { fr: () => fr, en: () => en2 }, c: {}, info: null, fr, en: en2, n: 1 });
      const bl0 = ['threat', 'revenge'].includes(e.k) && vict && actOf(e) === 2 ? blameFor(e.x, vict) : null;
      // the one who already threatened in act 1 and is still free: he has not finished
      const th1 = e.auto && actOf(e) === 2 ? (S.ev || []).find((x) => ['threat', 'revenge'].includes(x.k) && (x.a || 1) === 1 && x.x === e.x) : null;
      if (th1 && vict) { const AS1 = actState(), tk = AS1.fate && AS1.fate.kind === 'kill' && AS1.fate.x === e.x ? AS1.fate.t : null;
        return mk2(tk ? `${nm(e.x)} a tué ${nm(tk)} ; il n’en a pas fini : ${nm(vict)} lui a tenu tête` : `${nm(e.x)} n’en a pas fini avec ${nm(vict)}`, tk ? `${en(e.x)} killed ${en(tk)} and is not done: ${en(vict)} stood up to him` : `${en(e.x)} is not done with ${en(vict)}`); }
      if (bl0 && bl0.why === 'lâché') return mk2(`${nm(e.x)} ne pardonne pas à ${nm(vict)} de l’avoir lâché·e au pire moment`, `${en(e.x)} never forgave ${en(vict)} for giving them up when it mattered`);
      if (bl0 && bl0.why === 'démasqué') return mk2(`${nm(e.x)} a tout perdu quand on a su (${EVN[bl0.cr.k][0]}), et en tient ${nm(vict)} pour responsable`, `${en(e.x)} lost everything when it came out (${EVN[bl0.cr.k][1]}), and blames ${en(vict)} for it`);
      const bl = ['threat', 'revenge'].includes(e.k) && vict && actOf(e) === 2 ? blameFor(e.x, vict) : null;
      if (bl) { const why = { tué: ['', ''], abandonné: [' : Justin l’a laissé·e tomber au pire moment', ': justin gave them up when it mattered'], choix: [' : Justin a choisi l’autre côté', ': justin chose the other side'], parti: [' : Justin a choisi l’autre côté', ': justin chose the other side'] }[bl.why];
        return mk2(`${nm(e.x)} tient ${nm(vict)} pour responsable ${bl.why === 'parti' ? 'du départ' : 'de la mort'} ${de(nm(bl.v))}${why[0]}`, `${en(e.x)} blames ${en(vict)} for ${en(bl.v)}'s ${bl.why === 'parti' ? 'leaving' : 'death'}${why[1]}`); } }
    if (!M) return null;
    const vict = e.v && live(e.v) ? e.v : null, inv = (d) => d.info && [d.info.x, d.info.y].includes(vict);
    const fits = (d) => M[d.k] && !d.from && !d.dead && !(d.k === 'hide' && !d.info)
      && (d.k !== 'oust' ? !(d.t && d.t === vict && e.k !== 'threat') : e.k === 'theft' ? d.t !== vict : d.t === vict)
      && !(e.k === 'threat' && d.k === 'love' && d.t !== vict) && !(e.k === 'gone' && d.k === 'love');
    const rank = (d) => (d.k === 'hide' && inv(d) ? 6 : d.k === 'oust' && d.t === vict ? 5 : d.src === 'choisi' ? 4 : d.src === 'info' ? 3 : 2);
    const tr = traitsOf(e.x, actOf(e)), fit = (d) => ({ hide: tr.ruse, oust: tr.violence + tr.rancune / 2, love: tr.audace, protect: tr.loyaute, free: tr.peur, respect: tr.fierte, justice: tr.rancune, win: tr.audace, alive: tr.peur, find: tr.loyaute })[d.k] || 0;
    const cands = D.filter((d) => d.who === e.x && fits(d)).sort((x, y) => rank(y) - rank(x) || fit(y) - fit(x)), top = cands.filter((d) => rank(d) === rank(cands[0]));
    if (e.k === 'threat' && !top.length && vict && ['ex', 'crush', 'couple'].includes(rel(e.x, vict))) top.push({ k: 'love', who: e.x, t: vict });
    const G = graph(), mk2 = (fr, en2, o = {}) => ({ d: o.d || null, f: { fr: () => fr, en: () => en2, ...o.f }, c: {}, info: null, fr, en: en2, n: 1 });
    if (G.keeps && G.cr === e) { const R = G.fig, x = nm(e.x), y = nm(G.need), xE = en(e.x), yE = en(G.need);
      return mk2(`${x} a volé ${R.thingOf} pour tenir sa promesse à ${y}`, `${xE} stole ${R.thingOfE} to keep the promise made to ${yE}`, { d: { k: 'protect', who: e.x, t: G.need }, f: {
        prom: [() => `${x}, à ${y} : « Je t’ai promis. Tu l’auras à temps. »`, () => `${xE} to ${yE}: "I promised. You'll have it in time."`], near: [() => `${x}, à ${y} : « Ce soir. Ne demande pas comment. »`, () => `${xE} to ${yE}: "Tonight. Don't ask how."`],
        pay: [() => `${x} pose devant ${y} de quoi tenir sa promesse : c’est ${R.thingOf}`, () => `${xE} puts in front of ${yE} what keeps the promise: it is ${R.thingOfE}`] } }); }
    if (e.k === 'threat' && vict) { const T = [wantOf(e.x), wantOf(vict)].every((w) => w && w.v === 'love') && wantOf(e.x).t === wantOf(vict).t ? wantOf(e.x).t : null;
      if (G.vil && G.vil.x === vict && G.fig) return mk2(`${nm(e.x)} sait que ${G.fig.n} cherche ${nm(vict)}, et peut le livrer`, `${en(e.x)} knows ${G.fig.nE} is looking for ${en(vict)}, and can hand him over`);
      if (T && live(T) && !(actOf(e) === 2 && [...actState().kill, ...actState().gone].includes(T))) return mk2(`${nm(e.x)} veut ${nm(T)}, et ${nm(vict)} est en travers`, `${en(e.x)} wants ${en(T)}, and ${en(vict)} is in the way`); }
    const lv = e.k === 'gone' ? kinds('secret').find((i) => i.id === 'leaving' && i.x === e.x) : null;
    const d = lv ? { k: 'free', who: e.x, info: lv } : top.length ? top[(((S.tq[`mot${k}`] || 0) % top.length) + top.length) % top.length] : null, forms = (d && M[d.k]) || M.def, f = forms[vary(`motf${k}`, forms.length)];
    const c = { x: nm(e.x), xE: en(e.x), v: vName(e), vE: vNameE(e), t: d && d.t ? nm(d.t) : '', tE: d && d.t ? en(d.t) : '', i: d && d.info ? infoFr(d.info) : '', iE: d && d.info ? infoEn(d.info) : '' };
    return { d, f, c, info: d && d.info ? d.info : null, fr: f.fr(c), en: f.en(c), n: top.length }; };
  const suspectOf = (e, D, mot) => { const vict = e.v && live(e.v) ? e.v : null;
    if (mot && mot.f.frame && mot.d && mot.d.t) return { id: mot.d.t, why: 'ce qu’on a pris est retrouvé chez lui', whyE: 'what was taken is found at their place', frame: 1 };
    const cand = people().filter((p) => p !== e.x && p !== vict), had = (p) => !!vict && D.some((d) => d.who === p && d.k === 'oust' && d.t === vict && !d.from), hides = (p) => D.some((d) => d.who === p && d.k === 'hide' && d.info && !d.from);
    const s = cand.find((p) => p !== J && had(p)) || cand.find((p) => p !== J && hides(p)) || cand.find(had);
    if (!s) return null;
    return had(s) ? { id: s, why: `${nm(s)} ne supportait pas ${nm(vict)}`, whyE: `${en(s)} could not stand ${en(vict)}`, oust: 1 } : { id: s, why: `${nm(s)} cache quelque chose`, whyE: `${en(s)} is hiding something`, hides: 1 }; };
  function truth(D) {
    const T = { ev: new Map(), obj: new Map() }, E = evs(), hid = [...kinds('secret'), ...kinds('mask')];
    E.forEach((e, k) => { const m = motiveOf(e, k, D); if (m) T.ev.set(e, { ...m, sus: EK[e.k].crime && e.h ? suspectOf(e, D, m) : null }); });
    kinds('object').forEach((i) => { const own = [i.x, i.y].filter(Boolean);
      const cr = E.find((e) => EK[e.k].crime && e.h && ((e.v && own.includes(e.v)) || own.includes(e.x)));
      const sec = hid.find((j) => own.includes(j.x) && !(cr && (T.ev.get(cr) || {}).info === j)), gn = E.find((e) => e.k === 'gone' && own.includes(e.x));
      T.obj.set(i, cr ? { crime: cr, side: cr.v && own.includes(cr.v) ? 'v' : 'x' } : gn ? { gone: gn } : sec ? { secret: sec } : {}); });
    return T;
  }
  // a hidden info's act: where it comes out (its seeds go as early as they can). With 2 acts and nothing sent to act 2, the
  // last hidden one waits for it: the long loop
  const iAct = (i) => { if (ACTS() < 2) return 1; if (i.a) return Math.min(2, i.a); const hid = [...kinds('secret'), ...kinds('mask')];
    return hid.length >= 2 && !hid.some((j) => j.a === 2) && hid[hid.length - 1] === i ? 2 : 1; };
  // a line of desire as the question the audience asks; a hidden crime as its question
  const LQ = { love: [(w, t) => `${w} et ${t}, ensemble ?`, (w, t) => `${w} and ${t}, together?`], protect: [(w, t) => `${w} protégera ${t} ?`, (w, t) => `will ${w} protect ${t}?`],
    justice: [(w, t) => (t === 'le coupable' ? `${w} fera sortir la vérité ?` : `${w} fera payer ${t} ?`), (w, t) => (t === 'the culprit' ? `will ${w} get the truth out?` : `will ${w} make ${t} pay?`)], find: [(w, t) => `${w} retrouvera ${t} ?`, (w, t) => `will ${w} find ${t}?`],
    free: [(w) => `${w} partira ?`, (w) => `will ${w} leave?`], hide: [(w) => `Le secret ${de(w)} tiendra ?`, (w) => `will ${w}'s secret hold?`], oust: [(w, t) => `${w} écartera ${t} ?`, (w, t) => `will ${w} push ${t} out?`],
    win: [(w) => `${w} aura sa place ?`, (w) => `will ${w} win their place?`], alive: [(w) => `${w} s’en sortira ?`, (w) => `will ${w} make it out?`], respect: [(w) => `${w} gardera la face ?`, (w) => `will ${w} save face?`] };
  const QEV = { murder: [(v) => `Qui a tué ${v} ?`, (v) => `who killed ${v}?`], theft: [() => 'Qui est le voleur ?', (v) => `who robbed ${v}?`], betray: [(v) => `Qui a trahi ${v} ?`, (v) => `who betrayed ${v}?`] };
  const low1 = (t) => String(t).replace(/^(Une|Un|La|Le) /, (m) => m.toLowerCase());

  // ---- OUTPUT: the braid (15/11: by threads). Each plotline climbs a few steps (show the desire → the conflict → each side
  // weighs more → he tries, it fails); the events come in (the first one opens the act, in 3 steps if someone arrives; the
  // others « soudain »); the others' lines run « pendant ce temps »; the crisis holds the answers and the climax. Every beat
  // says which threads it moves (mv: [[thread, move]]): a line of desire, a question (opened → why it matters → theories →
  // a clue → a false lead → the answer slips away → it narrows → the answer), a promise (announced → it comes closer → it
  // arrives), a seed (planted → it comes back → paid). The schedule knows the moment: who is dead or gone, what has
  // happened (a desire an event makes only plays after it), so nobody acts from the grave and no stake comes before its
  // cause. A beat: { id, kind, part, e, ep, act, lk (donc | mais | soudain | pendant), line, c (its words), info, hint,
  // rides, mv }. The array carries .threads ----
  // ---- the links the author added, IN THE STORY (17/11): grouped in chains (links that share something other than a
  // person: « la dette → née d'une partie de cartes → au tripot → avec Amare » is one chain; a link between two people is
  // its own). What the audience knows of a chain is told once, in passing; what is hidden (sh: 'h') is a seed: a clue
  // early, then it comes out (act at: 1 or 2), and each one reacts. kn = who already knows (they act on it, it's their
  // hidden agenda) ----
  function chains() {
    const L = (S.links || []).map((l, ix) => ({ ...l, ix })).filter((l) => l.by && FILS.LINK[l.k]), up = L.map((_, k) => k), root = (k) => (up[k] === k ? k : (up[k] = root(up[k])));
    const at = new Map(); L.forEach((l, k) => [l.a, l.b].filter((r) => r[0] !== 'p').forEach((r) => { if (at.has(r)) up[root(k)] = root(at.get(r)); else at.set(r, k); }));
    const by = new Map(); L.forEach((l, k) => { const r = root(k); if (!by.has(r)) by.set(r, []); by.get(r).push(l); });
    return [...by.values()].map((ls, n) => { const ppl = [...new Set(ls.flatMap((l) => [l.a, l.b]).filter((r) => r[0] === 'p').map((r) => r.slice(2)))];
      const hid = ls.filter((l) => l.sh === 'h'), open = ls.filter((l) => l.sh !== 'h');
      return { n, ppl, open, hid, kn: [...new Set(hid.flatMap((l) => l.kn || []))].filter(live), at: ACTS() === 2 && hid.some((l) => l.at === 2) ? 2 : 1,
        txt: (L2) => chainTxt(L2) }; });
  }
  // a chain in sentences, walked from where it starts: « Justin doit une dette envers Candy, née d’un duel à l’aube, au quai ».
  // A link both ways by nature (« du même sang ») is its own sentence
  const chainTxt = (L2) => { const pair = (l) => (l.both || FILS.LINK[l.k].dir === 2) && FILS.LINK[l.k].pair, used = new Set(), out = [];
    const walk = (r, deep) => { const ls = L2.filter((l) => !used.has(l) && !pair(l) && l.a === r); ls.forEach((l) => used.add(l));
      const parts = ls.map((l) => { const B = nodeTxt(l.b), more = deep < 3 ? walk(l.b, deep + 1) : ['', '']; return [`${FILS.glue(FILS.LINK[l.k].fr, B[0])}${more[0]}`, `${FILS.LINK[l.k].en} ${B[1]}${more[1]}`]; });
      return parts.length ? [(deep ? ', ' : ' ') + parts.map((x) => x[0]).join(', '), (deep ? ', ' : ' ') + parts.map((x) => x[1]).join(', ')] : ['', '']; };
    const starts = [...new Set(L2.filter((l) => !pair(l)).map((l) => l.a))].sort((x, y) => (L2.some((l) => l.b === x) ? 1 : 0) - (L2.some((l) => l.b === y) ? 1 : 0) || (x[0] === 'p' ? -1 : 0) - (y[0] === 'p' ? -1 : 0));
    for (const r of starts) { if (L2.filter((l) => l.a === r).every((l) => used.has(l))) continue; const A = nodeTxt(r), w = walk(r, 0); out.push([cap(A[0]) + w[0], A[1] + w[1]]); }
    for (const l of L2.filter((x) => !used.has(x))) out.push(linkTxt(l));
    return [out.map((x) => x[0]).join('. '), out.map((x) => x[1]).join('. ')]; };
  const clueOf = (l) => { const C = FILS.CLUE[l.k] || FILS.CLUE.def, A = nodeTxt(l.a), B = nodeTxt(l.b); return [C[0](A[0], B[0]), C[1](A[1], B[1])]; };
  function line() {
    const A = ACTS(), B = [], TH = [], byId = {}, H = (hid) => S.hard[hid] && hardOk(hid), F = window.FILS;
    const thr = (tid, kind, o) => byId[tid] || (TH.push(byId[tid] = { id: tid, kind, ...o }), byId[tid]);
    const tagM = (b, t, mv) => { if (b && t) (b.mv = b.mv || []).push([t.id, mv]); return b; };
    let seq = 0, n = 0; const id = (k) => `${k}${++n}`, evBeat = new Map();
    const carry = { ep: 0, shown: new Set(), cshown: new Set(), closed: new Set(), exposed: new Set(), half: new Map() };
    const hiddenAll = [...kinds('secret'), ...kinds('mask')], objAll = kinds('object'); const carryDefer = [];
    const sig2 = (b) => (b.kind === 'stake' ? `stake|${b.desires && b.desires[0] && b.desires[0].id}|${b.ep}` : `${b.kind}|${b.c.o || ''}|${b.c.show || ''}|${b.c.cr || ''}`);
    const avail = (p) => !NOW.out.has(p);
    const ic = (i) => ({ i: infoFr(i), iE: infoEn(i), s: nm(i.x), sE: en(i.x) });
    const sT = (i) => thr(`S:i${hiddenAll.indexOf(i)}`, 'seed', { who: [i.x, i.y].filter(Boolean), e: IN[i.id].e, fr: infoFr(i), en: infoEn(i), info: i });
    const allCrH = () => { const sv = CUR_ACT; CUR_ACT = 9; try { return evs().filter((e) => EK[e.k].crime && e.h); } finally { CUR_ACT = sv; } };
    const qOf = (e) => { const sv = CUR_ACT; CUR_ACT = 9; let k = 0; try { k = evs().indexOf(e); } finally { CUR_ACT = sv; }
      if (EK[e.k].crime) return e.h ? thr(`Q:c${k}`, 'q', { ev: e, who: [e.v].filter((p) => p && live(p)), e: EK[e.k].e, fr: QEV[e.k][0](vName(e)), en: QEV[e.k][1](vNameE(e)) }) : null;
      if (e.k === 'gone') return thr(`Q:g${k}`, 'q', { ev: e, who: [e.x], e: '👻', fr: `Où est ${nm(e.x)}, et pourquoi ?`, en: `where is ${en(e.x)}, and why?` });
      if (e.k === 'threat') return thr(`P:t${k}`, 'promise', { ev: e, who: [e.x, e.v].filter((p) => p && live(p)), e: '☠️', fr: `${nm(e.x)} ira jusqu’au bout contre ${vName(e)} ?`, en: `will ${en(e.x)} go through with it against ${vNameE(e)}?` });
      return null; };
    const crimeOf = (d) => (d.from && EK[d.from.k].crime && d.from.h ? d.from : null);
    NOW = { hap: new Set(), out: new Map(), shown: new Set() };

    function buildAct(a) {
      CUR_ACT = a;
      if (a === 2) { const AS = actState(); for (const t of AS.kill) NOW.out.set(t, 'dead'); for (const t of AS.gone) NOW.out.set(t, 'gone'); }
      const st = storyAt(a), { D, C, PL, X } = st, r = roles(st), TR = truth(D), sfx = a === 1 ? '' : String(a), GR = graph();
      const EV = evs().filter((e) => actOf(e) === a), first = a === 1 ? EV[0] : null, x = first ? first.x : EV[0] ? EV[0].x : S.cast[0];
      for (const p of PL) if (a > 1 && p.d.from && actOf(p.d.from) === a && carry.closed.has(p.id)) { carry.closed.delete(p.id); carry.shown.delete(p.id); }
      const mains = PL.filter((p) => p.main && !carry.closed.has(p.id)), subs = PL.filter((p) => !p.main && !carry.closed.has(p.id));
      const mainD = (mains[0] || {}).d || X[0];
      const base = { x: nm(x), xE: en(x), t: nm(r.target), tE: en(r.target), a: nm(r.against || x), aE: en(r.against || x), d: nm(r.b), dE: en(r.b),
        w: mainD ? `${DK[mainD.k].n}${mainD.t ? ' ' + tName(mainD) : ''}` : '', wE: mainD ? `${DK[mainD.k].en}${mainD.t ? ' ' + tNameE(mainD) : ''}` : '', px: pillarsOf(x)[0], pxEn: (P[pillarsOf(x)[0]] || {}).exp };
      const want = a === 1 ? mains.length + 1 : Math.ceil(mains.reduce((t, p) => t + (carry.shown.has(p.id) ? 2 : 3 + p.cs.length), 0) / 4);
      const E0 = carry.ep, SE = Math.max(2, Math.min(3, want)), CR = E0 + SE, END = CR + 1; carry.ep = END + 1;
      const mk = (bid, kind, part, e, ep, lk, extra = {}) => { const b = { id: bid, kind, part, e, ep, lk, act: a, seq: ++seq, glue: false, rides: [], ...extra, c: { ...base, ...(extra.c || {}) } };
        if (['stake', 'conflict', 'dshow'].includes(kind) && B.some((o) => o.act === a && sig2(o) === sig2(b))) return null; B.push(b); return b; };
      const ride = (host, rd) => { if (!host) return null; const x2 = { glue: false, rides: [], act: a, ...rd, c: { ...base, ...(rd.c || {}) } }; host.rides.push(x2); return x2; };
      const why = (d) => (d ? [dSay(d), dSayE(d)] : null);
      const inAct = (b) => b.act === a, epOf = (b) => b.ep - E0, has = (ids) => (b) => (b.who || []).some((w) => ids.includes(w));
      const hostFor = (ep, pred) => { const L = B.filter((b) => inAct(b) && b.ep === E0 + Math.max(0, Math.min(SE - 1, ep)) && b.part === 'setup' && b.kind !== 'hook'); return L.find((b) => pred(b) && b.rides.length < 2) || L.find((b) => b.rides.length < 2) || L[0] || null; };
      // a moment that can ride in another (one line, two jobs): in a beat of that episode that fits, else on its own
      const lay = (rid, kind, e, ep, pred, o, T, mv, strict) => { let h = hostFor(ep, pred); if (strict && h && !pred(h)) h = null;
        const rd = h ? ride(h, { id: rid, kind, part: 'setup', e, ...o }) : mk(rid, kind, 'setup', e, E0 + Math.max(0, Math.min(SE - 1, ep)), strict ? 'mais' : 'donc', o); return tagM(rd, T, mv); };
      const ccOf = (e) => { const m = TR.ev.get(e), su = m && m.sus, T = qOf(e), sk = D.find((d) => d.k === 'justice' && d.from === e), w = sk ? sk.who : J, pr = D.find((d) => d.k === 'protect' && d.t === e.x && d.who !== e.x);
        return { x: nm(e.x), xE: en(e.x), v: vName(e), vE: vNameE(e), s: su ? nm(su.id) : '', sE: su ? en(su.id) : '', why: su ? su.why : '', whyE: su ? su.whyE : '', q: T ? T.fr : '', qE: T ? T.en : '', w: nm(w), wE: en(w), p: pr ? nm(pr.who) : 'Quelqu’un', pE: pr ? en(pr.who) : 'someone' }; };

      // ---- the steps of a plotline (its thread) ----
      const lineT = (p) => thr(`L:${p.id}`, 'line', { main: p.main, who: [p.d.who, p.d.t].filter(Boolean), dk: p.d.k, e: DK[p.d.k].e, fr: LQ[p.d.k][0](nm(p.d.who), tName(p.d)), en: LQ[p.d.k][1](en(p.d.who), tNameE(p.d)), say: dSay(p.d) });
      const stepsOf = (p, sub) => { const d = p.d, T = lineT(p), o = p.cs[0], od = o.da === d ? o.db : o.da, W2 = (dd) => [nm(dd.who), tName(dd)], WE = (dd) => [en(dd.who), tNameE(dd)], st = [];
        const cr = crimeOf(d), gn = d.k === 'find' && d.from && d.from.k === 'gone' ? d.from : null, qe = d.k === 'justice' ? cr : gn, mt = qe && F.MATTER[qe.k], vv = qe ? (gn ? [nm(gn.x), en(gn.x)] : [vName(qe), vNameE(qe)]) : null;
        const thrT = d.from && d.from.k === 'threat' ? qOf(d.from) : null;
        if (!carry.shown.has(p.id)) st.push({ kind: 'dshow', e: DK[d.k].e, lk: sub ? 'pendant' : 'donc', who: [d.who, d.t].filter(Boolean), needs: [d.who], after: d.from, desire: d, line: p.id, cause: null,
          c: { dk: d.k, show: mt ? mt[0](nm(d.who), vv[0], !gn && qe.v === d.who) : DK[d.k].show(...W2(d)), showE: mt ? mt[1](en(d.who), vv[1], !gn && qe.v === d.who) : DK[d.k].showE(...WE(d)) }, mvs: [[T, sub && d.k === 'hide' ? 'glimpse' : 'want'], ...(mt ? [[qOf(qe), 'matter']] : [])] });
        // a conflict already shown stays shown; what pulls Justin two ways is a beat only for the climax's pair (the others are his choices)
        const cs = p.cs.filter((c) => !carry.cshown.has(c.fr) && (c.e !== '⇄' || pairKey(c.da, c.db) === pairKey(...X)));
        [...cs.filter((c) => c.e !== '⇄'), ...cs.filter((c) => c.e === '⇄')].forEach((c, k) => { const hunted = c.e === '🛡️' ? [c.da, c.db].find((z) => z.k === 'justice') : null, crq = hunted && crimeOf(hunted);
          st.push({ kind: 'conflict', e: c.e, lk: k || !sub ? 'mais' : 'pendant', who: [...new Set([c.a, c.b, c.da.t, c.db.t].filter(Boolean))].slice(0, 3), needs: c.e === '🔦' ? [c.a] : c.e === '⇄' ? [J] : [c.a, c.b], after: [c.da.from, c.db.from].filter(Boolean),
            desires: [c.da, c.db], c: { o: c.fr, oE: c.en, oWho: c.da === d ? c.b : c.a }, line: p.id, cause: why(d), from: c.da === d ? c.db : c.da, mvs: [[T, c.e === '⇄' ? 'torn' : 'oppose'], ...(crq ? [[qOf(crq), 'block']] : [])] }); });
        // each side weighs more: a hidden crime's side climbs by a clue
        if (cr && d.k === 'justice' && !carry.exposed.has(cr.x)) st.push({ kind: 'clue', e: '🔎', lk: 'donc', who: [d.who, cr.x], needs: [d.who], after: cr, crime: cr, line: p.id, cause: why(d), c: ccOf(cr), defK: vary(`cl:${p.id}`, 6), mvs: [[T, 'raise'], [qOf(cr), 'clue']] });
        else st.push({ kind: 'stake', e: '📈', lk: 'donc', who: [d.who, d.t].filter(Boolean), needs: [d.who], after: d.from, desires: [d], line: p.id, cause: why(d), defN: 'Aveu vulnérable', mvs: [[T, 'raise'], ...(gn ? [[qOf(gn), 'clue']] : []), ...(thrT ? [[thrT, 'approach']] : [])] });
        st.push({ kind: 'stake', e: '📈', lk: 'mais', who: [od.who, od.t].filter(Boolean), needs: [od.who], after: od.from, desires: [od], line: p.id, cause: why(od), defN: 'Show character positioning', mvs: [[T, 'oppose']] });
        // the ⇄ (Justin pulled two ways) goes to the end of the line: by then both sides exist
        const inner = st.findIndex((x2) => x2.e === '⇄'); if (inner > 0) st.push(st.splice(inner, 1)[0]);
        if (!sub && a === 1 && p === mains[0]) st.push({ kind: 'easy', e: '↘️', lk: 'mais', who: [J, d.t].filter(Boolean), needs: [J], c: { t: tName(d) || base.t, tE: tNameE(d) || base.tE }, line: p.id, cause: [o.fr, o.en], mvs: [[T, 'fail']] });
        carry.shown.add(p.id); cs.forEach((c) => carry.cshown.add(c.fr));
        return st; };
      const queues = [...mains.map((p, i) => ({ p, s: stepsOf(p), start: Math.min(i, SE - 1), per: 2 })), ...subs.map((p) => ({ p, s: stepsOf(p, 1).filter((x2) => x2.kind !== 'stake' && x2.kind !== 'clue'), start: a === 1 ? 1 : 0, per: 1, sub: 1 }))];
      // a step plays when its people are there and what makes it has happened; the dead drop theirs; a line keeps its order
      const ready = (s) => (s.needs || []).every(avail) && [].concat(s.after || []).every((e) => NOW.hap.has(e)), gone4good = (s) => (s.needs || []).some((p) => NOW.out.get(p) === 'dead');
      const take = (q, max) => { const got = []; while (got.length < max && q.s.length) { const s = q.s[0]; if (gone4good(s)) { q.s.shift(); continue; } if (!ready(s)) break; got.push(q.s.shift()); } return got; };
      const put = (s, ep, sub) => { const b = mk(id(sub ? 'p' : s.kind === 'dshow' && !sub && s.open ? 'd' : 'm'), s.kind, 'setup', s.e, E0 + ep, s.lk, s); if (b) for (const [t, mv] of s.mvs || []) tagM(b, t, mv); return b; };

      // ---- an event comes in ----
      const placeEvent = (e, EP, isFirst) => { const m = TR.ev.get(e), K2 = EK[e.k]; let b = null;
        if (e.k === 'arrive' && isFirst) { const T = thr('P:arr', 'promise', { who: [e.x], e: '⚡', fr: `L’arrivée ${de(nm(e.x))}`, en: `${en(e.x)}'s arrival` });
          tagM(mk('expect', 'expect', 'setup', '🗣️', EP, 'donc', { glue: true, who: [e.x] }), T, first && first.k === 'arrive' ? 'approach' : 'announce'); tagM(mk('tease', 'tease', 'setup', '⏰', EP, 'donc', { glue: true, who: [e.x] }), T, 'approach');
          b = tagM(mk('inc', 'enter', 'setup', '💥', EP, 'donc', { scene: true, ev: e, who: [e.x] }), T, 'arrive'); }
        else if (e.k === 'arrive') b = mk(id('ev'), 'enter', 'setup', '💥', EP, 'soudain', { scene: true, ev: e, who: [e.x], c: { x: nm(e.x), xE: en(e.x), px: pillarsOf(e.x)[0] } });
        else if (e.k === 'gone') b = tagM(mk(isFirst ? 'inc' : id('ev'), 'gone', 'setup', '👻', EP, 'soudain', { scene: true, ev: e, who: [e.x], c: { x: nm(e.x), xE: en(e.x) } }), qOf(e), 'open');
        else { const T = qOf(e), vOn = e.v && live(e.v);
          // someone about to die: we get attached first, and the one who will look guilty is seen against him
          if (e.k === 'murder' && vOn) { const pal = D.find((d) => ['protect', 'love'].includes(d.k) && d.t === e.v && d.who !== e.x), w = pal ? pal.who : J;
            const al = tagM(mk(id('al'), 'alive', 'setup', '🫶', EP, 'donc', { who: [w, e.v], c: { v: nm(e.v), vE: en(e.v), w: nm(w), wE: en(w) } }), T, 'alive'), su = m && m.sus;
            if (al && su && su.oust) tagM(ride(al, { id: id('pre'), kind: 'conflict', part: 'setup', e: '😤', who: [su.id, e.v], c: { o: `${nm(su.id)} et ${nm(e.v)} s’affrontent devant tous`, oE: `${en(su.id)} and ${en(e.v)} clash in front of everyone` } }), T, 'seed'); }
          const tail = K2.crime ? (e.h ? [' ; qui a fait ça ?', '; who did it?'] : [` : c’est ${nm(e.x)}`, `: it was ${en(e.x)}`]) : m && !m.f.pay ? [` : ${m.fr}`, ` (${m.en})`] : ['', ''];
          b = mk(isFirst ? 'inc' : id('ev'), 'crime', 'setup', K2.e, EP, 'soudain', { scene: true, ev: e, who: [e.v, e.h ? null : e.x].filter((w) => w && live(w)), c: { cr: `${evFr(e)}${tail[0]}`, crE: `${evEnT(e)}${tail[1]}` } });
          tagM(b, T, T && T.kind === 'promise' ? 'announce' : 'open'); }
        NOW.hap.add(e); if (e.k === 'murder' && e.v && live(e.v)) NOW.out.set(e.v, 'dead'); if (e.k === 'gone') NOW.out.set(e.x, 'gone');
        if (b && K2.crime && GR.fig && GR.cr === e) { const R = GR.fig, rx = [], rxE = [];
          rx.push(`${nm(e.x)} détourne : « un étranger, sûrement »`); rxE.push(`${en(e.x)} deflects: "a stranger, surely"`);
          if (GR.need && avail(GR.need)) { rx.push(`${nm(GR.need)} comprend ce que ça lui coûte (${R.lost})`); rxE.push(`${en(GR.need)} sees what it costs them (${R.lostE})`); }
          if (GR.vil && avail(GR.vil.x) && GR.vil.x !== e.x) { rx.push(`${nm(GR.vil.x)} se fait petit : ${R.n} ne doit pas le reconnaître`); rxE.push(`${en(GR.vil.x)} keeps his head down: ${R.nE} must not recognize him`); }
          tagM(ride(b, { id: `rx${n + 1}`, kind: 'react', part: 'setup', e: '👥', who: [e.x, GR.need, GR.vil && GR.vil.x].filter(Boolean), c: { rx: `Chacun réagit : ${rx.join(' ; ')}`, rxE: `each one reacts from what ties them to it: ${rxE.join('; ')}` } }), qOf(e), 'matter'); }
        if (b) { evBeat.set(e, b); if (a > 1 && byId['P:end'] && !byId['P:end'].paid) { tagM(b, byId['P:end'], 'arrive'); byId['P:end'].paid = 1; } }
        return b; };

      // ---- the setup episodes ----
      const lastInner = [];
      for (let ep = 0; ep < SE; ep++) { const EP = E0 + ep;
        if (a === 1 && ep === 0) mk('hook1', 'hook', 'setup', '🎬', EP, 'donc', { defN: first && first.k === 'gone' && first.x === r.target ? 'Taquinerie de trop' : 'Entrée qui fait taire' });
        const evHere = EV.filter((e, k) => Math.min(k, SE - 1) === ep), q0 = queues.filter((q) => q.start <= ep && q.s.length);
        // the main line that opens: its desire shown before the event (unless the event makes that desire)
        for (const q of q0.filter((q2) => !q2.sub && ep === q2.start)) if (q.s[0] && q.s[0].kind === 'dshow') for (const s of take(q, 1)) put({ ...s, open: 1 }, ep);
        for (const e of evHere) placeEvent(e, EP, e === first);
        // the lines' steps, the others' « meanwhile », then what pulls Justin two ways (both sides are on the table by then)
        const later2 = [];
        for (const q of [...q0.filter((q2) => !q2.sub), ...q0.filter((q2) => q2.sub)]) for (const s of take(q, q.per)) { if (s.e === '⇄') later2.push(s); else put(s, ep, q.sub); }
        if (ep < SE - 1) for (const s of later2) put(s, ep); else lastInner.push(...later2);
      }
      // leftovers go in the last setup episode, then what pulls Justin two ways
      for (const q of queues) for (const s of take(q, 99)) if (!q.sub || s.kind === 'conflict') { if (s.e === '⇄') lastInner.push(s); else put(s, SE - 1, q.sub); }
      for (const s of lastInner) put(s, SE - 1);

      // ---- what rides: the second hook in the first, a past in the desire it explains, the crowd's love in the rival's
      // conflict, the seeds where the one who hides is there, an object seen early, the danger in a raise, the secret that binds ----
      const at = (pred) => B.find((b) => inAct(b) && pred(b)), B0 = () => B.filter(inAct);
      if (a === 1 && first && first.k === 'arrive') tagM(ride(B0()[0], { id: 'hook2', kind: 'hook', part: 'setup', e: '🎬', defN: 'Un nom chuchoté' }), byId['P:arr'], 'announce');
      if (a === 1) for (const [k, i] of kinds('past').entries()) { const own = (b) => b.kind === 'dshow' && b.desire && b.desire.info === i, both = (b) => b.kind === 'dshow' && [i.x, i.y].every((w) => (b.who || []).includes(w)), oth = [i.x, i.y].filter((w) => w && w !== J), one = (b) => b.part === 'setup' && b.kind !== 'hook' && [b, ...b.rides].some((z) => (z.who || []).some((w) => oth.includes(w))) && b.rides.length < 3;
        ride(at(own) || at(both) || at(one) || at((b) => b.kind === 'dshow') || B0()[0], { id: `past${k}`, kind: 'past', part: 'setup', e: '🕰️', c: ic(i), info: i, who: [i.x, i.y], defN: k ? 'Tell a story' : 'Shared memory' }); }
      const crimesH = EV.filter((e) => EK[e.k].crime && e.h), CRH = allCrH();
      // adored by everyone: not anymore once they were unmasked in an act before
      if (H('liked') && r.against && !(a === 2 && actState().ch.some((c) => c.dim === 'statut' && c.fr.startsWith(`${nm(r.against)} : démasqué`)))) { const lk = ride(at((b) => b.kind === 'conflict' && b.c.oWho === r.against) || at((b) => b.kind === 'conflict') || B0()[B0().length - 1], { id: `liked${sfx}`, kind: 'liked', part: 'setup', e: '😇', who: [r.against] });
        const cr = crimesH.find((e) => e.x === r.against), host = lk && B.find((b) => b.rides.includes(lk)); if (cr && host && evBeat.get(cr) && host.seq > evBeat.get(cr).seq) tagM(lk, qOf(cr), 'block'); }
      // what is hidden and is nobody's motive: the crisis holds two answers at most; the others come out before it, one
      // per episode from the last (a complication right before the choice). Planned first: a seed goes far from its payoff
      const paid = new Set(), tiedTo = (i) => crimesH.find((e) => (TR.ev.get(e) || {}).info === i) || EV.find((e) => e.k === 'gone' && (TR.ev.get(e) || {}).info === i) || [...carry.half].some(([e, h]) => (h.why ? (TR.ev.get(e) || {}).info : h.info) === i), earlyAt = new Map();
      { const inCrisis = objAll.filter((i) => actOf(i) === a).length + crimesH.length + EV.filter((e) => e.k === 'gone').length, free = hiddenAll.filter((i) => iAct(i) === a && !tiedTo(i) && !objAll.some((o) => actOf(o) === a && (TR.obj.get(o) || {}).secret === i));
        free.slice(Math.max(0, 2 - inCrisis)).forEach((i, k) => { const ep = SE - 1 - k; if (ep >= 1 && avail(i.x)) earlyAt.set(i, ep); }); }
      // the seeds of what is hidden: as early as they can, where the one who hides is there (even for what comes out in act 2)
      if (a === 1) hiddenAll.forEach((i, k) => tagM(ride(hostFor(Math.max(0, Math.min(k % 2, (earlyAt.has(i) ? earlyAt.get(i) : SE) - 2)), has([i.x])), { id: `plant${k}`, kind: 'plant', part: 'setup', e: '🌱', c: ic(i), info: i, hint: true, who: [i.x] }), sT(i), 'seed'));
      if (a === 1) objAll.forEach((i, k) => { const T = thr(`Q:o${k}`, 'q', { who: [i.x, i.y].filter(Boolean), e: IN[i.id].e, fr: `Qu’y a-t-il dans ${low1(infoFr(i))} ?`, en: `what is in ${infoEn(i)}?`, info: i });
        tagM(ride(hostFor(0, has([i.x, i.y].filter(Boolean))), { id: `obj${k}`, kind: 'seen', part: 'setup', e: IN[i.id].e, c: ic(i), info: i, hint: true, who: [i.x].filter(Boolean) }), T, 'open'); });
      // ---- the author's links in the story: told in passing / a clue, then it comes out ----
      const defer = carryDefer.splice(0);
      chains().forEach((ch) => { const on = (b) => !ch.ppl.length || has(ch.ppl)(b);
        // a chain tied to a hidden info (it holds the gambling debt) is told when that info comes out, never before
        const under = (S.links || []).filter((l) => !l.by && l.k === 'holds' && l.a[0] === 'i' && ch.open.concat(ch.hid).some((x) => [x.a, x.b].includes(l.b))).map((l) => S.infos[+l.a.slice(2)]).find((i) => i && hiddenAll.includes(i));
        if (under && ch.open.length) { if (a === 1) defer.push([ch, under]); if (!ch.hid.length) return; } else
        if (a === 1 && ch.open.length) { const t2 = ch.txt(ch.open); lay(`tie${ch.n}`, 'tie', '🕸️', Math.min(SE - 1, ch.n % 2), on, { c: { i: t2[0], iE: t2[1] }, who: ch.ppl.filter(avail).slice(0, 2), tl: ch.n }); }
        if (!ch.hid.length) return; const T = thr(`S:l${ch.n}`, 'seed', { who: ch.ppl.slice(0, 2), e: '🕸️', fr: ch.txt(ch.hid)[0], en: ch.txt(ch.hid)[1] }), kn = ch.kn.map(nm).join(' et '), knE = ch.kn.map(en).join(' and ');
        if (a === 1) { const cl = clueOf(ch.hid[0]), last = ch.at === 1 ? SE - 2 : SE - 1;
          tagM(ride(hostFor(Math.max(0, Math.min(last, ch.n % 2)), on), { id: `lcl${ch.n}`, kind: 'tclue', part: 'setup', e: '🌱', who: ch.ppl.filter(avail).slice(0, 2), tl: ch.n,
            c: { cl: cl[0] + (kn ? ` (${kn} le sait déjà)` : ''), clE: cl[1] + (knE ? ` (${knE} already know${ch.kn.length > 1 ? '' : 's'}, and act on it)` : ''), i: ch.txt(ch.hid)[0], iE: ch.txt(ch.hid)[1] } }), T, 'seed'); }
        if (a !== ch.at) return;
        const here = ch.ppl.filter(avail), b = mk(`lrev${ch.n}`, 'treveal', 'setup', '🕸️', E0 + SE - 1, 'soudain', { who: here.slice(0, 3), tl: ch.n, scene: true, c: { i: ch.txt(ch.hid)[0], iE: ch.txt(ch.hid)[1] } });
        tagM(b, T, 'pay'); if (!b) return;
        // each one reacts from what ties them to it: those it is about learn it (or knew), and whoever wants one of them
        const tie2 = (p) => D.find((d) => d.who === p && d.t && here.includes(d.t) && d.t !== p && ['love', 'oust', 'justice', 'find'].includes(d.k) && !d.dead), rx = [], rxE = [], tie = (p) => D.find((d) => d.who === p && d.t && ch.ppl.includes(d.t) && d.who !== d.t && ['love', 'protect', 'find', 'oust', 'justice'].includes(d.k) && !d.dead && !d.late);
        for (const p of here.slice(0, 3)) { const k2 = ch.kn.includes(p), d = tie2(p); rx.push(`${nm(p)} ${k2 ? 'le savait' : 'l’apprend'}${d ? ` (${DK[d.k].e} ${nm(d.t)}) : tout ce qu’il voulait ${d.k === 'love' ? 's’écroule' : 'change de sens'}` : ''}`);
          rxE.push(`${en(p)} ${k2 ? 'knew all along' : 'learns it now'}${d ? ` (they wanted ${DK[d.k].en} ${en(d.t)}): ${d.k === 'love' ? 'it all falls apart' : 'it all means something else now'}` : ''}`); }
        const crs = ch.hid.filter((l) => l.k === 'saw' && l.b[0] === 'e').map((l) => S.ev[+l.b.slice(2)]).filter((e) => e && EK[e.k] && EK[e.k].crime);
        for (const e of crs) if (avail(e.x) && !here.includes(e.x) && rx.length < 4) { rx.push(`${nm(e.x)} se fige, une seconde de trop`); rxE.push(`${en(e.x)} freezes, a second too long (never say why: it is a clue)`); }
        for (const p of people().filter((p) => avail(p) && !here.includes(p) && !crs.some((e) => e.x === p))) { const d = tie(p); if (d && rx.length < 4) { rx.push(`${nm(p)} (${DK[d.k].e} ${nm(d.t)}) : ça change tout pour lui`); rxE.push(`${en(p)} (who wants ${DK[d.k].en} ${en(d.t)}): it changes everything for them`); } }
        ride(b, { id: `lrx${ch.n}`, kind: 'react', part: 'setup', e: '👥', who: here.slice(0, 2), c: { rx: `Chacun réagit : ${rx.join(' ; ')}`, rxE: `each one reacts from what ties them to it: ${rxE.join('; ')}` } }); });
      if (H('danger')) { const fd = D.find((d) => d.who === J && ['free', 'find'].includes(d.k) && d.s >= 2);
        const dg = fd ? (fd.k === 'free' ? ['Pour partir, il faut traverser la forêt, la nuit', 'to leave, he must cross the forest, at night'] : [`Pour retrouver ${tName(fd)}, il faut traverser la forêt`, `to find ${tNameE(fd)}, he must cross the forest`]) : ['Un lieu dangereux à traverser', 'a dangerous place to cross'];
        if (a === 1) ride(at((b) => b.line === (fd && fd.id) && b.kind === 'stake') || at((b) => b.line === (fd && fd.id)) || at((b) => b.kind === 'stake') || B0()[B0().length - 1], { id: 'danger', kind: 'danger', part: 'setup', e: '🌲', c: { dg: dg[0], dgE: dg[1] }, who: [J] }); }
      // the secret that binds: Justin learns it (the audience with him: the others do not know), and telling it would cost too much
      const gagI = kinds('secret').find((i) => iAct(i) === a && i.x !== J);
      if (H('gag') && gagI) { const g = ride(at((b) => b.kind === 'easy') || at((b) => b.kind === 'stake' && b.line) || B0()[B0().length - 1], { id: `gag${sfx}`, kind: 'gag', part: 'setup', e: '🤐', c: ic(gagI), info: gagI, who: [J, gagI.x], knows: gagI });
        tagM(g, sT(gagI), 'glimpse'); const cr = crimesH.find((e) => (TR.ev.get(e) || {}).info === gagI); if (cr) tagM(g, qOf(cr), 'clue'); }
      // the clock of the last act: said early, said again, then it strikes
      let DL = null;
      if (H('clock') && a === A) { DL = [['À l’aube', 'at dawn'], ['À minuit', 'at midnight'], ['Avant la fermeture', 'before closing time'], ['Au départ du dernier bateau', 'when the last boat leaves']][vary('clock', 4)];
        const T = thr('P:clock', 'promise', { who: [J], e: '⏳', fr: `L’échéance : ${DL[0].toLowerCase()}`, en: `the deadline: ${DL[1]}` });
        lay('clk1', 'announce', '⏳', 0, (b) => b.kind === 'stake' || b.kind === 'conflict', { c: { pr: `« ${DL[0]}, il sera trop tard. »`, prE: `"${cap(DL[1])}, it will be too late."` }, defK: 1 }, T, 'announce');
        if (SE > 1) lay('clk2', 'approach', '⏳', SE - 1, (b) => b.kind === 'stake', { c: { pr: `${DL[0]} approche : il reste peu de temps`, prE: `${DL[1]} is close: little time is left` }, defK: 1 }, T, 'approach'); }

      // ---- the ladder of each hidden crime: theories, a false lead that is broken later, a seed, a clue, what he let slip ----
      crimesH.forEach((e) => { const T = qOf(e), m = TR.ev.get(e), cb = evBeat.get(e), ep = cb ? epOf(cb) : 0, kh = CRH.indexOf(e), su = m && m.sus, cc = ccOf(e), many = people().filter(avail).length;
        if (cb && many >= 3) tagM(ride(cb, { id: `th${kh}`, kind: 'theory', part: 'setup', e: '🤷', c: cc, defK: vary(`th${kh}`, 2) }), T, 'theory');
        if (su && avail(su.id)) { const fa = lay(`fa${kh}`, 'false', '🪤', ep + (SE - 1 > ep ? 1 : 0), (b) => b.kind === 'conflict' && (b.desires || []).some((d) => d.k === 'justice'), { who: [su.id], c: cc, defK: su.frame ? 2 : su.hides ? 1 : 0 }, T, 'false', 1);
          const fh = B.find((b) => b === fa || b.rides.includes(fa));
          if (SE - 1 > ep) lay(`na${kh}`, 'narrow', '🔻', SE - 1, (b) => !b.ev && b.seq > (fh ? fh.seq : 0) && [b, ...b.rides].some(has([su.id])), { who: [su.id], c: cc, defK: 1 }, T, 'narrow', 1); }
        else if (many >= 4 && SE - 1 > ep) lay(`na${kh}`, 'narrow', '🔻', SE - 1, (b) => b.kind === 'clue' || (b.kind === 'conflict' && (b.desires || []).some((d) => d.k === 'justice')), { c: cc, defK: 0 }, T, 'narrow');
        lay(`clue${kh}`, 'plant', '🌱', ep, (b) => b !== cb && b.seq > (cb ? cb.seq : 0), { crime: e, c: { i: `${nm(e.x)} était là cette nuit-là`, iE: `${en(e.x)} was there that night`, s: nm(e.x), sE: en(e.x) }, hint: true, who: [e.x] }, T, 'seed');
        if (!B.some((b) => inAct(b) && [b, ...b.rides].some((z) => (z.mv || []).some(([t, mv]) => t === T.id && mv === 'clue')))) lay(`cl${kh}`, 'clue', '🔎', SE - 1, has([e.x]), { crime: e, who: [e.x], c: cc, defK: vary(`cl${kh}`, 6) }, T, 'clue');
        if (m && m.f.prom && avail(e.x)) { const PT = thr(`P:m${kh}`, 'promise', { who: [e.x, m.d && m.d.t].filter(Boolean), e: '📣', fr: `Ce ${/^[aeiouyhéèêà]/i.test(nm(e.x)) ? 'qu’' : 'que '}${nm(e.x)} prépare`, en: `what ${en(e.x)} is preparing` }), wh = [e.x, m.d && m.d.t].filter(Boolean);
          lay(`pr${kh}`, 'announce', '📣', ep, has([e.x]), { who: wh, c: { ...cc, pr: m.f.prom[0](m.c), prE: m.f.prom[1](m.c) }, defK: 0 }, PT, 'announce');
          if (m.f.near && SE - 1 > ep) lay(`pn${kh}`, 'approach', '⏳', SE - 1, has([e.x]), { who: wh, c: { ...cc, pr: m.f.near[0](m.c), prE: m.f.near[1](m.c) }, defK: 0 }, PT, 'approach'); }
      });
      // someone gone: what people believe happened
      EV.filter((e) => e.k === 'gone').forEach((e) => { const T = qOf(e), gb = evBeat.get(e), k = T.id.slice(3);
        if (gb) tagM(ride(gb, { id: `lo${k}`, kind: 'lost', part: 'setup', e: '🪤', c: { x: nm(e.x), xE: en(e.x) }, who: [e.x], defK: vary(`lo${k}`, 2) }), T, 'false'); });
      for (const [i, ep] of earlyAt) { const kk = hiddenAll.indexOf(i); tagM(mk(`rev${kk}`, 'reveal', 'setup', IN[i.id].e, E0 + ep, 'soudain', { c: ic(i), info: i, who: [i.x, i.y].filter(Boolean), early: 1 }), sT(i), 'pay'); paid.add(i); }
      // a secondary line touches Justin's: where it already does, else one moment made for it
      for (const q of queues.filter((q2) => q2.sub)) { const T = lineT(q.p), mine = B.filter((b) => inAct(b) && b.line === q.p.id); if (!mine.length) continue;
        const dear = new Set(D.filter((d) => d.who === J && d.s >= 2 && d.t).map((d) => d.t)), tied = q.p.d.from || dear.has(q.p.d.who) || (q.p.d.t && (dear.has(q.p.d.t) || q.p.d.t === J));
        const touch = mine.find((b) => (b.who || []).includes(J) || (b.mv || []).some(([t]) => /^[QP]:/.test(t))) || (tied ? mine[0] : null);
        if (touch) tagM(touch, T, 'cross');
        else if (avail(q.p.d.who)) lay(id('x'), 'cross', '✳️', SE - 1, (b) => !!b.line && mains.some((p) => p.id === b.line), { who: [q.p.d.who, J], line: q.p.id, c: { w: nm(q.p.d.who), wE: en(q.p.d.who) }, defK: vary(`x:${q.p.id}`, 4) }, T, 'cross'); }

      // ---- an episode holds what fits in its lines (about 24: a beat ≈ 2 or 3, what rides ≈ 1). What is over goes to the
      // next setup episode if it has room, else it is dropped, the least needed first: a secondary conflict the story has
      // already shown between other people, then the other secondary conflicts, then a secondary desire that carries no
      // question, then the opposition's raise. Events, Justin's lines and the questions' steps always stay ----
      { const CAP = 9, own = (ep) => B.filter((b) => inAct(b) && b.ep === E0 + ep && b.part === 'setup'), load = (ep) => own(ep).reduce((t, b) => t + 1 + b.rides.length * 0.5, 0);
        const sub = (b) => !!b.line && subs.some((p) => p.id === b.line), about = (b) => (b.desires || []).map((d) => `${d.k}:${d.t || d.who}`).sort().join('|');
        const cls = (b) => (b.kind === 'conflict' && sub(b) ? (B.some((o) => o !== b && inAct(o) && o.kind === 'conflict' && o.seq < b.seq && o.e === b.e && about(o) === about(b)) ? 1 : 2)
          : b.kind === 'dshow' && sub(b) && !(b.mv || []).some(([, m]) => m === 'matter' || m === 'glimpse') ? 3 : b.kind === 'stake' && b.lk === 'mais' && !b.choiceOf ? 4 : 9);
        for (let ep = 0; ep < SE; ep++) for (let guard = 60; load(ep) > CAP && guard--;) { const v = own(ep).filter((b) => cls(b) < 9).sort((x2, y2) => cls(x2) - cls(y2) || x2.rides.length - y2.rides.length || y2.seq - x2.seq)[0]; if (!v) break;
          const w = 1 + v.rides.length * 0.5, nx = own(ep + 1);
          if (cls(v) > 1 && ep < SE - 1 && load(ep + 1) + w <= CAP) { v.ep = E0 + ep + 1; v.seq = (nx.length ? Math.min(...nx.map((b) => b.seq)) : seq) - 0.5 + (guard / 1000); continue; }
          const keep = own(ep).filter((b) => b !== v && b.seq < v.seq).pop() || own(ep).find((b) => b !== v); if (keep) keep.rides.push(...v.rides.filter((r2) => (r2.mv || []).length));
          B.splice(B.indexOf(v), 1); } }

      // ---- the crisis: what was hidden comes out (an object first: what it holds comes with it; a crime with its motive),
      // it all means something else, the clock strikes, the climax ----
      const answered = [];
      objAll.filter((i) => actOf(i) === a).forEach((i) => { const k = objAll.indexOf(i), h = TR.obj.get(i) || {}, T = byId[`Q:o${k}`];
        const txt = h.crime && h.crime.h && actOf(h.crime) === a ? (h.side === 'v' ? [`${infoFr(i)} : ${vName(h.crime)} y disait de qui se méfier`, `${infoEn(i)}: in it, ${vNameE(h.crime)} said whom to fear`] : [`${infoFr(i)} : ce qu’on cherchait est là`, `${infoEn(i)}: what everyone was looking for is there`])
          : h.secret && iAct(h.secret) === a && !tiedTo(h.secret) ? [`${infoFr(i)} : la preuve. ${infoFr(h.secret)}`, `${infoEn(i)}: the proof. ${infoEn(h.secret)}`] : h.gone ? [`${infoFr(i)} montre où est ${nm(h.gone.x)}`, `${infoEn(i)} shows where ${en(h.gone.x)} is`] : null;
        const b = tagM(mk(`open${k}`, 'open', 'reveal', IN[i.id].e, CR, 'donc', { c: { ...ic(i), ...(txt ? { ox: txt[0], oxE: txt[1] } : {}) }, info: i, who: [i.x, i.y].filter(Boolean) }), T, 'answer'); answered.push(T);
        if (!txt) return; if (h.crime && h.crime.h) tagM(b, qOf(h.crime), 'clue'); else if (h.secret) { tagM(b, sT(h.secret), 'pay'); paid.add(h.secret); b.tells = h.secret; } else if (h.gone) tagM(b, qOf(h.gone), 'clue'); });
      const endLines = (b, e) => { for (const p of PL) if (!X.some((d) => d && d.id === p.d.id) && p.d.from === e && ['justice', 'hide', 'alive'].includes(p.d.k)) { tagM(b, byId[`L:${p.id}`], 'close'); carry.closed.add(p.id); } };
      crimesH.forEach((e) => { const kh = CRH.indexOf(e), m = TR.ev.get(e), T = qOf(e);
        const whyLater = !!(m && m.info && iAct(m.info) > a), with2 = a < A && !whyLater ? hiddenAll.find((i) => iAct(i) > a && [i.x, i.y].includes(e.x) && i !== (m && m.info)) : null, half = whyLater || !!with2;
        const pay = m && m.f.pay ? [m.f.pay[0](m.c), m.f.pay[1](m.c)] : m ? [cap(m.fr), m.en] : [cap(evFr(e)), evEnT(e)];
        const b = mk(`who${kh}`, whyLater ? 'partial' : 'reveal', 'reveal', '🎯', CR, 'soudain', { who: [e.x], crime: e, half, c: { i: `C’était ${nm(e.x)}. ${pay[0]}`, iE: `it was ${en(e.x)}. ${pay[1]}`, s: nm(e.x), sE: en(e.x), x: nm(e.x), xE: en(e.x) }, defK: whyLater ? 0 : undefined });
        tagM(b, T, half ? 'partial' : 'answer'); answered.push(T); carry.exposed.add(e.x); NOW.shown.add(e.x);
        if (with2) ride(b, { id: `ws${kh}`, kind: 'partial', part: 'reveal', e: '🌓', who: [e.x], c: { x: nm(e.x), xE: en(e.x) }, defK: 1 });
        if (half) carry.half.set(e, { why: whyLater, info: with2, pay });
        if (!whyLater && m && m.info && iAct(m.info) === a) { tagM(b, sT(m.info), 'pay'); b.tells = m.info; }
        if (byId[`P:m${kh}`]) tagM(b, byId[`P:m${kh}`], 'arrive');
        // the lines the truth ends: who looked for it, who hid it, who feared the killer (not a line the climax is about: knowing is not choosing)
        if (!half) endLines(b, e); });
      // what act 1 left open about a crime: its why, or who was with him
      for (const [e, h] of carry.half) { if (actOf(e) >= a) continue; const T = qOf(e), kh = CRH.indexOf(e), m = TR.ev.get(e), i = h.why ? m && m.info : h.info; if (!i || iAct(i) !== a) continue;
        const b = h.why ? mk(`why${kh}`, 'reveal', 'reveal', '💡', CR, 'soudain', { who: [e.x], crime: e, info: i, c: { i: `Pourquoi ${nm(e.x)} l’a fait : ${low1(h.pay[0])}`, iE: `why ${en(e.x)} did it: ${h.pay[1]}`, s: nm(e.x), sE: en(e.x) } })
          : mk(`rev${hiddenAll.indexOf(i)}`, 'reveal', 'reveal', IN[i.id].e, CR, 'soudain', { c: ic(i), info: i, crime: e, who: [i.x, i.y].filter(Boolean) });
        tagM(tagM(b, sT(i), 'pay'), T, 'answer'); answered.push(T, sT(i)); paid.add(i); endLines(b, e); carry.half.delete(e); }
      EV.filter((e) => e.k === 'gone').forEach((e) => { const T = qOf(e), m = TR.ev.get(e);
        tagM(mk(`fd${T.id.slice(3)}`, 'found', 'reveal', '🔦', CR, 'donc', { who: [e.x], c: { x: nm(e.x), xE: en(e.x), m: m ? m.fr : '', mE: m ? m.en : '' } }), T, 'answer'); answered.push(T); NOW.out.delete(e.x);
        if (m && m.info && iAct(m.info) === a && !paid.has(m.info)) { paid.add(m.info); tagM(B[B.length - 1], sT(m.info), 'pay'); B[B.length - 1].tells = m.info; } });
      hiddenAll.filter((i) => iAct(i) === a && !tiedTo(i) && !paid.has(i)).forEach((i) => { const k = hiddenAll.indexOf(i); tagM(mk(`rev${k}`, 'reveal', 'reveal', IN[i.id].e, CR, 'soudain', { c: ic(i), info: i, who: [i.x, i.y].filter(Boolean) }), sT(i), 'pay'); answered.push(sT(i)); });
      for (const [ch, i] of defer.splice(0)) { const rv = B.find((b) => b.kind === 'reveal' && b.info === i); if (!rv) { if (a < A) carryDefer.push([ch, i]); continue; } const t2 = ch.txt(ch.open);
        ride(rv, { id: `tie${ch.n}`, kind: 'tie', part: 'reveal', e: '🕸️', who: ch.ppl.filter(avail).slice(0, 2), tl: ch.n, c: { i: t2[0], iE: t2[1], tie: `Et derrière : ${low1(t2[0])}`, tieE: `and behind it (now it can be said): ${t2[1]}` } }); }
      const firstRev = at((b) => b.part === 'reveal'); if (firstRev) firstRev.scene = true;
      if (answered.length) { const tw = mk(`twist${sfx}`, 'twist', 'reveal', '🔄', CR, 'donc'); for (const T of answered) tagM(tw, T, 'echo'); }
      if (H('clock') && a === A) tagM(mk('clock', 'clock', 'crisis', '⏳', CR, 'mais', { glue: true, c: DL ? { dl: `${DL[0]} : il faut trancher maintenant`, dlE: `${DL[1]}: it must be decided now` } : {} }), byId['P:clock'], 'arrive');
      const [ca, cb] = X, CT2 = thr('C:all', 'choice', { who: [J], e: '⚖️', fr: 'Les choix de Justin', en: 'justin\'s choices' });
      const pk2 = mk(`pick${sfx}`, 'pick', 'crisis', '⚖️', CR, 'mais', { who: [J, ...[ca, cb].map((d) => d && d.t).filter(Boolean)], climax: [ca, cb], opts: [ca ? cap(lab(ca)) : '?', cb ? cap(lab(cb)) : '?'], fr: `${ca ? cap(lab(ca)) : '?'} ou ${cb ? lab(cb) : '?'} ?`, en: `the climax: ${ca ? labE(ca) : '?'} or ${cb ? labE(cb) : '?'}` });
      tagM(pk2, CT2, 'choice'); for (const d of [ca, cb]) if (d && byId[`L:${d.id}`]) tagM(pk2, byId[`L:${d.id}`], 'choice');
      for (const e of EV.filter((e2) => e2.k === 'threat')) tagM(pk2, qOf(e), 'arrive');
      // ---- the end of the act: what it cost, how the others' lines end (the last act), what comes next ----
      const cost = mk(`cost${sfx}`, 'cost', 'end', '💔', END, 'donc', { scene: true }), sides = [ca, cb].filter(Boolean), fated = new Set(sides.map((d) => d.t).filter(Boolean));
      for (const p of PL) { const d = p.d, T = byId[`L:${p.id}`]; if (!T || carry.closed.has(p.id)) continue;
        if (sides.some((x) => x.id === d.id || sameSide(x, d)) || (!p.main && (fated.has(d.who) || (d.from && d.from.k === 'threat')))) { tagM(cost, T, !p.main ? 'close' : a === A ? 'cost' : 'toll'); if (a === A || !p.main) carry.closed.add(p.id); } }
      if (a === A) tagM(cost, CT2, 'cost');
      if (a === A) { const done = new Map();
        for (const q of queues.filter((q2) => q2.sub)) { const T = lineT(q.p), w = q.p.d.who; if (carry.closed.has(q.p.id) || !avail(w) || !B.some((b) => b.line === q.p.id)) continue;
          if (!done.has(w)) done.set(w, mk(id('z'), 'close', 'end', '✔️', END, 'pendant', { who: [w, q.p.d.t].filter(Boolean), line: q.p.id, c: { w: nm(w), wE: en(w) }, defK: vary(`z:${w}`, 3) }));
          tagM(done.get(w), T, 'close'); } }
      const endB = mk(`end${sfx}`, 'end', 'end', '❔', END, 'donc');
      if (a < A) tagM(endB, thr('P:end', 'promise', { who: [J], e: '❔', fr: 'La suite : ce que la fin annonce', en: 'what the ending announces' }), 'announce');
    }
    try { for (let a = 1; a <= A; a++) buildAct(a); } finally { NOW = null; CUR_ACT = 9; }
    B.sort((x, y) => x.ep - y.ep || x.seq - y.seq);
    const out = B.map((b) => ({ ...withTech(b), rides: b.rides.map(withTech) }));
    // a technique with moments (Coincé devant tous): its question rides early in the episode, everyone tries, and it is
    // asked when he arrives: his answer is the moment. If he did a crime, it's « the night of » it
    const EVA = evs();
    for (const b of out) if (b.kind === 'enter' && b.tech && b.tech.parts && b.ev) {
      // « the night of the theft » only if the theft is already known; else « last night », and the theft found later gives it its meaning
      const e = b.ev, crime = EVA.find((c2) => EK[c2.k].crime && c2.x === e.x), known = crime && out.slice(0, out.indexOf(b)).some((x2) => x2.ev === crime), Q = `Où était ${nm(e.x)} ${known ? `la nuit ${({ murder: 'du meurtre', theft: 'du vol', betray: 'de la trahison' })[crime.k]}` : 'cette nuit'} ?`;
      const QE = `where was ${en(e.x)} ${known ? `the night of the ${({ murder: 'murder', theft: 'theft', betray: 'betrayal' })[crime.k]}` : 'last night'}?`;
      const T = thr(`Q:in${b.id === 'inc' ? '' : b.id}`, 'q', { who: [e.x], e: '❓', fr: Q, en: QE });
      const before = out.slice(0, out.indexOf(b)).filter((x2) => x2.ep === b.ep), hostQ = before.find((x2) => x2.kind === 'expect') || before[0], hostT = before.find((x2) => x2.kind === 'tease') || before[before.length - 1] || hostQ;
      const part = (id2, e2, fr, en2, n2, mv) => tagM({ id: id2, kind: 'part', part: 'setup', e: e2, fr, en: en2, n: n2, g: 'char', k: 0, tech: null, rides: [], c: { q: fr }, partOf: b.id, who: [e.x], act: b.act }, T, mv);
      if (hostQ) hostQ.rides.push(part(`${b.id}q`, '❓', `« ${Q} » Personne n’a la réponse`, `the hard question everyone asks: "${QE}" nobody has the answer`, 'Coincé devant tous · la question', 'open'));
      if (hostT && hostT !== hostQ) hostT.rides.push(part(`${b.id}t`, '🤷', `Chacun a sa théorie sur ${nm(e.x)} ; aucune ne tient`, `everyone has a theory about ${en(e.x)}; none holds`, 'Coincé devant tous · chacun essaie', 'theory'));
      // his answer pays something: the culprit's answer is a brilliant LIE (it collapses at the reveal); otherwise a detail
      // he slipped earlier, passing for a joke (« un nouveau truc, je vous raconterai »), comes back and explains it all
      if (crime) {
        b.fr = `${b.fr} ; on lui demande devant tous : « ${Q} » ; sa réponse est brillante… et fausse`; b.en = `${b.en}; in front of everyone someone asks him "${QE}"; his answer is brilliant, everyone believes it, and it is a lie (it collapses when the truth comes out)`;
        b.lie = crime; tagM(b, T, 'false');
        // the doubt stays: later someone notices what does not fit; the truth about the crime is its answer
        const nx = out.filter((x2) => x2.ep === b.ep + 1 && x2.part === 'setup'), hd = nx.find((x2) => (x2.who || []).includes(J) && x2.rides.length < 2) || nx[0], rv = out.find((x2) => (x2.kind === 'reveal' || x2.kind === 'partial') && x2.crime === crime);
        if (hd) hd.rides.push(tagM(withTech({ id: `${b.id}d`, kind: 'doubt', part: 'setup', e: '🤨', rides: [], glue: false, act: hd.act, who: [J, e.x], c: { ...hd.c, x: nm(e.x), xE: en(e.x), w: 'Justin', wE: 'justin' }, defK: 0 }), T, 'doubt'));
        if (rv) tagM(rv, T, 'answer');
      } else {
        const hostS = out.slice(0, out.indexOf(b)).find((x2) => x2.kind === 'dshow' || x2.kind === 'expect') || hostQ;
        if (hostS) hostS.rides.push(part(`${b.id}s`, '🌱', `${nm(e.x)} (ou quelqu’un qui le connaît) glisse un détail, comme une blague`, `a detail about ${en(e.x)} slipped in like a joke, nobody picks it up (his answer will explain it)`, 'Seed & payoff · le seed', 'seed'));
        b.fr = `${b.fr} ; on lui demande devant tous : « ${Q} » ; sa réponse, inattendue, explique le détail glissé avant`; b.en = `${b.en}; in front of everyone someone asks him "${QE}"; his unexpected answer explains the detail slipped earlier (the seed pays off) and he takes back control`;
        tagM(b, T, 'answer');
      }
      b.answers = Q;
    }
    // the example's concrete words, when there are some for this beat
    const T2 = S.txt || {}; for (const b of out) for (const x of [b, ...b.rides]) if (T2[x.id]) { x.fr = T2[x.id][0]; x.en = T2[x.id][1]; x.concrete = 1; }
    out.threads = TH;
    return out;
  }
  // its technique: the one picked (a tap = the next), else its default
  // ---- one catalogue (03/11): an event that has a goal of Plan de scène takes its techniques from there (its leaves:
  // « La surprise de son pilier » gives its 8), with their sheets and moments; the others keep theirs (TQ). K = what the
  // event IS (fr, en) and which goals; def = its technique by default ----
  const K = {
    want: { g: ['desire'], def: 'Un rêve et sa raison', fr: (c) => `Justin veut ${c.w}`, en: (c) => `justin shows what he wants: ${c.wE}` },
    enter: { g: ['char'], def: (c) => (PILLARS.find((p) => p.id === c.px) ? ['Le chef reprend le contrôle', 'Le charmeur désarme', 'Le dangereux ne fait rien', 'Le génie règle tout', 'Le clown couvre une douleur', 'Le mystérieux répond à côté', 'L’outsider se relève', 'Le protecteur prend le coup'][PILLARS.findIndex((p) => p.id === c.px)] : 'Coincé devant tous, il s’en sort'), fr: (c) => `${c.x} arrive`, en: (c) => `${c.xE} arrives` },
    conflict: { g: ['stakes'], def: 'Show character positioning', fr: (c) => c.o, en: (c) => c.oE },
    liked: { g: ['stakes'], def: 'Show character positioning', fr: (c) => `${c.a} est adoré de tous`, en: (c) => `everyone loves ${c.aE}: justin is alone against them` },
    danger: { g: ['stakes'], def: 'Mention consequences', fr: (c) => c.dg || 'Un lieu dangereux à traverser', en: (c) => c.dgE || 'a dangerous place to cross' },
    easy: { g: ['stakes'], only: 'easy', fr: (c) => `Justin tente la facilité ; ça rate devant ${c.t}`, en: (c) => `justin tries the easy way; it fails in front of ${c.tE}` },
    gag: { g: ['stakes'], def: 'Aveu vulnérable', fr: (c) => `Justin apprend, seul : ${c.i}. Le dire réglerait tout, et coûterait trop`, en: (c) => `justin learns, alone, that ${c.iE}; telling it would settle everything and cost too much, so he keeps it (the others do not know)` },
    clock: { g: ['stakes'], def: 'Mention consequences', fr: (c) => c.dl || 'Il faut trancher maintenant', en: (c) => c.dlE || 'it must be decided now' },
    past: { g: ['rel', 'info'], def: 'Shared memory', fr: (c) => c.i, en: (c) => c.iE },
    seen: { g: ['callback'], def: 'Objet planté', fr: (c) => `${c.i} : vu, pas ouvert`, en: (c) => `${c.iE}: seen, not opened` },
    plant: { g: ['callback'], def: 'Seed & payoff (surprise)', fr: (c) => `Indice semé → ${c.i}`, en: (c) => `a hint, unnoticed (it will give away: ${c.iE})` },
    reveal: { g: ['info', 'callback'], def: 'Demande qui révèle', fr: (c) => c.i, en: (c) => `it comes out: ${c.iE}` },
    open: { g: ['info'], def: 'Demande qui révèle', fr: (c) => c.ox || `${c.i} : ouvert`, en: (c) => c.oxE || `${c.iE}: opened at last` },
    tie: { g: ['info', 'rel'], def: 'Shared memory', fr: (c) => c.tie || `On l’apprend en passant : ${c.i}`, en: (c) => c.tieE || `said in passing, as something everyone here knows: ${c.iE}` },
    tclue: { g: ['callback'], def: 'Seed & payoff (surprise)', fr: (c) => `Indice semé : ${c.cl} (→ ${c.i})`, en: (c) => `a hint, unnoticed, never explained: ${c.clE} (it will give away: ${c.iE})` },
    treveal: { g: ['info', 'callback'], def: 'Demande qui révèle', fr: (c) => `Ça sort : ${c.i}`, en: (c) => `it comes out, and changes how we see them: ${c.iE}` },
    twist: { g: ['callback'], def: 'Écho', fr: () => 'Tout prend un autre sens', en: () => 'everything seen before means something else' },
  };
  Object.assign(K, {
    hook: { g: ['char', 'rel', 'curiosity', 'stakes'], only: 'hook', fr: () => '…', en: () => '' },
    expect: { g: ['curiosity'], only: 'expect', def: 'Sa réputation', fr: (c) => `On parle ${de(c.x)}`, en: (c) => `the others talk about ${c.xE} before they appear` },
    tease: { g: ['curiosity'], only: 'tease', def: 'Dans cinq minutes', fr: (c) => `${c.x} arrive bientôt`, en: (c) => `${c.xE} is coming soon` },
    gone: { g: ['curiosity'], only: 'gone', def: 'Sort et ne revient pas', fr: (c) => `${c.x} disparaît`, en: (c) => `${c.xE} disappears` },
    end: { g: ['curiosity'], only: 'end', def: 'Qui, quand, où', fr: () => 'La fin promet la suite', en: () => 'the last line promises what comes next' },
    cost: { g: ['conseq'], only: 'cost', def: 'Chaise vide', fr: () => 'Ce que ça a coûté', en: () => 'what it cost' },
    stake: { g: ['stakes'], fr: (c) => c.st, en: (c) => c.stE },
    dshow: { g: ['desire', 'rel'], def: (c) => (c.dk === 'protect' ? 'Show care' : c.dk === 'love' ? 'Un rêve et sa raison' : 'Direct confession'), fr: (c) => c.show, en: (c) => c.showE },
    crime: { g: ['info', 'curiosity'], only: null, def: 'Demande qui révèle', fr: (c) => c.cr, en: (c) => c.crE },
    react: { g: ['char'], def: 'Show contrast', fr: (c) => c.rx, en: (c) => c.rxE },
  });
  // the moves of a thread that need their own words (fils.js: their forms are techniques of Plan de scène, one flag each)
  const TXT = { fr: (c) => c.tx || '', en: (c) => c.txE || '' };
  Object.assign(K, {
    alive: { g: ['rel', 'char'], def: 'Show care', fr: (c) => `${c.v} est là, bien vivant·e : un moment avec ${c.w}`, en: (c) => `${c.vE} is here, alive and well: a warm moment with ${c.wE} (we get attached before the loss)` },
    theory: { g: ['curiosity'], only: 'theory', ...TXT }, clue: { g: ['curiosity'], only: 'clue', ...TXT }, false: { g: ['curiosity'], only: 'false', ...TXT }, lost: { g: ['curiosity'], only: 'lost', ...TXT },
    block: { g: ['stakes'], only: 'block', ...TXT }, doubt: { g: ['curiosity'], only: 'doubt', ...TXT }, narrow: { g: ['curiosity'], only: 'narrow', ...TXT }, remind: { g: ['curiosity'], only: 'remind', ...TXT },
    partial: { g: ['info'], only: 'partial', ...TXT }, announce: { g: ['curiosity'], only: 'announce', ...TXT }, approach: { g: ['stakes'], only: 'approach', ...TXT }, cross: { g: ['stakes'], only: 'cross', ...TXT },
    close: { g: ['conseq'], only: 'close', ...TXT }, found: { g: ['info'], only: 'found', ...TXT },
  });
  // the concrete way a technique plays here (its words, with the people): the ones Créer knew before (TQ), by name
  const CT = {}; for (const kd of ['hook', 'expect', 'tease', 'gone', 'cost', 'end']) for (const [n, , fr, en2] of TQ[kd]) CT[n] = [fr, en2];
  if (window.FILS) { FILS.install(); Object.assign(CT, FILS.CT); }
  const SPECIAL = ['hook', 'expect', 'tease', 'gone', 'end', 'cost', 'conseq', ...(window.FILS ? FILS.FLAGS : [])];
  const leaves = (list) => (list || []).flatMap((t) => (t.s && t.s.length ? leaves(t.s) : [t]));
  // the ways an event can be done: [{ n, d, g, ex, need, see, give, parts, carrier }]
  function optsOf(ev) {
    const k = K[ev.kind], GS = (window.PLAN && PLAN.GOALS) || [];
    if (k && GS.length) { const L2 = k.g.flatMap((g) => { const G2 = GS.find((x) => x.id === g); return G2 ? leaves(G2.tech).map((t) => ({ ...t, g })) : []; }).filter((t) => (k.only ? t[k.only] : !SPECIAL.some((f) => t[f]))); if (L2.length) return L2; }
    return (TQ[ev.kind] || []).map(([n, g]) => ({ n, g, d: '' }));
  }
  function withTech(ev) {
    if (ev.kind === 'choice' || ev.kind === 'pick') return { ...ev, k: 0, n: 'Choix', g: '', tech: null, fr: ev.fr || (ev.kind === 'pick' ? `${ev.c.t} ou ${ev.c.d}` : ''), en: ev.en || (ev.kind === 'pick' ? `${ev.c.tE} or ${ev.c.dE}, each side painful to lose` : 'two outcomes the player reads before tapping') };
    const list = optsOf(ev), k0 = K[ev.kind], defN = k0 && (typeof (ev.defN || k0.def) === 'function' ? k0.def(ev.c) : ev.defN || k0.def);
    if (!list.length) return { ...ev, k: 0, n: '', g: '', tech: null, fr: ev.fr || (k0 ? k0.fr(ev.c) : ''), en: ev.en || (k0 ? k0.en(ev.c) : '') };
    const def = ev.defK != null ? ev.defK : Math.max(0, list.findIndex((t) => t.n === defN));
    const k = ((S.tq[ev.id] ?? def) % list.length + list.length) % list.length, t = list[k];
    if (k0 && window.PLAN) return { ...ev, k, n: t.n, g: t.g, tech: t, fr: CT[t.n] ? CT[t.n][0](ev.c) : k0.fr(ev.c), en: CT[t.n] ? CT[t.n][1](ev.c) : `${k0.en(ev.c)}; done with "${t.n}": ${t.d}` };
    const [, , fr, enF] = TQ[ev.kind][k];
    return { ...ev, k, n: t.n, g: t.g, tech: t, fr: fr(ev.c), en: enF(ev.c) };
  }

  // the automatic cuts: where the braid changes episode (moved by hand: ✂)
  function autoCuts(L) { const cuts = []; for (let i = 0; i < L.length - 1; i++) if (L[i].ep !== L[i + 1].ep) cuts.push(i); return cuts; }
  const sigOf = (L) => L.map((x) => x.id).join(',');
  const cutsOf = (L) => (S.cut && S.cut.sig === sigOf(L) ? S.cut.at.filter((i) => i < L.length - 1) : autoCuts(L));
  // the links between beats: donc (a consequence), mais (an obstacle), soudain (a surprise), pendant ce temps (another line)
  const LK = { donc: ['donc', 'So'], mais: ['mais', 'But'], soudain: ['soudain', 'Suddenly'], pendant: ['pendant ce temps', 'Meanwhile'] };
  const BUT = new Set(['stake', 'conflict', 'liked', 'danger', 'easy', 'gag', 'clock', 'pick']);
  const link = (ev) => LK[ev.lk] || (BUT.has(ev.kind) ? LK.mais : LK.donc);
  const act = (d) => cap(DK[d.k].act(tName(d))), hurt = (d) => DK[d.k].hurt(nm(d.who), tName(d)), hurtE = (d) => DK[d.k].hurtE(en(d.who), tNameE(d));
  const raise = (d) => DK[d.k].raise(nm(d.who), tName(d)), raiseE = (d) => DK[d.k].raiseE(en(d.who), tNameE(d));
  // an episode's choice: one of Justin's lines at work in it against another desire of his (the climax's two first: they
  // are kept in mind all act long); each option serves one desire and hurts the other
  let pairsUsed = [];
  // w = the world at the end of this episode: { hap (the events so far), out (who is dead or gone) }
  function chooseFor(list, n, st, seen, w) {
    const { D, PL, X } = st, r = roles(st), key = (a, b) => [a.id, b.id].sort().join('+');
    const jd = D.filter((d) => d.who === J && !d.dead && !d.late && !(w.closed && w.closed.has(d.id)) && (!d.from || w.hap.has(d.from)) && !(d.t && w.out.has(d.t) && d.k !== 'find' && d.k !== 'justice'));
    const lifeW = (who) => lifeIn([...w.hap], who);
    const opened = list.filter((e) => e.kind === 'dshow' && e.line).map((e) => e.line), lines = [...new Set([...opened, ...list.map((e) => e.line).filter(Boolean)])];
    const acts = lines.map((id2) => PL.find((p) => p.id === id2)).filter((p) => p && p.main).map((p) => jd.find((d) => d.id === p.d.id)).filter(Boolean);
    const cands = [...acts, ...X.filter(Boolean).map((d) => jd.find((x) => x.id === d.id)).filter(Boolean), ...jd.filter((d) => d.s >= 2)];
    let d1 = cands[0] || jd[0]; if (!d1) return [null, null];
    // a desire is in the story once a beat so far names its target (Melissa, once she's hunting the thief)
    const named = (d) => !d.t || seen.some((b) => [b.fr, b.c && b.c.o, b.c && b.c.cr, b.c && b.c.show].filter(Boolean).some((t2) => String(t2).includes(nm(d.t))));
    const shown = (d) => seen.some((b) => b.line === d.id || (b.desires || []).some((x) => x.id === d.id)), told = (d) => (PL.some((p) => p.id === d.id) || d.from ? shown(d) : named(d));
    const inX = (d) => X.some((x) => x && x.id === d.id);
    const score = (d) => (inX(d) ? 3 : 0) + (d.k === 'respect' && S.hard.liked && r.against ? 2 : 0) + (d.k === 'alive' && lifeW(d.who) ? 2 : 0) + (d.k === 'protect' ? 1 : 0) + d.s / 10 - (told(d) ? 0 : 10);
    const pair = (a, b) => a !== b && !sameSide(a, b) && !(a.k === b.k && a.t === b.t) && !(b.k === 'alive' && !lifeW(b.who)) && !(a.k === 'alive' && !lifeW(a.who));
    const fresh = (a) => jd.some((d) => pair(a, d) && !pairsUsed.includes(key(a, d)) && told(d));
    d1 = cands.find(fresh) || d1;
    const others = jd.filter((d) => pair(d1, d)).sort((a, b) => score(b) - score(a)), d2 = others.find((d) => !pairsUsed.includes(key(d1, d))) || others[0];
    if (!d2) return [d1, null]; pairsUsed.push(key(d1, d2));
    return [d1, d2];
  }
  // what a beat does for the story, in 4 kinds: eng (engaged in whom, by which technique), cur (a question opened), stake
  // (a desire weighs more / an obstacle), moved (what changed). [fr, en] each
  function gives(ev) {
    const c = ev.c, g = {}, k = ev.kind;
    const add = (key, fr, en2) => { (g[key] = g[key] || []).push([fr, en2]); };
    if (k === 'dshow') add('eng', `${c.show} : ${ev.n.toLowerCase()}`, `${c.showE}, shown by: ${ev.n}`);
    if (k === 'enter') { const pl = P[c.px] || {}; add('eng', `${c.x}, ${(pl.n || '').replace(/^L[ea’] ?/, '')} : ${ev.n.toLowerCase()}`, `${c.xE} as ${(pl.en || '').split(' (')[0]}`); add('moved', `${c.x} arrive`, `${c.xE} arrives`); }
    if (k === 'gone') { add('cur', `Où est ${c.x} ?`, `where is ${c.xE}?`); add('moved', `${c.x} disparaît`, `${c.xE} disappears`); }
    if (k === 'crime') { add('moved', c.cr, c.crE); if (/qui a fait/.test(c.cr)) add('cur', 'Qui a fait ça ?', 'who did it?'); }
    if (k === 'expect') add('cur', `Qui est ${c.x} ?`, `who is ${c.xE}?`);
    if (k === 'tease') add('cur', `${c.x} arrive : que va-t-il faire ?`, `${c.xE} is coming: what will they do?`);
    if (k === 'hook') { const h = ['Entrée qui fait taire', 'Place vide', 'Un nom chuchoté', 'Lettre cachée', 'Avant d’entrer', 'Taquinerie de trop'].indexOf(ev.n);
      if (h === 0) add('eng', `${c.t}, attirance : entrée qui fait taire`, `${c.tE}, attraction`); if (h === 5) add('eng', `Justin × ${c.t}, attirance`, `justin and ${c.tE}, attraction`);
      if (h === 1) add('cur', 'Qui manque ?', 'who is missing?'); if (h === 2) add('cur', 'Qui arrive ce soir ?', 'who arrives tonight?'); if (h === 3) add('cur', 'Que dit la lettre ?', 'what does the letter say?'); if (h === 4) add('stake', 'Une entrée que tout le monde redoute', 'an entrance everyone dreads'); }
    if (k === 'conflict') add('stake', c.o, c.oE);
    if (k === 'part' && ev.e === '❓') add('cur', c.q, ev.en);
    if (k === 'past') { add('eng', `Leur lien : ${ev.n.toLowerCase()}`, `their bond: ${ev.n}`); add('moved', `Révélé : ${c.i}`, `revealed: ${c.iE}`); }
    if (k === 'seen') add('cur', `Qu’y a-t-il dans ${c.i.replace(/^(Une|Un|La|Le) /, (m) => m.toLowerCase())} ?`, `what is in ${c.iE}?`);
    if (k === 'liked') add('stake', `${c.a}, adoré de tous : Justin seul contre lui`, `${c.aE}, loved by everyone: justin alone against them`);
    if (k === 'danger') add('stake', c.dg || 'Un lieu dangereux à traverser', c.dgE || 'a dangerous place to cross');
    if (k === 'easy') { add('moved', 'L’effort facile de Justin rate', 'justin\'s easy way fails'); }
    if (k === 'gag') add('stake', `Le secret ${de(c.s)} le tient`, `${c.sE}'s secret binds him`);
    if (k === 'reveal' || k === 'open') add('moved', `Révélé : ${c.i}`, `revealed: ${c.iE}`);
    if (k === 'clock') add('stake', 'Le temps : trancher maintenant', 'time: it must be decided now');
    if (k === 'stake') add('stake', ev.fr || c.st, ev.en || c.stE);
    if (k === 'choice') { const pk2 = S.picked[ev.id]; add('moved', pk2 != null ? `Choix : ${ev.opts[pk2][0]}` : `Choix : ${ev.opts[0][0]} ou ${ev.opts[1][0]}`, pk2 != null ? `chose: ${ev.opts[pk2][0]}` : `a choice: ${ev.opts[0][0]} or ${ev.opts[1][0]}`); }
    if (k === 'conseq' && c.picked) add('moved', ev.fr, ev.en);
    if (k === 'pick') add('moved', `Climax : ${ev.fr}`, ev.en);
    if (k === 'cost') add('moved', 'Ce que le choix a coûté', 'what the choice cost');
    if (k === 'alive') add('eng', `${c.v}, qu’on va perdre : ${String(ev.n).toLowerCase()}`, `${c.vE}, whom we are about to lose`);
    if (k === 'theory' || k === 'false' || k === 'lost' || k === 'doubt' || k === 'narrow') add('cur', ev.fr, ev.en);
    if (k === 'clue') add('cur', `Un indice : ${String(ev.n).toLowerCase()}`, `a clue: ${ev.n}`);
    if (k === 'block' || k === 'approach') add('stake', ev.fr, ev.en);
    if (k === 'announce') add('cur', `Annoncé : ${ev.fr}`, `announced: ${ev.en}`);
    if (k === 'partial' || k === 'found') add('moved', ev.fr, ev.en);
    if (k === 'partial') add('cur', `Pourquoi ${c.x} a fait ça ?`, `why did ${c.xE} do it?`);
    if (k === 'cross' || k === 'close') add('moved', ev.fr, ev.en);
    return g;
  }
  const LED = [['eng', '❤️', 'Engagé dans les persos et les liens : quoi, et par quelle technique'], ['cur', '❓', 'Curiosité : les questions ouvertes'],
    ['stake', '⚔️', 'Enjeux : un désir pèse plus, ou un obstacle s’ajoute'], ['moved', '➡️', 'L’histoire avance : ce qui a changé']];
  // a desire that weighs more, at its level (the climb: 1, 2, 3), in the world of the moment: the one it is about is gone
  // (only what is left of them can speak), or a life is at stake
  const stakeText = (d, lv, w) => { const R2 = window.FILS && FILS.RAISE, W1 = [nm(d.who), tName(d)], WE = [en(d.who), tNameE(d)]; if (!R2) return [raise(d), raiseE(d)];
    const G = graph(); if (d.k === 'hide' && G.vil && G.fig && d.who === G.vil.x) { const R = G.fig, a = nm(d.who), aE = en(d.who);
      return [[`On dit que ${R.n} demande après quelqu’un qui ressemble à ${a}`, `word is ${R.nE} is asking about someone who looks like ${aE}`], [`${cap(R.n)} fait demander le nom ${de(a)}`, `${R.nE} has someone ask for ${aE}'s name`], [`${cap(R.n)} sait que ${a} est ici`, `${R.nE} knows ${aE} is here`]][Math.min(2, lv)]; }
    // a desire tied to a fact: the step names it (what Isa owes the ferryman, the ferryman in town, the gambling debt said out loud)
    if (G.fig) { const R = G.fig, a = nm(d.who), aE = en(d.who), t = d.t && nm(d.t), tE = d.t && en(d.t);
      if (d.k === 'love' && lv === 1 && d.t && G.need === d.t) return [`${t} confie à ${a} ce que ça lui coûte : ${low1(R.need(t))}`, `${tE} tells ${aE} what it costs them: ${R.needE(tE)}`];
      if (d.k === 'alive' && G.vil && d.who === G.vil.x) return [[`${cap(R.n)} est en ville ; quelqu’un lui a donné un nom`, `${R.nE} is in town; someone gave him a name`], [`${cap(R.n)} a fait demander où dort ${a}`, `${R.nE} had someone ask where ${aE} sleeps`], [`${cap(R.n)} attend dehors`, `${R.nE} is waiting outside`]][Math.min(2, lv)];
    }
    { const mk3 = d.k === 'respect' && w.rev && [...w.rev].find((i) => i.x === d.who && IN[i.id] && IN[i.id].k === 'mask'); if (mk3 && !(G.vil && G.vil === mk3)) { const a = nm(d.who), aE = en(d.who);
      return [[`On sait qui est vraiment ${a} ; on le lui fait sentir devant tous`, `everyone knows who ${aE} really is now, and makes him feel it in front of everyone`], [`Plus personne ne veut s’asseoir à côté ${de(a)}`, `nobody wants to sit next to ${aE} anymore`], [`On lui ferme la porte : ${low1(IN[mk3.id].fr(a, nm(mk3.y)))}, et tout le monde le sait`, `doors close on ${aE}: everyone knows that ${IN[mk3.id].en(aE, en(mk3.y))}`]][Math.min(2, lv)]; } }
    if (G.fig) { const R = G.fig, a = nm(d.who), aE = en(d.who);
      if (d.k === 'respect' && G.vil && d.who === G.vil.x && w.rev && w.rev.has(G.vil)) return [[`On parle de la dette ${de(a)} devant tous : ${R.wanted}`, `${aE}'s debt is talked about in front of everyone: ${R.wantedE}`], [`On rappelle à ${a}, devant la personne qui compte, ce qu’il doit ${R.dat}`, `${aE} is reminded, in front of the one who matters, of what he owes ${R.nE}`], [`Plus personne ne prête un sou à ${a}`, `nobody lends ${aE} a coin anymore`]][Math.min(2, lv)]; }
    if (d.t && w.out.get(d.t) === 'gone' && R2.away[d.k]) return [R2.away[d.k][0](...W1), R2.away[d.k][1](...WE)];
    const set = (d.k === 'protect' && lifeIn([...w.hap], d.t) ? R2.danger : R2[d.k]) || R2.respect, L = set[Math.min(set.length - 1, lv)]; return [L[0](...W1), L[1](...WE)]; };
  // the threads with their steps in the story's order: steps [{ mv, ep, act, id (the beat or what rides), host, fr }],
  // done (it ended), from / to (its first and last episode)
  function threadsOf(EPS, TH) {
    const MVD = (window.FILS && FILS.MV) || {}, out = TH.map((t) => ({ ...t, steps: [] })), by = Object.fromEntries(out.map((t) => [t.id, t]));
    EPS.forEach(({ list }, n) => list.forEach((b, k) => { for (const z of [b, ...(b.rides || [])]) for (const [tid, mv] of z.mv || []) if (by[tid]) by[tid].steps.push({ mv, ep: n, act: b.act || 1, id: z.id, host: b.id, at: k, e: z.e, fr: z.choice ? z.opts.map((o) => o[0]).join(' / ') : z.fr }); }));
    for (const t of out) { const end = t.steps.findIndex((x) => (MVD[x.mv] || [])[3] === 'close'); t.done = end >= 0; t.from = t.steps.length ? t.steps[0].ep : -1; t.to = end >= 0 ? t.steps[end].ep : EPS.length - 1; }
    const rank = (t) => (t.kind === 'line' ? (t.main ? 0 : 1) : t.kind === 'q' ? 2 : t.kind === 'promise' ? 3 : t.kind === 'seed' ? 4 : 5);
    return out.filter((t) => t.steps.length).sort((x, y) => rank(x) - rank(y) || x.from - y.from);
  }
  function episodes() {
    const L = line(), TH = L.threads || [], cuts = cutsOf(L), eps = []; let cur = [];
    L.forEach((ev, i) => { cur.push({ ...ev, i }); if (cuts.includes(i)) { eps.push(cur); cur = []; } }); if (cur.length) eps.push(cur);
    const ST = [null, storyAt(1), ACTS() === 2 ? storyAt(2) : null], W = { hap: new Set(), out: new Map(), closed: new Set(), rev: new Set() }, lvl = {};
    let ch = 0, prev = null; const built = []; pairsUsed = [];
    const tg = (b, tid, mv) => { if (tid) (b.mv = b.mv || []).push([tid, mv]); return b; }, lineId = (d) => (d && TH.some((t) => t.id === `L:${d.id}`) ? `L:${d.id}` : null), CH = TH.some((t) => t.id === 'C:all') ? 'C:all' : null;
    // the world moves with the beats: an event has happened, someone is dead or gone, someone is found
    SHOWN = new Set();
    const pass = (b) => { if ((b.kind === 'reveal' || b.kind === 'partial') && b.crime) SHOWN.add(b.crime.x); if (b.kind === 'reveal' && b.info) W.rev.add(b.info); if (b.kind === 'pick' && b.act === 1 && ACTS() === 2) { const AS = actState(); for (const t of AS.kill) W.out.set(t, 'dead'); for (const t of AS.gone) W.out.set(t, 'gone'); } for (const [t, m] of b.mv || []) if (t.startsWith('L:')) { if (m === 'close') W.closed.add(t.slice(2)); else if (m === 'want') W.closed.delete(t.slice(2)); } if (b.ev) { W.hap.add(b.ev); if (b.ev.k === 'murder' && b.ev.v && live(b.ev.v)) W.out.set(b.ev.v, 'dead'); if (b.ev.k === 'gone') W.out.set(b.ev.x, 'gone'); } if (b.kind === 'found') for (const [k, v] of [...W.out]) if (v === 'gone') W.out.delete(k); };
    const setStake = (b, sfx = ['', '']) => { const d = b.desires && b.desires[0]; if (!d || b.fixed) return b; lvl[d.id] = (lvl[d.id] || 0) + 1; if (b.concrete) return b;
      const [fr, en2] = stakeText(d, lvl[d.id] - 1, W); b.c = { ...b.c, st: cap(fr) + sfx[0], stE: en2 + sfx[1] }; b.fr = b.c.st; b.en = `${b.c.stE}${b.tech ? `; done with "${b.n}": ${b.tech.d}` : ''}`; return b; };
    const qTag = (b, d) => { const e = d.from, T = e && TH.find((t) => t.ev === e && (t.kind === 'q' ? (d.k === 'find' || d.k === 'justice') : t.kind === 'promise')); return T ? tg(b, T.id, T.kind === 'promise' ? 'approach' : 'clue') : b; };
    const back = (d) => d.k === 'find' && d.from && W.hap.has(d.from) && !W.out.has(d.t), hurtW = (d) => (back(d) ? `${nm(d.t)} repart, cette fois pour de bon` : hurt(d)), hurtWE = (d) => (back(d) ? `${en(d.t)} leaves again, for good this time` : hurtE(d));
    const T2 = S.txt || {}, words = (x) => { if (T2[x.id] && !x.concrete) { x.fr = T2[x.id][0]; x.en = T2[x.id][1]; x.concrete = 1; } return x; };
    const EPS = eps.map((evs2, n) => { const has = (p) => evs2.some((x) => x.part === p), a = (evs2[0] && evs2[0].act) || 1, st = ST[a] || ST[1];
      const stage = has('crisis') ? 3 : has('end') && !has('setup') && !has('reveal') ? 4 : has('reveal') ? 2 : n === 0 ? 0 : 1;
      const list = evs2.slice();
      for (const b of list) { pass(b); if (b.kind === 'stake') setStake(b); for (const rd of b.rides || []) if (rd.kind === 'stake') setStake(rd); }
      // what the last choice caused opens this episode (the climax's: it opens the next act)
      if (prev && !(prev.kind === 'pick' && prev.act === a)) { const pk2 = S.picked[prev.id], o = prev.cq || prev.opts;
        const fr = pk2 != null ? o[pk2][1] : `Si « ${o[0][0]} » : ${o[0][1]} · Si « ${o[1][0]} » : ${o[1][1]}`;
        const en2 = pk2 != null ? `because justin chose "${o[pk2][0]}": ${o[pk2][2]}` : `depending on the last choice: if "${o[0][0]}", ${o[0][2]}; if "${o[1][0]}", ${o[1][2]}`;
        if (pk2 != null) built.push([`« ${o[pk2][0]} »`, o[pk2][0]]);
        list.unshift(tg({ id: `cq${n}`, kind: 'conseq', part: 'setup', e: '↪️', lk: 'donc', who: [J], act: a, fr, en: en2, n: 'La conséquence, tout de suite', g: 'conseq', k: 0, rides: [], c: { picked: pk2 != null } }, CH, 'conseq')); prev = null; }
      // the climax: each side weighs, right before (it hurts the other desire)
      const pick = list.find((x) => x.kind === 'pick');
      if (pick && pick.climax && pick.climax[0] && pick.climax[1]) { const [ca, cb] = pick.climax, at2 = list.indexOf(pick);
        const fateW = (d) => { const f = fateFor(d, a); return f ? [f.fr, f.en] : [hurtW(d), hurtWE(d)]; };
        if (built.length) { pick.en += `; what his earlier choices built weighs on it (${built.map((b) => b[1]).join(', ')})`; pick.built = built.map((b) => b[0]); }
        const side = (i, dA, dB, defN) => tg(withTech({ id: `${pick.id}${'ab'[i]}`, kind: 'stake', part: 'crisis', e: ['🅰️', '🅱️'][i], lk: 'mais', defN, choiceOf: pick.id, fixed: 1, act: a, rides: [], who: [J, dA.t].filter(Boolean), desires: [dA],
          c: { st: `Si ${lab(dA)} : ${fateW(dB)[0]}`, stE: `if he chooses ${labE(dA)}: ${fateW(dB)[1]} (for good: it cannot be undone)` } }), lineId(dA), 'raise');
        list.splice(at2, 0, side(0, ca, cb, 'Aveu vulnérable'), side(1, cb, ca, 'Menace : si tu X, je Y'));
        pick.cq = [[pick.opts[0], cap(fateW(cb)[0]), fateW(cb)[1]], [pick.opts[1], cap(fateW(ca)[0]), fateW(ca)[1]]]; prev = pick;
        const fo = forcer(a); if (fo && !pick.forced) { pick.forced = fo; pick.fr = `${nm(fo)} force Justin à choisir : ${pick.fr}`; pick.en = `${en(fo)} forces justin to choose, now: ${pick.en}`; } }
      if (!has('crisis') && !has('end')) { ch++;
        const [d1, d2] = chooseFor(evs2, n, st, eps.slice(0, n + 1).flat(), W);
        if (d1 && d2) {
          const opts = [[act(d1), cap(hurt(d2)), hurtE(d2)], [act(d2), cap(hurt(d1)), hurtE(d1)]];
          const chEv = withTech({ id: `ch${ch}`, kind: 'choice', part: 'choice', e: '⚖️', choice: 1, c: {}, rides: [], opts, desires: [d1, d2], lk: 'donc', act: a, who: [J, d1.t, d2.t].filter(Boolean) });
          chEv.fr = `${opts[0][0]} / ${opts[1][0]}`; chEv.en = `"${opts[0][0]}" (then ${opts[0][2]}) or "${opts[1][0]}" (then ${opts[1][2]}): ${labE(d1)} against ${labE(d2)}`;
          tg(chEv, CH, 'choice'); for (const d of [d1, d2]) tg(chEv, lineId(d), 'choice');
          // raise stakes on the two desires the choice opposes: the more both weigh, the stronger the choice. A raise of
          // that desire already in the episode is its stake: it moves right before the choice
          const sides = [d1, d2].map((d, i) => { const old = list.find((b) => b.kind === 'stake' && b.desires && b.desires[0] && b.desires[0].id === d.id && !b.choiceOf);
            if (old) { list.splice(list.indexOf(old), 1); return { ...old, e: ['🅰️', '🅱️'][i], choiceOf: chEv.id, lk: 'mais' }; }
            return qTag(tg(setStake(words(withTech({ id: `${chEv.id}${'ab'[i]}`, kind: 'stake', part: 'setup', e: ['🅰️', '🅱️'][i], lk: 'mais', defN: i ? 'Menace : si tu X, je Y' : 'Show character positioning', choiceOf: chEv.id, act: a, rides: [], who: [d.who, d.t].filter(Boolean), desires: [d], c: {} })),
              [` (${lab(d)})`, ` (${labE(d)} weighs more, right before the choice)`]), lineId(d), 'raise'), d); });
          list.push(...sides, chEv); prev = chEv; } }
      for (const x of list) { words(x); if (x.choice && S.opt && S.opt[x.id]) { x.opts = S.opt[x.id]; x.fr = x.opts.map((o) => o[0]).join(' / '); x.en = `"${x.opts[0][0]}" (then ${x.opts[0][2]}) or "${x.opts[1][0]}" (then ${x.opts[1][2]})`; } }
      return { list, stage, act: a }; });
    SHOWN = null;
    // a payoff never comes cold: a thread nobody touched in the episode before it ends gets one line there (a seed comes
    // back in another shape), one per beat at most
    const MVD = (window.FILS && FILS.MV) || {};
    for (const T of threadsOf(EPS, TH).filter((t) => ['q', 'promise', 'seed'].includes(t.kind) && t.done)) { const endAt = T.steps.findIndex((x) => (MVD[x.mv] || [])[3] === 'close'); if (endAt < 1 || T.steps[endAt].ep - T.steps[endAt - 1].ep < 2) continue;
      const hosts = EPS[T.steps[endAt].ep - 1].list.filter((b) => b.part === 'setup' && !['hook', 'conseq'].includes(b.kind) && !b.choice && !b.choiceOf), free = (b) => b.rides.length < 2 && !b.rides.some((r) => r.kind === 'remind' || r.again);
      const h = hosts.find((b) => free(b) && (b.who || []).some((w) => (T.who || []).includes(w))) || hosts.find(free); if (!h) continue;
      const rd = T.kind === 'seed' && T.info ? { id: `re:${T.id}`, kind: 'plant', part: 'setup', e: '🌱', c: { ...h.c, i: infoFr(T.info), iE: infoEn(T.info), s: nm(T.info.x), sE: en(T.info.x) }, info: T.info, hint: true, again: 1, who: [T.info.x] }
        : { id: `re:${T.id}`, kind: 'remind', part: 'setup', e: '🔔', c: { ...h.c, q: T.fr, qE: T.en }, who: T.who, defK: vary(`re:${T.id}`, 3) };
      h.rides.push(words(tg(withTech({ glue: false, rides: [], act: h.act, ...rd }), T.id, T.kind === 'seed' ? 'seed' : 'remind'))); }
    for (const E of EPS) { E.led = { eng: [], cur: [], stake: [], moved: [] };
      for (const ev of E.list) for (const e3 of [ev, ...(ev.rides || [])]) { const g = gives(e3); for (const [key] of LED) if (g[key]) E.led[key].push(...g[key].map((x) => [...x, e3])); } }
    EPS.threads = threadsOf(EPS, TH);
    return EPS;
  }
  const events = () => episodes().map((x) => x.list);
  const allEv = () => events().flat().flatMap((ev) => [ev, ...(ev.rides || [])]);
  const chOpts = () => { const r = roles(); return [`Aller vers ${nm(r.target)}`, `Garder ${nm(r.b)}`]; };
  // an event as the prompts say it: its link (So / But / Suddenly / Meanwhile) and its cause, then what happens
  const evEn = (ev, i) => `${i ? `${link(ev)[1]}${ev.cause ? ` (because ${ev.cause[1]})` : ''}, ` : ''}${ev.kind === 'enter' || ev.kind === 'gone' || (ev.kind === 'crime' && ev.id === 'inc') ? 'INCITING INCIDENT: ' : ev.kind === 'pick' ? 'the climax, the last choice of the act: ' : ev.kind === 'choice' ? 'the main choice of the episode, its last: ' : ev.kind === 'conseq' ? 'what the last choice caused: ' : ''}${ev.en}.`;

  // ---- ⓘ the details of a technique: where it comes from (objective › general way › tactic, the chain changes from one
  // to another), its instructions and its example (empty for now: Justin will fill them), the other ways. [label, id of
  // its card in Techniques (techniques.js), or null] ----
  const PATHS = {
    hook: { base: [['Les premières secondes', 'hookSeconds']], by: [[['Attirance', 'sexDrive']], [['Où est X ?', 'whereIsX']], [['Qui est X ?', 'whoIsX']], [['Qu’y a-t-il dans X ?', 'whatIsInX']], [['Le stress avant l’entrée', 'stakesBefore']], [['Attirance', 'sexDrive']]] },
    want: { base: [['Expose desire', 'desire']], by: [[['Direct confession', 'directConfession']], [['Phrase pas finie', null]], [['Direct confession', 'directConfession']]] },
    expect: { base: [['Présenter un perso (3 temps)', 'introChar'], ['Créer l’attente', 'setExpect']] },
    tease: { base: [['Présenter un perso (3 temps)', 'introChar'], ['Teaser l’arrivée', 'teaseArrival']] },
    enter: { base: [['Create char engagingness', 'charEngaging'], ['Piliers et archétypes', 'pillars'], ['La surprise de son pilier', 'pillarSurprise']] },
    gone: { base: [['L’élément déclencheur', 'inciting'], ['Où est X ?', 'whereIsX']] },
    conflict: { base: [['Conflicting desire / goals', 'conflictingDesire']], by: [[['Character positioning', 'positioning']], [['Threat', 'threat']], [['Show contrast', null]], [['Direct confession / threat', 'directConfession']]] },
    past: { base: [['Create relationship engagingness', 'relEngaging']], by: [[['Shared memory', 'sharedMemory']], [['Tell a story', 'tellStory']], [['Show camaraderie', 'camaraderie']]] },
    seen: { base: [['Create curiosity', 'curiosity'], ['Qu’y a-t-il dans X ?', 'whatIsInX']] },
    plant: { base: [['Le détail qui retourne tout', 'nameDrop'], ['Motifs', 'motifs']] },
    liked: { base: [['Antagonist', 'antagonist'], ['Complications', 'complication']] },
    danger: { base: [['Complications', 'complication'], ['Threat', 'threat']] },
    easy: { base: [['Complications', 'complication'], ['Near-successes', 'nearSuccess']] },
    gag: { base: [['Raise stakes', 'raiseStakes'], ['Sacrifice', 'sacrifice']] },
    reveal: { base: [['Betrayals, reveals, twists', 'twist'], ['Le détail qui retourne tout', 'nameDrop']] },
    open: { base: [['Create curiosity', 'curiosity'], ['Open loop', 'openLoop']] },
    twist: { base: [['Motifs', 'motifs']] },
    clock: { base: [['Clock ticking', 'clock']] },
    pick: { base: [['Impossible choice', 'impossibleChoice']], by: [[['Conflicting desire / goals', 'conflictingDesire']], [['Threat', 'threat']], [['Stakes by relationship', 'stakesRel']]] },
    choice: { base: [['Impossible choice', 'impossibleChoice']], by: [[['Show relational consequence', 'relConsequence']], [['Threat', 'threat']], [['Direct confession / threat', 'directConfession']]] },
    conseq: { base: [['Show consequences', 'showConsequences']] },
    stake: { base: [['Raise stakes', 'raiseStakes'], ['Impossible choice', 'impossibleChoice']], by: [] },
    dshow: { base: [['Expose desire', 'desire']] },
    crime: { base: [['L’élément déclencheur', 'inciting'], ['Betrayals, reveals, twists', 'twist']] },
    cost: { base: [['Show painful consequences', 'painfulConsequences']] },
    end: { base: [['Open loop', 'openLoop']] },
    theory: { base: [['Create curiosity', 'curiosity'], ['Open loop', 'openLoop']] }, clue: { base: [['Create curiosity', 'curiosity'], ['Open loop', 'openLoop']] }, false: { base: [['Betrayals, reveals, twists', 'twist'], ['Open loop', 'openLoop']] },
    lost: { base: [['Create curiosity', 'curiosity'], ['Où est X ?', 'whereIsX']] }, doubt: { base: [['Open loop', 'openLoop']] }, narrow: { base: [['Open loop', 'openLoop']] }, remind: { base: [['Open loop', 'openLoop']] },
    block: { base: [['Complications', 'complication'], ['Near-successes', 'nearSuccess']] }, approach: { base: [['Clock ticking', 'clock']] }, announce: { base: [['Create curiosity', 'curiosity'], ['Teaser l’arrivée', 'teaseArrival']] },
    partial: { base: [['Betrayals, reveals, twists', 'twist']] }, found: { base: [['Betrayals, reveals, twists', 'twist']] }, cross: { base: [['Complications', 'complication']] }, close: { base: [['Show consequences', 'showConsequences']] },
    alive: { base: [['Create relationship engagingness', 'relEngaging']] },
  };
  // instructions and example of each technique, by « kind:index »: empty for now
  const DETAIL = {};
  let detEl = null;
  function details(ev) {
    const pth = PATHS[ev.kind] || { base: [] }, chain = [...pth.base, ...((pth.by && pth.by[ev.k]) || [])], d = DETAIL[`${ev.kind}:${ev.k}`] || {};
    if (!detEl) { detEl = document.createElement('div'); detEl.className = 'fDet'; document.body.appendChild(detEl);
      detEl.onclick = (e) => { const b = e.target.closest('button'); if (!b) return; e.stopPropagation();
        if (b.dataset.close != null) { detEl.hidden = true; return; }
        if (b.dataset.card && window.TECH_OPEN) { detEl.hidden = true; TECH_OPEN(b.dataset.card); return; }
        if (b.dataset.way != null) { S.tq[b.dataset.ev] = +b.dataset.way; save(); render(); const ev2 = allEv().find((x) => x.id === b.dataset.ev); if (ev2) details(ev2); } }; }
    const OL = optsOf(ev), t0 = ev.tech || {}, others = OL.map((t, i) => `<button type="button" class="${i === ev.k ? 'on' : ''}" data-ev="${ev.id}" data-way="${i}">${esc(t.n)}</button>`).join('');
    const GN = ((window.PLAN && PLAN.GOALS) || []).find((x) => x.id === ev.g);
    detEl.innerHTML = `<div class="fDetTop"><b>${ev.e} ${esc(ev.n)}</b><button type="button" data-close>OK</button></div>`
      + `<div class="fChain">${chain.map(([l, id]) => `<button type="button" ${id ? `data-card="${id}"` : 'disabled'}>${esc(l)}</button>`).join('<span>›</span>')}<span>›</span><b>${esc(ev.n)}</b></div>`
      + `<p class="fDetFr">${esc(ev.fr)}</p>`
      + (GN ? `<p class="fDetG" style="color:${GN.c}">${esc(GN.name)}</p>` : '')
      + `<h4>Instructions</h4><p class="${d.ins || t0.d ? '' : 'fTodo'}">${esc(d.ins || t0.d || 'À compléter.')}</p>`
      + (t0.need ? `<h4>A besoin de</h4><ul>${t0.need.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '') + (t0.see ? `<h4>On voit</h4><p>${esc(t0.see)}</p>` : '')
      + (t0.give ? `<h4>Produit</h4><ul>${t0.give.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '')
      + (t0.parts ? `<h4>Ses moments (placés dans le plan)</h4><ol>${t0.parts.map((x) => `<li><b>${esc(x.n)}</b> · ${esc(x.d)}</li>`).join('')}</ol>` : '')
      + `<h4>Exemple</h4>${(d.ex || (t0.ex && t0.ex.length)) ? (d.ex ? `<p>${esc(d.ex)}</p>` : t0.ex.map((x) => `<p>${esc(x)}</p>`).join('')) : '<p class="fTodo">À compléter.</p>'}`
      + (OL.length > 1 ? `<h4>Les autres façons</h4><div class="fWays">${others}</div>` : '');
    detEl.hidden = false;
  }

  // ---- the big window (03/11): the compact views stay compact; a tap opens the full one, with words to understand it ----
  function big(html) { details({ kind: '·', id: '', e: '', n: '', fr: '' }); detEl.innerHTML = html; detEl.hidden = false; detEl.scrollTop = 0; }
  const bigTop = (t) => `<div class="fDetTop"><b>${t}</b><button type="button" data-close>OK</button></div>`;
  const faces2 = (ids) => `<span class="fBigF">${(ids || []).filter((w) => w && live(w)).slice(0, 3).map((w) => face(w)).join('')}</span>`;
  const SRC = { base: 'de base', lien: 'd’un lien', choisi: 'choisi', faille: 'de sa faille', 'événement': 'd’un événement', info: 'd’une info' };
  const LEDX = { eng: 'À qui le public s’attache, et par quelle technique. On fait aimer ceux qu’un choix pourra coûter.', cur: 'Les questions que le public se pose maintenant, sans réponse encore.',
    stake: 'Ce qui pèse plus : un désir renforcé, ou un obstacle qui s’ajoute. C’est ce qui donne du poids au choix.', moved: 'Ce qui a changé dans l’histoire : arrivé, révélé, choisi.' };
  const LEDN = { eng: 'Engagé dans les persos et les liens', cur: 'Curiosité', stake: 'Enjeux', moved: 'L’histoire avance' };
  function bigLedger(n) {
    const ep = episodes()[n]; if (!ep) return; const ch = ep.list.find((x) => x.kind === 'choice' || x.kind === 'pick');
    big(bigTop(`Épisode ${n + 1} · ce qu’il accomplit`)
      + (ch ? `<div class="fBigQ"><small>La question de l’épisode</small><b>${ch.kind === 'pick' ? `🏁 ${esc(ch.fr)}` : `⚖️ ${esc(ch.opts.map((o) => o[0]).join(' ou '))} ?`}</b>${ch.opts ? `<p>${ch.opts.map((o) => `${esc(o[0])} → ${esc(o[1])}`).join('<br>')}</p>` : ''}</div>` : '')
      + LED.filter(([key]) => ep.led[key].length).map(([key, e2]) => `<h4>${e2} ${LEDN[key]}</h4><p class="fBigX">${LEDX[key]}</p>`
        + ep.led[key].map(([fr, , ev]) => `<div class="fBigI">${faces2(ev && ev.who)}<div><b>${esc(fr)}</b>${ev && ev.n && ev.n !== 'Choix' ? `<small>par : ${esc(ev.n)}${ev.fr && ev.fr !== fr ? ` · ${esc(ev.fr)}` : ''}</small>` : ''}</div></div>`).join('')).join(''));
  }
  function bigBraid() {
    const EPS2 = episodes(), TH = EPS2.threads || [], MV = (window.FILS && FILS.MV) || {}, KD = (window.FILS && FILS.KIND) || {}, ST2 = story(); let mi = 0;
    big(bigTop('🧵 La tresse : les fils de l’histoire') + '<p class="fBigX">Un fil = ce que le public porte jusqu’à ce que ce soit payé : une ligne de désir, une question, une attente, un détail semé. Chaque pas donne quelque chose, ou en retire. Sur un ordinateur, 🖥️ montre tout d’un coup.</p>'
      + TH.map((t) => { const c = t.kind === 'line' ? (t.main ? LANE[mi++ % LANE.length] : '#98989d') : (KD[t.kind] || [0, 0, '#8e8e93'])[2];
        return `<div class="fBigL" style="--c:${c}"><div class="fBigLH">${faces2(t.who)}<b>${t.kind === 'line' ? t.e : (KD[t.kind] || ['·'])[0]} ${esc(t.fr)}</b><em>${t.kind === 'choice' ? '' : t.done ? `fermé · ép. ${t.to + 1}` : 'reste ouvert'}</em></div>`
          + t.steps.map((x) => `<div class="fBigE"><i>${x.ep + 1}</i><div><p><b>${(MV[x.mv] || ['·'])[0]} ${esc((MV[x.mv] || ['', x.mv])[1])}</b> · ${esc(x.fr || '')}</p></div></div>`).join('') + '</div>'; }).join('')
      + (ST2.X[0] && ST2.X[1] ? `<div class="fBigQ"><small>Le climax, où ils convergent</small><b>🏁 ${esc(cap(lab(ST2.X[0])))} ou ${esc(lab(ST2.X[1]))} ?</b><p>${esc(dSay(ST2.X[0]))}<br>${esc(dSay(ST2.X[1]))}</p></div>` : ''));
  }
  function bigDesires(id) {
    const ST2 = story(), mine = ST2.D.filter((d) => d.who === id).sort((a, b) => b.s - a.s);
    big(bigTop(`${esc(nm(id))} · ses désirs`) + '<p class="fBigX">Déduits de ce qu’il est : de base (rester en vie, le respect), de ses liens, de ce que tu choisis, de sa faille, des événements et des infos. Les enjeux menacent ces désirs ; deux désirs opposés font un conflit.</p>'
      + mine.map((d) => { const cs = ST2.C.filter((c) => c.da === d || c.db === d);
        return `<div class="fBigI s${d.s}">${faces2([d.t])}<div><b>${DK[d.k].e} ${esc(dSay(d))}</b><small>${SRC[d.src] || d.src} · ${['', 'faible', 'moyen', 'fort'][d.s]}${cs.length ? ' · ' + cs.map((c) => `${c.e} ${esc(c.fr)}`).join(' · ') : ''}</small></div></div>`; }).join(''));
  }
  function bigBeat(id2) {
    const ev = allEv().find((x) => x.id === id2); if (!ev) return;
    if (PATHS[ev.kind] && ev.tech) return details(ev);
    big(bigTop(`${ev.e} ${esc(ev.n && ev.n !== 'Choix' ? ev.n : SBW[ev.kind] ? SBW[ev.kind](ev) : '')}`) + `<div class="fBigI">${faces2(ev.who)}<div><b>${esc(ev.choice ? ev.opts.map((o) => `${o[0]} → ${o[1]}`).join(' / ') : ev.fr)}</b>${ev.cause ? `<small>parce que ${esc(ev.cause[0])}</small>` : ''}</div></div>`);
  }

  // ---- 🎬 an episode's plan for Plan de scène, made here (no AI): its events = the rectangles of box "ep", in order,
  // each with its technique's goal and name, what it does (concrete), the info it reveals or hints; a choice gets its 2
  // options; box "later" = the start of the next episode; the links: a promise to its arrival, a stake to its choice, a
  // plant to its reveal, an object seen to its opening. Then the plan's prompt 2 writes the lines ----
  // who is on screen in a moment and what each one wants right now (their stake in it): Justin always, the people of the
  // moment and of what rides in it, never someone dead or gone; each one's want: the desire this moment is about, else
  // his line's, else his strongest one that exists by now
  const presentOf = (ev, happened, STq, out) => { const here = [...new Set([J, ...(ev.who || []), ...(ev.rides || []).flatMap((r) => r.who || [])].filter((w) => w && live(w) && !(out && out.has(w))))].slice(0, 4), ok2 = (x) => (!x.from || happened.has(x.from)) && !x.dead && !x.late;
    return here.map((p2) => { const d = (ev.desires || []).find((x) => x.who === p2) || STq.D.find((x) => x.id === ev.line && x.who === p2) || STq.D.filter((x) => x.who === p2 && x.s >= 2 && ok2(x)).sort((a2, b2) => b2.s - a2.s)[0];
      return { id: p2, name: nm(p2), wants: d ? `${DK[d.k].n}${d.t ? ' ' + tName(d) : ''}` : 'observer' }; }); };
  // ---- the lines of an episode as the player read them (16/11): kept on this phone once Haiku has written it (the
  // example's episode 1 is the written one). The plans of the next episodes carry them, so the detail planted in episode 2
  // (an object, a word, an hour) is THE detail episode 4 brings back, not a new one. A change of the story forgets them ----
  const flatLines = (story) => { const out = [], one = (x, pre = '') => { if (x && x.text && (x.who || x.duo)) out.push(`${pre}${x.who ? nm(x.who) : 'Narration'} : ${x.text}`); };
    for (const x of (story && story.steps) || []) { if (Array.isArray(x.choice)) x.choice.forEach((o, i) => { out.push(`[choix ${'ABC'[i] || i + 1}] ${o.t || ''}${o.say ? ` → Justin : ${o.say}` : ''}`); (o.then || []).forEach((y) => one(y, '    ')); }); else one(x); }
    return out; };
  // the links are part of the story (a tap on a link forgets the lines); sigOld = before the links were stored (17/11), still read
  const sigOld = () => JSON.stringify([S.decor, S.cast, S.pil, S.want, S.rel, S.infos, S.ev, S.hard, S.acts, S.climax, S.climax2, S.seed]);
  const genSig = () => { graph(); return JSON.stringify([S.decor, S.cast, S.pil, S.want, S.rel, S.infos, S.ev, S.hard, S.acts, S.climax, S.climax2, S.seed, S.figs, S.links]); };
  const keepLines = (n, story) => { const sig = genSig(); if (!S.gen || S.gen.sig !== sig) S.gen = { sig, eps: S.gen && S.gen.sig === sigOld() ? S.gen.eps : {} }; S.gen.eps[n] = flatLines(story); save(); };
  const linesOf = (n) => { const mine = S.gen && [genSig(), sigOld()].includes(S.gen.sig) ? S.gen.eps[n] : null; return mine && mine.length ? mine : S.ex && n === 0 ? flatLines(EX_EP1) : null; };
  // ---- le registre (15/11): what the player knows at the end of each episode (and since which one), what is still
  // hidden (never to be said before its moment), who is dead or gone. The board shows it; each episode's plan carries it,
  // so the lines of episode 7 are written knowing what episode 2 said ----
  function registre(EPS) {
    const CH = chains().filter((c) => c.hid.length), shownL = new Set(), hid = [...kinds('secret'), ...kinds('mask')], known = [], shownI = new Set(), shownC = new Set(), jk = new Set(), out = new Map(), R = [];
    const sv = CUR_ACT; CUR_ACT = 9; let crH = []; try { crH = evs().filter((e) => EK[e.k].crime && e.h); } finally { CUR_ACT = sv; }
    const tell = (i, n) => { if (i && !shownI.has(i)) { shownI.add(i); known.push([infoFr(i), infoEn(i), n]); } };
    EPS.forEach(({ list }, n) => { for (const b of list) for (const z of [b, ...(b.rides || [])]) {
      if (z.ev) { const e = z.ev; known.push([evFr(e), evEnT(e), n]); if (e.k === 'murder' && e.v && live(e.v)) out.set(e.v, 'dead'); if (e.k === 'gone') out.set(e.x, 'gone'); if (EK[e.k].crime && !e.h) shownC.add(e); }
      if (z.kind === 'found') { for (const [k, v] of [...out]) if (v === 'gone') out.delete(k); known.push([z.fr, z.en, n]); }
      if ((z.kind === 'reveal' || z.kind === 'partial') && z.crime && !shownC.has(z.crime)) { shownC.add(z.crime); known.push([`C’est ${nm(z.crime.x)} : ${low1(evFr(z.crime))}`, `it was ${en(z.crime.x)}: ${evEnT(z.crime)}`, n]); }
      if (z.kind === 'reveal' || z.kind === 'past') tell(z.info, n); tell(z.tells, n);
      if (z.kind === 'treveal' && !shownL.has(z.tl)) { shownL.add(z.tl); known.push([z.fr, z.en, n]); }
      if (z.kind === 'pick' && z.act === 1 && ACTS() === 2) { const AS = actState(); for (const t of AS.kill) out.set(t, 'dead'); for (const t of AS.gone) out.set(t, 'gone');
        if (AS.fate) known.push([`Le prix du choix : ${AS.fate.fr}`, `the price of the choice: ${AS.fate.en}`, n]); for (const r of AS.arcs) known.push([r.fr, r.en, n]); }
      if (z.kind === 'gag' && z.info && !jk.has(z.info)) { jk.add(z.info); known.push([`Justin sait, seul : ${infoFr(z.info)}`, `justin alone knows that ${infoEn(z.info)}`, n]); }
      if (z.choice && S.picked[z.id] != null) known.push([`Justin a choisi : ${z.opts[S.picked[z.id]][0]}`, `justin chose: ${z.opts[S.picked[z.id]][0]}`, n]); }
      R.push({ known: known.slice(), out: new Map(out),
        hidden: [...hid.filter((i) => !shownI.has(i)).map((i) => [infoFr(i) + (jk.has(i) ? ' (Justin le sait, pas les autres)' : ''), infoEn(i) + (jk.has(i) ? ' (justin knows, the others do not)' : '')]),
          ...crH.filter((e) => !shownC.has(e)).map((e) => [`${nm(e.x)} est le coupable (${low1(evFr(e))})`, `${en(e.x)} is the culprit (${evEnT(e)})`]),
          ...CH.filter((c) => !shownL.has(c.n)).map((c) => { const t2 = c.txt(c.hid); return [t2[0] + (c.kn.length ? ` (${c.kn.map(nm).join(' et ')} le sait)` : ' (personne ne le sait encore)'), t2[1] + (c.kn.length ? ` (${c.kn.map(en).join(' and ')} know${c.kn.length > 1 ? '' : 's'})` : ' (nobody knows it yet)')]; })] }); });
    return R;
  }
  // how someone talks (17/11): the first pillar, a touch of the second, and the flaw when it shows
  const voiceOf = (id, a = 1, hap = null) => { const V = window.FILS && FILS.VOICE; if (!V) return ''; const [p1, p2] = pillarsOf(id), f = S.flaw[id] && FILS.FLAWV[S.flaw[id]];
    const arc = (a === 2 ? actState().arcs.find((r) => r.who === id) : null) || (() => { const m = [...(hap || [])].find((e) => e && e.k === 'murder' && e.v && e.x !== id && live(e.v) && storyAt(1).D.some((d) => d.who === id && d.t === e.v && ['love', 'protect'].includes(d.k))); return m ? { v: m.v } : null; })();
    const AV = { deuil: 'peu de mots, la voix éteinte ; ne se défend plus', rancune: 'froid, poli, chaque phrase est un reproche', fuite: 'évite, répond à peine, a déjà un pied dehors' };
    return [arc ? `${arc.mode && arc.mode !== 'vengeance' ? 'DEPUIS : ' + AV[arc.mode] : `DEPUIS LA MORT ${de(nm(arc.v)).toUpperCase()} : ${V[FILS.BASCULE]}`} ; avant, c’était : ` : '', V[p1], p2 && V[p2] ? `parfois : ${V[p2]}` : '', f ? `sa faille s’entend : ${f}` : ''].filter(Boolean).join(' ; ').replace(' :  ; ', ' : '); };
  // the facts the AI can say: the story's (graph), the people off screen added by hand, the chains the audience knows (one sentence each)
  const openFacts = () => { const G = graph(); return [...G.facts, ...G.more.filter((f) => /n’est pas à l’écran/.test(f[0])), ...chains().filter((c) => c.open.length).map((c) => c.txt(c.open))]; };
  function planOf(n) {
    const EP = episodes(), ep = EP[n] || EP[0], next = EP[n + 1], IL = infos(), iid = (i) => 'i' + (IL.indexOf(i) + 1), STq = story(), REG = registre(EP), REGp = n > 0 && REG[n - 1] ? REG[n - 1].out : new Map();
    const happened = new Set(EP.slice(0, n + 1).flatMap((x) => x.list).map((x) => x.ev).filter(Boolean));
    const ids = {}; let k = 0;
    const beat = (ev, pre) => { const id = pre + (++k); ids[ev.id] = id; const ch = ev.choice || ev.kind === 'pick';
      const b = { id, goals: ch || !ev.g ? [] : [ev.g], tech: ch ? '' : ev.n, lines: ch ? 2 : 3, what: (ev.scene && pre === 'r' && k > 1 ? 'Nouvelle scène. ' : '') + ev.fr };
      if (ch) { b.kind = 'choice'; b.opts = (ev.opts || chOpts()).map((o) => (Array.isArray(o) ? o[0] : o)); b.what = ev.choice ? `Choix : ${ev.opts.map((o) => `${o[0]} (→ ${o[1]})`).join(' / ')}` : ev.fr; }
      if (ev.info) b[ev.hint ? 'hints' : 'reveals'] = [iid(ev.info)];
      // who is on screen and what each one wants right now (their stake in this moment): Justin always, the people of the
      // moment and of what rides in it; each one's want: the desire this moment is about, else his line's, else his strongest
      b.present = presentOf(ev, happened, STq, REGp);
      for (const rd of ev.rides || []) { (b.carries = b.carries || []).push({ tech: rd.n, part: rd.fr }); if (rd.info) b[rd.hint ? 'hints' : 'reveals'] = [...(b[rd.hint ? 'hints' : 'reveals'] || []), iid(rd.info)]; ids[rd.id] = id; b.lines = Math.min(5, (b.lines || 3) + 1); }
      return b; };
    const orig = ep.list.slice(), epBeats = ep.list.map((ev) => beat(ev, 'r')); k = 0;
    epBeats.forEach((b, j) => { const e2 = ep.list[j]; if (j && !b.kind && e2.kind !== 'stake' && !e2.concrete) b.what = ({ mais: `Mais${e2.cause ? `, alors que ${e2.cause[0]}` : ''} : `, soudain: 'Soudain : ', 'pendant ce temps': 'Pendant ce temps : ' }[link(e2)[0]] || (e2.cause ? `Parce que ${e2.cause[0]} : ` : 'Donc : ')) + b.what; });
    // one line, two jobs (03/11): a moment that can ride in another (a seed, a planted question) climbs into the latest
    // carrier before it (Tell a story, Shared memory, Show contrast...) instead of having its own rectangle
    const evOf = (b) => ep.list[epBeats.indexOf(b)], carrierBefore = (b) => { for (let q = epBeats.indexOf(b) - 1; q >= 0; q--) { const e2 = ep.list[q]; if (e2 && e2.tech && e2.tech.carrier && !epBeats[q].kind) return epBeats[q]; } return null; };
    for (const b of epBeats.slice()) { const ev = evOf(b); if (!ev || ev.kind !== 'plant') continue; const cr = carrierBefore(b); if (!cr) continue;
      (cr.carries = cr.carries || []).push({ tech: ev.n, part: `Le seed : ${ev.c.i}` }); cr.hints = [...new Set([...(cr.hints || []), ...(b.hints || [])])];
      ids[ev.id] = cr.id; epBeats.splice(epBeats.indexOf(b), 1); ep.list = ep.list.filter((x) => x !== ev); }
    const laterEvs = next ? next.list.filter((ev) => !ev.choice).slice(0, 2) : [], laterBeats = laterEvs.map((ev) => beat(ev, 'f'));
    const all = [...orig, ...laterEvs], links = [], ln = (a, b, label) => { if (ids[a] && ids[b]) links.push({ from: ids[a], to: ids[b], label }); };
    ln('expect', 'inc', 'La promesse : on l’attend'); ln('tease', 'inc', 'Annoncé : il arrive');
    for (const ev of orig) if (ev.kind === 'stake') ln(ev.id, ev.choiceOf, `L’enjeu ${ev.id.endsWith('a') ? 'A' : 'B'}`);
    for (const ev of all) if (ev.kind === 'plant' || ev.kind === 'seen') { const to = all.find((x) => (x.kind === 'reveal' || x.kind === 'open') && x.info === ev.info); if (to) ln(ev.id, to.id, ev.kind === 'plant' ? 'Planté → révélé' : 'Vu → ouvert'); }
    // a technique with moments (Coincé devant tous, Seed & payoff): its « now » is the event; the others are placed before
    // it by rule (early: as early as possible, in a carrier if it can ride; mid: between; before: right before), linked
    let t = 0; const planted = line().some((x) => x.kind === 'plant');
    for (const ev of ep.list.slice()) {
      const parts = ev.tech && ev.tech.parts; if (!parts || !ids[ev.id] || ev.kind === 'plant' || ev.kind === 'enter') continue;
      const at = () => epBeats.findIndex((b) => b.id === ids[ev.id]), chain = [];
      // what each moment says here, with the people: the hard question is where the newcomer was
      // (never his hidden info: it comes out later, the question must not spoil it)
      const c = ev.c || {}, Q = `Où était ${c.x} cette nuit ?`;
      const say = { q: `La question difficile : « ${Q} » Personne n’a la réponse`, try: `Chacun essaie d’y répondre : ${c.d} le défend, ${c.t} doute ; aucune réponse ne tient, ça monte`,
        ask: `${c.d} lui pose la question devant tous : « ${Q} » Tout le monde attend` };
      const mk = (pt) => ({ id: 't' + (++t), goals: ev.g ? [ev.g] : [], tech: ev.n, lines: 2, what: ev.kind === 'enter' && say[pt.id] ? say[pt.id] : `${pt.n} : ${pt.d}` });
      // an arrival: the question is asked once he's there, and his answer is the moment (one rectangle)
      if (ev.kind === 'enter' && parts.some((pt) => pt.id === 'ask')) { const nb = epBeats.find((b) => b.id === ids[ev.id]); nb.what += ` ; ${c.d} lui demande devant tous : « ${Q} » ; sa réponse, inattendue, lui rend le contrôle`; nb.lines = 4; }
      for (const pt of parts) {
        if (pt.at === 'now') continue;
        if (pt.at === 'early' && ev.kind === 'reveal' && planted) continue;   // its seed is already a 🌱
        if (pt.at === 'early') { const cr = pt.carry ? epBeats.slice(0, at()).find((b) => { const e2 = evOf(b); return e2 && e2.tech && e2.tech.carrier && !b.kind; }) : null;
          if (cr) { (cr.carries = cr.carries || []).push({ tech: ev.n, part: pt.n }); chain.push(cr.id); } else { const nb = mk(pt); epBeats.splice(Math.min(1, at()), 0, nb); chain.push(nb.id); } }
        if (pt.at === 'mid') { const from = chain.length ? epBeats.findIndex((b) => b.id === chain[chain.length - 1]) + 1 : 0, nb = mk(pt); epBeats.splice(Math.max(from, Math.floor((from + at()) / 2)), 0, nb); chain.push(nb.id); }
        if (pt.at === 'before' && !(ev.kind === 'enter' && pt.id === 'ask')) { const nb = mk(pt); epBeats.splice(at(), 0, nb); chain.push(nb.id); }
      }
      chain.push(ids[ev.id]);
      for (let q = 0; q < chain.length - 1; q++) if (chain[q] !== chain[q + 1]) links.push({ from: chain[q], to: chain[q + 1], label: `${ev.n} : ${(parts.filter((pt) => pt.at !== 'now')[q] || parts[parts.length - 1]).n}` });
    }
    const title = `${(ACT.get && ACT.get().seed && ACT.get().title) || 'Créer'} · épisode ${n + 1}`;
    // what the story already holds when this episode starts: what the player knows, what is still hidden at its end
    // (never said in it), the questions in the air (and where each one stands), who is dead
    const MVp = (window.FILS && FILS.MV) || {}, openT = (EP.threads || []).filter((t) => (t.kind === 'q' || t.kind === 'promise') && t.from < n && (!t.done || t.to >= n));
    const storySoFar = { episode: n + 1, of: EP.length, act: ep.act || 1, known: n > 0 && REG[n - 1] ? REG[n - 1].known.map((k2) => k2[0]) : [], hidden: REG[n] ? REG[n].hidden.map((h) => h[0]) : [],
      open: openT.map((t) => { const last = t.steps.filter((x) => x.ep < n).pop(), ends = t.done && t.to === n; return { question: t.fr, state: last ? (MVp[last.mv] || ['', last.mv])[1] : 'ouverte', here: ends ? 'elle reçoit sa réponse dans cet épisode' : t.steps.some((x) => x.ep === n) ? 'elle avance dans cet épisode, sans réponse' : 'elle ne bouge pas : n’en parle pas' }; }),
      dead: [...REGp].filter(([, v]) => v === 'dead').map(([id]) => nm(id)) };
    const said = Object.fromEntries([...Array(n).keys()].map((k2) => [k2 + 1, linesOf(k2)]).filter(([, v]) => v)); if (Object.keys(said).length) storySoFar.lines = said;
    return { title, scene: S.decor, turn: ep.list[ep.list.length - 1].fr, needs: [], story: storySoFar, ...(openFacts().length ? { facts: openFacts().map((f) => f[0]) } : {}),
      chars: S.cast.filter((id) => REGp.get(id) !== 'dead').map((id) => ({ id, name: nm(id), sprite: sprite(id), poses: ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'].filter((p2) => window.SPRITES && SPRITES[sprite(id)] && SPRITES[sprite(id)].poses[p2]).concat(window.EXTRAS ? EXTRAS.poses(sprite(id)) : []), traits: pillarsOf(id).map((p) => P[p].n.replace(/^L[ea’] ?/, '')), ...(voiceOf(id, ep.act || 1, happened) ? { voice: voiceOf(id, ep.act || 1, happened) } : {}), acts: traitTxt(traitsOf(id, ep.act || 1)).map((x) => x[1]).join(', ') || 'nothing extreme', infos: IL.filter((i) => i.x === id || i.y === id).map(iid) })),
      player: { id: J, name: 'Justin', traits: pillarsOf(J).map((p) => P[p].n.replace(/^L[ea’] ?/, '')), ...(voiceOf(J) ? { voice: voiceOf(J) } : {}), acts: traitTxt(traitsOf(J, ep.act || 1)).map((x) => x[1]).join(', ') || 'nothing extreme' },
      infos: IL.map((i) => ({ id: iid(i), text: infoFr(i) })),
      boxes: [{ id: 'ep', title: `Épisode ${n + 1}`, col: 0, beats: epBeats }, { id: 'later', title: 'Plus tard', col: 1, beats: laterBeats }], links };
  }
  // ---- 📄 the plot as text: Quoi, Comment, Ce qui arrive (what this screen shows, nothing else) ----
  function plotText() {
    const L = [], x = incWho(), d = DECORS.find((o) => o.id === S.decor) || DECORS[0];
    L.push('QUOI', `${d.e} ${d.n}`);
    for (const id of people()) { const w = wantOf(id), f = S.flaw[id] && F[S.flaw[id]];
      L.push(`${nm(id)}${id === J ? ' (le joueur)' : ''} : ${pillarsOf(id).map((p) => `${P[p].e} ${P[p].n}`).join(' + ') || '—'}${f ? ` · ${f.e} ${f.n}` : ''}${w ? ` · ${W[w.v].e} veut ${W[w.v].n.toLowerCase()}${W[w.v].t ? ' ' + nm(w.t) : ''}` : ''}${window.FILS && FILS.TRAITS ? ` · ${traitTxt(traitsOf(id, 1)).map((x) => x[0]).join(' · ') || 'rien d’extrême'}` : ''}`); }
    const rels = Object.entries(S.rel).filter(([kk, v]) => v && kk.split('|').every(live)); if (rels.length) L.push('Liens : ' + rels.map(([kk, v]) => `${kk.split('|').map(nm).join(' ' + R[v].e + ' ')}`).join(' · '));
    if (infos().length) L.push('Infos : ' + infos().map((i) => `${IN[i.id].e} ${infoFr(i)}`).join(' · '));
    const st = story();
    if (evs().length) L.push('Événements : ' + evs().map((e) => `${EK[e.k].e} ${evFr(e)}${EK[e.k].crime ? ` (${e.h ? 'coupable caché : ' : 'coupable : '}${nm(e.x)})` : ''}`).join(' · '));
    L.push('Désirs : ' + st.D.filter((d) => d.s >= 2).map((d) => `${DK[d.k].e} ${dFr(d)}`).join(' · '));
    L.push('', 'COMMENT');
    for (const c of st.C) L.push(`${c.e} ${c.fr}`);
    if (st.PL.length) L.push('Plotlines : ' + st.PL.map((p) => `${p.main ? '🧵' : '·'} ${DK[p.d.k].e} ${dFr(p.d)}`).join(' · '));
    if (st.X[0] && st.X[1]) L.push(`🏁 Climax : ${cap(lab(st.X[0]))} ou ${lab(st.X[1])} ?`);
    const hard = HARD.filter((h) => S.hard[h.id] && hardOk(h.id)); if (hard.length) L.push('Pourquoi c’est dur : ' + hard.map((h) => `${h.e} ${h.n}`).join(' · '));
    L.push('', 'CE QUI ARRIVE');
    const EPt = episodes(), MVt = (window.FILS && FILS.MV) || {};
    EPt.forEach(({ list, led, act: a2 }, n) => { if (ACTS() === 2 && (!n || EPt[n - 1].act !== a2)) L.push(`— ACTE ${a2} —`); L.push(`Épisode ${n + 1}`);
      list.forEach((ev, k) => { L.push(`  ${k ? link(ev)[0] + (ev.cause ? ` (← ${ev.cause[0]})` : '') + ' ' : ''}${ev.e} ${ev.choice ? `Choix : ${ev.opts.map((o, i) => `${S.picked[ev.id] === i ? '✓ ' : ''}${o[0]} (→ ${o[1]})`).join(' / ')}` : ev.fr}  (${ev.n})`); for (const rd of ev.rides || []) L.push(`      ↳ ${rd.e} ${rd.fr}  (${rd.n})`); });
      for (const [key, e2] of LED) if (led[key].length) L.push(`  ${e2} ${led[key].map((x) => x[0]).join(' · ')}`); });
    // what changed for good (18/11): the world at the end of act 1, dimension by dimension (Justin's grid), and the other choice
    if (ACTS() === 2) { const AS = actState(), DIM = { vie: '🫀 Vie', rel: '🤝 Relations', su: '🧠 Ce qui est su', statut: '👑 Statut', désirs: '🎯 Désirs' };
      L.push('', `CE QUI A CHANGÉ À LA FIN DE L’ACTE 1${AS.X ? ` (l’acte 2 suit le choix « ${AS.won[0]} » ; tape l’autre option du climax pour voir l’autre suite)` : ''}`);
      for (const [k, n2] of Object.entries(DIM)) { const xs = AS.ch.filter((c) => c.dim === k); if (xs.length) L.push(`${n2} : ${xs.map((c) => c.fr).join(' · ')}`); }
      if (AS.arcs.length) L.push(`🔀 Arcs : ${AS.arcs.map((r) => { const t1 = traitsOf(r.who, 1), t2 = traitsOf(r.who, 2), d2 = Object.keys(t1).filter((k) => t1[k] !== t2[k]).map((k) => `${FILS.TRAITS[k][0]} ${t1[k]}→${t2[k]}`); return r.fr + (d2.length ? ` [${d2.join(' ')}]` : ''); }).join(' · ')}`);
      if (AS.other) L.push(`↔️ Avec l’autre choix : ${AS.other.fr}`);
      if (!AS.ch.length) L.push('Rien : l’acte 2 repart du même monde'); }
    L.push('', 'LES FILS (ce que le public porte, et où ça se paie)');
    for (const t of EPt.threads || []) L.push(`${(FILS.KIND[t.kind] || ['·'])[0]} ${t.fr}  [${t.done ? `fermé à l’épisode ${t.to + 1}` : 'reste ouvert'}]\n    ${t.steps.map((x) => `${x.ep + 1}·${(MVt[x.mv] || ['', x.mv])[1]}`).join(' → ')}`);
    return L.join('\n');
  }

  // ---- the seed: what the act's prompt and every episode's plan prompt carry (act.js) ----
  function seed() {
    const r = roles(), x = incWho(), cs = conflicts();
    const who = (id) => { const ps = pillarsOf(id), f = S.flaw[id] && F[S.flaw[id]], w = wantOf(id);
      return `- ${id === J ? 'justin (the player)' : `${en(id)} (id "${id}")`}: ${ps.length ? ps.map((p, i) => (i ? `mixed with ${P[p].en}` : P[p].en)).join(', ') : 'free'}${f ? `; flaw: ${f.en}` : ''}${w ? `; ${W[w.v].en(en(w.t))}` : ''}.`; };
    const rels = Object.entries(S.rel).filter(([k, v]) => v && k.split('|').every(live)).map(([k, v]) => `- ${k.split('|').map(en).join(' and ')}: ${R[v].en}`);
    const facts = [...infos().map((i) => `- ${infoEn(i)}`), ...graph().facts.map((f) => `- ${f[1]}`), ...openFacts().map((f) => `- ${f[1]}`), ...chains().filter((c) => c.hid.length).map((c) => `- ${c.txt(c.hid)[1]} (HIDDEN from the audience until it comes out${c.kn.length ? `; ${c.kn.map(en).join(' and ')} already know` : ''})`)];
    const hard = HARD.filter((h) => S.hard[h.id] && hardOk(h.id)).map((h) => `- ${h.en}`);
    const EP = episodes(), E = EP.map((x) => x.list), epText = EP.map(({ list, led }) => list.map((ev, i) => `- ${evEn(ev, i)}${(ev.rides || []).map((rd) => `\n  + in the same lines, also: ${rd.en}`).join('')}`).join('\n') + `\n- WHAT THIS EPISODE MUST DO: ${[led.eng.length ? `engage the audience in: ${led.eng.map((x) => x[1]).join('; ')}` : '', led.cur.length ? `open the questions: ${led.cur.map((x) => x[1]).join('; ')}` : '', led.stake.length ? `raise the stakes: ${led.stake.map((x) => x[1]).join('; ')}` : '', led.moved.length ? `move the story: ${led.moved.map((x) => x[1]).join('; ')}` : ''].filter(Boolean).join(' / ')}.`);
    const text = [`THE CHARACTERS (their pillar: what we follow them for; it shows in how they talk and act; their want):`, ...people().map(who),
      ...(rels.length ? ['THEIR RELATIONS:', ...rels] : []), ...(facts.length ? ['THE FACTS OF THE STORY (use exactly these; never invent another secret or past):', ...facts] : []),
      ...(evs().length ? ['THE EVENTS (the first one starts the act):', ...evs().map((e) => `- ${evEnT(e)}${EK[e.k].crime ? (e.h ? ` (the culprit, ${en(e.x)}, is hidden until the crisis)` : ` (by ${en(e.x)})`) : ''}`)] : []),
      'WHAT EACH ONE WANTS (the stakes threaten these):', ...story().D.filter((d) => d.s >= 2).map((d) => `- ${dEn(d)}`),
      ...(story().X[0] && story().X[1] ? [`THE CLIMAX: justin must choose between ${labE(story().X[0])} and ${labE(story().X[1])}; every episode leads there.`] : []),
      ...(window.FILS && story().X[0] && story().X[1] ? [`THE QUESTION OF THE ACT (what the climax asks the player; no character ever says it): ${FILS.ask(story().X[0], story().X[1])[1]}`] : []),
      ...((EP.threads || []).some((t) => t.kind === 'q' || t.kind === 'promise') ? ['THE THREADS (what the audience carries, and the episode where each one is paid; a question is never answered before its episode):', ...(EP.threads || []).filter((t) => t.kind === 'q' || t.kind === 'promise').map((t) => `- ${t.en}: opens in episode ${t.from + 1}, ${t.done ? `paid in episode ${t.to + 1}` : 'still open at the end'}`)] : []),
      ...(cs.length ? ['THE CONFLICTS OF DESIRE (the story is these wants colliding):', ...cs.map((c) => `- ${c.en}`)] : []),
      ...(hard.length ? ['WHY IT IS HARD:', ...hard] : []),
      `THE LINKS: each event follows from the one before (SO), gets in its way (BUT), surprises (SUDDENLY) or runs in parallel (MEANWHILE), never "and then"; every choice causes the next episode's first event; raise stakes always make an existing desire weigh more.\nIn the arc: A = ${en(r.a)}, B = ${en(r.b)}; the impossible choice is ${en(r.a)} or ${en(r.b)}. The story is cut in ${E.length} episodes (the events below); the 5 "episodes" of the JSON are the 5 steps of the arc, in that order. Other characters may appear when the events need them.`].join('\n');
    const all = E.map((list, i) => `Episode ${i + 1}:\n${epText[i]}`).join('\n');
    return { decor: S.decor, a: r.a, b: r.b, text, ep1: `THE EVENTS, EPISODE BY EPISODE (place them):\n${all}`, eps: epText, stages: EP.map((x) => x.stage), reveal: EP.findIndex((x) => x.list.some((ev) => ev.part === 'reveal')), forge: JSON.parse(JSON.stringify(S)) };
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

  // ---- 🎬 the sheets THE STORY asks for: what the script needs that the 6 base poses can't show ----
  // Always tied to a thing in the story (an event, a relation, a want, an object): never a generic list.
  // A sheet is 2×2 (4 named cells). A duo = two characters in ONE picture (its own sprite « duo_… »: on screen it takes their
  // place, see gen.js); an object sheet = one character with the object (its cells join his own poses).
  // cells: [pose name, what it shows] ; A, B = the two characters
  const OBJ = {   // object info id → [what it is, 4 cells]
    ring: ['a ring', [['hold', 'holds the ring up between two fingers and looks at it'], ['turn', 'turns the ring on their finger, lost in thought'], ['hide', 'hides the ring in a closed fist behind their back'], ['gone', 'looks at their empty hand, the ring gone, shocked']]],
    key: ['an old key', [['hold', 'holds the key up at eye level, studying it'], ['grip', 'grips the key tight in a fist against their chest'], ['pocket', 'slides the key into a pocket, glancing around'], ['give', 'holds the key out toward someone, offering it']]],
    letter: ['a sealed letter', [['hold', 'holds the sealed letter in both hands, reading the envelope'], ['read', 'opens the letter, eyes moving across it'], ['chest', 'holds the letter against their chest, moved'], ['crush', 'crumples the letter in a fist, angry']]],
    photo: ['an old photo', [['hold', 'holds the photo in both hands, looking at it tenderly'], ['show', 'holds the photo out toward someone, showing it'], ['chest', 'presses the photo against their chest, eyes closed'], ['drop', 'drops the photo, staring at it on the ground']]],
    map: ['a folded map', [['open', 'holds the map open in both hands, studying it'], ['point', 'points a finger at a spot on the map'], ['hide', 'folds the map quickly and hides it under their coat'], ['give', 'holds the map out to someone, tense']]],
  };
  const DUOS = {   // event / relation → [icon, name, cells]
    fight: ['🗡️', 'la bagarre', [['grab', 'A and B face to face; A grabs B by the collar, B grabs A by the wrists'], ['punch', 'A swings a punch at B\'s face; B reels back, hit'], ['down', 'B on the floor, hurt, looking up; A standing over B, breathing hard'], ['over', 'A kneeling next to B who lies motionless; A stares at their own hands, horrified']]],
    threat: ['☠️', 'la menace', [['grip', 'A stands close behind B and grips B\'s shoulder; B frozen'], ['blade', 'A holds a small blade at B\'s throat from behind; B\'s eyes wide'], ['back', 'B backs away with both hands raised; A advances slowly'], ['whisper', 'A whispers into B\'s ear; B stares straight ahead, terrified']]],
    theft: ['💰', 'le vol', [['pocket', 'B talks, not looking; A slips a hand into B\'s pocket'], ['sleeve', 'A slides something into their own sleeve, looking innocent'], ['notice', 'B turns and notices; A looks away, whistling'], ['caught', 'B grabs A\'s wrist, accusing; A pulls back, caught']]],
    betray: ['🐍', 'la trahison', [['trust', 'A smiles with a hand on B\'s shoulder; B trusts, smiling back'], ['turn', 'A turns away; B\'s hand is still held out toward A'], ['hurt', 'B has understood; hurt, B stares at A; A avoids B\'s eyes'], ['apart', 'A and B back to back, each looking away in a different direction']]],
    love: ['💋', 'le baiser', [['near', 'A and B face to face, almost touching, about to kiss'], ['kiss', 'A and B kiss, eyes closed'], ['after', 'A and B foreheads together, eyes closed, just after the kiss'], ['refuse', 'A pulls away from B\'s kiss, turning the face aside; B left hurt']]],
  };
  function needs() {
    const out = [], seen = new Set(), arch = (id) => { const ps = pillarsOf(id); return (P[ps[0]] || P.chef).en; };
    const duo = (kind, a, b, why) => {
      if (kind === 'love' && a > b) [a, b] = [b, a];
      const key = `${kind}:${a}:${b}`; if (a === b || !live(a) || !live(b) || seen.has(key)) return; seen.add(key);
      const [e, nameFr, cells] = DUOS[kind], title = `${nm(a)} × ${nm(b)} : ${nameFr}`, A = en(a), B = en(b), sub = (t) => t.replace(/\bA\b/g, A).replace(/\bB\b/g, B);
      const named = cells.map(([n2, d2]) => [`${kind}_${n2}`, sub(d2)]), sid = 'duo_' + key.replace(/[^a-z0-9]+/gi, '_');
      out.push({ key, e, who: [a, b], title, why, A, B, look: [arch(a), arch(b)], sprite: sid, cells: named, spec: { id: sid, name: `${nm(a)} × ${nm(b)}`, poses: named.map((c) => c[0]), duo: [a, b], extra: { [key]: { who: [a, b], title, cells: named } } } });
    };
    for (const ev of evs()) { const a = ev.x, b = ev.v;
      if (b && live(b) && DUOS[ev.k === 'murder' ? 'fight' : ev.k]) duo(ev.k === 'murder' ? 'fight' : ev.k, a, b, `${EK[ev.k].n} : ${evFr(ev)}`); }
    for (const [k, r] of Object.entries(S.rel || {})) { const [a, b] = k.split('|'); if (r === 'couple' || r === 'crush' || r === 'ex') duo('love', a, b, `${R[r].e} ${R[r].n} : ${nm(a)} et ${nm(b)}`); }
    for (const [x, w] of Object.entries(S.want || {})) if (w && w.v === 'love' && w.t) duo('love', x, w.t, `❤️ ${nm(x)} veut ${nm(w.t)}`);
    for (const i of infos()) if (IN[i.id].k === 'object' && OBJ[i.id]) {
      const key = `obj:${i.id}:${i.x}`, sid = sprite(i.x), named = OBJ[i.id][1].map(([n2, d2]) => [`${i.id}_${n2}`, `${en(i.x)} ${d2}`]);
      out.push({ key, e: IN[i.id].e, obj: 1, who: [i.x], title: `${nm(i.x)} + ${infoFr(i)}`, why: `📦 Objet de l’histoire : ${infoFr(i)}`, thing: OBJ[i.id][0], A: en(i.x), look: [arch(i.x)], sprite: sid, cells: named,
        spec: { id: sid, name: nm(i.x), poses: named.map((c) => c[0]), solo: 1, extra: { [key]: { who: [i.x], title: infoFr(i), cells: named } } } }); }
    for (const n of out) n.done = !!(window.SPRITES && SPRITES[n.sprite] && n.cells.every((c) => SPRITES[n.sprite].poses[c[0]]));
    return out;
  }
  function needSheet(n) {
    const who = n.obj ? `Image 1 is the character (and the art style). The object is ${n.thing}: draw it simply, in the same art style, the same in every cell.`
      : `Image 1 is character A (${n.A}) and image 2 is character B (${n.B}). They are the characters AND the art style. Copy both exactly: face, hair, body, outfit, colors, line, shading.`;
    const style = n.obj ? `HOW THEY ACT (their archetype): ${n.look[0]}.` : `HOW THEY ACT (their archetype): ${n.A} is ${n.look[0]}; ${n.B} is ${n.look[1]}. Each shows every gesture THEIR way: the two must not move alike.`;
    const c = (k) => `${n.obj ? 'The character ' : ''}${n.cells[k][1]}`;
    return `Create a ${n.obj ? 'character + object' : 'two-character'} pose sheet, full body. ${who}

${style}

Format: square image, 1:1. An invisible grid of 4 equal cells, 2 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.

Background: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. Nobody wears anything green.

In every cell: ${n.obj ? 'the same character' : 'the same two characters'}, full body from head to feet, same size, feet at the same height, with a clear margin of green on all sides and nothing crossing into the next cell. No text, no labels.

Angle, the same in all 4 cells: three-quarter view, like image 1. Camera at chest height.

Row 1, left to right:
1. ${c(0)}
2. ${c(1)}

Row 2, left to right:
3. ${c(2)}
4. ${c(3)}

Keep it natural, like the reference.`;
  }
  // what the uploaded sheets let a script do: for plan.js's prompt 2 (the plan's characters = ids) and the plan's character poses
  window.EXTRAS = {
    poses(sp) { const S2 = window.SPRITES && SPRITES[sp]; return S2 && S2.extra ? Object.values(S2.extra).flatMap((x) => x.cells.map((c) => c[0])).filter((n) => S2.poses[n]) : []; },
    text(ids) {
      const here = new Set([...(ids || []), 'justin']), duos = [], solos = [];
      for (const [sid, sp] of Object.entries(window.SPRITES || {})) for (const ex of Object.values(sp.extra || {})) {
        if (!ex.cells.every((c) => sp.poses[c[0]])) continue;
        const list = ex.cells.map((c) => `${c[0]} (${c[1]})`).join(' · ');
        if (sp.duo) { if (sp.duo.every((x) => here.has(x))) duos.push(`- DUO "${sid}" = ${sp.duo.join(' and ')} together in ONE picture: ${list}.`); }
        else if (here.has(ex.who[0])) solos.push(`- ${ex.who[0]} with an object (${ex.title}): ${list}. Use one as the "pose" of one of their lines, like any pose.`);
      }
      if (!duos.length && !solos.length) return '';
      return `\nEXTRA SHOTS (sheets uploaded for this story: the screen CAN show these, use them where a rectangle needs what they show, and nowhere else):\n${duos.concat(solos).join('\n')}${duos.length ? '\nA duo step: {"duo": "<duo id>", "pose": "<its pose>", "text": "<what happens, one short sentence, present tense, no quotes>"}. It takes the place of the two characters on screen: nobody speaks during it, and they are back for the next line. Never two duo steps in a row for the same moment.' : ''}\n`;
    },
  };

  // ---- 🎲 everything drawn: a place, 2 to 4 people, wants that collide, relations, the rest ----
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const coin = (p) => Math.random() < p;
  function dice() {
    const pool = [...POOL()].sort(() => Math.random() - 0.5), cast = pool.slice(0, Math.min(pool.length, 2 + Math.floor(Math.random() * 2)));
    const [T, O, C] = cast, pl = () => { const a = pick(PILLARS).id; if (coin(0.5)) return [a]; let b; do b = pick(PILLARS).id; while (b === a); return [a, b]; };
    const k = pick(['arrive', 'gone', 'murder', 'theft', 'betray']), want = {}, rl = {};
    if (k === 'gone') { want[J] = { v: 'find', t: T }; if (O) want[O] = coin(0.5) ? { v: 'protect', t: T } : { v: 'oust', t: J }; if (coin(0.5)) want[T] = { v: 'free' }; }
    else { want[J] = { v: 'love', t: T }; if (O) { want[O] = { v: 'love', t: T }; if (coin(0.5)) rl[pk(O, T)] = 'couple'; } }
    if (C) rl[pk(J, C)] = pick(['friend', 'family', 'mentor']);
    S = { decor: pick(DECORS).id, cast, pil: Object.fromEntries([J, ...cast].map((id) => [id, pl()])), flaw: { [J]: coin(0.6) ? pick(FLAWS).id : null }, want, rel: rl,
      infos: (() => { const out = [], two = (k) => { const c = INFOS.filter((i) => i.k === k), i = pick(c), x = pick([J, ...cast]); let y; do y = pick([J, ...cast]); while (y === x && cast.length);
        out.push({ id: i.id, x, y }); }; if (coin(0.7)) two(pick(['secret', 'mask'])); if (coin(0.5)) two('past'); if (coin(0.3)) two('object'); return out; })(), ev: [{ k, x: k === 'gone' ? T : O || T, v: ['murder', 'theft', 'betray'].includes(k) ? (C || null) : null, s: null, h: 1 }], hard: { liked: coin(0.5) ? 1 : 0, clock: coin(0.4) ? 1 : 0, danger: 1, gag: 1 },
      seed: 1 + Math.floor(Math.random() * 99999), picked: {}, tq: Object.fromEntries(['hook1', 'hook2', 'want', 'expect', 'tease', 'c0', 'c1', 'past0', 'plant1', 'plant2', 'liked', 'easy', 'rev0', 'twist', 'pick', 'cost'].map((id) => [id, Math.floor(Math.random() * 6)])) };
    // the graph: two story moves (a secret between people on stage, a witness, a debt and where it was born…)
    DESN = []; graph(); grow(); grow();
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
      + (window.FILS && FILS.TRAITS ? `<div class="fTr" data-tip="Qui il est, en chiffres (0 à 3) : ses piliers et sa faille. Ça décide ce qu’il fait (passer à l’acte, pardonner, partir…), pas seulement comment il parle">${Object.entries(traitsOf(id)).map(([k, v]) => `<span class="${v >= 2 ? 'hi' : ''}" data-tip="${esc(`${FILS.TRAITS[k][1]} : ${v}/3`)}">${FILS.TRAITS[k][0]}<i>${'●'.repeat(v)}${'○'.repeat(3 - v)}</i></span>`).join('')}</div>` : '')
      + `<div class="fPs fWant"><i class="fWi" data-tip="Ce qu’il veut (et de qui). Des désirs qui se croisent = l’histoire">🎯</i>${WANTS.map((x) => `<button type="button" class="fP${w.v === x.id ? ' on' : ''}" style="--c:#ff375f" data-want="${id}:${x.id}" data-tip="${esc(`${x.e} ${x.n}\n${x.d}`)}">${x.e}</button>`).join('')}</div>`
      + (wv && wv.t ? `<div class="fPs">${people().filter((o) => o !== id).map((o) => `<button type="button" class="fFace sm${w.t === o ? ' on' : ''}" style="--c:#ff375f" data-wt="${id}:${o}" data-tip="${esc(`${wv.n} ${nm(o)}`)}">${face(o)}</button>`).join('')}</div>` : '')
      + `<div class="fDes" data-desof="${id}" data-tip="Ses désirs, déduits : de base (pâle), d’un lien, choisis, de sa faille, d’un événement ou d’une info (fort). Les enjeux menacent ces désirs">${desires().filter((d) => d.who === id).sort((a, b) => b.s - a.s).map((d) => `<span class="s${d.s}" data-tip="${esc(`${DK[d.k].e} ${dFr(d)} (${d.src})`)}">${DK[d.k].e}${d.t ? `<small>${esc(tName(d))}</small>` : ''}</span>`).join('')}</div>`
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
  // an event: its link to the one before (donc / mais), itself (a tap = another way), ⓘ (its details); a choice shows its
  // two options (a tap = the one played: its consequence opens the next episode); then the ✂ to cut after it
  function evHtml(ev, k, list) {
    const ch = ev.choice || ev.kind === 'pick', lk = k ? `<i class="fLk ${link(ev)[0]}" data-tip="${esc(`${link(ev)[0] === 'mais' ? 'Mais : ça se complique' : 'Donc : la conséquence'}${ev.cause ? `\nParce que ${ev.cause[0]}` : ''}`)}">${link(ev)[0]}</i>` : '';
    const opts = ev.choice ? `<span class="fOpts">${ev.opts.map((o, i) => `<button type="button" class="${S.picked[ev.id] === i ? 'on' : ''}" data-pickopt="${ev.id}:${i}" data-tip="${esc(`${o[0]}\n→ ${o[1]}\nUn tap = c’est ce qu’il a choisi`)}">${esc(o[0])}<small>→ ${esc(o[1])}</small></button>`).join('')}</span>` : '';
    const built = ev.built ? `<small class="fBuilt">Pèse : ${esc(ev.built.join(' · '))}</small>` : '';
    return `<span class="fRowEv">${lk}<button type="button" class="fEv${ch ? ' ch' : ''}${ev.kind === 'conseq' ? ' cq' : ''}" ${ev.kind === 'conseq' || ch ? '' : `data-tq="${ev.id}"`} data-tip="${esc(`${ev.n}${optsOf(ev).length > 1 ? `\nUn tap = une autre façon (${ev.k + 1}/${optsOf(ev).length})` : ''}`)}"><b>${ev.e}</b><span>${ev.cause && k ? `<em class="fCause">← ${esc(ev.cause[0])}</em>` : ''}${esc(ev.choice ? 'Choix' : ev.fr)}${optsOf(ev).length && !ch ? `<em class="fTn">${esc(ev.n)}</em>` : ''}</span></button>${PATHS[ev.kind] && !ch ? `<button type="button" class="fInfo" data-det="${ev.id}" data-tip="Plus de détails : d’où vient la technique, instructions, exemple">ⓘ</button>` : ''}${ev.i != null && list[k + 1] && list[k + 1].i != null ? `<button type="button" class="fGap" data-cut="${ev.i}" data-tip="Couper l’épisode ici">✂</button>` : ''}</span>${(ev.rides || []).map((rd) => `<span class="fRide"><i class="fRideI" data-tip="Monte dans le moment d’au-dessus : une réplique, deux rôles">↳</i><button type="button" class="fEv" data-tq="${rd.id}" data-tip="${esc(`${rd.n}${optsOf(rd).length > 1 ? `\nUn tap = une autre façon (${rd.k + 1}/${optsOf(rd).length})` : ''}`)}"><b>${rd.e}</b><span>${esc(rd.fr)}<em class="fTn">${esc(rd.n)}</em></span></button>${PATHS[rd.kind] ? `<button type="button" class="fInfo" data-det="${rd.id}" data-tip="Plus de détails">ⓘ</button>` : ''}</span>`).join('')}${opts}${built}`;
  }
  // 🎞️ the storyboard of an episode: its plan (the one 🎬 opens), card after card: the technique (its goal's colour), what
  // happens, what it carries of other techniques (one line, two jobs), where its links go
  function storyboard(n) {
    const pl = planOf(n), G2 = (id) => ((window.PLAN && PLAN.GOALS) || []).find((g) => g.id === id), beats = pl.boxes[0].beats, num = (id) => beats.findIndex((b) => b.id === id) + 1;
    return `<div class="fSb">${beats.map((b, i) => { const g = G2((b.goals || [])[0]), out = pl.links.filter((l) => l.from === b.id && num(l.to));
      return `<div class="fCard${b.kind === 'choice' ? ' ch' : ''}" style="--c:${g ? g.c : '#ffd60a'}"><div class="fCardT"><i>${i + 1}</i><b>${esc(b.kind === 'choice' ? 'Choix' : b.tech || '…')}</b></div><p>${esc(b.what)}</p>`
        + (b.kind === 'choice' ? `<div class="fCardO">${b.opts.map((o) => `<span>${esc(o)}</span>`).join('')}</div>` : '')
        + (b.carries || []).map((c) => `<div class="fCardC"><b>↳ ${esc(c.tech)}</b>${esc(c.part)}</div>`).join('')
        + (out.length ? `<div class="fCardL">${out.map((l) => `→ ${num(l.to)} · ${esc(l.label)}`).join('<br>')}</div>` : '') + '</div>'; }).join('')}</div>`;
  }
  // 🎞️ the storyboard of the act (03/11): close to Plan de scène but visual. The episodes in columns, a card per beat (its
  // emoji, its faces, a word), what rides in it as badges; the links drawn: 🌱 setup → payoff (orange), ❓ question →
  // answer (purple), 📈 stakes → choice (yellow; dotted = toward the climax), ⚖️ choice → what it caused (grey)
  const SBC = { setup: '#ff9f0a', qa: '#bf5af2', stake: '#ffd60a', future: '#ffd60a', cons: '#8e8e93' };
  const SBW = { hook: () => 'ouverture', dshow: () => 'veut', conflict: () => 'conflit', stake: (b) => (b.choiceOf ? 'enjeu' : 'pèse plus'), choice: (b) => (b.desires ? b.desires.map(lab).join(' / ') : 'choix'),
    pick: (b) => (b.climax ? b.climax.filter(Boolean).map(lab).join(' / ') : 'climax'), enter: () => 'arrive', gone: () => 'disparaît', crime: () => 'crime', reveal: () => 'révélé', expect: () => 'on en parle',
    tease: () => 'bientôt', conseq: () => 'conséquence', easy: () => 'ça rate', clock: () => 'horloge', twist: () => 'tout change', cost: () => 'le prix', end: () => 'la suite', open: () => 'ouvert', liked: () => 'adoré', past: () => 'passé',
    react: () => 'chacun réagit', alive: () => 'on s’attache', theory: () => 'théories', clue: () => 'indice', false: () => 'fausse piste', lost: () => 'fausse piste', block: () => 'se dérobe', doubt: () => 'doute', narrow: () => 'se resserre', remind: () => 'rappel',
    partial: () => 'demi-réponse', announce: () => 'annoncé', approach: () => 'ça approche', cross: () => 'croise', close: () => 'se ferme', found: () => 'retrouvé', plant: () => 'semé', seen: () => 'vu', gag: () => 'il sait', danger: () => 'danger' };
  function sbLinks(EPS) {
    const L = [], MVD = (window.FILS && FILS.MV) || {}, all = EPS.flatMap((e) => e.list.flatMap((b) => [b, ...(b.rides || [])]));
    const add = (a, b, t) => { if (a && b && a !== b && !L.some((l) => l.from === a && l.to === b)) L.push({ from: a, to: b, t }); };
    for (const T of EPS.threads || []) { if (!['q', 'promise', 'seed'].includes(T.kind) || !T.done) continue; const end = T.steps.find((x) => (MVD[x.mv] || [])[3] === 'close'), first = T.steps[0];
      if (first && end) add(first.id, end.id, T.kind === 'q' ? 'qa' : 'setup');
      if (T.kind === 'q' && end) for (const x of T.steps) if (x.mv === 'seed') add(x.id, end.id, 'setup'); }
    for (const b of all) if (b.kind === 'stake' && b.choiceOf) add(b.id, b.choiceOf, 'stake');
    EPS.forEach(({ list }, n) => { const ch = list.find((x) => x.kind === 'choice'), nx = EPS[n + 1] && EPS[n + 1].list.find((x) => x.kind === 'conseq'); if (ch && nx) add(ch.id, nx.id, 'cons'); });
    return L;
  }
  const sbCard = (b) => `<div class="fSbCard${b.kind === 'choice' || b.kind === 'pick' ? ' ch' : ''}" data-sid="${b.id}" data-tip="${esc(`${b.fr}${b.n && b.n !== 'Choix' ? `\n${b.n}` : ''}`)}"><b>${b.e}</b><span class="fSbFs">${(b.who || []).filter((w) => w && live(w)).slice(0, 3).map((w) => face(w)).join('')}</span><small>${esc(SBW[b.kind] ? SBW[b.kind](b) : '')}</small>`
    + ((b.rides || []).length ? `<span class="fSbRs">${b.rides.map((r) => `<i data-sid="${r.id}" data-tip="${esc(`${r.fr}${r.n ? `\n${r.n}` : ''}`)}">${r.e}</i>`).join('')}</span>` : '') + '</div>';
  let sbL = [];
  function sbHtml(EPS) {
    const was = sbSel != null && sbL[sbSel] ? `${sbL[sbSel].from}>${sbL[sbSel].to}` : null; sbL = sbLinks(EPS); sbSel = was ? (sbL.findIndex((l) => `${l.from}>${l.to}` === was) >= 0 ? sbL.findIndex((l) => `${l.from}>${l.to}` === was) : null) : null;
    return `<div class="fSbWrap"><div class="fSbExp" hidden></div><div class="fSbIn">${EPS.map(({ list }, n) => `<div class="fSbCol"><div class="fSbH">${n + 1}</div>${list.map(sbCard).join('')}</div>`).join('')}<svg class="fSbSvg"></svg></div>`
      + `<div class="fSbLeg"><span style="--c:${SBC.setup}">🌱 → 🎯</span><span style="--c:${SBC.qa}">❓ → 💡</span><span style="--c:${SBC.stake}">📈 → ⚖️</span><span style="--c:${SBC.cons}">⚖️ → ↪️</span></div></div>`;
  }
  // a link tapped: it stays alone (the others fade), its two ends are named next to their cards, and a box says what
  // this kind of link is. Tapped again (or ✕) = all the links back
  const SBT = { setup: ['🌱 Setup → payoff', 'Planté ici sans qu’on le remarque ; ça revient là et prend son sens.', 'Setup', 'Payoff'],
    qa: ['❓ Question → réponse', 'Le public se pose la question ici ; elle trouve sa réponse là.', 'Question', 'Réponse'],
    stake: ['📈 Enjeu → choix', 'Ici, un désir pèse plus ; c’est ce qui donne du poids au choix, là.', 'Enjeu', 'Choix'],
    future: ['📈 Enjeu → climax', 'Ce conflit nourrit le choix final de l’acte, plus tard.', 'Enjeu', 'Climax'],
    cons: ['⚖️ Choix → conséquence', 'Ce qu’il choisit ici ouvre l’épisode suivant.', 'Choix', 'Conséquence'] };
  let sbSel = null;
  function sbDraw() {
    const wrap = el && el.querySelector('.fSbIn'); if (!wrap) return; const svg = wrap.querySelector('svg'), r0 = wrap.getBoundingClientRect();
    svg.setAttribute('width', wrap.scrollWidth); svg.setAttribute('height', wrap.scrollHeight);
    wrap.querySelectorAll('.fSbTag').forEach((x) => x.remove());
    const pos = (id2) => { const nd = wrap.querySelector(`[data-sid="${CSS.escape(id2)}"]`); if (!nd) return null; const r = nd.getBoundingClientRect(); return { x: r.left - r0.left + wrap.scrollLeft, y: r.top - r0.top, w: r.width, h: r.height }; };
    const sel = sbSel != null ? sbL[sbSel] : null;
    wrap.classList.toggle('sel', !!sel);
    wrap.querySelectorAll('[data-sid]').forEach((nd) => nd.classList.toggle('hl', !!sel && (nd.dataset.sid === sel.from || nd.dataset.sid === sel.to)));
    svg.innerHTML = sbL.map((l, i) => { const a = pos(l.from), b = pos(l.to); if (!a || !b) return '';
      const same = Math.abs(a.x - b.x) < 20, x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = same ? b.x + b.w : b.x, y2 = b.y + b.h / 2, bend = same ? 26 + Math.abs(y2 - y1) * 0.08 : Math.max(20, (x2 - x1) / 2);
      const d = same ? `M${x1},${y1} C${x1 + bend},${y1} ${x2 + bend},${y2} ${x2},${y2}` : `M${x1},${y1} C${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`;
      const on = !sel || sel === l, op = on ? (sel ? 1 : 0.85) : 0.07, w = sel === l ? 3 : 1.6;
      return `<path d="${d}" stroke="${SBC[l.t]}" stroke-width="${w}" fill="none" opacity="${op}"${l.t === 'future' ? ' stroke-dasharray="4 3"' : ''}/><circle cx="${x2}" cy="${y2}" r="${sel === l ? 4 : 2.6}" fill="${SBC[l.t]}" opacity="${op}"/>`
        + `<path class="fSbHit" data-li="${i}" d="${d}" stroke="transparent" stroke-width="14" fill="none"/>`; }).join('');
    if (sel) { const a = pos(sel.from), b = pos(sel.to), T = SBT[sel.t], txt = (id2) => { const ev = allEv().find((x) => x.id === id2); return ev ? (ev.choice ? ev.opts.map((o) => o[0]).join(' / ') : ev.fr) : ''; };
      const tag = (p2, side, label, text) => { if (!p2) return; const t2 = document.createElement('div'); t2.className = `fSbTag ${side}`; t2.style.setProperty('--c', SBC[sel.t]);
        t2.innerHTML = `<b>${label}</b>${esc(text)}`; t2.style.top = `${p2.y + p2.h + 4}px`; t2.style.left = `${Math.max(4, side === 'from' ? p2.x : p2.x + p2.w - 150)}px`; wrap.appendChild(t2); };
      tag(a, 'from', T[2], txt(sel.from)); tag(b, 'to', T[3], txt(sel.to));
      const box = el.querySelector('.fSbExp'); if (box) { box.hidden = false; box.style.setProperty('--c', SBC[sel.t]); box.innerHTML = `<b>${T[0]}</b>${T[1]}<button type="button" data-sbclear="1">✕</button>`; } }
    else { const box = el.querySelector('.fSbExp'); if (box) box.hidden = true; }
  }
  // 🧵 the braid: a lane per plotline (and one for the events), the episodes in columns, each beat a dot (its emoji)
  function braidHtml(ST, EPS) {
    const TH = EPS.threads || [], MV = (window.FILS && FILS.MV) || {}, KD = (window.FILS && FILS.KIND) || {}; let mi = 0;
    return `<div class="fBraid" data-braidbig="1" style="--n:${EPS.length}"><div class="fBrH"></div>${EPS.map((_, n) => `<div class="fBrH">${n + 1}</div>`).join('')}`
      + TH.map((t) => { const c = t.kind === 'line' ? (t.main ? LANE[mi++ % LANE.length] : '#98989d') : (KD[t.kind] || [0, 0, '#8e8e93'])[2];
        return `<div class="fBrL" style="--c:${c}" data-tip="${esc(t.fr)}">${t.who && t.who[0] && live(t.who[0]) ? mini(t.who[0]) : ''}<b>${t.kind === 'line' ? t.e : (KD[t.kind] || ['·'])[0]}</b></div>`
          + EPS.map((_, n) => { const st = t.steps.filter((x) => x.ep === n), life = n >= t.from && n <= t.to; return `<div class="fBrC${life ? '' : ' off'}" style="--c:${c}">${st.map((x) => `<span data-tip="${esc(`${(MV[x.mv] || ['', x.mv])[1]} · ${x.fr || ''}`)}">${(MV[x.mv] || ['·'])[0]}</span>`).join('')}</div>`; }).join(''); }).join('') + '</div>';
  }
  // ---- 🖥️ LA TABLE (15/11): the big view, made for a computer screen (it covers the whole window; on a phone it scrolls).
  // Top: the story in two lines (what Justin wants, what it can cost him, the question of the act). The grid: a row per
  // thread, a column per episode; in a cell, the moves that episode makes on that thread, each with the number of its
  // moment (the same number in a column = the same moment: a knot). A thread's life is drawn across (solid where it
  // moves, dotted where it sleeps), until ✓ (it ended) or open. Under it, the strip: the moments of the episode in view,
  // readable, with the threads each one moves. On the right, what is selected (an episode, a moment, a thread), in words ----
  let bd = { ep: 0, beat: null, th: null, kind: '', help: false }, bdEl = null;
  function boardHtml() {
    const EPS = episodes(), TH = EPS.threads || [], ST = story(), MV = FILS.MV, KD = FILS.KIND, REG = registre(EPS), N = EPS.length;
    bd.ep = Math.max(0, Math.min(N - 1, bd.ep)); const E = EPS[bd.ep];
    if (bd.beat && !E.list.some((b) => b.id === bd.beat)) bd.beat = null; if (bd.th && !TH.some((t) => t.id === bd.th)) bd.th = null;
    const X = E.act === 2 && ST.X2 ? ST.X2 : ST.X, ask = FILS.ask(X[0], X[1]), acts = [...new Set(EPS.map((e) => e.act))];
    let mi = 0; const colOf = new Map(TH.map((t) => [t.id, t.kind === 'line' ? (t.main ? LANE[mi++ % LANE.length] : '#98989d') : KD[t.kind][2]]));
    const rows = TH.filter((t) => !bd.kind || t.kind === bd.kind), numOf = (n, host) => EPS[n].list.findIndex((b) => b.id === host) + 1;
    const stat = (t) => (t.kind === 'choice' ? '' : t.done ? `<em class="ok">✓ ép. ${t.to + 1}</em>` : '<em class="open">ouvert</em>');
    const faces3 = (ids, k = 3) => (ids || []).filter((w) => w && live(w)).slice(0, k).map(face).join('');
    const chOf = (E2) => E2.list.find((x) => x.kind === 'choice' || x.kind === 'pick');
    const inAir = (n) => TH.filter((t) => (t.kind === 'q' || t.kind === 'promise') && t.from <= n && (!t.done || t.to > n));
    // the grid
    const head = `<div class="bdH bdCorner"><b>${TH.length} fils</b><small>${TH.filter((t) => t.kind !== 'choice' && !t.done).length} encore ouvert(s) à la fin</small></div>`
      + EPS.map((E2, n) => { const ch = chOf(E2);
        return `<button type="button" class="bdH${n === bd.ep ? ' on' : ''}" data-bdep="${n}">${acts.length > 1 && (!n || EPS[n - 1].act !== E2.act) ? `<i>Acte ${E2.act}</i>` : ''}<b>${n + 1}</b><span>${ch ? (ch.kind === 'pick' ? `🏁 ${esc(ch.fr)}` : `⚖️ ${esc(ch.opts.map((o) => o[0]).join(' / '))}`) : E2.list.some((x) => x.kind === 'cost') ? '💔 Le prix, la suite' : ''}</span><small>❓ ${inAir(n).length} en l’air · ${E2.list.length} moments</small></button>`; }).join('');
    const body = rows.map((t) => { const c = colOf.get(t.id), on = bd.th === t.id, dim = bd.th && !on ? ' dim' : '';
      return `<button type="button" class="bdT${on ? ' on' : ''}${dim}" data-bdth="${esc(t.id)}" style="--c:${c}"><span class="bdTi">${t.kind === 'line' ? t.e : KD[t.kind][0]}</span><span class="bdTf">${faces3(t.who, 2)}</span><span class="bdTn">${esc(t.fr)}${t.kind === 'line' && !t.main ? '<small>pendant ce temps</small>' : ''}</span>${stat(t)}</button>`
        + EPS.map((E2, n) => { const st = t.steps.filter((x) => x.ep === n), life = n >= t.from && n <= t.to;
          return `<div class="bdC${life ? ' on' : ''}${st.length ? '' : ' zz'}${n === bd.ep ? ' cur' : ''}${n === t.from ? ' a' : ''}${n === t.to ? ' z' : ''}${dim}" style="--c:${c}">${st.map((x) => { const m = MV[x.mv] || ['·', x.mv, ''];
            return `<button type="button" class="bdChip${m[3] === 'close' ? ' end' : ''}${m[3] === 'quiet' ? ' q' : ''}${bd.beat === x.host && n === bd.ep ? ' hl' : ''}" data-bdbeat="${esc(x.host)}" data-bdep="${n}" title="${esc(`${m[1]} · ${x.fr || ''}`)}">${m[0]}<small>${esc(m[1])}</small><i>${numOf(n, x.host)}</i></button>`; }).join('')}</div>`; }).join(''); }).join('');
    // the strip: the moments of the episode in view
    const tagsOf = (b) => [...new Map([b, ...(b.rides || [])].flatMap((z) => (z.mv || []).map(([tid, mv]) => [tid + mv, { tid, mv }])).filter(([, x]) => colOf.has(x.tid))).values()];
    const strip = E.list.map((b, k) => { const tags = tagsOf(b), knot = new Set(tags.map((x) => x.tid)).size, lk = k ? link(b)[0] : '';
      return `<div class="bdCard${b.kind === 'choice' || b.kind === 'pick' ? ' ch' : ''}${bd.beat === b.id ? ' on' : ''}${bd.th && !tags.some((x) => x.tid === bd.th) ? ' dim' : ''}" data-bdbeat="${esc(b.id)}" data-bdep="${bd.ep}"><div class="bdCh"><i>${k + 1}</i>${lk ? `<em class="${lk === 'pendant ce temps' ? 'pendant' : lk}">${lk}</em>` : ''}<b>${b.e}</b><span class="bdCf">${faces3(b.who)}</span>${knot >= 3 ? `<u title="Un nœud : ce moment fait avancer ${knot} fils à la fois">◆ ${knot}</u>` : ''}</div>`
        + `<p>${esc(b.choice ? 'Le choix du joueur' : b.fr)}</p>` + (b.choice ? `<div class="bdCo">${b.opts.map((o) => `<span><b>${esc(o[0])}</b> → ${esc(o[1])}</span>`).join('')}</div>` : '')
        + (b.rides || []).map((r) => `<p class="bdCr">↳ ${r.e} ${esc(r.fr)}</p>`).join('')
        + `<div class="bdCt">${tags.map((x) => `<span style="--c:${colOf.get(x.tid)}" title="${esc(TH.find((t) => t.id === x.tid).fr)}">${(MV[x.mv] || ['·'])[0]} ${esc((MV[x.mv] || ['', x.mv])[1])}</span>`).join('')}</div></div>`; }).join('');
    // the side: what is selected, in words
    const sel = bd.beat ? E.list.find((b) => b.id === bd.beat) : null, T = bd.th ? TH.find((t) => t.id === bd.th) : null; let side = '';
    const mvRow = (tid, mv) => { const t = TH.find((x) => x.id === tid), m = MV[mv] || ['·', mv, '']; return t ? `<div class="bdMv" style="--c:${colOf.get(tid)}" data-bdth="${esc(tid)}"><b>${m[0]} ${esc(m[1])}</b><span>${esc(t.fr)}</span><small>${esc(m[2])}</small></div>` : ''; };
    if (bd.help) side = '<h3>Comment lire</h3><p>Une histoire tient par ses <b>fils</b> : ce que le public porte jusqu’à ce que ce soit payé. Chaque ligne du tableau est un fil, chaque colonne un épisode.</p>'
      + Object.entries(KD).map(([, k]) => `<div class="bdMv" style="--c:${k[2]}"><b>${k[0]} ${k[1]}</b><small>${k[3]}</small></div>`).join('')
      + '<h4>Les pas d’un fil</h4>' + Object.entries(MV).filter(([id]) => !['toll'].includes(id)).map(([, m]) => `<p class="bdLg"><b>${m[0]} ${m[1]}</b> ${m[2]}</p>`).join('')
      + '<h4>Le numéro sur un pas</h4><p>C’est le numéro du moment dans l’épisode. Le même numéro sur plusieurs lignes = un seul moment qui fait avancer plusieurs fils : un <b>nœud</b> (◆). Plus il y a de nœuds, plus l’histoire est tressée.</p>'
      + '<h4>Le trait</h4><p>Plein : le fil bouge dans cet épisode. Pointillé : il dort (le public le porte quand même). ✓ : il se ferme. « ouvert » : il reste en l’air à la fin (la suite le porte).</p>';
    else if (sel) { const ch = sel.choice || sel.kind === 'pick', hap = new Set(EPS.slice(0, bd.ep + 1).flatMap((x) => x.list).map((x) => x.ev).filter(Boolean)), pres = presentOf(sel, hap, ST, bd.ep > 0 ? REG[bd.ep - 1].out : new Map()), OL = ch ? [] : optsOf(sel);
      side = `<h3>${sel.e} ${esc(ch ? (sel.kind === 'pick' ? 'Le climax' : 'Le choix de l’épisode') : sel.n || '')}</h3><p class="bdBig">${esc(sel.choice ? sel.opts.map((o) => `${o[0]} → ${o[1]}`).join('  ·  ') : sel.fr)}</p>`
        + (sel.cause && !sel.concrete ? `<p class="bdWhy">parce que ${esc(sel.cause[0])}</p>` : '')
        + (sel.rides || []).map((r) => `<p class="bdCr">↳ ${r.e} <b>${esc(r.n || '')}</b> · ${esc(r.fr)}</p>`).join('')
        + (sel.tech && sel.tech.d ? `<h4>Comment ça se joue</h4><p>${esc(sel.tech.d)}</p>` : '')
        + `<h4>Ce que ce moment fait avancer</h4>${[sel, ...(sel.rides || [])].flatMap((z) => (z.mv || []).map(([tid, mv]) => mvRow(tid, mv))).join('') || '<p class="bdNone">Rien de long : un moment pour le plaisir de la scène.</p>'}`
        + `<h4>Qui est là, et ce que chacun veut maintenant</h4>${pres.map((p2) => `<div class="bdP">${face(p2.id)}<b>${esc(p2.name)}</b><span>veut ${esc(p2.wants)}</span></div>`).join('')}`
        + (OL.length > 1 ? `<h4>Une autre façon (${sel.k + 1}/${OL.length})</h4><div class="bdWays">${OL.map((t, i) => `<button type="button" class="${i === sel.k ? 'on' : ''}" data-bdway="${esc(sel.id)}:${i}">${esc(t.n)}</button>`).join('')}</div>` : ''); }
    else if (T) side = `<h3 style="color:${colOf.get(T.id)}">${T.kind === 'line' ? T.e : KD[T.kind][0]} ${esc(T.fr)}</h3><p class="bdKind"><b>${KD[T.kind][1]}</b> · ${KD[T.kind][3]}</p>`
      + (T.kind === 'choice' ? '' : `<p class="bdStat ${T.done ? 'ok' : 'open'}">${T.done ? `Ouvert à l’épisode ${T.from + 1}, fermé à l’épisode ${T.to + 1} : ${T.to - T.from + 1} épisode(s), ${T.steps.length} pas.` : `Ouvert à l’épisode ${T.from + 1}, encore en l’air à la fin : c’est la suite qui le porte.`}</p>`)
      + '<h4>Pas à pas</h4>' + T.steps.map((x) => { const m = MV[x.mv] || ['·', x.mv, '']; return `<button type="button" class="bdStep" data-bdbeat="${esc(x.host)}" data-bdep="${x.ep}"><i>${x.ep + 1}</i><b>${m[0]} ${esc(m[1])}</b><span>${esc(x.fr || '')}</span></button>`; }).join('');
    else { const R2 = REG[bd.ep], ch = chOf(E), fresh = R2.known.filter((k) => k[2] === bd.ep), air = inAir(bd.ep), closing = TH.filter((t) => t.kind !== 'choice' && t.kind !== 'line' && t.done && t.to === bd.ep);
      side = `<h3>Épisode ${bd.ep + 1}${acts.length > 1 ? ` · acte ${E.act}` : ''}</h3>`
        + (ch ? `<div class="bdQ"><small>${ch.kind === 'pick' ? 'Le climax de l’acte' : 'La question de l’épisode'}</small><b>${ch.kind === 'pick' ? `🏁 ${esc(ch.fr)}` : `⚖️ ${esc(ch.opts.map((o) => o[0]).join(' ou '))} ?`}</b>${ch.choice ? `<p>${ch.opts.map((o) => `${esc(o[0])} → ${esc(o[1])}`).join('<br>')}</p>` : ''}</div>` : '')
        + LED.filter(([key]) => E.led[key].length).map(([key, e2]) => `<h4>${e2} ${LEDN[key]}</h4><ul>${E.led[key].map(([fr]) => `<li>${esc(fr)}</li>`).join('')}</ul>`).join('')
        + (closing.length ? `<h4>💡 Ce qui se paie ici</h4><ul>${closing.map((t) => `<li>${esc(t.fr)}</li>`).join('')}</ul>` : '')
        + `<h4>À la fin, le joueur sait</h4><ul class="bdKn">${R2.known.map((k) => `<li class="${k[2] === bd.ep ? 'new' : ''}">${esc(k[0])}</li>`).join('') || '<li>Rien encore.</li>'}</ul><p class="bdNote">${fresh.length} chose(s) apprise(s) dans cet épisode (en clair).</p>`
        + `<h4>Il se demande</h4><ul>${air.map((t) => `<li>${esc(t.fr)}</li>`).join('') || '<li>Plus rien : tout est payé.</li>'}</ul>`
        + (R2.hidden.length ? `<h4>Encore caché (jamais dit avant son moment)</h4><ul class="bdHid">${R2.hidden.map((h) => `<li>${esc(h[0])}</li>`).join('')}</ul>` : '')
        + ([...R2.out].length ? `<h4>Plus là</h4><ul>${[...R2.out].map(([id2, v]) => `<li>${esc(nm(id2))} : ${v === 'dead' ? 'mort·e' : 'disparu·e'}</li>`).join('')}</ul>` : ''); }
    const kinds2 = [['', 'Tout'], ['line', '⚔️ Lignes'], ['q', '❓ Questions'], ['promise', '⏳ Attentes'], ['seed', '🌱 Semé']].filter(([k]) => !k || TH.some((t) => t.kind === k));
    return `<header class="fBdTop"><button type="button" class="bdX" data-bd="close" title="Fermer (Échap)">✕</button><div class="bdSum"><p><b>${esc(X[0] ? dSay(X[0]) : 'Justin')}.</b> ${X[1] ? `Ça peut lui coûter <b>${esc(lab(X[1]))}</b>.` : ''}${S.ex ? ' <em>📖 Le voleur de la taverne</em>' : ''}</p><p class="bdAsk">La question${acts.length > 1 ? ` de l’acte ${E.act}` : ' de l’acte'}, jamais dite à l’écran : <b>${esc(ask[0])}</b></p></div>`
      + `<div class="bdTabs">${kinds2.map(([k, n2]) => `<button type="button" class="${bd.kind === k ? 'on' : ''}" data-bdkind="${k}">${n2}</button>`).join('')}<button type="button" class="${bd.help ? 'on' : ''}" data-bd="help" title="Comment lire ce tableau">?</button></div></header>`
      + `<main class="fBdMain"><section class="bdGridW"><div class="bdGrid" style="--n:${N}">${head}${body}</div></section><aside class="bdSide">${bd.beat || bd.th || bd.help ? '<button type="button" class="bdBack" data-bd="back">‹ L’épisode</button>' : ''}${side}</aside></main>`
      + `<footer class="fBdStrip"><div class="bdSh"><button type="button" data-bdep="${bd.ep - 1}"${bd.ep ? '' : ' disabled'}>‹</button><b>Épisode ${bd.ep + 1}</b><button type="button" data-bdep="${bd.ep + 1}"${bd.ep < N - 1 ? '' : ' disabled'}>›</button><small>${E.list.length} moments · un clic sur un moment = son détail</small></div><div class="bdCards">${strip}</div></footer>`;
  }
  function boardDraw(keep) { if (!bdEl) return; const g = bdEl.querySelector('.bdGridW'), c = bdEl.querySelector('.bdCards'), sd = bdEl.querySelector('.bdSide'), was = keep ? [g && g.scrollLeft, g && g.scrollTop, c && c.scrollLeft, sd && sd.scrollTop] : null;
    bdEl.innerHTML = boardHtml(); if (was) { const g2 = bdEl.querySelector('.bdGridW'), c2 = bdEl.querySelector('.bdCards'), s2 = bdEl.querySelector('.bdSide'); g2.scrollLeft = was[0]; g2.scrollTop = was[1]; if (keep === 2) c2.scrollLeft = was[2]; if (keep === 3) s2.scrollTop = was[3]; }
    const on = bdEl.querySelector('.bdCard.on'); if (on && keep !== 2) on.scrollIntoView({ block: 'nearest', inline: 'center' });
    const g3 = bdEl.querySelector('.bdGridW'), col = bdEl.querySelector('.bdH.on'); if (g3 && col) { const a = col.offsetLeft - 250, b = col.offsetLeft + col.offsetWidth - g3.clientWidth; if (g3.scrollLeft > a) g3.scrollLeft = Math.max(0, a); else if (g3.scrollLeft < b) g3.scrollLeft = b; } }
  function boardOpen() {
    if (!window.FILS) return;
    if (!bdEl) { bdEl = document.createElement('div'); bdEl.className = 'fBd'; document.body.appendChild(bdEl);
      bdEl.onclick = (e) => { const t = e.target.closest('[data-bd], [data-bdep], [data-bdth], [data-bdbeat], [data-bdkind], [data-bdway]'); if (!t) return; e.stopPropagation(); const d = t.dataset; let keep = 1;
        if (d.bd === 'close') { bdEl.hidden = true; return; }
        if (d.bd === 'help') { bd.help = !bd.help; bd.beat = bd.th = null; } else if (d.bd === 'back') { bd.beat = bd.th = null; bd.help = false; }
        else if (d.bdway) { const [id2, i] = d.bdway.split(':'); S.tq[id2] = +i; save(); render(); keep = 3; }
        else if (d.bdkind != null) bd.kind = d.bdkind;
        else if (d.bdbeat) { bd.ep = +d.bdep; bd.beat = bd.beat === d.bdbeat && !t.classList.contains('bdStep') && !t.classList.contains('bdChip') ? null : d.bdbeat; bd.help = false; if (t.classList.contains('bdCard')) { bd.th = null; keep = 2; } }
        else if (d.bdth) { bd.th = bd.th === d.bdth && t.classList.contains('bdT') ? null : d.bdth; bd.beat = null; bd.help = false;
          const T = bd.th && (episodes().threads || []).find((x) => x.id === bd.th); if (T && !T.steps.some((x) => x.ep === bd.ep)) bd.ep = T.from; }
        else if (d.bdep != null) { bd.ep = +d.bdep; bd.beat = null; bd.help = false; }
        boardDraw(keep); };
      addEventListener('keydown', (e) => { if (!bdEl || bdEl.hidden) return; if (e.key === 'Escape') { if (bd.beat || bd.th || bd.help) { bd.beat = bd.th = null; bd.help = false; boardDraw(1); } else bdEl.hidden = true; }
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { bd.ep += e.key === 'ArrowRight' ? 1 : -1; bd.beat = null; boardDraw(1); } }); }
    bdEl.hidden = false; boardDraw();
  }

  // ---- the links, by hand (17/11): a tap on a link = its actions; ＋ = from what → which link → to what ----
  let selLk = null, addSt = null;
  const endOf = (r) => (r.startsWith('new:') ? FILS.END[r[4]] : FILS.END[r[0]]);
  const endH = (r) => { if (!r.startsWith('new:')) return nodeOf(r).h; const [, t, c] = r.split(':'), x = catOf(t, c); return `<b>${x[1]}</b><small>${esc(x[2])}</small>`; };
  const NEWT = { f: ['👤', 'quelqu’un hors scène'], t: ['📦', 'une chose'], m: ['🕰️', 'un moment du passé'], l: ['📍', 'un lieu'] };
  const nodePick = (attr, ok, not) => nodesNow().filter((r) => r !== not && ok(endOf(r))).map((r) => `<button type="button" class="fLink" ${attr}="${esc(r)}">${endH(r)}</button>`).join('')
    + Object.entries(NEWT).filter(([t]) => ok(FILS.END[t])).map(([t, x]) => `<button type="button" class="fLink fLkAdd" data-gnew="${t}">＋ ${x[0]} ${esc(x[1])}</button>`).join('');
  const linkPanel = () => { const l = selLk != null && S.links[selLk]; if (!l) return ''; const K3 = FILS.LINK[l.k], alt = altsOf(l).length;
    return `<div class="fLkP"><p>${esc(linkTxt(l)[0])}${l.by ? '' : ' <em>(tiré par l’histoire)</em>'}</p>${alt ? '<button type="button" class="fLink" data-gnext="1">↻ autre bout</button>' : ''}`
      + `${K3.dir === 0 ? `<button type="button" class="fLink${l.both ? ' on' : ''}" data-gboth="1" data-tip="Ce lien-là va dans les deux sens, ou pas">↔ dans les deux sens</button>` : ''}${l.by ? '<button type="button" class="fLink" data-gdel="1">✕ enlever</button>' : ''}`
      + (l.by ? `<div class="fLkG"><button type="button" class="fLink${l.sh === 'h' ? '' : ' on'}" data-gsh="o" data-tip="Le public le sait : c’est dit en passant, tôt">👁️ le public le sait</button><button type="button" class="fLink${l.sh === 'h' ? ' on' : ''}" data-gsh="h" data-tip="Le public l’apprend plus tard : un indice d’abord, puis ça sort, et chacun réagit">🙈 il l’apprend plus tard</button>`
        + (l.sh === 'h' ? `${ACTS() === 2 ? `<button type="button" class="fLink" data-gat="1" data-tip="L’acte où ça sort">${l.at === 2 ? '②' : '①'}</button>` : ''}</div><div class="fLkG"><small>Qui le sait déjà :</small>${people().map((p) => `<button type="button" class="fFace sm${(l.kn || []).includes(p) ? ' on' : ''}" data-gkn="${p}" style="--c:#ff9f0a" data-tip="${esc(nm(p))} le sait déjà (il agit en le sachant)">${face(p)}</button>`).join('')}` : '') + '</div>' : '') + '</div>'; };
  const addPanel = () => { if (!addSt) return ''; const LK = FILS.LINK, x = '<button type="button" class="fLink fLkAdd" data-gcancel="1">✕</button>';
    if (addSt.cat) return `<div class="fLkP"><p>${NEWT[addSt.cat][0]} Lequel ?</p>${FILS.CAT[addSt.cat === 'f' ? 'f' : addSt.cat] ? (addSt.cat === 'f' ? [...FILS.FOLK, ...FILS.FIGS.map((R) => [R.k, R.e, R.n])] : FILS.CAT[addSt.cat]).map((c) => `<button type="button" class="fLink" data-gcat="${c[0]}"><b>${c[1]}</b><small>${esc(c[2])}</small></button>`).join('') : ''}${x}</div>`;
    if (!addSt.a) return `<div class="fLkP"><p>1. De quoi part le lien ?</p>${nodePick('data-gpa', () => true)}${x}</div>`;
    if (!addSt.k) { const t = endOf(addSt.a);
      return `<div class="fLkP"><p>${endH(addSt.a)} 2. Quel lien ?</p>${FILS.LGROUPS.map(([g, e, n]) => { const ks = Object.entries(LK).filter(([, K3]) => K3.g === g && K3.a.includes(t)); return ks.length ? `<div class="fLkG"><b data-tip="${esc(n)}">${e}</b>${ks.map(([k, K3]) => `<button type="button" class="fLink" data-gk="${k}">${K3.e} ${esc(K3.fr)}${K3.dir === 2 ? ' ↔' : ''}</button>`).join('')}</div>` : ''; }).join('')}${x}</div>`; }
    const K3 = LK[addSt.k]; return `<div class="fLkP"><p>${endH(addSt.a)} ${K3.e} ${esc(K3.fr)} … 3. Vers quoi ?</p>${nodePick('data-gpb', (t) => K3.b.includes(t), addSt.a)}${x}</div>`; };
  const realEnd = (r) => (r.startsWith('new:') ? addNode(r[4], r.slice(6)) : r);
  const addDone = (b) => { const a = realEnd(addSt.a), k = addSt.k; addSt = null; if (addLink(a, k, realEnd(b))) selLk = S.links.length - 1; else msg = 'Ce lien existe déjà'; };

  function render() {
    if (!el) return;
    const ST = story(), cs = ST.C, EPS = episodes(), hasKey = !!ls('smt-key');
    DESN = [...new Set(ST.D.filter((d) => d.s >= 2 && !d.dead && !d.late && live(d.who) && (!d.t || live(d.t))).map((d) => `d:${d.who}:${d.k}:${d.t || ''}`))];
    el.innerHTML = `<div class="fTop"><b>⚡ Créer</b><button type="button" class="fEx" data-x="example" data-tip="L’exemple : une histoire concrète de bout en bout (le voleur de la taverne)">📖</button><button type="button" class="fDice" data-x="dice" aria-label="Au hasard" data-tip="Tout au hasard">🎲</button></div>`
      + (S.ex ? `<div class="fExBar"><b>📖 Le voleur de la taverne</b><span>L’exemple concret : chaque moment a ses vrais mots.</span><button type="button" data-x="exep1" data-tip="Joue l’épisode 1 tel qu’il est écrit (sans IA)">▶ Épisode 1 écrit</button></div>` : '')
      // WHAT
      + layer('1', 'Quoi', 'Le lieu, les persos, ce qu’ils veulent, leurs liens, les infos')
      + row('📍', DECORS.map((o) => chip(`data-decor="${o.id}"`, o.e, o.n, o.id === S.decor, '#8e8e93', o.d)).join(''), 'Le lieu')
      + row('👥', POOL().map((id) => { const k = S.cast.indexOf(id); return `<button type="button" class="fFace${k >= 0 ? ' on' : ''}" data-cast="${id}" data-tip="${esc(nm(id))}">${face(id)}<small>${esc(nm(id))}</small></button>`; }).join(''), 'Qui est dans l’histoire avec Justin (tous ceux qui ont la feuille de base)')
      + people().map(person).join('')
      + (S.cast.length ? row('🔗', relRows(), 'Leurs liens : un tap change le lien') : '')
      + row('🗂️', INFO_K.map((k) => chip(`data-ik="${k.id}"`, k.e, k.n, openK === k.id, '#64d2ff', `${k.d}\nUn tap = la liste`)).join(''), 'Les infos : choisies dans une liste, rien à taper, rien d’inventé')
      + (openK ? `<div class="fPick">${INFOS.filter((i) => i.k === openK).map((i) => `<button type="button" data-iadd="${i.id}" data-tip="${esc(i.fr('X', 'Y'))}"><b>${i.e}</b>${esc(i.fr('X', 'Y'))}</button>`).join('')}</div>` : '')
      + (infos().length ? `<section class="fInfos">${infos().map((i) => { const k = (S.infos || []).indexOf(i), it = IN[i.id];
        return `<div><b data-tip="${esc(INFO_K.find((x) => x.id === it.k).n)}">${it.e}</b><button type="button" class="fCyc" data-icyc="${k}:x" data-tip="Un tap = le perso suivant">${mini(i.x)}</button>${it.s > 1 ? `<button type="button" class="fCyc" data-icyc="${k}:y" data-tip="Un tap = le perso suivant">${mini(i.y)}</button>` : ''}<span class="fCt">${esc(infoFr(i))}</span>${ACTS() === 2 && ['secret', 'mask', 'object'].includes(it.k) ? `<button type="button" class="fX fA" data-ia="${k}" data-tip="L’acte où ça sort (ses indices se sèment dès l’acte 1). Un tap = l’autre acte">${['①', '②'][(it.k === 'object' ? actOf(i) : iAct(i)) - 1]}</button>` : ''}<button type="button" class="fX" data-idel="${k}" data-tip="Retirer">✕</button></div>`; }).join('')}</section>` : '')
      + row('💥', EVK.map((o) => chip(`data-evk="${o.id}"`, o.e, o.n, false, '#ff453a', `${o.d}\nUn tap = l’ajouter`)).join(''), 'Les événements : ils créent des désirs, des menaces et des plotlines. Le premier ouvre l’acte')
      + (evs().length ? `<section class="fInfos fEvs">${(S.ev || []).map((e, k) => { if (!EK[e.k] || !live(e.x)) return ''; const K2 = EK[e.k];
        const slot = (f, lbl) => `<button type="button" class="fCyc" data-evs="${k}:${f}" data-tip="${esc(lbl)} · un tap = le suivant">${e[f] && live(e[f]) ? mini(e[f]) : '<span class="fNo">?</span>'}</button>`;
        return `<div><b data-tip="${esc(K2.d)}">${K2.e}</b>${K2.slots.map((f) => slot(f, { x: K2.crime ? 'Le coupable' : e.k === 'threat' ? 'Qui menace' : 'Qui', v: 'La victime (? = hors écran)', s: 'Qui cherche' }[f])).join('')}<span class="fCt">${esc(evFr(e))}${K2.crime ? ` · ${e.h ? '🙈 coupable caché' : `par ${nm(e.x)}`}` : ''}</span>${K2.crime ? `<button type="button" class="fX" data-evh="${k}" data-tip="Coupable caché (révélé dans la crise) ou connu">${e.h ? '🙈' : '👁️'}</button>` : ''}${ACTS() === 2 && k ? `<button type="button" class="fX fA" data-eva="${k}" data-tip="L’acte où ça arrive. Un tap = l’autre acte">${['①', '②'][actOf(e) - 1]}</button>` : ''}<button type="button" class="fX" data-evd="${k}" data-tip="Retirer">✕</button></div>`; }).join('')}${(() => { const au = autoEv(); return au ? `<div class="fAuto2" data-tip="L’acte 2 n’a pas d’événement à lui : celui que l’acte 1 a démasqué (ou celui qui est contre Justin) riposte. Mets un événement en ② pour le remplacer"><b>${EK[au.k].e}</b><span class="fCt">② auto · ${esc(evFr(au))}</span></div>` : ''; })()}</section>` : '')
      // HOW
      + (() => { const G = graph(); if (!G.facts.length) return ''; const LK = FILS.LINK;
        return `<section class="fFacts" data-tip="Les faits : ce à quoi le reste est relié. Tirés avec 🎲. Un tap sur la première ligne = une autre figure ; sur la promesse = ce qu’elle contient">${G.facts.map((f, k) => `<button type="button" ${k === 0 ? 'data-gfig="1"' : G.prom && f === G.say.get(G.prom) ? 'data-gprom="1"' : 'disabled'}>🕸️ ${esc(f[0])}</button>`).join('')}`
          + `<div class="fLinks">${S.links.map((l, k) => { const A = nodeOf(l.a), B = nodeOf(l.b), K3 = LK[l.k], two = l.both || K3.dir === 2;
            return `<button type="button" class="fLink${selLk === k ? ' on' : ''}${l.by ? ' by' : ''}" data-glk="${k}" data-tip="${esc(linkTxt(l)[0])}">${l.sh === 'h' ? '<em>🙈</em>' : ''}${A.h}<i>${two ? '↔ ' : ''}${K3.e} ${esc(K3.fr)}</i>${B.h}</button>`; }).join('')}`
          + `<button type="button" class="fLink fLkAdd${addSt ? ' on' : ''}" data-gadd="1" data-tip="Relier deux choses à la main : de quoi → quel lien → vers quoi">＋ relier</button><button type="button" class="fLink fLkAdd" data-ggrow="1" data-tip="Un lien de plus, tiré au hasard : une chaîne qui s’allonge (une dette → née de quoi → où → avec qui). ✕ pour l’enlever">🎲 un lien de plus</button></div>`
          + linkPanel() + addPanel() + '</section>'; })()
      + layer('2', 'Comment', '1. Le moteur : ce qui lance et bloque l’histoire. 2. Les techniques de plot.')
      + `<section class="fConf" data-tip="Les conflits : deux désirs qui ne peuvent pas gagner tous les deux (déduits des désirs, des liens, des événements)">${cs.length ? cs.map((c) => `<div>${mini(c.a)}<b>${c.e}</b>${mini(c.b)}<span class="fCt">${esc(c.fr)}</span></div>`).join('') : '<div class="none">⚠️ <span class="fCt">Pas de conflit : donne des 🎯 qui se croisent</span></div>'}</section>`
      + (ST.PL.length ? `<section class="fPls" data-tip="Les plotlines : un désir fort et ses conflits. Celles de Justin sont les lignes principales ; les autres courent « pendant ce temps »">${ST.PL.map((p2, k) => `<div class="${p2.main ? 'main' : ''}" style="--c:${LANE[k % LANE.length]}"><i></i>${mini(p2.d.who)}<b>${DK[p2.d.k].e}</b><span class="fCt">${esc(`${DK[p2.d.k].n}${p2.d.t ? ' ' + tName(p2.d) : ''}`)}</span><em>${p2.cs.map((c) => c.e).join('')}</em></div>`).join('')}</section>` : '')
      + (ST.X[0] && ST.X[1] ? `<section class="fClim" data-tip="Le climax : Justin choisit entre deux de ses désirs. Tous les épisodes y mènent. Un tap sur un côté = un autre désir ; un tap sur 🏁 = le climax automatique"><button type="button" class="fClimR" data-climauto="1">🏁${S.climax ? '↺' : ''}</button><button type="button" data-clim="0">${DK[ST.X[0].k].e} ${esc(cap(lab(ST.X[0])))}</button><span>ou</span><button type="button" data-clim="1">${DK[ST.X[1].k].e} ${esc(lab(ST.X[1]))}</button><span>?</span></section>` : '')
      + (ST.X2 && ST.X2[0] && ST.X2[1] ? `<section class="fClim" data-tip="Le climax de l’acte 2 : une autre paire que l’acte 1 quand il y en a une (le besoin reste, la cible change)"><button type="button" class="fClimR" data-climauto="2">🏁②${S.climax2 ? '↺' : ''}</button><button type="button" data-clim="0" data-climact="2">${DK[ST.X2[0].k].e} ${esc(cap(lab(ST.X2[0])))}</button><span>ou</span><button type="button" data-clim="1" data-climact="2">${DK[ST.X2[1].k].e} ${esc(lab(ST.X2[1]))}</button><span>?</span></section>` : '')
      + (window.FILS && ST.X[0] && ST.X[1] ? `<p class="fAsk" data-tip="La question de l’acte : ce que le choix du climax demande au joueur. Jamais dite à l’écran">🧭 ${esc(FILS.ask(ST.X[0], ST.X[1])[0])}</p>` : '')
      + row('🧱', HARD.map((h) => { const ok = hardOk(h.id); return chip(`data-hard="${h.id}"`, h.e, h.n, ok && !!S.hard[h.id], '#bf5af2', ok ? h.d : `${h.d}\n${h.need}`, !ok); }).join(''), 'Pourquoi c’est dur (plusieurs à la fois)')
      // OUTPUT
      + layer('3', 'Ce qui arrive', 'Les événements des 5 épisodes, tirés du reste. Ils vont dans le prompt de chaque épisode.')
      + `<div class="fViews"><button type="button" class="fBig1" data-x="board" data-tip="La table : tous les fils de l’histoire d’un coup, épisode par épisode. Faite pour un ordinateur">🖥️ Grand écran</button><span class="fActs" data-tip="Un acte, ou deux : l’acte 2 reprend ce que l’acte 1 a laissé ouvert, avec une nouvelle cible">${[1, 2].map((k) => `<button type="button" class="${ACTS() === k ? 'on' : ''}" data-acts="${k}">${k} acte${k > 1 ? 's' : ''}</button>`).join('')}</span></div>`
      + `<div class="fViews"><button type="button" class="${sbAct ? 'on' : ''}" data-sbact="1" data-tip="Le storyboard de l’acte : une carte par moment, les liens setup → payoff, question → réponse, enjeu → choix, choix → conséquence">🎞️ Storyboard</button><button type="button" class="${braid ? 'on' : ''}" data-braid="1" data-tip="La tresse : une ligne par plotline, les épisodes en colonnes">🧵 Tresse</button></div>` + (sbAct ? sbHtml(EPS) : '') + (braid ? braidHtml(ST, EPS) : '')
      + `<section class="fOut">${EPS.map(({ list, led }, n) => `${n ? `<button type="button" class="fCut" data-uncut="${EPS[n - 1].list.filter((ev) => ev.i != null).pop().i}" data-tip="✂️ Une coupe d’épisode. Un tap = recoller">✂️</button>` : ''}<div class="fEp"><div class="fEpH"><i>${n + 1}</i><button type="button" data-plan="${n}" data-tip="Ouvre le plan de cet épisode dans Plan de scène : rectangles, objectifs, liens. Sans IA">🎬</button><button type="button" data-playep="${n}" data-tip="Joue cet épisode : son plan (sans IA), puis Haiku écrit les répliques">▶</button></div><div>${list.map((ev, k) => evHtml(ev, k, list)).join('')}`
        + `<div data-ledger="${n}" class="fLed${LED.some(([key]) => led[key].length) ? '' : ' none'}">${LED.filter(([key]) => led[key].length).map(([key, e2, tip]) => `<p data-tip="${esc(tip)}"><b>${e2}</b>${led[key].map((x) => esc(x[0])).join(' · ')}</p>`).join('')}</div></div></div>`).join('')}${S.cut ? '<button type="button" class="fAuto" data-x="autocut" data-tip="Remettre les coupes automatiques">↺ Coupes auto</button>' : ''}</section>`
      + `<section class="fGo">${hasKey ? '' : '<input type="text" class="secret" autocomplete="off" autocapitalize="off" spellcheck="false" data-key="1" placeholder="Clé API (sk-ant-…)">'}`
      + '<button type="button" class="fMise" data-x="mise" data-tip="Un épisode écrit (screenplay) → ce qu’on voit : la mise en scène, les feuilles à déposer, puis ▶">🎥 Mettre en scène un épisode écrit</button>'
      + '<button type="button" class="go" data-x="play" data-tip="Joue l’épisode 1 : son plan (sans IA), puis Haiku écrit les répliques">▶ Jouer</button><button type="button" data-x="plot" data-tip="Copie le plot : Quoi, Comment, Ce qui arrive, en texte">📄 Copier le plot</button><button type="button" data-x="copy" data-tip="Copie le prompt de l’acte pour un chat (la route par l’Acte) ; la réponse se colle dans Acte › Générer › 1">📋 Prompt de l’acte</button><button type="button" data-x="acte" data-tip="Ouvre l’acte : ses 5 épisodes, les plans">Acte ›</button></section>'
      + `<p class="pMsg fMsg">${esc(msg)}</p>`
      + `<h3 class="fH">🧍 Prompts des pose sheets</h3>`
      + people().map((id) => { const src = img(id), ps = pillarsOf(id);
        return `<section class="fSheet" style="--c:${(P[ps[0]] || { c: '#3a3a3c' }).c}"><div class="fPic">${src ? `<img src="${src}" alt="">` : ''}<i>1</i></div>`
          + `<div class="fSheetR"><b>${esc(nm(id))}<em>${esc(tag(id))}</em></b>`
          + `<div class="fBtns"><button type="button" data-pose="${id}" data-tip="Copie le prompt : ses 6 expressions, à la façon de son archétype">📋 Prompt</button>${src ? `<button type="button" data-cimg="${src}" data-tip="Copie son image (l’image 1), à coller dans ChatGPT avant le prompt">🖼️ Image</button><a href="${src}" download="${sprite(id)}.webp" data-tip="Télécharge son image">⬇</a>` : ''}</div></div></section>`; }).join('')
      + `<h3 class="fH">🎬 Ce que l’histoire demande</h3><p class="fWhy">Des gestes que le script joue et que les 6 poses de base ne montrent pas. Une feuille de 4 cases (2×2) par besoin.</p>`
      + (needs().map((n) => { const imgs = n.who.map((w, k) => ({ w, src: img(w), k })), M = window.MADE && MADE[n.sprite];
        return `<section class="fSheet fNeed${n.done ? ' done' : ''}" style="--c:${n.done ? '#30d158' : '#ff9f0a'}"><div class="fPics">${imgs.map((m) => `<div class="fPic">${m.src ? `<img src="${m.src}" alt="">` : ''}<i>${m.k + 1}</i></div>`).join('')}</div>`
          + `<div class="fSheetR"><b>${n.e} ${esc(n.title)}${n.done ? ' ✓' : ''}</b><p class="fWhy">${esc(n.why)}</p>`
          + (n.done && M ? `<div class="fCells">${n.cells.map((c) => M[c[0]] ? `<img src="${M[c[0]]}" alt="" data-tip="${esc(c[0])} : ${esc(c[1])}">` : '').join('')}</div>` : '')
          + `<div class="fBtns"><button type="button" data-need="${esc(n.key)}" data-tip="Copie le prompt de cette feuille 2×2">📋 Prompt</button>${imgs.map((m) => m.src ? `<button type="button" data-cimg="${m.src}" data-tip="Copie l’image ${m.k + 1} (${esc(nm(m.w))}), à coller dans ChatGPT avant le prompt">🖼️ ${imgs.length > 1 ? m.k + 1 : 'Image'}</button>` : '').join('')}`
          + `<label class="fUp" data-tip="Dépose la feuille faite par ChatGPT : elle est coupée en 4 poses et le jeu s’en sert">${n.done ? '↻ Remplacer' : '⬆ Déposer la feuille'}<input type="file" accept="image/*" hidden data-up="${esc(n.key)}"></label></div></div></section>`; }).join('')
        || '<p class="fWhy">Rien : l’histoire n’a ni meurtre, vol, trahison, menace, couple/attirance ni objet qui demande une pose de plus.</p>');
    // the storyboard's links are drawn once the cards are laid out (and again when the faces have loaded)
    requestAnimationFrame(sbDraw); setTimeout(sbDraw, 500);
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
    const hit = e.target.closest('[data-li]'); if (hit && el.contains(hit)) { e.stopPropagation(); const i2 = +hit.dataset.li; sbSel = sbSel === i2 ? null : i2; sbDraw(); return; }
    const zone = e.target.closest('[data-ledger], [data-braidbig], [data-desof], .fSbCard, .fSbRs i');
    if (zone && el.contains(zone) && !e.target.closest('button')) { e.stopPropagation();
      if (zone.dataset.ledger != null) return bigLedger(+zone.dataset.ledger); if (zone.dataset.braidbig) return bigBraid(); if (zone.dataset.desof) return bigDesires(zone.dataset.desof);
      return bigBeat(zone.dataset.sid); }
    const t = e.target.closest('button'); if (!t || !el.contains(t)) return;   // ⬇ is a link: it downloads by itself
    e.stopPropagation();
    const d = t.dataset; msg = '';
    if (!Object.keys(d).some((k) => /^g(lk|next|both|del|add|cancel|new|cat|pa|k|pb|grow|sh|at|kn)$/.test(k))) { selLk = null; addSt = null; }
    if (d.decor) S.decor = d.decor;
    else if (d.cast) { const k = S.cast.indexOf(d.cast); if (k >= 0) S.cast.splice(k, 1); else S.cast.push(d.cast); }
    else if (d.pil) { const [id, p] = d.pil.split(':'), a = (S.pil[id] = pillarsOf(id)), k = a.indexOf(p); if (k >= 0) a.splice(k, 1); else { if (a.length >= 2) a.pop(); a.push(p); } }
    else if (d.flaw) { const [id, f] = d.flaw.split(':'); S.flaw[id] = S.flaw[id] === f ? null : f; }
    else if (d.want) { const [id, v] = d.want.split(':'), cur = S.want[id];
      if (cur && cur.v === v) delete S.want[id]; else S.want[id] = { v, t: W[v].t ? (cur && cur.t && cur.t !== id && live(cur.t) ? cur.t : people().find((o) => o !== id)) : null }; }
    else if (d.wt) { const [id, o] = d.wt.split(':'); if (S.want[id]) S.want[id].t = o; }
    else if (d.rel) { const k = RELS.findIndex((r) => r.id === (S.rel[d.rel] || '')); S.rel[d.rel] = RELS[(k + 1) % RELS.length].id; }
    else if (d.ik) openK = openK === d.ik ? null : d.ik;
    else if (d.iadd) { const ps = people(), x = S.cast[0] || J, y = ps.find((o) => o !== x) || x; (S.infos = S.infos || []).push({ id: d.iadd, x, y }); openK = null; }
    else if (d.icyc) { const [k, f] = d.icyc.split(':'), i = S.infos[+k], ps = people(), other = f === 'x' ? i.y : i.x; let n = ps.indexOf(i[f]);
      do n = (n + 1) % ps.length; while (IN[i.id].s > 1 && ps[n] === other && ps.length > 1); i[f] = ps[n]; }
    else if (d.idel) { S.infos.splice(+d.idel, 1); unref('i', +d.idel); }
    else if (d.evk) { const x2 = S.cast[0] || J; (S.ev = S.ev || []).push({ k: d.evk, x: x2, v: EK[d.evk].slots.includes('v') ? S.cast.find((o) => o !== x2) || null : null, s: null, h: EK[d.evk].crime ? 1 : 0 }); }
    else if (d.evs) { const [k2, f] = d.evs.split(':'), e = S.ev[+k2], opts2 = f === 'x' ? S.cast : [null, ...people().filter((o) => o !== e.x)]; const at2 = opts2.indexOf(e[f] ?? null); e[f] = opts2[(at2 + 1) % opts2.length]; }
    else if (d.evh) { const e = S.ev[+d.evh]; e.h = e.h ? 0 : 1; }
    else if (d.evd) { S.ev.splice(+d.evd, 1); unref('e', +d.evd); }
    else if (d.clim) { const a2 = d.climact === '2', st2 = storyAt(a2 ? 2 : 1), jd = st2.D.filter((x3) => x3.who === J && x3.s >= 2 && !x3.dead && !x3.late).concat(st2.D.filter((x3) => x3.who === J && x3.s < 2)), cur2 = st2.X.map((x3) => x3 && x3.id), i2 = +d.clim;
      let at3 = jd.findIndex((x3) => x3.id === cur2[i2]); do at3 = (at3 + 1) % jd.length; while (jd[at3].id === cur2[1 - i2] && jd.length > 1); cur2[i2] = jd[at3].id; S[a2 ? 'climax2' : 'climax'] = cur2; }
    else if (d.acts) S.acts = +d.acts;
    else if (d.gfig) S.figs[0].r = (S.figs[0].r + 1) % FILS.FIGS.length;
    else if (d.gprom) { const l = S.links.find((x) => x.k === 'holds' && x.a === `i:${S.infos.indexOf(graph().prom)}`), nx = l && altsOf(l)[0]; if (nx) l.b = nx; }
    else if (d.glk) { selLk = selLk === +d.glk ? null : +d.glk; addSt = null; }
    else if (d.gnext) { const l = S.links[selLk], nx = l && altsOf(l)[0]; if (nx) { const f = l.k === 'hidden' && !l.by && S.links.find((x) => x.a === l.a && x.k === 'fear' && x.b === l.b && !x.by); if (f) f.b = nx; l.b = nx; } }
    else if (d.gboth) { const l = S.links[selLk]; if (l) l.both = l.both ? 0 : 1; }
    else if (d.gdel) { S.links.splice(selLk, 1); selLk = null; }
    else if (d.gsh) { const l = S.links[selLk]; if (l) { if (d.gsh === 'h') l.sh = 'h'; else { delete l.sh; delete l.kn; delete l.at; } } }
    else if (d.gat) { const l = S.links[selLk]; if (l) l.at = l.at === 2 ? 1 : 2; }
    else if (d.gkn) { const l = S.links[selLk]; if (l) { const K2 = new Set(l.kn || []); if (K2.has(d.gkn)) K2.delete(d.gkn); else K2.add(d.gkn); l.kn = [...K2]; } }
    else if (d.gadd) { addSt = addSt ? null : {}; selLk = null; }
    else if (d.gcancel) addSt = null;
    else if (d.gnew) addSt.cat = d.gnew;
    else if (d.gcat) { const r = `new:${addSt.cat}:${d.gcat}`; addSt.cat = null; if (!addSt.a) addSt.a = r; else addDone(r); }
    else if (d.gpa) addSt.a = d.gpa;
    else if (d.gk) addSt.k = d.gk;
    else if (d.gpb) addDone(d.gpb);
    else if (d.ggrow) { const k = grow(); selLk = k; addSt = null; if (k == null) msg = 'Rien à prolonger pour le moment'; }
    else if (d.eva) { const e = S.ev[+d.eva]; e.a = (e.a || 1) === 2 ? 1 : 2; }
    else if (d.ia) { const i = S.infos[+d.ia]; i.a = (IN[i.id].k === 'object' ? actOf(i) : iAct(i)) === 2 ? 1 : 2; }
    else if (d.x === 'board') { save(); return boardOpen(); }
    else if (d.braid) braid = !braid;
    else if (d.sbclear) { sbSel = null; return sbDraw(); }
    else if (d.climauto) S[d.climauto === '2' ? 'climax2' : 'climax'] = null;
    else if (d.sbact) sbAct = !sbAct;
    else if (d.hard) { if (!hardOk(d.hard)) return; S.hard[d.hard] = S.hard[d.hard] ? 0 : 1; }
    else if (d.tq) { const ev = allEv().find((x) => x.id === d.tq); if (ev) S.tq[d.tq] = ev.k + 1; }
    else if (d.plan) { save(); const pl = planOf(+d.plan); PLAN.add(pl); return window.FORGE_TO_PLAN && FORGE_TO_PLAN(); }
    else if (d.playep) return play(t, +d.playep);
    else if (d.sb) { const k2 = +d.sb; if (sbOpen.has(k2)) sbOpen.delete(k2); else sbOpen.add(k2); }
    else if (d.pickopt) { const [id, i] = d.pickopt.split(':'); S.picked[id] = S.picked[id] === +i ? null : +i; }
    else if (d.det) { const ev = allEv().find((x) => x.id === d.det); if (ev) details(ev); return; }
    else if (d.x === 'plot') return copy(plotText(), '📄 Plot copié');
    else if (d.pose) { save(); return copy(sheet(d.pose), `🧍 ${nm(d.pose)} : prompt copié. Dans ChatGPT : l’image + le prompt.`); }
    else if (d.need) { const n = needs().find((x) => x.key === d.need); if (n) { save(); return copy(needSheet(n), `${n.e} ${n.title} : prompt copié. Dans ChatGPT : ${n.obj ? 'l’image 1' : 'les images 1 et 2'} + le prompt.`); } }
    else if (d.cimg) return copyImg(d.cimg, t);
    else if (d.cut || d.uncut) { const L = line(), at = new Set(cutsOf(L)), i = +(d.cut || d.uncut); if (d.cut) at.add(i); else at.delete(i);
      S.cut = { sig: sigOf(L), at: [...at].sort((a, b) => a - b) }; }
    else if (d.x === 'autocut') S.cut = null;
    else if (d.x === 'dice') dice();
    else if (d.x === 'example') { S = PRESET(); sbSel = null; }
    else if (d.x === 'mise') { save(); return window.MISE && MISE.open(); }
    else if (d.x === 'exep1') { save(); PLAN.add(planOf(0)); return window.PLAN_PLAY(JSON.parse(JSON.stringify(EX_EP1)), EX_EP1.title); }
    else if (d.x === 'copy') { if (!S.cast.length) { msg = '👥 ?'; return render(); } const s = seed(); ls('smt-act-seed', JSON.stringify(s)); save();
      return copy(ACT.promptSeed(s), '📋 Copié · la réponse se colle dans Acte › Générer › 1'); }
    else if (d.x === 'acte') { save(); return window.FORGE_TO_ACT && FORGE_TO_ACT(); }
    else if (d.x === 'play') return play(t);
    save(); const y = el.closest('#forge') ? el.closest('#forge').scrollTop : 0; render(); if (el.closest('#forge')) el.closest('#forge').scrollTop = y;
  }
  // ▶: the episode's plan (made here, no AI), then Haiku writes its lines (the plan's prompt 2), then it plays
  async function play(btn, n = 0) {
    if (!S.cast.length) { msg = '👥 ?'; return render(); }
    const inp = el.querySelector('[data-key]'); if (inp && /^sk-ant-/.test(inp.value.trim())) ls('smt-key', inp.value.trim());
    const key = ls('smt-key'); if (!key) { msg = 'Il faut ta clé Haiku (en bas, au-dessus de ▶ Jouer)'; render(); const k = el.querySelector('[data-key]'); if (k) k.focus(); return; }
    save(); btn.disabled = true;
    const tell = (t) => { const m = el.querySelector('.fMsg'); if (m) m.textContent = t; };
    try {
      if (window.COUNTER) COUNTER.on = false;
      const pl = PLAN.add(planOf(n)), used = { in: 0, out: 0 };
      tell(`L’épisode ${n + 1} : Haiku écrit les répliques…`);
      const story = await ACT.haiku(key, PLAN.prompt2(), 8000, (x) => Array.isArray(x.steps), used);
      keepLines(n, story);
      if (window.GEN_USED) GEN_USED(used); tell(''); msg = '';
      window.PLAN_PLAY(story, pl.title);
    } catch (err) { msg = err.message || 'Ça n’a pas marché.'; btn.disabled = false; render(); }
  }
  // ---- details: hover (a mouse), or hold a finger half a second (a phone; that tap then does nothing) ----
  let tipEl = null, holdT = 0, held = false;
  const tipShow = (t) => { const s = t && t.dataset.tip; if (!s) return tipHide();
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'fTip'; document.body.appendChild(tipEl); }
    tipEl.textContent = s; tipEl.hidden = false; const r = t.getBoundingClientRect(), w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    tipEl.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
    tipEl.style.top = (r.top - h - 8 > 8 ? r.top - h - 8 : r.bottom + 8) + 'px'; };
  const tipHide = () => { if (tipEl) tipEl.hidden = true; };
  let lastTouch = false, toastEl = null, toastT = 0;
  addEventListener('pointerdown', (e) => { lastTouch = e.pointerType === 'touch'; }, true);
  const toast = (text) => { if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'fToast'; document.body.appendChild(toastEl); }
    toastEl.textContent = text.split('\n').slice(0, 2).join('\n'); toastEl.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { toastEl.hidden = true; }, 2600); };
  // a sheet dropped on a card: cut in 4 (2×2), added to the game on this device, then to the repo for the others (importer.js)
  async function onUpload(e) {
    const inp = e.target.closest && e.target.closest('[data-up]'); if (!inp || !inp.files[0]) return;
    const n = needs().find((x) => x.key === inp.dataset.up), file = inp.files[0]; inp.value = '';
    if (!n || !window.IMPORT) { msg = 'Importer pas chargé'; return render(); }
    try { msg = 'Découpe…'; render(); await IMPORT.extra(file, n.spec, (t) => { msg = t; render(); }); msg = await IMPORT.add(); }
    catch (err) { msg = err.message || 'Cette image ne s’ouvre pas.'; }
    render();
  }
  function mount(root) {
    // on a phone (no hover), a tap also says briefly, at the bottom, what was just touched
    root.onclick = (e) => { if (held) { held = false; e.stopPropagation(); return; } tipHide();
      const t = e.target.closest('[data-tip]'), say = lastTouch && t && el.contains(t) ? t.dataset.tip : ''; onClick(e); if (say) toast(say); };
    el = root; msg = ''; render();
    root.onchange = onUpload;
    root.onmouseover = (e) => { if (e.pointerType === 'touch') return; const t = e.target.closest('[data-tip]'); if (t && el.contains(t)) tipShow(t); else tipHide(); };
    root.onmouseleave = tipHide;
    root.onpointerdown = (e) => { if (e.pointerType !== 'touch') return; held = false; clearTimeout(holdT); const t = e.target.closest('[data-tip]');
      if (t) holdT = setTimeout(() => { held = true; tipShow(t); }, 450); };
    root.onpointerup = root.onpointercancel = () => { clearTimeout(holdT); if (held) setTimeout(tipHide, 1800); };
    root.oncontextmenu = (e) => { if (e.target.closest('[data-tip]')) e.preventDefault(); };
    const sc = root.closest('#forge'); if (sc) sc.onscroll = tipHide;
  }
  return { mount, PILLARS, FLAWS, sheet, seed, events, episodes, conflicts, planOf, plotText, line, chains, state: actState };
})();
