// What people do with the app, counted on each device and sent to the relay, so the game's Stats screen sees every
// device (not just the phone it's open on). Used by Full demo (demo.html), the game (index.html) and series.js.
// smt-stats, one per device: {u: its id, d: [days it was opened], f: {feature: times}, s: {story: {n: its title,
//   o: its page opened, plays, done, ep: {n: episode n finished}, nx: Continue pressed on an episode's end, picks, fb}},
//   gen, notes}. The whole of it is one retained message, <NS>/st/<u>, sent again whenever it changed: a relay that
//   forgets it gets it back at the device's next visit. The PC keeps a copy (Process - Onboarding.py).
// Full demo's previews (?preview=) count nothing; a test sets localStorage smt-ns and never meets the real numbers.
window.USAGE = (() => {
  const KEY = 'smt-stats', SENT = 'smt-stats-sent';
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch { return null; } return null; };
  const NSU = ls('smt-ns') || 'sousmontoit/v1', BROKERU = ls('smt-broker') || 'wss://broker.hivemq.com:8884/mqtt';
  const off = new URLSearchParams(location.search).has('preview');
  const get = () => { try { return JSON.parse(ls(KEY)) || {}; } catch { return {}; } };
  const today = () => new Date().toLocaleDateString('sv');   // YYYY-MM-DD, local
  function stamp(st) {
    st.u = st.u || Math.random().toString(36).slice(2, 12);
    st.d = st.d || []; if (!st.d.includes(today())) st.d = [...st.d, today()].slice(-90);
  }
  let client = null, timer = 0;
  function lib() {
    if (window.mqtt) return Promise.resolve();
    return new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://unpkg.com/mqtt@5.10.1/dist/mqtt.min.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  }
  async function connect() {
    if (client) return client;
    await lib();
    client = mqtt.connect(BROKERU, { clientId: 'smtu-' + Math.random().toString(16).slice(2, 10), reconnectPeriod: 5000, connectTimeout: 15000, keepalive: 30 });
    return client;
  }
  async function send() {
    const raw = ls(KEY); if (!raw || raw === ls(SENT)) return;
    let st; try { st = JSON.parse(raw); } catch { return; }
    try { await connect(); } catch { return; }
    const go = () => client.publish(`${NSU}/st/${st.u}`, raw, { qos: 1, retain: true }, (err) => { if (!err) ls(SENT, raw); });
    if (client.connected) go(); else client.once('connect', go);
  }
  const later = () => { clearTimeout(timer); timer = setTimeout(send, 1200); };
  function bump(f) {
    if (off) return;
    const st = get(); stamp(st); f(st);
    ls(KEY, JSON.stringify(st)); later();
  }
  const story = (id, title, f) => bump((st) => { st.s = st.s || {}; const r = (st.s[id] = st.s[id] || {}); if (title) r.n = title; f(r); });
  return {
    bump, get,
    feature: (name) => bump((st) => { st.f = st.f || {}; st.f[name] = (st.f[name] || 0) + 1; }),
    opened: (id, title) => story(id, title, (r) => { r.o = (r.o || 0) + 1; }),
    played: (id, title) => story(id, title, (r) => { r.plays = (r.plays || 0) + 1; }),
    episode: (id, title, n) => story(id, title, (r) => { r.ep = r.ep || {}; r.ep[n] = (r.ep[n] || 0) + 1; }),
    next: (id, title) => story(id, title, (r) => { r.nx = (r.nx || 0) + 1; }),
    // every device's tally, live: f(map of id -> tally) on each one that arrives
    all(f) {
      const devices = new Map();
      connect().then((c) => {
        const sub = () => c.subscribe(`${NSU}/st/+`, { qos: 1 });
        if (c.connected) sub(); c.on('connect', sub);
        c.on('message', (t, buf) => {
          if (!t.startsWith(`${NSU}/st/`)) return;
          let v = null; try { v = buf.length ? JSON.parse(buf.toString()) : null; } catch { /* not ours */ }
          if (v && typeof v === 'object') devices.set(t.slice(NSU.length + 4), v); else devices.delete(t.slice(NSU.length + 4));
          f(devices);
        });
      }).catch(() => f(devices));
      f(devices);
    },
  };
})();
// a visit counts as a day (that's what « they come back » is measured on)
USAGE.bump(() => {});
