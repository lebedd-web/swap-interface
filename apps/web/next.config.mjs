import bundleAnalyzer from "@next/bundle-analyzer"
import createNextIntlPlugin from "next-intl/plugin"

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const isGithubPages = process.env.GITHUB_ACTIONS === "true"
const basePath = isGithubPages && repoName ? `/${repoName}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@library/ui"],
  webpack: (config) => {
    config.cache = false

    return config
  },
  async headers() {
    return [
      {
        source: "/:path*\\.webp",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*\\.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

export default withBundleAnalyzer(withNextIntl(nextConfig))
