// Mini-jeux — tiny 2-player games, each one testing one system from Justin's list of ideas (the "?" of their screen):
// a secret only one player sees, two conflicting versions, cover or rat, choosing at the same time, an incoming call,
// a stolen phone that texts for you, guiding someone by text. Same cast as Last call, rectangle decors, in English.
// (top-level names start with mg / MG_: index.html has its own `game`, `room`…)

window.GAME_IDEAS = { title: 'Ideas of multiple players stories', items: [
  'They are arguing together about something (choices)',
  'They have to hold a secret to the other guy. (or stakes)',
  'They get given different infos, conflicting.',
  '- Wait I tought you were the one that did x??',
  'B pays for a choice they didn\'t make -> "BRO WHAT DID U DO"',
  '- Girl : "yea Justin told me about your mom"',
  'They have the faith of the other char or someone they both care about in their hands',
  'Cover or Rat',
  '- Questioned separatly (cops?)',
  'Someone gets his phone stolen, the other receive a fake text and doesnt know.',
  'The other has to guide the other through texting / phone call (like they see a map/text that the other dont).',
  'They get a phone call from the other, answer or dont?',
  'Weither they can go help the girl or go help the guy',
  'Send help message to x. The other just receive "HELP," and don\'t know what\'s going on',
  '- or maybe just a warning "watch out for Caly, I think she playing games with us" while the other is sealing a deal with Caly (the char may receive the message when its too late or before or while)',
  'They both have a 1o1 with someone they care.',
  'Choice of who to call.',
  'Choice of what / who to text.',
] };

const MG_CAST = {
  pa: { name: 'Justin', color: '#1f7a74', sprite: 'justin_bar' },
  pb: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' },
  cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 },
  suit: { name: 'Stranger', color: '#26262b', sprite: 'suit' },
};
const MG_UI = { you: 'You are', choosing: 'is choosing', reading: 'is reading', calling: 'Incoming call…', choices: 'Your choices',
  again: 'Play again', delivered: 'Delivered', read: 'Read', callEnded: 'Call ended',
  mute: 'Sound off', unmute: 'Sound on', restartEp: 'Restart episode', restart: 'Restart', quit: 'Quit' };
const mg = (steps) => Object.assign(steps, { gaze: true, credits: '', seats: ['pa', 'pb'], solo: { pa: 'Justin', pb: 'Brooke' },
  cast: MG_CAST, ui: MG_UI,
  pick: { pa: { pose: 'drunk_talk', line: 'I need water. Like… a lot of water.' }, pb: { pose: 'drunk_point', line: 'THAT’S my brother.' } } });
const mgEnd = (title, lede) => [{ fade: 'out', ms: 800 }, { end: { kicker: 'Mini-game', title, lede, art: null } }];

// ---------- decors ----------
// the street, the two of them in front of the bar (clear of its window)
SCENES.street2 = { size: [1920, 1440], back: STREET_BACK, front: STREET_FRONT,
  spots: { pa: [1080, 1250, 700], pb: [1340, 1250, 700], suit: [1600, 1250, 720] }, face: { pa: 'r', pb: 'l', suit: 'l' } };
// an interrogation room: one-way mirror, a hanging lamp, the table in front of them
SCENES.room = { size: [1920, 1240], spots: { pa: [760, 1150, 690], pb: [760, 1150, 690], suit: [1180, 1150, 710] },
  face: { pa: 'r', pb: 'r', suit: 'l' },
  back: [
    R(0, 0, 1920, 1240, '#23262b'), R(0, 0, 1920, 120, '#16181c'), R(0, 860, 1920, 380, '#1a1c20'),
    R(1260, 260, 540, 300, '#0d1117', { line: '14px solid #3a3f47' }), R(1280, 280, 110, 260, 'rgba(255,255,255,.06)'),
    R(958, 0, 4, 230, '#0a0b0d'), R(880, 230, 160, 50, '#2f3238', { r: '80px 80px 6px 6px' }),
    R(910, 276, 100, 14, '#fff3cf', { r: 7, glow: '0 0 120px 60px rgba(255,236,190,.28)' }),
  ],
  front: [R(420, 866, 1080, 26, '#55504a', { r: 4 }), R(440, 892, 1040, 348, '#3d3934')] };
// a dark basement corridor: two doors, one weak bulb
SCENES.corridor = { size: [1920, 1440], spots: { pb: [960, 1220, 700] }, face: { pb: 'r' },
  back: [
    R(0, 0, 1920, 1440, '#0d0f12'), R(520, 180, 880, 940, '#1b1f25'), R(0, 1120, 1920, 320, '#14171b'),
    R(600, 460, 200, 640, '#3a2f26', { line: '10px solid #241c16' }), R(770, 760, 16, 16, '#c9a227', { r: 8 }),
    R(1120, 460, 200, 640, '#3a2f26', { line: '10px solid #241c16' }), R(1134, 760, 16, 16, '#c9a227', { r: 8 }),
    R(940, 150, 40, 16, '#ffe9b0', { r: 8, glow: '0 0 80px 30px rgba(255,233,176,.22)' }),
  ], front: [] };
// the building plan on Justin's phone: start (blue) at the bottom, the exit (green) at the top; the way out in red is
// left at the first fork, then right
const MG_C = (x, y, w, h) => R(x, y, w, h, '#cfd8e3', { r: 6 });
const MG_RED = (x, y, w, h) => R(x, y, w, h, '#ef4444', { r: 6 });
SCENES.plan = { size: [1920, 1440], spots: {}, face: {},
  back: [
    R(0, 0, 1920, 1440, '#0b0e14'), R(560, 120, 800, 1200, '#111827', { r: 60, line: '14px solid #2b3240' }),
    MG_C(940, 900, 40, 300), MG_C(720, 880, 520, 40),
    MG_C(1200, 700, 40, 200), R(1180, 690, 80, 14, '#7a2a2a', { r: 6 }),
    MG_C(700, 560, 40, 340), MG_C(600, 540, 420, 40),
    MG_C(600, 540, 40, 160), R(580, 700, 80, 14, '#7a2a2a', { r: 6 }),
    MG_C(980, 300, 40, 260),
    R(940, 230, 120, 76, '#22c55e', { r: 12, glow: '0 0 30px 8px rgba(34,197,94,.45)' }),
    R(940, 1170, 40, 40, '#3b82f6', { r: 20, glow: '0 0 24px 6px rgba(59,130,246,.55)' }),
    MG_RED(954, 900, 12, 290), MG_RED(714, 894, 252, 12), MG_RED(714, 554, 12, 352), MG_RED(714, 554, 292, 12), MG_RED(994, 300, 12, 266),
  ], front: [] };
// a phone call, split screen: the bar on the left (warm), the street on the right (cold)
SCENES.call = { size: [1920, 1240], spots: { pa: [480, 1180, 700], pb: [1440, 1180, 700] }, face: { pa: 'r', pb: 'l' },
  back: [
    R(0, 0, 960, 1240, '#2a1d1f'), R(120, 230, 520, 260, '#0b1322', { line: '12px solid #3a2a22' }),
    R(360, 0, 4, 150, '#0a0708'), R(320, 150, 84, 40, '#2b2b2b', { r: '42px 42px 6px 6px' }),
    R(336, 186, 52, 12, '#ffcf8a', { r: 6, glow: '0 0 60px 26px rgba(255,190,110,.4)' }),
    R(960, 0, 960, 1240, '#0e1320'),
    R(1680, 260, 14, 900, '#1b1d22'), R(1620, 250, 130, 26, '#2a2c33', { r: 8 }),
    R(1640, 274, 90, 12, '#fff1c9', { r: 6, glow: '0 0 90px 36px rgba(255,236,190,.22)' }),
    R(954, 0, 12, 1240, '#000'),
  ], front: [] };

// ---------- 1. the secret: a private text (Justin sees the phone buzz, not the words) + a line only Justin sees ----------
const mgSecret = mg([
  scene('bar', { pa: 'drunk_listen', cam: 'listen', pb: 'drunk_listen' }),
  cam('three', 'pa', 'cam', 'pb'), { fade: 'in', ms: 700 }, hush(700),
  one('cam'), say('cam', 'worried', 'Okay. Who finished my drink?'),
  one('pb'), hush(600),
  { sms: { from: 'suit', to: 'pb', text: 'Say nothing about tonight. — S', only: 'pb' } },
  hush(700), { check: 'pb' }, hush(900),
  { narr: 'Brooke reads a text. His face changes.', only: 'pa' },
  two('cam', 'pb'), hush(500),
  say('cam', 'thinking', 'Brooke? You good?', { to: 'pb' }),
  one('pb'),
  { by: 'pb', choice: [
    { t: 'I’m good.', intent: 'keeps it', set: { told: false }, then: [say('pb', 'drunk_listen', 'Yeah. All good.', { to: 'cam' })] },
    { t: 'Show them the text.', intent: 'tells', set: { told: true }, then: [
      say('pb', 'drunk_talk', 'Someone just texted me. Look.', { to: 'cam' }),
      one('cam'), hush(700), say('cam', 'worried', '…Who’s “S”?', { to: 'pb' }),
    ] },
  ] },
  { when: (f) => !f.told, then: [
    one('pa'), hush(700),
    { by: 'pa', choice: [
      { t: 'Let it go.', intent: 'lets it go', then: [say('pa', 'drunk_listen', 'Okay.', { to: 'pb' })] },
      { t: 'Press him.', intent: 'presses', then: [
        say('pa', 'drunk_talk', 'Who was that, Brooke?', { to: 'pb' }),
        one('pb'), hush(900), say('pb', 'drunk_listen', 'Nobody.', { to: 'pa' }),
      ] },
    ] },
  ] },
  { fn: (f) => mgEnd(f.told ? 'Told' : 'Kept', f.told ? 'Brooke showed the text.' : 'Only Brooke knows who “S” is.') },
]);

// ---------- 2. two versions: each one is told something different ----------
const mgVersions = mg([
  scene('bar', { pa: 'drunk_listen', cam: 'worried', pb: 'drunk_listen' }),
  cam('three', 'pa', 'cam', 'pb'), { fade: 'in', ms: 700 }, hush(700),
  one('cam'), say('cam', 'worried', 'The tip jar’s gone. Forty bucks.'),
  hush(600),
  { narr: 'Cam leans in, just for you: “I saw Brooke take it.”', only: 'pa' },
  { narr: 'Cam leans in, just for you: “I saw Justin take it.”', only: 'pb' },
  two('pa', 'pb'), hush(900),
  one('pa'),
  { by: 'pa', choice: [
    { t: 'Why’d you take it?', intent: 'accuses', set: { pa: 'accuse' }, then: [say('pa', 'drunk_talk', 'Bro. Why’d you take the jar?', { to: 'pb' })] },
    { t: 'Say nothing.', intent: 'watches', set: { pa: 'quiet' }, then: [hush(900), narr('Justin watches Brooke.')] },
  ] },
  one('pb'),
  { by: 'pb', choice: [
    { t: 'Me? She said it was YOU.', intent: 'flips it', set: { pb: 'accuse' }, then: [say('pb', 'drunk_talk', 'ME? She said it was YOU.', { to: 'pa' })] },
    { t: 'Say nothing.', intent: 'watches', set: { pb: 'quiet' }, then: [hush(900), narr('Brooke watches Justin.')] },
  ] },
  one('cam'), hush(900), say('cam', 'explaining', '…Huh.', { to: 'pa' }),
  hush(600), say('cam', 'tipsy_laugh', 'I told you both something different.', { to: 'pa' }),
  { fn: (f) => mgEnd(f.pa === 'accuse' && f.pb === 'accuse' ? 'Wait, I thought you…' : f.pa === 'quiet' && f.pb === 'quiet' ? 'Poker faces' : 'One of you bit',
    'Cam told each of you a different version.') },
]);

// ---------- 3. cover or rat: questioned separately, neither knows what the other said ----------
const mgRoom = (k) => [
  { slate: k === 'pa' ? 'Room 1. They take Brooke next door.' : 'Room 2. They take Justin next door.' },
  scene('room', { [k]: 'drunk_sad', suit: 'listen' }), two(k, 'suit'), { fade: 'in', ms: 500 }, hush(1000),
  one('suit'), say('suit', 'listen', 'Forty dollars is missing from the bar.', { to: k }),
  hush(500), say('suit', 'offer', 'Your friend says you took it. Tell me it was him, and you walk.', { to: k }),
  one(k), hush(1300),
  { by: k, choice: [
    { t: 'Cover him.', intent: 'covers', set: { [k]: 'cover' }, then: [say(k, 'drunk_listen', 'He didn’t take anything.', { to: 'suit' })] },
    { t: 'Rat him out.', intent: 'rats', set: { [k]: 'rat' }, then: [say(k, 'drunk_talk', '…It was him.', { to: 'suit' })] },
  ] },
  one('suit'), hush(900), say('suit', 'listen', 'We’ll see.', { to: k }),
];
const mgRat = mg([
  scene('room', { suit: 'listen' }), { cam: 'wide', at: 1000 }, { fade: 'in', ms: 700 },
  narr('The tip jar is gone. They question you one at a time.'),
  { split: () => ({ pa: mgRoom('pa'), pb: mgRoom('pb') }), watch: () => 'pa',
    hold: () => ({ pa: 'Brooke is still next door', pb: 'Justin is still next door' }) },
  { fade: 'out', ms: 500 }, scene('room', { suit: 'listen' }), one('suit'), { fade: 'in', ms: 500 }, hush(900),
  { fn: (f) => {
    const both = f.pa === f.pb, rat = f.pa === 'rat' ? 'Justin' : 'Brooke', kept = f.pa === 'rat' ? 'Brooke' : 'Justin';
    const line = both && f.pa === 'cover' ? 'Neither of you talked. Get out.' : both ? 'You both sold each other out. Cute.' : `${rat} talked. ${kept} didn’t.`;
    return [say('suit', 'listen', line), ...mgEnd(both && f.pa === 'cover' ? 'Brothers' : both ? 'Snitches' : 'Under the bus',
      'Neither of you knew what the other said.')];
  } },
]);

// ---------- 4. who do we help: both choose at the same time, without seeing the other's choice ----------
const mgPick = (k) => [{ by: k, choice: [
  { t: 'Help Cam.', intent: 'Cam', set: { [k]: 'cam' }, then: [] },
  { t: 'Help the guy.', intent: 'the guy', set: { [k]: 'guy' }, then: [] },
] }];
const mgArgue = mg([
  scene('street2', { pa: 'drunk_listen', pb: 'drunk_listen' }), { cam: 'wide', at: 1210 }, { fade: 'in', ms: 700 }, hush(700),
  narr('Two screams. Cam, down the street, cornered. And a guy on the ground, right behind you.'),
  two('pa', 'pb'), hush(500),
  narr('You both choose at the same time. You won’t see what the other picked.'),
  { split: () => ({ pa: mgPick('pa'), pb: mgPick('pb') }), watch: () => 'pa',
    hold: () => ({ pa: 'Brooke is choosing', pb: 'Justin is choosing' }) },
  { fn: (f) => (f.pa === f.pb ? [
    two('pa', 'pb'), say('pa', 'drunk_talk', f.pa === 'cam' ? 'Cam. Go!' : 'Him first!', { to: 'pb' }),
    say('pb', 'drunk_talk', 'Already going!', { to: 'pa' }),
    ...mgEnd('Same page', 'You both picked the same. You go together.'),
  ] : [
    two('pa', 'pb'), say('pa', 'drunk_talk', f.pa === 'cam' ? 'CAM! NOW!' : 'HELP HIM!', { to: 'pb' }),
    say('pb', 'drunk_talk', 'BRO WHAT ARE YOU DOING?!', { to: 'pa' }),
    hush(700), narr('You run in opposite directions.'),
    ...mgEnd('Split', 'You picked different people. Now you’re each alone.'),
  ]) },
]);

// ---------- 5. the call: one calls, the other's phone rings (answer or decline) ----------
const mgCallA = [   // Justin, at the bar
  scene('bar', { pa: 'drunk_listen', cam: 'listen' }), two('pa', 'cam'), { fade: 'in', ms: 500 }, hush(800),
  one('cam'), say('cam', 'worried', 'Where’s Brooke? He left twenty minutes ago.', { to: 'pa' }),
  one('pa'),
  { by: 'pa', choice: [
    { t: 'Call him.', intent: 'calls', set: { call: true }, then: [{ poses: { pa: 'texting' } }] },
    { t: 'Text him.', intent: 'texts', set: { call: false }, then: [sms('pa', 'pb', 'where r u?')] },
  ] },
  { mark: 'decided' },   // Brooke's phone rings right away
  { when: (f) => f.call, then: [narr('It’s ringing…')] },
  { waitMark: 'picked' },
  { when: (f) => f.call && !f.answered, then: [hush(1600), narr('It rings. And rings. Voicemail.')] },
];
const mgCallB = [   // Brooke, outside with the stranger
  scene('street2', { pb: 'drunk_listen', suit: 'listen' }), two('pb', 'suit'), { fade: 'in', ms: 500 }, hush(800),
  one('suit'), say('suit', 'listen', 'The car’s coming. Two minutes.', { to: 'pb' }),
  one('pb'), hush(900),
  { waitMark: 'decided' },
  { when: (f) => f.call, then: [
    { by: 'pb', ring: 'Justin', choice: [
      { t: 'Answer', intent: 'answers', set: { answered: true }, then: [] },
      { t: 'Decline', intent: 'declines', set: { answered: false }, then: [one('suit'), hush(800), say('suit', 'listen', 'Good.', { to: 'pb' })] },
    ] },
  ], else: [{ check: 'pb' }, hush(1200), say('pb', 'drunk_listen', '…Later.')] },
  { mark: 'picked' },
];
const mgCall = mg([
  { split: () => ({ pa: mgCallA, pb: mgCallB }), watch: () => 'pb', hold: () => ({ pa: 'Waiting for Brooke', pb: 'Waiting for Justin' }) },
  { fn: (f) => (f.call && f.answered ? [
    // each phone only sees its own player on the call (a spectator follows Brooke); the other one is a voice
    { fade: 'out', ms: 400 }, scene('call', { pa: 'texting', pb: 'texting' }), { call: { watch: 'pb' } }, one('pa'), { fade: 'in', ms: 400 },
    say('pa', 'texting', 'Brooke? Where are you?'),
    one('pb'), hush(1000), say('pb', 'texting', 'I can’t talk right now.'),
    one('pa'), say('pa', 'texting', 'Who are you with?'),
    one('pb'), hush(1200), { call: false }, narr('Brooke hangs up.'),
    ...mgEnd('Picked up', 'Brooke answered. He didn’t say much.'),
  ] : mgEnd(f.call ? 'Declined' : 'Left on read', f.call ? 'Brooke let it ring.' : 'Justin texted. Brooke saw it.')) },
]);

// ---------- 6. the stolen phone: "HELP," then a text someone else wrote ----------
const mgStolenB = [   // Brooke, outside
  scene('street2', { pb: 'texting', suit: 'listen' }), two('pb', 'suit'), { fade: 'in', ms: 500 }, hush(900),
  narr('Outside. A guy walks right into you and rips the phone out of your hand.'),
  one('pb'),
  { by: 'pb', choice: [
    { t: 'Grab it back.', intent: 'fights', set: { help: true }, then: [narr('You get it back for one second.'), sms('pb', 'pa', 'HELP,'), narr('He rips it away again.')] },
    { t: 'Let it go.', intent: 'lets go', set: { help: false }, then: [hush(1000)] },
  ] },
  one('suit'), hush(800), narr('He types something on your phone. Then he looks at you.'),
  sms('pb', 'pa', 'jk lol. all good. go home'),
  { mark: 'sent' },
  say('suit', 'listen', 'Your friend’s going home.', { to: 'pb' }),
];
const mgStolenA = [   // Justin, at the bar
  scene('bar', { pa: 'drunk_listen', cam: 'sip' }), two('pa', 'cam'), { fade: 'in', ms: 500 }, hush(900),
  one('cam'), say('cam', 'thinking', 'Brooke’s been gone a while.', { to: 'pa' }),
  { waitMark: 'sent' },
  one('pa'), { check: 'pa' }, hush(900),
  { by: 'pa', choice: [
    { t: 'Go home.', intent: 'believes it', set: { home: true }, then: [say('pa', 'drunk_listen', 'He says he’s good. I’m going home.', { to: 'cam' })] },
    { t: 'Go find him.', intent: 'doubts it', set: { home: false }, then: [
      say('pa', 'drunk_talk', 'Brooke doesn’t say “lol”.', { to: 'cam' }),
      one('cam'), hush(600), say('cam', 'worried', 'Go.', { to: 'pa' }),
    ] },
  ] },
];
const mgStolen = mg([
  { split: () => ({ pa: mgStolenA, pb: mgStolenB }), watch: () => 'pb', hold: () => ({ pa: 'Waiting for Brooke', pb: 'Waiting for Justin' }) },
  { fn: (f) => mgEnd(f.home ? 'Gone home' : 'On his way',
    f.help ? 'Brooke got one word out. Someone else wrote the rest.' : 'Brooke never wrote that text.') },
]);

// ---------- 7. the guide: Justin sees the plan, Brooke only sees his texts ----------
const mgGuideA = [   // Justin, the plan on his phone
  scene('plan', {}), { cam: 'wide', at: 960 }, { fade: 'in', ms: 500 },
  narr('Brooke is lost in the basement. You have the plan. He only has your texts.'),
  { by: 'pa', choice: [
    { t: 'Text: “left”', intent: 'left', then: [sms('pa', 'pb', 'left')] },
    { t: 'Text: “right”', intent: 'right', then: [sms('pa', 'pb', 'right')] },
  ] },
  { mark: 'j1' },
  hush(800),
  { by: 'pa', choice: [
    { t: 'Text: “then left”', intent: 'then left', then: [sms('pa', 'pb', 'then left')] },
    { t: 'Text: “then right”', intent: 'then right', then: [sms('pa', 'pb', 'then right')] },
  ] },
  { mark: 'j2' },
];
const mgGuideB = [   // Brooke, in the dark
  scene('corridor', { pb: 'drunk_listen' }), { cam: 'wide', at: 960 }, { fade: 'in', ms: 500 },
  narr('The basement. Pitch dark. Two doors. Your battery’s at 3%.'),
  { waitMark: 'j1' }, one('pb'), { check: 'pb' }, hush(600),
  { by: 'pb', choice: [
    { t: 'Left door.', intent: 'left', set: { j1: 'l' }, then: [narr('Another corridor. Two more doors.')] },
    { t: 'Right door.', intent: 'right', set: { j1: 'r' }, then: [narr('Another corridor. Two more doors.')] },
  ] },
  { waitMark: 'j2' }, { check: 'pb' }, hush(600),
  { by: 'pb', choice: [
    { t: 'Left door.', intent: 'left', set: { j2: 'l' }, then: [] },
    { t: 'Right door.', intent: 'right', set: { j2: 'r' }, then: [] },
  ] },
];
const mgGuide = mg([
  { split: () => ({ pa: mgGuideA, pb: mgGuideB }), watch: () => 'pb', hold: () => ({ pa: 'Brooke is walking', pb: 'Waiting for Justin' }) },
  { fn: (f) => (f.j1 === 'l' && f.j2 === 'r' ? mgEnd('Out', 'Left, then right. You got him out.') : mgEnd('Dead end', 'The way out was left, then right.')) },
]);

window.GAMES = { secret: mgSecret, versions: mgVersions, rat: mgRat, argue: mgArgue, call: mgCall, stolen: mgStolen, guide: mgGuide };
window.GAME_LIST = [
  { id: 'secret', name: 'Le secret' },
  { id: 'versions', name: 'Deux versions' },
  { id: 'rat', name: 'Couvrir ou balancer' },
  { id: 'argue', name: 'Qui on aide?' },
  { id: 'call', name: 'L’appel' },
  { id: 'stolen', name: 'Le cell volé' },
  { id: 'guide', name: 'Le guide' },
];
