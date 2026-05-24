import type { NextConfig } from "next"

const mintlifyUrl =
  process.env.MINTLIFY_DOCS_URL ?? "https://elormui.mintlify.app"

const nextConfig: NextConfig = {
  transpilePackages: [],
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: `${mintlifyUrl}/`,
      },
      {
        source: "/docs/:path*",
        destination: `${mintlifyUrl}/:path*`,
      },
      {
        source: "/_mintlify/:path*",
        destination: `${mintlifyUrl}/_mintlify/:path*`,
      },
      {
        source: "/mintlify-assets/:path*",
        destination: `${mintlifyUrl}/mintlify-assets/:path*`,
      },
    ]
  },
}

export default nextConfig
