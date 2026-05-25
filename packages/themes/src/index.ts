import type {
  AccentColor,
  BaseColor,
  GenerateCssOptions,
  RadiusPreset,
  ThemePreset,
  ThemeTokens,
} from "./types.js"
import { getBasePalette } from "./presets/base-colors.js"
import { applyAccent } from "./presets/accents.js"
import { mergeExtendedTokens, STATIC_CSS_TOKENS, STATIC_CSS_TOKENS_DARK } from "./presets/extended-tokens.js"

const RADIUS_VALUES: Record<RadiusPreset, string> = {
  default: "0.625rem",
  compact: "0.375rem",
  round: "0.75rem",
}

export const RADIUS_PRESETS = Object.keys(RADIUS_VALUES) as RadiusPreset[]

export function getThemeTokens(options: GenerateCssOptions = {}): ThemePreset & {
  radius: string
} {
  const baseColor = options.baseColor ?? "neutral"
  const accent = options.accent ?? "default"
  const radius = RADIUS_VALUES[options.radius ?? "default"]

  const base = getBasePalette(baseColor)

  return {
    light: applyAccent(base.light, accent, "light"),
    dark: applyAccent(base.dark, accent, "dark"),
    radius,
  }
}

function formatVarsBlock(tokens: ThemeTokens, indent = "  "): string {
  return Object.entries(tokens)
    .map(([key, value]) => `${indent}--${key}: ${value};`)
    .join("\n")
}

export function generateCssTemplate(options: GenerateCssOptions = {}): string {
  const theme = getThemeTokens(options)

  return `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
}

:root {
  --radius: ${theme.radius};
${STATIC_CSS_TOKENS}
${formatVarsBlock(theme.light)}
}

.dark {
${STATIC_CSS_TOKENS_DARK}
${formatVarsBlock(theme.dark)}
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`
}

export function applyThemeToElement(
  element: HTMLElement,
  options: GenerateCssOptions = {},
  mode: "light" | "dark" = "light"
): void {
  const theme = getThemeTokens(options)
  const tokens = mode === "dark" ? theme.dark : theme.light

  element.style.setProperty("--radius", theme.radius)
  for (const [key, value] of Object.entries(tokens)) {
    element.style.setProperty(`--${key}`, value)
  }
}

export * from "./types.js"
export * from "./presets/base-colors.js"
export * from "./presets/accents.js"
