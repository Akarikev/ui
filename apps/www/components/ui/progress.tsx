"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"
import { transitionBase } from "@/lib/ui-styles"

function Progress({
  className,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted/60",
        transitionBase,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Track className="size-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
