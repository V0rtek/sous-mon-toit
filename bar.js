// Last call — 2 players, a thriller, in English. Justin (pa) and Brooke (pb), roommates, + Cam. The bar, then the house
// out of town, then the woods. When they're apart each player plays HIS scene on his own phone at the same time, without
// seeing the other's (split). Texts go from one scene to the other. Decors = rectangles only (mock-up, pictures later).
// Writing rules learned from Justin's feedback: Claude Doc « Techniques d'écriture · épisodes » · assets: « Assets à faire »

const sms = (from, to, text) => ({ sms: { from, to, text } });

// poses the sheets do not have yet -> the one they play as meanwhile; a new sheet replaces them without touching the story
window.POSE_FALLBACK = {
  drunk_happy: 'explaining', drunk_talk: 'explaining', drunk_listen: 'listen', drunk_flirt: 'explaining', drunk_sad: 'holding',
  pee: 'holding', pee_relief: 'holding', pee_look: 'holding', offer: 'explaining', shush: 'holding',
  amused: 'thinking', tipsy_laugh: 'explaining', awkward: 'holding', flirty: 'thinking',
};
// a talking pose -> the pose its owner falls back to while someone else talks
window.POSE_REST = { drunk_talk: 'drunk_listen', drunk_happy: 'drunk_listen', drunk_flirt: 'drunk_listen', talk: 'listen' };
// the stranger: from 2 sheets (23/10) — from behind at the urinal, the tie he fixes looking over his shoulder, hands
// joined (calm, then cold), open hands (the deal); he has no "shush" yet: the tie plays it
FACE.suit = { pee: 'f', adjust: 'l', listen: 'r', offer: 'r', angry: 'r' };
GALLERY.push({ sprite: 'suit', name: 'Stranger', src: 'perso_suit', ref: ['suit_fiche', 'suit_negociation'] });
// Brooke: 2 sheets from his photo (23/10): the bar one, then the bathroom one (which also redid his happy and sad,
// subtler); what he doesn't have yet plays with his closest pose
FACE.brooke = { drunk_listen: 'r', drunk_talk: 'r', drunk_happy: 'r', drunk_sad: 'r', drunk_point: 'r', texting: 'f', thinking: 'r',
  pee: 'f', pee_relief: 'f', pee_look: 'r', drunk_smile: 'r', drunk_joke: 'r', drunk_letdown: 'r', nervous: 'r', sit_fire: 'r', shoulder_hit: 'r' };
// Justin: his new sheet (bar, 23/10) is the only one he plays with here — never the old urban sheets
FACE.justin_bar = { drunk_listen: 'r', drunk_talk: 'r', drunk_happy: 'r', drunk_sad: 'r', drunk_flirt: 'r', texting: 'r' };
// the house's poses (sheets to come, 23/10) play meanwhile as the closest pose each one has
window.POSE_ALIAS = {
  brooke: {
    listen: 'drunk_listen', explaining: 'drunk_talk', holding: 'drunk_sad', angry: 'drunk_talk', surprised: 'thinking',
    drunk_flirt: 'drunk_point', phone_shock: 'texting',
    scared: 'thinking', pleading: 'drunk_talk', punch: 'shoulder_hit', confess: 'drunk_sad',
  },
  justin_bar: {
    listen: 'drunk_listen', explaining: 'drunk_talk', holding: 'drunk_sad', angry: 'drunk_talk', surprised: 'drunk_listen',
    thinking: 'drunk_listen', drunk_point: 'drunk_talk', phone_shock: 'texting',
    fake_smile: 'drunk_happy', shocked: 'drunk_listen', knock: 'drunk_talk', wine: 'drunk_listen', sit_fire: 'drunk_sad', sit_hurt: 'drunk_sad',
  },
  cam: { holding: 'worried', surprised: 'awkward', angry: 'worried', amused: 'tipsy_laugh',   // her own smile (a laugh behind her hand); her "amused" sheet pose looked at the camera
    wine: 'sip', dizzy: 'awkward', scared: 'worried', sit_fire: 'worried', cold_stare: 'thinking' },
  suit: { shush: 'adjust', explaining: 'offer', holding: 'listen', surprised: 'listen', thinking: 'listen', pee_talk: 'pee',
    tray: 'offer', balcony: 'listen', envelope: 'offer', texting: 'adjust', smile: 'listen', point: 'angry' },
  // Julian: his own sheet (24/10: listen, talk, smirk, offer, cold, hands up); Diane plays on the silver-haired elf in
  // black (stand-in until her sheet)
  julian: { offer_wine: 'offer', lead: 'offer', cuffs: 'cold', smile: 'smirk', angry: 'cold', explaining: 'talk', holding: 'listen',
    thinking: 'smirk', surprised: 'listen' },
  diane: { talk: 'explaining', take_hand: 'explaining', laugh: 'surprised', look_up: 'thinking', whisper: 'holding' },
};
FACE.julian = { listen: 'r', talk: 'r', smirk: 'r', offer: 'r', cold: 'r', hands_up: 'r' };   // all 6 look to the right
GALLERY.push({ sprite: 'julian', name: 'Julian', src: 'perso_julian', ref: ['julian_fiche'] });
FACE.diane = { listen: 'r', surprised: 'r', thinking: 'r', explaining: 'r', angry: 'r', holding: 'r' };
// Cam: her own sheets (23/10), in place of Ruby's. She looked like she was always flirting: the neutral sheet (listen,
// explaining, thinking, worried, amused, sip) is her base; the first one keeps only her laugh, her awkward and her flirt
FACE.cam = { listen: 'r', explaining: 'r', thinking: 'r', worried: 'r', sip: 'r', tipsy_laugh: 'r', awkward: 'r', flirty: 'l' };
// the gallery shows the new Justin (the old sheet only plays in the older stories)
GALLERY[GALLERY.findIndex((g) => g.sprite === 'justin')] = { sprite: 'justin_bar', name: 'Justin', src: 'perso_justin', ref: ['justin_bar'] };
GALLERY.splice(1, 0, { sprite: 'brooke', name: 'Brooke', src: 'perso_brooke', ref: ['brooke_bar', 'brooke_toilettes'] },
  { sprite: 'cam', name: 'Cam', src: 'perso_cam', ref: ['cam_neutral', 'cam_bar'] });

// ---------- decors, rectangles only (decor px) ----------
const R = (x, y, w, h, color, more) => ({ x, y, w, h, color, ...more });
// the bar, seen from behind the counter: the room behind them, the bathroom corridor on the right
const BAR_BACK = [
  R(0, 0, 1920, 1440, '#241a1d'),
  R(0, 0, 1920, 90, '#150f11'),
  R(0, 690, 1920, 750, '#2e1f1a'), R(0, 684, 1920, 10, '#4a3022'),
  // big window on the street, lamp posts outside
  R(600, 230, 640, 330, '#0b1322', { line: '14px solid #3a2a22' }),
  R(612, 470, 616, 78, '#121c2e'),
  R(700, 300, 16, 16, '#ffd27a', { r: 8, glow: '0 0 20px 7px rgba(255,210,122,.55)' }),
  R(1010, 280, 16, 16, '#ffd27a', { r: 8, glow: '0 0 20px 7px rgba(255,210,122,.55)' }),
  R(1150, 320, 12, 12, '#ff9b6a', { r: 6, glow: '0 0 16px 5px rgba(255,155,106,.5)' }),
  // booth + neon, left
  R(60, 560, 480, 160, '#5a1f2a', { r: 22 }), R(60, 560, 480, 14, '#6d2733', { r: 7 }),
  R(130, 700, 340, 24, '#1b120d', { r: 4 }),
  R(120, 230, 400, 140, 'transparent', { r: 70, line: '9px solid #ff5fa8', glow: '0 0 34px 6px rgba(255,95,168,.5), inset 0 0 26px 2px rgba(255,95,168,.35)' }),
  // pendant lamps
  ...[400, 1010, 1440].flatMap((x) => [
    R(x - 2, 0, 4, 160, '#0a0708'),
    R(x - 42, 160, 84, 46, '#2b2b2b', { r: '42px 42px 6px 6px' }),
    R(x - 26, 200, 52, 14, '#ffcf8a', { r: 7, glow: '0 0 60px 26px rgba(255,190,110,.4)' }),
  ]),
  // corridor to the bathroom
  R(1640, 380, 240, 540, '#0c090a'), R(1630, 368, 260, 14, '#4a3022'),
  R(1700, 392, 120, 8, '#ffe2b0', { glow: '0 0 30px 10px rgba(255,226,176,.35)' }),
  R(1705, 296, 110, 50, '#e9e6df', { r: 6 }), R(1736, 306, 14, 30, '#222', { r: 4 }), R(1770, 306, 14, 30, '#222', { r: 4 }),
];
// the counter in front of them (hip height), their drinks on it
const TOP = 866;
const shot = (x) => R(x, TOP - 38, 26, 40, 'rgba(255,255,255,.22)', { r: '3px 3px 6px 6px', line: '2px solid rgba(255,255,255,.45)' });
const BAR_FRONT = [
  R(-10, TOP, 1940, 30, '#a8774c', { r: 4 }), R(0, TOP + 30, 1920, 12, '#5c3b25'), R(0, TOP + 42, 1920, 400, '#33201a'),
  ...[60, 380, 700, 1020, 1340, 1660].map((x) => R(x, TOP + 66, 260, 360, '#3b261e', { r: 10, line: '4px solid #2a1912' })),
  // empty shots in front of the guys (their red cups are in their hands) · the bill
  shot(810), shot(846),
  R(1100, TOP - 12, 74, 12, '#111', { r: 2 }),
  shot(1200), shot(1236),
];
// the bathroom: tiles, 3 urinals, mirror + sink on the left, the emergency exit on the right
const TILE = 64;
const WC_BACK = [
  R(0, 0, 1920, 240, '#56645f'), R(0, 240, 1920, 860, '#d6ded9'), R(0, 232, 1920, 10, '#a9b4ae'),
  ...Array.from({ length: 14 }, (_, i) => R(0, 240 + (i + 1) * TILE, 1920, 3, '#bcc7c1')),
  ...Array.from({ length: 30 }, (_, i) => R((i + 1) * TILE, 240, 3, 860, '#bcc7c1')),
  R(0, 1100, 1920, 340, '#39423f'),
  ...Array.from({ length: 4 }, (_, i) => R(0, 1100 + (i + 1) * 80, 1920, 3, '#2f3735')),
  R(540, 104, 840, 14, '#9aa5a1'), R(560, 116, 800, 24, '#f6fbff', { r: 12, glow: '0 0 90px 34px rgba(215,236,255,.5)' }),
  R(150, 380, 360, 420, '#a9c1c9', { line: '14px solid #6d7a7a' }), R(200, 420, 40, 300, 'rgba(255,255,255,.35)'),
  R(310, 790, 40, 44, '#b0b6b8', { r: 6 }), R(170, 830, 320, 70, '#f2f2ef', { r: '8px 8px 40px 40px' }),
  ...[860, 1130, 1400].flatMap((cx) => [
    R(cx - 6, 600, 12, 170, '#b7bdbf'), R(cx - 22, 592, 44, 22, '#d9dddd', { r: 6 }),
    R(cx - 72, 760, 144, 250, '#fbfbf8', { r: '22px 22px 64px 64px', glow: '0 8px 0 rgba(0,0,0,.08)' }),
    R(cx - 50, 800, 100, 170, '#e6e9e4', { r: '16px 16px 46px 46px' }),
  ]),
  R(1640, 450, 230, 650, '#56463b', { r: 4 }), R(1670, 770, 170, 16, '#b8b8b0', { r: 8 }),
  R(1695, 385, 120, 44, '#16a34a', { r: 6, glow: '0 0 24px 6px rgba(22,163,74,.5)' }),
];
const WC_FRONT = [R(1030, 720, 26, 420, '#7f8a87', { r: 6 })];   // the divider between their two urinals
// the street outside the bar: the bar's big window on the left (Justin and Cam inside, small, behind the glass),
// the stranger's black car on the right, engine running
const STREET_BACK = [
  R(0, 0, 1920, 1440, '#0b0e16'),
  R(120, 200, 1060, 960, '#3a2420'),
  ...Array.from({ length: 11 }, (_, i) => R(120, 240 + i * 84, 1060, 4, '#2e1c19')),
  R(300, 420, 640, 460, '#7a4f35'), R(300, 420, 640, 120, '#5a3a29'),
  R(380, 450, 140, 50, 'transparent', { r: 25, line: '6px solid #ff5fa8', glow: '0 0 18px 4px rgba(255,95,168,.5)' }),
  R(560, 420, 4, 60, '#0a0708'), R(530, 478, 64, 20, '#ffcf8a', { r: '32px 32px 4px 4px', glow: '0 0 40px 16px rgba(255,190,110,.45)' }),
  R(1780, 260, 16, 940, '#1b1d22'), R(1720, 250, 130, 26, '#2a2c33', { r: 8 }),
  R(1740, 274, 90, 12, '#fff1c9', { r: 6, glow: '0 0 120px 50px rgba(255,236,190,.25)' }),
  R(0, 1150, 1920, 60, '#3b3f46'), R(0, 1210, 1920, 230, '#1a1d24'),
  ...Array.from({ length: 6 }, (_, i) => R(60 + i * 330, 1330, 160, 10, '#c9b25a')),
  // the car
  R(1240, 960, 660, 200, '#0d0d10', { r: '70px 110px 22px 22px' }), R(1330, 890, 420, 110, '#0d0d10', { r: '60px 80px 0 0' }),
  R(1360, 910, 170, 80, '#1d2633', { r: '40px 10px 0 0' }), R(1545, 910, 170, 80, '#1d2633', { r: '10px 50px 0 0' }),
  R(1850, 1040, 50, 26, '#fff6d0', { r: 8, glow: '0 0 60px 20px rgba(255,246,208,.45)' }),
  R(1240, 1040, 26, 26, '#ff2d2d', { r: 6, glow: '0 0 30px 10px rgba(255,45,45,.4)' }),
  R(1330, 1100, 120, 120, '#050506', { r: 60 }), R(1720, 1100, 120, 120, '#050506', { r: 60 }),
];
const STREET_FRONT = [
  R(300, 800, 640, 80, '#5c3b25'), R(300, 794, 640, 10, '#a8774c'),
  R(300, 420, 640, 460, 'rgba(150,180,215,.14)'),
  R(292, 412, 656, 476, 'transparent', { line: '16px solid #1c120f' }), R(612, 412, 14, 476, '#1c120f'),
];

// the house, 40 min out of town: a salon with a chandelier, tall windows, the stairs up to a balcony on the right; guests
// in shadow, and the ones going up the stairs all hold a glass of red (the clue nobody explains)
const guest = (x, y, s, glass) => [
  R(x, y, 60 * s, 170 * s, 'rgba(6,6,9,.78)', { r: `${30 * s}px ${30 * s}px 6px 6px` }),
  R(x + 12 * s, y - 42 * s, 36 * s, 40 * s, 'rgba(6,6,9,.78)', { r: '50%' }),
  ...(glass ? [R(x + 52 * s, y + 46 * s, 9 * s, 14 * s, glass, { r: 2 })] : []),
];
const RED = '#a3122a', WHITE = '#efe6b8';
const HOUSE_BACK = [
  R(0, 0, 1920, 1240, '#17181d'),
  R(0, 620, 1920, 300, '#1f1e24'), ...[0, 320, 640, 960, 1280].map((x) => R(x + 30, 650, 260, 230, 'transparent', { line: '4px solid #2c2a32' })),
  R(0, 900, 1920, 340, '#33241c'), ...Array.from({ length: 5 }, (_, i) => R(0, 940 + i * 60, 1920, 3, '#2a1d16')),
  // tall windows, the night outside
  ...[110, 400].flatMap((x) => [R(x, 150, 220, 470, '#0a1120', { line: '12px solid #2c2a32' }), R(x + 104, 150, 12, 470, '#2c2a32')]),
  R(250, 220, 26, 26, '#dfe8ff', { r: 13, glow: '0 0 30px 10px rgba(200,215,255,.35)' }),
  // a painting, gold frame
  R(760, 230, 380, 260, '#3d1218', { line: '14px solid #b8913f' }), R(820, 300, 260, 120, '#5a1c22', { r: '50%' }),
  // the chandelier
  R(958, 0, 4, 100, '#0a0708'), R(860, 100, 200, 46, '#c9a24b', { r: '10px 10px 60px 60px' }),
  ...[880, 930, 980, 1030].map((x) => R(x, 92, 10, 14, '#fff3cf', { r: 5, glow: '0 0 40px 16px rgba(255,220,150,.35)' })),
  // guests in shadow, red and white glasses
  ...guest(620, 720, 1, WHITE), ...guest(690, 726, 0.95, null), ...guest(1120, 715, 1, RED), ...guest(1185, 720, 1, RED),
  // the stairs: steps rising to the right, a red runner, the balcony on top
  ...Array.from({ length: 10 }, (_, i) => R(1360 + i * 52, 900 - (i + 1) * 50, 560 - i * 52, 50, '#2b1e17', { line: '2px solid #1c130e' })),
  ...Array.from({ length: 10 }, (_, i) => R(1400 + i * 52, 900 - (i + 1) * 50, 60, 50, '#7a1622')),
  R(1880 - 400, 380, 440, 26, '#3b2a20'), ...Array.from({ length: 9 }, (_, i) => R(1500 + i * 48, 300, 8, 80, '#3b2a20')), R(1480, 292, 440, 12, '#4a3428'),
  // two going up, both holding red
  ...guest(1585, 586, 0.62, RED), ...guest(1640, 560, 0.6, RED),
  // the front door on the left, brass handle
  R(0, 360, 70, 540, '#3b2416'), R(52, 640, 10, 30, '#c9a24b', { r: 4 }),
];
SCENES.house = {
  size: [1920, 1240], back: HOUSE_BACK, ambience: 'dark',
  spots: { diane: [470, 1170, 680], pa: [760, 1170, 690], pb: [1000, 1170, 690], cam: [1240, 1170, 690], julian: [1470, 1170, 700],
    suit: [1700, 380, 290] },
  face: { diane: 'r', pa: 'r', pb: 'l', cam: 'l', julian: 'l', suit: 'l' },
};
// the same salon, at the door: the stranger takes the phones; Brooke, across the room by the stairs, sees them come in
SCENES.house_door = {
  size: [1920, 1240], back: HOUSE_BACK, ambience: 'dark',
  spots: { suit: [300, 1170, 700], pa: [620, 1170, 690], cam: [840, 1170, 680], pb: [1400, 960, 470] },
  face: { suit: 'r', pa: 'l', cam: 'l', pb: 'l' },
};
// upstairs: the stranger's office, a wall of screens (rooms, beds, people), the desk and the envelope on it
const tv = (x, y) => [
  R(x, y, 250, 150, '#22364c', { line: '7px solid #08090b', glow: '0 0 34px 4px rgba(90,150,220,.22)' }),
  R(x + 26, y + 92, 198, 38, '#3a4f69', { r: 6 }), R(x + 92, y + 44, 26, 58, '#0c131d', { r: '13px 13px 4px 4px' }),
  R(x + 126, y + 50, 24, 52, '#0c131d', { r: '12px 12px 4px 4px' }), R(x + 222, y + 12, 10, 10, '#ff2d2d', { r: 5 }),
];
SCENES.office = {
  size: [1920, 1240], ambience: 'dark',
  back: [
    R(0, 0, 1920, 1240, '#111216'), R(0, 940, 1920, 300, '#1b1511'),
    ...[[120, 170], [400, 170], [680, 170], [120, 350], [400, 350], [680, 350], [120, 530], [400, 530], [680, 530]].flatMap(([x, y]) => tv(x, y)),
    R(1560, 170, 260, 430, '#0a1120', { line: '12px solid #2a2a2e' }), R(1684, 170, 12, 430, '#2a2a2e'),
    R(1700, 760, 70, 90, '#2b2b2b', { r: '35px 35px 4px 4px' }), R(1712, 840, 46, 10, '#ffd79a', { glow: '0 0 70px 30px rgba(255,200,120,.3)' }),
  ],
  front: [
    R(1150, 880, 760, 34, '#4a3324', { r: 4 }), R(1170, 914, 720, 330, '#33231a'),
    R(1330, 858, 120, 26, '#e7dbbd', { r: 3 }), R(1336, 864, 108, 4, '#c9b98f'),   // the envelope
  ],
  spots: { pa: [330, 1170, 690], pb: [760, 1170, 690], suit: [1500, 1170, 700] },   // Justin, if he finds the door
  face: { pa: 'r', pb: 'r', suit: 'l' },
};
// the upstairs corridor: three doors, a red light over the third
SCENES.hallway = {
  size: [1920, 1240], ambience: 'dark',
  back: [
    R(0, 0, 1920, 1240, '#26131a'), R(0, 640, 1920, 320, '#2e1820'), R(0, 960, 1920, 280, '#2a1414'), R(0, 1010, 1920, 160, '#5e1620'),
    ...[220, 880, 1520].flatMap((x) => [R(x, 370, 200, 590, '#2a1a12', { line: '8px solid #1a0f0a' }), R(x + 166, 660, 12, 30, '#c9a24b', { r: 4 })]),
    ...[560, 1220].map((x) => R(x, 420, 40, 60, '#ffd08a', { r: '20px 20px 4px 4px', glow: '0 0 50px 20px rgba(255,190,110,.3)' })),
    R(1580, 316, 80, 24, '#ff2d2d', { r: 8, glow: '0 0 60px 22px rgba(255,45,45,.55)' }),
  ],
  spots: { suit: [300, 1170, 700], pa: [980, 1170, 690], pb: [1200, 1170, 690], julian: [1620, 1170, 700] },
  face: { suit: 'r', pa: 'r', pb: 'r', julian: 'l' },
};
// behind the red door: red light, the bed, champagne, and a camera on a tripod, recording
SCENES.redroom = {
  size: [1920, 1240], ambience: 'dark',
  back: [
    R(0, 0, 1920, 1240, '#2a0b10'), R(0, 0, 1920, 1240, 'rgba(255,30,50,.10)'), R(0, 960, 1920, 280, '#1c0709'),
    R(900, 300, 700, 330, '#3a0f15', { line: '10px solid #220609' }),
    R(1720, 640, 14, 340, '#111'), R(1690, 600, 110, 64, '#151515', { r: 8 }), R(1776, 612, 14, 14, '#ff2d2d', { r: 7, glow: '0 0 16px 6px rgba(255,45,45,.7)' }),
    R(240, 760, 90, 200, '#0f0f10', { r: 10 }), R(262, 700, 46, 80, '#1d3a2a', { r: '20px 20px 6px 6px' }),
  ],
  front: [R(820, 820, 860, 160, '#7a1622', { r: 16 }), R(820, 790, 860, 50, '#e9dfe0', { r: 16 }), R(800, 960, 900, 40, '#220609')],
  spots: { pa: [360, 1180, 690], pb: [590, 1180, 690], cam: [1250, 1180, 680], julian: [1600, 1180, 700] },
  face: { pa: 'r', pb: 'r', cam: 'l', julian: 'l' },
};
// the woods behind the house: no phones, no car, Brooke's lighter; the fire between the boys and Cam
SCENES.campfire = {
  size: [1920, 1240], ambience: 'campfire',
  back: [
    R(0, 0, 1920, 1240, '#04060c'),
    ...[[140, 80], [420, 150], [760, 60], [1120, 120], [1480, 70], [1780, 160], [300, 260], [1640, 300]].map(([x, y]) => R(x, y, 4, 4, '#cfd8ff', { r: 2 })),
    ...[[40, 70], [260, 50], [1600, 80], [1800, 60], [520, 40], [1380, 46]].map(([x, w]) => R(x, 0, w, 1000, '#0b0d0b')),
    R(0, 980, 1920, 260, '#0c0e0a'),
    R(560, 640, 900, 560, 'rgba(255,130,50,.13)', { r: '50%', blur: 50 }),
  ],
  front: [
    R(920, 1110, 240, 30, '#3a2414', { r: 14 }), R(950, 1090, 190, 26, '#4a2e18', { r: 13 }),
    R(990, 980, 60, 120, '#ff8a2a', { r: '50% 50% 20% 20%', glow: '0 0 90px 40px rgba(255,140,50,.45)' }),
    R(1030, 1010, 50, 90, '#ffb03a', { r: '50% 50% 20% 20%' }), R(1004, 1030, 34, 62, '#ffe08a', { r: '50% 50% 20% 20%' }),
  ],
  spots: { pb: [500, 1170, 650], pa: [740, 1170, 650], cam: [1400, 1170, 640] },
  face: { pb: 'r', pa: 'r', cam: 'l' },
};
SCENES.bar = {
  size: [1920, 1240], back: BAR_BACK, front: BAR_FRONT, ambience: 'bar',
  spots: { pa: [770, 1150, 690], cam: [1010, 1150, 690], pb: [1250, 1150, 690] },
  face: { pa: 'r', cam: 'l', pb: 'l' },
};
SCENES.wc = {
  size: [1920, 1440], back: WC_BACK, front: WC_FRONT, ambience: 'bathroom',
  spots: { pb: [900, 1170, 690], suit: [1190, 1170, 700] },
  face: { pb: 'r', suit: 'l' },
};
SCENES.street = {
  size: [1920, 1440], back: STREET_BACK, front: STREET_FRONT, ambience: 'dark',
  spots: { pa: [430, 880, 300], cam: [545, 880, 300], pb: [1040, 1250, 700], suit: [1400, 1250, 720] },
  face: { pa: 'r', cam: 'l', pb: 'l', suit: 'l' },
};

// ---------- the story ----------
// the camera talks like a film: a single on whoever speaks or takes the hit, a two-shot for the exchange, and
// silences (hush: no bubble, the shot holds) after what hurts or what's new
const one = (who) => cam('one', who);
const two = (a, b) => cam('two', a, b);
const hush = (ms = 900) => ({ hush: ms });

// split: Justin stays at the counter with Cam — a real conversation, as long as Brooke's scene: what Brooke meant
// (tension), why Justin keeps paying for him (stakes), and the guy in a suit asking about Brooke (curiosity, paid off
// when Brooke's text arrives)
const counter = [
  { slate: 'Brooke heads to the bathroom. It’s just you and Cam now.' },
  scene('bar', { pa: 'drunk_listen', cam: 'sip' }),
  two('pa', 'cam'),
  { fade: 'in', ms: 500 },
  hush(1100),   // Brooke's empty spot between them, Cam takes a sip
  one('cam'),
  say('cam', 'thinking', 'What was he gonna say?', { to: 'pa' }),
  one('pa'),
  { by: 'pa', choice: [
    // Cam never says who she prefers: "idk, he's funny" / "still deciding" keeps it open, and opens a door for Justin
    { t: 'Talk about Brooke.', intent: 'his friend', then: [
      say('pa', 'drunk_talk', 'He’s wasted. He won’t remember any of this tomorrow.', { to: 'cam' }),
      one('cam'), say('cam', 'holding', 'Or he’ll remember all of it.', { to: 'pa' }),
      one('pa'), hush(800), say('pa', 'drunk_listen', '…You think he meant it?', { to: 'cam' }),
      one('cam'), hush(700), say('cam', 'amused', 'Idk. He’s funny.', { to: 'pa' }),
      one('pa'),
      { by: 'pa', choice: [
        { t: 'Try your luck.', intent: 'takes the door', set: { tried: true }, then: [
          say('pa', 'drunk_flirt', 'Funny’s not a type.', { to: 'cam' }),
          one('cam'), hush(600), say('cam', 'flirty', 'Oh? And what’s my type?', { to: 'pa' }),
        ] },
        { t: 'Be his wingman.', intent: 'wingman', then: [
          say('pa', 'drunk_happy', 'Funniest guy I know.', { to: 'cam' }),
          one('cam'), hush(700), say('cam', 'thinking', 'Noted.', { to: 'pa' }),
        ] },
      ] },
    ] },
    { t: 'Get to know her.', intent: 'curious', then: [
      say('pa', 'drunk_talk', 'Six years… and I don’t even know where you’re from.', { to: 'cam' }),
      one('cam'), say('cam', 'tipsy_laugh', 'You never asked.', { to: 'pa' }),
      one('pa'), say('pa', 'drunk_happy', 'I’m asking.', { to: 'cam' }),
      one('cam'), hush(700), say('cam', 'amused', 'Sudbury. Tell anyone and you’re dead.', { to: 'pa' }),
    ] },
    { t: 'Ask how she feels.', intent: 'honest', then: [
      say('pa', 'drunk_talk', 'And you? How’d that make you feel?', { to: 'cam' }),
      one('cam'), hush(1000), say('cam', 'awkward', '…Depends who’s saying it.', { to: 'pa' }),
      one('pa'), say('pa', 'drunk_listen', 'And if it’s him?', { to: 'cam' }),
      one('cam'), hush(1000), say('cam', 'thinking', 'Still deciding.', { to: 'pa' }),
      one('pa'),
      { by: 'pa', choice: [
        { t: 'And if it’s me?', intent: 'takes the door', set: { tried: true }, then: [
          say('pa', 'drunk_flirt', 'And if it’s me?', { to: 'cam' }),
          one('cam'), hush(900), say('cam', 'tipsy_laugh', 'Ask me when you’re sober.', { to: 'pa' }),
        ] },
        { t: 'He’s a good guy.', intent: 'wingman', then: [
          say('pa', 'drunk_talk', 'He’s a good guy, Cam.', { to: 'cam' }),
          one('cam'), hush(800), say('cam', 'thinking', 'I know.', { to: 'pa' }),
        ] },
      ] },
    ] },
    { t: 'Flirt.', intent: 'flirt', set: { tried: true }, then: [
      say('pa', 'drunk_happy', 'I would’ve finished the sentence.', { to: 'cam' }),
      one('cam'), say('cam', 'flirty', 'Oh yeah? Go ahead. Finish it.', { to: 'pa' }),
      one('pa'), hush(700), say('pa', 'drunk_flirt', 'You’re just…', { to: 'cam' }),
      two('pa', 'cam'), hush(600), say('cam', 'tipsy_laugh', 'Wow. You two share a brain.', { to: 'pa' }),
    ] },
  ] },
  // Cam turns it on him: the rent
  two('pa', 'cam'), hush(1300),
  one('cam'),
  say('cam', 'thinking', 'Can I ask you something?', { to: 'pa' }),
  one('pa'),
  say('pa', 'drunk_listen', 'Mm.', { to: 'cam' }),
  one('cam'),
  say('cam', 'holding', 'Why do you keep paying his rent?', { to: 'pa' }),
  one('pa'), hush(1000),
  { by: 'pa', choice: [
    { t: 'He’s my brother.', intent: 'loyal', then: [
      say('pa', 'drunk_talk', 'He’s my brother.', { to: 'cam' }),
      one('cam'), say('cam', 'thinking', 'He’s your roommate.', { to: 'pa' }),
      one('pa'), say('pa', 'drunk_happy', 'Same thing at 2 a.m.', { to: 'cam' }),
    ] },
    { t: 'Because no one else will.', intent: 'tired', then: [
      say('pa', 'drunk_sad', 'Because no one else will.', { to: 'cam' }),
      one('cam'), hush(900), say('cam', 'awkward', 'That’s not a reason. That’s a trap.', { to: 'pa' }),
    ] },
    { t: 'I’m done. Monday, he’s on his own.', intent: 'done', set: { done: true }, then: [
      say('pa', 'drunk_talk', 'I’m done. Monday, he’s on his own.', { to: 'cam' }),
      one('cam'), hush(700), say('cam', 'surprised', 'You’ve never said that before.', { to: 'pa' }),
    ] },
  ] },
  // the guy in the suit
  two('pa', 'cam'), hush(1100),
  one('cam'),
  say('cam', 'thinking', 'Did he tell you about the guy?', { to: 'pa' }),
  one('pa'),
  say('pa', 'drunk_listen', 'What guy?', { to: 'cam' }),
  one('cam'),
  say('cam', 'holding', 'Guy in a suit. Came to my work twice this week.', { to: 'pa' }),
  hush(900),
  say('cam', 'holding', 'Asked if I knew Brooke.', { to: 'pa' }),
  one('pa'), hush(1300),
  say('pa', 'surprised', '…What’d you say?', { to: 'cam' }),
  one('cam'), hush(800),
  say('cam', 'awkward', 'That I didn’t.', { to: 'pa' }),
  one('pa'),
  { by: 'pa', choice: [
    { t: 'Why’d you lie?', intent: 'presses', then: [
      say('pa', 'drunk_talk', 'Why’d you lie?', { to: 'cam' }),
      one('cam'), hush(700), say('cam', 'holding', 'Because he knew where I work. I never told him.', { to: 'pa' }),
    ] },
    { t: 'Probably a debt collector.', intent: 'brushes it off', then: [
      say('pa', 'drunk_happy', 'Probably a debt collector. Brooke owes everybody.', { to: 'cam' }),
      one('cam'), say('cam', 'thinking', 'Debt collectors don’t wear Tom Ford.', { to: 'pa' }),
    ] },
    { t: '[Look at the bathroom door]', intent: 'worried', then: [
      { poses: { pa: 'drunk_listen' } }, face({ pa: 'r' }), hush(1400),
      narr('Justin looks at the bathroom door. Nobody comes out.'),
    ] },
  ] },
  // the second visit (pays off at the house, when someone hands her a glass of red)
  two('pa', 'cam'), hush(1000),
  say('cam', 'thinking', 'Second time, he didn’t ask about Brooke.', { to: 'pa' }),
  one('pa'), say('pa', 'drunk_listen', 'What’d he ask?', { to: 'cam' }),
  one('cam'), hush(900), say('cam', 'worried', 'What I drink.', { to: 'pa' }),
  one('pa'), hush(1400), say('pa', 'drunk_talk', '…What do you drink?', { to: 'cam' }),
  one('cam'), hush(800), say('cam', 'sip', 'Red.', { to: 'pa' }),
  hush(1300),
  two('pa', 'cam'), hush(1500),
  say('cam', 'thinking', 'He’s taking forever.', { to: 'pa' }),
  one('pa'),
  { by: 'pa', choice: [
    { t: 'Text him: “where u at?”', intent: 'worried', set: { ping: true }, then: [
      { poses: { pa: 'texting' } }, { check: 'pa' }, sms('pa', 'pb', 'where u at?'), hush(1600),
      { poses: { pa: 'drunk_listen' } }, two('pa', 'cam'), hush(1800),
      { poses: { pa: 'texting' } }, one('pa'), hush(1000),
      say('pa', 'texting', 'He’s not answering.', { to: 'cam' }),
    ] },
    { t: 'Stay with Cam.', intent: 'stays', then: [say('pa', 'drunk_happy', 'He’s a big boy.', { to: 'cam' })] },
  ] },
  // live: as soon as Brooke has decided what to text (or not)
  { waitMark: 'texted' },
  { fn: (f) => justinReads(f) },
];

// split: Brooke in the bathroom, the stranger at the next urinal. They pee and talk, then stop and talk for real
const bathroom = [
  { slate: 'You leave Justin and Cam and head to the bathroom.' },
  scene('wc', { suit: 'pee' }),
  cam('two', 'pb', 'suit'),
  { fade: 'in', ms: 500 },
  { enter: { pb: 'pee' } }, two('pb', 'suit'),
  { sfx: 'zip' }, { wait: 500 }, { sfx: 'pee', loop: true }, hush(1300),   // Brooke pees a little
  { poses: { pb: 'pee_relief' } }, hush(1600),   // then the relief
  { poses: { pb: 'pee_look' } }, hush(2600),   // then he looks at the guy at the next urinal — a long look — and he's the one who starts
  say('pb', 'pee_look', 'Nice suit.', { to: 'suit' }),
  one('suit'), hush(600), say('suit', 'pee', 'Long night?', { to: 'pb' }),
  two('pb', 'suit'),
  { by: 'pb', choice: [
    { t: 'Best night of my life.', intent: 'happy', then: [
      say('pb', 'pee_look', 'Best night of my life, man.', { to: 'suit' }),
      hush(700), say('suit', 'pee', 'Doesn’t sound like it.', { to: 'pb' }),
    ] },
    { t: 'Do I know you?', intent: 'suspicious', then: [
      say('pb', 'pee_look', 'Do I… know you?', { to: 'suit' }),
      one('suit'), hush(1100), say('suit', 'pee', 'No.', { to: 'pb' }),
    ] },
    { t: 'Say nothing.', intent: 'stares at the wall', then: [{ poses: { pb: 'pee' } }, hush(1200), narr('Brooke stares at the wall. Very hard.')] },
  ] },
  // they don't finish together: the suit first (zips, turns, fixes his tie, eyes on Brooke) while Brooke keeps going,
  // then Brooke zips up and turns to him: now they talk for real
  two('pb', 'suit'), hush(900),
  { sfx: 'zip' }, { poses: { suit: 'adjust' } }, face({ suit: 'l' }), hush(1700),
  { stop: 'pee' }, { sfx: 'zip' }, { wait: 500 },
  { poses: { pb: 'drunk_listen' } }, face({ pb: 'r' }),
  hush(900),
  // the offer: Brooke pulls it out of him one question at a time (a conversation between two people, not a pitch)
  one('suit'),
  say('suit', 'listen', 'I’ve got a job for you.', { to: 'pb' }),
  one('pb'), hush(500),
  say('pb', 'drunk_talk', 'Huh?', { to: 'suit' }),
  one('suit'),
  say('suit', 'offer', 'Five thousand. Cash. One night.', { to: 'pb' }),
  one('pb'), hush(1400),   // it lands
  { when: (f) => f.rent === 'universe', then: [think('pb', '…The universe provides.')] },
  { by: 'pb', choice: [
    { t: '[Laugh]', intent: 'laughs', then: [
      say('pb', 'drunk_happy', 'Hah. Hahaha. Okay.', { to: 'suit' }),
      one('suit'), hush(1300),   // he doesn't laugh
      one('pb'), say('pb', 'drunk_listen', '…Oh, you’re serious.', { to: 'suit' }),
    ] },
    { t: 'You’re shady.', intent: 'shady', then: [
      say('pb', 'drunk_talk', 'Man… you a shady ass bitch.', { to: 'suit' }),
      one('suit'), hush(800), say('suit', 'listen', 'Probably.', { to: 'pb' }),
    ] },
    { t: 'Keep going.', intent: 'listening', then: [
      say('pb', 'drunk_listen', 'I’m listening.', { to: 'suit' }),
    ] },
  ] },
  one('pb'), say('pb', 'drunk_talk', 'Doing what?', { to: 'suit' }),
  one('suit'), hush(600), say('suit', 'listen', 'A party.', { to: 'pb' }),
  one('pb'), hush(800), say('pb', 'drunk_listen', '…A party.', { to: 'suit' }),
  one('suit'), say('suit', 'offer', 'Big house. Out of town. People with money.', { to: 'pb' }),
  one('pb'), say('pb', 'drunk_talk', 'And I do what? Dance?', { to: 'suit' }),
  one('suit'), hush(700), say('suit', 'listen', 'You talk to people.', { to: 'pb' }),
  one('pb'), hush(1000), say('pb', 'drunk_talk', 'Five K… to talk to people.', { to: 'suit' }),
  two('pb', 'suit'), hush(900),
  say('pb', 'drunk_listen', 'What’s the catch?', { to: 'suit' }),
  one('suit'), hush(1000), say('suit', 'listen', 'One rule.', { to: 'pb' }),
  hush(1200),
  say('suit', 'shush', 'Don’t drink the red wine.', { to: 'pb' }),
  one('pb'), hush(1100), say('pb', 'drunk_listen', 'What’s wrong with the red wine?', { to: 'suit' }),
  one('suit'), hush(800), say('suit', 'listen', 'Nothing. If you don’t drink it.', { to: 'pb' }),
  // the wound: he knows who pays Brooke's rent, and presses on it. Brooke hears Justin's words from the counter: he
  // doesn't say yes for the money, he says yes to stop being the one who owes
  two('pb', 'suit'), hush(900),
  say('suit', 'listen', 'Rent’s due Monday, Brooke.', { to: 'pb' }),
  one('pb'), hush(1400),   // he never said his name
  say('pb', 'surprised', '…How do you know my name?', { to: 'suit' }),
  one('suit'), say('suit', 'listen', 'Your roommate covered June. And July.', { to: 'pb' }),
  one('pb'), hush(1700),   // that one hurts
  one('suit'), say('suit', 'offer', 'Must get old. Being the one who owes.', { to: 'pb' }),
  one('pb'), { poses: { pb: 'drunk_sad' } }, hush(1900),
  think('pb', '“I’m not covering you again.”'),
  hush(700),
  { by: 'pb', choice: [
    { t: '“I could pay him back.”', intent: 'pride', set: { why: 'pride' }, then: [
      say('pb', 'drunk_sad', 'I could pay him back.', { to: 'suit' }),
      hush(900), say('pb', 'drunk_sad', 'All of it.', { to: 'suit' }),
      one('suit'), hush(500), say('suit', 'listen', 'All of it.', { to: 'pb' }),
    ] },
    { t: '“Why me?”', intent: 'asks why', set: { why: 'why' }, then: [
      say('pb', 'drunk_talk', 'Why me?', { to: 'suit' }),
      one('suit'), hush(900), say('suit', 'listen', 'Because you’ll say yes.', { to: 'pb' }),
    ] },
    { t: '“I’m in.”', intent: 'in', set: { why: 'in' }, then: [
      say('pb', 'drunk_listen', 'I’m in.', { to: 'suit' }),
      one('suit'), hush(600), say('suit', 'listen', 'I know.', { to: 'pb' }),
    ] },
  ] },
  // the last piece, the one that doesn't fit
  one('suit'), hush(800), say('suit', 'listen', 'Bring your friends.', { to: 'pb' }),
  one('pb'), say('pb', 'drunk_talk', 'Justin?', { to: 'suit' }),
  one('suit'), hush(1000), say('suit', 'listen', 'And the girl.', { to: 'pb' }),
  one('pb'), hush(1300), say('pb', 'surprised', '…Cam? What’s Cam got to do with—', { to: 'suit' }),
  one('suit'), say('suit', 'shush', 'Tell them it’s a party. Nothing else.', { to: 'pb' }),
  one('pb'), hush(900), { poses: { pb: 'texting' } }, { check: 'pb' },
  { by: 'pb', choice: [
    { t: 'Text Justin: “party at a mansion. open bar. bring cam 🔥”', intent: 'brings them', set: { sms: 'invite' }, then: [
      sms('pb', 'pa', 'party at a mansion. open bar. bring cam 🔥'),
      one('suit'), hush(600), say('suit', 'listen', 'Good.', { to: 'pb' }),
    ] },
    { t: 'Text Justin: “some guy’s paying me 5k to go to a party. weird af. come?”', intent: 'half the truth', set: { sms: 'half' }, then: [
      sms('pb', 'pa', 'some guy’s paying me 5k to go to a party. weird af. come?'),
      one('suit'), hush(900), say('suit', 'angry', 'I said nothing else.', { to: 'pb' }),
    ] },
    { t: 'Text nobody. Go alone.', intent: 'keeps them out', set: { sms: 'none' }, then: [
      { poses: { pb: 'drunk_listen' } }, hush(1000),
      one('suit'), say('suit', 'listen', 'Your call.', { to: 'pb' }),
      hush(700), narr('The stranger takes out his own phone and types something.'),
    ] },
  ] },
  { mark: 'texted' },
  two('pb', 'suit'),
  narr('Brooke follows the stranger out the emergency exit.'),
  // outside: the car, the phone, and through the window Justin and Cam, still talking (seen from afar: no words)
  { fade: 'out', ms: 500 },
  scene('street', { pa: 'drunk_listen', cam: 'listen', pb: 'drunk_listen', suit: 'listen' }),
  { cam: 'wide', at: 1260 },
  { fade: 'in', ms: 700 },
  hush(1200),   // the engine running
  narr('Outside. A black car, engine running.'),
  two('pb', 'suit'), hush(700),
  say('suit', 'listen', 'Phone.', { to: 'pb' }),
  one('pb'),
  say('pb', 'drunk_talk', 'What?', { to: 'suit' }),
  one('suit'),
  say('suit', 'offer', 'Your phone. You get it back after.', { to: 'pb' }),
  one('pb'), hush(800),
  { by: 'pb', choice: [
    { t: 'Hand it over.', intent: 'gives it', set: { phone: 'given' }, then: [narr('Brooke hands it over. The screen is still lit.')] },
    { t: 'Why?', intent: 'asks', set: { phone: 'given' }, then: [
      say('pb', 'drunk_talk', 'Why?', { to: 'suit' }),
      one('suit'), hush(700), say('suit', 'listen', 'Because the job starts now.', { to: 'pb' }),
      narr('Brooke hands it over.'),
    ] },
    { t: 'Keep it.', intent: 'keeps it', set: { phone: 'kept' }, then: [
      say('pb', 'drunk_talk', 'Nah. Phone stays with me.', { to: 'suit' }),
      one('suit'), hush(900), say('suit', 'angry', 'Then keep it off.', { to: 'pb' }),
    ] },
  ] },
  // he turns his back to the suit and looks at the bar's window: Justin and Cam inside, still talking
  face({ pb: 'l' }), { cam: 'wide', at: 775 }, hush(1800),
  think('pb', '…He’s right there.'),
  two('pb', 'suit'), hush(600),
  say('suit', 'shush', 'Get in.', { to: 'pb' }),
  hush(700),
  narr('Brooke gets in the car.'),
];

// Justin at the counter, live (no time skip): Brooke's text buzzed his phone the moment Brooke sent it, or nothing
// came. Nobody asks him to check: he takes his phone out, reads it, and only then chooses
// ...then Justin decides whether they go; Cam goes either way (all roads lead to the house, not with the same grudges)
const justinReads = (f) => [
  ...(f.sms === 'none' ? [
    one('cam'), say('cam', 'surprised', 'Where’s Brooke?', { to: 'pa' }),
    one('pa'), { check: 'pa' }, { poses: { pa: 'phone_shock' } }, hush(1100),
    narr('No message. Nothing.'),
    // the stranger's other way in: the text comes to Cam
    two('pa', 'cam'), hush(900), narr('Cam’s phone buzzes.'),
    one('cam'), hush(800), say('cam', 'worried', '“Brooke’s at a party. He asked for you.”', { to: 'pa' }),
    hush(600), say('cam', 'thinking', 'Unknown number. And an address.', { to: 'pa' }),
  ] : [
    two('pa', 'cam'), { poses: { pa: 'texting' } }, hush(900),   // his phone, Brooke's name on it
    say('pa', 'texting', 'Omg. What’s up with Brooke?', { to: 'cam' }),
    one('pa'), { check: 'pa' }, hush(600),   // he reads it
    ...(f.sms === 'invite' ? [
      one('cam'), say('cam', 'thinking', 'A mansion? Brooke doesn’t know anyone with a mansion.', { to: 'pa' }),
      hush(900), say('cam', 'worried', '…And why me?', { to: 'pa' }),
    ] : [
      one('cam'), say('cam', 'surprised', 'Five thousand dollars? To go to a party?', { to: 'pa' }),
    ]),
  ]),
  one('pa'), { poses: { pa: 'phone_shock' } }, hush(1200),
  say('pa', 'phone_shock', '…The suit.', { to: 'cam' }),
  { by: 'pa', choice: [
    { t: 'We’re going.', intent: 'goes', set: { going: 'justin' }, then: [
      say('pa', 'drunk_talk', 'We’re going. Get your coat.', { to: 'cam' }),
      one('cam'), hush(500), say('cam', 'listen', 'Already got it.', { to: 'pa' }),
    ] },
    { t: 'Let him go.', intent: 'lets him go', set: { going: 'cam' }, then: [
      say('pa', 'drunk_sad', 'He’s a grown man, Cam. Let him go.', { to: 'cam' }),
      one('cam'), hush(1000), say('cam', 'thinking', 'Then I’m going.', { to: 'pa' }),
      hush(600), say('cam', 'worried', 'Someone has to bring him home.', { to: 'pa' }),
      one('pa'), hush(1300), say('pa', 'drunk_listen', '…Wait up.', { to: 'cam' }),
    ] },
  ] },
];

// ---------- after the bar: the house ----------
// What's really going on (never said all at once): rich guests pick someone; the house pays someone close to that person
// to bring them and get a glass of red in their hand. Red means "yes, I go upstairs", and the one holding it doesn't
// know. The rooms are filmed. Julian picked Cam (the stranger scouted her at her work), Brooke is the one they paid.
// Each player holds half of it: Brooke knows the rule, Justin saw the stranger circle Cam.

// at the door: phones in pouches; Brooke, across the room, sees them come in
const houseDoor = [
  { slate: 'Forty minutes out of town. A house with every window lit.' },
  scene('house_door', { suit: 'listen', pb: 'drunk_listen' }),
  { cam: 'wide', at: 900 }, { fade: 'in', ms: 900 }, { caption: '2:50 a.m.' }, hush(1400),
  { enter: { pa: 'drunk_listen', cam: 'listen' } }, hush(700),
  two('suit', 'pa'),
  say('suit', 'tray', 'Phones.', { to: 'pa' }),
  one('pa'), hush(500), say('pa', 'drunk_talk', '…What?', { to: 'suit' }),
  one('suit'), say('suit', 'tray', 'You get them back when you leave.', { to: 'pa' }),
  two('pa', 'cam'), hush(800), narr('Cam drops hers in a black pouch. The stranger seals it.'),
  one('pa'),
  { by: 'pa', choice: [
    { t: 'Hand it over.', intent: 'gives it', set: { jphone: 'given' }, then: [
      narr('Justin drops his phone in a pouch.'),
      one('suit'), hush(500), say('suit', 'listen', 'Enjoy the party.', { to: 'pa' }),
    ] },
    { t: '“Left it at the bar.”', intent: 'lies', set: { jphone: 'hid' }, then: [
      say('pa', 'fake_smile', 'Left it at the bar.', { to: 'suit' }),
      one('suit'), hush(1600),   // he looks at him a long time
      say('suit', 'listen', '…Enjoy the party.', { to: 'pa' }),
    ] },
  ] },
];
// together again, in the salon: what Brooke texted decides how he greets them
const houseMeet = (f) => [
  { fade: 'out', ms: 400 }, scene('house', { pa: 'drunk_listen', pb: 'drunk_listen', cam: 'listen' }),
  cam('three', 'pa', 'pb', 'cam'), { fade: 'in', ms: 400 }, hush(600),
  ...(f.sms === 'invite' ? [
    one('pb'), say('pb', 'drunk_smile', 'You came!', { to: 'pa' }),
    one('pa'), say('pa', 'drunk_talk', 'Open bar, huh?', { to: 'pb' }),
    one('cam'), say('cam', 'thinking', 'Whose house is this?', { to: 'pb' }),
    one('pb'), hush(900), say('pb', 'nervous', '…A friend’s.', { to: 'cam' }),
    one('cam'), say('cam', 'tipsy_laugh', 'You don’t have friends with houses.', { to: 'pb' }),
    one('pb'), say('pb', 'drunk_smile', 'I have one now.', { to: 'cam' }),
  ] : f.sms === 'half' ? [
    one('pa'), say('pa', 'drunk_talk', 'Five K. For what?', { to: 'pb' }),
    one('pb'), say('pb', 'drunk_talk', 'Talking to people.', { to: 'pa' }),
    one('pa'), hush(600), say('pa', 'drunk_listen', 'Talking to people.', { to: 'pb' }),
    one('pb'), say('pb', 'drunk_smile', 'I’m a great talker.', { to: 'pa' }),
    one('cam'), say('cam', 'tipsy_laugh', 'You’re a great drinker.', { to: 'pb' }),
    one('pb'), say('pb', 'drunk_point', 'Same skill set.', { to: 'cam' }),
    one('pa'), hush(700), say('pa', 'drunk_talk', 'Brooke.', { to: 'pb' }),
    one('pb'), hush(900), say('pb', 'nervous', '…Later. Okay? Later.', { to: 'pa' }),
  ] : [
    one('pb'), hush(500), say('pb', 'scared', 'What are you doing here?', { to: 'cam' }),
    one('cam'), say('cam', 'thinking', 'You asked for me.', { to: 'pb' }),
    one('pb'), hush(1500), say('pb', 'scared', '…I didn’t.', { to: 'cam' }),
    one('cam'), hush(800), say('cam', 'worried', 'Then who texted me?', { to: 'pb' }),
    one('pb'), hush(1000), narr('Brooke looks up at the balcony.'),
    one('pa'), say('pa', 'drunk_talk', 'Brooke. Who’s the guy?', { to: 'pb' }),
    one('pb'), say('pb', 'nervous', 'Nobody. A job. Let’s just… let’s have a drink.', { to: 'pa' }),
  ]),
  // two guys dressed for a bar in a room full of money
  two('pa', 'pb'), hush(1400),
  say('pb', 'drunk_talk', 'So yeah… I guess we gotta talk to people now.', { to: 'pa' }),
  one('pa'), say('pa', 'drunk_listen', 'I’m wearing a tank top, man.', { to: 'pb' }),
  one('pb'), say('pb', 'drunk_smile', 'Confidence is the outfit.', { to: 'pa' }),
  // Julian
  { enter: { julian: 'listen' } }, two('cam', 'julian'), hush(900),
  say('julian', 'talk', 'You look lost.', { to: 'cam' }),
  one('cam'), say('cam', 'explaining', 'I’m with them.', { to: 'julian' }),
  one('julian'), hush(1000), face({ julian: 'l' }), hush(500),   // he looks at the two of them
  say('julian', 'talk', 'So, lost.', { to: 'cam' }),
  one('cam'), say('cam', 'tipsy_laugh', 'Hah!', { to: 'julian' }),
  one('julian'), say('julian', 'talk', 'Julian.', { to: 'cam' }),
  one('cam'), hush(500), say('cam', 'flirty', 'Cam.', { to: 'julian' }),
  two('pa', 'pb'), hush(1600),   // the two of them, watching
  say('pb', 'drunk_letdown', '…He has a jawline, man.', { to: 'pa' }),
  one('pa'), say('pa', 'drunk_listen', 'We have… personalities.', { to: 'pb' }),
  one('pb'), hush(500), say('pb', 'drunk_talk', 'Speak for yourself.', { to: 'pa' }),
  // the tray: Julian takes two reds
  two('cam', 'julian'), hush(800),
  narr('A waiter passes with a tray. Red on one side, white on the other.'),
  say('julian', 'offer_wine', 'Here.', { to: 'cam' }),
  narr('Julian takes two glasses of red. He hands one to Cam.'),
  { poses: { cam: 'wine' } }, one('pa'), hush(1200),   // Justin: "What I drink." "Red."
  one('pb'), hush(1300),
  // Brooke knows the rule; Justin only sees what he does
  { think: 'pb', text: '“Don’t drink the red wine.”', only: 'pb' },
  { by: 'pb', choice: [
    { t: '[Bump into her. Spill it.]', intent: 'spills it', set: { wine: 'spilled' }, then: [
      narr('Brooke stumbles into Cam. Red wine, all down her top.'),
      one('cam'), say('cam', 'angry', 'Brooke! What the hell?', { to: 'pb' }),
      one('pb'), say('pb', 'nervous', 'Sorry. I’m… sorry.', { to: 'cam' }),
      one('julian'), hush(800), say('julian', 'hands_up', 'Accidents happen.', { to: 'pb' }),
    ] },
    { t: '“Cam. Don’t drink that.”', intent: 'warns her', set: { wine: 'warned' }, then: [
      say('pb', 'nervous', 'Cam. Don’t drink that.', { to: 'cam' }),
      one('cam'), say('cam', 'thinking', 'Why?', { to: 'pb' }),
      one('pb'), hush(900), say('pb', 'nervous', '…Just… don’t.', { to: 'cam' }),
      one('cam'), say('cam', 'explaining', 'You’re being weird.', { to: 'pb' }),
      narr('She sets the glass down. Julian is looking at Brooke.'),
    ] },
    { t: '[Say nothing]', intent: 'says nothing', set: { wine: 'red' }, then: [
      hush(1500), { poses: { cam: 'sip' } }, one('cam'), hush(1200),   // she drinks
    ] },
  ] },
  // high on the balcony, the stranger saw all of it
  { enter: { suit: 'balcony' } }, { cam: 'wide', at: 1500 }, hush(1500),
  // Justin's turn at the tray
  two('pa', 'pb'), hush(500), narr('The waiter turns to Justin.'),
  one('pa'),
  { by: 'pa', choice: [
    { t: 'Red.', intent: 'red', set: { jwine: 'red' }, then: [
      { poses: { pa: 'wine' } }, { enter: { diane: 'listen' } }, two('diane', 'pa'), hush(700),
      say('diane', 'talk', 'Red. Brave boy.', { to: 'pa' }),
      narr('She takes his hand.'),
      say('diane', 'take_hand', 'Upstairs?', { to: 'pa' }),
      one('pa'), hush(700), say('pa', 'shocked', 'I’m… what?', { to: 'diane' }),
      one('diane'), hush(900), say('diane', 'laugh', '…Oh. You don’t know.', { to: 'pa' }),
      hush(500), say('diane', 'talk', 'Pity.', { to: 'pa' }),
    ] },
    { t: 'White.', intent: 'white', set: { jwine: 'white' }, then: [
      { enter: { diane: 'listen' } }, two('diane', 'pa'), hush(700),
      say('diane', 'talk', 'White. Shame.', { to: 'pa' }),
      one('pa'), say('pa', 'drunk_talk', 'Is there… a wrong color?', { to: 'diane' }),
      one('diane'), hush(800), say('diane', 'laugh', 'Only if you don’t know what it means.', { to: 'pa' }),
    ] },
    { t: 'Water. A lot of water.', intent: 'water', set: { jwine: 'water' }, then: [
      narr('The waiter looks at him like he asked for a kidney.'),
      { enter: { diane: 'listen' } }, two('diane', 'pa'), hush(700),
      say('diane', 'laugh', 'Water. Cute.', { to: 'pa' }),
      hush(500), say('diane', 'talk', 'Nobody drinks water here, sweetie. Everybody picks a color.', { to: 'pa' }),
    ] },
  ] },
  // the stranger, from the balcony
  { exit: 'diane' }, one('suit'), hush(900),
  say('suit', 'balcony', 'Brooke. A word.', { to: 'pb' }),
  one('pb'), hush(1200),
  ...(f.tried ? [two('cam', 'julian'), hush(600), face({ cam: 'l' }), hush(1100)] : []),   // Cam looks for Justin, a second
];

// split again: Brooke upstairs in the stranger's office (what he really sold), Justin downstairs (what the red means,
// and Cam going up). Justin can text only if he lied at the door; Brooke's phone is wherever he left it
const office = [
  { slate: 'You follow the stranger upstairs. Justin and Cam stay below.' },
  scene('office', { pb: 'drunk_listen', suit: 'listen' }), two('pb', 'suit'), { fade: 'in', ms: 600 }, hush(1500),   // the screens
  { fn: (f) => (f.wine === 'spilled' ? [
    one('suit'), say('suit', 'angry', 'You spilled forty dollars of wine on my client’s date.', { to: 'pb' }),
    one('pb'), say('pb', 'nervous', 'It was an accident, man.', { to: 'suit' }),
    one('suit'), hush(900), say('suit', 'listen', 'No, it wasn’t.', { to: 'pb' }),
  ] : f.wine === 'warned' ? [
    one('suit'), say('suit', 'angry', 'I said nothing else, Brooke.', { to: 'pb' }),
    one('pb'), say('pb', 'nervous', 'I didn’t say anything!', { to: 'suit' }),
    one('suit'), hush(900), say('suit', 'listen', 'You said enough.', { to: 'pb' }),
  ] : []) },
  one('pb'), say('pb', 'drunk_listen', 'What is this place?', { to: 'suit' }),
  one('suit'), hush(700), narr('The stranger turns a screen toward him. A bed. Two people.'),
  one('pb'), hush(1700),
  say('pb', 'scared', '…Are those cameras?', { to: 'suit' }),
  one('suit'), say('suit', 'listen', 'Our guests like to be remembered.', { to: 'pb' }),
  one('pb'), hush(1000), say('pb', 'drunk_talk', 'Why’d you want Cam here?', { to: 'suit' }),
  one('suit'), say('suit', 'listen', 'Julian chose her.', { to: 'pb' }),
  hush(1000), say('suit', 'listen', 'Three weeks ago. At her work.', { to: 'pb' }),
  one('pb'), hush(1200), say('pb', 'drunk_listen', 'Chose her for what?', { to: 'suit' }),
  one('suit'), hush(1400), say('suit', 'listen', 'Red means yes, here.', { to: 'pb' }),
  one('pb'), hush(1900),   // it lands
  say('pb', 'drunk_letdown', '…She doesn’t know that.', { to: 'suit' }),
  one('suit'), hush(800), say('suit', 'listen', 'Neither did you.', { to: 'pb' }),
  // the envelope, and the wound again
  two('pb', 'suit'), hush(900), narr('An envelope on the desk. Thick.'),
  one('suit'), say('suit', 'envelope', 'Five thousand. You brought her. Your job’s done.', { to: 'pb' }),
  hush(900), say('suit', 'listen', 'Monday, you pay him back. All of it.', { to: 'pb' }),
  one('pb'), hush(1600),
  // Justin's text, if there is one: it reaches the phone in Brooke's pocket, or the one in the stranger's hand
  { waitMark: 'jtexted' },
  { fn: (f) => (f.jtext !== 'sent' ? [] : f.phone === 'kept' ? [
    hush(600), narr('Brooke’s pocket buzzes.'),
    one('suit'), hush(800), say('suit', 'angry', 'I said off.', { to: 'pb' }),
    one('pb'), { poses: { pb: 'texting' } }, { check: 'pb' },
    { by: 'pb', choice: [
      { t: 'Text back: “RED = YES. GET HER OUT”', intent: 'tells Justin', set: { reply: 'truth' }, then: [
        sms('pb', 'pa', 'RED = YES. GET HER OUT'),
        one('suit'), say('suit', 'angry', 'Give me that.', { to: 'pb' }),
        narr('The stranger rips the phone out of his hand.'),
      ] },
      { t: 'Hand him the phone.', intent: 'hands it over', set: { reply: 'none' }, then: [
        { poses: { pb: 'drunk_sad' } }, narr('Brooke hands it over. Unanswered.'),
        one('suit'), hush(500), say('suit', 'listen', 'Good.', { to: 'pb' }),
      ] },
    ] },
  ] : [
    hush(600), narr('Brooke’s phone buzzes. In the stranger’s hand.'),
    one('suit'), { check: 'suit' }, hush(700),   // he reads it, on Brooke's phone
    say('suit', 'smile', 'He’s sweet.', { to: 'pb' }),
    narr('He starts typing. On Brooke’s phone.'),
    one('pb'),
    { by: 'pb', choice: [
      { t: '[Grab the phone]', intent: 'grabs it', set: { reply: 'help' }, then: [
        narr('Brooke lunges. He gets one word out before the phone is ripped away.'),
        sms('pb', 'pa', 'HELP,'),
        one('suit'), say('suit', 'point', 'Sit. Down.', { to: 'pb' }),
      ] },
      { t: '[Let him]', intent: 'lets him', set: { reply: 'fake' }, then: [
        { sms: { from: 'pb', to: 'pa', text: 'all good bro. let her have fun', by: 'suit' } },   // on Brooke's phone, in his hand
        hush(900), one('suit'), say('suit', 'listen', 'Sent.', { to: 'pb' }),
      ] },
    ] },
  ]) },
  { mark: 'replied' },
  one('pb'), hush(1000),
  { by: 'pb', choice: [
    { t: 'Take the envelope. Sit down.', intent: 'takes the money', set: { money: 'took' }, then: [
      narr('Brooke takes the envelope. He sits.'),
      one('suit'), hush(700), say('suit', 'smile', 'Good.', { to: 'pb' }),
    ] },
    { t: 'Take the envelope. Run.', intent: 'takes it and runs', set: { money: 'ran' }, then: [
      narr('Brooke grabs the envelope and runs for the door.'),
      one('suit'), hush(900), say('suit', 'listen', 'Keep it. You earned it.', { to: 'pb' }),
    ] },
    { t: 'Leave it. Run.', intent: 'leaves it', set: { money: 'left' }, then: [
      narr('Brooke leaves the envelope where it is and runs for the door.'),
      one('suit'), hush(900), say('suit', 'listen', 'It’ll be here, Brooke.', { to: 'pb' }),
    ] },
  ] },
];
const downstairs = [
  { slate: 'Brooke follows the stranger upstairs. You stay with the party.' },
  scene('house', { pa: 'drunk_listen', cam: 'listen', julian: 'listen' }), two('cam', 'julian'), { fade: 'in', ms: 600 }, hush(900),
  // Cam goes up with Julian; with the red in her hand, or not
  { fn: (f) => (f.wine === 'red' ? [
    say('julian', 'lead', 'Come. I’ll show you the view.', { to: 'cam' }),
    one('cam'), hush(600), say('cam', 'wine', 'Back in five.', { to: 'pa' }),
    { exit: 'cam' }, { exit: 'julian' }, one('pa'), hush(900), narr('Julian leads Cam up the stairs. Her glass of red in her hand.'),
  ] : f.wine === 'spilled' ? [
    say('cam', 'angry', 'I need to fix this. Bathroom?', { to: 'julian' }),
    one('julian'), say('julian', 'lead', 'Upstairs. I’ll show you.', { to: 'cam' }),
    { exit: 'cam' }, { exit: 'julian' }, one('pa'), hush(900), narr('Julian takes Cam up the stairs.'),
  ] : [
    two('pa', 'cam'), say('cam', 'thinking', 'Why’d Brooke say that? About the wine.', { to: 'pa' }),
    one('pa'), say('pa', 'drunk_talk', 'Brooke says a lot of things.', { to: 'cam' }),
    one('cam'), hush(900), say('cam', 'worried', 'He looked scared.', { to: 'pa' }),
    one('julian'), hush(600), say('julian', 'lead', 'Come. I’ll show you the view.', { to: 'cam' }),
    one('cam'), hush(1000), say('cam', 'flirty', '…Five minutes.', { to: 'pa' }),
    { exit: 'cam' }, { exit: 'julian' }, one('pa'), hush(900), narr('Cam follows Julian up the stairs.'),
  ]) },
  // Diane, at his side, watching the stairs
  { enter: { diane: 'listen' } }, two('diane', 'pa'), hush(1100),
  say('diane', 'talk', 'First time?', { to: 'pa' }),
  one('pa'), say('pa', 'drunk_listen', 'That obvious?', { to: 'diane' }),
  one('diane'), say('diane', 'laugh', 'You’re wearing a tank top.', { to: 'pa' }),
  one('pa'), hush(700), say('pa', 'drunk_talk', 'Who’s the guy? With my friend.', { to: 'diane' }),
  one('diane'), hush(800), say('diane', 'look_up', 'Julian always gets what he pays for.', { to: 'pa' }),
  one('pa'), hush(1700),
  say('pa', 'shocked', '…Pays for?', { to: 'diane' }),
  one('diane'), say('diane', 'whisper', 'Look who’s going up, sweetie.', { to: 'pa' }),
  hush(500), say('diane', 'whisper', 'Look what they’re holding.', { to: 'pa' }),
  { cam: 'wide', at: 1560 }, hush(1800), narr('Every couple on the stairs holds a glass of red.'),
  one('pa'), hush(900),
  // what he does about it: a text only if he still has his phone
  { fn: (f) => (f.jphone === 'hid' ? [
    { by: 'pa', choice: [
      // to Brooke's phone, wherever it is: if he gave it up in the street, it's in the stranger's hand
      { t: 'Text Brooke: “where r u?? cam went upstairs w that guy”', intent: 'texts Brooke', set: { jtext: 'sent' }, then: [
        { poses: { pa: 'texting' } }, { fn: (g) => [sms('pa', g.phone === 'given' ? 'suit' : 'pb', 'where r u?? cam went upstairs w that guy')] },
      ] },
      { t: 'Go up after her.', intent: 'goes up', set: { jgo: 'up' }, then: [] },
      { t: 'Find Brooke.', intent: 'finds Brooke', set: { jgo: 'brooke' }, then: [] },
    ] },
  ] : [
    { by: 'pa', choice: [
      { t: 'Go up after her.', intent: 'goes up', set: { jgo: 'up' }, then: [] },
      { t: 'Find Brooke.', intent: 'finds Brooke', set: { jgo: 'brooke' }, then: [] },
      { t: 'Wait. She’s a big girl.', intent: 'waits', set: { jgo: 'stay' }, then: [
        say('pa', 'drunk_listen', 'She’s a big girl.', { to: 'diane' }),
        one('diane'), hush(700), say('diane', 'laugh', 'They all are.', { to: 'pa' }),
      ] },
    ] },
  ]) },
  { mark: 'jtexted' },
  { waitMark: 'replied' },
  // the answer, if he texted
  { fn: (f) => (f.jtext !== 'sent' ? [] : [
    one('pa'), hush(700),
    ...(f.reply === 'none' ? [{ poses: { pa: 'texting' } }, hush(1800), narr('Delivered. No answer.')] : [{ check: 'pa' }, hush(900)]),
    ...(f.reply === 'truth' ? [say('pa', 'texting', '“Red equals yes”?', { to: 'diane' }), one('diane'), hush(700), say('diane', 'laugh', 'There it is.', { to: 'pa' })]
      : f.reply === 'help' ? [say('pa', 'phone_shock', '“Help”… help what? Brooke?', { to: 'diane' })]
      : f.reply === 'fake' ? [hush(900), say('pa', 'texting', '…“Let her have fun.”', { to: 'diane' })] : []),
    one('pa'),
    { by: 'pa', choice: [
      { t: 'Go up after her.', intent: 'goes up', set: { jgo: 'up' }, then: [] },
      { t: 'Find Brooke.', intent: 'finds Brooke', set: { jgo: 'brooke' }, then: [] },
      ...(f.reply === 'fake' ? [{ t: 'Stay. Let her have fun.', intent: 'believes the text', set: { jgo: 'stay' }, then: [
        { poses: { pa: 'drunk_listen' } }, hush(900), say('diane', 'laugh', 'Good boy.', { to: 'pa' }),
      ] }] : []),
    ] },
  ]) },
];

// together again, upstairs: the corridor, the red door. Who gets there first, and how, comes from the two scenes
const redDoor = (f) => [
  { fade: 'out', ms: 400 },
  ...(f.jgo === 'brooke' ? [
    // Justin found the office: the screens, the stranger, Brooke
    scene('office', { pb: f.money === 'took' ? 'drunk_sad' : 'scared', suit: 'listen' }), { enter: { pa: 'shocked' } },
    { cam: 'wide', at: 1000 }, { fade: 'in', ms: 400 }, hush(1300),
    one('pa'), say('pa', 'shocked', '…What is this?', { to: 'pb' }),
    ...(f.money !== 'left' ? [two('pa', 'pb'), hush(900), say('pa', 'shocked', 'What’s in your hand?', { to: 'pb' }), one('pb'), hush(1600), narr('The envelope.')] : []),
    one('pa'), say('pa', 'angry', 'Where is she?', { to: 'pb' }),
    one('pb'), hush(800), say('pb', 'scared', 'Third door. The red light.', { to: 'pa' }),
    { fade: 'out', ms: 400 }, scene('hallway', { pa: 'angry', pb: 'scared', julian: 'listen' }),
  ] : f.jgo === 'stay' ? [
    scene('hallway', { pb: 'scared', julian: 'listen' }), two('pb', 'julian'), { fade: 'in', ms: 400 }, hush(900),
    narr(f.money === 'took' ? 'The stranger sent Brooke to “keep things calm”. Justin is still downstairs.' : 'Brooke reaches the red door first. Justin is still downstairs.'),
    say('julian', 'cuffs', 'Wrong door.', { to: 'pb' }),
    hush(1200), narr('Footsteps on the stairs. Justin, running.'), { enter: { pa: 'angry' } },
  ] : [
    scene('hallway', { pa: 'knock', julian: 'listen' }), two('pa', 'julian'), { fade: 'in', ms: 400 }, hush(700),
    narr('Justin is already at the red door. Julian blocks it.'),
    say('julian', 'cuffs', 'She’s busy.', { to: 'pa' }),
    hush(1000), narr(f.money === 'took' ? 'Brooke comes down the corridor. Walking. The stranger sent him.' : 'Brooke comes running down the corridor.'),
    { enter: { pb: 'scared' } },
  ]),
  ...(f.jgo === 'brooke' ? [cam('three', 'pa', 'pb', 'julian'), { fade: 'in', ms: 400 }, hush(900)] : [cam('three', 'pa', 'pb', 'julian'), hush(700)]),
  // what each one did, out loud
  ...(f.reply === 'fake' ? [
    one('pa'), say('pa', 'angry', 'You told me to let her have fun!', { to: 'pb' }),
    one('pb'), say('pb', 'pleading', 'That wasn’t me.', { to: 'pa' }),
    one('pa'), say('pa', 'angry', 'It came from your phone!', { to: 'pb' }),
  ] : f.reply === 'help' ? [
    one('pa'), say('pa', 'angry', '“Help”? Help WHAT?', { to: 'pb' }),
    one('pb'), hush(700), say('pb', 'pleading', 'This. Help this.', { to: 'pa' }),
  ] : f.reply === 'truth' ? [
    one('pa'), say('pa', 'angry', 'Red means yes? You KNEW that?', { to: 'pb' }),
  ] : []),
  ...(f.money !== 'left' && f.jgo !== 'brooke' ? [
    two('pa', 'pb'), hush(900), narr('An envelope sticks out of Brooke’s jacket.'),
    one('pa'), hush(700), say('pa', 'shocked', 'Brooke.', { to: 'pb' }), hush(600), say('pa', 'angry', 'What did you do?', { to: 'pb' }),
  ] : []),
  // the demand: Julian makes it public
  one('julian'), hush(1200),
  say('julian', 'listen', 'Ask him what she cost.', { to: 'pa' }),
  one('pa'), hush(1300),
  { by: 'pa', choice: [
    { t: '“Brooke. How much?”', intent: 'asks', set: { asked: true }, then: [
      say('pa', 'angry', 'Brooke.', { to: 'pb' }), hush(700), say('pa', 'angry', 'How much?', { to: 'pb' }),
    ] },
    { t: '“I don’t care. Cam, we’re leaving.”', intent: 'covers for him', set: { asked: false }, then: [
      say('pa', 'angry', 'I don’t care.', { to: 'julian' }), hush(500), say('pa', 'angry', 'Cam! We’re leaving!', { to: 'julian' }),
      one('julian'), hush(800), say('julian', 'smile', 'Loyal. That’s sweet.', { to: 'pa' }),
    ] },
  ] },
  one('pb'), hush(1400),
  { by: 'pb', choice: [
    { t: '“Five thousand.”', intent: 'confesses', set: { confess: 'yes' }, then: [
      say('pb', 'confess', 'Five thousand.', { to: 'pa' }),
      one('pa'), hush(2000),   // Justin takes it
    ] },
    { t: '“I don’t know what he’s talking about.”', intent: 'lies', set: { confess: 'no' }, then: [
      say('pb', 'nervous', 'I don’t know what he’s talking about.', { to: 'pa' }),
      one('julian'), hush(900), say('julian', 'smile', 'He knows.', { to: 'pa' }),
    ] },
    { t: '[Punch Julian]', intent: 'punches Julian', set: { confess: 'punch' }, then: [
      { poses: { pb: 'punch' } }, narr('Brooke swings. Julian hits the wall.'),
      one('julian'), hush(900), say('julian', 'angry', '…Five thousand dollars of temper.', { to: 'pb' }),
    ] },
  ] },
  // in: Cam
  { fade: 'out', ms: 300 }, scene('redroom', { pa: 'angry', pb: 'scared', cam: f.wine === 'red' ? 'dizzy' : 'scared' }),
  cam('wide'), { fade: 'in', ms: 300 }, hush(1300),
  narr('A red room. A bed. A camera on a tripod, its light on.'),
  one('cam'),
  ...(f.wine === 'red' ? [
    say('cam', 'dizzy', 'Justin? He said…', { to: 'pa' }), hush(900), say('cam', 'dizzy', 'He said you guys knew.', { to: 'pa' }),
  ] : [
    say('cam', 'scared', 'He locked the door.', { to: 'pa' }), hush(700), say('cam', 'scared', 'He just… locked the door.', { to: 'pa' }),
  ]),
  two('pa', 'pb'), hush(900),
  say('pa', 'angry', 'We’re going. Now.', { to: 'cam' }),
  { fade: 'out', ms: 600 },
];

// the woods: no phones, no car, nobody chasing them. The truth, out loud, and what it costs
const fire = (f) => [
  { slate: 'Down the back stairs. Out through the kitchen. Into the trees.' },
  scene('campfire', { pb: 'sit_fire', pa: 'sit_fire', cam: 'sit_fire' }),
  { cam: 'wide', at: 960 }, { fade: 'in', ms: 1400 }, { caption: '4:40 a.m.' }, hush(2200),
  two('pb', 'pa'),
  say('pb', 'sit_fire', 'I don’t smoke.', { to: 'pa' }),
  hush(800), say('pb', 'sit_fire', 'I just like lighters.', { to: 'pa' }),
  one('pa'), hush(900), say('pa', 'sit_fire', 'Best thing you ever bought.', { to: 'pb' }),
  cam('three', 'pb', 'pa', 'cam'), hush(1800),
  one('cam'), hush(600),
  // the demand
  say('cam', 'cold_stare', f.confess === 'yes' ? 'Five thousand.' : 'Did you know?', { to: 'pb' }),
  ...(f.confess === 'yes' ? [hush(900), say('cam', 'cold_stare', 'That’s what I cost?', { to: 'pb' })] : []),
  one('pb'), hush(1600),
  ...(f.done ? [one('pa'), hush(500), say('pa', 'sit_hurt', 'I told Cam I was done paying for you. Tonight.', { to: 'pb' }), one('pb'), hush(1300)] : []),
  // why: every way he answers, the reason comes out
  { by: 'pb', choice: [
    { t: '“I was tired of owing him.”', intent: 'tells why', set: { told: 'why' }, then: [
      say('pb', 'confess', 'You know what it’s like…', { to: 'pa' }),
      hush(800), say('pb', 'confess', 'Being the guy everybody pays for?', { to: 'pa' }),
      one('pb'), say('pb', 'confess', 'Rent. Drinks. Ubers.', { to: 'pa' }),
      hush(600), say('pb', 'confess', 'And every time, you do this little sigh.', { to: 'pa' }),
      one('pa'), hush(1600),
      one('pb'), say('pb', 'confess', 'I just wanted… one time…', { to: 'pa' }),
      hush(1100), say('pb', 'confess', '…to be the one who pays.', { to: 'pa' }),
    ] },
    { t: '“I needed the money.”', intent: 'the money', set: { told: 'money' }, then: [
      say('pb', 'sit_fire', 'I needed the money.', { to: 'cam' }),
      one('pa'), say('pa', 'sit_hurt', 'I would’ve paid it. I always pay it.', { to: 'pb' }),
      one('pb'), hush(500), say('pb', 'angry', 'THAT’S the problem!', { to: 'pa' }),
      hush(1500), say('pb', 'confess', 'You always pay it.', { to: 'pa' }),
    ] },
    { t: '[Say nothing]', intent: 'says nothing', set: { told: 'nothing' }, then: [
      hush(2000), one('pa'), hush(900),
      say('pa', 'sit_hurt', '…June. And July.', { to: 'pb' }),
      hush(900), say('pa', 'sit_hurt', 'He knew about the rent. Didn’t he?', { to: 'pb' }),
      one('pb'), hush(1600), narr('Brooke doesn’t look up.'),
    ] },
  ] },
  one('pa'), hush(900),
  { by: 'pa', choice: [
    { t: '“I never cared about the money.”', intent: 'forgives', set: { jend: 'forgives' }, then: [
      say('pa', 'sit_hurt', 'I never cared about the money, man.', { to: 'pb' }),
      one('pb'), hush(1000), say('pb', 'confess', 'I know.', { to: 'pa' }), hush(700), say('pb', 'confess', 'That’s what made it worse.', { to: 'pa' }),
    ] },
    { t: '“You sold her for rent.”', intent: 'hard', set: { jend: 'hard' }, then: [
      say('pa', 'angry', 'You sold her for rent, Brooke.', { to: 'pb' }),
      one('pb'), hush(2200), narr('Brooke stares at the fire.'),
    ] },
    { t: '[Sit closer to him]', intent: 'stays with him', set: { jend: 'closer' }, then: [
      narr('Justin moves closer. Neither of them says anything.'),
      hush(1500),
    ] },
  ] },
  // Cam: what Brooke did with the glass, downstairs, is what she remembers
  one('cam'), hush(1200),
  ...(f.wine === 'spilled' ? [
    say('cam', 'cold_stare', 'You ruined my top.', { to: 'pb' }), hush(1000),
    say('cam', 'sit_fire', '…To stop me from drinking it.', { to: 'pb' }), hush(900), say('cam', 'sit_fire', 'That was you trying.', { to: 'pb' }),
  ] : f.wine === 'warned' ? [
    say('cam', 'sit_fire', 'You told me not to drink it.', { to: 'pb' }), hush(1100), say('cam', 'sit_fire', 'I should’ve listened.', { to: 'pb' }),
  ] : [
    say('cam', 'cold_stare', 'You watched me drink it.', { to: 'pb' }), hush(1600), say('cam', 'cold_stare', 'You just watched.', { to: 'pb' }),
  ]),
  // the hook: an envelope in his jacket, whatever he did with it, and a word written on it
  cam('three', 'pb', 'pa', 'cam'), hush(1800),
  narr('Brooke puts his hands in his jacket to warm them. There’s something in the pocket.'),
  one('pb'), hush(1200),
  ...(f.money === 'left' ? [say('pb', 'scared', '…I left it on the desk.', { to: 'pa' }), hush(900)] : []),
  narr('The envelope. Written on it, in black ink:'),
  hush(800), narr('“See you Monday.”'),
  one('pb'), hush(2400),
];

// three episodes: the bar, the house, the red door. Each one ends on an actor you win (index.html episodeEnd) and a look at the next
const EPISODES = [
  { n: 1, win: { sprite: 'cam', pose: 'listen', name: 'Cam' },
    next: { n: 2, title: 'The house', img: 'covers/lastcall_ep2.jpg', tease: 'Every window is lit. Every glass of red means something.' } },
  { n: 2, win: { sprite: 'julian', pose: 'smirk', name: 'Julian' },
    next: { n: 3, title: 'The red door', img: 'covers/lastcall_ep3.jpg', tease: 'Third door. The red light. Someone is already inside.' } },
  { n: 3, win: { sprite: 'suit', pose: 'adjust', name: 'The stranger' } },
];
window.BAR = [
  scene('bar', { pa: 'drunk_listen', cam: 'listen', pb: 'drunk_listen' }),
  { cam: 'wide', at: 1500 },
  { fade: 'in', ms: 1400 },
  { caption: 'Saturday, 1:40 a.m.' },
  { wait: 900 },
  { pan: 1010, ms: 2400 },
  cam('three', 'pa', 'cam', 'pb'), hush(800),
  // who they are, shown by how they talk: Justin feels old, Brooke is broke and loving it, Cam sees through both
  one('pa'),
  say('pa', 'drunk_happy', 'Man… I think…'),
  hush(700),
  say('pa', 'drunk_talk', 'I think we’re getting too old for this shit.'),
  one('pb'),
  say('pb', 'drunk_talk', 'Man… I think…'),
  hush(700),
  say('pb', 'drunk_smile', 'I think I’m having my best fucking life, man.'),
  two('cam', 'pb'),
  say('cam', 'amused', 'Thought you had a job interview tomorrow.', { to: 'pb' }),
  one('pb'),
  say('pb', 'drunk_smile', 'I’m a broke ass bitch, I ain’t got nothing tomorrow.', { to: 'cam' }),
  one('pa'),
  { by: 'pa', choice: [
    { t: 'You skipped it?', intent: 'worried', then: [
      say('pa', 'drunk_talk', 'You skipped it? Again?', { to: 'pb' }),
      one('pb'), say('pb', 'drunk_smile', 'Bro. They wanted me to wear a tie.', { to: 'pa' }),
      one('cam'), say('cam', 'amused', 'The horror.', { to: 'pb' }),
    ] },
    { t: 'Then this round’s on you.', intent: 'teases', then: [
      say('pa', 'drunk_happy', 'Then this round’s on you.', { to: 'pb' }),
      one('pb'), say('pb', 'drunk_talk', 'With what, man? I got lint. And a guitar pick.', { to: 'pa' }),
      two('cam', 'pb'), say('cam', 'amused', 'He’s not lying. I’ve seen his bank app.', { to: 'pa' }),
    ] },
    { t: 'Cheers to nothing.', intent: 'with him', then: [
      say('pa', 'drunk_happy', 'Cheers to nothing tomorrow.', { to: 'pb' }),
      one('pb'), say('pb', 'drunk_point', 'THAT’S my brother.', { to: 'pa' }),
      one('cam'), say('cam', 'amused', 'You two are gonna die in this bar.', { to: 'pa' }),
    ] },
  ] },
  hush(800),   // the laugh dies down
  one('pa'),
  say('pa', 'drunk_listen', 'Rent’s due Monday, man. I’m not covering you again.', { to: 'pb' }),   // serious: not his happy talking pose
  one('pb'), hush(1100),   // Brooke takes it
  { by: 'pb', choice: [
    { t: 'Something’ll come up.', intent: 'the universe', set: { rent: 'universe' }, then: [
      say('pb', 'drunk_smile', 'Something’ll come up, man. The universe provides.', { to: 'pa' }),
      one('pa'), say('pa', 'drunk_talk', 'The universe doesn’t take e-transfer.', { to: 'pb' }),
    ] },
    { t: 'I’ll sell the guitar.', intent: 'the guitar', set: { rent: 'guitar' }, then: [
      say('pb', 'drunk_letdown', 'I’ll sell the guitar.', { to: 'pa' }),
      one('pa'), hush(700), say('pa', 'drunk_talk', 'You said that in June.', { to: 'pb' }),
    ] },
    { t: 'Spot me, brother?', intent: 'begs', set: { rent: 'spot' }, then: [
      say('pb', 'drunk_smile', 'Justin. My brother. My rock.', { to: 'pa' }),
      one('pa'), say('pa', 'drunk_talk', 'No.', { to: 'pb' }),
      one('pb'), say('pb', 'drunk_talk', 'You didn’t even let me finish.', { to: 'pa' }),
      one('pa'), say('pa', 'drunk_talk', 'No.', { to: 'pb' }),
    ] },
  ] },
  // the way in: Justin turns to the bartender, and Brooke is left looking at Cam a beat too long
  hush(800),
  one('pa'),
  say('pa', 'drunk_talk', 'I need water. Like… a lot of water.'),
  { aside: { pa: true } }, face({ pa: 'l' }), hush(700),
  two('cam', 'pb'), hush(1600),
  say('cam', 'amused', '…What?', { to: 'pb' }),
  hush(900),
  // the last two, Brooke and Cam together in the frame; when he says her name she gets it: a smile, not her laugh
  { poses: { cam: 'flirty' } },
  say('pb', 'drunk_flirt', 'Cam. You’re just…', { to: 'cam' }),
  hush(1000),
  say('pb', 'drunk_flirt', 'Yeah. Just…', { to: 'cam' }),
  { poses: { cam: 'awkward' } }, hush(1600),
  { poses: { pb: 'drunk_letdown' } }, hush(1000),
  say('pb', 'drunk_letdown', '…I gotta pee.', { to: 'cam' }),
  { exit: 'pb' }, { aside: { pa: false } },
  // from here to the end, each one plays his own scene on his own phone and only sees what his character sees;
  // a spectator follows Brooke; solo plays the counter up to Brooke's text, then all of Brooke, then back to the counter
  { split: () => ({ pa: counter, pb: bathroom }), watch: () => 'pb',
    hold: () => ({ pa: 'Brooke is still in the bathroom', pb: 'Justin is still with Cam' }) },
  { episode: EPISODES[0] },
  // the house: together at the door and in the salon, then apart (upstairs / downstairs), then the red door, the woods
  { fade: 'out', ms: 900 },
  ...houseDoor,
  { fn: houseMeet },
  { split: () => ({ pa: downstairs, pb: office }), watch: () => 'pb',
    hold: () => ({ pa: 'Brooke is still upstairs', pb: 'Justin is still downstairs' }) },
  { episode: EPISODES[1] },
  { fn: redDoor },
  { fn: fire },
  { episode: EPISODES[2] },
  { fade: 'out', ms: 1600 },
  { end: { kicker: 'End of episode 3', title: '{TITLE}', lede: '{LEDE}', art: null } },
];
BAR.gaze = true;
BAR.credits = '';   // no photos: rectangles only
BAR.seats = ['pa', 'pb'];
BAR.solo = { pa: 'Justin', pb: 'Brooke' };   // a seat's name when nobody plays it under their own
// the waiting room: each character in the pose that sums them up, and one line of them
BAR.pick = { pa: { pose: 'drunk_happy', line: 'Man… I think we’re getting too old for this shit.' },
  pb: { pose: 'drunk_smile', line: 'I think I’m having my best fucking life, man.' } };
BAR.cast = {
  pa: { name: 'Justin', color: '#1f7a74', sprite: 'justin_bar' },
  pb: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' },
  cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 },
  suit: { name: 'Stranger', color: '#26262b', sprite: 'suit' },
  julian: { name: 'Julian', color: '#6b5a3a', sprite: 'julian' },
  diane: { name: 'Diane', color: '#5a2a3a', sprite: 'diane' },
};
BAR.words = {
  TITLE: () => 'See you Monday',
  LEDE: (f) => `${f.confess === 'yes' ? 'Brooke said the number out loud.' : f.confess === 'no' ? 'Brooke lied at the red door.' : 'Brooke threw a punch instead of an answer.'} ${f.jend === 'forgives' ? 'Justin forgave him.' : f.jend === 'hard' ? 'Justin didn’t.' : 'Justin stayed by him.'}`,
};
// a private line (Brooke remembering the rule) shows the other player "<name> is thinking…"
BAR.ui = { you: 'You are', choosing: 'is choosing', reading: 'is thinking…', choices: 'Your choices', again: 'Play again', delivered: 'Delivered', read: 'Read',
  newText: 'New message', epEnd: 'End of episode', finished: 'You finished', won: 'You won…', added: 'Added to your characters', episode: 'Episode', next: 'Continue', home: 'Back to home', finale: 'See the ending',
  mute: 'Sound off', unmute: 'Sound on', restartEp: 'Restart episode', restart: 'Restart', quit: 'Quit' };
// what's known to be off, behind the "?" of the waiting room (so testers know)
BAR.todo = { title: 'What to fix:', items: ['Pacing wrong', 'Emotion wrong', 'Cringe end interaction',
  'Make the style uniform, between characters, backgrounds. Tone (music / sounds)'] };
