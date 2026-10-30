// Infos › Spark › Le deck (31/10): the pitch deck for the Spark stage, full width. One slide per beat of "Sur scène · le pitch"
// (the plan is in #spark). Tap right = next, left = back, arrows too. A photo slot (the selfies of [X] and [Y], their characters)
// takes a picture from the phone and keeps it on this device; the line under [X] is typed in place.
window.DECK = (() => {
  const KEY = 'smt-deck', load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  let saved = load(), i = 0, root;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* full or private window */ } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slot = (k, label) => `<label class="dkPic" data-k="${k}"${saved[k] ? ` style="background-image:url(${saved[k]})"` : ''}><span>${saved[k] ? '' : esc(label)}</span><input type="file" accept="image/*" hidden></label>`;
  const nm = (k) => esc(saved['n_' + k] || `[${k.toUpperCase()}]`), T = (h) => h.replace(/\[X\]/g, nm('x')).replace(/\[Y\]/g, nm('y'));
  const typed = (k, def) => `<p class="dkTyped" contenteditable="true" spellcheck="false" data-t="${k}">${esc(saved['t_' + k] ?? def)}</p>`;
  // every character we have the base image for: image → perso, the perso cycling through its poses to show it moves
  const WALL = [
    ['ref/perso_brooke.webp', 'chars/brooke', 'drunk_listen drunk_talk drunk_smile drunk_happy drunk_sad drunk_point'],
    ['ref/perso_cam.webp', 'chars/cam', 'listen explaining flirty sip tipsy_laugh worried'],
    ['ref/perso_candy.webp', 'chars/candy', 'listen explaining surprised thinking angry holding'],
    ['ref/perso_james.webp', 'chars/james', 'listen explaining surprised thinking angry holding'],
    ['ref/perso_julian.webp', 'chars/julian', 'listen talk smirk offer hands_up cold'],
    ['ref/perso_justin.webp', 'chars/justin', 'listen explaining thinking surprised angry holding'],
    ['ref/perso_ruby.webp', 'chars/ruby', 'listen explaining surprised thinking angry holding'],
    ['ref/perso_suit.webp', 'chars/suit', 'listen adjust offer angry'],
    ['ref/perso_corsaire.webp', 'ref/corsaire', 'listen smile surprised angry hurt back_walk'],
  ].map(([img, dir, poses]) => [img, poses.split(' ').map((p) => `${dir}/${p}.webp`)]);
  // slide 9: the catalogue the story is picked from (a tap in the demo); a hover shows what makes you curious
  const CAT = [
    ['Le serment du pirate', 'bg/taverne.webp', ['chars/pirate/bar_smile.webp'], 'props/wanted.webp', '« Je gardais ta place depuis trois ans. »', 1],
    ['Quest of power', 'bg/rempart.webp', ['chars/ninja/stand.webp', 'chars/exile/stand.webp'], 'ref/boss_breath.webp', 'La ville brûle. Et personne ne bouge.'],
    ['Les deux béliers', 'bg/terrasse.jpg', ['chars/belier_blanc/stand.webp', 'chars/belier_noir/stand.webp'], 'chars/ombre/stand.webp', 'Il y a quelqu\u2019un dans l\u2019ombre.'],
    ['Un été de trop', 'bg/chalet.jpg', ['chars/plage/hip.webp', 'chars/alex/beach.webp'], 'chars/mila/beach.webp', 'Que personne ne sache pour l\u2019été.'],
    ['Last call', 'covers/lastcall.jpg', [], 'covers/lastcall_ep3.jpg', 'La soirée dérape.'],
    ['Négociation', 'bg/galerie.webp', ['chars/suit/listen.webp', 'chars/isa_or/listen.webp'], 'props/enveloppe.webp', 'Une enveloppe. Sans nom.'],
  ];
  const S = [
    { c: '#ffd60a', h: () => `<small>Spark</small><h1>« Avant de commencer… »</h1><p>J'aimerais vous parler d'une merveilleuse rencontre que j'ai faite ce soir.</p>` },
    { c: '#ff9f0a', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}<div><h2>[X]</h2>${typed('x', '[X] est en cybersécurité et adore…')}</div></div>` },
    { c: '#ff9f0a', h: () => `<h1>Et c'est important parce qu'elle s'est offerte comme cobaye.</h1><p>Mais avant de vous parler de ça…</p>` },
    { c: '#bf5af2', h: () => `<small>J'y reviens plus tard</small><h1>17 000 histoires de 3 cases.</h1><p>Garfield : une par jour depuis le 19 juin 1978.</p>` },
    { c: '#bf5af2', h: () => `<h1>Toujours le même chat.</h1><p>Une poignée de poses. Et pourtant : entre 750 M$ et 1 G$ de produits dérivés par année.</p><small>Licensing International</small>` },
    { c: '#bf5af2', h: () => `<h1>Ce qui accroche, ce n'est pas l'image.</h1><p>C'est le personnage et l'histoire.</p>` },
    { c: '#bf5af2', h: () => `<div class="dkTwo"><div><small>Les compétiteurs</small><h2>La beauté visuelle</h2></div><div><small>Moi</small><h2>L'histoire et la personnalisation</h2></div></div><p>Chaque choix change la suite. Toi et tes amis êtes les personnages, ce soir.</p>` },
    { c: '#ff375f', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}<i class="dkArrow"></i>${slot('xc', 'Son perso')}</div>` },
    { c: '#ff375f', h: () => `<h2>Le catalogue d'histoires</h2><div class="dkCat">${CAT.map(([t, bg, cs, hv, tz, pick]) => `<div class="dkCard${pick ? ' pick' : ''}" style="background-image:url(${bg})">${cs.map((c) => `<img class="dkCh" src="${c}" alt="">`).join('')}<b>${esc(t)}</b><div class="dkHv" style="background-image:url(${hv})"><span>${esc(tz)}</span></div></div>`).join('')}</div>` },
    { c: '#ff375f', h: () => `<small>Démo · télé</small><h1>[X] décide de l'histoire.</h1><p>Le public croit regarder une histoire. Puis il découvre qu'un joueur a le contrôle.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé</small><h1>Pause.</h1><p>Son cell : le choix qu'il a devant lui.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé</small><h1>Un nouveau perso entre : [Y].</h1><p>Pour la salle, un perso comme les autres.</p>` },
    { c: '#ffd60a', h: () => `<h1>Il y avait quelqu'un d'autre.</h1><div class="dkRow">${slot('y', 'Selfie de [Y]')}<i class="dkArrow"></i>${slot('yc', 'Son perso')}</div><p>Il est dans la salle. Il joue depuis tout à l'heure.</p>` },
    { c: '#ff375f', full: true, h: () => `<img class="dkFull" src="ref/brainstorm_couch.webp" alt="Deux amis sur un divan, chacun son cell avec son perso, l'histoire sur la télé">` },
    { c: '#30d158', h: () => `<h1>L'histoire te suit.</h1><p>Même au bol : elle continue sur ton cell.</p>` },
    { c: '#30d158', wall: true, h: () => `<div class="dkWall">${WALL.map(([a, b]) => `<div><img src="${a}" alt=""><i class="dkArrow"></i><img class="dkAnim" src="${b[0]}" alt=""></div>`).join('')}</div>` },
  ];
  // what I say on each slide (mine to edit, kept on this device); behind the corner button
  const NOTES = [
    "« Avant de commencer, j'aimerais vous parler d'une merveilleuse rencontre que j'ai faite ce soir… » Une seule : [Y] n'existe pas encore pour la salle.",
    "[X], présenté en une phrase : « [X] est en cybersécurité et adore… » Slide : sa photo.",
    "« Et c'est important parce qu'elle s'est offerte comme cobaye. Mais avant de vous parler de ça… »",
    "« J'y reviens plus tard. » Le speech : bâtir l'attente, le contexte, expliquer le problème. Garfield, c'est environ 17 000 histoires de 3 cases, une par jour depuis le 19 juin 1978.",
    "Toujours le même chat, avec une poignée de poses. Et ça rapporte : entre 750 M$ et 1 G$ de produits dérivés par année (Licensing International). Le strip le plus syndiqué au monde : environ 2 600 journaux (Guinness).",
    "Ce qui accroche, ce n'est pas l'image. C'est le personnage et l'histoire.",
    "Les compétiteurs s'attaquent à la beauté visuelle. Je m'attaque à l'histoire (chaque choix change la suite, chaque épisode finit sur une question) et à la personnalisation (toi et tes amis êtes les personnages, ce soir).",
    "Son selfie, une flèche vers son perso.",
    "Le catalogue d'histoires : je clique sur une histoire de pirates immersive. Démo · télé.",
    "Après les premières répliques, je révèle que [X] décide de l'histoire. Pendant la démo, pas avant : le public croit regarder une histoire, puis découvre qu'un joueur a le contrôle.",
    "Je clique sur la télé : pause. L'écran s'assombrit, je clique sur son perso : on voit l'écran de son cell, le choix qu'il a devant lui.",
    "Un nouveau perso entre dans l'histoire : [Y]. Pour la salle, c'est un perso comme les autres. Il parle, il fait un choix : personne ne se doute qu'un humain le joue.",
    "Au 2e choix, pause : le plot twist. « Il y avait quelqu'un d'autre. » Le selfie de [Y], une flèche vers son perso : il est dans la salle et il joue depuis tout à l'heure.",
    "Deux amis sur un divan, chacun son cell avec son perso, l'histoire sur la télé.",
    "Un joueur peut même aller sur le bol et continuer à suivre l'histoire sur son cell. L'histoire ne l'attend pas dans la salle : elle le suit.",
    "Tous ces persos viennent d'une photo. Chacun joue ses poses.",
  ];
  let noteOpen = false;
  let spot = 0;
  function draw() {
    const s = S[i]; clearInterval(spot);
    root.style.setProperty('--c', s.c);
    const sl = root.querySelector('.dkSlide'); sl.classList.toggle('full', !!s.full); sl.innerHTML = T(s.h());
    if (s.wall) {   // every perso plays its poses, each at its own offset, round and round
      WALL.forEach(([, poses]) => poses.forEach((u) => { new Image().src = u; }));
      const imgs = [...root.querySelectorAll('.dkAnim')]; let t = 0;
      const tick = () => { if (!root.offsetParent) return clearInterval(spot); imgs.forEach((im, n) => { im.src = WALL[n][1][(t + n) % WALL[n][1].length]; }); t++; };
      spot = setInterval(tick, 650);
    }
    const nt = root.querySelector('.dkNote'); nt.textContent = saved['note_' + i] ?? T(NOTES[i] || ''); nt.hidden = !noteOpen;
    root.querySelector('.dkN').textContent = `${i + 1} / ${S.length}`;
    root.querySelector('.dkBar i').style.width = `${(i + 1) / S.length * 100}%`;
  }
  const go = (d) => { i = Math.max(0, Math.min(S.length - 1, i + d)); draw(); };
  const shrink = (file) => new Promise((ok, no) => {   // the photo shrunk to 900 px so it stays small enough to keep
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, 900 / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = img.width * r; c.height = img.height * r; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', .85));
    };
    img.onerror = () => no(new Error('Image illisible.'));
    img.src = url;
  });
  const pick = (file, k) => shrink(file).then((u) => { saved[k] = u; save(); draw(); });

  // ---- the control panel (before going on stage): for [X] and [Y], paste the photo, the name, copy the prompt of each sheet, paste each sheet.
  // The sheets go through the same importer as Nouveau perso (cut, add to the game); the prompts are Nouveau perso's, per person ----
  const KINDS = [['debout', 'Debout'], ['accoude', 'Accoudé'], ['assis', 'Assis'], ['prises', 'Prises']];
  const PEOPLE = [['x', '[X] · rencontré sur place', ['debout', 'accoude']], ['y', '[Y] · le complice', ['accoude']]];
  const kindsOf = (p) => saved['k_' + p] || PEOPLE.find((q) => q[0] === p)[2];
  const person = (p) => ({ name: saved['n_' + p] || '', she: !!saved['s_' + p], locked: saved['l_' + p] || '' });
  const copy = (text, btn) => {
    const ok = () => { const t = btn.textContent; btn.textContent = 'Copié ✓'; setTimeout(() => { btn.textContent = t; }, 1500); };
    navigator.clipboard.writeText(text).then(ok, () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); ok(); });
  };
  const copyPic = (src, btn) => {   // a picture into the clipboard as png (the promise stays inside the tap, for Safari)
    const png = fetch(src).then((r) => r.blob()).then((b) => createImageBitmap(b)).then((m) => new Promise((ok) => {
      const c = document.createElement('canvas'); c.width = m.width; c.height = m.height; c.getContext('2d').drawImage(m, 0, 0); c.toBlob(ok, 'image/png'); }));
    navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]).then(() => { const t = btn.textContent; btn.textContent = 'Copié ✓'; setTimeout(() => { btn.textContent = t; }, 1500); }, () => { btn.textContent = 'Enregistre-la plutôt'; });
  };
  const pslot = (key, label, src) => `<label class="pnSlot${src ? ' has' : ''}" tabindex="0" data-slot="${key}"${src ? ` style="background-image:url(${src})"` : ''}><span>${src ? '' : esc(label)}</span><input type="file" accept="image/*" data-file="${key}" hidden></label>`;
  let queue = Promise.resolve(), cur = null, pn = null;
  function drawPanel() {
    pn.innerHTML = '<p class="pnLead">Avant de monter sur scène. Survole une case et colle (Ctrl+V), ou touche-la pour choisir un fichier.</p><div class="pnCols">' + PEOPLE.map(([p, title]) => {
      const c = person(p), ks = kindsOf(p), ex = (id, label) => `<button type="button" class="pnBtn" data-pcopy="${p}:${id}">${label}</button>`;
      return `<section class="pnP" data-p="${p}"><h2>${esc(title)}</h2>
        <div class="pnRow">${pslot('photo:' + p, 'Photo', saved[p])}<div class="pnCol">
          <input class="pnName" data-name="${p}" maxlength="16" autocomplete="off" placeholder="Son nom" value="${esc(c.name)}">
          <div class="pnChips">${[['', 'Il'], ['1', 'Elle']].map(([v, l]) => `<button type="button" data-she="${p}:${v}" class="${(c.she ? '1' : '') === v ? 'on' : ''}">${l}</button>`).join('')}</div>
          ${saved[p] ? `<button type="button" class="pnBtn" data-pimg="${p}">Copier la photo</button><a class="pnBtn" href="${saved[p]}" download="${esc(c.name || p)}.jpg">Enregistrer</a>` : ''}
        </div></div>
        <h3>Son image</h3><p>Photo + <a href="ref/style.webp" target="_blank" rel="noopener">l'image de style</a> dans ChatGPT, puis colle ce qu'il te donne.</p>
        <div class="pnRow">${pslot('img:' + p, 'Image du perso', saved[p + 'c'])}<div class="pnCol">${ex('photo', 'Copier le prompt')}
          <textarea class="pnLock" data-lock="${p}" rows="3" placeholder="Ce qu'il faut garder (facultatif) : ex. cheveux roux bouclés, veste de cuir">${esc(c.locked)}</textarea>${ex('help', 'Copier le prompt du « à garder »')}</div></div>
        ${ks.map((k, i) => `<h3>Feuille ${p === 'x' ? i + 1 : 3}${p === 'x' ? ' · ' : ' · '}<select data-kind="${p}:${i}">${KINDS.map(([id, l]) => `<option value="${id}"${id === k ? ' selected' : ''}>${l}</option>`).join('')}</select></h3>
          <div class="pnRow">${pslot(`sheet:${p}:${i}`, 'Coller la feuille', null)}<div class="pnCol">${ex(k, 'Copier le prompt')}<p class="pnSt" data-st="${p}:${i}">${saved[`d_${p}${i}`] ? '✓ Dans le jeu' : ''}</p></div></div>`).join('')}
      </section>`; }).join('') + '</div>';
  }
  function panelHandle(key, file) {
    const [kind, p, i] = key.split(':');
    if (kind === 'photo') return shrink(file).then((u) => { saved[p] = u; save(); drawPanel(); });
    if (kind === 'img') return shrink(file).then((u) => { saved[p + 'c'] = u; save(); drawPanel(); });
    const st = pn.querySelector(`[data-st="${p}:${i}"]`), name = saved['n_' + p];
    if (!name) { st.textContent = 'Donne-lui un nom d\u2019abord.'; return; }
    queue = queue.then(async () => {   // one at a time: the importer holds one sheet
      try {
        st.textContent = 'Découpe…'; await IMPORT.cut(file, kindsOf(p)[i], name, (t) => { st.textContent = t; });
        st.textContent = 'Ajout au jeu…'; const msg = await IMPORT.add(); saved[`d_${p}${i}`] = 1; save(); st.textContent = '✓ ' + msg;
      } catch (e) { st.textContent = 'Pas ajoutée : ' + (e.message || e); }
    });
  }
  const panel = {
    mount(el) {
      pn = el; drawPanel();
      el.onclick = (e) => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.pcopy) { const [p, id] = b.dataset.pcopy.split(':'); copy(BANK.newCharPromptFor(id, person(p)), b); }
        else if (b.dataset.pimg) copyPic(saved[b.dataset.pimg], b);
        else if (b.dataset.she) { const [p, v] = b.dataset.she.split(':'); saved['s_' + p] = !!v; save(); drawPanel(); }
      };
      el.onchange = (e) => {
        const f = e.target.dataset.file, k = e.target.dataset.kind;
        if (f && e.target.files[0]) panelHandle(f, e.target.files[0]);
        if (k) { const [p, i] = k.split(':'), ks = [...kindsOf(p)]; ks[i] = e.target.value; saved['k_' + p] = ks; delete saved[`d_${p}${i}`]; save(); drawPanel(); }
      };
      el.oninput = (e) => {
        const n = e.target.dataset.name, l = e.target.dataset.lock;
        if (n) saved['n_' + n] = e.target.value.trim(); if (l) saved['l_' + l] = e.target.value; save();
      };
      el.onpointerover = (e) => { cur = e.target.closest('.pnSlot'); };
      el.onfocusin = (e) => { cur = e.target.closest('.pnSlot') || cur; };
    },
    paste(e) {   // Ctrl+V on the panel: the picture goes to the case under the pointer (or the last one touched)
      const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith('image/'));
      if (!f || !cur || !cur.isConnected) return false; panelHandle(cur.dataset.slot, f); return true;
    },
  };
  return {
    mount(el) {
      root = el; i = 0;
      el.innerHTML = '<div class="dkSlide"></div><div class="dkBar"><i></i></div><span class="dkN"></span><div class="dkNote" contenteditable="true" spellcheck="false" hidden></div><button type="button" class="dkNoteBtn" aria-label="Mes notes">✎</button>';
      el.onclick = (e) => {
        if (e.target.closest('.dkNoteBtn')) { noteOpen = !noteOpen; root.querySelector('.dkNote').hidden = !noteOpen; return; }
        const p = e.target.closest('.dkPic');
        if (p || e.target.closest('.dkTyped, .dkNote')) return;
        const r = el.getBoundingClientRect(); go(e.clientX - r.left < r.width / 3 ? -1 : 1);
      };
      el.onchange = (e) => { const p = e.target.closest('.dkPic'); if (p && e.target.files[0]) pick(e.target.files[0], p.dataset.k); };
      el.oninput = (e) => { const nt = e.target.closest('.dkNote'); if (nt) { saved['note_' + i] = nt.textContent; save(); return; } const t = e.target.closest('.dkTyped'); if (t) { saved['t_' + t.dataset.t] = t.textContent; save(); } };
      draw();
    },
    panel,
    key(e) {
      if (e.target.closest && e.target.closest('[contenteditable]')) return false;   // typing in a note or a line
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) go(1); else if (['ArrowLeft', 'PageUp'].includes(e.key)) go(-1); else return false; return true; },
  };
})();
