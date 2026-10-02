/* Personal OS · trabajador sin conexión
   - La puerta de entrada (esta web) se pide primero a internet y, si no hay, sale de la copia guardada.
   - El OS completo NO pasa por aquí: lo descarga la puerta desde tu almacén privado de Supabase
     y lo guarda en este dispositivo en su propia caché («pos-app-…»), que este archivo respeta.
   - Las librerías y fuentes salen de la copia y se refrescan por detrás.
   - Tus datos (Supabase) nunca se guardan aquí: siempre van a la red. */
const CACHE = 'personal-os-v3';
const BASE = ['./personal-os.html', './manifest.webmanifest', './icono-192.png', './icono-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE && !k.startsWith('pos-app')).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || r.headers.has('range')) return;
  const u = new URL(r.url);
  if (u.searchParams.has('c')) return;
  if (u.hostname.endsWith('supabase.co')) return;

  if (u.origin === self.location.origin) {
    e.respondWith(fetch(r.url, { cache: 'no-cache' }).then(res => {
      if (res.ok && !u.search) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r, copia)); }
      return res;
    }).catch(() => caches.match(r, { ignoreSearch: true })
      .then(m => m || (r.mode === 'navigate' ? caches.match('./personal-os.html') : undefined))));
    return;
  }

  if (u.hostname === 'cdn.jsdelivr.net' || u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(r).then(m => {
      const red = fetch(r).then(res => {
        if (res.ok || res.type === 'opaque') { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r, copia)); }
        return res;
      }).catch(() => m);
      return m || red;
    }));
  }
});
