import fs from "fs-extra"
import path from "node:path"
import * as p from "@clack/prompts"
import pc from "picocolors"
import { getConfig, resolveRegistryUrl, fetchRegistryItem } from "../utils/index.js"

interface DocsOptions {
  json?: boolean
  cwd?: string
}

export async function docsCommand(itemName: string, options: DocsOptions = {}) {
  const config = await getConfig(options.cwd)

  if (!config) {
    p.log.error(`No elorm.json found. Run ${pc.cyan("npx elorm init")} first.`)
    process.exit(1)
  }

  const url = resolveRegistryUrl(itemName, config)

  try {
    const item = await fetchRegistryItem(url)

    const docs = {
      name: item.name,
      title: item.title,
      description: item.description,
      type: item.type,
      install: `npx elorm add ${item.name}`,
      dependencies: item.dependencies ?? [],
      registryDependencies: item.registryDependencies ?? [],
      files: item.files.map((f) => f.path),
      meta: item.meta ?? null,
      categories: item.categories ?? [],
    }

    if (options.json) {
      console.log(JSON.stringify(docs, null, 2))
      return
    }

    p.log.info(`${pc.bold(item.title ?? item.name)}`)
    if (item.description) p.log.message(item.description)
    p.log.message(`\nInstall: ${pc.cyan(docs.install)}`)

    if (item.meta?.usage) {
      p.log.message(`\n${pc.bold("Usage:")} ${item.meta.usage}`)
    }

    if (item.meta?.composition?.length) {
      p.log.message(
        `\n${pc.bold("Composition:")} ${item.meta.composition.join(", ")}`
      )
    }

    if (item.meta?.antiPatterns?.length) {
      p.log.message(`\n${pc.bold("Avoid:")}`)
      for (const ap of item.meta.antiPatterns) {
        p.log.message(`  • ${ap}`)
      }
    }

    if (item.meta?.examples?.length) {
      p.log.message(`\n${pc.bold("Examples:")}`)
      for (const ex of item.meta.examples) {
        p.log.message(`  ${pc.cyan(ex.title)}`)
      }
    }
  } catch (error) {
    p.log.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

interface DiffOptions {
  cwd?: string
}

export async function diffCommand(itemName: string, options: DiffOptions = {}) {
  const cwd = options.cwd ?? process.cwd()
  const config = await getConfig(cwd)

  if (!config) {
    p.log.error(`No elorm.json found.`)
    process.exit(1)
  }

  const url = resolveRegistryUrl(itemName, config)

  try {
    const item = await fetchRegistryItem(url)

    for (const file of item.files) {
      const basename = path.basename(file.path)
      const localPath = path.join(
        cwd,
        config.aliases.ui.replace(/^@\//, ""),
        basename
      )

      if (!(await fs.pathExists(localPath))) {
        p.log.info(`${pc.cyan(basename)} — not installed locally`)
        continue
      }

      const local = await fs.readFile(localPath, "utf-8")
      const remote = file.content ?? ""

      if (local === remote) {
        p.log.success(`${pc.cyan(basename)} — up to date`)
      } else {
        p.log.warn(`${pc.cyan(basename)} — differs from registry`)
        p.log.message(`  Local: ${local.split("\n").length} lines`)
        p.log.message(`  Remote: ${remote.split("\n").length} lines`)
      }
    }
  } catch (error) {
    p.log.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}
