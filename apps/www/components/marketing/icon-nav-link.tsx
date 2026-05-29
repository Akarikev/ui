import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function IconNavLink({
  href,
  label,
  icon: Icon,
  external = false,
}: {
  href: string
  label: string
  icon: LucideIcon
  external?: boolean
}) {
  const className = cn(
    "group inline-flex items-center rounded-full p-2.5 text-muted-foreground transition-all duration-200",
    "hover:border hover:border-border/60 hover:bg-muted/30 hover:px-3.5 hover:text-foreground"
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

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={className} aria-label={label}>
      {content}
    </Link>
  )
}
