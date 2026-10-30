# Essai 06 · Acte, épisode 1 (30/10)

Prompts de l'Acte à eae69d2 (techniques d'acte, Générer). Le JSON de l'acte, du plan et de l'histoire est resté sur le cell
(pas recopié ici) : à partir de maintenant, Générer › Garder pour Claude les met dans `essais/auto/`.

## L'avis de Justin
- Mieux que les essais d'avant. Prochaine fois : pas en français (le prompt de l'acte est en anglais par défaut depuis 4afacb3).
- Pas hooked, pas intéressé, sans savoir pourquoi au départ.
- Décroché dès la 1re réplique : il compte les lumières, et on ne comprend ni pourquoi ni de quoi il parle.
- Le problème : l'IA invente des choses avant qu'elles existent à l'écran (jouer avec une pièce, parler d'une caisse,
  compter les lumières au plafond). Ça viendra avec les animations et l'environnement ; pour l'instant c'est interdit.
- Ne voulait rien pour Justin. Aucune surprise.

## Corrigé
- Nouvelle technique d'acte « Ce que l'écran montre », dans les 5 épisodes ; règle aussi dans le prompt du plan et
  dans celui de l'histoire (G) : rien qu'on ne voit pas, ce qui compte est dit dans une réplique.
- Exemples des techniques refaits sans objet ni geste invisible.
- Épisode 1 : la 1re réplique doit donner envie de savoir la suite ; ce que Justin veut pour lui est montré ;
  justin_wants = quelque chose pour lui, ce soir, que la demande de A met en danger.

## 2e avis de Justin (30/10, avec le JSON : `06-acte-episode-1.json`)
- C'est sur un choix : bien. Mais pas hooked, pas envie de voir la suite.

## Pourquoi (lu dans le JSON)
- Aucune question ouverte : dans le plan, `hints` est vide partout. Tout ce qui est dit est fermé tout de suite.
- Melissa a 6 répliques d'affilée : partie sans adieu, ses affaires, l'aube, viens, je serai moi-même, sinon je reviens pas.
  Un discours. Justin ne réagit même pas à « je suis partie sans adieu ».
- Le meilleur de l'acte (la lettre : elle croit avoir écrit, il croit qu'elle est partie sans un mot) est gardé pour
  l'épisode 3, sans rien en laisser voir à l'épisode 1. Le choix est un dilemme, pas une question qu'on veut voir répondue.
- La dernière réplique repose la question à laquelle le joueur vient de répondre dans le choix : rien de neuf.

## Corrigé
- Nouvelle technique d'acte « Une question ouverte » (épisodes 1 et 2) ; nouveau champ de l'épisode 1 `mystery` :
  la question sur le passé que l'épisode ouvre et ne ferme pas (le secret y répond à l'épisode 3). Le mieux : deux persos
  à l'écran qui ne racontent pas le même passé (« T'es partie sans un mot. » / « Sans un mot ? Je t'ai écrit. »).
- Plan : au moins un rectangle qui `hints` ; personne n'explique seul ; Justin réagit à ce qui le blesse ; le tournant
  apporte du neuf, jamais un choix reposé.
- Histoire : jamais plus de 2 répliques d'affilée du même perso ; Justin répond à ce qui le blesse ; la dernière réplique
  apporte du neuf.

## 3e passe (30/10) : le désir de Justin, la 1re et la dernière réplique
- Le désir de Justin manquait à toute la chaîne : l'acte demandait « ce que Justin veut, au départ » (puis « ce soir »,
  pire) ; le plan cochait « un désir montré » avec la demande de Melissa ; l'histoire : « Je voulais juste une soirée ».
- L'histoire ne voyait jamais les techniques d'acte (seulement le plan) : la 1re et la dernière réplique n'avaient pas d'exemple.
- Corrigé : techniques d'acte « La 1re réplique », « Un rêve à lui », « La fin qui promet » (plat → ce qui marche) ;
  justin_wants = un rêve de longue date avec sa raison, que la demande de A touche (validateur : sans raison, ou « ce soir ») ;
  plan : technique de désir « Un rêve et sa raison », le désir doit être celui de Justin ; histoire : une section
  « la 1re et la dernière réplique » avec exemples, et Justin dit son rêve lui-même, à voix haute.
