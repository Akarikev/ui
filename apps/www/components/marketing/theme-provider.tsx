"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import { useTheme as useNextTheme } from "next-themes"
import {
  applyThemeToElement,
  type AccentColor,
  type BaseColor,
} from "@elorm/themes"
import { applyMarketingLightOverrides } from "@/lib/marketing-light-theme"

export type ThemeMode = "light" | "dark"

export interface ThemeState {
  baseColor: BaseColor
  accent: AccentColor
}

interface ThemeContextValue extends ThemeState {
  mode: ThemeMode
  setBaseColor: (baseColor: BaseColor) => void
  setAccent: (accent: AccentColor) => void
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const DEFAULT_THEME: ThemeState = {
  baseColor: "neutral",
  accent: "mono",
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeState>(DEFAULT_THEME)
  const { resolvedTheme, setTheme: setNextTheme } = useNextTheme()
  const pathname = usePathname()
  const isMarketingHome = pathname === "/"
  const mode: ThemeMode = resolvedTheme === "dark" ? "dark" : "light"

  useEffect(() => {
    const root = document.documentElement
    applyThemeToElement(
      root,
      { baseColor: theme.baseColor, accent: theme.accent },
      mode
    )
    if (mode === "light" && isMarketingHome) {
      applyMarketingLightOverrides(root)
    }
  }, [theme, mode, isMarketingHome])

  const value: ThemeContextValue = {
    ...theme,
    mode,
    setBaseColor: (baseColor) =>
      setTheme((current) => ({ ...current, baseColor })),
    setAccent: (accent) => setTheme((current) => ({ ...current, accent })),
    setMode: (nextMode) => setNextTheme(nextMode),
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
