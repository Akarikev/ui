import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google"
import { SiteProviders } from "@/components/marketing/site-providers"
import { createRootMetadata } from "@/lib/seo"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = createRootMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme"),r=t||"dark";if(r==="system"){r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(r==="dark"){d.classList.add("dark")}else{d.classList.remove("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <SiteProviders>{children}</SiteProviders>
        <Analytics />
      </body>
    </html>
  )
}
