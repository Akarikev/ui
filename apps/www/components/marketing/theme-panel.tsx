"use client"

import { ACCENT_COLORS, BASE_COLORS, MONO_ACCENT_SWATCH } from "@elorm/themes"
import { cn } from "@/lib/utils"
import { useTheme } from "./theme-provider"

const accentSwatches: Record<string, string> = {
  blue: "#3b82f6",
  violet: "#8b5cf6",
  green: "#22c55e",
  orange: "#f97316",
  rose: "#f43f5e",
  amber: "#f59e0b",
  cyan: "#06b6d4",
}

const accentLabels: Partial<Record<string, string>> = {
  mono: "Mono (neutral / zinc)",
}

interface ThemePanelProps {
  className?: string
}

export function ThemePanel({ className }: ThemePanelProps) {
  const { baseColor, accent, mode, setBaseColor, setAccent, setMode } =
    useTheme()

  return (
    <div className={cn("space-y-4 p-4", className)}>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Base</p>
        <div className="flex flex-wrap gap-2">
          {BASE_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              aria-label={`${color} base color`}
              aria-pressed={baseColor === color}
              onClick={() => setBaseColor(color)}
              className={cn(
                "size-6 rounded-full border-2 transition-transform hover:scale-110",
                baseColor === color
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border",
                color === "neutral" && "bg-neutral-500",
                color === "zinc" && "bg-zinc-500",
                color === "slate" && "bg-slate-500",
                color === "stone" && "bg-stone-500",
                color === "gray" && "bg-gray-500"
              )}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Accent
        </p>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.filter((a) => a !== "default").map((color) => (
            <button
              key={color}
              type="button"
              title={accentLabels[color] ?? color}
              aria-label={accentLabels[color] ?? `${color} accent`}
              aria-pressed={accent === color}
              onClick={() => setAccent(color)}
              className={cn(
                "size-6 rounded-full border-2 transition-transform hover:scale-110",
                accent === color
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border"
              )}
              style={
                color === "mono"
                  ? { background: MONO_ACCENT_SWATCH }
                  : { backgroundColor: accentSwatches[color] }
              }
            />
          ))}
        </div>
        {accent === "mono" && (
          <p className="mt-2 text-xs text-muted-foreground">
            Switch the Neutral or Zinc base above to compare both palettes.
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Mode</p>
        <div className="inline-flex rounded-lg border border-border p-0.5">
          {(["light", "dark"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={cn(
                "rounded-md px-3 py-1 text-xs capitalize transition-colors",
                mode === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
