'use strict';

const API_KEY = 'fb739f60510f087a4d8a414456cb1ea7';
const CURRENT_CITY = 'Kyiv';

const widgetEl = document.querySelector('.weather-widget');
const updateBtnEl = document.querySelector('.update-btn');

async function updateWeather() {
  try {
    widgetEl.textContent = 'Loading...';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CURRENT_CITY}&appid=${API_KEY}&units=metric&lang=en`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: status - ${response.status}`);
    }

    const data = await response.json();

    widgetEl.innerHTML = `<div><img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt='weather-img'></div>
    <div><b>${CURRENT_CITY + '</b>: ' + data.weather[0].description}</div>
    <div><b>Temperature</b>: ${parseInt(data.main.temp)}°C (real feel ${parseInt(data.main.feels_like)}°C)</div>
    <div><b>Wind</b>: ${data.wind.speed} m/s</div>
    <div><b>Humidity</b>: ${data.main.humidity} %</div>
    <div><b>Pressure</b>: ${data.main.pressure} gPa</div>`;

  } catch(error) {
    widgetEl.textContent = 'Something went wrong...';
    console.error(error);
  }
}

updateBtnEl.addEventListener('click', () => {
  updateWeather();
});

updateWeather();