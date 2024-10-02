document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '864902d67cc947888d745636240210 ';
    const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

    function fetchWeather(query) {
        const url = `${baseUrl}?key=${apiKey}&q=${query}&days=1`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data); 
                displayHourlyWeather(data.forecast.forecastday[0].hour);
                initializePopovers(); 
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.'); 
            });
    }

    function displayHourlyWeather(hourlyData) {
        const hoursToDisplay = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
        const currentHour = new Date().getHours(); 

        hoursToDisplay.forEach(hour => {
            const weatherData = hourlyData.find(h => new Date(h.time).getHours() === hour);
            const hourElementlap = document.getElementById(`hour-${hour}`); 
            const hourElementtab = document.getElementById(`hour-${hour}-tab`);
            const hourElementmob = document.getElementById(`hour-${hour}-mob`);

            if (hourElementlap && hourElementtab) {
                if (hour <= currentHour) {
                    hourElementlap.innerHTML = `
                        <button type="button" class="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="right"
                            data-bs-custom-class="custom-popover"
                            data-bs-title="Weather Information"
                            data-bs-content="Temp: ${weatherData.temp_c}&#8451;  Condition: ${weatherData.condition.text}">
                            <center><img src="https:${weatherData.condition.icon}" alt="Weather icon"></center>
                        </button>
                    `;
                    hourElementtab.innerHTML = `
                        <button type="button" class="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="right"
                            data-bs-custom-class="custom-popover"
                            data-bs-title="Weather Information"
                            data-bs-content="Temp: ${weatherData.temp_c}&#8451;  Condition: ${weatherData.condition.text}">
                            <center><img src="https:${weatherData.condition.icon}" alt="Weather icon"></center>
                        </button>
                    `;
                    hourElementmob.innerHTML = `
                        <button type="button" class="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="right"
                            data-bs-custom-class="custom-popover"
                            data-bs-title="Weather Information"
                            data-bs-content="Temp: ${weatherData.temp_c}&#8451;  Condition: ${weatherData.condition.text}">
                            <center><img src="https:${weatherData.condition.icon}" alt="Weather icon"></center>
                        </button>
                    `;
                } else {
                    hourElementlap.innerHTML = `
                        <center>
                            <video autoplay loop muted playsinline style="height:90px; width:60px;">
                                <source src="assests/waiting.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </center>
                    `;
                    hourElementtab.innerHTML = `
                        <center>
                            <video autoplay loop muted playsinline style="height:90px; width:60px;">
                                <source src="assests/waiting.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </center>
                    `;
                    hourElementmob.innerHTML = `
                        <center>
                            <video autoplay loop muted playsinline style="height:90px; width:60px;">
                                <source src="assests/waiting.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </center>
                    `;
                }
            }
        });
    }

    // Function to initialize popovers
    function initializePopovers() {
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        });
    }

    // Get user's current location weather
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(`${latitude},${longitude}`);
            },
            function(error) {
                console.error('Error getting location:', error);
                fetchWeather('London'); // Fallback to default location
            }
        );
    } else {
        fetchWeather('London'); // Fallback to default location
    }
});
