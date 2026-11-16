// ---- Créer · the test stories (16/11): states of Créer (smt-forge2) made on purpose, each one to stress one thing:
// T1 the example's skeleton without its written words · T2 a whodunit (a murder, a secret that is its motive, a letter
// from the victim, a rival who looks guilty) · T3 a disappearance (a map, a secret) · T4 a death threat and a triangle ·
// T5 almost nothing · T6 heavy (4 people, 3 events, 4 infos, everything that makes it hard) · A1 to A4: two acts.
// Read by regress.js; to read one as a writer: load it in localStorage 'smt-forge2', open Créer, 📄 Copier le plot ----
const base = { decor: 'taverne', flaw: {}, want: {}, rel: {}, infos: [], ev: [], hard: {}, tq: {}, picked: {} };
const T = {
  // 1. the example's skeleton without its hand-written words
  T1_exemple_sans_mots: { ...base, cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['charmeur', 'genie'], ruby: ['mysterieux'], amare: ['chef', 'charmeur'], melissa: ['protecteur'] }, flaw: { justin: 'lache' }, want: { justin: { v: 'love', t: 'ruby' }, amare: { v: 'love', t: 'ruby' } }, rel: { 'amare|ruby': 'couple', 'justin|melissa': 'friend' }, ev: [{ k: 'arrive', x: 'amare' }, { k: 'theft', x: 'amare', v: 'melissa', s: null, h: 1 }], hard: { liked: 1 } },
  // 2. whodunit: a murder, hidden culprit, a secret, an object, a past
  T2_meurtre: { ...base, cast: ['ruby', 'amare', 'melissa', 'james'], pil: { justin: ['genie'], ruby: ['mysterieux'], amare: ['dangereux'], melissa: ['protecteur'], james: ['chef'] }, want: { justin: { v: 'protect', t: 'melissa' }, ruby: { v: 'hide' } }, rel: { 'justin|melissa': 'family', 'amare|james': 'rival', 'justin|ruby': 'crush' }, infos: [{ id: 'betray', x: 'ruby', y: 'james' }, { id: 'letter', x: 'james', y: 'melissa' }, { id: 'saved', x: 'amare', y: 'justin' }], ev: [{ k: 'murder', x: 'ruby', v: 'james', s: 'justin', h: 1 }], hard: { clock: 1, gag: 1 } },
  // 3. a disappearance
  T3_disparition: { ...base, cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['outsider'], ruby: ['mysterieux'], amare: ['chef'], melissa: ['clown'] }, want: { justin: { v: 'find', t: 'ruby' }, ruby: { v: 'free' }, amare: { v: 'oust', t: 'justin' } }, rel: { 'justin|ruby': 'couple', 'justin|melissa': 'friend' }, infos: [{ id: 'leaving', x: 'ruby' }, { id: 'map', x: 'ruby' }], ev: [{ k: 'gone', x: 'ruby' }], hard: { danger: 1, clock: 1 } },
  // 4. a death threat + triangle
  T4_menace: { ...base, cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['protecteur'], ruby: ['charmeur'], amare: ['dangereux'], melissa: ['outsider'] }, flaw: { justin: 'colere' }, want: { justin: { v: 'love', t: 'ruby' }, melissa: { v: 'love', t: 'justin' } }, rel: { 'justin|melissa': 'friend', 'amare|ruby': 'ex' }, infos: [{ id: 'spy', x: 'melissa', y: 'amare' }], ev: [{ k: 'arrive', x: 'amare' }, { k: 'threat', x: 'amare', v: 'ruby' }], hard: { liked: 1 } },
  // 5. minimal
  T5_minimal: { ...base, cast: ['ruby'], pil: { justin: ['clown'], ruby: ['chef'] }, want: { justin: { v: 'win' } }, rel: {}, ev: [] },
  // 6. heavy: 3 events, 3 infos, all hard
  T6_charge: { ...base, cast: ['ruby', 'amare', 'melissa', 'james'], pil: { justin: ['charmeur'], ruby: ['mysterieux'], amare: ['chef'], melissa: ['protecteur'], james: ['clown'] }, flaw: { justin: 'menteur' }, want: { justin: { v: 'love', t: 'ruby' }, amare: { v: 'love', t: 'ruby' }, james: { v: 'win' }, melissa: { v: 'protect', t: 'james' } }, rel: { 'amare|ruby': 'couple', 'justin|melissa': 'friend', 'james|melissa': 'family', 'amare|james': 'rival' }, infos: [{ id: 'villain', x: 'amare' }, { id: 'exes', x: 'justin', y: 'ruby' }, { id: 'key', x: 'james' }, { id: 'sick', x: 'melissa' }], ev: [{ k: 'arrive', x: 'amare' }, { k: 'theft', x: 'james', v: 'melissa', s: null, h: 1 }, { k: 'betray', x: 'amare', v: 'justin', s: null, h: 0 }], hard: { liked: 1, clock: 1, gag: 1, danger: 1 } },
};

// two acts
T.A1_exemple_2actes = { ...T.T1_exemple_sans_mots, acts: 2 };
T.A2_meurtre_2actes = { ...T.T2_meurtre, acts: 2, infos: [...T.T2_meurtre.infos, { id: 'spy', x: 'amare', y: 'ruby', a: 2 }] };
T.A3_menace_2actes = { ...T.T4_menace, acts: 2, ev: [{ k: 'arrive', x: 'amare' }, { k: 'threat', x: 'amare', v: 'ruby', a: 2 }] };
T.A4_charge_2actes = { ...T.T6_charge, acts: 2, ev: [{ k: 'arrive', x: 'amare' }, { k: 'theft', x: 'james', v: 'melissa', s: null, h: 1 }, { k: 'betray', x: 'amare', v: 'justin', s: null, h: 0, a: 2 }], infos: [{ id: 'villain', x: 'amare', a: 2 }, { id: 'exes', x: 'justin', y: 'ruby' }, { id: 'key', x: 'james' }, { id: 'sick', x: 'melissa' }] };
// Justin's own draw of 16/11 (the one whose episode 1 read generic): a promise, « the one they look for », a theft nobody on stage suffered, a threat in act 2
T.J1_isa_amare = { ...base, acts: 2, seed: 1, cast: ['isa', 'amare'], pil: { justin: ['chef', 'mysterieux'], isa: ['protecteur', 'clown'], amare: ['outsider', 'dangereux'] }, flaw: { justin: 'vice' }, want: { justin: { v: 'love', t: 'isa' }, amare: { v: 'love', t: 'isa' } },
  infos: [{ id: 'villain', x: 'justin' }, { id: 'promise', x: 'amare', y: 'isa' }], ev: [{ k: 'theft', x: 'amare', v: null, s: null, h: 1 }, { k: 'threat', x: 'amare', v: 'justin', a: 2 }], hard: { liked: 1, danger: 1 }, tq: { fig: 0 } };
T.EX = 'EX';
module.exports = T;
