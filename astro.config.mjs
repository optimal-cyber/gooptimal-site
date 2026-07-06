// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static marketing site. `site` is the production origin — used for canonical
// URLs, absolute OG/JSON-LD URLs, and the generated sitemap.
export default defineConfig({
  site: "https://gooptimal.io",
  integrations: [sitemap()],
  // The standalone demo flow was consolidated into /contact ("Request access").
  // Static build emits a meta-refresh redirect page so old /demo links don't 404.
  redirects: {
    "/demo": "/contact",
  },
});
