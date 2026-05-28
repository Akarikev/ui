import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { TOCItemType } from "fumadocs-core/toc"
import type { MDXContent } from "mdx/types"
import fs from "node:fs/promises"
import path from "node:path"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { findNeighbour } from "fumadocs-core/page-tree"
import { source } from "@/lib/source"
import { getMDXComponents } from "@/components/docs/mdx-components"
import { DocsToc } from "@/components/docs/docs-toc"
import { DocsLibrarySwitcher } from "@/components/docs/docs-library-switcher"
import { DocsCopyPage } from "@/components/docs/docs-copy-page"
import { renderInlineLinks, stripInlineLinks } from "@/components/docs/render-inline-links"
import { createDocsMetadata } from "@/lib/seo"

const DOCS_ROOT = path.join(/* turbopackIgnore: true */ process.cwd(), "content/docs")

async function getPageMarkdown(slug?: string[]): Promise<string | null> {
  if (!slug?.length) {
    return fs.readFile(path.join(DOCS_ROOT, "index.mdx"), "utf-8").catch(() => null)
  }

  const candidates = [
    path.join(DOCS_ROOT, ...slug) + ".mdx",
    path.join(DOCS_ROOT, ...slug, "index.mdx"),
  ]

  for (const candidate of candidates) {
    try {
      return await fs.readFile(candidate, "utf-8")
    } catch {
      continue
    }
  }

  return null
}

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

type DocsContent = {
  body: MDXContent
  toc: TOCItemType[]
  title: string
  linkedTitle?: string
  description?: string
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) notFound()

  const data = page.data as DocsContent
  const MDX = data.body
  const toc = data.toc
  const neighbours = findNeighbour(source.pageTree, page.url)
  const isComponentPage = slug?.[0] === "components" && slug.length >= 2
  const pageMarkdown = await getPageMarkdown(slug)

  return (
    <div className="flex min-w-0 flex-1 gap-10">
      <article className="min-w-0 max-w-3xl flex-1">
        <div className="mb-8 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {renderInlineLinks(data.linkedTitle ?? data.title ?? "Docs")}
            </h1>
            {pageMarkdown ? <DocsCopyPage markdown={pageMarkdown} /> : null}
          </div>
          {page.data.description ? (
            <p className="text-base text-muted-foreground">
              {renderInlineLinks(page.data.description)}
            </p>
          ) : null}
          {isComponentPage ? <DocsLibrarySwitcher /> : null}
        </div>
        <div className="docs-prose">
          <MDX components={getMDXComponents()} />
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          {neighbours.previous ? (
            <Link
              href={neighbours.previous.url}
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {neighbours.previous.name}
            </Link>
          ) : (
            <span />
          )}
          {neighbours.next ? (
            <Link
              href={neighbours.next.url}
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {neighbours.next.name}
              <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </article>
      <DocsToc toc={toc} />
    </div>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    return { title: "Not Found" }
  }

  const pageTitle = stripInlineLinks(
    (page.data as DocsContent).linkedTitle ?? page.data.title ?? "Docs"
  )
  const description = page.data.description
    ? stripInlineLinks(page.data.description)
    : undefined

  return createDocsMetadata({
    title: pageTitle,
    description,
    pathname: page.url,
  })
}
