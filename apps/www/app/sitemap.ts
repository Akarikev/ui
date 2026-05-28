import type { MetadataRoute } from "next"
import { source } from "@/lib/source"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const docEntries = source.generateParams().map(({ slug }) => {
    const pathname = slug?.length ? `/docs/${slug.join("/")}` : "/docs"

    return {
      url: `${SITE_URL}${pathname}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: pathname === "/docs" ? 0.9 : 0.7,
    }
  })

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docEntries,
  ]
}
