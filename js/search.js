let apiKey = "fb99daa273dc4b6b7c33cc53087c6f87";
let searchButton = document.querySelector(".search-button");
let searchInput = document.querySelector(".search-input");

async function search(city) {
    if (!city.trim()) {
        alert("Please enter a city name.");
        return;
    }

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        let response = await fetch(url);

        if (response.ok) {
            let data = await response.json();
            console.log(data);

            // Update the weather info on the page
            document.querySelector(".city-name").innerHTML = `${data.name}, ${data.sys.country}`;
            document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°C';
            document.querySelector(".weather-description").innerHTML = data.weather[0].description;
            document.querySelector(".humidity").innerHTML = `Humidity: ${Math.floor(data.main.humidity)}%`;
            document.querySelector(".wind").innerHTML = `Wind: ${Math.floor(data.wind.speed)} m/s`;
            document.querySelector(".pressure").innerHTML = `Pressure: ${Math.floor(data.main.pressure)} hPa`;
            document.querySelector(".sunrise").innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
            document.querySelector(".sunset").innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

            // Set weather icon based on the weather condition
            let weatherImg = document.querySelector(".weather-icon");
            switch (data.weather[0].main) {
                case "Rain":
                    weatherImg.src = "img/rain.png";
                    break;
                case "Clear":
                    weatherImg.src = "img/sun.png";
                    break;
                case "Snow":
                    weatherImg.src = "img/snow.png";
                    break;
                case "Clouds":
                    weatherImg.src = "img/cloud.png";
                    break;
                case "Mist":
                case "Fog":
                    weatherImg.src = "img/mist.png";
                    break;
                case "Haze":
                    weatherImg.src = "img/haze.png";
                    break;
                case "Thunderstorm":
                    weatherImg.src = "img/thunderstorm.png";
                    break;
                default:
                    weatherImg.src = "img/sun.png"; // Default weather icon
                    break;
            }

            // Update search history
            updateSearchHistory(city);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again later.");
    }
}

function updateSearchHistory(city) {
    // Add the searched city to the history list
    const historyList = document.querySelector(".history-list");
    const historyItem = document.createElement("li");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = `<i class="fas fa-history"></i> ${city}`;
    historyList.prepend(historyItem); // Add to the top of the list
}

// Search when button is clicked
searchButton.addEventListener("click", function () {
    const city = searchInput.value.trim();
    if (city) {
        search(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Optionally, search when "Enter" key is pressed
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            search(city);
        } else {
            alert("Please enter a city name.");
        }
    }
});
