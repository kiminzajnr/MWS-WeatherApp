self.addEventListener('install', (event)=>{
	event.waitUntil(
		caches.open('v1').then((cache)=>{
			return cache.addAll([
				'./MWS-WeatherApp/',
				'./MWS-WeatherApp/index.html',
				'./MWS-WeatherApp/style.css',
				'./MWS-WeatherApp/weather.js',
				'./MWS-WeatherApp/apple-touch-icon.png',
				'./MWS-WeatherApp/favicon-32x32.png',
				'./MWS-WeatherApp/android-chrome-192x192.png',
				'./MWS-WeatherApp/android-chrome-144x144',
				'./MWS-WeatherApp/android-chrome-256x256',
				'./MWS-WeatherApp/android-chrome-36x36',
				'./MWS-WeatherApp/android-chrome-384x384',
				'./MWS-WeatherApp/android-chrome-48x48',
				'./MWS-WeatherApp/android-chrome-72x72',
				'./MWS-WeatherApp/android-chrome-96x96',
				'./MWS-WeatherApp/favicon-16x16.png'
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
					return caches.match('./MWS-WeatherApp/index.html');
				});
			});
		}
	}));
});