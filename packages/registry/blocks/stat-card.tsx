import * as React from "react"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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
          <Badge variant={trend.positive ? "success" : "destructive"}>
            <span className="flex items-center gap-1">
              {trend.positive ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {trend.value}
            </span>
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums tracking-tight">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
