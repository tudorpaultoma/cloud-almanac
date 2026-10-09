/*
 * Pricebook — normalized list prices, reusable for any provider pair.
 * Prices: USD per month, list price, no negotiated discounts.
 * Region: Frankfurt. Retrieved 2 Oct 2026.
 *
 * Schema:
 *   services[]               one entry per logical service (provider-neutral)
 *     id                     stable service id (used by catalogue & comparisons)
 *     tiers[]                one entry per size / volume tier
 *       label, sub           tier description
 *       products{<provider>} the provider's product for this tier
 *       rows[]               one entry per billing scenario
 *         label              scenario description (billing modes both sides)
 *         prices{<provider>} price for each provider, or null if not offered
 *         delta              published (tencent - aws)/aws %, negative = first provider cheaper
 *
 * Add a provider by adding its key under products{} / prices{} — no view changes needed.
 * Source: "Cloud prices - Tencent vs AWS.pptx" (October 2026).
 */
var CA_DATA = window.CA_DATA = window.CA_DATA || {};
CA_DATA.providers = {
  tencent: { name: 'Tencent Cloud', short: 'Tencent' },
  aws: { name: 'AWS', short: 'AWS' },
  azure: { name: 'Microsoft Azure', short: 'Azure', pending: true },
  gcp: { name: 'Google Cloud', short: 'GCP', pending: true },
  alibaba: { name: 'Alibaba Cloud', short: 'Alibaba', pending: true }
};
CA_DATA.pricebooks = [{
  id: "fra",
  region: "Frankfurt",
  regionDetail: {
    tencent: "regionId 17",
    aws: "eu-central-1"
  },
  currency: "USD",
  unit: "per month",
  retrieved: "2 Oct 2026",
  services: [
    {
      id: "mysql",
      tiers: [
        {
          label: "4 vCPU / 16 GB",
          sub: "Two-node HA (primary + standby, multi-AZ)",
          products: {
            tencent: "MySQL General · 4C16G",
            aws: "db.m6i.xlarge · Multi-AZ"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $0.55/h",
              prices: {
                tencent: 401.5,
                aws: 592.76
              },
              delta: -32
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 418.82,
                aws: 592.76
              },
              delta: -29
            },
            {
              label: "1-year prepaid vs 1-yr RI",
              prices: {
                tencent: 347.62,
                aws: 395
              },
              delta: -12
            }
          ]
        },
        {
          label: "8 vCPU / 32 GB",
          sub: "Two-node HA (primary + standby, multi-AZ)",
          products: {
            tencent: "MySQL General · 8C32G",
            aws: "db.m6i.2xlarge · Multi-AZ"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $1.10/h",
              prices: {
                tencent: 803,
                aws: 1186
              },
              delta: -32
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 837.65,
                aws: 1186
              },
              delta: -29
            },
            {
              label: "1-year prepaid vs 1-yr RI",
              prices: {
                tencent: 695.25,
                aws: 790
              },
              delta: -12
            }
          ]
        },
        {
          label: "16 vCPU / 64 GB",
          sub: "Two-node HA (primary + standby, multi-AZ)",
          products: {
            tencent: "MySQL General · 16C64G",
            aws: "db.m6i.4xlarge · Multi-AZ"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $2.20/h",
              prices: {
                tencent: 1606,
                aws: 2371
              },
              delta: -32
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 1675,
                aws: 2371
              },
              delta: -29
            },
            {
              label: "1-year prepaid vs 1-yr RI",
              prices: {
                tencent: 1390,
                aws: 1580
              },
              delta: -12
            }
          ]
        },
        {
          label: "32 vCPU / 128 GB",
          sub: "Two-node HA (primary + standby, multi-AZ)",
          products: {
            tencent: "MySQL General · 32C128G",
            aws: "db.m6i.8xlarge · Multi-AZ"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $5.43/h *",
              prices: {
                tencent: 3960,
                aws: 4742
              },
              delta: -16
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 3351,
                aws: 4742
              },
              delta: -29
            },
            {
              label: "1-year prepaid vs 1-yr RI",
              prices: {
                tencent: 2781,
                aws: 3160
              },
              delta: -12
            }
          ]
        }
      ]
    },
    {
      id: "redis",
      tiers: [
        {
          label: "8 GB · master + replica",
          sub: "Standard architecture, 2 nodes, in-memory",
          products: {
            tencent: "Redis Standard · 8 GB",
            aws: "2 × cache.r6g.large · Valkey"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $0.282/h",
              prices: {
                tencent: 205.9,
                aws: 288.5
              },
              delta: -29
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 162.47,
                aws: 288.5
              },
              delta: -44
            },
            {
              label: "1-year prepaid vs 1-yr reserved",
              prices: {
                tencent: 134.85,
                aws: 183.87
              },
              delta: -27
            }
          ]
        },
        {
          label: "16 GB · master + replica",
          sub: "Standard architecture, 2 nodes, in-memory",
          products: {
            tencent: "Redis Standard · 16 GB",
            aws: "2 × cache.r6g.xlarge · Valkey"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $0.564/h",
              prices: {
                tencent: 411.8,
                aws: 576.99
              },
              delta: -29
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 324.93,
                aws: 576.99
              },
              delta: -44
            },
            {
              label: "1-year prepaid vs 1-yr reserved",
              prices: {
                tencent: 269.7,
                aws: 367.6
              },
              delta: -27
            }
          ]
        },
        {
          label: "32 GB · master + replica",
          sub: "Standard architecture, 2 nodes, in-memory",
          products: {
            tencent: "Redis Standard · 32 GB",
            aws: "2 × cache.r6g.2xlarge · Valkey"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $1.128/h",
              prices: {
                tencent: 823.6,
                aws: 1154
              },
              delta: -29
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 649.87,
                aws: 1154
              },
              delta: -44
            },
            {
              label: "1-year prepaid vs 1-yr reserved",
              prices: {
                tencent: 539.39,
                aws: 735.2
              },
              delta: -27
            }
          ]
        },
        {
          label: "64 GB · master + replica",
          sub: "Standard architecture, 2 nodes, in-memory",
          products: {
            tencent: "Redis Standard · 64 GB",
            aws: "2 × cache.r6g.4xlarge · Valkey"
          },
          rows: [
            {
              label: "PAYG avg T2/T3 $2.256/h",
              prices: {
                tencent: 1647,
                aws: 2308
              },
              delta: -29
            },
            {
              label: "Monthly prepaid vs on-demand",
              prices: {
                tencent: 1300,
                aws: 2308
              },
              delta: -44
            },
            {
              label: "1-year prepaid vs 1-yr reserved",
              prices: {
                tencent: 1079,
                aws: 1470
              },
              delta: -27
            }
          ]
        }
      ]
    },
    {
      id: "cdn",
      tiers: [
        {
          label: "10 TB delivered / month",
          sub: "Europe delivery tier · HTTPS",
          products: {
            tencent: "EdgeOne · EU traffic tiers",
            aws: "CloudFront · Europe tiers"
          },
          rows: [
            {
              label: "Traffic only · PAYG",
              prices: {
                tencent: 658.4,
                aws: 850
              },
              delta: -23
            },
            {
              label: "Traffic + requests · PAYG *",
              prices: {
                tencent: 835.9,
                aws: 1138
              },
              delta: -27
            },
            {
              label: "1-year traffic pack vs PAYG *",
              prices: {
                tencent: 609.18,
                aws: 850
              },
              delta: -28
            }
          ]
        },
        {
          label: "50 TB delivered / month",
          sub: "Europe delivery tier · HTTPS",
          products: {
            tencent: "EdgeOne · EU traffic tiers",
            aws: "CloudFront · Europe tiers"
          },
          rows: [
            {
              label: "Traffic only · PAYG",
              prices: {
                tencent: 2898,
                aws: 4051
              },
              delta: -28
            },
            {
              label: "Traffic + requests · PAYG *",
              prices: {
                tencent: 3786,
                aws: 5539
              },
              delta: -32
            },
            {
              label: "1-year traffic pack vs PAYG *",
              prices: {
                tencent: 2646,
                aws: 4051
              },
              delta: -35
            }
          ]
        },
        {
          label: "100 TB delivered / month",
          sub: "Europe delivery tier · HTTPS",
          products: {
            tencent: "EdgeOne · EU traffic tiers",
            aws: "CloudFront · Europe tiers"
          },
          rows: [
            {
              label: "Traffic only · PAYG",
              prices: {
                tencent: 5328,
                aws: 7075
              },
              delta: -25
            },
            {
              label: "Traffic + requests · PAYG *",
              prices: {
                tencent: 7103,
                aws: 10063
              },
              delta: -29
            },
            {
              label: "1-year traffic pack vs PAYG *",
              prices: {
                tencent: 5278,
                aws: 7075
              },
              delta: -25
            }
          ]
        },
        {
          label: "500 TB delivered / month",
          sub: "Europe delivery tier · HTTPS",
          products: {
            tencent: "EdgeOne · EU traffic tiers",
            aws: "CloudFront · Europe tiers"
          },
          rows: [
            {
              label: "Traffic only · PAYG",
              prices: {
                tencent: 21808,
                aws: 24147
              },
              delta: -10
            },
            {
              label: "Traffic + requests · PAYG *",
              prices: {
                tencent: 30683,
                aws: 39135
              },
              delta: -22
            },
            {
              label: "1-year traffic pack vs PAYG *",
              prices: {
                tencent: 26292,
                aws: 24147
              },
              delta: 9
            }
          ]
        }
      ]
    },
    {
      id: "cbs",
      tiers: [
        {
          label: "Block · CBS Balanced SSD",
          sub: "10k IOPS / 190 MB/s included in Tencent price",
          products: {
            tencent: "CBS Balanced SSD · Frankfurt",
            aws: "EBS gp3 · 10k IOPS · 190 MB/s"
          },
          rows: [
            {
              label: "1 TiB · PAYG",
              prices: {
                tencent: 112.13,
                aws: 142.58
              },
              delta: -21
            },
            {
              label: "1 TiB · monthly subscription",
              prices: {
                tencent: 112.64,
                aws: 142.58
              },
              delta: -21
            },
            {
              label: "4 TiB · monthly subscription",
              prices: {
                tencent: 450.56,
                aws: 435.03
              },
              delta: 4
            }
          ]
        },
        {
          label: "Block · CBS Enhanced SSD",
          sub: "50k IOPS / 350 MB/s included in Tencent price",
          products: {
            tencent: "CBS Enhanced SSD · Frankfurt",
            aws: "EBS gp3 · 50k IOPS · 350 MB/s"
          },
          rows: [
            {
              label: "1 TiB · PAYG",
              prices: {
                tencent: 224.26,
                aws: 390.19
              },
              delta: -43
            },
            {
              label: "1 TiB · monthly subscription",
              prices: {
                tencent: 225.28,
                aws: 390.19
              },
              delta: -42
            },
            {
              label: "4 TiB · monthly subscription",
              prices: {
                tencent: 901.12,
                aws: 682.65
              },
              delta: 32
            }
          ]
        }
      ]
    },
    {
      id: "cos",
      tiers: [
        {
          label: "Object · 50 TB stored",
          sub: "Standard class · capacity only",
          products: {
            tencent: "COS STANDARD · Frankfurt",
            aws: "S3 Standard · eu-central-1"
          },
          rows: [
            {
              label: "PAYG",
              prices: {
                tencent: 870.4,
                aws: 1254
              },
              delta: -31
            },
            {
              label: "1-month capacity pack *",
              prices: {
                tencent: 609.28,
                aws: 1254
              },
              delta: -51
            },
            {
              label: "1-year capacity pack *",
              prices: {
                tencent: 574.46,
                aws: 1254
              },
              delta: -54
            }
          ]
        },
        {
          label: "Object · 500 TB stored",
          sub: "Standard class · capacity only",
          products: {
            tencent: "COS STANDARD · Frankfurt",
            aws: "S3 Standard · eu-central-1"
          },
          rows: [
            {
              label: "PAYG",
              prices: {
                tencent: 8704,
                aws: 12083
              },
              delta: -28
            },
            {
              label: "1-month capacity pack *",
              prices: {
                tencent: 5745,
                aws: 12083
              },
              delta: -52
            },
            {
              label: "1-year capacity pack *",
              prices: {
                tencent: 5484,
                aws: 12083
              },
              delta: -55
            }
          ]
        }
      ]
    },
    {
      id: "clb",
      tiers: [
        {
          label: "Load balancer · L profile",
          sub: "500 new conn/s · 100k active · 20 GB/h",
          products: {
            tencent: "CLB · LCU-billed instance",
            aws: "Application Load Balancer"
          },
          rows: [
            {
              label: "PAYG · list LCU rate",
              prices: {
                tencent: 193.96,
                aws: 214.38
              },
              delta: -10
            },
            {
              label: "PAYG · official-site LCU rate *",
              prices: {
                tencent: 162.33,
                aws: 214.38
              },
              delta: -24
            },
            {
              label: "1-year LCU resource pack *",
              prices: {
                tencent: 152.66,
                aws: 214.38
              },
              delta: -29
            }
          ]
        }
      ]
    },
    {
      id: "nat",
      tiers: [
        {
          label: "NAT gateway",
          sub: "1 gateway · 730 h · traffic processed",
          products: {
            tencent: "NAT Gateway Standard",
            aws: "NAT Gateway (public)"
          },
          rows: [
            {
              label: "10 TB · list price",
              prices: {
                tencent: 471.71,
                aws: 570.44
              },
              delta: -17
            },
            {
              label: "10 TB · official-site price",
              prices: {
                tencent: 400.95,
                aws: 570.44
              },
              delta: -30
            },
            {
              label: "50 TB · official-site price",
              prices: {
                tencent: 1898,
                aws: 2700
              },
              delta: -30
            }
          ]
        }
      ]
    },
    {
      id: "vpn",
      tiers: [
        {
          label: "Site-to-site VPN",
          sub: "IPsec · egress included both sides",
          products: {
            tencent: "VPN Gateway 100 Mbps",
            aws: "Site-to-Site VPN connection"
          },
          rows: [
            {
              label: "1 site · 100 Mbps · 1 TB out",
              prices: {
                tencent: 143.09,
                aws: 128.66
              },
              delta: 11
            },
            {
              label: "1 site · 100 Mbps · 10 TB out",
              prices: {
                tencent: 852.72,
                aws: 958.1
              },
              delta: -11
            },
            {
              label: "5 sites · HA pair · 2 TB out *",
              prices: {
                tencent: 286.18,
                aws: 366.82
              },
              delta: -22
            }
          ]
        }
      ]
    },
    {
      id: "cfw",
      tiers: [
        {
          label: "Premium · 20 Mbps",
          sub: "20 Mbps each direction · 10 public IPs",
          products: {
            tencent: "CFW Premium edition",
            aws: "Network Firewall · 2 AZ + logging"
          },
          rows: [
            {
              label: "Monthly subscription *",
              prices: {
                tencent: 420,
                aws: 778.91
              },
              delta: -46
            },
            {
              label: "1-year subscription",
              prices: {
                tencent: 357,
                aws: 778.91
              },
              delta: -54
            },
            {
              label: "1-year · one-way traffic (AWS low case) *",
              prices: {
                tencent: 357,
                aws: 716.35
              },
              delta: -50
            }
          ]
        },
        {
          label: "Enterprise · 100 Mbps",
          sub: "100 Mbps each direction · 50 public IPs",
          products: {
            tencent: "CFW Enterprise edition",
            aws: "Network Firewall · 2 AZ + logging"
          },
          rows: [
            {
              label: "Monthly subscription",
              prices: {
                tencent: 1450,
                aws: 1530
              },
              delta: -5
            },
            {
              label: "1-year subscription",
              prices: {
                tencent: 1232,
                aws: 1530
              },
              delta: -19
            },
            {
              label: "1-year · one-way traffic (AWS low case) *",
              prices: {
                tencent: 1232,
                aws: 1217
              },
              delta: 1
            }
          ]
        },
        {
          label: "Ultimate · 300 Mbps",
          sub: "300 Mbps each direction · 200 public IPs",
          products: {
            tencent: "CFW Ultimate edition",
            aws: "Network Firewall · 2 AZ + logging"
          },
          rows: [
            {
              label: "Monthly subscription",
              prices: {
                tencent: 3900,
                aws: 3406
              },
              delta: 14
            },
            {
              label: "1-year subscription",
              prices: {
                tencent: 3315,
                aws: 3406
              },
              delta: -3
            },
            {
              label: "1-year · one-way traffic (AWS low case) *",
              prices: {
                tencent: 3315,
                aws: 2468
              },
              delta: 34
            }
          ]
        }
      ]
    },
    {
      id: "css",
      tiers: [
        {
          label: "Live streaming",
          sub: "HD 720p · live hours · delivered TB",
          products: {
            tencent: "CSS · LVB + live transcoding",
            aws: "MediaLive + MediaPackage + CloudFront"
          },
          rows: [
            {
              label: "1 channel · 60 h · 5 TB",
              prices: {
                tencent: 378.02,
                aws: 809.96
              },
              delta: -53
            },
            {
              label: "3 channels · 300 h · 30 TB",
              prices: {
                tencent: 2248,
                aws: 4676
              },
              delta: -52
            },
            {
              label: "10 channels · 2,000 h · 300 TB",
              prices: {
                tencent: 19704,
                aws: 36979
              },
              delta: -47
            }
          ]
        }
      ]
    },
    {
      id: "vod",
      tiers: [
        {
          label: "Video on demand",
          sub: "stored TB · transcode min · delivered TB",
          products: {
            tencent: "VOD · storage + transcode + delivery",
            aws: "S3 + MediaConvert + CloudFront"
          },
          rows: [
            {
              label: "5 TB · 10k min · 5 TB out",
              prices: {
                tencent: 553.5,
                aws: 717.5
              },
              delta: -23
            },
            {
              label: "50 TB · 100k min · 50 TB out",
              prices: {
                tencent: 5130,
                aws: 6726
              },
              delta: -24
            },
            {
              label: "500 TB · 1M min · 500 TB out",
              prices: {
                tencent: 44800,
                aws: 46498
              },
              delta: -4
            }
          ]
        }
      ]
    },
    {
      id: "mps",
      tiers: [
        {
          label: "Transcoding",
          sub: "H.264 HD 720p output minutes",
          products: {
            tencent: "MPS · general transcoding",
            aws: "MediaConvert Basic · AVC"
          },
          rows: [
            {
              label: "10,000 min HD",
              prices: {
                tencent: 109,
                aws: 170
              },
              delta: -36
            },
            {
              label: "100,000 min HD",
              prices: {
                tencent: 1090,
                aws: 1450
              },
              delta: -25
            },
            {
              label: "1,000,000 min HD",
              prices: {
                tencent: 10900,
                aws: 10550
              },
              delta: 3
            }
          ]
        }
      ]
    },
    {
      id: "cls",
      tiers: [
        {
          label: "Logs · CLS",
          sub: "30-day retention · full-text index",
          products: {
            tencent: "Cloud Log Service · Standard",
            aws: "CloudWatch Logs · Standard"
          },
          rows: [
            {
              label: "1 TB ingested / month",
              prices: {
                tencent: 163.72,
                aws: 651.76
              },
              delta: -75
            },
            {
              label: "10 TB ingested / month",
              prices: {
                tencent: 1637,
                aws: 6518
              },
              delta: -75
            },
            {
              label: "50 TB ingested / month",
              prices: {
                tencent: 8186,
                aws: 32588
              },
              delta: -75
            }
          ]
        }
      ]
    },
    {
      id: "tcmg",
      tiers: [
        {
          label: "Dashboards · TCMG",
          sub: "editors + viewers per month",
          products: {
            tencent: "Managed Grafana · by edition",
            aws: "Managed Grafana · per user"
          },
          rows: [
            {
              label: "10 users · Basic edition",
              prices: {
                tencent: 109,
                aws: 58
              },
              delta: 88
            },
            {
              label: "50 users · Advanced edition",
              prices: {
                tencent: 199,
                aws: 290
              },
              delta: -31
            },
            {
              label: "100 users · Pro edition *",
              prices: {
                tencent: 299,
                aws: 580
              },
              delta: -48
            }
          ]
        }
      ]
    },
    {
      id: "rum",
      tiers: [
        {
          label: "Real users · RUM",
          sub: "web front-end monitoring",
          products: {
            tencent: "Real User Monitoring · PAYG",
            aws: "CloudWatch RUM · events"
          },
          rows: [
            {
              label: "1M events / month *",
              prices: {
                tencent: 8,
                aws: 10
              },
              delta: -20
            },
            {
              label: "10M events / month *",
              prices: {
                tencent: 80,
                aws: 100
              },
              delta: -20
            },
            {
              label: "100M events / month *",
              prices: {
                tencent: 800,
                aws: 1000
              },
              delta: -20
            }
          ]
        }
      ]
    },
    {
      id: "eb",
      tiers: [
        {
          label: "Events · EventBridge",
          sub: "custom events on an event bus",
          products: {
            tencent: "EventBridge · custom bus",
            aws: "Amazon EventBridge · custom"
          },
          rows: [
            {
              label: "10M events / month",
              prices: {
                tencent: 8.32,
                aws: 10
              },
              delta: -17
            },
            {
              label: "100M events / month",
              prices: {
                tencent: 83.2,
                aws: 100
              },
              delta: -17
            },
            {
              label: "1B events / month",
              prices: {
                tencent: 832,
                aws: 1000
              },
              delta: -17
            }
          ]
        }
      ]
    }
  ]
}];
