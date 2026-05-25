import { HighlightedCode } from "@/components/docs/highlighted-code"
import { cn } from "@/lib/utils"

export async function LibraryCodeBlock({
  baseCode,
  radixCode,
  language = "tsx",
  className,
}: {
  baseCode: string
  radixCode?: string
  language?: string
  className?: string
}) {
  const resolvedRadixCode = radixCode ?? baseCode

  return (
    <div className={cn("not-prose my-6 overflow-hidden rounded-lg border border-border bg-muted/20", className)}>
      <div className="ui-base-only">
        <HighlightedCode code={baseCode} language={language} />
      </div>
      <div className="ui-radix-only">
        <HighlightedCode code={resolvedRadixCode} language={language} />
      </div>
    </div>
  )
}
