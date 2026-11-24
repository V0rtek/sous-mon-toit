// ---- Créer · the full test, filmed (24/11). Needs Playwright, ffmpeg and the repo served locally:
//   python3 -m http.server 8765         (in the repo)
//   node essais/creer/film.js [OUT_DIR]   → OUT_DIR/test-complet.mp4 + screenshots
// Story T2_meurtre: Créer v2 step 2 → episode 1 PLAYED in the real player → « ▶ La suite » → the black screens until « Fin ».
// No API key here: the episode's dialogue (film/T2-episode1-dialogue.json) and its staging (film/…-mise-en-scene.json) were
// written by Claude from the exact prompts Haiku would get (ORCH.epPrompt(), then MISE.auto.prompt()). With a key, replace them
// by the model's answers to test the model too. Faces fall back to the base poses (no generated sheets) ----
const { chromium } = require('playwright'); const fs = require('fs'); const T = require('./histoires.js');
const OUT = (process.argv[2] || '/tmp/film') + '/', SP = OUT; fs.mkdirSync(OUT + 'video', { recursive: true });
(async () => { const name = 'T2_meurtre', dlg = JSON.parse(fs.readFileSync(__dirname + '/film/T2-episode1-dialogue.json', 'utf8')), stg = JSON.parse(fs.readFileSync(__dirname + '/film/T2-episode1-mise-en-scene.json', 'utf8'));
  const browser = await chromium.launch(), ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, recordVideo: { dir: SP + 'video', size: { width: 430, height: 932 } } }), page = await ctx.newPage(), errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.addInitScript((s) => { localStorage.setItem('smt-open', '323'); localStorage.setItem('smt-forge2', JSON.stringify(s)); localStorage.setItem('smt-c2', JSON.stringify({ step: 2, based: true })); }, T[name]);
  await page.goto((process.env.SMT_URL || 'http://localhost:8765/index.html'), { waitUntil: 'load' }); await page.waitForTimeout(900);
  await page.evaluate(() => { const w = document.querySelector('#warn'); if (w) w.remove(); document.querySelector('#creer2Btn').click(); }); await page.waitForTimeout(2500);
  await page.screenshot({ path: SP + 'full-0-creer2.png' });
  const ok = await page.evaluate(async ([j, st]) => { FORGE.v2.epKeep(0, j); const script = CREER2.scriptOf(j); MISE.auto.setScript(script); const r = MISE.auto.setPlay(st); return { r, script: script.slice(0, 200) }; }, [dlg, stg]);
  console.log('staging accepted:', JSON.stringify(ok));
  await page.evaluate(() => { MISE.auto.play({ next: () => ORCH.slides(2) }); });
  let shots = 0; for (let t = 0; t < 400; t++) { await page.waitForTimeout(1000); const end = await page.evaluate(() => !!document.querySelector('.mzEnd'));
    if ([12, 40, 70].includes(t)) await page.screenshot({ path: SP + `full-1-ep1-${++shots}.png` });
    if (end) { console.log('episode 1 played in', t, 's'); break; } }
  await page.waitForTimeout(1500); await page.screenshot({ path: SP + 'full-2-end.png' });
  await page.evaluate(() => document.querySelector('.mzEnd [data-h="next"]').click()); await page.waitForTimeout(1200);
  let n = 0; for (; n < 300; n++) { const on = await page.evaluate(() => !!document.querySelector('#orSl')); if (!on) break; if ([2, 9, 30].includes(n)) await page.screenshot({ path: SP + `full-3-slide-${n}.png` }); await page.mouse.click(215, 500); await page.waitForTimeout(n % 7 === 0 ? 1600 : 1150); }
  console.log('slides steps', n, 'errors', errs);
  const vid = page.video(); await ctx.close(); await browser.close(); const src = await vid.path(); require('child_process').execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', src, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '28', '-preset', 'veryfast', '-movflags', '+faststart', OUT + 'test-complet.mp4']); console.log('→', OUT + 'test-complet.mp4'); })();
