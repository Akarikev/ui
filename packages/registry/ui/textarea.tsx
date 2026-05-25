import * as React from "react"

import { cn } from "@/lib/utils"
import { focusRing, surfaceInput, transitionBase } from "@/lib/ui-styles"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[60px] w-full rounded-md border px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:shadow-none md:text-sm",
        surfaceInput,
        focusRing,
        transitionBase,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
