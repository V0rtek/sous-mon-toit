// Infos › Spark › Le deck (31/10): the pitch deck for the Spark stage, full width. One slide per beat of "Sur scène · le pitch"
// (the plan is in #spark). Tap right = next, left = back, arrows too. A photo slot (the selfies of [X] and [Y], their characters)
// takes a picture from the phone and keeps it on this device; the line under [X] is typed in place.
window.DECK = (() => {
  const KEY = 'smt-deck', load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  let saved = load(), i = -1, root;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch { /* full or private window */ } };
  // 01/11: 6 slides added (the problem ×3, the investment, why me, the questions); the notes typed before follow their slide
  if (!saved.v) {
    const moved = (o) => (o < 4 ? o : o < 16 ? o + 3 : o === 16 ? 20 : o + 5), old = {};
    for (const k of Object.keys(saved)) if (/^note_\d+$/.test(k)) { old[k] = saved[k]; delete saved[k]; }
    for (const [k, v] of Object.entries(old)) saved['note_' + moved(+k.slice(5))] = v;
    saved.v = 2; save();
  }
  // 02/11: the « top 10 » slide goes in before 0 $ (slide 23): the notes from there on move one further
  if (saved.v === 2) {
    const old = {};
    for (const k of Object.keys(saved)) if (/^note_\d+$/.test(k) && +k.slice(5) >= 22) { old[k] = saved[k]; delete saved[k]; }
    for (const [k, v] of Object.entries(old)) saved['note_' + (+k.slice(5) + 1)] = v;
    saved.v = 3; save();
  }
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
    ['Last call', 'covers/lastcall_deck.jpg', ['chars/brooke/texting.webp'], ['', [], 'wc'], ''],
  ];
  // the last slide (and stage 3 of the plan): the questions they'll ask after, and what I answer (from the YC application, 01/11)
  const QA = [
    ['C’est pas juste Showrunner?', [
      'Eux misent sur les graphismes. Moi sur l’histoire et la personnalisation.',
      'Showrunner pense que les gens veulent scripter leurs épisodes. Ils veulent des émotions tout de suite, avec leurs amis, sans effort.',
      'Ce qui accroche un public : le conflit, le but du perso, le suspense, les twists. Les graphismes arrivent loin derrière. Joker 2 et Justice League : des graphismes fous, des flops.',
      'Vidéo IA : environ 30 $ la minute en 1080p. Mes feuilles de poses : environ 0,66 $ la minute.']],
    ['Pourquoi pas de la vidéo IA?', [
      'Un jeu de choix, c’est un arbre : chaque branche est une vidéo que quelqu’un paie.',
      '5 épisodes, 15 choix = 65 535 vidéos.',
      'En vidéo IA (Veo 3.1 Lite) : 196 605 $. Chez nous : 655 $ (environ 1 ¢ de texte par branche, joué sur le cell).']],
    ['Comment tu fais de l’argent?', [
      'Les 4 premiers épisodes sont gratuits : on paie quand on est accroché.',
      'Ensuite, l’hôte paie : 8 à 14 $ par mois, ou 4,99 $ la saison.',
      'Plus d’un perso par compte = abonné.',
      'Des packs de mondes en partenariat avec des séries : « Tu es un Jedi dans Star Wars ».',
      'Si ça devient comme Episode (Pocket Gems) : plus de 1 M$ par mois.']],
    ['C’est quoi la différence avec Netflix, ou un jeu?', [
      'Le produit combine trois choses normalement séparées.',
      'La personnalisation : l’histoire, c’est toi et tes amis.',
      'L’agentivité : tu changes ce qui arrive.',
      'Le lien social : vous la vivez ensemble, même à distance.',
      'Netflix n’a aucun des trois. Un jeu a l’agentivité, rarement le reste.']],
    ['Pourquoi maintenant?', [
      'Le contenu IA devient infini : ce qui reste rare, c’est une histoire faite pour ton groupe, vécue ensemble.',
      'Le jeu vidéo et le cinéma fusionnent : c’est un nouveau marché (Maria Valenzuela, ex-SVP Sony Pictures).',
      'L’IA rend la personnalisation presque gratuite : un selfie devient un perso qui joue ses poses.']],
    ['Pourquoi toi?', [
      'Le problème demande 3 compétences en même temps, et j’ai les trois.',
      'Les jeux : 50+ depuis 14 ans, dont un open world avec une communauté et un cofounder.',
      'Le procédural : un générateur de villages. Des arbres de choix qui tiennent debout.',
      'Le récit : j’écris des histoires depuis 11 ans, j’étudie la théorie du récit depuis 14 ans, 100+ histoires. J’entraîne l’IA dessus.']],
    ['Où t’en es?', [
      'Pivot #12. 2 ans à temps partiel, les 3-4 derniers mois à temps plein, 15 h par jour.',
      'La version web rapide marche (ce que vous venez de voir). Je commence les tests avec de vrais joueurs.',
      'Je fais tout moi-même : le code, les histoires, le pitch.']],
    ['L’IA peut pas écrire de bonnes histoires.', [
      'Seule, non. Avec une structure en dessous, oui.',
      'Chaque épisode suit 5 étapes : investissement, escalade, révélation, crise, payoff. Plus une banque de techniques et du procédural.',
      'J’itère pour que chaque épisode maximise le hook et l’envie de voir la suite.']],
    ['Les images sont simples, non?', [
      'Garfield : environ 17 000 histoires de 3 cases depuis 1978. Toujours le même chat, une poignée de poses.',
      'Et ça rapporte entre 750 M$ et 1 G$ de produits dérivés par année.',
      'Ce qui accroche, ce n’est pas l’image : c’est le personnage et l’histoire.']],
    ['Ça coûte combien, un perso?', [
      '0 $. 4 images gratuites par jour sur ChatGPT × 6 poses = 24 poses et expressions.',
      'Les décors sont faits d’avance, adaptés aux poses. Une pose sert dans toutes les scènes.']],
    ['C’est pour qui?', [
      'Des groupes d’amis, des couples, la famille : la soirée ciné, mais vous êtes dedans et vous décidez.',
      'Même à distance : chacun sur son cell, l’histoire le suit.',
      'Ça marche aussi en solo, et qui veut juste regarder peut couper les choix.']],
    ['Tu travailles seul?', [
      'Oui, je fais tout. Je me cherche un cofounder, mais j’avance sans attendre.']],
  ];
  let qa = -1;   // the question open on the last slide (-1 = none; a tap on the open one closes it)
  // the problem, one link at a time (a tap = the next one); the last one is the answer
  const CHAIN = [
    ['L’IA rend le contenu abondant.'],
    ['Le contenu perd sa rareté, sa valeur.'],
    ['Chacun regarde des histoires de plus en plus différentes.'],
    ['Les expériences partagées deviennent rares.'],
    ['Les moments qui nous lient disparaissent.', 'La dernière saison de GoT : tout le monde en parlait.'],
    ['Des histoires multijoueurs et personnalisées recréent ce moment.'],
  ];
  const S = [
    { c: '#ffd60a', h: () => `<small>Spark</small><h1>« Avant de commencer… »</h1><p>J'aimerais vous parler d'une merveilleuse rencontre que j'ai faite ce soir.</p>` },
    { c: '#ffd60a', h: () => `<small>Spark</small><h1>« Il me faut un volontaire pour que je prenne en photo. »</h1><p>Un étranger monte sur scène. Personne ne le connaît encore.</p>` },
    { c: '#ff9f0a', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}</div>` },
    { c: '#ff9f0a', h: () => '' },
    { c: '#ffd60a', steps: () => CHAIN.length, h: () => `<small>Le problème</small><ol class="dkChain">${CHAIN.map(([a, b], n) => `<li class="${n > sub ? 'off' : ''}${n === CHAIN.length - 1 ? ' fix' : ''}"><b>${a}</b>${b ? `<span>${b}</span>` : ''}</li>`).join('')}</ol>` },
    { c: '#ffd60a', h: () => `<div class="dkRow dkPics2">${slot('i1', 'Seul · le tunnel d’écrans')}<i class="dkArrow"></i>${slot('i2', 'Ensemble · les amis autour du cell')}</div>` },
    { c: '#ffd60a', h: () => `<div class="dkRefs"><figure><img src="ref/maria_valenzuela.webp" alt=""><div><b>Maria Valenzuela</b><span>ex-SVP, Sony Pictures</span></div></figure><figure><img src="ref/doug_shapiro.webp" alt=""><div><b>Doug Shapiro</b><span>Analyste média · ex-Turner</span></div></figure></div><h1>« Les gens ne veulent pas créer leur divertissement. Ils veulent qu'on le crée pour eux. »</h1><p>— Maria Valenzuela</p>` },
    { c: '#ff375f', h: () => `<div class="dkRow">${slot('x', 'Photo de [X]')}<i class="dkArrow"></i>${slot('xc', 'Son perso', sub && saved.xc2 ? 'xc2' : 'xc')}</div>`, steps: () => (saved.xc2 ? 2 : 1) },
    { c: '#ff375f', h: () => `<h2>Le catalogue d'histoires</h2><div class="dkCat">${CAT.map(([t, bg, cs, [hb, hs, hk], tz, pick]) => `<div class="dkCard${pick ? ' pick' : ''}" style="${bg ? `background-image:url(${bg})` : ''}">${cs.map((c) => `<img class="dkCh" src="${c}" alt="">`).join('')}<b>${esc(t)}</b><div class="dkHv ${hk || ''}"${hb ? ` style="background-image:url(${hb})"` : ''}>${hk === 'wc' ? WC : ''}${hs.map((u) => `<img src="${u}" alt="">`).join('')}<span>${esc(tz)}</span></div></div>`).join('')}</div>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 1</small><h1>L'histoire commence.</h1><p>Les impressionner, les accrocher dès le début.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 2</small><h1>Le suspense monte.</h1><p>Un choix approche. La salle a hâte de le savoir.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 3</small><h1>Lily a le pouvoir sur l'histoire.</h1><p>Plot twist. Le choix lui est donné, tout simplement. Pause pour expliquer.</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 4</small><h1>Les enjeux montent.</h1><p>Mini-climax : la salle a hâte de voir les conséquences. Un nouveau perso entre : [Y].</p>` },
    { c: '#ff375f', h: () => `<small>Démo · télé · 5</small><h1>Plot twist : c'est du multijoueur.</h1><p>Un choix qui compte, fait par quelqu'un d'autre dans la salle.</p>` },
    { c: '#ff375f', h: () => `<h1>« What's amazing with a choice game. Is that if you hide the choices and pick them for the player it is literally a movie. »</h1>` },
    { c: '#ff375f', h: () => `<small>Pourquoi ça marche</small><h1>Lower volume = drags us in.</h1><p>Everyone wanna know what's next.</p>` },
    { c: '#ffd60a', h: () => `<h1>Il y avait quelqu'un d'autre.</h1><div class="dkRow">${slot('y', 'Selfie de [Y]')}<i class="dkArrow"></i>${slot('yc', 'Son perso')}</div><p>Il est dans la salle. Il joue depuis tout à l'heure. Le personnage arrive dans l'histoire : c'est lui.</p>` },
    { c: '#ff375f', full: true, h: () => `<img class="dkFull" src="ref/brainstorm_couch.webp" alt="Deux amis sur un divan, chacun son cell avec son perso, l'histoire sur la télé">` },
    { c: '#30d158', wall: true, h: () => `<div class="dkQuad"><img src="ref/suit_tele.webp" alt="Deux amis devant la télé, l’histoire de pirates à l’écran"><img src="ref/suit_cells.webp" alt="Chacun sur son cell, l’un aux toilettes, l’autre sur le divan"><img src="ref/suit_cell.webp" alt="Elle suit l’histoire sur son cell"><div class="dkWall">${WALL.map(([a, b]) => `<div><img src="${a}" alt=""><i class="dkArrow"></i><img class="dkAnim" src="${b[0]}" alt=""></div>`).join('')}</div></div>` },
    { c: '#30d158', h: () => `<small>Trois choses normalement séparées</small><div class="dkSkills"><div><b>Personnalisation</b><span>L’histoire, c’est toi et tes amis.</span></div><div><b>Agentivité</b><span>Tu changes ce qui arrive.</span></div><div><b>Lien social</b><span>Vous la vivez ensemble, même à distance.</span></div></div><p>Netflix ne fait aucun des trois.</p>` },
    { c: '#ff375f', h: () => `<h1>« Ok mais Justin, n'importe qui peut recréer ça en 1 semaine de nos jours. »</h1><p>Étrangement, non.</p>` },
    { c: '#0a84ff', h: () => `<small>Pourquoi moi</small><div class="dkSkills"><div><b>Jeux</b><span>50+ depuis 14 ans</span></div><div><b>Procédural</b><span>Des arbres de choix qui tiennent</span></div><div><b>Récit</b><span>100+ histoires</span></div></div><p>Il faut les trois en même temps.</p>` },
    { c: '#ff375f', h: () => `<small>Ce qui accroche un public · top 10</small><ol class="dkTop"><li>Le conflit</li><li>Le but du perso</li><li>Le suspense</li><li>Les twists</li><li class="gap">…</li><li class="last" value="10">Les beaux graphismes</li></ol><p>Joker 2 et Justice League : des graphismes fous, des flops. Une bonne histoire bat tout.</p>` },
    { c: '#ffd60a', h: () => `<div class="dkZero">0 $</div><p class="dkZeroP">Un nouveau perso : 24 poses, avec 4 images gratuites sur ChatGPT.</p>` },
    { c: '#30d158', h: () => `<small>Je cherche</small><ul class="dkAsk"><li>Des groupes de 2-3 pour tester<span>10 minutes, je me déplace. Si vous dites oui : accès gratuit au produit et à toutes les histoires.</span></li><li>Un cofounder</li></ul>` },
    { c: '#0a84ff', h: () => `<small>Questions</small><div class="dkQA"><div class="dkQs">${QA.map(([q], n) => `<button type="button" data-qa="${n}"${n === qa ? ' class="on"' : ''}>${esc(q)}</button>`).join('')}</div><div class="dkAns">${qa < 0 ? '' : `<h2>${esc(QA[qa][0])}</h2><ul>${QA[qa][1].map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`}</div></div>` },
  ];
  // what I say on each slide (mine to edit, kept on this device); behind the corner button
  const NOTES = [
    "« Avant de commencer, j'aimerais vous parler d'une merveilleuse rencontre que j'ai faite ce soir… » Une seule : [Y] n'existe pas encore pour la salle.",
    "« Il me faut un volontaire pour que je prenne en photo. » Un étranger monte sur scène : c'est lui, [Y], qui pose pour la photo.",
    "[X], présenté en une phrase : « [X] est en cybersécurité et adore… » Slide : sa photo.",
    "Slide vide. « Or avant ce soir — et c'est important — je ne le connaissais pas. J'y reviens plus tard. »",
    "Lent, un maillon par tap. L'IA rend le contenu abondant → il perd sa rareté, sa valeur → chacun regarde des histoires différentes → les expériences partagées deviennent rares → les moments qui nous lient disparaissent (la dernière saison de GoT : tout le monde en parlait, ça criait à table chez nous) → des histoires multijoueurs et personnalisées recréent ce moment.",
    "Les deux images : seul dans le tunnel d'écrans → des amis qui rient autour d'un cell. (Tape un cadre pour mettre l'image, elle reste sur cet appareil.) Je les laisse parler, une seconde de silence.",
    "Mes 2 références. Conférence sur le futur du cinéma avec l'IA : Maria Valenzuela (ex-SVP Sony Pictures) et Doug Shapiro (analyste média) ont exposé ce problème qui s'en vient. Maria prédit l'explosion du contenu IA et la fusion du cinéma et du jeu vidéo. Et : les gens veulent qu'on crée pour eux, selon leurs goûts. La solution : une histoire faite pour ton groupe, avec vous dedans, où chacun change la suite. « Je vous montre. »",
    "Son selfie, une flèche vers son perso.",
    "Le catalogue d'histoires : je clique sur une histoire de pirates immersive. Démo · télé.",
    "1. J'introduis l'histoire, je les impressionne et je les accroche dès le début.",
    "2. On monte le suspense vers un choix : les gens ont hâte de le savoir.",
    "3. Plot twist : Lily a du pouvoir sur l'histoire, un pouvoir cool que les gens aimeraient avoir. Je montre simplement comment le choix est donné. Pause pour expliquer un peu.",
    "4. Les enjeux montent : les gens ont hâte de voir les conséquences du choix (mini-climax). Et un nouveau perso arrive : [Y], annoncé plus tôt (« J'y reviens plus tard »).",
    "5. Plot twist : c'est en fait du multijoueur, et le choix qui compte a été fait par une autre personne dans la salle.",
    "« What's amazing with a choice game. Is that if you hide the choices and pick them for the player it is literally a movie. » Je dis la phrase telle quelle : c'est un film, sauf que la salle choisit.",
    "Lower volume = ça les aspire. Tout le monde veut savoir la suite. Raconter avec du ressenti : « J'aime écouter des thrillers avec mon partenaire. » « Soirée ciné entre amis. »",
    "Au 2e choix, pause : le plot twist. « Il y avait quelqu'un d'autre. » Le selfie de [Y], une flèche vers son perso : il est dans la salle et il joue depuis tout à l'heure. Le personnage arrive dans l'histoire : c'est lui.",
    "Deux amis sur un divan, chacun son cell avec son perso, l'histoire sur la télé.",
    "Devant la télé, ensemble. Chacun sur son cell, même aux toilettes : l'histoire le suit. Elle continue sur son cell. Tous ces persos viennent d'une photo, chacun joue ses poses.",
    "Après la démo. Le produit combine trois choses normalement séparées : la personnalisation (l'histoire, c'est toi et tes amis : tu ES le perso), l'agentivité (tu changes ce qui arrive : c'est MOI qui l'ai fait, pas le perso), le lien social (vous la vivez ensemble, même à distance). Netflix ne fait aucun des trois.",
    "« Ok mais Justin, n'importe qui peut recréer ça en 1 semaine. » Étrangement, non : je montre le concept de monde, d'histoires et mon système d'histoire.",
    "Il faut 3 choses en même temps : faire des jeux (l'interactif, le visuel), le procédural (des arbres de choix qui tiennent), la théorie du récit (des épisodes qui accrochent). Je fais les trois depuis 14 ans : 50+ jeux, un générateur de villages, 100+ histoires.",
    "Demandez à n'importe quelle IA les 10 façons prouvées de faire une série qui accroche son public. Les bons graphismes arrivent 10e. Derrière le conflit, le but du perso, le suspense et les twists. Joker 2 et Justice League ont floppé, même avec des graphismes de fou. Une bonne histoire bat tout.",
    "Ce que coûte un nouveau perso : 0 $. 4 images gratuites par jour sur ChatGPT × 6 poses = 24 poses et expressions. Les décors sont faits d'avance pour les poses. La vidéo IA : environ 30 $ la minute.",
    "Je suis en phase de validation. Je cherche des groupes de 2-3 personnes prêts à prendre 10 minutes pour essayer le produit : je fais le déplacement. Si vous êtes curieux d'essayer les autres histoires, venez me voir : si vous dites oui, je vous donne accès au produit et aux histoires gratuitement. Et je cherche un cofounder. \"That part is very difficult for me, but I gotta show the unfinished product, so if you guys are hyped about this, I would love to meet you for a little 10 mins.\"",
    "Les questions : je tape celle qu'on me pose, la réponse s'affiche. Les mêmes sont dans le plan (slide 0, étape 3).",
  ];
  // slide 0, under the plan: my notepad for how to say it (mine to edit, kept on this device)
  const PAD = "Share those informations as \"what's interesting is that we saw x stat\", not like a salesman tryna prove or convince.\nSpeak in a tone that makes people believe (the smoking speaker).\n\n\"What's amazing with a choice game. Is that if you hide the choices and pick them for the player it is literally a movie.\"\n\nLower volume = drags us in. Everyone wanna know what's next.\n\nSpeak with stories and relatable feeling:\n- I like listening to thrillers with my partner\n- Movie night with my friends\n\n\"Humans are like water. If there's a wall we try and get around it.\" (pirated episodes)";
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
      root = el; i = -1; sub = 0; qa = -1;
      el.innerHTML = '<div class="dkPrep"><button type="button" class="dkLink">Showrunner →</button><div class="pnHost"></div><div class="dkPlan"></div><div class="dkPad"><b>Bloc-notes</b><div class="dkPadTx" contenteditable="true" spellcheck="false"></div></div></div><div class="dkSlide"></div><div class="dkBar"><i></i></div><span class="dkN"></span><div class="dkNote" contenteditable="true" spellcheck="false" hidden></div><button type="button" class="dkNoteBtn" aria-label="Mes notes">✎</button>';
      el.onclick = (e) => {
        if (i < 0) { const l = e.target.closest('.dkLink'); if (l) { window.SPARK_TO_SHOWRUNNER(); return; } if (!e.target.closest('.pnIcon, .pnBtn, .dkPad')) go(1); return; }   // slide 0: the files and prompts, anywhere else = next
        if (e.target.closest('.dkNoteBtn')) { noteOpen = !noteOpen; root.querySelector('.dkNote').hidden = !noteOpen; return; }
        const q = e.target.closest('[data-qa]');
        if (q) { qa = qa === +q.dataset.qa ? -1 : +q.dataset.qa; draw(); return; }
        if (e.target.closest('.dkAns')) return;
        const p = e.target.closest('.dkPic');
        if (p || e.target.closest('.dkTyped, .dkNote')) return;
        const r = el.getBoundingClientRect(); go(e.clientX - r.left < r.width / 3 ? -1 : 1);
      };
      el.onchange = (e) => { const p = e.target.closest('.dkPic'); if (p && e.target.files[0]) pick(e.target.files[0], p.dataset.k); };
      el.oninput = (e) => { if (e.target.closest('.dkPadTx')) { saved.pad = e.target.closest('.dkPadTx').innerText; save(); return; } const nt = e.target.closest('.dkNote'); if (nt) { saved['note_' + i] = nt.textContent; save(); return; } const t = e.target.closest('.dkTyped'); if (t && t.dataset.name) { saved['n_' + t.dataset.name] = t.textContent.trim(); save(); return; } if (t) { saved['t_' + t.dataset.t] = t.textContent; save(); } };
      el.querySelector('.dkPlan').appendChild(document.getElementById('sparkPlan').content.cloneNode(true));
      el.querySelector('.dkPlan .spark').insertAdjacentHTML('beforeend', '<div class="sp-arrow"></div><div class="sp-stage" style="--g:#0a84ff"><div class="sp-tag"><i>3</i>Les questions · mes réponses</div>'
        + QA.map(([q, a]) => `<div class="sp-card"><b>${esc(q)}</b>${a.map((l) => `<small>${esc(l)}</small>`).join('')}</div>`).join('') + '</div>');
      el.querySelector('.dkPadTx').textContent = saved.pad ?? PAD;
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
