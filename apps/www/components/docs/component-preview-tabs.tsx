import { getPreviewDemo } from "@/components/preview/registry"
import { HighlightedCode } from "@/components/docs/highlighted-code"
import { cn } from "@/lib/utils"

export async function ComponentPreviewTabs({
  component,
  name,
  code,
  radixCode,
  description,
  title,
  className,
}: {
  component?: string
  name?: string
  code: string
  radixCode?: string
  description?: string
  title?: string
  className?: string
}) {
  const slug = component ?? name ?? "button"
  const Demo = getPreviewDemo(slug)
  const RadixDemo = getPreviewDemo(slug, "radix")
  const decodedCode = code.replace(/&quot;/g, '"').replace(/\\n/g, "\n")
  const decodedRadixCode = (radixCode ?? code)
    .replace(/&quot;/g, '"')
    .replace(/\\n/g, "\n")

  return (
    <div
      className={cn(
        "not-prose my-6 overflow-hidden rounded-lg border border-border bg-card",
        className
      )}
    >
      {title ? (
        <p className="border-b border-border px-4 py-2 text-sm font-medium text-foreground">
          {title}
        </p>
      ) : null}
      {description ? (
        <p className="border-b border-border px-4 py-3 text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      <div className="ui-base-only flex min-h-[180px] items-center justify-center bg-background/60 p-8">
        <Demo />
      </div>
      <div className="ui-radix-only flex min-h-[180px] items-center justify-center bg-background/60 p-8">
        <RadixDemo />
      </div>
      <details className="group border-t border-border">
        <summary className="cursor-pointer list-none bg-muted/20 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <span className="inline-flex rounded-lg bg-muted/50 p-0.5 ring-1 ring-border/60">
            <span className="rounded-md bg-background px-3 py-1.5 font-medium text-foreground shadow-sm transition-colors group-open:bg-transparent group-open:text-muted-foreground group-open:shadow-none">
              Preview
            </span>
            <span className="rounded-md px-3 py-1.5 font-medium transition-colors group-open:bg-background group-open:text-foreground group-open:shadow-sm">
              Code
            </span>
          </span>
        </summary>
        <div className="ui-base-only">
          <HighlightedCode code={decodedCode} language="tsx" />
        </div>
        <div className="ui-radix-only">
          <HighlightedCode code={decodedRadixCode} language="tsx" />
        </div>
      </details>
    </div>
  )
}
