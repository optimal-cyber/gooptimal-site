---
title: "SBOM Best Practices: From Executive Order to Operational Reality"
image: "/blog/sbom-practices.jpg"
imageAlt: "SBOM best practices: from executive order to operational reality"
description: "Executive orders mandate SBOMs, but generating them is only half the battle. Learn how to operationalize your software bill of materials for real security outcomes with practical CI/CD integration, vulnerability correlation, and license compliance strategies."
date: 2026-01-28
category: "Engineering"
tags:
  - "SBOM"
  - "supply chain"
  - "executive order"
  - "DevSecOps"
---

The software supply chain has moved from obscure security concern to boardroom priority in a remarkably short span. Executive Order 14028, signed in May 2021, established the mandate: any organization selling software to the federal government must provide a Software Bill of Materials. But mandates and operational maturity are two very different things. Nearly five years later, most organizations still struggle to bridge the gap between generating an SBOM and actually using it to reduce risk. The document exists, but it often sits untouched in a repository, fulfilling a checkbox requirement while failing to deliver the security outcomes it was designed to enable.

This article walks through the practical realities of building an SBOM program that goes beyond compliance theater. We will cover what the executive order actually requires, the tooling landscape and its pitfalls, and a concrete playbook for operationalizing SBOMs as living security artifacts inside your development pipeline.

## What the Executive Order Actually Requires

Executive Order 14028, "Improving the Nation's Cybersecurity," directed NIST to publish guidelines on SBOM minimum elements and establish standards for software supply chain security. The subsequent NIST guidance, combined with OMB Memorandum M-22-18 and M-23-16, laid out specific expectations for federal agencies and their software suppliers. At a high level, the requirements break down into several categories:

- **Minimum elements:** Every SBOM must include supplier name, component name, version, unique identifier, dependency relationships, author of the SBOM data, and a timestamp. These are non-negotiable baseline fields drawn from the NTIA minimum elements report.
- **Machine-readable formats:** SBOMs must be delivered in a standardized, machine-readable format. SPDX and CycloneDX are the two accepted standards, with SPDX holding ISO/IEC 5962:2021 status and CycloneDX backed by OWASP.
- **Frequency and delivery:** SBOMs must be updated with each new release or major update of the software. They must be delivered to the purchasing agency and, in many cases, made available to downstream consumers.
- **Vulnerability disclosure:** Suppliers must maintain a vulnerability disclosure program and be able to correlate SBOM contents with known vulnerabilities (CVEs) upon request.
- **Attestation:** Under the most recent guidance, software producers must attest to conformity with NIST Secure Software Development Framework (SSDF) practices, with the SBOM serving as a supporting artifact.

The critical nuance many teams miss is that the executive order treats SBOMs not as static compliance documents, but as **operational security tools**. The intent is for agencies to ingest these SBOMs, cross-reference them against vulnerability databases, and make risk-informed procurement decisions. If your SBOM program ends at generation, you are meeting the letter of the law but not its spirit.

## The SBOM Generation Problem

Generating an SBOM sounds straightforward. In practice, it is one of the more frustrating challenges in modern software engineering. The core issue is that software composition varies dramatically by ecosystem, and no single tool handles every case well.

The two dominant formats, **CycloneDX** and **SPDX**, serve different philosophical purposes. SPDX originated in the open-source licensing world, emphasizing license identification and provenance tracking. CycloneDX was purpose-built for security use cases, with native support for vulnerability references, service definitions, and cryptographic integrity hashes. For security-focused SBOM programs, CycloneDX tends to be the more natural fit, though both formats are accepted by federal agencies and both continue to converge in capability.

The tooling landscape is fragmented. `syft` from Anchore, `trivy` from Aqua Security, `cdxgen` from CycloneDX, and Microsoft's `sbom-tool` each take different approaches to component discovery. Some analyze package manifests (lockfiles), others perform binary analysis, and a few attempt both. The differences matter:

- **Manifest-based tools** are fast but miss vendored dependencies, statically linked C libraries, and transitive dependencies that are not declared in lockfiles.
- **Binary analysis tools** catch more components but run slower, produce more false positives, and may struggle with stripped binaries or custom build systems.
- **Multi-language monorepos** present a compounding challenge: a single repository might contain Go modules, Python packages, npm dependencies, and container base images, each requiring different analysis strategies.

The practical recommendation is to use multiple tools in tandem and merge their outputs. Run a manifest-based scanner like `syft` alongside a container-aware tool like `trivy`, then reconcile the results into a single authoritative SBOM. This layered approach catches the majority of components that any single tool would miss.

## Operationalizing Your SBOM Program

Generating an SBOM is the starting line. The real value comes from integrating it into your development and security workflows so that the data drives decisions. Here are the four pillars of an operational SBOM program.

### Integrate Generation into CI/CD Pipelines

SBOM generation should be an automated step in every build pipeline, not a manual process run before an audit. The ideal placement is after dependency resolution but before artifact publication. This ensures the SBOM reflects exactly what ships in the build artifact.

Here is an example of generating a CycloneDX SBOM using `syft` inside a CI pipeline:

```
# Generate SBOM from a container image after build
syft packages registry.example.com/myapp:${GIT_SHA} \
  --output cyclonedx-json \
  --file sbom-${GIT_SHA}.cdx.json

# Validate the SBOM against CycloneDX schema
cyclonedx validate \
  --input-file sbom-${GIT_SHA}.cdx.json \
  --input-format json \
  --input-version 1.5

# Upload to your SBOM management platform
curl -X POST https://sbom-api.example.com/v1/upload \
  -H "Authorization: Bearer ${SBOM_API_TOKEN}" \
  -F "sbom=@sbom-${GIT_SHA}.cdx.json" \
  -F "project=myapp" \
  -F "version=${GIT_SHA}"
```

The key principle is determinism. Your SBOM should be generated from the same artifact that gets deployed, not from source code that might diverge after build-time dependency resolution. Pin your generation tool versions in CI to avoid drift in SBOM output format between builds.

### Automate Vulnerability Correlation

An SBOM becomes a security tool the moment you start cross-referencing its component list against vulnerability databases. This means automated CVE matching against NVD, OSV, and vendor-specific advisory feeds. Tools like [Dependency-Track](https://dependencytrack.org/) (open source) or commercial platforms can ingest CycloneDX SBOMs and continuously monitor for new vulnerabilities affecting your declared components.

The automation should produce actionable alerts, not noise. Configure severity thresholds, suppress false positives with VEX (Vulnerability Exploitability eXchange) documents, and route critical findings directly into your ticketing system. The goal is to answer a specific question within minutes: "Does this newly disclosed CVE affect any software we currently have deployed?"

### Track License Compliance

SBOMs contain license information for every declared component. In regulated environments and defense contracts, license compliance is not optional. Copyleft licenses like GPL-3.0 can impose obligations that conflict with proprietary distribution models. AGPL-licensed components in SaaS deployments carry additional exposure.

Build automated policy gates that flag components with restricted or unknown licenses before they enter your build. Maintain an approved license list and enforce it in CI. When a developer adds a new dependency, the pipeline should verify its license status against your policy and block the build if there is a conflict. This is far cheaper than discovering a license violation after delivery.

### Monitor Dependency Drift Over Time

One of the most underutilized capabilities of a mature SBOM program is longitudinal dependency tracking. By comparing SBOMs across releases, you can detect **dependency drift**: unexpected changes in your component inventory. Did a transitive dependency suddenly jump three major versions? Did a new, unvetted component appear without a corresponding pull request? Did a previously patched vulnerable version reappear after a lockfile merge conflict?

Drift detection catches supply chain anomalies that point-in-time vulnerability scanning misses. It is especially valuable for detecting dependency confusion attacks, typosquatting packages, and compromised upstream maintainer accounts where malicious code is injected into legitimate-looking version updates.

> The organizations that treat SBOMs as living security artifacts rather than compliance paperwork are the ones that catch supply chain compromises before they reach production. The SBOM is not the deliverable. The operational workflow around it is.

## SBOM as a Living Document

The distinction between a point-in-time snapshot and a continuously maintained SBOM is the difference between compliance and security. A snapshot tells you what was in a build at a specific moment. A living SBOM program tells you what is deployed right now and whether any of it is vulnerable.

Living SBOMs require three capabilities that most organizations lack:

1. **Artifact-to-deployment mapping:** You need to know which SBOM corresponds to which running instance. If you generated an SBOM for build `v2.3.1`, but production is still running `v2.2.9`, your vulnerability analysis is using the wrong component list. Integrating SBOM tracking with your deployment system (Kubernetes labels, deployment manifests, or asset inventory) closes this gap.
2. **Continuous re-evaluation:** New CVEs are published daily. An SBOM that was clean on Tuesday may have three critical vulnerabilities by Thursday. Your SBOM platform must re-evaluate stored SBOMs against updated vulnerability feeds on a continuous basis, not just at generation time.
3. **VEX integration:** Not every CVE that matches a component is actually exploitable in your context. VEX documents allow you to formally declare that a specific vulnerability is "not affected," "under investigation," or "fixed" for a given product. Publishing VEX alongside your SBOM reduces false positives for downstream consumers and demonstrates mature supply chain security practices.

The federal government is increasingly moving toward requiring VEX documents alongside SBOMs, particularly in the defense and intelligence sectors. Organizations that build VEX into their workflows now will have a significant compliance advantage as these requirements formalize.

## Conclusion

Executive Order 14028 set the mandate, but the hard work of turning SBOMs into operational security tools falls on engineering and security teams. The gap between generating a JSON file and running a mature SBOM program is significant, spanning tooling selection, CI/CD integration, vulnerability correlation, license enforcement, drift detection, and continuous re-evaluation.

The good news is that the tooling ecosystem has matured considerably. Open-source generators like `syft` and `cdxgen` produce high-quality output. Platforms like Dependency-Track handle ingestion and continuous monitoring. Standards like CycloneDX 1.5 and VEX provide the data model. The missing piece for most organizations is not technology but **process**: wiring these tools together into automated workflows that make SBOMs a natural byproduct of building software rather than a burden imposed by procurement.

Start with CI/CD integration. Add vulnerability correlation. Build from there. The organizations that invest in SBOM operationalization today will be the ones best positioned to respond when the next Log4Shell-scale event demands an immediate answer to the question: "Are we affected?"
