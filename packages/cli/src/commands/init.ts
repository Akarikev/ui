import path from "node:path"
import fs from "fs-extra"
import * as p from "@clack/prompts"
import pc from "picocolors"
import {
  DEFAULT_ELORM_CONFIG,
  type ElormConfig,
  type UiLibrary,
} from "@elorm/schema"
import {
  ACCENT_COLORS,
  BASE_COLORS,
  RADIUS_PRESETS,
} from "@elorm/themes"
import {
  CN_UTIL_TEMPLATE,
  generateProjectCss,
  mergeProjectCss,
  writeConfig,
} from "../utils/index.js"

interface InitOptions {
  cwd?: string
  yes?: boolean
  template?: "next" | "vite"
  css?: string
  uiLibrary?: UiLibrary
  baseColor?: ElormConfig["tailwind"]["baseColor"]
  accent?: ElormConfig["theme"]["accent"]
  radius?: ElormConfig["theme"]["radius"]
}

export async function initCommand(options: InitOptions = {}) {
  const cwd = options.cwd ?? process.cwd()

  p.intro(`${pc.bold("elorm/ui")} init`)

  let config: ElormConfig = { ...DEFAULT_ELORM_CONFIG }

  if (!options.yes) {
    const framework = await p.select({
      message: "Which framework are you using?",
      options: [
        { value: "next", label: "Next.js" },
        { value: "vite", label: "Vite" },
      ],
    })

    if (p.isCancel(framework)) {
      p.cancel("Operation cancelled.")
      process.exit(0)
    }

    config.framework = framework as ElormConfig["framework"]

    const uiLibrary = await p.select({
      message: "Which headless library do you want to use?",
      options: [
        { value: "base-ui", label: "Base UI (default, modern, unstyled)" },
        { value: "radix", label: "Radix UI (battle-tested, widely adopted)" },
        {
          value: "heroui",
          label: "HeroUI (React Aria + Tailwind v4, elorm wrappers)",
        },
      ],
    })

    if (p.isCancel(uiLibrary)) {
      p.cancel("Operation cancelled.")
      process.exit(0)
    }

    config.uiLibrary = uiLibrary as UiLibrary

    const baseColor = await p.select({
      message: "Which base color do you want?",
      options: BASE_COLORS.map((color) => ({
        value: color,
        label: color.charAt(0).toUpperCase() + color.slice(1),
      })),
    })

    if (p.isCancel(baseColor)) {
      p.cancel("Operation cancelled.")
      process.exit(0)
    }

    config.tailwind.baseColor = baseColor as ElormConfig["tailwind"]["baseColor"]

    const accent = await p.select({
      message: "Which accent color do you want?",
      options: ACCENT_COLORS.map((color) => ({
        value: color,
        label: color.charAt(0).toUpperCase() + color.slice(1),
      })),
    })

    if (p.isCancel(accent)) {
      p.cancel("Operation cancelled.")
      process.exit(0)
    }

    config.theme.accent = accent as ElormConfig["theme"]["accent"]

    const radius = await p.select({
      message: "Which border radius do you want?",
      options: RADIUS_PRESETS.map((preset) => ({
        value: preset,
        label: preset.charAt(0).toUpperCase() + preset.slice(1),
      })),
    })

    if (p.isCancel(radius)) {
      p.cancel("Operation cancelled.")
      process.exit(0)
    }

    config.theme.radius = radius as ElormConfig["theme"]["radius"]

    const cssPath = await p.text({
      message: "Where is your global CSS file?",
      placeholder: config.framework === "next" ? "app/globals.css" : "src/index.css",
      defaultValue: config.framework === "next" ? "app/globals.css" : "src/index.css",
    })

    if (p.isCancel(cssPath)) {
      p.cancel("Operation cancelled.")
      process.exit(0)
    }

    config.tailwind.css = cssPath as string
  } else {
    config.framework = options.template ?? "next"
    config.uiLibrary = options.uiLibrary ?? "base-ui"
    if (options.baseColor) config.tailwind.baseColor = options.baseColor
    if (options.accent) config.theme.accent = options.accent
    if (options.radius) config.theme.radius = options.radius
    if (options.css) config.tailwind.css = options.css
  }

  if (config.framework === "vite") {
    config.tailwind.css = config.tailwind.css || "src/index.css"
    config.rsc = false
  }

  await writeConfig(config, cwd)

  const utilsPath = config.aliases.utils.replace(/^@\//, "")
  const utilsFullPath = path.join(cwd, utilsPath + ".ts")
  await fs.ensureDir(path.dirname(utilsFullPath))
  if (!(await fs.pathExists(utilsFullPath))) {
    await fs.writeFile(utilsFullPath, CN_UTIL_TEMPLATE)
    p.log.success(`Created ${pc.cyan(utilsPath + ".ts")}`)
  }

  const cssFullPath = path.join(cwd, config.tailwind.css)
  await fs.ensureDir(path.dirname(cssFullPath))
  const projectCss = generateProjectCss(config)
  if (!(await fs.pathExists(cssFullPath))) {
    await fs.writeFile(cssFullPath, projectCss)
    p.log.success(`Created ${pc.cyan(config.tailwind.css)}`)
  } else {
    const existingCss = await fs.readFile(cssFullPath, "utf-8")
    await fs.writeFile(cssFullPath, mergeProjectCss(existingCss, projectCss))
    p.log.success(`Updated ${pc.cyan(config.tailwind.css)} with elorm theme tokens`)
  }

  p.outro(
    `${pc.green("Success!")} Run ${pc.cyan("npx elorm add button")} to add your first component.\nInstall the agent skill: ${pc.cyan("npx skills add Akarikev/ui --skill elorm")}`
  )
}
