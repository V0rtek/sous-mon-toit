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
      ['Sa cape sur la chaise', 'info', (c) => `La cape ${de(c.x)} sur sa chaise, ${c.x} n’est plus là`, (c) => `${c.xE}'s cloak is still on the chair; ${c.xE} is gone`],
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

  // ---- the state, kept on this phone ----
  const KEY = 'smt-forge2';
  const BASE = () => ({ decor: 'taverne', cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['charmeur', 'genie'], ruby: ['mysterieux'], amare: ['chef', 'charmeur'], melissa: ['protecteur'] },
    flaw: { justin: 'lache' }, want: { justin: { v: 'love', t: 'ruby' }, amare: { v: 'love', t: 'ruby' } }, rel: { 'amare|ruby': 'couple', 'justin|melissa': 'friend' },
    infos: [{ id: 'villain', x: 'amare' }, { id: 'exes', x: 'justin', y: 'ruby' }], inc: { k: 'shift', who: 'amare' }, hard: { liked: 1 }, tq: {}, picked: {} });
  let S = (() => { try { const s = JSON.parse(ls(KEY)); if (s && Array.isArray(s.cast)) { if (!Array.isArray(s.infos)) s.infos = []; if (!s.tq) s.tq = {}; if (!s.picked) s.picked = {}; return { ...BASE(), ...s }; } } catch { /* none yet */ } return BASE(); })();
  const save = () => ls(KEY, JSON.stringify(S));
  let el = null, msg = '', openK = null;

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
  // the infos in play: their people still in the story
  const infos = () => (S.infos || []).filter((i) => IN[i.id] && live(i.x) && (IN[i.id].s < 2 || live(i.y)));
  const infoFr = (i) => IN[i.id].fr(nm(i.x), nm(i.y)), infoEn = (i) => IN[i.id].en(en(i.x), en(i.y));
  const kinds = (k) => infos().filter((i) => IN[i.id].k === k);
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
  const hardOk = (h) => (h === 'liked' ? !!roles().against : h === 'danger' ? S.inc.k === 'gone' || people().some((id) => { const w = wantOf(id); return w && ['find', 'free'].includes(w.v); }) : h === 'gag' ? kinds('secret').length > 0 : true);

  // ---- OUTPUT: ONE line of events, in story order, then cut into episodes. An event: { id, kind (its techniques: TQ),
  // part: setup | reveal | crisis | end, e, glue (stays with the next one), info (the info it reveals or hints) } and,
  // once its technique is applied: n (the technique), g (its goal), fr, en. The cuts: automatic (each episode about 4
  // events, the reveals together, the impossible choice, then what it cost), or moved by hand; every episode but the
  // crisis and the end closes on a ⚖️ choice ----
  function line() {
    const r = roles(), x = incWho(), inc = by(INC, S.inc.k), jw = wantOf(J), cs = conflicts();
    const secs = kinds('secret'), masks = kinds('mask'), pasts = kinds('past'), objs = kinds('object'), hidden = [...secs, ...masks];
    const H = (id) => S.hard[id] && hardOk(id);
    const jWant = jw || { v: S.inc.k === 'gone' ? 'find' : 'love', t: r.target };
    const wFr = W[jWant.v].t ? `${W[jWant.v].n.toLowerCase()} ${nm(jWant.t)}` : W[jWant.v].n.toLowerCase();
    const base = { x: nm(x), xE: en(x), t: nm(r.target), tE: en(r.target), a: nm(r.against || x), aE: en(r.against || x), d: nm(r.b), dE: en(r.b),
      w: wFr, wE: W[jWant.v].en(en(jWant.t)).replace(/^wants /, ''), px: pillarsOf(x)[0], pxEn: (P[pillarsOf(x)[0]] || {}).exp };
    const L = [], put = (id, kind, part, e, extra = {}) => L.push({ id, kind, part, e, glue: false, ...extra, c: { ...base, ...(extra.c || {}) } });
    const ic = (i) => ({ i: infoFr(i), iE: infoEn(i), s: nm(i.x), sE: en(i.x) });
    put('hook1', 'hook', 'setup', '🎬', { def: S.inc.k === 'gone' ? 1 : 0 });
    put('hook2', 'hook', 'setup', '🎬', { def: inc.enter ? 2 : 4 });
    put('want', 'want', 'setup', W[jWant.v].e);
    if (inc.enter) {
      put('expect', 'expect', 'setup', '🗣️', { glue: true }); put('tease', 'tease', 'setup', '⏰', { glue: true });
      put('inc', 'enter', 'setup', '💥', { scene: true });
    } else put('inc', 'gone', 'setup', '👻', { scene: true });
    if (cs[0]) put('c0', 'conflict', 'setup', cs[0].e, { c: { o: cs[0].fr, oE: cs[0].en } });
    if (pasts[0]) put('past0', 'past', 'setup', '🕰️', { c: ic(pasts[0]), info: pasts[0] });
    objs.forEach((i, k) => put(`obj${k}`, 'seen', 'setup', IN[i.id].e, { c: ic(i), info: i, hint: true }));
    if (hidden.length) put('plant1', 'plant', 'setup', '🌱', { c: ic(hidden[0]), info: hidden[0], hint: true });
    cs.slice(1).forEach((o, k) => put(`c${k + 1}`, 'conflict', 'setup', o.e, { c: { o: o.fr, oE: o.en }, def: (k + 1) % 4 }));
    if (H('liked') && r.against) put('liked', 'liked', 'setup', '😇');
    if (H('danger')) put('danger', 'danger', 'setup', '🌲');
    pasts.slice(1).forEach((i, k) => put(`past${k + 1}`, 'past', 'setup', '🕰️', { c: ic(i), info: i, def: 1 }));
    put('easy', 'easy', 'setup', '↘️');
    if (hidden.length) put('plant2', 'plant', 'setup', '🌱', { c: ic(hidden[hidden.length - 1]), info: hidden[hidden.length - 1], hint: true });
    if (H('gag') && secs[0]) put('gag', 'gag', 'setup', '🤐', { c: ic(secs[0]) });
    hidden.forEach((i, k) => put(`rev${k}`, 'reveal', 'reveal', IN[i.id].e, { c: ic(i), info: i, scene: !k }));
    objs.forEach((i, k) => put(`open${k}`, 'open', 'reveal', IN[i.id].e, { c: ic(i), info: i, scene: !k && !hidden.length }));
    if (hidden.length || objs.length) put('twist', 'twist', 'reveal', '🔄');
    if (H('clock')) put('clock', 'clock', 'crisis', '⏳', { glue: true });
    put('pick', 'pick', 'crisis', '⚖️', { opts: [nm(r.a), nm(r.b)] });
    put('cost', 'cost', 'end', '💔', { scene: true }); put('end', 'end', 'end', '❔');
    return L.map(withTech);
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
    danger: { g: ['stakes'], def: 'Mention consequences', fr: () => 'Un lieu dangereux à traverser', en: () => 'a dangerous place to cross' },
    easy: { g: ['stakes'], def: 'Mention consequences', fr: (c) => `Justin tente la facilité ; ça rate devant ${c.t}`, en: (c) => `justin tries the easy way; it fails in front of ${c.tE}` },
    gag: { g: ['stakes'], def: 'Aveu vulnérable', fr: (c) => `Le secret ${de(c.s)} le bloque`, en: (c) => `${c.sE}'s secret binds him` },
    clock: { g: ['stakes'], def: 'Mention consequences', fr: () => 'Il faut trancher maintenant', en: () => 'it must be decided now' },
    past: { g: ['rel', 'info'], def: 'Shared memory', fr: (c) => c.i, en: (c) => c.iE },
    seen: { g: ['callback'], def: 'Objet planté', fr: (c) => `${c.i} : vu, pas ouvert`, en: (c) => `${c.iE}: seen, not opened` },
    plant: { g: ['callback'], def: 'Seed & payoff (surprise)', fr: (c) => `Indice semé → ${c.i}`, en: (c) => `a hint, unnoticed (it will give away: ${c.iE})` },
    reveal: { g: ['info', 'callback'], def: 'Demande qui révèle', fr: (c) => c.i, en: (c) => `it comes out: ${c.iE}` },
    open: { g: ['info'], def: 'Demande qui révèle', fr: (c) => `${c.i} : ouvert`, en: (c) => `${c.iE}: opened at last` },
    twist: { g: ['callback'], def: 'Écho', fr: () => 'Tout prend un autre sens', en: () => 'everything seen before means something else' },
  };
  const leaves = (list) => (list || []).flatMap((t) => (t.s && t.s.length ? leaves(t.s) : [t]));
  // the ways an event can be done: [{ n, d, g, ex, need, see, give, parts, carrier }]
  function optsOf(ev) {
    const k = K[ev.kind], GS = (window.PLAN && PLAN.GOALS) || [];
    if (k && GS.length) return k.g.flatMap((g) => { const G2 = GS.find((x) => x.id === g); return G2 ? leaves(G2.tech).map((t) => ({ ...t, g })) : []; });
    return (TQ[ev.kind] || []).map(([n, g]) => ({ n, g, d: '' }));
  }
  function withTech(ev) {
    const list = optsOf(ev), k0 = K[ev.kind], defN = k0 && (typeof k0.def === 'function' ? k0.def(ev.c) : k0.def);
    const def = ev.def ?? Math.max(0, list.findIndex((t) => t.n === defN));
    const k = ((S.tq[ev.id] ?? def) % list.length + list.length) % list.length, t = list[k];
    if (k0 && window.PLAN) return { ...ev, k, n: t.n, g: t.g, tech: t, fr: k0.fr(ev.c), en: `${k0.en(ev.c)}; done with "${t.n}": ${t.d}` };
    const [, , fr, enF] = TQ[ev.kind][k];
    return { ...ev, k, n: t.n, g: t.g, tech: t, fr: fr(ev.c), en: enF(ev.c) };
  }

  // the automatic cuts (after index i): the setup in chunks of about 4 (never inside a glued group), then a cut after the
  // setup, after the reveals, after the impossible choice
  function autoCuts(L) {
    const cuts = [], last = (part) => L.map((x) => x.part).lastIndexOf(part), su = last('setup');
    const n = su + 1, k = Math.max(1, Math.round(n / 4)), size = n / k;
    for (let c = 1; c < k; c++) { let i = Math.round(c * size) - 1; while (i < su && L[i].glue) i++; if (i < su && !cuts.includes(i)) cuts.push(i); }
    const lone = L.filter((x) => x.part === 'crisis').length < 2;   // the impossible choice alone: it closes the reveal's episode
    for (const i of [su, lone ? -1 : last('reveal'), last('crisis')]) if (i >= 0 && i < L.length - 1 && !cuts.includes(i)) cuts.push(i);
    return cuts.sort((a, b) => a - b);
  }
  const sigOf = (L) => L.map((x) => x.id).join(',');
  const cutsOf = (L) => (S.cut && S.cut.sig === sigOf(L) ? S.cut.at.filter((i) => i < L.length - 1) : autoCuts(L));
  // the episodes: their events (with the index in the line), a ⚖️ choice added at the end of each but the crisis and the
  // end, and the act's step they stand for (act.js ARC: 0 the first, 1 the setup after, 2 the reveal, 3 the choice, 4 the cost)
  // ---- the causal chain (03/11): every event follows from the one before, « donc » (a consequence) or « mais » (it gets
  // harder): never « et puis ». An episode's choice comes from its issue (its last conflict, arrival, lie, secret...):
  // two options, each with what it causes; that consequence opens the next episode (the one played, once it's marked, or
  // both). The choices made weigh on the final one ----
  const ISSUE = ['conflict', 'liked', 'easy', 'gag', 'danger', 'reveal', 'enter', 'gone', 'past', 'want', 'seen', 'plant'];
  const BUT = new Set(['conflict', 'liked', 'danger', 'easy', 'gag', 'reveal', 'clock', 'gone', 'pick']);
  const link = (ev) => (BUT.has(ev.kind) ? ['mais', 'But'] : ['donc', 'So']);
  // [option, what it causes (fr), (en)] × 2, from the issue's people
  const OPT = {
    conflict: (c) => [[`Défier ${c.a} devant tous`, `${c.a} le prend mal : c’est la guerre ouverte`, `${c.aE} takes it badly: open war`], [`Laisser ${c.t} choisir`, `${c.t} se rapproche ${de(c.a)}`, `${c.tE} grows closer to ${c.aE}`]],
    enter: (c) => [[`Tenir tête à ${c.x}`, `${c.x} le remarque : rival déclaré`, `${c.xE} notices him: a declared rival`], [`Se ranger derrière ${c.x}`, `${c.x} lui doit une faveur ; ${c.d} est déçu·e`, `${c.xE} owes him a favour; ${c.dE} is let down`]],
    gone: (c) => [[`Partir chercher ${c.x} tout de suite`, 'Justin part seul, sans prévenir personne', 'justin leaves alone, telling no one'], ['Cacher la disparition', 'Quelqu’un découvre qu’il savait', 'someone finds out he knew']],
    past: (c) => [['Avouer qu’il y pense encore', `${c.t} hésite… et ${c.a} a tout entendu`, `${c.tE} hesitates... and ${c.aE} heard everything`], ['Faire comme si c’était fini', `${c.t} le croit, et s’éloigne`, `${c.tE} believes him, and drifts away`]],
    liked: (c) => [[`Dénoncer ${c.a} devant tous`, 'La salle se retourne contre Justin', 'the whole room turns against justin'], [`Jouer le jeu ${de(c.a)}`, `${c.d} le trouve lâche`, `${c.dE} thinks he is a coward`]],
    easy: (c) => [['Avouer le mensonge', `${c.t} lui en veut, mais reste`, `${c.tE} is angry, but stays`], ['Mentir encore', 'Le mensonge grossit : il faudra le payer', 'the lie grows: it will have to be paid for']],
    gag: (c) => [['Dire le secret', `${c.s} perd tout, et sait que c’est lui`, `${c.sE} loses everything, and knows it was him`], ['Le garder', `${c.s} lui doit tout… et le menace quand même`, `${c.sE} owes him everything... and threatens him anyway`]],
    plant: (c) => [['Poser la question', `${c.s} esquive, mais tout le monde a vu sa réaction`, `${c.sE} dodges, but everyone saw the reaction`], ['Laisser passer', 'Le détail reste là, personne ne le relève', 'the detail stays there, nobody picks it up']],
    seen: (c) => [['Le prendre', `${c.s} le voit faire`, `${c.sE} sees him do it`], ['Ne pas y toucher', 'Quelqu’un d’autre le prend', 'someone else takes it']],
    danger: (c) => [['Y aller seul', 'Personne ne sait où il est', 'nobody knows where he is'], [`Y emmener ${c.d}`, `${c.d} est en danger à cause de lui`, `${c.dE} is in danger because of him`]],
    reveal: (c) => [['Le dire à tous', `${c.s} est exposé, et Justin aussi`, `${c.sE} is exposed, and so is justin`], ['Le garder pour lui', 'Justin a un moyen de pression… et un secret de plus', 'justin has leverage... and one more secret']],
    want: (c) => [[`Tenter sa chance avec ${c.t}`, `${c.t} est touché·e… et ${c.a} l’a vu`, `${c.tE} is touched... and ${c.aE} saw it`], ['Garder ça pour lui', `${c.d} le pousse : « Si tu dis rien, c’est fini. »`, `${c.dE} pushes him: "Say nothing and it's over."`]],
  };
  // what an event does for the story (03/11), in 4 kinds: eng = engaged in a character or a bond (by which technique),
  // cur = a question now open, stake = an obstacle or conflict added (to which desire), moved = what changed (revealed,
  // chosen, arrived, gone...). [fr, en] each
  function gives(ev) {
    const c = ev.c, g = {}, k = ev.kind, J2 = 'Justin';
    const add = (key, fr, en2) => { (g[key] = g[key] || []).push([fr, en2]); };
    const onJ = (o) => /Justin|justin/.test(o);
    if (k === 'want') add('eng', `Désir de Justin (${c.w}) : ${ev.n.toLowerCase()}`, `justin's desire (${c.wE}), shown by: ${ev.n}`);
    if (k === 'enter') { const pl = P[c.px] || {}; add('eng', `${c.x}, ${(pl.n || '').replace(/^L[ea’] ?/, '')} : ${ev.n.toLowerCase()}`, `${c.xE} as ${(pl.en || '').split(' (')[0]}: ${(pl.surEn || '')}`); add('moved', `${c.x} arrive`, `${c.xE} arrives`); }
    if (k === 'gone') { add('cur', `Où est ${c.x} ?`, `where is ${c.xE}?`); add('moved', `${c.x} disparaît`, `${c.xE} disappears`); }
    if (k === 'expect') add('cur', `Qui est ${c.x} ?`, `who is ${c.xE}?`);
    if (k === 'tease') add('cur', `${c.x} arrive : que va-t-il faire ?`, `${c.xE} is coming: what will they do?`);
    if (k === 'hook') { const h = ev.k;
      if (h === 0) add('eng', `${c.t}, attirance : entrée qui fait taire`, `${c.tE}, attraction: the room goes quiet`);
      if (h === 5) add('eng', `${J2} × ${c.t}, attirance : taquinerie de trop`, `justin and ${c.tE}, attraction: a tease too long`);
      if (h === 1) add('cur', 'Qui manque ?', 'who is missing?'); if (h === 2) add('cur', 'Qui arrive ce soir ?', 'who arrives tonight?');
      if (h === 3) add('cur', 'Que dit la lettre ?', 'what does the letter say?'); if (h === 4) add('stake', 'Une entrée que tout le monde redoute', 'an entrance everyone dreads'); }
    if (k === 'conflict') add('stake', onJ(c.o) ? `Obstacle au désir de Justin (${c.w}) : ${c.o}` : c.o, onJ(c.oE) ? `obstacle to justin's desire (${c.wE}): ${c.oE}` : c.oE);
    if (k === 'past') { add('eng', `Leur lien : ${ev.n.toLowerCase()}`, `their bond: ${ev.n}`); add('moved', `Révélé : ${c.i}`, `revealed: ${c.iE}`); }
    if (k === 'seen') add('cur', `Qu’y a-t-il dans ${c.i.replace(/^(Une|Un|La|Le) /, (m) => m.toLowerCase())} ?`, `what is in ${c.iE}?`);
    if (k === 'liked') add('stake', `Obstacle au désir de Justin : ${c.a}, adoré de tous`, `obstacle to justin's desire: ${c.aE}, loved by everyone`);
    if (k === 'danger') add('stake', 'Obstacle : un lieu dangereux à traverser', 'obstacle: a dangerous place to cross');
    if (k === 'easy') { add('stake', `La confiance ${de(c.t)}`, `${c.tE}'s trust`); add('moved', 'Le mensonge de Justin éclate', 'justin\'s lie blows up'); }
    if (k === 'gag') add('stake', `Le secret ${de(c.s)} le bloque`, `${c.sE}'s secret binds him`);
    if (k === 'reveal' || k === 'open') add('moved', `Révélé : ${c.i}`, `revealed: ${c.iE}`);
    if (k === 'clock') add('stake', 'Le temps : trancher maintenant', 'time: it must be decided now');
    if (k === 'choice') { const pk2 = S.picked[ev.id]; add('moved', pk2 != null ? `Choix : ${ev.opts[pk2][0]}` : `Choix : ${ev.opts[0][0]} ou ${ev.opts[1][0]}`, pk2 != null ? `chose: ${ev.opts[pk2][0]}` : `a choice: ${ev.opts[0][0]} or ${ev.opts[1][0]}`); }
    if (k === 'conseq' && c.picked) add('moved', ev.fr, ev.en);
    if (k === 'pick') add('moved', `Choix final : ${c.t} ou ${c.d}`, `the final choice: ${c.tE} or ${c.dE}`);
    if (k === 'cost') add('moved', 'Ce que le choix a coûté', 'what the choice cost');
    return g;
  }
  const LED = [['eng', '❤️', 'Engagé dans les persos et les liens : quoi, et par quelle technique'], ['cur', '❓', 'Curiosité : les questions ouvertes'],
    ['stake', '⚔️', 'Enjeux : l’obstacle ou le conflit ajouté, et à quel désir'], ['moved', '➡️', 'L’histoire avance : ce qui a changé']];
  function episodes() {
    const L = line(), cuts = cutsOf(L), eps = []; let cur = [];
    L.forEach((ev, i) => { cur.push({ ...ev, i }); if (cuts.includes(i)) { eps.push(cur); cur = []; } }); if (cur.length) eps.push(cur);
    let ch = 0, prev = null, lastIssue = null; const built = [];
    return eps.map((evs, n) => { const has = (p) => evs.some((x) => x.part === p);
      const stage = has('crisis') ? 3 : has('end') && !has('setup') && !has('reveal') ? 4 : has('reveal') ? 2 : n === 0 ? 0 : 1;
      const list = evs.slice();
      // what the last choice caused opens this episode
      if (prev) { const pk2 = S.picked[prev.id], o = prev.opts;
        const fr = pk2 != null ? o[pk2][1] : `Si « ${o[0][0]} » : ${o[0][1]} · Si « ${o[1][0]} » : ${o[1][1]}`;
        const en2 = pk2 != null ? `because justin chose "${o[pk2][0]}": ${o[pk2][2]}` : `depending on the last choice: if "${o[0][0]}", ${o[0][2]}; if "${o[1][0]}", ${o[1][2]}`;
        if (pk2 != null) built.push([`« ${o[pk2][0]} »`, o[pk2][0]]);
        list.unshift({ id: `cq${n}`, kind: 'conseq', part: 'setup', e: '↪️', fr, en: en2, n: 'La conséquence du choix', g: 'stakes', k: 0, c: { picked: pk2 != null } }); prev = null; }
      const pick = list.find((x) => x.kind === 'pick');
      if (pick && built.length) { pick.en += `; what his earlier choices built weighs on it (${built.map((b) => b[1]).join(', ')})`; pick.built = built.map((b) => b[0]); }
      if (!has('crisis') && !has('end')) { ch++;
        // the issue: the strongest one of the episode (a conflict before a lie before a secret...), not the last choice's again
        const cand = evs.filter((x) => OPT[x.kind]).sort((a, b) => ISSUE.indexOf(a.kind) - ISSUE.indexOf(b.kind));
        const issue = cand.find((x) => x.kind !== lastIssue) || cand[0] || evs[0]; lastIssue = issue.kind;
        const opts = (OPT[issue.kind] || OPT.want)(issue.c);
        const chEv = withTech({ id: `ch${ch}`, kind: 'choice', part: 'choice', e: '⚖️', choice: 1, c: {}, opts, issue: issue.id });
        chEv.fr = `${opts[0][0]} / ${opts[1][0]}`; chEv.en = `"${opts[0][0]}" (then ${opts[0][2]}) or "${opts[1][0]}" (then ${opts[1][2]}); ${chEv.en}`;
        list.push(chEv); prev = chEv; }
      // what the episode leaves the audience with
      const led = { eng: [], cur: [], stake: [], moved: [] };
      for (const ev of list) { const g = gives(ev); for (const [key] of LED) if (g[key]) led[key].push(...g[key]); }
      return { list, stage, led }; });
  }
  const events = () => episodes().map((x) => x.list);
  const chOpts = () => { const r = roles(); return [`Aller vers ${nm(r.target)}`, `Garder ${nm(r.b)}`]; };
  // an event as the prompts say it: its link to the one before (So / But), then what happens
  const evEn = (ev, i) => `${i ? `${link(ev)[1]}, ` : ''}${ev.kind === 'enter' || ev.kind === 'gone' ? 'INCITING INCIDENT: ' : ev.kind === 'pick' ? 'the impossible choice, the last of the episode: ' : ev.kind === 'choice' ? 'the main choice of the episode, its last: ' : ev.kind === 'conseq' ? 'what the last choice caused: ' : ''}${ev.en}.`;

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
    cost: { base: [['Show painful consequences', 'painfulConsequences']] },
    end: { base: [['Open loop', 'openLoop']] },
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
        if (b.dataset.way != null) { S.tq[b.dataset.ev] = +b.dataset.way; save(); render(); const ev2 = [...line(), ...events().flat()].find((x) => x.id === b.dataset.ev); if (ev2) details(ev2); } }; }
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

  // ---- 🎬 an episode's plan for Plan de scène, made here (no AI): its events = the rectangles of box "ep", in order,
  // each with its technique's goal and name, what it does (concrete), the info it reveals or hints; a choice gets its 2
  // options; box "later" = the start of the next episode; the links: a promise to its arrival, a stake to its choice, a
  // plant to its reveal, an object seen to its opening. Then the plan's prompt 2 writes the lines ----
  function planOf(n) {
    const EP = episodes(), ep = EP[n] || EP[0], next = EP[n + 1], IL = infos(), iid = (i) => 'i' + (IL.indexOf(i) + 1);
    const ids = {}; let k = 0;
    const beat = (ev, pre) => { const id = pre + (++k); ids[ev.id] = id; const ch = ev.choice || ev.kind === 'pick';
      const b = { id, goals: ch || !ev.g ? [] : [ev.g], tech: ch ? '' : ev.n, lines: ch ? 2 : 3, what: (ev.scene && pre === 'r' && k > 1 ? 'Nouvelle scène. ' : '') + ev.fr };
      if (ch) { b.kind = 'choice'; b.opts = (ev.opts || chOpts()).map((o) => (Array.isArray(o) ? o[0] : o)); b.what = ev.choice ? `Choix : ${ev.opts.map((o) => `${o[0]} (→ ${o[1]})`).join(' / ')}` : ev.fr; }
      if (ev.info) b[ev.hint ? 'hints' : 'reveals'] = [iid(ev.info)];
      return b; };
    const orig = ep.list.slice(), epBeats = ep.list.map((ev) => beat(ev, 'r')); k = 0;
    epBeats.forEach((b, j) => { if (j && !b.kind) b.what = (link(ep.list[j])[0] === 'mais' ? 'Mais : ' : 'Donc : ') + b.what; });
    // one line, two jobs (03/11): a moment that can ride in another (a seed, a planted question) climbs into the latest
    // carrier before it (Tell a story, Shared memory, Show contrast...) instead of having its own rectangle
    const evOf = (b) => ep.list[epBeats.indexOf(b)], carrierBefore = (b) => { for (let q = epBeats.indexOf(b) - 1; q >= 0; q--) { const e2 = ep.list[q]; if (e2 && e2.tech && e2.tech.carrier && !epBeats[q].kind) return epBeats[q]; } return null; };
    for (const b of epBeats.slice()) { const ev = evOf(b); if (!ev || ev.kind !== 'plant') continue; const cr = carrierBefore(b); if (!cr) continue;
      (cr.carries = cr.carries || []).push({ tech: ev.n, part: `Le seed : ${ev.c.i}` }); cr.hints = [...new Set([...(cr.hints || []), ...(b.hints || [])])];
      ids[ev.id] = cr.id; epBeats.splice(epBeats.indexOf(b), 1); ep.list = ep.list.filter((x) => x !== ev); }
    const laterEvs = next ? next.list.filter((ev) => !ev.choice).slice(0, 2) : [], laterBeats = laterEvs.map((ev) => beat(ev, 'f'));
    const all = [...orig, ...laterEvs], links = [], ln = (a, b, label) => { if (ids[a] && ids[b]) links.push({ from: ids[a], to: ids[b], label }); };
    ln('expect', 'inc', 'La promesse : on l’attend'); ln('tease', 'inc', 'Annoncé : il arrive');
    ep.list.forEach((ev, j) => { const prev = ep.list[j - 1]; if ((ev.choice || ev.kind === 'pick') && prev && prev.g === 'stakes') ln(prev.id, ev.id, 'L’enjeu du choix'); });
    for (const ev of all) if (ev.kind === 'plant' || ev.kind === 'seen') { const to = all.find((x) => (x.kind === 'reveal' || x.kind === 'open') && x.info === ev.info); if (to) ln(ev.id, to.id, ev.kind === 'plant' ? 'Planté → révélé' : 'Vu → ouvert'); }
    // a technique with moments (Coincé devant tous, Seed & payoff): its « now » is the event; the others are placed before
    // it by rule (early: as early as possible, in a carrier if it can ride; mid: between; before: right before), linked
    let t = 0; const planted = line().some((x) => x.kind === 'plant');
    for (const ev of ep.list.slice()) {
      const parts = ev.tech && ev.tech.parts; if (!parts || !ids[ev.id]) continue;
      const at = () => epBeats.findIndex((b) => b.id === ids[ev.id]), chain = [];
      const mk = (pt) => ({ id: 't' + (++t), goals: ev.g ? [ev.g] : [], tech: ev.n, lines: 2, what: `${pt.n}${ev.c && ev.c.x && ev.kind === 'enter' ? ` (sur ${ev.c.x})` : ''} : ${pt.d}` });
      for (const pt of parts) {
        if (pt.at === 'now') continue;
        if (pt.at === 'early' && ev.kind === 'reveal' && planted) continue;   // its seed is already a 🌱
        if (pt.at === 'early') { const cr = pt.carry ? epBeats.slice(0, at()).find((b) => { const e2 = evOf(b); return e2 && e2.tech && e2.tech.carrier && !b.kind; }) : null;
          if (cr) { (cr.carries = cr.carries || []).push({ tech: ev.n, part: pt.n }); chain.push(cr.id); } else { const nb = mk(pt); epBeats.splice(Math.min(1, at()), 0, nb); chain.push(nb.id); } }
        if (pt.at === 'mid') { const from = chain.length ? epBeats.findIndex((b) => b.id === chain[chain.length - 1]) + 1 : 0, nb = mk(pt); epBeats.splice(Math.max(from, Math.floor((from + at()) / 2)), 0, nb); chain.push(nb.id); }
        if (pt.at === 'before') { const nb = mk(pt); epBeats.splice(at(), 0, nb); chain.push(nb.id); }
      }
      chain.push(ids[ev.id]);
      for (let q = 0; q < chain.length - 1; q++) if (chain[q] !== chain[q + 1]) links.push({ from: chain[q], to: chain[q + 1], label: `${ev.n} : ${(parts.filter((pt) => pt.at !== 'now')[q] || parts[parts.length - 1]).n}` });
    }
    const title = `${(ACT.get && ACT.get().seed && ACT.get().title) || 'Créer'} · épisode ${n + 1}`;
    return { title, scene: S.decor, turn: ep.list[ep.list.length - 1].fr, needs: [],
      chars: S.cast.map((id) => ({ id, name: nm(id), sprite: sprite(id), traits: pillarsOf(id).map((p) => P[p].n.replace(/^L[ea’] ?/, '')), infos: IL.filter((i) => i.x === id || i.y === id).map(iid) })),
      infos: IL.map((i) => ({ id: iid(i), text: infoFr(i) })),
      boxes: [{ id: 'ep', title: `Épisode ${n + 1}`, col: 0, beats: epBeats }, { id: 'later', title: 'Plus tard', col: 1, beats: laterBeats }], links };
  }
  // ---- 📄 the plot as text: Quoi, Comment, Ce qui arrive (what this screen shows, nothing else) ----
  function plotText() {
    const L = [], x = incWho(), d = DECORS.find((o) => o.id === S.decor) || DECORS[0];
    L.push('QUOI', `${d.e} ${d.n}`);
    for (const id of people()) { const w = wantOf(id), f = S.flaw[id] && F[S.flaw[id]];
      L.push(`${nm(id)}${id === J ? ' (le joueur)' : ''} : ${pillarsOf(id).map((p) => `${P[p].e} ${P[p].n}`).join(' + ') || '—'}${f ? ` · ${f.e} ${f.n}` : ''}${w ? ` · ${W[w.v].e} veut ${W[w.v].n.toLowerCase()}${W[w.v].t ? ' ' + nm(w.t) : ''}` : ''}`); }
    const rels = Object.entries(S.rel).filter(([kk, v]) => v && kk.split('|').every(live)); if (rels.length) L.push('Liens : ' + rels.map(([kk, v]) => `${kk.split('|').map(nm).join(' ' + R[v].e + ' ')}`).join(' · '));
    if (infos().length) L.push('Infos : ' + infos().map((i) => `${IN[i.id].e} ${infoFr(i)}`).join(' · '));
    L.push('', 'COMMENT', `${by(INC, S.inc.k).e} ${nm(x)} : ${by(INC, S.inc.k).n.toLowerCase()}`);
    for (const c of conflicts()) L.push(`${c.e} ${c.fr}`);
    const hard = HARD.filter((h) => S.hard[h.id] && hardOk(h.id)); if (hard.length) L.push('Pourquoi c’est dur : ' + hard.map((h) => `${h.e} ${h.n}`).join(' · '));
    L.push('', 'CE QUI ARRIVE');
    episodes().forEach(({ list, led }, n) => { L.push(`Épisode ${n + 1}`);
      list.forEach((ev, k) => { L.push(`  ${k ? link(ev)[0] + ' ' : ''}${ev.e} ${ev.choice ? `Choix : ${ev.opts.map((o, i) => `${S.picked[ev.id] === i ? '✓ ' : ''}${o[0]} (→ ${o[1]})`).join(' / ')}` : ev.fr}  (${ev.n})`); });
      for (const [key, e2] of LED) if (led[key].length) L.push(`  ${e2} ${led[key].map((x) => x[0]).join(' · ')}`); });
    return L.join('\n');
  }

  // ---- the seed: what the act's prompt and every episode's plan prompt carry (act.js) ----
  function seed() {
    const r = roles(), x = incWho(), cs = conflicts();
    const who = (id) => { const ps = pillarsOf(id), f = S.flaw[id] && F[S.flaw[id]], w = wantOf(id);
      return `- ${id === J ? 'justin (the player)' : `${en(id)} (id "${id}")`}: ${ps.length ? ps.map((p, i) => (i ? `mixed with ${P[p].en}` : P[p].en)).join(', ') : 'free'}${f ? `; flaw: ${f.en}` : ''}${w ? `; ${W[w.v].en(en(w.t))}` : ''}.`; };
    const rels = Object.entries(S.rel).filter(([k, v]) => v && k.split('|').every(live)).map(([k, v]) => `- ${k.split('|').map(en).join(' and ')}: ${R[v].en}`);
    const facts = infos().map((i) => `- ${infoEn(i)}`);
    const hard = HARD.filter((h) => S.hard[h.id] && hardOk(h.id)).map((h) => `- ${h.en}`);
    const EP = episodes(), E = EP.map((x) => x.list), epText = EP.map(({ list, led }) => list.map((ev, i) => `- ${evEn(ev, i)}`).join('\n') + `\n- WHAT THIS EPISODE MUST DO: ${[led.eng.length ? `engage the audience in: ${led.eng.map((x) => x[1]).join('; ')}` : '', led.cur.length ? `open the questions: ${led.cur.map((x) => x[1]).join('; ')}` : '', led.stake.length ? `raise the stakes: ${led.stake.map((x) => x[1]).join('; ')}` : '', led.moved.length ? `move the story: ${led.moved.map((x) => x[1]).join('; ')}` : ''].filter(Boolean).join(' / ')}.`);
    const text = [`THE CHARACTERS (their pillar: what we follow them for; it shows in how they talk and act; their want):`, ...people().map(who),
      ...(rels.length ? ['THEIR RELATIONS:', ...rels] : []), ...(facts.length ? ['THE FACTS OF THE STORY (use exactly these; never invent another secret or past):', ...facts] : []),
      `THE INCITING INCIDENT: ${by(INC, S.inc.k).en(en(x))}.`,
      ...(cs.length ? ['THE CONFLICTS OF DESIRE (the story is these wants colliding):', ...cs.map((c) => `- ${c.en}`)] : []),
      ...(hard.length ? ['WHY IT IS HARD:', ...hard] : []),
      `THE CAUSAL CHAIN: every event follows from the one before, SO (a consequence) or BUT (it gets harder), never "and then"; every choice causes the next episode's first event.\nIn the arc: A = ${en(r.a)}, B = ${en(r.b)}; the impossible choice is ${en(r.a)} or ${en(r.b)}. The story is cut in ${E.length} episodes (the events below); the 5 "episodes" of the JSON are the 5 steps of the arc, in that order. Other characters may appear when the events need them.`].join('\n');
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
      infos: (() => { const out = [], two = (k) => { const c = INFOS.filter((i) => i.k === k), i = pick(c), x = pick([J, ...cast]); let y; do y = pick([J, ...cast]); while (y === x && cast.length);
        out.push({ id: i.id, x, y }); }; if (coin(0.7)) two(pick(['secret', 'mask'])); if (coin(0.5)) two('past'); if (coin(0.3)) two('object'); return out; })(), inc: { k, who: k === 'gone' ? T : O || T }, hard: { liked: coin(0.5) ? 1 : 0, clock: coin(0.4) ? 1 : 0, danger: 1, gag: 1 },
      picked: {}, tq: Object.fromEntries(['hook1', 'hook2', 'want', 'expect', 'tease', 'c0', 'c1', 'past0', 'plant1', 'plant2', 'liked', 'easy', 'rev0', 'twist', 'pick', 'cost'].map((id) => [id, Math.floor(Math.random() * 6)])) };
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
  // an event: its link to the one before (donc / mais), itself (a tap = another way), ⓘ (its details); a choice shows its
  // two options (a tap = the one played: its consequence opens the next episode); then the ✂ to cut after it
  function evHtml(ev, k, list) {
    const ch = ev.choice || ev.kind === 'pick', lk = k ? `<i class="fLk ${link(ev)[0]}" data-tip="${link(ev)[0] === 'mais' ? 'Mais : ça se complique' : 'Donc : la conséquence'}">${link(ev)[0]}</i>` : '';
    const opts = ev.choice ? `<span class="fOpts">${ev.opts.map((o, i) => `<button type="button" class="${S.picked[ev.id] === i ? 'on' : ''}" data-pickopt="${ev.id}:${i}" data-tip="${esc(`${o[0]}\n→ ${o[1]}\nUn tap = c’est ce qu’il a choisi`)}">${esc(o[0])}<small>→ ${esc(o[1])}</small></button>`).join('')}</span>` : '';
    const built = ev.built ? `<small class="fBuilt">Pèse : ${esc(ev.built.join(' · '))}</small>` : '';
    return `<span class="fRowEv">${lk}<button type="button" class="fEv${ch ? ' ch' : ''}${ev.kind === 'conseq' ? ' cq' : ''}" ${ev.kind === 'conseq' ? '' : `data-tq="${ev.id}"`} data-tip="${esc(`${ev.n}${optsOf(ev).length > 1 ? `\nUn tap = une autre façon (${ev.k + 1}/${optsOf(ev).length})` : ''}`)}"><b>${ev.e}</b>${esc(ev.choice ? 'Choix' : ev.fr)}${K[ev.kind] ? `<em class="fTn">${esc(ev.n)}</em>` : ''}</button>${PATHS[ev.kind] ? `<button type="button" class="fInfo" data-det="${ev.id}" data-tip="Plus de détails : d’où vient la technique, instructions, exemple">ⓘ</button>` : ''}${ev.i != null && list[k + 1] && list[k + 1].i != null ? `<button type="button" class="fGap" data-cut="${ev.i}" data-tip="Couper l’épisode ici">✂</button>` : ''}</span>${opts}${built}`;
  }
  function render() {
    if (!el) return;
    const inc = by(INC, S.inc.k), x = incWho(), cs = conflicts(), EPS = episodes(), hasKey = !!ls('smt-key');
    el.innerHTML = `<div class="fTop"><b>⚡ Créer</b><button type="button" class="fDice" data-x="dice" aria-label="Au hasard" data-tip="Tout au hasard">🎲</button></div>`
      // WHAT
      + layer('1', 'Quoi', 'Le lieu, les persos, ce qu’ils veulent, leurs liens, les infos')
      + row('📍', DECORS.map((o) => chip(`data-decor="${o.id}"`, o.e, o.n, o.id === S.decor, '#8e8e93', o.d)).join(''), 'Le lieu')
      + row('👥', POOL().map((id) => { const k = S.cast.indexOf(id); return `<button type="button" class="fFace${k >= 0 ? ' on' : ''}" data-cast="${id}" data-tip="${esc(nm(id))}">${face(id)}<small>${esc(nm(id))}</small></button>`; }).join(''), 'Qui est dans l’histoire avec Justin (tous ceux qui ont la feuille de base)')
      + people().map(person).join('')
      + (S.cast.length ? row('🔗', relRows(), 'Leurs liens : un tap change le lien') : '')
      + row('🗂️', INFO_K.map((k) => chip(`data-ik="${k.id}"`, k.e, k.n, openK === k.id, '#64d2ff', `${k.d}\nUn tap = la liste`)).join(''), 'Les infos : choisies dans une liste, rien à taper, rien d’inventé')
      + (openK ? `<div class="fPick">${INFOS.filter((i) => i.k === openK).map((i) => `<button type="button" data-iadd="${i.id}" data-tip="${esc(i.fr('X', 'Y'))}"><b>${i.e}</b>${esc(i.fr('X', 'Y'))}</button>`).join('')}</div>` : '')
      + (infos().length ? `<section class="fInfos">${infos().map((i) => { const k = (S.infos || []).indexOf(i), it = IN[i.id];
        return `<div><b data-tip="${esc(INFO_K.find((x) => x.id === it.k).n)}">${it.e}</b><button type="button" class="fCyc" data-icyc="${k}:x" data-tip="Un tap = le perso suivant">${mini(i.x)}</button>${it.s > 1 ? `<button type="button" class="fCyc" data-icyc="${k}:y" data-tip="Un tap = le perso suivant">${mini(i.y)}</button>` : ''}<span class="fCt">${esc(infoFr(i))}</span><button type="button" class="fX" data-idel="${k}" data-tip="Retirer">✕</button></div>`; }).join('')}</section>` : '')
      // HOW
      + layer('2', 'Comment', '1. Le moteur : ce qui lance et bloque l’histoire. 2. Les techniques de plot.')
      + row('💥', INC.map((o) => chip(`data-inc="${o.id}"`, o.e, o.n, o.id === S.inc.k, '#ff453a', o.d)).join('') + facePick('data-incwho', x, S.cast, '#ff453a'), 'Le déclencheur, et qui')
      + `<section class="fConf" data-tip="Les conflits de désir, trouvés à partir de ce que chacun veut et de leurs liens">${cs.length ? cs.map((c) => `<div>${mini(c.a)}<b>${c.e}</b>${mini(c.b)}<span class="fCt">${esc(c.fr)}</span></div>`).join('') : '<div class="none">⚠️ <span class="fCt">Pas de conflit : donne des 🎯 qui se croisent</span></div>'}</section>`
      + row('🧱', HARD.map((h) => { const ok = hardOk(h.id); return chip(`data-hard="${h.id}"`, h.e, h.n, ok && !!S.hard[h.id], '#bf5af2', ok ? h.d : `${h.d}\n${h.need}`, !ok); }).join(''), 'Pourquoi c’est dur (plusieurs à la fois)')
      // OUTPUT
      + layer('3', 'Ce qui arrive', 'Les événements des 5 épisodes, tirés du reste. Ils vont dans le prompt de chaque épisode.')
      + `<section class="fOut">${EPS.map(({ list, led }, n) => `${n ? `<button type="button" class="fCut" data-uncut="${EPS[n - 1].list.filter((ev) => ev.i != null).pop().i}" data-tip="✂️ Une coupe d’épisode. Un tap = recoller">✂️</button>` : ''}<div class="fEp"><div class="fEpH"><i>${n + 1}</i><button type="button" data-plan="${n}" data-tip="Ouvre le plan de cet épisode dans Plan de scène : rectangles, objectifs, liens. Sans IA">🎬</button><button type="button" data-playep="${n}" data-tip="Joue cet épisode : son plan (sans IA), puis Haiku écrit les répliques">▶</button></div><div>${list.map((ev, k) => evHtml(ev, k, list)).join('')}`
        + `<div class="fLed${LED.some(([key]) => led[key].length) ? '' : ' none'}">${LED.filter(([key]) => led[key].length).map(([key, e2, tip]) => `<p data-tip="${esc(tip)}"><b>${e2}</b>${led[key].map((x) => esc(x[0])).join(' · ')}</p>`).join('')}</div></div></div>`).join('')}${S.cut ? '<button type="button" class="fAuto" data-x="autocut" data-tip="Remettre les coupes automatiques">↺ Coupes auto</button>' : ''}</section>`
      + `<section class="fGo">${hasKey ? '' : '<input type="text" class="secret" autocomplete="off" autocapitalize="off" spellcheck="false" data-key="1" placeholder="Clé API (sk-ant-…)">'}`
      + '<button type="button" class="go" data-x="play" data-tip="Joue l’épisode 1 : son plan (sans IA), puis Haiku écrit les répliques">▶ Jouer</button><button type="button" data-x="plot" data-tip="Copie le plot : Quoi, Comment, Ce qui arrive, en texte">📄 Copier le plot</button><button type="button" data-x="copy" data-tip="Copie le prompt de l’acte pour un chat (la route par l’Acte) ; la réponse se colle dans Acte › Générer › 1">📋 Prompt de l’acte</button><button type="button" data-x="acte" data-tip="Ouvre l’acte : ses 5 épisodes, les plans">Acte ›</button></section>'
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
    else if (d.ik) openK = openK === d.ik ? null : d.ik;
    else if (d.iadd) { const ps = people(), x = S.cast[0] || J, y = ps.find((o) => o !== x) || x; (S.infos = S.infos || []).push({ id: d.iadd, x, y }); openK = null; }
    else if (d.icyc) { const [k, f] = d.icyc.split(':'), i = S.infos[+k], ps = people(), other = f === 'x' ? i.y : i.x; let n = ps.indexOf(i[f]);
      do n = (n + 1) % ps.length; while (IN[i.id].s > 1 && ps[n] === other && ps.length > 1); i[f] = ps[n]; }
    else if (d.idel) S.infos.splice(+d.idel, 1);
    else if (d.inc) S.inc.k = d.inc;
    else if (d.incwho) S.inc.who = d.incwho;
    else if (d.hard) { if (!hardOk(d.hard)) return; S.hard[d.hard] = S.hard[d.hard] ? 0 : 1; }
    else if (d.tq) { const ev = line().concat(events().flat()).find((x) => x.id === d.tq); if (ev) S.tq[d.tq] = ev.k + 1; }
    else if (d.plan) { save(); const pl = planOf(+d.plan); PLAN.add(pl); return window.FORGE_TO_PLAN && FORGE_TO_PLAN(); }
    else if (d.playep) return play(t, +d.playep);
    else if (d.pickopt) { const [id, i] = d.pickopt.split(':'); S.picked[id] = S.picked[id] === +i ? null : +i; }
    else if (d.det) { const ev = [...line(), ...events().flat()].find((x) => x.id === d.det); if (ev) details(ev); return; }
    else if (d.x === 'plot') return copy(plotText(), '📄 Plot copié');
    else if (d.pose) { save(); return copy(sheet(d.pose), `🧍 ${nm(d.pose)} : prompt copié. Dans ChatGPT : l’image + le prompt.`); }
    else if (d.cimg) return copyImg(d.cimg, t);
    else if (d.cut || d.uncut) { const L = line(), at = new Set(cutsOf(L)), i = +(d.cut || d.uncut); if (d.cut) at.add(i); else at.delete(i);
      S.cut = { sig: sigOf(L), at: [...at].sort((a, b) => a - b) }; }
    else if (d.x === 'autocut') S.cut = null;
    else if (d.x === 'dice') dice();
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
  function mount(root) {
    // on a phone (no hover), a tap also says briefly, at the bottom, what was just touched
    root.onclick = (e) => { if (held) { held = false; e.stopPropagation(); return; } tipHide();
      const t = e.target.closest('[data-tip]'), say = lastTouch && t && el.contains(t) ? t.dataset.tip : ''; onClick(e); if (say) toast(say); };
    el = root; msg = ''; render();
    root.onmouseover = (e) => { if (e.pointerType === 'touch') return; const t = e.target.closest('[data-tip]'); if (t && el.contains(t)) tipShow(t); else tipHide(); };
    root.onmouseleave = tipHide;
    root.onpointerdown = (e) => { if (e.pointerType !== 'touch') return; held = false; clearTimeout(holdT); const t = e.target.closest('[data-tip]');
      if (t) holdT = setTimeout(() => { held = true; tipShow(t); }, 450); };
    root.onpointerup = root.onpointercancel = () => { clearTimeout(holdT); if (held) setTimeout(tipHide, 1800); };
    root.oncontextmenu = (e) => { if (e.target.closest('[data-tip]')) e.preventDefault(); };
    const sc = root.closest('#forge'); if (sc) sc.onscroll = tipHide;
  }
  return { mount, PILLARS, FLAWS, sheet, seed, events, episodes, conflicts, planOf, plotText };
})();
