import { highlightCode } from "@/lib/highlight-code"
import { CopyButton } from "@/components/docs/copy-button"

export async function HighlightedCode({
  code,
  language = "tsx",
}: {
  code: string
  language?: string
}) {
  const html = await highlightCode(code, language)

  return (
    <div className="relative border-t border-border bg-muted/20">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton value={code} />
      </div>
      <div
        className="[&_pre]:my-0 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre [&_pre]:bg-transparent [&_pre]:px-5 [&_pre]:py-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:shadow-none [&_code]:whitespace-pre"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
