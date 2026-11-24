// Tester une histoire (24/11, demandé par Justin : « un endroit super simple : j'ouvre, je choisis clé API ou copier le prompt,
// ça m'envoie au bon endroit, le moins de junk possible »). Une idée → l'histoire (FORGE + ORCH) → l'épisode 1 écrit (passif)
// → ▶ Regarder (épisode 1 joué dans le vrai lecteur, puis les écrans noirs jusqu'à la fin) ou 📖 Lire.
//   🔑 avec la clé Claude : tout se fait seul (la base, l'épisode 1, la mise en scène).
//   📋 en copiant : deux allers-retours avec Claude (la base, l'épisode 1) ; la mise en scène se fait sans IA (tout le monde à
//      table, les visages tirés des poses) pour ne pas en demander un troisième.
// Ouvre aussi par le lien direct index.html#histoire (navigateur déverrouillé). Mêmes moteurs que Créer v2 ; rien de nouveau dedans.
window.HISTOIRE = (() => {
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k) || ''; if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* private window */ } return ''; };
  const KEY = 'smt-h';
  // step: idee → (cle) → copie1 → copie2 → pret · path: 'cle' | 'copie' · story: l'épisode 1 écrit
  let H = { step: 'idee', path: '', idea: '', story: null };
  try { H = { ...H, ...(JSON.parse(ls(KEY)) || {}) }; } catch { /* first time */ }
  const save = () => ls(KEY, JSON.stringify(H));
  let el = null, msg = '', busy = false, paste = '';
  const parse = (t) => { try { return LOOSE_JSON(t); } catch { return null; } };
  const say = (t) => { msg = t; render(); };

  // ---- the staging without AI (copy path, or when the AI staging fails): everyone at the table, the face from the pose ----
  const FACE = { listen: 'neutral', surprised: 'surprised', thinking: 'doubt', explaining: 'serious', angry: 'angry', holding: 'cold' };
  function quickPlay(story) {
    const K = FORGE.core(), steps = (story.steps || []).filter(Boolean), ids = [...new Set(['justin', ...steps.filter((s) => s.who).map((s) => s.who)])].slice(0, 5);
    const places = ['s2', 's3', 's1', 's4', 'd1'], beats = [{ shot: 'salle', narr: story.title || '' }, { shot: 'wide', narr: '' }]; let last = null;
    for (const s of steps) {
      if (s.hush && last) { beats.push({ do: 'look', who: last.who, at: last.to && last.to !== last.who ? last.to : undefined, face: 'serious', narr: '' }); continue; }
      if (!s.who || !s.text || !ids.includes(s.who)) continue; last = s;
      beats.push({ who: s.who, to: s.to && s.to !== s.who && ids.includes(s.to) ? s.to : undefined, face: FACE[s.pose] || 'neutral', text: s.text }); }
    return { title: story.title || '', cast: ids.map((id) => ({ id, name: K.nm(id), sprite: K.sprite(id), player: id === 'justin' })), start: Object.fromEntries(ids.map((id, k) => [id, places[k]])), empty: [], inserts: [], beats };
  }
  const prompt1 = () => FORGE.v2.basePrompt(H.idea), prompt2 = () => ORCH.epPrompt();
  // the answers, read leniently (CLAUDE.md: no validator; what does not fit is dropped)
  function baseIn(j) { if (!j || !FORGE.v2.load(j)) return say('Je n’arrive pas à lire cette réponse : il faut tout le JSON, de { à }.'); H.story = null; paste = ''; H.step = H.path === 'cle' ? 'ecrit' : 'copie2'; save(); msg = ''; render(); return true; }
  function epIn(j) { if (!j || !Array.isArray(j.steps)) return say('Je n’arrive pas à lire cette réponse : il faut tout le JSON, de { à }.'); FORGE.v2.epKeep(0, j); H.story = j; paste = ''; H.step = 'pret'; save(); msg = ''; render(); return true; }
  // 🔑 everything with the key: the base (unless 🎲), episode 1
  async function viaKey() {
    const k = ls('smt-key'); if (!k) { H.step = 'cle'; save(); return render(); }
    busy = true; try {
      if (H.step !== 'ecrit') { say('⚡ Claude monte l’histoire… (1/2)'); const j = await window.ACT.haiku(k, prompt1(), 4000, (x) => Array.isArray(x.cast), { in: 0, out: 0 }); if (!baseIn(j)) return; }
      say('⚡ Claude écrit l’épisode 1… (2/2)'); const j2 = await window.ACT.haiku(k, prompt2(), 8000, (x) => Array.isArray(x.steps), { in: 0, out: 0 }); epIn(j2);
    } catch (err) { msg = `Ça n’a pas marché : ${err.message || err}. Réessaie, ou passe par 📋.`; } finally { busy = false; render(); } }
  // ▶ Regarder: episode 1 played (staged by the AI with a key, else without AI), then the black screens to the end
  async function watch() {
    if (!H.story) return ORCH.read({ onClose: render });
    const script = CREER2.scriptOf(H.story); MISE.auto.setScript(script); let staged = false; const k = ls('smt-key');
    if (H.path === 'cle' && k) { busy = true; say('🎬 Claude met en scène…'); try { staged = await MISE.auto.stage(k); } catch { staged = false; } busy = false; msg = ''; }
    if (!staged) MISE.auto.setPlay(quickPlay(H.story));
    render(); await MISE.auto.play({ onClose: () => render(), next: () => ORCH.slides(2, { onClose: render }) }); }
  const copy = (t) => (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => say('✓ Copié. Colle-le dans Claude.'), () => say('Copie impossible ici : sélectionne le texte à la main.'));

  // ---- the screen ----
  const big = (a, t, cls = '') => `<button type="button" class="hB ${cls}" data-a="${a}"${busy ? ' disabled' : ''}>${t}</button>`;
  function view() {
    const sm = window.ORCH && H.step !== 'idee' && H.step !== 'cle' ? (() => { try { return ORCH.summary(); } catch { return null; } })() : null;
    switch (H.step) {
      case 'idee': return `<h2>Tester une histoire</h2><textarea data-f="idea" rows="3" placeholder="Ton idée, en une phrase (ou rien : Claude choisit)">${esc(H.idea)}</textarea>`
        + big('cle', '🔑 Avec ma clé Claude', 'go') + big('copie', '📋 En copiant dans Claude') + `<div class="hRow">${big('dice', '🎲 Une au hasard', 'sm')}</div>`;
      case 'cle': return `<h2>Ta clé Claude</h2><p class="hS">Une seule fois : elle reste dans ce navigateur.</p><input data-f="key" type="text" class="secret" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="sk-ant-…">`
        + big('key', 'OK', 'go') + big('back', '‹ Retour', 'sm');
      case 'copie1': case 'copie2': { const n = H.step === 'copie1' ? 1 : 2;
        return `<h2>${n === 1 ? 'L’histoire' : 'L’épisode 1'} <small>· étape ${n} sur 2</small></h2>${sm && n === 2 ? `<p class="hS">✓ ${esc(sm.recipe)} · ${esc(sm.q)}</p>` : ''}`
          + `<p class="hS">1. Copie, puis colle dans Claude.</p>${big('cp', '📋 Copier le texte', 'go')}`
          + `<p class="hS">2. Colle sa réponse ici.</p><textarea data-f="paste" rows="4" placeholder="La réponse de Claude">${esc(paste)}</textarea>${big('use', 'OK')}`
          + (n === 2 ? `<div class="hRow">${big('read', '📖 Lire sans l’épisode 1', 'sm')}${big('back', '↩ Recommencer', 'sm')}</div>` : `<div class="hRow">${big('back', '‹ Retour', 'sm')}</div>`); }
      case 'ecrit': return `<h2>L’épisode 1</h2>${sm ? `<p class="hS">✓ ${esc(sm.recipe)} · ${esc(sm.q)}</p>` : ''}` + big('cle', '🔑 Avec ma clé Claude', 'go') + big('copie', '📋 En copiant dans Claude') + `<div class="hRow">${big('read', '📖 Lire sans l’épisode 1', 'sm')}${big('back', '↩ Recommencer', 'sm')}</div>`;
      case 'pret': return `<h2>Prête.</h2>${sm ? `<p class="hS">${esc(sm.recipe)} · ${esc(sm.q)} · ${sm.eps} épisodes</p>` : ''}` + big('watch', '▶ Regarder', 'go huge')
        + `<div class="hRow">${big('read', '📖 Lire', 'sm')}${big('back', '↩ Une autre', 'sm')}</div>`;
      default: H.step = 'idee'; return view(); }
  }
  function render() { if (!el) return; style(); el.innerHTML = view() + `<p class="hM">${esc(msg)}</p>`; }
  function onClick(e) {
    const b = e.target.closest('button'); if (!b || !el.contains(b) || busy) return; const a = b.dataset.a; const t = el.querySelector('[data-f="idea"]'); if (t) H.idea = t.value;
    msg = '';
    switch (a) {
      case 'cle': H.path = 'cle'; save(); return viaKey();
      case 'copie': H.path = 'copie'; H.step = H.step === 'ecrit' ? 'copie2' : 'copie1'; save(); return render();
      case 'dice': FORGE.v2.dice(); H.story = null; H.step = 'ecrit'; save(); return render();
      case 'key': { const v = (el.querySelector('[data-f="key"]') || {}).value || ''; if (!/^sk-ant-/.test(v.trim())) return say('Une clé Claude commence par sk-ant-.'); ls('smt-key', v.trim()); H.step = 'idee'; save(); return viaKey(); }
      case 'cp': return copy(H.step === 'copie1' ? prompt1() : prompt2());
      case 'use': return H.step === 'copie1' ? baseIn(parse(paste)) : epIn(parse(paste));
      case 'read': return ORCH.read({ onClose: render });
      case 'watch': return watch();
      case 'back': H.step = 'idee'; H.story = null; paste = ''; save(); return render();
    }
  }
  function mount(root) { el = root; msg = ''; busy = false; root.onclick = onClick;
    root.oninput = (e) => { const f = e.target.dataset.f; if (f === 'idea') { H.idea = e.target.value; save(); } else if (f === 'paste') paste = e.target.value; };
    if (H.step === 'cle') H.step = 'idee'; render(); }
  let styled = false;
  function style() { if (styled) return; styled = true; const st = document.createElement('style');
    st.textContent = `#histoire { justify-content: flex-start; overflow-y: auto; padding: 12em 7% 8em; }
#histoireBody { display: flex; flex-direction: column; gap: 1.1em; font-size: 1em; }
#histoire h2 { margin: 0 0 .2em; font-size: 3.4em; letter-spacing: -.02em; } #histoire h2 small { font-size: .45em; color: #8e8e93; font-weight: 600; }
#histoire .hS { margin: .3em 0 0; font-size: 1.9em; color: #aeaeb2; line-height: 1.35; } #histoire .hM { margin: 0; font-size: 1.8em; color: #ff9f0a; } #histoire .hM:empty { display: none; }
#histoire textarea, #histoire input { width: 100%; box-sizing: border-box; font: inherit; font-size: 2em; padding: .7em .9em; border-radius: 1em; border: 0; background: #1c1c1e; color: #f5f5f7; user-select: text; }
#histoire .hB { font: inherit; font-size: 2.3em; font-weight: 700; padding: .8em 1em; border-radius: 1em; border: 0; background: #1c1c1e; color: #f5f5f7; cursor: pointer; text-align: left; }
#histoire .hB.go { background: #0a84ff; color: #fff; } #histoire .hB.huge { background: #30d158; color: #000; font-size: 3.2em; text-align: center; }
#histoire .hB.sm { font-size: 1.8em; font-weight: 600; padding: .6em .9em; } #histoire .hB:disabled { opacity: .4; }
#histoire .hRow { display: flex; flex-wrap: wrap; gap: .8em; }`;
    document.head.appendChild(st); }
  return { mount, quickPlay };
})();
