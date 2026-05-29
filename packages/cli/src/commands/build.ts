import path from "node:path"
import fs from "fs-extra"
import * as p from "@clack/prompts"
import pc from "picocolors"
import {
  ACCENT_COLORS,
  applyAccent,
  BASE_COLORS,
  getBasePalette,
} from "@elorm/themes"
import {
  registryItemSchema,
  registrySchema,
  type RegistryItem,
  type UiLibrary,
} from "@elorm/schema"

interface BuildOptions {
  cwd?: string
  output?: string
  registry?: string
  library?: UiLibrary | "all"
}

type LibraryOverride = { path: string; dependencies: string[] }

const RADIX_PRIMITIVES: Record<string, LibraryOverride> = {
  button: {
    path: "packages/registry-radix/ui/button.tsx",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
  },
  checkbox: {
    path: "packages/registry-radix/ui/checkbox.tsx",
    dependencies: ["@radix-ui/react-checkbox", "lucide-react"],
  },
  switch: {
    path: "packages/registry-radix/ui/switch.tsx",
    dependencies: ["@radix-ui/react-switch"],
  },
  select: {
    path: "packages/registry-radix/ui/select.tsx",
    dependencies: ["@radix-ui/react-select", "lucide-react"],
  },
  dialog: {
    path: "packages/registry-radix/ui/dialog.tsx",
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
  },
  sheet: {
    path: "packages/registry-radix/ui/sheet.tsx",
    dependencies: [
      "@radix-ui/react-dialog",
      "lucide-react",
      "class-variance-authority",
    ],
  },
  "dropdown-menu": {
    path: "packages/registry-radix/ui/dropdown-menu.tsx",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
  },
  tooltip: {
    path: "packages/registry-radix/ui/tooltip.tsx",
    dependencies: ["@radix-ui/react-tooltip"],
  },
  "mode-toggle": {
    path: "packages/registry-radix/ui/mode-toggle.tsx",
    dependencies: ["next-themes", "lucide-react"],
  },
}

const HEROUI_PRIMITIVES: Record<string, LibraryOverride> = {
  button: {
    path: "packages/registry-heroui/ui/button.tsx",
    dependencies: ["@heroui/react", "class-variance-authority"],
  },
  checkbox: {
    path: "packages/registry-heroui/ui/checkbox.tsx",
    dependencies: ["@heroui/react", "lucide-react"],
  },
  switch: {
    path: "packages/registry-heroui/ui/switch.tsx",
    dependencies: ["@heroui/react"],
  },
  select: {
    path: "packages/registry-heroui/ui/select.tsx",
    dependencies: ["@heroui/react", "lucide-react"],
  },
  dialog: {
    path: "packages/registry-heroui/ui/dialog.tsx",
    dependencies: ["@heroui/react", "lucide-react"],
  },
  sheet: {
    path: "packages/registry-heroui/ui/sheet.tsx",
    dependencies: ["@heroui/react", "lucide-react", "class-variance-authority"],
  },
  "dropdown-menu": {
    path: "packages/registry-heroui/ui/dropdown-menu.tsx",
    dependencies: ["@heroui/react", "lucide-react"],
  },
  tooltip: {
    path: "packages/registry-heroui/ui/tooltip.tsx",
    dependencies: ["@heroui/react"],
  },
}

function getLibraryOverrides(library: UiLibrary): Record<string, LibraryOverride> {
  if (library === "radix") return RADIX_PRIMITIVES
  if (library === "heroui") return HEROUI_PRIMITIVES
  return {}
}

function adaptItemsForLibrary(
  items: RegistryItem[],
  library: UiLibrary
): RegistryItem[] {
  if (library === "base-ui") return items

  const overrides = getLibraryOverrides(library)

  return items.map((item) => {
    const override = overrides[item.name]
    if (!override) return item

    return {
      ...item,
      dependencies: override.dependencies,
      files: item.files.map((file, index) =>
        index === 0 ? { ...file, path: override.path } : file
      ),
    }
  })
}

function createThemeItems(): RegistryItem[] {
  const items: RegistryItem[] = []

  for (const baseColor of BASE_COLORS) {
    const palette = getBasePalette(baseColor)
    items.push({
      name: `theme-${baseColor}`,
      type: "registry:theme",
      title: `${baseColor.charAt(0).toUpperCase()}${baseColor.slice(1)} Theme`,
      description: `Apply the ${baseColor} base color palette to your project.`,
      categories: ["themes"],
      files: [],
      cssVars: {
        light: palette.light,
        dark: palette.dark,
      },
    })
  }

  for (const accent of ACCENT_COLORS) {
    if (accent === "default") continue
    items.push({
      name: `theme-accent-${accent}`,
      type: "registry:theme",
      title: `${accent.charAt(0).toUpperCase()}${accent.slice(1)} Accent`,
      description: `Apply ${accent} accent colors to primary, ring, and chart tokens.`,
      categories: ["themes"],
      files: [],
      cssVars: {
        light: applyAccent({}, accent, "light"),
        dark: applyAccent({}, accent, "dark"),
      },
    })
  }

  return items
}

async function buildLibrary(
  cwd: string,
  registry: ReturnType<typeof registrySchema.parse>,
  library: UiLibrary,
  outputDir: string
) {
  const libraryDir = path.join(outputDir, library)
  await fs.ensureDir(libraryDir)

  const items = adaptItemsForLibrary(
    [...registry.items, ...createThemeItems()],
    library
  )

  const builtItems = []

  for (const item of items) {
    const filesWithContent = []

    for (const file of item.files) {
      const filePath = path.resolve(cwd, file.path)
      if (!(await fs.pathExists(filePath))) {
        throw new Error(`Missing file for ${item.name}: ${file.path}`)
      }

      const content = await fs.readFile(filePath, "utf-8")
      filesWithContent.push({ ...file, content })
    }

    const builtItem = registryItemSchema.parse({
      ...item,
      files: filesWithContent,
    })

    const itemPath = path.join(libraryDir, `${item.name}.json`)
    await fs.writeJson(itemPath, builtItem, { spaces: 0 })
    builtItems.push({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      categories: item.categories,
    })
  }

  return builtItems
}

export async function buildCommand(options: BuildOptions = {}) {
  const cwd = options.cwd ?? process.cwd()
  const registryPath = path.resolve(cwd, options.registry ?? "registry.json")
  const outputDir = path.resolve(cwd, options.output ?? "public/r")
  const libraryOption = options.library ?? "all"

  if (!(await fs.pathExists(registryPath))) {
    p.log.error(`Registry not found: ${registryPath}`)
    process.exit(1)
  }

  const spinner = p.spinner()
  spinner.start("Building registry...")

  const raw = await fs.readJson(registryPath)
  const registry = registrySchema.parse(raw)

  const libraries: UiLibrary[] =
    libraryOption === "all" ? ["base-ui", "radix", "heroui"] : [libraryOption]

  await fs.emptyDir(outputDir)

  const allBuilt: Record<string, unknown[]> = {}

  try {
    for (const library of libraries) {
      allBuilt[library] = await buildLibrary(cwd, registry, library, outputDir)
    }
  } catch (error) {
    spinner.stop("Build failed.")
    p.log.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }

  const indexPath = path.join(outputDir, "registry.json")
  await fs.writeJson(
    indexPath,
    {
      ...registry,
      libraries,
      items: allBuilt["base-ui"] ?? allBuilt["radix"] ?? allBuilt["heroui"],
    },
    { spaces: 2 }
  )

  const totalItems = Object.values(allBuilt).reduce(
    (sum, items) => sum + items.length,
    0
  )

  spinner.stop(
    `Built ${totalItems} registry item(s) across ${libraries.join(", ")} to ${outputDir}`
  )
  p.outro(`${pc.green("Registry built successfully!")}`)
}
