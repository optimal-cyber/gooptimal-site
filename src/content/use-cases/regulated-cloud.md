---
title: "Governed AI in your regulated cloud."
description: "Route agents and users to approved frontier models inside the cloud you already operate — every request authorized, every token logged, nothing crossing the boundary unwatched."
eyebrow: "Use case · Regulated cloud"
subhead: "Route agents and users to approved frontier models inside the cloud you already run — every request authorized, every token logged."
order: 1
---

The problem

## Frontier models, without a new blast radius.

Teams in regulated clouds want the same frontier models everyone else has — but every new SaaS endpoint is another egress path, another set of credentials, another thing an assessor asks about. The usual answer is to ban the good models or quietly route around the rules.

// The pattern

## One authenticated gateway, in your account.

Optimal stands up a single governed endpoint inside your cloud. Callers authenticate through Cloudflare Access and Okta; every request is checked against a model and resource allowlist; and traffic to model providers is pinned to a default-deny egress allowlist. Your existing OpenAI- or Anthropic-compatible clients point at one URL — no SDK rewrite.

// 01 · Authorized access

### Per-key credentials.

Every user, service, and agent gets its own virtual key. Rotate or revoke one without touching the others.

// 02 · Inline guardrails

### Fail-closed on every prompt.

NeMo Guardrails runs pre-call — unit-tested secret and PII detectors block a request before the provider is ever reached.

// 03 · A defensible trail

### Structured, append-only audit.

Every request and token is written to a structured log joined by request ID — the artifact your own reviewers read, in your account, on your retention.

What stays with you

## The boundary, drawn explicitly.

Optimal engineers and operates the gateway pattern inside your environment. Your accreditation decisions, your authorizing official, your data, and your vendor relationships stay yours. We build the control plane; you own the authorization.
