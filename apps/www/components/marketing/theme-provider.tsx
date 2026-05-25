"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  applyThemeToElement,
  type AccentColor,
  type BaseColor,
} from "@elorm/themes"

export type ThemeMode = "light" | "dark"

export interface ThemeState {
  baseColor: BaseColor
  accent: AccentColor
  mode: ThemeMode
}

interface ThemeContextValue extends ThemeState {
  setBaseColor: (baseColor: BaseColor) => void
  setAccent: (accent: AccentColor) => void
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const DEFAULT_THEME: ThemeState = {
  baseColor: "neutral",
  accent: "mono",
  mode: "dark",
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeState>(DEFAULT_THEME)

  useEffect(() => {
    const root = document.documentElement
    if (theme.mode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    applyThemeToElement(
      root,
      { baseColor: theme.baseColor, accent: theme.accent },
      theme.mode
    )
  }, [theme])

  const value: ThemeContextValue = {
    ...theme,
    setBaseColor: (baseColor) =>
      setTheme((current) => ({ ...current, baseColor })),
    setAccent: (accent) => setTheme((current) => ({ ...current, accent })),
    setMode: (mode) => setTheme((current) => ({ ...current, mode })),
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
