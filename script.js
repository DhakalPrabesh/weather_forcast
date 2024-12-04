// Theme Toggle
document.getElementById('theme-toggle')?.addEventListener('click', function () {
    document.body.classList.toggle('dark');
});

// Search Button Event Listener
document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Fetch Weather Data
async function fetchWeatherData(city) {
    const apiKey = '3a4cb45083d2177ef4355c5100f965ee'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Display Weather Data with Animation GIF
function displayWeather(data) {
    const weatherCard = document.getElementById('weather-card');
    const weatherCondition = data.weather[0].main.toLowerCase();

    // Determine GIF based on weather condition
    let weatherGif;
    if (weatherCondition.includes('rain')) {
        weatherGif = 'https://media.giphy.com/media/n0Zt16UrMKNFu/giphy.gif'; // Rain GIF
    } else if (weatherCondition.includes('cloud')) {
        weatherGif = 'https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif'; // Cloudy GIF
    } else if (weatherCondition.includes('sun') || data.main.temp > 25) {
        weatherGif = 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif'; // Sunny GIF
    } else if (weatherCondition.includes('snow')) {
        weatherGif = 'https://media.giphy.com/media/3o7TKP9lnzHvjz2RDi/giphy.gif'; // Snow GIF
    } else {
        weatherGif = 'https://media.giphy.com/media/3oEjHLzm4BCF8zfPyU/giphy.gif'; // Default weather GIF
    }

    // Update weather card with data and animation
    weatherCard.innerHTML = `
        <img src="${weatherGif}" alt="Weather Animation" style="width: 100%; border-radius: 20px; margin-bottom: 1rem;" />
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    weatherCard.style.display = 'block'; // Make the card visible
}

// Digital Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('digital-clock').innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// City Suggestions
const cities = ["London", "New York", "Tokyo", "Paris", "Berlin", "Sydney", "Toronto"];
const cityInput = document.getElementById('city-input');
const suggestionsContainer = document.getElementById('suggestions-container');

cityInput.addEventListener('input', function () {
    const inputValue = cityInput.value.toLowerCase();
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (inputValue) {
        const filteredCities = cities.filter(city => city.toLowerCase().includes(inputValue));
        filteredCities.forEach(city => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = city;
            suggestionItem.addEventListener('click', function () {
                cityInput.value = city; // Set input value to selected city
                suggestionsContainer.innerHTML = ''; // Clear suggestions
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
    }
});
