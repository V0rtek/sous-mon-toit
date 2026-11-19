# Git
Toujours pousser directement sur `main` (demandé par Justin le 29/10). Pas de branche, pas de PR.

# Génération
Pas de validateur qui bloque ou liste des erreurs (demandé par Justin le 30/10) : un problème dans ce que l'IA génère se règle dans le prompt (technique + exemple plat → ce qui marche).

# ⚠️ À TRAITER EN PRIORITÉ : orchestration FORGE (demandé par Justin le 19/11)
Le texte `FORGE-ORCHESTRATION.md` (stocké tel quel) est le chat le plus important du projet : il permettra de montrer quelque chose aux utilisateurs. Ne le traiter qu'avec le modèle le plus fort et l'effort le plus haut, **jamais Sonnet ni effort medium**. Chaque ligne compte et doit être adressée, réfléchie, solutionnée (surtout les questions de la section 4). Rappel visible en haut du menu Écrire (`#forgeTodo` dans `index.html`) : le retirer quand c'est traité.

# Écriture
Jamais beaucoup de mots d'un coup : une réplique ou une narration longue se coupe en 2-3 bulles (« Okay. » / « I come out. » / « But the gun stays in my holster. ») (demandé par Justin le 09/11).

# Façade
Par défaut le lien montre seulement Full demo (Infos, Plus et leurs écrans cachés). Le cadenas en bas du menu demande le code ; le navigateur s'en souvient. Code : `j` (demandé par Justin le 02/11). Dans `index.html` il n'y a que son hash (`KEY_HASH`) : pour changer le code, recalculer le hash avec `keyHash`. Le repo est public : c'est un mur pour les visiteurs, pas une vraie sécurité.

# Créer (le moteur d'histoire)
Avant de toucher à `forge.js`, aux techniques de `plan.js` ou à la graine dans `act.js` : lire `CREER.md` (les principes de Justin, ce que fait le code, ce qui n'est pas fait).
Avant de toucher à `mise.js` / `mise-data.js` (🎥 un épisode écrit → ce qu'on voit) : la section « Mise en scène » de `CREER.md`.
