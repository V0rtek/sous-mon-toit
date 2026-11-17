# Plan de reprise : le graphe des faits dans Créer

Pour une session qui n'a pas le contexte. Écrit le 17/11 par la session précédente.

## 0. Avant de toucher au code
1. Lire `CLAUDE.md` (règles du repo) puis `CREER.md` en entier (principes de Justin 1 à 31, ce que fait le code, « Pas fait », « Pièges connus »).
2. Fichiers : `forge.js` (le moteur et les vues de Créer), `fils.js` (bases de données : pas, formes, mobiles, crans, figures, voix), `plan.js` (catalogue de techniques + prompts 1 et 2), `index.html` (CSS + balises script).
3. Règles qui comptent ici :
   - Pousser sur `main` directement (`git fetch origin main` + `git rebase origin/main` avant ; d'autres sessions poussent aussi). Pas de branche, pas de PR. L'avertissement du hook « unpushed commits » sur la branche `claude/...` est normal.
   - Pas de validateur qui bloque ou liste des erreurs sur la sortie de l'IA : un problème se règle dans le prompt (technique + exemple plat → ce qui marche).
   - Une réplique longue se coupe en 2-3 bulles.
   - Justin n'aime pas le contenu écrit par Claude seul (formes, exemples, questions) : le marquer « premier jet », le lui montrer, le reprendre avec lui.
   - Il veut voir le résultat, en français, court, avec un avant/après concret. Il corrige vite quand on impose une structure : demander avant de figer un modèle.
   - Après chaque changement du moteur : monter la version `?v=` des scripts dans `index.html`, et vérifier que chaque moment de l'exemple (`PRESET.txt`, rangé par id de moment) a encore ses mots.

## 1. Où on en est
- **Les fils** (fait, testé) : chaque moment dit quels fils il fait avancer (`mv: [[fil, pas]]`). 5 sortes de fil, ~30 pas. État du monde (mort, parti, arrivé). 2 actes. Budget de l'épisode. Vue 🖥️ Grand écran.
- **Les faits reliés** (première tranche seulement, `graph()` dans `forge.js`, `FILS.FIGS`) : une figure hors cast (le passeur, l'usurier, le capitaine, le propriétaire) créée quand un vol n'a pas de victime sur scène, quand quelqu'un est « celui qu'on cherche » (info `villain`), ou quand il y a une promesse (info `promise`). Ces trois-là et la menace lisent la figure. Un moment « 👥 Chacun réagit » monte dans le vol. Une voix de base par pilier (`FILS.VOICE`).
- **Pour l'IA** : `planOf(n)` met dans le plan `story` (su / caché / en l'air / morts / répliques d'avant) et `facts` ; `prompt2` dit comment s'en servir.
- **Jamais fait** : lire une vraie sortie Haiku avec ces prompts (pas de clé dans l'environnement).

## 2. Ce que Justin veut (ses mots, résumés)
- Qualité de l'histoire d'abord : cohérente, comprise, engageante, **spécifique**.
- Ses trois reproches sur un épisode généré : dialogue pas naturel ni propre à chacun ; l'événement arrive et personne ne réagit vraiment (pas de cause à effet locale, pas d'agenda individuel) ; le secret est vague, tout est générique.
- **Un graphe, pas une formule** : « x / y / z peut être un autre secret, quelqu'un, un événement ». Un secret est gardé parce qu'il tient à un désir de garder une relation, par peur de la réaction de quelqu'un, et il peut reposer sur quelque chose de faux. Mais ce n'est pas un gabarit : ce sont des liens entre éléments qui existent déjà.
- « J'imagine absolument tout en lien » : conséquences, open loops, éléments du perso, croyances et leurs chaînes, ce que sait le public.
- Les faits sont **structurés** (comme le reste de Créer), tirés avec 🎲, changeables au tap.
- Un fait peut **naître dans un épisode** puis être relié (une promesse faite à l'écran devient la cause d'un vol plus tard).
- Ne rien forcer d'inutile : pas de désir ou de figure qui ne servira pas.
- Pas de rustine : régler au cœur, dire quel type de problème c'est et où il reviendra.
- Plus tard : choix qui comptent en arbre ; persos qui évoluent (une croyance bascule après un événement et change le comportement).

L'exemple qu'il a validé comme « exactement ça » :
> Isa doit payer le passeur avant l'aube pour faire traverser son frère. Amare lui a promis l'argent. Il vole la bourse du passeur. Justin est recherché pour une dette de jeu à ce même passeur.
> PASSEUR : Ma bourse. Elle était là. / ISA : Celle de la traversée ? / PASSEUR : Pas de bourse, pas de bateau. / AMARE : Assieds-toi, Isa. Je règle ça. / JUSTIN : … (baisse la tête) / ISA : Tu dis rien, toi ? D'habitude t'as un avis sur tout.

## 3. Le problème de fond (diagnostic)
Le moteur planifie des **fonctions** (« un indice », « quelqu'un s'approche du secret ») sans posséder de **faits**. L'IA invente donc le concret au moment d'écrire, sans mémoire : générique et incohérent d'un épisode à l'autre. `graph()` règle ça pour 4 cas codés à la main. Le vrai travail est de généraliser : **tout élément peut pointer vers tout élément**, et le moteur, le registre, les fils et les mobiles lisent le même graphe.

## 4. Le travail, dans l'ordre

### Étape 1 : le graphe comme donnée (cœur) — FAIT le 17/11 (principe 32 de `CREER.md`)
Fait : `S.figs`, `S.things`, `S.links` ; `weave()` (crée ce qui sert, garde ce qui est choisi, enregistre) ; `graph()` ne lit plus que les liens ; puces de liens dans 🕸️ (tap = suivant possible) ; `unref()` quand on supprime une info ou un événement ; `genSig` porte les liens (les répliques gardées avant restent lues). Vérifié : mêmes textes de plot, de plans et de graine qu'avant sur 76 histoires (les 12, J1 et ses 4 variantes `J1b`-`J1e`, l'exemple, 60 tirages 🎲 à hasard fixé) ; `regress.js` contrôle que chaque lien pointe vers quelque chose qui existe. Reste ouvert : les types (premier jet, à valider avec Justin), le contenu de la promesse pas encore tiré au 🎲, une seule figure.
Ce qui était prévu :
- Aujourd'hui `graph()` recalcule des liens à partir de l'état ; rien n'est stocké. Passer à des liens stockés dans l'état : `S.links = [{ a, k, b }]` où `a` et `b` sont des références (`p:amare` personne, `f:0` figure hors cast, `i:2` info, `e:1` événement, `d:justin:love:isa` désir, `t:0` chose concrète) et `k` le type.
- Types proposés (à valider avec Justin, il n'a pas tranché sur le grain) : pour · à cause de · caché à · par peur de la réaction de · su par · contient / prouve · doit à · croit à tort.
- 🎲 tire les liens (stable par `S.seed`, voir `vary()`), en ne reliant que ce qui sert. Un tap sur un lien = le suivant possible. Montrer les liens dans la section 🕸️ existante.
- Garder `S.fig` (figures) et ajouter `S.things` (choses concrètes : une bourse, une traversée, une dette, par décor) dans `fils.js`.
- Migrer les 4 cas actuels de `graph()` vers ce modèle sans changer leur sortie (l'histoire `J1_isa_amare` de `essais/creer/histoires.js` sert de référence).

### Étape 2 : tout le moteur lit le graphe
- `motiveOf()` (mobile d'un événement) : lire le lien « pour / à cause de » au lieu de `FILS.MOTIVE` seul ; `MOTIVE` devient le repli.
- `truth()` : ce que tient un objet = lien « contient ».
- Les autres secrets (`INFOS` dans `forge.js` : famille cachée, trahison, amour secret, faux nom, sang royal, malade, part bientôt…) : chacun reçoit ses liens (caché à qui, par peur de quoi, su par qui, prouvé par quoi). Aujourd'hui ils restent des étiquettes.
- Les montées d'enjeu (`FILS.RAISE`, `stakeText()`) : quand un désir est relié à un fait, le cran nomme le fait (comme « le passeur demande après quelqu'un qui ressemble à Justin »).
- L'acte 2 (`buildAct(2)`, `autoEv()`) : presque rien n'y lit les faits ; les épisodes 5 à 8 restent génériques.
- **Réactions** : généraliser « 👥 Chacun réagit » à tout événement : pour chaque perso présent, sa réaction sort de ses liens au fait. Règle convenue avec Justin : l'agenda d'un perso décide *comment* il pousse, jamais *comment le moment finit* (le plot garde l'issue).

### Étape 3 : le public dans le graphe
- « Su par » avec le public comme personne. Remplacer `registre()` (séparé aujourd'hui) par une lecture du graphe. Trois régimes : le public ne sait pas (question) ; le public sait, le perso non (on attend qu'il l'apprenne) ; le perso sait, le public non (agenda caché).
- Une boucle ouverte = un lien dont un bout n'est pas encore montré. Garde-fou : un lien jamais montré au public est du bruit ; ne pas le créer.

### Étape 4 : un fait créé dans un épisode
- Un moment peut créer un nœud (une promesse faite à l'écran) puis d'autres s'y relient. Décidé avec Justin : c'est le moteur qui le crée au moment du plan, pas l'IA en écrivant (sinon il faut relire sa sortie). Le nœud porte l'épisode où il naît ; rien ne peut s'y relier avant.

### Étape 5 : voix
- `FILS.VOICE` est une ligne par pilier. Justin : « basique pour le moment, mais liée à la personnalité ». Ajouter la faille et le mélange de piliers ; l'envoyer aussi pour Justin (le joueur), qui n'est pas dans `chars`.

### Étape 6 (plus tard, ne pas commencer sans lui)
- Choix en arbre : un choix change un lien ; les moments d'après lisent les liens. Aujourd'hui « branche puis rejoint » (`S.picked`).
- Croyances qui basculent : lien « croit » qui change après un événement et change le comportement.

## 5. Défauts connus à corriger en passant
- L'accroche « Place vide » ouvre « Qui manque ? » et rien n'y répond : les accroches (`hook`) ne sont pas des fils.
- Le mobile ne se change pas au tap (`S.tq['mot'+k]` est lu, aucun bouton ne l'écrit).
- La figure hors cast n'a pas d'image : elle ne peut ni apparaître ni parler. Les textes disent « on entend parler de lui ». Si Justin veut qu'elle parle, il faut un perso avec feuille de poses.
- Le bouton « 📋 Prompt de l'acte » : Justin dit qu'il « semble ne rien faire ». Il copie dans le presse-papiers et affiche une ligne en bas ; non vérifié chez lui.
- Justin a testé en collant « 📄 Copier le plot » dans un chat. Ce texte ne contient ni les règles de répliques ni les fiches de techniques, et il montre les deux actes d'un coup (l'IA a joué la menace de l'acte 2 dans l'épisode 1). Envisager un bouton qui copie le vrai prompt d'un épisode (`PLAN.prompt2()` après `planOf(n)`).

## 6. Tester
- Servir le repo : `python3 -m http.server 8765`. Puis `node essais/creer/regress.js 40` : 12 histoires montées exprès + N tirages 🎲 en 1 et 2 actes. Il vérifie : aucun mort présent ou agissant, aucun choix à un seul côté, toute question et tout détail semé payés, aucun texte `undefined`, `planOf` / `seed` / `plotText` ne plantent.
- Il ne lit pas l'histoire. Après chaque changement : ouvrir Créer, charger un état (`localStorage['smt-forge2']`), lire `FORGE.plotText()` de 2 ou 3 histoires comme un scénariste, dont `J1_isa_amare`.
- Pour ouvrir Créer dans un test : `localStorage['smt-open'] = '323'`, retirer `#warn`, cliquer `#forgeBtn`.
- Ajouter au script un contrôle par étape (ex. : aucun fait nommé avant l'épisode où il naît).
- Dès qu'une clé Haiku est disponible : ▶ sur l'épisode 2 de l'exemple et sur `J1`, lire les répliques, corriger le prompt 2.

## 7. Pièges
- `CUR_ACT`, `NOW`, `SHOWN` sont des variables de module posées pendant un calcul : toujours les remettre (`try/finally`).
- `graph()` est appelé par `infoFr()` : ne jamais y appeler `infoFr`, `desires()` ou `story()` (boucle).
- Les objets désir sont recréés à chaque `storyAt()` : comparer par `id`, pas par identité, entre deux appels.
- `fils.js` se charge après `plan.js` et avant `forge.js` (il ajoute ses formes à `PLAN.GOALS`).
- Le genre des persos est inconnu : tournures neutres ; Justin est « il ».
- Toute phrase a sa version française (écran, plan) et anglaise (prompts).

## 8. Comment rendre compte à Justin
Un avant/après sur son histoire (Justin, Isa, Amare), en tableau court. Dire ce qui est vérifié et ce qui ne l'est pas. Poser les questions de modèle avant de coder quand c'est flou. Mettre `CREER.md` à jour à chaque étape (principe numéroté + « Pas fait »).
