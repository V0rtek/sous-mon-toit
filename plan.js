// ---- Infos · Plan de scène: a story planned BEFORE its dialogue, edited by hand. Boxes (a scene, the other phone, later)
// hold rectangles stacked in order, each as tall as its lines. A rectangle has its goals (colour tabs on its left: one
// rectangle can serve two goals at once), its technique, what happens, the infos it reveals; a choice also has its options.
// Orange = a link: a setup to what it sets off (a "raise stakes" to its choice, a callback, a choice or an event later).
// On top, the infos to expose: each one says where it comes out, or that it hasn't yet. Kept on this phone (smt-plan) ----
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

  // the example: Last call, episode 1, reverse-engineered from bar.js
  const LC = () => ({
    title: 'Last Call · épisode 1',
    turn: 'Un inconnu offre 5000 $ cash à Brooke pour une soirée louche… et lui demande d’amener Cam.',
    infos: [
      { id: 'i1', text: 'Brooke est cassé' }, { id: 'i2', text: 'Justin paie son loyer, et c’est fini' }, { id: 'i3', text: 'Brooke veut Cam' },
      { id: 'i4', text: 'Un homme en complet cherche Brooke' }, { id: 'i5', text: 'Il sait ce que Cam boit' }, { id: 'i6', text: 'L’offre : 5000 $, une nuit' },
      { id: 'i7', text: 'La règle : pas de vin rouge' }, { id: 'i8', text: 'Il veut Cam aussi' }, { id: 'i9', text: 'Qui est l’inconnu' },
    ],
    boxes: [
      { title: 'Le bar · 1 h 40', beats: [
        { id: 'b1', goals: ['char', 'rel'], tech: 'Show contrast', lines: 4, what: 'Même début de phrase, fins opposées : « Man… I think… we’re getting too old » / « …I’m having my best fucking life ».' },
        { id: 'b2', goals: ['info', 'char'], tech: 'Le perso qui voit à travers', lines: 2, what: 'Cam rappelle l’entrevue ; Brooke avoue qu’il est cassé, et en rit.', reveals: ['i1'] },
        { id: 'b3', kind: 'choice', goals: ['rel'], tech: 'Options = façons d’être ami', lines: 3, what: 'Comment on est avec Brooke.', opts: ['You skipped it? · inquiet', 'Then this round’s on you. · taquin', 'Cheers to nothing. · complice'] },
        { id: 'b4', goals: ['stakes'], tech: 'Le rire meurt, phrase sérieuse', lines: 1, what: '« Rent’s due Monday, man. I’m not covering you again. »', reveals: ['i2'] },
        { id: 'b5', kind: 'choice', goals: ['char'], tech: 'Options = attitudes', lines: 2, what: 'Comment Brooke vit son problème.', opts: ['Something’ll come up. · déni (trace : the universe provides)', 'I’ll sell the guitar. · sacrifice', 'Spot me, brother? · quémande'] },
        { id: 'b6', goals: ['desire'], tech: 'Phrase pas finie', lines: 4, what: '« Cam. You’re just… Yeah. Just… » puis « I gotta pee. »', reveals: ['i3'] },
      ] },
      { title: 'Le comptoir · Justin + Cam (en même temps)', beats: [
        { id: 'c1', kind: 'choice', goals: ['desire'], tech: 'Ne pas décider le désir trop tôt', lines: 4, what: '« What was he gonna say? » Cam : « Still deciding. »', opts: ['Talk about Brooke.', 'Get to know her.', 'Ask how she feels.', 'Flirt.'] },
        { id: 'c2', kind: 'choice', goals: ['stakes', 'rel'], tech: 'Un tiers pose la question qu’on évite', lines: 3, what: '« Why do you keep paying his rent? »', opts: ['He’s my brother.', 'Because no one else will.', 'I’m done. Monday, he’s on his own.'] },
        { id: 'c3', goals: ['info'], tech: 'Info en morceaux', lines: 6, what: '« Guy in a suit. Came to my work twice. » / « Asked if I knew Brooke. »', reveals: ['i4'] },
        { id: 'c4', goals: ['info', 'callback'], tech: 'Objet planté', lines: 5, what: 'Il a demandé ce qu’elle boit. « Red. »', reveals: ['i5'] },
        { id: 'c5', kind: 'choice', goals: [], tech: 'Le choix de l’autre arrive par texto', lines: 4, what: 'Le texto de Brooke (ou rien). On y va ?', opts: ['We’re going.', 'Let him go.'] },
      ] },
      { title: 'Les toilettes · Brooke + l’inconnu (en même temps)', beats: [
        { id: 's1', kind: 'choice', goals: ['info'], tech: 'Lieu banal, rencontre qui ne l’est pas', lines: 3, what: '« Nice suit. » / « Long night? »', opts: ['Best night of my life.', 'Do I know you?', 'Say nothing.'] },
        { id: 's2', goals: ['info', 'callback'], tech: 'Info en morceaux', lines: 4, what: '« I’ve got a job for you. » « Huh? » « Five thousand. Cash. One night. » (pense : « …The universe provides. »)', reveals: ['i6'] },
        { id: 's3', goals: ['info'], tech: 'Règle sur un objet', lines: 8, what: '« Don’t drink the red wine. » « Nothing. If you don’t drink it. »', reveals: ['i7'] },
        { id: 's4', kind: 'choice', goals: ['stakes', 'callback'], tech: 'Écho', lines: 5, what: 'L’inconnu redit « Rent’s due Monday ». Pourquoi Brooke dit oui.', opts: ['“I could pay him back.” · fierté', '“Why me?”', '“I’m in.”'] },
        { id: 's5', goals: ['stakes', 'desire'], tech: 'La menace vise le désir', lines: 4, what: '« Bring your friends. » « Justin? » « And the girl. »', reveals: ['i8'] },
        { id: 's6', kind: 'choice', goals: [], tech: 'Mon choix devient le problème de l’autre', lines: 2, what: 'Le texto à Justin.', opts: ['« party at a mansion. bring cam 🔥 »', '« some guy’s paying me 5k… come? »', 'Text nobody.'] },
      ] },
      { title: 'Plus tard', beats: [
        { id: 'f1', goals: ['stakes'], tech: '', lines: 1, what: 'Épisode 2 : quelqu’un tend un verre de rouge à Cam.' },
        { id: 'f2', kind: 'choice', goals: [], tech: '', lines: 1, what: 'Épisode 3 : à la porte rouge, avouer pourquoi il a dit oui.', opts: ['Avouer', 'Mentir'] },
      ] },
    ],
    links: [
      { from: 'b4', to: 'b5', label: 'L’enjeu du choix' },
      { from: 'b2', to: 's2', label: 'Cassé → l’argent arrive au pire moment' },
      { from: 'b5', to: 's2', label: '« The universe provides »' },
      { from: 'b4', to: 's4', label: 'Mêmes mots, dans la bouche de l’ennemi' },
      { from: 'b4', to: 'c2', label: 'Le loyer revient par Cam' },
      { from: 'b6', to: 'c1', label: '« What was he gonna say? »' },
      { from: 'b6', to: 's5', label: 'La menace vise Cam' },
      { from: 'c3', to: 's1', label: 'Le comptoir connaît le complet avant Brooke' },
      { from: 'c4', to: 's3', label: '« Red » → « Don’t drink the red wine »' },
      { from: 's3', to: 'f1', label: 'Le vin rouge' },
      { from: 's4', to: 'f2', label: 'Pourquoi il a dit oui' },
      { from: 's6', to: 'c5', label: 'Le texto arrive chez Justin' },
    ],
  });
  const EMPTY = () => ({ title: 'Nouveau plan', turn: '', infos: [], boxes: [{ title: 'Scène 1', beats: [] }, { title: 'Plus tard', beats: [] }], links: [] });

  const KEY = 'smt-plan';
  let P = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || LC(); } catch { return LC(); } })();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch { /* private window */ } };
  let el = null, focusId = null, linking = null, editing = null;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const NL = 3.3;   // em of rectangle per line
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

  function render() {
    if (!el) return;
    const revealed = (id) => all().find((b) => (b.reveals || []).includes(id));
    el.innerHTML = '<div class="pBar"><button type="button" data-a="example">Exemple</button><button type="button" data-a="new">Nouveau</button><button type="button" data-a="copy">Copier</button><button type="button" data-a="paste">Coller</button></div>'
      + `<h2 data-a="title">${esc(P.title)}</h2>`
      + `<div class="pTurn" data-a="turn"><small>Le tournant · décidé en premier</small><p>${esc(P.turn) || '<span class="pDim">Touche pour l’écrire</span>'}</p></div>`
      + `<div class="pInfos"><small>Infos à exposer</small>${P.infos.map((x) => { const b = revealed(x.id);
        return `<div class="${b ? 'ok' : ''}" data-i="${x.id}"><span>${esc(x.text)}</span><em>${b ? 'au ' + num(b.id) : 'pas encore'}</em></div>`; }).join('')}`
      + '<button type="button" data-a="info">+ Info</button></div>'
      + `<div class="pLegend">${GOALS.map((g) => `<span style="--c:${g.c}">${esc(g.name)}</span>`).join('')}<span class="lk">lien</span></div>`
      + (linking ? '<div class="pLinking">Touche le rectangle où ça mène <button type="button" data-a="cancel">Annuler</button></div>' : '')
      + `<div class="pFlow${focusId ? ' pFocus' : ''}">${P.boxes.map((box, k) => `<section class="pBox" data-k="${k}"><h3 data-a="box">${esc(box.title)}</h3>${box.beats.map(rect).join('')}`
        + '<div class="pAdd"><button type="button" data-a="beat">+ Rectangle</button><button type="button" data-a="choice">+ Choix</button></div></section>').join('')}`
      + '<svg class="pSvg" aria-hidden="true"></svg></div><div class="pAdd"><button type="button" data-a="addbox">+ Boîte</button></div>';
    requestAnimationFrame(draw);
  }

  // each link: from the right edge of its setup to the right edge of where it leads, through its own lane of the gutter
  // (lanes given so that two links that overlap in height never share one)
  function draw() {
    const flow = el && el.querySelector('.pFlow'); if (!flow) return;
    const svg = flow.querySelector('.pSvg'), box = flow.getBoundingClientRect();
    const at = (id) => { const e = flow.querySelector(`[data-b="${id}"]`); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.right - box.left, y: r.top - box.top + Math.min(r.height / 2, 28) }; };
    const segs = P.links.map((l) => { const a = at(l.from), b = at(l.to); return a && b ? { l, a, b, lo: Math.min(a.y, b.y), hi: Math.max(a.y, b.y) } : null; }).filter(Boolean)
      .sort((p, q) => (p.hi - p.lo) - (q.hi - q.lo));
    const lanes = [];
    for (const s of segs) { let k = 0; while ((lanes[k] || []).some((o) => !(s.hi < o.lo - 6 || s.lo > o.hi + 6))) k++; (lanes[k] = lanes[k] || []).push(s); s.k = k; }
    const right = segs.length ? Math.max(...segs.map((s) => Math.max(s.a.x, s.b.x))) : 0, step = Math.max(5, Math.min(11, (box.width - right - 4) / Math.max(1, lanes.length)));
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`); svg.style.height = box.height + 'px';
    svg.innerHTML = '<defs><marker id="pArr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z" fill="#ff9f0a"/></marker></defs>'
      + segs.map((s) => { const x = right + 4 + step * (s.k + .5), r = 5, d = s.b.y > s.a.y ? 1 : -1, on = focusId && (s.l.from === focusId || s.l.to === focusId);
        return `<path class="${on ? 'on' : ''}" d="M${s.a.x} ${s.a.y} H${x - r} Q${x} ${s.a.y} ${x} ${s.a.y + r * d} V${s.b.y - r * d} Q${x} ${s.b.y} ${x - r} ${s.b.y} H${s.b.x + 2}" marker-end="url(#pArr)"/>`
          + `<circle cx="${s.a.x}" cy="${s.a.y}" r="3.2"/>`; }).join('');
    if (focusId) for (const b of flow.querySelectorAll('.pBeat')) b.classList.toggle('on', b.dataset.b === focusId || P.links.some((l) => (l.from === focusId && l.to === b.dataset.b) || (l.to === focusId && l.from === b.dataset.b)));
  }

  // ---- the edit sheet: a rectangle, or a plain text (the title, the turn, a box, an info) ----
  const sheet = () => document.getElementById('planSheet');
  function closeSheet() { editing = null; const s = sheet(); if (s) s.hidden = true; }
  function openBeat(id) {
    const b = find(id); if (!b) return; editing = id; const s = sheet(); s.onclick = beatSheet;
    const sug = [...new Set((b.goals || []).flatMap((g) => (G[g] ? G[g].tech : [])))];
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>${b.kind === 'choice' ? 'Choix' : 'Rectangle'} ${num(id)}</b><button type="button" data-s="close">OK</button></div>`
      + `<small>Buts</small><div class="pPick">${GOALS.map((g) => `<button type="button" data-g="${g.id}" class="${(b.goals || []).includes(g.id) ? 'on' : ''}" style="--c:${g.c}">${esc(g.name)}</button>`).join('')}</div>`
      + `<small>Technique</small><input data-f="tech" value="${esc(b.tech)}" placeholder="Ex. Show contrast">`
      + (sug.length ? `<div class="pSug">${sug.map((t) => `<button type="button" data-tech="${esc(t)}">${esc(t)}</button>`).join('')}</div>` : '')
      + `<small>Ce qui se passe</small><textarea data-f="what" rows="3">${esc(b.what)}</textarea>`
      + `<small>Répliques</small><div class="pStep"><button type="button" data-s="minus">−</button><b>${b.lines || 1}</b><button type="button" data-s="plus">+</button></div>`
      + (b.kind === 'choice' ? `<small>Options (une par ligne)</small><textarea data-f="opts" rows="3">${esc((b.opts || []).join('\n'))}</textarea>` : '')
      + (P.infos.length ? `<small>Révèle</small><div class="pPick">${P.infos.map((x) => `<button type="button" data-r="${x.id}" class="${(b.reveals || []).includes(x.id) ? 'on' : ''}" style="--c:#bf5af2">${esc(x.text)}</button>`).join('')}</div>` : '')
      + `<small>Liens</small><div class="pLinks">${P.links.map((l, i) => (l.from === id || l.to === id ? `<div><span>${l.from === id ? '↳ ' + num(l.to) : '↰ ' + num(l.from)}</span><input data-l="${i}" value="${esc(l.label)}" placeholder="Ce qui revient"><button type="button" data-x="${i}">×</button></div>` : '')).join('')}`
      + '<button type="button" data-s="link">+ Lier à un rectangle</button></div>'
      + '<div class="pRow"><button type="button" data-s="up">↑ Monter</button><button type="button" data-s="down">↓ Descendre</button><button type="button" data-s="del" class="del">Supprimer</button></div></div>';
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
      case 'up': case 'down': {   // moves within its box, and over the edge into the box next to it
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
    const box = a.closest('[data-k]'), k = box ? +box.dataset.k : -1;
    switch (a.dataset.a) {
      case 'title': return openText('Titre', P.title, (v) => { if (v) P.title = v; });
      case 'turn': return openText('Le tournant', P.turn, (v) => { P.turn = v; });
      case 'box': return openText('Boîte', P.boxes[k].title, (v) => { if (v) P.boxes[k].title = v; },
        () => { const ids = new Set(P.boxes[k].beats.map((b) => b.id)); P.boxes.splice(k, 1); P.links = P.links.filter((l) => !ids.has(l.from) && !ids.has(l.to)); });
      case 'info': return openText('Nouvelle info à exposer', '', (v) => { if (v) P.infos.push({ id: fresh('i'), text: v }); });
      case 'beat': case 'choice': {
        const b = { id: fresh('r'), goals: [], tech: '', lines: 2, what: '' }; if (a.dataset.a === 'choice') Object.assign(b, { kind: 'choice', opts: [] });
        P.boxes[k].beats.push(b); focusId = b.id; save(); render(); openBeat(b.id); return; }
      case 'addbox': P.boxes.push({ title: 'Nouvelle boîte', beats: [] }); break;
      case 'cancel': linking = null; break;
      case 'example': if (!confirm('Remplacer ce plan par l’exemple Last Call ?')) return; P = LC(); focusId = null; break;
      case 'new': if (!confirm('Commencer un plan vide ? Celui-ci sera remplacé.')) return; P = EMPTY(); focusId = null; break;
      case 'copy': if (navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(P)).then(() => { a.textContent = 'Copié'; setTimeout(() => (a.textContent = 'Copier'), 1400); }); return;
      case 'paste': return openText('Colle un plan (JSON)', '', (v) => {
        try { const j = JSON.parse(v.slice(v.indexOf('{'), v.lastIndexOf('}') + 1)); if (!Array.isArray(j.boxes)) throw 0; P = { title: '', turn: '', infos: [], links: [], ...j }; focusId = null; } catch { alert('Ce n’est pas un plan.'); } });
    }
    save(); render();
  }

  function mount(root) {
    el = root; focusId = null; linking = null;
    root.onclick = onClick;
    const s = sheet(); s.oninput = onInput; closeSheet();
    render();
  }
  return { GOALS, LC, mount, closeSheet, get: () => P };
})();
