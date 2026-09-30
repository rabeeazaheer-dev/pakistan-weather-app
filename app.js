// Weather App Configuration
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Pakistani Cities Data
const pakistaniCities = [
    { name: 'Faisalabad', latitude: 31.4181, longitude: 72.3679 },
    { name: 'Lahore', latitude: 31.5497, longitude: 74.3436 },
    { name: 'Karachi', latitude: 24.8607, longitude: 67.0011 },
    { name: 'Islamabad', latitude: 33.6844, longitude: 73.0479 }
];

// Realistic Mock Weather Data for Pakistani Cities
const mockWeatherData = {
    'Faisalabad': {
        name: 'Faisalabad',
        main: {
            temp: 32,
            feels_like: 35,
            humidity: 45,
            pressure: 1009
        },
        weather: [{ main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
        wind: { speed: 4.5 },
        clouds: { all: 35 },
        visibility: 8500,
        sys: {
            sunrise: Math.floor(Date.now() / 1000) - 21600,
            sunset: Math.floor(Date.now() / 1000) + 21600
        },
        uvIndex: 6.5,
        rainChance: 25
    },
    'Lahore': {
        name: 'Lahore',
        main: {
            temp: 34,
            feels_like: 37,
            humidity: 48,
            pressure: 1008
        },
        weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
        wind: { speed: 5.2 },
        clouds: { all: 60 },
        visibility: 7500,
        sys: {
            sunrise: Math.floor(Date.now() / 1000) - 21600,
            sunset: Math.floor(Date.now() / 1000) + 21600
        },
        uvIndex: 7.2,
        rainChance: 30
    },
    'Karachi': {
        name: 'Karachi',
        main: {
            temp: 30,
            feels_like: 32,
            humidity: 62,
            pressure: 1011
        },
        weather: [{ main: 'Clouds', description: 'few clouds', icon: '02d' }],
        wind: { speed: 6.8 },
        clouds: { all: 25 },
        visibility: 9000,
        sys: {
            sunrise: Math.floor(Date.now() / 1000) - 21600,
            sunset: Math.floor(Date.now() / 1000) + 21600
        },
        uvIndex: 7.0,
        rainChance: 20
    },
    'Islamabad': {
        name: 'Islamabad',
        main: {
            temp: 28,
            feels_like: 30,
            humidity: 52,
            pressure: 1012
        },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.2 },
        clouds: { all: 10 },
        visibility: 10000,
        sys: {
            sunrise: Math.floor(Date.now() / 1000) - 21600,
            sunset: Math.floor(Date.now() / 1000) + 21600
        },
        uvIndex: 6.0,
        rainChance: 10
    }
};

const mockForecastData = {
    'Faisalabad': {
        list: [
            { dt: Math.floor(Date.now() / 1000) + 86400, main: { temp: 33 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 172800, main: { temp: 35 }, weather: [{ main: 'Clear', icon: '01d' }] },
            { dt: Math.floor(Date.now() / 1000) + 259200, main: { temp: 34 }, weather: [{ main: 'Clouds', icon: '04d' }] },
            { dt: Math.floor(Date.now() / 1000) + 345600, main: { temp: 33 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 432000, main: { temp: 32 }, weather: [{ main: 'Clear', icon: '01d' }] }
        ]
    },
    'Lahore': {
        list: [
            { dt: Math.floor(Date.now() / 1000) + 86400, main: { temp: 35 }, weather: [{ main: 'Clouds', icon: '04d' }] },
            { dt: Math.floor(Date.now() / 1000) + 172800, main: { temp: 36 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 259200, main: { temp: 34 }, weather: [{ main: 'Clouds', icon: '04d' }] },
            { dt: Math.floor(Date.now() / 1000) + 345600, main: { temp: 35 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 432000, main: { temp: 33 }, weather: [{ main: 'Clear', icon: '01d' }] }
        ]
    },
    'Karachi': {
        list: [
            { dt: Math.floor(Date.now() / 1000) + 86400, main: { temp: 31 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 172800, main: { temp: 32 }, weather: [{ main: 'Clear', icon: '01d' }] },
            { dt: Math.floor(Date.now() / 1000) + 259200, main: { temp: 30 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 345600, main: { temp: 29 }, weather: [{ main: 'Clouds', icon: '04d' }] },
            { dt: Math.floor(Date.now() / 1000) + 432000, main: { temp: 31 }, weather: [{ main: 'Clear', icon: '01d' }] }
        ]
    },
    'Islamabad': {
        list: [
            { dt: Math.floor(Date.now() / 1000) + 86400, main: { temp: 29 }, weather: [{ main: 'Clear', icon: '01d' }] },
            { dt: Math.floor(Date.now() / 1000) + 172800, main: { temp: 30 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 259200, main: { temp: 28 }, weather: [{ main: 'Clear', icon: '01d' }] },
            { dt: Math.floor(Date.now() / 1000) + 345600, main: { temp: 27 }, weather: [{ main: 'Clouds', icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 432000, main: { temp: 29 }, weather: [{ main: 'Clear', icon: '01d' }] }
        ]
    }
};

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
let useMockData = false;

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

// Open-Meteo weather code mappings
const weatherCodeMap = {
    0: { main: 'Clear', description: 'clear sky', iconDay: '01d', iconNight: '01n' },
    1: { main: 'Mainly Clear', description: 'mainly clear', iconDay: '02d', iconNight: '02n' },
    2: { main: 'Partly Cloudy', description: 'partly cloudy', iconDay: '02d', iconNight: '02n' },
    3: { main: 'Cloudy', description: 'cloudy', iconDay: '03d', iconNight: '03n' },
    45: { main: 'Fog', description: 'foggy', iconDay: '50d', iconNight: '50n' },
    48: { main: 'Depositing Fog', description: 'heavy fog', iconDay: '50d', iconNight: '50n' },
    51: { main: 'Drizzle', description: 'light drizzle', iconDay: '09d', iconNight: '09n' },
    53: { main: 'Drizzle', description: 'moderate drizzle', iconDay: '09d', iconNight: '09n' },
    55: { main: 'Drizzle', description: 'dense drizzle', iconDay: '09d', iconNight: '09n' },
    56: { main: 'Freezing Drizzle', description: 'freezing drizzle', iconDay: '09d', iconNight: '09n' },
    57: { main: 'Freezing Drizzle', description: 'heavy freezing drizzle', iconDay: '09d', iconNight: '09n' },
    61: { main: 'Rain', description: 'light rain', iconDay: '10d', iconNight: '10n' },
    63: { main: 'Rain', description: 'moderate rain', iconDay: '10d', iconNight: '10n' },
    65: { main: 'Rain', description: 'heavy rain', iconDay: '10d', iconNight: '10n' },
    66: { main: 'Freezing Rain', description: 'light freezing rain', iconDay: '10d', iconNight: '10n' },
    67: { main: 'Freezing Rain', description: 'heavy freezing rain', iconDay: '10d', iconNight: '10n' },
    71: { main: 'Snow', description: 'light snow', iconDay: '13d', iconNight: '13n' },
    73: { main: 'Snow', description: 'moderate snow', iconDay: '13d', iconNight: '13n' },
    75: { main: 'Snow', description: 'heavy snow', iconDay: '13d', iconNight: '13n' },
    77: { main: 'Snow', description: 'snow grains', iconDay: '13d', iconNight: '13n' },
    80: { main: 'Rain Showers', description: 'light showers', iconDay: '09d', iconNight: '09n' },
    81: { main: 'Rain Showers', description: 'moderate showers', iconDay: '09d', iconNight: '09n' },
    82: { main: 'Rain Showers', description: 'violent showers', iconDay: '09d', iconNight: '09n' },
    85: { main: 'Snow Showers', description: 'light snow showers', iconDay: '13d', iconNight: '13n' },
    86: { main: 'Snow Showers', description: 'heavy snow showers', iconDay: '13d', iconNight: '13n' },
    95: { main: 'Thunderstorm', description: 'thunderstorm', iconDay: '11d', iconNight: '11n' },
    96: { main: 'Thunderstorm', description: 'thunderstorm with hail', iconDay: '11d', iconNight: '11n' },
    99: { main: 'Thunderstorm', description: 'heavy thunderstorm with hail', iconDay: '11d', iconNight: '11n' }
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
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    searchInput.addEventListener('input', handleSearchInput);

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

async function fetchWeatherData(city) {
    try {
        const cityData = pakistaniCities.find(c => c.name.toLowerCase() === city.toLowerCase());

        if (!cityData) {
            showError(`City "${city}" not found. Please use: Faisalabad, Lahore, Karachi, or Islamabad`);
            return;
        }

        const weatherUrl = `${BASE_URL}?latitude=${cityData.latitude}&longitude=${cityData.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl,weather_code,wind_speed_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=5`;

        const response = await fetch(weatherUrl, { method: 'GET' });

        if (!response.ok) {
            throw new Error('Open-Meteo request failed');
        }

        const data = await response.json();
        const current = data.current;
        const daily = data.daily;

        if (!current || !daily) {
            throw new Error('Incomplete weather payload');
        }

        const weatherCode = current.weather_code;
        const condition = weatherCodeMap[weatherCode] || weatherCodeMap[0];
        const dayIcon = current.is_day === 1 ? condition.iconDay : condition.iconNight;

        weatherData = {
            name: cityData.name,
            main: {
                temp: current.temperature_2m,
                feels_like: current.apparent_temperature,
                humidity: current.relative_humidity_2m,
                pressure: current.pressure_msl
            },
            weather: [{
                main: condition.main,
                description: condition.description,
                icon: dayIcon
            }],
            wind: { speed: current.wind_speed_10m },
            clouds: { all: getCloudEstimate(current.weather_code) },
            visibility: current.visibility || 8000,
            sys: {
                sunrise: new Date(daily.sunrise[0]).getTime() / 1000,
                sunset: new Date(daily.sunset[0]).getTime() / 1000
            },
            uvIndex: Number(daily.uv_index_max?.[0] ?? 6),
            rainChance: getRainChanceFromCode(current.weather_code)
        };

        forecastData = {
            list: daily.time.map((dateString, index) => {
                const code = daily.weather_code[index];
                const weather = weatherCodeMap[code] || weatherCodeMap[0];
                const tempMax = daily.temperature_2m_max[index];
                const tempMin = daily.temperature_2m_min[index];

                return {
                    dt: new Date(dateString).getTime() / 1000,
                    main: {
                        temp: Math.round((tempMax + tempMin) / 2)
                    },
                    weather: [{
                        main: weather.main,
                        icon: weather.iconDay
                    }]
                };
            })
        };

        useMockData = false;
        updateWeatherDisplay();
        updateForecastDisplay();
    } catch (error) {
        console.warn('Live weather fetch failed:', error.message);

        const fallbackCity = pakistaniCities.find(c => c.name.toLowerCase() === city.toLowerCase());
        if (fallbackCity && mockWeatherData[fallbackCity.name]) {
            weatherData = JSON.parse(JSON.stringify(mockWeatherData[fallbackCity.name]));
            forecastData = JSON.parse(JSON.stringify(mockForecastData[fallbackCity.name]));
            useMockData = true;
            updateWeatherDisplay();
            updateForecastDisplay();
            return;
        }

        showError('Unable to load weather data. Please try again later.');
    }
}

function updateWeatherDisplay() {
    const { name, main, weather, wind, clouds, sys, visibility } = weatherData;
    const feelsLike = main.feels_like;
    const temp = Math.round(main.temp);
    const humidity = main.humidity;
    const pressure = main.pressure;
    const windSpeed = Math.round(wind.speed * 3.6);
    const desc = weather[0].main;
    const iconCode = weather[0].icon;
    const uvIndex = Number(weatherData.uvIndex ?? getUVIndex(main.temp, clouds.all));
    const rainChance = Number(weatherData.rainChance ?? getRainChance(weather[0].main));

    document.getElementById('cityName').textContent = name;
    document.getElementById('weatherDesc').textContent = desc;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('feelsLike').textContent = Math.round(feelsLike);
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('windSpeed').textContent = windSpeed;
    document.getElementById('pressure').textContent = pressure;
    document.getElementById('visibility').textContent = (Number(visibility || 8000) / 1000).toFixed(1);
    document.getElementById('uvIndex').textContent = uvIndex.toFixed(1);
    document.getElementById('rainChance').textContent = rainChance;

    const iconElement = document.getElementById('weatherIcon');
    iconElement.className = 'weather-icon ' + (weatherIcons[iconCode] || 'fas fa-cloud');

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

    forecastData.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(forecast);
    });

    const days = Object.keys(dailyForecasts).slice(0, 5);
    forecastContainer.innerHTML = '';

    days.forEach(date => {
        const forecasts = dailyForecasts[date];
        const temps = forecasts.map(f => f.main.temp);
        const maxTemp = Math.round(Math.max(...temps));
        const minTemp = Math.round(Math.min(...temps));
        const conditions = forecasts.map(f => f.weather[0].main);
        const mainCondition = getMostCommon(conditions);
        const iconCode = forecasts[0].weather[0].icon;
        const icon = weatherIcons[iconCode] || 'fas fa-cloud';

        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });

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

function getMostCommon(arr) {
    if (arr.length === 0) return 'Clear';

    const counts = {};
    arr.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });

    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

function getCloudEstimate(weatherCode) {
    const cloudMap = {
        0: 5,
        1: 20,
        2: 45,
        3: 75,
        45: 80,
        48: 85,
        51: 65,
        53: 70,
        55: 80,
        61: 75,
        63: 82,
        65: 86,
        80: 68,
        81: 72,
        82: 78,
        95: 90
    };

    return cloudMap[weatherCode] || 30;
}

function getRainChanceFromCode(weatherCode) {
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
        return 75;
    }
    if ([0, 1, 2].includes(weatherCode)) {
        return 10;
    }
    if ([3, 45, 48].includes(weatherCode)) {
        return 25;
    }
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
        return 35;
    }
    if ([95, 96, 99].includes(weatherCode)) {
        return 90;
    }
    return 15;
}

function getUVIndex(temp, cloudiness) {
    let base = 5;

    if (temp > 30) base = 9;
    else if (temp > 25) base = 8;
    else if (temp > 20) base = 7;
    else if (temp > 15) base = 6;

    const cloudReduction = (cloudiness / 100) * 3;
    const uvIndex = Math.max(0, base - cloudReduction);

    return uvIndex;
}

function getRainChance(condition) {
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
        'Tornado': 95,
        'Partly Cloudy': 15,
        'Mainly Clear': 10,
        'Cloudy': 25,
        'Foggy': 30
    };

    return rainConditions[condition] || 30;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    mainWeatherSection.parentElement.insertBefore(errorDiv, mainWeatherSection);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;

    mainWeatherSection.parentElement.insertBefore(successDiv, mainWeatherSection);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

setInterval(() => {
    if (currentCity) {
        fetchWeatherData(currentCity);
    }
}, 600000);