import * as p from "@clack/prompts"
import pc from "picocolors"
import { getConfig, fetchRegistryIndex } from "../utils/index.js"

interface SearchOptions {
  query?: string
  cwd?: string
}

export async function searchCommand(options: SearchOptions = {}) {
  const config = await getConfig(options.cwd)
  const registryUrl =
    config?.registries["@elorm"]?.replace("{name}.json", "registry.json") ??
    "https://ui.elorm.xyz/registry.json"

  try {
    const registry = await fetchRegistryIndex(registryUrl)
    const query = options.query?.toLowerCase() ?? ""

    const results = registry.items.filter((item) => {
      if (!query) return true
      return (
        item.name.toLowerCase().includes(query) ||
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      )
    })

    if (results.length === 0) {
      p.log.info(`No items found matching "${query}"`)
      return
    }

    p.log.info(`${pc.bold("elorm/ui")} registry — ${results.length} item(s)`)
    for (const item of results) {
      p.log.message(
        `  ${pc.cyan(item.name.padEnd(20))} ${item.title ?? ""} ${pc.dim(item.description ?? "")}`
      )
    }
  } catch (error) {
    p.log.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}
