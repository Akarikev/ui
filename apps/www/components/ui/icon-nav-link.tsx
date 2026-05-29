import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { transitionBase } from "@/lib/ui-styles"

function IconNavLink({
  href,
  label,
  icon: Icon,
  external = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  href: string
  label: string
  icon: LucideIcon
  external?: boolean
}) {
  const linkClassName = cn(
    "group inline-flex items-center rounded-full p-2.5 text-muted-foreground",
    "hover:border hover:border-border/60 hover:bg-muted/30 hover:px-3.5 hover:text-foreground",
    transitionBase,
    className
  )

  const content = (
    <>
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-200 group-hover:max-w-40 group-hover:pl-2 group-hover:opacity-100">
        {label}
      </span>
      <span className="sr-only">{label}</span>
    </>
  )

  return (
    <a
      href={href}
      className={linkClassName}
      aria-label={label}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...props}
    >
      {content}
    </a>
  )
}

export { IconNavLink }
