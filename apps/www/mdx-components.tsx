import type { MDXComponents } from "mdx/types"
import { getMDXComponents } from "@/components/docs/mdx-components"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components)
}
