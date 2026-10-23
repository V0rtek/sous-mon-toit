// Last call — 2 players, ~2 min, a thriller in a bar, in English. Justin (pa) and Brooke (pb), roommates, + Cam.
// Brooke goes to the bathroom: from there each player plays HIS scene on his own phone at the same time, without seeing
// the other's (split). Texts go from one scene to the other. Decors = rectangles only (mock-up, pictures later).
// Writing rules learned from Justin's feedback: _Techniques.md · assets still to make: _Assets.md

const sms = (from, to, text) => ({ sms: { from, to, text } });

// poses the sheets do not have yet -> the one they play as meanwhile; a new sheet replaces them without touching the story
window.POSE_FALLBACK = {
  drunk_happy: 'explaining', drunk_talk: 'explaining', drunk_listen: 'listen', drunk_flirt: 'explaining', drunk_sad: 'holding',
  pee: 'holding', pee_relief: 'holding', pee_look: 'holding', offer: 'explaining', shush: 'holding',
  amused: 'thinking', tipsy_laugh: 'explaining', awkward: 'holding', flirty: 'thinking',
};
// a talking pose -> the pose its owner falls back to while someone else talks
window.POSE_REST = { drunk_talk: 'drunk_listen', drunk_happy: 'drunk_listen', drunk_flirt: 'drunk_listen' };
// the stand-ins are recolours: same sheet, so same facing
Object.assign(FACE, { justin_b: FACE.justin, james_noir: FACE.james });
GALLERY.push({ sprite: 'justin_b', name: 'Brooke', recolor: 'justin' }, { sprite: 'james_noir', name: 'Stranger', recolor: 'james' });

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
const pint = (x) => [R(x, TOP - 84, 48, 86, 'rgba(240,170,60,.88)', { r: '4px 4px 10px 10px' }), R(x, TOP - 92, 48, 16, '#f6efdd', { r: 6 })];
const BAR_FRONT = [
  R(-10, TOP, 1940, 30, '#a8774c', { r: 4 }), R(0, TOP + 30, 1920, 12, '#5c3b25'), R(0, TOP + 42, 1920, 400, '#33201a'),
  ...[60, 380, 700, 1020, 1340, 1660].map((x) => R(x, TOP + 66, 260, 360, '#3b261e', { r: 10, line: '4px solid #2a1912' })),
  // Justin: a pint + two empty shots · Cam: a cocktail · Brooke: a pint + two shots · the bill
  ...pint(670), shot(810), shot(846),
  R(990, TOP - 70, 40, 44, 'rgba(220,60,90,.85)', { r: '4px 4px 20px 20px' }), R(1007, TOP - 28, 6, 28, 'rgba(255,255,255,.55)'),
  R(1100, TOP - 12, 74, 12, '#111', { r: 2 }),
  ...pint(1290), shot(1200), shot(1236),
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

SCENES.bar = {
  size: [1920, 1240], back: BAR_BACK, front: BAR_FRONT,
  spots: { pa: [770, 1150, 690], cam: [1010, 1150, 690], pb: [1250, 1150, 690] },
  face: { pa: 'r', cam: 'l', pb: 'l' },
};
SCENES.wc = {
  size: [1920, 1440], back: WC_BACK, front: WC_FRONT, ambience: 'bathroom',
  spots: { pb: [900, 1170, 690], suit: [1190, 1170, 700] },
  face: { pb: 'r', suit: 'l' },
};
SCENES.street = {
  size: [1920, 1440], back: STREET_BACK, front: STREET_FRONT,
  spots: { pa: [470, 880, 300], cam: [770, 880, 300], pb: [1120, 1250, 700], suit: [1400, 1250, 720] },
  face: { pa: 'r', cam: 'l', pb: 'l', suit: 'l' },
};

// ---------- the story ----------
// split: Justin stays at the counter with Cam — a real conversation, as long as Brooke's scene: what Brooke meant
// (tension), why Justin keeps paying for him (stakes), and the guy in a suit asking about Brooke (curiosity, paid off
// when Brooke's text arrives)
const counter = [
  { slate: 'Brooke heads to the bathroom. It’s just you and Cam now.' },
  scene('bar', { pa: 'drunk_listen', cam: 'listen' }),
  cam('two', 'pa', 'cam'),
  { fade: 'in', ms: 500 },
  say('cam', 'thinking', 'What was he gonna say?', { to: 'pa' }),
  { by: 'pa', choice: [
    { t: 'Talk about Brooke.', intent: 'his friend', then: [
      say('pa', 'drunk_talk', 'He’s wasted. He won’t remember any of this tomorrow.', { to: 'cam' }),
      say('cam', 'holding', 'Or he’ll remember all of it.', { to: 'pa' }),
      say('pa', 'drunk_listen', '…You think he meant it?', { to: 'cam' }),
      say('cam', 'amused', 'I think he says it to the bartender too.', { to: 'pa' }),
    ] },
    { t: 'Get to know her.', intent: 'curious', then: [
      say('pa', 'drunk_talk', 'Six years… and I don’t even know where you’re from.', { to: 'cam' }),
      say('cam', 'tipsy_laugh', 'You never asked.', { to: 'pa' }),
      say('pa', 'drunk_happy', 'I’m asking.', { to: 'cam' }),
      say('cam', 'amused', 'Sudbury. Tell anyone and you’re dead.', { to: 'pa' }),
    ] },
    { t: 'Ask how she feels.', intent: 'honest', then: [
      say('pa', 'drunk_talk', 'And you? How’d that make you feel?', { to: 'cam' }),
      say('cam', 'awkward', '…Depends who’s saying it.', { to: 'pa' }),
      say('pa', 'drunk_listen', 'And if it’s him?', { to: 'cam' }),
      say('cam', 'holding', 'Then I pretend I didn’t hear it. Again.', { to: 'pa' }),
    ] },
    { t: 'Flirt.', intent: 'flirt', then: [
      say('pa', 'drunk_happy', 'I would’ve finished the sentence.', { to: 'cam' }),
      say('cam', 'flirty', 'Oh yeah? Go ahead. Finish it.', { to: 'pa' }),
      say('pa', 'drunk_flirt', 'You’re just…', { to: 'cam' }),
      say('cam', 'tipsy_laugh', 'Wow. You two share a brain.', { to: 'pa' }),
    ] },
  ] },
  // Cam turns it on him: the rent
  say('cam', 'thinking', 'Can I ask you something?', { to: 'pa' }),
  say('pa', 'drunk_listen', 'Mm.', { to: 'cam' }),
  say('cam', 'holding', 'Why do you keep paying his rent?', { to: 'pa' }),
  { by: 'pa', choice: [
    { t: 'He’s my brother.', intent: 'loyal', then: [
      say('pa', 'drunk_talk', 'He’s my brother.', { to: 'cam' }),
      say('cam', 'thinking', 'He’s your roommate.', { to: 'pa' }),
      say('pa', 'drunk_happy', 'Same thing at 2 a.m.', { to: 'cam' }),
    ] },
    { t: 'Because no one else will.', intent: 'tired', then: [
      say('pa', 'drunk_sad', 'Because no one else will.', { to: 'cam' }),
      say('cam', 'awkward', 'That’s not a reason. That’s a trap.', { to: 'pa' }),
    ] },
    { t: 'I’m done. Monday, he’s on his own.', intent: 'done', then: [
      say('pa', 'drunk_talk', 'I’m done. Monday, he’s on his own.', { to: 'cam' }),
      say('cam', 'surprised', 'You’ve never said that before.', { to: 'pa' }),
    ] },
  ] },
  // the guy in the suit
  say('cam', 'thinking', 'Did he tell you about the guy?', { to: 'pa' }),
  say('pa', 'drunk_listen', 'What guy?', { to: 'cam' }),
  say('cam', 'holding', 'Guy in a suit. Came to my work twice this week.', { to: 'pa' }),
  say('cam', 'holding', 'Asked if I knew Brooke.', { to: 'pa' }),
  say('pa', 'surprised', '…What’d you say?', { to: 'cam' }),
  say('cam', 'awkward', 'That I didn’t.', { to: 'pa' }),
  { by: 'pa', choice: [
    { t: 'Why’d you lie?', intent: 'presses', then: [
      say('pa', 'drunk_talk', 'Why’d you lie?', { to: 'cam' }),
      say('cam', 'holding', 'Because he knew where I work. I never told him.', { to: 'pa' }),
    ] },
    { t: 'Probably a debt collector.', intent: 'brushes it off', then: [
      say('pa', 'drunk_happy', 'Probably a debt collector. Brooke owes everybody.', { to: 'cam' }),
      say('cam', 'thinking', 'Debt collectors don’t wear Tom Ford.', { to: 'pa' }),
    ] },
    { t: '[Look at the bathroom door]', intent: 'worried', then: [
      { poses: { pa: 'drunk_listen' } }, narr('Justin looks at the bathroom door. Nobody comes out.'),
    ] },
  ] },
  say('cam', 'thinking', 'He’s taking forever.', { to: 'pa' }),
  { by: 'pa', choice: [
    { t: 'Check your phone.', intent: 'checks', then: [{ poses: { pa: 'texting' } }, { check: 'pa' }, { wait: 1400 }] },
    { t: 'Text him: “where u at?”', intent: 'worried', set: { ping: true }, then: [
      { poses: { pa: 'texting' } }, { check: 'pa' }, sms('pa', 'pb', 'where u at?'),
      say('pa', 'texting', 'He’s not answering.', { to: 'cam' }),
    ] },
    { t: 'Stay with Cam.', intent: 'stays', then: [say('pa', 'drunk_happy', 'He’s a big boy.', { to: 'cam' })] },
  ] },
  // twenty minutes later, once Brooke has decided what to text (or not)
  { waitMark: 'texted' },
  { fn: (f) => justinAfter(f) },
];

// split: Brooke in the bathroom, the stranger at the next urinal. They pee and talk, then stop and talk for real
const bathroom = [
  { slate: 'You leave Justin and Cam and head to the bathroom.' },
  scene('wc', { suit: 'pee' }),
  cam('two', 'pb', 'suit'),
  { fade: 'in', ms: 500 },
  { enter: { pb: 'pee' } }, cam('two', 'pb', 'suit'),
  { sfx: 'zip' }, { wait: 500 }, { sfx: 'pee', loop: true }, { wait: 700 },
  { poses: { pb: 'pee_relief' } }, { wait: 900 },
  say('suit', 'pee', 'Long night?', { to: 'pb' }),
  { by: 'pb', choice: [
    { t: 'Best night of my life.', intent: 'happy', then: [
      say('pb', 'pee_look', 'Best night of my life, man.', { to: 'suit' }),
      say('suit', 'pee', 'Doesn’t sound like it.', { to: 'pb' }),
    ] },
    { t: 'Do I know you?', intent: 'suspicious', then: [
      say('pb', 'pee_look', 'Do I… know you?', { to: 'suit' }),
      say('suit', 'pee', 'No.', { to: 'pb' }),
    ] },
    { t: 'Say nothing.', intent: 'stares at the wall', then: [narr('Brooke stares at the wall. Very hard.')] },
  ] },
  // they stop, zip up, turn around: now they talk for real
  { stop: 'pee' }, { sfx: 'zip' }, { wait: 600 }, { sfx: 'zip' },
  { poses: { pb: 'drunk_listen', suit: 'listen' } }, face({ pb: 'r', suit: 'l' }),
  cam('two', 'pb', 'suit'), { wait: 500 },
  cam('one', 'suit'),
  say('suit', 'listen', 'I’ve got a job for you.', { to: 'pb' }),
  cam('one', 'pb'),
  say('pb', 'drunk_talk', 'Huh?', { to: 'suit' }),
  cam('one', 'suit'),
  say('suit', 'offer', 'Five thousand cash. One night.', { to: 'pb' }),
  { when: (f) => f.rent === 'universe', then: [think('pb', '…The universe provides.')] },
  { by: 'pb', choice: [
    { t: '[Laugh]', intent: 'laughs', then: [
      cam('one', 'pb'), say('pb', 'drunk_happy', 'Hah. Hahaha. Okay.', { to: 'suit' }),
      cam('one', 'suit'), say('suit', 'listen', 'Rent’s due Monday, Brooke.', { to: 'pb' }),
    ] },
    { t: 'You’re shady.', intent: 'shady', then: [
      cam('one', 'pb'), say('pb', 'drunk_talk', 'Man… you a shady ass bitch.', { to: 'suit' }),
      cam('one', 'suit'), say('suit', 'listen', 'And you’re broke. Rent’s due Monday, Brooke.', { to: 'pb' }),
    ] },
    { t: 'Keep going.', intent: 'listening', then: [
      cam('one', 'pb'), say('pb', 'drunk_listen', 'I’m listening.', { to: 'suit' }),
      cam('one', 'suit'), say('suit', 'listen', 'Good. Rent’s due Monday, Brooke.', { to: 'pb' }),
    ] },
  ] },
  cam('one', 'pb'),
  say('pb', 'surprised', '…How do you know my name?', { to: 'suit' }),
  cam('one', 'suit'),
  say('suit', 'shush', 'We leave now. You don’t tell anyone.', { to: 'pb' }),
  cam('one', 'pb'), { poses: { pb: 'texting' } }, { check: 'pb' },
  { by: 'pb', choice: [
    { t: 'Text Justin: “brb”', intent: 'lies', set: { sms: 'brb' }, then: [
      sms('pb', 'pa', 'brb'),
      cam('one', 'suit'), say('suit', 'listen', 'Good.', { to: 'pb' }),
    ] },
    { t: 'Text Justin: “leaving w some guy. u coming?”', intent: 'invites him', set: { sms: 'invite' }, then: [
      sms('pb', 'pa', 'leaving w some guy. u coming?'),
      cam('one', 'suit'), say('suit', 'angry', 'I said no one.', { to: 'pb' }),
    ] },
    { t: 'Say nothing.', intent: 'obeys', set: { sms: 'none' }, then: [
      { poses: { pb: 'drunk_listen' } },
      cam('one', 'suit'), say('suit', 'listen', 'Good boy.', { to: 'pb' }),
    ] },
  ] },
  { mark: 'texted' },
  cam('two', 'pb', 'suit'),
  narr('Brooke follows the stranger out the emergency exit.'),
  // outside: the car, the phone, and through the window Justin and Cam, still talking (seen from afar: no words)
  { fade: 'out', ms: 500 },
  scene('street', { pa: 'drunk_listen', cam: 'listen', pb: 'drunk_listen', suit: 'listen' }),
  { cam: 'wide', at: 1260 },
  { fade: 'in', ms: 700 },
  narr('Outside. A black car, engine running.'),
  cam('two', 'pb', 'suit'),
  say('suit', 'listen', 'Phone.', { to: 'pb' }),
  say('pb', 'drunk_talk', 'What?', { to: 'suit' }),
  say('suit', 'offer', 'Your phone. You get it back after.', { to: 'pb' }),
  { by: 'pb', choice: [
    { t: 'Hand it over.', intent: 'gives it', set: { phone: 'given' }, then: [narr('Brooke hands it over. The screen is still lit.')] },
    { t: 'Why?', intent: 'asks', set: { phone: 'given' }, then: [
      say('pb', 'drunk_talk', 'Why?', { to: 'suit' }),
      say('suit', 'listen', 'Because the job starts now.', { to: 'pb' }),
      narr('Brooke hands it over.'),
    ] },
    { t: 'Keep it.', intent: 'keeps it', set: { phone: 'kept' }, then: [
      say('pb', 'drunk_talk', 'Nah. Phone stays with me.', { to: 'suit' }),
      say('suit', 'angry', 'Then keep it off.', { to: 'pb' }),
    ] },
  ] },
  // he looks back at the bar's window
  { cam: 'wide', at: 780 }, { wait: 900 },
  think('pb', '…He’s right there.'),
  cam('two', 'pb', 'suit'),
  say('suit', 'shush', 'Get in.', { to: 'pb' }),
  narr('Brooke gets in the car.'),
];

// Justin, twenty minutes later at the counter, reads what Brooke sent (or didn't)
const justinAfter = (f) => [
  { fade: 'out', ms: 600 },
  scene('bar', { pa: 'texting', cam: 'listen' }),
  cam('two', 'pa', 'cam'),
  { fade: 'in', ms: 600 },
  { caption: 'Twenty minutes later' },
  { wait: 900 }, { check: 'pa' }, { wait: 700 },
  ...(f.sms === 'invite' ? [
    { poses: { pa: 'phone_shock' } },
    say('cam', 'surprised', 'Who’s “some guy”?', { to: 'pa' }),
    say('pa', 'phone_shock', '…The suit.', { to: 'cam' }),
    { by: 'pa', choice: [
      { t: 'I’m coming.', intent: 'follows him', set: { title: 'U coming?' }, then: [
        sms('pa', 'pb', 'coming. where r u?'),
        say('pa', 'drunk_talk', 'I gotta go.', { to: 'cam' }),
        say('cam', 'angry', 'You don’t even know where he is.', { to: 'pa' }),
      ] },
      { t: 'Stay with Cam.', intent: 'stays', set: { title: 'Some guy' }, then: [
        say('pa', 'drunk_listen', 'Nobody. He’ll be back.', { to: 'cam' }),
        narr('He never came back.'),
      ] },
    ] },
  ] : f.sms === 'brb' ? [
    say('pa', 'texting', 'He said he’d be right back.', { to: 'cam' }),
    say('cam', 'holding', 'That was twenty minutes ago.', { to: 'pa' }),
    say('cam', 'awkward', 'Justin… the guy in the suit.', { to: 'pa' }),
    { set: { title: 'brb' } },
  ] : [
    say('cam', 'surprised', 'Where’s Brooke?', { to: 'pa' }),
    { poses: { pa: 'phone_shock' } },
    narr('No message. Nothing.'),
    say('cam', 'awkward', 'Justin… the guy in the suit.', { to: 'pa' }),
    { set: { title: 'Not a word' } },
  ]),
];

window.BAR = [
  scene('bar', { pa: 'drunk_listen', cam: 'listen', pb: 'drunk_listen' }),
  { cam: 'wide', at: 1500 },
  { fade: 'in', ms: 1400 },
  { caption: 'Saturday, 1:40 a.m.' },
  { wait: 900 },
  { pan: 1010, ms: 2400 },
  cam('three', 'pa', 'cam', 'pb'),
  // who they are, shown by how they talk: Justin feels old, Brooke is broke and loving it, Cam sees through both
  say('pa', 'drunk_happy', 'Man… I think…'),
  say('pa', 'drunk_talk', 'I think we’re getting too old for this shit.'),
  say('pb', 'drunk_talk', 'Man… I think…'),
  say('pb', 'drunk_happy', 'I think I’m having my best fucking life, man.'),
  say('cam', 'amused', 'Thought you had a job interview tomorrow.', { to: 'pb' }),
  say('pb', 'drunk_happy', 'I’m a broke ass bitch, I ain’t got nothing tomorrow.', { to: 'cam' }),
  { by: 'pa', choice: [
    { t: 'You skipped it?', intent: 'worried', then: [
      say('pa', 'drunk_talk', 'You skipped it? Again?', { to: 'pb' }),
      say('pb', 'drunk_happy', 'Bro. They wanted me to wear a tie.', { to: 'pa' }),
      say('cam', 'amused', 'The horror.', { to: 'pb' }),
    ] },
    { t: 'Then this round’s on you.', intent: 'teases', then: [
      say('pa', 'drunk_happy', 'Then this round’s on you.', { to: 'pb' }),
      say('pb', 'drunk_talk', 'With what, man? I got lint. And a guitar pick.', { to: 'pa' }),
      say('cam', 'amused', 'He’s not lying. I’ve seen his bank app.', { to: 'pa' }),
    ] },
    { t: 'Cheers to nothing.', intent: 'with him', then: [
      say('pa', 'drunk_happy', 'Cheers to nothing tomorrow.', { to: 'pb' }),
      say('pb', 'drunk_happy', 'THAT’S my brother.', { to: 'pa' }),
      say('cam', 'amused', 'You two are gonna die in this bar.', { to: 'pa' }),
    ] },
  ] },
  say('pa', 'drunk_talk', 'Rent’s due Monday, man. I’m not covering you again.', { to: 'pb' }),
  { by: 'pb', choice: [
    { t: 'Something’ll come up.', intent: 'the universe', set: { rent: 'universe' }, then: [
      say('pb', 'drunk_happy', 'Something’ll come up, man. The universe provides.', { to: 'pa' }),
      say('pa', 'drunk_talk', 'The universe doesn’t take e-transfer.', { to: 'pb' }),
    ] },
    { t: 'I’ll sell the guitar.', intent: 'the guitar', set: { rent: 'guitar' }, then: [
      say('pb', 'drunk_sad', 'I’ll sell the guitar.', { to: 'pa' }),
      say('pa', 'drunk_talk', 'You said that in June.', { to: 'pb' }),
    ] },
    { t: 'Spot me, brother?', intent: 'begs', set: { rent: 'spot' }, then: [
      say('pb', 'drunk_happy', 'Justin. My brother. My rock.', { to: 'pa' }),
      say('pa', 'drunk_talk', 'No.', { to: 'pb' }),
      say('pb', 'drunk_talk', 'You didn’t even let me finish.', { to: 'pa' }),
      say('pa', 'drunk_talk', 'No.', { to: 'pb' }),
    ] },
  ] },
  // Brooke to Cam, and the empty moment after
  cam('two', 'cam', 'pb'),
  say('pb', 'drunk_flirt', 'Cam. You’re just…', { to: 'cam' }),
  say('pb', 'drunk_flirt', 'Yeah. Just…', { to: 'cam' }),
  cam('one', 'cam'), { poses: { cam: 'awkward' } }, { wait: 1300 },
  cam('one', 'pb'), { poses: { pb: 'drunk_sad' } }, { wait: 700 },
  say('pb', 'drunk_sad', '…I gotta pee.'),
  { exit: 'pb' },
  // from here to the end, each one plays his own scene on his own phone and only sees what his character sees;
  // a spectator follows Brooke; solo plays the counter up to "twenty minutes later", then Brooke, then the end
  { split: () => ({ pa: counter, pb: bathroom }), watch: () => 'pb',
    hold: () => ({ pa: 'Brooke is still in the bathroom', pb: 'Justin is still with Cam' }) },
  { fade: 'out', ms: 900 },
  { end: { kicker: 'End of scene 1', title: '{TITLE}', lede: 'Brooke left with the stranger.', art: null } },
];
BAR.gaze = true;
BAR.credits = '';   // no photos: rectangles only
BAR.seats = ['pa', 'pb'];
BAR.solo = { pa: 'Justin', pb: 'Brooke' };   // the other character's player name when you play both
BAR.cast = {
  pa: { name: 'Justin', color: '#1f7a74', sprite: 'justin' },
  pb: { name: 'Brooke', color: '#2a4f8f', sprite: 'justin_b' },
  cam: { name: 'Cam', color: '#3b1f6e', sprite: 'ruby', scale: 0.95 },
  suit: { name: 'Stranger', color: '#26262b', sprite: 'james_noir', aside: true },
};
BAR.words = { TITLE: (f) => f.title || 'Last call' };
BAR.ui = { choosing: 'is choosing', choices: 'Your choices', again: 'Play again' };
