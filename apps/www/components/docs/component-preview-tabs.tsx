import { getPreviewDemo } from "@/components/preview/registry"
import { ExamplePreviewSection } from "@/components/docs/example-previews"
import { HighlightedCode } from "@/components/docs/highlighted-code"
import { decodeDocsCode, readDemoSource } from "@/lib/docs-code"
import {
  docsExampleCode,
  docsHeroCode,
} from "@/lib/docs-example-code"
import { cn } from "@/lib/utils"

async function resolvePreviewCode({
  slug,
  example,
  code,
  radixCode,
}: {
  slug: string
  example?: string
  code?: string
  radixCode?: string
}): Promise<{ base: string; radix: string }> {
  if (code) {
    const decodedBase = decodeDocsCode(code)
    return {
      base: decodedBase,
      radix: decodeDocsCode(radixCode ?? code),
    }
  }

  if (example) {
    const entry = docsExampleCode[slug]?.[example]
    return {
      base: entry?.base ?? "",
      radix: entry?.radix ?? entry?.base ?? "",
    }
  }

  const demoSource = await readDemoSource(slug)
  const radixDemoSource = await readDemoSource(slug, "radix")

  if (demoSource) {
    return {
      base: demoSource,
      radix: radixDemoSource ?? demoSource,
    }
  }

  const hero = docsHeroCode[slug]
  return {
    base: hero?.base ?? "",
    radix: hero?.radix ?? hero?.base ?? "",
  }
}

export async function ComponentPreviewTabs({
  component,
  name,
  example,
  code,
  radixCode,
  description,
  title,
  className,
}: {
  component?: string
  name?: string
  example?: string
  code?: string
  radixCode?: string
  description?: string
  title?: string
  className?: string
}) {
  const slug = component ?? name ?? "button"
  const Demo = getPreviewDemo(slug)
  const RadixDemo = getPreviewDemo(slug, "radix")
  const { base: decodedCode, radix: decodedRadixCode } = await resolvePreviewCode({
    slug,
    example,
    code,
    radixCode,
  })
  const showFullDemo = !example

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
      {example ? (
        <ExamplePreviewSection component={slug} example={example} />
      ) : null}
      {showFullDemo ? (
        <>
          <div className="ui-base-only flex min-h-[180px] items-center justify-center bg-background/60 p-8">
            <Demo />
          </div>
          <div className="ui-radix-only flex min-h-[180px] items-center justify-center bg-background/60 p-8">
            <RadixDemo />
          </div>
        </>
      ) : null}
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
