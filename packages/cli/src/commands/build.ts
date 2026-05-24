import path from "node:path"
import fs from "fs-extra"
import * as p from "@clack/prompts"
import pc from "picocolors"
import { registryItemSchema, registrySchema } from "@elorm/schema"

interface BuildOptions {
  cwd?: string
  output?: string
  registry?: string
}

export async function buildCommand(options: BuildOptions = {}) {
  const cwd = options.cwd ?? process.cwd()
  const registryPath = path.resolve(cwd, options.registry ?? "registry.json")
  const outputDir = path.resolve(cwd, options.output ?? "public/r")

  if (!(await fs.pathExists(registryPath))) {
    p.log.error(`Registry not found: ${registryPath}`)
    process.exit(1)
  }

  const spinner = p.spinner()
  spinner.start("Building registry...")

  const raw = await fs.readJson(registryPath)
  const registry = registrySchema.parse(raw)

  await fs.emptyDir(outputDir)

  const builtItems = []

  for (const item of registry.items) {
    const filesWithContent = []

    for (const file of item.files) {
      const filePath = path.resolve(cwd, file.path)
      if (!(await fs.pathExists(filePath))) {
        spinner.stop(`File not found: ${file.path}`)
        p.log.error(`Missing file for ${item.name}: ${file.path}`)
        process.exit(1)
      }

      const content = await fs.readFile(filePath, "utf-8")
      filesWithContent.push({ ...file, content })
    }

    const builtItem = registryItemSchema.parse({
      ...item,
      files: filesWithContent,
    })

    const itemPath = path.join(outputDir, `${item.name}.json`)
    await fs.writeJson(itemPath, builtItem, { spaces: 0 })
    builtItems.push({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      categories: item.categories,
    })
  }

  const indexPath = path.join(path.dirname(outputDir), "registry.json")
  await fs.writeJson(
    indexPath,
    {
      ...registry,
      items: builtItems,
    },
    { spaces: 2 }
  )

  spinner.stop(`Built ${registry.items.length} registry item(s) to ${outputDir}`)
  p.outro(`${pc.green("Registry built successfully!")}`)
}
