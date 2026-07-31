/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { NextConfig } from "next"
import withBundleAnalyzer from "@next/bundle-analyzer"

const withBA = withBundleAnalyzer({enabled: process.env.ANALYZE === "true"})

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
    },
    output: "export",
    trailingSlash: true,
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.plugins = config.plugins.filter(
                (p: { constructor: { name: string } }) => p.constructor.name !== "CopyFilePlugin",
            )
        }
        return config
    },
}

export default withBA(nextConfig)
