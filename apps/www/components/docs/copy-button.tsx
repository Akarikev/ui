"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      aria-label="Copy code"
    >
      {copied ? (
        <CheckIcon className="size-4 text-emerald-500" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  )
}
