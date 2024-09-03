document.body.style.backgroundImage = "url('assests/themes/lighttheme-noon.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center";

let localTimeOffset = 0; // Initialize the global offset variable
let hours = 0;

function displayLocalTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fetch the time zone info from an API
            fetch(`http://worldtimeapi.org/api/timezone/Etc/GMT`)
                .then(response => response.json())
                .then(data => {
                    // Calculate the initial time difference
                    const serverTime = new Date(data.datetime);
                    const localTime = new Date();
                    localTimeOffset = serverTime.getTime() - localTime.getTime();

                    // Update the time and background every second
                    setInterval(() => {
                        updateTime();
                        let stat = getStat();
                        changeBackground(stat);
                    }, 1000);

                    // Fetch location details based on lat and lon
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
                        .then(response => response.json())
                        .then(locationData => {
                            const location = locationData.address;
                            const locationText = `${location.city || location.town || location.village || location.country}, ${location.country}`;
                            document.getElementById('location').textContent = `${locationText}`;
                        })
                        .catch(error => console.error('Error fetching location:', error));
                })
                .catch(error => console.error('Error fetching time:', error));
        }, function (error) {
            console.error('Error getting geolocation:', error);
            document.getElementById('local-time').textContent = "Unable to retrieve your location.";
        });
    } else {
        document.getElementById('local-time').textContent = "Geolocation is not supported by this browser.";
    }
}

function updateTime() {
    // Calculate the current time based on the local time offset
    const localTime = new Date(new Date().getTime() + localTimeOffset);
    const timeString1 = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',  hour12: false });
    const timeString = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',  hour12: true });
    const dateString = localTime.toLocaleDateString();
    const amPm = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[1];

    // Display time, date, and period (AM/PM)
    document.getElementById('local-time').textContent = `${timeString1}`;
    document.getElementById('local-date').textContent = `${dateString}`;
    document.getElementById('am-pm').textContent = `${amPm}`;
    // Determine the time of day
    hours = localTime.getHours();
    console.log(hours);

    // Display the greeting based on the time of day
    let greeting = "Morning";
    if (hours >= 12 && hours < 18) {
        greeting = "Afternoon";
    } else if (hours >= 18 && hours < 24) {
        greeting = "Evening";
    } else if (hours >= 0 && hours < 5) {
        greeting = "Night";
    }
    document.getElementById('greeting').textContent = `Good ${greeting}!`;
}

// Get references to the checkbox and label
const toggleCheckbox = document.getElementById('btn-check-2-outlined');
const toggleLabel = document.getElementById('toggleStat');
let stat = 0;

function updateLabel() {
    if (toggleCheckbox.checked) {
        toggleLabel.innerHTML = '<i class="fa-solid fa-cloud-moon"></i>'; // Light theme icon
        stat = 0;
    } else {
        toggleLabel.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>'; // Dark theme icon
        stat = 1;
    }
    changeBackground(stat);
}

function getStat() {
    return stat;
}

// Add event listener to the checkbox to handle change event
toggleCheckbox.addEventListener('change', updateLabel);

// Initial call to set the correct label text on page load
updateLabel();

function changeBackground(stat) {
    console.log(stat);
    const icon = document.querySelector('#toggleStat i');

    if (stat === 0) { // Light theme
        if (hours >= 5 && hours < 10) {
            document.body.style.backgroundImage = "url('assests/themes/lighttheme-morning.jpeg')";
            icon.style.color = '#333'; // Default color for light theme
        } else if (hours >= 10 && hours < 14) {
            document.body.style.backgroundImage = "url('assests/themes/lighttheme-noon.jpg')";
            icon.style.color = '#333'; // Default color for light theme
        } else if (hours >= 14 && hours < 19) {
            document.body.style.backgroundImage = "url('assests/themes/lighttheme-eve.jpg')";
            icon.style.color = 'white'; // Default color for light theme
        } else {
            document.body.style.backgroundImage = "url('assests/themes/lighttheme-night.jpg')";
            icon.style.color = 'white'; // Default color for light theme
        }
        
    } else { // Dark theme
        document.body.style.backgroundImage = "url('assests/themes/darktheme.jpg')";
        icon.style.color = 'white'; // Default color for dark theme
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
}

displayLocalTime();
