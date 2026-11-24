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
// the same, second draw of the promise (« never tell the ferryman who Justin is »), and the other figures
T.J1b_promesse_muette = { ...T.J1_isa_amare, tq: { fig: 0, prom: 1 } };
T.J1c_usurier = { ...T.J1_isa_amare, tq: { fig: 1 } };
T.J1d_capitaine = { ...T.J1_isa_amare, tq: { fig: 2 } };
T.J1e_proprio = { ...T.J1_isa_amare, tq: { fig: 3 } };
// J1 + links by hand (17/11): the debt's chain, known (born of a card game at the den, with Amare) and Justin's example:
// Isa and Amare are family, hidden from the audience AND from both of them (Amare wants Isa), it comes out later
T.J2_liens = { ...T.J1_isa_amare, moments: [{ id: '1', c: 'cartes', by: 1 }], places: [{ id: '2', c: 'tripot', by: 1 }], nid: 2,
  links: [{ a: 't:debt', k: 'born', b: 'm:1', by: 1 }, { a: 'm:1', k: 'where', b: 'l:2', by: 1 }, { a: 'm:1', k: 'with', b: 'p:amare', by: 1 }, { a: 'p:isa', k: 'family', b: 'p:amare', by: 1, sh: 'h' }] };
T.J2b_liens_2actes = { ...T.J2_liens, links: T.J2_liens.links.map((l) => (l.sh ? { ...l, at: 2, kn: ['justin'] } : l)) };
// 18/11: the shape of The Dark Knight with our people (the test of « haut niveau »): Justin (Bruce) hides his name, loved
// Isa (his ex), now with Amare (Dent, the hero everyone adores); James (the Joker) arrives and threatens Amare; Melissa
// (Gordon) is Justin's friend. Act 2: James kills Isa; Amare wants to make Justin pay
T.D1_chevalier = { ...base, acts: 2, seed: 3, cast: ['amare', 'isa', 'james', 'melissa'], pil: { justin: ['mysterieux', 'protecteur'], amare: ['chef', 'protecteur'], isa: ['genie'], james: ['dangereux', 'clown'], melissa: ['protecteur'] },
  flaw: { justin: 'orgueil' }, want: { justin: { v: 'love', t: 'isa' }, amare: { v: 'love', t: 'isa' }, james: { v: 'oust', t: 'amare' } }, rel: { 'amare|isa': 'couple', 'justin|melissa': 'friend', 'isa|justin': 'ex' },
  infos: [{ id: 'name', x: 'justin' }], ev: [{ k: 'arrive', x: 'james' }, { k: 'threat', x: 'james', v: 'amare' }, { k: 'murder', x: 'james', v: 'isa', s: 'amare', h: 0, a: 2 }, { k: 'revenge', x: 'amare', v: 'justin', a: 2 }], hard: { liked: 1, clock: 1 } };
T.D1b_chevalier_autre_choix = { ...T.D1_chevalier, picked: { pick: 1 } };
// 18/11: the same story, only who they are changes (traits decide the actions): James threatens Amare; Justin loves Isa,
// Amare's partner; Melissa is Justin's friend. At the climax Justin lets Isa go (picked: 1 when Isa is side A)
const PB = { ...base, acts: 2, seed: 5, cast: ['amare', 'isa', 'james', 'melissa'], want: { justin: { v: 'love', t: 'isa' } }, rel: { 'amare|isa': 'couple', 'justin|melissa': 'friend' },
  ev: [{ k: 'threat', x: 'james', v: 'amare' }], hard: { clock: 1 }, flaw: {}, picked: { pick: 1 } };
T.P1a_amare_protecteur = { ...PB, pil: { justin: ['chef'], amare: ['protecteur'], isa: ['genie'], james: ['dangereux'], melissa: ['clown'] } };
T.P1b_amare_colere = { ...PB, pil: { justin: ['chef'], amare: ['chef'], isa: ['genie'], james: ['dangereux'], melissa: ['clown'] }, flaw: { amare: 'colere' } };
T.P1c_amare_lache = { ...PB, pil: { justin: ['chef'], amare: ['clown'], isa: ['genie'], james: ['dangereux'], melissa: ['clown'] }, flaw: { amare: 'lache' } };
T.P2a_james_bluffe_isa_fiere = { ...PB, pil: { justin: ['chef'], amare: ['protecteur'], isa: ['chef'], james: ['charmeur'], melissa: ['clown'] } };
T.P2c_james_bluffe_isa_loyale = { ...PB, pil: { justin: ['chef'], amare: ['protecteur'], isa: ['protecteur'], james: ['charmeur'], melissa: ['clown'] } };
T.P2b_james_bluffe_isa_rancune = { ...PB, pil: { justin: ['chef'], amare: ['protecteur'], isa: ['mysterieux'], james: ['charmeur'], melissa: ['clown'] }, flaw: { isa: 'colere' } };
// 24/11: the inverted detective (Columbo, Breaking Bad, Joker): Justin did it, the audience sees it. I1: he kills James, the
// man who threatened Ruby; Melissa, his friend, wants the truth (Hank hunting Walt). I2: he steals from Amare to pay a debt
T.I1_justin_tue = { ...base, seed: 7, cast: ['ruby', 'james', 'melissa', 'amare'], pil: { justin: ['protecteur', 'mysterieux'], ruby: ['charmeur'], james: ['dangereux'], melissa: ['genie'], amare: ['chef'] }, flaw: { justin: 'colere' },
  want: { justin: { v: 'love', t: 'ruby' } }, rel: { 'justin|melissa': 'friend', 'justin|ruby': 'crush' }, ev: [{ k: 'threat', x: 'james', v: 'ruby' }, { k: 'murder', x: 'justin', v: 'james', s: 'melissa', h: 1 }], hard: { clock: 1 } };
T.I2_justin_vole = { ...base, seed: 8, cast: ['amare', 'isa', 'melissa'], pil: { justin: ['charmeur', 'mysterieux'], amare: ['chef'], isa: ['protecteur'], melissa: ['clown'] }, flaw: { justin: 'vice' },
  want: { justin: { v: 'love', t: 'isa' } }, rel: { 'amare|isa': 'family', 'justin|isa': 'couple' }, infos: [], ev: [{ k: 'theft', x: 'justin', v: 'amare', s: 'amare', h: 1 }], hard: {} };
T.I3_justin_tue_2actes = { ...T.I1_justin_tue, acts: 2, ev: [...T.I1_justin_tue.ev, { k: 'revenge', x: 'amare', v: 'justin', a: 2 }] };
// the antihero (Joker, Walter White, Match Point): the same night, a cold Justin (cunning and violent more than loyal) keeps his secret
T.I4_justin_sen_tire = { ...T.I1_justin_tue, pil: { ...T.I1_justin_tue.pil, justin: ['dangereux', 'mysterieux'] }, flaw: { justin: 'menteur' } };
// 25/11: close to Justin's own test of 24/11 (rebuilt from his episode 1: he killed Amare, the body in the stable; he protects
// Melissa, who wants to leave before dawn; her brother is in the captain's cell). His read: « I didn't understand »
T.U1_test_justin = { ...base, seed: 11, cast: ['ruby', 'amare', 'melissa'], pil: { justin: ['protecteur', 'mysterieux'], ruby: ['charmeur'], amare: ['chef', 'dangereux'], melissa: ['outsider'] }, flaw: { justin: 'menteur' },
  want: { justin: { v: 'protect', t: 'melissa' }, melissa: { v: 'free' } }, rel: { 'amare|ruby': 'couple', 'justin|melissa': 'friend' }, infos: [{ id: 'leaving', x: 'melissa' }], ev: [{ k: 'murder', x: 'justin', v: 'amare', s: 'ruby', h: 1 }], hard: { clock: 1 }, tq: { fig: 2 } };
T.EX = 'EX';
module.exports = T;
