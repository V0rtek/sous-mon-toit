// UNWRITTEN — chapitre 1. Source : 1. PROJECTS/Torilyn/_ 💘Episodes - Pocket Gem.md
// {N} = the player's name. Lines marked "// trou" fill a {bs} / {missed} gap of the note.
// Staging: everyone keeps their spot in a scene; a shot only moves the camera.

window.CAST = {
  justin: { name: '{N}', color: '#1f7a74', sprite: 'justin' },
  ruby: { name: 'Ruby', color: '#3b1f6e', sprite: 'ruby', scale: 0.95 },
  melissa: { name: 'Melissa', color: '#a3203c', sprite: 'melissa', scale: 0.95 },
  candy: { name: 'Candy', color: '#d0632a', sprite: 'candy', scale: 0.93 },
  james: { name: 'James', color: '#6e2b2b', sprite: 'james' },
  amare: { name: 'Amare', color: '#5a2d8c', sprite: 'amare', scale: 0.93 },
  isa: { name: 'Isa', color: '#c2366b', sprite: 'isa', scale: 0.96 },
  kai: { name: 'Kai', color: '#a3203c', sprite: 'kai' },   // Justin recolored, for the tests
  leo: { name: 'Léo', color: '#2c5fb3', sprite: 'leo' },
};

// Isa's three looks (personalise step)
window.ISA_LOOKS = [
  { sprite: 'isa_nuit', label: 'Minuit' },
  { sprite: 'isa_or', label: 'Doré' },
  { sprite: 'isa_noir', label: 'Braise' },
];

// where each pose looks, seen from the viewer: r = right, l = left, f = front (never flipped). Recolors follow their sheet
const ELF = { listen: 'r', surprised: 'r', thinking: 'r', explaining: 'r', angry: 'r', holding: 'r' };
const LION = { listen: 'r', surprised: 'r', thinking: 'r', explaining: 'r', angry: 'r', holding: 'r' };
window.FACE = {
  justin: { listen: 'l', surprised: 'r', thinking: 'r', explaining: 'r', angry: 'r', holding: 'f',
    phone_call: 'r', texting: 'f', phone_shock: 'f', punch: 'r', hit: 'f', ko: 'f',
    // from behind (30/10): far = into the distance, down, look = back over his shoulder, door = reaching for a door,
    // fists = holding back anger, walk = walking away
    back_far: 'r', back_down: 'r', back_look: 'r', back_door: 'r', back_fists: 'r', back_walk: 'f',
    // in profile, cut at the belt (30/10, chars.js: half): only in a close shot on him. walk_a / walk_b = the walk loop ({walk})
    side_walk_a: 'r', side_walk_b: 'r', side_listen: 'r', side_talk: 'r', side_lean: 'r', side_tense: 'r',
    // angled a little toward the camera (30/10): the walk in 3 (walk_a, walk_mid, walk_b), leaning on a bar (cut at the
    // counter), sitting low (a campfire), leaning back on a wall
    walk_a: 'r', walk_mid: 'r', walk_b: 'r', bar: 'r', sit: 'r', wall: 'r',
    // medium close-ups (30/10): head to mid-chest, talking, small smile, side glance (eyes only), hurt, held-back anger,
    // and from behind for over-the-shoulder shots
    cu_talk: 'r', cu_smile: 'r', cu_glance: 'r', cu_hurt: 'r', cu_anger: 'r', cu_back: 'r' },
  james: { listen: 'l', surprised: 'l', thinking: 'l', explaining: 'f', angry: 'f', holding: 'l' },
  // Kai (30/10) = Justin recolored for the tests (black hair, dark red tank top): all his poses
  get kai() { return this.justin; },
  get leo() { return this.justin; },   // Léo, the same (chestnut hair, navy tank top)
  ruby: ELF, melissa: ELF, isa_nuit: ELF, isa_or: ELF, isa_noir: ELF, candy: LION, amare: LION,
};

// decors: photo (Wikimedia Commons, credits on the end card), size in px, everyone's spot [x, feet y, standing height],
// where they look by default, and the foreground drawn over them (rectangles in decor px)
// the friends' table, in front of them: wooden top at mid-thigh, front panel down to the floor, 4 drinks
const TABLE = [
  { x: 930, y: 1105, w: 860, h: 40, color: 'rgba(0,0,0,.3)', blur: 14 },
  { x: 950, y: 834, w: 820, h: 285, color: '#64412b' },
  { x: 1150, y: 834, w: 6, h: 285, color: '#4e321f' }, { x: 1357, y: 834, w: 6, h: 285, color: '#4e321f' },
  { x: 1564, y: 834, w: 6, h: 285, color: '#4e321f' },
  { x: 940, y: 826, w: 840, h: 10, color: '#3f2718' },
  { x: 940, y: 806, w: 840, h: 22, color: '#b07c52' },
  { x: 1093, y: 740, w: 32, h: 70, color: '#8fc46a', r: 6 }, { x: 1108, y: 704, w: 5, h: 40, color: '#f25c78' },
  { x: 1262, y: 746, w: 34, h: 64, color: '#f2a1b6', r: 6 }, { x: 1278, y: 710, w: 5, h: 40, color: '#4aa3df' },
  { x: 1452, y: 764, w: 46, h: 46, color: '#f4efe6', r: 8 }, { x: 1458, y: 770, w: 34, h: 10, color: '#6b3f22', r: 4 },
  { x: 1585, y: 742, w: 32, h: 68, color: '#f6b04e', r: 6 }, { x: 1600, y: 706, w: 5, h: 40, color: '#ffffff' },
];
window.SCENES = {
  terrasse: {
    image: 'bg/terrasse.jpg', size: [1920, 1440],
    spots: { melissa: [1095, 1050, 650], candy: [1265, 1050, 650], ruby: [1435, 1050, 650], justin: [1605, 1050, 650] },
    face: { melissa: 'r', candy: 'r', ruby: 'r', justin: 'l' },
    front: TABLE,
  },
  // the tavern's terrace over the city (fantasy, 29/10): the 4 stand on the flagstones in front of the tables; establish =
  // the same tavern seen from above, the shot that opens the scene (it zooms in on the tavern) and closes it (zooms out)
  taverne: {
    image: 'bg/taverne.webp', size: [1672, 940], establish: 'bg/taverne_haut.webp',
    spots: { melissa: [640, 930, 560], candy: [810, 930, 560], ruby: [980, 930, 560], justin: [1150, 930, 560] },   // big and close: a 3-shot still keeps heads above the line
    face: { melissa: 'r', candy: 'r', ruby: 'r', justin: 'l' },
    front: [],
  },
  // inside the tavern (30/10): the counter runs into the depth, its top's left edge measured; the patrons lean on it
  // side by side, in depth, facing right (pose bar: forearms on the top, cut there). Horizon at y 510, the counter's top
  // 0,25 m under the camera: at depth, height = 1,75 × (edge y − 510) / 0,25. Near the counter's near end (30/10), each
  // one's back on the edge (x = edge x + 0,19 × height) so the top is under all of him. Only Justin has the bar pose so far
  taverne_bar: {
    image: 'bg/taverne_bar.webp', size: [1672, 940],
    spots: { justin: [822, 1332, 1106], melissa: [898, 1212, 945], candy: [967, 1113, 812], ruby: [1025, 1035, 707] },
    face: { justin: 'r', melissa: 'r', candy: 'r', ruby: 'r' },
    front: [],
  },
  // the rampart over the city (30/10): they lean on the parapet side by side, in depth, facing right (the castle), from
  // the wall-walk behind it (pose bar). The parapet's top is 60 cm wide: at depth, height = 1,75 × its width on screen
  // / 0,6; forearms on its far edge (99,997)→(1045,750), each one's back on that edge so the top is under all of him
  rempart: {
    image: 'bg/rempart.webp', size: [1295, 1214],
    spots: { justin: [566, 1521, 994], melissa: [673, 1337, 753], candy: [761, 1184, 554], ruby: [833, 1060, 391] },
    face: { justin: 'r', melissa: 'r', candy: 'r', ruby: 'r' },
    front: [],
  },
  // the gallery over the city (30/10): a long marble table into the depth, they lean on it side by side from its far
  // side, facing right (pose bar). The top is 1,2 m wide: at depth, height = 1,75 × its width on screen / 1,2; forearms
  // on its left edge, each one's back on it
  galerie: {
    image: 'bg/galerie.webp', size: [1672, 940],
    spots: { justin: [718, 1146, 923], melissa: [869, 998, 726], candy: [981, 888, 579], ruby: [1067, 802, 459] },
    face: { justin: 'r', melissa: 'r', candy: 'r', ruby: 'r' },
    front: [],
  },
  maison: {
    image: 'bg/maison.jpg', size: [1920, 1440],
    spots: { ruby: [420, 1425, 760], justin: [720, 1425, 770], james: [1075, 885, 400] },
    face: { ruby: 'r', justin: 'l', james: 'l' },
    front: [],
  },
  salon: {
    image: 'bg/salon.jpg', size: [1920, 1440],
    spots: { isa: [395, 1010, 360], justin: [560, 1010, 360], amare: [720, 1010, 360], james: [880, 1010, 360] },
    face: { isa: 'r', justin: 'r', amare: 'l', james: 'l' },
    front: [],
  },
};
window.CREDITS = 'Photos : zoetnet (CC BY 2.0), Infrogmation of New Orleans (CC BY 3.0), Kgbo (CC BY-SA 4.0), Wikimedia Commons.';

// step helpers
const scene = (id, cast) => ({ scene: id, cast });
const cam = (size, ...who) => ({ cam: size, who });
const say = (who, pose, text, o) => ({ say: who, pose, text, ...o });
const narr = (text) => ({ narr: text });
const think = (who, text) => ({ think: who, text });
const face = (f) => ({ face: f });

window.STORY = [
  // ---------- la terrasse ----------
  scene('terrasse', { melissa: 'listen', candy: 'listen', ruby: 'listen', justin: 'listen' }),
  { cam: 'wide', at: 420 },
  { fade: 'in', ms: 1400 },
  { caption: 'Café Larina' },
  { pan: 1350, ms: 4200 },
  { wait: 900 },
  cam('three', 'melissa', 'candy', 'ruby'),
  say('melissa', 'explaining', "Alice organise un party sur la plage de Larina samedi. Vous venez?"),
  say('candy', 'explaining', "Larina? Tout le campus va être là. Évidemment qu'on vient."), // trou
  cam('two', 'ruby', 'justin'),
  say('ruby', 'listen', "Tu seras là aussi, n'est-ce pas, bébé?"),
  { choice: [
    { t: 'Bien sûr !', intent: 'enthousiaste', then: [
      say('justin', 'explaining', "Bien sûr! Je manquerais pas ça."),
      say('ruby', 'thinking', "Bonne réponse."),
    ] },
    { t: 'Peut-être.', intent: 'joueur', then: [
      say('justin', 'listen', "Peut-être."),
      say('justin', 'explaining', "Ça dépend si tu la joues bien."),
      say('ruby', 'thinking', "Je la joue toujours bien."),
    ] },
    { t: 'On verra...', intent: 'distant', then: [
      say('justin', 'thinking', "On verra..."),
      say('ruby', 'angry', "« On verra »? Wow. Merci pour l'enthousiasme."),
    ] },
  ] },
  say('ruby', 'listen', "Ok. Bon, je reviens, je dois aller aux toilettes!"),
  { exit: 'ruby' },
  cam('two', 'melissa', 'candy'),
  say('candy', 'explaining', "Wow. Ruby est juste... parfaite."),
  cam('one', 'justin'),
  say('justin', 'holding', "Fais gaffe, t'es en train de baver sur ma copine."),
  cam('one', 'candy'),
  say('candy', 'explaining', "Relax. Je dis juste que t'as de la chance. Une fille comme ça, faut la surveiller."), // trou
  { choice: [
    { t: 'Tu veux dire quoi par là?', intent: 'confus', then: [
      cam('one', 'justin'), say('justin', 'surprised', "Tu veux dire quoi par là?"),
      cam('one', 'candy'), say('candy', 'holding', "Rien. Laisse faire."),
    ] },
    { t: "J'y avais pas pensé...", intent: 'admet', then: [
      cam('one', 'justin'), say('justin', 'thinking', "Hm. J'y avais pas pensé..."),
      cam('one', 'candy'), say('candy', 'listen', "Ben, penses-y."),
    ] },
    { t: 'Mêle-toi de tes affaires.', intent: 'fâché', then: [
      cam('one', 'justin'), say('justin', 'angry', "Mêle-toi de tes affaires, Candy."),
      cam('one', 'candy'), say('candy', 'surprised', "Wô. Ok. Calme-toi."),
    ] },
  ] },
  cam('one', 'melissa'),
  say('melissa', 'listen', "Allez, sois pas si prude. Tu devrais faire une grosse fête."),
  cam('two', 'melissa', 'candy'), face({ candy: 'l' }),
  say('candy', 'holding', "Elle était pas si drôle."),
  say('melissa', 'thinking', "Je savais même pas que vous étiez officiellement en couple."),
  face({ candy: 'r' }),
  cam('one', 'justin'),
  say('justin', 'listen', "Pourtant, on l'est."),
  cam('three', 'melissa', 'candy', 'justin'),
  say('melissa', 'explaining', "Trop bien. Je suis teeeellement contente pour toi."),
  cam('one', 'candy'),
  say('candy', 'holding', "Garde un œil sur elle.", { whisper: true }),
  cam('two', 'melissa', 'candy'),
  say('melissa', 'angry', "Quoi?"),
  face({ candy: 'l' }),
  say('candy', 'listen', "Rien. Je disais que ton smoothie a l'air bon."), // trou
  face({ candy: 'r' }),
  cam('one', 'melissa'),
  say('melissa', 'thinking', "Donc, {N}... j'ai entendu dire que tes parents partent pendant un mois."),
  cam('one', 'justin'),
  say('justin', 'listen', "Oui. Mon père part pour son travail demain matin."),
  cam('one', 'melissa'),
  say('melissa', 'explaining', "Ça veut dire que tu pourrais faire plein de fêtes, non?"),
  say('melissa', 'explaining', "Une maison vide pendant un mois... Je m'occupe des invitations!"), // trou
  { choice: [
    { t: 'Peut-être une petite...', intent: 'tenté', then: [
      cam('one', 'justin'), say('justin', 'thinking', "Peut-être une petite..."),
      cam('one', 'melissa'), say('melissa', 'listen', "Je savais que t'étais cool."),
    ] },
    { t: 'Pas chez moi.', intent: 'ferme', then: [
      cam('one', 'justin'), say('justin', 'holding', "Pas chez moi."),
      cam('one', 'melissa'), say('melissa', 'holding', "Plate."),
    ] },
    { t: 'On en reparle.', intent: 'évite', then: [
      cam('one', 'justin'), say('justin', 'explaining', "On en reparle."),
      cam('one', 'melissa'), say('melissa', 'thinking', "Ça, c'est un oui."),
    ] },
  ] },
  cam('one', 'justin'), { poses: { justin: 'phone_shock' } },
  narr("Mon cell vibre une dernière fois... puis s'éteint."), // trou
  say('justin', 'thinking', "J'ai plus de batterie, et je veux pas que mon père s'inquiète. Je vais y aller."),
  { poses: { melissa: 'holding' } },
  cam('three', 'melissa', 'candy', 'justin'),
  say('candy', 'listen', "Je te comprends. On se voit ce soir?"),
  say('justin', 'explaining', "Bien sûr. À plus!"),
  { enter: { ruby: 'angry' } }, face({ justin: 'l' }),
  cam('two', 'ruby', 'justin'),
  say('ruby', 'angry', "Tu vas où comme ça?"),
  say('justin', 'explaining', "Je m'en vais. Tu pourrais me déposer chez moi?"),
  say('ruby', 'surprised', "Euh... maintenant?"),
  { choice: [
    { t: "Si ça te dérange pas, s'il te plaît?", intent: 'soumis', then: [
      say('justin', 'holding', "Si ça te dérange pas... s'il te plaît?"),
      say('ruby', 'thinking', "Ouais, ok. Si tu veux."),
      narr("Elle soupire comme si je venais de lui demander un rein."),
    ] },
    { t: 'Ouais.', intent: 'nonchalant', then: [
      say('justin', 'listen', "Ouais."),
      say('ruby', 'holding', "Ouais, ok. Si tu veux."),
    ] },
    { t: "Ouais, maintenant. Comme tu l'avais promis.", intent: 'direct', then: [
      say('justin', 'explaining', "Ouais, maintenant. Comme tu l'avais promis."),
      say('ruby', 'angry', "Ouais, ok. Si tu veux."),
      narr("Elle attrape ses clés un peu trop fort."),
    ] },
  ] },

  // ---------- devant la maison ----------
  { fade: 'out', ms: 900 },
  scene('maison', { ruby: 'holding', justin: 'listen' }),
  cam('two', 'ruby', 'justin'),
  { fade: 'in', ms: 1100 },
  { caption: 'Chez toi' },
  say('justin', 'explaining', "Merci de m'avoir déposé."),
  say('ruby', 'holding', "Mm-hm."),
  narr("Elle texte. Elle a texté tout le trajet."), // trou
  { enter: { james: 'explaining' } },
  cam('one', 'james'),
  say('james', 'explaining', "Te voilà enfin!"),
  face({ justin: 'r' }), { poses: { justin: 'holding' } },
  cam('three', 'ruby', 'justin', 'james'),
  say('ruby', 'thinking', "C'est qui, ce vieux?"),
  cam('one', 'james'),
  say('james', 'holding', "Ce « vieux », c'est son père."),
  // la relation en 5 aller-retours
  cam('one', 'ruby'),
  say('ruby', 'surprised', "Oh. Euh... bonjour, monsieur."),
  cam('one', 'james'),
  say('james', 'listen', "Ruby, c'est ça? J'ai beaucoup entendu parler de toi."),
  cam('one', 'ruby'),
  say('ruby', 'explaining', "Ah ouais? En bien, j'espère."),
  cam('one', 'james'),
  say('james', 'thinking', "Pas par lui. Il me dit jamais rien."),
  cam('one', 'ruby'),
  say('ruby', 'listen', "Bon. Je vous laisse. Bye, bébé."),
  { exit: 'ruby' },
  cam('two', 'justin', 'james'),
  narr("Elle repart sans m'embrasser."),
  say('james', 'angry', "Je t'ai appelé dix fois."),
  say('justin', 'explaining', "J'avais plus de batterie."),
  say('james', 'angry', "Dix fois, {N}."),
  say('justin', 'holding', "T'as quelque chose d'important à me dire?"),
  say('james', 'explaining', "Pour tout te dire, oui! Je veux te parler de mon voyage d'affaires de demain."),
  say('justin', 'holding', "Papa. Je vais survivre."),
  say('james', 'thinking', "Je sais, je sais. Mais... j'ai une amie qui sort d'une relation. Elle a besoin d'un toit pour un bout."),
  say('justin', 'thinking', "Ok...?"),
  say('james', 'explaining', "Elle arrive ce soir. Surprise!"),
  cam('one', 'justin'),
  say('justin', 'surprised', "CE SOIR?!"),
  { choice: [
    { t: 'Tu pouvais pas me demander avant?', intent: 'fâché', then: [
      say('justin', 'angry', "Tu pouvais pas me demander avant?"),
      cam('one', 'james'), say('james', 'holding', "C'est pour ça que je t'ai appelé dix fois."),
    ] },
    { t: 'Elle est cool, au moins?', intent: 'curieux', then: [
      say('justin', 'thinking', "Elle est cool, au moins?"),
      cam('one', 'james'), say('james', 'explaining', "Tu vas l'adorer. Tout le monde l'adore."),
    ] },
    { t: "Ok. C'est ta maison.", intent: 'cool', then: [
      say('justin', 'listen', "Ok. C'est ta maison."),
      cam('one', 'james'), say('james', 'explaining', "C'est NOTRE maison. Merci, mon grand."),
    ] },
  ] },
  cam('two', 'justin', 'james'),
  say('james', 'thinking', "Ah, et... Amare vient souper aussi."),
  say('justin', 'holding', "Ton chum vient souper le soir où une inconnue emménage chez nous? Ça va être une soirée tranquille."),
  say('james', 'explaining', "Il fait sa pizza!"),

  // ---------- le salon ----------
  { fade: 'out', ms: 900 },
  scene('salon', { justin: 'listen', amare: 'explaining' }),
  cam('two', 'justin', 'amare'),
  { fade: 'in', ms: 1100 },
  { caption: 'Plus tard, ce soir-là' },
  say('amare', 'explaining', "{N}! Ton père m'a dit que t'étais de bonne humeur ce soir."),
  say('justin', 'holding', "Il t'a menti."),
  say('amare', 'listen', "Parfait, moi aussi je stresse. La pizza est au four. Vingt minutes."),
  narr("DING-DONG."),
  { enter: { james: 'surprised' } },
  cam('one', 'james'),
  say('james', 'surprised', "C'est elle! {N}, va ouvrir!"),
  narr("J'ouvre la porte."),
  { enter: { isa: 'listen' } }, face({ justin: 'l' }),
  { reveal: 'isa', ms: 4200 },
  think('justin', "Wow."),
  think('justin', "C'est... la plus belle femme que j'ai jamais vue."),
  { custom: 'isaLook' },
  cam('two', 'isa', 'justin'),
  say('isa', 'thinking', "C'est ton fils?"),
  cam('one', 'james'),
  say('james', 'explaining', "En chair et en os."), // trou
  cam('one', 'isa'),
  say('isa', 'listen', "J'aurais pas imaginé qu'il soit si..."),
  narr("Isa s'arrête un instant, comme si elle cherchait ses mots."),
  narr("Ses yeux encore posés sur moi, elle passe lentement sa langue sur sa lèvre inférieure."),
  narr("Son regard insistant me rend nerveux."),
  cam('close', 'justin'),
  say('justin', 'surprised', "Serait si... quoi?"),
  cam('one', 'isa'),
  say('isa', 'holding', "Rien..."),
  say('isa', 'thinking', "Est-ce que quelque chose est en train de brûler?"),
  { poses: { amare: 'surprised' } },
  cam('two', 'amare', 'james'),
  say('james', 'surprised', "LA PIZZA!"),
  { end: true },
];

// menu gallery: every pose of each character, the picture it started from (src) and the sheet it was cut from (ref).
// The recolors (recolor: their original) stay out of the gallery
window.GALLERY = [
  { sprite: 'justin', name: 'Justin', src: 'perso_justin', ref: ['urban', 'urban_action', 'urban_back', 'urban_side', 'urban_angled', 'urban_closeup'] },
  { sprite: 'ruby', name: 'Ruby', src: 'perso_ruby', ref: ['elf'] },
  { sprite: 'candy', name: 'Candy', src: 'perso_candy', ref: ['feline'] },
  { sprite: 'james', name: 'James', src: 'perso_james', ref: ['tv'] },
  { sprite: 'melissa', name: 'Melissa', recolor: 'ruby' },
  { sprite: 'amare', name: 'Amare', recolor: 'candy' },
  { sprite: 'isa_nuit', name: 'Isa · Minuit', recolor: 'ruby' },
  { sprite: 'isa_or', name: 'Isa · Doré', recolor: 'ruby' },
  { sprite: 'isa_noir', name: 'Isa · Braise', recolor: 'ruby' },
];
// the prompt that makes a new character's sheet (an image generator), in the layout tools/cut.py cuts into poses
window.SHEET_PROMPT = `Create a character pose sheet for this character: [describe the character, or attach a picture of them].

Format: portrait image, 2:3. An invisible grid of 6 equal cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.

Background: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no floor, no shadow, no glow. The character wears nothing green.

In every cell: the same character, full body from head to feet, centered, same size, with a clear margin of green on all sides (nothing touches the edge of its cell, nothing overlaps another cell). Same outfit, same art style (clean anime game illustration). No text, no labels, no props.

Row 1, left to right: listening (neutral, relaxed), slighty surprised, thinking.
Row 2, left to right: explaining, slightly concerned / angry, holding back.

do not exagerate too much the poses

all poses must be faced to the side, a little angled toward the camera (its an interaction with someone).`;
