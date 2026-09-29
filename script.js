const apiKey = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pl&q=";

const searchInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.querySelector('.weather-info');
const errorMsg = document.querySelector('.error-msg');

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            errorMsg.style.display = 'block';
            weatherInfo.style.display = 'none';
            return;
        }

        const data = await response.json();
        
        document.getElementById('city-name').innerHTML = data.name;
        document.getElementById('temperature').innerHTML = Math.round(data.main.temp);
        document.getElementById('description').innerHTML = data.weather[0].description;
        document.getElementById('humidity').innerHTML = data.main.humidity + "%";
        document.getElementById('wind').innerHTML = data.wind.speed + " km/h";

        weatherInfo.style.display = 'block';
        errorMsg.style.display = 'none';
        
    } catch (error) {
        console.error("Coś poszło nie tak:", error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchInput.value;
    if(city !== "") {
        checkWeather(city);
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value;
        if(city !== "") {
            checkWeather(city);
        }
    }
});