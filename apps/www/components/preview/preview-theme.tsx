"use client"

import { useEffect } from "react"
import {
  applyThemeToElement,
  type AccentColor,
  type BaseColor,
} from "@elorm/themes"

interface PreviewThemeProps {
  theme?: string
  accent?: string
  mode?: string
}

export function PreviewTheme({
  theme = "neutral",
  accent = "default",
  mode = "dark",
}: PreviewThemeProps) {
  useEffect(() => {
    const root = document.documentElement
    const isDark = mode !== "light"
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    applyThemeToElement(
      root,
      {
        baseColor: theme as BaseColor,
        accent: accent as AccentColor,
      },
      isDark ? "dark" : "light"
    )
  }, [theme, accent, mode])

  return null
}
