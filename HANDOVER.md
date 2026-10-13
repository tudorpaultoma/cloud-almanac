# Cloud Almanac — Handover

**Date:** 13 Oct 2026 · **State at handover:** commit `2cd341d` on `main` (pushed)
**Audience:** the next session / Overseer. Read `ARCHITECTURE.md` first for the pipeline
rules; this file is the project state, conventions, and backlog.

---

## 1. What this project is

Cloud Almanac — a lightweight console comparing the major cloud providers
(Tencent Cloud, AWS; Azure / GCP / Alibaba planned). Think "almanac for cloud":
infrastructure footprint, service equivalence, prices, support, free tier,
promotions, certifications.

- **Repo:** `git@github.com:tudorpaultoma/cloud-almanac.git` (public)
- **Local clone:** `/Users/tudortoma/Documents/Projects/cloud-almanac`
- **Live preview:** https://cloud-almanac.app-tencent.workbuddy.host/
  (WorkBuddy-hosted static snapshot — does NOT auto-sync with git; see §7)
- **Stack:** vanilla HTML/CSS/JS. No build step, no dependencies, no framework.
  Data = JS files loaded via `<script>` tags. Works on any static host.

## 2. Current state — what exists and works

**Shell** (`index.html`, `app.js`, `styles.css`)
- Sidebar nav in 3 groups: Coverage (Infrastructure, Features), Commercial
  (Price, Support, Free Tier, Promotions), Trust (Certifications).
- All modules except **Price** are "Coming soon" placeholders.
- Light/dark themes ("Slate": light `#EEF1F4`/`#22496F` accent, dark
  `#080A0E`/`#A9C8E4`), follows OS, toggle persisted in localStorage.
  Text contrast ≥ 7:1 in both modes. Logo = layered-pages mark
  (`assets/logo-mark.svg`, theme-aware).
- Hash routing `#/module/page` (e.g. `#/price/pgsql`, `#/price/cat-database`).
- Assets carry `?v=` cache-busting tags in `index.html` — **bump on every publish**.

**Price module** (`views/price.js`) — the only built module:
- **Overview**: KPI cards + range chart of service medians/ranges, sort by
  category or median.
- **9 detail pages**: MySQL, PostgreSQL, Redis, CDN, Storage (CBS+COS),
  Network (CLB+NAT+VPN), Firewall, Streaming (CSS+VOD+MPS), Observability
  (CLS+TCMG+RUM+EventBridge). Each: stats cards, scenario tables with Δ bars,
  key takeaway, collapsible methodology & sources.
- **18 category tabs** (`#/price/cat-<slug>`): every catalogue service as a
  card — AWS equivalent, match flag, median Δ + "View pricing" link, or
  "Pricing pending".
- **All services** tab: full 184-row catalogue table with status/category/text
  filters — the manual-review queue.
- Pair selector in the toolbar: only "Tencent Cloud vs AWS · Frankfurt" active;
  other pairs listed disabled. Views are pair-generic — a second pair needs only
  pricebook data + a comparisons entry.

**Data** (`data/`) — see `data/README.md` for the schema:
- `data/prices/<provider>/<service>.json` — source of truth for numbers
  (49 files: 17 Tencent, 32 AWS). Every file has `sources[]` + `retrieved`.
- `data/structure.js` — service/tier/row layout (editorial, no prices).
- `data/pricebook.js` — **GENERATED** by the comparator. Never hand-edit.
- `data/comparisons.js` — pair editorial content (summaries, pages, notes).
- `data/catalogue-tencent-aws.js` — 184 Tencent Cloud International products
  mapped to AWS with flags: **82 match / 66 review / 28 no-match / 8 out-of-scope**.

**Pipeline** (`tools/`)
- `retrieve/aws.js` — AWS Price List bulk API, no credentials, eu-central-1.
  Verified against the source deck to the cent. Specs: elasticache-redis,
  rds-mysql, rds-postgresql, documentdb (add more in SPECS).
- `retrieve/tencent.js` — no public Tencent price API exists. Modes: `formula`
  (official per-GB tier rates from cited docs) and `manual` (transcribed,
  always `confidence: review`).
- `build-pricebook.js` — merges price files + structure → `pricebook.js`,
  computes deltas. Idempotent.
- `migrate-deck.js`, `add-pgsql.js`, `align-aws-pgsql.js` — one-time scripts,
  kept for reference.

## 3. Provenance & data rules (hard rules)

1. Only sourced list prices. No estimates, no invented numbers.
2. Every number traces to `sources[]` + `retrieved`.
3. `null` = provider doesn't offer it; never repeat another mode's price
   (call it out in page notes instead).
4. `review`/`none` catalogue flags are resolved by a human before pricing.
5. Original data source for the Tencent↔AWS pair: the deck
   **"Cloud prices - Tencent vs AWS.pptx"** (Frankfurt list prices, retrieved
   2 Oct 2026), `/Users/tudortoma/Documents/`. All 87 scenarios imported and
   verified (deltas/medians recalculated).

## 4. Verified vs pending

- Deck data: 17 services, 8 pages, verified ✔
- PostgreSQL (first pipeline-produced service): Tencent = Purchase Guide tier
  formula (Frankfurt rates verbatim), AWS = retrieved from Price List API.
  Result: steady-state −35%, short-lived T1 +4%, median −16%. **Monthly/term
  rows deliberately omitted** — the intl pricing page's region column needs
  manual confirmation first (buy.intl.cloud.tencent.com is JS-rendered).
- AWS retriever cross-check: exact match with deck for ElastiCache/RDS MySQL ✔

## 5. Backlog (suggested plan order)

| # | Task | Notes |
|---|------|-------|
| 1 | **Compute pricing (CVM)** | Blocked on the user's separate "compute comparison" deck — ask for it. Deck says CVM median −59%, PAYG −52%. |
| 2 | **Database batch completion** | SQL Server, MariaDB, MongoDB/DocumentDB (AWS side already retrieved: `documentdb.json`), TDSQL-C vs Aurora. AWS retriever covers RDS/DocDB; Tencent needs formula/manual rows with citations. |
| 3 | **Republish check** | Last publish attempt failed with a transient upload error (13 Oct); verify live site serves commit ≥ `2cd341d` (PostgreSQL tab visible). |
| 4 | **Manual review queue** | 66 review + 28 no-match catalogue rows. Walk category by category with the user; update flags in `catalogue-tencent-aws.js`. |
| 5 | **Storage/network extras** | CFS vs EFS, EIP, Direct Connect (AWS retriever specs + Tencent docs). |
| 6 | **Containers & serverless** | SCF vs Lambda, TKE vs EKS (control planes ~free both sides; node cost = CVM). |
| 7 | **Second provider pair** | Azure vs AWS likely next. Views are pair-ready; needs pricebook data + comparisons entry + provider registry flip (`pending`). |
| 8 | **Other modules** | Infrastructure (regions/AZ/edge map), Features (equivalence matrix — catalogue data is a starting point), Support, Free Tier, Promotions (needs live-data strategy), Certifications. |
| 9 | **Hosting long-term** | GitHub Pages or Vercel wired to the repo (no build step needed), so pushes go live automatically. |
| 10 | **Compute detail page** | Once deck imported, add `cvm` to structure + a detail page; catalogue card already links. |

Per-batch acceptance: price files carry sources+dates → comparator runs clean →
card flips from "pending" to priced → deltas spot-checked → version bump →
commit → push → republish.

## 6. Working agreements

- **Split of labor:** WorkBuddy (this workspace) = design, research, data
  imports, review. CodeBuddy = heavier implementation, CI, deploy automation.
  User has the repo open in both.
- **Commits:** short, imperative, one line, < 60 chars.
- **Replies in English.**
- Never `sed -i` files inside the repo — the sandbox has left stray temp files
  that got committed twice; use Edit/Write tools or node scripts.
- Browser automation (`agent-browser`) is flaky on this machine; validate data
  with node smoke tests (pattern in git history, `/tmp/ca-check*.js` were
  examples) and ask the user for visual confirmation.

## 7. Publishing

- Tool: WorkBuddy sites deploy, directory = the repo clone, static.
- Link is stable: https://cloud-almanac.app-tencent.workbuddy.host/
- **Requires explicit user request each time** (overwrites the live snapshot).
- After any `index.html` asset change: bump the `?v=` tag (format `v=YYYYMMDDx`).
- Manage/take offline: WorkBuddy → Settings → Data Management → Published Apps.

## 8. Design tokens quick reference

Slate theme in `styles.css` `:root` / `[data-theme="dark"]`. Cheaper = muted teal
(`--cheaper`), AWS-cheaper = muted rust (`--dearer`), review = amber (`--warn`).
Inter font (system fallback). Radius 8–12 px, 0.5–1 px borders, no gradients.

## 9. Known gaps / honest caveats

- Tencent prices can drift from web pages without notice; `retrieved` dates
  matter. Re-run retrievals periodically.
- The "17 of 17 cheaper" overview KPI is the deck's snapshot (2 Oct 2026), not
  computed live.
- CVM card shows median −59% but its detail page awaits the compute deck.
- RUM reports into Singapore (no EU region) — data-residency note on the page.
- CloudFront flat-rate plans can undercut both CDN PAYG rows — noted on CDN page.
