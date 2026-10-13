/* Service/tier/scenario layout — editorial, no prices. Prices come from data/prices/<provider>/<service>.json
 * via tools/build-pricebook.js. */
var CA_STRUCTURE = window.CA_STRUCTURE = {
  "book": "fra",
  "services": [
    {
      "id": "mysql",
      "tiers": [
        {
          "label": "4 vCPU / 16 GB",
          "sub": "Two-node HA (primary + standby, multi-AZ)",
          "products": {
            "tencent": "MySQL General · 4C16G",
            "aws": "db.m6i.xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $0.55/h",
              "delta": -32
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -29
            },
            {
              "label": "1-year prepaid vs 1-yr RI",
              "delta": -12
            }
          ]
        },
        {
          "label": "8 vCPU / 32 GB",
          "sub": "Two-node HA (primary + standby, multi-AZ)",
          "products": {
            "tencent": "MySQL General · 8C32G",
            "aws": "db.m6i.2xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $1.10/h",
              "delta": -32
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -29
            },
            {
              "label": "1-year prepaid vs 1-yr RI",
              "delta": -12
            }
          ]
        },
        {
          "label": "16 vCPU / 64 GB",
          "sub": "Two-node HA (primary + standby, multi-AZ)",
          "products": {
            "tencent": "MySQL General · 16C64G",
            "aws": "db.m6i.4xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $2.20/h",
              "delta": -32
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -29
            },
            {
              "label": "1-year prepaid vs 1-yr RI",
              "delta": -12
            }
          ]
        },
        {
          "label": "32 vCPU / 128 GB",
          "sub": "Two-node HA (primary + standby, multi-AZ)",
          "products": {
            "tencent": "MySQL General · 32C128G",
            "aws": "db.m6i.8xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $5.43/h *",
              "delta": -16
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -29
            },
            {
              "label": "1-year prepaid vs 1-yr RI",
              "delta": -12
            }
          ]
        }
      ]
    },
    {
      "id": "pgsql",
      "tiers": [
        {
          "label": "4 vCPU / 16 GB",
          "sub": "High-availability edition · instance only, disk excluded",
          "products": {
            "tencent": "PostgreSQL · 4C16G",
            "aws": "db.m6i.xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG T1 (0–96 h)",
              "delta": null
            },
            {
              "label": "PAYG avg T2/T3",
              "delta": null
            }
          ]
        },
        {
          "label": "8 vCPU / 32 GB",
          "sub": "High-availability edition · instance only, disk excluded",
          "products": {
            "tencent": "PostgreSQL · 8C32G",
            "aws": "db.m6i.2xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG T1 (0–96 h)",
              "delta": null
            },
            {
              "label": "PAYG avg T2/T3",
              "delta": null
            }
          ]
        },
        {
          "label": "16 vCPU / 64 GB",
          "sub": "High-availability edition · instance only, disk excluded",
          "products": {
            "tencent": "PostgreSQL · 16C64G",
            "aws": "db.m6i.4xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG T1 (0–96 h)",
              "delta": null
            },
            {
              "label": "PAYG avg T2/T3",
              "delta": null
            }
          ]
        },
        {
          "label": "32 vCPU / 128 GB",
          "sub": "High-availability edition · instance only, disk excluded",
          "products": {
            "tencent": "PostgreSQL · 32C128G",
            "aws": "db.m6i.8xlarge · Multi-AZ"
          },
          "rows": [
            {
              "label": "PAYG T1 (0–96 h)",
              "delta": null
            },
            {
              "label": "PAYG avg T2/T3",
              "delta": null
            }
          ]
        }
      ]
    },
    {
      "id": "redis",
      "tiers": [
        {
          "label": "8 GB · master + replica",
          "sub": "Standard architecture, 2 nodes, in-memory",
          "products": {
            "tencent": "Redis Standard · 8 GB",
            "aws": "2 × cache.r6g.large · Valkey"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $0.282/h",
              "delta": -29
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -44
            },
            {
              "label": "1-year prepaid vs 1-yr reserved",
              "delta": -27
            }
          ]
        },
        {
          "label": "16 GB · master + replica",
          "sub": "Standard architecture, 2 nodes, in-memory",
          "products": {
            "tencent": "Redis Standard · 16 GB",
            "aws": "2 × cache.r6g.xlarge · Valkey"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $0.564/h",
              "delta": -29
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -44
            },
            {
              "label": "1-year prepaid vs 1-yr reserved",
              "delta": -27
            }
          ]
        },
        {
          "label": "32 GB · master + replica",
          "sub": "Standard architecture, 2 nodes, in-memory",
          "products": {
            "tencent": "Redis Standard · 32 GB",
            "aws": "2 × cache.r6g.2xlarge · Valkey"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $1.128/h",
              "delta": -29
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -44
            },
            {
              "label": "1-year prepaid vs 1-yr reserved",
              "delta": -27
            }
          ]
        },
        {
          "label": "64 GB · master + replica",
          "sub": "Standard architecture, 2 nodes, in-memory",
          "products": {
            "tencent": "Redis Standard · 64 GB",
            "aws": "2 × cache.r6g.4xlarge · Valkey"
          },
          "rows": [
            {
              "label": "PAYG avg T2/T3 $2.256/h",
              "delta": -29
            },
            {
              "label": "Monthly prepaid vs on-demand",
              "delta": -44
            },
            {
              "label": "1-year prepaid vs 1-yr reserved",
              "delta": -27
            }
          ]
        }
      ]
    },
    {
      "id": "cdn",
      "tiers": [
        {
          "label": "10 TB delivered / month",
          "sub": "Europe delivery tier · HTTPS",
          "products": {
            "tencent": "EdgeOne · EU traffic tiers",
            "aws": "CloudFront · Europe tiers"
          },
          "rows": [
            {
              "label": "Traffic only · PAYG",
              "delta": -23
            },
            {
              "label": "Traffic + requests · PAYG *",
              "delta": -27
            },
            {
              "label": "1-year traffic pack vs PAYG *",
              "delta": -28
            }
          ]
        },
        {
          "label": "50 TB delivered / month",
          "sub": "Europe delivery tier · HTTPS",
          "products": {
            "tencent": "EdgeOne · EU traffic tiers",
            "aws": "CloudFront · Europe tiers"
          },
          "rows": [
            {
              "label": "Traffic only · PAYG",
              "delta": -28
            },
            {
              "label": "Traffic + requests · PAYG *",
              "delta": -32
            },
            {
              "label": "1-year traffic pack vs PAYG *",
              "delta": -35
            }
          ]
        },
        {
          "label": "100 TB delivered / month",
          "sub": "Europe delivery tier · HTTPS",
          "products": {
            "tencent": "EdgeOne · EU traffic tiers",
            "aws": "CloudFront · Europe tiers"
          },
          "rows": [
            {
              "label": "Traffic only · PAYG",
              "delta": -25
            },
            {
              "label": "Traffic + requests · PAYG *",
              "delta": -29
            },
            {
              "label": "1-year traffic pack vs PAYG *",
              "delta": -25
            }
          ]
        },
        {
          "label": "500 TB delivered / month",
          "sub": "Europe delivery tier · HTTPS",
          "products": {
            "tencent": "EdgeOne · EU traffic tiers",
            "aws": "CloudFront · Europe tiers"
          },
          "rows": [
            {
              "label": "Traffic only · PAYG",
              "delta": -10
            },
            {
              "label": "Traffic + requests · PAYG *",
              "delta": -22
            },
            {
              "label": "1-year traffic pack vs PAYG *",
              "delta": 9
            }
          ]
        }
      ]
    },
    {
      "id": "cbs",
      "tiers": [
        {
          "label": "Block · CBS Balanced SSD",
          "sub": "10k IOPS / 190 MB/s included in Tencent price",
          "products": {
            "tencent": "CBS Balanced SSD · Frankfurt",
            "aws": "EBS gp3 · 10k IOPS · 190 MB/s"
          },
          "rows": [
            {
              "label": "1 TiB · PAYG",
              "delta": -21
            },
            {
              "label": "1 TiB · monthly subscription",
              "delta": -21
            },
            {
              "label": "4 TiB · monthly subscription",
              "delta": 4
            }
          ]
        },
        {
          "label": "Block · CBS Enhanced SSD",
          "sub": "50k IOPS / 350 MB/s included in Tencent price",
          "products": {
            "tencent": "CBS Enhanced SSD · Frankfurt",
            "aws": "EBS gp3 · 50k IOPS · 350 MB/s"
          },
          "rows": [
            {
              "label": "1 TiB · PAYG",
              "delta": -43
            },
            {
              "label": "1 TiB · monthly subscription",
              "delta": -42
            },
            {
              "label": "4 TiB · monthly subscription",
              "delta": 32
            }
          ]
        }
      ]
    },
    {
      "id": "cos",
      "tiers": [
        {
          "label": "Object · 50 TB stored",
          "sub": "Standard class · capacity only",
          "products": {
            "tencent": "COS STANDARD · Frankfurt",
            "aws": "S3 Standard · eu-central-1"
          },
          "rows": [
            {
              "label": "PAYG",
              "delta": -31
            },
            {
              "label": "1-month capacity pack *",
              "delta": -51
            },
            {
              "label": "1-year capacity pack *",
              "delta": -54
            }
          ]
        },
        {
          "label": "Object · 500 TB stored",
          "sub": "Standard class · capacity only",
          "products": {
            "tencent": "COS STANDARD · Frankfurt",
            "aws": "S3 Standard · eu-central-1"
          },
          "rows": [
            {
              "label": "PAYG",
              "delta": -28
            },
            {
              "label": "1-month capacity pack *",
              "delta": -52
            },
            {
              "label": "1-year capacity pack *",
              "delta": -55
            }
          ]
        }
      ]
    },
    {
      "id": "clb",
      "tiers": [
        {
          "label": "Load balancer · L profile",
          "sub": "500 new conn/s · 100k active · 20 GB/h",
          "products": {
            "tencent": "CLB · LCU-billed instance",
            "aws": "Application Load Balancer"
          },
          "rows": [
            {
              "label": "PAYG · list LCU rate",
              "delta": -10
            },
            {
              "label": "PAYG · official-site LCU rate *",
              "delta": -24
            },
            {
              "label": "1-year LCU resource pack *",
              "delta": -29
            }
          ]
        }
      ]
    },
    {
      "id": "nat",
      "tiers": [
        {
          "label": "NAT gateway",
          "sub": "1 gateway · 730 h · traffic processed",
          "products": {
            "tencent": "NAT Gateway Standard",
            "aws": "NAT Gateway (public)"
          },
          "rows": [
            {
              "label": "10 TB · list price",
              "delta": -17
            },
            {
              "label": "10 TB · official-site price",
              "delta": -30
            },
            {
              "label": "50 TB · official-site price",
              "delta": -30
            }
          ]
        }
      ]
    },
    {
      "id": "vpn",
      "tiers": [
        {
          "label": "Site-to-site VPN",
          "sub": "IPsec · egress included both sides",
          "products": {
            "tencent": "VPN Gateway 100 Mbps",
            "aws": "Site-to-Site VPN connection"
          },
          "rows": [
            {
              "label": "1 site · 100 Mbps · 1 TB out",
              "delta": 11
            },
            {
              "label": "1 site · 100 Mbps · 10 TB out",
              "delta": -11
            },
            {
              "label": "5 sites · HA pair · 2 TB out *",
              "delta": -22
            }
          ]
        }
      ]
    },
    {
      "id": "cfw",
      "tiers": [
        {
          "label": "Premium · 20 Mbps",
          "sub": "20 Mbps each direction · 10 public IPs",
          "products": {
            "tencent": "CFW Premium edition",
            "aws": "Network Firewall · 2 AZ + logging"
          },
          "rows": [
            {
              "label": "Monthly subscription *",
              "delta": -46
            },
            {
              "label": "1-year subscription",
              "delta": -54
            },
            {
              "label": "1-year · one-way traffic (AWS low case) *",
              "delta": -50
            }
          ]
        },
        {
          "label": "Enterprise · 100 Mbps",
          "sub": "100 Mbps each direction · 50 public IPs",
          "products": {
            "tencent": "CFW Enterprise edition",
            "aws": "Network Firewall · 2 AZ + logging"
          },
          "rows": [
            {
              "label": "Monthly subscription",
              "delta": -5
            },
            {
              "label": "1-year subscription",
              "delta": -19
            },
            {
              "label": "1-year · one-way traffic (AWS low case) *",
              "delta": 1
            }
          ]
        },
        {
          "label": "Ultimate · 300 Mbps",
          "sub": "300 Mbps each direction · 200 public IPs",
          "products": {
            "tencent": "CFW Ultimate edition",
            "aws": "Network Firewall · 2 AZ + logging"
          },
          "rows": [
            {
              "label": "Monthly subscription",
              "delta": 15
            },
            {
              "label": "1-year subscription",
              "delta": -3
            },
            {
              "label": "1-year · one-way traffic (AWS low case) *",
              "delta": 34
            }
          ]
        }
      ]
    },
    {
      "id": "css",
      "tiers": [
        {
          "label": "Live streaming",
          "sub": "HD 720p · live hours · delivered TB",
          "products": {
            "tencent": "CSS · LVB + live transcoding",
            "aws": "MediaLive + MediaPackage + CloudFront"
          },
          "rows": [
            {
              "label": "1 channel · 60 h · 5 TB",
              "delta": -53
            },
            {
              "label": "3 channels · 300 h · 30 TB",
              "delta": -52
            },
            {
              "label": "10 channels · 2,000 h · 300 TB",
              "delta": -47
            }
          ]
        }
      ]
    },
    {
      "id": "vod",
      "tiers": [
        {
          "label": "Video on demand",
          "sub": "stored TB · transcode min · delivered TB",
          "products": {
            "tencent": "VOD · storage + transcode + delivery",
            "aws": "S3 + MediaConvert + CloudFront"
          },
          "rows": [
            {
              "label": "5 TB · 10k min · 5 TB out",
              "delta": -23
            },
            {
              "label": "50 TB · 100k min · 50 TB out",
              "delta": -24
            },
            {
              "label": "500 TB · 1M min · 500 TB out",
              "delta": -4
            }
          ]
        }
      ]
    },
    {
      "id": "mps",
      "tiers": [
        {
          "label": "Transcoding",
          "sub": "H.264 HD 720p output minutes",
          "products": {
            "tencent": "MPS · general transcoding",
            "aws": "MediaConvert Basic · AVC"
          },
          "rows": [
            {
              "label": "10,000 min HD",
              "delta": -36
            },
            {
              "label": "100,000 min HD",
              "delta": -25
            },
            {
              "label": "1,000,000 min HD",
              "delta": 3
            }
          ]
        }
      ]
    },
    {
      "id": "cls",
      "tiers": [
        {
          "label": "Logs · CLS",
          "sub": "30-day retention · full-text index",
          "products": {
            "tencent": "Cloud Log Service · Standard",
            "aws": "CloudWatch Logs · Standard"
          },
          "rows": [
            {
              "label": "1 TB ingested / month",
              "delta": -75
            },
            {
              "label": "10 TB ingested / month",
              "delta": -75
            },
            {
              "label": "50 TB ingested / month",
              "delta": -75
            }
          ]
        }
      ]
    },
    {
      "id": "tcmg",
      "tiers": [
        {
          "label": "Dashboards · TCMG",
          "sub": "editors + viewers per month",
          "products": {
            "tencent": "Managed Grafana · by edition",
            "aws": "Managed Grafana · per user"
          },
          "rows": [
            {
              "label": "10 users · Basic edition",
              "delta": 88
            },
            {
              "label": "50 users · Advanced edition",
              "delta": -31
            },
            {
              "label": "100 users · Pro edition *",
              "delta": -48
            }
          ]
        }
      ]
    },
    {
      "id": "rum",
      "tiers": [
        {
          "label": "Real users · RUM",
          "sub": "web front-end monitoring",
          "products": {
            "tencent": "Real User Monitoring · PAYG",
            "aws": "CloudWatch RUM · events"
          },
          "rows": [
            {
              "label": "1M events / month *",
              "delta": -20
            },
            {
              "label": "10M events / month *",
              "delta": -20
            },
            {
              "label": "100M events / month *",
              "delta": -20
            }
          ]
        }
      ]
    },
    {
      "id": "eb",
      "tiers": [
        {
          "label": "Events · EventBridge",
          "sub": "custom events on an event bus",
          "products": {
            "tencent": "EventBridge · custom bus",
            "aws": "Amazon EventBridge · custom"
          },
          "rows": [
            {
              "label": "10M events / month",
              "delta": -17
            },
            {
              "label": "100M events / month",
              "delta": -17
            },
            {
              "label": "1B events / month",
              "delta": -17
            }
          ]
        }
      ]
    }
  ]
};
