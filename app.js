// Weather App Configuration
const API_KEY = 'f3cde622940c117056f0f69b66d67e9d'; // Free tier API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Pakistani Cities Data
const pakistaniCities = [
    { name: 'Faisalabad', lat: 31.4181, lon: 72.3679 },
    { name: 'Lahore', lat: 31.5497, lon: 74.3436 },
    { name: 'Karachi', lat: 24.8607, lon: 67.0011 },
    { name: 'Islamabad', lat: 33.6844, lon: 73.0479 }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const suggestionsDropdown = document.getElementById('suggestionsDropdown');
const cityButtons = document.querySelectorAll('.city-btn');
const mainWeatherSection = document.getElementById('mainWeather');
const forecastContainer = document.getElementById('forecastContainer');

// State Management
let currentCity = 'Faisalabad';
let weatherData = {};
let forecastData = {};

// Weather Icons Mapping
const weatherIcons = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain',
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain',
    '10n': 'fas fa-cloud-moon-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog'
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    fetchWeatherData(currentCity);
}

function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    searchInput.addEventListener('input', handleSearchInput);

    // City quick access buttons
    cityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCity = btn.dataset.city;
            searchInput.value = '';
            suggestionsDropdown.classList.remove('active');
            fetchWeatherData(currentCity);
        });
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target !== searchInput && e.target !== suggestionsDropdown) {
            suggestionsDropdown.classList.remove('active');
        }
    });
}

function handleSearchInput(e) {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length === 0) {
        suggestionsDropdown.classList.remove('active');
        return;
    }

    const suggestions = pakistaniCities.filter(city =>
        city.name.toLowerCase().includes(query)
    );

    if (suggestions.length > 0) {
        displaySuggestions(suggestions);
    } else {
        suggestionsDropdown.classList.remove('active');
    }
}

function displaySuggestions(suggestions) {
    suggestionsDropdown.innerHTML = '';
    
    suggestions.forEach(city => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `<i class="fas fa-map-pin"></i> ${city.name}`;
        item.addEventListener('click', () => {
            selectCity(city.name);
        });
        suggestionsDropdown.appendChild(item);
    });

    suggestionsDropdown.classList.add('active');
}

function selectCity(cityName) {
    currentCity = cityName;
    searchInput.value = '';
    suggestionsDropdown.classList.remove('active');
    
    // Update active button
    cityButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.city === cityName) {
            btn.classList.add('active');
        }
    });

    fetchWeatherData(cityName);
}

function handleSearch() {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        selectCity(query);
    }
}

// Fetch current weather data
async function fetchWeatherData(city) {
    try {
        // Find city coordinates
        const cityData = pakistaniCities.find(c => c.name.toLowerCase() === city.toLowerCase());
        
        if (!cityData) {
            showError(`City "${city}" not found. Please use: Faisalabad, Lahore, Karachi, or Islamabad`);
            return;
        }

        // Fetch current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        weatherData = await weatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${API_KEY}`
        );

        if (!forecastResponse.ok) {
            throw new Error('Failed to fetch forecast data');
        }

        forecastData = await forecastResponse.json();

        // Update UI
        updateWeatherDisplay();
        updateForecastDisplay();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    }
}

function updateWeatherDisplay() {
    const { name, main, weather, wind, clouds, sys, visibility } = weatherData;
    const feelsLike = main.feels_like;
    const temp = Math.round(main.temp);
    const humidity = main.humidity;
    const pressure = main.pressure;
    const windSpeed = Math.round(wind.speed * 3.6); // Convert m/s to km/h
    const desc = weather[0].main;
    const iconCode = weather[0].icon;
    const uvIndex = getUVIndex(main.temp, clouds.all);
    const rainChance = getRainChance(weather[0].main);

    // Update DOM
    document.getElementById('cityName').textContent = name;
    document.getElementById('weatherDesc').textContent = desc;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('feelsLike').textContent = Math.round(feelsLike);
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('windSpeed').textContent = windSpeed;
    document.getElementById('pressure').textContent = pressure;
    document.getElementById('visibility').textContent = (visibility / 1000).toFixed(1);
    document.getElementById('uvIndex').textContent = uvIndex;
    document.getElementById('rainChance').textContent = rainChance;

    // Update weather icon
    const iconElement = document.getElementById('weatherIcon');
    iconElement.className = 'weather-icon ' + (weatherIcons[iconCode] || 'fas fa-cloud');

    // Format and display sunrise/sunset
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
}

function updateForecastDisplay() {
    const dailyForecasts = {};

    // Group forecasts by day
    forecastData.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(forecast);
    });

    // Get only the next 5 days
    const days = Object.keys(dailyForecasts).slice(0, 5);
    
    forecastContainer.innerHTML = '';

    days.forEach(date => {
        const forecasts = dailyForecasts[date];
        
        // Calculate max and min temps for the day
        const temps = forecasts.map(f => f.main.temp);
        const maxTemp = Math.round(Math.max(...temps));
        const minTemp = Math.round(Math.min(...temps));
        
        // Get the most common weather condition
        const conditions = forecasts.map(f => f.weather[0].main);
        const mainCondition = getMostCommon(conditions);
        
        // Get icon code for the main condition
        const iconCode = forecasts[0].weather[0].icon;
        const icon = weatherIcons[iconCode] || 'fas fa-cloud';

        // Format date
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });

        // Create forecast card
        const card = document.createElement('div');
        card.className = 'forecast-card glassmorphism';
        card.innerHTML = `
            <div class="forecast-date">${formattedDate}</div>
            <i class="forecast-icon ${icon}"></i>
            <div class="forecast-temp">
                <div class="forecast-max-temp">${maxTemp}°C</div>
                <div class="forecast-min-temp">${minTemp}°C</div>
            </div>
            <div class="forecast-condition">${mainCondition}</div>
        `;
        
        forecastContainer.appendChild(card);
    });
}

// Utility Functions
function getMostCommon(arr) {
    if (arr.length === 0) return 'Clear';
    
    const counts = {};
    arr.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });

    return Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
    );
}

function getUVIndex(temp, cloudiness) {
    // Simplified UV index calculation based on temperature and cloud cover
    let base = 5;
    
    if (temp > 30) base = 9;
    else if (temp > 25) base = 8;
    else if (temp > 20) base = 7;
    else if (temp > 15) base = 6;
    
    // Reduce based on cloud cover
    const cloudReduction = (cloudiness / 100) * 3;
    const uvIndex = Math.max(0, base - cloudReduction);
    
    return uvIndex.toFixed(1);
}

function getRainChance(condition) {
    // Estimate rain chance based on weather condition
    const rainConditions = {
        'Thunderstorm': 100,
        'Drizzle': 80,
        'Rain': 90,
        'Snow': 60,
        'Clear': 5,
        'Clouds': 20,
        'Mist': 30,
        'Smoke': 10,
        'Haze': 15,
        'Dust': 10,
        'Fog': 25,
        'Sand': 5,
        'Ash': 10,
        'Squall': 85,
        'Tornado': 95
    };

    return rainConditions[condition] || 30;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    mainWeatherSection.parentElement.insertBefore(errorDiv, mainWeatherSection);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    mainWeatherSection.parentElement.insertBefore(successDiv, mainWeatherSection);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Format time to 12-hour format
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Format date string
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

// Optional: Refresh weather data every 10 minutes
setInterval(() => {
    if (currentCity) {
        fetchWeatherData(currentCity);
    }
}, 600000); // 10 minutes in milliseconds
