// Floor 31 — the heist's beginning (08/11, Justin's beats), TV + phones only. The people and the places are plain shapes
// for now (a circle head, a body; the decors in rectangles), the lines as written. P1 = Marcus (pa): his kids, his son Leo
// texting, his wife Sarah. P2 = Ray (pb): "nothing to lose", but Amy calls. 1 the black card (the place, the hour), 2 the
// lobby, 3 Marcus's feet won't stop, 4 Ray puts the briefcase down, 5-7 the three lines, 8 Marcus's phone (Leo, his kids
// behind), 9 Marcus looks at Ray: everything to lose or to win (the first choice: the TV says to look at your phone),
// 10-11 Amy calls Ray (only he sees who), pick up or later (the crowd goes muffled), 12 picked up: the screen splits, a
// clock ticks, Ray on the call, Marcus texting Leo (next season, the money), 13 Ray takes the briefcase and stands up,
// 14 the elevator: the crowd comes back, Double It starts far and muffled, 15 the last text before going in (each his own),
// 16 in, 17 up: a dot a bar, the briefcase, the masks; the doors open on the drop: Amy, at the loan counter. Then the key
// moments one after the other (no card announcing it's later; the real choice screens and music): the robbery, the guard
// behind the restroom door (Marcus waits or talks him out), Ray takes the vault (always), Amy takes the guard's gun and holds
// Marcus; he shows his face or not; Ray, back from the vault, picks (show himself to her, shoot, drop the money).
// Planted, no payoff yet: every moment they lose time (the call, the last texts, the guard) = the clock, full screen (f.lost).
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
  // (09/11) Justin's over-the-shoulder shots (Ray's back on the left, Marcus on the right): Marcus reads Leo's text; then
  // he looks up at Ray, the soft smile (a lot to win) or the serious face (a lot to lose)
  for (const [k, f] of [['h_ots_phone', 'ots_phone'], ['h_ots_win', 'ots_win'], ['h_ots_lose', 'ots_lose']]) SCENES[k] = { ...pic(`bg/${f}.webp`), spk: { pb: .2, pa: .72 } };
  SCENES.h_two = chairs([MARCUS, RAY]);   // Marcus talks, Ray thinks
  // (09/11) Justin's next pictures: Ray's pocket buzzing (Amy calls); Ray up, his phone in hand, Marcus still talking; the
  // elevators (Ray pressing the button, Marcus hands in pockets, placed as in his reference); Marcus's pocket buzzing at the
  // elevator; inside, from behind: the floors going up on the display (the « 31 » redrawn: 2, 8), Ray opening the briefcase (14),
  // the gun handed over, the mask handed over (26), masks on (31), the doors cracking open, the doors open on the bank
  SCENES.h_ray_pocket = pic('bg/ray_pocket.webp');
  SCENES.h_ray_phone = chairs([{ src: 'marcus_sit2', x: 543, y: 907, w: 500, who: 'pa' }, { src: 'ray_phone', x: 1188, y: 892, w: 360, who: 'pb' }]);
  SCENES.h_lift_hall = { image: 'bg/lift_hall.webp', size: PIC, spots: {}, face: {}, ambience: 'crowd', back: [], front: [],
    props: [{ src: 'marcus_stand', x: 486, y: 1464.7, w: 363.1, who: 'pa' }, { src: 'ray_point', x: 1072.5, y: 1470, w: 651, who: 'pb' }] };
  SCENES.h_mpocket = pic('bg/marcus_pocket.webp');
  const inside = (image) => ({ image, size: PIC, spots: {}, face: {}, ambience: 'into the elevator', back: [], front: [] });
  for (const [k, f] of [['h_in_02', 'elev_02'], ['h_in_08', 'elev_08'], ['h_case14', 'case_14'], ['h_gun', 'gun_handover'], ['h_mask26', 'mask_26'], ['h_masked', 'elev_masked'], ['h_crack', 'elev_crack']]) SCENES[k] = inside(`bg/${f}.webp`);
  // (09/11) Justin's: the empty lobby over Ray's shoulder, Ray from behind (out of focus) and Marcus who looks up from his
  // phone at him; the two cut out (props: a player's own pose takes their place)
  SCENES.h_ots_look = { ...pic('bg/lobby_ots.webp'), spk: { pb: .2, pa: .72 },
    props: [{ src: 'marcus_phone', x: 1144.5, y: 941, w: 747, who: 'pa' }, { src: 'ray_back', x: 395.5, y: 941, w: 791, z: 2000, who: 'pb' }] };
  // (09/11) inside, Justin's decor (the doors, the display: 31 redrawn 2, 8, 14, 26) and the two of them cut out of his
  // green screens: from behind, waiting; Ray opens the briefcase; Ray hands Marcus the mask
  const lift = (n, people) => ({ ...inside(`bg/lift_in_${n}.webp`), props: people });
  const M_BACK = { src: 'marcus_elev', x: 421.5, y: 941, w: 843, who: 'pa' }, R_BACK = { src: 'ray_elev', x: 1307.5, y: 941, w: 729, who: 'pb' };
  SCENES.h_in_02 = lift('02', [M_BACK, R_BACK]); SCENES.h_in_08 = lift('08', [M_BACK, R_BACK]);
  SCENES.h_case14 = lift('14', [{ src: 'marcus_elev2', x: 426.5, y: 941, w: 853, who: 'pa' }, { src: 'ray_case', x: 1261.5, y: 941, w: 811, who: 'pb' }]);
  SCENES.h_mask26 = lift('26', [{ src: 'marcus_reach', x: 417.5, y: 941, w: 835, who: 'pa' }, { src: 'ray_mask', x: 1221, y: 941, w: 902, who: 'pb' }]);
  // (09/11) the call, on Ray's phone (upright): Ray in the lobby, Amy… somewhere with marble (the bank: nobody knows yet);
  // one or the other, whoever talks
  const CALL = [941, 1671], call = (image, prop) => ({ image, size: CALL, spots: {}, face: {}, ambience: 'crowd', back: [], front: [], props: [prop] });
  SCENES.h_call_ray = { ...call('bg/call_ray.webp', { src: 'ray_call', x: 470.5, y: 1671, w: 941, who: 'pb' }), spk: { pb: .4 } };
  SCENES.h_call_amy = { ...call('bg/call_amy.webp', { src: 'amy_call', x: 488, y: 1671, w: 876 }), spk: { amy: .45 } };
  SCENES.h_bank = { image: 'bg/bank_open.webp', size: PIC, spots: {}, face: {}, back: [], front: [] };
  // Ray talks (his hand out), Marcus listens (hands together): when Ray has the line
  SCENES.h_two_r = chairs([{ src: 'marcus_listen', x: 497.5, y: 883, w: 547, who: 'pa' }, { src: 'ray_talk', x: 1224.5, y: 876, w: 539, who: 'pb' }]);
  const CLOCK = (x, y) => [C(x, y, 150, '#e5e7eb', { line: '8px solid #111827' }), R(x - 5, y - 55, 10, 55, '#111827', { r: 5, rot: -30, origin: '50% 100%' }), R(x - 4, y - 40, 8, 40, '#111827', { r: 4, rot: -2, origin: '50% 100%' })];
  SCENES.h_side_pa = place({ ambience: 'crowd', back: [R(0, 0, 1920, 1080, '#1b2230'), ...bust(960, 1000, 2.2, P1), glow(1080, 930, 'pa'), R(500, 980, 920, 60, '#5b4636', { r: 8 }), ...CLOCK(960, 150)] });
  SCENES.h_side_pb = place({ ambience: 'crowd', back: [R(0, 0, 1920, 1080, '#22304a'), R(560, 100, 800, 640, '#3b5375'), ...stand(960, 1180, 2.6, P2), R(1040, 330, 54, 120, '#0b0b0d', { r: 10, who: 'pb' }), ...CLOCK(1700, 150)] });
  // the TV, while they're on their phones: a clock, full screen, at its real time (9:38 + m minutes: the long hand the minutes)
  const clockAt = (m, ambience) => { const t = 9 * 60 + 38 + m; return place({ ambience, back: [R(0, 0, 1920, 1080, '#0d0f14'), C(960, 540, 900, '#e5e7eb', { line: '26px solid #111827' }),
    ...Array.from({ length: 12 }, (_, i) => R(953, 112, 14, 60, '#111827', { r: 7, rot: i * 30, origin: '50% 428px' })),
    R(946, 230, 28, 310, '#111827', { r: 14, rot: (t % 60) * 6, origin: '50% 100%' }), R(948, 330, 24, 210, '#111827', { r: 12, rot: (t / 60 % 12) * 30, origin: '50% 100%' }),
    R(955, 140, 10, 400, '#dc2626', { r: 5, rot: 0, spin: 60, origin: '50% 100%' }), C(960, 540, 44, '#dc2626')] }); };
  SCENES.h_clock = clockAt(0, 'crowd');

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
  // (09/11) the guard: the restroom door, red; Marcus aiming at it; the door an inch open, the guard's gun first; the guard
  // out, aiming back; out, hands up (his gun on his hip); shot, against the wall, his gun on the floor
  for (const [k, f] of [['h_rob_out', 'rob_out'], ['h_rob_hands', 'rob_hands'], ['h_rob_red', 'rob_red'], ['h_wc', 'wc_door'], ['h_wc_aim', 'wc_aim'], ['h_wc_gun', 'wc_gun'], ['h_wc_out', 'wc_out'], ['h_wc_hands', 'wc_hands'], ['h_wc_shot', 'wc_shot']]) SCENES[k] = { image: `bg/${f}.webp`, size: PIC, spots: {}, face: {}, back: [], front: [] };
  // (09/11) who is where in each picture (the subtitle's arrow points there): the gunman left, the restroom door right;
  // the room: Marcus (the sweater) left, Ray (the suit) right
  SCENES.h_wc.spk = { guard: .5 };
  for (const k of ['h_wc_aim', 'h_wc_gun', 'h_wc_out', 'h_wc_hands', 'h_wc_shot']) SCENES[k].spk = { pa: .3, guard: .61 };
  for (const k of ['h_rob_hands', 'h_rob_red']) SCENES[k].spk = { pa: .36, pb: .78 };
  SCENES.h_amy_eyes = { image: 'bg/amy_floor.webp', size: PIC, spots: {}, face: {}, back: [], front: [] };
  SCENES.h_ray_sees = place({ back: [R(0, 0, 1920, 1080, '#cfc6b0'), R(160, 600, 980, 210, AMY, { r: 105 }), C(1240, 640, 280, SKIN),
    R(1540, 0, 380, 520, P2, { r: '0 0 0 160px' }), R(1420, 380, 220, 60, '#0b0b0d', { r: 8 })] });   // her face on the floor; his sleeve, his gun
  const vault = (k) => place({ back: [R(0, 0, 1920, 1080, '#2b2f36'), C(1180, 520, 760, '#9ca3af', { line: '34px solid #6b7280' }), C(1180, 520, 120, '#6b7280'),
    ...handsUp(560, 1060, 1.5, GREY), ...armed(260, 1080, 1.9, COL[k], 1, { face: MASK })] });
  SCENES.h_vault_pb = vault('pb');   // the vault: always Ray
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
  // o: 'pb' = only he reads it; {dots: ms} = the three dots of someone writing, that long, before it comes in
  const sms = (from, to, text, o) => ({ sms: { from, to, text, ...(typeof o === 'string' ? { only: o } : o || {}) } });
  // a phone vibrating (the file is 15 s of it): a text = one double buzz; a call = it goes on until he picks (RING … HUNG)
  const VIB = 'cellphone vibrating (sound off) type 1', BUZZ = { sfx: VIB, ms: 1500 }, RING = { sfx: VIB, loop: true }, HUNG = { stop: VIB };
  // (09/11) a plant, no payoff yet: every moment they lose time. f.lost = minutes behind « We're on in 8 minutes »; each time,
  // the clock full screen, the minutes it ate on its hands, a few ticks. amb: the place's sound under it (the lobby's crowd, or none)
  const lose = (min, amb) => ({ fn: (f) => { const m = (f.lost || 0) + min, id = `h_clock_${m}_${amb || ''}`; SCENES[id] = SCENES[id] || clockAt(m, amb);
    return [{ set: { lost: m } }, ...at(id), { tick: true }, { hush: 2600 }, { tick: false }]; } });
  // a text answer: no timer (clock 0), you take your time
  const reply = (k, to, opts, o = {}) => ({ by: k, clock: 0, ...o, choice: opts.map(([t, set, text, ic]) => ({ t, ...(ic ? { ic } : {}), intent: text ? `Text ${WHO[to]}` : 'No text', idle: !text, set, then: text ? [sms(k, to, text), { wait: 2600 }] : [] })) });

  const story = Object.assign([
    // ---- 1-2. the black card, the place ----
    { sfx: 'crowd', loop: true },   // the lobby's crowd from the black card on: we hear the place before we see it
    { sfx: 'lobby jazz', loop: true },   // (09/11) and the lobby's jazz, soft, from the black card until the elevators
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
    ...at('h_phone'), sms('leo', 'pa', 'dad r u coming to practice tonight?', { quiet: true }), { hush: 3400 },   // Leo, on the lock screen, and his text (on the TV only: not on the real phone)
    // ---- 9. he looks at Ray: the first choice (the TV says where to look) ----
    ...at('h_ots_phone'), { hush: 1500 }, ...at('h_ots_look'), S('pb', 'Nothing to lose. Right?'),   // he looks up at Ray   // (09/11) over Ray's shoulder: Marcus on his phone. The line the choice answers
    { by: 'pa', clock: 0, cue: 'Look at your phone', big: true, ask: true, choice: [   // big: the TV all black (the first choices: so they get it)
      { t: 'I’ve got a lot to lose.', ic: 'worried', sh: 'A lot to lose', intent: 'Everything to lose', set: { p1: 'lose' }, then: [...at('h_ots_lose'), { hush: 700 }, S('pa', 'Ray…'), S('pa', 'I have a son.')] },
      { t: 'I’ve got a lot to win.', ic: 'hope', sh: 'A lot to win', intent: 'Everything to win', set: { p1: 'win' }, then: [...at('h_ots_win'), { hush: 700 }, S('pa', 'Speak for yourself.'), S('pa', 'After today, everything changes.')] },
    ] },
    // ---- 10-11. Ray's phone: Amy (only he sees who) ----
    ...at('h_ray_pocket'), RING, { hush: 1200 },
    { when: (f) => f.p1 === 'lose', then: [S('pa', 'Seems like you’ve got someone to lose as well.')] },
    { by: 'pb', ring: 'Amy', cue: 'Look at your phone', big: true, choice: [
      { t: 'Pick up', intent: 'picks up', set: { amy: 'call' }, then: [] },
      { t: 'Later', intent: 'later', set: { amy: 'later' }, then: [] },
    ] },
    HUNG, { room: { lp: 650, vol: .5, ms: 1500 } },   // the vibration stops; the crowd goes far
    // ---- 12. picked up: he walks away, the screen splits, a clock ticks. Ray on the call | Marcus texting Leo ----
    { when: (f) => f.amy === 'call', then: [
      ...at('h_ray_phone'), { hush: 1800 },   // he gets up, his phone in hand, and goes to take it
      // the two at the same time, each on his phone, at his own pace (a split: nobody waits on the other's lines); the TV: the clock
      { split: () => ({
        // each one taps his phone and goes in at once (his own gate: nobody waits on the other)
        pa: [{ when: () => TV, then: at('h_clock'), else: at('h_side_pa') }, { gate: 'pa', text: 'Text Leo back' }, { tick: true },
          // slow: Leo's text first (there since the lock screen), let it be read; then each answer after his dots
          { thread: ['pa', 'leo'] }, { wait: 3500 },
          sms('pa', 'leo', 'Sorry buddy, dad’s not going to practice this time.'), { wait: 3000 },
          sms('leo', 'pa', 'ok', { dots: 3000 }), { wait: 3000 },
          sms('leo', 'pa', 'mom says we wont have the money to do next season', { dots: 4500 }), { wait: 5000 },
          reply('pa', 'leo', [
            ['As of tonight, money won’t be an issue anymore.', { leo: 'money' }, 'As of tonight, money won’t be an issue anymore.', 'tough'],
            ['We’ll figure it out, buddy.', { leo: 'figure' }, 'We’ll figure it out, buddy.', 'love'],
            ['Listen to your mom.', { leo: 'mom' }, 'Listen to your mom.', 'calm'],
          ]),
          { tick: false }],
        // the call back and forth, on his phone: her, him, her
        pb: [...at('h_call_ray'), { gate: 'pb', text: 'Amy is on the line' }, { tick: true },
          ...at('h_call_amy'), S('amy', 'Hey you.'), S('amy', 'Are you still downtown?'),
          ...at('h_call_ray'), { by: 'pb', clock: 15000, choice: [
            { t: 'Yeah. Work thing.', ic: 'calm', intent: 'tells the truth', set: { told: 'truth' }, then: [S('pb', 'Still here, yeah.'), S('pb', 'Something for work.')] },
            { t: 'No. Home soon.', ic: 'lie', intent: 'lies', set: { told: 'lie' }, then: [S('pb', 'No, I’m on my way.'), S('pb', 'Twenty minutes.')] },
          ] },
          ...at('h_call_amy'), S('amy', 'I’ve got a meeting at noon.'), S('amy', 'A big one.'), S('amy', 'I’ll tell you tonight.'),
          { hush: 700 }, S('amy', 'Love you.'),
          ...at('h_call_ray'), { hush: 1500 },
          { tick: false }],
      }), tv: true, watch: () => 'pa', hold: () => ({ pa: 'Ray is still on the phone', pb: 'Marcus is still texting' }) },
      lose(4, 'crowd'),   // the call and the texts ate 4 minutes
      ...at('h_two'), { hush: 1800 },
    ] },
    // ---- 13-14. the elevators: Ray presses the button; the crowd back, Double It far away, very low and muffled, coming up slowly ----
    ...at('h_lift_hall'), { stop: 'lobby jazz', ms: 4000 }, { room: { lp: 20000, vol: 1, ms: 1000 } }, { music: 'double it', lv: 0, vol: .12, lp: 260, ms: 6000 }, { hush: 2600 },
    { music: 'double it', vol: .32, lp: 420, ms: 14000 },
    ...at('h_mpocket'), BUZZ, { hush: 1600 },   // Marcus's pocket buzzes: Sarah
    // ---- 15. the last text before going in (each his own) ----
    { split: (f) => ({
      pa: [{ gate: 'pa', text: 'Your last text before going in' }, { thread: ['pa', 'sarah'] }, sms('sarah', 'pa', 'Where are you?', { dots: 2500 }), { wait: 3000 }, reply('pa', 'sarah', [['I love you.', { sarah: 'love' }, 'I love you.', 'love'], ['Kiss Leo for me.', { sarah: 'kiss' }, 'Kiss Leo for me.', 'love'], ['Put the phone away.', { sarah: 'none' }]])],
      pb: [{ gate: 'pb', text: 'Your last text before going in' }, { thread: ['pb', 'amy'] }, reply('pb', 'amy', f.amy === 'call'
        ? [['Good luck at your meeting.', { last: 'luck' }, 'Good luck at your meeting.', 'hope'], ['I love you.', { last: 'love' }, 'I love you.', 'love'], ['Put the phone away.', { last: 'none' }]]
        : [['Can’t talk. Tonight, I promise.', { last: 'tonight' }, 'Can’t talk. Tonight, I promise.', 'calm'], ['I love you.', { last: 'love' }, 'I love you.', 'love'], ['Put the phone away.', { last: 'none' }]])],
    }), tv: true, watch: () => 'pa', hold: () => ({ pa: 'Ray is still texting', pb: 'Marcus is still texting' }) },
    { when: (f) => f.sarah !== 'none' || f.last !== 'none', then: [lose(1, 'crowd'), ...at('h_lift_hall')] },   // a text = a minute
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
    ...at('h_bank'), { hush: 1400 },
    // ---- the robbery: the key moments one after the other, no transitions (no card saying it's later). The choices are
    // the real ones (their screen, the music holding its breath) ----
    ...at('h_rob_out'), { sfx: 'crowd panic', loop: true }, T('“EVERYBODY DOWN.”'),
    ...at('h_rob_hands'), { hush: 1800 },
    { sfx: 'establishment alarm', loop: true }, ...at('h_rob_red'), { hush: 2200 },
    S('pb', 'Where’s the security guard??'),
    // ---- the guard (09/11): a flush behind the restroom door, Marcus aims at it. Wait in silence (and shoot, or shout), or
    // talk him out: threaten the hostages or reason with him; he comes out, but his gun stays on him (or slides to the hostages) ----
    ...at('h_wc'), { sfx: 'toilet flush', ms: 9000 }, { hush: 2800 },
    ...at('h_wc_aim'),
    { by: 'pa', cue: 'Look at your phone', clock: 10000, choice: [
      { t: 'Wait. Say nothing.', ic: 'calm', sh: 'Wait', intent: 'waits', idle: true, set: { guard: 'wait' }, then: [
        { hush: 1800 }, ...at('h_wc_gun'), { hush: 2400 },
        ...at('h_wc_out'), { hush: 700 },
        { by: 'pa', cue: 'Look at your phone', clock: 5000, choice: [
          { t: 'Shoot.', ic: 'gun', sh: 'Shoot', intent: 'shoots', set: { guard: 'shot', gun: 'floor' }, then: [
            { sfx: 'gun shot' }, ...at('h_wc_shot'), { hush: 2600 }] },
          { t: '“DROP IT!”', ic: 'say', sh: 'Drop it!', intent: 'shouts', set: { guard: 'drop', gun: 'floor' }, then: [
            S('pa', 'Gun on the floor! NOW!'), S('guard', 'Okay! Okay!'), ...at('h_wc_hands'), { hush: 2400 }] },
        ] },
        lose(1),   // the wait at the door
      ] },
      { t: '“I know you’re in there. Send over your weapon!”', ic: 'say', sh: 'I know you’re in there', intent: 'talks', set: { guard: 'talk' }, then: [
        S('pa', 'I heard the flush, buddy.'), S('pa', 'Your gun. Under the door. Now.'),
        S('guard', 'Come and get it.'),
        { by: 'pa', cue: 'Look at your phone', clock: 10000, choice: [
          { t: '“Ten seconds. Then someone out here pays for it.”', ic: 'tough', sh: 'Threaten them', intent: 'threatens the hostages', set: { talk: 'threat' }, then: [
            S('pa', 'You’ve got ten seconds.'), S('pa', 'After that, it’s one of them.'), S('guard', 'Don’t! Don’t touch them!')] },
          { t: '“Nobody dies for the bank’s money. Come out.”', ic: 'calm', sh: 'Reason', intent: 'reasons with him', set: { talk: 'reason' }, then: [
            S('pa', 'Listen. It’s not your money.'), S('pa', 'Nobody has to bleed for it.'), S('guard', '…')] },
        ] },
        S('guard', 'Okay.'), S('guard', 'I come out.'), S('guard', 'But the gun stays in my holster.'),
        { by: 'pa', cue: 'Look at your phone', clock: 7000, choice: [
          { t: '“Fine. On the ground.”', ic: 'calm', sh: 'Fine', intent: 'lets him keep it', set: { gun: 'holster' }, then: [
            S('pa', 'Okay. Out. Face down.'), ...at('h_wc_hands'), { hush: 2400 }] },
          { t: '“The gun first. Slide it.”', ic: 'tough', sh: 'The gun first', intent: 'wants the gun', set: { gun: 'floor' }, then: [
            S('pa', 'No. Gun first. Across the floor.'), ...at('h_wc_gun'), { hush: 2000 },
            ...at('h_wc_hands'), { hush: 1600 }] },
        ] },
        { fn: (f) => [lose(f.talk === 'reason' ? 3 : 2)] },   // the talk through the door (reasoning: longer)
      ] },
    ] },
    // (09/11) a plant: the audience sees Amy, the robbers don't. Her eyes, on the floor among the hostages, in the alarm's red
    // (Ray's player knows her from the call; Marcus's doesn't). No words
    ...at('h_amy_eyes'), { hush: 3200 },
    S('pb', 'Hold the room. I’ve got the vault.'), { set: { watch: 'pa' } },   // the vault: always Ray (Marcus stays with the room, and Amy)
    { music: 'double it', lv: 2 },
    { fn: (f) => {
      const W = f.watch, O = W === 'pa' ? 'pb' : 'pa', nW = N[W], nO = N[O];
      const BANG = [{ music: null, ms: 0 }, { sfx: 'gun shot' }, ...at('h_black'), T('BANG.')];
      return [
        // the vault: behind the steel, no crowd, the alarm far away; back in the room, all of it again
        { stop: 'crowd panic' }, { room: { lp: 380, vol: .45, ms: 300 } },
        ...at('h_vault_' + O), T(`${nO} in the vault with the teller.`), T(`${nW} alone with the room.`),
        { room: { lp: 20000, vol: 1, ms: 300 } }, { sfx: 'crowd panic', loop: true },
        ...at('h_holster'), T('On the floor, Amy’s hand moves.'), T(f.gun === 'holster' ? 'To the guard’s holster.' : 'To the guard’s gun.'),
        { music: 'double it', lv: 3 }, { bars: 'drop' },
        ...at('h_aim_' + W), T('Amy is up.'), T(`The guard’s gun on ${nW}’s head.`),
        // the one she holds: show his face or not
        { by: W, cue: 'Look at your phone', clock: 10000, choice: [
          { t: 'Take off the mask.', ic: 'unmask', sh: 'Unmask', intent: 'shows his face', set: { mask: 'off' }, then: [...at('h_face_' + W),
            ...(W === 'pb' ? [S('amy', '…Ray?'), T('The gun shakes in her hand.')] : [S('pa', 'I’ve got a kid.'), S('pa', 'Please.')])] },
          { t: 'Keep it on.', ic: 'mask', sh: 'Keep it on', intent: 'stays masked', idle: true, set: { mask: 'on' }, then: [
            S('amy', W === 'pb' ? 'Who are you?' : 'Take it off.'), ...(W === 'pb' ? [] : [S('amy', 'Now.')]), T('Her finger on the trigger.')] },
        ] },
        // the other one, back from the vault: the gun on his friend's head
        { fn: (g) => [...at(`h_standoff_${W}${g.mask === 'off' ? '_off' : ''}`),
          T(`${nO} comes back from the vault.`), T('The bags on his shoulder.'), T(`The gun on ${nW}’s head.`),
          { by: O, cue: 'Look at your phone', clock: 7000, choice: O === 'pa' ? [
            { t: 'Shoot her.', ic: 'gun', sh: 'Shoot', intent: 'shoots', set: { last: 'shoot' }, then: BANG },
            { t: 'Lower your gun.', ic: 'lower', sh: 'Lower it', intent: 'lowers it', set: { last: 'lower' }, then: [T('Marcus puts his gun on the floor.'), T('Amy’s doesn’t move.')] },
            { t: '“Hey! Over here!”', ic: 'hand', sh: 'Over here!', intent: 'takes the aim', set: { last: 'draw' }, then: [T('Amy turns.'), T('The gun on Marcus now.')] },
          ] : [
            { t: 'Take off your mask: “Amy. It’s me.”', ic: 'unmask', sh: 'It’s me', intent: 'shows himself', set: { last: 'me' }, then: [...at('h_face_pb'), S('pb', 'Amy.'), S('pb', 'It’s me.'),
              T('Amy stares at him.'), T('The gun goes down an inch.'),
              // (09/11) the new choice: take her with them, or leave her here, safe
              { by: 'pb', cue: 'Look at your phone', clock: 8000, choice: [
                { t: '“Come with us.”', ic: 'hand', sh: 'Come with us', intent: 'takes her along', set: { amygo: 'come' }, then: [S('pb', 'Come with us.'), S('pb', 'Now.')] },
                { t: '“Stay. You’ll be safe.”', ic: 'calm', sh: 'Stay safe', intent: 'leaves her safe', set: { amygo: 'stay' }, then: [S('pb', 'Stay here.'), S('pb', 'You’ll be safe.')] },
              ] }] },
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
    sides: { pa: .3, pb: .7 },   // (09/11) no one placed in the picture: Marcus left, Ray right (the arrow)
    phone: { time: '9:38', bat: { pa: 64, pb: 21 } },
    // (09/11) a player's own pose sheet, one per character (ref/posesheet_<name>.jpg: every cut-out he has in the story, on green,
    // in a grid read row by row): each cell takes the place of that prop. The first one is his face on the pick
    posesheet: {
      pa: { sheet: 'ref/posesheet_marcus.jpg', grid: [4, 3], poses: ['marcus_sit', 'marcus_listen', 'marcus_sit2', 'marcus_top', 'marcus_phone', 'marcus_stand', 'marcus_elev', 'marcus_elev2', 'marcus_reach'] },
      pb: { sheet: 'ref/posesheet_ray.jpg', grid: [4, 3], poses: ['ray_sit', 'ray_talk', 'ray_phone', 'ray_top', 'ray_back', 'ray_point', 'ray_call', 'ray_elev', 'ray_case', 'ray_mask'] },
    },
    pick: { pa: { pose: 'listen', desc: '30-year-old dad with money problems' }, pb: { pose: 'listen', desc: '29, owes a lot of money' } },   // (09/11) who they are, instead of a line
    cast: {
      pa: { name: 'Marcus', color: P1, sprite: 'h_marcus' },
      pb: { name: 'Ray', color: P2, sprite: 'h_ray' },
      leo: { name: 'Leo', color: '#f59e0b', avatar: 'props/leo_face.webp' },   // (09/11) his photo, from the lock screen
      sarah: { name: 'Sarah', color: '#22c55e', avatar: 'props/sarah_face.webp',   // (09/11) her photo (her initial until the file is there)
        past: [{ day: 'Yesterday', at: '6:12 PM' }, ['in', 'Did you call the bank about the loan?'], ['out', 'Tomorrow. I’ll handle it.'],
          ['in', 'Leo’s coach asked about next season’s fees again'], ['out', 'I know. I’m on it.'],
          { day: 'Today', at: '7:05 AM' }, ['in', 'You left early. Everything ok?'], ['out', 'Yeah. Something downtown.'], ['in', 'Ok. Love you']] },   // their texts before (above the new ones)
      amy: { name: 'Amy', color: AMY, avatar: 'props/amy_face.webp',   // (09/11) her photo (her initial until the file is there)
        past: [{ day: 'Today', at: '8:02 AM' }, ['in', 'Good luck today ❤️'], ['out', 'You too.']] },   // (09/11) just this morning's: more was too much in your face
      guard: { name: 'Guard', color: '#94a3b8' },
    },
    words: { LEDE: (f) => [
      f.p1 === 'lose' ? 'Marcus had everything to lose.' : 'Marcus had everything to win.',
      f.amy === 'call' ? `Ray picked up for Amy${f.told === 'lie' ? ', and lied to her' : ''}.` : 'Ray let Amy’s call go.',
      'Amy was in the bank on 31.',
      ({ shot: 'Marcus shot the guard.', drop: 'Marcus made the guard drop his gun.', talk: 'Marcus talked the guard out.' })[f.guard] || '',
      f.watch ? 'Ray took the vault. Marcus stayed with the room, and Amy took the guard’s gun.' : '',
      f.mask === 'off' ? `${N[f.watch]} showed her his face.` : f.mask === 'on' ? `${N[f.watch]} kept his mask on.` : '',
      ({ shoot: 'Then a shot.', lower: 'Marcus put his gun down.', draw: 'Marcus took the aim for his friend.', me: 'Ray showed Amy who he was.', drop: 'Ray dropped the money.' })[f.last] || '',
      ({ come: 'He asked her to come with them.', stay: 'He told her to stay, safe.' })[f.amygo] || '',
    ].filter(Boolean).join(' ') },
  });
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), d_heist: story };
})();
