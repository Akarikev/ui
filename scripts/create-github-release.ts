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

function run(command: string, options?: { stdio?: "inherit" | "pipe" }) {
  return execSync(command, {
    encoding: "utf-8",
    stdio: options?.stdio ?? "pipe",
  }).trim()
}

function commandExists(name: string) {
  try {
    run(`command -v ${name}`)
    return true
  } catch {
    return false
  }
}

function main() {
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

    try {
      const published = run(`npm view elorm@${version} version`)
      if (published !== version) {
        throw new Error("version mismatch")
      }
      console.log(`Confirmed elorm@${version} is on npm`)
    } catch {
      console.error(
        `elorm@${version} is not published on npm yet. Run:\n  bun run publish:cli\n\nOr pass --skip-npm-check to create the release anyway.`
      )
      process.exit(1)
    }
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
      "### Links",
      "",
      `- [npm package](https://www.npmjs.com/package/elorm/v/${version})`,
      "- [Documentation](https://ui.elorm.xyz/docs)",
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

main()
