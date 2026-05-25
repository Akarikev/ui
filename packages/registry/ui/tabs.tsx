"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"
import { focusRing, transitionBase } from "@/lib/ui-styles"

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted/40 p-0.5 text-muted-foreground ring-1 ring-border/50",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm",
        focusRing,
        transitionBase,
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", focusRing, className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
