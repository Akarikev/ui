import Link from "next/link"
import { GITHUB_REPO_URL, NPM_PACKAGE_URL } from "@/lib/seo"

const footerLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Agent Skills", href: "/docs/get-started/agent-skills" },
  { label: "Components", href: "/docs/components/button" },
  { label: "Alternatives", href: "/docs/get-started/alternatives" },
  { label: "GitHub", href: GITHUB_REPO_URL, external: true },
  { label: "npm", href: NPM_PACKAGE_URL, external: true },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map((item) =>
            "external" in item && item.external ? (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground underline hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground underline hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <p className="text-center text-sm text-muted-foreground">
          Built by{" "}
          <a
            href="https://x.com/elorm_elom"
            className="text-foreground/80 underline hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            elorm
          </a>{" "}
          from 🇬🇭. Open source on{" "}
          <a
            href={GITHUB_REPO_URL}
            className="text-foreground/80 underline hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
