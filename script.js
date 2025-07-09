// ✅ OpenWeatherMap API Key
const apiKey = '3f5cc22518912cd563f415eb5b2b3452';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = '⚠️ Please enter a city name.';
    resultDiv.style.background = "#fff4cc";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherMain = data.weather[0].main;

      // ✅ Emoji Visuals
      let weatherVisual = "🌡️"; // Default
      if (weatherMain === "Clear") weatherVisual = "☀️";
      else if (weatherMain === "Clouds") weatherVisual = "☁️";
      else if (weatherMain === "Rain") weatherVisual = "🌧️";
      else if (weatherMain === "Thunderstorm") weatherVisual = "⛈️";
      else if (weatherMain === "Snow") weatherVisual = "❄️";
      else if (["Mist", "Fog", "Haze"].includes(weatherMain)) weatherVisual = "🌫️";

      // ✅ Weather Box Background
      let boxColor = "#ffffff";
      if (weatherMain === "Clear") boxColor = "#ffe680";
      else if (weatherMain === "Clouds") boxColor = "#d3d3d3";
      else if (weatherMain === "Rain") boxColor = "#a3c6ff";
      else if (weatherMain === "Thunderstorm") boxColor = "#6c6c6c";
      else if (weatherMain === "Snow") boxColor = "#ffffff";
      else if (["Mist", "Fog", "Haze"].includes(weatherMain)) boxColor = "#cccccc";

      // ✅ Display Weather Info
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div style="font-size: 60px;">${weatherVisual}</div>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>🌥 Weather: ${weatherMain}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      `;
      resultDiv.style.background = boxColor;

    } else {
      resultDiv.innerHTML = `<p>❌ City not found: ${data.message}</p>`;
      resultDiv.style.background = "#ffd1d1";
    }

  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = '❌ Error fetching weather data.';
    resultDiv.style.background = "#ffd1d1";
  }
}




