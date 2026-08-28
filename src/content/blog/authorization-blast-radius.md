---
title: "The Authorization Blast Radius"
description: "Machine-speed threats have outrun human-speed governance. Autonomous agents make it worse, and the way out is architectural, not procedural."
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

The Department of Defense set the bar in the 2018 National Defense Strategy: deliver capability at the speed of relevance. Eight years on, that phrase has escaped the Pentagon and become the operating tempo of every organization deploying AI.

Chris Hughes named the other side of the ledger in his Prodacity briefing, "Speed of Relevance, Scale at Risk." His argument is uncomfortable because it is true. Autonomous, AI-assisted tooling now finds and exploits software flaws at machine speed. Risk management still runs on human timelines. And the compliance apparatus built to protect us, the annual assessments, the checkbox POA&Ms, the performative security reviews, has become the thing standing between the mission and the capability.

I spent years on the assessor side of that apparatus, and I run a company that builds and breaks agentic systems for regulated environments. So I want to take Hughes' four premises seriously and push them one step further, into the specific problem I think decides whether this era goes well: autonomous agents acting on production systems. Because agents don't just sharpen his premises. They break the assumptions underneath our entire authorization model.

## The four premises, agent edition

**The threat curve.** Hughes describes AI collapsing the time between flaw discovery and attack deployment. With agents, the same collapse happens inside your own walls. An agent is a standing, highly privileged identity whose decision process can be influenced by anyone who can put text in front of it. A support ticket, a PDF, a retrieved document. Subverting a privileged human takes coercion or recruitment. Subverting a privileged agent can take a well-crafted paragraph. The insider threat just had its compromise cost reduced to nearly zero, and it operates at machine speed.

**The bureaucracy bottleneck.** Point-in-time authorization assumes the system you assessed is the system that runs. An agent's behavior changes with every model version, every tool manifest update, every document it stores in memory. A hosted model can be updated underneath you on a Tuesday, silently invalidating every evaluation result and every behavioral baseline you built. An annual assessment cycle isn't merely slow against that. It is measuring an artifact that no longer exists.

**The irony of risk aversion.** Organizations that refuse agents to avoid a compliance finding are not holding a safe position. They are accepting a different risk, quietly and without a signature: the strategic risk of ceding tempo to adversaries who adopt without hesitation. Hughes calls this out at the DoD level, and it is just as true for a county government, a hospital system, or a defense contractor. Declining to decide is a risk acceptance. Nobody signs it, so nobody owns it.

**The shift to resilience.** This is the premise I want to spend the rest of this piece on, because "resilience over prevention" gets nodded at constantly and engineered rarely. For agentic systems it has a precise technical meaning, and most published architectures miss it.

## What resilience actually means when the software acts

Here is the fact that should anchor every agentic security conversation: indirect prompt injection has no complete mitigation. Not filtered away, not delimited away, not fine-tuned away. Any architecture claiming to have solved it is misrepresenting the state of the field.

Prevention-first thinking hears that and reaches for more filtering. Resilience thinking accepts it as a design condition and asks a different question: when the reasoning layer is compromised, and eventually it will be, what bounds the damage?

That question exposes a confusion at the center of most agentic security guidance. There are two blast radii, and they are not the same thing.

The **containment blast radius** is what an attacker reaches by escaping the runtime: the host, the container network, adjacent workloads. Sandboxes, micro-VMs, and egress filtering handle this well. It is where most of the published guidance lives.

The **authorization blast radius** is what the agent can do through its permitted tools while working exactly as designed. Every record its credentials can read. Every row it can write or delete. Every destination it can send data to. A perfectly sandboxed agent holding production write credentials can still delete the production database, and no amount of kernel isolation touches that path.

![Containment blast radius versus authorization blast radius](/blog/two-blast-radii.png)
*Sandboxing bounds the smaller exposure. Action risk lives in the authorization blast radius.*

Action risk lives almost entirely in the second radius. Resilience means bounding it deliberately: scoped identity per workflow, credentials that expire with the task, delegation that can narrow but never widen across agent hops, and authorization verified at the tool boundary by a component the agent cannot influence. If a control fails when the model is compromised, it was advice, not enforcement. Survivability is an architecture property. You either built it in or you don't have it.

## Continuous authorization is the bridge

Hughes points to cATO, continuous authorization to operate, as the way out of the bureaucracy bottleneck. I want to make a stronger claim: for agentic systems, continuous authorization isn't a modernization preference. It is the only authorization model that matches the artifact.

The mapping is direct. Numeric promotion gates, a maximum attack success rate per harm tier, a minimum pass rate across repeated trials, a latency budget, a named approver, are the authorization decision. Live trajectory sampling and drift monitoring in production are the continuous monitoring. Model version changes, manifest changes, and incidents are re-authorization triggers, and failure to re-clear means de-authorization. Parameter-level trajectory logs are the body of evidence. A signed residual risk statement, naming what is accepted and by whom, replaces the checkbox theater Hughes rightly torches.

![Evaluation suites, promotion gates, and re-authorization triggers](/blog/evaluation-pipeline.png)
*Numeric promotion gates plus continuous evaluation: a cATO model for agents.*

Notice what that framework does to the speed-versus-risk dilemma. It dissolves it. The organization that builds continuous evaluation and enforcement into the execution path doesn't choose between moving fast and staying authorized. Moving fast and staying authorized become the same motion. Authorization stops being a gate you wait at and becomes a property the system carries.

That is the resolution to Hughes' tension, and it is not a paperwork reform. It is an engineering decision about where security lives. Not in the model's good behavior. Not in an annual binder. In the execution path, enforced at the tool boundary, measured continuously, with a human's name on the risk that remains.

## The work

The organizations that deploy agentic AI successfully in regulated environments will not be the ones that move fastest, and they will not be the ones that refuse. They will be the ones that bound the authorization blast radius precisely enough to let autonomy operate inside it, and instrument it well enough that the authorization never goes stale.

That is what moving at the speed of relevance without scaling the risk looks like in practice. It is buildable today, with identity, authorization, delegation, isolation, and evaluation. The same boring disciplines that have always secured distributed systems, applied to a component that reasons.

I've written up the full reference architecture, the threat model, the evaluation gates, and a control crosswalk to NIST 800-53 and ISO 42001 in a whitepaper: *Securing Agentic AI: Governing What the System Does, Not What It Says*.

<p>
  <a class="btn btn-primary" href="/whitepapers/securing-agentic-ai.pdf">Download the whitepaper →</a>
  &nbsp;
  <a class="btn btn-ghost" href="/contact">Book a scoping call</a>
</p>

If you are wrestling with how to authorize agents in a FedRAMP, CJIS, or CMMC boundary, that is the problem we work on at Optimal. Reach out: ryan@gooptimal.io.

*Credit where due: the framing this piece builds on belongs to Chris Hughes and his Prodacity briefing "Speed of Relevance, Scale at Risk." His newsletter, Resilient Cyber, is one of the few consistently worth your inbox.*
