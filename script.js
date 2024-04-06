
function getSearchHistory() {
    const searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
}


function saveToSearchHistory(city) {
    const searchHistory = getSearchHistory();
    
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}


function displaySearchHistory() {
    const searchHistory = getSearchHistory();
    const searchHistoryElement = document.querySelector('#searchHistory');
    
    searchHistoryElement.innerHTML = '';
    
    searchHistory.forEach(city => {
        const cityElement = document.createElement('div');
        cityElement.classList.add('city');
        cityElement.textContent = city;
        searchHistoryElement.appendChild(cityElement);
    });
}


document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const city = document.querySelector('#cityInput').value;
    
    saveToSearchHistory(city);
    displaySearchHistory();
    
    const weatherData = await getWeatherData(city);
    
    if (weatherData) {
        displayCurrentWeather(weatherData);
        
        
    }
});


document.querySelector('#searchHistory').addEventListener('click', async function(event) {
    if (event.target.classList.contains('city')) {
        const selectedCity = event.target.textContent;
        
    
        async function getWeatherAndDisplay(city) {
            const weatherData = await getWeatherData(city);
            
            if (weatherData) {
                displayCurrentWeather(weatherData);
                
                
            }
        }
        
        
        await getWeatherAndDisplay(selectedCity);
    }
});



displaySearchHistory();
async function getWeatherData(city) {
    const apiKey = '8595871521bbfa3e5972d0c2f64c1f08';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}


function displayCurrentWeather(weatherData) {
    const cityElement = document.querySelector('#cityName');
    const dateElement = document.querySelector('#date');
    const iconElement = document.querySelector('#weatherIcon');
    const temperatureElement = document.querySelector('#temperature');
    const humidityElement = document.querySelector('#humidity');
    const windElement = document.querySelector('#windSpeed');

    cityElement.textContent = weatherData.name;
    dateElement.textContent = new Date(weatherData.dt * 1000).toLocaleDateString();
    iconElement.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    temperatureElement.textContent = `${weatherData.main.temp} °C`;
    humidityElement.textContent = `${weatherData.main.humidity}%`;
    windElement.textContent = `${weatherData.wind.speed} m/s`;
    
}


function displayForecast(forecastData) {
    const forecastElement = document.querySelector('#forecast');

    forecastElement.innerHTML = ''; // Clear previous forecast data

    forecastData.list.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.innerHTML = `
            <div>Date: ${new Date(item.dt * 1000).toLocaleDateString()}</div>
            <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather Icon">
            <div>Temperature: ${item.main.temp} °C</div>
            <div>Wind Speed: ${item.wind.speed} m/s</div>
            <div>Humidity: ${item.main.humidity}%</div>
        `;
        forecastElement.appendChild(forecastItem);
    });
    
}

if (weatherData) {
    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const city = document.querySelector('#cityInput').value;
    
    const weatherData = await getWeatherData(city);
    
    if (weatherData) {
        displayCurrentWeather(weatherData);
        
        
        
    }

    
    
});


document.querySelector('#searchHistory').addEventListener('click', function(event) {
    if (event.target.classList.contains('city')) {
        const selectedCity = event.target.textContent;
        
        
    }
});



