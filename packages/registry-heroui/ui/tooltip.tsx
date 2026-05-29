"use client"

import { Tooltip } from "@heroui/react"

import { cn } from "@/lib/utils"

function TooltipProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function TooltipRoot({ ...props }: React.ComponentProps<typeof Tooltip.Root>) {
  return <Tooltip.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof Tooltip.Trigger>) {
  return <Tooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof Tooltip.Content> & { sideOffset?: number }) {
  return (
    <Tooltip.Content
      data-slot="tooltip-content"
      offset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
}

export {
  TooltipRoot as Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
