import { getPreviewDemo } from "@/components/preview/registry"
import { ExamplePreviewSection } from "@/components/docs/example-previews"
import { HighlightedCode } from "@/components/docs/highlighted-code"
import { UiLibraryContent } from "@/components/docs/ui-library-content"
import { decodeDocsCode, readDemoSource } from "@/lib/docs-code"
import {
  docsExampleCode,
  docsHeroCode,
} from "@/lib/docs-example-code"
import { supportsHeroUi } from "@/lib/ui-library-availability"
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
}): Promise<{ base: string; radix: string; heroui: string }> {
  if (code) {
    const decodedBase = decodeDocsCode(code)
    return {
      base: decodedBase,
      radix: decodeDocsCode(radixCode ?? code),
      heroui: decodedBase,
    }
  }

  if (example) {
    const entry = docsExampleCode[slug]?.[example]
    return {
      base: entry?.base ?? "",
      radix: entry?.radix ?? entry?.base ?? "",
      heroui: entry?.heroui ?? entry?.base ?? "",
    }
  }

  const demoSource = await readDemoSource(slug)
  const radixDemoSource = await readDemoSource(slug, "radix")
  const herouiDemoSource = await readDemoSource(slug, "heroui")

  if (demoSource) {
    return {
      base: demoSource,
      radix: radixDemoSource ?? demoSource,
      heroui: herouiDemoSource ?? demoSource,
    }
  }

  const hero = docsHeroCode[slug]
  return {
    base: hero?.base ?? "",
    radix: hero?.radix ?? hero?.base ?? "",
    heroui: hero?.heroui ?? hero?.base ?? "",
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
  const showHeroUi = supportsHeroUi(slug)
  const Demo = getPreviewDemo(slug)
  const RadixDemo = getPreviewDemo(slug, "radix")
  const HeroUiDemo = showHeroUi ? getPreviewDemo(slug, "heroui") : null
  const {
    base: decodedCode,
    radix: decodedRadixCode,
    heroui: decodedHerouiCode,
  } = await resolvePreviewCode({
    slug,
    example,
    code,
    radixCode,
  })
  const showFullDemo = !example

  return (
    <div
      className={cn(
        "not-prose my-6 rounded-lg border border-border bg-card",
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
        <UiLibraryContent
          base={
            <div className="flex min-h-[180px] items-center justify-center overflow-visible bg-background/60 p-8">
              <Demo />
            </div>
          }
          radix={
            <div className="flex min-h-[180px] items-center justify-center overflow-visible bg-background/60 p-8">
              <RadixDemo />
            </div>
          }
          heroui={
            showHeroUi && HeroUiDemo ? (
              <div className="flex min-h-[180px] items-center justify-center overflow-visible bg-background/60 p-8">
                <HeroUiDemo />
              </div>
            ) : undefined
          }
        />
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
        <UiLibraryContent
          base={<HighlightedCode code={decodedCode} language="tsx" />}
          radix={<HighlightedCode code={decodedRadixCode} language="tsx" />}
          heroui={
            showHeroUi ? (
              <HighlightedCode code={decodedHerouiCode} language="tsx" />
            ) : undefined
          }
        />
      </details>
    </div>
  )
}
