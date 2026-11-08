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
  const bust = (x, y, s, color, o = {}) => [
    R(x - 60 * s, y - 150 * s, 120 * s, 150 * s + 2, color, { r: `${50 * s}px ${50 * s}px 0 0`, ...o }),
    C(x, y - 195 * s, 78 * s, o.face || SKIN, o.blur ? { blur: o.blur } : {}),
  ];
  // someone standing, feet on y
  const stand = (x, y, s, color, o = {}) => [
    R(x - 26 * s, y - 120 * s, 22 * s, 120 * s, '#1f2937'), R(x + 4 * s, y - 120 * s, 22 * s, 120 * s, '#1f2937'),
    R(x - 45 * s, y - 270 * s, 90 * s, 160 * s, color, { r: `${36 * s}px ${36 * s}px 8px 8px`, ...o }),
    C(x, y - 305 * s, 64 * s, o.face || SKIN, o.blur ? { blur: o.blur } : {}),
  ];
  const glow = (x, y) => R(x - 18, y - 30, 36, 60, '#e0f2fe', { r: 6, glow: '0 0 40px 14px rgba(186,230,253,.55)' });   // a phone, lit
  const SIZE = [1920, 1080], place = (o) => ({ size: SIZE, spots: {}, face: {}, front: [], ...o });
  const LOBBY = [
    R(0, 0, 1920, 1080, '#1b2230'), R(0, 760, 1920, 320, '#141a24'),
    ...[90, 430, 770, 1110].map((x) => R(x, 110, 270, 520, '#2b3a52', { glow: '0 0 60px 6px rgba(120,160,220,.12)' })),
    R(1560, 330, 300, 430, '#3a4250'), R(1572, 342, 136, 418, '#4b5563'), R(1712, 342, 136, 418, '#4b5563'),   // the elevator, far right
    ...[[210, .62], [380, .7], [560, .58], [1250, .66], [1420, .6], [1500, .72]].flatMap(([x, s]) => stand(x, 790, s, GREY)),
  ];
  const TABLE = [R(740, 700, 440, 34, '#5b4636', { r: 6 }), R(800, 734, 22, 80, '#3f3126'), R(1098, 734, 22, 80, '#3f3126')];

  // ---- the places ----
  SCENES.h_lobby = place({ ambience: 'crowd', back: [...LOBBY, ...bust(840, 700, .9, P1), ...bust(1080, 700, .9, P2), ...TABLE] });
  const feet = (up) => place({ ambience: 'crowd', back: [
    R(0, 0, 1920, 1080, '#161c27'), R(0, 820, 1920, 260, '#11161e'),
    R(760, 0, 150, 760, '#1e3a8a'), R(1010, 0, 150, up ? 700 : 760, '#1e3a8a'),
    R(730, 760, 210, 80, '#0b0b0d', { r: '40px 60px 8px 8px' }), R(980, up ? 700 : 760, 210, 80, '#0b0b0d', { r: '40px 60px 8px 8px' }),
    R(1400, 0, 40, 840, '#3f3126'),   // the table's leg
  ] });
  SCENES.h_feet_a = feet(false); SCENES.h_feet_b = feet(true);
  SCENES.h_case = place({ ambience: 'crowd', back: [
    R(0, 0, 1920, 1080, '#161c27'), R(0, 640, 1920, 440, '#5b4636'),
    R(600, 330, 720, 400, '#26201b', { r: 22, glow: '0 30px 60px rgba(0,0,0,.6)' }), R(850, 280, 220, 60, 'transparent', { r: '30px 30px 0 0', line: '22px solid #1a1612' }),
    R(700, 420, 50, 30, '#c9a227', { r: 6 }), R(1170, 420, 50, 30, '#c9a227', { r: 6 }),
    R(1300, 500, 620, 110, P2, { r: '50px 0 0 50px' }), C(1290, 560, 120, SKIN),   // Ray's arm, his hand on it
  ] });
  const TWO_BACK = [R(0, 0, 1920, 1080, '#1b2230'), ...[[300, .9], [1600, .85], [960, .8]].flatMap(([x, s]) => bust(x, 640, s, GREY, { blur: 8 })), R(0, 640, 1920, 440, '#141a24')];
  const two = (o = {}) => place({ ambience: 'crowd', back: [...TWO_BACK, ...bust(620, 900, 1.7, P1), ...bust(1300, 900, 1.7, P2),
    ...(o.p2phone ? [glow(1380, 860)] : []), R(380, 880, 1160, 60, '#5b4636', { r: 8 })] });
  SCENES.h_two = two(); SCENES.h_two_call = two({ p2phone: true });
  SCENES.h_ots1 = place({ ambience: 'crowd', back: [   // over Marcus's shoulder: his phone, his kids on it, Leo's text on top
    R(0, 0, 1920, 1080, '#1b2230'), ...bust(1500, 820, 1.2, P2, { blur: 10 }),
    R(820, 160, 360, 700, '#0b0b0d', { r: 48 }), R(840, 180, 320, 660, '#2a4a6b', { r: 36 }),
    ...stand(930, 760, .95, '#f59e0b'), ...stand(1060, 760, .75, '#22c55e'),   // the kids, on the lock screen
    R(860, 220, 280, 70, 'rgba(245,245,247,.92)', { r: 16 }),   // the notification
    C(380, 760, 560, '#16233d'), R(0, 820, 760, 260, '#1e3a8a', { r: '200px 200px 0 0' }),   // his head and shoulder, from behind
  ] });
  SCENES.h_ots2 = place({ ambience: 'crowd', back: [   // over Ray's shoulder: Marcus looking at him
    R(0, 0, 1920, 1080, '#1b2230'), ...bust(760, 1000, 2.2, P1),
    C(1560, 760, 560, '#3a1717'), R(1160, 820, 760, 260, '#991b1b', { r: '200px 200px 0 0' }),
  ] });
  SCENES.h_split = place({ ambience: 'crowd', back: [   // Marcus at the table, texting | Ray at the window, on the call; a clock
    R(0, 0, 956, 1080, '#1b2230'), R(964, 0, 956, 1080, '#22304a'), R(956, 0, 8, 1080, '#05070a'),
    R(1080, 120, 700, 620, '#3b5375', { glow: '0 0 80px 10px rgba(150,190,240,.15)' }),
    ...bust(470, 900, 1.6, P1), glow(560, 840), R(160, 880, 640, 50, '#5b4636', { r: 8 }),
    ...stand(1430, 1040, 2.4, P2), R(1500, 270, 50, 110, '#0b0b0d', { r: 10 }),   // his phone at his ear
    C(960, 150, 190, '#e5e7eb', { line: '10px solid #111827' }),
    R(954, 85, 12, 70, '#111827', { r: 6, rot: -30, origin: '50% 100%' }), R(955, 105, 10, 50, '#111827', { r: 5, rot: -2, origin: '50% 100%' }),
  ] });
  SCENES.h_stand = place({ ambience: 'crowd', back: [...LOBBY, ...TABLE, ...stand(820, 900, 1.6, P1), ...stand(1120, 900, 1.6, P2),
    R(1160, 600, 160, 110, '#26201b', { r: 12 })] });   // Ray, the briefcase in his hand
  const wait = (open) => place({ ambience: 'crowd', back: [
    R(0, 0, 1920, 1080, '#1b2230'), R(0, 840, 1920, 240, '#141a24'),
    R(560, 120, 800, 760, '#3a4250'), R(590, 150, 366, 730, '#6b7280'), R(964, 150, 366, 730, '#6b7280'),
    ...(open ? [R(590, 150, 740, 730, '#e7e2d3', { glow: '0 0 120px 30px rgba(255,240,200,.25)' })] : []),
    C(1430, 520, 40, '#fbbf24', { glow: '0 0 20px 6px rgba(251,191,36,.6)' }),   // the call button, lit
    ...stand(760, 1080, 2, P1, { r: '70px 70px 10px 10px' }), glow(820, 640), ...stand(1160, 1080, 2, P2), glow(1100, 640),
  ] });
  SCENES.h_lift = wait(false); SCENES.h_lift_open = wait(true);
  // inside: the doors, the floor dots over them (n lit)
  const DOTS = 6;
  const elev = (n, o = {}) => place({ ambience: 'into the elevator', back: [
    R(0, 0, 1920, 1080, '#101114'), R(560, 300, 800, 780, '#1a1c21'),
    R(640, 360, 316, 720, '#24272d', { line: '6px solid #2e3239' }), R(964, 360, 316, 720, '#24272d', { line: '6px solid #2e3239' }),
    R(760, 200, 400, 70, '#0a0b0d', { r: 35 }),
    ...Array.from({ length: DOTS }, (_, i) => C(813 + i * 60, 235, 26, i < n ? '#ff3b30' : '#2a2c31', i < n ? { glow: '0 0 24px 6px rgba(255,59,48,.55)' } : {})),
    ...(o.masks ? [...stand(520, 1180, 2.6, P1, { face: '#f5f5f4' }), ...stand(1400, 1180, 2.6, P2, { face: '#f5f5f4' })] : []),
  ] });
  for (let n = 0; n <= DOTS; n++) SCENES['h_elev' + n] = elev(n);
  SCENES.h_masks = elev(DOTS - 1, { masks: true });
  SCENES.h_case_open = place({ ambience: 'into the elevator', back: [   // the briefcase, open: two masks, two guns
    R(0, 0, 1920, 1080, '#101114'), R(560, 160, 800, 300, '#1a1612', { r: '22px 22px 0 0' }), R(560, 460, 800, 420, '#26201b', { r: '0 0 22px 22px' }),
    C(780, 600, 170, '#f5f5f4'), C(745, 580, 30, '#111'), C(815, 580, 30, '#111'),
    C(1140, 600, 170, '#f5f5f4'), C(1105, 580, 30, '#111'), C(1175, 580, 30, '#111'),
    R(680, 760, 220, 46, '#0b0b0d', { r: 8 }), R(680, 790, 50, 80, '#0b0b0d', { r: 8 }),
    R(1020, 760, 220, 46, '#0b0b0d', { r: 8 }), R(1190, 790, 50, 80, '#0b0b0d', { r: 8 }),
  ] });
  SCENES.h_bank = place({ back: [   // the doors open on the bank: the loan counter, the teller, Amy signing
    R(0, 0, 1920, 1080, '#e7e2d3'), R(0, 820, 1920, 260, '#cfc6b0'),
    ...stand(960, 700, 1.2, GREY), R(300, 640, 1320, 200, '#5b4636'), R(300, 620, 1320, 30, '#7a5f48'),
    ...stand(1240, 1080, 2.2, AMY, { r: '60px 60px 10px 10px' }), R(1040, 600, 180, 30, '#fafafa', { r: 4 }), R(1150, 560, 8, 60, '#111', { rot: 30 }),
    R(0, 0, 220, 1080, '#24272d'), R(1700, 0, 220, 1080, '#24272d'),   // the doors, open
  ] });

  // ---- the fast forward (the key moments, no transitions): the robbery, Amy takes the guard's gun ----
  const BANK = [R(0, 0, 1920, 1080, '#e7e2d3'), R(0, 820, 1920, 260, '#cfc6b0'), R(300, 560, 1320, 200, '#5b4636'), R(300, 540, 1320, 30, '#7a5f48')];
  const MASK = '#f5f5f4', GUARD = '#334155';
  const lie = (x, y, color, s = 1) => [R(x - 120 * s, y - 50 * s, 240 * s, 64 * s, color, { r: 32 * s }), C(x + 150 * s, y - 24 * s, 70 * s, SKIN)];
  // someone standing with a gun held out (dir 1: to the right), hands up (up), masked or not
  const armed = (x, y, s, color, dir, o = {}) => {
    const sy = y - 240 * s, len = 170 * s, ax = dir > 0 ? x + 30 * s : x - 30 * s - len;
    return [...stand(x, y, s, color, { face: o.face || SKIN }),
      R(ax, sy, len, 30 * s, color, { r: 15 * s }), R(dir > 0 ? ax + len : ax - 60 * s, sy - 12 * s, 60 * s, 34 * s, '#0b0b0d', { r: 6 })];
  };
  const handsUp = (x, y, s, color, o = {}) => [...stand(x, y, s, color, o), R(x - 70 * s, y - 380 * s, 28 * s, 130 * s, color, { r: 14 * s }), R(x + 42 * s, y - 380 * s, 28 * s, 130 * s, color, { r: 14 * s })];
  const COL = { pa: P1, pb: P2 };
  SCENES.h_rob = place({ back: [...BANK, ...lie(560, 960, GREY), ...lie(1000, 1010, GUARD), ...lie(1390, 960, AMY),
    ...armed(380, 1080, 1.9, P1, 1, { face: MASK }), ...armed(1560, 1080, 1.9, P2, -1, { face: MASK })] });
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

  const at = (id) => [scene(id, {}), { cam: 'wide', at: 960 }];   // a place, the camera on all of it
  const S = (who, text, o) => ({ say: who, text, ...o });          // a line (no pose: they're shapes)
  const T = (text) => ({ narr: text, tap: true });                 // a key moment of the fast forward: it waits for a tap
  const N = { pa: 'Marcus', pb: 'Ray' };
  const sms = (from, to, text, only) => ({ sms: { from, to, text, ...(only ? { only } : {}) } });
  // a phone vibrating (the file is 15 s of it): a text = one double buzz; a call = it goes on until he picks (RING … HUNG)
  const VIB = 'cellphone vibrating (sound off) type 1', BUZZ = { sfx: VIB, ms: 1500 }, RING = { sfx: VIB, loop: true }, HUNG = { stop: VIB };
  const reply = (k, to, opts, o = {}) => ({ by: k, ...o, choice: opts.map(([t, set, text]) => ({ t, intent: text ? 'text' : 'nothing', set, then: text ? [sms(k, to, text), { wait: 1600 }] : [] })) });

  const story = Object.assign([
    // ---- 1-2. the black card, the place ----
    { titleCard: 'Union Trust Tower', sub: '11:52 AM' },
    ...at('h_lobby'), { fade: 'in', ms: 900 }, { hush: 1800 },
    // ---- 3. his feet won't stop ----
    ...Array.from({ length: 5 }, () => [...at('h_feet_a'), { wait: 170 }, ...at('h_feet_b'), { wait: 170 }]).flat(), ...at('h_feet_a'), { hush: 700 },
    // ---- 4-7. the briefcase, the three lines ----
    ...at('h_case'), S('pb', 'We’re on in 8 minutes.'),
    ...at('h_two'), S('pa', 'Guess there’s no turning back now.'),
    S('pb', 'Yeah…'),
    S('pb', 'Nothing to lose.'),
    // ---- 8. Marcus's phone: Leo, his kids behind ----
    BUZZ, ...at('h_ots1'), sms('leo', 'pa', 'dad r u coming to practice tonight?'),
    narr('Leo: “dad r u coming to practice tonight?”'),
    // ---- 9. he looks at Ray: the first choice (the TV says where to look) ----
    ...at('h_ots2'), { hush: 1300 }, ...at('h_two'),
    { by: 'pa', clock: 0, cue: 'Look at your phone', choice: [
      { t: 'Everything to lose.', intent: 'to lose', set: { p1: 'lose' }, then: [S('pa', 'I’ve got my kids at home.')] },
      { t: 'Everything to win.', intent: 'to win', set: { p1: 'win' }, then: [S('pa', 'If this works, I get the happy ending my family deserves.')] },
    ] },
    // ---- 10-11. Ray's phone: Amy (only he sees who) ----
    ...at('h_two_call'), RING, { hush: 1200 },
    { when: (f) => f.p1 === 'lose', then: [S('pa', 'Seems like you’ve got someone to lose as well.')] },
    { by: 'pb', ring: 'Amy', cue: 'Look at your phone', choice: [
      { t: 'Pick up', intent: 'picks up', set: { amy: 'call' }, then: [] },
      { t: 'Later', intent: 'later', set: { amy: 'later' }, then: [] },
    ] },
    HUNG, { room: { lp: 650, vol: .5, ms: 1500 } },   // the vibration stops; the crowd goes far
    // ---- 12. picked up: he walks away, the screen splits, a clock ticks. Ray on the call | Marcus texting Leo ----
    { when: (f) => f.amy === 'call', then: [
      ...at('h_split'), { tick: true },
      sms('pa', 'leo', 'Sorry buddy, dad’s not going to practice this time.'), { wait: 1800 },
      S('amy', 'Hey you. Are you still downtown?', { only: 'pb' }),
      { by: 'pb', clock: 15000, choice: [
        { t: 'Yeah. Work thing.', intent: 'tells the truth', set: { told: 'truth' }, then: [S('pb', 'Yeah. Work thing.', { only: 'pb' })] },
        { t: 'No. Home soon.', intent: 'lies', set: { told: 'lie' }, then: [S('pb', 'No. Home soon.', { only: 'pb' })] },
      ] },
      sms('leo', 'pa', 'ok'), { wait: 1600 },
      sms('leo', 'pa', 'mom says we wont have the money to do next season'), { wait: 2200 },
      reply('pa', 'leo', [
        ['As of tonight, money won’t be an issue anymore.', { leo: 'money' }, 'As of tonight, money won’t be an issue anymore.'],
        ['We’ll figure it out, buddy.', { leo: 'figure' }, 'We’ll figure it out, buddy.'],
        ['Listen to your mom.', { leo: 'mom' }, 'Listen to your mom.'],
      ], { clock: 15000 }),
      S('amy', 'I’ve got a meeting at noon. A big one. I’ll tell you tonight.', { only: 'pb' }),
      S('amy', 'Love you.', { only: 'pb' }),
      { tick: false }, ...at('h_two'), { hush: 900 },
    ] },
    // ---- 13. Ray takes the briefcase, stands up ----
    ...at('h_stand'), { hush: 1500 },
    // ---- 14. the elevator: the crowd back, Double It far and muffled ----
    ...at('h_lift'), { room: { lp: 20000, vol: 1, ms: 1000 } },
    { music: 'double it', lv: 0, vol: .35, lp: 380, ms: 4000 }, { hush: 1600 },
    // ---- 15. the last text before going in (each his own) ----
    reply('pa', 'sarah', [['I love you.', { sarah: 'love' }, 'I love you.'], ['Kiss Leo for me.', { sarah: 'kiss' }, 'Kiss Leo for me.'], ['Put the phone away.', { sarah: 'none' }]], { clock: 12000 }),
    { fn: (f) => [reply('pb', 'amy', f.amy === 'call'
      ? [['Good luck at your meeting.', { last: 'luck' }, 'Good luck at your meeting.'], ['I love you.', { last: 'love' }, 'I love you.'], ['Put the phone away.', { last: 'none' }]]
      : [['Can’t talk. Tonight, I promise.', { last: 'tonight' }, 'Can’t talk. Tonight, I promise.'], ['I love you.', { last: 'love' }, 'I love you.'], ['Put the phone away.', { last: 'none' }]],
    { clock: 12000 })] },
    // ---- 16. ding: in. The crowd stays outside, the music comes close ----
    { sfx: 'elevator ding' }, ...at('h_lift_open'), { hush: 1200 },
    ...at('h_elev0'), { music: 'double it', lp: 20000, vol: .55, ms: 900 }, { bars: 1 },
    // ---- 17. up: a dot a bar; the briefcase; the masks; the doors open on the drop ----
    ...at('h_elev1'), { music: 'double it', vol: .65 }, { bars: 1 },
    ...at('h_elev2'), { music: 'double it', vol: .72 },
    { when: (f) => f.amy === 'later', then: [BUZZ, sms('amy', 'pb', 'Call me back. It’s important.', 'pb')] },
    { bars: 1 },
    ...at('h_case_open'), { music: 'double it', vol: .8 }, { bars: 2 },
    ...at('h_elev4'), { music: 'double it', vol: .88 }, { bars: 1 },
    ...at('h_masks'), { music: 'double it', vol: .95 },
    { music: 'double it', lv: 1, vol: 1, ms: 2400, inBars: 2 }, { bars: 'drop' },
    { sfx: 'elevator ding' }, ...at('h_bank'),
    narr('At the loan counter, a pen in her hand: Amy.'),
    { hush: 1400 },
    // ---- FAST FORWARD: the key moments one after the other, no transitions; a tap on a phone moves on. The choices are
    // the real ones (their screen, the music holding its breath) ----
    { titleCard: 'Fast forward', sub: 'The key moments · tap a phone to go on' },
    ...at('h_rob'), { fade: 'in', ms: 1 }, T('“EVERYBODY DOWN.” The guard, the teller, Amy: on the floor.'),
    ...at('h_ray_sees'), T('Two meters from Ray’s boots: Amy. She doesn’t know the mask.'),
    { by: 'pa', cue: 'Look at your phone', clock: 10000, choice: [
      { t: 'I take the vault.', intent: 'the vault', set: { watch: 'pb' }, then: [] },
      { t: 'You take the vault.', intent: 'the room', set: { watch: 'pa' }, then: [] },
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
          { t: 'Take off the mask.', intent: 'shows his face', set: { mask: 'off' }, then: [...at('h_face_' + W),
            T(W === 'pb' ? 'Amy: “…Ray?” The gun shakes in her hand.' : 'Marcus shows his face. “I’ve got kids. Please.”')] },
          { t: 'Keep it on.', intent: 'stays masked', set: { mask: 'on' }, then: [
            T(W === 'pb' ? 'Amy: “Who are you?” Her finger on the trigger.' : 'Amy: “Take it off. Now.” Her finger on the trigger.')] },
        ] },
        // the other one, back from the vault: the gun on his friend's head
        { fn: (g) => [...at(`h_standoff_${W}${g.mask === 'off' ? '_off' : ''}`),
          T(`${nO} comes back from the vault, the bags on his shoulder. The gun on ${nW}’s head.`),
          { by: O, cue: 'Look at your phone', clock: 7000, choice: O === 'pa' ? [
            { t: 'Shoot her.', intent: 'shoots', set: { last: 'shoot' }, then: BANG },
            { t: 'Lower your gun.', intent: 'lowers it', set: { last: 'lower' }, then: [T('Marcus puts his gun on the floor. Amy’s doesn’t move.')] },
            { t: '“Hey! Over here!”', intent: 'takes the aim', set: { last: 'draw' }, then: [T('Amy turns. The gun on Marcus now.')] },
          ] : [
            { t: 'Take off your mask: “Amy. It’s me.”', intent: 'shows himself', set: { last: 'me' }, then: [...at('h_face_pb'), T('Amy stares at him. The gun goes down an inch.')] },
            { t: 'Shoot her.', intent: 'shoots', set: { last: 'shoot' }, then: BANG },
            { t: 'Drop the bags.', intent: 'drops the money', set: { last: 'drop' }, then: [T('The bags hit the floor. Three million dollars between them.')] },
          ] },
        ] },
      ];
    } },
    T('Outside, the first siren.'),
    { music: null, ms: 400 }, { fade: 'out', ms: 300 },
    { end: { kicker: 'To be continued', title: 'Floor 31', lede: '{LEDE}', art: null } },
  ], {
    gaze: false, credits: '', title: 'Floor 31', intro: [],
    seats: ['pa', 'pb'], solo: { pa: 'Marcus', pb: 'Ray' },
    phone: { time: '11:52', bat: { pa: 64, pb: 21 } },
    pick: { pa: { pose: 'listen', line: 'Guess there’s no turning back now.' }, pb: { pose: 'listen', line: 'Nothing to lose.' } },
    cast: {
      pa: { name: 'Marcus', color: P1, sprite: 'justin' },
      pb: { name: 'Ray', color: P2, sprite: 'james' },
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
