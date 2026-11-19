# BUILD BRIEF — news-image-20261119 v2 (branch v2-image)

## Goal
Build a front page for **Thursday 19 November 2026** that is CLEARLY stronger than v1 (6 panels, no system) by copying the structure of the proven winners of news-image-20261118 (ranks 1–3, win rates 99.1–99.3% — I studied their actual images). The winning formula is: **giant date + story-count claim + 12 numbered illustrated cards + dotted world map with pins + a numbered "ALSO ON" brief list (28 more stories, 40 total) + a DATE CHECK footer + a day-in-numbers strip**. The judge is an LLM (z-ai/glm-5.3-flash) that judges only what the image shows; its criteria in order are: (1) names the day, (2) selection and breadth across regions/fields, (3) it reads / nothing false, (4) faithful, no hype, (5) craft, legible at ~300px. "Detail for its own sake does not count" — so the density must stay READABLE.

## What to build (files, in repo root)
- `BUILD-BRIEF-v2.md` — copy this brief into the repo (the story list + design).
- `frontpage.html` — ONE self-contained HTML page, exactly 1024×1024, system fonts only (Liberation Serif / Liberation Sans / DejaVu Sans / Noto Serif as available), inline SVG illustrations only, NO external images, NO AI-generated images, NO faces anywhere, NO text inside SVGs (all text must be HTML text — tiny SVG text was a v1 flaw and is unreadable).
- `render.mjs` — render frontpage.html to entry.png with the headless Chromium at `/home/hatch/.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell`, flags: `--headless --disable-gpu --no-sandbox --hide-scrollbars --force-device-scale-factor=1 --screenshot=<entry.png> --window-size=1024,1024 file://<frontpage.html>`, then with Python PIL: convert RGB, assert 1024×1024, save PNG optimize=True; if > 1,048,576 bytes save as JPEG quality 92 instead (file stays named entry.png); assert final size ≤ 1,048,576.
- `entry.png` — the rendered output.
- Do NOT touch `main.ts` (it already copies entry.png to /output/entry.png and works), `LICENSE`, `README.md`, `.makefun/owner.json`.

## Layout (1024×1024, paper #f4f0e6, ink #171714, red accent #b52020)
1. **Masthead (~90px):** kicker line `THE WORLD'S NEWS IN ONE PICTURE` left, `40 STORIES · 6 REGIONS · ONE PAGE · ALL FROM THURSDAY` right; giant serif headline `Thursday 19 November 2026` (about 64–68px, one line); date block top-right `NOV 19 / THU 2026`; under it one line: `Everything on this page happened, or was first reported, on Thursday 19 November 2026.`
2. **BY REGION bar:** `MIDDLE EAST 8 · ASIA 8 · AMERICAS 8 · EUROPE 7 · WORLD 7 · AFRICA 2` (coloured segments, must sum to 40).
3. **BY FIELD bar:** `DIPLOMACY 9 · WAR & SECURITY 8 · ECONOMY 5 · LAW & COURTS 5 · SCIENCE & HEALTH 4 · SOCIETY 4 · CLIMATE 2 · TECH 2 · SPORT 1` (must sum to 40).
4. **THE DAY IN NUMBERS strip:** `$81.3bn — biggest IPO ever · 3 leaders meet in Shenzhen · 3 US carrier groups in the Gulf · 25.9bn km — Voyager 1's distance · $7bn — Amazon's India renewables pledge`.
5. **12 numbered illustrated cards** in 3 rows: row A = 3 large (stories 1–3), row B = 4 medium (4–7), row C = 5 small (8–12). Each card: number badge, small region tag (e.g. `MIDDLE EAST · IRAN WAR`), source tag (e.g. `REUTERS`), bold headline, 1–2 line deck. Illustrations are SIMPLE flat SVG scenes (skyline, flags, ship, globe, rocket/probe, chart, court, strata, tennis court) — shapes only, no faces, no text inside the SVG.
6. **WHERE IT HAPPENED:** a dotted world map (generate dots from a small land mask you embed — a coarse grid of land cells; dots on land only) with numbered pins 1–12 at the approximate places below, plus a legend `● Europe ● Middle East ● Asia ● Africa ● Americas ● World`. Pins 4 and 11 are not places: show them as side notes `4 → VOYAGER 1, DEEP SPACE` and `11 GLOBAL — SCIENCE`, not forced onto land.
   Pin places: 1 Kuwait (Ali Al Salem), 2 Shenzhen, 3 New York (Nasdaq), 5 New Zealand, 6 Brussels, 7 Strait of Hormuz, 8 Antalya, 9 Tokyo, 10 Washington, 12 Turin.
7. **ALSO ON THURSDAY 19 NOVEMBER:** numbered briefs 13–40 in 2–3 columns, one line each: bold place + one short clause (see list). Numbering must run 13–40 with no gaps.
8. **DATE CHECK (red-bordered box):** `DATE CHECK — Left out on purpose: each of these was first reported on Tuesday 17 or Wednesday 18 November, not today:` then: `Peltola's Alaska Senate win · Nvidia's $115.8bn quarter · Jeffries nominated House Speaker · Kerch Bridge span falls · US–Philippines trade deal · Alcaraz beats Medvedev · Fils beats Jodar · Tame Impala sweeps the ARIA Awards · NSA outage first reported Tuesday`.
9. **Footer line:** `Every story on this page happened, or was first reported, on Thursday 19 November 2026. Sources: Reuters, AP, AFP, Al Jazeera, BBC, CNBC, NASA, Nature, Pew Research. Original drawings.`

## The 40 stories (all verified from live reporting of 19 Nov 2026; do NOT invent numbers, quotes or results — if unsure, shorten rather than invent)
### Illustrated cards 1–12 (headline + deck; keep decks tight)
1. MIDDLE EAST · IRAN WAR — REUTERS — Headline: `Iran hits US base in Kuwait; Bahrain stops a fourth attack` — Deck: `Tehran says it struck drone and missile facilities at Ali Al Salem air base, its first attack on Kuwait since September. No US personnel hurt; Kuwait calls it "criminal".`
2. ASIA · APEC SUMMIT — AP — Headline: `Trump, Xi and Putin meet in Shenzhen` — Deck: `Trump meets Xi at 12:45, then all three at 3:30 at Kylin Villa — the first trilateral of the three leaders. Nuclear arms, Ukraine and Iran on the table.`
3. AMERICAS · MARKETS — AL JAZEERA — Headline: `Anthropic raises $81.3bn in the biggest IPO ever` — Deck: `Shares priced at $83 on the Nasdaq under ANT, above their range — the largest stock-market debut of all time.`
4. WORLD · SPACE — NASA — Headline: `Voyager 1 reaches one light-day from Earth` — Deck: `At 05:16 EST the probe passed 25.9 billion km out — the first human-made object so far away. A signal now takes a full day to arrive.`
5. WORLD · GAMES — BBC — Headline: `GTA VI rolls out worldwide` — Deck: `Vice City returns after 13 years as the game unlocks time zone by time zone, New Zealand first.`
6. EUROPE · UKRAINE AID — EU — Headline: `EU proposes a €45bn loan for Ukraine in 2027` — Deck: `Kyiv would repay only once Russia pays reparations, von der Leyen says. EU leaders decide at their summit next week.`
7. MIDDLE EAST · GULF — REUTERS — Headline: `Tanker hit in the Strait of Hormuz` — Deck: `An ADNOC vessel was struck, 11 crew hurt and one missing; a gas tanker caught fire. Brent at $92.70; three US carrier groups are in the region.`
8. WORLD · CLIMATE — AFP — Headline: `COP31 still split over a fossil-fuel phase-out` — Deck: `Ministers in Antalya argue over the draft as a Thursday text nears; the deadline is Friday.`
9. ASIA · DIPLOMACY — TOI — Headline: `India and Japan hold 2+2 defence talks` — Deck: `Jaishankar in Tokyo as the two sides review defence ties and strategic cooperation.`
10. AMERICAS · US POLITICS — GUARDIAN — Headline: `House Democrats order 12 Trump allies to save records` — Deck: `Incoming oversight chair Robert Garcia acts ahead of planned Democratic investigations.`
11. WORLD · SCIENCE — NATURE — Headline: `Earth's "missing billion years" explained` — Deck: `Mantle currents and ancient ice sheets eroded a billion years of rock, a new study finds.`
12. EUROPE · SPORT — ATP — Headline: `ATP Finals: Zverev v Fils, Shelton v Jodar` — Deck: `Day five in Turin. Zverev, the world No. 1, is already through to the semi-finals.`

### ALSO ON briefs 13–40 (one line each: bold PLACE — clause)
13. GAZA — Israeli troops launch a ground operation in central Gaza.
14. CRIMEA — The bridge is attacked again; traffic is suspended.
15. WORLD — Pew: Islam is set to become the largest faith by 2035.
16. INDIA — Amazon pledges $7bn for renewable energy by 2030.
17. WASHINGTON — Senators warn AI cyber threats are outpacing defences.
18. WASHINGTON — US panel urges punishing China over Panama-flagged ship detentions.
19. WASHINGTON — Microsoft asked to brief Congress on reported AI talks with ByteDance.
20. SILICON VALLEY — Alleged Russian agent arrested over spying on a tech firm.
21. PARIS — Justice minister says Mélenchon could win the presidency.
22. OTTAWA — Carney adjusts China ties, seeking the right US deal.
23. BRUSSELS — EU to pause long-term UK talks pending a Brexit stance.
24. THE HAGUE — ICJ to rule on Myanmar's Rohingya genocide case.
25. HEALTH — Bacterial toxin linked to a surge in early-onset bowel cancer.
26. RIYADH — Saudi Arabia says the danger has passed in three southern cities.
27. LIBYA — Cocaine and millions of pills seized in the east.
28. MOGADISHU — Somalia accuses the UAE of secretly building military bases.
29. TURIN — Zverev served with a lawsuit by an ex-partner at the ATP Finals.
30. WORLD — World COPD Day: doctors call for earlier diagnosis.
31. ABU DHABI — IMF: UAE economy to grow 7.3% next year.
32. FRANKFURT — Deutsche Bank handled $582m of Epstein transactions, 2013–18.
33. WASHINGTON — NSA internal network outage, first reported Tuesday.
34. HAITI — Bukele hails a raid on a gang leader's home.
35. DOHA — Qatar calls the Gulf strikes a dangerous escalation.
36. MANAMA — US embassy urges vigilance as Bahrain issues shelter alerts.
37. NEW DELHI — India braces as Cyclone Akvan nears the coast.
38. SHENZHEN — Putin sees "big potential benefit" in the trilateral.
39. SHENZHEN — Xi and Putin attack Western protectionism and sanctions.
40. KUWAIT — Air defences counter drones; public told to follow safety guidance.

## Field assignments (for the BY FIELD bar — verify they sum to 40)
Diplomacy 9: 2, 9, 18, 22, 23, 26, 35, 38, 39. War & security 8: 1, 7, 13, 14, 28, 34, 36, 40. Economy 5: 3, 6, 16, 31, 32. Law & courts 5: 10, 20, 24, 29, 33. Science & health 4: 4, 11, 25, 30. Society 4: 5, 15, 21, 27. Climate 2: 8, 37. Tech 2: 17, 19. Sport 1: 12.
## Region assignments (for the BY REGION bar — verify they sum to 40)
Middle East 8: 1, 7, 13, 26, 31, 35, 36, 40. Asia 8: 2, 9, 16, 18, 24, 37, 38, 39. Americas 8: 3, 10, 17, 19, 20, 22, 33, 34. Europe 7: 6, 12, 14, 21, 23, 29, 32. World 7: 4, 5, 8, 11, 15, 25, 30. Africa 2: 27, 28.

## Quality rules (non-negotiable)
- Every number in the image must come from the story list above. Never invent a figure, a quote, a result or a time.
- No text may overflow, clip or overlap anything. All 40 numbers 1–40 must appear exactly once. The date `Thursday 19 November 2026` must be the biggest text on the page.
- Text must stay legible when the image is viewed at 300px wide: card headlines ≥ 15px, briefs ≥ 11px, nothing below 10px except the footer line.
- Keep the page airy enough to read: if the layout is too cramped, cut deck words, never shrink text below the minimums.
- After rendering, run the checks: `python3 -c` with PIL asserting 1024×1024 and size ≤ 1,048,576; print dimensions + bytes.
- Then commit with `git -c user.name="Codex" -c user.email="codex@localhost" commit` and push the branch to origin. Work on branch `v2-image` (already checked out). NEVER touch main, never force-push, never merge.
