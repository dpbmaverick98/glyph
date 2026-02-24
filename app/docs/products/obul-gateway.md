---
title: Obul x402 Gateway
description: Self-hosted enterprise option (Q4 2025)
sidebar_position: 3
status: coming-soon
---

# Obul x402 Gateway

:::status Coming Soon — Q4 2025
:::

The Obul x402 Gateway is a self-hosted enterprise solution for organizations that need complete control over their payment infrastructure.

## What is Obul Gateway?

A deployable version of Obul's proxy layer that runs in your own infrastructure:

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

## Planned Features

### Deployment Options

| Platform | Deployment |
|----------|------------|
| **Docker** | Single container |
| **Kubernetes** | Helm chart included |
| **AWS** | CloudFormation template |
| **GCP** | Terraform module |
| **Azure** | ARM template |
| **Bare Metal** | Binary distribution |

### Enterprise Features

#### Custom Facilitators

Run your own x402 facilitator:

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

#### Private Networks

Support for private/consortium chains:

- Hyperledger Besu
- Quorum
- Custom EVM chains

#### Advanced Security

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

#### High Availability

```yaml
ha:
  replicas: 3
  load_balancer: "nginx"
  
  failover:
    enabled: true
    health_check_interval: "10s"
```

## Use Cases

### Financial Institutions

Banks and fintechs with strict compliance:

- Full audit trails
- Regulatory compliance
- On-premise deployment

### Large Enterprises

Organizations with existing infrastructure:

- Integrate with existing systems
- Custom security policies
- Dedicated support

### Blockchain Projects

Teams building facilitator services:

- White-label solution
- Custom token support
- Ecosystem integration

## Architecture

### Components

| Component | Description |
|-----------|-------------|
| **API Handler** | Request routing and validation |
| **x402 Engine** | Payment processing logic |
| **Settlement** | On-chain transaction management |
| **Monitoring** | Metrics and alerting |
| **Admin API** | Management interface |

### Resource Requirements

| Environment | CPU | Memory | Storage |
|-------------|-----|--------|---------|
| Development | 2 cores | 4GB | 50GB |
| Production | 8 cores | 16GB | 500GB |
| Enterprise | 16+ cores | 32GB+ | 1TB+ |

## Pricing

Obul Gateway is priced as an annual license:

| Tier | Annual Cost | Includes |
|------|-------------|----------|
| Starter | $50,000 | Single deployment, basic support |
| Growth | $150,000 | Multi-region, priority support |
| Enterprise | Custom | Unlimited, dedicated team |

## Sign Up for Early Access

Discuss your enterprise needs:

[Contact Sales](mailto:enterprise@obul.ai)

## FAQ

**Q: Can I migrate from Obul Cloud to Gateway?**  
A: Yes, we provide migration tools and support.

**Q: Is the Gateway code open source?**  
A: The core is open source; enterprise features are licensed.

**Q: What SLAs are available?**  
A: 99.99% uptime SLA with enterprise support.
