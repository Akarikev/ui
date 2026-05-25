import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  shimmer = false,
  ...props
}: React.ComponentProps<"div"> & { shimmer?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-lg bg-muted/60",
        shimmer &&
          "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-background/20 before:to-transparent",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
