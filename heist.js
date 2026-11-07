// Floor 31 — the heist demo's beginning (07/11), in text only: no pictures yet, each moment is said in a line (what we'd
// see, show don't tell), on dark decors with just the elevator's floor dots. 2 players: Marcus (pa, the dad: his kids on his
// lock screen, his wife texting) and Ray (pb, sure of himself, nothing at home). The lobby, the escalator, the elevator up to
// 31; Double It comes in low as the masks come out, goes up a little with every floor, and the doors open on its drop.
// It teaches the game as it goes: first just watch; then a private text on Marcus's phone and his reply (no clock); then
// Ray picks Marcus's mask (the first clock, a long one). Loaded after story.js and bar.js (scene, narr, R).
(() => {
  const BG = (c) => [R(0, 0, 1920, 1080, c)];
  SCENES.h_lobby = { size: [1920, 1080], spots: {}, face: {}, ambience: 'crowd', back: BG('#0f1620'), front: [] };
  SCENES.h_escalator = { size: [1920, 1080], spots: {}, face: {}, ambience: 'crowd', back: BG('#121821'), front: [] };
  // the elevator: the floor dots over the doors (n lit), the doors shut (or open: a line of light between them)
  const DOTS = 6;
  const elev = (n, open = false) => ({ size: [1920, 1080], spots: {}, face: {}, front: [],
    back: [
      ...BG('#101114'), R(560, 300, 800, 780, '#1a1c21'),
      R(640, 360, 316, 720, '#24272d', { line: '6px solid #2e3239' }), R(964, 360, 316, 720, '#24272d', { line: '6px solid #2e3239' }),
      ...(open ? [R(940, 360, 40, 720, '#fff3cf', { glow: '0 0 140px 60px rgba(255,236,190,.35)' })] : []),
      R(760, 200, 400, 70, '#0a0b0d', { r: 35 }),
      ...Array.from({ length: DOTS }, (_, i) => R(800 + i * 60, 222, 26, 26, i < n ? '#ff3b30' : '#2a2c31',
        { r: 13, ...(i < n ? { glow: '0 0 24px 6px rgba(255,59,48,.55)' } : {}) })),
    ] });
  for (let n = 0; n <= DOTS; n++) SCENES['h_elev' + n] = elev(n);
  SCENES.h_open = elev(DOTS, true);

  const at = (id) => [scene(id, {}), { cam: 'wide', at: 960 }];   // a place, the camera on all of it
  const story = Object.assign([
    // ---- the lobby: just watch (nothing to tap). Curiosity, then what they want, then what he has to lose ----
    ...at('h_lobby'), { fade: 'in', ms: 1200 }, { caption: 'Halden Tower · 11:56 AM' },
    narr('A glass lobby at noon. Coffee cups, lanyards, a hundred people running late.'),
    narr('In the middle of it, two men in suits at a low table. Nobody looks at them twice.'),
    narr('Ray writes on a napkin: 3,200,000. He slides it across.'),
    narr('Marcus stares at it. Under it, he writes: ÷ 2.'),
    narr('Ray grins.'),
    narr('Marcus checks the time. His lock screen: two little kids in Halloween costumes, a dinosaur and a bee. 11:58.'),
    narr('He looks at it one second too long. Ray sees. Ray looks away.'),
    // ---- the escalator: the laugh ----
    ...at('h_escalator'),
    narr('The escalator up to the elevators.'),
    narr('Coming down the other side, a little girl waves at them.'),
    narr('Marcus waves back without thinking. Ray slaps his hand down.'),
    narr('She keeps waving. Ray gives up. He waves back.'),
    // ---- the elevator: the lobby's noise cut off; a private text and its reply (the first choice: no clock) ----
    { fade: 'out', ms: 500 }, ...at('h_elev0'), { fade: 'in', ms: 600 },
    narr('The doors close. The noise of the lobby is gone.'),
    narr('Ray presses 31.'),
    { hush: 1400 },
    { narr: 'Marcus’s phone lights up in his hand. “Babe ❤️: Mia’s recital is at 6. You promised.”', only: 'pa' },
    { by: 'pa', clock: 0, choice: [
      { t: '❤️ I’ll be there.', intent: 'promises', set: { wife: 'promise' }, then: [
        narr('He types it. Sends it. Holds the phone face down against his leg.') ] },
      { t: 'Can’t talk now.', intent: 'cuts it short', set: { wife: 'busy' }, then: [
        narr('He sends it. Three dots appear on his screen. Then they’re gone.') ] },
      { t: 'Leave it on read.', intent: 'ignores it', set: { wife: 'read' }, then: [
        narr('He locks the screen. It lights up again. He doesn’t look.') ] },
    ] },
    // ---- the masks: Double It comes in low; Ray picks for Marcus (the first clock, a long one) ----
    { music: 'double it', lv: 0, vol: .5, ms: 3000 },
    narr('Ray unzips a gym bag. Two masks: a pig and a clown. And something heavy, wrapped in a towel.'),
    { by: 'pb', clock: 20000, choice: [
      { t: 'Give him the pig.', intent: 'the pig', set: { mask: 'pig', mine: 'clown' }, then: [
        narr('Ray holds out the pig. Marcus looks at it. Ray keeps the clown.') ] },
      { t: 'Give him the clown.', intent: 'the clown', set: { mask: 'clown', mine: 'pig' }, then: [
        narr('Ray holds out the clown. Marcus looks at it. Ray keeps the pig.') ] },
    ] },
    // ---- the floors: a dot a bar, the music a little louder each time; nobody talks ----
    { music: 'double it', vol: .6, ms: 1200 }, { bars: 1 }, ...at('h_elev1'),
    { music: 'double it', vol: .7, ms: 1200 }, { bars: 1 }, ...at('h_elev2'),
    narr('Nobody talks anymore.'),
    { music: 'double it', vol: .78, ms: 1200 }, { bars: 1 }, ...at('h_elev3'),
    { music: 'double it', vol: .86, ms: 1200 }, { bars: 1 }, ...at('h_elev4'),
    { fn: (f) => [narr(f.wife === 'read' ? 'Marcus’s phone lights up again. He turns it over: the dinosaur and the bee. He puts it away.'
      : 'Marcus looks at his lock screen one last time. The dinosaur and the bee. He puts it away.')] },
    { music: 'double it', vol: .93, ms: 1200 }, { bars: 1 }, ...at('h_elev5'),
    { fn: (f) => [narr(`Floor 30. They put the masks on. The ${f.mask} isn’t funny anymore.`)] },
    // ---- 31: the reverse boom swells over the last bars, the doors open on the drop ----
    { music: 'double it', lv: 1, vol: 1, ms: 2400, inBars: 2 }, { bars: 'drop' },
    ...at('h_open'),
    narr('Ding. 31. The doors open.'),
    { bars: 2 }, { music: null, ms: 120 },
    { fade: 'out', ms: 300 },
    { fn: (f) => [{ end: {
      kicker: 'The beginning', title: 'Floor 31',
      lede: [
        f.wife === 'promise' ? 'Marcus promised he’d be at the recital at 6.' : f.wife === 'busy' ? 'Marcus told his wife he couldn’t talk.' : 'Marcus left his wife on read.',
        `He walked out of the elevator in a ${f.mask} mask. Ray picked it.`,
      ].join(' '), art: null } }] },
  ], {
    gaze: false, credits: '', title: 'Floor 31', auto: true,   // the story plays itself: each line moves on after its reading time, a tap moves it on sooner; choices still wait
    intro: ['Halden Tower, downtown. A Tuesday, just before noon.', 'Two men in suits are about to make 3.2 million dollars.'],
    seats: ['pa', 'pb'], solo: { pa: 'Marcus', pb: 'Ray' },
    pick: { pa: { pose: 'listen', line: 'Mia’s recital is at 6.' }, pb: { pose: 'listen', line: '3,200,000.' } },
    cast: {
      pa: { name: 'Marcus', color: '#2a6f97', sprite: 'justin' },
      pb: { name: 'Ray', color: '#9a3b3b', sprite: 'james' },
    },
  });
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), d_heist: story };
})();
