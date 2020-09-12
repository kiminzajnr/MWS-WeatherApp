var cacheName = 'v1:static';
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open(cacheName).then(function(cache){
			return cache.addAll([
				'index.html',
				'style.css',
				'weather.js',
				'images/weather.jpg'
				]).then(function(){
					self.skipWaiting();
				})
		})
		);
});

self.addEventListener('fetch', function(event){
	event.respondWith(caches.match(event.request).then(function(response){
		if (response){
			//retrieve from cache
			return response;
		} else {
			return fetch(event.request).then(function (response){
				let responseClone = response.clone();
				caches.open('v1').then(function(cache){
					cache.put(event.request, responseClone);
					caches.open('v1').then(function (cache){
						//cache.put(event.request, responseClone);
					});
					return response;
				}).catch(function (){
					return caches.match('./index.html');
				});
			});
		}
	}));
});
