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
  const TOP = [{ src: 'marcus_top2', x: 430.5, y: 860, w: 488, who: 'pa' },   // (10/11) Justin's: Marcus from above, hands clasped, to himself
     { src: 'ray_top', x: 1247, y: 883, w: 534, who: 'pb' }];
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
  // (10/11) both turned inward: Marcus worried, to himself (hands clasped); Ray not reacting (chin on his hand, eyes down)
  SCENES.h_two_w = chairs([{ src: 'marcus_worried', x: 497.5, y: 883, w: 547, who: 'pa' }, RAY]);   // (10/11) Justin's: worried, looking away
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
  // (09/11) Marcus's phone on the bank's floor, the screen smashed, Leo still smiling under the cracks (the alarm's red)
  SCENES.h_phone_broken = { image: 'bg/phone_broken.webp', size: PIC, spots: {}, face: {}, back: [], front: [] };
  SCENES.h_amy_eyes = { image: 'bg/amy_floor.webp', size: PIC, spots: {}, face: {}, back: [], front: [] };
  SCENES.h_ray_sees = place({ back: [R(0, 0, 1920, 1080, '#cfc6b0'), R(160, 600, 980, 210, AMY, { r: 105 }), C(1240, 640, 280, SKIN),
    R(1540, 0, 380, 520, P2, { r: '0 0 0 160px' }), R(1420, 380, 220, 60, '#0b0b0d', { r: 8 })] });   // her face on the floor; his sleeve, his gun
  const vault = (k) => place({ back: [R(0, 0, 1920, 1080, '#2b2f36'), C(1180, 520, 760, '#9ca3af', { line: '34px solid #6b7280' }), C(1180, 520, 120, '#6b7280'),
    ...handsUp(560, 1060, 1.5, GREY), ...armed(260, 1080, 1.9, COL[k], 1, { face: MASK })] });
  SCENES.h_vault_pb = vault('pb');   // the vault: always Ray
  // (09/11) Amy's face, unmasked Ray in front of her (from Justin's Amy, in the alarm's red): she tells him who's coming
  SCENES.h_amy_face = { image: 'bg/amy_face.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { amy: .2 } };
  // ---- (09/11) the end (shapes until Justin's pictures): Amy hit; Amy with a bag, one of them; Marcus holding Amy ----
  const BAG = '#3f2d20', SWAT = '#0f172a', bag = (x, y, s = 1) => R(x, y, 120 * s, 80 * s, BAG, { r: 14 * s });
  const swat = (x, y, s) => stand(x, y, s, SWAT, { face: '#1f2937' });
  // someone holding someone in front of him, a gun at her head
  const holds = (x, y, s, color, hostage, o = {}) => [...stand(x - 60 * s, y, s, color, { face: o.face || MASK }), ...stand(x + 20 * s, y + 10 * s, s * .95, hostage),
    R(x - 100 * s, y - 250 * s, 60 * s, 26 * s, color, { r: 13 * s }), C(x - 40 * s, y - 238 * s, 30 * s, SKIN),   // his arm round her
    C(x - 62 * s, y - 286 * s, 26 * s, SKIN), R(x - 52 * s, y - 300 * s, 44 * s, 24 * s, '#0b0b0d', { r: 4 })];   // his hand, the gun at her temple
  // (11/11) the new middle (shapes until Justin's pictures): Ray over the counter; the vault, two bags; Amy crawling to the
  // guard, then behind Marcus; Ray back with the bags; Amy up behind Marcus, Ray a bag in his hand; the bag in her face
  // (11/11) Justin's: Ray vaulting the counter; in the vault, filling the two bags; reading Amy's texts, frozen
  SCENES.h_counter = { image: 'bg/ray_counter.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pb: .6 } };
  SCENES.h_bags = { image: 'bg/vault_bags.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pb: .45 } };
  SCENES.h_ray_reads = { image: 'bg/ray_reads.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pb: .45 } };
  SCENES.h_counter_shape = place({ back: [...BANK, ...lie(400, 1010, GREY), ...lie(1500, 990, GREY), ...stand(1000, 600, 1.4, P2, { face: MASK })] });
  SCENES.h_bags_shape = place({ back: [R(0, 0, 1920, 1080, '#2b2f36'), C(1400, 480, 700, '#9ca3af', { line: '30px solid #6b7280' }), C(1400, 480, 110, '#6b7280'),
    ...bust(700, 1080, 2.4, P2, { face: MASK }), bag(980, 900, 2.2), bag(260, 940, 2), R(1050, 980, 240, 60, '#3f6212', { r: 6 }), R(1100, 950, 200, 40, '#4d7c0f', { r: 6 })] });
  // (11/11) Justin's: Amy crawling to the guard's gun; Amy crawling behind Marcus, the gun in her hand
  SCENES.h_amy_crawl = { image: 'bg/amy_crawl.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { amy: .35 } };
  SCENES.h_amy_behind = { image: 'bg/amy_behind.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pa: .45, amy: .65 } };
  SCENES.h_amy_crawl_shape = place({ back: [...BANK, ...lie(1250, 1010, GUARD), R(1080, 1000, 70, 30, '#0b0b0d', { r: 4 }), ...lie(640, 1000, AMY, 1.3), ...armed(250, 1080, 1.6, P1, -1, { face: MASK })] });
  SCENES.h_amy_behind_shape = place({ back: [...BANK, ...lie(1500, 1010, GUARD), ...armed(1250, 1080, 2, P1, 1, { face: MASK }), ...lie(680, 1010, AMY, 1.3)] });
  // (11/11) Justin's: Ray running back with the two bags; Amy up behind Marcus, aiming, Ray (from behind) a bag ready to
  // throw; the bag in her face, the gun flying
  SCENES.h_ray_rush = { image: 'bg/ray_rush.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pb: .5 } };
  SCENES.h_behind = { image: 'bg/amy_standoff.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pb: .3, amy: .63, pa: .8 } };
  SCENES.h_bag_hit = { image: 'bg/bag_hit.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pb: .2, amy: .7 } };
  SCENES.h_ray_rush_shape = place({ back: [R(0, 0, 1920, 1080, '#3b3530'), R(0, 820, 1920, 260, '#2a2622'), ...stand(960, 1080, 2.2, P2, { face: MASK }), bag(700, 760, 2), bag(1110, 780, 2)] });
  SCENES.h_behind_shape = place({ back: [...BANK, ...lie(1700, 1010, GUARD), ...armed(1450, 1080, 1.8, P1, 1, { face: MASK }), ...armed(900, 1080, 1.8, AMY, 1),
    ...stand(260, 1080, 1.9, P2, { face: MASK }), bag(130, 560, 2.4), bag(330, 980, 1.6)] });
  SCENES.h_bag_hit_shape = place({ back: [...BANK, ...lie(900, 1010, AMY, 1.4), bag(1080, 880, 1.8), R(1400, 1000, 70, 30, '#0b0b0d', { r: 4 }), ...stand(300, 1080, 1.9, P2, { face: MASK })] });
  SCENES.h_amy_hurt = place({ back: [...BANK, ...lie(560, 960, GREY), ...lie(1000, 1010, AMY, 1.4), C(1170, 960, 46, '#b91c1c'), ...armed(1560, 1080, 1.9, P2, -1, { face: MASK })] });
  SCENES.h_amy_join = place({ back: [...BANK, ...lie(1000, 1010, GUARD), ...stand(560, 1080, 2, P2, { face: SKIN }), bag(620, 760, 1.3), ...stand(960, 1080, 1.9, AMY), bag(1010, 770, 1.3), ...stand(1380, 1080, 2, P1, { face: MASK })] });
  SCENES.h_grab = place({ back: [...BANK, ...lie(560, 960, GREY), ...holds(960, 1080, 2, P1, AMY), ...stand(1560, 1080, 1.9, P2, { face: MASK }), bag(1420, 980, 1.4), bag(1560, 990, 1.4)] });
  // the stairs: the two of them up there, the crowd coming
  SCENES.h_stairs = place({ back: [R(0, 0, 1920, 1080, '#1c1f26'), ...Array.from({ length: 7 }, (_, i) => R(160 + i * 210, 960 - i * 120, 420, 34, '#2f343d', { r: 6 })),
    ...stand(1430, 380, 1, P2, { face: MASK }), bag(1460, 250, .8), ...stand(1230, 500, 1, P1, { face: MASK }),
    ...Array.from({ length: 8 }, (_, i) => bust(120 + i * 150, 1080 + (i % 2) * 40, 1.2, GREY, { blur: 2 }))] });
  // the roof: the sky, the next tower (a sniper's glint), the gravel, the stairs' door, the gondola, the helicopter's light
  const tower = [R(1480, 80, 440, 1000, '#5a6474'), ...Array.from({ length: 24 }, (_, i) => R(1510 + (i % 4) * 100, 120 + Math.floor(i / 4) * 95, 60, 50, '#7c8796', { r: 4 })),
    C(1712, 318, 22, '#fff', { glow: '0 0 40px 16px rgba(255,255,255,.85)' })];
  const roof = (more) => place({ back: [R(0, 0, 1920, 1080, '#aebdcc'), ...tower, R(0, 720, 1920, 360, '#3d434d'), R(0, 700, 1920, 26, '#2a2f37'), ...more] });
  const door = (x) => [R(x, 380, 380, 340, '#2b313b'), R(x + 110, 470, 160, 250, '#0b0d10')];
  const gondola = (x, y, w = 330) => [R(x + 30, 0, 6, y, '#111'), R(x + w - 36, 0, 6, y, '#111'), R(x, y, w, 160, '#9ca3af', { line: '6px solid #4b5563', r: 6 })];
  const light = (x, y, w, h) => R(x - w / 2, y - h / 2, w, h, 'rgba(255,253,225,.3)', { r: '50%', glow: '0 0 120px 40px rgba(255,253,225,.25)' });
  SCENES.h_roof_shield = roof([...door(60), ...gondola(1150, 520), light(900, 900, 760, 300), ...stand(330, 1010, 1.5, P2, { face: MASK }), bag(380, 850, 1.1),
    ...holds(900, 1040, 1.9, P1, AMY), swat(1560, 700, .5), swat(1660, 700, .5)]);
  SCENES.h_amy_runs = roof([...door(60), light(560, 920, 520, 240), ...stand(560, 1020, 1.8, P1, { face: MASK }), ...stand(1180, 1000, 1.5, AMY),
    swat(1500, 1000, 1.6), swat(1700, 1000, 1.6)]);
  SCENES.h_roof_door = place({ back: [R(0, 0, 1920, 1080, '#aebdcc'), R(420, 60, 1080, 1020, '#2b313b'), R(600, 160, 720, 920, '#0b0d10'),
    C(700, 720, 90, SKIN, { blur: 2 }), C(1240, 820, 90, SKIN, { blur: 2 }), C(830, 940, 90, SKIN, { blur: 2 }),   // the crowd's hands, in the dark
    ...stand(960, 1260, 2.8, P2, { face: MASK }), R(1180, 520, 160, 14, '#1a120b', { rot: -18 }), bag(1260, 600, 2.2)] });   // the strap caught
  SCENES.h_roof_gondola = roof([...door(60), ...gondola(1250, 540), light(1040, 900, 560, 260), ...stand(1040, 1010, 1.8, P1, { face: MASK }), bag(1110, 860, 1),
    ...stand(240, 720, .6, P2, { face: MASK }), swat(1600, 700, .5)]);
  // (10/11) Justin's: the roof at night, three police helicopters, Marcus alone in their lights
  SCENES.h_roof_lights = { image: 'bg/roof_lights.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pa: .5 } };
  // (10/11) Justin's: Ray stuck in the roof door, the bag's strap caught, the crowd's hands behind; Marcus holding Amy,
  // the gun at her head, in the helicopters' lights (they replace the shapes)
  SCENES.h_roof_door = { image: 'bg/roof_door.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pb: .5 } };
  SCENES.h_roof_shield = { image: 'bg/roof_shield.webp', size: PIC, spots: {}, face: {}, back: [], front: [], spk: { pa: .48, amy: .53 } };
  SCENES.h_roof_wide = roof([...door(60), ...stand(250, 720, .8, P2, { face: MASK }), ...gondola(1250, 540), ...stand(1100, 1000, 1.3, P1, { face: MASK }),
    light(1100, 950, 520, 220), swat(1600, 700, .5), swat(1700, 700, .5)]);
  // the ends: down the tower's face in the gondola (two, no bags; one, with his bag); on their knees in the light; two,
  // the money, a bullet through the cabin
  const facade = (more) => place({ back: [R(0, 0, 1920, 1080, '#5d6878'), ...Array.from({ length: 40 }, (_, i) => R(40 + (i % 8) * 240, 40 + Math.floor(i / 8) * 210, 160, 150, '#8693a3', { r: 4 })), ...more] });
  const cabin = (x, y) => [R(x + 40, 0, 8, y, '#111'), R(x + 412, 0, 8, y, '#111'), R(x, y, 460, 220, '#9ca3af', { line: '8px solid #4b5563', r: 8 })];
  SCENES.h_end_broke = facade([...bust(720, 700, 1.6, P1, { face: MASK }), ...bust(1000, 700, 1.6, P2, { face: MASK }), ...cabin(640, 560)]);
  SCENES.h_end_alone = facade([R(0, 0, 1920, 90, '#2a2f37'), ...Array.from({ length: 6 }, (_, i) => C(1300 + i * 70, 60, 60, GREY)), C(1250, 60, 60, P2),
    ...bust(860, 760, 1.6, P1, { face: MASK }), bag(980, 640, 1.2), ...cabin(700, 620)]);
  SCENES.h_end_caught = roof([...door(60), light(900, 930, 900, 300), ...bust(760, 1040, 1.7, P1, { face: MASK }), ...bust(1060, 1040, 1.7, P2, { face: MASK }),
    swat(420, 1080, 1.7), swat(1400, 1080, 1.7), swat(1620, 1080, 1.7)]);
  SCENES.h_end_together = facade([...bust(720, 760, 1.6, P1, { face: MASK }), ...bust(1000, 760, 1.6, P2, { face: MASK }), C(1030, 700, 40, '#b91c1c'),
    bag(800, 640, 1.2), bag(1080, 640, 1.2), ...cabin(640, 620), C(1010, 700, 26, '#0b0b0d'), R(985, 690, 60, 4, '#0b0b0d', { rot: 30 })]);
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
    return [{ set: { lost: m } }]; } });   // (11/11) no clock on screen, no ticking: only counted
  // a text answer: no timer (clock 0), you take your time
  const RAY_HAND = { img: 'props/ray_hand.webp', ar: 865 / 927, screen: [.096, .0173, .3618, .7001] };
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
    ...at('h_two_w'), S('pa', 'Guess there’s no turning back now.'),   // (10/11) to himself, worried
    S('pb', 'Yeah…'), { zoom: { k: 1.2, x: 1160, y: 460, ms: 0 } }, S('pb', 'Can’t afford to miss out on this.'), { zoom: { k: 1.4, x: 1180, y: 440, ms: 0 } }, S('pb', 'I’ve got bills.'),   // Ray doesn't look at him
    ...at('h_two_r'), { zoom: { k: 1.25, x: 1150, y: 450, ms: 0 } }, S('pb', 'And nothing to lose.'),   // now at Marcus, determined
    // ---- 8. Marcus's phone: Leo, his kids behind ----
    ...at('h_top_buzz'), BUZZ, { hush: 1400 },   // his phone buzzes on the table
    ...at('h_phone'), sms('leo', 'pa', 'dad r u coming to practice tonight?', { quiet: true }), { hush: 3400 },   // Leo, on the lock screen, and his text (on the TV only: not on the real phone)
    // ---- 9. he looks at Ray: the first choice (the TV says where to look) ----
    ...at('h_ots_phone'), { hush: 1500 }, S('pb', 'Nothing to lose. Right?'),   // (10/11) he keeps his eyes on his phone until he answers   // he looks up at Ray   // (09/11) over Ray's shoulder: Marcus on his phone. The line the choice answers
    { by: 'pa', clock: 0, cue: 'Look at your phone', big: true, ask: true, choice: [   // big: the TV all black (the first choices: so they get it)
      { t: 'I’ve got a lot to lose.', ic: 'worried', sh: 'A lot to lose', intent: 'Everything to lose', set: { p1: 'lose' }, then: [...at('h_ots_lose'), { hush: 700 }, S('pa', 'Ray…'), S('pa', 'I have a son.')] },
      { t: 'I’ve got a lot to win.', ic: 'hope', sh: 'A lot to win', intent: 'Everything to win', set: { p1: 'win' }, then: [...at('h_ots_win'), { hush: 700 }, S('pa', 'Money won’t be a problem anymore.')] },
    ] },
    // ---- 10-11. (10/11) the two phones, on the TV: the screen in two, one thing at a time. Marcus's phone with Leo (left), Ray's
    // with Amy (right, his hand). Two answers each, chosen on each one's own phone, no clock. No call ----
    ...at('h_ray_pocket'), BUZZ, { hush: 1400 },   // Ray's pocket buzzes too
    { duo: { pa: { who: 'Leo', hand: { img: 'props/marcus_hand.webp', ar: 936 / 929, screen: [.0962, .0194, .344, .7115] } }, pb: { who: 'Amy', heart: true, hand: { img: 'props/ray_hand.webp', ar: 865 / 927, screen: [.096, .0173, .3618, .7001] } } } }, { hush: 900 },
    { duoIn: ['pa', { text: 'dad r u coming to practice tonight?' }] }, { hush: 2200 },
    { duoIn: ['pb', { img: 'bg/amy_selfie.webp' }] }, { hush: 2800 },   // Justin's: her joke selfie in the bathroom mirror
    { duoOut: ['pa', 'Sorry buddy, dad’s not going to practice this time.'] }, { hush: 2200 },
    { duoIn: ['pa', { text: 'mom says we wont have the money to do next season' }] }, { hush: 3200 },
    { by: 'pa', clock: 0, choice: [
      { t: 'Money won’t be an issue.', ic: 'tough', sh: 'No more money issue', intent: 'Text Leo', set: { leo: 'money' }, then: [{ duoOut: ['pa', 'As of tonight, money won’t be an issue anymore.'] }, { hush: 1600 }] },
      { t: 'We’ll figure it out, buddy.', ic: 'love', sh: 'We’ll figure it out', intent: 'Text Leo', set: { leo: 'figure' }, then: [{ duoOut: ['pa', 'We’ll figure it out, buddy.'] }, { hush: 1600 }] },
    ] },
    { by: 'pb', clock: 0, choice: [
      { t: 'I’m gonna marry you.', ic: 'love', sh: 'Marry', intent: 'Text Amy', set: { amytext: 'marry' }, then: [{ duoOut: ['pb', 'I’m gonna marry you.'] }, { hush: 1600 }] },
      { t: 'Who let you out like that? 😂', ic: 'say', sh: 'Make fun', intent: 'Text Amy', set: { amytext: 'fun' }, then: [{ duoOut: ['pb', 'Who let you out like that? 😂'] }, { hush: 1400 }, { duoIn: ['pb', { text: 'You’re a menace 😂' }] }, { hush: 1800 }] },   // TODO Justin's words
    ] },
    { duo: false }, lose(2),   // the texts ate 2 minutes
    ...at('h_ots_look'), S('pb', 'It’s time.'),   // (09/11) over Ray's shoulder, before the elevators
    // ---- 13-14. the elevators: Ray presses the button; the crowd back, Double It far away, very low and muffled, coming up slowly ----
    ...at('h_lift_hall'), { stop: 'lobby jazz', ms: 4000 }, { room: { lp: 20000, vol: 1, ms: 1000 } }, { music: 'double it', lv: 1, vol: .12, lp: 260, ms: 6000 }, { hush: 2600 },
    { music: 'double it', vol: .32, lp: 420, ms: 14000 },
    // ---- 16. ding: in. The crowd stays outside, the music comes close ----
    { sfx: 'elevator ding' }, ...at('h_lift_hall'), { hush: 900 },
    ...at('h_in_02'), { music: 'double it', lp: 480, vol: .3, ms: 6000 }, { bars: 2 },   // (10/11) still far, muffled: it opens with the doors
    // ---- 17. up: a floor every 2 bars; the briefcase; the masks; the doors open on the drop ----
    ...at('h_in_08'), { music: 'double it', lp: 560, vol: .32 },
    { bars: 2 },
    ...at('h_case14'), { music: 'double it', lp: 650, vol: .34 }, { bars: 2 },
    ...at('h_gun'), { music: 'double it', lp: 760, vol: .37 }, { bars: 2 },
    ...at('h_mask26'), { music: 'double it', lp: 900, vol: .4 }, { bars: 2 },
    ...at('h_masked'), { music: 'double it', lp: 1100, vol: .44 },
    { music: 'double it', lv: 2, vol: .7, ms: 2400, inBars: 2 }, { bars: 1 },   // (10/11) the first drop held back; the next ones louder
    { sfx: 'elevator ding' }, ...at('h_crack'), { bars: 'drop' }, { music: 'double it', lp: 20000, ms: 400 },   // the doors open: the music too   // the doors crack open, the drop: they open
    ...at('h_bank'), { hush: 1400 },
    // ---- the robbery: the key moments one after the other, no transitions (no card saying it's later). The choices are
    // the real ones (their screen, the music holding its breath) ----
    ...at('h_rob_out'), { sfx: 'crowd panic', loop: true, peak: 1.1 }, T('“EVERYBODY DOWN.”'),   // (10/11) the crowd's scream, loud, then it settles
    ...at('h_rob_hands'), { hush: 1200 }, T('No security. Anywhere.'), { hush: 600 },   // (11/11) before the alarm turns the room red
    { sfx: 'establishment alarm', loop: true }, ...at('h_rob_red'), { hush: 1600 },
    // ---- (11/11) Ray takes the vault, Marcus the room: one line, then the picture ----
    S('pb', 'Heading for the vault.'), { set: { watch: 'pa' } },
    // Ray's side: over the counter, down to the vault, two bags; then Amy's texts: she's here
    ...at('h_counter'), { hush: 1600 },
    // ---- (11/11) Ray over the counter, then straight to Marcus: the guard behind the restroom door ----
    // (10/11) the room goes far (the alarm, the crowd) so the flush behind the door is heard; back after
    ...at('h_wc'), { room: { lp: 700, vol: .25, ms: 500 } }, { sfx: 'toilet flush', ms: 9000, lp: 800 }, { hush: 3600 },   // the other side of a door: muffled
    ...at('h_wc_aim'), { room: { lp: 20000, vol: 1, ms: 2500 } },
    { by: 'pa', cue: 'Look at your phone', clock: 10000, choice: [
      { t: 'Wait. Say nothing.', ic: 'calm', sh: 'Wait', intent: 'waits', idle: true, set: { guard: 'wait' }, then: [
        { hush: 1800 }, ...at('h_wc_gun'), { hush: 2400 },
        ...at('h_wc_out'), { hush: 700 },
        { by: 'pa', cue: 'Look at your phone', clock: 5000, choice: [
          { t: 'Shoot.', ic: 'gun', sh: 'Shoot', intent: 'shoots', set: { guard: 'shot', gun: 'floor' }, then: [
            { hush: 1400 }, { sfx: 'gun shot' }, { bang: 1 }, { room: { lp: 500, vol: .3, ms: 60 } }, ...at('h_wc_shot'),
            { hush: 2200 }, { room: { lp: 20000, vol: 1, ms: 3000 } }, { hush: 1200 }] },   // (10/11) a breath of silence, the shot, the frame jolts and a flash, the ears ring (the room goes dull), then it comes back
          { t: '“DROP IT!”', ic: 'say', sh: 'Drop it!', intent: 'shouts', set: { guard: 'drop', gun: 'floor' }, then: [
            S('pa', 'Gun on the floor! NOW!'), S('guard', 'Okay! Okay!'), ...at('h_wc_hands'), { hush: 2400 }] },
        ] },
      ] },
      { t: '“I know you’re in there.”', ic: 'say', sh: 'I know you’re in there', intent: 'talks', set: { guard: 'talk' }, then: [
        S('pa', 'I heard the flush, buddy.'), S('pa', 'Your gun. Under the door. Now.'), S('pa', 'Send over your weapon!'),
        { zoom: { k: 1.3, x: 1000, y: 350, ms: 0 } }, S('guard', 'Come and get it!', { whisper: true }),   // (10/11) muffled, through the door: italic
        { by: 'pa', cue: 'Look at your phone', clock: 10000, choice: [
          { t: '“Ten seconds.”', ic: 'tough', sh: 'Threaten them', intent: 'threatens the hostages', set: { talk: 'threat' }, then: [
            S('pa', 'You’ve got ten seconds.'), S('pa', 'After that, it’s one of them.'), S('guard', 'Don’t! Don’t touch them!')] },
          { t: '“It’s not your money.”', ic: 'calm', sh: 'Reason', intent: 'reasons with him', set: { talk: 'reason' }, then: [
            S('pa', 'Listen. It’s not your money.'), S('pa', 'Nobody has to bleed for it.'), S('guard', '…')] },
        ] },
        { zoom: { k: 1.6, x: 1000, y: 340, ms: 0 } }, S('guard', 'Okay.'), S('guard', 'I come out.'), S('guard', 'But the gun stays in my holster.'),
        { by: 'pa', cue: 'Look at your phone', clock: 7000, choice: [
          { t: '“Fine. On the ground.”', ic: 'calm', sh: 'Fine', intent: 'lets him keep it', set: { gun: 'holster' }, then: [
            S('pa', 'Okay. Out. Face down.'), ...at('h_wc_hands'), { hush: 2400 }] },
          { t: '“The gun first. Slide it.”', ic: 'tough', sh: 'The gun first', intent: 'wants the gun', set: { gun: 'floor' }, then: [
            S('pa', 'No. Gun first. Across the floor.'), ...at('h_wc_gun'), { hush: 2000 },
            ...at('h_wc_hands'), { hush: 1600 }] },
        ] },
      ] },
    ] },
    // ---- (11/11) meanwhile, Ray in the vault: two bags, then Amy's texts ----
    { stop: 'crowd panic' }, { room: { lp: 380, vol: .45, ms: 300 } },   // behind the steel: no crowd, the alarm far away
    ...at('h_bags'), { hush: 2400 },
    ...at('h_ray_pocket'), BUZZ, { hush: 1200 },
    { duo: { pb: { who: 'Amy', heart: true, hand: RAY_HAND } } }, { hush: 700 },
    { duoIn: ['pb', { text: 'ray' }] }, { hush: 1300 },
    { duoIn: ['pb', { text: 'theres a robbery' }] }, { hush: 1500 },
    { duoIn: ['pb', { text: 'im at the bank on 31' }] }, { hush: 3200 },   // the selfie: the bank's restroom
    { duo: false }, ...at('h_ray_reads'), { hush: 2600 },   // his face: she's out there
    { room: { lp: 20000, vol: 1, ms: 300 } }, { sfx: 'crowd panic', loop: true },
    // ---- (11/11) Amy: her eyes, she crawls to the guard, then behind Marcus; Ray comes back with the bags ----
    ...at('h_amy_eyes'), { hush: 2600 },
    ...at('h_amy_crawl'), { hush: 3000 }, ...at('h_amy_behind'), { hush: 2400 },   // (11/11) show, don't tell
    { music: 'double it', lv: 3 }, { bars: 'drop' },
    ...at('h_ray_rush'), { hush: 1800 },
    ...at('h_behind'), { hush: 2200 },
    // Ray: show her who he is, or throw the bag in her face
    { by: 'pb', peak: true, cue: 'Look at your phone', clock: 8000, choice: [
      { t: 'Take off your mask.', w: 'Amy', img: 'stakes/amy.webp', ic: 'unmask', sh: 'Amy!', intent: 'shows himself', set: { ray: 'reveal', bags: 2 }, then: [
        ...at('h_face_pb'), S('pb', 'AMY!'), T('In front of everyone.'),
        ...at('h_amy_face'), { hush: 900 }, S('amy', '…Ray?'), { hush: 700 },
        S('amy', 'They came to the house.'), S('amy', 'Last night.'), S('amy', 'They said Friday.'), { hush: 600 },
        S('amy', 'That’s why I’m here.'), S('amy', 'A loan.'), S('amy', 'For your debt.'),
        { by: 'pb', cue: 'Look at your phone', clock: 9000, choice: [
          { t: '“Come with us.”', ic: 'hand', sh: 'Come with us', intent: 'asks her to come', set: { amygo: 'come' }, then: [S('pb', 'Come with us.'), S('pb', 'Now.')] },
          { t: '“Stay. You’ll be safe.”', ic: 'calm', sh: 'Stay safe', intent: 'leaves her safe', set: { amygo: 'stay' }, then: [S('pb', 'Stay here.'), S('pb', 'You’ll be safe.'), T('She lowers the gun.'), T('She sits back down with the others.')] },
        ] },
        // she would come, but the other one shot the guard: Marcus has to show his face
        { fn: (f) => f.amygo !== 'come' ? [] : f.guard !== 'shot' ? [T('She lowers the gun.'), S('amy', 'Okay.'), { set: { amyjoin: true } }] : [
          ...at('h_amy_face'), S('amy', 'You shot him!'), S('amy', 'I’m not going anywhere with him.'),
          { by: 'pa', cue: 'Look at your phone', clock: 9000, choice: [
            { t: 'Take off your mask. “I have a son.”', ic: 'unmask', sh: 'My son', intent: 'shows his face', set: { mface: 'off', amyjoin: true }, then: [
              ...at('h_face_pa'), S('pa', 'I have a son.'), S('pa', 'He’s nine.'), S('pa', 'I didn’t want any of this.'), T('She lowers the gun.'), S('amy', 'Okay.')] },
            { t: '“We don’t have time.”', ic: 'tough', sh: 'No time', intent: 'stays masked', set: { mface: 'on' }, then: [
              S('pa', 'We don’t have time for this.'), T('She backs away.'), T('Back to the others.')] },
          ] },
        ] },
      ] },
      { t: 'Throw the bag in her face.', w: 'Marcus', img: 'stakes/marcus.webp', ic: 'bags', sh: 'Throw the bag', intent: 'throws the bag', set: { ray: 'throw', bags: 1 }, then: [
        ...at('h_bag_hit'), T('The bag hits her in the face.'), T('She goes down.'), T('The gun slides away.'), T('So does the bag.'),
        { by: 'pb', cue: 'Look at your phone', clock: 7000, choice: [
          { t: 'Run for the exit.', ic: 'send', sh: 'Run', intent: 'runs', set: { back: 'no' }, then: [S('pb', 'GO!'), S('pb', 'Leave it!')] },
          { t: 'Get the bag back.', ic: 'bags', sh: 'The bag', intent: 'goes back for it', set: { back: 'yes', bags: 2 }, then: [
            T('Ray goes back for it.'), T('Amy on her knees.'), T('The bag in her arms.'), T('He tears it away from her.'), T('She doesn’t know it’s him.')] },
        ] },
      ] },
    ] },
    // ---- (11/11) the room turns on them. Marcus fires to calm it: his gun is empty ----
    ...at('h_rob_red'), T('The room starts to move.'),
    { fn: (f) => [
      ...(f.talk === 'threat' ? [S('guard', 'He threatened us!')] : [S('hostage', 'He threatened us!')]),
      ...(f.guard === 'shot' ? [S('hostage', 'He killed the security!')] : []),
      ...(f.amyjoin ? [S('hostage', 'And she’s with them?!')] : []),
    ] },
    S('pa', 'DOWN!'), S('pa', 'Everybody DOWN!'), T('Marcus fires at the ceiling.'),
    { music: null, ms: 0 }, ...at('h_black'), { hush: 700 }, T('Click.'), { hush: 1400 }, T('Click.'),
    ...at('h_rob_red'), S('hostage', 'His gun’s empty!'), { sfx: 'crowd panic', loop: true }, T('Twenty of them get up.'),
    { sfx: 'sirens', loop: true },   // the police arriving: several sirens, near and far
    ...at('h_stairs'), S('pb', 'THE ROOF!'), T('The stairs.'), T('The crowd right behind them.'),
    // ---- (11/11) the roof: one problem, by what they carry. Two bags = Ray stuck in the door; one = the snipers. The episode
    // ends on the choice: we never see what it does (they want the next one) ----
    { sfx: 'helicopters', loop: true, peak: .7 }, ...at('h_roof_lights'), { hush: 2600 },
    { fn: (f) => f.bags === 2 ? [
      { set: { roof: 'stuck' } },
      ...at('h_roof_door'), T('Ray’s bag.'), T('Caught in the door.'), T('The crowd two floors down.'),
      ...at('h_roof_gondola'), T('Marcus at the gondola.'), T('Twenty meters away.'),
      { split: () => ({
        pa: [{ when: () => TV, then: at('h_roof_lights'), else: at('h_roof_gondola') }, { by: 'pa', peak: true, clock: 8000, choice: [
          { t: 'Get in the gondola.', w: 'Freedom', img: 'stakes/leo.webp', ic: 'send', sh: 'Go', intent: 'goes', set: { ma: 'go' }, then: [] },
          { t: 'Run back for Ray.', w: 'Ray', img: 'stakes/ray.webp', ic: 'hand', sh: 'Back for Ray', intent: 'goes back for him', set: { ma: 'back' }, then: [] },
        ] }],
        pb: [...at('h_roof_door'), { by: 'pb', peak: true, clock: 8000, choice: [
          { t: 'Pull the bag free.', w: 'Amy', img: 'stakes/amy.webp', ic: 'bags', sh: 'Pull it', intent: 'pulls the bag', set: { ra: 'pull' }, then: [] },
          { t: 'Let it go.', w: 'Freedom', img: 'stakes/ray.webp', ic: 'hand', sh: 'Let it go', intent: 'lets the money go', set: { ra: 'drop' }, then: [] },
        ] }],
      }), tv: true, watch: () => 'pa', hold: () => ({ pa: 'Ray is choosing', pb: 'Marcus is choosing' }) },
    ] : f.amyjoin ? [
      { set: { roof: 'snipers' } },
      ...at('h_roof_shield'), T('Snipers on the next tower.'), T('A red dot on Ray’s chest.'), S('amy', 'Hold me in front of you.'), S('amy', 'They won’t shoot.'),
      { by: 'pb', peak: true, cue: 'Look at your phone', clock: 8000, choice: [
        { t: 'Hold her in front of you.', w: 'Freedom', img: 'stakes/ray.webp', ic: 'tough', sh: 'Hold her', intent: 'holds her as a shield', set: { shield: 'keep' }, then: [] },
        { t: '“Go to them. Hands up.”', w: 'Amy', img: 'stakes/amy.webp', ic: 'hand', sh: 'Send her away', intent: 'sends her to the police', set: { shield: 'free' }, then: [] },
      ] },
    ] : [
      { set: { roof: 'snipers' } },
      ...at('h_roof_lights'), T('Snipers on the next tower.'), T('A red dot on Marcus’s chest.'), T('The gondola, twenty meters away.'),
      { by: 'pa', peak: true, cue: 'Look at your phone', clock: 8000, choice: [
        { t: 'Hands up.', w: 'Leo', img: 'stakes/leo.webp', ic: 'hand', sh: 'Hands up', intent: 'gives up', set: { snipe: 'up' }, then: [] },
        { t: 'Run for the gondola.', w: 'Freedom', img: 'stakes/ray.webp', ic: 'send', sh: 'Run', intent: 'runs', set: { snipe: 'run' }, then: [] },
      ] },
    ] },
    // cut on the choice: straight to the white review screen (the « tadaa »), one question; what could have been below
    { music: null, ms: 0 }, { stop: 'establishment alarm' }, { stop: 'crowd panic' }, { stop: 'helicopters' }, { stop: 'sirens' },
    { review: { key: 'suite', q: 'Do you want to see what happens next?', yes: 'Yes!', no: 'No', alts: (f) => [
      f.ray !== 'reveal' && ['stakes/ray.webp', 'Ray shows Amy his face.'],   // TODO Justin's pictures in place of these
      f.ray !== 'throw' && ['bg/bag_hit.webp', 'The bag in Amy’s face.'],
      !f.amyjoin && ['bg/amy_face.webp', 'Amy, one of them.'],
      f.guard !== 'shot' && ['bg/wc_shot.webp', 'The guard, shot.'],
      f.roof !== 'stuck' && ['bg/roof_door.webp', 'Ray, stuck in the door.'],
      !(f.roof === 'snipers' && f.amyjoin) && ['bg/roof_shield.webp', 'Amy as a shield.'],
    ] } },
  ], {
    gaze: false, credits: '', title: 'Floor 31', intro: [], preload: 'h_',   // (10/11) its pictures loaded ahead
    seats: ['pa', 'pb'], solo: { pa: 'Marcus', pb: 'Ray' },
    sides: { pa: .3, pb: .7 },   // (09/11) no one placed in the picture: Marcus left, Ray right (the arrow)
    phone: { time: '9:38', bat: { pa: 64, pb: 21 } },
    // (09/11) a player's own pose sheet, one per character (ref/posesheet_<name>.jpg: every cut-out he has in the story, on green,
    // in a grid read row by row): each cell takes the place of that prop. The first one is his face on the pick
    posesheet: {
      pa: { sheet: 'ref/posesheet_marcus.jpg', grid: [4, 3], poses: ['marcus_sit', 'marcus_listen', 'marcus_worried', 'marcus_sit2', 'marcus_top2', 'marcus_phone', 'marcus_stand', 'marcus_elev', 'marcus_elev2', 'marcus_reach'] },
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
      hostage: { name: 'A hostage', color: '#a8a29e' },
    },
    words: { LEDE: (f) => [
      f.p1 === 'lose' ? 'Marcus had everything to lose.' : 'Marcus had everything to win.',
      f.leo === 'money' ? 'He promised Leo money wouldn’t be an issue.' : 'He told Leo they’d figure it out.',
      f.amytext === 'marry' ? 'Ray told Amy he’d marry her.' : 'Ray made fun of Amy’s photo.',
      ({ shot: 'Marcus shot the guard.', drop: 'Marcus made the guard drop his gun.', talk: 'Marcus talked the guard out.' })[f.guard] || '',
      'In the vault, Ray learned Amy was in the bank.',
      f.ray === 'reveal' ? 'He showed her his face, in front of everyone.' : f.ray === 'throw' ? 'He threw a bag in her face.' : '',
      f.back === 'yes' ? 'Then he went back for the bag.' : '',
      f.amyjoin ? 'Amy came with them.' : f.amygo ? 'Amy stayed.' : '',
      f.roof === 'stuck' ? 'On the roof, Ray’s bag got caught in the door.' : f.roof === 'snipers' ? 'On the roof, the snipers.' : '',
    ].filter(Boolean).join(' ') },
  });
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), d_heist: story };
})();
