const weatherContainer = document.querySelector('#weather-container');

function getWeather(latitude, longitude) {
	const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`;

	fetch(apiURL)
		.then(response => response.json())
		.then(data => {
			const temperature = Math.round(data.main.temp);
			const description = data.weather[0].description;

			weatherContainer.innerHTML = `
				<p>Temperature: ${temperature}&deg;C</p>
				<p>Description: ${description}</p>
			`;
		})
		.catch(error => console.error(error));
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			getWeather(latitude, longitude);
		}, error => {
			console.error(error);
			weatherContainer.innerHTML = `
				<p>Unable to retrieve location data. Please enter your location manually.</p>
			`;
		});
	} else {
		console.error('Geolocation is not supported by this browser.');
		weatherContainer.innerHTML = `
			<p>Geolocation is not supported by this browser. Please enter your location manually.</p>
		`;
	}
}

getLocation();
