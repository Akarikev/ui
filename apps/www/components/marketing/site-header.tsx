import Link from "next/link"
import { ThemePicker } from "./theme-picker"

const nav = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components/button" },
  { label: "GitHub", href: "https://github.com/Akarikev/ui", external: true },
]

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          elorm/ui
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
              >
                {item.label}
              </Link>
            )
          )}
          <ThemePicker />
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
