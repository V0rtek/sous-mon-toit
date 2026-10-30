// Importer une feuille (31/10, Roadmap 1): a pose sheet generated from Nouveau perso goes into the game without Claude.
// The browser cuts its 6 cells (green keyed out, the figure = its biggest blobs), measures each pose like Claude did by
// hand (where the counter or the belt cuts it, its size against Justin's guide, where its face is), shows the 6, then
// pushes them to the repo in one commit with the GitHub token (chars/<id>/<pose>.png + chars/<id>/sprite.json, and the
// id in chars/imports.json): a minute later every phone and the TV have them. At start, every page loads chars/imports.json
// and adds those characters to SPRITES / FACE / CAST (MADE points each pose at its file)
(() => {
  const REPO = 'V0rtek/sous-mon-toit';
  // a sheet type -> its 6 poses (cells left to right, top row first) and how they are cut. The cells always follow the
  // guide's order, so the names come from the type. counter = leaning on an edge, cut under the forearms; belt = cut
  // below the belt, placed by the face (the kiss); full = head to feet
  const KINDS = {
    // the kit (31/10): Debout and Accoudé for everyone, then Assis and Prises. In Prises the hands are empty: each pose
    // keeps where its hand is (grip), the game puts the object there
    debout: { cut: 'full', poses: ['listen', 'smile', 'surprised', 'angry', 'hurt', 'back_walk'] },
    accoude: { cut: 'counter', poses: ['bar_to_listen', 'bar_to_smile', 'bar_to_tense', 'bar_ahead', 'bar_back', 'bar_put'] },
    assis: { cut: 'table', poses: ['sit_listen', 'sit_lean', 'sit_back', 'sit_head', 'sit_fist', 'sit_rise'] },
    prises: { cut: 'counter', poses: ['hold_mouth', 'hold_raise', 'hold_front', 'hold_give', 'bar_slump', 'bar_laugh'] },
    base: { cut: 'full', poses: ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'] },
    back: { cut: 'full', poses: ['back_far', 'back_down', 'back_look', 'back_door', 'back_fists', 'back_walk'] },
    barFront: { cut: 'counter', poses: ['bar_talk', 'bar_drink', 'bar_stare', 'bar_smile', 'bar_laugh', 'bar_slump'] },
    barOther: { cut: 'counter', poses: ['bar_to_talk', 'bar_to_flirt', 'bar_to_anger', 'bar_toast', 'bar_back', 'bar_slide'] },
    kiss: { cut: 'belt', poses: ['kiss_near', 'kiss', 'kiss_after', 'kiss_forehead', 'kiss_whisper', 'kiss_rejected'] },
  };
  // Justin's measures (chars.js), the yardstick: a new character's sheet follows his guide, so his cell heights give the scale
  const GUIDE = { counter: { h: 459, unit: 1483, ax: 285 }, belt: { h: 497, unit: 1230, face: 143, belt: 0.573 }, full: { h: 700 } };

  const slug = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[s.length >> 1]; };

  // the sheet -> 6 cut poses, each with its canvas and its measures (in its own pixels)
  async function cut(file, kind) {
    const K = KINDS[kind], bmp = await createImageBitmap(file), k = Math.min(1, 1536 / bmp.width);
    const W = Math.round(bmp.width * k), H = Math.round(bmp.height * k);
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const cx = cv.getContext('2d', { willReadFrequently: true }); cx.drawImage(bmp, 0, 0, W, H);
    const px = cx.getImageData(0, 0, W, H), d = px.data, alpha = new Float32Array(W * H);
    // the backdrop: the median of the 4 corners. Green: keyed by how green each pixel is. Anything else (a white or grey
    // sheet the image model made anyway): the backdrop is what looks like it AND touches the edge, flooded inward, so a
    // white top on a white sheet stays (it doesn't touch the edge)
    const corner = (c) => { const v = []; for (const [ox, oy] of [[0, 0], [W - 6, 0], [0, H - 6], [W - 6, H - 6]]) for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) v.push(d[((oy + y) * W + ox + x) * 4 + c]); return median(v); };
    const bg = [corner(0), corner(1), corner(2)];
    if (bg[1] - Math.max(bg[0], bg[2]) > 60) {
      for (let i = 0; i < W * H; i++) {   // green screen: how green against red and blue; the spill on the edges pulled back
        const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2], t = g - Math.max(r, b);
        alpha[i] = g < 120 ? 1 : Math.min(1, Math.max(0, 1 - (t - 25) / 60));
        if (alpha[i] < 0.98 && g > Math.max(r, b)) d[i * 4 + 1] = Math.max(r, b);
      }
    } else {
      const near = (i) => Math.max(Math.abs(d[i * 4] - bg[0]), Math.abs(d[i * 4 + 1] - bg[1]), Math.abs(d[i * 4 + 2] - bg[2])) < 26;
      alpha.fill(1); const st = [];
      for (let x = 0; x < W; x++) st.push(x, (H - 1) * W + x);
      for (let y = 0; y < H; y++) st.push(y * W, y * W + W - 1);
      while (st.length) { const i = st.pop(); if (alpha[i] === 0 || !near(i)) continue; alpha[i] = 0; const x = i % W;
        if (x > 0) st.push(i - 1); if (x < W - 1) st.push(i + 1); if (i >= W) st.push(i - W); if (i < W * (H - 1)) st.push(i + W); }
      for (let i = W; i < W * (H - 1); i++) if (alpha[i] && (!alpha[i - 1] || !alpha[i + 1] || !alpha[i - W] || !alpha[i + W])) alpha[i] = 0.6;   // a soft edge
    }
    const out = [];
    for (let n = 0; n < 6; n++) {
      const c = n % 3, r = (n / 3) | 0, cw = W / 3, ch = H / 2;
      // a figure can lean past its cell (a raised mug): search a little wider, keep the blobs of this cell's figure
      const x0 = Math.max(0, Math.round(c * cw - cw * 0.05)), x1 = Math.min(W, Math.round((c + 1) * cw + cw * 0.05));
      const y0 = Math.round(r * ch), y1 = Math.round((r + 1) * ch);
      const f = figureOf(W, x0, y0, x1, y1, alpha);
      if (!f) throw new Error(`Personne dans la case ${n + 1} : 3 colonnes × 2 rangées sur fond vert.`);
      // keep only the blobs whose centre is in this cell (not the neighbour's back that pokes in)
      const own = new Set([...f.ids].filter((id) => { let sx = 0, m = 0; for (let i = 0; i < f.lab.length; i++) if (f.lab[i] === id) { sx += i % f.w; m++; } const mx = x0 + sx / m; return mx >= c * cw && mx < (c + 1) * cw; }));
      let bx0 = 1e9, by0 = 1e9, bx1 = -1, by1 = -1;
      for (let i = 0; i < f.lab.length; i++) if (own.has(f.lab[i])) { const x = i % f.w, y = (i / f.w) | 0; if (x < bx0) bx0 = x; if (x > bx1) bx1 = x; if (y < by0) by0 = y; if (y > by1) by1 = y; }
      const w = bx1 - bx0 + 1, h = by1 - by0 + 1, img = cx.createImageData(w, h), solid = new Uint8Array(w * h);
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const l = f.lab[(by0 + y) * f.w + bx0 + x], o = (y * w + x) * 4, i = (y0 + by0 + y) * W + x0 + bx0 + x;
        const a = l && !own.has(l) ? 0 : alpha[i];
        img.data[o] = d[i * 4]; img.data[o + 1] = d[i * 4 + 1]; img.data[o + 2] = d[i * 4 + 2]; img.data[o + 3] = Math.round(a * 255);
        solid[y * w + x] = a > 0.5 ? 1 : 0;
      }
      const p = document.createElement('canvas'); p.width = w; p.height = h; p.getContext('2d').putImageData(img, 0, 0);
      // measures: the lowest row of its left 60% (a forearm on the counter, not a mug hanging lower), the rightmost point
      // of its head (the top 35%: the face, for the kiss), the middle of its bottom row (its waist)
      let arm = 0, face = 0, b0 = w, b1 = 0;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (solid[y * w + x]) {
        if (x < w * 0.6 && y > arm) arm = y;
        if (y < h * 0.35 && x > face) face = x;
        if (y === h - 1) { if (x < b0) b0 = x; if (x > b1) b1 = x; }
      }
      // the hand: the figure's rightmost point in the band where that pose holds it (his hands reach to the right)
      const band = { hold_mouth: [0, 0.45], hold_raise: [0, 0.7], hold_front: [0.3, 0.95], hold_give: [0.15, 0.95], bar_put: [0.8, 1] }[K.poses[n]];
      let grip = null;
      if (band) { let gx = -1, gy = 0; for (let y = Math.floor(h * band[0]); y < Math.ceil(h * band[1]); y++) for (let x = w - 1; x > gx; x--) if (solid[y * w + x]) { gx = x; gy = y; break; }
        grip = [Math.round(gx - w * 0.03), K.poses[n] === 'bar_put' ? h : gy]; }
      out.push({ pose: K.poses[n], canvas: p, w, h, arm: arm + 1, face, mid: (b0 + b1) / 2, grip });
    }
    return out;
  }

  // the cut poses -> what the engine needs: SPRITES[id] (sizes, and for a cut pose its x, its cut row, its cut height,
  // its scale), measured like Justin's
  function measure(kind, cells) {
    const K = KINDS[kind], sp = { poses: {}, half: { unit: 1483, belt: 0.6, poses: {}, full: {} } };
    if (K.cut === 'full') {   // head to feet: all the poses of the sheet at one scale, the tallest = 700
      const s = GUIDE.full.h / Math.max(...cells.map((c) => c.h));
      for (const c of cells) { c.scale = s; sp.poses[c.pose] = [Math.round(c.w * s), Math.round(c.h * s)]; }
      sp.refH = GUIDE.full.h; return sp;
    }
    const g = GUIDE[K.cut === 'table' ? 'counter' : K.cut], unit = Math.round(g.unit * median(cells.map((c) => c.h)) / g.h);
    for (const c of cells) {
      c.scale = 1; sp.poses[c.pose] = [c.w, c.h];
      if (c.grip) (sp.grip = sp.grip || {})[c.pose] = c.grip;
      // at a counter the ledge is 1.05 m (0.6 of his height); at a table, 0.75 m (0.43)
      if (K.cut === 'counter' || K.cut === 'table') sp.half.poses[c.pose] = [Math.round(GUIDE.counter.ax * unit / g.unit), Math.min(c.h, c.arm), K.cut === 'table' ? 0.43 : 0.6, unit];
      else {   // the kiss: placed by the face (his lips a fixed way ahead of his spot), pulled back = placed by the waist
        const ax = c.pose === 'kiss_rejected' ? Math.round(c.mid) : Math.round(c.face - g.face * unit / g.unit);
        sp.half.poses[c.pose] = [ax, c.h, g.belt, unit]; sp.half.full[c.pose] = c.pose === 'kiss_rejected' ? 'surprised' : 'listen';
      }
    }
    return sp;
  }

  // what an imported character is in the engine: its poses' sizes and cuts, which way they face, where their files are
  function apply(id, data, urls) {
    const sp = SPRITES[id] = SPRITES[id] || { refH: data.refH || 700, poses: {} };
    if (data.refH) sp.refH = data.refH;
    Object.assign(sp.poses, data.poses);
    if (data.half && Object.keys(data.half.poses).length) {
      sp.half = sp.half || { unit: data.half.unit, belt: data.half.belt, poses: {}, full: {} };
      Object.assign(sp.half.poses, data.half.poses); Object.assign(sp.half.full, data.half.full || {});
    }
    if (data.grip) sp.grip = { ...(sp.grip || {}), ...data.grip };
    FACE[id] = FACE[id] || {}; for (const p of Object.keys(data.poses)) FACE[id][p] = 'r';
    MADE[id] = MADE[id] || {}; for (const p of Object.keys(data.poses)) MADE[id][p] = (urls && urls[p]) || `chars/${id}/${p}.${data.ext || 'png'}`;
    if (!CAST[id]) CAST[id] = { name: data.name || id, color: data.color || '#6e3b8c', sprite: id };
    // only leaning poses so far: a plain 'bar' or a listen is his first leaning pose
    // the poses the stories ask for, played by the closest the kit has (the kit has no « explaining »: the face carries it)
    const has = sp.poses, lean = ['bar_to_listen', 'bar_to_talk', 'bar_smile', 'bar_talk'].find((p) => has[p]);
    window.POSE_ALIAS = window.POSE_ALIAS || {};
    const al = POSE_ALIAS[id] = POSE_ALIAS[id] || {};
    if (lean) { al.bar = al.bar || lean; if (!has.listen) al.listen = al.listen || lean; }
    if (has.listen) Object.assign(al, { explaining: 'listen', holding: 'listen', thinking: has.hurt ? 'hurt' : 'listen', ...al });
  }

  // ---- the GitHub side: one commit for the 6 pictures, the character's sprite.json and the list of imports ----
  const gh = async (token, path, opt = {}) => {
    const r = await fetch(`https://api.github.com/repos/${REPO}/${path}`, { ...opt, headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', ...(opt.headers || {}) } });
    if (r.status === 404 && !opt.method) return null;
    if (!r.ok) throw new Error(r.status === 401 || r.status === 403 ? 'jeton refusé (Acte › Générer › Garder pour Claude)' : `GitHub ${r.status}`);
    return r.json();
  };
  const b64 = (s) => btoa(unescape(encodeURIComponent(s)));
  const fromB64 = (s) => decodeURIComponent(escape(atob(s.replace(/\n/g, ''))));
  const blobB64 = (blob) => new Promise((ok) => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(',')[1]); fr.readAsDataURL(blob); });
  async function push(token, id, name, kind, cells, sp) {
    const read = async (path) => { const f = await gh(token, `contents/${path}?ref=main`); return f ? JSON.parse(fromB64(f.content)) : null; };
    const old = (await read(`chars/${id}/sprite.json`)) || { name, ext: 'png', poses: {}, half: { unit: 0, belt: 0.6, poses: {}, full: {} } };
    const list = (await read('chars/imports.json')) || [];
    const data = { ...old, name: name || old.name, ext: 'png', grip: { ...(old.grip || {}), ...(sp.grip || {}) }, sheets: [...new Set([...(old.sheets || []), kind])], poses: { ...old.poses, ...sp.poses } };
    if (sp.refH) data.refH = sp.refH;
    if (Object.keys(sp.half.poses).length) data.half = { unit: sp.half.poses[cells[0].pose][3], belt: sp.half.belt, poses: { ...(old.half || {}).poses, ...sp.half.poses }, full: { ...(old.half || {}).full, ...sp.half.full } };
    const files = [];
    for (const c of cells) {
      const blob = await new Promise((ok) => c.out.toBlob(ok, 'image/png'));
      files.push({ path: `chars/${id}/${c.pose}.png`, content: await blobB64(blob), encoding: 'base64' });
    }
    files.push({ path: `chars/${id}/sprite.json`, content: JSON.stringify(data, null, 1), encoding: 'utf-8' });
    if (!list.includes(id)) files.push({ path: 'chars/imports.json', content: JSON.stringify([...list, id]), encoding: 'utf-8' });
    const ref = await gh(token, 'git/ref/heads/main'), base = await gh(token, `git/commits/${ref.object.sha}`);
    const tree = [];
    for (const f of files) {
      const bl = await gh(token, 'git/blobs', { method: 'POST', body: JSON.stringify({ content: f.content, encoding: f.encoding }) });
      tree.push({ path: f.path, mode: '100644', type: 'blob', sha: bl.sha });
    }
    const t = await gh(token, 'git/trees', { method: 'POST', body: JSON.stringify({ base_tree: base.tree.sha, tree }) });
    const cm = await gh(token, 'git/commits', { method: 'POST', body: JSON.stringify({ message: `${name || id} : feuille ${kind} importée depuis Nouveau perso`, tree: t.sha, parents: [ref.object.sha] }) });
    await gh(token, 'git/refs/heads/main', { method: 'PATCH', body: JSON.stringify({ sha: cm.sha }) });
    return data;
  }

  // ---- for Nouveau perso: cut and show, then push ----
  const ls = (k) => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
  let last = null;   // the sheet cut and shown, waiting for « Ajouter au jeu »
  window.IMPORT = {
    KINDS, slug,
    async cut(file, kind, name) {
      const cells = await cut(file, kind), sp = measure(kind, cells);
      for (const c of cells) {   // the picture at its final size (a full-body sheet is scaled to 700 tall)
        const o = document.createElement('canvas'); o.width = Math.round(c.w * c.scale); o.height = Math.round(c.h * c.scale);
        const ox = o.getContext('2d'); ox.imageSmoothingQuality = 'high'; ox.drawImage(c.canvas, 0, 0, o.width, o.height); c.out = o;
      }
      last = { id: slug(name), name: String(name || '').trim(), kind, cells, sp };
      return cells.map((c) => ({ pose: c.pose, src: c.out.toDataURL('image/png'), grip: c.grip && [c.grip[0] / c.w, c.grip[1] / c.h] }));
    },
    // a tap on a pose in the preview moves where its hand is (fx, fy = 0..1 of the picture)
    setGrip(pose, fx, fy) {
      const c = last && last.cells.find((x) => x.pose === pose); if (!c || !c.grip) return null;
      c.grip = [Math.round(fx * c.w), Math.round(fy * c.h)]; last.sp.grip[pose] = c.grip; return [fx, fy];
    },
    // in this page right away (a test can use him), then in the repo for every device
    async add() {
      if (!last || !last.id) throw new Error('Il manque son nom (étape 1).');
      const urls = Object.fromEntries(last.cells.map((c) => [c.pose, c.out.toDataURL('image/png')]));
      apply(last.id, { ...last.sp, name: last.name }, urls);
      const token = ls('smt-gh-token');
      if (!token) return 'Jouable sur ce téléphone. Pour la télé et les autres : ajoute ton jeton GitHub (Acte › Générer › Garder pour Claude), puis refais « Ajouter au jeu ».';
      await push(token, last.id, last.name, last.kind, last.cells, last.sp);
      return `Ajouté au jeu : ${last.name}. Partout dans une minute environ.`;
    },
    apply,
  };

  // every page: the imported characters, from the repo
  fetch(`chars/imports.json?t=${Date.now()}`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : [])).then((ids) => Promise.all((ids || []).map((id) =>
    fetch(`chars/${id}/sprite.json?t=${Date.now()}`, { cache: 'no-store' }).then((r) => r.json()).then((data) => apply(id, data)).catch(() => {})))).catch(() => { /* none yet */ });
})();
