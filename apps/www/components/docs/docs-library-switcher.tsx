"use client"

import { useEffect, useMemo, useState } from "react"
import type { UiLibrary } from "@/lib/ui-library"
import { UiPreviewBadge } from "@/components/docs/ui-preview-badge"
import { getAvailableUiLibraries } from "@/lib/ui-library-availability"
import { cn } from "@/lib/utils"

const LIBRARIES = [
  { id: "base-ui", label: "Base UI" },
  { id: "radix", label: "Radix UI" },
  { id: "heroui", label: "HeroUI" },
] as const satisfies ReadonlyArray<{ id: UiLibrary; label: string }>

const STORAGE_KEY = "elorm-docs-ui-library"

export function DocsLibrarySwitcher({
  className,
  component,
}: {
  className?: string
  component?: string
}) {
  const availableLibraries = useMemo(
    () => getAvailableUiLibraries(component),
    [component]
  )
  const [selected, setSelected] = useState<UiLibrary>("base-ui")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (
      (stored === "base-ui" || stored === "radix" || stored === "heroui") &&
      availableLibraries.includes(stored)
    ) {
      setSelected(stored)
      document.documentElement.dataset.uiLibrary = stored
      return
    }

    document.documentElement.dataset.uiLibrary = "base-ui"
    setSelected("base-ui")
  }, [availableLibraries])

  function handleSelect(next: UiLibrary) {
    setSelected(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.dataset.uiLibrary = next
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg border border-border bg-muted/30 p-2 text-sm sm:inline-flex sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-1 sm:p-1",
        className
      )}
    >
      <div className="flex w-full gap-1 sm:w-auto">
        {LIBRARIES.filter((lib) => availableLibraries.includes(lib.id)).map((lib) => (
          <button
            type="button"
            key={lib.id}
            onClick={() => handleSelect(lib.id)}
            className={cn(
              "flex flex-1 items-center justify-center rounded-md px-2 py-1.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow,background-color] sm:flex-none sm:px-3 sm:text-sm",
              selected === lib.id
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={selected === lib.id}
            title={`Use ${lib.label} examples`}
          >
            <span className="inline-flex items-center gap-1.5">
              {lib.label}
              {lib.id === "heroui" ? (
                <UiPreviewBadge size="sm" className="hidden sm:inline-flex" />
              ) : null}
            </span>
          </button>
        ))}
      </div>
      <span className="px-1 text-xs text-muted-foreground sm:px-2">
        Saved preference for{" "}
        <code className="text-foreground">elorm init --ui-library {selected}</code>
      </span>
    </div>
  )
}
