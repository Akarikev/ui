import Link from "next/link"
import type * as PageTree from "fumadocs-core/page-tree"
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav"
import { DocsSearch } from "@/components/docs/docs-search"
import { ElormLogo } from "@/components/marketing/logo"
import { GetStartedLink } from "./get-started-link"
import { ThemePicker } from "./theme-picker"
import { cn } from "@/lib/utils"

const nav = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components/button" },
  { label: "GitHub", href: "https://github.com/Akarikev/ui", external: true },
]

export function SiteHeader({
  showSearch = false,
  docsTree,
  transparent = false,
  overlay = false,
}: {
  showSearch?: boolean
  docsTree?: PageTree.Root
  transparent?: boolean
  overlay?: boolean
}) {
  const linkClass = transparent
    ? "font-semibold text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] transition-colors hover:text-white hover:underline"
    : "font-semibold text-muted-foreground transition-colors hover:text-foreground hover:underline"

  const logoTextClass = transparent
    ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
    : "text-foreground"

  return (
    <header
      className={cn(
        "z-30",
        overlay ? "absolute inset-x-0 top-0" : "relative"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-4">
        <div className="flex min-w-0 items-center gap-2">
          {docsTree ? (
            <div className="shrink-0 lg:hidden">
              <DocsMobileNav tree={docsTree} />
            </div>
          ) : null}
          <Link href="/" className="min-w-0 shrink-0">
            <ElormLogo
              markClassName={logoTextClass}
              textClassName={logoTextClass}
            />
          </Link>
        </div>
        {showSearch ? (
          <div className="hidden flex-1 justify-center md:flex">
            <DocsSearch />
          </div>
        ) : null}
        <nav className="flex shrink-0 items-center gap-3 sm:gap-6">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("hidden text-sm sm:inline", linkClass)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn("hidden text-sm sm:inline", linkClass)}
              >
                {item.label}
              </Link>
            )
          )}
          <ThemePicker ghost={transparent} />
          <GetStartedLink />
        </nav>
      </div>
    </header>
  )
}
