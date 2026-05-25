"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen className="max-w-md">
      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        Yes. Free to use for personal and commercial projects. No attribution required.
      </CollapsibleContent>
    </Collapsible>
  )
}
