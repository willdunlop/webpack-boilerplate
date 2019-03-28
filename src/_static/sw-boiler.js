
/** 
 * Versioning
 * Major.Minor.Patch 
 */
const version = "0.0.6";
const CACHE = 'Boiler';

console.log(`\x1b[31m${CACHE} v${version}\x1b[0m`);

/**
 * @event install
 * Stores all the assets in the users cache. If one of the assets can't be
 * loaded, the entire operation fails
 */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      /** 
       * COMMAND FOR FULL LIST: find ./build -type f 
       * Remove the .DS_STORE files if the exist
       * The list should include:
       *    - /index.html
       *    - /main.min.js
       *    - /style/main.css
       *    - everything under the /assets/ directory
       * 
       * It should not include
       *    - .DS_STORE files
       *    - manifest.json
       *    - /sw.js
       */
      return cache.addAll([
        '/',
        '/index.html',
        '/main.min.js',
        '/style/main.css',
        '/registerSW.js',

        '/assets/vendor/three.min.js',
        '/assets/vendor/libs/stats.min.js',
        '/assets/vendor/controls/OrbitControls.js',

      ]);
    })
  );
});

/**
 * @event fetch
 */
self.addEventListener('fetch', function (event) {
console.log("fetching")
  event.respondWith(
    caches.match(event.request).then(function (response) {
      console.log("event.request", event.request);
      console.log("cache response", response);

      if(response) {
        console.log("getting assets from cache");
        return response; 
      }
      else {
        console.log("getting assets from bucket");
        return fetch(event.request)
          .then(res => {
            return caches.open(CACHE)
              .then(cache => {
                console.log("updating cache", res);
                cache.put(event.request, res.clone());
                return res;
              });
          }).catch(err => {
            console.log("Error during fetch event", err);
          });
      }
    })
  );

});


self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

