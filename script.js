// Get IP address and location using IPify API
fetch("https://api.ipify.org?format=json")
.then(response => response.json())
.then(data => {
  const ip = data.ip;
  document.getElementById("ip").innerText = ip;
  fetch(`https://geo.ipify.org/api/v1?apiKey=at_Y91HQD1qXf6U7sKe54JI83KNhOnCc&ipAddress=${ip}`)
    .then(response => response.json())
    .then(data => {
      const location = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
      document.getElementById("location").innerText = location;
    })
    .catch(error => console.error(error));
})
.catch(error => console.error(error));

// Get operating system and browser information
const userAgent = navigator.userAgent;
const os = userAgent.match(/Windows NT (\d+\.\d+)/) ? "Windows" : 
         userAgent.match(/Mac OS X (\d+_\d+)/) ? "MacOS" :
         userAgent.match(/Linux/) ? "Linux" :
         "Phone";
const browser = userAgent.match(/Firefox\/(\d+\.\d+)/) ? "Firefox" :
              userAgent.match(/Chrome\/(\d+\.\d+)/) ? "Chrome" :
              userAgent.match(/Edge\/(\d+\.\d+)/) ? "Edge" :
              userAgent.match(/Safari\/(\d+\.\d+)/) ? "Safari" :
              "Unknown";
document.getElementById("os").innerText = os;
document.getElementById("browser").innerText = browser;

// Get screen size
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
document.getElementById("screen").innerText = `${screenWidth} x ${screenHeight}`;

// Get latitude and longitude using Geolocation API
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition(position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  document.getElementById("lat").innerText = latitude.toFixed(4);
  document.getElementById("lon").innerText = longitude.toFixed(4);
  
  // Get current time using TimezoneDB API
  const timestamp = Math.floor(Date.now() / 1000);
  fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=9FYRC14DAPR2&format=json&by=position&lat=${latitude}&lng=${longitude}&time=${timestamp}`)
    .then(response => response.json())
    .then(data => {
      const time = new Date(data.formatted);
      document.getElementById("time").innerText = time.toLocaleString();
    })
    .catch(error => console.error(error));
});
} else {
console.error("Geolocation is not supported by this browser.");
}