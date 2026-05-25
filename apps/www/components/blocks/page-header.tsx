import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

function PageHeader({
  className,
  title,
  description,
  actions,
  breadcrumbs,
  showDefaultBreadcrumbs = false,
  ...props
}: React.ComponentProps<"div"> & {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  showDefaultBreadcrumbs?: boolean
}) {
  const defaultBreadcrumbs = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {(breadcrumbs || showDefaultBreadcrumbs) && (
        <div className="text-sm">{breadcrumbs ?? defaultBreadcrumbs}</div>
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
