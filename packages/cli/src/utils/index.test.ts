import { describe, it, expect } from "vitest"
import {
  isSafeTarget,
  transformImports,
  transformContent,
  topologicalSort,
  resolveRegistryUrl,
} from "./index.js"
import { DEFAULT_ELORM_CONFIG, type RegistryItem } from "@elorm/schema"

describe("isSafeTarget", () => {
  it("allows safe relative paths", () => {
    expect(isSafeTarget("components/ui/button.tsx")).toBe(true)
    expect(isSafeTarget("lib/utils.ts")).toBe(true)
  })

  it("rejects path traversal", () => {
    expect(isSafeTarget("../etc/passwd")).toBe(false)
    expect(isSafeTarget("foo/../../bar")).toBe(false)
  })

  it("rejects absolute paths", () => {
    expect(isSafeTarget("/etc/passwd")).toBe(false)
  })
})

describe("transformImports", () => {
  it("rewrites default aliases to project aliases", () => {
    const content = `import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"`

    const result = transformImports(content, {
      ...DEFAULT_ELORM_CONFIG,
      aliases: {
        components: "~/components",
        utils: "~/lib/utils",
        ui: "~/components/ui",
        lib: "~/lib",
        hooks: "~/hooks",
      },
    })

    expect(result).toContain('from "~/lib/utils"')
    expect(result).toContain('from "~/components/ui/button"')
  })
})

describe("resolveRegistryUrl", () => {
  it("resolves @elorm namespace items", () => {
    const url = resolveRegistryUrl("@elorm/button", DEFAULT_ELORM_CONFIG)
    expect(url).toBe("https://ui.elorm.xyz/r/base-ui/button.json")
  })

  it("resolves bare item names", () => {
    const url = resolveRegistryUrl("button", DEFAULT_ELORM_CONFIG)
    expect(url).toBe("https://ui.elorm.xyz/r/base-ui/button.json")
  })

  it("resolves radix library items", () => {
    const url = resolveRegistryUrl("button", {
      ...DEFAULT_ELORM_CONFIG,
      uiLibrary: "radix",
    })
    expect(url).toBe("https://ui.elorm.xyz/r/radix/button.json")
  })
})

describe("topologicalSort", () => {
  it("orders dependencies before dependents", () => {
    const items: RegistryItem[] = [
      {
        name: "button",
        type: "registry:ui",
        registryDependencies: ["utils"],
        files: [{ path: "button.tsx", type: "registry:ui" }],
      },
      {
        name: "utils",
        type: "registry:lib",
        files: [{ path: "utils.ts", type: "registry:lib" }],
      },
    ]

    const sorted = topologicalSort(items)
    expect(sorted[0].name).toBe("utils")
    expect(sorted[1].name).toBe("button")
  })
})

describe("transformContent", () => {
  const baseConfig = {
    ...DEFAULT_ELORM_CONFIG,
    aliases: { ...DEFAULT_ELORM_CONFIG.aliases },
  }

  const rscConfig = { ...baseConfig, rsc: true }
  const nonRscConfig = { ...baseConfig, rsc: false }

  it("keeps directive for RSC projects", () => {
    const input = `"use client"\n\nimport { Button } from "@/components/ui/button"`
    const result = transformContent(input, rscConfig)
    expect(result.startsWith('"use client"')).toBe(true)
  })

  it("strips double-quoted directive for non-RSC", () => {
    const input = `"use client"\n\nimport { Button } from "@/components/ui/button"`
    const result = transformContent(input, nonRscConfig)
    expect(result.startsWith('"use client"')).toBe(false)
    expect(result).toContain('from "@/components/ui/button"') // import transform still ran
  })

  it("strips single-quoted directive for non-RSC", () => {
    const input = `'use client'\n\nfoo()`
    const result = transformContent(input, nonRscConfig)
    expect(result.startsWith("'use client'")).toBe(false)
  })

  it("strips directive with semicolon", () => {
    const input = `"use client";\n\nbar()`
    const result = transformContent(input, nonRscConfig)
    expect(result.startsWith('"use client"')).toBe(false)
  })

  it("strips block comment form", () => {
    const input = `/* "use client" */\n\nconst x = 1`
    const result = transformContent(input, nonRscConfig)
    expect(result.includes('use client')).toBe(false)
  })

  it("leaves files without directive unchanged (non-RSC)", () => {
    const input = `import { cn } from "@/lib/utils"\nexport const a = 1`
    const result = transformContent(input, nonRscConfig)
    expect(result).toBe(input) // no leading directive to strip, imports same
  })

  it("does not strip directive that is not at the very start (non-RSC)", () => {
    const input = `// license\n"use client"\n\nexport const x = 1`
    const result = transformContent(input, nonRscConfig)
    expect(result).toContain('"use client"')
  })
})
