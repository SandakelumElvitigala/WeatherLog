document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'a237e03ebf0848609fb120515240209';
    const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

    // Function to fetch weather data including hourly data
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
                console.log('Weather data:', data); // Log data for debugging
                displayHourlyWeather(data.forecast.forecastday[0].hour);
                initializePopovers(); // Initialize popovers after content is loaded
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.'); // Notify the user
            });
    }

    // Function to display hourly weather data for specific times
    function displayHourlyWeather(hourlyData) {
        const hoursToDisplay = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]; // Hours in 24-hour format
        const currentHour = new Date().getHours(); // Get the current hour in 24-hour format

        hoursToDisplay.forEach(hour => {
            const weatherData = hourlyData.find(h => new Date(h.time).getHours() === hour);
            const hourElementlap = document.getElementById(`hour-${hour}`); // Assuming you have elements with IDs like hour-4, hour-6, etc.
            const hourElementtab = document.getElementById(`hour-${hour}-tab`);
            const hourElementmob = document.getElementById(`hour-${hour}-mob`);

            if (hourElementlap && hourElementtab) {
                if (hour <= currentHour) {
                    // Display actual weather data for the current or past hours
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
                    // Display "wait.mp4" video instead of "N/A" for future hours
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
