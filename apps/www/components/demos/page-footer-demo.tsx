"use client"

import { BookOpenIcon, GithubIcon } from "lucide-react"
import { PageFooter } from "@/components/blocks/page-footer"

export function PageFooterDemo() {
  return (
    <PageFooter
      links={[
        { label: "Docs", href: "/docs", icon: BookOpenIcon },
        {
          label: "GitHub",
          href: "https://github.com/Akarikev/ui",
          icon: GithubIcon,
          external: true,
        },
      ]}
      attribution={
        <>
          Built with{" "}
          <a
            href="https://ui.elorm.xyz"
            className="text-foreground/80 underline hover:text-foreground"
          >
            elorm/ui
          </a>
          .
        </>
      }
    />
  )
}
