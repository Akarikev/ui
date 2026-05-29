"use client"

import {
  BlocksIcon,
  BookOpenIcon,
  BrainIcon,
  GithubIcon,
  PackageIcon,
  ScaleIcon,
} from "lucide-react"
import Link from "next/link"
import { PageFooter } from "@/components/blocks/page-footer"
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
    <PageFooter
      links={footerLinks.map((item) => ({
        ...item,
        external: "external" in item ? item.external : false,
      }))}
      attribution={
        <>
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
        </>
      }
    />
  )
}
