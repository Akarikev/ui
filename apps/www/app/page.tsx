import type { Metadata } from "next"
import { SiteHeader } from "@/components/marketing/site-header"
import { Hero } from "@/components/marketing/hero"
import { LibraryCompare } from "@/components/marketing/library-compare"
import { TrustStrip } from "@/components/marketing/trust-strip"
import { SiteFooter } from "@/components/marketing/site-footer"
import { HomeJsonLd } from "@/components/marketing/json-ld"
import { createHomeMetadata } from "@/lib/seo"

export const metadata: Metadata = createHomeMetadata()

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeJsonLd />
      <SiteHeader />
      <Hero />
      <LibraryCompare />
      <TrustStrip />
      <SiteFooter />
    </div>
  )
}
