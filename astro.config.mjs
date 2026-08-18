// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static marketing site. `site` is the production origin — used for canonical
// URLs, absolute OG/JSON-LD URLs, and the generated sitemap.
/** Pages that are noindex while unfinished — kept out of the sitemap. */
const DRAFT_PAGES = ["/resources/gcc-high-cost-guide/"];

export default defineConfig({
  site: "https://gooptimal.io",
  integrations: [
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
