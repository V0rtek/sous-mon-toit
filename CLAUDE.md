# Git
Toujours pousser directement sur `main` (demandé par Justin le 29/10). Pas de branche, pas de PR.

# Génération
Pas de validateur qui bloque ou liste des erreurs (demandé par Justin le 30/10) : un problème dans ce que l'IA génère se règle dans le prompt (technique + exemple plat → ce qui marche).

# Orchestration FORGE (traitée le 23/11)
Le texte `FORGE-ORCHESTRATION.md` (gardé tel quel) est traité : réponse ligne par ligne et 6 questions à Justin dans `FORGE-ORCHESTRATION-REPONSE.md`, la revue (problèmes mesurés, causes, exemples de films) dans `FORGE-ORCHESTRATION-REVUE.md`, le code dans `orch.js`, les notes dans `CREER.md` § « L'orchestration ». Ce qui est gardé pour plus tard : `FORGE-LONG-TERME.md` (le tenir à jour). Le 25/11, après son test (« je n'ai pas compris ») : `FORGE-ECRAN.md` (le système de bout en bout, ce qu'une scène demande, ce qui manque pour une vraie série, le plan). **Le cap** (25/11, après « ce scénario c'est de la merde ») : `FORGE-CAP.md` — ce qu'on fabrique (un pilote de 5 min excellent sur papier, puis joué ; le texte pour nous, le visuel pour l'utilisateur), pourquoi ça sort plat (pas de thème, pas de bible, l'IA donne le plus probable), les bases à construire, la boucle des notes de Justin, les lois du dialogue. Le lire avant de reprendre le chantier. Pour la suite de ce chantier : modèle le plus fort, effort le plus haut (demandé par Justin le 19/11).

# Théorie du récit
Quand Justin parle de théorie (structure, scène, personnage, dialogue, continuité) : la référence est `REFERENCE-THEORIE-RECIT.md` (son document, gardé tel quel, donné le 25/11). S'en servir pour répondre et pour construire ; dire quand on s'en écarte et pourquoi.

# Travailler l'histoire avec Justin (25/11)
Sa méthode : il fait un breakdown (ce qu'il voit dans une vraie scène) → on l'implémente concrètement, dans un système clair et aligné → je teste avec un output réel qu'il peut voir (une scène au format de Last Call, `bar.js` : plans, silences, poses) → il dit si j'ai compris. Poser des questions et suggérer au fur et à mesure ; pas de grosse réponse. Ce qu'il sait devient des **techniques imbriquées** (le format de `techniques.js` : nom, comment, plat → ce qui marche, sous-techniques), pas un corpus de scènes à imiter. **Je ne fais pas les techniques à sa place** (26/11) : il en parle ; je reformule de plusieurs façons et je propose plusieurs variantes, jamais le mot final ; il dit ce qu'il en fait. Ses breakdowns (mot pour mot), les essais et ses réactions : `ATELIER-TECHNIQUES.md` ; seul ce qu'il valide entre dans `techniques.js`. Dire « conflit philosophique » (croyance contre croyance, `REFERENCE-THEORIE-RECIT.md` § 1), pas « thème ». Ce qui est écrit doit tenir dans ce que le lecteur sait montrer.

# Écriture
Jamais beaucoup de mots d'un coup : une réplique ou une narration longue se coupe en 2-3 bulles (« Okay. » / « I come out. » / « But the gun stays in my holster. ») (demandé par Justin le 09/11).

# Façade
Par défaut le lien montre seulement Full demo (Infos, Plus et leurs écrans cachés). Le cadenas en bas du menu demande le code ; le navigateur s'en souvient. Code : `j` (demandé par Justin le 02/11). Dans `index.html` il n'y a que son hash (`KEY_HASH`) : pour changer le code, recalculer le hash avec `keyHash`. Le repo est public : c'est un mur pour les visiteurs, pas une vraie sécurité.

# Créer (le moteur d'histoire)
Avant de toucher à `forge.js`, aux techniques de `plan.js` ou à la graine dans `act.js` : lire `CREER.md` (les principes de Justin, ce que fait le code, ce qui n'est pas fait).
Avant de toucher à `mise.js` / `mise-data.js` (🎥 un épisode écrit → ce qu'on voit) : la section « Mise en scène » de `CREER.md`.
