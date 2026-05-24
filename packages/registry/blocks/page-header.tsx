import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function PageHeader({
  className,
  title,
  description,
  actions,
  breadcrumbs,
  ...props
}: React.ComponentProps<"div"> & {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
}) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {breadcrumbs && (
        <div className="text-sm text-muted-foreground">{breadcrumbs}</div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <Separator />
    </div>
  )
}

export { PageHeader }
