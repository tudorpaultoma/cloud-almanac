// Add PostgreSQL service to structure.js, comparisons.js and catalogue — object-safe.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const load = f => { const sb = { window: {} }; vm.createContext(sb); vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sb); return sb.window; };

// structure.js
const w1 = load('data/structure.js');
const structure = w1.CA_STRUCTURE;
structure.services.splice(1, 0, {
  id: 'pgsql',
  tiers: [
    ['4 vCPU / 16 GB', '4C16G', 'db.m6i.xlarge'],
    ['8 vCPU / 32 GB', '8C32G', 'db.m6i.2xlarge'],
    ['16 vCPU / 64 GB', '16C64G', 'db.m6i.4xlarge'],
    ['32 vCPU / 128 GB', '32C128G', 'db.m6i.8xlarge']
  ].map(([label, spec, aws]) => ({
    label, sub: 'High-availability edition · instance only, disk excluded',
    products: { tencent: 'PostgreSQL · ' + spec, aws: aws + ' · Multi-AZ' },
    rows: [{ label: 'PAYG T1 (0–96 h)', delta: null }, { label: 'PAYG avg T2/T3', delta: null }]
  }))
});
fs.writeFileSync(path.join(root, 'data/structure.js'),
  '/* Service/tier/scenario layout — editorial, no prices. Prices come from data/prices/<provider>/<service>.json\n * via tools/build-pricebook.js. */\n' +
  'var CA_STRUCTURE = window.CA_STRUCTURE = ' + JSON.stringify(structure, null, 2) + ';\n');

// comparisons.js
const w2 = load('data/comparisons.js');
const cmp = w2.CA_DATA.comparisons[0];
cmp.services.splice(1, 0, { id: 'pgsql', cat: 'Compute & data', name: 'PostgreSQL', vs: 'TencentDB vs RDS Multi-AZ', median: -16, page: 'pgsql', pending: null });
cmp.pages.splice(1, 0, {
  id: 'pgsql', tab: 'PostgreSQL',
  title: 'TencentDB for PostgreSQL vs Amazon RDS for PostgreSQL',
  sub: 'Frankfurt · Multi-AZ both sides · instance only (disk excluded) · list prices, USD per month',
  stats: {
    median: { d: -16, n: 8 },
    best: { d: -35, label: '32 vCPU / 128 GB · PAYG avg T2/T3' },
    saving: { value: '$20.7k', label: '32 vCPU / 128 GB · PAYG avg T2/T3 vs on-demand' }
  },
  serviceIds: ['pgsql'],
  takeaway: 'Steady-state PostgreSQL runs ~35% below RDS Multi-AZ on Tencent\'s tiered PAYG (T2/T3), but short-lived instances pay T1 and land ~4% above AWS. Tencent monthly/term rows are pending manual confirmation of the Frankfurt column on the international pricing page.',
  notes: [
    'Tencent PAYG tiers (Purchase Guide): T1 0–96 h, T2 96–360 h, T3 > 360 h. Spec fee = memory GiB × tier rate; Frankfurt rates T1 $0.055, T2 $0.041, T3 $0.028 /GiB/h. Row 2 averages T2 and T3, the steady-state rate.',
    'AWS has no PAYG tiers — flat on-demand rate repeats on both rows. AWS = db.m6i Multi-AZ on-demand × 730 h.',
    'Disk, backup and traffic excluded on both sides.',
    'Monthly subscription / 1-year term rows intentionally omitted: the international pricing page\'s region column needs manual confirmation first.'
  ],
  source: 'TencentDB for PostgreSQL Purchase Guide (PDF, Frankfurt tier rates) · AWS Price List API, AmazonRDS, eu-central-1 (retrieved via tools/retrieve/aws.js, 13 Oct 2026).'
});
fs.writeFileSync(path.join(root, 'data/comparisons.js'),
  '/*\n * Comparisons — pair-specific editorial content (summaries, pages, takeaways).\n * Prices come from CA_DATA.pricebooks (referenced by \'book\'); this file adds\n * the curated per-page content and summary medians.\n */\n' +
  'var CA_DATA = window.CA_DATA = window.CA_DATA || {};\n' +
  'CA_DATA.comparisons = ' + JSON.stringify([cmp], null, 2) + ';\n');

// catalogue
const catPath = path.join(root, 'data/catalogue-tencent-aws.js');
let cat = fs.readFileSync(catPath, 'utf8');
const old = "['TencentDB for PostgreSQL', 'RDS for PostgreSQL', 'ok']";
if (cat.includes(old)) {
  cat = cat.replace(old, "['TencentDB for PostgreSQL', 'RDS for PostgreSQL', 'ok', null, 'pgsql']");
  fs.writeFileSync(catPath, cat);
}
console.log('pgsql wired into structure, comparisons, catalogue');
