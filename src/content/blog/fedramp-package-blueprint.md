---
title: "One Program, Three Package Shapes: Architecting for FedRAMP 20x, Rev5 under CR26, and Legacy Buyers"
image: "/blog/fedramp-package-blueprint-hero.png"
imageAlt: "One program, three package shapes: the FedRAMP rules moved to 20x and CR26, but agency AOs and the DoD equivalency process still require the legacy SSP and POA&M"
description: "FedRAMP retired the SSP and POA&M. Agencies and the DoD equivalency process still require them. A blueprint for building one evidence layer that emits every package shape a buyer asks for."
date: 2026-09-24
category: "Industry Insights"
tags:
  - "FedRAMP"
  - "20x"
  - "CR26"
  - "Consolidated Rules"
  - "Rev5"
  - "FedRAMP equivalency"
  - "DFARS 7012"
  - "SDR"
  - "compliance"
  - "public sector"
---

FedRAMP has rebuilt itself. The JAB is gone, 20x has been granting authorizations since the 2025 pilots, and the Consolidated Rules for 2026 took effect on July 4, 2026, becoming mandatory for all stakeholders on January 1, 2027. Under CR26 the System Security Plan and the POA&M are retired artifacts: the Security Decision Record replaces them, evidence is machine-readable, and validation is persistent. FedRAMP stops accepting new Rev5 applications on June 11, 2027 and plans to sunset existing Rev5 authorizations by December 31, 2028.

The buyers have not moved at the same speed. Agency authorizing officials still ask for the SSP and the POA&M, and are expected to keep asking after providers stop producing them. Procurement language still cites Rev5 artifacts by name. And for cloud services sold to defense contractors handling CUI, the DoD's FedRAMP Moderate equivalency memo defines the required body of evidence as exactly the legacy package: SSP, SAP, SAR, and POA&M, covering 100% of the Moderate baseline, assessed by a 3PAO, with every POA&M item closed.

**That is the split: the modern rules retire the exact documents the legacy buyers still require.** Build only for the new world and you cannot sell into the old one. Build only the old package and you are building on a foundation with a published sunset date. Most providers will spend 2026 through 2028 needing both, and the answer is not parallel compliance programs. It is one security program, one evidence layer, and package emitters that produce whatever shape the buyer requires.

## The three package shapes

<style>
  .fig3t { border: 1px solid var(--rule); border-radius: var(--radius-sm); background: var(--surface); padding: 18px 20px 14px; margin: 1.6em 0 0.4em; font-size: 13px; line-height: 1.45; }
  .fig3t-kicker { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sunset); margin-bottom: 12px; }
  .fig3t-scroll { overflow-x: auto; }
  .fig3t-m { display: grid; grid-template-columns: 100px repeat(3, minmax(170px, 1fr)); min-width: 660px; gap: 1px; background: var(--rule); border: 1px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .fig3t-m > div, .fig3t-row > div { background: var(--surface-2); padding: 9px 11px; }
  .fig3t-h { font-family: var(--font-display); font-weight: 600; font-size: 13.5px; color: #08131a; }
  .fig3t-h small { display: block; font-family: var(--font-body); font-weight: 400; font-size: 10.5px; opacity: 0.85; }
  .fig3t-h.x { background: #5aa9c9; } .fig3t-h.r { background: #46b98a; } .fig3t-h.l { background: #ffb347; }
  .fig3t-rh { font-size: 11.5px; color: var(--text); font-weight: 600; background: var(--surface); }
  .fig3t-m p { margin: 0 !important; font-size: 11.5px !important; line-height: 1.45 !important; color: var(--text-dim); }
  .fig3t-m p b { color: var(--text); }
  .fig3t-row { display: contents; }
  .fig3t-row:hover > div { background: var(--surface-3); }
  .fig3t-legend { margin-top: 10px; font-size: 11.5px; color: var(--text-dim); }
  .fig3t-src { border-top: 1px solid var(--rule); margin-top: 12px; padding-top: 8px; font-size: 10.5px; color: var(--text-faint); }
</style>
<figure class="fig3t" role="img" aria-label="Comparison of FedRAMP 20x, Rev5 under the Consolidated Rules for 2026, and legacy plus DoD equivalency expectations across core record, evidence style, assessment, and timeline">
  <div class="fig3t-kicker">Three package shapes, one program</div>
  <div class="fig3t-scroll"><div class="fig3t-m">
    <div class="fig3t-rh"></div>
    <div class="fig3t-h x">FedRAMP 20x<small>The destination</small></div>
    <div class="fig3t-h r">Rev5 under CR26<small>The bridge</small></div>
    <div class="fig3t-h l">Legacy &amp; equivalency<small>The buyer reality</small></div>
    <div class="fig3t-row"><div class="fig3t-rh">Core record</div><div><p><b>SDR</b> with KSI summaries, human-readable + JSON</p></div><div><p><b>SDR</b> with control summaries; SSP and POA&amp;M retired; VDR/VER; configuration guides</p></div><div><p><b>SSP, SAP, SAR, POA&amp;M</b>, monthly ConMon deliverables</p></div></div>
    <div class="fig3t-row"><div class="fig3t-rh">Evidence</div><div><p>Machine-readable measures, persistent validation, class-scaled metric history</p></div><div><p>Continuous monitoring broadened, availability reporting added</p></div><div><p>Narrative documents; equivalency demands 100% of Moderate, all POA&amp;Ms closed</p></div></div>
    <div class="fig3t-row"><div class="fig3t-rh">Assessment</div><div><p>Independent assessor at least yearly (Classes B&ndash;D)</p></div><div><p>3PAO annual assessment under updated rules</p></div><div><p>3PAO assessment; DCMA DIBCAC validates the contractor side</p></div></div>
    <div class="fig3t-row"><div class="fig3t-rh">Clock</div><div><p>Open now; Phase 3 formalizes wide-scale adoption</p></div><div><p>Mandatory Jan 1, 2027; no new Rev5 applications after Jun 11, 2027</p></div><div><p>Persists until buyers and the DoD memo move; Rev5 riders end with the Dec 31, 2028 sunset</p></div></div>
  </div></div>
  <div class="fig3t-legend">Hover a row to compare it across shapes. Same security program, three different outputs.</div>
  <div class="fig3t-src">Sources: FedRAMP Consolidated Rules for 2026 (fedramp.gov/2026, github.com/FedRAMP/rules); DoD FedRAMP Moderate Equivalency memo (December 2023), DFARS 252.204-7012.</div>
</figure>

*The three shapes a single set of security facts must take, depending on who is buying.*

## What the blueprint covers

The whitepaper is written for teams that have to architect and build these packages, not just read about them. Inside:

- **The problem, stated plainly**: two clocks running, with the rules retiring documents on one schedule and buyers still requesting them on another
- **The three tracks in one view**: 20x, Rev5 under CR26, and legacy/equivalency compared on core record, evidence style, assessment, and deadlines
- **A buyer-driven decision flow**: which shape you owe when your reliance comes from a civilian agency, an existing Rev5 ATO, or defense contractors under DFARS 7012
- **The blueprint**: one evidence layer built from FedRAMP's machine-readable rules, with a measurement pipeline, the Security Decision Record as the single source of truth, and emitters that render the 20x package, the CR26 package, and the legacy SSP/POA&M/equivalency body of evidence from the same records
- **The way ahead**: a phased build sequence and the failure modes that sink these projects, starting with writing the SSP first and reverse-engineering the evidence

<div class="cta-row">
  <a class="btn btn-primary" href="/blog/fedramp-package-blueprint/FedRAMP-Package-Blueprint.pdf">Download the whitepaper →</a>
  <a class="btn btn-ghost" href="/contact">Book a scoping call</a>
</div>

## Build the packages once

**Architecting for 20x, operating a Rev5 authorization under the 2026 rules, or facing an equivalency ask from a defense prime?** This is the problem we build for at Optimal: evidence that runs on its own, a Security Decision Record your assessor can verify, and the legacy documents rendered from it rather than authored in parallel. [Schedule a 30-minute conversation](https://calendly.com/ryan-gooptimal/30min).

### Sources

- [FedRAMP Consolidated Rules for 2026](https://fedramp.gov/2026/rules/)
- [What's changing for Rev5 providers](https://www.fedramp.gov/2026/providers/updating/changes/)
- [FedRAMP machine-readable rules](https://github.com/FedRAMP/rules)
- [20x Key Security Indicators](https://fedramp.gov/2026/providers/20x/key-security-indicators/)
- DoD FedRAMP Moderate Equivalency memo (December 2023); DFARS 252.204-7012
