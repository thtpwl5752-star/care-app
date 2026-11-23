const C="care-v3",CORE=["/","/index.html","/manifest.webmanifest","/icon-192.png","/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{caches.open(C).then(c=>c.put("/",res.clone()));return res}).catch(()=>caches.match("/")));return}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&(r.url.startsWith(self.location.origin)||r.url.includes("fonts.g")))caches.open(C).then(c=>c.put(r,res.clone()));return res})))});
