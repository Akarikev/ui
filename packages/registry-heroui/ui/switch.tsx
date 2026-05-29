"use client"

import { Switch } from "@heroui/react"

import { cn } from "@/lib/utils"
import { focusRing, transitionBase } from "@/lib/ui-styles"

function SwitchElorm({
  className,
  ...props
}: React.ComponentProps<typeof Switch.Root>) {
  return (
    <Switch.Root data-slot="switch" className={className} {...props}>
      <Switch.Control
        className={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-primary data-[selected=false]:bg-input",
          focusRing,
          transitionBase
        )}
      >
        <Switch.Thumb
          data-slot="switch-thumb"
          className="pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-out data-[selected]:translate-x-4 data-[selected=false]:translate-x-0"
        />
      </Switch.Control>
    </Switch.Root>
  )
}

export { SwitchElorm as Switch }
