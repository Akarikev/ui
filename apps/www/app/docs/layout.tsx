import { SiteHeader } from "@/components/marketing/site-header"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { source } from "@/lib/source"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader showSearch docsTree={source.pageTree} />
      <div className="mx-auto flex max-w-7xl gap-8 px-6 pb-16 pt-8">
        <DocsSidebar tree={source.pageTree} />
        {children}
      </div>
    </div>
  )
}
