// ---------------------------------------------------------------------------
// Company facts and the values still waiting on confirmation.
//
// Anything asserted publicly on a site that sells to the defense industrial
// base has to be true, so unconfirmed values stay as `{{TOKEN}}` strings here
// rather than as prose in a page. Call `pending()` before rendering one — every
// consumer gates on it, so a placeholder never reaches a built page. Replace the
// token with the real value and the gated block starts rendering on its own.
// ---------------------------------------------------------------------------

/** True while a value is still an unfilled `{{TOKEN}}` placeholder. */
export const pending = (v: string) => v.startsWith("{{");

/** Confirmed registration data — safe to render. */
export const CAGE = "14HQ0";
export const UEI = "TYMSGKDF2K48";

// TODO: Ryan to confirm — primary + secondary NAICS codes as registered in SAM.
// e.g. "541512 · 541519 · 541611". Renders in the footer strip once filled.
export const NAICS_CODES = "{{NAICS_CODES}}";

// TODO: Ryan to confirm — Cyber AB Registered Provider Organization status.
// Do not assert RPO without confirmation. Fill with the registered org name or
// RPO ID (e.g. "Registered Provider Organization — Cyber AB") to surface it.
export const RPO_STATUS = "{{RPO_STATUS}}";

// TODO: Ryan to confirm — Optimal's own security posture as an External Service
// Provider (what Optimal runs internally, e.g. "MFA-enforced Entra ID, managed
// endpoints, annual third-party assessment"). One honest sentence, no claimed
// certifications. Renders in the ESP section on /gcc-high once filled.
export const ESP_POSTURE = "{{ESP_POSTURE}}";

// TODO: Ryan to confirm — indicative managed-service pricing. Priced as managed
// services on the client's own tenant, NOT hosted-enclave seats.
// e.g. "$185" (rendered as "starting at $185/user/month").
export const MANAGED_STARTING_PRICE = "{{MANAGED_STARTING_PRICE}}";

// TODO: Ryan to confirm — typical band for the build + migration project,
// e.g. "$25k–$120k depending on user count and source environment".
export const BUILD_PROJECT_RANGE = "{{BUILD_PROJECT_RANGE}}";

// TODO: Ryan to confirm — Microsoft GCC High G3/G5 list price per user/month.
// Used as licensing context alongside the July 2026 increase (8% G3 / 5% G5).
export const G3_LIST_PRICE = "{{G3_LIST_PRICE}}";
export const G5_LIST_PRICE = "{{G5_LIST_PRICE}}";

// TODO: Ryan to confirm — URL of the capability statement PDF once one exists.
// Until then every CTA falls through to the HTML page at /capability-statement.
export const CAPABILITY_STATEMENT_URL = "{{CAPABILITY_STATEMENT_URL}}";
export const capabilityStatementHref = pending(CAPABILITY_STATEMENT_URL)
  ? "/capability-statement"
  : CAPABILITY_STATEMENT_URL;

// TODO: Ryan to confirm — past performance. One entry per reference, only what
// can be said publicly. Customer names need permission; an unnamed but specific
// entry ("prime contractor, 120-seat GCC High migration, 2026") is still worth
// more than nothing. The capability statement renders this list when non-empty
// and shows an honest "available on request" line while it is empty.
export const PAST_PERFORMANCE: { title: string; detail: string }[] = [];

/** Ryan's publication — the content engine, hosted off-site. */
export const FERMENTED_OPINIONS = "https://fermentedopinions.substack.com/";

// Web3Forms access key for the whitepaper download gate ("Whitepaper Form
// Request", registered to gooptimal.io/whitepapers/securing-agentic-ai).
//
// Public by design: it is a destination identifier, not a credential, and is
// meant to sit in client HTML. It cannot read submissions or change settings.
//
// Emptying this back to a {{TOKEN}} turns the gate off and the page falls back
// to linking the PDF directly, so the download survives a key rotation.
export const WEB3FORMS_ACCESS_KEY = "93c34072-aab8-4525-9dcb-e9d361c8c696";

// Web3Forms access key for the /contact scoping-call form ("Lead Generation",
// registered to gooptimal.io/contact). Its own form so contact requests get a
// separate dashboard and submission list from whitepaper downloads — note the
// 250/month free quota is account-wide and shared across both keys.
// Public by design, same as above.
export const WEB3FORMS_CONTACT_KEY = "2dee866f-c7c3-486f-a846-b9501e7df2d7";

