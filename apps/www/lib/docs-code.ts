import fs from "node:fs/promises"
import path from "node:path"

const DEMOS_DIR = path.join(process.cwd(), "components/demos")

export async function readDemoSource(
  component: string,
  library: "base-ui" | "radix" = "base-ui"
): Promise<string | null> {
  const basePath = path.join(DEMOS_DIR, `${component}-demo.tsx`)
  const radixPath = path.join(DEMOS_DIR, `${component}-demo-radix.tsx`)

  if (library === "radix") {
    try {
      return await fs.readFile(radixPath, "utf-8")
    } catch {
      try {
        return await fs.readFile(basePath, "utf-8")
      } catch {
        return null
      }
    }
  }

  try {
    return await fs.readFile(basePath, "utf-8")
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
