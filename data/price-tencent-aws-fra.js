/*
 * Price comparison dataset — Tencent Cloud vs AWS, Frankfurt.
 * Source: "Cloud prices - Tencent vs AWS.pptx" (October 2026).
 * All prices: list prices, USD per month, no negotiated discounts.
 * d = Tencent vs AWS delta in % as published (negative = Tencent cheaper).
 */
(window.CA_DATA = window.CA_DATA || {}).price = (window.CA_DATA.price || []).concat([{
  id: 'tencent-aws-fra',
  label: 'Tencent Cloud vs AWS · Frankfurt',
  providers: { a: 'Tencent Cloud', b: 'AWS' },
  region: { a: 'Frankfurt (regionId 17)', b: 'eu-central-1' },
  currency: 'USD',
  unit: 'per month',
  retrieved: '2 Oct 2026',
  published: 'October 2026',
  basis: 'List prices, like-for-like scenarios, no negotiated discounts',
  sources: [
    'Tencent: Tencent Cloud International, Frankfurt (regionId 17)',
    'AWS: AWS Price List API, eu-central-1',
    'Retrieved 2 Oct 2026 · list prices, no negotiated discounts'
  ],

  summary: {
    kpis: [
      { value: '17 of 17', label: 'services cheaper on Tencent', sub: 'median comparison at least 5% below AWS list price' },
      { value: '−52%', label: 'compute, pay-as-you-go', sub: 'CVM vs EC2 on-demand, no commitment, 3 families' },
      { value: '−75%', label: 'largest single lever', sub: 'Logs · CLS at every volume tested' }
    ],
    takeaway: 'Lead with compute, databases, logging, object storage and live streaming. Expect pushback on small Grafana estates, block volumes above ~4 TiB and firewalls at 300 Mbps+, where AWS can be cheaper at list price.',
    note: 'Each bar spans every scenario on the service page (sizes, volumes, billing modes); the dot marks the median. Bars beyond ±80% are clipped.'
  },

  services: [
    { id: 'cvm', cat: 'Compute & data', name: 'Compute · CVM', vs: 'SA5 / S8 / SA4 vs c7a / c7i', median: -59, page: null, pending: 'Detail in the separate compute deck — not imported yet' },
    { id: 'mysql', cat: 'Compute & data', name: 'MySQL', vs: 'TencentDB vs RDS Multi-AZ', median: -29, page: 'mysql' },
    { id: 'redis', cat: 'Compute & data', name: 'Redis', vs: 'TencentDB vs ElastiCache Valkey', median: -29, page: 'redis' },
    { id: 'cbs', cat: 'Compute & data', name: 'Block storage · CBS', vs: 'vs EBS gp3, performance-matched', median: -21, page: 'storage' },
    { id: 'cos', cat: 'Compute & data', name: 'Object storage · COS', vs: 'vs S3 Standard', median: -52, page: 'storage' },
    { id: 'cdn', cat: 'Network & delivery', name: 'CDN · EdgeOne', vs: 'vs CloudFront, Europe tier', median: -26, page: 'cdn' },
    { id: 'clb', cat: 'Network & delivery', name: 'Load balancer · CLB', vs: 'vs Application Load Balancer', median: -24, page: 'network' },
    { id: 'nat', cat: 'Network & delivery', name: 'NAT Gateway', vs: 'vs AWS NAT Gateway', median: -30, page: 'network' },
    { id: 'vpn', cat: 'Network & delivery', name: 'VPN Gateway', vs: 'vs Site-to-Site VPN', median: -11, page: 'network' },
    { id: 'cfw', cat: 'Security & media', name: 'Cloud Firewall', vs: 'vs Network Firewall', median: -5, page: 'firewall' },
    { id: 'css', cat: 'Security & media', name: 'Live streaming · CSS', vs: 'vs MediaLive stack', median: -52, page: 'streaming' },
    { id: 'vod', cat: 'Security & media', name: 'Video on demand · VOD', vs: 'vs S3 + MediaConvert + CloudFront', median: -23, page: 'streaming' },
    { id: 'mps', cat: 'Security & media', name: 'Transcoding · MPS', vs: 'vs MediaConvert', median: -25, page: 'streaming' },
    { id: 'cls', cat: 'Observability', name: 'Logs · CLS', vs: 'vs CloudWatch Logs', median: -75, page: 'observability' },
    { id: 'tcmg', cat: 'Observability', name: 'Grafana · TCMG', vs: 'vs Amazon Managed Grafana', median: -31, page: 'observability' },
    { id: 'rum', cat: 'Observability', name: 'Real user monitoring · RUM', vs: 'vs CloudWatch RUM', median: -20, page: 'observability' },
    { id: 'eb', cat: 'Observability', name: 'EventBridge', vs: 'vs Amazon EventBridge', median: -17, page: 'observability' }
  ],

  pages: [
    {
      id: 'mysql', tab: 'MySQL',
      title: 'TencentDB for MySQL vs Amazon RDS for MySQL',
      sub: 'Frankfurt · Multi-AZ both sides · instance only · list prices, USD per month',
      stats: {
        median: { d: -29, n: 12 },
        best: { d: -32, label: '4 vCPU / 16 GB · PAYG avg T2/T3 $0.55/h' },
        saving: { value: '$16.7k', label: '32 vCPU / 128 GB · Monthly prepaid vs on-demand' }
      },
      groups: [
        { svc: 'mysql', title: '4 vCPU / 16 GB', sub: 'Two-node HA (primary + standby, multi-AZ)', a: 'MySQL General · 4C16G', b: 'db.m6i.xlarge · Multi-AZ', rows: [
          { s: 'PAYG avg T2/T3 $0.55/h', a: 401.50, b: 592.76, d: -32 },
          { s: 'Monthly prepaid vs on-demand', a: 418.82, b: 592.76, d: -29 },
          { s: '1-year prepaid vs 1-yr RI', a: 347.62, b: 395.00, d: -12 } ] },
        { svc: 'mysql', title: '8 vCPU / 32 GB', sub: 'Two-node HA (primary + standby, multi-AZ)', a: 'MySQL General · 8C32G', b: 'db.m6i.2xlarge · Multi-AZ', rows: [
          { s: 'PAYG avg T2/T3 $1.10/h', a: 803.00, b: 1186, d: -32 },
          { s: 'Monthly prepaid vs on-demand', a: 837.65, b: 1186, d: -29 },
          { s: '1-year prepaid vs 1-yr RI', a: 695.25, b: 790.00, d: -12 } ] },
        { svc: 'mysql', title: '16 vCPU / 64 GB', sub: 'Two-node HA (primary + standby, multi-AZ)', a: 'MySQL General · 16C64G', b: 'db.m6i.4xlarge · Multi-AZ', rows: [
          { s: 'PAYG avg T2/T3 $2.20/h', a: 1606, b: 2371, d: -32 },
          { s: 'Monthly prepaid vs on-demand', a: 1675, b: 2371, d: -29 },
          { s: '1-year prepaid vs 1-yr RI', a: 1390, b: 1580, d: -12 } ] },
        { svc: 'mysql', title: '32 vCPU / 128 GB', sub: 'Two-node HA (primary + standby, multi-AZ)', a: 'MySQL General · 32C128G', b: 'db.m6i.8xlarge · Multi-AZ', rows: [
          { s: 'PAYG avg T2/T3 $5.43/h *', a: 3960, b: 4742, d: -16 },
          { s: 'Monthly prepaid vs on-demand', a: 3351, b: 4742, d: -29 },
          { s: '1-year prepaid vs 1-yr RI', a: 2781, b: 3160, d: -12 } ] }
      ],
      takeaway: 'Tencent tiered pay-as-you-go undercuts RDS on-demand by ~32% and is cheaper than Tencent\'s own monthly prepay; a 1-year term stays 12% below a 1-year RDS RI.',
      notes: [
        'PAYG tiers (Tencent doc 236/18335): T1 0–96 h, T2 96–360 h, T3 > 360 h of use. Row 1 averages T2 and T3 — the rate a production database runs at for most of the month.',
        'AWS rows: RDS MySQL Multi-AZ on-demand × 730 h; 1-year = All-Upfront RI ÷ 12. Storage, backup, I/O and traffic excluded on both sides.',
        '* 32C128G: Tencent publishes hourly rates ~32% above the pattern of the other sizes (monthly and annual scale normally) — confirm in console.'
      ],
      source: 'Tencent Cloud International MySQL price page, Frankfurt (regionId 17), 2 Oct 2026 · AWS Price List API, AmazonRDS, eu-central-1.'
    },
    {
      id: 'redis', tab: 'Redis',
      title: 'TencentDB for Redis vs Amazon ElastiCache',
      sub: 'Frankfurt · primary + 1 replica both sides · list prices, USD per month',
      stats: {
        median: { d: -29, n: 12 },
        best: { d: -44, label: '8 GB · master + replica · Monthly prepaid vs on-demand' },
        saving: { value: '$12.1k', label: '64 GB · master + replica · Monthly prepaid vs on-demand' }
      },
      groups: [
        { svc: 'redis', title: '8 GB · master + replica', sub: 'Standard architecture, 2 nodes, in-memory', a: 'Redis Standard · 8 GB', b: '2 × cache.r6g.large · Valkey', rows: [
          { s: 'PAYG avg T2/T3 $0.282/h', a: 205.90, b: 288.50, d: -29 },
          { s: 'Monthly prepaid vs on-demand', a: 162.47, b: 288.50, d: -44 },
          { s: '1-year prepaid vs 1-yr reserved', a: 134.85, b: 183.87, d: -27 } ] },
        { svc: 'redis', title: '16 GB · master + replica', sub: 'Standard architecture, 2 nodes, in-memory', a: 'Redis Standard · 16 GB', b: '2 × cache.r6g.xlarge · Valkey', rows: [
          { s: 'PAYG avg T2/T3 $0.564/h', a: 411.80, b: 576.99, d: -29 },
          { s: 'Monthly prepaid vs on-demand', a: 324.93, b: 576.99, d: -44 },
          { s: '1-year prepaid vs 1-yr reserved', a: 269.70, b: 367.60, d: -27 } ] },
        { svc: 'redis', title: '32 GB · master + replica', sub: 'Standard architecture, 2 nodes, in-memory', a: 'Redis Standard · 32 GB', b: '2 × cache.r6g.2xlarge · Valkey', rows: [
          { s: 'PAYG avg T2/T3 $1.128/h', a: 823.60, b: 1154, d: -29 },
          { s: 'Monthly prepaid vs on-demand', a: 649.87, b: 1154, d: -44 },
          { s: '1-year prepaid vs 1-yr reserved', a: 539.39, b: 735.20, d: -27 } ] },
        { svc: 'redis', title: '64 GB · master + replica', sub: 'Standard architecture, 2 nodes, in-memory', a: 'Redis Standard · 64 GB', b: '2 × cache.r6g.4xlarge · Valkey', rows: [
          { s: 'PAYG avg T2/T3 $2.256/h', a: 1647, b: 2308, d: -29 },
          { s: 'Monthly prepaid vs on-demand', a: 1300, b: 2308, d: -44 },
          { s: '1-year prepaid vs 1-yr reserved', a: 1079, b: 1470, d: -27 } ] }
      ],
      takeaway: 'Against AWS\'s cheapest option — Valkey on Graviton — Tencent Redis is ~29% lower on pay-as-you-go, ~44% lower on monthly prepay and ~27% lower on a 1-year term.',
      notes: [
        'AWS side uses the cheapest ElastiCache engine and node: Valkey on Graviton r6g (Redis OSS on x86 r5 is 25–30% more). AWS nodes are the smallest that fit, so they carry 1.6× the memory.',
        'Tencent tiered PAYG (doc 239/31954): T1 = monthly ÷ 720 × 2, T2 × 1.5, T3 × 1. Row 1 averages T2 and T3. AWS 1-year = All-Upfront reserved node ÷ 12.'
      ],
      source: 'Tencent Cloud International Redis calculator, region eu-frankfurt, 2 Oct 2026 · AWS Price List API, AmazonElastiCache, eu-central-1.'
    },
    {
      id: 'cdn', tab: 'CDN',
      title: 'EdgeOne vs Amazon CloudFront',
      sub: 'CDN and edge delivery · Europe tier · example monthly volumes · list prices, USD per month',
      stats: {
        median: { d: -26, n: 12 },
        best: { d: -35, label: '50 TB delivered / month · 1-year traffic pack vs PAYG' },
        saving: { value: '$101.4k', label: '500 TB delivered / month · Traffic + requests · PAYG' }
      },
      groups: [
        { svc: 'cdn', title: '10 TB delivered / month', sub: 'Europe delivery tier · HTTPS', a: 'EdgeOne · EU traffic tiers', b: 'CloudFront · Europe tiers', rows: [
          { s: 'Traffic only · PAYG', a: 658.40, b: 850.00, d: -23 },
          { s: 'Traffic + requests · PAYG *', a: 835.90, b: 1138, d: -27 },
          { s: '1-year traffic pack vs PAYG *', a: 609.18, b: 850.00, d: -28 } ] },
        { svc: 'cdn', title: '50 TB delivered / month', sub: 'Europe delivery tier · HTTPS', a: 'EdgeOne · EU traffic tiers', b: 'CloudFront · Europe tiers', rows: [
          { s: 'Traffic only · PAYG', a: 2898, b: 4051, d: -28 },
          { s: 'Traffic + requests · PAYG *', a: 3786, b: 5539, d: -32 },
          { s: '1-year traffic pack vs PAYG *', a: 2646, b: 4051, d: -35 } ] },
        { svc: 'cdn', title: '100 TB delivered / month', sub: 'Europe delivery tier · HTTPS', a: 'EdgeOne · EU traffic tiers', b: 'CloudFront · Europe tiers', rows: [
          { s: 'Traffic only · PAYG', a: 5328, b: 7075, d: -25 },
          { s: 'Traffic + requests · PAYG *', a: 7103, b: 10063, d: -29 },
          { s: '1-year traffic pack vs PAYG *', a: 5278, b: 7075, d: -25 } ] },
        { svc: 'cdn', title: '500 TB delivered / month', sub: 'Europe delivery tier · HTTPS', a: 'EdgeOne · EU traffic tiers', b: 'CloudFront · Europe tiers', rows: [
          { s: 'Traffic only · PAYG', a: 21808, b: 24147, d: -10 },
          { s: 'Traffic + requests · PAYG *', a: 30683, b: 39135, d: -22 },
          { s: '1-year traffic pack vs PAYG *', a: 26292, b: 24147, d: 9 } ] }
      ],
      takeaway: 'EdgeOne is 10–35% below CloudFront pay-as-you-go across 10–500 TB; the gap widens once requests are counted.',
      notes: [
        '* Requests modelled at a 40 KB average object (25M requests per TB): EdgeOne $0.0071 / 10k; CloudFront HTTPS $0.0120 / 10k after 10M free. Row 3: AWS publishes no 1-year rate, so AWS PAYG is repeated.',
        'Check against CloudFront flat-rate plans (from $15/mo, 50 TB included, global) before quoting — they can undercut both PAYG rows.',
        'Excluded: TLS, WAF/bot, origin shield, origin fetch.'
      ],
      source: 'Tencent EdgeOne international docs (edgeone.ai 55643, 55642, 56208) · AWS Price List API, AmazonCloudFront, and CloudFront plan docs.'
    },
    {
      id: 'storage', tab: 'Storage',
      title: 'Block and object storage · CBS and COS vs EBS and S3',
      sub: 'Frankfurt · block storage matched on performance, not just capacity · list prices, USD per month',
      stats: {
        median: { d: -36, n: 12 },
        best: { d: -55, label: 'Object · 500 TB stored · 1-year capacity pack' },
        saving: { value: '$79.2k', label: 'Object · 500 TB stored · 1-year capacity pack' }
      },
      groups: [
        { svc: 'cbs', title: 'Block · CBS Balanced SSD', sub: '10k IOPS / 190 MB/s included in Tencent price', a: 'CBS Balanced SSD · Frankfurt', b: 'EBS gp3 · 10k IOPS · 190 MB/s', rows: [
          { s: '1 TiB · PAYG', a: 112.13, b: 142.58, d: -21 },
          { s: '1 TiB · monthly subscription', a: 112.64, b: 142.58, d: -21 },
          { s: '4 TiB · monthly subscription', a: 450.56, b: 435.03, d: 4 } ] },
        { svc: 'cbs', title: 'Block · CBS Enhanced SSD', sub: '50k IOPS / 350 MB/s included in Tencent price', a: 'CBS Enhanced SSD · Frankfurt', b: 'EBS gp3 · 50k IOPS · 350 MB/s', rows: [
          { s: '1 TiB · PAYG', a: 224.26, b: 390.19, d: -43 },
          { s: '1 TiB · monthly subscription', a: 225.28, b: 390.19, d: -42 },
          { s: '4 TiB · monthly subscription', a: 901.12, b: 682.65, d: 32 } ] },
        { svc: 'cos', title: 'Object · 50 TB stored', sub: 'Standard class · capacity only', a: 'COS STANDARD · Frankfurt', b: 'S3 Standard · eu-central-1', rows: [
          { s: 'PAYG', a: 870.40, b: 1254, d: -31 },
          { s: '1-month capacity pack *', a: 609.28, b: 1254, d: -51 },
          { s: '1-year capacity pack *', a: 574.46, b: 1254, d: -54 } ] },
        { svc: 'cos', title: 'Object · 500 TB stored', sub: 'Standard class · capacity only', a: 'COS STANDARD · Frankfurt', b: 'S3 Standard · eu-central-1', rows: [
          { s: 'PAYG', a: 8704, b: 12083, d: -28 },
          { s: '1-month capacity pack *', a: 5745, b: 12083, d: -52 },
          { s: '1-year capacity pack *', a: 5484, b: 12083, d: -55 } ] }
      ],
      takeaway: 'Matched on IOPS and throughput, CBS is 21–42% cheaper at 1 TiB; above ~4 TiB gp3 wins because Tencent performance caps early. COS is 28–55% below S3.',
      notes: [
        'Block: Tencent includes performance by formula (doc 362/31636): Balanced min{1800 + 15·GiB, 10,000} IOPS, Enhanced min{1800 + 50·GiB, 50,000}. AWS gp3 priced at the same IOPS/throughput: $0.0952/GB + $0.006/IOPS > 3k + $0.0476/MBps > 125.',
        '* AWS sells no monthly or annual storage term, so AWS pay-as-you-go is repeated. COS Standard is single-AZ (multi-AZ COS is not offered in Frankfurt); S3 Standard is multi-AZ.',
        'Excluded: requests, retrieval, egress, snapshots. 1 TB = 1,024 GiB both sides.'
      ],
      source: 'Tencent Cloud International CBS and COS price pages, Frankfurt, 2 Oct 2026 · AWS Price List API (AmazonEC2 EBS, AmazonS3), eu-central-1.'
    },
    {
      id: 'network', tab: 'Network',
      title: 'Network services · CLB, NAT Gateway and VPN vs AWS',
      sub: 'Frankfurt · one representative profile per service · list prices, USD per month',
      stats: {
        median: { d: -22, n: 9 },
        best: { d: -30, label: 'NAT gateway · 10 TB · official-site price' },
        saving: { value: '$9.6k', label: 'NAT gateway · 50 TB · official-site price' }
      },
      groups: [
        { svc: 'clb', title: 'Load balancer · L profile', sub: '500 new conn/s · 100k active · 20 GB/h', a: 'CLB · LCU-billed instance', b: 'Application Load Balancer', rows: [
          { s: 'PAYG · list LCU rate', a: 193.96, b: 214.38, d: -10 },
          { s: 'PAYG · official-site LCU rate *', a: 162.33, b: 214.38, d: -24 },
          { s: '1-year LCU resource pack *', a: 152.66, b: 214.38, d: -29 } ] },
        { svc: 'nat', title: 'NAT gateway', sub: '1 gateway · 730 h · traffic processed', a: 'NAT Gateway Standard', b: 'NAT Gateway (public)', rows: [
          { s: '10 TB · list price', a: 471.71, b: 570.44, d: -17 },
          { s: '10 TB · official-site price', a: 400.95, b: 570.44, d: -30 },
          { s: '50 TB · official-site price', a: 1898, b: 2700, d: -30 } ] },
        { svc: 'vpn', title: 'Site-to-site VPN', sub: 'IPsec · egress included both sides', a: 'VPN Gateway 100 Mbps', b: 'Site-to-Site VPN connection', rows: [
          { s: '1 site · 100 Mbps · 1 TB out', a: 143.09, b: 128.66, d: 11 },
          { s: '1 site · 100 Mbps · 10 TB out', a: 852.72, b: 958.10, d: -11 },
          { s: '5 sites · HA pair · 2 TB out *', a: 286.18, b: 366.82, d: -22 } ] }
      ],
      takeaway: 'Load balancing and NAT run 10–30% below AWS. VPN wins once traffic or site count grows, because Tencent tunnels are free and egress is $0.077/GB vs $0.09.',
      notes: [
        'CLB: LCU = max(25 new conn/s, 3,000 active conn, 1 GB/h); 10 rules. Tencent $0.0257/h + $0.0072/LCU-h list, AWS $0.027/h + $0.008/LCU-h. * Official-site rate and 1-year pack are Tencent-only; AWS has no term.',
        'NAT: Tencent $0.043/h + $0.043/CU-h list (official-site price 15% lower), AWS $0.052/h + $0.052/GB. Internet egress excluded.',
        'VPN: Tencent 100 Mbps gateway $0.088/h, tunnels free, egress $0.077/GB; AWS $0.05/connection-h + tiered egress. * HA pair = 2 Tencent gateways to match 2 AWS tunnels. Above 100 Mbps the Tencent gateway steps to $0.62/h.'
      ],
      source: 'Tencent CLB (214/8846), NAT (1015/30248), VPN (1037/32685) billing docs, Frankfurt · AWS Price List API (AWSELB, AmazonEC2, AmazonVPC, AWSDataTransfer), eu-central-1.'
    },
    {
      id: 'firewall', tab: 'Firewall',
      title: 'Cloud Firewall vs AWS Network Firewall',
      sub: 'Frankfurt · single-VPC internet edge, 2 AZs · both traffic directions counted · list prices, USD per month',
      stats: {
        median: { d: -5, n: 9 },
        best: { d: -54, label: 'Premium · 20 Mbps · 1-year subscription' },
        saving: { value: '$5.1k', label: 'Premium · 20 Mbps · 1-year subscription' }
      },
      groups: [
        { svc: 'cfw', title: 'Premium · 20 Mbps', sub: '20 Mbps each direction · 10 public IPs', a: 'CFW Premium edition', b: 'Network Firewall · 2 AZ + logging', rows: [
          { s: 'Monthly subscription *', a: 420.00, b: 778.91, d: -46 },
          { s: '1-year subscription', a: 357.00, b: 778.91, d: -54 },
          { s: '1-year · one-way traffic (AWS low case) *', a: 357.00, b: 716.35, d: -50 } ] },
        { svc: 'cfw', title: 'Enterprise · 100 Mbps', sub: '100 Mbps each direction · 50 public IPs', a: 'CFW Enterprise edition', b: 'Network Firewall · 2 AZ + logging', rows: [
          { s: 'Monthly subscription', a: 1450, b: 1530, d: -5 },
          { s: '1-year subscription', a: 1232, b: 1530, d: -19 },
          { s: '1-year · one-way traffic (AWS low case) *', a: 1232, b: 1217, d: 1 } ] },
        { svc: 'cfw', title: 'Ultimate · 300 Mbps', sub: '300 Mbps each direction · 200 public IPs', a: 'CFW Ultimate edition', b: 'Network Firewall · 2 AZ + logging', rows: [
          { s: 'Monthly subscription', a: 3900, b: 3406, d: 14 },
          { s: '1-year subscription', a: 3315, b: 3406, d: -3 },
          { s: '1-year · one-way traffic (AWS low case) *', a: 3315, b: 2468, d: 34 } ] }
      ],
      takeaway: 'Cloud Firewall is 46–54% cheaper at 20 Mbps and 5–19% cheaper at 100 Mbps; at 300 Mbps it is level on a 1-year term. A flat subscription beats per-GB billing as traffic grows.',
      notes: [
        'Tencent bandwidth is per direction (doc 1160/49825); AWS bills every GB processed either way. Base case: busier direction averages 30% of peak, return traffic half of that. Row 3 drops return traffic — the AWS-friendliest case.',
        'AWS: $0.395 per endpoint-hour × 2 AZs + $0.065/GB + $14.54 log delivery to S3 (parity with the 50 GB / 7-day logs every Tencent edition includes). TLS inspection and active threat defense not added.',
        '* Premium\'s shortest published term is 6 months; monthly renewal is described in the purchase guide. Tencent 1-year = 15% off (2-year 30%, 3-year 50%, non-refundable — not shown).'
      ],
      source: 'Tencent Cloud Firewall purchase guide and docs 1160/56237, 1160/49825, 1160/56242 · AWS Price List API (AWSNetworkFirewall, AmazonCloudWatch, AmazonS3), eu-central-1.'
    },
    {
      id: 'streaming', tab: 'Streaming',
      title: 'Streaming services · CSS, VOD and MPS vs AWS Elemental',
      sub: 'Frankfurt / Europe billing region · concrete monthly workloads · list prices, USD per month',
      stats: {
        median: { d: -25, n: 9 },
        best: { d: -53, label: 'Live streaming · 1 channel · 60 h · 5 TB' },
        saving: { value: '$207.3k', label: 'Live streaming · 10 channels · 2,000 h · 300 TB' }
      },
      groups: [
        { svc: 'css', title: 'Live streaming', sub: 'HD 720p · live hours · delivered TB', a: 'CSS · LVB + live transcoding', b: 'MediaLive + MediaPackage + CloudFront', rows: [
          { s: '1 channel · 60 h · 5 TB', a: 378.02, b: 809.96, d: -53 },
          { s: '3 channels · 300 h · 30 TB', a: 2248, b: 4676, d: -52 },
          { s: '10 channels · 2,000 h · 300 TB', a: 19704, b: 36979, d: -47 } ] },
        { svc: 'vod', title: 'Video on demand', sub: 'stored TB · transcode min · delivered TB', a: 'VOD · storage + transcode + delivery', b: 'S3 + MediaConvert + CloudFront', rows: [
          { s: '5 TB · 10k min · 5 TB out', a: 553.50, b: 717.50, d: -23 },
          { s: '50 TB · 100k min · 50 TB out', a: 5130, b: 6726, d: -24 },
          { s: '500 TB · 1M min · 500 TB out', a: 44800, b: 46498, d: -4 } ] },
        { svc: 'mps', title: 'Transcoding', sub: 'H.264 HD 720p output minutes', a: 'MPS · general transcoding', b: 'MediaConvert Basic · AVC', rows: [
          { s: '10,000 min HD', a: 109.00, b: 170.00, d: -36 },
          { s: '100,000 min HD', a: 1090, b: 1450, d: -25 },
          { s: '1,000,000 min HD', a: 10900, b: 10550, d: 3 } ] }
      ],
      takeaway: 'Live streaming costs about half of the AWS stack; VOD is 4–24% lower; MPS transcoding is cheaper until ~1M minutes a month, where AWS volume tiers catch up.',
      notes: [
        'AWS has no single CSS equivalent: live = MediaLive (standard pipeline) + MediaPackage + CloudFront; VOD = S3 + MediaConvert + CloudFront. MPS vs MediaConvert is the cleanest like-for-like.',
        'Tencent CSS and VOD bill delivery at a daily flat tier; Tencent publishes no volume tiers on transcoding. List prices, no prepaid packages, CloudFront free tier not applied.'
      ],
      source: 'Tencent docs CSS 267/2818, 267/39604 · VOD 266/14666 · MPS price page (Frankfurt column) · AWS Price List API (MediaLive, MediaConvert, MediaPackage, CloudFront, S3), eu-central-1.'
    },
    {
      id: 'observability', tab: 'Observability',
      title: 'Observability and integration vs AWS',
      sub: 'CLS · TCMG · RUM · EventBridge · Frankfurt · list prices, USD per month',
      stats: {
        median: { d: -20, n: 12 },
        best: { d: -75, label: 'Logs · CLS · 10 TB ingested / month' },
        saving: { value: '$292.8k', label: 'Logs · CLS · 50 TB ingested / month' }
      },
      groups: [
        { svc: 'cls', title: 'Logs · CLS', sub: '30-day retention · full-text index', a: 'Cloud Log Service · Standard', b: 'CloudWatch Logs · Standard', rows: [
          { s: '1 TB ingested / month', a: 163.72, b: 651.76, d: -75 },
          { s: '10 TB ingested / month', a: 1637, b: 6518, d: -75 },
          { s: '50 TB ingested / month', a: 8186, b: 32588, d: -75 } ] },
        { svc: 'tcmg', title: 'Dashboards · TCMG', sub: 'editors + viewers per month', a: 'Managed Grafana · by edition', b: 'Managed Grafana · per user', rows: [
          { s: '10 users · Basic edition', a: 109.00, b: 58.00, d: 88 },
          { s: '50 users · Advanced edition', a: 199.00, b: 290.00, d: -31 },
          { s: '100 users · Pro edition *', a: 299.00, b: 580.00, d: -48 } ] },
        { svc: 'rum', title: 'Real users · RUM', sub: 'web front-end monitoring', a: 'Real User Monitoring · PAYG', b: 'CloudWatch RUM · events', rows: [
          { s: '1M events / month *', a: 8.00, b: 10.00, d: -20 },
          { s: '10M events / month *', a: 80.00, b: 100.00, d: -20 },
          { s: '100M events / month *', a: 800.00, b: 1000, d: -20 } ] },
        { svc: 'eb', title: 'Events · EventBridge', sub: 'custom events on an event bus', a: 'EventBridge · custom bus', b: 'Amazon EventBridge · custom', rows: [
          { s: '10M events / month', a: 8.32, b: 10.00, d: -17 },
          { s: '100M events / month', a: 83.20, b: 100.00, d: -17 },
          { s: '1B events / month', a: 832.00, b: 1000, d: -17 } ] }
      ],
      takeaway: 'Logging is the big lever — CLS is 75% below CloudWatch Logs at every volume. RUM is 20% and EventBridge 17% cheaper; Grafana wins from ~50 users.',
      notes: [
        'CLS: $0.032/GB written (compressed), $0.066/GB index traffic, $0.00243/GB-day storage; CloudWatch $0.63/GB ingested + $0.0324/GB-month; 1:5 compression both sides.',
        'TCMG: $109 / $199 / $299 for ≤20 / ≤50 / ≤100 users vs AWS $9 editor, $5 viewer. * TCMG Frankfurt availability not confirmed.',
        '* RUM: Tencent $0.08 per 10k reports vs AWS $1 per 100k events, matched 1:1 per record. Tencent RUM reports into Singapore (no EU region) — check data residency. Tencent also gives 500k free reports a day; not applied.',
        'EventBridge: Tencent $0.832 per million custom events (lower above 1B) vs AWS $1.00 per million, both per 64 KB; no free tier either side.'
      ],
      source: 'Tencent CLS price page (Frankfurt) and docs 614/37509, 1124/49506, 248/83625, 248/64871 · AWS Price List API (AmazonCloudWatch, AmazonGrafana, AWSEvents), eu-central-1.'
    }
  ]
}]);
