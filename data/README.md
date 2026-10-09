# Data model

Prices live in plain JS data files (no build step, works from any static host).
Three layers, loaded in this order:

## 1. `pricebook.js` — normalized, reusable prices

Provider-neutral. One entry per logical service; prices keyed by provider id.

```js
CA_DATA.providers = { tencent: {...}, aws: {...}, azure: {...} }; // registry
CA_DATA.pricebooks = [{
  id: 'fra', region: 'Frankfurt', currency: 'USD', unit: 'per month',
  services: [{
    id: 'mysql',
    tiers: [{
      label: '4 vCPU / 16 GB',
      products: { tencent: 'MySQL General · 4C16G', aws: 'db.m6i.xlarge · Multi-AZ' },
      rows: [{
        label: 'Monthly prepaid vs on-demand',
        prices: { tencent: 418.82, aws: 592.76 },  // null = not offered
        delta: -29                                  // published %, (a−b)/b
      }]
    }]
  }]
}];
```

**Adding a provider:** add its key to `products{}` / `prices{}` of each row — no view changes.
**Adding a service:** new entry under `services[]`; deltas are also computed at render time, `delta` is the authored/published value for cross-checking.

## 2. `comparisons.js` — pair-specific editorial content

```js
CA_DATA.comparisons = [{
  pair: ['tencent', 'aws'], book: 'fra',
  summary: {...},           // overview KPIs, takeaway, sources
  services: [...],          // overview rows: median per service
  pages: [{ id, tab, title, stats, serviceIds: [...], takeaway, notes, source }]
}];
```

A page pulls its tiers from the pricebook via `serviceIds`; this file only adds curated content (stats, takeaways, methodology).

## 3. `catalogue-*.js` — full product catalogue + equivalence flags

One entry per provider product: `[name, awsEquivalent, status, note?, pricePageId?]`.
Status: `ok` / `review` (manual-review queue) / `none` / `skip`.

## Rules

- Only sourced list prices go in. No estimates, no invented numbers.
- Every pricebook row needs its retrieval date at book level; per-page `source` cites the exact documents.
- If a provider doesn't offer a billing mode, use `null` — do not repeat another mode's price (call that out in the page notes instead).
