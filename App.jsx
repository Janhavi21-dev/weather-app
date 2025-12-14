import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "fb66b6848f8fc7313440c15a855106b5";

  const getWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>🌦️ Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>☁️ Condition: {weather.weather[0].main}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
