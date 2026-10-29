// Test — one short 2-player story that runs through (almost) every system of the engine, clean enough for a class:
// Justin and Brooke (Last call's), the stranger, an interrogation room at 2 a.m. In order: the caption, the camera
// (wide, three, two, one, the reveal toes to head), silences, a choice each, a private text (only Brooke reads it) and
// a line only one player sees, two versions (each one is told something different), cover or rat in two separate
// rooms (split), a text from one room to the other (mark / waitMark), a slate, an incoming call (ring) and the call
// itself (call), a choice made at the same time by both, the end that reads every choice, the episode's end (the
// actor you win) and the end card. Loaded after games.js (its rooms, R, one, two, hush, sms).
(() => {
  const D = window.DEMO_STORIES = window.DEMO_STORIES || {};
  const N = { pa: 'Justin', pb: 'Brooke' }, other = (k) => (k === 'pa' ? 'pb' : 'pa');

  // ---------- decors ----------
  // the interrogation room (games.js), the two of them side by side behind the table, the stranger facing them
  SCENES.t_room = { size: SCENES.room.size, back: SCENES.room.back, front: SCENES.room.front,
    spots: { pa: [600, 1150, 690], pb: [880, 1150, 690], suit: [1360, 1150, 720] }, face: { pa: 'r', pb: 'r', suit: 'l' } };
  // the call, split screen: room 1 on the left (Justin, still inside), the corridor on the right (Brooke, let out)
  SCENES.t_call = { size: [1920, 1240], spots: { pa: [480, 1180, 700], pb: [1440, 1180, 700] }, face: { pa: 'r', pb: 'l' },
    back: [
      R(0, 0, 960, 1240, '#23262b'), R(0, 860, 960, 380, '#1a1c20'), R(560, 260, 340, 300, '#0d1117', { line: '14px solid #3a3f47' }),
      R(478, 0, 4, 200, '#0a0b0d'), R(410, 200, 140, 44, '#2f3238', { r: '70px 70px 6px 6px' }),
      R(436, 240, 88, 12, '#fff3cf', { r: 6, glow: '0 0 100px 50px rgba(255,236,190,.25)' }),
      R(960, 0, 960, 1240, '#0d0f12'), R(1100, 300, 200, 640, '#3a2f26', { line: '10px solid #241c16' }),
      R(1580, 300, 200, 640, '#3a2f26', { line: '10px solid #241c16' }), R(1420, 150, 40, 16, '#ffe9b0', { r: 8, glow: '0 0 80px 30px rgba(255,233,176,.22)' }),
      R(954, 0, 12, 1240, '#000'),
    ], front: [] };

  // ---------- cover or rat, then a text through the wall: each player in his own room, neither sees the other ----------
  const room = (k) => [
    { slate: k === 'pa' ? 'Salle 1. Brooke est dans la salle 2.' : 'Salle 2. Justin est dans la salle 1.' },
    scene('room', { [k]: k === 'pa' ? 'drunk_listen' : 'nervous', suit: 'listen' }), two(k, 'suit'), { fade: 'in', ms: 500 }, hush(900),
    one('suit'), say('suit', 'offer', `${N[other(k)]} dit que c'est toi. Dis que c'est lui, et tu sors d'ici.`, { to: k }),
    one(k), hush(1200),
    { by: k, choice: [
      { t: 'Le couvrir.', intent: 'couvre', set: { [k]: 'couvre' }, then: [say(k, k === 'pa' ? 'drunk_serious' : 'thinking', `${N[other(k)]} a rien pris.`, { to: 'suit' })] },
      { t: 'Le balancer.', intent: 'balance', set: { [k]: 'balance' }, then: [say(k, 'drunk_sad', `…C'est ${N[other(k)]}.`, { to: 'suit' })] },
    ] },
    one('suit'), hush(700),
    ...(k === 'pa' ? [
      // Justin: the stranger steps out, his phone is still on the table — one text to Brooke
      say('suit', 'adjust', 'Je reviens.', { to: 'pa' }), { exit: 'suit' },
      one('pa'), narr('Ton cell est resté sur la table. Une minute, pas plus.'),
      { by: 'pa', choice: [
        { t: 'Texto : « Il est pas policier. »', intent: 'prévient', set: { warn: true }, then: [sms('pa', 'pb', 'Il est pas policier. Dis rien.')] },
        { t: 'Texto : « Dis la vérité. »', intent: 'honnête', set: { warn: false }, then: [sms('pa', 'pb', 'Dis-lui la vérité. On a rien fait.')] },
      ] },
      { mark: 'texte' },
      hush(600), narr("La porte se rouvre. L'étranger a une feuille à la main."),
    ] : [
      // Brooke: his phone buzzes in his pocket, he reads it once Justin has written
      say('suit', 'listen', 'Ton ami est plus bavard que toi.', { to: 'pb' }),
      { waitMark: 'texte' },
      one('pb'), hush(500), { check: 'pb' }, hush(800),
      { when: (f) => f.warn, then: [{ ...think('pb', "Pas policier ? Il m'a jamais montré de badge."), only: 'pb' }],
        else: [{ ...think('pb', 'La vérité. Facile à dire, avec le texto de Cam dans ma poche.'), only: 'pb' }] },
    ]),
  ];

  // ---------- the call: Justin is kept, Brooke is let out into the corridor; Justin calls or texts, Brooke answers or not ----------
  const callA = [
    scene('room', { pa: 'drunk_listen' }), one('pa'), { fade: 'in', ms: 400 }, hush(600),
    narr('Brooke est sorti. Toi, on te garde encore.'),
    { by: 'pa', choice: [
      { t: 'Appeler Brooke.', intent: 'appelle', set: { call: true }, then: [{ poses: { pa: 'texting' } }] },
      { t: 'Lui écrire.', intent: 'écrit', set: { call: false }, then: [sms('pa', 'pb', "T'es où ? Attends-moi.")] },
    ] },
    { mark: 'decide' },
    { when: (f) => f.call, then: [narr('Ça sonne…')] },
    { waitMark: 'repond' },
    { when: (f) => f.call && !f.answered, then: [hush(1400), narr('Messagerie.')] },
  ];
  const callB = [
    scene('corridor', { pb: 'nervous' }), { cam: 'wide', at: 960 }, { fade: 'in', ms: 400 }, hush(700),
    narr('Un couloir. Deux portes. Personne pour te dire laquelle est la sortie.'),
    { waitMark: 'decide' },
    { when: (f) => f.call, then: [
      { by: 'pb', ring: 'Justin', choice: [
        { t: 'Répondre', intent: 'répond', set: { answered: true }, then: [] },
        { t: 'Refuser', intent: 'refuse', set: { answered: false }, then: [narr('Tu laisses sonner.')] },
      ] },
    ], else: [{ check: 'pb' }, hush(900)] },
    { mark: 'repond' },
  ];

  // ---------- the last choice, made at the same time: leave now, or wait for the other one ----------
  const last = (k) => [{ by: k, choice: [
    { t: "Partir tout de suite.", intent: 'part', set: { ['f' + k]: 'part' }, then: [] },
    { t: `Attendre ${N[other(k)]}.`, intent: 'attend', set: { ['f' + k]: 'attend' }, then: [] },
  ] }];
  // what the stranger makes of the two rooms, then of the two doors
  function ending(f) {
    const rat = f.pa === 'balance' ? 'Justin' : 'Brooke', kept = f.pa === 'balance' ? 'Brooke' : 'Justin';
    const verdict = f.pa === f.pb ? (f.pa === 'couvre' ? "Aucun de vous deux n'a parlé. C'est rare." : "Vous vous êtes vendus tous les deux. En dix secondes.") : `${rat} a parlé. ${kept}, non.`;
    const steps = [one('suit'), hush(900), say('suit', 'listen', verdict, { to: 'pa' })];
    if (f.fpa === 'attend' && f.fpb === 'attend') steps.push(
      two('pa', 'pb'), narr("Personne n'a pris la porte. Vous êtes encore là, tous les deux."),
      one('suit'), say('suit', 'adjust', "Il n'y a jamais eu de mallette.", { to: 'pa' }),
      one('pa'), say('pa', 'angry', 'Pardon ?', { to: 'suit' }),
      one('suit'), say('suit', 'offer', "Je cherchais deux personnes qui s'attendent. Je vous rappelle.", { to: 'pb' }), { exit: 'suit' },
      { set: { title: 'Recrutés' } });
    else if (f.fpa === 'part' && f.fpb === 'part') steps.push(
      { fade: 'out', ms: 500 }, scene('t_room', { suit: 'listen' }), one('suit'), { fade: 'in', ms: 500 },
      narr("Deux portes claquent. L'étranger sort une mallette de sous la table."),
      say('suit', 'adjust', 'Dommage.'),
      { set: { title: 'Deux portes' } });
    else {
      const w = f.fpa === 'attend' ? 'pa' : 'pb';
      steps.push(
        { exit: other(w) }, one(w), narr(`${N[other(w)]} est déjà parti. ${N[w]} attend tout seul.`),
        one('suit'), say('suit', 'listen', `Il t'a pas attendu. Toi, tu l'as attendu. Retiens ça.`, { to: w }),
        { set: { title: 'Chacun pour soi' } });
    }
    return steps;
  }

  D.d_test = Object.assign([
    // the room: both of them, the stranger, a man nobody asked for a badge
    scene('t_room', { pa: 'drunk_listen', pb: 'nervous', suit: 'listen' }),
    { cam: 'wide', at: 980 }, { fade: 'in', ms: 900 },
    { caption: 'Poste 12 · 2 h 14' },
    narr("Une salle sans fenêtre. Une lampe. Un miroir qui n'en est pas un."),
    { reveal: 'suit', ms: 1600 },
    say('suit', 'adjust', "Messieurs. Merci d'être venus.", { to: 'pa' }),
    one('pa'), say('pa', 'drunk_serious', "On avait pas vraiment le choix.", { to: 'suit' }),
    one('suit'), say('suit', 'listen', 'Une mallette a disparu du Larina ce soir. Vous étiez les derniers au bar.', { to: 'pa' }),
    cam('three', 'pa', 'pb', 'suit'), say('pb', 'thinking', 'Une mallette ? On a même pas vu de mallette.', { to: 'suit' }),
    one('suit'), say('suit', 'offer', 'Alors ce sera vite réglé. Vos téléphones sur la table.', { to: 'pb' }),
    one('pa'),
    { by: 'pa', choice: [
      { t: 'Poser son cell.', intent: 'coopère', set: { badge: false }, then: [say('pa', 'explaining', "Tenez. J'ai rien à cacher.", { to: 'suit' })] },
      { t: 'Demander son badge.', intent: 'méfiant', set: { badge: true }, then: [
        say('pa', 'angry', "Votre badge d'abord.", { to: 'suit' }),
        one('suit'), hush(1300), say('suit', 'adjust', 'Plus tard.', { to: 'pa' }),
      ] },
    ] },
    // the secret: a text only Brooke reads; Justin only sees him read it
    one('pb'), hush(600),
    { sms: { from: 'cam', to: 'pb', text: "Dis rien pour la mallette. Je t'explique demain. — Cam", only: 'pb' } },
    hush(700), { check: 'pb' }, hush(900),
    { narr: 'Brooke lit un texto. Son visage change.', only: 'pa' },
    { ...think('pb', 'Cam. Cam sait quelque chose.'), only: 'pb' },
    { by: 'pb', choice: [
      { t: 'Retourner son cell.', intent: 'cache', set: { secret: false }, then: [{ poses: { pb: 'nervous' } }, narr('Écran contre la table.')] },
      { t: 'Montrer le texto à Justin.', intent: 'dit tout', set: { secret: true }, then: [
        say('pb', 'drunk_talk', 'Justin. Regarde ça.', { to: 'pa' }),
        one('pa'), say('pa', 'phone_shock', '…Cam ?', { to: 'pb' }),
      ] },
    ] },
    // two versions: on his way up, the stranger tells each one something different
    one('suit'), say('suit', 'listen', 'On va faire ça un à la fois.', { to: 'pa' }),
    { narr: "En se levant, l'étranger te glisse, juste à toi : « Brooke a déjà tout avoué. »", only: 'pa' },
    { narr: "En se levant, l'étranger te glisse, juste à toi : « Justin a déjà tout avoué. »", only: 'pb' },
    { fade: 'out', ms: 600 },
    { split: () => ({ pa: room('pa'), pb: room('pb') }), watch: () => 'pa',
      hold: () => ({ pa: "Brooke est encore dans l'autre salle", pb: "Justin est encore dans l'autre salle" }) },
    { fade: 'out', ms: 500 },
    { split: () => ({ pa: callA, pb: callB }), watch: () => 'pb', hold: () => ({ pa: 'En attente de Brooke', pb: 'En attente de Justin' }) },
    { when: (f) => f.call && f.answered, then: [
      // the call: each phone sees only its own player, the other one is a voice
      { fade: 'out', ms: 400 }, scene('t_call', { pa: 'texting', pb: 'texting' }), { call: { watch: 'pb' } }, one('pa'), { fade: 'in', ms: 400 },
      say('pa', 'texting', "Brooke. Il t'a montré un badge, à toi ?"),
      one('pb'), hush(900), say('pb', 'texting', '…Non. Jamais.'),
      one('pa'), say('pa', 'texting', 'Moi non plus.'),
      one('pb'), hush(800), { call: false }, narr("Une porte s'ouvre au bout du couloir."),
    ] },
    // back in the room, both of them: the doors
    { fade: 'out', ms: 600 }, scene('t_room', { pa: 'drunk_listen', pb: 'nervous', suit: 'listen' }), cam('three', 'pa', 'pb', 'suit'), { fade: 'in', ms: 600 },
    one('suit'), say('suit', 'adjust', 'Vous pouvez partir. Chacun sa porte.', { to: 'pa' }),
    say('suit', 'offer', "Celui qui part maintenant ne revoit jamais cette salle. Celui qui attend l'autre… on verra.", { to: 'pb' }),
    two('pa', 'pb'), narr("Vous choisissez en même temps. Aucun des deux ne voit le choix de l'autre."),
    { split: () => ({ pa: last('pa'), pb: last('pb') }), watch: () => 'pa', hold: () => ({ pa: 'Brooke choisit', pb: 'Justin choisit' }) },
    { fn: ending },
    { episode: { n: 1, win: { sprite: 'suit', pose: 'adjust', name: "L'étranger" } } },
    { fade: 'out', ms: 1600 },
    { end: { kicker: "Fin de l'épisode 1", title: '{TITLE}', lede: '{LEDE}', art: null } },
  ], {
    gaze: true, credits: '', title: 'Test',
    // the TV's opening (before the first scene): what's going on, for a room that doesn't see the phones
    intro: ['2 h du matin. Une mallette a disparu du bar Larina.', 'Justin et Brooke étaient les derniers clients. Un homme en complet les a emmenés dans une salle sans fenêtre.',
      "Il dit qu'il est policier. Il n'a montré de badge à personne."],
    seats: ['pa', 'pb'], solo: { pa: 'Justin', pb: 'Brooke' },
    pick: { pa: { pose: 'drunk_serious', line: 'On avait pas vraiment le choix.' }, pb: { pose: 'nervous', line: 'Une mallette ? On a même pas vu de mallette.' } },
    cast: {
      pa: { name: 'Justin', color: '#1f7a74', sprite: 'justin_bar' },
      pb: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' },
      suit: { name: "L'étranger", color: '#26262b', sprite: 'suit' },
      cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 },
    },
    words: {
      TITLE: (f) => f.title || 'Test',
      LEDE: (f) => [
        f.badge ? 'Justin a demandé un badge. Il ne l’a jamais vu.' : 'Justin a posé son cell sans poser de questions.',
        f.secret ? 'Brooke a montré le texto de Cam.' : 'Brooke a gardé le texto de Cam pour lui.',
        f.pa === f.pb ? (f.pa === 'couvre' ? 'Aucun n’a balancé l’autre.' : 'Chacun a balancé l’autre.') : `${f.pa === 'balance' ? 'Justin' : 'Brooke'} a balancé l’autre.`,
      ].join(' '),
    },
  });
})();
