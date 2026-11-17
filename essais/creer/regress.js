// ---- Créer · regression (16/11). Needs Playwright and the repo served locally:
//   python3 -m http.server 8765      (in the repo)
//   node essais/creer/regress.js 40  (40 random stories 🎲 after the named ones, half of them in 2 acts)
// It checks what must hold in any story: nobody dead acts or is « present », no choice with the same side twice, every
// question and every seed is paid, no text is undefined, planOf / seed / plotText do not throw, every link of the graph
// points to something that exists. It does not READ the
// story: after a change of the engine, read FORGE.plotText() of two or three stories as a screenwriter ----
const { chromium } = require('playwright'); const T = require('./histoires.js');
const URL = process.env.SMT_URL || 'http://localhost:8765/index.html';
async function open(state, example) {
  const browser = await chromium.launch(), page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage(), errs = [];
  page.on('pageerror', (e) => errs.push(String(e))); page.on('console', (m) => { if (m.type() === 'error' && !/hivemq|403|rate limit/.test(m.text())) errs.push(m.text()); });
  await page.addInitScript((st) => { localStorage.setItem('smt-open', '323'); if (st) localStorage.setItem('smt-forge2', JSON.stringify(st)); }, state);
  await page.goto(URL, { waitUntil: 'load' }); await page.waitForTimeout(800);
  await page.evaluate(() => { const w = document.querySelector('#warn'); if (w) w.remove(); document.querySelector('#forgeBtn').click(); }); await page.waitForTimeout(400);
  if (example) { await page.evaluate(() => document.querySelector('#forgeBody [data-x="example"]').click()); await page.waitForTimeout(500); }
  return { browser, page, errs };
}
const check = () => { const out = [], EPS = FORGE.episodes(), TH = EPS.threads || [], dead = new Set();
  EPS.forEach(({ list }, n) => { let plan = null; try { plan = FORGE.planOf(n); } catch (e) { out.push(`planOf(${n}) throws ${e.message}`); }
    if (plan) for (const b of plan.boxes[0].beats) for (const p of b.present || []) if (dead.has(p.id)) out.push(`ep${n + 1}: dead ${p.id} present in "${b.what.slice(0, 50)}"`);
    const load = list.reduce((t, b) => t + 1 + (b.rides || []).length * 0.5, 0); if (load > 14.5) out.push(`ep${n + 1}: load ${load}`);
    for (const b of list) { if (b.ev && b.ev.k === 'murder' && b.ev.v) dead.add(b.ev.v);
      for (const z of [b, ...(b.rides || [])]) { if (z.fr == null || /undefined|NaN|\[object/.test(String(z.fr) + String(z.en))) out.push(`ep${n + 1}: bad text ${z.id} [${z.kind}] ${z.fr}`);
        if (['dshow', 'conflict', 'stake', 'easy', 'clue'].includes(z.kind) && !z.choiceOf && (z.who || []).length && dead.has(z.who[0])) out.push(`ep${n + 1}: dead ${z.who[0]} acts in ${z.id}`); }
      if (b.choice) { const [a, c] = b.opts, [d1, d2] = b.desires || []; if (a[0] === c[0]) out.push(`ep${n + 1}: same options "${a[0]}"`); if (!d1 || !d2) out.push(`ep${n + 1}: choice without two desires`);
        else if (d1.t && d1.t === d2.t && ['love', 'protect', 'find'].includes(d1.k) && ['love', 'protect', 'find'].includes(d2.k)) out.push(`ep${n + 1}: same side ${b.fr}`); }
      if (b.kind === 'pick' && b.opts[0] === b.opts[1]) out.push(`climax with the same side twice: ${b.fr}`); } });
  for (const t of TH) { if ((t.kind === 'q' || t.kind === 'seed') && !t.done) out.push(`open at the end: ${t.kind} ${t.fr}`); if (!t.steps.length) out.push(`empty thread ${t.id}`); }
  try { const s = FORGE.seed(); if (!s.text || /undefined/.test(s.text + s.ep1)) out.push('seed has undefined'); } catch (e) { out.push('seed throws ' + e.message); }
  try { if (/undefined|NaN/.test(FORGE.plotText())) out.push('plotText has undefined'); } catch (e) { out.push('plotText throws ' + e.message); }
  // the links in the story (17/11): a hidden link's clue comes before it comes out; a chain tied to a secret is told on its reveal, never before
  const at = {}; EPS.forEach(({ list }, n) => list.forEach((b) => [b, ...(b.rides || [])].forEach((z) => { if (/^(lcl|lrev|tie)\d/.test(z.id)) at[z.id] = { n, b }; })));
  for (const id of Object.keys(at)) { const k = id.replace(/^\D+/, ''); if (id.startsWith('lcl') && at[`lrev${k}`] && at[id].n >= at[`lrev${k}`].n) out.push(`clue after its reveal: ${id}`);
    if (id.startsWith('lcl') && !at[`lrev${k}`]) out.push(`clue never paid: ${id}`); }
  // the graph (step 1, 17/11): every stored link has a known kind and both its ends exist
  const S = JSON.parse(localStorage.getItem('smt-forge2') || '{}'), ok = (r) => { const t = r && r[0], v = r && r.slice(2), n = +v;
    const by = (L) => (L || []).some((x) => x.id === v), pp = (id) => id === 'justin' || (S.cast || []).includes(id);
    return t === 'p' ? pp(v) : t === 'i' ? !!(S.infos || [])[n] : t === 'e' ? !!(S.ev || [])[n] : t === 't' ? by(S.things) : t === 'f' ? by(S.figs) : t === 'm' ? by(S.moments) : t === 'l' ? by(S.places)
      : t === 'd' ? pp(v.split(':')[0]) : false; };
  for (const l of S.links || []) { const K = FILS.LINK[l.k]; if (!K || !ok(l.a) || !ok(l.b) || !K.a.includes(FILS.END[l.a[0]]) || !K.b.includes(FILS.END[l.b[0]])) out.push(`bad link ${l.a} ${l.k} ${l.b}`); }
  // 🎲 un lien de plus, 3 times: the chain grows with links that hold
  for (let g = 0; g < 3; g++) document.querySelector('#forgeBody [data-ggrow]')?.click();
  const S2 = JSON.parse(localStorage.getItem('smt-forge2') || '{}'); for (const l of (S2.links || []).filter((x) => x.by)) if (!FILS.LINK[l.k] || !FILS.LINK[l.k].a.includes(FILS.END[l.a[0]]) || !FILS.LINK[l.k].b.includes(FILS.END[l.b[0]])) out.push(`bad grown link ${l.a} ${l.k} ${l.b}`);
  try { if (/undefined|NaN|\?\s—|— \?/.test(FORGE.seed().text)) out.push('grown links: undefined or ? in the seed'); } catch (e) { out.push('seed throws after 🎲 un lien de plus: ' + e.message); }
  const knots = EPS.reduce((t, e) => t + e.list.filter((b) => new Set([b, ...(b.rides || [])].flatMap((z) => (z.mv || []).map((m) => m[0]))).size >= 3).length, 0);
  return { out, eps: EPS.length, th: TH.length, knots }; };
(async () => {
  const N = +(process.argv[2] || 30); let bad = 0;
  for (const [name, st] of Object.entries(T)) { const { browser, page, errs } = await open(st === 'EX' ? null : st, st === 'EX'), r = await page.evaluate(check);
    console.log(`${r.out.length || errs.length ? '✗' : '✓'} ${name}: ${r.eps} épisodes, ${r.th} fils, ${r.knots} nœuds${r.out.length ? '\n   ' + r.out.join('\n   ') : ''}${errs.length ? '\n   ERR ' + errs.join(' | ') : ''}`); bad += r.out.length + errs.length; await browser.close(); }
  const { browser, page, errs } = await open(null, false);
  for (let i = 0; i < N; i++) { await page.evaluate((two) => { document.querySelector('#forgeBody [data-x="dice"]').click(); const b = document.querySelector(`#forgeBody [data-acts="${two ? 2 : 1}"]`); if (b) b.click(); }, i % 2 === 1); await page.waitForTimeout(60);
    const r = await page.evaluate(check); if (r.out.length) { bad += r.out.length; console.log(`✗ 🎲 ${i} (${i % 2 ? 2 : 1} acte) : ${r.out.slice(0, 6).join(' · ')}\n   ${(await page.evaluate(() => localStorage.getItem('smt-forge2'))).slice(0, 700)}`); } }
  bad += errs.length; if (errs.length) console.log('PAGE ERRORS', errs.slice(0, 5));
  console.log(`\n${N} tirages 🎲 : ${bad ? bad + ' problème(s)' : 'aucun problème'}`);
  await browser.close(); process.exit(bad ? 1 : 0);
})();
