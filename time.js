document.body.style.backgroundImage = "url('assests/themes/lighttheme-noon.jpg')";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundAttachment = "fixed";

let localTimeOffset = 0; // Initialize the global offset variable
let hours = 0;

// Function to display the local time immediately using the browser's local time
function displayInitialTime() {
    updateTime(); // Call update time immediately using the system time
    setInterval(updateTime, 1000); // Update time every second based on the system time
}

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
    // Calculate the current time using the local system time, and adjust if we have fetched the correct time offset
    const localTime = new Date(new Date().getTime() + localTimeOffset);
    const timeString1 = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const timeString = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateString = localTime.toLocaleDateString();
    const amPm = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[1];

    // Display time, date, and period (AM/PM)
    const timelap = document.getElementById('local-time');
    const ampmlap = document.getElementById('am-pm');
    const timetab = document.getElementById('local-time-tablet');
    const ampmtab = document.getElementById('am-pm-tablet');
    const datelap = document.getElementById('local-date');
    const datetab = document.getElementById('local-date-tablet');
    const timeMob = document.getElementById('local-time-mobile');
    const ampmMob = document.getElementById('am-pm-mobile');
    const dateMob = document.getElementById('local-date-mobile');

    document.getElementById('local-time').textContent = `${timeString1}`;
    datelap.textContent = `${dateString}`;
    ampmlap.textContent = `${amPm}`;

    timetab.textContent = `${timeString1}`;
    datetab.textContent = `${dateString}`;
    ampmtab.textContent = `${amPm}`;

    timeMob.textContent = `${timeString1}`;
    dateMob.textContent = `${dateString}`;
    ampmMob.textContent = `${amPm}`;

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

displayInitialTime(); // Display the initial time immediately
