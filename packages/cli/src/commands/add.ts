import path from "node:path"
import fs from "fs-extra"
import { execa } from "execa"
import * as p from "@clack/prompts"
import pc from "picocolors"
import type { ElormConfig, RegistryItem, UiLibrary } from "@elorm/schema"
import {
  dedupeByTarget,
  fetchRegistryItem,
  getConfig,
  getTargetPath,
  mergeCssVars,
  resolveRegistryUrl,
  topologicalSort,
  transformContent,
} from "../utils/index.js"

interface AddOptions {
  cwd?: string
  overwrite?: boolean
  dryRun?: boolean
  library?: UiLibrary
  interactive?: boolean
}

export async function addCommand(
  items: string[],
  options: AddOptions = {}
) {
  const cwd = options.cwd ?? process.cwd()
  const config = await getConfig(cwd)

  if (!config) {
    p.log.error(
      `No elorm.json found. Run ${pc.cyan("bunx elorm init")} or ${pc.cyan("npx elorm init")} first.`
    )
    process.exit(1)
  }

  let projectConfig: ElormConfig = config

  // Interactive library selection
  if (options.interactive && !options.library) {
    const choice = await p.select({
      message: "Which UI library would you like to use?",
      options: [
        {
          value: "base-ui",
          label: "Base UI",
          hint: "Modern, lightweight primitives from MUI",
        },
        {
          value: "radix",
          label: "Radix UI",
          hint: "Battle-tested, accessible components",
        },
        {
          value: "heroui",
          label: "HeroUI",
          hint: "React Aria + Tailwind v4 with elorm wrappers",
        },
        {
          value: "config",
          label: `Use config default (${config.uiLibrary})`,
          hint: "From elorm.json",
        },
      ],
    })

    if (p.isCancel(choice)) {
      p.cancel("Operation cancelled.")
      process.exit(0)
    }

    if (choice !== "config") {
      projectConfig = { ...config, uiLibrary: choice as UiLibrary }
      p.log.info(`Using ${pc.cyan(choice)}`)
    } else {
      p.log.info(`Using ${pc.cyan(config.uiLibrary)} from config`)
    }
  }
  // Allow library override via CLI flag
  else if (options.library) {
    if (
      options.library !== "base-ui" &&
      options.library !== "radix" &&
      options.library !== "heroui"
    ) {
      p.log.error(
        `Invalid library: ${options.library}. Must be 'base-ui', 'radix', or 'heroui'.`
      )
      process.exit(1)
    }
    projectConfig = { ...config, uiLibrary: options.library }
    p.log.info(`Using ${pc.cyan(options.library)} (override)`)
  } else {
    p.log.info(`Using ${pc.cyan(config.uiLibrary)} from config`)
  }

  if (items.length === 0) {
    p.log.error("Please specify at least one component to add.")
    process.exit(1)
  }

  const spinner = p.spinner()
  spinner.start("Resolving registry items...")

  const resolvedItems: RegistryItem[] = []
  const seen = new Set<string>()

  async function resolveItem(name: string) {
    const normalized = name.replace(/^@elorm\//, "")
    if (seen.has(normalized)) return
    seen.add(normalized)

    const url = resolveRegistryUrl(name, projectConfig)
    const item = await fetchRegistryItem(url)

    for (const dep of item.registryDependencies ?? []) {
      await resolveItem(dep)
    }

    resolvedItems.push(item)
  }

  try {
    for (const item of items) {
      await resolveItem(item)
    }
  } catch (error) {
    spinner.stop("Failed to resolve items.")
    p.log.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }

  spinner.stop(`Resolved ${resolvedItems.length} item(s).`)

  const sorted = topologicalSort(resolvedItems)
  const files = dedupeByTarget(sorted, projectConfig)

  const written: string[] = []
  const skipped: string[] = []

  for (const [target, { item, file }] of files) {
    const fullPath = path.join(cwd, target)

    if ((await fs.pathExists(fullPath)) && !options.overwrite) {
      skipped.push(target)
      continue
    }

    if (!file.content) {
      p.log.warn(`No content for ${item.name}/${file.path}`)
      continue
    }

    const content = transformContent(file.content, projectConfig)

    if (options.dryRun) {
      p.log.info(`Would write ${pc.cyan(target)}`)
      continue
    }

    await fs.ensureDir(path.dirname(fullPath))
    await fs.writeFile(fullPath, content)
    written.push(target)
  }

  if (!options.dryRun && !projectConfig.rsc && written.length > 0) {
    p.log.info('Stripped "use client" directives for Vite (non-RSC)')
  }

  if (!options.dryRun) {
    const cssPath = path.join(cwd, projectConfig.tailwind.css)
    if (await fs.pathExists(cssPath)) {
      let css = await fs.readFile(cssPath, "utf-8")
      for (const item of sorted) {
        if (item.cssVars) {
          css = mergeCssVars(css, item.cssVars)
        }
      }
      await fs.writeFile(cssPath, css)
    }

    const allDeps = new Set<string>()
    for (const item of sorted) {
      for (const dep of item.dependencies ?? []) {
        allDeps.add(dep)
      }
    }

    if (allDeps.size > 0) {
      const installSpinner = p.spinner()
      installSpinner.start("Installing dependencies...")
      try {
        const pm = await detectPackageManager(cwd)
        const args =
          pm === "pnpm" || pm === "yarn" || pm === "bun"
            ? ["add", ...allDeps]
            : ["install", ...allDeps]
        await execa(pm, args, { cwd, stdio: "pipe" })
        installSpinner.stop("Dependencies installed.")
      } catch {
        installSpinner.stop("Could not install dependencies automatically.")
        p.log.warn(`Install manually: ${[...allDeps].join(" ")}`)
      }
    }
  }

  if (written.length > 0) {
    p.log.success(`Added ${written.length} file(s):`)
    for (const f of written) {
      p.log.message(`  ${pc.cyan(f)}`)
    }
  }

  if (skipped.length > 0) {
    p.log.warn(`Skipped ${skipped.length} existing file(s). Use --overwrite to replace.`)
  }

  p.outro(`${pc.green("Done!")}`)
}

async function detectPackageManager(
  cwd: string
): Promise<"pnpm" | "yarn" | "bun" | "npm"> {
  if (await fs.pathExists(path.join(cwd, "bun.lock"))) return "bun"
  if (await fs.pathExists(path.join(cwd, "bun.lockb"))) return "bun"
  if (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (await fs.pathExists(path.join(cwd, "yarn.lock"))) return "yarn"
  return "npm"
}
