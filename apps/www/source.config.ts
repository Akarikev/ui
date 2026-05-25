import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"
import { commandTransformers } from "@/lib/highlight-code"

export const docs = defineDocs({
  dir: "content/docs",
})

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift()
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark-dimmed",
            light: "github-light",
          },
          defaultColor: false,
          transformers: [
            ...commandTransformers,
            {
              pre(node: { properties?: Record<string, unknown> }) {
                if (node.properties) {
                  delete node.properties.style
                }
              },
              code(node: { properties?: Record<string, unknown> }) {
                if (node.properties) {
                  delete node.properties.style
                }
              },
            },
          ],
        },
      ])
      return plugins
    },
  },
})
