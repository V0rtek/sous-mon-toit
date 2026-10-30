// ---- Infos · Plan de scène: a story planned BEFORE its dialogue (no lines in it: what happens, not what's said), edited
// by hand, on a 2D canvas: time goes down, what happens at the same time sits side by side, later is to the right.
// Boxes (a scene, the other phone, later) hold rectangles stacked in order, each as tall as its lines. A box has a column
// and can start under another box. A rectangle has its goals (colour tabs on its left: one rectangle can serve two goals
// at once), its technique, what happens, the infos it reveals; a choice also has its options (attitudes, not lines).
// Orange = a link: a setup to what it sets off (a "raise stakes" to its choice, a callback, a choice or an event later).
// On top, the turn and the infos to expose: each one says where it comes out, or that it hasn't yet. Kept on this phone ----
window.PLAN = (() => {
  const GOALS = [
    // icon: a person / two people / a target / a rising arrow / an eye / a loop back
    { id: 'char', name: 'Create char engagingness', c: '#0a84ff', d: 'Faire aimer un perso : on veut passer du temps avec lui.',
      tech: [{ n: 'Show contrast', d: 'Deux persos réagissent à la même chose de façons opposées : on les connaît par la différence.', ex: ['She counts her coins twice. He tips with money he doesn’t have.', '« Man… I think we’re getting too old for this. » / « Man… I think it’s the best night of my life. »'], s: [{ n: 'Même début de phrase, fins opposées', d: 'Les deux commencent pareil et finissent à l’opposé (« Man… I think… we’re too old » / « …I’m having my best life »).' }] },
        { n: 'Moment présent', d: 'Pour ouvrir : un perso réagit à ce qui se passe là, maintenant (ce qu’il boit, voit, ressent), sans passé ni nom absent. On le comprend sans rien savoir, et ça dit qui il est.', ex: ['« Man… I think we’re getting too old for this shit. »', '« This is the worst coffee in the city. Order me another. »', '« Don’t look now. He’s wearing the same shirt as you. »'] },
        { n: 'Tell a story', d: 'Un moment du passé, à voix haute : une ligne (un perso), ou un échange à deux sur un passé commun. Dit qui ils sont (ou l’info). Une forme, jamais la même phrase deux fois.', ex: ['I used to draw for money. Now nobody pays for paper.', 'Last time I trusted a guy in a suit, I lost my car.', 'My brother tried that once. We still don’t talk.', '« Hey, you remember what you lost at the McGill bet club? » / « Fuck, man. I still miss those pants. »', '« Remember who paid the first round here? » / « You did. With my wallet. »'] }], icon: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20.5c0-4 3.1-6.3 7-6.3s7 2.3 7 6.3"/>' },
    { id: 'rel', name: 'Create relationship engagingness', c: '#64d2ff', d: 'Faire aimer le lien entre deux persos, pas seulement chacun.',
      tech: [{ n: 'Show contrast', d: 'Deux persos opposés qui s’entendent : leur différence montre leur lien.', ex: ['He plans every step, she improvises, and she still finishes his sentences.'] },
        { n: 'Shared memory', d: 'Ils se rappellent ensemble un moment vécu à deux, chacun avec sa version, en se répondant.', ex: ['« I loved that dog. » / « I hated her, she was so loud. » / « You cried so much when it happened. »', '« Remember the night the roof leaked? » / « You mean the night you blamed me for the roof. »'] },
        { n: 'Show care', d: 'L’un prend soin de l’autre, concrètement, sans le dire.', ex: ['She pushes her plate toward him without a word.', '« You didn’t eat. » / « I’m fine. » / « Eat. »'] }], icon: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2.5 19.5c0-3.2 2.4-5.2 5.5-5.2 1.6 0 3 .5 4 1.4 1-.9 2.4-1.4 4-1.4 3.1 0 5.5 2 5.5 5.2"/>' },
    { id: 'desire', name: 'Show desire / goal', c: '#ff375f', d: 'Montrer clairement ce qu’un perso veut.',
      tech: [{ n: 'Direct confession', d: 'Le perso dit tout haut, à quelqu’un en face de lui, ce qu’il veut ou ressent, sans sous-entendu (jamais dans sa tête).', ex: ['« I don’t think I could survive someone taking Cam away from me. »', '« I want out. Tonight. »'] },
        { n: 'Phrase pas finie', d: 'Il commence à dire à quelqu’un ce qu’il veut, ne finit pas, et se sauve.', ex: ['« Cam. You’re just… Yeah. Just… » then « I gotta pee. »'] }], icon: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>' },
    { id: 'stakes', name: 'Raise stakes', c: '#ffd60a', d: 'Montrer ce qui peut être perdu : à mettre juste avant un choix, lié à lui.',
      tech: [{ n: 'Mention consequences', d: 'Quelqu’un dit à un autre ce qui arrivera si ça tourne mal.', ex: ['« If the guard finds one bottle, we lose the license. »', '« Rent’s due Monday. I’m not covering you again. »'] },
        { n: 'Show character positioning', d: 'Un perso prend position, devant les autres : le joueur sait qui il va décevoir.', ex: ['« I’m against that. »', '« I’m with Ruby on this. »'] }], icon: '<path d="M3.5 17.5l6-6 4 4 7-7.5"/><path d="M15 8h5.5v5.5"/>' },
    { id: 'info', name: 'Reveal info', c: '#bf5af2', d: 'Faire découvrir une info de l’intrigue, une à la fois, après celle dont elle dépend, et après l’engagingness.',
      tech: [{ n: 'Demande qui révèle', d: 'Quelqu’un réclame quelque chose à un autre ; en le réclamant, il révèle le fait. L’info arrive par un conflit, jamais expliquée.', ex: ['« Rent’s due Monday, man. I’m not covering you again. » (ils vivent ensemble, l’un paie pour l’autre)', '« If you keep borrowing my car, at least fill it up. »', '« Give me back the ring. You’re not marrying him. »'] },
        { n: 'Tell a story', d: 'Un moment du passé, à voix haute : une ligne (un perso), ou un échange à deux sur un passé commun. Dit qui ils sont (ou l’info). Une forme, jamais la même phrase deux fois.', ex: ['I used to draw for money. Now nobody pays for paper.', 'Last time I trusted a guy in a suit, I lost my car.', 'My brother tried that once. We still don’t talk.', '« Hey, you remember what you lost at the McGill bet club? » / « Fuck, man. I still miss those pants. »', '« Remember who paid the first round here? » / « You did. With my wallet. »'] }], icon: '<path d="M2 12s3.7-6.5 10-6.5S22 12 22 12s-3.7 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>' },
    { id: 'callback', name: 'Callback', c: '#30d158', d: 'Une chose plantée tôt revient plus tard avec un autre sens.',
      tech: [{ n: 'Devise retournée', d: 'La phrase fétiche d’un perso revient, et la réalité y répond de travers.', ex: ['Early: « Something will come up. » Later the money comes from the wrong man: « …Something came up. »'] },
        { n: 'Écho', d: 'Les mots d’un perso reviennent dans la bouche d’un autre.', ex: ['Early, his friend: « Rent’s due Monday. » Later, the enemy: « Rent’s due Monday, Brooke. »'] },
        { n: 'Objet planté', d: 'Un détail anodin au début devient important plus tard.', ex: ['Early: « What do you drink? » « Red. » Later: « Don’t drink the red wine. »'] },
        { n: 'Phrase pas finie reprise', d: 'Quelqu’un demande plus tard la fin d’une phrase pas finie.', ex: ['Early: « You’re just… » Later: « What was he gonna say? »'] }], icon: '<path d="M19.5 13a7.5 7.5 0 1 1-2.2-6.3"/><path d="M19.5 3.5v5h-5"/>' },
  ];
  // a goal: d = what it's for; its techniques: { n: name, d: what it is, s: [the techniques under it] } (a category opens
  // on what's under it)
  const G = Object.fromEntries(GOALS.map((g) => [g.id, g]));
  const flat = (list) => (list || []).flatMap((t) => [t.n, ...flat(t.s)]);
  const flatT = (list) => (list || []).flatMap((t) => [t, ...flatT(t.s)]);
  const techD = (n) => { for (const g of GOALS) { const t = flatT(g.tech).find((x) => x.n === n); if (t) return t.d; } return ''; };
  // a character's face: its sheet in a circle, head and shoulders
  const face = (sp) => { const S = window.SPRITES && SPRITES[sp]; const pose = S ? (S.poses.listen ? 'listen' : Object.keys(S.poses)[0]) : null;
    return `<span class="pFace">${pose ? `<img src="chars/${sp}/${pose}.webp" alt="">` : ''}</span>`; };
  const ico = (g) => `<svg class="gi" viewBox="0 0 24 24" aria-hidden="true">${g.icon}</svg>`;

  // the example: Last call, episode 1, reverse-engineered from bar.js (what happens, never the lines)
  const LC = () => ({
    v: 5,
    title: 'Last Call · épisode 1',
    turn: 'Un inconnu offre 5000 $ cash à Brooke pour une soirée louche, et lui demande d’amener Cam.',
    // what the turn needs in place: what the player must already know or have seen for it to land (by = the info or the
    // rectangle that gives it)
    needs: [{ text: 'Brooke est cassé', by: 'i1' }, { text: 'Il doit tout à Justin, qui arrête de payer', by: 'i2' }, { text: 'Brooke veut Cam', by: 'i3' }, { text: 'Un homme en complet le cherche', by: 'i4' }],
    chars: [
      { id: 'k1', name: 'Justin', sprite: 'justin_bar', traits: ['Se sent trop vieux pour ça', 'Paie le loyer de son ami'], infos: ['i2'] },
      { id: 'k2', name: 'Brooke', sprite: 'brooke', traits: ['Cassé et fier de l’être', 'Drôle même quand ça va mal'], infos: ['i1', 'i3'] },
      { id: 'k3', name: 'Cam', sprite: 'cam', traits: ['Voit à travers tout le monde'], infos: ['i5'] },
      { id: 'k4', name: 'L’inconnu', sprite: 'suit', traits: ['Sait tout sur tout le monde'], infos: ['i4', 'i6', 'i7', 'i8', 'i9'] },
    ],
    infos: [
      // a chain: an info under another needs it first (the job before what the job is, the job before its rule)
      { id: 'i1', text: 'Brooke est cassé' }, { id: 'i2', text: 'Justin paie son loyer, et c’est fini', parent: 'i1' },
      { id: 'i3', text: 'Brooke veut Cam' },
      { id: 'i4', text: 'Un homme en complet cherche Brooke' }, { id: 'i5', text: 'Il sait ce que Cam boit', parent: 'i4' },
      { id: 'i6', text: 'L’offre : un job, 5000 $, une nuit', parent: 'i4' }, { id: 'i7', text: 'La règle : pas de vin rouge', parent: 'i6' },
      { id: 'i8', text: 'Il veut Cam aussi', parent: 'i6' }, { id: 'i9', text: 'Qui est l’inconnu', parent: 'i4' },
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
  const EMPTY = () => ({ v: 5, title: 'Nouveau plan', turn: '', needs: [], chars: [], infos: [], links: [],
    boxes: [{ id: 'x1', title: 'Scène 1', col: 0, beats: [] }, { id: 'x2', title: 'Plus tard', col: 1, beats: [] }] });

  // the plans kept on this phone (smt-plans: every plan, the one open); a generated plan pasted in is a new one, so each
  // one can be looked at again. An older plan: the example comes back as it is now; a plan of your own gets a column per box
  const KEY = 'smt-plans';
  const fix = (p) => {
    if (!p || !Array.isArray(p.boxes)) return LC();
    if ((p.v || 0) < 5 && p.title === 'Last Call · épisode 1') return LC();
    p.boxes.forEach((b, i) => { if (!b.id) b.id = 'x' + i; if (b.col == null) b.col = i; if (!Array.isArray(b.beats)) b.beats = []; });
    if (!Array.isArray(p.chars) && Array.isArray(p.characters)) { p.chars = p.characters.map((c, i) => ({ ...c, id: c.id || 'k' + i })); delete p.characters; }   // a generated plan
    return { title: '', turn: '', needs: [], chars: [], infos: [], links: [], ...p, v: 5 };
  };
  const store = (() => {
    try { const k = JSON.parse(localStorage.getItem(KEY)); if (k && Array.isArray(k.list) && k.list.length) return { cur: Math.min(k.cur || 0, k.list.length - 1), list: k.list.map(fix) }; } catch { /* none yet */ }
    let old = null; try { old = JSON.parse(localStorage.getItem('smt-plan')); } catch { /* none */ }
    return { cur: 0, list: [fix(old)] };
  })();
  let P = store.list[store.cur];
  const save = () => { store.list[store.cur] = P; try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* private window */ } };
  const openPlan = (p) => { store.list.push(p); store.cur = store.list.length - 1; P = p; focusId = null; save(); };
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
    // the goals are only their colour and icon; a hover or a tap on one shows its name
    const tabs = (b.goals || []).filter((g) => G[g]).map((g) => `<i style="background:${G[g].c};--c:${G[g].c}" data-goal="${esc(G[g].name)}">${ico(G[g])}</i>`).join('') || '<i></i>';
    const ticks = Array.from({ length: b.lines || 1 }, () => '<i></i>').join('');
    const infos = (b.reveals || []).map((r) => P.infos.find((x) => x.id === r)).filter(Boolean);
    return `<div class="pBeat${b.kind === 'choice' ? ' ch' : ''}" data-b="${b.id}" style="min-height:${(b.lines || 1) * NL}em">`
      + `<div class="pTabs">${tabs}</div><div class="pTicks">${ticks}</div><div class="pIn">`
      + `<div class="pTop"><span class="pN">${num(b.id)}</span><b>${b.kind === 'choice' ? 'Choix' : esc(b.tech) || '…'}</b><em>${b.lines || 1} répl.</em></div>`
      + (b.kind === 'choice' && b.tech ? `<div class="pTech">${esc(b.tech)}</div>` : '')
      + (b.what ? `<p>${esc(b.what)}</p>` : '')
      + (b.kind === 'choice' && b.opts && b.opts.length ? `<div class="pCh">${b.opts.map((o) => `<span>${esc(o)}</span>`).join('')}</div>` : '')
      + (infos.length ? `<div class="pInfo">${infos.map((x) => `<span>révèle : ${esc(x.text)}</span>`).join('')}</div>` : '')
      + ((b.hints || []).length ? `<div class="pInfo hint">${b.hints.map((r) => P.infos.find((x) => x.id === r)).filter(Boolean).map((x) => `<span>soulève : ${esc(x.text)}</span>`).join('')}</div>` : '')
      + back.map((l) => `<div class="pLoop in">↰ ${num(l.from)}${l.label ? ' · ' + esc(l.label) : ''}</div>`).join('')
      + out.map((l) => `<div class="pLoop">↳ ${num(l.to)}${l.label ? ' · ' + esc(l.label) : ''}</div>`).join('')
      + '</div></div>';
  }

  // the infos as a tree: under an info, the ones it unlocks (they need it first). Each one: where it comes out, or not yet;
  // ⚠ when it comes out before what it needs. ⠿ drags it: onto an info = under it, onto its top edge = just before it
  function infoTree(revealed) {
    const at = (id) => { const b = revealed(id); return b ? num(b.id) : 0; };
    const kids = (pid) => P.infos.filter((x) => (x.parent || null) === pid && (pid === null || P.infos.some((y) => y.id === pid)));
    const roots = P.infos.filter((x) => !x.parent || !P.infos.some((y) => y.id === x.parent));
    const row = (x, d, need) => {
      const n = at(x.id), early = n && (!need || need > n);
      const who = P.chars.filter((c) => (c.infos || []).includes(x.id)).map((c) => face(c.sprite)).join('');
      return `<div class="pI${n ? ' ok' : ''}${early && d ? ' warn' : ''}" data-i="${x.id}" style="--d:${d}"><b class="pGrip" data-grip="${x.id}">⠿</b>${d ? '<i class="pUp">↳</i>' : ''}<span>${esc(x.text)}</span>${who}`
        + `<em>${early && d ? '⚠ ' : ''}${n ? 'au ' + n : 'pas encore'}</em></div>` + kids(x.id).map((k) => row(k, d + 1, n)).join('');
    };
    return roots.map((x) => row(x, 0, 0)).join('');
  }

  // the goals on top: a tap on one opens its techniques (a category opens on the ones under it); each one drags onto a
  // rectangle (it takes the technique and the goal) or into a box (a new rectangle with them)
  const pal = { g: null, path: [], sel: null };
  const palList = () => { let list = G[pal.g].tech; for (const i of pal.path) list = (list[i] && list[i].s) || []; return list; };
  function palette() {
    if (!pal.g || !G[pal.g]) return '';
    const g = G[pal.g]; let list = g.tech, d = g.d; const crumbs = [`<button type="button" data-crumb="-1">${esc(g.name)}</button>`];
    pal.path.forEach((i, k) => { crumbs.push(`<button type="button" data-crumb="${k}">${esc(list[i].n)}</button>`); d = list[i].d; list = list[i].s || []; });
    let ex = [];
    if (pal.sel != null && list[pal.sel]) { d = list[pal.sel].d; ex = list[pal.sel].ex || []; }   // a technique tapped: what it is, its examples
    return `<div class="pPal" style="--c:${g.c}"><div class="pCrumbs">${crumbs.join('<span>›</span>')}</div><p class="pD">${esc(d)}</p>${ex.length ? `<ul class="pEx">${ex.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}<div class="pChips">`
      + (list.length ? list.map((t, i) => `<b data-tn="${i}" class="${pal.sel === i ? 'on' : ''}" title="${esc(t.d)}">${esc(t.n)}${t.s && t.s.length ? ' <i>›</i>' : ''}</b>`).join('') : '<em>Aucune technique encore.</em>')
      + '</div><small>Touche une technique pour la voir ; glisse-la sur un rectangle, ou dans une boîte pour en créer un.</small></div>';
  }

  // the page: a fixed bar on top, then the canvas (scrolls both ways): the head (turn, infos, legend) top left, the boxes
  function render() {
    if (!el) return;
    const view = el.querySelector('.pView'), keep = view ? [view.scrollLeft, view.scrollTop] : [0, 0];
    const revealed = (id) => all().find((b) => (b.reveals || []).includes(id));
    el.innerHTML = `<div class="pHead"><b data-a="title">${esc(P.title)}</b><div class="pBar"><button type="button" data-a="out">−</button><button type="button" data-a="in">+</button>`
      + '<button type="button" data-a="addbox">+ Boîte</button><button type="button" data-a="plans">Plans</button><button type="button" data-a="prompts">Prompts</button></div>'
      + `<div class="pGoalBar">${GOALS.map((g) => `<button type="button" data-pg="${g.id}" class="${pal.g === g.id ? 'on' : ''}" title="${esc(g.d)}" style="--c:${g.c}">${ico(g)}${esc(g.name)}</button>`).join('')}<span class="lk">lien</span></div>`
      + palette()
      + (linking ? '<div class="pLinking">Touche le rectangle où ça mène <button type="button" data-a="cancel">Annuler</button></div>' : '') + '</div>'
      + `<div class="pView"><div class="pCanvas${focusId ? ' pFocus' : ''}" style="font-size:${zoom}em">`
      + `<div class="pHeadBox" data-box="head"><div class="pTurn" data-a="turn"><small>Le tournant · décidé en premier</small><p>${esc(P.turn) || '<span class="pDim">Touche pour l’écrire</span>'}</p>`
      + `<small>Ce qu’il doit trouver en place</small><div class="pNeeds">${P.needs.map((n, i) => { const ok = n.by && (find(n.by) || revealed(n.by));
        return `<div class="${ok ? 'ok' : ''}" data-need="${i}"><span>${esc(n.text)}</span><em>${ok ? (find(n.by) ? 'au ' + num(n.by) : 'au ' + num(revealed(n.by).id)) : 'pas en place'}</em></div>`; }).join('')}`
      + '<button type="button" data-a="need">+ À mettre en place</button></div></div>'
      + `<div class="pChars"><small>Personnages</small>${P.chars.map((c) => `<div class="pChar" data-c="${c.id}">${face(c.sprite)}<div><b>${esc(c.name)}</b>`
        + (c.traits || []).map((t) => `<span>${esc(t)}</span>`).join('')
        + `${(c.infos || []).length ? `<em>${c.infos.map((i) => P.infos.find((x) => x.id === i)).filter(Boolean).map((x) => esc(x.text)).join(' · ')}</em>` : ''}</div></div>`).join('')}`
      + '<button type="button" data-a="char">+ Perso</button></div>'
      + `<div class="pInfos"><small data-root>Infos à exposer</small>${infoTree(revealed)}`
      + '<button type="button" data-a="info">+ Info</button></div>'
      + '</div>'
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
    const sug = [...new Set((b.goals || []).flatMap((g) => (G[g] ? flat(G[g].tech) : [])))];
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>${b.kind === 'choice' ? 'Choix' : 'Rectangle'} ${num(id)}</b><button type="button" data-s="close">OK</button></div>`
      + `<small>Buts</small><div class="pPick">${GOALS.map((g) => `<button type="button" data-g="${g.id}" class="${(b.goals || []).includes(g.id) ? 'on' : ''}" style="--c:${g.c}">${ico(g)}${esc(g.name)}</button>`).join('')}</div>`
      + `<small>Technique</small><input data-f="tech" value="${esc(b.tech)}" placeholder="Ex. Show contrast">${techD(b.tech) ? `<p class="pD">${esc(techD(b.tech))}</p>` : ''}`
      + (sug.length ? `<div class="pSug">${sug.map((t) => `<button type="button" data-tech="${esc(t)}">${esc(t)}</button>`).join('')}</div>` : '')
      + `<small>Ce qui se passe (pas de dialogue)</small><textarea data-f="what" rows="3">${esc(b.what)}</textarea>`
      + `<small>Répliques</small><div class="pStep"><button type="button" data-s="minus">−</button><b>${b.lines || 1}</b><button type="button" data-s="plus">+</button></div>`
      + (b.kind === 'choice' ? `<small>Options : des attitudes (une par ligne)</small><textarea data-f="opts" rows="3">${esc((b.opts || []).join('\n'))}</textarea>` : '')
      + (P.infos.length ? `<small>Révèle</small><div class="pPick">${P.infos.map((x) => `<button type="button" data-r="${x.id}" class="${(b.reveals || []).includes(x.id) ? 'on' : ''}" style="--c:#bf5af2">${esc(x.text)}</button>`).join('')}</div>`
        + `<small>Soulève la question (sans révéler)</small><div class="pPick">${P.infos.map((x) => `<button type="button" data-h="${x.id}" class="${(b.hints || []).includes(x.id) ? 'on' : ''}" style="--c:#ff9f0a">${esc(x.text)}</button>`).join('')}</div>` : '')
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

  // a character: a name, a face (its sheet), 1-2 engaging traits, the infos about them. Nothing else
  function openChar(id) {
    const c = P.chars.find((x) => x.id === id); if (!c) return; editing = '*'; const s = sheet();
    const sprites = Object.keys(window.SPRITES || {});
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>Personnage</b><button type="button" data-s="close">OK</button></div>`
      + `<small>Nom</small><input data-f="name" value="${esc(c.name)}">`
      + `<small>Traits qui le rendent attachant (1-2, un par ligne)</small><textarea data-f="traits" rows="2">${esc((c.traits || []).join('\n'))}</textarea>`
      + (P.infos.length ? `<small>Infos sur lui</small><div class="pPick">${P.infos.map((x) => `<button type="button" data-ci="${x.id}" class="${(c.infos || []).includes(x.id) ? 'on' : ''}" style="--c:#bf5af2">${esc(x.text)}</button>`).join('')}</div>` : '')
      + (c.poses ? `<small>Son look (pour la pose sheet)</small><textarea data-f="look" rows="2">${esc(c.look || '')}</textarea>`
        + `<small>Ses 6 poses (la 1re = listen)</small><input data-f="poses" value="${esc(c.poses.join(', '))}">`
        + '<div class="pRow"><button type="button" data-s="sheetp">Copier le prompt de la pose sheet</button><button type="button" data-s="sheetf">Déposer la feuille de poses</button></div>'
        + '<input type="file" accept="image/*" hidden data-sheet><p class="pMsg"></p>' : '')
      + `<small>Visuel</small><div class="pSprites">${sprites.map((sp) => `<button type="button" data-sp="${sp}" class="${c.sprite === sp ? 'on' : ''}" title="${sp}">${face(sp)}</button>`).join('')}</div>`
      + '<div class="pRow"><button type="button" data-s="delchar" class="del">Supprimer</button></div></div>';
    s.oninput = (e) => { const f = e.target.dataset.f;
      if (f === 'name') c.name = e.target.value;
      if (f === 'traits') c.traits = e.target.value.split('\n').map((t) => t.trim()).filter(Boolean).slice(0, 2);
      if (f === 'look') c.look = e.target.value;
      if (f === 'poses') { const p = e.target.value.split(',').map((x) => x.trim().toLowerCase().replace(/\s+/g, '_')).filter(Boolean); if (p.length) c.poses = ['listen', ...p.filter((x) => x !== 'listen')].slice(0, 6); }
      save(); };
    const file = s.querySelector('[data-sheet]');
    if (file) file.onchange = async () => {   // the sheet: cut into its 6 poses, a character of the gallery, its visual here
      const f = file.files[0], msg = s.querySelector('.pMsg'); if (!f) return; msg.textContent = 'Découpe…';
      try { c.sprite = await window.SHEET.add(f, c.name, c.poses); save(); render(); openChar(id); } catch (err) { msg.textContent = err.message || 'Cette image ne s’ouvre pas.'; }
    };
    s.onclick = (e) => {
      e.stopPropagation(); const ci = e.target.closest('[data-ci]'), sp = e.target.closest('[data-sp]'), a = e.target.closest('[data-s]');
      if (ci) { const on = new Set(c.infos || []); on.has(ci.dataset.ci) ? on.delete(ci.dataset.ci) : on.add(ci.dataset.ci); c.infos = [...on]; save(); openChar(id); return; }
      if (sp) { c.sprite = sp.dataset.sp; save(); openChar(id); return; }
      if (!a) return;
      if (a.dataset.s === 'sheetp') { copy(window.SHEET.prompt(c.look, c.poses), a); return; }
      if (a.dataset.s === 'sheetf') { s.querySelector('[data-sheet]').click(); return; }
      if (a.dataset.s === 'delchar') { if (!confirm('Supprimer ce personnage ?')) return; P.chars = P.chars.filter((x) => x !== c); }
      s.oninput = onInput; save(); closeSheet(); render();
    };
    s.hidden = false;
  }
  // the plans kept here: open one, delete one, start one, paste a generated one (it becomes a new plan), copy this one
  function openPlans() {
    editing = '*'; const s = sheet();
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>Plans</b><button type="button" data-s="close">OK</button></div>`
      + `<div class="pPlans">${store.list.map((p, i) => `<div class="${i === store.cur ? 'on' : ''}"><button type="button" data-pl="${i}"><b>${esc(p.title || 'Sans titre')}</b>`
        + `<span>${p.boxes.reduce((n, b) => n + b.beats.length, 0)} rectangles · ${(p.chars || []).length} persos</span></button>${store.list.length > 1 ? `<button type="button" data-pldel="${i}">×</button>` : ''}</div>`).join('')}</div>`
      + '<div class="pRow"><button type="button" data-s="new">Nouveau</button><button type="button" data-s="example">Exemple</button><button type="button" data-s="copy">Copier ce plan</button></div>'
      + '<small>Coller un plan généré (JSON)</small><textarea data-f="paste" rows="3" placeholder="Colle ici la réponse du prompt 1"></textarea>'
      + '<div class="pRow"><button type="button" data-s="paste">Ouvrir ce plan</button></div><p class="pMsg"></p></div>';
    s.oninput = null;
    s.onclick = (e) => {
      e.stopPropagation(); const pl = e.target.closest('[data-pl]'), del = e.target.closest('[data-pldel]'), a = e.target.closest('[data-s]');
      if (pl) { store.cur = +pl.dataset.pl; P = store.list[store.cur]; focusId = null; save(); closeSheet(); render(); return; }
      if (del) { if (!confirm('Supprimer ce plan ?')) return; store.list.splice(+del.dataset.pldel, 1); store.cur = Math.min(store.cur, store.list.length - 1); P = store.list[store.cur]; save(); render(); openPlans(); return; }
      if (!a) return;
      switch (a.dataset.s) {
        case 'new': openPlan(EMPTY()); break;
        case 'example': openPlan(LC()); break;
        case 'copy': copy(JSON.stringify(P), a); return;
        case 'paste': { const v = s.querySelector('textarea').value;
          try { const j = JSON.parse(v.slice(v.indexOf('{'), v.lastIndexOf('}') + 1)); if (!Array.isArray(j.boxes)) throw 0; openPlan(fix(j)); }
          catch { s.querySelector('.pMsg').textContent = 'Ce n’est pas un plan.'; return; } break; }
      }
      s.oninput = onInput; closeSheet(); render();
    };
    s.hidden = false;
  }
  const freshOn = () => { try { return localStorage.getItem('smt-plan-fresh') === '1'; } catch { return false; } };
  const copy = (text, btn) => { const was = btn.textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { btn.textContent = 'Copié'; setTimeout(() => (btn.textContent = was), 1400); }, () => { btn.textContent = 'Copie impossible'; }); };
  // the two prompts, without scrolling: 1 = an idea -> the characters and the plan (paste it in Plans: it shows here);
  // 2 = this plan -> the story (paste the answer: it plays)
  function openPrompts() {
    editing = '*'; const s = sheet();
    s.innerHTML = `<div class="pSh"><div class="pShTop"><b>Prompts</b><button type="button" data-s="close">OK</button></div>`
      + '<small>1 · Les personnages et le plan</small><textarea data-f="idea" rows="2" placeholder="Ton idée, en une ou deux phrases"></textarea>'
      + `<label class="pCheck"><input type="checkbox" data-f="fresh"${freshOn() ? ' checked' : ''}> Nouveaux personnages (l’AI les invente et choisit leurs poses ; leur pose sheet est dans leur fiche)</label>`
      + '<div class="pRow"><button type="button" data-s="p1">Copier le prompt 1</button><button type="button" data-s="plans">Coller le plan généré</button></div>'
      + `<small>2 · L’histoire, à partir de ce plan (${esc(P.title || 'sans titre')})</small>`
      + '<div class="pRow"><button type="button" data-s="p2">Copier le prompt 2 (avec ce plan)</button></div>'
      + '<textarea data-f="story" rows="2" placeholder="Colle ici la réponse du prompt 2"></textarea>'
      + '<div class="pRow"><button type="button" data-s="play">Jouer l’histoire</button></div><p class="pMsg"></p></div>';
    try { s.querySelector('[data-f="idea"]').value = localStorage.getItem('smt-plan-idea') || ''; } catch { /* private window */ }
    s.oninput = (e) => {
      if (e.target.dataset.f === 'idea') try { localStorage.setItem('smt-plan-idea', e.target.value); } catch { /* private window */ }
      if (e.target.dataset.f === 'fresh') try { localStorage.setItem('smt-plan-fresh', e.target.checked ? '1' : ''); } catch { /* private window */ }
    };
    s.onclick = (e) => {
      e.stopPropagation(); const a = e.target.closest('[data-s]'); if (!a) return; const msg = s.querySelector('.pMsg');
      switch (a.dataset.s) {
        case 'p1': copy(prompt1(s.querySelector('[data-f="idea"]').value.trim() || '[ton idée]', s.querySelector('[data-f="fresh"]').checked), a); return;
        case 'p2': copy(prompt2(), a); return;
        case 'plans': s.oninput = onInput; openPlans(); return;
        case 'play': { const v = s.querySelector('[data-f="story"]').value;
          try { const j = JSON.parse(v.slice(v.indexOf('{'), v.lastIndexOf('}') + 1)); window.PLAN_PLAY(j, P.title); closeSheet(); }
          catch (err) { msg.textContent = err.message && !/JSON|Unexpected/.test(err.message) ? err.message : 'Ce n’est pas une histoire (JSON).'; } return; }
      }
      s.oninput = onInput; closeSheet(); render();
    };
    s.hidden = false;
  }

  // ---- the prompts (for a basic model; English, the story comes out in the idea's language). Both list the goals and
  // techniques above, so a change here changes them ----
  const DECORS = '"taverne" = melissa, candy, ruby (the terrace of a tavern above a fantasy city) · "maison" = ruby, james (inside a house) · "salon" = isa, amare, james (a living room). ruby and melissa are elves, candy is a feline woman, amare is a lion-man';
  const techList = () => GOALS.map((g) => `- ${g.name} ("${g.id}"): ${g.d}\n` + flatT(g.tech).map((t) => `    · ${t.n}: ${t.d}${t.ex ? ' Examples (shapes, never copy them): ' + t.ex.map((x) => `"${x}"`).join(' / ') : ''}`).join('\n')).join('\n');
  const prompt1 = (idea, fresh) => `You plan episode 1 of an interactive story for a phone game, BEFORE any dialogue is written. The player plays the main character (his id is "justin"). Write every text in the language of the idea.
Reply with ONE JSON object and nothing else (its shape is at the end). Fill it in this order:

1. "scene": the decor that fits the idea: ${DECORS}.${fresh ? ' (Only the place: the characters are new, below.)' : ''}
${fresh ? `2. "characters": 2 or 3 NEW characters made for this story (the main character is the player: not in this list). For each: "id" (one lowercase word), "name", "traits" = 1 or 2 short, concrete traits that make us like them ("broke and proud of it"), "infos" = the ids of the infos about them, "look" = what they look like, one sentence (age, build, hair, clothes, one detail that says who they are; nothing green), "poses" = exactly 6 pose names, the first one "listen" (neutral, listening), the 5 others the ones this character needs in this episode (snake_case: "laughing", "arms_crossed", "pointing"). "sprite": "". Nothing else.` : `2. "characters": 2 or 3 people of that decor (the main character is the player: not in this list). id and sprite = their name in the decor list; "name" = the same, capitalized. For each: "traits" = 1 or 2 short, concrete traits that make us like them ("broke and proud of it"), "infos" = the ids of the infos about them. Nothing else.`}
3. "turn": decided first: the event at the end of the episode that turns everything, in one sentence.
4. "needs": what the turn needs in place: 2 to 4 things the player must already know or have seen, or the turn makes no sense. Each one becomes an info (step 5) or a rectangle that plants it (step 6); "by" = its id.
5. "infos": what the player must learn, as chains: an info with "parent" can only come out after its parent ("someone has a job for you" -> "the job is at the docks" -> "one rule: no red wine"). 5 to 9 infos. Each info is revealed by exactly one rectangle: in box "ep" (this episode) or in box "later" (a later episode). For an info revealed in "later", a rectangle of "ep" raises its question without answering it ("hints": its id): that is the curiosity the episode ends on.
6. "boxes": exactly two. Box "ep" (col 0) = the episode, 6 to 10 rectangles in order. Box "later" (col 1, title "Plus tard") = 1 to 3 events or choices of later episodes that this one sets up.
   A rectangle: "goals" (1 or 2 goal ids below), "tech" (one technique of those goals, its exact name), "lines" (how many lines of dialogue it will take, 1 to 5), "what", "reveals" (ids of the infos it reveals), "hints" (ids of the infos whose question it raises without answering).
   "what" = how the technique is done in this scene, concretely, in one sentence, NO dialogue, no quotes. Start from the technique: "Shared memory: Ruby and the main character remember the night they opened the tavern, each with a different version." If what happens does not do its technique, change one of them: a goal on a rectangle means its technique really happens there.
   A choice: "kind": "choice", "goals": [], "tech": "", "what" (the question the MAIN CHARACTER faces), "opts" (2 or 3 of HIS attitudes, not lines: "Defy him", "Lie to protect her"), "lines" (2 or 3). Every choice is the main character's: never another character's decision.
   2 or 3 choices in the episode. Right before each one, a "stakes" rectangle, linked to it.
7. "links": {"from", "to", "label"}: a setup to what it sets off: each stakes rectangle to its choice; a callback (something planted early that comes back later, in the episode or in "later").

GOALS AND THEIR TECHNIQUES (use only these):
${techList()}

RULES:
- Box "ep": 24 lines at most in total.
- The first rectangle is engagingness ("char" or "rel") on the present moment ("Moment présent", or "Show contrast" on what is happening right there). No info of the plot before it: the player likes the people before learning facts.
- An info comes out after its parent (in rectangle order), one at a time, only through a "Reveal info" technique.
- Each technique's description (above) says how it is done: follow it (who says it to whom, aloud or not).
- Enough engagingness: every character gets a "char" or "rel" rectangle before the first stakes.
- At least one desire is shown ("desire" goal).
- Every item of "needs" is revealed or planted before the turn.
- No dialogue anywhere: what happens, not what is said.

THE JSON:
{"title": "2-4 words", "scene": "...", "turn": "...", "needs": [{"text": "...", "by": "i2"}, {"text": "...", "by": "r3"}],
 "characters": [${fresh ? '{"id": "mara", "name": "Mara", "sprite": "", "traits": ["..."], "infos": ["i1"], "look": "...", "poses": ["listen", "...", "...", "...", "...", "..."]}' : '{"id": "ruby", "name": "Ruby", "sprite": "ruby", "traits": ["..."], "infos": ["i1"]}'}],
 "infos": [{"id": "i1", "text": "..."}, {"id": "i2", "text": "...", "parent": "i1"}],
 "boxes": [{"id": "ep", "title": "...", "col": 0, "beats": [{"id": "r1", "goals": ["char"], "tech": "Show contrast", "lines": 3, "what": "...", "reveals": [], "hints": []}, {"id": "r5", "kind": "choice", "goals": [], "tech": "", "lines": 2, "what": "...", "opts": ["...", "..."]}]},
           {"id": "later", "title": "Plus tard", "col": 1, "beats": [{"id": "f1", "goals": ["stakes"], "tech": "", "lines": 1, "what": "...", "reveals": ["i5"]}]}],
 "links": [{"from": "r4", "to": "r5", "label": "..."}]}

The idea: ${idea}`;
  const prompt2 = () => { const plan = { ...P, chars: undefined, characters: P.chars.map(({ x, y, ...c }) => c) };
    return `You write the dialogue of episode 1 of an interactive story for a phone game, from its plan (at the end). Dialogue only, shown one line at a time over a picture of the characters, with choices. The player plays the main character (id "justin"). Same language as the plan.

HOW TO TRANSLATE THE PLAN:
- Follow the rectangles of the first box ("ep") in order, every one of them: never skip one, never merge two. Each one becomes exactly its "lines" lines, written with its technique (below), for its goals. "what" says what happens: never copy it as a line.
- A choice becomes a "choice" step: one option per attitude in "opts". Each option's "then" = 1 to 3 lines where the others react; the two branches really differ. The lines after a choice are seen by both branches: they must hold whatever was picked.
- An info comes out exactly in the rectangle of "ep" that reveals it, never before, with that rectangle's technique (Tell a story: see its examples, never the same shape twice). An info revealed in "later" is never said in this episode: where a rectangle "hints" it, only its question is raised (something seen or said that makes the player wonder), never its answer.
- A link is a promise: what the "from" rectangle plants comes back, recognizably, in the "to" rectangle. A link to "later" is only planted.
- The characters talk with their traits: you know who speaks without the name.
- The "later" box is not written: it becomes "next", 3 or 4 bullets, each with its "if" ("If he ..., ...").

TECHNIQUES:
${techList()}

CLARITY (the player knows nothing you know):
A. One new thing per line. Lines are short: 4 to 12 words, 70 characters at most.
B. No "he", "she", "they", "it" unless the player saw who it is in the last 3 lines. Someone absent: a name AND what identifies them.
C. Every line answers the line before it (answers, dodges, jokes, pushes back). No trailer lines ("You have no idea what you're dealing with.").
D. No line that only carries information, greets or explains a feeling: show it in how they talk.
E. No line talks to the player or comments on the story ("You're wondering what this is about").

THE MAIN CHARACTER (id "justin"): when he talks to someone, "to" = their id and he says it out loud. A thought of his = "to": "justin" (inner voice, first person): rare, at most one line in four of his. Inside a choice he speaks out loud. Never his name in a line, no stage directions, no narration.
CHOICES: "t" = the button, a short line in his voice, 27 characters max with spaces; "say" = what he actually says after the tap, under 70 characters, not a copy of "t"; "tone" = one word; "then" = the lines after he speaks.
POSES: listen, surprised, thinking, explaining, angry, holding (holding = restrained, arms crossed); a character with its own "poses" in the plan uses only those. Lightly. "to" = who they talk to (or "justin"). Only the plan's characters speak: "who" = their "id" in the plan.

THE JSON (exactly this shape):
{"episode": 1, "title": "${(P.title || '').replace(/"/g, '')}", "scene": "${P.scene || 'maison'}",
 "steps": [ {"who": "<id>", "pose": "<pose>", "to": "<id>", "text": "<one line>"}, {"hush": true}, ..., {"choice": [ {"t": "...", "say": "...", "tone": "...", "then": [ {"who", "pose", "to", "text"}, ... ]}, {...} ]}, ... ],
 "next": ["If ..., ...", "..."]}

CHECK BEFORE YOU REPLY: every rectangle has its number of lines; every reveal is in its rectangle; every link's promise is kept; every "t" is 27 characters at most; nothing after the last choice's branch.

THE PLAN:
${JSON.stringify(plan)}`; };

  // a rectangle's sheet: taps change it at once; what's typed is kept as it's typed; the page redraws when the sheet closes
  function beatSheet(e) {
    e.stopPropagation(); const b = find(editing); if (!b) return;
    const t = e.target, g = t.closest('[data-g]'), r = t.closest('[data-r]'), sug = t.closest('[data-tech]'), x = t.closest('[data-x]'), a = t.closest('[data-s]');
    if (g) { const on = new Set(b.goals || []); on.has(g.dataset.g) ? on.delete(g.dataset.g) : on.add(g.dataset.g); b.goals = GOALS.map((q) => q.id).filter((q) => on.has(q)); save(); openBeat(b.id); return; }
    if (r) { const on = new Set(b.reveals || []); on.has(r.dataset.r) ? on.delete(r.dataset.r) : on.add(r.dataset.r); b.reveals = [...on]; save(); openBeat(b.id); return; }
    const h = t.closest('[data-h]');
    if (h) { const on = new Set(b.hints || []); on.has(h.dataset.h) ? on.delete(h.dataset.h) : on.add(h.dataset.h); b.hints = [...on]; save(); openBeat(b.id); return; }
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
    const pg = e.target.closest('[data-pg]'), crumb = e.target.closest('[data-crumb]'), tn = e.target.closest('[data-tn]');
    if (pg) { pal.g = pal.g === pg.dataset.pg ? null : pg.dataset.pg; pal.path = []; pal.sel = null; render(); return; }
    if (crumb) { pal.path = pal.path.slice(0, +crumb.dataset.crumb + 1); pal.sel = null; render(); return; }
    if (tn) { const i = +tn.dataset.tn, t = palList()[i]; if (t && t.s && t.s.length) { pal.path.push(i); pal.sel = null; } else pal.sel = pal.sel === i ? null : i; render(); return; }
    const goal = e.target.closest('[data-goal]');
    for (const n of el.querySelectorAll('[data-goal].show')) if (n !== goal) n.classList.remove('show');
    if (goal) { goal.classList.toggle('show'); return; }   // a goal's tab: its name, nothing else
    const ch = e.target.closest('[data-c]'); if (ch) return openChar(ch.dataset.c);
    const need = e.target.closest('[data-need]');
    if (need) { const n = P.needs[+need.dataset.need]; return openText('À mettre en place', n.text, (v) => { if (v) n.text = v; }, () => { P.needs.splice(+need.dataset.need, 1); }); }
    const a = e.target.closest('[data-a]'), beat = e.target.closest('.pBeat'), info = e.target.closest('[data-i]');
    if (linking && beat) {   // the second tap of a link: where it leads; then the sheet, for what comes back
      const from = linking, to = beat.dataset.b; linking = null;
      if (to !== from) { P.links.push({ from, to, label: '' }); save(); }
      render(); openBeat(from); return;
    }
    if (info) { const x = P.infos.find((i) => i.id === info.dataset.i);
      return openText('Info à exposer', x.text, (v) => { if (v) x.text = v; }, () => {   // what it unlocked moves up to what it needed
        for (const k of P.infos) if (k.parent === x.id) k.parent = x.parent;
        P.infos = P.infos.filter((i) => i !== x); for (const b of all()) b.reveals = (b.reveals || []).filter((r) => r !== x.id); }); }
    if (beat) { if (focusId === beat.dataset.b) openBeat(beat.dataset.b); else { focusId = beat.dataset.b; render(); } return; }
    if (!a) { if (focusId) { focusId = null; render(); } return; }
    const boxEl = a.closest('[data-k]'), k = boxEl ? +boxEl.dataset.k : -1;
    switch (a.dataset.a) {
      case 'title': return openText('Titre', P.title, (v) => { if (v) P.title = v; });
      case 'turn': return openText('Le tournant', P.turn, (v) => { P.turn = v; });
      case 'need': return openText('Ce que le tournant doit trouver en place', '', (v) => { if (v) P.needs.push({ text: v }); });
      case 'box': return openBox(k);
      case 'info': return openText('Nouvelle info à exposer', '', (v) => { if (v) P.infos.push({ id: fresh('i'), text: v }); });
      case 'beat': case 'choice': {
        const b = { id: fresh('r'), goals: [], tech: '', lines: 2, what: '' }; if (a.dataset.a === 'choice') Object.assign(b, { kind: 'choice', opts: [] });
        P.boxes[k].beats.push(b); focusId = b.id; save(); render(); openBeat(b.id); return; }
      case 'addbox': { const col = Math.max(-1, ...P.boxes.map((b) => b.col || 0)) + 1; P.boxes.push({ id: fresh('x'), title: 'Nouvelle boîte', col, beats: [] }); save(); render(); openBox(P.boxes.length - 1); return; }
      case 'in': zoom = Math.min(1.6, +(zoom + .15).toFixed(2)); break;
      case 'out': zoom = Math.max(.4, +(zoom - .15).toFixed(2)); break;
      case 'cancel': linking = null; break;
      case 'char': { const c = { id: fresh('k'), name: 'Nouveau perso', sprite: '', traits: [], infos: [] }; P.chars.push(c); save(); render(); return openChar(c.id); }
      case 'plans': return openPlans();
      case 'prompts': return openPrompts();
    }
    save(); render();
  }

  // a box's title drags the box anywhere (finger or mouse; a tap still opens it); with a mouse, dragging the background
  // pans the canvas (a finger already scrolls it both ways)
  let drag = null, dragged = false, moving = null, infoDrag = null, techDrag = null;
  // a technique dragged from the goals on top: a copy follows the finger; where it lands lights up
  function techTarget(e) {
    for (const n of el.querySelectorAll('.pBeat.drop, .pBox.drop')) n.classList.remove('drop');
    const t = document.elementFromPoint(e.clientX, e.clientY), b = t && t.closest('.pBeat'), box = t && t.closest('.pBox');
    if (b) { b.classList.add('drop'); return { beat: b.dataset.b }; }
    if (box) { box.classList.add('drop'); return { box: +box.dataset.k }; }
    return null;
  }
  function techDrop(t) {
    const { n, g } = techDrag; let b;
    if (t.beat) { b = find(t.beat); b.tech = n; }
    else { b = { id: fresh('r'), goals: [], tech: n, lines: 2, what: '' }; P.boxes[t.box].beats.push(b); }
    if (!(b.goals || []).includes(g)) b.goals = GOALS.map((q) => q.id).filter((q) => q === g || (b.goals || []).includes(q));
    focusId = b.id; save();
  }
  // where an info is dropped: onto another one (its top edge = before it, same level; the rest = under it), or onto the
  // title "Infos à exposer" = back to the top level. Never under itself or what it unlocks
  const under = (id, anc) => { for (let x = P.infos.find((i) => i.id === id); x; x = P.infos.find((i) => i.id === x.parent)) if (x.id === anc) return true; return false; };
  function infoTarget(e) {
    for (const n of el.querySelectorAll('.pI.drop, .pI.before, [data-root].drop')) n.classList.remove('drop', 'before');
    const t = document.elementFromPoint(e.clientX, e.clientY), row = t && t.closest('.pI'), top = t && t.closest('[data-root]');
    if (top) { top.classList.add('drop'); return { root: true }; }
    if (!row || under(row.dataset.i, infoDrag.id)) return null;
    const r = row.getBoundingClientRect(), before = e.clientY < r.top + r.height * .3;
    row.classList.add(before ? 'before' : 'drop'); return { id: row.dataset.i, before };
  }
  function infoDrop(t) {
    const x = P.infos.find((i) => i.id === infoDrag.id); if (!x || !t) return;
    P.infos = P.infos.filter((i) => i !== x);
    if (t.root) { delete x.parent; P.infos.push(x); }
    else { const y = P.infos.find((i) => i.id === t.id), k = P.infos.indexOf(y);
      if (t.before) { if (y.parent) x.parent = y.parent; else delete x.parent; P.infos.splice(k, 0, x); } else { x.parent = y.id; P.infos.push(x); } }
    save();
  }
  function onDown(e) {
    dragged = false;   // a drag whose click never came (its element was redrawn) must not eat the next tap
    const chip = e.target.closest('[data-tn]');
    if (chip) {
      const t = palList()[+chip.dataset.tn]; if (!t) return;
      techDrag = { n: t.n, g: pal.g, x: e.clientX, y: e.clientY, ghost: null }; chip.setPointerCapture(e.pointerId); dragged = false; e.preventDefault(); return;
    }
    const grip = e.target.closest('[data-grip]');
    if (grip) { infoDrag = { id: grip.dataset.grip, row: grip.parentNode }; grip.setPointerCapture(e.pointerId); infoDrag.row.classList.add('lift'); dragged = false; e.preventDefault(); return; }
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
    if (techDrag) {
      if (!techDrag.ghost) {
        if (Math.abs(e.clientX - techDrag.x) + Math.abs(e.clientY - techDrag.y) < 6) return;
        dragged = true; const gh = techDrag.ghost = document.createElement('div'); gh.className = 'pGhost'; gh.textContent = techDrag.n;
        gh.style.setProperty('--c', G[techDrag.g].c); document.body.appendChild(gh);
      }
      techDrag.ghost.style.left = e.clientX + 'px'; techDrag.ghost.style.top = e.clientY + 'px'; techDrag.t = techTarget(e); return;
    }
    if (infoDrag) { dragged = true; infoDrag.t = infoTarget(e); return; }
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
    root.onpointerup = root.onpointercancel = (e) => {
      drag = null;
      if (techDrag) {
        const d = techDrag; techDrag = null; if (!d.ghost) return;   // a tap: the click opens what's under it
        d.ghost.remove(); techDrag = d; if (e.type === 'pointerup' && d.t) techDrop(d.t); techDrag = null; render(); return;
      }
      if (infoDrag) { if (e.type === 'pointerup' && infoDrag.t) infoDrop(infoDrag.t); infoDrag = null; render(); return; }
      if (!moving) return;
      const m = moving; moving = null; if (!dragged) return;
      const cv = el.querySelector('.pCanvas'), em = parseFloat(getComputedStyle(cv).fontSize), box = P.boxes[m.k];
      box.x = +(m.n.offsetLeft / em).toFixed(1); box.y = +(m.n.offsetTop / em).toFixed(1); save(); size(cv, em);
    };
    root.onpointerleave = () => { drag = null; };
    const s = sheet(); s.oninput = onInput; closeSheet();
    render();
  }
  return { GOALS, LC, mount, closeSheet, redraw: () => render(), get: () => P, prompt1, prompt2 };
})();
