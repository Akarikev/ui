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

function stripClientDirective(content: string): string {
  return content
    .replace(/^\s*"use client";?\s*(?:\r?\n)?/, "")
    .replace(/^\s*'use client';?\s*(?:\r?\n)?/, "")
    .replace(/^\s*\/\*\s*"use client"\s*\*\/\s*(?:\r?\n)?/, "")
    .replace(/^\s*\/\*\s*'use client'\s*\*\/\s*(?:\r?\n)?/, "")
}

export function transformContent(content: string, config: ElormConfig): string {
  let result = content
  if (!config.rsc) {
    result = stripClientDirective(result)
  }
  result = transformImports(result, config)
  return result
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

type CssVariableMode = "theme" | "light" | "dark"
type CssVariableBlocks = Partial<Record<CssVariableMode, Record<string, string>>>

interface CssBlock {
  start: number
  end: number
  openBrace: number
  closeBrace: number
  content: string
}

const CSS_BLOCKS: Record<
  CssVariableMode,
  { matcher: RegExp; header: string }
> = {
  theme: { matcher: /(^|\n)\s*@theme\s+inline\s*\{/, header: "@theme inline" },
  light: { matcher: /(^|\n)\s*:root\s*\{/, header: ":root" },
  dark: { matcher: /(^|\n)\s*\.dark\s*\{/, header: ".dark" },
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function findCssBlock(css: string, matcher: RegExp): CssBlock | null {
  const match = matcher.exec(css)
  if (!match?.index && match?.index !== 0) return null

  const leadingNewline = match[0].match(/^\r?\n/)
  const start = match.index + (leadingNewline?.[0].length ?? 0)
  const openBrace = css.indexOf("{", start)
  if (openBrace === -1) return null

  let depth = 0
  for (let index = openBrace; index < css.length; index++) {
    const char = css[index]
    if (char === "{") depth++
    if (char === "}") depth--
    if (depth === 0) {
      return {
        start,
        openBrace,
        closeBrace: index,
        end: index + 1,
        content: css.slice(openBrace + 1, index),
      }
    }
  }

  return null
}

function parseCssVariables(css: string): Record<string, string> {
  const vars: Record<string, string> = {}
  const regex = /--([\w-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(css))) {
    vars[match[1]] = match[2].trim()
  }

  return vars
}

function extractVariables(css: string, mode: CssVariableMode): Record<string, string> {
  const block = findCssBlock(css, CSS_BLOCKS[mode].matcher)
  return block ? parseCssVariables(block.content) : {}
}

function formatCssVariableBlock(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n")
}

function appendCssBlock(css: string, header: string, vars: Record<string, string>): string {
  const block = `${header} {\n${formatCssVariableBlock(vars)}\n}`
  return `${css.trimEnd()}\n\n${block}\n`
}

function mergeCssVariableBlock(
  css: string,
  mode: CssVariableMode,
  vars: Record<string, string>
): string {
  if (!Object.keys(vars).length) return css

  const definition = CSS_BLOCKS[mode]
  const block = findCssBlock(css, definition.matcher)
  if (!block) {
    return appendCssBlock(css, definition.header, vars)
  }

  let content = block.content
  for (const key of Object.keys(vars)) {
    const declaration = new RegExp(
      `^[ \\t]*--${escapeRegExp(key)}\\s*:[^;]+;[ \\t]*(?:\\r?\\n)?`,
      "gm"
    )
    content = content.replace(declaration, "")
  }

  const customContent = content.trimEnd()
  const mergedContent = customContent
    ? `\n${customContent}\n${formatCssVariableBlock(vars)}\n`
    : `\n${formatCssVariableBlock(vars)}\n`

  return `${css.slice(0, block.openBrace + 1)}${mergedContent}${css.slice(
    block.closeBrace
  )}`
}

function mergeCssVariableBlocks(css: string, blocks: CssVariableBlocks): string {
  let result = css

  for (const mode of ["theme", "light", "dark"] satisfies CssVariableMode[]) {
    const vars = blocks[mode]
    if (vars) {
      result = mergeCssVariableBlock(result, mode, vars)
    }
  }

  return result
}

function ensureCssStatement(css: string, statement: string): string {
  if (css.includes(statement)) return css

  if (statement.startsWith("@import")) {
    const tailwindImport = '@import "tailwindcss";'
    if (statement !== tailwindImport && css.includes(tailwindImport)) {
      return css.replace(tailwindImport, `${tailwindImport}\n${statement}`)
    }

    return `${statement}\n${css.trimStart()}`
  }

  const imports = [...css.matchAll(/^@import\s+[^;]+;/gm)]
  if (!imports.length) {
    return `${statement}\n${css.trimStart()}`
  }

  const lastImport = imports[imports.length - 1]
  const insertAt = (lastImport.index ?? 0) + lastImport[0].length

  return `${css.slice(0, insertAt).trimEnd()}\n\n${statement}${css
    .slice(insertAt)
    .replace(/^\s*/, "\n\n")}`
}

function extractCssStatements(css: string, prefix: string): string[] {
  return css
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith(prefix) && line.endsWith(";"))
}

export function mergeProjectCss(existingCss: string, projectCss: string): string {
  let result = existingCss

  for (const statement of extractCssStatements(projectCss, "@import")) {
    result = ensureCssStatement(result, statement)
  }

  for (const statement of extractCssStatements(projectCss, "@custom-variant")) {
    result = ensureCssStatement(result, statement)
  }

  result = mergeCssVariableBlocks(result, {
    theme: extractVariables(projectCss, "theme"),
    light: extractVariables(projectCss, "light"),
    dark: extractVariables(projectCss, "dark"),
  })

  const projectBaseLayer = findCssBlock(projectCss, /(^|\n)\s*@layer\s+base\s*\{/)
  const hasBaseLayer = findCssBlock(result, /(^|\n)\s*@layer\s+base\s*\{/)
  if (projectBaseLayer && !hasBaseLayer) {
    result = `${result.trimEnd()}\n\n${projectCss.slice(
      projectBaseLayer.start,
      projectBaseLayer.end
    )}\n`
  }

  return result.endsWith("\n") ? result : `${result}\n`
}

export function mergeCssVars(
  css: string,
  cssVars: RegistryItem["cssVars"]
): string {
  if (!cssVars) return css

  return mergeCssVariableBlocks(css, {
    theme: cssVars.theme,
    light: cssVars.light,
    dark: cssVars.dark,
  })
}

export function generateProjectCss(config: ElormConfig): string {
  return generateCssTemplate({
    baseColor: config.tailwind.baseColor,
    accent: config.theme.accent,
    radius: config.theme.radius,
    uiLibrary: config.uiLibrary,
  })
}

export const ELORM_CSS_TEMPLATE = generateCssTemplate()

export const CN_UTIL_TEMPLATE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
