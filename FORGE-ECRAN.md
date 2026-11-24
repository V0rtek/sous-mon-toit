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
