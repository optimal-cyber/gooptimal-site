// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static marketing site. `site` is the production origin — used for canonical
// URLs, absolute OG/JSON-LD URLs, and the generated sitemap.
export default defineConfig({
  site: "https://gooptimal.io",
  integrations: [sitemap()],
  // Static build emits meta-refresh redirect pages so retired URLs don't 404.
  // /demo → the old "request access" flow, now the scoping-call form at /contact.
  // /industries/* → retired vertical pages, replaced by deployment-scenario use cases.
  redirects: {
    "/demo": "/contact",
    "/industries/healthcare": "/use-cases/regulated-cloud",
    "/industries/financial-services": "/use-cases/regulated-cloud",
    "/industries/sled": "/use-cases/regulated-cloud",
  },
});
