/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

// build: __BUILD_ID__

self.addEventListener('install', () => {
    self.skipWaiting()
})

self.addEventListener('activate', () => {
    self.clients.claim()
    caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key))
    })
})
