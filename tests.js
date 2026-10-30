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
    // the kiss: face to face in pure profile; a kiss pose puts his lips 143 sheet px ahead of his spot (chars.js), so
    // 2 × 143 × 430 / 1230 = 100 apart, their faces meet
    t_baiser: { ...T, spots: { justin: [820, 925, 430], twin: [920, 925, 430] }, face: { justin: 'r', twin: 'l' } },
    // two at the counter talking to each other: Sam nearer the camera, Justin behind him (the one at the back shows his face)
    t_deux: { ...B, spots: { twin: B.spots.justin, justin: B.spots.melissa }, face: { twin: 'r', justin: 'r' } },
    // Justin and the pirate at the counter: Justin nearer the camera, the pirate behind him
    t_pirate: { ...B, spots: { justin: B.spots.justin, pirate: B.spots.melissa }, face: { justin: 'r', pirate: 'r' } },
    // seated at a table, facing each other (the guide ref/guides/table, until the real decor): the table hides below its top
    t_table: { image: 'ref/guides/table.webp', fg: 'ref/guides/table_fg.webp', size: [2400, 1350], front: [], spots: { a: [1005, 1250, 620], b: [1395, 1250, 620] }, face: { a: 'r', b: 'l' } },
    // Lily (31/10, imported from Nouveau perso): standing face to face with Justin, at the counter behind him, at the table
    t_lily_debout: { ...T, spots: { justin: [760, 925, 430], lily: [1010, 925, 430] }, face: { justin: 'r', lily: 'l' } },
    t_lily_bar: { ...B, spots: { justin: B.spots.justin, lily: B.spots.melissa }, face: { justin: 'r', lily: 'r' } },
    t_lily_devant: { ...B, spots: { lily: B.spots.melissa, justin: B.spots.candy }, face: { lily: 'r', justin: 'r' } },   // nobody in front of her, room on her right for what she holds
    t_lily_table: { image: 'ref/guides/table.webp', fg: 'ref/guides/table_fg.webp', size: [2400, 1350], front: [], spots: { lily: [1005, 1250, 620], lily2: [1395, 1250, 620] }, face: { lily: 'r', lily2: 'l' } },
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
  // tcomptoir (31/10): Justin's 6 new poses at the counter, straight ahead (the mug drawn in): each one in a close shot
  // and changed inside the same shot (bar -> bar_talk: the size must not jump), then wide with Léo beside him
  const tcomptoir = [
    { scene: 't_trois', cast: { leo: 'bar', justin: 'bar' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'Au comptoir · droit devant' }, { wait: 1200 },
    { cam: 'close', who: ['justin'] }, { wait: 700 },
    say('justin', 'bar_talk', 'Une dernière. Après, je rentre.'),
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'Tu dis ça depuis trois tournées.'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar_drink', '…'),
    say('justin', 'bar_smile', 'Elle m’a souri, tantôt.'),
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'Elle sourit à tout le monde.'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar_stare', 'Pas comme ça.'),
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'T’es saoul.'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar_laugh', 'Un peu. Beaucoup.'),
    { cam: 'wide', at: 900 }, say('justin', 'bar_slump', 'Réveille-moi quand elle revient.'),
    { cam: 'close', who: ['justin'] }, { poses: { justin: 'bar' } }, { wait: 900 }, { poses: { justin: 'bar_talk' } }, { wait: 900 }, { poses: { justin: 'bar' } }, { wait: 700 },
    // toward the one next to him: the same body, the head turns
    { caption: 'Au comptoir · vers l’autre' }, { cam: 'wide', at: 900 }, { wait: 1000 },
    { cam: 'close', who: ['justin'] }, say('justin', 'bar_to_talk', 'Léo. Regarde-moi.'),
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'Quoi ?'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar_to_flirt', 'Tu la trouves belle, toi aussi.'),
    { cam: 'close', who: ['leo'] }, say('leo', 'bar', 'J’ai rien dit.'),
    { cam: 'close', who: ['justin'] }, say('justin', 'bar_to_anger', 'T’as rien besoin de dire.'),
    say('justin', 'bar_back', 'Elle revient.'),
    say('justin', 'bar_slide', 'Tiens. T’en as plus besoin que moi.'),
    { cam: 'wide', at: 900 }, say('justin', 'bar_toast', 'À celle qui sourit à tout le monde.'),
    { fade: 'out', ms: 600 },
    // they talk to each other: a plain 'bar' turns the head (index.html, counterTalk): Justin, at the back, turns his face
    // to Sam; Sam, in front, turns the back of his head to Justin
    { scene: 't_deux', cast: { twin: 'bar', justin: 'bar' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'Ils se parlent' }, { wait: 1200 },
    { cam: 'close', who: ['justin'] }, { say: 'justin', pose: 'bar', to: 'twin', text: 'Sam. Tu l’as vue, toi aussi ?' },
    { cam: 'close', who: ['twin'] }, { say: 'twin', pose: 'bar', to: 'justin', text: 'Vue qui ?' },
    { cam: 'close', who: ['justin'] }, { say: 'justin', pose: 'bar_to_flirt', to: 'twin', text: 'Fais pas l’innocent.' },
    { cam: 'two', who: ['twin', 'justin'] }, { say: 'twin', pose: 'bar', to: 'justin', text: 'Ok. Oui. Elle est belle.' },
    { cam: 'close', who: ['justin'] }, { say: 'justin', pose: 'bar_drink', text: '…' },
    { say: 'justin', pose: 'bar', to: 'twin', text: 'Elle m’a demandé ton nom.' },
    { fade: 'out', ms: 600 },
    // the pirate (made with Nouveau perso): his poses, and the two of them turning their heads to talk
    { scene: 't_pirate', cast: { justin: 'bar', pirate: 'bar' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'Le pirate' }, { wait: 1200 },
    { cam: 'close', who: ['pirate'] }, { say: 'pirate', pose: 'bar', to: 'justin', text: 'T’es nouveau, toi.' },
    { cam: 'close', who: ['justin'] }, { say: 'justin', pose: 'bar', to: 'pirate', text: 'Ça paraît tant que ça ?' },
    { cam: 'close', who: ['pirate'] }, { say: 'pirate', pose: 'bar_laugh', text: 'Tu tiens ta chope comme une épée.' },
    { say: 'pirate', pose: 'bar_drink', text: '…' },
    { say: 'pirate', pose: 'bar_to_flirt', to: 'justin', text: 'La rousse, au fond. Elle te regarde.' },
    { cam: 'close', who: ['justin'] }, { say: 'justin', pose: 'bar', to: 'pirate', text: 'Elle regarde tout le monde.' },
    { cam: 'close', who: ['pirate'] }, { say: 'pirate', pose: 'bar_to_anger', to: 'justin', text: 'Pas moi. Jamais moi.' },
    { say: 'pirate', pose: 'bar_stare', text: 'Plus depuis le port.' },
    { say: 'pirate', pose: 'bar_back', text: 'La voilà.' },
    { say: 'pirate', pose: 'bar_slide', to: 'justin', text: 'Tiens. T’en auras besoin.' },
    { cam: 'wide', at: 900 }, { say: 'pirate', pose: 'bar_toast', to: 'justin', text: 'Aux nouveaux.' },
    { say: 'pirate', pose: 'bar_slump', text: 'Réveille-moi si elle revient.' },
    { fade: 'out', ms: 800 }, { end: 'Fin du test' },
  ];
  // tbaiser (31/10): Justin and Sam (Justin again, turned around) face to face in pure profile: each pose of the kiss
  // sheet on both, in a two-shot; the rejected one on Justin alone
  const tbaiser = [
    { scene: 't_baiser', cast: { justin: 'kiss_near', twin: 'kiss_near' } }, { cam: 'two', who: ['justin', 'twin'] }, { fade: 'in', ms: 600 }, { caption: 'Le baiser' }, { wait: 1200 },
    say('twin', 'kiss_near', 'T’es sûr ?'), say('justin', 'kiss_near', 'Non.'),
    { poses: { justin: 'kiss', twin: 'kiss' } }, { hush: 1800 },
    { poses: { justin: 'kiss_after', twin: 'kiss_after' } }, say('twin', 'kiss_after', '…Wow.'),
    { poses: { justin: 'kiss_forehead', twin: 'kiss_forehead' } }, { hush: 1500 },
    { poses: { twin: 'kiss_whisper', justin: 'kiss_near' } }, say('twin', 'kiss_whisper', 'Personne le sait.'),
    { poses: { twin: 'kiss_near', justin: 'kiss_near' } }, { wait: 600 }, { poses: { justin: 'kiss_rejected' } }, say('justin', 'kiss_rejected', 'Attends. Quoi ?'),
    { fade: 'out', ms: 800 }, { end: 'Fin du test' },
  ];
  // tlily (31/10): the 1st character made entirely in the game (Nouveau perso: her picture, Debout, Accoudé, Assis
  // imported from the phone, no Claude). Each of her poses, with Justin; at the table across from herself (Justin has no
  // sitting poses yet)
  CAST.lily2 = CAST.lily2 || { name: 'Lily (reflet)', color: '#555', sprite: 'lily' };
  const tlily = [
    { scene: 't_lily_debout', cast: { justin: 'listen', lily: 'listen' } }, { cam: 'two', who: ['justin', 'lily'] }, { fade: 'in', ms: 600 }, { caption: 'Lily · debout' }, { wait: 1200 },
    say('lily', 'smile', 'Toi, t’es pas d’ici.'), say('justin', 'explaining', 'Ça se voit tant que ça ?'),
    say('lily', 'surprised', 'T’as payé ta bière ? Personne paie, ici !'),
    say('lily', 'angry', 'Le vieux Marco va te plumer.'), say('lily', 'hurt', 'Il m’a plumée, moi.'),
    { cam: 'one', who: ['lily'] }, say('lily', 'back_walk', 'Suis-moi. Vite.'),
    { fade: 'out', ms: 500 },
    { scene: 't_lily_bar', cast: { justin: 'bar', lily: 'bar' } }, { cam: 'wide', at: 900 }, { fade: 'in', ms: 600 }, { caption: 'Lily · au comptoir' }, { wait: 1000 },
    { cam: 'close', who: ['lily'] }, { say: 'lily', pose: 'bar', to: 'justin', text: 'Tu me dois une pièce.' },
    { cam: 'close', who: ['justin'] }, { say: 'justin', pose: 'bar', to: 'lily', text: 'Pour quoi ?' },
    { cam: 'close', who: ['lily'] }, { say: 'lily', pose: 'bar_to_smile', to: 'justin', text: 'Pour t’avoir sauvé de Marco.' },
    { say: 'lily', pose: 'bar_to_tense', to: 'justin', text: 'C’est pas une blague.' },
    { say: 'lily', pose: 'bar_ahead', text: 'Il en a eu d’autres avant toi.' },
    { say: 'lily', pose: 'bar_back', text: 'Il nous regarde.' },
    { put: { lily: 'piece' } }, { say: 'lily', pose: 'bar_put', to: 'justin', text: 'Tiens. Fais semblant de payer.' },
    { fade: 'out', ms: 500 },
    { scene: 't_lily_table', cast: { lily: 'sit_listen', lily2: 'sit_listen' } }, { cam: 'wide', at: 1200 }, { fade: 'in', ms: 600 }, { caption: 'Lily · assise' }, { wait: 1200 },
    { cam: 'close', who: ['lily'] }, say('lily', 'sit_listen', 'Assieds-toi.'), say('lily', 'sit_lean', 'Marco garde l’argent sous le comptoir.'),
    say('lily', 'sit_back', 'Pourquoi je te ferais confiance ?'), say('lily', 'sit_head', 'J’en peux plus de cette ville.'),
    say('lily', 'sit_fist', 'Ce soir, on le reprend.'), say('lily', 'sit_rise', 'Minuit. Sois là.'),
    { fade: 'out', ms: 500 },
    // her Prises (empty hands): the game puts the mug, then the letter, where her hand is (until her sheet is imported,
    // her closest pose plays and nothing is held)
    { scene: 't_lily_devant', cast: { justin: 'bar', lily: 'bar' } }, { cam: 'close', who: ['lily'] }, { fade: 'in', ms: 600 }, { caption: 'Lily · prises' }, { wait: 900 },
    { hold: { lily: 'chope' } }, { say: 'lily', pose: 'hold_mouth', text: '…' },
    { say: 'lily', pose: 'hold_raise', to: 'justin', text: 'À Marco. Qu’il dorme bien ce soir.' },
    { hold: { lily: 'lettre' } }, { say: 'lily', pose: 'hold_front', text: '« Minuit, la cave. » C’est son écriture.' },
    { say: 'lily', pose: 'hold_give', to: 'justin', text: 'Garde-la. Si je reviens pas.' },
    { hold: { lily: null } }, { say: 'lily', pose: 'bar_slump', text: 'J’ai trop bu pour un plan pareil.' },
    { say: 'lily', pose: 'bar_laugh', text: 'Ou pas assez !' },
    { fade: 'out', ms: 500 },
    // the same hands, other objects: the purse, the envelope, the map, the scroll, the poster, a coin
    { scene: 't_lily_devant', cast: { justin: 'bar', lily: 'bar' } }, { cam: 'close', who: ['lily'] }, { fade: 'in', ms: 600 }, { caption: 'Lily · objets' }, { wait: 900 },
    { hold: { lily: 'bourse' } }, { say: 'lily', pose: 'hold_give', to: 'justin', text: 'Sa bourse. Je l’ai prise en passant.' },
    { hold: { lily: 'enveloppe' } }, { say: 'lily', pose: 'hold_front', text: 'Scellée. Le sceau du port.' },
    { hold: { lily: 'carte' } }, { say: 'lily', pose: 'hold_raise', to: 'justin', text: 'Et ça, c’est où il cache le reste.' },
    { hold: { lily: 'parchemin' } }, { say: 'lily', pose: 'hold_front', text: 'Un contrat. Avec ton nom dessus.' },
    { hold: { lily: 'wanted' } }, { say: 'lily', pose: 'hold_give', to: 'justin', text: 'Et ça, c’est toi. Recherché.' },
    { hold: { lily: 'piece' } }, { say: 'lily', pose: 'hold_raise', to: 'justin', text: 'Pile, tu restes. Face, tu cours.' },
    { hold: { lily: null } }, { fade: 'out', ms: 800 }, { end: 'Fin du test' },
  ];
  // tobj (31/10, « Objets »): every drink with Lily, at the counter, nobody in front of her: drunk, raised, left on the
  // counter beside her while she talks (her leaning poses), then the papers read and handed. Placements: Placer un objet
  const tobj = [{ scene: 't_lily_devant', cast: { justin: 'bar', lily: 'bar' } }, { cam: 'close', who: ['lily'] }, { fade: 'in', ms: 600 }, { caption: 'Objets' }, { wait: 900 },
    ...['biere', 'vin', 'potion', 'gobelet'].flatMap((o) => [
      { hold: { lily: o } }, { say: 'lily', pose: 'hold_mouth', text: `${o} · elle boit` },
      { say: 'lily', pose: 'hold_raise', to: 'justin', text: `${o} · elle trinque` },
      { say: 'lily', pose: 'bar_to_smile', to: 'justin', text: `${o} · posée à côté d’elle` },
      { say: 'lily', pose: 'bar_ahead', text: `${o} · toujours là` }]),
    ...['lettre', 'carte', 'wanted', 'avis', 'enveloppe'].flatMap((o) => [
      { hold: { lily: o } }, { say: 'lily', pose: 'hold_front', text: `${o} · elle lit` },
      { say: 'lily', pose: 'hold_give', to: 'justin', text: `${o} · elle tend` }]),
    { hold: { lily: null } }, { put: { lily: 'piece' } }, { say: 'lily', pose: 'bar_put', to: 'justin', text: 'piece · posée sous ses doigts' },
    { fade: 'out', ms: 800 }, { end: 'Fin du test' }];
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), tpose, trattrape, ttrois, tplaces, tobjets, tcomptoir, tbaiser, tlily, tobj };
  window.TEST_LIST = [{ id: 'tpose', name: 'Test · tout' }, { id: 'trattrape', name: 'Test · rattraper' }, { id: 'ttrois', name: 'Test · à trois' }, { id: 'tplaces', name: 'Test · placements' }, { id: 'tobjets', name: 'Test · objets' }, { id: 'tcomptoir', name: 'Test · comptoir' }, { id: 'tbaiser', name: 'Test · baiser' }, { id: 'tlily', name: 'Test · Lily' }, { id: 'tobj', name: 'Objets' }];
})();
