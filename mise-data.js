// Mise en scène (16/11) : les données. Le décor de la taverne (ses plans, ses places), le vocabulaire (visages, gestes),
// les prompts (la mise en scène, les feuilles, les décors, les inserts) et l'épisode d'exemple mis en scène à la main.
// Le moteur est dans mise.js. À lire avant d'y toucher : CREER.md, section « Mise en scène ».
window.MISE_DATA = (() => {
  // ---- la taverne : chaque plan = une image + ses places. x = le milieu du perso, feet = ses pieds debout (sous l'image :
  // on ne voit jamais les pieds), H = sa taille debout en px du plan, sit = de combien il descend assis.
  // edge = le bord du fond de la table : tout ce qui est dessous est redessiné PAR-DESSUS les persos (ils sont derrière la table).
  // toward / from : où est l'autre plan (on sort vers lui par ce côté, on en arrive par ce côté) : la table est à GAUCHE de l'écart.
  const SET = {
    id: 'taverne', name: 'Taverne', ref: 'bg/taverne_bar.webp',
    plates: {
      table: { name: 'La table', src: 'mise/table.webp', size: [1800, 1200], edge: 850, toward: { aside: 'r' }, from: { aside: 'r' },
        marks: {
          s1: { x: 170, feet: 1210, H: 820, sit: 164, seat: 1 }, s2: { x: 490, feet: 1210, H: 820, sit: 164, seat: 1 },
          s3: { x: 810, feet: 1210, H: 820, sit: 164, seat: 1 }, s4: { x: 1130, feet: 1210, H: 820, sit: 164, seat: 1 },
          fond: { x: 1375, feet: 1050, H: 560, sit: 120, seat: 1, dim: 1 },
          d1: { x: 1640, feet: 1210, H: 820 },
        } },
      aside: { name: 'À l’écart', src: 'mise/aside.webp', size: [1800, 1200], toward: { table: 'l' }, from: { table: 'l' },
        marks: {
          al: { x: 120, feet: 1700, H: 1350 }, a1: { x: 540, feet: 1760, H: 1500 },
          a2: { x: 1270, feet: 1760, H: 1500 }, ar: { x: 1700, feet: 1700, H: 1350 },
        } },
      salle: { name: 'La salle', src: 'mise/salle.webp', size: [1800, 1012], marks: {} },
    },
  };

  // ---- les visages (17/11) : 20, précis. [id, français, ce que la case demande, les poses de base qui s'en approchent, famille]
  // Une feuille ne contient jamais une liste fixe : seulement les visages que l'épisode joue et qui ne sont pas déjà gardés.
  const FACES = [
    ['neutral', 'écoute', 'Listening: a relaxed face, attentive eyes on the other person, mouth closed and at rest.', ['listen'], 'calm'],
    ['smile', 'sourire', 'A real small smile: lips closed, the corners up, the cheeks lift a little and the eyes narrow slightly (the eyes smile too).', ['smile', 'listen'], 'warm'],
    ['amused', 'amusé', 'Amused, teasing: one corner of the mouth higher than the other, one eyebrow slightly raised, a spark of mischief in the eyes.', ['smile', 'explaining', 'listen'], 'warm'],
    ['laugh', 'rit', 'Laughing softly among friends: mouth open just enough to show the upper teeth, eyes creased, head tipped back a little. Not a roar.', ['smile', 'explaining', 'listen'], 'warm'],
    ['tender', 'tendre', 'Tender: a soft, steady gaze that lingers a second too long, eyelids slightly lowered, lips barely parted in the hint of a smile.', ['smile', 'listen'], 'warm'],
    ['shy', 'gêné', 'Shy, flattered: the eyes drop and slide to the side, chin slightly down, a small closed smile they try to hide.', ['hurt', 'thinking', 'listen'], 'warm'],
    ['serious', 'sérieux', 'Serious: the smile has just left the face. Flat mouth, steady level gaze, brows at rest: unreadable.', ['holding', 'listen'], 'cool'],
    ['cold', 'froid', 'Cold: eyelids slightly lowered, a flat hard stare, the mouth a straight line, the chin a little up. No warmth left in the face.', ['holding', 'angry', 'listen'], 'cool'],
    ['doubt', 'hésite', 'Hesitating: the eyes drift away to the side and down, the mouth tightens to one side, a breath held: about to say something and not saying it.', ['thinking', 'listen'], 'cool'],
    ['suspicious', 'méfiant', 'Suspicious: one eye slightly narrowed, the head turned a little away while the eyes stay locked on the other person, lips pressed.', ['thinking', 'holding', 'listen'], 'cool'],
    ['worried', 'inquiet', 'Worried: the inner ends of the eyebrows raised and drawn together, lips pressed, eyes a little wider, looking for an answer in the other face.', ['thinking', 'hurt', 'listen'], 'low'],
    ['hurt', 'blessé', 'Hurt, hiding it: the eyes lose their shine and drop for a second, the mouth softens, a forced little smile that does not reach the eyes.', ['hurt', 'thinking', 'listen'], 'low'],
    ['fear', 'peur', 'Afraid but holding still: eyes wide and fixed, face tense, lips slightly parted, breath held. Not screaming.', ['surprised', 'hurt', 'listen'], 'low'],
    ['surprised', 'surpris', 'Surprised: eyebrows up, eyes open a little wider, lips just parted, head pulled back a touch. Caught off guard.', ['surprised', 'listen'], 'shock'],
    ['shocked', 'choqué', 'Shocked: the face goes completely still, eyes wide, mouth slightly open: they just heard something that changes everything.', ['surprised', 'listen'], 'shock'],
    ['annoyed', 'agacé', 'Annoyed: a small exhale through the nose, the eyes roll slightly aside, the mouth pulled flat.', ['holding', 'thinking', 'listen'], 'hot'],
    ['angry', 'colère retenue', 'Anger held back: brows low, jaw clenched, nostrils slightly flared, lips pressed thin, a hard stare.', ['angry', 'holding', 'listen'], 'hot'],
    ['defiant', 'défi', 'Defiant: chin up, a calm steady stare straight into the other\'s eyes, the trace of a provoking half-smile.', ['holding', 'explaining', 'listen'], 'hot'],
    ['threat', 'menace', 'A quiet threat: chin slightly down, eyes looking up from under the brows, perfectly calm, the ghost of a cold smile.', ['holding', 'angry', 'listen'], 'hot'],
    ['jealous', 'jaloux', 'Jealous and hiding it: the smile stays on the mouth but the eyes go hard and fixed, the jaw tight.', ['holding', 'angry', 'listen'], 'hot'],
  ];
  // ce que l'IA écrit quand même → un des 20
  const FACE_ALIAS = { calm: 'neutral', listening: 'neutral', happy: 'smile', warm: 'smile', kind: 'smile', playful: 'amused', teasing: 'amused', smug: 'amused', flirty: 'amused', ironic: 'amused', laughing: 'laugh',
    soft: 'tender', loving: 'tender', embarrassed: 'shy', flat: 'serious', firm: 'serious', sad: 'hurt', afraid: 'fear', scared: 'fear', nervous: 'worried', tense: 'worried',
    hesitant: 'doubt', thinking: 'doubt', distrustful: 'suspicious', irritated: 'annoyed', furious: 'angry', provoking: 'defiant', menacing: 'threat', threatening: 'threat', envious: 'jealous' };
  // les gros plans que Justin a déjà (feuille « Gros plans ») : ils servent tant qu'un gros plan généré n'est pas là
  const CU_OLD = { neutral: 'cu_talk', serious: 'cu_talk', cold: 'cu_talk', smile: 'cu_smile', amused: 'cu_smile', tender: 'cu_smile', laugh: 'cu_smile', shy: 'cu_glance', doubt: 'cu_glance', suspicious: 'cu_glance',
    worried: 'cu_hurt', hurt: 'cu_hurt', fear: 'cu_hurt', angry: 'cu_anger', threat: 'cu_anger', annoyed: 'cu_anger', defiant: 'cu_anger', jealous: 'cu_anger' };
  // ---- les gestes : [id, français, la case, les poses de base qui s'en approchent]
  const GESTS = [
    ['point', 'désigne', 'pointing: the arm extended toward the right, a little below shoulder height, index finger out, eyes on what they point at.', ['explaining']],
    ['hands_up', 'mains levées', 'both hands raised at shoulder height, palms open toward the right: "easy, I did nothing".', ['surprised', 'explaining']],
    ['lean', 'se penche', 'leaning in: the upper body bent forward toward the right, head forward, chin low, very close to someone: saying something only they should hear.', ['angry', 'explaining']],
    ['drink', 'lève sa chope', 'raising a small wooden tankard with iron bands at chest height toward the right, a toast.', ['explaining', 'listen']],
    ['back', 'de dos', 'seen from BEHIND (three-quarter back view): the back to the camera, the head facing away, still.', ['back_far', 'back_look', 'back_walk', 'listen']],
    ['turn', 'se retourne', 'seen from behind (three-quarter back view), the head turned back over the shoulder toward the right so we see the profile: someone just called their name.', ['back_look', 'surprised']],
  ];
  // ce qu'on met dans les cases qui restent d'une feuille (une feuille a 4 ou 6 cases) : ce qui servira le plus souvent, pas encore gardé
  const EXTRA = ['neutral', 'smile', 'serious', 'amused', 'worried', 'surprised', 'tender', 'angry', 'laugh', 'doubt', 'hurt', 'cold', 'annoyed', 'shy', 'suspicious', 'defiant', 'threat', 'shocked', 'fear', 'jealous'];
  const FRAMES = {
    cu: { name: 'Gros plans', cell: 'square', how: 'a close-up from the top of the hair down to the middle of the chest, cut by a straight horizontal line that sits exactly on the bottom edge of the cell. The head is the same size and at the same height in every cell (about half of the cell\'s height). Both shoulders inside the cell, a clear margin of green above the hair and on both sides.' },
    mid: { name: 'En buste (jusqu’à mi-cuisse)', cell: 'tall', how: 'standing, from the top of the head down to MID-THIGH, cut by a straight horizontal line that sits exactly on the bottom edge of the cell. The same size and the head at the same height in every cell. A clear margin of green above the head and on both sides (a hand never touches an edge, nothing crosses into the next cell).' },
  };
  const GREEN = 'Background: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no floor, no glow. Nobody wears anything green.';
  const ACT = 'Each cell is ONE precise moment of the scene (the dialogue is in French). Read the moment first, then play it with the face, the way a good film actor plays it in a close-up: exactly that feeling, for that person, at that moment. Real, small, nuanced expressions: the eyes, the eyebrows, the corners of the mouth. No cartoon exaggeration, no wide-open mouth unless the cell asks for it, no manga symbols (no sweat drop, no blush lines, no vein). Someone who knows this person would read each face at once, and no two cells look alike.';
  const aspectOf = (sh) => { const [gc, gr] = sh.grid; if (sh.kind === 'duo') return gc === 1 ? '1:1, square' : gc === 2 && gr === 1 ? '3:2, landscape' : '1:1, square';
    const r = FRAMES[sh.frame].cell === 'tall' ? (gc * 2) / (gr * 3) : gc / gr; return r > 1.2 ? '3:2, landscape' : r < 0.8 ? '2:3, portrait' : '1:1, square'; };
  const cellText = (c) => { const f = FACES.find((x) => x[0] === c.face), g = c.gest && GESTS.find((x) => x[0] === c.gest);
    return (c.act ? c.act + ' ' : '') + (f ? f[2] : '') + (g ? ` The body: ${g[2]}` : '') + (c.ctx ? ` — THE MOMENT: ${c.ctx}` : ' (no particular moment: a clean version of this expression, for later)'); };
  const rows = (sh) => { if (sh.cells.length === 1) return cellText(sh.cells[0]); const [gc, gr] = sh.grid, out = []; for (let r = 0; r < gr; r++) out.push(`Row ${r + 1}, left to right:\n` + sh.cells.slice(r * gc, r * gc + gc).map((c, k) => `${r * gc + k + 1}. ${cellText(c)}`).join('\n')); return out.join('\n\n'); };
  // the sheet's prompt: built from its cells (what the episode needs), its character(s) and the best pictures we have of them
  function sheetPrompt(sh, refs) {
    const [gc, gr] = sh.grid, n = sh.cells.length, grid = n === 1 ? `Format: ${aspectOf(sh)} image, at the highest resolution. ONE single picture (the word « cell » below means this picture). No text, no labels.` : `Format: ${aspectOf(sh)} image, at the highest resolution. An invisible grid of ${n} equal cells, ${gc} column${gc > 1 ? 's' : ''} × ${gr} row${gr > 1 ? 's' : ''}, exactly the same size. NO lines, NO borders, NO frames between them, no text, no labels.`;
    const she = (t) => (sh.she ? t.replace(/\btheir\b/g, 'her').replace(/\bthey\b/g, 'she').replace(/\bthem\b/g, 'her') : t);
    if (sh.kind === 'duo') return `Create a TWO-CHARACTER sheet. Image 1 is A (${sh.names[0]}), image 2 is B (${sh.names[1]}): they are the characters AND the art style. Copy both exactly: face, hair, skin, body, outfit, colors, line, shading. Nothing added, nothing removed.

${grid}

${GREEN}

In every cell: A on the LEFT, B on the RIGHT, both from the top of the head down to mid-thigh, cut by a straight horizontal line exactly on the bottom edge of the cell, at the same scale as each other and the same scale in every cell. Three-quarter views, turned toward each other (unless the cell says otherwise). A clear margin of green above the heads and on both sides.

${ACT}

${rows(sh)}`;
    const imgs = refs.same ? `Image 1 is the reference: it is the character AND the art style, ALREADY in the framing and the angle this sheet needs: keep exactly that framing, that size and that angle.`
      : `Image 1 is the reference: it is the character AND the art style.${refs.two ? ' Image 2 shows ANOTHER character, only as a guide for the framing, the size of the head and the angle: copy nothing of their look (face, hair, body, clothes).' : ''}`;
    return she(`Create a character sheet of THIS EXACT character (${sh.name}): ${n} ${sh.frame === 'cu' ? 'close-ups' : 'shots from the head to mid-thigh'}, each one a moment of a scene. ${imgs} Copy the character exactly: face, hair, skin, body, outfit, colors, line, shading. Nothing added, nothing removed.

${grid}

${GREEN}

Framing, the same in every cell: ${FRAMES[sh.frame].how}

Angle, the same in every cell (unless a cell says it is seen from behind): three-quarter view, the body and the face turned toward the RIGHT of the image, the eyes on someone their own height standing or sitting to the right, outside the cell. Never looking at the camera.

${ACT}

${rows(sh)}`);
  }

  // ---- les décors : la même taverne, refaite sous un autre angle (image 1 = la taverne du jeu)
  const SAME = 'Image 1 is the tavern. Draw the SAME tavern (same architecture, same stone and wood, same blue banners with the tankard, same lanterns, same art style, same line and shading) at NIGHT: warm lantern light, deep blue night in the windows.';
  const PLATE_PROMPT = {
    table: `${SAME}

New camera position: we face one long wooden table of the room, from the front, at the eye height of someone sitting.

Composition, exact:
- Landscape image, 3:2.
- The table runs straight across the WHOLE image, from the left edge to the right edge, parallel to the camera.
- Its far edge is a perfectly straight horizontal line at 71% of the image's height (measured from the top). We see the top of the table from 71% to 81%, then its front panel down to the bottom edge.
- The table is EMPTY: no tankard, no plate, no candle, nothing on it.
- NOBODY sits at this table, and no chair or bench shows behind it: the people and their chairs are added later, between the table and the room.
- Behind the table, from the top of the image down to the table: the room, a little out of focus and darker (windows, pillars, the arched door, other tables). A few patrons far away in the back, small, out of focus, anonymous.
- No text.`,
    aside: `${SAME}

New camera position: a quieter corner of the room, a few steps away from the tables, near a wooden pillar and the stone wall, the arched door somewhere behind. Camera at chest height, facing the wall.

Composition, exact:
- Landscape image, 3:2.
- The whole image is the background of a conversation between two people standing in the foreground: they are added later. So NOBODY in the foreground, and nothing important in the middle of the image.
- Everything a little out of focus and dark, one lantern giving a warm rim of light from one side.
- The floor is not visible (the camera is too high).
- No text.`,
    salle: `${SAME}

A wide establishing shot of the whole room, seen from near the entrance, a little from above: the tavern is busy. Patrons at the tables laugh, drink and talk; a barmaid passes with tankards. They are anonymous: small, seen from afar or from behind, no face in detail.

Composition: landscape image, 16:9. One table near the middle of the image has ONE empty chair. No text.`,
  };
  const insertPrompt = (ins) => `${SAME}

An INSERT SHOT: a close view of one detail, the kind a film cuts to for two seconds so the audience notices it.

What we see: ${ins.desc || ins.id}

Composition: landscape image, 3:2. The detail fills the middle of the image, sharp; the rest of the tavern behind it is out of focus. No face in close-up unless the description asks for one. No text.`;

  // ---- le prompt de mise en scène : le script → la pièce que le moteur joue
  const STAGE = (script, pool) => `You are the director of a 2D visual story. Turn the SCREENPLAY at the end into a PLAY: the list of beats my engine shows, one tap each. Reply with the JSON only.

THE AUDIENCE MUST UNDERSTAND THE STORY BY WATCHING: who is where, who talks to whom, who looks at whom, what just happened. That is your whole job.

THE SET — a fantasy tavern at night. These are the ONLY places that exist. One person per place.
At the table (camera in front of it, everyone faces us, left to right):
  "s1" "s2" "s3" "s4" = the 4 seats of the heroes' table. A seat nobody takes at the start stays an empty chair with a full tankard.
  "d1" = standing at the right end of the table: where someone who walks up to the table stops.
  "fond" = a table in the back: one silent patron, small and in the dark (someone the story reveals later sits there FROM THE START).
Aside, a few steps to the right of the table (two people standing face to face, seen from the waist up):
  "a1" (left) "a2" (right) = the two who talk. "al" = a third person arriving from the table. "ar" = a third person arriving from the door, behind whoever stands at a2.
The door and the rest of the room are off screen, to the right.

WHAT THE SCREEN CAN DO
- Show the people of ONE area at a time (the table, or aside), from wide to close-up. The engine picks the framing: you say who speaks to whom.
- Sit down, stand up (at a seat), walk in, walk out, walk from one place to another, step closer to someone.
- Turn someone toward someone. A face, the one that fits THIS moment exactly (choose carefully, the illustrator draws it from your choice):
  warm: smile, amused (teasing), laugh, tender (a look that lingers), shy (flattered, eyes down) · calm: neutral (listening)
  cool: serious, cold, doubt (hesitates, holds something back), suspicious · low: worried, hurt (hides it), fear
  shock: surprised, shocked (everything changes) · hot: annoyed, angry (held back), defiant (provokes), threat (quiet), jealous (hides it)
- A gesture among: point (at a place or a person), hands_up, lean (toward someone), drink, back (turns their back), turn (looks back over the shoulder).
- An insert: a detail filling the screen for one beat (an object, an empty chair, a hand).
- A duo: two people of the same area in ONE picture, for any moment where they touch or are very close (leaning in to whisper, a hand on a shoulder, grabbing a collar, a hug, a kiss). Describe it in "act", in English, precisely: who does what to whom, and both faces.

WHAT THE SCREEN CANNOT DO — never write a beat that needs it; say it in a short "narr" over a close-up instead
- Two people touching WITHOUT a duo beat. Nobody carries, gives or takes an object in view (an insert can show the object alone). A fight with blows.
- A crowd acting. The people of the room are heard, not seen: use "narr".
- Someone sitting where there is no free seat, two people in one place, someone talking quietly to a person who is in the other area.
- Lying down, kneeling, running, dancing, anything on the floor. We never see legs or feet.

RULES OF STAGING
1. Everyone in the screenplay gets a place in "start", or enters later with {"do":"enter"}. Put next to each other the people who look at each other the most. The one the others fight over sits between them.
2. Before a line between two people who are not in the same area, MOVE one of them first — unless it is a call across the room: then add "far": true.
3. An action line of the screenplay becomes a beat the audience SEES: a "do" with a short "narr" (present tense, 60 characters at most, only what the picture does not already say). A look, a smile that fades, a silence = {"do":"look", ...} with the face: that is a reaction shot, the most useful beat there is.
4. "to" = the person the line is said TO (the one the speaker looks at), not the person it is about. If it is said to everyone, leave "to" out.
5. Faces are small and real, and they follow what is said AND what is meant underneath (someone who lies smiles with cold eyes: "jealous" or "cold", not "smile"). Most lines are neutral, smile, amused or serious. Keep the strong ones for the moments that earn them. A face stays until you change it: change it as soon as the feeling changes, and give the listener's reaction in "react" when it matters.
6. Keep EVERY line of dialogue, in order, word for word, in its language. Never add a line. Unnamed roles (A CLIENT, THE MAN) are cast members too.
7. Someone with nothing left to do walks out: {"do":"exit"} with no "narr".
8. The choice at the end: {"choice":[{"t": the button (4 words at most), "narr": what it means}, ...]}.

FORMAT
{
 "title": "...",
 "cast": [ {"id":"justin","name":"Justin","sprite":"justin","player":true}, {"id":"client","name":"Le client","sprite":"<one from the bank>"} ],
 "start": { "<cast id>": "<place>", ... },
 "empty": ["<a seat that matters while empty>"],
 "inserts": [ {"id":"chope","prop":"chope","desc":"<what the image shows, one sentence, for the illustrator>"} ],
 "beats": [
  {"shot":"salle","narr":"..."}                                   the room from afar: only to open
  {"shot":"wide","narr":"..."}                                    everyone of the area
  {"insert":"chope","narr":"..."}
  {"who":"isa","to":"justin","face":"amused","text":"..."}        a line
  {"who":"amare","to":"isa","gest":"hands_up","face":"smile","text":"..."}
  {"do":"look","who":"justin","at":"isa","face":"tender","react":{"isa":"laugh"},"narr":"..."}
  {"do":"point","who":"amare","at":"s4","narr":"..."}
  {"do":"enter","who":"client","to":"d1","face":"worried","narr":"..."}
  {"do":"move","who":["amare","justin"],"to":["a1","a2"],"narr":"..."}     also from the table to aside and back
  {"do":"near","who":"amare","to":"justin","narr":"..."}          steps closer
  {"duo":"whisper","who":["amare","justin"],"act":"Amare leans in close to Justin's ear and whispers; Justin stares ahead, jaw tight","narr":"..."}
  {"do":"stand","who":"homme","narr":"..."}   {"do":"sit","who":"amare"}   {"do":"exit","who":"client"}
  {"choice":[{"t":"...","narr":"..."},{"t":"...","narr":"..."}]}
 ]
}
"sprite": a character of the bank: ${pool}. Named characters use their own; give each unnamed role a different one nobody else uses.
"prop" (optional, for an insert of an object the bank already has): chope, biere, bourse, lettre, carte, enveloppe, gobelet, avis.
"react": the faces of the others during this beat. "shot" on any beat forces the framing: "wide", "two", "cu".

EXAMPLE — flat, then what works
Screenplay: « Isa rit. Justin sourit, mais son regard reste un instant sur elle. JUSTIN: Je pourrais m'habituer à ça. »
Flat: {"narr":"Isa rit. Justin sourit, mais son regard reste un instant sur elle."}, {"who":"justin","text":"Je pourrais m'habituer à ça."}
   (we read it, we do not see it; we do not know who he speaks to)
Works: {"do":"look","who":"justin","at":"isa","face":"tender","react":{"isa":"laugh"},"narr":"Son regard reste sur elle."}, {"who":"justin","to":"isa","face":"tender","text":"Je pourrais m'habituer à ça."}

Screenplay: « Justin se lève et suit Amare à quelques pas de la table. AMARE: Tu crois que je ne vois pas ce que tu fais ? »
Flat: {"narr":"Justin se lève et suit Amare."}, {"who":"amare","to":"justin","text":"..."}   (they are still sitting on screen)
Works: {"do":"move","who":["amare","justin"],"to":["a1","a2"],"narr":"Justin suit Amare, à quelques pas."}, {"who":"amare","to":"justin","face":"angry","text":"..."}

SCREENPLAY
${script}`;

  // ---- l'exemple : l'épisode 1 de Justin (« Une place vide, une chope encore pleine »), mis en scène à la main.
  // C'est la référence de ce que le prompt doit donner.
  const L = (who, to, face, text, o) => ({ who, to, face, text, ...o });
  const EX = {
    title: 'Une place vide, une chope encore pleine',
    cast: [{ id: 'justin', name: 'Justin', sprite: 'justin', player: true }, { id: 'isa', name: 'Isa', sprite: 'isa' }, { id: 'amare', name: 'Amare', sprite: 'amare' },
      { id: 'client', name: 'Le client', sprite: 'candy' }, { id: 'homme', name: 'L’homme', sprite: 'kai' }],
    start: { amare: 's1', isa: 's2', justin: 's3', homme: 'fond' }, empty: ['s4'],
    inserts: [{ id: 'chope', prop: 'chope', desc: 'On the heroes\' table, in front of an empty wooden chair pushed back a little: one full tankard of beer, the foam untouched. Nobody around it.' }],
    beats: [
      { shot: 'salle', narr: 'Une taverne, la nuit. On rit, on boit.' },
      { shot: 'wide', narr: 'À une table, une place est restée vide.' },
      { insert: 'chope', narr: 'Une chope encore pleine attend devant elle.' },
      L('isa', 'justin', 'amused', 'Tu sais ce qui est bizarre ? On dirait que tout le monde ici a quelque chose à célébrer, sauf nous trois.'),
      L('amare', 'isa', 'smile', 'Parle pour toi. Moi, je passe une excellente soirée.', { gest: 'drink' }),
      L('justin', 'amare', 'amused', 'C’est parce que tu n’as pas encore goûté à ma compagnie.'),
      L('isa', 'justin', 'laugh', 'Oh, je crois qu’on a tous les deux assez bu pour supporter ça.'),
      { do: 'look', who: 'justin', at: 'isa', face: 'tender', react: { isa: 'laugh', amare: 'laugh' }, shot: 'two', narr: 'Isa rit. Amare aussi. Le regard de Justin reste sur elle.' },
      L('justin', 'isa', 'tender', 'Je pourrais m’habituer à ça.'),
      L('isa', 'justin', 'neutral', 'À quoi ?'),
      L('justin', 'isa', 'smile', 'À ces soirées. À ne pas avoir à regarder l’heure. À être avec les bonnes personnes.'),
      L('amare', 'justin', 'serious', 'Tu devrais surtout profiter du moment. Ça ne dure jamais aussi longtemps qu’on le voudrait.'),
      L('isa', 'justin', 'amused', 'Pour une fois, je suis d’accord avec lui.'),
      L('justin', 'isa', 'tender', 'Alors, si je pouvais choisir, je garderais cette soirée exactement comme elle est.'),
      L('amare', 'justin', 'amused', 'Même si quelqu’un venait s’asseoir à cette place ?'),
      { do: 'point', who: 'amare', at: 's4', narr: 'Amare désigne la chaise vide.' },
      L('isa', 'amare', 'doubt', 'Tu vas encore commencer avec tes histoires ?'),
      L('amare', 'isa', 'amused', 'Quoi ? Je suis simplement curieux.', { gest: 'hands_up' }),
      L('isa', 'justin', 'smile', 'Tu sais, Justin, Amare m’a fait une promesse. Et contrairement à certains, il a toujours tenu parole.'),
      L('amare', 'isa', 'tender', 'Je n’ai pas oublié.', { react: { justin: 'jealous' } }),
      L('justin', 'isa', 'jealous', 'Une promesse ? Je devrais être jaloux ?'),
      L('isa', 'justin', 'amused', 'Tu devrais surtout arrêter de poser des questions auxquelles tu n’es pas prêt à entendre les réponses.'),
      { do: 'enter', who: 'client', to: 'd1', face: 'worried', narr: 'Un client arrive à leur table, pressé.' },
      L('client', null, 'angry', 'Quelqu’un a volé ma bourse !'),
      { shot: 'wide', react: { isa: 'surprised', justin: 'serious', amare: 'surprised' }, narr: 'Autour d’eux, les conversations s’arrêtent.' },
      L('isa', 'client', 'surprised', 'Attendez, quoi ?'),
      L('client', 'isa', 'worried', 'Elle était dans ma poche il y a quelques minutes. Quelqu’un ici me l’a prise !'),
      L('amare', 'client', 'neutral', 'Tu es certain de ne pas l’avoir perdue dehors ?'),
      L('client', 'amare', 'angry', 'Je sais encore où je range mon argent !'),
      L('justin', 'client', 'serious', 'Alors, quelqu’un a dû profiter de l’agitation.'),
      L('isa', 'justin', 'doubt', 'On devrait peut-être demander qui était près de lui.'),
      L('client', 'isa', 'worried', 'J’ai vu une silhouette près de ma table. Quelqu’un qui n’avait rien à faire là.'),
      L('amare', 'client', 'neutral', 'Un étranger, probablement. Il y a toujours des gens de passage dans cette taverne.'),
      L('justin', 'amare', 'defiant', 'Pratique. On accuse quelqu’un qu’on ne connaît pas.'),
      L('amare', 'justin', 'cold', 'Tu as une meilleure explication ?'),
      L('justin', 'amare', 'neutral', 'Pas encore.'),
      { do: 'exit', who: 'client' },
      { do: 'look', who: 'amare', at: 'justin', face: 'threat', narr: 'Amare fixe Justin. Puis il sourit.' },
      L('amare', 'justin', 'threat', 'Tu devrais faire attention à ce que tu dis.'),
      L('isa', 'amare', 'worried', 'Oh, vous deux... Pas ce soir.'),
      { do: 'look', who: 'amare', at: 'isa', face: 'smile', shot: 'two', narr: 'Amare se tourne vers Isa.' },
      L('amare', 'isa', 'smile', 'Ne t’inquiète pas. Je ne voudrais surtout pas gâcher notre soirée.'),
      L('amare', 'isa', 'tender', 'D’ailleurs, bientôt, je te demanderai quelque chose. Et cette fois, j’espère que tu me répondras devant tout le monde.'),
      L('isa', 'amare', 'amused', 'Tu sais vraiment comment rendre quelqu’un curieux.'),
      L('justin', 'isa', 'amused', 'Et moi qui pensais être celui qui devait te surprendre.'),
      L('isa', 'justin', 'tender', 'Tu as encore le temps.'),
      { do: 'look', who: 'isa', at: 'justin', face: 'shy', react: { justin: 'tender' }, shot: 'two', narr: 'Leurs regards se croisent. Isa sourit.' },
      { do: 'look', who: 'amare', at: 'justin', face: 'jealous', narr: 'Amare les regarde. Son sourire s’efface.' },
      L('amare', 'justin', 'serious', 'Justin. Viens avec moi. Deux minutes.'),
      L('justin', 'amare', 'doubt', 'Pourquoi ?'),
      L('amare', 'justin', 'threat', 'Parce que je te le demande gentiment.'),
      L('isa', 'amare', 'amused', 'Ne vous éloignez pas trop. Je vais finir par croire que vous avez des secrets.'),
      L('amare', 'isa', 'smile', 'Certains secrets méritent de rester entre hommes.'),
      { do: 'move', who: ['amare', 'justin'], to: ['a1', 'a2'], narr: 'Justin se lève et suit Amare, à quelques pas de la table.' },
      L('amare', 'justin', 'angry', 'Tu crois que je ne vois pas ce que tu fais ?'),
      L('justin', 'amare', 'amused', 'Tu vas devoir être un peu plus précis.'),
      L('amare', 'justin', 'serious', 'Isa.'),
      L('justin', 'amare', 'neutral', 'Quoi, Isa ?'),
      L('amare', 'justin', 'angry', 'Ne joue pas à ça avec moi.'),
      L('justin', 'amare', 'defiant', 'Je ne savais pas qu’il fallait te demander la permission pour lui parler.'),
      { do: 'near', who: 'amare', to: 'justin', narr: 'Amare s’approche.' },
      L('amare', 'justin', 'serious', 'Écoute-moi bien. Tout le monde ici m’apprécie. Ils me font confiance. Isa me fait confiance.'),
      L('justin', 'amare', 'amused', 'Et tu comptes utiliser ça pour m’impressionner ?'),
      L('amare', 'justin', 'threat', 'Non. Je compte te rappeler que personne ne te protégera si tu deviens un problème.'),
      L('justin', 'amare', 'serious', 'C’est une menace ?'),
      L('amare', 'justin', 'threat', 'C’est une faveur. Éloigne-toi d’Isa.'),
      L('justin', 'amare', 'serious', 'Et si je refuse ?'),
      { duo: 'whisper', who: ['amare', 'justin'], act: 'Amare leans in very close to Justin\'s ear, calm, almost gentle, and whispers; Justin does not move, staring straight ahead, his jaw tight.', narr: 'Amare se penche vers lui.' },
      L('amare', 'justin', 'threat', 'Alors je te tue.', { shot: 'cu' }),
      { do: 'look', who: 'justin', at: 'amare', face: 'shocked', narr: 'Un silence.' },
      L('justin', 'amare', 'amused', 'Tu sais, tu devrais travailler sur ta façon de faire connaissance.'),
      L('amare', 'justin', 'angry', 'Tu crois que je plaisante ?'),
      L('justin', 'amare', 'fear', 'Non. C’est bien ça qui m’inquiète.'),
      L('amare', 'justin', 'threat', 'Tu ne sais même pas dans quoi tu t’es embarqué.'),
      { do: 'move', who: 'amare', to: 's1', narr: 'Amare retourne vers la table.' },
      { do: 'look', who: 'justin', at: 'amare', face: 'worried', narr: 'Justin reste seul quelques secondes.' },
      { do: 'move', who: 'isa', to: 'a1' },
      L('isa', 'justin', 'worried', 'Tout va bien ?'),
      L('justin', 'isa', 'hurt', 'Ton ami a un drôle de sens de l’humour.'),
      L('isa', 'justin', 'neutral', 'Amare ? Il est parfois un peu intense, mais il a toujours été là pour moi.'),
      L('justin', 'isa', 'serious', 'Je vois.'),
      L('isa', 'justin', 'tender', 'Tu sais, tu peux me parler si quelque chose te tracasse.'),
      { do: 'look', who: 'justin', at: 'isa', face: 'doubt', narr: 'Justin la regarde. Il hésite.' },
      L('isa', 'justin', 'amused', 'Quoi ?'),
      L('justin', 'isa', 'shy', 'Rien. C’est juste que... j’aimerais bien qu’on puisse passer un moment ensemble. Toi et moi.'),
      { do: 'look', who: 'isa', at: 'justin', face: 'shy', narr: 'Isa baisse les yeux, puis sourit.' },
      L('isa', 'justin', 'smile', 'Tu aurais pu me le demander plus tôt.'),
      L('justin', 'isa', 'smile', 'Je voulais être sûr que tu accepterais.'),
      L('isa', 'justin', 'amused', 'Et maintenant ?'),
      L('justin', 'isa', 'tender', 'Maintenant, j’aimerais oublier qu’on n’est pas seuls.'),
      L('isa', 'justin', 'laugh', 'Alors, il faudra trouver un meilleur endroit.'),
      { do: 'look', who: 'amare', at: 'justin', face: 'serious', narr: 'Amare les observe depuis la table.' },
      { do: 'stand', who: 'amare' },
      L('amare', 'justin', 'serious', 'Justin !', { far: true }),
      { do: 'look', who: 'justin', at: 'amare', face: 'serious', narr: 'Justin se retourne.' },
      L('amare', 'justin', 'amused', 'Tu as oublié quelque chose.', { far: true }),
      L('justin', 'amare', 'serious', 'Quoi donc ?', { far: true }),
      L('amare', 'justin', 'threat', 'Que certaines personnes ici ont de bonnes raisons de ne pas vouloir te voir traîner dans les parages.', { far: true }),
      L('isa', 'amare', 'angry', 'Amare, ça suffit.', { far: true }),
      L('amare', 'isa', 'amused', 'Je ne fais que plaisanter.', { far: true }),
      L('isa', 'amare', 'annoyed', 'Alors trouve une meilleure plaisanterie.', { far: true }),
      { do: 'look', who: 'amare', at: 'isa', gest: 'hands_up', face: 'smile', shot: 'two', narr: 'Amare lève les mains.' },
      L('amare', 'isa', 'smile', 'Comme tu veux.', { far: true }),
      { do: 'sit', who: 'amare', narr: 'Il se rassoit.' },
      { do: 'near', who: 'isa', to: 'justin', narr: 'Isa se rapproche de Justin.' },
      L('isa', 'justin', 'worried', 'Je ne sais pas ce qui se passe entre vous deux, mais je n’ai pas envie que ça gâche notre soirée.'),
      L('justin', 'isa', 'smile', 'Moi non plus.'),
      L('isa', 'justin', 'tender', 'Alors reste avec moi.'),
      { do: 'stand', who: 'homme', narr: 'Un bruit de chaise, derrière Justin.' },
      { do: 'move', who: 'homme', to: 'ar', from: 'r', face: 'threat', narr: 'Un homme, silencieux jusque-là, s’est levé. Il fixe Justin.' },
      L('homme', 'justin', 'threat', 'Toi...'),
      { do: 'look', who: 'justin', at: 'homme', face: 'surprised', narr: 'Justin se retourne.' },
      L('justin', 'homme', 'doubt', 'On se connaît ?'),
      L('homme', 'justin', 'cold', 'Je savais que je finirais par te retrouver.'),
      L('isa', 'homme', 'worried', 'Vous connaissez Justin ?'),
      { do: 'look', who: 'homme', at: 'justin', face: 'threat', narr: 'L’homme ignore Isa. Il ne quitte pas Justin des yeux.' },
      L('homme', 'justin', 'threat', 'Tu pensais vraiment pouvoir disparaître comme ça ?'),
      L('justin', 'homme', 'cold', 'Je crois que vous faites erreur.'),
      L('homme', 'justin', 'threat', 'Non. Je ne fais jamais deux fois la même erreur.'),
      { do: 'look', who: 'amare', at: 'justin', face: 'serious', narr: 'Amare observe la scène, sans intervenir.' },
      L('isa', 'justin', 'worried', 'Justin ?'),
      { do: 'near', who: 'homme', to: 'justin', narr: 'L’homme fait un pas vers eux.' },
      L('homme', 'justin', 'threat', 'Je sais exactement qui tu es.'),
      { choice: [{ t: 'Aller vers Isa', narr: 'Justin reste près d’Isa et cherche à détourner son attention de l’homme.' },
        { t: 'Garder son secret', narr: 'Justin prétend ne pas connaître cet homme et cherche à mettre fin à la conversation.' }] },
    ],
  };

  return { SET, FACES, FACE_ALIAS, CU_OLD, GESTS, EXTRA, FRAMES, sheetPrompt, PLATE_PROMPT, insertPrompt, STAGE, EX };
})();
