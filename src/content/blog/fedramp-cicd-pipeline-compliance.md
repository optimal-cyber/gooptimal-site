---
title: "Building a Compliant CI/CD Pipeline for Public Sector: GitHub, GitLab, and the Authorization Boundary"
image: "/blog/cicd-fedramp.svg"
imageAlt: "A compliant CI/CD pipeline crossing the authorization boundary"
description: "A practical guide to architecting a CI/CD pipeline that crosses the authorization boundary. Using GitHub or GitLab CI outside, pulling code into a secure dev environment, and promoting to production through a manual gate. For FedRAMP, DoW Impact Level, and agency ATO environments."
date: 2026-03-07
category: "Engineering"
tags:
  - "CI/CD"
  - "FedRAMP"
  - "DoW"
  - "NIST"
  - "GitLab"
  - "GitHub"
  - "authorization boundary"
  - "DevSecOps"
  - "DISA"
---

Every engineering team building for the federal government eventually hits the same question: how do we run a modern CI/CD pipeline -- one that uses tools like GitHub or GitLab CI, automated testing, and continuous deployment -- without blowing up our authorization?

Whether you are pursuing a [FedRAMP](https://www.fedramp.gov/) authorization, a [DoW Impact Level](https://www.disa.mil/) provisional authorization through DISA, or an agency-specific ATO, the fundamental challenge is the same: your developers want to use modern source control and CI/CD tooling, but that tooling often lives outside the authorization boundary. The answer is not "use only authorized tools for everything." The answer is understanding exactly where the boundary sits, what controls apply at each stage of the pipeline, and how to architect the data flow so that code moves from an untrusted external environment into the boundary safely, gets validated thoroughly, and reaches production only after a human says "go."

This post walks through a specific, real-world architecture: **GitHub Commercial or GitLab CI as the source code repository and CI runner (outside the boundary), a dev/test environment inside the boundary for automated scanning and validation, and a manual promotion gate before production.** We will cover the [NIST 800-53 Rev 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) controls that apply at each stage, the documentation requirements, the risks, and the continuous monitoring obligations. The controls are the same whether you are targeting FedRAMP Moderate, DoW IL4/IL5, or a civilian agency ATO -- the implementation details shift, but the architectural pattern holds.

## The Three-Stage Architecture

The pipeline follows a strict directional flow. Code moves in one direction -- from external to internal, from untrusted to validated, from dev to production -- with security gates at each transition. Here is the architecture at a high level:

The pipeline flow runs strictly in one direction:

`source → lint → build → test → scan → image → deploy dev → [GATE] → deploy prod → release`

The full lifecycle is governed by **SA-3** (System Development Lifecycle) and **SA-11** (Developer Testing & Evaluation).

| Zone | What lives here | Key controls |
| --- | --- | --- |
| **Outside boundary** | GitHub / GitLab CI — source + CI runner. No federal data permitted. | SA-9 · SA-10 · CM-5 |
| **Boundary crossing** | Pull only (never push), over TLS 443 with FIPS-validated encryption | SC-8 · SC-7 |
| **Inside boundary — Dev/Test** | Security validation gate: SAST, DAST, SCA, SBOM, secrets, and image scans must all pass before code advances | SC-8 · SC-7 · SI-7 · RA-5 · AU-2 |
| **Inside boundary — Manual gate** | Human approval before anything reaches production | AC-6 · CM-3 |
| **Inside boundary — Production** | Operational environment; releases tagged major / minor / patch, with separation of duties enforced | AC-6 · AC-2 · CM-3 · SI-2 |

Three architectural constraints are non-negotiable:

1. **No federal data in GitHub.** Source code is acceptable provided it contains no embedded secrets, CUI, PII, FTI, or configuration values that expose the security architecture. This is the bright line.
2. **Pull, not push.** The boundary-side system pulls code from GitHub. GitHub never pushes into the boundary. This follows the same principle FedRAMP applies to update sources: threat feeds and vulnerability definitions are pulled and validated, not pushed.
3. **Dev is isolated from production.** No customer data in dev. Dev teams have no access to production systems. The [FedRAMP ABD Job Aid](https://www.fedramp.gov/agency-authorization/) is explicit about this separation.

## Stage 1: GitHub or GitLab CI (Outside the Boundary)

GitHub Commercial and GitLab.com (SaaS) are not FedRAMP Authorized or DoW IL-authorized. That does not make them off-limits -- it means you need to document them properly and control what touches them. The same pattern applies whether your team uses GitHub, [GitLab CI/CD](https://docs.gitlab.com/ee/ci/), or any other external SCM/CI platform. The critical controls:

| Control | Name | What You Must Do |
| --- | --- | --- |
| SA-9 | External System Services | Document GitHub or GitLab as an external, non-authorized service in the SSP. Describe its security controls (encryption in transit, access controls, audit logging). Accept the residual risk or open a POA&M item. |
| SA-10 | Dev Configuration Mgmt | Document the full dev lifecycle: branching strategy, code review requirements, commit/merge authority, PR/MR approval workflow (GitHub PRs or GitLab MRs), and how code integrity is ensured before entering the boundary. |
| SA-11 | Dev Testing & Evaluation | Demonstrate security testing before boundary entry: SAST, linting, peer review. Document what gates exist at the GitHub level. |
| CM-5 | Access Restrictions for Change | Formally manage GitHub/GitLab accounts with push access. Quarterly privilege review of all users with commit or merge authority. |
| AC-22 | Publicly Accessible Content | If the repo is public, review for non-public information. Even for private repos, ensure no credentials or sensitive config are committed. |

**Documentation requirements:** The Authorization Boundary Diagram must show your SCM platform (GitHub, GitLab, etc.) as an external service outside the boundary. SSP Appendix M (Integrated Inventory Workbook) must list it with its authorization status noted as non-authorized. A risk acceptance statement or POA&M entry must cover the residual risk. For DoW IL environments, DISA will scrutinize this boundary crossing closely -- expect additional questions about data classification and supply chain risk during the PA review.

> Some organizations eliminate this risk entirely by using [AWS CodeCommit](https://aws.amazon.com/codecommit/) on GovCloud, GitHub Enterprise on GovCloud, or [GitLab on a self-managed instance](https://about.gitlab.com/solutions/public-sector/) inside the boundary. For DoW IL5 environments in particular, DISA may require the SCM to reside within the boundary. But for FedRAMP Moderate and many DoW IL4 architectures, external GitHub or GitLab with proper controls is an acceptable and well-documented pattern.

## Stage 2: Dev/Test Environment (The Security Gate)

This is where untrusted code from outside the boundary gets validated. Whether your authorization is FedRAMP, DoW IL4/IL5, or an agency-specific ATO, the principle is the same. The FedRAMP ABD template positions this as the **Corporate Cloud Dev Subnet** -- logically separated from production, no customer data, and the dev team has no access to production systems. DISA's [CC SRG](https://public.cyber.mil/dccs/) applies similar isolation requirements for Impact Level environments.

### Boundary Crossing Controls

The connection from dev to your external SCM (GitHub or GitLab) is the most security-sensitive link in the pipeline. Every bit of traffic crossing the boundary must be encrypted with [FIPS 140-validated](https://csrc.nist.gov/projects/cryptographic-module-validation-program) cryptographic modules. For DoW IL environments, this is non-negotiable -- DISA enforces FIPS at the infrastructure level.

| Control | Name | What You Must Do |
| --- | --- | --- |
| SC-8 | Transmission Confidentiality | FIPS 140-validated encryption for the SCM-to-dev connection. [AWS GovCloud](https://aws.amazon.com/govcloud-us/) and [Azure Government](https://azure.microsoft.com/en-us/explore/global-infrastructure/government) handle this inherently; commercial cloud requires explicit FIPS endpoint configuration. |
| SC-7 | Boundary Protection | Document boundary-crossing traffic: ports (443), protocols (HTTPS/TLS), direction (pull, not push), encryption status. |
| SI-7 | Software Integrity | Verify integrity of pulled code: validate commit signatures, webhook HMAC signatures, or signed tags. Automate on every build. |

### Testing and Scanning

The dev environment is your primary defense against supply chain compromise. Every build should run through a comprehensive scan pipeline:

**Build scan pipeline — runs on every commit:**

| Scan | Purpose | Tools | Controls |
| --- | --- | --- | --- |
| SAST | Static analysis | fortify / semgrep | SI-3 · SI-7 · SA-11 |
| DAST | Dynamic testing | ZAP / Burp | RA-5 · SA-11 |
| SCA | Dependency scan | snyk / trivy | SI-3 · SA-12 |
| SBOM | Bill of materials | anchore / syft | SI-7 · SA-12 |
| Secrets | Credential scan | trufflehog / gitleaks | SI-4 |
| Image scan | Container verify | twistlock / openSCAP | SI-7 · SC-8 |

**All pass → advance. Any fail → block.**

Under `RA-5`, monthly OS, web application, and database scans are the minimum. But your pipeline should scan on **every build** -- the monthly cadence is the compliance floor, not the engineering target. Under `CM-3`, every code change flowing through the pipeline is a configuration change that requires a Security Impact Analysis. If the analysis concludes the change adversely affects the system's authorization, it becomes a significant change requiring AO coordination and 3PAO involvement.

### Logging Everything

Under `AU-2`, log all pipeline events continuously: who triggered the pull, what commit was pulled, build results, scan results, pass/fail decisions. Pipe everything to your SIEM for automated analysis and event correlation. Under `CM-8(3)`, detect new assets with automated mechanisms within a **five-minute delay maximum**. If the pipeline spins up build containers or deploys new components, your inventory system must detect them.

## Stage 3: The Manual Promotion Gate

The manual gate between dev and production is not a weakness -- it is a **compliance strength**. It demonstrates human oversight over what enters the production environment and is the final checkpoint before code impacts the operational system.

| Control | Name | What You Must Do |
| --- | --- | --- |
| CM-3 | Config Change Control | Document who has authority to approve promotions, what they verify (scans clean, tests passed, security impact analysis completed), and how approval is recorded. |
| AC-6 | Least Privilege | The developer who wrote the code must not be the person who approves production promotion. Separate roles: developers commit, a different individual approves dev pull, another approves production. |
| AC-2 | Account Management | Formal management of GitHub/GitLab accounts, cloud IAM roles for your CI/CD service, and all pipeline service accounts. Disable after 90 days inactive. Annual recertification. |
| SI-2 | Flaw Remediation | Security-relevant updates remediated within 30 days. Document an SLA for security patch promotion through the pipeline. |


## Cross-Cutting Requirements

Several controls apply across all three stages and must be documented holistically in the SSP.

### Cryptographic Requirements

All data in transit across and within the boundary must use [FIPS 140-validated](https://csrc.nist.gov/projects/cryptographic-module-validation-program) cryptographic modules. All data at rest -- artifacts, source code in object storage, CI/CD artifact stores -- must be encrypted with FIPS 140-validated modules. The [FedRAMP Policy for Cryptographic Module Selection](https://www.fedramp.gov/documents/) allows CSPs to use update streams (non-validated but current) over validated-but-outdated modules when addressing known vulnerabilities, but CAVP-validated algorithms are strongly preferred. For DoW IL5, DISA requires NSA-approved cryptography for data at rest and in transit -- FIPS alone may not suffice.

### Incident Response

A compromise at any stage -- GitHub/GitLab account takeover, poisoned dependency, unauthorized code promotion -- triggers the Incident Response Plan under `IR-6`. For FedRAMP, report in accordance with the FedRAMP Incident Communications Procedure and US-CERT timelines. For DoW environments, follow DISA's incident reporting requirements and notify the AO within the specified timeframes. Your IR plan should specifically address supply chain compromise scenarios that are unique to CI/CD pipelines.

### Significant Change Considerations

Per the FedRAMP Continuous Monitoring Strategy Guide, before any planned change, perform a Security Impact Analysis. If the change adversely affects the system's authorization integrity, submit a **Significant Change Request Form** to the AO at least 30 days before implementation. This applies to pipeline changes too -- adding a new scanning tool, changing the deployment target, or modifying the boundary crossing mechanism all qualify.

## The Continuous Monitoring Schedule

This architecture creates specific continuous monitoring obligations. Here is the complete schedule:

| Frequency | Activity | Control | Deliverable? |
| --- | --- | --- | --- |
| Continuous | Auditable event monitoring | AU-2 | -- |
| Continuous | Asset detection (5-min max delay) | CM-8(3) | -- |
| Monthly | Vulnerability scanning (OS, web, DB) | RA-5 | Yes |
| Monthly | POA&M update and submission | CA-5 | Yes |
| Monthly | Integrity scans | SI-7(1) | -- |
| Monthly | Least functionality review | CM-7(1) | -- |
| 60 Days | Authenticator/password refresh | IA-5(g) | -- |
| Quarterly | Developer privilege review | CM-5(5) | -- |
| Annually | Baseline configuration review | CM-2(1) | -- |
| Annually | CM Plan update and submission | CM-9 | Yes |
| Annually | SSP update and submission | PL-2 | Yes |
| Annually | Penetration testing (3PAO) | CA-8 | Yes |
| Annually | Account recertification | AC-2(j) | -- |

## Key Risks and Mitigations

### External SCM as a Non-Authorized Service

The primary risk is using a non-authorized service (GitHub Commercial, GitLab.com) in the software supply chain. Mitigations: no federal data in the external SCM, documented risk in SSP and POA&M, strong integrity verification at the boundary crossing. For organizations that cannot tolerate this risk -- particularly at DoW IL5 -- self-hosted GitLab inside the boundary, AWS CodeCommit on GovCloud, or GitHub Enterprise on GovCloud eliminate it entirely.

### Supply Chain Integrity

Code flowing from an external, untrusted environment into the authorization boundary is a supply chain risk by definition. The dev environment scanning pipeline (SAST, DAST, SCA, dependency analysis) is the primary mitigating control. Commit signature verification and webhook HMAC validation provide additional assurance that code was not tampered with in transit.

### The Manual Gate Must Actually Be Manual

The separation of duties between dev and production is only effective if it is actually enforced. The developer, the dev approver, and the production approver must be different individuals. At minimum, the developer and the production approver must not be the same person. Automate the enforcement -- use IAM policies and pipeline configurations that structurally prevent the same identity from both committing code and approving its promotion.

## Making This Practical

The controls and requirements above can feel overwhelming when read as a list. In practice, the implementation is straightforward if you approach it in layers:

1. **Get the boundary right first.** Draw the ABD. Show GitHub outside, dev and prod inside. Show the pull direction, ports, and encryption. Get this approved before writing code.
2. **Build the scan pipeline in dev.** SAST, DAST, SCA, integrity checks, SBOM generation. Make every scan a pass/fail gate. If it fails, code does not advance.
3. **Enforce separation of duties structurally.** Use IAM policies, not just process documentation. The pipeline should not allow the same identity to commit and approve.
4. **Automate the ConMon deliverables.** Monthly vulnerability scan reports, POA&M updates, integrity scan logs -- generate these from your pipeline automatically. The schedule above becomes a checklist your automation runs against.
5. **Document as you build.** The SSP narrative for this architecture writes itself when you build the controls into the pipeline. Your IaC is your evidence. Your scan results are your proof. Your audit logs are your continuous monitoring.

> The best CI/CD pipeline for FedRAMP is not the one that avoids compliance -- it is the one that generates compliance evidence as a natural byproduct of building and deploying software. When the pipeline is the proof, the ATO package assembles itself.

**Building a compliant CI/CD pipeline for public sector?** [Request access](/contact) to see how Optimal automates SAST/DAST/SCA scanning, SBOM generation, evidence collection, and continuous monitoring across FedRAMP, DoW Impact Level, and agency ATO environments -- turning your pipeline into your compliance engine.
