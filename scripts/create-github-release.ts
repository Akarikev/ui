#!/usr/bin/env bun
/**
 * Create a GitHub release for the current packages/cli version.
 * Run after a successful npm publish: bun run publish:release
 *
 * Usage:
 *   bun scripts/create-github-release.ts
 *   bun scripts/create-github-release.ts --skip-npm-check
 */
import { readFileSync, writeFileSync, unlinkSync } from "node:fs"
import { join } from "node:path"
import { execSync } from "node:child_process"
import { tmpdir } from "node:os"

const ROOT = join(import.meta.dirname, "..")
const CLI_PKG_PATH = join(ROOT, "packages/cli/package.json")
const skipNpmCheck = process.argv.includes("--skip-npm-check")
const NPM_RETRY_ATTEMPTS = 8
const NPM_RETRY_DELAY_MS = 3000

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForNpmVersion(version: string) {
  for (let attempt = 1; attempt <= NPM_RETRY_ATTEMPTS; attempt++) {
    try {
      const published = run(`npm view elorm@${version} version`)
      if (published === version) {
        console.log(`Confirmed elorm@${version} is on npm`)
        return
      }
    } catch {
      // npm registry may lag right after publish
    }

    if (attempt < NPM_RETRY_ATTEMPTS) {
      console.log(
        `Waiting for elorm@${version} on npm (${attempt}/${NPM_RETRY_ATTEMPTS})...`
      )
      await sleep(NPM_RETRY_DELAY_MS)
    }
  }

  console.error(
    `elorm@${version} is not visible on npm yet. Run:\n  bun run publish:cli\n\nOr pass --skip-npm-check to create the release anyway.`
  )
  process.exit(1)
}

function run(command: string, options?: { stdio?: "inherit" | "pipe" }) {
  const result = execSync(command, {
    encoding: options?.stdio === "inherit" ? undefined : "utf-8",
    stdio: options?.stdio ?? "pipe",
  })

  if (result == null) return ""
  return String(result).trim()
}

function commandExists(name: string) {
  try {
    run(`command -v ${name}`)
    return true
  } catch {
    return false
  }
}

async function main() {
  if (!commandExists("gh")) {
    console.error("GitHub CLI (gh) is required. Install: https://cli.github.com/")
    process.exit(1)
  }

  const pkg = JSON.parse(readFileSync(CLI_PKG_PATH, "utf-8")) as { version: string }
  const version = pkg.version
  const tag = `v${version}`

  console.log(`Preparing GitHub release ${tag} for elorm@${version}`)

  if (!skipNpmCheck) {
    if (!commandExists("npm")) {
      console.error("npm is required unless you pass --skip-npm-check")
      process.exit(1)
    }

    await waitForNpmVersion(version)
  }

  try {
    run(`gh release view ${tag}`)
    console.error(`GitHub release ${tag} already exists.`)
    process.exit(1)
  } catch {
    // release does not exist yet
  }

  const notesPath = join(tmpdir(), `elorm-release-${version}.md`)
  writeFileSync(
    notesPath,
    [
      `## elorm@${version}`,
      "",
      "### Install",
      "",
      "```bash",
      "npx elorm init",
      "npx elorm add button card dialog",
      "```",
      "",
      "### Agent skill",
      "",
      "```bash",
      "npx skills add Akarikev/ui --skill elorm -g -y",
      "```",
      "",
      "### Links",
      "",
      `- [npm package](https://www.npmjs.com/package/elorm/v/${version})`,
      "- [Documentation](https://ui.elorm.xyz/docs)",
      "- [Agent skills](https://ui.elorm.xyz/docs/get-started/agent-skills)",
      "- [Registry](https://ui.elorm.xyz/r/registry.json)",
    ].join("\n")
  )

  try {
    run(`gh release create ${tag} --title "${tag}" --notes-file ${JSON.stringify(notesPath)}`, {
      stdio: "inherit",
    })
  } finally {
    unlinkSync(notesPath)
  }

  console.log(`\nCreated GitHub release ${tag}`)
  console.log(`https://github.com/Akarikev/ui/releases/tag/${tag}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
