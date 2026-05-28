import path from "node:path"
import fs from "fs-extra"
import { cosmiconfig } from "cosmiconfig"
import * as p from "@clack/prompts"
import pc from "picocolors"
import { elormConfigSchema, type ElormConfig } from "@elorm/schema"

const CONFIG_NAME = "elorm"

export interface ProjectInfo {
  configPath: string | null
  aliases: ElormConfig["aliases"]
  rsc: boolean
  uiLibrary: ElormConfig["uiLibrary"]
  framework: ElormConfig["framework"]
  style: ElormConfig["style"]
  iconLibrary: string
  tailwind: {
    css: string
    baseColor: ElormConfig["tailwind"]["baseColor"]
    version: "v4"
  }
  theme: ElormConfig["theme"]
  registries: ElormConfig["registries"]
  installedComponents: string[]
  installedBlocks: string[]
  resolvedPaths: {
    ui: string
    utils: string
    lib: string
    components: string
    hooks: string | null
    blocks: string | null
    tailwindCss: string
  }
}

export function aliasToRelativePath(alias: string): string {
  if (alias.startsWith("@/")) return alias.slice(2)
  if (alias.startsWith("~/")) return alias.slice(2)
  return alias
}

export async function resolveTsconfigPaths(
  cwd: string
): Promise<Record<string, string[]>> {
  for (const file of ["tsconfig.json", "tsconfig.app.json"]) {
    const configPath = path.join(cwd, file)
    if (await fs.pathExists(configPath)) {
      const tsconfig = (await fs.readJson(configPath)) as {
        compilerOptions?: { paths?: Record<string, string[]> }
      }
      return tsconfig.compilerOptions?.paths ?? {}
    }
  }
  return {}
}

export function resolveAliasPath(
  alias: string,
  cwd: string,
  tsPaths: Record<string, string[]>
): string {
  for (const [pattern, targets] of Object.entries(tsPaths)) {
    const target = targets[0]
    if (!target) continue

    const starIndex = pattern.indexOf("*")
    if (starIndex === -1) continue

    const prefix = pattern.slice(0, starIndex)
    if (alias.startsWith(prefix)) {
      const rest = alias.slice(prefix.length)
      const targetBase = target.slice(0, target.indexOf("*"))
      return path.resolve(cwd, targetBase + rest)
    }
  }

  return path.resolve(cwd, aliasToRelativePath(alias))
}

export async function listInstalledInDir(dirPath: string): Promise<string[]> {
  if (!(await fs.pathExists(dirPath))) return []

  const entries = await fs.readdir(dirPath)
  return entries
    .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
    .map((file) => file.replace(/\.tsx?$/, ""))
    .sort()
}

export async function buildProjectInfo(
  cwd: string,
  config: ElormConfig,
  configPath: string | null
): Promise<ProjectInfo> {
  const tsPaths = await resolveTsconfigPaths(cwd)

  const uiPath = resolveAliasPath(config.aliases.ui, cwd, tsPaths)
  const componentsPath = resolveAliasPath(
    config.aliases.components,
    cwd,
    tsPaths
  )
  const blocksPath = path.join(componentsPath, "blocks")
  const utilsPath = resolveAliasPath(config.aliases.utils, cwd, tsPaths)
  const libPath = resolveAliasPath(config.aliases.lib, cwd, tsPaths)
  const hooksPath = config.aliases.hooks
    ? resolveAliasPath(config.aliases.hooks, cwd, tsPaths)
    : null

  const [installedComponents, installedBlocks] = await Promise.all([
    listInstalledInDir(uiPath),
    listInstalledInDir(blocksPath),
  ])

  return {
    configPath,
    aliases: config.aliases,
    rsc: config.rsc,
    uiLibrary: config.uiLibrary,
    framework: config.framework,
    style: config.style,
    iconLibrary: config.iconLibrary,
    tailwind: {
      css: config.tailwind.css,
      baseColor: config.tailwind.baseColor,
      version: "v4",
    },
    theme: config.theme,
    registries: config.registries,
    installedComponents,
    installedBlocks,
    resolvedPaths: {
      ui: uiPath,
      utils: utilsPath,
      lib: libPath,
      components: componentsPath,
      hooks: hooksPath,
      blocks: (await fs.pathExists(blocksPath)) ? blocksPath : null,
      tailwindCss: path.resolve(cwd, config.tailwind.css),
    },
  }
}

interface InfoOptions {
  json?: boolean
  cwd?: string
}

export async function infoCommand(options: InfoOptions = {}) {
  const cwd = options.cwd ?? process.cwd()

  const explorer = cosmiconfig(CONFIG_NAME, {
    searchPlaces: [
      "elorm.json",
      ".elormrc",
      ".elormrc.json",
      "elorm.config.js",
      "package.json",
    ],
  })
  const result = await explorer.search(cwd)

  if (!result?.config) {
    p.log.error(`No elorm.json found. Run ${pc.cyan("npx elorm init")} first.`)
    process.exit(1)
  }

  const config = elormConfigSchema.parse(result.config)
  const info = await buildProjectInfo(cwd, config, result.filepath ?? null)

  if (options.json) {
    console.log(JSON.stringify(info, null, 2))
    return
  }

  p.log.info(`${pc.bold("elorm/ui")} project info`)
  if (info.configPath) {
    p.log.message(`Config: ${pc.cyan(info.configPath)}`)
  }
  p.log.message(`UI library: ${pc.cyan(info.uiLibrary)}`)
  p.log.message(`Framework: ${pc.cyan(info.framework)}`)
  p.log.message(`RSC: ${pc.cyan(String(info.rsc))}`)
  p.log.message(
    `Theme: ${pc.cyan(info.tailwind.baseColor)} / ${pc.cyan(info.theme.accent)} / ${pc.cyan(info.theme.radius)}`
  )

  if (info.installedComponents.length) {
    p.log.message(
      `\nComponents (${info.installedComponents.length}): ${info.installedComponents.join(", ")}`
    )
  } else {
    p.log.message("\nNo components installed yet.")
  }

  if (info.installedBlocks.length) {
    p.log.message(`Blocks: ${info.installedBlocks.join(", ")}`)
  }
}
