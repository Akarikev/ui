import type { ThemeTokens } from "../types.js"

export const EXTENDED_LIGHT_TOKENS: ThemeTokens = {
  "surface-1": "var(--background)",
  "surface-2": "var(--card)",
  "surface-3": "var(--popover)",
  success: "oklch(0.627 0.194 149.214)",
  "success-foreground": "oklch(0.985 0 0)",
  warning: "oklch(0.769 0.188 70.08)",
  "warning-foreground": "oklch(0.205 0 0)",
  info: "oklch(0.546 0.245 262.881)",
  "info-foreground": "oklch(0.985 0 0)",
}

export const EXTENDED_DARK_TOKENS: ThemeTokens = {
  "surface-1": "var(--background)",
  "surface-2": "var(--card)",
  "surface-3": "var(--popover)",
  success: "oklch(0.696 0.17 162.48)",
  "success-foreground": "oklch(0.145 0 0)",
  warning: "oklch(0.828 0.189 84.429)",
  "warning-foreground": "oklch(0.145 0 0)",
  info: "oklch(0.623 0.214 259.815)",
  "info-foreground": "oklch(0.985 0 0)",
}

export const STATIC_CSS_TOKENS = `
  --shadow-xs: 0 1px 2px oklch(0 0 0 / 0.04);
  --shadow-sm: 0 1px 3px oklch(0 0 0 / 0.08), 0 1px 2px oklch(0 0 0 / 0.04);
  --shadow-md: 0 4px 6px oklch(0 0 0 / 0.06);
  --shadow-lg: 0 10px 15px oklch(0 0 0 / 0.08);
  --transition-fast: 100ms;
  --transition-base: 150ms;
`

export const STATIC_CSS_TOKENS_DARK = `
  --shadow-xs: 0 1px 2px oklch(0 0 0 / 0.2);
  --shadow-sm: 0 1px 3px oklch(0 0 0 / 0.3), 0 1px 2px oklch(0 0 0 / 0.2);
  --shadow-md: 0 4px 6px oklch(0 0 0 / 0.35);
  --shadow-lg: 0 10px 15px oklch(0 0 0 / 0.4);
`

export function mergeExtendedTokens(tokens: ThemeTokens, mode: "light" | "dark"): ThemeTokens {
  const extended = mode === "dark" ? EXTENDED_DARK_TOKENS : EXTENDED_LIGHT_TOKENS
  return { ...tokens, ...extended }
}
