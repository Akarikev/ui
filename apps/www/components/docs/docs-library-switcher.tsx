"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const LIBRARIES = [
  { id: "base-ui", label: "Base UI" },
  { id: "radix", label: "Radix UI" },
] as const

const STORAGE_KEY = "elorm-docs-ui-library"

export function DocsLibrarySwitcher({ className }: { className?: string }) {
  const [selected, setSelected] = useState<(typeof LIBRARIES)[number]["id"]>("base-ui")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "base-ui" || stored === "radix") {
      setSelected(stored)
      document.documentElement.dataset.uiLibrary = stored
      return
    }
    document.documentElement.dataset.uiLibrary = "base-ui"
  }, [])

  function handleSelect(next: (typeof LIBRARIES)[number]["id"]) {
    setSelected(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.dataset.uiLibrary = next
  }

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-lg border border-border bg-muted/30 p-1 text-sm",
        className
      )}
    >
      {LIBRARIES.map((lib) => (
        <button
          type="button"
          key={lib.id}
          onClick={() => handleSelect(lib.id)}
          className={cn(
            "rounded-md px-3 py-1.5 font-medium transition-[color,box-shadow,background-color]",
            selected === lib.id
              ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={selected === lib.id}
          title={`Use ${lib.label} examples`}
        >
          {lib.label}
        </button>
      ))}
      <span className="px-2 text-xs text-muted-foreground">
        Saved preference for <code className="text-foreground">elorm init --ui-library {selected}</code>
      </span>
    </div>
  )
}
