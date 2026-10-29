// ---- Infos · Plan de scène: a story planned BEFORE its dialogue (no lines in it: what happens, not what's said), edited
// by hand, on a 2D canvas: time goes down, what happens at the same time sits side by side, later is to the right.
// Boxes (a scene, the other phone, later) hold rectangles stacked in order, each as tall as its lines. A box has a column
// and can start under another box. A rectangle has its goals (colour tabs on its left: one rectangle can serve two goals
// at once), its technique, what happens, the infos it reveals; a choice also has its options (attitudes, not lines).
// Orange = a link: a setup to what it sets off (a "raise stakes" to its choice, a callback, a choice or an event later).
// On top, the turn and the infos to expose: each one says where it comes out, or that it hasn't yet. Kept on this phone ----
window.PLAN = (() => {
  const GOALS = [
    { id: 'char', name: 'Create char engagingness', c: '#0a84ff', tech: ['Show contrast'] },
    { id: 'rel', name: 'Create relationship engagingness', c: '#64d2ff', tech: ['Show contrast'] },
    { id: 'desire', name: 'Show desire / goal', c: '#ff375f', tech: ['Phrase pas finie'] },
    { id: 'stakes', name: 'Raise stakes', c: '#ffd60a', tech: [] },
    { id: 'info', name: 'Reveal info', c: '#bf5af2', tech: ['Info en morceaux'] },
    { id: 'callback', name: 'Callback', c: '#30d158', tech: [] },
  ];
  const G = Object.fromEntries(GOALS.map((g) => [g.id, g]));

  // the example: Last call, episode 1, reverse-engineered from bar.js (what happens, never the lines)
  const LC = () => ({
    v: 2,
    title: 'Last Call · épisode 1',
    turn: 'Un inconnu offre 5000 $ cash à Brooke pour une soirée louche, et lui demande d’amener Cam.',
    infos: [
      { id: 'i1', text: 'Brooke est cassé' }, { id: 'i2', text: 'Justin paie son loyer, et c’est fini' }, { id: 'i3', text: 'Brooke veut Cam' },
      { id: 'i4', text: 'Un homme en complet cherche Brooke' }, { id: 'i5', text: 'Il sait ce que Cam boit' }, { id: 'i6', text: 'L’offre : 5000 $, une nuit' },
      { id: 'i7', text: 'La règle : pas de vin rouge' }, { id: 'i8', text: 'Il veut Cam aussi' }, { id: 'i9', text: 'Qui est l’inconnu' },
    ],
    boxes: [
      { id: 'bar', title: 'Le bar · 1 h 40', col: 0, beats: [
        { id: 'b1', goals: ['char', 'rel'], tech: 'Show contrast', lines: 4, what: 'Justin et Brooke ouvrent avec la même phrase et finissent à l’opposé : l’un se sent vieux, l’autre vit sa meilleure vie.' },
        { id: 'b2', goals: ['info', 'char'], tech: 'Le perso qui voit à travers', lines: 2, what: 'Cam rappelle à Brooke son entrevue de demain ; il avoue qu’il est cassé, et en rit.', reveals: ['i1'] },
        { id: 'b3', kind: 'choice', goals: ['rel'], tech: 'Options = façons d’être ami', lines: 3, what: 'Comment Justin réagit à Brooke.', opts: ['Inquiet', 'Taquin', 'Complice'] },
        { id: 'b4', goals: ['stakes'], tech: 'Le rire meurt, phrase sérieuse', lines: 1, what: 'Un silence, puis Justin met la limite : le loyer est dû lundi, il ne le couvre plus.', reveals: ['i2'] },
        { id: 'b5', kind: 'choice', goals: ['char'], tech: 'Options = attitudes', lines: 2, what: 'Comment Brooke vit son problème d’argent.', opts: ['Déni : ça va s’arranger (trace)', 'Sacrifice : vendre sa guitare', 'Quémander'] },
        { id: 'b6', goals: ['desire'], tech: 'Phrase pas finie', lines: 4, what: 'Seul avec Cam, Brooke commence à lui dire ce qu’il ressent, ne finit pas, et part aux toilettes.', reveals: ['i3'] },
      ] },
      { id: 'counter', title: 'Le comptoir · Justin + Cam', col: 0, after: 'bar', beats: [
        { id: 'c1', kind: 'choice', goals: ['desire'], tech: 'Ne pas décider le désir trop tôt', lines: 4, what: 'Cam se demande ce que Brooke allait dire ; elle ne choisit personne.', opts: ['Parler de Brooke', 'La connaître', 'Lui demander ce qu’elle ressent', 'Flirter'] },
        { id: 'c2', kind: 'choice', goals: ['stakes', 'rel'], tech: 'Un tiers pose la question qu’on évite', lines: 3, what: 'Cam demande à Justin pourquoi il paie le loyer de Brooke.', opts: ['Loyal', 'Fatigué', 'Fini'] },
        { id: 'c3', goals: ['info'], tech: 'Info en morceaux', lines: 6, what: 'Un homme en complet est venu deux fois au travail de Cam et a demandé si elle connaissait Brooke.', reveals: ['i4'] },
        { id: 'c4', goals: ['info', 'callback'], tech: 'Objet planté', lines: 5, what: 'À sa 2e visite, il a demandé ce qu’elle boit : du rouge.', reveals: ['i5'] },
        { id: 'c5', kind: 'choice', goals: [], tech: 'Le choix de l’autre arrive par texto', lines: 4, what: 'Le texto de Brooke arrive (ou rien). Justin décide s’ils y vont.', opts: ['Y aller', 'Le laisser'] },
      ] },
      { id: 'wc', title: 'Les toilettes · Brooke + l’inconnu', col: 1, after: 'bar', beats: [
        { id: 's1', kind: 'choice', goals: ['info'], tech: 'Lieu banal, rencontre qui ne l’est pas', lines: 3, what: 'Aux urinoirs, Brooke parle en premier à l’homme en complet.', opts: ['Content', 'Méfiant', 'Rien'] },
        { id: 's2', goals: ['info', 'callback'], tech: 'Info en morceaux', lines: 4, what: 'L’offre arrive morceau par morceau : un job, 5000 $, une nuit. Si Brooke a choisi le déni, il y repense.', reveals: ['i6'] },
        { id: 's3', goals: ['info'], tech: 'Règle sur un objet', lines: 8, what: 'Une fête, parler aux gens. Une seule règle : ne pas boire de vin rouge, sans dire pourquoi.', reveals: ['i7'] },
        { id: 's4', kind: 'choice', goals: ['stakes', 'callback'], tech: 'Écho', lines: 5, what: 'L’inconnu sait tout et redit les mots de Justin sur le loyer. Pourquoi Brooke dit oui.', opts: ['Fierté : rembourser Justin', 'Demander pourquoi lui', 'Dire oui'] },
        { id: 's5', goals: ['stakes', 'desire'], tech: 'La menace vise le désir', lines: 4, what: 'Il veut que Brooke amène ses amis : Justin, et Cam.', reveals: ['i8'] },
        { id: 's6', kind: 'choice', goals: [], tech: 'Mon choix devient le problème de l’autre', lines: 2, what: 'Brooke décide quoi texter à Justin.', opts: ['L’attirer avec une fête', 'Une demi-vérité', 'Ne rien envoyer'] },
      ] },
      { id: 'later', title: 'Plus tard', col: 2, beats: [
        { id: 'f1', goals: ['stakes'], tech: '', lines: 1, what: 'Épisode 2 : quelqu’un tend un verre de rouge à Cam.' },
        { id: 'f2', kind: 'choice', goals: [], tech: '', lines: 1, what: 'Épisode 3 : à la porte rouge, Brooke avoue ou ment sur pourquoi il a dit oui.', opts: ['Avouer', 'Mentir'] },
      ] },
    ],
    links: [
      { from: 'b4', to: 'b5', label: 'L’enjeu du choix' },
      { from: 'b2', to: 's2', label: 'Cassé → l’argent arrive au pire moment' },
      { from: 'b5', to: 's2', label: 'Devise retournée : le déni revient' },
      { from: 'b4', to: 's4', label: 'Écho : les mots de Justin, chez l’ennemi' },
      { from: 'b4', to: 'c2', label: 'Le loyer revient par Cam' },
      { from: 'b6', to: 'c1', label: 'La phrase pas finie → Cam se la demande' },
      { from: 'b6', to: 's5', label: 'La menace vise Cam' },
      { from: 'c3', to: 's1', label: 'Le comptoir connaît le complet avant Brooke' },
      { from: 'c4', to: 's3', label: 'Objet planté : le rouge → la règle' },
      { from: 's3', to: 'f1', label: 'Le vin rouge' },
      { from: 's4', to: 'f2', label: 'Pourquoi il a dit oui' },
      { from: 's6', to: 'c5', label: 'Le texto arrive chez Justin' },
    ],
  });
  const EMPTY = () => ({ v: 2, title: 'Nouveau plan', turn: '', infos: [], links: [],
    boxes: [{ id: 'x1', title: 'Scène 1', col: 0, beats: [] }, { id: 'x2', title: 'Plus tard', col: 1, beats: [] }] });

  const KEY = 'smt-plan';
  // an older plan: the example comes back as it is now; a plan of your own gets a column per box
  const fix = (p) => {
    if (!p || !Array.isArray(p.boxes)) return LC();
    if (!p.v && p.title === 'Last Call · épisode 1') return LC();
    p.boxes.forEach((b, i) => { if (!b.id) b.id = 'x' + i; if (b.col == null) b.col = i; });
    return { title: '', turn: '', infos: [], links: [], ...p, v: 2 };
  };
  let P = (() => { try { return fix(JSON.parse(localStorage.getItem(KEY))); } catch { return LC(); } })();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch { /* private window */ } };
  let el = null, focusId = null, linking = null, editing = null, zoom = 1;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const NL = 3.3, W = 34, GAP = 9;   // em: a rectangle per line, a box's width, the space between columns (where links run)
  const all = () => P.boxes.flatMap((b) => b.beats);
  const find = (id) => all().find((b) => b.id === id);
  const where = (id) => { for (const box of P.boxes) { const i = box.beats.findIndex((b) => b.id === id); if (i >= 0) return { box, i }; } return null; };
  const num = (id) => all().findIndex((b) => b.id === id) + 1;
  const fresh = (p) => p + Math.random().toString(36).slice(2, 7);

  function rect(b) {
    const out = P.links.filter((l) => l.from === b.id), back = P.links.filter((l) => l.to === b.id);
    const tabs = (b.goals || []).map((g) => (G[g] ? `<i style="background:${G[g].c}"></i>` : '')).join('') || '<i></i>';
    const goals = (b.goals || []).filter((g) => G[g]).map((g) => `<span style="--c:${G[g].c}">${esc(G[g].name)}</span>`).join('');
    const ticks = Array.from({ length: b.lines || 1 }, () => '<i></i>').join('');
    const infos = (b.reveals || []).map((r) => P.infos.find((x) => x.id === r)).filter(Boolean);
    return `<div class="pBeat${b.kind === 'choice' ? ' ch' : ''}" data-b="${b.id}" style="min-height:${(b.lines || 1) * NL}em">`
      + `<div class="pTabs">${tabs}</div><div class="pTicks">${ticks}</div><div class="pIn">`
      + `<div class="pTop"><span class="pN">${num(b.id)}</span><b>${b.kind === 'choice' ? 'Choix' : esc(b.tech) || '…'}</b><em>${b.lines || 1} répl.</em></div>`
      + (b.kind === 'choice' && b.tech ? `<div class="pTech">${esc(b.tech)}</div>` : '')
      + (goals ? `<div class="pGoals">${goals}</div>` : '')
      + (b.what ? `<p>${esc(b.what)}</p>` : '')
      + (b.kind === 'choice' && b.opts && b.opts.length ? `<div class="pCh">${b.opts.map((o) => `<span>${esc(o)}</span>`).join('')}</div>` : '')
      + (infos.length ? `<div class="pInfo">${infos.map((x) => `<span>révèle : ${esc(x.text)}</span>`).join('')}</div>` : '')
      + back.map((l) => `<div class="pLoop in">↰ ${num(l.from)}${l.label ? ' · ' + esc(l.label) : ''}</div>`).join('')
      + out.map((l) => `<div class="pLoop">↳ ${num(l.to)}${l.label ? ' · ' + esc(l.label) : ''}</div>`).join('')
      + '</div></div>';
  }

  // the page: a fixed bar on top, then the canvas (scrolls both ways): the head (turn, infos, legend) top left, the boxes
  function render() {
    if (!el) return;
    const view = el.querySelector('.pView'), keep = view ? [view.scrollLeft, view.scrollTop] : [0, 0];
    const revealed = (id) => all().find((b) => (b.reveals || []).includes(id));
    el.innerHTML = `<div class="pHead"><b data-a="title">${esc(P.title)}</b><div class="pBar"><button type="button" data-a="out">−</button><button type="button" data-a="in">+</button>`
      + '<button type="button" data-a="addbox">+ Boîte</button><button type="button" data-a="example">Exemple</button><button type="button" data-a="new">Nouveau</button>'
      + '<button type="button" data-a="copy">Copier</button><button type="button" data-a="paste">Coller</button></div>'
      + (linking ? '<div class="pLinking">Touche le rectangle où ça mène <button type="button" data-a="cancel">Annuler</button></div>' : '') + '</div>'
      + `<div class="pView"><div class="pCanvas${focusId ? ' pFocus' : ''}" style="font-size:${zoom}em">`
      + `<div class="pHeadBox" data-box="head"><div class="pTurn" data-a="turn"><small>Le tournant · décidé en premier</small><p>${esc(P.turn) || '<span class="pDim">Touche pour l’écrire</span>'}</p></div>`
      + `<div class="pInfos"><small>Infos à exposer</small>${P.infos.map((x) => { const b = revealed(x.id);
        return `<div class="${b ? 'ok' : ''}" data-i="${x.id}"><span>${esc(x.text)}</span><em>${b ? 'au ' + num(b.id) : 'pas encore'}</em></div>`; }).join('')}`
      + '<button type="button" data-a="info">+ Info</button></div>'
      + `<div class="pLegend">${GOALS.map((g) => `<span style="--c:${g.c}">${esc(g.name)}</span>`).join('')}<span class="lk">lien</span></div></div>`
      + P.boxes.map((box, k) => `<section class="pBox" data-k="${k}" data-box="${box.id}"><h3 data-a="box">${esc(box.title)}</h3>${box.beats.map(rect).join('')}`
        + '<div class="pAdd"><button type="button" data-a="beat">+ Rectangle</button><button type="button" data-a="choice">+ Choix</button></div></section>').join('')
      + '<svg class="pSvg" aria-hidden="true"></svg></div></div>';
    place();
    const v = el.querySelector('.pView'); v.scrollLeft = keep[0]; v.scrollTop = keep[1];
  }

  // where each box goes: where it was dragged (x, y in em); else its column, its top under the box it starts after,
  // else under the head (column 0) or at the top
  function place() {
    const cv = el.querySelector('.pCanvas'), em = parseFloat(getComputedStyle(cv).fontSize), head = cv.querySelector('.pHeadBox');
    const x = (col) => (2 + col * (W + GAP)) * em, gap = 2 * em;
    head.style.left = x(0) + 'px'; head.style.top = '0px';
    const top = {}, bottom = {}, nodes = Object.fromEntries([...cv.querySelectorAll('.pBox')].map((n) => [n.dataset.box, n]));
    const at = (box, seen = new Set()) => {
      if (top[box.id] != null) return top[box.id];
      if (box.y != null) { top[box.id] = box.y * em; bottom[box.id] = top[box.id] + nodes[box.id].offsetHeight; return top[box.id]; }
      const after = P.boxes.find((b) => b.id === box.after && b !== box && !seen.has(b.id));
      const t = after ? (at(after, seen.add(box.id)), bottom[after.id] + gap) : box.col === 0 ? head.offsetHeight + gap : 0;
      top[box.id] = t; bottom[box.id] = t + nodes[box.id].offsetHeight; return t;
    };
    for (const box of P.boxes) { const n = nodes[box.id]; n.style.left = (box.x != null ? box.x * em : x(box.col || 0)) + 'px'; n.style.top = at(box) + 'px'; }
    size(cv, em);
  }
  // the canvas reaches past the farthest box (room to drag one further)
  function size(cv, em) {
    const boxes = [...cv.querySelectorAll('.pBox, .pHeadBox')];
    cv.style.width = (Math.max(...boxes.map((n) => n.offsetLeft + n.offsetWidth)) + (W + GAP) * em) + 'px';
    cv.style.height = (Math.max(...boxes.map((n) => n.offsetTop + n.offsetHeight)) + 20 * em) + 'px';
    draw(cv, em);
  }

  // a link: to the right = from the right edge to the left edge of the next column; to the left = the other way round;
  // in the same column = out and back on the right, each one in its own lane so two never overlap
  function draw(cv, em) {
    const svg = cv.querySelector('.pSvg'), c = cv.getBoundingClientRect();
    const box = (id) => { const e = cv.querySelector(`[data-b="${id}"]`); if (!e) return null; const r = e.getBoundingClientRect();
      return { l: r.left - c.left, r: r.right - c.left, y: r.top - c.top + Math.min(r.height / 2, 2.4 * em) }; };
    const segs = P.links.map((l) => ({ l, a: box(l.from), b: box(l.to) })).filter((s) => s.a && s.b);
    const same = segs.filter((s) => Math.abs(s.a.l - s.b.l) < 2).sort((p, q) => Math.abs(p.a.y - p.b.y) - Math.abs(q.a.y - q.b.y)), lanes = {};
    for (const s of same) { const lo = Math.min(s.a.y, s.b.y), hi = Math.max(s.a.y, s.b.y), L = (lanes[Math.round(s.a.r)] = lanes[Math.round(s.a.r)] || []);
      let k = 0; while ((L[k] || []).some(([p, q]) => !(hi < p - 6 || lo > q + 6))) k++; (L[k] = L[k] || []).push([lo, hi]); s.k = k; }
    svg.setAttribute('width', cv.offsetWidth); svg.setAttribute('height', cv.offsetHeight);
    svg.innerHTML = '<defs><marker id="pArr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z" fill="#ff9f0a"/></marker></defs>'
      + segs.map((s) => {
        const { a, b } = s, on = focusId && (s.l.from === focusId || s.l.to === focusId);
        let d, x0;
        if (s.k != null) { const x = a.r + (1 + s.k) * .9 * em; x0 = a.r; d = `M${a.r} ${a.y} C${x} ${a.y} ${x} ${b.y} ${b.r + 2} ${b.y}`; }
        else if (b.l > a.r) { const m = (b.l - a.r) / 2; x0 = a.r; d = `M${a.r} ${a.y} C${a.r + m} ${a.y} ${b.l - m} ${b.y} ${b.l - 2} ${b.y}`; }
        else { const m = (a.l - b.r) / 2; x0 = a.l; d = `M${a.l} ${a.y} C${a.l - m} ${a.y} ${b.r + m} ${b.y} ${b.r + 2} ${b.y}`; }
        return `<path class="${on ? 'on' : ''}" d="${d}" marker-end="url(#pArr)"/><circle cx="${x0}" cy="${a.y}" r="3.2"/>`;
      }).join('');
    if (focusId) for (const n of cv.querySelectorAll('.pBeat')) n.classList.toggle('on', n.dataset.b === focusId || P.links.some((l) => (l.from === focusId && l.to === n.dataset.b) || (l.to === focusId && l.from === n.dataset.b)));
  }

  // ---- the edit sheet: a rectangle, a box, or a plain text (the title, the turn, an info) ----
  const sheet = () => document.getElementById('planSheet');
  function closeSheet() { editing = null; const s = sheet(); if (s) s.hidden = true; }
  function openBeat(id) {
    const b = find(id); if (!b) return; editing = id; const s = sheet(); s.onclick = beatSheet; s.oninput = onInput;
    const sug = [...new Set((b.goals || []).flatMap((g) => (G[g] ? G[g].tech : [])))];
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>${b.kind === 'choice' ? 'Choix' : 'Rectangle'} ${num(id)}</b><button type="button" data-s="close">OK</button></div>`
      + `<small>Buts</small><div class="pPick">${GOALS.map((g) => `<button type="button" data-g="${g.id}" class="${(b.goals || []).includes(g.id) ? 'on' : ''}" style="--c:${g.c}">${esc(g.name)}</button>`).join('')}</div>`
      + `<small>Technique</small><input data-f="tech" value="${esc(b.tech)}" placeholder="Ex. Show contrast">`
      + (sug.length ? `<div class="pSug">${sug.map((t) => `<button type="button" data-tech="${esc(t)}">${esc(t)}</button>`).join('')}</div>` : '')
      + `<small>Ce qui se passe (pas de dialogue)</small><textarea data-f="what" rows="3">${esc(b.what)}</textarea>`
      + `<small>Répliques</small><div class="pStep"><button type="button" data-s="minus">−</button><b>${b.lines || 1}</b><button type="button" data-s="plus">+</button></div>`
      + (b.kind === 'choice' ? `<small>Options : des attitudes (une par ligne)</small><textarea data-f="opts" rows="3">${esc((b.opts || []).join('\n'))}</textarea>` : '')
      + (P.infos.length ? `<small>Révèle</small><div class="pPick">${P.infos.map((x) => `<button type="button" data-r="${x.id}" class="${(b.reveals || []).includes(x.id) ? 'on' : ''}" style="--c:#bf5af2">${esc(x.text)}</button>`).join('')}</div>` : '')
      + `<small>Liens</small><div class="pLinks">${P.links.map((l, i) => (l.from === id || l.to === id ? `<div><span>${l.from === id ? '↳ ' + num(l.to) : '↰ ' + num(l.from)}</span><input data-l="${i}" value="${esc(l.label)}" placeholder="Ce qui revient"><button type="button" data-x="${i}">×</button></div>` : '')).join('')}`
      + '<button type="button" data-s="link">+ Lier à un rectangle</button></div>'
      + '<div class="pRow"><button type="button" data-s="up">↑ Monter</button><button type="button" data-s="down">↓ Descendre</button><button type="button" data-s="del" class="del">Supprimer</button></div></div>';
    s.hidden = false;
  }
  function openBox(k) {
    const box = P.boxes[k]; editing = '*'; const s = sheet();
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>Boîte</b><button type="button" data-s="close">OK</button></div>`
      + `<small>Titre</small><input data-f="title" value="${esc(box.title)}">`
      + '<small>Pour la déplacer : glisse son titre</small>'
      + `<div class="pRow">${box.x != null ? '<button type="button" data-s="auto">Remettre à sa place</button>' : ''}<button type="button" data-s="delbox" class="del">Supprimer la boîte</button></div></div>`;
    s.oninput = (e) => { if (e.target.dataset.f === 'title') { box.title = e.target.value; save(); } };
    s.onclick = (e) => {
      e.stopPropagation(); const a = e.target.closest('[data-s]');
      if (!a) return;
      if (a.dataset.s === 'auto') { delete box.x; delete box.y; }
      if (a.dataset.s === 'delbox') {
        if (!confirm('Supprimer la boîte et ses rectangles ?')) return;
        const ids = new Set(box.beats.map((b) => b.id)); P.boxes.splice(k, 1); P.links = P.links.filter((l) => !ids.has(l.from) && !ids.has(l.to));
        for (const b of P.boxes) if (b.after === box.id) b.after = box.after;
      }
      s.oninput = onInput; save(); closeSheet(); render();
    };
    s.hidden = false;
  }
  function openText(label, value, done, del) {
    editing = '*'; const s = sheet();
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>${esc(label)}</b><button type="button" data-s="ok">OK</button></div><textarea data-f="text" rows="4">${esc(value)}</textarea>`
      + (del ? '<div class="pRow"><button type="button" data-s="deltext" class="del">Supprimer</button></div>' : '') + '</div>';
    s.onclick = (e) => { e.stopPropagation(); const a = e.target.closest('[data-s]'); if (!a) return;
      if (a.dataset.s === 'ok') done(s.querySelector('textarea').value.trim()); else if (a.dataset.s === 'deltext') del();
      save(); closeSheet(); render(); };
    s.hidden = false; s.querySelector('textarea').focus();
  }

  // a rectangle's sheet: taps change it at once; what's typed is kept as it's typed; the page redraws when the sheet closes
  function beatSheet(e) {
    e.stopPropagation(); const b = find(editing); if (!b) return;
    const t = e.target, g = t.closest('[data-g]'), r = t.closest('[data-r]'), sug = t.closest('[data-tech]'), x = t.closest('[data-x]'), a = t.closest('[data-s]');
    if (g) { const on = new Set(b.goals || []); on.has(g.dataset.g) ? on.delete(g.dataset.g) : on.add(g.dataset.g); b.goals = GOALS.map((q) => q.id).filter((q) => on.has(q)); save(); openBeat(b.id); return; }
    if (r) { const on = new Set(b.reveals || []); on.has(r.dataset.r) ? on.delete(r.dataset.r) : on.add(r.dataset.r); b.reveals = [...on]; save(); openBeat(b.id); return; }
    if (sug) { b.tech = sug.dataset.tech; save(); openBeat(b.id); return; }
    if (x) { P.links.splice(+x.dataset.x, 1); save(); openBeat(b.id); return; }
    if (!a) return;
    const w = where(b.id);
    switch (a.dataset.s) {
      case 'minus': b.lines = Math.max(1, (b.lines || 1) - 1); save(); openBeat(b.id); return;
      case 'plus': b.lines = Math.min(20, (b.lines || 1) + 1); save(); openBeat(b.id); return;
      case 'up': case 'down': {   // moves within its box, and over the edge into the box before / after it
        const d = a.dataset.s === 'up' ? -1 : 1, k = P.boxes.indexOf(w.box), j = w.i + d;
        w.box.beats.splice(w.i, 1);
        if (j >= 0 && j <= w.box.beats.length) w.box.beats.splice(j, 0, b);
        else if (P.boxes[k + d]) { const nb = P.boxes[k + d]; if (d < 0) nb.beats.push(b); else nb.beats.unshift(b); }
        else w.box.beats.splice(w.i, 0, b);
        break; }
      case 'del': w.box.beats.splice(w.i, 1); P.links = P.links.filter((l) => l.from !== b.id && l.to !== b.id); focusId = null; break;
      case 'link': linking = b.id; break;
    }
    save(); closeSheet(); render();
  }
  function onInput(e) {
    if (!editing || editing === '*') return; const b = find(editing); if (!b) return; const f = e.target.dataset.f, l = e.target.dataset.l;
    if (f === 'opts') b.opts = e.target.value.split('\n').map((s) => s.trim()).filter(Boolean);
    else if (f) b[f] = e.target.value;
    if (l != null && P.links[l]) P.links[l].label = e.target.value;
    save();
  }

  // the page: a tap on a rectangle lights its links; a second tap opens it
  function onClick(e) {
    e.stopPropagation();
    if (dragged) { dragged = false; return; }
    const a = e.target.closest('[data-a]'), beat = e.target.closest('.pBeat'), info = e.target.closest('[data-i]');
    if (linking && beat) {   // the second tap of a link: where it leads; then the sheet, for what comes back
      const from = linking, to = beat.dataset.b; linking = null;
      if (to !== from) { P.links.push({ from, to, label: '' }); save(); }
      render(); openBeat(from); return;
    }
    if (info) { const x = P.infos.find((i) => i.id === info.dataset.i);
      return openText('Info à exposer', x.text, (v) => { if (v) x.text = v; }, () => { P.infos = P.infos.filter((i) => i !== x); for (const b of all()) b.reveals = (b.reveals || []).filter((r) => r !== x.id); }); }
    if (beat) { if (focusId === beat.dataset.b) openBeat(beat.dataset.b); else { focusId = beat.dataset.b; render(); } return; }
    if (!a) { if (focusId) { focusId = null; render(); } return; }
    const boxEl = a.closest('[data-k]'), k = boxEl ? +boxEl.dataset.k : -1;
    switch (a.dataset.a) {
      case 'title': return openText('Titre', P.title, (v) => { if (v) P.title = v; });
      case 'turn': return openText('Le tournant', P.turn, (v) => { P.turn = v; });
      case 'box': return openBox(k);
      case 'info': return openText('Nouvelle info à exposer', '', (v) => { if (v) P.infos.push({ id: fresh('i'), text: v }); });
      case 'beat': case 'choice': {
        const b = { id: fresh('r'), goals: [], tech: '', lines: 2, what: '' }; if (a.dataset.a === 'choice') Object.assign(b, { kind: 'choice', opts: [] });
        P.boxes[k].beats.push(b); focusId = b.id; save(); render(); openBeat(b.id); return; }
      case 'addbox': { const col = Math.max(-1, ...P.boxes.map((b) => b.col || 0)) + 1; P.boxes.push({ id: fresh('x'), title: 'Nouvelle boîte', col, beats: [] }); save(); render(); openBox(P.boxes.length - 1); return; }
      case 'in': zoom = Math.min(1.6, +(zoom + .15).toFixed(2)); break;
      case 'out': zoom = Math.max(.4, +(zoom - .15).toFixed(2)); break;
      case 'cancel': linking = null; break;
      case 'example': if (!confirm('Remplacer ce plan par l’exemple Last Call ?')) return; P = LC(); focusId = null; break;
      case 'new': if (!confirm('Commencer un plan vide ? Celui-ci sera remplacé.')) return; P = EMPTY(); focusId = null; break;
      case 'copy': if (navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(P)).then(() => { a.textContent = 'Copié'; setTimeout(() => (a.textContent = 'Copier'), 1400); }); return;
      case 'paste': return openText('Colle un plan (JSON)', '', (v) => {
        try { P = fix(JSON.parse(v.slice(v.indexOf('{'), v.lastIndexOf('}') + 1))); focusId = null; } catch { alert('Ce n’est pas un plan.'); } });
    }
    save(); render();
  }

  // a box's title drags the box anywhere (finger or mouse; a tap still opens it); with a mouse, dragging the background
  // pans the canvas (a finger already scrolls it both ways)
  let drag = null, dragged = false, moving = null;
  function onDown(e) {
    const h = e.target.closest('.pBox > h3');
    if (h) {
      const n = h.parentNode; dragged = false;
      moving = { n, k: +n.dataset.k, x: e.clientX, y: e.clientY, l: n.offsetLeft, t: n.offsetTop }; h.setPointerCapture(e.pointerId); return;
    }
    if (e.pointerType !== 'mouse' || e.target.closest('.pBeat, button, input, textarea, h3, .pTurn, [data-i]')) return;
    const v = el.querySelector('.pView'); if (!v || !v.contains(e.target)) return;
    drag = { x: e.clientX, y: e.clientY, l: v.scrollLeft, t: v.scrollTop, v }; dragged = false;
  }
  function onMove(e) {
    if (moving) {
      const dx = e.clientX - moving.x, dy = e.clientY - moving.y; if (Math.abs(dx) + Math.abs(dy) > 5) dragged = true;
      if (!dragged) return;
      moving.n.style.left = Math.max(0, moving.l + dx) + 'px'; moving.n.style.top = Math.max(0, moving.t + dy) + 'px';
      const cv = el.querySelector('.pCanvas'); draw(cv, parseFloat(getComputedStyle(cv).fontSize)); return;
    }
    if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) dragged = true;
    drag.v.scrollLeft = drag.l - dx; drag.v.scrollTop = drag.t - dy;
  }

  function mount(root) {
    el = root; focusId = null; linking = null;
    root.onclick = onClick; root.onpointerdown = onDown; root.onpointermove = onMove;
    root.onpointerup = root.onpointercancel = () => {
      drag = null; if (!moving) return;
      const m = moving; moving = null; if (!dragged) return;
      const cv = el.querySelector('.pCanvas'), em = parseFloat(getComputedStyle(cv).fontSize), box = P.boxes[m.k];
      box.x = +(m.n.offsetLeft / em).toFixed(1); box.y = +(m.n.offsetTop / em).toFixed(1); save(); size(cv, em);
    };
    root.onpointerleave = () => { drag = null; };
    const s = sheet(); s.oninput = onInput; closeSheet();
    render();
  }
  return { GOALS, LC, mount, closeSheet, redraw: () => render(), get: () => P };
})();
