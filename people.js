// Everyone who has the app open, on every device (for now everyone is everyone's friend): who's here, and invites.
// Same public relay as the game's rooms. Used by Full demo (demo.html) and the game (index.html), each on its own client.
// sousmontoit/v1/people/<id>, retained, refreshed every 10 s, emptied when the page goes away: {n: name, ch: their
//   character, t, s: the story they're in, room: their waiting room's code while it's open}. Silent for 35 s = gone.
// sousmontoit/v1/inbox/<id>: an invite {invite: {room, s}, from, n, ch, t}; "Plus tard" answers in the inviter's room
//   (sousmontoit/v1/<room>/in, {e: 'no'}), where the game already listens to its joiners.
// The relay for everything live (rooms too): HiveMQ's public one. EMQX's (broker.emqx.io), used until 25/10, stopped
// answering (the socket opens, the broker never acknowledges).
// A test points at its own relay with localStorage smt-broker (one running on the PC: the public ones are slow some nights)
window.BROKER = (() => { try { return localStorage.getItem('smt-broker') || 'wss://broker.hivemq.com:8884/mqtt'; } catch { return 'wss://broker.hivemq.com:8884/mqtt'; } })();
// every topic lives under NS; a test sets localStorage smt-ns to a channel of its own, so it never meets real phones
window.NS = (() => { try { return localStorage.getItem('smt-ns') || 'sousmontoit/v1'; } catch { return 'sousmontoit/v1'; } })();
window.PEOPLE = (() => {
  const ROOT = NS;
  const people = new Map();   // id -> {id, n, ch, t, s, room}
  let client = null, myId = null, mine = () => ({}), onChange = () => {}, onInvite = () => {};
  function here() {
    const m = mine();
    if (client && client.connected && m.n) client.publish(`${ROOT}/people/${myId}`, JSON.stringify({ ...m, t: Date.now() }), { retain: true });
  }
  function attach(c, id, o) {
    client = c; myId = id; mine = o.me; onChange = o.change || onChange; onInvite = o.invite || onInvite;
    const sub = () => { c.subscribe([`${ROOT}/people/+`, `${ROOT}/inbox/${id}`], { qos: 1 }); here(); for (const [t, v] of later.splice(0)) send(t, v); };
    if (c.connected) sub();
    c.on('connect', sub);
    c.on('message', (t, buf, packet) => {
      if (t.startsWith(`${ROOT}/people/`)) {
        const pid = t.slice(ROOT.length + 8);
        let v = null; try { v = buf.length ? JSON.parse(buf.toString()) : null; } catch { /* not ours */ }
        // a retained one may be old: trust its own time; a live refresh is fresh whatever the clocks say
        if (v && typeof v === 'object' && v.n) people.set(pid, { id: pid, n: String(v.n).slice(0, 16), ch: v.ch || null, s: v.s || null, room: v.room || null,
          t: packet && packet.retain ? Math.min(Date.now(), +v.t || 0) : Date.now() });
        else people.delete(pid);
        onChange(); return;
      }
      if (t === `${ROOT}/inbox/${id}`) {
        let v = null; try { v = JSON.parse(buf.toString()); } catch { /* not ours */ }
        if (v && v.invite && v.invite.room && v.from !== myId) onInvite(v);
      }
    });
    setInterval(() => { here(); onChange(); }, 10000);
    addEventListener('pagehide', () => { if (client.connected) client.publish(`${ROOT}/people/${myId}`, '', { retain: true }); });
  }
  const online = () => [...people.values()].filter((p) => p.id !== myId && Date.now() - p.t < 35000).sort((a, b) => a.n.localeCompare(b.n));
  // sent before the relay answers (a page that just opened): it leaves as soon as it's connected
  const later = [];
  const send = (t, v) => { if (client && client.connected) client.publish(t, JSON.stringify(v), { qos: 1 }); else later.push([t, v]); };
  const invite = (to, room, s, from) => send(`${ROOT}/inbox/${to}`, { invite: { room, s }, from: myId, ...from, t: Date.now() });
  const decline = (v, n) => send(`${ROOT}/${v.invite.room}/in`, { id: myId, n, e: 'no' });
  return { attach, online, here, invite, decline, get: (id) => people.get(id) };
})();
