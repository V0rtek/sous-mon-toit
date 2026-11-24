# FORGE · long terme (ce qu'on garde pour plus tard)

Demandé par Justin le 24/11 : « keep long term stuff somewhere ». Ce qui est voulu ou utile mais pas fait, avec d'où ça vient.
Une ligne = un chantier. Quand un chantier est fait : le retirer d'ici et l'écrire dans `CREER.md`.

Fait le 24/11 (retiré d'ici, écrit dans `CREER.md` 51-55) : le détective inversé (Justin coupable, « sera-t-il pris ? »), ses
réponses qui montent, l'antihéros qui garde son secret, les canaux d'info comme un seul système « qui croit quoi » (la fausse
lecture, le signe, le tiers qui a son agenda, le public d'abord), le coupable qui sent que l'autre sait, ce qu'il aime qui le
retient « parfois ».

## Vers une vraie série (25/11, le plan de `FORGE-ECRAN.md` § 4, dans cet ordre)
- **Le lecteur à froid** : Claude, sans la bible, lit une histoire et répond à 6 questions (qui veut quoi, que s'est-il passé, qui sait quoi, l'enjeu, pourquoi le choix, ce que ça coûte) ; comparé à la vérité du moteur, sur toutes les histoires de test.
- **Un seul auteur** : le scénario écrit par Claude pour toute la série (premier jet : ✍️ dans 📜), relu par le lecteur à froid, puis joué (chaque scène → `mise.js`).
- **Les détails vécus** : 2-3 détails concrets par perso (un métier, un objet, quelqu'un hors champ, une habitude) + les détails libres de l'idée, portés par le moteur et utilisés par les temps forts.
- **Les scènes comme données** : regrouper les moments en scènes (lieu, qui est là, ce que chacun veut et cache dans cette scène, le choix, le tournant) ; la méthode, la fiche, les 6 règles d'engagement et l'exemple complet (34 moments → 12 scènes) : `FORGE-ECRAN.md` § 6.
- **Les buts concrets** : chaque désir a un objet, un lieu, une heure ; le climax est une action (fait pour le détective inversé).

## Le choix et la fin
- **Les deux côtés du choix coûtent** (Justin, 24/11). Aujourd'hui seul le côté lâché a un prix ; le côté gagné devrait aussi coûter quelque chose (*The Godfather* : Michael gagne la famille, perd Kay et lui-même).
- **La tragédie** : un Justin froid peut maintenant garder son crime (l'antihéros), mais il ne perd jamais *tout* (*Macbeth*, *Breaking Bad* fin) : quand, et comment le décider.
- **Le choix varie à long terme** (Justin, 24/11) : « il prend le côté que sa faille fuyait », sauf l'antihéros, est un premier jet.

## Les indices et le public
- **Le coupable caché à la vue de tous** : il aide l'enquête, on le voit souvent sans le soupçonner (aujourd'hui un coupable caché peut disparaître 2 ou 3 épisodes).
- **Passer du mystère au suspense au milieu d'un mystère** : fait quand l'ouverture n'est pas un mystère (le public voit le coupable seul) ; reste : le faire au milieu d'une ouverture 🔎 (*Vertigo* : la lettre de Judy).
- **Quelqu'un d'autre que Justin remarque le signe** (`TELL` : aujourd'hui c'est Justin qui voit la chope renversée).

## Les forces
- **Un plan aussi long que l'acte** : un rival a 3 coups ; dans un acte long il se tait un épisode ou deux (l'audit : ~30 % des histoires ont un épisode sans leur adversaire).
- **Les réponses de Justin comme escalade hors crime** (*Joker* : le monde frappe, il répond plus fort à chaque fois) : fait quand Justin a fait le crime ; reste : la même montée face à une humiliation, une menace, un rival.
- **D'autres forces intérieures que la faille** : la blessure (*Casablanca* : Ilsa est partie), le code (« I stick my neck out for nobody »), la peur, la fausse croyance sur soi.

## La structure
- **Un cercle par acte et un pour toute l'œuvre** (Justin, 24/11) : fait en premier jet (chaque moment a ses deux pas) ; reste : la portée de chaque fil comme donnée (se ferme dans l'acte / à la fin), un acte qui saute un pas.
- **3 actes** : `actState` ne va que de l'acte 1 à l'acte 2. Et l'acte 2 ne sait pas encore ce que l'acte 1 a répondu à « sera-t-il pris ? » (forge.js ne lit pas l'aveu d'orch.js).
- **Les intrigues secondaires** (Justin, 24/11 : « some could, simpler ») : un petit cercle (veut → essaie → résultat) pour un ou deux persos secondaires.
- **La vérité a sa chronologie** : ce qui s'est passé avant l'histoire, dans l'ordre (Melissa apprend la menace → décide → Isa en voit une partie…).

## Les autres types d'intrigue : ce que chacun demande (24/11)
Ce qui sert à tous est déjà là : le moment (cause, acteur, désir, action, monde, public), les boucles, qui sait / croit quoi, le
cercle, le choix par le perso, les épisodes et les diapos. Un type d'intrigue apporte quatre choses : **ses faits** (ce qui est
vrai et caché), **son échelle** (qui pousse, qui répond, comment ça monte, à chaque tour), **ses phrases** (comme `TRACE`,
`DEED`, `COVERJ`), **sa recette** (l'ouverture et la question du public). Le détective inversé a coûté ça : ~85 lignes (longues) dans `orch.js`, 4 histoires de test, 4 vérifications.

| Type | La question du public | Ce qui existe déjà | Ce qu'il faut ajouter | Effort |
|---|---|---|---|---|
| 🩸 **Détective inversé** (*Columbo*, *Breaking Bad*, *Joker*) | Sera-t-il pris ? | **fait** (24/11) | — | — |
| 🎭 **Identité** (*Le Retour de Martin Guerre*, *Les Infiltrés*) | Va-t-on le démasquer ? | les secrets `name`, `royal`, `villain`, `spy`, `pretend`, la figure hors champ qui cherche | la même chasse que le détective inversé, mais sur un masque au lieu d'un crime : quelqu'un reconnaît → teste → le masque glisse → tombe. Les couvertures : une histoire inventée, un témoin du passé à écarter | petit (on généralise `mine` : « une chose que Justin cache + quelqu'un qui cherche ») |
| 🃏 **Arnaque** (*L'Arnaque*, *Les Associés*) | Le pigeon va-t-il mordre ? Et qui arnaque qui ? | `pretend`, `name`, `spy`, l'ironie (le public sait), la chasse (le doute du pigeon = les pas du chasseur) | le pigeon et ce qui le fait mordre (son désir), l'échelle appât → confiance → test → presque découvert → le coup ; le retournement (l'arnaque visait Justin) comme une révélation qui relit | moyen |
| 💰 **Casse** (*Ocean's Eleven*, *Rififi*) | Vont-ils réussir ? | le vol, l'objet, le coffre, la trahison dans l'équipe (`betray`, `spy`) | un nouvel événement « le coup » (la cible, son gardien), une équipe (chacun y va pour une autre raison), un **plan** en étapes que le public voit ou pas, la complication qui force l'improvisation, et le plan dans le plan (une partie cachée au public : une révélation qui relit) | moyen à gros |
| 🏛️ **Complot / politique** (*House of Cards*, *Le Parrain*) | Qui aura le pouvoir ? | `oust`, `win`, les trahisons, les alliances par les liens | des **camps** (aujourd'hui que des personnes), une échéance publique (un vote, une succession), des alliances qui changent ; et de l'échelle : un complot demande du monde, la taverne en a 3 à 5 | gros |

L'ordre conseillé : l'identité (petit, et ça réutilise la chasse), puis l'arnaque, puis le casse. Le complot attend d'avoir plus
de monde et d'endroits.

## Le rendu et la mesure
- **Les diapos restent les phrases du moteur** (Justin, 24/11) : pas de passe IA.
- **Une vraie sortie Haiku** du prompt passif de l'épisode 1, puis les feuilles d'expressions générées (aujourd'hui : les poses de base).
- **Mesurer « engageant »** (« compris » : le lecteur à froid, plus haut) : demander la question après l'épisode 1, noter le temps de chaque tap dans les diapos.
- **Le genre des persos** : on ne le connaît pas (« seul·e », comme forge.js) ; une donnée par perso réglerait l'accord.
