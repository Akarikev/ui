import { createHash } from "crypto"
import { codeToHtml } from "shiki"
import type { ShikiTransformer } from "shiki"

const cache = new Map<string, string>()

function cacheKey(language: string, code: string) {
  return createHash("sha256").update(`${language}:${code}`).digest("hex")
}

export const commandTransformers = [
  {
    code(node: { tagName?: string; properties?: Record<string, unknown> }, index: number, parent: unknown) {
      if (node.tagName !== "code" || !node.properties) return
      const raw = (this as { source?: string }).source
      if (typeof raw !== "string") return
      node.properties["__raw__"] = raw

      if (raw.startsWith("npx elorm") || raw.startsWith("bunx elorm")) {
        node.properties["__npm__"] = raw.startsWith("bunx")
          ? raw.replace(/^bunx/, "npx")
          : raw
        node.properties["__pnpm__"] = raw.replace(/^npx|^bunx/, "pnpm dlx")
        node.properties["__yarn__"] = raw.replace(/^npx|^bunx/, "yarn dlx")
        node.properties["__bun__"] = raw.replace(/^npx/, "bunx")
      }
    },
  },
] as ShikiTransformer[]

export async function highlightCode(code: string, language = "tsx") {
  const key = cacheKey(language, code)
  const cached = cache.get(key)
  if (cached) return cached

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark-dimmed",
      light: "github-light",
    },
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          if (node.properties) {
            node.properties.class =
              "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none !bg-transparent"
            delete node.properties.style
          }
        },
        code(node) {
          if (node.properties) {
            node.properties["data-line-numbers"] = ""
            delete node.properties.style
          }
        },
        line(node) {
          if (node.properties) {
            node.properties["data-line"] = ""
          }
        },
      },
    ],
  })

  cache.set(key, html)
  return html
}
