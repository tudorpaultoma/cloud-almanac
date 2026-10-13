/*
 * AWS price retriever — public Price List bulk API (no credentials).
 * Downloads the per-region offer file, filters SKUs, writes data/prices/aws/<service>.json.
 *
 * Usage:
 *   node tools/retrieve/aws.js <spec>          e.g. node tools/retrieve/aws.js elasticache-redis
 *   node tools/retrieve/aws.js --list          list known specs
 *
 * Specs live below (SPECS). Each spec: offer + attribute filters + output mapping.
 * Every written price carries the offer URL as its source.
 */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const root = path.join(__dirname, '..', '..');
const cacheDir = path.join(root, '.cache/aws');
const REGION = 'eu-central-1';

// --- specs: how to find the SKUs for each service ----------------------------
// match: all key/value pairs must equal the product attributes (exact match).
// groupBy / label: how rows are labelled in the price file.
const SPECS = {
  'elasticache-redis': {
    offer: 'AmazonElastiCache',
    match: { cacheEngine: 'Valkey', currentGeneration: 'Yes' },
    usageTypeIncludes: 'NodeUsage',
    unit: 'Hrs',
    label: p => p.attributes.instanceType,
    note: 'Valkey on Graviton, on-demand'
  },
  'rds-postgresql': {
    offer: 'AmazonRDS',
    match: { databaseEngine: 'PostgreSQL', deploymentOption: 'Multi-AZ', currentGeneration: 'Yes' },
    usageTypeIncludes: 'Usage:',
    unit: 'Hrs',
    label: p => p.attributes.instanceType + ' · Multi-AZ',
    note: 'RDS PostgreSQL Multi-AZ, on-demand'
  },
  'rds-mysql': {
    offer: 'AmazonRDS',
    match: { databaseEngine: 'MySQL', deploymentOption: 'Multi-AZ', currentGeneration: 'Yes' },
    usageTypeIncludes: 'Usage:',
    unit: 'Hrs',
    label: p => p.attributes.instanceType + ' · Multi-AZ',
    note: 'RDS MySQL Multi-AZ, on-demand'
  },
  'documentdb': {
    offer: 'AmazonDocDB',
    match: { currentGeneration: 'Yes' },
    usageTypeIncludes: 'Usage:',
    unit: 'Hrs',
    label: p => p.attributes.instanceType,
    note: 'DocumentDB instance, on-demand'
  }
};

function download(offer) {
  fs.mkdirSync(cacheDir, { recursive: true });
  const f = path.join(cacheDir, `${offer}.${REGION}.json`);
  const url = `https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/${offer}/current/${REGION}/index.json`;
  if (!fs.existsSync(f)) {
    console.log('downloading', url);
    execSync(`curl -sf "${url}" -o "${f}"`, { stdio: 'inherit' });
  }
  return { file: f, url };
}

function run(specName) {
  const spec = SPECS[specName];
  if (!spec) { console.error('unknown spec:', specName); process.exit(1); }
  const { file, url } = download(spec.offer);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  const skus = [];
  for (const [sku, p] of Object.entries(data.products)) {
    const a = p.attributes || {};
    let ok = p.productFamily && true;
    for (const [k, v] of Object.entries(spec.match)) if (a[k] !== v) { ok = false; break; }
    if (ok && spec.usageTypeIncludes && !(a.usagetype || '').includes(spec.usageTypeIncludes)) ok = false;
    if (!ok) continue;

    // on-demand USD price
    const terms = (data.terms && data.terms.OnDemand && data.terms.OnDemand[sku]) || {};
    let price = null, unit = null;
    for (const t of Object.values(terms)) {
      for (const pd of Object.values(t.priceDimensions)) {
        if (pd.unit === spec.unit && parseFloat(pd.pricePerUnit.USD) > 0) {
          price = parseFloat(pd.pricePerUnit.USD); unit = pd.unit;
        }
      }
    }
    if (price == null) continue;
    skus.push({
      label: spec.label(p),
      spec: [a.vcpu && a.vcpu + ' vCPU', a.memory && a.memory].filter(Boolean).join(' / '),
      hourlyUSD: price,
      confidence: 'verified',
      attr: { instanceType: a.instanceType, engine: a.cacheEngine || a.databaseEngine, deployment: a.deploymentOption }
    });
  }
  skus.sort((x, y) => x.hourlyUSD - y.hourlyUSD);

  const out = {
    provider: 'aws',
    service: specName,
    region: REGION,
    currency: 'USD',
    unit: 'per hour (on-demand)',
    retrieved: new Date().toISOString().slice(0, 10),
    sources: [{ url, note: spec.note }],
    skus
  };
  const outFile = path.join(root, 'data/prices/aws', specName + '.json');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  console.log(`${specName}: ${skus.length} SKUs → data/prices/aws/${specName}.json`);
  skus.slice(0, 5).forEach(s => console.log('  ', s.label, '$' + s.hourlyUSD + '/h', s.spec));
}

const arg = process.argv[2];
if (arg === '--list' || !arg) {
  console.log('specs:', Object.keys(SPECS).join(', '));
} else {
  run(arg);
}
