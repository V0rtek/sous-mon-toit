# De l'histoire à l'écran (25/11)

Réponse à Justin, après son test du 24/11 : « Quand je lis tes réponses, ça a l'air incroyable, mais je viens de vivre une
histoire et je n'ai pas compris. Est-ce possible que tu me dises que t'as fait des trucs, mais que ça manque de
profondeur / de spécificité / de variabilité ? Qu'est-ce qui manque pour avoir une vraie série / un vrai scénario ? »

## 0. La réponse courte

**Oui.** Ce que j'ai construit existe et tient debout (les tests le prouvent), mais j'ai décrit l'**intention** plus que le
**résultat**. Le moteur produit un **squelette d'histoire cohérent** : qui veut quoi, qui sait quoi, ce qui arrive, dans quel
ordre, pourquoi. Ce n'est pas encore une **série** : il manque des scènes, du concret, de la matière vécue, et un seul auteur
pour tout le texte.

Pourquoi ton histoire ne se comprenait pas, cause par cause (reproduite : `essais/creer/histoires.js` › `U1_test_justin`) :

| Ce que tu as vu | La vraie cause | Fait le 25/11 |
|---|---|---|
| Épisode 1 : « Tu l'as tué ? » « Oui. » dès la 2e minute | le prompt de l'épisode 1 ne disait pas à Claude que le meurtre de Justin était **secret** (un crime de Justin était rangé en « ironie », donc absent de la liste « caché ») | le prompt dit maintenant : le public le voit, personne d'autre ne le sait, personne ne le dit, Justin ment |
| Le frère de Melissa en cellule, le capitaine… jamais repris ensuite | Claude recevait des faits du monde (la figure hors champ) que la suite du moteur n'utilisait pas : il inventait une intrigue que personne ne suivait | Claude ne reçoit que les faits que l'histoire utilise |
| Pourquoi il tue Amare ? | le moteur le savait (« Amare menaçait Melissa ») mais ne le **montrait** jamais | le mobile est joué avant le crime : « Amare coince Melissa contre le mur : "La prochaine fois, je ne serai pas aussi gentil." Justin a tout vu. » |
| « Justin se met entre Melissa et Melissa » | une phrase-modèle « se met entre {celle qu'il protège} et {celui qui s'y oppose} » ; ici, celle qui s'oppose, c'est Melissa elle-même (elle veut partir) | protéger quelqu'un qui veut partir = le retenir : « Justin promet à Melissa de tout arranger, si Melissa reste. » + un test qui interdit « X et X » |
| « Justin doit mentir une fois de plus, devant tous. » Mentir sur quoi ? | une phrase-modèle par **type** de désir (« cacher »), sans ce qu'il cache | la ligne dit quoi et à qui : « Justin ment à Melissa sur sa soirée. » / « Ruby demande à Justin d'où il vient vraiment. » |
| « Melissa est hors de danger » (quel danger ?) | le gain « protéger » disait « hors de danger » même sans danger | voir dessous : le danger est devenu réel et concret |

Et la plus grosse, que ton histoire m'a fait trouver : **le dilemme était abstrait** (« sa vie ou Melissa ? »). Le moteur avait
déjà de quoi le rendre concret sans rien inventer : le mobile (« Amare menaçait Melissa ») fait de **Melissa la suspecte
évidente**, et elle part à l'aube (ça ressemble à une fuite). Maintenant :

> Ruby : « Amare menaçait Melissa. Qui d'autre avait une raison ? » Et Melissa part à l'aube. · On demande à Justin où était
> Melissa cette nuit-là. Justin dit qu'il ne sait pas. · Melissa, tout bas : « Dis-leur que j'étais avec toi. » · Ruby, devant
> tous : « À l'aube, on emmène Melissa. Sauf si quelqu'un a quelque chose à dire. » · Justin : « C'est moi. J'ai tué Amare. » ·
> Melissa est libre. À l'aube, Melissa prend le bateau. Sans Justin.

Le choix est une **action** (parler ou la laisser payer), pas une étiquette.

**Ce que ça dit de ma méthode** : mes tests mesurent la structure (chaque moment a une cause, rien de mort n'agit, chaque
question a sa réponse…), pas la **compréhension**. Et je lis les histoires en connaissant le moteur : je sais ce que « Justin
ment » veut dire parce que j'ai écrit la règle. Toi, tu lis à froid. C'est exactement le biais. → voir § 4, le lecteur à froid.

## 1. Le système, de bout en bout (tel qu'il est le 25/11)

```
ton idée (une phrase)
  │  Claude (prompt de base, forge.js basePrompt) — choisit DANS DES LISTES : le lieu, 2-4 persos tirés du jeu,
  │  leurs traits, ce qu'ils veulent (~10 sortes), leurs liens, 22 sortes de secrets/passés/objets, 8 sortes d'événements
  ▼                                              ⚠️ ici, tout ce que ton idée a de particulier et qui n'est pas dans les listes se perd
la base (l'état : S)
  │  FORGE (forge.js) — les désirs, les conflits, la paire du climax, les mobiles (fils.js), la figure hors champ, l'acte 2
  ▼
le monde
  │  ORCH (orch.js) — la vérité (facts), les forces, la destination (ce que Justin choisit, le prix), la recette d'ouverture,
  │  les moments (UNE phrase chacun, tirée de phrases-modèles), qui sait quoi, les boucles, les épisodes
  ▼
├─ épisode 1 : le plan (openingPlan) → Claude écrit les répliques (plan.js prompt2, passif) → mise en scène (Claude ou sans IA)
│             → le lecteur (mise.js : les persos en sprites, à la taverne)
├─ épisodes 2+ : les écrans noirs, une phrase du moteur par tap
└─ (25/11) 📜 le scénario : la même histoire en mise en page de scénariste ; ✍️ Claude l'écrit pour de vrai, à partir de la bible
            📋 tout copier : l'idée → la base → le moteur → l'épisode 1 → le scénario
```

Deux auteurs qui ne se parlent pas : **Claude** pour l'épisode 1, **des phrases-modèles** pour le reste. C'est le saut que tu as
senti entre l'épisode 1 joué et les diapos.

## 2. Ce qu'une scène demande à l'histoire (le contrat)

« On fait des épisodes ou des scènes ? » Les deux : **un épisode est fait de scènes**. Chez nous : l'épisode 1 = une scène
continue de 2 minutes à la taverne ; les suivants = 1 ou 2 scènes courtes (dans le scénario), ou leurs temps forts (les diapos).

Pour écrire une bonne scène, un auteur (humain ou Claude) a besoin de recevoir, **pour chaque scène** :

| Il faut | Pourquoi | Ce qu'on a | Ce qui manque |
|---|---|---|---|
| **Où, quand, qui est là** (qui entre, qui sort) | la continuité ; qui peut entendre quoi | le lieu (taverne), les persos | les scènes elles-mêmes (on a des moments, pas des scènes), les entrées/sorties |
| **Ce que chacun veut, MAINTENANT, en concret** | une scène = des volontés qui se cognent | le désir de l'acteur (« protéger Melissa ») | le but concret dans la scène (« qu'elle ne monte pas sur ce bateau ») |
| **Ce que chacun sait, croit à tort, cache, et à qui** | le sous-texte : on parle autour de ce qu'on cache | `W.knows`, les fausses croyances, les secrets | le donner à l'auteur scène par scène (fait en partie dans le prompt ✍️) |
| **Les temps (beats), dans l'ordre** : cause → action → ce qui change | ce qui doit arriver | ✓ les moments (cause, acteur, action, monde, public) | — |
| **Ce que le public doit comprendre / ressentir** à la fin de la scène | le but de la scène pour le spectateur | ✓ `aud` (apprend, soupçonne, craint, ironie) | — |
| **Le tournant** (la dernière image) | finir sur une question | ✓ | — |
| **Les objets et détails** qui doivent apparaître (semés, payés) | le concret, la mémoire | les graines, le foulard, le bateau | une matière vécue par perso (voir 3.4) |
| **Le ton, la façon de parler** de chacun | qu'on reconnaisse qui parle | les traits, la voix | — |

## 3. Ce qui manque pour une vraie série, par ordre d'impact

1. **Un seul auteur pour tout le texte, à partir d'une seule bible.** Aujourd'hui l'épisode 1 est écrit, le reste est résumé.
   Premier pas fait le 25/11 : ✍️ « Claude l'écrit pour de vrai » reçoit la bible complète (persos, vérité et qui la sait,
   chaque moment de chaque épisode, ce que le public se demande à la fin de chacun) et écrit **toute** la série en scénario.
   Pas encore : le relire, le jouer.
2. **Le concret.** Le moteur raisonne en étiquettes (« protéger Melissa », « sa vie », « son honneur ») et les dit telles quelles
   (« Justin choisit Melissa, au risque de sa vie »). Une série dit des actions : « monter sur le bateau », « dire où il était ».
   Chaque désir doit avoir un **but concret** (un objet, un lieu, une heure) et chaque obstacle une **action** de quelqu'un.
   Fait pour le détective inversé (le suspect, l'aube, le bateau) ; à généraliser.
3. **Des scènes, pas des phrases.** Un épisode de série = 2 à 4 scènes ; une scène = des gens qui veulent des choses opposées,
   dans un lieu, avec un retournement. Une phrase par temps fort, c'est le résumé d'un épisode, pas l'épisode.
4. **La matière vécue.** Tes épisodes écrits à la main sont forts parce qu'ils sont précis : *Floor 31* (`heist.js`) — « dad r u
   coming to practice tonight? », « mom says we wont have the money to do next season ». Le moteur, lui, a ~3 phrases-modèles
   par sorte de désir et une dizaine par sorte de force : d'une histoire à l'autre, on reconnaît les mêmes phrases (« X reste
   après la fermeture, rien que pour Justin »). Il manque, **par perso, 2-3 détails à lui** (un métier, un objet, quelqu'un hors
   champ, une habitude) que les temps forts utilisent, et que l'idée tapée nourrit.
5. **L'idée qui se perd.** L'idée passe par des listes fermées : « Justin tue l'homme qui menaçait Ruby » devient « un
   meurtre », et le reste de l'idée disparaît. Il faudrait garder les **détails libres de l'idée** comme des faits que le moteur
   porte et que l'auteur doit utiliser.
6. **La variété.** La forme est la même à chaque histoire (veut → arrive → cherche → couvre → se trahit → choisit). Les 4
   recettes et les sortes d'intrigue (`FORGE-LONG-TERME.md`) ouvrent un peu ; les détails vécus (4) changeront plus.
7. **Mesurer « compris »** au lieu de le supposer (§ 4).

## 4. Le plan proposé (dans cet ordre)

1. **Le lecteur à froid** (la mesure) : Claude, **sans** la bible, lit les diapos ou le scénario d'une histoire, et répond à 6
   questions : qui veut quoi ? que s'est-il passé ? qui sait quoi ? qu'est-ce qui est en jeu ? pourquoi le climax ? qu'est-ce que
   ça coûte ? On compare à la vérité du moteur. Une histoire « comprise » = 6/6. On le fait tourner sur les 30 histoires de
   test et des tirages : on arrête de deviner, et chaque correction se mesure.
2. **Le scénario par Claude pour tout** (le premier jet est là : ✍️). Le relire avec le lecteur à froid ; le jouer : chaque scène
   écrite → la mise en scène (`mise.js`) comme l'épisode 1.
3. **Les détails vécus** : le prompt de base demande, par perso, 2-3 détails concrets + garde les détails libres de l'idée ; le
   moteur les met dans les temps forts (une confidence, un mobile, une graine) et les donne à l'auteur.
4. **Les scènes comme données** dans `orch.js` : regrouper les moments en scènes (lieu, qui est là, ce que chacun veut et cache
   dans CETTE scène, le tournant) : c'est le contrat du § 2.
5. **Les buts concrets** de chaque désir (objet, lieu, heure), et le climax comme une action.

## 5. Ce qui est fait le 25/11

- Les 6 causes du tableau du § 0, corrigées dans le moteur (pas dans le texte d'une histoire) ; le dilemme concret du détective
  inversé ; l'horloge dit l'échéance de l'histoire (« Plus que quelques heures avant le bateau de l'aube, celui de Melissa »)
  au lieu d'une phrase que personne ne dit.
- **📋 Tout copier** à la fin de l'histoire (écran « Fin ») et sur ▶ Tester une histoire : l'idée → la base → toute l'histoire du
  moteur → l'épisode 1 écrit → le scénario. Envoie-le-moi quand une histoire ne marche pas : je verrai exactement ce que tu as vu.
- **📜 Le scénario** : la même histoire, sans images, en mise en page de scénariste ; **✍️ Claude l'écrit pour de vrai** (avec la
  clé : tout seul ; sans : le prompt est copié).

## 6. Les scènes (25/11, Justin : « Chaque moment devient une scène ? Comment on s'assure qu'elles engagent ? Tyler Mowery : une scène, c'est des choix et des changements ; elle doit créer un engagement constant »)

**Non : un moment ≠ une scène.** Un moment est la plus petite unité de changement (« Justin ment à Melissa sur sa soirée »).
Une **scène** regroupe **2 à 5 moments** autour d'**une seule question**, dans un lieu et un temps continus, et finit sur
un **tournant**. Un **épisode** = 1 à 3 scènes, et il finit toujours sur le tournant d'une scène.

### Ce qui fait une scène, et ce qui la rend engageante
Mowery dit : une scène, c'est des choix et des changements. La forme qui le rend concret, c'est celle de Dwight Swain
(« scene & sequel », reprise par à peu près tous les manuels) :
- **la scène** : quelqu'un veut quelque chose **maintenant** (le but) → quelque chose ou quelqu'un s'y oppose (le conflit) → ça
  tourne autrement que prévu (le tournant) ;
- **la suite** : il encaisse → il n'a que deux mauvaises options (le dilemme) → **il choisit**, et ce choix devient le but de la
  scène suivante.

C'est ça, l'engagement constant : il y a **toujours une question ouverte** que le public comprend (« sur qui Ruby va-t-elle
tomber ? »), et elle ne se ferme que pour en ouvrir une plus forte (« va-t-il la laisser payer ? »). Le choix sous pression
montre qui sont les gens ; le changement est la preuve que la scène a servi.

**La fiche d'une scène** (ce que l'auteur reçoit, au lieu des phrases du moteur) :

| Champ | Exemple : la scène 7 de l'histoire de Justin |
|---|---|
| Où, quand, qui est là | la salle, tard dans la nuit ; Ruby, Justin, Melissa, les clients |
| Qui la porte | Justin |
| Ce qu'il veut, **ici**, en concret | que Ruby ne regarde pas vers lui |
| Ce qui s'y oppose | Ruby veut un nom, cette nuit |
| L'enjeu | s'il est soupçonné : la corde |
| La question du public | sur qui Ruby va-t-elle tomber ? |
| Ce que le public sait de plus (ou de moins) | il a vu Justin tuer : chaque phrase de Justin est un mensonge |
| Les temps (3 à 5 changements) | la bourse est pleine → « Amare a coincé quelqu'un » → les regards vers Melissa → « Elle était où ? » |
| **Le choix** (deux mauvaises options) | défendre Melissa (et attirer les regards sur lui) ou se taire (et la lâcher) : il se tait |
| Le tournant (ce qui a changé) | Melissa : tranquille → soupçonnée ; Justin : celui qui la protège → celui qui la lâche |
| La question de sortie | va-t-il la laisser payer ? |

**Les règles d'engagement** (dans le prompt de l'auteur, avec un exemple plat → ce qui marche ; puis mesurées par le lecteur à
froid, jamais un validateur qui bloque) :
1. On comprend ce que quelqu'un veut dans les 3 premières répliques.
2. Chaque temps change quelque chose (ce qu'on sait, ce qu'on croit, ce qu'on a, avec qui on est) ; un temps qui ne change rien
   est coupé.
3. Il y a toujours au moins une question ouverte, et la scène finit sur une question plus forte que celle du début.
4. Un choix sous pression par scène, entre deux mauvaises options (le héros ou son adversaire : le choix de Ruby d'attendre en
   est un).
5. Entrer tard, sortir tôt : pas de « bonsoir », pas d'« après ».
6. Le public sait plus que quelqu'un dans la scène (ironie) ou moins (mystère), jamais exactement autant.

### L'histoire de Justin (U1) : 34 moments → 12 scènes → 6 épisodes

| Ép. | Scène | Moments | Le but contre l'obstacle | Le choix | Le tournant → la question de sortie |
|---|---|---|---|---|---|
| 1 | 1 · La meilleure place | #1-3 | Justin veut garder Melissa près de lui ; Amare la menace | Justin pose sa chope et suit Amare dans la cour | Melissa est menacée → que va faire Justin ? |
| 1 | 2 · La cour | #4 | Justin veut qu'Amare la laisse tranquille ; Amare rit | Justin frappe | Amare est mort → on va le trouver |
| 1 | 3 · C'est l'un de nous | #5-8 | Justin veut ne pas être soupçonné ; Ruby veut un nom | Justin ment (au comptoir toute la soirée) | Ruby ferme la salle → va-t-elle trouver ? |
| 2 | 4 · Le sac sous l'escalier | #9, 11, 14 | Justin veut savoir si Melissa part ; elle veut partir sans rien dire | il lui ment sur sa soirée | elle le prend sur le fait, et elle part → qu'est-ce qu'elle sait ? |
| 2 | 5 · Une minute | #10, 12, 13 | Justin doit faire disparaître le foulard ; Ruby interroge la salle, puis descend | détruire la preuve plutôt que fuir par la porte qu'il vient de vérifier | la preuve est partie, à une minute près → Ruby a-t-elle vu quelque chose ? |
| 3 | 6 · Avec ou sans toi | #15-17 | Justin veut qu'elle reste ; le bateau part à l'aube | Melissa pose l'ultimatum | elle partira → va-t-il fuir avec elle ? |
| 3 | 7 · Qui d'autre avait une raison ? | #18-20 | (la fiche ci-dessus) | il se tait | Melissa soupçonnée, lâchée → va-t-il la laisser payer ? |
| 4 | 8 · La tache | #21-22 | Melissa veut comprendre ; Justin veut qu'elle ne sache pas | il ment encore | elle a vu → va-t-elle parler ? |
| 4 | 9 · L'heure exacte | #23-24 | Justin veut paraître normal ; Ruby écoute | Ruby ne dit rien (elle attend) | Ruby a compris → que va-t-elle faire ? |
| 5 | 10 · La porte de la cour | #25, 26, 28 | Justin veut fuir ; Melissa : « Dis-leur que j'étais avec toi » | il reste | il ne fuira pas → va-t-il parler ? |
| 5 | 11 · À l'aube | #27, 29-31 | Ruby : « On emmène Melissa, sauf si… » ; Justin veut se sauver ET la sauver | il avoue | Justin est pris, Melissa est libre |
| 6 | 12 · Le bateau | #32-34 | Melissa veut partir ; Justin est emmené | Melissa prend le bateau | la place vide |

Ce que la table montre : certains moments ne sont pas des scènes mais un temps à l'intérieur d'une scène (une graine, une
confidence, l'horloge) ; certains choix n'existent pas encore dans le moteur (« il suit Amare dans la cour », « détruire plutôt
que fuir ») : l'auteur les tire du moment d'après (le **comment**, jamais le **quoi**) ; l'acte de Justin (scène 2) a besoin d'une
vraie confrontation avant le coup, pas d'une phrase.

### La scène 7, écrite

```
ÉPISODE 3 · « Qui d'autre avait une raison ? »
INT. TAVERNE, LA SALLE — TARD DANS LA NUIT

Ruby renverse la bourse d'Amare sur le comptoir. Les pièces roulent jusqu'à Justin.

            RUBY
      Pleine.
      On ne l'a pas tué pour ça.

Justin rattrape une pièce. La pose. Essuie un verre déjà sec.

            RUBY
      Hier soir, Amare a coincé quelqu'un contre le mur.
      Tout le monde a vu.

Personne ne répond. Les regards glissent, un par un, vers Melissa.

            MELISSA
      Il coinçait tout le monde.

            RUBY
      Toi, tu pars à l'aube.
      Ton sac est sous l'escalier.

Melissa cherche Justin des yeux.

            RUBY (à Justin)
      T'étais au comptoir toute la soirée.
      Elle était où ?

Un temps. Justin regarde Melissa. Melissa attend.

            JUSTIN
      Je sais pas.
      Il y avait du monde.

Melissa baisse les yeux. Ruby, elle, regarde le verre que Justin essuie depuis tout à l'heure.
```

Sept changements en une minute : la bourse (ce n'était pas un vol) → la pièce rattrapée (le public voit sa nervosité, Ruby pas
encore) → « Amare a coincé quelqu'un » (la scène 1 revient, le danger se tourne vers Melissa) → Melissa se défend → le sac (sa
fuite devient une preuve) → « Elle était où ? » (le dilemme, en public) → « Je sais pas » (le choix) → le verre (Ruby commence
à regarder du bon côté). Le public sait tout du long ce que personne d'autre ne sait : c'est l'ironie qui tient la scène.

### Comment le moteur le ferait
1. **Regrouper** (`orch.js`, une fonction `scenes()`) : une nouvelle scène quand le **lieu** change (la cour, l'escalier, la
   salle), quand le **temps** saute, quand la **question** change, ou quand celui qui porte la scène change. Les graines, les
   confidences et l'horloge vont **dans** une scène, jamais seules. Les épisodes sont alloués par scènes (un épisode finit sur le
   tournant d'une scène).
2. **Remplir la fiche** avec ce qu'on a déjà : qui agit et pourquoi (le moment), la cause, ce que le public sait et se demande
   (`ledger`), ce que chacun sait (`W.knows`), l'enjeu (la boucle ouverte). **Ce qui manque** dans les données : le **lieu** de
   chaque moment (aujourd'hui il est seulement dans le texte : « dans la cour »), le **temps** (le début de la nuit, tard, l'aube),
   et le **choix** comme un champ (qui choisit, entre quoi et quoi). Quand une scène n'a pas de choix, le moteur le tire de son
   moment-tournant : l'acteur aurait pu faire autrement, on écrit les deux options.
3. **L'auteur** (Claude) écrit chaque scène **depuis sa fiche**, avec les 6 règles ; le prompt corrige ce qui sort mal (technique +
   exemple plat → ce qui marche), comme le reste.
4. **Le lecteur à froid** lit la scène écrite, sans la fiche, et répond : que veut-il ici ? qu'est-ce qui l'en empêche ? qui a
   choisi quoi ? qu'est-ce qui a changé ? qu'as-tu envie de savoir maintenant ? Ses réponses comparées à la fiche = la mesure de
   l'engagement, scène par scène.
5. Ce que ça coûte : le regroupement et les fiches, moyen (le lieu, le temps et le choix à ajouter aux moments) ; le prompt de
   l'auteur par fiche, petit ; le lecteur à froid, petit à moyen. L'ordre conseillé : le lecteur à froid d'abord (pour mesurer
   avant / après), puis les fiches, puis l'auteur.

## 7. Construit (25/11, Justin : « sur papier c'est excellent ; concrètement, construis-le et voyons les problèmes »)

**Ce qui tourne** (`orch.js` › `scenesOf`, `cards`, `sceneStats` ; la théorie : `REFERENCE-THEORIE-RECIT.md` § 4) :
- les moments sont regroupés en **scènes** (le lieu, le moment de la nuit, les gens, le fil) ; les **épisodes sont coupés sur le
  tournant d'une scène**, jamais au milieu ;
- chaque scène a sa **fiche** : qui la porte et ce qu'il veut, qui est contre, **l'objet** (un de l'histoire, sinon un objet du
  décor marqué « neutre » pour ne pas planter un fusil qui ne tire jamais), **le choix** (qui le tient, A ou B, ce qui est
  choisi), ce qui change, ce que le public sait de plus, **la question de la scène** (son choix) et celle **en sortant** (le choix
  de la scène suivante : Swain, la décision donne le but suivant) ;
- 🧭 montre les fiches (« H · LES SCÈNES ») ; 📜 le scénario a les en-têtes de scène (INT. TAVERNE, LA COUR — LA NUIT) ; ✍️ Claude
  écrit **depuis les fiches** (le dialogue = le débat sur le choix, l'objet comme ancre, 2 + 2, pas de question-tremplin) ;
  l'épisode 1 reçoit l'en-tête et le choix de chaque scène.

**Mesuré** (70 histoires : toutes celles de test + 40 tirages) : 13 scènes par histoire, 2,9 moments par scène, 9 épisodes ;
un choix dans **87 %** des scènes (+ les épilogues), tenu par Justin dans 51 % ; quelqu'un contre : **97 %** ; un objet : 100 %,
dont **44 %** de l'histoire elle-même ; une question en sortant : **86 %** ; une seule action : 11 %. Tests : tout passe.

**L'essai d'écriture** : l'histoire de Justin (U1) écrite depuis les fiches, en suivant seulement le prompt de ✍️ :
`essais/creer/film/U1-scenario-ecrit.txt` (13 scènes, 7 épisodes).

**Les problèmes que ça cause** (trouvés en construisant, en mesurant et en écrivant ; du plus grave au moins grave) :

| Problème | Exemple | La cause exacte | Ce qu'il faudrait | Taille |
|---|---|---|---|---|
| **Des scènes fourre-tout** | U1 scène 5 : le sac, la porte de la cour, le mensonge à Melissa, Ruby qui interroge : 4 fils ; la fiche dit que Ruby tient le choix, la scène parle de Justin et Melissa | le regroupement suit les gens (quelqu'un en commun = même scène), pas **la question** | regrouper d'abord par fil (le fait, le désir, la force), puis par lieu | moyen |
| **Des temps-étiquettes au lieu d'actions** | « Justin choisit Melissa, au risque de sa vie » (fin de l'ép. 6), puis l'aveu à l'ép. 7 ; en écrivant, j'ai dû inventer l'action (il ferme la porte de la cour) | `decide` est une étiquette du moteur ; l'action réelle (avouer / se taire) vient après, dans une autre scène | le choix du climax porte son action, dans la même scène que l'acte | petit |
| **Des temps intérieurs sans corps** | « Pour celui qui a fait ça, ce sera la corde. Justin le sait. » ; « Melissa compte plus (2/3) » | les « pèse plus » sont des états d'esprit ; personne ne les dit ni ne les montre | chaque temps intérieur a quelqu'un qui le dit ou un objet qui le montre | moyen |
| **L'auteur est poussé à inventer** | pour que la corde existe, j'ai écrit « Le juge arrive à midi » : un fait nouveau, contre la règle | conséquence des deux problèmes d'avant | idem : le moteur donne le corps du temps | — |
| **Des scènes à une personne** | Ruby seule avec le corps : pas de débat possible ; j'ai mis Justin, muet, à la porte | la découverte et le serment sont des réactions (la « suite » de Swain), pas des scènes | une scène de réaction a un témoin (la règle : quelqu'un dans la pièce) | petit |
| **Des raisons qui manquent** | pourquoi Amare menace Melissa ? Le moteur ne le sait pas : la confrontation reste mince (« Retourne à ton comptoir ») | le mobile est une étiquette (« Amare menaçait Melissa ») sans son pourquoi à lui | les détails vécus (§ 3.4) : une dette, une histoire, un objet | moyen |
| **Ce que les persos savent, hors crime** | Ruby dit « elle part à l'aube » : comment le sait-elle ? J'ai dû le planter (Ruby voit le sac à l'ép. 2) | `W.knows` ne suit que les crimes, pas les autres secrets | étendre qui-sait-quoi à tous les faits | moyen |
| **Le comment du crime** | « Justin tue Amare » : prémédité ou une poussée de colère ? J'ai choisi la poussée : ça change le poids moral | le moteur ne choisit pas la façon | la tirer des traits (colère/violence → dans la colère ; ruse → prévu) | petit |
| **Des choix-épouvantails** | « Ruby : jurer de trouver, ou laisser faire ? », « mentir, ou dire la vérité ? » à chaque couverture | l'option B est générique ; le guide demande des choix vrais (« 50/50 ») | B = la vraie tentation de la scène (pour la couverture : faire accuser quelqu'un / fuir) | moyen |
| **Le bruit dans la bible** | « Ruby veut rester en vie / protéger Amare » après la mort d'Amare | les désirs ne sont pas filtrés par le moment | ne donner que les désirs vivants à ce moment | petit |
| **La longueur des épisodes** | 7 épisodes d'une minute ; le guide (mobile) dit ~5 min, l'acte 1 entier dans l'épisode 1 | on coupe à 1-2 scènes par épisode (≤ 5 diapos) | décider avec Justin : garder 2 min + écrans noirs, ou 3-4 scènes par épisode | décision |

**Ce que je conseille ensuite** : les trois petits (le choix porte son action ; un témoin dans les scènes de réaction ; le comment
du crime), puis le regroupement par fil (le plus grave), puis qui-sait-quoi pour tous les faits. Et le lecteur à froid pour
mesurer avant / après, au lieu de lire moi-même.
