// Mise en scène (16/11) : un épisode écrit (screenplay) → ce qu'on VOIT. Écrire › Créer › 🎥.
// 1. le script se colle, un prompt (MISE_DATA.STAGE) en fait une « pièce » : des temps (qui parle à qui, qui regarde qui,
//    qui bouge où), jamais des pixels. 2. l'écran dit quelles feuilles la pièce demande (persos, décors, inserts) :
//    prompt à copier, image à copier, feuille à déposer. 3. ▶ joue. Tout a un repli : rien ne bloque jamais.
// Le moteur garde l'espace : chacun a UNE place, la caméra ne fait que cadrer. Voir CREER.md, « Mise en scène ».
window.MISE = (() => {
  const D = window.MISE_DATA, SET = D.SET;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const low = (s) => String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k) || ''; localStorage.setItem(k, v); } catch { /* private window */ } return ''; };
  const wait = (ms) => new Promise((ok) => setTimeout(ok, ms));
  const FACE_IDS = D.FACES.map((f) => f[0]), GEST_IDS = D.GESTS.map((g) => g[0]);
  const faceOf = (f) => { const k = low(f); return FACE_IDS.includes(k) ? k : D.FACE_ALIAS[k] || null; };

  // ---- ce qui est déposé : sur cet appareil (IndexedDB), et dans le repo si le jeton GitHub est là (mise/up/) ----
  // clés : « pl:table » un décor · « in:chope » un insert · « sp:amare:v_smile » une pose coupée d'une feuille
  const UP = {};   // clé → { url, w, h }
  const idb = () => new Promise((ok, no) => { const r = indexedDB.open('smt-mise', 1); r.onupgradeneeded = () => r.result.createObjectStore('img'); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); });
  const dbDo = async (mode, fn) => { const db = await idb(); return new Promise((ok, no) => { const tx = db.transaction('img', mode), rq = fn(tx.objectStore('img')); tx.oncomplete = () => ok(rq && rq.result); tx.onerror = () => no(tx.error); }); };
  async function put(key, blob, w, h, meta = {}) {
    if (UP[key] && UP[key].local) URL.revokeObjectURL(UP[key].url);
    UP[key] = { ...meta, url: URL.createObjectURL(blob), w, h, local: 1 };
    try { await dbDo('readwrite', (s) => s.put({ blob, w, h, meta }, key)); } catch { /* private window: this page only */ }
  }
  async function drop(keys) { for (const k of keys) { delete UP[k]; try { await dbDo('readwrite', (s) => s.delete(k)); } catch { /* */ } } }
  const fname = (key) => key.replace(/[^a-z0-9_]+/gi, '-');
  // the repo copy: one commit for the pictures and the index (every device then has them)
  async function share(keys, what) {
    const token = ls('smt-gh-token'); if (!token || !window.IMPORT || !IMPORT.commit) return 'Gardé sur cet appareil. (Avec ton jeton GitHub, ce serait partout.)';
    const files = [], idx = { ...(await fetch(`mise/up/index.json?t=${Date.now()}`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}))) };
    for (const k of keys) { const u = UP[k], blob = await fetch(u.url).then((r) => r.blob()), ext = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
      const b64 = await new Promise((ok) => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(',')[1]); fr.readAsDataURL(blob); });
      files.push({ path: `mise/up/${fname(k)}.${ext}`, content: b64, encoding: 'base64' }); idx[k] = { f: `${fname(k)}.${ext}`, w: u.w, h: u.h, v: Date.now(), m: Object.fromEntries(Object.entries(u).filter(([x]) => !['url', 'w', 'h', 'local'].includes(x))) }; }
    files.push({ path: 'mise/up/index.json', content: JSON.stringify(idx), encoding: 'utf-8' });
    await IMPORT.commit(token, files, `Mise en scène : ${what}`);
    return 'Ajouté. Partout dans une minute environ.';
  }
  let ready = null;
  const boot = () => ready || (ready = (async () => {
    try { const idx = await fetch(`mise/up/index.json?t=${Date.now()}`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {})); for (const [k, v] of Object.entries(idx)) UP[k] = { ...(v.m || {}), url: `mise/up/${v.f}?v=${v.v}`, w: v.w, h: v.h }; } catch { /* none yet */ }
    try { const keys = await dbDo('readonly', (s) => s.getAllKeys()), vals = await dbDo('readonly', (s) => s.getAll()); keys.forEach((k, i) => { UP[k] = { ...(vals[i].meta || {}), url: URL.createObjectURL(vals[i].blob), w: vals[i].w, h: vals[i].h, local: 1 }; }); } catch { /* private window */ }
  })());

  // ---- l'état gardé : le script, la pièce, les places déplacées à la main, la taille des feuilles ----
  const KEY = 'smt-mise';
  let S = { script: '', play: '', marks: {}, k: {}, roles: {}, sheets: {}, sn: 0 };
  try { S = { ...S, ...(JSON.parse(ls(KEY)) || {}) }; } catch { /* first time */ }
  const save = () => ls(KEY, JSON.stringify(S));

  // ---- les persos : leurs images ----
  const spriteOf = (sp) => (sp === 'isa' && typeof ISA_LOOKS !== 'undefined' ? ISA_LOOKS[0].sprite : sp);
  const SP = (sp) => (window.SPRITES && SPRITES[sp]) || null;
  const urlOf = (sp, pose) => (typeof charUrl === 'function' ? charUrl(sp, pose) : `chars/${sp}/${pose}.webp`);
  const castScale = (sp) => { const c = window.CAST && (CAST[sp] || Object.values(CAST).find((x) => x.sprite === sp) || (/^isa_/.test(sp) && CAST.isa)); return (c && c.scale) || 1; };
  const colorOf = (c) => { const k = window.CAST && (CAST[c.id] || CAST[c.sprite] || Object.values(CAST).find((x) => x.sprite === c.sprite) || (/^isa_/.test(c.sprite) && CAST.isa)); return (k && k.color) || ['#8a5a2b', '#3d6b8c', '#7a3d6b', '#4d7a3d'][c.n % 4]; };
  const pool = () => { const base = ['listen', 'surprised', 'thinking', 'explaining', 'angry', 'holding'], kit = ['listen', 'smile', 'surprised', 'angry'];
    return Object.keys(window.SPRITES || {}).filter((id) => !/^duo_/.test(id) && (base.every((p) => SPRITES[id].poses[p]) || kit.every((p) => SPRITES[id].poses[p]))); };
  const first = (sp, list) => { const s = SP(sp); return s ? list.find((p) => s.poses[p]) : null; };
  // ---- la bibliothèque : tout ce qui a été généré et déposé reste, et ne se redemande jamais.
  // sp:<sprite>:<mid|cu>:<visage>:<geste|_> (mid = en buste jusqu'à mi-cuisse, cu = gros plan) · duo:<a>|<b>:<id> (deux persos, une image)
  const libKey = (sp, frame, face, gest) => `sp:${sp}:${frame}:${face || 'neutral'}:${gest || '_'}`;
  const duoKey = (a, b, id) => `duo:${[a, b].sort().join('|')}:${id}`;
  const FAM = Object.fromEntries(D.FACES.map((f) => [f[0], f[4]]));
  const kin = (face) => [face, ...D.FACES.filter((f) => f[4] === FAM[face] && f[0] !== face).map((f) => f[0]), 'neutral'];
  const mine = (sp, frame) => Object.keys(UP).filter((k) => k.startsWith(`sp:${sp}:${frame}:`));
  function libFind(sp, frame, face = 'neutral', gest) {
    const L = (f, g) => UP[libKey(sp, frame, f, g)];
    if (gest) { const u = kin(face).map((f) => L(f, gest)).find(Boolean) || mine(sp, frame).filter((k) => k.endsWith(':' + gest)).map((k) => UP[k])[0]; if (u) return u; }
    return kin(face).map((f) => L(f)).find(Boolean) || null;
  }
  // le corps (plans larges) : la pose en buste gardée la plus proche, sinon la pose de base la plus proche
  function body(c, face, gest) {
    const sp = c.sprite, s = SP(sp), u = libFind(sp, 'mid', face, gest);
    if (u) return { url: u.url, w: u.w, h: u.h, refH: u.refH || u.h, mid: 1, nat: gest === 'back' ? 'f' : 'r' };
    const want = (gest && D.GESTS.find((g) => g[0] === gest)[3]) || [], f = D.FACES.find((x) => x[0] === (face || 'neutral')) || D.FACES[0];
    const pose = first(sp, [...want, ...f[3], 'listen', 'bar_to_listen']) || (s && Object.keys(s.poses)[0]);
    if (!pose) return null;
    const [w, h] = s.poses[pose];
    return { url: urlOf(sp, pose), w, h, refH: s.refH || 700, nat: (window.FACE && FACE[sp] && FACE[sp][pose]) || 'r', lean: gest === 'lean' && !/lean/.test(pose) };
  }
  // le gros plan : gardé (le plus proche), sinon ses vieux gros plans (Justin), sinon rien (la caméra serre sur le corps)
  function bust(c, face) {
    const u = libFind(c.sprite, 'cu', face); if (u) return { url: u.url, w: u.w, h: u.h, nat: 'r' };
    const old = D.CU_OLD[face || 'neutral'], s = SP(c.sprite);
    if (old && s && s.poses[old]) return { url: urlOf(c.sprite, old), w: s.poses[old][0], h: s.poses[old][1], nat: (window.FACE && FACE[c.sprite] && FACE[c.sprite][old]) || 'r' };
    return null;
  }
  // la meilleure image de référence pour une feuille : le perso déjà dans ce cadrage (gardé ou dans le jeu), sinon sa pose de base
  // + un guide de cadrage tiré d'un autre perso
  const RANK = ['neutral', 'smile', 'serious', 'amused'];
  function refsFor(sp, frame) {
    const own = mine(sp, frame).sort((a, b) => (RANK.indexOf(a.split(':')[3]) + 1 || 9) - (RANK.indexOf(b.split(':')[3]) + 1 || 9))[0];
    if (own) return { one: UP[own].url, same: 1, why: 'déjà dans ce cadrage' };
    const old = frame === 'cu' && first(sp, ['cu_talk', 'cu_smile', 'cu_glance']);
    if (old) return { one: urlOf(sp, old), same: 1, why: 'déjà en gros plan' };
    const base = first(sp, ['listen', 'smile', 'explaining', 'bar_to_listen']), one = base ? urlOf(sp, base) : '';
    const g = Object.keys(UP).find((k) => /^sp:/.test(k) && k.split(':')[2] === frame && k.split(':')[1] !== sp);
    const two = g ? UP[g].url : frame === 'cu' && sp !== 'justin' && first('justin', ['cu_talk']) ? urlOf('justin', 'cu_talk') : '';
    return { one, two, why: 'sa pose de base' + (two ? ' + un guide de cadrage (image 2)' : '') };
  }

  // ---- la pièce : ce que l'IA a écrit → ce que le moteur joue. Rien n'est refusé : ce qui ne se comprend pas est ignoré ----
  function loose(text) {
    const t = String(text || ''), a = t.indexOf('{'), b = t.lastIndexOf('}'); if (a < 0 || b < a) return null;
    const raw = t.slice(a, b + 1);
    try { return JSON.parse(raw); } catch { /* next */ }
    // collage depuis un chat/markdown : « \ » en fin de ligne, &#x20;, \_ \[ \* … → on nettoie
    const clean = raw.replace(/&#x20;|&#32;|&nbsp;| /g, ' ').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
      .replace(/\\[ \t]*(\r?\n)/g, '$1').replace(/\\([_\[\]*#<>()!.\-+~`|])/g, '$1').replace(/[“”]/g, '"').replace(/,(\s*[}\]])/g, '$1');
    try { return JSON.parse(clean); } catch { return null; }
  }
  const markOf = (id) => { for (const [p, pl] of Object.entries(SET.plates)) if (pl.marks[id]) return { plate: p, id, ...pl.marks[id], ...((S.marks[p] || {})[id] || {}) }; return null; };
  const plateOf = (p) => ({ ...SET.plates[p], ...(S.marks[p] && S.marks[p]._ ? S.marks[p]._ : {}), up: UP[`pl:${p}`] });
  function norm(j) {
    if (!j || !Array.isArray(j.beats)) return null;
    const used = new Set(), free = () => pool().filter((id) => !used.has(id) && !/^(isa_|justin|kai|leo)/.test(id));
    const cast = {}, alias = {};
    (Array.isArray(j.cast) ? j.cast : []).forEach((c, n) => {
      if (!c) return; const id = low(c.id || c.name); if (!id || cast[id]) return;
      let sp = spriteOf(low(S.roles[id] || c.sprite || id)); if (!SP(sp)) sp = spriteOf(id); if (!SP(sp) || used.has(sp)) sp = free()[0] || 'justin';
      used.add(sp); cast[id] = { id, n, name: String(c.name || c.id), sprite: sp, player: !!c.player, she: !!c.she, extra: sp !== spriteOf(id) };
      alias[id] = id; alias[low(c.name)] = id;
    });
    const who = (x) => alias[low(x)] || null, mk = (x) => (markOf(low(x)) ? low(x) : null);
    const lineOf = (b) => {
      if (!b || typeof b !== 'object') return null;
      if (Array.isArray(b.choice)) { const opts = b.choice.map((o) => o && o.t && { t: String(o.t), narr: o.narr ? String(o.narr) : '', then: (Array.isArray(o.then) ? o.then : []).map(lineOf).filter(Boolean) }).filter(Boolean); return opts.length > 1 ? { choice: opts.slice(0, 3) } : null; }
      const o = { face: faceOf(b.face), gest: GEST_IDS.includes(low(b.gest)) ? low(b.gest) : null, narr: b.narr ? String(b.narr) : '', shot: ['salle', 'wide', 'two', 'cu'].includes(low(b.shot)) ? low(b.shot) : null, far: !!b.far, from: b.from === 'l' || b.from === 'r' ? b.from : null, cam: b.cam };
      o.react = Object.fromEntries(Object.entries(b.react || {}).map(([k, f]) => [who(k), faceOf(f)]).filter(([k, f]) => k && f));
      if (b.insert) return { ...o, insert: low(b.insert) };
      if (b.duo) { const ids = [].concat(b.who || []).map(who).filter(Boolean); return ids.length === 2 && ids[0] !== ids[1] ? { ...o, duo: low(b.duo), ids, act: String(b.act || b.narr || '') } : o.narr ? o : null; }
      if (b.do) { const act = low(b.do), ids = [].concat(b.who || []).map(who).filter(Boolean), to = [].concat(b.to || []);
        if (!['look', 'point', 'enter', 'move', 'near', 'stand', 'sit', 'exit', 'turn'].includes(act) || !ids.length) return o.narr ? o : null;
        return { ...o, do: act === 'turn' ? 'look' : act, ids, marks: to.map(mk), at: who(b.at || (act === 'near' ? to[0] : null)) || mk(b.at) }; }
      const sp = who(b.who || b.say);
      if (sp && b.text) return { ...o, who: sp, to: who(b.to), text: String(b.text) };
      return o.narr || o.shot ? o : null;
    };
    const start = {}; for (const [k, v] of Object.entries(j.start || {})) { const id = who(k), m = mk(v); if (id && m && !Object.values(start).includes(m)) start[id] = m; }
    const inserts = {}; for (const i of Array.isArray(j.inserts) ? j.inserts : []) if (i && i.id) inserts[low(i.id)] = { id: low(i.id), desc: String(i.desc || ''), prop: low(i.prop) };
    return { title: String(j.title || 'Épisode'), cast, start, empty: [].concat(j.empty || []).map(mk).filter(Boolean), inserts, beats: j.beats.map(lineOf).filter(Boolean) };
  }

  // ---- l'espace : qui est où. Un temps change l'état ; la caméra se déduit ----
  const STRONG = new Set(['tender', 'shy', 'threat', 'angry', 'worried', 'surprised', 'doubt']);
  function init(P) {
    const st = { at: {}, sit: {}, dir: {}, face: {}, gest: {}, near: {}, plate: 'table', pair: '', run: 0, frame: { type: 'wide', plate: 'table' } };
    for (const [id, m] of Object.entries(P.start)) { st.at[id] = m; st.sit[id] = !!markOf(m).seat; }
    const xs = Object.values(st.at).map((m) => markOf(m)).filter((m) => m.plate === 'table' && !m.dim).map((m) => m.x), mid = xs.length ? (Math.min(...xs) + Math.max(...xs)) / 2 : 900;
    for (const [id, m] of Object.entries(st.at)) st.dir[id] = markOf(m).dim ? 'l' : markOf(m).x <= mid ? 'r' : 'l';
    return st;
  }
  const plateAt = (st, id) => (st.at[id] ? markOf(st.at[id]).plate : null);
  const xOf = (st, id) => { const m = markOf(st.at[id]), n = st.near[id]; return m.x + (n ? Math.max(-2, Math.min(2, n)) * m.H * 0.05 : 0); };
  const freeMark = (st, plate, pref) => { const taken = new Set(Object.values(st.at)); return [...pref, ...Object.keys(SET.plates[plate].marks)].find((m) => markOf(m) && !taken.has(m)); };
  // turn a toward b (a person, or a place) ; across areas: toward where that area is
  function turn(st, a, b) {
    if (!st.at[a] || !b || a === b) return;
    const pa = plateAt(st, a), mb = st.at[b] ? markOf(st.at[b]) : markOf(b); if (!mb) return;
    if (mb.plate === pa) { const xa = xOf(st, a), xb = st.at[b] ? xOf(st, b) : mb.x; if (Math.abs(xb - xa) > 5) st.dir[a] = xb > xa ? 'r' : 'l'; }
    else st.dir[a] = (SET.plates[pa].toward || {})[mb.plate] || st.dir[a];
  }
  // one beat: the state after it, the framing, and what moves on screen
  function step(P, st, b) {
    const fx = { out: [], in: [], cut: false }, was = st.plate, player = Object.values(P.cast).find((c) => c.player);
    for (const k of Object.keys(st.gest)) delete st.gest[k];
    st.duo = null;
    for (const [id, f] of Object.entries(b.react || {})) st.face[id] = f;
    let frame = st.frame;
    const two = (a, c) => ({ type: 'two', plate: plateAt(st, a), ids: [a, c] }), cu = (a) => ({ type: 'cu', plate: plateAt(st, a), ids: [a] }), group = (p) => ({ type: 'group', plate: p });
    if (b.who) {
      const a = b.who; if (!st.at[a]) { const p0 = st.plate === 'salle' ? 'table' : st.plate, m = freeMark(st, p0, p0 === 'table' ? ['d1'] : ['ar', 'al']); if (m) { st.at[a] = m; st.dir[a] = 'l'; fx.in.push({ id: a, side: 'r' }); } }
      if (b.face) st.face[a] = b.face; if (b.gest) st.gest[a] = b.gest;
      const same = b.to && st.at[b.to] && plateAt(st, b.to) === plateAt(st, a);
      if (b.to) { turn(st, a, b.to); if (same) turn(st, b.to, a); }
      const pair = [a, b.to || ''].sort().join('|'); st.run = pair === st.pair ? st.run + 1 : 0; st.pair = pair;
      if (same) frame = b.gest ? two(a, b.to) : st.run % 4 === 0 ? two(a, b.to) : STRONG.has(st.face[a]) || st.run % 4 !== 3 ? cu(a) : two(a, b.to);
      else frame = b.to || STRONG.has(st.face[a]) ? cu(a) : group(plateAt(st, a));
      if (b.to && same && st.run === 0 && STRONG.has(st.face[a]) && frame.type === 'two' && b.text.length < 40 && !b.gest) frame = two(a, b.to);
    } else if (b.do) {
      const ids = b.ids, a = ids[0];
      if (b.do === 'enter' || b.do === 'move') {
        ids.forEach((id, k) => {
          const from = st.at[id] ? plateAt(st, id) : null; let m = b.marks[k] || b.marks[0];
          delete st.at[id]; delete st.near[id];
          if (!m || Object.values(st.at).includes(m)) m = freeMark(st, m ? markOf(m).plate : (from === 'table' ? 'aside' : 'table'), []);
          if (!m) { if (from) st.at[id] = Object.keys(SET.plates[from].marks).find((x) => !Object.values(st.at).includes(x)); return; }
          const to = markOf(m).plate; st.at[id] = m; st.sit[id] = !!markOf(m).seat;
          const side = b.from || (from && from !== to ? (SET.plates[to].from || {})[from] : null) || 'r';
          if (from && from !== to) fx.out.push({ id, plate: from, side: (SET.plates[from].toward || {})[to] || 'r' });
          if (from !== to) { fx.in.push({ id, side }); st.dir[id] = side === 'l' ? 'r' : 'l'; }
          if (b.face) st.face[id] = b.face;
        });
        const dest = plateAt(st, a), follow = b.cam === 'follow' || (b.cam !== 'stay' && (!player || ids.includes(player.id) || plateAt(st, player.id) === dest || !Object.keys(st.at).some((x) => plateAt(st, x) === was)));
        if (follow && dest) { frame = group(dest); const others = Object.keys(st.at).filter((x) => plateAt(st, x) === dest && !ids.includes(x) && !markOf(st.at[x]).dim); for (const id of ids) if (others[0]) turn(st, id, others[0]); if (ids.length > 1) { turn(st, ids[0], ids[1]); turn(st, ids[1], ids[0]); } }
        else frame = group(was === 'salle' ? 'table' : was);
        st.pair = '';
      } else if (b.do === 'exit') { for (const id of ids) { if (st.at[id]) fx.out.push({ id, plate: plateAt(st, id), side: 'r' }); delete st.at[id]; delete st.near[id]; } frame = group(was === 'salle' ? 'table' : was); st.pair = ''; }
      else if (st.at[a]) {
        if (b.face) st.face[a] = b.face; if (b.gest) st.gest[a] = b.gest;
        if (b.do === 'stand') { st.sit[a] = false; frame = { type: 'two', plate: plateAt(st, a), ids: [a] }; }
        else if (b.do === 'sit') { st.sit[a] = !!markOf(st.at[a]).seat; frame = { type: 'two', plate: plateAt(st, a), ids: [a] }; }
        else if (b.do === 'near') { turn(st, a, b.at); if (st.at[b.at]) turn(st, b.at, a); st.near[a] = (st.near[a] || 0) + (st.dir[a] === 'r' ? 1 : -1); frame = st.at[b.at] && plateAt(st, b.at) === plateAt(st, a) ? two(a, b.at) : cu(a); }
        else if (b.do === 'point') { turn(st, a, b.at); st.gest[a] = 'point'; frame = { type: 'two', plate: plateAt(st, a), ids: [a], marks: st.at[b.at] ? [st.at[b.at]] : markOf(b.at) && markOf(b.at).plate === plateAt(st, a) ? [b.at] : [] }; }
        else { turn(st, a, b.at); frame = b.gest ? { type: 'two', plate: plateAt(st, a), ids: [a] } : cu(a); }   // look: the reaction shot
        if (b.shot === 'two' && b.at && st.at[b.at] && plateAt(st, b.at) === plateAt(st, a)) frame = two(a, b.at);
        st.pair = '';
      }
    } else if (b.duo) {   // two people in one picture: they turn to each other; the picture takes their place once it exists
      const [a, c] = b.ids;
      if (st.at[a] && st.at[c] && plateAt(st, a) === plateAt(st, c)) { turn(st, a, c); turn(st, c, a); if (b.face) st.face[a] = b.face; st.duo = { key: duoKey(P.cast[a].sprite, P.cast[c].sprite, b.duo), ids: [a, c] }; frame = two(a, c); st.pair = ''; }
    }
    if (b.insert) frame = { type: 'insert', plate: st.plate === 'salle' ? 'table' : st.plate, insert: b.insert };
    else if (b.shot === 'salle') frame = { type: 'wide', plate: 'salle' };
    else if (b.shot === 'wide') frame = { type: 'wide', plate: frame.plate === 'salle' || frame.type === 'insert' ? (st.plate === 'salle' ? 'table' : st.plate) : frame.plate };
    else if (b.shot === 'cu' && (b.who || (b.ids && b.ids[0]))) frame = cu(b.who || b.ids[0]);
    else if (b.shot === 'two' && b.who && b.to && plateAt(st, b.to) === plateAt(st, b.who)) frame = two(b.who, b.to);
    else if (!b.who && !b.do && frame.type === 'insert') frame = { type: 'wide', plate: frame.plate };
    if (!frame.plate) frame = { ...frame, plate: was };
    fx.cut = frame.plate !== was; st.plate = frame.plate; st.frame = frame;
    return fx;
  }

  // ---- l'écran ----
  const CSS = `
#mz{position:fixed;inset:0;z-index:9000;background:#0b0b0d;color:#f5f5f7;font:16px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;overflow-y:auto;-webkit-tap-highlight-color:transparent}
#mz *{box-sizing:border-box}
#mz button,#mz .mzUp{font:inherit;border:0;border-radius:999px;padding:.55em 1em;background:#1c1c1e;color:#f5f5f7;cursor:pointer;text-decoration:none;display:inline-block}
#mz button:active{transform:scale(.97)}
.mzWrap{max-width:860px;margin:0 auto;padding:18px 16px 120px}
.mzTop{display:flex;align-items:center;gap:10px;margin-bottom:6px}.mzTop b{font-size:22px;flex:1}
.mzSub{color:#98989f;margin:0 0 14px;font-size:14px}
.mzH{font-size:18px;margin:26px 0 8px;display:flex;align-items:center;gap:8px}.mzH i{font-style:normal;background:#2c2c2e;border-radius:50%;width:1.6em;height:1.6em;display:grid;place-items:center;font-size:14px}
#mz textarea{width:100%;min-height:110px;background:#141416;color:#f5f5f7;border:1px solid #2c2c2e;border-radius:12px;padding:10px;font:13px/1.4 ui-monospace,Menlo,monospace;resize:vertical}
.mzRow{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0;align-items:center}
#mz .mzGo{background:#30d158;color:#000;font-weight:700}#mz .mzAmber,#mz .mzUp{background:#ff9f0a;color:#000;font-weight:700}
.mzMsg{color:#ffd60a;font-size:14px;min-height:1.3em;margin:4px 0}
.mzOk{color:#30d158;font-size:14px}.mzDim{color:#98989f;font-size:14px}
.mzCard{display:flex;gap:12px;align-items:flex-start;background:#141416;border-radius:14px;padding:12px;margin:8px 0;border-left:5px solid var(--c,#3a3a3c)}
.mzPic{width:64px;height:84px;border-radius:10px;background:#000 center top/cover no-repeat;flex:none;position:relative;overflow:hidden}
.mzPic.wide{width:112px;height:74px;background-position:center}
.mzPic img{position:absolute;left:50%;top:4px;height:230%;transform:translateX(-50%)}
.mzBody{flex:1;min-width:0}.mzBody>b{display:block;font-size:16px}.mzBody>b em{font-style:normal;color:#98989f;font-weight:400;font-size:13px;margin-left:6px}
.mzNeed{margin-top:8px;padding-top:8px;border-top:1px solid #232326}.mzNeed>span{font-size:14px;display:block;margin-bottom:6px}.mzNeed>span small{color:#98989f}
.mzNeed .mzRow{margin:0}.mzNeed button,.mzNeed .mzUp{font-size:13.5px;padding:.45em .8em}
.mzCells{display:flex;gap:4px;margin:6px 0}.mzCells img{height:54px;border-radius:6px;background:#26262a}
.mzRefs{display:flex;flex-direction:column;gap:6px;flex:none}.mzRefs .mzPic{background-size:cover;background-position:center top}
.mzList{margin:6px 0 8px;padding-left:1.3em;font-size:13.5px}.mzList li{margin:2px 0}.mzList small{color:#98989f}.mzList li.x{opacity:.6}
.mzH4{font-size:15px;margin:18px 0 6px;color:#c7c7cc}.mzBody>span{display:block;font-size:13px}
.mzCast{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}.mzWho{display:flex;gap:10px;align-items:center;background:#141416;border-radius:12px;padding:8px;border-left:4px solid var(--c)}
.mzWho .mzPic{width:44px;height:58px}.mzWho b{display:block}.mzWho .mzRow{margin:4px 0 0}.mzWho button{font-size:13px;padding:.3em .7em}
.mzCells{flex-wrap:wrap}
.mzPlayBar{position:fixed;left:0;right:0;bottom:0;padding:12px 16px calc(12px + env(safe-area-inset-bottom));background:linear-gradient(transparent,#0b0b0d 35%);display:flex;justify-content:center;gap:10px}
.mzPlayBar button{font-size:19px;padding:.7em 2.2em}
/* ---- le lecteur ---- */
#mzP{position:fixed;inset:0;z-index:9100;background:#000;display:grid;place-items:center;user-select:none;-webkit-user-select:none;touch-action:manipulation;font:16px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#fff}
.mzStage{position:relative;overflow:hidden;background:#000;container-type:size}
.mzWorld{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform}
.mzWorld.glide{transition:transform .7s cubic-bezier(.3,.1,.2,1)}.mzWorld.slow{transition:transform 5s linear}
.mzWorld>img.pl,.mzFront{position:absolute;left:0;top:0;display:block}
.mzFront{background-repeat:no-repeat;pointer-events:none;z-index:5}
.mzChair{position:absolute;z-index:1;border-radius:26px 26px 0 0;background:linear-gradient(90deg,#2a1810,#4a2c1b 18%,#3a2216 50%,#4a2c1b 82%,#2a1810);box-shadow:inset 0 6px 0 rgba(255,200,140,.12),0 0 0 3px #1a0f09}
.mzChair:after{content:"";position:absolute;inset:26px 34px 0;background:repeating-linear-gradient(90deg,transparent 0 22px,#1a0f09 22px 34px);opacity:.75}
.mzMug{position:absolute;z-index:6;filter:drop-shadow(0 6px 5px rgba(0,0,0,.55)) brightness(.82)}
.mzC{position:absolute;z-index:3;transition:left .75s cubic-bezier(.3,.1,.2,1),top .5s cubic-bezier(.3,.1,.2,1),opacity .3s}
.mzC.now{transition:none}.mzC.dim{z-index:2;filter:brightness(.42) saturate(.7) blur(1.2px)}.mzC.dim.lit{filter:brightness(.8)}
.mzC img{width:100%;height:100%;display:block;transition:transform .35s;transform-origin:50% 80%;filter:brightness(.9) saturate(.96)}
.mzC.talk{z-index:4}
.mzOver{position:absolute;inset:0;z-index:10;opacity:0;pointer-events:none;transition:opacity .18s;overflow:hidden;background:#000}
.mzOver.on{opacity:1}
.mzOver .bk{position:absolute;inset:-6%;background-repeat:no-repeat;filter:blur(7px) brightness(.62)}
.mzOver img.bust{position:absolute;bottom:0;height:92%;filter:drop-shadow(0 0 30px rgba(0,0,0,.6))}
.mzOver img.full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:mzKen 7s ease-out forwards}
.mzOver img.prop{position:absolute;left:50%;top:46%;height:52%;transform:translate(-50%,-50%);filter:drop-shadow(0 18px 24px rgba(0,0,0,.7))}
@keyframes mzKen{from{transform:scale(1.08)}to{transform:scale(1)}}
.mzVig{position:absolute;inset:0;z-index:11;pointer-events:none;box-shadow:inset 0 0 12cqw rgba(0,0,0,.55)}
.mzBub{position:absolute;z-index:20;max-width:min(78%,30em);background:#fff;color:#111;border-radius:1.1em;padding:.55em .85em .6em;font-size:clamp(15px,2.6cqw,30px);line-height:1.25;box-shadow:0 4px 18px rgba(0,0,0,.45);opacity:0;transform:translateY(6px);transition:opacity .15s,transform .15s}
.mzBub.on{opacity:1;transform:none}
.mzBub span{display:block}.mzBub b{display:block;font-size:.68em;letter-spacing:.04em;text-transform:uppercase;margin-bottom:.1em}
.mzBub i.t{position:absolute;width:0;height:0;border:.55em solid transparent;border-top-color:#fff;border-bottom:0;top:100%;margin-left:-.55em}
.mzBub.low i.t{display:none}
.mzBub.far{border:3px solid #111;font-weight:700}
.mzCap{position:absolute;z-index:19;left:50%;bottom:4%;transform:translateX(-50%);width:max-content;max-width:88%;background:rgba(8,8,10,.78);color:#f2ead8;border-radius:.6em;padding:.5em .9em;font-size:clamp(14px,2.3cqw,27px);font-style:italic;text-align:center;opacity:0;transition:opacity .2s;backdrop-filter:blur(4px)}
.mzCap.on{opacity:1}.mzCap.hi{bottom:auto;top:5%}
.mzChoice{position:absolute;z-index:30;left:0;right:0;bottom:6%;display:flex;flex-direction:column;align-items:center;gap:.6em}
.mzChoice button{font:inherit;font-size:clamp(16px,2.8cqw,32px);font-weight:700;border:0;border-radius:999px;padding:.6em 1.6em;background:#fff;color:#111;cursor:pointer;min-width:55%}
.mzChoice p{margin:0;font-size:clamp(12px,1.9cqw,22px);color:#f2ead8;text-shadow:0 1px 4px #000;font-style:italic;max-width:80%;text-align:center}
.mzHud{position:fixed;top:calc(8px + env(safe-area-inset-top));right:10px;z-index:9200;display:flex;gap:8px}
.mzHud button{font:inherit;font-size:16px;width:2.4em;height:2.4em;border-radius:50%;border:0;background:rgba(30,30,32,.75);color:#fff;cursor:pointer}
.mzEnd{position:absolute;inset:0;z-index:40;background:rgba(0,0,0,.82);display:grid;place-content:center;gap:14px;text-align:center}
.mzEnd h2{margin:0;font-size:clamp(20px,4cqw,44px)}.mzEnd button{font:inherit;font-size:18px;border:0;border-radius:999px;padding:.6em 1.6em;cursor:pointer}
.mzTune{position:fixed;left:0;right:0;bottom:0;z-index:9200;background:rgba(12,12,14,.92);padding:10px 14px calc(10px + env(safe-area-inset-bottom));display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;font-size:14px}
.mzTune label{display:flex;gap:6px;align-items:center}.mzTune input{width:150px}.mzTune button{font:inherit;border:0;border-radius:999px;padding:.5em 1em;cursor:pointer}
.mzEdge{position:absolute;left:0;right:0;height:0;border-top:4px dashed #ff9f0a;z-index:8;pointer-events:none}
`;
  const style = () => { if (!$('#mzCss')) { const s = document.createElement('style'); s.id = 'mzCss'; s.textContent = CSS; document.head.appendChild(s); } };

  // ---- le lecteur : un monde par plan (l'image, les chaises, les persos, la table par-dessus), une caméra qui cadre ----
  let R = null;   // the running player
  function player(P, opt = {}) {
    style(); if (R) R.close();
    const root = document.createElement('div'); root.id = 'mzP';
    root.innerHTML = `<div class="mzStage"><div class="mzWorld"></div><div class="mzOver"></div><div class="mzVig"></div><div class="mzBub"><b></b><span></span><i class="t"></i></div><div class="mzCap"></div></div><div class="mzHud">${opt.tune ? '' : '<button type="button" data-h="back" title="Reculer">‹</button>'}<button type="button" data-h="close" title="Fermer">✕</button></div>`;
    document.body.appendChild(root);
    const stage = $('.mzStage', root), world = $('.mzWorld', root), over = $('.mzOver', root), bub = $('.mzBub', root), cap = $('.mzCap', root);
    let vw = 0, vh = 0, cam = { s: 1, x: 0, y: 0 }, cur = null, st = null, i = -1, chunks = [], ci = 0, busy = false, alive = true, drawn = '', after = null;
    const els = {};   // cast id → its element
    const size = () => { const W = innerWidth, H = innerHeight; vw = Math.min(W, H * 16 / 9); vh = Math.min(H, vw * 3 / 4); if (opt.tune) vh = Math.min(vh, H - 120); vw = Math.min(vw, vh * 16 / 9); stage.style.width = vw + 'px'; stage.style.height = vh + 'px'; };
    const flat = (list) => list;   // the beats as they play (a choice appends its branch)
    let beats = flat(P.beats.slice());

    function build(p) {   // the world of one area
      const pl = plateOf(p), src = pl.up ? pl.up.url : pl.src, [PW, PH] = pl.size;
      world.innerHTML = `<img class="pl" src="${src}" width="${PW}" height="${PH}" alt="" draggable="false">`
        + (pl.edge ? Object.keys(pl.marks).map((m) => markOf(m)).filter((m) => m.seat && !m.dim).map((m) => `<div class="mzChair" style="left:${m.x - 100}px;top:${pl.edge - 175}px;width:200px;height:${175 + 40}px"></div>`).join('') : '')
        + (pl.edge ? `<div class="mzFront" style="width:${PW}px;height:${PH}px;background-image:url(${src});background-size:${PW}px ${PH}px;clip-path:inset(${pl.edge}px 0 0 0)"></div>` : '')
        + (pl.edge ? [...new Set([...Object.values(P.start), ...P.empty])].map((m) => markOf(m)).filter((m) => m && m.plate === p && m.seat && !m.dim).map((m) => `<img class="mzMug" src="props/chope.webp" alt="" style="left:${m.x + 66}px;top:${pl.edge + 2}px;width:92px">`).join('') : '')
        + (opt.tune && pl.edge ? `<div class="mzEdge" style="top:${pl.edge}px"></div>` : '');
      world.style.width = PW + 'px'; world.style.height = PH + 'px';
      for (const id of Object.keys(els)) delete els[id];
      cur = p; drawn = '';
    }
    function el(id) { if (!els[id]) { const d = document.createElement('div'); d.className = 'mzC now'; d.innerHTML = '<img alt="" draggable="false">'; d.dataset.id = id; d.style.opacity = '0'; world.appendChild(d); els[id] = d; } return els[id]; }
    // where someone is drawn (plate px)
    function rect(id, offSide) {
      const c = P.cast[id], m = markOf(st.at[id]), sc = castScale(c.sprite) * (S.k[c.sprite] || 1), H = m.H * sc, b = body(c, st.face[id], st.gest[id]); if (!b) return null;
      const k = (b.mid ? 0.7 : 1) * H / b.refH, h = b.h * k, w = b.w * k, feet = m.feet + (st.sit[id] ? m.sit || 0 : 0), [PW] = plateOf(m.plate).size;
      let x = xOf(st, id); if (offSide) x = offSide === 'l' ? -w : PW + w;
      return { b, x, w, h, left: x - w / 2, top: b.mid ? feet - H + 0.7 * H - h : feet - h, headTop: feet - H, H, m };
    }
    function place(id, o = {}) {
      const r = rect(id, o.off); if (!r) return; const d = el(id), im = d.firstChild;
      d.classList.toggle('now', !!o.now); d.classList.toggle('dim', !!r.m.dim); d.classList.toggle('lit', !!r.m.dim && !st.sit[id]);
      if (im.dataset.u !== r.b.url) { im.src = r.b.url; im.dataset.u = r.b.url; }
      Object.assign(d.style, { left: r.left + 'px', top: r.top + 'px', width: r.w + 'px', height: r.h + 'px', opacity: o.hide ? '0' : '1' });
      const flip = r.b.nat !== 'f' && r.b.nat !== st.dir[id];
      im.style.transform = `scaleX(${flip ? -1 : 1})${r.b.lean ? ` rotate(${st.dir[id] === 'r' ? 7 : -7}deg)` : ''}`;
      if (o.now) void d.offsetWidth;
    }
    const here = () => Object.keys(st.at).filter((id) => plateAt(st, id) === cur);
    // the camera: the rectangle to show → scale and offset (the view never leaves the image)
    function boxOf(f) {
      const pl = plateOf(f.plate), [PW, PH] = pl.size; if (f.type === 'wide' || f.plate === 'salle') return [0, 0, PW, PH];
      const ids = (f.ids || here().filter((id) => !markOf(st.at[id]).dim)).filter((id) => st.at[id] && plateAt(st, id) === f.plate), bx = [];
      for (const id of ids) { const r = rect(id); if (!r) continue; const k = f.type === 'cu' ? [0.2, 0.07, 0.36] : [0.24, 0.3, pl.edge ? 0.62 : 0.6]; bx.push([r.x - r.H * k[0], r.headTop - r.H * k[1], r.x + r.H * k[0], Math.min(PH, r.headTop + r.H * k[2])]); }
      for (const m of f.marks || []) { const k = markOf(m); bx.push([k.x - k.H * 0.2, k.feet - k.H + (k.sit || 0), k.x + k.H * 0.2, Math.min(PH, k.feet - k.H * 0.4)]); }
      if (!bx.length) return [0, 0, PW, PH];
      let x0 = Math.min(...bx.map((b) => b[0])), y0 = Math.min(...bx.map((b) => b[1])), x1 = Math.max(...bx.map((b) => b[2])), y1 = Math.max(...bx.map((b) => b[3]));
      if (f.type === 'group') { x0 -= 60; x1 += 60; y0 -= 40; }
      return [x0, y0, x1, y1];
    }
    function aim(f, mode) {
      const [PW, PH] = plateOf(f.plate).size, [x0, y0, x1, y1] = boxOf(f);
      const s = Math.max(Math.min(vw / (x1 - x0), vh / (y1 - y0)), vw / PW, vh / PH);
      const x = Math.min(0, Math.max(vw - PW * s, vw / 2 - (x0 + x1) / 2 * s)), y = Math.min(0, Math.max(vh - PH * s, vh / 2 - (y0 + y1) / 2 * s - (f.type === 'wide' ? 0 : vh * 0.03)));
      cam = { s, x, y }; world.classList.remove('glide', 'slow'); if (mode) { void world.offsetWidth; world.classList.add(mode); }
      world.style.transform = `translate(${x}px,${y}px) scale(${s})`;
    }
    // the close-up from a Visages sheet, the insert: over the world
    function overlay(f) {
      if (f.type === 'insert') {
        const ins = P.inserts[f.insert] || { id: f.insert }, u = UP[`in:${f.insert}`], pl = plateOf(f.plate), src = pl.up ? pl.up.url : pl.src;
        if (u) over.innerHTML = `<img class="full" src="${u.url}" alt="">`;
        else if (ins.prop) over.innerHTML = `<div class="bk" style="background-image:url(${src});background-size:cover;background-position:60% 80%"></div><img class="prop" src="props/${ins.prop}.webp" alt="" onerror="this.remove()">`;
        else return over.classList.remove('on');
        return over.classList.add('on');
      }
      const id = f.type === 'cu' && f.ids[0], c = id && P.cast[id], b = c && bust(c, st.face[id]);
      if (!b) return over.classList.remove('on');
      const r = rect(id), pl = plateOf(f.plate), [PW, PH] = pl.size, src = pl.up ? pl.up.url : pl.src, right = st.dir[id] === 'r', z = 2.4 * vh / PH;
      const flip = b.nat !== 'f' && b.nat !== st.dir[id], bw = vh * 0.92 * b.w / b.h, cx = vw * (right ? 0.44 : 0.56);
      over.innerHTML = `<div class="bk" style="background-image:url(${src});background-size:${PW * z}px ${PH * z}px;background-position:${Math.min(0, Math.max(vw * 1.12 - PW * z, vw * 0.56 - r.x * z))}px ${Math.min(0, Math.max(vh * 1.12 - PH * z, vh * 0.5 - (r.headTop + r.H * 0.12) * z))}px"></div>`
        + `<img class="bust" src="${b.url}" alt="" style="left:${cx - bw / 2}px;${flip ? 'transform:scaleX(-1)' : ''}">`;
      over.dataset.side = right ? 'r' : 'l'; over.classList.add('on');
    }
    function say(b, text) {
      cap.classList.remove('on'); bub.classList.remove('on', 'low', 'far');
      if (b.who && text) {
        const c = P.cast[b.who]; bub.firstChild.textContent = c.name; bub.firstChild.style.color = colorOf(c); bub.children[1].textContent = text;
        bub.classList.toggle('far', !!b.far); bub.style.left = '0px'; bub.style.top = '0px';
        const bw = bub.offsetWidth, bh = bub.offsetHeight, onOver = over.classList.contains('on'), r = rect(b.who);
        let hx = vw / 2, hy = 0, lowB = onOver;
        if (!onOver && r && plateAt(st, b.who) === cur) { hx = r.x * cam.s + cam.x; hy = r.headTop * cam.s + cam.y - vh * 0.02; if (hy - bh < 6) lowB = true; }
        if (onOver) hx = vw * (over.dataset.side === 'r' ? 0.5 : 0.5);
        const left = Math.min(vw - bw - 8, Math.max(8, hx - bw / 2));
        bub.style.left = left + 'px'; bub.style.top = (lowB ? vh - bh - vh * 0.035 : hy - bh) + 'px'; bub.classList.toggle('low', lowB);
        bub.lastChild.style.left = Math.min(bw - 20, Math.max(20, hx - left)) + 'px';
        void bub.offsetWidth; bub.classList.add('on');
      } else if (text) { cap.textContent = text; cap.classList.toggle('hi', false); void cap.offsetWidth; cap.classList.add('on'); }
    }
    // a long line or narration → 2 or 3 bubbles (CLAUDE.md : jamais beaucoup de mots d'un coup)
    function cutText(t, max = 78) {
      t = String(t || '').trim(); if (t.length <= max) return t ? [t] : [];
      const parts = t.match(/[^.!?…]+[.!?…]+["»]?\s*|[^.!?…]+$/g) || [t], out = [];
      for (const p of parts) { const s = p.trim(); if (!s) continue; if (out.length && (out[out.length - 1] + ' ' + s).length <= max) out[out.length - 1] += ' ' + s; else out.push(s); }
      return out.flatMap((s) => { if (s.length <= max * 1.35) return [s]; const k = s.lastIndexOf(',', max) > 20 ? s.lastIndexOf(',', max) + 1 : s.lastIndexOf(' ', max); return [s.slice(0, k).trim(), s.slice(k).trim()]; });
    }
    function drawAll(now) {
      const du = st.duo && UP[st.duo.key] && plateAt(st, st.duo.ids[0]) === cur ? st.duo : null;
      for (const id of here()) place(id, { now, hide: du && du.ids.includes(id) });
      for (const id of Object.keys(els)) if (!st.at[id] || plateAt(st, id) !== cur) els[id].style.opacity = '0';
      let d = world.querySelector('.mzDuo'); if (!du) { if (d) d.remove(); return; }
      if (!d) { d = document.createElement('div'); d.className = 'mzC mzDuo now'; d.innerHTML = '<img alt="" draggable="false">'; world.appendChild(d); }
      const u = UP[du.key], ra = rect(du.ids[0]), rb = rect(du.ids[1]), [a] = du.key.split(':')[1].split('|'), left = ra.x <= rb.x ? du.ids[0] : du.ids[1];
      const H = (ra.H + rb.H) / 2, h = 0.7 * H * u.h / (u.refH || u.h), w = u.w * h / u.h, x = (ra.x + rb.x) / 2, bottom = Math.min(ra.headTop, rb.headTop) + 0.7 * H;
      d.firstChild.src = u.url; d.firstChild.style.transform = `scaleX(${a === P.cast[left].sprite ? 1 : -1})`;
      Object.assign(d.style, { left: x - w / 2 + 'px', top: bottom - h + 'px', width: w + 'px', height: h + 'px', opacity: '1' });
    }
    // show beat n: its movement, then its picture, then its words
    async function show(n, quick) {
      if (!alive) return; busy = true; i = n; const b = beats[n]; bub.classList.remove('on'); cap.classList.remove('on'); $('.mzChoice', root) && $('.mzChoice', root).remove();
      if (b.choice) { busy = false; return choice(b); }
      const before = cur, fx = step(P, st, b), f = st.frame;
      for (const id of Object.keys(els)) els[id].classList.remove('talk');
      if (!quick) {
        const outs = fx.out.filter((o) => o.plate === before && els[o.id]);
        if (outs.length) { over.classList.remove('on'); for (const o of outs) { const d = els[o.id], [PW] = plateOf(before).size; d.classList.remove('now'); d.style.left = (o.side === 'l' ? -d.offsetWidth - 40 : PW + 40) + 'px'; } await wait(650); if (!alive) return; }
      }
      if (f.plate !== cur) { build(f.plate); drawAll(true); aim(f.type === 'insert' ? { type: 'wide', plate: f.plate } : f); if (f.plate === 'salle' && !quick) { await wait(30); const [PW, PH] = plateOf('salle').size, s = cam.s * 1.12; world.classList.add('slow'); world.style.transform = `translate(${vw / 2 - PW * s * 0.5}px,${vh / 2 - PH * s * 0.52}px) scale(${s})`; } }
      else {
        const ins = fx.in.filter((x) => plateAt(st, x.id) === cur);
        if (ins.length && !quick) { for (const x of ins) place(x.id, { now: true, off: x.side }); aim(f, 'glide'); await wait(40); }
        drawAll(quick); if (f.type !== 'insert') aim(f, quick ? '' : 'glide');
      }
      if (f.plate !== before && fx.in.length && !quick) { for (const x of fx.in) if (plateAt(st, x.id) === cur) place(x.id, { now: true, off: x.side }); await wait(40); drawAll(false); }
      if (b.who && els[b.who]) els[b.who].classList.add('talk');
      overlay(f);
      const moved = fx.in.length || fx.out.length || (b.do && ['stand', 'sit', 'near'].includes(b.do));
      if (!quick && moved) await wait(fx.in.length ? 700 : 380);
      if (!alive) return;
      chunks = cutText(b.text || b.narr); ci = 0; busy = false;
      if (chunks.length) say(b, chunks[0]); else if (!quick) { await wait(moved ? 150 : 500); if (alive && i === n) next(); }
    }
    function next() {
      if (busy || !alive || opt.tune) return;
      if (ci + 1 < chunks.length) return say(beats[i], chunks[++ci]);
      if (after) { const a = after; after = null; return a(); }
      if (i + 1 < beats.length) show(i + 1); else end();
    }
    function choice(b) {
      aim({ ...st.frame, type: 'group', ids: null }, 'glide'); over.classList.remove('on');
      const box = document.createElement('div'); box.className = 'mzChoice'; box.innerHTML = b.choice.map((o, k) => `<button type="button" data-o="${k}">${esc(o.t)}</button>`).join('');
      stage.appendChild(box);
      box.onclick = (e) => { const k = e.target.dataset.o; if (k == null) return; e.stopPropagation(); const o = b.choice[k]; box.remove();
        beats = [...beats.slice(0, i + 1), ...(o.narr ? [{ narr: o.narr, react: {} }] : []), ...o.then]; if (i + 1 < beats.length) show(i + 1); else end(); };
    }
    function end() {
      const d = document.createElement('div'); d.className = 'mzEnd'; d.innerHTML = `<h2>${esc(P.title)}</h2><p style="margin:0;color:#c7c7cc">À suivre…</p><div><button type="button" data-h="again">↺ Rejouer</button> <button type="button" data-h="close">Fermer</button></div>`;
      stage.appendChild(d);
    }
    function start(at = 0) { st = init(P); cur = null; beats = P.beats.slice(); $('.mzEnd', root) && $('.mzEnd', root).remove(); build('table'); drawAll(true); aim({ type: 'wide', plate: 'table' });
      (async () => { for (let k = 0; k < at; k++) { if (beats[k].choice) break; await show(k, true); } show(Math.min(at, beats.length - 1)); })(); }
    function back() { if (busy || i <= 0) return; let k = i - 1; while (k > 0 && !(beats[k].text || beats[k].narr)) k--; start(k); }
    function close() { alive = false; removeEventListener('resize', onSize); removeEventListener('keydown', onKey); root.remove(); R = null; if (opt.onClose) opt.onClose(); }
    const onSize = () => { size(); if (st && cur) { aim(st.frame.type === 'insert' ? { type: 'wide', plate: cur } : st.frame); overlay(st.frame); if (!opt.tune && beats[i] && chunks.length) say(beats[i], chunks[ci]); } };
    const onKey = (e) => { if (e.key === 'Escape') close(); else if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); next(); } else if (e.key === 'ArrowLeft') back(); };
    root.onclick = (e) => { const h = e.target.dataset && e.target.dataset.h; if (h === 'close') return close(); if (h === 'back') return back(); if (h === 'again') return start(0); if (e.target.closest('.mzChoice,.mzTune')) return; next(); };
    addEventListener('resize', onSize); addEventListener('keydown', onKey);
    size();
    R = { close, next, back, start, get i() { return i; }, get n() { return beats.length; }, get busy() { return busy; }, root, stage, world, redraw() { build(cur); drawAll(true); aim({ type: 'wide', plate: cur }); }, get st() { return st; }, get cam() { return cam; } };
    if (opt.tune) { st = opt.st; build(opt.plate); drawAll(true); aim({ type: 'wide', plate: opt.plate }); } else start(opt.at || 0);
    return R;
  }

  // ---- 📐 placer : un décor déposé n'a pas sa table au même endroit. On glisse les persos, le bord de la table, la taille ----
  function tune(p) {
    const ids = ['justin', 'amare', 'isa', 'james', 'james_noir', 'ruby'].filter((x) => SP(spriteOf(x))), marks = Object.keys(SET.plates[p].marks);
    const P = { title: '', cast: Object.fromEntries(marks.map((m, n) => [m, { id: m, n, name: m, sprite: spriteOf(ids[n % ids.length]) }])), start: {}, empty: [], inserts: {}, beats: [] };
    const o = () => ((S.marks[p] = S.marks[p] || {}), S.marks[p]);
    const st = init(P); for (const m of marks) { st.at[m] = m; st.sit[m] = !!markOf(m).seat; st.dir[m] = 'r'; } st.plate = p; st.frame = { type: 'wide', plate: p };
    const r2 = player(P, { tune: true, st, plate: p, onClose: () => { save(); render(); } });
    const bar = document.createElement('div'); bar.className = 'mzTune'; const pl0 = SET.plates[p];
    bar.innerHTML = `<b>📐 ${esc(pl0.name)}</b><span class="mzDim">Glisse chaque perso à sa place.</span>`
      + (pl0.edge ? `<label>Bord de la table <input type="range" data-t="edge" min="300" max="${pl0.size[1] - 50}" value="${plateOf(p).edge}"></label>` : '')
      + `<label>Taille <input type="range" data-t="size" min="60" max="150" value="100"></label><button type="button" data-t="reset">Remettre</button><button type="button" data-t="ok" style="background:#30d158;font-weight:700">OK</button>`;
    r2.root.appendChild(bar);
    let drag = null;
    r2.world.addEventListener('pointerdown', (e) => { const d = e.target.closest('.mzC'); if (!d) return; drag = { id: d.dataset.id, x: e.clientX, y: e.clientY, m: markOf(d.dataset.id) }; d.setPointerCapture(e.pointerId); });
    r2.world.addEventListener('pointermove', (e) => { if (!drag) return; const s = r2.cam.s; (o()[drag.id] = o()[drag.id] || {}); Object.assign(o()[drag.id], { x: Math.round(drag.m.x + (e.clientX - drag.x) / s), feet: Math.round(drag.m.feet + (e.clientY - drag.y) / s) }); r2.redraw(); });
    r2.world.addEventListener('pointerup', () => { drag = null; save(); });
    bar.oninput = (e) => { const t = e.target.dataset.t, v = +e.target.value;
      if (t === 'edge') { (o()._ = o()._ || {}).edge = v; }
      if (t === 'size') for (const m of marks) { const b = SET.plates[p].marks[m]; (o()[m] = o()[m] || {}); o()[m].H = Math.round(b.H * v / 100); if (b.sit) o()[m].sit = Math.round(b.sit * v / 100); }
      r2.redraw(); };
    bar.onclick = (e) => { const t = e.target.dataset.t; if (t === 'reset') { delete S.marks[p]; save(); r2.redraw(); } if (t === 'ok') r2.close(); };
  }

  // ---- ce que la pièce demande : chaque image que l'épisode montre (qui, cadrage, visage, geste, ou un duo), moins ce qui
  // est déjà gardé. Le reste est rangé en feuilles sur mesure (4 ou 6 cases ; les cases libres prennent ce qui servira plus tard) ----
  function needs(P) {
    const want = new Map(), seen = new Set(['table']), nm = (x) => (P.cast[x] ? P.cast[x].name : x);
    const q = (t) => { t = String(t); return `«${t.length > 120 ? t.slice(0, 118) + '…' : t}»`; };
    const ctx = (b, id, prev) => (b.who === id && b.text ? `${nm(id)} says ${q(b.text)}${b.to ? ` to ${nm(b.to)}` : ''}.`
      : b.who && b.text ? `${nm(id)} listens while ${nm(b.who)} says ${q(b.text)}${b.to === id ? ` to ${nm(id)}` : b.to ? ` to ${nm(b.to)}` : ''}.`
        : b.narr ? `${q(b.narr)} (${nm(id)})${prev ? `, just after ${nm(prev.who)} said ${q(prev.text)}` : ''}.` : '');
    let prev = null;
    const add = (key, n) => { const x = want.get(key); if (x) x.uses++; else want.set(key, { key, uses: 1, ...n }); };
    const walk = (list, st) => { for (const b of list) {
      if (b.choice) { for (const o of b.choice) walk(o.then, JSON.parse(JSON.stringify(st))); return; }
      step(P, st, b); const f = st.frame; seen.add(st.plate); const was = prev; if (b.who && b.text) prev = b;
      if (f.type === 'insert' || f.plate === 'salle') continue;
      const skip = new Set();
      if (st.duo) { st.duo.ids.forEach((x) => skip.add(x)); const sps = st.duo.key.split(':')[1].split('|'), cids = sps.map((sp) => st.duo.ids.find((x) => P.cast[x].sprite === sp));
        add(st.duo.key, { kind: 'duo', frame: 'mid', sprites: sps, cids, act: b.act, ctx: `${b.narr ? q(b.narr) : ''}${was ? ` just after ${nm(was.who)} said ${q(was.text)}` : ''}`.trim() }); }
      const ids = f.type === 'cu' ? f.ids : f.type === 'two' && f.ids && f.ids.length > 1 ? f.ids : Object.keys(st.at).filter((x) => plateAt(st, x) === f.plate);
      for (const id of ids) { if (skip.has(id) || !P.cast[id] || !st.at[id]) continue; const sp = P.cast[id].sprite, face = st.face[id] || 'neutral';
        if (f.type === 'cu') add(libKey(sp, 'cu', face), { kind: 'solo', frame: 'cu', cid: id, sprite: sp, face, ctx: ctx(b, id, was) });
        else { const g = st.gest[id] || null, same = g && [...want.keys()].find((k) => k.startsWith(`sp:${sp}:mid:`) && k.endsWith(':' + g)); if (same) { want.get(same).uses++; continue; } add(libKey(sp, 'mid', face, g), { kind: 'solo', frame: 'mid', cid: id, sprite: sp, face, gest: g, ctx: ctx(b, id, was) }); } }
    } };
    walk(P.beats, init(P));
    const all = [...want.values()], have = all.filter((n) => UP[n.key]), taken = new Set(), sheets = [];
    // a sheet whose prompt was copied keeps its cells until it is uploaded (what was asked of ChatGPT is what gets cut)
    for (const [sid, sh] of Object.entries(S.sheets || {})) {
      if (sh.cells.every((c) => UP[c.key])) { delete S.sheets[sid]; continue; }
      if (!sh.cells.some((c) => want.has(c.key))) continue;
      sheets.push({ ...sh, sid, cells: sh.cells.map((c) => ({ ...c, uses: (want.get(c.key) || {}).uses || 0 })) }); sh.cells.forEach((c) => taken.add(c.key));
    }
    const groups = new Map();
    for (const n of all) if (!UP[n.key] && !taken.has(n.key)) { const g = n.kind === 'duo' ? 'duo:' + n.sprites.join('|') : `${n.sprite}:${n.frame}`; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(n); }
    for (const list of groups.values()) {
      const duo = list[0].kind === 'duo', max = duo ? 4 : 6, parts = Math.ceil(list.length / max), size = Math.ceil(list.length / parts);   // even sheets: few cells left over
      for (let k = 0; k < list.length; k += size) {
        const cells = list.slice(k, k + size).map((n) => ({ ...n })), n0 = cells[0];
        if (!duo) { const target = cells.length <= 4 ? 4 : 6;
          for (const f of D.EXTRA) { if (cells.length >= target) break; const key = libKey(n0.sprite, n0.frame, f); if (UP[key] || want.has(key) || taken.has(key)) continue;
            cells.push({ key, kind: 'solo', frame: n0.frame, sprite: n0.sprite, cid: n0.cid, face: f, extra: 1, ctx: '', uses: 0 }); taken.add(key); } }
        const c = cells.length, grid = c === 4 ? [2, 2] : c > 4 ? [3, 2] : [c, 1];
        sheets.push(duo ? { kind: 'duo', frame: 'mid', sprites: n0.sprites, cids: n0.cids, names: n0.cids.map(nm), cells, grid }
          : { kind: 'solo', frame: n0.frame, sprite: n0.sprite, cid: n0.cid, name: nm(n0.cid), she: !!P.cast[n0.cid].she, cells, grid });
      }
    }
    // the ones that serve the most first (a sheet already asked of ChatGPT stays on top)
    const worth = (sh) => sh.cells.reduce((n, c) => n + (c.uses || 0), 0);
    sheets.sort((a, b) => (b.sid ? 1 : 0) - (a.sid ? 1 : 0) || worth(b) - worth(a));
    const plates = ['table', 'aside', 'salle'].filter((p) => seen.has(p)).map((p) => ({ p, done: !!UP[`pl:${p}`] }));
    const inserts = [...new Set(P.beats.filter((b) => b.insert).map((b) => b.insert))].map((id) => ({ ...(P.inserts[id] || { id, desc: '' }), done: !!UP[`in:${id}`] }));
    return { sheets, have, total: all.length, plates, inserts };
  }

  // ---- le panneau ----
  let panel = null, msg = '', P = null, N = null;
  const refImg = (c) => { const b = body(c, 'neutral'); return b ? b.url : ''; };
  const FR = Object.fromEntries([...D.FACES, ...D.GESTS].map((f) => [f[0], f[1]]));
  const refsOf = (sh) => (sh.kind === 'duo' ? [{ src: refsFor(sh.sprites[0], 'mid').one, label: `Image 1 (${sh.names[0]})` }, { src: refsFor(sh.sprites[1], 'mid').one, label: `Image 2 (${sh.names[1]})` }]
    : (() => { const r = refsFor(sh.sprite, sh.frame); return [{ src: r.one, label: 'Image 1', why: r.why }, ...(r.two ? [{ src: r.two, label: 'Image 2 (guide)' }] : [])]; })());
  function sheetCard(sh, k) {
    const refs = refsOf(sh), ep = sh.cells.filter((c) => !c.extra).length, col = sh.kind === 'duo' ? '#ff375f' : colorOf(P.cast[sh.cid] || { n: 0 });
    return `<div class="mzCard" style="--c:${col}"><div class="mzRefs">${refs.map((r) => (r.src ? `<div class="mzPic" style="background-image:url('${r.src}')"></div>` : '')).join('')}</div><div class="mzBody">`
      + `<b>${sh.kind === 'duo' ? `${esc(sh.names[0])} × ${esc(sh.names[1])}<em>à deux, une image</em>` : `${esc(sh.name)}<em>${esc(D.FRAMES[sh.frame].name)}</em>`}</b>`
      + `<span class="mzDim">sert ${sh.cells.reduce((n, c) => n + (c.uses || 0), 0)} fois · ${sh.cells.length} cases · ${ep} pour cet épisode${ep < sh.cells.length ? `, ${sh.cells.length - ep} en plus pour plus tard` : ''}${sh.sid ? ' · prompt déjà copié' : ''}${refs[0] && refs[0].why ? ` · image 1 : ${esc(refs[0].why)}` : ''}</span>`
      + `<ol class="mzList">${sh.cells.map((c) => `<li${c.extra ? ' class="x"' : ''}><b>${sh.kind === 'duo' ? esc(c.key.split(':')[2]) : esc(FR[c.face] || c.face)}${c.gest ? ' · ' + esc(FR[c.gest]) : ''}</b> <small>${c.extra ? 'en plus, pour plus tard' : esc(sh.kind === 'duo' ? c.act : c.ctx)}${c.uses > 1 ? ` · ×${c.uses}` : ''}</small></li>`).join('')}</ol>`
      + `<div class="mzRow"><button type="button" data-sp="${k}">📋 Prompt</button>${refs.map((r) => (r.src ? `<button type="button" data-img="${esc(r.src)}">🖼️ ${esc(r.label)}</button>` : '')).join('')}<label class="mzUp">⬆ Déposer<input type="file" accept="image/*" hidden data-us="${k}"></label></div></div></div>`;
  }
  function render() {
    if (!panel) return;
    P = norm(loose(S.play)); N = P && needs(P); const keep = panel.scrollTop;
    const todo = N ? N.sheets.length + N.plates.filter((x) => !x.done).length + N.inserts.filter((x) => !x.done).length : 0;
    panel.innerHTML = `<div class="mzWrap"><div class="mzTop"><b>🎥 Mise en scène · ${esc(SET.name)}</b><button type="button" data-a="close">✕</button></div>`
      + `<p class="mzSub">Un épisode écrit → ce qu’on voit. Tout joue tout de suite avec ce que le jeu a déjà ; chaque feuille déposée le rend plus juste, et reste pour les épisodes suivants.</p>`
      + `<div class="mzRow"><button type="button" class="mzAmber" data-a="ex">📖 L’exemple : « Une place vide, une chope encore pleine »</button></div>`
      + `<h3 class="mzH"><i>1</i>Le script</h3><textarea data-f="script" placeholder="Colle ici l’épisode écrit (le screenplay).">${esc(S.script)}</textarea>`
      + `<div class="mzRow"><button type="button" data-a="prompt">📋 Copier le prompt de mise en scène</button>${ls('smt-key') ? '<button type="button" data-a="haiku">⚡ Haiku le fait</button>' : ''}<span class="mzDim">Le script est dedans. Colle-le dans ChatGPT ou Claude.</span></div>`
      + `<h3 class="mzH"><i>2</i>La pièce</h3><textarea data-f="play" placeholder="Colle ici la réponse (le JSON).">${esc(S.play)}</textarea>`
      + `<p class="${P ? 'mzOk' : 'mzDim'}" data-st>${P ? `✓ ${esc(P.title)} · ${P.beats.length} temps · ${Object.keys(P.cast).length} persos` : S.play.trim() ? 'Pas encore lisible : il faut tout le JSON, de { à }.' : ''}</p>`
      + `<p class="mzMsg">${esc(msg)}</p>`
      + (N ? `<h3 class="mzH"><i>3</i>Ce qui manque${todo ? ` <span class="mzDim">· ${todo} image${todo > 1 ? 's' : ''} à faire (facultatif)</span>` : ' <span class="mzOk">· rien, tout est là</span>'}</h3>`
        + `<p class="mzDim">L’épisode montre ${N.total} images de persos (un visage, un cadrage, un geste, ou deux persos ensemble). ${N.have.length ? `<span class="mzOk">✓ ${N.have.length} déjà gardées</span>, pas redemandées.` : 'Aucune encore gardée.'} Chaque feuille ne contient que ce qui manque, avec le moment exact que chaque case joue. Pour chacune : 📋 le prompt, 🖼️ les images à coller avant, puis ⬆ ce que ChatGPT a fait.</p>`
        + (N.have.length ? `<div class="mzCells">${N.have.slice(0, 40).map((n) => `<img src="${UP[n.key].url}" alt="" title="${esc(n.key)}">`).join('')}</div>` : '')
        + `<h4 class="mzH4">Qui joue qui</h4><div class="mzCast">${Object.values(P.cast).map((c) => { const src = refImg(c), k = S.k[c.sprite] || 1;
          return `<div class="mzWho" style="--c:${colorOf(c)}"><div class="mzPic">${src ? `<img src="${src}" alt="">` : ''}</div><div><b>${esc(c.name)}</b><span class="mzDim">${c.extra ? 'joué par ' : ''}${esc(c.sprite)}${c.player ? ' · le joueur' : ''}</span>`
            + `<div class="mzRow"><button type="button" data-role="${c.id}">🔁</button>${mine(c.sprite, 'mid').length ? `<button type="button" data-k="${c.sprite}:-1">−</button><span class="mzDim">${Math.round(k * 100)} %</span><button type="button" data-k="${c.sprite}:1">+</button>` : ''}</div></div></div>`; }).join('')}</div>`
        + (Object.values(P.cast).some((c) => c.extra) ? '<p class="mzDim">« joué par » : un rôle sans perso à lui. Pour un vrai figurant : Banque › Nouveau perso, puis 🔁.</p>' : '')
        + (N.sheets.length ? `<h4 class="mzH4">Les feuilles</h4>` + N.sheets.map(sheetCard).join('') : '')
        + N.plates.map(({ p, done }) => { const pl = plateOf(p);
          return `<div class="mzCard" style="--c:#5e5ce6"><div class="mzPic wide" style="background-image:url(${pl.up ? pl.up.url : pl.src})"></div><div class="mzBody"><b>🏠 ${esc(pl.name)}<em>${done ? '✓ gardé' : 'par défaut (fait à partir de la taverne du jeu)'}</em></b>`
            + `<span class="mzDim">${p === 'table' ? 'La table vue de face : ils sont assis derrière, on voit tout le monde.' : p === 'aside' ? 'À quelques pas de la table : deux personnes face à face.' : 'La salle de loin, pour ouvrir.'}</span>`
            + `<div class="mzRow">${done ? '' : `<button type="button" data-pp="${p}">📋 Prompt</button><button type="button" data-img="${SET.ref}">🖼️ Image 1 (la taverne)</button>`}<label class="mzUp">${done ? '↻ Remplacer' : '⬆ Déposer'}<input type="file" accept="image/*" hidden data-upl="${p}"></label>${p !== 'salle' ? `<button type="button" data-tune="${p}">📐 Placer</button>` : ''}${done ? `<button type="button" data-del="pl:${p}">Revenir au défaut</button>` : ''}</div></div></div>`; }).join('')
        + N.inserts.map((n) => `<div class="mzCard" style="--c:#bf5af2"><div class="mzPic wide" style="background-image:url(${n.done ? UP[`in:${n.id}`].url : n.prop ? `props/${n.prop}.webp` : ''});background-size:${n.done ? 'cover' : 'contain'}"></div><div class="mzBody"><b>🔍 Insert : ${esc(n.id)}<em>${n.done ? '✓ gardé' : n.prop ? 'par défaut : l’objet seul' : 'par défaut : le texte seulement'}</em></b>`
          + `<span class="mzDim">${esc(n.desc)}</span><div class="mzRow">${n.done ? '' : `<button type="button" data-pi="${n.id}">📋 Prompt</button><button type="button" data-img="${SET.ref}">🖼️ Image 1 (la taverne)</button>`}<label class="mzUp">${n.done ? '↻ Remplacer' : '⬆ Déposer'}<input type="file" accept="image/*" hidden data-upi="${n.id}"></label>${n.done ? `<button type="button" data-del="in:${n.id}">Retirer</button>` : ''}</div></div></div>`).join('')
        : '')
      + `</div><div class="mzPlayBar"><button type="button" class="mzGo" data-a="play"${P ? '' : ' disabled style="opacity:.4"'}>▶ Jouer</button></div>`;
    panel.scrollTop = keep;
  }
  const say = (t) => { msg = t; render(); };
  const copy = (text, then) => (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => say(then), () => say('Copie impossible ici.'));
  async function copyImg(src, btn) {
    try { const im = new Image(); im.src = src; await im.decode(); const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0);
      const blob = await new Promise((ok) => c.toBlob(ok, 'image/png')); await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      const was = btn.textContent; btn.textContent = '✓ Copiée'; setTimeout(() => (btn.textContent = was), 1400);
    } catch { window.open(src, '_blank'); }
  }
  const toBlob = (cv, type = 'image/png', q) => new Promise((ok) => cv.toBlob(ok, type, q));
  // a picture (a decor, an insert): kept at 1800 wide at most
  async function keepImage(key, file) {
    const bmp = await createImageBitmap(file), k = Math.min(1, 1800 / bmp.width), c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height); await put(key, await toBlob(c, 'image/webp', 0.86), c.width, c.height);
  }
  // a sheet whose prompt goes out is pinned: its cells stay the same until it comes back
  const pin = (sh) => { if (!sh.sid) { sh.sid = `m${++S.sn}`; S.sheets[sh.sid] = { ...sh, cells: sh.cells.map(({ uses, ...c }) => c) }; delete S.sheets[sh.sid].sid; save(); } return sh; };
  // a sheet: cut in its cells (importer.js keys the green out and finds each figure), each cell kept under its key
  async function keepSheet(sh, file) {
    if (!window.IMPORT || !IMPORT.cells) throw new Error('La découpe n’est pas chargée.');
    const cells = await IMPORT.cells(file, { grid: sh.grid, poses: sh.cells.map((c) => c.key) }, (t) => say(t));
    const tall = cells.filter((x, k) => sh.cells[k].gest !== 'lean'), refH = Math.max(...(tall.length ? tall : cells).map((x) => x.h));
    for (const [k, x] of cells.entries()) { const c = sh.cells[k]; await put(c.key, await toBlob(x.canvas), x.w, x.h, { refH, face: c.face, gest: c.gest || null, moment: c.act || c.ctx || '' }); }
    delete S.sheets[sh.sid]; save();
    return sh.cells.map((c) => c.key);
  }
  async function onClick(e) {
    const t = e.target.closest('button,[data-a]'); if (!t) return; const d = t.dataset;
    if (d.a === 'close') return close();
    if (d.a === 'ex') { S.play = JSON.stringify(D.EX); save(); msg = 'L’exemple est chargé : ▶ Jouer.'; return render(); }
    if (d.a === 'prompt') { if (!S.script.trim()) return say('Colle d’abord le script (1).'); return copy(D.STAGE(S.script.trim(), pool().filter((x) => !/^isa_/.test(x)).concat('isa').join(', ')), 'Prompt copié (le script est dedans). Colle la réponse en 2.'); }
    if (d.a === 'haiku') { if (!S.script.trim()) return say('Colle d’abord le script (1).'); say('Haiku met en scène…');
      try { const r = await GEN.ask(ls('smt-key'), [{ role: 'user', content: D.STAGE(S.script.trim(), pool().filter((x) => !/^isa_/.test(x)).concat('isa').join(', ')) }], 'You are a film director. Reply with the JSON only.', 16000); S.play = JSON.stringify(r.json); save(); return say('Mis en scène par Haiku.'); } catch (err) { return say('Haiku : ' + err.message); } }
    if (d.a === 'play') { if (P) { panel.hidden = true; player(P, { onClose: () => { if (panel) { panel.hidden = false; render(); } } }); } return; }
    if (d.sp) { const sh = pin(N.sheets[+d.sp]), refs = refsOf(sh), r = sh.kind === 'solo' ? refsFor(sh.sprite, sh.frame) : {};
      return copy(D.sheetPrompt(sh, r), `Prompt copié. Dans ChatGPT : colle ${refs.filter((x) => x.src).map((x) => x.label.toLowerCase()).join(' puis ')}, puis le prompt. Puis ⬆ Déposer sur cette même carte.`); }
    if (d.pp) return copy(D.PLATE_PROMPT[d.pp], `${SET.plates[d.pp].name} : prompt copié. Dans ChatGPT : colle l’image 1 (la taverne), puis le prompt.`);
    if (d.pi) return copy(D.insertPrompt(P.inserts[d.pi] || { id: d.pi }), `Insert « ${d.pi} » : prompt copié.`);
    if (d.img) return copyImg(d.img, t);
    if (d.tune) return tune(d.tune);
    if (d.del) { await drop([d.del]); return say('Retiré.'); }
    if (d.k) { const [sp, dir] = d.k.split(':'); S.k[sp] = Math.round(((S.k[sp] || 1) + dir * 0.05) * 100) / 100; save(); return render(); }
    if (d.role) { const c = P.cast[d.role], taken = new Set(Object.values(P.cast).map((x) => x.sprite)), list = pool().filter((x) => !taken.has(x) && !/^isa_(or|noir)/.test(x)); if (!list.length) return;
      const k = list.indexOf(S.roles[c.id]); S.roles[c.id] = list[(k + 1) % list.length]; save(); return say(`${c.name} est joué par ${S.roles[c.id]}.`); }
  }
  async function onChange(e) {
    const t = e.target, d = t.dataset, file = t.files && t.files[0]; if (!file) return; t.value = '';
    try {
      if (d.upl) { say('Je garde le décor…'); await keepImage(`pl:${d.upl}`, file); say(await share([`pl:${d.upl}`], `décor ${d.upl}`) + (d.upl !== 'salle' ? ' Vérifie les places : 📐 Placer.' : '')); }
      else if (d.upi) { say('Je garde l’insert…'); await keepImage(`in:${d.upi}`, file); say(await share([`in:${d.upi}`], `insert ${d.upi}`)); }
      else if (d.us) { const sh = pin(N.sheets[+d.us]); say('Découpe…'); const keys = await keepSheet(sh, file); say(`${keys.length} images gardées. ` + await share(keys, sh.kind === 'duo' ? `${sh.names.join(' × ')}, à deux` : `${sh.name}, ${D.FRAMES[sh.frame].name}`)); }
    } catch (err) { say(String(err.message || err)); }
  }
  function onInput(e) { const f = e.target.dataset.f; if (!f) return; S[f] = e.target.value; save();
    if (f === 'play') { P = norm(loose(S.play)); const el = $('[data-st]', panel); if (el) { el.className = P ? 'mzOk' : 'mzDim'; el.textContent = P ? `✓ ${P.title} · ${P.beats.length} temps` : S.play.trim() ? 'Pas encore lisible : il faut tout le JSON, de { à }.' : ''; } clearTimeout(onInput.t); onInput.t = setTimeout(() => { if (document.activeElement !== e.target) render(); }, 600); } }
  async function open() {
    style(); await boot(); if (panel) panel.remove();
    panel = document.createElement('div'); panel.id = 'mz'; document.body.appendChild(panel);
    panel.addEventListener('click', onClick); panel.addEventListener('change', (e) => { if (e.target.type === 'file') onChange(e); else if (e.target.dataset.f) render(); }); panel.addEventListener('input', onInput);
    msg = ''; render();
  }
  function close() { if (panel) panel.remove(); panel = null; }

  return { open, close, play: async (j, opt) => { await boot(); const p = norm(typeof j === 'string' ? loose(j) : j); return p && player(p, opt); }, norm, loose, needs, UP, put, get R() { return R; }, data: D };
})();
