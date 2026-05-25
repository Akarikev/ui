"use client"

import { useEffect, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const MANAGERS = [
  { id: "pnpm", label: "pnpm", prefix: "pnpm dlx" },
  { id: "npm", label: "npm", prefix: "npx" },
  { id: "yarn", label: "yarn", prefix: "yarn dlx" },
  { id: "bun", label: "bun", prefix: "bunx" },
] as const

const STORAGE_KEY = "elorm-docs-package-manager"

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  const [manager, setManager] = useState<(typeof MANAGERS)[number]["id"]>("pnpm")

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && MANAGERS.some((m) => m.id === stored)) {
      setManager(stored as (typeof MANAGERS)[number]["id"])
    }
  }, [])

  const active = MANAGERS.find((m) => m.id === manager) ?? MANAGERS[0]
  const fullCommand = `${active.prefix} ${command}`

  async function copy() {
    await navigator.clipboard.writeText(fullCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function selectManager(id: (typeof MANAGERS)[number]["id"]) {
    setManager(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-muted/20">
      <div className="flex items-center border-b border-border">
        {MANAGERS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => selectManager(m.id)}
            className={cn(
              "px-3 py-2 text-xs font-medium transition-colors",
              manager === m.id
                ? "border-b-2 border-foreground text-foreground"
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
        className="group flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/40"
      >
        <code className="flex-1 overflow-x-auto border-0 bg-transparent p-0 font-mono text-sm text-foreground">
          {fullCommand}
        </code>
        <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
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
