// The onboarding's 4 openings (« Ce soir, t'as envie de… »), written for the game's own engine so they play exactly like the
// rest of the game (its camera, its bubbles, its texts). index.html?play=o_<taste> plays one straight in, on this phone alone,
// then goes back to the onboarding for the rest of episode 1 (series.js). The player is « Toi »: off screen (the others look
// at you), except in Ouvre pas, where you hold the phone. The romance is built from the onboarding's picks (&me=f, &li=brooke).
(() => {
const box = (x, y, w, h, color, more) => ({ x, y, w, h, color, ...more });
const glow = (x, y, d, color, blur = 26) => box(x, y, d, d, color, { r: d / 2, blur });
const TOI = { name: 'Toi', color: '#3a3a3c' };   // the player, off screen: a bubble with no tail
const fin = { end: { kicker: '', title: '' } };   // in ?play, the end goes back to the onboarding

// ---- the decors: rectangles only, the same worlds as the onboarding's posters ----
SCENES.o_party = {
  size: [1920, 1440], ambience: 'party',
  back: [
    box(0, 0, 1920, 1440, 'radial-gradient(ellipse at 50% 35%, #521628 0%, #1c0711 55%, #070204 100%)'),
    glow(220, 230, 150, 'rgba(255,110,150,.55)'), glow(1480, 180, 120, 'rgba(255,185,95,.5)'), glow(1120, 470, 200, 'rgba(255,80,140,.3)', 40),
    glow(90, 760, 130, 'rgba(255,200,120,.28)'), glow(1720, 700, 150, 'rgba(255,110,170,.35)'), glow(640, 110, 90, 'rgba(255,150,110,.35)'),
    // the bedroom door, left: a line of light under it
    box(250, 520, 300, 680, '#1e0d14', { line: '16px solid #2c1520' }),
    box(266, 1186, 268, 10, '#ffcf8a', { glow: '0 0 30px 10px rgba(255,200,120,.45)' }),
    box(0, 1196, 1920, 244, 'linear-gradient(#1a0810, #0a0306)'),
  ],
  spots: { li: [1140, 1330, 820], toi: [650, 1330, 820] }, face: { li: 'l', toi: 'r' }, front: [],   // Interdite: you're on screen too, facing them
};
SCENES.o_gala = {
  size: [1920, 1440], ambience: 'crowd',
  back: [
    box(0, 0, 1920, 1440, 'radial-gradient(ellipse 34% 75% at 50% -8%, rgba(255,214,130,.6), rgba(255,200,100,.12) 60%, transparent 75%), linear-gradient(180deg, #1f170a, #0b0905 70%, #000)'),
    ...[[380, 150], [1540, 170], [670, 90], [1270, 80], [960, 60]].map(([x, y]) => glow(x, y, 22, 'rgba(255,220,150,.9)', 6)),
    // the room behind them: round tables in the dark
    box(80, 1010, 360, 36, '#140f06', { r: 18 }), box(1500, 1000, 380, 36, '#140f06', { r: 18 }),
    box(0, 1210, 1920, 230, 'linear-gradient(#1a1408, #080603)'),
  ],
  spots: { julian: [800, 1330, 800], victor: [1170, 1330, 800] }, face: { julian: 'r', victor: 'l' }, front: [],
};
SCENES.o_door = {
  size: [1920, 1440], ambience: 'suspense',
  back: [
    box(0, 0, 1920, 1440, 'linear-gradient(#05080f, #0b1222 55%, #04060b)'),
    box(570, 300, 470, 990, 'linear-gradient(90deg, #111a2e, #18233d 50%, #111a2e)', { line: '22px solid #1e2945' }),
    box(970, 800, 34, 34, '#3a4560', { r: 17 }),
    // the light under the door, cut by two feet
    box(380, 1290, 840, 150, 'radial-gradient(ellipse at 50% 0%, rgba(255,69,58,.35), transparent 70%)'),
    box(592, 1280, 160, 14, '#ff453a', { glow: '0 0 24px 6px rgba(255,69,58,.45)' }),
    box(820, 1280, 198, 14, '#ff453a', { glow: '0 0 24px 6px rgba(255,69,58,.45)' }),
    box(0, 1294, 1920, 146, '#04060b'),
  ],
  spots: { justin: [1190, 1330, 780] }, face: { justin: 'l' }, front: [],
};
SCENES.o_kitchen = {
  image: 'bg/salon.jpg', size: [1920, 1440],
  spots: { maman: [1060, 1440, 1000] }, face: { maman: 'l' }, front: [],
};

const P = new URLSearchParams(location.search);
const T = (who, text, pose) => say(who, pose, text);   // a line (pose last: Toi has none)
const one = (who) => cam('one', who);

// ---- La revanche · Regarde-moi bien ----
const oRevanche = [
  scene('o_gala', { julian: 'smirk' }), cam('wide'), { fade: 'in', ms: 600 }, { caption: 'Gala Delorme · un an plus tard' },
  one('julian'), T('julian', 'Wow. Je pensais pas qu’ils te laisseraient entrer.', 'smirk'),
  T('toi', 'Moi, je pensais pas que tu resterais.'),
  T('julian', 'C’est mon gala. Mes investisseurs. Ma compagnie.', 'talk'),
  cam('wide'), narr('Un homme en complet traverse la salle. Il ne regarde que toi.'),
  { enter: { victor: 'offer' } }, cam('two', 'julian', 'victor'),
  one('victor'), T('victor', 'Les papiers de l’achat. Il ne manque que votre signature.', 'offer'),
  one('julian'), T('julian', '…Quel achat ?', 'cold'),
  { choice: [
    { t: 'Lis-lui le contrat.', intent: 'humilie', then: [T('toi', 'Victor. Lis-lui le contrat.'), one('victor'), T('victor', 'Acquisition complète de Delorme inc. Effective ce soir.', 'listen'),
      one('julian'), T('julian', 'C’est une blague.', 'hands_up'), cam('wide'), narr('Deux cents têtes se tournent vers lui.')] },
    { t: 'Pas devant eux.', intent: 'patiente', then: [T('toi', 'On se reparle lundi, Julian.'), one('julian'), T('julian', 'Lundi ?', 'cold'),
      narr('Tu le laisses avec la question. Toute la fin de semaine.')] },
  ] },
  fin,
];
oRevanche.title = 'Regarde-moi bien';
oRevanche.cast = { julian: { name: 'Julian', color: '#5c4a1e', sprite: 'julian' }, victor: { name: 'Victor', color: '#1f3554', sprite: 'suit' }, toi: TOI };

// ---- Le désir · Interdite: the love interest picked in the onboarding (Cam or Brooke), the friend you'd betray, your grammar ----
const li = P.get('li') === 'brooke' ? 'brooke' : 'cam', f = P.get('me') === 'f';
const L = li === 'cam' ? { name: 'Cam', partner: 'Max', pm: true, she: true } : { name: 'Brooke', partner: 'Léa', pm: false, she: false };
const pose = (p) => (li === 'brooke' ? { flirty: 'drunk_smile', sip: 'drunk_listen', worried: 'nervous', awkward: 'drunk_letdown' }[p] : p);
const tp = f ? { surprised: 'nervous', listen: 'stand', thinking: 'thinking' } : { surprised: 'surprised', listen: 'listen', thinking: 'thinking' };   // your poses (a girl plays as Maya's look)
const oDesir = [
  scene('o_party', { li: pose('flirty'), toi: tp.listen }), cam('wide'), { fade: 'in', ms: 600 }, { caption: 'Samedi, 2 h' },
  narr(`Le party de ${L.partner} tire à sa fin.`),
  one('li'), T('li', `${L.partner} dort. ${L.pm ? 'Il' : 'Elle'} s’endort toujours quand ça devient intéressant.`, pose('flirty')),
  one('toi'), T('toi', `${L.name}… t’as bu.`, tp.surprised),
  one('li'), T('li', `Un peu. Assez pour te dire que t’es ${f ? 'belle' : 'beau'} quand t’es ${f ? 'gênée' : 'gêné'}.`, pose('sip')),
  T('li', `Pis un autre truc. Au chalet, l’été passé… C’est toi que je voulais embrasser. Pas ${L.pm ? 'lui' : 'elle'}.`, pose('flirty')),
  cam('wide'), narr('Derrière la porte de la chambre, quelqu’un se lève.'),
  one('li'), T('li', 'Dis quelque chose. Vite.', pose('worried')),
  { choice: [
    { t: 'Moi aussi.', intent: 'avoue', then: [one('toi'), T('toi', 'Moi aussi. Depuis le chalet.', tp.listen), one('li'), T('li', 'Alors on a un problème.', pose('flirty')), cam('wide'), narr('La poignée tourne.')] },
    { t: `Va ${L.pm ? 'le' : 'la'} rejoindre.`, intent: 'recule', then: [one('toi'), T('toi', `Va ${L.pm ? 'le' : 'la'} rejoindre, ${L.name}.`, tp.thinking), one('li'), T('li', 'Ok. Mais tu vas y penser toute la nuit.', pose('awkward')),
      narr(`${L.she ? 'Elle' : 'Il'} a raison.`)] },
  ] },
  fin,
];
oDesir.title = 'Interdite';
oDesir.cast = { li: { name: L.name, color: li === 'cam' ? '#3b1f6e' : '#2a4f8f', sprite: li }, toi: { ...TOI, sprite: f ? 'plage' : 'justin' } };   // you, on screen: your look (a girl: Maya's, a guy: Justin)

// ---- Le danger · Ouvre pas: you, on screen, with the phone ----
const text = (t) => ({ sms: { from: 'num', to: 'justin', text: t } });
const hall = { cam: 'wide', at: 930 };   // the wide shot: the door and you
const oDanger = [
  scene('o_door', { justin: 'thinking' }), hall, { fade: 'in', ms: 600 }, { caption: '3 h 12' },
  narr('Ton cell vibre.'),
  text('Ouvre pas la porte.'), { hush: 700 }, { poses: { justin: 'texting' } }, { check: 'justin' }, { hush: 900 },
  one('justin'), T('justin', '…C’est mon numéro.', 'phone_shock'),
  hall, narr('On cogne. Trois coups. Lents.'),
  T('porte', 'C’est Léa. Ouvre, j’ai pu de batterie.'),
  text('C’est pas elle.'), { hush: 600 }, { poses: { justin: 'texting' } }, { check: 'justin' }, { hush: 900 },
  T('porte', 'S’il te plaît. Il fait froid.'),
  { choice: [
    { t: 'J’ouvre.', intent: 'ouvre', then: [one('justin'), T('justin', 'J’arrive, Léa.', 'surprised'), hall,
      narr('La chaîne est encore mise. Par l’ouverture, tu vois son manteau. Trempé.'), narr('Il ne pleut pas.')] },
    { t: 'Dis mon 2e nom.', intent: 'teste', then: [one('justin'), T('justin', 'Léa. C’est quoi, mon deuxième nom ?', 'thinking'), hall, narr('Silence.'),
      text('Elle le sait pas. Moi oui.'), { hush: 600 }, { poses: { justin: 'phone_shock' } }, { check: 'justin' }, { hush: 1600 }] },
  ] },
  fin,
];
oDanger.title = 'Ouvre pas';
oDanger.cast = { justin: { name: 'Toi', color: '#1f7a74', sprite: 'justin' }, num: { name: 'Ton numéro', color: '#2c2c2e' }, porte: { name: 'Derrière la porte', color: '#4a1c1c' } };

// ---- L'étrange · Personne se souvient ----
const oEtrange = [
  scene('o_kitchen', { maman: 'listen' }), cam('wide'), { fade: 'in', ms: 600 }, { caption: 'Mardi, 7 h 40' },
  narr('La chambre d’Emma est vide. Pas rangée. Vide.'),
  T('toi', 'M’man ? Où sont les affaires d’Emma ?'),
  one('maman'), T('maman', 'Qui ?', 'listen'),
  T('toi', 'Emma. Ta fille.'),
  T('maman', 'Mon cœur… T’as jamais eu de sœur.', 'thinking'),
  cam('wide'), narr('Ton cell vibre. Un vocal. Le numéro d’Emma.'),
  T('emma', 'Dis rien. Regarde-la pas. Elle, c’est pas maman.'),
  one('maman'), T('maman', 'C’était qui ?', 'listen'),
  { choice: [
    { t: 'Personne.', intent: 'cache', then: [T('toi', 'Personne. Un faux numéro.'), T('maman', 'Montre-moi ton téléphone.', 'explaining'), narr('Elle sourit. Elle a jamais souri comme ça.')] },
    { t: 'C’était Emma.', intent: 'avoue', then: [T('toi', 'C’était Emma.'), T('maman', 'Il n’y a pas d’Emma.', 'angry'), cam('wide'),
      narr('Les lumières de la cuisine s’éteignent. Toutes en même temps.'), { fade: 'out', ms: 300 }] },
  ] },
  fin,
];
oEtrange.title = 'Personne se souvient';
oEtrange.cast = { maman: { name: 'Maman', color: '#2e2a3a', sprite: 'diane' }, toi: TOI, emma: { name: 'Vocal · Emma', color: '#5b3fa8' } };

window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), o_revanche: oRevanche, o_desir: oDesir, o_danger: oDanger, o_etrange: oEtrange };
})();
