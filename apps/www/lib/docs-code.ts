import fs from "node:fs/promises"
import path from "node:path"

const DEMOS_DIR = path.join(process.cwd(), "components/demos")

/** Normalize internal docs-site demo paths/names for user copy-paste. */
export function normalizeDemoSourceForDocs(source: string): string {
  return source
    .replace(/@\/components\/ui-radix\//g, "@/components/ui/")
    .replace(/@\/components\/ui-heroui\//g, "@/components/ui/")
    .replace(/export function (\w+)DemoRadix\b/g, "export function $1Demo")
    .replace(/export function (\w+)DemoHeroUi\b/g, "export function $1Demo")
}

export async function readDemoSource(
  component: string,
  library: "base-ui" | "radix" | "heroui" = "base-ui"
): Promise<string | null> {
  const basePath = path.join(DEMOS_DIR, `${component}-demo.tsx`)
  const radixPath = path.join(DEMOS_DIR, `${component}-demo-radix.tsx`)
  const herouiPath = path.join(DEMOS_DIR, `${component}-demo-heroui.tsx`)

  const readNormalized = async (filePath: string) =>
    normalizeDemoSourceForDocs(await fs.readFile(filePath, "utf-8"))

  if (library === "radix") {
    try {
      return await readNormalized(radixPath)
    } catch {
      try {
        return await readNormalized(basePath)
      } catch {
        return null
      }
    }
  }

  if (library === "heroui") {
    try {
      return await readNormalized(herouiPath)
    } catch {
      try {
        return await readNormalized(basePath)
      } catch {
        return null
      }
    }
  }

  try {
    return await readNormalized(basePath)
  } catch {
    return null
  }
}

export function decodeDocsCode(code: string): string {
  return code
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
}
