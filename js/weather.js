const baseUrl = 'https://www.7timer.info/bin/api.pl';  
const apiUrl = baseUrl + '?lon=23.72&lat=37.98&product=civil&output=json';

const weatherIcons = {
    'clearday': 'icons/about_civil_clear.png', 
    'clearnight': 'icons/about_civil_clear.png',  
    'pcloudyday': 'icons/about_civil_pcloudy.png', 
    'pcloudynight': 'icons/about_civil_pcloudy.png',
    'mcloudyday': 'icons/about_civil_mcloudy.png', 
    'mcloudynight': 'icons/about_civil_mcloudy.png',
    'cloudyday': 'icons/about_civil_cloudy.png',   
    'cloudynight': 'icons/about_civil_cloudy.png', 
    'rain': 'icons/about_civil_rain.png',
    'lightrainday': 'icons/about_civil_lightrain.png', 
    'lightrainnight': 'icons/about_civil_lightrain.png',  
    'oshowerday': 'icons/about_civil_oshower.png',
    'oshowernight': 'icons/about_civil_oshower.png',
    'ishowerday': 'icons/about_civil_ishower.png',
    'ishowernight': 'icons/about_civil_ishower.png',
    'lightsnow': 'icons/about_civil_lightsnow.png',
    'snow': 'icons/about_civil_snow.png',
    'rainsnow': 'icons/about_civil_rainsnow.png',
    'tsday': 'icons/about_civil_tstorm.png',
    'tsnight': 'icons/about_civil_tstorm.png',
    'tsrain': 'icons/about_civil_tsrain.png',
    'fog': 'icons/about_civil_fog.png',
    'windy': 'icons/about_civil_windy.png',
    'default': 'icons/about_civil_default.png',
    'humidday': 'icons/about_civil_humidity.png',
    'humidnight': 'icons/about_civil_humidity.png'  
};

document.getElementById("city-selector").addEventListener("change", function() {
    this.blur(); 
});

document.getElementById('city-selector').addEventListener('change', async (event) => {
    const value = event.target.value;
    const weatherResults = document.getElementById('weather-results');
    weatherResults.innerHTML = '';

    if (!value) return;

    const [lat, lon] = value.split(',');
    try {
        const response = await fetch(`${baseUrl}?lon=${lon}&lat=${lat}&product=civil&output=json`);
        const data = await response.json();

        console.log("Full API Response:", data);

        if (data.dataseries) {
            displayWeather(data.dataseries.slice(0, 7)); 
        } else {
            console.error('Invalid API response format');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});

function displayWeather(weatherData) {
    const weatherResults = document.getElementById('weather-results');

    const temperatures = weatherData.map(day => day.temp2m);
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);

    console.log("Temperatura Maksimale:", maxTemp);
    console.log("Temperatura Minimale:", minTemp);

    weatherData.forEach((day, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        const weatherBlock = document.createElement('div');
        weatherBlock.className = 'weather-block';

        const weatherCondition = day.weather.toLowerCase().replace(/\s/g, '');
        const weatherIcon = weatherIcons[weatherCondition] || 'icons/about_civil_default.png';

        console.log(`Weather condition received: ${day.weather}, Mapped Key: ${weatherCondition}, Icon: ${weatherIcon}`);

        weatherBlock.innerHTML = `
            <h3>${date.toDateString().slice(0, 10)}</h3>
            <div class="weather-img-container"><img class="weather-icon-img" src="${weatherIcon}" alt="Weather Icon"></div>
            <p><strong>${day.weather.toUpperCase()}</strong></p>
            <p>Temp: ${day.temp2m}°C</p>
           
        `;

        weatherResults.appendChild(weatherBlock);
    });

}
