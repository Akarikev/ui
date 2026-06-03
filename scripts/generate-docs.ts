#!/usr/bin/env bun
/**
 * Generates/enriches component MDX docs from registry.json metadata.
 * Usage: bun scripts/generate-docs.ts
 */
import fs from "node:fs/promises"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const REGISTRY_PATH = path.join(ROOT, "registry.json")
const DOCS_COMPONENTS_DIR = path.join(
  ROOT,
  "apps/www/content/docs/components"
)
const DOCS_EXAMPLE_CODE_PATH = path.join(
  ROOT,
  "apps/www/lib/docs-example-code.ts"
)
const DEMOS_DIR = path.join(ROOT, "apps/www/components/demos")

interface DocsCodeEntry {
  base: string
  radix: string
  heroui: string
}

interface RegistryExample {
  title: string
  code: string
  description?: string
}

interface RegistryMeta {
  usage?: string
  docsLead?: string
  docsTitle?: string
  docsDescription?: string
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
  "social-links",
  "separator",
  "skeleton",
  "field",
  "input-group",
  "spinner",
  "radio-group",
  "toggle-group",
  "tabs",
  "alert",
  "avatar",
  "navii-avatar",
  "popover",
  "alert-dialog",
  "progress",
  "table",
  "pagination",
  "breadcrumb",
  "accordion",
  "collapsible",
  "empty-state",
  "stat-card",
  "benchmark-grid",
  "prompt-composer",
  "page-header",
  "login-form",
  "settings-section",
  "data-table",
  "command",
  "sonner",
  "mode-toggle",
  "icon-nav-link",
  "page-footer",
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
    "input-group": "InputGroup",
    "radio-group": "RadioGroup",
    "toggle-group": "ToggleGroup",
    "alert-dialog": "AlertDialog",
    "login-form": "LoginForm",
    "settings-section": "SettingsSection",
    "data-table": "DataTable",
    "icon-nav-link": "IconNavLink",
    "page-footer": "PageFooter",
    "mode-toggle": "ModeToggle",
  }
  return map[name] ?? pascalCase(name)
}

function defaultExampleCode(name: string, importName: string): string {
  const defaults: Record<string, string> = {
    button: "<Button>Click me</Button>",
    input: '<Input type="email" placeholder="Email" />',
    textarea: '<Textarea placeholder="Write your message..." />',
    label: '<Label htmlFor="email">Email</Label>',
    checkbox: "<Checkbox />",
    switch: "<Switch />",
    select: `<Select>
  <SelectTrigger className="w-full max-w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    card: "<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>",
    dialog:
      "<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogTitle>Title</DialogTitle></DialogContent></Dialog>",
    sheet:
      "<Sheet><SheetTrigger>Open</SheetTrigger><SheetContent><SheetHeader><SheetTitle>Title</SheetTitle></SheetHeader></SheetContent></Sheet>",
    "dropdown-menu":
      "<DropdownMenu><DropdownMenuTrigger>Open</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Profile</DropdownMenuItem></DropdownMenuContent></DropdownMenu>",
    tooltip:
      "<Tooltip><TooltipTrigger>Hover me</TooltipTrigger><TooltipContent>Helpful tip</TooltipContent></Tooltip>",
    badge: "<Badge>New</Badge>",
    separator:
      '<div><p className="text-sm">Top content</p><Separator className="my-4" /><p className="text-sm">Bottom content</p></div>',
    skeleton: '<Skeleton className="h-4 w-full" />',
    "empty-state":
      '<EmptyState title="No results found" description="Try adjusting your search." />',
    "stat-card":
      '<StatCard title="Revenue" value="$12,420" description="+12% from last month" trend={{ value: "+12%", positive: true }} />',
    "page-header":
      '<PageHeader title="Dashboard" description="Monitor your metrics and team activity." />',
    table: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Alice Chen</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Bob Smith</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>Editor</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    "data-table": `<DataTable
  rows={[
    { id: "1", name: "Alice Chen", email: "alice@example.com", status: "Active" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Pending" },
    { id: "3", name: "Carol Lee", email: "carol@example.com", status: "Active" },
  ]}
/>`,
  }
  return defaults[name] ?? `<${importName} />`
}

function defaultImportCode(name: string, importPath: string, importName: string): string {
  const map: Record<string, string> = {
    select: `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "${importPath}"`,
    table: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "${importPath}"`,
    dialog: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "${importPath}"`,
    sheet: `import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "${importPath}"`,
    "dropdown-menu": `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "${importPath}"`,
    tooltip: `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "${importPath}"`,
  }

  return map[name] ?? `import { ${importName} } from "${importPath}"`
}

function herouiImportCode(name: string, importPath: string, importName: string): string {
  const base = defaultImportCode(name, importPath, importName)
  const overrides: Record<string, string> = {
    select: `${base}\n\n// HeroUI preset: generated via \`elorm init --ui-library heroui\``,
    dialog: `${base}\n\n// HeroUI preset: generated via \`elorm init --ui-library heroui\``,
    sheet: `${base}\n\n// HeroUI preset: generated via \`elorm init --ui-library heroui\``,
    "dropdown-menu": `${base}\n\n// HeroUI preset: generated via \`elorm init --ui-library heroui\``,
  }
  return overrides[name] ?? base
}

function radixImportCode(name: string, importPath: string, importName: string): string {
  const base = defaultImportCode(name, importPath, importName)
  const overrides: Record<string, string> = {
    select: `${base}\n\n// Radix preset: generated via \`elorm init --ui-library radix\``,
    dialog: `${base}\n\n// Radix preset: generated via \`elorm init --ui-library radix\``,
    sheet: `${base}\n\n// Radix preset: generated via \`elorm init --ui-library radix\``,
    "dropdown-menu": `${base}\n\n// Radix preset: generated via \`elorm init --ui-library radix\``,
  }
  return overrides[name] ?? base
}

function exampleSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-")
}

function radixVariantCode(name: string, baseCode: string): string {
  const map: Record<string, string> = {
    select: `<Select>
  <SelectTrigger className="w-full max-w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
  }
  return map[name] ?? baseCode
}

function formatJsxSnippet(code: string): string {
  const trimmed = code.trim()
  if (trimmed.includes("\n") || !trimmed.includes("><")) {
    return trimmed
  }

  let depth = 0
  return trimmed
    .replace(/></g, ">\n<")
    .split("\n")
    .map((line) => {
      const current = line.trim()
      if (current.startsWith("</")) {
        depth = Math.max(depth - 1, 0)
      }

      const formatted = `${"  ".repeat(depth)}${current}`
      const isOpeningTag =
        /^<[A-Z][^/!>]*>$/.test(current) && !current.startsWith("</")

      if (isOpeningTag) {
        depth += 1
      }

      return formatted
    })
    .join("\n")
}

function indentCode(code: string, spaces = 4): string {
  const padding = " ".repeat(spaces)
  return code
    .split("\n")
    .map((line) => (line.length ? `${padding}${line}` : line))
    .join("\n")
}

function demoComponentName(name: string, importName: string): string {
  return `${importName || pascalCase(name)}Demo`
}

function completeExampleCode(
  name: string,
  importName: string,
  importCode: string,
  exampleCode: string
): string {
  if (exampleCode.trimStart().startsWith("import ")) {
    return exampleCode
  }

  const formattedExample = formatJsxSnippet(exampleCode)

  return `${importCode}

export function ${demoComponentName(name, importName)}() {
  return (
${indentCode(formattedExample)}
  )
}`
}

function fallbackExamples(name: string, importName: string): RegistryExample[] {
  const defaults: Record<string, RegistryExample[]> = {
    button: [
      { title: "Default", code: "<Button>Click me</Button>" },
      {
        title: "Outline",
        description: 'Use `variant="outline"` for secondary actions.',
        code: '<Button variant="outline">Cancel</Button>',
      },
    ],
    input: [
      { title: "Default", code: '<Input type="email" placeholder="name@example.com" />' },
      {
        title: "Disabled",
        code: '<Input type="text" disabled value="Disabled input" />',
      },
    ],
    textarea: [
      { title: "Default", code: '<Textarea placeholder="Write your message..." />' },
      { title: "With rows", code: '<Textarea rows={6} placeholder="Tell us more..." />' },
    ],
    select: [
      { title: "Default", code: defaultExampleCode("select", importName) },
      {
        title: "Compact",
        code: `<Select>
  <SelectTrigger className="w-[140px]">
    <SelectValue placeholder="Size" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="sm">Small</SelectItem>
    <SelectItem value="md">Medium</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
  }

  return defaults[name] ?? [{ title: "Default", code: defaultExampleCode(name, importName) }]
}

function mergeExamples(primary: RegistryExample[], fallback: RegistryExample[]) {
  const byTitle = new Map<string, RegistryExample>()
  for (const example of primary) {
    byTitle.set(example.title.toLowerCase(), example)
  }
  for (const example of fallback) {
    const key = example.title.toLowerCase()
    if (!byTitle.has(key)) {
      byTitle.set(key, example)
    }
  }
  return Array.from(byTitle.values())
}

async function readFileIfExists(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf-8")
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null
    }

    throw error
  }
}

function compositionTree(title: string, parts: string[]): string {
  const lines = [title, ...parts.map((part) => `├── ${part}`)]
  return ["```text", ...lines, "```"].join("\n")
}

/** Wrap inline JSX-like tags in backticks so MDX does not treat them as components. */
function escapeMdxProse(text: string): string {
  return text.replace(/<([A-Z][\w.-]*(?:\s[^>]*)?\/?)>/g, (match) => {
    if (match.startsWith("`") || match.endsWith("`")) {
      return match
    }
    return `\`${match}\``
  })
}

function generateMdx(item: RegistryItem, examples: RegistryExample[]): string {
  const title = item.title ?? pascalCase(item.name)
  const description =
    item.description ?? `Documentation for the ${title} component.`
  const docsDescription = item.meta?.docsDescription ?? description
  const docsLead = item.meta?.docsLead ?? description

  const lines: string[] = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    ...(item.meta?.docsTitle
      ? [`linkedTitle: "${item.meta.docsTitle.replace(/"/g, '\\"')}"`]
      : []),
    `description: "${docsDescription.replace(/"/g, '\\"')}"`,
    "---",
    "",
    `<ComponentPreviewTabs component="${item.name}" />`,
    "",
    "## Installation",
    "",
    `<InstallCommand command="elorm add ${item.name}" />`,
    "",
    "## Usage",
    "",
    `<LibraryCodeBlock component="${item.name}" />`,
    "",
    escapeMdxProse(docsLead),
    "",
  ]

  if (item.meta?.usage) {
    lines.push(escapeMdxProse(item.meta.usage), "")
  }

  if (item.meta?.composition?.length) {
    lines.push("## Composition", "")
    lines.push(
      compositionTree(title, item.meta.composition),
      ""
    )
  }

  if (examples.length) {
    lines.push("## Examples", "")
    for (const example of examples) {
      lines.push(`### ${example.title}`, "")
      if (example.description) {
        lines.push(escapeMdxProse(example.description), "")
      }
      lines.push(
        `<ComponentPreviewTabs component="${item.name}" example="${exampleSlug(example.title)}" />`,
        ""
      )
    }
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

function buildItemDocsCode(
  item: RegistryItem,
  demoCode: string | null,
  radixDemoCode: string | null,
  herouiDemoCode: string | null,
  examples: RegistryExample[]
): {
  hero?: DocsCodeEntry
  examples: Record<string, DocsCodeEntry>
  imports: DocsCodeEntry
} {
  const importName = getImportName(item.name)
  const importPath =
    item.type === "registry:block"
      ? `@/components/blocks/${item.name}`
      : `@/components/ui/${item.name}`

  const heroCode = examples[0]?.code ?? defaultExampleCode(item.name, importName)
  const heroRadixCode = radixVariantCode(item.name, heroCode)
  const baseImportCode = defaultImportCode(item.name, importPath, importName)
  const radixImport = radixImportCode(item.name, importPath, importName)
  const herouiImport = herouiImportCode(item.name, importPath, importName)
  const heroDisplayCode =
    demoCode ??
    completeExampleCode(
      item.name,
      importName,
      baseImportCode,
      heroCode
    )
  const heroRadixDisplayCode =
    radixDemoCode ??
    demoCode ??
    completeExampleCode(
      item.name,
      importName,
      radixImport,
      heroRadixCode
    )
  const heroHerouiDisplayCode =
    herouiDemoCode ??
    demoCode ??
    completeExampleCode(
      item.name,
      importName,
      herouiImport,
      heroRadixCode
    )

  const exampleEntries: Record<string, DocsCodeEntry> = {}
  for (const example of examples) {
    const exampleRadixSnippet =
      item.name === "select"
        ? radixVariantCode(item.name, example.code)
        : example.code

    exampleEntries[exampleSlug(example.title)] = {
      base: completeExampleCode(
        item.name,
        importName,
        baseImportCode,
        example.code
      ),
      radix: completeExampleCode(
        item.name,
        importName,
        radixImport,
        exampleRadixSnippet
      ),
      heroui: completeExampleCode(
        item.name,
        importName,
        herouiImport,
        exampleRadixSnippet
      ),
    }
  }

  return {
    hero: demoCode
      ? undefined
      : {
          base: heroDisplayCode,
          radix: heroRadixDisplayCode,
          heroui: heroHerouiDisplayCode,
        },
    examples: exampleEntries,
    imports: {
      base: baseImportCode,
      radix: radixImport,
      heroui: herouiImport,
    },
  }
}

function serializeDocsCodeMap(map: Record<string, DocsCodeEntry>): string {
  return Object.entries(map)
    .map(
      ([key, value]) => `  ${JSON.stringify(key)}: {
    base: ${JSON.stringify(value.base)},
    radix: ${JSON.stringify(value.radix)},
    heroui: ${JSON.stringify(value.heroui)},
  }`
    )
    .join(",\n")
}

async function writeDocsExampleCodeFile(
  importCode: Record<string, DocsCodeEntry>,
  heroCode: Record<string, DocsCodeEntry>,
  exampleCode: Record<string, Record<string, DocsCodeEntry>>
) {
  const exampleBlocks = Object.entries(exampleCode)
    .map(([component, examples]) => {
      const serialized = serializeDocsCodeMap(examples)
      return `  ${JSON.stringify(component)}: {
${serialized}
  }`
    })
    .join(",\n")

  const contents = `// Auto-generated by scripts/generate-docs.ts — do not edit manually.

export type DocsCodeEntry = {
  base: string
  radix: string
  heroui: string
}

export const docsImportCode: Record<string, DocsCodeEntry> = {
${serializeDocsCodeMap(importCode)}
}

export const docsHeroCode: Record<string, DocsCodeEntry> = {
${serializeDocsCodeMap(heroCode)}
}

export const docsExampleCode: Record<string, Record<string, DocsCodeEntry>> = {
${exampleBlocks}
}
`

  await fs.writeFile(DOCS_EXAMPLE_CODE_PATH, contents)
}

async function main() {
  const raw = await fs.readFile(REGISTRY_PATH, "utf-8")
  const registry = JSON.parse(raw) as Registry

  await fs.mkdir(DOCS_COMPONENTS_DIR, { recursive: true })

  const importCode: Record<string, DocsCodeEntry> = {}
  const heroCode: Record<string, DocsCodeEntry> = {}
  const exampleCode: Record<string, Record<string, DocsCodeEntry>> = {}

  let count = 0
  for (const item of registry.items) {
    if (item.type === "registry:lib") continue
    if (!DOC_COMPONENTS.has(item.name)) continue

    const importName = getImportName(item.name)
    const fallback = DOC_COMPONENTS.has(item.name)
      ? fallbackExamples(item.name, importName)
      : []
    const demoPath = path.join(DEMOS_DIR, `${item.name}-demo.tsx`)
    const radixDemoPath = path.join(DEMOS_DIR, `${item.name}-demo-radix.tsx`)
    const herouiDemoPath = path.join(DEMOS_DIR, `${item.name}-demo-heroui.tsx`)
    const demoCode = await readFileIfExists(demoPath)
    const radixDemoCode = await readFileIfExists(radixDemoPath)
    const herouiDemoCode = await readFileIfExists(herouiDemoPath)
    const examples = demoCode
      ? item.meta?.examples ?? []
      : mergeExamples(item.meta?.examples ?? [], fallback)

    const docsCode = buildItemDocsCode(
      item,
      demoCode,
      radixDemoCode,
      herouiDemoCode,
      examples
    )
    importCode[item.name] = docsCode.imports
    if (docsCode.hero) {
      heroCode[item.name] = docsCode.hero
    }
    if (Object.keys(docsCode.examples).length) {
      exampleCode[item.name] = docsCode.examples
    }

    const mdx = generateMdx(item, examples)
    const outPath = path.join(DOCS_COMPONENTS_DIR, `${item.name}.mdx`)
    await fs.writeFile(outPath, mdx)
    count++
  }

  await writeDocsExampleCodeFile(importCode, heroCode, exampleCode)

  console.log(
    `Generated ${count} component docs in apps/www/content/docs/components/`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
