import Link from "next/link"
import { GITHUB_REPO_URL, NPM_PACKAGE_URL } from "@/lib/seo"

const links = [
  { label: "GitHub", href: GITHUB_REPO_URL, external: true },
  { label: "npm", href: NPM_PACKAGE_URL, external: true },
  {
    label: "Agent skills",
    href: "/docs/get-started/agent-skills",
    external: false,
  },
  {
    label: "skills.sh",
    href: "https://skills.sh",
    external: true,
  },
] as const

export function TrustStrip() {
  return (
    <section className="border-t border-border/40 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Built for developers
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </section>
  )
}
