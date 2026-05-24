"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-left backdrop-blur-md transition-colors hover:bg-white/10"
    >
      <code className="flex-1 text-sm text-white/90">{command}</code>
      <span className="text-white/50 transition-colors group-hover:text-white/80">
        {copied ? (
          <CheckIcon className="size-4 text-emerald-400" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </span>
    </button>
  )
}
