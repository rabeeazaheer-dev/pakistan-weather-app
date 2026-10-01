// Weather code to emoji mapping
const getWeatherEmoji = (code) => {
    if (code === 0 || code === 1) return '☀️'; // Clear, Mainly clear
    if (code === 2) return '⛅'; // Partly cloudy
    if (code === 3 || code === 45 || code === 48) return '☁️'; // Overcast, Foggy
    if (code >= 51 && code <= 67) return '🌧️'; // Drizzle, Rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code === 80 || code === 81 || code === 82) return '🌦️'; // Rain showers
    if (code === 85 || code === 86) return '🌨️'; // Snow showers
    if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
    return '🌤️';
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const suggestionsDropdown = document.getElementById('suggestionsDropdown');

let suggestionsCache = {};
let currentSuggestions = [];

searchInput.addEventListener('input', handleSearchInput);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
    }
});
searchBtn.addEventListener('click', handleSearch);

document.addEventListener('click', (e) => {
    if (e.target !== searchInput && !e.target.closest('.suggestions-dropdown')) {
        suggestionsDropdown.classList.remove('active');
    }
});

async function handleSearchInput(e) {
    const query = searchInput.value;
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
        suggestionsDropdown.classList.remove('active');
        currentSuggestions = [];
        return;
    }

    try {
        if (suggestionsCache[trimmedQuery]) {
            currentSuggestions = suggestionsCache[trimmedQuery];
            displaySuggestions(currentSuggestions);
            return;
        }

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmedQuery)}&count=5&language=en&format=json`
        );

        if (!response.ok) throw new Error('Geocoding API failed');

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            suggestionsCache[trimmedQuery] = data.results;
            currentSuggestions = data.results;
            displaySuggestions(data.results);
        } else {
            currentSuggestions = [];
            suggestionsDropdown.classList.remove('active');
        }
    } catch (error) {
        console.error('Search error:', error);
        suggestionsDropdown.classList.remove('active');
    }
}

function displaySuggestions(results) {
    suggestionsDropdown.innerHTML = '';

    results.forEach((result) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';

        let locationName = result.name;
        if (result.admin1) locationName += `, ${result.admin1}`;
        if (result.country) locationName += `, ${result.country}`;

        item.innerHTML = `<i class="fas fa-map-pin"></i> ${locationName}`;
        item.addEventListener('click', () => selectLocation(result));
        suggestionsDropdown.appendChild(item);
    });

    suggestionsDropdown.classList.add('active');
}

function selectLocation(location) {
    let displayName = location.name;
    if (location.admin1) displayName += `, ${location.admin1}`;
    searchInput.value = displayName;
    suggestionsDropdown.classList.remove('active');

    fetchWeatherData(location.latitude, location.longitude, displayName);
}

async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    suggestionsDropdown.classList.remove('active');

    if (currentSuggestions.length > 0) {
        selectLocation(currentSuggestions[0]);
        return;
    }

    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            selectLocation(data.results[0]);
        } else {
            alert('Location not found. Please try another search.');
        }
    } catch (err) {
        console.error(err);
        alert('Error finding location.');
    }
}

async function fetchWeatherData(latitude, longitude, cityName) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl,weather_code,wind_speed_10m,visibility&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,precipitation_sum,uv_index_max&timezone=auto&forecast_days=7`;

        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Weather API failed');

        const data = await response.json();
        const current = data.current;
        const daily = data.daily;
        const hourly = data.hourly;

        if (!current || !daily || !hourly) throw new Error('Incomplete weather data');

        updateWeatherDisplay(cityName, current, daily);
        updateHourlyDisplay(hourly, current, daily);
        updateForecastDisplay(daily);
    } catch (error) {
        console.error('Weather fetch error:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

function updateWeatherDisplay(cityName, current, daily) {
    const weatherCode = current.weather_code;
    const emoji = getWeatherEmoji(weatherCode);

    const getWeatherDescription = (code) => {
        if (code === 0) return 'Clear sky';
        if (code === 1) return 'Mainly clear';
        if (code === 2) return 'Partly cloudy';
        if (code === 3) return 'Overcast';
        if (code === 45 || code === 48) return 'Foggy';
        if (code >= 51 && code <= 67) return 'Rainy';
        if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'Snowy';
        if (code >= 80 && code <= 82) return 'Rain showers';
        if (code >= 95 && code <= 99) return 'Thunderstorm';
        return 'Weather';
    };

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('weatherDesc').textContent = getWeatherDescription(weatherCode);
    document.getElementById('weatherIcon').textContent = emoji;

    document.getElementById('temperature').textContent = Math.round(current.temperature_2m);
    document.getElementById('feelsLike').textContent = Math.round(current.apparent_temperature);

    document.getElementById('humidity').textContent = current.relative_humidity_2m;
    document.getElementById('windSpeed').textContent = Math.round(current.wind_speed_10m);
    document.getElementById('pressure').textContent = Math.round(current.pressure_msl);

    const visibility = current.visibility ? Math.round(current.visibility / 1000) : 10;
    document.getElementById('visibility').textContent = visibility;

    document.getElementById('uvIndex').textContent = daily.uv_index_max[0]
        ? (Math.round(daily.uv_index_max[0] * 10) / 10).toFixed(1)
        : 'N/A';

    let rainChanceToday = 0;
    if (daily.precipitation_probability_max && daily.precipitation_probability_max[0] !== undefined) {
        rainChanceToday = daily.precipitation_probability_max[0];
    } else if (daily.precipitation_sum && daily.precipitation_sum[0] > 0) {
        rainChanceToday = Math.min(Math.round(daily.precipitation_sum[0] * 20), 100);
    }
    document.getElementById('rainChance').textContent = rainChanceToday;

    const formatTime = (timeStr) => {
        const date = new Date(timeStr);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    document.getElementById('sunrise').textContent = formatTime(daily.sunrise[0]);
    document.getElementById('sunset').textContent = formatTime(daily.sunset[0]);
}

// 24 Hours Forecast Update Logic (First card is "Now", followed by live next hours)
function updateHourlyDisplay(hourly, current, daily) {
    const hourlyContainer = document.getElementById('hourlyContainer');
    hourlyContainer.innerHTML = '';

    const now = new Date();
    const currentHourIndex = hourly.time.findIndex(timeStr => new Date(timeStr) >= now);
    const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

    // First card - "Now"
    const nowTemp = Math.round(current.temperature_2m);
    const nowEmoji = getWeatherEmoji(current.weather_code);
    let nowRain = (hourly.precipitation_probability && hourly.precipitation_probability[startIndex]) !== undefined 
        ? hourly.precipitation_probability[startIndex] 
        : (daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0);

    const nowCard = document.createElement('div');
    nowCard.className = 'hourly-card glassmorphism active-now';
    nowCard.innerHTML = `
        <div class="hourly-time" style="color: #0284c7; font-weight: 800;">Now</div>
        <div class="hourly-icon">${nowEmoji}</div>
        <div class="hourly-temp">${nowTemp}°C</div>
        <div class="hourly-rain"><i class="fas fa-droplet"></i> ${nowRain}%</div>
    `;
    hourlyContainer.appendChild(nowCard);

    // Remaining 23 hours
    for (let i = startIndex + 1; i < startIndex + 24 && i < hourly.time.length; i++) {
        const date = new Date(hourly.time[i]);
        const timeFormatted = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
        const temp = Math.round(hourly.temperature_2m[i]);
        const emoji = getWeatherEmoji(hourly.weather_code[i]);
        const rainProb = hourly.precipitation_probability ? hourly.precipitation_probability[i] : 0;

        const card = document.createElement('div');
        card.className = 'hourly-card glassmorphism';
        card.innerHTML = `
            <div class="hourly-time">${timeFormatted}</div>
            <div class="hourly-icon">${emoji}</div>
            <div class="hourly-temp">${temp}°C</div>
            <div class="hourly-rain"><i class="fas fa-droplet"></i> ${rainProb}%</div>
        `;
        hourlyContainer.appendChild(card);
    }
}

// 7-Day Forecast Cards Logic
function updateForecastDisplay(daily) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const date = new Date(daily.time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const weatherCode = daily.weather_code[i];
        const emoji = getWeatherEmoji(weatherCode);

        let rainChance = 0;
        if (daily.precipitation_probability_max && daily.precipitation_probability_max[i] !== undefined) {
            rainChance = daily.precipitation_probability_max[i];
        } else if (daily.precipitation_sum && daily.precipitation_sum[i] > 0) {
            rainChance = Math.min(Math.round(daily.precipitation_sum[i] * 20), 100);
        }

        const card = document.createElement('div');
        card.className = 'forecast-card glassmorphism';
        card.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <div class="forecast-icon">${emoji}</div>
            <div class="forecast-temp">
                <span class="forecast-max-temp">${maxTemp}°</span>
                <span class="forecast-min-temp">${minTemp}°</span>
            </div>
            <div class="forecast-rain-chance">
                <i class="fas fa-droplet"></i> ${rainChance}%
            </div>
        `;

        forecastContainer.appendChild(card);
    }
}

window.addEventListener('load', () => {});
