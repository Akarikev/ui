"use client"

import {
  BookOpenIcon,
  GithubIcon,
  PackageIcon,
} from "lucide-react"
import { IconNavLink } from "@/components/ui/icon-nav-link"

export function IconNavLinkDemo() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-2">
      <IconNavLink href="#" label="Docs" icon={BookOpenIcon} />
      <IconNavLink href="#" label="GitHub" icon={GithubIcon} external />
      <IconNavLink href="#" label="npm" icon={PackageIcon} external />
    </nav>
  )
}
