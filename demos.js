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
  say('cam', 'flirty', 'Si je te dis un secret, tu me promets de pas partir ?', { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_joke', "Ça dépend. C'est un beau secret ou un laid ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'tipsy_laugh', 'Les deux.', { to: 'brooke' }),
  cam('two', 'brooke', 'cam'), narr('Son téléphone vibre. Elle le retourne, écran contre la table.'),
  say('brooke', 'drunk_listen', "C'était lui ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'awkward', "…Comment tu sais qu'il y a un « lui » ?", { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_point', 'T’as retourné ton téléphone. Personne fait ça pour sa mère.', { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'worried', 'Il sait que je suis ici. Avec toi.', { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_talk', "Et c'est un problème ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'sip', 'Ça va le devenir.', { to: 'brooke' }),
  cam('two', 'brooke', 'cam'), narr('Le téléphone vibre encore. Trois fois.'),
  cam('one', 'cam'), say('cam', 'worried', 'Faut que tu partes. Maintenant.', { to: 'brooke' }),
];
dVerre.seats = ['brooke', 'cam'];   // one phone plays both: no "you are…" card
dVerre.cast = {
  brooke: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' },
  cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 },
};

window.DEMO_STORIES = { d_verre: dVerre };
