export type BaseColor = "neutral" | "zinc" | "slate" | "stone" | "gray"
export type AccentColor =
  | "default"
  | "mono"
  | "blue"
  | "violet"
  | "green"
  | "orange"
  | "rose"
  | "amber"
  | "cyan"
export type RadiusPreset = "default" | "compact" | "round"

export type ThemeTokens = Record<string, string>

export interface ThemePreset {
  light: ThemeTokens
  dark: ThemeTokens
}

export interface GenerateCssOptions {
  baseColor?: BaseColor
  accent?: AccentColor
  radius?: RadiusPreset
}
