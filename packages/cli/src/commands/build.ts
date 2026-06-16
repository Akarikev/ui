import path from "node:path"
import fs from "fs-extra"
import * as p from "@clack/prompts"
import pc from "picocolors"
import {
  getThemeTokens,
  ACCENT_COLORS,
  applyAccent,
  BASE_COLORS,
} from "@elorm/themes"
import {
  registryItemSchema,
  registrySchema,
  type ElormStyle,
  type RegistryItem,
  type UiLibrary,
} from "@elorm/schema"

interface BuildOptions {
  cwd?: string
  output?: string
  registry?: string
  library?: UiLibrary | "all"
  style?: ElormStyle | "all"
}

type RegistryOverride = { path: string; dependencies?: string[] }

const RADIX_PRIMITIVES: Record<string, RegistryOverride> = {
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
  slider: {
    path: "packages/registry-radix/ui/slider.tsx",
    dependencies: ["@radix-ui/react-slider"],
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

const HEROUI_PRIMITIVES: Record<string, RegistryOverride> = {
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
  slider: {
    path: "packages/registry-heroui/ui/slider.tsx",
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

const NAGOMI_PRIMITIVES: Record<string, RegistryOverride> = {
  card: {
    path: "packages/registry-nagomi/ui/card.tsx",
  },
  progress: {
    path: "packages/registry-nagomi/ui/progress.tsx",
  },
}

const NAGOMI_SOURCE_ITEMS = new Set([
  "ui-styles",
  "button",
  "input",
  "textarea",
  "select",
  "dialog",
  "sheet",
  "popover",
  "dropdown-menu",
  "badge",
  "alert",
  "empty-state",
  "stat-card",
  "slider",
])

const NAGOMI_RADIUS_MAP: Record<string, string> = {
  md: "xl",
  lg: "xl",
  xl: "2xl",
  "2xl": "[1.5rem]",
}

function transformRoundedClass(className: string): string {
  return className.replace(
    /\brounded-(md|lg|xl|2xl)\b/g,
    (_, radius: string) => `rounded-${NAGOMI_RADIUS_MAP[radius] ?? radius}`
  )
}

function transformNagomiUiStyles(content: string): string {
  return content
    .replace(
      'export const focusRing =\n  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"',
      'export const focusRing =\n  "outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"'
    )
    .replace(
      'export const surfaceInput =\n  "bg-muted/40 border-border/60 hover:border-border focus-visible:border-ring"',
      'export const surfaceInput =\n  "bg-background/80 border-border/45 hover:border-border/60 focus-visible:border-ring/70"'
    )
    .replace(
      'export const pressable = "active:scale-[0.98] transition-transform duration-100"',
      'export const pressable = "active:scale-[0.985] transition-[transform,box-shadow] duration-150"'
    )
    .replace(
      'export const transitionBase =\n  "transition-[color,box-shadow,transform,border-color] duration-150"',
      'export const transitionBase =\n  "transition-[color,box-shadow,transform,border-color,background-color] duration-200 ease-out"'
    )
    .replace(
      'export const popoverSurface =\n  "rounded-lg border bg-popover text-popover-foreground shadow-md ring-1 ring-border/10"',
      'export const popoverSurface =\n  "rounded-2xl border border-border/45 bg-popover/95 text-popover-foreground shadow-[0_18px_60px_-36px_oklch(0_0_0_/_0.65)] ring-1 ring-foreground/[0.04] backdrop-blur"'
    )
    .replace(
      'export const menuItemBase =\n  "relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent/80 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"',
      'export const menuItemBase =\n  "relative flex cursor-default select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent/70 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"'
    )
    .replace('export const softRadius = "rounded-xl"', 'export const softRadius = "rounded-2xl"')
    .replace(
      'export const softShadow =\n  "shadow-md shadow-black/10 dark:shadow-black/20"',
      'export const softShadow =\n  "shadow-[0_18px_50px_-34px_oklch(0_0_0_/_0.55)] dark:shadow-[0_24px_60px_-38px_oklch(0_0_0_/_0.85)]"'
    )
    .replace(
      'export const surfaceSoft =\n  "bg-muted/30 border border-border/40"',
      'export const surfaceSoft =\n  "bg-muted/25 border border-border/35"'
    )
    .replace(
      'export const surfaceSoftHover = "hover:bg-muted/50"',
      'export const surfaceSoftHover = "hover:bg-muted/40"'
    )
}

function transformNagomiSource(name: string, content: string): string {
  if (!NAGOMI_SOURCE_ITEMS.has(name)) return content
  if (name === "ui-styles") return transformNagomiUiStyles(content)

  return transformRoundedClass(content)
    .replace(/border-border\/60/g, "border-border/45")
    .replace(/border-border\/50/g, "border-border/40")
    .replace(/border-border\/40/g, "border-border/35")
    .replace(/border-input/g, "border-input/80")
    .replace(/bg-muted\/70/g, "bg-muted/50")
    .replace(/bg-muted\/60/g, "bg-muted/45")
    .replace(/bg-muted\/50/g, "bg-muted/40")
    .replace(/bg-muted\/40/g, "bg-muted/35")
    .replace(/bg-muted\/30/g, "bg-muted/25")
    .replace(/bg-card\/90/g, "bg-card/85")
    .replace(/hover:bg-muted\/60/g, "hover:bg-muted/45")
    .replace(/hover:bg-muted\/50/g, "hover:bg-muted/40")
    .replace(/focus-visible:ring-ring\/50/g, "focus-visible:ring-ring/35")
    .replace(/data-\[open\]:zoom-in-95/g, "data-[open]:zoom-in-98")
    .replace(/data-\[closed\]:zoom-out-95/g, "data-[closed]:zoom-out-98")
}

function getLibraryOverrides(library: UiLibrary): Record<string, RegistryOverride> {
  if (library === "radix") return RADIX_PRIMITIVES
  if (library === "heroui") return HEROUI_PRIMITIVES
  return {}
}

function applyOverrides(
  items: RegistryItem[],
  overrides: Record<string, RegistryOverride>
): RegistryItem[] {
  return items.map((item) => {
    const override = overrides[item.name]
    if (!override) return item

    return {
      ...item,
      dependencies: override.dependencies ?? item.dependencies,
      files: item.files.map((file, index) =>
        index === 0 ? { ...file, path: override.path } : file
      ),
    }
  })
}

function adaptItemsForLibrary(
  items: RegistryItem[],
  library: UiLibrary,
  style: ElormStyle
): RegistryItem[] {
  let adapted =
    library === "base-ui"
      ? items
      : applyOverrides(items, getLibraryOverrides(library))

  if (style === "nagomi") {
    adapted = applyOverrides(adapted, NAGOMI_PRIMITIVES)
  }

  return adapted
}

function createThemeItems(style: ElormStyle): RegistryItem[] {
  const items: RegistryItem[] = []

  for (const baseColor of BASE_COLORS) {
    const palette = getThemeTokens({ style, baseColor })
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
        theme: { radius: palette.radius },
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
  outputDir: string,
  style: ElormStyle
) {
  const libraryDir =
    style === "elorm"
      ? path.join(outputDir, library)
      : path.join(outputDir, style, library)
  await fs.ensureDir(libraryDir)

  const items = adaptItemsForLibrary(
    [...registry.items, ...createThemeItems(style)],
    library,
    style
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
      const transformedContent =
        style === "nagomi" ? transformNagomiSource(item.name, content) : content
      filesWithContent.push({ ...file, content: transformedContent })
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
  const styleOption = options.style ?? "all"

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
  const styles: ElormStyle[] =
    styleOption === "all" ? ["elorm", "nagomi"] : [styleOption]

  await fs.emptyDir(outputDir)

  const allBuilt: Record<ElormStyle, Partial<Record<UiLibrary, unknown[]>>> = {
    elorm: {},
    nagomi: {},
  }

  try {
    for (const style of styles) {
      for (const library of libraries) {
        allBuilt[style][library] = await buildLibrary(
          cwd,
          registry,
          library,
          outputDir,
          style
        )
      }
    }
  } catch (error) {
    spinner.stop("Build failed.")
    p.log.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }

  for (const style of styles) {
    const indexPath =
      style === "elorm"
        ? path.join(outputDir, "registry.json")
        : path.join(outputDir, style, "registry.json")

    await fs.ensureDir(path.dirname(indexPath))
    await fs.writeJson(
      indexPath,
      {
        ...registry,
        style,
        libraries,
        items:
          allBuilt[style]["base-ui"] ??
          allBuilt[style]["radix"] ??
          allBuilt[style]["heroui"],
      },
      { spaces: 2 }
    )
  }

  const totalItems = styles.reduce((styleSum, style) => {
    return (
      styleSum +
      Object.values(allBuilt[style]).reduce(
        (librarySum, items) => librarySum + (items?.length ?? 0),
        0
      )
    )
  }, 0)

  spinner.stop(
    `Built ${totalItems} registry item(s) across ${libraries.join(", ")} to ${outputDir}`
  )
  p.outro(`${pc.green("Registry built successfully!")}`)
}
