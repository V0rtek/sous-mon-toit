// ---- Infos · Plan de scène: what a story looks like planned BEFORE its dialogue (boxes filled in order, then the lines
// are asked for). The example: Last call, episode 1, reverse-engineered from bar.js. Read top to bottom like the episode:
// first the turn (decided first) and what it needs in place, then the beats in order; a beat is as tall as its lines.
// Orange = a loop: something set up here comes back later (same scene, the other phone, or a later episode) ----
window.PLAN = (() => {
  const LC = {
    title: 'Last Call · épisode 1',
    // decided first: the end of the episode, then everything it needs to hit hard
    turn: 'Un inconnu offre 5000 $ cash à Brooke pour une soirée louche… et lui demande d’amener Cam.',
    needs: [
      ['Le besoin', 'Brooke est cassé et Justin paie son loyer.'],
      ['La blessure', 'Être celui qui doit tout à son ami.'],
      ['Le désir', 'Cam. Brooke n’arrive pas à le dire.'],
      ['La devise', 'Brooke croit que l’argent va tomber du ciel.'],
    ],
    scenes: [
      { title: 'Le bar · 1 h 40', who: 'Justin, Brooke, Cam', beats: [
        { id: 'b1', job: 'Présenter', tech: 'charEngaging', pattern: 'Même début de phrase, fins opposées', lines: 4,
          what: 'Justin et Brooke en 2 lignes : l’un se sent vieux, l’autre vit sa meilleure vie.',
          ex: ['JUSTIN : Man… I think… we’re getting too old for this shit.', 'BROOKE : Man… I think… I’m having my best fucking life.'] },
        { id: 'b2', job: 'Planter le besoin', tech: 'charEngaging', pattern: 'Le perso qui voit à travers', lines: 2,
          what: 'Cam rappelle l’entrevue ; Brooke avoue qu’il est cassé, et en rit.',
          ex: ['CAM : Thought you had a job interview tomorrow.', 'BROOKE : I’m a broke ass bitch, I ain’t got nothing tomorrow.'] },
        { id: 'b3', job: 'S’attacher', tech: 'camaraderie', pattern: 'Les options = 3 façons d’être ami', lines: 3,
          what: 'Pas d’intrigue : on choisit comment on est avec Brooke. Chaque branche finit sur une blague.',
          choice: { by: 'Justin', opts: [['You skipped it?', 'inquiet'], ['Then this round’s on you.', 'taquin'], ['Cheers to nothing.', 'complice']] } },
        { id: 'b4', job: 'Les enjeux', tech: 'relConsequence', pattern: 'Le rire meurt, puis la phrase sérieuse', lines: 1,
          what: 'Un silence, puis Justin met la limite.',
          ex: ['JUSTIN : Rent’s due Monday, man. I’m not covering you again.'] },
        { id: 'b5', job: 'Le besoin dans sa voix', tech: 'desire', pattern: 'Les options = des attitudes devant le problème', lines: 2,
          what: 'Comment Brooke vit son problème. Le choix laisse une trace.',
          choice: { by: 'Brooke', opts: [['Something’ll come up.', 'déni', 'the universe provides'], ['I’ll sell the guitar.', 'sacrifice'], ['Spot me, brother?', 'quémande']] } },
        { id: 'b6', job: 'Le désir', tech: 'openLoop', pattern: 'Phrase pas finie, puis une fuite', lines: 4,
          what: 'Justin se tourne ; Brooke reste seul avec Cam, commence, ne finit pas, et part aux toilettes.',
          ex: ['BROOKE : Cam. You’re just…', 'BROOKE : Yeah. Just…', 'BROOKE : …I gotta pee.'] },
      ] },
      { split: 'En même temps, chacun sur son téléphone', lanes: [
        { title: 'Le comptoir · Justin + Cam', beats: [
          { id: 'c1', job: 'Rouvrir le désir', tech: 'conflictingDesire', pattern: 'Ne pas décider le désir trop tôt', lines: 4,
            what: 'Cam demande ce que Brooke allait dire. Elle ne choisit personne : la porte reste ouverte pour Justin aussi.',
            ex: ['CAM : What was he gonna say?', 'CAM : Idk. He’s funny.', 'CAM : Still deciding.'],
            choice: { by: 'Justin', opts: [['Talk about Brooke.', 'son ami'], ['Get to know her.', 'curieux'], ['Ask how she feels.', 'honnête'], ['Flirt.', 'flirt']] } },
          { id: 'c2', job: 'Presser la blessure', tech: 'relConsequence', pattern: 'Un tiers pose la question qu’on évite', lines: 3,
            what: 'Cam : pourquoi tu paies son loyer ? Justin répond qui il est.',
            ex: ['CAM : Why do you keep paying his rent?'],
            choice: { by: 'Justin', opts: [['He’s my brother.', 'loyal'], ['Because no one else will.', 'fatigué'], ['I’m done. Monday, he’s on his own.', 'fini']] } },
          { id: 'c3', job: 'L’ombre arrive', tech: 'curiosity', pattern: 'Info en morceaux, réaction entre chaque', lines: 6,
            what: 'Un homme en complet pose des questions sur Brooke. Le joueur du comptoir le sait avant Brooke.',
            ex: ['CAM : Guy in a suit. Came to my work twice this week.', 'CAM : Asked if I knew Brooke.', 'JUSTIN : …What’d you say?', 'CAM : That I didn’t.'] },
          { id: 'c4', job: 'Planter l’objet', tech: 'curiosity', pattern: 'Un détail anodin qui sera une menace', lines: 5,
            what: 'La 2e visite : il a demandé ce qu’elle boit.',
            ex: ['CAM : What I drink.', 'JUSTIN : …What do you drink?', 'CAM : Red.'] },
          { id: 'c5', job: 'Lire le texto', tech: 'impossibleChoice', pattern: 'La décision de l’autre joueur arrive par un texto', lines: 4,
            what: 'Le texto de Brooke (ou rien) arrive. Justin décide s’ils y vont ; Cam y va de toute façon.',
            choice: { by: 'Justin', opts: [['We’re going.', 'y va'], ['Let him go.', 'le laisse']] } },
        ] },
        { title: 'Les toilettes · Brooke + l’inconnu', beats: [
          { id: 's1', job: 'La rencontre', tech: 'unexpected', pattern: 'Lieu banal, rencontre qui ne l’est pas', lines: 3,
            what: 'Aux urinoirs, à côté d’un homme en complet. C’est Brooke qui parle en premier.',
            ex: ['BROOKE : Nice suit.', 'L’INCONNU : Long night?'],
            choice: { by: 'Brooke', opts: [['Best night of my life.', 'content'], ['Do I know you?', 'méfiant'], ['Say nothing.', 'fixe le mur']] } },
          { id: 's2', job: 'Le tournant', tech: 'curiosity', pattern: 'Info en morceaux, réaction entre chaque', lines: 4,
            what: 'L’offre, une pièce à la fois. Si Brooke a dit « something’ll come up » : il le pense maintenant.',
            ex: ['L’INCONNU : I’ve got a job for you.', 'BROOKE : Huh?', 'L’INCONNU : Five thousand. Cash. One night.', 'BROOKE (pense) : …The universe provides.'] },
          { id: 's3', job: 'Le mystère', tech: 'curiosity', pattern: 'Une règle sur un objet, une réponse qui n’explique rien', lines: 8,
            what: 'Une fête, parler aux gens. Une seule règle.',
            ex: ['L’INCONNU : One rule.', 'L’INCONNU : Don’t drink the red wine.', 'BROOKE : What’s wrong with the red wine?', 'L’INCONNU : Nothing. If you don’t drink it.'] },
          { id: 's4', job: 'Presser la blessure', tech: 'antagonist', pattern: 'Écho : les mots de l’ami dans la bouche de l’ennemi', lines: 5,
            what: 'L’inconnu sait tout. Il redit la phrase de Justin, et Brooke l’entend dans sa tête.',
            ex: ['L’INCONNU : Rent’s due Monday, Brooke.', 'L’INCONNU : Must get old. Being the one who owes.', 'BROOKE (pense) : “I’m not covering you again.”'],
            choice: { by: 'Brooke', opts: [['“I could pay him back.”', 'fierté'], ['“Why me?”', 'pourquoi'], ['“I’m in.”', 'dedans']] } },
          { id: 's5', job: 'Le hook', tech: 'threat', pattern: 'La menace vise ce qu’il désire', lines: 4,
            what: 'Amène tes amis. Justin ? Et la fille.',
            ex: ['L’INCONNU : Bring your friends.', 'BROOKE : Justin?', 'L’INCONNU : And the girl.', 'BROOKE : …Cam? What’s Cam got to do with—'] },
          { id: 's6', job: 'Décider pour l’autre', tech: 'otherChoice', pattern: 'Mon choix devient le problème de l’autre joueur', lines: 2,
            what: 'Le texto que Brooke envoie (ou pas) à Justin.',
            choice: { by: 'Brooke', opts: [['« party at a mansion. bring cam 🔥 »', 'l’attire'], ['« some guy’s paying me 5k… come? »', 'demi-vérité'], ['Text nobody.', 'les protège']] } },
        ] },
      ] },
    ],
    // [setup, payoff, what comes back]; a payoff "ep:..." is in a later episode
    loops: [
      ['b2', 's2', 'Il est cassé → l’argent arrive au pire moment'],
      ['b4', 's4', 'Les mots de Justin, redits par l’ennemi'],
      ['b5', 's2', '« The universe provides » → l’univers fournit… un homme dangereux'],
      ['b6', 'c1', 'La phrase pas finie → « What was he gonna say? »'],
      ['b6', 's5', 'Le désir → la menace vise Cam'],
      ['b4', 'c2', 'Le loyer revient par la question de Cam'],
      ['c3', 's1', 'Le joueur du comptoir connaît le complet avant Brooke'],
      ['c4', 's3', '« Red » → « Don’t drink the red wine »'],
      ['s3', 'ep:Épisode 2 · La maison', 'Quelqu’un tend un verre de rouge à Cam'],
      ['s4', 'ep:Épisode 3 · La porte rouge', 'Pourquoi il a dit oui : l’aveu à la porte rouge'],
      ['s6', 'c5', 'Le texto de Brooke arrive chez Justin'],
    ],
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const techName = (t) => (typeof TECH !== 'undefined' && TECH[t] ? TECH[t].name : t);   // TECH is a top-level const, not on window
  const NL = 3.3;   // em of card per line: a beat is as tall as its lines

  function beat(b, n, P) {
    const out = P.loops.filter((l) => l[0] === b.id), back = P.loops.filter((l) => l[1] === b.id);
    const ticks = Array.from({ length: b.lines }, () => '<i></i>').join('');
    return `<div class="pBeat" data-b="${b.id}" style="min-height:${b.lines * NL}em"><div class="pTicks">${ticks}</div><div class="pIn">`
      + `<div class="pTop"><span class="pN">${n}</span><b>${esc(b.job)}</b><em>${b.lines} réplique${b.lines > 1 ? 's' : ''}</em></div>`
      + `<div class="pTags"><button type="button" data-t="${esc(b.tech)}">${esc(techName(b.tech))}</button><span>${esc(b.pattern)}</span></div>`
      + `<p>${esc(b.what)}</p>`
      + (b.ex ? `<div class="pEx">${b.ex.map((l) => `<span>${esc(l)}</span>`).join('')}</div>` : '')
      + (b.choice ? `<div class="pCh"><small>Choix · ${esc(b.choice.by)}</small>${b.choice.opts.map(([t, a, f]) => `<span>${esc(t)} <i>${esc(a)}</i>${f ? `<u>trace : ${esc(f)}</u>` : ''}</span>`).join('')}</div>` : '')
      + back.map((l) => `<div class="pLoop in">↰ ${esc(l[2])}</div>`).join('')
      + out.map((l) => `<div class="pLoop">↳ ${esc(l[2])}${l[1].startsWith('ep:') ? ` · <b>${esc(l[1].slice(3))}</b>` : ''}</div>`).join('')
      + '</div></div>';
  }

  // the page, then the loops drawn once it is laid out
  function render(el, P = LC) {
    let n = 0;
    const beats = (list) => list.map((b) => beat(b, ++n, P)).join('');
    const eps = [...new Set(P.loops.filter((l) => l[1].startsWith('ep:')).map((l) => l[1]))];
    el.innerHTML = `<span class="kick">Exemple · reconstitué depuis le jeu</span><h2>${esc(P.title)}</h2>`
      + '<div class="pTurn"><small>1 · Décidé en premier : le tournant</small><p>' + esc(P.turn) + '</p>'
      + '<small>2 · Ce qu’il doit trouver en place</small><ul>' + P.needs.map(([k, v]) => `<li><b>${esc(k)}</b> ${esc(v)}</li>`).join('') + '</ul>'
      + '<small>3 · Les beats, dans l’ordre</small><p class="pLeg"><span class="tk"></span> une réplique &nbsp; <span class="lp"></span> une boucle : revient plus tard</p></div>'
      + `<div class="pFlow">${P.scenes.map((s) => s.split
        ? `<div class="pSplit"><h3>${esc(s.split)}</h3>${s.lanes.map((l) => `<div class="pLane"><h4>${esc(l.title)}</h4>${beats(l.beats)}</div>`).join('')}</div>`
        : `<h3>${esc(s.title)}</h3><p class="pWho">${esc(s.who)}</p>${beats(s.beats)}`).join('')}`
      + eps.map((e) => `<div class="pExt" data-b="${esc(e)}">${esc(e.slice(3))}</div>`).join('')
      + '<svg class="pSvg" aria-hidden="true"></svg></div>';
    requestAnimationFrame(() => draw(el, P));
  }

  // each loop: from the right edge of its setup to the right edge of its payoff, through its own lane of the gutter
  // (lanes given so that two loops that overlap in height never share one)
  function draw(el, P) {
    const flow = el.querySelector('.pFlow'), svg = flow.querySelector('.pSvg'), box = flow.getBoundingClientRect();
    const at = (id) => { const e = flow.querySelector(`[data-b="${CSS.escape(id)}"]`); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.right - box.left, y: r.top - box.top + Math.min(r.height / 2, 28) }; };
    const segs = P.loops.map((l, i) => { const a = at(l[0]), b = at(l[1]); return a && b ? { i, a, b, lo: Math.min(a.y, b.y), hi: Math.max(a.y, b.y) } : null; }).filter(Boolean)
      .sort((p, q) => (p.hi - p.lo) - (q.hi - q.lo));
    const lanes = [];
    for (const s of segs) { let k = 0; while ((lanes[k] || []).some((o) => !(s.hi < o.lo - 6 || s.lo > o.hi + 6))) k++; (lanes[k] = lanes[k] || []).push(s); s.k = k; }
    const right = Math.max(...segs.map((s) => Math.max(s.a.x, s.b.x))), step = Math.max(6, Math.min(11, (box.width - right - 4) / Math.max(1, lanes.length)));
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`); svg.style.height = box.height + 'px';
    svg.innerHTML = '<defs><marker id="pArr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z" fill="#ff9f0a"/></marker></defs>'
      + segs.map((s) => { const x = right + 4 + step * (s.k + .5), r = 5, d = s.b.y > s.a.y ? 1 : -1;
        return `<path data-l="${s.i}" d="M${s.a.x} ${s.a.y} H${x - r} Q${x} ${s.a.y} ${x} ${s.a.y + r * d} V${s.b.y - r * d} Q${x} ${s.b.y} ${x - r} ${s.b.y} H${s.b.x + 2}" marker-end="url(#pArr)"/>`
          + `<circle cx="${s.a.x}" cy="${s.a.y}" r="3.2"/>`; }).join('');
  }

  // a tap on a beat: only its loops stay lit
  function focus(el, id, P = LC) {
    const on = new Set(P.loops.map((l, i) => (l[0] === id || l[1] === id ? String(i) : null)).filter(Boolean));
    el.classList.toggle('pFocus', !!id && on.size > 0);
    for (const p of el.querySelectorAll('.pSvg path')) p.classList.toggle('on', on.has(p.dataset.l));
    for (const b of el.querySelectorAll('.pBeat')) b.classList.toggle('on', b.dataset.b === id || P.loops.some((l) => (l[0] === id && l[1] === b.dataset.b) || (l[1] === id && l[0] === b.dataset.b)));
  }

  return { LC, render, focus };
})();
