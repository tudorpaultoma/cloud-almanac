/*
 * Tencent Cloud price retriever.
 *
 * Tencent Cloud International has no public price API; prices live on web pages
 * and in official billing docs. Two retrieval modes per spec:
 *
 *   formula:  compute instance prices from official per-GB tier rates
 *             (rates copied verbatim from the cited doc, never inferred)
 *   manual:   numbers transcribed from a cited page/PDF — always lands as
 *             confidence "review" until a human confirms against the live console
 *
 * Usage: node tools/retrieve/tencent.js <spec>   |   --list
 * Output: data/prices/tencent/<service>.json
 */
'use strict';
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', '..');
const HOURS = 730;

const SPECS = {
  // TencentDB for PostgreSQL — tiered PAYG, spec fee = memory GiB × tier rate.
  // Rates for Frankfurt from the official Purchase Guide PDF (verbatim).
  pgsql: {
    mode: 'formula',
    sources: [
      { url: 'https://staticintl.cloudcachetci.com/doc/pdf/product/pdf/tencent-cloud_409_4988_en.pdf',
        note: 'TencentDB for PostgreSQL Purchase Guide — PAYG tiers Frankfurt: T1 $0.055, T2 $0.041, T3 $0.028 /GiB/hr (memory). Disk excluded.' },
      { url: 'https://buy.intl.cloud.tencent.com/pricing/PostgreSQL',
        note: 'International pricing page (JS-rendered; region column needs manual confirmation before adding monthly/term rows)' }
    ],
    tiersDef: [
      { label: '4 vCPU / 16 GB', memGiB: 16 },
      { label: '8 vCPU / 32 GB', memGiB: 32 },
      { label: '16 vCPU / 64 GB', memGiB: 64 },
      { label: '32 vCPU / 128 GB', memGiB: 128 }
    ],
    rates: { T1: 0.055, T2: 0.041, T3: 0.028 }, // USD per GiB-hour, Frankfurt
    rows(memGiB, r) {
      const t1 = memGiB * r.T1, t2 = memGiB * r.T2, t3 = memGiB * r.T3;
      return [
        { label: 'PAYG T1 (0–96 h)', price: +(t1 * HOURS).toFixed(2) },
        { label: 'PAYG avg T2/T3', price: +(((t2 + t3) / 2) * HOURS).toFixed(2) }
      ];
    }
  }
};

function run(name) {
  const spec = SPECS[name];
  if (!spec) { console.error('unknown spec:', name); process.exit(1); }
  const skus = [];
  for (const t of spec.tiersDef) {
    for (const row of spec.rows(t.memGiB, spec.rates)) {
      skus.push({
        tier: t.label,
        label: row.label,
        price: row.price,
        confidence: 'verified', // formula rates verbatim from cited doc
        derivation: `spec fee = ${t.memGiB} GiB × tier rate × ${HOURS} h`
      });
    }
  }
  const out = {
    provider: 'tencent',
    service: name,
    region: 'Frankfurt',
    regionDetail: 'regionId 17',
    currency: 'USD',
    unit: 'per month',
    retrieved: new Date().toISOString().slice(0, 10),
    sources: spec.sources,
    skus
  };
  const f = path.join(root, 'data/prices/tencent', name + '.json');
  fs.writeFileSync(f, JSON.stringify(out, null, 2) + '\n');
  console.log(`${name}: ${skus.length} rows → data/prices/tencent/${name}.json`);
  skus.forEach(s => console.log('  ', s.tier, '|', s.label, '→ $' + s.price));
}

const arg = process.argv[2];
if (arg === '--list' || !arg) console.log('specs:', Object.keys(SPECS).join(', '));
else run(arg);
