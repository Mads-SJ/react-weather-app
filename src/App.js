import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  function search(e) {
    if (e.key === "Enter") {
      fetch(
        `${process.env.REACT_APP_API_BASE}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
      e.target.blur();
    }
  }

  function setBackground() {
    if (typeof weather.main !== "undefined" && weather.main.temp > 16) {
      return "app warm";
    }
    return "app";
  }

  function setWeatherIcon() {
    let icon;
    if (weather.weather[0].main === "Clouds")
      icon = <i className="fas fa-cloud"></i>;

    if (weather.weather[0].main === "Clear")
      icon = <i className="fas fa-sun"></i>;

    if (weather.weather[0].main === "Rain")
      icon = <i className="fas fa-cloud-rain"></i>;

    return (
      <div>
        {icon}
        <h2>{weather.weather[0].description}</h2>
      </div>
    );
  }

  return (
    <div className={setBackground()}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="container">
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{new Date().toDateString()}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">{setWeatherIcon()}</div>
              </div>
            </div>
          </div>
        ) : (
          <h2>Couldn't find the city you were looking for...</h2>
        )}
      </main>
    </div>
  );
}

export default App;
