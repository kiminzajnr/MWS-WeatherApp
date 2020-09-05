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
	let iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
	let country = d.sys.country;
	
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = celcius + '&deg;' + "c";
	document.getElementById('humidity').innerHTML = "humidity: " + humidity + " &percnt;";
	document.getElementById('location').innerHTML = d.name + " City" + ", "+ country;
	document.getElementById('wind').innerHTML = "wind speed: " + wind +" m/s";
	document.querySelector("#wicon").src = iconurl;
}
