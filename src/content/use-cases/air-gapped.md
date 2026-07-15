---
title: "Frontier-class AI, air-gapped."
description: "Self-host the gateway and open models where nothing leaves the wire. Default-deny egress is structural, the guardrails run locally, and the audit trail never depends on a vendor cloud."
eyebrow: "Use case · On-prem & air-gapped"
subhead: "Self-host the gateway and open models where nothing leaves the wire — the same control bands, fully disconnected."
order: 2
---

The problem

## The best models live in someone else's cloud.

For classified, OT, or sovereignty-bound environments, calling a hosted model API is a non-starter. But the mission still needs capable AI — and bolting a raw open-source model onto the network with no gateway, no guardrails, and no log is its own kind of exposure.

// The pattern

## The whole control plane, disconnected.

The same gateway, guardrails, egress control, and audit trail run entirely inside your enclave against self-hosted open models. Default-deny egress isn't a setting you can forget — it's enforced by the network and the proxy. Nothing phones home.

// 01 · No egress, by construction

### The environment can't reach out.

Security-group rules and an allowlist proxy mean the enclave can't touch the open internet even if something tries to.

// 02 · Local guardrails

### Policy runs on your hardware.

Detectors and guardrail policy execute in your enclave, pre-call — no dependency on an external moderation service.

// 03 · Your evidence, your storage

### Nothing leaves for a vendor console.

The structured audit log lives in your enclave, on your retention schedule, readable without an outside service.

What stays with you

## The boundary, drawn explicitly.

Optimal builds and hands over the pattern. Your enclave, your models, your data, and your authorization decisions remain entirely yours.
