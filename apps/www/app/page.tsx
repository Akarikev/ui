import { SiteHeader } from "@/components/marketing/site-header"
import { Hero } from "@/components/marketing/hero"
import { DocsPreview } from "@/components/marketing/docs-preview"
import { LibraryCompare } from "@/components/marketing/library-compare"
import { FeatureGrid } from "@/components/marketing/feature-grid"
import { ComponentShowcase } from "@/components/marketing/component-showcase"
import { SiteFooter } from "@/components/marketing/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative isolate bg-background">
        <SiteHeader transparent overlay />
        <Hero />
        <DocsPreview />
      </div>
      <LibraryCompare />
      <FeatureGrid />
      <ComponentShowcase />
      <SiteFooter />
    </div>
  )
}
