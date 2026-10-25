// Full demo's demos, first episodes (~20 taps each), written with Last call's own systems: its camera (one / two / three),
// silences (hush), choices that remember (set / when), lines only one player sees (only), texts (sms), the episode's end
// (the actor you win) and the end card. Loaded after bar.js: its helpers (R, one, two, hush, sms...) and decors (STREET_BACK...) are shared.
// A solo demo has one seat (the hero, Justin); a 2-player one, two. Everything is in French.
(() => {
  const L = (who, pose, text, o) => [cam('one', who), say(who, pose, text, o)];   // a single on whoever speaks, then the line
  const T = (who, text, o) => [cam('one', who), { ...think(who, text), ...o }];
  const N = (text) => narr(text);
  const stars = (pts) => pts.map(([x, y]) => R(x, y, 4, 4, '#cfd8ff', { r: 2 }));
  const DEMOS = window.DEMO_STORIES = window.DEMO_STORIES || {};
  // id, title, the stories's own parts; steps = the story; o = seats, cast, pick, words
  const story = (id, title, steps, o) => { DEMOS[id] = Object.assign(steps, { gaze: true, credits: '', title }, o); };
  const end = (n, win, kicker, title, lede) => [{ episode: { n, win } }, { fade: 'out', ms: 1600 }, { end: { kicker, title, lede, art: null } }];
  const hero = { justin: { name: 'Justin', color: '#1f7a74', sprite: 'justin' } };
  const heroSolo = { justin: 'Justin' };

  // single-sheet characters (drawn 25/10): they all look to the right
  for (const [id, poses] of Object.entries({ alex: ['beach'], mila: ['beach'], dan: ['stand', 'scared'], rae: ['kneel', 'possessed'], belier_noir: ['stand'], belier_blanc: ['stand'], ombre: ['stand'], exile: ['stand'], ninja: ['stand'], plage: ['stand'] })) FACE[id] = FACE[id] || Object.fromEntries(poses.map((q) => [q, 'r']));

  // ---------- decors ----------
  const wood = [[40, 70], [260, 50], [560, 60], [1100, 50], [1600, 80], [1800, 60]];
  SCENES.e_foret = {   // the island's forest, night 3
    size: [1920, 1240], ambience: 'dark',
    back: [R(0, 0, 1920, 1240, '#070b12'), ...stars([[140, 80], [420, 150], [760, 60], [1120, 120], [1480, 70], [1780, 160]]),
      ...wood.map(([x, w]) => R(x, 0, w, 1000, '#0b0d0b')), R(0, 980, 1920, 260, '#0c0e0a'),
      R(520, 700, 880, 520, 'rgba(120,160,255,.08)', { r: '50%', blur: 60 })],
    spots: { dan: [660, 1170, 650], rae: [1060, 1190, 600] }, face: { dan: 'r', rae: 'l' },
  };
  SCENES.e_colline = {   // the hill at dawn: one oak
    size: [1920, 1240],
    back: [R(0, 0, 1920, 1240, '#d9b99a'), R(0, 0, 1920, 500, '#9db4cf'), R(0, 300, 1920, 260, '#e8c7a0'),
      R(0, 700, 1920, 540, '#4c6a3a'), R(0, 640, 1920, 140, '#5f7f48', { r: '50% 50% 0 0' }),
      R(1380, 300, 90, 740, '#3c281a'), R(1130, 80, 580, 360, '#2f4a2a', { r: '50%' }), R(1230, 20, 380, 240, '#365a30', { r: '50%' }),
      R(1392, 620, 24, 60, '#e9d9a8', { r: 3 })],
    spots: { ebene: [620, 1190, 520], neige: [1020, 1190, 520] }, face: { ebene: 'r', neige: 'l' },
  };
  const metroBack = [R(0, 0, 1920, 1240, '#10151a'), R(0, 0, 1920, 760, '#1c2a2d'),
    ...Array.from({ length: 12 }, (_, i) => R(i * 160, 0, 3, 760, '#0d1618')),
    R(0, 760, 1920, 20, '#3a4448'), R(0, 780, 1920, 460, '#262b2d'), R(0, 1150, 1920, 14, '#d8b43a'),
    R(0, 1190, 1920, 50, '#07090a'), R(0, 1210, 1920, 6, '#555'),
    R(140, 90, 360, 54, '#dff3ee', { r: 6, glow: '0 0 60px 18px rgba(200,255,240,.35)' }),
    R(1250, 90, 360, 54, '#dff3ee', { r: 6, glow: '0 0 60px 18px rgba(200,255,240,.35)' })];
  SCENES.e_metro = {
    size: [1920, 1240], ambience: 'dark', back: metroBack,
    spots: { justin: [560, 1130, 690], ombre: [1300, 1130, 700] }, face: { justin: 'r', ombre: 'l' },
  };
  SCENES.e_metro_noir = { ...SCENES.e_metro, back: [...metroBack, R(0, 0, 1920, 1240, 'rgba(0,0,0,.62)')] };
  SCENES.e_pont = {   // the bridge, night
    size: [1920, 1240], ambience: 'dark',
    back: [R(0, 0, 1920, 1240, '#0a0d16'), ...stars([[200, 90], [600, 160], [980, 70], [1500, 140], [1760, 80]]),
      R(1380, 110, 120, 120, '#e6ebdb', { r: '50%', glow: '0 0 90px 30px rgba(230,235,219,.25)' }),
      R(0, 860, 1920, 380, '#0d1a24'), R(0, 940, 1920, 8, '#1c3347'),
      R(0, 1040, 1920, 200, '#1a1612'), R(0, 1030, 1920, 14, '#2a221b'),
      ...Array.from({ length: 14 }, (_, i) => R(i * 140 + 10, 880, 10, 160, '#2a221b')), R(0, 870, 1920, 12, '#3a2e24')],
    spots: { itsuki: [600, 1180, 690], sora: [1180, 1180, 690] }, face: { itsuki: 'r', sora: 'l' },
  };
  SCENES.e_terrasse = {   // the terrace, no table (the chalet's): three spots
    image: 'bg/terrasse.jpg', size: [1920, 1440],
    spots: { dan: [700, 1300, 740], plage: [1060, 1300, 780], justin: [1420, 1300, 760] },
    face: { dan: 'r', plage: 'r', justin: 'l' }, front: [],
  };
  SCENES.e_salon = {
    image: 'bg/salon.jpg', size: [1920, 1440],
    spots: { justin: [520, 1010, 360], suit: [740, 1010, 360], julian: [910, 1010, 360], amare: [740, 1010, 360], isa: [740, 1010, 360] },
    face: { justin: 'r', suit: 'l', julian: 'l', amare: 'l', isa: 'l' }, front: [],
  };
  SCENES.e_maison3 = {   // the flat's hall: three at the door
    image: 'bg/maison.jpg', size: [1920, 1440],
    spots: { ruby: [330, 1425, 760], james: [660, 1425, 770], diane: [990, 1425, 750] },
    face: { ruby: 'r', james: 'r', diane: 'l' }, front: [],
  };
  SCENES.e_maison2 = {
    image: 'bg/maison.jpg', size: [1920, 1440],
    spots: { ruby: [520, 1425, 760], james: [900, 1425, 770], justin: [760, 1425, 770], amare: [1130, 1425, 760], marc: [1500, 1425, 760] },
    face: { ruby: 'r', james: 'l', justin: 'r', amare: 'l', marc: 'l' }, front: [],
  };
  SCENES.e_bar = { ...SCENES.bar, spots: { justin: [770, 1150, 690], cam: [1010, 1150, 690] }, face: { justin: 'r', cam: 'l' } };
  const sky = (lit) => [R(0, 0, 1920, 1240, '#0a0c1c'), R(0, 0, 1920, 600, 'rgba(120,80,200,.16)'), ...stars([[180, 80], [520, 170], [900, 60], [1300, 130], [1700, 90]]),
    ...Array.from({ length: 11 }, (_, i) => R(i * 180 - 30, 560 + (i * 97) % 160, 150, 700, '#06070f')),
    ...(lit ? Array.from({ length: 30 }, (_, i) => R((i * 61) % 1850 + 20, 640 + (i * 83) % 380, 14, 18, '#ffd9a0')) : []),
    R(0, 1040, 1920, 200, '#15121c'), R(0, 1020, 1920, 30, '#252030')];
  SCENES.e_toit = { size: [1920, 1240], ambience: 'dark', back: sky(true), spots: { justin: [640, 1160, 690], isa: [1240, 1160, 690] }, face: { justin: 'r', isa: 'l' } };
  SCENES.e_toit_noir = { ...SCENES.e_toit, back: sky(false) };
  SCENES.e_gala = {
    size: [1920, 1240], back: HOUSE_BACK, ambience: 'dark',
    spots: { isa: [600, 1170, 690], suit: [980, 1170, 690], julian: [1340, 1170, 700] },
    face: { isa: 'r', suit: 'l', julian: 'l' },
  };
  SCENES.e_feu = { ...SCENES.campfire, spots: { brooke: [500, 1170, 650], justin: [740, 1170, 650] }, face: { brooke: 'r', justin: 'r' } };
  SCENES.e_feu_bas = { ...SCENES.campfire, back: [...SCENES.campfire.back, R(0, 0, 1920, 1240, 'rgba(0,0,0,.4)')],
    spots: SCENES.e_feu.spots, face: SCENES.e_feu.face };
  SCENES.e_brunch = {
    image: 'bg/terrasse.jpg', size: [1920, 1440],
    spots: { mere: [1095, 1050, 650], candy: [1265, 1050, 650], chum: [1435, 1050, 650], justin: [1605, 1050, 650] },
    face: { mere: 'r', candy: 'r', chum: 'r', justin: 'l' }, front: TABLE,
  };
  SCENES.e_rue = { size: [1920, 1440], back: STREET_BACK, front: STREET_FRONT, ambience: 'dark',
    spots: { justin: [620, 1250, 700], julian: [1010, 1250, 700], suit: [1400, 1250, 720] }, face: { justin: 'r', julian: 'l', suit: 'l' } };

  // ---------- 1. Ce qui reste de l'île ----------
  story('d_ile', "Ce qui reste de l'île", [
    scene('e_foret', { dan: 'stand', rae: 'kneel' }),
    cam('wide', 'dan', 'rae'), { fade: 'in', ms: 900 }, { caption: 'Nuit 3 · La forêt de l’île' },
    N("Deux jours que le bateau devait revenir. Le feu s'est éteint il y a une heure."),
    ...L('dan', 'stand', 'Rae. Lève-toi. Il fait presque nuit.'),
    ...L('rae', 'kneel', 'Deux minutes. Juste… deux minutes.'),
    ...L('dan', 'scared', "T'as entendu ça ?"),
    ...L('rae', 'kneel', 'Arrête. Y a rien.'),
    N("Derrière les arbres, quelqu'un chante. Une voix qu'ils connaissent."),
    ...L('dan', 'scared', "C'est Mila."),
    cam('one', 'rae'),
    { by: 'rae', choice: [
      { t: "Écouter.", intent: 'écoute', set: { listen: true }, then: [...L('rae', 'kneel', "Tais-toi. Elle chante la berceuse de l'été."), ...L('dan', 'scared', "On l'a vue tomber, Rae.")] },
      { t: "Elle est morte, Dan.", intent: 'nie', then: [...L('rae', 'kneel', 'Mila est morte. On a tous vu.'), ...L('dan', 'scared', 'Alors pourquoi je reconnais sa voix ?')] },
      { t: "On s'en va. Maintenant.", intent: 'fuit', then: [...L('rae', 'kneel', "On s'en va. Maintenant."), ...L('dan', 'scared', "Et si le bateau revient, et qu'on n'est plus là ?")] },
    ] },
    hush(900), N('La chanson s’arrête. Une branche craque, tout près.'),
    ...T('dan', "Elle chantait ça la nuit où elle est tombée. Je l'ai jamais dit à personne : c'est moi qui l'ai lâchée.", { only: 'dan' }),
    ...L('rae', 'kneel', 'Dan ? Pourquoi tu trembles ?'),
    cam('one', 'dan'),
    { by: 'dan', choice: [
      { t: "Mentir : « J'ai froid. »", intent: 'ment', set: { dan: 'lie' }, then: [...L('dan', 'scared', "J'ai froid, c'est tout."), ...L('rae', 'kneel', 'Tu mens très mal, toi.')] },
      { t: "Avouer : « C'est ma faute. »", intent: 'avoue', set: { dan: 'confess' }, then: [...L('dan', 'scared', "C'est moi. Au bord de la falaise. C'était un accident."), hush(900), ...L('rae', 'kneel', '…Je sais, Dan. Je sais depuis le début.')] },
      { t: 'Courir vers la voix.', intent: 'court', set: { dan: 'run' }, then: [...L('dan', 'scared', 'Mila ! Attends !'), ...L('rae', 'kneel', 'Dan, non !')] },
    ] },
    N('La voix de Mila, toute proche, dit leurs deux noms.'),
    { poses: { rae: 'possessed' } }, hush(700),
    ...L('rae', 'possessed', "Elle dit qu'il y a de la place pour nous deux."),
    ...L('dan', 'scared', 'Rae ? Rae, regarde-moi.'),
    N("Rae sourit. Ce n'est pas son sourire."),
    ...L('rae', 'possessed', 'Viens, Dan. On est tous là.'),
    N("Au loin, sur l'eau, la lumière d'un bateau. Il ne ralentit pas."),
    ...L('dan', 'scared', 'Le bateau, Rae ! LE BATEAU !'),
    ...L('rae', 'possessed', "Il est trop tard."),
    ...end(1, { sprite: 'mila', pose: 'beach', name: 'Mila' }, "Fin de l'épisode 1", "{TITLE}", '{LEDE}'),
  ], {
    seats: ['dan', 'rae'], solo: { dan: 'Dan', rae: 'Rae' },
    pick: { dan: { pose: 'scared', line: "T'as entendu ça ?" }, rae: { pose: 'kneel', line: 'Deux minutes. Juste… deux minutes.' } },
    cast: { dan: { name: 'Dan', color: '#2d6a7a', sprite: 'dan' }, rae: { name: 'Rae', color: '#7a2d52', sprite: 'rae', scale: 0.85 } },
    words: { TITLE: () => "Ce qui reste de l'île",
      LEDE: (f) => `${f.dan === 'confess' ? 'Dan a avoué. Rae le savait.' : f.dan === 'run' ? 'Dan a couru vers la voix.' : 'Dan a menti à Rae.'} ${f.listen ? 'Rae avait écouté la berceuse.' : 'Rae a refusé d’y croire.'} Le bateau n’a pas ralenti.` },
  });

  // ---------- 2. Deux béliers ----------
  story('d_beliers', 'Deux béliers', [
    scene('e_colline', { ebene: 'stand', neige: 'stand' }),
    cam('wide', 'ebene', 'neige'), { fade: 'in', ms: 900 }, { caption: 'Le sommet de la colline · l’aube' },
    ...L('ebene', 'stand', 'Tu es en retard, Neige.'),
    ...L('neige', 'stand', "Je suis en avance. C'est toi qui as dormi ici."),
    ...L('ebene', 'stand', 'Quelqu’un doit garder le sommet.'),
    ...L('neige', 'stand', 'Garder, ou empêcher les autres de monter ?'),
    cam('one', 'ebene'),
    { by: 'ebene', choice: [
      { t: 'Baisser la tête.', intent: 'défie', set: { ton: 'défie' }, then: [...L('ebene', 'stand', 'Dis-le encore une fois. En face.'), ...L('neige', 'stand', "Tu veux vraiment qu'on recommence ?")] },
      { t: 'Rien à dire.', intent: 'sec', set: { ton: 'sec' }, then: [...L('ebene', 'stand', 'Je ne répondrai pas à ça.'), ...L('neige', 'stand', 'Comme toujours.')] },
      { t: 'Peut-être.', intent: 'doute', set: { ton: 'doute' }, then: [...L('ebene', 'stand', '…Peut-être, oui.'), ...L('neige', 'stand', 'Tiens. Tu changes.')] },
    ] },
    N("Dix ans qu'ils se disputent cette colline. Ce matin, le vent s'est tu."),
    ...L('neige', 'stand', '…Ébène. Regarde le chêne.'),
    N("Sur l'écorce, un nom. Fraîchement gravé : « ORAGE »."),
    ...L('ebene', 'stand', "Ce n'est pas mon écriture."),
    ...L('neige', 'stand', 'Ni la mienne.'),
    ...T('ebene', "Orage. Le troisième de la bande, tombé dans le ravin le jour de la tonte. Neige l'avait poussé. J'en suis sûr.", { only: 'ebene' }),
    ...T('neige', "Orage. Tombé dans le ravin le jour de la tonte. Ébène l'avait poussé : il me l'a presque dit, ce soir-là.", { only: 'neige' }),
    cam('one', 'neige'),
    { by: 'neige', choice: [
      { t: 'Lire le nom à voix haute.', intent: 'affronte', set: { geste: 'lit' }, then: [...L('neige', 'stand', 'Orage. Tu le connais, ce nom.'), ...L('ebene', 'stand', 'Ne le dis pas comme ça.')] },
      { t: "Gratter l'écorce.", intent: 'efface', set: { geste: 'gratte' }, then: [...L('neige', 'stand', 'Ça ne devrait pas être là.'), ...L('ebene', 'stand', 'Laisse. Ça ne part pas, regarde.')] },
      { t: 'Accuser Ébène.', intent: 'accuse', set: { geste: 'accuse' }, then: [...L('neige', 'stand', "C'est toi qui l'as gravé."), ...L('ebene', 'stand', 'Tu me crois capable de ça ?')] },
    ] },
    N('En bas, dans la brume, tout le troupeau les regarde.'),
    ...L('ebene', 'stand', 'Tu savais. Depuis le début, tu savais.'),
    ...L('neige', 'stand', "C'est toi qui sais. Toi qui as ri ce jour-là."),
    cam('one', 'ebene'),
    { by: 'ebene', choice: [
      { t: 'Charger Neige.', intent: 'charge', set: { fin: 'charge' }, then: [N('Ébène baisse la tête. Neige ne bouge pas.'), ...L('neige', 'stand', 'Alors fais-le.')] },
      { t: 'Reculer.', intent: 'recule', set: { fin: 'recule' }, then: [N('Ébène recule d’un pas. Pour la première fois en dix ans.'), ...L('neige', 'stand', '…Tu as peur de quoi ?')] },
    ] },
    hush(900), N("Un bêlement lointain répond, de l'autre côté du ravin."),
    ...L('neige', 'stand', 'Tu l’entends aussi ?'),
    ...L('ebene', 'stand', 'Orage ?'),
    ...end(1, { sprite: 'belier_blanc', pose: 'stand', name: 'Neige' }, "Fin de l'épisode 1", 'Deux béliers', "{LEDE}"),
  ], {
    seats: ['ebene', 'neige'], solo: { ebene: 'Ébène', neige: 'Neige' },
    pick: { ebene: { pose: 'stand', line: 'Quelqu’un doit garder le sommet.' }, neige: { pose: 'stand', line: 'Garder, ou empêcher les autres de monter ?' } },
    cast: { ebene: { name: 'Ébène', color: '#33333a', sprite: 'belier_noir', scale: 0.8 }, neige: { name: 'Neige', color: '#8d8a7a', sprite: 'belier_blanc', scale: 0.8 } },
    words: { LEDE: (f) => `${f.fin === 'charge' ? 'Ébène a chargé.' : 'Ébène a reculé.'} Chacun croit l’autre coupable. Quelqu’un répond au nom gravé.` },
  });

  // ---------- 3. Ce qui dort sous la ville ----------
  story('d_ombre', 'Ce qui dort sous la ville', [
    scene('e_metro', { justin: 'thinking' }),
    cam('wide'), { fade: 'in', ms: 900 }, { caption: '3 h 12 · Station Jarry, dernier métro passé' },
    N('Les néons grésillent. Le quai est vide. Les rails vibrent encore, comme si une rame venait de passer.'),
    ...L('justin', 'thinking', 'Y a quelqu’un ?'),
    N('Une voix répond. Elle vient de dessous.'),
    { enter: { ombre: 'stand' } },
    ...L('ombre', 'stand', "Tu m'entends. Personne ne m'entend, d'habitude."),
    ...L('justin', 'surprised', 'Qui… qui parle ?'),
    ...L('ombre', 'stand', "J'ai dormi sous cette ville cent ans. Tu m'as réveillé."),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Je suis désolé.', intent: 'poli', set: { ton: 'poli' }, then: [...L('justin', 'explaining', "Je suis désolé, je savais pas."), ...L('ombre', 'stand', 'Désolé. Ils disent tous ça, au début.')] },
      { t: 'Montre-toi.', intent: 'brave', set: { ton: 'brave' }, then: [...L('justin', 'angry', 'Montre-toi.'), ...L('ombre', 'stand', 'Tu me regardes déjà.')] },
      { t: 'Reculer vers l’escalier.', intent: 'fuit', set: { ton: 'fuit' }, then: [N('Ses pas résonnent. La sortie est murée par le noir.'), ...L('ombre', 'stand', "Il n'y a plus d'escalier, ce soir.")] },
    ] },
    { fade: 'out', ms: 300 }, scene('e_metro_noir', { justin: 'surprised', ombre: 'stand' }), { fade: 'in', ms: 300 },
    N('Les néons s’éteignent un par un, jusqu’à son quai.'),
    ...L('ombre', 'stand', 'Alors tu vas m’aider. Ou tu vas me nourrir.'),
    ...L('justin', 'surprised', 'T’aider à quoi ?'),
    ...L('ombre', 'stand', 'Cherche le wagon zéro. Celui qui n’existe pas.'),
    N('Au fond du tunnel, une rame sans lumière avance sans bruit. Elle ouvre ses portes.'),
    ...T('justin', 'Il y a des gens assis dedans. Ils ont tous mon visage.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Monter dans la rame.', intent: 'monte', set: { fin: 'monte' }, then: [...L('justin', 'thinking', 'Si je monte pas, je saurai jamais.'), ...L('ombre', 'stand', 'Courageux. Ou pressé de disparaître.')] },
      { t: 'Courir vers la sortie.', intent: 'court', set: { fin: 'court' }, then: [N('Il court. Le quai s’allonge à chaque pas.'), ...L('ombre', 'stand', "Cours. Ça ne change que la longueur du chemin.")] },
      { t: 'Demander son nom.', intent: 'curieux', set: { fin: 'nom' }, then: [...L('justin', 'explaining', "Avant de choisir : c'est quoi, ton nom ?"), ...L('ombre', 'stand', 'Celui que tu me donneras.')] },
    ] },
    hush(900), ...L('ombre', 'stand', 'Choisis vite.'),
    N('Dans la rame, tous les visages tournent la tête en même temps.'),
    ...end(1, { sprite: 'ombre', pose: 'stand', name: 'L’Ombre' }, "Fin de l'épisode 1", 'Ce qui dort sous la ville', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'thinking', line: 'Y a quelqu’un ?' } },
    cast: { ...hero, ombre: { name: 'L’Ombre', color: '#3b1f3b', sprite: 'ombre' } },
    words: { LEDE: (f) => `${f.fin === 'monte' ? 'Il est monté dans la rame.' : f.fin === 'court' ? 'Il a couru. Le quai s’est allongé.' : 'Il a demandé son nom à l’Ombre.'} Ce qui dort sous la ville sait déjà le sien.` },
  });

  // ---------- 4. Le serment brisé ----------
  story('d_serment', 'Le serment brisé', [
    scene('e_pont', { itsuki: 'stand', sora: 'stand' }),
    cam('wide'), { fade: 'in', ms: 900 }, { caption: 'Le pont de Kuro · minuit' },
    N('Les chaînes du pont cliquettent. Six lames tournent lentement autour de Sora.'),
    ...L('itsuki', 'stand', 'Six ans. Six ans que je te cherche.'),
    ...L('sora', 'stand', 'Et tu m’as trouvé. Félicitations.'),
    ...L('itsuki', 'stand', 'Rentre avec moi. Ils peuvent encore te pardonner.'),
    ...L('sora', 'stand', "Ce n'est pas moi qui ai besoin de pardon."),
    cam('one', 'itsuki'),
    { by: 'itsuki', choice: [
      { t: 'Tendre la main.', intent: 'tend la main', set: { geste: 'main' }, then: [N('Itsuki ouvre sa paume, sans arme.'), ...L('sora', 'stand', 'Tu ferais ça à quelqu’un qui t’a trahi ?')] },
      { t: 'Poser la lame.', intent: 'désarme', set: { geste: 'lame' }, then: [N('Le katana tinte sur les planches.'), ...L('sora', 'stand', 'Ramasse-le. Ce n’est pas un jeu.')] },
      { t: 'Garder la main sur la lame.', intent: 'méfiant', set: { geste: 'garde' }, then: [...L('itsuki', 'stand', 'Je viens en frère. Je ne viens pas en idiot.'), ...L('sora', 'stand', 'Voilà le Itsuki que je connais.')] },
    ] },
    ...L('itsuki', 'stand', 'Je ne me battrai pas contre toi.'),
    ...L('sora', 'stand', 'Alors tu vas perdre.'),
    ...T('sora', "Ce soir-là, c'est lui qu'on m'ordonnait de tuer. J'ai refusé. J'ai pris sa place sur la liste. Il ne le saura jamais.", { only: 'sora' }),
    ...L('itsuki', 'stand', '…Qu’est-ce qu’ils t’ont fait, cette nuit-là ?'),
    cam('one', 'sora'),
    { by: 'sora', choice: [
      { t: 'Dire la vérité.', intent: 'avoue', set: { sora: 'vérité' }, then: [...L('sora', 'stand', "On m'a demandé ta tête. J'ai dit non."), hush(900), ...L('itsuki', 'stand', 'Tu mens.')] },
      { t: 'Demande-leur.', intent: 'esquive', set: { sora: 'esquive' }, then: [...L('sora', 'stand', 'Demande-leur toi-même. Ils sont sur le pont.'), N('Dans l’ombre des piliers, des silhouettes s’avancent.')] },
      { t: 'Attaquer.', intent: 'attaque', set: { sora: 'attaque' }, then: [N('Une lame jaillit. Itsuki la dévie de justesse.'), ...L('itsuki', 'stand', 'Sora ! Pourquoi ?')] },
    ] },
    N('Au bout du pont, une lanterne s’allume. Puis dix.'),
    ...L('itsuki', 'stand', "Ils t'attendaient. Ils m'ont laissé te trouver."),
    ...L('sora', 'stand', 'Maintenant tu comprends. Cours.'),
    ...end(1, { sprite: 'ninja', pose: 'stand', name: 'Sora' }, "Fin de l'épisode 1", 'Le serment brisé', '{LEDE}'),
  ], {
    seats: ['itsuki', 'sora'], solo: { itsuki: 'Itsuki', sora: 'Sora' },
    pick: { itsuki: { pose: 'stand', line: 'Six ans que je te cherche.' }, sora: { pose: 'stand', line: 'Alors tu vas perdre.' } },
    cast: { itsuki: { name: 'Itsuki', color: '#6a3b2a', sprite: 'exile' }, sora: { name: 'Sora', color: '#2a3a5a', sprite: 'ninja' } },
    words: { LEDE: (f) => `${f.sora === 'vérité' ? 'Sora a dit la vérité. Itsuki ne l’a pas crue.' : f.sora === 'attaque' ? 'Sora a attaqué le premier.' : 'Sora a renvoyé Itsuki à ses questions.'} Dix lanternes s’allument sur le pont.` },
  });

  // ---------- 5. Un été de trop ----------
  story('d_ete', 'Un été de trop', [
    scene('e_terrasse', { plage: 'stand', justin: 'listen' }),
    cam('two', 'plage', 'justin'), { fade: 'in', ms: 900 }, { caption: 'Le chalet · cinq ans plus tard' },
    ...L('plage', 'stand', 'Toi ? Ici ? Ça fait quoi, cinq ans ?'),
    ...L('justin', 'surprised', 'Maya…'),
    ...L('plage', 'stand', "T'as pas changé. Enfin… un peu."),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Toi non plus.', intent: 'doux', set: { ton: 'doux' }, then: [...L('justin', 'explaining', 'Toi non plus. Même regard.'), ...L('plage', 'stand', 'Ne commence pas.')] },
      { t: 'Cinq ans et deux mois.', intent: 'compte', set: { ton: 'compte' }, then: [...L('justin', 'thinking', 'Cinq ans et deux mois.'), ...L('plage', 'stand', 'Tu comptais ?')] },
      { t: 'Qu’est-ce que tu fais là ?', intent: 'sec', set: { ton: 'sec' }, then: [...L('justin', 'angry', "Qu'est-ce que tu fais là ?"), ...L('plage', 'stand', 'Même question.')] },
    ] },
    N('Elle enlève ses lunettes. Elle le regarde comme avant.'),
    ...L('plage', 'stand', 'Tu savais que je serais là, hein ?'),
    ...L('justin', 'thinking', 'On m’a juste dit de venir à six heures.'),
    ...L('plage', 'stand', 'Personne vient ici par hasard.'),
    ...T('justin', 'La dernière fois que je l’ai vue ici, elle partait avec mon meilleur ami. Je n’ai jamais su pourquoi.'),
    ...L('plage', 'stand', "Tu veux la vérité, ou la version qui fait le moins mal ?"),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'La vérité.', intent: 'veut savoir', set: { veut: 'vérité' }, then: [...L('justin', 'angry', 'La vérité. Pour une fois.'), ...L('plage', 'stand', 'Alors tu vas détester ce que je vais dire.')] },
      { t: 'La version douce.', intent: 'esquive', set: { veut: 'douce' }, then: [...L('justin', 'thinking', 'Celle qui fait le moins mal.'), ...L('plage', 'stand', 'Je savais que tu dirais ça.')] },
    ] },
    N('Derrière elle, la porte du chalet s’ouvre.'),
    { enter: { dan: 'stand' } },
    ...L('dan', 'stand', 'Maya, j’ai trouvé les clés… Oh.'),
    ...L('justin', 'surprised', 'Théo ?'),
    N('Ton ex-meilleur ami. Une valise à la main.'),
    ...L('plage', 'stand', 'Ah. J’aurais dû te le dire.'),
    ...L('dan', 'stand', "Il ne devait pas être là. Tu m'avais promis."),
    ...L('justin', 'thinking', 'Promis quoi, Maya ?'),
    ...L('plage', 'stand', 'Que personne ne saurait pour l’été.'),
    ...end(1, { sprite: 'plage', pose: 'stand', name: 'Maya' }, "Fin de l'épisode 1", 'Un été de trop', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'surprised', line: 'Maya…' } },
    cast: { ...hero, plage: { name: 'Maya', color: '#c98a4a', sprite: 'plage' }, dan: { name: 'Théo', color: '#2d6a7a', sprite: 'dan' } },
    words: { LEDE: (f) => `${f.veut === 'vérité' ? 'Tu as demandé la vérité.' : 'Tu as préféré la version douce.'} Maya et Théo cachent un été que tu n’as pas vécu.` },
  });

  // ---------- 6. Sous la table ----------
  story('d_table', 'Sous la table', [
    scene('e_salon', { justin: 'listen', suit: 'adjust', julian: 'smirk' }),
    cam('three', 'justin', 'suit', 'julian'), { fade: 'in', ms: 900 }, { caption: 'Salle du conseil · 23 h 50' },
    N('Deux millions sur la table. Un stylo doré. Dix secondes pour signer.'),
    ...L('suit', 'offer', 'Signez, et personne n’apprendra ce que vous avez fait à Montréal.'),
    ...L('justin', 'surprised', 'Je ne suis jamais allé à Montréal.'),
    ...L('julian', 'smirk', 'Ce n’est pas ce que dit cette photo.'),
    N('Il glisse une photo sur la table. Face cachée.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Retourner la photo.', intent: 'regarde', set: { geste: 'photo' }, then: [...L('justin', 'angry', 'Retournez-la. Tout de suite.'), ...L('suit', 'angry', 'Signez d’abord.')] },
      { t: 'Prendre le stylo.', intent: 'cède', set: { geste: 'stylo' }, then: [N('Sa main touche le stylo. Il est glacé.'), ...L('julian', 'cold', 'Prudent. Ça ne se reprend pas.')] },
      { t: 'Les regarder tous les deux.', intent: 'observe', set: { geste: 'observe' }, then: [...L('justin', 'thinking', "L'un de vous ment. Je cherche lequel."), ...L('suit', 'adjust', 'Vous avez neuf secondes.')] },
    ] },
    ...L('julian', 'cold', 'Vous bluffez.'),
    ...L('suit', 'adjust', 'Peut-être. Vous avez dix secondes pour le découvrir.'),
    N('Le compte à rebours de la salle claque sur le mur : 10, 9, 8…'),
    ...T('justin', 'Julian a retenu sa respiration quand j’ai touché la photo. Le costume, lui, ne regarde que ma main.'),
    cam('one', 'julian'),
    { by: 'justin', choice: [
      { t: 'Accuser le costume.', intent: 'suit', set: { accuse: 'suit' }, then: [...L('justin', 'angry', 'C’est vous qui mentez. Vous regardez trop mon stylo.'), ...L('suit', 'angry', 'Prouvez-le.')] },
      { t: 'Accuser Julian.', intent: 'julian', set: { accuse: 'julian' }, then: [...L('justin', 'angry', 'Julian. Tu transpires.'), ...L('julian', 'hands_up', 'Moi ? Je suis là pour vous aider.')] },
      { t: 'Signer.', intent: 'signe', set: { accuse: 'signe' }, then: [N('Le stylo gratte le papier. Les deux hommes ne bougent plus.'), ...L('suit', 'offer', 'Voilà qui est sage.')] },
    ] },
    N('3… 2… La photo se retourne d’elle-même, glissée par un courant d’air.'),
    N('On y voit la salle du conseil. Cette table. Ce soir. Et les trois hommes autour.'),
    ...L('suit', 'adjust', 'Cette photo n’était pas dans mon dossier.'),
    ...L('julian', 'smirk', 'Alors qui l’y a mise ?'),
    ...end(1, { sprite: 'julian', pose: 'smirk', name: 'Julian' }, "Fin de l'épisode 1", 'Sous la table', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'surprised', line: 'Je ne suis jamais allé à Montréal.' } },
    cast: { ...hero, suit: { name: 'Le costume', color: '#26262b', sprite: 'suit' }, julian: { name: 'Julian', color: '#6b5a3a', sprite: 'julian' } },
    words: { LEDE: (f) => `${f.accuse === 'suit' ? 'Tu as accusé le costume.' : f.accuse === 'julian' ? 'Tu as accusé Julian.' : 'Tu as signé.'} La photo montre cette salle, ce soir. Quelqu’un vous regarde.` },
  });

  // ---------- 7. Trois clés, une porte ----------
  story('d_cles', 'Trois clés, une porte', [
    scene('e_maison3', { ruby: 'holding', james: 'surprised', diane: 'explaining' }),
    cam('three', 'ruby', 'james', 'diane'), { fade: 'in', ms: 900 }, { caption: 'Le couloir de la coloc · 19 h' },
    ...L('ruby', 'holding', 'Qui a mis une clé dans ma boîte aux lettres ?'),
    ...L('james', 'surprised', "Moi aussi, j'en ai reçu une."),
    ...L('diane', 'explaining', 'Moi aussi. Et il y a un mot : « Chambre de Sophie ».'),
    ...L('ruby', 'angry', 'Sophie est partie il y a six mois.'),
    ...L('diane', 'angry', 'Elle t’a dit au revoir, à toi, James ?'),
    cam('one', 'james'),
    { by: 'james', choice: [
      { t: 'Oui, bien sûr.', intent: 'ment', set: { james: 'ment' }, then: [...L('james', 'explaining', 'Oui. Elle m’a dit au revoir. Par texto.'), ...L('diane', 'angry', 'Fais voir le texto.')] },
      { t: 'Non, personne.', intent: 'honnête', set: { james: 'honnête' }, then: [...L('james', 'listen', "Non. Elle n'a rien dit à personne."), ...L('ruby', 'thinking', 'C’est ce que je croyais aussi.')] },
      { t: 'Pourquoi tu me regardes comme ça ?', intent: 'se défend', set: { james: 'défend' }, then: [...L('james', 'surprised', 'Pourquoi tu me regardes comme ça ?'), ...L('diane', 'angry', 'Parce que tu as peur.')] },
    ] },
    ...T('ruby', "Sophie m'a écrit la veille de son départ : « Si je disparais, ne laisse pas James entrer dans ma chambre. »", { only: 'ruby' }),
    ...T('james', "Sophie m'a laissé un mot la veille : « Si je disparais, ne laisse pas Ruby voir ce qu'il y a derrière la porte. »", { only: 'james' }),
    ...L('diane', 'explaining', 'Donc on entre. À trois. Chacun sa clé.'),
    cam('two', 'ruby', 'james'),
    { by: 'ruby', choice: [
      { t: 'Ouvrir la porte.', intent: 'ouvre', set: { porte: 'ouvre' }, then: [N('Trois clés, trois tours. La serrure cède d’un coup.')] },
      { t: "Attendre : « Pas ce soir. »", intent: 'attend', set: { porte: 'attend' }, then: [...L('ruby', 'holding', 'Pas ce soir. Pas dans cet état.'), ...L('diane', 'angry', 'On a tous la même clé, Ruby. On le fera ce soir.')] },
    ] },
    N('La chambre sent encore son parfum. Le lit est fait. Le rideau est tiré.'),
    ...L('james', 'surprised', 'Elle a tout laissé. Même ses lunettes.'),
    ...L('ruby', 'surprised', 'Regardez le mur.'),
    N('Au-dessus du lit, trois clés accrochées à trois clous. Une quatrième, vide.'),
    ...L('diane', 'thinking', 'Il y a quatre clous. Qui a la quatrième clé ?'),
    N('Quelque part dans l’appartement, une porte claque.'),
    ...end(1, { sprite: 'diane', pose: 'explaining', name: 'Diane' }, "Fin de l'épisode 1", 'Trois clés, une porte', '{LEDE}'),
  ], {
    seats: ['ruby', 'james'], solo: { ruby: 'Ruby', james: 'James' },
    pick: { ruby: { pose: 'holding', line: 'Qui a mis une clé dans ma boîte aux lettres ?' }, james: { pose: 'surprised', line: "Moi aussi, j'en ai reçu une." } },
    cast: { ruby: { name: 'Ruby', color: '#3b1f6e', sprite: 'ruby', scale: 0.95 }, james: { name: 'James', color: '#6e2b2b', sprite: 'james' }, diane: { name: 'Diane', color: '#5a2a3a', sprite: 'diane' } },
    words: { LEDE: (f) => `${f.james === 'ment' ? 'James a menti sur Sophie.' : f.james === 'honnête' ? 'James a dit la vérité.' : 'James s’est défendu trop vite.'} ${f.porte === 'attend' ? 'Ils ont attendu, puis ouvert.' : 'La porte s’est ouverte.'} Il manque une clé.` },
  });

  // ---------- 8. Appel manqué ----------
  story('d_appel', 'Appel manqué', [
    scene('e_maison2', { justin: 'phone_call' }),
    cam('one', 'justin'), { fade: 'in', ms: 900 }, { caption: 'Chez Marco · 22 h 40' },
    ...L('justin', 'phone_call', 'Marco ? Marco, réponds !'),
    N('Messagerie. Pour la dix-septième fois.'),
    ...L('justin', 'surprised', 'T’as laissé ta porte ouverte, man…'),
    N('La télé allumée. Le son coupé. Une assiette encore chaude.'),
    ...L('justin', 'thinking', 'Il était là. Il y a cinq minutes.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Fouiller le salon.', intent: 'fouille', set: { geste: 'salon' }, then: [N('Sous le canapé, son portefeuille. Ses clés. Sa veste.'), ...L('justin', 'surprised', 'Il serait pas parti sans ça.')] },
      { t: 'Rappeler.', intent: 'rappelle', set: { geste: 'appel' }, then: [N('Une sonnerie étouffée. Quelque part dans l’appartement.'), ...L('justin', 'thinking', 'Il est ici. Son téléphone est ici.')] },
      { t: 'Appeler la police.', intent: 'prudent', set: { geste: 'police' }, then: [...L('justin', 'phone_call', 'Allô ? Je voudrais signaler… non, rien.'), N('La ligne est coupée. Plus de réseau.')] },
    ] },
    N('Sur la table, une note. Son écriture.'),
    ...L('justin', 'phone_shock', '« Ne me cherche pas. Ils écoutent. »'),
    ...L('justin', 'thinking', 'Qui ça, « ils » ?'),
    N('Le téléphone de Justin vibre dans sa main. « Marco ».'),
    ...L('justin', 'phone_call', 'Marco ? Où t’es ?'),
    N('Une voix, très basse : « Ne rentre pas chez moi. Sors. Maintenant. »'),
    ...L('justin', 'phone_shock', 'Je suis déjà dedans.'),
    N('Un silence. Puis : « Alors ne regarde pas la télé. »'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Regarder la télé.', intent: 'regarde', set: { fin: 'regarde' }, then: [N('L’écran affiche la pièce. Vue de haut. Justin au centre, le téléphone à l’oreille.')] },
      { t: 'Courir vers la porte.', intent: 'court', set: { fin: 'court' }, then: [N('La porte est fermée à clé. De l’extérieur.')] },
      { t: 'Raccrocher.', intent: 'coupe', set: { fin: 'coupe' }, then: [N('Il raccroche. La télé s’allume seule, sans le son.')] },
    ] },
    ...L('justin', 'phone_shock', 'Marco… c’est une caméra.'),
    N('À l’écran, une silhouette passe derrière lui.'),
    ...end(1, { sprite: 'justin_b', pose: 'phone_call', name: 'Justin' }, "Fin de l'épisode 1", 'Appel manqué', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'phone_call', line: 'Marco ? Marco, réponds !' } },
    cast: { ...hero },
    words: { LEDE: (f) => `${f.fin === 'regarde' ? 'Tu as regardé la télé.' : f.fin === 'court' ? 'La porte était fermée de l’extérieur.' : 'Tu as raccroché.'} Quelqu’un est derrière toi.` },
  });

  // ---------- 9. Le pacte du bar ----------
  story('d_pacte', 'Le pacte du bar', [
    scene('e_bar', { justin: 'drunk_listen', cam: 'sip' }),
    cam('two', 'justin', 'cam'), { fade: 'in', ms: 900 }, { caption: 'Samedi · 2 h 10 du matin' },
    ...L('cam', 'sip', 'En 2016, t’as signé une serviette. Tu te souviens de ce qu’il y avait dessus ?'),
    ...L('justin', 'drunk_listen', 'Que si personne était casé à 30 ans…'),
    ...L('cam', 'flirty', 'Joyeux anniversaire.'),
    ...L('justin', 'drunk_happy', 'Attends. T’es sérieuse ?'),
    ...L('cam', 'awkward', 'J’ai gardé la serviette, Justin.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Donc on est fiancés.', intent: 'blague', set: { ton: 'blague' }, then: [...L('justin', 'drunk_flirt', 'Donc techniquement, on est fiancés.'), ...L('cam', 'worried', 'Techniquement, j’ai quelqu’un.')] },
      { t: 'Elle est où, la serviette ?', intent: 'curieux', set: { ton: 'curieux' }, then: [...L('justin', 'drunk_listen', 'Elle est où, cette serviette ?'), ...L('cam', 'awkward', 'Dans mon sac. Je l’ai amenée pour toi.')] },
      { t: 'Qui est-ce ?', intent: 'jaloux', set: { ton: 'jaloux' }, then: [...L('justin', 'drunk_sad', 'T’as quelqu’un ? Depuis quand ?'), ...L('cam', 'worried', 'Depuis assez longtemps pour que ça compte.')] },
    ] },
    N('Elle sort la serviette de son sac. Un rond de verre, une écriture ronde, deux signatures.'),
    ...L('cam', 'thinking', 'Lis le bas de la page.'),
    ...T('justin', "En bas, en tout petit : « Si l'un des deux ment, l'autre doit le dire en face. » Je ne me souviens pas de l'avoir écrit.", { only: 'justin' }),
    ...T('cam', "Il ne sait pas pourquoi j'ai sorti cette serviette ce soir. Je dois lui dire pour Sam avant minuit.", { only: 'cam' }),
    ...L('justin', 'drunk_listen', 'C’est quoi, cette phrase ?'),
    cam('one', 'cam'),
    { by: 'cam', choice: [
      { t: 'Dire la vérité.', intent: 'avoue', set: { cam: 'vérité' }, then: [...L('cam', 'worried', 'Je vais me marier. Avec Sam. En juin.'), hush(900), ...L('justin', 'drunk_sad', '…En juin.')] },
      { t: 'Changer de sujet.', intent: 'esquive', set: { cam: 'esquive' }, then: [...L('cam', 'tipsy_laugh', 'Rien. Une vieille blague. Commande-nous un verre.'), ...L('justin', 'drunk_listen', 'Tu me caches quelque chose.')] },
      { t: 'Embrasser Justin.', intent: 'embrasse', set: { cam: 'baiser' }, then: [N('Elle se penche. Le temps d’une seconde, le bar disparaît.'), ...L('justin', 'drunk_happy', 'Wow. D’accord.')] },
    ] },
    N('Son téléphone vibre sur le comptoir. « Sam ❤ ». Elle ne le retourne pas.'),
    ...L('justin', 'drunk_sad', 'Tu réponds pas ?'),
    sms('inconnu', 'cam', 'tu devrais pas être avec lui ce soir. j’ai tout vu sur la caméra du bar'),
    ...L('cam', 'worried', 'Justin… c’est pas Sam qui écrit.'),
    ...end(1, { sprite: 'justin_bar', pose: 'drunk_happy', name: 'Justin' }, "Fin de l'épisode 1", 'Le pacte du bar', '{LEDE}'),
  ], {
    seats: ['justin', 'cam'], solo: { justin: 'Justin', cam: 'Cam' },
    pick: { justin: { pose: 'drunk_happy', line: 'Que si personne était casé à 30 ans…' }, cam: { pose: 'sip', line: 'J’ai gardé la serviette, Justin.' } },
    cast: { justin: { name: 'Justin', color: '#1f7a74', sprite: 'justin_bar' }, cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 }, inconnu: { name: 'Inconnu', color: '#26262b', sprite: 'suit' } },
    words: { LEDE: (f) => `${f.cam === 'vérité' ? 'Cam a dit pour Sam.' : f.cam === 'baiser' ? 'Cam a préféré embrasser Justin.' : 'Cam a changé de sujet.'} Quelqu’un les observait depuis le début.` },
  });

  // ---------- 10. Où étais-tu hier soir ? ----------
  story('d_mensonge', 'Où étais-tu hier soir ?', [
    scene('e_maison2', { ruby: 'angry', james: 'listen' }),
    cam('two', 'ruby', 'james'), { fade: 'in', ms: 900 }, { caption: 'Mercredi · 7 h 15' },
    ...L('ruby', 'angry', "C'est qui, « Marc », qui commande le tiramisu pour deux ?"),
    ...L('james', 'explaining', 'Un client.'),
    ...L('ruby', 'thinking', 'Un mardi. À 22 h.'),
    ...L('james', 'listen', 'Les clients sont pas toujours dispos le jour.'),
    cam('one', 'ruby'),
    { by: 'ruby', choice: [
      { t: 'Appelle-le. Haut-parleur.', intent: 'exige', set: { ton: 'exige' }, then: [...L('ruby', 'holding', 'Appelle-le. Maintenant. Sur haut-parleur.'), ...L('james', 'thinking', 'Ruby…')] },
      { t: 'Montre-moi ton téléphone.', intent: 'fouille', set: { ton: 'fouille' }, then: [...L('ruby', 'holding', 'Montre-moi ton téléphone.'), ...L('james', 'angry', 'C’est une blague ?')] },
      { t: 'Laisser tomber.', intent: 'recule', set: { ton: 'recule' }, then: [...L('ruby', 'listen', 'Laisse. Je vais pas faire ça.'), ...L('james', 'thinking', 'Merci. Je t’expliquerai.')] },
    ] },
    N('Le téléphone de James vibre dans sa main.'),
    sms('marc', 'james', 'Merci pour hier ❤'),
    ...T('james', "Marc, c'est le notaire qui prépare la surprise. Mais le message est affreux, vu comme ça.", { only: 'james' }),
    ...L('ruby', 'angry', 'Lis-le à voix haute.'),
    cam('one', 'james'),
    { by: 'james', choice: [
      { t: 'Lire à voix haute.', intent: 'transparent', set: { james: 'lit' }, then: [...L('james', 'explaining', "« Merci pour hier. »"), ...L('ruby', 'angry', 'Et le cœur ?')] },
      { t: 'Cacher le téléphone.', intent: 'cache', set: { james: 'cache' }, then: [N('Il glisse l’appareil dans sa poche arrière.'), ...L('ruby', 'angry', 'Parfait. Merci.')] },
      { t: 'Dire la vérité.', intent: 'avoue', set: { james: 'vérité' }, then: [...L('james', 'explaining', "C'est pour toi. C'est une surprise, Ruby."), ...L('ruby', 'surprised', 'Une surprise. Un mardi. À 22 h.')] },
    ] },
    ...L('ruby', 'thinking', 'Tu mens très bien, James.'),
    ...L('james', 'surprised', 'Je mens pas.'),
    ...T('ruby', "J'ai vu un reçu pour une bague. Et un autre pour un billet d'avion. Je ne sais plus quoi croire.", { only: 'ruby' }),
    ...L('ruby', 'holding', 'Alors dis-moi ce que tu as fait hier.'),
    sms('marc', 'ruby', "Ruby, c'est Marc. Dis à James que ça ne marche pas pour samedi."),
    ...L('ruby', 'surprised', 'Pourquoi il m’écrit à moi ?'),
    ...L('james', 'angry', "Ne réponds pas. S'il te plaît."),
    ...end(1, { sprite: 'james_noir', pose: 'angry', name: 'James' }, "Fin de l'épisode 1", 'Où étais-tu hier soir ?', '{LEDE}'),
  ], {
    seats: ['ruby', 'james'], solo: { ruby: 'Ruby', james: 'James' },
    pick: { ruby: { pose: 'angry', line: "C'est qui, « Marc » ?" }, james: { pose: 'listen', line: 'Les clients sont pas toujours dispos le jour.' } },
    cast: { ruby: { name: 'Ruby', color: '#3b1f6e', sprite: 'ruby', scale: 0.95 }, james: { name: 'James', color: '#6e2b2b', sprite: 'james' }, marc: { name: 'Marc', color: '#2d6a7a', sprite: 'dan' } },
    words: { LEDE: (f) => `${f.james === 'lit' ? 'James a tout lu à voix haute.' : f.james === 'cache' ? 'James a caché son téléphone.' : 'James a parlé d’une surprise.'} Marc vient d’écrire à Ruby. Samedi approche.` },
  });

  // ---------- 11. Nuit blanche ----------
  story('d_nuit', 'Nuit blanche', [
    scene('e_toit', { justin: 'thinking', isa: 'listen' }),
    cam('wide'), { fade: 'in', ms: 900 }, { caption: '4 h 02 · Le toit' },
    ...L('isa', 'listen', 'Enfin. Je pensais que tu viendrais plus tôt.'),
    ...L('justin', 'surprised', 'On se connaît ?'),
    ...L('isa', 'explaining', 'Fais pas cette tête. On s’est déjà parlé.'),
    ...L('isa', 'thinking', 'Pas ici. Pas comme ça. Mais souvent.'),
    ...L('justin', 'thinking', 'Je me souviens de rien.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Qui es-tu ?', intent: 'demande', set: { ton: 'demande' }, then: [...L('justin', 'explaining', 'Qui es-tu ?'), ...L('isa', 'listen', 'Quelqu’un qui connaît ton vrai prénom.')] },
      { t: 'Redescendre.', intent: 'fuit', set: { ton: 'fuit' }, then: [N('La porte du toit est verrouillée. De l’intérieur.'), ...L('isa', 'listen', 'Tu sais très bien qu’elle est fermée.')] },
      { t: 'Rester silencieux.', intent: 'attend', set: { ton: 'attend' }, then: [hush(1200), ...L('isa', 'explaining', 'Bien. Tu apprends.')] },
    ] },
    ...L('isa', 'holding', 'Tu te souviens de rien, hein ?'),
    ...L('justin', 'surprised', 'Je devrais ?'),
    N('Au loin, toutes les lumières de la ville s’éteignent. D’un coup.'),
    { fade: 'out', ms: 200 }, scene('e_toit_noir', { justin: 'surprised', isa: 'angry' }), { fade: 'in', ms: 200 },
    ...L('isa', 'angry', 'Ok. On a moins de temps que prévu.'),
    ...L('justin', 'surprised', 'Moins de temps pour quoi ?'),
    ...L('isa', 'holding', 'Tu me fais confiance ?'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Oui.', intent: 'confiance', set: { conf: 'oui' }, then: [...L('justin', 'listen', 'Oui. Je sais pas pourquoi.'), ...L('isa', 'explaining', 'C’est exactement la bonne réponse.')] },
      { t: 'Non.', intent: 'méfiance', set: { conf: 'non' }, then: [...L('justin', 'angry', 'Non.'), ...L('isa', 'listen', 'Bien. Reste comme ça jusqu’à la fin.')] },
      { t: 'Ça dépend.', intent: 'prudent', set: { conf: 'dépend' }, then: [...L('justin', 'thinking', 'De quoi ça dépend ?'), ...L('isa', 'explaining', 'De ce que tu vas voir derrière toi.')] },
    ] },
    N('Quelqu’un est assis au bord du toit, dos à eux. Ses cheveux sont exactement ceux de Justin.'),
    ...L('isa', 'surprised', 'Il est en avance, lui aussi.'),
    ...L('justin', 'surprised', 'C’est… moi ?'),
    ...end(1, { sprite: 'isa_noir', pose: 'holding', name: 'Isa (braise)' }, "Fin de l'épisode 1", 'Nuit blanche', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'thinking', line: 'Je me souviens de rien.' } },
    cast: { ...hero, isa: { name: 'Isa', color: '#c2366b', sprite: 'isa_nuit', scale: 0.96 } },
    words: { LEDE: (f) => `${f.conf === 'oui' ? 'Tu lui as fait confiance.' : f.conf === 'non' ? 'Tu t’es méfié.' : 'Tu as hésité.'} Sur le bord du toit, quelqu’un te ressemble.` },
  });

  // ---------- 12. Gala d'or ----------
  story('d_gala', "Gala d'or", [
    scene('e_gala', { isa: 'holding', suit: 'adjust', julian: 'cold' }),
    cam('three', 'isa', 'suit', 'julian'), { fade: 'in', ms: 900 }, { caption: 'Hôtel Danubia · Gala annuel, 22 h' },
    ...L('isa', 'angry', 'Mon collier était à mon cou il y a dix minutes.'),
    ...L('suit', 'angry', 'Et vous m’accusez ? Je ne touche pas aux bijoux.'),
    ...L('julian', 'smirk', 'Seulement aux contrats.'),
    N('Les portes se ferment. Clic. Clic. Clic.'),
    ...L('isa', 'holding', 'Personne ne sort d’ici avant que je le retrouve.'),
    cam('one', 'suit'),
    { by: 'suit', choice: [
      { t: 'Accuser Julian.', intent: 'accuse', set: { accuse: 'julian' }, then: [...L('suit', 'adjust', 'Je l’ai vu près du vestiaire, lui.'), ...L('julian', 'hands_up', 'Moi ? Je cherchais mon manteau.')] },
      { t: 'Défendre son alibi.', intent: 'défend', set: { accuse: 'alibi' }, then: [...L('suit', 'adjust', "J'étais à la table 4. Demandez au serveur."), ...L('julian', 'smirk', 'Quel serveur ?')] },
      { t: 'Fouiller les poches.', intent: 'fouille', set: { accuse: 'poches' }, then: [...L('suit', 'offer', 'Pas d’objection à ce qu’on vérifie. Pour tout le monde.'), ...L('julian', 'cold', 'Naturellement.')] },
    ] },
    ...T('isa', 'Le collier est dans ma pochette. Je l’ai caché moi-même. Ils doivent croire qu’il est volé.', { only: 'isa' }),
    ...T('suit', "Le collier, c'est Julian qui me l'a mis dans la poche en passant. Je le sens contre ma cuisse.", { only: 'suit' }),
    ...L('julian', 'cold', 'Madame, vous êtes pâle.'),
    cam('one', 'isa'),
    { by: 'isa', choice: [
      { t: 'Faire fouiller le costume.', intent: 'accuse suit', set: { fin: 'suit' }, then: [...L('isa', 'angry', 'Vous. Vos poches. Maintenant.'), ...L('suit', 'angry', 'Vous n’avez pas le droit.')] },
      { t: 'Faire fouiller Julian.', intent: 'accuse julian', set: { fin: 'julian' }, then: [...L('isa', 'angry', 'Vous. Vos poches.'), ...L('julian', 'smirk', 'Avec plaisir.')] },
      { t: 'Avouer le piège.', intent: 'avoue', set: { fin: 'avoue' }, then: [...L('isa', 'holding', "Le collier n'a jamais été volé."), ...L('suit', 'surprised', 'Pardon ?')] },
    ] },
    N('Un cri dans la salle de bal. Les lumières vacillent.'),
    ...L('julian', 'smirk', 'Quelqu’un a profité du noir.'),
    ...L('suit', 'adjust', 'Il y a un collier sur le sol. Ce n’est pas le vôtre.'),
    ...L('isa', 'surprised', 'Alors le mien est dans MA pochette ?'),
    N('Elle ouvre la pochette. Elle est vide.'),
    ...end(1, { sprite: 'isa_or', pose: 'holding', name: 'Isa (or)' }, "Fin de l'épisode 1", "Gala d'or", '{LEDE}'),
  ], {
    seats: ['isa', 'suit'], solo: { isa: 'Isa', suit: 'Le costume' },
    pick: { isa: { pose: 'holding', line: 'Mon collier était à mon cou.' }, suit: { pose: 'adjust', line: 'Je ne touche pas aux bijoux.' } },
    cast: { isa: { name: 'Isa', color: '#c2366b', sprite: 'isa_or', scale: 0.96 }, suit: { name: 'Le costume', color: '#26262b', sprite: 'suit' }, julian: { name: 'Julian', color: '#6b5a3a', sprite: 'julian' } },
    words: { LEDE: (f) => `${f.fin === 'avoue' ? 'Isa a avoué le piège.' : f.fin === 'suit' ? 'Isa a fait fouiller le costume.' : 'Isa a fait fouiller Julian.'} Le collier a quand même disparu. Trois alibis, un seul est vrai.` },
  });

  // ---------- 13. Le colocataire ----------
  story('d_coloc', 'Le colocataire', [
    scene('e_maison2', { justin: 'listen', amare: 'listen' }),
    cam('two', 'justin', 'amare'), { fade: 'in', ms: 900 }, { caption: 'Samedi · 7 h · Ton premier matin' },
    ...L('amare', 'listen', "T'as bien dormi ? Je t'ai entendu rêver."),
    ...L('justin', 'surprised', 'Rêver ?'),
    ...L('amare', 'thinking', 'De la mer. Encore.'),
    ...L('justin', 'thinking', 'Encore ? On se connaît depuis deux jours.'),
    ...L('amare', 'explaining', 'Moi ? Non, je dors jamais vraiment. C’est une condition.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Quelle condition ?', intent: 'creuse', set: { ton: 'creuse' }, then: [...L('justin', 'explaining', 'Une condition de quoi ?'), ...L('amare', 'holding', 'Du bail. Tu as bien lu le bail ?')] },
      { t: 'Changer de sujet.', intent: 'évite', set: { ton: 'évite' }, then: [...L('justin', 'listen', 'Bon. Il y a du café ?'), ...L('amare', 'listen', 'Déjà prêt. Deux sucres, comme toi.')] },
      { t: 'Remercier pour le petit-déjeuner.', intent: 'poli', set: { ton: 'poli' }, then: [...L('justin', 'explaining', 'Merci pour le petit-déj.'), ...L('amare', 'surprised', 'De rien. Tu en auras besoin.')] },
    ] },
    N('Sur le comptoir, ton agenda. Ouvert à demain. Annoté. Pas par toi.'),
    ...L('justin', 'surprised', 'Pourquoi t’as touché à mon agenda ?'),
    ...L('amare', 'holding', 'Demain va être une grosse journée pour toi.'),
    ...L('justin', 'angry', 'Comment tu sais ça ?'),
    ...L('amare', 'surprised', 'J’ai juste voulu être prêt.'),
    N('À la fenêtre, un homme en manteau gris regarde l’immeuble. Il est là depuis l’aube.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Lire les notes.', intent: 'lit', set: { geste: 'lit' }, then: [N('« 9 h : ne PAS ouvrir à la livraison. 14 h : couper l’eau. 21 h : il vient. »'), ...L('justin', 'phone_shock', 'Qui vient ?')] },
      { t: "Fermer l'agenda.", intent: 'ignore', set: { geste: 'ferme' }, then: [...L('justin', 'angry', "C'est privé."), ...L('amare', 'listen', 'Tu auras bientôt envie de le rouvrir.')] },
      { t: 'Regarder par la fenêtre.', intent: 'observe', set: { geste: 'fenêtre' }, then: [...L('justin', 'thinking', "Y a un type en bas depuis tout à l'heure."), ...L('amare', 'thinking', 'Il est là pour toi. Pas pour moi.')] },
    ] },
    ...L('amare', 'listen', 'Toi, t’es prêt ?'),
    ...L('justin', 'surprised', 'Prêt pour quoi ?'),
    N('Elle lui tend une clé. Une vieille clé, froide.'),
    ...L('amare', 'holding', 'Ton bail dit : celui qui l’accepte reste. Celui qui la refuse part. Et ne revient pas.'),
    ...end(1, { sprite: 'amare', pose: 'holding', name: 'Amare' }, "Fin de l'épisode 1", 'Le colocataire', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'surprised', line: 'Rêver ?' } },
    cast: { ...hero, amare: { name: 'Amare', color: '#5a2d8c', sprite: 'amare', scale: 0.93 } },
    words: { LEDE: (f) => `${f.geste === 'lit' ? 'Tu as lu les notes d’Amare.' : f.geste === 'ferme' ? 'Tu as fermé l’agenda.' : 'Tu as vu l’homme en bas.'} La clé est sur la table. Il est 9 h moins une.` },
  });

  // ---------- 14. Autour du feu ----------
  story('d_feu', 'Autour du feu', [
    scene('e_feu', { brooke: 'sit_fire', justin: 'listen' }),
    cam('wide'), { fade: 'in', ms: 900 }, { caption: 'Le chalet · Le lac · Minuit' },
    ...L('brooke', 'sit_fire', 'Tu veux la vraie histoire du lac ou celle qu’on raconte aux enfants ?'),
    ...L('justin', 'listen', 'La vraie.'),
    ...L('brooke', 'drunk_talk', 'Une fille nageait ici toutes les nuits. Un soir, elle est remontée… avec quelqu’un.'),
    ...L('justin', 'listen', 'Qui ça ?'),
    N('Le feu baisse d’un coup.'),
    { fade: 'out', ms: 200 }, scene('e_feu_bas', { brooke: 'nervous', justin: 'surprised' }), { fade: 'in', ms: 200 },
    ...L('justin', 'surprised', 'T’as vu ça ?'),
    ...L('brooke', 'nervous', 'C’est le vent.'),
    ...L('justin', 'angry', 'Y a pas de vent.'),
    cam('one', 'brooke'),
    { by: 'brooke', choice: [
      { t: 'Continuer l’histoire.', intent: 'continue', set: { ton: 'continue' }, then: [...L('brooke', 'drunk_talk', 'Elle est remontée avec quelqu’un. Et ce quelqu’un lui ressemblait.'), N('Le feu vacille encore.')] },
      { t: 'Éteindre la discussion.', intent: 'coupe', set: { ton: 'coupe' }, then: [...L('brooke', 'nervous', 'Bon, c’est tard. On devrait dormir.'), ...L('justin', 'listen', 'Tu me caches la fin.')] },
      { t: 'Rire.', intent: 'rit', set: { ton: 'rit' }, then: [...L('brooke', 'drunk_smile', 'Ha ! Je t’ai eu, non ?'), N('Le feu baisse encore. Plus personne ne rit.')] },
    ] },
    ...T('brooke', "La fille, c'est ma sœur. Elle n'est jamais remontée. Je suis revenue ici pour savoir quelque chose.", { only: 'brooke' }),
    ...T('justin', "Je connais cette histoire. Je l'ai vue dans le journal de mon père. C'est lui qu'on cherchait, ce soir-là.", { only: 'justin' }),
    ...L('justin', 'listen', 'Brooke. Pourquoi tu m’as emmené ici ?'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Dire la vérité.', intent: 'avoue', set: { justin: 'vérité' }, then: [...L('justin', 'explaining', 'Mon père est dans cette histoire. Je le sais depuis ce matin.'), ...L('brooke', 'nervous', '…Je sais.')] },
      { t: 'Mentir.', intent: 'ment', set: { justin: 'ment' }, then: [...L('justin', 'listen', 'Je sais rien. C’est une histoire.'), N('Le feu baisse. D’un cran de plus.')] },
      { t: 'Retourner la question.', intent: 'renvoie', set: { justin: 'renvoie' }, then: [...L('justin', 'angry', 'C’est toi qui as choisi ce lac. Pourquoi ?'), ...L('brooke', 'nervous', 'Parce que ça fait cinq ans.')] },
    ] },
    N('Sur l’eau, une lanterne flotte. Ni vent. Ni barque.'),
    ...L('brooke', 'nervous', 'Quelqu’un vient de mentir.'),
    ...L('justin', 'surprised', 'Qui ?'),
    ...L('brooke', 'sit_fire', 'Le feu le sait déjà.'),
    ...end(1, { sprite: 'brooke', pose: 'sit_fire', name: 'Brooke' }, "Fin de l'épisode 1", 'Autour du feu', '{LEDE}'),
  ], {
    seats: ['brooke', 'justin'], solo: { brooke: 'Brooke', justin: 'Justin' },
    pick: { brooke: { pose: 'sit_fire', line: 'Tu veux la vraie histoire du lac ?' }, justin: { pose: 'listen', line: 'La vraie.' } },
    cast: { brooke: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' }, justin: { name: 'Justin', color: '#1f7a74', sprite: 'justin' } },
    words: { LEDE: (f) => `${f.justin === 'vérité' ? 'Justin a avoué le journal de son père.' : f.justin === 'ment' ? 'Justin a menti.' : 'Justin a retourné la question.'} Le feu baisse à chaque secret. Il vient de baisser.` },
  });

  // ---------- 15. Candy ne ment jamais ----------
  story('d_candy', 'Candy ne ment jamais', [
    scene('e_brunch', { mere: 'listen', candy: 'explaining', chum: 'listen', justin: 'listen' }),
    cam('wide'), { fade: 'in', ms: 900 }, { caption: 'Brunch du dimanche · Chez ta mère' },
    ...L('candy', 'explaining', "J'adore ta mère ! Elle est exactement comme tu l'as décrite."),
    ...L('mere', 'surprised', 'Décrite ?'),
    ...L('candy', 'thinking', 'Non mais pas dans le mauvais sens. Juste… intense.'),
    ...L('candy', 'holding', 'Pis toi, t’es le fameux chum ! Celui du test.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Quel test ?', intent: 'demande', set: { ton: 'demande' }, then: [...L('justin', 'surprised', 'Quel test ?'), ...L('candy', 'surprised', 'Oups. Il savait pas pour le test ?')] },
      { t: "Candy, tais-toi.", intent: 'coupe', set: { ton: 'coupe' }, then: [...L('justin', 'angry', 'Candy. Tais-toi.'), ...L('candy', 'explaining', 'Je mens jamais. Je peux pas me taire non plus.')] },
      { t: 'Faire comme si de rien.', intent: 'évite', set: { ton: 'évite' }, then: [...L('justin', 'listen', 'Un test ? Haha, non, aucune idée.'), ...L('chum', 'thinking', 'Moi non plus.')] },
    ] },
    N('Le chum pose sa fourchette. La mère aussi.'),
    ...L('chum', 'angry', 'Quel test, Candy ?'),
    ...L('candy', 'explaining', 'Bon. Je mens jamais, alors je vais tout dire.'),
    ...L('mere', 'angry', 'Candy. Pas devant tout le monde.'),
    ...L('candy', 'holding', 'Ta mère l’a fait passer à un test de personnalité avant de dire oui au mariage.'),
    cam('one', 'chum'),
    { by: 'justin', choice: [
      { t: 'Défendre ta mère.', intent: 'défend mère', set: { camp: 'mère' }, then: [...L('justin', 'explaining', "C'était une blague, c'est tout."), ...L('chum', 'angry', 'Une blague avec un questionnaire de douze pages ?')] },
      { t: 'Défendre ton chum.', intent: 'défend chum', set: { camp: 'chum' }, then: [...L('justin', 'angry', 'Maman, c’est pas correct.'), ...L('mere', 'surprised', 'Tu prends sa défense, devant moi ?')] },
      { t: "Se cacher sous la table.", intent: 'fuit', set: { camp: 'fuit' }, then: [N('Sous la nappe, il y a déjà quelqu’un : le chien. Il a l’air de trouver ça normal.')] },
    ] },
    ...L('candy', 'thinking', 'Oups. Je viens de dire autre chose, hein ?'),
    ...L('chum', 'surprised', 'Quoi, autre chose ?'),
    ...L('candy', 'explaining', 'Que ta mère a refusé le test. Il a eu un résultat catastrophique.'),
    N('Silence. Quelqu’un tousse. Le chien aboie sous la table.'),
    ...L('mere', 'angry', 'Je vais chercher le dessert.'),
    ...L('candy', 'holding', 'Elle ment, ta mère. Je sens ça.'),
    ...end(1, { sprite: 'candy', pose: 'explaining', name: 'Candy' }, "Fin de l'épisode 1", 'Candy ne ment jamais', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'listen', line: 'Je suis venu manger, pas me battre.' } },
    cast: { ...hero, mere: { name: 'Ta mère', color: '#a3203c', sprite: 'melissa', scale: 0.95 }, candy: { name: 'Candy', color: '#d0632a', sprite: 'candy', scale: 0.93 }, chum: { name: 'Ton chum', color: '#6e2b2b', sprite: 'james' } },
    words: { LEDE: (f) => `${f.camp === 'mère' ? 'Tu as défendu ta mère.' : f.camp === 'chum' ? 'Tu as pris le parti de ton chum.' : 'Tu t’es caché sous la table.'} Candy ne ment jamais. Elle n’a pas fini.` },
  });

  // ---------- 16. Un dernier boulot ----------
  story('d_contrat', 'Un dernier boulot', [
    scene('e_rue', { justin: 'listen', julian: 'talk', suit: 'listen' }),
    cam('two', 'justin', 'julian'), { fade: 'in', ms: 900 }, { caption: 'Ruelle Saint-Roch · 23 h 15' },
    ...L('julian', 'talk', 'Un dernier boulot. Après, tu me revois plus jamais.'),
    ...L('justin', 'angry', 'Tu as déjà dit ça la dernière fois.'),
    ...L('julian', 'hands_up', 'Je sais. J’ai dit ça la dernière fois.'),
    ...L('julian', 'offer', 'Une enveloppe. Point A, point B. Dix mille.'),
    N("L'enveloppe est lourde. Trop pour du papier."),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Prendre l’enveloppe.', intent: 'accepte', set: { geste: 'prend' }, then: [N('Elle pèse dans sa main comme un secret.'), ...L('julian', 'smirk', 'Bon choix.')] },
      { t: 'Poser des questions.', intent: 'questionne', set: { geste: 'questions' }, then: [...L('justin', 'thinking', "C'est quoi dedans ?"), ...L('julian', 'cold', 'Pose pas de questions, c’est inclus dans le prix.')] },
      { t: 'Refuser.', intent: 'refuse', set: { geste: 'refuse' }, then: [...L('justin', 'angry', "Non. Cette fois c'est non."), ...L('julian', 'cold', "Ce n'était pas une question.")] },
    ] },
    ...L('julian', 'cold', 'Et regarde-moi. Pas l’homme derrière moi.'),
    ...T('justin', 'Un costume gris, trois mètres derrière lui, immobile, bras croisés. Je ne l’avais pas vu arriver.'),
    ...L('justin', 'surprised', 'Qui c’est ?'),
    ...L('julian', 'listen', 'Un témoin. Il vient avec le contrat.'),
    ...L('suit', 'listen', 'Vous ne lui avez pas dit ?'),
    ...L('julian', 'hands_up', 'Je lui dirai quand il aura signé.'),
    cam('one', 'justin'),
    { by: 'justin', choice: [
      { t: 'Ouvrir l’enveloppe.', intent: 'ouvre', set: { fin: 'ouvre' }, then: [N('Dedans, une clé, une photo de toi, et une adresse qui est la tienne.')] },
      { t: 'Reculer.', intent: 'recule', set: { fin: 'recule' }, then: [N('Il recule d’un pas. Le costume gris avance d’un pas.')] },
      { t: 'Fixer le costume.', intent: 'défie', set: { fin: 'fixe' }, then: [...L('justin', 'angry', 'Vous. Vous êtes qui ?'), ...L('suit', 'listen', 'Votre prochain client.')] },
    ] },
    ...L('julian', 'smirk', 'Alors ? On a un deal ?'),
    ...L('suit', 'offer', 'Il a dix secondes pour répondre. Après, le prix double.'),
    N('Un moteur gronde au bout de la ruelle. Des phares s’allument.'),
    ...L('julian', 'cold', 'Fallait pas traîner.'),
    ...end(1, { sprite: 'julian', pose: 'cold', name: 'Julian' }, "Fin de l'épisode 1", 'Un dernier boulot', '{LEDE}'),
  ], {
    seats: ['justin'], solo: heroSolo,
    pick: { justin: { pose: 'angry', line: 'Tu as déjà dit ça la dernière fois.' } },
    cast: { ...hero, julian: { name: 'Julian', color: '#6b5a3a', sprite: 'julian' }, suit: { name: 'Le costume gris', color: '#26262b', sprite: 'suit' } },
    words: { LEDE: (f) => `${f.fin === 'ouvre' ? 'L’enveloppe contenait ton adresse.' : f.fin === 'recule' ? 'Tu as reculé.' : 'Tu as défié le costume gris.'} Les phares avancent dans la ruelle.` },
  });
})();
