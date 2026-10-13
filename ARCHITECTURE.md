# Cloud Almanac — Architecture

Read this file before any task in this repo. It defines what goes where and the rules
that keep the data trustworthy.

## Components

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────┐
│ 1. RETRIEVERS           │     │ 2. COMPARATOR           │     │ 3. WEB (display)    │
│ tools/retrieve/<p>.js   │────▶│ tools/build-pricebook.js│────▶│ views/*.js          │
│ fetch official sources  │files│ merge + compute deltas  │files│ render only         │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────┘
            │                                                        ▲
            ▼                                                        │
   data/prices/<provider>/<service>.json                  data/pricebook.js
   (one file per provider+service,                         data/comparisons.js
    with provenance)                                       data/catalogue-*.js
```

### 1. Provider price retrievers — `tools/retrieve/`

One script per provider (`aws.js`, `tencent.js`, later `azure.js`, `gcp.js`, `alibaba.js`).

- Input: a service list (default: catalogue services for that provider).
- Output: `data/prices/<provider>/<service>.json` — one file per service, never shared.
- Rule: **only write values that carry a source** (URL or document name + retrieval date).
  Anything uncertain goes in with `confidence: "review"`, never silently as fact.
- Retrievers run standalone: `node tools/retrieve/aws.js rds`. They never touch the web
  views and never write to `data/pricebook.js` directly.

Price file schema:

```json
{
  "provider": "aws",
  "service": "rds-postgresql",
  "region": "eu-central-1",
  "currency": "USD",
  "retrieved": "2026-10-13",
  "sources": [{ "url": "https://…", "note": "Price List API offer AmazonRDS" }],
  "skus": [{
    "label": "db.m6i.xlarge · Multi-AZ",
    "spec": "4 vCPU / 16 GB",
    "modes": { "ondemand": 592.76 },
    "confidence": "verified"
  }]
}
```

### 2. Comparator — `tools/build-pricebook.js`

- Reads `data/prices/**/*.json` + the equivalence mapping + scenario definitions.
- Joins provider skus into like-for-like scenarios, computes deltas
  `(a − b)/b %`, flags mismatches (missing mode, spec mismatch) as `review`.
- Emits `data/pricebook.js` (generated — header says so; never hand-edit generated
  sections). Hand-authored editorial content (takeaways, notes, page stats) stays in
  `data/comparisons.js`.
- Runs standalone: `node tools/build-pricebook.js`. Idempotent; safe to re-run.

### 3. Web — `views/`, `app.js`, `styles.css`

- Display only. No data fetching, no computation of prices beyond formatting deltas
  already present. If a view needs a number, it must come from `data/`.

## Data flow rules

1. `data/prices/**` is the source of truth for numbers. `data/pricebook.js` is derived.
2. Every number must trace to `sources[]` + `retrieved`. No exceptions.
3. `null` = provider does not offer this mode/sku. Never repeat another mode's price.
4. The catalogue (`data/catalogue-*.js`) owns the service list and match flags;
   `review`/`none` flags are resolved by a human, then pricing proceeds.
5. Themes/layout only in `styles.css`; components only in `views/`.

## Extending

- New provider → add `tools/retrieve/<provider>.js` + registry entry in
  `data/pricebook.js` providers block + equivalence columns in the catalogue.
- New service → catalogue entry (human reviews match flag) → retriever run →
  comparator run → card flips to priced automatically.
- New region → new pricebook id (e.g. `sin`); comparisons reference a book by id.

## Local dev & checks

```sh
python3 -m http.server 8000          # preview
node tools/build-pricebook.js        # regenerate pricebook after price imports
node --check <file>                  # syntax
```

Publish flow: commit → push → republish via WorkBuddy sites (assets are versioned
with `?v=` tags in index.html; bump on every publish).
