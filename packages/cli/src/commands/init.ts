import path from "node:path"
import fs from "fs-extra"
import * as p from "@clack/prompts"
import pc from "picocolors"
import { DEFAULT_ELORM_CONFIG, type ElormConfig } from "@elorm/schema"
import {
  CN_UTIL_TEMPLATE,
  ELORM_CSS_TEMPLATE,
  writeConfig,
} from "../utils/index.js"

interface InitOptions {
  cwd?: string
  yes?: boolean
  template?: "next" | "vite"
  css?: string
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
    if (options.css) {
      config.tailwind.css = options.css
    }
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
  if (!(await fs.pathExists(cssFullPath))) {
    await fs.writeFile(cssFullPath, ELORM_CSS_TEMPLATE)
    p.log.success(`Created ${pc.cyan(config.tailwind.css)}`)
  } else {
    p.log.warn(
      `${pc.cyan(config.tailwind.css)} already exists — merge CSS variables manually.`
    )
  }

  p.outro(
    `${pc.green("Success!")} Run ${pc.cyan("npx elorm add button")} to add your first component.`
  )
}
