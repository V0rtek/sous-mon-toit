// Stories that test the staging, played with index.html?play=<id> (Mini-jeux has a tile for each). tpose (30/10): every new pose and shot with dialogue,
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
    t_rue: { ...T, spots: { kai: [1000, 925, 430], justin: [1500, 925, 430] }, face: { kai: 'l', justin: 'l' } },
    t_loin: { ...B, spots: { justin: B.spots.justin, leo: B.spots.ruby, kai: [120, 1212, 945] }, face: { justin: 'r', leo: 'r', kai: 'r' } },
    t_galerie2: { ...G, spots: { justin: G.spots.justin, kai: G.spots.ruby }, face: { justin: 'r', kai: 'r' } },
    t_feu: { image: 'ref/guides/feu.webp', fg: 'ref/guides/feu_fg.webp', size: [2400, 1350], front: [], spots: { justin: [711, 1250, 620], kai: [793, 1176, 517] }, face: { justin: 'r', kai: 'r' } },
    t_rempart2: { ...R, spots: { justin: R.spots.melissa, kai: [-200, 1521, 994] }, face: { justin: 'r', kai: 'r' } },
    // the counter with objects in front of each one: on its top, past their hands, sized from their depth (1,75 m = their
    // height). Widths in metres: a mug 17 cm, a coin 7, a purse 16, a letter 25, an envelope 22, a poster 30, a map 32
    t_objets: { ...B, spots: { justin: B.spots.justin, leo: B.spots.melissa, kai: B.spots.candy, twin: B.spots.ruby },
      face: { justin: 'r', leo: 'r', kai: 'r', twin: 'r' },
      // [who, object, width m, how far in front of his forearms (in his heights, toward the camera), along the counter (0 =
      // at his hands, 1 = at the top's right edge; below 0, to the left, in tenths of his height)]. The top's right edge: (980, 712) → (1290, 545), measured
      // in front of Justin, the counter's near end (its front edge at y 705) has room: a purse, his mug, a letter, a coin;
      // the others get one each, past their hands
      props: [['justin', 'bourse', 0.16, 0.03, -2.4], ['justin', 'lettre', 0.24, 0.033, -1.2], ['justin', 'chope', 0.17, 0.02, 0.35], ['justin', 'piece', 0.07, 0.03, 0.8],
        ['leo', 'enveloppe', 0.22, 0.02, 0.9], ['kai', 'wanted', 0.3, 0.02, 0.9], ['twin', 'carte', 0.32, 0.02, 0.9]]
        .map(([who, src, m, dy, along]) => {
          const [x, feet, h] = B.spots[{ justin: 'justin', leo: 'melissa', kai: 'candy', twin: 'ruby' }[who]], y = feet - 0.6 * h + dy * h, w = m / 1.75 * h;
          const hands = x + 0.12 * h, right = 980 + (712 - y) / 167 * 310 - 0.55 * w;   // the object stays on the top
          return { src, x: along < 0 ? hands + along * 0.1 * h : hands + (right - hands) * along, y, w, z: feet + 1 };   // < 0: in front of his arms, in tenths of his height
        }) },
    t_trois: { ...B, spots: { justin: B.spots.justin, leo: B.spots.melissa, kai: B.spots.candy }, face: { justin: 'r', leo: 'r', kai: 'r' } },
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
  // trattrape: one walks ahead, the other hurries to catch up (catchup), then side by side; they stop and talk over the
  // shoulder; they set off together (a cut, side by side at once); one stops, the other goes on alone
  const trattrape = [
    { scene: 't_rue', cast: { kai: 'walk_mid', justin: 'walk_mid' } }, { cam: 'wide', at: 1250 }, { fade: 'in', ms: 600 }, { caption: 'Rattraper' }, { wait: 1000 },
    say('justin', 'walk_mid', 'Kai ! Attends !'),
    { walk: ['kai', 'justin'], to: 500, catchup: true },
    { ots: ['justin', 'kai'] }, say('kai', 'cu_talk', 'T’es lent.'),
    { ots: ['kai', 'justin'] }, say('justin', 'cu_smile', 'T’as pas attendu, surtout.'),
    { ots: ['justin', 'kai'] }, say('kai', 'cu_glance', 'On nous suit. Marche.'),
    { walk: ['kai', 'justin'], to: 1300 },
    say('justin', 'walk_mid', 'Kai ?'),
    { walk: 'kai', to: 1750 }, { exit: 'kai' },
    { poses: { justin: 'cu_hurt' } }, { wait: 150 }, { cam: 'xclose', who: ['justin'] }, { hush: 1500 },
    { fade: 'out', ms: 800 }, { end: 'Fin du test' },
  ];
  // ttrois: three at the bar, side by side in depth; a close-up on each who speaks (the one at the back too), over the
  // shoulder between two of them while the third listens, a look in a very close-up, then one gets up and leaves
  const ttrois = [
    { scene: 't_trois', cast: { kai: 'bar', leo: 'bar', justin: 'bar' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'À trois au comptoir' }, { wait: 1200 },
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'Bon. Qui paie la tournée ?'),
    { cam: 'close', who: ['kai'] }, say('kai', 'bar', 'Pas moi. Justin a de l’argent, maintenant.'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar', 'Qui t’a dit ça ?'),
    { ots: ['justin', 'leo'] }, say('leo', 'cu_talk', 'Tout le monde le sait, Justin.'),
    { ots: ['leo', 'justin'] }, say('justin', 'cu_anger', 'Tout le monde parle trop.'),
    { poses: { kai: 'cu_glance' } }, { wait: 150 }, { cam: 'xclose', who: ['kai'] }, { hush: 1500 },
    { cam: 'close', who: ['kai'] }, say('kai', 'cu_talk', 'Moi, je dis rien.'),
    { poses: { leo: 'walk_mid' } },   // he stands up: straight into the walk, the close shot follows him
    { walk: 'leo', to: [150, 1212, 945] }, { exit: 'leo' },
    { cam: 'close', who: ['justin'] }, say('justin', 'bar', 'Bon. Il reste toi.'),
    { fade: 'out', ms: 800 }, { end: 'Fin du test' },
  ];
  // tplaces: small placements. Someone far down the counter (close-ups on him far away), someone walking along the counter
  // into the depth to lean further on, the two ends of the long table talking over the shoulder, sitting side by side at
  // a fire, someone arriving from off-screen to lean next to you
  const tplaces = [
    { scene: 't_loin', cast: { leo: 'bar', justin: 'bar', kai: 'walk_mid' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'Au bout du comptoir' }, { wait: 1200 },
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'Hé ! Le nouveau, là-bas !'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar', 'Moi ?'),
    { poses: { leo: 'cu_smile' } }, { wait: 150 }, { cam: 'xclose', who: ['leo'] }, { hush: 1300 },
    { ots: ['justin', 'leo'] }, say('leo', 'cu_talk', 'Viens t’asseoir avec moi.'),
    { cam: 'wide', at: 900 }, { wait: 500 },
    { walk: 'kai', to: [1000, 960, 630] }, { poses: { kai: 'bar' } }, { cam: 'wide', at: 900 }, { wait: 900 },
    { cam: 'close', who: ['kai'] }, say('kai', 'bar', 'Il parle à tout le monde, lui.'),
    { fade: 'out', ms: 500 },
    { scene: 't_galerie2', cast: { justin: 'bar', kai: 'bar' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'Les deux bouts de la table' }, { wait: 1200 },
    { ots: ['justin', 'kai'] }, say('kai', 'cu_anger', 'Tu restes à ta place.'),
    { ots: ['kai', 'justin'] }, say('justin', 'cu_talk', 'Ma place est ici.'),
    { fade: 'out', ms: 500 },
    { scene: 't_feu', cast: { kai: 'sit', justin: 'sit' } }, { cam: 'wide', at: 850 }, { fade: 'in', ms: 600 }, { caption: 'Autour du feu' }, { wait: 1200 },
    { cam: 'close', who: ['justin'] }, say('justin', 'sit', 'Tu dors pas ?'),
    { cam: 'close', who: ['kai'] }, say('kai', 'sit', 'Pas avec Marco dans le coin.'),
    { fade: 'out', ms: 500 },
    { scene: 't_rempart2', cast: { justin: 'bar', kai: 'walk_mid' } }, { cam: 'wide', at: 700 }, { fade: 'in', ms: 600 }, { caption: 'Il arrive' }, { wait: 800 },
    { walk: 'kai', to: [566, 1521, 994] }, { poses: { kai: 'bar' } }, { cam: 'wide', at: 700 }, { wait: 800 },
    { cam: 'close', who: ['kai'] }, say('kai', 'bar', 'Je savais que tu serais ici.'),
    { fade: 'out', ms: 800 }, { end: 'Fin du test' },
  ];
  // tobjets: objects lying on the counter in front of each one (no hands yet): wide, then a close-up on each
  CAST.twin = CAST.twin || { name: 'Sam', color: '#555', sprite: 'justin' };
  const tobjets = [
    { scene: 't_objets', cast: { twin: 'bar', kai: 'bar', leo: 'bar', justin: 'bar' } }, { cam: 'wide', at: 950 }, { fade: 'in', ms: 600 }, { caption: 'Objets sur le comptoir' }, { wait: 1800 },
    { cam: 'close', who: ['justin'] }, say('justin', 'bar', 'Ma bourse, ma bière, ma pièce. Et une lettre.'),
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'Une enveloppe. Scellée.'),
    { cam: 'close', who: ['kai'] }, say('kai', 'bar', 'Cinq cents pièces pour lui.'),
    { cam: 'close', who: ['twin'] }, say('twin', 'bar', 'Et la carte qui mène au trésor.'),
    { cam: 'wide', at: 950 }, { hush: 1500 }, { fade: 'out', ms: 800 }, { end: 'Fin du test' },
  ];
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), tpose, trattrape, ttrois, tplaces, tobjets };
  window.TEST_LIST = [{ id: 'tpose', name: 'Test · tout' }, { id: 'trattrape', name: 'Test · rattraper' }, { id: 'ttrois', name: 'Test · à trois' }, { id: 'tplaces', name: 'Test · placements' }, { id: 'tobjets', name: 'Test · objets' }];
})();
