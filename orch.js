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
      seen: (c) => `${c.w} a vu ${c.item}, caché dans ${c.spot}.`, gone: (c) => `${up(c.item)} a disparu ${deN(c.spot)}. Seuls ${c.x} et ${c.o} y sont allés.`,
      lie: (c) => `${c.x} dit avoir passé la nuit au port.`, slip: (c) => (TRACE.theft.money(c) ? `${c.x} paie une tournée à toute la salle. Avec une pièce ${deN(c.thing.replace(/^(sa|son|ses) /, 'la '))}.` : c.gift ? `${c.gift} porte ${c.thing}. Un cadeau ${deN(c.x)}.` : `On retrouve ${c.thing} chez ${c.x}.`), lieOut: (c) => `Au port, personne n’a vu ${c.x} cette nuit-là.` },
    betray: { item: 'une lettre sans signature', itemD: 'la lettre', open: (c) => `On a vendu ${c.v} : quelqu’un a donné l’heure et le lieu.`,
      t1: (c) => `${c.w} fait le compte : l’heure n’était connue que d’ici.`, t1a: 'l’heure n’était connue que d’ici',
      seen: (c) => `${c.w} a trouvé une lettre sans signature, d’une écriture qu’on connaît.`, gone: (c) => `La lettre a brûlé dans l’âtre. Seuls ${c.x} et ${c.o} étaient près du feu.`,
      lie: (c) => `${c.x} jure n’avoir parlé à personne de la semaine.`, slip: (c) => `${c.x} connaît un mot de la lettre. Personne ne l’avait lue à voix haute.`, lieOut: (c) => `On a vu ${c.x} sortir parler à quelqu’un, la veille.` },
  };
  // the seeds of a secret (2) and its proof, by info: x, y = the people of the info
  const SEED = {
    sibling: [(x, y) => `${x} et ${y} ont le même geste quand ils mentent.`, (x, y) => `${x} connaît le nom de la mère ${deN(y)}.`, (x, y) => `Un médaillon : ${x} et ${y}, enfants, côte à côte.`],
    parent: [(x, y) => `${x} regarde ${y} comme on regarde quelqu’un qu’on a perdu.`, (x, y) => `${x} connaît une cicatrice que ${y} n’a montrée à personne.`, (x, y) => `Une vieille lettre : ${x} y parle ${deN(y)}, enfant.`],
    betray: [(x, y) => `${x} change de sujet dès qu’on parle du passé ${deN(y)}.`, (x, y) => `${x} sait à quelle heure ${y} a été trahi. Personne ne l’a jamais dit.`, (x, y) => `Une vieille lettre de la main ${deN(x)} : c’est ${x} qui a vendu ${y}.`],
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
    menteur: { fail: (c) => `Justin ment pour s’en sortir. ${c.c} le prend sur le fait.`, worst: (c) => `Justin ment encore. ${c.b} ne le croit plus.`, over: 'Pour une fois, Justin dit la vérité. Toute.', easy: ['hide', 'respect'] },
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
    respect: [(c) => `Justin répond enfin à ${c.o}, devant tous.`, (c) => `Justin met ${c.o} au défi, devant toute la salle.`, () => 'Justin refuse de baisser les yeux.'],
    oust: [(c) => `Justin pousse ${c.t} vers la sortie.`, (c) => `Justin monte la salle contre ${c.t}.`, (c) => `Justin pose un ultimatum à ${c.t}.`],
    hide: [() => 'Justin détourne la conversation.', () => 'Justin fait disparaître ce qui pourrait le trahir.', () => 'Justin ment, droit dans les yeux.'],
  };
  // a desire that weighs more, as someone's action (the one it is about acts: t; w = Justin)
  const RAISE = {
    love: [(c) => `${c.t} confie à Justin une chose jamais dite à personne.`, (c) => `${c.t} prend la main de Justin, devant tous.`, (c) => `${c.t} propose à Justin de tout laisser, maintenant.`],
    protect: [(c) => `${c.t} avoue à Justin qu’il n’y a plus que lui.`, (c) => `${c.t} prend un risque en comptant sur Justin.`, (c) => `${c.t} n’a plus qu’une nuit, et le sait.`],
    justice: [(c) => `${c.w2} supplie Justin de ne pas laisser tomber.`, (c) => `Justin tient presque de quoi faire tomber ${c.t}.`, (c) => `Il ne manque qu’une preuve contre ${c.t}.`],
    alive: [(c) => `${up(c.f)} sait où dort Justin.`, () => 'On a forcé la porte de la chambre de Justin.', () => 'Justin n’a plus nulle part où se cacher.'],
    free: [() => 'Le dernier bateau part à l’aube.', () => 'Il reste une seule place sur le bateau.', () => 'C’est partir maintenant ou jamais.'],
    respect: [() => 'Toute la salle a entendu.', () => 'Plus personne ne serre la main de Justin.', () => 'Justin n’a plus qu’une chance de laver son nom.'],
    find: [(c) => `Quelqu’un a vu ${c.t} : une direction.`, (c) => `Un mot ${deN(c.t)}, de sa main : « Viens. »`, (c) => `${c.t} est tout près. C’est maintenant.`],
    win: [() => 'Le patron cherche quelqu’un, ce soir.', () => 'Justin a une chance, une seule.', () => 'Maintenant ou jamais.'],
    oust: [(c) => `${c.t} prend toute la place.`, (c) => `${c.t} rit de Justin devant tous.`, (c) => `${c.t} s’installe à sa place.`],
    hide: [() => 'Quelqu’un s’approche du secret de Justin.', () => 'Justin doit mentir une fois de plus.', () => 'Une question de plus, et tout tombe.'],
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
      if (jd && od && K.live(od.who) && !facts.some((f) => f.kind === 'crime' && f.hidden && f.by === od.who)) add({ who: od.who, kind: 'ouster', d: D.find((d) => d.who === od.who && d.k === 'oust' && d.t === J) || { id: `${od.who}:oust:${J}`, who: od.who, k: 'oust', t: J, s: 2 }, vs: jd, why: `${K.nm(od.who)} ne se cache pas` }); }
    // a protector of someone Justin goes after (🛡️ where Justin is the one he protects from): his opposition too
    for (const f of facts.filter((x) => x.kind === 'crime' && x.hidden && K.live(x.by) && x.by !== J)) { add({ who: f.by, kind: 'culprit', d: D.find((d) => d.who === f.by && d.k === 'hide') || null, vs: D.find((d) => d.who === J && d.k === 'justice') || null, fact: f, why: f.q }); }
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
    let won;
    if (ez(A) !== ez(B)) won = ez(A) ? B : A;   // he overcomes his flaw: the side it pushed him away from
    else if (['love', 'protect'].includes(A.k) && ['love', 'protect'].includes(B.k) && A.k !== B.k) won = (tr.loyaute >= tr.audace) === (A.k === 'protect') ? A : B;
    else if ([A.k, B.k].includes('justice')) won = A.k === 'justice' ? A : B;
    else won = A;
    const lost = won === A ? B : A;
    const why = ez(lost) ? (FLAW[fl] || FLAW.none).over : won.k === 'protect' ? 'Il tient à ses liens plus qu’à ce qu’il veut.' : won.k === 'justice' ? 'La vérité, même si elle coûte.' : 'Il suit son cœur.';
    return { won, lost, why };
  }
  // the character decides the climax (no player): written as the climax pick, so act 2 is built on it (actState reads it);
  // a tap on the climax in the old Créer (S.picked.pick) stays the author's own
  function syncPick(X, dec) {
    const S = K.S; if (!X[0] || !X[1] || !dec.won) return; const idx = dec.won.id === X[0].id ? 0 : 1; S.picked = S.picked || {};
    if (S.picked.pick == null || S.pickAuto) { if (S.picked.pick !== idx || !S.pickAuto) { S.picked.pick = idx; S.pickAuto = 1; K.save(); } } }

  // ==== E · THE AUDIENCE'S JOURNEY : how each secret is met. mystery = the audience asks (a question, a theory it is pushed
  // toward, clues, the answer); twist = the audience does not know there is a question (seeds, then it turns everything);
  // irony = the audience knows, someone on screen does not (we fear the moment they learn). Justin's own secret is irony;
  // a hidden crime, a disappearance, a box nobody opens are mysteries; a motive comes out with its crime; the rest are twists ====
  const modeOf = (f) => (f.kind === 'crime' ? (f.hidden ? 'mystery' : 'public') : f.kind === 'gone' || f.kind === 'object' ? 'mystery' : f.by === J ? 'irony' : f.motive ? 'motive' : 'twist');

  // ==== THE OPENING : which recipe the story supports (scored on what it has), its material, its spine ====
  const RECIPES = {
    mystery: { n: '🔎 Mystère', engage: 'la curiosité : il faut savoir', need: 'un fait concret inexpliqué, un indice disponible, une question qui vaut d’être suivie, une réponse qu’on peut retenir',
      spine: ['want', 'care', 'event', 'matter', 'theory', 'clue', 'turn'] },
    dilemma: { n: '⚖️ Dilemme', engage: 'la tension : il ne pourra pas tout garder', need: 'deux désirs incompatibles, des liens qui comptent, des conséquences qu’on peut poser tôt',
      spine: ['want', 'care', 'event', 'pressure', 'raiseA', 'raiseB', 'turn'] },
    opportunity: { n: '🚪 Occasion', engage: 'l’espoir et la peur : va-t-il l’avoir', need: 'un objectif désirable, une occasion immédiate, un vrai obstacle',
      spine: ['want', 'chance', 'obstacle', 'attempt', 'fail', 'raise', 'turn'] },
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
    const order = ['mystery', 'dilemma', 'opportunity'], forced = K.S.open && RECIPES[K.S.open] && sc[K.S.open] > 0 ? K.S.open : null;
    const r = forced || order.reduce((b, k) => (sc[k] > sc[b] ? k : b), 'mystery');
    const o = { r, ...RECIPES[r], scores: sc, why, forced: !!forced };
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
    const W = { M: [], n: 0, last: null, out: new Map(), knows: new Map(), lvl: {}, acts: [], hap: new Set(), deadAt: new Map() };
    const live = (p) => p && (p === J || (K.live(p) && !W.out.has(p)));
    for (let a = 1; a <= A; a++) {
      const st = K.storyAt(a), { D, X } = st, T = K.truth(D), EV = K.evs().filter((e) => K.EK[e.k] && K.actOf(e) === a && K.live(e.x));
      if (a === 2) { const AS = K.actState(); for (const t of AS.kill) { W.out.set(t, 'dead'); W.deadAt.set(t, 0); } for (const t of AS.gone) W.out.set(t, 'gone'); }
      W.lvl = {}; W.exposed = null; W.named = null; W.narrow = null; W.seer = null; W.cleared = null;   // each act climbs from the bottom again
      const facts = factsOf(a, D, T, EV, G), forces = forcesOf(a, st, facts).filter((f) => f.who === J || f.who === 'clock' || f.who === 'f:A' || live(f.who));
      const foes0 = K.evs().filter((e) => ['threat', 'revenge'].includes(e.k) && K.actOf(e) === a).map((e) => e.x);
      let dec = decide(X[0], X[1], a, factsOf(a, D, T, EV, G), foes0); const hand = a === 1 && K.S.picked && K.S.picked.pick != null && !K.S.pickAuto;
      // a climax the author picked by hand (old Créer) stays theirs: act 2 is built on it
      if (hand && X[0] && X[1]) { const w = X[K.S.picked.pick === 1 ? 1 : 0]; dec = { won: w, lost: w === X[0] ? X[1] : X[0], why: dec.won === w ? dec.why : 'C’est ce que l’auteur a choisi.' }; }
      if (a === 1) syncPick(X, dec);
      const price = dec.lost ? K.fateFor(dec.lost, a) : null, dest = { X, dec, price, forcer: K.forcer(a), pre: [] };
      for (const f of facts) f.mode = modeOf(f);
      const op = a === 1 ? openingOf(st, facts, forces, dest) : null;
      const ACT = { a, st, facts, forces, dest, op, from: W.M.length };
      W.acts.push(ACT);
      // ---- the moment maker ----
      const put = (o) => { const m = { act: a, link: 'donc', world: [], aud: [], jobs: [], who: [], next: '', plot: '', also: [], ...o }; m.id = ++W.n;
        if (m.cause == null) m.cause = W.last ? W.last.id : null; else if (m.cause === 0) m.cause = null; if (!m.slide) m.slide = m.fr; m.who = [...new Set([m.actor, m.target, ...(m.who || [])].filter((p) => p && p !== 'clock' && p !== 'f:A' && !String(p).startsWith('f:')))];
        W.M.push(m); W.last = m; return m; };
      const D2 = (who, k, t) => D.find((d) => d.who === who && d.k === k && (t === undefined || d.t === t)) || null;
      const want = (who) => { const d = D.filter((x) => x.who === who && !x.dead && !x.late && x.s >= 2).sort((x, y) => y.s - x.s)[0]; return d ? K.dSay(d) : `${K.nm(who)} veut s’en sortir`; };
      const cast = () => K.S.cast.filter(live), J_ = 'Justin';
      const [XA, XB] = X, won = dec.won, lost = dec.lost;
      const lineOf = (d) => (d ? `${K.DK[d.k].e} ${K.dSay(d)}` : '');
      const lvlUp = (d) => { if (!d) return 0; W.lvl[d.id] = (W.lvl[d.id] || 0) + 1; return W.lvl[d.id]; };
      // who Justin confides in: the one who protects him or whom he protects, never his rival
      const conf = (d) => { const foes = new Set(forces.map((f) => f.who)), no = (p) => !foes.has(p) && !(d && d.t === p); return cast().find((p) => no(p) && (D2(p, 'protect', J) || D2(J, 'protect', p))) || cast().find((p) => no(p) && !(XA && XA.t === p)) || cast().find((p) => !(d && d.t === p)) || cast()[0]; };
      const flawF = forces.find((f) => f.kind === 'inner'), FL = FLAW[flawF ? flawF.flaw : 'none'];
      const myst = facts.find((f) => f.kind === 'crime' && f.hidden && live(f.by)) || facts.find((f) => f.kind === 'gone');
      const mf = () => forces.find((f) => f.who !== J && f.kind !== 'clock' && !(f.kind === 'culprit' && f.fact && !W.hap.has(f.fact.ev))) || null;
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
        if (f && f.kind === 'crime') { const disc = f.vid && e.k !== 'murder' ? f.vid : f.seek && live(f.seek) ? f.seek : J, Tt = TRACE[e.k];
          if (e.k === 'murder' && f.vid) { W.out.set(f.vid, 'dead'); W.deadAt.set(f.vid, W.n + 1); } W.hap.add(e);
          return put({ seg, circle, kind: 'event', actor: disc, desire: f.vid && disc !== f.vid ? `${K.nm(disc)} tenait à ${f.v}` : want(disc), action: 'découvre', link: 'soudain', ev: e, fact: f.id,
            fr: f.hidden ? Tt.open(c) : `${Tt.open(c)} C’est ${K.nm(f.by)}, et ${K.nm(f.by)} ne s’en cache pas.`, world: [e.k === 'murder' ? `${f.v} est mort` : e.k === 'theft' ? `${f.thing} a disparu` : `${f.v} a été vendu`], aud: f.hidden ? [{ k: 'q', ref: f.id, fr: f.q }] : [{ k: 'learn', fr: f.truth }],
            plot: `${f.e} le crime : ouvert`, next: `${K.nm(f.by)} devra se cacher ; quelqu’un voudra savoir`, jobs: ['info', 'force'], tech: 'Demande qui révèle', goal: 'info' }); }
        if (e.k === 'gone') { W.out.set(e.x, 'gone'); W.hap.add(e); return put({ seg, circle, kind: 'event', actor: e.x, desire: want(e.x), action: 'disparaît', link: 'soudain', ev: e, fact: f && f.id,
          fr: `${K.nm(e.x)} sort « deux minutes » et ne revient pas. Ses affaires sont encore là.`, world: [`${K.nm(e.x)} n’est plus là`], aud: [{ k: 'q', ref: f && f.id, fr: f ? f.q : `Où est ${K.nm(e.x)} ?` }],
          plot: '👻 la disparition : ouverte', next: 'ceux qui tiennent à lui le chercheront', jobs: ['info', 'force'], tech: 'Sort et ne revient pas', goal: 'curiosity' }); }
        if (e.k === 'arrive') { W.hap.add(e); const d = D.find((x) => x.who === e.x && x.s >= 2 && x.t); return put({ seg, circle, kind: 'event', actor: e.x, desire: want(e.x), action: 'arrive', link: 'soudain', ev: e,
          fr: `${K.nm(e.x)} entre. La salle se tait${d ? ` ; ${K.nm(e.x)} ne regarde ${que(K.nm(d.t))}` : ''}.`, world: [`${K.nm(e.x)} est là`], aud: [{ k: 'q', ref: `arr${e.x}`, fr: `Que vient faire ${K.nm(e.x)} ?` }],
          plot: `⚡ l’arrivée ${deN(K.nm(e.x))}`, next: d ? `${K.nm(e.x)} va vouloir ${K.nm(d.t)}` : 'l’équilibre change', jobs: ['force'], tech: 'Entrée qui fait taire', goal: 'char' }); }
        if (e.k === 'threat' || e.k === 'revenge') { W.hap.add(e); const v = e.v && live(e.v) ? e.v : J, mo = T.ev.get(e), dl = pick(`dl${e.x}`, ['Avant l’aube', 'Avant la fermeture', 'Au dernier bateau']);
          return put({ seg, circle, kind: 'event', actor: e.x, desire: mo ? mo.fr : want(e.x), action: e.k === 'threat' ? 'menace' : 'veut faire payer', target: v, link: 'soudain', ev: e,
            fr: e.k === 'threat' ? `${K.nm(e.x)} plante son couteau dans la table, devant ${K.nm(v)} : « ${dl}, tu paies. »` : `${K.nm(e.x)}, à ${K.nm(v)}, devant tous : « Tu vas me le payer. »`,
            world: [`${K.nm(v)} est menacé`], aud: [{ k: 'fear', fr: `peur pour ${K.nm(v)}` }, { k: 'q', ref: `thr${e.x}`, fr: `${K.nm(e.x)} ira-t-il jusqu’au bout ?` }], plot: `☠️ la menace contre ${K.nm(v)}`, next: `ceux qui tiennent à ${K.nm(v)} vont s’interposer`, jobs: ['force', 'harder'], tech: 'Menace : si tu X, je Y', goal: 'stakes', dl }); }
        return null; };
      // the crime matters to someone present: they commit
      g.matter = (f, seg = 'open') => { if (!f || !live(f.seek)) return null; const w = f.seek, R = K.graph().fig;
        if (f.needer && live(f.needer) && R) return put({ seg, circle: 2, kind: 'matter', actor: f.needer, desire: up(R.need(K.nm(f.needer))), action: 'comprend ce que ça lui coûte', fact: f.id,
          fr: `${K.nm(f.needer)} : « ${up(R.lost)}. »`, world: [`${K.nm(f.needer)} risque de tout perdre`], aud: [{ k: 'care', fr: `la réponse compte pour ${K.nm(f.needer)}` }], plot: `${f.e} la question compte`, next: `${K.nm(f.needer)} a besoin de la vérité, vite`, jobs: ['want', 'harder'], tech: 'Mention consequences', goal: 'stakes' });
        const say = f.kind === 'crime' ? (f.vid || e2v(f) ? `« Je trouverai qui a fait ça. »` : '« Je trouverai qui. »') : `« Je retrouverai ${K.nm(f.by)}. »`;
        if (f.kind === 'crime' && f.ev.k !== 'murder' && f.vid && live(f.vid) && f.vid !== w) return put({ seg, circle: 2, kind: 'matter', actor: w, desire: lineOf(D2(w, 'justice')) || `${K.nm(w)} veut la vérité`, action: 'jure de trouver', target: f.vid, fact: f.id,
          fr: `${K.nm(f.vid)}, les yeux rouges : « C’était tout ce qui me restait. » ${K.nm(w)} : ${say}`, world: [`${K.nm(w)} cherche`], aud: [{ k: 'care', fr: `la réponse compte pour ${K.nm(f.vid)}` }], plot: `${f.e} la question compte`, next: `${K.nm(w)} va fouiller, interroger`, jobs: ['want', 'rel'], tech: 'Direct confession', goal: 'desire' });
        return put({ seg, circle: 2, kind: 'matter', actor: w, desire: lineOf(D2(w, f.kind === 'crime' ? 'justice' : 'find')) || `${K.nm(w)} veut savoir`, action: 'jure de trouver', fact: f.id,
          fr: `${K.nm(w)}${w === J ? '' : ', les yeux rouges'} : ${say}`, world: [`${K.nm(w)} cherche`], aud: [{ k: 'care', fr: `la réponse compte pour ${K.nm(w)}` }], plot: `${f.e} la question compte`, next: `${K.nm(w)} va fouiller, interroger`, jobs: ['want'], tech: 'Direct confession', goal: 'desire' }); };
      const e2v = (f) => f.ev && f.ev.v;
      // the other name when it narrows to two: someone Justin cares about (it hurts), never the culprit, the victim, the one cleared
      const narrowTo = (f) => [won && won.t, lost && lost.t, ...D.filter((d) => d.who === J && ['love', 'protect'].includes(d.k)).map((d) => d.t), ...cast()].find((p) => p && p !== f.by && p !== J && live(p) && p !== (f.sus && f.sus.id) && p !== f.vid) || cast().find((p) => p !== f.by && p !== f.vid) || J;
      // the false lead: pushed by the culprit himself (an action, not a coincidence)
      g.theory = (f, seg) => { if (!f || f.kind !== 'crime') return null; const x = f.by, s = f.sus && live(f.sus.id) ? f.sus : null, tr = K.traitsOf(x, a);
        const fr = s ? (tr.ruse >= 1 ? `${K.nm(x)} rappelle à tous ${que(K.low1(f.sus.why))}. Les regards se tournent vers ${K.nm(s.id)}.` : `Tous les regards vont vers ${K.nm(s.id)} : ${K.low1(f.sus.why)}. ${K.nm(x)} ne dit rien.`)
          : `${K.nm(x)} parle d’un étranger vu près du port. Tout le monde veut y croire.`;
        W.theory = s ? s.id : 'étranger';
        return put({ seg, circle: 4, kind: 'theory', actor: x, desire: `${K.nm(x)} veut garder son crime caché`, action: s ? 'désigne' : 'invente un coupable', target: s ? s.id : null, fact: f.id, link: 'mais',
          fr, world: [s ? `${K.nm(s.id)} est soupçonné` : 'on cherche un étranger'], aud: [{ k: 'suspect', ref: f.id, fr: s ? `${K.nm(s.id)} (${K.low1(f.sus.why)})` : 'un étranger' }],
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
          plot: `${f.e} la preuve se dérobe`, next: `si ${K.nm(wit)} parle, tout tombe`, jobs: ['harder'], tech: 'Le témoin se tait', goal: 'stakes' });
        return put({ seg, circle: 4, kind: 'cover', actor: x, desire: `${K.nm(x)} veut garder son crime caché`, action: `fait disparaître ${itemOf(f)}`, fact: f.id, link: 'mais', cause,
          fr: Tt.gone({ ...ctxT(f), o: K.nm(o) }), world: [`${itemOf(f)} n’existe plus`, `il ne reste que deux noms : ${K.nm(x)} et ${K.nm(o)}`],
          aud: [{ k: 'suspect', ref: f.id, fr: `${K.nm(x)} ou ${K.nm(o)}` }], plot: `${f.e} la preuve disparaît, ça se resserre`, next: `un autre indice devient le seul espoir`, jobs: ['harder', 'info'], tech: 'La preuve disparaît', goal: 'stakes' }); };
      // the culprit's alibi, when someone asks (a lie the answer will re-read)
      g.lie = (f, seg, cause) => { if (!f || !f.fact || !live(f.who)) return null; const ff = f.fact, Tt = TRACE[ff.ev.k] || TRACE.murder;
        return put({ seg, circle: 4, kind: 'lie', actor: f.who, desire: `${K.nm(f.who)} veut garder son crime caché`, action: 'ment', fact: ff.id, link: 'mais', cause, fr: Tt.lie(ctxT(ff)), world: [`${K.nm(f.who)} a un alibi`],
          aud: [{ k: 'learn', fr: `${K.nm(f.who)} a un alibi` }], plot: `${ff.e} un alibi`, next: 'si l’alibi tombe, tout tombe', jobs: ['info'], tech: 'La réponse trop parfaite', goal: 'curiosity' }); };
      // the false lead breaks: a fact clears him
      g.clear = (f, seg) => { if (!f || !f.sus || !live(f.sus.id)) return null; const s = f.sus.id, G2 = K.graph(), who = G2.fig ? G2.fig.n : pick(`al${s}`, ['le veilleur du port', 'le batelier', 'la garde de nuit']);
        W.cleared = s;
        return put({ seg, circle: 6, kind: 'clear', actor: s, desire: `${K.nm(s)} veut laver son nom`, action: 'prouve où il était', fact: f.id, link: 'mais',
          fr: `${K.nm(s)} était au port toute la nuit : ${who} l’a vu. Ce n’est pas ${K.nm(s)}.`, world: [`${K.nm(s)} est lavé`], aud: [{ k: 'clear', ref: f.id, fr: K.nm(s) }],
          plot: `${f.e} la fausse piste tombe`, next: 'le coupable est ailleurs, plus près', jobs: ['reverse'], tech: 'Ça se retourne', goal: 'stakes' }); };
      // the answer: the culprit gives himself away (what he says, what he does), and the earlier moments change meaning
      g.reveal = (f, seg) => { if (!f) return null; const x = f.by;
        if (f.kind === 'crime') { const c = ctxT(f), Tt = TRACE[f.ev.k], wit = f.saw.find(live), re = W.M.filter((m) => m.act === a && m.fact === f.id && ['theory', 'cover', 'lie'].includes(m.kind)).map((m) => m.id);
          const how = W.named === x ? `${K.nm(x)} ne nie pas.` : wit ? `${K.nm(wit)} parle enfin : ${K.nm(wit)} a vu ${K.nm(x)}, cette nuit-là.` : Tt.slip(c);
          const m1 = put({ seg, circle: 7, kind: 'reveal', actor: wit || x, desire: wit ? `${K.nm(wit)} ne veut plus se taire` : `${K.nm(x)} veut s’en tirer`, action: wit ? 'parle' : 'se trahit', fact: f.id, link: 'soudain',
            fr: `${how} C’était ${K.nm(x)}.${f.mot && !f.whyLater ? ` ${up(f.mot.fr)}.` : ''}`, world: [`tout le monde sait : ${f.truth}`], aud: [{ k: 'answer', ref: f.id, fr: f.truth }, { k: 'reframe', ids: re, fr: re.length ? `relire ${re.map((i) => '#' + i).join(', ')}` : '' }],
            plot: `${f.e} la réponse`, next: `${K.nm(x)}, acculé, n’a plus rien à perdre`, jobs: ['payoff', 'reverse'], tech: wit ? 'Pas sans aide' : 'Un détail qu’il ne devrait pas savoir', goal: 'info' });
          for (const p of K.people().filter(live)) { if (!W.knows.has(p)) W.knows.set(p, new Set()); W.knows.get(p).add(f.id); }
          W.exposed = x; return m1; }
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
          return put({ seg, circle: 7, kind: 'reveal', actor: op2, desire: W.narrow && W.narrow[1] === op2 ? `${K.nm(op2)} veut laver son nom` : want(op2), action: 'l’ouvre', fact: f.id, fr: `${K.nm(op2)} ouvre enfin ${K.low1(K.infoFr(i))}. ${t}`, world: ['ce qu’il contenait est su'], aud: [{ k: 'answer', ref: f.id, fr: t }], plot: `${f.e} ouvert`, next: 'ce qu’il contient change le choix', jobs: ['payoff', 'info'], tech: 'Demande qui révèle', goal: 'info' }); }
        if (f.kind === 'link') { const re = W.M.filter((m) => m.fact === f.id).map((m) => m.id);
          const ac = f.ch.ppl.find(live) || J;
          return put({ seg, circle: 7, kind: 'reveal', actor: ac, desire: want(ac), action: 'ça sort', fact: f.id, link: 'soudain', who: f.ch.ppl, fr: `Ça sort : ${K.low1(f.truth)}.`, world: [`tout le monde sait : ${f.truth}`],
            aud: [{ k: 'answer', ref: f.id, fr: f.truth }, { k: 'reframe', ids: re, fr: re.length ? `relire ${re.map((n) => '#' + n).join(', ')}` : '' }], plot: '🕸️ le lien sort', next: 'chacun réagit depuis ce qui le relie', jobs: ['payoff', 'reverse'], tech: 'Demande qui révèle', goal: 'info' }); }
        return null; };
      // a seed (twist): a detail, unexplained; irony: the audience is told, the others are not
      g.seed = (f, lv, seg, host) => { const dAt = f && f.by && W.deadAt.get(f.by); if (!f || (dAt != null && (!host || host.id >= dAt))) return null;   // the dead plant nothing after their death
        if (f.kind === 'secret' && f.info) { const i = f.info, s1 = SEED[i.id] ? SEED[i.id][Math.min(1, lv - 1)](K.nm(i.x), K.nm(i.y)) : `${K.nm(i.x)} cache quelque chose.`;
          if (f.mode === 'irony' && host) { host.also.push({ fr: s1, why: `le public sait : ${K.infoFr(i)}`, fact: f.id }); host.also.push({ fr: `Le public le sait : ${K.low1(K.infoFr(i))}. Personne d’autre.`, why: 'ironie' }); host.aud.push({ k: 'irony', fr: K.infoFr(i) }); return host; }
          if (f.mode === 'irony') return put({ seg, circle: 2, kind: 'seed', actor: i.x, desire: `${K.nm(i.x)} veut garder son secret`, action: 'cache', fact: f.id, fr: `${s1} (Le public le sait : ${K.infoFr(i)}. Personne d’autre.)`, slide: `Ce que personne ne sait : ${K.low1(K.infoFr(i))}.`,
            world: [], aud: [{ k: 'irony', fr: K.infoFr(i) }], plot: `${f.e} un secret que le public partage`, next: 'on craindra le moment où ça sortira', jobs: ['info'], tech: 'Aveu vulnérable', goal: 'info' });
          const m = { seg, circle: 4, kind: 'seed', actor: i.x, desire: `${K.nm(i.x)} veut garder son secret`, action: 'laisse échapper', fact: f.id, fr: s1, aud: [{ k: 'learn', fr: `un détail : ${K.low1(s1)}` }], plot: `${f.e} semé`, next: 'ça reviendra', jobs: ['info'], tech: 'Seed & payoff (surprise)', goal: 'callback' };
          if (host) { host.also.push({ fr: s1, why: `semé : ${K.infoFr(i)}`, fact: f.id }); host.aud.push(m.aud[0]); return host; } return put(m); }
        if (f.kind === 'link') { const m = { seg, circle: 4, kind: 'seed', actor: f.ch.ppl[0], desire: want(f.ch.ppl[0]), action: 'un détail', fact: f.id, fr: f.seed1, aud: [{ k: 'learn', fr: `un détail : ${K.low1(f.seed1)}` }], plot: '🕸️ semé', next: 'ça reviendra', jobs: ['info'], tech: 'Seed & payoff (surprise)', goal: 'callback' };
          if (host) { host.also.push({ fr: f.seed1, why: `semé : ${f.truth}`, fact: f.id }); host.aud.push(m.aud[0]); return host; } return put(m); }
        if (f.kind === 'object' && f.info) { const t = `${up(K.infoFr(f.info))} : ${({ letter: 'on la voit, personne ne l’ouvre', ring: 'jamais enlevée, jamais expliquée', key: 'personne ne sait ce qu’elle ouvre', photo: 'cachée dès qu’on approche', map: 'personne ne sait où elle mène' })[f.info.id] || 'on le voit, personne n’y touche'}.`, m = { seg, circle: 1, kind: 'seed', actor: f.info.x, desire: want(f.info.x), action: 'garde', fact: f.id, fr: t, aud: [{ k: 'q', ref: f.id, fr: f.q }], plot: `${f.e} vu, pas ouvert`, next: 'on l’ouvrira', jobs: ['info'], tech: 'Objet planté', goal: 'callback' };
          if (host) { host.also.push({ fr: t, why: f.q, fact: f.id }); host.aud.push(m.aud[0]); return host; } return put(m); }
        return null; };
      // Justin tries (on a line), and his flaw makes him fail; a force answers what he did
      g.attempt = (d, r, seg) => { if (!d) return null; const NO = { protect: (c) => `Justin ne quitte plus ${c.t} d’une semelle.`, respect: () => 'Justin relève la tête, devant toute la salle.' }; const known = d.k === 'justice' && d.t && !facts.some((f) => f.kind === 'crime' && f.hidden && f.by === d.t && W.exposed !== f.by);
        const L = known ? [(c) => `Justin cherche ${c.t} dans toute la ville.`, (c) => `Justin rassemble ceux qui ont vu ce que ${c.t} a fait.`, (c) => `Justin attend ${c.t}, seul, à la porte.`] : ATTEMPT[d.k] || ATTEMPT.alive, f = myst, opp = forces.find((x) => x.vs && x.vs.id === d.id && x.who !== J && live(x.who)) || mf();
        const c = { t: d.t ? K.nm(d.t) : '', o: opp && opp.who !== 'clock' && opp.who !== 'f:A' && !(opp.kind === 'culprit' && W.exposed !== opp.who) ? K.nm(opp.who) : 'tout le monde', c: K.nm(conf()), spot: f ? f.spot : 'la cave', w: W.seer ? K.nm(W.seer) : f && live(f.seek) ? K.nm(f.seek) : K.nm(conf()) };
        const say = L[Math.min(L.length - 1, r - 1)](c), fr0 = c.o === 'tout le monde' && /tout le monde/.test(say) && NO[d.k] ? NO[d.k](c) : say;
        return put({ seg, circle: 4, kind: 'attempt', actor: J, desire: lineOf(d), action: 'tente', target: d.t || null, line: d.id, fr: fr0, world: [], aud: [{ k: 'hope', fr: `Justin avance vers ${K.lab(d)}` }],
          plot: `${lineOf(d)} : il tente`, next: 'on va lui résister', jobs: ['want'], tech: 'Show character positioning', goal: 'stakes' }); };
      g.fail = (d, worst, seg) => { let opp = forces.find((x) => d && x.vs && x.vs.id === d.id && x.who !== J && live(x.who)) || mf();
        const culp = new Set([...facts.filter((f) => f.kind === 'crime').map((f) => f.by), ...D.filter((x) => x.who === J && ['justice', 'oust'].includes(x.k)).map((x) => x.t)]), b = (W.narrow && W.narrow[1] !== J && live(W.narrow[1]) ? W.narrow[1] : null) || [lost && lost.t, won && won.t, conf()].find((p) => p && live(p) && !culp.has(p)) || conf();
        if (worst && W.narrow && b === W.narrow[1] && !W.exposed) return put({ seg, circle: 6, kind: 'fail', actor: J, desire: lineOf(d), action: 'retombe dans sa faille', line: d && d.id, link: 'mais',
          fr: `${(FL.worst({ o: '', c: K.nm(conf()), b: K.nm(b) }).split('.')[0])}. Toute la salle accuse ${K.nm(b)}.`, world: [`on accuse ${K.nm(b)}, à tort`], aud: [{ k: 'suspect', ref: crimeF.id, fr: K.nm(b) }, { k: 'fear', fr: `${K.nm(b)} paie pour l’hésitation de Justin` }],
          plot: '🪞 sa faille agit contre lui', next: `il devra sauver ${K.nm(b)}`, jobs: ['fail', 'harder'], tech: 'Ça se retourne', goal: 'stakes' });
        if (opp && opp.kind === 'culprit' && W.exposed !== opp.who) opp = opp.fact && opp.fact.sus && live(opp.fact.sus.id) ? { who: opp.fact.sus.id } : null;   // the hidden culprit is never named before the answer
        const c = { o: opp && live(opp.who) ? K.nm(opp.who) : 'la salle', c: K.nm(conf()), b: K.nm(b) };
        return put({ seg, circle: worst ? 6 : 4, kind: 'fail', actor: J, desire: lineOf(d), action: worst ? 'retombe dans sa faille' : 'échoue', line: d && d.id, link: 'mais', fr: (worst ? FL.worst : FL.fail)(c),
          world: [worst ? `${K.nm(b)} paie pour Justin` : 'Justin a perdu une chance'], aud: [{ k: 'fear', fr: `il pourrait ne pas y arriver (${flawF && K.S.flaw[J] ? K.F[K.S.flaw[J]].n.toLowerCase() : 'il hésite'})` }],
          plot: '🪞 sa faille agit contre lui', next: 'au climax, il devra la vaincre', jobs: ['fail'], tech: 'Petit mensonge démasqué', goal: 'stakes' }); };
      // a desire weighs more: someone acts (the one it is about)
      g.raise = (d, seg, cause) => { if (!d) return null; const lv = lvlUp(d), L = RAISE[d.k] || RAISE.respect, f = facts.find((x) => x.kind === 'crime'), G2 = K.graph();
        const needs = f && f.sus && live(f.sus.id) && !W.cleared ? f.sus.id : f && live(f.seek) && f.seek !== J ? f.seek : conf();
        const c = { t: d.t ? (W.exposed === d.t ? K.nm(d.t) : K.tName(d)) : '', w2: K.nm(needs), f: G2.fig && !(G2.cr && G2.cr.k === 'murder') ? G2.fig.n : myst && myst.kind === 'crime' && myst.ev.k === 'murder' ? 'celui qui a tué' : 'celui qui le cherche' };
        const actor = d.k === 'justice' ? (lv === 1 ? needs : J) : d.t && live(d.t) ? d.t : J, mine = actor !== J && (D2(actor, 'love', J) || D2(actor, 'protect', J));
        const fr = d.k === 'justice' && W.exposed ? `Toute la salle attend que Justin parle.` : d.k === 'justice' && lv === 1 ? `${c.w2} supplie Justin de trouver le vrai coupable.` : L[Math.min(L.length - 1, lv - 1)](c);
        return put({ seg, circle: lv >= 3 ? 7 : 5, kind: 'raise', actor, desire: actor === J ? lineOf(d) : mine ? lineOf(mine) : d.k === 'justice' && actor === needs && f && f.sus && actor === f.sus.id ? `${K.nm(actor)} veut laver son nom` : want(actor), action: 'pèse plus', target: actor === J ? null : J, line: d.id, cause,
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
          : { fr: `${X0}, à ${T0} : « Demain, devant tous, tu me dis oui. »`, act: 'pose une échéance', jobs: ['force'], tech: 'Une annonce datée', world: [`${T0} devra répondre demain`] };
        if (f.kind === 'culprit' && f.fact) { const ff = f.fact, Tt = TRACE[ff.ev.k] || TRACE.murder;
          const loves = (p) => p && (D2(x, 'love', p) || D2(x, 'protect', p)), T1 = T0 && !loves(t) ? T0 : '';
          const once = f.seduced; if (!final && via && via.t === x && ['love', 'protect'].includes(via.k)) f.seduced = 1;
          o = !final && once && via && via.t === x ? { fr: `${X0} serre Justin trop fort, et ne dit rien. ${X0} a peur de quelque chose.`, act: 'a peur', jobs: ['info'], tech: 'Une trace sur lui', world: [], aud: [{ k: 'learn', fr: `${X0} a peur de quelque chose` }] }
            : !final && via && via.t === x && via.k === 'love' ? { fr: `${X0} embrasse Justin. Puis, tout bas : « Arrête de chercher. Pour nous. »`, act: 'détourne Justin de la vérité', jobs: ['harder', 'info'], tech: 'Il retire un appui', world: ['Justin doit choisir entre chercher et ' + X0], aud: [{ k: 'learn', fr: `${X0} veut que Justin arrête de chercher` }] }
            : !final && via && via.t === x && via.k === 'protect' ? { fr: `${X0} supplie Justin de ne plus poser de questions : « Tu vas te faire du mal. »`, act: 'détourne Justin de la vérité', jobs: ['harder', 'info'], tech: 'Il retire un appui', world: ['Justin hésite à chercher'], aud: [{ k: 'learn', fr: `${X0} veut que Justin arrête de chercher` }] }
            : final ? (K.traitsOf(x, a).violence >= 2 ? { fr: T1 ? `${X0}, acculé, attrape ${T1} : « Un pas de plus, et c’est ${T1} qui paie. »` : `${X0}, acculé, attrape Justin par le col : « Un mot, et tu ne sors pas d’ici. »`, act: 'menace pour s’en sortir', jobs: ['force'], tech: 'Il force la main', world: ['une vie en jeu'] }
            : D2(J, 'love', x) || D2(J, 'protect', x) ? { fr: `${X0}, tout bas, à Justin : « Si tu tiens à moi, tu te tais. »`, act: 'supplie Justin de se taire', jobs: ['force'], tech: 'Il force la main', world: ['Justin tient le sort de ' + X0] }
              : K.infos().some((i) => i.x === J && ['secret', 'mask'].includes(K.IN[i.id].k)) ? { fr: `${X0}, à Justin, devant tous : « Dis-le, et je dis le tien. »`, act: 'menace de tout dire', jobs: ['force'], tech: 'Il force la main', world: ['chacun tient l’autre'] }
              : { fr: `${X0} prend la porte de la cour. Si Justin ne fait rien, personne ne saura jamais.`, act: 's’enfuit', jobs: ['force'], tech: 'Il force la main', world: [`${X0} s’enfuit`] })
            : k === 1 ? { fr: Tt.lie(ctxT(ff)), act: 'ment', jobs: ['info'], tech: 'La réponse trop parfaite', world: [`${X0} a un alibi`], kind: 'lie' }
            : { fr: `${X0} retourne la salle contre Justin : « Tu accuses tout le monde, maintenant ? »`, act: 'retourne la salle', jobs: ['harder'], tech: 'On fait barrage', world: ['la salle se méfie de Justin'] }; }
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
        if (f.kind === 'clock') o = { fr: k >= 2 || final ? 'Le jour se lève bientôt. Il faut trancher.' : '« Avant l’aube, il sera trop tard. »', act: 'le temps presse', jobs: ['force'], tech: 'L’échéance', world: ['le temps presse'] };
        if (!o) return null;
        return put({ seg, circle: final ? 7 : 4, kind: o.kind || (final ? 'force' : 'move'), hostile: !!o.hostile, actor: x === 'clock' ? null : x, desire: f.d ? K.dSay(f.d) : f.why, action: o.act, target: t, link: 'mais', cause, force: f.kind, fact: f.fact && f.fact.id,
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
        return put({ seg, circle: 4, kind: 'react', fact: m.fact, actor: t, desire: m.kind === 'theory' ? `${T0} veut laver son nom` : want(t), action: o.act, target: m.actor, link: 'donc', cause: m.id, fr: o.fr, world: o.world, aud: au, plot: `↪️ réponse à #${m.id}`, next: o.next, jobs: ['conseq'], tech: 'La conséquence, tout de suite', goal: 'conseq' }); };
      // the climax: Justin chooses (from who he is), what it costs, what he gets
      g.decide = (seg) => { if (!won) return null; const ez = (d) => FLAW[flawF ? flawF.flaw : 'none'].easy.includes(d.k) || SELF.includes(d.k), ovr = lost && ez(lost) && !ez(won);
        return put({ seg, circle: 7, kind: 'decide', actor: J, desire: lineOf(won), action: `choisit ${K.lab(won)}`, link: 'donc', fr: `${dec.broke ? dec.why : ovr ? FL.over : dec.why} Justin choisit ${K.lab(won)}${lost ? `, ${letGo(lost)}` : ''}.`,
          world: [`Justin a choisi ${K.lab(won)}`], aud: [{ k: 'answer', ref: 'climax', fr: `Justin choisit ${K.lab(won)}` }], plot: `🏁 le climax : ${K.lab(won)} plutôt que ${lost ? K.lab(lost) : '?'}`, next: lost ? `le prix : ${price ? price.fr : 'perdre ' + K.lab(lost)}` : '', jobs: ['force', 'payoff'], tech: 'Impossible choice', goal: 'stakes', why: dec.why }); };
      g.price = (seg) => { if (!lost || !price) return null; const who = price.kind === 'kill' && price.x && live(price.x) ? price.x : price.t && live(price.t) ? price.t : J;
        if (price.kind === 'kill' && price.t) W.out.set(price.t, 'dead'); if (price.kind === 'gone' && price.t) W.out.set(price.t, 'gone');
        return put({ seg, circle: 8, kind: 'price', actor: who, desire: who === J ? lineOf(lost) : want(who), action: { kill: 'tue', gone: 'part', turn: 'se détourne', hurt: 'reste blessé' }[price.kind] || 'perd', target: price.t || null, link: 'donc',
          fr: `${up(price.fr)}.`, world: [up(price.fr)], aud: [{ k: 'learn', fr: `le prix : ${price.fr}` }], plot: `💔 le prix de ${K.lab(lost)}`, next: a < A ? 'le monde a changé : l’acte suivant part de là' : 'c’est fini', jobs: ['conseq'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' }); };
      g.gain = (seg) => { if (!won) return null; const t = won.t && live(won.t) ? won.t : null, ex = W.exposed && live(W.exposed) ? W.exposed : null;
        const fr = won.k === 'justice' ? (ex ? `${K.nm(ex)} doit répondre de ce qui a été fait, devant tous.` : 'La vérité est dite, devant tous.') : won.k === 'love' && t ? `${K.nm(t)} reste avec Justin.` : won.k === 'protect' && t ? `${K.nm(t)} est hors de danger, grâce à Justin.` : won.k === 'find' && t ? `Justin ramène ${K.nm(t)}.` : won.k === 'free' ? 'Justin part, enfin.' : won.k === 'alive' ? 'Justin s’en sort vivant.' : `Justin obtient ${K.lab(won)}.`;
        return put({ seg, circle: 8, kind: 'gain', actor: t || J, desire: t ? want(t) : lineOf(won), action: 'ce qu’il a gagné', link: 'donc', fr, world: [fr.replace(/\.$/, '')], aud: [{ k: 'learn', fr }], plot: `${K.DK[won.k].e} ${K.lab(won)} : gagné`, next: '', jobs: ['conseq'], tech: 'Il l’obtient, et ça coûte', goal: 'conseq' }); };
      g.turn = (seg) => { if (a < A) { const e2 = K.evs().find((e) => K.EK[e.k] && K.actOf(e) === a + 1 && K.live(e.x)); const AS = K.actState(), arc = AS.arcs.find((r) => live(r.who) && r.mode !== 'deuil');
        const fr = arc ? arcText(arc) : e2 && live(e2.x) ? `${K.nm(e2.x)} n’en a pas fini.` : 'Rien n’est fini.';
        return put({ seg, circle: 8, kind: 'turn', actor: arc ? arc.who : e2 ? e2.x : J, desire: arc ? arc.en : '', action: 'la suite', link: 'donc', fr, world: [], aud: [{ k: 'q', ref: 'next', fr: 'Que va-t-il se passer maintenant ?' }], plot: '❔ l’acte suivant', next: 'l’acte 2', jobs: ['force'], tech: 'Qui, quand, où', goal: 'curiosity' }); }
        const seat = lost && lost.t ? K.nm(lost.t) : null;
        return put({ seg, circle: 8, kind: 'turn', actor: J, desire: lineOf(won), action: 'reste avec ce qu’il a choisi', link: 'donc', fr: seat ? `Au comptoir, la place ${deN(seat)} reste vide.` : 'Justin reste seul au comptoir. Il a choisi.', world: [], aud: [{ k: 'care', fr: 'ce que ça a coûté' }], plot: '💔 la dernière image', next: '', jobs: ['conseq'], tech: 'Chaise vide', goal: 'conseq' }); };

      // ======== THE ACT, in its story circle ========
      const crimeF = myst, plansAll = facts.filter((f) => ['twist', 'irony', 'motive'].includes(f.mode) || f.kind === 'object' || f.kind === 'link');
      const sideOf = (r) => { const sides = [XA, XB].filter(Boolean); if (crimeF && crimeF.kind === 'crime' && sides.some((d) => d.k === 'justice') && r === 1) return sides.find((d) => d.k === 'justice'); return sides[(r + 1) % sides.length] || sides[0] || D.find((d) => d.who === J && d.s >= 2); };
      // 1-3 · the opening (act 1: the recipe's spine) / act 2: what the last act changed, then its event
      if (a === 1) {
        const r = op.r, first = EV[0], care0 = (d) => d && d.t && live(d.t) ? g.care(J, d.t, d.k === 'love' ? 'love' : 'protect') : null;
        if (r === 'mystery' && crimeF) { const f = crimeF, jw = [XA, XB].find((d) => d && d.k !== 'justice' && !(d.from === f.ev)) || D.find((d) => d.who === J && d.s >= 2 && d.k !== 'justice' && d.k !== 'alive');
          const pre = EV.filter((e) => e !== f.ev && EV.indexOf(e) < EV.indexOf(f.ev));
          g.want(jw);
          if (f.vid) { const pal = D.find((d) => ['protect', 'love'].includes(d.k) && d.t === f.vid && d.who !== f.by && live(d.who)); g.care(pal ? pal.who : J, f.vid, 'alive');
            if (f.sus && live(f.sus.id)) W.last.also.push({ fr: `${K.nm(f.sus.id)} et ${f.v} se disputent, devant tous.`, why: 'la fausse piste se prépare' }); }
          else if (f.ev.k === 'theft' && f.vid) g.care(f.vid, f.vid, 'protect'); else if (jw && jw.t) care0(jw);
          for (const e of pre) g.event(e);
          const R0 = K.graph().fig, host0 = W.M.filter((m) => m.act === 1 && ['want', 'care'].includes(m.kind)).pop();
          if (host0 && f.needer && R0) host0.also.push({ fr: `${up(R0.need(K.nm(f.needer)))}.`, why: 'ce qui est en jeu' });
          if (host0 && f.mot && f.mot.f && f.mot.f.prom && live(f.by)) { host0.also.push({ fr: f.mot.f.prom[0](f.mot.c), why: `semé : ${f.mot.fr}`, fact: f.id }); host0.who.push(f.by); }
          g.event(f.ev); g.matter(f); g.theory(f, 'open'); g.clue(f, 1, 'open');
          const T1 = put({ seg: 'open', circle: 3, kind: 'turn', actor: live(f.seek) ? f.seek : J, desire: `${K.nm(live(f.seek) ? f.seek : J)} veut la vérité`, action: 'comprend', link: 'mais', fact: f.id,
            fr: f.ev.k === 'murder' ? 'Personne n’est entré, personne n’est sorti cette nuit. C’est l’un d’eux.' : f.ev.k === 'theft' ? 'Seuls ceux de la maison savaient où était la clé. C’est l’un d’eux.' : 'Seuls ceux de cette salle savaient. C’est l’un d’eux.',
            world: ['le coupable est dans la salle'], aud: [{ k: 'fear', fr: 'le coupable est parmi eux' }, { k: 'q', ref: f.id, fr: f.q }], plot: `${f.e} ça se resserre`, next: 'chacun soupçonne chacun', jobs: ['info', 'force'], tech: 'Personne n’est entré ni sorti', goal: 'curiosity' });
          ACT.turn = T1.id; }
        else if (r === 'mystery' && myst) { g.want(XA || D.find((d) => d.who === J && d.s >= 2)); care0([XA, XB].find((d) => d && d.t === myst.by)) || care0(XA); g.event(myst.ev); g.matter(myst); g.clue(myst, 1, 'open'); ACT.turn = g.clue(myst, 2, 'open').id; }
        else if (r === 'dilemma') { const [pA, pB] = [XA, XB].sort((x, y) => (y.t ? 1 : 0) - (x.t ? 1 : 0)); g.want(pA); if (pB && pB.t) care0(pB); else if (pA && pA.t && pB) g.want(pB);
          const evs0 = EV.filter((e) => ['arrive', 'threat', 'revenge', 'gone'].includes(e.k) || (K.EK[e.k].crime && !e.h)).slice(0, 2);
          for (const e of evs0) g.event(e); const fo = mf(); if (!evs0.some((e) => e.k === 'threat' || e.k === 'revenge') && fo) g.move(fo, 'open'); g.raise(pA, 'open'); g.raise(pB, 'open');
          const fx = forces.find((f) => f.who === K.forcer(1)) || forces.find((f) => f.kind === 'leaver' && live(f.who)), dl = pick('dlD', ['Avant l’aube', 'Avant la fermeture', 'Demain, au premier bateau']);
          ACT.turn = put({ seg: 'open', circle: 3, kind: 'turn', actor: fx && live(fx.who) ? fx.who : J, desire: fx && fx.d ? K.dSay(fx.d) : '', action: 'pose l’échéance', link: 'mais',
            fr: fx && live(fx.who) ? (fx.kind === 'leaver' ? `${K.nm(fx.who)} : « ${dl}, je pars. Avec ou sans toi. »` : `${K.nm(fx.who)}, à Justin : « ${dl}, je reviens. Ce soir-là, tu choisiras qui tu protèges. »`) : `${dl}, Justin devra choisir : ${K.lab(XA)} ou ${K.lab(XB)}.`, world: ['une échéance'], aud: [{ k: 'q', ref: 'climax', fr: op.q }], plot: '⚖️ le dilemme est posé', next: 'tout pèsera sur ce choix', jobs: ['force'], tech: 'Une annonce datée', goal: 'stakes' }).id; }
        else { const jw = D.find((d) => d.who === J && d.src === 'choisi') || XA || D.find((d) => d.who === J && d.s >= 2); g.want(jw);
          if (first) g.event(first); const ob = forces.find((f) => f.vs && jw && f.vs.id === jw.id && f.who !== J && live(f.who)) || mf();
          if (ob) g.move(ob, 'open'); g.attempt(jw, 1, 'open'); g.fail(jw, false, 'open'); g.raise(jw, 'open');
          ACT.turn = ((ob && ob.kind !== 'inner' ? g.move(ob, 'open') : null) || W.last).id; }
        // the twists and what Justin hides: planted in the opening, riding in a moment that is already there (one line, two jobs)
        const hosts = W.M.filter((m) => m.act === 1 && ['care', 'want', 'matter'].includes(m.kind)), mine = (f) => crimeF && ((f.mode === 'motive' && crimeF.mot && crimeF.mot.info === f.info) || (f.obj && f.obj.crime === crimeF.ev));
        plansAll.filter((f) => f.mode === 'irony').forEach((f) => g.seed(f, 1, 'open', W.M.find((m) => m.act === 1 && m.who.includes(f.by)) || W.M.find((m) => m.act === 1)));
        plansAll.filter((f) => f.mode !== 'irony' && mine(f)).forEach((f, k) => g.seed(f, 1, 'open', hosts.find((m) => m.who.includes(f.by)) || hosts[k % Math.max(1, hosts.length)] || null));
        ACT.late = plansAll.filter((f) => f.mode !== 'irony' && !mine(f));
      } else {
        const AS = K.actState(), arc = AS.arcs.find((r) => live(r.who));
        if (arc) put({ seg: 'open', circle: 1, kind: 'arc', actor: arc.who, desire: arc.mode === 'vengeance' ? `${K.nm(arc.who)} veut faire payer ${K.nm(arc.x)}` : arc.fr, action: { vengeance: 'bascule', deuil: 'porte son deuil', fuite: 's’en va', rancune: 'garde rancune' }[arc.mode] || 'change',
          fr: arcText(arc), world: [arcText(arc)], aud: [{ k: 'learn', fr: arcText(arc) }], plot: '🔀 quelqu’un a changé', next: 'ce qu’il fera maintenant', jobs: ['conseq'], tech: 'La conséquence, tout de suite', goal: 'conseq' });
        const e0 = EV[0]; if (e0) g.event(e0); const jw = XA || D.find((d) => d.who === J && d.s >= 2); g.want(jw, 'open');
        for (const e of EV.slice(1, 2)) g.event(e);
        plansAll.forEach((f, k) => g.seed(f, 1, 'open', W.M.filter((m) => m.act === a)[k] || null));
        ACT.turn = W.last.id;
      }
      // 4 · he searches. Two things run side by side, each move caused by the one before it:
      //  · Justin pushes his lines (an attempt) and the force whose interest it touches answers (then the one it hit answers);
      //  · each hidden crime climbs its ladder, done by the one who wants the truth (Justin, or someone else) and answered by
      //    the culprit: they ask → the culprit lies; the one accused proves where they were; someone saw the proof; they go and
      //    get it → it is gone, and only two names are left
      const crimeOn = crimeF && crimeF.kind === 'crime' && crimeF.hidden && live(crimeF.by);
      const later = EV.filter((e) => !W.hap.has(e));
      const R = Math.max(2, Math.min(3, forces.filter((f) => f.who !== J && f.kind !== 'clock').length + (crimeOn ? 1 : 0)));
      let failed = W.M.some((m) => m.act === a && m.kind === 'fail');
      const did = (kind) => W.M.some((m) => m.act === a && m.kind === kind && (!crimeF || m.fact === crimeF.id));
      // the force that answers what Justin just tried: only one whose interest it touches (a love or a care that points at
      // the culprit: the culprit answers; the search itself is the ladder's)
      const answerer = (d) => forces.find((f) => f.who !== J && f.kind !== 'clock' && live(f.who) && !(f.kind === 'culprit' && (W.exposed === f.who || !W.hap.has(f.fact.ev))) && ((f.vs && d && f.vs.id === d.id && f.kind !== 'culprit') || (f.kind === 'culprit' && d && d.t === f.who && ['love', 'protect'].includes(d.k))));
      const sk = crimeOn ? (live(crimeF.seek) ? crimeF.seek : J) : null, skD = crimeOn ? (D2(sk, 'justice') || { id: `${sk}:justice`, who: sk, k: 'justice', t: crimeF.by }) : null;
      const culF = crimeOn ? forces.find((x) => x.kind === 'culprit' && x.who === crimeF.by) : null;
      const search = (lv, seg) => { if (sk === J && lv === 2 && W.seer === J) return put({ seg, circle: 4, kind: 'attempt', actor: J, desire: lineOf(skD), action: 'cherche', fact: crimeF.id, fr: `Justin redescend dans ${crimeF.spot}, chercher ${itemOf(crimeF).replace(/^un /, 'le ').replace(/^une /, 'la ')}.`, aud: [{ k: 'hope', fr: 'la preuve est à portée' }], plot: `${crimeF.e} on cherche`, next: `${K.nm(crimeF.by)} va devoir se couvrir`, jobs: ['want'], tech: 'Show character positioning', goal: 'stakes' });
        if (sk === J) return g.attempt([XA, XB].find((x) => x && x.k === 'justice') || D2(J, 'justice') || skD, lv, seg);
        const L = [`${K.nm(sk)} interroge la salle : où était chacun cette nuit-là ?`, `${K.nm(sk)} descend dans ${crimeF.spot}, chercher ce ${que(W.seer ? K.nm(W.seer) : 'quelqu’un')} a vu.`];
        return put({ seg, circle: 4, kind: 'attempt', actor: sk, desire: lineOf(skD) || `${K.nm(sk)} veut la vérité`, action: 'cherche', fact: crimeF.id, fr: L[Math.min(1, lv - 1)], aud: [{ k: 'hope', fr: 'la vérité approche' }],
          plot: `${crimeF.e} on cherche`, next: `${K.nm(crimeF.by)} va devoir se couvrir`, jobs: ['want'], tech: 'Show character positioning', goal: 'stakes' }); };
      // the ladder: what is left of it, one step per call (the opening may have done the first ones)
      const ladder = (seg) => { if (!crimeOn || !W.hap.has(crimeF.ev) || did('cover')) return false;
        if (!did('matter')) g.matter(crimeF, seg);
        if (!did('theory')) { const th = g.theory(crimeF, seg); if (th) g.react(th, seg); return true; }
        if (!did('lie')) { const th = W.M.filter((m) => m.fact === crimeF.id && m.kind === 'theory').pop(); if (th && !did('react')) g.react(th, seg);
          const at = search(1, seg); if (at && sk === J && !failed) { g.fail(at.line ? D.find((x) => x.id === at.line) : skD, false, seg); failed = true; }
          g.lie(culF, seg, at && at.id); if (!did('clue')) g.clue(crimeF, 1, seg); return true; }
        if (!did('clue2')) { if (crimeF.sus && live(crimeF.sus.id) && !did('clear')) g.clear(crimeF, seg); g.clue(crimeF, 2, seg); return true; }
        const at = search(2, seg); g.cover(crimeF, seg, at && at.id); return true; };
      const sides = [XA, XB].filter((x) => x && !(crimeOn && sk === J && x.k === 'justice'));
      for (let r = 1; r <= R; r++) { const seg = `r${r}`, d = sides.length ? sides[(r - 1) % sides.length] : null;
        // something else happens (« soudain »): an event of the act not placed yet
        const ev2 = later.shift(); if (ev2) g.event(ev2, seg);
        let mv = null;
        if (d) { const at = g.attempt(d, r, seg); if (!failed && !(crimeOn && sk === J && !did('lie'))) { g.fail(d, false, seg); failed = true; }
          const F0 = answerer(d); mv = F0 ? g.move(F0, seg, at && at.id, false, d) : null; if (mv && mv.target && mv.target !== J && r <= 2) g.react(mv, seg); }
        ladder(seg);
        // the other secrets: planted in round 1, in a moment where their keeper is; a second seed, far from the first
        if (r === 1) for (const f of ACT.late || []) g.seed(f, 1, seg, W.M.filter((m) => m.seg === seg && m.act === a && m.kind !== 'seed').find((m) => m.who.includes(f.by)) || null);
        if (r === 2) plansAll.filter((f) => f.mode === 'twist' || f.mode === 'motive').forEach((f) => g.seed(f, 2, seg, W.M.filter((m) => m.seg === seg && m.act === a && m.kind !== 'seed')[0] || null));
        if (r === 2 || R === 2) { const can = [XA, XB].filter((x) => x && !(crimeOn && x.k === 'justice' && (W.lvl[x.id] || 0) >= 1)).sort((x, y) => (W.lvl[x.id] || 0) - (W.lvl[y.id] || 0) || (x === d) - (y === d)); if (can[0]) g.raise(can[0], seg, mv ? mv.id : undefined); }
        if (K.S.hard && K.S.hard.clock && r === R - 1) { const ck = forces.find((f) => f.kind === 'clock'); if (ck) g.move(ck, seg); }
      }
      // 5 · he finds: the proof someone saw, and it vanishes (the end of the ladder); else the line he cares most about gets closer
      if (crimeOn) { for (let k = 0; k < 3 && ladder('mid'); k++); }
      else { const fd = won || XA; if (fd && (W.lvl[fd.id] || 0) < 2) g.raise(fd, 'mid'); }
      // what the destination needs and the story has not done yet (Phase D, backward): someone the choice will cost, never
      // seen this act, gets their moment before it (else the price costs nothing)
      const attached = (d) => W.M.some((m) => m.act === a && ['care', 'raise', 'move', 'want'].includes(m.kind) && (m.target === d.t || m.actor === d.t || (m.kind === 'want' && m.line === d.id)));
      for (const d of [XA, XB]) if (d && d.t && live(d.t) && !attached(d)) g.care(J, d.t, d.k === 'love' ? 'love' : 'protect', 'mid');
      // 6 · it costs: the worst of his flaw
      if (!failed) { g.fail(lost || XB || XA, false, 'take'); failed = true; }
      g.fail(lost || XB || XA, true, 'take');
      // 7 · the return: the truths that must come before the choice, then the force, both sides at their worst, his choice
      const dueReveal = facts.filter((f) => (f.mode === 'mystery' || f.mode === 'twist' || f.mode === 'irony' || f.kind === 'object' || f.kind === 'link') && f.act === a);
      const isPrice = (f) => f.by === J && [XA, XB].some((d) => d && d.k === 'hide' && d.who === J);
      for (const f of dueReveal.filter((x) => x !== crimeF && x.kind !== 'object' && !isPrice(x))) g.reveal(f, 'crisis');
      for (const f of dueReveal.filter((x) => x.kind === 'object')) g.reveal(f, 'crisis');
      if (crimeF && (crimeF.kind === 'gone' || crimeOn)) g.reveal(crimeF, 'crisis');
      const fx = forces.find((f) => f.who === dest.forcer && live(f.who)) || forces.find((f) => f.kind === 'culprit' && f.who === W.exposed && live(f.who)) || forces.find((f) => f.who !== J && f.kind !== 'clock' && live(f.who)) || forces.find((f) => f.kind === 'clock');
      const force = fx ? g.move(fx, 'crisis', undefined, true) : null; if (force) dest.forced = force.id;
      for (const d of [XA, XB]) if (d && (W.lvl[d.id] || 0) < 3 && !(force && d.t && force.actor === d.t)) { W.lvl[d.id] = 2; g.raise(d, 'crisis'); }
      const dm = g.decide('crisis'); if (dm) dest.decided = dm.id;
      // 8 · the price, what he got, the last image (or what the next act opens on)
      g.gain('end'); g.price('end'); g.turn('end');
      ACT.to = W.M.length;
      // what had to come before the climax (Phase D), and where it is
      const before = (pred) => { const at2 = W.M.findIndex((m) => m.id === dest.decided); const hit = W.M.slice(ACT.from, at2 < 0 ? ACT.to : at2).find(pred); return hit ? hit.id : null; };
      const weighs = (d) => (m) => (m.line === d.id && m.kind === 'raise') || (d.t && m.actor === d.t && ['raise', 'move', 'force'].includes(m.kind));
      if (XA) dest.pre.push({ fr: `${up(K.lab(XA))} existe et pèse (le public sait ce que Justin y perdrait)`, at: before(weighs(XA)) });
      if (XB) dest.pre.push({ fr: `${up(K.lab(XB))} existe et pèse`, at: before(weighs(XB)) });
      if (fx) dest.pre.push({ fr: `${fx.who === 'clock' ? 'Le temps' : N(fx.who)} force le choix`, at: dest.forced || null });
      dest.pre.push({ fr: 'Sa faille l’a déjà fait échouer (le choix est une victoire sur elle)', at: before((m) => m.kind === 'fail') });
      for (const d of [XA, XB]) if (d && d.k === 'justice' && crimeF) dest.pre.push({ fr: `Justin sait la vérité (${crimeF.q.replace(/ \?$/, '')})`, at: before((m) => m.kind === 'reveal' && m.fact === crimeF.id) });
      if (lost && lost.t) dest.pre.push({ fr: `On s’est attaché à ${K.nm(lost.t)} (sinon le prix ne coûte rien)`, at: before((m) => ['care', 'raise', 'move', 'want'].includes(m.kind) && (m.target === lost.t || m.actor === lost.t || (m.kind === 'want' && m.line === lost.id))) });
      for (const f of facts.filter((x) => x.mode === 'mystery' && x.kind === 'crime' && x.hidden)) dest.pre.push({ fr: `Deux vrais indices avant la réponse à « ${f.q} »`, at: W.M.filter((m) => m.fact === f.id && (m.kind === 'clue' || m.kind === 'cover')).length >= 2 ? W.M.filter((m) => m.fact === f.id && (m.kind === 'clue' || m.kind === 'cover'))[1].id : null });
      dest.hidden = facts.filter((f) => f.act > a).map((f) => f.truth);
    }
    return W;
  }

  // ==== G · EPISODES. Episode 1 = the opening (played, ~2 minutes). Then one episode per part of the circle (each search
  // round, then « il trouve + il paie », the return, the end): 2 to 5 slides each; a longer one is cut at its turn ====
  function allocate(W) {
    const eps = [], segOrder = ['open', 'r1', 'r2', 'r3', 'mid', 'take', 'crisis', 'end'];
    for (const ACT of W.acts) { const Ms = W.M.slice(ACT.from, ACT.to), by = new Map();
      for (const m of Ms) { const s = m.seg === 'mid' ? 'take' : m.seg; if (!by.has(s)) by.set(s, []); by.get(s).push(m); }
      const parts = segOrder.filter((s) => by.has(s)).map((s) => ({ seg: s, M: by.get(s) }));
      // too short: joins the next part; too long (not the opening): cut in two
      const out = []; for (const p of parts) { const prev = out[out.length - 1];
        if (prev && prev.seg !== 'open' && prev.M.length < 2) { prev.M.push(...p.M); prev.seg = p.seg; continue; } out.push({ ...p, M: p.M.slice() }); }
      if (out.length > 1 && out[out.length - 1].M.length < 2) { const z = out.pop(); out[out.length - 1].M.push(...z.M); }
      for (const p of out) { if (p.seg === 'open' && ACT.a === 1) { eps.push({ act: ACT.a, seg: p.seg, M: p.M, open: true }); continue; }
        if (p.M.length <= 5) { eps.push({ act: ACT.a, seg: p.seg, M: p.M }); continue; }
        const h = Math.ceil(p.M.length / 2); eps.push({ act: ACT.a, seg: p.seg, M: p.M.slice(0, h) }, { act: ACT.a, seg: p.seg, M: p.M.slice(h) }); } }
    // what each episode does (Phase G): what changes, its turn, what stays open, what is kept for later; and the audience at its end
    const L = ledger(); eps.forEach((E, n) => { E.n = n + 1; for (const m of E.M) { L.apply(m); m.ep = n + 1; }
      E.changes = E.M.flatMap((m) => m.world).filter(Boolean); E.turn = E.M[E.M.length - 1]; E.aud = L.snap();
      E.circle = [...new Set(E.M.map((m) => m.circle))].sort((x, y) => x - y).map((c) => CIRCLE[c][0]);
      E.slides = E.M.map((m) => ({ fr: [m.slide, ...m.also.filter((x) => !/^Le public/.test(x.fr)).map((x) => x.fr)].join(' '), who: m.who, id: m.id })); });
    return eps;
  }
  // the audience, moment by moment: what it knows, what it suspects (theories), what it wonders, what it believes wrongly,
  // what only it knows (irony), whom it cares for
  function ledger() {
    const K2 = { knows: [], qs: new Map(), th: new Map(), wrong: [], irony: [], cares: [] };
    return { apply(m) { for (const x of m.aud) { if (x.k === 'learn') K2.knows.push(x.fr); if (x.k === 'q' && x.ref) K2.qs.set(x.ref, x.fr); if (x.k === 'suspect') K2.th.set(x.ref, x.fr);
      if (x.k === 'clear') { K2.wrong.push(x.fr); K2.th.delete(x.ref); } if (x.k === 'answer') { K2.qs.delete(x.ref); K2.th.delete(x.ref); K2.knows.push(x.fr); } if (x.k === 'irony') K2.irony.push(x.fr); if (x.k === 'care') K2.cares.push(x.fr); } },
      snap: () => ({ knows: K2.knows.slice(-6), wonders: [...K2.qs.values()], suspects: [...K2.th.values()], wrong: K2.wrong.slice(), irony: K2.irony.slice(), cares: K2.cares.slice(-3) }) };
  }

  // ---- the whole thing, computed once per state ----
  function movie() {
    K = FORGE.core(); const sig = JSON.stringify([K.S.cast, K.S.pil, K.S.flaw, K.S.want, K.S.rel, K.S.infos, K.S.ev, K.S.links, K.S.acts, K.S.seed, K.S.hard, K.S.open, K.S.tq, (K.S.picked || {}).pick]);
    if (CACHE && CACHE.sig === sig) return CACHE.v;
    const W = build(), eps = allocate(W), v = { W, eps, acts: W.acts, opening: W.acts[0] && W.acts[0].op };
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
      for (const m of v.W.M.filter((x) => x.act === a)) { L.push(`#${m.id} [${CIRCLE[m.circle][0]} · ép. ${m.ep}] ${m.fr}${m.also.length ? ` (+ ${m.also.map((x) => x.fr).join(' ')})` : ''}`);
        L.push(`      ← ${m.cause ? `#${m.cause} (${({ donc: 'donc', mais: 'mais', soudain: 'soudain' })[m.link] || m.link})` : 'rien avant'} · ${m.actor ? N(m.actor) : '—'}${m.desire ? ` (${m.desire})` : ''} → ${m.action}`);
        L.push(`      monde : ${m.world.join(' ; ') || '—'} · public : ${m.aud.map((x) => `${({ q: '❓', learn: '💡', suspect: '🤨', clear: '✖', answer: '✅', care: '❤️', fear: '😨', irony: '🙈', reframe: '🔄', hope: '🤞' })[x.k] || ''} ${x.fr}`).filter((s) => s.trim()).join(' ; ') || '—'}`);
        L.push(`      intrigue : ${m.plot} · ensuite : ${m.next || '—'} · rôles : ${m.jobs.map((j) => JOB[j] || j).join(', ')}`); } });
    L.push('', 'G · LES ÉPISODES');
    for (const E of v.eps) { L.push('', `Épisode ${E.n}${E.open ? ' (l’ouverture : 2 minutes, jouée)' : ` (${E.slides.length} diapos)`} · acte ${E.act} · ${E.circle.join(' → ')}`);
      L.push(dash(`Ce qui change : ${E.changes.slice(0, 4).join(' ; ') || '—'}`), dash(`Le tournant : #${E.turn.id} ${E.turn.fr}`));
      L.push(dash(`À la fin, le public sait : ${E.aud.knows.join(' · ') || '—'}`), dash(`Il se demande : ${E.aud.wonders.join(' · ') || '—'}`), dash(`Il soupçonne : ${E.aud.suspects.join(' · ') || '—'}`));
      if (E.aud.irony.length) L.push(dash(`Lui seul sait : ${E.aud.irony.join(' · ')}`)); if (E.aud.wrong.length) L.push(dash(`Il a soupçonné à tort : ${E.aud.wrong.join(' · ')}`)); }
    return L.join('\n');
  }

  // ---- episode 1 as a plan (the format of Plan de scène): prompt2 writes its lines, passive (the characters choose) ----
  function openingPlan() {
    const v = movie(), E = v.eps[0], ids = {}; let n = 0;
    const present = (m) => [...new Set([J, ...m.who])].filter((p) => p === J || K.S.cast.includes(p)).map((p) => ({ id: p, name: K.nm(p), wants: p === m.actor ? m.desire : (() => { const d = K.storyAt(1).D.filter((x) => x.who === p && x.s >= 2).sort((x, y) => y.s - x.s)[0]; return d ? K.dSay(d) : ''; })() }));
    const beats = E.M.map((m) => { const id = `r${++n}`; ids[m.id] = id; const pre = m.link === 'mais' ? 'Mais : ' : m.link === 'soudain' ? 'Soudain : ' : '';
      return { id, goals: m.goal ? [m.goal] : [], tech: m.tech || '', lines: m.kind === 'event' || m.kind === 'turn' ? 4 : 3, what: `${pre}${m.fr}${m.also.length ? ` En même temps : ${m.also.map((x) => x.fr).join(' ')}` : ''}${m.actor && m.desire ? ` (${N(m.actor)} : ${m.desire})` : ''}`,
        present: present(m), ...(m.kind === 'decide' ? { decides: m.actor } : {}) }; });
    const links = []; for (const m of E.M) if (m.cause && ids[m.cause] && ids[m.cause] !== ids[m.id] && ['clue', 'cover', 'reveal', 'react', 'clear'].includes(m.kind)) links.push({ from: ids[m.cause], to: ids[m.id], label: 'cause → effet' });
    const next = v.eps[1] ? v.eps[1].M.slice(0, 2).map((m, k) => ({ id: `f${k + 1}`, goals: [], tech: '', lines: 1, what: m.fr })) : [];
    const hid = v.acts.flatMap((ACT) => ACT.facts.filter((f) => f.hidden && f.mode !== 'irony').map((f) => f.truth)), op = v.opening;
    const chars = K.S.cast.filter(K.live).map((id) => ({ id, name: K.nm(id), sprite: K.sprite(id), poses: ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'].filter((p) => window.SPRITES && SPRITES[K.sprite(id)] && SPRITES[K.sprite(id)].poses[p]),
      traits: K.pillarsOf(id).map((p) => K.P[p].n.replace(/^L[ea’] ?/, '')), voice: K.voiceOf(id, 1), acts: K.traitTxt(K.traitsOf(id, 1)).map((x) => x[1]).join(', ') || 'nothing extreme' }));
    const facts = [...K.graph().facts.map((f) => f[0]), ...E.M.filter((m) => m.kind === 'clue' || m.kind === 'event').map((m) => m.fr)];
    return { title: `${(op && op.q) || 'Créer'} · épisode 1`, scene: 'taverne', passive: true, turn: E.turn.fr, needs: [], facts,
      story: { episode: 1, of: v.eps.length, act: 1, known: [], hidden: hid, open: [], dead: [], recipe: op ? `${op.n} : ${op.engage}. La question du public : ${op.q}` : '' },
      chars, player: { id: J, name: 'Justin', traits: K.pillarsOf(J).map((p) => K.P[p].n.replace(/^L[ea’] ?/, '')), voice: K.voiceOf(J), acts: K.traitTxt(K.traitsOf(J, 1)).map((x) => x[1]).join(', ') || 'nothing extreme' },
      infos: [], boxes: [{ id: 'ep', title: 'Épisode 1', col: 0, beats }, { id: 'later', title: 'Plus tard', col: 1, beats: next }], links };
  }
  const epPrompt = () => { PLAN.add(openingPlan()); return PLAN.prompt2(); };

  // ---- the black screens: « Épisode 2 », then its slides, one sentence at a time (never a lot of words at once), until the end ----
  let stEl = null;
  function slides(from = 2, opt = {}) {
    const v = movie(), eps = v.eps.filter((E) => E.n >= from); if (!eps.length) return null; style();
    if (stEl) stEl.remove(); const el = document.createElement('div'); el.id = 'orSl'; document.body.appendChild(el); stEl = el;
    // the steps: a title card per episode, then each slide cut in its sentences (each tap adds the next one)
    const steps = []; for (const E of eps) { steps.push({ title: `Épisode ${E.n}`, sub: E.act > 1 && E === eps.find((x) => x.act === E.act) ? `Acte ${E.act}` : '' });
      for (const s of E.slides) { const parts = String(s.fr).match(/[^.!?»]+[.!?]+(?:\s*»)?|[^.!?]+$/g) || [s.fr]; parts.map((p) => p.trim()).filter(Boolean).forEach((p, k, all) => steps.push({ slide: s, part: p, k, of: all.length })); } }
    steps.push({ title: 'Fin', sub: '' });
    let i = -1; const shown = [];
    const draw = () => { const s = steps[i];
      if (s.title) { shown.length = 0; el.innerHTML = `<button type="button" class="orX" data-x="1">✕</button><div class="orT"><h1>${esc(s.title)}</h1>${s.sub ? `<p>${esc(s.sub)}</p>` : ''}</div><small class="orH">touche pour continuer</small>`; return; }
      if (s.k === 0) shown.length = 0; shown.push(s.part);
      const faces = (s.slide.who || []).filter((p) => K.img(p)).slice(0, 3).map((p) => `<img src="${K.img(p)}" alt="">`).join('');
      el.innerHTML = `<button type="button" class="orX" data-x="1">✕</button><div class="orS">${faces ? `<div class="orF">${faces}</div>` : ''}${shown.map((p, k) => `<p class="${k === shown.length - 1 ? 'new' : ''}">${esc(p)}</p>`).join('')}</div>`; };
    const close = () => { el.remove(); stEl = null; removeEventListener('keydown', key); if (opt.onClose) opt.onClose(); };
    const next = () => { if (i + 1 >= steps.length) return close(); i++; draw(); }, prev = () => { if (i <= 0) return; i--; while (i > 0 && !steps[i].title && steps[i].k !== 0) i--; draw(); };
    const key = (e) => { if (e.key === 'Escape') close(); else if (['ArrowRight', 'Enter', ' '].includes(e.key)) { e.preventDefault(); next(); } else if (e.key === 'ArrowLeft') prev(); };
    el.onclick = (e) => { if (e.target.closest('[data-x]')) return close(); next(); }; addEventListener('keydown', key);
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
#orSl .orS{max-width:640px;width:100%;padding:0 22px;box-sizing:border-box}#orSl .orS p{margin:0 0 .7em;font-size:24px;color:#aeaeb2}#orSl .orS p.new{color:#f5f5f7;animation:orIn .45s ease}
#orSl .orF{display:flex;gap:10px;margin-bottom:18px}#orSl .orF img{width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:50% 12%;background:#1c1c1e}
@keyframes orIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`;
    document.head.appendChild(st); }

  // what Créer v2 shows: the recipe, the question, how many episodes
  function summary() { const v = movie(), o = v.opening; return { recipe: o ? o.n : '', engage: o ? o.engage : '', q: o ? o.q : '', eps: v.eps.length, open: v.eps[0] ? v.eps[0].M.length : 0 }; }
  return { movie, text, openingPlan, epPrompt, slides, read, summary, RECIPES, CIRCLE };
})();
