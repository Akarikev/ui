import { describe, it, expect } from "vitest"
import {
  isSafeTarget,
  transformImports,
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
    expect(url).toBe("https://ui.elorm.xyz/r/button.json")
  })

  it("resolves bare item names", () => {
    const url = resolveRegistryUrl("button", DEFAULT_ELORM_CONFIG)
    expect(url).toBe("https://ui.elorm.xyz/r/button.json")
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
