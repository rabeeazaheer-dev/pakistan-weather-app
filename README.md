# 🌤️ Pakistan Weather App

A beautiful, modern weather web application featuring Pakistan's major cities with a stunning dark glassmorphism design, real-time weather data, 5-day forecasts, and an intelligent search feature.

![Pakistan Weather App](https://img.shields.io/badge/Weather-App-blue?style=flat-square&logo=weather)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

---

## ✨ Features

### 🌍 Supported Cities
- **Faisalabad** - Industrial hub of Pakistan
- **Lahore** - Heart of Punjab
- **Karachi** - Business capital
- **Islamabad** - Capital city

### 🎨 Design Features
- **Dark Glassmorphism UI** - Modern, sleek interface with frosted glass effect
- **Responsive Design** - Perfectly adapts to desktop, tablet, and mobile devices
- **Smooth Animations** - Elegant transitions and fade-in effects
- **Gradient Accents** - Beautiful gradient text and hover effects
- **Real-time Updates** - Auto-refresh every 10 minutes

### 🌡️ Current Weather Metrics
- Current temperature and "feels like" temperature
- Weather condition with dynamic icons
- **Humidity** - Current moisture level
- **Wind Speed** - Speed in km/h
- **Atmospheric Pressure** - In millibars
- **Visibility** - In kilometers
- **UV Index** - Estimated based on temperature and cloud cover
- **Rain Probability** - Chance of precipitation
- **Sunrise & Sunset Times** - Daily sun timing

### 📅 5-Day Forecast
- Daily maximum and minimum temperatures
- Weather condition icons
- Weather description
- Grouped by calendar days

### 🔍 Search Features
- **Smart City Search** - Autocomplete suggestions for Pakistani cities
- **Quick Access Buttons** - One-click access to major cities
- **Search Dropdown** - Dropdown suggestions while typing
- **Enter Key Support** - Search by pressing Enter

### 🔄 Auto-Refresh
- Weather data updates automatically every 10 minutes
- No manual refresh needed
- Always shows latest weather information

---

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with glassmorphism effects
- **Vanilla JavaScript** - Pure JS, no frameworks
- **OpenWeatherMap API** - Real-time weather data
- **Font Awesome** - Weather and UI icons

---

## 📋 API Information

This app uses the **OpenWeatherMap API** (free tier).

### API Endpoints Used
- **Current Weather**: `/data/2.5/weather`
- **5-Day Forecast**: `/data/2.5/forecast`

### Getting Your Own API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key from your dashboard
4. Replace `API_KEY` in `app.js` with your own key

---

## 📂 File Structure

```
pakistan-weather-app/
├── index.html       # Main HTML structure
├── styles.css       # Styling and glassmorphism effects
├── app.js          # Weather logic and API integration
└── README.md       # This file
```

### index.html
- Semantic HTML5 structure
- Sections for header, search, quick cities, main weather, forecast
- Font Awesome icon integration
- Responsive meta viewport

### styles.css
- CSS variables for theming
- Glassmorphism effect implementation
- Grid-based responsive layouts
- Smooth animations and transitions
- Mobile-first responsive design
- Custom scrollbar styling

### app.js
- OpenWeatherMap API integration
- Weather data fetching and parsing
- Real-time DOM updates
- Search functionality with suggestions
- Forecast data processing
- Error handling and user feedback
- Auto-refresh mechanism

---

## 🚀 How to Use

### 1. **Clone the Repository**
```bash
git clone https://github.com/rabeeazaheer-dev/pakistan-weather-app.git
cd pakistan-weather-app
```

### 2. **Open in Browser**
Simply open `index.html` in your web browser:
```bash
open index.html
# or
start index.html
```

### 3. **View Weather**
- App loads with **Faisalabad** as default city
- Click quick access buttons for other cities
- Use search to find and select a city
- Weather updates in real-time

### 4. **Search Cities**
- Type city name in search box
- Select from dropdown suggestions
- Press Enter or click search button
- Weather data loads automatically

---

## 🎯 Features in Detail

### Dark Glassmorphism Design
The app features a modern dark theme with:
- Semi-transparent glass-like cards
- Backdrop blur effects
- Gradient text and buttons
- Smooth hover animations
- Purple, blue, and orange accent colors

### Weather Metrics Grid
Six key metrics displayed in an organized grid:
- 💧 Humidity
- 💨 Wind Speed
- 🔘 Pressure
- 👁️ Visibility
- ☀️ UV Index
- ☔ Rain Chance

### Responsive Breakpoints
- **Desktop** (1024px+) - Full layout with grid
- **Tablet** (768px-1023px) - Adjusted grid and spacing
- **Mobile** (480px-767px) - 2-column metrics
- **Small Mobile** (<480px) - Single column layout

---

## 🔧 Customization

### Change API Key
Edit line 2 in `app.js`:
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

### Add More Cities
Edit the `pakistaniCities` array in `app.js`:
```javascript
const pakistaniCities = [
    { name: 'Faisalabad', lat: 31.4181, lon: 72.3679 },
    { name: 'Lahore', lat: 31.5497, lon: 74.3436 },
    { name: 'Karachi', lat: 24.8607, lon: 67.0011 },
    { name: 'Islamabad', lat: 33.6844, lon: 73.0479 },
    // Add more cities here
];
```

### Modify Auto-Refresh Interval
Edit line at the end of `app.js`:
```javascript
setInterval(() => {
    if (currentCity) {
        fetchWeatherData(currentCity);
    }
}, 600000); // Change this value (milliseconds)
```

### Customize Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-dark: #0f0f1e;
    --accent-blue: #00d4ff;
    --accent-purple: #a855f7;
    --accent-orange: #ff6b35;
    /* Modify as needed */
}
```

---

## 📱 Responsive Design

### Mobile Optimization
✅ Fully responsive on all devices
✅ Touch-friendly buttons and inputs
✅ Optimized font sizes for readability
✅ Flexible grid layouts
✅ Smooth scrolling experience

### Browser Support
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🐛 Troubleshooting

### Issue: Weather data not loading
**Solution**: Check your internet connection and API key validity

### Issue: Search suggestions not appearing
**Solution**: Make sure you're typing a city name from the list (Faisalabad, Lahore, Karachi, Islamabad)

### Issue: Icons not displaying
**Solution**: Ensure Font Awesome CDN link is active and internet connection is stable

### Issue: Forecast not showing
**Solution**: Wait for API response - forecasts take longer to load. Check browser console for errors.

---

## 📊 Weather Data Provided by

- **OpenWeatherMap** - Real-time weather data and forecasts
- **Font Awesome** - Icon library for weather symbols

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Rabeea Zaheer**
- GitHub: [@rabeeazaheer-dev](https://github.com/rabeeazaheer-dev)
- Email: rabeeazaheer9@gmail.com

---

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Font Awesome for beautiful icons
- Inspired by modern glassmorphism design trends
- Dedicated to Pakistan and its weather enthusiasts

---

## 📈 Future Enhancements

- [ ] Add more Pakistani cities
- [ ] Implement local storage for favorite cities
- [ ] Add weather alerts and warnings
- [ ] Hourly forecast view
- [ ] Weather maps integration
- [ ] Historical weather data
- [ ] PWA support for offline use
- [ ] Multi-language support

---

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS techniques (glassmorphism, gradients)
- Vanilla JavaScript (no frameworks)
- REST API integration
- Responsive web design
- DOM manipulation
- Event handling
- Error handling
- State management

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify API key and internet connection
4. Open an issue on GitHub

---

## 🌟 If You Like This Project

- ⭐ Star the repository
- 🔄 Share with friends
- 💬 Leave feedback
- 🐛 Report bugs
- ✨ Suggest improvements

---

**Enjoy tracking Pakistan's weather with style! 🌤️✨**
