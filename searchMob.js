document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');  

    const apiKey = '864902d67cc947888d745636240210';
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';

    function fetchWeather(query, isSearch = false) {
        console.log('Fetching weather for:', query);  
        const url = `${baseUrl}?key=${apiKey}&q=${query}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data);  
                displayWeather(data, isSearch);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.');
            });
    }

    // Function to display weather data
    function displayWeather(data, isSearch) {
        const locationElement = isSearch ? document.getElementById('searched-location-mob') : document.getElementById('location');
        const temperatureElement = isSearch ? document.getElementById('searched-temperature-mob') : document.getElementById('temperature');
        const conditionElement = isSearch ? document.getElementById('searched-condition-mob') : document.getElementById('condition');
        const humidityElement = isSearch ? document.getElementById('searched-humidity-mob') : document.getElementById('humidity');
        const windElement = isSearch ? document.getElementById('searched-wind-mob') : document.getElementById('wind');
        const iconElement = isSearch ? document.getElementById('searched-icon-mob') : document.getElementById('icon');
        const timeElement = isSearch ? document.getElementById('searched-time-mob') : document.getElementById('local-time');


        if (!locationElement || !temperatureElement || !conditionElement || !humidityElement || !windElement || !iconElement || !timeElement) {
            console.error('One or more elements are missing in the HTML.');
            return;
        }

        locationElement.textContent = `${data.location.name}, ${data.location.country}`;
        temperatureElement.innerHTML = `${data.current.temp_c}&#8451;`;
        conditionElement.textContent = `${data.current.condition.text}`;
        humidityElement.textContent = `${data.current.humidity}%`;
        windElement.textContent = `${data.current.wind_kph} kph`;

        const iconUrl = `https:${data.current.condition.icon}`;
        iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;

        timeElement.textContent = `${data.location.localtime}`;


        
    }


    if (navigator.geolocation) {
        console.log('Attempting to get user location');  
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log('Got location:', position.coords);  
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(`${latitude},${longitude}`);
            },
            function (error) {
                console.error('Error getting location:', error);
                fetchWeather('London'); 
            }
        );
    } else {
        fetchWeather('London');  
    }

    document.getElementById('searchButtonMob').addEventListener('click', function () {
        const searchQuery = document.getElementById('searchInputMob').value.trim();
        console.log('Search button clicked with query:', searchQuery);  
        if (searchQuery) {
            fetchWeather(searchQuery, true);
        } else {
            searchQ();
        }
    });

    function searchQ(){
        document.getElementById('searchButtonTab').addEventListener('click', function () {
            const searchQuery = document.getElementById('searchInputTab').value.trim();
            console.log('Search button clicked with query:', searchQuery);  
            if (searchQuery) {
                fetchWeather(searchQuery, true);
            } else {
                alert('Please enter a location to search.');
            }
        });
    }
});
