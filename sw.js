const V='5.5',C='wanas-'+V;
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{if(x.ok){const k=x.clone();caches.open(C).then(c=>c.put(r,k))}return x}).catch(()=>caches.match(r)))});
self.addEventListener('push',e=>{let k='r';try{k=(e.data&&e.data.json().k)||'r'}catch(_){}
const body=k==='s'?'وصلك دعم جديد، إنت مش لوحدك':'وصلك رد جديد بكل أمان وود';
e.waitUntil(self.registration.showNotification('ونس',{body,icon:'icon-192.png',badge:'icon-192.png',tag:'wanas-'+k,renotify:true,dir:'rtl',lang:'ar',data:{url:'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus'in c)return c.focus()}return self.clients.openWindow('./')}))});
