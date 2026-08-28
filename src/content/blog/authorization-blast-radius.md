---
title: "The Authorization Blast Radius"
description: "Sandboxing does not bound what an agent is allowed to do. An overview of our whitepaper on securing agentic AI: enforcement at the tool boundary, bounded blast radius, and continuous authorization."
date: 2026-08-28
category: "AI Security"
image: "/blog/authorization-blast-radius-hero.png"
imageAlt: "Your agent is perfectly sandboxed. It can still delete production."
tags:
  - "agentic AI"
  - "AI security"
  - "cATO"
  - "zero trust"
  - "FedRAMP"
  - "CMMC"
---

Your agent is perfectly sandboxed. Isolated in a micro-VM, zero egress, short-lived credentials. It can still delete the production database, because deleting the database is something it was permitted to do.

That sentence is why we wrote this whitepaper. Most of what is published about securing AI agents is still answering the last era's question. For three years, AI security meant content risk: would the model leak PII, defame someone, hallucinate a citation? Agents changed the question. Systems built on MCP and comparable tool-calling frameworks now invoke APIs, mutate records, provision infrastructure, and message third parties with no human in the path. The governing question is no longer what the AI says. It is what the AI does.

## The insider you installed on purpose

An agent is a standing, privileged, non-human identity whose decision process can be influenced by any text it reads. A support ticket. A PDF. A retrieved document. Subverting a privileged human takes coercion or recruitment. Subverting a privileged agent can take a well-crafted paragraph.

And the core attack, indirect prompt injection, has no complete mitigation. Not filtered away, not delimited away, not fine-tuned away. Any architecture claiming otherwise is misrepresenting the state of the field. The whitepaper treats reasoning-layer compromise as a design condition, then asks the only question that matters under that condition: what bounds the damage?

## Two blast radii, and everyone is guarding the small one

![Containment blast radius versus authorization blast radius](/blog/two-blast-radii.png)
*Sandboxing bounds the smaller exposure. Action risk lives in the authorization blast radius.*

The containment blast radius is what an attacker reaches by escaping the runtime: the host, the container network, adjacent workloads. Sandboxes and egress filtering handle it well, and it is where most published guidance stops.

The authorization blast radius is what the agent can do through its permitted tools while working exactly as designed. Every record its credentials can read, every row it can write or delete, every destination it can send data to. Kernel isolation never touches that path. Nearly all agentic risk lives in this second radius, and bounding it deliberately is the whitepaper's central project.

## What the whitepaper covers

*Securing Agentic AI: Governing What the System Does, Not What It Says* is a reference architecture for running autonomous agents in regulated environments. Inside:

- A threat model spanning goal hijack, indirect injection, memory and vector-store poisoning, tool supply chain, and the internal trust trap in multi-agent systems
- The enforcement argument: authorization verified at the tool boundary, by a component the agent cannot influence. If a control fails when the model is compromised, it was advice, not enforcement
- Delegation that narrows and never widens, using token exchange with attenuation, so privilege escalation across agent hops is structurally impossible
- An evaluation methodology with numeric promotion gates: attack success rate ceilings per harm tier, pass^k rather than pass@k, adaptive adversaries, pinned model versions
- A continuous authorization (cATO) mapping, because point-in-time authorization certifies a snapshot of a system that changes with every model update
- A control crosswalk to NIST SP 800-53 Rev 5 and ISO/IEC 42001, so the architecture drops into an SSP instead of staying a position paper

<a href="/blog/authorization-boundary.png" target="_blank">![Authorization boundary reference deployment](/blog/authorization-boundary.png)</a>
*The deployment view: a FedRAMP-style authorization boundary for the agentic platform, AWS GovCloud shown with Azure Government and Google Cloud equivalents.*

![Evaluation suites, promotion gates, and re-authorization triggers](/blog/evaluation-pipeline.png)
*Numeric promotion gates plus continuous evaluation: a cATO model for agents.*

## Authorization that does not go stale

The deeper argument is about governance tempo. An agent's behavior shifts with every model version, tool manifest change, and memory write, faster than any annual assessment cycle can observe. The organizations that deploy agents successfully will not be the fastest or the most cautious. They will be the ones that bound the authorization blast radius precisely enough to let autonomy operate inside it, and instrument it well enough that the authorization never goes stale.

<p>
  <a class="btn btn-primary" href="/whitepapers/securing-agentic-ai/">Download the whitepaper →</a>
  &nbsp;
  <a class="btn btn-ghost" href="/contact">Book a scoping call</a>
</p>

If you are wrestling with how to authorize agents inside a FedRAMP, CJIS, or CMMC boundary, this is the problem we work on at Optimal. Reach out: ryan@gooptimal.io.
