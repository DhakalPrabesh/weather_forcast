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
    const apiKey = 'leaked_api_key==>REMOVED'; // Replace with your API key
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
        weatherGif = 'https://media.giphy.com/media/n0Zt16UrMKNFu/giphy.gif';
    } else if (weatherCondition.includes('cloud')) {
        weatherGif = 'https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif';
    } else if (weatherCondition.includes('sun') || data.main.temp > 25) {
        weatherGif = 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif';
    } else if (weatherCondition.includes('snow')) {
        weatherGif = 'https://media.giphy.com/media/3o7TKP9lnzHvjz2RDi/giphy.gif';
    } else {
        weatherGif = 'https://media.giphy.com/media/3oEjHLzm4BCF8zfPyU/giphy.gif';
    }

    // Update weather card with data and animation
    weatherCard.innerHTML = `
        <div class="weather-animation">
            <img src="${weatherGif}" alt="Weather Animation" />
        </div>
        <h2>${data.name}</h2>
        <p><span>Temperature</span> <span>${data.main.temp}°C</span></p>
        <p><span>Condition</span> <span>${data.weather[0].description}</span></p>
        <p><span>Humidity</span> <span>${data.main.humidity}%</span></p>
        <p><span>Wind Speed</span> <span>${data.wind.speed} m/s</span></p>
    `;
    weatherCard.style.display = 'block';

    // Add this line to update animations
    updateWeatherAnimations(weatherCondition);
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

// Add this function to create rain drops
function createRainDrops() {
    const rainContainer = document.getElementById('rain-container');
    const numberOfDrops = 50;

    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = Math.random();
        rainContainer.appendChild(drop);
    }
}

// Add this to your weather display function to show/hide animations based on weather
function updateWeatherAnimations(weatherCondition) {
    const sun = document.querySelector('.sun');
    const clouds = document.querySelectorAll('.cloud');
    const rainContainer = document.getElementById('rain-container');

    // Reset all animations
    sun.style.display = 'none';
    clouds.forEach(cloud => cloud.style.display = 'none');
    rainContainer.style.display = 'none';

    // Show relevant animations based on weather
    if (weatherCondition.includes('clear')) {
        sun.style.display = 'block';
    } else if (weatherCondition.includes('cloud')) {
        clouds.forEach(cloud => cloud.style.display = 'block');
    } else if (weatherCondition.includes('rain')) {
        clouds.forEach(cloud => cloud.style.display = 'block');
        rainContainer.style.display = 'block';
        createRainDrops();
    }
}

// Initialize rain drops
createRainDrops();

// Add this function to create stars
function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 1}s`;
        starsContainer.appendChild(star);
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createStars();
});

// Update the background color based on time
function updateSkyColor() {
    document.body.style.animation = 'skyColors 30s linear infinite';
}

// Initialize the sky color animation
updateSkyColor();
