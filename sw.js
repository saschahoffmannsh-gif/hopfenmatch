/* HopfenMatch ist umgezogen nach https://hopfenmatch.github.io/
   Dieser Service Worker ersetzt den alten: löscht alle Caches, meldet sich selbst ab
   und schickt offene Fenster zur neuen Adresse. */
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){
  e.waitUntil((async function(){
    var ks=await caches.keys();await Promise.all(ks.map(function(k){return caches.delete(k)}));
    await self.registration.unregister();
    var cs=await self.clients.matchAll({type:'window'});
    cs.forEach(function(c){try{c.navigate('https://hopfenmatch.github.io/')}catch(x){}});
  })());
});
self.addEventListener('fetch',function(e){ /* nichts abfangen – alles direkt aus dem Netz */ });
