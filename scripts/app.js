document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'a237e03ebf0848609fb120515240209'; // Your API key
    const baseUrl = 'http://api.weatherapi.com/v1/current.json';

    // Function to fetch and display weather data based on location
    function fetchWeather(latitude, longitude) {
        const url = `${baseUrl}?key=${apiKey}&q=${latitude},${longitude}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayWeather(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Function to display weather data
    function displayWeather(data) {
        const locationElement = document.getElementById('location');
        const temperatureElement = document.getElementById('temperature');
        const conditionElement = document.getElementById('condition');
        const humidityElement = document.getElementById('humidity');
        const windElement = document.getElementById('wind');
        const iconElement = document.getElementById('icon');

        // Set location
        locationElement.textContent = `${data.location.name}, ${data.location.country}`;

        // Set temperature and condition
        temperatureElement.innerHTML = `${data.current.temp_c}&#8451;`;
        conditionElement.textContent = `Condition: ${data.current.condition.text}`;

        // Set humidity and wind
        humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
        windElement.textContent = `Wind: ${data.current.wind_kph} kph`;

        // Display weather icon
        const iconUrl = `https:${data.current.condition.icon}`;
        iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;
    }

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(latitude, longitude);
            },
            function(error) {
                console.error('Error getting location:', error);
                // Fallback to a default location if the user denies geolocation
                const defaultLocation = 'London';
                fetchWeather(defaultLocation);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        // Fallback to a default location if geolocation is not supported
        const defaultLocation = 'London';
        fetchWeather(defaultLocation);
    }
});
