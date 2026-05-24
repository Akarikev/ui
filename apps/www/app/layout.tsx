import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "elorm/ui — Beautiful components you actually own",
  description:
    "Copy-paste React component library built on Base UI and Tailwind CSS. Accessible primitives, OKLCH theming, AI-friendly CLI.",
  metadataBase: new URL("https://ui.elorm.xyz"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#050508] antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
