// Infos › Spark › Le deck (31/10): the pitch deck for the Spark stage, full width. One slide per beat of "Sur scène · le pitch"
// (the plan is in #spark). Tap right = next, left = back, arrows too. A photo slot (the selfies of [X] and [Y], their characters)
// takes a picture from the phone and keeps it on this device; the line under [X] is typed in place.
window.DECK = (() => {
  const KEY = 'smt-deck', load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  let saved = load(), i = 0, root;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* full or private window */ } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slot = (k, label) => `<label class="dkPic" data-k="${k}"${saved[k] ? ` style="background-image:url(${saved[k]})"` : ''}><span>${saved[k] ? '' : esc(label)}</span><input type="file" accept="image/*" hidden></label>`;
  const typed = (k, def) => `<p class="dkTyped" contenteditable="true" spellcheck="false" data-t="${k}">${esc(saved['t_' + k] ?? def)}</p>`;
  const S = [
    { c: '#ffd60a', h: () => `<small>Spark</small><h1>« Avant de commencer… »</h1><p>J'aimerais vous parler d'une merveilleuse rencontre que j'ai faite ce soir.</p>` },
    { c: '#ff9f0a', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}<div><h2>[X]</h2>${typed('x', '[X] est en cybersécurité et adore…')}</div></div>` },
    { c: '#ff9f0a', h: () => `<h1>Avant ce soir, je ne le connaissais pas.</h1><p>Et c'est important.</p>` },
    { c: '#bf5af2', h: () => `<small>J'y reviens plus tard</small><h1>17 000 histoires de 3 cases.</h1><p>Garfield : une par jour depuis le 19 juin 1978.</p>` },
    { c: '#bf5af2', h: () => `<h1>Toujours le même chat.</h1><p>Une poignée de poses. Et pourtant : entre 750 M$ et 1 G$ de produits dérivés par année.</p><small>Licensing International</small>` },
    { c: '#bf5af2', h: () => `<h1>Ce qui accroche, ce n'est pas l'image.</h1><p>C'est le personnage et l'histoire.</p>` },
    { c: '#bf5af2', h: () => `<div class="dkTwo"><div><small>Les compétiteurs</small><h2>La beauté visuelle</h2></div><div><small>Moi</small><h2>L'histoire et la personnalisation</h2></div></div><p>Chaque choix change la suite. Toi et tes amis êtes les personnages, ce soir.</p>` },
    { c: '#ff375f', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}<i class="dkArrow"></i>${slot('xc', 'Son perso')}</div>` },
    { c: '#ff375f', h: () => `<small>Démo · télé</small><h1>Une histoire de pirates, immersive.</h1><p>Le catalogue d'histoires. Je clique.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé</small><h1>[X] décide de l'histoire.</h1><p>Le public croit regarder une histoire. Puis il découvre qu'un joueur a le contrôle.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé</small><h1>Pause.</h1><p>Son cell : le choix qu'il a devant lui.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé</small><h1>Un nouveau perso entre : [Y].</h1><p>Pour la salle, un perso comme les autres.</p>` },
    { c: '#ffd60a', h: () => `<h1>Il y avait quelqu'un d'autre.</h1><div class="dkRow">${slot('y', 'Selfie de [Y]')}<i class="dkArrow"></i>${slot('yc', 'Son perso')}</div><p>Il est dans la salle. Il joue depuis tout à l'heure.</p>` },
    { c: '#30d158', h: () => `<h1>L'histoire te suit.</h1><p>Même au bol : elle continue sur ton cell.</p>` },
  ];
  function draw() {
    const s = S[i];
    root.style.setProperty('--c', s.c);
    root.querySelector('.dkSlide').innerHTML = s.h();
    root.querySelector('.dkN').textContent = `${i + 1} / ${S.length}`;
    root.querySelector('.dkBar i').style.width = `${(i + 1) / S.length * 100}%`;
  }
  const go = (d) => { i = Math.max(0, Math.min(S.length - 1, i + d)); draw(); };
  function pick(file, k) {   // the photo shrunk to 900 px so it stays small enough to keep
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, 900 / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = img.width * r; c.height = img.height * r; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); saved[k] = c.toDataURL('image/jpeg', .85); save(); draw();
    };
    img.src = url;
  }
  return {
    mount(el) {
      root = el; i = 0;
      el.innerHTML = '<div class="dkSlide"></div><div class="dkBar"><i></i></div><span class="dkN"></span>';
      el.onclick = (e) => {
        const p = e.target.closest('.dkPic');
        if (p || e.target.closest('.dkTyped')) return;
        const r = el.getBoundingClientRect(); go(e.clientX - r.left < r.width / 3 ? -1 : 1);
      };
      el.onchange = (e) => { const p = e.target.closest('.dkPic'); if (p && e.target.files[0]) pick(e.target.files[0], p.dataset.k); };
      el.oninput = (e) => { const t = e.target.closest('.dkTyped'); if (t) { saved['t_' + t.dataset.t] = t.textContent; save(); } };
      draw();
    },
    key(e) { if (['ArrowRight', 'PageDown', ' '].includes(e.key)) go(1); else if (['ArrowLeft', 'PageUp'].includes(e.key)) go(-1); else return false; return true; },
  };
})();
