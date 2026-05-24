import type { AccentColor, ThemeTokens } from "../types.js"

const accentHues: Record<Exclude<AccentColor, "default">, number> = {
  blue: 252,
  violet: 280,
  green: 145,
  orange: 45,
  rose: 350,
  amber: 75,
  cyan: 195,
}

export const ACCENT_COLORS = [
  "default",
  "blue",
  "violet",
  "green",
  "orange",
  "rose",
  "amber",
  "cyan",
] as const

export function applyAccent(
  tokens: ThemeTokens,
  accent: AccentColor,
  mode: "light" | "dark"
): ThemeTokens {
  if (accent === "default") return { ...tokens }

  const hue = accentHues[accent]
  const result = { ...tokens }

  if (mode === "light") {
    result.primary = `oklch(0.45 0.18 ${hue})`
    result["primary-foreground"] = "oklch(0.985 0 0)"
    result.ring = `oklch(0.55 0.15 ${hue})`
    result["chart-1"] = `oklch(0.55 0.2 ${hue})`
    result["chart-2"] = `oklch(0.6 0.15 ${hue + 30})`
    result["chart-3"] = `oklch(0.65 0.12 ${hue + 60})`
  } else {
    result.primary = `oklch(0.65 0.18 ${hue})`
    result["primary-foreground"] = "oklch(0.985 0 0)"
    result.ring = `oklch(0.55 0.15 ${hue})`
    result["chart-1"] = `oklch(0.55 0.22 ${hue})`
    result["chart-2"] = `oklch(0.65 0.17 ${hue + 30})`
    result["chart-3"] = `oklch(0.7 0.14 ${hue + 60})`
  }

  return result
}

export function getAccentCssVars(accent: AccentColor): {
  light: ThemeTokens
  dark: ThemeTokens
} {
  const light = applyAccent({}, accent, "light")
  const dark = applyAccent({}, accent, "dark")
  return { light, dark }
}
