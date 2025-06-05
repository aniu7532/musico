'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/AssetManifest.json": "3466ff99a63ccd11b184b056e5e40229",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/assets/sound/metronome4-2.wav": "4fda21737bf765ec10ff75f3b4c624c7",
"assets/assets/sound/metronome5-2.wav": "5ed9c0f78e6fe4a182b00b55338be4a6",
"assets/assets/sound/metronome6-2.wav": "1ee496bed0d0f839b6458192aaa750c7",
"assets/assets/sound/metronome7-1.wav": "eef2f21fe8853929b81ad98bc1eaeecd",
"assets/assets/sound/metronome1-2.wav": "900b6fb17ba1ff84979ffa5fa18d7392",
"assets/assets/sound/metronome7-2.wav": "816eed64a1a6d840be12098a43313b34",
"assets/assets/sound/metronome6-1.wav": "0beeb31edd822d499cee52dc462f4e8e",
"assets/assets/sound/metronome2-1.wav": "e6c6f7afd33986096c4aa9a85a65513f",
"assets/assets/sound/metronome3-2.wav": "3005bd59dd74fd34fc87cd7e72dee571",
"assets/assets/sound/metronome0-1.wav": "f01fe5fab4ff8e64b583b0ad4fa7663c",
"assets/assets/sound/metronome2-2.wav": "541bf8cd7414d7ab155e1939ea47be7f",
"assets/assets/sound/metronome5-1.wav": "9345cabeade5aa082f0b0e9c3f3e7dfc",
"assets/assets/sound/metronome3-1.wav": "f42be7721f1b39c08562d98505254f25",
"assets/assets/sound/metronome0-2.wav": "65d59d81b6fca243e1cf2e8ac55fdc43",
"assets/assets/sound/metronome1-1.wav": "c4733ab81a5facd311652ca86fb8559b",
"assets/assets/sound/metronome4-1.wav": "df3e32c82f222ca8c9148259d9f7a97a",
"assets/assets/images/syllable_name_icon.png": "0bf5b57c204e9df3f368d2a5e200fbae",
"assets/assets/images/metronome_icon.png": "7bd81722db57f6a5804f1d106710b6f8",
"assets/assets/images/musical_alphabet_icon.png": "d64a300f828fbfcac26351d798df98df",
"assets/NOTICES": "54a1e7bc73c68e4e037bea06476a7cc9",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"manifest.json": "83574d63eba27509f58b927d9ad3e971",
"index.html": "162fb663e9e36c3deae3747c91ef8434",
"/": "162fb663e9e36c3deae3747c91ef8434",
"version.json": "e330f05062640a68e93b317f24baddd3",
"main.dart.js": "2615b564baddba4a95a57b766f2afdee",
"favicon.png": "5dcef449791fa27946b3d35ad8803796"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
