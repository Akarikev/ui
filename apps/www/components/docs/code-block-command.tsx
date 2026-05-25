"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/docs/copy-button"

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
type Manager = (typeof MANAGERS)[number]

const STORAGE_KEY = "elorm-docs-package-manager"

export function CodeBlockCommand({
  __npm__,
  __pnpm__,
  __yarn__,
  __bun__,
}: {
  __npm__?: string
  __pnpm__?: string
  __yarn__?: string
  __bun__?: string
}) {
  const [manager, setManager] = useState<Manager>("pnpm")

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Manager | null
    if (stored && MANAGERS.includes(stored)) {
      setManager(stored)
    }
  }, [])

  const tabs = useMemo(
    () => ({
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }),
    [__npm__, __pnpm__, __yarn__, __bun__]
  )

  const command = tabs[manager] ?? __npm__ ?? ""

  function selectManager(next: Manager) {
    setManager(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  if (!command) return null

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-muted/20">
      <div className="flex items-center border-b border-border">
        {MANAGERS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => selectManager(key)}
            className={cn(
              "px-3 py-2 text-xs font-medium transition-colors",
              manager === key
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="relative flex items-center gap-2 px-5 py-4">
        <code className="flex-1 overflow-x-auto font-mono text-sm text-foreground">
          {command}
        </code>
        <CopyButton value={command} />
      </div>
    </div>
  )
}
