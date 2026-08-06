/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

"use client"

import { useEffect } from "react"

export function ServiceWorkerUpdater() {
    useEffect(() => {
        if (typeof window === "undefined" ||
            !( "serviceWorker" in navigator ) ||
            ( process.env.NODE_ENV !== "production" )
        ) {
            return
        }


        let isControlled = navigator.serviceWorker.controller != null
        let intervalId: ReturnType<typeof setInterval> | undefined

        const onControllerChange = () => {
            if (isControlled) {
                window.location.reload()
            } else {
                isControlled = true
            }
        }

        navigator.serviceWorker.addEventListener("controllerchange", onControllerChange)

        navigator.serviceWorker.register("/sw.js").then((registration) => {
            intervalId = setInterval(() => registration.update(), 60_000)
        })

        return () => {
            navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange)

            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [])

    return null
}
