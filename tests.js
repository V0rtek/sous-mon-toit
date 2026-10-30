// Stories that test the staging, played with index.html?play=<id>. tpose (30/10): every new pose and shot with dialogue,
// Justin and Kai (Justin recolored). The situations: leaning side by side (rempart, galerie, the bar), a silent look in
// a very close-up (the lie), over-the-shoulder and its reverse, walking together, face to face in profile, one walks
// off and the other watches him go (from behind, then a look back), someone arrives and leans next to you
(() => {
  const say = (who, pose, text) => ({ say: who, pose, text });
  const R = SCENES.rempart, T = SCENES.taverne, B = SCENES.taverne_bar, G = SCENES.galerie;
  Object.assign(SCENES, {
    t_rempart: { ...R, spots: { justin: R.spots.justin, kai: R.spots.melissa }, face: { justin: 'r', kai: 'r' } },
    t_terrasse: { ...T, spots: { kai: [1150, 925, 430], justin: [1350, 925, 430] }, face: { kai: 'l', justin: 'l' } },
    t_face: { ...T, spots: { justin: [760, 925, 430], kai: [1010, 925, 430] }, face: { justin: 'r', kai: 'l' } },
    t_bar: { ...B, spots: { justin: B.spots.justin, kai: [120, 1212, 945] }, face: { justin: 'r', kai: 'r' } },
    t_galerie: { ...G, spots: { kai: G.spots.justin, justin: G.spots.melissa }, face: { kai: 'r', justin: 'r' } },
  });
  const tpose = [
    { scene: 't_rempart', cast: { kai: 'bar', justin: 'bar' } }, { cam: 'wide', at: 700 }, { fade: 'in', ms: 900 }, { caption: 'Le rempart' }, { wait: 1400 },
    { cam: 'close', who: ['kai'] }, say('kai', 'bar', 'Tu l’as vu entrer, hier soir ?'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar', 'Qui ?'),
    { poses: { justin: 'cu_glance' } }, { wait: 150 }, { cam: 'xclose', who: ['justin'] }, { hush: 1600 },   // the lie, silent
    { ots: ['justin', 'kai'] }, say('kai', 'cu_talk', 'Le gars au manteau. Il te cherchait.'),
    { ots: ['kai', 'justin'] }, say('justin', 'cu_hurt', 'J’ai rien à voir avec lui.'),
    { ots: ['justin', 'kai'] }, say('kai', 'cu_anger', 'Mens-moi pas.'),
    { ots: ['kai', 'justin'] }, say('justin', 'cu_smile', 'Ok. Peut-être un peu.'),
    { fade: 'out', ms: 500 },
    { scene: 't_terrasse', cast: { kai: 'walk_mid', justin: 'walk_mid' } }, { cam: 'close', who: ['kai', 'justin'], tight: true }, { fade: 'in', ms: 500 },
    { walk: ['justin', 'kai'], to: 650 },
    { fade: 'out', ms: 300 },
    { scene: 't_face', cast: { justin: 'side_listen', kai: 'side_tense' } }, { cam: 'two', who: ['justin', 'kai'] }, { fade: 'in', ms: 300 },
    say('kai', 'side_tense', 'Tu vas me dire c’est qui ?'), say('justin', 'side_talk', 'Pas ici.'), say('kai', 'side_tense', 'Alors je trouve tout seul.'),
    { walk: 'kai', to: 1750 }, { exit: 'kai' },
    { cam: 'one', who: ['justin'] }, { poses: { justin: 'back_far' } }, { hush: 1400 }, { poses: { justin: 'back_look' } }, { hush: 1200 },
    { fade: 'out', ms: 500 },
    { scene: 't_bar', cast: { justin: 'bar', kai: 'walk_mid' } }, { cam: 'wide', at: 820 }, { fade: 'in', ms: 600 }, { caption: 'La taverne' }, { wait: 900 },
    { walk: 'kai', to: [898, 1212, 945] }, { poses: { kai: 'bar' } }, { cam: 'wide', at: 900 }, { wait: 900 },
    { cam: 'close', who: ['justin'] }, say('justin', 'bar', 'Tu m’as suivi ?'),
    { cam: 'close', who: ['kai'] }, say('kai', 'bar', 'T’es pas dur à trouver.'),
    { ots: ['kai', 'justin'] }, say('justin', 'cu_talk', 'Il s’appelle Marco.'),
    { poses: { kai: 'cu_hurt' } }, { wait: 150 }, { cam: 'xclose', who: ['kai'] }, { hush: 1600 },
    { fade: 'out', ms: 600 },
    { scene: 't_galerie', cast: { kai: 'bar', justin: 'bar' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'La galerie' }, { wait: 1400 },
    { cam: 'close', who: ['justin'] }, say('justin', 'bar', 'Marco travaille pour le château.'),
    { cam: 'close', who: ['kai'] }, say('kai', 'bar', 'Alors on a un problème.'),
    { cam: 'wide', at: 900 }, { hush: 1500 }, { fade: 'out', ms: 900 },
    { end: 'Fin du test' },
  ];
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), tpose };
})();
