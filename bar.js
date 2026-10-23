// Last call — 2 joueurs, ~2 min, thriller au bar. Deux amis d'enfance (colocs, cassés) + Ruby. Le plus saoul (selon les
// shots) va aux toilettes : là, chaque joueur joue SA scène en même temps sur son cell (split) sans voir celle de l'autre.
// Les textos passent d'une scène à l'autre. {PA} / {PB} = qui a pris le perso ; {D} = le saoul, {S} = l'autre.
// Décors = des rectangles seulement (maquette, photos plus tard).

const other = (k) => (k === 'pa' ? 'pb' : 'pa');
const sms = (from, to, text) => ({ sms: { from, to, text } });

// poses the sheets do not have yet -> the one they play as meanwhile; a new sheet replaces them without touching the story
window.POSE_FALLBACK = {
  drunk_talk: 'explaining', drunk_listen: 'listen', drunk_flirt: 'explaining', pee_need: 'holding',
  pee: 'holding', pee_talk: 'thinking', offer: 'explaining', shush: 'holding',
  tipsy_laugh: 'explaining', awkward: 'holding', flirty: 'thinking',
};
// a talking pose -> the pose its owner falls back to while someone else talks
window.POSE_REST = { drunk_talk: 'drunk_listen', drunk_flirt: 'drunk_listen' };
// the stand-ins are recolours: same sheet, so same facing
Object.assign(FACE, { justin_b: FACE.justin, james_noir: FACE.james });
CAST.suit = { name: "L'inconnu", color: '#26262b', sprite: 'james_noir', aside: true };
GALLERY.push({ sprite: 'justin_b', name: 'Gars 2', recolor: 'justin' }, { sprite: 'james_noir', name: "L'inconnu", recolor: 'james' });

// ---------- décors en rectangles (decor px) ----------
const R = (x, y, w, h, color, more) => ({ x, y, w, h, color, ...more });
// the bar, seen from behind the counter: the room behind them, the toilets' corridor on the right
const BAR_BACK = [
  R(0, 0, 1920, 1440, '#241a1d'),
  R(0, 0, 1920, 90, '#150f11'),
  R(0, 690, 1920, 750, '#2e1f1a'), R(0, 684, 1920, 10, '#4a3022'),
  // big window on the street, lamp posts outside
  R(600, 230, 640, 330, '#0b1322', { line: '14px solid #3a2a22' }),
  R(612, 470, 616, 78, '#121c2e'),
  R(700, 300, 16, 16, '#ffd27a', { r: 8, glow: '0 0 20px 7px rgba(255,210,122,.55)' }),
  R(1010, 280, 16, 16, '#ffd27a', { r: 8, glow: '0 0 20px 7px rgba(255,210,122,.55)' }),
  R(1150, 320, 12, 12, '#ff9b6a', { r: 6, glow: '0 0 16px 5px rgba(255,155,106,.5)' }),
  // booth + neon, left
  R(60, 560, 480, 160, '#5a1f2a', { r: 22 }), R(60, 560, 480, 14, '#6d2733', { r: 7 }),
  R(130, 700, 340, 24, '#1b120d', { r: 4 }),
  R(120, 230, 400, 140, 'transparent', { r: 70, line: '9px solid #ff5fa8', glow: '0 0 34px 6px rgba(255,95,168,.5), inset 0 0 26px 2px rgba(255,95,168,.35)' }),
  // pendant lamps
  ...[400, 1010, 1440].flatMap((x) => [
    R(x - 2, 0, 4, 160, '#0a0708'),
    R(x - 42, 160, 84, 46, '#2b2b2b', { r: '42px 42px 6px 6px' }),
    R(x - 26, 200, 52, 14, '#ffcf8a', { r: 7, glow: '0 0 60px 26px rgba(255,190,110,.4)' }),
  ]),
  // corridor to the toilets
  R(1640, 380, 240, 540, '#0c090a'), R(1630, 368, 260, 14, '#4a3022'),
  R(1700, 392, 120, 8, '#ffe2b0', { glow: '0 0 30px 10px rgba(255,226,176,.35)' }),
  R(1705, 296, 110, 50, '#e9e6df', { r: 6 }), R(1736, 306, 14, 30, '#222', { r: 4 }), R(1770, 306, 14, 30, '#222', { r: 4 }),
];
// the counter in front of them (hip height), their drinks on it
const TOP = 866;   // the counter's top, at their hips
const shot = (x) => R(x, TOP - 38, 26, 40, 'rgba(255,255,255,.22)', { r: '3px 3px 6px 6px', line: '2px solid rgba(255,255,255,.45)' });
const pint = (x) => [R(x, TOP - 84, 48, 86, 'rgba(240,170,60,.88)', { r: '4px 4px 10px 10px' }), R(x, TOP - 92, 48, 16, '#f6efdd', { r: 6 })];
const BAR_FRONT = [
  R(-10, TOP, 1940, 30, '#a8774c', { r: 4 }), R(0, TOP + 30, 1920, 12, '#5c3b25'), R(0, TOP + 42, 1920, 400, '#33201a'),
  ...[60, 380, 700, 1020, 1340, 1660].map((x) => R(x, TOP + 66, 260, 360, '#3b261e', { r: 10, line: '4px solid #2a1912' })),
  // {PA}: a pint + two empty shots · Ruby: a cocktail · {PB}: a pint + two shots · the bill
  ...pint(670), shot(810), shot(846),
  R(990, TOP - 70, 40, 44, 'rgba(220,60,90,.85)', { r: '4px 4px 20px 20px' }), R(1007, TOP - 28, 6, 28, 'rgba(255,255,255,.55)'),
  R(1100, TOP - 12, 74, 12, '#111', { r: 2 }),
  ...pint(1290), shot(1200), shot(1236),
];
// the toilets: tiles, 3 urinals, mirror + sink on the left, the emergency exit on the right
const TILE = 64;
const WC_BACK = [
  R(0, 0, 1920, 240, '#56645f'), R(0, 240, 1920, 860, '#d6ded9'), R(0, 232, 1920, 10, '#a9b4ae'),
  ...Array.from({ length: 14 }, (_, i) => R(0, 240 + (i + 1) * TILE, 1920, 3, '#bcc7c1')),
  ...Array.from({ length: 30 }, (_, i) => R((i + 1) * TILE, 240, 3, 860, '#bcc7c1')),
  R(0, 1100, 1920, 340, '#39423f'),
  ...Array.from({ length: 4 }, (_, i) => R(0, 1100 + (i + 1) * 80, 1920, 3, '#2f3735')),
  R(540, 104, 840, 14, '#9aa5a1'), R(560, 116, 800, 24, '#f6fbff', { r: 12, glow: '0 0 90px 34px rgba(215,236,255,.5)' }),
  R(150, 380, 360, 420, '#a9c1c9', { line: '14px solid #6d7a7a' }), R(200, 420, 40, 300, 'rgba(255,255,255,.35)'),
  R(310, 790, 40, 44, '#b0b6b8', { r: 6 }), R(170, 830, 320, 70, '#f2f2ef', { r: '8px 8px 40px 40px' }),
  ...[860, 1130, 1400].flatMap((cx) => [
    R(cx - 6, 600, 12, 170, '#b7bdbf'), R(cx - 22, 592, 44, 22, '#d9dddd', { r: 6 }),
    R(cx - 72, 760, 144, 250, '#fbfbf8', { r: '22px 22px 64px 64px', glow: '0 8px 0 rgba(0,0,0,.08)' }),
    R(cx - 50, 800, 100, 170, '#e6e9e4', { r: '16px 16px 46px 46px' }),
  ]),
  R(1640, 450, 230, 650, '#56463b', { r: 4 }), R(1670, 770, 170, 16, '#b8b8b0', { r: 8 }),
  R(1695, 385, 120, 44, '#16a34a', { r: 6, glow: '0 0 24px 6px rgba(22,163,74,.5)' }),
];
const WC_FRONT = [R(1030, 720, 26, 420, '#7f8a87', { r: 6 })];   // the divider between their two urinals

SCENES.bar = {
  size: [1920, 1240], back: BAR_BACK, front: BAR_FRONT,
  spots: { pa: [770, 1150, 690], ruby: [1010, 1150, 690], pb: [1250, 1150, 690], suit: [1580, 1090, 590] },
  face: { pa: 'r', ruby: 'l', pb: 'l', suit: 'r' },
};
SCENES.wc = {
  size: [1920, 1440], back: WC_BACK, front: WC_FRONT,
  spots: { pa: [900, 1170, 690], pb: [900, 1170, 690], suit: [1190, 1170, 700] },
  face: { pa: 'r', pb: 'r', suit: 'l' },
};

// ---------- l'histoire ----------
// last call: each one picks, and whoever drank more is the drunk (a tie: {PB}, who skipped supper)
const drink = (k, lines) => ({ by: k, choice: [
  { t: 'Shot.', intent: 'shot', set: { [k]: 1 }, then: [say(k, 'explaining', lines[0], { to: 'ruby' })] },
  { t: 'Double.', intent: 'double', set: { [k]: 2 }, then: [say(k, 'explaining', lines[1], { to: 'ruby' })] },
  { t: "De l'eau.", intent: 'sobre', set: { [k]: 0 }, then: [say(k, 'holding', lines[2], { to: 'ruby' })] },
] });

// the drunk's card bounces, the stranger hears it, the drunk says too much to Ruby and leaves for the toilets
const drunkBeat = (d, tie) => [
  { fade: 'out', ms: 400 },
  { poses: { [d]: 'drunk_listen', [other(d)]: 'listen', ruby: 'listen' } },
  cam('three', 'pa', 'ruby', 'pb'),
  { fade: 'in', ms: 400 },
  narr(tie ? 'Trois tournées plus tard. {D} a pas soupé.' : 'Trois tournées plus tard.'),
  say('ruby', 'thinking', 'La facture : 214 $.'),
  say(d, 'drunk_talk', 'Mets ça sur ma carte.', { to: 'ruby' }),
  say('ruby', 'holding', 'Ta carte passe pas, {D}. Deux fois.', { to: d }),
  say(d, 'drunk_talk', 'Le loyer est dû lundi, faque...', { to: other(d) }),
  // the stranger at the end of the bar turns his head
  cam('one', 'suit'), face({ suit: 'l' }), { wait: 1400 },
  { exit: 'suit' },
  cam('two', 'ruby', d),
  say(d, 'drunk_flirt', 'Ruby. Toi... t’es juste...', { to: 'ruby' }),
  say(d, 'drunk_flirt', 'Ouais. Juste...', { to: 'ruby' }),
  cam('one', 'ruby'), { poses: { ruby: 'awkward' } }, { wait: 1300 },
  cam('one', d), { poses: { [d]: 'pee_need' } }, { wait: 600 },
  say(d, 'pee_need', 'Faut que j’aille pisser.'),
  { exit: d },
];

// split: {S} alone with Ruby, at the counter
const table = (s, d) => [
  scene('bar', { [s]: 'listen', ruby: 'listen' }),
  cam('two', s, 'ruby'),
  say('ruby', 'thinking', 'Il allait dire quoi, tu penses?', { to: s }),
  { by: s, choice: [
    { t: 'Parler de {D}.', intent: 'son chum', then: [
      say(s, 'explaining', 'Il est saoul. Demain, il va se rappeler de rien.', { to: 'ruby' }),
      say('ruby', 'holding', 'Ou il s’en rappelle très bien.', { to: s }),
    ] },
    { t: 'Apprendre à la connaître.', intent: 'curieux', then: [
      say(s, 'explaining', 'Ça fait des années qu’on se tient pis je sais même pas d’où tu viens.', { to: 'ruby' }),
      say('ruby', 'tipsy_laugh', 'Tu me l’as jamais demandé.', { to: s }),
    ] },
    { t: 'Lui demander ce qu’elle ressent.', intent: 'sincère', then: [
      say(s, 'explaining', 'Pis toi? Ça te fait quoi, quand il dit ça?', { to: 'ruby' }),
      say('ruby', 'awkward', '...Ça dépend de qui le dit.', { to: s }),
    ] },
    { t: 'Flirter.', intent: 'flirt', then: [
      say(s, 'explaining', 'Moi, je l’aurais finie, ma phrase.', { to: 'ruby' }),
      say('ruby', 'flirty', 'Ah oui? Vas-y. Finis-la.', { to: s }),
    ] },
  ] },
  say('ruby', 'thinking', 'Il est long, {D}.', { to: s }),
  { by: s, choice: [
    { t: 'Texter {D} : « T’es où? »', intent: 'inquiet', set: { ping: true }, then: [
      { poses: { [s]: 'texting' } }, sms(s, d, 'T’es où?'),
      say(s, 'texting', 'Il répond pas.', { to: 'ruby' }),
    ] },
    { t: 'Rester avec Ruby.', intent: 'reste', then: [say(s, 'listen', 'Il est grand.', { to: 'ruby' })] },
  ] },
];

// split: {D} in the toilets, the stranger at the next urinal
const bathroom = (d, s) => [
  { fade: 'out', ms: 300 },
  scene('wc', { [d]: 'pee', suit: 'pee' }),
  cam('two', d, 'suit'),
  { fade: 'in', ms: 400 },
  narr('Les toilettes. L’inconnu du bar est à l’urinoir d’à côté.'),
  say('suit', 'pee_talk', 'Belle soirée?', { to: d }),
  { by: d, choice: [
    { t: 'Ouais, trop belle.', intent: 'jase', then: [
      say(d, 'drunk_talk', 'Ouais. Trop belle. J’ai dit de quoi de cave à une fille.', { to: 'suit' }),
    ] },
    { t: 'On se connaît?', intent: 'méfiant', then: [
      say(d, 'drunk_talk', 'On se connaît?', { to: 'suit' }),
      say('suit', 'pee_talk', 'Toi, non. Moi, oui.', { to: d }),
    ] },
    { t: 'Rien dire.', intent: 'fixe le mur', then: [narr('{D} fixe le mur. Très fort.')] },
  ] },
  cam('one', 'suit'),
  say('suit', 'pee_talk', 'Ta carte a passé dans le beurre deux fois, ce soir.', { to: d }),
  say('suit', 'offer', 'J’ai une job pour toi. Une heure. Cinq mille, cash.', { to: d }),
  say('suit', 'shush', 'On part maintenant. Pis t’en parles à personne.', { to: d }),
  cam('one', d), { poses: { [d]: 'texting' } },
  { by: d, choice: [
    { t: 'Texter : « J’reviens »', intent: 'ment', set: { sms: 'back' }, then: [
      sms(d, s, 'J’reviens'),
      cam('one', 'suit'), say('suit', 'pee_talk', 'Bon.', { to: d }),
    ] },
    { t: 'Texter : « Je pars avec un gars. Tu viens? »', intent: 'l’invite', set: { sms: 'invite' }, then: [
      sms(d, s, 'Je pars avec un gars. Tu viens?'),
      cam('one', 'suit'), say('suit', 'angry', 'J’avais dit personne.', { to: d }),
    ] },
    { t: 'Rien dire.', intent: 'obéit', set: { sms: 'none' }, then: [
      { poses: { [d]: 'drunk_listen' } },
      cam('one', 'suit'), say('suit', 'pee_talk', 'Bon gars.', { to: d }),
    ] },
  ] },
  cam('two', d, 'suit'),
  narr('{D} suit l’inconnu vers la sortie de secours.'),
];

// back together: twenty minutes later at the counter, what {S} does with what {D} sent (or didn't)
const after = (d, s, f) => [
  { fade: 'out', ms: 600 },
  scene('bar', { [s]: 'listen', ruby: 'listen' }),
  cam('two', s, 'ruby'),
  { fade: 'in', ms: 600 },
  { caption: 'Vingt minutes plus tard' },
  ...(f.sms === 'invite' ? [
    { poses: { [s]: 'phone_shock' } },
    say('ruby', 'surprised', 'C’est qui, « un gars »?', { to: s }),
    { by: s, choice: [
      { t: 'J’arrive.', intent: 'le suit', set: { title: 'Tu viens?' }, then: [
        sms(s, d, 'J’arrive. T’es où?'),
        say(s, 'explaining', 'Faut que j’y aille.', { to: 'ruby' }),
        say('ruby', 'angry', 'Tu sais même pas où il est.', { to: s }),
      ] },
      { t: 'Rester avec Ruby.', intent: 'reste', set: { title: 'Un gars' }, then: [
        say(s, 'listen', 'Personne. Il va revenir.', { to: 'ruby' }),
        narr('Il est jamais revenu.'),
      ] },
    ] },
  ] : f.sms === 'back' ? [
    say(s, 'texting', 'Il a dit qu’il revenait.', { to: 'ruby' }),
    say('ruby', 'holding', 'Ça fait vingt minutes.', { to: s }),
    { set: { title: 'J’reviens' } },
  ] : [
    say('ruby', 'surprised', 'Il est où, {D}?', { to: s }),
    { poses: { [s]: 'phone_shock' } },
    narr('Pas de message. Rien.'),
    { set: { title: 'Pas un mot' } },
  ]),
  { fade: 'out', ms: 900 },
  { end: { kicker: 'Fin de la scène 1', title: '{TITLE}', lede: '{D} est parti avec l’inconnu.', art: null } },
];

window.BAR = [
  // the stranger first, then the three friends
  scene('bar', { pa: 'listen', ruby: 'listen', pb: 'listen', suit: 'listen' }),
  { cam: 'wide', at: 1500 },
  { fade: 'in', ms: 1400 },
  { caption: 'Samedi, 1 h 40' },
  { wait: 1200 },
  { pan: 1010, ms: 2600 },
  cam('three', 'pa', 'ruby', 'pb'),
  // who they are to each other
  say('ruby', 'explaining', 'Quinze ans d’amitié, pis vous vous chicanez encore pour la facture.'),
  say('pa', 'explaining', 'C’est lui qui me doit de l’argent. Depuis le primaire.', { to: 'pb' }),
  say('pb', 'explaining', 'Pis toi, ta part du loyer. Depuis trois mois.', { to: 'pa' }),
  say('ruby', 'thinking', 'Des frères. Des frères cassés.'),
  say('ruby', 'explaining', 'Last call. Vous prenez quoi?'),
  drink('pa', ['Shot. Évidemment.', 'Double. On vit une fois.', 'De l’eau. Gym à 9 h.']),
  drink('pb', ['Shot. Pis un autre.', 'Double. Faut ben suivre.', 'De l’eau. Je travaille demain.']),
  { fn: (f) => {
    const a = f.pa || 0, b = f.pb || 0, d = b >= a ? 'pb' : 'pa';
    return [{ set: { drunk: d } }, ...drunkBeat(d, a === b)];
  } },
  // each one plays his own scene on his own phone; a spectator sees the toilets; solo plays the counter first
  { split: (f) => ({ [other(f.drunk)]: table(other(f.drunk), f.drunk), [f.drunk]: bathroom(f.drunk, other(f.drunk)) }),
    watch: (f) => f.drunk,
    hold: (f) => ({ [f.drunk]: '{S} est encore avec Ruby', [other(f.drunk)]: '{D} est encore aux toilettes' }) },
  { fn: (f) => after(f.drunk, other(f.drunk), f) },
];
BAR.gaze = true;
BAR.credits = '';   // no photos: rectangles only
BAR.seats = ['pa', 'pb'];
BAR.solo = { pa: 'Alex', pb: 'Kev' };   // the other character's name when you play both
BAR.cast = {
  pa: { name: '{PA}', color: '#1f7a74', sprite: 'justin' },
  pb: { name: '{PB}', color: '#2a4f8f', sprite: 'justin_b' },
};
BAR.words = { D: (f) => seatName(f.drunk), S: (f) => seatName(other(f.drunk)), TITLE: (f) => f.title || 'Last call' };
