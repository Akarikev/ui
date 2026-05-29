#!/usr/bin/env node
import { createRequire } from "node:module"
import { Command } from "commander"
import pc from "picocolors"
import { initCommand } from "./commands/init.js"
import { addCommand } from "./commands/add.js"
import { buildCommand } from "./commands/build.js"
import { searchCommand } from "./commands/search.js"
import { docsCommand, diffCommand } from "./commands/docs.js"
import { infoCommand } from "./commands/info.js"

const { version } = createRequire(import.meta.url)("../package.json")

const program = new Command()

program
  .name("elorm")
  .description(`${pc.bold("elorm/ui")} — copy-paste React component library CLI`)
  .version(version)

program
  .command("init")
  .description("Initialize elorm/ui in your project")
  .option("-y, --yes", "Skip prompts and use defaults")
  .option("-t, --template <template>", "Framework template (next, vite)")
  .option("--css <path>", "Path to global CSS file")
  .option("--ui-library <library>", "Headless library (base-ui, radix, heroui)")
  .option("--base-color <color>", "Base color (neutral, zinc, slate, stone, gray)")
  .option(
    "--accent <accent>",
    "Accent color (default, mono, blue, violet, green, orange, rose, amber, cyan)"
  )
  .option("--radius <radius>", "Border radius (default, compact, round)")
  .action(async (options) => {
    await initCommand(options)
  })

program
  .command("add")
  .description("Add components to your project")
  .argument("[items...]", "Component names to add")
  .option("-o, --overwrite", "Overwrite existing files")
  .option("--dry-run", "Preview changes without writing")
  .option("-l, --library <library>", "UI library (base-ui, radix, heroui) - overrides config")
  .option("-i, --interactive", "Choose UI library interactively")
  .action(async (items: string[], options) => {
    await addCommand(items, options)
  })

program
  .command("build")
  .description("Build the registry JSON files")
  .option("-o, --output <dir>", "Output directory", "public/r")
  .option("-r, --registry <path>", "Registry index path", "registry.json")
  .option(
    "-l, --library <library>",
    "Library variant to build (base-ui, radix, heroui, all)",
    "all"
  )
  .action(async (options) => {
    await buildCommand(options)
  })

program
  .command("search")
  .description("Search the elorm/ui registry")
  .option("-q, --query <query>", "Search query")
  .action(async (options) => {
    await searchCommand(options)
  })

program
  .command("docs")
  .description("Show component documentation")
  .argument("<item>", "Component name")
  .option("--json", "Output as JSON (AI-friendly)")
  .action(async (item: string, options) => {
    await docsCommand(item, options)
  })

program
  .command("diff")
  .description("Compare local component with registry")
  .argument("<item>", "Component name")
  .action(async (item: string, options) => {
    await diffCommand(item, options)
  })

program
  .command("info")
  .description("Show project configuration and installed components")
  .option("--json", "Output as JSON (AI-friendly)")
  .action(async (options) => {
    await infoCommand(options)
  })

program.parse()
