// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";

// lib/highlight-code.ts
import { codeToHtml } from "shiki";
var commandTransformers = [
  {
    code(node, index, parent) {
      if (node.tagName !== "code" || !node.properties) return;
      const raw = this.source;
      if (typeof raw !== "string") return;
      node.properties["__raw__"] = raw;
      if (raw.startsWith("npx elorm") || raw.startsWith("bunx elorm")) {
        node.properties["__npm__"] = raw.startsWith("bunx") ? raw.replace(/^bunx/, "npx") : raw;
        node.properties["__pnpm__"] = raw.replace(/^npx|^bunx/, "pnpm dlx");
        node.properties["__yarn__"] = raw.replace(/^npx|^bunx/, "yarn dlx");
        node.properties["__bun__"] = raw.replace(/^npx/, "bunx");
      }
    }
  }
];

// source.config.ts
var docs = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark-dimmed",
            light: "github-light"
          },
          defaultColor: false,
          transformers: [
            ...commandTransformers,
            {
              pre(node) {
                if (node.properties) {
                  delete node.properties.style;
                }
              },
              code(node) {
                if (node.properties) {
                  delete node.properties.style;
                }
              }
            }
          ]
        }
      ]);
      return plugins;
    }
  }
});
export {
  source_config_default as default,
  docs
};
