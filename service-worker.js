const CACHE_NAME='km-flow-v1';
const ASSETS=['./','./index.html','./compat.html','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/logo.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))) });
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone(); caches.open(CACHE_NAME).then(x=>x.put(e.request,c)); return n;}).catch(()=>caches.match('./index.html'))))});