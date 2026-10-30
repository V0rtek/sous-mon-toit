// La banque (Plus → Banque): everything a scene is made of, in one place. Persos = every sprite and all its poses (from
// chars.js; "coupée" = cut at the belt, for close shots), Décors = the photos and the perspective guides, Plans = the shots
// the engine knows and the ones still to come, Sons = every sound, playable. Files can't be listed from the browser:
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
  ],
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
      const s = e.target.closest('[data-snd]'), im = e.target.closest('[data-img]');
      if (s) {
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
