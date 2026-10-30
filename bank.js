// La banque (Plus → Banque): everything a scene is made of, in one place. Persos = every sprite and all its poses (from
// chars.js; "coupée" = cut at the belt, for close shots), Décors = the photos and the perspective guides, Plans = the shots
// the engine knows and the ones still to come, Prompts = the pose-sheet prompts that worked, Sons = every sound, playable. Files can't be listed from the browser:
// a new decor, guide or sound goes in the lists below
window.BANK = {
  // the sounds in sfx/, what each is for (rooms loop under a scene; one-offs play once)
  sounds: [
    ['bar', 'Ambiance', 'un bar, du monde'], ['crowd', 'Ambiance', 'un intérieur public animé'], ['party', 'Ambiance', 'un party de maison'],
    ['bathroom', 'Ambiance', 'une salle de bain, l’écho'], ['dark', 'Ambiance', 'un lieu sombre, inquiétant'], ['campfire', 'Ambiance', 'un feu de camp'],
    ['crickets', 'Ambiance', 'dehors, le soir'], ['suspense', 'Ambiance', 'tendu'], ['wrong', 'Ambiance', 'quelque chose cloche (horreur)'],
    ['intro', 'Ponctuel', 'le générique, 5 s, sous la carte « You are »'], ['moment', 'Ponctuel', 'le moment important'], ['boss', 'Ponctuel', 'l’arrivée du boss'],
    ['glitch', 'Ponctuel', 'un bug, une coupure'], ['dragon_arrive', 'Ponctuel', 'un rugissement épique, 3 s'], ['dragon_fire', 'Ponctuel', 'le long rugissement du feu, 8 s'],
  ],
  // sounds worth adding (not made yet)
  soundsNext: ['porte qui grince', 'porte qui claque', 'verre posé', 'liquide versé', 'pièces', 'papier, lettre', 'serrure et clé', 'chaise qui racle',
    'pas sur bois', 'pas sur pierre', 'épée tirée', 'coup de poing', 'chute', 'gifle', 'souffle coupé', 'rire', 'chuchotement', 'baiser',
    'vent', 'pluie', 'ville au loin', 'port (cloches, mouettes)', 'battement de cœur', 'nappe grave (révélation)', 'silence (la musique coupe)'],
  // the perspective guides in ref/guides (guides.py): picture, its foreground, what it shows
  guides: [
    ['rue', true, 'Rue · marche', 'Façades à 11 m, lampadaires en avant-plan'], ['escalier', true, 'Escalier', '17,5 × 28 cm, rampe à 90 cm'],
    ['bar', true, 'Bar', 'Comptoir 1,05 m qui file vers le fond, clients côte à côte en profondeur'],
    ['feu', true, 'Feu de camp', 'Bûche de 45 cm, une de 55 cm contre leurs genoux'], ['ruelle', false, 'Ruelle', 'Adossés au mur de gauche, en profondeur'],
    ['taverne_bar', false, 'Taverne · comptoir', 'Les 4 places sur le décor : horizon y 510, dessus du comptoir 25 cm sous la caméra'],
  ],
  // the pose-sheet prompts that worked (30/10), to copy: title, the pictures to attach, what to check, the prompt.
  // For another character: swap the LOCKED block for theirs, attach their sheet
  prompts: [["De dos (6 poses, en pied)", "urban.webp", "Vertical 2:3. Vérifier : lunettes dorées, camisole pas en dos nageur, 2 poches cargo, mêmes souliers, même trait, même direction dans les 6 cases.", "Create a character pose sheet of THIS EXACT character, seen from behind. Image 1 is the reference: it is the character AND the art style. Copy both exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape. From behind: the same volume and waves, a short clean nape.\n- Glasses: thin gold metal rectangular frames; from behind, the thin gold arms are visible over the ears.\n- Face (only a sliver of cheek visible): thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions and same height as image 1.\n- Outfit: plain white ribbed tank top with a classic back (NOT racerback), black baggy cargo pants with a side cargo pocket on each thigh and two back pockets, white-and-grey chunky sneakers (same as image 1). Nothing added, nothing removed: no jewelry, no belt showing, no tattoo, no logo, no props.\n- Art style: identical to image 1: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.\n\nFormat: portrait image, 2:3. An invisible grid of 6 equal cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no floor, no shadow, no glow. The character wears nothing green.\n\nIn every cell: the same character, full body from head to feet, centered, same size, with a clear margin of green on all sides (nothing touches the edge of its cell, nothing overlaps another cell). No text, no labels, no props.\n\nAngle, the same in all 6 cells: three-quarter back view. He turns his back to the camera and faces away toward the right, so we see his back, the back of his head, and only a small part of the side of his face (cheek, ear, glasses arm). Camera at chest height, not from above, not from below.\n\nRow 1, left to right:\n1. Looking into the distance: standing still, weight on one leg, head slightly raised toward the horizon, arms relaxed.\n2. Looking down: head lowered, shoulders slightly dropped, hands loose.\n3. Looking back over his shoulder: body still facing away, head turned back toward the camera, we see his face in profile, neutral expression.\n\nRow 2, left to right:\n4. About to open a door: one step forward, one arm reaching forward at chest height, hand open as if touching a door handle (no door drawn).\n5. Holding back anger: standing stiff, shoulders tense, both fists clenched at his sides.\n6. Walking away: mid-step, one foot lifting, arms swinging naturally, moving away from the camera.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."], ["Profil, coupé à la ceinture", "urban.webp + urban_back.webp", "Horizontal 3:2, cases carrées : 1,6 fois plus net qu’en pied. Vérifier : la coupe au même endroit partout, la tête de la même taille.", "Create a character pose sheet of THIS EXACT character, seen in profile, framed from the waist up. Image 1 is the reference: it is the character AND the art style. Copy both exactly. Image 2 shows the same character from behind, for consistency.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames; in profile, the thin gold arm runs to the ear.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions as image 1.\n- Outfit: plain white ribbed tank top, the top of black baggy cargo pants at the waist. Nothing added, nothing removed: no jewelry, no tattoo, no logo, no props.\n- Art style: identical to image 1: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green.\n\nFraming, the same in all 6 cells: from the top of the head down to just below the belt. The body is cut by a straight horizontal line just below the belt, and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. The head is the same size in every cell. Clear margin of green above the head and on both sides (hands and elbows never touch the side edges, nothing overlaps another cell). The figure fills the cell as much as possible. No text, no labels, no props.\n\nAngle, the same in all 6 cells: pure side view (profile), facing RIGHT. Camera at chest height.\n\nRow 1, left to right:\n1. Walking, frame A: calm walk, left arm swinging forward, right arm back, shoulders slightly turning with the step.\n2. Walking, frame B: the opposite: right arm forward, left arm back.\n3. Listening, face to face: still, neutral and attentive, arms relaxed.\n\nRow 2, left to right:\n4. Talking: one hand raised at chest height in a natural gesture, mouth slightly open.\n5. Leaning in: upper body leaning forward toward someone very close, head slightly tilted, soft expression, as if about to whisper or kiss.\n6. Tense confrontation: shoulders squared, chin slightly down, jaw tight, a hard stare forward.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."], ["Tourné de 20°, coupé (marche en 3, bar, assis, adossé)", "urban.webp seulement", "Celle qui sert aux décors. Vérifier : presque de profil (l’autre œil à peine visible), dans la marche le bras près de la caméra derrière (1) puis devant (3), la tête identique dans les 3 ; la case 4 coupée sous les avant-bras. Si ça tourne vers la caméra : ajouter « Like a character in a side-scrolling game. » au début.", "Create a character pose sheet of THIS EXACT character, framed from the waist up, seen almost from the side. The attached image is the reference: it is the character AND the art style. Copy both exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions as the reference.\n- Outfit: plain white ribbed tank top, the top of black baggy cargo pants at the waist. Nothing added, nothing removed: no jewelry, no tattoo, no logo, no props.\n- Art style: identical to the reference: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green. No furniture, no counter, no wall, no seat, no fire drawn: only the character.\n\nFraming, the same in cells 1, 2, 3, 5 and 6: from the top of the head down to just below the belt. The body is cut by a straight horizontal line just below the belt, and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. The head is the same size in every cell. Clear margin of green above the head and on both sides. No text, no labels.\nCell 4 is the only exception (see pose 4): the cut is higher, just under his forearms.\n\nANGLE, the same in all 6 cells — this is the most important rule:\nHe faces the RIGHT side of the image. It is a SIDE VIEW (profile), turned only very slightly toward the camera (about 20 degrees): his nose points to the right, we see the side of his face and only the very edge of the far eye behind the nose. We see mostly the side of his body and shoulder, only a thin sliver of the front of his chest. NOT a front view. NOT a three-quarter front view. Camera at chest height.\n\n\"Near arm\" = the arm on the camera's side of his body (fully visible). \"Far arm\" = the arm on the other side of his body (partly hidden by his torso).\n\nRow 1 = a WALK CYCLE in 3 frames, a calm normal walk. Draw frame 2 first; frames 1 and 3 are exact copies of frame 2 where ONLY the arms are redrawn: same head, same face, same hair, same torso, same position in the cell, same size, same lean.\n1. Near arm swings BACK (toward the left edge of the image, behind his back). Far arm swings FORWARD (toward the right edge, in front of his chest, partly hidden).\n2. Passing: both arms hanging relaxed along the body.\n3. The OPPOSITE of frame 1: near arm swings FORWARD (toward the right edge, in front of him). Far arm swings BACK (mostly hidden behind his back).\nFrames 1 and 3 must NOT look the same: in frame 1 the near arm is behind him, in frame 3 the near arm is in front of him.\n\nRow 2, left to right, same side angle:\n4. Leaning on a bar, seen from behind the counter's edge: upper body leaning forward, both forearms resting flat on an invisible counter in front of him, relaxed, looking ahead (to the right). The counter would hide everything below the top of his forearms, so DON'T draw it: cut the body with a straight horizontal line right under his forearms (the counter's top edge), and that cut sits exactly on the bottom edge of the cell. Nothing below his forearms: no belly, no belt, no pants. His head stays the same size as in the other cells.\n5. Sitting by a campfire: seated low, leaning forward, elbows resting on his knees, hands loosely together, calm, gazing down at an invisible fire in front of him (to the right). His knees stay inside the cell, above the cut line.\n6. Leaning back: his back resting against an invisible wall, arms crossed, relaxed, head slightly tilted, still facing right.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."]],
  // the shots: done = the engine has it, its step; or still to come
  shots: [
    ['Plan large', true, '{cam: \'wide\', at: x}', 'Tout le décor sur la hauteur, centré sur les persos'],
    ['Plan d’ensemble (établissement)', true, '{establish: image}', 'Le lieu vu d’en haut, zoom lent vers la porte'],
    ['Plan à trois / à deux', true, '{cam: \'three\' | \'two\', who: [...]}', 'Les persos de la tête aux genoux'],
    ['Plan moyen', true, '{cam: \'one\', who: [id]}', 'Un perso, de la tête aux genoux'],
    ['Gros plan', true, '{cam: \'close\', who: [id]}', 'Un perso, à la taille'],
    ['Plan serré, pose coupée', true, 'poses side_ / walk_ / bar / sit / wall', 'Une pose coupée à la ceinture, plus nette : le cadre s’arrête à la coupe'],
    ['Marche', true, '{walk: id | [ids], to}', 'De profil, en 3 temps, la caméra suit ; ensemble = côte à côte'],
    ['Escalier', true, '{walk: id, to: [x, pieds, taille]}', 'La même marche, qui monte et s’éloigne'],
    ['Avant-plan', true, 'SCENES.x.fg', 'Une image par-dessus les persos : comptoir, bûche, rampe'],
    ['Insert (gros plan d’objet)', false, '', 'Plein écran sur un objet : une lettre, une clé, un verre'],
    ['Par-dessus l’épaule', false, '', 'L’un de dos au premier plan (poses back_), l’autre en face'],
    ['Point de vue', false, '', 'Quelqu’un parle face caméra, au joueur'],
    ['Plan de groupe en profondeur', false, '', 'Une file (bar, feu) cadrée d’un coup, du premier au dernier'],
    ['Alternance en gros plan', false, '', 'Deux persos qui se parlent : un gros plan sur chacun, à tour de rôle'],
    ['Avant-plan qui défile', false, '', 'Des poteaux, des passants qui passent devant pendant la marche'],
  ],
};

(() => {
  const $ = (s) => document.querySelector(s), esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  let tab = 'chars', playing = null;
  const nameOf = (id) => ((window.GALLERY || []).find((g) => g.sprite === id) || {}).name || id;
  const tabs = {
    chars() {
      return Object.entries(window.SPRITES || {}).map(([id, sp]) => {
        const half = (sp.half || {}).poses || {}, poses = Object.keys(sp.poses);
        return `<section class="bkChar"><h3>${esc(nameOf(id))} <small>${poses.length} poses</small></h3><div class="bkRow">${poses.map((p) =>
          `<button type="button" class="bkPose${half[p] ? ' cut' : ''}" data-img="chars/${id}/${p}.webp"><img loading="lazy" src="chars/${id}/${p}.webp" alt=""><span>${esc(p)}${half[p] ? '<i>coupée</i>' : ''}</span></button>`).join('')}</div></section>`;
      }).join('');
    },
    decors() {
      const photos = Object.entries(window.SCENES || {}).filter(([, s]) => s.image && !String(s.image).startsWith('ref/guides'));
      const seen = new Set();
      const tile = (src, fg, title, sub) => `<button type="button" class="bkDecor" data-img="${src}"${fg ? ` data-fg="${fg}"` : ''}><span class="pic"><img loading="lazy" src="${src}" alt="">${fg ? `<img loading="lazy" src="${fg}" alt="">` : ''}</span><b>${esc(title)}</b><small>${esc(sub)}</small></button>`;
      return '<h3 class="bkH">Décors</h3><div class="bkGrid">' + photos.filter(([, s]) => !seen.has(s.image) && seen.add(s.image)).map(([id, s]) =>
        tile(s.image, null, id, `${s.size.join(' × ')} px · ${Object.keys(s.spots || {}).length} places${s.establish ? ' · vue d’en haut' : ''}`)
        + (s.establish ? tile(s.establish, null, id + ' · vue d’en haut', 'ouvre et ferme la scène') : '')).join('') + '</div>'
        + '<h3 class="bkH">Guides en perspective</h3><p class="bkNote">Horizon à la poitrine, un point de fuite, grille de 1 m, persos à 4 m (1,75 m = 620 px), tournés de 20° vers la caméra.</p><div class="bkGrid">'
        + BANK.guides.map(([n, fg, title, sub]) => tile(`ref/guides/${n}.webp`, fg ? `ref/guides/${n}_fg.webp` : null, title, sub)).join('') + '</div>';
    },
    shots() {
      return BANK.shots.map(([t, done, step, what]) => `<div class="bkShot${done ? '' : ' next'}"><b>${esc(t)}</b><span>${done ? 'fait' : 'à venir'}</span><p>${esc(what)}</p>${step ? `<code>${esc(step)}</code>` : ''}</div>`).join('');
    },
    prompts() {
      // the pictures to attach show under each prompt (ref/…): a tap opens one big, to save it
      const pics = (refs) => (refs.match(/[\w]+\.webp/g) || []).map((f) => `<button type="button" class="bkRef" data-img="ref/${f}"><img loading="lazy" src="ref/${f}" alt=""><span>${f}</span></button>`).join('');
      return '<p class="bkNote">Les feuilles de poses qui ont marché. Ouvrir l’image à joindre (la toucher, puis l’enregistrer), copier le prompt, coller dans ChatGPT avec l’image.</p>'
        + BANK.prompts.map(([t, refs, check], i) => `<div class="bkShot"><b>${esc(t)}</b><p>${esc(check)}</p><div class="bkRefs">${pics(refs)}</div><button type="button" class="bkCopy" data-copy="${i}">Copier le prompt</button></div>`).join('');
    },
    sounds() {
      return BANK.sounds.map(([n, kind, what]) => `<button type="button" class="bkSound" data-snd="${n}"><i>▶</i><b>${esc(n)}</b><span>${kind} · ${esc(what)}</span></button>`).join('')
        + '<h3 class="bkH">À ajouter</h3><p class="bkNote">' + BANK.soundsNext.map(esc).join(' · ') + '</p>';
    },
  };
  function draw() {
    stop();
    $('#bankTabs').querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.t === tab));
    $('#bankBody').innerHTML = tabs[tab](); $('#bankBody').scrollTop = 0;
  }
  function stop() { if (playing) { playing.a.pause(); playing.b.classList.remove('on'); playing.b.firstChild.textContent = '▶'; playing = null; } }
  window.BANK_OPEN = () => { draw(); };
  document.addEventListener('DOMContentLoaded', () => {
    $('#bankTabs').onclick = (e) => { const b = e.target.closest('button'); if (b) { e.stopPropagation(); tab = b.dataset.t; draw(); } };
    $('#bankBody').onclick = (e) => {
      const s = e.target.closest('[data-snd]'), im = e.target.closest('[data-img]'), cp = e.target.closest('[data-copy]');
      if (cp) {
        e.stopPropagation();
        const done = () => { cp.textContent = 'Copié ✓'; setTimeout(() => { cp.textContent = 'Copier le prompt'; }, 1600); };
        navigator.clipboard.writeText(BANK.prompts[+cp.dataset.copy][3]).then(done, () => {
          const t = document.createElement('textarea'); t.value = BANK.prompts[+cp.dataset.copy][3]; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); done();
        });
      } else if (s) {
        e.stopPropagation(); const again = playing && playing.b === s; stop(); if (again) return;
        const a = new Audio(`sfx/${s.dataset.snd}.mp3`); a.play().catch(() => {}); a.onended = stop;
        playing = { a, b: s }; s.classList.add('on'); s.firstChild.textContent = '■';
      } else if (im) {
        e.stopPropagation();
        $('#bankBig').innerHTML = `<img src="${im.dataset.img}" alt="">${im.dataset.fg ? `<img src="${im.dataset.fg}" alt="">` : ''}`; $('#bankBig').hidden = false;
      }
    };
    $('#bankBig').onclick = (e) => { e.stopPropagation(); $('#bankBig').hidden = true; };
  });
  window.BANK_CLOSE = stop;
})();
