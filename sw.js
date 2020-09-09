self.addEventListener('install', (event)=>{
	event.waitUntil(
		caches.open('v1').then((cache)=>{
			return cache.addAll([
				'.//',
				'./index.html',
				'./style.css',
				'./weather.js',
				'./apple-touch-icon.png',
				'./favicon-32x32.png',
				'./android-chrome-192x192.png',
				'./android-chrome-144x144',
				'./android-chrome-256x256',
				'./android-chrome-36x36',
				'./android-chrome-384x384',
				'./android-chrome-48x48',
				'./android-chrome-72x72',
				'./android-chrome-96x96',
				'./favicon-16x16.png'
				]);
		})
		);
});

self.addEventListener('fetch', function(event){
	event.respondWith(caches.match(event.request).then(function(response){
		if (response !== undefined){
			return response;
		} else {
			return fetch(event.request).then(function (response){
				let responseClone = response.clone();
				caches.open('v1').then(function(cache){
					cache.put(event.request, responseClone);
					caches.open('v1').then(function (cache){
						cache.put(event.request, responseClone);
					});
					return response;
				}).catch(function (){
					return caches.match('index.html');
				});
			});
		}
	}));
});