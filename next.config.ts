import type {NextConfig} from "next"
import withBundleAnalyzer from "@next/bundle-analyzer"

const withBA = withBundleAnalyzer({enabled: process.env.ANALYZE === "true"})

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.plugins = config.plugins.filter(
        (p: {constructor: {name: string}}) => p.constructor.name !== "CopyFilePlugin",
      )
    }
    return config
  },
}

export default withBA(nextConfig)