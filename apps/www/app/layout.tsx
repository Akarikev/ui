import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SiteProviders } from "@/components/marketing/site-providers"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteDescription =
  "Copy-paste React component library with Base UI or Radix UI and Tailwind CSS. Accessible primitives, OKLCH theming, AI-friendly CLI."

export const metadata: Metadata = {
  title: {
    default: "elorm/ui — Beautiful components you actually own",
    template: "%s — elorm/ui",
  },
  description: siteDescription,
  metadataBase: new URL("https://ui.elorm.xyz"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "elorm/ui",
    title: "elorm/ui — Beautiful components you actually own",
    description: siteDescription,
    url: "https://ui.elorm.xyz",
    images: [
      {
        url: "/hero-anime-monitor.png",
        width: 1536,
        height: 1024,
        alt: "elorm/ui — Beautiful components you actually own",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "elorm/ui — Beautiful components you actually own",
    description: siteDescription,
    images: ["/hero-anime-monitor.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  )
}
