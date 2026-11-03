# Créer : le moteur d'histoire (Outils › Écrire › ⚡ Créer)

À lire avant de toucher à `forge.js`, à `plan.js` (catalogue des techniques) ou à `act.js` (la graine).
Ce qui suit vient des échanges avec Justin du 02 au 03/11 : ce sont ses principes, pas des suggestions.

## Comment Justin travaille
- En français, des messages courts, souvent dictés. Il veut voir le résultat, pas une explication.
- **Montrer, pas dire** : icônes, couleurs, visages, très peu de texte. Une vue compacte reste compacte ; **un tap ouvre la vue complète**, avec le texte pour comprendre (fenêtre `big()` dans forge.js).
- Sur le cell, pas de survol : un tap dit brièvement en bas ce qu'on a touché (toast), un appui long montre le détail.
- Tester avec une **vraie histoire montée exprès**, lire le résultat comme un scénariste, corriger les règles, recommencer. Ne pas annoncer « ça marche » sans l'avoir lu.
- On discute la structure avec lui (grandes questions) quand elle est floue ; sinon on construit.

## Les principes (de Justin)
1. **Les désirs sont la base.** Chaque perso a des désirs déduits : de base (rester en vie, le respect), d'un lien (protéger un proche ; romance pour un couple ou une attirance), choisis (🎯), de sa faille, des événements, des infos. Les enjeux menacent ces désirs.
2. **Conflit = deux désirs opposés.** Ils peuvent être partagés entre plusieurs lignes.
3. **Plotline = un désir fort et ses conflits.** Celles de Justin sont les lignes principales ; celles des autres courent « pendant ce temps ». Elles se tressent.
4. **La faille est une couleur**, pas l'histoire (« veut toujours partir des scènes »). Elle devient une ligne seulement si quelque chose la menace vraiment (ex. « rester en vie » seulement si une vie est en jeu).
5. **Désir global ≠ désir de scène.** Le global tient l'acte ; le désir de scène est ce que le perso veut là, maintenant.
6. **Raise stakes renforce toujours un désir qui existe.** Avant chaque choix, on renforce les deux désirs que le choix oppose : plus les deux côtés pèsent, plus le choix est fort.
7. **La scène / l'épisode tourne autour d'un choix** (ou d'une issue incertaine : va-t-il mourir ?). Le public doit comprendre le poids des deux côtés et se demander quelle issue arrivera.
8. **Le climax = un choix entre deux désirs de Justin** (« Mary ou la liberté ? »). Il est gardé en tête dans tous les épisodes de l'acte.
9. **Des questions dramatiques au pluriel**, ouvertes par ce qui arrive (qui est-il ? où était-il ?), pas forcément dites par un perso.
10. **Les liens ne sont pas toujours causaux** : donc · mais · soudain (une surprise, quelqu'un arrive) · pendant ce temps. Jamais « et puis ».
11. **Une technique = une application concrète**, avec : ce qu'elle demande (prérequis) / ce qu'on voit / ce qu'elle produit (un choix posé, une info, un trait montré, un enjeu). Certaines ont **plusieurs moments** placés le long de l'histoire (Coincé devant tous : la question plantée tôt → chacun essaie et échoue → quelqu'un la lui pose devant tous → sa réponse).
12. **Imbrication et valeur par réplique** : un moment porte des morceaux d'autres techniques (un Tell a story qui glisse le seed de la job et montre un trait). Tout est relié (Amare en retard → on en parle → l'attente → sa job de nuit = le payoff).
13. **Seed & payoff** : la surprise est d'autant plus forte que les seeds sont loin et nombreux.
14. **Les événements sont des entités** (vol, trahison, meurtre…) auxquelles beaucoup de choses se rattachent, avec leurs cases (coupable, victime, qui cherche, coupable caché).
15. **Les infos se choisissent dans une liste** : jamais tapées à la main, jamais inventées par l'IA.
16. **Plot ≠ scène.** Une technique de plot décide *ce qui arrive* (Créer, Acte) ; une technique de scène décide *comment un moment se joue* (Plan de scène). Certaines sont les deux. Classement : `TECH_LVL` dans techniques.js (premier jet, à revoir avec lui).
17. **Un seul catalogue actionnable** : les objectifs et techniques de Plan de scène (`PLAN.GOALS` dans plan.js). Écrire › Techniques reste l'arbre théorique (objectif → manière générale → tactique, la chaîne varie).
18. **Branche puis rejoint** : un choix change le début de l'épisode suivant, puis l'histoire se rejoint ; les choix s'accumulent vers le climax (pas d'arbre complet).

## Ce que fait le code (forge.js)
- **Quoi** : lieu, persos (pool = tous ceux qui ont les 6 poses de la feuille de base), piliers (8 archétypes, mélangeables) et faille, 🎯 ce que chacun veut, 🔗 liens, 🗂️ infos (liste fixe), 💥 événements (arrive, disparaît, meurtre, vol, trahison, menace ; cases au tap ; 🙈 coupable caché).
- **Moteur** : `desires()` → `conflictsOf()` → `plotlinesOf()` → `climaxOf()` (= `story()`). `roles()` traduit ça pour les vieux écrans et la graine de l'acte (A ≠ B).
- **La tresse** (`line()`) : chaque plotline monte de quelques crans (montrer le désir → le conflit → chaque côté pèse plus → il tente la facilité, ça rate) ; le 1er événement ouvre l'acte (3 temps si quelqu'un arrive), les autres « soudain » ; les moments secondaires montent dans le moment d'où ils découlent (`rides`) ; la crise contient les révélations et le climax. Chaque moment garde sa cause (`cause`), son lien (`lk`), ses visages (`who`), sa ligne (`line`).
- **Épisodes** (`episodes()`) : coupes auto entre épisodes de la tresse (déplaçables ✂) ; chaque épisode finit sur un choix entre deux désirs de Justin (`chooseFor`), avec 🅰️ 🅱️ juste avant ; ↪️ la conséquence ouvre l'épisode suivant (l'option jouée se coche à la main) ; bilan ❤️ ❓ ⚔️ ➡️.
- **Techniques** : chaque moment prend ses techniques dans `PLAN.GOALS` (`K`, `optsOf`, `withTech`) ; un tap = une autre façon ; ⓘ = sa fiche (chaîne objectif › manière › tactique liée aux cartes de Techniques, a besoin de / on voit / produit / ses moments, instructions et exemple dans `DETAIL`, vides).
- **Vues** : 🎞️ storyboard de l'acte (cartes + liens tracés : setup → payoff, question → réponse, enjeu → choix, choix → conséquence) · 🧵 tresse · liste des épisodes · 📄 copier le plot · 🧍 prompts des pose sheets.
- **Sortie** : 🎬 = le plan de l'épisode dans Plan de scène, **sans IA** (`planOf`) ; ▶ = ce plan + Haiku écrit seulement les répliques (prompt 2 de plan.js) ; 📋 = la route par l'Acte (prompt de l'acte + graine).

## Pas fait (discuté, à reprendre)
- **Ce que Haiku reçoit par rectangle** : la cause et la technique, mais pas *qui est sur place* ni *ce que chacun veut dans cette scène*. Aucune génération de bout en bout n'a été testée ici (pas de clé dans l'environnement).
- **Les textes de montée d'enjeu et de conséquence sont des formules** (« un regard qui dure trop », « la porte se referme ») : à rendre concrets et propres à l'histoire.
- **Le contenu des payoffs** (la vraie réponse surprise, les dépliants) : le système donne la structure, pas le contenu.
- **Les fiches de techniques** : seule « Coincé devant tous » est complète. À écrire **avec Justin**, une à la fois (il ne veut pas que je les rédige seul) ; suivantes proposées : Show character positioning, Tell a story. `DETAIL` (instructions, exemple) est vide.
- **Plan de scène a trop de texte** : à rendre aussi visuel que le storyboard.
- **Plusieurs scènes par épisode** : le prompt 2 ne suit que la boîte « ep ». Le changer touche à l'IA : demander à Justin d'abord (il doutait du découpage des rôles de l'IA).
- **Le jeu ne retient pas l'option choisie en jouant** : la conséquence de l'épisode suivant se règle à la main (S.picked).
- **Les choix passés ne changent pas les côtés du climax** (seulement « Pèse : … »). Quelques vraies branches pour les gros choix : à discuter.
- **L'engagement au service du choix** : s'assurer que chaque perso en jeu dans un choix a été rendu attachant avant (ajout automatique, pas fait).
- **La route par l'Acte** (📋) garde l'arc fixe de 5 étapes ; elle produit des actes moins tenus que la route Créer → plan sans IA → répliques.
- **Le genre des persos** est inconnu (tournures neutres : « veut l'en empêcher »).
- **La clé Haiku sur tous les appareils** (coffre chiffré avec le jeton GitHub) : codé puis mis de côté (le contrôle de sécurité refusait de mettre la clé, même chiffrée, dans le repo public). Justin devait choisir : A pousser quand même, C bouton pour copier la clé d'un appareil à l'autre. Rien n'est poussé.
- **L'épisode 2 est chargé** quand il y a des lignes secondaires ; certains conflits secondaires sont peu reliés à Justin.

## Pièges connus
- `#warn` (« TU DOIS AVOIR UNE DEMO… », ajouté par une autre session) recouvre l'écran et bloque les clics des tests Playwright : le retirer dans le test.
- D'autres sessions poussent aussi sur `main` : `git fetch` + `git rebase origin/main` avant de pousser.
- Le hook « unpushed commits » regarde la branche `claude/...` qui n'existe pas sur GitHub : c'est normal, on pousse sur `main` (CLAUDE.md).
