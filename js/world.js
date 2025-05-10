let apiKey = "fb99daa273dc4b6b7c33cc53087c6f87";
let searchinput = document.querySelector(".searchinput");
let box = document.querySelector(".box");
let normalMessage = document.querySelector(".normal-message");
let errorMessage = document.querySelector(".error-message");
let addedMessage = document.querySelector(".added-message");

// Function to get the date
let date = new Date().getDate();
let months_name = [
  "January", "February", "March", "April", "May", "June", "July", "August", 
  "September", "October", "November", "December"
];
let months = new Date().getMonth();
let year = new Date().getFullYear();

let FullDate = document.querySelector(".date");
FullDate.innerHTML = `${months_name[months]} ${date}, ${year}`;

// Weather info
async function city(cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;
  
  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      console.log(data);

      // Check if the city weather box already exists
      let existingWeatherBox = document.querySelector(`.weather-box[data-city="${data.name}"]`);
      if (existingWeatherBox) {
        console.log(`${data.name} weather data already displayed`);
        return; // Don't add the same city again
      }

      // Creating and appending new weather box
      let cityBox = document.querySelector(".city-box");
      
      let weatherBox = document.createElement("div");
      weatherBox.className = "weather-box";
      weatherBox.setAttribute("data-city", data.name); // Set data attribute for checking

      let nameDiv = document.createElement("div");
      nameDiv.className = "name";

      let cityElement = document.createElement("div");
      cityElement.className = "city-name city";
      cityElement.innerHTML = data.name;

      let tempElement = document.createElement("div");
      tempElement.className = "weather-temp temp";
      tempElement.innerHTML = Math.floor(data.main.temp) + "°";

      let weatherIconDiv = document.createElement("div");
      weatherIconDiv.className = "weather-icon";

      let weatherImg = document.createElement("img");
      weatherImg.className = "weather";
      weatherImg.src = getWeatherIcon(data.weather[0].main); // Get weather icon

      weatherIconDiv.appendChild(weatherImg);
      nameDiv.appendChild(cityElement);
      nameDiv.appendChild(tempElement);
      weatherBox.appendChild(nameDiv);
      weatherBox.appendChild(weatherIconDiv);
      cityBox.appendChild(weatherBox);

      return weatherBox;
    } else {
      throw new Error("City not found or API request failed.");
    }
  } catch (error) {
    console.error("Error:", error);
    normalMessage.style.display = "none";
    addedMessage.style.display = "none";
    errorMessage.style.display = "block";
  }
}

// Get weather icon based on weather condition
function getWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case "Rain": return "img/rain.png";
    case "Clear":
    case "Clear Sky": return "img/sun.png";
    case "Snow": return "img/snow.png";
    case "Clouds":
    case "Smoke": return "img/cloud.png";
    case "Mist":
    case "Fog": return "img/mist.png";
    case "Haze": return "img/haze.png";
    case "Thunderstorm": return "img/thunderstorm.png";
    default: return "img/sun.png"; // Default icon
  }
}

// Add section toggle
let section = document.querySelector(".add-section");
let navBtn = document.querySelector(".button");
let navIcon = document.querySelector(".btn-icon");

navBtn.addEventListener("click", () => {
  if (section.style.top === "-60rem") {
    section.style.top = "100px";
    navIcon.className = "fa-solid fa-circle-xmark";
  } else {
    section.style.top = "-60rem";
    navIcon.className = "fa-solid fa-circle-plus";
  }
});

// Search input handling
searchinput.addEventListener("keydown", async function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    const weatherInfo = await city(searchinput.value);
    if (weatherInfo) {
      normalMessage.style.display = "none";
      errorMessage.style.display = "none";
      addedMessage.style.display = "block";
    } else {
      normalMessage.style.display = "none";
      errorMessage.style.display = "block";
      addedMessage.style.display = "none";
    }
  }
});

// Adding default cities
city("London");
city("Paris");
city("New York");
city("Mumbai");
city("Tokyo");
