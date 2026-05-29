import {
  BlocksIcon,
  BookOpenIcon,
  BrainIcon,
  GithubIcon,
  PackageIcon,
  ScaleIcon,
} from "lucide-react"
import Link from "next/link"
import { IconNavLink } from "@/components/marketing/icon-nav-link"
import { GITHUB_REPO_URL, NPM_PACKAGE_URL } from "@/lib/seo"

const footerLinks = [
  { label: "Docs", href: "/docs", icon: BookOpenIcon },
  {
    label: "Agent Skills",
    href: "/docs/get-started/agent-skills",
    icon: BrainIcon,
  },
  {
    label: "Components",
    href: "/docs/components/button",
    icon: BlocksIcon,
  },
  {
    label: "Alternatives",
    href: "/docs/get-started/alternatives",
    icon: ScaleIcon,
  },
  { label: "GitHub", href: GITHUB_REPO_URL, icon: GithubIcon, external: true },
  { label: "npm", href: NPM_PACKAGE_URL, icon: PackageIcon, external: true },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {footerLinks.map((item) => (
            <IconNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              external={"external" in item ? item.external : false}
            />
          ))}
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
          <Link
            href={GITHUB_REPO_URL}
            className="text-foreground/80 underline hover:text-foreground"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
