/*
 * Service catalogue — Tencent Cloud International vs AWS.
 * Source: Tencent Cloud International product documentation index
 * (intl.cloud.tencent.com/document/product, retrieved 9 Oct 2026).
 *
 * Status:
 *   ok     — close 1:1 match, comparable pricing model
 *   review — partial match or different billing model; needs manual review
 *   none   — no AWS equivalent
 *   skip   — not a metered cloud service (SaaS bundles, human services, docs)
 * page   — detailed price comparison exists (see price-tencent-aws-fra.js)
 *
 * Entry: [Tencent service, AWS equivalent, status, note?, page?]
 */
(window.CA_DATA = window.CA_DATA || {}).catalogue = [{
  id: 'tencent-aws',
  a: 'Tencent Cloud',
  b: 'AWS',
  source: 'intl.cloud.tencent.com product index · 9 Oct 2026',
  categories: [
    { name: 'Compute', items: [
      ['Cloud Virtual Machine (CVM)', 'EC2', 'ok', 'Detail pending — compute deck not imported', 'cvm'],
      ['Tencent Cloud Lighthouse', 'Lightsail', 'ok'],
      ['Cloud GPU Service', 'EC2 P/G accelerated instances', 'review', 'Family-level match; no single AWS service'],
      ['CVM Dedicated Host', 'EC2 Dedicated Hosts', 'ok'],
      ['Cloud Bare Metal', 'EC2 bare-metal instance types', 'review', 'Bare metal is an instance option on AWS, not a service'],
      ['Auto Scaling', 'EC2 Auto Scaling', 'ok'],
      ['Tencent Cloud Automation Tools', 'Systems Manager (Run Command / Automation)', 'review'],
      ['Batch Compute', 'Batch', 'ok'],
      ['Hyper Computing Cluster', 'EC2 HPC clusters (EFA)', 'review'],
      ['Cloud Dedicated Cluster', 'Outposts', 'review', 'On-prem dedicated; scope differs'],
      ['Edge Zone', 'Local Zones', 'review'],
      ['Cloud Dedicated Zone', 'Dedicated Local Zones', 'review']
    ]},
    { name: 'Containers & serverless', items: [
      ['Tencent Kubernetes Engine (TKE)', 'EKS', 'ok'],
      ['TKE Serverless', 'EKS on Fargate', 'review'],
      ['Tencent Container Registry (TCR)', 'ECR', 'ok'],
      ['TKE Distributed Cloud Center', 'EKS Anywhere', 'review'],
      ['Serverless Cloud Function (SCF)', 'Lambda', 'ok'],
      ['TEM (elastic microservice)', 'App Runner / ECS', 'review'],
      ['Polaris (service registry)', 'Cloud Map / App Mesh', 'review'],
      ['API Gateway', 'API Gateway', 'ok'],
      ['CloudBase (cloud development)', 'Amplify', 'review', 'BaaS-style; closer to Firebase model']
    ]},
    { name: 'Messaging & integration', items: [
      ['TDMQ for CKafka', 'MSK (Managed Kafka)', 'ok'],
      ['TDMQ for RocketMQ', null, 'none', 'No managed RocketMQ on AWS'],
      ['TDMQ for RabbitMQ', 'Amazon MQ for RabbitMQ', 'ok'],
      ['TDMQ for Apache Pulsar', null, 'none', 'No managed Pulsar on AWS'],
      ['TDMQ for MQTT', 'IoT Core (MQTT broker)', 'review', 'Different scope: IoT vs general messaging'],
      ['TDMQ for CMQ', 'SQS + SNS', 'review'],
      ['EventBridge', 'Amazon EventBridge', 'ok', null, 'eb']
    ]},
    { name: 'Storage', items: [
      ['Cloud Object Storage (COS)', 'S3', 'ok', null, 'cos'],
      ['Cloud Block Storage (CBS)', 'EBS', 'ok', null, 'cbs'],
      ['Cloud File Storage (CFS)', 'EFS', 'ok'],
      ['Cloud HDFS', null, 'review', 'Closest: HDFS on EMR'],
      ['GooseFS (data lake accelerator)', 'FSx for Lustre', 'review'],
      ['Cloud Log Service (CLS)', 'CloudWatch Logs', 'ok', null, 'cls'],
      ['Cloud Infinite (media processing on COS)', null, 'review', 'Closest: S3 Object Lambda + MediaConvert'],
      ['Smart Media Hosting', null, 'none'],
      ['LighthouseCOS', 'Lightsail object storage', 'review']
    ]},
    { name: 'Database', items: [
      ['TencentDB for MySQL', 'RDS for MySQL', 'ok', null, 'mysql'],
      ['TencentDB for MariaDB', 'RDS for MariaDB', 'ok'],
      ['TencentDB for PostgreSQL', 'RDS for PostgreSQL', 'ok'],
      ['TencentDB for SQL Server', 'RDS for SQL Server', 'ok'],
      ['TDSQL-C for MySQL', 'Aurora MySQL', 'ok'],
      ['TDSQL-C for PostgreSQL', 'Aurora PostgreSQL', 'ok'],
      ['TDSQL (distributed)', 'Aurora DSQL', 'review', 'Distributed SQL; architectures differ'],
      ['TDSQL Boundless', 'Aurora DSQL', 'review'],
      ['Distributed Cache (Redis-compatible)', 'ElastiCache', 'ok', null, 'redis'],
      ['TencentDB for MongoDB', 'DocumentDB', 'review', 'MongoDB-compatible, not MongoDB'],
      ['TcaplusDB (game database)', 'DynamoDB', 'review', 'Game-oriented data model'],
      ['Tendis', 'ElastiCache / MemoryDB', 'review'],
      ['CTSDB (time series)', 'Timestream', 'review', 'Timestream being folded into other services'],
      ['VectorDB', 'OpenSearch Serverless (vector)', 'review'],
      ['Data Transfer Service (DTS)', 'DMS', 'ok'],
      ['DBbrain', 'DevOps Guru for RDS', 'review'],
      ['Database Expert Service', null, 'skip', 'Human/professional service'],
      ['Database Management Center', null, 'none']
    ]},
    { name: 'Networking', items: [
      ['Virtual Private Cloud (VPC)', 'VPC', 'ok'],
      ['Cloud Load Balancer (CLB)', 'ELB / ALB / NLB', 'ok', null, 'clb'],
      ['Gateway Load Balancer', 'Gateway Load Balancer', 'ok'],
      ['NAT Gateway', 'NAT Gateway', 'ok', null, 'nat'],
      ['VPN Connection', 'Site-to-Site VPN', 'ok', null, 'vpn'],
      ['Direct Connect', 'Direct Connect', 'ok'],
      ['Cloud Connect Network (CCN)', 'Cloud WAN / Transit Gateway', 'review'],
      ['Peering Connection', 'VPC Peering', 'ok'],
      ['Flow Logs', 'VPC Flow Logs', 'ok'],
      ['Anycast Internet Acceleration', 'Global Accelerator', 'ok'],
      ['Global Application Acceleration (GAAP)', 'Global Accelerator', 'review', 'Overlaps with Anycast product'],
      ['Global Acceleration 2.0', 'Global Accelerator', 'review'],
      ['Bandwidth Package', null, 'review', 'No equivalent billing construct on AWS'],
      ['Private Connection', 'PrivateLink', 'ok'],
      ['Elastic IP', 'Elastic IP', 'ok']
    ]},
    { name: 'CDN & edge', items: [
      ['EdgeOne', 'CloudFront + Shield + WAF', 'review', 'Bundled edge security+acceleration', 'cdn'],
      ['Content Delivery Network (CDN)', 'CloudFront', 'ok'],
      ['ECDN (dynamic acceleration)', 'CloudFront (dynamic content)', 'review'],
      ['Anti-DDoS', 'Shield', 'ok'],
      ['SCDN (secure CDN)', 'CloudFront + Shield', 'review'],
      ['Edge Computing Machine (ECM)', 'Wavelength Zones', 'review'],
      ['Multiple Network Acceleration', null, 'none', '4G/5G aggregation; no AWS analog'],
      ['Global Office Access', 'Verified Access / Client VPN', 'review']
    ]},
    { name: 'Video & media', items: [
      ['Cloud Streaming Services (LVB)', 'MediaLive + MediaPackage + CloudFront', 'review', null, 'css'],
      ['StreamLive', 'MediaLive', 'ok'],
      ['StreamPackage', 'MediaPackage', 'ok'],
      ['StreamLink', 'MediaConnect', 'ok'],
      ['Video on Demand (VOD)', 'S3 + MediaConvert + CloudFront', 'review', null, 'vod'],
      ['Media Processing Service (MPS)', 'MediaConvert', 'ok', null, 'mps'],
      ['Live Recording', null, 'none'],
      ['Application Cloud Rendering', null, 'none'],
      ['Cloud Desktop (rendering)', 'WorkSpaces', 'review'],
      ['Player / Live / Short-video / Effect SDKs', null, 'skip', 'SDK licences, not metered services']
    ]},
    { name: 'Real-time communication', items: [
      ['Instant Messaging (IM / Chat)', null, 'none', 'Chime SDK messaging retired'],
      ['Tencent RTC (TRTC)', 'Chime SDK (partial)', 'review', 'Chime SDK covers calls; no interactive live equivalent'],
      ['Game Multimedia Engine (GME)', null, 'none'],
      ['Cloud Contact Center (TCCC)', 'Amazon Connect', 'ok'],
      ['RTC industry editions (education, industrial)', null, 'skip', 'Industry bundles of TRTC']
    ]},
    { name: 'Security', items: [
      ['Cloud Firewall (CFW)', 'Network Firewall', 'ok', null, 'cfw'],
      ['Web Application Firewall', 'WAF', 'ok'],
      ['Host Security', 'GuardDuty + Inspector', 'review', 'Two AWS services cover it'],
      ['Container Security Service', 'GuardDuty (EKS/container partial)', 'review'],
      ['Cloud Security Center', 'Security Hub', 'review'],
      ['Vulnerability Scan Service', 'Inspector', 'review'],
      ['Firewall Manager', 'Firewall Manager', 'ok'],
      ['Key Management Service (KMS)', 'KMS', 'ok'],
      ['Secrets Manager', 'Secrets Manager', 'ok'],
      ['Bastion Host', 'Systems Manager Session Manager', 'review', 'has no appliance; SSM covers the workflow'],
      ['Data Security Audit', 'Macie', 'review'],
      ['Data Security Governance Center', 'Macie', 'review'],
      ['CAPTCHA', 'WAF CAPTCHA', 'ok'],
      ['Risk Identification (RCE)', null, 'none', 'Amazon Fraud Detector retired in 2025'],
      ['Game Security', null, 'none'],
      ['Security Credential Service', 'IAM STS', 'ok'],
      ['iOA Zero Trust', 'Verified Access', 'review'],
      ['OneID (identity security)', 'IAM Identity Center', 'review'],
      ['Security expert / pen-test / managed services', null, 'skip', 'Human services']
    ]},
    { name: 'Big data & analytics', items: [
      ['Elastic MapReduce (EMR)', 'EMR', 'ok'],
      ['Elasticsearch Service', 'OpenSearch Service', 'ok'],
      ['Oceanus (stream computing)', 'Managed Service for Apache Flink', 'ok'],
      ['Data Lake Compute (DLC)', 'Athena', 'review'],
      ['TCHouse-C (ClickHouse)', null, 'none', 'No AWS-native ClickHouse; marketplace only'],
      ['TCHouse-D (Doris)', null, 'none'],
      ['TCHouse-P (Greenplum)', 'Redshift', 'review', 'Different engine; both analytical MPP'],
      ['WeData (integration & governance)', 'Glue + Step Functions', 'review'],
      ['Tencent Cloud BI', 'QuickSight', 'review'],
      ['TCLake (multimodal lakehouse)', 'Lake Formation / SageMaker Lakehouse', 'review'],
      ['DataBuddy', null, 'none'],
      ['TBDS (big data suite)', null, 'none', 'Suite; decompose per component if needed']
    ]},
    { name: 'AI & machine learning', items: [
      ['TI-ONE (training & inference platform)', 'SageMaker', 'ok'],
      ['TokenHub (LLM platform, Hunyuan)', 'Bedrock', 'review', 'Model catalogue differs'],
      ['Agent Development Platform', 'Bedrock Agents', 'review'],
      ['Image Creation Engine', 'Bedrock (image models)', 'review'],
      ['Hunyuan 3D', null, 'none'],
      ['Face Recognition', 'Rekognition', 'ok'],
      ['Face Fusion', null, 'none'],
      ['eKYC (face verification)', 'Rekognition Face Liveness', 'review'],
      ['ASR (speech recognition)', 'Transcribe', 'ok'],
      ['TTS (speech synthesis)', 'Polly', 'ok'],
      ['Machine Translation', 'Translate', 'ok'],
      ['OCR', 'Textract', 'ok'],
      ['AI Digital Human', null, 'none'],
      ['Intelligent Music Platform', null, 'none']
    ]},
    { name: 'Observability & operations', items: [
      ['Cloud Monitor (observability platform)', 'CloudWatch', 'ok'],
      ['Application Performance Monitoring', 'X-Ray + CloudWatch APM', 'review'],
      ['RUM (front-end monitoring)', 'CloudWatch RUM', 'ok', null, 'rum'],
      ['Cloud Automated Testing (synthetic probes)', 'CloudWatch Synthetics', 'ok'],
      ['Managed Prometheus (TMP)', 'Managed Service for Prometheus', 'ok'],
      ['Managed Grafana (TCMG)', 'Managed Grafana', 'ok', null, 'tcmg'],
      ['Health Dashboard', 'Health Dashboard', 'ok'],
      ['Cloud Load Testing (PTS)', 'Distributed Load Testing on AWS', 'review', 'ships this as a solution, not a service'],
      ['Cloud Advisor', 'Trusted Advisor', 'ok'],
      ['Chaos Engineering (chaos drills)', 'Fault Injection Service', 'ok']
    ]},
    { name: 'Management & governance', items: [
      ['Cloud Access Management (CAM)', 'IAM', 'ok'],
      ['CloudAudit', 'CloudTrail', 'ok'],
      ['Config Audit', 'Config', 'ok'],
      ['Group Account Management', 'Organizations', 'ok'],
      ['Control Center', 'Control Tower', 'review'],
      ['Tags', 'Resource Groups / Tag Editor', 'ok'],
      ['Quota Center', 'Service Quotas', 'ok'],
      ['Resource Center', 'Resource Explorer', 'ok'],
      ['Billing Center', 'Cost Explorer / Billing console', 'ok'],
      ['Cloud Migration', 'Application Migration Service (MGN)', 'review'],
      ['Terraform automation support', 'provider / IaC', 'skip', 'Tooling support, not a service']
    ]},
    { name: 'Developer tools', items: [
      ['Cloud Native Build (CNB)', 'CodeBuild + CodePipeline', 'review'],
      ['Cloud Code Analysis', 'CodeGuru Reviewer', 'review', 'CodeGuru largely retired'],
      ['CodeBuddy (AI coding)', 'Amazon Q Developer', 'review'],
      ['Super App as a Service', null, 'none'],
      ['Tencent Cloud API / CLI / SDK', 'API / CLI / SDKs', 'skip'],
      ['Cloud Marketplace', 'Marketplace', 'ok']
    ]},
    { name: 'Communication & enterprise', items: [
      ['Short Message Service', 'End User Messaging SMS', 'ok', 'SNS SMS folded into End User Messaging'],
      ['Simple Email Service', 'SES', 'ok'],
      ['TPNS (mobile push)', 'SNS mobile push', 'review', 'Pinpoint retires Oct 2026'],
      ['Domain Registration', 'Route 53 Domains', 'ok'],
      ['SSL Certificates', 'Certificate Manager (ACM)', 'ok'],
      ['Private DNS', 'Route 53 private hosted zones', 'ok'],
      ['HTTPDNS', null, 'none'],
      ['DNSPod', 'Route 53', 'ok'],
      ['Tencent Meeting', null, 'none', 'Business SaaS'],
      ['Tencent eSign', null, 'none'],
      ['Lexiang (enterprise community)', null, 'none'],
      ['Enterprise Cloud Drive', null, 'none'],
      ['WeCard', null, 'none']
    ]},
    { name: 'Internet of Things', items: [
      ['IoT Hub', 'IoT Core', 'ok'],
      ['IoT Explorer / industry IoT bundles', null, 'skip']
    ]},
    { name: 'Industry & business SaaS', items: [
      ['Interactive Whiteboard', null, 'none'],
      ['Healthcare data / omics / imaging platforms', null, 'skip', 'Vertical SaaS; AWS has HealthLake (being retired)'],
      ['Marketing cloud (CDP, automation, analytics)', null, 'none'],
      ['Blockchain as a Service (TBaaS)', 'Managed Blockchain', 'review', 'Managed Blockchain is being wound down']
    ]}
  ]
}];
