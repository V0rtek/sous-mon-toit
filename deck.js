// Infos › Spark › Le deck (31/10): the pitch deck for the Spark stage, full width. One slide per beat of "Sur scène · le pitch"
// (the plan is in #spark). Tap right = next, left = back, arrows too. A photo slot (the selfies of [X] and [Y], their characters)
// takes a picture from the phone and keeps it on this device; the line under [X] is typed in place.
window.DECK = (() => {
  const KEY = 'smt-deck', load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  let saved = load(), i = -1, root;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* full or private window */ } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slot = (k, label, src = k) => `<label class="dkPic${k.endsWith('c') ? ' ct' : ''}" data-k="${k}"${saved[src] ? ` style="background-image:url(${saved[src]})"` : ''}><span>${saved[src] ? '' : esc(label)}</span><input type="file" accept="image/*" hidden></label>`;
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
  // Last call's toilets, redrawn to fill a card: the tiles, two urinals and their divider, Brooke and the suit, the bubble of the game
  const WC = '<i class="wcU a"></i><i class="wcU b"></i><i class="wcU c"></i><i class="wcDiv"></i><img class="wcB" src="chars/brooke/pee_look.webp" alt=""><img class="wcS" src="chars/suit/pee.webp" alt=""><div class="wcBubble"><b>BROOKE</b><p>Nice suit.</p></div>';
  const CAT = [   // title, decor, characters on the card, what shows on hover (a background, what stands on it, its kind), its line, picked
    ['Le serment du pirate', 'bg/taverne.webp', ['chars/pirate/bar_smile.webp'], ['props/wanted.webp', []], '« Je gardais ta place depuis trois ans. »', 1],
    ['Quest of power', 'ref/boss_breath.webp', [], ['', ['chars/ombre/stand.webp'], 'zoom'], 'Il y avait quelqu\u2019un dans l\u2019ombre.'],
    ['Un été de trop', 'bg/chalet.jpg', ['chars/plage/hip.webp', 'chars/alex/beach.webp'], ['', ['chars/mila/beach.webp'], 'shadow'], 'Que personne ne sache pour l\u2019été.'],
    ['Last call', '', ['chars/brooke/texting.webp'], ['', [], 'wc'], ''],
  ];
  const S = [
    { c: '#ffd60a', h: () => `<small>Spark</small><h1>« Avant de commencer… »</h1><p>J'aimerais vous parler d'une merveilleuse rencontre que j'ai faite ce soir.</p>` },
    { c: '#ff9f0a', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}</div>` },
    { c: '#ff9f0a', h: () => '' },
    { c: '#ff375f', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}<i class="dkArrow"></i>${slot('xc', 'Son perso', sub && saved.xc2 ? 'xc2' : 'xc')}</div>`, steps: () => (saved.xc2 ? 2 : 1) },
    { c: '#ff375f', h: () => `<h2>Le catalogue d'histoires</h2><div class="dkCat">${CAT.map(([t, bg, cs, [hb, hs, hk], tz, pick]) => `<div class="dkCard${pick ? ' pick' : ''}" style="${bg ? `background-image:url(${bg})` : ''}">${cs.map((c) => `<img class="dkCh" src="${c}" alt="">`).join('')}<b>${esc(t)}</b><div class="dkHv ${hk || ''}"${hb ? ` style="background-image:url(${hb})"` : ''}>${hk === 'wc' ? WC : ''}${hs.map((u) => `<img src="${u}" alt="">`).join('')}<span>${esc(tz)}</span></div></div>`).join('')}</div>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 1</small><h1>L'histoire commence.</h1><p>Les impressionner, les accrocher dès le début.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 2</small><h1>Le suspense monte.</h1><p>Un choix approche. La salle a hâte de le savoir.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 3</small><h1>Lily a le pouvoir sur l'histoire.</h1><p>Plot twist. Le choix lui est donné, tout simplement. Pause pour expliquer.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 4</small><h1>Les enjeux montent.</h1><p>Mini-climax : la salle a hâte de voir les conséquences. Un nouveau perso entre : [Y].</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 5</small><h1>Plot twist : c'est du multijoueur.</h1><p>Un choix qui compte, fait par quelqu'un d'autre dans la salle.</p>` },
    { c: '#ffd60a', h: () => `<h1>Il y avait quelqu'un d'autre.</h1><div class="dkRow">${slot('y', 'Selfie de [Y]')}<i class="dkArrow"></i>${slot('yc', 'Son perso')}</div><p>Il est dans la salle. Il joue depuis tout à l'heure.</p>` },
    { c: '#ff375f', full: true, h: () => `<img class="dkFull" src="ref/brainstorm_couch.webp" alt="Deux amis sur un divan, chacun son cell avec son perso, l'histoire sur la télé">` },
    { c: '#30d158', full: true, h: () => `<img class="dkFull" src="ref/suit_tele.webp" alt="Deux amis devant la télé, l\u2019histoire de pirates à l\u2019écran">` },
    { c: '#30d158', full: true, h: () => `<img class="dkFull" src="ref/suit_cells.webp" alt="Chacun sur son cell, l\u2019un aux toilettes, l\u2019autre sur le divan">` },
    { c: '#30d158', full: true, h: () => `<img class="dkFull" src="ref/suit_cell.webp" alt="Elle suit l\u2019histoire sur son cell">` },
    { c: '#30d158', wall: true, h: () => `<div class="dkWall">${WALL.map(([a, b]) => `<div><img src="${a}" alt=""><i class="dkArrow"></i><img class="dkAnim" src="${b[0]}" alt=""></div>`).join('')}</div>` },
    { c: '#ff375f', h: () => `<h1>« Ok mais Justin, n'importe qui peut recréer ça en 1 semaine de nos jours. »</h1><p>Étrangement, non.</p>` },
    { c: '#ffd60a', h: () => `<div class="dkZero">0 $</div>` },
    { c: '#30d158', h: () => `<small>Je cherche</small><ul class="dkAsk"><li>Un cofounder</li><li>Du feedback</li><li>Du financement</li><li>Du mentorat</li></ul>` },
  ];
  // what I say on each slide (mine to edit, kept on this device); behind the corner button
  const NOTES = [
    "« Avant de commencer, j'aimerais vous parler d'une merveilleuse rencontre que j'ai faite ce soir… » Une seule : [Y] n'existe pas encore pour la salle.",
    "[X], présenté en une phrase : « [X] est en cybersécurité et adore… » Slide : sa photo.",
    "Slide vide.",
    "Son selfie, une flèche vers son perso.",
    "Le catalogue d'histoires : je clique sur une histoire de pirates immersive. Démo · télé.",
    "1. J'introduis l'histoire, je les impressionne et je les accroche dès le début.",
    "2. On monte le suspense vers un choix : les gens ont hâte de le savoir.",
    "3. Plot twist : Lily a du pouvoir sur l'histoire, un pouvoir cool que les gens aimeraient avoir. Je montre simplement comment le choix est donné. Pause pour expliquer un peu.",
    "4. Les enjeux montent : les gens ont hâte de voir les conséquences du choix (mini-climax). Et un nouveau perso arrive : [Y], annoncé plus tôt (« J'y reviens plus tard »).",
    "5. Plot twist : c'est en fait du multijoueur, et le choix qui compte a été fait par une autre personne dans la salle.",
    "Au 2e choix, pause : le plot twist. « Il y avait quelqu'un d'autre. » Le selfie de [Y], une flèche vers son perso : il est dans la salle et il joue depuis tout à l'heure.",
    "Deux amis sur un divan, chacun son cell avec son perso, l'histoire sur la télé.",
    "Devant la télé, ensemble.",
    "Chacun sur son cell, même aux toilettes : l'histoire le suit.",
    "Elle continue sur son cell.",
    "Tous ces persos viennent d'une photo. Chacun joue ses poses.",
    "« Ok mais Justin, n'importe qui peut recréer ça en 1 semaine. » Étrangement, non : je montre le concept de monde, d'histoires et mon système d'histoire.",
    "",
    "Je me cherche un cofounder, du feedback, du financement, du mentorat.",
  ];
  let noteOpen = false;
  let spot = 0, sub = 0;   // sub: the step inside a slide (the perso's 2nd pose on the slide where we first see it)
  function draw() {
    clearInterval(spot); root.classList.toggle('prep', i < 0);
    if (i < 0) { root.style.setProperty('--c', '#ff9f0a'); root.querySelector('.dkN').textContent = `0 / ${S.length}`; return; }
    const s = S[i];
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
  const stepsOf = (k) => (k >= 0 && S[k].steps ? S[k].steps() : 1);
  const go = (d) => {
    if (i >= 0 && d > 0 && sub < stepsOf(i) - 1) { sub++; return draw(); }   // next = the next step of this slide
    if (i >= 0 && d < 0 && sub > 0) { sub--; return draw(); }
    i = Math.max(-1, Math.min(S.length - 1, i + d)); sub = d < 0 ? stepsOf(i) - 1 : 0; draw();
  };
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
  const small = (src) => new Promise((ok) => {   // a pose, shrunk to 520 px tall (transparent png) to keep
    const img = new Image();
    img.onload = () => { const r = Math.min(1, 520 / img.height), c = document.createElement('canvas'); c.width = img.width * r; c.height = img.height * r; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); ok(c.toDataURL('image/png')); };
    img.src = src;
  });
  const pick = (file, k) => shrink(file).then((u) => { saved[k] = u; save(); draw(); });

  // ---- slide 0 (before going on stage): the plan, 5 files to drop (the 2 photos, the 3 sheets) and the 3 prompts to copy. Nothing else.
  // The sheets go through the same importer as Nouveau perso (cut, add to the game); the prompts are Nouveau perso's ----
  const SHEETS = [['x', 0, 'debout'], ['x', 1, 'accoude'], ['y', 0, 'accoude']];   // [X] has 2 sheets, [Y] 1
  const person = (p) => ({ name: saved['n_' + p] || '', she: saved['s_' + p] ?? (p === 'x'), locked: saved['l_' + p] || '' });
  const copy = (text, btn) => {
    const ok = () => { const t = btn.textContent; btn.textContent = 'Copié ✓'; setTimeout(() => { btn.textContent = t; }, 1500); };
    navigator.clipboard.writeText(text).then(ok, () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); ok(); });
  };
  const FILE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>';
  const icon = (key, n, label, src, st) => `<label class="pnIcon${src ? ' has' : ''}" tabindex="0" data-slot="${key}"><i${src ? ` style="background-image:url(${src})"` : ''}>${src ? '' : FILE}<b>${n}</b></i><span>${esc(label)}</span><em data-st="${key}">${esc(st || '')}</em><input type="file" accept="image/*" data-file="${key}" hidden></label>`;
  let queue = Promise.resolve(), cur = null, pn = null;
  function drawPanel() {
    pn.innerHTML = '<div class="pnBar"><div class="pnIcons">'
      + icon('photo:x', 1, 'Photo X', saved.x) + icon('photo:y', 2, 'Photo Y', saved.y)
      + SHEETS.map(([p, i], k) => icon(`sheet:${p}:${i}`, k + 3, `Feuille ${k + 1}`, null, saved[`d_${p}${i}`] ? '✓ dans le jeu' : '')).join('')
      + '</div><div class="pnPrompts">' + SHEETS.map(([p, i, kind], k) => `<button type="button" class="pnBtn" data-pcopy="${p}:${kind}">Prompt feuille ${k + 1}</button>`).join('') + '</div></div>';
  }
  function panelHandle(key, file) {
    const [kind, p, i] = key.split(':');
    if (kind === 'photo') return shrink(file).then((u) => { saved[p] = u; save(); drawPanel(); });
    const st = pn.querySelector(`[data-st="${key}"]`), name = saved['n_' + p] || `Spark ${p.toUpperCase()}`;
    const say = (t) => { st.textContent = t; };
    say('En attente…');
    queue = queue.then(async () => {   // one at a time: the importer holds one sheet
      try {
        say('Découpe…'); const cells = await IMPORT.cut(file, SHEETS.find(([q, j]) => q === p && j === +i)[2], name, say);
        if (+i === 0 && cells[0]) { saved[p + 'c'] = await small(cells[0].src); if (cells[1]) saved[p + 'c2'] = await small(cells[1].src); save(); }
        say('Ajout au jeu…'); const msg = await IMPORT.add(); saved[`d_${p}${i}`] = 1; save(); say(msg.startsWith('Jouable') ? '✓ sur cet appareil' : '✓ dans le jeu');
      } catch (e) { say('Pas ajoutée : ' + (e.message || e)); }
    });
  }
  const panel = {
    mount(el) {
      pn = el; cur = null; drawPanel();
      el.onclick = (e) => { const b = e.target.closest('button[data-pcopy]'); if (b) { const [p, kind] = b.dataset.pcopy.split(':'); copy(BANK.newCharPromptFor(kind, person(p)), b); } };
      el.onchange = (e) => { const f = e.target.dataset.file; if (f && e.target.files[0]) panelHandle(f, e.target.files[0]); };
      el.onpointerover = (e) => { cur = e.target.closest('.pnIcon'); };
      el.onfocusin = (e) => { cur = e.target.closest('.pnIcon') || cur; };
    },
    paste(e) {   // Ctrl+V on slide 0: the picture goes to the file under the pointer (or the last one touched)
      const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith('image/'));
      if (!f || !cur || !cur.isConnected || i >= 0) return false; panelHandle(cur.dataset.slot, f); return true;
    },
  };
  return {
    mount(el) {
      root = el; i = -1; sub = 0;
      el.innerHTML = '<div class="dkPrep"><div class="pnHost"></div><div class="dkPlan"></div></div><div class="dkSlide"></div><div class="dkBar"><i></i></div><span class="dkN"></span><div class="dkNote" contenteditable="true" spellcheck="false" hidden></div><button type="button" class="dkNoteBtn" aria-label="Mes notes">✎</button>';
      el.onclick = (e) => {
        if (i < 0) { if (!e.target.closest('.pnIcon, .pnBtn')) go(1); return; }   // slide 0: the files and prompts, anywhere else = next
        if (e.target.closest('.dkNoteBtn')) { noteOpen = !noteOpen; root.querySelector('.dkNote').hidden = !noteOpen; return; }
        const p = e.target.closest('.dkPic');
        if (p || e.target.closest('.dkTyped, .dkNote')) return;
        const r = el.getBoundingClientRect(); go(e.clientX - r.left < r.width / 3 ? -1 : 1);
      };
      el.onchange = (e) => { const p = e.target.closest('.dkPic'); if (p && e.target.files[0]) pick(e.target.files[0], p.dataset.k); };
      el.oninput = (e) => { const nt = e.target.closest('.dkNote'); if (nt) { saved['note_' + i] = nt.textContent; save(); return; } const t = e.target.closest('.dkTyped'); if (t && t.dataset.name) { saved['n_' + t.dataset.name] = t.textContent.trim(); save(); return; } if (t) { saved['t_' + t.dataset.t] = t.textContent; save(); } };
      el.querySelector('.dkPlan').appendChild(document.getElementById('sparkPlan').content.cloneNode(true));
      panel.mount(el.querySelector('.pnHost'));
      draw();
    },
    panel,
    key(e) {
      if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return false;   // typing in a note, a line or a field
      if (i < 0 && e.key === ' ') return true;   // slide 0 is a page to scroll
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) go(1); else if (['ArrowLeft', 'PageUp'].includes(e.key)) go(-1); else return false; return true; },
  };
})();
