"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"

import { cn } from "@/lib/utils"
import { focusRing, transitionBase } from "@/lib/ui-styles"

function ToggleGroup({
  className,
  ...props
}: ToggleGroupPrimitive.Props<string>) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn(
        "inline-flex items-center rounded-lg bg-muted/40 p-0.5 ring-1 ring-border/50",
        className
      )}
      {...props}
    />
  )
}

function ToggleGroupItem({
  className,
  children,
  ...props
}: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        "inline-flex min-w-9 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-background data-[pressed]:text-foreground data-[pressed]:shadow-sm",
        focusRing,
        transitionBase,
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
