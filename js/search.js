let apiKey = "fb99daa273dc4b6b7c33cc53087c6f87";
let searchinput = document.querySelector(`.searchinput`);

async function search(city, state = '', country = '') {
    if (!city.trim()) {
        // Handle empty input case
        alert("Please enter a city name.");
        return;
    }

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${state},${country}&appid=${apiKey}`;
        let response = await fetch(url);

        if (response.ok) {
            let data = await response.json();
            console.log(data);

            let box = document.querySelector(".return");
            box.style.display = "block";

            let message = document.querySelector(".message");
            message.style.display = "none";

            let errormessage = document.querySelector(".error-message");
            errormessage.style.display = "none";

            let weatherImg = document.querySelector(".weather-img");
            document.querySelector(".city-name").innerHTML = data.name;
            document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
            document.querySelector(".wind").innerHTML = Math.floor(data.wind.speed) + " m/s";
            document.querySelector(".pressure").innerHTML = Math.floor(data.main.pressure) + " hPa";
            document.querySelector('.humidity').innerHTML = Math.floor(data.main.humidity) + "%";
            document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            document.querySelector(".sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            // Set weather icon based on weather conditions
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
                case "Smoke":
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
        } else {
            // Handle errors such as city not found
            let box = document.querySelector(".return");
            box.style.display = "none";

            let message = document.querySelector(".message");
            message.style.display = "none";

            let errormessage = document.querySelector(".error-message");
            errormessage.style.display = "block";
        }
    } catch (error) {
        // Catch any network errors or other issues
        console.error("Error fetching weather data:", error);
        let box = document.querySelector(".return");
        box.style.display = "none";

        let message = document.querySelector(".message");
        message.style.display = "none";

        let errormessage = document.querySelector(".error-message");
        errormessage.style.display = "block";
    }
}

searchinput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        search(searchinput.value.trim()); // Ensure the input is trimmed before searching
        console.log("Search triggered");
    }
});
