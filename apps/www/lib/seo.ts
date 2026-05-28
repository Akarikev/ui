import type { Metadata } from "next"

export const SITE_URL = "https://ui.elorm.xyz"
export const SITE_NAME = "elorm/ui"

export const SITE_DESCRIPTION =
  "Copy-paste React component library with Base UI or Radix UI, Tailwind CSS v4, OKLCH theming, and installable agent skills for Cursor, Claude, and Codex."

export const SITE_KEYWORDS = [
  "elorm/ui",
  "react components",
  "copy-paste components",
  "tailwind css component library",
  "base ui",
  "radix ui",
  "shadcn alternative",
  "agent skills",
  "ai coding assistant",
  "react ui library",
]

export const DEFAULT_OG_IMAGE = {
  url: "/hero-anime-monitor.png",
  width: 1536,
  height: 1024,
  alt: "elorm/ui — Beautiful components you actually own",
} as const

export const GITHUB_REPO_URL = "https://github.com/Akarikev/ui"
export const NPM_PACKAGE_URL = "https://www.npmjs.com/package/elorm"

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function createRootMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} — Beautiful components you actually own`,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    keywords: SITE_KEYWORDS,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Beautiful components you actually own`,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Beautiful components you actually own`,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}

export function createHomeMetadata(): Metadata {
  const title = "Copy-paste React components with agent skills"
  const description =
    "Add beautiful React UI to your project with the elorm CLI. Base UI or Radix, Tailwind v4 theming, and installable agent skills: npx skills add Akarikev/ui --skill elorm."

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: SITE_URL,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      title: `${title} — ${SITE_NAME}`,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}

export function createDocsMetadata({
  title,
  description,
  pathname,
}: {
  title: string
  description?: string
  pathname: string
}): Metadata {
  const canonicalUrl = absoluteUrl(pathname)
  const fullTitle = `${title} — ${SITE_NAME}`

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: fullTitle,
      description: description ?? SITE_DESCRIPTION,
      url: canonicalUrl,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      title: fullTitle,
      description: description ?? SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}
