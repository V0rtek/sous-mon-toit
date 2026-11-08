// Floor 31 — the heist's beginning (08/11, Justin's beats), TV + phones only. The people and the places are plain shapes
// for now (a circle head, a body; the decors in rectangles), the lines as written. P1 = Marcus (pa): his kids, his son Leo
// texting, his wife Sarah. P2 = Ray (pb): "nothing to lose", but Amy calls. 1 the black card (the place, the hour), 2 the
// lobby, 3 Marcus's feet won't stop, 4 Ray puts the briefcase down, 5-7 the three lines, 8 Marcus's phone (Leo, his kids
// behind), 9 Marcus looks at Ray: everything to lose or to win (the first choice: the TV says to look at your phone),
// 10-11 Amy calls Ray (only he sees who), pick up or later (the crowd goes muffled), 12 picked up: the screen splits, a
// clock ticks, Ray on the call, Marcus texting Leo (next season, the money), 13 Ray takes the briefcase and stands up,
// 14 the elevator: the crowd comes back, Double It starts far and muffled, 15 the last text before going in (each his own),
// 16 in, 17 up: a dot a bar, the briefcase, the masks; the doors open on the drop: Amy, at the loan counter. Then a fast
// forward (the key moments, a tap on a phone moves on, the real choice screens and music): the robbery, Marcus sends one to
// the vault, Amy takes the guard's gun and holds the other one; he shows his face or not; the one back from the vault picks
// (Marcus: shoot her to save his friend, lower his gun, take the aim; Ray: show himself to her, shoot, drop the money).
// Loaded after story.js and bar.js (scene, say, narr, R).
(() => {
  const SKIN = '#d8c3ab', P1 = '#3b82f6', P2 = '#ef4444', AMY = '#c084fc', GREY = '#4b5563';
  const C = (x, y, d, color, o) => R(x - d / 2, y - d / 2, d, d, color, { r: d / 2, ...o });   // a circle, by its centre
  // someone, head and shoulders above y (a table's top, the frame's bottom): s = size; o.blur for the crowd behind
  // Marcus's and Ray's shapes carry who they are (by their colour): the one choosing stays lit
  const whoOf = (color, o) => ({ who: o.who || (color === P1 ? 'pa' : color === P2 ? 'pb' : undefined) });
  const tagged = (list, color, o) => { const w = whoOf(color, o); return w.who ? list.map((r) => ({ ...r, ...w })) : list; };
  const bust = (x, y, s, color, o = {}) => tagged([
    R(x - 60 * s, y - 150 * s, 120 * s, 150 * s + 2, color, { r: `${50 * s}px ${50 * s}px 0 0`, ...o }),
    C(x, y - 195 * s, 78 * s, o.face || SKIN, o.blur ? { blur: o.blur } : {}),
  ], color, o);
  // someone standing, feet on y
  const stand = (x, y, s, color, o = {}) => tagged([
    R(x - 26 * s, y - 120 * s, 22 * s, 120 * s, '#1f2937'), R(x + 4 * s, y - 120 * s, 22 * s, 120 * s, '#1f2937'),
    R(x - 45 * s, y - 270 * s, 90 * s, 160 * s, color, { r: `${36 * s}px ${36 * s}px 8px 8px`, ...o }),
    C(x, y - 305 * s, 64 * s, o.face || SKIN, o.blur ? { blur: o.blur } : {}),
  ], color, o);
  const glow = (x, y, who) => R(x - 18, y - 30, 36, 60, '#e0f2fe', { r: 6, glow: '0 0 40px 14px rgba(186,230,253,.55)', who });   // a phone, lit
  const SIZE = [1920, 1080], place = (o) => ({ size: SIZE, spots: {}, face: {}, front: [], ...o });

  // ---- the places ----
  // (09/11) Justin's pictures: the lobby, wide; the two armchairs with Marcus and Ray cut out of the green screen and placed as in
  // his reference (Marcus on the left, talking with his hands; Ray on the right, in the suit, thinking)
  // the two of them as characters too (the pick screen, the choice cards): their cut-out, seated
  SPRITES.h_marcus = { refH: 806, poses: { listen: [274, 806] } }; SPRITES.h_ray = { refH: 792, poses: { listen: [270, 792] } };
  FACE.h_marcus = { listen: 'r' }; FACE.h_ray = { listen: 'l' };
  const PIC = [1672, 941], MARCUS = { src: 'marcus_sit', x: 496, y: 883, w: 548, who: 'pa' }, RAY = { src: 'ray_sit', x: 1222.5, y: 876, w: 539, who: 'pb' };
  SCENES.h_lobby = { image: 'bg/lobby_wide.webp', size: PIC, spots: {}, face: {}, ambience: 'crowd', back: [], front: [] };
  const chairs = (people, front = []) => ({ image: 'bg/lobby_chairs.webp', size: PIC, spots: {}, face: {}, ambience: 'crowd', back: [], props: people, front });
  // (09/11) Justin's two frames: the same shot, the right foot flat (a) or turned out (b); they alternate = the foot that won't stop
  SCENES.h_feet_a = { image: 'bg/feet_a.webp', size: PIC, spots: {}, face: {}, ambience: 'crowd', back: [], front: [] };
  SCENES.h_feet_b = { ...SCENES.h_feet_a, image: 'bg/feet_b.webp' };
  // seen from above: the two armchairs, the table, Marcus's phone on it, the briefcase by Ray (lit: the phone buzzing); his phone,
  // close: Leo on the lock screen, Leo's text on it (Justin's picture, its text changed)
  const pic = (image, front = []) => ({ image, size: PIC, spots: {}, face: {}, ambience: 'crowd', back: [], front });
  // (09/11) the top view: the empty armchairs + the two of them cut out, placed as in Justin's top view
  const TOP = [{ src: 'marcus_top', x: 430.5, y: 860, w: 481, who: 'pa' }, { src: 'ray_top', x: 1247, y: 883, w: 534, who: 'pb' }];
  const topv = (front = []) => ({ ...pic('bg/lobby_top.webp', front), props: TOP });
  SCENES.h_top = topv();
  SCENES.h_top_buzz = topv([R(698, 398, 58, 96, 'rgba(225,238,255,.5)', { r: 10, glow: '0 0 70px 28px rgba(200,225,255,.75)', who: 'pa' })]);
  SCENES.h_phone = pic('bg/phone_leo.webp');
  SCENES.h_two = chairs([MARCUS, RAY]);   // Marcus talks, Ray thinks
  // (09/11) Justin's next pictures: Ray's pocket buzzing (Amy calls); Ray up, his phone in hand, Marcus still talking; the
  // elevators (Ray pressing the button, Marcus hands in pockets, placed as in his reference); Marcus's pocket buzzing at the
  // elevator; inside, from behind: the floors going up on the display (the « 31 » redrawn: 2, 8), Ray opening the briefcase (14),
  // the gun handed over, the mask handed over (26), masks on (31), the doors cracking open, the doors open on the bank
  SCENES.h_ray_pocket = pic('bg/ray_pocket.webp');
  SCENES.h_ray_phone = chairs([{ src: 'marcus_sit2', x: 543, y: 907, w: 500, who: 'pa' }, { src: 'ray_phone', x: 1188, y: 892, w: 360, who: 'pb' }]);
  SCENES.h_lift_hall = { image: 'bg/lift_hall.webp', size: PIC, spots: {}, face: {}, ambience: 'crowd', back: [], front: [],
    props: [{ src: 'marcus_stand', x: 546.5, y: 1468, w: 493, who: 'pa' }, { src: 'ray_point', x: 1072.5, y: 1470, w: 651, who: 'pb' }] };
  SCENES.h_mpocket = pic('bg/marcus_pocket.webp');
  const inside = (image) => ({ image, size: PIC, spots: {}, face: {}, ambience: 'into the elevator', back: [], front: [] });
  for (const [k, f] of [['h_in_02', 'elev_02'], ['h_in_08', 'elev_08'], ['h_case14', 'case_14'], ['h_gun', 'gun_handover'], ['h_mask26', 'mask_26'], ['h_masked', 'elev_masked'], ['h_crack', 'elev_crack']]) SCENES[k] = inside(`bg/${f}.webp`);
  SCENES.h_bank = { image: 'bg/bank_open.webp', size: PIC, spots: {}, face: {}, back: [], front: [] };
  // Ray talks (his hand out), Marcus listens (hands together): when Ray has the line
  SCENES.h_two_r = chairs([{ src: 'marcus_listen', x: 497.5, y: 883, w: 547, who: 'pa' }, { src: 'ray_talk', x: 1224.5, y: 876, w: 539, who: 'pb' }]);
  const CLOCK = (x, y) => [C(x, y, 150, '#e5e7eb', { line: '8px solid #111827' }), R(x - 5, y - 55, 10, 55, '#111827', { r: 5, rot: -30, origin: '50% 100%' }), R(x - 4, y - 40, 8, 40, '#111827', { r: 4, rot: -2, origin: '50% 100%' })];
  SCENES.h_side_pa = place({ ambience: 'crowd', back: [R(0, 0, 1920, 1080, '#1b2230'), ...bust(960, 1000, 2.2, P1), glow(1080, 930, 'pa'), R(500, 980, 920, 60, '#5b4636', { r: 8 }), ...CLOCK(960, 150)] });
  SCENES.h_side_pb = place({ ambience: 'crowd', back: [R(0, 0, 1920, 1080, '#22304a'), R(560, 100, 800, 640, '#3b5375'), ...stand(960, 1180, 2.6, P2), R(1040, 330, 54, 120, '#0b0b0d', { r: 10, who: 'pb' }), ...CLOCK(1700, 150)] });
  // the TV, while they're on their phones: a clock, full screen
  SCENES.h_clock = place({ ambience: 'crowd', back: [R(0, 0, 1920, 1080, '#0d0f14'), C(960, 540, 900, '#e5e7eb', { line: '26px solid #111827' }),
    ...Array.from({ length: 12 }, (_, i) => R(953, 112, 14, 60, '#111827', { r: 7, rot: i * 30, origin: '50% 428px' })),
    R(946, 230, 28, 310, '#111827', { r: 14, rot: -30, origin: '50% 100%' }), R(948, 330, 24, 210, '#111827', { r: 12, rot: -4, origin: '50% 100%' }),
    R(955, 140, 10, 400, '#dc2626', { r: 5, rot: 0, spin: 60, origin: '50% 100%' }), C(960, 540, 44, '#dc2626')] });

  // ---- the fast forward (the key moments, no transitions): the robbery, Amy takes the guard's gun ----
  const BANK = [R(0, 0, 1920, 1080, '#e7e2d3'), R(0, 820, 1920, 260, '#cfc6b0'), R(300, 560, 1320, 200, '#5b4636'), R(300, 540, 1320, 30, '#7a5f48')];
  const MASK = '#f5f5f4', GUARD = '#334155';
  const lie = (x, y, color, s = 1) => [R(x - 120 * s, y - 50 * s, 240 * s, 64 * s, color, { r: 32 * s }), C(x + 150 * s, y - 24 * s, 70 * s, SKIN)];
  // someone standing with a gun held out (dir 1: to the right), hands up (up), masked or not
  const armed = (x, y, s, color, dir, o = {}) => {
    const sy = y - 240 * s, len = 170 * s, ax = dir > 0 ? x + 30 * s : x - 30 * s - len;
    return tagged([...stand(x, y, s, color, { face: o.face || SKIN }),
      R(ax, sy, len, 30 * s, color, { r: 15 * s }), R(dir > 0 ? ax + len : ax - 60 * s, sy - 12 * s, 60 * s, 34 * s, '#0b0b0d', { r: 6 })], color, o);
  };
  const handsUp = (x, y, s, color, o = {}) => tagged([...stand(x, y, s, color, o), R(x - 70 * s, y - 380 * s, 28 * s, 130 * s, color, { r: 14 * s }), R(x + 42 * s, y - 380 * s, 28 * s, 130 * s, color, { r: 14 * s })], color, o);
  const COL = { pa: P1, pb: P2 };
  // (09/11) Justin's three: out of the elevator, guns up; the room, hands up; the alarm, red, everyone on the floor
  for (const [k, f] of [['h_rob_out', 'rob_out'], ['h_rob_hands', 'rob_hands'], ['h_rob_red', 'rob_red']]) SCENES[k] = { image: `bg/${f}.webp`, size: PIC, spots: {}, face: {}, back: [], front: [] };
  SCENES.h_ray_sees = place({ back: [R(0, 0, 1920, 1080, '#cfc6b0'), R(160, 600, 980, 210, AMY, { r: 105 }), C(1240, 640, 280, SKIN),
    R(1540, 0, 380, 520, P2, { r: '0 0 0 160px' }), R(1420, 380, 220, 60, '#0b0b0d', { r: 8 })] });   // her face on the floor; his sleeve, his gun
  const vault = (k) => place({ back: [R(0, 0, 1920, 1080, '#2b2f36'), C(1180, 520, 760, '#9ca3af', { line: '34px solid #6b7280' }), C(1180, 520, 120, '#6b7280'),
    ...handsUp(560, 1060, 1.5, GREY), ...armed(260, 1080, 1.9, COL[k], 1, { face: MASK })] });
  SCENES.h_vault_pa = vault('pa'); SCENES.h_vault_pb = vault('pb');
  SCENES.h_holster = place({ back: [R(0, 0, 1920, 1080, '#cfc6b0'), R(0, 420, 1920, 420, GUARD, { r: 60 }), R(980, 470, 180, 260, '#1f2937', { r: 22 }),
    R(1020, 400, 80, 150, '#0b0b0d', { r: 10 }), R(0, 640, 980, 120, AMY, { r: 60 }), C(990, 690, 130, SKIN)] });
  const aim = (k, off) => place({ back: [...BANK, ...lie(1000, 1010, GUARD), ...lie(560, 960, GREY),
    ...handsUp(640, 1080, 2, COL[k], { face: off ? SKIN : MASK }), ...armed(1320, 1080, 2, AMY, -1)] });
  const face = (k) => place({ back: [R(0, 0, 1920, 1080, '#e7e2d3'), ...bust(960, 1080, 3, COL[k]), C(1380, 980, 200, MASK)] });   // his face, the mask in his hand
  // the one Amy holds at gunpoint (left), Amy (centre), the other one back from the vault (right), his gun on her
  const standoff = (w, off) => { const o = w === 'pa' ? 'pb' : 'pa'; return place({ back: [...BANK, ...lie(1000, 1010, GUARD),
    ...handsUp(380, 1080, 1.8, COL[w], { face: off ? SKIN : MASK }), ...armed(960, 1080, 1.8, AMY, -1),
    ...armed(1600, 1080, 1.8, COL[o], -1, { face: MASK }), R(1700, 760, 160, 120, '#26201b', { r: 12 })] }); };
  for (const k of ['pa', 'pb']) { SCENES['h_aim_' + k] = aim(k); SCENES['h_aim_' + k + '_off'] = aim(k, true); SCENES['h_face_' + k] = face(k);
    SCENES['h_standoff_' + k] = standoff(k); SCENES['h_standoff_' + k + '_off'] = standoff(k, true); }
  SCENES.h_black = place({ back: [R(0, 0, 1920, 1080, '#000')] });

  const at = (id) => [scene(id, {}), { cam: 'wide', at: SCENES[id].size[0] / 2 }];   // a place, the camera on all of it
  const S = (who, text, o) => ({ say: who, text, ...o });          // a line (no pose: they're shapes)
  const T = (text) => ({ narr: text });                            // a key moment of the fast forward (it goes on like the rest)
  const N = { pa: 'Marcus', pb: 'Ray' }, WHO = { leo: 'Leo', sarah: 'Sarah', amy: 'Amy' };
  const sms = (from, to, text, only) => ({ sms: { from, to, text, ...(only ? { only } : {}) } });
  // a phone vibrating (the file is 15 s of it): a text = one double buzz; a call = it goes on until he picks (RING … HUNG)
  const VIB = 'cellphone vibrating (sound off) type 1', BUZZ = { sfx: VIB, ms: 1500 }, RING = { sfx: VIB, loop: true }, HUNG = { stop: VIB };
  const reply = (k, to, opts, o = {}) => ({ by: k, ...o, choice: opts.map(([t, set, text, ic]) => ({ t, ...(ic ? { ic } : {}), intent: text ? `Text ${WHO[to]}` : 'No text', idle: !text, set, then: text ? [sms(k, to, text), { wait: 2600 }] : [] })) });

  const story = Object.assign([
    // ---- 1-2. the black card, the place ----
    { sfx: 'crowd', loop: true },   // the lobby's crowd from the black card on: we hear the place before we see it
    { titleCard: 'Union Trust Tower', sub: '9:38 AM' },
    ...at('h_lobby'), { fade: 'in', ms: 900 }, { hush: 1800 },
    // ---- 3. his feet won't stop ----
    ...Array.from({ length: 5 }, () => [...at('h_feet_a'), { wait: 320 }, ...at('h_feet_b'), { wait: 320 }]).flat(), ...at('h_feet_a'), { hush: 700 },
    // ---- 4-7. the briefcase, the three lines ----
    ...at('h_top'), S('pb', 'We’re on in 8 minutes.'),
    ...at('h_two'), S('pa', 'Guess there’s no turning back now.'),
    ...at('h_two_r'), S('pb', 'Yeah…'),
    S('pb', 'Nothing to lose.'),
    // ---- 8. Marcus's phone: Leo, his kids behind ----
    ...at('h_top_buzz'), BUZZ, { hush: 1400 },   // his phone buzzes on the table
    ...at('h_phone'), sms('leo', 'pa', 'dad r u coming to practice tonight?'), { hush: 3400 },   // Leo, on the lock screen, and his text
    // ---- 9. he looks at Ray: the first choice (the TV says where to look) ----
    ...at('h_top'), { hush: 1300 }, ...at('h_two_r'), S('pb', 'Nothing to lose. Right?'),   // the line the choice answers (on the TV during the choice)
    { by: 'pa', clock: 0, cue: 'Look at your phone', ask: true, choice: [
      { t: 'I’ve got a lot to lose.', ic: 'worried', sh: 'A lot to lose', intent: 'Everything to lose', set: { p1: 'lose' }, then: [...at('h_two'), S('pa', 'I’ve got a lot to lose.')] },
      { t: 'I’ve got a lot to win.', ic: 'hope', sh: 'A lot to win', intent: 'Everything to win', set: { p1: 'win' }, then: [...at('h_two'), S('pa', 'I’ve got a lot to win.')] },
    ] },
    // ---- 10-11. Ray's phone: Amy (only he sees who) ----
    ...at('h_ray_pocket'), RING, { hush: 1200 },
    { when: (f) => f.p1 === 'lose', then: [S('pa', 'Seems like you’ve got someone to lose as well.')] },
    { by: 'pb', ring: 'Amy', cue: 'Look at your phone', choice: [
      { t: 'Pick up', intent: 'picks up', set: { amy: 'call' }, then: [] },
      { t: 'Later', intent: 'later', set: { amy: 'later' }, then: [] },
    ] },
    HUNG, { room: { lp: 650, vol: .5, ms: 1500 } },   // the vibration stops; the crowd goes far
    // ---- 12. picked up: he walks away, the screen splits, a clock ticks. Ray on the call | Marcus texting Leo ----
    { when: (f) => f.amy === 'call', then: [
      ...at('h_ray_phone'), { hush: 1800 },   // he gets up, his phone in hand, and goes to take it
      { gate: ['pa', 'pb'], text: { pa: 'Text Leo back', pb: 'Amy is on the line' } },
      // the two at the same time, each on his phone, at his own pace (a split: nobody waits on the other's lines); the TV: the clock
      { split: () => ({
        pa: [{ when: () => TV, then: at('h_clock'), else: at('h_side_pa') }, { tick: true },
          sms('pa', 'leo', 'Sorry buddy, dad’s not going to practice this time.'), { wait: 2800 },
          sms('leo', 'pa', 'ok'), { wait: 2600 },
          sms('leo', 'pa', 'mom says we wont have the money to do next season'), { wait: 3800 },
          reply('pa', 'leo', [
            ['As of tonight, money won’t be an issue anymore.', { leo: 'money' }, 'As of tonight, money won’t be an issue anymore.', 'tough'],
            ['We’ll figure it out, buddy.', { leo: 'figure' }, 'We’ll figure it out, buddy.', 'love'],
            ['Listen to your mom.', { leo: 'mom' }, 'Listen to your mom.', 'calm'],
          ], { clock: 15000 }),
          { tick: false }],
        pb: [...at('h_side_pb'), { tick: true },
          S('amy', 'Hey you. Are you still downtown?'),
          { by: 'pb', clock: 15000, choice: [
            { t: 'Yeah. Work thing.', ic: 'calm', intent: 'tells the truth', set: { told: 'truth' }, then: [S('pb', 'Yeah. Work thing.')] },
            { t: 'No. Home soon.', ic: 'lie', intent: 'lies', set: { told: 'lie' }, then: [S('pb', 'No. Home soon.')] },
          ] },
          S('amy', 'I’ve got a meeting at noon. A big one. I’ll tell you tonight.'),
          S('amy', 'Love you.'),
          { tick: false }],
      }), tv: true, watch: () => 'pa', hold: () => ({ pa: 'Ray is still on the phone', pb: 'Marcus is still texting' }) },
      ...at('h_two'), { hush: 1800 },
    ] },
    // ---- 13-14. the elevators: Ray presses the button; the crowd back, Double It far away, very low and muffled, coming up slowly ----
    ...at('h_lift_hall'), { room: { lp: 20000, vol: 1, ms: 1000 } }, { music: 'double it', lv: 0, vol: .12, lp: 260, ms: 6000 }, { hush: 2600 },
    { music: 'double it', vol: .32, lp: 420, ms: 14000 },
    ...at('h_mpocket'), BUZZ, { hush: 1600 },   // Marcus's pocket buzzes: Sarah
    // ---- 15. the last text before going in (each his own) ----
    { gate: ['pa', 'pb'], text: 'Your last text before going in' },
    { split: (f) => ({
      pa: [{ thread: ['pa', 'sarah'] }, sms('sarah', 'pa', 'Where are you?'), { wait: 1500 }, reply('pa', 'sarah', [['I love you.', { sarah: 'love' }, 'I love you.', 'love'], ['Kiss Leo for me.', { sarah: 'kiss' }, 'Kiss Leo for me.', 'love'], ['Put the phone away.', { sarah: 'none' }]], { clock: 12000 })],
      pb: [{ thread: ['pb', 'amy'] }, reply('pb', 'amy', f.amy === 'call'
        ? [['Good luck at your meeting.', { last: 'luck' }, 'Good luck at your meeting.', 'hope'], ['I love you.', { last: 'love' }, 'I love you.', 'love'], ['Put the phone away.', { last: 'none' }]]
        : [['Can’t talk. Tonight, I promise.', { last: 'tonight' }, 'Can’t talk. Tonight, I promise.', 'calm'], ['I love you.', { last: 'love' }, 'I love you.', 'love'], ['Put the phone away.', { last: 'none' }]],
      { clock: 12000 })],
    }), tv: true, watch: () => 'pa', hold: () => ({ pa: 'Ray is still texting', pb: 'Marcus is still texting' }) },
    // ---- 16. ding: in. The crowd stays outside, the music comes close ----
    { sfx: 'elevator ding' }, ...at('h_lift_hall'), { hush: 900 },
    ...at('h_in_02'), { music: 'double it', lp: 20000, vol: .55, ms: 6000 }, { bars: 2 },
    // ---- 17. up: a floor every 2 bars; the briefcase; the masks; the doors open on the drop ----
    ...at('h_in_08'), { music: 'double it', vol: .65 },
    { when: (f) => f.amy === 'later', then: [BUZZ, sms('amy', 'pb', 'Call me back. It’s important.', 'pb')] },
    { bars: 2 },
    ...at('h_case14'), { music: 'double it', vol: .72 }, { bars: 2 },
    ...at('h_gun'), { music: 'double it', vol: .8 }, { bars: 2 },
    ...at('h_mask26'), { music: 'double it', vol: .88 }, { bars: 2 },
    ...at('h_masked'), { music: 'double it', vol: .95 },
    { music: 'double it', lv: 1, vol: 1, ms: 2400, inBars: 2 }, { bars: 1 },
    { sfx: 'elevator ding' }, ...at('h_crack'), { bars: 'drop' },   // the doors crack open, the drop: they open
    ...at('h_bank'),
    narr('At the loan counter, a pen in her hand: Amy.'),
    { hush: 1400 },
    // ---- FAST FORWARD: the key moments one after the other, no transitions; a tap on a phone moves on. The choices are
    // the real ones (their screen, the music holding its breath) ----
    { titleCard: 'Fast forward', sub: 'The key moments' },
    ...at('h_rob_out'), { fade: 'in', ms: 1 }, { sfx: 'crowd panic', loop: true }, T('“EVERYBODY DOWN.”'),
    ...at('h_rob_hands'), { hush: 1800 },
    { sfx: 'establishment alarm', loop: true }, ...at('h_rob_red'), T('The alarm. Everyone on the floor. Amy too.'),
    ...at('h_ray_sees'), T('Two meters from Ray’s boots: Amy. She doesn’t know the mask.'),
    { by: 'pa', cue: 'Look at your phone', clock: 10000, choice: [
      { t: 'I take the vault.', ic: 'vault', sh: 'I go', intent: 'the vault', set: { watch: 'pb' }, then: [] },
      { t: 'You take the vault.', ic: 'send', sh: 'You go', intent: 'the room', set: { watch: 'pa' }, then: [] },
    ] },
    { music: 'double it', lv: 2 },
    { fn: (f) => {
      const W = f.watch, O = W === 'pa' ? 'pb' : 'pa', nW = N[W], nO = N[O];
      const BANG = [{ music: null, ms: 0 }, { sfx: 'gun shot' }, ...at('h_black'), T('BANG.')];
      return [
        ...at('h_vault_' + O), T(`${nO} in the vault with the teller. ${nW} alone with the room.`),
        ...at('h_holster'), T('On the floor, Amy’s hand slides to the guard’s holster.'),
        { music: 'double it', lv: 3 }, { bars: 'drop' },
        ...at('h_aim_' + W), T(`Amy is up. The guard’s gun on ${nW}’s head.`),
        // the one she holds: show his face or not
        { by: W, cue: 'Look at your phone', clock: 10000, choice: [
          { t: 'Take off the mask.', ic: 'unmask', sh: 'Unmask', intent: 'shows his face', set: { mask: 'off' }, then: [...at('h_face_' + W),
            T(W === 'pb' ? 'Amy: “…Ray?” The gun shakes in her hand.' : 'Marcus shows his face. “I’ve got kids. Please.”')] },
          { t: 'Keep it on.', ic: 'mask', sh: 'Keep it on', intent: 'stays masked', idle: true, set: { mask: 'on' }, then: [
            T(W === 'pb' ? 'Amy: “Who are you?” Her finger on the trigger.' : 'Amy: “Take it off. Now.” Her finger on the trigger.')] },
        ] },
        // the other one, back from the vault: the gun on his friend's head
        { fn: (g) => [...at(`h_standoff_${W}${g.mask === 'off' ? '_off' : ''}`),
          T(`${nO} comes back from the vault, the bags on his shoulder. The gun on ${nW}’s head.`),
          { by: O, cue: 'Look at your phone', clock: 7000, choice: O === 'pa' ? [
            { t: 'Shoot her.', ic: 'gun', sh: 'Shoot', intent: 'shoots', set: { last: 'shoot' }, then: BANG },
            { t: 'Lower your gun.', ic: 'lower', sh: 'Lower it', intent: 'lowers it', set: { last: 'lower' }, then: [T('Marcus puts his gun on the floor. Amy’s doesn’t move.')] },
            { t: '“Hey! Over here!”', ic: 'hand', sh: 'Over here!', intent: 'takes the aim', set: { last: 'draw' }, then: [T('Amy turns. The gun on Marcus now.')] },
          ] : [
            { t: 'Take off your mask: “Amy. It’s me.”', ic: 'unmask', sh: 'It’s me', intent: 'shows himself', set: { last: 'me' }, then: [...at('h_face_pb'), T('Amy stares at him. The gun goes down an inch.')] },
            { t: 'Shoot her.', ic: 'gun', sh: 'Shoot', intent: 'shoots', set: { last: 'shoot' }, then: BANG },
            { t: 'Drop the bags.', ic: 'bags', sh: 'Drop it', intent: 'drops the money', set: { last: 'drop' }, then: [T('The bags hit the floor. Three million dollars between them.')] },
          ] },
        ] },
      ];
    } },
    T('Outside, the first siren.'),
    { music: null, ms: 400 }, { stop: 'establishment alarm' }, { stop: 'crowd panic' }, { fade: 'out', ms: 300 },
    { end: { kicker: 'To be continued', title: 'Floor 31', lede: '{LEDE}', art: null } },
  ], {
    gaze: false, credits: '', title: 'Floor 31', intro: [],
    seats: ['pa', 'pb'], solo: { pa: 'Marcus', pb: 'Ray' },
    phone: { time: '9:38', bat: { pa: 64, pb: 21 } },
    // a player's own pose sheet (ref/posesheet_floor31.png: green screen, 3 columns: talking, listening, seen from above; Marcus's
    // row then Ray's, or one row: his own), each pose in place of the drawn one
    posesheet: { cols: ['talk', 'listen', 'top'], pa: { talk: 'marcus_sit', listen: 'marcus_listen', top: 'marcus_top' }, pb: { talk: 'ray_talk', listen: 'ray_sit', top: 'ray_top' } },
    pick: { pa: { pose: 'listen', line: 'Guess there’s no turning back now.' }, pb: { pose: 'listen', line: 'Nothing to lose.' } },
    cast: {
      pa: { name: 'Marcus', color: P1, sprite: 'h_marcus' },
      pb: { name: 'Ray', color: P2, sprite: 'h_ray' },
      leo: { name: 'Leo', color: '#f59e0b' },
      sarah: { name: 'Sarah', color: '#22c55e' },
      amy: { name: 'Amy', color: AMY },
    },
    words: { LEDE: (f) => [
      f.p1 === 'lose' ? 'Marcus had everything to lose.' : 'Marcus had everything to win.',
      f.amy === 'call' ? `Ray picked up for Amy${f.told === 'lie' ? ', and lied to her' : ''}.` : 'Ray let Amy’s call go.',
      'She was at the loan counter on 31.',
      f.watch ? `${N[f.watch]} stayed with the room, and Amy took the guard’s gun.` : '',
      f.mask === 'off' ? `${N[f.watch]} showed her his face.` : f.mask === 'on' ? `${N[f.watch]} kept his mask on.` : '',
      ({ shoot: 'Then a shot.', lower: 'Marcus put his gun down.', draw: 'Marcus took the aim for his friend.', me: 'Ray showed Amy who he was.', drop: 'Ray dropped the money.' })[f.last] || '',
    ].filter(Boolean).join(' ') },
  });
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), d_heist: story };
})();
