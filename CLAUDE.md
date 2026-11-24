# Git
Toujours pousser directement sur `main` (demandé par Justin le 29/10). Pas de branche, pas de PR.

# Génération
Pas de validateur qui bloque ou liste des erreurs (demandé par Justin le 30/10) : un problème dans ce que l'IA génère se règle dans le prompt (technique + exemple plat → ce qui marche).

# Orchestration FORGE (traitée le 23/11)
Le texte `FORGE-ORCHESTRATION.md` (gardé tel quel) est traité : réponse ligne par ligne et 6 questions à Justin dans `FORGE-ORCHESTRATION-REPONSE.md`, la revue (problèmes mesurés, causes, exemples de films) dans `FORGE-ORCHESTRATION-REVUE.md`, le code dans `orch.js`, les notes dans `CREER.md` § « L'orchestration ». Ce qui est gardé pour plus tard : `FORGE-LONG-TERME.md` (le tenir à jour). Le 25/11, après son test (« je n'ai pas compris ») : `FORGE-ECRAN.md` (le système de bout en bout, ce qu'une scène demande, ce qui manque pour une vraie série, le plan). Pour la suite de ce chantier : modèle le plus fort, effort le plus haut (demandé par Justin le 19/11).

# Écriture
Jamais beaucoup de mots d'un coup : une réplique ou une narration longue se coupe en 2-3 bulles (« Okay. » / « I come out. » / « But the gun stays in my holster. ») (demandé par Justin le 09/11).

# Façade
Par défaut le lien montre seulement Full demo (Infos, Plus et leurs écrans cachés). Le cadenas en bas du menu demande le code ; le navigateur s'en souvient. Code : `j` (demandé par Justin le 02/11). Dans `index.html` il n'y a que son hash (`KEY_HASH`) : pour changer le code, recalculer le hash avec `keyHash`. Le repo est public : c'est un mur pour les visiteurs, pas une vraie sécurité.

# Créer (le moteur d'histoire)
Avant de toucher à `forge.js`, aux techniques de `plan.js` ou à la graine dans `act.js` : lire `CREER.md` (les principes de Justin, ce que fait le code, ce qui n'est pas fait).
Avant de toucher à `mise.js` / `mise-data.js` (🎥 un épisode écrit → ce qu'on voit) : la section « Mise en scène » de `CREER.md`.
