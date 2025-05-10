let apiKey = "fb99daa273dc4b6b7c33cc53087c6f87";

navigator.geolocation.getCurrentPosition(async function (position) {
    try {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        
        // Get city name based on latitude and longitude
        let map = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`);
        let userdata = await map.json();
        let loc = userdata[0].name;
        
        // Fetch weather details using the city name
        let url = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&`;
        let respond = await fetch(url + `q=${loc}&` + `appid=${apiKey}`);
        let data = await respond.json();

        console.log(data);
        
        // Display current weather info
        let cityMain = document.getElementById("city-name");
        let cityTemp = document.getElementById("metric");
        let weatherMain = document.querySelectorAll("#weather-main");
        let mainHumidity = document.getElementById("humidity");
        let mainFeel = document.getElementById("feels-like");
        let weatherImg = document.querySelector(".weather-icon");
        let weatherImgs = document.querySelector(".weather-icons");
        let tempMinWeather = document.getElementById("temp-min-today");
        let tempMaxWeather = document.getElementById("temp-max-today");

        cityMain.innerHTML = data.city.name;
        cityTemp.innerHTML = Math.floor(data.list[0].main.temp) + "°";
        weatherMain[0].innerHTML = data.list[0].weather[0].description;
        weatherMain[1].innerHTML = data.list[0].weather[0].description;
        mainHumidity.innerHTML = Math.floor(data.list[0].main.humidity);
        mainFeel.innerHTML = Math.floor(data.list[0].main.feels_like);
        tempMinWeather.innerHTML = Math.floor(data.list[0].main.temp_min) + "°";
        tempMaxWeather.innerHTML = Math.floor(data.list[0].main.temp_max) + "°";

        let weatherCondition = data.list[0].weather[0].main.toLowerCase();
        
        // Set weather icon based on condition
        switch (weatherCondition) {
            case "rain":
                weatherImg.src = "img/rain.png";
                weatherImgs.src = "img/rain.png";
                break;
            case "clear":
            case "clear sky":
                weatherImg.src = "img/sun.png";
                weatherImgs.src = "img/sun.png";
                break;
            case "snow":
                weatherImg.src = "img/snow.png";
                weatherImgs.src = "img/snow.png";
                break;
            case "clouds":
            case "smoke":
                weatherImg.src = "img/cloud.png";
                weatherImgs.src = "img/cloud.png";
                break;
            case "mist":
            case "fog":
                weatherImg.src = "img/mist.png";
                weatherImgs.src = "img/mist.png";
                break;
            case "haze":
                weatherImg.src = "img/haze.png";
                weatherImgs.src = "img/haze.png";
                break;
            case "thunderstorm":
                weatherImg.src = "img/thunderstorm.png";
                weatherImgs.src = "img/thunderstorm.png";
                break;
            default:
                weatherImg.src = "img/sun.png";
                weatherImgs.src = "img/sun.png";
                break;
        }

        // Fetch and display 5-day forecast data
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city.name}&appid=${apiKey}&units=metric`;

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                console.log("5-Day Forecast for", data.city.name);
                displayForecast(data);
            })
            .catch(error => {
                console.error("Error fetching forecast:", error);
            });

        function displayForecast(data) {
            const dailyForecasts = {};
            let forecast = document.getElementById('future-forecast-box');
            let forecastbox = "";

            data.list.forEach(item => {
                const date = item.dt_txt.split(' ')[0];
                let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                let day = new Date(date).getDay();

                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        day_today: dayName[day],
                        temperature: Math.floor(item.main.temp) + "°",
                        description: item.weather[0].description,
                        weatherImg: item.weather[0].main.toLowerCase()
                    };
                }
            });

            for (const date in dailyForecasts) {
                let imgSrc = "";

                switch (dailyForecasts[date].weatherImg) {
                    case "rain":
                        imgSrc = "img/rain.png";
                        break;
                    case "clear":
                    case "clear sky":
                        imgSrc = "img/sun.png";
                        break;
                    case "snow":
                        imgSrc = "img/snow.png";
                        break;
                    case "clouds":
                    case "smoke":
                        imgSrc = "img/cloud.png";
                        break;
                    case "mist":
                        imgSrc = "img/mist.png";
                        break;
                    case "haze":
                        imgSrc = "img/haze.png";
                        break;
                    case "thunderstorm":
                        imgSrc = "img/thunderstorm.png";
                        break;
                    default:
                        imgSrc = "img/sun.png";
                }

                forecastbox += ` 
                <div class="weather-forecast-box">
                    <div class="day-weather">
                        <span>${dailyForecasts[date].day_today}</span>
                    </div>
                    <div class="weather-icon-forecast">
                        <img src="${imgSrc}" />
                    </div>
                    <div class="temp-weather">
                        <span>${dailyForecasts[date].temperature}</span>
                    </div>
                    <div class="weather-main-forecast">${dailyForecasts[date].description}</div>
                </div>`;
            }

            forecast.innerHTML = forecastbox;
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}, 
() => {
    // Handle location retrieval error
    alert("Please turn on your location and refresh the page.");
});
