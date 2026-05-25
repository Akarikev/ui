import path from "node:path"
import fs from "fs-extra"
import { cosmiconfig } from "cosmiconfig"
import { generateCssTemplate } from "@elorm/themes"
import {
  elormConfigSchema,
  type ElormConfig,
  type Registry,
  type RegistryItem,
} from "@elorm/schema"

const CONFIG_NAME = "elorm"

export async function getConfig(cwd = process.cwd()): Promise<ElormConfig | null> {
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
    return null
  }
  return elormConfigSchema.parse(result.config)
}

export async function writeConfig(
  config: ElormConfig,
  cwd = process.cwd()
): Promise<void> {
  const configPath = path.join(cwd, "elorm.json")
  await fs.writeJson(
    configPath,
    { $schema: "https://ui.elorm.xyz/schema/elorm.json", ...config },
    { spaces: 2 }
  )
}

export function resolveRegistryUrl(
  itemName: string,
  config: ElormConfig
): string {
  const applyTemplate = (template: string, name: string) =>
    template
      .replace("{name}", name)
      .replace("{style}", config.style)
      .replace("{library}", config.uiLibrary)

  if (itemName.startsWith("http://") || itemName.startsWith("https://")) {
    return itemName
  }

  if (itemName.includes("/")) {
    const [namespace, name] = itemName.split("/")
    const registryKey = `@${namespace.replace(/^@/, "")}`
    const template = config.registries[registryKey]
    if (!template) {
      throw new Error(`Unknown registry namespace: ${registryKey}`)
    }
    return applyTemplate(template, name)
  }

  const template =
    config.registries["@elorm"] ??
    "https://ui.elorm.xyz/r/{library}/{name}.json"
  return applyTemplate(template, itemName)
}

export function isSafeTarget(target: string): boolean {
  const normalized = path.normalize(target)
  if (normalized.startsWith("..")) return false
  if (path.isAbsolute(normalized)) return false
  return true
}

export function getTargetPath(
  file: RegistryItem["files"][number],
  config: ElormConfig
): string {
  if (file.target) {
    if (!isSafeTarget(file.target)) {
      throw new Error(`Unsafe target path: ${file.target}`)
    }
    return file.target
  }

  const basename = path.basename(file.path)
  switch (file.type) {
    case "registry:ui":
    case "registry:component":
      return path.join(config.aliases.ui.replace(/^@\//, ""), basename)
    case "registry:hook":
      return path.join(
        (config.aliases.hooks ?? "@/hooks").replace(/^@\//, ""),
        basename
      )
    case "registry:lib":
      return path.join(config.aliases.lib.replace(/^@\//, ""), basename)
    case "registry:block":
      return path.join(
        config.aliases.components.replace(/^@\//, ""),
        "blocks",
        basename
      )
    default:
      return basename
  }
}

export function transformImports(
  content: string,
  config: ElormConfig
): string {
  return content
    .replace(/@\/components\/ui/g, config.aliases.ui)
    .replace(/@\/components/g, config.aliases.components)
    .replace(/@\/lib\/utils/g, config.aliases.utils)
    .replace(/@\/lib/g, config.aliases.lib)
    .replace(/@\/hooks/g, config.aliases.hooks ?? "@/hooks")
}

export async function fetchRegistryItem(url: string): Promise<RegistryItem> {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    const filePath = url.startsWith("file://") ? url.slice(7) : url
    if (await fs.pathExists(filePath)) {
      return (await fs.readJson(filePath)) as RegistryItem
    }
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "elorm",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch registry item: ${url} (${response.status})`)
  }

  return (await response.json()) as RegistryItem
}

export async function fetchRegistryIndex(url: string): Promise<Registry> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "elorm",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch registry index: ${url} (${response.status})`)
  }

  return (await response.json()) as Registry
}

export function topologicalSort(items: RegistryItem[]): RegistryItem[] {
  const itemMap = new Map(items.map((item) => [item.name, item]))
  const visited = new Set<string>()
  const result: RegistryItem[] = []

  function visit(name: string) {
    if (visited.has(name)) return
    visited.add(name)

    const item = itemMap.get(name)
    if (!item) return

    for (const dep of item.registryDependencies ?? []) {
      const depName = dep.includes("/") ? dep.split("/").pop()! : dep
      visit(depName)
    }

    result.push(item)
  }

  for (const item of items) {
    visit(item.name)
  }

  return result
}

export function dedupeByTarget(
  items: RegistryItem[],
  config: ElormConfig
): Map<string, { item: RegistryItem; file: RegistryItem["files"][number] }> {
  const files = new Map<
    string,
    { item: RegistryItem; file: RegistryItem["files"][number] }
  >()

  for (const item of items) {
    for (const file of item.files) {
      const target = getTargetPath(file, config)
      files.set(target, { item, file })
    }
  }

  return files
}

export function mergeCssVars(
  css: string,
  cssVars: RegistryItem["cssVars"]
): string {
  if (!cssVars) return css

  let result = css

  for (const [mode, vars] of Object.entries(cssVars)) {
    if (!vars) continue
    const selector =
      mode === "light"
        ? ":root"
        : mode === "dark"
          ? ".dark"
          : mode === "theme"
            ? "@theme inline"
            : null

    if (!selector) continue

    const block = Object.entries(vars)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n")

    if (selector === "@theme inline") {
      const themeBlock = `@theme inline {\n${block}\n}`
      if (result.includes("@theme inline")) {
        result = result.replace(
          /@theme inline \{[^}]*\}/,
          themeBlock
        )
      } else {
        result += `\n\n${themeBlock}\n`
      }
    } else {
      const varBlock = `${selector} {\n${block}\n}`
      if (result.includes(selector)) {
        for (const [key, value] of Object.entries(vars)) {
          const regex = new RegExp(`(--${key}:\\s*)[^;]+;`)
          if (regex.test(result)) {
            result = result.replace(regex, `$1${value};`)
          } else {
            result = result.replace(
              new RegExp(`(${selector.replace(".", "\\.")} \\{)`),
              `$1\n  --${key}: ${value};`
            )
          }
        }
      } else {
        result += `\n\n${varBlock}\n`
      }
    }
  }

  return result
}

export function generateProjectCss(config: ElormConfig): string {
  return generateCssTemplate({
    baseColor: config.tailwind.baseColor,
    accent: config.theme.accent,
    radius: config.theme.radius,
  })
}

export const ELORM_CSS_TEMPLATE = generateCssTemplate()

export const CN_UTIL_TEMPLATE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
