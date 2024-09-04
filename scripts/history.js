document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'a237e03ebf0848609fb120515240209';
    const baseUrl = 'https://api.weatherapi.com/v1/history.json';

    // Function to format date to YYYY-MM-DD
    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    // Function to fetch weather data for a specific date
    function fetchWeatherForDate(query, date) {
        const url = `${baseUrl}?key=${apiKey}&q=${query}&dt=${date}`;

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            });
    }

    // Function to display weather data
    function displayWeatherData(data, elementId, elementTabId) {
        const weatherElement = document.getElementById(elementId);
        const weatherElementTab = document.getElementById(elementTabId);

        if (weatherElement && weatherElementTab) {
            const dayData = data.forecast.forecastday[0].day;

            const weatherHTML = `
                <div class="row">
                    <div class="col">
                        <table>
                            <tr>
                                <td><center><i class="fa-solid fa-temperature-low" style="color: #ffffff;"></i></center></td>
                                <td><div id="temp">${dayData.avgtemp_c}&#8451;</div></td>
                            </tr>
                            <tr>
                                <td><center><i class="fa-solid fa-wind" style="color: #ffffff;"></i></center></td>
                                <td><div id="wind">${dayData.maxwind_kph} kph</div></td>
                            </tr>
                            <tr>
                                <td><center><i class="fa-solid fa-droplet" style="color: #ffffff;"></i></center></td>
                                <td><div id="humidity">${dayData.avghumidity}%</div></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col">
                        <p><strong>Date:</strong> ${data.forecast.forecastday[0].date}</p>
                        <p><strong>Condition:</strong> ${dayData.condition.text}</p>
                        <img src="https:${dayData.condition.icon}" alt="Weather icon">
                    </div>
                </div>
            `;

            // Update the content of both elements
            weatherElement.innerHTML = weatherHTML;
            weatherElementTab.innerHTML = weatherHTML;
        }
    }

    // Function to fetch and display weather data for the previous three days
    function fetchAndDisplayPreviousThreeDaysWeather(query) {
        const today = new Date();
        const previousDays = [
            formatDate(today.setDate(today.getDate() - 1)),
            formatDate(today.setDate(today.getDate() - 1)),
            formatDate(today.setDate(today.getDate() - 1)),
            formatDate(today.setDate(today.getDate() - 1)),
            formatDate(today.setDate(today.getDate() - 1))
        ];

        previousDays.forEach((date, index) => {
            fetchWeatherForDate(query, date)
                .then(data => {
                    const elementId = `day-${index + 1}`;
                    const elementTabId = `${elementId}-tab`;
                    displayWeatherData(data, elementId, elementTabId);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data. Please try again later.');
                });
        });
    }

    // Get user's current location and fetch weather data
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchAndDisplayPreviousThreeDaysWeather(`${latitude},${longitude}`);
            },
            function (error) {
                console.error('Error getting location:', error);
                fetchAndDisplayPreviousThreeDaysWeather('London'); // Fallback to default location
            }
        );
    } else {
        fetchAndDisplayPreviousThreeDaysWeather('London'); // Fallback to default location
    }
});
