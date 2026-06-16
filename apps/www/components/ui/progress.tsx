"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"
import { transitionBase } from "@/lib/ui-styles"

type ProgressVariant = "determinate" | "animated" | "compact" | "labeled"

type ProgressProps = ProgressPrimitive.Root.Props & {
  variant?: ProgressVariant
  label?: React.ReactNode
  showValue?: boolean
  indicatorClassName?: string
}

function formatProgressValue(value: ProgressPrimitive.Root.Props["value"]) {
  return typeof value === "number" ? `${Math.round(value)}%` : null
}

function Progress({
  className,
  variant = "determinate",
  label = "Progress",
  showValue,
  indicatorClassName,
  value,
  ...props
}: ProgressProps) {
  const isCompact = variant === "compact"
  const isAnimated = variant === "animated"
  const isLabeled = variant === "labeled"
  const valueLabel = formatProgressValue(value)
  const shouldShowValue = showValue ?? isLabeled

  const progress = (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-muted/60",
        isCompact ? "h-1" : "h-1.5",
        transitionBase,
        !isLabeled && className
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Track className="size-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-500 ease-out",
            isAnimated &&
              "relative overflow-hidden after:absolute after:inset-0 after:animate-pulse after:bg-primary-foreground/25",
            indicatorClassName
          )}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )

  if (!isLabeled) {
    return progress
  }

  return (
    <div data-slot="progress-labeled" className={cn("grid w-full gap-2", className)}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        {shouldShowValue && valueLabel ? (
          <span className="text-muted-foreground">{valueLabel}</span>
        ) : null}
      </div>
      {progress}
    </div>
  )
}

export { Progress }
