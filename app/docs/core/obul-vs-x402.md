---
title: Obul vs x402
description: Decision matrix, migration path, cost analysis
sidebar_position: 4
---

## Understanding the Relationship

**x402** is a protocol standard.  
**Obul** is a service built on x402.

Think of it like HTTP and NGINX:
- HTTP is the protocol
- NGINX is a server that implements HTTP

Similarly:
- x402 is the payment protocol
- Obul is a facilitator that implements x402

## Decision Matrix

| Factor | Raw x402 | Obul |
|--------|----------|------|
| **Setup Time** | 2-3 weeks | 5 minutes |
| **Infrastructure** | Self-hosted | Fully managed |
| **Key Management** | Your responsibility | Handled by Obul |
| **Smart Contracts** | Deploy and maintain | Pre-deployed |
| **Transaction Monitoring** | Build yourself | Included |
| **Error Handling** | Custom implementation | Built-in |
| **Rate Limiting** | Build yourself | Configurable |
| **Analytics** | Build yourself | Dashboard included |
| **Support** | Community | Dedicated support |

## When to Use Raw x402

Consider implementing x402 directly if:

✅ You have dedicated blockchain engineering resources  

✅ You need complete control over the payment flow  

✅ You have specific compliance requirements  

✅ You're building a facilitator service yourself  

### Raw x402 Stack

```
Components You'll Build:
├── Wallet infrastructure
├── USDC on-ramp procedure
├── Transaction signing service
├── Payment verification logic
├── Retry and error handling
├── Monitoring and alerting
└── Analytics dashboard
```

## When to Use Obul

Choose Obul if:

✅ You want to ship fast

✅ You don't have blockchain expertise  

✅ You prefer managed infrastructure  

✅ You need production reliability  

### Obul Stack

```
What You Get:
├── Managed proxy layer
├── Automatic x402 handling
├── Production security
├── Real-time dashboard
└── Easy card checkout
```

## Migration Path

### Raw x402 → Obul

```
Phase 1: Create Obul account
Phase 2: Generate API key
Phase 3: Update request headers
Phase 4: Test in staging
Phase 5: Production cutover
```

**Estimated effort**: 15 mins 


### Developer Experience

| Feature | Raw x402 | Obul |
|---------|----------|------|
| API documentation | Coinbase | ✅ Auto-generated |
| SDKs | Community | ✅ Official |
| USDC | On-ramp yourself | ✅ Included |
| Dashboard | Build yourself | ✅ Included |

## Recommendation

**For 95% of teams, start with Obul.**

You'll ship faster, avoid infrastructure headaches, and can always migrate to raw x402 if you outgrow the platform.

**For the 5%** with specific requirements (custom facilitators, unique compliance needs, or building facilitator services), raw x402 gives you maximum flexibility.

