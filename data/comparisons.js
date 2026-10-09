/*
 * Comparisons — pair-specific editorial content (summaries, pages, takeaways).
 * Prices come from CA_DATA.pricebooks (referenced by 'book'); this file adds
 * the curated per-page content and summary medians.
 */
var CA_DATA = window.CA_DATA = window.CA_DATA || {};
CA_DATA.comparisons = [{
  id: "tencent-aws-fra",
  pair: [
    "tencent",
    "aws"
  ],
  book: "fra",
  basis: "List prices, like-for-like scenarios, no negotiated discounts",
  published: "October 2026",
  sources: [
    "Tencent: Tencent Cloud International, Frankfurt (regionId 17)",
    "AWS: AWS Price List API, eu-central-1",
    "Retrieved 2 Oct 2026 · list prices, no negotiated discounts"
  ],
  summary: {
    kpis: [
      {
        value: "17 of 17",
        label: "services cheaper on Tencent",
        sub: "median comparison at least 5% below AWS list price"
      },
      {
        value: "−52%",
        label: "compute, pay-as-you-go",
        sub: "CVM vs EC2 on-demand, no commitment, 3 families"
      },
      {
        value: "−75%",
        label: "largest single lever",
        sub: "Logs · CLS at every volume tested"
      }
    ],
    takeaway: "Lead with compute, databases, logging, object storage and live streaming. Expect pushback on small Grafana estates, block volumes above ~4 TiB and firewalls at 300 Mbps+, where AWS can be cheaper at list price.",
    note: "Each bar spans every scenario on the service page (sizes, volumes, billing modes); the dot marks the median. Bars beyond ±80% are clipped."
  },
  services: [
    {
      id: "cvm",
      cat: "Compute & data",
      name: "Compute · CVM",
      vs: "SA5 / S8 / SA4 vs c7a / c7i",
      median: -59,
      page: null,
      pending: "Detail in the separate compute deck — not imported yet"
    },
    {
      id: "mysql",
      cat: "Compute & data",
      name: "MySQL",
      vs: "TencentDB vs RDS Multi-AZ",
      median: -29,
      page: "mysql",
      pending: null
    },
    {
      id: "redis",
      cat: "Compute & data",
      name: "Redis",
      vs: "TencentDB vs ElastiCache Valkey",
      median: -29,
      page: "redis",
      pending: null
    },
    {
      id: "cbs",
      cat: "Compute & data",
      name: "Block storage · CBS",
      vs: "vs EBS gp3, performance-matched",
      median: -21,
      page: "storage",
      pending: null
    },
    {
      id: "cos",
      cat: "Compute & data",
      name: "Object storage · COS",
      vs: "vs S3 Standard",
      median: -52,
      page: "storage",
      pending: null
    },
    {
      id: "cdn",
      cat: "Network & delivery",
      name: "CDN · EdgeOne",
      vs: "vs CloudFront, Europe tier",
      median: -26,
      page: "cdn",
      pending: null
    },
    {
      id: "clb",
      cat: "Network & delivery",
      name: "Load balancer · CLB",
      vs: "vs Application Load Balancer",
      median: -24,
      page: "network",
      pending: null
    },
    {
      id: "nat",
      cat: "Network & delivery",
      name: "NAT Gateway",
      vs: "vs AWS NAT Gateway",
      median: -30,
      page: "network",
      pending: null
    },
    {
      id: "vpn",
      cat: "Network & delivery",
      name: "VPN Gateway",
      vs: "vs Site-to-Site VPN",
      median: -11,
      page: "network",
      pending: null
    },
    {
      id: "cfw",
      cat: "Security & media",
      name: "Cloud Firewall",
      vs: "vs Network Firewall",
      median: -5,
      page: "firewall",
      pending: null
    },
    {
      id: "css",
      cat: "Security & media",
      name: "Live streaming · CSS",
      vs: "vs MediaLive stack",
      median: -52,
      page: "streaming",
      pending: null
    },
    {
      id: "vod",
      cat: "Security & media",
      name: "Video on demand · VOD",
      vs: "vs S3 + MediaConvert + CloudFront",
      median: -23,
      page: "streaming",
      pending: null
    },
    {
      id: "mps",
      cat: "Security & media",
      name: "Transcoding · MPS",
      vs: "vs MediaConvert",
      median: -25,
      page: "streaming",
      pending: null
    },
    {
      id: "cls",
      cat: "Observability",
      name: "Logs · CLS",
      vs: "vs CloudWatch Logs",
      median: -75,
      page: "observability",
      pending: null
    },
    {
      id: "tcmg",
      cat: "Observability",
      name: "Grafana · TCMG",
      vs: "vs Amazon Managed Grafana",
      median: -31,
      page: "observability",
      pending: null
    },
    {
      id: "rum",
      cat: "Observability",
      name: "Real user monitoring · RUM",
      vs: "vs CloudWatch RUM",
      median: -20,
      page: "observability",
      pending: null
    },
    {
      id: "eb",
      cat: "Observability",
      name: "EventBridge",
      vs: "vs Amazon EventBridge",
      median: -17,
      page: "observability",
      pending: null
    }
  ],
  pages: [
    {
      id: "mysql",
      tab: "MySQL",
      title: "TencentDB for MySQL vs Amazon RDS for MySQL",
      sub: "Frankfurt · Multi-AZ both sides · instance only · list prices, USD per month",
      stats: {
        median: {
          d: -29,
          n: 12
        },
        best: {
          d: -32,
          label: "4 vCPU / 16 GB · PAYG avg T2/T3 $0.55/h"
        },
        saving: {
          value: "$16.7k",
          label: "32 vCPU / 128 GB · Monthly prepaid vs on-demand"
        }
      },
      serviceIds: [
        "mysql"
      ],
      takeaway: "Tencent tiered pay-as-you-go undercuts RDS on-demand by ~32% and is cheaper than Tencent's own monthly prepay; a 1-year term stays 12% below a 1-year RDS RI.",
      notes: [
        "PAYG tiers (Tencent doc 236/18335): T1 0–96 h, T2 96–360 h, T3 > 360 h of use. Row 1 averages T2 and T3 — the rate a production database runs at for most of the month.",
        "AWS rows: RDS MySQL Multi-AZ on-demand × 730 h; 1-year = All-Upfront RI ÷ 12. Storage, backup, I/O and traffic excluded on both sides.",
        "* 32C128G: Tencent publishes hourly rates ~32% above the pattern of the other sizes (monthly and annual scale normally) — confirm in console."
      ],
      source: "Tencent Cloud International MySQL price page, Frankfurt (regionId 17), 2 Oct 2026 · AWS Price List API, AmazonRDS, eu-central-1."
    },
    {
      id: "redis",
      tab: "Redis",
      title: "TencentDB for Redis vs Amazon ElastiCache",
      sub: "Frankfurt · primary + 1 replica both sides · list prices, USD per month",
      stats: {
        median: {
          d: -29,
          n: 12
        },
        best: {
          d: -44,
          label: "8 GB · master + replica · Monthly prepaid vs on-demand"
        },
        saving: {
          value: "$12.1k",
          label: "64 GB · master + replica · Monthly prepaid vs on-demand"
        }
      },
      serviceIds: [
        "redis"
      ],
      takeaway: "Against AWS's cheapest option — Valkey on Graviton — Tencent Redis is ~29% lower on pay-as-you-go, ~44% lower on monthly prepay and ~27% lower on a 1-year term.",
      notes: [
        "AWS side uses the cheapest ElastiCache engine and node: Valkey on Graviton r6g (Redis OSS on x86 r5 is 25–30% more). AWS nodes are the smallest that fit, so they carry 1.6× the memory.",
        "Tencent tiered PAYG (doc 239/31954): T1 = monthly ÷ 720 × 2, T2 × 1.5, T3 × 1. Row 1 averages T2 and T3. AWS 1-year = All-Upfront reserved node ÷ 12."
      ],
      source: "Tencent Cloud International Redis calculator, region eu-frankfurt, 2 Oct 2026 · AWS Price List API, AmazonElastiCache, eu-central-1."
    },
    {
      id: "cdn",
      tab: "CDN",
      title: "EdgeOne vs Amazon CloudFront",
      sub: "CDN and edge delivery · Europe tier · example monthly volumes · list prices, USD per month",
      stats: {
        median: {
          d: -26,
          n: 12
        },
        best: {
          d: -35,
          label: "50 TB delivered / month · 1-year traffic pack vs PAYG"
        },
        saving: {
          value: "$101.4k",
          label: "500 TB delivered / month · Traffic + requests · PAYG"
        }
      },
      serviceIds: [
        "cdn"
      ],
      takeaway: "EdgeOne is 10–35% below CloudFront pay-as-you-go across 10–500 TB; the gap widens once requests are counted.",
      notes: [
        "* Requests modelled at a 40 KB average object (25M requests per TB): EdgeOne $0.0071 / 10k; CloudFront HTTPS $0.0120 / 10k after 10M free. Row 3: AWS publishes no 1-year rate, so AWS PAYG is repeated.",
        "Check against CloudFront flat-rate plans (from $15/mo, 50 TB included, global) before quoting — they can undercut both PAYG rows.",
        "Excluded: TLS, WAF/bot, origin shield, origin fetch."
      ],
      source: "Tencent EdgeOne international docs (edgeone.ai 55643, 55642, 56208) · AWS Price List API, AmazonCloudFront, and CloudFront plan docs."
    },
    {
      id: "storage",
      tab: "Storage",
      title: "Block and object storage · CBS and COS vs EBS and S3",
      sub: "Frankfurt · block storage matched on performance, not just capacity · list prices, USD per month",
      stats: {
        median: {
          d: -36,
          n: 12
        },
        best: {
          d: -55,
          label: "Object · 500 TB stored · 1-year capacity pack"
        },
        saving: {
          value: "$79.2k",
          label: "Object · 500 TB stored · 1-year capacity pack"
        }
      },
      serviceIds: [
        "cbs",
        "cos"
      ],
      takeaway: "Matched on IOPS and throughput, CBS is 21–42% cheaper at 1 TiB; above ~4 TiB gp3 wins because Tencent performance caps early. COS is 28–55% below S3.",
      notes: [
        "Block: Tencent includes performance by formula (doc 362/31636): Balanced min{1800 + 15·GiB, 10,000} IOPS, Enhanced min{1800 + 50·GiB, 50,000}. AWS gp3 priced at the same IOPS/throughput: $0.0952/GB + $0.006/IOPS > 3k + $0.0476/MBps > 125.",
        "* AWS sells no monthly or annual storage term, so AWS pay-as-you-go is repeated. COS Standard is single-AZ (multi-AZ COS is not offered in Frankfurt); S3 Standard is multi-AZ.",
        "Excluded: requests, retrieval, egress, snapshots. 1 TB = 1,024 GiB both sides."
      ],
      source: "Tencent Cloud International CBS and COS price pages, Frankfurt, 2 Oct 2026 · AWS Price List API (AmazonEC2 EBS, AmazonS3), eu-central-1."
    },
    {
      id: "network",
      tab: "Network",
      title: "Network services · CLB, NAT Gateway and VPN vs AWS",
      sub: "Frankfurt · one representative profile per service · list prices, USD per month",
      stats: {
        median: {
          d: -22,
          n: 9
        },
        best: {
          d: -30,
          label: "NAT gateway · 10 TB · official-site price"
        },
        saving: {
          value: "$9.6k",
          label: "NAT gateway · 50 TB · official-site price"
        }
      },
      serviceIds: [
        "clb",
        "nat",
        "vpn"
      ],
      takeaway: "Load balancing and NAT run 10–30% below AWS. VPN wins once traffic or site count grows, because Tencent tunnels are free and egress is $0.077/GB vs $0.09.",
      notes: [
        "CLB: LCU = max(25 new conn/s, 3,000 active conn, 1 GB/h); 10 rules. Tencent $0.0257/h + $0.0072/LCU-h list, AWS $0.027/h + $0.008/LCU-h. * Official-site rate and 1-year pack are Tencent-only; AWS has no term.",
        "NAT: Tencent $0.043/h + $0.043/CU-h list (official-site price 15% lower), AWS $0.052/h + $0.052/GB. Internet egress excluded.",
        "VPN: Tencent 100 Mbps gateway $0.088/h, tunnels free, egress $0.077/GB; AWS $0.05/connection-h + tiered egress. * HA pair = 2 Tencent gateways to match 2 AWS tunnels. Above 100 Mbps the Tencent gateway steps to $0.62/h."
      ],
      source: "Tencent CLB (214/8846), NAT (1015/30248), VPN (1037/32685) billing docs, Frankfurt · AWS Price List API (AWSELB, AmazonEC2, AmazonVPC, AWSDataTransfer), eu-central-1."
    },
    {
      id: "firewall",
      tab: "Firewall",
      title: "Cloud Firewall vs AWS Network Firewall",
      sub: "Frankfurt · single-VPC internet edge, 2 AZs · both traffic directions counted · list prices, USD per month",
      stats: {
        median: {
          d: -5,
          n: 9
        },
        best: {
          d: -54,
          label: "Premium · 20 Mbps · 1-year subscription"
        },
        saving: {
          value: "$5.1k",
          label: "Premium · 20 Mbps · 1-year subscription"
        }
      },
      serviceIds: [
        "cfw"
      ],
      takeaway: "Cloud Firewall is 46–54% cheaper at 20 Mbps and 5–19% cheaper at 100 Mbps; at 300 Mbps it is level on a 1-year term. A flat subscription beats per-GB billing as traffic grows.",
      notes: [
        "Tencent bandwidth is per direction (doc 1160/49825); AWS bills every GB processed either way. Base case: busier direction averages 30% of peak, return traffic half of that. Row 3 drops return traffic — the AWS-friendliest case.",
        "AWS: $0.395 per endpoint-hour × 2 AZs + $0.065/GB + $14.54 log delivery to S3 (parity with the 50 GB / 7-day logs every Tencent edition includes). TLS inspection and active threat defense not added.",
        "* Premium's shortest published term is 6 months; monthly renewal is described in the purchase guide. Tencent 1-year = 15% off (2-year 30%, 3-year 50%, non-refundable — not shown)."
      ],
      source: "Tencent Cloud Firewall purchase guide and docs 1160/56237, 1160/49825, 1160/56242 · AWS Price List API (AWSNetworkFirewall, AmazonCloudWatch, AmazonS3), eu-central-1."
    },
    {
      id: "streaming",
      tab: "Streaming",
      title: "Streaming services · CSS, VOD and MPS vs AWS Elemental",
      sub: "Frankfurt / Europe billing region · concrete monthly workloads · list prices, USD per month",
      stats: {
        median: {
          d: -25,
          n: 9
        },
        best: {
          d: -53,
          label: "Live streaming · 1 channel · 60 h · 5 TB"
        },
        saving: {
          value: "$207.3k",
          label: "Live streaming · 10 channels · 2,000 h · 300 TB"
        }
      },
      serviceIds: [
        "css",
        "vod",
        "mps"
      ],
      takeaway: "Live streaming costs about half of the AWS stack; VOD is 4–24% lower; MPS transcoding is cheaper until ~1M minutes a month, where AWS volume tiers catch up.",
      notes: [
        "AWS has no single CSS equivalent: live = MediaLive (standard pipeline) + MediaPackage + CloudFront; VOD = S3 + MediaConvert + CloudFront. MPS vs MediaConvert is the cleanest like-for-like.",
        "Tencent CSS and VOD bill delivery at a daily flat tier; Tencent publishes no volume tiers on transcoding. List prices, no prepaid packages, CloudFront free tier not applied."
      ],
      source: "Tencent docs CSS 267/2818, 267/39604 · VOD 266/14666 · MPS price page (Frankfurt column) · AWS Price List API (MediaLive, MediaConvert, MediaPackage, CloudFront, S3), eu-central-1."
    },
    {
      id: "observability",
      tab: "Observability",
      title: "Observability and integration vs AWS",
      sub: "CLS · TCMG · RUM · EventBridge · Frankfurt · list prices, USD per month",
      stats: {
        median: {
          d: -20,
          n: 12
        },
        best: {
          d: -75,
          label: "Logs · CLS · 10 TB ingested / month"
        },
        saving: {
          value: "$292.8k",
          label: "Logs · CLS · 50 TB ingested / month"
        }
      },
      serviceIds: [
        "cls",
        "tcmg",
        "rum",
        "eb"
      ],
      takeaway: "Logging is the big lever — CLS is 75% below CloudWatch Logs at every volume. RUM is 20% and EventBridge 17% cheaper; Grafana wins from ~50 users.",
      notes: [
        "CLS: $0.032/GB written (compressed), $0.066/GB index traffic, $0.00243/GB-day storage; CloudWatch $0.63/GB ingested + $0.0324/GB-month; 1:5 compression both sides.",
        "TCMG: $109 / $199 / $299 for ≤20 / ≤50 / ≤100 users vs AWS $9 editor, $5 viewer. * TCMG Frankfurt availability not confirmed.",
        "* RUM: Tencent $0.08 per 10k reports vs AWS $1 per 100k events, matched 1:1 per record. Tencent RUM reports into Singapore (no EU region) — check data residency. Tencent also gives 500k free reports a day; not applied.",
        "EventBridge: Tencent $0.832 per million custom events (lower above 1B) vs AWS $1.00 per million, both per 64 KB; no free tier either side."
      ],
      source: "Tencent CLS price page (Frankfurt) and docs 614/37509, 1124/49506, 248/83625, 248/64871 · AWS Price List API (AmazonCloudWatch, AmazonGrafana, AWSEvents), eu-central-1."
    }
  ]
}];
