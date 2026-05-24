import { SiteHeader } from "@/components/marketing/site-header"
import { Hero } from "@/components/marketing/hero"
import { DocsPreview } from "@/components/marketing/docs-preview"
import { FeatureGrid } from "@/components/marketing/feature-grid"
import { ComponentShowcase } from "@/components/marketing/component-showcase"
import { SiteFooter } from "@/components/marketing/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050508]">
      <SiteHeader />
      <main>
        <Hero />
        <DocsPreview />
        <FeatureGrid />
        <ComponentShowcase />
      </main>
      <SiteFooter />
    </div>
  )
}
