import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { IconNavLink } from "@/components/ui/icon-nav-link"

interface PageFooterLink {
  label: string
  href: string
  icon: LucideIcon
  external?: boolean
}

function PageFooter({
  links,
  attribution,
  className,
  ...props
}: React.ComponentProps<"footer"> & {
  links: PageFooterLink[]
  attribution?: React.ReactNode
}) {
  return (
    <footer
      data-slot="page-footer"
      className={cn("border-t border-border/40 px-6 py-12", className)}
      {...props}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {links.map((item) => (
            <IconNavLink
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              external={item.external}
            />
          ))}
        </nav>
        {attribution ? (
          <p className="text-center text-sm text-muted-foreground">{attribution}</p>
        ) : null}
      </div>
    </footer>
  )
}

export { PageFooter, type PageFooterLink }
