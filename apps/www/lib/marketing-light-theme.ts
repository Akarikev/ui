/** Soft warm off-white tokens for the marketing homepage in light mode. */
export const MARKETING_LIGHT_OVERRIDES: Record<string, string> = {
  background: "oklch(0.988 0.006 95)",
  card: "oklch(0.993 0.004 95)",
  popover: "oklch(0.993 0.004 95)",
  secondary: "oklch(0.974 0.008 95)",
  muted: "oklch(0.974 0.008 95)",
  accent: "oklch(0.974 0.008 95)",
  border: "oklch(0.920 0.010 95)",
  input: "oklch(0.920 0.010 95)",
}

export function applyMarketingLightOverrides(element: HTMLElement) {
  for (const [key, value] of Object.entries(MARKETING_LIGHT_OVERRIDES)) {
    element.style.setProperty(`--${key}`, value)
  }
}
