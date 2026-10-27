// The 4 tastes' stories (the onboarding's « Ce soir, t'as envie de… »), shared by onboarding.html and Full demo (demo.html):
// each one's world (drawn, no photo), its poster, its episodes. Episode 1 starts with the opening played in the onboarding;
// anything not written yet is a placeholder saying what we should see, marked Incomplet (an episode = 4-5 min).
// Also: the unlock ladder (an app that opens up episode after episode, like Episode), the covers teased behind Explorer's
// lock, and each character's drawing style (Recherche).
(() => {
document.head.insertAdjacentHTML('beforeend', `<style>
/* ---- the worlds ---- */
.art { position: absolute; inset: 0; overflow: hidden; background: #000; }
.art .bg { position: absolute; inset: -6%; }
.art .spr, .cast .spr { position: absolute; transform: translateX(-50%); pointer-events: none; transition: filter .3s, left .4s; }
.a-desir .bg { filter: blur(.5em); background:
  radial-gradient(circle at 18% 22%, rgba(255,110,150,.6) 0 3%, transparent 9%),
  radial-gradient(circle at 78% 16%, rgba(255,185,95,.55) 0 2.5%, transparent 8%),
  radial-gradient(circle at 62% 38%, rgba(255,80,140,.35) 0 4%, transparent 12%),
  radial-gradient(circle at 8% 58%, rgba(255,200,120,.3) 0 3%, transparent 9%),
  radial-gradient(circle at 92% 52%, rgba(255,110,170,.4) 0 3%, transparent 10%),
  radial-gradient(circle at 35% 8%, rgba(255,150,110,.35) 0 2%, transparent 7%),
  radial-gradient(ellipse at 50% 35%, #521628 0%, #1c0711 55%, #070204 100%); }
.a-revanche .bg { background:
  radial-gradient(ellipse 34% 75% at 50% -8%, rgba(255,214,130,.6), rgba(255,200,100,.12) 60%, transparent 75%),
  radial-gradient(circle at 20% 10%, rgba(255,220,150,.5) 0 .5%, transparent 1.5%),
  radial-gradient(circle at 80% 12%, rgba(255,220,150,.5) 0 .5%, transparent 1.5%),
  radial-gradient(circle at 35% 6%, rgba(255,220,150,.4) 0 .4%, transparent 1.2%),
  radial-gradient(circle at 66% 5%, rgba(255,220,150,.4) 0 .4%, transparent 1.2%),
  radial-gradient(ellipse at 50% 105%, rgba(232,194,90,.25), transparent 55%),
  linear-gradient(180deg, #1f170a, #0b0905 70%, #000); }
.a-danger .bg { background: radial-gradient(ellipse 45% 14% at 50% 71%, rgba(255,69,58,.4), transparent 70%), linear-gradient(#05080f, #0b1222 55%, #04060b); }
.a-danger .door { position: absolute; left: 24%; right: 24%; top: 12%; bottom: 31%; border: .8em solid #1e2945; border-bottom: 0;
  background: linear-gradient(90deg, #111a2e, #18233d 50%, #111a2e); box-shadow: 0 0 6em rgba(0,0,0,.7) inset; }
.a-danger .door::before { content: ''; position: absolute; right: 12%; top: 52%; width: 1.4em; height: 1.4em; border-radius: 50%; background: #3a4560; }
.a-danger .door::after { content: ''; position: absolute; left: 0; right: 0; bottom: -.7em; height: .7em;
  background: linear-gradient(90deg, transparent 4%, #ff453a 12%, #ff453a 34%, transparent 38%, transparent 56%, #ff453a 60%, #ff453a 88%, transparent 96%);
  box-shadow: 0 0 2.4em .6em rgba(255,69,58,.45); }
.a-etrange .bg { background:
  radial-gradient(circle at 72% 16%, rgba(235,235,255,.95) 0 4.5%, rgba(180,165,255,.28) 6.5%, transparent 20%),
  radial-gradient(ellipse at 50% 102%, rgba(70,200,170,.28), transparent 58%),
  radial-gradient(ellipse at 15% 70%, rgba(140,110,255,.18), transparent 50%),
  linear-gradient(#0e0822, #170c2e 50%, #06040c); }
.art .spirit { opacity: .5; mix-blend-mode: screen; filter: drop-shadow(0 0 1.6em rgba(167,139,250,.9)) blur(.06em); }
.a-nuit .bg { background: radial-gradient(ellipse 60% 40% at 50% 62%, rgba(80,130,255,.2), transparent 70%), linear-gradient(#020306, #070a14 60%, #020306); }
.a-plage .bg { background: radial-gradient(circle at 50% 46%, #fff3c4 0 6%, rgba(255,200,120,.6) 9%, transparent 22%),
  linear-gradient(#ff9a5c, #ff5f7e 38%, #ff8a6b 47%, #1f6f8b 49%, #0b3d5c 70%, #e9c79a 71%, #c99a68); }
.a-epic .bg { background: radial-gradient(ellipse 70% 40% at 50% 30%, rgba(255,120,40,.7), transparent 70%),
  radial-gradient(ellipse 120% 30% at 50% 78%, #1a0a05 60%, transparent 61%), linear-gradient(#3b0d05, #a3300c 40%, #2a0905 75%, #0b0302); }
.a-horreur .bg { background: radial-gradient(circle at 50% 24%, #ff2a2a 0 12%, rgba(255,30,30,.35) 15%, transparent 32%), linear-gradient(#120203, #050001 70%, #000); }
.a-or .bg { background: radial-gradient(ellipse 40% 70% at 50% -5%, rgba(255,226,140,.75), transparent 72%), linear-gradient(#2b2208, #0d0a03 70%, #000); }
.notif { position: absolute; left: 6%; right: 6%; top: 5%; padding: 1.1em 1.3em; border-radius: 1.8em; background: rgba(44,44,48,.82);
  -webkit-backdrop-filter: blur(1em); backdrop-filter: blur(1em); display: flex; gap: 1em; align-items: center; }
.notif i { width: 3.2em; height: 3.2em; border-radius: .8em; background: #3a3a3e; flex: none; }
.notif b { display: block; font-size: 1.5em; }
.notif span { display: block; font-size: 1.5em; color: #e5e5ea; }
/* a teased cover (Explorer, locked) */
.tz { position: relative; aspect-ratio: 9 / 14; border-radius: 1.4em; overflow: hidden; }
.tz::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 45%; background: linear-gradient(transparent, rgba(0,0,0,.85)); }
.tz b { position: absolute; left: 7%; right: 7%; bottom: 6%; z-index: 1; font-size: 2em; font-weight: 700; letter-spacing: -.02em; line-height: 1.05; color: #f5f5f7; }
/* ---- an episode not written yet, then its end ---- */
.se { position: absolute; inset: 0; z-index: 90; background: #000; color: #f5f5f7; overflow: hidden; }
.se .art { opacity: .35; }
.se-body { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding: 0 8%; overflow-y: auto; }
.se-inc { align-self: flex-start; font-size: 1.4em; font-weight: 700; padding: .35em .9em; border-radius: 2em; background: #ff9f0a; color: #000; margin-bottom: 1.6em; }
.se-k { font-size: 1.7em; color: #86868b; font-weight: 600; }
.se h2 { font-size: 4em; font-weight: 700; letter-spacing: -.025em; line-height: 1.05; margin: .2em 0 .6em; }
.se-sum { font-size: 2.1em; line-height: 1.45; color: #e5e5ea; }
.se-hook { font-size: 2.4em; line-height: 1.35; font-style: italic; color: #f5f5f7; margin: .6em 0 1em; }
.se-go { align-self: stretch; margin-top: 2.4em; padding: 1em; border-radius: 3em; background: #fff; color: #000; font-weight: 700; font-size: 2.1em; display: flex; align-items: center; justify-content: center; gap: .4em; }
.se-go svg { width: 1em; height: 1em; }
.se-home { align-self: center; margin-top: 1.2em; font-size: 1.8em; color: #86868b; font-weight: 600; padding: .5em 1em; }
.se-win { display: flex; align-items: center; gap: 1.6em; margin-top: 1.4em; padding: 1.4em; border-radius: 2em; background: #1c1c1e; }
.se-win .pic { width: 9em; height: 12em; flex: none; border-radius: 1.2em; overflow: hidden; position: relative; background: #2c2c2e; }
.se-win .pic img { position: absolute; left: 50%; top: 4%; height: 190%; transform: translateX(-50%); }
.se-win small { display: block; font-size: 1.5em; color: #86868b; font-weight: 600; }
.se-win b { display: block; font-size: 2.6em; font-weight: 700; margin: .1em 0 .4em; }
.se-win button { font-size: 1.6em; font-weight: 700; padding: .55em 1.1em; border-radius: 2em; background: #fff; color: #000; }
.se-new { margin-top: 1.4em; font-size: 1.9em; font-weight: 700; color: #30d158; }
.se-later { margin-top: 2.4em; font-size: 2em; color: #86868b; }
</style>`);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z"/></svg>';

// ---- the four tastes. poster / row: the characters on the poster and on the strip of « Une question » ([sprite, pose, x %,
// height %, top %, class]); win: who you win at the end of that episode (désir: whoever you fell for). Episode 1's text = what
// comes after the opening, to the end of the episode. ----
const TASTES = {
  revanche: { name: 'La revanche', color: '#e8c25a', title: 'Regarde-moi bien', hook: 'Il y a un an, il a ri de toi devant 200 personnes. Ce soir, tu reviens.',
    poster: [['julian', 'smirk', 50, 104, 8]], row: [['julian', 'smirk', 78, 320, -12]], verb: 'Te venger',
    win: { ep: 2, sprite: 'suit', pose: 'adjust', name: 'Victor' },
    eps: [
      { title: 'La suite du gala', sum: 'Le contrat passe de main en main. Julian rit trop fort, puis plus du tout. Il te prend à part sur la terrasse : d’où vient l’argent ? Toi, tu sais ce qu’il ignore : ce n’est pas ton argent. Victor s’approche et murmure que la personne qui paie veut te voir, ce soir.', end: '« Elle dit que tu lui dois un service. »' },
      { title: 'Celle qui paie', sum: 'Une suite d’hôtel. Diane connaît ton humiliation minute par minute. Elle a acheté la compagnie de Julian à ton nom pour une raison : il a ruiné sa famille aussi. Elle veut une chose : que tu restes près de lui jusqu’à ce qu’il tombe.', end: '« Demain, tu l’invites à souper. Il ne refusera pas. »' },
      { title: 'Le souper', sum: 'Julian arrive en ami, avec des excuses et une bouteille. Il est drôle, presque sincère. Tu commences à douter. Au dessert, il glisse une clé USB sur la table : la vidéo de cette soirée-là, en entier.', end: 'Sur la vidéo, celle qui a tout organisé, ce n’est pas lui. C’est Diane.' },
      { title: 'Deux ennemis', sum: 'Deux ennemis, un seul contrat. Diane veut que tu fermes la compagnie demain matin. Julian veut que tu la sauves. Victor te souffle une info : Diane a déjà fait ça à quelqu’un, avant toi. Choix : à qui tu fais confiance.', end: '« Cette personne-là n’est jamais revenue. »' },
      { title: 'La signature', sum: 'Salle du conseil. Diane, Julian, deux cents actionnaires, comme au gala d’il y a un an. Tout le monde attend ta signature. Cette fois, c’est toi qui tiens le micro. Choix : couler Julian, couler Diane, ou les deux.', end: 'Avant que tu parles, les écrans s’allument. Une vidéo de toi. Celle que personne ne devait voir.' },
    ] },
  desir: { name: 'Le désir', color: '#ff5c8a', title: 'Interdite', hook: 'La blonde de ton meilleur ami te regarde comme ça depuis une heure.',
    poster: [['cam', 'flirty', 56, 108, 9]], row: [['cam', 'flirty', 78, 330, -10]], verb: 'Tomber pour quelqu’un',
    win: { ep: 2, love: true },
    eps: [
      { title: 'La suite du party', sum: 'La porte s’ouvre : {P}, à moitié {p:endormi|endormie}, cherche ses clés. {p:Il|Elle} vous regarde, toi et {LI}, une seconde de trop. Personne ne dit rien. Sur le chemin du retour, ton cell vibre : « On en reparle jamais. » Trois points. Un deuxième texto.', end: '« Sauf demain. Au chalet. 14 h. »' },
      { title: 'Le chalet', sum: '{LI} t’attend avec deux cafés et une excuse toute prête. Vous faites comme si de rien n’était, et ça marche dix minutes. Puis {LI} sort une photo de l’été passé : vous deux, une photo que {P} n’a jamais vue. Choix : la garder ou la déchirer.', end: 'Une auto se stationne dans l’entrée. C’est celle de {P}.' },
      { title: 'Trois à table', sum: '{P} entre de bonne humeur : {p:il|elle} a une surprise pour vous deux. Souper à trois, chaque phrase a un double sens. {LI} te frôle la main sous la table. Puis {P} annonce la surprise : {p:il|elle} va demander {LI} en mariage, et veut que tu sois {me:son témoin|sa témoin}.', end: '« Tu vas dire oui, hein ? T’as jamais su mentir. »' },
      { title: 'Le témoin', sum: '{LI} te coince dans le garage : « Si tu me dis de pas dire oui, je dis non. » Tout repose sur toi. Tu vas voir {P} pour lui parler, et {p:il|elle} te montre la bague, les yeux pleins d’eau. Choix : lui dire ou te taire.', end: 'Ton cell vibre. Un texto de {P}, envoyé à toi par erreur : « Je sais pour l’été. »' },
      { title: 'Je sais', sum: '{P} savait depuis le début : la demande était un test. {p:Il|Elle} vous réunit sur le quai, le soir, et pose une seule question : « Lequel de vous deux me ment depuis un an ? » {LI} te regarde. Choix : te sacrifier ou {li:le|la} laisser tomber.', end: '{LI} répond avant toi. Et ce n’est pas ce que vous aviez prévu.' },
    ] },
  etrange: { name: 'L’étrange', color: '#a78bfa', title: 'Personne se souvient', hook: 'Ce matin, ta sœur n’existe plus. Sauf pour toi.',
    poster: [['isa_nuit', 'listen', 46, 100, 12, 'spirit']], row: [['isa_nuit', 'listen', 74, 300, -8, 'spirit']], verb: 'L’inexpliqué',
    win: { ep: 2, sprite: 'isa_nuit', pose: 'listen', name: 'Emma' },
    eps: [
      { title: 'La suite du matin', sum: 'Maman insiste, tout sourire, pour voir ton téléphone. Tu sors par la porte de derrière. Dehors, les voisins te saluent comme d’habitude, mais la balançoire d’Emma n’est plus dans la cour, comme si elle n’y avait jamais été. Ton cell vibre. Un deuxième vocal, plus faible.', end: '« Si tu m’oublies toi aussi, je disparais pour vrai. »' },
      { title: 'Le miroir', sum: 'À l’école d’Emma, personne ne la connaît. Dans son casier : une liste de noms rayés, et le seul qui ne l’est pas, c’est le tien. Le soir, Emma apparaît dans ton miroir, dix secondes. Elle parle à l’envers. Tu enregistres, tu repasses à l’endroit.', end: '« Avant moi, c’était toi. Tu t’en souviens pas. »' },
      { title: 'Trois couverts', sum: 'Tes photos d’enfance : sur chacune, une place vide à côté de toi, comme si quelqu’un avait été découpé. Le soir, maman met trois couverts. Un pour elle, un pour toi, un pour « ton frère », que tu n’as jamais eu. Des pas dans l’escalier.', end: 'Il a ton visage.' },
      { title: 'Le remplaçant', sum: 'Le « frère » prend ta place : tes amis, ton lit, ton nom. Plus il existe, plus tu t’effaces : tes textos disparaissent, ton reflet tarde. Emma t’explique comment la ramener : quelqu’un doit dire son nom à voix haute, devant la chose. Choix : le faire ce soir ou attendre.', end: '« Mais si tu dis mon nom devant elle, elle saura que tu te souviens. »' },
      { title: 'Dis son nom', sum: 'Souper de famille. La chose qui ressemble à maman, le frère qui a ton visage, une chaise vide. Tout le monde attend que tu oublies. Choix : dire le nom d’Emma, ou garder ta place.', end: 'Tu dis « Emma ». La chaise vide recule toute seule.' },
    ] },
  danger: { name: 'Le danger', color: '#ff453a', title: 'Ouvre pas', hook: '3 h 12. Un texto de ton propre numéro.',
    poster: [], row: [], notif: ['Toi', 'Ouvre pas la porte.'], verb: 'Avoir peur',
    win: { ep: 2, sprite: 'rae', pose: 'kneel', name: 'Léa' },
    eps: [
      { title: 'La suite de la nuit', sum: 'Par l’entrebâillement, « Léa » sourit. Trop. Tu refermes. Elle cogne encore, puis plus rien. Texto de ton numéro : « Bien joué. Va voir dans ta chambre. » Sur ton lit, il y a ton cell. Alors celui que tu tiens dans ta main n’est pas le tien.', end: 'L’écran s’allume. Appel entrant : Léa.' },
      { title: 'La vraie Léa', sum: 'La vraie Léa, paniquée : quelqu’un a vidé son appart et écrit ton nom sur son miroir. Vous vous retrouvez au dépanneur ouvert 24 h. Elle te montre des photos de toi, prises cette semaine, de l’intérieur de chez toi.', end: 'Sur la dernière photo, il y a vous deux. Prise il y a dix secondes.' },
      { title: 'Les règles', sum: 'Les textos continuent, de ton numéro. Celui qui écrit sait ce que tu vas dire avant toi. Une règle : tant que tu obéis, Léa est en sécurité. Première consigne : aller chercher un paquet à une adresse.', end: 'L’adresse, c’est la maison où tu as grandi.' },
      { title: 'La maison', sum: 'La maison est vide depuis des années. Dans ta chambre d’enfant, une boîte de lettres écrites de ta main, que tu n’as jamais écrites. Léa disparaît pendant que tu lis. Choix : la chercher, ou finir la dernière lettre.', end: 'Elle finit par « Ouvre pas la porte ». Elle est datée de demain.' },
      { title: 'Demain', sum: 'Tu as 24 h pour comprendre qui écrit avec ta voix. Tous les indices pointent vers quelqu’un que tu connais trop bien. Le soir, on cogne. Trois coups. Lents. Cette fois, tu ouvres.', end: 'C’est toi.' },
    ] },
};

// ---- the romance's love interest, picked before it starts (onboarding): Cam or Brooke, and the partner you'd betray ----
const LOVE = {
  cam: { name: 'Cam', partner: 'Max', fem: true, partnerFem: false, pose: 'flirty' },
  brooke: { name: 'Brooke', partner: 'Léa', fem: false, partnerFem: true, pose: 'drunk_smile' },
};

// ---- the covers teased behind Explorer's lock: the kinds that sell (beach, epic fantasy, horror, gold) ----
const TEASE = [
  { t: 'Été brûlant', w: 'plage', s: [['mila', 'beach', 34, 112, 12], ['alex', 'beach', 70, 106, 9]] },
  { t: 'Le roi sans couronne', w: 'epic', s: [['amare', 'angry', 50, 100, 12]] },
  { t: 'Sous la lune rouge', w: 'horreur', s: [['ombre', 'stand', 50, 96, 14]] },
  { t: 'La reine d’or', w: 'or', s: [['isa_or', 'holding', 50, 104, 9]] },
  { t: 'Le dernier ninja', w: 'epic', s: [['exile', 'stand', 32, 100, 12], ['ninja', 'stand', 70, 96, 15]] },
  { t: 'Plage privée', w: 'plage', s: [['plage', 'stand', 50, 110, 8]] },
];

// ---- how each character is drawn (Recherche filters by it) ----
const STYLE = {};
for (const [st, ids] of Object.entries({
  semi: ['alex', 'brooke', 'cam', 'dan', 'julian', 'justin', 'justin_bar', 'mila', 'plage', 'rae', 'suit'],
  anime: ['diane', 'exile', 'isa_noir', 'isa_nuit', 'isa_or', 'melissa', 'ninja', 'ruby'],
  cartoon: ['amare', 'belier_blanc', 'belier_noir', 'candy', 'james', 'ombre'],
})) for (const id of ids) STYLE[id] = st;

// ---- progress (this browser): the taste picked at the start (smtDemo.onb {k, me, li}), episodes done per story
// (smtDemo.ser {k: n}), Last call's in the game (smt-ep: the next one to play), « Tout débloqué » (smtDemo.all) ----
const get = (k, d) => { try { const v = localStorage.getItem('smtDemo.' + k); return v ? JSON.parse(v) : d; } catch { return d; } };
const put = (k, v) => { try { localStorage.setItem('smtDemo.' + k, JSON.stringify(v)); } catch { /* private window */ } };
const onb = () => get('onb', null);
const lastCallDone = () => { try { return Math.max(0, ((JSON.parse(localStorage.getItem('smt-ep')) || {}).bar || 0) - 1); } catch { return 0; } };
const episodesDone = () => Object.values(get('ser', {})).reduce((a, b) => a + b, 0) + lastCallDone();
// the app opens up as you play: Social after 2 episodes, then Explorer, Recherche, Créer. A profile from before the
// onboarding (or « Tout débloqué ») has everything.
const LADDER = { social: 2, explore: 3, search: 4, add: 5 };
const LABEL = { social: 'Social', explore: 'Explorer', search: 'Recherche', add: 'Créer' };
const progressive = () => !!onb() && !get('all', false);
const isOpen = (tab) => !progressive() || !LADDER[tab] || episodesDone() >= LADDER[tab];
// the next episode to play: your story's, then Last call's once yours is over
function nextEp() {
  const o = onb(); if (!o || !TASTES[o.k]) return null;
  const n = (get('ser', {})[o.k] || 0) + 1;
  if (n <= TASTES[o.k].eps.length) return { k: o.k, n, title: TASTES[o.k].title };
  const lc = lastCallDone();
  return lc < 3 ? { k: 'lastcall', n: lc + 1, title: 'Last call' } : null;
}
// {LI} their name · {P} the partner · {me:a|b} · {li:a|b} · {p:a|b}: the words that change with the romance's picks
function fill(t) {
  const o = onb() || {}, l = LOVE[o.li] || LOVE.cam;
  return String(t).replace(/\{LI\}/g, l.name).replace(/\{P\}/g, l.partner)
    .replace(/\{(me|li|p):([^|}]*)\|([^}]*)\}/g, (_, k, a, b) => ({ me: o.me === 'f', li: l.fem, p: l.partnerFem })[k] ? b : a);
}
const winOf = (k) => {
  const w = TASTES[k].win, o = onb() || {};
  if (!w.love) return w;
  const id = LOVE[o.li] ? o.li : 'cam';
  return { ep: w.ep, sprite: id, pose: LOVE[id].pose, name: LOVE[id].name };
};

// ---- drawing ----
const spr = (sprite, pose, x, h, top, cls = '') => `<img class="spr ${cls}" src="chars/${sprite}/${pose}.webp" alt="" style="left:${x}%;height:${h}%;top:${top}%">`;
function art(k, withNotif, shape = 'poster') {
  const a = TASTES[k];
  return `<div class="art a-${k}"><div class="bg"></div>${k === 'danger' ? '<div class="door"></div>' : ''}
    ${(a?.[shape] || []).map(([s, p, x, h, t, c]) => spr(s, p, x, h, t, c)).join('')}
    ${withNotif && a?.notif ? `<div class="notif"><i></i><div><b>${esc(a.notif[0])}</b><span>${esc(a.notif[1])}</span></div></div>` : ''}</div>`;
}
const tease = (c) => `<div class="tz"><div class="art a-${c.w}"><div class="bg"></div>${c.s.map(([s, p, x, h, t]) => spr(s, p, x, h, t)).join('')}</div><b>${esc(c.t)}</b></div>`;

// ---- an episode (placeholder until it's written), then its end card: what was won, what opened, the next one ----
// opts: home() back to the app · next(k, n) the next episode (default: right here) · profile(win) put the won character in
// your profile · lastcall() Last call's next episode, in the game
function episode(box, k, n, opts = {}) {
  const T = TASTES[k], ep = T.eps[n - 1];
  box.innerHTML = `<div class="se">${art(k, false)}<div class="se-body">
    <span class="se-inc">Incomplet</span>
    <div class="se-k">${esc(T.title)} · Épisode ${n}</div>
    <h2>${esc(fill(ep.title))}</h2>
    <p class="se-sum">${esc(fill(ep.sum))}</p>
    <button class="se-go" data-x="done">Fin de l’épisode</button></div></div>`;
  box.hidden = false;
  box.onclick = (e) => {
    const b = e.target.closest('[data-x]'); if (!b) return;
    e.stopPropagation();
    if (b.dataset.x === 'done') endOf(box, k, n, opts);
  };
}
function endOf(box, k, n, opts) {
  const T = TASTES[k], ep = T.eps[n - 1], before = episodesDone();
  const ser = get('ser', {}); ser[k] = Math.max(ser[k] || 0, n); put('ser', ser);
  const after = episodesDone();
  const opened = progressive() ? Object.keys(LADDER).filter((t) => before < LADDER[t] && after >= LADDER[t]) : [];
  const w = winOf(k), won = w.ep === n;
  if (won) {   // the game's own list of won characters (Full demo shows them in « Ton perso »)
    try {
      const l = JSON.parse(localStorage.getItem('smt-won')) || [];
      if (!l.some((x) => x.sprite === w.sprite)) { l.push({ sprite: w.sprite, pose: w.pose, name: w.name }); localStorage.setItem('smt-won', JSON.stringify(l)); }
    } catch { /* private window */ }
  }
  const nx = nextEp();
  box.innerHTML = `<div class="se"><div class="se-body">
    <div class="se-k">Fin de l’épisode ${n}</div>
    <p class="se-hook">${esc(fill(ep.end))}</p>
    ${won ? `<div class="se-win"><div class="pic"><img src="chars/${w.sprite}/${w.pose}.webp" alt=""></div><div><small>Tu gagnes</small><b>${esc(w.name)}</b>
      ${opts.profile ? '<button data-x="profile">Ajouter à mon profil</button>' : ''}</div></div>` : ''}
    ${opened.map((t) => `<div class="se-new">Nouveau : ${LABEL[t]}</div>`).join('')}
    ${nx ? `<button class="se-go" data-x="next">${PLAY}${nx.k === k ? `Épisode ${nx.n}` : `${esc(nx.title)} · Épisode ${nx.n}`}</button>` : '<div class="se-later">La suite arrive.</div>'}
    <button class="se-home" data-x="home">Accueil</button></div></div>`;
  box.onclick = (e) => {
    const b = e.target.closest('[data-x]'); if (!b) return;
    e.stopPropagation();
    const x = b.dataset.x;
    if (x === 'home') opts.home && opts.home();
    if (x === 'profile') opts.profile && opts.profile(w);
    if (x === 'next') {
      if (nx.k === 'lastcall') opts.lastcall && opts.lastcall();
      else if (opts.next) opts.next(nx.k, nx.n);
      else episode(box, nx.k, nx.n, opts);
    }
  };
}

window.SERIES = { TASTES, LOVE, TEASE, STYLE, LADDER, LABEL, art, spr, tease, fill, onb, episodesDone, progressive, isOpen, nextEp, episode, set: put, get };
})();
