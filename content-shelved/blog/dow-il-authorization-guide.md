---
title: "Navigating DoW Impact Level Authorization"
image: "/blog/dow-il-authorization.png"
imageAlt: "Navigating DoW Impact Level authorization"
description: "622+ controls, 20 families, 5 impact levels, 11 steps to Provisional Authorization. The visual guide for cloud-native companies navigating DoW IL authorization."
date: 2026-03-30
category: "Industry Insights"
tags:
  - "DoW"
  - "Impact Level"
  - "IL2"
  - "IL4"
  - "IL5"
  - "IL6"
  - "FedRAMP"
  - "DISA"
  - "CC SRG"
  - "NIST 800-53"
  - "CNSSI 1253"
  - "SCCA"
  - "Provisional Authorization"
  - "cloud authorization"
---

**01 · The Landscape**

## 622+ Controls. Five Impact Levels. One Framework.

The DoW CC SRG Rev 5 layers DoW-specific requirements on FedRAMP baselines across IL2, IL4, IL5, IL6, and Top Secret (JWICS).

| Impact Level | Baseline | Controls |
| --- | --- | --- |
| IL2 | FedRAMP Moderate | 345 |
| IL4 Mod | FedRAMP Moderate | 345 |
| IL4 High | FedRAMP High + DoW | 429 (+84) |
| IL5 NSS | CNSSI 1253 + NSS | 588 (+159) |
| IL6 NSS | Classified + TEMPEST | 618 (+30) |
| Top Secret | IL6 + Classified Overlay + JWICS | 618+ (+TS overlay) |

*Source: CC SRG v1r6, Section 5.1 (December 2025)*

IL5 now mandates NSS controls from CNSSI 1253 per CNSSP-32. A 37% increase over IL4 High. FedRAMP High is the mandatory floor. There is no longer a path to IL5 using FedRAMP Moderate.

### Beyond IL6: Top Secret / JWICS

The CC SRG formally defines IL2 through IL6. However, Top Secret / SCI workloads operate on JWICS (Joint Worldwide Intelligence Communications System) under IC-directed authorization, applying IL6 controls plus a classified overlay. JWICS environments require SCIF-grade facilities, TS/SCI-cleared personnel, and physical separation from all unclassified and non-federal infrastructure.

**02 · Know Your Target**

## Which Impact Level Do You Need?

**What data will your product handle?**

| Data You Handle | Impact Level | Controls | Baseline | Infrastructure |
| --- | --- | --- | --- | --- |
| CUI (Public-facing) | IL2 | 345 | FedRAMP Moderate | Multi-tenant OK |
| CUI (Mission) | IL4 | 429 (+84) | FedRAMP High + DoW | CAP + DoW PKI |
| CUI / NSS | IL5 | 588 (+159) | CNSSI 1253 NSS | Dedicated infra |
| Classified SECRET | IL6 | 618 (+30) | CNSSI 1253 + TEMPEST | SIPRNet classified |
| Classified TS/SCI | Top Secret | 618+ (+overlay) | IL6 + Classified Overlay | JWICS · TS/SCI |

The IL4 to IL5 jump is not incremental. It's a fundamentally different posture.

| Attribute | IL2 | IL4 | IL5 | IL6 | Top Secret |
| --- | --- | --- | --- | --- | --- |
| Controls | 345 | 429 | 588 | 618 | 618+ |
| Baseline | FedRAMP Mod | FedRAMP High | CNSSI 1253 | CNSSI 1253+ | Level 6 + Classified Overlay |
| Separation | Multi-tenant | Logical | Physical | Physical | Physical + Air-gapped |
| Network | Internet | NIPRNet via CAP | NIPRNet via CAP | SIPRNet | JWICS |
| Location | Any | CONUS / DoW on-prem | CONUS / DoW on-prem | CONUS / DoW on-prem | Cleared / SCIF |
| Personnel | N/A | U.S. Citizens | Tier 3 / Secret | Tier 5 / TS/SCI | TS/SCI + NDA |

**03 · The Architecture Stack**

## SCCA: What Your Product Plugs Into

The DoW Secure Cloud Computing Architecture (SCCA) defines the zones your product plugs into. The same architecture applies at any Impact Level.

**CSP DevSecOps Environment** — a separate IL-authorized cloud account, owned by the CSP. Continuous Authority to Operate (cATO) · FIPS 140-2/3 · STIG-hardened runners.

| Component | Function |
| --- | --- |
| Source Repo | Version control |
| SAST / DAST | Static & dynamic scanning |
| Container Scan | Image vulnerability scanning |
| IaC Validation | Infrastructure-as-code checks |
| Image Builder | Hardened image pipeline |
| Artifact Registry | Hardened images · STIG baselines · Signed artifacts |

Deploys signed artifacts to USAF, Army, DISA, and Navy — any IL2–TS environment.

**TCCM Governance Boundary** — government-appointed privileged access and root credential management.

**Agency-Owned Cloud Account** — IL-authorized region · CONUS · DoW IP space · FIPS 140-2/3 validated · any FedRAMP-authorized CSP. It contains the following zones.

#### VDSS — Virtual Datacenter Security Stack

| Component | Function |
| --- | --- |
| Firewall | L3–L7 |
| WAF | Web application firewall |
| IDS / IPS | Detection |
| Reverse Proxy | TLS termination |
| VPC Flow Logs | Packet capture · NetFlow → CSSP |

Plus DDoS mitigation, GeoIP, and ACLs.

#### Your Product — Mission Owner VPC (Cloud Service Offering)

| Component | Function |
| --- | --- |
| Compute | VMs / Containers |
| Database | Relational / NoSQL |
| Object Storage | FIPS endpoint |
| Auth / IdP | DoW PKI · CAC |
| Message Bus | Queue / Stream |
| Secrets Mgmt | KMS · HSM |
| Load Balancer | Internal · TLS 1.2+ only |
| VPN / Transit Gateway | Cross-network peering · IPSec |

Runs in DoW IP space, CONUS only, on a FedRAMP High+ baseline with AES-256 at rest and FIPS endpoints. All traffic is inspected.

#### VDMS — Virtual Datacenter Managed Services

| Component | Function |
| --- | --- |
| ACAS | Vulnerability scanning |
| HBSS | Host security |
| STIG Audit | Compliance |
| Patch Mgmt | Automated |
| SIEM | Log aggregation · Correlation · Alerting |

Plus config management, IaC enforcement, and golden-image compliance.

#### CSSP VPC — Cybersecurity Service Provider

| Component | Function |
| --- | --- |
| Log Replication | Cross-account sync |
| Stream Ingest | Real-time feeds |
| Monitoring | Metrics & alarms |
| CSSP Agents | Endpoint telemetry |

Provides a 24/7 SOC, IR coordination, and JFHQ-DoWIN situational awareness.

#### Cloud-Native Security Services

Continuous monitoring and compliance, with CSP-agnostic equivalents: CSPM, Threat Intel, Audit Logs, Config, Inspector, IAM, and Data Classification.

**External Networks**

| Network | Access |
| --- | --- |
| DoW Users | CAC / PKI auth |
| NIPRNet | Unclassified DoW |
| CAP (Cloud Access Point) | DISA-operated |
| Internet | Commercial (IL2) |
| SIPRNet | Classified (IL6) |
| JWICS | Top Secret / SCI |
| Client VPN / ZTNA | IPSec · OIDC · MFA |

**TCCM — Trusted Cloud Credential Manager:** government-appointed, holds root credentials and privileged access. Not your cloud admin.

**Key architecture notes**

- **CSP vs Agency** — Your DevSecOps pipeline lives in a separate CSP-owned cloud account. Signed artifacts deploy into agency-owned accounts (USAF, Army, DISA, Navy). Same architecture, any IL.
- **CAP** — DISA-operated boundary. Plan for East + West redundancy. Circuit provisioning takes months, so start early.
- **CSSP VPC** — Non-negotiable at IL4+. Log replication, real-time streaming, and SOC coordination with JFHQ-DoWIN. Start the MOU 6 months out.
- **TCCM** — Government-appointed by the Mission Owner's AO. Manages root credentials and privileged access. Not your cloud admin.
- **CSP-agnostic** — This architecture applies across any FedRAMP-authorized CSP. Terminology maps to equivalent services on each platform.

**04 · The Authorization Journey**

## 11 Steps from Contact to Connection

Per DoW Cloud Connection Process Guide v3 (December 2025). PA is granted to the CSO, not the CSP.

| Step | Phase | Milestone | Detail |
| --- | --- | --- | --- |
| 1 | CSP / CSO | Submit Initial Contact Form | Via DCAS portal to initiate DoW cloud registration |
| 2 | CSP / CSO | DoW Cloud Kickoff Meeting | Technical Exchange Meeting (TEM) with all stakeholders |
| 3 | CSP / CSO | JVT Reviews Artifacts & 3PAO Assessment | SSP, SAR, architecture diagram review |
| 4 | CSP / CSO | Initial Risk Review → IATT & CATC | Interim Authorization to Test and Cloud Authority to Connect issued |
| 5 | CSP / CSO | JVT Artifact Validation | Runs concurrent with Step 6 |
| 6 | CSP / CSO | SCCA Connects CSO to CAP | Network connectivity established |
| 7 | CSP / CSO | DSAWG Review & Recommendation | Cross-service board reviews authorization package |
| 8 | CSP / CSO | DISA AO Issues PA | Provisional Authorization granted to the CSO |
| 9 | CSP / CSO | Sustainment & ConMon | Continuous monitoring; USCYBERCOM OPORD compliance begins |
| 10 | Mission Owner | C-ITP Registration | Mission Owner registers Cloud IT Project via SNAP |
| 11 | Mission Owner | Mission Owner ATO | Authority to Operate; mission system goes live |

**Required artifacts:** SSP, SSP Addendum, SAP, Architecture Diagram, Onboarding Questionnaire, SNAP/PPSM Registration.

**05 · Control Family Heatmap**

## Where the Weight Falls

Not all families scale equally. Some nearly double from IL4 High to IL5.

| Control Family | Total | IL2 | IL4M | IL4H | IL5 | IL6 |
| --- | --- | --- | --- | --- | --- | --- |
| Access Control | 65 | 43 | 43 | 50 | 61 | 65 |
| Sys & Comms Protection | 67 | 33 | 33 | 38 | 59 | 67 |
| Sys & Services Acquisition | 70 | 26 | 26 | 29 | 69 | 70 |
| Sys & Info Integrity | 54 | 24 | 24 | 35 | 52 | 54 |
| Config Management | 43 | 27 | 27 | 34 | 43 | 43 |
| Audit & Accountability | 37 | 17 | 17 | 27 | 35 | 37 |
| Identification & Auth | 37 | 27 | 27 | 30 | 37 | 37 |
| Contingency Planning | 35 | 23 | 23 | 35 | 35 | 35 |
| Incident Response | 33 | 17 | 17 | 24 | 33 | 33 |
| Physical & Environmental | 33 | 19 | 19 | 26 | 28 | 33 |
| Supply Chain Risk Mgmt | 22 | 12 | 12 | 14 | 22 | 22 |
| Maintenance | 23 | 11 | 11 | 13 | 20 | 23 |
| Risk Assessment | 18 | 11 | 11 | 13 | 17 | 18 |
| Security Assessment & Auth | 20 | 14 | 14 | 16 | 20 | 20 |
| Personnel Security | 16 | 11 | 11 | 12 | 14 | 16 |
| Media Protection | 15 | 7 | 7 | 10 | 10 | 15 |
| Awareness & Training | 12 | 6 | 6 | 6 | 12 | 12 |
| Planning | 11 | 7 | 7 | 7 | 11 | 11 |
| DoW General Readiness | 10 | 10 | 10 | 10 | 10 | 6 |

### Biggest Jumps: IL4 High → IL5

| Control Family | Change (IL4 High → IL5) | Increase |
| --- | --- | --- |
| Systems & Services Acquisition (SA) | 29 → 69 | +138% |
| Systems & Communications Protection (SC) | 38 → 59 | +55% |
| Systems & Information Integrity (SI) | 35 → 52 | +49% |

**06 · Data Type Overlays**

## Controls Stack by Data Type

CNSSI 1253 overlays add controls based on the data your system processes. These are additive to your IL baseline.

| Overlay | Added Controls |
| --- | --- |
| NSS | 303 |
| CUI | 249 |
| Classified | 212 |
| PHI / HIPAA | 138 |
| Export Control | 108 |
| PII / Privacy | 58 |

**Cumulative impact:** An IL5 system processing CUI + PHI could face 588 baseline controls plus overlay deltas. Your SSP must document which overlays apply.

**07 · Personnel & Clearance Tiers**

## Who Can Touch Your System

Personnel investigation requirements escalate sharply by Impact Level. Source: CC SRG v1r6, Table 5-1.

| Requirement | IL2 | IL4 | IL5 | IL6 | Top Secret |
| --- | --- | --- | --- | --- | --- |
| Privileged Access | Tier 1 / NACI | Tier 3 / MBI | Tier 3 / Secret | Tier 5 / TS/SCI | Tier 5 / TS/SCI + NDA |
| Non-Privileged | N/A | Tier 1 | Tier 3 / Secret | Tier 5 / TS/SCI | Tier 5 / TS/SCI + NDA |
| Citizenship | No requirement | U.S. Citizens | U.S. Citizens | U.S. Citizens | U.S. Citizens |
| Data Location | Any | CONUS | CONUS | CONUS | SCIF / Cleared facility |

**08 · General Readiness Gates**

## 10 Pass/Fail Gates Before Assessment

Binary requirements. You pass or you don't. Evaluated before a single control is assessed.

1. DoW PKI / CAC Authentication
2. DoW IP Addressing (DISA NIC)
3. U.S. Data Residency (CONUS)
4. Mgmt Plane Segregation
5. Personnel Requirements Met
6. CAP Private Connections
7. Internet Dependencies Documented
8. NIPRNet Portal Access
9. Backdoor Prevention
10. Defense in Depth

**09 · Bottom Line**

## What This Means for Your Product

#### Targeting IL4

- Start with FedRAMP High (429 controls)
- Architect for CAP + DoW PKI from day one
- Budget for CSSP engagement
- Circuit provisioning takes months. Start early

#### Targeting IL5

- Everything above + physically separated infrastructure
- Full CNSSI 1253 NSS overlay (588 controls)
- 24/7 SOC with CSSP coordination
- Supply chain controls across vendor ecosystem

#### Targeting IL6

- SIPRNet classified enclave
- TEMPEST/EMSEC + continuous physical guards
- 618 controls with classified data handling
- DISA retains pen testing rights

#### Targeting Top Secret

- Everything IL6 + JWICS network (not SIPRNet)
- Level 6 + Classified overlay controls
- SCIF-grade facilities. Physically separate from unclassified
- All personnel require favorably adjudicated TS/SCI + NDA
- IC-directed authorization. Separate from standard PA pathway

DoW cloud authorization is a product architecture decision, not a compliance checkbox.

Data sourced from NIST 800-53 Rev 5 · DoW CC SRG v1r6 (Dec 2025) · Cloud CPG v3 (Dec 2025) · CNSSI 1253
