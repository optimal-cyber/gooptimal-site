---
title: "Validating FedRAMP 20x Key Security Indicators: What Verification and Validation Actually Require"
image: "/blog/ksi-themes.png"
imageAlt: "Grid of the 10 FedRAMP 20x KSI themes and their 46 indicators, with 5 class-varying indicators highlighted"
description: "Under the Consolidated Rules for 2026, a KSI is an outcome you have to prove, keep proving and have independently confirmed. Here's what the rules actually require."
date: 2026-09-23
category: "Industry Insights"
tags:
  - "FedRAMP"
  - "20x"
  - "KSI"
  - "Key Security Indicators"
  - "SDR"
  - "compliance"
  - "cloud authorization"
  - "continuous monitoring"
  - "public sector"
---

Most teams starting FedRAMP 20x ask the same question first: "Which controls map to which KSI?" It feels like the natural place to start, because for a decade FedRAMP meant a control baseline, a System Security Plan and a spreadsheet of evidence. But it's the wrong first question. FedRAMP says so directly on its KSI overview page: "Do not attempt to approach Key Security Indicators from a traditional compliance standpoint!"

Under the Consolidated Rules for 2026, a KSI isn't a control to describe. It's a security outcome you have to show is happening, keep showing, and have an independent assessor confirm. FedRAMP puts it this way: "Security controls define required protections, but Key Security Indicators provide measurable validation that those protections are functioning properly."

This post covers what the rules actually ask for when it comes to validating KSIs, and where teams tend to go wrong.

<style>
  .fig20x { border: 1px solid var(--rule); border-radius: var(--radius-sm); background: var(--surface); padding: 20px 22px 16px; margin: 1.6em 0 0.4em; font-size: 13px; line-height: 1.45; }
  .fig20x-kicker { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sunset); margin-bottom: 6px; }
  .fig20x-title { font-family: var(--font-display); font-weight: 600; font-size: 17px; color: var(--text); margin-bottom: 14px; }
  .fig20x-src { border-top: 1px solid var(--rule); margin-top: 14px; padding-top: 9px; font-size: 10.5px; color: var(--text-faint); }
  .fig20x .id { font-family: var(--font-mono); font-size: 0.92em; color: var(--text-faint); }
  /* Themes grid */
  .fig20x-theme { border: 1px solid var(--rule); border-radius: 9px; background: var(--surface-2); padding: 10px 12px; margin-bottom: 8px; }
  .fig20x-th { display: flex; align-items: baseline; gap: 8px; margin-bottom: 7px; }
  .fig20x-abbr { font-family: var(--font-mono); font-size: 10px; font-weight: 600; color: var(--steel); background: color-mix(in srgb, var(--steel) 12%, transparent); border: 1px solid color-mix(in srgb, var(--steel) 35%, transparent); border-radius: 4px; padding: 1px 6px; }
  .fig20x-th b { font-family: var(--font-display); font-weight: 600; font-size: 14px; color: var(--text); flex: 1; }
  .fig20x-n { font-family: var(--font-display); font-weight: 700; color: var(--text-dim); }
  .fig20x-chips { display: flex; flex-wrap: wrap; gap: 4px; }
  .fig20x-chip { font-size: 11px; color: var(--text-dim); border: 1px solid var(--rule-strong); border-radius: 999px; padding: 3px 9px; background: var(--surface); transition: border-color .15s, color .15s; cursor: default; }
  .fig20x-chip:hover { border-color: var(--steel); color: var(--text); }
  .fig20x-chip.vary { color: #ffb347; border-color: rgba(255,179,71,0.55); background: rgba(255,179,71,0.08); cursor: help; }
  .fig20x-chip.vary:hover { border-color: #ffb347; }
  .fig20x-legend { margin-top: 10px; font-size: 11.5px; color: var(--text-dim); }
  /* Flow lanes */
  .fig20x-lane { margin-bottom: 12px; }
  .fig20x-lanetag { display: inline-block; font-family: var(--font-display); font-weight: 600; font-size: 12.5px; border-radius: 6px; padding: 3px 10px; margin-bottom: 7px; }
  .fig20x-lanetag.p { color: var(--steel); background: color-mix(in srgb, var(--steel) 13%, transparent); border: 1px solid color-mix(in srgb, var(--steel) 40%, transparent); }
  .fig20x-lanetag.a { color: var(--seafoam); background: color-mix(in srgb, var(--seafoam) 11%, transparent); border: 1px solid color-mix(in srgb, var(--seafoam) 40%, transparent); }
  .fig20x-lanetag.r { color: var(--sunset); background: color-mix(in srgb, var(--sunset) 10%, transparent); border: 1px solid color-mix(in srgb, var(--sunset) 40%, transparent); }
  .fig20x-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 7px; }
  .fig20x-step { border: 1px solid var(--rule); border-radius: 8px; background: var(--surface-2); padding: 9px 11px; transition: border-color .15s, transform .15s; }
  .fig20x-lane.pl .fig20x-step { border-top: 2px solid color-mix(in srgb, var(--steel) 55%, transparent); }
  .fig20x-lane.al .fig20x-step { border-top: 2px solid color-mix(in srgb, var(--seafoam) 55%, transparent); }
  .fig20x-lane.rl .fig20x-step { border-top: 2px solid color-mix(in srgb, var(--sunset) 55%, transparent); }
  .fig20x-step:hover { border-color: var(--rule-strong); transform: translateY(-2px); }
  .fig20x-step b { display: block; font-family: var(--font-display); font-weight: 600; font-size: 12.5px; color: var(--text); margin-bottom: 3px; }
  .fig20x-step .num { display: inline-flex; width: 15px; height: 15px; border-radius: 50%; background: var(--steel); color: #08131a; font-size: 10px; font-weight: 700; align-items: center; justify-content: center; margin-right: 5px; transform: translateY(1.5px); }
  .fig20x-step p { margin: 0 !important; font-size: 11.5px !important; line-height: 1.45 !important; color: var(--text-dim); }
  .fig20x-note { margin-top: 11px; padding: 8px 12px; border-radius: 7px; font-size: 12px; color: var(--text-dim); background: rgba(255,138,61,0.06); border: 1px solid rgba(255,138,61,0.3); }
  .fig20x-note b { color: var(--sunset); }
  /* Class matrix */
  .fig20x-scroll { overflow-x: auto; }
  .fig20x-matrix { display: grid; grid-template-columns: 150px repeat(4, minmax(140px, 1fr)); min-width: 740px; gap: 1px; background: var(--rule); border: 1px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .fig20x-cell { background: var(--surface-2); padding: 9px 11px; }
  .fig20x-cell.h { font-family: var(--font-display); font-weight: 600; font-size: 13px; color: #08131a; }
  .fig20x-cell.h.a { background: #bcd7e4; } .fig20x-cell.h.b { background: #8fbcd3; } .fig20x-cell.h.c { background: #5aa9c9; } .fig20x-cell.h.d { background: #2f7395; color: #eef1f7; }
  .fig20x-cell.rh { font-size: 12px; color: var(--text); font-weight: 600; background: var(--surface); }
  .fig20x-cell.rh .id { display: block; font-weight: 400; font-size: 9.5px; margin-top: 2px; }
  .fig20x-cell p { margin: 0 !important; font-size: 11.5px !important; line-height: 1.4 !important; color: var(--text-dim); }
  .fig20x-row:hover .fig20x-cell { background: var(--surface-3); }
  .fig20x-row { display: contents; }
  .fig20x-tag { display: inline-block; font-family: var(--font-mono); font-size: 9.5px; font-weight: 600; letter-spacing: 0.05em; border-radius: 4px; padding: 1.5px 6px; margin-bottom: 4px; }
  .fig20x-tag.must { color: var(--seafoam); background: color-mix(in srgb, var(--seafoam) 13%, transparent); border: 1px solid color-mix(in srgb, var(--seafoam) 40%, transparent); }
  .fig20x-tag.may { color: var(--text-dim); background: rgba(255,255,255,0.05); border: 1px solid var(--rule-strong); }
  .fig20x-tag.opt { color: #ffb347; background: rgba(255,179,71,0.1); border: 1px solid rgba(255,179,71,0.45); }
  /* JSON */
  .fig20x-codewrap { border: 1px solid var(--rule-strong); border-radius: 9px; overflow: hidden; background: #0e1220; }
  .fig20x-chrome { display: flex; align-items: center; gap: 8px; padding: 7px 12px; background: var(--surface-2); border-bottom: 1px solid var(--rule); font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); }
  .fig20x-copy { margin-left: auto; font-family: var(--font-mono); font-size: 10.5px; color: var(--text-dim); background: transparent; border: 1px solid var(--rule-strong); border-radius: 5px; padding: 2px 9px; cursor: pointer; }
  .fig20x-copy:hover { color: var(--text); border-color: var(--steel); }
  .fig20x pre { margin: 0; padding: 14px 16px; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: #c7cede; overflow-x: auto; background: transparent; }
  .fig20x pre .k { color: var(--steel); } .fig20x pre .s { color: var(--seafoam); } .fig20x pre .hl { color: #ffb347; }
  @media (max-width: 560px) { .fig20x { padding: 14px 14px 12px; } .fig20x-steps { grid-template-columns: 1fr 1fr; } }
</style>

## What a KSI is under the 2026 rules

The 2026 rule set organizes 46 Key Security Indicators into 10 themes, from Cloud Native Architecture and Service Configuration down to Cybersecurity Education.

<figure class="fig20x" role="img" aria-label="Grid of the 10 FedRAMP 20x KSI themes and their 46 indicators, with 5 class-varying indicators highlighted">
  <div class="fig20x-kicker">FedRAMP 20x</div>
  <div class="fig20x-title">Key Security Indicators at a glance: 10 themes, 46 indicators</div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">CNA</span><b>Cloud Native Architecture</b><span class="fig20x-n">8</span></div><div class="fig20x-chips"><span class="fig20x-chip">Defining Functionality and Privileges</span><span class="fig20x-chip vary" title="Optional at Class B, required at Class C">Enforcing Intended State</span><span class="fig20x-chip">Implementing Best Practices</span><span class="fig20x-chip">Minimizing Attack Surface</span><span class="fig20x-chip">Optimizing for Availability</span><span class="fig20x-chip">Restricting Network Traffic</span><span class="fig20x-chip">Reviewing Protections</span><span class="fig20x-chip">Using Logical Networking</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">SVC</span><b>Service Configuration</b><span class="fig20x-n">8</span></div><div class="fig20x-chips"><span class="fig20x-chip">Automating Configuration Management</span><span class="fig20x-chip">Automating Secret Management</span><span class="fig20x-chip">Evaluating and Improving Security</span><span class="fig20x-chip vary" title="Optional at Class B, required at Class C">Preventing Residual Risk</span><span class="fig20x-chip vary" title="Optional at Class B, required at Class C">Removing Unwanted Data</span><span class="fig20x-chip">Securing Information</span><span class="fig20x-chip vary" title="Optional at Class B, required at Class C">Validating Communications</span><span class="fig20x-chip">Validating Resource Integrity</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">IAM</span><b>Identity and Access Management</b><span class="fig20x-n">6</span></div><div class="fig20x-chips"><span class="fig20x-chip" title="The lifecycle and privileges of all accounts, roles, and groups are securely managed using automation.">Automating Account Management</span><span class="fig20x-chip">Adopting Passwordless Methods</span><span class="fig20x-chip">Ensuring Least Privilege</span><span class="fig20x-chip">Authorizing Just-in-Time</span><span class="fig20x-chip">Securing Non-User Authentication</span><span class="fig20x-chip">Responding to Suspicious Activity</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">MLA</span><b>Monitoring, Logging, and Auditing</b><span class="fig20x-n">5</span></div><div class="fig20x-chips"><span class="fig20x-chip vary" title="Optional at Class B, required at Class C">Authorizing Log Access</span><span class="fig20x-chip">Evaluating Configurations</span><span class="fig20x-chip">Logging Event Types</span><span class="fig20x-chip">Operating SIEM Capability</span><span class="fig20x-chip">Reviewing Logs</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">PIY</span><b>Policy and Inventory</b><span class="fig20x-n">5</span></div><div class="fig20x-chips"><span class="fig20x-chip">Generating Inventories</span><span class="fig20x-chip">Reviewing Executive Support</span><span class="fig20x-chip">Reviewing Investments in Security</span><span class="fig20x-chip">Reviewing Security in the SDLC</span><span class="fig20x-chip">Reviewing Vulnerability Disclosures</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">CMT</span><b>Change Management</b><span class="fig20x-n">4</span></div><div class="fig20x-chips"><span class="fig20x-chip">Logging Changes</span><span class="fig20x-chip">Redeploying vs Modifying</span><span class="fig20x-chip">Reviewing Change Procedures</span><span class="fig20x-chip">Validating Throughout Deployment</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">RPL</span><b>Recovery Planning</b><span class="fig20x-n">4</span></div><div class="fig20x-chips"><span class="fig20x-chip">Aligning Backups with Objectives</span><span class="fig20x-chip">Aligning Recovery Plan</span><span class="fig20x-chip">Reviewing Recovery Objectives</span><span class="fig20x-chip">Testing Recovery Capabilities</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">INR</span><b>Incident Response</b><span class="fig20x-n">3</span></div><div class="fig20x-chips"><span class="fig20x-chip">Generating After Action Reports</span><span class="fig20x-chip">Reviewing Incident Response Procedures</span><span class="fig20x-chip">Reviewing Past Incidents</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">SCR</span><b>Supply Chain Risk</b><span class="fig20x-n">2</span></div><div class="fig20x-chips"><span class="fig20x-chip">Mitigating Supply Chain Risk</span><span class="fig20x-chip">Monitoring Supply Chain Risk</span></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">CED</span><b>Cybersecurity Education</b><span class="fig20x-n">1</span></div><div class="fig20x-chips"><span class="fig20x-chip">Reviewing All Training</span></div></div>
  <div class="fig20x-legend"><span class="fig20x-chip vary">Amber</span> optional at Class B, required at Class C. Hover an amber indicator for its class rule.</div>
  <div class="fig20x-src">Source: FedRAMP Consolidated Rules for 2026, machine-readable JSON (github.com/FedRAMP/rules), version 2026.09.13.02</div>
</figure>

*All 46 KSIs from FedRAMP's machine-readable Consolidated Rules. Amber indicators are optional at Class B and required at Class C.*

Each indicator is written as a short outcome statement. For example, `KSI-IAM-AAM` (Automating Account Management) reads: "The lifecycle and privileges of all accounts, roles, and groups are securely managed using automation." `KSI-CMT-RMV` asks that changes to machine-based resources be "executed through the redeployment of version controlled resources rather than direct modification wherever reasonable."

Note what these statements leave out. None of them says "document a policy" or "maintain a procedure." They describe how the system behaves. Each KSI still references NIST 800-53 controls in the machine-readable rules, but those references are for traceability. The control mapping doesn't prove anything on its own.

<figure class="fig20x" role="img" aria-label="JSON excerpt of KSI-IAM-AAM from FedRAMP's fedramp-consolidated-rules.json showing its name, statement and mapped 800-53 controls">
  <div class="fig20x-kicker">Straight from the source</div>
  <div class="fig20x-title">A KSI in FedRAMP's machine-readable rules</div>
  <div class="fig20x-codewrap">
    <div class="fig20x-chrome"><a href="https://github.com/FedRAMP/rules" style="color:inherit;">FedRAMP/rules</a>&nbsp;/&nbsp;fedramp-consolidated-rules.json<button class="fig20x-copy" type="button" onclick="navigator.clipboard.writeText(document.getElementById('fig20x-json').innerText).then(()=>{this.textContent='Copied';setTimeout(()=>this.textContent='Copy',1500)})">Copy</button></div>
    <pre id="fig20x-json">{
  <span class="k">"KSI"</span>: {
    <span class="k">"IAM"</span>: {
      <span class="k">"name"</span>: <span class="s">"Identity and Access Management"</span>,
      <span class="k">"indicators"</span>: {
        <span class="k">"KSI-IAM-AAM"</span>: {
          <span class="k">"name"</span>: <span class="s">"Automating Account Management"</span>,
          <span class="k">"statement"</span>: <span class="hl">"The lifecycle and privileges of all accounts, roles, and groups are securely managed using automation."</span>,
          <span class="k">"controls"</span>: [<span class="s">"ac-2.2"</span>, <span class="s">"ac-2.3"</span>, <span class="s">"ac-2.13"</span>, <span class="s">"ac-6.7"</span>, <span class="s">"ia-4.4"</span>, <span class="s">"ia-12"</span>, <span class="s">"ia-12.2"</span>, <span class="s">"ia-12.3"</span>, <span class="s">"ia-12.5"</span>]
        }
      }
    }
  }
}</pre>
  </div>
  <div class="fig20x-src">Source: github.com/FedRAMP/rules, version 2026.09.13.02 (last updated 2026-09-13). Excerpt trimmed to name, statement and controls.</div>
</figure>

*KSI-IAM-AAM as it appears in FedRAMP's rules file. The statement is the requirement; the controls are there for traceability.*

The word that shows up most across the indicators is **persistently**. FedRAMP gives it a specific definition: activities "repeated over a long period of time in spite of obstacles or difficulties," where cycles may vary or pause, but "the status of persistent activities will always be known." That last clause is the one that matters. A review you ran once for the assessment doesn't count as persistent.

## Verification and validation are two different things

The 2026 rules separate these two terms clearly, and KSI validation rests on the difference:

- **Verification** is "confirmation through objective evidence that specified FedRAMP Practices have been fulfilled." In plain terms: did you build what you said you built?
- **Validation** is "confirmation through objective evidence that implemented security capabilities and related certification data are suitable for their intended FedRAMP Certification use and support the expected security outcomes." In plain terms: does it actually work, and can the data about it be trusted?

The Independent Verification and Validation (IVV) rules put obligations on both sides. Providers MUST supply assessors with evidence of implementation and evidence of effectiveness. Assessors MUST verify that the implemented measures match what was documented, validate that they have the intended outcome, and SHOULD "perform independent research to test such information."

## What the Security Decision Record requires for each KSI

The Security Decision Record (SDR) replaces the traditional SSP. FedRAMP defines it as "a persistently maintained, verified, and validated record of the security decisions made by a provider over the lifecycle of a cloud service offering." It MUST be supplied in both human-readable and JSON formats against a published FedRAMP schema.

For every applicable KSI, rule `SDR-CSX-KSI` requires five short summaries: the measures, their cycle, verification of the measures, verification of the automation behind them, and validation that it all works as intended. The assessor then verifies and validates the same measures, and both sets of findings end up in the record agencies read.

<figure class="fig20x" role="img" aria-label="Three-lane flow showing the provider's five SDR-CSX-KSI summaries, the independent assessor's verify, validate, engage and summarize steps, and the resulting Security Decision Record and Certification Package Overview">
  <div class="fig20x-kicker">How a KSI gets proven</div>
  <div class="fig20x-title">Verification vs. validation, end to end</div>
  <div class="fig20x-lane pl"><span class="fig20x-lanetag p">Provider</span><div class="fig20x-steps"><div class="fig20x-step"><b><span class="num">1</span>Measures</b><p>What measures (and objectives) demonstrate the KSI, or why none exist and the resulting customer risk.</p></div><div class="fig20x-step"><b><span class="num">2</span>Cycle</b><p>How often persistent measures run. Cycles can vary, but status must always be known.</p></div><div class="fig20x-step"><b><span class="num">3</span>Verify measures</b><p>Do the measures actually demonstrate the KSI?</p></div><div class="fig20x-step"><b><span class="num">4</span>Verify automation</b><p>Is the automation accurate and sufficient, or is it unnecessary for this measure?</p></div><div class="fig20x-step"><b><span class="num">5</span>Validate</b><p>Measures are accurately produced, in place and working as intended.</p></div></div></div>
  <div class="fig20x-lane al"><span class="fig20x-lanetag a">Independent assessor</span><div class="fig20x-steps"><div class="fig20x-step"><b>Verify implementation</b><p><span class="id">IVV-IAS-VIM</span> · implemented measures match what was documented.</p></div><div class="fig20x-step"><b>Validate effectiveness</b><p><span class="id">IVV-IAS-VEF</span> · measures have the intended outcome.</p></div><div class="fig20x-step"><b>Engage experts</b><p><span class="id">IVV-IAS-EPX</span> · talk to provider engineers and test claims with independent research.</p></div><div class="fig20x-step"><b>Summarize</b><p><span class="id">IVV-IAS-SUM / OSA</span> · per-practice and overall findings, including failures and disputes.</p></div></div></div>
  <div class="fig20x-lane rl"><span class="fig20x-lanetag r">Record</span><div class="fig20x-steps"><div class="fig20x-step"><b>Security Decision Record</b><p>Human-readable + JSON. Provider explanations, assessor findings and responses, kept persistently.</p></div><div class="fig20x-step"><b>Certification Package Overview</b><p>Overall assessment summary. Included without inappropriate modification (<span class="id">IVV-CSO-ICP</span>).</p></div></div></div>
  <div class="fig20x-legend"><b>Verification:</b> did you build what you said you built? &nbsp; <b>Validation:</b> does it work, and can the data about it be trusted?</div>
  <div class="fig20x-note"><b>Rev5 under the 2026 rules:</b> the same Security Decision Record flow applies, with control summaries in place of KSI summaries.</div>
  <div class="fig20x-src">Sources: FedRAMP Consolidated Rules for 2026, rules SDR-CSX-KSI, IVV-CSO-*, IVV-IAS-*; FedRAMP definitions FRD-VRF and FRD-VLN.</div>
</figure>

*How a KSI gets proven under the 2026 rules, from provider measures to the Security Decision Record.*

The fourth item, verifying the automation, is the one most teams underestimate. FedRAMP isn't only asking whether your control works. It's asking whether the automation that reports on the control can be trusted. A dashboard showing 100% MFA coverage is only as good as the query behind it. If that query misses service accounts or a second identity provider, the measure is wrong, and validation has to catch that.

The assessor's findings don't disappear into a separate report either. Providers MUST include them in the Certification Package "without inappropriate modification" (`IVV-CSO-ICP`).

## Metrics change by class

For 20x Classes B, C and D, providers MUST include all KSIs in a FedRAMP independent assessment at least once per year. The historical data you keep also scales with class, and five indicators move from optional to required between Class B and Class C.

<figure class="fig20x" role="img" aria-label="Table comparing FedRAMP 20x Classes A through D on annual assessment, KSI assessment frequency, historical metrics and class-varying KSIs">
  <div class="fig20x-kicker">FedRAMP 20x certification classes</div>
  <div class="fig20x-title">What changes as you move up a class</div>
  <div class="fig20x-scroll"><div class="fig20x-matrix">
    <div class="fig20x-cell rh">Requirement</div><div class="fig20x-cell h a">Class A</div><div class="fig20x-cell h b">Class B</div><div class="fig20x-cell h c">Class C</div><div class="fig20x-cell h d">Class D</div>
    <div class="fig20x-row"><div class="fig20x-cell rh">Annual independent assessment<span class="id">IVV-CSO-FIA</span></div><div class="fig20x-cell"><span class="fig20x-tag may">MAY</span><p>Optional</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>All applicable rules, at least yearly</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>All applicable rules, at least yearly</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>All applicable rules, at least yearly</p></div></div>
    <div class="fig20x-row"><div class="fig20x-cell rh">KSIs in the assessment<span class="id">IVV-CSX-AIA</span></div><div class="fig20x-cell"><p>Meet the underlying alternative framework's expectations</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>All KSIs, at least once per year</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>All KSIs, at least once per year</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>All KSIs, at least once per year</p></div></div>
    <div class="fig20x-row"><div class="fig20x-cell rh">Historical KSI metrics in the SDR<span class="id">SDR-CSX-KMT</span></div><div class="fig20x-cell"><span class="fig20x-tag may">MAY</span><p>Optional</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>30-day summary per metric + up to 1 year where available</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>Class B summaries + <strong>all daily data</strong> up to 1 year</p></div><div class="fig20x-cell"><span class="fig20x-tag must">MUST</span><p>Significantly supersede lower classes (set in Phase 4 Pilot)</p></div></div>
    <div class="fig20x-row"><div class="fig20x-cell rh">Class-varying KSIs<span class="id">CNA-EIS, MLA-ALA, SVC-PRR, SVC-RUD, SVC-VCM</span></div><div class="fig20x-cell"><p>Not listed</p></div><div class="fig20x-cell"><span class="fig20x-tag opt">OPTIONAL</span><p>Marked optional</p></div><div class="fig20x-cell"><span class="fig20x-tag must">REQUIRED</span><p>Required statements</p></div><div class="fig20x-cell"><p>Not listed separately</p></div></div>
  </div></div>
  <div class="fig20x-legend">Assurance increases from minimal at Class A to significant at Class D (<span class="id">FRD-CCL</span>). Hover a row to track it across classes.</div>
  <div class="fig20x-note"><b>Staying on Rev5?</b> Certification classes apply to 20x. Under the 2026 rules, Rev5 providers keep the same Security Decision Record, with control summaries in place of KSI summaries.</div>
  <div class="fig20x-src">Source: FedRAMP Consolidated Rules for 2026 (github.com/FedRAMP/rules), version 2026.09.13.02. Class D specifics are pending the 20x Phase 4 Pilot.</div>
</figure>

*Class C requires a full year of daily metric data in the SDR. That history can't be created after the fact.*

If you're aiming for Class C, a year of daily data means your measurement pipeline has to be running well before the assessment window opens.

## Scope comes first

Validation only means something if the boundary is right. The Minimum Assessment Scope rules require providers to identify every information resource "likely to handle federal customer data or likely to impact the confidentiality, integrity, or availability" of that data (`MAS-CSO-IIR`), to document information flows and security categories for all of those resources, and to address how third-party resources could affect federal data.

This matters because an inventory-driven measure such as `KSI-PIY-GIV` (Generating Inventories) is only valid if its authoritative sources cover the whole assessed scope. If a measure reports "all resources compliant" but doesn't include a region, account or SaaS dependency that's inside the boundary, the measure is wrong.

## Rev5 is moving the same way

Providers staying on Rev5 aren't exempt from this shift. FedRAMP's Rev5 control guidance asks, for each control, what risk it addresses, where it runs in the offering, what safeguards implement it, who owns it, what evidence shows it's operating, and how it will keep working as things change. The guidance says a control "should not only be described once in a document." Rev5 providers also use the SDR, with control summaries in place of KSI summaries.

## Where teams go wrong

The same patterns keep showing up:

- **Writing prose where a measure belongs.** A paragraph explaining that access reviews happen quarterly isn't a measure. A job that exports entitlements, compares them to role definitions, records any exceptions and stores the result is.
- **Leaving the automation unchecked.** Teams show the output of a check but can't explain how they know the check itself is accurate.
- **Starting metrics too late.** Class B and C metric history can't be created retroactively.
- **Treating "persistent" as "periodic."** The rule allows irregular cycles, but the status always has to be known and documented.
- **Keeping GRC and engineering apart.** FedRAMP says plainly that "GRC and Assurance Engineering is critical." The people who can explain a KSI measure are usually the people who built the pipeline.

## Use the machine-readable rules

FedRAMP publishes the full Consolidated Rules as structured JSON with a validation schema in the public [FedRAMP/rules](https://github.com/FedRAMP/rules) repository, including every KSI, its class variants and its related controls. Build your KSI inventory, SDR scaffolding and validation tests from that file instead of copying from web pages. That way, when FedRAMP updates the rules, you can see exactly what changed.

## Build measures that hold up

**Scoping a 20x certification or moving an existing authorization to the 2026 rules?** Optimal builds FedRAMP 20x and Rev5 authorization packages around evidence that runs on its own, from KSI measures and validation pipelines to a Security Decision Record your assessor can verify. [Schedule a 30-minute conversation](https://calendly.com/ryan-gooptimal/30min).

### Sources

- [FedRAMP Consolidated Rules (machine-readable JSON)](https://github.com/FedRAMP/rules)
- [FedRAMP Consolidated Rules for 2026](https://fedramp.gov/2026/rules/)
- [Key Security Indicators](https://fedramp.gov/2026/providers/20x/key-security-indicators/)
- [20x Boundary](https://fedramp.gov/2026/providers/20x/boundary/)
- [20x Assurance](https://fedramp.gov/2026/providers/20x/assurance/)
- [20x Package](https://fedramp.gov/2026/providers/20x/package/)
- [Rev5 Controls](https://fedramp.gov/2026/providers/rev5/controls/)
