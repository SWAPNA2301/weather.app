const apiKey = "6400b1faeebeae98226fa1c9dc24440e";


async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherBox = document.getElementById("weatherInfo");

  if (!city) {
    weatherBox.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    `;

    weatherBox.innerHTML = weatherHTML;
  } catch (error) {
    weatherBox.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}
