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
        const locationElementLaptop = document.getElementById('location');
        const temperatureElementLaptop = document.getElementById('temperature1');
        const conditionElementLaptop = document.getElementById('condition');
        const humidityElementLaptop = document.getElementById('humidity1');
        const windElementLaptop = document.getElementById('wind1');
        const iconElementLaptop = document.getElementById('icon');
    
        const locationElementTablet = document.getElementById('location-tablet');
        const temperatureElementTablet = document.getElementById('temperature1-tablet');
        const conditionElementTablet = document.getElementById('condition-tablet');
        const humidityElementTablet = document.getElementById('humidity1-tablet');
        const windElementTablet = document.getElementById('wind1-tablet');
        const iconElementTablet = document.getElementById('icon-tablet');

        const locationElementMobile = document.getElementById('location-mobile');
        const temperatureElementMobile = document.getElementById('temperature1-mobile');
        const conditionElementMobile = document.getElementById('condition-mobile');
        const humidityElementMobile = document.getElementById('humidity1-mobile');
        const windElementMobile = document.getElementById('wind1-mobile');
        const iconElementMobile = document.getElementById('icon-mobile');
    
        // Set data for Laptop
        locationElementLaptop.textContent = `${data.location.name}, ${data.location.country}`;
        temperatureElementLaptop.innerHTML = `${data.current.temp_c}&#8451;`;
        conditionElementLaptop.textContent = `${data.current.condition.text}`;
        humidityElementLaptop.textContent = `${data.current.humidity}%`;
        windElementLaptop.textContent = `${data.current.wind_kph} kph`;
        iconElementLaptop.innerHTML = `<img src="https:${data.current.condition.icon}" alt="Weather icon">`;
    
        // Set data for Tablet
        locationElementTablet.textContent = `${data.location.name}, ${data.location.country}`;
        temperatureElementTablet.innerHTML = `${data.current.temp_c}&#8451;`;
        conditionElementTablet.textContent = `${data.current.condition.text}`;
        humidityElementTablet.textContent = `${data.current.humidity}%`;
        windElementTablet.textContent = `${data.current.wind_kph} kph`;
        iconElementTablet.innerHTML = `<img src="https:${data.current.condition.icon}" alt="Weather icon">`;

        // Set data for Mobile
        locationElementMobile.textContent = `${data.location.name}, ${data.location.country}`;
        temperatureElementMobile.innerHTML = `${data.current.temp_c}&#8451;`;
        conditionElementMobile.textContent = `${data.current.condition.text}`;
        humidityElementMobile.textContent = `${data.current.humidity}%`;
        windElementMobile.textContent = `${data.current.wind_kph} kph`;
        iconElementMobile.innerHTML = `<img src="https:${data.current.condition.icon}" alt="Weather icon">`;
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
