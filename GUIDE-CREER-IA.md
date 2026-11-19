# Écrire › Créer: complete guide for an AI with no context

Audience: an AI (or a new developer) who has never seen this repo. After reading this you should know what the system is for, how a story goes from one sentence to a playable episode, where every piece lives in the code, what the author's rules are, and what is still unfinished.

Companion files, in the order to read them: this guide → `CLAUDE.md` (hard repo rules) → `CREER.md` (the dated log of every decision Justin made; principles 1-36 are quoted below) → `PLAN-GRAPHE.md` (the facts-graph work plan). When this guide and the code disagree, the code wins. When the code and `CREER.md` disagree, ask Justin.

Language note: the UI, the repo notes and Justin are French. Prompts sent to the AI are English (the AI answers in the language of the idea). Every French label used in the UI is glossed in §17.

---

## 0. The 60-second version

- The product is a **phone game of interactive stories** ("Unwritten", repo `sous-mon-toit`). The player *is* the main character, **`justin`**, and reads dialogue one line at a time over pictures of characters in a decor, with **choices** that matter.
- **Justin** (with a capital, no id) is also the **person who owns the project**: the author you take orders from. Do not confuse "justin" the in-story player character with Justin the human.
- **Écrire** is the authoring menu (Menu › Écrire). **⚡ Créer** is its story engine. The author picks the ingredients by tapping (who, what each one wants, what is hidden, what happens). The engine, with **no AI**, turns that into a full plan: threads, episodes, moments, choices, a climax.
- Only then does an AI (**Haiku**, `claude-haiku-4-5`, always that model) write the **dialogue lines** of one episode, following a precomputed plan. The AI never invents structure; it only writes words.
- Core theory (Justin's): **desires are the base → two opposed desires make a conflict → a strong desire and its conflicts make a plotline → the climax is a choice between two of the player's desires.** Everything else (flaws, threads, seeds, payoffs, techniques) serves that.
- Output chain: **taps → state `S` → engine → plan JSON → prompt 2 → Haiku → steps JSON → `PLAN_PLAY` plays it** (optionally → 🎥 Mise en scène turns it into staged images).

---

## 1. Ground rules you must follow (from `CLAUDE.md`)

1. **Git:** push straight to `main`; no branch, no PR (Justin, 29/10). Other sessions also push to `main`: `git fetch origin main` and `git rebase origin/main` before pushing. (The harness hook that complains about an unpushed `claude/...` branch is a known false alarm.) If your host environment forces a branch instead, say so to Justin rather than silently choosing.
2. **No validator that blocks or lists errors** on what the AI generates (Justin, 30/10). A problem in the generated text is fixed **in the prompt**: add a technique plus a *flat example → example that works*. Loaders must be lenient: unknown ids are dropped or replaced, never an error screen.
3. **Never many words at once** (09/11). A long line or narration is cut into 2-3 bubbles: `Okay.` / `I come out.` / `But the gun stays in my holster.`
4. **Façade:** the public link shows only Full demo. The lock at the bottom of the menu asks for a code (stored hash `KEY_HASH` in `index.html`, recomputed with `keyHash`). The repo is public; this is a wall for visitors, not security. **Never put an API key in the repo.**
5. **Before touching** `forge.js`, the techniques in `plan.js`, or the seed in `act.js`: read `CREER.md`. Before touching `mise.js` / `mise-data.js`: read its "Mise en scène" section.
6. **Model rule:** Haiku only (`claude-haiku-4-5`) for the author's own key. If a story comes out badly, fix `GEN.SYSTEM`, `build()` or the prompts, never switch to a bigger model.
7. After any engine change: bump the `?v=` query on the changed `<script>` tags in `index.html`, run the regression script (§14), and re-check that the example story still has words for every moment (§12).

---

## 2. How Justin works (read before proposing anything)

- Short messages in French, often dictated. He wants to **see the result**, not an explanation.
- **Show, don't tell**: icons, colours, faces, very little text. A compact view stays compact; **a tap opens the full view** with text (`big()` window in `forge.js`). On a phone there is no hover: a tap shows a brief toast at the bottom, a long press shows the detail.
- **Test with a real story built on purpose, read the result like a screenwriter, fix the rules, repeat.** Never announce "it works" without having read the output.
- When the structure is unclear, ask him the big question. When it is clear, build.
- He dislikes content Claude wrote alone (forms, examples, questions). Mark such content "first draft" and review it with him. He said he does not want technique cards written by Claude alone.
- He rejects **arbitrary rules** that fail in some cases. Prefer data (databases of options) over rules. Prefer fixing the core over patching. Say what *type* of problem it is and where it will come back.
- When reporting: a short before/after on his own story (Justin, Isa, Amare), say what is verified and what is not.

---

## 3. Where it lives in the app

Menu (`index.html`, `#infos` → `#secWriteBtn` → `#secWrite`). **Écrire** contains:

| Button | Screen / module | What it is |
|---|---|---|
| ⚡ **Créer** | `FORGE` (`forge.js`, `fils.js`) | The full story engine and its views. This guide's main subject. |
| ⚡ **Créer v2** | `CREER2` (`creer2.js`) | 4 dead-simple screens on top of the same engines, for end users. |
| **Ton histoire** | `GEN` (`gen.js`) | The older "one idea → 12-tap story" generator. |
| **Banque** | `bank.js` | Characters bank: base sheets, "Nouveau perso", sprite import. |
| **Techniques** | `techniques.js` | Justin's theory notebook (web of technique cards, grouped in 5 stages). |
| **Plan de scène** | `PLAN` (`plan.js`) | 2D canvas to plan an episode *before* its dialogue; owns the **actionable technique catalogue** and prompts 1 and 2. |
| **Acte** | `ACT` (`act.js`) | One act of 5 episodes planned by a fixed arc; older route, also hosts the Haiku call helper. |

The three API keys (Claude, ChatGPT/OpenAI, GitHub token) live **only at the bottom of the Écrire menu** (`#wKeys`, `CREER2.keys`), never inside Créer, Créer v2 or Mise en scène (those only say where the keys are). Keys are stored in the browser's `localStorage` (`smt-key` Claude, `smt-oai` OpenAI, `smt-gh-token` GitHub). A GitHub token lets uploaded assets be committed to the repo so every device shares them.

Script load order matters (`index.html`): `techniques.js` → `ep1.js` → `plan.js` → `fils.js` → `act.js` → `forge.js` → … → `importer.js` → `mise-data.js` → `mise.js` → `creer2.js`. **`fils.js` must load after `plan.js` and before `forge.js`** (it appends its forms into `PLAN.GOALS`).

---

## 4. The end-to-end pipeline

```
 taps in Créer  ──►  S (state, localStorage "smt-forge2")
                       │
        ENGINE (forge.js + fils.js, no AI, deterministic given S.seed)
   truth → desires → conflicts → plotlines → climax → braid of moments (line)
   → episodes (cuts, choices, consequences) → threads → registre → plan per episode
                       │   planOf(n)
                       ▼
              plan JSON  (boxes "ep" / "later", rectangles = beats, links, story, facts, chars)
                       │   PLAN.add(plan) ; PLAN.prompt2()
                       ▼
        prompt 2  ──►  Haiku (claude-haiku-4-5, user's key)  ──►  steps JSON (the dialogue)
                       │   keepLines(n, story)  (saved in S.gen, fed to later episodes)
                       ▼
              PLAN_PLAY(story, title)  → the player reads it, taps choices
                       │   (optional)
                       ▼
   🎥 MISE: script → "pièce" (staging JSON, AI or pasted) → needed image sheets → generated (OpenAI) / dropped → ▶
```

Three ways to get from engine to words:

- **🎬** = show the episode's *plan* in Plan de scène, **no AI** (`planOf`).
- **▶** = plan + Haiku writes the lines (prompt 2) + plays at once (`FORGE.play`).
- **📋** = copy the prompt (act prompt + seed, "route par l'Acte") to paste into any chat. (This route keeps a fixed 5-step arc and produces weaker acts than Créer → plan → lines.)

When no key is present, every AI step has a **copy the prompt / paste the answer** fallback. Pasted answers go through `LOOSE_JSON` (`plan.js`), which tolerates Markdown escapes (`\[`), `&#x20;` entities, curly quotes, and text around the JSON.

---

## 5. The theory (Justin's principles, condensed)

These are *his*, not suggestions. Numbers refer to `CREER.md`.

**Desire is the base (1-8)**
1. Every character has **desires**, deduced from: the basics (stay alive, be respected), a bond (protect a loved one; romance for a couple or a crush), a chosen goal 🎯, their **flaw**, **events**, **infos**.
2. **Conflict = two desires that cannot both win.**
3. **Plotline = a strong desire and its conflicts.** Justin's (the player's) are the main lines; others run "meanwhile"; they braid.
4. **A flaw is a colour, not the story.** It becomes a line only if something truly threatens it (e.g. "stay alive" only if a life is at stake).
5. **Global desire ≠ scene desire.** The global one holds the act; the scene desire is what they want right now.
6. **Raise stakes always strengthens a desire that already exists**, and right before each choice you strengthen the *two* desires the choice opposes.
7. **A scene/episode turns around a choice** (or an uncertain outcome: will he die?). The audience must grasp the weight of both sides and wonder which will happen.
8. **The climax = a choice between two of the player's desires** ("Mary or freedom?"), kept in mind in every episode of the act.

**Structure and links (9-18)**
9. **Dramatic questions, plural**, opened by what happens (who is he? where was he?), not necessarily spoken by a character.
10. Links are not always causal: **so (donc) · but (mais) · suddenly (soudain) · meanwhile (pendant ce temps).** Never "and then".
11. **A technique = a concrete application** with: what it requires (prerequisites) / what is seen / what it produces. Some have several **moments** along the story (e.g. "Coincé devant tous": question planted early → everyone tries and fails → someone asks him in front of everyone → his answer).
12. **Nesting and value per line:** a moment carries bits of other techniques (a "Tell a story" that slips the seed of a job and shows a trait).
13. **Seed & payoff:** the further apart and the more numerous the seeds, the stronger the surprise.
14. **Events are entities** (theft, betrayal, murder…) with slots (culprit, victim, who searches, hidden culprit).
15. **Infos are chosen from a list**: never typed by hand, never invented by the AI.
16. **Plot ≠ scene.** A plot technique decides *what happens* (Créer, Acte); a scene technique decides *how a moment plays* (Plan de scène). Some are both (`TECH_LVL` in `techniques.js`, first draft).
17. **One actionable catalogue:** `PLAN.GOALS` in `plan.js`. Écrire › Techniques stays the theoretical tree.
18. **Branch then rejoin:** a choice changes the start of the next episode, then the story converges; choices accumulate toward the climax (no full tree).

**Threads (19-30)**: see §7.3. **Facts graph (31-34)**: §7.6. **Irreversible change (35)** and **personality drives action (36)**: §7.7-7.8.

The five-stage backbone of the theory (`TECH_STAGES`): 01 Investment + Anticipation ("I want to see what happens") → 02 Escalation + Complication ("harder than I expected") → 03 Revelation + Recontextualization ("I misunderstood everything") → 04 Crisis + Maximum Suspense ("how can this work out?") → 05 Payoff + Emotional Resolution ("worth watching").

---

## 6. The state `S` (what the author's taps produce)

Stored as JSON in `localStorage["smt-forge2"]`, loaded and defaulted by `BASE()` in `forge.js`. Fields you will meet:

| Field | Meaning |
|---|---|
| `decor` | `taverne` / `maison` / `salon` (`DECORS`). Only the place; anyone can be there. |
| `cast` | Character ids, max ~4 besides justin. The **pool** (`POOL()`) is every character in `CAST` whose sprite sheet has the 6 base poses (`listen, surprised, thinking, explaining, angry, holding`). `NOT_CAST` excludes `justin, kai, leo, twin, lily2, redtest`. |
| `pil` | `{charId: [pillar, pillarMix?]}`: the **8 pillars** = why we follow a character: 👑 chef, 💋 charmeur, 🔪 dangereux, 🧠 génie, 🤡 clown, 🌑 mystérieux, 🥊 outsider, 🛡️ protecteur. First tap = the pillar, second = the mix. Each pillar carries a reference character, a "surprise on entry" technique, how others make us wait for him (`exp`), and 6 expressions in his own way. |
| `flaw` | `{charId: flawId}`: 🐔 lâche, 🍷 vice, 🌋 colère, 🎭 menteur, 🦚 orgueil. |
| `want` | `{charId: {v, t}}`: what they want (🎯): `love` séduire, `protect` protéger, `find` retrouver, `oust` évincer (each needs a target `t`), `win` être reconnu, `free` partir, `hide` cacher. |
| `rel` | `{"a|b": relId}` (key = two ids sorted): `crush, couple, ex, friend, family, rival, mentor`. |
| `infos` | `[{id, x, y?}]` chosen from `INFOS` (never typed): **secret** (`sibling, parent, betray, crush, cause, leaving, sick`), **mask** (`villain, spy, pretend, name, royal`), **past** (`exes, saved, grew, fight, promise`), **object** (`letter, ring, key, photo, map`). `s:1/2` = one or two people involved. Kinds are placed by default: secrets and masks come out around episode 3, a past is told early, an object is seen early and opened later. |
| `inc` / `ev` | Events (`EVK`): ⚡ arrive, 👻 gone, 🗡️ murder, 💰 theft, 🐍 betray, ☠️ threat, 🔥 revenge. Slots `x` (does it), `v` (victim), `s` (suspect); `h:1` = culprit hidden; `a:2` = belongs to act 2 (①②). |
| `hard` | "Why it's hard": 😇 everyone adores him (obstacle), 🌲 dangerous place, ⏳ clock, 🤐 the secret blocks (needs a secret). |
| `acts` | 1 or 2. |
| `seed` | Integer that makes 🎲 draws **stable** (`vary(key, n)` hashes `seed|key`). |
| `tq` | Per-moment technique choices; also read for mobile overrides (`mot<k>`, no UI writes it yet). |
| `picked` | Which option of each choice is followed ("branch then rejoin"); defaults to the first. |
| `cut` | Manual episode cuts (✂) with a signature of the braid. |
| `figs`, `things`, `links` | The facts graph (§7.6). |
| `gen` | Dialogue Haiku already wrote per episode (kept on this device; forgotten if the story's signature changes). |
| `sheets`, `marks` | Mise en scène bookkeeping (pinned sheets, table placement). |

🎲 (`rollAll`/`dice`) randomises the whole state coherently from the seed; a tap on a dice-drawn thing = the next possibility.

---

## 7. The engine, stage by stage (`forge.js`, data in `fils.js`)

All of it is deterministic, language-aware (every phrase has a French *and* an English version; screens use FR, prompts use EN), and recomputed from `S` on demand. Module variables `CUR_ACT`, `NOW`, `SHOWN` are set during a computation and **must always be restored with `try/finally`**, or `evs()` / `tName()` lie on the next render.

### 7.1 Desires → conflicts → plotlines → climax
- `desires()` builds `DESIRE {id, who, k, t, s, src}`. `s`: 1 basic, 2 a bond, 3 chosen/flaw/event/info. `src` ∈ de base / d'un lien / choisi / de sa faille / d'un événement / d'une info.
- `conflictsOf()` pairs desires that cannot both win. The dead (`d.dead`, `d.late`) and the departed make no conflict and no line.
- `plotlinesOf()` groups a strong desire with its conflicts. Justin's lines are primary.
- `climaxOf()` picks the choice between two of Justin's desires. `storyAt(act)` computes any act; `story()` the whole; `X` = climax of act 1, `X2` = of act 2. `roles()` translates this for old screens and the act seed (A ≠ B).
- Desires that are the same person from two angles are one side of a choice, never "Ruby or Ruby?".

### 7.2 The truth first (`truth()`)
Before any moment exists, the engine fixes **what really happened**: each event gets a **mobile** (motive) from the doer's own desire (`FILS.MOTIVE`: stole it to give to the one he loves, to pay for leaving, to frame a rival…), a **suspect** (someone else looks guilty: the false lead, always broken before the answer), and what each **object** holds (the victim's letter says whom to distrust). The motive links the crime to a promise dropped earlier and to the way it comes out, which is why "everything is interlinked" without chance.

### 7.3 Threads (`fils.js`: `MV`, `KIND`, `FORMS`)
A **thread (fil)** = what the audience carries until it is paid. Five kinds (`FILS.KIND`): ⚔️ line of desire, ❓ question, ⏳ waiting (a promise: arrival, deadline, threat), 🌱 seed → payoff, ⚖️ the choices.
Each beat touches threads; each touch is a **move** (`FILS.MV`, ~30 of them): want, oppose, raise, torn, fail, choice, conseq, cost/toll, cross, close, glimpse, alive, open, matter, theory, clue, seed, false lead, slips away, doubt remains, narrows, callback, half-answer, answer, all returns. A move changes what the audience believes; the **callback** is the only one that changes nothing and exists solely so a payoff does not land cold. A **node** (◆) = a moment that advances several threads at once; the climax is where the most threads pay together.
`FILS.FORMS` = for each move, concrete ways to play it: name, how, flat example → one that works, shapes (`fr`/`en`). These are **installed into the Plan de scène catalogue** (one catalogue) and appear in its palette and in the prompts' technique list. Justin has not validated the names/forms/motives/raise levels/act questions: they are Claude's first draft, to review with him.

### 7.4 The braid and the episodes
- `line()` builds the act's list of moments with `buildAct(a)` per act. Each plotline climbs a few notches (`FILS.RAISE`, 3 levels per desire: show the desire → the conflict → each side weighs more → he tries the easy way and it fails). The first event opens the act (3 beats if someone arrives); others are "suddenly". Before a murder we attach to the victim (🫶). Each hidden crime has its own ladder (theories → false lead → "only two left" → a seeded detail → a clue → what the culprit prepares). The crisis then pays everything (objects, crimes with motives, the one who is found, hidden things: max 2 answers in the crisis, others come out earlier, one per episode), then deadline, climax, then the price, other lines closing, the sequel.
- Each moment keeps: `cause`, `lk` (link: donc/mais/soudain/pendant), `who`, `line`, `act`, `mv` (the `[thread, move]` pairs it advances).
- `episodes()`: automatic cuts (movable ✂). **An episode holds what fits in ≈ 24 lines.** Surplus slides to the next episode if room, else the least useful drops first (a secondary conflict already shown among others, then other secondary conflicts); events, Justin's lines and question steps always stay. Each episode ends on a **choice between two of Justin's desires** (`chooseFor`: only desires the story has already shown, whose event has happened and whose line is not closed), preceded by 🅰️ 🅱️ (the stakes, one notch higher); ↪️ the consequence opens the next episode (that of the climax opens act 2); a thread nobody touched in the previous episode gets a callback. A recap shows ❤️ ❓ ⚔️ ➡️.
- **Subplots must touch Justin's line or not exist** (26): they cross by nature (born of an event, about someone Justin cares about) or a dedicated moment does it (`FORMS.cross`); each closes once per person at the end (`FORMS.close`).
- **World state** (23): who is dead, gone, arrived. The dead never act; a stake never precedes its cause; a desire born from an event plays only after it.

### 7.5 Two acts (`S.acts`)
"The need stays, the target changes." Act 2 opens on what the climax cost and on its own event (set to ② by hand; otherwise the one act 1 unmasked retaliates). Its climax takes another pair of desires. **The long loop:** act 1 answers "who"; "why" (a motive kept for ②) or "with whom" (a hidden info kept for ②) answers in act 2; its clues are seeded from act 1. A secret that came out in act 1 is not kept in act 2.
- **The price of the climax** (`fateFor`, `FILS.FATE`): the side Justin drops gets a concrete fate. A life at stake needs someone to take it (whoever forces the choice, else a free murderer; never someone who loves that person): "Melissa dies; James was not bluffing". Otherwise they leave, don't forgive, are dishonoured, the secret bursts, the culprit gets away. The choice is *forced* by the threatener.
- **State after act 1** (`actState()`): 🫀 life, 🤝 relations, 🧠 what is known, 👑 status (unmasked), 🎯 desires born/ended, 🔀 arcs. **Act 2 is computed on that state**; it follows the choice tapped at the climax (default the first), the other path is visible by tapping the other option. The plot ends with "WHAT CHANGED" and "With the other choice".
- **The pivot (bascule)** (`FILS.BASCULE`): whoever loses a loved one blames whoever they hold responsible (the culprit, or Justin if he chose the other side); their desire flips and **their voice changes** from then on ("SINCE ISA'S DEATH: …; before, it was: …"). Order matters: what came out first changes links (a betrayed person doesn't mourn the traitor).
- **Causal chain:** with no planned act-2 event, the pivot opens it; a revenge/threat takes its cause from what happened. Without a cause the engine does not invent one (a hole the author can see).

### 7.6 The facts graph (`graph()`, `weave()`, `chains()`, `FILS.LINK`) — principles 31-34, `PLAN-GRAPHE.md`
What makes a story *specific*: a few concrete things everything else is tied to. Justin: "not a formula, a graph: x / y / z can be another secret, someone, an event."
- **Stored data:** `S.figs` (off-cast figures: the ferryman, the loan shark, the captain, the landlord: no image, never on screen, only heard about), `S.things` (their things: `has`, `need` (+ deadline), `debt`), `S.links = [{a, k, b}]`. Refs: `p:` person, `f:` figure, `t:` thing, `i:` info, `e:` event, `m:` past moment, `l:` place, `d:` desire. `by:1` = added by the author (orange border).
- **37 link types in 4 families** (`FILS.LINK`, `LGROUPS`): ⏳ cause and time, 🙈 knowledge and secrets, 🤝 between people, 📦 things and places. Each says what it connects (`a`,`b`: P person, T thing, I info, E event, D desire, L place) and its direction `dir` (1 one-way, 2 both by nature, 0 depends: ↔ adjustable per link). **All links are allowed, none is mandatory**; several of the same kind are fine; don't fill everything in advance since not everything is shown.
- **Lists, never typed:** `FOLK` (off-stage people: the brother, the croupier…), `THINGS`, `MOMENTS` (a card game gone wrong, the harbour fire…), `PLACES`.
- **In 🕸️:** "＋ relier" (what → which link → to what), "🎲 un lien de plus" (`FILS.GROW`: a chain extends from what is there: the debt → born of a card game → at the harbour den → with Amare), a tap on a link = ↻ another end · ↔ · ✕. Removing an info or event removes its links.
- **Links play in the story (34):** added links group into **chains** (`chains()` in `buildAct`). What the audience knows of a chain is **said in passing** in one sentence; a chain hanging on a still-hidden secret is only said **when that secret comes out**. A hidden link (🙈, `sh:'h'`, `kn` = who already knows, `at` = the act it comes out) becomes a 🌱 thread: an early **clue** (`FILS.CLUE` per type), then **it comes out** (its own "suddenly" moment, last episode before the act's crisis), then **everyone reacts** from what ties them to it. **A known link changes desires** (`FILS.ENDS`): "same blood" ends the romance between two people once known. 🎲 links with meaning (`moves()`): same blood between two people one of whom wants or can't stand the other (never with whom Justin loves), a witness who kept silent, a past with the victim (a false lead), a debt and its origin, an old betrayal, a saved life; only then a chain extending from a thing, moment or place.
- **Voice:** `FILS.VOICE` (one line per pillar) + `FILS.FLAWV` (per flaw); "sometimes" the second pillar. `plan.chars[].voice` and `plan.player.voice` carry it; Justin has his.
- **Not done yet (step 2+):** the engine still reads `graph()` fields (`fig`, `need`, `vil`, `keeps`…) for only four cases (the promise, "the one being sought", a theft with no on-stage victim, the threat); the other secrets, objects and act-2 stake climbs are still templates; links added by hand *inform the AI* but a few of them create moments; the audience is not yet a node in the graph (the `registre()` is separate); no fact born *inside* an episode; no choice tree; no beliefs that flip.

### 7.7 Irreversible change (35)
Justin's grid for each event: what changes in the world? who changes inside? which relationship? which new constraint? does it provoke the next? Implemented generically (nothing story-specific): the price of the climax, the state after act 1, the pivot, the causal chain (§7.5). Measured by `essais/creer/mesure.js` over 40 🎲 two-act draws: dimensions that change 0 → 2.9; climax with a concrete price 0 → 100 %; act 2 opened by an event with a cause 0 → 73 %; stories where someone pivots 0 → 60 %. Template lines did not move (≈ 16 per story, 17 %).

### 7.8 Who they are decides what they do (36)
**7 traits scored 0-3** (`FILS.TRAITS`): 🔥 dares · 🗡️ acts on it (violence) · 🧊 never forgives (grudge) · 🤝 holds to bonds (loyalty) · 🐍 works in secret (cunning) · 😰 backs away (fear) · 🦚 face first (pride). Base 1; drawn from pillars (second counts half, `PTRAITS`) and flaw (`FTRAITS`) by `traitsOf(id, act)`. They *decide*:
- a threat is carried out **only by someone who acts**; otherwise he was bluffing;
- the one Justin drops leaves (fear, or pride without grudge), never forgives (grudge), or stays hurt (loyalty);
- the one who loses someone takes revenge, mourns or leaves (strongest of grudge+action, loyalty, fear); a violent revenge threatens a life, a cunning one "makes them pay";
- a motive, between two equally strong desires, takes the one that resembles them; 🎲 links are weighted by traits (a cunning one betrays, a gambler owes).
A pivot **changes traits** (`BASCULE_T`, `GRUDGE_T`, mourning), so in act 2 the new ones decide. Someone mourning or gone accuses no one and does not open act 2. The plan gives the AI `acts` (what each one DOES when it matters). The trait tables are Claude's first draft: review with Justin. Justin himself has no arc yet (his traits never change).

---

## 8. Technique catalogue (`plan.js`, `PLAN.GOALS`)

A **goal** is what a rectangle must achieve; each goal owns **techniques** (how). Goals include: `char` (Create character engagingness), `rel` (relationship engagingness), `desire` (Show desire / goal), `stakes` (Raise stakes), `info` (Reveal info), `curiosity`, plus the thread forms injected by `fils.js`.
A technique has: `n` (exact name), `d` (how, in French), `ex` (examples: often *flat → works*), `carrier:1` (it can carry a seed or other technique inside its lines), `hook:1` (can open a beat), `need`/`see`/`give` (prerequisites / what is seen / what it produces), `parts` (moments with `at`: `early | mid | before | now`, `carry`), and sub-techniques `s`. Examples: *Show contrast, Share personal internal conflict, Tell a story, Shared memory, Direct confession, Un rêve et sa raison, Mention consequences, Show character positioning, Menace : si tu X, je Y, Aveu vulnérable, Coincé devant tous, il s'en sort, Entrée qui fait taire, La surprise de son pilier* (8 variants, one per pillar).
Only **"Coincé devant tous"** has a complete card. `DETAIL` (instructions, example) is empty for the rest; Justin wants to write each card **with** Claude, one at a time (next proposed: *Show character positioning*, *Tell a story*).
A tap on a moment in Créer = next possible way (`optsOf`, `withTech`); ⓘ opens its card.

---

## 9. Plan JSON and the two prompts

### 9.1 `planOf(n)` → the plan of episode n (no AI)
```
{ title, scene, turn,            // the end-of-episode turn, one sentence
  needs: [],
  story: { episode, of, act, known[], hidden[], open[{question,state,here}], dead[], lines? },
  facts?: [...],                 // concrete facts to name verbatim (the purse, the crossing, before dawn)
  chars: [{ id, name, sprite, poses[], traits[], voice?, acts? }],   // dead characters excluded
  player: { id:"justin", name, traits, voice?, acts },
  infos: [{ id, text, parent? }],
  boxes: [ {id:"ep", title, col:0, beats:[…]}, {id:"later", title:"Plus tard", col:1, beats:[…]} ],
  links: [{ from, to, label }] }
```
A **beat/rectangle**: `{ id, goals[], tech, lines (1-5), what (one sentence, NO dialogue), reveals[], hints[], carries[], present[], kind?: "choice", opts[] }`. `present` = who is on screen and what each wants *right now* (an event-born desire only after the event). A choice (`kind:"choice"`) has 2-3 *attitudes* (or, for the main choice, outcomes) and 2-3 lines. Box `later` is **not written**: it becomes `next`, 3-4 bullets "If he …, …".
`story.known/hidden/open/dead` is the `registre()` at the episode's start; `story.lines` = the actual lines of previous episodes (from `S.gen`, or `EX_EP1`) so a detail seeded in episode 2 (an object, a word, an hour) is **the same one** episode 4 brings back.

### 9.2 Prompt 1 (`PLAN.prompt1`, "plan the episode")
Used by Plan de scène and the Acte route: from an idea (or an act text) the AI fills, in order: `scene`, `characters` (existing ones, or `fresh` new ones with look and 6 poses), `turn`, `needs`, `infos` (5-9, chains with `parent`), `boxes` (6-10 rectangles in `ep`, 24 lines max, 2-3 choices each preceded by a `stakes` rectangle, the main choice last), `links`. Key rules: first rectangle is engagingness on the present moment, no plot info before it; every character gets a char/rel rectangle before the first stakes; the main character's dream is stated in a `desire` rectangle before the first stakes; no rectangle where one character explains alone; no dialogue in the plan; **only what the screen can show** (decor, characters, poses, lines: no counting lights or flipping a coin); a choice is about people, never a procedure; the turn names a precise next moment, never "there will be consequences".
In Créer, prompt 1 is largely bypassed: the engine writes the plan itself.

### 9.3 Prompt 2 (`PLAN.prompt2()`, "write the dialogue")
Input: the plan. Output: the `steps` JSON. Its rules, in short:
- Follow the rectangles of box `ep` **in order, all of them**; never skip or merge. Each becomes exactly its `lines` lines, written with its technique, for its goals. `what` is never copied as a line.
- A hint stays unexplained: no line answers it or contradicts it. A choice becomes a `choice` step: one option per attitude in `opts`, each with `then` = 1-3 reaction lines, the two branches really differ; lines after a choice are seen by both branches.
- An info comes out exactly in the rectangle that reveals it, never earlier. An info revealed in `later` is never said here (only its question is raised).
- A link is a promise: what `from` plants must come back, recognisably, in `to`. `present` says who speaks and what each wants. `carries` are moments of other techniques hidden *inside* a rectangle's own lines; nobody points at them.
- Characters talk in their traits: `voice` shows in every line; `acts` says what they DO when it counts.
- `facts` are said **by their name**; an off-cast figure never speaks and never appears.
- `story.known` is built on, never re-explained ("As you know…"); `hidden` is never said, proved or ruled out, and **nobody defends themselves before being accused**; `open` is handled per its `here` (answered here → the answer lands in the revealing rectangle and someone reacts; moves without answer → sharper, never closed; does not move → nobody mentions it); `dead` never act; `lines` → reuse the same object/word/name/hour.
- **Human talk:** they are doing something while they talk (a round, a toast), answer with a word, a question, half a sentence, tease, dodge, interrupt; a silence `{"hush": true}` can say more than a line. Cut long speech into 2-3 bubbles.
- A **duo** step `{duo, pose, text}` (a kiss, a fight) takes both characters out, shows the duo image, speaks `text` as narration; nobody talks during a duo.
Technique list given to the AI = `techList()` (every goal's techniques with their examples).
**Every defect in generated dialogue is fixed here**, by adding a technique or a *flat → works* example, never by a validator (CLAUDE.md).

### 9.4 Output: the steps JSON (what is played)
```
{ "title": "2-4 words", "scene": "taverne|maison|salon",
  "steps": [ {"who":"<id>","pose":"<pose>","to":"<id>","text":"one spoken line"},
             {"hush": true},
             {"choice":[ {"t":"button ≤27 chars","say":"what justin says","tone":"word","then":[ {who,pose,to,text}, … ]}, {…} ]},
             {"duo":…} ],
  "next": ["bullet", …] }
```
Poses: `listen, surprised, thinking, explaining, angry, holding` (restrained, arms crossed), plus extras (`EXTRAS`). `to` = who is spoken to (people look at them). justin's lines outside a choice are his inner voice (first person); inside a choice he speaks aloud as the option's `say`, never inside `then`. A silence costs no tap. `gen.js build()` turns steps into the engine's play script (camera one/two/three, gaze, choice screens); `PLAN_PLAY` plays them in a plan's decor. The older `GEN.SYSTEM` prompt (Ton histoire) asks for exactly 12 taps: 4 opening lines, choice at tap 5, a shared line, a second choice, a hook, then STOP; beginnings drop the player into the middle of the action with the stakes clear.
`ACT.haiku(key, prompt, maxTokens, check, used)` is the shared Anthropic call (`api.anthropic.com/v1/messages`, model `claude-haiku-4-5`); `GEN_USED(used)` records token use.

---

## 10. Views in Créer (what the author sees)

Compact first, full on tap. **Quoi** (place, characters+pillars+flaw, 🎯 wants, 🔗 relations, 🗂️ infos, 💥 events) → **Comment** (the incitement, the conflicts the engine finds, why it's hard, techniques per event) → **Ce qui arrive** (episodes of the braid).
Views of the result: **🖥️ Grand écran** (`boardHtml`: top = what Justin wants, what it could cost, the act's question; grid threads × episodes with the moment numbers (same number = same moment = node ◆), solid line when a thread moves, dotted when asleep, ✓ or "open"; bottom strip of the episode's moments; right pane of detail with ←/→ for episodes, Esc closes) · **🎞️ storyboard** of the act (cards plus links drawn from threads: question → answer, seed → payoff, stake → choice, choice → consequence; a tap isolates a link) · **🧵 tresse** (one line per thread) · episode list · **📄 copier le plot** (`plotText()`, includes threads; it does **not** include dialogue rules or technique cards, and shows both acts at once, so pasted into a chat the AI may play act 2 early. For real generation use `epPrompt(n)`) · **🧍 pose-sheet prompts** · **1 acte / 2 actes**. The act question (`FILS.ASK`, from the climax's two desires, "Do we tell the truth when it destroys the one we love?") is shown to the author and given to the AI, **never said on screen**.
**📖 L'exemple** ("Le voleur de la taverne"): one concrete story end to end (`PRESET`: `txt[id]` real words per moment, `opt[id]` real choice outcomes) with episode 1 written line by line (`EX_EP1`, playable without AI). It is **the reference of the quality Haiku must reach**. Moment ids depend on engine state: after changing the planner, list ids with `FORGE.episodes()` and verify each moment still has its words.

---

## 11. Making it visible

### 11.1 Characters and image sheets
- Each character is a **sprite** with pose images `chars/<sprite>/<pose>.webp` and a `sprite.json` (where the counter cuts them, size, face position). The base sheet = 6 poses (a character without it is not in the cast pool).
- **🧍** gives prompts to generate pose sheets; **🎬 "Feuilles que l'histoire demande"** (`needs()`, `needSheet()`, `EXTRAS`) lists what the script plays that the 6 base poses can't show, always derived from the story (murder → fight/threat, theft, betrayal, couple/crush/ex/"wants love" → kiss, object-info → character + object). 2×2 sheets: a **duo** (images 1 and 2 → sprite `duo_<type>_<a>_<b>`, poses like `love_kiss`) or character + object (`OBJ`, adds poses like `ring_hold` to the character).
- **Import** (`importer.js`): `IMPORT.cells` / `IMPORT.extra` cut a dropped sheet (green keyed out, figures = biggest blobs, each pose measured against Justin's guide), keep it on the device, and with the GitHub token commit it (`chars/<id>/…`, `chars/imports.json`) so every device gets it a minute later.
- **✨ Générer** (`oaiSheet`, `window.OAI`): reference image + prompt → OpenAI `POST /v1/images/edits` (default model `chatgpt-image-latest`, quality low/medium/high, size 1024×1536 for a 🧍, 1024² for a 🎬). The estimated prices (`OAI_PRICE` 0.01/0.025/0.17) are **estimates, not verified rates**. Never tested against the real API.

### 11.2 🎥 Mise en scène (`mise.js`, `mise-data.js`, `MISE.open()`)
Goal (Justin, 16/11): **understand the story by watching it**; the story must not be limited by animation but we clearly state what can't happen; characters keep the **same place and pose when the camera angle changes**; **realistic, nuanced, never exaggerated expressions**; only the **tavern** for now.
1. **Script → "pièce"**: `MISE_DATA.STAGE(script, banque)` is the staging prompt. The AI **never places pixels**: it says who speaks to whom, who looks at whom, who moves to which named **place**, with which face and gesture. The prompt lists the only places that exist, what the screen can and cannot do (no touching, carrying objects, active crowds, sitting without a free seat…), with two flat → works examples.
2. **Space lives in the code (`SET`)**: the table seen from the front (4 seats `s1`-`s4`, `d1` standing at the end, `fond` a client in shadow), the aside (`a1`,`a2` face to face, `aL`,`aR`), the room far away. One place per person. `step()` changes state (place, sitting/standing, gaze, face, gesture) and **deduces the framing** (two-shot, close-ups in shot/reverse shot, reaction shot on a `look`, group shot after a move). The table is left of the aside. The trick that makes it possible with the sheets we have: characters sit **behind** the table, facing us; the table is redrawn on top (`edge`), so a standing base pose cut by the table is someone seated. Legs and feet are never seen. Chairs and mugs are placed by the engine.
3. **Nothing blocks** (`norm()`): unknown name, taken place, nonexistent face → ignored or replaced; every image has a fallback.
4. **What's missing** (`needs()`): the engine replays the room and notes **every image the episode shows** (who, framing `cu`/`mid`, face, gesture, or a two-person `duo`). What is already kept is never re-requested. The rest is packed into **custom sheets** (2 rows × 3 cells; a row = one character; a sheet may hold two characters; max 4 duo sheets); busiest sheets first. 20 faces (`FACES`, in families); each cell states the exact moment (the line said or heard, to whom). Best reference image (`refsFor`) = that character already in that framing, else base pose + a framing guide from another character. A sheet whose prompt was copied is **pinned** (`S.sheets`).
5. **Storage:** device IndexedDB `smt-mise`; with the GitHub token also `mise/up/` + `mise/up/index.json`. Keys: `sp:<sprite>:<cu|mid>:<face>:<gesture|_>`, `duo:<a>|<b>:<id>`, `pl:<plan>`, `in:<insert>`. 📐 Placer adjusts a dropped decor (`S.marks`). In play: nearest kept pose (same face, else same family), else base pose.
6. **📖 `MISE_DATA.EX`**: episode 1 hand-staged (72 images in 14 sheets the first time; later episodes reuse).
Not done: no real AI output read for the staging prompt; extras (client, man) are played by a bank character; no real sheet generated yet (sizes unverified); `duo_…` sheets from Créer aren't reused here; other table angles need seated characters seen from behind/side; the room doesn't yet come from Créer's ▶ (you paste a script).

---

## 12. Créer v2 (`creer2.js`): the simple path for end users

Four near-textless screens (state in `localStorage["smt-c2"]`):
1. **Ton histoire**: one sentence → ⚡ Haiku or 📋 copy prompt + paste answer = the baseline (`FORGE.v2.basePrompt` / `load`). 🎲 random. ⚙️ Avancé = the old Créer.
2. **L'histoire est montée** (no AI, `overview()`): ⚡ Haiku, or 📋 + paste, writes **episode 1** (`epPrompt(0)` / `epKeep` = prompt 2).
3. **Les images**: the episode becomes a script (`scriptOf`); ✨ **Tout générer et jouer** = staging (Haiku or paste), then every missing image via OpenAI (`MISE.auto.generateAll`), then ▶. 🎥 Avancé = manual Mise en scène.
4. **Prêt**: ▶ (`MISE.auto.play`).
`basePrompt(premise)` gives Haiku the closed catalogue (`catalog()`) and asks for one JSON `{decor, cast, pil, flaw, want, rel, infos, ev, hard}` ("make the wants collide: two people who want the same person, or one who wants to leave and one who wants to keep them"). `load()` reads leniently: ids not in the lists are dropped or replaced, cast capped to 4. Only episode 1 is supported; later episodes still use classic Créer. **No real Haiku output for `basePrompt` has ever been read.** Pitfall: bare `ACT` in `index.html` is the pose table; the Acte module is `window.ACT` (this broke ▶ once).

---

## 13. Persistence and keys, in one table

| Where | What |
|---|---|
| `localStorage smt-forge2` | `S`, the Créer state |
| `smt-c2` | Créer v2 progress |
| `smt-key` / `smt-oai` / `smt-oai-q` / `smt-oai-m` / `smt-gh-token` | Claude key / OpenAI key / image quality / image model / GitHub token |
| `smt-act-seed`, `smt-act-idea`, `smt-act-mode`, `smt-acts` | Acte route data |
| `S.gen` | Haiku-written lines per episode (this device only; forgotten if the story's signature, `genSig`, changes) |
| IndexedDB `smt-mise` | dropped sheets/decors/inserts |
| repo `chars/…`, `mise/up/…` | shared assets (written with the GitHub token) |
Private windows can throw on storage: all reads/writes are wrapped in try/catch (`ls()`).

---

## 14. Testing

- `essais/creer/histoires.js`: 10-12 stories built on purpose (whodunit, disappearance, threat, minimal, loaded; 4 in two acts; `J1_isa_amare` and variants `J1b`-`J1e`; `J2_liens`; `D1_chevalier` = *The Dark Knight* shape with our cast).
- `essais/creer/regress.js` (Playwright, local server): `python3 -m http.server 8765` in the repo, then `node essais/creer/regress.js 40`. For each story and N 🎲 draws in 1 and 2 acts it checks: no dead character acts or is "present"; no choice has the same side twice; every question and every seeded detail is paid; nothing is `undefined`; `planOf` / `seed` / `plotText` don't throw; every link points to something that exists. It **does not read the story**.
- `essais/creer/mesure.js`: the measurement grid of §7.7. `essais/creer/lectures-1118.md`: five stories printed in full (`FORGE.plotText()`).
- **After every engine change, read `FORGE.plotText()` of 2-3 stories as a screenwriter** (include `J1_isa_amare`). To open Créer in a test: `localStorage['smt-open']='323'`, remove `#warn` (a blocking overlay from another session that eats Playwright clicks), click `#forgeBtn`; load a state through `localStorage['smt-forge2']`.
- `essais/plan`, `essais/ep1`, `essais/auto`: earlier hand-run generations (plans, stories) used as references.
- **Known blind spot: no real Haiku output has been read with the current prompts** (no key in the dev environment). The level is verified on the *plan* (what the AI receives), not on the lines. First thing to do when a key exists: ▶ on episode 2 of `J2_liens` (where "same blood" comes out) and on 3 🎲 draws, compare with `EX_EP1`, correct prompt 2.

---

## 15. Rules that keep generated stories good (a checklist)

When designing or reviewing anything that reaches the AI:
1. The AI writes **words**, the engine decides **structure**. Never ask the AI to invent structure, infos or facts; give them from lists/the graph.
2. Say **what happens**, never what is said, in a plan. Dialogue comes only in prompt 2.
3. Only what the **screen can show**: decor, characters, poses, lines. Anything else is said in a line, plainly, the first time.
4. Every moment brings something new (a fact, a feeling, a stake).
5. Facts come out because someone asks, accuses, dodges or disagrees; nobody explains alone.
6. The audience must know the truth before an option that is a lie; the main character knows nothing the audience doesn't.
7. Choices are about **people** (whom he sides with, what he admits, whom he hurts), never procedure; each option's meaning is clear *before* tapping; the main choice's options state their outcomes.
8. **Seeds** are concrete and reused verbatim (the same object, word, name, hour).
9. **Hidden** things are never said or defended before an accusation.
10. Cut long lines into 2-3 bubbles. Lines are human: someone is doing something, answers with a word or a question, dodges, interrupts; silence is allowed.
11. A dead or departed character never acts or speaks (others can talk about them). An off-cast figure is never on screen.
12. Fix defects in the **prompt** with a technique and a *flat → works* pair. No validator.
Justin's three recurring complaints about generated episodes: dialogue not natural nor specific to each character; an event happens and nobody really reacts (no local cause and effect, no individual agenda); the secret is vague and everything generic. The facts graph, voices, traits and "Chacun réagit" moments answer these.

---

## 16. What is done, what is not (honest status as of 19/11)

**Done and tested at plan level:** desires/conflicts/plotlines/climax; threads (5 kinds, ~30 moves); world state and two acts; episode budget; choices with consequences; seeds and payoffs; motives and truth; facts graph as data (37 link types, lists, 🎲 growth, chains, clues → reveal → reactions); irreversible change (price, pivot, causal chain); traits; voices; the registre and previous lines carried into plans; Grand écran, storyboard, braid; 🎬 needs and duos; ✨ image generation wiring; Mise en scène pipeline; Créer v2 skeleton.
**Never verified with a real AI or real image API:** prompt 2 on the current plans, `basePrompt`, the staging prompt, OpenAI sheets (tested with fake responses only), true sheet sizes.
**Open design work** (all to do **with Justin**):
- The engine reads only four graph cases; the remaining secrets, objects and act-2 stakes are templates (~16 template lines per story: "a look that lasts too long", "an empty chair", "they laugh at Justin"); choices and act endings ("Aller vers Isa / Garder le secret") are templates.
- Antagonist plan (his blows prepare each other, the climax is the last); a secret that only comes out if it costs someone; act 2 keeping Justin's love line when the beloved is dead (it becomes grief); an arc for Justin himself; more than 2 acts; the audience as a graph node; a fact created inside an episode (decided: created by the engine at planning time, not by the AI); choices as a tree; beliefs that flip.
- Micro-loops inside a single scene (a question asked and paid in the same scene) exist only where a technique with moments carries them. Several scenes per episode (prompt 2 follows only box `ep`; touching this changes the AI: ask Justin first, he doubts the role split).
- The game doesn't remember which option the player chose (the next episode's consequence is set by hand, `S.picked`); past choices don't change the climax's sides (only "Pèse : …").
- Engagement in service of choice: ensure every character in a choice was made lovable before (auto-insertion not done). Genders of characters are unknown (neutral phrasing); Justin is "il".
- "Place vide" hooks open a "Who is missing?" that nothing answers (hooks aren't threads); a motive can't be changed with a tap (code reads `S.tq['mot'+k]`, no button writes it); technique cards beyond "Coincé devant tous" are empty; Plan de scène is lighter than a storyboard; the "📋 Prompt de l'acte" button seemed to do nothing for Justin (copies to clipboard and shows one line at the bottom; not re-verified); the Haiku key across all devices (encrypted vault with the GitHub token) was coded then set aside because the security check refused putting the key, even encrypted, in the public repo (options: A push anyway, C a button to copy the key between devices; nothing pushed).
- Claude's first drafts awaiting Justin's review: step names, forms (`FILS.FORMS`), motives, raise levels, act questions, link types and lists (`LINK`, `FOLK`, `THINGS`, `MOMENTS`, `PLACES`, `GROW`), trait tables, `TECH_LVL`.

---

## 17. Glossary (FR UI term → meaning)

| FR | EN |
|---|---|
| Écrire / Créer | Write / Create (the menu, the engine) |
| histoire, acte, épisode | story, act (the Acte route is a fixed 5-episode arc; Créer cuts as many episodes as the braid needs, up to 2 acts), episode |
| moment, rectangle, beat | a unit of the plan; "rectangle" is Plan de scène's word |
| tresse | the braid: all moments interleaved |
| fil | thread (§7.3) |
| pas | a move on a thread |
| nœud | node: a moment that advances several threads |
| graine / seed | the seed: the act's compact brief given to the Acte prompt; also a planted detail (🌱) |
| semé → payé | seeded → paid off |
| pilier | pillar (why we follow a character) |
| faille | flaw |
| désir, conflit, ligne | desire, conflict, plotline |
| enjeu, cran | stake, notch (a level of climb) |
| mobile | motive (of a crime) |
| bascule | pivot (a change of heart after a loss) |
| registre | what the audience knows / what is hidden / who is gone, per episode |
| figure hors cast | an off-stage person known only by name |
| lien, chaîne, 🕸️ | link, chain, the facts-graph panel |
| pièce | the staged "play" JSON in Mise en scène |
| feuille / sheet | an image sheet cut into cells (poses, duos, objects) |
| décor, insert | background, a close object image |
| Banque / Nouveau perso | characters bank / new character wizard |
| 🎲 | draw at random (stable per seed) |
| ① ② | act 1 / act 2 marks on events and infos |
| ✂ | cut: moves the episode boundary |
| ▶ / 🎬 / 📋 / 🎥 / ✨ | play with Haiku / plan without AI / copy prompt / staging / generate image |

---

## 18. File index

| File | Role |
|---|---|
| `index.html` | App shell, menu, CSS, script tags, the façade, keys UI hook, `show()` routing (`SCREENS`, `UP`) |
| `forge.js` (~320 KB) | The Créer engine and all its views, `FORGE` API (`mount, PILLARS, FLAWS, sheet, seed, events, episodes, conflicts, planOf, plotText, line, chains, state, v2`) |
| `fils.js` | Data for threads: `MV, KIND, FORMS, MOTIVE, MATTER, RAISE, ASK, FIGS, LINK, LGROUPS, ENDS, FOLK, THINGS, MOMENTS, PLACES, GROW, CLUE, FATE, BASCULE, TRAITS, PTRAITS, FTRAITS, VOICE, FLAWV` |
| `plan.js` | `PLAN`: canvas, `GOALS` catalogue, `prompt1`, `prompt2`, `LOOSE_JSON` |
| `act.js` | `ACT`: Acte screens, fixed arc, `promptSeed`, `haiku()` |
| `techniques.js` | `TECH_STAGES`, `TECH` theory cards |
| `gen.js` | `GEN`: Ton histoire generator, `SYSTEM`, `build()`, `ask()` |
| `story.js`, `chars.js`, `bar.js`, `play.js`, `games.js`, `heist.js`, `episodes.js`, `demos.js`… | the game itself: `CAST`, sprites, camera, hand-written stories; `PLAN_PLAY` plays plan output |
| `ep1.js` | Example episode 1 data |
| `mise.js`, `mise-data.js` | 🎥 Mise en scène engine / data (set, faces, gestures, prompts, `EX`) |
| `importer.js` | Sheet cutting and import (`IMPORT.cells`, `.extra`, `.add`) |
| `creer2.js` | Créer v2 |
| `bank.js` | Characters bank |
| `chars/`, `bg/`, `mise/`, `props/` | Images; `chars/<sprite>/<pose>.webp`, decors, staging plates |
| `essais/` | Tests and generated references |
| `CLAUDE.md`, `CREER.md`, `PLAN-GRAPHE.md` | Rules, decision log, graph work plan |

---

## 19. Pitfalls (collected)

- `#warn` overlay blocks Playwright clicks: remove it in tests.
- `CUR_ACT`, `NOW`, `SHOWN`: restore with `try/finally`.
- `graph()` is called by `infoFr()`: never call `infoFr`, `desires()` or `story()` from `graph()` (infinite loop).
- Desire objects are rebuilt at every `storyAt()`: compare by `id`, never identity.
- `fils.js` loads after `plan.js`, before `forge.js`.
- `PRESET.txt` is keyed by moment id: re-check after planner changes (`concrete`).
- Bump `?v=` for changed scripts.
- Every phrase needs FR (screen, plan) and EN (prompts).
- Bare `ACT` ≠ `window.ACT`.
- Never print or commit a key. The repo is public.
- The harness may force a feature branch; `CLAUDE.md` says `main`. Follow `CLAUDE.md` when you can, and tell Justin when you can't.

## 20. First hour for a newcomer

1. Read `CLAUDE.md`, then this guide, then `CREER.md`.
2. Serve the repo (`python3 -m http.server 8765`), open it, unlock the façade, go Menu › Écrire › ⚡ Créer, tap **📖 L'exemple**, then **🖥️ Grand écran**, then the example's episode 1 button (plays `EX_EP1`, no key needed). ▶ on other stories needs a Claude key.
3. In the console: `FORGE.plotText()`, `FORGE.episodes()`, `FORGE.planOf(0)`, then `PLAN.prompt2()`. Read that prompt end to end; it is the contract with the AI.
4. Run `node essais/creer/regress.js 10`.
5. Pick one of §16's open items **after asking Justin**; he prefers a short question on structure to a confident guess.
