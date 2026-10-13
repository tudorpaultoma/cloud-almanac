/*
 * One-time migration: split data/pricebook.js (deck-authored) into
 *   - data/structure.js          tier/row layout + labels (no numbers)
 *   - data/prices/<provider>/<service>.json   numbers with provenance
 * Run: node tools/migrate-deck.js
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'data/pricebook.js'), 'utf8'), sandbox);
const book = sandbox.window.CA_DATA.pricebooks[0];

const SRC = {
  tencent: 'Tencent Cloud International price pages, Frankfurt (regionId 17), 2 Oct 2026 — via "Cloud prices - Tencent vs AWS.pptx"',
  aws: 'AWS Price List API, eu-central-1, 2 Oct 2026 — via "Cloud prices - Tencent vs AWS.pptx"'
};

const structure = { book: book.id, services: [] };
let files = 0;

for (const svc of book.services) {
  const sEntry = { id: svc.id, tiers: [] };
  const byProvider = {};
  for (const tier of svc.tiers) {
    const tEntry = { label: tier.label, sub: tier.sub, products: tier.products, rows: [] };
    for (const row of tier.rows) {
      tEntry.rows.push({ label: row.label, delta: row.delta });
      for (const p of ['tencent', 'aws']) {
        if (row.prices[p] == null) continue;
        const key = p;
        byProvider[key] = byProvider[key] || {
          provider: p, service: svc.id, region: book.region,
          regionDetail: book.regionDetail[p], currency: book.currency, unit: book.unit,
          retrieved: book.retrieved, sources: [{ url: null, note: SRC[p] }], skus: []
        };
        byProvider[key].skus.push({
          tier: tier.label,
          label: row.label,
          price: row.prices[p],
          confidence: 'verified'
        });
      }
    }
    sEntry.tiers.push(tEntry);
  }
  structure.services.push(sEntry);
  for (const [p, data] of Object.entries(byProvider)) {
    const dir = path.join(root, 'data/prices', p);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, svc.id + '.json'), JSON.stringify(data, null, 2) + '\n');
    files++;
  }
}

fs.writeFileSync(
  path.join(root, 'data/structure.js'),
  `/* Service/tier/scenario layout — editorial, no prices. Prices come from data/prices/**\n * via tools/build-pricebook.js. */\n` +
  `var CA_STRUCTURE = window.CA_STRUCTURE = ${JSON.stringify(structure, null, 2)};\n`
);
console.log('services:', structure.services.length, 'price files written:', files);
