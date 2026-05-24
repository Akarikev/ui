import type { NextConfig } from "next"

const mintlifyUrl =
  process.env.MINTLIFY_DOCS_URL ?? "https://elorm-ui.mintlify.dev"

const nextConfig: NextConfig = {
  transpilePackages: [],
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: `${mintlifyUrl}/docs`,
      },
      {
        source: "/docs/:path*",
        destination: `${mintlifyUrl}/docs/:path*`,
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
