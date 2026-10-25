// Full demo's community demos, written for the game's own engine (so a preview looks exactly like Last call:
// its camera, its bubbles). One for now: « Le dernier verre », to compare with Full demo's own renderings (All › Test bulles).

// the terrace, no table: Brooke and Cam face to face
SCENES.d_terrasse = {
  image: 'bg/terrasse.jpg', size: [1920, 1440],
  spots: { brooke: [1020, 1300, 780], cam: [1380, 1300, 740] },
  face: { brooke: 'r', cam: 'l' },
  front: [],
};

const dVerre = [
  scene('d_terrasse', { brooke: 'drunk_listen', cam: 'flirty' }),
  cam('one', 'cam'),
  { fade: 'in', ms: 500 },
  { caption: 'Terrasse du Larina · 1 h 10' },
  say('cam', 'flirty', 'Si je te dis un secret, tu me promets de pas partir ?', { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_joke', "Ça dépend. C'est un beau secret ou un laid ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'tipsy_laugh', 'Les deux.', { to: 'brooke' }),
  cam('two', 'brooke', 'cam'), narr('Son téléphone vibre. Elle le retourne, écran contre la table.'),
  say('brooke', 'drunk_listen', "C'était lui ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'awkward', "…Comment tu sais qu'il y a un « lui » ?", { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_point', 'T’as retourné ton téléphone. Personne fait ça pour sa mère.', { to: 'cam' }),
  { by: 'brooke', choice: [
    { t: 'Insister.', intent: 'pousse', set: { b: 'insiste' }, then: [
      cam('one', 'brooke'), say('brooke', 'drunk_talk', 'Dis-moi son nom. Juste son nom.', { to: 'cam' }),
      cam('one', 'cam'), say('cam', 'worried', 'Je peux pas. Pas encore.', { to: 'brooke' }),
    ] },
    { t: 'Rire pour détendre.', intent: 'rit', set: { b: 'rit' }, then: [
      cam('one', 'brooke'), say('brooke', 'drunk_happy', 'Ok, ok. Un ex jaloux, c’est ça ?', { to: 'cam' }),
      cam('one', 'cam'), say('cam', 'awkward', 'Si seulement.', { to: 'brooke' }),
    ] },
    { t: 'Prendre sa main.', intent: 'rassure', set: { b: 'main' }, then: [
      cam('one', 'brooke'), say('brooke', 'drunk_smile', 'Hey. Je suis là. Dis-moi.', { to: 'cam' }),
      cam('one', 'cam'), say('cam', 'sip', 'Tu dis ça maintenant.', { to: 'brooke' }),
    ] },
  ] },
  cam('one', 'cam'), say('cam', 'worried', 'Il sait que je suis ici. Avec toi.', { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_talk', "Et c'est un problème ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'sip', 'Ça va le devenir.', { to: 'brooke' }),
  { ...think('brooke', 'Il y a une voiture noire de l’autre côté de la rue. Elle y était déjà quand on est arrivées.'), only: 'brooke' },
  { ...think('cam', 'Si Brooke voit la voiture, elle voudra rester. Il faut qu’elle parte avant.'), only: 'cam' },
  cam('two', 'brooke', 'cam'), narr('Le téléphone vibre encore. Trois fois.'),
  { by: 'cam', choice: [
    { t: 'Dire la vérité.', intent: 'avoue', set: { c: 'vérité' }, then: [
      cam('one', 'cam'), say('cam', 'worried', 'C’est mon ex. Il a des gens. Ils sont dehors.', { to: 'brooke' }),
      cam('one', 'brooke'), say('brooke', 'drunk_point', 'La voiture noire.', { to: 'cam' }),
    ] },
    { t: 'La pousser à partir.', intent: 'protège', set: { c: 'pousse' }, then: [
      cam('one', 'cam'), say('cam', 'worried', 'Faut que tu partes. Maintenant.', { to: 'brooke' }),
      cam('one', 'brooke'), say('brooke', 'drunk_sad', 'Tu me renvoies comme ça ?', { to: 'cam' }),
    ] },
    { t: 'Tout nier.', intent: 'nie', set: { c: 'nie' }, then: [
      cam('one', 'cam'), say('cam', 'tipsy_laugh', 'Rien. C’est rien. Commande-nous un verre.', { to: 'brooke' }),
      cam('one', 'brooke'), say('brooke', 'drunk_listen', 'Tes mains tremblent, Cam.', { to: 'cam' }),
    ] },
  ] },
  narr('De l’autre côté de la rue, la portière de la voiture noire s’ouvre.'),
  cam('one', 'brooke'), say('brooke', 'drunk_point', 'Ok. Qui c’est, lui ?', { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'worried', 'Quelqu’un qui sait où tu habites.', { to: 'brooke' }),
  { episode: { n: 1, win: { sprite: 'brooke', pose: 'drunk_joke', name: 'Brooke' } } },
  { fade: 'out', ms: 1600 },
  { end: { kicker: "Fin de l'épisode 1", title: 'Le dernier verre', lede: '{LEDE}', art: null } },
];
dVerre.seats = ['brooke', 'cam'];   // one phone plays both: no "you are…" card
dVerre.solo = { brooke: 'Brooke', cam: 'Cam' };
dVerre.title = 'Le dernier verre';
dVerre.pick = { brooke: { pose: 'drunk_joke', line: "Ça dépend. C'est un beau secret ou un laid ?" }, cam: { pose: 'flirty', line: 'Si je te dis un secret, tu me promets de pas partir ?' } };
dVerre.cast = {
  brooke: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' },
  cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 },
};

dVerre.words = { LEDE: (f) => `${f.c === 'vérité' ? 'Cam a tout dit.' : f.c === 'pousse' ? 'Cam a voulu la renvoyer.' : 'Cam a tout nié.'} ${f.b === 'main' ? 'Brooke lui avait pris la main.' : f.b === 'insiste' ? 'Brooke a insisté.' : 'Brooke a ri.'} Quelqu’un sort de la voiture noire.` };
window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), d_verre: dVerre };
