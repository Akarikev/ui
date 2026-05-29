"use client"

import { ThemeProvider as NextThemesProvider } from "@/components/theme-provider"
import { ThemeProvider as MarketingThemeProvider } from "@/components/marketing/theme-provider"

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider defaultTheme="dark">
      <MarketingThemeProvider>{children}</MarketingThemeProvider>
    </NextThemesProvider>
  )
}
