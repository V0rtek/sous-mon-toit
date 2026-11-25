# Le cap (25/11) : ce qu'on fabrique, pourquoi ça sort plat, comment on le fait ensemble

> **Corrigé par Justin le 25/11 : lire d'abord le § 10.** Les § 5 (« tu juges, j'encode », le « corpus d'or »), 8 (des lois trop simples) et l'exemple de conflit du § 3 (« lame ») sont remplacés.

Réponse à Justin, après « ce scénario c'est de la merde » (`essais/creer/film/U1-scenario-ecrit.txt`) : pas de sens, rien de
surprenant, pas de raisons, générique, du plus probable ; un vrai film aurait dit pourquoi Amare fait ça et l'aurait relié à
plus grand ; le dialogue sonne faux (« Et toi, t'as quoi, à part une chaise ? » / « J'ai Melissa. C'est tout ce qui me reste. »).
Et : « Qu'est-ce que je vise, comme output ? Je passe beaucoup de temps à itérer avec l'IA, et peu à construire des bases, des
recettes, des techniques, parce que ce n'est pas clair. »

## 0. La réponse courte

- **L'output visé, pour l'utilisateur : un seul format.** Des épisodes joués (le lecteur, la taverne), ~5 minutes, en dialogues,
  chacun finit sur un crochet. Les écrans noirs avec des phrases du moteur, c'était une béquille de test : ils apprennent au
  spectateur que l'histoire est un résumé. Ils restent pour nous, pas pour lui.
- **L'output pour nous (le développement) : du texte.** La bible, le découpage en scènes, le scénario. C'est là que la qualité se
  décide. Le visuel ne vient qu'après un scénario qui passe ta barre (c'est ce que Showrunner t'a montré : la production
  demande un jugement humain énorme ; l'écriture aussi).
- **Le prochain jalon : un pilote.** UN épisode de 5 minutes (l'acte 1 complet, comme le dit ton guide), excellent sur papier,
  puis mis en scène. Tout le reste (plus d'actes, plus d'épisodes, les diapos) attend. À la télé, on ne commande pas une saison
  sur un plan : on tourne un pilote.
- **Pourquoi c'est plat** : le moteur construit l'histoire de l'extérieur (des événements → des étiquettes → des phrases), puis
  demande à un auteur de les habiller **en lui interdisant d'ajouter quoi que ce soit**. Le sens, les raisons, les surprises
  vivent à l'intérieur (des croyances, des blessures, des histoires d'avant) : le moteur ne les a pas, et l'auteur n'a pas le droit
  de les apporter. Et une IA, laissée seule, écrit la suite la plus probable : le cliché.
- **Pourquoi ton temps part en itérations** : itérer avec l'IA dans une conversation, c'est du jugement qui s'évapore. Ce que tu
  décides doit devenir des **données** (une règle + un exemple plat → ce qui marche + où ça s'applique). Toi, tu juges ; moi, je
  transforme chaque note en données et en code ; le moteur s'en sert. C'est la seule façon que ça s'accumule.

## 1. Ce qu'on fabrique, en couches (comme une vraie production)

```
COUCHE                      CE QUE C'EST                                         CHEZ NOUS                QUI DÉCIDE
0  le concept, le thème     ce que l'histoire DÉFEND (mensonge contre vérité),   ✗ absent                 toi (l'IA propose)
                            mis en objets (A + B)
1  la bible                 chaque perso : croyance / besoin / envie, sa         ~ des étiquettes         toi + moi
                            blessure, ses raisons (en chaîne), ses détails,      (piliers, faille, envies)
                            son passé avec les autres
2  l'arc                    le cercle, les 2 grands choix, le plan des           ✓ le squelette           le moteur
                            retournements (planté → rappelé → payé)              ✗ thème, retournements
3  le découpage             l'épisode en scènes : chaque scène a son             ✓ les fiches (hier)      le moteur + toi
                            INTENTION (ce qu'elle fait au spectateur, avec       ✗ intention, technique,
                            quelle technique), son choix, son changement,        surprise
                            sa surprise
4  la scène écrite          le dialogue : sous-texte, statut, états qui          ✗ règles minces,         l'IA + tes notes
                            bougent, personne ne dit ce qu'il ressent            pas d'exemples d'or
5  la production            la mise en scène, les visages, la caméra             ✓ épisode 1 (mise.js)    l'IA + toi
6  la mesure                compris ? envie de l'épisode 2 ?                     ✗                        le lecteur à froid + toi
```

Ce que tu as senti en lisant : les couches 0 et 1 n'existent presque pas, et la couche 4 n'a pas de goût. Les couches 2, 3 et 5
sont bonnes. On a construit le squelette avant le cœur.

## 2. Pourquoi ce scénario est mauvais (à la lecture d'un pro), et ma part

| Ce que tu dis | Ce qui se passe vraiment | La couche |
|---|---|---|
| **Pas de conflit philosophique, pas de sens** | l'histoire ne défend rien. Le moteur avait pourtant les deux pôles : Justin veut *protéger* Melissa, Melissa veut être *libre*. C'est un thème (« aimer, est-ce retenir ? ») : personne ne l'a vu, parce qu'aucune couche ne cherche ce que l'histoire veut dire | 0 |
| **Rien de surprenant** | chaque temps est la première idée du genre : le tueur ment → alibi ; l'enquêteuse trouve un détail ; il se trahit ; ultimatum ; aveu. C'est la moyenne de tous les polars : ce qu'une IA produit par défaut | 2, 3 |
| **Pas de raisons, pas de profondeur** | les mobiles sont des étiquettes d'un catalogue (« Amare menaçait Melissa ») sans leur pourquoi à eux ni leur passé. Personne n'a d'avant | 1 |
| **Générique** | les phrases viennent de ~3 modèles par sorte de désir. Et l'IA comble le vide avec le plus probable | 1, 4 |
| **« Un vrai film aurait dit pourquoi Amare »** | dans un vrai film, l'antagoniste est le héros de sa propre histoire : il a une raison, une blessure, et son geste se relie à quelque chose de plus grand. Chez nous, Amare n'est qu'une force qui menace | 1 |
| **Le dialogue sonne faux** | « Et toi, t'as quoi, à part une chaise ? » est une **question-tremplin** (ton guide l'appelle *alley-oop line*) : Ruby n'a aucune raison de la poser, sauf pour que Justin explique. Et « C'est tout ce qui me reste » dit **4** au lieu de **2 + 2**. Personne ne s'ouvre comme ça, à froid, à quelqu'un qui le pique | 4 |

**Ma part, sans détour** : c'est moi qui l'ai écrit, en suivant mon propre prompt. Ce prompt dit « n'ajoute rien : pas de
nouveau secret, pas de nouvelle intrigue » (pour rester fidèle au moteur). C'est exactement ce qui tue la profondeur : le
moteur ne donne pas les raisons, et l'auteur n'a pas le droit de les inventer. Et quand une IA n'est guidée par rien d'autre que
des règles générales, elle donne le plus probable. J'ai fait la moyenne. Mes tests mesuraient la structure, jamais le sens.

## 3. La même histoire, avec ce qui manquait (pour montrer, pas pour figer)

Les mêmes gens, les mêmes faits du moteur (Justin tue Amare ; Melissa part à l'aube ; Ruby cherche ; Justin protège Melissa).
On ajoute seulement les couches 0 et 1.

**Le thème (couche 0)** : *aimer, c'est mettre à l'abri* (le mensonge de Justin… et d'Amare) contre *aimer, c'est laisser
choisir* (la vérité). En objets : **la place près du feu** (l'abri, qui est aussi une cage) contre **le bateau de l'aube** (la
liberté, la perte).

**La bible (couche 1)** : chacun a une croyance, une blessure, une envie, un besoin.

| | Ce qu'on voit | La raison cachée | La racine (avant l'histoire) |
|---|---|---|---|
| **Justin** | il garde la place près du feu pour Melissa, il compte ceux qui sortent | il décide pour elle depuis deux ans | sa petite sœur Lou s'est noyée dans le port ; il devait la surveiller. Il croit : « si je quitte les gens des yeux, ils meurent » |
| **Melissa** | elle part sur le bateau de l'aube | une modiste de la capitale l'a prise comme apprentie ; la lettre date de trois mois ; elle ne l'a pas dit, parce que Justin aurait dit non *pour elle* | elle ne part pas à cause d'Amare. **Elle part à cause de Justin** |
| **Amare** | il la coince contre le mur : « La prochaine fois, je ne serai pas aussi gentil » | il l'aime en secret (il est avec Ruby) ; il a vu le sac sous l'escalier ; il voulait la retenir, maladroitement | sa mère a pris le bateau de l'aube quand il avait huit ans et n'est jamais revenue. Il a gardé son billet. Il a le même mensonge que Justin : **Justin tue son propre reflet** |
| **Ruby** | elle cherche le coupable | elle sait qu'Amare regardait Melissa ; elle a peur de ce qu'elle va trouver | quand elle accuse Melissa, c'est un peu la jalousie qui parle sous le nom de justice |

**Les retournements, plantés (couche 2)** : surprenants, mais inévitables après coup.
1. Dans la bourse d'Amare, Ruby ne trouve pas « de l'argent » : un billet du bateau de l'aube, **vieux de vingt ans**, au nom
   de sa mère. La menace était une supplication. Justin a tué un homme qui faisait exactement ce que lui fait. *(Planté : à
   l'épisode 1, Amare renverse sa chope quand la corne du bateau sonne. Rappelé : il fixe le sac sous l'escalier.)*
2. Au climax, Melissa : « Je ne pars pas à cause d'Amare. Je pars à cause de toi. » Toute la protection de Justin était le
   problème. *(Planté : elle ne s'assoit pas à la place ; elle garde son manteau ; elle retire ses mains.)*
3. Le choix final a un sens : Justin avoue **et la laisse prendre le bateau**. Pour la première fois, il laisse quelqu'un
   choisir. Il paie de sa liberté ; elle gagne la mer. La taverne devient sa cellule, le bateau sa vérité à elle.

**La scène d'ouverture, réécrite, avec ses intentions** (couche 3 → 4) :

```
INT. TAVERNE — LE SOIR

Le feu. Devant, la meilleure place. Un client tend la main vers le tabouret :
Justin y pose une chope pleine, sans un mot. Le client s'en va.
            → intention : on voit ce que Justin veut sans qu'il le dise ; un geste
              de protection qui est déjà un geste de propriétaire (le thème, en image)

Melissa entre. De la neige sur les épaules. Elle voit la place.
Elle reste debout, au comptoir. Elle garde son manteau.

            JUSTIN
      Ta place.

            MELISSA
      Je reste pas longtemps.

            JUSTIN
      T'as les mains gelées.

Il prend ses mains pour les réchauffer. Elle les retire. Doucement.
            → le conflit sans le nommer (il retient, elle part) ; le débat passe par un
              objet (la place) et un geste (les mains) : 2 + 2. On sent qu'elle part
              avant qu'elle le dise

            RUBY (en passant, des chopes plein les bras)
      Laisse-la respirer, Justin.
      Elle va finir sous verre.
            → Ruby n'interroge pas : elle pique. Sa première réplique dit qui elle est
              (lucide, mordante) et dit tout haut ce que le public commence à voir

Dehors, la corne du bateau du soir. Au fond, Amare renverse sa chope.
Il reste figé, le regard sur la porte. Personne ne le remarque. Sauf nous.
            → la brute a une peur irrationnelle (ton guide : « un moment de faiblesse ») :
              la graine de sa blessure, et du retournement 1

Près de l'escalier, Amare attrape le poignet de Melissa. Il a vu le sac.

            AMARE (tout bas)
      La prochaine fois...
      Je serai pas aussi gentil.

Melissa ne baisse pas les yeux. Elle le regarde comme on regarde quelqu'un
qui se noie.
            → le public voit une menace, comme Justin ; mais un détail jure : elle a de
              la pitié, pas peur. C'est la graine qui rendra le retournement juste

Justin a tout vu. Il ne voit que la main sur le poignet. Il pose sa chope.

            MELISSA (sans se retourner)
      Justin. Non.

Il sort par la porte de la cour.
            → le choix : la laisser décider, ou décider pour elle. Il décide pour elle,
              encore : son mensonge en action. Fin sur une question
```

Ce qui a changé n'est pas « mieux écrit » : c'est qu'il y a, dessous, un thème, des blessures, des raisons en chaîne, et un plan
de retournements. **Le dialogue n'est bon que si la bible est profonde.**

## 4. Casser l'évident (parce que l'IA, par défaut, donne le plus probable)

Pour chaque décision qui compte (un mobile, un retournement, l'approche d'une scène, une réplique clé), le moteur suit le
processus d'une salle d'auteurs :
1. **Nommer l'évident** : écrire les 3 à 5 idées que 80 % des auteurs (et toutes les IA) auraient. Elles sont interdites.
2. **Générer à partir des bases, pas de la mémoire de l'IA** : combiner une blessure, une chaîne de raisons, un type de
   retournement (§ 6). La combinaison donne des idées folles, mais ancrées.
3. **Filtrer** : cohérent avec ce qui est établi ? plantable avant ? Est-ce que ça défend le thème ? Est-ce que ça fait quelque
   chose au spectateur ? Est-ce que le spectateur l'aurait deviné (il ne faut pas) et est-ce que ça a du sens après (il faut) ?
4. **Choisir** : toi (au début), puis une grille faite de tes choix.

## 5. Le jugement humain, en données (la leçon de Showrunner)

Le jugement ne s'apprend pas avec des règles générales : il s'apprend avec **tes exemples et tes notes**.
- **La boucle des notes** : chaque critique que tu fais devient (a) une règle, (b) un exemple plat → ce qui marche, (c) la couche
  où elle s'applique, (d) une question que le lecteur à froid pose ensuite. Tu n'as pas à écrire les données : tu juges, je les
  écris. Tes notes du 25/11, transformées, sont au § 7.
- **Le corpus d'or** : 10 à 20 scènes de films ou de séries que tu trouves parfaites, chacune avec son intention en une phrase. Ce
  sont les exemples que l'IA imite : beaucoup plus fort que des règles.
- **La grille** : tes critères (le sens, la surprise, le concret, les raisons, la vérité du dialogue) deviennent les questions du
  lecteur à froid.
- **Le partage du temps** : une séance = 20 % générer, 80 % juger et encoder. Si on ne sort pas d'une séance avec des entrées en
  plus dans les bases, on a perdu la séance.

## 6. Les bases à construire (le format, et l'idée de chaque première entrée)

| Base | Une entrée = | Exemple (de l'histoire refaite) |
|---|---|---|
| **Blessures** | l'événement d'avant · la croyance qu'il a créée · ce qu'elle fait faire sous pression · ce qui la déclenche · ce qui la guérirait | la mère partie sur le bateau · « ceux qui partent ne reviennent pas » · retenir de force · un départ, la corne du bateau · voir quelqu'un partir et revenir |
| **Chaînes de raisons** | ce qu'on voit → la raison cachée → la racine, et QUAND le public apprend chaque niveau | « il la menace » (ép. 1) → « il voulait la retenir » (le billet, milieu) → « sa mère » (fin) |
| **Retournements** | le type · ce qu'il faut planter avant · quand le révéler · ce qu'il fait relire | « la menace était une supplication » · une peur irrationnelle, un objet gardé · au milieu · le crime de Justin change de sens |
| **Thèmes** | un mensonge contre une vérité · les désirs qui les portent · les objets qui les montrent | « aimer, c'est retenir » / « aimer, c'est laisser choisir » · protéger / être libre · la place près du feu / le bateau |
| **Détails vécus** | un objet, un lieu ou une habitude, avec son histoire et sa charge | Melissa compte ses pièces deux fois ; Justin compte ceux qui sortent ; le billet vieux de vingt ans |
| **Gestes de dialogue** | une façon de parler, quand on l'emploie, un exemple plat → ce qui marche | « répondre par un geste au lieu des mots » : Il prend ses mains. Elle les retire. |
| **Le corpus d'or** | une scène qui marche, ce qu'elle fait au spectateur, comment | (à venir : les tiennes) |

`techniques.js` (ton carnet) a déjà le bon format pour les techniques : un nom, comment, un exemple plat → ce qui marche. Il
faut le même pour ces bases, et que le moteur s'en serve à chaque couche.

## 7. Tes notes du 25/11, devenues des données (la boucle, en vrai)

| Ta note | La règle | La couche | La question du lecteur à froid |
|---|---|---|---|
| pas de sens | toute histoire a un thème (mensonge / vérité) avant le premier moment ; le climax y répond | 0 | « Que dit cette histoire sur la vie ? » |
| rien de surprenant | chaque épisode a au moins un retournement planté, jamais la première idée du genre | 2 | « Qu'est-ce qui t'a surpris ? L'avais-tu vu venir ? » |
| pas de raisons | toute action importante a sa chaîne (ce qu'on voit → la raison cachée → la racine), et le public apprend chaque niveau à son heure | 1 | « Pourquoi X a fait ça ? Et pourquoi, vraiment ? » |
| générique | chaque perso a 2-3 détails vécus ; une scène en utilise au moins un | 1, 4 | « Cite un détail qui n'appartient qu'à cette histoire » |
| « un vrai film aurait dit pourquoi Amare » | l'antagoniste a sa propre envie, sa blessure, et une raison qui le relie au thème | 1 | « Que voulait l'adversaire ? Le comprends-tu ? » |
| personne ne s'ouvre comme ça | on ne se confie que sous condition (voir § 8) ; sinon on dévie | 4 | « Une réplique t'a-t-elle sonné faux ? » |
| question-tremplin | aucune question posée pour qu'un autre explique ; une question sert toujours un agenda | 4 | — |

## 8. Le dialogue : un premier jet de lois, à corriger par toi

1. **Personne ne parle pour informer.** Chacun parle pour obtenir quelque chose : rassurer, tester, piquer, séduire, avertir,
   dévier (David Mamet).
2. **On ne répond presque jamais à la question posée.** On répond à l'intention derrière, ou on dévie.
3. **Une question est rare et sert toujours un agenda** : un test, un piège, prendre le contrôle, prendre soin. Jamais pour que
   l'autre explique.
4. **On ne s'ouvre que sous condition** : une confiance gagnée à l'écran ; un risque partagé ; la nuit, l'alcool, la fatigue ; côte
   à côte plutôt que face à face (au comptoir, en marchant) ; en échange d'un secret ; quand on croit ne jamais revoir l'autre ;
   acculé. Sans condition : une blague, un geste, un changement de sujet.
5. **Le sentiment se montre par ce qu'on fait avec les objets** et par les mots qu'on évite (2 + 2).
6. **Chaque réplique bouge le statut** : on se hausse ou on abaisse l'autre (Keith Johnstone, *Impro*).
7. **L'état émotionnel se garde et bouge à petits pas.** Une réplique qui saute un état (du calme à l'aveu) est fausse.
8. **La réplique la plus courte qui fait le travail.** On s'interrompt, on ne finit pas, on reprend le mot de l'autre pour
   l'attaquer.
9. **Le concret trahit** : le menteur donne trop de détails (« douze chopes, trois soupes »), celui qui souffre en donne trop peu.
10. **La voix vient de la blessure** : Justin compte les gens ; Amare donne des ordres courts ; Melissa répond par des gestes.

## 9. L'ordre de travail proposé

1. **Décider le pilote** : une histoire, 5 minutes, l'acte 1 complet. (Je propose celle-ci, refaite : « La place près du feu ».)
2. **Les couches 0 et 1 dans le moteur** : le thème, la bible (croyance, besoin, envie, blessure, chaînes de raisons, détails), à
   partir des bases du § 6. J'écris les 20 premières entrées de chaque base ; tu gardes, tues, corriges.
3. **Le plan des retournements** (couche 2), avec ce qu'il faut planter.
4. **Les intentions dans les fiches de scène** (couche 3) : ce que la scène fait au spectateur, avec quelle technique de ton
   carnet, et sa surprise.
5. **Le dialogue** (couche 4) : tes lois corrigées + ton corpus d'or comme exemples.
6. **Écrire le pilote par toutes ces couches → tes notes → la boucle**, jusqu'à ce que tu veuilles voir l'épisode 2.
7. **Seulement après : le mettre en scène** (couche 5).

Ce qu'on arrête d'ici là : plus d'actes, plus d'épisodes automatiques, polir les diapos.

## 10. Les corrections de Justin (25/11, sa réponse)

- **La méthode** : lui fait le breakdown d'une vraie scène → on l'implémente concrètement dans un système clair → je teste avec un
  output réel qu'il voit → il dit si j'ai compris. Pas « tu juges, j'encode ».
- **Pas de corpus de scènes à imiter** : des techniques et des recettes qui s'imbriquent (sous-techniques), au format de
  `techniques.js`.
- **Le terme** : « conflit philosophique » (croyance contre croyance : `REFERENCE-THEORIE-RECIT.md` § 1), pas « thème ».
  « Aimer, est-ce retenir ? » : refusé (« lame »).
- **Les lois du dialogue (§ 8) sont trop simples** : il faut beaucoup plus spécifique, tiré d'exemples réels qu'il découpe.
- **Le visuel compte dès l'écriture** : ce qui est écrit doit tenir dans ce que le lecteur sait montrer. La référence d'une bonne
  scène jouée : la première scène de Last Call (`bar.js`). Ma scène réécrite du § 3 a des gestes que le lecteur ne sait pas
  montrer (prendre les mains, la neige sur les épaules).
- **Les diapos restent.**
- **Le matériau réel** : analyser des scènes de vrais films. Exemple donné : *Stranger's Pawn* (Christian Jaramillo, 2025), deux
  hommes, une partie d'échecs, une conversation.
