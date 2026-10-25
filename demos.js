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
  scene('d_terrasse', { brooke: 'drunk_listen', cam: 'listen' }),
  cam('two', 'brooke', 'cam'),
  { fade: 'in', ms: 700 },
  narr('Terrasse du Marcel. 1 h 04. Le serveur empile déjà les chaises.'),
  cam('one', 'cam'), say('cam', 'flirty', "Je t'avais dit que je viendrais.", { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_joke', "T'es venue pour moi ou pour le pichet ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'tipsy_laugh', 'Les deux. Dans cet ordre-là, peut-être.', { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_point', 'Fais attention, je note tout.', { to: 'cam' }),
  cam('two', 'brooke', 'cam'), narr('Son téléphone vibre sur la table. Elle le retourne sans regarder.'),
  say('brooke', 'drunk_listen', "C'était qui ?", { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'awkward', "Personne d'important. Pas ce soir.", { to: 'brooke' }),
  cam('one', 'brooke'), say('brooke', 'drunk_talk', '« Pas ce soir », ça veut dire demain oui.', { to: 'cam' }),
  cam('one', 'cam'), say('cam', 'sip', 'Ça veut dire que tu poses trop de questions.', { to: 'brooke' }),
  cam('two', 'brooke', 'cam'), narr('Le téléphone vibre encore. Trois fois.'),
  cam('one', 'cam'), say('cam', 'worried', '…Ok. Faut que je te dise un truc.', { to: 'brooke' }),
];
dVerre.seats = ['brooke', 'cam'];   // one phone plays both: no "you are…" card
dVerre.cast = {
  brooke: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' },
  cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 },
};

window.DEMO_STORIES = { d_verre: dVerre };
