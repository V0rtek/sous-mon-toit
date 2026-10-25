// Playthrough — 2 joueurs, ~2 min. Dans la salle d'attente, chacun prend un perso : pa (le gars urbain) ou pb (le lion) ;
// {PA} / {PB} = le nom de celui qui l'a pris. Chaque choix appartient à un perso (by) ; la fin dépend des deux.

CAST.rocco = { name: 'Rocco', color: '#5a2d8c', sprite: 'amare', scale: 1.04 };
// the friends' table (same café as chapter 1); outside = the same photo, no table, face to face
SCENES.cafe = {
  image: 'bg/terrasse.jpg', size: [1920, 1440],
  spots: { rocco: [690, 1110, 700], ruby: [1180, 1050, 650], pb: [1400, 1050, 650], pa: [1620, 1050, 650] },
  face: { rocco: 'r', ruby: 'r', pb: 'r', pa: 'l' },
  front: TABLE,
};
SCENES.dehors = {
  image: 'bg/terrasse.jpg', size: [1920, 1440],
  spots: { rocco: [760, 1300, 820], pa: [1120, 1300, 780], pb: [1420, 1300, 760], ruby: [1680, 1300, 740] },
  face: { rocco: 'r', pa: 'l', pb: 'l', ruby: 'l' },
  front: [],
};

const FOOD = { poutine: ['la poutine', 'MA POUTINE'], brocoli: ['le poulet-brocoli', 'MON POULET'], shake: ['le shake', 'MON SHAKE'] };
// a fight goes outside: same photo, face to face. pb = how the lion stands in it (backs his friend up or films)
const outside = (pb, ...steps) => [
  { fade: 'out', ms: 250 },
  scene('dehors', { rocco: 'angry', pa: 'angry', pb, ruby: 'surprised' }),
  cam('two', 'rocco', 'pa'),
  { fade: 'in', ms: 250 },
  ...steps,
  { poses: { pa: 'listen' } },   // after the fight: back to normal
];
const knockout = (line) => [
  { poses: { rocco: 'surprised' } }, say('pa', 'punch', line), { exit: 'rocco' },
  { poses: { pb: 'surprised', ruby: 'surprised' } }, cam('two', 'pb', 'ruby'), narr("Rocco s'effondre dans les chaises."),
];

// Nobody freezes: whoever listens turns to the speaker and drops their talking gesture (done by the player), the speaker
// turns to whom they talk to (to: ..., else whoever spoke last), and each beat sets the listeners' reactions here.
window.PLAY = [
  scene('cafe', { rocco: 'listen', ruby: 'listen', pb: 'listen', pa: 'listen' }),
  cam('three', 'ruby', 'pb', 'pa'),
  { fade: 'in', ms: 900 },
  { caption: 'Samedi, 22 h · Café Larina' },
  say('pb', 'explaining', "Trois semaines de cut. C'est fini. Ce soir, je mange.", { to: 'pa' }),
  say('ruby', 'thinking', "Vous parlez juste de gym, vous deux."),
  say('pa', 'explaining', "Faux. On parle aussi de protéines.", { to: 'ruby' }),
  cam('one', 'pb'),
  { by: 'pb', choice: [
    { t: 'Une poutine triple.', intent: 'cheat meal', set: { food: 'poutine' }, then: [
      say('pb', 'explaining', "Une poutine triple, extra sauce. J'ai mérité.", { to: 'pa' }),
    ] },
    { t: 'Un poulet-brocoli.', intent: 'discipliné', set: { food: 'brocoli' }, then: [
      say('pb', 'holding', "Poulet-brocoli. Les abdos se font dans la cuisine.", { to: 'pa' }),
    ] },
    { t: 'Juste un shake.', intent: 'extrême', set: { food: 'shake' }, then: [
      say('pb', 'holding', "Juste un shake. Le cut, c'est un mode de vie.", { to: 'pa' }),
    ] },
  ] },
  // Rocco cuts in: the guy is on his phone and misses it, the lion and Ruby turn to Rocco
  { poses: { pa: 'texting', pb: 'listen', ruby: 'listen' } },
  cam('one', 'rocco'),
  say('rocco', 'explaining', "Hé, la belle. Lâche tes deux petits gars. Viens t'asseoir avec un vrai.", { to: 'ruby' }),
  { poses: { pb: 'surprised' } },
  cam('two', 'ruby', 'pa'),
  say('ruby', 'surprised', "...Il me parle à moi, là?", { to: 'pa' }),
  cam('one', 'pa'),
  { poses: { pa: 'phone_shock' } },
  { by: 'pa', choice: [
    { t: 'Elle est avec moi.', intent: 'calme', set: { pa: 'cool' }, then: [
      say('pa', 'explaining', "Elle est avec moi. Bonne soirée, mon grand.", { to: 'rocco' }),
      cam('one', 'rocco'), say('rocco', 'holding', "Pour l'instant.", { to: 'pa' }),
    ] },
    { t: 'Répète ça pour voir.', intent: 'chaud', set: { pa: 'chaud' }, then: [
      say('pa', 'angry', "Répète ça pour voir.", { to: 'rocco' }),
      cam('one', 'rocco'), say('rocco', 'explaining', "Avec plaisir. LA BELLE. VIENS. T'ASSEOIR.", { to: 'ruby' }),
    ] },
    { t: 'Ignorer.', intent: 'fuit', set: { pa: 'ignore' }, then: [
      { poses: { pa: 'holding' } }, narr("{PA} fixe son verre. Très fort."),
      cam('one', 'rocco'), say('rocco', 'explaining', "C'est ça. Regarde ton verre.", { to: 'pa' }),
    ] },
  ] },
  say('rocco', 'angry', "Pis toi, le chat? T'as de quoi à dire?", { to: 'pb' }),
  cam('one', 'pb'),
  { by: 'pb', choice: [
    { t: 'Je suis avec lui.', intent: 'loyal', set: { pb: 'back' }, then: [say('pb', 'angry', "Tu le cherches, tu me trouves aussi.", { to: 'rocco' })] },
    { t: 'Calmez-vous, les gars.', intent: 'diplomate', set: { pb: 'calm' }, then: [say('pb', 'explaining', "Wô. On se calme. Personne veut finir sur TikTok.", { to: 'rocco' })] },
    { t: 'Sortir son cell.', intent: 'filme', set: { pb: 'film' }, then: [{ poses: { pb: 'holding' } }, narr("{PB} sort son cell. Il filme. Évidemment.")] },
  ] },

  // la fin dépend des deux choix
  { when: (f) => f.pa === 'chaud' && f.pb === 'back', then: [
    cam('one', 'rocco'), say('rocco', 'angry', "Deux contre un? Parfait.", { to: 'pa' }),
    ...outside('angry', ...knockout("Jour de bras."), say('ruby', 'surprised', "...Ok. C'était hot.", { to: 'pa' })),
    { set: { title: "Frères d'armes" } },
  ] },
  { when: (f) => f.pa === 'cool' && f.pb === 'back', then: [
    cam('one', 'rocco'), say('rocco', 'thinking', "...Deux contre un. Ok. Ok.", { to: 'pb' }),
    say('rocco', 'holding', "Bonne soirée, les gars.", { to: 'pa' }), { exit: 'rocco' },
    { poses: { pb: 'holding', pa: 'listen' } },
    cam('two', 'ruby', 'pa'), say('ruby', 'listen', "T'as même pas monté le ton. J'aime ça.", { to: 'pa' }),
    { set: { title: 'Le code' } },
  ] },
  { when: (f) => f.pa !== 'ignore' && f.pb === 'calm', then: [
    cam('one', 'rocco'), say('rocco', 'explaining', "T'es chanceux, ton chum est raisonnable.", { to: 'pa' }), { exit: 'rocco' },
    { poses: { ruby: 'thinking', pb: 'listen' } },
    cam('two', 'pb', 'pa'), say('pa', 'angry', "Je l'avais, {PB}.", { to: 'pb' }),
    say('pb', 'holding', "T'avais rien pantoute.", { to: 'pa' }),
    { set: { title: 'Le diplomate' } },
  ] },
  { when: (f) => f.pa === 'chaud' && f.pb === 'film', then: [
    cam('one', 'rocco'), say('rocco', 'angry', "T'as voulu.", { to: 'pa' }),
    ...outside('holding',
      say('pa', 'hit', "OUF."),
      cam('one', 'pb'), say('pb', 'explaining', "J'ai tout. Ça va faire un million de vues.", { to: 'pa' }),
      cam('one', 'pa'), say('pa', 'hit', "{PB}... t'es mort.", { to: 'pb' }),
    ),
    { set: { title: 'Viral' } },
  ] },
  { when: (f) => f.pa === 'cool' && f.pb === 'film', then: [
    cam('one', 'rocco'), say('rocco', 'angry', "Tu me filmes, toi?!", { to: 'pb' }),
    ...outside('surprised', ...knockout("Touche pas à mon caméraman."), say('pb', 'explaining', "...Pis j'ai tout filmé.", { to: 'pa' })),
    { set: { title: 'Le caméraman' } },
  ] },
  { when: (f) => f.pa === 'ignore' && f.pb === 'back', then: [
    cam('one', 'rocco'), say('rocco', 'holding', "Au moins y'en a un qui a du front.", { to: 'pb' }), { exit: 'rocco' },
    { poses: { pb: 'angry', pa: 'holding' } },
    cam('two', 'ruby', 'pa'), say('ruby', 'angry', "C'est {PB} qui me défend? Pas toi?", { to: 'pa' }),
    cam('one', 'pa'), say('pa', 'explaining', "Je gardais mon énergie pour le gym.", { to: 'ruby' }),
    { set: { title: 'Le remplaçant' } },
  ] },
  { when: (f) => f.pa === 'ignore' && f.pb === 'calm', then: [
    cam('one', 'rocco'), say('rocco', 'explaining', "Merci, le chat. Je prends sa place.", { to: 'pb' }),
    { poses: { pb: 'surprised', pa: 'holding' } },
    cam('two', 'ruby', 'pa'), say('ruby', 'angry', "Wow. Bonne soirée, les gars.", { to: 'pa' }), { exit: 'ruby' },
    { set: { title: 'Table pour trois' } },
  ] },
  { when: (f) => f.pa === 'ignore' && f.pb === 'film', then: [
    cam('one', 'rocco'), narr("Rocco prend {FOOD} de {PB}. Pis il s'en va."), { exit: 'rocco' },
    cam('one', 'pb'), say('pb', 'surprised', "Y'est parti avec {MYFOOD}?!", { to: 'pa' }),
    { poses: { pb: 'angry', pa: 'holding' } },
    cam('two', 'ruby', 'pa'), say('ruby', 'angry', "Vous êtes deux pis vous faites rien.", { to: 'pa' }),
    { set: { title: 'Juste du contenu' } },
  ] },

  { poses: { pb: 'listen', pa: 'listen' } },
  cam('two', 'pb', 'pa'),
  say('pb', 'listen', "Bon. On fait quoi, là?", { to: 'pa' }),
  { by: 'pa', choice: [
    { t: 'On rentre.', intent: 'sage', then: [say('pa', 'listen', "On rentre. Grosse journée demain.", { to: 'pb' })] },
    { t: 'Dessert.', intent: 'cheat', then: [say('pa', 'explaining', "Dessert. On l'a mérité.", { to: 'pb' })] },
    { t: 'Gym à 6 h.', intent: 'machine', then: [say('pa', 'explaining', "Gym à 6 h. Jour de jambes.", { to: 'pb' }), cam('one', 'pb'), say('pb', 'surprised', "...T'es malade.", { to: 'pa' })] },
  ] },
  { fade: 'out', ms: 900 },
  { end: { kicker: 'Fin', title: '{TITLE}', art: 'bg/terrasse.jpg' } },
];
// this story stages itself: listeners turn to the speaker and stop gesturing (see line() in index.html)
PLAY.gaze = true;
PLAY.seats = ['pa', 'pb'];
PLAY.solo = { pa: 'Alex', pb: 'Kev' };   // a seat's name when nobody plays it under their own
// the waiting room: each character in the pose that sums them up, and one line of them
PLAY.pick = { pa: { pose: 'explaining', line: 'Faux. On parle aussi de protéines.' },
  pb: { pose: 'explaining', line: "Trois semaines de cut. Ce soir, je mange." } };
PLAY.cast = {
  pa: { name: '{PA}', color: '#1f7a74', sprite: 'justin' },
  pb: { name: '{PB}', color: '#d0632a', sprite: 'candy', scale: 0.93 },
};
PLAY.words = {
  FOOD: (f) => (FOOD[f.food] || FOOD.poutine)[0],
  MYFOOD: (f) => (FOOD[f.food] || FOOD.poutine)[1],
  TITLE: (f) => f.title || 'Fin',
};
