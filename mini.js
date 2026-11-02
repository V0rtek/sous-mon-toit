// Two mini-stories to test the talk box (02/11): the same ~1 minute, one that plays itself (auto: each line moves on after
// its reading time, a choice still waits) and one that waits for a tap. A short line, a long one, the narrator, a thought,
// a whisper, a choice. ?play=d_mini_auto / d_mini_clic, plus &tb=cine|band|kar to see a style.
(() => {
  const body = () => [
    scene('d_terrasse', { brooke: 'drunk_listen', cam: 'flirty' }), cam('two', 'brooke', 'cam'), { fade: 'in', ms: 500 },
    narr('Une terrasse, tard. Il reste deux verres.'),
    cam('one', 'cam'), say('cam', 'flirty', 'Tu viens ?', { to: 'brooke' }),
    cam('one', 'brooke'), say('brooke', 'drunk_talk', 'Je viens, je viens… mais je te préviens : si c’est encore une de tes soirées où on rentre à quatre heures et où je dois expliquer à mon patron pourquoi je dors debout, je repars.', { to: 'cam' }),
    think('brooke', 'Il a l’air nerveux. Il est jamais nerveux.'),
    cam('one', 'cam'), say('cam', 'worried', 'Ne te retourne pas. Il est là.', { whisper: true, to: 'brooke' }),
    cam('two', 'brooke', 'cam'), narr('Une portière claque, de l’autre côté de la rue.'),
    { by: 'brooke', choice: [
      { t: 'Te retourner.', intent: 'regarde', then: [cam('one', 'brooke'), say('brooke', 'drunk_point', 'Je veux le voir.', { to: 'cam' })] },
      { t: 'Prendre sa main.', intent: 'rassure', then: [cam('one', 'brooke'), say('brooke', 'drunk_smile', 'Ok. On part ensemble.', { to: 'cam' })] },
    ] },
    cam('one', 'cam'), say('cam', 'worried', 'Marche. Sans courir.', { to: 'brooke' }),
    { fade: 'out', ms: 1200 },
    { end: { kicker: 'Mini-histoire', title: 'Test des boîtes de dialogue', lede: 'Une ligne courte, une longue, la narration, une pensée, un chuchotement et un choix.', art: null } },
  ];
  const mk = (title, auto) => { const st = body(); Object.assign(st, { title, auto, seats: ['brooke', 'cam'], solo: { brooke: 'Brooke', cam: 'Cam' },
    pick: { brooke: { pose: 'drunk_joke', line: 'Tu viens ?' }, cam: { pose: 'flirty', line: 'Tu viens ?' } },
    cast: { brooke: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' }, cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 } } }); return st; };
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), d_mini_auto: mk('Mini · tout seul', true), d_mini_clic: mk('Mini · au clic', false) };
})();
