// ---- FORGE · L'ORCHESTRATION (23/11, FORGE-ORCHESTRATION.md section 4). The same world as Créer (forge.js: who, what each
// one wants, the truth, who they are, what a choice costs), built in the order the text asks for, for a story the user WATCHES
// (no player choice: the characters choose):
//   A  the ingredients          S (forge.js)
//   B  the truth                facts: what really happened, who did it and why, who knows, the concrete traces it left
//   C  the dramatic engine      what Justin wants, what stands against it (FORCES: a person, his own flaw, the world), and
//                               HOW each force acts: its moves, in order, each one an answer to what Justin just did
//   D  the destination          the climax, the side Justin chooses (from who he is) and its price, and what must be true
//                               before it (prerequisites)
//   E  the audience's journey   for each secret: how the audience meets it (mystery / twist / irony), the question, the
//                               theory it is pushed toward, what breaks it, the clues, the answer, what it re-reads
//   ·  the opening              one of 3 recipes (mystery · dilemma · opportunity), picked from what the story supports,
//                               BEFORE the moments are built: its spine is the start of the construction (the opening budget)
//   F  the moments              each one: cause · actor · desire · action · world change · audience change · plot · what
//                               it makes possible. No moment that changes nothing (no filler)
//   G  acts and episodes        an act = a story circle (8 steps); episode 1 = the opening (2 minutes, played), the next
//                               ones = 2 to 5 slides each, until the end
// Data marked « premier jet » is Claude's first draft, to be reviewed with Justin. Texts are French (the plan and the
// slides are French; prompt2 writes in the plan's language) ----
window.ORCH = (() => {
  let K = null, CACHE = null;
  const J = 'justin';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const hsh = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
  const pv = (key, n) => (n ? hsh(`${K.S.seed || 1}|orch|${key}`) % n : 0), pick = (key, L) => L[pv(key, L.length)];
  const up = (s) => (s ? String(s).charAt(0).toUpperCase() + String(s).slice(1) : '');
  const N = (id) => (!id ? '' : id.startsWith && id.startsWith('f:') ? figName() : K.nm(id));
  // « de Ruby », « d’Amare », « du passeur », « de la patronne »
  const deN = (n) => (/^le /i.test(n) ? 'du ' + n.slice(3) : /^les /i.test(n) ? 'des ' + n.slice(4) : /^(la |l’|l')/i.test(n) ? 'de ' + n : /^[aeiouyhéèêà]/i.test(n) ? 'd’' + n : 'de ' + n);
  const aN = (n) => (/^le /i.test(n) ? 'au ' + n.slice(3) : /^les /i.test(n) ? 'aux ' + n.slice(4) : 'à ' + n);
  const figName = () => { const G = K.graph(); return G.fig ? G.fig.n : 'quelqu’un'; };
  const list = (L) => (L.length < 2 ? L.join('') : `${L.slice(0, -1).join(', ')} et ${L[L.length - 1]}`);
  const ge = (id) => (id === J ? '' : '·e');   // Justin is « il »; the others' gender is not known (as in forge.js)
  const que = (s) => (/^[aeiouyhéèêà]/i.test(s) ? 'qu’' : 'que ') + s;   // « qu’Amare », « que Ruby »

  // ==== THE DATA (premier jet de Claude, à revoir avec Justin) : the concrete things moments are made of ====
  // the places of the tavern where things happen off the table (said, never shown: the screen is the table)
  const SPOTS = ['la cave', 'la cour', 'la réserve', 'l’escalier de derrière', 'l’écurie'];
  // the 8 steps of a story circle (an act, Justin 19/11: « act is like story circle »)
  const CIRCLE = [null, ['Toi', 'le monde et ceux qu’on aime'], ['Le besoin', 'ce qu’il veut'], ['Il y va', 'ce qui arrive et change tout'], ['Il cherche', 'il essaie, on lui résiste'],
    ['Il trouve', 'il obtient quelque chose de vrai'], ['Il paie', 'ça coûte, ce qu’on croyait se retourne'], ['Le retour', 'la vérité, le choix forcé'], ['Il a changé', 'le prix, pour de bon']];
  // a scene's jobs (FORGE-ORCHESTRATION.md section 3, « can have multiple at once »)
  const JOB = { rel: '🤝 lien', info: '🔎 info', harder: '⛰️ plus dur', fail: '↘️ tentative ratée', conseq: '↪️ conséquence', reverse: '🔄 croyance renversée', force: '⏳ force à agir', payoff: '🎯 payoff', want: '🎯 désir' };
  // why he wants it, said out loud to someone (t = whom, v = the victim)
  const REASON = {
    love: [(c) => `« ${c.t} me regarde comme si j’étais quelqu’un d’autre. »`, (c) => `« Quand ${c.t} rit, j’oublie où je suis. »`, (c) => `« Un jour, je dis tout à ${c.t}. Avant qu’il soit trop tard. »`],
    protect: [(c) => `« ${c.t}, c’est tout ce qui me reste. »`, (c) => `« Tant que je suis là, personne ne touche à ${c.t}. »`],
    find: [(c) => `« J’ai promis à ${c.t} de toujours venir. »`], free: [() => '« Dix ans dans cette ville. Un jour, je prends le premier bateau. »'],
    win: [() => '« Une fois. Une seule, qu’on me prenne au sérieux. »'], justice: [(c) => `« Je trouverai qui a fait ça à ${c.v}. »`], respect: [() => '« Plus personne ne rira de moi ici. »'],
    alive: [() => '« Je veux juste passer la nuit. »'], oust: [(c) => `« Tant que ${c.t} est là, rien n’ira. »`], hide: [() => '« Il y a des choses qu’on ne dit pas. »'],
  };
  // someone cares for someone (we get attached before it costs)
  const CARE = {
    protect: [(a, b) => `${a} garde à ${b} la meilleure place près du feu, sans rien dire.`, (a, b) => `${a} paie en douce la chope ${deN(b)}.`, (a, b) => `${a} recoud la manche ${deN(b)} en se moquant.`],
    love: [(a, b) => `${a} et ${b} rient d’une histoire que personne d’autre ne comprend.`, (a, b) => `${b} vole une gorgée dans la chope ${deN(a)}, et ${a} laisse faire.`],
    alive: [(a, b) => `${b} lève sa chope : « À la dernière tournée ! » ${a} trinque, et rit.`, (a, b) => `${b} promet à ${a} de lui payer sa dette demain, « sans faute ».`],
  };
  // the traces a hidden crime leaves (x the culprit, v the victim, o the other one it could be, s the false lead, it the item, spot)
  const TRACE = {
    murder: { item: 'un foulard taché', itemD: 'le foulard', open: (c) => `On retrouve le corps ${deN(c.v)} dans ${c.spot}.`,
      t1: (c) => `${c.w} vide les poches ${deN(c.v)} : la bourse est pleine. Ce n’est pas un vol. Quelqu’un en voulait ${aN(c.v)}.`, t1a: 'ce n’est pas un vol : quelqu’un en voulait à la victime',
      seen: (c) => `${c.w} a vu un foulard taché au fond de ${c.spot}.`, gone: (c) => `Le foulard a disparu de ${c.spot}. Seuls ${c.x} et ${c.o} y sont descendus depuis.`,
      lie: (c) => `${c.x} jure avoir servi au comptoir toute la soirée.`, slip: (c) => `${c.x} parle de l’heure exacte du crime. Personne ne l’avait dite.`, lieOut: (c) => `Personne n’a vu ${c.x} au comptoir après minuit.` },
    theft: { item: 'la bourse vide', itemD: 'la bourse vide', open: (c) => `${up(c.thing)} a disparu du coffre.`, money: (c) => /bourse|recette|caisse|pièce/.test(c.thing),
      t1: (c) => `${c.w} examine le coffre : il n’a pas été forcé. On avait la clé.`, t1a: 'le coffre n’a pas été forcé : le voleur avait la clé',
      seen: (c) => `${c.w} a vu ${c.item}, au fond de ${c.spot}.`, gone: (c) => `${up(c.item)} a disparu ${deN(c.spot)}. Seuls ${c.x} et ${c.o} y sont allés.`,
      lie: (c) => `${c.x} dit avoir passé la nuit au port.`, slip: (c) => (TRACE.theft.money(c) ? `${c.x} paie une tournée à toute la salle. Avec une pièce ${deN(c.thing.replace(/^(sa|son|ses) /, 'la '))}.` : c.gift ? `${c.gift} porte ${c.thing}. Un cadeau ${deN(c.x)}.` : `On retrouve ${c.thing} chez ${c.x}.`), lieOut: (c) => `Au port, personne n’a vu ${c.x} cette nuit-là.` },
    betray: { item: 'une lettre sans signature', itemD: 'la lettre', open: (c) => `On a vendu ${c.v} : quelqu’un a donné l’heure et le lieu.`,
      t1: (c) => `${c.w} fait le compte : l’heure n’était connue que d’ici.`, t1a: 'l’heure n’était connue que d’ici',
      seen: (c) => `${c.w} a trouvé une lettre sans signature, d’une écriture qu’on connaît.`, gone: (c) => `La lettre a brûlé dans l’âtre. Seuls ${c.x} et ${c.o} étaient près du feu.`,
      lie: (c) => `${c.x} jure n’avoir parlé à personne de la semaine.`, slip: (c) => `${c.x} connaît un mot de la lettre. Personne ne l’avait lue à voix haute.`, lieOut: (c) => `On a vu ${c.x} sortir parler à quelqu’un, la veille.` },
  };
  // THE KEY OF A CLUE (24/11): a trace only becomes a clue for a prepared mind. Someone holds a detail nobody else has (Justin
  // alone saw the stopped watch; the owner knows the cracked stone), planted early; later the culprit, in another line's scene
  // (a date, a round of drinks), says or shows the thing that only fits that detail. hold = the planted detail, slip = the
  // trace that meets it, proof = the object that could prove it (what the culprit makes disappear), out = said in front of all
  const KEY = {
    murder: { hold: (c) => `La montre ${deN(c.v)} s’est arrêtée à minuit dix. ${c.k} est seul à l’avoir vue, et ne le dit à personne.`,
      slip: (c) => `${c.x}, tout contre ${c.k} : « Depuis minuit dix, je n’arrive plus à fermer l’œil. » Personne n’a jamais dit l’heure.`,
      proof: (c) => `La montre ${deN(c.v)} a disparu de la réserve. Sans elle, c’est la parole de ${c.k} contre celle ${deN(c.x)}.`, item: 'la montre', echo: 'minuit dix' },
    theft: { hold: (c) => (/bague|collier|bijou/.test(c.thing) ? `${c.o0} : « ${up(c.thing.replace(/ de la mère .*$/, ''))} de ma mère. La pierre est fêlée, juste là. »` : `Dans ${c.thing}, il y avait une pièce trouée : un porte-bonheur.`),
      slip: (c) => (/bague|collier|bijou/.test(c.thing) ? `${c.g || c.x} porte une bague. La pierre est fêlée, juste là.` : `${c.x} paie sa chope avec une pièce trouée.`),
      proof: (c) => `${up(c.item)} a disparu de ${c.spot}. Sans ${c.item.startsWith('la ') ? 'elle' : 'lui'}, rien ne prouve que c’était ${c.x}.`, item: 'l’écrin vide', echo: 'la pierre fêlée' },
    betray: { hold: (c) => `Le rendez-vous était à minuit, à la chapelle. ${c.k} est seul à le savoir.`,
      slip: (c) => `${c.x}, sans y penser : « Pas ce soir. La chapelle, c’est trop loin. » Personne ne lui a parlé de la chapelle.`,
      proof: (c) => `La lettre a brûlé dans l’âtre. Sans elle, c’est la parole de ${c.k} contre celle ${deN(c.x)}.`, item: 'la lettre', echo: 'la chapelle' },
  };
  // THE INFORMATION SYSTEM (24/11). A fact only reaches a mind (a character, or the audience) through an EXPOSURE: a trace
  // meets someone, in a scene. Why it happens is one of a few CHANNELS, and the belief it makes can be right OR WRONG; the
  // one who now believes acts from what they want. search · encounter (KEY above) · tell · third party · misread · what the
  // crime bought (consequence) · the cover that leaves a trace. The audience is a mind too: it can learn before Justin
  // (mystery becomes suspense). Premier jet, data below.
  // TELL: who the culprit is shows, when the crime comes up (Knives Out: Marta cannot lie without vomiting)
  const TELL = [[(t) => t.peur >= 2, (c) => `${c.x} renverse sa chope quand on prononce le nom ${deN(c.v)}.`], [(t) => t.ruse >= 2, (c) => `${c.x} raconte sa soirée une deuxième fois. Avec les mêmes mots, exactement.`],
    [(t, f) => f === 'colere' || (t.violence >= 2 && t.rancune >= 2), (c) => `${c.x} frappe la table quand on parle ${deN(c.v)}, puis s’excuse trop vite.`], [(t, f) => f === 'vice', (c) => `${c.x} boit plus que d’habitude, et rit trop fort quand on parle ${deN(c.v)}.`],
    [(t) => t.fierte >= 2, (c) => `${c.x} ne supporte pas qu’on doute de sa parole, et quitte la table.`], [() => true, (c) => `${c.x} évite de regarder la place ${deN(c.v)}.`]];
  // MISREAD: a true trace, read wrong by a mind in fear or anger, and what it makes them do (Mystic River)
  const MISREAD = { seen: (c) => `${c.m} a vu les mains abîmées ${deN(c.r)}, cette nuit-là.`, out: (c) => `${c.m} a vu ${c.r} sortir dans la cour, cette nuit-là.`,
    act: { hit: (c) => `${c.m} se jette sur ${c.r} : « C’est toi ! » Il faut les séparer.`, warn: (c) => `${c.m}, à Justin, tout bas : « C’est ${c.r}. J’en suis sûr. »`, say: (c) => `${c.m} accuse ${c.r}, devant tous.` } };
  // THIRD PARTY: someone who knows, and uses it for what THEY want (a price for Justin)
  const THIRD = { love: (c) => `${c.t3} prend Justin à part : « J’ai vu qui. Je te le dis… si tu ne t’approches plus ${deN(c.l)}. »`, oust: (c) => `${c.t3} prend Justin à part : « Je sais qui. Mais c’est toi qui le diras, pas moi. »`,
    def: (c) => `${c.t3} prend Justin à part : « J’ai vu qui. Ça te coûtera une faveur. N’importe laquelle. »` };
  // the audience learns before Justin (the mystery becomes suspense: Vertigo's letter): the culprit, alone
  const GLIMPSE = { murder: (c) => `À l’abri des regards, dans la réserve, ${c.x} brûle une lettre ${deN(c.v)}. Ses mains tremblent.`, theft: (c) => `À l’abri des regards, ${c.x} regarde ${c.thing}. Puis tout disparaît sous le plancher.`,
    betray: (c) => `À l’abri des regards, dans la cour, ${c.x} compte l’argent de la trahison. Puis regarde vers la salle.` };
  // THE INVERTED DETECTIVE (24/11: Columbo, Breaking Bad, Joker): Justin did it. The audience sees it; the question is not
  // « who? » but « will he be caught? ». Whoever wants the truth hunts him; he covers by who he is, and it escalates, and each
  // cover costs him someone's trust
  const DEED = { murder: (c) => `Dans ${c.spot}, loin des regards, Justin tue ${c.v}. Ses mains tremblent encore.`, theft: (c) => `Quand la salle se vide, Justin ouvre le coffre et prend ${c.thing || 'la recette'}. Personne ne l’a vu.`,
    betray: (c) => `Justin glisse un mot à un inconnu : l’heure, et le lieu. On va vendre ${c.v}, et c’est lui.` };
  const CONFESS = { murder: (c) => `J’ai tué ${c.v}.`, theft: (c) => `C’est moi qui ai pris ${c.thing || 'la recette'}.`, betray: (c) => `C’est moi qui ai vendu ${c.v}.` };
  // what it costs him with the one he loves: he lies to them too
  const BLOOD = { murder: (b) => `${b} voit une tache sur la manche de Justin. Justin ment, à ${b} aussi.`, theft: (b) => `${b} demande à Justin d’où vient tout cet argent. Justin ment, à ${b} aussi.`,
    betray: (b) => `${b} demande à Justin où il était, la veille. Justin ment, à ${b} aussi.` };
  // the hunter's « it is one of us » and what waits for whoever did it
  const ONEOF = { murder: 'Personne n’est entré, personne n’est sorti cette nuit. C’est l’un de nous.', theft: 'Seuls ceux de la maison savaient où était la clé. C’est l’un de nous.', betray: 'Seuls ceux de cette salle savaient. C’est l’un de nous.' };
  const DOOM = { murder: 'la corde', theft: 'la prison', betray: 'la corde' };
  // WHY he did it, SHOWN before the deed (25/11, Justin's test: « why did he kill him? »): the motive acts on screen.
  // [who acts: v the victim, t the one it is about, j Justin, the line]
  const MOTIVE = {
    murder: { protect: ['v', (c) => `${c.v} coince ${c.t} contre le mur : « La prochaine fois, je ne serai pas aussi gentil. » Justin a tout vu.`], love: ['v', (c) => `${c.v} embrasse ${c.t}, devant Justin. ${c.t} se laisse faire.`],
      hide: ['v', (c) => `${c.v}, tout bas, à Justin : « Je sais ce que tu caches. Demain, tout le monde saura. »`], oust: ['v', (c) => `${c.v} pousse Justin devant tous : « Dégage d’ici. » La salle rit.`],
      win: ['v', (c) => `${c.v} prend la place que Justin attendait depuis des mois, et lui sourit.`], free: ['v', (c) => `${c.v} déchire le billet de Justin : « Tu ne pars pas. »`], def: ['v', (c) => `${c.v} a vu quelque chose. ${c.v} sourit à Justin : « On en reparlera. »`] },
    theft: { protect: ['t', (c) => `${c.t} compte ses pièces, encore. Il en manque. Demain, on vient prendre ce qui reste ${deN(c.t)}.`], love: ['t', (c) => (/recette|bourse|caisse|pièce/.test(c.thing) ? `${c.t} rêve de partir loin d’ici. Justin n’a pas un sou.` : `${c.t} regarde ${c.thing}, longtemps. Justin n’a rien à offrir.`)],
      hide: ['v', (c) => `${c.v}, à Justin : « Paie, ou je dis à tout le monde ce que je sais. »`], free: ['j', () => 'Le bateau part à l’aube. Justin n’a pas de quoi payer sa place.'], def: ['j', () => 'Le créancier de Justin attend dehors. Justin n’a plus rien.'] },
    betray: { protect: ['j', (c) => `Un inconnu fait une offre à Justin : livrer ${c.v}, et ${c.t} sera épargné${ge(c.tid)}.`], love: ['v', (c) => `${c.v} se dresse entre Justin et ${c.t}. Encore.`],
      hide: ['v', (c) => `${c.v} sait ce que Justin cache. ${c.v} vient de le lui dire.`], def: ['j', (c) => `Un inconnu promet à Justin ce qu’il veut, s’il livre ${c.v}.`] },
  };
  // what Justin hides, as the question someone asks and what he lies about (« Justin doit mentir une fois de plus » said nothing)
  const ASKH = { name: () => ['d’où il vient vraiment', 'son nom'], royal: () => ['pourquoi il parle comme un noble', 'sa naissance'], villain: () => ['s’il connaît l’homme qu’on recherche', 'l’homme qu’on recherche'],
    sick: () => ['pourquoi il tousse comme ça', 'sa toux'], leaving: () => ['s’il compte rester', 'son départ'], betray: (y) => [`ce qui s’est passé avec ${y}`, `ce qu’il a fait ${aN(y)}`], parent: () => ['qui est vraiment sa famille', 'sa famille'],
    sibling: () => ['qui est vraiment sa famille', 'sa famille'], crush: (y) => [`pourquoi il regarde ${y} comme ça`, `ce qu’il ressent pour ${y}`], cause: (y) => [`ce qu’il sait de ce que ${y} a perdu`, `ce que ${y} a perdu`],
    spy: () => ['pour qui il travaille vraiment', 'pour qui il travaille'], pretend: (y) => [`s’il aime vraiment ${y}`, `ce qu’il ressent pour ${y}`] };
  // protecting someone whose own wish is to leave: keeping them (never « Justin se met entre Melissa et Melissa »)
  const KEEP = [(c) => `Justin demande à ${c.t} de rester, encore une nuit.`, (c) => `Justin promet à ${c.t} de tout arranger, si ${c.t} reste.`, (c) => `Justin cache le sac ${deN(c.t)}.`];
  const RAISEJ = [(c) => `Pour celui qui a fait ça, ce sera ${c.doom}. Justin le sait.`, () => 'Justin se lave les mains, encore et encore.', () => 'La porte de la cour est ouverte. Justin pourrait partir, maintenant, et ne jamais revenir.'];
  // the seeds of a secret (2) and its proof, by info: x, y = the people of the info
  const SEED = {
    sibling: [(x, y) => `${x} et ${y} ont le même geste quand ils mentent.`, (x, y) => `${x} connaît le nom de la mère ${deN(y)}.`, (x, y) => `Un médaillon : ${x} et ${y}, enfants, côte à côte.`],
    parent: [(x, y) => `${x} regarde ${y} comme on regarde quelqu’un qu’on a perdu.`, (x, y) => `${x} connaît une cicatrice que ${y} n’a montrée à personne.`, (x, y) => `Une vieille lettre : ${x} y parle ${deN(y)}, enfant.`],
    betray: [(x, y) => `${x} change de sujet dès qu’on parle du passé ${deN(y)}.`, (x, y) => `${x} connaît le nom du bateau où ${y} a été vendu. Personne ne l’a jamais dit.`, (x, y) => `Une vieille lettre de la main ${deN(x)} : c’est ${x} qui a vendu ${y}.`],
    crush: [(x, y) => `${x} regarde ${y} quand personne ne voit.`, (x, y) => `${x} garde sur soi un mouchoir que ${y} a perdu.`, (x, y) => `${x} le dit enfin : c’est ${y}, depuis le début.`],
    cause: [(x, y) => `${x} ne supporte pas qu’on parle de ce que ${y} a perdu.`, (x) => `${x} était là, ce jour-là.`, (x, y) => `${x} l’avoue : c’est à cause ${deN(x)} que ${y} a tout perdu.`],
    leaving: [(x) => `${x} a payé sa chambre jusqu’à demain seulement.`, (x) => `Un sac prêt sous l’escalier : celui ${deN(x)}.`, (x) => `Le billet du bateau de l’aube, au nom ${deN(x)}.`],
    sick: [(x) => `${x} cache une toux derrière un rire.`, (x) => `Un flacon de remède dans la poche ${deN(x)}.`, (x) => `${x} s’effondre. Le guérisseur dit ce que ${x} cachait.`],
    villain: [(x) => `${x} se détourne quand on parle de celui qu’on cherche.`, (x) => `${x} connaît un détail que seul celui qu’on cherche connaît.`, (x) => `Le portrait affiché au port : c’est ${x}.`],
    spy: [(x, y) => `${x} sort chaque fois qu’on parle ${deN(y)}.`, (x, y) => `${x} et ${y} échangent un signe à travers la salle.`, (x, y) => `L’argent ${deN(y)} dans la poche ${deN(x)}.`],
    pretend: [(x, y) => `${x} sourit à ${y}, les yeux ailleurs.`, (x) => `${x}, tout bas : « Encore un soir, et c’est fini. »`, (x, y) => `${x} l’avoue : rien n’était vrai avec ${y}.`],
    name: [(x) => `${x} ne se retourne pas quand on l’appelle.`, (x) => `Un autre nom, brodé dans la cape ${deN(x)}.`, (x) => `Un voyageur reconnaît ${x}, sous un autre nom.`],
    royal: [(x) => `${x} se tient comme quelqu’un qu’on a toujours servi.`, (x) => `${x} cache une chevalière.`, (x) => `Les armoiries sur la chevalière : ${x} est de sang royal.`],
  };
  // the inner opposition: Justin's flaw makes him fail (a first time, then at the worst moment); at the climax he overcomes
  // it. easy = the sides of a choice his flaw pushes him toward
  const FLAW = {
    lache: { fail: (c) => `Face à ${c.o}, Justin baisse les yeux et recule.`, worst: (c) => `Au pire moment, Justin recule encore. C’est ${c.b} qui paie.`, over: 'Cette fois, Justin ne recule pas.', easy: ['alive', 'free', 'hide', 'respect'] },
    vice: { fail: () => 'Justin boit ce qu’il devait garder pour demain.', worst: (c) => `Justin joue la mise de trop. C’est ${c.b} qui paie.`, over: 'Justin repousse la chope. Il reste lucide.', easy: ['free', 'respect', 'alive'] },
    colere: { fail: (c) => `Justin explose devant tous contre ${c.o}. C’est lui qu’on regarde de travers.`, worst: (c) => `Justin frappe le premier. ${c.b} le regarde comme un étranger.`, over: 'Justin ne crie pas. Il parle bas, et on l’écoute.', easy: ['oust', 'respect'] },
    menteur: { fail: (c) => `Justin ment ${aN(c.c)} sur ${c.s || 'une broutille'}. ${c.c} le prend sur le fait.`, worst: (c) => `Justin ment encore. ${c.b} ne le croit plus.`, over: 'Pour une fois, Justin dit la vérité. Toute.', easy: ['hide', 'respect'] },
    orgueil: { fail: (c) => `Justin refuse l’aide ${deN(c.c)}. Il y va seul, et rate.`, worst: (c) => `Justin refuse de s’excuser. ${c.b} s’en va.`, over: 'Justin ravale sa fierté. Il demande de l’aide.', easy: ['respect', 'win'] },
    none: { fail: (c) => `Justin hésite une seconde de trop devant ${c.o}.`, worst: (c) => `Justin hésite encore. C’est ${c.b} qui paie.`, over: 'Justin n’hésite plus.', easy: ['alive', 'respect'] },
  };
  // what Justin does to get what he wants (round 1, round 2): the attempt the opposition answers
  const ATTEMPT = {
    justice: [(c) => `Justin interroge la salle : où était chacun cette nuit-là ?`, (c) => `Justin descend dans ${c.spot}, chercher ce ${que(c.w)} a vu.`, (c) => `Justin met ${c.o} face à ses mensonges.`],
    love: [(c) => `Justin attend ${c.t} près de l’escalier, pour lui parler seul à seul.`, (c) => `Justin dit enfin à ${c.t} ce qu’il ressent.`, (c) => `Justin propose à ${c.t} de partir avec lui.`],
    protect: [(c) => `Justin propose à ${c.t} de dormir à la taverne ce soir.`, (c) => `Justin se met entre ${c.t} et ${c.o}.`, (c) => `Justin cache ${c.t} dans la réserve.`],
    find: [(c) => `Justin fouille la chambre ${deN(c.t)}.`, (c) => `Justin demande à tous qui a vu ${c.t} en dernier.`, (c) => `Justin part sur la piste ${deN(c.t)}, de nuit.`],
    free: [() => 'Justin compte ce qu’il lui faut pour le passage.', () => 'Justin vend ce qu’il a pour payer le passage.', () => 'Justin prépare son sac.'],
    win: [() => 'Justin se lance devant toute la salle.', () => 'Justin demande sa chance au patron, devant tous.', () => 'Justin parie tout sur ce soir.'],
    alive: [() => 'Justin cherche une sortie par la cour.', (c) => `Justin demande à ${c.c} de le cacher.`, () => 'Justin tente de filer avant l’aube.'],
    aliveJ: [() => 'Justin vérifie que la porte de la cour s’ouvre. Au cas où.', () => 'Justin compte ce qu’il a d’argent. Pas assez pour partir loin.', () => 'Justin tente de filer avant l’aube. Il revient sur ses pas.'],
    respect: [(c) => `Justin répond enfin à ${c.o}, devant tous.`, (c) => `Justin met ${c.o} au défi, devant toute la salle.`, () => 'Justin refuse de baisser les yeux.'],
    oust: [(c) => `Justin pousse ${c.t} vers la sortie.`, (c) => `Justin monte la salle contre ${c.t}.`, (c) => `Justin pose un ultimatum à ${c.t}.`],
    hide: [() => 'Justin détourne la conversation.', () => 'Justin ment, droit dans les yeux, devant tous.', () => 'Justin change de table pour qu’on ne voie plus son visage.'],
  };
  // what Justin DOES to keep his own secret (y = the other one of the secret, f = the one off screen who looks for him)
  const HIDE = {
    villain: [() => 'Justin arrache l’avis de recherche cloué à la porte, avant que quelqu’un le lise.', (y, f) => `Justin change de table dès qu’on parle ${deN(f)}.`],
    name: [() => 'Justin répond à un autre nom, sans ciller.', () => 'Justin brûle la lettre qui porte son vrai nom.'], royal: [() => 'Justin cache sa chevalière sous sa manche.', () => 'Justin refuse de dire d’où il vient, même à ses amis.'],
    sick: [() => 'Justin cache sa toux derrière un rire.', () => 'Justin jette le flacon de remède avant qu’on le voie.'], leaving: [() => 'Justin cache son sac sous l’escalier.', () => 'Justin ment sur la date de son départ.'],
    betray: [(y) => `Justin change de sujet dès qu’on parle du passé ${deN(y)}.`, (y) => `Justin brûle la vieille lettre qui le trahirait auprès ${deN(y)}.`], cause: [(y) => `Justin évite le regard ${deN(y)} toute la soirée.`, (y) => `Justin ment à ${y} sur ce jour-là.`],
    crush: [(y) => `Justin fait semblant de ne pas regarder ${y}.`, (y) => `Justin cache le mouchoir ${deN(y)} dans sa poche.`], spy: [(y) => `Justin sort dès qu’on parle ${deN(y)}.`, (y) => `Justin cache l’argent ${deN(y)}.`],
    pretend: [(y) => `Justin sourit à ${y}, et ment.`, () => 'Justin compte les jours, en cachette.'], sibling: [(y) => `Justin détourne la conversation dès qu’on parle de la famille ${deN(y)}.`, () => 'Justin cache le médaillon.'],
    parent: [(y) => `Justin détourne la conversation dès qu’on parle des parents ${deN(y)}.`, () => 'Justin cache la vieille lettre.'],
  };
  // a desire that weighs more, as someone's action (the one it is about acts: t; w = Justin)
  const RAISE = {
    love: [(c) => `${c.t} reste après la fermeture, rien que pour Justin.`, (c) => `${c.t} prend la main de Justin, devant tous.`, (c) => `${c.t} propose à Justin de tout laisser, maintenant.`],
    protect: [(c) => `${c.t} avoue à Justin qu’il n’y a plus que lui.`, (c) => `${c.t} prend un risque en comptant sur Justin.`, (c) => `${c.t} n’a plus qu’une nuit, et le sait.`],
    justice: [(c) => `${c.w2} supplie Justin de ne pas laisser tomber.`, (c) => `Justin tient presque de quoi faire tomber ${c.t}.`, (c) => `${c.w2} attend que Justin parle. Toute la salle aussi.`],
    alive: [(c) => `${up(c.f)} sait où dort Justin.`, () => 'On a forcé la porte de la chambre de Justin.', () => 'Justin n’a plus nulle part où se cacher.'],
    free: [() => 'Le dernier bateau part à l’aube.', () => 'Il reste une seule place sur le bateau.', () => 'C’est partir maintenant ou jamais.'],
    respect: [() => 'Le lendemain, on en rit encore au comptoir.', () => 'Plus personne ne serre la main de Justin.', () => 'Justin n’a plus qu’une chance de laver son nom.'],
    find: [(c) => `Quelqu’un a vu ${c.t} : une direction.`, (c) => `Un mot ${deN(c.t)}, de sa main : « Viens. »`, (c) => `${c.t} est tout près. C’est maintenant.`],
    win: [() => 'Le patron cherche quelqu’un, ce soir.', () => 'Le patron regarde enfin Justin : ce soir, c’est lui ou personne.', () => 'Toute la salle attend de voir ce que vaut Justin.'],
    oust: [(c) => `${c.t} prend toute la place.`, (c) => `${c.t} rit de Justin devant tous.`, (c) => `${c.t} s’installe à sa place.`],
    hide: [() => 'Quelqu’un pose une question de trop sur le passé de Justin.', () => 'Justin doit mentir une fois de plus, devant tous.', () => 'Quelqu’un se souvient d’avoir vu Justin ailleurs, sous un autre nom.'],
  };

  // ==== B · THE TRUTH : the facts, who did it and why, who knows, the traces ====
  const victimOf = (e, G) => (e.v && K.live(e.v) ? K.nm(e.v) : G.fig && G.cr === e ? G.fig.n : 'un client');
  const thingOf = (e, G) => (G.fig && G.cr === e ? G.fig.thingOf : pick(`th${e.k}${e.x}`, e.v && K.live(e.v) ? [`la bague de la mère ${deN(K.nm(e.v))}`, `la bourse ${deN(K.nm(e.v))}`, 'la recette de la soirée'] : ['la recette de la soirée', 'la bourse du patron']));
  function factsOf(a, D, T, EV, G) {
    const out = [], S = K.S, allE = K.evs(), people = K.people().filter(K.live);
    EV.forEach((e) => { const k = allE.indexOf(e), m = T.ev.get(e) || null;
      if (K.EK[e.k].crime) { const whyLater = !!(m && m.info && K.iAct(m.info) > a), saw = (S.links || []).filter((l) => l.k === 'saw' && l.b === `e:${k}` && l.a[0] === 'p').map((l) => l.a.slice(2)).filter(K.live);
        const seek = D.find((d) => d.k === 'justice' && d.from === e && d.who === J) || D.find((d) => d.k === 'justice' && d.from === e);
        const needer = G.fig && G.cr === e && G.need && K.live(G.need) && G.need !== e.x ? G.need : null;
        out.push({ id: `c${k}`, kind: 'crime', e: K.EK[e.k].e, ev: e, act: a, by: e.x, hidden: !!e.h, mot: m, sus: m && m.sus && m.sus.id !== e.x ? m.sus : null, saw, seek: seek ? seek.who : e.s || J, needer,
          v: victimOf(e, G), vid: e.v && K.live(e.v) ? e.v : null, thing: e.k === 'theft' ? thingOf(e, G) : '', spot: pick(`sp${k}`, SPOTS), knowers: [e.x, ...saw],
          q: e.k === 'murder' ? `Qui a tué ${victimOf(e, G)} ?` : e.k === 'theft' ? 'Qui a volé ?' : `Qui a vendu ${victimOf(e, G)} ?`,
          truth: `${K.nm(e.x)} ${({ murder: 'a tué', theft: 'a volé', betray: 'a vendu' })[e.k]} ${e.k === 'theft' ? thingOf(e, G) : victimOf(e, G)}${m && !whyLater ? ` (${K.low1(m.fr)})` : ''}`, whyLater }); }
      if (e.k === 'gone') { const lv = K.kinds('secret').find((i) => i.id === 'leaving' && i.x === e.x);
        out.push({ id: `g${k}`, kind: 'gone', e: '👻', ev: e, act: a, by: e.x, hidden: true, mot: m, knowers: [e.x], q: `Où est ${K.nm(e.x)}, et pourquoi ?`, info: lv || null,
          seek: (D.find((d) => d.k === 'find' && d.t === e.x && d.who === J) || D.find((d) => d.k === 'find' && d.t === e.x) || {}).who || J, truth: `${K.nm(e.x)} est parti${m ? ` : ${m.fr}` : ''}` }); } });
    // the secrets that come out in this act (their seeds go as early as they can, even in act 1 for act 2)
    K.infos().forEach((i, k) => { const I = K.IN[i.id]; if (!['secret', 'mask', 'object'].includes(I.k)) return; const at = I.k === 'object' ? K.actOf(i) : K.iAct(i); if (at !== a) return;
      const motive = out.some((f) => f.mot && f.mot.info === i);
      out.push({ id: `i${k}`, kind: I.k === 'object' ? 'object' : 'secret', e: I.e, info: i, act: a, by: i.x, hidden: true, motive, knowers: [i.x], truth: K.infoFr(i),
        obj: I.k === 'object' ? (T.obj.get(i) || {}) : null, q: I.k === 'object' ? `Qu’y a-t-il dans ${K.low1(K.infoFr(i))} ?` : null }); });
    // the hidden links the author drew (« du même sang », a witness…): they come out in their act
    K.chains().forEach((ch) => { if (!ch.hid.length || ch.at !== a) return; const sawOnly = ch.hid.every((l) => l.k === 'saw'); if (sawOnly) return;
      out.push({ id: `l${ch.n}`, kind: 'link', e: '🕸️', ch, act: a, hidden: true, knowers: ch.kn, by: ch.ppl[0], truth: ch.txt(ch.hid)[0], seed1: K.clueOf(ch.hid[0])[0] }); });
    return out;
  }

  // ==== C · THE ENGINE : what Justin wants, the forces against it, how each one acts ====
  // a force: { who, kind (rival · culprit · keeper · ouster · threat · leaver · inner · figure · clock), d (its desire), vs (the
  // desire of Justin it opposes), moves (what it does, in order), at (the next move) }
  const KIND_OF = { '⚔️': 'rival', '💍': 'rival', '💘': 'rival', '🔍': 'culprit', '😤': 'ouster', '☠️': 'threat', '🕊️': 'leaver', '🔦': 'leaver', '🛡️': 'ouster', '🏆': 'rival' };
  function forcesOf(a, st, facts) {
    const { D, C } = st, out = [], add = (f) => { if (f.who !== J && out.some((x) => x.who === f.who && x.kind === f.kind)) return; out.push({ at: 0, ...f }); };
    for (const c of C) { const jd = [c.da, c.db].find((d) => d.who === J), od = jd && (jd === c.da ? c.db : c.da); if (!jd || !od || od.who === J || od.dead) continue;
      if (!K.live(od.who)) continue; const kd = KIND_OF[c.e] || 'rival'; if (kd === 'culprit') continue;   // a hidden culprit is added below; a known one defies (ouster)
      add({ who: od.who, kind: kd, d: od, vs: jd, why: c.fr }); }
    for (const c of C.filter((x) => x.e === '🔍')) { const jd = [c.da, c.db].find((d) => d.who === J), od = jd && (jd === c.da ? c.db : c.da);
      if (jd && od && K.live(od.who) && !facts.some((f) => f.kind === 'crime' && f.hidden && (f.by === od.who || (f.by === J && od.k === 'justice' && od.from === f.ev))) && !(od.k === 'justice' && od.from && od.from.x === J)) add({ who: od.who, kind: 'ouster', d: D.find((d) => d.who === od.who && d.k === 'oust' && d.t === J) || { id: `${od.who}:oust:${J}`, who: od.who, k: 'oust', t: J, s: 2 }, vs: jd, why: `${K.nm(od.who)} ne se cache pas` }); }
    // a protector of someone Justin goes after (🛡️ where Justin is the one he protects from): his opposition too
    for (const f of facts.filter((x) => x.kind === 'crime' && x.hidden && K.live(x.by) && x.by !== J)) { add({ who: f.by, kind: 'culprit', d: D.find((d) => d.who === f.by && d.k === 'hide') || null, vs: D.find((d) => d.who === J && d.k === 'justice') || null, fact: f, why: f.q }); }
    for (const f of facts.filter((x) => x.kind === 'crime' && x.hidden && x.by === J)) for (const d of D.filter((x) => x.k === 'justice' && x.from === f.ev && x.who !== J && K.live(x.who))) if (!out.some((x) => x.who === d.who && x.kind === 'hunter')) out.push({ at: 0, who: d.who, kind: 'hunter', d, vs: D.find((x) => x.who === J && x.k === 'hide') || null, fact: f, why: `${K.nm(d.who)} cherche qui a fait ça` });
    for (const e of K.evs().filter((x) => x.k === 'threat' && K.actOf(x) === a && x.x !== J && K.live(x.x))) { const o = out.find((x) => x.who === e.x); if (o && o.kind !== 'culprit') { o.kind = 'threat'; o.ev = e; } else if (!o) add({ who: e.x, kind: 'threat', ev: e, d: D.find((d) => d.who === e.x && d.k === 'oust') || null, vs: D.find((d) => d.who === J && d.t === e.v) || D.find((d) => d.who === J && d.k === 'alive') || null, why: `${K.nm(e.x)} menace ${e.v && K.live(e.v) ? K.nm(e.v) : 'quelqu’un'}` }); }
    for (const f of facts.filter((x) => x.kind === 'secret' && K.live(x.by) && x.by !== J && !x.motive)) { const o = out.find((x) => x.who === f.by); if (!o) add({ who: f.by, kind: 'keeper', d: D.find((d) => d.who === f.by && d.k === 'hide') || null, vs: null, fact: f, why: `${K.nm(f.by)} cache quelque chose` }); }
    const G = K.graph(); if (G.fig && G.vil && G.vil.x === J && a === 1) add({ who: 'f:A', kind: 'figure', d: null, vs: D.find((d) => d.who === J && d.k === 'hide') || D.find((d) => d.who === J && d.k === 'alive'), why: `${G.fig.n} cherche Justin` });
    add({ who: J, kind: 'inner', flaw: K.S.flaw[J] && FLAW[K.S.flaw[J]] ? K.S.flaw[J] : 'none', d: null, vs: null, why: K.S.flaw[J] ? `sa faille : ${K.F[K.S.flaw[J]].n.toLowerCase()}` : 'il hésite' });
    if (K.S.hard && K.S.hard.clock && a === K.ACTS()) add({ who: 'clock', kind: 'clock', d: null, vs: null, why: 'le temps' });
    // the order: who forces the climax first, then the violent, then the rest
    const fo = K.forcer(a), rank = (f) => (f.who === fo ? 0 : f.kind === 'threat' ? 1 : f.kind === 'culprit' ? 2 : f.kind === 'rival' ? 3 : f.kind === 'ouster' ? 4 : f.kind === 'inner' ? 8 : f.kind === 'clock' ? 9 : 5);
    return out.sort((x, y) => rank(x) - rank(y));
  }

  // ==== D · THE DESTINATION : the climax, the side Justin takes (from who he is), its price, what must come first ====
  const SELF = ['alive', 'respect', 'hide', 'free', 'win', 'oust'];
  function decide(A, B, a, facts = [], foes = []) {
    if (!A || !B) return { won: A || B, lost: null, why: '' };
    const AGAINST = ['spy', 'betray', 'pretend', 'cause'], broke = (d) => d.t && facts.find((f) => f.kind === 'secret' && f.info && AGAINST.includes(f.info.id) && f.info.x === d.t && (f.info.y === J || foes.includes(f.info.y) || f.info.id === 'pretend'));
    const blood = (d) => d.k === 'love' && d.t && facts.find((f) => f.kind === 'secret' && f.info && ['sibling', 'parent'].includes(f.info.id) && [f.info.x, f.info.y].includes(d.t) && [f.info.x, f.info.y].includes(J));
    const bA = broke(A) || blood(A), bB = broke(B) || blood(B); if (!!bA !== !!bB) { const won = bA ? B : A, f = bA || bB; return { won, lost: won === A ? B : A, why: `${up(K.infoFr(f.info))} : tout ce que Justin croyait se retourne.`, broke: f.id }; }
    const fl = K.S.flaw[J], easy = (FLAW[fl] || FLAW.none).easy, tr = K.traitsOf(J, a), ez = (d) => easy.includes(d.k) || SELF.includes(d.k);
    const own = (d) => ['hide', 'alive'].includes(d.k) && d.from && d.from.x === J && K.EK[d.from.k] && K.EK[d.from.k].crime, cold = tr.loyaute < Math.max(tr.ruse, tr.violence);
    if (!!own(A) !== !!own(B) && cold) { const won = own(A) ? A : B; return { won, lost: won === A ? B : A, why: 'Justin a franchi la ligne. Il ne reviendra pas en arrière.', dark: 1 }; }
    let won;
    if (ez(A) !== ez(B)) won = ez(A) ? B : A;   // he overcomes his flaw: the side it pushed him away from
    else if (['love', 'protect'].includes(A.k) && ['love', 'protect'].includes(B.k) && A.k !== B.k) won = (tr.loyaute >= tr.audace) === (A.k === 'protect') ? A : B;
    else if ([A.k, B.k].includes('justice')) won = A.k === 'justice' ? A : B;
    else won = A;
    const lost = won === A ? B : A;
    const why = ez(lost) ? (FLAW[fl] || FLAW.none).over : won.k === 'protect' ? 'Il tient à ses liens plus qu’à ce qu’il veut.' : won.k === 'justice' ? 'La vérité, même si elle coûte.' : 'Il suit son cœur.';
    return { won, lost, why };
  }
  // the character decides the climax (no player). forge.js asks it (pickOf) to build act 2 on it, so both engines agree and
  // nothing is written into the author's state; a tap on the climax in the old Créer (S.picked.pick) stays the author's own
  function pickOf() { K = FORGE.core(); const st = K.storyAt(1), [A, B] = st.X; if (!A || !B) return 0;
    const facts = K.infos().filter((i) => ['secret', 'mask'].includes(K.IN[i.id].k) && K.iAct(i) === 1).map((i) => ({ kind: 'secret', info: i }));
    const foes = K.evs().filter((e) => ['threat', 'revenge'].includes(e.k) && K.actOf(e) === 1).map((e) => e.x), d = decide(A, B, 1, facts, foes);
    return d.won && d.won.id === B.id ? 1 : 0; }

  // ==== E · THE AUDIENCE'S JOURNEY : how each secret is met. mystery = the audience asks (a question, a theory it is pushed
  // toward, clues, the answer); twist = the audience does not know there is a question (seeds, then it turns everything);
  // irony = the audience knows, someone on screen does not (we fear the moment they learn). Justin's own secret is irony;
  // a hidden crime, a disappearance, a box nobody opens are mysteries; a motive comes out with its crime; the rest are twists ====
  const modeOf = (f) => (f.kind === 'crime' ? (f.hidden ? (f.by === J ? 'irony' : 'mystery') : 'public') : f.kind === 'gone' || f.kind === 'object' ? 'mystery' : f.by === J ? 'irony' : f.motive ? 'motive' : 'twist');

  // ==== THE OPENING : which recipe the story supports (scored on what it has), its material, its spine ====
  const RECIPES = {
    mystery: { n: '🔎 Mystère', engage: 'la curiosité : il faut savoir', need: 'un fait concret inexpliqué, un indice disponible, une question qui vaut d’être suivie, une réponse qu’on peut retenir',
      spine: ['want', 'care', 'event', 'matter', 'theory', 'clue', 'turn'] },
    dilemma: { n: '⚖️ Dilemme', engage: 'la tension : il ne pourra pas tout garder', need: 'deux désirs incompatibles, des liens qui comptent, des conséquences qu’on peut poser tôt',
      spine: ['want', 'care', 'event', 'pressure', 'raiseA', 'raiseB', 'turn'] },
    opportunity: { n: '🚪 Occasion', engage: 'l’espoir et la peur : va-t-il l’avoir', need: 'un objectif désirable, une occasion immédiate, un vrai obstacle',
      spine: ['want', 'chance', 'obstacle', 'attempt', 'fail', 'raise', 'turn'] },
    secret: { n: '🩸 Le secret de Justin', engage: 'le suspense : sera-t-il pris ?', need: 'Justin a fait quelque chose de grave, le public le voit, quelqu’un cherche',
      spine: ['want', 'care', 'deed', 'event', 'cover', 'matter', 'turn'] },
  };
  function openingOf(st, facts, forces, dest) {
    const { D, X } = st, mainD = X[0] || D.find((d) => d.who === J && d.s >= 2), first = K.evs().filter((e) => K.EK[e.k] && K.actOf(e) === 1)[0];
    const myst = facts.find((f) => f.kind === 'crime' && f.hidden) || facts.find((f) => f.kind === 'gone'), sc = { mystery: 0, dilemma: 0, opportunity: 0 }, why = { mystery: [], dilemma: [], opportunity: [] };
    const plus = (r, n, t) => { sc[r] += n; why[r].push(`+${n} ${t}`); };
    if (myst) { plus('mystery', myst.kind === 'crime' ? 3 : 2, myst.kind === 'crime' ? 'un crime au coupable caché' : 'une disparition');
      if (myst.vid || myst.needer || (myst.seek && myst.seek !== J) || D.some((d) => d.who === J && d.t === myst.by && ['love', 'protect'].includes(d.k))) plus('mystery', 1, 'c’est personnel pour quelqu’un de présent');
      if (myst.sus) plus('mystery', 1, `une fausse piste toute trouvée (${K.nm(myst.sus.id)})`); if (myst.ev === first) plus('mystery', 1, 'il ouvre l’histoire'); }
    else why.mystery.push('aucun fait caché qui pose une question');
    const early = (d) => d && (!d.from || d.from === first), inner = st.C.some((c) => c.e === '⇄' && X[0] && X[1] && [c.da.id, c.db.id].sort().join() === [X[0].id, X[1].id].sort().join());
    if (X[0] && X[1]) { if (early(X[0]) && early(X[1])) plus('dilemma', 2, `les deux côtés existent dès le début (${K.lab(X[0])} / ${K.lab(X[1])})`); if (inner) plus('dilemma', 1, 'ils tirent Justin dans deux sens');
      if ([X[0], X[1]].filter((d) => d.t).length === 2) plus('dilemma', 1, 'deux personnes, de chaque côté'); if (K.forcer(1)) plus('dilemma', 1, `${K.nm(K.forcer(1))} peut forcer le choix`);
      if (dest.price && ['kill', 'gone', 'turn'].includes(dest.price.kind)) plus('dilemma', 1, 'le prix est concret'); }
    else why.dilemma.push('pas de choix entre deux désirs de Justin');
    const jw = D.find((d) => d.who === J && d.src === 'choisi') || mainD;
    if (jw && ['love', 'win', 'free', 'find'].includes(jw.k)) { plus('opportunity', 2, `Justin veut ${K.DK[jw.k].n}${jw.t ? ' ' + K.nm(jw.t) : ''}`);
      if (first && first.k === 'arrive') plus('opportunity', 1, `${K.nm(first.x)} arrive : une porte s’ouvre`);
      const ob = forces.filter((f) => ['rival', 'ouster', 'leaver'].includes(f.kind) && f.vs && f.vs.id === jw.id); if (ob.length) plus('opportunity', 1, `un vrai obstacle (${ob.map((f) => K.nm(f.who)).join(', ')})`);
      if (K.S.hard && K.S.hard.liked) plus('opportunity', 1, 'tout le monde adore celui d’en face'); }
    else why.opportunity.push('pas d’objectif à saisir');
    const mine0 = facts.find((f) => f.kind === 'crime' && f.hidden && f.by === J); if (mine0) { sc.secret = 6; why.secret = ['+6 Justin a fait quelque chose de grave : on le voit, personne d’autre'];
      if (myst === mine0) { sc.mystery = 0; why.mystery = ['le public sait qui : ce n’est plus un mystère']; } }
    const order = ['secret', 'mystery', 'dilemma', 'opportunity'], forced = K.S.open && RECIPES[K.S.open] && sc[K.S.open] > 0 ? K.S.open : null;
    const r = forced || order.reduce((b, k) => ((sc[k] || 0) > (sc[b] || 0) ? k : b), 'mystery');
    const o = { r, ...RECIPES[r], scores: sc, why: { secret: [], ...why }, forced: !!forced };
    if (r === 'secret') { const hu = forces.find((f) => f.kind === 'hunter'); o.fact = mine0; o.q = 'Justin sera-t-il pris ?'; o.hook = DEED[mine0.ev.k](ctxT(mine0));
      o.personal = hu ? `${K.nm(hu.who)} veut savoir` : 'tout le monde cherche'; o.clue = 'ce que Justin fait pour se couvrir'; o.unknown = 'personne ne sait, sauf Justin… et nous'; }
    if (r === 'mystery' && myst) { o.fact = myst; o.q = myst.q; o.hook = myst.kind === 'crime' ? TRACE[myst.ev.k].open(ctxT(myst)) : `${K.nm(myst.by)} sort « deux minutes » et ne revient pas.`;
      o.personal = myst.vid ? `${myst.v}, qu’on aura vu vivant juste avant` : myst.seek !== J ? `${K.nm(myst.seek)} veut savoir` : 'Justin veut savoir';
      o.clue = myst.kind === 'crime' ? TRACE[myst.ev.k].t1(ctxT(myst)) : 'ses affaires sont encore là'; o.unknown = myst.kind === 'crime' ? `que c’est ${K.nm(myst.by)}${myst.mot ? ', et pourquoi' : ''}` : 'où, et pourquoi'; }
    if (r === 'dilemma') { o.q = X[0] && X[1] ? `${up(K.lab(X[0]))} ou ${K.lab(X[1])} : que choisira Justin, et qu’est-ce que ça coûtera ?` : '';
      o.hook = first ? evOpen(first) : ''; o.personal = X.filter((d) => d && d.t).map((d) => K.nm(d.t)).join(' et ') || 'Justin lui-même'; o.clue = dest.price ? `si Justin choisit mal : ${dest.price.fr}` : ''; o.unknown = 'ce qu’il choisira'; }
    if (r === 'opportunity') { o.q = jw ? `Justin aura-t-il ${jw.t ? K.nm(jw.t) : K.DK[jw.k].n} ?` : ''; o.hook = first ? evOpen(first) : ''; o.personal = 'Justin le veut, et le dit';
      const ob = forces.find((f) => f.vs && jw && f.vs.id === jw.id && f.who !== J) || forces.find((f) => f.kind === 'inner'); o.clue = ob ? `l’obstacle : ${ob.kind === 'inner' ? ob.why : K.nm(ob.who)}` : ''; o.unknown = 's’il l’aura, et à quel prix'; }
    return o;
  }
  // someone changed by the last act (forge.js actState: a bascule, grief, leaving, a grudge), as a sentence
  const arcText = (r) => { const w = K.nm(r.who), v = r.v ? K.nm(r.v) : '', x = r.x ? K.nm(r.x) : 'Justin', loss = r.why === 'parti' ? `le départ ${deN(v)}` : `la mort ${deN(v)}`;
    return ({ vengeance: `${w} ne pardonne pas. Depuis ${loss}, ${w} tient ${x} pour responsable.`, rancune: `${w} n’oubliera pas : Justin a lâché ${w} au pire moment.`,
      deuil: `${w} porte le deuil, et ne se bat plus.`, fuite: `Depuis ${loss}, ${w} s’en va, et ne veut plus rien savoir.` })[r.mode] || `${up(r.fr)}.`; };
  const toYou = (s) => String(s).replace(/^sa /, 'ta ').replace(/^son /, 'ton ').replace(/^ses /, 'tes ');
  // what he lets go, said right: « et laisse son secret éclater », « au prix de son honneur »
  const letGo = (d) => ({ hide: 'et laisse son secret éclater', alive: 'au risque de sa vie', respect: 'et y laisse son honneur', free: 'et renonce à partir', win: 'et laisse passer sa chance', justice: 'et renonce à la vérité' })[d.k] || `et lâche ${K.lab(d)}`;
  const itemOf = (f) => (f.ev && f.ev.k === 'theft' ? (/bourse|recette|caisse|pièce/.test(f.thing) ? 'la bourse vide' : /bague|collier|bijou/.test(f.thing) ? 'l’écrin vide' : 'la boîte vide') : (TRACE[f.ev ? f.ev.k : 'murder'] || TRACE.murder).item);
  const ctxT = (f) => ({ x: K.nm(f.by), v: f.v, spot: f.spot, thing: f.thing || '', o: '', w: f.seek ? K.nm(f.seek) : 'Justin', item: itemOf(f), gift: f.mot && f.mot.d && f.mot.d.t && f.mot.d.k === 'love' && K.live(f.mot.d.t) ? K.nm(f.mot.d.t) : '' });
  const evOpen = (e) => ({ arrive: `${K.nm(e.x)} arrive.`, gone: `${K.nm(e.x)} sort « deux minutes » et ne revient pas.`, threat: `${K.nm(e.x)} menace ${e.v && K.live(e.v) ? K.nm(e.v) : 'quelqu’un'}.`, revenge: `${K.nm(e.x)} veut faire payer ${e.v && K.live(e.v) ? K.nm(e.v) : 'quelqu’un'}.`,
    murder: 'Quelqu’un est tué.', theft: 'Quelque chose a disparu.', betray: 'Quelqu’un a été vendu.' })[e.k] || '';

  // ==== F · THE MOMENTS. One moment = { id, act, circle, seg, kind, actor, desire, action, cause, link, world [], aud [],
  // plot, next, jobs [], fr, slide, who [] }. aud: { k: q (a question opens) · learn · suspect (a theory) · clear (a theory
  // breaks) · answer · care · fear · irony (the audience knows, they do not) · reframe (earlier moments mean something else) } ====
  function build() {
    K = FORGE.core(); const S = K.S, A = K.ACTS(), G = K.graph();
    const W = { M: [], n: 0, last: null, out: new Map(), knows: new Map(), pub: new Set(), lvl: {}, acts: [], hap: new Set(), deadAt: new Map(), loops: [] };
    const live = (p) => p && (p === J || (K.live(p) && !W.out.has(p)));
    for (let a = 1; a <= A; a++) {
      const st = K.storyAt(a), { D, X } = st, T = K.truth(D), EV = K.evs().filter((e) => K.EK[e.k] && K.actOf(e) === a && K.live(e.x));
      if (a === 2) { const AS = K.actState(); for (const t of AS.kill) { W.out.set(t, 'dead'); W.deadAt.set(t, 0); } for (const t of AS.gone) W.out.set(t, 'gone'); }
      W.lvl = {}; W.exposed = null; W.named = null; W.narrow = null; W.seer = null; W.cleared = null; W.hk = 0; W.cj = 0; W.framed = null; W.confessed = 0;   // each act climbs from the bottom again
      const facts = factsOf(a, D, T, EV, G), forces = forcesOf(a, st, facts).filter((f) => f.who === J || f.who === 'clock' || f.who === 'f:A' || live(f.who));
      const foes0 = K.evs().filter((e) => ['threat', 'revenge'].includes(e.k) && K.actOf(e) === a).map((e) => e.x);
      let dec = decide(X[0], X[1], a, factsOf(a, D, T, EV, G).filter((f) => f.kind === 'secret'), foes0); const hand = a === 1 && K.S.picked && K.S.picked.pick != null && !K.S.pickAuto;
      // a climax the author picked by hand (old Créer) stays theirs: act 2 is built on it
      if (hand && X[0] && X[1]) { const w = X[K.S.picked.pick === 1 ? 1 : 0]; dec = { won: w, lost: w === X[0] ? X[1] : X[0], why: dec.won === w ? dec.why : 'C’est ce que l’auteur a choisi.' }; }

      const price = dec.lost ? K.fateFor(dec.lost, a) : null, dest = { X, dec, price, forcer: K.forcer(a), pre: [] };
      for (const f of facts) f.mode = modeOf(f);
      for (const f of facts) if (f.kind === 'secret' && f.info && f.info.id === 'leaving' && forces.some((x) => x.kind === 'leaver' && x.who === f.by)) f.open = 1;
      const op = a === 1 ? openingOf(st, facts, forces, dest) : null;
      const ACT = { a, st, facts, forces, dest, op, from: W.M.length };
      W.acts.push(ACT);
      // ---- the moment maker ----
      // OPEN LOOPS (24/11): what the audience carries (a question, a suspicion, a hidden hand, a debt, a clock, an accusation…)
      // is state, not text: a moment opens it ({ id, k, who, to, fact, fr }), a later moment the audience sees closes it.
      // settle() closes what is left at the right place; nothing may dangle at the end
      const opened = (id) => W.loops.find((L) => L.id === id && !L.paid);
      const open = (m, L) => { if (!m || opened(L.id)) return m; W.loops.push({ act: a, ...L, open: m.id, paid: null }); (m.opens = m.opens || []).push(L.id); return m; };
      const pay = (m, id) => { const L = opened(id); if (!L || !m) return; L.paid = m.id; (m.pays = m.pays || []).push(id); };
      const put = (o) => { const m = { act: a, link: 'donc', world: [], aud: [], jobs: [], who: [], next: '', plot: '', also: [], ...o }; m.id = ++W.n;
        if (m.cause == null) m.cause = W.last ? W.last.id : null; else if (m.cause === 0) m.cause = null; if (!m.slide) m.slide = m.fr; m.who = [...new Set([m.actor, m.target, ...(m.who || [])].filter((p) => p && p !== 'clock' && p !== 'f:A' && !String(p).startsWith('f:')))];
        W.M.push(m); W.last = m;
        for (const L of o.open || []) open(m, L); delete m.open;
        // what a moment closes by what it is: someone who arrived shows what they came for; an answer closes its question, its
        // suspicions, its seeds; a cleared name closes the theory about them; a decision closes what was kept for it
        for (const L of W.loops.filter((x) => !x.paid && x.act === a)) {
          if (L.k === 'arr' && m.actor === L.who && m.kind !== 'event' && ['move', 'force', 'theory', 'lie', 'react', 'cover', 'raise'].includes(m.kind)) pay(m, L.id);
          if (L.k === 'arr' && m.actor === L.who && m.kind === 'event' && m.ev && m.ev.k !== 'arrive') pay(m, L.id);
          if (m.fact && L.fact === m.fact && ['reveal', 'notice'].includes(m.kind) && ['q', 'sus2', 'seed', 'obj', 'iro', 'key', 'wit'].includes(L.k)) pay(m, L.id);
          if (m.kind === 'clear' && L.k === 'sus' && L.who === m.actor) pay(m, L.id);
          if (m.kind === 'decide' && ['kept', 'climax'].includes(L.k)) pay(m, L.id);
          if (m.kind === 'decide' && L.k === 'owe' && L.to === J && won && won.t === L.who) pay(m, L.id);
          if (m.kind === 'price' && L.k === 'thr' && m.actor === L.who) pay(m, L.id);
          if (L.k === 'thr' && m.actor === L.who && ((m.kind === 'event' && m.ev && ['murder', 'revenge', 'threat'].includes(m.ev.k) && m.id !== L.open && m.act > L.act) || (m.kind === 'force' && /pour de bon|s’en prend/.test(m.fr)))) pay(m, L.id); }
        return m; };
      const knows = (p, fid) => W.pub.has(fid) || (W.knows.get(p) || new Set()).has(fid);
      const learn = (p, fid) => { if (!W.knows.has(p)) W.knows.set(p, new Set()); W.knows.get(p).add(fid); };
      const goPublic = (fid) => { W.pub.add(fid); for (const p of K.people()) learn(p, fid); };
      const D2 = (who, k, t) => D.find((d) => d.who === who && d.k === k && (t === undefined || d.t === t)) || null;
      const want = (who) => { const d = D.filter((x) => x.who === who && !x.late && x.s >= 2 && x.k !== 'alive').sort((x, y) => y.s - x.s)[0] || D.filter((x) => x.who === who && x.s >= 2).sort((x, y) => y.s - x.s)[0]; return d ? K.dSay(d) : `${K.nm(who)} veut sa place ici`; };
      const cast = () => K.S.cast.filter(live), J_ = 'Justin';
      const [XA, XB] = X, won = dec.won, lost = dec.lost;
      const lineOf = (d) => (d ? `${K.DK[d.k].e} ${K.dSay(d)}` : '');
      const lvlUp = (d) => { if (!d) return 0; W.lvl[d.id] = (W.lvl[d.id] || 0) + 1; return W.lvl[d.id]; };
      // who Justin confides in: the one who protects him or whom he protects, never his rival
      const conf = (d) => { const foes = new Set(forces.map((f) => f.who)), hard = new Set(forces.filter((f) => ['threat', 'culprit', 'ouster'].includes(f.kind)).map((f) => f.who)), no = (p) => !foes.has(p) && !(d && d.t === p) && !(mine && p === mine.vid);
        return cast().find((p) => no(p) && (D2(p, 'protect', J) || D2(J, 'protect', p))) || cast().find((p) => no(p) && !(XA && XA.t === p)) || cast().find((p) => !hard.has(p) && !(d && d.t === p) && (D2(p, 'love', J) || D2(p, 'protect', J) || D2(J, 'protect', p)))
          || cast().find((p) => !hard.has(p) && !(d && d.t === p)) || cast().find((p) => !(d && d.t === p)) || cast()[0]; };
      const flawF = forces.find((f) => f.kind === 'inner'), FL = FLAW[flawF ? flawF.flaw : 'none'];
      // does what he loves on the other side hold him back? Loyal or afraid: yes, he stays. Bold or proud: no, he goes, and the
      // other side pays for it (« possible, not always », Justin 24/11)
      const held = () => { const tr = K.traitsOf(J, a); return tr.loyaute + (tr.peur >= 2 ? 1 : 0) >= tr.audace + (tr.fierte >= 2 ? 1 : 0); };
      const myst = facts.find((f) => f.kind === 'crime' && f.hidden && live(f.by) && f.by !== J) || facts.find((f) => f.kind === 'gone');
      // THE INVERTED DETECTIVE (24/11): Justin did it and the audience sees it. Whoever wants the truth hunts him (the hunter);
      // he answers each step with a cover from who he is, and each one costs him (a lie to the one he loves, an innocent
      // accused, a witness scared). « Will he be caught? » is answered by what he chooses at the climax
      const mine = facts.find((f) => f.kind === 'crime' && f.hidden && f.by === J);
      let HF = mine ? forces.find((f) => f.kind === 'hunter' && live(f.who)) : null;
      if (mine && !HF) { const h = [mine.seek, ...cast()].find((p) => p && p !== J && p !== mine.vid && live(p)); if (h) { HF = { at: 0, who: h, kind: 'hunter', d: { id: `${h}:justice`, who: h, k: 'justice', t: J, s: 2 }, vs: null, fact: mine, why: `${K.nm(h)} cherche qui a fait ça` }; forces.push(HF); } }
      const H = HF ? HF.who : null, Hn = H ? K.nm(H) : '';
      const closeH = () => !!H && !!(D2(H, 'love', J) || D2(H, 'protect', J) || D2(J, 'love', H) || D2(J, 'protect', H) || ['friend', 'family', 'couple', 'crush'].includes(K.rel(H, J)));
      const B0 = mine ? [won, lost, XA, XB, ...D.filter((d) => d.who === J)].map((d) => (d && d.who === J && ['love', 'protect'].includes(d.k) ? d.t : null)).find((p) => p && p !== H && live(p)) || null : null;
      // the motive points at someone he loves or protects (« Amare menaçait Melissa »): the hunter will suspect them. That is his
      // real dilemma, concrete: let them pay (he is safe), or speak (25/11, from Justin's test)
      const SUSP = mine && mine.sus && live(mine.sus.id) && mine.sus.id !== H && mine.sus.id !== mine.vid && (D2(J, 'love', mine.sus.id) || D2(J, 'protect', mine.sus.id)) ? mine.sus.id : null;
      const S0 = mine ? [mine.sus && mine.sus.id, ...cast()].find((p) => p && p !== J && p !== H && p !== mine.vid && p !== B0 && live(p) && !D2(J, 'love', p) && !D2(J, 'protect', p)) || null : null;
      const thirdOf0 = (f) => K.S.cast.filter(live).find((p) => p !== f.by && p !== f.vid && (D2(p, 'oust', f.by) || [XA, XB].some((d) => d && d.t && D2(p, 'love', d.t) && d.t !== p)));
      const mf = () => forces.find((f) => f.who !== J && f.kind !== 'clock' && f.kind !== 'hunter' && !(f.kind === 'culprit' && f.fact && !W.hap.has(f.fact.ev))) || null;
      // ---- the generators (each returns the moment or null) ----
      const g = {};
      g.want = (d, seg = 'open') => { if (!d) return null; const c = conf(d), fe = d.from && facts.find((f) => f.ev === d.from), hidden = !fe || fe.hidden;
        const say = d.k === 'justice' && !hidden ? `« ${K.nm(d.t)} paiera pour ce que ${K.nm(d.t)} a fait. »` : pick(`rs${d.id}`, REASON[d.k] || REASON.alive)({ t: d.t ? K.nm(d.t) : '', v: fe ? fe.v : myst ? myst.v : 'eux' });
        return put({ seg, circle: 2, kind: 'want', actor: J, desire: lineOf(d), action: `le dit à ${K.nm(c)}`, target: c, fr: `Justin, à ${K.nm(c)} : ${say}`, slide: `Justin l’avoue à ${K.nm(c)} : ${say}`,
          world: [`${K.nm(c)} sait ce que veut Justin`], aud: [{ k: 'learn', fr: `Justin veut ${K.DK[d.k].n}${d.t ? ' ' + K.nm(d.t) : ''}` }], plot: `${lineOf(d)} : ouverte`, next: 'son but est posé : tout ce qui le contrarie comptera', jobs: ['want', 'rel'], tech: 'Un rêve et sa raison', goal: 'desire', line: d.id, cause: a === 1 && seg === 'open' && !W.M.some((m) => m.act === 1) ? 0 : undefined }); };
      g.care = (a1, b1, k, seg = 'open') => { if (!live(a1) || !live(b1)) return null; const t = pick(`ca${a1}${b1}`, CARE[k] || CARE.protect)(K.nm(a1), K.nm(b1)), al = k === 'alive';
        return put({ seg, circle: 1, kind: 'care', actor: al ? b1 : a1, target: al ? a1 : b1, desire: al ? want(b1) : lineOf(D2(a1, k, b1) || D2(a1, 'protect', b1)) || `${K.nm(a1)} tient à ${K.nm(b1)}`, action: al ? 'vit, et on l’aime' : 'prend soin', fr: t,
          aud: [{ k: 'care', fr: `on s’attache à ${K.nm(b1)}${a1 !== J ? ` et à ${K.nm(a1)}` : ''}` }], plot: 'un lien qu’on va mettre en jeu', next: `perdre ${K.nm(b1)} fera mal`, jobs: ['rel'], tech: 'Show care', goal: 'rel' }); };
      // the event: what happens, discovered by the one it hurts
      g.event = (e, seg = 'open') => { if (!e) return null; const f = facts.find((x) => x.ev === e), c = f ? ctxT(f) : {}, circle = 3;
        if (f && f.kind === 'crime' && f.by === J && f.hidden && W.deed !== f.id) g.deed(f, seg);
        if (f && f.kind === 'crime') { const disc = f.vid && e.k !== 'murder' ? f.vid : f.seek && live(f.seek) ? f.seek : f.by === J && H ? H : J, Tt = TRACE[e.k];
          if (e.k === 'murder' && f.vid && W.out.get(f.vid) !== 'dead') { W.out.set(f.vid, 'dead'); W.deadAt.set(f.vid, W.n + 1); } W.hap.add(e);
          return put({ seg, circle, kind: 'event', actor: disc, desire: f.vid && disc !== f.vid ? `${K.nm(disc)} tenait à ${f.v}` : want(disc), action: 'découvre', link: 'soudain', ev: e, fact: f.id,
            fr: f.hidden ? Tt.open(c) : `${Tt.open(c)} C’est ${K.nm(f.by)}, et ${K.nm(f.by)} ne s’en cache pas.`, world: [e.k === 'murder' ? `${f.v} est mort` : e.k === 'theft' ? `${f.thing} a disparu` : `${f.v} a été vendu`], aud: f.hidden && f.by !== J ? [{ k: 'q', ref: f.id, fr: f.q }] : f.hidden ? [{ k: 'fear', fr: 'on va chercher qui' }] : [{ k: 'learn', fr: f.truth }], open: f.hidden && f.by !== J ? [{ id: `q:${f.id}`, k: 'q', fact: f.id, fr: f.q }] : [],
            plot: `${f.e} le crime : ouvert`, next: `${K.nm(f.by)} devra se cacher ; quelqu’un voudra savoir`, jobs: ['info', 'force'], tech: 'Demande qui révèle', goal: 'info' }); }
        if (e.k === 'gone') { W.out.set(e.x, 'gone'); W.hap.add(e); return put({ seg, circle, kind: 'event', actor: e.x, desire: want(e.x), action: 'disparaît', link: 'soudain', ev: e, fact: f && f.id,
          fr: `${K.nm(e.x)} sort « deux minutes » et ne revient pas. Ses affaires sont encore là.`, world: [`${K.nm(e.x)} n’est plus là`], aud: [{ k: 'q', ref: f && f.id, fr: f ? f.q : `Où est ${K.nm(e.x)} ?` }], open: f ? [{ id: `q:${f.id}`, k: 'q', fact: f.id, fr: f.q }] : [],
          plot: '👻 la disparition : ouverte', next: 'ceux qui tiennent à lui le chercheront', jobs: ['info', 'force'], tech: 'Sort et ne revient pas', goal: 'curiosity' }); }
        if (e.k === 'arrive') { W.hap.add(e); const d = D.find((x) => x.who === e.x && x.s >= 2 && x.t); return put({ seg, circle, kind: 'event', actor: e.x, desire: want(e.x), action: 'arrive', link: 'soudain', ev: e,
          fr: `${K.nm(e.x)} entre. La salle se tait${d ? ` ; ${K.nm(e.x)} ne regarde ${que(K.nm(d.t))}` : ''}.`, world: [`${K.nm(e.x)} est là`], aud: [{ k: 'q', ref: `arr${e.x}`, fr: `Que vient faire ${K.nm(e.x)} ?` }], open: [{ id: `arr:${e.x}`, k: 'arr', who: e.x, fr: `Que vient faire ${K.nm(e.x)} ?` }],
          plot: `⚡ l’arrivée ${deN(K.nm(e.x))}`, next: d ? `${K.nm(e.x)} va vouloir ${K.nm(d.t)}` : 'l’équilibre change', jobs: ['force'], tech: 'Entrée qui fait taire', goal: 'char' }); }
        if (e.k === 'threat' || e.k === 'revenge') { W.hap.add(e); const v = e.v && live(e.v) ? e.v : J, mo = T.ev.get(e), dl = pick(`dl${e.x}`, ['Avant l’aube', 'Avant la fermeture', 'Au dernier bateau']);
          return put({ seg, circle, kind: 'event', actor: e.x, desire: mo ? mo.fr : want(e.x), action: e.k === 'threat' ? 'menace' : 'veut faire payer', target: v, link: 'soudain', ev: e,
            fr: e.k === 'threat' ? `${K.nm(e.x)} plante son couteau dans la table, devant ${K.nm(v)} : « ${dl}, tu paies. »` : v === J && W.loops.some((L) => L.k === 'acc' && L.who === e.x && L.act < a) ? `${K.nm(e.x)}, à Justin, devant tous : « La cave. Tu m’y as laissé. Tu vas me le payer. »` : `${K.nm(e.x)}, à ${K.nm(v)}, devant tous : « Tu vas me le payer. »`,
            world: [`${K.nm(v)} est menacé`], aud: [{ k: 'fear', fr: `peur pour ${K.nm(v)}` }, { k: 'q', ref: `thr${e.x}`, fr: `${K.nm(e.x)} ira-t-il jusqu’au bout ?` }], open: [{ id: `thr:${e.x}`, k: 'thr', who: e.x, to: v, fr: `${K.nm(e.x)} ira-t-il jusqu’au bout ?` }], plot: `☠️ la menace contre ${K.nm(v)}`, next: `ceux qui tiennent à ${K.nm(v)} vont s’interposer`, jobs: ['force', 'harder'], tech: 'Menace : si tu X, je Y', goal: 'stakes', dl }); }
        return null; };
      // Justin's crime, shown: the audience sees it, nobody else (dramatic irony). « Will he be caught? » opens here
      g.deed = (f, seg) => { const c = ctxT(f), k = f.ev.k; if (k === 'murder' && f.vid) { W.out.set(f.vid, 'dead'); W.deadAt.set(f.vid, W.n + 1); } learn(J, f.id); W.deed = f.id;
        const m = put({ seg, circle: 3, kind: 'deed', actor: J, desire: f.mot && !f.whyLater ? up(f.mot.fr) : lineOf(D2(J, 'hide')) || 'Justin veut s’en sortir', action: 'passe à l’acte', target: f.vid || null, link: 'soudain', fact: f.id,
          fr: DEED[k](c), world: [up(f.truth)], aud: [{ k: 'irony', fr: 'le public a vu ce que Justin a fait ; personne d’autre' }], plot: `${f.e} Justin passe à l’acte`, next: 'on va le découvrir ; Justin devra se cacher', jobs: ['force', 'info'], tech: 'Ironie dramatique', goal: 'stakes',
          open: [{ id: `caught:${f.id}`, k: 'caught', fact: f.id, fr: 'Justin sera-t-il pris ?' }] });
        if (f.vid) pay(m, `thr:${f.vid}`); return m; };
      // his covers, one per step of the hunt, and they escalate: the alibi, then the proof (planted on someone if he is cunning,
      // destroyed if not), then what he is (violent: he scares the one who saw; afraid: he gets ready to run; else he lets an
      // innocent pay, or lies to his friend's face)
      const didJ = (kind) => W.M.some((m) => m.act === a && m.kind === kind && mine && m.fact === mine.id);
      g.coverJ = (seg, cause) => { if (!mine || W.pub.has(mine.id) || (W.cj || 0) >= 3) return null; const n = W.cj = (W.cj || 0) + 1, f = mine, k = f.ev.k, c = ctxT(f), tr = K.traitsOf(J, a), Tt = TRACE[k] || TRACE.murder, item = itemOf(f), S = S0 && live(S0) ? K.nm(S0) : null;
        const base = { seg, circle: 4, kind: 'coverJ', actor: J, desire: lineOf(D2(J, 'hide')) || 'Justin veut garder son crime caché', fact: f.id, cause, link: 'donc', plot: `${f.e} Justin se couvre (${n})`, jobs: ['harder'], goal: 'stakes' };
        if (n === 1) return put({ ...base, action: 'ment', fr: `${Tt.lie({ ...c, x: 'Justin' })}${H ? ` ${Hn} le croit.` : ''}`, world: H ? [`${Hn} croit Justin`] : ['Justin a un alibi'], aud: [{ k: 'irony', fr: 'le public sait que Justin ment' }], next: 'le mensonge tiendra-t-il ?', tech: 'La réponse trop parfaite' });
        if (n === 2) { if (tr.ruse >= 2 && S) { W.framed = S0; return put({ ...base, action: 'fait accuser quelqu’un', target: S0, fr: `Justin glisse ${item} dans les affaires ${deN(S)}. Le lendemain, on l’y trouve. Tous les regards vont vers ${S}.`,
            world: [`on accuse ${S}`], aud: [{ k: 'irony', fr: `${S} est innocent, et le public le sait` }], next: `${S} paiera pour Justin`, tech: 'Ça se retourne', open: [{ id: `acc:${S0}`, k: 'acc', who: S0, fact: f.id, fr: `${S} accusé à la place de Justin` }] }); }
          return put({ ...base, action: 'fait disparaître la preuve', fr: `Justin fait disparaître ${item}. Une minute plus tard, ${H ? Hn : 'quelqu’un'} descend dans ${f.spot}.`, world: [`${item.replace(/^un /, 'le ').replace(/^une /, 'la ')} a disparu`], aud: [{ k: 'fear', fr: 'il s’en est fallu d’une minute' }], next: 'il n’y a plus de preuve… presque', tech: 'Un objet pas à sa place' }); }
        if (SUSP && live(SUSP) && opened(`acc:${SUSP}`)) return put({ ...base, action: 'lâche celle qu’il protège', target: SUSP, fr: `On demande à Justin où était ${K.nm(SUSP)} cette nuit-là. Justin dit qu’il ne sait pas.`, world: [`Justin a lâché ${K.nm(SUSP)}`], aud: [{ k: 'fear', fr: `il se sauve, et ${K.nm(SUSP)} paie` }], next: `${K.nm(SUSP)} l’a entendu`, tech: 'Ça se retourne' });
        const wit = (f.saw || []).find((p) => live(p) && p !== H && p !== B0) || cast().find((p) => live(p) && ![H, f.vid, S0, B0, J].includes(p)), Wn = wit ? K.nm(wit) : '';
        if (tr.violence >= 2 && wit) return put({ ...base, action: 'fait taire un témoin', target: wit, fr: `${Wn} a vu Justin remonter ${deN(f.spot)}. Justin coince ${Wn} dans la cour : « Tu n’as rien vu. »`, world: [`${Wn} a peur de Justin`], aud: [{ k: 'fear', fr: 'Justin devient quelqu’un d’autre' }], next: `${Wn} se taira… pour l’instant`, tech: 'Le témoin se tait',
          open: [{ id: `wit:${wit}`, k: 'wit', who: wit, fact: f.id, fr: `ce que ${Wn} a vu` }] });
        if (tr.peur >= 2) return put({ ...base, action: 'prépare sa fuite', fr: 'La nuit, Justin prépare son sac. S’il le faut, il partira avant l’aube.', world: ['Justin est prêt à fuir'], aud: [{ k: 'fear', fr: 'il pourrait tout laisser derrière lui' }], next: 'partir, ou rester ?', tech: 'Ça se prépare' });
        if (S && W.framed !== S0 && tr.ruse >= 1) { W.framed = S0; return put({ ...base, action: 'détourne les soupçons', target: S0, fr: `Justin, l’air de rien, rappelle à tous où était ${S} cette nuit-là. Les regards se tournent vers ${S}.`, world: [`on soupçonne ${S}`], aud: [{ k: 'irony', fr: `${S} est innocent, et le public le sait` }], next: `${S} paiera pour Justin`, tech: 'Ça se retourne',
          open: [{ id: `acc:${S0}`, k: 'acc', who: S0, fact: f.id, fr: `${S} accusé à la place de Justin` }] }); }
        if (S && W.framed === S0) return put({ ...base, action: 'laisse payer un innocent', target: S0, fr: `On enferme ${S} à la cave pour l’interroger. Justin se tait.`, world: [`${S} paie pour Justin`], aud: [{ k: 'fear', fr: `${S} paie pour Justin` }], next: 'jusqu’où ira-t-il ?', tech: 'Ça se retourne' });
        return H ? put({ ...base, action: 'ment encore', target: H, fr: `Justin regarde ${Hn} dans les yeux, et ment encore.`, world: ['Justin s’enfonce'], aud: [{ k: 'fear', fr: 'chaque mensonge le lie un peu plus' }], next: `${Hn} le croira-t-il encore ?`, tech: 'La réponse trop parfaite' }) : null; };
      // the motive, on screen, before the deed
      g.motive = (f, seg) => { const md = f.mot && f.mot.d || {}, MK = MOTIVE[f.ev.k] || MOTIVE.murder, tOk = md.t && live(md.t) && md.t !== J, e0 = (tOk && MK[md.k]) || MK.def || MK[Object.keys(MK).pop()];
        const [who0, fn] = e0, A0 = who0 === 'v' && f.vid && live(f.vid) ? f.vid : who0 === 't' && tOk ? md.t : J, c = { v: f.v, t: tOk ? K.nm(md.t) : '', tid: md.t, thing: f.thing || 'la recette' };
        return put({ seg, circle: 2, kind: 'motive', actor: A0, target: A0 === J ? null : J, desire: A0 === J ? lineOf(md) || `${K.nm(J)} n’a plus le choix` : want(A0), action: 'pousse Justin à bout', fact: f.id, link: 'mais', fr: fn(c),
          world: [up(f.mot.fr)], aud: [{ k: 'learn', fr: `pourquoi Justin va le faire : ${K.low1(f.mot.fr)}` }], plot: `${f.e} ce qui le pousse`, next: 'Justin va agir', jobs: ['force', 'want'], tech: 'Show care', goal: 'stakes' }); };
      // the one he protects is suspected (the motive points at them): his dilemma made concrete
      g.suspJ = (seg, cause) => { if (!SUSP || !live(SUSP) || didJ('suspJ') || W.pub.has(mine.id)) return null; const S = K.nm(SUSP), lv = forces.some((x) => x.kind === 'leaver' && x.who === SUSP);
        return put({ seg, circle: 5, kind: 'suspJ', actor: H, target: SUSP, desire: lineOf(HF.d) || `${Hn} veut la vérité`, action: 'soupçonne', fact: mine.id, cause, link: 'donc',
          fr: `${Hn} : « ${up(mine.mot.fr)}. Qui d’autre avait une raison ? »${lv ? ` Et ${S} part à l’aube.` : ''} Tous les regards vont vers ${S}.`, world: [`on soupçonne ${S}`],
          aud: [{ k: 'irony', fr: `${S} n’a rien fait ; c’est Justin` }, { k: 'fear', fr: `${S} va payer pour Justin` }], plot: `${mine.e} le soupçon tombe sur ${S}`, next: `Justin laissera-t-il ${S} payer ?`, jobs: ['harder', 'reverse'], tech: 'Ça se retourne', goal: 'stakes',
          open: [{ id: `acc:${SUSP}`, k: 'acc', who: SUSP, fact: mine.id, fr: `${S} soupçonné${ge(SUSP)} à la place de Justin` }] }); };
      // what it costs him: the one he loves sees something, and he lies to them too
      g.costJ = (seg, cause) => { if (!mine || !B0 || !live(B0) || B0 === H || didJ('costJ')) return null; const B = K.nm(B0);
        if ((mine.saw || []).includes(B0)) return put({ seg, circle: 5, kind: 'costJ', actor: B0, target: J, desire: want(B0), action: 'se tait pour lui', fact: mine.id, cause, link: 'mais', fr: `${B} a vu Justin remonter ${deN(mine.spot)}. ${B} ne dit rien. Pour lui.`, world: [`${B} se tait pour Justin`],
          aud: [{ k: 'fear', fr: `${B} porte le secret de Justin` }], plot: `${mine.e} ce que ça lui coûte : ${B} devient complice`, next: 'le secret est entre eux', jobs: ['rel', 'harder'], tech: 'Le témoin se tait', goal: 'rel', open: [{ id: `lied:${B0}`, k: 'lied', who: B0, fact: mine.id, knew: 1, fr: `${B} se tait pour Justin` }] });
        return put({ seg, circle: 5, kind: 'costJ', actor: B0, target: J, desire: want(B0), action: 'voit quelque chose', fact: mine.id, cause, link: 'mais', fr: BLOOD[mine.ev.k](B), world: [`Justin a menti à ${B}`], aud: [{ k: 'fear', fr: `si ${B} apprend, Justin perd ${B}` }],
          plot: `${mine.e} ce que ça lui coûte`, next: `le mensonge est entre eux`, jobs: ['rel', 'harder'], tech: 'Petit mensonge démasqué', goal: 'rel', open: [{ id: `lied:${B0}`, k: 'lied', who: B0, fact: mine.id, fr: `Justin a menti à ${B}` }] }); };
      // he gives himself away (the culprit's slip, seen from his side), and the hunter sees it
      g.slipJ = (seg) => { if (!mine || didJ('slipJ')) return null; const c = { ...ctxT(mine), x: 'Justin' }, Tt = TRACE[mine.ev.k] || TRACE.murder;
        return put({ seg, circle: 5, kind: 'slipJ', actor: J, desire: lineOf(D2(J, 'hide')) || 'Justin veut garder son crime caché', action: 'se trahit', fact: mine.id, link: 'mais', fr: Tt.slip(c), world: [], aud: [{ k: 'fear', fr: 'il vient de se trahir' }],
          plot: `${mine.e} il se trahit`, next: H ? `${Hn} l’a-t-il remarqué ?` : 'quelqu’un l’a-t-il remarqué ?', jobs: ['info'], tech: 'Une trace sur lui', goal: 'stakes' }); };
      // the answer to « will he be caught? », from his choice: if he let his own safety go for what he loves, he confesses;
      // if he kept it, he is not caught, and it costs (the friend who knows walks away, the innocent still pays); if the
      // choice was elsewhere, the hunter names him
      g.answerJ = (seg) => { if (!mine || !opened(`caught:${mine.id}`)) return null; const SELFK = ['alive', 'hide', 'free'], sL = lost && lost.who === J && SELFK.includes(lost.k), sW = won && won.who === J && SELFK.includes(won.k), c = ctxT(mine);
        let o;
        if (W.pub.has(mine.id)) o = { actor: J, act: 'est pris', fr: 'Tout le monde sait, maintenant.', world: ['Justin est pris'] };
        else if (sL) { goPublic(mine.id); W.exposed = J; W.confessed = 1; o = { actor: J, act: 'avoue', fr: `Justin, devant tous : « C’est moi. ${CONFESS[mine.ev.k](c)} »${won && won.t && live(won.t) ? ` Il regarde ${K.nm(won.t)}. Il ne mentira plus.` : ''}`, world: ['tout le monde sait'] }; }
        else if (sW && SUSP && live(SUSP) && opened(`acc:${SUSP}`)) { const S = K.nm(SUSP); o = { actor: J, act: 'se tait', target: SUSP, fr: `À l’aube, on emmène ${S}. Justin regarde, et se tait.${H && live(H) ? ` ${Hn} regarde Justin.` : ''}`, world: [`${S} paie pour Justin`] };
          const L = opened(`acc:${SUSP}`); if (L) L.silent = 1; }
        else if (sW || !H || !live(H)) { if (H) learn(H, mine.id); const th = H ? K.traitsOf(H, a) : {}, gone = W.M.some((m) => m.kind === 'coverJ' && m.fact === mine.id && /disparaître|glisse/.test(m.fr));
          // the one who knows: silent for love (and gone from his life), or saying it to a room that no longer has the proof
          o = !H || !live(H) ? { actor: J, act: 's’en tire', fr: 'Personne ne saura jamais. Justin, si.', world: ['Justin s’en tire'] }
            : closeH() && th.loyaute >= 2 ? { actor: H, act: 'se tait', fr: `${Hn} sait. ${Hn} ne dira rien. Mais ${Hn} ne parlera plus jamais à Justin.`, world: [`${Hn} sait, et se tait`] }
              : gone ? { actor: H, act: 'le dit, en vain', target: J, fr: `${Hn} le dit devant tous. Personne ne croit ${Hn} : ${W.framed && live(W.framed) ? `tout accuse ${K.nm(W.framed)}` : 'il n’y a plus de preuve'}.`, world: ['Justin s’en tire'] }
                : { actor: H, act: 'renonce', fr: `${Hn} n’a pas de preuve. Justin n’est pas pris. Pas cette fois.`, world: ['Justin s’en tire'] }; }
        else { goPublic(mine.id); W.exposed = J; o = { actor: H, act: 'le dit devant tous', target: J, fr: `${Hn}, devant tous : « C’est Justin. » Personne ne le défend.`, world: ['tout le monde sait'] }; }
        const m = put({ seg, circle: 8, kind: 'answerJ', actor: o.actor, target: o.target || null, desire: o.actor === J ? lineOf(won) : lineOf(HF && HF.d), action: o.act, fact: mine.id, link: 'donc', fr: o.fr, world: o.world,
          aud: [{ k: 'answer', ref: 'caught', fr: o.world[0] }], plot: `${mine.e} sera-t-il pris ? ${W.pub.has(mine.id) ? 'oui' : 'non'}`, next: 'ce que ça coûte', jobs: ['payoff'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' });
        pay(m, `caught:${mine.id}`); if (SUSP) { const L = opened(`acc:${SUSP}`); if (L && L.silent) pay(m, L.id); } settle(m, ['acc', 'wit', 'lied']); return m; };
      // the crime matters to someone present: they commit
      g.matter = (f, seg = 'open') => { const w = f && f.by === J ? H : f && f.seek; if (!f || !live(w)) return null; const R = K.graph().fig;
        if (f.needer && live(f.needer) && R) return put({ seg, circle: 2, kind: 'matter', actor: f.needer, desire: up(R.need(K.nm(f.needer))), action: 'comprend ce que ça lui coûte', fact: f.id,
          fr: `${K.nm(f.needer)} : « ${up(R.lost)}. »`, world: [`${K.nm(f.needer)} risque de tout perdre`], aud: [{ k: 'care', fr: `la réponse compte pour ${K.nm(f.needer)}` }], plot: `${f.e} la question compte`, next: `${K.nm(f.needer)} a besoin de la vérité, vite`, jobs: ['want', 'harder'], tech: 'Mention consequences', goal: 'stakes' });
        const say = f.kind === 'crime' ? (f.vid || e2v(f) ? `« Je trouverai qui a fait ça. »` : '« Je trouverai qui. »') : `« Je retrouverai ${K.nm(f.by)}. »`;
        if (f.kind === 'crime' && f.ev.k !== 'murder' && f.vid && live(f.vid) && f.vid !== w) return put({ seg, circle: 2, kind: 'matter', actor: w, desire: lineOf(D2(w, 'justice')) || `${K.nm(w)} veut la vérité`, action: 'jure de trouver', target: f.vid, fact: f.id,
          fr: `${K.nm(f.vid)}, les yeux rouges : « C’était tout ce qui me restait. » ${K.nm(w)} : ${say}`, world: [`${K.nm(w)} cherche`], aud: [{ k: 'care', fr: `la réponse compte pour ${K.nm(f.vid)}` }], plot: `${f.e} la question compte`, next: `${K.nm(w)} va fouiller, interroger`, jobs: ['want', 'rel'], tech: 'Direct confession', goal: 'desire' });
        return put({ seg, circle: 2, kind: 'matter', actor: w, desire: lineOf(D2(w, f.kind === 'crime' ? 'justice' : 'find')) || `${K.nm(w)} veut savoir`, action: 'jure de trouver', fact: f.id,
          fr: `${K.nm(w)}${w === J ? '' : ', les yeux rouges'} : ${say}`, world: [`${K.nm(w)} cherche`], aud: [{ k: 'care', fr: `la réponse compte pour ${K.nm(w)}` }], plot: `${f.e} la question compte`, next: `${K.nm(w)} va fouiller, interroger`, jobs: ['want'], tech: 'Direct confession', goal: 'desire' }); };
      const e2v = (f) => f.ev && f.ev.v;
      // the other name when it narrows to two: someone Justin cares about (it hurts), never the culprit, the victim, the one cleared
      const narrowTo = (f) => [won && won.t, lost && lost.t, ...D.filter((d) => d.who === J && ['love', 'protect'].includes(d.k)).map((d) => d.t), ...cast()].find((p) => p && p !== f.by && p !== J && live(p) && p !== (f.sus && f.sus.id) && p !== f.vid && p !== W.cleared) || J;   // with nobody else left, it is Justin himself the room looks at
      // the false lead: pushed by the culprit himself (an action, not a coincidence)
      g.theory = (f, seg) => { if (!f || f.kind !== 'crime') return null; const x = f.by, s = f.sus && live(f.sus.id) ? f.sus : null, tr = K.traitsOf(x, a);
        const fr = s ? (tr.ruse >= 1 ? `${K.nm(x)} rappelle à tous ${que(K.low1(f.sus.why))}. Les regards se tournent vers ${K.nm(s.id)}.` : `Tous les regards vont vers ${K.nm(s.id)} : ${K.low1(f.sus.why)}. ${K.nm(x)} ne dit rien.`)
          : `${K.nm(x)} parle d’un étranger vu près du port. Tout le monde veut y croire.`;
        W.theory = s ? s.id : 'étranger';
        return put({ seg, circle: 4, kind: 'theory', actor: x, desire: `${K.nm(x)} veut garder son crime caché`, action: s ? 'désigne' : 'invente un coupable', target: s ? s.id : null, fact: f.id, link: 'mais',
          fr, world: [s ? `${K.nm(s.id)} est soupçonné` : 'on cherche un étranger'], aud: [{ k: 'suspect', ref: f.id, fr: s ? `${K.nm(s.id)} (${K.low1(f.sus.why)})` : 'un étranger' }],
          open: [...(s ? [{ id: `sus:${f.id}:${s.id}`, k: 'sus', who: s.id, fact: f.id, fr: `${K.nm(s.id)} soupçonné` }] : []), { id: `hand:theory:${f.id}`, k: 'hand', who: x, to: s ? s.id : null, fact: f.id, how: 'theory', fr: `qui a lancé la fausse piste` }],
          plot: `${f.e} fausse piste`, next: s ? `${K.nm(s.id)} va se défendre` : 'la piste mènera nulle part', jobs: ['info'], tech: s ? 'Le coupable désigne' : 'Quelqu’un de dehors', goal: 'curiosity' }); };
      // the clue: the one who searches finds a real piece
      g.clue = (f, lv, seg, cause) => { if (!f) return null; const w = live(f.seek) ? f.seek : J, c = { ...ctxT(f), w: K.nm(w) };
        if (f.kind === 'crime') { if (lv === 2) { const o = narrowTo(f), sr = cast().find((p) => p !== f.by && p !== f.vid && p !== o && p !== w) || w; c.w = K.nm(sr); W.seer = sr; }
          const Tt = TRACE[f.ev.k], fr = lv === 1 ? Tt.t1(c) : W.seer === J ? Tt.seen(c).replace(/^Justin a (vu|trouvé)/, 'Justin aperçoit') : Tt.seen(c);
          const ac = lv === 2 ? W.seer : w;
          return put({ seg, circle: 4, kind: lv === 2 ? 'clue2' : 'clue', actor: ac, desire: lineOf(D2(ac, 'justice')) || (ac === W.seer && lv === 2 && ac !== J ? `${K.nm(ac)} veut aider Justin` : `${K.nm(ac)} veut la vérité`), action: lv === 1 ? 'remarque' : 'a vu', fact: f.id, cause,
            fr, world: [`${K.nm(w)} en sait plus`], aud: [{ k: 'learn', fr: lv === 1 ? Tt.t1a : `il existe une preuve : ${itemOf(f)}` }],
            plot: `${f.e} un indice`, next: lv === 1 ? 'le coupable est quelqu’un de proche' : `${K.nm(f.by)} doit faire disparaître ${itemOf(f)}`, jobs: ['info'], tech: lv === 1 ? 'Le mobile évident' : 'Un objet pas à sa place', goal: 'curiosity' }); }
        if (f.kind === 'gone') { const i = f.info, fr = i ? SEED.leaving[lv - 1](K.nm(f.by)) : lv === 1 ? `Ses affaires sont encore là : ${K.nm(f.by)} comptait revenir.` : `Quelqu’un a vu ${K.nm(f.by)} prendre la route du port.`;
          return put({ seg, circle: 4, kind: 'clue', actor: w, desire: lineOf(D2(w, 'find', f.by)) || `${K.nm(w)} cherche ${K.nm(f.by)}`, action: 'trouve', fact: f.id, cause, fr: `${K.nm(w)} trouve : ${K.low1(fr)}`, world: [`${K.nm(w)} a une piste`],
            aud: [{ k: 'learn', fr: K.low1(fr) }], plot: '👻 un indice', next: 'une direction', jobs: ['info'], tech: 'Ses affaires sont encore là', goal: 'curiosity' }); }
        return null; };
      // the culprit covers (by who they are): destroys the proof (and the cover narrows it to two), scares a witness, runs, turns the room
      g.cover = (f, seg, cause) => { if (!f || f.kind !== 'crime' || !live(f.by)) return null; const x = f.by, tr = K.traitsOf(x, a), Tt = TRACE[f.ev.k];
        const o = narrowTo(f); W.narrow = [x, o];
        const wit = f.saw.find(live);
        if (wit && tr.violence >= 2) return put({ seg, circle: 4, kind: 'cover', actor: x, desire: `${K.nm(x)} veut garder son crime caché`, action: 'fait taire le témoin', target: wit, fact: f.id, link: 'mais', cause,
          fr: `${K.nm(wit)} a vu quelque chose cette nuit-là. Depuis ce matin, ${K.nm(wit)} ne parle plus, et ne regarde personne.`, world: [`${K.nm(wit)} se tait, par peur`], aud: [{ k: 'q', ref: `wit${f.id}`, fr: `Qu’a vu ${K.nm(wit)}, et qui lui fait peur ?` }],
          open: [{ id: `wit:${f.id}`, k: 'wit', who: wit, fact: f.id, fr: `ce qu’a vu ${K.nm(wit)}` }, { id: `hand:cover:${f.id}`, k: 'hand', who: x, to: wit, fact: f.id, how: 'scare', fr: `qui fait peur ${aN(K.nm(wit))}` }],
          plot: `${f.e} la preuve se dérobe`, next: `si ${K.nm(wit)} parle, tout tombe`, jobs: ['harder'], tech: 'Le témoin se tait', goal: 'stakes' });
        return put({ seg, circle: 4, kind: 'cover', actor: x, desire: `${K.nm(x)} veut garder son crime caché`, action: `fait disparaître ${itemOf(f)}`, fact: f.id, link: 'mais', cause,
          fr: Tt.gone({ ...ctxT(f), o: K.nm(o) }), world: [`${itemOf(f)} n’existe plus`, `il ne reste que deux noms : ${K.nm(x)} et ${K.nm(o)}`],
          aud: [{ k: 'suspect', ref: f.id, fr: `${K.nm(x)} ou ${K.nm(o)}` }], open: [{ id: `hand:cover:${f.id}`, k: 'hand', who: x, fact: f.id, how: 'cover', fr: `qui a fait disparaître ${itemOf(f)}` }, { id: `sus2:${f.id}`, k: 'sus2', who: o, fact: f.id, fr: `${K.nm(x)} ou ${K.nm(o)}` }],
          plot: `${f.e} la preuve disparaît, ça se resserre`, next: `un autre indice devient le seul espoir`, jobs: ['harder', 'info'], tech: 'La preuve disparaît', goal: 'stakes' }); };
      // a TELL: who the culprit is shows; the one who notices is whoever knows them (Justin, or someone close to them). If that
      // one loves the culprit, they keep it (and the answer will say so); else they tell Justin
      g.tell = (f, seg) => { const x = f.by, tr = K.traitsOf(x, a), T0 = TELL.find(([ok]) => ok(tr, K.S.flaw[x]))[1]({ x: K.nm(x), v: f.v });
        const n = [J, ...cast()].find((p) => p !== x && p !== f.vid && live(p) && (D2(p, 'love', x) || D2(p, 'protect', x))) || J, cares = n !== J && (D2(n, 'love', x) || D2(n, 'protect', x));
        const after = n === J ? 'Justin le remarque.' : cares ? `${K.nm(n)} le remarque. ${K.nm(n)} ne dit rien.` : `${K.nm(n)} le remarque, et le dit à Justin.`;
        return put({ seg, circle: 4, kind: 'tell', actor: x, desire: `${K.nm(x)} veut garder son crime caché`, action: 'se trahit par qui il est', fact: f.id, link: 'mais', who: [n],
          fr: `${T0} ${after}`, world: [cares ? `${K.nm(n)} doute ${deN(K.nm(x))}, et se tait` : 'Justin doute'], aud: [{ k: 'suspect', ref: f.id, fr: `${K.nm(x)} (un signe)` }],
          plot: `${f.e} un signe`, next: cares ? `${K.nm(n)} savait, et s’est tu` : 'Justin regarde autrement', jobs: ['info'], tech: 'Une trace sur lui', goal: 'curiosity',
          open: cares ? [{ id: `hand:knew:${f.id}`, k: 'hand', who: n, to: x, fact: f.id, how: 'knew', fr: `${K.nm(n)} avait vu, et s’est tu` }] : [] }); };
      // a MISREAD: a mind in fear or anger reads a true trace wrong, believes an innocent did it, and acts on it (an accusation,
      // a blow, a warning): a wrong belief that costs someone, until the truth corrects it
      g.misread = (f, seg) => { const rx = W.M.filter((m) => m.act === a && m.kind === 'react' && /attrape/.test(m.fr)).pop(), r = rx ? rx.actor : f.sus && live(f.sus.id) ? f.sus.id : null; if (!r || r === f.by) return null;
        const m0 = [J, ...cast()].find((p) => p !== r && p !== f.by && p !== f.vid && live(p) && (K.traitsOf(p, a).peur >= 2 || K.traitsOf(p, a).rancune >= 2 || K.traitsOf(p, a).loyaute >= 3)) || null; if (!m0) return null;
        const tr = K.traitsOf(m0, a), how = tr.violence >= 2 ? 'hit' : m0 !== J && tr.loyaute >= 2 ? 'warn' : 'say', c = { m: K.nm(m0), r: K.nm(r) }, W2 = W.M.slice(-1)[0];
        return put({ seg, circle: 4, kind: 'misread', actor: m0, desire: m0 === J ? lineOf(D2(J, 'justice')) || 'Justin veut la vérité' : `${K.nm(m0)} ${tr.peur >= 2 ? 'a peur' : 'veut faire payer'}`, action: 'se trompe, et agit', target: r, fact: f.id, link: 'donc',
          fr: `${(rx ? MISREAD.seen : MISREAD.out)(c)} ${MISREAD.act[how](c)}`, world: [`${K.nm(m0)} croit que c’est ${K.nm(r)} : c’est faux`], aud: [{ k: 'suspect', ref: f.id, fr: `${K.nm(r)} (${K.nm(m0)} en est sûr)` }],
          plot: `${f.e} une croyance fausse`, next: `${K.nm(r)} paie pour une erreur`, jobs: ['harder', 'reverse'], tech: 'Ça se retourne', goal: 'stakes',
          open: [{ id: `acc:${r}`, k: 'acc', who: r, fact: f.id, fr: `${K.nm(r)} accusé à tort par ${K.nm(m0)}` }, ...(how === 'hit' ? [{ id: `owe:${r}:${m0}`, k: 'owe', who: r, to: m0, hot: true, fact: f.id, fr: `${K.nm(r)} frappé à tort` }] : [])] }); };
      // a THIRD PARTY: someone who knows and wants something for it; Justin pays (he learns, alone, and owes) or refuses (they
      // use it themselves, at the worst moment)
      const thirdOf = (f) => cast().find((p) => p !== f.by && p !== f.vid && live(p) && (D2(p, 'oust', f.by) || [XA, XB].some((d) => d && d.t && D2(p, 'love', d.t) && d.t !== p)));
      g.offer = (f, seg) => { const t3 = thirdOf(f); if (!t3) return null; const l = [XA, XB].find((d) => d && d.k === 'love' && d.t && D2(t3, 'love', d.t)), kind = l ? 'love' : D2(t3, 'oust', f.by) ? 'oust' : 'def';
        const pays = K.traitsOf(J, a).audace >= K.traitsOf(J, a).loyaute || [XA, XB].some((d) => d && d.k === 'justice'); W.third = { who: t3, pays, kind, l: l && l.t };
        const m = put({ seg, circle: 5, kind: 'offer', actor: t3, desire: want(t3), action: 'vend ce qu’il sait', target: J, fact: f.id, link: 'mais', fr: THIRD[kind]({ t3: K.nm(t3), l: l ? K.nm(l.t) : '' }),
          world: [`${K.nm(t3)} sait qui`], aud: [{ k: 'hope', fr: 'quelqu’un sait' }], plot: `${f.e} quelqu’un sait, et le vend`, next: pays ? 'Justin va payer' : 'Justin refuse', jobs: ['force', 'info'], tech: 'Il force la main', goal: 'stakes' });
        if (pays) { learn(J, f.id); W.thirdPaid = true; return put({ seg, circle: 5, kind: 'notice', actor: t3, desire: want(t3), action: 'le dit à Justin, seul', target: J, fact: f.id, link: 'donc',
          fr: `Justin accepte. ${K.nm(t3)}, tout bas : « C’est ${K.nm(f.by)}. »`, world: ['Justin sait. Seul.', `Justin doit quelque chose ${aN(K.nm(t3))}`], aud: [{ k: 'answer', ref: f.id, fr: f.truth }],
          plot: `${f.e} la réponse, achetée`, next: `${K.nm(t3)} viendra réclamer`, jobs: ['payoff', 'conseq'], tech: 'Pas sans aide', goal: 'info',
          open: [{ id: `kept:${f.id}`, k: 'kept', fact: f.id, fr: 'ce que Justin fera de ce qu’il sait' }, { id: `fav:${t3}`, k: 'fav', who: t3, fr: `ce que Justin doit ${aN(K.nm(t3))}` }] }); }
        open(m, { id: `use:${t3}`, k: 'use', who: t3, fact: f.id, fr: `ce que ${K.nm(t3)} fera de ce qu’il sait` }); return m; };
      // the audience learns first (the mystery becomes suspense): the culprit alone, the hand we now see
      g.glimpse = (f, seg) => { const c = { ...ctxT(f), e: '' }; return put({ seg, circle: 5, kind: 'glimpse', actor: f.by, desire: `${K.nm(f.by)} veut garder son crime caché`, action: 'seul, se trahit pour nous', fact: f.id, link: 'pendant',
        fr: (GLIMPSE[f.ev.k] || GLIMPSE.murder)(c), world: [], aud: [{ k: 'answer', ref: f.id, fr: f.truth }, { k: 'irony', fr: `le public sait ; Justin, pas encore` }], plot: `${f.e} le public sait avant Justin`, next: 'quand Justin va-t-il comprendre ?', jobs: ['info', 'reverse'], tech: 'Ironie dramatique', goal: 'info',
        open: [{ id: `iro:${f.id}`, k: 'iro', fact: f.id, fr: `quand Justin saura que c’est ${K.nm(f.by)}` }] }); };
      // the culprit's alibi, when someone asks (a lie the answer will re-read)
      g.lie = (f, seg, cause) => { if (!f || !f.fact || !live(f.who)) return null; const ff = f.fact, Tt = TRACE[ff.ev.k] || TRACE.murder;
        return put({ seg, circle: 4, kind: 'lie', actor: f.who, desire: `${K.nm(f.who)} veut garder son crime caché`, action: 'ment', fact: ff.id, link: 'mais', cause, fr: Tt.lie(ctxT(ff)), world: [`${K.nm(f.who)} a un alibi`],
          aud: [{ k: 'learn', fr: `${K.nm(f.who)} a un alibi` }], open: [{ id: `hand:lie:${ff.id}`, k: 'hand', who: f.who, fact: ff.id, how: 'lie', fr: 'l’alibi' }], plot: `${ff.e} un alibi`, next: 'si l’alibi tombe, tout tombe', jobs: ['info'], tech: 'La réponse trop parfaite', goal: 'curiosity' }); };
      // the false lead breaks: a fact clears him
      g.clear = (f, seg) => { if (!f || !f.sus || !live(f.sus.id)) return null; const s = f.sus.id, G2 = K.graph(), who = G2.fig ? G2.fig.n : pick(`al${s}`, ['le veilleur du port', 'le batelier', 'la garde de nuit']);
        W.cleared = s;
        return put({ seg, circle: 6, kind: 'clear', actor: s, desire: `${K.nm(s)} veut laver son nom`, action: 'prouve où il était', fact: f.id, link: 'mais',
          fr: `${K.nm(s)} était au port toute la nuit : ${who} l’a vu. Ce n’est pas ${K.nm(s)}.`, world: [`${K.nm(s)} est lavé`], aud: [{ k: 'clear', ref: f.id, fr: K.nm(s) }],
          plot: `${f.e} la fausse piste tombe`, next: 'le coupable est ailleurs, plus près', jobs: ['reverse'], tech: 'Ça se retourne', goal: 'stakes' }); };
      // the answer: the culprit gives himself away (what he says, what he does), and the earlier moments change meaning
      g.reveal = (f, seg, alone) => { if (!f) return null; const x = f.by;
        if (f.kind === 'crime') { const c = ctxT(f), Tt = TRACE[f.ev.k], wit = f.saw.find(live), re = W.M.filter((m) => m.act === a && m.fact === f.id && ['theory', 'cover', 'lie'].includes(m.kind)).map((m) => m.id);
          const how = W.named === x ? `${K.nm(x)} ne nie pas.` : wit ? `${K.nm(wit)} parle enfin : ${K.nm(wit)} a vu ${K.nm(x)}, cette nuit-là.` : Tt.slip(c);
          const m1 = put({ seg, circle: 7, kind: 'reveal', actor: wit || x, desire: wit ? `${K.nm(wit)} ne veut plus se taire` : `${K.nm(x)} veut s’en tirer`, action: wit ? 'parle' : 'se trahit', fact: f.id, link: 'soudain', target: alone ? J : null,
            fr: alone ? `${wit ? `${K.nm(wit)} prend Justin à part : ${K.nm(wit)} a vu ${K.nm(x)}, cette nuit-là.` : `Justin est seul à le remarquer : ${K.low1(how)}`} C’était ${K.nm(x)}.${f.mot && !f.whyLater ? ` ${up(f.mot.fr)}.` : ''}` : `${how} C’était ${K.nm(x)}.${f.mot && !f.whyLater ? ` ${up(f.mot.fr)}.` : ''}`, world: [alone ? 'Justin sait. Seul.' : `tout le monde sait : ${f.truth}`], aud: [{ k: 'answer', ref: f.id, fr: f.truth }, { k: 'reframe', ids: re, fr: re.length ? `relire ${re.map((i) => '#' + i).join(', ')}` : '' }],
            plot: `${f.e} la réponse`, next: `${K.nm(x)}, acculé, n’a plus rien à perdre`, jobs: ['payoff', 'reverse'], tech: wit ? 'Pas sans aide' : 'Un détail qu’il ne devrait pas savoir', goal: 'info' });
          if (!alone) { for (const p of K.people().filter(live)) learn(p, f.id); W.exposed = x; } return m1; }
        if (f.kind === 'gone') { W.out.delete(f.by); return put({ seg, circle: 7, kind: 'reveal', actor: f.by, desire: want(f.by), action: 'est retrouvé', fact: f.id, link: 'soudain',
          fr: `On retrouve ${K.nm(f.by)}${f.mot ? ` : ${K.low1(f.mot.fr).replace(/\.?$/, '.')}` : '.'}`, world: [`${K.nm(f.by)} est retrouvé`], aud: [{ k: 'answer', ref: f.id, fr: f.truth }], plot: '👻 la réponse', next: 'il faut décider quoi faire de ce qu’on sait', jobs: ['payoff'], tech: 'Retrouvé, et ce n’est pas ce qu’il croyait', goal: 'info' }); }
        if (f.kind === 'secret' && f.info) { const i = f.info, pr = SEED[i.id] ? SEED[i.id][2](K.nm(i.x), K.nm(i.y)) : `${K.infoFr(i)}.`;
          const re = W.M.filter((m) => m.fact === f.id && m.kind === 'seed').map((m) => m.id);
          return put({ seg, circle: 7, kind: 'reveal', actor: i.y && live(i.y) && i.y !== i.x ? i.y : live(i.x) ? i.x : J, desire: `${K.nm(i.x)} voulait garder ce secret`, action: 'ça sort', fact: f.id, link: 'soudain',
            fr: `${pr}${SEED[i.id] ? ` ${up(K.infoFr(i))}.` : ''}`, world: [`tout le monde sait : ${K.infoFr(i)}`], aud: [{ k: 'answer', ref: f.id, fr: K.infoFr(i) }, { k: 'reframe', ids: re, fr: re.length ? `relire ${re.map((n) => '#' + n).join(', ')}` : '' }],
            plot: `${f.e} le secret sort`, next: i.y && live(i.y) ? `${K.nm(i.y)} ne regardera plus ${K.nm(i.x)} pareil` : 'tout change de sens', jobs: ['payoff', 'reverse'], tech: 'Demande qui révèle', goal: 'info' }); }
        if (f.kind === 'object' && f.info) { const i = f.info, h = f.obj || {};
          const names = h.crime && h.crime.h && live(h.crime.x) && !W.exposed; if (names) W.named = h.crime.x;
          const t = h.crime ? (names ? (h.side === 'v' ? `${up(victimOf(h.crime, K.graph()))} y avait écrit : « S’il m’arrive quelque chose, méfiez-vous ${deN(K.nm(h.crime.x))}. »` : `Dedans : ce qu’on a pris. Et un nom : ${K.nm(h.crime.x)}.`) : `${up(K.infoFr(i))} : ${h.side === 'v' ? `${victimOf(h.crime, K.graph())} y disait de qui se méfier` : 'ce qu’on cherchait est dedans'}.`) : h.secret ? `La preuve : ${K.low1(K.infoFr(h.secret))}.` : h.gone ? `Elle montre où est ${K.nm(h.gone.x)}.` : 'Dedans, rien de ce qu’on croyait.';
          const op2 = [i.y, i.x].find((p) => p && live(p)) || (crimeF && live(crimeF.seek) ? crimeF.seek : J);
          return put({ seg, circle: 7, kind: 'reveal', actor: op2, desire: W.narrow && W.narrow[1] === op2 ? `${K.nm(op2)} veut laver son nom` : want(op2), action: 'l’ouvre', fact: f.id, fr: `${K.nm(op2)} ${({ key: 'trouve enfin la porte qu’ouvre', map: 'déplie enfin', photo: 'retourne enfin', ring: 'regarde enfin l’intérieur de' })[i.id] || 'ouvre enfin'} ${K.low1(K.infoFr(i))}. ${t}`, world: ['ce qu’il contenait est su'], aud: [{ k: 'answer', ref: f.id, fr: t }], plot: `${f.e} ouvert`, next: 'ce qu’il contient change le choix', jobs: ['payoff', 'info'], tech: 'Demande qui révèle', goal: 'info' }); }
        if (f.kind === 'link') { const re = W.M.filter((m) => m.fact === f.id).map((m) => m.id);
          const ac = f.ch.ppl.find(live) || J;
          return put({ seg, circle: 7, kind: 'reveal', actor: ac, desire: want(ac), action: 'ça sort', fact: f.id, link: 'soudain', who: f.ch.ppl, fr: `Ça sort : ${K.low1(f.truth)}.`, world: [`tout le monde sait : ${f.truth}`],
            aud: [{ k: 'answer', ref: f.id, fr: f.truth }, { k: 'reframe', ids: re, fr: re.length ? `relire ${re.map((n) => '#' + n).join(', ')}` : '' }], plot: '🕸️ le lien sort', next: 'chacun réagit depuis ce qui le relie', jobs: ['payoff', 'reverse'], tech: 'Demande qui révèle', goal: 'info' }); }
        return null; };
      // a seed (twist): a detail, unexplained; irony: the audience is told, the others are not
      g.seed = (f, lv, seg, host) => { const dAt = f && f.by && W.deadAt.get(f.by); if (!f || (dAt != null && (!host || host.id >= dAt))) return null;   // the dead plant nothing after their death
        if (f.kind === 'secret' && f.info) { const i = f.info, s1 = SEED[i.id] ? SEED[i.id][Math.min(1, lv - 1)](K.nm(i.x), K.nm(i.y)) : `${K.nm(i.x)} cache quelque chose.`;
          if (f.mode === 'irony' && host) { host.also.push({ fr: s1, why: `le public sait : ${K.infoFr(i)}`, fact: f.id }); host.also.push({ fr: `Le public le sait : ${K.low1(K.infoFr(i))}. Personne d’autre.`, why: 'ironie' }); host.aud.push({ k: 'irony', fr: K.infoFr(i) }); open(host, { id: `iro:${f.id}`, k: 'iro', fact: f.id, fr: K.infoFr(i) }); return host; }
          if (f.mode === 'irony') return put({ seg, circle: 2, kind: 'seed', actor: i.x, desire: `${K.nm(i.x)} veut garder son secret`, action: 'cache', fact: f.id, fr: `${s1} (Le public le sait : ${K.infoFr(i)}. Personne d’autre.)`, slide: `Ce que personne ne sait : ${K.low1(K.infoFr(i))}.`,
            world: [], aud: [{ k: 'irony', fr: K.infoFr(i) }], plot: `${f.e} un secret que le public partage`, next: 'on craindra le moment où ça sortira', jobs: ['info'], tech: 'Aveu vulnérable', goal: 'info' });
          const m = { seg, circle: 4, kind: 'seed', actor: i.x, desire: `${K.nm(i.x)} veut garder son secret`, action: 'laisse échapper', fact: f.id, fr: s1, aud: [{ k: 'learn', fr: `un détail : ${K.low1(s1)}` }], plot: `${f.e} semé`, next: 'ça reviendra', jobs: ['info'], tech: 'Seed & payoff (surprise)', goal: 'callback' };
          if (host) { host.also.push({ fr: s1, why: `semé : ${K.infoFr(i)}`, fact: f.id }); host.aud.push(m.aud[0]); open(host, { id: `seed:${f.id}`, k: 'seed', fact: f.id, fr: s1 }); return host; } return put({ ...m, open: [{ id: `seed:${f.id}`, k: 'seed', fact: f.id, fr: s1 }] }); }
        if (f.kind === 'link') { const m = { seg, circle: 4, kind: 'seed', actor: f.ch.ppl[0], desire: want(f.ch.ppl[0]), action: 'un détail', fact: f.id, fr: f.seed1, aud: [{ k: 'learn', fr: `un détail : ${K.low1(f.seed1)}` }], plot: '🕸️ semé', next: 'ça reviendra', jobs: ['info'], tech: 'Seed & payoff (surprise)', goal: 'callback' };
          if (host) { host.also.push({ fr: f.seed1, why: `semé : ${f.truth}`, fact: f.id }); host.aud.push(m.aud[0]); return host; } return put(m); }
        if (f.kind === 'object' && f.info) { const t = `${up(K.infoFr(f.info))} : ${({ letter: 'on la voit, personne ne l’ouvre', ring: 'jamais enlevée, jamais expliquée', key: 'personne ne sait ce qu’elle ouvre', photo: 'cachée dès qu’on approche', map: 'personne ne sait où elle mène' })[f.info.id] || 'on le voit, personne n’y touche'}.`, m = { seg, circle: 1, kind: 'seed', actor: f.info.x, desire: want(f.info.x), action: 'garde', fact: f.id, fr: t, aud: [{ k: 'q', ref: f.id, fr: f.q }], plot: `${f.e} vu, pas ouvert`, next: 'on l’ouvrira', jobs: ['info'], tech: 'Objet planté', goal: 'callback' };
          if (host) { host.also.push({ fr: t, why: f.q, fact: f.id }); host.aud.push(m.aud[0]); open(host, { id: `obj:${f.id}`, k: 'obj', fact: f.id, fr: f.q }); return host; } return put({ ...m, open: [{ id: `obj:${f.id}`, k: 'obj', fact: f.id, fr: f.q }] }); }
        return null; };
      // Justin tries (on a line), and his flaw makes him fail; a force answers what he did
      g.attempt = (d, r, seg, cause) => { if (!d) return null; const NO = { protect: (c) => `Justin ne quitte plus ${c.t} d’une semelle.`, respect: () => 'Justin relève la tête, devant toute la salle.' }; const known = d.k === 'justice' && d.t && !facts.some((f) => f.kind === 'crime' && f.hidden && f.by === d.t && W.exposed !== f.by);
        const mine2 = d.k === 'hide' && K.infos().find((i) => i.x === J && HIDE[i.id]);
        const L = known ? [(c) => `Justin cherche ${c.t} dans toute la ville.`, (c) => `Justin rassemble ceux qui ont vu ce que ${c.t} a fait.`, (c) => `Justin attend ${c.t}, seul, à la porte.`] : mine2 ? HIDE[mine2.id].map((h) => () => h(K.nm(mine2.y), K.graph().fig ? K.graph().fig.n : 'celui qui le cherche')) : d.k === 'protect' && d.t && forces.some((x) => x.kind === 'leaver' && x.who === d.t) ? KEEP : mine && d.k === 'alive' && d.who === J ? ATTEMPT.aliveJ : ATTEMPT[d.k] || ATTEMPT.alive, f = myst, opp = forces.find((x) => x.vs && x.vs.id === d.id && x.who !== J && live(x.who)) || mf();
        const c = { t: d.t ? K.nm(d.t) : '', o: opp && opp.who !== 'clock' && opp.who !== 'f:A' && !(opp.kind === 'culprit' && W.exposed !== opp.who) ? K.nm(opp.who) : 'tout le monde', c: K.nm(conf()), spot: f ? f.spot : 'la cave', w: W.seer ? K.nm(W.seer) : f && live(f.seek) ? K.nm(f.seek) : K.nm(conf()) };
        const say0 = L[Math.min(L.length - 1, r - 1)](c), say = c.t && say0.includes(`${c.t} et ${c.t}`) ? KEEP[Math.min(2, r - 1)](c) : say0, fr0 = c.o === 'tout le monde' && /tout le monde/.test(say) && NO[d.k] ? NO[d.k](c) : say;
        return put({ seg, circle: 4, kind: 'attempt', actor: J, desire: lineOf(d), action: 'tente', target: d.t || null, line: d.id, fr: fr0, cause, world: [], aud: [{ k: 'hope', fr: `Justin avance vers ${K.lab(d)}` }],
          plot: `${lineOf(d)} : il tente`, next: 'on va lui résister', jobs: ['want'], tech: 'Show character positioning', goal: 'stakes' }); };
      g.fail = (d, worst, seg) => { let opp = forces.find((x) => d && x.vs && x.vs.id === d.id && x.who !== J && live(x.who)) || (mine && HF && live(H) ? HF : null) || mf();
        const culp = new Set([...facts.filter((f) => f.kind === 'crime').map((f) => f.by), ...D.filter((x) => x.who === J && ['justice', 'oust'].includes(x.k)).map((x) => x.t)]), b = (W.narrow && W.narrow[1] !== J && live(W.narrow[1]) ? W.narrow[1] : null) || [lost && lost.t, won && won.t, conf()].find((p) => p && live(p) && !culp.has(p)) || conf();
        if (worst && W.narrow && b === W.narrow[1] && !W.exposed) return put({ seg, circle: 6, kind: 'fail', actor: J, desire: lineOf(d), action: 'retombe dans sa faille', line: d && d.id, link: 'mais',
          fr: `${(FL.worst({ o: '', c: K.nm(conf()), b: K.nm(b) }).split('.')[0])}. Toute la salle accuse ${K.nm(b)}.`, world: [`on accuse ${K.nm(b)}, à tort`], aud: [{ k: 'suspect', ref: crimeF.id, fr: K.nm(b) }, { k: 'fear', fr: `${K.nm(b)} paie pour l’hésitation de Justin` }], open: [{ id: `acc:${b}`, k: 'acc', who: b, fact: crimeF.id, fr: `${K.nm(b)} accusé à tort` }],
          plot: '🪞 sa faille agit contre lui', next: `il devra sauver ${K.nm(b)}`, jobs: ['fail', 'harder'], tech: 'Ça se retourne', goal: 'stakes' });
        const other = [XA, XB].find((x) => x && d && x.id !== d.id);
        if (worst && other && d && (other.t || d.t) && live(other.t || d.t)) { const act0 = K.low1(K.DK[d.k].act(K.tName(d))).replace(/^([A-ZÀ-Ü])/, (m) => m.toLowerCase());
          const pers = other.t && live(other.t) && ['love', 'protect', 'find'].includes(other.k);
          if (held()) { const fr = pers ? `Justin s’apprête à ${act0}. ${K.nm(other.t)} l’appelle. Il reste.` : `Justin s’apprête à ${act0}. Il pense à ${K.lab(other)}, et s’arrête.`;
            return put({ seg, circle: 6, kind: 'fail', actor: J, desire: lineOf(d), action: 'retenu par l’autre côté', line: d.id, link: 'mais', fr, world: [`${up(K.lab(d))} s’éloigne`], aud: [{ k: 'fear', fr: 'il ne pourra pas tout garder' }],
              plot: '⇄ ce qu’il aime le retient', next: 'il devra choisir', jobs: ['fail', 'harder'], tech: 'Ça se retourne', goal: 'stakes' }); }
          const fr = pers ? `Justin va ${act0}, sans se retourner. Pendant ce temps, ${K.nm(other.t)} reste seul${ge(other.t)} face à tout.` : `Justin va ${act0}, sans se retourner. ${up(K.lab(other))} lui échappe un peu plus.`;
          return put({ seg, circle: 6, kind: 'fail', actor: J, desire: lineOf(d), action: 'y va quand même', line: d.id, link: 'mais', target: pers ? other.t : null, fr, world: [pers ? `${K.nm(other.t)} a été lâché` : `${up(K.lab(other))} s’éloigne`], aud: [{ k: 'fear', fr: 'ce que ça va coûter de l’autre côté' }],
            plot: '⇄ il choisit déjà, et l’autre côté paie', next: pers ? `${K.nm(other.t)} s’en souviendra` : 'il devra choisir', jobs: ['conseq', 'harder'], tech: 'Ça se retourne', goal: 'stakes',
            open: pers ? [{ id: `owe:${other.t}:${J}`, k: 'owe', who: other.t, to: J, fr: `${K.nm(other.t)} lâché par Justin` }] : [] }); }
        if (opp && opp.kind === 'culprit' && W.exposed !== opp.who) opp = opp.fact && opp.fact.sus && live(opp.fact.sus.id) ? { who: opp.fact.sus.id } : null;   // the hidden culprit is never named before the answer
        const hi = K.infos().find((x) => x.x === J && ['secret', 'mask'].includes(K.IN[x.id].k)), subj = mine ? (mine.ev.k === 'theft' ? 'l’argent qu’il a' : 'sa soirée') : hi && ASKH[hi.id] ? ASKH[hi.id](hi.y ? K.nm(hi.y) : '')[1] : d && d.t && live(d.t) ? `ce qu’il ressent pour ${K.nm(d.t)}` : '';
        const c = { o: opp && live(opp.who) ? K.nm(opp.who) : 'la salle', c: K.nm(conf()), b: K.nm(b), s: subj };
        return put({ seg, circle: worst ? 6 : 4, kind: 'fail', actor: J, desire: lineOf(d), action: worst ? 'retombe dans sa faille' : 'échoue', line: d && d.id, link: 'mais', fr: (worst ? FL.worst : FL.fail)(c),
          world: [worst ? `${K.nm(b)} paie pour Justin` : 'Justin a perdu une chance'], aud: [{ k: 'fear', fr: `il pourrait ne pas y arriver (${flawF && K.S.flaw[J] ? K.F[K.S.flaw[J]].n.toLowerCase() : 'il hésite'})` }],
          plot: '🪞 sa faille agit contre lui', next: 'au climax, il devra la vaincre', jobs: ['fail'], tech: 'Petit mensonge démasqué', goal: 'stakes' }); };
      // what someone confides when a love or a care weighs more (24/11): something TRUE about them, from the story's facts
      // (what they owe and to whom, who threatens them, what they dream of, whom they protect), never « une chose jamais dite »
      const confide = (d, lv) => { const t = d.t; if (!t || !live(t) || !['love', 'protect'].includes(d.k)) return null; const T0 = K.nm(t), G2 = K.graph();
        const thr = K.evs().find((e) => e.k === 'threat' && e.v === t && live(e.x) && W.hap.has(e)), dr = D2(t, 'free'), pr = D.find((x) => x.who === t && x.k === 'protect' && x.t && x.t !== J && live(x.t));
        const L2 = [G2.fig && G2.need === t ? `${T0} confie à Justin ce que ça coûte : ${K.low1(G2.fig.need(T0))}.` : null, thr ? `${T0} avoue à Justin avoir peur ${deN(K.nm(thr.x))}. Vraiment peur.` : null,
          dr ? `${T0} avoue à Justin rêver de partir d’ici, loin de tout.` : null, pr ? `${T0} confie à Justin ${que(K.nm(pr.t))} est tout ce qui compte.` : null].filter(Boolean);
        return L2[lv - 1] || null; };
      // a desire weighs more: someone acts (the one it is about)
      g.raise = (d, seg, cause) => { if (!d) return null; const own = mine && d.who === J && ['alive', 'hide'].includes(d.k), lv = lvlUp(d), L = own ? RAISEJ : RAISE[d.k] || RAISE.respect, f = facts.find((x) => x.kind === 'crime'), G2 = K.graph();
        const needs = f && f.sus && live(f.sus.id) && !W.cleared ? f.sus.id : f && live(f.seek) && f.seek !== J ? f.seek : conf();
        const c = { doom: mine ? DOOM[mine.ev.k] : '', h: Hn || 'Quelqu’un', t: d.t ? (W.exposed === d.t ? K.nm(d.t) : K.tName(d)) : '', w2: K.nm(needs), f: G2.fig && !(G2.cr && G2.cr.k === 'murder') ? G2.fig.n : myst && myst.kind === 'crime' && myst.ev.k === 'murder' ? 'celui qui a tué' : 'celui qui le cherche' };
        const actor = d.k === 'justice' ? (lv === 1 ? needs : J) : d.t && live(d.t) ? d.t : J, fond = actor !== J && (D2(actor, 'love', J) || D2(actor, 'protect', J));
        const known = d.k === 'justice' && d.t && !facts.some((f) => f.kind === 'crime' && f.hidden && f.by === d.t);
        const hideFr = () => { const i = K.infos().find((x) => x.x === J && ['secret', 'mask'].includes(K.IN[x.id].k)), y = i && i.y ? K.nm(i.y) : '', ak = i && ASKH[i.id] ? ASKH[i.id](y) : null;
          const w = [conf(), ...cast()].find((p) => p && p !== J && p !== (i && i.y) && live(p)) || conf(), Wn = K.nm(w);
          return [ak ? `${Wn} demande à Justin ${ak[0]}. Justin change de sujet.` : `${Wn} remarque que Justin ne raconte jamais deux fois la même histoire.`, ak ? `Justin ment ${aN(Wn)} sur ${ak[1]}, devant tous. ${Wn} le croit. Cette fois.` : `Justin ment ${aN(Wn)}, devant tous. ${Wn} le croit. Cette fois.`,
            `${Wn} : « Tu mens. Je ne sais pas encore sur quoi. »`][Math.min(2, lv - 1)]; };
        const SR = [(t) => `${t} cherche le regard de Justin. Personne ne prend sa défense.`, (t) => `${t}, à Justin, tout bas : « Dis-leur que j’étais avec toi. »`, (t) => `${t} : « Tu sais que ce n’est pas moi. Tu le sais. »`];
        const fr = own ? L[Math.min(L.length - 1, lv - 1)](c) : SUSP && d.t === SUSP && opened(`acc:${SUSP}`) ? SR[Math.min(2, lv - 1)](K.nm(SUSP)) : d.k === 'hide' && d.who === J ? hideFr() : d.k === 'justice' && W.exposed ? `Toute la salle attend que Justin parle.` : d.k === 'justice' && lv === 1 ? (known ? `${c.w2} supplie Justin de ne pas laisser ${K.nm(d.t)} s’en tirer.` : `${c.w2} supplie Justin de trouver le vrai coupable.`) : (lv <= 2 && confide(d, lv)) || L[Math.min(L.length - 1, lv - 1)](c);
        return put({ seg, circle: lv >= 3 ? 7 : 5, kind: 'raise', actor, desire: actor === J ? lineOf(d) : fond ? lineOf(fond) : d.k === 'justice' && actor === needs && f && f.sus && actor === f.sus.id ? `${K.nm(actor)} veut laver son nom` : want(actor), action: 'pèse plus', target: actor === J ? null : J, line: d.id, cause,
          fr, world: [`${up(K.lab(d))} compte plus (${lv}/3)`], aud: [{ k: 'care', fr: `${K.lab(d)} pèse plus lourd` }],
          plot: `${lineOf(d)} : pèse plus (${lv})`, next: `perdre ${K.lab(d)} coûterait plus`, jobs: ['harder'], tech: lv >= 3 ? 'Aveu vulnérable' : 'Mention consequences', goal: 'stakes' }); };
      // a force acts (its next move): the answer to what Justin just did
      g.move = (f, seg, cause, final, via) => { if (!f || !(f.who === 'clock' || f.who === 'f:A' || live(f.who))) return null; const x = f.who, X0 = x === 'clock' ? 'le temps' : N(x), tr = f.who === J || f.who === 'clock' || f.who === 'f:A' ? {} : K.traitsOf(x, a), k = final ? 9 : ++f.at;
        const t = (f.kind === 'culprit' ? [XA && XA.t, XB && XB.t] : [f.d && f.d.t, f.vs && f.vs.t]).find((p) => p && p !== x && live(p)) || null, T0 = t ? K.nm(t) : '', DL = f.ev && f.ev.k === 'threat' ? 'Avant l’aube' : 'Ce soir';
        let o = null;
        const me = f.kind === 'rival' && f.d && f.d.t === J, V0 = f.vs && f.vs.t && live(f.vs.t) ? K.nm(f.vs.t) : 'tous';
        if (me) o = final ? { fr: `${X0}, à Justin : « Choisis. ${V0} ou moi. »`, act: 'force le choix', jobs: ['force'], tech: 'Il force la main', world: ['il faut trancher'] }
          : k === 1 ? { fr: `${X0} embrasse Justin, devant ${V0}.`, act: 'revendique Justin', jobs: ['harder'], tech: 'Show character positioning', world: [`${V0} les a vus`] }
          : k === 2 ? { fr: `${X0} glisse à ${V0} que Justin ment. Et cite la preuve.`, act: 'sape Justin', jobs: ['harder'], tech: 'Il retire un appui', world: [`${V0} doute de Justin`] }
          : { fr: `${X0}, à Justin : « ${V0} ou moi. Ce soir. »`, act: 'pose une échéance', jobs: ['force'], tech: 'Une annonce datée', world: ['une échéance'] };
        else if (f.kind === 'rival') o = final ? { fr: T0 ? `${X0} : « Ce soir, ${T0} part avec moi. Si tu veux l’en empêcher, c’est maintenant. »` : `${X0} : « Ce soir, tout se règle. »`, act: 'force le choix', jobs: ['force'], tech: 'Il force la main', world: ['il faut trancher ce soir'] }
          : k === 1 ? { fr: `${X0} embrasse ${T0} devant tous, en regardant Justin.`, act: `revendique ${T0}`, jobs: ['harder'], tech: 'Show character positioning', world: [`${X0} et ${T0}, devant tous`] }
          : k === 2 ? (tr.ruse >= 2 ? { fr: `${X0} glisse à ${T0} que Justin ment. Et cite la preuve.`, act: 'sape Justin', jobs: ['harder'], tech: 'Il retire un appui', world: [`${T0} doute de Justin`] }
            : { fr: `${X0} raconte devant ${T0} la pire histoire de Justin. Toute la salle rit.`, act: 'humilie Justin', jobs: ['harder'], tech: 'Il retire un appui', world: [`${T0} a ri de Justin`] })
          : { fr: `${X0}, à ${T0} : « Demain, devant tous, tu me dis oui. »`, act: 'pose une échéance', jobs: ['force'], tech: 'Une annonce datée', world: [`${T0} devra répondre demain`], open: [{ id: `dl:${x}`, k: 'dl', who: x, to: t, fr: `la réponse ${deN(T0)}, demain` }] };
        if (f.kind === 'culprit' && f.fact) { const ff = f.fact, Tt = TRACE[ff.ev.k] || TRACE.murder;
          const loves = (p) => p && (D2(x, 'love', p) || D2(x, 'protect', p)), T1 = T0 && !loves(t) ? T0 : '';
          const once = f.seduced; if (!final && via && via.t === x && ['love', 'protect'].includes(via.k)) f.seduced = 1;
          if (!final && !once && via && via.t === x) W.seduced = x;
          o = !final && once && via && via.t === x ? { fr: `${X0} serre Justin trop fort, et ne dit rien. ${X0} a peur de quelque chose.`, act: 'a peur', jobs: ['info'], tech: 'Une trace sur lui', world: [], aud: [{ k: 'learn', fr: `${X0} a peur de quelque chose` }] }
            : !final && via && via.t === x && via.k === 'love' ? { fr: `${X0} embrasse Justin. Puis, tout bas : « Arrête de chercher. Pour nous. »`, act: 'détourne Justin de la vérité', jobs: ['harder', 'info'], tech: 'Il retire un appui', world: ['Justin doit choisir entre chercher et ' + X0], aud: [{ k: 'learn', fr: `${X0} veut que Justin arrête de chercher` }] }
            : !final && via && via.t === x && via.k === 'protect' ? { fr: `${X0} supplie Justin de ne plus poser de questions : « Tu vas te faire du mal. »`, act: 'détourne Justin de la vérité', jobs: ['harder', 'info'], tech: 'Il retire un appui', world: ['Justin hésite à chercher'], aud: [{ k: 'learn', fr: `${X0} veut que Justin arrête de chercher` }] }
            : final ? (K.traitsOf(x, a).violence >= 2 && !W.pub.has(ff.id) ? { fr: T1 ? `${X0}, acculé, attrape ${T1} : « Un pas de plus, et c’est ${T1} qui paie. »` : `${X0}, acculé, attrape Justin par le col : « Un mot, et tu ne sors pas d’ici. »`, act: 'menace pour s’en sortir', jobs: ['force'], tech: 'Il force la main', world: ['une vie en jeu'] }
            : W.pub.has(ff.id) ? { fr: `${X0}, devant tous, ne nie plus. ${X0} demande seulement à Justin : « Laisse-moi partir avant l’aube. »`, act: 'demande grâce', jobs: ['force'], tech: 'Il force la main', world: [`le sort ${deN(X0)} est entre les mains de Justin`] }
            : D2(J, 'love', x) || D2(J, 'protect', x) ? { fr: `${X0}, tout bas, à Justin : « Si tu tiens à moi, tu te tais. »`, act: 'supplie Justin de se taire', jobs: ['force'], tech: 'Il force la main', world: ['Justin tient le sort de ' + X0] }
              : K.infos().some((i) => i.x === J && ['secret', 'mask'].includes(K.IN[i.id].k)) && !W.pub.has(ff.id) ? { fr: `${X0}, à Justin, devant tous : « Dis-le, et je dis le tien. »`, act: 'menace de tout dire', jobs: ['force'], tech: 'Il force la main', world: ['chacun tient l’autre'] }
              : { fr: `${X0} prend la porte de la cour. Si Justin ne fait rien, personne ne saura jamais.`, act: 's’enfuit', jobs: ['force'], tech: 'Il force la main', world: [`${X0} s’enfuit`] })
            : k === 1 ? { fr: Tt.lie(ctxT(ff)), act: 'ment', jobs: ['info'], tech: 'La réponse trop parfaite', world: [`${X0} a un alibi`], kind: 'lie' }
            : { fr: `${X0} retourne la salle contre Justin : « Tu accuses tout le monde, maintenant ? »`, act: 'retourne la salle', jobs: ['harder'], tech: 'On fait barrage', world: ['la salle se méfie de Justin'] }; }
        if (f.kind === 'hunter' && f.fact) { const ff = f.fact, c = { ...ctxT(ff), w: X0 }, Tt = TRACE[ff.ev.k] || TRACE.murder;
          o = final ? (W.pub.has(ff.id) ? null : SUSP && opened(`acc:${SUSP}`) ? { fr: `${X0}, devant tous : « À l’aube, on emmène ${K.nm(SUSP)}. Sauf si quelqu’un a quelque chose à dire. » ${X0} regarde Justin.`, act: 'pose une échéance', jobs: ['force'], tech: 'Il force la main', world: [`à l’aube, on emmène ${K.nm(SUSP)}`] }
            : closeH() ? { fr: `${X0} prend Justin à l’écart : « Dis-moi que je me trompe. »`, act: 'met Justin au pied du mur', jobs: ['force'], tech: 'Il force la main', world: [`${X0} attend la vérité de Justin`] }
            : { fr: `${X0}, devant tous : « Celui qui a fait ça est dans cette salle. À l’aube, je dirai son nom. »`, act: 'pose une échéance', jobs: ['force'], tech: 'Une annonce datée', world: ['à l’aube, un nom'] })
            : k === 1 ? { fr: `${X0} interroge la salle : où était chacun cette nuit-là ?`, act: 'interroge', jobs: ['harder'], tech: 'Show character positioning', world: [`${X0} cherche`], aud: [{ k: 'fear', fr: `${X0} cherche, et Justin est dans la salle` }] }
              : k === 2 ? { fr: Tt.t1(c), act: 'trouve un détail', jobs: ['info', 'harder'], tech: 'Le mobile évident', world: [`${X0} se rapproche`], aud: [{ k: 'learn', fr: Tt.t1a }, { k: 'fear', fr: `${X0} se rapproche` }] }
                : { fr: `${X0} regarde Justin, longtemps. Justin baisse les yeux le premier.`, act: 'a compris', jobs: ['harder'], tech: 'Le regard qui sait', world: [`${X0} soupçonne Justin`], aud: [{ k: 'fear', fr: `${X0} a compris ; et Justin sait qu’on sait` }] }; }
        if (f.kind === 'keeper' && f.fact) o = final ? null : k === 1 ? { fr: `On demande à ${X0} d’où vient ${pick(`kp${x}`, ['sa cicatrice', 'son accent', 'cette bague'])}. ${X0} rit, et répond à côté.`, act: 'esquive', jobs: ['info'], tech: 'Question esquivée', world: [] }
          : { fr: `${X0} prend ${T0 || 'Justin'} à part : « Ne pose plus de questions. »`, act: 'fait taire', jobs: ['harder'], tech: 'Le témoin se tait', world: [`${T0 || 'Justin'} a été averti`] };
        if (f.kind === 'ouster') { const y = f.d && f.d.t && live(f.d.t) ? K.nm(f.d.t) : 'Justin';
          o = final ? (tr.violence >= 2 ? { fr: `${X0} s’en prend à ${y}. Pour de bon, cette fois.`, act: 'frappe', jobs: ['force'], tech: 'Il force la main', world: [`${y} est en danger`] } : { fr: `${X0} fait chasser ${y} de la taverne, devant tous.`, act: 'fait chasser', jobs: ['force'], tech: 'Il force la main', world: [`${y} n’a plus sa place ici`] })
            : k === 1 ? { hostile: 1, fr: `${X0} se moque ${deN(y)} devant toute la salle.`, act: 'se moque', jobs: ['harder'], tech: 'Show character positioning', world: [`${y} a perdu la face`] }
              : { hostile: 1, fr: `${X0}, à ${y} : « Demain, tu n’es plus là. »`, act: 'menace', jobs: ['force'], tech: 'Menace : si tu X, je Y', world: [`${y} a jusqu’à demain`] }; }
        if (f.kind === 'threat') { const v = f.ev && f.ev.v && live(f.ev.v) ? K.nm(f.ev.v) : 'Justin';
          const two = XA && XB && XA.t && XB.t && live(XA.t) && live(XB.t) && tr.violence >= 2;
          o = final ? { fr: two ? `${X0} tient ${K.nm(XA.t)} et ${K.nm(XB.t)} à sa merci : « Un seul nom, Justin. Choisis. »` : `${X0} force Justin à choisir : « ${up(toYou(K.lab(XA || won)))} ou ${toYou(K.lab(XB || lost))}. Maintenant. »`, act: 'force le choix', jobs: ['force'], tech: 'Il force la main', world: ['il faut choisir, maintenant'] }
            : k === 1 ? { hostile: 1, fr: `${X0} brise la chope ${deN(v)} d’un revers : la prochaine fois, ce ne sera pas une chope.`, act: 'montre sa force', jobs: ['harder'], tech: 'Mention consequences', world: [`${v} sait que c’est sérieux`] }
              : { fr: `${X0} s’installe à la porte. Personne ne sort sans passer devant ${X0}.`, act: 'ferme la sortie', jobs: ['harder', 'force'], tech: 'Porte fermée', world: ['plus de sortie'] }; }
        if (f.kind === 'leaver') o = final ? { fr: `À l’aube, ${X0} part. Avec ou sans Justin.`, act: 'part', jobs: ['force'], tech: 'Il force la main', world: [`${X0} part à l’aube`] }
          : k === 1 ? { fr: SEED.leaving[1](X0), act: 'prépare son départ', jobs: ['info'], tech: 'Ça se prépare', world: [`${X0} va partir`] } : { fr: `${X0} : « Le bateau de l’aube. Avec ou sans toi. »`, act: 'fixe l’heure', jobs: ['force'], tech: 'Une annonce datée', world: ['une heure est fixée'] };
        if (f.kind === 'figure') { const G2 = K.graph(), R = G2.fig ? G2.fig.n : 'celui qui le cherche'; o = [{ fr: `On dit que ${R} demande après quelqu’un qui ressemble à Justin.`, act: 'cherche', jobs: ['harder'], tech: 'Un nom chuchoté', world: [`${R} approche`] },
          { fr: `${up(R)} a fait demander où dort Justin.`, act: 'se rapproche', jobs: ['harder'], tech: 'Ça se prépare', world: [`${R} sait où chercher`] }, { fr: `${up(R)} attend dehors.`, act: 'attend', jobs: ['force'], tech: 'Il reste peu de temps', world: [`${R} est là`] }][Math.min(2, k - 1)]; }
        const lvF = forces.find((y) => y.kind === 'leaver' && live(y.who)), G3 = K.graph();
        if (f.kind === 'clock') o = { fr: k >= 2 || final ? 'Le jour se lève bientôt. Il faut trancher.' : lvF ? `Plus que quelques heures avant le bateau de l’aube, celui ${deN(K.nm(lvF.who))}.` : G3.fig ? `Plus que quelques heures avant l’aube. À l’aube, ${G3.fig.n} sera là.` : 'Dehors, la nuit avance. À l’aube, tout sera joué.', act: 'le temps presse', jobs: ['force'], tech: 'L’échéance', world: ['le temps presse'], open: final || k >= 2 ? [] : [{ id: 'clock', k: 'clock', fr: 'l’aube' }] };
        if (!o || (!final && W.M.some((m) => m.act === a && m.fr === o.fr))) return null;
        return put({ seg, circle: final ? 7 : 4, kind: o.kind || (final ? 'force' : 'move'), hostile: !!o.hostile, open: o.open || [], actor: x === 'clock' ? null : x, desire: f.d ? K.dSay(f.d) : f.why, action: o.act, target: t, link: 'mais', cause, force: f.kind, fact: f.fact && f.fact.id,
          fr: o.fr, world: o.world, aud: o.aud || [{ k: 'fear', fr: final ? 'le choix arrive' : x === 'clock' ? 'le temps presse' : `${X0} ne lâchera pas` }], plot: x === 'clock' ? '⏳ le temps' : `⚔️ ${X0} contre Justin (${f.why})`, next: final ? 'Justin doit choisir' : 'Justin devra répondre', jobs: o.jobs, tech: o.tech, goal: 'stakes' }); };
      // the one a move hits answers, from who they are (only when it changes something)
      g.react = (m, seg) => { const t = m && m.target; if (!m || !(m.kind === 'theory' || m.hostile) || !t || t === J || !live(t) || !m.actor || m.actor === J || !live(m.actor)) return null; const tr = K.traitsOf(t, a), x = K.nm(m.actor), T0 = K.nm(t);
        let o = null;
        if (tr.violence >= 2 && (tr.rancune >= 2 || tr.fierte >= 2)) o = { fr: `${T0} attrape ${x} par le col : « Répète ça. »`, world: [`${T0} et ${x} : guerre ouverte`], next: `${T0} voudra se venger`, act: 'riposte' };
        else if (tr.peur >= 2) o = { fr: `${T0} ne dit plus un mot, et quitte la salle.`, world: [`${T0} s’éloigne`], next: `${T0} manquera quand on aura besoin ${deN(T0)}`, act: 'se retire' };
        else if (tr.fierte >= 2) o = { fr: `${T0} exige des excuses, devant tous. Personne ne bouge.`, world: [`${T0} a perdu la face`], next: `${T0} ne l’oubliera pas`, act: 'exige des excuses' };
        else if (tr.loyaute >= 2 && m.kind === 'theory') o = { fr: `${T0} ne se défend pas. ${T0} regarde Justin : « Toi aussi, tu le crois ? »`, world: [`${T0} attend que Justin le défende`], next: 'Justin devra choisir de le croire', act: 'en appelle à Justin' };
        if (!o) return null;
        const au = m.kind === 'theory' && o.act === 'riposte' ? [{ k: 'suspect', ref: m.fact, fr: `${T0} (et ${T0} vient de menacer ${x})` }] : [{ k: 'learn', fr: `${T0} ${o.act}` }];
        const owe = o.act === 'riposte' || o.act === 'exige des excuses' ? [{ id: `owe:${t}:${m.actor}`, k: 'owe', who: t, to: m.actor, fact: m.fact, hot: o.act === 'riposte', fr: `${T0} veut régler son compte ${aN(x)}` }] : [];
        return put({ seg, circle: 4, kind: 'react', fact: m.fact, open: owe, actor: t, desire: m.kind === 'theory' ? `${T0} veut laver son nom` : want(t), action: o.act, target: m.actor, link: 'donc', cause: m.id, fr: o.fr, world: o.world, aud: au, plot: `↪️ réponse à #${m.id}`, next: o.next, jobs: ['conseq'], tech: 'La conséquence, tout de suite', goal: 'conseq' }); };
      // the climax: Justin chooses (from who he is), what it costs, what he gets
      g.decide = (seg) => { if (!won) return null; const ez = (d) => FLAW[flawF ? flawF.flaw : 'none'].easy.includes(d.k) || SELF.includes(d.k), ovr = lost && ez(lost) && !ez(won);
        return put({ seg, circle: 7, kind: 'decide', actor: J, desire: lineOf(won), action: `choisit ${K.lab(won)}`, link: 'donc', fr: `${dec.broke ? dec.why : ovr ? FL.over : dec.why} Justin choisit ${K.lab(won)}${lost ? `, ${letGo(lost)}` : ''}.`,
          world: [`Justin a choisi ${K.lab(won)}`], aud: [{ k: 'answer', ref: 'climax', fr: `Justin choisit ${K.lab(won)}` }], plot: `🏁 le climax : ${K.lab(won)} plutôt que ${lost ? K.lab(lost) : '?'}`, next: lost ? `le prix : ${price ? price.fr : 'perdre ' + K.lab(lost)}` : '', jobs: ['force', 'payoff'], tech: 'Impossible choice', goal: 'stakes', why: dec.why }); };
      g.price = (seg) => { if (!lost || !price) return null; const who = price.kind === 'kill' && price.x && live(price.x) ? price.x : price.t && live(price.t) ? price.t : J;
        if (price.kind === 'kill' && price.t) W.out.set(price.t, 'dead'); if (price.kind === 'gone' && price.t) W.out.set(price.t, 'gone');
        return put({ seg, circle: 8, kind: 'price', actor: who, desire: who === J ? lineOf(lost) : want(who), action: { kill: 'tue', gone: 'part', turn: 'se détourne', hurt: 'reste blessé' }[price.kind] || 'perd', target: price.t || null, link: 'donc',
          fr: `${up(price.fr)}.`, world: [up(price.fr)], aud: [{ k: 'learn', fr: `le prix : ${price.fr}` }], plot: `💔 le prix de ${K.lab(lost)}`, next: a < A ? 'le monde a changé : l’acte suivant part de là' : 'c’est fini', jobs: ['conseq'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' }); };
      g.gain = (seg) => { if (!won) return null; const t = won.t && live(won.t) ? won.t : null, ex = W.exposed && live(W.exposed) ? W.exposed : null;
        const fr = won.k === 'justice' ? (ex ? `${K.nm(ex)} doit répondre de ce qui a été fait, devant tous.` : t ? `${K.nm(t)} doit répondre de ce qui a été fait, devant tous.` : 'La vérité est dite, devant tous.') : won.k === 'love' && t ? `${K.nm(t)} reste avec Justin.` : won.k === 'protect' && t ? `${K.nm(t)} est hors de danger, grâce à Justin.` : won.k === 'find' && t ? `Justin ramène ${K.nm(t)}.` : won.k === 'free' ? 'Justin part, enfin.' : won.k === 'alive' ? 'Justin s’en sort vivant.' : `Justin obtient ${K.lab(won)}.`;
        return put({ seg, circle: 8, kind: 'gain', actor: t || J, desire: t ? want(t) : lineOf(won), action: 'ce qu’il a gagné', link: 'donc', fr, world: [fr.replace(/\.$/, '')], aud: [{ k: 'learn', fr }], plot: `${K.DK[won.k].e} ${K.lab(won)} : gagné`, next: '', jobs: ['conseq'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' }); };
      g.turn = (seg) => { if (a < A) { const e2 = K.evs().find((e) => K.EK[e.k] && K.actOf(e) === a + 1 && K.live(e.x)); const AS = K.actState(), arc = AS.arcs.find((r) => live(r.who) && r.mode !== 'deuil');
        const fr = arc ? arcText(arc) : e2 && live(e2.x) ? `${K.nm(e2.x)} n’en a pas fini.` : 'Rien n’est fini.';
        return put({ seg, circle: 8, kind: 'turn', actor: arc ? arc.who : e2 ? e2.x : J, desire: arc ? arc.en : '', action: 'la suite', link: 'donc', fr, world: [], aud: [{ k: 'q', ref: 'next', fr: 'Que va-t-il se passer maintenant ?' }], plot: '❔ l’acte suivant', next: 'l’acte 2', jobs: ['force'], tech: 'Qui, quand, où', goal: 'curiosity' }); }
        if (W.confessed && won && won.t && forces.some((x) => x.kind === 'leaver' && x.who === won.t)) return put({ seg, circle: 8, kind: 'turn', actor: J, desire: lineOf(won), action: 'reste', link: 'donc', fr: 'Au comptoir, la place de Justin reste vide. Le bateau de l’aube est parti.', world: [], aud: [{ k: 'care', fr: 'ce que ça a coûté' }], plot: '💔 la dernière image', next: '', jobs: ['conseq'], tech: 'Chaise vide', goal: 'conseq' });
        if (W.confessed) { const ct2 = won && won.t && live(won.t) ? K.nm(won.t) : null; return put({ seg, circle: 8, kind: 'turn', actor: ct2 ? won.t : J, desire: lineOf(won), action: 'garde sa place', link: 'donc', fr: ct2 ? `Au comptoir, ${ct2} garde la place de Justin.` : 'Au comptoir, la place de Justin reste vide.', world: [], aud: [{ k: 'care', fr: 'ce que ça a coûté' }], plot: '💔 la dernière image', next: '', jobs: ['conseq'], tech: 'Chaise vide', goal: 'conseq' }); }
        const seat = lost && lost.t ? K.nm(lost.t) : null;
        return put({ seg, circle: 8, kind: 'turn', actor: J, desire: lineOf(won), action: 'reste avec ce qu’il a choisi', link: 'donc', fr: seat ? `Au comptoir, la place ${deN(seat)} reste vide.` : 'Justin reste seul au comptoir. Il a choisi.', world: [], aud: [{ k: 'care', fr: 'ce que ça a coûté' }], plot: '💔 la dernière image', next: '', jobs: ['conseq'], tech: 'Chaise vide', goal: 'conseq' }); };

      // ======== THE ACT, in its story circle ========
      const crimeF = myst, plansAll = facts.filter((f) => f !== mine && !f.open && (['twist', 'irony', 'motive'].includes(f.mode) || f.kind === 'object' || f.kind === 'link'));
      const sideOf = (r) => { const sides = [XA, XB].filter(Boolean); if (crimeF && crimeF.kind === 'crime' && sides.some((d) => d.k === 'justice') && r === 1) return sides.find((d) => d.k === 'justice'); return sides[(r + 1) % sides.length] || sides[0] || D.find((d) => d.who === J && d.s >= 2); };
      // HOW THE DECISIVE CLUE COMES (24/11). « search »: someone investigates, the culprit covers, the cover narrows it, the
      // culprit gives himself away in front of all. « encounter » (Vertigo, Breaking Bad's toilet book): when Justin loves the
      // culprit, he holds a detail nobody else has (the key), and the culprit, in a love scene, says the thing that only fits
      // it; he was not investigating them. He knows, alone: what he does with it is the story
      const chan0 = crimeF && crimeF.kind === 'crime' && crimeF.hidden && live(crimeF.by);
      const canEnc = chan0 && KEY[crimeF.ev.k] && (D2(J, 'love', crimeF.by) || D2(J, 'protect', crimeF.by)), canThird = chan0 && !!thirdOf0(crimeF), want0 = K.S.chan;
      const chan = !chan0 ? 'search' : want0 === 'search' ? 'search' : want0 === 'third' && canThird ? 'third' : want0 === 'encounter' && canEnc ? 'encounter' : canEnc ? 'encounter' : canThird && pv(`ch${crimeF.id}`, 2) === 0 ? 'third' : 'search';
      ACT.channel = crimeF && crimeF.kind === 'crime' && crimeF.hidden ? chan : null;
      const keyC = (f) => ({ ...ctxT(f), k: 'Justin', o0: f.vid ? K.nm(f.vid) : 'Le patron', g: ctxT(f).gift });
      const plant = (f, host) => { if (!host || chan !== 'encounter' || opened(`key:${f.id}`) || W.loops.some((L) => L.id === `key:${f.id}`)) return; const t = KEY[f.ev.k].hold(keyC(f));
        host.also.push({ fr: t, why: 'la clé : un détail que seul Justin a', fact: f.id }); host.aud.push({ k: 'learn', fr: t }); open(host, { id: `key:${f.id}`, k: 'key', fact: f.id, fr: KEY[f.ev.k].echo }); learn(J, `key:${f.id}`); };
      // the answer the culprit gives without knowing it (a love scene), then what Justin does with it
      g.notice = (f, seg, cause) => { const x = f.by, c = keyC(f); learn(J, f.id);
        return put({ seg, circle: 5, kind: 'notice', actor: x, desire: lineOf(D2(x, 'love', J) || D2(x, 'protect', J)) || want(x), action: 'se trahit sans le savoir', target: J, fact: f.id, link: 'mais', cause,
          fr: KEY[f.ev.k].slip(c), world: ['Justin sait. Seul.'], aud: [{ k: 'answer', ref: f.id, fr: f.truth }, { k: 'irony', fr: `Justin sait ; ${K.nm(x)} ne sait pas qu’il sait` }],
          plot: `${f.e} la réponse, en privé`, next: 'que fera Justin de ce qu’il sait ?', jobs: ['payoff', 'reverse'], tech: 'Un détail qu’il ne devrait pas savoir', goal: 'info',
          open: [{ id: `kept:${f.id}`, k: 'kept', fact: f.id, fr: 'ce que Justin fera de ce qu’il sait' }] }); };
      g.keep = (f, seg) => { const x = f.by, m = put({ seg, circle: 5, kind: 'keep', actor: J, desire: lineOf(D2(J, 'love', x) || D2(J, 'protect', x)), action: 'se tait', target: x, fact: f.id,
          fr: `Justin ne dit rien. Il serre ${K.nm(x)} plus fort, et ne dort pas de la nuit.`, world: ['Justin garde ce qu’il sait'], aud: [{ k: 'fear', fr: `ce que Justin va faire de ${K.nm(x)}` }], plot: '⇄ la vérité contre ce qu’il aime', next: `${K.nm(x)} va sentir que quelque chose a changé`, jobs: ['force', 'rel'], tech: 'Aveu vulnérable', goal: 'stakes' });
        hands(f, m); return m; };
      // the culprit senses it, and destroys the only thing that could prove it: now it is Justin's word against theirs
      g.proof = (f, seg, cause) => { const x = f.by, c = keyC(f);
        return put({ seg, circle: 6, kind: 'cover', actor: x, desire: `${K.nm(x)} veut garder son crime caché`, action: `fait disparaître ${KEY[f.ev.k].item}`, fact: f.id, link: 'mais', cause,
          fr: KEY[f.ev.k].proof(c), world: ['plus de preuve'], aud: [{ k: 'learn', fr: `${K.nm(x)} a senti que Justin sait` }], plot: `${f.e} la preuve disparaît`, next: 'il ne reste que la parole de Justin', jobs: ['harder'], tech: 'La preuve disparaît', goal: 'stakes' }); };
      // the room turns on an innocent while Justin keeps silent (his bond holds him: the inner pull)
      g.silence = (f, seg) => { const o = narrowTo(f), x = f.by;
        if (!held()) return put({ seg, circle: 6, kind: 'confront', actor: J, desire: lineOf(D2(J, 'justice')) || 'Justin veut la vérité', action: 'met le coupable au pied du mur, seul à seul', target: x, link: 'mais', fact: f.id,
          fr: `Justin attend ${K.nm(x)} dans la cour, seul à seul : « ${up(KEY[f.ev.k].echo)}. Tu étais là. » ${K.nm(x)} ne répond pas.`, world: [`${K.nm(x)} sait que Justin sait`], aud: [{ k: 'fear', fr: `ce que ${K.nm(x)} va faire, maintenant` }],
          plot: '⇄ il la met au pied du mur', next: `${K.nm(x)} va jouer sa dernière carte`, jobs: ['force', 'harder'], tech: 'Menace : si tu X, je Y', goal: 'stakes' });
        return put({ seg, circle: 6, kind: 'fail', actor: J, desire: lineOf(D2(J, 'love', x) || D2(J, 'protect', x)), action: 'se tait', link: 'mais', fact: f.id,
          fr: `Justin va parler. Il croise le regard ${deN(K.nm(x))}. Il se tait. Toute la salle accuse ${K.nm(o)}.`, world: [`on accuse ${K.nm(o)}, à tort`], aud: [{ k: 'fear', fr: `${K.nm(o)} paie pour le silence de Justin` }],
          plot: '⇄ ce qu’il aime le fait taire', next: `il devra sauver ${K.nm(o)}, ou ${K.nm(x)}`, jobs: ['fail', 'harder'], tech: 'Ça se retourne', goal: 'stakes', open: [{ id: `acc:${o}`, k: 'acc', who: o, fact: f.id, fr: `${K.nm(o)} accusé à tort` }] }); };
      // the truth in front of all, as the outcome of his choice (encounter): it clears who was accused, it settles the debts
      g.expose = (f, seg) => { const x = f.by, c = keyC(f); goPublic(f.id); W.exposed = x; const said = opened(`key:${f.id}`) || W.loops.some((L) => L.id === `key:${f.id}`) ? KEY[f.ev.k].echo : 'ce qu’il a appris';
        const m = put({ seg, circle: seg === 'end' ? 8 : 7, kind: 'reveal', actor: J, desire: lineOf(D2(J, 'justice')) || 'Justin veut la vérité', action: 'dit tout, devant tous', target: x, fact: f.id, link: 'donc',
          fr: `Justin dit tout, devant tous : ${said}, l’alibi, ${K.nm(x)}. ${K.nm(x)} ne nie pas.${f.mot && !f.whyLater ? ` ${up(f.mot.fr)}.` : ''}`, world: [`tout le monde sait : ${f.truth}`], aud: [{ k: 'learn', fr: `tout le monde sait : ${f.truth}` }],
          plot: `${f.e} la vérité, devant tous`, next: '', jobs: ['payoff', 'conseq'], tech: 'Demande qui révèle', goal: 'info' });
        hands(f, m); settle(m, ['acc', 'owe', 'obj', 'sus', 'wit']); pay(m, `kept:${f.id}`); return m; };
      // HIDDEN HANDS, shown (24/11: « relire » made concrete): when the truth is known, what the culprit did in the dark comes
      // back as short lines — the alibi was false, the false lead was theirs, the proof vanished by their hand
      const ECHO = { theory: (L) => `C’est ${K.nm(L.who)} qui avait lancé les soupçons${L.to ? ` sur ${K.nm(L.to)}` : ''}.`, lie: (L, f) => (TRACE[f.ev.k] || TRACE.murder).lieOut(ctxT(f)),
        cover: (L, f) => `C’est ${K.nm(L.who)} qui avait fait disparaître ${itemOf(f)}.`, scare: (L) => `C’est ${K.nm(L.who)} qui faisait peur ${aN(K.nm(L.to))}.`, knew: (L) => `${K.nm(L.who)} avait vu, et s’était tu pour ${K.nm(L.to)}.` };
      const hands = (f, host) => { for (const L of W.loops.filter((x) => !x.paid && x.k === 'hand' && x.fact === f.id)) { host.also.push({ fr: ECHO[L.how](L, f), why: 'ce qui change de sens', pays: L.id }); pay(host, L.id); }
        if (W.seduced === f.by) { host.also.push({ fr: `« Arrête de chercher. Pour nous. » : ${K.nm(f.by)} se protégeait.`, why: 'ce qui change de sens' }); W.seduced = null; }
        const mi = f.mot && f.mot.info && facts.find((x) => x.info === f.mot.info); if (mi) pay(host, `seed:${mi.id}`); };
      // PAYING WHAT IS LEFT: each loop kind has its closing line (on a host moment, or a moment of its own)
      const PAYER = {
        acc: (L) => (W.pub.has(L.fact) ? `On demande pardon ${aN(K.nm(L.who))}.` : `On accuse toujours ${K.nm(L.who)}, à la place du vrai coupable.`),
        owe: (L) => { const culp = facts.some((f) => f.kind === 'crime' && f.by === L.to && W.pub.has(f.id)); return culp && L.hot ? `Il faut deux hommes pour retenir ${K.nm(L.who)} face ${aN(K.nm(L.to))} : « C’est toi qui m’as accusé. »`
          : culp ? `${K.nm(L.who)}, à ${K.nm(L.to)}, devant tous : « Je n’oublierai pas. »` : `${K.nm(L.who)} n’a pas oublié : devant tous, ${K.nm(L.who)} tourne le dos ${aN(K.nm(L.to))}.`; },
        obj: (L) => { const f = facts.find((x) => x.id === L.fact), i = f && f.info; if (!i) return null; const h = f.obj || {}, cr = h.crime && facts.find((x) => x.ev === h.crime);
          return cr && W.pub.has(cr.id) ? `${up(K.infoFr(i))}, enfin ouverte : ${h.side === 'v' ? `${victimOf(h.crime, K.graph())} y avait écrit le nom ${deN(K.nm(h.crime.x))}` : 'tout y était'}.` : cr ? `Justin jette ${K.low1(K.infoFr(i))} au feu, sans l’ouvrir.` : `${up(K.infoFr(i))} : personne ne l’ouvrira.`; },
        sus: (L) => `Ce n’était pas ${K.nm(L.who)}.`,
        wit: (L) => { const f = facts.find((x) => x.id === L.fact); return f.by === J && !W.pub.has(f.id) ? `${K.nm(L.who)} n’a jamais rien dit. Mais ${K.nm(L.who)} ne regarde plus Justin.` : `${K.nm(L.who)} parle enfin : ${K.nm(L.who)} avait vu ${K.nm(f.by)}, cette nuit-là.`; },
        lied: (L) => (L.knew ? (!W.pub.has(L.fact) ? `${K.nm(L.who)} ne dira jamais rien. C’est leur secret, maintenant.` : W.confessed && won && won.t === L.who ? `${K.nm(L.who)} savait depuis le début. ${K.nm(L.who)} prend sa main.` : `${K.nm(L.who)} savait depuis le début, et n’avait rien dit.`)
          : !W.pub.has(L.fact) ? `${K.nm(L.who)} ne saura jamais. Justin, si.` : W.confessed && won && won.t === L.who ? `${K.nm(L.who)} : « Tu m’as menti. » Puis ${K.nm(L.who)} prend sa main.` : `${K.nm(L.who)}, à Justin : « Tu m’as menti, à moi aussi. »`),
        caught: () => null,
        clock: () => 'Le ciel pâlit. L’aube arrive.', dl: (L) => (W.exposed === L.who || facts.some((f) => f.kind === 'crime' && f.by === L.who && W.pub.has(f.id)) ? `${L.to ? K.nm(L.to) : 'Personne'} ne répondra jamais ${aN(K.nm(L.who))}.` : `Le jour est venu : ${L.to ? K.nm(L.to) : 'il'} doit répondre ${aN(K.nm(L.who))}.`),
        arr: (L) => `On sait maintenant ce que ${K.nm(L.who)} venait chercher : ${K.low1(want(L.who)).replace(/^[^ ]+ veut /, '')}.`,
        thr: (L) => (W.M.some((m) => m.actor === L.who && m.id > L.open && (m.hostile || m.kind === 'force')) ? `${K.nm(L.who)} est allé${ge(L.who)} jusqu’au bout.` : won && won.t && won.t === L.to ? `${K.nm(L.who)} recule devant Justin. Personne ne mourra ce soir.` : `${K.nm(L.who)} quitte la ville. Ce n’était qu’une menace.`),
        iro: (L) => { const f = facts.find((x) => x.id === L.fact); return f && f.info ? `Ce que Justin cachait finit par se savoir : ${K.low1(K.infoFr(f.info))}.` : null; },
        fav: (L) => (W.third && W.third.kind === 'love' && W.third.l && live(W.third.l) ? `${K.nm(L.who)} réclame son dû : Justin ne s’approche plus ${deN(K.nm(W.third.l))}.` : `${K.nm(L.who)} réclame sa faveur. Justin paie, sans un mot.`),
        use: (L) => `${K.nm(L.who)} n’a jamais rien dit de ce qui s’était passé.`,
        seed: () => null, key: () => null, q: () => null, sus2: () => null, kept: () => null, hand: (L) => { const f = facts.find((x) => x.id === L.fact); return f ? ECHO[L.how](L, f) : null; },
      };
      const settle = (host, kinds) => { for (const L of W.loops.filter((x) => !x.paid && (x.act === a || x.carry) && kinds.includes(x.k))) {
        if (L.k === 'thr' && K.evs().some((e) => K.actOf(e) > a && e.x === L.who)) { L.carry = 1; continue; }   // he is not done: the next act answers it
        const t = PAYER[L.k] && PAYER[L.k](L); if (!t) { pay(host, L.id); continue; } host.also.push({ fr: t, why: 'ce qui se ferme', pays: L.id }); pay(host, L.id); } };
      // the force with a plan of its own (24/11: not only an answer to Justin): a threat, a rival, someone who leaves, the
      // one off screen. It acts each round; what Justin does next is caused by it
      const agent = () => forces.find((f) => !['clock', 'culprit', 'inner', 'keeper', 'hunter'].includes(f.kind) && f.who !== J && (f.who === 'f:A' || live(f.who)) && f.who === dest.forcer)
        || forces.find((f) => ['threat', 'rival', 'leaver', 'figure', 'ouster'].includes(f.kind) && (f.who === 'f:A' || live(f.who)));
      // 1-3 · the opening (act 1: the recipe's spine) / act 2: what the last act changed, then its event
      if (a === 1) {
        const r = op.r, first = EV[0], care0 = (d) => d && d.t && live(d.t) ? g.care(J, d.t, d.k === 'love' ? 'love' : 'protect') : null;
        if (r === 'secret' && mine) { const f = mine, jw = [XA, XB].find((d) => d && d.who === J && !['hide', 'alive'].includes(d.k)) || D.find((d) => d.who === J && d.s >= 2 && !['hide', 'alive', 'justice'].includes(d.k));
          const pre = EV.filter((e) => e !== f.ev && EV.indexOf(e) < EV.indexOf(f.ev));
          g.want(jw); if (!pre.some((e) => e.v && jw && e.v === jw.t)) care0(jw);
          for (const e of pre) g.event(e);
          if (f.mot && !f.whyLater && !pre.some((e) => e.x === f.vid)) g.motive(f, 'open');
          const R0 = K.graph().fig; if (R0 && f.needer && W.last) W.last.also.push({ fr: `${up(R0.need(K.nm(f.needer)))}.`, why: 'ce qui est en jeu' });
          g.event(f.ev); g.matter(f); g.coverJ('open');
          ACT.turn = (H ? put({ seg: 'open', circle: 3, kind: 'turn', actor: H, desire: lineOf(HF.d) || `${Hn} veut la vérité`, action: 'resserre', link: 'mais', fact: f.id, fr: `${Hn} : « ${ONEOF[f.ev.k]} »`,
            world: ['le coupable est dans la salle'], aud: [{ k: 'fear', fr: `${Hn} va chercher parmi eux` }], plot: `${f.e} ça se resserre`, next: `${Hn} va chercher ; Justin devra se couvrir`, jobs: ['force'], tech: 'Personne n’est entré ni sorti', goal: 'stakes' }) : W.last).id; }
        else if (r === 'mystery' && crimeF && crimeF.kind === 'crime') { const f = crimeF, jw = [XA, XB].find((d) => d && d.k !== 'justice' && !(d.from === f.ev)) || D.find((d) => d.who === J && d.s >= 2 && d.k !== 'justice' && d.k !== 'alive');
          const pre = EV.filter((e) => e !== f.ev && EV.indexOf(e) < EV.indexOf(f.ev));
          g.want(jw);
          if (f.vid) { const pal = D.find((d) => ['protect', 'love'].includes(d.k) && d.t === f.vid && d.who !== f.by && live(d.who)); g.care(pal ? pal.who : J, f.vid, 'alive');
            if (f.sus && live(f.sus.id)) W.last.also.push({ fr: `${K.nm(f.sus.id)} et ${f.v} se disputent, devant tous.`, why: 'la fausse piste se prépare' }); }
          else if (jw && jw.t) care0(jw);
          for (const e of pre) g.event(e);
          const R0 = K.graph().fig, host0 = W.M.filter((m) => m.act === 1 && ['want', 'care'].includes(m.kind)).pop();
          if (host0 && f.needer && R0) host0.also.push({ fr: `${up(R0.need(K.nm(f.needer)))}.`, why: 'ce qui est en jeu' });
          if (host0 && f.mot && f.mot.f && f.mot.f.prom && live(f.by)) { host0.also.push({ fr: f.mot.f.prom[0](f.mot.c), why: `semé : ${f.mot.fr}`, fact: f.id }); host0.who.push(f.by); }
          g.event(f.ev); g.matter(f); g.theory(f, 'open'); plant(f, g.clue(f, 1, 'open'));
          const T1 = put({ seg: 'open', circle: 3, kind: 'turn', actor: live(f.seek) ? f.seek : J, desire: `${K.nm(live(f.seek) ? f.seek : J)} veut la vérité`, action: 'comprend', link: 'mais', fact: f.id,
            fr: f.ev.k === 'murder' ? 'Personne n’est entré, personne n’est sorti cette nuit. C’est l’un d’eux.' : f.ev.k === 'theft' ? 'Seuls ceux de la maison savaient où était la clé. C’est l’un d’eux.' : 'Seuls ceux de cette salle savaient. C’est l’un d’eux.',
            world: ['le coupable est dans la salle'], aud: [{ k: 'fear', fr: 'le coupable est parmi eux' }, { k: 'q', ref: f.id, fr: f.q }], plot: `${f.e} ça se resserre`, next: 'chacun soupçonne chacun', jobs: ['info', 'force'], tech: 'Personne n’est entré ni sorti', goal: 'curiosity' });
          ACT.turn = T1.id; }
        else if (r === 'mystery' && myst) { g.want(XA || D.find((d) => d.who === J && d.s >= 2)); care0([XA, XB].find((d) => d && d.t === myst.by)) || care0(XA); g.event(myst.ev); g.matter(myst); g.clue(myst, 1, 'open'); ACT.turn = g.clue(myst, 2, 'open').id; }
        else if (r === 'dilemma') { const [pA, pB] = [XA, XB].sort((x, y) => (y.t ? 1 : 0) - (x.t ? 1 : 0)); g.want(pA); if (pB && pB.t) care0(pB); else if (pA && pA.t && pB) g.want(pB);
          const evs0 = EV.filter((e) => ['arrive', 'threat', 'revenge', 'gone'].includes(e.k) || (K.EK[e.k].crime && !e.h)).slice(0, 2);
          for (const e of evs0) g.event(e); const fo = mf(); if (!evs0.some((e) => e.k === 'threat' || e.k === 'revenge') && fo) g.move(fo, 'open'); g.raise(pA, 'open'); g.raise(pB, 'open');
          const fx = forces.find((f) => f.who === K.forcer(1)) || forces.find((f) => f.kind === 'leaver' && live(f.who)), dl = pick('dlD', ['Avant l’aube', 'Avant la fermeture', 'Demain, au premier bateau']);
          const rv0 = !fx && forces.find((f) => f.kind === 'rival' && live(f.who) && f.d && f.d.t && f.d.t !== J); if (rv0) { rv0.at = 2; const m3 = g.move(rv0, 'open'); if (m3) { ACT.turn = m3.id; open(m3, { id: 'deadline', k: 'clock', fr: 'demain' }); } }
          if (!ACT.turn) ACT.turn = put({ seg: 'open', circle: 3, kind: 'turn', actor: fx && live(fx.who) ? fx.who : J, desire: fx && fx.d ? K.dSay(fx.d) : '', action: 'pose l’échéance', link: 'mais',
            fr: fx && live(fx.who) ? (fx.kind === 'leaver' ? `${K.nm(fx.who)} : « ${dl}, je pars. Avec ou sans toi. »` : `${K.nm(fx.who)}, à Justin : « ${dl}, je reviens. Ce soir-là, tu choisiras qui tu protèges. »`) : `${dl}, Justin devra choisir : ${K.lab(XA)} ou ${K.lab(XB)}.`, world: ['une échéance'], aud: [{ k: 'q', ref: 'climax', fr: op.q }], plot: '⚖️ le dilemme est posé', next: 'tout pèsera sur ce choix', jobs: ['force'], tech: 'Une annonce datée', goal: 'stakes',
            open: [{ id: 'deadline', k: 'clock', fr: dl }] }).id; }
        else { const jw = D.find((d) => d.who === J && d.src === 'choisi') || XA || D.find((d) => d.who === J && d.s >= 2); g.want(jw);
          if (first) g.event(first); const ob = forces.find((f) => f.vs && jw && f.vs.id === jw.id && f.who !== J && live(f.who)) || mf();
          if (ob) g.move(ob, 'open'); g.attempt(jw, 1, 'open'); g.fail(jw, false, 'open'); g.raise(jw, 'open');
          ACT.turn = ((ob && ob.kind !== 'inner' ? g.move(ob, 'open') : null) || W.last).id; }
        // the twists and what Justin hides: planted in the opening, riding in a moment that is already there (one line, two jobs)
        const hosts = W.M.filter((m) => m.act === 1 && ['care', 'want', 'matter'].includes(m.kind)), ofCrime = (f) => crimeF && ((f.mode === 'motive' && crimeF.mot && crimeF.mot.info === f.info) || (f.obj && f.obj.crime === crimeF.ev));
        plansAll.filter((f) => f.mode === 'irony').forEach((f) => g.seed(f, 1, 'open', W.M.find((m) => m.act === 1 && m.who.includes(f.by)) || W.M.find((m) => m.act === 1)));
        plansAll.filter((f) => f.mode !== 'irony' && ofCrime(f)).forEach((f, k) => g.seed(f, 1, 'open', hosts.find((m) => m.who.includes(f.by)) || hosts[k % Math.max(1, hosts.length)] || null));
        ACT.late = plansAll.filter((f) => f.mode !== 'irony' && !ofCrime(f));
      } else {
        const AS = K.actState(), arc = AS.arcs.find((r) => live(r.who));
        const m0 = arc ? put({ seg: 'open', circle: 1, kind: 'arc', actor: arc.who, desire: arc.mode === 'vengeance' ? `${K.nm(arc.who)} veut faire payer ${K.nm(arc.x)}` : arc.fr, action: { vengeance: 'bascule', deuil: 'porte son deuil', fuite: 's’en va', rancune: 'garde rancune' }[arc.mode] || 'change',
          fr: arcText(arc), world: [arcText(arc)], aud: [{ k: 'learn', fr: arcText(arc) }], plot: '🔀 quelqu’un a changé', next: 'ce qu’il fera maintenant', jobs: ['conseq'], tech: 'La conséquence, tout de suite', goal: 'conseq' }) : null;
        const e0 = EV[0]; const m1 = e0 ? g.event(e0) : null; const jw = XA || D.find((d) => d.who === J && d.s >= 2); g.want(jw, 'open');
        for (const L of W.loops.filter((x) => !x.paid && x.k === 'next')) pay(m0 || m1 || W.last, L.id);
        for (const e of EV.slice(1, 2)) g.event(e);
        plansAll.forEach((f, k) => g.seed(f, 1, 'open', W.M.filter((m) => m.act === a)[k] || null));
        ACT.turn = W.last.id;
      }
      // 4 · he searches. Three things run side by side, each move caused by the one before it:
      //  · the force with a plan of its own acts (the threat comes closer, the rival claims, the one who leaves gets ready);
      //  · Justin pushes his lines (an attempt, often caused by that) and the force whose interest it touches answers;
      //  · each hidden crime climbs its ladder, done by the one who wants the truth and answered by the culprit
      const crimeOn = crimeF && crimeF.kind === 'crime' && crimeF.hidden && live(crimeF.by);
      const later = EV.filter((e) => !W.hap.has(e));
      const R = Math.max(2, Math.min(3, forces.filter((f) => f.who !== J && f.kind !== 'clock').length + (crimeOn ? 1 : 0)));
      let failed = W.M.some((m) => m.act === a && m.kind === 'fail');
      const did = (kind) => W.M.some((m) => m.act === a && m.kind === kind && (!crimeF || m.fact === crimeF.id));
      const answerer = (d) => forces.find((f) => f.who !== J && f.kind !== 'clock' && f.kind !== 'hunter' && live(f.who) && !(f.kind === 'culprit' && (W.exposed === f.who || !W.hap.has(f.fact.ev))) && ((f.vs && d && f.vs.id === d.id && f.kind !== 'culprit') || (f.kind === 'culprit' && d && d.t === f.who && ['love', 'protect'].includes(d.k))));
      const sk = crimeOn ? (live(crimeF.seek) ? crimeF.seek : J) : null, skD = crimeOn ? (D2(sk, 'justice') || { id: `${sk}:justice`, who: sk, k: 'justice', t: crimeF.by }) : null;
      const culF = crimeOn ? forces.find((x) => x.kind === 'culprit' && x.who === crimeF.by) : null;
      const search = (lv, seg) => { if (sk === J && lv === 2 && W.seer === J) return put({ seg, circle: 4, kind: 'attempt', actor: J, desire: lineOf(skD), action: 'cherche', fact: crimeF.id, fr: `Justin redescend dans ${crimeF.spot}, chercher ${itemOf(crimeF).replace(/^un /, 'le ').replace(/^une /, 'la ')}.`, aud: [{ k: 'hope', fr: 'la preuve est à portée' }], plot: `${crimeF.e} on cherche`, next: `${K.nm(crimeF.by)} va devoir se couvrir`, jobs: ['want'], tech: 'Show character positioning', goal: 'stakes' });
        if (sk === J) return g.attempt([XA, XB].find((x) => x && x.k === 'justice') || D2(J, 'justice') || skD, lv, seg);
        const L = [`${K.nm(sk)} interroge la salle : où était chacun cette nuit-là ?`, `${K.nm(sk)} descend dans ${crimeF.spot}, chercher ce ${que(W.seer ? K.nm(W.seer) : 'quelqu’un')} a vu.`];
        return put({ seg, circle: 4, kind: 'attempt', actor: sk, desire: lineOf(skD) || `${K.nm(sk)} veut la vérité`, action: 'cherche', fact: crimeF.id, fr: L[Math.min(1, lv - 1)], aud: [{ k: 'hope', fr: 'la vérité approche' }],
          plot: `${crimeF.e} on cherche`, next: `${K.nm(crimeF.by)} va devoir se couvrir`, jobs: ['want'], tech: 'Show character positioning', goal: 'stakes' }); };
      // the ladder: what is left of it, one step per call. Encounter: the search only goes as far as the lie and the cleared
      // name; the answer comes in a love scene, not from the search
      const ladder = (seg) => { if (!crimeOn || !W.hap.has(crimeF.ev) || did('cover') || did('notice')) return false;
        if (!did('matter')) g.matter(crimeF, seg);
        if (!did('theory')) { const th = g.theory(crimeF, seg); if (th) g.react(th, seg); return true; }
        if (!did('lie')) { const th = W.M.filter((m) => m.fact === crimeF.id && m.kind === 'theory').pop(); if (th && !did('react')) g.react(th, seg);
          const at = search(1, seg); if (at && sk === J && !failed) { g.fail(at.line ? D.find((x) => x.id === at.line) : skD, false, seg); failed = true; }
          g.lie(culF, seg, at && at.id); if (!did('clue')) plant(crimeF, g.clue(crimeF, 1, seg)); return true; }
        // after the lie: who the culprit is may show (a tell); a frightened or angry mind may read a true trace wrong (a misread)
        if (!did('tell') && TELL.length && pv(`tell${crimeF.id}`, 3) !== 0) { if (g.tell(crimeF, seg)) return true; }
        if (!did('misread') && pv(`mis${crimeF.id}`, 2) === 0) { if (g.misread(crimeF, seg)) return true; }
        if (chan === 'encounter') { if (crimeF.sus && live(crimeF.sus.id) && !did('clear')) { g.clear(crimeF, seg); return true; } return false; }
        if (chan === 'third') { if (crimeF.sus && live(crimeF.sus.id) && !did('clear')) { g.clear(crimeF, seg); return true; } if (!did('offer')) { g.offer(crimeF, seg); return true; } return false; }
        if (!did('clue2')) { if (crimeF.sus && live(crimeF.sus.id) && !did('clear')) g.clear(crimeF, seg); g.clue(crimeF, 2, seg); return true; }
        const at = search(2, seg); g.cover(crimeF, seg, at && at.id); return true; };
      const hunt = (seg) => { if (!mine || !HF || !live(H) || W.pub.has(mine.id) || !W.hap.has(mine.ev) || W.hk >= 3) return false; const n = ++W.hk;
        if (n === 3) { const sl = g.slipJ(seg); const lk = g.move(HF, seg, sl ? sl.id : undefined); g.coverJ(seg, lk ? lk.id : undefined); return true; }
        const hm = g.move(HF, seg), sm = n === 2 ? g.suspJ(seg, hm ? hm.id : undefined) : null; const cv = g.coverJ(seg, (sm || hm || {}).id); if (n === 2) g.costJ(seg, cv ? cv.id : undefined); return true; };
      const toward = crimeOn && chan === 'encounter' ? [XA, XB].find((x) => x && x.t === crimeF.by && ['love', 'protect'].includes(x.k)) || D2(J, 'love', crimeF.by) || D2(J, 'protect', crimeF.by) : null;
      const sides = [XA, XB].filter((x) => x && !(crimeOn && sk === J && x.k === 'justice') && !(mine && x.who === J && x.k === 'hide'));
      for (let r = 1; r <= R; r++) { const seg = `r${r}`, d = sides.length ? sides[(r - 1) % sides.length] : null;
        // something else happens (« soudain »): an event of the act not placed yet
        const ev2 = later.shift(); if (ev2) { g.event(ev2, seg); const f2 = facts.find((x) => x.ev === ev2); if (f2 && f2 === crimeF) { plant(f2, W.last); ladder(seg); } if (f2 && f2 === mine) { g.matter(f2, seg); g.coverJ(seg); } }
        const ag = agent(), F0 = d ? answerer(d) : null, agm = ag && ag !== F0 ? g.move(ag, seg) : null;
        let mv = agm;
        if (d) { const at = g.attempt(d, r, seg, agm ? agm.id : undefined); if (!failed && !(crimeOn && sk === J && !did('lie'))) { g.fail(d, false, seg); failed = true; }
          if (toward && d.id === toward.id && did('lie') && !did('notice') && opened(`key:${crimeF.id}`)) { g.notice(crimeF, seg, at && at.id); g.keep(crimeF, seg); }
          else { const m2 = F0 ? g.move(F0, seg, at && at.id, false, d) : null; if (m2) mv = m2; if (m2 && m2.target && m2.target !== J && r <= 2) g.react(m2, seg); } }
        ladder(seg);
        // the other secrets: planted in round 1, in a moment where their keeper is; a second seed, far from the first
        hunt(seg);
        if (r === 1) for (const f of ACT.late || []) g.seed(f, 1, seg, W.M.filter((m) => m.seg === seg && m.act === a && m.kind !== 'seed').find((m) => m.who.includes(f.by)) || null);
        if (r === 2) plansAll.filter((f) => f.mode === 'twist' || f.mode === 'motive').forEach((f) => g.seed(f, 2, seg, W.M.filter((m) => m.seg === seg && m.act === a && m.kind !== 'seed')[0] || null));
        if (r === 2 || R === 2) { const can = [XA, XB].filter((x) => x && !(crimeOn && x.k === 'justice' && (W.lvl[x.id] || 0) >= 1)).sort((x, y) => (W.lvl[x.id] || 0) - (W.lvl[y.id] || 0) || (x === d) - (y === d)); if (can[0]) g.raise(can[0], seg, mv ? mv.id : undefined); }
        if (K.S.hard && K.S.hard.clock && r === R - 1) { const ck = forces.find((f) => f.kind === 'clock'); if (ck && !opened('deadline')) g.move(ck, seg); }
      }
      // 5 · he finds. Search: the proof someone saw, and it vanishes. Encounter: if the love scene has not come yet, it comes
      // now; the culprit senses he knows, and destroys the only proof. Else: the line he cares most about gets closer
      if (crimeOn && chan === 'encounter') { for (let k = 0; k < 3 && ladder('mid'); k++);
        if (!did('notice') && toward) { const rz = g.raise(toward, 'mid'); if (!opened(`key:${crimeF.id}`)) plant(crimeF, rz); g.notice(crimeF, 'mid', rz && rz.id); g.keep(crimeF, 'mid'); }
        if (did('notice')) { const kp = W.M.filter((m) => m.act === a && m.kind === 'keep').pop(); g.proof(crimeF, 'mid', kp ? kp.id : undefined); } }
      else if (crimeOn) { for (let k = 0; k < 3 && ladder('mid'); k++); }
      for (let k = 0; k < 3 && hunt('mid'); k++);
      // the audience learns before Justin when the opening was not a mystery (curiosity was not the hook: suspense is)
      if (crimeOn && op && op.r !== 'mystery' && !knows(J, crimeF.id) && !W.pub.has(crimeF.id) && !did('glimpse')) g.glimpse(crimeF, 'mid');
      else { const fd = won || XA; if (fd && (W.lvl[fd.id] || 0) < 2) g.raise(fd, 'mid'); }
      const attached = (d) => W.M.some((m) => m.act === a && ['care', 'raise', 'move', 'want'].includes(m.kind) && (m.target === d.t || m.actor === d.t || (m.kind === 'want' && m.line === d.id)));
      for (const d of [XA, XB]) if (d && d.t && live(d.t) && !attached(d)) g.care(J, d.t, d.k === 'love' ? 'love' : 'protect', 'mid');
      // 6 · it costs: his flaw (if not yet), then what he loves holds him back (or, knowing alone, his silence condemns someone)
      if (!failed) { g.fail(lost || XB || XA, false, 'take'); failed = true; }
      if (crimeOn && chan === 'encounter' && did('notice')) g.silence(crimeF, 'take'); else g.fail(lost || XB || XA, true, 'take');
      // 7 · the return: the truths that must come before the choice (a public answer settles the hidden hands, the accused, the
      // debts), then the force (the clock and the deadlines arrive with it), both sides at their worst, his choice
      const dueReveal = facts.filter((f) => !f.open && (f.mode === 'mystery' || f.mode === 'twist' || f.mode === 'irony' || f.kind === 'object' || f.kind === 'link') && f.act === a);
      const isPrice = (f) => f.by === J && [XA, XB].some((d) => d && d.k === 'hide' && d.who === J);
      const heldObj = (f) => chan === 'encounter' && f.kind === 'object' && f.obj && crimeF && f.obj.crime === crimeF.ev;   // the box that names the culprit is his proof, for after his choice
      for (const f of dueReveal.filter((x) => x !== crimeF && x !== mine && x.kind !== 'object' && !isPrice(x))) g.reveal(f, 'crisis');
      for (const f of dueReveal.filter((x) => x.kind === 'object' && !heldObj(x))) g.reveal(f, 'crisis');
      const truthSide = [XA, XB].some((x) => x && x.k === 'justice');
      if (crimeOn && chan === 'third' && W.third && !W.third.pays && !knows(J, crimeF.id)) { const t3 = W.third.who; goPublic(crimeF.id); W.exposed = crimeF.by;
        const m = put({ seg: 'crisis', circle: 7, kind: 'reveal', actor: t3, desire: want(t3), action: 'le dit devant tous, pour lui', target: crimeF.by, fact: crimeF.id, link: 'soudain',
          fr: `${K.nm(t3)}, devant tous, au pire moment : « C’est ${K.nm(crimeF.by)}. Je l’ai vu. »${crimeF.mot && !crimeF.whyLater ? ` ${up(crimeF.mot.fr)}.` : ''}`, world: [`tout le monde sait : ${crimeF.truth}`], aud: [{ k: 'answer', ref: crimeF.id, fr: crimeF.truth }],
          plot: `${crimeF.e} la vérité, au service ${deN(K.nm(t3))}`, next: `${K.nm(t3)} y gagne`, jobs: ['payoff', 'reverse'], tech: 'Pas sans aide', goal: 'info' });
        pay(m, `use:${t3}`); hands(crimeF, m); settle(m, ['acc', 'owe', 'sus', 'wit']); }
      if (crimeF && (crimeF.kind === 'gone' || (crimeOn && (chan === 'search' || (chan === 'third' && !knows(J, crimeF.id) && !W.pub.has(crimeF.id)))))) { const rv = g.reveal(crimeF, 'crisis', crimeF.kind === 'crime' && truthSide);
        if (rv && crimeF.kind === 'crime') { hands(crimeF, rv); if (!truthSide) { goPublic(crimeF.id); settle(rv, ['acc', 'owe', 'sus', 'wit']); } else { learn(J, crimeF.id); open(rv, { id: `kept:${crimeF.id}`, k: 'kept', fact: crimeF.id, fr: 'ce que Justin fera de ce qu’il sait' }); } } }
      if (crimeOn && knows(J, crimeF.id) && !W.pub.has(crimeF.id) && !truthSide && !(D2(J, 'love', crimeF.by) || D2(J, 'protect', crimeF.by))) g.expose(crimeF, 'crisis');
      const fx = (mine && HF && live(H) && !W.pub.has(mine.id) ? HF : null) || forces.find((f) => f.who === dest.forcer && live(f.who)) || forces.find((f) => f.kind === 'culprit' && f.who === (crimeF && crimeF.by) && live(f.who) && (W.pub.has(crimeF.id) || knows(J, crimeF.id))) || forces.find((f) => f.who !== J && f.kind !== 'clock' && live(f.who)) || forces.find((f) => f.kind === 'clock');
      const force = fx ? g.move(fx, 'crisis', undefined, true) : null; if (force) { dest.forced = force.id; settle(force, ['clock', 'dl']); }
      for (const d of [XA, XB]) if (d && (W.lvl[d.id] || 0) < 3 && !(force && d.t && force.actor === d.t)) { W.lvl[d.id] = 2; g.raise(d, 'crisis'); }
      const dm = g.decide('crisis'); if (dm) { dest.decided = dm.id; settle(dm, ['clock', 'dl']); }
      // 8 · what he got, what it cost, what is still owed (each loop closes where the audience sees it), the last image
      const told = crimeOn && won && won.k === 'justice' && !W.pub.has(crimeF.id) && knows(J, crimeF.id);
      if (told) g.expose(crimeF, 'end');
      g.answerJ('end');
      const conf2 = W.confessed && lost && lost.who === J, ct = won && won.t && live(won.t) ? K.nm(won.t) : null;
      const freed = conf2 && SUSP && won && won.t === SUSP && live(SUSP), lvS = freed && forces.some((x) => x.kind === 'leaver' && x.who === SUSP);
      const gm = told ? null : freed ? put({ seg: 'end', circle: 8, kind: 'gain', actor: SUSP, desire: want(SUSP), action: 'est libre', link: 'donc', fr: `${K.nm(SUSP)} est libre.${lvS ? ` À l’aube, ${K.nm(SUSP)} prend le bateau. Sans Justin.` : ''}`, world: [`${K.nm(SUSP)} est libre`], aud: [{ k: 'learn', fr: `${K.nm(SUSP)} est libre` }], plot: `${K.DK[won.k].e} ${K.lab(won)} : gagné`, next: '', jobs: ['conseq'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' })
        : conf2 && ct && won.k === 'love' ? put({ seg: 'end', circle: 8, kind: 'gain', actor: won.t, desire: want(won.t), action: 'reste', link: 'donc', fr: `${ct} : « Je t’attendrai. »`, world: [`${ct} attendra Justin`], aud: [{ k: 'learn', fr: `${ct} attendra` }], plot: `${K.DK[won.k].e} ${K.lab(won)} : gagné`, next: '', jobs: ['conseq'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' }) : g.gain('end');
      const pm = conf2 ? put({ seg: 'end', circle: 8, kind: 'price', actor: J, desire: lineOf(lost), action: 'paie', link: 'donc', fr: a < A ? 'Tout le monde sait, désormais. Justin ne pourra plus jamais se cacher ici.' : 'À l’aube, on emmène Justin.', world: ['Justin paie'], aud: [{ k: 'learn', fr: 'le prix : il paie pour ce qu’il a fait' }], plot: `💔 le prix de ${K.lab(lost)}`, next: a < A ? 'l’acte suivant part de là' : 'c’est fini', jobs: ['conseq'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' }) : g.price('end');
      if (pm && lost && lost.k === 'hide') for (const L of W.loops.filter((x) => !x.paid && x.k === 'iro')) pay(pm, L.id);
      if (conf2 && pm) dest.price = { kind: 'caught', fr: K.low1(pm.fr.replace(/\.$/, '')) };
      settle(pm || gm || W.last, ['acc', 'owe', 'obj', 'sus', 'wit', 'arr', 'thr', 'iro', 'hand', 'clock', 'dl', 'seed', 'key', 'q', 'sus2', 'kept', 'fav', 'use', 'lied', 'caught']);
      const tm = g.turn('end'); if (tm && a < A) open(tm, { id: `next:${a}`, k: 'next', fr: 'la suite' });
      ACT.to = W.M.length;
      // what had to come before the climax (Phase D), and where it is
      const before = (pred) => { const at2 = W.M.findIndex((m) => m.id === dest.decided); const hit = W.M.slice(ACT.from, at2 < 0 ? ACT.to : at2).find(pred); return hit ? hit.id : null; };
      const weighs = (d) => (m) => (m.line === d.id && m.kind === 'raise') || (d.t && m.actor === d.t && ['raise', 'move', 'force'].includes(m.kind));
      if (XA) dest.pre.push({ fr: `${up(K.lab(XA))} existe et pèse (le public sait ce que Justin y perdrait)`, at: before(weighs(XA)) });
      if (XB) dest.pre.push({ fr: `${up(K.lab(XB))} existe et pèse`, at: before(weighs(XB)) });
      if (fx) dest.pre.push({ fr: `${fx.who === 'clock' ? 'Le temps' : N(fx.who)} force le choix`, at: dest.forced || null });
      dest.pre.push({ fr: 'Sa faille l’a déjà fait échouer (le choix est une victoire sur elle)', at: before((m) => m.kind === 'fail') });
      for (const d of [XA, XB]) if (d && d.k === 'justice' && crimeF) dest.pre.push({ fr: `Justin sait la vérité (${crimeF.q.replace(/ \?$/, '')})`, at: before((m) => ['reveal', 'notice'].includes(m.kind) && m.fact === crimeF.id) });
      if (lost && lost.t) dest.pre.push({ fr: `On s’est attaché à ${K.nm(lost.t)} (sinon le prix ne coûte rien)`, at: before((m) => ['care', 'raise', 'move', 'want'].includes(m.kind) && (m.target === lost.t || m.actor === lost.t || (m.kind === 'want' && m.line === lost.id))) });
      for (const f of facts.filter((x) => x.mode === 'mystery' && x.kind === 'crime' && x.hidden)) dest.pre.push({ fr: `Deux vrais indices avant la réponse à « ${f.q} »`, at: W.M.filter((m) => m.fact === f.id && ['clue', 'clue2', 'cover', 'lie', 'notice'].includes(m.kind)).length >= 2 ? W.M.filter((m) => m.fact === f.id && ['clue', 'clue2', 'cover', 'lie', 'notice'].includes(m.kind))[1].id : null });
      if (mine) { dest.pre.push({ fr: 'Le public a vu ce que Justin a fait (sans ça, pas de suspense)', at: before((m) => m.kind === 'deed') });
        if (H) dest.pre.push({ fr: `${Hn} se rapproche (un détail, puis Justin se trahit)`, at: before((m) => m.kind === 'slipJ') || before((m) => m.actor === H && m.force === 'hunter' && /détail|regarde/.test(m.action + m.fr)) }); }
      dest.hidden = facts.filter((f) => f.act > a).map((f) => f.truth);
    }
    return W;
  }

  // ==== G · EPISODES. Episode 1 = the opening (played, ~2 minutes). Then one episode per part of the circle (each search
  // round, then « il trouve + il paie », the return, the end): 2 to 5 slides each; a longer one is cut at its turn ====
  function allocate(W) {
    const eps = [], SC = scenesOf(W), END = ['force', 'decide', 'answerJ', 'suspJ', 'reveal', 'turn', 'deed', 'event', 'price', 'expose'];
    for (const ACT of W.acts) { let cur = null; const flush = () => { if (cur && cur.M.length) eps.push(cur); cur = null; };
      for (const sc of SC.filter((x) => x.act === ACT.a)) {
        if (sc.open) { if (!cur || !cur.open) { flush(); cur = { act: ACT.a, M: [], scenes: [], open: true }; } cur.M.push(...sc.M); cur.scenes.push(sc); continue; }
        const last = cur && cur.M[cur.M.length - 1];
        if (cur && (cur.open || cur.M.length + sc.M.length > 5 || (cur.M.length >= 3 && last && END.includes(last.kind)))) flush();
        if (!cur) cur = { act: ACT.a, M: [], scenes: [] };
        cur.M.push(...sc.M); cur.scenes.push(sc); }
      flush();
      // a last episode of one moment joins the one before (when it fits)
      const mine = eps.filter((E) => E.act === ACT.a); if (mine.length > 1) { const z = mine[mine.length - 1], y = mine[mine.length - 2]; if (z.M.length < 2 && !y.open && y.M.length + z.M.length <= 5) { y.M.push(...z.M); y.scenes.push(...z.scenes); eps.splice(eps.indexOf(z), 1); } } }
    W.scenes = SC;
    // what each episode does (Phase G): what changes, its turn, what stays open, what is kept for later; and the audience at its end
    const L = ledger(W.loops); eps.forEach((E, n) => { E.n = n + 1; for (const sc of E.scenes) sc.ep = n + 1; for (const m of E.M) { L.apply(m); m.ep = n + 1; }
      E.changes = E.M.flatMap((m) => m.world).filter(Boolean); E.turn = E.M[E.M.length - 1]; E.aud = L.snap();
      E.circle = [...new Set(E.M.map((m) => m.circle))].sort((x, y) => x - y).map((c) => CIRCLE[c][0]); E.big = [...new Set(E.M.map((m) => m.big))].sort((x, y) => x - y).map((c) => CIRCLE[c][0]);
      // a slide shows the faces of who it names (the one who acts first)
      E.slides = E.M.map((m) => { const fr = [m.slide, ...m.also.filter((x) => !/^Le public/.test(x.fr)).map((x) => x.fr)].join(' '); return { fr, who: [...new Set([...m.who, ...K.people().filter((p) => fr.includes(K.nm(p)))])].slice(0, 3), id: m.id }; }); });
    cards(W);
    // the scene's question is its choice; it ends on the next scene's question (Swain: the decision sets the next goal)
    const SC2 = W.scenes || []; for (const sc of SC2) { const c = sc.choice; sc.q = c ? `${K.nm(c.who)} : ${inf(c.a)}, ou ${inf(c.b)} ?` : ''; }
    SC2.forEach((sc, k) => { const nx = SC2[k + 1] && SC2[k + 1].act === sc.act ? SC2[k + 1] : null; sc.qNext = nx ? nx.q : ''; });
    return eps;
  }

  // ==== H · THE SCENES (25/11, Justin: « build it, see what problems it causes »; the theory: REFERENCE-THEORIE-RECIT.md § 4,
  // « The Micro-Engine of a Scene »). A moment is the smallest change; a SCENE is 1-5 moments in one continuous place and time,
  // around one question, ending on a turn. Its card says who wants what here, against whom, the object the debate is about, the
  // CHOICE (who holds it, option A or B, what was chosen), the state before → after, what the viewer knows that someone in the
  // room does not, and the question it leaves open. The writer writes scenes from cards, not sentences ====
  const RIDER = (m) => m.kind === 'seed' || m.force === 'clock';
  const OBJ_RE = /(meilleure place|foulard|bourse|écrin|boîte|lettre|bague|clé|carte|photo|sac|billet|bateau|chope|couteau|pièce|coffre|recette|livre de comptes|sceau|mouchoir|tache|porte de la cour|corps)/;
  // where a moment happens: an explicit place in its line (« dans la cour », « sous l'escalier »), the deed at its spot, else the room
  function placeOf(m, FX) { const t = [m.fr, ...m.also.map((x) => x.fr)].join(' ');
    if (m.kind === 'deed') { const f = FX.get(m.fact); if (f && f.spot) return { p: f.spot, hard: true }; }
    for (const sp of SPOTS) if (t.includes(`dans ${sp}`)) return { p: sp, hard: true };
    if (/(sous|près de) l’escalier/.test(t) && !/escalier de derrière/.test(t)) return { p: 'l’escalier', hard: true };
    return { p: /tout bas|à l’écart|à part|seul à seul/.test(t) ? 'à l’écart' : 'la salle', hard: false }; }
  function scenesOf(W) { const FX = new Map(W.acts.flatMap((A) => A.facts.map((f) => [f.id, f]))), out = [];
    for (const ACT of W.acts) { const Ms = W.M.slice(ACT.from, ACT.to), evAt = (Ms.find((m) => m.seg === 'open' && (m.kind === 'deed' || (m.kind === 'event' && m.ev && ((K.EK[m.ev.k] || {}).crime || m.ev.k === 'gone')))) || {}).id || Infinity;
      const timeOf = (m) => `${ACT.a > 1 ? 'le lendemain, ' : ''}${({ open: m.id <= evAt ? 'le soir' : 'la nuit', r1: 'la nuit', r2: 'la nuit', r3: 'tard dans la nuit', mid: 'tard dans la nuit', take: 'tard dans la nuit', crisis: 'avant l’aube', end: 'à l’aube' })[m.seg] || 'la nuit'}`;
      let sc = null; const mk = (m, pl, tm, open) => { sc = { act: ACT.a, M: [], place: pl.p, hard: pl.hard, time: tm, open, facts: new Set(), lines: new Set() }; out.push(sc); };
      for (const m of Ms) { const pl = RIDER(m) ? { p: 'la salle', hard: false } : placeOf(m, FX), tm = timeOf(m), open = ACT.a === 1 && m.seg === 'open', rider = RIDER(m), beats = sc ? sc.M.filter((x) => !RIDER(x)).length : 0;
        const ppl = new Set(m.who.filter((p) => p !== J)), cont = !!sc && sc.M.some((x) => x.who.some((p) => p !== J && ppl.has(p)));
        const same = !!sc && ((m.fact && sc.facts.has(m.fact)) || (m.line && sc.lines.has(m.line)));
        const brk = !sc || sc.open !== open || (!rider && ((pl.hard && pl.p !== sc.place) || (!pl.hard && sc.hard && !cont) || tm !== sc.time || (beats >= 4 && m.seg !== 'crisis') || sc.M.length >= 5
          || m.kind === 'deed' || (sc.M.some((x) => x.kind === 'deed') && !cont) || (beats >= 2 && !cont && !same && m.seg !== 'crisis')));
        if (brk) mk(m, pl, tm, open); else if (pl.hard && !sc.hard) { sc.place = pl.p; sc.hard = true; }
        sc.M.push(m); m.place = sc.place; if (m.fact) sc.facts.add(m.fact); if (m.line) sc.lines.add(m.line); } }
    for (let k = out.length - 2; k >= 0; k--) { const z = out[k], y = out[k + 1]; if (z.M.every(RIDER) && y.act === z.act && y.open === z.open && y.M.length + z.M.length <= 5) { y.M.unshift(...z.M); for (const m of z.M) m.place = y.place; out.splice(k, 1); } }
    for (let k = out.length - 2; k >= 0; k--) { const z = out[k], y = out[k + 1], m0 = z.M[0];
      if (z.M.length === 1 && !BIG.includes(m0.kind) && m0.kind !== 'deed' && new Set(m0.who).size <= 1 && y.act === z.act && y.open === z.open && y.M.length < 5) { y.M.unshift(m0); m0.place = y.place; m0.insert = 1; out.splice(k, 1); } }
    // the choice of the climax never stands alone: it joins what forced it
    for (let k = out.length - 1; k > 0; k--) { const z = out[k], y = out[k - 1]; if (z.M.length === 1 && z.M[0].kind === 'decide' && y.act === z.act && y.M.length < 5) { y.M.push(z.M[0]); z.M[0].place = y.place; out.splice(k, 1); } }
    // a scene of one moment (not the deed, not somewhere special) joins the one before, in the same time
    for (let k = out.length - 1; k > 0; k--) { const z = out[k], y = out[k - 1]; if (z.M.filter((x) => !RIDER(x)).length <= 1 && !z.hard && !z.M.some((x) => x.kind === 'deed') && y.act === z.act && y.open === z.open && y.time === z.time && y.M.length + z.M.length <= 5) { y.M.push(...z.M); for (const m of z.M) m.place = y.place; out.splice(k, 1); } }
    out.forEach((x, k) => { x.n = k + 1; }); return out; }
  // the choice of a scene: who holds it, what was done (A), what else could have been done (B). Most dramatic first
  const CHOICE_ORDER = ['decide', 'answerJ', 'deed', 'coverJ', 'costJ', 'keep', 'silence', 'expose', 'misread', 'fail', 'lie', 'cover', 'theory', 'suspJ', 'offer', 'react', 'confront', 'matter', 'attempt', 'force', 'move'];
  const BIG = ['decide', 'answerJ', 'deed', 'coverJ', 'costJ', 'keep', 'silence', 'expose', 'misread', 'offer'];
  const FLAWCH = { menteur: ['mentir', 'dire la vérité'], lache: ['reculer', 'tenir tête'], colere: ['exploser', 'se contenir'], orgueil: ['refuser l’aide', 'accepter l’aide'], vice: ['boire', 'rester lucide'], none: ['hésiter', 'agir'] };
  const ALT = { 'a compris': ['se taire et observer', 'l’accuser tout de suite'], interroge: ['interroger la salle', 'attendre'], 'trouve un détail': ['chercher encore', 'laisser tomber'], 'pose une échéance': ['poser une échéance', 'laisser faire'],
    'met Justin au pied du mur': ['le mettre au pied du mur', 'se taire'], 'jure de trouver': ['jurer de trouver', 'laisser faire'], 'fixe l’heure': ['partir à l’aube, avec ou sans lui', 'rester'], 'prépare son départ': ['préparer son départ', 'rester'] };
  const ELSE = { coverJ: 'dire la vérité', lie: 'avouer', cover: 'avouer', theory: 'se taire', deed: 'ne rien faire', costJ: 'le dire', keep: 'le dire', silence: 'parler', expose: 'se taire', misread: 'attendre d’être sûr',
    suspJ: 'chercher encore', react: 'laisser passer', attempt: 'renoncer', move: 'attendre', force: 'laisser faire', offer: 'se taire', confront: 'se taire' };
  function choiceOf(sc, A) { const big = BIG.map((k) => sc.M.filter((x) => x.kind === k && x.actor).pop()).find(Boolean), m = big || sc.M.filter((x) => x.actor && CHOICE_ORDER.includes(x.kind)).pop();
    if (!m) { const mo = sc.M.find((x) => x.kind === 'motive'), f = mo && A.facts.find((x) => x.id === mo.fact);   // before the deed: he chooses to act
      return f ? { who: J, a: ({ murder: `suivre ${f.v} dehors`, theft: 'attendre que la salle se vide', betray: 'parler à l’inconnu' })[f.ev.k] || 'agir', b: 'laisser faire', id: mo.id } : null; }
    if (ALT[m.action]) return { who: m.actor, a: ALT[m.action][0], b: ALT[m.action][1], id: m.id };
    if (m.kind === 'fail' && !['retenu par l’autre côté', 'y va quand même'].includes(m.action)) { const fl = FLAWCH[K.S.flaw[J]] || FLAWCH.none; return { who: m.actor, a: fl[0], b: fl[1], id: m.id }; }
    if (m.kind === 'attempt') return { who: m.actor, a: K.low1(m.fr.replace(/^Justin /, '').replace(/\.$/, '')), b: 'renoncer', id: m.id };
    if (m.kind === 'decide') return { who: m.actor, a: K.lab(A.dest.dec.won), b: A.dest.dec.lost ? K.lab(A.dest.dec.lost) : 'l’autre côté', id: m.id };
    if (m.kind === 'fail') return { who: m.actor, a: m.action === 'retenu par l’autre côté' ? 'rester' : m.action === 'y va quand même' ? 'y aller quand même' : m.action, b: m.action === 'retenu par l’autre côté' ? 'y aller' : m.action === 'y va quand même' ? 'rester' : 'tenir bon', id: m.id };
    if (m.kind === 'answerJ') return { who: m.actor, a: m.action, b: m.action === 'avoue' ? 'se taire' : m.action === 'se tait' ? 'parler' : 'laisser tomber', id: m.id };
    return { who: m.actor, a: m.action, b: ELSE[m.kind] || 'ne pas le faire', id: m.id }; }
  // the actions said as choices (« va-t-il mentir, ou dire la vérité ? »)
  const INF = { ment: 'mentir', 'ment encore': 'mentir encore', avoue: 'avouer', 'se tait': 'se taire', 'passe à l’acte': 'passer à l’acte', 'fait disparaître la preuve': 'faire disparaître la preuve', 'fait accuser quelqu’un': 'faire accuser quelqu’un',
    'fait taire un témoin': 'faire taire un témoin', 'prépare sa fuite': 'préparer sa fuite', 'laisse payer un innocent': 'laisser payer un innocent', 'lâche celle qu’il protège': 'lâcher celle qu’il protège', 'détourne les soupçons': 'détourner les soupçons',
    soupçonne: 'soupçonner', 'le dit devant tous': 'le dire devant tous', 'le dit, en vain': 'le dire, même en vain', renonce: 'renoncer', 'se tait pour lui': 'se taire pour lui', 'voit quelque chose': 'le voir', 'se trompe, et agit': 'agir sur ce qu’il croit',
    'vend ce qu’il sait': 'vendre ce qu’il sait', riposte: 'riposter', 'se retire': 'se retirer', 'exige des excuses': 'exiger des excuses', 'en appelle à Justin': 'en appeler à Justin', 'invente un coupable': 'inventer un coupable', 'pousse la fausse piste': 'pousser une fausse piste',
    'garde pour lui': 'garder ça pour lui', 'le dit à Justin, seul': 'le dire à Justin', 'force le choix': 'forcer le choix', 'pose une échéance': 'poser une échéance', 'fait chasser': 'le faire chasser', frappe: 'frapper', 'menace pour s’en sortir': 'menacer pour s’en sortir',
    'supplie Justin de se taire': 'supplier Justin de se taire', 'menace de tout dire': 'menacer de tout dire', 's’enfuit': 's’enfuir', 'demande grâce': 'demander grâce', 'détourne Justin de la vérité': 'détourner Justin de la vérité', 'retourne la salle': 'retourner la salle contre Justin',
    'se moque': 'se moquer', menace: 'menacer', 'revendique Justin': 'revendiquer Justin', 'sape Justin': 'saper Justin', 'humilie Justin': 'humilier Justin', 'montre sa force': 'montrer sa force', 'ferme la sortie': 'fermer la sortie', part: 'partir', esquive: 'esquiver', 'fait taire': 'faire taire' };
  const inf = (t) => INF[t] || t;
  // the object a scene's debate turns around: one of the story's own (a gun on the wall fires: never a new one), else a prop of the room
  const PROP = { 'la salle': 'les chopes sur le comptoir', 'à l’écart': 'une bougie qui baisse', 'la cour': 'la porte de la cour', 'l’écurie': 'une lanterne', 'la cave': 'une lanterne', 'la réserve': 'les tonneaux', 'l’escalier': 'le sac sous l’escalier', 'l’escalier de derrière': 'une lanterne' };
  function objectOf(sc, A, all) { const ob = all.match(OBJ_RE); if (ob) return { o: ob[1], own: true };
    for (const m of sc.M) { const f = m.fact && A.facts.find((x) => x.id === m.fact); if (!f) continue; if (f.kind === 'crime' && ['deed', 'coverJ', 'cover', 'clue2', 'proof', 'keep', 'event'].includes(m.kind)) return { o: f.ev.k === 'theft' && f.thing ? f.thing : itemOf(f), own: true }; if (f.kind === 'object' && f.info) return { o: K.low1(K.infoFr(f.info)), own: true }; }
    const io = K.infos().find((i) => K.IN[i.id].k === 'object' && sc.who.includes(i.x)); if (io) return { o: K.low1(K.infoFr(io)), own: true };
    return { o: PROP[sc.place] || PROP['la salle'], own: false }; }
  // the cards, with what the viewer carries in and out of each scene
  function cards(W) { const L = ledger(W.loops);
    for (const sc of W.scenes || []) { const A = W.acts.find((x) => x.a === sc.act), wIn = L.snap().wonders, irIn = L.snap().irony; for (const m of sc.M) L.apply(m); const sn = L.snap();
      const all = sc.M.map((m) => [m.fr, ...m.also.map((x) => x.fr)].join(' ')).join(' '), ch = choiceOf(sc, A);
      const who = [...new Set([...sc.M.flatMap((m) => m.who), ...K.people().filter((p) => all.includes(K.nm(p)) && !(W.deadAt.has(p) && W.deadAt.get(p) < sc.M[0].id))])].filter((p) => p && p !== 'clock'), holder = ch ? ch.who : (sc.M.find((m) => m.actor === J) ? J : (sc.M.find((m) => m.actor) || {}).actor);
      const hm = sc.M.find((m) => m.actor === holder && m.desire) || sc.M.find((m) => m.desire) || {}, opp = sc.M.find((m) => m.actor && m.actor !== holder && (m.link === 'mais' || m.force || m.hostile))
        || sc.M.find((m) => m.actor && m.actor !== holder) || { actor: sc.M.map((m) => m.target).find((p) => p && p !== holder && p !== 'clock') || who.find((p) => p !== holder && p !== J) || null };
      sc.who = who; const OB = objectOf(sc, A, all);
      const fear = sc.M.flatMap((m) => m.aud.filter((x) => x.k === 'fear').map((x) => x.fr))[0];
      const change = [...new Set(sc.M.flatMap((m) => m.world))].filter(Boolean), knows = [...new Set(sc.M.flatMap((m) => m.aud.filter((x) => ['learn', 'answer', 'suspect', 'clear'].includes(x.k)).map((x) => x.fr)))].filter((x) => !change.includes(x));
      Object.assign(sc, { who, holder, want: hm.desire || '', opp: opp ? opp.actor : null, object: OB.o, objOwn: OB.own, choice: ch, stakes: fear || ((W.loops.find((L) => sc.M.some((m) => m.id === L.open)) || {}).fr || ''), epilogue: !ch && sc.M.every((m) => m.seg === 'end'),
        change, knows, qIn: wIn, qOut: sn.wonders.filter((q) => !wIn.includes(q)).concat(sn.wonders.filter((q) => wIn.includes(q))).slice(0, 2), irony: irIn.slice(-1)[0] || '',
        heading: `${['la cour', 'l’écurie'].includes(sc.place) ? 'EXT.' : 'INT.'} ${String(K.S.decor || 'taverne').toUpperCase()}${sc.place === 'la salle' ? '' : `, ${sc.place.toUpperCase()}`} — ${sc.time.toUpperCase()}` }); } }
  // what a screenwriter would see in the scenes (25/11): how many hold a choice, an object, an opponent, a real change
  function sceneStats() { const v = movie(), S2 = v.W.scenes || [], n = S2.length || 1, pc = (f) => Math.round((100 * S2.filter(f).length) / n);
    return { scenes: S2.length, moments: v.W.M.length, eps: v.eps.length, perScene: +(v.W.M.length / n).toFixed(1), single: pc((x) => x.M.filter((m) => !RIDER(m)).length <= 1),
      choice: pc((x) => !!x.choice || x.epilogue), justinChooses: pc((x) => x.choice && x.choice.who === J), object: pc((x) => !!x.object), opponent: pc((x) => !!x.opp), change: pc((x) => x.change.length || x.knows.length),
      newQuestion: pc((x) => !!x.qNext || x.epilogue || (x.qOut.length && x.qOut.some((q) => !x.qIn.includes(q)))), storyObject: pc((x) => x.objOwn), places: [...new Set(S2.map((x) => x.place))] }; }
  // the audience, moment by moment: what it knows, what it suspects (theories), what it wonders, what it believes wrongly,
  // what only it knows (irony), whom it cares for
  // the loops the audience waits on (what it does not consciously carry, a seed, a key, a hidden hand, stays out)
  const WAIT = ['q', 'arr', 'thr', 'obj', 'wit', 'kept', 'clock', 'dl', 'acc', 'owe', 'next', 'caught', 'lied'];
  function ledger(loops = []) {
    const K2 = { knows: [], th: new Map(), wrong: [], irony: [], cares: [], open: new Map() }, byId = new Map(loops.map((L) => [L.id, L]));
    return { apply(m) { for (const x of m.aud) { if (x.k === 'learn') K2.knows.push(x.fr); if (x.k === 'suspect') K2.th.set(x.ref, x.fr);
      if (x.k === 'clear') { K2.wrong.push(x.fr); K2.th.delete(x.ref); } if (x.k === 'answer') { K2.th.delete(x.ref); K2.knows.push(x.fr); } if (x.k === 'irony') K2.irony.push(x.fr); if (x.k === 'care') K2.cares.push(x.fr); }
      for (const id of m.opens || []) { const L = byId.get(id); if (L && WAIT.includes(L.k)) K2.open.set(id, L.fr); } for (const id of m.pays || []) { K2.open.delete(id); const L = byId.get(id); if (L && ['sus', 'sus2'].includes(L.k)) K2.th.delete(L.fact); } },
      snap: () => ({ knows: K2.knows.slice(-6), wonders: [...K2.open.values()], suspects: [...K2.th.values()], wrong: K2.wrong.slice(), irony: K2.irony.slice(), cares: K2.cares.slice(-3) }) };
  }

  // ---- the whole thing, computed once per state ----
  function movie() {
    K = FORGE.core(); const sig = JSON.stringify([K.S.cast, K.S.pil, K.S.flaw, K.S.want, K.S.rel, K.S.infos, K.S.ev, K.S.links, K.S.acts, K.S.seed, K.S.hard, K.S.open, K.S.tq, (K.S.picked || {}).pick]);
    if (CACHE && CACHE.sig === sig) return CACHE.v;
    const W = build(), A0 = W.acts.length; for (const m of W.M) m.big = A0 === 2 ? (m.act === 1 ? Math.ceil(m.circle / 2) : 4 + Math.ceil(m.circle / 2)) : m.circle;
    const eps = allocate(W), v = { W, eps, acts: W.acts, opening: W.acts[0] && W.acts[0].op };
    const sig2 = JSON.stringify([K.S.cast, K.S.pil, K.S.flaw, K.S.want, K.S.rel, K.S.infos, K.S.ev, K.S.links, K.S.acts, K.S.seed, K.S.hard, K.S.open, K.S.tq, (K.S.picked || {}).pick]);
    CACHE = { sig: sig2, v }; return v;
  }

  // ---- the orchestration as text, to read as a screenwriter (🧭 in Créer) ----
  function text() {
    const v = movie(), L = [], dash = (s) => `  · ${s}`;
    const cast = K.people().filter(K.live).map((id) => `${K.nm(id)}${id === J ? ' (le héros)' : ''} : ${K.pillarsOf(id).map((p) => K.P[p].n).join(' + ')}${K.S.flaw[id] ? ` · ${K.F[K.S.flaw[id]].n}` : ''} · ${K.traitTxt(K.traitsOf(id, 1)).map((x) => x[0]).join(' · ') || 'rien d’extrême'}`);
    L.push('ORCHESTRATION (FORGE)', '', 'A · LES INGRÉDIENTS', ...cast.map(dash));
    v.acts.forEach((ACT) => { const a = ACT.a, D0 = ACT.dest;
      L.push('', `════════ ACTE ${a} ════════`);
      L.push('', 'B · CE QUI EST VRAI (le public ne le voit pas)', ...(ACT.facts.length ? ACT.facts.map((f) => dash(`${f.e} ${f.truth}${f.knowers && f.knowers.length ? ` — le savent : ${f.knowers.map(N).join(', ')}` : ''}${f.sus ? ` — fausse piste : ${K.nm(f.sus.id)}` : ''} [${({ mystery: 'mystère', twist: 'surprise', irony: 'le public sait', motive: 'mobile', public: 'public' })[f.mode] || f.mode}]`)) : [dash('rien de caché')]));
      L.push('', 'C · LE MOTEUR');
      const [A0, B0] = D0.X; L.push(dash(`Justin veut : ${[A0, B0].filter(Boolean).map((d) => `${K.DK[d.k].e} ${K.lab(d)}`).join(' / ') || '?'}`));
      L.push(dash('Ce qui s’oppose, et comment ça agit :')); for (const f of ACT.forces) L.push(`      ${f.who === J ? '🪞 Justin lui-même' : f.who === 'clock' ? '⏳ le temps' : f.who === 'f:A' ? `🌑 ${figName()}` : `⚔️ ${K.nm(f.who)}`} (${f.kind}) : ${f.why}`);
      L.push('', 'D · LA DESTINATION', dash(`Le choix : ${A0 ? K.lab(A0) : '?'} ou ${B0 ? K.lab(B0) : '?'} ?`), dash(`Justin choisit (par qui il est) : ${D0.dec.won ? K.lab(D0.dec.won) : '?'} — ${D0.dec.why}`), dash(`Le prix : ${D0.price ? D0.price.fr : '—'}`));
      L.push(dash('Ce qui doit être vrai avant le choix :')); for (const p of D0.pre) L.push(`      ${p.at ? '✓' : '✗'} ${p.fr}${p.at ? ` (#${p.at})` : ' — manque'}`);
      if (D0.hidden && D0.hidden.length) L.push(dash(`Gardé pour plus tard : ${D0.hidden.join(' · ')}`));
      if (ACT.op) { const o = ACT.op; L.push('', `OUVERTURE : ${o.n} — ${o.engage}`, dash(`Pourquoi : ${o.why[o.r].join(', ')}`), dash(`Les autres : ${Object.keys(o.scores).filter((k) => k !== o.r).map((k) => `${RECIPES[k].n} ${o.scores[k]}`).join(' · ')}`),
        dash(`La question du public : ${o.q}`), dash(`L’accroche : ${o.hook}`), dash(`Ce qui la rend personnelle : ${o.personal}`), dash(`Disponible : ${o.clue}`), dash(`Reste inconnu : ${o.unknown}`)); }
      L.push('', 'E+F · LES MOMENTS (cause → acteur, désir → action → monde · public · intrigue · ensuite)');
      for (const m of v.W.M.filter((x) => x.act === a)) { L.push(`#${m.id} [${CIRCLE[m.circle][0]}${v.acts.length > 1 ? ` · grand cercle : ${CIRCLE[m.big][0]}` : ''} · ép. ${m.ep}] ${m.fr}${m.also.length ? ` (+ ${m.also.map((x) => x.fr).join(' ')})` : ''}`);
        if ((m.opens || []).length || (m.pays || []).length) L.push(`      ${(m.opens || []).length ? `⤷ ouvre : ${m.opens.map((id) => (v.W.loops.find((x) => x.id === id) || {}).fr || id).join(' · ')}` : ''}${(m.opens || []).length && (m.pays || []).length ? '   ' : ''}${(m.pays || []).length ? `✓ ferme : ${m.pays.map((id) => { const x = v.W.loops.find((y) => y.id === id); return x ? `${x.fr} (ouvert #${x.open})` : id; }).join(' · ')}` : ''}`);
        L.push(`      ← ${m.cause ? `#${m.cause} (${({ donc: 'donc', mais: 'mais', soudain: 'soudain' })[m.link] || m.link})` : 'rien avant'} · ${m.actor ? N(m.actor) : '—'}${m.desire ? ` (${m.desire})` : ''} → ${m.action}`);
        L.push(`      monde : ${m.world.join(' ; ') || '—'} · public : ${m.aud.map((x) => `${({ q: '❓', learn: '💡', suspect: '🤨', clear: '✖', answer: '✅', care: '❤️', fear: '😨', irony: '🙈', reframe: '🔄', hope: '🤞' })[x.k] || ''} ${x.fr}`).filter((s) => s.trim()).join(' ; ') || '—'}`);
        L.push(`      intrigue : ${m.plot} · ensuite : ${m.next || '—'} · rôles : ${m.jobs.map((j) => JOB[j] || j).join(', ')}`); } });
    const lo = v.W.loops; L.push('', `LES BOUCLES (ce que le public porte) : ${lo.length} ouvertes, ${lo.filter((x) => x.paid).length} fermées${lo.some((x) => !x.paid) ? ` — restent : ${lo.filter((x) => !x.paid).map((x) => x.fr).join(' · ')}` : ''}`);
    L.push('', 'H · LES SCÈNES (un épisode = des scènes ; une scène = un lieu, un moment, une question, un choix, un changement)');
    for (const sc of v.W.scenes || []) { const c = sc.choice;
      L.push('', `Scène ${sc.n} · ép. ${sc.ep} · ${sc.heading} · ${sc.who.map((p) => K.nm(p)).join(', ')}`);
      L.push(dash(`Porte la scène : ${sc.holder ? K.nm(sc.holder) : '—'}${sc.want ? ` (${sc.want})` : ''}${sc.opp ? ` · contre : ${K.nm(sc.opp)}` : ' · contre : —'}`));
      L.push(dash(`La question : ${sc.q || '—'}`));
      L.push(dash(`L’objet : ${sc.object || '—'}${sc.objOwn ? '' : ' (du décor)'} · l’enjeu : ${sc.stakes || '—'}${sc.irony ? ` · le public sait : ${sc.irony}` : ''}`));
      L.push(dash(c ? `Le choix (${K.nm(c.who)}) : ${c.a} ✓ / ou : ${c.b}` : sc.epilogue ? 'Le choix : — (l’épilogue : le nouvel état)' : 'Le choix : — (aucun)'));
      L.push(dash(`Les temps : ${sc.M.map((m) => `#${m.id}`).join(' ')} · ce qui change : ${sc.change.concat(sc.knows).slice(0, 3).join(' ; ') || '— (rien)'}`));
      L.push(dash(`En sortant : ${[sc.qNext, ...sc.qOut].filter(Boolean).slice(0, 2).join(' · ') || '—'}`)); }
    const st = sceneStats(); L.push('', `  ${st.scenes} scènes pour ${st.moments} moments (${st.perScene} par scène) · avec un choix : ${st.choice} % (Justin : ${st.justinChooses} %) · un objet : ${st.object} % · quelqu’un contre : ${st.opponent} % · un changement : ${st.change} % · une seule action : ${st.single} %`);
    L.push('', 'G · LES ÉPISODES');
    for (const E of v.eps) { L.push('', `Épisode ${E.n}${E.open ? ' (l’ouverture : 2 minutes, jouée)' : ` (${E.slides.length} diapos)`} · acte ${E.act} · ${E.circle.join(' → ')}${v.acts.length > 1 ? ` · grand cercle : ${E.big.join(' → ')}` : ''}`);
      L.push(dash(`Ce qui change : ${E.changes.slice(0, 4).join(' ; ') || '—'}`), dash(`Le tournant : #${E.turn.id} ${E.turn.fr}`));
      L.push(dash(`À la fin, le public sait : ${E.aud.knows.join(' · ') || '—'}`), dash(`Il se demande : ${E.aud.wonders.join(' · ') || '—'}`), dash(`Il soupçonne : ${E.aud.suspects.join(' · ') || '—'}`));
      if (E.aud.irony.length) L.push(dash(`Lui seul sait : ${E.aud.irony.join(' · ')}`)); if (E.aud.wrong.length) L.push(dash(`Il a soupçonné à tort : ${E.aud.wrong.join(' · ')}`)); }
    return L.join('\n');
  }

  // ---- episode 1 as a plan (the format of Plan de scène): prompt2 writes its lines, passive (the characters choose) ----
  function openingPlan() {
    const v = movie(), E = v.eps[0], ids = {}; let n = 0;
    const gone = new Set(); const present = (m) => { for (const x of E.M.filter((y) => y.id < m.id && y.kind === 'event' && y.ev && y.ev.k === 'murder' && y.ev.v)) gone.add(x.ev.v); if (m.kind === 'event' && m.ev && m.ev.k === 'murder' && m.ev.v) gone.add(m.ev.v);
      const D1 = K.storyAt(1).D, wantOf = (p) => { const d = D1.filter((x) => x.who === p && x.s >= 2 && x.k !== 'alive' && !gone.has(x.t)).sort((x, y) => y.s - x.s)[0]; return d ? K.dSay(d) : ''; };
      return [...new Set([m.actor, ...m.who, J, ...K.S.cast.filter(K.live)])].filter((p) => p && (p === J || K.S.cast.includes(p)) && !gone.has(p)).map((p) => ({ id: p, name: K.nm(p), wants: p === m.actor ? m.desire : wantOf(p) })); };
    const beats = E.M.map((m) => { const id = `r${++n}`; ids[m.id] = id; const pre = m.link === 'mais' ? 'Mais : ' : m.link === 'soudain' ? 'Soudain : ' : '';
      const sc = (v.W.scenes || []).find((x) => x.M[0] === m), head = sc ? `[Scène ${sc.n} · ${sc.place}, ${sc.time}${sc.choice ? ` · ${K.nm(sc.choice.who)} choisit : ${sc.choice.a} (ou : ${sc.choice.b})` : ''}${sc.object ? ` · l’objet : ${sc.object}` : ''}] ` : '';
      return { id, goals: m.goal ? [m.goal] : [], tech: m.tech || '', lines: m.kind === 'event' || m.kind === 'turn' ? 4 : 3, what: `${head}${pre}${m.fr}${m.also.length ? ` En même temps : ${m.also.map((x) => x.fr).join(' ')}` : ''}${m.actor && m.desire ? ` (${N(m.actor)} : ${m.desire})` : ''}`,
        present: present(m), ...(m.kind === 'decide' ? { decides: m.actor } : {}) }; });
    const links = []; for (const m of E.M) if (m.cause && ids[m.cause] && ids[m.cause] !== ids[m.id] && ['clue', 'cover', 'reveal', 'react', 'clear'].includes(m.kind)) links.push({ from: ids[m.cause], to: ids[m.id], label: 'cause → effet' });
    const next = v.eps[1] ? v.eps[1].M.slice(0, 2).map((m, k) => ({ id: `f${k + 1}`, goals: [], tech: '', lines: 1, what: m.fr })) : [];
    const hid = v.acts.flatMap((ACT) => [...ACT.facts.filter((f) => f.hidden && !f.open && f.mode !== 'irony').map((f) => f.truth),
      ...ACT.facts.filter((f) => f.kind === 'crime' && f.hidden && f.by === J).map((f) => `${f.truth} — the viewer SEES it, in its rectangle (Justin alone with ${f.v || 'it'}); nobody else knows: from then on nobody says it, asks it straight or guesses it in this episode, and Justin lies about it`)]), op = v.opening;
    const chars = K.S.cast.filter(K.live).map((id) => ({ id, name: K.nm(id), sprite: K.sprite(id), poses: ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'].filter((p) => window.SPRITES && SPRITES[K.sprite(id)] && SPRITES[K.sprite(id)].poses[p]),
      traits: K.pillarsOf(id).map((p) => K.P[p].n.replace(/^L[ea’] ?/, '')), voice: K.voiceOf(id, 1), acts: K.traitTxt(K.traitsOf(id, 1)).map((x) => x[1]).join(', ') || 'nothing extreme' }));
    // the world facts the story itself uses (a figure the moments never name would become a subplot nobody follows)
    const G0 = K.graph(), said = v.W.M.map((m) => [m.fr, ...m.also.map((x) => x.fr)].join(' ')).join(' '), figUsed = G0.fig && said.includes(G0.fig.n);
    const facts = [...G0.facts.map((f) => f[0]).filter((t) => figUsed || !G0.fig || !t.includes(G0.fig.n)), ...E.M.filter((m) => ['clue', 'event', 'motive'].includes(m.kind)).map((m) => m.fr)];
    return { title: `${(op && op.q) || 'Créer'} · épisode 1`, scene: 'taverne', passive: true, turn: E.turn.fr, needs: [], facts,
      story: { episode: 1, of: v.eps.length, act: 1, known: [], hidden: hid, open: [], dead: [], recipe: op ? `${op.n} : ${op.engage}. La question du public : ${op.q}` : '' },
      chars, player: { id: J, name: 'Justin', traits: K.pillarsOf(J).map((p) => K.P[p].n.replace(/^L[ea’] ?/, '')), voice: K.voiceOf(J), acts: K.traitTxt(K.traitsOf(J, 1)).map((x) => x[1]).join(', ') || 'nothing extreme' },
      infos: [], boxes: [{ id: 'ep', title: 'Épisode 1', col: 0, beats }, { id: 'later', title: 'Plus tard', col: 1, beats: next }], links };
  }
  const epPrompt = () => { PLAN.add(openingPlan()); return PLAN.prompt2(); };

  // ---- the black screens: « Épisode 2 », then its slides, one sentence at a time (never a lot of words at once), until the end ----
  let stEl = null;
  // one sentence per tap, but a quote stays whole (« C’est moi. J’ai tué James. » is one step, never cut across two screens)
  const sentences = (t) => { const out = []; let cur = '', q = 0; const str = String(t);
    for (let i = 0; i < str.length; i++) { const ch = str[i]; cur += ch; if (ch === '«') q++; if (ch === '»') q = Math.max(0, q - 1);
      if (!q && /[.!?»]/.test(ch) && (i + 1 >= str.length || str[i + 1] === ' ') && !(ch !== '»' && str.slice(i + 1).trim().startsWith('»'))) { if (cur.trim()) out.push(cur.trim()); cur = ''; } }
    if (cur.trim()) out.push(cur.trim()); return out.length ? out : [str]; };
  function slides(from = 2, opt = {}) {
    const v = movie(), eps = v.eps.filter((E) => E.n >= from); if (!eps.length) return null; style();
    if (stEl) stEl.remove(); const el = document.createElement('div'); el.id = 'orSl'; document.body.appendChild(el); stEl = el;
    // the steps: a title card per episode, then each slide cut in its sentences (each tap adds the next one)
    const steps = []; for (const E of eps) { steps.push({ title: `Épisode ${E.n}`, sub: E.act > 1 && E === eps.find((x) => x.act === E.act) ? `Acte ${E.act}` : '' });
      for (const s of E.slides) sentences(s.fr).forEach((p, k, all) => steps.push({ slide: s, part: p, k, of: all.length })); }
    steps.push({ title: 'Fin', sub: '', end: true });
    let i = -1; const shown = [];
    const draw = () => { const s = steps[i];
      if (s.title) { shown.length = 0; el.innerHTML = `<button type="button" class="orX" data-x="1">✕</button><div class="orT"><h1>${esc(s.title)}</h1>${s.sub ? `<p>${esc(s.sub)}</p>` : ''}${s.end ? `<div class="orE"><button type="button" data-cp="sp">📜 Le scénario</button><button type="button" data-cp="all">📋 Tout copier</button></div>` : ''}</div>${s.end ? '' : '<small class="orH">touche pour continuer</small>'}`; return; }
      if (s.k % 3 === 0) shown.length = 0; shown.push(s.part);   // never more than 3 sentences at once (CLAUDE.md: never a lot of words at once)
      const faces = (s.slide.who || []).filter((p) => K.img(p)).slice(0, 3).map((p) => `<img src="${K.img(p)}" alt="">`).join('');
      el.innerHTML = `<button type="button" class="orX" data-x="1">✕</button><div class="orS">${faces ? `<div class="orF">${faces}</div>` : ''}${shown.map((p, k) => `<p class="${k === shown.length - 1 ? 'new' : ''}">${esc(p)}</p>`).join('')}</div>`; };
    const close = () => { el.remove(); stEl = null; removeEventListener('keydown', key); if (opt.onClose) opt.onClose(); };
    const next = () => { if (i + 1 >= steps.length) return close(); i++; draw(); }, prev = () => { if (i <= 0) return; i--; while (i > 0 && !steps[i].title && steps[i].k !== 0) i--; draw(); };
    const key = (e) => { if (e.key === 'Escape') close(); else if (['ArrowRight', 'Enter', ' '].includes(e.key)) { e.preventDefault(); next(); } else if (e.key === 'ArrowLeft') prev(); };
    el.onclick = (e) => { if (e.target.closest('[data-x]')) return close(); const cp = e.target.closest('[data-cp]'); if (cp) { if (cp.dataset.cp === 'all') copyText(allText(opt), cp); else showScreenplay(opt); return; } if (steps[i] && steps[i].end) return; next(); }; addEventListener('keydown', key);
    next(); return { close, next };
  }
  // 📖 the whole story to read (no key needed): episode 1 too, as slides
  const read = (opt) => slides(1, opt);
  let styled = false;
  function style() { if (styled) return; styled = true; const st = document.createElement('style');
    st.textContent = `#orSl{position:fixed;inset:0;z-index:9500;background:#000;color:#f5f5f7;display:flex;align-items:center;justify-content:center;font:20px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent}
#orSl .orX{position:absolute;top:14px;right:14px;background:none;border:0;color:#8e8e93;font-size:26px;cursor:pointer;padding:8px}
#orSl .orT{text-align:center;animation:orIn .6s ease}#orSl h1{margin:0;font-size:44px;letter-spacing:-.02em;font-weight:800}#orSl .orT p{margin:.4em 0 0;color:#8e8e93;font-size:18px}
#orSl .orH{position:absolute;bottom:28px;color:#48484a;font-size:14px}
#orSl .orE{display:flex;flex-direction:column;gap:12px;margin-top:34px}#orSl .orE button,#orTx .orB button{font:inherit;font-size:18px;font-weight:700;padding:14px 20px;border-radius:14px;border:0;background:#1c1c1e;color:#f5f5f7;cursor:pointer}
#orTx{position:fixed;inset:0;z-index:9600;background:#000;color:#f5f5f7;display:flex;flex-direction:column;font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
#orTx .orB{display:flex;flex-wrap:wrap;gap:10px;padding:14px 16px;border-bottom:1px solid #1c1c1e}#orTx .orB .go{background:#0a84ff;color:#fff}#orTx .orB small{color:#ff9f0a;align-self:center;font-size:14px}
#orTx pre{flex:1;margin:0;overflow:auto;padding:18px 16px 60px;white-space:pre-wrap;font:15px/1.55 "Courier New",Courier,monospace;user-select:text}
#orSl .orS{max-width:640px;width:100%;padding:0 22px;box-sizing:border-box}#orSl .orS p{margin:0 0 .7em;font-size:24px;color:#aeaeb2}#orSl .orS p.new{color:#f5f5f7;animation:orIn .45s ease}
#orSl .orF{display:flex;gap:10px;margin-bottom:18px}#orSl .orF img{width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:50% 12%;background:#1c1c1e}
@keyframes orIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`;
    document.head.appendChild(st); }

  // ==== 📜 THE SCREENPLAY and 📋 EVERYTHING (25/11, Justin: « when the story ends, an option to copy everything, input to
  // result, as text » / « a screenplay version, no visuals: in a flat world episode 1 does not really make sense »).
  // screenplay(): the same story in a screenwriter's layout (who speaks, to whom, what we see). Episode 1 = the lines Claude
  // wrote, when written; the other episodes = the engine's beats, a sentence per line. It is the skeleton, not a written
  // screenplay: screenplayPrompt() asks Claude for the real one, from the whole bible (who knows what, beat by beat) ====
  const NAMES = () => K.people().map((p) => K.nm(p)).sort((a, b) => b.length - a.length);
  // a beat → lines: « Ruby, devant tous : « … » Ruby regarde Justin. » → RUBY (devant tous) / … / Ruby regarde Justin.
  function spBeat(fr) { const out = [], names = NAMES();
    for (const se of sentences(fr)) { const q = se.match(/^(.*?)\s*:?\s*«\s*(.+?)\s*»\s*(.*)$/);
      if (!q) { out.push(se); continue; } const [, pre0, line, rest] = q, pre = pre0.replace(/\s*:\s*$/, '').trim();
      const who = names.find((n) => pre === n || pre.startsWith(`${n},`) || pre.startsWith(`${n} `));
      if (!who) { if (pre) out.push(`${pre} :`); out.push(`« ${line} »`); if (rest) out.push(rest); continue; }
      const after0 = pre.slice(who.length).replace(/^,\s*/, '').trim(), sp = after0.match(/^(?:l’avoue|le dit|lui dit|murmure|souffle|dit)\s+(à .+)$/), after = sp ? sp[1] : after0, isTalk = !after || !!sp || /^(à |devant|tout bas|seul|les yeux|à part)/.test(after);
      if (!isTalk) out.push(`${pre}.`.replace(/\.\.$/, '.'));
      out.push('', `            ${who.toUpperCase()}${isTalk && after ? ` (${after})` : ''}`, `      ${line}`, ''); if (rest) out.push(rest); }
    return out; }
  function screenplay() { const v = movie(), S = K.S, out = [], place = `INT. ${String(S.decor || 'taverne').toUpperCase()} — NUIT`, o = v.opening;
    out.push('SOUS MON TOIT', o ? `${o.q}` : '', o ? `${o.n} · ${v.eps.length} épisodes` : '', '', 'PERSONNAGES');
    for (const p of K.people()) { const fl = S.flaw && S.flaw[p] && K.F[S.flaw[p]] ? ` Faille : ${K.F[S.flaw[p]].n.toLowerCase()}.` : '', wd = K.storyAt(1).D.filter((d) => d.who === p && d.s >= 2 && !d.from).map((d) => K.dSay(d))[0];
      out.push(`${K.nm(p).toUpperCase()}. ${K.pillarsOf(p).map((x, k) => (k ? K.low1(K.P[x].n) : K.P[x].n)).join(', ')}.${fl}${wd ? ` ${up(wd)}.` : ''}`); }
    const ep1 = K.linesOf(0);
    for (const E of v.eps) { out.push('', '', `ÉPISODE ${E.n}${E.act > 1 && E === v.eps.find((x) => x.act === E.act) ? ` · ACTE ${E.act}` : ''}`, '');
      if (E.n === 1 && ep1 && ep1.length) { out.push(place, ''); for (const l of ep1) { const m = l.match(/^(\s*)(.+?) : (.*)$/); if (!m) { out.push(l); continue; } if (m[2] === 'Narration') out.push(m[3]); else out.push(`            ${m[2].toUpperCase()}`, `      ${m[3]}`, ''); } continue; }
      if (E.n === 1) out.push('(Épisode 1 pas encore écrit : voici ce qui doit s’y passer.)', '');
      const sl = new Map(E.slides.map((x) => [x.id, x]));
      for (const sc of E.scenes || []) { out.push(sc.heading, ''); for (const m of sc.M) if (sl.get(m.id)) out.push(...spBeat(sl.get(m.id).fr), ''); } }
    out.push('', 'FIN'); return out.join('\n').replace(/\n{3,}/g, '\n\n'); }
  // what the idea became (the base), as text
  function base() { const S = K.S, D = K.storyAt(1).D, L = [];
    L.push(`Lieu : ${S.decor || 'taverne'}${K.ACTS() > 1 ? ` · ${K.ACTS()} actes` : ''}`);
    L.push(`Personnages : ${K.people().map((p) => `${K.nm(p)} (${K.pillarsOf(p).map((x) => K.P[x].n).join(', ')}${S.flaw && S.flaw[p] && K.F[S.flaw[p]] ? ` ; faille : ${K.F[S.flaw[p]].n.toLowerCase()}` : ''})`).join(' · ')}`);
    L.push(`Ce qu’ils veulent : ${D.filter((d) => d.src === 'choisi').map((d) => up(K.dSay(d))).join(' · ') || '—'}`);
    L.push(`Liens : ${Object.entries(S.rel || {}).map(([k, r]) => `${k.split('|').map((p) => K.nm(p)).join(' & ')} : ${r}`).join(' · ') || '—'}`);
    L.push(`Secrets, passés, objets : ${K.infos().map((i) => `${up(K.infoFr(i))}${(i.a || 1) > 1 ? ' (acte 2)' : ''}`).join(' · ') || '—'}`);
    const said = (e) => { const x = K.nm(e.x), v = e.v ? K.nm(e.v) : 'quelqu’un'; return ({ murder: `${x} tue ${v}`, theft: `${x} vole ${e.v ? v : 'dans le coffre'}`, betray: `${x} vend ${v}`, arrive: `${x} arrive`, gone: `${x} disparaît`, threat: `${x} menace ${v}`, revenge: `${x} veut faire payer ${v}` })[e.k] || (K.evFr ? K.evFr(e) : e.k); };
    L.push(`Ce qui arrive : ${K.evs().map((e) => `${up(said(e))}${e.h ? ' (caché)' : ''}${(e.a || 1) > 1 ? ' (acte 2)' : ''}`).join(' · ') || '—'}`);
    return L.join('\n'); }
  // 📋 everything, input → result: the idea, the base, the engine's whole story, episode 1 as written, the screenplay
  function allText(opt = {}) { const ep1 = K.linesOf(0);
    return [`SOUS MON TOIT · tout, de l’idée au résultat (${new Date().toLocaleString('fr-FR')})`, '',
      '== 1. L’IDÉE ==', opt.idea || (window.HISTOIRE && HISTOIRE.idea && HISTOIRE.idea()) || '(pas d’idée tapée : la base vient du 🎲 ou de Créer)', '',
      '== 2. CE QUE L’IDÉE EST DEVENUE (la base) ==', base(), '',
      '== 3. L’HISTOIRE, PAR LE MOTEUR (tout : les ingrédients, la vérité, les forces, le choix, chaque moment, les épisodes) ==', text(), '',
      '== 4. L’ÉPISODE 1, ÉCRIT PAR CLAUDE ==', ep1 && ep1.length ? ep1.join('\n') : '(pas encore écrit)', '',
      '== 5. LE SCÉNARIO (la mise en page de tout ça) ==', screenplay()].join('\n'); }
  // the real screenplay, by Claude, from the whole bible: every beat in order, who knows what at each point, nothing added
  function screenplayPrompt() { const v = movie(), S = K.S, o = v.opening, ep1 = K.linesOf(0), D = K.storyAt(1).D;
    const chars = K.people().map((p) => `- ${K.nm(p)}: ${K.pillarsOf(p).map((x) => K.P[x].n).join(', ')}; ${K.traitTxt(K.traitsOf(p, 1)).map((x) => x[1]).join(', ') || 'nothing extreme'}${S.flaw && S.flaw[p] && K.F[S.flaw[p]] ? `; flaw: ${K.F[S.flaw[p]].n}` : ''}. Voice: ${K.voiceOf(p, p === J ? undefined : 1) || '-'}. Wants: ${D.filter((d) => d.who === p && d.s >= 2).map((d) => K.dSay(d)).join(' / ') || '-'}.`);
    const secrets = v.acts.flatMap((A) => A.facts.filter((f) => f.hidden).map((f) => { const at = v.W.M.filter((m) => m.fact === f.id && ['deed', 'reveal', 'notice', 'answerJ', 'glimpse', 'expose', 'seed'].includes(m.kind)).map((m) => `#${m.id} (${m.kind === 'deed' || m.kind === 'glimpse' || m.kind === 'seed' ? 'the viewer sees it' : 'it comes out'})`);
      return `- ${f.truth}. Known at the start only by: ${(f.knowers || [f.by]).filter(Boolean).map((p) => K.nm(p)).join(', ')}.${at.length ? ` Beats: ${at.join(', ')}.` : ''} Before its beat, nobody else says it, asks it straight or guesses it.`; }));
    const nm2 = (p) => (p ? K.nm(p) : '—'), card = (sc) => [`  SCENE ${sc.n} — ${sc.heading} — present: ${sc.who.map(nm2).join(', ')}`,
      `    carried by ${nm2(sc.holder)}${sc.want ? ` (wants: ${sc.want})` : ''}${sc.opp ? `, against ${nm2(sc.opp)}` : ''}`,
      sc.choice ? `    THE CHOICE, held by ${nm2(sc.choice.who)}: « ${sc.choice.a} » or « ${sc.choice.b} » → chosen: « ${sc.choice.a} ». The dialogue is the debate over this choice.` : '    (no choice in the beats: make one person hold a decision here, between two bad options, without changing what happens)',
      `    the object the debate turns around: ${sc.object}${sc.objOwn ? '' : ' (a prop of the place: it must not become a new clue)'}`, sc.q ? `    the scene's question: ${sc.q}` : '',
      sc.irony ? `    the viewer knows, someone here does not: ${sc.irony}` : '',
      ...sc.M.map((m) => `    #${m.id} ${nm2(m.actor)}${m.desire ? ` (wants: ${m.desire})` : ''} → ${m.fr}${m.also.length ? ` [also: ${m.also.map((x) => x.fr).join(' ')}]` : ''}`),
      `    state after: ${sc.change.concat(sc.knows).slice(0, 3).join(' ; ') || '-'} · it ends on: ${[sc.qNext, ...sc.qOut].filter(Boolean).slice(0, 2).join(' · ') || '-'}`].filter(Boolean).join('\n');
    const eps = v.eps.map((E) => [`EPISODE ${E.n}${E.act > 1 ? ` (act ${E.act})` : ''}${E.n === 1 && ep1 && ep1.length ? ' — already written, keep these lines as they are:' : ''}`,
      ...(E.n === 1 && ep1 && ep1.length ? ep1.map((l) => `  ${l}`) : (E.scenes || []).map(card)),
      `  At its end the viewer wonders: ${(E.aud.wonders || []).join(' · ') || '—'}`].join('\n'));
    return `You are the screenwriter of a short TV series, in French. Write the WHOLE series as a screenplay from the bible below. The story is decided: you only make it play as scenes.

THE QUESTION THE VIEWER CARRIES: ${o ? o.q : '-'}
PLACE: ${S.decor || 'taverne'}, one night${K.ACTS() > 1 ? ', then the next' : ''}.

CHARACTERS (only these speak; anyone else is talked about, never seen):
${chars.join('\n')}

WHAT IS TRUE, AND WHO KNOWS IT:
${secrets.join('\n') || '- nothing hidden'}

THE EPISODES, SCENE BY SCENE (a scene = one place, one time; #n = a beat; each beat must happen on screen, in this order):
${eps.join('\n\n')}

RULES:
- Every beat happens on screen, in its order, clearly enough that a viewer who never saw the bible understands WHO does WHAT and WHY. A motive is shown before the act it explains.
- Nothing important is added: no new subplot, no new character with lines, no new secret. What a beat does not say, you may show with a gesture, an object, a look.
- Knowledge: a character only says what they know at that point. A secret stays unsaid until its beat (see above). The viewer may know more than the characters: play on it.
- Concrete: say things by their name (the stained scarf, the dawn boat, the courtyard door), never « something », « a problem », « the thing ».
- A scene is a debate over its CHOICE: every line pushes option A or option B; the one who holds the choice may say little while the others try to move them; the scene ends on the choice made and a new state (nothing ends where it started).
- Anchor the debate to the scene's object (the purse on the counter, the bag under the stairs): people fight over the thing instead of naming the feeling.
- People talk around what they want (subtext, « 2 + 2 », never « 4 »: never « I'm angry », « I'm scared »); information goes through who they are (their habits, their fear), never raw; no question asked only so that someone can explain. Short lines: never more than 2 short sentences in a row by the same person.
- Every scene enters late and leaves early, and ends on a question the viewer wants answered.
- Episode 1 runs about 2 minutes (it is written already if given above: keep it). Every other episode: 1 or 2 short scenes, about 1 minute, ending on its last beat.
- Format, plain text: ÉPISODE N, then a scene heading (INT. TAVERNE — NUIT, or the courtyard, the stable…), action lines in the present tense, then NAME in capitals on its own line, (a short note) if needed, the line under it.
Reply with the screenplay only.`; }
  // a text to read or copy (the screenplay, everything)
  function copyText(t, btn) { const done = (ok) => { if (btn) { const was = btn.textContent; btn.textContent = ok ? '✓ Copié' : 'Copie impossible : sélectionne le texte'; setTimeout(() => { btn.textContent = was; }, 1800); } };
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => done(true), () => done(false)); }
  function showText(title, t, buttons = []) { style(); const old = document.getElementById('orTx'); if (old) old.remove(); const el = document.createElement('div'); el.id = 'orTx';
    el.innerHTML = `<div class="orB"><button type="button" data-t="x">✕</button><button type="button" class="go" data-t="cp">📋 Copier</button>${buttons.map((b, k) => `<button type="button" data-t="${k}">${esc(b.n)}</button>`).join('')}<small></small></div><pre></pre>`;
    el.querySelector('pre').textContent = t; document.body.appendChild(el);
    el.onclick = (e) => { const b = e.target.closest('[data-t]'); if (!b) return; const k = b.dataset.t; if (k === 'x') return el.remove(); if (k === 'cp') return copyText(el.querySelector('pre').textContent, b); const B = buttons[+k]; if (B) B.go(el, (msg) => { el.querySelector('small').textContent = msg || ''; }, (t2) => { el.querySelector('pre').textContent = t2; }); };
    return el; }
  // 📜 the screenplay view; « ✍️ Claude l'écrit pour de vrai »: with the key (opt.key) Claude writes it, else its prompt is copied
  function showScreenplay(opt = {}) { const key = opt.key || (() => { try { return localStorage.getItem('smt-key') || ''; } catch { return ''; } })();
    return showText('Le scénario', screenplay(), [{ n: key ? '✍️ Claude l’écrit pour de vrai' : '✍️ Copier le prompt (Claude l’écrit pour de vrai)', go: async (el, say, set) => {
      if (!key) { copyText(screenplayPrompt()); return say('Prompt copié : colle-le dans Claude, il écrit le scénario complet.'); }
      say('⚡ Claude écrit le scénario… (une minute)'); try { const t = await writeScreenplay(key); set(t); say('✓ Écrit par Claude.'); } catch (err) { say(`Ça n’a pas marché : ${err.message || err}`); } } }]); }
  async function writeScreenplay(key) { const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: (window.GEN && GEN.MODEL) || 'claude-haiku-4-5', max_tokens: 8000, messages: [{ role: 'user', content: screenplayPrompt() }] }) });
    const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(r.status === 401 ? 'Clé refusée (401).' : (d.error && d.error.message) || `Erreur ${r.status}.`);
    return (d.content || []).map((b) => b.text || '').join('').trim(); }

  // what Créer v2 shows: the recipe, the question, how many episodes
  function summary() { const v = movie(), o = v.opening; return { recipe: o ? o.n : '', engage: o ? o.engage : '', q: o ? o.q : '', eps: v.eps.length, open: v.eps[0] ? v.eps[0].M.length : 0 }; }
  return { movie, text, openingPlan, epPrompt, slides, read, summary, pickOf, RECIPES, CIRCLE, sceneStats, screenplay, screenplayPrompt, base, allText, showScreenplay, showText, copyText };
})();
