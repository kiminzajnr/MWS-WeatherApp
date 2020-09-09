function checkTime(i){
	if (i < 10){
		i = "0" + i
	}
	return i;
}

function startTime(){
	let today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();

	m = checkTime(m)
	s = checkTime(s)

	document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

	t = setTimeout (function(){
		startTime()
	}, 500);
}
startTime()


function weatherData( cityName ){
	let key = 'd09150822deceefd0208270e69d760a4';
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)
	.then(function (resp) { return resp.json() }) //converting the data to json
	.then(function (data) {
		drawWeather(data);
	})
	.catch (function(){
		
	});

}
window.onload = function(){
	let cityName = document.getElementById("city").value;
	weatherData(cityName);
}


function drawWeather( d ) {
	let celcius = Math.round(parseFloat(d.main.temp)-273.15);
	let fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
	let description = d.weather[0].description;
	let humidity = parseFloat(d.main.humidity);
	let wind = parseFloat(d.wind.speed);
	let icon = d.weather[0].icon;
	let iconurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
	let country = d.sys.country;
	let time = new Date();
	
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = celcius + '&deg;' + "c";
	document.getElementById('humidity').innerHTML = "humidity: " + humidity + " &percnt;";
	document.getElementById('location').innerHTML = d.name + " City" + ", "+ country;
	document.getElementById('wind').innerHTML = "wind speed: " + wind +" m/s";
	document.querySelector("#wicon").src = iconurl;
	document.querySelector("#time").time = time;
}

if ('serviceWorker' in navigator){ //check if service worker is supported
	navigator.serviceWorker.register('sw.js')
	.then((reg)=>{
		//registration worked
		console.log('Registration succeeded. Scope' + reg.scope);
	}).catch((error)=>{
		console.log('registration failed with' + error);
	});
}