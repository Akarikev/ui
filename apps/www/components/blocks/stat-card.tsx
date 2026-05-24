import * as React from "react"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function StatCard({
  className,
  title,
  value,
  description,
  trend,
  ...props
}: React.ComponentProps<"div"> & {
  title: string
  value: string
  description?: string
  trend?: { value: string; positive?: boolean }
}) {
  return (
    <Card data-slot="stat-card" className={cn(className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend.positive ? "text-primary" : "text-destructive"
            )}
          >
            {trend.positive ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {trend.value}
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
