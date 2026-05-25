import { HighlightedCode } from "@/components/docs/highlighted-code"
import { decodeDocsCode } from "@/lib/docs-code"
import { docsImportCode } from "@/lib/docs-example-code"
import { cn } from "@/lib/utils"

export async function LibraryCodeBlock({
  component,
  baseCode,
  radixCode,
  language = "tsx",
  className,
}: {
  component?: string
  baseCode?: string
  radixCode?: string
  language?: string
  className?: string
}) {
  const imports = component ? docsImportCode[component] : undefined
  const resolvedBase =
    imports?.base ?? (baseCode ? decodeDocsCode(baseCode) : "")
  const resolvedRadix =
    imports?.radix ??
    (radixCode ? decodeDocsCode(radixCode) : resolvedBase)

  return (
    <div
      className={cn(
        "not-prose my-6 overflow-hidden rounded-lg border border-border bg-muted/20",
        className
      )}
    >
      <div className="ui-base-only">
        <HighlightedCode code={resolvedBase} language={language} />
      </div>
      <div className="ui-radix-only">
        <HighlightedCode code={resolvedRadix} language={language} />
      </div>
    </div>
  )
}
