// Align retrieved AWS PostgreSQL hourly rates into the row schema (monthly).
'use strict';
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const src = JSON.parse(fs.readFileSync(path.join(root, 'data/prices/aws/rds-postgresql.json'), 'utf8'));
const find = t => src.skus.find(x => x.attr.instanceType === t).hourlyUSD;
const tiers = [['4 vCPU / 16 GB', 'db.m6i.xlarge'], ['8 vCPU / 32 GB', 'db.m6i.2xlarge'], ['16 vCPU / 64 GB', 'db.m6i.4xlarge'], ['32 vCPU / 128 GB', 'db.m6i.8xlarge']];
const skus = [];
for (const [tier, it] of tiers) {
  const monthly = +(find(it) * 730).toFixed(2);
  for (const label of ['PAYG T1 (0–96 h)', 'PAYG avg T2/T3']) {
    skus.push({ tier, label, price: monthly, confidence: 'verified',
      derivation: it + ' Multi-AZ on-demand hourly × 730 h (AWS has no PAYG tiers — flat rate on both rows)' });
  }
}
fs.writeFileSync(path.join(root, 'data/prices/aws/pgsql.json'), JSON.stringify({
  provider: 'aws', service: 'pgsql', region: 'eu-central-1', currency: 'USD', unit: 'per month',
  retrieved: new Date().toISOString().slice(0, 10),
  sources: [{ url: 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonRDS/current/eu-central-1/index.json', note: 'RDS PostgreSQL Multi-AZ on-demand via tools/retrieve/aws.js' }],
  skus
}, null, 2) + '\n');
console.log('aws/pgsql.json written,', skus.length, 'rows');
