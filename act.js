// ---- Infos · Acte: one act of 5 episodes, planned before any of them (what happens, never what's said). For now always
// the same arc, the one a basic model can fill: justin between two people he cares about (A and B). A asks him for
// something that hurts B; he tries to keep both and it gets worse; a secret changes what he believed about one of them;
// in episode 4 he must pick A or B; episode 5 shows what it cost. One column per episode = one step of System
// (techniques.js: its techniques, not the plan's), with what the episode must contain; a tap = done (✓). Orange = a
// setup (planted in 1, recalled in 2, paid in 3), purple = the secret (raised in 1 and 2, out in 3). A column copies its
// episode's prompt 1 (plan.js) with the act, what came before and what justin picked. Kept on this phone ----
window.ACT = (() => {
  // techniques.js's steps and cards (top-level consts: not on window)
  const STAGES = () => (typeof TECH_STAGES !== 'undefined' ? TECH_STAGES : []), CARD = (id) => (typeof TECH !== 'undefined' ? TECH[id] : null);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cap = (s) => String(s || '?').charAt(0).toUpperCase() + String(s || '?').slice(1);
  // Isa's look is picked among several sheets: the first one stands for her
  const face = (id) => { if (id === 'isa' && typeof ISA_LOOKS !== 'undefined') id = ISA_LOOKS[0].sprite; const S = window.SPRITES && SPRITES[id]; const pose = S ? (S.poses.listen ? 'listen' : Object.keys(S.poses)[0]) : null;
    return `<span class="pFace">${pose ? `<img src="chars/${id}/${pose}.webp" alt="">` : ''}</span>`; };

  // the two people, drawn for the act's prompt ("Autre" draws again): who they are to justin, never a job
  const PAIRS = [['his ex', 'his girlfriend now', 'son ex', 'sa blonde actuelle'], ['his father', 'his girlfriend', 'son père', 'sa blonde'],
    ['his best friend', 'his sister', 'son meilleur ami', 'sa sœur'], ['his mentor', 'his best friend', 'son mentor', 'son meilleur ami'],
    ['his girlfriend', 'his best friend', 'sa blonde', 'son meilleur ami'], ['his brother', 'his father', 'son frère', 'son père'],
    ['his best friend', 'his ex', 'son meilleur ami', 'son ex'], ['his business partner', 'his girlfriend', 'son associé', 'sa blonde'],
    ['his sister', 'his father', 'sa sœur', 'son père'], ['an old friend who just came back', 'his girlfriend', 'un vieil ami qui revient', 'sa blonde'],
    ['a friend of his father who sleeps on the couch', 'his father', 'une amie de son père qui dort au salon', 'son père'], ['his mother', 'his best friend', 'sa mère', 'son meilleur ami']];
  const DECORS = '"taverne" = melissa, candy, ruby (the terrace of a tavern above a fantasy city) · "maison" = ruby, james (inside a house) · "salon" = isa, amare, james (a living room). ruby, melissa, candy and isa are women, james and amare are men; ruby and melissa are elves, candy is a feline woman, amare is a lion-man';

  // the example, written by hand: what a filled act looks like (the reference the prompt has to reach)
  const EX = () => ({ v: 1, title: 'Sous mon toit', scene: 'salon', question: 'Dois-tu dire la vérité à ton père si elle va le briser ?',
    a: { id: 'isa', is: 'L’amie de son père, qui dort au salon depuis hier', wants: 'Que Justin ne dise pas à James qu’elle sort toutes les nuits' },
    b: { id: 'james', is: 'Son père', wants: 'Que Justin veille sur Isa et lui dise tout' },
    justin_wants: 'Que son père soit enfin heureux avec Amare',
    secret: { who: 'a', what: 'Isa est envoyée par la mère de Justin, partie il y a dix ans au coming out de James : chaque nuit, elle lui envoie des nouvelles de Justin' },
    setups: [{ plant: 'Isa l’appelle « Juju », son surnom d’enfance, comme si de rien n’était', pay: '« Juju », c’est comme ça que sa mère l’appelait' },
      { plant: 'Isa prend en photo la photo de famille sur le mur', pay: 'Les photos sont pour sa mère' }],
    episodes: [
      { ask: 'Isa lui demande de ne pas dire à James qu’elle sort la nuit', hurts: 'James lui a demandé de veiller sur elle : se taire, c’est mentir à son père', hook: 'À 3 h, Isa rentre et murmure au téléphone : « Il ressemble à toi. »' },
      { easy: 'Justin dit à James qu’Isa dormait', backfires: 'James l’a vue rentrer à 3 h : le menteur, maintenant, c’est Justin', hook: 'Une enveloppe tombe du sac d’Isa, adressée à « Juju »' },
      { reveal: 'Isa avoue : c’est la mère de Justin qui l’envoie', flip: 'On croyait qu’Isa cachait une fuite ou une liaison ; elle cachait une mère', hook: '« Elle est en ville. Samedi soir. Seulement samedi. »' },
      { clock: 'Samedi soir, la mère repart dimanche matin', a_asks: 'Isa : viens la voir samedi, sans le dire à James', b_asks: 'James : samedi, il présente Amare comme son fiancé, et il a besoin que Justin soit là' },
      { if_a: 'Justin voit sa mère ; au souper, sa chaise est vide, et James l’apprend par Amare', if_b: 'Justin reste ; Isa part dimanche, une lettre de sa mère sur son oreiller', open: 'Pourquoi elle revient maintenant, après dix ans ?' },
    ], done: {}, picks: {} });

  // the arc: per episode, its step of System (TECH_STAGES), its goal, what's at stake (it grows), and what it must
  // contain: [key, label here, label in the prompt, the act's value, thread]
  const nm = (A, w) => cap(A[w] && A[w].id);
  const de = (name) => (/^[aeiouyhéè]/i.test(name) ? 'd’' : 'de ') + name;   // « d’Isa », « de James »
  const holder = (A) => nm(A, A.secret && A.secret.who === 'b' ? 'b' : 'a');
  const E = (A, n) => (A.episodes && A.episodes[n - 1]) || {};
  const S = (A, i) => (A.setups && A.setups[i]) || {};
  const ARC = [
    { goal: 'Qu’on les aime, et qu’on voie le piège', en: 'the player cares about the people and sees the trap', stake: () => 'Ce qu’il veut',
      items: (A) => [['love', `On aime ${nm(A, 'a')} et ${nm(A, 'b')}`, `The player likes ${nm(A, 'a')} and ${nm(A, 'b')} and their bond with justin ("char" or "rel")`, ''],
        ['want', 'Justin veut', 'What justin wants, shown ("desire")', A.justin_wants],
        ['ask', `${nm(A, 'a')} demande`, `${nm(A, 'a')} asks justin, out loud`, E(A, 1).ask],
        ['hurt', `Ça blesse ${nm(A, 'b')}`, `Why giving it hurts ${nm(A, 'b')}, shown`, E(A, 1).hurts],
        ['s1', 'Planté', 'Plant it innocently: it must look like nothing', S(A, 0).plant, 's1'],
        ['s2', 'Planté', 'Plant it innocently: it must look like nothing', S(A, 1).plant, 's2'],
        ['sec', `Le secret ${de(holder(A))}, soulevé`, `Raise a question about ${holder(A)} without answering it (the secret stays hidden)`, '', 'sec'],
        ['end', 'Fin', 'The episode ends on (its turn)', E(A, 1).hook]] },
    { goal: 'Il essaie de garder les deux. Ça empire', en: 'he tries to keep both, and it gets worse', stake: (A) => `La confiance ${de(nm(A, 'b'))}`,
      items: (A) => [['r1', 'Rappel', 'Bring it back, without explaining it', S(A, 0).plant, 's1'],
        ['easy', 'L’effort minimal', 'What justin tries first to keep both (the easy way)', E(A, 2).easy],
        ['near', 'Presque', 'A near-success: for a moment it works', ''],
        ['worse', 'Ça empire', `It backfires and makes it worse with ${nm(A, 'b')}`, E(A, 2).backfires],
        ['sec2', 'Le secret, plus près', `Raise the question about ${holder(A)} again, closer (still not answered)`, '', 'sec'],
        ['end', 'Fin', 'The episode ends on (its turn)', E(A, 2).hook]] },
    { goal: 'Le secret sort. On revoit tout', en: 'the secret comes out and the player sees everything differently', stake: (A) => `Ce qu’il croyait ${de(holder(A))}`,
      items: (A) => [['out', 'Le secret sort', 'The secret comes out ("Reveal info")', E(A, 3).reveal, 'sec'],
        ['p1', 'Payé', 'Pay it off: what was planted now makes sense', S(A, 0).pay, 's1'],
        ['p2', 'Payé', 'Pay it off: what was planted now makes sense', S(A, 1).pay, 's2'],
        ['flip', 'Ce qu’on croyait', 'What the player believed, turned around', E(A, 3).flip],
        ['end', 'Fin', 'The episode ends on (its turn)', E(A, 3).hook]] },
    { goal: 'Un ou l’autre. Pas les deux', en: 'he must choose between the two, he cannot keep both', stake: (A) => `${nm(A, 'a')} ou ${nm(A, 'b')}`,
      items: (A) => [['clock', 'L’horloge', 'The clock: why it must be decided now', E(A, 4).clock],
        ['aa', `${nm(A, 'a')} demande`, `${nm(A, 'a')} asks`, E(A, 4).a_asks],
        ['ba', `${nm(A, 'b')} demande`, `${nm(A, 'b')} asks`, E(A, 4).b_asks],
        ['pick', 'Le choix', `The LAST choice of the episode: ${nm(A, 'a')} or ${nm(A, 'b')}, exactly these two options, each one painful to lose`, '']] },
    { goal: 'Ce que ça a coûté', en: 'what his choice cost', stake: () => 'Ce que ça coûte',
      items: (A) => { const p = A.picks && A.picks[4], e = E(A, 5);
        const cost = p === 'a' ? e.if_a : p === 'b' ? e.if_b : `Si ${nm(A, 'a')} : ${e.if_a || '…'} · Si ${nm(A, 'b')} : ${e.if_b || '…'}`;
        return [['cost', 'Ce que ça coûte', 'What his choice costs, shown', cost],
          ['q', 'La question, tranchée', 'The question of the act, answered by what happened (never said as a moral)', A.question],
          ['end', 'Reste ouvert', 'The episode ends on what stays open (its turn)', e.open]]; } },
  ];
  const THREAD = { s1: '#ff9f0a', s2: '#ff9f0a', sec: '#bf5af2' };

  // the acts kept on this phone (smt-acts: every act, the one open); a pasted act is a new one
  const KEY = 'smt-acts';
  const fix = (a) => (a && a.a && a.b && Array.isArray(a.episodes) ? { done: {}, picks: {}, setups: [], ...a, v: 1 } : EX());
  const store = (() => { try { const k = JSON.parse(localStorage.getItem(KEY)); if (k && Array.isArray(k.list) && k.list.length) return { cur: Math.min(k.cur || 0, k.list.length - 1), list: k.list.map(fix) }; } catch { /* none yet */ }
    return { cur: 0, list: [EX()] }; })();
  let A = store.list[store.cur], el = null;
  const save = () => { store.list[store.cur] = A; try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* private window */ } };

  // ---- the page: the act on top (the two people, what justin wants, the secret), then the 5 episodes side by side ----
  function column(st, n) {
    const arc = ARC[n - 1], items = arc.items(A), done = items.filter(([k]) => A.done[n + k]).length;
    const meter = Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('');
    const techs = (st.techs || []).filter((t) => CARD(t));
    return `<section class="aEp" style="--c:${st.c}"><header data-a="ep" data-n="${n}"><i>${n}</i><div><b>Épisode ${n} · ${esc(st.name)}</b><p>${esc(st.line)}</p></div></header>`
      + `<p class="aGoal">${esc(arc.goal)}</p>`
      + `<div class="aStake"><div class="aMeter">${meter}</div><span>En jeu : <b>${esc(arc.stake(A))}</b></span></div>`
      + `<div class="aTechs">${techs.map((t) => `<button type="button" data-t="${t}">${esc(CARD(t).name)}</button>`).join('')}</div>`
      + `<small>À mettre dans l’épisode · ${done}/${items.length}</small>`
      + items.map(([k, l, , v, th]) => `<div class="aIt${A.done[n + k] ? ' ok' : ''}${th ? ' th' : ''}" data-k="${n + k}"${th ? ` data-th="${th}" style="--t:${THREAD[th]}"` : ''}><b>${esc(l)}</b>${v ? `<span>${esc(v)}</span>` : ''}</div>`).join('')
      + (n === 4 ? `<div class="aPick"><button type="button" data-pick="a" class="${A.picks[4] === 'a' ? 'on' : ''}">Il a choisi ${esc(nm(A, 'a'))}</button><button type="button" data-pick="b" class="${A.picks[4] === 'b' ? 'on' : ''}">Il a choisi ${esc(nm(A, 'b'))}</button></div>`
        : `<input class="aNote" data-note="${n}" value="${esc(A.picks[n] || '')}" placeholder="Ce que Justin a choisi (une fois joué)">`)
      + `<div class="aGo"><button type="button" data-copy="${n}">Copier le prompt 1 de l’épisode ${n}</button></div></section>`;
  }
  function render() {
    if (!el) return;
    const v = el.querySelector('.aView'), keep = v ? [v.scrollTop, (el.querySelector('.aRow') || {}).scrollLeft || 0] : [0, 0];
    const who = (w) => `<div class="aWho">${face(A[w].id)}<div><b>${esc(nm(A, w))}</b><span>${esc(A[w].is)}</span><em>Veut : ${esc(A[w].wants)}</em></div></div>`;
    el.innerHTML = `<div class="aHead"><b data-a="title">${esc(A.title)}</b><div class="pBar"><button type="button" data-a="acts">Actes</button><button type="button" data-a="prompt">Prompt de l’acte</button><button type="button" data-a="plan">Plan de scène</button></div><p class="aMsg"></p></div>`
      + '<div class="aView"><div class="aTop" data-a="edit">'
      + `<small>L’arc · toujours le même pour l’instant</small><p class="aArc">Justin est pris entre deux personnes. ${esc(nm(A, 'a'))} lui demande quelque chose qui blesse ${esc(nm(A, 'b'))}. Il essaie de garder les deux, ça empire ; un secret change tout ; il doit choisir.</p>`
      + `<small>La question</small><p class="aQ">${esc(A.question)}</p>`
      + `<div class="aPeople">${who('a')}${who('b')}</div>`
      + `<div class="aWant"><b>Justin veut</b> ${esc(A.justin_wants)}</div>`
      + `<div class="aSecret"><b>Le secret ${esc(de(holder(A)))}</b> ${esc(A.secret && A.secret.what)}<em>caché jusqu’à l’épisode 3</em></div>`
      + '<span class="aEdit">Toucher pour modifier</span></div>'
      + `<div class="aRow">${STAGES().slice(0, 5).map((st, i) => column(st, i + 1)).join('')}<svg class="aSvg" aria-hidden="true"></svg></div></div>`;
    const nv = el.querySelector('.aView'); nv.scrollTop = keep[0]; el.querySelector('.aRow').scrollLeft = keep[1];
    threads();
  }
  // a setup or the secret, from one column to the next: right edge of one to the left edge of the other
  function threads() {
    const row = el.querySelector('.aRow'), svg = row.querySelector('.aSvg'), r = row.getBoundingClientRect();
    svg.setAttribute('width', row.scrollWidth); svg.setAttribute('height', row.scrollHeight);
    let out = '';
    for (const [th, c] of Object.entries(THREAD)) {
      const nodes = [...row.querySelectorAll(`[data-th="${th}"]`)];
      for (let i = 0; i + 1 < nodes.length; i++) {
        const a = nodes[i].getBoundingClientRect(), b = nodes[i + 1].getBoundingClientRect();
        const x1 = a.right - r.left + row.scrollLeft, y1 = a.top + a.height / 2 - r.top, x2 = b.left - r.left + row.scrollLeft, y2 = b.top + b.height / 2 - r.top, m = (x1 + x2) / 2;
        out += `<path d="M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}" stroke="${c}" /><circle cx="${x2}" cy="${y2}" r="4" fill="${c}" />`;
      }
    }
    svg.innerHTML = out;
  }

  // ---- the sheet: edit the act or an episode, a technique, the list of acts, the act's prompt ----
  const sheet = () => document.getElementById('actSheet');
  const closeSheet = () => { const s = sheet(); if (s) s.hidden = true; };
  function openSheet(html, onclick, oninput) {
    const s = sheet(); s.innerHTML = `<div class="pSh">${html}</div>`;
    s.onclick = (e) => { e.stopPropagation(); onclick && onclick(e); }; s.oninput = oninput || null; s.hidden = false;
  }
  // fields = [label, path]; a path is where it lives in the act ("a.wants", "episodes.0.ask")
  const getP = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), A);
  const setP = (path, v) => { const ks = path.split('.'); let o = A; for (const k of ks.slice(0, -1)) o = o[k] = o[k] || (/^\d+$/.test(k) ? [] : {}); o[ks[ks.length - 1]] = v; };
  function openFields(title, fields, extra = '') {
    openSheet(`<div class="pShTop"><b>${esc(title)}</b><button type="button" data-s="close">OK</button></div>${extra}`
      + fields.map(([l, p]) => `<small>${esc(l)}</small><textarea data-p="${p}" rows="2">${esc(getP(p))}</textarea>`).join(''),
    (e) => { if (e.target.closest('[data-s="close"]')) { closeSheet(); render(); } },
    (e) => { const p = e.target.dataset.p; if (p) { setP(p, e.target.value); save(); } });
  }
  const EP_FIELDS = [
    [['Ce que A demande', 'ask'], ['Pourquoi ça blesse B', 'hurts'], ['La fin', 'hook']],
    [['L’effort minimal', 'easy'], ['Comment ça empire', 'backfires'], ['La fin', 'hook']],
    [['Comment le secret sort', 'reveal'], ['Ce qu’on croyait, retourné', 'flip'], ['La fin', 'hook']],
    [['L’horloge', 'clock'], ['Ce que A demande', 'a_asks'], ['Ce que B demande', 'b_asks']],
    [['S’il choisit A', 'if_a'], ['S’il choisit B', 'if_b'], ['Ce qui reste ouvert', 'open']],
  ];
  function openEp(n) {
    const f = EP_FIELDS[n - 1].map(([l, k]) => [l.replace(/\bA\b/, nm(A, 'a')).replace(/\bB\b/, nm(A, 'b')), `episodes.${n - 1}.${k}`]);
    if (n === 1) f.push(['Planté 1', 'setups.0.plant'], ['Planté 2', 'setups.1.plant']);
    if (n === 3) f.push(['Payé 1', 'setups.0.pay'], ['Payé 2', 'setups.1.pay']);
    openFields(`Épisode ${n}`, f, `<p class="pD">${esc(ARC[n - 1].goal)}.</p>`);
  }
  const openAct = () => openFields('L’acte', [['Titre', 'title'], ['Décor (taverne, maison, salon)', 'scene'], ['La question', 'question'],
    [`Qui est ${nm(A, 'a')} pour Justin`, 'a.is'], [`Ce que ${nm(A, 'a')} veut`, 'a.wants'], [`Qui est ${nm(A, 'b')} pour Justin`, 'b.is'], [`Ce que ${nm(A, 'b')} veut`, 'b.wants'],
    ['Ce que Justin veut', 'justin_wants'], ['Le secret', 'secret.what']]);
  function openTech(id) {
    const t = CARD(id);
    openSheet(`<div class="pShTop"><b>${esc(t.name)}</b><button type="button" data-s="close">OK</button></div><p class="pD">${esc(t.how)}</p>`
      + (t.ex && t.ex.length ? t.ex.map(([a, b]) => `<p class="pD aEx"><s>${esc(a)}</s><br>→ ${esc(b)}</p>`).join('') : ''),
    (e) => { if (e.target.closest('[data-s="close"]')) closeSheet(); });
  }
  function openActs() {
    openSheet('<div class="pShTop"><b>Actes</b><button type="button" data-s="close">OK</button></div><div class="pPlans">'
      + store.list.map((x, i) => `<div class="${i === store.cur ? 'on' : ''}"><button type="button" data-open="${i}"><b>${esc(x.title || 'Sans titre')}</b><span class="pD">${esc(x.question || '')}</span></button><button type="button" data-del="${i}" class="del">×</button></div>`).join('')
      + '</div><div class="pRow"><button type="button" data-s="ex">L’exemple</button></div>',
    (e) => { const o = e.target.closest('[data-open]'), d = e.target.closest('[data-del]'), s = e.target.closest('[data-s]');
      if (o) { store.cur = +o.dataset.open; A = store.list[store.cur]; }
      else if (d) { if (!confirm('Supprimer cet acte ?')) return; store.list.splice(+d.dataset.del, 1); if (!store.list.length) store.list.push(EX()); store.cur = Math.min(store.cur, store.list.length - 1); A = store.list[store.cur]; }
      else if (s && s.dataset.s === 'ex') { store.list.push(EX()); store.cur = store.list.length - 1; A = store.list[store.cur]; }
      else if (!s) return;
      save(); closeSheet(); render(); });
  }

  // ---- the act's prompt: an idea (optional) + the two people drawn -> the act, as JSON. A basic model fills the arc,
  // it never builds one: every field is one concrete sentence ----
  let pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const promptAct = (idea, [ra, rb]) => `You plan ONE act of an interactive story for a phone game: 5 episodes. No dialogue: only what happens. The player plays the main character, "justin". Write every text in the language of the idea (no idea: French).
Reply with ONE JSON object and nothing else (its shape is at the end).

THE ARC (always this one: you fill it, you never change it)
justin is caught between two people he cares about, A and B. A asks him for something; giving it to A hurts B.
- Episode 1: we like A and B; A asks; we see why it would hurt B. Two small things are planted that look like nothing. A question about the one who has a secret is raised, never answered.
- Episode 2: justin tries the easy way to keep both. It backfires: things get worse with B.
- Episode 3: the secret comes out. The two planted things suddenly make sense. What the player believed is turned around.
- Episode 4: a clock. A and B each ask him for the same moment. He must choose: A or B.
- Episode 5: what his choice cost (one version per choice), and what stays open.

THE TWO PEOPLE: A is ${ra}, B is ${rb}. Pick them among the characters of the decor (${DECORS}). Choose the decor where two characters fit.

FILL IN (each one sentence, concrete: something you could film or say out loud, never a feeling alone):
1. "scene": the decor. "title": 2-4 words.
2. "a" and "b": "id" (the character's id), "is" (who they are to justin), "wants" (what they want from justin, asked out loud: "wants him to come to her wedding on Saturday", never "wants to be happy").
3. "justin_wants": what justin wants for himself, at the start.
4. "question": the question the act argues about, as a question ("Do you keep a promise to someone who lies to you?").
5. "secret": "who" ("a" or "b") and "what": what that person hides, which, once out, makes the player see them differently (a good reason, or a hidden one). It must explain both setups.
6. "setups": exactly 2. "plant" = what episode 1 shows (a word, a habit, an object, a name: innocent), "pay" = what it means once the secret is out.
7. "episodes": exactly 5 objects, in order, with these fields:
   1: "ask" (what A asks justin), "hurts" (why giving it hurts B), "hook" (the last moment of the episode: a surprise or a question, never a summary).
   2: "easy" (what justin tries first to keep both: a lie, a delay, a secret meeting...), "backfires" (how it makes things worse with B), "hook".
   3: "reveal" (how the secret comes out), "flip" (what the player believed, and what is true), "hook".
   4: "clock" (why it must be decided now), "a_asks", "b_asks" (each one asks for the same moment: he can't do both).
   5: "if_a" (if he chose A: what it costs, shown), "if_b" (if he chose B), "open" (what stays open for the next act).

RULES:
- The stakes are between people, never money: no debt, no money owed, no crate, no cellar, no landlord, no licence, no smuggling.
- Both sides of episode 4 must feel right: the player has to hesitate.
- Before episode 3, the secret is never said: only planted and raised.
- Everything that happens in an episode can be understood from what the earlier episodes showed.

THE JSON:
{"title": "...", "scene": "...", "question": "...", "a": {"id": "...", "is": "...", "wants": "..."}, "b": {"id": "...", "is": "...", "wants": "..."}, "justin_wants": "...",
 "secret": {"who": "a", "what": "..."}, "setups": [{"plant": "...", "pay": "..."}, {"plant": "...", "pay": "..."}],
 "episodes": [{"ask": "...", "hurts": "...", "hook": "..."}, {"easy": "...", "backfires": "...", "hook": "..."}, {"reveal": "...", "flip": "...", "hook": "..."}, {"clock": "...", "a_asks": "...", "b_asks": "..."}, {"if_a": "...", "if_b": "...", "open": "..."}]}

The idea: ${idea || '(none: invent it from the two people)'}`;
  // what a pasted act is missing (it still opens; the missing fields stay empty and editable)
  function missing(a) {
    const m = [];
    for (const k of ['title', 'scene', 'question', 'justin_wants']) if (!a[k]) m.push(k);
    for (const w of ['a', 'b']) if (!a[w] || !a[w].id || !a[w].wants) m.push(w);
    if (!a.secret || !a.secret.what) m.push('secret');
    if (!Array.isArray(a.setups) || a.setups.length < 2) m.push('setups');
    const need = ['ask hurts hook', 'easy backfires hook', 'reveal flip hook', 'clock a_asks b_asks', 'if_a if_b open'];
    need.forEach((f, i) => f.split(' ').forEach((k) => { if (!(a.episodes && a.episodes[i] && a.episodes[i][k])) m.push(`épisode ${i + 1} · ${k}`); }));
    return m;
  }
  function openPrompt() {
    let idea = ''; try { idea = localStorage.getItem('smt-act-idea') || ''; } catch { /* private window */ }
    openSheet('<div class="pShTop"><b>Prompt de l’acte</b><button type="button" data-s="close">OK</button></div>'
      + '<small>Ton idée (facultatif)</small><textarea data-f="idea" rows="2" placeholder="Une ou deux phrases, ou rien"></textarea>'
      + `<small>Les deux personnes, tirées au hasard</small><div class="aPair"><span>A = ${esc(pair[2])} · B = ${esc(pair[3])}</span><button type="button" data-s="other">Autre</button></div>`
      + '<div class="pRow"><button type="button" data-s="copy">Copier le prompt de l’acte</button></div>'
      + '<small>La réponse</small><textarea data-f="act" rows="2" placeholder="Colle ici la réponse (le JSON de l’acte)"></textarea>'
      + '<div class="pRow"><button type="button" data-s="paste">Ouvrir cet acte</button></div><p class="pMsg"></p>',
    (e) => { const a = e.target.closest('[data-s]'); if (!a) return; const s = sheet(), msg = s.querySelector('.pMsg');
      switch (a.dataset.s) {
        case 'close': closeSheet(); return;
        case 'other': { let p; do p = PAIRS[Math.floor(Math.random() * PAIRS.length)]; while (p === pair); pair = p; openPrompt(); return; }
        case 'copy': copy(promptAct(s.querySelector('[data-f="idea"]').value.trim(), pair), a); return;
        case 'paste': { const v = s.querySelector('[data-f="act"]').value; let j;
          try { j = JSON.parse(v.slice(v.indexOf('{'), v.lastIndexOf('}') + 1)); } catch { msg.textContent = 'Ce n’est pas un acte (JSON).'; return; }
          if (!j.a || !j.b || !Array.isArray(j.episodes)) { msg.textContent = 'Il manque A, B ou les épisodes.'; return; }
          const m = missing(j); store.list.push(fix({ ...j, done: {}, picks: {} })); store.cur = store.list.length - 1; A = store.list[store.cur]; save(); closeSheet(); render();
          note(m.length ? `Ouvert. Il manque : ${m.join(', ')}` : 'Ouvert.'); return; }
      } });
    sheet().querySelector('[data-f="idea"]').value = idea;
    sheet().oninput = (e) => { if (e.target.dataset.f === 'idea') try { localStorage.setItem('smt-act-idea', e.target.value); } catch { /* private window */ } };
  }
  const copy = (text, btn) => { const was = btn.textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { btn.textContent = 'Copié'; setTimeout(() => (btn.textContent = was), 1400); }, () => { btn.textContent = 'Copie impossible'; }); };
  const note = (t) => { const m = el && el.querySelector('.aMsg'); if (m) m.textContent = t; };

  // ---- an episode's prompt 1: the plan's own prompt (plan.js) with THE ACT: the people, what came before (and what
  // justin picked), what this episode must contain, and what comes next (its "Plus tard" box) ----
  const dot = (t) => { t = String(t || '…').trim(); return /[.!?»"…]$/.test(t) ? t : t + '.'; };
  const before = (n) => {
    const e = (k) => E(A, k), p = (k) => (k === 4 ? (A.picks[4] ? `justin chose ${nm(A, A.picks[4])}.` : '') : A.picks[k] ? `justin chose: ${A.picks[k]}.` : '');
    const said = [`${nm(A, 'a')} asked justin: ${dot(e(1).ask)} Planted: ${S(A, 0).plant} / ${dot(S(A, 1).plant)} It ended: ${dot(e(1).hook)}`,
      `justin tried: ${dot(e(2).easy)} It backfired: ${dot(e(2).backfires)} It ended: ${dot(e(2).hook)}`,
      `The secret came out: ${dot(e(3).reveal)} It ended: ${dot(e(3).hook)}`,
      `Clock: ${dot(e(4).clock)} ${nm(A, 'a')}: ${dot(e(4).a_asks)} ${nm(A, 'b')}: ${dot(e(4).b_asks)}`];
    return said.slice(0, n - 1).map((t, i) => `- Episode ${i + 1}: ${t} ${p(i + 1)}`.trim()).join('\n');
  };
  function actText(n) {
    const st = STAGES()[n - 1], arc = ARC[n - 1], all = arc.items(A), end = all.find(([k]) => k === 'end');
    const items = all.filter((it) => it !== end), turn = end ? end[3] : `justin has to choose: ${nm(A, 'a')} or ${nm(A, 'b')} (the last choice of the episode, nothing after its branches)`;
    const sec = n < 3 ? 'The player must NOT learn it in this episode: only raise its question.' : n === 3 ? 'It comes out in THIS episode.' : 'It came out in episode 3.';
    const next = n < 5 ? ARC[n].items(A).filter(([k, , , v]) => v && ['easy', 'worse', 'out', 'flip', 'clock', 'aa', 'ba', 'cost'].includes(k)).map(([, , en, v]) => `${en}: ${v}`).join(' / ') : '';
    return `THE ACT (5 episodes, always the same arc: justin is caught between two people he cares about; giving one what they ask hurts the other; a secret changes what he believed; in episode 4 he must choose)
Scene: "${A.scene}". The question the act argues (never said as a moral): ${A.question}
- ${nm(A, 'a')} (id "${A.a.id}"): ${A.a.is}. Wants: ${A.a.wants}
- ${nm(A, 'b')} (id "${A.b.id}"): ${A.b.is}. Wants: ${A.b.wants}
- justin wants: ${A.justin_wants}
- The secret of ${holder(A)}: ${dot(A.secret && A.secret.what)} ${sec}
${n > 1 ? `BEFORE THIS EPISODE (the player saw it):\n${before(n)}\n` : ''}THIS EPISODE: episode ${n} of 5, step "${st.name}" (${st.line}): ${arc.en}. Only ${nm(A, 'a')}, ${nm(A, 'b')} and justin in "characters" (another character of the decor only if the episode needs them).
It must contain, each in its own rectangle of box "ep", in this order (the other rectangles go around them):
${items.map(([, , en, v], i) => `${i + 1}. ${en}${v ? ': ' + v : ''}`).join('\n')}
"turn": ${turn || '…'}
${n < 5 ? `Box "later" = 1 to 3 rectangles of episode ${n + 1}: ${next}` : 'Box "later" = 1 rectangle: what stays open for the next act.'}`;
  }

  function onClick(e) {
    const t = e.target, a = t.closest('[data-a]');
    if (t.closest('input')) return;
    const it = t.closest('[data-k]'); if (it) { A.done[it.dataset.k] = !A.done[it.dataset.k]; save(); render(); return; }
    const tc = t.closest('[data-t]'); if (tc) return openTech(tc.dataset.t);
    const pk = t.closest('[data-pick]'); if (pk) { A.picks[4] = A.picks[4] === pk.dataset.pick ? null : pk.dataset.pick; save(); render(); return; }
    const cp = t.closest('[data-copy]'); if (cp) { const n = +cp.dataset.copy; copy(window.PLAN.prompt1('', false, { n, text: actText(n) }), cp); note(`Prompt 1 de l’épisode ${n} copié. Sa réponse se colle dans Plan de scène › Prompts › Coller le plan généré.`); return; }
    if (!a) return;
    switch (a.dataset.a) {
      case 'title': return openFields('Titre', [['Titre', 'title']]);
      case 'edit': return openAct();
      case 'ep': return openEp(+a.dataset.n);
      case 'acts': return openActs();
      case 'prompt': return openPrompt();
      case 'plan': return window.ACT_TO_PLAN && window.ACT_TO_PLAN();
    }
  }
  function mount(root) {
    el = root; root.onclick = onClick;
    root.oninput = (e) => { const n = e.target.dataset.note; if (n) { A.picks[n] = e.target.value; save(); } };
    closeSheet(); render();
  }
  return { mount, closeSheet, redraw: () => render(), get: () => A, actText, promptAct: (idea) => promptAct(idea, pair) };
})();
