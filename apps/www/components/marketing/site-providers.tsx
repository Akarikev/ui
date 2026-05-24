"use client"

import { ThemeProvider } from "@/components/marketing/theme-provider"

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
