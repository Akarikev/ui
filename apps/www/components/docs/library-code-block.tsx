import { HighlightedCode } from "@/components/docs/highlighted-code"
import { UiLibraryContent } from "@/components/docs/ui-library-content"
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
      <UiLibraryContent
        base={<HighlightedCode code={resolvedBase} language={language} />}
        radix={<HighlightedCode code={resolvedRadix} language={language} />}
      />
    </div>
  )
}
