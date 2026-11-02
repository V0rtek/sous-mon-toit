// Test — one short 2-player story that runs through (almost) every system of the engine, clean enough for a class:
// Justin and Brooke (Last call's), the stranger, an interrogation room at 2 a.m. In order: the caption, the camera
// (wide, three, two, one, the reveal toes to head), silences, a choice each, a private text (only Brooke reads it) and
// a line only one player sees, two versions (each one is told something different), cover or rat in two separate
// rooms (split), a text from one room to the other (mark / waitMark), a slate, an incoming call (ring) and the call
// itself (call), a choice made at the same time by both, the end that reads every choice, the episode's end (the
// actor you win) and the end card. Loaded after games.js (its rooms, R, one, two, hush, sms).
(() => {
  const D = window.DEMO_STORIES = window.DEMO_STORIES || {};
  const N = { pa: 'Justin', pb: 'Brooke' }, other = (k) => (k === 'pa' ? 'pb' : 'pa');

  // ---------- decors ----------
  // the interrogation room (games.js), the two of them side by side behind the table, the stranger facing them
  SCENES.t_room = { size: SCENES.room.size, back: SCENES.room.back, front: SCENES.room.front,
    spots: { pa: [600, 1150, 690], pb: [880, 1150, 690], suit: [1360, 1150, 720] }, face: { pa: 'r', pb: 'r', suit: 'l' } };
  // the call, split screen: room 1 on the left (Justin, still inside), the corridor on the right (Brooke, let out)
  SCENES.t_call = { size: [1920, 1240], spots: { pa: [480, 1180, 700], pb: [1440, 1180, 700] }, face: { pa: 'r', pb: 'l' },
    back: [
      R(0, 0, 960, 1240, '#23262b'), R(0, 860, 960, 380, '#1a1c20'), R(560, 260, 340, 300, '#0d1117', { line: '14px solid #3a3f47' }),
      R(478, 0, 4, 200, '#0a0b0d'), R(410, 200, 140, 44, '#2f3238', { r: '70px 70px 6px 6px' }),
      R(436, 240, 88, 12, '#fff3cf', { r: 6, glow: '0 0 100px 50px rgba(255,236,190,.25)' }),
      R(960, 0, 960, 1240, '#0d0f12'), R(1100, 300, 200, 640, '#3a2f26', { line: '10px solid #241c16' }),
      R(1580, 300, 200, 640, '#3a2f26', { line: '10px solid #241c16' }), R(1420, 150, 40, 16, '#ffe9b0', { r: 8, glow: '0 0 80px 30px rgba(255,233,176,.22)' }),
      R(954, 0, 12, 1240, '#000'),
    ], front: [] };

  // ---------- cover or rat, then a text through the wall: each player in his own room, neither sees the other ----------
  const room = (k) => [
    { slate: k === 'pa' ? 'Room 1. Brooke is in room 2.' : 'Room 2. Justin is in room 1.' },
    scene('room', { [k]: k === 'pa' ? 'drunk_listen' : 'nervous', suit: 'listen' }), two(k, 'suit'), { fade: 'in', ms: 500 }, hush(900),
    one('suit'), say('suit', 'offer', `${N[other(k)]} says it was you. Say it was him, and you walk out of here.`, { to: k }),
    one(k), hush(1200),
    { by: k, choice: [
      { t: 'Cover for him.', intent: 'covers', set: { [k]: 'couvre' }, then: [say(k, k === 'pa' ? 'drunk_serious' : 'thinking', `${N[other(k)]} didn't take anything.`, { to: 'suit' })] },
      { t: 'Rat him out.', intent: 'rats', set: { [k]: 'balance' }, then: [say(k, 'drunk_sad', `…It was ${N[other(k)]}.`, { to: 'suit' })] },
    ] },
    one('suit'), hush(700),
    ...(k === 'pa' ? [
      // Justin: the stranger steps out, his phone is still on the table — one text to Brooke
      say('suit', 'adjust', 'I\'ll be right back.', { to: 'pa' }), { exit: 'suit' },
      one('pa'), narr('Your phone is still on the table. One minute, no more.'),
      { by: 'pa', choice: [
        { t: 'Text: “He’s not a cop.”', intent: 'warns', set: { warn: true }, then: [sms('pa', 'pb', 'He’s not a cop. Say nothing.')] },
        { t: 'Text: “Tell the truth.”', intent: 'honest', set: { warn: false }, then: [sms('pa', 'pb', 'Tell him the truth. We didn’t do anything.')] },
      ] },
      { mark: 'texte' },
      hush(600), narr('The door opens again. The stranger has a sheet of paper in his hand.'),
    ] : [
      // Brooke: his phone buzzes in his pocket, he reads it once Justin has written
      say('suit', 'listen', 'Your friend talks more than you do.', { to: 'pb' }),
      { waitMark: 'texte' },
      one('pb'), hush(500), { check: 'pb' }, hush(800),
      { when: (f) => f.warn, then: [{ ...think('pb', 'Not a cop? He never showed me a badge.'), only: 'pb' }],
        else: [{ ...think('pb', 'The truth. Easy to say, with Cam’s text in my pocket.'), only: 'pb' }] },
    ]),
  ];

  // ---------- the call: Justin is kept, Brooke is let out into the corridor; Justin calls or texts, Brooke answers or not ----------
  const callA = [
    scene('room', { pa: 'drunk_listen' }), one('pa'), { fade: 'in', ms: 400 }, hush(600),
    narr('Brooke is out. You, they’re still keeping.'),
    { by: 'pa', choice: [
      { t: 'Call Brooke.', intent: 'calls', set: { call: true }, then: [{ poses: { pa: 'texting' } }] },
      { t: 'Text him.', intent: 'texts', set: { call: false }, then: [sms('pa', 'pb', 'Where are you? Wait for me.')] },
    ] },
    { mark: 'decide' },
    { when: (f) => f.call, then: [narr('It’s ringing…')] },
    { waitMark: 'repond' },
    { when: (f) => f.call && !f.answered, then: [hush(1400), narr('Voicemail.')] },
  ];
  const callB = [
    scene('corridor', { pb: 'nervous' }), { cam: 'wide', at: 960 }, { fade: 'in', ms: 400 }, hush(700),
    narr('A corridor. Two doors. Nobody to tell you which one is the way out.'),
    { waitMark: 'decide' },
    { when: (f) => f.call, then: [
      { by: 'pb', ring: 'Justin', choice: [
        { t: 'Answer', intent: 'answers', set: { answered: true }, then: [] },
        { t: 'Decline', intent: 'declines', set: { answered: false }, then: [narr('You let it ring.')] },
      ] },
    ], else: [{ check: 'pb' }, hush(900)] },
    { mark: 'repond' },
  ];

  // ---------- the last choice, made at the same time: leave now, or wait for the other one ----------
  const last = (k) => [{ by: k, choice: [
    { t: 'Leave right now.', intent: 'leaves', set: { ['f' + k]: 'part' }, then: [] },
    { t: `Wait for ${N[other(k)]}.`, intent: 'waits', set: { ['f' + k]: 'attend' }, then: [] },
  ] }];
  // what the stranger makes of the two rooms, then of the two doors
  function ending(f) {
    const rat = f.pa === 'balance' ? 'Justin' : 'Brooke', kept = f.pa === 'balance' ? 'Brooke' : 'Justin';
    const verdict = f.pa === f.pb ? (f.pa === 'couvre' ? 'Neither of you talked. That’s rare.' : 'You sold each other out. In ten seconds.') : `${rat} talked. ${kept} didn’t.`;
    const steps = [one('suit'), hush(900), say('suit', 'listen', verdict, { to: 'pa' })];
    if (f.fpa === 'attend' && f.fpb === 'attend') steps.push(
      two('pa', 'pb'), narr('Nobody took the door. You’re both still here.'),
      one('suit'), say('suit', 'adjust', 'There never was a briefcase.', { to: 'pa' }),
      one('pa'), say('pa', 'angry', 'Excuse me?', { to: 'suit' }),
      one('suit'), say('suit', 'offer', 'I was looking for two people who wait for each other. I’ll call you.', { to: 'pb' }), { exit: 'suit' },
      { set: { title: 'Recruited' } });
    else if (f.fpa === 'part' && f.fpb === 'part') steps.push(
      { fade: 'out', ms: 500 }, scene('t_room', { suit: 'listen' }), one('suit'), { fade: 'in', ms: 500 },
      narr('Two doors slam. The stranger pulls a briefcase out from under the table.'),
      say('suit', 'adjust', 'Too bad.'),
      { set: { title: 'Two doors' } });
    else {
      const w = f.fpa === 'attend' ? 'pa' : 'pb';
      steps.push(
        { exit: other(w) }, one(w), narr(`${N[other(w)]} is already gone. ${N[w]} waits alone.`),
        one('suit'), say('suit', 'listen', `He didn’t wait for you. You waited for him. Remember that.`, { to: w }),
        { set: { title: 'Every man for himself' } });
    }
    return steps;
  }

  D.d_test = Object.assign([
    // the room: both of them, the stranger, a man nobody asked for a badge
    scene('t_room', { pa: 'drunk_listen', pb: 'nervous', suit: 'listen' }),
    { cam: 'wide', at: 980 }, { fade: 'in', ms: 900 },
    { caption: 'Precinct 12 · 2:14 a.m.' },
    narr('A room with no window. A lamp. A mirror that isn’t one.'),
    { reveal: 'suit', ms: 1600 },
    say('suit', 'adjust', 'Gentlemen. Thank you for coming.', { to: 'pa' }),
    one('pa'), say('pa', 'drunk_serious', 'We didn’t really have a choice.', { to: 'suit' }),
    one('suit'), say('suit', 'listen', 'A briefcase went missing from the Larina tonight. You were the last ones at the bar.', { to: 'pa' }),
    cam('three', 'pa', 'pb', 'suit'), say('pb', 'thinking', 'A briefcase? We didn’t even see a briefcase.', { to: 'suit' }),
    one('suit'), say('suit', 'offer', 'Then this will be quick. Your phones on the table.', { to: 'pb' }),
    one('pa'),
    { by: 'pa', choice: [
      { t: 'Put his phone down.', intent: 'cooperates', set: { badge: false }, then: [say('pa', 'explaining', 'Here. I’ve got nothing to hide.', { to: 'suit' })] },
      { t: 'Ask for his badge.', intent: 'suspicious', set: { badge: true }, then: [
        say('pa', 'angry', 'Your badge first.', { to: 'suit' }),
        one('suit'), hush(1300), say('suit', 'adjust', 'Later.', { to: 'pa' }),
      ] },
    ] },
    // the secret: a text only Brooke reads; Justin only sees him read it
    one('pb'), hush(600),
    { sms: { from: 'cam', to: 'pb', text: 'Don’t say anything about the briefcase. I’ll explain tomorrow. — Cam', only: 'pb' } },
    hush(700), { check: 'pb' }, hush(900),
    { narr: 'Brooke reads a text. His face changes.', only: 'pa' },
    { ...think('pb', 'Cam. Cam knows something.'), only: 'pb' },
    { by: 'pb', choice: [
      { t: 'Flip his phone over.', intent: 'hides it', set: { secret: false }, then: [{ poses: { pb: 'nervous' } }, narr('Screen down on the table.')] },
      { t: 'Show Justin the text.', intent: 'tells all', set: { secret: true }, then: [
        say('pb', 'drunk_talk', 'Justin. Look at this.', { to: 'pa' }),
        one('pa'), say('pa', 'phone_shock', '…Cam ?', { to: 'pb' }),
      ] },
    ] },
    // two versions: on his way up, the stranger tells each one something different
    one('suit'), say('suit', 'listen', 'We’ll do this one at a time.', { to: 'pa' }),
    { narr: 'As he gets up, the stranger whispers, just to you: “Brooke already confessed everything.”', only: 'pa' },
    { narr: 'As he gets up, the stranger whispers, just to you: “Justin already confessed everything.”', only: 'pb' },
    { fade: 'out', ms: 600 },
    { split: () => ({ pa: room('pa'), pb: room('pb') }), watch: () => 'pa',
      hold: () => ({ pa: 'Brooke is still in the other room', pb: 'Justin is still in the other room' }) },
    { fade: 'out', ms: 500 },
    { split: () => ({ pa: callA, pb: callB }), watch: () => 'pb', hold: () => ({ pa: 'Waiting for Brooke', pb: 'Waiting for Justin' }) },
    { when: (f) => f.call && f.answered, then: [
      // the call: each phone sees only its own player, the other one is a voice
      { fade: 'out', ms: 400 }, scene('t_call', { pa: 'texting', pb: 'texting' }), { call: { watch: 'pb' } }, one('pa'), { fade: 'in', ms: 400 },
      say('pa', 'texting', 'Brooke. Did he show you a badge?'),
      one('pb'), hush(900), say('pb', 'texting', '…No. Never.'),
      one('pa'), say('pa', 'texting', 'Me neither.'),
      one('pb'), hush(800), { call: false }, narr('A door opens at the end of the corridor.'),
    ] },
    // back in the room, both of them: the doors
    { fade: 'out', ms: 600 }, scene('t_room', { pa: 'drunk_listen', pb: 'nervous', suit: 'listen' }), cam('three', 'pa', 'pb', 'suit'), { fade: 'in', ms: 600 },
    one('suit'), say('suit', 'adjust', 'You can go. One door each.', { to: 'pa' }),
    say('suit', 'offer', 'Whoever leaves now never sees this room again. Whoever waits for the other… we’ll see.', { to: 'pb' }),
    two('pa', 'pb'), narr('You choose at the same time. Neither of you sees the other’s choice.'),
    { split: () => ({ pa: last('pa'), pb: last('pb') }), watch: () => 'pa', hold: () => ({ pa: 'Brooke is choosing', pb: 'Justin is choosing' }) },
    { fn: ending },
    { episode: { n: 1, win: { sprite: 'suit', pose: 'adjust', name: 'The stranger' } } },
    { fade: 'out', ms: 1600 },
    { end: { kicker: 'End of episode 1', title: '{TITLE}', lede: '{LEDE}', art: null } },
  ], {
    gaze: true, credits: '', title: 'Test',
    // the TV's opening (before the first scene): what's going on, for a room that doesn't see the phones
    intro: ['2 a.m. A briefcase went missing from the Larina bar.', 'Justin and Brooke were the last customers. A man in a suit took them to a room with no window.',
      'He says he’s a cop. He hasn’t shown anyone a badge.'],
    seats: ['pa', 'pb'], solo: { pa: 'Justin', pb: 'Brooke' },
    pick: { pa: { pose: 'drunk_serious', line: 'We didn’t really have a choice.' }, pb: { pose: 'nervous', line: 'A briefcase? We didn’t even see a briefcase.' } },
    cast: {
      pa: { name: 'Justin', color: '#1f7a74', sprite: 'justin_bar' },
      pb: { name: 'Brooke', color: '#2a4f8f', sprite: 'brooke' },
      suit: { name: 'The stranger', color: '#26262b', sprite: 'suit' },
      cam: { name: 'Cam', color: '#3b1f6e', sprite: 'cam', scale: 0.95 },
    },
    words: {
      TITLE: (f) => f.title || 'Test',
      LEDE: (f) => [
        f.badge ? 'Justin asked for a badge. He never saw it.' : 'Justin put his phone down without asking questions.',
        f.secret ? 'Brooke showed Cam’s text.' : 'Brooke kept Cam’s text to himself.',
        f.pa === f.pb ? (f.pa === 'couvre' ? 'Neither ratted the other out.' : 'Each ratted the other out.') : `${f.pa === 'balance' ? 'Justin' : 'Brooke'} ratted the other out.`,
      ].join(' '),
    },
  });
})();
