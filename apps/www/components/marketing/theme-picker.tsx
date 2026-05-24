"use client"

import { useEffect, useRef, useState } from "react"
import { PaletteIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemePanel } from "./theme-panel"
import { useTheme } from "./theme-provider"

const accentSwatches: Record<string, string> = {
  default: "var(--primary)",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  green: "#22c55e",
  orange: "#f97316",
  rose: "#f43f5e",
  amber: "#f59e0b",
  cyan: "#06b6d4",
}

export function ThemePicker() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { accent, mode } = useTheme()

  useEffect(() => {
    if (!open) return

    function handleClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Customize theme"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
          open && "border-primary/40 bg-card text-foreground"
        )}
      >
        <PaletteIcon className="size-4" />
        <span className="hidden sm:inline">Theme</span>
        <span
          className="size-3 rounded-full ring-1 ring-border"
          style={{ backgroundColor: accentSwatches[accent] }}
        />
        <span className="sr-only">
          {mode} mode, {accent} accent
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Theme settings"
          className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-foreground">
              Customize theme
            </p>
            <p className="text-xs text-muted-foreground">
              Preview colors across the site
            </p>
          </div>
          <ThemePanel />
        </div>
      )}
    </div>
  )
}
