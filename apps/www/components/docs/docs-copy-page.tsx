"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function DocsCopyPage({
  markdown,
  className,
}: {
  markdown: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground",
        className
      )}
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy page"}
    </button>
  )
}
