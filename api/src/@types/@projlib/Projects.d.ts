/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

export {}

declare global {
    namespace Projects {
        interface Project {
            description: string
            features: string[]
            media?: Project.Media[]
            short: string
            skills: string[]
            slug: string
            tags: string[]
            title: string
        }

        namespace Project {
            interface Media {
                src: string
                type: "image" | "video"
            }
        }
    }
}
