// ---- Créer · la grille de Justin (18/11), mesurée sur N tirages 🎲 en 2 actes (hasard fixé : deux versions se comparent).
// Le repo servi :  python3 -m http.server 8765  puis  node essais/creer/mesure.js 8765 40
// Ce qu'elle compte : dimensions du monde qui changent à la fin de l'acte 1, bascules, acte 2 ouvert par un événement qui a
// une cause, climax au prix concret, lignes encore en gabarit. Elle ne lit pas l'histoire : lire aussi FORGE.plotText() ----
const { chromium } = require('playwright');
const GEN = ['On rit de', 'un regard qui dure trop', 'Une chaise vide', 'jamais dite à personne', 'La menace se rapproche', 'On humilie', 'Plus personne ne croit', 'quelque chose', 's’approche du secret', 'trouve la preuve d’être la cible', 'compte sur', 'Une dernière ligne'];
(async () => { const port = process.argv[2], N = +(process.argv[3] || 40), browser = await chromium.launch(), page = await (await browser.newContext()).newPage();
  await page.addInitScript(() => { let a = 777; Math.random = () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; localStorage.setItem('smt-open', '323'); });
  await page.goto(`http://localhost:${port}/index.html`, { waitUntil: 'load' }); await page.waitForTimeout(800);
  await page.evaluate(() => { document.querySelector('#warn')?.remove(); document.querySelector('#forgeBtn').click(); }); await page.waitForTimeout(300);
  const R = [];
  for (let i = 0; i < N; i++) { R.push(await page.evaluate((GEN) => { document.querySelector('#forgeBody [data-x="dice"]').click(); document.querySelector('#forgeBody [data-acts="2"]').click();
    const t = FORGE.plotText(), st = FORGE.state ? FORGE.state() : { ch: [], arcs: [], fate: null };
    const a2 = t.split('— ACTE 2 —')[1] || '', ev2 = a2.split('\n').find((l) => /soudain (🔥|☠️|🗡️|💰|🐍|👻|⚡)/.test(l)) || '';
    const lines = t.split('CE QUI ARRIVE')[1].split('LES FILS')[0].split('\n').filter((l) => l.trim());
    return { dims: new Set(st.ch.map((c) => c.dim)).size, arcs: st.arcs.length, fate: st.fate ? st.fate.kind : 'aucun',
      cause: /tient .* pour responsable|ne bluffait|pour tenir|sait que|ne pardonne pas|a tout perdu|n’en a pas fini|a tué/.test(ev2), ev2: ev2.trim().slice(0, 140),
      gen: lines.filter((l) => GEN.some((g) => l.includes(g))).length, n: lines.length,
      climax: (t.match(/🅰️ Si [^(]*/) || [''])[0].trim() }; }, GEN)); }
  const avg = (f) => (R.reduce((s, r) => s + f(r), 0) / R.length).toFixed(2), pc = (f) => Math.round(100 * R.filter(f).length / R.length) + ' %';
  console.log(JSON.stringify({ port, N, dimensions_changées: avg((r) => r.dims), bascules: avg((r) => r.arcs), histoires_avec_bascule: pc((r) => r.arcs > 0), acte2_avec_cause: pc((r) => r.cause),
    climax_au_prix_concret: pc((r) => r.fate !== 'aucun'), lignes_gabarit: avg((r) => r.gen), part_gabarit: avg((r) => r.gen / r.n), fates: R.reduce((m, r) => ((m[r.fate] = (m[r.fate] || 0) + 1), m), {}) }, null, 1));
  console.log(R.slice(0, 6).map((r) => `  · climax : ${r.climax}\n    acte 2 : ${r.ev2}`).join('\n'));
  await browser.close(); })();
