// @ts-check
import { defineConfig } from "astro/config";

// Static marketing site. Set `site` to the production origin once a domain is
// chosen (used for canonical URLs + sitemap).
export default defineConfig({
  site: "https://gooptimal.io",
  // The standalone demo flow was consolidated into /contact ("Request access").
  // Static build emits a meta-refresh redirect page so old /demo links don't 404.
  redirects: {
    "/demo": "/contact",
  },
});
