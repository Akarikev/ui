"use client"

import { Checkbox } from "@heroui/react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { focusRing, transitionBase } from "@/lib/ui-styles"

function CheckboxElorm({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox.Root>) {
  return (
    <Checkbox.Root data-slot="checkbox" className={cn("inline-flex", className)} {...props}>
      <Checkbox.Control
        className={cn(
          "peer size-4 shrink-0 rounded-[5px] border border-input shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:border-primary data-[selected]:bg-primary data-[selected]:text-primary-foreground",
          focusRing,
          transitionBase
        )}
      >
        <Checkbox.Indicator className="flex items-center justify-center text-current">
          <CheckIcon className="size-3.5" />
        </Checkbox.Indicator>
      </Checkbox.Control>
    </Checkbox.Root>
  )
}

export { CheckboxElorm as Checkbox }
