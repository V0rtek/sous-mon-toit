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
  const infoFr = (i) => IN[i.id].fr(nm(i.x), nm(i.y)), infoEn = (i) => IN[i.id].en(en(i.x), en(i.y));
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
    justice: { e: '⚖️', t: 1, n: 'la vérité sur', en: 'the truth about', lab: () => 'la vérité', labE: () => 'the truth', act: (t) => `Dénoncer ${t}`, actE: (t) => `expose ${t}`,
      hurt: (w, t) => `${t} s’en tire`, hurtE: (w, t) => `${t} gets away with it`, raise: (w, t) => `Un indice de plus contre ${t}`, raiseE: (w, t) => `one more clue against ${t}`,
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
  ];
  const EK = Object.fromEntries(EVK.map((x) => [x.id, x]));
  const evs = () => (S.ev || []).filter((e) => EK[e.k] && live(e.x));
  const vName = (e) => (e.v && live(e.v) ? nm(e.v) : 'quelqu’un'), vNameE = (e) => (e.v && live(e.v) ? en(e.v) : 'someone');
  const evFr = (e) => ({ arrive: `${nm(e.x)} arrive`, gone: `${nm(e.x)} disparaît`, murder: `${cap(vName(e))} est retrouvé·e mort·e`, theft: `${cap(vName(e))} s’est fait voler`,
    betray: `${cap(vName(e))} a été trahi·e`, threat: `${nm(e.x)} menace ${vName(e)} de mort` }[e.k]);
  const evEnT = (e) => ({ arrive: `${en(e.x)} arrives`, gone: `${en(e.x)} disappears`, murder: `${vNameE(e)} is found dead`, theft: `${vNameE(e)} has been robbed`,
    betray: `${vNameE(e)} has been betrayed`, threat: `${en(e.x)} threatens to kill ${vNameE(e)}` }[e.k]);
  // a culprit not yet revealed is « le coupable »
  const hiddenCulprit = (id) => evs().some((e) => EK[e.k].crime && e.h && e.x === id);
  const tName = (d) => (d.t ? (d.k === 'justice' && hiddenCulprit(d.t) ? 'le coupable' : nm(d.t)) : ''), tNameE = (d) => (d.t ? (d.k === 'justice' && hiddenCulprit(d.t) ? 'the culprit' : en(d.t)) : '');
  const dFr = (d) => `${nm(d.who)} : ${DK[d.k].n}${d.t ? ' ' + tName(d) : ''}`, dEn = (d) => `${en(d.who)}: ${DK[d.k].en}${d.t ? ' ' + tNameE(d) : ''}`;
  const dSay = (d) => `${nm(d.who)} veut ${DK[d.k].n}${d.t ? ' ' + tName(d) : ''}`, dSayE = (d) => `${en(d.who)} wants ${DK[d.k].en}${d.t ? ' ' + tNameE(d) : ''}`;
  const lab = (d) => DK[d.k].lab(tName(d)), labE = (d) => DK[d.k].labE(tNameE(d));
  function desires() {
    const D = [], ps = people();
    const add = (who, k, t, s, src) => { if (!live(who) || (t && (!live(t) || t === who))) return null; const id = `${who}:${k}${t ? ':' + t : ''}`;
      const o = D.find((d) => d.id === id); if (o) { if (s > o.s) { o.s = s; o.src = src; } return o; } const d = { id, who, k, t: t || null, s, src }; D.push(d); return d; };
    for (const p of ps) { add(p, 'alive', null, 1, 'base'); add(p, 'respect', null, 1, 'base'); }
    for (const [key, r] of Object.entries(S.rel)) { const [a, b] = key.split('|'); if (!r || !live(a) || !live(b)) continue;
      if (['friend', 'family', 'mentor', 'couple'].includes(r)) { add(a, 'protect', b, 2, 'lien'); add(b, 'protect', a, 2, 'lien'); }
      if (['couple', 'crush'].includes(r)) { add(a, 'love', b, 2, 'lien'); add(b, 'love', a, 2, 'lien'); }
      if (r === 'rival') { add(a, 'oust', b, 2, 'lien'); add(b, 'oust', a, 2, 'lien'); } }
    for (const p of ps) { const w = wantOf(p); if (w) add(p, w.v, w.t, 3, 'choisi'); }
    for (const p of ps) { const f = S.flaw[p]; if (f === 'lache') add(p, 'alive', null, 2, 'faille'); if (f === 'orgueil') add(p, 'respect', null, 2, 'faille'); if (f === 'menteur') add(p, 'hide', null, 2, 'faille'); }
    for (const i of [...kinds('secret'), ...kinds('mask')]) add(i.x, 'hide', null, 3, 'info');
    // what an info makes: an ex who comes back hasn't turned the page; a saved life is a debt; a fight wants to win; a
    // promise binds; a secret crush is a desire
    const comes = evs().filter((e) => e.k === 'arrive').map((e) => e.x);
    for (const i of infos()) {
      if (i.id === 'exes') { const back = comes.includes(i.y) ? i.y : comes.includes(i.x) ? i.x : i.y; add(back, 'love', back === i.x ? i.y : i.x, 2, 'info'); }
      if (i.id === 'saved') add(i.y, 'protect', i.x, 2, 'info');
      if (i.id === 'fight') { add(i.x, 'oust', i.y, 2, 'info'); add(i.y, 'oust', i.x, 2, 'info'); }
      if (i.id === 'promise') add(i.x, 'protect', i.y, 2, 'info');
      if (i.id === 'crush') add(i.x, 'love', i.y, 3, 'info');
    }
    for (const e of evs()) {
      const near = (v) => D.filter((d) => ['protect', 'love'].includes(d.k) && d.t === v).map((d) => d.who);
      if (e.k === 'gone') { add(e.x, 'free', null, 2, 'événement'); for (const p of near(e.x)) add(p, 'find', e.x, 3, 'événement'); }
      if (EK[e.k].crime) { add(e.x, 'hide', null, 3, 'événement'); const seekers = [...new Set([...(e.s && live(e.s) ? [e.s] : []), ...(e.v && live(e.v) ? [e.v, ...near(e.v)] : [])])];
        for (const p of seekers) add(p, 'justice', e.x, 3, 'événement'); if (e.k === 'murder') { add(e.x, 'alive', null, 3, 'événement'); if (e.h) for (const p of ps) if (p !== e.x) add(p, 'alive', null, 2, 'événement'); } }
      if (e.k === 'threat' && e.v && live(e.v)) { add(e.v, 'alive', null, 3, 'événement'); add(e.x, 'oust', e.v, 3, 'événement'); for (const p of near(e.v)) add(p, 'protect', e.v, 3, 'événement'); }
    }
    return D;
  }
  const lifeAtStake = (who) => evs().some((e) => (e.k === 'murder' && (e.h || who === e.x)) || (e.k === 'threat' && (who == null || e.v === who))) || (!!S.hard.danger && (who == null || who === J));
  // Justin pulled two ways: two of his strong desires that can't both win
  const pulls = (a, b) => (a.k === 'free' && ['love', 'protect'].includes(b.k)) || (a.k === 'justice' && ['love', 'protect'].includes(b.k) && b.t === a.t)
    || (a.k === 'alive' && lifeAtStake(a.who) && (['justice', 'find'].includes(b.k) || (['protect', 'love'].includes(b.k) && lifeAtStake(b.t)) || (b.k === 'free' && S.hard.danger))) || (a.k === 'love' && b.k === 'protect' && a.t !== b.t && rel(a.t, b.t) === 'rival')
    // he wants X, but helping Y means hurting who X protects (Melissa hunts the thief, Ruby protects him)
    || (a.k === 'love' && b.k === 'protect' && a.t !== b.t && evs().some((e) => EK[e.k].crime && (e.s === b.t || e.v === b.t) && (rel(e.x, a.t) === 'couple' || wantOf(a.t)?.t === e.x || (S.want[e.x] || {}).t === a.t)));
  const goneIds = () => evs().filter((e) => e.k === 'gone').map((e) => e.x);
  function conflictsOf(D0) {
    const D = D0.filter((d) => !goneIds().includes(d.who) || ['free', 'hide'].includes(d.k));
    const C = [], same = (c) => C.some((x) => (x.da === c.da && x.db === c.db) || (x.da === c.db && x.db === c.da) || (x.e === c.e && x.e !== '⇄' && pk(x.a, x.b) === pk(c.a, c.b)));
    const add = (da, db, e, fr, en2) => { const c = { da, db, a: da.who, b: db.who, e, fr, en: en2 }; if (da !== db && !same(c)) C.push(c); };
    for (const a of D) for (const b of D) { if (a === b) continue;
      if (a.k === 'love' && b.k === 'love' && a.t === b.t && a.who !== b.who && a.who < b.who) add(a, b, '⚔️', `${nm(a.who)} et ${nm(b.who)} veulent ${nm(a.t)}`, `${en(a.who)} and ${en(b.who)} both want ${en(a.t)}`);
      if (a.k === 'love' && b.k === 'love' && b.who === a.t && b.t !== a.who && !D.some((x) => x.k === 'love' && x.who === a.t && x.t === a.who) && !D.some((x) => x.k === 'love' && x.t === a.t && x.who === b.t)) add(a, b, '💘', `${nm(a.t)} en veut un·e autre`, `${en(a.who)} wants ${en(a.t)}, who wants ${en(b.t)}`);
      if (a.k === 'love' && b.k === 'love' && b.who !== a.who && b.t === a.t) { /* same target: done above */ }
      if (a.k === 'love' && rel(a.t, b.who) === 'couple' && b.k === 'love' && b.t === a.t && b.who !== a.who) add(a, b, '💍', `${nm(a.t)} est avec ${nm(b.who)}`, `${en(a.t)} is with ${en(b.who)}`);
      if (a.k === 'protect' && ['oust', 'justice'].includes(b.k) && b.t === a.t && b.who !== a.who) add(a, b, '🛡️', `${nm(a.who)} protège ${nm(a.t)} contre ${nm(b.who)}`, `${en(a.who)} protects ${en(a.t)} from ${en(b.who)}`);
      if (a.k === 'oust' && b.k === 'respect' && b.who === a.t) add(a, b, '😤', `${nm(a.who)} veut écarter ${nm(a.t)}`, `${en(a.who)} wants to push ${en(a.t)} aside`);
      if (a.k === 'free' && ['protect', 'love'].includes(b.k) && b.t === a.who) add(a, b, '🕊️', `${nm(a.who)} veut partir ; ${nm(b.who)} veut l’en empêcher`, `${en(a.who)} wants to leave; ${en(b.who)} wants to keep them`);
      if (a.k === 'find' && ['free', 'hide'].includes(b.k) && b.who === a.t) add(a, b, '🔦', `${nm(a.who)} cherche ${nm(a.t)}, qui ne veut pas être trouvé`, `${en(a.who)} looks for ${en(a.t)}, who does not want to be found`);
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
    const strong = D.filter((d) => d.s >= 2 && d.src !== 'faille').sort((a, b) => (b.who === J) - (a.who === J) || b.s - a.s || (b.src === 'choisi') - (a.src === 'choisi'));
    for (const d of strong) { const cs = C.filter((c) => (c.da === d || c.db === d) && !used.has(c)); if (!cs.length) continue;
      cs.forEach((c) => used.add(c)); out.push({ id: d.id, d, cs, main: d.who === J }); }
    return out;
  }
  // the climax: two of Justin's desires (picked, else the ones that pull him apart, else his two main lines)
  function climaxOf(D, C, PL) {
    const jd = D.filter((d) => d.who === J);
    if (S.climax) { const a = jd.find((d) => d.id === S.climax[0]), b = jd.find((d) => d.id === S.climax[1]); if (a && b && a !== b) return [a, b]; }
    const own = (d) => (d.src === 'faille' ? 0 : d.src === 'choisi' ? 3 : 2), inner = C.filter((c) => c.e === '⇄').sort((a, b) => own(b.da) + own(b.db) - own(a.da) - own(a.db))[0];
    if (inner) return [inner.da, inner.db];
    const mains = PL.filter((p) => p.main).map((p) => p.d);
    if (mains.length >= 2) return [mains[0], mains[1]];
    const first = mains[0] || jd.sort((a, b) => b.s - a.s)[0];
    const other = jd.filter((d) => d !== first).sort((a, b) => (b.k === 'protect') - (a.k === 'protect') || b.s - a.s)[0];
    return [first, other];
  }
  const story = () => { const D = desires(), C = conflictsOf(D), PL = plotlinesOf(D, C); return { D, C, PL, X: climaxOf(D, C, PL) }; };
  const conflicts = () => story().C;
  const incWho = () => { const e = evs()[0]; return e ? e.x : S.cast[0]; };
  // the people the act's prompt and the old views still ask for: who Justin wants, who's against him, who he'd lose
  function roles() {
    const { C, X } = story(), [ca, cb] = X, tgt = [ca, cb].find((d) => d && d.t) || null;
    const target = tgt ? tgt.t : S.cast[0], vs = C.filter((c) => c.a === J || c.b === J).map((c) => (c.a === J ? c.b : c.a)).find((id) => id !== J && id !== target) || null;
    const dear = [ca, cb].map((d) => d && d.k === 'protect' && d.t).find(Boolean) || S.cast.find((id) => id !== target && id !== vs && (R[rel(J, id)] || {}).good) || null;
    return { target, against: vs, dear, a: target, b: [dear, vs, ...S.cast].find((id) => id && id !== target) || target };
  }
  const hardOk = (h) => (h === 'liked' ? !!roles().against : h === 'danger' ? desires().some((d) => ['find', 'free', 'alive'].includes(d.k) && d.s >= 2) : h === 'gag' ? kinds('secret').length > 0 : true);

  // ---- OUTPUT: the braid. Each plotline climbs a few steps (show the desire → the conflict → each side weighs more →
  // he tries, it fails); the events come in (the first one opens the act, in 3 steps if someone arrives; the others
  // « soudain »); the others' lines run « pendant ce temps »; the crisis holds the reveals and the climax. Each beat says
  // which line it serves and why it comes (its cause). A beat: { id, kind (its techniques), part, e, ep (its episode),
  // lk (donc | mais | soudain | pendant), line (its plotline), c (its words), info, hint, rides } ----
  function line() {
    const { D, C, PL, X } = story(), EV = evs(), r = roles(), H = (id) => S.hard[id] && hardOk(id);
    const first = EV[0], x = first ? first.x : S.cast[0], mains = PL.filter((p) => p.main), subs = PL.filter((p) => !p.main);
    const mainD = (mains[0] || {}).d || X[0];
    const base = { x: nm(x), xE: en(x), t: nm(r.target), tE: en(r.target), a: nm(r.against || x), aE: en(r.against || x), d: nm(r.b), dE: en(r.b),
      w: mainD ? `${DK[mainD.k].n}${mainD.t ? ' ' + tName(mainD) : ''}` : '', wE: mainD ? `${DK[mainD.k].en}${mainD.t ? ' ' + tNameE(mainD) : ''}` : '', px: pillarsOf(x)[0], pxEn: (P[pillarsOf(x)[0]] || {}).exp };
    const ic = (i) => ({ i: infoFr(i), iE: infoEn(i), s: nm(i.x), sE: en(i.x) });
    const B = [], sig2 = (b) => `${b.kind}|${b.c.st || ''}|${b.c.o || ''}|${b.c.show || ''}|${b.c.cr || ''}`;
    const mk = (id, kind, part, e, ep, lk, extra = {}) => { const b = { id, kind, part, e, ep, lk, glue: false, rides: [], ...extra, c: { ...base, ...(extra.c || {}) } }; if (['stake', 'conflict', 'dshow'].includes(kind) && B.some((o) => sig2(o) === sig2(b))) return null; B.push(b); return b; };
    const ride = (host, rd) => { if (host) host.rides.push({ glue: false, rides: [], ...rd, c: { ...base, ...(rd.c || {}) } }); };
    const why = (d) => (d ? [dSay(d), dSayE(d)] : null);
    // the steps of a plotline
    const stepsOf = (p, sub) => { const d = p.d, o = p.cs[0], od = o.da === d ? o.db : o.da, W2 = (dd) => [nm(dd.who), tName(dd)], WE = (dd) => [en(dd.who), tNameE(dd)];
      const st = [{ kind: 'dshow', e: DK[d.k].e, lk: sub ? 'pendant' : 'donc', who: [d.who, d.t].filter(Boolean), c: { dk: d.k, show: DK[d.k].show(...W2(d)), showE: DK[d.k].showE(...WE(d)) }, line: p.id, cause: null }];
      [...p.cs.filter((c) => c.e !== '⇄'), ...p.cs.filter((c) => c.e === '⇄')].forEach((c, k) => st.push({ kind: 'conflict', e: c.e, lk: k || !sub ? 'mais' : 'pendant', who: [...new Set([c.a, c.b, c.da.t, c.db.t].filter(Boolean))].slice(0, 3), desires: [c.da, c.db], c: { o: c.fr, oE: c.en, oWho: c.da === d ? c.b : c.a }, line: p.id, cause: why(d), from: c.da === d ? c.db : c.da }));
      st.push({ kind: 'stake', e: '📈', lk: 'donc', who: [d.who, d.t].filter(Boolean), desires: [d], c: { st: DK[d.k].raise(...W2(d)), stE: DK[d.k].raiseE(...WE(d)) }, line: p.id, cause: why(d), defN: 'Aveu vulnérable' });
      st.push({ kind: 'stake', e: '📈', lk: 'mais', who: [od.who, od.t].filter(Boolean), desires: [od], c: { st: DK[od.k].raise(...W2(od)), stE: DK[od.k].raiseE(...WE(od)) }, line: p.id, cause: why(od), defN: 'Show character positioning' });
      // the ⇄ (Justin pulled two ways) goes to the end of the line: by then both sides exist
      const inner = st.findIndex((x2) => x2.c && x2.c.o && x2.e === '⇄'); if (inner > 0) st.push(st.splice(inner, 1)[0]);
      if (!sub && p === mains[0]) st.push({ kind: 'easy', e: '↘️', lk: 'mais', who: [J, d.t].filter(Boolean), c: { t: tName(d) || base.t, tE: tNameE(d) || base.tE }, line: p.id, cause: [o.fr, o.en] });
      return st; };
    const SE = Math.max(2, Math.min(3, mains.length + 1)), queues = [...mains.map((p, i) => ({ p, s: stepsOf(p), start: Math.min(i, SE - 1), per: 2 })), ...subs.map((p) => ({ p, s: stepsOf(p, 1).filter((x2) => x2.kind !== 'stake'), start: 1, per: 1, sub: 1 }))];
    let n = 0; const id = (k) => `${k}${++n}`, lastInner = [];
    for (let ep = 0; ep < SE; ep++) {
      if (ep === 0) { mk('hook1', 'hook', 'setup', '🎬', 0, 'donc', { defN: first && first.k === 'gone' ? 'Place vide' : 'Entrée qui fait taire' }); }
      // the events of this episode: the first one in episode 1, the next ones « soudain » one per episode
      const evHere = EV.filter((e, k) => Math.min(k, SE - 1) === ep);
      const q0 = queues.filter((q) => q.start <= ep && q.s.length);
      // the main line that opens: its desire shown before the first event
      for (const q of q0.filter((q2) => !q2.sub)) { const steps = q.s.splice(0, ep === q.start ? 1 : 0); for (const s of steps) mk(id('d'), s.kind, 'setup', s.e, ep, s.lk, s); }
      for (const e of evHere) {
        if (e.k === 'arrive' && e === first) {
          mk('expect', 'expect', 'setup', '🗣️', ep, 'donc', { glue: true, who: [e.x] }); mk('tease', 'tease', 'setup', '⏰', ep, 'donc', { glue: true, who: [e.x] });
          mk('inc', 'enter', 'setup', '💥', ep, 'donc', { scene: true, ev: e, who: [e.x] });
        } else if (e.k === 'arrive') mk(id('ev'), 'enter', 'setup', '💥', ep, 'soudain', { scene: true, ev: e, who: [e.x], c: { x: nm(e.x), xE: en(e.x), px: pillarsOf(e.x)[0] } });
        else if (e.k === 'gone') mk(e === first ? 'inc' : id('ev'), 'gone', 'setup', '👻', ep, 'soudain', { scene: true, ev: e, who: [e.x], c: { x: nm(e.x), xE: en(e.x) } });
        else mk(e === first ? 'inc' : id('ev'), 'crime', 'setup', EK[e.k].e, ep, 'soudain', { scene: true, ev: e, who: [e.v, e.h ? null : e.x].filter((w) => w && live(w)), c: { cr: `${evFr(e)}${EK[e.k].crime ? (e.h ? ' ; qui a fait ça ?' : ` : c’est ${nm(e.x)}`) : ''}`, crE: `${evEnT(e)}${EK[e.k].crime ? (e.h ? '; who did it?' : `: it was ${en(e.x)}`) : ''}` } });
      }
      // the lines' steps, the others' « meanwhile », then what pulls Justin two ways (both sides are on the table by then)
      const later2 = [];
      for (const q of [...q0.filter((q2) => !q2.sub), ...q0.filter((q2) => q2.sub)]) { const steps = q.s.splice(0, q.per); for (const s of steps) { if (s.e === '⇄') later2.push([q, s]); else mk(id(q.sub ? 'p' : 'm'), s.kind, 'setup', s.e, ep, s.lk, s); } }
      if (ep < SE - 1) for (const [, s] of later2) mk(id('m'), s.kind, 'setup', s.e, ep, s.lk, s); else lastInner.push(...later2);
    }
    // leftovers go in the last setup episode, then what pulls Justin two ways
    for (const q of queues) for (const s of q.s.splice(0)) if (!q.sub || s.kind === 'conflict') { if (s.e === '⇄') lastInner.push([q, s]); else mk(id(q.sub ? 'p' : 'm'), s.kind, 'setup', s.e, SE - 1, s.lk, s); }
    for (const [, s] of lastInner) mk(id('m'), s.kind, 'setup', s.e, SE - 1, s.lk, s);
    // what rides: the second hook in the first, a past in the desire it explains, the crowd's love in the rival's conflict,
    // a seed in the first carrier, an object seen early, the danger in a raise, the secret that binds in the attempt
    const at = (pred) => B.find(pred);
    if (first) ride(B[0], { id: 'hook2', kind: 'hook', part: 'setup', e: '🎬', defN: first.k === 'arrive' ? 'Un nom chuchoté' : 'Avant d’entrer' });
    for (const [k, i] of kinds('past').entries()) ride(at((b) => b.kind === 'dshow' && b.c.show && [nm(i.x), nm(i.y)].some((nn) => b.c.show.includes(nn))) || at((b) => b.kind === 'dshow') || B[0], { id: `past${k}`, kind: 'past', part: 'setup', e: '🕰️', c: ic(i), info: i, who: [i.x, i.y], defN: k ? 'Tell a story' : 'Shared memory' });
    if (H('liked') && r.against) ride(at((b) => b.kind === 'conflict' && b.c.oWho === r.against) || at((b) => b.kind === 'conflict') || B[B.length - 1], { id: 'liked', kind: 'liked', part: 'setup', e: '😇' });
    const hidden = [...kinds('secret'), ...kinds('mask')], crimesH = EV.filter((e) => EK[e.k].crime && e.h);
    const seedHosts = B.filter((b) => b.part === 'setup' && b.kind !== 'hook');
    hidden.forEach((i, k) => { ride(seedHosts[k % Math.max(1, seedHosts.length)], { id: `plant${k}`, kind: 'plant', part: 'setup', e: '🌱', c: ic(i), info: i, hint: true }); });
    crimesH.forEach((e, k) => { const cAt = B.findIndex((b) => b.ev === e), host = seedHosts.filter((b) => B.indexOf(b) > cAt && b.kind !== 'crime')[k] || seedHosts[seedHosts.length - 1];
      ride(host, { id: `clue${k}`, kind: 'plant', part: 'setup', e: '🌱', crime: e, c: { i: `${nm(e.x)} était là cette nuit-là`, iE: `${en(e.x)} was there that night`, s: nm(e.x), sE: en(e.x) }, hint: true }); });
    kinds('object').forEach((i, k) => ride(B[Math.min(1, B.length - 1)], { id: `obj${k}`, kind: 'seen', part: 'setup', e: IN[i.id].e, c: ic(i), info: i, hint: true }));
    if (H('danger')) { const fd = D.find((d) => d.who === J && ['free', 'find'].includes(d.k) && d.s >= 2);
      const dg = fd ? (fd.k === 'free' ? ['Pour partir, il faut traverser la forêt, la nuit', 'to leave, he must cross the forest, at night'] : [`Pour retrouver ${tName(fd)}, il faut traverser la forêt`, `to find ${tNameE(fd)}, he must cross the forest`]) : ['Un lieu dangereux à traverser', 'a dangerous place to cross'];
      ride(at((b) => b.line === (fd && fd.id) && b.kind === 'stake') || at((b) => b.line === (fd && fd.id)) || at((b) => b.kind === 'stake') || B[B.length - 1], { id: 'danger', kind: 'danger', part: 'setup', e: '🌲', c: { dg: dg[0], dgE: dg[1] }, who: [J] }); }
    if (H('gag') && kinds('secret')[0]) ride(at((b) => b.kind === 'easy') || B[B.length - 1], { id: 'gag', kind: 'gag', part: 'setup', e: '🤐', c: ic(kinds('secret')[0]) });
    // the crisis: what was hidden comes out (each one « soudain »), it all means something else, the clock, the climax
    const CR = SE;
    hidden.forEach((i, k) => mk(`rev${k}`, 'reveal', 'reveal', IN[i.id].e, CR, 'soudain', { c: ic(i), info: i, scene: !k, who: [i.x, i.y].filter(Boolean) }));
    crimesH.forEach((e, k) => mk(`who${k}`, 'reveal', 'reveal', '🎯', CR, 'soudain', { who: [e.x], crime: e, c: { i: `C’était ${nm(e.x)} : ${evFr(e).charAt(0).toLowerCase() + evFr(e).slice(1)}`, iE: `it was ${en(e.x)}: ${evEnT(e)}`, s: nm(e.x), sE: en(e.x) }, scene: !k && !hidden.length }));
    kinds('object').forEach((i, k) => mk(`open${k}`, 'open', 'reveal', IN[i.id].e, CR, 'donc', { c: ic(i), info: i }));
    if (hidden.length || crimesH.length || kinds('object').length) mk('twist', 'twist', 'reveal', '🔄', CR, 'donc');
    if (H('clock')) mk('clock', 'clock', 'crisis', '⏳', CR, 'mais', { glue: true });
    const [ca, cb] = X;
    mk('pick', 'pick', 'crisis', '⚖️', CR, 'mais', { who: [J, ...[ca, cb].map((d) => d && d.t).filter(Boolean)], climax: [ca, cb], opts: [ca ? cap(lab(ca)) : '?', cb ? cap(lab(cb)) : '?'], fr: `${ca ? cap(lab(ca)) : '?'} ou ${cb ? lab(cb) : '?'} ?`, en: `the climax: ${ca ? labE(ca) : '?'} or ${cb ? labE(cb) : '?'}` });
    mk('cost', 'cost', 'end', '💔', CR + 1, 'donc', { scene: true }); mk('end', 'end', 'end', '❔', CR + 1, 'donc');
    const out = B.map((b) => ({ ...withTech(b), rides: b.rides.map(withTech) }));
    // a technique with moments (Coincé devant tous): its question rides early in the episode, everyone tries, and it is
    // asked when he arrives: his answer is the moment. If he did a crime, it's « the night of » it
    for (const b of out) if (b.kind === 'enter' && b.tech && b.tech.parts && b.ev) {
      // « the night of the theft » only if the theft is already known; else « last night », and the theft found later gives it its meaning
      const e = b.ev, crime = EV.find((c2) => EK[c2.k].crime && c2.x === e.x), known = crime && out.slice(0, out.indexOf(b)).some((x2) => x2.ev === crime), Q = `Où était ${nm(e.x)} ${known ? `la nuit ${({ murder: 'du meurtre', theft: 'du vol', betray: 'de la trahison' })[crime.k]}` : 'cette nuit'} ?`;
      const QE = `where was ${en(e.x)} ${known ? `the night of the ${({ murder: 'murder', theft: 'theft', betray: 'betrayal' })[crime.k]}` : 'last night'}?`;
      const before = out.slice(0, out.indexOf(b)).filter((x2) => x2.ep === b.ep), hostQ = before.find((x2) => x2.kind === 'expect') || before[0], hostT = before.find((x2) => x2.kind === 'tease') || before[before.length - 1] || hostQ;
      const part = (id2, e2, fr, en2, n2) => ({ id: id2, kind: 'part', part: 'setup', e: e2, fr, en: en2, n: n2, g: 'char', k: 0, tech: null, rides: [], c: { q: fr }, partOf: b.id, who: [e.x] });
      if (hostQ) hostQ.rides.push(part(`${b.id}q`, '❓', `« ${Q} » Personne n’a la réponse`, `the hard question everyone asks: "${QE}" nobody has the answer`, 'Coincé devant tous · la question'));
      if (hostT && hostT !== hostQ) hostT.rides.push(part(`${b.id}t`, '🤷', `Chacun a sa théorie sur ${nm(e.x)} ; aucune ne tient`, `everyone has a theory about ${en(e.x)}; none holds`, 'Coincé devant tous · chacun essaie'));
      // his answer pays something: the culprit's answer is a brilliant LIE (it collapses at the reveal); otherwise a detail
      // he slipped earlier, passing for a joke (« un nouveau truc, je vous raconterai »), comes back and explains it all
      if (crime) {
        b.fr = `${b.fr} ; on lui demande devant tous : « ${Q} » ; sa réponse est brillante… et fausse`; b.en = `${b.en}; in front of everyone someone asks him "${QE}"; his answer is brilliant, everyone believes it, and it is a lie (it collapses when the truth comes out)`;
        b.lie = crime;
      } else {
        const hostS = out.slice(0, out.indexOf(b)).find((x2) => x2.kind === 'dshow' || x2.kind === 'expect') || hostQ;
        if (hostS) hostS.rides.push(part(`${b.id}s`, '🌱', `${nm(e.x)} (ou quelqu’un qui le connaît) glisse un détail, comme une blague`, `a detail about ${en(e.x)} slipped in like a joke, nobody picks it up (his answer will explain it)`, 'Seed & payoff · le seed'));
        b.fr = `${b.fr} ; on lui demande devant tous : « ${Q} » ; sa réponse, inattendue, explique le détail glissé avant`; b.en = `${b.en}; in front of everyone someone asks him "${QE}"; his unexpected answer explains the detail slipped earlier (the seed pays off) and he takes back control`;
      }
      b.answers = Q;
    }
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
  });
  // the concrete way a technique plays here (its words, with the people): the ones Créer knew before (TQ), by name
  const CT = {}; for (const kd of ['hook', 'expect', 'tease', 'gone', 'cost', 'end']) for (const [n, , fr, en2] of TQ[kd]) CT[n] = [fr, en2];
  const leaves = (list) => (list || []).flatMap((t) => (t.s && t.s.length ? leaves(t.s) : [t]));
  // the ways an event can be done: [{ n, d, g, ex, need, see, give, parts, carrier }]
  function optsOf(ev) {
    const k = K[ev.kind], GS = (window.PLAN && PLAN.GOALS) || [];
    if (k && GS.length) { const L2 = k.g.flatMap((g) => { const G2 = GS.find((x) => x.id === g); return G2 ? leaves(G2.tech).map((t) => ({ ...t, g })) : []; }).filter((t) => (k.only ? t[k.only] : !['hook', 'expect', 'tease', 'gone', 'end', 'cost', 'conseq'].some((f) => t[f]))); if (L2.length) return L2; }
    return (TQ[ev.kind] || []).map(([n, g]) => ({ n, g, d: '' }));
  }
  function withTech(ev) {
    if (ev.kind === 'choice' || ev.kind === 'pick') return { ...ev, k: 0, n: 'Choix', g: '', tech: null, fr: ev.fr || (ev.kind === 'pick' ? `${ev.c.t} ou ${ev.c.d}` : ''), en: ev.en || (ev.kind === 'pick' ? `${ev.c.tE} or ${ev.c.dE}, each side painful to lose` : 'two outcomes the player reads before tapping') };
    const list = optsOf(ev), k0 = K[ev.kind], defN = k0 && (typeof (ev.defN || k0.def) === 'function' ? k0.def(ev.c) : ev.defN || k0.def);
    const def = Math.max(0, list.findIndex((t) => t.n === defN));
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
  let lastPair = null, pairsUsed = [];
  function chooseFor(list, n, st, seen) {
    const { D, PL, X } = st, jd = D.filter((d) => d.who === J), r = roles();
    const acts = [...new Set(list.map((e) => e.line).filter(Boolean))].map((id2) => PL.find((p) => p.id === id2)).filter((p) => p && p.main).map((p) => p.d);
    const cands = [...acts, ...X.filter(Boolean), ...jd.filter((d) => d.s >= 2)];
    let d1 = cands[0] || jd[0];
    // a desire is in the story once a beat so far names its target (Melissa, once she's hunting the thief)
    const told = (d) => !d.t || seen.some((b) => [b.fr, b.c && b.c.o, b.c && b.c.cr, b.c && b.c.show].filter(Boolean).some((t2) => String(t2).includes(nm(d.t))));
    const score = (d) => (X.includes(d) ? 3 : 0) + (d.k === 'respect' && S.hard.liked && r.against ? 2 : 0) + (d.k === 'alive' && lifeAtStake(d.who) ? 2 : 0) + (d.k === 'protect' ? 1 : 0) + d.s / 10 - (told(d) ? 0 : 10);
    const fresh = (a) => jd.some((d) => d !== a && !pairsUsed.some(([p1, p2]) => (p1 === a && p2 === d) || (p1 === d && p2 === a)) && told(d));
    d1 = cands.find(fresh) || d1;
    const others = jd.filter((d) => d !== d1 && !(d.k === d1.k && d.t === d1.t) && !(d.k === 'alive' && !lifeAtStake(d.who))).sort((a, b) => score(b) - score(a));
    const used = (d) => pairsUsed.some(([a, b]) => (a === d1 && b === d) || (a === d && b === d1)), d2 = others.find((d) => !used(d)) || others[0]; pairsUsed.push([d1, d2]); lastPair = [d1, d2];
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
    if (k === 'stake') add('stake', c.st, c.stE);
    if (k === 'choice') { const pk2 = S.picked[ev.id]; add('moved', pk2 != null ? `Choix : ${ev.opts[pk2][0]}` : `Choix : ${ev.opts[0][0]} ou ${ev.opts[1][0]}`, pk2 != null ? `chose: ${ev.opts[pk2][0]}` : `a choice: ${ev.opts[0][0]} or ${ev.opts[1][0]}`); }
    if (k === 'conseq' && c.picked) add('moved', ev.fr, ev.en);
    if (k === 'pick') add('moved', `Climax : ${ev.fr}`, ev.en);
    if (k === 'cost') add('moved', 'Ce que le choix a coûté', 'what the choice cost');
    return g;
  }
  const LED = [['eng', '❤️', 'Engagé dans les persos et les liens : quoi, et par quelle technique'], ['cur', '❓', 'Curiosité : les questions ouvertes'],
    ['stake', '⚔️', 'Enjeux : un désir pèse plus, ou un obstacle s’ajoute'], ['moved', '➡️', 'L’histoire avance : ce qui a changé']];
  function episodes() {
    const st = story(), L = line(), cuts = cutsOf(L), eps = []; let cur = [];
    L.forEach((ev, i) => { cur.push({ ...ev, i }); if (cuts.includes(i)) { eps.push(cur); cur = []; } }); if (cur.length) eps.push(cur);
    let ch = 0, prev = null; const built = []; lastPair = null; pairsUsed = [];
    return eps.map((evs2, n) => { const has = (p) => evs2.some((x) => x.part === p);
      const stage = has('crisis') ? 3 : has('end') && !has('setup') && !has('reveal') ? 4 : has('reveal') ? 2 : n === 0 ? 0 : 1;
      const list = evs2.slice();
      // what the last choice caused opens this episode
      if (prev) { const pk2 = S.picked[prev.id], o = prev.opts;
        const fr = pk2 != null ? o[pk2][1] : `Si « ${o[0][0]} » : ${o[0][1]} · Si « ${o[1][0]} » : ${o[1][1]}`;
        const en2 = pk2 != null ? `because justin chose "${o[pk2][0]}": ${o[pk2][2]}` : `depending on the last choice: if "${o[0][0]}", ${o[0][2]}; if "${o[1][0]}", ${o[1][2]}`;
        if (pk2 != null) built.push([`« ${o[pk2][0]} »`, o[pk2][0]]);
        list.unshift({ id: `cq${n}`, kind: 'conseq', part: 'setup', e: '↪️', lk: 'donc', who: [J], fr, en: en2, n: 'La conséquence, tout de suite', g: 'conseq', k: 0, rides: [], c: { picked: pk2 != null } }); prev = null; }
      // the climax: each side weighs, right before (it hurts the other desire)
      const pick = list.find((x) => x.kind === 'pick');
      if (pick && pick.climax && pick.climax[0] && pick.climax[1]) { const [ca, cb] = pick.climax, at2 = list.indexOf(pick);
        if (built.length) { pick.en += `; what his earlier choices built weighs on it (${built.map((b) => b[1]).join(', ')})`; pick.built = built.map((b) => b[0]); }
        const side = (i, dA, dB, defN) => withTech({ id: `pick${'ab'[i]}`, kind: 'stake', part: 'crisis', e: ['🅰️', '🅱️'][i], lk: 'mais', defN, choiceOf: 'pick', rides: [], who: [J, dA.t].filter(Boolean), desires: [dA],
          c: { st: `Si ${lab(dA)} : ${hurt(dB)}`, stE: `if he chooses ${labE(dA)}: ${hurtE(dB)}` } });
        list.splice(at2, 0, side(0, ca, cb, 'Aveu vulnérable'), side(1, cb, ca, 'Menace : si tu X, je Y')); }
      if (!has('crisis') && !has('end')) { ch++;
        const [d1, d2] = chooseFor(evs2, n, st, eps.slice(0, n + 1).flat());
        if (d1 && d2) {
          const opts = [[act(d1), cap(hurt(d2)), hurtE(d2)], [act(d2), cap(hurt(d1)), hurtE(d1)]];
          const chEv = withTech({ id: `ch${ch}`, kind: 'choice', part: 'choice', e: '⚖️', choice: 1, c: {}, rides: [], opts, desires: [d1, d2], lk: 'donc', who: [J, d1.t, d2.t].filter(Boolean) });
          chEv.fr = `${opts[0][0]} / ${opts[1][0]}`; chEv.en = `"${opts[0][0]}" (then ${opts[0][2]}) or "${opts[1][0]}" (then ${opts[1][2]}): ${labE(d1)} against ${labE(d2)}`;
          // raise stakes on the two desires the choice opposes: the more both weigh, the stronger the choice
          const stk = (i, d, defN) => withTech({ id: `${chEv.id}${'ab'[i]}`, kind: 'stake', part: 'setup', e: ['🅰️', '🅱️'][i], lk: 'mais', defN, choiceOf: chEv.id, rides: [], who: [d.who, d.t].filter(Boolean), desires: [d],
            c: { st: `${raise(d)} (${lab(d)})`, stE: `${raiseE(d)} (${labE(d)} weighs more, right before the choice)` } });
          // a raise of that desire already in the episode is its stake: it moves right before the choice
          const sides = [d1, d2].map((d, i) => { const old = list.find((b) => b.kind === 'stake' && b.c.st === raise(d) && !b.choiceOf);
            if (old) { list.splice(list.indexOf(old), 1); return { ...old, e: ['🅰️', '🅱️'][i], choiceOf: chEv.id, lk: 'mais' }; } return stk(i, d, i ? 'Menace : si tu X, je Y' : 'Show character positioning'); });
          list.push(...sides, chEv); prev = chEv; } }
      const led = { eng: [], cur: [], stake: [], moved: [] };
      for (const ev of list) for (const e3 of [ev, ...(ev.rides || [])]) { const g = gives(e3); for (const [key] of LED) if (g[key]) led[key].push(...g[key].map((x) => [...x, e3])); }
      return { list, stage, led }; });
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
    const ST2 = story(), EPS2 = episodes(), lanes = ST2.PL.map((p2, k) => ({ p: p2, c: LANE[k % LANE.length] }));
    big(bigTop('🧵 La tresse : les lignes de l’histoire') + '<p class="fBigX">Chaque ligne est un désir fort et ce qui s’y oppose. Celles de Justin sont les lignes principales ; les autres courent « pendant ce temps ». Elles avancent d’un cran par épisode et convergent vers le climax.</p>'
      + lanes.map(({ p: p2, c }) => `<div class="fBigL" style="--c:${c}"><div class="fBigLH">${faces2([p2.d.who, p2.d.t])}<b>${DK[p2.d.k].e} ${esc(dSay(p2.d))}</b><em>${p2.main ? 'ligne principale' : 'pendant ce temps'}</em></div>`
        + `<div class="fBigC">${p2.cs.map((c2) => `<span>${c2.e} ${esc(c2.fr)}</span>`).join('')}</div>`
        + EPS2.map(({ list }, n) => { const its = list.filter((ev) => ev.line === p2.id); return its.length ? `<div class="fBigE"><i>${n + 1}</i><div>${its.map((ev) => `<p>${ev.e} ${esc(ev.fr)}</p>`).join('')}</div></div>` : ''; }).join('') + '</div>').join('')
      + `<div class="fBigL" style="--c:#8e8e93"><div class="fBigLH"><b>💥 Événements, révélations, choix</b></div>${EPS2.map(({ list }, n) => { const its = list.filter((ev) => !ev.line && !['hook', 'expect', 'tease', 'conseq', 'stake'].includes(ev.kind)); return its.length ? `<div class="fBigE"><i>${n + 1}</i><div>${its.map((ev) => `<p>${ev.e} ${esc(ev.choice ? ev.opts.map((o) => o[0]).join(' / ') : ev.fr)}</p>`).join('')}</div></div>` : ''; }).join('')}</div>`
      + (ST2.X[0] && ST2.X[1] ? `<div class="fBigQ"><small>Le climax, où elles convergent</small><b>🏁 ${esc(cap(lab(ST2.X[0])))} ou ${esc(lab(ST2.X[1]))} ?</b><p>${esc(dSay(ST2.X[0]))}<br>${esc(dSay(ST2.X[1]))}</p></div>` : ''));
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
  function planOf(n) {
    const EP = episodes(), ep = EP[n] || EP[0], next = EP[n + 1], IL = infos(), iid = (i) => 'i' + (IL.indexOf(i) + 1);
    const ids = {}; let k = 0;
    const beat = (ev, pre) => { const id = pre + (++k); ids[ev.id] = id; const ch = ev.choice || ev.kind === 'pick';
      const b = { id, goals: ch || !ev.g ? [] : [ev.g], tech: ch ? '' : ev.n, lines: ch ? 2 : 3, what: (ev.scene && pre === 'r' && k > 1 ? 'Nouvelle scène. ' : '') + ev.fr };
      if (ch) { b.kind = 'choice'; b.opts = (ev.opts || chOpts()).map((o) => (Array.isArray(o) ? o[0] : o)); b.what = ev.choice ? `Choix : ${ev.opts.map((o) => `${o[0]} (→ ${o[1]})`).join(' / ')}` : ev.fr; }
      if (ev.info) b[ev.hint ? 'hints' : 'reveals'] = [iid(ev.info)];
      for (const rd of ev.rides || []) { (b.carries = b.carries || []).push({ tech: rd.n, part: rd.fr }); if (rd.info) b[rd.hint ? 'hints' : 'reveals'] = [...(b[rd.hint ? 'hints' : 'reveals'] || []), iid(rd.info)]; ids[rd.id] = id; b.lines = Math.min(5, (b.lines || 3) + 1); }
      return b; };
    const orig = ep.list.slice(), epBeats = ep.list.map((ev) => beat(ev, 'r')); k = 0;
    epBeats.forEach((b, j) => { const e2 = ep.list[j]; if (j && !b.kind && e2.kind !== 'stake') b.what = ({ mais: `Mais${e2.cause ? `, alors que ${e2.cause[0]}` : ''} : `, soudain: 'Soudain : ', 'pendant ce temps': 'Pendant ce temps : ' }[link(e2)[0]] || (e2.cause ? `Parce que ${e2.cause[0]} : ` : 'Donc : ')) + b.what; });
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
    const st = story();
    if (evs().length) L.push('Événements : ' + evs().map((e) => `${EK[e.k].e} ${evFr(e)}${EK[e.k].crime ? ` (${e.h ? 'coupable caché : ' : 'coupable : '}${nm(e.x)})` : ''}`).join(' · '));
    L.push('Désirs : ' + st.D.filter((d) => d.s >= 2).map((d) => `${DK[d.k].e} ${dFr(d)}`).join(' · '));
    L.push('', 'COMMENT');
    for (const c of st.C) L.push(`${c.e} ${c.fr}`);
    if (st.PL.length) L.push('Plotlines : ' + st.PL.map((p) => `${p.main ? '🧵' : '·'} ${DK[p.d.k].e} ${dFr(p.d)}`).join(' · '));
    if (st.X[0] && st.X[1]) L.push(`🏁 Climax : ${cap(lab(st.X[0]))} ou ${lab(st.X[1])} ?`);
    const hard = HARD.filter((h) => S.hard[h.id] && hardOk(h.id)); if (hard.length) L.push('Pourquoi c’est dur : ' + hard.map((h) => `${h.e} ${h.n}`).join(' · '));
    L.push('', 'CE QUI ARRIVE');
    episodes().forEach(({ list, led }, n) => { L.push(`Épisode ${n + 1}`);
      list.forEach((ev, k) => { L.push(`  ${k ? link(ev)[0] + (ev.cause ? ` (← ${ev.cause[0]})` : '') + ' ' : ''}${ev.e} ${ev.choice ? `Choix : ${ev.opts.map((o, i) => `${S.picked[ev.id] === i ? '✓ ' : ''}${o[0]} (→ ${o[1]})`).join(' / ')}` : ev.fr}  (${ev.n})`); for (const rd of ev.rides || []) L.push(`      ↳ ${rd.e} ${rd.fr}  (${rd.n})`); });
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
    const EP = episodes(), E = EP.map((x) => x.list), epText = EP.map(({ list, led }) => list.map((ev, i) => `- ${evEn(ev, i)}${(ev.rides || []).map((rd) => `\n  + in the same lines, also: ${rd.en}`).join('')}`).join('\n') + `\n- WHAT THIS EPISODE MUST DO: ${[led.eng.length ? `engage the audience in: ${led.eng.map((x) => x[1]).join('; ')}` : '', led.cur.length ? `open the questions: ${led.cur.map((x) => x[1]).join('; ')}` : '', led.stake.length ? `raise the stakes: ${led.stake.map((x) => x[1]).join('; ')}` : '', led.moved.length ? `move the story: ${led.moved.map((x) => x[1]).join('; ')}` : ''].filter(Boolean).join(' / ')}.`);
    const text = [`THE CHARACTERS (their pillar: what we follow them for; it shows in how they talk and act; their want):`, ...people().map(who),
      ...(rels.length ? ['THEIR RELATIONS:', ...rels] : []), ...(facts.length ? ['THE FACTS OF THE STORY (use exactly these; never invent another secret or past):', ...facts] : []),
      ...(evs().length ? ['THE EVENTS (the first one starts the act):', ...evs().map((e) => `- ${evEnT(e)}${EK[e.k].crime ? (e.h ? ` (the culprit, ${en(e.x)}, is hidden until the crisis)` : ` (by ${en(e.x)})`) : ''}`)] : []),
      'WHAT EACH ONE WANTS (the stakes threaten these):', ...story().D.filter((d) => d.s >= 2).map((d) => `- ${dEn(d)}`),
      ...(story().X[0] && story().X[1] ? [`THE CLIMAX: justin must choose between ${labE(story().X[0])} and ${labE(story().X[1])}; every episode leads there.`] : []),
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
    tease: () => 'bientôt', conseq: () => 'conséquence', easy: () => 'ça rate', clock: () => 'horloge', twist: () => 'tout change', cost: () => 'le prix', end: () => 'la suite', open: () => 'ouvert', liked: () => 'adoré', past: () => 'passé' };
  function sbLinks(EPS) {
    const L = [], all = EPS.flatMap((e) => e.list.flatMap((b) => [b, ...(b.rides || [])])), find = (pred) => all.find(pred);
    const add = (a, b, t) => { if (a && b && a !== b && !L.some((l) => l.from === a.id && l.to === b.id)) L.push({ from: a.id, to: b.id, t }); };
    const enter0 = all.find((b) => b.kind === 'enter');
    for (const b of all) {
      if (b.kind === 'expect' || b.kind === 'tease') add(b, enter0, 'setup');
      if (b.kind === 'part') add(b, find((x) => x.id === b.partOf), b.e === '❓' ? 'qa' : 'setup');
      if (b.kind === 'enter' && b.lie) add(b, find((x) => x.kind === 'reveal' && x.crime === b.lie), 'setup');
      if (b.kind === 'plant' && b.info) add(b, find((x) => x.kind === 'reveal' && x.info === b.info), 'setup');
      if (b.kind === 'plant' && b.crime) add(b, find((x) => x.kind === 'reveal' && x.crime === b.crime), 'setup');
      if (b.kind === 'seen') add(b, find((x) => x.kind === 'open' && x.info === b.info), 'setup');
      if (b.kind === 'hook' && b.n === 'Un nom chuchoté') add(b, enter0, 'qa');
      if (b.kind === 'crime' && b.ev && b.ev.h) add(b, find((x) => x.kind === 'reveal' && x.crime === b.ev), 'qa');
      if (b.kind === 'stake' && b.choiceOf) add(b, find((x) => x.id === b.choiceOf), 'stake');
    }
    EPS.forEach(({ list }, n) => {
      const ch = list.find((x) => x.kind === 'choice' || x.kind === 'pick'), pk = find((x) => x.kind === 'pick');
      for (const b of list) if (b.kind === 'conflict') { add(b, ch, 'stake'); if (pk && pk !== ch && b.desires && pk.climax && b.desires.some((d) => pk.climax.includes(d))) add(b, pk, 'future'); }
      const nx = EPS[n + 1] && EPS[n + 1].list.find((x) => x.kind === 'conseq'); if (ch && nx) add(ch, nx, 'cons');
    });
    return L;
  }
  const sbCard = (b) => `<div class="fSbCard${b.kind === 'choice' || b.kind === 'pick' ? ' ch' : ''}" data-sid="${b.id}" data-tip="${esc(`${b.fr}${b.n && b.n !== 'Choix' ? `\n${b.n}` : ''}`)}"><b>${b.e}</b><span class="fSbFs">${(b.who || []).filter((w) => w && live(w)).slice(0, 3).map((w) => face(w)).join('')}</span><small>${esc(SBW[b.kind] ? SBW[b.kind](b) : '')}</small>`
    + ((b.rides || []).length ? `<span class="fSbRs">${b.rides.map((r) => `<i data-sid="${r.id}" data-tip="${esc(`${r.fr}${r.n ? `\n${r.n}` : ''}`)}">${r.e}</i>`).join('')}</span>` : '') + '</div>';
  let sbL = [];
  function sbHtml(EPS) {
    sbL = sbLinks(EPS);
    return `<div class="fSbWrap"><div class="fSbIn">${EPS.map(({ list }, n) => `<div class="fSbCol"><div class="fSbH">${n + 1}</div>${list.map(sbCard).join('')}</div>`).join('')}<svg class="fSbSvg"></svg></div>`
      + `<div class="fSbLeg"><span style="--c:${SBC.setup}">🌱 → 🎯</span><span style="--c:${SBC.qa}">❓ → 💡</span><span style="--c:${SBC.stake}">📈 → ⚖️</span><span style="--c:${SBC.cons}">⚖️ → ↪️</span></div></div>`;
  }
  function sbDraw() {
    const wrap = el && el.querySelector('.fSbIn'); if (!wrap) return; const svg = wrap.querySelector('svg'), r0 = wrap.getBoundingClientRect();
    svg.setAttribute('width', wrap.scrollWidth); svg.setAttribute('height', wrap.scrollHeight);
    const pos = (id2) => { const nd = wrap.querySelector(`[data-sid="${CSS.escape(id2)}"]`); if (!nd) return null; const r = nd.getBoundingClientRect(); return { x: r.left - r0.left, y: r.top - r0.top, w: r.width, h: r.height }; };
    svg.innerHTML = sbL.map((l) => { const a = pos(l.from), b = pos(l.to); if (!a || !b) return '';
      const same = Math.abs(a.x - b.x) < 20, x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = same ? b.x + b.w : b.x, y2 = b.y + b.h / 2, bend = same ? 26 + Math.abs(y2 - y1) * 0.08 : Math.max(20, (x2 - x1) / 2);
      const d = same ? `M${x1},${y1} C${x1 + bend},${y1} ${x2 + bend},${y2} ${x2},${y2}` : `M${x1},${y1} C${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`;
      return `<path d="${d}" stroke="${SBC[l.t]}" stroke-width="1.6" fill="none" opacity=".85"${l.t === 'future' ? ' stroke-dasharray="4 3"' : ''}/><circle cx="${x2}" cy="${y2}" r="2.6" fill="${SBC[l.t]}"/>`; }).join('');
  }
  // 🧵 the braid: a lane per plotline (and one for the events), the episodes in columns, each beat a dot (its emoji)
  function braidHtml(ST, EPS) {
    const lanes = [...ST.PL.map((p2, k) => ({ id: p2.id, c: LANE[k % LANE.length], who: p2.d.who, e: DK[p2.d.k].e, n: `${DK[p2.d.k].n}${p2.d.t ? ' ' + tName(p2.d) : ''}` })), { id: '·', c: '#8e8e93', e: '💥', n: 'Événements, révélations, choix' }];
    const inLane = (ev, ln) => (ln.id === '·' ? !ev.line : ev.line === ln.id);
    return `<div class="fBraid" data-braidbig="1" style="--n:${EPS.length}"><div class="fBrH"></div>${EPS.map((_, n) => `<div class="fBrH">${n + 1}</div>`).join('')}`
      + lanes.map((ln) => `<div class="fBrL" style="--c:${ln.c}" data-tip="${esc(ln.n)}">${ln.who ? mini(ln.who) : ''}<b>${ln.e}</b></div>` + EPS.map(({ list }) => `<div class="fBrC" style="--c:${ln.c}">${list.filter((ev) => inLane(ev, ln)).map((ev) => `<span data-tip="${esc(`${ev.fr}${ev.n ? ` (${ev.n})` : ''}`)}">${ev.e}</span>`).join('')}</div>`).join('')).join('') + '</div>';
  }
  function render() {
    if (!el) return;
    const ST = story(), cs = ST.C, EPS = episodes(), hasKey = !!ls('smt-key');
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
      + row('💥', EVK.map((o) => chip(`data-evk="${o.id}"`, o.e, o.n, false, '#ff453a', `${o.d}\nUn tap = l’ajouter`)).join(''), 'Les événements : ils créent des désirs, des menaces et des plotlines. Le premier ouvre l’acte')
      + (evs().length ? `<section class="fInfos fEvs">${(S.ev || []).map((e, k) => { if (!EK[e.k] || !live(e.x)) return ''; const K2 = EK[e.k];
        const slot = (f, lbl) => `<button type="button" class="fCyc" data-evs="${k}:${f}" data-tip="${esc(lbl)} · un tap = le suivant">${e[f] && live(e[f]) ? mini(e[f]) : '<span class="fNo">?</span>'}</button>`;
        return `<div><b data-tip="${esc(K2.d)}">${K2.e}</b>${K2.slots.map((f) => slot(f, { x: K2.crime ? 'Le coupable' : e.k === 'threat' ? 'Qui menace' : 'Qui', v: 'La victime (? = hors écran)', s: 'Qui cherche' }[f])).join('')}<span class="fCt">${esc(evFr(e))}${K2.crime ? ` · ${e.h ? '🙈 coupable caché' : `par ${nm(e.x)}`}` : ''}</span>${K2.crime ? `<button type="button" class="fX" data-evh="${k}" data-tip="Coupable caché (révélé dans la crise) ou connu">${e.h ? '🙈' : '👁️'}</button>` : ''}<button type="button" class="fX" data-evd="${k}" data-tip="Retirer">✕</button></div>`; }).join('')}</section>` : '')
      // HOW
      + layer('2', 'Comment', '1. Le moteur : ce qui lance et bloque l’histoire. 2. Les techniques de plot.')
      + `<section class="fConf" data-tip="Les conflits : deux désirs qui ne peuvent pas gagner tous les deux (déduits des désirs, des liens, des événements)">${cs.length ? cs.map((c) => `<div>${mini(c.a)}<b>${c.e}</b>${mini(c.b)}<span class="fCt">${esc(c.fr)}</span></div>`).join('') : '<div class="none">⚠️ <span class="fCt">Pas de conflit : donne des 🎯 qui se croisent</span></div>'}</section>`
      + (ST.PL.length ? `<section class="fPls" data-tip="Les plotlines : un désir fort et ses conflits. Celles de Justin sont les lignes principales ; les autres courent « pendant ce temps »">${ST.PL.map((p2, k) => `<div class="${p2.main ? 'main' : ''}" style="--c:${LANE[k % LANE.length]}"><i></i>${mini(p2.d.who)}<b>${DK[p2.d.k].e}</b><span class="fCt">${esc(`${DK[p2.d.k].n}${p2.d.t ? ' ' + tName(p2.d) : ''}`)}</span><em>${p2.cs.map((c) => c.e).join('')}</em></div>`).join('')}</section>` : '')
      + (ST.X[0] && ST.X[1] ? `<section class="fClim" data-tip="Le climax : Justin choisit entre deux de ses désirs. Tous les épisodes y mènent. Un tap sur un côté = un autre désir ; un tap sur 🏁 = le climax automatique"><button type="button" class="fClimR" data-climauto="1">🏁${S.climax ? '↺' : ''}</button><button type="button" data-clim="0">${DK[ST.X[0].k].e} ${esc(cap(lab(ST.X[0])))}</button><span>ou</span><button type="button" data-clim="1">${DK[ST.X[1].k].e} ${esc(lab(ST.X[1]))}</button><span>?</span></section>` : '')
      + row('🧱', HARD.map((h) => { const ok = hardOk(h.id); return chip(`data-hard="${h.id}"`, h.e, h.n, ok && !!S.hard[h.id], '#bf5af2', ok ? h.d : `${h.d}\n${h.need}`, !ok); }).join(''), 'Pourquoi c’est dur (plusieurs à la fois)')
      // OUTPUT
      + layer('3', 'Ce qui arrive', 'Les événements des 5 épisodes, tirés du reste. Ils vont dans le prompt de chaque épisode.')
      + `<div class="fViews"><button type="button" class="${sbAct ? 'on' : ''}" data-sbact="1" data-tip="Le storyboard de l’acte : une carte par moment, les liens setup → payoff, question → réponse, enjeu → choix, choix → conséquence">🎞️ Storyboard</button><button type="button" class="${braid ? 'on' : ''}" data-braid="1" data-tip="La tresse : une ligne par plotline, les épisodes en colonnes">🧵 Tresse</button></div>` + (sbAct ? sbHtml(EPS) : '') + (braid ? braidHtml(ST, EPS) : '')
      + `<section class="fOut">${EPS.map(({ list, led }, n) => `${n ? `<button type="button" class="fCut" data-uncut="${EPS[n - 1].list.filter((ev) => ev.i != null).pop().i}" data-tip="✂️ Une coupe d’épisode. Un tap = recoller">✂️</button>` : ''}<div class="fEp"><div class="fEpH"><i>${n + 1}</i><button type="button" data-plan="${n}" data-tip="Ouvre le plan de cet épisode dans Plan de scène : rectangles, objectifs, liens. Sans IA">🎬</button><button type="button" data-playep="${n}" data-tip="Joue cet épisode : son plan (sans IA), puis Haiku écrit les répliques">▶</button></div><div>${list.map((ev, k) => evHtml(ev, k, list)).join('')}`
        + `<div data-ledger="${n}" class="fLed${LED.some(([key]) => led[key].length) ? '' : ' none'}">${LED.filter(([key]) => led[key].length).map(([key, e2, tip]) => `<p data-tip="${esc(tip)}"><b>${e2}</b>${led[key].map((x) => esc(x[0])).join(' · ')}</p>`).join('')}</div></div></div>`).join('')}${S.cut ? '<button type="button" class="fAuto" data-x="autocut" data-tip="Remettre les coupes automatiques">↺ Coupes auto</button>' : ''}</section>`
      + `<section class="fGo">${hasKey ? '' : '<input type="text" class="secret" autocomplete="off" autocapitalize="off" spellcheck="false" data-key="1" placeholder="Clé API (sk-ant-…)">'}`
      + '<button type="button" class="go" data-x="play" data-tip="Joue l’épisode 1 : son plan (sans IA), puis Haiku écrit les répliques">▶ Jouer</button><button type="button" data-x="plot" data-tip="Copie le plot : Quoi, Comment, Ce qui arrive, en texte">📄 Copier le plot</button><button type="button" data-x="copy" data-tip="Copie le prompt de l’acte pour un chat (la route par l’Acte) ; la réponse se colle dans Acte › Générer › 1">📋 Prompt de l’acte</button><button type="button" data-x="acte" data-tip="Ouvre l’acte : ses 5 épisodes, les plans">Acte ›</button></section>'
      + `<p class="pMsg fMsg">${esc(msg)}</p>`
      + `<h3 class="fH">🧍 Prompts des pose sheets</h3>`
      + people().map((id) => { const src = img(id), ps = pillarsOf(id);
        return `<section class="fSheet" style="--c:${(P[ps[0]] || { c: '#3a3a3c' }).c}"><div class="fPic">${src ? `<img src="${src}" alt="">` : ''}<i>1</i></div>`
          + `<div class="fSheetR"><b>${esc(nm(id))}<em>${esc(tag(id))}</em></b>`
          + `<div class="fBtns"><button type="button" data-pose="${id}" data-tip="Copie le prompt : ses 6 expressions, à la façon de son archétype">📋 Prompt</button>${src ? `<button type="button" data-cimg="${src}" data-tip="Copie son image (l’image 1), à coller dans ChatGPT avant le prompt">🖼️ Image</button><a href="${src}" download="${sprite(id)}.webp" data-tip="Télécharge son image">⬇</a>` : ''}</div></div></section>`; }).join('');
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
    const zone = e.target.closest('[data-ledger], [data-braidbig], [data-desof], .fSbCard, .fSbRs i');
    if (zone && el.contains(zone) && !e.target.closest('button')) { e.stopPropagation();
      if (zone.dataset.ledger != null) return bigLedger(+zone.dataset.ledger); if (zone.dataset.braidbig) return bigBraid(); if (zone.dataset.desof) return bigDesires(zone.dataset.desof);
      return bigBeat(zone.dataset.sid); }
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
    else if (d.evk) { const x2 = S.cast[0] || J; (S.ev = S.ev || []).push({ k: d.evk, x: x2, v: EK[d.evk].slots.includes('v') ? S.cast.find((o) => o !== x2) || null : null, s: null, h: EK[d.evk].crime ? 1 : 0 }); }
    else if (d.evs) { const [k2, f] = d.evs.split(':'), e = S.ev[+k2], opts2 = f === 'x' ? S.cast : [null, ...people().filter((o) => o !== e.x)]; const at2 = opts2.indexOf(e[f] ?? null); e[f] = opts2[(at2 + 1) % opts2.length]; }
    else if (d.evh) { const e = S.ev[+d.evh]; e.h = e.h ? 0 : 1; }
    else if (d.evd) S.ev.splice(+d.evd, 1);
    else if (d.clim) { const st2 = story(), jd = st2.D.filter((x3) => x3.who === J && x3.s >= 2).concat(st2.D.filter((x3) => x3.who === J && x3.s < 2)), cur2 = st2.X.map((x3) => x3 && x3.id), i2 = +d.clim;
      let at3 = jd.findIndex((x3) => x3.id === cur2[i2]); do at3 = (at3 + 1) % jd.length; while (jd[at3].id === cur2[1 - i2] && jd.length > 1); cur2[i2] = jd[at3].id; S.climax = cur2; }
    else if (d.braid) braid = !braid;
    else if (d.climauto) S.climax = null;
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
