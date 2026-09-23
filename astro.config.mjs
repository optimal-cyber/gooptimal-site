// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static marketing site. `site` is the production origin — used for canonical
// URLs, absolute OG/JSON-LD URLs, and the generated sitemap.
/** Pages that are noindex while unfinished — kept out of the sitemap. */
const DRAFT_PAGES = ["/resources/gcc-high-cost-guide/"];

/**
 * Writes dist/llms-full.txt after every build — the llms.txt index plus the
 * full markdown of the blog and use-case content — so LLM crawlers can ingest
 * the site's actual content in one fetch. Runs as an integration (not a
 * package.json chain) so it fires however `astro build` is invoked.
 */
const llmsFull = {
  name: "llms-full",
  hooks: {
    "astro:build:done": async () => {
      const { execFileSync } = await import("node:child_process");
      execFileSync("node", ["scripts/generate-llms-full.mjs"], { stdio: "inherit" });
    },
  },
};

export default defineConfig({
  site: "https://gooptimal.io",
  integrations: [
    llmsFull,
    sitemap({
      // The sitemap integration has no view of a page's `noindex` prop, so
      // draft pages have to be excluded here or the two signals contradict
      // each other — a URL submitted for indexing that then asks not to be
      // indexed is a Search Console error, not a no-op.
      // Remove the entry when the page is finished and `DRAFT` is flipped off.
      filter: (page) => !DRAFT_PAGES.some((p) => page.endsWith(p)),
    }),
  ],
  // Static build emits meta-refresh redirect pages so retired URLs don't 404.
  // /demo → the old "request access" flow, now the scoping-call form at /contact.
  // /industries/* → retired vertical pages, replaced by deployment-scenario use
  //   cases — except SLED, which now has a real landing page again at /sled.
  redirects: {
    "/demo": "/contact",
    "/industries/healthcare": "/use-cases/regulated-cloud",
    "/industries/financial-services": "/use-cases/regulated-cloud",
    "/industries/sled": "/sled",
  },
});
