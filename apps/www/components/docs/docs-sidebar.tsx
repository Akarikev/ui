"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as PageTree from "fumadocs-core/page-tree"
import { getDocsIcon } from "@/lib/docs-icons"
import {
  getComponentSlugFromUrl,
  isNewComponent,
} from "@/lib/component-badges"
import { cn } from "@/lib/utils"

function nodeLabel(name: PageTree.Node["name"]): string {
  return typeof name === "string" ? name : String(name)
}

function SidebarLink({
  href,
  name,
  depth = 0,
  onNavigate,
}: {
  href: string
  name: PageTree.Node["name"]
  depth?: number
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const active = pathname === href || pathname === `${href}/`
  const Icon = getDocsIcon(nodeLabel(name).toLowerCase(), href)
  const componentSlug = getComponentSlugFromUrl(href)
  const showNewBadge = componentSlug ? isNewComponent(componentSlug) : false

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        depth > 0 && "pl-4",
        active
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0 opacity-70" /> : null}
      <span className="truncate">{nodeLabel(name)}</span>
      {showNewBadge ? (
        <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          New
        </span>
      ) : null}
    </Link>
  )
}

function SidebarFolder({
  folder,
  depth = 0,
  onNavigate,
}: {
  folder: PageTree.Folder
  depth?: number
  onNavigate?: () => void
}) {
  return (
    <div>
      {folder.index ? (
        <SidebarLink
          href={folder.index.url}
          name={folder.index.name}
          depth={depth}
          onNavigate={onNavigate}
        />
      ) : null}
      <div className="flex flex-col gap-0.5">
        {folder.children.map((child, i) => (
          <SidebarNode
            key={i}
            item={child}
            depth={depth + 1}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  )
}

function SidebarNode({
  item,
  depth = 0,
  onNavigate,
}: {
  item: PageTree.Node
  depth?: number
  onNavigate?: () => void
}) {
  if (item.type === "separator") {
    return (
      <p className="mb-2 mt-6 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground first:mt-0">
        {nodeLabel(item.name)}
      </p>
    )
  }
  if (item.type === "folder") {
    return (
      <SidebarFolder folder={item} depth={depth} onNavigate={onNavigate} />
    )
  }
  return (
    <SidebarLink
      href={item.url}
      name={item.name}
      depth={depth}
      onNavigate={onNavigate}
    />
  )
}

export function DocsSidebarNav({
  tree,
  onNavigate,
  showHeading = true,
}: {
  tree: PageTree.Root
  onNavigate?: () => void
  showHeading?: boolean
}) {
  return (
    <>
      {showHeading ? (
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Sections
        </p>
      ) : null}
      <div className="flex flex-col gap-0.5">
        {tree.children.map((item, i) => (
          <SidebarNode key={i} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </>
  )
}

export function DocsSidebar({ tree }: { tree: PageTree.Root }) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-4">
        <DocsSidebarNav tree={tree} />
      </nav>
    </aside>
  )
}
