// ---- Infos · Acte: one act of 5 episodes, planned before any of them (what happens, never what's said). For now always
// the same arc, the one a basic model can fill: justin between two people he cares about (A and B). A asks him for
// something that hurts B; he tries to keep both and it gets worse; a secret changes what he believed about one of them;
// in episode 4 he must pick A or B; episode 5 shows what it cost. The act has its own techniques (AT: how a field is
// done well, flat version -> the one that works), given to the act's prompt and to each episode's prompt.
// Two views: Générer = the 3 layers one after the other (the act -> an episode's plan -> its story: copy a prompt, paste
// the answer), Visuel = the act on top and its 5 episodes side by side (one step of System each: its techniques, what
// it must contain, a tap = done ✓; orange = a setup, planted -> recalled -> paid; purple = the secret, raised -> out).
// Kept on this phone ----
window.ACT = (() => {
  // techniques.js's steps and cards (top-level consts: not on window)
  const STAGES = () => (typeof TECH_STAGES !== 'undefined' ? TECH_STAGES : []), CARD = (id) => (typeof TECH !== 'undefined' ? TECH[id] : null);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const cap = (s) => String(s || '?').charAt(0).toUpperCase() + String(s || '?').slice(1);
  // Isa's look is picked among several sheets: the first one stands for her
  const face = (id) => { if (id === 'isa' && typeof ISA_LOOKS !== 'undefined') id = ISA_LOOKS[0].sprite; const S = window.SPRITES && SPRITES[id]; const pose = S ? (S.poses.listen ? 'listen' : Object.keys(S.poses)[0]) : null;
    return `<span class="pFace">${pose ? `<img src="chars/${id}/${pose}.webp" alt="">` : ''}</span>`; };

  // ---- the act's techniques: what makes a field work. n, how, ex = [flat, works] (here, in French); en, enEx = the
  // same for the prompts. The flat examples come from the act "The Empty Place" (30/10), which didn't work ----
  const AT = {
    visible: { n: 'Ce que l’écran montre', how: 'Le joueur ne voit que le décor, les persos, leurs poses et les répliques. Rien d’autre n’existe : pas de geste qu’on ne voit pas (compter les lumières, jouer avec une pièce), pas d’objet qui n’est pas dans le décor (une caisse). Si une chose compte, une réplique dit clairement ce que c’est, dès la première fois.',
      ex: ['Il compte les lumières du plafond. / Il fait tourner une pièce. / Où est la caisse ?', '« T’as vendu le bateau de papa sans me demander. » (ce qui compte est dit, rien à voir de plus)'],
      en: 'The player only sees the decor, the characters, their poses and the lines. Nothing else exists: no gesture the screen does not show (counting the lights, flipping a coin), no object that is not in the decor (a crate). If something matters, a line says plainly what it is, the first time it comes up.',
      enEx: ['He counts the lights on the ceiling. / He flips a coin. / Where is the crate?', '"You sold Dad\'s boat without asking me." (what matters is said, nothing else to see)'] },
    because: { n: 'Vouloir + raison', how: 'Chaque perso veut une chose qu’il demande à voix haute, et finit la phrase « parce qu’il croit que… ». Sans raison, c’est le scénario qui veut, pas lui.',
      ex: ['Nora veut empêcher Leo de partir.', 'Nora veut que Justin rate l’audition, parce qu’elle croit que le groupe meurt le jour où il devient connu.'],
      en: 'Each one wants something they ask justin for out loud, and finishes the sentence "because they believe that...". A want without a reason is the script wanting, not them.',
      enEx: ['Nora wants to stop Leo leaving.', 'Nora wants justin to skip the audition, because she believes the band dies the day he gets famous.'] },
    here: { n: 'Ici et maintenant', how: 'L’enjeu se joue entre les gens à l’écran, ce soir. Pas d’institution, pas de personnage clé qu’on ne voit jamais. Un absent n’est qu’une raison d’agir, jamais celui qui agit.',
      ex: ['La sœur (jamais vue), le conseil de la ville, la porte de l’est.', 'Leo demande à Justin de le couvrir ce soir. Son patron est à la table d’à côté.'],
      en: 'What is at stake is between the people on screen, tonight. No institution, no key character we never see. Someone absent can only be a reason to act, never the one who acts.',
      enEx: ['The sister (never seen), the city council, the eastern gate.', 'Leo asks justin to cover for him tonight. His boss is at the next table.'] },
    danger: { n: 'Danger présent', how: 'Ce qui peut être perdu se voit dans la scène : quelqu’un qui part, un lien qui casse devant témoins, une vérité qui va sortir. On le voit, pas besoin de l’expliquer.',
      ex: ['Faire sortir la sœur de la ville (fuir quoi ?).', 'Sam : « Signe le bail avec moi ce soir, ou je donne la chambre à Théo. »'],
      en: 'What can be lost is visible in the scene: someone leaving, a bond breaking in front of others, a truth about to come out. We see it, nobody has to explain it.',
      enEx: ['Get the sister out of the city (escape what?).', 'Sam: "Sign the lease with me tonight, or the room goes to Theo."'] },
    past: { n: 'Le passé en une phrase', how: 'Le passé tient en une phrase, encore vraie aujourd’hui. Pas de chaîne d’événements anciens : un passé de deux phrases ne rentre pas dans un épisode de 24 répliques.',
      ex: ['L’été dernier, Leo a aidé son cousin à fuir avec l’aide de Nora, qui l’a laissé porter le blâme, et le cousin l’a découvert…', 'L’hiver dernier, Justin a pris le blâme pour l’accident de son frère.'],
      en: 'The past fits in ONE sentence, still true today. No chain of old events: a past that needs two sentences does not fit in a 24-line episode.',
      enEx: ['Last summer Leo helped his cousin run away with Nora\'s help, Nora let him take the blame, and the cousin found out...', 'Last winter, justin took the blame for his brother\'s crash.'] },
    secret: { n: 'Un secret qui explique un geste', how: 'Le secret appartient à celui qu’il explique. Avant la révélation, ce perso fait déjà une chose étrange qu’on voit ; après, ce geste a un sens.',
      ex: ['Le secret « de Leo » raconte ce que Nora a fait.', 'Nora a envoyé le courriel qui a fait renvoyer Justin. Avant, c’est elle qui lui répète d’oublier cette job.'],
      en: 'The secret belongs to the person it explains. Before it comes out, that person already does something odd that we see; after, that gesture makes sense.',
      enEx: ['"Leo\'s" secret tells what Nora did.', 'Nora sent the email that got justin fired. Before, she is the one who keeps telling him to forget that job.'] },
    plant: { n: 'Un plant qui se voit', how: 'Le plant est dans une réplique : un mot, un geste nommé, un objet tenu. Il passe pour autre chose (une blague, une habitude), puis le secret lui donne son sens. Rien à remarquer en silence : le jeu n’a que des répliques.',
      ex: ['Nora pose trois tasses pour deux.', 'Nora : « Les mots de passe, c’est ma spécialité. Demande à n’importe qui. » (dit en riant, comme une blague)'],
      en: 'A plant is in a line: a word, a gesture someone names, an object someone holds. It passes for something else (a joke, a habit); the secret later gives it its meaning. Nothing to notice in silence: the game only has lines.',
      enEx: ['Nora sets three cups for two.', 'Nora: "Passwords are my thing. Ask anyone." (said laughing, like a joke)'] },
    easy: { n: 'Effort minimal, échec qui empire', how: 'Justin tente ce que n’importe qui ferait d’abord : un petit mensonge, gagner du temps. Ça casse devant la personne qu’il voulait protéger, et ça la blesse plus que la vérité.',
      ex: ['Il promet à l’une la porte, à l’autre l’audience.', 'Il dit à Nora qu’il a refusé l’audition. Le metteur en scène l’appelle : « À lundi, Justin. »'],
      en: 'justin tries what anyone would try first: a small lie, buying time. It breaks in front of the person he wanted to protect, and hurts them more than the truth would have.',
      enEx: ['He promises one the gate and the other the hearing.', 'He tells Nora he turned the audition down. The director calls: "See you Monday, justin."'] },
    same: { n: 'Le même moment, deux demandes', how: 'A et B demandent la même chose précise au même moment : il ne peut physiquement pas faire les deux. Chaque côté a une raison qu’on comprend.',
      ex: ['Porte de l’est à 6 h contre audience à 6 h (deux absents de plus).', 'Samedi midi : il est le témoin au mariage de Leo. Sam prend l’avion à la même heure : « Viens, ou rappelle-moi plus. »'],
      en: 'A and B ask for the same precise moment: he physically cannot do both. Each side has a reason we understand.',
      enEx: ['The eastern gate at six against the hearing at six (two more absent things).', 'Saturday noon: he is the best man at Leo\'s wedding. Sam flies out the same hour: "Come, or stop calling me."'] },
  };
  AT.loop = { n: 'Une question ouverte', how: 'L’épisode ouvre une question que le joueur veut voir répondue, et ne la ferme pas. La plus forte : deux persos à l’écran ne racontent pas le même passé. Personne n’explique, quelqu’un change de sujet : le joueur reste avec la question. Un choix n’est pas une accroche (ce que Justin répond, le joueur le décide lui-même) ; un passé raconté puis fermé non plus.',
    ex: ['Leo : « Je suis pas venu à l’hôpital, j’avais peur. » (dit, expliqué, fermé : plus rien à savoir)', 'Justin : « T’es jamais venu à l’hôpital. » Leo : « J’y étais chaque soir. On m’a dit que tu voulais voir personne. » Nora : « Qui veut un verre ? »'],
    en: 'The episode opens a question the player wants answered, and does not close it. The strongest: two people on screen do not tell the same past. Nobody explains, someone changes the subject: the player is left with the question. A choice is not a hook (what justin answers, the player decides himself); a past told and closed is not one either.',
    enEx: ['Leo: "I didn\'t come to the hospital, I was scared." (said, explained, closed: nothing left to know)', 'justin: "You never came to the hospital." Leo: "I was there every night. They said you didn\'t want visitors." Nora: "Who wants a drink?"'] };
  AT.first = { n: 'La 1re réplique', how: 'Elle se comprend seule, sans rien savoir : un conflit, une surprise ou un aveu entre deux persos à l’écran, ici, maintenant. Le joueur se demande « pourquoi ? » ou « et alors ? ». Jamais une ambiance, une salutation, ni une chose qu’on ne voit pas.',
    ex: ['« La septième lumière porte chance ! » (de quoi elle parle ?) / « Belle soirée, hein ? »', 'Nora : « S’il s’assoit à cette table, moi je me lève. » / « Tu m’as gardé ma place. Même après ce que j’ai fait ? »'],
    en: 'It is understood alone, knowing nothing: a conflict, a surprise or a confession between two people on screen, here, now. The player asks "why?" or "and then?". Never a mood, a greeting, or something the screen does not show.',
    enEx: ['"The seventh light brings luck!" (what is she talking about?) / "Nice night, huh?"', 'Nora: "If he sits at this table, I\'m leaving it." / "You kept my seat. Even after what I did?"'] };
  AT.want = { n: 'Un rêve à lui', how: 'Justin veut une chose pour lui, depuis longtemps, avec sa raison : un rêve personnel qu’on comprend (partir, être libre, être reconnu, aimer quelqu’un). Pas « ce soir », pas pour quelqu’un d’autre. Il le dit lui-même, à voix haute, à quelqu’un à l’écran, avant la demande de A ; quelqu’un réagit (une blague, un doute). Puis la demande de A tombe dessus : dire oui l’en rapproche et blesse B, dire non l’en éloigne. Le choix lui coûte à lui, pas seulement aux autres.',
    ex: ['Justin veut passer une soirée tranquille avec elles. (ce soir, rien à poursuivre) / Justin veut être heureux.', 'Justin : « Un jour je joue sur une vraie scène. Pas dans ce bar. » Leo : « Tu dis ça chaque année. » (il rêve d’être entendu ; Leo a besoin de lui au bar ; Sam lui offre la scène)'],
    en: 'justin wants something for himself, for a long time, with its reason: a personal dream anyone understands (to leave, to be free, to be recognized, to love someone). Not "tonight", not for someone else. He says it himself, out loud, to someone on screen, BEFORE A asks; someone reacts (a joke, a doubt). Then A\'s request lands on it: yes brings him closer and hurts B, no takes it away. The choice costs HIM, not only the others.',
    enEx: ['justin wants a quiet evening with them. (tonight, nothing to chase) / justin wants to be happy.', 'justin: "One day I\'ll play a real stage. Not this bar." Leo: "You say that every year." (he dreams of being heard; Leo needs him at the bar; Sam offers him the stage)'] };
  AT.hook = { n: 'La fin qui promet', how: 'La dernière réplique annonce une suite précise qu’on veut voir : qui, quand, où, et ce qui va s’y jouer. Ou une surprise, ou une nouvelle question. Jamais la question du choix qu’on vient de faire, reposée ; jamais vague.',
    ex: ['« Ne promets rien que tu ne peux tenir. » (le choix, reposé) / « Il y aura des conséquences. » (vague)', '« On se voit au championnat ce soir. On va avoir une petite discussion. » / Leo : « Samedi, après le match. Tu le dis à papa, ou c’est moi. »'],
    en: 'The last line announces a precise next moment the player wants to see: who, when, where, and what will be settled there. Or a surprise, or a new question. Never the question of the choice just made, asked again; never vague.',
    enEx: ['"Don\'t promise what you can\'t keep." (the choice, asked again) / "There will be consequences." (vague)', '"See you at the championship tonight. We\'re gonna have a little talk." / Leo: "Saturday, after the game. You tell Dad, or I will."'] };
  AT.spark = { n: 'Une étincelle', how: 'Au moins une des deux est attirée par Justin (les deux, et c’est une rivalité). Ça se voit dans les répliques dès l’épisode 1 : une taquinerie qui dure un peu trop, un compliment qu’on regrette, une jalousie entre elles. Jamais dit (« je t’aime ») avant que l’histoire l’ait gagné. Le joueur se demande : « est-ce qu’elle… ? »',
    ex: ['Nora est amoureuse de Justin. (dit, rien à voir) / Nora : « Je t’aime. » (trop tôt, plus rien à attendre)', 'Nora : « T’as coupé tes cheveux. … Refais plus jamais ça, j’ai failli dire une niaiserie. » / Sam, à Nora : « Il est pris, ce soir. » Nora : « Ah oui ? »'],
    en: 'At least one of the two is drawn to justin (both, and it is a rivalry). It shows in the lines from episode 1: teasing that lasts a beat too long, a compliment someone regrets, jealousy between them. Never said ("I love you") before the story has earned it. The player wonders: "does she...?"',
    enEx: ['Nora is in love with justin. (told, nothing to see) / Nora: "I love you." (too soon, nothing left to wait for)', 'Nora: "You cut your hair. ...Never do that again, I almost said something stupid." / Sam, to Nora: "He\'s taken tonight." Nora: "Is he?"'] };
  const atLine = (id) => `- ${AT[id].n}: ${AT[id].en} Flat: "${AT[id].enEx[0]}" -> works: "${AT[id].enEx[1]}"`;

  // the two people, drawn for the act's prompt ("Autre" draws again): who they are to justin, never a job
  const PAIRS = [['his ex', 'his girlfriend now', 'son ex', 'sa blonde actuelle'], ['his father', 'his girlfriend', 'son père', 'sa blonde'],
    ['his best friend', 'his sister', 'son meilleur ami', 'sa sœur'], ['his mentor', 'his best friend', 'son mentor', 'son meilleur ami'],
    ['his girlfriend', 'his best friend', 'sa blonde', 'son meilleur ami'], ['his brother', 'his father', 'son frère', 'son père'],
    ['his best friend', 'his ex', 'son meilleur ami', 'son ex'], ['his business partner', 'his girlfriend', 'son associé', 'sa blonde'],
    ['his sister', 'his father', 'sa sœur', 'son père'], ['an old friend who just came back', 'his girlfriend', 'un vieil ami qui revient', 'sa blonde'],
    ['a friend of his father who sleeps on the couch', 'his father', 'une amie de son père qui dort au salon', 'son père'], ['his mother', 'his best friend', 'sa mère', 'son meilleur ami']];
  const DECORS_ALL = '"taverne" = melissa, candy, ruby (the terrace of a tavern above a fantasy city) · "maison" = ruby, james (inside a house) · "salon" = isa, amare, james (a living room). ruby, melissa, candy and isa are women, james and amare are men; ruby and melissa are elves, candy is a feline woman, amare is a lion-man';
  const DECORS = { toString: () => (window.COUNTER && COUNTER.on ? COUNTER.decor() : DECORS_ALL) };   // « Au comptoir » (Ton histoire): only the counter and who can lean there

  // the example, written by hand: what a filled act looks like (the reference the prompt has to reach)
  const EX = () => ({ v: 2, title: 'Sous mon toit', scene: 'salon', question: 'Dois-tu dire la vérité à ton père si elle va le briser ?',
    a: { id: 'isa', is: 'L’amie de son père, qui dort au salon depuis hier', wants: 'Que Justin ne dise pas à James qu’elle sort toutes les nuits', because: 'Elle croit que James la mettrait dehors s’il savait où elle va' },
    b: { id: 'james', is: 'Son père', wants: 'Que Justin veille sur Isa et lui dise tout', because: 'Il croit qu’Isa est fragile et qu’il est le seul à pouvoir la protéger' },
    justin_wants: 'Partir étudier à Montréal en septembre, parce qu’il veut enfin une vie à lui, mais il n’ose pas laisser James seul',
    past: 'Il y a dix ans, la mère de Justin est partie quand James a fait son coming out.',
    lost_if_no: 'Si Justin refuse, Isa fait déjà son sac : elle part ce soir, et James perd la seule amie qui est restée.',
    secret: { who: 'isa', what: 'C’est la mère de Justin qui envoie Isa : chaque nuit, elle sort pour lui donner des nouvelles de Justin' },
    setups: [{ plant: '« Bonne nuit, Juju. » Isa l’appelle par son surnom d’enfance, en riant, comme une blague', pay: '« Juju », c’est comme ça que sa mère l’appelait' },
      { plant: '« Souris ! » Isa prend en photo Justin devant la photo de famille, « pour se souvenir de son séjour »', pay: 'Les photos sont pour sa mère' }],
    episodes: [
      { ask: 'Isa lui demande de ne pas dire à James qu’elle sort la nuit', hurts: 'James lui a demandé de veiller sur elle : se taire, c’est mentir à son père', mystery: 'Justin : « Tu vas où, la nuit ? » Isa : « Voir quelqu’un qui t’aime. » Elle n’en dit pas plus', hook: 'À 3 h, Isa rentre et murmure au téléphone : « Il ressemble à toi. »' },
      { easy: 'Justin dit à James qu’Isa dormait', backfires: 'James l’a vue rentrer à 3 h : le menteur, maintenant, c’est Justin', hook: 'Une enveloppe tombe du sac d’Isa, adressée à « Juju »' },
      { reveal: 'Isa avoue : c’est la mère de Justin qui l’envoie', flip: 'On croyait qu’Isa cachait une liaison ; elle cachait une mère', hook: '« Elle est en ville. Demain soir. Seulement demain. »' },
      { clock: 'Demain soir, la mère repart à l’aube', a_asks: 'Isa : viens la voir demain soir, sans le dire à James', b_asks: 'James : demain soir, il présente Amare comme son fiancé, et il a besoin que Justin soit là' },
      { if_a: 'Justin voit sa mère ; au souper, sa chaise est vide, et James l’apprend par Amare', if_b: 'Justin reste ; Isa part à l’aube, une lettre de sa mère sur son oreiller', open: 'Pourquoi elle revient maintenant, après dix ans ?' },
    ], done: {}, picks: {}, plans: {} });

  // who the secret belongs to: its character's id (an older act says "a" or "b")
  const nm = (A, w) => cap(A[w] && A[w].id);
  const de = (name) => (/^[aeiouyhéè]/i.test(name) ? 'd’' : 'de ') + name;   // « d’Isa », « de James »
  const holderKey = (A) => { const w = A.secret && A.secret.who; return w === 'b' || (A.b && w === A.b.id) ? 'b' : 'a'; };
  const holder = (A) => nm(A, holderKey(A));
  const E = (A, n) => (A.episodes && A.episodes[n - 1]) || {};
  const S = (A, i) => (A.setups && A.setups[i]) || {};
  // the arc: per episode, its goal, what's at stake (it grows), its act techniques, and what it must contain:
  // [key, label here, label in the prompt, the act's value, thread]. Episode 1 carries three things and one plant
  const ARC = [
    { goal: 'Qu’on les aime, et qu’on voie le piège', en: 'the player cares about the people and sees the trap', stake: () => 'Ce qu’il veut', at: ['visible', 'first', 'spark', 'want', 'here', 'because', 'danger', 'loop', 'plant', 'hook'],
      items: (A) => [['first', 'La 1re réplique', 'The FIRST line (La 1re réplique): understood alone, knowing nothing; a conflict, a surprise or a confession between two people on screen', ''],
        ['love', `On aime ${nm(A, 'a')} et ${nm(A, 'b')}`, `The player likes ${nm(A, 'a')} and ${nm(A, 'b')} and their bond with justin, on what is happening right now ("char" or "rel"); at least one of them is drawn to him, and it shows (Une étincelle)`, ''],
        ['want', 'Justin veut', `What justin has wanted for a long time, and why (Un rêve à lui): he says it himself, out loud, BEFORE ${nm(A, 'a')} asks; the request then lands on it`, A.justin_wants],
        ['ask', `${nm(A, 'a')} demande`, `${nm(A, 'a')} asks justin, out loud, and we see what is lost if he says no`, [E(A, 1).ask, A.lost_if_no].filter(Boolean).join(' · ')],
        ['hurt', `Ça blesse ${nm(A, 'b')}`, `Why giving it hurts ${nm(A, 'b')}, shown`, E(A, 1).hurts],
        ['loop', 'La question ouverte', 'The question this episode opens and does NOT answer (it is answered by the secret, in episode 3): justin reacts to it, nobody explains', E(A, 1).mystery, 'sec'],
        ['s1', 'Planté', 'Plant it in a line, passing for something else', S(A, 0).plant, 's1'],
        ['end', 'Fin', 'The episode ends on (its turn, La fin qui promet)', E(A, 1).hook]] },
    { goal: 'Il essaie de garder les deux. Ça empire', en: 'he tries to keep both, and it gets worse', stake: (A) => `La confiance ${de(nm(A, 'b'))}`, at: ['visible', 'loop', 'easy', 'plant', 'secret', 'hook'],
      items: (A) => [['r1', 'Rappel', 'Bring it back, without explaining it', S(A, 0).plant, 's1'],
        ['easy', 'L’effort minimal', 'What justin tries first to keep both (the easy way)', E(A, 2).easy],
        ['s2', 'Planté', 'Plant it in a line, passing for something else', S(A, 1).plant, 's2'],
        ['worse', 'Ça empire', `It backfires and makes it worse with ${nm(A, 'b')}`, E(A, 2).backfires],
        ['sec', `Le secret ${de(holder(A))}, soulevé`, `${holder(A)} does the odd thing the secret will explain; the question is raised, never answered`, '', 'sec'],
        ['end', 'Fin', 'The episode ends on (its turn)', E(A, 2).hook]] },
    { goal: 'Le secret sort. On revoit tout', en: 'the secret comes out and the player sees everything differently', stake: (A) => `Ce qu’il croyait ${de(holder(A))}`, at: ['visible', 'secret', 'hook'],
      items: (A) => [['out', 'Le secret sort', 'The secret comes out ("Reveal info")', E(A, 3).reveal, 'sec'],
        ['p1', 'Payé', 'Pay it off: what was planted now makes sense', S(A, 0).pay, 's1'],
        ['p2', 'Payé', 'Pay it off: what was planted now makes sense', S(A, 1).pay, 's2'],
        ['flip', 'Ce qu’on croyait', 'What the player believed, turned around', E(A, 3).flip],
        ['end', 'Fin', 'The episode ends on (its turn)', E(A, 3).hook]] },
    { goal: 'Un ou l’autre. Pas les deux', en: 'he must choose between the two, he cannot keep both', stake: (A) => `${nm(A, 'a')} ou ${nm(A, 'b')}`, at: ['visible', 'same', 'here'],
      items: (A) => [['clock', 'L’horloge', 'The clock: why it must be decided now', E(A, 4).clock],
        ['aa', `${nm(A, 'a')} demande`, `${nm(A, 'a')} asks`, E(A, 4).a_asks],
        ['ba', `${nm(A, 'b')} demande`, `${nm(A, 'b')} asks`, E(A, 4).b_asks],
        ['pick', 'Le choix', `The LAST choice of the episode: ${nm(A, 'a')} or ${nm(A, 'b')}, exactly these two options, each one painful to lose`, '']] },
    { goal: 'Ce que ça a coûté', en: 'what his choice cost', stake: () => 'Ce que ça coûte', at: ['visible', 'here'],
      items: (A) => { const p = A.picks && A.picks[4], e = E(A, 5);
        const cost = p === 'a' ? e.if_a : p === 'b' ? e.if_b : `Si ${nm(A, 'a')} : ${e.if_a || '…'} · Si ${nm(A, 'b')} : ${e.if_b || '…'}`;
        return [['cost', 'Ce que ça coûte', 'What his choice costs, shown', cost],
          ['q', 'La question, tranchée', 'The question of the act, answered by what happened (never said as a moral)', A.question],
          ['end', 'Reste ouvert', 'The episode ends on what stays open (its turn)', e.open]]; } },
  ];
  // the episode's main choice (its last one): two outcomes, each a bundle of big consequences
  const MAIN = (A, n) => { const c = E(A, n).choice; return ['main', 'Le choix principal', 'The MAIN choice, the last of the episode: two outcomes the player reads before tapping, each with big consequences, shown at once in its branch',
    c && c.a ? `1. ${c.a} → ${c.if_a || '…'} / 2. ${c.b || '…'} → ${c.if_b || '…'}` : '']; };
  ARC.slice(0, 3).forEach((arc, i) => { const items = arc.items; arc.items = (A) => { const all = items(A), end = all.findIndex(([k]) => k === 'end');
    all.splice(end < 0 ? all.length : end, 0, MAIN(A, i + 1)); return all; }; });
  const THREAD = { s1: '#ff9f0a', s2: '#ff9f0a', sec: '#bf5af2' };

  // the acts kept on this phone (smt-acts: every act, the one open); a pasted act is a new one
  const KEY = 'smt-acts';
  const low = (x) => (typeof x === 'string' ? x.trim().toLowerCase() : x);
  const fix = (a) => { if (!(a && a.a && a.b && Array.isArray(a.episodes))) return EX();
    a = { done: {}, picks: {}, plans: {}, setups: [], ...a }; a.scene = low(a.scene); a.a.id = low(a.a.id); a.b.id = low(a.b.id);   // "Taverne" -> "taverne"
    if (a.secret) a.secret.who = low(a.secret.who); return a; };
  const store = (() => { try { const k = JSON.parse(localStorage.getItem(KEY)); if (k && Array.isArray(k.list) && k.list.length) return { cur: Math.min(k.cur || 0, k.list.length - 1), list: k.list.map(fix) }; } catch { /* none yet */ }
    return { cur: 0, list: [EX()] }; })();
  let A = store.list[store.cur], el = null;
  const save = () => { store.list[store.cur] = A; try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* private window */ } };
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch { /* private window */ } return null; };
  let mode = ls('smt-act-mode') === 'visual' ? 'visual' : 'flow';

  // ---- kept for Claude: every act, plan, story and feedback generated here goes to the repo (essais/auto/<act>/), so
  // a session can read them; needs a GitHub token of this phone (fine-grained, this repo only, Contents: read and
  // write). No token: nothing is sent, "Copier pour Claude" still copies the whole of it ----
  const REPO = 'V0rtek/sous-mon-toit', AUTO = 'essais/auto';
  const slug = (t) => String(t || 'sans-titre').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'acte';
  const stamp = () => { const d = new Date(), z = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}-${z(d.getHours())}${z(d.getMinutes())}${z(d.getSeconds())}`; };
  const b64 = (str) => { const b = new TextEncoder().encode(str); let s = ''; for (const c of b) s += String.fromCharCode(c); return btoa(s); };
  async function keep(name, data) {
    const token = ls('smt-gh-token'); if (!token) return false;
    const path = `${AUTO}/${slug(A.title)}/${stamp()}-${name}.json`;
    try {
      const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${encodeURI(path)}`, { method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
        body: JSON.stringify({ message: `Essai gardé : ${A.title} · ${name}`, content: b64(JSON.stringify(data, null, 1)), branch: 'main' }) });
      if (!r.ok) throw new Error(r.status);
      note(`Gardé pour Claude : ${name}`); return true;
    } catch (err) { note(`Pas gardé (${err.message}) : vérifie le jeton dans Générer › Garder pour Claude`); return false; }
  }
  // everything of the act open, in one piece: the act, its plans (titles), the plan open, the last story and its feedback
  const bundle = () => { const g = (() => { try { return JSON.parse(localStorage.getItem('smt-gens')) || []; } catch { return []; } })()[0];
    return { act: A, ep, plan: window.PLAN ? PLAN.get() : null, story: g ? { idea: g.idea, json: g.json, fb: g.fb } : null }; };

  // ---- Visuel: the act on top (the two people, why, the past, the danger, the secret), then the 5 episodes ----
  function column(st, n) {
    const arc = ARC[n - 1], items = arc.items(A), done = items.filter(([k]) => A.done[n + k]).length;
    const meter = Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('');
    const techs = (st.techs || []).filter((t) => CARD(t));
    return `<section class="aEp" style="--c:${st.c}"><header data-a="ep" data-n="${n}"><i>${n}</i><div><b>Épisode ${n} · ${esc(st.name)}</b><p>${esc(st.line)}</p></div></header>`
      + `<p class="aGoal">${esc(arc.goal)}</p>`
      + `<div class="aStake"><div class="aMeter">${meter}</div><span>En jeu : <b>${esc(arc.stake(A))}</b></span></div>`
      + `<div class="aTechs">${arc.at.map((t) => `<button type="button" class="act" data-at="${t}">${esc(AT[t].n)}</button>`).join('')}${techs.map((t) => `<button type="button" data-t="${t}">${esc(CARD(t).name)}</button>`).join('')}</div>`
      + `<small>À mettre dans l’épisode · ${done}/${items.length}</small>`
      + items.map(([k, l, , v, th]) => `<div class="aIt${A.done[n + k] ? ' ok' : ''}${th ? ' th' : ''}" data-k="${n + k}"${th ? ` data-th="${th}" style="--t:${THREAD[th]}"` : ''}><b>${esc(l)}</b>${v ? `<span>${esc(v)}</span>` : ''}</div>`).join('')
      + (n === 4 ? `<div class="aPick">${pickBtns()}</div>` : `<input class="aNote" data-note="${n}" value="${esc(A.picks[n] || '')}" placeholder="Ce que Justin a choisi (une fois joué)">`)
      + `<div class="aGo"><button type="button" data-copy="${n}">Copier le prompt du plan · épisode ${n}</button></div></section>`;
  }
  const pickBtns = () => ['a', 'b'].map((w) => `<button type="button" data-pick="${w}" class="${A.picks[4] === w ? 'on' : ''}">Il a choisi ${esc(nm(A, w))}</button>`).join('');
  function visual() {
    const who = (w) => `<div class="aWho">${face(A[w].id)}<div><b>${esc(nm(A, w))}</b><span>${esc(A[w].is)}</span><em>Veut : ${esc(A[w].wants)}</em>${A[w].because ? `<i>parce que ${esc(A[w].because)}</i>` : ''}</div></div>`;
    return '<div class="aTop" data-a="edit">'
      + `<small>L’arc · toujours le même pour l’instant</small><p class="aArc">Justin est pris entre deux personnes. ${esc(nm(A, 'a'))} lui demande quelque chose qui blesse ${esc(nm(A, 'b'))}. Il essaie de garder les deux, ça empire ; un secret change tout ; il doit choisir.</p>`
      + `<small>La question</small><p class="aQ">${esc(A.question)}</p>`
      + `<div class="aPeople">${who('a')}${who('b')}</div>`
      + `<div class="aWant"><b>Justin veut</b> ${esc(A.justin_wants)}</div>`
      + (A.past ? `<div class="aWant"><b>Le passé</b> ${esc(A.past)}</div>` : '')
      + (A.lost_if_no ? `<div class="aWant aLost"><b>Si Justin dit non</b> ${esc(A.lost_if_no)}</div>` : '')
      + `<div class="aSecret"><b>Le secret ${esc(de(holder(A)))}</b> ${esc(A.secret && A.secret.what)}<em>caché jusqu’à l’épisode 3</em></div>`
      + `<div class="aTechs">${Object.keys(AT).map((t) => `<button type="button" class="act" data-at="${t}">${esc(AT[t].n)}</button>`).join('')}</div>`
      + '<span class="aEdit">Toucher pour modifier</span></div>'
      + `<div class="aRow">${STAGES().slice(0, 5).map((st, i) => column(st, i + 1)).join('')}<svg class="aSvg" aria-hidden="true"></svg></div>`;
  }

  // ---- Générer: the 3 layers, one under the other. 1 the act (its prompt -> paste), 2 an episode's plan (its prompt,
  // made from the act -> paste: it opens in Plan de scène), 3 its story (the plan's prompt 2 -> paste: it plays). What's
  // typed in a box stays until it's used ----
  const draft = { idea: ls('smt-act-idea') || '', act: '', plan: '', story: '' };
  let ep = 1;
  function flow() {
    const P = window.PLAN && PLAN.get(), planOk = A.plans && A.plans[ep] && P && P.title === A.plans[ep];
    const box = (f, ph) => `<textarea data-f="${f}" rows="3" placeholder="${ph}">${esc(draft[f])}</textarea>`;
    return `<section class="aStep"><h3><i>1</i>L’acte</h3><p class="pD">L’arc et les techniques d’acte sont dans le prompt : l’IA remplit les 5 épisodes.</p>`
      + `<small>Ton idée (facultatif)</small>${box('idea', 'Une ou deux phrases, ou rien')}`
      + `<small>Les deux personnes, tirées au hasard</small><div class="aPair"><span>A = ${esc(pair[2])} · B = ${esc(pair[3])}</span><button type="button" data-s="other">Autre</button></div>`
      + '<div class="aBtns"><button type="button" class="go" data-s="copyAct">Copier le prompt de l’acte</button></div>'
      + `<small>La réponse</small>${box('act', 'Colle ici le JSON de l’acte')}`
      + '<div class="aBtns"><button type="button" data-s="pasteAct">Coller l’acte</button><button type="button" data-s="visual">Voir l’acte</button></div>'
      + `<p class="aNow">Acte ouvert : <b>${esc(A.title)}</b></p><p class="pMsg" data-m="act"></p></section>`
      + `<section class="aStep"><h3><i>2</i>Le plan de l’épisode</h3><p class="pD">Le prompt du Plan de scène, avec l’acte : ce qui s’est passé avant et ce que cet épisode doit contenir.</p>`
      + `<div class="aEps">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-ep="${n}" class="${n === ep ? 'on' : ''}">${n}${A.plans && A.plans[n] ? ' ✓' : ''}</button>`).join('')}</div>`
      + `<div class="aBtns"><button type="button" class="go" data-s="copyPlan">Copier le prompt du plan · épisode ${ep}</button><button type="button" data-s="haiku">Haiku : plan + histoire · épisode ${ep}</button></div>`
      + `<small>La réponse</small>${box('plan', 'Colle ici le JSON du plan')}`
      + '<div class="aBtns"><button type="button" data-s="pastePlan">Coller le plan</button><button type="button" data-s="seePlan">Voir le plan</button></div>'
      + `<p class="aNow">${planOk ? `Plan ouvert : <b>${esc(P.title)}</b> ✓` : `Pas encore de plan pour l’épisode ${ep}`}</p><p class="pMsg" data-m="plan"></p></section>`
      + `<section class="aStep"><h3><i>3</i>L’histoire</h3><p class="pD">Le prompt 2, à partir du plan ouvert${P ? ` (${esc(P.title)})` : ''} : les répliques, puis on joue.</p>`
      + '<div class="aBtns"><button type="button" class="go" data-s="copyStory">Copier le prompt de l’histoire</button></div>'
      + `<small>La réponse</small>${box('story', 'Colle ici le JSON de l’histoire')}`
      + '<div class="aBtns"><button type="button" class="go" data-s="play">Jouer l’histoire</button></div><p class="pMsg" data-m="story"></p>'
      + `<small>Une fois jouée</small>${ep === 4 ? `<div class="aPick">${pickBtns()}</div>` : `<input class="aNote" data-note="${ep}" value="${esc(A.picks[ep] || '')}" placeholder="Ce que Justin a choisi">`}`
      + (ep < 5 ? `<div class="aBtns"><button type="button" data-s="next">Épisode ${ep + 1} →</button></div>` : '') + '</section>'
      + `<section class="aStep"><h3><i>✓</i>Garder pour Claude</h3><p class="pD">${ls('smt-gh-token') ? 'Activé : chaque acte, plan, histoire et avis va dans le repo (essais/auto), où Claude peut les lire.' : 'Pas activé. Une fois : sur github.com, Settings › Developer settings › Fine-grained tokens › Generate : seulement le repo sous-mon-toit, Contents : Read and write. Colle le jeton ici (il reste sur ce téléphone).'}</p>`
      + `<input class="aNote" type="password" data-token="1" placeholder="Jeton GitHub (github_pat_…)" value="${ls('smt-gh-token') ? '••••••••' : ''}">`
      + '<div class="aBtns"><button type="button" data-s="saveToken">Enregistrer le jeton</button><button type="button" data-s="bundle">Copier pour Claude</button></div></section>';
  }

  function render() {
    if (!el) return;
    const v = el.querySelector('.aView'), row = el.querySelector('.aRow'), keep = [v ? v.scrollTop : 0, row ? row.scrollLeft : 0];
    el.innerHTML = `<div class="aHead"><b data-a="title">${esc(A.title)}</b><div class="pBar aMode"><button type="button" data-a="flow" class="${mode === 'flow' ? 'on' : ''}">Générer</button><button type="button" data-a="visual" class="${mode === 'visual' ? 'on' : ''}">Visuel</button>`
      + '<button type="button" data-a="acts">Actes</button><button type="button" data-a="plan">Plan de scène</button></div><p class="aMsg"></p></div>'
      + `<div class="aView">${mode === 'flow' ? `<div class="aFlow">${flow()}</div>` : visual()}</div>`;
    el.querySelector('.aView').scrollTop = keep[0];
    if (mode === 'visual') { el.querySelector('.aRow').scrollLeft = keep[1]; threads(); }
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

  // ---- the sheet: edit the act or an episode, a technique, the list of acts ----
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
    [['Ce que A demande', 'ask'], ['Pourquoi ça blesse B', 'hurts'], ['La question ouverte', 'mystery'], ['La fin', 'hook']],
    [['L’effort minimal', 'easy'], ['Comment ça empire', 'backfires'], ['La fin', 'hook']],
    [['Comment le secret sort', 'reveal'], ['Ce qu’on croyait, retourné', 'flip'], ['La fin', 'hook']],
    [['L’horloge', 'clock'], ['Ce que A demande', 'a_asks'], ['Ce que B demande', 'b_asks']],
    [['S’il choisit A', 'if_a'], ['S’il choisit B', 'if_b'], ['Ce qui reste ouvert', 'open']],
  ];
  function openEp(n) {
    const f = EP_FIELDS[n - 1].map(([l, k]) => [l.replace(/\bA\b/, nm(A, 'a')).replace(/\bB\b/, nm(A, 'b')), `episodes.${n - 1}.${k}`]);
    if (n < 4) f.push(['Choix principal · 1', `episodes.${n - 1}.choice.a`], ['Si 1', `episodes.${n - 1}.choice.if_a`], ['Choix principal · 2', `episodes.${n - 1}.choice.b`], ['Si 2', `episodes.${n - 1}.choice.if_b`]);
    if (n === 1) f.push(['Si Justin dit non', 'lost_if_no'], ['Planté 1', 'setups.0.plant']);
    if (n === 2) f.push(['Planté 2', 'setups.1.plant']);
    if (n === 3) f.push(['Payé 1', 'setups.0.pay'], ['Payé 2', 'setups.1.pay']);
    openFields(`Épisode ${n}`, f, `<p class="pD">${esc(ARC[n - 1].goal)}.</p>`);
  }
  const openAct = () => openFields('L’acte', [['Titre', 'title'], ['Décor (taverne, maison, salon)', 'scene'], ['La question', 'question'],
    [`Qui est ${nm(A, 'a')} pour Justin`, 'a.is'], [`Ce que ${nm(A, 'a')} veut`, 'a.wants'], [`Parce que (${nm(A, 'a')})`, 'a.because'],
    [`Qui est ${nm(A, 'b')} pour Justin`, 'b.is'], [`Ce que ${nm(A, 'b')} veut`, 'b.wants'], [`Parce que (${nm(A, 'b')})`, 'b.because'],
    ['Ce que Justin veut', 'justin_wants'], ['Le passé (une phrase)', 'past'], ['Si Justin dit non', 'lost_if_no'],
    [`À qui est le secret (${A.a.id} ou ${A.b.id})`, 'secret.who'], ['Le secret', 'secret.what']]);
  const card = (name, how, ex) => openSheet(`<div class="pShTop"><b>${esc(name)}</b><button type="button" data-s="close">OK</button></div><p class="pD">${esc(how)}</p>`
    + (ex || []).map(([a, b]) => `<p class="pD aEx"><s>${esc(a)}</s><br>→ ${esc(b)}</p>`).join(''), (e) => { if (e.target.closest('[data-s="close"]')) closeSheet(); });
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
  // it never builds one: every field is one concrete sentence, done with its technique ----
  let pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const promptAct = (idea, [ra, rb]) => `You plan ONE act of an interactive story for a phone game: 5 episodes. No dialogue: only what happens. The player plays the main character, "justin". Write every text in English, unless the idea is written in another language (then in that language).
Reply with ONE JSON object and nothing else (its shape is at the end).

THE ARC (always this one: you fill it, you never change it)
justin is caught between two people he cares about, A and B. A asks him for something; giving it to A hurts B.
- Episode 1: the first line hooks on its own; we like A and B; justin says his dream; A asks, and we see what is lost if justin says no; we see why saying yes would hurt B. A question about the past is opened and left open (the secret is its answer). One small thing is planted.
- Episode 2: justin tries the easy way to keep both. It backfires: things get worse with B. A second small thing is planted; the one who has the secret does something odd.
- Episode 3: the secret comes out. The two planted things suddenly make sense. What the player believed is turned around.
- Episode 4: A and B each ask him for the same moment. He must choose: A or B.
- Episode 5: what his choice cost (one version per choice), and what stays open.

THE TWO PEOPLE: A is ${ra}, B is ${rb}. Pick them among the characters of the decor (${DECORS}). Choose the decor where two characters fit, gender included: a father or a brother is a man (james, amare), a mother or a sister is a woman. If no decor has both, keep the closest relation that fits (his father becomes his mother) and write it in "is". Use the character's real gender everywhere (he/she).

THE ACT'S TECHNIQUES (each field below says which one does it; follow them). Their examples come from OTHER stories: take the shape, never their people, events, objects or durations (no hospital, no lease, no audition, no "three years ago", no letter, no one leaving at sunrise). Invent from the idea and the two people:
${Object.keys(AT).map(atLine).join('\n')}

FILL IN (each one sentence, concrete: something you could film or say out loud, never a feeling alone):
1. "scene": the decor. "title": 2-4 words.
2. "a" and "b": "id" (the character's id), "is" (who they are to justin), "wants" (what they ask justin for, out loud: "wants him to leave with her tomorrow morning", never "wants to be happy"), "because" (what they believe that makes them want it). Techniques: Vouloir + raison, Ici et maintenant.
3. "justin_wants": what justin has wanted FOR HIMSELF for a long time, and why, in one sentence (Un rêve à lui): personal and relatable ("to leave the city, because he dreams of being free and has never dared leave his sister alone"). Never tonight, never for someone else. A's request brings him closer to it, B's keeps him from it (or the other way): the choice costs him too.
4. "past": the one thing from the past that matters, in ONE sentence (Le passé en une phrase).
5. "lost_if_no": what is lost, right there, if justin says no to A (Danger présent).
6. "question": the question the act argues about, as a question ("Do you keep a promise to someone who lies to you?").
7. "secret": "who" (the id of the character it belongs to: the one whose odd behaviour it explains) and "what" (Un secret qui explique un geste). Once out, the player sees that person differently. It explains both setups.
8. "setups": exactly 2 (Un plant qui se voit). "plant" = the line that plants it (setup 1 in episode 1, setup 2 in episode 2), "pay" = what it means once the secret is out.
9. "episodes": exactly 5 objects, in order, with these fields:
   1: "ask" (what A asks justin), "hurts" (why saying yes hurts B), "mystery" (Une question ouverte: the question about the past this episode opens and leaves open, about something justin did NOT see (it happened while he was not there, or between the two others: he cannot know the answer, so the player wants it); ONE simple contradiction the player gets in one exchange, one says it happened, the other says it did not ("You never came." / "I came every night."), never two versions of who did what; the secret is its answer), "hook" (La fin qui promet: the last line announces a precise next moment, who, when, where, what will be settled; or a surprise; never a summary, never the request asked again).
   2: "easy" (Effort minimal, échec qui empire: what justin tries first to keep both), "backfires" (how it breaks in front of B), "hook" (La fin qui promet).
   3: "reveal" (how the secret comes out, in the scene), "flip" (what the player believed, and what is true), "hook".
   Episodes 1, 2 and 3 also have "choice": the episode's MAIN choice, its last one: {"a", "if_a", "b", "if_b"}. Two outcomes the player reads before tapping, each a bundle of big consequences: a bond that ends or begins, a romance that starts or dies, a place he leaves or stays in. The bigger, the better. Flat: "a": "Ask for more time", "b": "Read the contract" (a procedure, nothing changes). Works: "a": "Break up with Ruby. Kiss Melissa. Leave the city.", "if_a": "Ruby is alone tonight, with whoever threatens her; Melissa and he are together; his room is empty by morning." / "b": "Turn Melissa down: she faces her threat alone. Stay with Ruby.", "if_b": "Melissa walks out alone, hurt, to face what threatens her without him; Ruby lets him closer than ever; the city keeps him." The emotional mark he leaves on someone (alone, hurt, in danger) is what makes the player wonder what happens next. The next episode works from either outcome.
   4: "clock" (why it must be decided now), "a_asks", "b_asks" (Le même moment, deux demandes).
   5: "if_a" (if he chose A: what it costs, shown), "if_b" (if he chose B), "open" (what stays open for the next act).

RULES:
- Ce que l'écran montre: the player only sees the decor, the characters and their lines. No gesture or object the screen cannot show.
- Everything happens between the characters on screen. No institution, no hearing, no council, no gate, no key character who never appears.
- The world is the decor's world (a fantasy city, a house): no phone, no company, no buyer, no lawyer, no contract, no papers to sign.
- The stakes are between people, never money or a business: no sale, no offer, no debt, no money owed, no crate, no cellar, no landlord, no licence, no smuggling. Flat: "Melissa wants him to sell the saloon to the mining company by midnight." (what does the player lose? money?) -> works: "Melissa wants him to leave with her tonight." (he loses Ruby, and the player sees her).
- Nothing contradicts itself: the past, the secret and the episodes tell one story.
- Before episode 3, the secret is never said: only planted and hinted. But its question is open from episode 1 ("mystery").
- Both sides of episode 4 must feel right: the player has to hesitate.
- Romance keeps players: at least one of the two is drawn to justin (Une étincelle), from episode 1.
- Simple enough to get on a phone: the past, the secret and the mystery each fit in one plain sentence a player understands the first time. Flat: "Ruby says she convinced him to stay, while Melissa claims she changed his mind." (who did what?) -> works: "Ruby says Melissa gave up on the trip. Melissa says she never did."

THE JSON:
{"title": "...", "scene": "...", "question": "...", "a": {"id": "...", "is": "...", "wants": "...", "because": "..."}, "b": {"id": "...", "is": "...", "wants": "...", "because": "..."}, "justin_wants": "...",
 "past": "...", "lost_if_no": "...", "secret": {"who": "<a character id>", "what": "..."}, "setups": [{"plant": "...", "pay": "..."}, {"plant": "...", "pay": "..."}],
 "episodes": [{"ask": "...", "hurts": "...", "mystery": "...", "choice": {"a": "...", "if_a": "...", "b": "...", "if_b": "..."}, "hook": "..."}, {"easy": "...", "backfires": "...", "choice": {...}, "hook": "..."}, {"reveal": "...", "flip": "...", "choice": {...}, "hook": "..."}, {"clock": "...", "a_asks": "...", "b_asks": "..."}, {"if_a": "...", "if_b": "...", "open": "..."}]}

CHECK BEFORE YOU REPLY (rewrite what fails):
1. Is what is at stake a person or a bond, here, tonight? Never money, a sale, a company, papers.
2. Is the mystery about something justin did not see? (Never about what justin himself said or did: he would know.)
3. Is justin's dream his own, long-standing, with its reason, and does A's request touch it?
4. Is at least one of the two drawn to justin?
5. Do the past, the secret and the mystery each fit in one plain sentence?
6. Is nothing taken from the examples (their people, events, objects)?
7. Does each main choice (episodes 1-3) change a bond, a romance or where he lives, in both outcomes?

The idea: ${idea || '(none: invent it from the two people)'}`;
  const copy = (text, btn) => { const was = btn.textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { btn.textContent = 'Copié'; setTimeout(() => (btn.textContent = was), 1400); }, () => { btn.textContent = 'Copie impossible'; }); };
  const note = (t) => { const m = el && el.querySelector('.aMsg'); if (m) m.textContent = t; };
  const say = (where, t) => { const m = el && el.querySelector(`[data-m="${where}"]`); if (m) m.textContent = t; };

  // ---- an episode's plan prompt: the plan's own prompt 1 (plan.js) with THE ACT: the people, what came before (and what
  // justin picked), the act's techniques for this episode, what it must contain, and what comes next ("Plus tard") ----
  const dot = (t) => { t = String(t || '…').trim(); return /[.!?»"…]$/.test(t) ? t : t + '.'; };
  const before = (n) => {
    const e = (k) => E(A, k), p = (k) => (k === 4 ? (A.picks[4] ? `justin chose ${nm(A, A.picks[4])}.` : '') : A.picks[k] ? `justin chose: ${A.picks[k]}.` : '');
    const said = [`${nm(A, 'a')} asked justin: ${dot(e(1).ask)} Planted: ${dot(S(A, 0).plant)} It ended: ${dot(e(1).hook)}`,
      `justin tried: ${dot(e(2).easy)} It backfired: ${dot(e(2).backfires)} Planted: ${dot(S(A, 1).plant)} It ended: ${dot(e(2).hook)}`,
      `The secret came out: ${dot(e(3).reveal)} It ended: ${dot(e(3).hook)}`,
      `${nm(A, 'a')}: ${dot(e(4).a_asks)} ${nm(A, 'b')}: ${dot(e(4).b_asks)}`];
    return said.slice(0, n - 1).map((t, i) => `- Episode ${i + 1}: ${t} ${p(i + 1)}`.trim()).join('\n');
  };
  function actText(n) {
    const st = STAGES()[n - 1] || { name: '', line: '' }, arc = ARC[n - 1], all = arc.items(A), end = all.find(([k]) => k === 'end');
    const items = all.filter((it) => it !== end), turn = end ? end[3] : `justin has to choose: ${nm(A, 'a')} or ${nm(A, 'b')} (the last choice of the episode, nothing after its branches)`;
    const sec = n < 3 ? 'The player must NOT learn it in this episode.' : n === 3 ? 'It comes out in THIS episode.' : 'It came out in episode 3.';
    const next = n < 5 ? ARC[n].items(A).filter(([k, , , v]) => v && ['easy', 'worse', 'out', 'flip', 'clock', 'aa', 'ba', 'cost'].includes(k)).map(([, , en, v]) => `${en}: ${v}`).join(' / ') : '';
    const who = (w) => `- ${nm(A, w)} (id "${A[w].id}"): ${dot(A[w].is)} Wants: ${dot(A[w].wants)}${A[w].because ? ` Because: ${dot(A[w].because)}` : ''}`;
    return `THE ACT (5 episodes, always the same arc: justin is caught between two people he cares about; giving one what they ask hurts the other; a secret changes what he believed; in episode 4 he must choose)
Scene: "${A.scene}". The question the act argues (never said as a moral): ${A.question}
${who('a')}
${who('b')}
- justin wants: ${dot(A.justin_wants)}${A.past ? `\n- The past (one sentence, say no more of it): ${dot(A.past)}` : ''}${A.lost_if_no ? `\n- If justin says no to ${nm(A, 'a')}: ${dot(A.lost_if_no)}` : ''}
- The secret of ${holder(A)}: ${dot(A.secret && A.secret.what)} ${sec}
${n > 1 ? `BEFORE THIS EPISODE (the player saw it):\n${before(n)}\n` : ''}THIS EPISODE: episode ${n} of 5, step "${st.name}" (${st.line}): ${arc.en}. Only ${nm(A, 'a')}, ${nm(A, 'b')} and justin in "characters" (another character of the decor only if the episode needs them). Everything happens between them, here, now.
THE ACT'S TECHNIQUES FOR THIS EPISODE:
${arc.at.map(atLine).join('\n')}
It must contain, each in its own rectangle of box "ep", in this order (the other rectangles go around them):
${items.map(([, , en, v], i) => `${i + 1}. ${en}${v ? ': ' + v : ''}`).join('\n')}
"turn": ${turn || '…'}
${n < 5 ? `Box "later" = 1 to 3 rectangles of episode ${n + 1}: ${next}` : 'Box "later" = 1 rectangle: what stays open for the next act.'}`;
  }
  const planPrompt = (n) => window.PLAN.prompt1('', false, { n, text: actText(n) });

  // ---- taps ----
  function onClick(e) {
    const t = e.target;
    if (t.closest('input, textarea')) return;
    const at = t.closest('[data-at]'); if (at) { const x = AT[at.dataset.at]; return card(x.n, x.how, [x.ex]); }
    const tc = t.closest('[data-t]'); if (tc) { const x = CARD(tc.dataset.t); return card(x.name, x.how, x.ex); }
    const it = t.closest('[data-k]'); if (it) { A.done[it.dataset.k] = !A.done[it.dataset.k]; save(); render(); return; }
    const pk = t.closest('[data-pick]'); if (pk) { A.picks[4] = A.picks[4] === pk.dataset.pick ? null : pk.dataset.pick; save(); render(); return; }
    const cp = t.closest('[data-copy]'); if (cp) { const n = +cp.dataset.copy; copy(planPrompt(n), cp); note(`Prompt du plan de l’épisode ${n} copié. Sa réponse se colle dans Générer › 2.`); ep = n; return; }
    const en = t.closest('[data-ep]'); if (en) { ep = +en.dataset.ep; render(); return; }
    const s = t.closest('[data-s]');
    if (s) return step(s.dataset.s, s);
    const a = t.closest('[data-a]'); if (!a) return;
    switch (a.dataset.a) {
      case 'title': return openFields('Titre', [['Titre', 'title']]);
      case 'edit': return openAct();
      case 'ep': return openEp(+a.dataset.n);
      case 'acts': return openActs();
      case 'flow': case 'visual': mode = a.dataset.a; ls('smt-act-mode', mode); render(); el.querySelector('.aView').scrollTop = 0; return;
      case 'plan': return window.ACT_TO_PLAN && window.ACT_TO_PLAN();
    }
  }
  // Générer's buttons
  function step(s, btn) {
    switch (s) {
      case 'other': { let p; do p = PAIRS[Math.floor(Math.random() * PAIRS.length)]; while (p === pair); pair = p; render(); return; }
      case 'copyAct': return copy(promptAct(draft.idea.trim(), pair), btn);
      case 'pasteAct': { let j;
        try { j = LOOSE_JSON(draft.act); } catch { return say('act', 'Ce n’est pas un acte (JSON).'); }
        if (!j.a || !j.b || !Array.isArray(j.episodes)) return say('act', 'Il manque A, B ou les épisodes.');
        store.list.push(fix({ ...j, done: {}, picks: {}, plans: {} })); store.cur = store.list.length - 1; A = store.list[store.cur]; save();
        keep('acte', { act: A });
        draft.act = ''; ep = 1; render(); say('act', 'Ouvert.'); return; }
      case 'visual': mode = 'visual'; ls('smt-act-mode', mode); render(); el.querySelector('.aView').scrollTop = 0; return;
      case 'copyPlan': return copy(planPrompt(ep), btn);
      case 'haiku': { const key = ls('smt-key'); if (!key) return say('plan', 'Il faut ta clé API : entre-la une fois dans Ton histoire.');
        btn.disabled = true;
        auto(key, { n: ep, newAct: false }, (t) => say('plan', t)).then((u) => window.GEN_USED && GEN_USED(u), (err) => { say('plan', err.message || 'Ça n’a pas marché.'); btn.disabled = false; });
        return; }
      case 'pastePlan': { let j;
        try { j = LOOSE_JSON(draft.plan); if (!Array.isArray(j.boxes)) throw 0; } catch { return say('plan', 'Ce n’est pas un plan (JSON).'); }
        if (!j.title) j.title = `${A.title} · épisode ${ep}`;
        const p = window.PLAN.add(j); A.plans[ep] = p.title; save(); keep(`plan-ep${ep}`, { ep, plan: j }); draft.plan = ''; render(); say('plan', 'Plan ouvert dans Plan de scène.'); return; }
      case 'seePlan': return window.ACT_TO_PLAN && window.ACT_TO_PLAN();
      case 'copyStory': return copy(window.PLAN.prompt2(), btn);
      case 'play': { let j;
        try { j = LOOSE_JSON(draft.story); } catch { return say('story', 'Ce n’est pas une histoire (JSON).'); }
        try { keep(`histoire-ep${ep}`, { ep, plan: PLAN.get().title, story: j }); window.PLAN_PLAY(j, PLAN.get().title); draft.story = ''; } catch (err) { say('story', err.message && !/JSON|Unexpected/.test(err.message) ? err.message : 'Ce n’est pas une histoire (JSON).'); }
        return; }
      case 'saveToken': { const v = el.querySelector('[data-token]').value.trim(); if (v && !/^•+$/.test(v)) ls('smt-gh-token', v); else if (!v) { try { localStorage.removeItem('smt-gh-token'); } catch { /* private window */ } } render(); note(ls('smt-gh-token') ? 'Jeton enregistré.' : 'Jeton retiré.'); return; }
      case 'bundle': return copy(JSON.stringify(bundle()), btn);
      case 'next': ep = Math.min(5, ep + 1); render(); el.querySelector('.aView').scrollTop = 0; return;
    }
  }
  // ---- Haiku does the 3 layers itself, with Justin's key (GEN.ask: claude-haiku-4-5, nothing bigger): the act (if
  // asked), the plan of episode n, its story; each kept like a pasted one. A reply that is not JSON gets one retry ----
  async function viaHaiku(key, prompt, max, ok, used) {
    const messages = [{ role: 'user', content: prompt }];
    for (let i = 0; ; i++) {
      let got = null;
      try {
        got = await GEN.ask(key, messages, 'You reply with ONE JSON object and nothing else.', max);
        used.in += got.usage.input_tokens || 0; used.out += got.usage.output_tokens || 0;
        const j = LOOSE_JSON(got.text); if (!ok(j)) throw new Error('Some fields are missing.'); return j;
      } catch (e) {
        if (i || /401|Clé|Erreur/.test(e.message)) throw e;
        messages.push({ role: 'assistant', content: (got && got.text) || '{}' }, { role: 'user', content: `That does not work (${e.message}). Reply again with the full JSON only, exactly the shape asked.` });
      }
    }
  }
  // tell(text) = the progress shown on the screen. Returns what Haiku cost (tokens), after the story starts playing
  async function auto(key, { idea = '', n = 1, newAct = true } = {}, tell = () => {}) {
    const used = { in: 0, out: 0 }, of = newAct ? 3 : 2;
    if (newAct) {
      tell(`1/${of} · L’acte (5 épisodes)…`);
      const j = await viaHaiku(key, promptAct(idea, pair), 8000, (x) => x.a && x.b && Array.isArray(x.episodes), used);
      store.list.push(fix({ ...j, done: {}, picks: {}, plans: {} })); store.cur = store.list.length - 1; A = store.list[store.cur]; save();
      keep('acte', { act: A, by: 'haiku' });
    }
    ep = n;
    tell(`${of - 1}/${of} · Le plan de l’épisode ${n}…`);
    const plan = await viaHaiku(key, planPrompt(n), 12000, (x) => Array.isArray(x.boxes), used);
    if (!plan.title) plan.title = `${A.title} · épisode ${n}`;
    const p = window.PLAN.add(plan); A.plans[n] = p.title; save(); keep(`plan-ep${n}`, { ep: n, plan, by: 'haiku' });
    tell(`${of}/${of} · L’histoire de l’épisode ${n}…`);
    const story = await viaHaiku(key, window.PLAN.prompt2(), 8000, (x) => Array.isArray(x.steps), used);
    keep(`histoire-ep${n}`, { ep: n, plan: p.title, story, by: 'haiku' });
    tell('');
    window.PLAN_PLAY(story, p.title);
    return used;
  }
  function mount(root) {
    el = root; root.onclick = onClick;
    root.oninput = (e) => {
      const n = e.target.dataset.note, f = e.target.dataset.f;
      if (n) { A.picks[n] = e.target.value; save(); }
      if (f) { draft[f] = e.target.value; if (f === 'idea') ls('smt-act-idea', e.target.value); }
    };
    closeSheet(); render();
  }
  // a feedback given after a generated story (index.html): kept with the act's episode
  window.ACT_KEEP = (name, data) => keep(`${name}-ep${ep}`, { ep, plan: window.PLAN ? PLAN.get().title : '', ...data });
  return { mount, closeSheet, redraw: () => render(), get: () => A, bundle, auto, actText, promptAct: (idea) => promptAct(idea, pair) };
})();
