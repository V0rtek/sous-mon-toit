// The Pirate's Oath — the Spark pitch's TV demo (02/11), made with what exists: Lily (pa, the first volunteer's perso), the
// pirate, Justin (pb, the one who walks in later: [Y]), the tavern's counter. ~3 min, 2 players, in English.
// It follows the five beats of the deck (deck.js, « Démo · télé »): 1 the hook, 2 suspense up to a choice, 3 the plot
// twist (Lily is given the power over the story: the crew does what she says), 4 the stakes rise (a new perso walks in),
// 5 the plot twist: it's multiplayer, the choice that counts is made by someone else in the room. Good enough to show;
// a pose or a line that is off gets fixed here, nothing else depends on it. Loaded after story.js (SCENES, say, narr…).
(() => {
  const B = SCENES.taverne_bar;
  // the counter, three side by side in depth, the pirate nearest the camera, Lily next, the stranger at the far end
  SCENES.p_bar = { ...B, spots: { pirate: B.spots.justin, pa: B.spots.melissa, pb: B.spots.candy }, face: { pirate: 'r', pa: 'r', pb: 'r' } };
  const on = (who) => ({ cam: 'close', who: [who] });
  const hush = (ms = 900) => ({ hush: ms });

  const story = Object.assign([
    // ---- 1. the hook: impress them, make them lean in ----
    scene('p_bar', { pirate: 'bar', pa: 'bar' }), { cam: 'wide', at: 900 }, { fade: 'in', ms: 800 }, { caption: 'The Salted Anchor · midnight' }, hush(900),
    on('pirate'), say('pirate', 'bar_stare', 'Three years I kept that stool warm.', { to: 'pa' }),
    hush(700), say('pirate', 'bar_to_talk', 'Not for just anyone.', { to: 'pa' }),
    on('pa'), say('pa', 'bar_to_tense', 'You’ve got the wrong person.', { to: 'pirate' }),
    on('pirate'), say('pirate', 'bar_laugh', 'Ha! They all say that.'),
    say('pirate', 'bar_slide', 'Your mug. Same as the last time. Drink.', { to: 'pa' }),
    // ---- 2. the suspense: a choice is coming and the room wants to know ----
    on('pirate'), say('pirate', 'bar_to_anger', 'The captain’s dead. And he left your name on the map.', { to: 'pa' }),
    { hold: { pa: 'wanted' } }, on('pa'), { say: 'pa', pose: 'hold_front', text: 'This is… me. Wanted.' },
    hold0('pa'), hush(1100),
    on('pirate'), say('pirate', 'bar_stare', 'Midnight bells in a minute. The crew will want an answer.'),
    { by: 'pa', choice: [
      { t: 'Take the oath.', intent: 'takes it', set: { oath: 'take' }, then: [
        on('pa'), say('pa', 'bar_to_smile', 'Fine. If it’s my name, it’s my ship.', { to: 'pirate' }),
        on('pirate'), say('pirate', 'bar_toast', 'That’s the one I kept the stool for.') ] },
      { t: 'Ask who sold you.', intent: 'digs', set: { oath: 'ask' }, then: [
        on('pa'), say('pa', 'bar_to_tense', 'Who put my name on that map?', { to: 'pirate' }),
        on('pirate'), say('pirate', 'bar_drink', '…'), say('pirate', 'bar_back', 'Someone at this counter.') ] },
      { t: 'Walk out.', intent: 'runs', set: { oath: 'leave' }, then: [
        on('pa'), say('pa', 'bar_back', 'Not tonight.', { to: 'pirate' }),
        on('pirate'), say('pirate', 'bar_slump', 'The door’s locked. It’s been locked since you walked in.') ] },
    ] },
    // ---- 3. the plot twist: the story is hers, the crew does what she says ----
    { cam: 'wide', at: 900 }, narr('Behind them, forty pirates stand up. Every chair scrapes at once.'), hush(900),
    on('pirate'), say('pirate', 'bar_back', 'Look at them. They’re waiting on you.', { to: 'pa' }),
    say('pirate', 'bar_to_talk', 'Whatever you say next, the crew does. That’s the oath.', { to: 'pa' }),
    { hold: { pa: 'parchemin' } }, on('pa'), { say: 'pa', pose: 'hold_raise', text: 'One word. And they do it?' },
    hold0('pa'),
    on('pirate'), say('pirate', 'bar_smile', 'One word, Captain.'),
    { by: 'pa', choice: [
      { t: 'Spare him.', intent: 'forgives', set: { cmd: 'spare' }, then: [
        on('pa'), say('pa', 'bar_ahead', 'Nobody touches him. He’s with me.'),
        { cam: 'wide', at: 900 }, narr('The crew sits back down, one by one. Nobody says a thing.') ] },
      { t: 'Sail at dawn.', intent: 'commands', set: { cmd: 'sail' }, then: [
        on('pa'), say('pa', 'bar_ahead', 'We sail at dawn. Everyone aboard.'),
        { cam: 'wide', at: 900 }, narr('Forty fists hit the counter at once. The mugs jump.') ] },
      { t: 'Burn the map.', intent: 'destroys', set: { cmd: 'burn' }, then: [
        on('pa'), say('pa', 'bar_ahead', 'Burn it. All of it.'),
        { cam: 'wide', at: 900 }, narr('The map curls in the lantern. Somebody at the back swears.') ] },
    ] },
    // ---- 4. the stakes rise: the consequences, a new face ----
    hush(900), on('pirate'), say('pirate', 'bar_stare', 'Then it’s done. And it’s on you.', { to: 'pa' }),
    narr('The door opens. A draft. Every candle leans the same way.'),
    { enter: { pb: 'bar' } }, { cam: 'three', who: ['pirate', 'pa', 'pb'] }, hush(1100),
    on('pb'), say('pb', 'bar_talk', 'Sorry. Is this the Salted Anchor?'),
    on('pirate'), say('pirate', 'bar_to_anger', 'Who let you in?', { to: 'pb' }),
    on('pa'), say('pa', 'bar_to_listen', 'He’s not one of yours?', { to: 'pirate' }),
    on('pirate'), say('pirate', 'bar_stare', 'No. And nobody walks in here by accident.'),
    // ---- 5. the plot twist: it's multiplayer. The choice that counts belongs to someone else in the room ----
    hush(900), narr('He’s holding the other half of the map. And he knows exactly what it says.', ),
    on('pb'), say('pb', 'bar_to_talk', 'I came for her.', { to: 'pa' }),
    { by: 'pb', choice: [
      { t: 'Vouch for her.', intent: 'trusts her', set: { last: 'vouch' }, then: [
        on('pb'), say('pb', 'bar_to_smile', 'She’s who she says she is. I’d bet the ship on it.', { to: 'pirate' }),
        on('pirate'), say('pirate', 'bar_smile', '…The ship. Hm. Fair.') ] },
      { t: 'Sell her out.', intent: 'betrays her', set: { last: 'sell' }, then: [
        on('pb'), say('pb', 'bar_to_tense', 'She’s the one who sold the captain. Ask her.', { to: 'pirate' }),
        on('pa'), say('pa', 'bar_back', 'That’s not— I didn’t—'),
        on('pirate'), say('pirate', 'bar_to_anger', 'Is that true, Captain?', { to: 'pa' }) ] },
    ] },
    hush(1200),
    { fade: 'out', ms: 1400 },
    { fn: (f) => [{ end: {
      kicker: 'Episode 1', title: 'The Pirate’s Oath',
      lede: [
        f.oath === 'take' ? 'Lily took the oath.' : f.oath === 'ask' ? 'Lily wanted to know who sold her.' : 'Lily tried to leave.',
        f.cmd === 'spare' ? 'She spared him.' : f.cmd === 'sail' ? 'She ordered the crew to sail at dawn.' : 'She burned the map.',
        f.last === 'vouch' ? 'The stranger vouched for her.' : 'The stranger sold her out.',
      ].join(' '), art: null } }] },
  ], {
    gaze: true, credits: '', title: 'The Pirate’s Oath',
    intro: ['The Salted Anchor, a harbour tavern, just before midnight.', 'The captain is dead. A map with a name on it is going around the counter.',
      'A pirate has kept a stool warm for someone for three years.'],
    seats: ['pa', 'pb'], solo: { pa: 'Lily', pb: 'The stranger' },
    pick: { pa: { pose: 'listen', line: 'You’ve got the wrong person.' }, pb: { pose: 'listen', line: 'Sorry. Is this the Salted Anchor?' } },
    cast: {
      pa: { name: 'Lily', color: '#c0392b', sprite: 'lily' },
      pb: { name: 'The stranger', color: '#1f7a74', sprite: 'justin' },
      pirate: { name: 'The pirate', color: '#8e1b1b', sprite: 'pirate' },
    },
  });
  function hold0(who) { return { hold: { [who]: null } }; }
  window.DEMO_STORIES = { ...(window.DEMO_STORIES || {}), d_pirate: story };
})();
