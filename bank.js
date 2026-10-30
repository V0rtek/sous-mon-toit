// La banque (Plus → Banque): everything a scene is made of, in one place. Persos = every sprite and all its poses (from
// chars.js; "coupée" = cut at the belt, for close shots), Décors = the photos and the perspective guides, Plans = the shots
// the engine knows and the ones still to come, Prompts = the pose-sheet prompts that worked, Sons = every sound, playable. Files can't be listed from the browser:
// a new decor, guide or sound goes in the lists below
window.BANK = {
  // the sounds in sfx/, what each is for (rooms loop under a scene; one-offs play once)
  sounds: [
    ['bar', 'Ambiance', 'un bar, du monde'], ['crowd', 'Ambiance', 'un intérieur public animé'], ['party', 'Ambiance', 'un party de maison'],
    ['bathroom', 'Ambiance', 'une salle de bain, l’écho'], ['dark', 'Ambiance', 'un lieu sombre, inquiétant'], ['campfire', 'Ambiance', 'un feu de camp'],
    ['crickets', 'Ambiance', 'dehors, le soir'], ['suspense', 'Ambiance', 'tendu'], ['wrong', 'Ambiance', 'quelque chose cloche (horreur)'],
    ['intro', 'Ponctuel', 'le générique, 5 s, sous la carte « You are »'], ['moment', 'Ponctuel', 'le moment important'], ['boss', 'Ponctuel', 'l’arrivée du boss'],
    ['glitch', 'Ponctuel', 'un bug, une coupure'], ['dragon_arrive', 'Ponctuel', 'un rugissement épique, 3 s'], ['dragon_fire', 'Ponctuel', 'le long rugissement du feu, 8 s'],
  ],
  // sounds worth adding (not made yet)
  soundsNext: ['porte qui grince', 'porte qui claque', 'verre posé', 'liquide versé', 'pièces', 'papier, lettre', 'serrure et clé', 'chaise qui racle',
    'pas sur bois', 'pas sur pierre', 'épée tirée', 'coup de poing', 'chute', 'gifle', 'souffle coupé', 'rire', 'chuchotement', 'baiser',
    'vent', 'pluie', 'ville au loin', 'port (cloches, mouettes)', 'battement de cœur', 'nappe grave (révélation)', 'silence (la musique coupe)'],
  // the perspective guides in ref/guides (guides.py): picture, its foreground, what it shows
  guides: [
    ['rue', true, 'Rue · marche', 'Façades à 11 m, lampadaires en avant-plan'], ['escalier', true, 'Escalier', '17,5 × 28 cm, rampe à 90 cm'],
    ['bar', true, 'Bar', 'Comptoir 1,05 m qui file vers le fond, clients côte à côte en profondeur'],
    ['feu', true, 'Feu de camp', 'Bûche de 45 cm, une de 55 cm contre leurs genoux'], ['ruelle', false, 'Ruelle', 'Adossés au mur de gauche, en profondeur'],
    ['galerie', false, 'Galerie · table', 'Accoudés à la longue table (dessus 1,2 m), côte à côte en profondeur'],
    ['rempart', false, 'Rempart', 'Accoudés au parapet (60 cm de large), côte à côte en profondeur, vers le château'],
    ['objets', false, 'Taverne · objets', 'Objets posés sur le comptoir devant chacun (test)'],
    ['taverne_bar', false, 'Taverne · comptoir', 'Les 4 places sur le décor : horizon y 510, dessus du comptoir 25 cm sous la caméra'],
  ],
  // the pose-sheet prompts that worked (30/10), to copy: title, the pictures to attach, what to check, the prompt.
  // For another character: swap the LOCKED block for theirs, attach their sheet
  prompts: [["De dos (6 poses, en pied)", "urban.webp", "Vertical 2:3. Vérifier : lunettes dorées, camisole pas en dos nageur, 2 poches cargo, mêmes souliers, même trait, même direction dans les 6 cases.", "Create a character pose sheet of THIS EXACT character, seen from behind. Image 1 is the reference: it is the character AND the art style. Copy both exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape. From behind: the same volume and waves, a short clean nape.\n- Glasses: thin gold metal rectangular frames; from behind, the thin gold arms are visible over the ears.\n- Face (only a sliver of cheek visible): thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions and same height as image 1.\n- Outfit: plain white ribbed tank top with a classic back (NOT racerback), black baggy cargo pants with a side cargo pocket on each thigh and two back pockets, white-and-grey chunky sneakers (same as image 1). Nothing added, nothing removed: no jewelry, no belt showing, no tattoo, no logo, no props.\n- Art style: identical to image 1: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.\n\nFormat: portrait image, 2:3. An invisible grid of 6 equal cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no floor, no shadow, no glow. The character wears nothing green.\n\nIn every cell: the same character, full body from head to feet, centered, same size, with a clear margin of green on all sides (nothing touches the edge of its cell, nothing overlaps another cell). No text, no labels, no props.\n\nAngle, the same in all 6 cells: three-quarter back view. He turns his back to the camera and faces away toward the right, so we see his back, the back of his head, and only a small part of the side of his face (cheek, ear, glasses arm). Camera at chest height, not from above, not from below.\n\nRow 1, left to right:\n1. Looking into the distance: standing still, weight on one leg, head slightly raised toward the horizon, arms relaxed.\n2. Looking down: head lowered, shoulders slightly dropped, hands loose.\n3. Looking back over his shoulder: body still facing away, head turned back toward the camera, we see his face in profile, neutral expression.\n\nRow 2, left to right:\n4. About to open a door: one step forward, one arm reaching forward at chest height, hand open as if touching a door handle (no door drawn).\n5. Holding back anger: standing stiff, shoulders tense, both fists clenched at his sides.\n6. Walking away: mid-step, one foot lifting, arms swinging naturally, moving away from the camera.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."], ["Profil, coupé à la ceinture", "urban.webp + urban_back.webp", "Horizontal 3:2, cases carrées : 1,6 fois plus net qu’en pied. Vérifier : la coupe au même endroit partout, la tête de la même taille.", "Create a character pose sheet of THIS EXACT character, seen in profile, framed from the waist up. Image 1 is the reference: it is the character AND the art style. Copy both exactly. Image 2 shows the same character from behind, for consistency.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames; in profile, the thin gold arm runs to the ear.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions as image 1.\n- Outfit: plain white ribbed tank top, the top of black baggy cargo pants at the waist. Nothing added, nothing removed: no jewelry, no tattoo, no logo, no props.\n- Art style: identical to image 1: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green.\n\nFraming, the same in all 6 cells: from the top of the head down to just below the belt. The body is cut by a straight horizontal line just below the belt, and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. The head is the same size in every cell. Clear margin of green above the head and on both sides (hands and elbows never touch the side edges, nothing overlaps another cell). The figure fills the cell as much as possible. No text, no labels, no props.\n\nAngle, the same in all 6 cells: pure side view (profile), facing RIGHT. Camera at chest height.\n\nRow 1, left to right:\n1. Walking, frame A: calm walk, left arm swinging forward, right arm back, shoulders slightly turning with the step.\n2. Walking, frame B: the opposite: right arm forward, left arm back.\n3. Listening, face to face: still, neutral and attentive, arms relaxed.\n\nRow 2, left to right:\n4. Talking: one hand raised at chest height in a natural gesture, mouth slightly open.\n5. Leaning in: upper body leaning forward toward someone very close, head slightly tilted, soft expression, as if about to whisper or kiss.\n6. Tense confrontation: shoulders squared, chin slightly down, jaw tight, a hard stare forward.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."], ["Tourné de 20°, coupé (marche en 3, bar, assis, adossé)", "urban.webp seulement", "Celle qui sert aux décors. Vérifier : presque de profil (l’autre œil à peine visible), dans la marche le bras près de la caméra derrière (1) puis devant (3), la tête identique dans les 3 ; la case 4 coupée sous les avant-bras. Si ça tourne vers la caméra : ajouter « Like a character in a side-scrolling game. » au début.", "Create a character pose sheet of THIS EXACT character, framed from the waist up, seen almost from the side. The attached image is the reference: it is the character AND the art style. Copy both exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions as the reference.\n- Outfit: plain white ribbed tank top, the top of black baggy cargo pants at the waist. Nothing added, nothing removed: no jewelry, no tattoo, no logo, no props.\n- Art style: identical to the reference: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green. No furniture, no counter, no wall, no seat, no fire drawn: only the character.\n\nFraming, the same in cells 1, 2, 3, 5 and 6: from the top of the head down to just below the belt. The body is cut by a straight horizontal line just below the belt, and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. The head is the same size in every cell. Clear margin of green above the head and on both sides. No text, no labels.\nCell 4 is the only exception (see pose 4): the cut is higher, just under his forearms.\n\nANGLE, the same in all 6 cells — this is the most important rule:\nHe faces the RIGHT side of the image. It is a SIDE VIEW (profile), turned only very slightly toward the camera (about 20 degrees): his nose points to the right, we see the side of his face and only the very edge of the far eye behind the nose. We see mostly the side of his body and shoulder, only a thin sliver of the front of his chest. NOT a front view. NOT a three-quarter front view. Camera at chest height.\n\n\"Near arm\" = the arm on the camera's side of his body (fully visible). \"Far arm\" = the arm on the other side of his body (partly hidden by his torso).\n\nRow 1 = a WALK CYCLE in 3 frames, a calm normal walk. Draw frame 2 first; frames 1 and 3 are exact copies of frame 2 where ONLY the arms are redrawn: same head, same face, same hair, same torso, same position in the cell, same size, same lean.\n1. Near arm swings BACK (toward the left edge of the image, behind his back). Far arm swings FORWARD (toward the right edge, in front of his chest, partly hidden).\n2. Passing: both arms hanging relaxed along the body.\n3. The OPPOSITE of frame 1: near arm swings FORWARD (toward the right edge, in front of him). Far arm swings BACK (mostly hidden behind his back).\nFrames 1 and 3 must NOT look the same: in frame 1 the near arm is behind him, in frame 3 the near arm is in front of him.\n\nRow 2, left to right, same side angle:\n4. Leaning on a bar, seen from behind the counter's edge: upper body leaning forward, both forearms resting flat on an invisible counter in front of him, relaxed, looking ahead (to the right). The counter would hide everything below the top of his forearms, so DON'T draw it: cut the body with a straight horizontal line right under his forearms (the counter's top edge), and that cut sits exactly on the bottom edge of the cell. Nothing below his forearms: no belly, no belt, no pants. His head stays the same size as in the other cells.\n5. Sitting by a campfire: seated low, leaning forward, elbows resting on his knees, hands loosely together, calm, gazing down at an invisible fire in front of him (to the right). His knees stay inside the cell, above the cut line.\n6. Leaning back: his back resting against an invisible wall, arms crossed, relaxed, head slightly tilted, still facing right.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."], ["Gros plans (5 expressions + 1 de dos pour par-dessus l’épaule)", "urban.webp seulement", "Moyen gros plan, coupé à mi-poitrine. Vérifier : la tête au même angle et à la même place dans les 5 de face (seul le visage change), la case 6 bien de dos tournée vers la droite. Ressort un peu plus tourné vers la caméra que demandé : ça passe.", "Create a character pose sheet of THIS EXACT character, framed as medium close-ups (head and shoulders). The attached image is the reference: it is the character AND the art style. Copy both exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders, same proportions as the reference.\n- Outfit: plain white ribbed tank top. Nothing added, nothing removed: no jewelry, no tattoo, no logo, no props.\n- Art style: identical to the reference: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green.\n\nFraming, the same in all 6 cells: from the top of the head down to the middle of the chest. The body is cut by a straight horizontal line at mid-chest, and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. The head is the same size and at the same height in every cell. Clear margin of green above the head and on both sides. No hands in the frame. No text, no labels.\n\nANGLE for cells 1 to 5 — the most important rule:\nHe faces the RIGHT side of the image. A SIDE VIEW turned only slightly toward the camera (about 20 degrees): his nose points to the right, we see the side of his face and only the edge of the far eye behind the nose. NOT a front view. NOT a three-quarter front view. Camera at eye level. The head angle is IDENTICAL in cells 1 to 5: only the expression changes.\n\nRow 1, left to right:\n1. Talking: neutral face, mouth slightly open as if speaking, eyes looking ahead (to the right).\n2. Small smile: warm, a soft closed-mouth smile, eyes slightly narrowed, looking ahead.\n3. Side glance with the eyes only: the head does NOT move (same angle as the others); only his eyes turn sideways toward the left edge of the image, back over his shoulder, a wary, suspicious look, mouth closed.\n\nRow 2, left to right:\n4. Hurt: eyes lowered, looking down, mouth pressed shut, brows slightly raised in the middle.\n5. Held-back anger: jaw clenched, brows low, a hard stare ahead, mouth a tight line.\n6. FROM BEHIND, for over-the-shoulder shots: three-quarter back view, he faces away from the camera toward the RIGHT side of the image, as if looking at someone in front of him. We see the back of his head and hair, his near shoulder and the back of the tank top, and only the outline of his cheek, ear and the gold glasses arm. Same framing and same head size as the other cells.\n\nDo not exaggerate the expressions. Subtle and natural, like the reference."], ["Au comptoir · droit devant (Justin)", "urban.webp + urban_angled.webp + chope.webp", "Tourné de 20°, coupé sous les avant-bras comme bar. Vérifier : le corps au même angle que bar dans les 6, la chope dessinée dans le style du perso (pas peinte), la même chope partout, la tête jamais vers la caméra.", "Create a character pose sheet of THIS EXACT character, leaning on a bar counter, seen almost from the side. Image 1 is the reference: it is the character AND the art style. Image 2 is his sheet seen at 20 degrees: its cell 4 (bottom left) is his bar pose: copy that angle, lean and framing exactly. Image 3 is the mug. Copy all three exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions as image 1.\n- Outfit: plain white ribbed tank top. Nothing added, nothing removed: no jewelry, no tattoo, no logo.\n- Art style: identical to image 1: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.\n\nTHE MUG (image 3): the only prop allowed. A wooden tankard with two dark iron bands and rivets, a handle on one side, beer with foam. Same shape and proportions as image 3, but redrawn in the art style of image 1 (bold outlines, flat 2-tone shading), not painterly. Same mug in every cell where it appears, held by its handle or around its body, at a believable size for his hand.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green. No counter, no bar, no stool drawn: only the character (and the mug where asked).\n\nFraming, the same in all 6 cells: he leans on a bar counter that is NOT drawn. The counter would hide everything below the top of his forearms, so cut the body with a straight horizontal line right under his forearms (the counter's top edge), and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. Nothing below the forearms: no belly, no belt, no pants. The head is the same size and at the same height in every cell. Clear margin of green above the head and on both sides (a raised hand or mug never touches an edge). No text, no labels.\n\nBODY ANGLE, the same in all 6 cells — the most important rule (exactly like his bar pose, cell 4 of image 2):\nHe faces the RIGHT side of the image. A SIDE VIEW turned only very slightly toward the camera (about 20 degrees): we see mostly the side of his body and shoulder, only a thin sliver of the front of his chest. Upper body leaning forward, both forearms resting on the invisible counter in front of him. NOT a front view. NOT a three-quarter front view. Camera at chest height.\nHis head faces the same way as his body in all 6 cells: he looks straight ahead along the counter (to the right), never at the camera, never at someone beside him. Only his face and his hands change.\n\nRow 1, left to right:\n1. Talking: mouth slightly open as if speaking, one hand lifted a little off the counter in a small gesture, the other forearm still on the counter. No mug.\n2. Drinking: the mug raised to his lips with his near hand, head tilted back slightly, eyes half closed. The far forearm stays on the counter.\n3. Staring into his mug: both forearms on the counter, the mug between his hands, head lowered, eyes on the beer, mouth pressed shut, brows slightly raised in the middle (hurt, a bit drunk).\n\nRow 2, left to right:\n4. Small smile to himself: forearms on the counter, the mug beside his near hand, a soft closed-mouth smile, eyes ahead.\n5. Tipsy laugh: shoulders loose, head tilted back a little, open laugh, eyes squinting, one hand on the mug on the counter. Relaxed, slightly sloppy, not cartoonish.\n6. Drunk and slumped: his cheek resting in his near hand (elbow on the counter), heavy eyelids, a lazy half-smile, the mug in front of him.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."], ["Au comptoir · vers l'autre (Justin)", "urban.webp + urban_angled.webp + chope.webp", "Le corps identique dans les 6, seule la tête tourne (vers la caméra = vers son voisin, 5 = de dos vers l'autre côté). Vérifier : le corps n'a pas pivoté avec la tête.", "Create a character pose sheet of THIS EXACT character, leaning on a bar counter, seen almost from the side, turning his head toward people next to him. Image 1 is the reference: it is the character AND the art style. Image 2 is his sheet seen at 20 degrees: its cell 4 (bottom left) is his bar pose: copy that angle, lean and framing exactly. Image 3 is the mug. Copy all three exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions as image 1.\n- Outfit: plain white ribbed tank top. Nothing added, nothing removed: no jewelry, no tattoo, no logo.\n- Art style: identical to image 1: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.\n\nTHE MUG (image 3): the only prop allowed. A wooden tankard with two dark iron bands and rivets, a handle on one side, beer with foam. Same shape and proportions as image 3, but redrawn in the art style of image 1 (bold outlines, flat 2-tone shading), not painterly. Same mug in every cell where it appears, held by its handle or around its body, at a believable size for his hand.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green. No counter, no bar, no stool drawn: only the character (and the mug where asked).\n\nFraming, the same in all 6 cells: he leans on a bar counter that is NOT drawn. The counter would hide everything below the top of his forearms, so cut the body with a straight horizontal line right under his forearms (the counter's top edge), and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. Nothing below the forearms: no belly, no belt, no pants. The head is the same size and at the same height in every cell. Clear margin of green above the head and on both sides (a raised hand or mug never touches an edge). No text, no labels.\n\nBODY ANGLE, the same in all 6 cells — the most important rule (exactly like his bar pose, cell 4 of image 2):\nHe faces the RIGHT side of the image. A SIDE VIEW turned only very slightly toward the camera (about 20 degrees): we see mostly the side of his body and shoulder, only a thin sliver of the front of his chest. Upper body leaning forward, both forearms resting on the invisible counter in front of him. NOT a front view. NOT a three-quarter front view. Camera at chest height.\nTHE BODY IS IDENTICAL IN ALL 6 CELLS (same lean, same shoulders, same forearms on the counter, same place in the cell). ONLY THE HEAD AND THE HANDS MOVE.\n\"Toward the camera side\" = his head turns a little more toward the camera, as if looking at someone leaning on the counter next to him, on the camera's side: we see more of his face (still not a full front view).\n\nRow 1, left to right:\n1. Talking to the person next to him: head turned toward the camera side, eye contact, mouth slightly open, a small hand gesture.\n2. Teasing / flirting: head turned toward the camera side, a crooked half-smile, one eyebrow slightly raised, eyes warm and playful.\n3. Held-back anger: head turned toward the camera side, jaw clenched, brows low, a hard stare, forearms tense on the counter.\n\nRow 2, left to right:\n4. Toast: head turned toward the camera side, smiling, the mug raised in his near hand toward the person next to him, at shoulder height.\n5. Looking back over his far shoulder: the head turns the other way, AWAY from the camera, toward someone behind him on the far side: we see the back of his head, his hair, his ear and the gold glasses arm, and only the outline of his cheek.\n6. Sliding his mug to the person next to him: head turned toward the camera side, a small knowing smile, his near hand pushing the mug along the counter toward the camera side.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."], ["Le baiser · profil pur (Justin)", "urban.webp + urban_side.webp", "Profil pur à 90°, pas 20° : le partenaire est la même pose retournée, leurs visages se rencontrent. Vérifier : un seul œil visible, les lèvres au bord droit du visage.", "Create a character pose sheet of THIS EXACT character, in pure profile, framed from the waist up, for a kiss scene. Image 1 is the reference: it is the character AND the art style. Image 2 is his profile sheet: copy its angle and framing exactly.\n\nLOCKED — must not change in any way, even slightly:\n- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.\n- Glasses: thin gold metal rectangular frames.\n- Face: green eyes, thin mustache, small chin beard, light tanned skin.\n- Body: lean athletic, defined shoulders and arms, same proportions as image 1.\n- Outfit: plain white ribbed tank top. Nothing added, nothing removed: no jewelry, no tattoo, no logo.\n- Art style: identical to image 1: clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.\n\nFormat: LANDSCAPE image, 3:2. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.\n\nBackground: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green. No other person drawn, no furniture: only the character.\n\nFraming, the same in all 6 cells: from the top of the head down to just below the belt. The body is cut by a straight horizontal line just below the belt, and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. The head is the same size in every cell. Clear margin of green above the head and on both sides (his face never touches the right edge). No text, no labels.\n\nANGLE, the same in all 6 cells — the most important rule: PURE SIDE VIEW (exact profile, 90 degrees), facing RIGHT. We see only one eye, the nose and lips in silhouette. NOT turned toward the camera at all: another character facing him in the same exact profile will be placed on the right, mirrored, so their faces meet. Camera at chest height.\nThere is an invisible person of his height standing very close in front of him, on the right: he looks at their face, at his own eye level.\n\nRow 1, left to right:\n1. About to kiss: leaning in toward the right, head tilted slightly, eyes half closed, lips soft and slightly parted, one hand raised as if resting on the other person's waist.\n2. Kissing: leaning in, head tilted, eyes closed, lips pursed forward at the right edge of his face (the other person's lips will meet them), one hand on the invisible person's waist, the other near their jaw.\n3. Just after the kiss: still very close, forehead almost touching, eyes opening slowly, a stunned soft smile.\n\nRow 2, left to right:\n4. Forehead to forehead: eyes closed, a calm tender expression, leaning slightly forward, both hands low as if holding the other's hands.\n5. Whispering in an ear: leaning in, mouth near the right edge, a small private smile, eyes lowered.\n6. Pulled back, rejected: he has just leaned back, eyes wide, lips parted, a hurt surprised look, hands lowered.\n\nDo not exaggerate the poses. Subtle and natural, like the reference."]],
  // the objects in props/ (sheets cut on green), laid in a decor with SCENES.x.props
  props: [['chope', '17 cm', 'à boire, trinquer'], ['piece', '7 cm', 'payer, parier'], ['bourse', '16 cm', 'payer, soudoyer, voler'], ['lettre', '25 cm', 'un message, un aveu'],
    ['enveloppe', '22 cm', 'scellée, un secret'], ['parchemin', '36 cm', 'un ordre, un contrat'], ['carte', '32 cm', 'un trésor, un chemin'], ['plan', '32 cm', 'le château, un vol'],
    ['wanted', '30 cm', 'quelqu’un est recherché']],
  // the shots: done = the engine has it, its step; or still to come
  shots: [
    ['Plan large', true, '{cam: \'wide\', at: x}', 'Tout le décor sur la hauteur, centré sur les persos'],
    ['Plan d’ensemble (établissement)', true, '{establish: image}', 'Le lieu vu d’en haut, zoom lent vers la porte'],
    ['Plan à trois / à deux', true, '{cam: \'three\' | \'two\', who: [...]}', 'Les persos de la tête aux genoux'],
    ['Plan moyen', true, '{cam: \'one\', who: [id]}', 'Un perso, de la tête aux genoux'],
    ['Gros plan', true, '{cam: \'close\', who: [id]}', 'Un perso à la taille ; avec une pose cu_, de la tête à mi-poitrine'],
    ['Très gros plan', true, '{cam: \'xclose\', who: [id]}', 'Le visage seul, sans flou ; donner la pose avant la caméra, et couper (pas de zoom lent)'],
    ['Par-dessus l’épaule', true, '{ots: [près, loin]}', 'Celui de près de dos au bord du cadre, celui d’en face en buste, tourné vers lui ; alterner pour le contrechamp'],
    ['Plan serré, pose coupée', true, 'poses side_ / walk_ / bar / sit / wall / cu_', 'Le cadre s’arrête à la coupe, et suit dans la même image quand la pose change'],
    ['Marche', true, '{walk: id | [ids], to}', 'De profil, en 3 temps, vitesse constante ; ensemble = côte à côte dès la coupe'],
    ['Rattraper', true, '{walk: [devant, derrière], to, catchup: true}', 'Celui de derrière presse le pas jusqu’à côté de l’autre'],
    ['Escalier', true, '{walk: id, to: [x, pieds, taille]}', 'La même marche, qui monte et s’éloigne'],
    ['Accoudé (bar, parapet, table)', true, 'pose bar, places en profondeur', 'Côte à côte = en profondeur, le dos sur le bord ; taille par la perspective'],
    ['Avant-plan', true, 'SCENES.x.fg', 'Une image par-dessus les persos : comptoir, bûche, rampe'],
    ['Objets posés', true, 'SCENES.x.props = [{src, x, y, w}]', 'Sur un comptoir, une table : taille selon la profondeur, devant ceux qui sont plus loin'],
    ['Objets qui bougent', false, '', 'Glisser (la chope poussée), tomber, lancer en arc, changer d’état (pleine, vide)'],
    ['Objets dans la main', false, 'feuille « prises »', 'La main en position, l’objet ajouté par le moteur derrière les doigts'],
    ['Insert (gros plan d’objet, de mains)', false, '', 'Plein écran sur l’objet ou les mains : la lettre qui passe, la clé qui tourne'],
    ['Point de vue', false, '', 'Quelqu’un parle face caméra, au joueur'],
    ['Plan de groupe en profondeur', false, '', 'Une file (bar, feu) cadrée d’un coup, du premier au dernier'],
    ['Avant-plan qui défile', false, '', 'Des poteaux, des passants qui passent devant pendant la marche'],
  ],
};

(() => {
  const $ = (s) => document.querySelector(s), esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  let tab = 'chars', playing = null;
  const nameOf = (id) => ((window.GALLERY || []).find((g) => g.sprite === id) || {}).name || (window.CAST && CAST[id] && CAST[id].name) || id;
  const tabs = {
    chars() {
      // Nouveau perso on top (a tap opens its 4 steps), then every character we have
      const open = BANK.newCharIsOpen();
      return `<div class="ncTop${open ? ' open' : ''}"><button type="button" class="ncToggle" data-nctoggle="1"><b>＋ Nouveau perso</b><em>${open ? '−' : 'les feuilles de poses, pas à pas'}</em></button>${open ? `<div class="ncIn">${BANK.newChar()}</div>` : ''}</div>`
        // the newest imported first, then the others
        + Object.entries(window.SPRITES || {}).sort(([a], [b]) => { const r = (id) => { const k = (window.IMPORTED || []).indexOf(id); return k < 0 ? -1 : k; }; return r(b) - r(a); }).map(([id, sp]) => {
        const half = (sp.half || {}).poses || {}, poses = Object.keys(sp.poses);
        return `<section class="bkChar"><h3>${esc(nameOf(id))} <small>${poses.length} poses</small></h3><div class="bkRow">${poses.map((p) =>
          `<button type="button" class="bkPose${half[p] ? ' cut' : ''}" data-img="chars/${id}/${p}.webp"><img loading="lazy" src="chars/${id}/${p}.webp" alt=""><span>${esc(p)}${half[p] ? '<i>coupée</i>' : ''}</span></button>`).join('')}</div></section>`;
      }).join('');
    },
    decors() {
      const photos = Object.entries(window.SCENES || {}).filter(([, s]) => s.image && !String(s.image).startsWith('ref/guides'));
      const seen = new Set();
      const tile = (src, fg, title, sub) => `<button type="button" class="bkDecor" data-img="${src}"${fg ? ` data-fg="${fg}"` : ''}><span class="pic"><img loading="lazy" src="${src}" alt="">${fg ? `<img loading="lazy" src="${fg}" alt="">` : ''}</span><b>${esc(title)}</b><small>${esc(sub)}</small></button>`;
      return '<h3 class="bkH">Décors</h3><div class="bkGrid">' + photos.filter(([, s]) => !seen.has(s.image) && seen.add(s.image)).map(([id, s]) =>
        tile(s.image, null, id, `${s.size.join(' × ')} px · ${Object.keys(s.spots || {}).length} places${s.establish ? ' · vue d’en haut' : ''}`)
        + (s.establish ? tile(s.establish, null, id + ' · vue d’en haut', 'ouvre et ferme la scène') : '')).join('') + '</div>'
        + '<h3 class="bkH">Guides en perspective</h3><p class="bkNote">Horizon à la poitrine, un point de fuite, grille de 1 m, persos à 4 m (1,75 m = 620 px), tournés de 20° vers la caméra.</p><div class="bkGrid">'
        + BANK.guides.map(([n, fg, title, sub]) => tile(`ref/guides/${n}.webp`, fg ? `ref/guides/${n}_fg.webp` : null, title, sub)).join('') + '</div>';

    },
    objects() {
      return '<p class="bkNote">Dans props/. Posés dans un décor : SCENES.x.props = [{src, x, y, w}], la taille en mètres × la taille du perso à cette profondeur / 1,75.</p><div class="bkGrid">'
        + BANK.props.map(([n, m, what]) => `<button type="button" class="bkDecor" data-img="props/${n}.webp"><span class="pic obj"><img loading="lazy" src="props/${n}.webp" alt=""></span><b>${esc(n)}</b><small>${esc(m)} · ${esc(what)}</small></button>`).join('') + '</div>'
        + '<h3 class="bkH">Sur un décor</h3><div class="bkGrid">' + `<button type="button" class="bkDecor" data-img="ref/guides/objets.webp"><span class="pic"><img loading="lazy" src="ref/guides/objets.webp" alt=""></span><b>Comptoir de la taverne</b><small>Test « objets » (Mini-jeux)</small></button>` + '</div>';
    },
    shots() {
      return BANK.shots.map(([t, done, step, what]) => `<div class="bkShot${done ? '' : ' next'}"><b>${esc(t)}</b><span>${done ? 'fait' : 'à venir'}</span><p>${esc(what)}</p>${step ? `<code>${esc(step)}</code>` : ''}</div>`).join('');
    },
    prompts() {
      // the pictures to attach show under each prompt (ref/…): a tap opens one big, to save it
      const pics = (refs) => (refs.match(/[\w]+\.webp/g) || []).map((f) => `<button type="button" class="bkRef" data-img="ref/${f}"><img loading="lazy" src="ref/${f}" alt=""><span>${f}</span></button>`).join('');
      return '<p class="bkNote">Les feuilles de poses qui ont marché. Ouvrir l’image à joindre (la toucher, puis l’enregistrer), copier le prompt, coller dans ChatGPT avec l’image.</p>'
        + BANK.prompts.map(([t, refs, check], i) => `<div class="bkShot"><b>${esc(t)}</b><p>${esc(check)}</p><div class="bkRefs">${pics(refs)}</div><button type="button" class="bkCopy" data-copy="${i}">Copier le prompt</button></div>`).join('');
    },
    sounds() {
      return BANK.sounds.map(([n, kind, what]) => `<button type="button" class="bkSound" data-snd="${n}"><i>▶</i><b>${esc(n)}</b><span>${kind} · ${esc(what)}</span></button>`).join('')
        + '<h3 class="bkH">À ajouter</h3><p class="bkNote">' + BANK.soundsNext.map(esc).join(' · ') + '</p>';
    },
  };
  function draw() {
    stop();
    $('#bankTabs').querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.t === tab));
    $('#bankBody').innerHTML = tabs[tab](); $('#bankBody').scrollTop = 0;
  }
  function stop() { if (playing) { playing.a.pause(); playing.b.classList.remove('on'); playing.b.firstChild.textContent = '▶'; playing = null; } }
  // the phone's back (gesture or button) works in the bank: it closes a big picture, else goes back to Plus, like ‹.
  // Opening the bank pushes a step in the history; leaving it by ‹ takes that step back
  window.BANK_OPEN = () => { draw(); if (!(history.state && history.state.bank)) history.pushState({ bank: 1 }, ''); };
  addEventListener('popstate', () => {
    if (screen !== '#bank') return;
    if (!$('#bankBig').hidden) { $('#bankBig').hidden = true; history.pushState({ bank: 1 }, ''); return; }
    show('#more');
  });
  document.addEventListener('DOMContentLoaded', () => {
    $('#bankTabs').onclick = (e) => { const b = e.target.closest('button'); if (b) { e.stopPropagation(); tab = b.dataset.t; draw(); } };
    $('#bankBody').onclick = (e) => {
      const s = e.target.closest('[data-snd]'), im = e.target.closest('[data-img]'), cp = e.target.closest('[data-copy]');
      const nc = e.target.closest('[data-nccopy]'), ci = e.target.closest('[data-cimg]'), she = e.target.closest('[data-ncshe]'), pl = e.target.closest('[data-ncplace]');
      const op = e.target.closest('[data-ncopen]'), tk = e.target.closest('[data-ncdone]'), tg = e.target.closest('[data-nctoggle]');
      if (op || tk || tg) { e.stopPropagation(); if (tg) BANK.newCharSet('shown', !BANK.newCharIsOpen()); else if (op) BANK.newCharOpen(op.dataset.ncopen); else BANK.newCharTick(tk.dataset.ncdone); const y = $('#bankBody').scrollTop; draw(); $('#bankBody').scrollTop = y; return; }
      if (nc || ci) {   // Nouveau perso: a prompt, or a picture as png (the promise keeps it inside the tap, for Safari)
        e.stopPropagation(); const b = nc || ci, was = b.textContent, done = (ok) => { b.textContent = ok ? 'Copié ✓' : 'Copie impossible : Enregistrer'; setTimeout(() => { b.textContent = was; }, 1800); };
        if (nc) { const t = BANK.newCharPrompt(nc.dataset.nccopy); navigator.clipboard.writeText(t).then(() => done(true), () => { const x = document.createElement('textarea'); x.value = t; document.body.appendChild(x); x.select(); document.execCommand('copy'); x.remove(); done(true); }); return; }
        const png = fetch(ci.dataset.cimg).then((r) => r.blob()).then((bl) => createImageBitmap(bl)).then((im2) => { const cv = document.createElement('canvas'); cv.width = im2.width; cv.height = im2.height; cv.getContext('2d').drawImage(im2, 0, 0); return new Promise((ok) => cv.toBlob(ok, 'image/png')); });
        try { navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]).then(() => done(true), () => done(false)); } catch { done(false); }
        return;
      }
      if (she || pl) { e.stopPropagation(); if (she) BANK.newCharSet('she', !!she.dataset.ncshe); else BANK.newCharSet('place', pl.dataset.ncplace); const y = $('#bankBody').scrollTop; draw(); $('#bankBody').scrollTop = y; return; }
      if (cp) {
        e.stopPropagation();
        const done = () => { cp.textContent = 'Copié ✓'; setTimeout(() => { cp.textContent = 'Copier le prompt'; }, 1600); };
        navigator.clipboard.writeText(BANK.prompts[+cp.dataset.copy][3]).then(done, () => {
          const t = document.createElement('textarea'); t.value = BANK.prompts[+cp.dataset.copy][3]; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); done();
        });
      } else if (s) {
        e.stopPropagation(); const again = playing && playing.b === s; stop(); if (again) return;
        const a = new Audio(`sfx/${s.dataset.snd}.mp3`); a.play().catch(() => {}); a.onended = stop;
        playing = { a, b: s }; s.classList.add('on'); s.firstChild.textContent = '■';
      } else if (im) {
        e.stopPropagation();
        $('#bankBig').innerHTML = `<img src="${im.dataset.img}" alt="">${im.dataset.fg ? `<img src="${im.dataset.fg}" alt="">` : ''}`; $('#bankBig').hidden = false;
      }
    };
    $('#bankBig').onclick = (e) => { e.stopPropagation(); $('#bankBig').hidden = true; };
    const redraw = () => { const y = $('#bankBody').scrollTop; draw(); $('#bankBody').scrollTop = y; };
    $('#bankBody').onchange = (e) => { const k = e.target.dataset.ncfile; if (k && e.target.files[0]) BANK.newCharFile(k, e.target.files[0], redraw); };
    $('#bankBody').addEventListener('click', (e) => {
      const a = e.target.closest('[data-ncadd]'), g = e.target.closest('[data-ncgrip]');
      if (a) { e.stopPropagation(); BANK.newCharAdd(a.dataset.ncadd, redraw); }
      else if (g) {   // where the hand is: the tap, as a fraction of the picture (its img box, object-fit contain)
        e.stopPropagation(); const im = g.querySelector('img'), r = im.getBoundingClientRect(), k = Math.min(r.width / im.naturalWidth, r.height / im.naturalHeight);
        const w = im.naturalWidth * k, h = im.naturalHeight * k, fx = (e.clientX - r.left - (r.width - w) / 2) / w, fy = (e.clientY - r.top - (r.height - h) / 2) / h;
        if (fx >= 0 && fx <= 1 && fy >= 0 && fy <= 1 && BANK.newCharGrip(g.dataset.ncgrip, fx, fy)) redraw();
      }
    }, true);
    $('#bankBody').oninput = (e) => { const k = e.target.dataset.nc; if (k) BANK.newCharSet(k, e.target.value); };   // kept as typed, no redraw (the keyboard stays)
  });
  window.BANK_CLOSE = () => { stop(); if (screen === '#bank' && history.state && history.state.bank) history.back(); };
})();

// ---- Nouveau perso (31/10): every pose sheet a new character needs for a place, its prompt written for him or her ----
// The sheets that worked for Justin (BANK.prompts) become templates: his LOCKED block becomes the new one's, his sheet
// becomes a guide (image 2: the angle, the cut, the poses, never his look), he/his -> she/her. Plus 2 sheets of their own:
// the character from a photo, and the 6 base poses (listen, surprised, thinking, explaining, angry, holding)
(() => {
  const STYLE = 'clean bold black outlines, flat cel shading with 2 tones, muted natural colors, same line thickness, same level of detail. Not more realistic, not more anime, not softer.';
  const GREEN = 'Background: one flat, pure chroma-key green (#00FF00) everywhere, the same green in every cell. No gradient, no shadow, no glow. The character wears nothing green.';
  // id: [title, why, the guide pictures in ref/ (after image 1 = the character), BANK.prompts index or a prompt of its own]
  const SHEETS = {
    photo: ['Son image', 'Sa photo + l’image de style : le perso en pied, dans le style du jeu. C’est l’image 1 de toutes ses feuilles.', ['style.webp'], (L) =>
      `Create a full-body character illustration of the person in image 1 (a photo), in the exact art style of image 2. Image 2 is ONLY a style reference (a full body and a close-up of the face): copy its line, shading and colors, the way it draws a face, never its character.

Keep the person recognizable: face shape, skin tone, eye color, hair (color, length, texture), facial hair, build. Outfit: what they wear in the photo, simplified to a few clear pieces, nothing green.${L ? `

What to keep exactly:
${L}` : ''}

Art style: identical to image 2: ${STYLE}

Format: portrait image, 2:3. One character, full body from head to feet, centered, with a clear margin all around. Standing, relaxed and neutral, turned slightly toward the right (three-quarter view), arms relaxed, a calm natural expression. Camera at chest height.

${GREEN.replace(' in every cell', '')} No text, no props.`],
    base: ['6 poses de base, en pied', 'Écoute, surpris, réfléchit, explique, fâché, retenu : les 6 poses de tous les persos, celles que l’histoire utilise partout.', [], (L) =>
      `Create a character pose sheet of THIS EXACT character, full body. Image 1 is the reference: it is the character AND the art style. Copy both exactly.

LOCKED — must not change in any way, even slightly:
${L}

Format: portrait image, 2:3. An invisible grid of 6 equal cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.

${GREEN}

In every cell: the same character, full body from head to feet, centered, same size, feet at the same height, with a clear margin of green on all sides (nothing touches the edge of its cell). No text, no labels, no props.

Angle, the same in all 6 cells: three-quarter view, turned slightly toward the right, like image 1. Camera at chest height.

Row 1, left to right:
1. Listening: standing still, neutral and attentive, arms relaxed.
2. Surprised: eyebrows raised, eyes wide, lips parted, shoulders slightly up.
3. Thinking: one hand at the chin, eyes looking aside, weight on one leg.

Row 2, left to right:
4. Explaining: talking, one hand raised at chest height in a natural gesture.
5. Angry: brows low, jaw tight, fists at the sides, leaning forward a little.
6. Holding back: arms crossed, closed, guarded, a restrained look.

Do not exaggerate the poses. Subtle and natural, like the reference.`],
    back: ['De dos, en pied', 'Partir, regarder au loin, se retourner : les conséquences d’un choix (« elle part seule »).', ['urban_back.webp'], 0],
    side: ['Profil, coupé à la ceinture', 'Face à face de profil, marcher : les confrontations debout.', ['urban_side.webp'], 1],
    angled: ['Tourné de 20° (marche, accoudé, assis, adossé)', 'La marche en 3, accoudé à un comptoir, assis au feu, adossé : les places des décors.', ['urban_angled.webp'], 2],
    close: ['Gros plans', 'Parle, petit sourire, regard de côté, blessé, colère retenue, de dos pour le par-dessus l’épaule.', ['urban_closeup.webp'], 3],
    barFront: ['Au comptoir · droit devant', 'Boire, fixer sa chope, rire pompette : l’activité de la taverne.', ['justin_comptoir_devant.webp', 'chope.webp'], 4],
    barOther: ['Au comptoir · vers l’autre', 'Le même corps, la tête vers son voisin : flirter, trinquer, se fâcher.', ['justin_comptoir_autre.webp', 'chope.webp'], 5],
    kiss: ['Le baiser · profil pur', 'Profil pur : le partenaire est la même pose retournée, leurs visages se rencontrent.', ['justin_baiser.webp'], 6],
  };

  // ---- the kit (31/10): every character has Debout and Accoudé; then Assis, Prises and the others as the story needs.
  // Each cell does one thing nobody else does. The mouth is open only to exclaim: the bubble says who speaks, the face
  // says what they feel ----
  // guide = with Justin's sheet as image 2 (the angle, the cut); without, only the character's own picture (a full-body
  // sheet: image 2 made it draw Justin). tall = portrait 2:3, tall cells: a full body stays big, so sharp
  const CELLS = (title, framing, angle, rows, { guide = true, tall = false, style = false } = {}) => (L) => `Create a character pose sheet of THIS EXACT character, ${title}, on a pure green (#00FF00) or transparent background. Image 1 is the reference: it is the character to draw AND the art style.${guide ? ' Image 2 is a pose sheet of ANOTHER character (a man): use it ONLY as a guide for the angle, the framing and the size of the head; never draw him, copy nothing of his look (face, hair, body, clothes).' : ''}${style ? ' Image 2 shows ONLY the art style, drawn on ANOTHER person (a man): copy its line, shading, colors and the way it draws a face; never draw him, copy nothing of his look (face, hair, body, clothes).' : ''} Every cell shows the character of image 1, exactly.

LOCKED — must not change in any way, even slightly:
${L}

${tall ? 'Format: PORTRAIT image, 2:3, at the highest resolution. An invisible grid of 6 equal tall cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.' : 'Format: LANDSCAPE image, 3:2, at the highest resolution. An invisible grid of 6 equal SQUARE cells, 3 columns × 2 rows, exactly the same size. NO lines, NO borders, NO frames between them.'}

${GREEN} Not white, not grey: green. No furniture, no counter, no table, no chair drawn: only the character.

${framing}

${angle}

Row 1, left to right:
${rows[0]}
${rows[1]}
${rows[2]}

Row 2, left to right:
${rows[3]}
${rows[4]}
${rows[5]}

Do not exaggerate the poses. Subtle and natural, like the reference. Mouth closed unless a cell says otherwise.`;
  const LEAN_CUT = 'Framing, the same in all 6 cells: he leans on a counter or a ledge that is NOT drawn. It would hide everything below the top of his forearms, so cut the body with a straight horizontal line right under his forearms (the ledge\'s top edge), and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. Nothing below the forearms. The head is the same size as in image 2 and at the same height in every cell. Clear margin of green above the head and on both sides (a hand never touches an edge). No text, no labels.';
  const LEAN_ANGLE = 'BODY ANGLE, the same in all 6 cells — the most important rule (like image 2): he faces the RIGHT side of the image, a SIDE VIEW turned only very slightly toward the camera (about 20 degrees), upper body leaning forward, both forearms resting on the invisible ledge in front of him. THE BODY IS IDENTICAL IN ALL 6 CELLS: only the head, the face and the hands change. "Toward the camera side" = his head turns a little toward the camera, to someone leaning next to him on that side: we see more of his face (never a full front view).';
  const KIT_SHEETS = {
    debout: ['Debout (base)', 'Partout : écoute, sourire, surpris, fâché, blessé, et de dos quand il part.', ['style.webp'], CELLS('full body, standing', 'Framing, the same in all 6 cells: full body from head to feet, centered, same size, feet at the same height, with a clear margin of green on all sides (nothing touches the edge of its cell). No text, no labels, no props.', 'Angle, the same in cells 1 to 5: three-quarter view, turned slightly toward the right (we see his face well, the far shoulder a little behind), like image 1. Camera at chest height. Cell 6 is the only exception (see it).', [
      '1. Listening: standing still, neutral and attentive, arms relaxed.',
      '2. Warm smile: relaxed shoulders, a genuine warm smile, head slightly tilted.',
      '3. Surprised, exclaiming: eyebrows up, eyes wide, mouth open, shoulders up, one hand rising.',
      '4. Angry: brows low, jaw tight, fists at his sides, leaning forward a little.',
      '5. Hurt: head lowered, eyes down, shoulders dropped, arms close to the body.',
      '6. Walking away, from behind: three-quarter back view, he turns his back to the camera and walks away toward the right, mid-step, arms swinging naturally.'], { guide: false, style: true, tall: true })],
    accoude: ['Accoudé (base)', 'Tout ce qui a un rebord : comptoir, table haute, clôture, pont, mur, table du conseil. Seuls la tête et les mains changent.', ['justin_comptoir_autre.webp'], CELLS('leaning on a ledge, seen almost from the side', LEAN_CUT, LEAN_ANGLE, [
      '1. Listening to the person next to him: head turned toward the camera side, eye contact, mouth closed, calm and attentive.',
      '2. A half smile at them: head turned toward the camera side, a crooked half-smile, warm playful eyes.',
      '3. Tense with them: head turned toward the camera side, jaw clenched, brows low, a hard stare, forearms tense.',
      '4. Straight ahead, hurt or lost in thought: the head faces the same way as the body (to the right), no eye contact, eyes lowered, mouth pressed shut.',
      '5. The back of his head: the head turns the other way, AWAY from the camera, toward someone on his far side: we see the back of his head and hair, his ear, only the outline of his cheek.',
      '6. Putting something down for them: head turned toward the camera side, his near hand forward on the ledge, index and middle fingers pressed flat on its top as if sliding a small flat thing (a coin, a note) toward the camera side. NO object drawn: the fingertips rest exactly on the cut line.'])],
    assis: ['Assis (à une table)', 'Une table de resto, le conseil assis, un banc, le feu : la personne en face est assise de l’autre côté.', ['justin_comptoir_autre.webp'], CELLS('sitting at a table, seen almost from the side', 'Framing, the same in all 6 cells: he sits on a chair at a table that is NOT drawn. The table would hide everything below its top, so cut the body with a straight horizontal line at the height of the table top, under his forearms when they rest on it, and that cut sits exactly on the bottom edge of the cell, at the same height in every cell. The head is the same size as in image 2. Clear margin of green above the head and on both sides. No text, no labels.', 'ANGLE, the same in all 6 cells: he faces the RIGHT side of the image, a SIDE VIEW turned only very slightly toward the camera (about 20 degrees). The person he talks to sits across the table, to the right: looking to the right IS looking at them. Camera at chest height.', [
      '1. Listening across the table: forearms on the table, looking at the person across, calm, mouth closed.',
      '2. Leaning in to confide: leaning forward over the table, closer, head slightly lowered, a low intimate look.',
      '3. Leaning back, distrustful: upper body back against the chair, away from the table, arms crossed, chin down.',
      '4. Head in his hands: elbows on the table, face in both hands, shoulders slumped.',
      '5. Fist on the table: one fist slammed on the table top, jaw clenched, leaning forward, angry.',
      '6. Getting up: rising from the chair, both hands pushing on the table, body half up, looking at the person across.'])],
    prises: ['Prises (mains vides)', 'Boire, trinquer, lire, tendre : les mains sont vides, le jeu y met la chope, la lettre, la clé.', ['justin_comptoir_autre.webp'], CELLS('leaning on a ledge, seen almost from the side, his hands EMPTY in holding positions', LEAN_CUT + ' HIS HANDS ARE EMPTY IN EVERY CELL: NO mug, NO cup, NO glass, NO paper, NO object at all. The game adds the object later: draw the hand shaped as if it holds it. Image 2 shows a mug in some cells: ignore it, his hands stay empty.', LEAN_ANGLE, [
      '1. Bringing something to his lips: his near hand raised to his mouth, fingers curled as if holding a mug by its handle (empty), head tilted back slightly, eyes half closed.',
      '2. Raising something toward the person next to him: head turned toward the camera side, smiling, his near hand raised at shoulder height toward them, fingers curled as if holding a mug (empty).',
      '3. Holding something in front of him with both hands: both hands together above the ledge in front of his chest, as if holding a letter open (empty), looking down at it.',
      '4. Handing something to the person next to him: head turned toward the camera side, his near arm extended toward them, hand half open as if offering a small thing (empty).',
      '5. Slumped, drunk or exhausted: his cheek resting in his near hand (elbow on the ledge), heavy eyelids, a lazy half-smile.',
      '6. Laughing out loud: head tilted back, a big open-mouthed laugh, eyes squinting, one hand flat on the ledge.'])],
  };
  Object.assign(SHEETS, KIT_SHEETS);
  // the order: the base for everyone, then what the story needs (the older sheets stay for the characters that have them)
  const PLACES = [['kit', 'Base, puis selon l’histoire', ['photo', 'debout', 'accoude', 'assis', 'prises', 'kiss', 'close']]];
  // the prompt that writes the LOCKED block from the character's picture (what each sheet keeps identical)
  const LOCK_HELP = `Look at the character in this image. Write the LOCKED block that describes them for a pose-sheet prompt, in exactly this shape and nothing else (one line each, concrete, what never changes):
- Hair: color, length, texture, how it falls (front and back).
- Face: eye color, skin tone, facial hair or makeup, any distinctive feature (ears, freckles, scar).
- Body: build, proportions.
- Outfit: each piece with its color and cut (top, bottom, shoes), then: Nothing added, nothing removed: no jewelry, no tattoo, no logo, no props.
- Art style: identical to image 1: ${STYLE}
Example:
- Hair: dark brown, thick, messy and wavy on top, falling a bit on the forehead, short on the sides and the nape.
- Glasses: thin gold metal rectangular frames.
- Face: green eyes, thin mustache, small chin beard, light tanned skin.
- Body: lean athletic, defined shoulders and arms.
- Outfit: plain white ribbed tank top, black baggy cargo pants with a side cargo pocket on each thigh, white-and-grey chunky sneakers. Nothing added, nothing removed: no jewelry, no tattoo, no logo, no props.
- Art style: identical to image 1: ${STYLE}`;

  // a sheet of Justin's -> the same sheet for someone else
  function make(id, c) {
    const [, , guides, src] = SHEETS[id], L = (c.locked || '').trim();
    let t;
    if (typeof src === 'function') { t = src(L); if (id === 'photo') return t; t = t.replace(/LOCKED — must not change in any way, even slightly:\n\n+/, ''); }
    else {
    t = BANK.prompts[src][3];
    const imgs = guides.length > 1
      ? `Image 1 is the reference: it is the character AND the art style. Image 2 is a pose sheet of ANOTHER character: use it ONLY as a guide for the angle, the framing, the cut and the poses; copy nothing of his look (face, hair, body, clothes). Image 3 is the mug. Copy the character of image 1 exactly.`
      : `Image 1 is the reference: it is the character AND the art style. Image 2 is a pose sheet of ANOTHER character: use it ONLY as a guide for the angle, the framing, the cut and the poses; copy nothing of his look (face, hair, body, clothes). Copy the character of image 1 exactly.`;
    const first = t.indexOf('. ') + 1;
    t = t.slice(0, first) + ' ' + imgs + t.slice(t.indexOf('\n\n'));
    t = t.replace(/LOCKED — must not change[\s\S]*?(?=\n\n)\n\n/, L ? 'LOCKED — must not change in any way, even slightly:\n' + L + '\n\n' : '')
      .replace(/\(exactly like his bar pose, cell 4 of image 2\)/, '(exactly like the guide, image 2)')
      .replace(/,? ?(and )?(the )?(thin )?gold glasses arm/g, '').replace(/\(cheek, ear, glasses arm\)/, '(cheek, ear)')
      .replace(/the back of the tank top/g, 'the back of the top').replace(/the tank top/g, 'the top');
    }
    if (c.she) {   // the guide stays "his" (another character, a man): only the character's own he/his turn
      const keep = 'copy nothing of his look', keep2 = 'never draw him';
      t = t.replace(keep, '\u0000').replace(keep2, '\u0001').replace(/\bhimself\b/g, 'herself').replace(/\bhim\b/g, 'her').replace(/\bhis\b/g, 'her').replace(/\bhe\b/g, 'she')
        .replace(/\bHis\b/g, 'Her').replace(/\bHe\b/g, 'She').replace(/\bHIS\b/g, 'HER').replace(/\bHE\b/g, 'SHE').replace('\u0000', keep).replace('\u0001', keep2).replace('it is the character to draw', 'it is the character to draw (a woman)');
    }
    return t;
  }
  const HAVE = ['brooke', 'cam', 'candy', 'james', 'julian', 'justin', 'ruby', 'suit'];   // ref/perso_<name>.webp
  const KEY = 'smt-newchar';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const keep = (c) => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* private window */ } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
  // a picture to attach: big, with Copier (into the clipboard, as png) and Enregistrer (a download)
  const pic = (f, label) => `<div class="ncPic"><img src="ref/${f}" alt="" data-img="ref/${f}"><span>${esc(label)}</span><div><button type="button" class="ncBtn" data-cimg="ref/${f}">Copier l’image</button><a class="ncBtn" href="ref/${f}" download="${f}">Enregistrer</a></div></div>`;
  // the screen: 4 steps, one card each, short. 4 = the sheets of the place, one line each: a tap opens it (its pictures,
  // its prompt), « Fait » ticks it; one open at a time
  BANK.newChar = () => {
    const c = load(), place = PLACES.find((p) => p[0] === c.place) || PLACES[0], done = c.done || {};
    const nm = String(c.name || '').trim(), mine = HAVE.includes(nm.toLowerCase()) ? `perso_${nm.toLowerCase()}.webp` : null;
    const step = (n, title, ok, body) => `<div class="ncStep${ok ? ' ok' : ''}"><b><i>${ok ? '✓' : n}</i>${title}</b>${body}</div>`;
    const sheets = place[2].filter((id) => id !== 'photo');
    const one = mine ? pic(mine, `Image 1 · ${nm}`) : '<div class="ncPic mine"><span>Image 1 · ton perso (étape 2)</span></div>';
    return step(1, 'Qui', !!nm, `<input data-nc="name" placeholder="Son nom" value="${esc(nm)}"><div class="ncChips">${[['', 'Il'], ['1', 'Elle']].map(([v, l]) => `<button type="button" data-ncshe="${v}" class="${(c.she ? '1' : '') === v ? 'on' : ''}">${l}</button>`).join('')}</div>`)
      + step(2, 'Son image', !!mine || !!done.photo, mine ? '<p>Déjà dans le jeu.</p>'
        : `<p>Joins sa photo + l’image de style, colle le prompt.</p><div class="ncPics"><div class="ncPic mine"><span>Image 1 · sa photo</span></div>${pic('style.webp', 'Image 2 · le style')}</div>`
          + `<textarea data-nc="locked" rows="3" placeholder="Ce qu’il faut garder (facultatif) : ex. cheveux roux bouclés, cicatrice à la joue, veste de cuir">${esc(c.locked || '')}</textarea>`
          + `<div class="ncRow"><button type="button" class="bkCopy" data-nccopy="photo">Copier le prompt</button><button type="button" class="ncDone${done.photo ? ' on' : ''}" data-ncdone="photo">${done.photo ? 'Fait ✓' : 'Fait'}</button></div>`)
      + step(3, `Ses feuilles · ${sheets.filter((id) => done[id]).length}/${sheets.length}`, sheets.every((id) => done[id]),
        `<p>Debout et Accoudé : tout le monde. Ensuite, selon l’histoire.</p>`
        + sheets.map((id) => { const [t, why, guides] = SHEETS[id], open = c.open === id;
          return `<div class="ncSheet${open ? ' open' : ''}${done[id] ? ' done' : ''}"><button type="button" class="ncHead" data-ncopen="${id}"><i>${done[id] ? '✓' : ''}</i>${esc(t)}<em>${open ? '−' : '+'}</em></button>`
            + (open ? `<div class="ncBody"><p>${esc(why)}</p><div class="ncPics">${one}${guides.map((f, k) => pic(f, `Image ${k + 2} · ${f === 'chope.webp' ? 'la chope' : f === 'style.webp' ? 'le style' : 'le guide'}`)).join('')}</div>`
              + `<div class="ncRow"><button type="button" class="bkCopy" data-nccopy="${id}">Copier le prompt</button><button type="button" class="ncDone${done[id] ? ' on' : ''}" data-ncdone="${id}">${done[id] ? 'Fait ✓' : 'Fait'}</button></div>`
              + (window.IMPORT && IMPORT.KINDS[id] ? importBox(id) : '') + '</div>' : '') + '</div>'; }).join(''));
  };
  // the generated sheet -> into the game (importer.js): pick it, see the 6 poses cut, « Ajouter au jeu »
  let shown = null;   // { kind, imgs, msg }
  const importBox = (id) => { const s = shown && shown.kind === id ? shown : null;
    return `<div class="ncImport"><label class="ncBtn ncPick">${s && s.imgs ? 'Refaire avec une autre image' : 'Importer la feuille générée'}<input type="file" accept="image/*" data-ncfile="${id}" hidden></label>`
      + (s && s.imgs ? `${s.imgs.some((m) => m.grip) ? '<p>Le point jaune = où le jeu met l’objet. Touche la main pour le déplacer.</p>' : ''}<div class="ncCuts">${s.imgs.map((m) => `<figure><span class="ncGrip"${m.grip ? ` data-ncgrip="${m.pose}"` : ''}><img src="${m.src}" alt="">${m.grip ? `<i style="left:${m.grip[0] * 100}%;top:${m.grip[1] * 100}%"></i>` : ''}</span><figcaption>${esc(m.pose)}</figcaption></figure>`).join('')}</div>${s.moved ? `<button type="button" class="bkCopy" data-ncadd="${id}">Enregistrer la prise</button>` : ''}` : '')
      + (s && s.msg ? `<p class="ncMsg">${esc(s.msg)}</p>` : '') + '</div>'; };
  // imported = cut, then added to the game and ticked at once (a hand moved afterwards: « Enregistrer la prise »)
  BANK.newCharFile = async (kind, file, redraw) => {
    if (!String(load().name || '').trim()) { shown = { kind, msg: 'Donne-lui un nom d’abord (étape 1).' }; redraw(); return; }
    shown = { kind, msg: 'Découpe…' }; redraw();
    const tell = (t) => { const m = document.querySelector('.ncMsg'); if (m) m.textContent = t; };
    try { shown = { kind, imgs: await IMPORT.cut(file, kind, load().name, tell), msg: 'Ajout au jeu…' }; }
    catch (err) { shown = { kind, msg: err.message || 'Je n’arrive pas à la découper.' }; redraw(); return; }
    redraw(); await BANK.newCharAdd(kind, redraw);
  };
  BANK.newCharAdd = async (kind, redraw) => {
    shown = { ...shown, moved: false, msg: 'Envoi…' }; redraw();
    try { shown = { ...shown, msg: await IMPORT.add() }; const c = load(); c.done = c.done || {}; c.done[kind] = true; keep(c); }
    catch (err) { shown = { ...shown, msg: `Pas ajouté : ${err.message}` }; }
    redraw();
  };
  BANK.newCharGrip = (pose, fx, fy) => { const r = IMPORT.setGrip(pose, fx, fy), m = r && shown && shown.imgs && shown.imgs.find((x) => x.pose === pose); if (m) { m.grip = r; shown.moved = true; } return !!m; };
  BANK.newCharPrompt = (id) => (id === 'help' ? LOCK_HELP : make(id, load()));
  BANK.newCharSet = (k, v) => { const c = load(); c[k] = v; keep(c); };
  BANK.newCharIsOpen = () => !!load().shown;
  BANK.newCharTick = (id) => { const c = load(); c.done = c.done || {}; c.done[id] = !c.done[id]; keep(c); };
  BANK.newCharOpen = (id) => { const c = load(); c.open = c.open === id ? null : id; keep(c); };
})();
