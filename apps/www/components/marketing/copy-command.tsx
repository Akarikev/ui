"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const MANAGERS = [
  { id: "npm", label: "npm", prefix: "npx" },
  { id: "pnpm", label: "pnpm", prefix: "pnpm dlx" },
  { id: "yarn", label: "yarn", prefix: "yarn dlx" },
  { id: "bun", label: "bun", prefix: "bunx" },
] as const

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  const [manager, setManager] = useState<(typeof MANAGERS)[number]["id"]>("npm")

  const active = MANAGERS.find((m) => m.id === manager) ?? MANAGERS[0]
  const fullCommand = `${active.prefix} ${command}`

  async function copy() {
    await navigator.clipboard.writeText(fullCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 flex justify-center gap-1">
        {MANAGERS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setManager(m.id)}
            className={cn(
              "rounded-md px-2 py-1 text-xs transition-colors",
              manager === m.id
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={copy}
        className="group flex w-full items-center gap-3 rounded-full border border-border bg-card/50 px-5 py-3 text-left backdrop-blur-md transition-colors hover:bg-card"
      >
        <code className="flex-1 text-sm text-foreground">{fullCommand}</code>
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
          {copied ? (
            <CheckIcon className="size-4 text-emerald-500" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </span>
      </button>
    </div>
  )
}
