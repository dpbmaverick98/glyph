---
title: Obul x402 Gateway
description: Self-hosted enterprise solution — coming Q4 2025
sidebar_position: 3
status: coming-soon
---

# Obul x402 Gateway

:::status Coming Soon — Q4 2025
:::

For organizations that need complete control. Run Obul in your own infrastructure.

## What It Is

A self-hosted version of Obul's proxy layer. Deploy on your servers, behind your firewall, under your control.

```
┌─────────────────────────────────────────────────────────┐
│  Your Infrastructure                                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Obul x402 Gateway                        │   │
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐     │   │
│  │  │  API    │───▶│  x402   │───▶│ Target  │     │   │
│  │  │ Handler │    │ Engine  │    │  APIs   │     │   │
│  │  └─────────┘    └─────────┘    └─────────┘     │   │
│  │        │                                        │   │
│  │        ▼                                        │   │
│  │  ┌─────────┐    ┌─────────┐                    │   │
│  │  │  Logs   │    │ Metrics │                    │   │
│  │  └─────────┘    └─────────┘                    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## What's Coming

### Deployment Options

| Platform | Method |
|----------|--------|
| Docker | Single container |
| Kubernetes | Helm chart |
| AWS | CloudFormation |
| GCP | Terraform |
| Azure | ARM template |
| Bare Metal | Binary distribution |

### Enterprise Features

**Custom Facilitators:**
```yaml
# gateway-config.yml
facilitator:
  name: "my-company"
  settlement:
    method: "direct"
    wallet: "0x..."
  fees:
    enabled: false  # No platform fees
```

**Private Networks:**
- Hyperledger Besu
- Quorum
- Custom EVM chains

**Advanced Security:**
```yaml
security:
  hsm:
    enabled: true
    provider: "aws-kms"  # or "azure-key-vault", "hashicorp-vault"
  audit:
    enabled: true
    retention: "7y"
  compliance:
    gdpr: true
    soc2: true
```

**High Availability:**
```yaml
ha:
  replicas: 3
  load_balancer: "nginx"
  failover:
    enabled: true
    health_check_interval: "10s"
```

## Use Cases

**Financial Institutions:**
Banks and fintechs with strict compliance needs. Full audit trails, regulatory compliance, on-premise deployment.

**Large Enterprises:**
Organizations with existing infrastructure. Integrate with current systems, custom security policies.

**Blockchain Projects:**
Teams building facilitator services. White-label solution, custom token support.

## Resource Requirements

| Environment | CPU | Memory | Storage |
|-------------|-----|--------|---------|
| Development | 2 cores | 4GB | 50GB |
| Production | 8 cores | 16GB | 500GB |
| Enterprise | 16+ cores | 32GB+ | 1TB+ |

## Pricing

Annual license:

| Tier | Annual | Includes |
|------|--------|----------|
| Starter | $50,000 | Single deployment, basic support |
| Growth | $150,000 | Multi-region, priority support |
| Enterprise | Custom | Unlimited, dedicated team |

## FAQ

**Q: Can I migrate from Obul Cloud to Gateway?**  
A: Yes. We provide migration tools and support.

**Q: Is Gateway open source?**  
A: Core is open source; enterprise features are licensed.

**Q: What SLAs are available?**  
A: 99.99% uptime SLA with enterprise support.

## Contact Sales

Discuss your enterprise needs:

[enterprise@obul.ai](mailto:enterprise@obul.ai)
