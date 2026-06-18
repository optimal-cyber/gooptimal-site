---
title: "The ATO Bottleneck: Why Authorization Takes So Long and What Actually Fixes It"
image: "/blog/ato-bottleneck.svg"
imageAlt: "The ATO bottleneck and what actually fixes it"
description: "The ATO process was designed to manage risk. Instead, it has become the risk. Delaying mission-critical deployments by 12 to 18 months while actual security posture degrades. Here is what is broken and what the path forward looks like across DoW, civilian, and IC environments."
date: 2026-03-05
category: "Industry Insights"
tags:
  - "ATO"
  - "cATO"
  - "RMF"
  - "NIST"
  - "FedRAMP"
  - "compliance automation"
  - "DevSecOps"
  - "Secure-by-Design"
  - "OSCAL"
---

The Authority to Operate was supposed to be a risk management decision. An Authorizing Official reviews the security posture of a system, weighs the residual risk against the mission need, and makes a judgment call. In theory, this is one of the more elegant constructs in federal cybersecurity -- a named human being accepting accountability for a specific system in a specific operational context.

In practice, the ATO has become something else entirely. It has become a 12-to-18-month bureaucratic obstacle course where the actual risk decision -- the thing the whole process exists to support -- gets buried under thousands of pages of documentation, months of evidence gathering, and organizational bottlenecks that have nothing to do with security. The process designed to manage risk has become the risk, delaying mission-critical deployments while the systems waiting for authorization grow staler and less secure by the day.

This is not a new observation. But the gap between what the ATO process could be and what it actually is in most organizations has grown wide enough that it demands a serious examination of root causes -- not just complaints about the timeline.

## Where the Time Actually Goes

When you break down an 18-month ATO timeline, the distribution of effort is revealing. Very little of that time is spent on what most people would consider "security work." The majority goes to documentation production, evidence assembly, organizational coordination, and waiting in queues. Understanding where the bottlenecks cluster is the first step toward fixing them.

### Documentation That Describes Instead of Proves

The [NIST Risk Management Framework (RMF)](https://csrc.nist.gov/projects/risk-management/about-rmf) structures the ATO process through seven phases: Prepare, Categorize, Select, Implement, Assess, Authorize, and Monitor. At the center of most implementations is the System Security Plan (SSP), a document that describes how each [NIST 800-53](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) control is implemented for a given system.

The SSP is where the process starts to break down. In most organizations, the SSP is a Word document -- hundreds of pages of narrative control implementation statements written by compliance analysts who may or may not have deep visibility into how the system actually works. The document describes the intent behind each control. It does not prove the control is operating. By the time the SSP is complete, the system it describes has often changed. Diagrams are outdated. Shared responsibilities are poorly delineated. The document is a snapshot of a conversation, not an audit of a system.

Assessors know this. They spend significant time cross-referencing SSP narratives against actual system configurations, finding inconsistencies, and sending them back for rework. This cycle -- write, review, find gaps, rewrite -- accounts for months of elapsed time in a typical authorization.

### Manual Evidence Collection

For every control in the SSP, the assessment team needs evidence that the control is implemented and operating effectively. In most organizations, this evidence is gathered manually: screenshots of console configurations, exports from vulnerability scanners, policy documents pulled from SharePoint, access control lists copied from identity providers.

The problems with manual evidence are well documented. It is time-consuming to collect. It is stale by the time it reaches the assessor. It is inconsistent in format across different teams and tools. And it creates a perverse incentive: teams optimize for producing evidence that looks good rather than evidence that accurately reflects the system's security posture. This is what practitioners call **compliance theater** -- the checkbox mentality where a "good-looking package" becomes the goal instead of actual risk reduction.

### Interpretation Variability

NIST 800-53 controls are deliberately written at a level of abstraction that allows them to apply across diverse systems. But that abstraction creates interpretation problems. How strictly should `AC-2` (Account Management) be implemented for a cloud-native microservices application versus a legacy mainframe? What constitutes "adequate" audit logging under `AU-2`? Different assessors, different agencies, and different [3PAOs](https://www.fedramp.gov/assessors/) arrive at different answers.

This variability means that teams preparing for assessment are often aiming at a moving target. Controls that passed one assessment may be flagged in another. Organizations that operate across multiple agencies or serve both civilian and [Department of War (DoW)](https://www.disa.mil/) customers encounter this most acutely -- the same system may need to satisfy different interpretations of the same controls depending on who is reviewing the package.

### Organizational Queues

Even when the technical work is complete, organizational bottlenecks add months. The Authorizing Official's office may have a queue of packages awaiting review. The 3PAO may be booked out for months. [FedRAMP](https://www.fedramp.gov/) JAB reviews have their own backlog. Within DoW, [DISA's authorization pipeline](https://public.cyber.mil/dccs/) operates on its own cadence. None of these queues are within the control of the team seeking authorization, yet they often represent the largest single block of elapsed time.

## The Authorizing Official Problem

At the center of every ATO is a human being -- the Authorizing Official -- who is legally empowered to accept risk on behalf of the organization. This is the right construct. Someone with authority and accountability should make the risk decision. The problem is what we are asking them to decide based on.

In the current model, an AO is handed a package of static documents -- the SSP, the Security Assessment Report (SAR), the Plan of Action and Milestones (POA&M) -- and asked to make a risk determination. These documents represent a point-in-time snapshot assembled weeks or months ago. The AO has no way to verify whether the system still looks the way the documents describe. They are making a decision about a moving system based on a still photograph.

When the information is incomplete, ambiguous, or stale, the AO faces an impossible choice: approve a system they are not confident about, delay the authorization to demand more information (adding months), or reject and trigger a full rework cycle. Risk-averse AOs -- which is most of them, because their name is on the authorization letter -- default to delay. Not because they are obstructionist, but because the information they are receiving does not give them the confidence to decide.

> The ATO bottleneck is not fundamentally a documentation problem or a process problem. It is an information quality problem. Authorizing Officials are making high-stakes decisions based on low-fidelity evidence. Fix the evidence, and the decisions get faster.

## What Actually Fixes It

The good news is that the path forward is not theoretical. The technologies, frameworks, and operational models exist today. The challenge is adoption -- bridging the gap between what is possible and what most organizations are actually doing.

### Secure-by-Design: Compliance as an Engineering Output

The single highest-leverage change an organization can make is to stop treating compliance as something that happens after the system is built and start treating it as an output of the engineering process itself. This is the core of the **Secure-by-Design (SbD)** model.

In practical terms, SbD means:

- **Threat modeling during design**, not as an afterthought during assessment. When you identify threats during the [RMF Categorize phase](https://csrc.nist.gov/projects/risk-management/about-rmf), you select controls that actually address your risk profile rather than mechanically applying the full baseline.
- **Infrastructure as Code (IaC)** that expresses security controls in executable form. Your Terraform modules, Helm charts, and CloudFormation templates are not just deployment artifacts -- they are control implementation evidence. When your [AWS GovCloud](https://aws.amazon.com/govcloud-us/) VPC configuration enforces network segmentation, the code is the proof.
- **Hardened baselines from day one.** Start from [DISA STIG](https://public.cyber.mil/stigs/)-hardened images, Iron Bank containers, or CIS benchmarked configurations. Do not build on permissive defaults and try to lock down later.
- **Policy-as-code** enforcement using tools like Open Policy Agent or Terraform Sentinel to prevent non-compliant configurations from reaching production. The guardrails are in the pipeline, not in a review meeting.

When security is embedded in the engineering workflow, the SSP stops being a document someone writes from memory and starts being a document generated from the actual state of the system. This is the shift from describing compliance to demonstrating it.

### Automated Evidence Generation

The most direct attack on the ATO timeline is eliminating manual evidence collection. Every piece of evidence that can be generated automatically -- as a byproduct of normal system operations -- is a piece of evidence that is current, consistent, and available on demand.

- **Vulnerability scans** run on every build and publish results to a central dashboard. When an assessor asks for scan evidence, you export the latest results. No scrambling, no screenshots.
- **Configuration compliance checks** run continuously against STIG or CIS benchmarks. Drift is detected in real time, not during annual assessments.
- **Access control evidence** is pulled directly from your identity provider's API -- Okta, Azure AD, or your agency's ICAM solution -- showing who has access, what roles they hold, and when access was last reviewed.
- **Change management records** are generated from Git commit history and CI/CD pipeline logs. Every deployment has a traceable audit trail.
- **SBOM generation** happens automatically during the build process, mapping every dependency to known vulnerabilities via [NVD](https://nvd.nist.gov/) and providing assessors with a current software inventory.

The output format matters too. [OSCAL (Open Security Controls Assessment Language)](https://pages.nist.gov/OSCAL/) is the emerging standard for machine-readable compliance artifacts. When your evidence is OSCAL-formatted, it can be ingested by assessment tools, compared across systems, and validated programmatically. It is the difference between handing an assessor a binder and handing them a queryable dataset.

### Continuous ATO: Authorization as a Living State

The ultimate evolution of the ATO model is **continuous ATO (cATO)**, where authorization is not a point-in-time event but an ongoing, evidence-driven state. DoW has been pushing toward cATO through directives like the [DoW DevSecOps Reference Design](https://dodcio.defense.gov/Portals/0/Documents/Library/DevSecOps-Playbook_DoD.pdf), and civilian agencies are moving in the same direction under [NIST SP 800-137](https://csrc.nist.gov/publications/detail/sp/800-137/final) continuous monitoring guidance.

In a cATO model, the system continuously generates telemetry that maps to RMF controls. Security posture is represented as a live dashboard, not a static document. The Authorizing Official does not review a package once a year -- they have ongoing visibility into whether the system is meeting its security baseline. When something drifts out of compliance, it shows up immediately, not at the next annual review.

This fundamentally changes the AO's role. Instead of being a gate that a package must pass through, the AO becomes a continuous partner in system oversight. The decision shifts from "do I approve this based on documents I received last month" to "is the live evidence telling me this system is acceptable right now." That is a dramatically more informed -- and faster -- risk decision.

## The Workforce Gap Nobody Wants to Talk About

All of the technical solutions above require something the federal ecosystem is chronically short on: people who can operate at the intersection of compliance and engineering. The traditional compliance workforce -- GRC analysts who know [FISMA](https://www.congress.gov/bill/113th-congress/senate-bill/2521) and RMF inside and out -- often lacks the engineering skills to build automated evidence pipelines or evaluate infrastructure-as-code. The engineering workforce -- DevOps engineers who build cloud infrastructure daily -- often has no training in RMF phases, control selection rationale, or how Authorizing Officials think about risk.

The organizations that move fastest through authorization are the ones building what you might call **GRC engineers** -- hybrid professionals who understand both worlds. They can write a Terraform module that enforces `SC-28` (Protection of Information at Rest) and explain to an assessor why the implementation satisfies the control objective. They can read a SAR and translate the findings into engineering tickets. They speak both policy and pipeline.

This is not just a hiring problem. It is a training problem. Organizations need to invest in cross-training: teach compliance staff how CI/CD pipelines work, and teach engineers why the RMF exists and what an AO actually needs to make a decision. The [DoW 8570/8140](https://public.cyber.mil/cw/cwmp/dod-approved-8570-baseline-certifications/) workforce certification framework provides the structure, but the bridge between compliance certifications and engineering competencies is still being built.

## The Shared Responsibility Trap

In cloud-hosted environments, the control responsibility model adds another layer of complexity. Cloud Service Providers like [AWS](https://aws.amazon.com/compliance/shared-responsibility-model/), [Azure Government](https://azure.microsoft.com/en-us/explore/global-infrastructure/government), [Google Cloud Assured Workloads](https://cloud.google.com/assured-workloads), and [Oracle Cloud for Government](https://www.oracle.com/government/) handle infrastructure-level controls -- physical security, hypervisor hardening, network backbone encryption. Agency teams handle application-level controls -- authentication, authorization, input validation, application logging.

The gap lives in the shared controls -- the ones where the CSP provides a capability and the customer must configure it correctly. Encryption at rest is a classic example: the CSP provides the KMS service, but the customer must enable it, select the right key type, configure rotation, and document the implementation. When this shared boundary is poorly understood, controls fall through the cracks. The CSP's Customer Responsibility Matrix (CRM) says one thing, the agency's SSP says another, and the assessor finds the gap.

Modern vendors increasingly supply Machine-Readable Authorization (MRA) artifacts and [OSCAL](https://pages.nist.gov/OSCAL/)-formatted documentation, which helps. But the operational discipline of maintaining an accurate control inheritance model -- and keeping it current as both the CSP and the customer's environment evolve -- remains one of the more underappreciated sources of ATO delay.

## What Is Coming Next

The ATO landscape is not static. Several emerging vectors will add new complexity to authorization decisions in the next two to three years:

- **AI and ML systems** introduce authorization challenges that existing control frameworks were not designed for. [NIST's AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence) provides initial guidance on documenting model provenance, training data integrity, and bias mitigation, but the mapping to 800-53 controls is still immature. How do you assess an AI system whose behavior changes with new training data?
- **Post-quantum cryptography** migration is no longer hypothetical. [NIST has finalized quantum-resistant algorithms](https://csrc.nist.gov/projects/post-quantum-cryptography), and agencies are being urged to inventory vulnerable cryptographic implementations. ATO packages will increasingly need to demonstrate PQC migration readiness and document quantum-vulnerable encryption in the POA&M.
- **Supply chain assurance** continues to mature. Automated SBOM generation is becoming table stakes, but the next wave involves continuous dependency monitoring -- where every library update triggers a compliance revalidation to prevent what some call "ATO decay," where an authorized system silently drifts out of compliance as dependencies accumulate vulnerabilities.

## A Practical Starting Point

If your organization is stuck in the traditional ATO model and the ideas above feel overwhelming, start with three concrete steps:

1. **Automate one evidence domain.** Pick the most painful manual evidence collection task -- vulnerability scanning is usually the easiest win -- and automate it end-to-end. Run scans in CI, publish results to a dashboard, and export them in a format your assessor accepts. One automated evidence stream proves the concept and builds organizational confidence for the next one.
2. **Build a living control inheritance matrix.** Map every control in your baseline to its responsibility: inherited, shared, or customer. Reference the CSP's CRM. Make it a living document that updates as your environment changes. This single artifact eliminates a disproportionate amount of assessment friction.
3. **Give your AO a dashboard.** Even before full cATO, provide your Authorizing Official with a live view of key security metrics -- vulnerability counts, configuration compliance percentages, access review status. An AO who can see the system's posture in real time makes faster, more confident decisions than one reading a six-week-old document.

## The Bottom Line

The ATO process is not going away. Nor should it. The concept -- a named individual accepting risk based on evidence -- is sound. What is broken is the information layer between the system and the decision. When that layer is composed of static documents, manual screenshots, and stale evidence, the process takes 18 months and produces mediocre security outcomes. When that layer is composed of automated telemetry, machine-readable artifacts, and live dashboards, the same process can take weeks and produce dramatically better security outcomes.

The bottleneck was never the controls. It was never the framework. It was the gap between how we build systems and how we prove they are secure. Close that gap, and the ATO becomes what it was always meant to be: a risk decision, not a paperwork exercise.

**Ready to eliminate the ATO bottleneck?** [Request a demo](/demo) to see how Optimal automates evidence collection, STIG compliance, and continuous monitoring -- compressing authorization timelines from months to weeks across DoW and civilian frameworks.
