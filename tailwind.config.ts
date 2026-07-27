/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [],
    theme: {
        extend: {
            animation: {
                tagGlow: "tagGlow 3s ease-in-out infinite",
                tagHeroGlow: "tagHeroGlow 3s ease-in-out infinite",
            },
            colors: {
                bg: "#0A0A0B",
                "bg-surface": "#141416",
                "bg-surface-hover": "#1E1E22",
                text: "#EDEDEF",
                "text-secondary": "#888890",
                accent: "#6C63FF",
                "accent-secondary": "#00D4AA",
            },
            fontFamily: {
                mono: ["var(--font-jetbrains-mono)", "monospace"],
                sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
            },
            keyframes: {
                tagGlow: {
                    "0%, 100%": {
                        borderColor: "rgba(108, 99, 255, 0.15)",
                        boxShadow: "0 0 0 transparent",
                    },
                    "50%": {
                        borderColor: "rgba(0, 212, 170, 0.35)",
                        boxShadow: "0 0 8px rgba(0, 212, 170, 0.12)",
                    },
                },
                tagHeroGlow: {
                    "0%, 100%": {
                        borderColor: "rgba(0, 212, 170, 0.15)",
                        boxShadow: "0 0 0 transparent",
                    },
                    "50%": {
                        borderColor: "rgba(108, 99, 255, 0.4)",
                        boxShadow: "0 0 10px rgba(108, 99, 255, 0.2)",
                    },
                },
            },
        },
    },
}

export default config
