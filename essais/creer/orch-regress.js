// ---- Créer · the orchestration (orch.js, 23/11). Needs Playwright and the repo served locally:
//   python3 -m http.server 8765      (in the repo)
//   node essais/creer/orch-regress.js 40   (every test story + 40 random draws 🎲, half in 2 acts)
// What must hold in any story (FORGE-ORCHESTRATION.md section 4): every moment has an actor, a cause (except the first of an
// act) and changes something (the world or what the audience knows); nobody dead acts; every hidden crime is answered,
// with 2 real clues before, and the culprit is never named before; every prerequisite of the climax is in place; the
// opening stays in its budget (≤ 8 moments), the other episodes have 1 to 5 slides; the episode-1 prompt is passive. It
// does not READ the story: after a change, read ORCH.text() of two or three stories (🧭 in Créer) as a screenwriter ----
const { chromium } = require('playwright'); const T = require('./histoires.js');
const check = () => { const out = [], v = ORCH.movie(), M = v.W.M, dead = new Set();
  const txt = ORCH.text(); if (/undefined|NaN|\[object/.test(txt)) out.push('text has undefined: ' + (txt.match(/.{40}(undefined|NaN|\[object).{20}/) || [''])[0]);
  for (const m of M) { if (!m.fr || /undefined|NaN|\$\{/.test(m.fr + m.slide)) out.push(`#${m.id} bad text ${m.fr}`);
    { const nm2 = FORGE.core().people().map(FORGE.core().nm).find((n) => [m.fr, ...(m.also || []).map((x) => x.fr)].join(' ').includes(`${n} et ${n}`)); if (nm2) out.push(`#${m.id} « ${nm2} et ${nm2} »: ${m.fr}`); }
    if (!m.actor && !['move', 'force', 'turn'].includes(m.kind)) out.push(`#${m.id} [${m.kind}] no actor`);
    if (m.id > 1 && m.cause == null && !(m.kind === 'want' && m.id === M.find((x) => x.act === m.act).id)) out.push(`#${m.id} [${m.kind}] no cause`);
    if (!m.world.length && !m.aud.length) out.push(`#${m.id} [${m.kind}] changes nothing`);
    if (m.actor && dead.has(m.actor) && !['price', 'gain'].includes(m.kind)) out.push(`#${m.id} dead ${m.actor} acts: ${m.fr}`);
    if (m.kind === 'event' && m.ev && m.ev.k === 'murder' && m.ev.v) dead.add(m.ev.v); if (m.kind === 'deed' && m.target && /tue /.test(m.fr)) dead.add(m.target); if (m.kind === 'price' && /meurt/.test(m.fr) && m.target) dead.add(m.target); }
  for (const A of v.acts) { for (const p of A.dest.pre) if (!p.at) out.push(`acte ${A.a}: prérequis manquant: ${p.fr}`);
    // Justin's own crime (the inverted detective, 24/11): the audience sees it before it is found, the hunter acts, he covers
    // at least twice, and « will he be caught? » gets its answer
    for (const f of A.facts.filter((x) => x.kind === 'crime' && x.hidden && x.by === 'justin')) { const dd = M.find((m) => m.kind === 'deed' && m.fact === f.id), ev = M.find((m) => m.kind === 'event' && m.fact === f.id);
      if (!dd || !ev || dd.id > ev.id) out.push(`acte ${A.a}: Justin's crime not seen before it is found`);
      if (M.filter((m) => m.kind === 'coverJ' && m.fact === f.id).length < 2) out.push(`acte ${A.a}: Justin covers less than twice`);
      if (!M.some((m) => m.force === 'hunter' && m.fact === f.id)) out.push(`acte ${A.a}: nobody hunts Justin`);
      if (!M.some((m) => m.kind === 'answerJ' && m.fact === f.id)) out.push(`acte ${A.a}: « will he be caught? » never answered`); }
    for (const f of A.facts.filter((x) => x.kind === 'crime' && x.hidden && x.by !== 'justin')) { const rv = M.find((m) => ['reveal', 'notice'].includes(m.kind) && m.fact === f.id);   // the audience's answer: in front of all, or with Justin alone if (!rv) { out.push(`acte ${A.a}: ${f.q} never answered`); continue; }
      // the fair-play pointers: a clue found, the proof that vanished, the alibi that will collapse, the culprit's « arrête de chercher », a seed of the motive
      const cl = M.filter((m) => m.id < rv.id && ((m.fact === f.id && ['clue', 'clue2', 'cover', 'lie'].includes(m.kind)) || (m.actor === f.by && /Arrête de chercher|a peur de quelque chose/.test(m.fr)) || (m.also || []).some((x) => /^semé/.test(x.why || '')))).length; if (cl < 2) out.push(`${f.q}: ${cl} clue(s) before the answer`);
      const bad = M.find((m) => m.id < rv.id && m.fact !== f.id && new RegExp(`C’était ${FORGE.core().nm(f.by)}`).test(m.fr)); if (bad) out.push(`culprit named early #${bad.id}`); } }
  for (const L of v.W.loops || []) if (!L.paid) out.push(`loop never closed: ${L.k} « ${L.fr} » (opened #${L.open})`);
  const pub = M.filter((m) => m.kind === 'reveal' && m.world.some((w) => /tout le monde sait/.test(w))); for (const m of M) if (m.kind === 'force' && /tu te tais|Un mot, et|Dis-le, et/.test(m.fr) && pub.some((p) => p.act === m.act && p.id < m.id && p.fact === m.fact)) out.push(`#${m.id} asks for silence after the truth is public`);
  if (v.acts.length === 2 && v.acts[0].dest.dec.won && FORGE.state().won && FORGE.core().lab(v.acts[0].dest.dec.won) !== FORGE.state().won[0]) out.push(`the two engines disagree on the climax: ${FORGE.core().lab(v.acts[0].dest.dec.won)} / ${FORGE.state().won[0]}`);
  if (JSON.parse(localStorage.getItem('smt-forge2') || '{}').pickAuto) out.push('ORCH wrote into the state');
  const E = v.eps; if (E[0] && E[0].M.length > 8) out.push(`opening ${E[0].M.length} moments`); for (const e of E.slice(1)) if (e.slides.length > 5 || e.slides.length < 1) out.push(`ep${e.n} ${e.slides.length} slides`);
  try { const p = ORCH.openingPlan(); if (!p.boxes[0].beats.length) out.push('empty opening plan'); PLAN.add(p); const t = PLAN.prompt2(); if (/undefined/.test(t)) out.push('prompt2 undefined'); if (!/watch|regarde|no choice|NO CHOICE/i.test(t)) out.push('prompt2 not passive'); } catch (e) { out.push('openingPlan/prompt2 throws ' + e.message); }
  return { out, eps: E.length, m: M.length, r: v.opening ? v.opening.r : '-' }; };
(async () => { const N = +(process.argv[2] || 20); let bad = 0;
  const browser = await chromium.launch(), page = await (await browser.newContext({ viewport: { width: 1200, height: 800 } })).newPage(), errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.addInitScript(() => localStorage.setItem('smt-open', '323')); await page.goto((process.env.SMT_URL || 'http://localhost:8765/index.html'), { waitUntil: 'load' }); await page.waitForTimeout(800);
  await page.evaluate(() => { const w = document.querySelector('#warn'); if (w) w.remove(); document.querySelector('#forgeBtn').click(); }); await page.waitForTimeout(300);
  for (const [name, st] of Object.entries(T)) { if (st === 'EX') continue; const r = await page.evaluate(([s, chk]) => { localStorage.setItem('smt-forge2', JSON.stringify(s)); return null; }, [st]);
    await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(500); await page.evaluate(() => { const w = document.querySelector('#warn'); if (w) w.remove(); document.querySelector('#forgeBtn').click(); });
    const res = await page.evaluate(`(${check})()`).catch((e) => ({ out: ['THROWS ' + e.message], eps: 0, m: 0 })); bad += res.out.length;
    console.log(`${res.out.length ? '✗' : '✓'} ${name}: ${res.r} · ${res.m} moments · ${res.eps} épisodes${res.out.length ? '\n   ' + res.out.slice(0, 8).join('\n   ') : ''}`); }
  for (let i = 0; i < N; i++) { await page.evaluate((two) => { document.querySelector('#forgeBody [data-x="dice"]').click(); const b = document.querySelector(`#forgeBody [data-acts="${two ? 2 : 1}"]`); if (b) b.click(); }, i % 2 === 1); await page.waitForTimeout(50);
    const res = await page.evaluate(`(${check})()`).catch((e) => ({ out: ['THROWS ' + e.message] })); if (res.out.length) { bad += res.out.length; console.log(`✗ 🎲 ${i}: ${res.out.slice(0, 5).join(' · ')}`); } }
  if (errs.length) { console.log('PAGE ERRORS', errs.slice(0, 5)); bad += errs.length; }
  console.log(`\n${N} tirages : ${bad ? bad + ' problème(s)' : 'aucun problème'}`); await browser.close(); process.exit(bad ? 1 : 0); })();
