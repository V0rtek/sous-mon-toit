// Créer v2 (Écrire › Créer v2) : les mêmes moteurs (forge.js, mise.js), en 4 écrans simples pour quelqu'un qui n'y connaît rien.
//   1. Ton histoire : une phrase → la base (Haiku, ou « copier le prompt » + coller la réponse) · 🎲 au hasard · ⚙️ Avancé = l'écran Créer d'avant
//   2. L'histoire est montée (sans IA) : on écrit l'épisode 1 (Haiku, ou copier le prompt + coller)
//   3. Les images : ✨ tout générer (ChatGPT) et jouer · 🎥 Avancé = « Mettre en scène un épisode écrit »
//   4. Prêt : ▶ Jouer
// Les 3 clés (Claude, ChatGPT, GitHub) sont en bas, au même endroit sur chaque écran. Voir CREER.md, « Créer v2 ».
window.CREER2 = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k) || ''; if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* private window */ } return ''; };
  const KEY = 'smt-c2';
  // step: where we are · premise: the sentence · based: the baseline exists · story: episode 1 as the AI wrote it · script: that, as a screenplay
  let C = { step: 1, premise: '', based: false, story: null, script: '', title: '', ready: false };
  try { C = { ...C, ...(JSON.parse(ls(KEY)) || {}) }; } catch { /* first time */ }
  const save = () => ls(KEY, JSON.stringify(C));
  let el = null, msg = '', busy = false, ask1 = false, ask2 = false, askS = false, todo = null;
  const paste = { 1: '', 2: '', s: '' };
  const reach = () => (!C.based ? 1 : !C.story ? 2 : !C.ready ? 3 : 4);

  // ---- the episode as a screenplay (what 🎥 reads): « NAME (to X): the line », narration in brackets, a choice with its branches ----
  const nameOf = (id) => (id === 'justin' ? 'Justin' : (window.CAST && CAST[id] && CAST[id].name) || id || '');
  function scriptOf(story) {
    const out = [`ÉPISODE ${story.episode || 1}${story.title ? ' · ' + story.title : ''}`, ''];
    const walk = (list) => (list || []).forEach((s) => {
      if (!s || s.hush) return;
      if (s.choice) { out.push('(Justin choisit.)'); s.choice.forEach((o) => { out.push(`CHOIX « ${o.t} »`); if (o.say) out.push(`JUSTIN: ${o.say}`); walk(o.then); }); return; }
      if (s.who && s.text) out.push(`${nameOf(s.who).toUpperCase()}${s.to && s.to !== s.who ? ` (à ${nameOf(s.to)})` : ''}: ${s.text}`);
      else if (s.text || s.narr) out.push(`(${s.text || s.narr})`);
    });
    walk(story.steps); return out.join('\n');
  }
  const countLines = (story) => { let n = 0; const w = (l) => (l || []).forEach((s) => { if (s && s.choice) s.choice.forEach((o) => w(o.then)); else if (s && s.who && s.text) n++; }); w(story.steps); return n; };

  // ---- the keys, in one place (Claude · ChatGPT · GitHub) ----
  const KEYS = [['smt-key', 'Claude (Haiku)', 'sk-ant-…', (v) => /^sk-ant-/.test(v)], ['smt-oai', 'ChatGPT (images)', 'sk-…', (v) => /^sk-/.test(v) && !/^sk-ant-/.test(v)], ['smt-gh-token', 'GitHub (partager)', 'github_pat_…', (v) => /^(github_pat_|ghp_)/.test(v)]];
  const keysHtml = () => { const ok = KEYS.map(([k]) => !!ls(k));
    return `<div class="c2Keys"><b>🔑</b>`
      + KEYS.map(([k, l, ph], i) => `<label><span>${l}</span><input type="text" class="secret" autocomplete="off" autocapitalize="off" spellcheck="false" data-key="${k}" placeholder="${ph}" value="${ok[i] ? '••••••••' : ''}"></label>`).join('')
      + '</div>'; };
  function saveKey(k, v) {
    v = v.trim(); const def = KEYS.find((x) => x[0] === k); if (!def || /^•+$/.test(v)) return;
    if (v && !def[3](v)) return keys();
    if (k === 'smt-gh-token' && window.BANK && BANK.keySave) BANK.keySave(k, v); else ls(k, v || null);
    keys();
  }
  const needKey = (k, what) => { msg = `Clé ${what} manquante : en bas du menu Écrire.`; render(); };

  // the keys live at the bottom of the Écrire menu (index.html), nowhere else
  let keysEl = null;
  function keys(root) { style(); if (root) { keysEl = root; root.onchange = (e) => { const k = e.target.dataset.key; if (k) saveKey(k, e.target.value); }; } if (keysEl) keysEl.innerHTML = keysHtml(); }
  // ---- the screen ----
  const say = (t) => { msg = t; const m = el && $('.c2Msg', el); if (m) m.textContent = t; };
  const steps = () => `<nav class="c2Steps">${[1, 2, 3, 4].map((n) => `<button type="button" data-go="${n}" class="${C.step === n ? 'on' : ''}${n <= reach() ? '' : ' off'}"${n > reach() ? ' disabled' : ''}>${n <= reach() && n < C.step ? '✓' : n}</button>`).join('<i></i>')}</nav>`;
  const ta = (f, ph, v) => `<textarea data-f="${f}" placeholder="${esc(ph)}" rows="${f === 'premise' ? 4 : 3}">${esc(v)}</textarea>`;
  const both = (a, b, a2, b2) => `<div class="c2Row"><button type="button" class="c2Big" data-a="${a}"${busy ? ' disabled' : ''}>${a2}</button><button type="button" data-a="${b}"${busy ? ' disabled' : ''}>${b2}</button></div>`;

  function s1() {
    return ta('premise', 'Ton idée…', C.premise) + both('haiku1', 'copy1', '⚡ Haiku', '📋 Prompt')
      + (ask1 ? ta('p1', 'Colle la réponse', paste[1]) + '<div class="c2Row"><button type="button" class="c2Big" data-a="use1">OK</button></div>' : '')
      + `<div class="c2Row"><button type="button" data-a="dice"${busy ? ' disabled' : ''}>🎲</button><button type="button" data-a="adv1">⚙️ Avancé</button></div>`
      + (C.based ? '<div class="c2Row"><button type="button" class="c2Next" data-go="2">→</button></div>' : '');
  }
  function s2() {
    const o = FORGE.v2.overview();
    const sm = window.ORCH ? ORCH.summary() : null;
    return `<div class="c2Cast">${o.people.map((p) => `<div><span>${p.src ? `<img src="${p.src}" alt="">` : ''}</span><b>${esc(p.name)}</b></div>`).join('')}</div>`
      + (sm && sm.q ? `<p class="c2Sub">${esc(sm.recipe)} · ${esc(sm.q)} · ${sm.eps} épisodes</p><div class="c2Row"><button type="button" data-a="read">📖 Lire toute l’histoire</button></div>` : '')
      + (C.story ? `<p class="c2Ok">✓ ${esc(C.title)}</p>` : '')
      + both('haiku2', 'copy2', '⚡ Épisode 1', '📋 Prompt')
      + (ask2 ? ta('p2', 'Colle la réponse', paste[2]) + '<div class="c2Row"><button type="button" class="c2Big" data-a="use2">OK</button></div>' : '')
      + (C.story ? '<div class="c2Row"><button type="button" class="c2Next" data-go="3">→</button></div>' : '');
  }
  function s3() {
    const staged = window.MISE && MISE.auto.has(), n = todo, price = window.OAI && n ? ` ≈ ${OAI.usd(OAI.cost(n))}` : '';
    let h = '';
    if (!staged) {
      h += both('stage', 'copyS', '⚡ Mise en scène', '📋 Prompt');
      if (askS) h += ta('ps', 'Colle la réponse', paste.s) + '<div class="c2Row"><button type="button" class="c2Big" data-a="useS">OK</button></div>';
      h += `<div class="c2Row"><button type="button" class="c2Big c2Go" data-a="all"${busy ? ' disabled' : ''}>✨ Tout générer et jouer</button></div>`;
    } else {
      h += `<div class="c2Row"><button type="button" class="c2Big c2Go" data-a="all"${busy ? ' disabled' : ''}>${n ? `✨ Tout générer et jouer${price}` : '▶ Jouer'}</button></div>`
        + (n ? '<div class="c2Row"><button type="button" data-a="play">▶ Sans générer</button></div>' : '');
    }
    return h + '<div class="c2Row"><button type="button" data-a="adv3">🎥 Avancé</button></div>';
  }
  function s4() {
    return '<div class="c2Row"><button type="button" class="c2Big c2Go c2Huge" data-a="play">▶ Jouer</button></div><div class="c2Row"><button type="button" data-a="more">▶ La suite</button><button type="button" data-a="read">📖 Tout lire</button></div><div class="c2Row"><button type="button" data-a="adv3">🎥 Avancé</button><button type="button" data-a="again">↩</button></div>';
  }
  function render() {
    if (!el) return; const keep = el.closest('#creer2') ? el.closest('#creer2').scrollTop : 0;
    if (C.step === 3 && window.MISE) MISE.auto.setScript(C.script);
    el.innerHTML = steps() + [s1, s2, s3, s4][C.step - 1]() + `<p class="c2Msg">${esc(msg)}</p>`;
    if (el.closest('#creer2')) el.closest('#creer2').scrollTop = keep;
  }
  const go = (n) => { C.step = Math.max(1, Math.min(reach(), n)); save(); msg = ''; if (C.step === 3) refreshTodo(); render(); };
  async function refreshTodo() { if (!window.MISE) return; try { MISE.auto.setScript(C.script); todo = await MISE.auto.todo(); } catch { todo = null; } if (el && C.step === 3) render(); }

  // ---- the actions ----
  const copy = (text, then) => (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => say(then), () => say('Copie impossible ici.'));
  const used = () => ({ in: 0, out: 0 }), spent = (u) => { if (window.GEN_USED) GEN_USED(u); };
  const fresh = () => { C.story = null; C.script = ''; C.title = ''; C.ready = false; todo = null; ask2 = false; paste[2] = ''; };
  function baseIn(j) { if (!FORGE.v2.load(j)) return say('Je n’arrive pas à lire cette réponse.'); fresh(); C.based = true; ask1 = false; paste[1] = ''; go(2); }
  function storyIn(j) {
    if (!j || !Array.isArray(j.steps)) return say('Je n’arrive pas à lire cette réponse : il faut tout le JSON, de { à }.');
    C.title = FORGE.v2.epKeep(0, j); C.story = j; C.script = scriptOf(j); C.ready = false; todo = null; ask2 = false; paste[2] = ''; MISE.auto.setScript(C.script); go(3);
  }
  const parse = (t) => { try { return LOOSE_JSON(t); } catch { return null; } };
  // episode 1 = the opening the orchestration designed (passive: the characters choose); without orch.js, the old plan
  const ep1Prompt = () => (window.ORCH ? ORCH.epPrompt() : FORGE.v2.epPrompt(0));
  async function ai(what, run) {
    const k = ls('smt-key'); if (!k) return needKey('smt-key', 'Claude');
    busy = true; say(what); render();
    try { await run(k); } catch (err) { say(err.message || 'Ça n’a pas marché.'); }
    busy = false; render();
  }
  async function stageIn() { const ok = MISE.auto.setPlay(paste.s); if (!ok) return say('Je n’arrive pas à lire cette réponse : il faut tout le JSON, de { à }.'); askS = false; paste.s = ''; await refreshTodo(); say(''); }
  // ✨ everything: the staging (if not done), every missing picture, then ▶ (a key or a failure stops it: tap again to go on)
  async function all() {
    if (!window.MISE) return say('La mise en scène n’est pas chargée.');
    MISE.auto.setScript(C.script);
    if (!MISE.auto.has()) { const k = ls('smt-key'); if (!k) { askS = true; ask1 = false; msg = 'Clé Claude manquante : en bas du menu Écrire. Ou 📋 Prompt.'; render(); return; }
      busy = true; say('⚡ Haiku met en scène…'); render();
      try { await MISE.auto.stage(k); } catch (err) { busy = false; say('Haiku : ' + (err.message || 'ça n’a pas marché')); return render(); }
      busy = false; }
    todo = await MISE.auto.todo(); render();
    if (todo) { if (!OAI.hasKey()) return needKey('smt-oai', 'ChatGPT');
      busy = true; render(); const r = await MISE.auto.generateAll(say); busy = false; todo = await MISE.auto.todo();
      if (r.err) { say(`${r.err} ${todo ? `Il reste ${todo} image${todo > 1 ? 's' : ''} : retape pour continuer.` : ''}`); return render(); } }
    C.ready = true; C.step = 4; save(); say(''); render(); play();
  }
  // ▶ episode 1 (played), then « ▶ La suite » = the black screens, episode 2 to the end (orch.js)
  const more = () => { if (window.ORCH) ORCH.slides(2, { onClose: () => { if (el) render(); } }); };
  async function play() { if (!window.MISE) return; if (!(await MISE.auto.play({ onClose: () => { if (el) render(); }, next: window.ORCH ? more : null }))) say('Il faut d’abord la mise en scène.'); }
  // the old screens, one tap away; coming back lands here
  function advanced(kind) {
    if (kind === 1) { if (window.C2_FORGE) C2_FORGE(); return; }
    MISE.auto.setScript(C.script); MISE.open();
    const t = setInterval(() => { if (!document.getElementById('mz')) { clearInterval(t); if (el && C.step >= 3) { if (C.step === 3) refreshTodo(); else render(); } } }, 500);
  }

  function onClick(e) {
    const b = e.target.closest('button'); if (!b || !el.contains(b)) return; const d = b.dataset;
    if (d.go) return go(+d.go);
    if (!d.a || busy) return;
    const premise = () => { const t = $('[data-f="premise"]', el); if (t) C.premise = t.value; save(); return C.premise; };
    switch (d.a) {
      case 'haiku1': return ai('⚡ Haiku monte l’histoire…', async (k) => { const u = used(), j = await window.ACT.haiku(k, FORGE.v2.basePrompt(premise()), 4000, (x) => Array.isArray(x.cast), u); spent(u); baseIn(j); });
      case 'copy1': ask1 = true; return copy(FORGE.v2.basePrompt(premise()), 'Prompt copié.').then(render);
      case 'use1': return baseIn(parse(paste[1]));
      case 'dice': premise(); FORGE.v2.dice(); fresh(); C.based = true; return go(2);
      case 'adv1': premise(); if (!C.based) { FORGE.v2.dice(); C.based = true; fresh(); } save(); return advanced(1);
      case 'haiku2': return ai('⚡ Haiku écrit l’épisode 1…', async (k) => { const u = used(), j = await window.ACT.haiku(k, ep1Prompt(), 8000, (x) => Array.isArray(x.steps), u); spent(u); storyIn(j); });
      case 'copy2': ask2 = true; return copy(ep1Prompt(), 'Prompt copié.').then(render);
      case 'read': if (window.ORCH) ORCH.read({ onClose: () => { if (el) render(); } }); return;
      case 'more': return more();
      case 'use2': return storyIn(parse(paste[2]));
      case 'stage': return ai('⚡ Haiku met en scène…', async (k) => { MISE.auto.setScript(C.script); await MISE.auto.stage(k); await refreshTodo(); say(''); });
      case 'copyS': MISE.auto.setScript(C.script); askS = true; return copy(MISE.auto.prompt(), 'Prompt copié.').then(render);
      case 'useS': return stageIn();
      case 'all': return all();
      case 'play': return play();
      case 'adv3': return advanced(3);
      case 'again': C.based = false; fresh(); C.step = 1; save(); msg = ''; return render();
    }
  }
  function mount(root) {
    style(); el = root; msg = ''; busy = false; if (C.step > reach()) C.step = reach();
    root.onclick = onClick;
    root.oninput = (e) => { const f = e.target.dataset.f; if (f === 'premise') { C.premise = e.target.value; save(); } else if (f === 'p1') paste[1] = e.target.value; else if (f === 'p2') paste[2] = e.target.value; else if (f === 'ps') paste.s = e.target.value; };
    render(); if (C.step === 3) refreshTodo();
  }
  let styled = false;
  function style() {
    if (styled) return; styled = true; const st = document.createElement('style');
    st.textContent = `#creer2 { justify-content: flex-start; overflow-y: auto; padding: 13em 6% 8em; scroll-snap-type: none; }
#creer2Body { display: flex; flex-direction: column; gap: 1.4em; font-size: 1em; }
#creer2 h2 { margin: 0; font-size: 3.2em; letter-spacing: -.02em; } #creer2 h3 { margin: .4em 0 0; font-size: 2.2em; }
.c2Sub { margin: 0; font-size: 1.8em; color: #aeaeb2; line-height: 1.35; } .c2Ok { margin: 0; font-size: 1.9em; color: #30d158; }
.c2Msg { margin: 0; font-size: 1.7em; color: #ff9f0a; } .c2Msg:empty { display: none; }
.c2Steps { display: flex; align-items: center; gap: .5em; } .c2Steps i { flex: 1; height: .2em; background: #2c2c2e; }
.c2Steps button { width: 2.4em; height: 2.4em; border-radius: 50%; border: 0; font: inherit; font-size: 1.8em; font-weight: 800; background: #2c2c2e; color: #f5f5f7; cursor: pointer; }
.c2Steps button.on { background: #f5f5f7; color: #000; } .c2Steps button.off { opacity: .35; }
#creer2 textarea { width: 100%; box-sizing: border-box; font: inherit; font-size: 1.9em; padding: .7em .9em; border-radius: 1em; border: 0; background: #1c1c1e; color: #f5f5f7; resize: vertical; user-select: text; }
.c2Row { display: flex; flex-wrap: wrap; gap: .8em; align-items: center; }
#creer2 .c2Row button, #creer2 .c2Row select { font: inherit; font-size: 2em; padding: .6em 1.1em; border-radius: 2em; border: 0; background: #1c1c1e; color: #f5f5f7; cursor: pointer; }
#creer2 .c2Row button.c2Big { background: #0a84ff; color: #fff; font-weight: 700; } #creer2 .c2Row button.c2Go { background: #30d158; color: #000; }
#creer2 .c2Row button.c2Next { background: #f5f5f7; color: #000; font-weight: 700; } #creer2 .c2Row button.c2Huge { font-size: 3.4em; padding: .7em 1.6em; }
#creer2 .c2Row button:disabled { opacity: .4; } .c2Q { font-size: 1.5em; color: #98989d; } .c2Q select { font-size: 1.2em !important; padding: .3em .8em !important; }
.c2Cast { display: flex; flex-wrap: wrap; gap: 1em; } .c2Cast div { display: flex; flex-direction: column; align-items: center; width: 7.5em; font-size: 1.6em; text-align: center; }
.c2Cast span { width: 4.2em; height: 4.2em; border-radius: 50%; overflow: hidden; background: #2c2c2e; } .c2Cast img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 12%; }
.c2Cast small { font-size: .7em; color: #98989d; }
.c2Keys { display: flex; flex-direction: column; gap: .6em; margin: 2em 7% 0; font-size: 1.6em; color: #98989d; }
.c2Keys label { display: flex; align-items: center; gap: .8em; } .c2Keys label span { flex: none; width: 8.5em; }
.c2Keys input { flex: 1; min-width: 0; font: inherit; padding: .5em .8em; border-radius: 1em; border: 0; background: #1c1c1e; color: #f5f5f7; }`;
    document.head.appendChild(st);
  }
  return { mount, keys, scriptOf };
})();
