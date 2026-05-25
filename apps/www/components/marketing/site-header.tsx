import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemePicker } from "./theme-picker"
import { DocsSearch } from "@/components/docs/docs-search"

const nav = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components/button" },
  { label: "GitHub", href: "https://github.com/Akarikev/ui", external: true },
]

export function SiteHeader({
  showSearch = false,
  transparent = false,
  overlay = false,
}: {
  showSearch?: boolean
  transparent?: boolean
  overlay?: boolean
}) {
  const linkClass = transparent
    ? "text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] transition-colors hover:text-white"
    : "text-muted-foreground transition-colors hover:text-foreground"

  const logoClass = transparent
    ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
    : "text-foreground"

  return (
    <header
      className={cn(
        "z-30",
        overlay ? "absolute inset-x-0 top-0" : "relative"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className={cn("shrink-0 text-lg font-semibold tracking-tight", logoClass)}
        >
          elorm/ui
        </Link>
        {showSearch ? (
          <div className="hidden flex-1 justify-center md:flex">
            <DocsSearch />
          </div>
        ) : null}
        <nav className="flex shrink-0 items-center gap-4 sm:gap-6">
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
          <Link
            href="/docs/get-started/installation"
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}
