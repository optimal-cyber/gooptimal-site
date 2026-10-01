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
  .fig20x-chip.vary { color: #ffb347; border-color: rgba(255,179,71,0.55); background: rgba(255,179,71,0.08);  }
  .fig20x-chip.vary:hover { border-color: #ffb347; }
  button.fig20x-chip { font-family: inherit; cursor: pointer; appearance: none; }
  .fig20x-chip.sel { border-color: var(--sunset); color: var(--text); background: color-mix(in srgb, var(--sunset) 12%, transparent); }
  .fig20x-chip.vary.sel { border-color: #ffb347; background: rgba(255,179,71,0.16); }
  .fig20x-detail { margin-top: 12px; padding: 11px 14px; border: 1px solid var(--rule-strong); border-left: 3px solid var(--sunset); border-radius: 0 8px 8px 0; background: var(--surface-2); }
  .fig20x-did { font-family: var(--font-mono); font-size: 11px; color: var(--sunset); letter-spacing: 0.04em; }
  .fig20x-detail p { margin: 4px 0 6px !important; font-size: 13px !important; line-height: 1.55 !important; color: var(--text); }
  .fig20x-dcx { display: block; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
  .fig20x-dvy[hidden] { display: none; }
  .fig20x-dvy { display: inline-block; margin-top: 6px; font-family: var(--font-mono); font-size: 9.5px; letter-spacing: 0.05em; color: #ffb347; border: 1px solid rgba(255,179,71,0.5); border-radius: 4px; padding: 2px 7px; }
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

<figure class="fig20x" id="ksigrid" role="group" aria-label="Grid of the 10 FedRAMP 20x KSI themes and their 46 indicators; select any indicator to see its rule ID, official statement, and mapped 800-53 controls">
  <div class="fig20x-kicker">FedRAMP 20x</div>
  <div class="fig20x-title">Key Security Indicators at a glance: 10 themes, 46 indicators</div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">CNA</span><b>Cloud Native Architecture</b><span class="fig20x-n">8</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-CNA-DFP">Defining Functionality and Privileges</button><button type="button" class="fig20x-chip vary" data-k="KSI-CNA-EIS">Enforcing Intended State</button><button type="button" class="fig20x-chip" data-k="KSI-CNA-IBP">Implementing Best Practices</button><button type="button" class="fig20x-chip" data-k="KSI-CNA-MAT">Minimizing Attack Surface</button><button type="button" class="fig20x-chip" data-k="KSI-CNA-OFA">Optimizing for Availability</button><button type="button" class="fig20x-chip" data-k="KSI-CNA-RNT">Restricting Network Traffic</button><button type="button" class="fig20x-chip" data-k="KSI-CNA-RVP">Reviewing Protections</button><button type="button" class="fig20x-chip" data-k="KSI-CNA-ULN">Using Logical Networking</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">SVC</span><b>Service Configuration</b><span class="fig20x-n">8</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-SVC-ACM">Automating Configuration Management</button><button type="button" class="fig20x-chip" data-k="KSI-SVC-ASM">Automating Secret Management</button><button type="button" class="fig20x-chip" data-k="KSI-SVC-EIS">Evaluating and Improving Security</button><button type="button" class="fig20x-chip vary" data-k="KSI-SVC-PRR">Preventing Residual Risk</button><button type="button" class="fig20x-chip vary" data-k="KSI-SVC-RUD">Removing Unwanted Data</button><button type="button" class="fig20x-chip" data-k="KSI-SVC-SIN">Securing Information</button><button type="button" class="fig20x-chip vary" data-k="KSI-SVC-VCM">Validating Communications</button><button type="button" class="fig20x-chip" data-k="KSI-SVC-VRI">Validating Resource Integrity</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">IAM</span><b>Identity and Access Management</b><span class="fig20x-n">6</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-IAM-APM">Adopting Passwordless Methods</button><button type="button" class="fig20x-chip" data-k="KSI-IAM-JIT">Authorizing Just-in-Time</button><button type="button" class="fig20x-chip" data-k="KSI-IAM-AAM">Automating Account Management</button><button type="button" class="fig20x-chip" data-k="KSI-IAM-ELP">Ensuring Least Privilege</button><button type="button" class="fig20x-chip" data-k="KSI-IAM-SUS">Responding to Suspicious Activity</button><button type="button" class="fig20x-chip" data-k="KSI-IAM-SNU">Securing Non-User Authentication</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">MLA</span><b>Monitoring, Logging, and Auditing</b><span class="fig20x-n">5</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip vary" data-k="KSI-MLA-ALA">Authorizing Log Access</button><button type="button" class="fig20x-chip" data-k="KSI-MLA-EVC">Evaluating Configurations</button><button type="button" class="fig20x-chip" data-k="KSI-MLA-LET">Logging Event Types</button><button type="button" class="fig20x-chip" data-k="KSI-MLA-OSM">Operating SIEM Capability</button><button type="button" class="fig20x-chip" data-k="KSI-MLA-RVL">Reviewing Logs</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">PIY</span><b>Policy and Inventory</b><span class="fig20x-n">5</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-PIY-GIV">Generating Inventories</button><button type="button" class="fig20x-chip" data-k="KSI-PIY-RES">Reviewing Executive Support</button><button type="button" class="fig20x-chip" data-k="KSI-PIY-RIS">Reviewing Investments in Security</button><button type="button" class="fig20x-chip" data-k="KSI-PIY-RSD">Reviewing Security in the SDLC</button><button type="button" class="fig20x-chip" data-k="KSI-PIY-RVD">Reviewing Vulnerability Disclosures</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">CMT</span><b>Change Management</b><span class="fig20x-n">4</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-CMT-LMC">Logging Changes</button><button type="button" class="fig20x-chip" data-k="KSI-CMT-RMV">Redeploying vs Modifying</button><button type="button" class="fig20x-chip" data-k="KSI-CMT-RVP">Reviewing Change Procedures</button><button type="button" class="fig20x-chip" data-k="KSI-CMT-VTD">Validating Throughout Deployment</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">RPL</span><b>Recovery Planning</b><span class="fig20x-n">4</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-RPL-ABO">Aligning Backups with Objectives</button><button type="button" class="fig20x-chip" data-k="KSI-RPL-ARP">Aligning Recovery Plan</button><button type="button" class="fig20x-chip" data-k="KSI-RPL-RRO">Reviewing Recovery Objectives</button><button type="button" class="fig20x-chip" data-k="KSI-RPL-TRC">Testing Recovery Capabilities</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">INR</span><b>Incident Response</b><span class="fig20x-n">3</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-INR-AAR">Generating After Action Reports</button><button type="button" class="fig20x-chip" data-k="KSI-INR-RIR">Reviewing Incident Response Procedures</button><button type="button" class="fig20x-chip" data-k="KSI-INR-RPI">Reviewing Past Incidents</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">SCR</span><b>Supply Chain Risk</b><span class="fig20x-n">2</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-SCR-MIT">Mitigating Supply Chain Risk</button><button type="button" class="fig20x-chip" data-k="KSI-SCR-MON">Monitoring Supply Chain Risk</button></div></div>
  <div class="fig20x-theme"><div class="fig20x-th"><span class="fig20x-abbr">CED</span><b>Cybersecurity Education</b><span class="fig20x-n">1</span></div><div class="fig20x-chips"><button type="button" class="fig20x-chip" data-k="KSI-CED-RAT">Reviewing All Training</button></div></div>
  <div class="fig20x-detail" id="ksidetail" hidden><span class="fig20x-did" id="ksidid"></span><p id="ksidst"></p><span class="fig20x-dcx" id="ksidcx"></span><span class="fig20x-dvy" id="ksidvy" hidden>Optional at Class B, required at Class C</span></div>
  <div class="fig20x-legend"><span class="fig20x-chip vary" style="pointer-events:none;">Amber</span> optional at Class B, required at Class C. Select any indicator for its rule ID and official statement.</div>
  <div class="fig20x-src">Source: FedRAMP Consolidated Rules for 2026, machine-readable JSON (github.com/FedRAMP/rules), version 2026.09.13.02</div>
<script>
(function(){var D={"KSI-CNA-DFP":{"n":"Defining Functionality and Privileges","s":"The functionality and privileges for infrastructure and services are strictly defined.","c":"cm-2, si-3","v":0},"KSI-CNA-EIS":{"n":"Enforcing Intended State","s":"Automated services are used to persistently assess the security of all machine-based information resources and automatically enforce their intended operational state.","c":"ca-2.1, ca-7.1","v":1},"KSI-CNA-IBP":{"n":"Implementing Best Practices","s":"The use and configuration of third-party machine-based information resources is persistently compared against the original provider's best practices and guidance.","c":"ac-17.3, cm-2, pl-10","v":0},"KSI-CNA-MAT":{"n":"Minimizing Attack Surface","s":"Machine-based information resources are persistently reviewed to ensure they have a minimal attack surface and that lateral movement is minimized if compromised.","c":"ac-17.3, ac-18.1, ac-18.3, ac-20.1, ca-9, sc-7.3, sc-7.4, sc-7.5, sc-7.8, sc-8, sc-10, si-10, si-11, si-16","v":0},"KSI-CNA-OFA":{"n":"Optimizing for Availability","s":"Machine-based information resources are persistently reviewed to ensure they are appropriately optimized for high availability and rapid recovery.","c":"","v":0},"KSI-CNA-RNT":{"n":"Restricting Network Traffic","s":"Machine-based information resources are persistently reviewed to ensure they are appropriately configured to limit inbound and outbound network traffic.","c":"ac-17.3, ca-9, cm-7.1, sc-7.5, si-8","v":0},"KSI-CNA-RVP":{"n":"Reviewing Protections","s":"The effectiveness of protection against denial of service attacks and other unwanted activity for machine-based information resources is persistently reviewed.","c":"sc-5, si-8, si-8.2","v":0},"KSI-CNA-ULN":{"n":"Using Logical Networking","s":"Logical networking and related capabilities are used and persistently reviewed to enforce traffic flow controls.","c":"ac-12, ac-17.3, ca-9, sc-4, sc-7, sc-7.7, sc-8, sc-10","v":0},"KSI-SVC-ACM":{"n":"Automating Configuration Management","s":"The configuration of machine-based information resources is managed using automation and persistently reviewed for drift.","c":"ac-2.4, cm-2, cm-2.2, cm-2.3, cm-6, cm-7.1, pl-9, pl-10, sa-5, si-5, sr-10","v":0},"KSI-SVC-ASM":{"n":"Automating Secret Management","s":"Management, protection, and regular rotation of digital keys, certificates, and other secrets is automated and persistently reviewed.","c":"ac-17.2, ia-5.2, ia-5.6, sc-12, sc-17","v":0},"KSI-SVC-EIS":{"n":"Evaluating and Improving Security","s":"Information resources are persistently evaluated for opportunities to improve security and those improvements are persistently made.","c":"cm-7.1, cm-12.1, ma-2, pl-8, sc-7, sc-39, si-2.2, si-4, sr-10","v":0},"KSI-SVC-PRR":{"n":"Preventing Residual Risk","s":"Plans, procedures, and the state of information resources are persistently reviewed after making changes to limit and remove unwanted residual elements that would likely negatively affect the confidentiality, integrity, or availability of federal customer data.","c":"sc-4","v":1},"KSI-SVC-RUD":{"n":"Removing Unwanted Data","s":"Unwanted federal customer data is removed promptly when requested by an agency in alignment with customer agreements, including from backups if appropriate; this typically applies when a customer spills information or when a customer seeks to remove information from a service due to a change in usage.","c":"si-12.3, si-18.4","v":1},"KSI-SVC-SIN":{"n":"Securing Information","s":"Information is encrypted or otherwise secured from unwanted access or modification.","c":"ac-1, ac-17.2, cp-9.8, sc-8, sc-8.1, sc-13, sc-20, sc-21, sc-22, sc-23, sc-28, sc-28.1","v":0},"KSI-SVC-VCM":{"n":"Validating Communications","s":"The authenticity and integrity of communications between machine-based information resources is persistently validated using automation.","c":"sc-23, si-7.1","v":1},"KSI-SVC-VRI":{"n":"Validating Resource Integrity","s":"Use cryptographic methods to validate the integrity of machine-based information resources.","c":"cm-2.2, cm-8.3, sc-13, sc-23, si-7, si-7.1, sr-10","v":0},"KSI-IAM-APM":{"n":"Adopting Passwordless Methods","s":"Secure passwordless methods are used for user authentication and authorization when feasible, otherwise strong passwords with phishing-resistant MFA is used.","c":"ac-3, ia-5.1, ia-5.2, ia-5.6, ia-6, ac-2, ia-2, ia-2.1, ia-2.2, ia-2.8, ia-5, ia-8, sc-23","v":0},"KSI-IAM-JIT":{"n":"Authorizing Just-in-Time","s":"A least-privileged, role and attribute-based, and just-in-time security authorization model is used and persistently reviewed for all user and non-user accounts and services.","c":"ac-2, ac-2.1, ac-2.2, ac-2.3, ac-2.4, ac-2.6, ac-3, ac-4, ac-5, ac-6, ac-6.1, ac-6.2, ac-6.5, ac-6.7, ac-6.9, ac-6.10, ac-7, ac-20.1, ac-17, au-9.4, cm-5, cm-7, cm-7.2, cm-7.5, cm-9, ia-4, ia-4.4, ia-7, ps-2, ps-3, ps-4, ps-5, ps-6, ps-9, ra-5.5, sc-2, sc-23, sc-39","v":0},"KSI-IAM-AAM":{"n":"Automating Account Management","s":"The lifecycle and privileges of all accounts, roles, and groups are securely managed using automation.","c":"ac-2.2, ac-2.3, ac-2.13, ac-6.7, ia-4.4, ia-12, ia-12.2, ia-12.3, ia-12.5","v":0},"KSI-IAM-ELP":{"n":"Ensuring Least Privilege","s":"Identity and access management measures are used and persistently reviewed to ensure each user or device can only access the resources they need.","c":"ac-2.5, ac-2.6, ac-3, ac-4, ac-6, ac-12, ac-14, ac-17, ac-17.1, ac-17.2, ac-17.3, ac-20, ac-20.1, cm-2.7, cm-9, ia-2, ia-3, ia-4, ia-4.4, ia-5.2, ia-5.6, ia-11, ps-2, ps-3, ps-4, ps-5, ps-6, sc-4, sc-20, sc-21, sc-22, sc-23, sc-39, si-3","v":0},"KSI-IAM-SUS":{"n":"Responding to Suspicious Activity","s":"Accounts with privileged access are disabled or otherwise secured in response to suspicious activity.","c":"ac-2, ac-2.1, ac-2.3, ac-2.13, ac-7, ps-4, ps-8","v":0},"KSI-IAM-SNU":{"n":"Securing Non-User Authentication","s":"Appropriately secure authentication methods are used and persistently reviewed for non-user accounts and services.","c":"ac-2, ac-2.2, ac-4, ac-6.5, ia-3, ia-5.2, ra-5.5","v":0},"KSI-MLA-ALA":{"n":"Authorizing Log Access","s":"A least-privileged, role and attribute-based, and just-in-time access authorization model is used and persistently reviewed for access to log data based on organizationally defined data sensitivity.","c":"si-11","v":1},"KSI-MLA-EVC":{"n":"Evaluating Configurations","s":"The configuration of machine-based information resources, especially infrastructure as code, is persistently evaluated and tested.","c":"ca-7, cm-2, cm-6, si-7.7","v":0},"KSI-MLA-LET":{"n":"Logging Event Types","s":"A list of information resources and event types that will be logged, monitored, and audited is maintained and persistently reviewed to ensure these activities occur.","c":"ac-2.4, ac-6.9, ac-17.1, ac-20.1, au-2, au-7.1, au-12, si-4.4, si-4.5, si-7.7","v":0},"KSI-MLA-OSM":{"n":"Operating SIEM Capability","s":"A Security Information and Event Management (SIEM) or similar system(s) is used and persistently reviewed for centralized, tamper-resistant logging of events, activities, and changes.","c":"ac-17.1, ac-20.1, au-2, au-3, au-3.1, au-4, au-5, au-6.1, au-6.3, au-7, au-7.1, au-8, au-9, au-11, ir-4.1, si-4.2, si-4.4, si-7.7","v":0},"KSI-MLA-RVL":{"n":"Reviewing Logs","s":"Logs are persistently reviewed and audited.","c":"ac-2.4, ac-6.9, au-2, au-6, au-6.1, si-4, si-4.4","v":0},"KSI-PIY-GIV":{"n":"Generating Inventories","s":"Authoritative sources are used to automatically generate real-time inventories of all information resources when needed.","c":"cm-2.2, cm-7.5, cm-8, cm-8.1, cm-12, cm-12.1, cp-2.8","v":0},"KSI-PIY-RES":{"n":"Reviewing Executive Support","s":"Executive support for achieving the provider's security goals is persistently reviewed and demonstrated.","c":"","v":0},"KSI-PIY-RIS":{"n":"Reviewing Investments in Security","s":"The effectiveness of the provider's investments in achieving security goals is persistently reviewed.","c":"ac-5, ca-2, cp-2.1, cp-4.1, ir-3.2, pm-3, sa-2, sa-3, sr-2.1","v":0},"KSI-PIY-RSD":{"n":"Reviewing Security in the SDLC","s":"The effectiveness of building security and privacy considerations into the Software Development Lifecycle and aligning with CISA Secure By Design principles is persistently reviewed.","c":"ac-5, au-3.3, cm-3.4, pl-8, pm-7, sa-3, sa-8, sc-4, sc-18, si-10, si-11, si-16","v":0},"KSI-PIY-RVD":{"n":"Reviewing Vulnerability Disclosures","s":"The effectiveness of the provider's vulnerability disclosure program is persistently reviewed.","c":"ra-5.11","v":0},"KSI-CMT-LMC":{"n":"Logging Changes","s":"Modifications to the cloud service offering are logged and monitored.","c":"au-2, cm-3, cm-3.2, cm-4.2, cm-6, cm-8.3, ma-2","v":0},"KSI-CMT-RMV":{"n":"Redeploying vs Modifying","s":"Changes to machine-based information resources are executed through the redeployment of version controlled resources rather than direct modification wherever reasonable.","c":"cm-2, cm-3, cm-5, cm-6, cm-7, cm-8.1, si-3","v":0},"KSI-CMT-RVP":{"n":"Reviewing Change Procedures","s":"The effectiveness of documented change management procedures is persistently reviewed.","c":"cm-3, cm-3.2, cm-3.4, cm-5, cm-7.1, cm-9","v":0},"KSI-CMT-VTD":{"n":"Validating Throughout Deployment","s":"Persistent testing and validation of changes throughout deployment is automated.","c":"cm-3, cm-3.2, cm-4.2, si-2","v":0},"KSI-RPL-ABO":{"n":"Aligning Backups with Objectives","s":"The alignment of machine-based information resource backups with defined recovery objectives is persistently reviewed.","c":"cm-2.3, cp-6, cp-9, cp-10, cp-10.2, si-12","v":0},"KSI-RPL-ARP":{"n":"Aligning Recovery Plan","s":"The alignment of recovery plans with defined recovery objectives is persistently reviewed.","c":"cp-2, cp-2.1, cp-2.3, cp-4.1, cp-6, cp-6.1, cp-6.3, cp-7, cp-7.1, cp-7.2, cp-7.3, cp-8, cp-8.1, cp-8.2, cp-10, cp-10.2","v":0},"KSI-RPL-RRO":{"n":"Reviewing Recovery Objectives","s":"The desired Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) are defined and persistently reviewed for alignment with the provider's business needs and capabilities.","c":"cp-2.3, cp-10","v":0},"KSI-RPL-TRC":{"n":"Testing Recovery Capabilities","s":"The capability to recover from incidents and contingencies aligned with defined recovery objectives is persistently tested.","c":"cp-2.1, cp-2.3, cp-4, cp-4.1, cp-6, cp-6.1, cp-9.1, cp-10, ir-3, ir-3.2","v":0},"KSI-INR-AAR":{"n":"Generating After Action Reports","s":"Incident after action reports are generated and lessons learned are persistently incorporated.","c":"ir-3, ir-4, ir-4.1, ir-8","v":0},"KSI-INR-RIR":{"n":"Reviewing Incident Response Procedures","s":"The effectiveness of documented incident response procedures is persistently reviewed.","c":"ir-4, ir-4.1, ir-6, ir-6.1, ir-6.3, ir-7, ir-7.1, ir-8, ir-8.1, si-4.5","v":0},"KSI-INR-RPI":{"n":"Reviewing Past Incidents","s":"Past incidents are persistently reviewed for patterns or vulnerabilities that were not previously apparent or identified.","c":"ir-3, ir-4, ir-4.1, ir-5, ir-8","v":0},"KSI-SCR-MIT":{"n":"Mitigating Supply Chain Risk","s":"Persistently identify, review, and mitigate potential supply chain risks.","c":"ac-20, ra-3.1, sa-9, sa-10, sa-11, sa-15.3, sa-22, si-7.1, sr-5, sr-6, ca-7.4, sc-18","v":0},"KSI-SCR-MON":{"n":"Monitoring Supply Chain Risk","s":"Third party software information resources are automatically monitored for upstream vulnerabilities using mechanisms that may include contractual notification requirements or active monitoring services.","c":"ac-20, ca-3, ir-6.3, ps-7, ra-5, sa-9, si-5, sr-5, sr-6, sr-8","v":0},"KSI-CED-RAT":{"n":"Reviewing All Training","s":"The effectiveness of relevant cybersecurity education and training is persistently reviewed, including at least general training for all employees, role-specific training for employees in high risk roles, training for development and engineering staff on secure software delivery, and training for staff involved with incident response or disaster recovery.","c":"cp-3, ir-2, ps-6, at-2, at-2.2, at-2.3, at-3.5, at-4, ir-2.3, at-3, sr-11.1","v":0}};
var g=document.getElementById("ksigrid"),p=document.getElementById("ksidetail");if(!g||!p)return;
g.addEventListener("click",function(e){var b=e.target.closest("button[data-k]");if(!b)return;var k=b.getAttribute("data-k"),r=D[k];if(!r)return;
var prev=g.querySelector(".fig20x-chip.sel");if(prev)prev.classList.remove("sel");
if(p.getAttribute("data-k")===k&&!p.hidden){p.hidden=true;p.removeAttribute("data-k");return;}
b.classList.add("sel");p.setAttribute("data-k",k);
document.getElementById("ksidid").textContent=k;
document.getElementById("ksidst").textContent="\u201C"+r.s+"\u201D";
document.getElementById("ksidcx").textContent="800-53: "+r.c;
document.getElementById("ksidvy").hidden=!r.v;
p.hidden=false;});})();
</script>
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

## From rules to certification: the Class A lifecycle

The rules read as a flat list, but the journey through them has a sequence, and the sequence matters. Class A is the entry point: self-service, with the independent assessment a MAY rather than a MUST (`IVV-CSO-FIA`), which makes it the cleanest view of the lifecycle every class shares. Scope gates everything at the front, the Security Decision Record is the bulk of the middle, and continuous monitoring never ends.

<style>
  .fig20x-phr { display: flex; gap: 10px; padding: 8px 10px; border-radius: 8px; transition: background .15s; }
  .fig20x-phr:hover { background: var(--surface-3); }
  .fig20x-phn { flex: none; width: 24px; height: 24px; border-radius: 50%; background: var(--grad-sunset); color: #14060a; font-family: var(--font-display); font-weight: 700; font-size: 12.5px; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  .fig20x-phb b { display: block; font-family: var(--font-display); font-weight: 600; font-size: 13px; color: var(--text); }
  .fig20x-phb p { margin: 1px 0 3px !important; font-size: 11.5px !important; line-height: 1.45 !important; color: var(--text-dim); }
  .fig20x-phb .ids { font-family: var(--font-mono); font-size: 9.5px; color: var(--text-faint); letter-spacing: 0.02em; }
  .fig20x-phr.ever .fig20x-phn { background: var(--surface-2); color: var(--sunset); border: 1.5px solid var(--sunset); }
</style>
<figure class="fig20x" role="img" aria-label="The nine phases of the FedRAMP 20x Class A lifecycle, from prerequisites through Marketplace listing, scope, the Security Decision Record, package validation, optional assessment, application, and perpetual continuous monitoring">
  <div class="fig20x-kicker">FedRAMP 20x Class A</div>
  <div class="fig20x-title">The lifecycle, end to end</div>
  <div class="fig20x-phr"><span class="fig20x-phn">0</span><span class="fig20x-phb"><b>Prerequisites</b><p>Eligibility, a persistent point of contact, and the assessment scope identified before any work starts.</p><span class="ids">MAS-CSO-IIR · FRC-CSO-POP · FRC-CLA-ASF</span></span></div>
  <div class="fig20x-phr"><span class="fig20x-phn">1</span><span class="fig20x-phb"><b>Get listed in the Marketplace</b><p>The offering is listed and the listing is kept accurate from day one.</p><span class="ids">MKT-CSO-MLR · MKT-CSO-PML · CDS-CSO-PUB</span></span></div>
  <div class="fig20x-phr"><span class="fig20x-phn">2</span><span class="fig20x-phb"><b>Build the scope content</b><p>Information resources, data flows, and third-party reliance documented for the package overview.</p><span class="ids">MAS-CSO-FLO · MAS-CSO-TPR · CPO-CSO-OVR</span></span></div>
  <div class="fig20x-phr"><span class="fig20x-phn">3</span><span class="fig20x-phb"><b>Build the Security Decision Record</b><p>The heavy lift: satisfy the mandatory rules, with incident reporting and change management wired in.</p><span class="ids">SDR-CSX-KSI · IVV-CSX-AIA · IEC-CSO-* · AFC-CSO-*</span></span></div>
  <div class="fig20x-phr"><span class="fig20x-phn">4</span><span class="fig20x-phb"><b>Assemble and validate the package</b><p>Machine-readable artifacts validated against the published FedRAMP schemas.</p><span class="ids">FRC-CSO-JSN · FRC-CSO-PKG · FRC-CSO-MRA</span></span></div>
  <div class="fig20x-phr"><span class="fig20x-phn">5</span><span class="fig20x-phb"><b>Independent assessment (optional at Class A)</b><p>A MAY at Class A, a MUST at Classes B through D; if performed, findings are included without modification.</p><span class="ids">IVV-CSO-FIA · IVV-CSO-ICP · FRC-CLA-IVV</span></span></div>
  <div class="fig20x-phr"><span class="fig20x-phn">6</span><span class="fig20x-phb"><b>Freshen and apply</b><p>Refresh the package content and submit the application.</p><span class="ids">FRC-APP-FCP · FRC-APP-NTP · FRC-APP-USA</span></span></div>
  <div class="fig20x-phr ever"><span class="fig20x-phn">7</span><span class="fig20x-phb"><b>Continuous monitoring and assurance, forever</b><p>Vulnerability detection and response, availability reporting, and annual cycles continue for the life of the certification.</p><span class="ids">VDR-CSO-* · VER-TFR-* · CDS-CSO-AVR · IVV-CSX-AIA</span></span></div>
  <div class="fig20x-phr"><span class="fig20x-phn">8</span><span class="fig20x-phb"><b>Optional and conditional items</b><p>Quarterly collaboration meetings, public status mechanisms, and significant change notifications as they apply.</p><span class="ids">CCM-QTR-MTG · CDS-CSO-PSM · SCN-CSO-EVA</span></span></div>
  <div class="fig20x-src">Phases and rule groupings derived from the FedRAMP Consolidated Rules for 2026 (github.com/FedRAMP/rules), version 2026.09.13.02.</div>
</figure>

*The Class A lifecycle. Classes B through D follow the same shape with the assessment made mandatory and heavier metric history.*

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
