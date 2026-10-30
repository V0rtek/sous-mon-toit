// Mini-jeux › Placer un objet (31/10): Justin places an object on a pose himself. The pose big, the object over it: a finger
// drags it, two sliders give its size and its angle. « Copier pour Claude » copies where it is (fractions of the pose's
// picture, so it holds at any size); « Utiliser dans le jeu » keeps it on this phone (smt-place) and the engine uses it
// ({hold}: SPRITES[id].place[object][pose] = {x, y, w, r}: its centre, its width, its angle in degrees)
(() => {
  const $ = (s) => document.querySelector(s);
  const KEY = 'smt-place';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* private window */ } };
  // every placement kept on this phone, on its character (after the imported characters are in)
  const applyAll = () => { const all = load(); for (const [id, objs] of Object.entries(all)) { const sp = SPRITES[id]; if (!sp) continue; sp.place = sp.place || {};
    for (const [o, poses] of Object.entries(objs)) sp.place[o] = { ...(sp.place[o] || {}), ...poses }; } };
  (window.IMPORTS_READY || Promise.resolve()).then(applyAll);

  const src = (id, p) => (typeof MADE !== 'undefined' && MADE[id] && MADE[id][p]) || `chars/${id}/${p}.webp`;
  let st = { id: null, pose: null, obj: 'biere', x: 0.7, y: 0.4, w: 0.18, r: 0 };
  const chars = () => Object.keys(SPRITES).filter((id) => !['kai', 'leo'].includes(id) && Object.keys(SPRITES[id].poses).length);
  const posesOf = (id) => Object.keys((SPRITES[id] || {}).poses || {}).sort((a, b) => (/^hold_/.test(b) - /^hold_/.test(a)));
  // where it was placed already (this phone, else the character's own), or a fair start
  function recall() {
    const p = ((SPRITES[st.id] || {}).place || {})[st.obj]; const v = p && p[st.pose];
    Object.assign(st, v ? { x: v.x, y: v.y, w: v.w, r: v.r } : { x: 0.75, y: 0.4, w: 0.2, r: 0 });
  }
  function draw() {
    const el = $('#placeBody'); if (!el) return;
    if (!st.id || !SPRITES[st.id]) { st.id = chars().includes('lily') ? 'lily' : chars()[0]; st.pose = null; }
    if (!st.pose || !SPRITES[st.id].poses[st.pose]) st.pose = posesOf(st.id)[0];
    const opt = (list, cur) => list.map((v) => `<option${v === cur ? ' selected' : ''}>${v}</option>`).join('');
    el.innerHTML = `<div class="plRow"><select data-pl="id">${opt(chars(), st.id)}</select><select data-pl="pose">${opt(posesOf(st.id), st.pose)}</select><select data-pl="obj">${opt(BANK.props.map((p) => p[0]), st.obj)}</select></div>`
      + `<div class="plStage" id="plStage"><img class="plPose" src="${src(st.id, st.pose)}" alt=""><img class="plObj" id="plObj" src="props/${st.obj}.webp" alt=""></div>`
      + `<label class="plSl">Taille<input type="range" data-pl="w" min="0.03" max="0.8" step="0.005" value="${st.w}"></label>`
      + `<label class="plSl">Angle<input type="range" data-pl="r" min="-180" max="180" step="1" value="${st.r}"></label>`
      + '<p class="plHint">Glisse l’objet avec ton doigt.</p>'
      + '<div class="plRow"><button type="button" class="bkCopy" data-plgo="copy">Copier pour Claude</button><button type="button" class="bkCopy" data-plgo="use">Utiliser dans le jeu</button></div><p class="plMsg" id="plMsg"></p>';
    place();
  }
  // the object on the pose: its centre at (x, y) of the pose's picture, its width w of the pose's width, turned r degrees
  function place() {
    const o = $('#plObj'), pose = $('#plStage .plPose'); if (!o || !pose) return;
    const go = () => { const W = pose.clientWidth, H = pose.clientHeight;
      Object.assign(o.style, { width: st.w * W + 'px', left: st.x * W + 'px', top: st.y * H + 'px', transform: `translate(-50%,-50%) rotate(${st.r}deg)` }); };
    if (pose.complete && pose.naturalWidth) go(); else pose.onload = go;
  }
  const out = () => ({ char: st.id, pose: st.pose, obj: st.obj, x: +st.x.toFixed(3), y: +st.y.toFixed(3), w: +st.w.toFixed(3), r: Math.round(st.r) });
  function onClick(e) {
    const b = e.target.closest('[data-plgo]'); if (!b) return; e.stopPropagation();
    const v = out(), msg = (t) => { $('#plMsg').textContent = t; };
    if (b.dataset.plgo === 'copy') {
      const t = `Placement : ${JSON.stringify(v)}`;
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => msg('Copié : colle-le dans le chat.'), () => msg(t));
    } else {
      const all = load(); all[v.char] = all[v.char] || {}; all[v.char][v.obj] = { ...(all[v.char][v.obj] || {}), [v.pose]: { x: v.x, y: v.y, w: v.w, r: v.r } };
      save(all); applyAll(); msg(`Gardé sur ce téléphone : ${v.char} · ${v.pose} · ${v.obj}. Les histoires l’utilisent.`);
    }
  }
  function onChange(e) {
    const k = e.target.dataset.pl; if (!k) return;
    if (k === 'w' || k === 'r') { st[k] = +e.target.value; place(); return; }
    st[k] = e.target.value; if (k === 'id') st.pose = null;
    if (k !== 'w' && k !== 'r') { draw(); if (st.pose) { recall(); draw(); } }
  }
  // dragging: the object follows the finger, in fractions of the pose's picture
  let drag = false;
  function onDown(e) { if (!e.target.closest('#plStage')) return; drag = true; move(e); e.preventDefault(); }
  function move(e) {
    if (!drag) return; const pose = $('#plStage .plPose'), r = pose.getBoundingClientRect();
    st.x = Math.min(1.3, Math.max(-0.3, (e.clientX - r.left) / r.width)); st.y = Math.min(1.3, Math.max(-0.3, (e.clientY - r.top) / r.height)); place();
  }
  window.PLACE_OPEN = () => {
    const sc = $('#placeScreen'); sc.onclick = onClick; sc.onchange = onChange; sc.oninput = onChange;
    sc.onpointerdown = onDown; sc.onpointermove = move; sc.onpointerup = sc.onpointercancel = () => { drag = false; };
    draw(); recall(); draw();
  };
})();
