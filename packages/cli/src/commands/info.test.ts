import { describe, it, expect, beforeEach, afterEach } from "vitest"
import fs from "fs-extra"
import path from "node:path"
import os from "node:os"
import {
  aliasToRelativePath,
  resolveAliasPath,
  listInstalledInDir,
  buildProjectInfo,
} from "./info.js"
import { DEFAULT_ELORM_CONFIG } from "@elorm/schema"

describe("aliasToRelativePath", () => {
  it("strips @/ and ~/ prefixes", () => {
    expect(aliasToRelativePath("@/components/ui")).toBe("components/ui")
    expect(aliasToRelativePath("~/components/ui")).toBe("components/ui")
  })
})

describe("resolveAliasPath", () => {
  const cwd = "/project"

  it("falls back to alias without prefix", () => {
    expect(resolveAliasPath("@/components/ui", cwd, {})).toBe(
      path.resolve(cwd, "components/ui")
    )
  })

  it("uses tsconfig paths when available", () => {
    const resolved = resolveAliasPath("@/components/ui", cwd, {
      "@/*": ["./src/*"],
    })
    expect(resolved).toBe(path.resolve(cwd, "src/components/ui"))
  })
})

describe("listInstalledInDir", () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "elorm-info-"))
  })

  afterEach(async () => {
    await fs.remove(tempDir)
  })

  it("returns component basenames without extensions", async () => {
    await fs.writeFile(path.join(tempDir, "button.tsx"), "export {}")
    await fs.writeFile(path.join(tempDir, "card.tsx"), "export {}")
    await fs.writeFile(path.join(tempDir, "readme.md"), "ignore")

    expect(await listInstalledInDir(tempDir)).toEqual(["button", "card"])
  })

  it("returns empty array for missing directory", async () => {
    expect(await listInstalledInDir(path.join(tempDir, "missing"))).toEqual([])
  })
})

describe("buildProjectInfo", () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "elorm-info-"))
    const uiDir = path.join(tempDir, "components", "ui")
    const blocksDir = path.join(tempDir, "components", "blocks")
    await fs.ensureDir(uiDir)
    await fs.ensureDir(blocksDir)
    await fs.writeFile(path.join(uiDir, "button.tsx"), "export {}")
    await fs.writeFile(path.join(blocksDir, "empty-state.tsx"), "export {}")
    await fs.writeJson(path.join(tempDir, "elorm.json"), DEFAULT_ELORM_CONFIG)
  })

  afterEach(async () => {
    await fs.remove(tempDir)
  })

  it("collects installed components, blocks, and resolved paths", async () => {
    const info = await buildProjectInfo(
      tempDir,
      DEFAULT_ELORM_CONFIG,
      path.join(tempDir, "elorm.json")
    )

    expect(info.configPath).toBe(path.join(tempDir, "elorm.json"))
    expect(info.installedComponents).toEqual(["button"])
    expect(info.installedBlocks).toEqual(["empty-state"])
    expect(info.resolvedPaths.ui).toBe(
      path.resolve(tempDir, "components/ui")
    )
    expect(info.resolvedPaths.blocks).toBe(
      path.resolve(tempDir, "components/blocks")
    )
    expect(info.uiLibrary).toBe("base-ui")
    expect(info.tailwind.version).toBe("v4")
  })
})
