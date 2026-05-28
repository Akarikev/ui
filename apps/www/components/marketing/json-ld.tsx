import {
  GITHUB_REPO_URL,
  NPM_PACKAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo"

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${absoluteUrl("/api/search")}?query={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "elorm",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: NPM_PACKAGE_URL,
  downloadUrl: NPM_PACKAGE_URL,
  softwareHelp: absoluteUrl("/docs/get-started/cli"),
  description:
    "CLI for elorm/ui — copy-paste React components with Base UI or Radix UI and Tailwind CSS v4.",
  author: {
    "@type": "Organization",
    name: SITE_NAME,
    url: GITHUB_REPO_URL,
  },
}

export function HomeJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
    </>
  )
}
