// Generates dist/llms-full.txt after each build: the llms.txt index followed
// by the full markdown of every blog post and use case, so LLM crawlers can
// ingest the site's actual content in one fetch instead of page by page.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://gooptimal.io";
const out = [];

out.push(readFileSync("public/llms.txt", "utf8").trimEnd());
out.push("\n\n---\n\n# Full content\n");

function frontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return [{}, src];
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w[\w-]*):\s*"?(.*?)"?\s*$/);
    if (kv) meta[kv[1]] = kv[2];
  }
  return [meta, src.slice(m[0].length)];
}

function section(dir, urlBase, label) {
  const files = readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
  for (const f of files) {
    const [meta, body] = frontmatter(readFileSync(join(dir, f), "utf8"));
    const slug = f.replace(/\.md$/, "");
    out.push(`\n## ${label}: ${meta.title ?? slug}\n`);
    out.push(`URL: ${SITE}${urlBase}/${slug}`);
    if (meta.date) out.push(`Published: ${meta.date}`);
    if (meta.description) out.push(`Summary: ${meta.description}`);
    out.push("");
    out.push(body.trim());
  }
}

section("src/content/blog", "/blog", "Field notes");
section("src/content/use-cases", "/use-cases", "Use case");

writeFileSync("dist/llms-full.txt", out.join("\n") + "\n");
console.log(`llms-full.txt written (${out.join("\n").length} chars)`);
