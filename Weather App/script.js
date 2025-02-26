document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_key = "447f774e3d38f5830c5c2fb837db265d";

  if (!getWeatherBtn) {
    console.error("Button element not found.");
    return;
  }

  getWeatherBtn.addEventListener("click", async () => {
    console.log("Button clicked!");

    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      console.log("Fetching weather data...");
      const weatherData = await fetchWeatherData(city);
      console.log("Weather data received:", weatherData);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      showError();
    }
  });

  async function fetchWeatherData(city) {
    // Using OpenWeatherMap API to fetch weather data for the given city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
    console.log("API Request URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log("Displaying weather data...");
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    // unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    console.log("Showing error message...");
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent =
      "City not found. Please enter a valid city name.";
  }
});
