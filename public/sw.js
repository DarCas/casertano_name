self.addEventListener("install", () => {
  self.skipWaiting()
  caches.keys().then((keys) => {
    keys.forEach((key) => caches.delete(key))
  })
})

self.addEventListener("activate", () => {
  clients.claim()
  self.registration.unregister()
})
