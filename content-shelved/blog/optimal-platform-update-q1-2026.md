---
title: "Platform Update: What's New in Optimal Q1 2026"
image: "/blog/platform-update.jpg"
imageAlt: "Optimal platform update, Q1 2026"
description: "Runtime threat detection, enhanced SBOM dependency graphs, STIG automation improvements, AI security enhancements, and more. Everything shipping in Optimal Q1 2026."
date: 2026-01-05
category: "Products"
tags:
  - "product update"
  - "runtime security"
  - "SBOM"
  - "STIG"
  - "Optimal"
---

Q1 2026 marks one of the most significant releases in the history of the Optimal platform. Over the past several months, our engineering team has been heads-down building the capabilities that security teams and developers have been asking for -- from real-time runtime monitoring to dramatically improved compliance automation workflows. This update covers the major features and improvements shipping this quarter, along with a preview of what we have planned for Q2.

Whether you are a security engineer tracking vulnerabilities across a containerized microservices architecture, a compliance lead preparing for an ATO assessment, or a developer integrating security checks into your CI/CD pipeline, there is something meaningful for you in this release.

## Runtime Threat Detection

The most requested feature of the past year is here. Optimal now provides **real-time runtime threat detection** for containers and workloads running in Kubernetes environments. Built on eBPF (extended Berkeley Packet Filter) technology, our runtime agent operates at the kernel level to observe system calls, network connections, and file access patterns without introducing meaningful performance overhead.

What makes this different from existing runtime security tools is the integration with the rest of the Optimal platform. When our runtime agent detects anomalous behavior -- such as an unexpected outbound network connection, a privilege escalation attempt, or a binary execution that deviates from the container's baseline profile -- it automatically correlates the event with vulnerability data already tracked in your Optimal workspace. If a container image has a known CVE that matches the observed exploit pattern, the alert is enriched with that context before it reaches your security team.

- **eBPF-based kernel instrumentation** with less than 1% CPU overhead in production benchmarks
- **Behavioral baselining** that learns normal container activity during a configurable observation period
- **Automatic CVE correlation** linking runtime events to known vulnerabilities in your SBOM
- **Kubernetes-native deployment** via Helm chart with support for EKS, GKE, AKS, and on-premise clusters
- **Real-time alerting** through Slack, PagerDuty, and webhook integrations

Runtime detection is available today in beta for teams on the Enterprise plan. General availability is expected by mid-March 2026.

## Enhanced SBOM Dependency Graphs

Software Bill of Materials management has been a core capability of Optimal since day one. In Q1 2026, we are taking SBOM visibility to the next level with **interactive dependency graph visualizations** that make it dramatically easier to understand and act on supply chain risk.

The new dependency graph view renders your entire software supply chain as a navigable, zoomable tree. Direct dependencies are displayed at the top level, with transitive dependencies expanding beneath them. Each node in the graph is color-coded by risk: green for components with no known vulnerabilities, amber for components with medium-severity issues, and red for components carrying critical or high-severity CVEs.

Beyond vulnerability data, we have added **license risk scoring** to every dependency node. Optimal now evaluates license compatibility across your full dependency tree and flags potential conflicts -- for example, a GPL-licensed transitive dependency pulled into a proprietary project. This is especially critical for teams operating in regulated environments where license compliance is a contractual requirement.

- **Visual dependency trees** with drill-down from direct to nth-degree transitive dependencies
- **Transitive dependency tracking** that identifies the full path from your code to a vulnerable component
- **License risk scoring** with automatic conflict detection across dependency chains
- **SBOM diff view** showing exactly what changed between two builds or releases
- Support for **CycloneDX 1.6** and **SPDX 3.0** formats

## STIG Automation Improvements

STIG compliance remains one of the most time-consuming aspects of achieving and maintaining an Authority to Operate. In this release, we have made substantial improvements to our STIG automation engine that reduce both the time and manual effort required to assess and remediate against DISA benchmarks.

**Benchmarking speed has improved by 3x** compared to the previous release. Our assessment engine now parallelizes checks across multiple system targets simultaneously, and we have optimized the evaluation logic for several high-volume STIGs including the Windows Server 2022 STIG and the Red Hat Enterprise Linux 9 STIG. What previously took 45 minutes to assess across a fleet of 50 systems now completes in under 15 minutes.

We are also introducing **auto-remediation scripts** for a growing subset of STIG findings. When Optimal identifies a non-compliant configuration, it can now generate and optionally execute remediation scripts tailored to your specific environment. Each script is reviewed and validated against the relevant STIG checklist item before being made available, and every remediation action is logged with a full audit trail for compliance documentation.

- **3x faster benchmarking** through parallelized assessment and optimized check logic
- **Auto-remediation scripts** for over 200 common STIG findings across Windows and Linux
- **Expanded STIG library** with 15 new benchmarks added this quarter, including Kubernetes STIG v2 and PostgreSQL 15
- **Continuous monitoring mode** that re-evaluates STIG compliance on a configurable schedule

## AI Security Enhancements

As organizations accelerate their adoption of large language models and generative AI systems, the attack surface for AI-specific threats continues to expand. Optimal's AI security module has received several important updates in Q1 2026 to help teams stay ahead of these emerging risks.

Our integration with **NVIDIA Garak**, the open-source LLM vulnerability scanner, has been significantly enhanced. Optimal now orchestrates Garak scans directly from the platform dashboard, with results automatically mapped to the OWASP AI Security Verification Standard (AISVS) framework. This means your AI security posture is assessed against an industry-recognized benchmark rather than ad-hoc test suites.

We have also expanded our library of **prompt injection test patterns** to cover the latest attack techniques documented by the research community. The new patterns include multi-turn conversation manipulation, indirect prompt injection via retrieved context (relevant for RAG architectures), and encoding-based evasion techniques that attempt to bypass input sanitization filters.

- **NVIDIA Garak integration** with one-click scan orchestration and automated result ingestion
- **OWASP AISVS scoring** providing a standardized maturity score for your AI security posture
- **50+ new prompt injection patterns** covering multi-turn, indirect, and encoding-based attacks
- **Model card generation** that documents security properties alongside model metadata
- **RAG pipeline analysis** evaluating retrieval-augmented generation systems for data leakage risks

## Developer Experience Updates

Security tooling only works if developers actually use it. We have invested heavily in reducing friction across every touchpoint where developers interact with Optimal.

The **Optimal CLI** (`optimal-cli`) has been rewritten in Rust for significantly faster startup and execution times. The new CLI supports all major scanning operations -- vulnerability scans, SBOM generation, STIG checks, and AI security assessments -- with a consistent command interface. Configuration is handled through a simple `.optimal.yml` file at the root of your repository.

For teams using GitHub, we have released an official **GitHub Actions integration** that runs Optimal scans as part of your pull request workflow. Scan results are posted as PR comments with inline annotations, so developers can see security findings directly in their code review flow without switching to a separate dashboard.

- **Rust-based CLI** with 10x faster cold start compared to the previous Node.js implementation
- **GitHub Actions marketplace action** with PR comment annotations and status check integration
- **Scan time improvements** averaging 40% faster across vulnerability and SBOM scans
- **VS Code extension** (preview) providing inline vulnerability highlighting as you code
- **API v2** with OpenAPI 3.1 specification and auto-generated client libraries for Python, Go, and TypeScript

## What's Coming Next

Looking ahead to Q2 2026, we are focused on three major initiatives. First, **FedRAMP continuous monitoring dashboards** that aggregate compliance data across all Optimal modules into a single view tailored for Authorizing Officials and ISSMs. Second, **multi-cloud asset discovery** that automatically inventories your AWS, Azure, and GCP resources and maps them to your security policies. Third, **collaborative remediation workflows** with built-in assignment, SLA tracking, and evidence collection for audit readiness.

We will share more details on the Q2 roadmap in the coming weeks. If there is a specific capability you would like to see prioritized, reach out to your account team or drop a suggestion in our [documentation portal](/contact).

> "Our mission is to make security an accelerator rather than a bottleneck. Every feature we ship is measured against a simple question: does this help teams deliver secure software faster? The Q1 2026 release represents a major step forward on that promise, and we are just getting started."

We are grateful to every customer, design partner, and community member who provided feedback that shaped this release. If you are not yet using Optimal and want to see these capabilities in action, [request access](/contact) and our team will walk you through the platform.
