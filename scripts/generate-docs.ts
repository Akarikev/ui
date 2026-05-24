#!/usr/bin/env bun
/**
 * Generates/enriches component MDX docs from registry.json metadata.
 * Usage: bun scripts/generate-docs.ts
 */
import fs from "node:fs/promises"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const REGISTRY_PATH = path.join(ROOT, "registry.json")
const DOCS_COMPONENTS_DIR = path.join(ROOT, "docs/components")

interface RegistryExample {
  title: string
  code: string
}

interface RegistryMeta {
  usage?: string
  composition?: string[]
  antiPatterns?: string[]
  examples?: RegistryExample[]
}

interface RegistryItem {
  name: string
  title?: string
  description?: string
  type: string
  meta?: RegistryMeta
}

interface Registry {
  items: RegistryItem[]
}

const DOC_COMPONENTS = new Set([
  "button",
  "input",
  "textarea",
  "label",
  "checkbox",
  "switch",
  "select",
  "dialog",
  "sheet",
  "dropdown-menu",
  "tooltip",
  "card",
  "badge",
  "separator",
  "skeleton",
  "empty-state",
  "stat-card",
  "page-header",
])

function pascalCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function getImportName(name: string): string {
  const map: Record<string, string> = {
    "dropdown-menu": "DropdownMenu",
    "empty-state": "EmptyState",
    "stat-card": "StatCard",
    "page-header": "PageHeader",
  }
  return map[name] ?? pascalCase(name)
}

function defaultExampleCode(name: string, importName: string): string {
  const defaults: Record<string, string> = {
    button: "<Button>Click me</Button>",
    input: '<Input type="email" placeholder="Email" />',
    checkbox: "<Checkbox />",
    switch: "<Switch />",
    card: "<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>",
    dialog:
      "<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogTitle>Title</DialogTitle></DialogContent></Dialog>",
    badge: '<Badge>New</Badge>',
    skeleton: '<Skeleton className="h-4 w-full" />',
  }
  return defaults[name] ?? `<${importName} />`
}

function generateMdx(item: RegistryItem): string {
  const title = item.title ?? pascalCase(item.name)
  const description =
    item.description ?? `Documentation for the ${title} component.`
  const importName = getImportName(item.name)
  const importPath =
    item.type === "registry:block"
      ? `@/components/blocks/${item.name}`
      : `@/components/ui/${item.name}`

  const lines: string[] = [
    "---",
    `title: ${title}`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    "---",
    "",
    "## Installation",
    "",
    `<InstallCommand command="elorm add ${item.name}" />`,
    "",
    "## Preview",
    "",
    `<ComponentPreview component="${item.name}" />`,
    "",
    "## Usage",
    "",
    "```tsx",
    `import { ${importName} } from '${importPath}'`,
    "```",
    "",
    description,
    "",
  ]

  const examples =
    item.meta?.examples ??
    (DOC_COMPONENTS.has(item.name)
      ? [
          {
            title: "Default",
            code: defaultExampleCode(item.name, importName),
          },
        ]
      : [])

  if (examples.length) {
    lines.push("## Examples", "")
    for (const example of examples) {
      lines.push(`### ${example.title}`, "")
      lines.push("<Tabs>", "")
      lines.push('  <Tab title="Preview">', "")
      lines.push(`    <ComponentPreview component="${item.name}" />`, "")
      lines.push("  </Tab>", "")
      lines.push('  <Tab title="Code">', "")
      lines.push("    ```tsx", example.code, "    ```", "")
      lines.push("  </Tab>", "")
      lines.push("</Tabs>", "")
    }
  }

  if (item.meta?.usage) {
    lines.push("## Usage notes", "")
    lines.push(item.meta.usage, "")
    lines.push("")
  }

  if (item.meta?.composition?.length) {
    lines.push("## Composition", "")
    lines.push(item.meta.composition.join(", "), "")
    lines.push("")
  }

  if (item.meta?.antiPatterns?.length) {
    lines.push("## Avoid", "")
    for (const ap of item.meta.antiPatterns) {
      lines.push(`- ${ap}`)
    }
    lines.push("")
  }

  return lines.join("\n")
}

async function main() {
  const raw = await fs.readFile(REGISTRY_PATH, "utf-8")
  const registry = JSON.parse(raw) as Registry

  await fs.mkdir(DOCS_COMPONENTS_DIR, { recursive: true })

  let count = 0
  for (const item of registry.items) {
    if (item.type === "registry:lib") continue
    if (!DOC_COMPONENTS.has(item.name)) continue

    const mdx = generateMdx(item)
    const outPath = path.join(DOCS_COMPONENTS_DIR, `${item.name}.mdx`)
    await fs.writeFile(outPath, mdx)
    count++
  }

  console.log(`Generated ${count} component docs in docs/components/`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
