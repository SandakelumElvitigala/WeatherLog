document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');  // Check if DOMContentLoaded event is firing

    const apiKey = 'a237e03ebf0848609fb120515240209';
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';

    function fetchWeather(query, isSearch = false) {
        console.log('Fetching weather for:', query);  // Log the query
        const url = `${baseUrl}?key=${apiKey}&q=${query}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data);  // Log weather data
                displayWeather(data, isSearch);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.');
            });
    }

    // Function to display weather data
    function displayWeather(data, isSearch) {
        const locationElement = isSearch ? document.getElementById('searched-location') : document.getElementById('location');
        const temperatureElement = isSearch ? document.getElementById('searched-temperature') : document.getElementById('temperature');
        const conditionElement = isSearch ? document.getElementById('searched-condition') : document.getElementById('condition');
        const humidityElement = isSearch ? document.getElementById('searched-humidity') : document.getElementById('humidity');
        const windElement = isSearch ? document.getElementById('searched-wind') : document.getElementById('wind');
        const iconElement = isSearch ? document.getElementById('searched-icon') : document.getElementById('icon');
        const timeElement = isSearch ? document.getElementById('searched-time') : document.getElementById('local-time'); // New time element

        if (!locationElement || !temperatureElement || !conditionElement || !humidityElement || !windElement || !iconElement || !timeElement) {
            console.error('One or more elements are missing in the HTML.');
            return;
        }

        locationElement.textContent = `${data.location.name}, ${data.location.country}`;
        temperatureElement.innerHTML = `${data.current.temp_c}&#8451;`;
        conditionElement.textContent = `${data.current.condition.text}`;
        humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
        windElement.textContent = `Wind: ${data.current.wind_kph} kph`;

        const iconUrl = `https:${data.current.condition.icon}`;
        iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;

        // Display the local time of the location
        timeElement.textContent = `${data.location.localtime}`;
    }


    if (navigator.geolocation) {
        console.log('Attempting to get user location');  // Log that we're attempting to get location
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log('Got location:', position.coords);  // Log location coordinates
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(`${latitude},${longitude}`);
            },
            function (error) {
                console.error('Error getting location:', error);
                fetchWeather('London');  // Fallback to default location
            }
        );
    } else {
        fetchWeather('London');  // Fallback to default location
    }

    document.getElementById('searchButton').addEventListener('click', function () {
        const searchQuery = document.getElementById('searchInput').value.trim();
        console.log('Search button clicked with query:', searchQuery);  // Log the search query
        if (searchQuery) {
            fetchWeather(searchQuery, true);
        } else {
            alert('Please enter a location to search.');
        }
    });
});
